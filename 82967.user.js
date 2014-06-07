// ==UserScript==
// @name Remove YouTube's Subscription Bar
// @namespace NoVoiceTutorials
// @description It removes YouTube's subscription bar
// @include http://*youtube.com/watch*
// ==/UserScript==

var disableAutoplay = true;

var showAutoplayButton = false;

if (location.href.indexOf('&playnext=') > -1) {
	
	var masthead = document.getElementById('masthead-utility');
	
	var spanStyle = (showAutoplayButton) ? '' : ' style="display: none;"';

	masthead.innerHTML = masthead.innerHTML + '<span' + spanStyle + '<span style="border-left: 1px solid #bbb; margin-left: 5px; margin-right: -2px;"></span><button type="button" id="ap-toggle" class="flip yt-uix-button yt-uix-button-text" data-button-action="yt.www.watch.quicklist.autoplay"><span class="yt-uix-button-content">Autoplay: <span id="ap-status"></span></span></button></span>';

	document.getElementById('ap-status').innerHTML = (getComputedStyle(document.getElementsByClassName("quicklist-autoplay-on")[0], '').getPropertyValue('display') == 'none') ? 'Off' : 'On';

	document.getElementById('ap-toggle').addEventListener('click', function() {
		document.getElementById('ap-status').innerHTML = (getComputedStyle(document.getElementsByClassName("quicklist-autoplay-on")[0], '').getPropertyValue('display') == 'inline') ? 'Off' : 'On';
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

}

document.getElementById('quicklist').style.display = 'none';