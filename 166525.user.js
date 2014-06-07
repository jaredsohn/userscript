// ==UserScript==
// @name        YouTube HTML5 on!
// @include     http://youtube.com/watch*
// @include     http://www.youtube.com/watch*
// @include     https://youtube.com/watch*
// @include     https://www.youtube.com/watch*
// @version     1
// @grant       none
// @require	    http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

$("#eow-title").append(' <span style="text-decoration: underline; cursor: pointer; color: #9aa;">Display HTML5 video</span>');

$("#eow-title span").click(function() {
    idv = $("input[name='video_id']").attr("value");
    $("body").html('<iframe width="853" height="480" src="http://www.youtube.com/embed/' + idv + '" frameborder="0" allowfullscreen></iframe>');
});
