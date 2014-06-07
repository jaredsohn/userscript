// ==UserScript==
// @name           Forum_Sig
// @namespace      http://www.erepublik.com/en/newspaper/freedom-post-180922/1
// @include        http://ww*.erepublik.com/*/forum/topic/*
// @include        http://ww*.erepublik.com/*/forum/new-topic/*
// ==/UserScript==

// Based on the Signature Manager created by Teiman. 


	var signature = GM_getValue("forumsig"," ");

	if (!signature)		signature = "/n/n";
	
	var body = document.getElementById("body");

	var topic = document.getElementById("add_topic");


	body.value = signature;

	var button = document.createElement("input");	
	button.setAttribute("type","button");	
	button.setAttribute("value","Update signature");
	button.setAttribute("class","arrowbutton");	
	button.addEventListener("click", updateSignature, true)
	
	topic.appendChild(button);	

function updateSignature(e) {
    e.stopPropagation( );
	e.preventDefault( );
	
	if (!confirm("Do you want to update your signature?"))
		return false;	
	
	var newsignature = body.value;
	GM_setValue("forumsig", newsignature);   	
	return false
}
