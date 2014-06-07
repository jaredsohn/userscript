//Author: Lord Tybor
// ==UserScript==
// @name           Bury/Digg All Comments
// @namespace      http://userscripts.org/users/85601
// @description    Adds two links above the comment section on a Digg entry, "Bury All", and "Digg All". The digging/burying of comments on the page will be visible when the page is refreshed. If there are a lot of comments, you may need to wait before refreshing.
// @include        http://digg.com/*
// @exclude        http://digg.com/settings*
// @exclude        http://digg.com/users/*
// ==/UserScript==
var http_request = false;
//This sets up the function used to send digg each bury/digg
function makePOSTRequest(url, parameters) {
      http_request = false;
      http_request = new XMLHttpRequest();
      http_request.open('POST', url, true);
      http_request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      http_request.setRequestHeader("Content-length", parameters.length);
      http_request.setRequestHeader("Connection", "close");
      http_request.send(parameters);
      }

//these functions scan through the comment section, add the ID number of each comment to an array, and then submit a digg or bury for each comment in the array.
function diggup(){
	cmts=document.getElementById("p-main").innerHTML.match(/"c\d{8}"/g);
	for ( var i in cmts )
		cmts[i]=cmts[i].replace(/[\"c]/g, '');
	for(var j in cmts)
		makePOSTRequest('http://digg.com/ajax/comments/digg','id='+cmts[j]+'&token='+unsafeWindow.tokens.comments.digg+'&up=1');
	}
function diggdown(){
	cmts=document.getElementById("p-main").innerHTML.match(/"c\d{8}"/g);
	for ( var i in cmts )
		cmts[i]=cmts[i].replace(/[\"c]/g, '');
	for(var j in cmts)
		makePOSTRequest('http://digg.com/ajax/comments/digg','id='+cmts[j]+'&token='+unsafeWindow.tokens.comments.digg+'&up=0');
	}


//and this adds the links "bury all" and "digg all" next to "expand all"
if(document.getElementById("p-main")){
	var buryAll = document.createElement("a");
	buryAll.addEventListener("click", diggdown, true);
	buryAll.innerHTML="bury all";
	var diggAll = document.createElement("a");
	diggAll.addEventListener("click", diggup, true);
	diggAll.innerHTML="digg all";

	var expand = document.getElementById('c-menu-all');
	document.getElementById('c-menu-all').parentNode.insertBefore(diggAll,expand.nextSibling);
	document.getElementById('c-menu-all').parentNode.insertBefore(buryAll,expand.nextSibling);
	}

