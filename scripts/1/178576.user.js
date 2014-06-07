// ==UserScript==
// @name            Hack Forums Allow fullscreen YouTube videos
// @namespace       Snorlax
// @author			Snorlax
// @description     Enables fullscreen for YouTube embedded videos
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @include         *hackforums.net/showthread.php*
// @version         1.0
// ==/UserScript==

$(".video_embed").append('<param name="allowFullScreen" value="true">');