import test from 'node:test';
import assert from 'node:assert/strict';
import { apply, inject } from '../src/host.js';

function fixture(manager) {
  let key;
  let route;
  let active = 0;
  const effects = [];
  const listeners = new Map();
  const skills = new Map();
  const ctx = {
    skills: { get: async (name) => skills.get(name), register: (s) => skills.set(s.name, s) },
    credentials: { resolve: async () => key ? { value: key } : undefined },
    connection: { fetch: { register: (r) => { route = r; return () => { route = undefined; }; } } },
    get: (name) => name === 'mcpManager' ? manager : { import: async () => ({}) },
    effect: (setup) => effects.push(setup()),
    on: (name, fn) => listeners.set(name, fn),
    logger: { warn() {} },
    plugin: (_plugin, config) => {
      assert.equal(config.env.CAIDAZI_API_KEY, key);
      assert.equal(++active, 1, 'replacement must wait for old client disposal');
      let disposed = false;
      return { await: async () => {}, dispose: async () => { if (!disposed) active--; disposed = true; } };
    },
  };
  return {
    ctx, skills,
    active: () => active,
    route: () => route,
    changeKey: async (value) => { key = value; await listeners.get('credentials/reference-updated')?.('CAIDAZI_API_KEY'); },
    dispose: async () => { for (const dispose of effects.reverse()) await dispose?.(); },
  };
}

test('rc.1 starts without a key or manager; rotation and removal dispose the prior MCP client', async () => {
  assert.ok(!inject.includes('mcpManager'));
  const f = fixture();
  await apply(f.ctx);
  assert.equal(f.skills.size, 8);
  assert.equal(f.active(), 0);
  const body = { type: 'client-request', rpcId: 'check-1', method: 'caidazi-boards', payload: { action: 'status' } };
  const response = await f.route().fetch(new Request('http://localhost/api/caidazi-boards', { method: 'POST', body: JSON.stringify(body) }));
  const result = await response.json();
  assert.equal(result.rpcId, body.rpcId);
  assert.equal(result.type, 'server-response');
  assert.equal(result.result.value.configured, false);
  const malformed = await f.route().fetch(new Request('http://localhost/api/caidazi-boards', { method: 'POST', body: '{}' }));
  assert.equal(malformed.status, 400);
  await f.changeKey('test-first-key');
  await f.changeKey('test-second-key');
  assert.equal(f.active(), 1);
  await f.changeKey(undefined);
  assert.equal(f.active(), 0);
  await f.changeKey('test-third-key');
  await f.dispose();
  assert.equal(f.active(), 0);
  assert.equal(f.route(), undefined);
});

test('rc.2 retains manager registration with a credential reference rather than a resolved key', async () => {
  let config;
  let disposed = false;
  const f = fixture({ register: (_name, value) => { config = value; return () => { disposed = true; }; } });
  await apply(f.ctx);
  assert.equal(config.env.CAIDAZI_API_KEY, '${credential:CAIDAZI_API_KEY}');
  assert.equal(f.active(), 0);
  await f.dispose();
  assert.ok(disposed);
});
