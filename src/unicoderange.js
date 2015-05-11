goog.provide('cssvalue.UnicodeRange');

goog.scope(function () {
  cssvalue.UnicodeRange = {};

  var UnicodeRange = cssvalue.UnicodeRange;

  /**
   * @typedef {Array.<number>}
   */
  UnicodeRange.Value;

  /**
   * @param {!cssvalue.UnicodeRange.Value} codePoints
   *
   * @return {string}
   */
  UnicodeRange.stringify = function (codePoints) {
    return codePoints.map(function (codePoint) {
      return 'U+' + codePoint.toString(16);
    }).join(',');
  };

  /**
   * @param {string} input
   *
   * @return {!cssvalue.UnicodeRange.Value}
   */
  UnicodeRange.parse = function (input) {
    var ranges = input.split(/\s*,\s*/),
        result = [];

    for (var i = 0; i < ranges.length; i++) {
      var match = /^(u\+([0-9a-f?]{1,6})(?:-([0-9a-f]{1,6}))?)$/i.exec(ranges[i]),
          start = null,
          end = null;

      if (match) {
        if (match[2].indexOf('?') !== -1) {
          start = parseInt(match[2].replace('?', '0'), 16);
          end = parseInt(match[2].replace('?', 'f'), 16);
        } else {
          start = parseInt(match[2], 16);

          if (match[3]) {
            end = parseInt(match[3], 16);
          } else {
            end = start;
          }
        }

        if (start !== end) {
          for (var codePoint = start; codePoint <= end; codePoint++) {
            result.push(codePoint);
          }
        } else {
          result.push(start);
        }
      }
    }
    return result;
  };
});
