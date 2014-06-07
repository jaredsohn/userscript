// ==UserScript==
// @name            Hack Forums Embed [img]-tags with images in PMs
// @namespace       Snorlax
// @description     Displays images in PMs even though it is disabled 
// @require         http://code.jquery.com/jquery-2.0.3.js
// @include         *hackforums.net/private.php*
// @version         1.0
// ==/UserScript==

$(".post_content").html($(".post_content").html().replace(/\[img\](.*?)\[\/img\]/g, '<img src="$1" />'));