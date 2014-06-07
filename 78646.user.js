// ==UserScript==
// @name          UNLIMITED CHAR SMS SENDER
// @namespace     amarff
// @description   Send UNLIMITED CHAR SMS from fullonsms.com
// @include       http://*fullonsms.com/*
// ==/UserScript==


if(document.location=="http://fullonsms.com/home.php"||document.location=="http://www.fullonsms.com/home.php")
document.location="javascript: function textCounter1(f1,f2,f3){void(0);};";