describe('Font', function () {
  var Font = cssvalue.Font;

  describe('parse', function () {
    it('returns null on invalid css font values', function () {
      expect(Font.parse(''), 'to equal', null);
      expect(Font.parse('Arial'), 'to equal', null);
      expect(Font.parse('12px'), 'to equal', null);
      expect(Font.parse('12px/16px'), 'to equal', null);
      expect(Font.parse('bold 12px/16px'), 'to equal', null);
    });

    it('parses a simple font specification correctly', function () {
      expect(Font.parse('12px serif'), 'to have properties', { size: '12px', family: ['serif'] });
    });

    it('returns multiple font families', function () {
      expect(Font.parse('12px Arial, Verdana, serif'), 'to have properties', { size: '12px', family: ['Arial', 'Verdana', 'serif'] });
    });

    it('handles quoted family names correctly', function () {
      expect(Font.parse('12px "Times New Roman"'), 'to have properties', { size: '12px', family: ['Times New Roman'] });
      expect(Font.parse("12px 'Times New Roman'"), 'to have properties', { size: '12px', family: ["Times New Roman"] });
    });

    it('handles unquoted identifiers correctly', function () {
      expect(Font.parse('12px Times New Roman'), 'to have properties', { size: '12px', family: ['Times New Roman'] });
      expect(Font.parse('12px Times New Roman, Comic Sans MS'), 'to have properties', { size: '12px', family: ['Times New Roman', 'Comic Sans MS'] });
    });

    it('correctly parses font sizes', function () {
      expect(Font.parse('1px serif'), 'to have properties', { size: '1px', family: ['serif'] });
      expect(Font.parse('1em serif'), 'to have properties', { size: '1em', family: ['serif'] });
      expect(Font.parse('1ex serif'), 'to have properties', { size: '1ex', family: ['serif'] });
      expect(Font.parse('1ch serif'), 'to have properties', { size: '1ch', family: ['serif'] });
      expect(Font.parse('1rem serif'), 'to have properties', { size: '1rem', family: ['serif'] });
      expect(Font.parse('1vh serif'), 'to have properties', { size: '1vh', family: ['serif'] });
      expect(Font.parse('1vw serif'), 'to have properties', { size: '1vw', family: ['serif'] });
      expect(Font.parse('1vmin serif'), 'to have properties', { size: '1vmin', family: ['serif'] });
      expect(Font.parse('1vmax serif'), 'to have properties', { size: '1vmax', family: ['serif'] });
      expect(Font.parse('1mm serif'), 'to have properties', { size: '1mm', family: ['serif'] });
      expect(Font.parse('1cm serif'), 'to have properties', { size: '1cm', family: ['serif'] });
      expect(Font.parse('1in serif'), 'to have properties', { size: '1in', family: ['serif'] });
      expect(Font.parse('1pt serif'), 'to have properties', { size: '1pt', family: ['serif'] });
      expect(Font.parse('1pc serif'), 'to have properties', { size: '1pc', family: ['serif'] });
    });

    it('returns null when it fails to parse a font-size', function () {
      expect(Font.parse('1 serif'), 'to equal', null);
      expect(Font.parse('xxx-small serif'), 'to equal', null);
      expect(Font.parse('1bs serif'), 'to equal', null);
      expect(Font.parse('100 % serif'), 'to equal', null);
    });

    it('returns null when it fails to parse a number', function () {
      expect(Font.parse('12.px serif'), 'to equal', null);
      expect(Font.parse('+---12.2px serif'), 'to equal', null);
      expect(Font.parse('12.1.1px serif'), 'to equal', null);
    });

    it('correctly parses line-height', function () {
      expect(Font.parse('12px/16px serif'), 'to have properties', { size: '12px', lineHeight: '16px', family: ['serif'] });
      expect(Font.parse('12px/1.5 serif'), 'to have properties', { size: '12px', lineHeight: '1.5', family: ['serif'] });
      expect(Font.parse('12px/normal serif'), 'to have properties', { size: '12px', family: ['serif'] });
      expect(Font.parse('12px/105% serif'), 'to have properties', { size: '12px', lineHeight: '105%', family: ['serif'] });
    });

    it('correctly parses font-style', function () {
      expect(Font.parse('italic 12px serif'), 'to have properties', { size: '12px', style: 'italic', family: ['serif'] });
      expect(Font.parse('oblique 12px serif'), 'to have properties', { size: '12px', style: 'oblique', family: ['serif'] });
    });

    it('correctly parses font-variant', function () {
      expect(Font.parse('small-caps 12px serif'), 'to have properties', { size: '12px', variant: 'small-caps', family: ['serif'] });
    });

    it('correctly parses font-weight', function () {
      expect(Font.parse('bold 12px serif'), 'to have properties', { size: '12px', weight: 'bold', family: ['serif'] });
      expect(Font.parse('bolder 12px serif'), 'to have properties', { size: '12px', weight: 'bolder', family: ['serif'] });
      expect(Font.parse('lighter 12px serif'), 'to have properties', { size: '12px', weight: 'lighter', family: ['serif'] });

      for (var i = 1; i < 10; i += 1) {
        expect(Font.parse(i * 100 + ' 12px serif'), 'to have properties', { size: '12px', weight: (i * 100).toString(), family: ['serif'] });
      }
    });

    // Disable these. Firefox fails to parse them (which is OK).
    xit('correctly parses font-stretch', function () {
      expect(Font.parse('ultra-condensed 12px serif'), 'to have properties', { size: '12px', stretch: 'ultra-condensed', family: ['serif'] });
      expect(Font.parse('extra-condensed 12px serif'), 'to have properties', { size: '12px', stretch: 'extra-condensed', family: ['serif'] });
      expect(Font.parse('condensed 12px serif'), 'to have properties', { size: '12px', stretch: 'condensed', family: ['serif'] });
      expect(Font.parse('semi-condensed 12px serif'), 'to have properties', { size: '12px', stretch: 'semi-condensed', family: ['serif'] });
      expect(Font.parse('semi-expanded 12px serif'), 'to have properties', { size: '12px', stretch: 'semi-expanded', family: ['serif'] });
      expect(Font.parse('expanded 12px serif'), 'to have properties', { size: '12px', stretch: 'expanded', family: ['serif'] });
      expect(Font.parse('extra-expanded 12px serif'), 'to have properties', { size: '12px', stretch: 'extra-expanded', family: ['serif'] });
      expect(Font.parse('ultra-expanded 12px serif'), 'to have properties', { size: '12px', stretch: 'ultra-expanded', family: ['serif'] });
    });
  });

  describe('stringify', function () {
    it('returns a simple font value', function () {
      expect(Font.stringify({ size: '16px', family: ['sans-serif'] }), 'to equal', 'normal normal normal normal 16px sans-serif');
    });
  });
});
