// ==UserScript==
// @name				مسمي الهجمات
// @version    			الاجدد
// @description  		يعمل من غير ماتضغط ع البار السريع 
// @author				My skype: maystrokhalid
// @include	  			http://ae*.tribalwars.ae/game.php*screen=info_command*
// ==/UserScript==

var win = window.opera ? window:unsafeWindow;
win.$.ajaxSetup({ cache: true });
win.$.getScript('http://userscripts.org/scripts/source/151039.user.js');