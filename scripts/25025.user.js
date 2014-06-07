// ==UserScript==
// @name           Twitter - Expand large tweet
// @namespace      .
// @description    Expande o campo quando o tweet for maior que 140chars
// @include        *twitter.com/*
// ==/UserScript==


colAnchors = document.getElementsByTagName('a');

for (var i=0; i<colAnchors.length; i++)
{
    var anchor = colAnchors.item(i);
    if (anchor.innerHTML == '...' && anchor.href.search('statuses/') != -1) {
		anchor.setAttribute('onclick','return false;');
		anchor.addEventListener(
			'click',
			function(event) {
				
				this.innerHTML = '<img src="http://twitter.com/images/icon_throbber.gif" alt=""/>';
			
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