import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolveLanguage, readLanguagePreference, languageStorageKey, translate, localizeContent, untranslatedStrings, formatQuotePrice } from '../src/i18n.js';
import { bundledSnapshot } from '../src/publication.js';

test('system language matching and explicit choices support Chinese language variants', () => {
  assert.equal(resolveLanguage('system', ['zh-Hans-CN', 'en-US']), 'zh');
  assert.equal(resolveLanguage('system', ['zh-TW']), 'zh');
  assert.equal(resolveLanguage('system', ['en-GB', 'zh-CN']), 'en');
  assert.equal(resolveLanguage('system', ['fr-FR']), 'en');
  assert.equal(resolveLanguage('en', ['zh-CN']), 'en');
  assert.equal(resolveLanguage('zh', ['en-US']), 'zh');
});

test('language preference tolerates unavailable storage and invalid saved values', () => {
  assert.equal(readLanguagePreference({ getItem: key => { assert.equal(key, languageStorageKey); return 'en'; } }), 'en');
  assert.equal(readLanguagePreference({ getItem: () => 'invalid' }), 'system');
  assert.equal(readLanguagePreference({ getItem: () => { throw new Error('disabled'); } }), 'system');
  assert.equal(readLanguagePreference(undefined), 'system');
  assert.equal(translate('constructor', 'en'), 'constructor');
  assert.equal(translate(undefined, 'en'), undefined);
  assert.equal(formatQuotePrice('226.51元', 'en'), 'CNY 226.51');
  assert.equal(formatQuotePrice('778.31美元', 'en'), 'USD 778.31');
  assert.equal(formatQuotePrice('226.51元', 'zh'), '226.51元');
  assert.equal(translate('公共研究 {value0}', 'en', { value0: '2026-11-16.1' }), 'Public research 2026-11-16.1');
});

test('bundled and published research have complete English translations and retain numerical data', async () => {
  const latest = JSON.parse(await readFile(new URL('../research/snapshots/2026-11-16.1.json', import.meta.url), 'utf8'));
  for (const snapshot of [bundledSnapshot, latest]) {
    assert.deepEqual(untranslatedStrings({ boards: snapshot.boards, sources: snapshot.sources }), []);
    const before = JSON.stringify(snapshot);
    const english = localizeContent(snapshot, 'en');
    for (const id of Object.keys(snapshot.boards)) {
      snapshot.boards[id].charts.forEach((chart, index) => {
        assert.deepEqual(english.boards[id].charts[index].series.map(s => s.values), chart.series.map(s => s.values));
      });
    }
    assert.deepEqual(english.boards.policy.geography.states, snapshot.boards.policy.geography.states);
    for (const id of Object.keys(snapshot.sources)) {
      assert.equal(english.sources[id].url, snapshot.sources[id].url);
      assert.equal(english.sources[id].date, snapshot.sources[id].date);
    }
    assert.equal(JSON.stringify(snapshot), before);
    assert.equal(localizeContent(snapshot, 'zh'), snapshot);
  }
});
