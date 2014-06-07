// ==UserScript==
// @name Youtube - Remove Annoying White Bar
// @namespace http://clintxs.com/
// @description Remove the black bar that pops up on the bottom of Youtube video pages.
// @include http://*youtube.com/watch*
// ==/UserScript==

// Set this to false if you want to enable autoplay of the next video by default.
// Note that this only changes the default behavior. Autoplay can sitll be toggled on the page.
var disableAutoplay = true;

// Set this to false if you don't want to show the added autoplay button on the page.
var showAutoplayButton = true;

if (location.href.indexOf('&playnext=') > -1) {
	
	setTimeout(function() {
		var masthead = document.getElementById('masthead-utility');

		var spanStyle = (showAutoplayButton) ? '' : ' style="display: none;"';

		masthead.innerHTML = masthead.innerHTML + '<span' + spanStyle + '<span style="border-left: 1px solid #bbb; margin-left: 5px; margin-right: -2px;"></span><button type="button" id="ap-toggle" class="flip yt-uix-button yt-uix-button-text" data-button-action="yt.www.watch.quicklist.autoplay"><span class="yt-uix-button-content">Autoplay: <span id="ap-status"></span></span></button></span>';

		document.getElementById('ap-status').innerHTML = (document.getElementById('quicklist-autoplay-button').getAttribute('data-tooltip').indexOf('off') > -1) ? 'Off' : 'On';

		document.getElementById('ap-toggle').addEventListener('click', function() {
			document.getElementById('ap-status').innerHTML = (document.getElementById('quicklist-autoplay-button').getAttribute('data-tooltip').indexOf('off') > -1) ? 'Off' : 'On';
		}, false);

		if (disableAutoplay) {
			if (document.getElementById('ap-status').innerHTML == 'On') {
				function click(e, type) { // Function by JoeSimmons
					if(!e && typeof e=='string') e=document.getElementById(e);
					if(!e) {return;}
					var evObj = document.createEvent('MouseEvents');
					evObj.initMouseEvent((type||'click'),true,true,window,0,0,0,0,0,false,false,false,false,0,null);
					e.dispatchEvent(evObj);
				}
				click(document.getElementById('ap-toggle'));
			}
		}
	}, 1000);

}

document.getElementById('quicklist').style.display = 'none';