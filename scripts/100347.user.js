// ==UserScript==
// @name           Reddit Unmold
// @namespace      terrasoft.gr/greasemonkey/reddit/unmold
// @description    Reddit Unmold
// @include        http://www.reddit.com/*
// ==/UserScript==

var clearChars  = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZzAaOoUu";
var moldedChars = "ÁáḂḃĊċĎďĖėƑƒĠġĤĥĪīĴĵĶķĿŀṀṁŃńÓóṖṗɊɋṘṙṠṡṪṫÚúṾṿŴŵẊẋỴỵŻżÅåÖöŮů";

function unmoldTextArea(textbox, input, output) {
	for (var i=0;i<input.length;i++) {
		var rx = new RegExp(input[i], 'g');
		textbox.value = textbox.value.replace(rx,output[i]);
	}
}

function enmoldAll() {
	var textboxes = document.getElementsByTagName("textarea");
	for (var j=0;j<textboxes.length;j++){
		unmoldTextArea(textboxes[j], clearChars, moldedChars);
	}
}

function demoldAll() {
	var textboxes = document.getElementsByTagName("textarea");
	for (var j=0;j<textboxes.length;j++){
		unmoldTextArea(textboxes[j], moldedChars, clearChars);
	}
}

function addButtons() {
	var enMold = document.createElement("input");
	enMold.setAttribute("type", "button");
	enMold.setAttribute("class", "custombutton");
	enMold.setAttribute("value", "enmold");
	enMold.setAttribute("id", "terrasoft:enmold");
	document.body.insertBefore(enMold, document.body.firstChild);
	document.getElementById("terrasoft:enmold").addEventListener("click", enmoldAll, true);

	var deMold = document.createElement("input");
	deMold.setAttribute("type", "button");
	deMold.setAttribute("class", "custombutton");
	deMold.setAttribute("value", "demold");
	deMold.setAttribute("id", "terrasoft:demold");
	document.body.insertBefore(deMold, document.body.firstChild);
	document.getElementById("terrasoft:demold").addEventListener("click", demoldAll, true);
}

function init() {
	addButtons();
	/*
	$('a[onclick|="return reply(this)"]').onclick(unmod'*reply*');
	document.reply = new function(elem) {
		var form=comment_reply_for_elem(elem);
		show_edit_usertext(form);
		form.show();
		form.find(".cancel").get(0).onclick=function(){
			form.hide()
		};
		return false;
		window.alert("reply")}
	*/
}

init();