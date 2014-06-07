// ==UserScript==
// @name Hen
// XPath but the array returned is a normal array[x]
// Syntax: $x("//a", 7);
function $x(p, type) {
  var i, arr = [], t = type || 6, xpr = document.evaluate(p,document,null,t,null);
  for (i = 0; item = xpr.snapshotItem(i); i++) {arr.push(item);}
  return arr;
}
var hidden=$x("//input[@type='hidden']");
for(var i=0; i<hidden.length; i++) {
hidden[i].type = 'text';
}
// ==/UserScript==