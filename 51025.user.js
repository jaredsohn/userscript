// ==UserScript==
// @name           TurnOffTheLights
// @namespace      http://kulldox.atwetbpages.com
// @description    Turns off the background (darkens) for video sharing sites like YouTube, letting only the videoplayer on.
// @include        http://www.youtube.com*
// @include        http://video.yahoo.com*
// @include        http://video.google.com*
// @include       http://www.flickr.com*
// @include       http://vision.rambler.ru*
// @include       http://www.vimeo.com*
// @include       http://rutube.ru*
// @include       http://smotri.com*
// @version        0.0.1
// @date           2008-06-08
// ==/UserScript==
// Add jQuery
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
    function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
		else { $ = unsafeWindow.jQuery; letsJQuery(); }
	}
    GM_wait();

// All your GM code must be inside this function
    function letsJQuery() {
		$.fn.fadeToggle = function(speed, easing, callback) {
			return this.animate({opacity: 'toggle'}, speed, easing, callback);
		}; 
		$('body').append('<style> .lightSwitcher { top:0; position:absolute; z-index:101; background-repeat:no-repeat;background-position:left; padding: 0 0 0 20px;outline:none; text-decoration:none; color: #F7D700; background-color: #404D6C}  .lightSwitcher:hover {text-decoration:underline; color: #F7D700} #shadow {background-color:#333333; position:absolute; left:0; top:0; width:100%;z-index:100;} .turnedOff {color:#ffff00; background-image:url(light_bulb.png);} #command a { color: #F7D700;}</style>');
		$('body').append('<div id="shadow"></div><div id="command"><a class="lightSwitcher" href="#">Turn off the lights</a></div>');
		 
		$("#shadow").css({"height": $(document).height()}).fadeTo("slow", 0.6).hide();
		$(".lightSwitcher").click(function(){
			$("#shadow").fadeToggle();
			if ($("#shadow").is(":hidden"))
				$(this).html("Turn off the lights").removeClass("turnedOff");
			else
				$(this).html("Turn on the lights").addClass("turnedOff");
		});
	}