// Multi Message Script
// سكربت ارسال الرسائل الجماعية
// Usage:
// كيفية استخدام السكربت:
//    - enter topic and content
//    - أدخل الموضوع وحتوى الرسالة
//    - enter list of recipients, each on a new line
//    - أدخل قامة المرسل لهم، اسم واحد في كل سطر
//    - start clicking [ send ]
//    - اضغط زر (أرسل) ليبدأ إرسال الرسائل
// Be careful - you can get temporarily blocked your message sending capabilities
//    if you send too many messages too fast.
// كن حذر، قد تتعرض إلى التوقيف المؤقت إذا أرسلت الكثير من الرسائل بسرعة كبيرة


// ==UserScript==
// @author      Jinnie
// @translated by      moudax
// @namespace	http://userscripts.org/
// @name		Travian Multi Message Script
// @description	Send a mail to a list of arbitrary users.
// @include     http://*.travian.*/nachrichten.php?t=1
// @version     1.1.9
// ==/UserScript==

// Prepare interfce

var sidebar = document.getElementById('side_info');
if (sidebar) {

	// title
	sidebar.appendChild(document.createElement('br'));
	var title = document.createElement('b');
	title.appendChild(document.createTextNode("مرسل الرسائل الجماعية:"));
	sidebar.appendChild(title);

	// topic
	var mtopic = document.createElement('input');
	mtopic.id = "multi_topic";
	sidebar.appendChild(document.createElement('br'));
	mtopic_lbl = document.createTextNode('الموضوع:');
	sidebar.appendChild(document.createElement('br'));
	sidebar.appendChild(mtopic_lbl);
	sidebar.appendChild(document.createElement('br'));
	sidebar.appendChild(mtopic);

	// message content
	var mmsg = document.createElement('textarea');
	mmsg.id = "multi_msg";
	mmsg.rows = 15;
	mmsg.cols = 35;
	sidebar.appendChild(document.createElement('br'));
	mmsg_lbl = document.createTextNode('محتوى الرسالة:');
	sidebar.appendChild(document.createElement('br'));
	sidebar.appendChild(mmsg_lbl);
	sidebar.appendChild(document.createElement('br'));
	sidebar.appendChild(mmsg);

	// mail list
	var recs = document.createElement('textarea');
	recs.id = "receiver_list";
	recs.rows = 15;
	sidebar.appendChild(document.createElement('br'));
	recs_lbl = document.createTextNode('قائمة المرسل لهم (اسم واحد في كل سطر):');
	sidebar.appendChild(document.createElement('br'));
	sidebar.appendChild(recs_lbl);
	sidebar.appendChild(document.createElement('br'));
	sidebar.appendChild(recs);

	// auto send checkbox
	sidebar.appendChild(document.createElement('br'));
	sidebar.appendChild(document.createElement('br'));
	var autoBox = document.createElement('input');
	autoBox.type = "checkbox";
	autoBox.id = "auto_send";
	autoBox.addEventListener("click", boxHandler, true);
	sidebar.appendChild(autoBox);
	sidebar.appendChild(document.createTextNode(' ارسال تلقائي للجميع دفعة واحدة'));

	// send button
	var sBtn = document.createElement('span');
	sidebar.appendChild(document.createElement('br'));
	sidebar.appendChild(sBtn);
	var buttonLbl = document.createElement('span');
	buttonLbl.id = "button_label";
	buttonLbl.appendChild(document.createTextNode(' (أرسل لمستلم واحد كل مرة)'));
	sidebar.appendChild(buttonLbl);
	sBtn.innerHTML="أرسل";
	sBtn.id = "send_button";
	sBtn.addEventListener("click", buttonHandler, true);
	sBtn.style.color="#777777";
	sBtn.style.fontWeight = "bold";
	sBtn.style.backgroundColor = "#d3d3d3";
	sBtn.style.border = "1px solid #71d000";
	sBtn.style.cursor = "pointer";
	sBtn.style.paddingLeft = "5px";
	sBtn.style.paddingRight = "5px";

	// foot
	sidebar.appendChild(document.createElement('br'));
        sidebar.appendChild(document.createElement('br'));
	var title = document.createElement('sup');
	title.appendChild(document.createTextNode("تعريب حـــــ moudax ــــروف الكلام"));
	sidebar.appendChild(title);
        sidebar.appendChild(document.createElement('br'));
        sidebar.appendChild(document.createElement('br'));
        sidebar.appendChild(document.createElement('br'));
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
		button_label.innerHTML = " (أرسل للجميع دفعة واحدة)";
	} else {
		button_label.innerHTML = " (أرسل لمستلم واحد كل مرة)";
	}
}

function sendMessage(autoSend){

	var rcvs = document.getElementById('receiver_list');
	if(rcvs.value.length == 0) {
		alert("لا يوجد أسماء في قائمة المرسل لهم!");
		return;
	}
	var mmsg = document.getElementById('multi_msg');
	var mtopic = document.getElementById('multi_topic');
	if(mmsg.value.length == 0 || mtopic.value.length == 0) {
		alert("من فضلك أدخل الموضوع ومحتوى الرسالة");
		return;
	}
	var receiver = getReceiver();
	if (receiver == ""){
		alert("Invalid recipient");
		return;
	}
	send(receiver, mtopic.value, mmsg.value);

	if (autoSend) {
		if (rcvs.value.length > 0) {
			// 2 to 5 seconds delay between 2 messages
			var randInterval = Math.round(Math.random() * 3000 + 1000);
			setTimeout(function(){sendMessage(true);}, randInterval);
		} else {
			var btn = document.getElementById("send_button");
			btn.style.visibility = "visible";
			alert("تم الانتهاء من ارسال الرسائل");
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

	var postData = "an=" + to + "&be=" + topic + "&c=" + getCParam() + "&message=" +
			text + "&s1.x=" + randX + "&s1.y=" + randY + "&t=2";
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
	alert ("خطأ: 'c' param was not resolved!");
	return null;
}

function trim(text) {
	return text.replace(/^\s+|\s+$/g,"");
}

function post(url, data) {
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