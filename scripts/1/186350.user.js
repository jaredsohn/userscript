// ==UserScript==
// @id             youtube.com-50b45011-5784-4805-a058-5be068bf2b77
// @name           Youtube no fixed bar
// @version        1.2
// @namespace      http://youtube.com
// @include        http://*.youtube.*
// @include        https://*.youtube.*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// @author         kshade
// @description    Stops Youtube from making the guide bar pinned to the top.
// @run-at         document-end
// ==/UserScript==

$('#masthead-positioner-height-offset').hide();
$('#masthead-positioner').css('position', 'relative');