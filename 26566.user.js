// ==UserScript==
// @name           Twitter - Better Twitter.
// @namespace      http://userscripts.org/scripts/show/26566
// @description    Expands the tweet when it's larger than 140 chars and puts links on hashtags (#something)
// @include        *twitter.com/*
// @version 1.1
// ==/UserScript==

var imgBuffer = new Image();
imgBuffer.src = '/images/icon_throbber.gif';

colAnchors = document.getElementsByTagName('a');

for (var i=0; i<colAnchors.length; i++)
{
    var anchor = colAnchors.item(i);
    if (anchor.innerHTML == '...' && anchor.href.search('statuses/') != -1) {
		anchor.setAttribute('onclick','return false;');
		anchor.addEventListener(
			'click',
			function(event) {
				
				this.innerHTML = '<img src="/images/icon_throbber.gif" alt=""/>';
			
				htmlHref = this.href;
				
				window.currentUpdater = this;
				
				GM_xmlhttpRequest({
					method:"GET",
					url:htmlHref,
					onload:function(data) {
						var textGot = ' '+data.responseText;
						var post = textGot.match(/<p>([^\0]*?)<\/p>/m);
						
						if (post[1]) {
							window.currentUpdater.parentNode.getElementsByTagName('span').item(0).innerHTML = post[1];
							window.currentUpdater.parentNode.removeChild(window.currentUpdater);
						}
					}
				});
			},
			true
		);
		anchor.innerHTML = '[+]';
    }
}




// better twitter; Tags by summize
var contentDiv = document.getElementById('content');
var tagRE = /#(\w+)/g;
var tagTO = '<a href="http://summize.com/search?q=%23$1">#$1</a>';

contentDiv.innerHTML = contentDiv.innerHTML.replace(tagRE, tagTO);