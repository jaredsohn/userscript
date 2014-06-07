// ==UserScript==
// @name           Default Name Blueprint
// @namespace      http://unidomcorp.com
// @description    Inserts the default name for blueprints on the name_invention page.
// @include        http://www.war-facts.com/name_invention.php?*
// ==/UserScript==

var blueprint = document.evaluate("//text()[contains(.,'A totally rad new')]/../font/u", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null).iterateNext();

document.getElementsByName('name')[0].value = '[B]' + ' ' + blueprint.innerHTML.substring (0,blueprint.innerHTML.indexof('(')!=-1?blueprint.innerHTML.indexof(' ('):blueprint.innerHTML.length);