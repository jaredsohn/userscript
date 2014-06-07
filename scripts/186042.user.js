// ==UserScript==
// @name    HackForums - Username Tweeks
// @namespace  Avärage Dalo & Snorlax
// @description  Give yourself a good looking username
// @grant             GM_setValue
// @grant             GM_getValue
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @require            http://www.openjs.com/scripts/events/keyboard_shortcuts/shortcut.js
// @include  *hackforums.net/showthread.php?tid=*
// @version  1.0
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
$('a[href="http://www.hackforums.net/member.php?action=profile&uid='+uid+'"]:not(:first):not([target="_blank"])').css("color",GM_getValue('usernameColor'));
$('a[href="http://www.hackforums.net/member.php?action=profile&uid='+uid+'"]:not(:first):not([target="_blank"])').css("text-shadow","0px 2px 2px black");
$('a[href="http://www.hackforums.net/member.php?action=profile&uid='+uid+'"]:not(:first):not([target="_blank"])').css("background","url(http://img547.imageshack.us/img547/2571/z1c.gif)");