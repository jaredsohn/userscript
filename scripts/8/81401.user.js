// ==UserScript==
// @name      HTTPS password field highlighter
// @namespace   http://asymmetr.ic
// @description   Highlights https password fields in forms
// @include     http://*
// @author    asymmetric
// ==/UserScript==
// Based on http://commons.oreilly.com/wiki/index.php/Greasemonkey_Hacks/Web_Forms#Identify_Password_Fields

(function() {
var rule = "input.GM_SecurePasswordField { background-image: url(data:image/gif,"+
    "GIF89a%04%00%04%00%B3%00%00%FF%FF%FF%FF%FF%00%FF%00%FF%FF%00%00%00%FF"+
    "%FF%00%FF%00%00%00%FF%00%00%00%CC%CC%CC%FF%FF%FF%00%00%00%00%00%00%00"+
    "%00%00%00%00%00%00%00%00%00%00%00!%F9%04%01%00%00%09%00%2C%00%00%00%0"+
    "0%04%00%04%00%00%04%070I4k%A22%02%00%3B) }";

var styleNode = document.createElement("style");
styleNode.type = "text/css";
styleNode.innerHTML = rule;
document.getElementsByTagName('head')[0].appendChild(styleNode);

// find all formspassword fieldspassword fields and mark them with a class
//var xpath = "//form[descendant::input[@type='password'] and starts-with(@action,'https://')]";
var xpath = "//input[@type='password' and ancestor::form[starts-with(@action, 'https://')]]";
var res = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var inputIndex = 0; inputIndex < res.snapshotLength; inputIndex++) {
  passwordInput = res.snapshotItem(inputIndex);
  passwordInput.className += " GM_SecurePasswordField";
}
})();
