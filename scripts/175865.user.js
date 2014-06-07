// ==UserScript==
// @name       BauReplyStripper
// @namespace  SalamandersScripts
// @match      http://broniesaustralia.com.au/newreply.php*replyto=*
// @match      http://broniesaustralia.com.au/private.php*action=send*do=reply*
// @match      http://broniesaustralia.com.au/private.php*do=reply*action=send*
// @require    http://ajax.googleapis.com/ajax/libs/jquery/2.0.2/jquery.min.js
// @version    1.0
// @description  Removes tags in quoted post
// ==/UserScript==


var jq = jQuery.noConflict(true);

var IMAGE_TAGS = /\[img\]([^\[]*)\[\/img\]/gi;
var VIDEO_TAGS = /\[video[^\]]*\]([^\[]*)\[\/video\]/gi;
var IMAGE_REPLACE_FORMAT = '[url=$1](image)[/url]';
var VIDEO_REPLACE_FORMAT = '[url=$1](video)[/url]';



jq(document).ready(function()
{
    var old = jq('#message_new').val();
    
    var noImgTags  = old.replace(IMAGE_TAGS, IMAGE_REPLACE_FORMAT);
    
    var noVideoTags = noImgTags.replace(VIDEO_TAGS, VIDEO_REPLACE_FORMAT);
    
    jq('#message_new').val(noVideoTags);
});