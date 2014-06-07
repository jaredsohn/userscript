// ==UserScript==
// @Author         Hora_ce
// @name           highlightCurrentResponse
// @namespace      http://www-10.lotus.com/ldd/xpagesforum.nsf/*
// @include        http://www-10.lotus.com/ldd/xpagesforum.nsf/topicThread.xsp?*
// ==/UserScript==

function highlightCurrentResponse(){
 try{
	//get document current unid from url param
	var sActionParam = location.search;
	sActionParam = sActionParam.split("documentId=");
	if (sActionParam.length) sActionParam = (sActionParam[1]+"&").split("&")[0];
	if (sActionParam=="") return;


	//get the a href link containing the unid
	//update style to reflect it
	var arrEl = document.getElementsByClassName("xspDataTableViewPanel");
	if (arrEl.length){
		var elLink = arrEl[0].querySelector('a[href="/ldd/xpagesforum.nsf/topicThread.xsp?documentId='+sActionParam+'&action=openDocument"]');
		if (elLink)	elLink.style.color='red';
	}
 }
 catch(e){	
	alert("Error occured within the Greasemonkey.highlightCurrentResponse: "+e.name+"-"+e.message);
 }
}

highlightCurrentResponse();