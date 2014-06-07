// ==UserScript==
// @name        ScrollGuide wiki autocard
// @namespace   https://userscripts.org/scripts/show/169947
// @version     0.1
// @description show cards when hovering an URL
// @grant       GM_addStyle
// @match       http://www.scrollsguide.com/wiki/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js
// @copyright   2013+, Syl
// ==/UserScript==

GM_addStyle("#screenshot{\
	position:absolute;\
	padding:5px;\
	display:none;\
}");

(function() {

// http://cssglobe.com/lab/tooltip/03/

    xOffset = 10;
    yOffset = 30;

    $("a[title]").each(function() {
        $(this).hover(function(e) {
            this.t = this.title;
            this.title = "";
            $("body").append("<p id='screenshot'><img src='http://www.scrollsguide.com/app/getscreenshot.php?scroll="+ this.t.replace(" ", "+") +"' alt='url preview' /></p>");								 
            $("#screenshot")
                .css("top",(e.pageY - xOffset) + "px")
                .css("left",(e.pageX + yOffset) + "px")
                .fadeIn("fast");						
        },
        function(){
            this.title = this.t;	
            $("#screenshot").remove();
        });	
        $(this).mousemove(function(e){
            $("#screenshot")
                .css("top",(e.pageY - xOffset) + "px")
                .css("left",(e.pageX + yOffset) + "px");
        });			
    });

})();