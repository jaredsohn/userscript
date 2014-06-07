// ==UserScript==
// @name            Hack Forums Wider Text Box
// @namespace       Snorlax
// @description     Changes the width of the current text box on newreply.php
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @include         http://hackforums.net/editpost.php*
// @include         http://www.hackforums.net/editpost.php*
// @include         http://hackforums.net/newreply.php*
// @include         http://www.hackforums.net/newreply.php*
// @include         http://hackforums.net/private.php*
// @include         http://www.hackforums.net/private.php*
// @version         1.1
// ==/UserScript==

$(".messageEditor").css({'width': '99%'});
$("#message_new").css({'width': $(".messageEditor").width()-6});