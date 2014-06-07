// ==UserScript==
// @name           remove reddit karma
// @namespace      System
// @description    Removes all karma from reddit
// @include        http://*.reddit.*
// ==/UserScript==

$(".midcol .score,.karma").live("load",function(){ $(this).hmtl("&#8734;"); });

$(".userkarma,.tagline .score,.collapsed .score,.linkinfo .score,.linkinfo .upvotes,.linkinfo .downvotes").remove();

var user = $(".user").html();
$(".user").html(user.replace("&nbsp;()",""));