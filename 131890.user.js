// ==UserScript==
// @name           Userscripts : Auto-Flag Spam Topics
// @namespace      http://gm.wesley.eti.br
// @description    Auto-flag spam topics at the forums
// @author         w35l3y
// @email          w35l3y@brasnet.org
// @copyright      2012+, w35l3y (http://gm.wesley.eti.br)
// @license        GNU GPL
// @homepage       http://gm.wesley.eti.br
// @version        1.0.0.7
// @language       en
// @include        http://userscripts.org/forums/*
// @require        http://userscripts.org/scripts/source/63808.user.js
// @require        http://userscripts.org/scripts/source/56489.user.js
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

(function recursive (topics) {
	if (topics.length) {
		var topic = topics.shift();

		if (/^(?:[A-Z][a-z]+){2}/.test(topic.textContent)	// title
		&& "0" == xpath("string(./ancestor::tr[1]/td[3]/text())", topic)	// number of replies
		&& /[a-z]{2,}\d*[a-z]?$/.test(xpath("string(./ancestor::tr[1][td[2]/small/a[1]/text() = td[5]/small/a[1]/text()]/td[2]/small/a[1]/text())", topic))	// username
		&& /#posts-(\d+)/.test(xpath("string(./ancestor::tr[1]/td[5]/small/a[2]/@href)", topic))	// post id
		) {
			var pid = RegExp.$1;

			HttpRequest.open({
				method		: "post",
				url			: "http://userscripts.org/spam",
				headers		: {
					"Referer"	: topic.parentNode.href,
				},
				onsuccess	: function (xhr) {
					xpath("./ancestor::tr[1]/td[1]/img/@class", topic)[0].value = "icon grey";

					var msg = xpath("string(id('post-body-" + pid + "'))", xhr.response.xml).replace(/^\s+|\s+$/g, ""),
					notice = xpath("id('content')/p[@class = 'notice']", xhr.response.xml)[0],
					content = xpath("id('content')")[0];
					if (notice) {
						content.replaceChild(notice, content.firstChild);	// it works because the first child is a TextNode
					}

					if (!msg || /(?:[A-Z][a-z]+){4}/.test(msg)) {
						window.setTimeout(recursive, 500, topics);
					} else {	// ops, the content message doesn't seem to be spam
						HttpRequest.open({
							method		: "post",
							url			: "http://userscripts.org/spam",
							headers		: {
								"Referer"	: topic.parentNode.href,
							},
							onsuccess	: function (xhr) {
								window.setTimeout(recursive, 500, topics);

								notice = xpath("id('content')/p[@class = 'notice']", xhr.response.xml)[0];

								if (notice) {
									content.replaceChild(notice, content.firstChild);	// it works because the first child is a TextNode
								}
							},
						}).send({
							"authenticity_token"	: unsafeWindow.auth_token,
							"post_id"				: pid,
							"spam"					: "false",
							"commit"				: "Disagree",
						});
					}
				},
			}).send({
				"authenticity_token"	: unsafeWindow.auth_token,
				"post_id"				: pid,
				"spam"					: "true",
				"commit"				: "Flag Spam",
			});
		} else {	// next topic
			recursive(topics);
		}
	} else {
		window.setTimeout("location.reload()", 150000);	// 02m30s
	}
}(xpath("id('content')//tr[td[1]/img[@class = 'icon green']]/td[2]/a/text()")));
