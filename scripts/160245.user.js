// ==UserScript==
// @name           eRepublik Notifier
// @namespace      eRepublikNotifier
// @version        1.5
// @author         ZordaN
// @include        http://www.erepublik.com/en
// @include        http://www.erepublik.com/ar
// @include        http://www.erepublik.com/bg
// @include        http://www.erepublik.com/br
// @include        http://www.erepublik.com/cn
// @include        http://www.erepublik.com/de
// @include        http://www.erepublik.com/es
// @include        http://www.erepublik.com/fa
// @include        http://www.erepublik.com/fr
// @include        http://www.erepublik.com/gr
// @include        http://www.erepublik.com/hr
// @include        http://www.erepublik.com/hu
// @include        http://www.erepublik.com/id
// @include        http://www.erepublik.com/it
// @include        http://www.erepublik.com/mk
// @include        http://www.erepublik.com/pl
// @include        http://www.erepublik.com/pt
// @include        http://www.erepublik.com/ro
// @include        http://www.erepublik.com/ru
// @include        http://www.erepublik.com/sl
// @include        http://www.erepublik.com/sq
// @include        http://www.erepublik.com/sr
// @include        http://www.erepublik.com/tr
// @include        http://www.erepublik.com/tw
// @include        http://www.erepublik.com/uk
// @downloadURL	   http://userscripts.org/scripts/source/160245.user.js
// @updateURL	   http://userscripts.org/scripts/source/160245.meta.js
// ==/UserScript==

function GM_wait(){if(typeof unsafeWindow.jQuery=='undefined'){window.setTimeout(GM_wait,100);}else{$=unsafeWindow.jQuery;letsJQuery();}}
GM_wait();function letsJQuery(){var NotifierState=localStorage.getItem('onoff');$('head').append('<style>.ActiveStateOn{font-weight:bolder;text-shadow:0px 0px 15px green;}.ActiveStateOff{font-weight:bolder;text-shadow:0px 0px 15px red;}.BoldNotifierText{font-weight:bolder;}</style>');$('div.user_health').append('<center><div id="NotifierStateContainer">Notifier '+'<button id="SetNotifierOn">On</button> <button id="SetNotifierOff">Off</button></div><center>');$('button#SetNotifierOn').click(function(){localStorage.setItem('onoff','on');$('button#SetNotifierOn').addClass('selected');location.href=location.href;});$('button#SetNotifierOff').click(function(){localStorage.setItem('onoff','off');location.href=location.href;});if(NotifierState==='on'){$('button#SetNotifierOn').addClass('ActiveStateOn');$('div#NotifierStateContainer').addClass('BoldNotifierText');var msgAll=$('a.notify.nmail').attr('title').split(":");var msgNum=msgAll[1];if(msgNum>0){$('div.erpk_time').append('<iframe width="1" height="1" src="http://www.youtube.com/embed/ziwhh62Ny0Y?wmode=transparent&amp;autoplay=1&amp;autohide=0" frameborder="0" allowfullscreen></iframe>');$(document).ready(function(){setTimeout(function(){location.href=location.href},300000);});}
else{$(document).ready(function(){setTimeout(function(){location.href=location.href},300000);});}}
else{$('button#SetNotifierOff').addClass('ActiveStateOff');$('div#NotifierStateContainer').addClass('BoldNotifierText');}}