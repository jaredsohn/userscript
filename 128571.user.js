// ==UserScript==
// @name       Mibbit Hangul Encoding
// @version    0.1
// @description Mibbit Hangul Encoding
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js
// @include    https://my.chat.mibbit.com/home
// @copyright  2011+, You
// ==/UserScript==

function startScript() 
{
    $("#ircserver")[0].innerHTML = '<option value="irc.hanirc.org:+8080">HanIRC</option><option value="holywar.hanirc.org">HanIRC(Holywar)</option><option value="irc.rizon.net">RIZON</option>';
    $("#irccharset")[0].innerHTML = '<option value="CP949">CP949</option><option value="UTF-8">UTF-8</option>';
    $("#opt_charset").show();
}

function callFunc()
{
    var t=window.setTimeout(startScript,1000);
}

startScript();