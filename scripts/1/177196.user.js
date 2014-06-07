// ==UserScript==
// @name       GeoGuessr Map Expand
// @namespace  http://stephanos.github.com
// @version    0.1.1
// @description  Allows you to expand the map on GeoGuessr
// @match http://*.geoguessr.com/*
// @match http://www.geoguessr.com/*
// @copyright  2012+, Stephanos
// ==/UserScript==

var attemptInstall = function() {
    var target = $("#sb_last_points")
    if (target.length > 0) {
		install();
    } else {
    	setTimeout(attemptInstall, 1000);
    }
}

var install = function() {
	var target = $("#returnToStart")
	$(target).before("<div id='userscript-zoom'><span>Expand Map<span></div>");
    $("body").append('<style type="text/css">' + 
                     "#userscript-zoom { float: right; background-color: #262626; margin-top: 30px; padding: 18px 10px 18px 10px; cursor: pointer; }" +
                     "#userscript-zoom:hover { background-color: #464646; }" +
                     "#rightColumnContainer.expand { left: 15px; bottom: 5px; }" +
                     "#rightColumnContainer.expand #rightcolumn { width: 99%; height: 99%; }" +
                     "#rightColumnContainer.expand #guessMap { width: 99%; height: 90%; }" +
	'</style>');
    $("#userscript-zoom").click(function() { 
        if ($("#rightColumnContainer").is('.expand')) {
            $(this).find("span").text("Expand Map")
        } else {
            $(this).find("span").text("Collapse Map")
        };
		$("#rightColumnContainer").toggleClass('expand');
        
        // force Google Map to resize
		$(window).trigger('resize');
    })
};
 
$(document).ready(function() {
	attemptInstall();
    
    $(window).resize(function() {
        var style = "";
        if ($("#rightColumnContainer").is('.expand')) {
            var totalMapViewHeight = $("#rightcolumn").height();
            var totalMapControlsHeight = $("#scoreBoard").height() + $("#returnToStart").height();
            style = "height: " + (totalMapViewHeight - totalMapControlsHeight - 75) + "px";
        }
        $("#guessMapContainer").attr("style", style);
    });
});