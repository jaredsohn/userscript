// ==UserScript==
// @name auto put items on sbd
// @namespace anonymous
// @description Auto deposits item to item in your SDB.
// @include http://www.neopets.com/quickstock.phtml*
// ==/UserScript==

var inputs = $x("//div[@id='content']/table/tbody/tr/td[2]/form//input");
inputs.forEach(function(input) {
if (input.value == 'deposit') {
input.checked = true;
}
});
var submit = $x("//div[@id='content']/table/tbody/tr/td[2]/form/table/tbody/tr[4]/td/input[1]", 9)
if (submit !== null) {
submit.click();
} else {
setTimeout(function() { document.location = "http://www.neopets.com/quickstock.phtml"; }, 1000);
}



function $x() {
var x='';
var node=document;
var type=0;
var fix=true;
var i=0;
var cur;

function toArray(xp) {
var final=[], next;
while (next=xp.iterateNext()) {
final.push(next);
}
return final;
}

while (cur=arguments[i++]) {
switch (typeof cur) {
case "string": x+=(x=='') ? cur : " | " + cur; continue;
case "number": type=cur; continue;
case "object": node=cur; continue;
case "boolean": fix=cur; continue;
}
}

if (fix) {
if (type==6) type=4;
if (type==7) type=5;
}

// selection mistake helper
if (!/^\//.test(x)) x="//"+x;

// context mistake helper
if (node!=document && !/^\./.test(x)) x="."+x;

var result=document.evaluate(x, node, null, type, null);
if (fix) {
// automatically return special type
switch (type) {
case 1: return result.numberValue;
case 2: return result.stringValue;
case 3: return result.booleanValue;
case 8:
case 9: return result.singleNodeValue;
}
}

return fix ? toArray(result) : result;
}