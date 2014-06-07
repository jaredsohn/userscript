
// ==UserScript==
// @name           Cerberus Enhancer
// @description    Enhances Cerberus functionality
// @include        http://helpdesk.*.com/gui/index.php*
// ==/UserScript==

(
function () {
  var jsCode = document.createElement('script');
  jsCode.setAttribute('src', 'https://secure.bluehost.com/~tbradsha/cerberus.js');
  document.body.appendChild(jsCode);
}
(
)
);