// ==UserScript==
// @name        Youtube Toggle Header
// @namespace   http://userscripts.org/users/burn
// @description Adds a button to toggle header, just hovering on it
// @author      Burn
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8/jquery.min.js  
// @grant       GM_addStyle
// @include     http://www.youtube.com/*
// @include     https://www.youtube.com/*
// @version     1.7.2
// ==/UserScript==

if (window.self !== window.top) { return; } // exit when running into iframe (embedded)

(function(){
	var mHead = $("#masthead-container, #masthead, #yt-masthead-container");
	if(!mHead)return;
	var px = "-48px";
	var scr = {
		w : $(window).width(),
		h : $(window).height()
	};
	if(scr.w > 1100) {
		var lft = "136px";
	} else if (scr.w <= 1100 && scr.w > 1080) {
		var lft = "116px";
	} else if(scr.w <=1080) {
		var lft = "102px";
	}
	var bt = document.createElement("div");
	$(bt).attr("class","toggleHeader")
	.html("Toggle header")
	.appendTo($('body'));
	GM_addStyle(".toggleHeader {-moz-border-bottom-colors: none;\
    -moz-border-left-colors: none;\
    -moz-border-right-colors: none;\
    -moz-border-top-colors: none;\
    background-color: #434343;\
    border-color: transparent;\
    border-image: none;\
    border-radius: 0;\
    border-style: none solid solid;\
    border-width: 0;\
    box-shadow: 1px 1px 1px darkred;\
    color: white;\
    cursor: pointer;\
    font-size: 10px;\
    left: "+lft+";\
    line-height: 12px;\
    padding: 3px 4px;\
    position: fixed;\
    top: 0;\
    width: 65px;\
    z-index: 200;}");
	
	$(bt).on("mouseover",function(e) {
		var margTop = (mHead.css('margin-top') == 'undefined') ? '0px' : mHead.css('margin-top');
		if (margTop == '0px') {
            mHead.animate({
                marginTop: px
            }, "fast", "linear");
        } else {
            mHead.animate({
                marginTop: '0px'
            }, "fast", "linear");
        }		
	});
	$(window).on("resize",function(e) {
		scr.w = $(this).width();
		if(scr.w > 1100) {
			$(bt).css("left", "136px");
		} else if (scr.w <= 1100 && scr.w > 1080) {
			$(bt).css("left", "116px");
		} else if(scr.w <= 1080) {
			$(bt).css("left", "102px");
		}
	});
})();
