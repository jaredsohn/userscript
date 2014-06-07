// ==UserScript==
// @name        GranicusHTML5
// @namespace   http://use.i.E.your.homepage/
// @version     0.1
// @description Add html5 support to granicus
// @match       http://tampermonkey.net/index.php?version=3.6.3737.80&ext=dhdg&updated=true
// @copyright   2014+, Andrew Somerville
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @include     http://*.granicus.com/MediaPlayer.php*
// ==/UserScript==

//GM_CSS( "http://vjs.zencdn.net/4.2/video-js.css" )
$("head link[rel='stylesheet']").last().after("<link rel='stylesheet' href='http://vjs.zencdn.net/4.2/video-js.css' type='text/css' media='screen'>");

$("#MediaPlayerContainer").remove();
$("#video").prepend("\
<video id=\"example_video_1\" style=\"top: 50px\" class=\"video-js vjs-default-skin\"\
  controls preload=\"auto\" width=\"480\" height=\"264\"\
  data-setup=\'{\"example_option\":true}\'>\
 <source src=\"" + downloadLinks[0][1] + "\"  type=\"video/mp4\" />\
</video>"                         ); 

