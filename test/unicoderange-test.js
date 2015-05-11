describe('UnicodeRange', function () {
  var UnicodeRange = cssvalue.UnicodeRange;

  describe('parse', function () {
    it('parses an empty string', function () {
      expect(UnicodeRange.parse(''), 'to equal', []);
    });

    it('parses a single value', function () {
      expect(UnicodeRange.parse('u+23'), 'to equal', [35]);
      expect(UnicodeRange.parse('U+23'), 'to equal', [35]);
    });

    it('parses multiple values', function () {
      expect(UnicodeRange.parse('u+23, u+22'), 'to equal', [35, 34]);
      expect(UnicodeRange.parse('u+23,u+22'), 'to equal', [35, 34]);
    });

    it('parses ranges', function () {
      expect(UnicodeRange.parse('u+22-25'), 'to equal', [34, 35, 36, 37])
      expect(UnicodeRange.parse('u+22-22'), 'to equal', [34]);
    });

    it('parses multiple ranges', function () {
      expect(UnicodeRange.parse('u+22-24, u+25-28'), 'to equal', [34, 35, 36, 37, 38, 39, 40]);
    });

    it('parses wildcards', function () {
      expect(UnicodeRange.parse('u+1?'), 'to equal', [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]);
    });
  });

  describe('stringify', function () {
    it('returns an empty string on empty input', function () {
      expect(UnicodeRange.stringify([]), 'to equal', '');
    });

    it('returns a single code point', function () {
      expect(UnicodeRange.stringify([34]), 'to equal', 'U+22');
    });

    it('returns multiple code points', function () {
      expect(UnicodeRange.stringify([34, 35, 36]), 'to equal', 'U+22,U+23,U+24');
    });
  });
});
