// ==UserScript==
// @name       LoL Forum - Code Tags
// @namespace  http://bitbucket.org/emallson
// @version    0.4
// @description  Allows the usage of [code] bbcode tags on the forums.
// @include      http://*.leagueoflegends.com/board/showthread.php*
// @require	http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.js
// @run-at document-end
// @copyright  2013+, Atlanis
// @updateURL http://userscripts.org/scripts/source/175492.user.js
// ==/UserScript==

var codeRe = /\[code\]([\s\S]+?)\[\/code\]/gm;
var brRe = /<br\/?>/gm;
$('.post-message').each(function() { $(this).html($(this).html().replace(codeRe, "<pre>$1</pre>")) })
$("pre").each(function() { $(this).html($(this).html().replace(brRe, "")); });