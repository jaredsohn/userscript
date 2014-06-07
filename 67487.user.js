// ==UserScript==
// @name           remove reply link
// @namespace      Demented_Clown
// @description    removes the reply link from individual posts
// @include        http://*torn.com/forums.php?forumID=*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js

  $(document).ready(function() {
$("a:contains('Reply')").css("display", "none");});


// ==/UserScript==
