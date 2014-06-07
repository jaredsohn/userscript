// ==UserScript==
// @name           test2
// @namespace      http://userscripts.org/users/129191
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// (For whatever reason, http://code.jquery.com/jquery-latest.js (1.4.1) doesn't work)
// @include        *
// ==/UserScript==

//i = GM_getValue('i') || 0;
//unsafeWindow.console.log(window.location.href + ' ' + jQuery('#canvas_frame').contents().find('img').size() + ' on page');
//unsafeWindow.console.log(i, window);
////unsafeWindow.console.log(i, jQuery('iframe').each(function() {unsafeWindow.console.log(this)}));
//window["foo" + i] = function() {
//	unsafeWindow.console.log(window.location.href + ': ' + i + 'th time: ' + jQuery(window).contents().find('img').size() + ' on page');
//}

//setTimeout(window["foo" + i], 2000);
//unsafeWindow.setTimeout(function() {unsafeWindow.console.log('hi')}, 2000);
//setTimeout(function() { unsafeWindow.console.log(jQuery('#canvas_frame').contents().find('img[width=904]')); }, 4000);


//(window["foo" + i])();
//GM_setValue('i', i+1)