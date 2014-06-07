// ==UserScript==
// @name            Hack Forums Username color changer
// @namespace       Snorlax
// @description     Change your username color
// @grant 	    GM_setValue
// @grant 	    GM_getValue
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @require			http://www.openjs.com/scripts/events/keyboard_shortcuts/shortcut.js
// @include         *hackforums.net/showthread.php?tid=*
// @version         1.1
// ==/UserScript==

var str = $("#panel").find('a').attr('href');
var uid = str.replace(/[^0-9]/g, '')

shortcut.add("Ctrl+.",function() {
    var usernameColor = prompt("Color?", usernameColor);
    GM_setValue('usernameColor', usernameColor);
    alert("Your new username color is "+GM_getValue('usernameColor'));
    document.location.reload(true);
});

var username = $('a[href="http://www.hackforums.net/member.php?action=profile&uid='+uid+'"]:first').text();
$('a[href="http://www.hackforums.net/member.php?action=profile&uid='+uid+'"]:not(:first):not([target="_blank"])').find("span").css("color",GM_getValue('usernameColor'));