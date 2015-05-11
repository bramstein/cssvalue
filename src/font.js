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
   * @enum {number}
   */
  var states = {
    VARIATION: 1,
    LINE_HEIGHT: 2,
    FONT_FAMILY: 3,
    BEFORE_FONT_FAMILY: 4
  };

  /**
   * Attempt to parse a string as an identifier. Return
   * a normalized identifier, or null when the string
   * contains an invalid identifier.
   *
   * @param {string} str
   * @return {string|null}
   */
  function parseIdentifier(str) {
    var identifiers = str.replace(/^\s+|\s+$/, '').replace(/\s+/g, ' ').split(' ');

    for (var i = 0; i < identifiers.length; i += 1) {
      if (/^(-?\d|--)/.test(identifiers[i]) ||
           !/^([_a-zA-Z0-9-]|[^\0-\237]|(\\[0-9a-f]{1,6}(\r\n|[ \n\r\t\f])?|\\[^\n\r\f0-9a-f]))+$/.test(identifiers[i])) {
        return null;
      }
    }
    return identifiers.join(' ');
  }


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
    var state = states.VARIATION,
        buffer = '',
        result = {
          family: []
        };

    for (var c, i = 0; c = input.charAt(i); i += 1) {
      if (state === states.BEFORE_FONT_FAMILY && (c === '"' || c === "'")) {
        var index = i + 1;

        // consume the entire string
        do {
          index = input.indexOf(c, index) + 1;
          if (!index) {
            // If a string is not closed by a ' or " return null.
            return null;
          }
        } while (input.charAt(index - 2) === '\\');

        result.family.push(input.slice(i + 1, index - 1));

        i = index - 1;
        state = states.FONT_FAMILY;
        buffer = '';
      } else if (state === states.FONT_FAMILY && c === ',') {
        state = states.BEFORE_FONT_FAMILY;
        buffer = '';
      } else if (state === states.BEFORE_FONT_FAMILY && c === ',') {
        var identifier = parseIdentifier(buffer);

        if (identifier) {
          result.family.push(identifier);
        }
        buffer = '';
      } else if (state === states.VARIATION && (c === ' ' || c === '/')) {
        if (/^((xx|x)-large|(xx|s)-small|small|large|medium)$/.test(buffer) ||
            /^(larg|small)er$/.test(buffer) ||
            /^(\+|-)?([0-9]*\.)?[0-9]+(em|ex|ch|rem|vh|vw|vmin|vmax|px|mm|cm|in|pt|pc|%)$/.test(buffer)) {
          state = c === '/' ? states.LINE_HEIGHT : states.BEFORE_FONT_FAMILY;
          result.size = buffer;
        } else if (/^(italic|oblique)$/.test(buffer)) {
          result.style = buffer;
        } else if (/^small-caps$/.test(buffer)) {
          result.variant = buffer;
        } else if (/^(bold(er)?|lighter|[1-9]00)$/.test(buffer)) {
          result.weight = buffer;
        } else if (/^((ultra|extra|semi)-)?(condensed|expanded)$/.test(buffer)) {
          result.stretch = buffer;
        }
        buffer = '';
      } else if (state === states.LINE_HEIGHT && c === ' ') {
        if (/^(\+|-)?([0-9]*\.)?[0-9]+(em|ex|ch|rem|vh|vw|vmin|vmax|px|mm|cm|in|pt|pc|%)?$/.test(buffer)) {
          result.lineHeight = buffer;
        }
        state = states.BEFORE_FONT_FAMILY;
        buffer = '';
      } else {
        buffer += c;
      }
    }

    // This is for the case where a string was specified followed by
    // an identifier, but without a separating comma.
    if (state === states.FONT_FAMILY && !/^\s*$/.test(buffer)) {
      return null;
    }

    if (state === states.BEFORE_FONT_FAMILY) {
      var identifier = parseIdentifier(buffer);

      if (identifier) {
        result.family.push(identifier);
      }
    }

    if (result.size && result.family.length) {
      return result;
    } else {
      return null;
    }
  }
});
