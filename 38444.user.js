// ==UserScript==
// @name           IRCTC : Quick Book train code
// @namespace      http://gm.wesley.eti.br/irctc
// @description    NOT WORKING WAIT FOR UPDATE
// @include        https://www.irctc.co.in/cgi-bin/bv60.dll/irctc/booking/quickBook.do?*
// ==/UserScript==

document.evaluate('//select[@name="classCode"]', document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue.addEventListener('change',function(e)
{
	e.target.form.elements.namedItem('Fetch Train Code').click();
