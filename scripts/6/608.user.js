// ==UserScript==
// @name          Dropload - enlarge textarea
// @description   enlarges the tiny textarea of the post page at dropload.com
// @include       http://dropload.com/*
// @include       http://*.dropload.com/*
// @exclude       
// ==/UserScript==
if (document.getElementsByTagName('textarea').length>0) { 
	var ta=document.getElementsByTagName('textarea')[0];
	ta.rows="10";
	ta.cols="50";
	var parachuteimg=document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/IMG[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
	parachuteimg.style.height="170px";
	parachuteimg.style.width="122px";
}

