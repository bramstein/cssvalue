goog.provide('cssvalue.FeatureSettings');

goog.scope(function () {
  cssvalue.FeatureSettings = {};

  var FeatureSettings = cssvalue.FeatureSettings;

  /**
   * @typedef {Object.<string,number>}
   */
  FeatureSettings.Value;

  /**
   * @param {!cssvalue.FeatureSettings.Value} features
   *
   * @return {string}
   */
  FeatureSettings.stringify = function (features) {
    return Object.keys(features).map(function (feature) {
      return '"' + feature + '" ' + features[feature];
    }).join(',');
  };

  /**
   * @param {string} input
   *
   * @return {!cssvalue.FeatureSettings.Value}
   */
  FeatureSettings.parse = function (input) {
    var features = (input || '').split(/\s*,\s*/),
        result = {};

    for (var i = 0; i < features.length; i++) {
      var match = /^"([\u0020-\u007e]{4})"(?:\s+(\d+|on|off))?$/i.exec(features[i]);

      if (match) {
        if (match[2]) {
          var index = match[2].replace('on', '1').replace('off', '0');

          result[match[1]] = parseInt(index, 10);
        } else {
          result[match[1]] = 1;
        }
      }
    }
    return result;
  };
});
