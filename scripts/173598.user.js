// ==UserScript==
// @name            Hack Forums Quick report box
// @namespace       Snorlax
// @description     Pops up a report box instead of a window
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @include         *hackforums.net/showthread.php?tid=*
// @include 		*hackforums.net/report.php?pid=*
// @version         1.0
// ==/UserScript==

$('a[title*="Report this post"]').each(function(){
    $(this).click(function(){
        str = $(this).attr("href");
        postID = str.replace(/[^0-9]/g, '');
        $(this).after("<div style='position:absolute;z-index:10000;padding:5px;margin-top:-360px;background-color:#333333;border:5px ridge #4F3A6B;right:10%;'><iframe width='400px' height='300px' src='http://www.hackforums.net/report.php?pid="+postID+"'></iframe><br /><button class='closeWindow' style='float:right;'>Close</button></div>");
        $(".closeWindow").click(function(){
            $(this).parent("div").hide();
        });
        return false;
    });
});

var url = window.location.href;
if (url.search("hackforums.net/report.php?") > 0) {
	$('a[href*="javascript"]').parent("div").hide();
}