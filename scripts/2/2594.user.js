// ==UserScript==
// @name           KoL Buff Ending Warner
// @namespace      http://mywebsite.com/myscripts
// @description    Oh noes, me buffs did end!
// @include        http://*loathing2.com/charpane.php
// @include        http://*kingdomofloathing.com/charpane.php
// ==/UserScript==


//var  re = /<font size=2>([a-zA-Z ]*) \(9\)<\/font/;
var re;
if (document.body.innerHTML.indexOf('otherimages') != -1) {
	re = new RegExp('>([ a-zA-Z\']*) \\(1\\)</font>',"g");
}
else {
	re = new RegExp('title="([^"]+)" [^>]*></td><td>\\(1\\)',"g");	
}
var found = re.exec(document.body.innerHTML);
var msg = '';	
var count = 0;
while (found) {
	count++;	
	msg += found[1] + ', ';
	found = re.exec(document.body.innerHTML);
}
msg = msg.substr(0, msg.length-2);
if (count == 1) {
	alert(msg + ' has 1 turn left.');
}
else if (count > 0) {
	alert(msg + ' have 1 turn left.');
}
