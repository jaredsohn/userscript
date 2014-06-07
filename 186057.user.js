// ==UserScript==
// @name       Hocam Big Pics
// @namespace  http://actividi.com/Rheanorath
// @version    0.1
// @require  http://code.jquery.com/jquery-latest.min.js
// @description  For Social Network Hocam to See the Bigger Pics
// @copyright  2013+, Rheanorath
// @match      		http://*.hocam.com/*
// @include       	http://hocam.com/*
// ==/UserScript==

$(document).on("mouseover", "img", function() {
    var p_id = $(this).attr("id");
    var mini = $(this).attr("src");
    var maxi = mini.replace("mini", "maxi");
    $("body").append('<img class="p_max" id="o' + p_id + '" src="' + maxi + '" style="top: 0; left: 0; width: 320px; height: auto; position: fixed; z-index: 999; " />');
}).on("mouseleave", "img", function() {
	$(".p_max").remove(); 
});
