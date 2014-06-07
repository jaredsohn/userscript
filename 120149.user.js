// ==UserScript==
// @name		FTO Divfix
// @namespace		http://userscripts.org/tags/faerytaleonline
// @include		*faerytaleonline.com/main.php
// @version		1.0
// @description		Fixes the uneven look 8 boxes at the bottom of the main FTO screen (Inventory, Objects etc.)
// @icon		http://faerytaleonline.com/favicon.ico
// ==/UserScript==
var t;
for(var i in document.forms)
	if(document.forms[i].name=="invobjfrm")
		t=document.forms[i].parentNode.parentNode.parentNode.parentNode;

t.children[0].children[0].children[0].style.height="203px";
t.children[0].children[0].children[0].style.marginTop="0";
t.children[0].children[1].children[0].style.height="203px";
t.children[0].children[1].children[0].style.marginTop="0";
t.children[1].children[0].children[1].style.height="203px";
t.children[1].children[0].children[1].style.marginTop="0";
t.children[1].children[1].children[1].style.height="203px";
t.children[1].children[1].children[1].style.marginTop="0";

t.children[0].children[2].children[0].style.height="203px";
t.children[0].children[3].children[0].style.height="203px";
t.children[1].children[2].children[0].style.height="203px";
t.children[1].children[3].children[0].style.height="203px";

t.children[0].children[0].children[0].style.width="156px";
t.children[1].children[0].children[1].style.width="156px";

t.children[1].children[1].children[0].style.display="none";

t.parentNode.width="606px";
/**y/
t.innerHTML=t.innerHTML.replace(/width:160px; height:190px/g,"width:160px; height:203px");
t.innerHTML=t.innerHTML.replace(/190px; overflow:auto; margin-top:13/g,"203px; overflow:auto; margin-top:0");
/**/