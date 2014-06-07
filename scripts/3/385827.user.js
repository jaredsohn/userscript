// ==UserScript==
// @id             tv.2ch.hk-841f64b3-4b16-4754-9138-e220dad6813b@scriptish
// @name           2chTV nick inserter
// @version        1.2.1
// @namespace      
// @author         
// @description    Inserts nick on 2chTV on click
// @include        http://tv.2ch.hk/*
// @run-at         document-end
// ==/UserScript==

$=unsafeWindow.jQuery;
insertNick = function(text){$c=$('#chatline');$c.val(text+$c.val());$c.focus();};
$('#messagebuffer').on('click','.username',function(){insertNick($(this).text());})
                   .on('click','.action, .poll-notify',function(){insertNick($(this).text().split(' ')[0]+": ");})
$('#userlist').on('click','span',function(){insertNick($(this).text()+": ");});