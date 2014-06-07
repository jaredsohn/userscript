// ==UserScript==
// @name           Wild West Facebook skillPointClicker
// @namespace      http://www.mdlwebsolutions.com/
// @description    clicks skill point button for 8 gems
// @include        http://apps.facebook.com/wildwests/
// @include        http://wildwest.uka.in/
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.4.3/jquery.min.js
// ==/UserScript==
alert("userscript up");
$(document).ready(function() { alert("jQuery up");$(".submitButton:last").click().hide();});

//added newline to end of file
