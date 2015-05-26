goog.provide('cssvalue.Font');

goog.scope(function () {
  cssvalue.Font = {};

  var Font = cssvalue.Font;

  /**
   * @typedef {{
   *  style: (string|undefined),
   *  variant: (string|undefined),
   *  weight: (string|number|undefined),
   *  stretch: (string|undefined),
   *  size: string,
   *  lineHeight: (string|undefined),
   *  family: Array.<string>
   * }}
   */
  Font.Value;

  /**
   * @type {Element}
   */
  Font.ELEMENT = document.createElement('div');

  /**
   * @param {cssvalue.Font.Value} value
   *
   * @return {string}
   */
  Font.stringify = function (value) {
    return [
      value.style || 'normal',
      value.variant || 'normal',
      value.weight || 'normal',
      value.stretch || 'normal',
      value.size + (value.lineHeight ? '/' + value.lineHeight : ''),
      value.family.join(',')
    ].join(' ');
  };

  /**
   * @param {string} input
   * @return {cssvalue.Font.Value|null}
   */
  Font.parse = function (input) {
    var result = {},
        element = Font.ELEMENT;

    element.style.cssText = 'font:' + input;

    if (element.style.fontFamily) {
      var family = Font.parseFamily(element.style.fontFamily);

      if (family) {
        return /** @type {cssvalue.Font.Value} */ ({
          size: element.style.fontSize,
          lineHeight: element.style.lineHeight || 'normal',
          style: element.style.fontStyle || 'normal',
          variant: element.style.fontVariant || 'normal',
          weight: element.style.fontWeight || 'normal',
          stretch: element.style.fontStretch || 'normal',
          family: family
        });
      }
    }

    return null;
  }

  /**
   * Parse a font family.
   *
   * @param {string} input
   * @return {Array.<string>|null}
   */
  Font.parseFamily = function (input) {
    var buffer = '',
        result = [];

    for (var i = 0; i < input.length; i++) {
      var c = input.charAt(i);

      if (c === "'" || c === '"') {
        var index = i + 1;

        do {
          index = input.indexOf(c, index) + 1;

          if (!index) {
            return null;
          }
        } while (input.charAt(index - 2) === '\\');

        result.push(input.slice(i + 1, index - 1));

        i = index - 1;
        buffer = '';
      } else if (c === ',') {
        buffer = buffer.trim()
        if (buffer !== '') {
          result.push(buffer);
          buffer = '';
        }
      } else {
        buffer += c;
      }
    }

    buffer = buffer.trim();
    if (buffer !== '') {
      result.push(buffer);
    }

    return result;
  };
});
