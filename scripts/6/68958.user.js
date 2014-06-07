// ==UserScript==
// @name           i can has slideshow
// @namespace      mathiasbaert.be/userscripts/icanhasslideshow
// @description    Makes the http://icanhascheezburger.com/ family of sites do slideshow, with a button
// @include        http://icanhascheezburger.com/*
// @include        http://ihasahotdog.com/*
// @include        http://roflrazzi.com/*
// @include        http://totallylookslike.com/*
// @include        http://punditkitchen.com/*
// @include        http://upnextinsports.com/*
// @include        http://graphjam.com/*
// @include        http://thereifixedit.com*
// @include        http://failblog.org*
// @include        http://engrishfunny.com/*
// ==/UserScript==

// Add jQuery
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);


// Check if jQuery's loaded
    function GM_wait() {
        if(
			typeof unsafeWindow.jQuery == 'undefined'
		) { window.setTimeout(GM_wait,100); 
		} else {
			$ = unsafeWindow.jQuery; 

			// Add jqModal
			    var GM_JQM = document.createElement('script');
			    GM_JQM.src = 'http://dev.iceburg.net/jquery/jqModal/jqModal.js';
			    GM_JQM.type = 'text/javascript';
			    document.getElementsByTagName('head')[0].appendChild(GM_JQM);
			
			setTimeout(letsJQuery, 3000);
		}
    }
    GM_wait();

// All your GM code must be inside this function
    function letsJQuery() {

		function addButton() {
			$(".globalNavTop").append('<a href="#" id="slideshow" style="position:absolute; font-size:24px; display:block; background:green; color:yellow; top:10px; padding:0 8px">Slideshow!</a>');
			$("#slideshow").click(function() {
				toggleSlideShow();
			});
		}

		function makeSlideshowContainer() {
			$("body").append(
				"<div id=\"sscontainer\">"+
					"<img id=\"ssimg\" style=\"margin:40px auto; font-size:24px; line-height:600px; color:#FFF\" alt=\"loading...\" />"+
				"</div>");
			$("#sscontainer")
				.css("position", "absolute")
				.css("top", "50px")
				.css("left", (($("body").width()-800)/2)+"px")
				.css("width", "800px")
				.css("height", "800px")
				.css("border", "solid 4px #FFF")
				.css("background", "#999")
				
			return $("#sscontainer");
		}
		
		
		var ImageLoader = function() {
			var images = [];
			var currentIndex = 0;
			var bufferSize = 5;

			var match = document.location.href.match(/http:\/\/(([^.]+)\.[a-z]+)\/(?:page\/(\d+)\/)?/);
			var domain = match[1];
			var sitename = match[2];
			var currentPage = match[3] || 1;
			
			var nextImage = function() {
				if (currentIndex+bufferSize >= images.length) {
					loadMore();
				}
				
				if (currentIndex < images.length) {
					return images[currentIndex++];
				}
			}
			
			var loadMore = function() {
				
				$("#pane2").load(
					"http://"+domain+"/page/"+currentPage+"/ #pane2",
					function() {
						currentPage++;
				        $("#pane2 div.entry p.mine_asset img[src^=http://"+sitename+".files.wordpress.com/]")
							.each(function(i, el) {
								images.push($(el).attr("src"));
							});
					}
				);
			}
			
			this.showNext = function() {
				var src = nextImage();
				if (src) {
					$("#ssimg").attr("src", src);
				} 
			}
		}
		
		var started = false;
		function toggleSlideShow() {
			if (!started) {
				startSlideShow();
			} else {
				stopSlideShow();
			}
		}
		function startSlideShow() {
			if (started) {
				return;
			}
			started = true;
			
			var container = makeSlideshowContainer();

			var imageLoader = new ImageLoader();

			var slideshow = function() {
				imageLoader.showNext();
				setTimeout(slideshow, 5000);
			}

			slideshow();
		}
		function stopSlideShow() {
			if (!started) {
				return;
			}
			started = false;
			
			$("#sscontainer").remove();
		}
		
		addButton();

    }