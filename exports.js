goog.require('cssvalue.UnicodeRange');
goog.require('cssvalue.Font');
goog.require('cssvalue.Src');
goog.require('cssvalue.FeatureSettings');

window['UnicodeRange']['parse'] = cssvalue.UnicodeRange.parse;
window['UnicodeRange']['stringify'] = cssvalue.UnicodeRange.stringify;

window['Font']['parse'] = cssvalue.Font.parse;
window['Font']['stringify'] = cssvalue.Font.stringify;

window['Src']['parse'] = cssvalue.Src.parse;
window['Src']['stringify'] = cssvalue.Src.stringify;

window['FeatureSettings']['parse'] = cssvalue.FeatureSettings.parse;
window['FeatureSettings']['stringify'] = cssvalue.FeatureSettings.stringify;
