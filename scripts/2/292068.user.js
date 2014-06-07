// ==UserScript==
// @name         d2jsp Post und Query Blocker
// @version      0.0.3
// @namespace    postblocker
// @include      http://forums.d2jsp.org/*
// @author       Lapdance
// @description  Remove all posts and quotes from users on d2jsp
// @require 	 http://code.jquery.com/jquery-latest.js
// @homepage     http://forums.d2jsp.org/topic.php?t=70135916&f=149
// @icon         http://i.imgur.com/lt2jblX.png
// ==/UserScript==

$("a:contains(moosedoesmeow)").parent('dt').parent('dl').remove();
$("div:contains(moosedoesmeow)").next('.quote2').replaceWith('<div class="quote2">Hier hat moosedoesmeow was geschrieben. Bestimmt Nonsense!</div>');