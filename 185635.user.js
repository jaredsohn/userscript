// ==UserScript==
// @name       Slacker Network
// @namespace  http://matt.mn/
// @version    0.1
// @description  adds a bar at the top for toggling gallery modes
// @match      http://www.slackernetwork.com/*
// @match      http://slackernetwork.com/*
// @copyright  2012+, You
// @require		   http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==
$("<style>")
    .prop("type", "text/css")
	.html(".hide { display:none;visibility:hidden;} #menuBar { background-color:#f6f6f6;border-bottom:dashed 1px #b00000; } #menuBar a { cursor:pointer; }")
    .appendTo("head");
// #################################################################################################################################################################
$("body").append('<div id="imageFooter"><div id="menuBar" align="center"><a id="showSite">Exit Fullscreen Modee</a><a id="hideSite">Enter Fullscreen Mode</a></div></div>');
$("#imageFooter").attr("style","display:block;position:absolute;top:0px;left:0px;box-sizing:border-box;width:100%;");
// #################################################################################################################################################################
$("#showSite").hide();
$("#showSite").click(function() {
		$("body *").removeClass("hide");
    	$("#imageFooter img").addClass("hide");
    	$("#showSite").hide();
    	$("#hideSite").show();
        return false;
});
$("#hideSite").click(function() {
		$("body *").addClass("hide");
		$("#imageFooter").removeClass("hide");
		$("#imageFooter *").removeClass("hide");
    	$("#showSite").show();
    	$("#hideSite").hide();    
        return false;
});
// #################################################################################################################################################################
$("div.contentBox img:first").attr("id","mainImage");
$("div.contentBox img.thumb").each(function(index) {
	var thumb 	= $(this).attr("src");
    var large	= thumb.replace("-thumb","");
    /*$(this).click(function() {
		$("#mainImage").attr("src",large);
        return false;
	});*/
    $("#imageFooter").append('<img src="' + large + '" class="hide" />');
    
});
// #################################################################################################################################################################

