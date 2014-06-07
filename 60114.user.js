// ==UserScript==
// @name           MessageInABottle
// @namespace      DeNada
// @include        http://www.erepublik.com/*/messages/compose/*
// ==/UserScript==

var save = new Array();
save[0] = "";
save[1] = "SUBJECT Here*KOKO*Body Here";
save[2] = "SUBJECT Here*KOKO*Body Here";
save[3] = "SUBJECT Here*KOKO*Body Here";
save[4] = "SUBJECT Here*KOKO*Body Here";
save[5] = "SUBJECT Here*KOKO*Body Here";
save[6] = "SUBJECT Here*KOKO*Body Here";
save[7] = "SUBJECT Here*KOKO*Body Here";
save[8] = "SUBJECT Here*KOKO*Body Here";
save[9] = "SUBJECT Here*KOKO*Body Here";
save[10] = "SUBJECT Here*KOKO*Body Here";
save[11] = "SUBJECT Here*KOKO*Body Here";


// Ignore the rest below.


var url = document.location.href;
var isMessage = url.match("/messages/compose/");

if (isMessage){

	var body = document.getElementById("message_body");
	var subject = document.getElementById("message_subject");
	
	body.parentNode.appendChild(document.createElement("hr"));
for(var i=1; i < 11; i++) {

	var button = document.createElement("input");	
	button.setAttribute("type","button");	
	button.setAttribute("value", "Message" +i);
	button.setAttribute("alt", i);
	button.setAttribute("class","submit");	
	button.addEventListener("click", updateBody, true)
	
	body.parentNode.appendChild(document.createElement("b"));	
	body.parentNode.appendChild(button);
}


} 


function updateBody(e) {
    e.stopPropagation( );
	e.preventDefault( );
	var msg = save[event.target.alt];

	if (!msg)		msg = "";
	msg = msg.split("*KOKO*");

	subject.value = msg[0];
	body.value = msg[1];
	return false
}