// ==UserScript==
// @name           4chan -- Quick name/trip changer
// @namespace      forczon
// @description    Very simple name/trip changer
// @version        first
// @include         http://*.4chan.org/*
// @exclude         http://www.4chan.org/*
// ==/UserScript==

// settings (remember to escape \)
var names = new Array("", "Trip#inserttriphere", "Another Name");


/////////////////////////////////////////////////////////////////////


x = document.evaluate("/html/body/div[5]/form/table/tbody/tr[3]/td[3]", document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);

nod = x.iterateNext();


var el = document.createElement("br");
nod.appendChild(el);

for (n in names) {

var el = document.createElement("input");
el.type = 'button';
el.value = names[n];
el.addEventListener("click", 
function(){

y = document.evaluate("/html/body/div[5]/form/table/tbody/tr[1]/td[3]/input", document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
not = y.iterateNext();
not.value = this.value;

}
, false);
nod.appendChild(el);

}
