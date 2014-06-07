// ==UserScript==
	// @name          Exetel_sms_autoredirect.user.js
	// @namespace     http://userscripts.org/
	// @author        ceejinc
		// @description	  Redirects from exetel sms details to sms send page
	// @version       1.0.0
	// @include       https://www.exetel.com.au/members/send_web_sms.php
// ==/UserScript==

//location.replace("https://www.exetel.com.au/members/send_web_sms.php"); 
/*
iframe = document.createElement('iframe');
         iframe.setAttribute('width','100%');
         iframe.setAttribute('height','600px');
         iframe.setAttribute('src','https://www.exetel.com.au/members/send_web_sms.php');
         iframe.className='sens_sms';
         body.appendChild(iframe);
*/



window.open("https://www.exetel.com.au/members/send_web_sms.php");
