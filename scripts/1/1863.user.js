/*
	CSDN Advertisement Cleaner

	As the script is based on Patrick Cavit's work, I keep the 
	following comments.

	Oct 2, 2005, by jozz
	http://spaces.msn.com/members/idwhiz
	
    Rewrite Google Blog Search result
    links to point directly at the results
    Vivek Jishtu, mailme@vasacorp.com
    http://viamatic.com/firefox    

    This code was originally Rewrite Google Image Search 
    result by Patrick Cavit, pcavit@gmail.com
    http://patcavit.com
    I have just converted it to work with 
    Google Blog Search     

    Copy, use, modify, spread as you see fit.
    Massive thanks go out to Eric Hamiter, this code
    is just a quick modification of his extesion at
    http://roachfiend.com/
*/

// ==UserScript==
// @name          CSDN Clean Up
// @namespace     http://spaces.msn.com/members/idwhiz
// @description	  The CSDN is a good website for Chinese programmer. But so many advertisements on its homepage and its news page annoys me. No good feeling until removing it.
// @include       http://news.csdn.net/news/newstopic/*
// @include       http://www.csdn.net/*
// ==/UserScript==

(function() 
{
	/*
	 * A way to select nodes by xpath.
	 */
	function selectNodes(doc, context, xpath) 
	{
	   var nodes = doc.evaluate(xpath, context, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	   var result = new Array( nodes.snapshotLength );
	   
	   for (var x=0; x<result.length; x++) 
	   {
	      result[x] = nodes.snapshotItem(x);
	   }
	   
	   return result;
	}
	
	/*
	 * Clean the home page's body banner advertisment. It's damnly annoying things.
	 */
	function cleanBodyBannerAd() {
		var ads = selectNodes(doc, doc.body, "//DIV[@class='BodyBannerAd']");
		for (var i = 0; i < ads.length; i++) {
			ads[i].style.display = "none";
		}
	}
	
	doc = window.document;

	/*
	 * Clean all others except the news content.
	 */
	function cleanOtherThanContent() {
	   	var newsArea = selectNodes(doc, doc.body, "//DIV[@id='listMainArea']/DL")[0];
	
		if (newsArea != null) {
			var nodes = doc.body.childNodes;
			for (var i = 0; i < nodes.length; i++) {
				var item = nodes.item(i);
				if (item.style != null) {
					item.style.display = "none";
					doc.body.removeChild(item);
				}
			}
			doc.body.appendChild(newsArea);
			/*
			 * There are still some other DIV element, so I have to
			 * remove the children once more.
			 */
			var nodes = doc.body.childNodes;
			for (var i = 0; i < nodes.length; i++) {
				var item = nodes.item(i);
				if (item.style != null) {
					doc.body.removeChild(item);
				}
			}
			doc.body.appendChild(newsArea);
			
			/*
			 * Center the news
			 */
			newsArea.style.textAlign = "left";
			newsArea.style.padding = "10px";
			newsArea.style.marginLeft = Math.round((window.screen.availWidth - 640) / 2) + "px";
			newsArea.style.width = "640px";
		}
		return newsArea;
	}
	
	/*
	 * The is an advertisement in the content, remove it.
	 */
	function removeInnerAds(newsArea) {
	   	var swfNodes = selectNodes(doc, newsArea, "//DL/DD/TABLE");
		for (var i = 0; i < swfNodes.length; i++) {
			var swfNode = swfNodes[i];
			if (swfNode != null) {
				swfNode.style.display = "none";
				swfNode.parentNode.removeChild(swfNode);
			} else {
				//alert("Table not found");
			}
		}
	}
	
	/*
	 * Some other un-relative message in the tailor, remove it.
	 */
	function removeTailor(newsArea) {
	   	var favNode = null;
		var favNodes = selectNodes(doc, newsArea, "//STRONG");
		for (var i = 0; i < favNodes.length; i++) {
			var html = favNodes[i].innerHTML;
			//alert(html.charCodeAt(0) + ":" + html.charCodeAt(1));
			if (html != null 
					&& html.charCodeAt(0) == 25910
					&& html.charCodeAt(1) == 34255) {
				favNode = favNodes[i];
				break;
			}
		}
		if (favNode != null) {
			/*
			 * remove the rest of the element
			 */
			favNode = favNode.parentNode;
			var nodes = favNode.parentNode.childNodes;
			var beginFav = false;
			for (var i = 0; i < nodes.length; i++) {
				var item = nodes.item(i);
				if (item == favNode) {
					beginFav = true;
				}
				if (beginFav && item.style != null) {
					item.style.display = "none";
				}
			}
		} else {
			//alert("Not found");
		}
	}
	
	var href = window.location.href;
	if (href.match(/^http:\/\/www\.csdn\.net\//i)) { // 
		cleanBodyBannerAd();
	} else if (href.match(/^http:\/\/news\.csdn\.net\/news\/newstopic\//i)) { 
		var newsArea = cleanOtherThanContent();
		removeInnerAds(newsArea);
		removeTailor(newsArea);
	}

})();

