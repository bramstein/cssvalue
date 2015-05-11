goog.provide('cssvalue.Src');

goog.scope(function () {
  cssvalue.Src = {};

  var Src = cssvalue.Src;

  /**
   * @typedef {{
   *  url: string,
   *  format: (string|undefined)
   * }}
   */
  Src.Value;

  /**
   * @param {!Array.<cssvalue.Src.Value>} descriptions
   *
   * @return {string}
   */
  Src.stringify = function (descriptions) {
    return descriptions.map(function (description) {
      return 'url(' + description.url + ')' + (description.format ? (' format("' + description.format + '")') : '');
    }).join(',');
  };

  /**
   * @param {string} input
   *
   * @return {!Array.<cssvalue.Src.Value>}
   */
  Src.parse = function (input) {
    var srcRegExp = /\burl\((\'|\"|)([^\'\"]+?)\1\)( format\((\'|\"|)([^\'\"]+?)\4\))?/g,
        match = null,
        result = [];

    while ((match = srcRegExp.exec(input))) {
      if (match[2]) {
        result.push(/** @type {cssvalue.Src.Value} */ ({
          url: match[2],
          format: match[5]
        }));
      }
    }
    return result;
  };
});
