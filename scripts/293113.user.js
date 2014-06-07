// ==UserScript==
// @name        HBOPlayLight
// @namespace   http://userscripts.org/user/robert843
// @include     https://gamfi.pl/hbo/*
// @version     1
// @grant       none
// ==/UserScript==
$(document).ready(function() {  
//alert("ON");
    	$(".section_animation").remove();
        $("#app_footer").remove();
        $("body").css("background","#BFBFBF");
        $(".lamp").remove();
        $(".prizes_page").css("background","red");

    	var heads = document.getElementsByTagName("head");
    	if (heads.length > 0) {
    		var node = document.createElement("style");
    		node.type = "text/css";
    		node.appendChild(document.createTextNode(".prizes_page { color: white; background: #BFBFBF;!important }"));
    		heads[0].appendChild(node); 
        }
});
