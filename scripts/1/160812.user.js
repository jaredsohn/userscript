// ==UserScript==
// @name           Lj Readability
// @namespace      http://yoksel.ru/
// @description    Script adds readability to default Lj Comments
// @include        *livejournal.com*
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_listValues
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// ==/UserScript==

GM_addStyle(".readability_link { \
width: 22px; \
height: 22px; \
background: #FFF; \
border: 1px solid #BBB; \
border-radius: 3px;\
box-shadow: inset 0 -5px 7px #E0E2E5; \
cursor: pointer; \
line-height: 22px; \
text-shadow: 0 1px 1px #FFF; \
font-size: 12px; \
font-weight: bold; \
color: #777; \
} \
.readability_on .text { \
color: #333; \
}\
.readability_text { \
max-width: 940px;\
font: 16px/1.5 Verdana, sans-serif; \
} \
.b-singlepost-wrapper.readability_text { \
margin: 0 auto 20px; \
} \
");
            

$.noConflict(); 
jQuery(document).ready(function($) {
    
    var save_read = "readability_on";
    
    var readability_on = GM_getValue(save_read);
    
    var read_button = "<li class=\"b-linkbar-item readability_link\"><span class=\"text\">R</span></li>";
    $(".b-linkbar").append( read_button );
    
    if(readability_on == "on"){
    	$(".b-singlepost-wrapper,.b-leaf-article").addClass("readability_text");
        $(".readability_link").addClass("readability_on");
    	}
    
    $(".readability_link").click(function(){
        $(".b-singlepost-wrapper,.b-leaf-article").toggleClass("readability_text");
        $(".readability_link").toggleClass("readability_on");
        
        if(readability_on == "on"){
        	GM_setValue(save_read, "off");
            }
        else {
            GM_setValue(save_read, "on");
            }
       
    });
        
   

});