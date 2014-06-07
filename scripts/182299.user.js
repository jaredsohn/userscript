// ==UserScript==
// @author		Mads Cordes ( @Mobilpadde ) - Idea by Virtual-Aidz ( No twttr D: )
// @name       	Puush Image loader (Lazyloader for Puush)
// @website  	http://twitter.com/Mobilpadde
// @version    	1.2.2
// @description Makes puush even puushier!
// @include     http://puush.me/account*
// @copyright  	Nothing really... Unless you take money for it.. You won't be able to hide.. I will find you...and I will kill you..
// @updateURL	http://pastebin.com/raw.php?i=2yQU2D7Q
// ==/UserScript==

var $ = unsafeWindow.jQuery;
$(document).ready(function(){
	var pID = (document.URL.indexOf("?page") > -1 ? (parseInt(document.URL.replace("http://puush.me/account?page=", "")) + 1) : 2),
        waiting = false,
        pagination = $("#pagination"),
        lazyLoad = function(force){
        	if(($(window).scrollTop() + $(window).height() == $(document).height() && !waiting) || force){
                waiting = true;
                $("#puush_history").append("<div id='page" + pID + "'></div>");
                console.log(pID);
                $("#page" + pID).load("http://puush.me/account?page=" + pID + " .puush_tile", function(){
                    if(pID < $("#pagination a")[$("#pagination a").length-2].text){
                        waiting = false;
                        pID++;
                    }
                });
            }
        },
        interval = setInterval(function(){
            if($(window).scrollTop() == 0){
            	lazyLoad(true);
            }else{
            	clearInterval(interval)
            }
        }, 500);
    
	
    interval;
    $(window).scroll(function() {
        lazyLoad(false);
    });
    $("#pool_info").after(pagination);
})