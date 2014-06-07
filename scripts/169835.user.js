// ==UserScript==
// @id             msilab.net-3d7d6e54-676d-42ea-8077-e54b5549bf0b@script
// @name           msilab captcha autoresolve
// @version        1.0
// @history        1.0 Релиз скрипта
// @namespace      http://userscripts.org/scripts/show/169835
// @author         Black_Sun
// @description    
// @include        http://msilab.net/rus*
// @require	http://code.jquery.com/jquery-latest.min.js
// @run-at         document-end
// ==/UserScript==

$(function(){
var cap=$('div[style^="container"]').find('p').last().text();
cap=cap.replace(/(.*)(\d{1,2}\s*\+\s*\d{1,2})(.*)/ig,'$2');
var capres=eval(cap);
$('#cptinp').val(capres);
});