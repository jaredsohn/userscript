// ==UserScript==
// @name           FurAffinity messagecenter - Show newest submissions first.
// @namespace      http://www.furaffinity.net/user/yak
// @description    Rewrites the "1234S" new submissions notification link so that it loads with the newest notifications displaying first. Written specifically at the request of Freehaven and the many other people who requested this before him.
// @include        http://www.furaffinity.net/*
// ==/UserScript==

try{
	var perpage = 60;
	(res=document.evaluate("//a[@title='Submissions']",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null))&&(res.singleNodeValue.href+='new@'+perpage+'/');
}catch(e){
	
}