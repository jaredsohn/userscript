// ==UserScript==
// @name          Flic.kr Short URL Link
// @description	  This script adds a clickable flic.kr short URL to a photo page in the Additional Information section.
//                JavaScript code adapted from http://www.flickr.com/groups/api/discuss/72157616713786392/#comment72157620673064673
//                with thanks to Xenocryst @ Antares Scorpii (http://www.flickr.com/photos/antares/).
// @author        Mark Whitaker (bitrot) / Nicolas Hoizey (nhoizey)
// @version       0.3 (26/01/11)
// @namespace     http://bitrot.net/
// @include       http://flickr.com/photos/*
// @include       http://www.flickr.com/photos/*
// ==/UserScript==

// v0.1 25th August 2009     Initial release
// v0.2 15th September 2009  Updated to fix bug caused by new Flickr page code. (This and other Additional Info enhancements
//                           had started appearing at the top of the page.)
// v0.3 26th January 2011    Updated to fix bug caused by new Flickr page layout and code

(function() {

	var m = window.location.href.match(/^https?:\/\/[^/]*\bflickr\.com\/photos\/[^/]+\/(\d+)/i);
	if (m.length && m[1])
	{
		var base58alphabet = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
		var shortUrl = "flic.kr/p/" + (function(num)
			{
				if (typeof num !== "number")
					num = parseInt(num);

				var enc = "";
				var div = num;
				while (num >= 58)
				{
					div = num / 58;
					var mod = (num - (58 * Math.floor(div)));
					enc = "" + base58alphabet.substr(mod, 1) + enc;
					num = Math.floor(div);
				}
				return (div ? ("" + base58alphabet.substr(div, 1) + enc) : enc);
			})(m[1]);

		var shortUrlLink = document.createElement("p");
		shortUrlLink.setAttribute("style","margin-left: -5px; padding: 6px 5px 5px;");
		shortUrlLink.innerHTML = 'Short URL: <a class="Plain" href="http://' + shortUrl + '">' + shortUrl + '</a>';
		add = document.getElementById('photo-story');
		add.appendChild(shortUrlLink);
	}		
})();