// ==UserScript==
// @name	Travian Search Bar - in Hebrew
// @Author	2pac & JF & DMaster
// @description	Travian search Bar - in Hebrew
// @version	7.2
// @include	http://*.travian.co.il/*.php*
// @exclude	http://*.travian.co.il/login.php
// @exclude	http://*.travian.co.il/logout.php
// @exclude	http://forum.travian.*
// ==/UserScript==

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
	}
	return null;
}

function selected(opt) {
	var selectedOption = readCookie('traviansearch_selected_option');
	if (opt == selectedOption) {
		return ' selected="yes" ';
	}
	return false;
}

window.selectOption = function(opt) {
	if (opt != "" && opt != 0) {
		document.getElementById('hidden_field_placeholder').innerHTML = '<input type="hidden" name="id" value="' + opt + '">';
		createCookie('traviansearch_selected_option', Number(opt), 365);
	}
	else {
		document.getElementById('hidden_field_placeholder').innerHTML = '';
	}
}

var searchform = '<form action="statistiken.php" method="POST" id="searchform" style="position: absolute;top:-58px;left:-40px">';
searchform += '<span id="hidden_field_placeholder"></span>';
searchform += '<input type="text" maxlength="20" size="10" value="" name="spieler" id="searchbox_player" class="fm f80" style="margin:2px;" />';
searchform += '<select class="fm f80" style="margin:2px; padding:1px;" id="opsel">';
searchform += '<option value="0" ' + selected(0) + '>שחקן</option>';
searchform += '<option value="2"' + selected(2) + '>כפרים</option>';
searchform += '<option value="4"' + selected(4) + '>בריתות</option>';
searchform += '<option value="31"' + selected(31) + '>תקיפה</option>';
searchform += '<option value="32"' + selected(32) + '>הגנה</option>';
searchform += '</select><input type="submit" value="חפש" class="std" />';
searchform += '</form>';

var rightSidebar = document.getElementById('lright1');
if (!rightSidebar) {
	var lright1DIV = document.createElement('div');
	var lmidlcDIV = document.getElementById('lmidlc');

	lright1DIV.setAttribute('id', 'lright1');
	rightSidebar = lmidlcDIV.parentNode.appendChild(lright1DIV);
}

rightSidebar.innerHTML = searchform + rightSidebar.innerHTML;