// ==UserScript==
// @name		Reddit Imgur Proxy
// @description		Proxy for imgur images on Reddit.com. 
// @namespace		http://www.reddit.com/user/juneof44/
// @include		http://reddit.com/*
// @include		http://*.reddit.com/*
// ==/UserScript==

// get jQuery from Reddit
$ = unsafeWindow.jQuery;

//NOTICE: As of September 2009, there is no longer a known server running the proxy. To use this, a server which hosts image proxy must be added below:

//set up list of available servers. one will be randomly chosen per page load 
var theServers = new Array(1); //change to correct number of elements
//theServers[0] = 'allamericanfatass.com/imgur.ashx?$1'
//theServers[1] = 'allamericanfatass.com/imgur.ashx?$1' //add different servers

//wire up links based on href
$('a[href*="imgur.com"]').filter(function(){
		return $(this).attr('href').match(/imgur.com\/(.*\.(jpg|gif|png|jpeg))/i)  //grab only image links
}).each(function(){
			convertLinkToProxy($(this));
	})

function convertLinkToProxy(A){
	//if the link isn't an image, give it an icon 
	if (!A.hasClass('thumbnail')){
		A.css('background-image', 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADWklEQVR42lWTa0ybZRTH/y/lbdcWGMigYm8MbVcMTLyExBBwXpgTh0RNjPOD39wWAWcskYyEecuWkHhhfnASXKKEbcKYUaoEZNDCyrgot3IpWKGAkHAtb1tK6Xvp69siSE/y5OTJec7vOc85/4fAAXvt9bfelMriMjTao2labdpRteBZhuH67nebe6xmy/BQf6fXuzlzMIc4uLH2zTo1Wm1qNEmA5yNCYfP5tjBuG/1HgJnvWy2dY7Y/LRGnWtsnppOStXqAg0xOgiQlCAaFW4i9RYS9RCKsQwSs3VZvBODn5kF74hG1gWFZMAyLKIJHbJwMMpkEMTFiARqNaBJYWXZhcmIOrS2tUxGAhtu99sPxDxlYlgkDWGYXxIOB2+1GgKbhcW9hY30Z1OYCpqftHRGAuvoue0xssuH/ZGbXczsYHW5Beroeh+PkOH48HR6PD+9dqKzbBzjmN45c+rxlWETKVULjoUqU4WGFHKHn0PQ2DokXcf78OXBcEKF4Y2Mjqq9+dyUMaGqfeuF223TjK8/qE2JlYqFkHrapFdzrn0GuLh4c60O0aB5GY5kwiR34d2jU1tbi1s2GYmLMsar+6Ns/JirfyY4Nt3jPeB5zS258WWPGM8ek8HpG8WF5hVABsEnRuPZNNUympiKiuMpyJU3z4MWXc5Tggvx/yYBnm0GqQooTZ3/BaV0AW9QISkqNYFkeLBeF6uoq/Gb68SmiwNjRlv2Y9uTppxV48pGY/QImF3yQCoJ67kIX8pIWIfLb8EHZJbg2tyCVSvDZJxW4296UQhRV3GtWqVWFZ04kIccg3wcMz25DJOggv3wABcl/g6GG8G7pRSQmJaO/rxP1P3xPd9y9IyU+vj74/gZSvnojJwF+BhBFhWTMY4Vi8LiWxIvGLpxJW4bT2QOlUg2LuVnQPwmlKmv+V9O1VGLN5ZO//cXE0Kv5mXqSFIU/RwjABznY5yg4rBYceyCA3t7fhbf7EadJgDr+UQQZqu167eVT4bbbnevq4hrnjQSVLleRKEdAmPP4uMM78tOnlQWZikKd/onn19bXBf1LoFErQQeoma+vVrzkcq06IpSoMuRlLXuJjCDtcwepv7rBeNxisSS+uORyj06Xnrq05LSZzaaGgf7OGkHu/lDOvxqTiacR/r2uAAAAAElFTkSuQmCC)')
		.css('background-position','left top')
		.css('background-repeat','no-repeat')
		.css('padding-left','20px')
	}
	A.attr('href', A.attr('href').replace(/imgur.com\/(.*\.(jpg|gif|png|jpeg))/i, theServers[(Math.floor(Math.random()* theServers.length))]))
	.attr('title', 'Proxied Imgur.com link')

}