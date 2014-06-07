// ==UserScript==
// @name           We-bop Inline preview and New Torrent Sign
// @namespace      nowhere
// @description    adds inline preview and extends watergirls new torrent sign
// @include        http://webop.me/torrent*
// @include        http://webop.me/tags*
// @include        http://webop.me/users/*
// @match        http://webop.me/torrent*
// @match        http://webop.me/tags*
// @match        http://webop.me/users/*
// ==/UserScript==

//Chrome GM val support
if (navigator.userAgent.indexOf("Firefox") == -1) {
	if (!this.GM_getValue || this.GM_getValue.toString().indexOf("not supported") > -1) {
		this.GM_getValue = function(key, def) {
			return localStorage[key] || def;
		};
		this.GM_setValue = function(key, value) {
			return localStorage[key] = value;
		};
	}
}

var wTop = 0;
var ImageCount;
var torrents;
var tds;
var tOpt = GM_getValue("tOpt", "pClick");
var newClick = GM_getValue("newClick", "Yes");
var innerScroll = GM_getValue("innerScroll", "Yes");
var maxImg = GM_getValue("maxImg", 5) * 1;
var torrTimeout = GM_getValue("torrTimeout", 0) * 1;
var seedThreshold = GM_getValue("seedThreshold", 0) * 1;
var favTags = GM_getValue("favTags", "Yes");
var cancelLoad = false;
var StickyMenu = GM_getValue("StickyMenu", "Yes");
var reseeds = GM_getValue("reseeds", "");
var lastTorrent = "";
var lastTorrentTime = new Date();
var sversion = "1.17";
var killads = true;
var checkforupdates = true;
var torrentJSON = [];

img_new = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAEMSURBVDjL3ZLBSgJRFIYvtO0BfIPeI3qBNj2Cy1rWzlWbkcBNYhC0TletJKOFq1lIILhQJCywaDZOkINiGl/n3DNj6LaF4MDHGebc/5tz544D3H9w2yAI3LkQp7UgREJRSIS+0BJqwr6QTzkWulqdD09juD3Ah5PI7r8TiPvw0YJeDUq7cJ83NDzqwmUOFUyYT/ASfasGm6d4kQo1OB3JszN4fTDujuBrqP2hW4baVxbMBIuZTfAeQucGxm/w+WzB6AleGipo/Am06hTrEwQupLhjwkFdtlOFnzlc72n/cFWgQb3WJ8i22a7A44mtCfQQ7BSyL6617BtWZ+kphMKFlwSusrJmW/7ETQt+AQhq/TxibW0lAAAAAElFTkSuQmCC';
img_pic = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJGSURBVDjLjdJLSNRBHMDx78yqLZaKS75DPdgDDaFDbdJmde5QlhCJGxgpRJfqEEKnIsJLB7skQYQKZaSmdLaopPCgEvSCShCMzR5a7oq7/3l12RVtjfzBMA/4fWZ+MyOccwBM3g8HEbIdfCEhfAFnLVapOa28Uevpjrqz/WOsERJgsu9Uq5CZQzgqrJfo9BajNd5irEYn4p3OUiFExtCLmw2tawFi4l5zUMjMIau9u7K+qxeoAcoAA0wDb2OPwmfA16LiiaOHLj1edRLpkO3WmIis7+oBDgJbgQ2AH6gC6jY19N62RkcctKeVIJAhp9QgUA3kJXdONZVcq9JxPSgQoXRAyIDRth8oAXQyKdWnoCKrTD9CBv4GMqx1WGNZkeRWJKbG2hiD1Cb9FbTnzWFdY/LCdLKlgNQ84gyNKqHm0gDjqVHnxDHgA/B9RQkpaB6YklkZl62np9KBhOqwjpKFgeY2YAz4BESBWHI8Hhs6PVVSvc3v98ye4fP7T676B845nt040ip98qpWJmI9PWiU6bfWgXGN2YHcKwU7tsuc4kpUPMbU0+f8+vKt+Pitl7PLAMDI9cNBoB0hQwICzjqUp6MZvsy8yvp95BRuQUjJ75mPvH4wYo1NlJ64Mza7DPwrhi8cCOeXl/aUB4P4c/NJxKLMvpngycCrzxVFG2v/CwAMnguF80oLe8p27cQh+fnpPV/fTc95S6piXQDAw7a9YbWkezZXFbAwMx/xPFXb1D3+Y90AQF/L7kAsri9mZ4lrTd0TcYA/Kakr+x2JSPUAAAAASUVORK5CYII=';
img_pic_out = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJWSURBVDjLpZLva1JRGMf9F4JgEEGjIG5vetGoSz8hmGVN023qbTklTdmyHxaN2OLuF5nDsSYWNZyLHM0fZOVetGx4dXNuU0GvL6INKioKutWtKDZaRLenc+AWxbUY9OIDh8Pz/T7f5zlHBgCy/+HXgQ01kmzYFGPDZr4UsQpsyCIUho18boiKzV6tJ/9pwIaNtlLEzLEhE1sYPkTnr1FEzq8ncoM6OjtIsdkBipvyamxlDXBnLC6OGFylFwsbEFqEA3EcoUKszXg1roy3nku5lZIksmLIFCsGTSwqJBBHEW2Is4gWxGmEAVGZ7lezSbcyVibBYb4QaKBRUR2iVRSfEcU4hR1RnXTV0Cm3ipcYlMIWIT9E4e7Hfuv6cwScqAmnSHQriFSvWpCOEDQLWZ+OEAux8KRo1izeWRHU/Q45kXQppQb56wY+O6DFIyhEof17awt8c5yAr0cssKTVw6JcAZ82b4MP6zeCxGDWp0fvrMNLrEToETYs/pKbgKXJOHy+dwcWoyOwEPDDu1XrpAaZS7Xk9BUdl/ao8TOuQewu1xmL365YDaOOHQ2SjzTZd8A25dFwqV4Vyzj30eOde4h4u5yIn6um0311wtzdNnhZ8MHT6YvAnFfDreatFZKvzFzYTyJijEvJ42Uxzhoh3rH3Y6JbCY8neuD1wxvwZj4IjxJdELXuFCKWLRV/GPyN0VO7jOn+g/BsxgPcgwA8z16GvN8MPQriybIMMLft242Msxbmx9phbqwTMl49RJvI98s2wNy0kcZgYxWMdynQCOSroGnTSnz/A5Fyv6NS2MnjAAAAAElFTkSuQmCC';
img_reseed = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAI9SURBVDjLpZNBS9RhEMZ/u60aZAdNSXdLrcxNS82DaRQVRBCUGngwwkOnvkB0yEt0qy/QKSrq5DUSQgLTSi01d80gcrXSTTdTViTU//+ded8ORihFYD4wl+FhYOY3T8A5x2YU3Ij54qOmp833zmX+14CWh431vm9OGs+8W9sPXOm49HsHqxarFhXbZ9W2EQxeECNnxUh0W2Y2kdwIcwtzJCbHY8+uvagBCAG0Vl3G4XDOYZ1jbPbj0ffJ0S6xQrT4AFszsxC1qFPycvJYXl45fOxG7ctXNweOB51zWBzW2V+l7MnbS21JLemFNBmhDIwIxhqMGowKxgjGNxkAISuWB2/uoqIE7Rb255dxMHKInO07CLkMxpMTpOZnmE7NEN4ZQUVITIyPDNyK1wEE1mJsud+QLUavl4cr2o5E64glhumJ9ag629TV1ttRd7VGNWQ/Dd6Ol/6VgguCDTjiYzGWvCWiReX4Pwxe2gPAX/Lx5rx1dAKt7c1OjCBGcOIoyC1kMb1IWTjKvqJSJqbGGR6Nk0gkOBitQMQyNDg0kmj/XA0QMr7hRPkp1ClqBbHKXNY88Q9xineVEC6IUFgQwZ62qFUsFm/Fq9p9Pvx66sl0XdD46y8sKiwuLZL6/o3nvd3Mp+cRJ4gVxCliFRFFjBqAQMOdM06MYHxB/FVEYqRPPG3z0/7qI/kazc/Pp7K6kuSXJEP9b2MznbM1f1D4l4oaI/Uq2qViJ1Ods9ENZ2Hy8dd+NdqtRivXUdhsnH8Cn6RstCM01H4AAAAASUVORK5CYII=';

if (killads) {
	document.styleSheets[0].insertRule(".breakrow {display:none !important;}", 0);
}
document.styleSheets[0].insertRule("#loadingBar{border:1px solid silver;height:2px;text-align:left;line-height:0;margin:0;padding:0;overflow:hidden; }", 0);
document.styleSheets[0].insertRule("#progressBar{height:2px;line-height:0;margin:0;padding:0;background:#AAFFAA;width:20%;}", 0);
document.styleSheets[0].insertRule("#loadText{text-align:right;overflow:hidden;width:100%;height:20px;font-family:verdana,helvetica;font-size:12px;font-style:italic;color: #666; }", 0);

document.styleSheets[0].insertRule("tr.tablehead th { background-color: #5E5E5E !important; color: #222222 !important; text-align: left; }", 0);
document.styleSheets[0].insertRule("tr.tablehead a, tr.tablehead a:visited {color: #222222; }", 0);
document.styleSheets[0].insertRule("tr.tablehead a:hover {color: #FFFF00 !important; }", 0);
document.styleSheets[0].insertRule("tr.tablehead a:hover {color: #FFFF00 !important; }", 0);
document.styleSheets[0].insertRule("tr.tablehead th[colspan] { text-align: center !important; }", 0);
document.styleSheets[0].insertRule("#cheader { margin-bottom: 50px !important; }", 0);
document.styleSheets[0].insertRule("a.page {color: DodgerBlue !important;}", 0);

function insertBefore_IMG(element, img_data, style) {
	var img_element = document.createElement('img');
	img_element.setAttribute("src", img_data);
	img_element.setAttribute("style", style);
	element.parentNode.insertBefore(img_element, element);
	return img_element;
}

function insertAfter(referenceNode, newNode) {
	referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function insertAfter_IMG(element, img_data, style) {
	return insertBefore_IMG(element.nextSibling, img_data, style);
}

function resetNew() {
	doNew(GM_getValue("maxtorr", 1));

}

function doNew(someNum) {
	var imgs = document.evaluate("//img[@class='newTorrent']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	GM_setValue("last_torrent_id", someNum * 1);
	GM_setValue("maxtorr", someNum * 1);
	var num = someNum;
	for (var i = 0; i < imgs.snapshotLength; i++) {
		var img = imgs.snapshotItem(i);
		if ((img.parentNode.parentNode.getAttribute("id").substr(2) * 1) <= someNum) {
			img.setAttribute("style", "display:none");
		}
	}
	localStorage.setItem("last_torrent_id", someNum * 1);
}

if (typeof String.prototype.trim != 'function') { // detect native implementation
	String.prototype.trim = function() {
		return this.replace(/^\s+/, '').replace(/\s+$/, '');
	};
}

function doInline(tid) {

	if (document.getElementById("click" + tid).getAttribute("class") == "magnify") {
		document.getElementById("click" + tid).setAttribute("src", img_pic_out);
		document.getElementById("click" + tid).setAttribute("class", "");
		document.getElementById("row" + tid).setAttribute("style", "");
	} else {
		document.getElementById("click" + tid).setAttribute("src", img_pic);
		document.getElementById("click" + tid).setAttribute("class", "magnify");
		document.getElementById("row" + tid).setAttribute("style", "display: none");
		return;
	}

	var json = getTorrentFromArray(tid);
	if (json.description) {
		var myHTML = "<div id='content_frame'>" + bbcodeParser.bbcodeToHtml(json.description).replace(/<script(.|\s)*?\/script>/g, '') + "</div>";
		evalHtml(tid, myHTML);
		commitScroll();
	} else {
		//pull from ajax
		GM_xmlhttpRequest1({
			method: 'GET',
			url: '/torrents/' + tid,
			headers: {
				'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:2.0.1) Gecko/20100101 Firefox/4.0.1',
				'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
				'Referer': 'http://webop.me/torrents'
			},
			onerror: function() {
				console.log("err");
				window.setTimeout(commitScroll, 1000);
				span.innerHTML = "<br><br><br><br><br><br><br>Error Loading Pictures.";
			},
			onload: function(responseDetails) {
				var myHTML = responseDetails.responseText.replace(/<script(.|\s)*?\/script>/g, '');
				evalHtml(tid, myHTML);
				commitScroll();
			}
		});
	}

}

function evalHtml(tid, myHTML) {
	ImageCount = 0;
	lastTorrent = tid;
	lastTorrentTime = new Date();

	var td = document.getElementById("td" + tid);
	tbl = td.parentNode.parentNode.parentNode;

	var spans = td.getElementsByTagName("span");
	var torrentName = "";
	for (var i = 0; i < spans.length; i++) {
		if (spans[i].getAttribute("class") == "title") {
			torrentName = spans[i].textContent || spans[i].innerText;
			torrentName = torrentName.trim();
		}
	}

	document.getElementById("row" + tid).setAttribute("style", "");
	var span = document.getElementById("load" + tid);
	span.innerHTML = "<br><br><br><br><br><br><br>Loading Pictures... Please wait...";
	var imgCount = 0;
	if (document.getElementById("tempDiv" + tid)) {
		document.getElementById("frame").removeChild(document.getElementById("tempDiv" + tid));
	}

	var tempDiv = document.createElement('div');
	tempDiv.setAttribute("id", 'tempDiv' + tid);
	tempDiv.setAttribute("style", 'display:none;');
	tempDiv.innerHTML = myHTML;
	document.getElementById("frame").appendChild(tempDiv);

	var content = document.getElementById('content_frame');
	var a = content.getElementsByTagName('a');
	span.innerHTML = "";

	//grab regular links with thumnbails in the anchor..
	var i = 0;
	var src = "";
	var newA;
	if (a.length > 0) {
		for (i = 0; i < a.length; i++) {
			al = a[i].getElementsByTagName('img');
			if (al.length > 0) {
				try {
					if (a[i].getAttribute("href").indexOf("users.php?userid=") == -1 && a[i].getAttribute("href").length > 6 && a[i].getAttribute("href").indexOf("uy6mf_cnek") == -1 && a[i].getAttribute("href").indexOf("http://cheggit.net/") == -1 && a[i].getAttribute("href").indexOf("adbrite") == -1) {

						if (maxImg === 0 || imgCount < maxImg) {
							newA = document.createElement('a');
							newA.setAttribute("href", a[i].getAttribute("href") + "#" + torrentName);
							newA.setAttribute("target", "_blank");
							newA.setAttribute("style", "float:left; margin-top:10px; padding: 2px; ");
							src = al[0].getAttribute("src");
							img = document.createElement('img');
							img.setAttribute("style", "max-height: 200px; max-width: 200px");
							img.setAttribute("class", "loadingIMG");
							img.setAttribute("onLoad", "this.setAttribute('class', '');");
							img.setAttribute("onError", "this.setAttribute('class', '');");
							img.addEventListener("load", function handler(evt) {
								this.setAttribute("class", "");
							}, true);
							img.addEventListener("error", function handler(evt) {
								this.setAttribute("class", "");
							}, true);
							img.setAttribute("src", isCheggitThumb(src));
							imgCount++;
							newA.appendChild(img);
							span.appendChild(newA);
						}
					}
				} catch (e) {}
			}
		}
	}

	//grab flat images 
	spanHTML = span.innerHTML;
	var allimg = content.getElementsByTagName('img');
	if (allimg.length > 0) {
		for (i = 0; i < allimg.length; i++) {
			try {
				src = allimg[i].getAttribute("src");
				if (src.indexOf("uy6mf_cnek") === -1 && spanHTML.indexOf(src) === -1) {
					if (maxImg === 0 || imgCount < maxImg) {
						newA = document.createElement('a');
						newA.setAttribute("href", src + "#" + torrentName);
						newA.setAttribute("target", "_blank");
						newA.setAttribute("style", "float:left; margin-top:10px; padding: 2px; ");
						img = document.createElement('img');
						img.setAttribute("style", "max-height: 200px; max-width: 200px");
						img.setAttribute("class", "loadingIMG");
						img.setAttribute("onLoad", "this.setAttribute('class', '');");
						img.setAttribute("onError", "this.setAttribute('class', '');");
						img.addEventListener("load", function handler(evt) {
							this.setAttribute("class", "");
						}, true);
						img.addEventListener("error", function handler(evt) {
							this.setAttribute("class", "");
						}, true);
						img.setAttribute("src", isCheggitThumb(src));
						imgCount++;
						newA.appendChild(img);
						span.appendChild(newA);
					}
				}
			} catch (e) {}
		}
	}

	//grab flat cheggit urls
	spanHTML = span.innerHTML;
	if (a.length > 0) {
		for (i = 0; i < a.length; i++) {
			try {
				if (a[i].getAttribute("href").indexOf("pics.cheggit") > -1 && spanHTML.indexOf(src) == -1) {
					src = a[i].getAttribute("href");
					if (src.lastIndexOf("/") > -1) {
						src = src.substr(src.lastIndexOf("/") + 1);
						if (src.substr(0, 1) != "t") {
							if (maxImg === 0 || imgCount < maxImg) {
								src = a[i].getAttribute("href");
								newA = document.createElement('a');
								newA.setAttribute("href", src + "#" + torrentName);
								newA.setAttribute("target", "_blank");
								newA.setAttribute("style", "float:left; margin-top:10px; padding: 2px; ");
								img = document.createElement('img');
								img.setAttribute("style", "max-height: 200px; max-width: 200px");
								img.setAttribute("class", "loadingIMG");
								img.setAttribute("onLoad", "this.setAttribute('class', '');");
								img.setAttribute("onError", "this.setAttribute('class', '');");
								img.addEventListener("load", function handler(evt) {
									this.setAttribute("class", "");
								}, true);
								img.addEventListener("error", function handler(evt) {
									this.setAttribute("class", "");
								}, true);
								img.setAttribute("src", isCheggitThumb(src));
								imgCount++;
								newA.appendChild(img);
								span.appendChild(newA);
							}
						}
					}
				}
			} catch (e) {}
		}
	}

	if (span.innerHTML === "" || span.innerHTML === "<br><br><br><br><br><br><br>Loading Pictures... Please wait...") {
		span.innerHTML = "<br><br><br><br><br><br><br>No Pictures Found.";
	}

	document.getElementById("tempDiv" + tid).innerHTML = "";
	document.getElementById("frame").removeChild(document.getElementById("tempDiv" + tid));

}

function didScroll() {
	//var t = setTimeout(commitScroll( document.documentElement.scrollTop ),500 );
	wTop = window.pageYOffset + window.innerHeight;
	window.setTimeout(commitScroll, 500);
}

function isCheggitThumb(str) {
	out = str;
	if (str.indexOf("pics.cheggit") > 0) {
		var i = str.lastIndexOf("/");
		if (str.substring(i + 1, i + 2) != "t") {
			out = str.substring(0, i + 1);
			out = out + "t" + str.substring(i + 1);
		}
	}
	return out;
}

function DateDiff(date1, date2) {
	return (date1 - date2) / 1000;
}

function commitScroll() {
	//console.log("commitscroll")
	if (cancelLoad) {
		return;
	}

	var tid = lastTorrent;
	var perc = 0;
	var i = 0;
	if (document.getElementById("load" + tid) && torrTimeout !== 0) {
		var stillRunning = false;
		var elm = document.getElementById("load" + tid);
		for (i = 0; i < elm.getElementsByTagName("img").length; i++) {
			if (elm.getElementsByTagName("img")[i].getAttribute("class") !== "" || elm.getElementsByTagName("img")[i].complete === false) {
				//elm.getElementsByTagName("img")[i].setAttribute('src', '');
				stillRunning = true;
			}
		}
		var now = new Date();
		if (stillRunning) {
			if (DateDiff(now, lastTorrentTime) > torrTimeout) {
				//console.log("Timeout: " + tid)
				window.stop;
			} else {
				//console.log("Waiting: " + tid + " Time:" + DateDiff(now, lastTorrentTime));
				window.setTimeout(commitScroll, 1000);
				return;
			}
		}

	}

	tid = "";
	var elem;
	if (tOpt == "pScroll") {
		for (i = 0; i < torrents.snapshotLength; i++) {
			elem = torrents.snapshotItem(i);
			if (elem.getAttribute("class") == "doPreview" && isVisible(elem)) {
				tid = elem.getAttribute("tid");
				perc = Math.floor((i / torrents.snapshotLength) * 100);
				document.getElementById("loadText").innerHTML = "Loading " + perc + "%";
				document.getElementById("progressBar").setAttribute("style", "width: " + perc + "%");
				elem.setAttribute("class", "");
				doInline(tid);
				break;
			}
		}
	} else {
		for (i = 0; i < torrents.snapshotLength; i++) {
			elem = torrents.snapshotItem(i);
			if (elem.getAttribute("class") === "doPreview" && elem.parentNode.parentNode.getAttribute("style") === "") {
				if (tOpt == "pFull" || elem.getAttribute("favTag") == "1") {
					tid = elem.getAttribute("tid");
					elem.setAttribute("class", "");
					perc = Math.floor((i / torrents.snapshotLength) * 100);
					document.getElementById("loadText").innerHTML = "Loading " + perc + "%";
					document.getElementById("progressBar").setAttribute("style", "width: " + perc + "%");
					doInline(tid);
					break;
				}
			}
		}
	}

	if (i == torrents.snapshotLength) {
		document.getElementById("loadText").innerHTML = "100% Complete";
		document.getElementById("progressBar").setAttribute("style", "width: 100%");
	}

}

function isVisible(element) {
	var top = element.offsetTop;
	var p = element.offsetParent;
	while (p) {
		top += p.offsetTop;
		p = p.offsetParent;
	}
	return (top < (window.pageYOffset + window.innerHeight) &&
		(top + element.offsetHeight) > window.pageYOffset);
}

function triggerSave() {

	if (document.getElementById("pClick").checked) {
		GM_setValue("tOpt", "pClick");
	}
	if (document.getElementById("pScroll").checked) {
		GM_setValue("tOpt", "pScroll");
	}
	if (document.getElementById("pFull").checked) {
		GM_setValue("tOpt", "pFull");
	}
	if (document.getElementById("pNone").checked) {
		GM_setValue("tOpt", "pNone");
	}
	if (document.getElementById("innerScroll").checked) {
		GM_setValue("innerScroll", "Yes");
	} else {
		GM_setValue("innerScroll", "No");
	}
	if (document.getElementById("newClick").checked) {
		GM_setValue("newClick", "Yes");
	} else {
		GM_setValue("newClick", "No");
	}
	if (document.getElementById("StickyMenu").checked) {
		GM_setValue("StickyMenu", "Yes");
	} else {
		GM_setValue("StickyMenu", "No");
	}

	GM_setValue("reseeds", document.getElementById("reseeds").value);

	if (document.getElementById("showFav")) {
		if (document.getElementById("showFav").checked) {
			GM_setValue("favTags", "Yes");
		} else {
			GM_setValue("favTags", "No");
		}
	} else {
		GM_setValue("favTags", "No");
	}

	if (IsNumeric(document.getElementById("seedThreshold").value)) {
		GM_setValue("seedThreshold", (document.getElementById("seedThreshold").value * 1));
	} else {
		alert("Seed Threshold Timeout must be numeric");
		return;
	}

	if (IsNumeric(document.getElementById("torrTimeout").value)) {
		GM_setValue("torrTimeout", (document.getElementById("torrTimeout").value * 1));
	} else {
		alert("Torrent Timeout must be numeric");
		return;
	}

	if (IsNumeric(document.getElementById("maxImg").value)) {
		GM_setValue("maxImg", (document.getElementById("maxImg").value * 1));
	} else {
		alert("Max Images must be numeric");
		return;
	}

	var resp = confirm("Changes have been saved. Press OK to reload page");
	if (resp) {
		window.location.href = window.location.href;
	}
}

function IsNumeric(input) {
	return (input - 0) == input && input.length > 0;
}

function showControls() {
	var opt = document.getElementById("controlBar").getAttribute("style");

	if (opt.indexOf("none") > 1) {
		document.getElementById("controlBar").setAttribute("style", "width: 100%;padding-top:20px; display: block");
	} else {
		document.getElementById("controlBar").setAttribute("style", "width: 100%;padding-top:20px; display: none");
	}

}

function init() {

	if (document.getElementById("torrentsearch")) {

		if (document.getElementById('cleft')) {

		} else {
			var cl = document.createElement('div');
			cl.setAttribute("id", "cleft");

			var idx = document.createElement('div');
			idx.setAttribute("id", "indextorrentinfo");
			idx.setAttribute("class", "menubox");
			idx.innerHTML = "&nbsp;<br />&nbsp;";
			cl.appendChild(idx);
			insertAfter(document.getElementById("cheader"), cl);

		}

		if (StickyMenu == "Yes" && document.getElementById('cleft')) {
			document.getElementById('cleft').setAttribute("style", "height: " + (window.innerHeight - 120) + "px;overflow-x: hidden; overflow-y: auto;position: fixed;");
		}

		//Clear New button

		var a = document.createElement('input');
		a.setAttribute("type", "button");
		a.setAttribute("value", "Clear New");
		a.addEventListener("click", function handler(evt) {
			resetNew();
		}, true);

		document.getElementById("torrentsearch").getElementsByTagName('fieldset')[0].appendChild(a);

		//options menu
		a = document.createElement('input');
		a.setAttribute("type", "button");
		a.setAttribute("value", "Previews");
		a.addEventListener("click", function handler(evt) {
			showControls();
		}, true);

		document.getElementById("torrentsearch").getElementsByTagName('fieldset')[0].appendChild(a);
		var favTag = "";

		if (document.getElementById("favBox")) {
			//Tag manager is installed..
			favTag = "<input type='checkbox' id='showFav'><label style='padding-right: 20px;' for='showFav'>&nbsp;Always show for Green Tags</label>";
		}

		var tdiv = document.createElement('div');
		tdiv.setAttribute("id", "controlBar");
		tdiv.setAttribute("style", "width: 100%;padding-top:20px; display: none");

		var configHtml = "<p class='title' style='width:100%;display:block;padding-bottom:15px'>Torrent Preview Options</p>";
		configHtml += "<input type='radio' name='tPrev' value='pClick' checked='' id='pClick'><label for='pClick' style='padding-right: 20px;'>Preview Icon Click</label><input type='radio' name='tPrev' checked='' value='pScroll' id='pScroll'><label for='pScroll' style='padding-right: 20px'>On Page Scroll</label><input type='radio' checked='' name='tPrev' value='pFull' id='pFull'><label for='pFull' style='padding-right: 20px'>Load Full Page</label><input type='radio'  name='tPrev' checked='' value='pNone' id='pNone'><label for='pNone' style='padding-right: 20px'>Disabled</label><br><br>";
		configHtml += "<input type='checkbox' id='StickyMenu'><label style='padding-right: 20px;' for='StickyMenu'>Sticky Menu</label><input type='checkbox' id='innerScroll'><label style='padding-right: 20px;' for='innerScroll'>Torrent Inner Scroll</label><input type='checkbox' id='newClick'><label style='padding-right: 20px;' for='newClick'>Clear new on icon click</label>" + favTag;
		configHtml += "<label style='padding-right: 20px;' for='reseeds'>Reseeds: </label><select id='reseeds'><option value='' selected=selected>Do Nothing</option><option value='Move'>Move to Bottom</option><option value='Hide'>Hide</option></select><br><br>";
		configHtml += "AutoOpen Seed/Leech > <input type='text' style='width: 30px' value='" + seedThreshold + "' id='seedThreshold'>&nbsp;&nbsp;Torrent Preview Timeout (secs): <input type='text' style='width: 30px' value='" + torrTimeout + "' id='torrTimeout'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Max Images per torrent: <input type='text' style='width: 30px' value='" + maxImg + "' id='maxImg'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0 = disabled<br><br>";
		configHtml += "<input type='button'  value='Save' class='text' id='optSavebutton'>&nbsp;&nbsp;&nbsp;<input type='button' value='Cancel' class='text' id='optCancelbutton'>";
		tdiv.innerHTML = configHtml;

		document.getElementById("torrentsearch").appendChild(tdiv);
		document.getElementById(tOpt).setAttribute("checked", "checked");
		document.getElementById("optSavebutton").addEventListener("click", function handler(evt) {
			triggerSave();
		}, true);
		document.getElementById("optCancelbutton").addEventListener("click", function handler(evt) {
			showControls();
		}, true);

		if (newClick === "Yes") {
			document.getElementById("newClick").checked = true;
		}

		if (innerScroll === "Yes") {
			document.getElementById("innerScroll").checked = true;
		}

		if (StickyMenu === "Yes") {
			document.getElementById("StickyMenu").checked = true;
		}

		document.getElementById("reseeds").value = reseeds;

		if (document.getElementById("favBox")) {
			if (favTags === "Yes") {
				document.getElementById("showFav").checked = true;
			}
		}

	}

	var maxtorr = GM_getValue("maxtorr", 1);
	var last_torrent_id = GM_getValue("last_torrent_id", 1);

	tds = document.evaluate("//td[@class='col0 tabletext']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	for (var i = 0; i < tds.snapshotLength - 1; i++) {
		var td = tds.snapshotItem(i);
		//stripe the row
		if (i % 2 === 0) {
			td.parentNode.setAttribute("style", "background: none repeat scroll 0 0 #2C2C2C;");
		} else {
			td.parentNode.setAttribute("style", "background: none !important;");
		}

		if (td.parentNode.getAttribute("class").indexOf("badcell") > 0) {
			continue; //Skip over bad cells from Tag script
		}

		if (td.parentNode.getElementsByTagName("td").length === 1) { //tr with only tags

			if (favTags === "Yes") {
				var isFaved = false;
				if ( td.parentNode.getAttribute("class").indexOf("goodcell") > - 1) {
					isFaved = true;
				}
				if (isFaved) {
					var lasttorrentid = tds.snapshotItem(i - 1).getElementsByTagName('a')[0].getAttribute("href");
					lasttorrentid = lasttorrentid.substr(lasttorrentid.lastIndexOf("/") + 1, lasttorrentid.length) * 1;
					document.getElementById("row" + lasttorrentid).setAttribute("style", "");
					document.getElementById("load" + lasttorrentid).setAttribute("class", "doPreview");
					document.getElementById("load" + lasttorrentid).setAttribute("favTag", "1");
				}
			}

			continue; //Skip over new trs with tags in them
		}

		var firstlink = td.getElementsByTagName('a')[0];
		var linktext = firstlink.getAttribute("href");
		var torrentid = linktext.substr(linktext.lastIndexOf("/") + 1, linktext.length) * 1;
		var img_element;
		var json = getTorrentFromArray(torrentid);

		if (torrentid > maxtorr) {
			GM_setValue("maxtorr", torrentid);
			maxtorr = torrentid;
		}


		td.setAttribute("id", "td" + torrentid);

		if (torrentid > last_torrent_id) {
			//create new icon
			img_element = document.createElement('img');
			img_element.setAttribute("src", img_new);
			img_element.setAttribute("class", "newTorrent");
			img_element.setAttribute("style", "padding-right: 6px;");
			img_element.setAttribute("tid", torrentid);
			if (newClick == "Yes") {
				img_element.setAttribute("style", "padding-right: 6px; cursor: pointer;");
				img_element.addEventListener("click", function handler(evt) {
					doNew(this.getAttribute('tid'));
				}, true);
			}
			firstlink.parentNode.insertBefore(img_element, firstlink);
		}

		if (tOpt != "pNone") {

			//create pic button
			img_element = document.createElement('img');
			img_element.setAttribute("src", img_pic);
			img_element.setAttribute("class", "magnify");
			img_element.setAttribute("style", "padding-right: 6px; cursor: pointer;");
			img_element.setAttribute("tid", torrentid);
			img_element.setAttribute("id", "click" + torrentid);
			img_element.addEventListener("click", function handler(evt) {
				doInline(this.getAttribute('tid'));
			}, true);
			firstlink.parentNode.insertBefore(img_element, firstlink);

			//create pic holder
			var newtr = document.createElement('tr');
			newtr.setAttribute("class", "pagination");
			if (tOpt == "pClick" || tOpt == "pNone") {
				newtr.setAttribute("style", "display: none");
			}
			newtr.setAttribute("id", "row" + torrentid);
			var newtd = document.createElement('td');
			newtd.setAttribute("colspan", "8");
			var span = document.createElement('div');
			span.innerHTML = "<br><br><br><br><br><br><br>Loading Pictures... Please wait...";
			span.setAttribute("id", "load" + torrentid);
			span.setAttribute("tid", torrentid);
			span.setAttribute("class", "doPreview");
			if (innerScroll == "Yes") {
				span.setAttribute("style", "margin-left: 10px; height: 220px; width: 100%; display: block; overflow: auto; font-family: Verdana;font-size: 12px;");
			} else {
				span.setAttribute("style", "margin-left: 10px; height: 220px; width: 100%; display: block; overflow: none; font-family: Verdana;font-size: 12px;");
			}

			//seed auto open
			if (seedThreshold > 0) {
				try {
					seed = td.parentNode.getElementsByTagName("td")[5].innerHTML * 1;
					leech = td.parentNode.getElementsByTagName("td")[6].innerHTML * 1;
					if (seed > seedThreshold) {
						td.parentNode.getElementsByTagName("td")[5].setAttribute("style", "font-weight: bold; color: green");
					}
					if (leech > seedThreshold) {
						td.parentNode.getElementsByTagName("td")[6].setAttribute("style", "font-weight: bold; color: green");
					}
					if (seed > seedThreshold || leech > seedThreshold) {
						newtr.setAttribute("style", "");
						span.setAttribute("class", "doPreview");
						span.setAttribute("favTag", "1");
					}

				} catch (e) {}
			}

			if (favTags === "Yes") {
				if ( td.parentNode.getAttribute("class").indexOf("goodcell") > - 1) {
					newtr.setAttribute("style", "");
					span.setAttribute("class", "doPreview");
					span.setAttribute("favTag", "1");
				}
			}

			if (tOpt == "pFull") {
				newtr.setAttribute("style", "");
			}

			newtd.appendChild(span);
			newtr.appendChild(newtd);

			var tr = td.parentNode;
			tbl = td.parentNode.parentNode.parentNode;
			tbl.getElementsByTagName("tbody")[0].insertBefore(newtr, tr.nextSibling);
		}

	}

	torrents = document.evaluate("//div[@class='doPreview']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	var sticky = document.createElement('div');
	sticky.setAttribute("id", "GMsticky");
	sticky.setAttribute("class", "menubox");
	sticky.innerHTML = '<p class="title">Torrent Previews</p><div id="loadText">Loading...</div><div id="loadingBar"><div id="progressBar">&nbsp;</div></div><br><small>[<a id="closeit" href="javascript:void(0)">Close Box</a>]&nbsp;&nbsp;&nbsp;&nbsp;[<a id="CancelLoad" href="javascript:void(0)">Cancel Load</a>]&nbsp;&nbsp;&nbsp;&nbsp;[<a href="javascript:void(0)" id="stickyNew">Clear New</a>]&nbsp;&nbsp;&nbsp;&nbsp;[<a href="javascript:scrollTo(0,0)">Top</a>]&nbsp;&nbsp;&nbsp;&nbsp;[<a href="javascript:scrollTo(0,0)" id="Config2">Config</a>]&nbsp;&nbsp;&nbsp;&nbsp;</small>';
	//document.getElementById("cleft").appendChild( sticky );

	insertAfter(document.getElementById("cleft").getElementsByTagName("div")[0], sticky);

	document.getElementById("Config2").addEventListener("click", function handler(evt) {
		showControls();
	}, true);
	document.getElementById("stickyNew").addEventListener("click", function handler(evt) {
		resetNew();
	}, true);
	document.getElementById("closeit").addEventListener("click", function handler(evt) {
		document.getElementById("GMsticky").setAttribute("style", "display:none");
	}, true);
	document.getElementById("CancelLoad").addEventListener("click", function handler(evt) {
		cancelLoad = true;
		window.stop;
		document.getElementById("loadText").innerHTML = "Cancelled";
	}, true);

	if (tOpt == "pScroll") {
		document.addEventListener("scroll", function handler(evt) {
			didScroll();
		}, true);
		wTop = window.pageYOffset + window.innerHeight;
	}

	if (killads) {
		try {
			bannerTop = document.evaluate("//div[@style='border: 2px white; width: 728px; height: 90px;']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			bannerTop.snapshotItem(0).parentNode.removeChild(bannerTop.snapshotItem(0));
			bannerTop.snapshotItem(1).parentNode.removeChild(bannerTop.snapshotItem(1));
		} catch (e) {

		}
	}

	if (reseeds === "Move") {
		doMoveReseeds();
	}
	if (reseeds === "Hide") {
		doHideReseeds();
	}
	commitScroll();

}

function doMoveReseeds() {

	var reseedNodes = document.evaluate("//img[@alt='R']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (reseedNodes.snapshotLength > 0) {

		var torrentlist = document.getElementById("torrentList").getElementsByTagName("tbody")[0];
		var newTR = document.createElement("tr");
		newTR.setAttribute("class", "tablehead");
		var newTD = document.createElement("th");
		newTD.setAttribute("colspan", "8");
		newTD.innerHTML = "Reseeds";
		newTR.appendChild(newTD);
		torrentlist.appendChild(newTR);

		for (var i = 0; i < reseedNodes.snapshotLength; i++) {
			var tableRow = reseedNodes.snapshotItem(i).parentNode.parentNode.parentNode;
			var previewRow = tableRow.nextSibling;
			var tagRow = previewRow.nextSibling.nextSibling;

			torrentlist.appendChild(tableRow);
			torrentlist.appendChild(previewRow);
			torrentlist.appendChild(tagRow);
		}

	}

}

function doHideReseeds() {

	var reseedNodes = document.evaluate("//img[@alt='R']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (reseedNodes.snapshotLength > 0) {
		for (var i = 0; i < reseedNodes.snapshotLength; i++) {
			var tableRow = reseedNodes.snapshotItem(i).parentNode.parentNode.parentNode;
			var previewRow = tableRow.nextSibling;
			var tagRow = previewRow.nextSibling.nextSibling;

			tableRow.setAttribute("style", "display: none");
			previewRow.setAttribute("style", "display: none");
			tagRow.setAttribute("style", "display: none");
		}
	}

}

function getTorrentFromArray(id) {
	var retVal = {};
	for (var i = 0; i < torrentJSON.length; i++) {
		if (torrentJSON[i].torrentid === id.toString()) {
			retVal = torrentJSON[i];
		}
	}
	return retVal;
}

function checkupdate() {

	if (checkforupdates) {
		//check new version
		var $ = unsafeWindow.jQuery;
		//var $ = unsafeWindow.jQuery.noConflict();

		var scriptid = "133133";
		var yql = 'http://query.yahooapis.com/v1/public/yql?q=SELECT%20*%20FROM%20%20html%20where%20url%20=%20%27http%3A%2F%2Fuserscripts.org%2Fscripts%2Fshow%2F' + scriptid + '%27%20and%20xpath=%27//div[@id=%22full_description%22]/div[1]/p[1]%27&format=xml&callback=?';

		$.getJSON(yql, {}, function(data) {
			// Handle response here
			data = data.results[0].replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '').toString();
			data = $("" + data).text();
			if (data !== sversion && data !== "") {
				if (confirm("There is an updated version " + data + " of the inline preview script. Go there now?")) {
					window.location.href = "http://userscripts.org/scripts/show/" + scriptid;
				} else {
					if (confirm("Press OK to disable update checking permanently")) {
						localStorage.setItem("doInlineScriptUpdater", 0);
					}
				}
			}
		});
	}
}

function showLoader(show) {
	var list = document.getElementById("torrentList");
	if (list) {
		if (show) {
			list.getElementsByTagName("th")[0].innerHTML = "Loading...";
			list.getElementsByTagName("th")[0].setAttribute("style", "color: #99F799 !important");
		} else {
			list.getElementsByTagName("th")[0].innerHTML = "Title";
			list.getElementsByTagName("th")[0].setAttribute("style", "");			
		}
	}
}

setTimeout(function() {
	init();

	GM_xmlhttpRequest1({
		method: 'GET',
		url: window.location.href,
		headers: {
			'Accept': 'application/json'
		},
		onerror: function() {
			showLoader(false);
			alert("Inline preview script error");
		},
		onload: function(resp) {

			try {
				var d = JSON.parse(resp.responseText);
				torrentJSON = d.torrents;
			} catch (e) {
				//alert("Inline preview script load error");
			}


			var doUpdate = 1;
			if (localStorage.getItem("doInlineScriptUpdater") !== null) {
				doUpdate = localStorage.getItem("doInlineScriptUpdater");
			}
			if (doUpdate == 1) {
				checkupdate();
			}
		}
	});

}, 250);

function GM_xmlhttpRequest1(details) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		var responseState = {
			responseXML: (xmlhttp.readyState == 4 ? xmlhttp.responseXML : ''),
			responseText: (xmlhttp.readyState == 4 ? xmlhttp.responseText : ''),
			readyState: xmlhttp.readyState,
			responseHeaders: (xmlhttp.readyState == 4 ? xmlhttp.getAllResponseHeaders() : ''),
			status: (xmlhttp.readyState == 4 ? xmlhttp.status : 0),
			statusText: (xmlhttp.readyState == 4 ? xmlhttp.statusText : '')
		};
		if (details.onreadystatechange) {
			details.onreadystatechange(responseState);
		}
		if (xmlhttp.readyState == 4) {
			if (details.onload && xmlhttp.status >= 200 && xmlhttp.status < 300) {
				details.onload(responseState);
			}
			if (details.onerror && (xmlhttp.status < 200 || xmlhttp.status >= 300)) {
				details.onerror(responseState);
			}
		}
	};

	try {
		//cannot do cross domain
		xmlhttp.open(details.method, details.url);
	} catch (e) {
		if (details.onerror) {
			//simulate a real error
			details.onerror({
				responseXML: '',
				responseText: '',
				readyState: 4,
				responseHeaders: '',
				status: 403,
				statusText: 'Forbidden'
			});
		}
		return;
	}
	if (details.headers) {
		for (var prop in details.headers) {
			xmlhttp.setRequestHeader(prop, details.headers[prop]);
		}
	}
	xmlhttp.send((typeof(details.data) != 'undefined') ? details.data : null);
}

//https://github.com/wGEric/phpBB-BBCode-Javascript-Parser
// JS function to convert BBCode and HTML code - http;//coursesweb.net/javascript/
var BBCodeHTML = function() {
	var me = this; // stores the object instance
	var token_match = /{[A-Z_]+[0-9]*}/ig;

	// regular expressions for the different bbcode tokens
	var tokens = {
		'URL': '((?:(?:[a-z][a-z\\d+\\-.]*:\\/{2}(?:(?:[a-z0-9\\-._~\\!$&\'*+,;=:@|]+|%[\\dA-F]{2})+|[0-9.]+|\\[[a-z0-9.]+:[a-z0-9.]+:[a-z0-9.:]+\\])(?::\\d*)?(?:\\/(?:[a-z0-9\\-._~\\!$&\'*+,;=:@|]+|%[\\dA-F]{2})*)*(?:\\?(?:[a-z0-9\\-._~\\!$&\'*+,;=:@\\/?|]+|%[\\dA-F]{2})*)?(?:#(?:[a-z0-9\\-._~\\!$&\'*+,;=:@\\/?|]+|%[\\dA-F]{2})*)?)|(?:www\\.(?:[a-z0-9\\-._~\\!$&\'*+,;=:@|]+|%[\\dA-F]{2})+(?::\\d*)?(?:\\/(?:[a-z0-9\\-._~\\!$&\'*+,;=:@|]+|%[\\dA-F]{2})*)*(?:\\?(?:[a-z0-9\\-._~\\!$&\'*+,;=:@\\/?|]+|%[\\dA-F]{2})*)?(?:#(?:[a-z0-9\\-._~\\!$&\'*+,;=:@\\/?|]+|%[\\dA-F]{2})*)?)))',
		'LINK': '([a-z0-9\-\./]+[^"\' ]*)',
		'EMAIL': '((?:[\\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+\.)*(?:[\\w\!\#$\%\'\*\+\-\/\=\?\^\`{\|\}\~]|&)+@(?:(?:(?:(?:(?:[a-z0-9]{1}[a-z0-9\-]{0,62}[a-z0-9]{1})|[a-z])\.)+[a-z]{2,6})|(?:\\d{1,3}\.){3}\\d{1,3}(?:\:\\d{1,5})?))',
		'TEXT': '(.*?)',
		'SIMPLETEXT': '([a-zA-Z0-9-+.,_ ]+)',
		'INTTEXT': '([a-zA-Z0-9-+,_. ]+)',
		'IDENTIFIER': '([a-zA-Z0-9-_]+)',
		'COLOR': '([a-z]+|#[0-9abcdef]+)',
		'NUMBER': '([0-9]+)'
	};

	var bbcode_matches = []; // matches for bbcode to html

	var html_tpls = []; // html templates for html to bbcode

	var html_matches = []; // matches for html to bbcode

	var bbcode_tpls = []; // bbcode templates for bbcode to html

	/**
	 * Turns a bbcode into a regular rexpression by changing the tokens into
	 * their regex form
	 */
	var _getRegEx = function(str) {
		var matches = str.match(token_match);
		var nrmatches = matches.length;
		var i = 0;
		var replacement = '';

		if (nrmatches <= 0) {
			return new RegExp(preg_quote(str), 'g'); // no tokens so return the escaped string
		}

		for (; i < nrmatches; i += 1) {
			// Remove {, } and numbers from the token so it can match the
			// keys in tokens
			var token = matches[i].replace(/[{}0-9]/g, '');

			if (tokens[token]) {
				// Escape everything before the token
				replacement += preg_quote(str.substr(0, str.indexOf(matches[i]))) + tokens[token];

				// Remove everything before the end of the token so it can be used
				// with the next token. Doing this so that parts can be escaped
				str = str.substr(str.indexOf(matches[i]) + matches[i].length);
			}
		}

		replacement += preg_quote(str); // add whatever is left to the string

		return new RegExp(replacement, 'gi');
	};

	/**
	 * Turns a bbcode template into the replacement form used in regular expressions
	 * by turning the tokens in $1, $2, etc.
	 */
	var _getTpls = function(str) {
		var matches = str.match(token_match);
		var nrmatches = matches.length;
		var i = 0;
		var replacement = '';
		var positions = {};
		var next_position = 0;

		if (nrmatches <= 0) {
			return str; // no tokens so return the string
		}

		for (; i < nrmatches; i += 1) {
			// Remove {, } and numbers from the token so it can match the
			// keys in tokens
			var token = matches[i].replace(/[{}0-9]/g, '');
			var position;

			// figure out what $# to use ($1, $2)
			if (positions[matches[i]]) {
				position = positions[matches[i]]; // if the token already has a position then use that
			} else {
				// token doesn't have a position so increment the next position
				// and record this token's position
				next_position += 1;
				position = next_position;
				positions[matches[i]] = position;
			}

			if (tokens[token]) {
				replacement += str.substr(0, str.indexOf(matches[i])) + '$' + position;
				str = str.substr(str.indexOf(matches[i]) + matches[i].length);
			}
		}

		replacement += str;

		return replacement;
	};

	/**
	 * Adds a bbcode to the list
	 */
	me.addBBCode = function(bbcode_match, bbcode_tpl) {
		// add the regular expressions and templates for bbcode to html
		bbcode_matches.push(_getRegEx(bbcode_match));
		html_tpls.push(_getTpls(bbcode_tpl));

		// add the regular expressions and templates for html to bbcode
		html_matches.push(_getRegEx(bbcode_tpl));
		bbcode_tpls.push(_getTpls(bbcode_match));
	};

	/**
	 * Turns all of the added bbcodes into html
	 */
	me.bbcodeToHtml = function(str) {
		var nrbbcmatches = bbcode_matches.length;
		var i = 0;

		for (; i < nrbbcmatches; i += 1) {
			str = str.replace(bbcode_matches[i], html_tpls[i]);
		}

		return str;
	};

	/**
	 * Turns html into bbcode
	 */
	me.htmlToBBCode = function(str) {
		var nrhtmlmatches = html_matches.length;
		var i = 0;

		for (; i < nrhtmlmatches; i += 1) {
			str = str.replace(html_matches[i], bbcode_tpls[i]);
		}

		return str;
	}

	/**
	 * Quote regular expression characters plus an optional character
	 * taken from phpjs.org
	 */
	function preg_quote(str, delimiter) {
		return (str + '').replace(new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\' + (delimiter || '') + '-]', 'g'), '\\$&');
	}

	// adds BBCodes and their HTML
	me.addBBCode('[b]{TEXT}[/b]', '<strong>{TEXT}</strong>');
	me.addBBCode('[i]{TEXT}[/i]', '<em>{TEXT}</em>');
	me.addBBCode('[u]{TEXT}[/u]', '<span style="text-decoration:underline;">{TEXT}</span>');
	me.addBBCode('[s]{TEXT}[/s]', '<span style="text-decoration:line-through;">{TEXT}</span>');
	me.addBBCode('[url={URL}]{TEXT}[/url]', '<a href="{URL}" title="link" target="_blank">{TEXT}</a>');
	me.addBBCode('[url]{URL}[/url]', '<a href="{URL}" title="link" target="_blank">{URL}</a>');
	me.addBBCode('[url={LINK}]{TEXT}[/url]', '<a href="{LINK}" title="link" target="_blank">{TEXT}</a>');
	me.addBBCode('[url]{LINK}[/url]', '<a href="{LINK}" title="link" target="_blank">{LINK}</a>');
	me.addBBCode('[img={URL} width={NUMBER1} height={NUMBER2}]{TEXT}[/img]', '<img src="{URL}" width="{NUMBER1}" height="{NUMBER2}" alt="{TEXT}" />');
	me.addBBCode('[img]{URL}[/img]', '<img src="{URL}" alt="{URL}" />');
	me.addBBCode('[img={LINK} width={NUMBER1} height={NUMBER2}]{TEXT}[/img]', '<img src="{LINK}" width="{NUMBER1}" height="{NUMBER2}" alt="{TEXT}" />');
	me.addBBCode('[img]{LINK}[/img]', '<img src="{LINK}" alt="{LINK}" />');
	me.addBBCode('[color=COLOR]{TEXT}[/color]', '<span style="{COLOR}">{TEXT}</span>');
	me.addBBCode('[highlight={COLOR}]{TEXT}[/highlight]', '<span style="background-color:{COLOR}">{TEXT}</span>');
	me.addBBCode('[quote="{TEXT1}"]{TEXT2}[/quote]', '<div class="quote"><cite>{TEXT1}</cite><p>{TEXT2}</p></div>');
	me.addBBCode('[quote]{TEXT}[/quote]', '<cite>{TEXT}</cite>');
	me.addBBCode('[blockquote]{TEXT}[/blockquote]', '<blockquote>{TEXT}</blockquote>');
};
var bbcodeParser = new BBCodeHTML(); // creates object instance of BBCodeHTML()