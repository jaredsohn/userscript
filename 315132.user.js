// ==UserScript==
// @id             taima.tv-841f64b3-4b16-4754-9138-e220dad6813b@scriptish
// @name           Taima nick inserter
// @version        1.2
// @namespace      
// @author         
// @description    Inserts nick on Taima.tv on click
// @include        http://taima.tv/r/*
// @run-at         document-end
// ==/UserScript==

$=unsafeWindow.jQuery;
insertNick = function(text){$c=$('#chatline');$c.val(text+$c.val());$c.focus();};
$('#messagebuffer').on('click','.username',function(){insertNick($(this).text());})
                   .on('click','.action, .poll-notify',function(){insertNick($(this).text().split(' ')[0]+": ");})
$('#userlist').on('click','span',function(){insertNick($(this).text()+": ");});