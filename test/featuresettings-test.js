describe('FeatureSettings', function () {
  var FeatureSettings = cssvalue.FeatureSettings;

  describe('parse', function () {
    it('parses a single feature', function () {
      expect(FeatureSettings.parse('"liga"'), 'to equal', { liga: 1 });
    });

    it('parses multiple features', function () {
      expect(FeatureSettings.parse('"liga", "calt"'), 'to equal', { liga: 1, calt: 1 });
    });

    it('parses features with index/toggle', function () {
      expect(FeatureSettings.parse('"liga" on'), 'to equal', { liga: 1 });
      expect(FeatureSettings.parse('"liga" off'), 'to equal', { liga: 0 });
      expect(FeatureSettings.parse('"liga" 2'), 'to equal', { liga: 2 });
      expect(FeatureSettings.parse('"liga" 0'), 'to equal', { liga: 0 });
    });

    it('ignores invalid features', function () {
      expect(FeatureSettings.parse('"ligatures"'), 'to equal', {});
      expect(FeatureSettings.parse('"l" 1'), 'to equal', {});
    });

    it('parses multiple values with index', function () {
      expect(FeatureSettings.parse('"liga" on, "swsh" 2'), 'to equal', { liga: 1, swsh: 2 });
    });
  });

  describe('stringify', function () {
    it('returns an empty string with no feature settings', function () {
      expect(FeatureSettings.stringify({}), 'to equal', '');
    });

    it('returns a single feature', function () {
      expect(FeatureSettings.stringify({ liga: 1 }), 'to equal', '"liga" 1');
    });

    it('returns multiple features', function () {
      expect(FeatureSettings.stringify({ liga: 1, calt: 0 }), 'to equal', '"liga" 1,"calt" 0');
    });
  });
});
