// Multi Message Script
// Usage:
//    - enter topic and content
//    - enter list of recipients, each on a new line
//    - start clicking [ send ]
// Be careful - you can get temporarily blocked your message sending capabilities
//    if you send too many messages too fast.

// ==UserScript==
// @author      Jinnie
// @modif_v4	xanthos
// @namespace	http://userscripts.org/
// @name	message_coa_V4.2
// @description	Send a mail to a list of arbitrary users.
// @include     http://*.travian.*/nachrichten.php*
// @version     1.1.8
// ==/UserScript==


// Some constants

// Minimal interval between 2 mails
var MIN_INT = 3; // seconds
// Additional time - Maximum interval = MIN_INT + ADD_INT
var ADD_INT = 3; // seconds

// Find locale
var tr = [];
loadTranslations();
var locale = location.href.match("\.(\\w+)/nachrichten")[1];
if(locale == "com" || locale == "us" || tr[locale] == undefined){locale = "fr";}

// Prepare interface valeur de positionnement
//var sidebar = document.getElementById('side_info');
//var sidebar = document.getElementById('contentOuterContainer');
var sidebar = document.getElementById('sidebarBeforeContent');
if (sidebar) {

	// title
	var title = document.createElement('b');
	title.appendChild(document.createTextNode(("**** " + tr[locale].multi_message) + " ****"));
	sidebar.appendChild(title);

	// topic
	var mtopic = document.createElement('input');
	mtopic.id = "multi_topic";
	mtopic.style.border = "1px solid #71D000";
	mtopic.style.width = "239px";
	sidebar.appendChild(document.createElement('br'));
	mtopic_lbl = document.createTextNode(tr[locale].topic);
	sidebar.appendChild(mtopic_lbl);
	sidebar.appendChild(mtopic);
	sidebar.appendChild(document.createElement('br'));

	// message content
	var mmsg = document.createElement('textarea');
	mmsg.id = "multi_msg";
	mmsg.rows = 5;
	mmsg.cols = 35;
	mmsg_lbl = document.createTextNode(tr[locale].content);
	sidebar.appendChild(mmsg_lbl);
	sidebar.appendChild(mmsg);

	// mail list
	var recs = document.createElement('textarea');
	recs.id = "receiver_list";
	recs.rows = 5;
	recs.addEventListener("change", listHandler, true);
	sidebar.appendChild(document.createElement('br'));
	recs_lbl = document.createTextNode(tr[locale].recipients);
	sidebar.appendChild(recs_lbl);
	sidebar.appendChild(recs);

	// auto send checkbox
	sidebar.appendChild(document.createElement('br'));
	sidebar.appendChild(document.createElement('br'));
	var autoBox = document.createElement('input');
	autoBox.type = "checkbox";
	autoBox.id = "auto_send";
	autoBox.addEventListener("click", boxHandler, true);
	sidebar.appendChild(autoBox);
	sidebar.appendChild(document.createTextNode(' ' + tr[locale].auto));

	// send button
	var sBtn = document.createElement('span');
	sidebar.appendChild(document.createElement('br'));
	sidebar.appendChild(sBtn);
	var buttonLbl = document.createElement('span');
	buttonLbl.id = "button_label";
	buttonLbl.appendChild(document.createTextNode(' ' + tr[locale].one_per_click));
	sidebar.appendChild(buttonLbl);
	sBtn.innerHTML=tr[locale].send;
	sBtn.id = "send_button";
	sBtn.addEventListener("click", buttonHandler, true);
	sBtn.style.color="#777777";
	sBtn.style.fontWeight = "bold";
	sBtn.style.backgroundColor = "#d3d3d3";
	sBtn.style.border = "1px solid #71d000";
	sBtn.style.cursor = "pointer";
	sBtn.style.paddingLeft = "5px";
	sBtn.style.paddingRight = "5px";
}


// Main Logic

function buttonHandler(){
	var auto_send = document.getElementById("auto_send");
	if (auto_send.checked) {
		var btn = document.getElementById("send_button");
		btn.style.visibility = "hidden";
		sendMessage(true);
	} else {
		sendMessage(false);
	}
}

function boxHandler(e){
	var box = document.getElementById("auto_send");
	var button_label = document.getElementById("button_label");
	if(box.checked){
		button_label.innerHTML = ' ' + tr[locale].all_in_a_sequence;
	} else {
		button_label.innerHTML = ' ' + tr[locale].one_per_click;
	}
}

function listHandler(){
	var list = splitReceivers();
	var res = "";
	for (var i=0; i<list.length; i++) {
		var player = list[i];
		if (player.match("^\\d+\.")){
			player = fromClanList(player);
		}
		res += player + "\n";
	}
	var rcvs = document.getElementById('receiver_list');
	rcvs.value = res;	
}

function fromClanList(row){
	var result = row;
	result = result.split("\t")[1];
	return result;
}

function sendMessage(autoSend){
	var rcvs = document.getElementById('receiver_list');
	if(rcvs.value.length == 0) {
		alert(tr[locale].msg_no_recipients);
		return;
	}
	var mmsg = document.getElementById('multi_msg');
	var mtopic = document.getElementById('multi_topic');
	if(mmsg.value.length == 0 || mtopic.value.length == 0) {
		alert(tr[locale].msg_topic_and_content);
		return;
	}
	var receiver = getReceiver();
	if (receiver == ""){
		alert(tr[locale].msg_invalid_recipient);
		return;
	}
	send(receiver, mtopic.value, mmsg.value);

	if (autoSend) {
		if (rcvs.value.length > 0) {
			// 10 to 25 seconds delay between 2 messages
			var randInterval = Math.round((Math.random() * ADD_INT + MIN_INT) * 1000);
			setTimeout(function(){sendMessage(true);}, randInterval);
		} else {
			var btn = document.getElementById("send_button");
			btn.style.visibility = "visible";
			alert(tr[locale].msg_finished_auto_sending);
		}
	}
}

function getReceiver(){
	var rcvrs = splitReceivers();
	var result = rcvrs[0];

	// now remove him from the list
	rcvrs.splice(0,1);
	saveRcvrs(rcvrs);
	return trim(result);
}

function splitReceivers(){
	var rcvStr = document.getElementById('receiver_list').value;
	return rcvStr.split("\n");
}

function saveRcvrs(rcvrs){
	var rcvList = document.getElementById('receiver_list');
	var rcvStr = rcvrs.join("\n");
	rcvList.value = rcvStr;
}

function send(to, topic, text){
	var randX = Math.round(Math.random() * 90 + 3);

	var randY = Math.round(Math.random() * 17 + 2);
	var postData = "an=" + to + "&be=" + topic + "&c=a96" + "&message=" + text;
	var url = document.location.href.split("?")[0];
	post(url, postData);
}

function getCParam(){
	var writeDiv = document.getElementById('write_content');
	var writeForm = writeDiv.getElementsByTagName('form')[0];
	var cParam = writeForm.getElementsByTagName('input')[0];
	if(cParam.name == "c") {
		return cParam.value;
	}
	alert (tr[locale].err_c_param);
	return null;
}

function trim(text) {
	return text.replace(/^\s+|\s+$/g,"");
}

function post(url, data){
  GM_xmlhttpRequest({
    method: "POST",
    url: url,
    headers:{'Content-type':'application/x-www-form-urlencoded'},
    data:encodeURI(data),
    onload: function(responseDetails) {
//	alert("Sent: " + data);
    }
   });
}

// Translations
function loadTranslations(){
tr["fr"] = {
	multi_message: "Multi-Message V4.2",
	topic: "Sujet :",
	content: "Message :",
	recipients: "Destinataire (un par ligne):",
	auto: "auto",
	send: "send",
	one_per_click: "(un par click)",
	all_in_a_sequence: "(all in a sequence)",
	msg_no_recipients: "Pas de destinataire pour ce message !!!",
	msg_topic_and_content: "Merci de mettre un sujet et un message !!!",
	msg_invalid_recipient: "Destinataire invalide",
	msg_finished_auto_sending: "Envoi auto fini",
	err_c_param: "Error: 'c' parameter was not resolved!"
}
} //loadTranslations()
