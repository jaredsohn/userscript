// ==UserScript==
// @name           Message Save
// @namespace      DeNada
// @include        http://www.erepublik.com/*/main/messages-compose/*
// @include        http://www.erepublik.com/*/main/messages-inbox
// ==/UserScript==


function updateBody(e) {

	var msg = GM_getValue(event.target.value," ");
	if (!msg)		msg = "";
	msg = msg.split("KOKO");

	subject.value = msg[0];
	body.value = msg[1];
	return false;
}

function updateSignature(e) {

	if (!confirm("Do you want to update?"))
		return false;	

	var newsignature = subject.value;
	newsignature = newsignature +"KOKO";
	newsignature = newsignature +body.value;
	var MessageToSave = "Message " +text.value;
	GM_setValue(MessageToSave, newsignature);   	
	return false;
}

var url = document.location.href;


var link = document.getElementsByClassName("right fluid_blue_light_medium message_get")[0];

var div = document.createElement("div");

div.innerHTML = '<a href="/en/main/messages-compose/0" class="right fluid_blue_light_medium"><span class="bold"><span class="envelope">New Message</span></span></a>';

link.parentNode.replaceChild(div, link);



var isMessage = url.match("messages-compose");

if (isMessage){

	var body = document.getElementById("citizen_message");
	var subject = document.getElementById("citizen_subject");
	
	body.parentNode.appendChild(document.createElement("hr"));
for(var i=1; i < 4; i++) {

	var button = document.createElement("input");	
	button.setAttribute("type","button");	
	button.setAttribute("value", "Message " +i);
	button.setAttribute("class","submit");	
	button.addEventListener("click", updateBody, true);
	
	body.parentNode.appendChild(document.createElement("b"));	
	body.parentNode.appendChild(button);
}


	
	var button = document.createElement("input");	
	button.setAttribute("type","button");	
	button.setAttribute("value","Save");
	button.setAttribute("class","submit");	
	button.addEventListener("click", updateSignature, true);
	
	body.parentNode.appendChild(document.createElement("hr"));	
	body.parentNode.appendChild(button);
	
	var text = document.createElement("input");	
	text.setAttribute("type","text");	
	text.setAttribute("value","1");
	text.setAttribute("size","2");
	body.parentNode.appendChild(text);
}