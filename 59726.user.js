// ==UserScript==
// @name           signatureManager
// @include        http://www*.erepublik.com/en/messages/*
// @include        http://www*.erepublik.com/es/messages/*
// ==/UserScript==

// If you like this script, consider donating some gold. thanks!
// eRepublik user: Teiman. 

var url = document.location.href;
var isMessage = url.match("/messages/compose/");

if (isMessage){
	var signature = GM_getValue("signature"," ");
	if (!signature)		signature = "";
	
	var body = document.getElementById("message_body");
	
	if (!body)
		return alert("Най-вероятно трябва да премахнете добавката");
	
	body.value = "\n" + signature;
	
	var button = document.createElement("input");	
	button.setAttribute("type","button");	
	button.setAttribute("value","Смени подпис");
	button.setAttribute("class","submit");	
	button.addEventListener("click", updateSignature, true)
	
	body.parentNode.appendChild(document.createElement("hr"));	
	body.parentNode.appendChild(button);	
} 

function updateSignature(e) {
    e.stopPropagation( );
	e.preventDefault( );
	
	if (!confirm("Искате ли да смените подписа си?"))
		return false;	
	
	var newsignature = document.getElementById("message_body").value;

	GM_setValue("signature", newsignature);   	
	return false
}