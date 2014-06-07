// ==UserScript==
// @name           BvS IGM
// @namespace      BvS
// @description    Larger text area with character counter for sending in game messages.
// @include        http://*animecubed.com/billy/bvs/*
// ==/UserScript==

function escapeLength(m)
{
	// Fixme
	return m.length;
}

var player = document.getElementsByName("player")[0].value;
var pwd = document.getElementsByName("pwd")[0].value;

if (!player || !pwd) {
	GM_log("Couldn't find player name and password");
	return;
}

if (/billy.bvs.pages.main/.test(location.href)) {
	var oldForm = document.getElementsByName("msend")[0];
	if (!oldForm)
		return;

	var newForm = document.createElement("form");
	newForm.innerHTML = '<input type="hidden" value="' + player + '" name="player"/>' +
		'<input type="hidden" value="' + pwd + '" name="pwd"/>' +
		'Name: <input type="text" size="18" value="" name="msend1"/><br/>' +
		'Message: <textarea name="msend2" style="height: auto;"></textarea><br/>' +
		'<div style="text-align: right; padding-right: 8px;"><span id="msgcounter">0</span>' +
		'&nbsp;/&nbsp;350 characters</div>' +
		'<input type="checkbox" value="1" name="msendcheck"/>&nbsp;This message is not inflam&shy;matory, ' +
		'mature, spam, or an advertisement.<br/>' +
		'<a style="color: rgb(161, 0, 0); font-weight: bold;" onfocus="this.blur();" ' +
		'href="javascript:document.msend.submit();">Send Message</a>';
	newForm.setAttribute("method", "post");
	newForm.setAttribute("name", "msend");
	newForm.setAttribute("action", "main.html");
	newForm.setAttribute("style", "font-size: 12px;");

	oldForm.parentNode.replaceChild(newForm, oldForm);

	document.getElementsByName("msend2")[0].addEventListener(
			'keyup',
			function(event) {
				var ta = document.getElementsByName("msend2")[0];
				document.getElementById("msgcounter").firstChild.nodeValue = escapeLength(ta.value);
				return;
			},
			false);
} else if (/billy.bvs.village/.test(location.href)) {
	var oldForm = document.getElementsByName("leavem")[0];
	if (!oldForm)
		return;
	var newForm = document.createElement("form");
	newForm.innerHTML = '<input type="hidden" value="' + player + '" name="player"/>' +
		'<input type="hidden" value="' + pwd + '" name="pwd"/>' +
		'Leave a message! (No html, 200 characters max)' +
		'<span style="float: right"><span id="msgcounter">0</span>&nbsp;/&nbsp;200 characters</span>' +
		'<textarea value="" style="width: 100%;" name="messageleft"></textarea>' +
		'<p style="margin: 0; text-align: right;">' +
		'<a href="javascript:document.leavem.submit();" onfocus="this.blur();" style="color: black; ' +
		'font-weight: bold;">Leave Message</a></p>';
	newForm.setAttribute("method", "post");
	newForm.setAttribute("name", "leavem");
	newForm.setAttribute("action", "village.html");
	newForm.setAttribute("style", "padding: 4px; margin: 4px 0 0 0; font-size: 12px; " +
		"border: 1px dotted rgb(161, 124, 4); background-color: rgb(234, 216, 195); text-align: left;");

	// Leader broadcast option
	if (document.getElementsByName("sendtoall")[0]) {
		var p = document.createElement("p");
		p.innerHTML = '<input type="checkbox" name="sendtoall" value="go" />' +
			'Broadcast to all Villagers (Leader only)';
		p.setAttribute("style", "margin: 0; float: left");
		var node = newForm.getElementsByTagName("p")[0];
		node.parentNode.insertBefore(p, node);
	}

	oldForm.parentNode.replaceChild(newForm, oldForm);

	document.getElementsByName("messageleft")[0].addEventListener(
			'keyup',
			function(event) {
				var ta = document.getElementsByName("messageleft")[0];
				document.getElementById("msgcounter").firstChild.nodeValue = escapeLength(ta.value);
				return;
			},
			false);

}
