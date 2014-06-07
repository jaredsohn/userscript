// ==UserScript== 
// @name		HWM text counter
// @namespace		alien2711@rambler.ru
// @description		The script counts up (approximately) quantity of the entered symbols in entry fields: Private mail, Notebook, Clan description, Clan messages, Forum.
// @include		http://www.heroeswm.ru/clan_control.php*
// @include		http://www.heroeswm.ru/sms.php?notebook*
// @include		http://www.heroeswm.ru/forum_messages.php*
// @include		http://www.heroeswm.ru/new_topic.php*
// @include		http://www.heroeswm.ru/sms-create.php*
// @include		http://www.heroeswm.ru/clan_broadcast.php*
// @include		http://www.lordswm.com/clan_control.php*
// @include		http://www.lordswm.com/sms.php?notebook*
// @include		http://www.lordswm.com/forum_messages.php*
// @include		http://www.lordswm.com/new_topic.php*
// @include		http://www.lordswm.com/sms-create.php*
// @include		http://www.lordswm.com/clan_broadcast.php*
// ==/UserScript==

/*
 * Copyright (c) 2010 by bonArt <alien2711@rambler.ru>
 *
 *   This program is free software; you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation; either version 2 of the License, or
 *   (at your option) any later version.
 *
 *
 * Script itself:
 * http://userscripts.org/scripts/show/93000
 */

//====================Page detection====================

var url_cur = location.href ;

var url_clan = "clan_control.php";
var url_note = "sms.php?notebook";
var url_reply = "forum_messages.php";
var url_newmsg = "new_topic.php";
var url_sms = "sms-create.php";
var url_clan_sms = "clan_broadcast.php";
var url_sett = "pers_settings.php";

//====================Text blocks====================

if (url_cur.indexOf("heroeswm.ru") != -1) {
	var msg_head = "\u0422\u0435\u043C\u0430\u003A "; //head
	var msg_body_sms = "\u0422\u0435\u043B\u043E \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F\u003A "; //message body
	var msg_body = "";
	var used_smb = "\u0412\u0432\u0435\u0434\u0435\u043D\u043E "; //used
	var chars_of = " \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432 \u0438\u0437 "; //chars of
}
else if (url_cur.indexOf("lordswm.com") != -1) {
	var msg_head = "Subject: "; //head
	var msg_body_sms = "Message: "; //message body
	var msg_body = "";
	var used_smb = "used "; //used
	var chars_of = " chars of "; //chars of
}

//====================Nod generation====================

if ((url_cur.indexOf(url_sms) != -1) || (url_cur.indexOf(url_clan_sms) != -1) || (url_cur.indexOf(url_newmsg) != -1)) {
	var tr_th = document.createElement( 'tr' );
	var td_th = document.createElement( 'td' );
	var sp_th = document.createElement( 'span' );
}

var tr_ta = document.createElement( 'tr' );
var td_ta = document.createElement( 'td' );
var sp_ta = document.createElement( 'span' );

//====================Finalizing nod structure====================

if ((url_cur.indexOf(url_sms) != -1) || (url_cur.indexOf(url_clan_sms) != -1) || (url_cur.indexOf(url_newmsg) != -1)) {
	tr_th.appendChild(td_th);
	td_th.appendChild(sp_th);
}

tr_ta.appendChild(td_ta);
td_ta.appendChild(sp_ta);

//====================Pages parameters====================

var t_col = 0;

if (url_cur.indexOf(url_clan) != -1) {
	var msg_form = document.forms[1];
	invis_ta = document.forms[1][0];
	msg_ta = document.forms[1][1];
	sp_th = msg_ta;

	var max_chars_ta = 9800;

	td_ta.className = "wbwhite";
	td_ta.style.borderTopWidth = "0px";
	invis_ta.parentNode.style.borderBottomWidth = "0px";
	t_col = 1;

	msg_ta.rows = 7;
}

if (url_cur.indexOf(url_note) != -1) {
	var msg_form = document.forms[1];
	msg_ta = document.forms[1][1];
	sp_th = msg_ta;

	var max_chars_ta = 2900;

	t_col = 1;
	msg_ta.parentNode.className = "wblight";
	msg_ta.parentNode.style.borderBottomWidth = "0px";
	td_ta.className = "wblight";
	td_ta.style.borderTopWidth = "0px";
	msg_ta.parentNode.parentNode.parentNode.parentNode.cellSpacing = 0;

	msg_ta.rows = 30;
}

if (url_cur.indexOf(url_reply) != -1) {
	var msg_form = document.forms[0];
	msg_ta = document.forms[0][1];
	sp_th = msg_ta;

	var max_chars_ta = 3000;

	t_col = 2;

	msg_ta.rows = 15;
}

if (url_cur.indexOf(url_newmsg) != -1) {
	var msg_form = document.forms[0];
	msg_th = document.forms[0][1];
	msg_ta = document.forms[0][2];

	var max_chars_th = 70;
	var max_chars_ta = 3000;
	msg_body = msg_body_sms;

	t_col = 2;

	msg_ta.rows = 10;
}

if ((url_cur.indexOf(url_reply) != -1) && (document.forms[0].length == 5)) {
	var msg_form = document.forms[1];
	msg_ta = document.forms[1][2];

	var max_chars_ta = 3000;

	t_col = 2;

	msg_ta.rows = 15;
}

if (url_cur.indexOf(url_sms) != -1) {
	var msg_form = document.forms[0];
	var msg_th = document.forms[0][3];
	var msg_ta = document.forms[0][4];

	var max_chars_th = 70;
	var max_chars_ta = 3900;

	t_col = 2;
	msg_body = msg_body_sms;

	msg_ta.rows = 10;
}

if (url_cur.indexOf(url_clan_sms) != -1) {
	var msg_form = document.forms[0];
	var msg_th = document.forms[0][1];
	var msg_ta = document.forms[0][2];

	var max_chars_th = 70;
	var max_chars_ta = 3900;

	t_col = 2;
	msg_body = msg_body_sms;

	msg_ta.rows = 17;
}

//====================Text generation====================

if ((url_cur.indexOf(url_sms) != -1) || (url_cur.indexOf(url_clan_sms) != -1) || (url_cur.indexOf(url_newmsg) != -1)) {
	sp_th.innerHTML = msg_head + used_smb + "0" + chars_of + max_chars_th;
	td_th.colSpan = t_col;
	sp_th.style.marginLeft = "25";
	sp_th.style.fontSize = "12px";
}

	sp_ta.innerHTML = msg_body + used_smb + "0" + chars_of + max_chars_ta;
	td_ta.colSpan = t_col;
	sp_ta.style.marginLeft = "25";
	sp_ta.style.fontSize = "12px";


//====================Keypress listener====================

if ((url_cur.indexOf(url_sms) != -1) || (url_cur.indexOf(url_clan_sms) != -1) || (url_cur.indexOf(url_newmsg) != -1)) {
	msg_th.addEventListener( "keypress", countChars , false );
}

msg_ta.addEventListener( "keypress", countChars , false );

//====================Inserting nod blocks into a document====================

if ((url_cur.indexOf(url_sms) != -1) || (url_cur.indexOf(url_newmsg) != -1)) {
	insertAfter(msg_th.parentNode.parentNode.parentNode, tr_th, msg_ta.parentNode.parentNode.parentNode);
}

if (url_cur.indexOf(url_clan_sms) != -1) {
	insertAfter(msg_th.parentNode.parentNode.parentNode, tr_th, msg_ta.parentNode.parentNode);
}

if ((url_cur.indexOf(url_sms) != -1) || (url_cur.indexOf(url_reply) != -1) || (url_cur.indexOf(url_newmsg) != -1)) {
	insertAfter(msg_ta.parentNode.parentNode.parentNode.parentNode, tr_ta, sp_th.parentNode.parentNode);
}

if (url_cur.indexOf(url_reply) != -1) {
	insertAfter(msg_ta.parentNode.parentNode.parentNode.parentNode, tr_ta, msg_ta.parentNode.parentNode.parentNode);
}

if ((url_cur.indexOf(url_clan) != -1) || (url_cur.indexOf(url_note) != -1) || (url_cur.indexOf(url_clan_sms) != -1)) {
	insertAfter(msg_ta.parentNode.parentNode.parentNode, tr_ta, sp_th.parentNode.parentNode);
}

//====================Functions====================

function countChars() {
	if ((url_cur.indexOf(url_sms) != -1) || (url_cur.indexOf(url_clan_sms) != -1) || (url_cur.indexOf(url_newmsg) != -1)) {
		setTimeout( function() { countCharsChange_th() } , 100 );
	}
	setTimeout( function() { countCharsChange_ta() } , 100 ); // workaround for pasting from clipboard
}

function countCharsChange_th() {
	if ((url_cur.indexOf(url_sms) != -1) || (url_cur.indexOf(url_clan_sms) != -1) || (url_cur.indexOf(url_newmsg) != -1)) {
		sp_th.innerHTML = msg_head + used_smb + msg_th.value.length + chars_of + max_chars_th;
	}
}

function countCharsChange_ta() {
	sp_ta.innerHTML = msg_body + used_smb + msg_ta.value.length + chars_of + max_chars_ta;
}

function insertAfter(parent, node, referenceNode) {
	parent.insertBefore(node, referenceNode.nextSibling);
}