// ==UserScript==
// @name         insertCommentsIntoFeedly.user.js
// @description  Insert Comments Into Feedly
// @include      http*://cloud.feedly.com/*
// ==/UserScript==

/*
 * reference:     163 news rss bot, http://userscripts.org/scripts/show/77899
 * created date:  20130318
 * modified date: 20130917
 */

var SITE_INFO = [
	{
		url:     "http://(.*\.163\.com)",
		charset: "utf-8",
		regex:   /tieArea = .*\.HotTieArea\(\$\("#tieArea"\), "(.*?)", "(.*?)", tieChannel, isStrict\);/,
		caller:  "neteasy"
	},
	{
		url:     "http://www\.cnbeta\.com",
		charset: "utf-8",
		caller:  "cnbeta"
	},
	{
		url:     "http://.*solidot\.org",
		charset: "utf-8",
		caller:  "solidot"
	},
	{
		url:     "http://userscripts\.org",
		charset: "utf-8",
		caller:  "userscripts"
	},
	{
		url:     "http://blog\.sina\.com\.cn",
		charset: "utf-8",
		regex:   [/(<style>.*display.*none.*<\/style>)/, /<!-- 正文开始 -->(.*)<!-- 正文结束 -->/],
		caller:  "sinablog"
	},
	{
		url:     "http://.*linuxtoday\.com",
		charset: "utf-8",
		caller:  "linuxtoday"
	},
	{
		url:     "http://chinese\.engadget\.com",
		charset: "utf-8",
		caller:  "engadget"
	},
	{
		url:     "http://www\.typeisbeautiful\.com",
		charset: "utf-8",
		regex:   [/(<div id="post-.*)<div class="social">/],
		caller:  "sinablog"
	}
];

var FullFeed = {};

FullFeed.link = "";

FullFeed.getFocusedLink = function () {
	var parseLink = function (url) {
		var dicts = {
			"0L": "http://",
			"0S": "www.",
			"0B": ".",
			"0N": ".com",
			"0C": "/",
			"0D": "?",
			"0F": "=",
			"0A": "0",
			"0G": "&",
			"0P": ";"
		};

		url = url.replace(/^.*\/([^\/]*)\/.*$/, "$1").replace(/(0.)/g, function (p, m1) {
			if (m1 in dicts) {
				return dicts[m1];
			} else {
				return m1;
			}
		});

		return url;
	};

	var title = getNodeBySelector([".selectedEntry .entryHeader .title", ".entryHeader .title"]);

	if (title) {
		var link = title.href;

		if (link.match(/.*\.feedsportal\.com\/.*\/story01\.htm/)) {
			link = parseLink(link);
		}

		return link;
	} else {
		return "";
	}
};

FullFeed.request = {};

FullFeed.getCurrentEntry = function() {
	if (this.link == "") {
		return;
	}

	for (var i = 0; i < SITE_INFO.length; i++) {
		var reg = new RegExp(SITE_INFO[i].url);
		if (this.link.match(reg)) {
			this.request[SITE_INFO[i].caller](i, this.link, getNodeBySelector([".selectedEntry .entryBody", ".entryBody"]));
			break;
		}
	}
};

FullFeed.request["neteasy"] = function (index, link, body) {
	var getVarValue = function (text, pattern) {
		var value = "";

		var matches = text.match(pattern);
		if (matches && matches.length == 2) {
			value = matches[1];
		}

		return value;
	};

	var hasBlankValue = function (values) {
		for (var i = 0; i < values.length; i++) {
			if (values[i] == "") {
				return true;
			}
		}

		return false;
	};

	if (body.getAttribute("commented")) {
		return;
	} else {
		body.setAttribute("commented", "yes");
	}

	removeFeedSportalTail(body);

	var mime = getMINE(index);
	GM_xmlhttpRequest({method: "GET", url: link, overrideMimeType: "text/html; charset=gb2312", onload: function (r) {
		var content = r.responseText;

		if (content.search(/该评论已关闭|跟贴已关闭/) > -1) {
			insertComment("<h4>该评论已关闭</h4>", body);
			return;
		} else if (content.search(/<title>页面未找到|\/special\/special\.html/) > -1) {
			insertComment("<h4>已删除</h4>", body);
			return;
		}

		var host = getVarValue(content, /tieChannel = "([^,]*)",/);
		var boardId = getVarValue(content, /boardId = "([^,]*)",/);
		var threadId = getVarValue(content, /threadId = "([^,]*)",/);

		if (host != "" && hasBlankValue([boardId, threadId])) {
			var matches = content.match(/tieArea = .*\.HotTieArea\(\$\("#tieArea"\), "(.*?)", "(.*?)", tieChannel, isStrict\);/);
			if (matches && matches.length == 3) {
				boardId = matches[2];
				threadId = matches[1];
			} else {
				matches = content.match(/new TieArea\("([^"]*)", "([^"]*)"\)/);
				if (matches && matches.length == 3) {
					boardId = matches[1];
					threadId = matches[2];
				}
			}
		}

		if (hasBlankValue([host, boardId, threadId])) {
			return;
		}

		var commentUrl = "http://comment." + host + ".163.com/" + boardId + "/" + threadId + ".html";
		var commentDataUrl = "http://comment." + host + ".163.com/data/" + boardId + "/df/" + threadId + "_1.html";

		GM_xmlhttpRequest({method: "GET", url: commentDataUrl, overrideMimeType: mime, onload: function (r) {
			eval(r.responseText);
			var totalReply = replyData["thread"]["rcount"];
			var deleteReply = totalReply - replyData["thread"]["tcount"];
			var harmonyIndex = (parseInt(deleteReply / (totalReply || 1) * 10000 + 0.5) / 100) + "%";
			var commentHtml = "<h4><a href='"+ commentUrl +"' target='_blank'>热门跟帖</a> [跟帖共 " + totalReply + " 条，删 " + deleteReply + " 条，和谐指数 " + harmonyIndex + "]</h4><ol style='margin-left: -3em;'>";

			for (var i = 0, hotdata = replyData.hotPosts || []; i < hotdata.length; i++) {
				var floors = [];
				for (var floor in hotdata[i]) {
					floors.push(parseInt(floor));
				}
				floors.sort(function (a, b) {
					return b - a;
				});

				var temp = "";
				var count = 0;

				for (var j = 0; j < floors.length; j++) {
					count++;
					var hot = hotdata[i][floors[j]];
					if (hot.v != null) {
						hot.v = "顶 [" + hot.v + "] ";
					} else {
						hot.v = "";
					}
					if (hot.t != null) {
						hot.t = "[" + hot.t + "]";
					} else {
						hot.t = "";
					}
					temp = hot.b + "<br />——" + hot.v + hot.f + hot.t + "</dd></dl>" + temp;
				}
				for (var j = 0; j < count - 1; j++) {
					temp = "<dl><dd style=\"border-left: 2px solid #ff0000; padding-left: 2px;\">" + temp;
				}

				commentHtml += "<li>" + temp + "</li>";
			}
			commentHtml += "</ol>";
			insertComment(commentHtml, body);
		}});
	}});
};

FullFeed.request["cnbeta"] = function (index, link, body) {
	if (body.getAttribute("commented")) {
		return;
	} else {
		body.setAttribute("commented", "yes");
	}

	var ads = body.querySelectorAll(".content *");
	for (var i = 0; i < ads.length; i++) {
		if (ads[i].nodeName == "BR" || (ads[i].nodeName != "P" && ads[i].innerHTML.indexOf("feedsportal") > -1)) {
			ads[i].style.display = "none";
		}
	}

	/**
	 * http://static.cnbetacdn.com/assets/js/utils/jquery.cbcode.js
	 * jquery.cbbase.js 0.1
	 * Based upon Yannick Albert
	 **/
	var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
		a256 = '',
		r64 = [256],
		r256 = [256],
		i = 0;
	var UTF8 = {
		encode: function (strUni) {
			var strUtf = strUni.replace(/[\u0080-\u07ff]/g, function (c) {
				var cc = c.charCodeAt(0);
				return String.fromCharCode(0xc0 | cc >> 6, 0x80 | cc & 0x3f)
			}).replace(/[\u0800-\uffff]/g, function (c) {
				var cc = c.charCodeAt(0);
				return String.fromCharCode(0xe0 | cc >> 12, 0x80 | cc >> 6 & 0x3F, 0x80 | cc & 0x3f)
			});
			return strUtf
		},
		decode: function (strUtf) {
			var strUni = strUtf.replace(/[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g, function (c) {
				var cc = ((c.charCodeAt(0) & 0x0f) << 12) | ((c.charCodeAt(1) & 0x3f) << 6) | (c.charCodeAt(2) & 0x3f);
				return String.fromCharCode(cc)
			}).replace(/[\u00c0-\u00df][\u0080-\u00bf]/g, function (c) {
				var cc = (c.charCodeAt(0) & 0x1f) << 6 | c.charCodeAt(1) & 0x3f;
				return String.fromCharCode(cc)
			});
			return strUni
		}
	};
	while (i < 256) {
		var c = String.fromCharCode(i);
		a256 += c;
		r256[i] = i;
		r64[i] = b64.indexOf(c);
		++i
	};

	function code(s, discard, alpha, beta, w1, w2) {
		s = String(s);
		var buffer = 0,
			i = 0,
			length = s.length,
			result = '',
			bitsInBuffer = 0;
		while (i < length) {
			var c = s.charCodeAt(i);
			c = c < 256 ? alpha[c] : -1;
			buffer = (buffer << w1) + c;
			bitsInBuffer += w1;
			while (bitsInBuffer >= w2) {
				bitsInBuffer -= w2;
				var tmp = buffer >> bitsInBuffer;
				result += beta.charAt(tmp);
				buffer ^= tmp << bitsInBuffer
			}++i
		};
		if (!discard && bitsInBuffer > 0) result += beta.charAt(buffer << (w2 - bitsInBuffer));
		return result
	};
	var Plugin = function (dir, input, encode) {
		return input ? Plugin[dir](input, encode) : dir ? null : this
	};
	Plugin.en64 = Plugin.encode = function (plain, utf8encode, sublen) {
		sublen = sublen === false ? 0 : sublen;
		plain = Plugin.raw === false || Plugin.utf8encode || utf8encode ? UTF8.encode(plain) : plain;
		plain = code(plain, false, r256, b64, 8, 6);
		plain += '===='.slice((plain.length % 4) || 4);
		if (sublen) {
			for (i = 0; i < sublen; i++) {
				plain += b64.charAt(Math.floor(Math.random() * b64.length));
			}
		}
		return plain;
	};
	Plugin.de64 = Plugin.decode = function (coded, utf8decode, sublen) {
		sublen = sublen === false ? 0 : sublen;
		coded = coded.substr(sublen) + '';
		coded = String(coded).split('=');
		var i = coded.length;
		do {
			--i;
			coded[i] = code(coded[i], true, r64, a256, 6, 8)
		} while (i > 0);
		coded = coded.join('');
		return Plugin.raw === false || Plugin.utf8decode || utf8decode ? UTF8.decode(coded) : coded
	}

	var commentHtml = "<h4>暂无热评</h4>";

	GM_xmlhttpRequest({method: "GET", url: link, onload: function (r) {
		var content = r.responseText;
		if (r.finalUrl == "http://www.cnbeta.com/" || content.search(/<p>该页面不存在/) >= 0) {
			insertComment("<h4>该页面不存在</h4>", body);
		} else if (content.search(/评论功能已关闭.*<\//) >= 0) {
			insertComment("<h4>评论已关闭</h4>", body);
		} else {
			var gvText = content.match(/GV\.DETAIL = (.*);/);
			if (gvText && gvText.length == 2) {
				eval("gvObj = " + gvText[1]);

				var mime = getMINE(index);

				var commentDataUrl = "http://www.cnbeta.com" + gvObj.POST_VIEW_URL;
				console.log(commentDataUrl);
				GM_xmlhttpRequest({method: "POST", url: commentDataUrl, data: "op=" + encodeURIComponent(Plugin.en64([1, gvObj.SID, gvObj.SN].join(","), true, 8)), headers: {
					"Content-Type": "application/x-www-form-urlencoded",
					"X-Requested-With": "XMLHttpRequest"
				}, verrideMimeType: mime, onload: function (r) {
					var data = {};
					if (r.responseText) {
						eval("data = " + r.responseText);
					}

					if (data.status && data.status == "success" && data.result) {
						eval("data.result = " + Plugin.de64(data.result, true, 8));
					}

					if (!data.result || data.result.comment_num == 0 || data.result.hotlist.length == 0) {
						insertComment(commentHtml, body);
					} else {
						commentHtml = "<h4>热门评论</h4><ol style='margin-left: -3em;'>";

						for (var i = 0; i < data.result.hotlist.length; i++) {
							var floors = [];

							var tid = data.result.hotlist[i].tid;
							do {
								if (!data.result.cmntstore[tid]) {
									break;
								}

								floors.push(tid);
								tid = data.result.cmntstore[tid].pid;
							} while (tid != 0);

							var temp = "";

							for (var j = 0; j < floors.length; j++) {
								var commment = data.result.cmntstore[floors[j]];
								temp = commment.comment + "<br />——支持 (" + commment.score + ") 反对 (" + commment.reason + ") " + commment.host_name + " [" + commment.name + "] [" + commment.date + "]</dd></dl>" + temp;
							}
							for (var j = 0; j < floors.length - 1; j++) {
								temp = "<dl><dd style=\"border-left: 2px solid #ff0000; padding-left: 2px;\">" + temp;
							}

							commentHtml += "<li>" + temp + "</li>";
						}
						commentHtml += "</ol>";

						insertComment(commentHtml, body);
					}
				}});
			} else {
				insertComment(commentHtml, body);
			}
		}
	}});
};

FullFeed.request["solidot"] = function (index, link, body) {
	if (body.getAttribute("commented")) {
		return;
	} else {
		body.setAttribute("commented", "yes");
	}

	removeFeedSportalTail(body);

	var mime = getMINE(index);

	GM_xmlhttpRequest({method: "GET", url: link, overrideMimeType: mime, onload: function (r) {
		var text = r.responseText;

		var commentHtml = "<h4>";

		if (text.indexOf("本文已被查看") == -1) {
			commentHtml += "已删除";
		} else {
			var temp = text.replace(/[\r\n]/g, "").match(/<b>来自(.*)部门<\/b>/i);
			if (temp && temp.length == 2 && temp[1] != "") {
				commentHtml += "来自<u>" + temp[1].replace(/^\s*|\s*$/g, "") + "</u>部门";
			}
		}

		commentHtml += "</h4>";
		insertComment(commentHtml, body);
	}});
};

FullFeed.request["userscripts"] = function (index, link, body) {
	if (body.getAttribute("commented")) {
		return;
	} else {
		body.setAttribute("commented", "yes");
	}

	var content = link.match(/show\/(.*)$/);

	var commentHtml = '<h4><a href="http://userscripts.org/scripts/source/' + content[1] + '.user.js" target="_blank">' + content[1] + '.' + body.parentNode.getElementsByTagName("a")[0].innerHTML.replace(/ by .*<div class=\"entry-title-go-to\".*$/, "") + '.user.js</a> [<a href="http://userscripts.org/scripts/review/' + content[1] + '" target="_blank">Source Code</a>]</h4>';
	insertComment(commentHtml, body);
};

FullFeed.request["sinablog"] = function (index, link, body) {
	if (body.getAttribute("commented")) {
		return;
	} else {
		body.setAttribute("commented", "yes");
	}

	if (body.innerHTML.search(link) == -1) {
		return;
	}

	var mime = getMINE(index);
	GM_xmlhttpRequest({method: "GET", url: link, overrideMimeType: mime, onload: function (r) {
		var text = r.responseText;

		if (text.indexOf("http://blog.sina.com.cn/main_v5/ria/error.html") > -1) {
			insertComment("<h4>已删除</h4>", body);
		} else {
			var result = "";
			for (var i = 0; i < SITE_INFO[index].regex.length; i++) {
				var content = text.replace(/[\r\n]/g, "").match(SITE_INFO[index].regex[i]);
				if (content && content.length == 2) {
					result += content[1];
				}
			}
			result = result.replace(/<p[^>]*>[^<]*<wbr><\/p>/gi, "").replace(/: 0pt/gi, ": 10px");
			if (result != "") {
				body.innerHTML = result;
			}
		}
	}});
};

FullFeed.request["linuxtoday"] = function (index, link, body) {
	if (body.getAttribute("commented")) {
		return;
	} else {
		body.setAttribute("commented", "yes");
	}

	link = link.replace("http://linuxtoday", "http://www.linuxtoday");

	var mime = getMINE(index);

	GM_xmlhttpRequest({method: "GET", url: link, overrideMimeType: mime, onload: function (r) {
		var commentHtml = "<h4>";
		var temp = r.responseText.replace(/[\r\n]/g, "").match(/<a .* href="([^>]*)">Complete Story<\/a>/i);
		if (temp && temp.length == 2) {
			commentHtml += "<a href='" + temp[1] + "' target='_blank'>Complete Story</a>";
		}
		commentHtml += "</h4>";
		insertComment(commentHtml, body);
	}});
};

FullFeed.request["engadget"] = function (index, link, body) {
	if (body.getAttribute("commented")) {
		return;
	} else {
		body.setAttribute("commented", "yes");
	}

	var textNodes = document.evaluate(".//text()", body, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < textNodes.snapshotLength; i++) {
		textNodes.snapshotItem(i).data = unescape(textNodes.snapshotItem(i).data);
	}
};

function getMINE(index) {
	var mime = "text/html; charset=";
	if (SITE_INFO[index].charset) {
		mime += SITE_INFO[index].charset;
	} else {
		mime += "utf-8";
	}

	return mime;
}

function insertComment(commentHtml, body) {
	var commentDiv = document.createElement("div");
	commentDiv.setAttribute("class", "entryBody");
	commentDiv.innerHTML = commentHtml;
	body.parentNode.appendChild(commentDiv);
}

function removeFeedSportalTail(body) {
	var imgNodes = body.getElementsByTagName("img");
	for (var i = 0; i < imgNodes.length; i++) {
		if (imgNodes[i].getAttribute("src") && imgNodes[i].getAttribute("src").search(/feedsportal\.com\/.*\/mf\.gif/) > -1) {
			var currentNode = imgNodes[i];
			var nextSibling;
			while (currentNode) {
				nextSibling = currentNode.nextSibling;
				currentNode.parentNode.removeChild(currentNode);
				currentNode = nextSibling;
			}

			break;
		}
	}
}

function getStringByXPath(xpath, node) {
	var node = node || document;
	var doc = node.ownerDocument? node.ownerDocument : node;
	var str = doc.evaluate(xpath, node, null, XPathResult.STRING_TYPE, null);

	return str.stringValue? str.stringValue : '';
}

function getFirstElementByXPath(xpath, node) {
	var node = node || document;
	var doc = node.ownerDocument? node.ownerDocument : node;
	var result = doc.evaluate(xpath, node, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);

	return result.singleNodeValue? result.singleNodeValue : null;
}

function getNodeBySelector(selectors) {
	var node = null;

	for (var i = 0; i < selectors.length; i++) {
		node = document.querySelector(selectors[i]);
		if (node) {
			break;
		}
	}

	return node;
}

window.setInterval(function () {
	var focusedLink = FullFeed.getFocusedLink();
	if (focusedLink != FullFeed.link) {
		FullFeed.link = focusedLink;
		FullFeed.getCurrentEntry();
	}
}, 500);
