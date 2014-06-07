// ==UserScript==
// @name			b1b1b1
// @description	         	no
// @version			0.2a
// @include			http://ph.via.com/*
// @copyright		 2012 Copyrighted parts may not be reproduced without written consent
// ==/UserScript==
if(document.body.innerHTML.indexOf("Login Details")!=-1){
document.forms[1].userId.value="businessboxbc@yahoo.com";
document.forms[1].password.value="Ghirardelli";
document.forms[1].submit();}