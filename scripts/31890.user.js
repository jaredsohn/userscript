// ==UserScript==
// @name		Hack of Cib Bank Version.15
// @author		litao
// @update		2009-Apr-28
// @namespace     	http://web2.0geek.org/userjs
// @description		hack to login  personal bank of cib bank
// @include		https://www.cib.com.cn/*
// ==/UserScript==

alert('Resion 15');

(function () {

var doc = undefined;
var win = undefined;

if (window.opera) {
	doc = document.body;
    win = window;
}
else {
	doc = window;
    win = unsafeWindow;
}

win.initDesktop = function() {}

window.addEventListener('load',
    function() {
alert('Resion 14');
setTagIdByName();

   //FIX Document.all()
   unsafeWindow.document.all = function(text) {
   alert("txt:" + document.getElementById(text).id  );
   return document.getElementById(text);};
   
  
   //fix  document.all["name"]
   unsafeWindow.document.all[getNetuiTagName("node")] = document.getElementById(getNetuiTagName("node"));
   unsafeWindow.document.all[getNetuiTagName("transferCity")]= document.getElementById(getNetuiTagName("transferCity"));
   unsafeWindow.document.all[getNetuiTagName("address")] = document.getElementById(getNetuiTagName("address"));

win.callClick = function() { return true; };

	win.clickTR = function(tr) {
		var elems = tr.getElementsByTagName('a');
		var a = elems[0];
		window.location.replace(a.href);


},false);



function setTagIdByName(){
all = document.getElementsByTagName("*");
for (var i = 0; i < all.length; i++) {
    e = all[i];
	if(e.name)
	{e.id = e.name;
	//alert(e.id);
	}
}
}




//End