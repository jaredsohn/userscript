// ==UserScript==
// @name YouTube Fixed Video Position
// @namespace YFVP
// @description Pins a YouTube video to the page so you can watch the video while you scroll and read comments.
// @version 14.25.14.0245
// @include http://*youtube.com/*v=*
// @include https://*youtube.com/*v=*
// @author drhouse
// @attribution tforbus (Tristin Forbus)
// ==/UserScript==

//window.location.href = 'javascript:(function(){var%20script=document.createElement("script");%20script.src="https://raw.github.com/tforbus/youtube-fixed-video-bookmarklet/master/script.js";%20document.body.appendChild(script);%20})()';

var player = document.getElementById('player')
  , content = document.getElementById('watch7-content')
  , sideWatch = document.getElementById('watch7-sidebar')
  , footer = document.getElementById('footer-container')
  , playerRect = player.getBoundingClientRect()

footer.style.visibility = 'hidden'
window.onscroll = function(e) {
	if(window.pageYOffset >= playerRect.top && window.pageYOffset > 0) {
		player.style.position = 'fixed'
		player.style.top = '0px'
                player.style.left = '0px'
                player.style.right = '0px'

		player.style.zIndex = 999

		sideWatch.style.position = 'absolute'
		sideWatch.style.zIndex = 998
		sideWatch.style.top = player.clientHeight+'px'

		content.style.position = 'relative'
		content.style.zIndex = 997
		content.style.top = player.clientHeight+'px'

	} else {
		player.style.position = ''
		player.style.top = ''

		sideWatch.style.position = ''
		sideWatch.style.top = ''

		content.style.position = ''
		content.style.top = ''
	}
}