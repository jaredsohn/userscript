// ==UserScript==
// @name           Neopets : Kadoatery Feeding Times & Lists
// @namespace      http://gm.wesley.eti.br/neopets
// @description    Creates a shortcut to the topic "Kadoatery Feeding Times & Lists"
// @author         w35l3y
// @email          w35l3y@brasnet.org
// @copyright      2010+, w35l3y (http://gm.wesley.eti.br)
// @license        GNU GPL
// @homepage       http://gm.wesley.eti.br
// @version        1.0.2.2
// @language       en
// @include        http://www.neopets.com/games/kadoatery/index.phtml
// @include        http://www.neopets.com/neoboards/topic.phtml?topic=*
// @require        http://userscripts.org/scripts/source/63808.user.js
// @require        http://userscripts.org/scripts/source/56489.user.js
// @require        http://userscripts.org/scripts/source/92009.user.js
// ==/UserScript==

/**************************************************************************

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.

**************************************************************************/

var link = GM_getValue("topic", "http://www.neopets.com/neoboards/boardlist.phtml?board=23");

function proceed_success(params) {
	var replies = [-1, ""];
	for each ( var topic in params.list )
	if (/^\*kadoat(?:ie|ery)\*KadoateryFeedingTimes&Lists(?:\*kadoat(?:ie|ery)\*)?(?:Please)?Readfirs?tposts?(?:please)?!(?:\*kadoat(?:ie|ery)\*)?$/i.test(topic.Title.replace(/\s+/g, "")) && (!~replies[0] || topic.Replies < replies[0])) {
		replies = [topic.Replies, topic.Link];
		GM_setValue("topic", topic.Link);
	}

	if (replies[1])
	params.proceed(replies[1]);
}

if (/^\/neoboards\/topic\.phtml/.test(location.pathname)) {
	if (/\btopic=(\d+)/.test(link) && RegExp.$1 == location.search.match(/\btopic=(\d+)/)[1]) {
		var topic = RegExp.$1,
		page = NeoBoard.convert(document, "topic");

		if (page.error || page.current == page.last && page.last > 19)
		NeoBoard.list({
			"link" : "http://www.neopets.com/neoboards/boardlist.phtml?board=23",
			"onsuccess" : proceed_success,
			"parameters" : {
				"proceed" : function(lnk) {
					if (location.href.match(/\btopic=\d+/)[0] != lnk.match(/\btopic=\d+/)[0])
					location.href = lnk;
				}
			}
		});
		else
		GM_setValue("topic", "http://www.neopets.com/neoboards/topic.phtml?topic=" + topic + "&next=" + (1 + 20 * page.last));
	}
} else if (/^\/games\/kadoatery\/index\.phtml/.test(location.pathname)) {
	function generate_link(lnk) {
		var button = xpath(".//td[@class='content']//div[1]/center/form/input")[0],
		a = document.createElement("a");

		a.innerHTML = '<span style="font-weight: normal;"><img src="http://images.neopets.com/neoboards/smilies/kadoatie.gif" border="0" /> Kadoatery Feeding Times &amp; Lists! <img src="http://images.neopets.com/neoboards/smilies/kadoatie.gif" border="0" /></span>';
		a.href = "javascript:void(0);";
		a.target = "_blank";
		
		a.addEventListener("click", function(e) {
			GM_openInTab(GM_getValue("topic", lnk) || "#");
			e.preventDefault();
		}, false);

		button.parentNode.insertBefore(a, button.nextSibling);
		a.parentNode.insertBefore(document.createElement("br"), a);
		a.parentNode.insertBefore(document.createElement("br"), a);
	}

	if (/\btopic=\d+/.test(link)) {
		generate_link(link);
	} else {
		NeoBoard.list({
			"link" : "http://www.neopets.com/neoboards/boardlist.phtml?board=23",
			"onsuccess" : proceed_success,
			"parameters" : { "proceed" : generate_link }
		});
	}
}