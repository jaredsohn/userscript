// ==UserScript==
// @name           GNN News Feed
// @namespace      pardus.at
// @description    Displays the current news entry from twitter at top of chat
// @include        http*://chat.pardus.at/chat.php*
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_xmlhttpRequest
// @version        0.5
// @author         John Wu
// ==/UserScript==

//uses document.referrer to determine universe and store in GM value
//if user came from another chat tab then use last known universe value
if (document.referrer.match('orion')) {
	GM_setValue("feed", "http://api.twitter.com/1/users/show/pardusorion.xml");
	}
if (document.referrer.match('artemis')) {
	GM_setValue("feed", "http://api.twitter.com/1/users/show/pardusartemis.xml");
	} 
if (document.referrer.match('pegasus')) {
	GM_setValue("feed", "http://api.twitter.com/1/users/show/parduspegasus.xml");
	}
var feed = GM_getValue("feed");
function getNews() {
GM_xmlhttpRequest({method:'GET', url: feed,
			onload:function(results) {
			var parser = new DOMParser();
            var dom = parser.parseFromString(results.responseText,"application/xml");
			var news = dom.getElementsByTagName('text');
			var ac = document.getElementsByTagName('h1')[0];
			ac.innerHTML = news[0].textContent;
			}
})
}
getNews();
window.setInterval(getNews,60000);
