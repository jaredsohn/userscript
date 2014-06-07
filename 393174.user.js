// ==UserScript==
// @name        No PopupChat Facebook

// @namespace   nopopupfacebook

// @description Abre el chat desde la seccion mensajes y no desde el popup del chat

// @include     https://*.facebook.com/*

// @include     http://*facebook.com/*

// @version     1

// @grant       none

// ==/UserScript==

function fullscreenchat() { //open chat messages in full screen mode
	  window.addEventListener('click',function(e) {

	     //console.log(e.button);
	     // we are now redirecting clicks in the right hand chat window via a new Chat object function via code injection
		 if (e.target.offsetParent.href && e.target.offsetParent.href.match(/\/messages\//) && (e.button!=1)) {  // message links in top bar flyout
		   e.preventDefault();
		   if(e.stopPropagation)
		      e.stopPropagation();
		   window.location.href=e.target.offsetParent.href;
		 }
		 else if(e.target.nodeName=='A' && e.target.href.match(/\/ajax\/messaging\/composer\.php/)) {  // composer link in top bar flyout
		   e.preventDefault();
		   if(e.stopPropagation)
		      e.stopPropagation();
		   if(e.button==1) // middle click
		     window.open('https://www.facebook.com/messages/new');
		   else
		     window.location.href='https://www.facebook.com/messages/new';
		 }
		 else if(e.target.parentElement.nodeName=='A' && e.target.parentElement.className.match(/HovercardMessagesButton/)) {  // message buttons on hovercards
		   e.preventDefault();
		   if(e.stopPropagation)
		      e.stopPropagation();
		   if(e.button==1)
		     window.open(e.target.offsetParent.href);
		   else
		     window.location.href=e.target.offsetParent.href;
		 }
		 else if(e.target.nodeName=='SPAN' && e.target.parentElement.getAttribute('ajaxify') && e.target.parentElement.getAttribute('ajaxify').match(/\/ajax\/messaging\/composer\.php\?/)) {
		   e.preventDefault();
		   if(e.stopPropagation)
		      e.stopPropagation();
		   if(e.button==1)
		     window.open(e.target.parentElement.href);
		   else
		     window.location.href=e.target.parentElement.href;
		 }
        } ,true);

  } // end fullscreenchat function

fullscreenchat();