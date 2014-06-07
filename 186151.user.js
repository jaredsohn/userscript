// ==UserScript==
// @name       	Facebook auto-like script
// @namespace  	https://github.com/yvescourtois/your-custom-url
// @version    	3.1
// @description will like every post on your wall
// @match       https://www.facebook.com/courtois1337
// @copyright  	none
// @require 	http://code.jquery.com/jquery-latest.js
// @owner 		Yves Courtois
// ==/UserScript==


// $("._6-6._6-7").size()== 0 means none is active on the bar 
// $("._6-6._6-7").text()=="Timeline") means it's on the right place
if($("._6-6._6-7").size()== 0 || $("._6-6._6-7").text()=="Timeline") {
    $(".userContent").each(function() {
        var txt = $(this).text().split(" ");
        
        // insert anything you want to check against in the find array. 
        // example: var find = ["birthday","bday","b-day"];
        var find = [""];
        var found = 0;
        
        // check if found
        for(var i = 0; i < find.length; ++i) {
            found = $.inArray(find[i], txt);
            if(found!=-1) {
                break;
            }
        }
        
        // this is in case you don't want to search for anything, and like each post regardless
        if(find.length==1 && find[0] == "") {
            found = 1;
        }
        
        // this means something in the find array was found
        if(found != -1) {
            var tmpVal = $(this).parentsUntil(".timelineUnitContainer").find(".UFILikeLink").text();
            if( tmpVal == "Like" ) {
                var a = $(this).parentsUntil(".timelineUnitContainer").find(".UFILikeLink");
                a[0].click();
            }
        }
    });
}