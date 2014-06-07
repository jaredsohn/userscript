// ==UserScript==
// @name           back to main page
// @include        http://ver3.way2sms.com/jsp/ForgotPassword.jsp
// @include        http://ver3.way2sms.com/jsp/ForgotPassword.jsp
// ==/UserScript==

var loc=window.location.hostname+"/jsp/ForgotPassword.jsp";
loc ="http://"+loc;

document.location=loc;