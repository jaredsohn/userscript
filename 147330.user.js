// ==UserScript==
// @name        IST Fénix - Remover aviso do Pagamento de Propinas
// @namespace   localhost
// @description Remove o aviso do pagamento de propinas
// @include     https://fenix.ist.utl.pt/loginCAS.do?ticket=*
// @grant       none
// @version     1.1
// ==/UserScript==

if (document.title.match(/Pagamento de Propinas/i)) {
  var xpathResult = document.evaluate('//input[@value="Prosseguir"][@type="submit"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
  var element = xpathResult.singleNodeValue;
  if (element) window.setTimeout(function () { element.click(); }, 500);
}
