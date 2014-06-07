// ==UserScript==
// @name Unofficial IAU Extentision
// @icon https://twimg0-a.akamaihd.net/profile_images/1256167875/header-new_reasonably_small.jpg
// @namespace http://isanyoneup.com/
// @description Make browsing IAU better and fancier
// @version 0.2
// @include	http://isanyoneup.com/*/*/*/*
// @include	http://www.isanyoneup.com/*/*/*/*
// @exclude	http://isanyoneup.com/
// @exclude	http://www.isanyoneup.com/
// @exclude http://isanyoneup.com/category/*
// @exclude http://www.isanyoneup.com/category/*	
// ==/UserScript==
 var GM_Head=document.getElementsByTagName('head')[0] || document.documentElement, GM_JQ=document.createElement('script');
            GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
            GM_JQ.type = 'text/javascript';
            GM_JQ.async = true;
            GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
var GM_Head=document.getElementsByTagName('head')[0] || document.documentElement, GM_SB=document.createElement('script');
  GM_SB.src = 'https://bitbucket.org/bpierre/jquery-superbox/raw/351e80228f31/jquery.superbox.js';
            GM_SB.type = 'text/javascript';
            GM_SB.async = true;
            GM_Head.insertBefore(GM_SB, GM_Head.firstChild);
var GM_Head=document.getElementsByTagName('head')[0] || document.documentElement, GM_SBS=document.createElement('script');
  			GM_SBS.text='$.superbox();'
            GM_SBS.type = 'text/javascript';
            GM_SBS.async = true;
            GM_Head.insertBefore(GM_SB, GM_Head.firstChild);        
var $ = unsafeWindow.jQuery.noConflict(true);
$("<link/>", {
   rel: "stylesheet",
   type: "text/css",
   href: "http://pierrebertet.net/projects/jquery_superbox/jquery.superbox.css"
}).appendTo("head");

$("div.entry.clearfix").prepend("<input type=\"button\" onClick='$.superbox(); $(\"a.next\").css(\"padding-left\",\"10px\"); $(this).remove(); $(\"div.entry.clearfix img:eq(0)\").click();' value=\"Start Gallery\"/>");
$("div.entry.clearfix").prepend("<form style=\"display:inline;\" method=\"get\" action=\"http://www.facebook.com/search.php\"><label for=\"facebook_q\">Search Facebook: </label><input type=\"text\" name=\"q\" id=\"facebook_q\"/><input type=\"Submit\" value=\"Search\"/></form>");      
$("div.entry.clearfix").append("<iframe allowtransparency=\"true\" frameborder=\"0\" scrolling=\"no\" src=\"//platform.twitter.com/widgets/tweet_button.html?text="+encodeURI(document.title)+"\" style=\"width:105px; height:20px;\"></iframe>");
$("div.entry.clearfix").append("<a href=\"http://www.tumblr.com/share\" title=\"Share on Tumblr\" style=\"display:inline-block; text-indent:-9999px; overflow:hidden; width:81px; height:20px; background:url('http://platform.tumblr.com/v1/share_1.png') top left no-repeat transparent;\">Share on Tumblr</a>");
$("div.entry.clearfix").append("<span style=\"padding:0px 4px;\"></span><div class=\"g-plusone\" style=\"display:inline;\" data-href=\""+window.location.href+"\"></div>");
var i;
	for (i = 0; i <= $("div.entry.clearfix img").size(); i++) {
	var tempimgsrc=$("div.entry.clearfix img:eq(" + i + ")").attr('src');
$("div.entry.clearfix img:eq(" + i + ")").replaceWith("<a rel=\"superbox[gallery][the_gallery]\" href=\"" + $("div.entry.clearfix img:eq(" + i + ")").attr('src') + "\"><img src=\""+tempimgsrc+"\" /></a>");
}
$("div.entry.clearfix").append("<script type=\"text/javascript\" src=\"http://platform.tumblr.com/v1/share.js\"></script>");
$("div.entry.clearfix").append("<script type=\"text/javascript\" src=\"https://apis.google.com/js/plusone.js\"></script>");
$("div.entry.clearfix").append("<script type=\"text/javascript\">gapi.plusone.go();</script>");