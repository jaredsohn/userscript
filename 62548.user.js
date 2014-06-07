// ==UserScript==
// @name           4chan -- Quick tripcode/reply buttons
// @namespace      forczon
// @description    Very simple name/trip changer/Quick Reply
// @version        first
// @include         http://*.4chan.org/*
// @exclude         http://www.4chan.org/*
// ==/UserScript==

// settings (remember to escape \)
/////////////////////////////////////////////////////////////////////

var names = new Array("","YourTripcode##Yourpassword");
// edit this with your own tripcode and password.

x = document.evaluate("/html/body/div[5]/form/table/tbody/tr[1]/td[3]", document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);

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

}/////////////////////////////////////////////////////////////////////
var names1 = new Array("C..C.COMBO BREAKER!!!","derp","hurrrrrr","O'rly?");
//change these words to whatever you fancy, these are just examples.

a = document.evaluate("/html/body/div[5]/form/table/tbody/tr[4]/td[3]", document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);

nod = a.iterateNext();


var el1 = document.createElement("br");
nod.appendChild(el1);

for (n in names1) {

var el1 = document.createElement("input");
el1.type = 'button';
el1.value = names1[n];
el1.addEventListener("click", 
function(){

b = document.evaluate("/html/body/div[5]/form/table/tbody/tr[4]/td[3]/TEXTAREA", document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
not = b.iterateNext();
not.value = this.value;

}
, false);
nod.appendChild(el1);

}
