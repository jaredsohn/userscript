// ==UserScript==
// @name           Show Sender's Email in GMail
// @namespace      http://blogeek.ru/
// @description    Shows e-mail after sender's name
// @include        http://mail.google.com/mail/*
// @include        https://mail.google.com/mail/*
// @include        http://mail.google.com/a/*
// @include        https://mail.google.com/a/*
// @version        0.2.1
// ==/UserScript==

window.addEventListener('load', function() {
    window.setInterval(function() {
	if (window.location.href.match(/.*#\w+\/\w+$/)) { // catch mail/#folder/hash and mail/?hl=en&shva=1#folder/hash
	    headers = document.getElementById("canvas_frame").contentDocument.getElementsByClassName("gD");
	    for (i = 0; i < headers.length; i++) {
	        if (headers[i].textContent.charAt(headers[i].textContent.length-1) != ' ') //marker is nbsp here, not space
	    	 headers[i].firstChild.textContent += ' <' + headers[i].getAttribute('email') + '> ';
	    }
	}
    }, 1000);
}, true);
