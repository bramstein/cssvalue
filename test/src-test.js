describe('Src', function () {
  var Src = cssvalue.Src;

  describe('parse', function () {
    it('parses source urls', function () {
      expect(Src.parse('url(font.woff)'), 'to equal', [{ url: 'font.woff', format: undefined }]);
      expect(Src.parse('url(\'font.woff\')'), 'to equal', [{ url: 'font.woff', format: undefined }]);
      expect(Src.parse('url("font.woff")'), 'to equal', [{ url: 'font.woff', format: undefined }]);
    });

    it('parses source urls with formats', function () {
      expect(Src.parse('url(font.woff) format(woff)'), 'to equal', [{ url: 'font.woff', format: 'woff' }]);
      expect(Src.parse('url(font.woff) format(\'woff\')'), 'to equal', [{ url: 'font.woff', format: 'woff' }]);
      expect(Src.parse('url(font.woff) format("woff")'), 'to equal', [{ url: 'font.woff', format: 'woff' }]);
    });

    it('parses multiple urls', function () {
      expect(Src.parse('url(font.woff), url(font.ttf)'), 'to equal', [{ url: 'font.woff', format: undefined }, { url: 'font.ttf', format: undefined }]);
      expect(Src.parse('url(font.woff), url(font.otf), url(font.ttf)'), 'to equal', [{ url: 'font.woff',  format: undefined }, { url: 'font.otf', format: undefined }, { url: 'font.ttf', format: undefined }]);
    });

    it('parses multiple urls with formats', function () {
      expect(Src.parse('url(font.woff) format(woff), url(font.ttf) format(truetype)'), 'to equal', [{ url: 'font.woff', format: 'woff' }, { url: 'font.ttf', format: 'truetype' }]);
    });
  });

  describe('stringify', function () {
    it('creates an empty string', function () {
      expect(Src.stringify([]), 'to equal', '');
    });

    it('creates a single url without format', function () {
      expect(Src.stringify([{ url: 'font.woff' }]), 'to equal', 'url(font.woff)');
    });

    it('creates a single url with format', function () {
      expect(Src.stringify([{ url: 'font.woff', format: 'woff' }]), 'to equal', 'url(font.woff) format("woff")');
    });

    it('creates multiple urls with and without formats', function () {
      expect(Src.stringify([{ url: 'font.woff' }, { url: 'font.ttf', format: 'opentype' }]), 'to equal', 'url(font.woff),url(font.ttf) format("opentype")');
    });
  });
});
