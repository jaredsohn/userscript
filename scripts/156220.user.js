// ==UserScript==
// @name           The-tracking.com: enable RSS notifications
// @description    Powered by Yahoo.Pipes. Known issues: does not works in Google Chrome. If you can't install or use the script, please proceed to http://pipes.yahoo.com/pipes/pipe.info?_id=bcb6320162fcc0460b624f19ba91682a
// @version        1.1
// @include        http://the-tracking.com/*
// @icon		   http://s3.amazonaws.com/uso_ss/icon/156220/large.png
// @run-at		   document-start
// ==/UserScript==

	var number = document.location.pathname.substring(1); 
	number.replace(/\/.*$/g,"") // before first slash
	console.log(number)
	var headtag = document.getElementsByTagName('head')[0];
	var linktag = document.createElement('link');
		linktag.href = 'http://pipes.yahoo.com/pipes/pipe.run?_id=bcb6320162fcc0460b624f19ba91682a&_render=rss&tracking_number='+number;
		linktag.rel = 'alternate';
		linktag.title = 'Track #' + number;
		linktag.type = 'application/rss+xml';
		headtag.appendChild(linktag);
		