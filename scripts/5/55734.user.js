// ==UserScript==
// @name           signatureManager
// @include        http://www.erepublik.com/*/messages/*
// @include        http://www2.erepublik.com/*/messages/*
// ==/UserScript==

// If you like this script, consider donating some gold. thanks!
// eRepublik user: Teiman. 

var url = document.location.href;
var isCompose = url.match("/messages/compose/");
var isReply = url.match("/messages/read/inbox/");

var isMessage = isCompose || isReply;//enhancement suggestion by Adin_Odmin. Thanks!	  

if (isMessage){
	var signature = GM_getValue("signature"," ");
	if (!signature)		signature = "";
	
	var body = document.getElementById("message_body");
	
	if (!body)
		return alert("You probably sould upgrade/remove signatureManager");
	
	body.value = "\n" + signature;
	
	var button = document.createElement("input");	
	button.setAttribute("type","button");	
	button.setAttribute("value","Update signature");
	button.setAttribute("class","submit");	
	button.addEventListener("click", updateSignature, true)
	
	body.parentNode.appendChild(document.createElement("hr"));	
	body.parentNode.appendChild(button);	
} 

function updateSignature(e) {
    e.stopPropagation( );
	e.preventDefault( );
	
	if (!confirm("Do you want to update your signature?"))
		return false;	
	
	var newsignature = document.getElementById("message_body").value;

	GM_setValue("signature", newsignature);   	
	return false
}


