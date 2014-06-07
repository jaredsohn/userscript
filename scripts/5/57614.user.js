// ==UserScript==
// @name           BitSoup Fixer
// @namespace      #aVg
// @include        http*://*bitsoup.org/*
// @version        0.2.0
// @description    A collection of improvements for BitSoup.
// @license        CC by Attribution-Noncommercial-No Derivative Works 3.0 Unported (http://creativecommons.org/licenses/by-nc-nd/3.0/)
// ==/UserScript==
function remove(A) {if (A) A.parentNode.removeChild(A);return remove}
function single(A, B) {return document.evaluate("."+A, B || document.body, null, 9, null).singleNodeValue;}
function title(A) {document.title = "Bitsoup: " + A;}
function linkify() {this.innerHTML = this.innerHTML.replace(/h(?:x+t*|[*+]+)p([^<\s]+)/gi,"<a target=\"_blank\" href=\"http://referer.us/http$1\">http$1</a>");}
GM_addStyle("body{background-color:#8ba5c9;}td.navigation {height:30px;} .avLink {color:blue !important;} .menubar  td {vertical-align: middle;font-weight:bold;} table.menubar {background-position:center bottom;height:29px;}");
function makeForm(a, ref) {
	var b = document.createElement("form");
	b.setAttribute("onsubmit", "return false;");
	var c = document.createElement("textarea");
	c.cols = 60;
	c.rows = 10;
	b.appendChild(c);
	var e = document.createElement("br");
	b.appendChild(e);
	var d = document.createElement("input");
	d.type = "submit";
	d.value = "Done.";
	b.ref = ref;
	d.setAttribute("onclick", "this.disabled=true;");
	d.addEventListener("click", a, false);
	b.appendChild(d);
	return b;
}
function post(A, B) {
	GM_xmlhttpRequest({
		method: "POST",
		headers: {
			"Content-type": "application/x-www-form-urlencoded"
		},
		url: A,
		data: B,
		onload: function () {
			location.reload();
		}
	});
}
var loc = location.pathname.substring(1).replace(/\.php$/, "");
if(single("//a[@href='login.php']")) {
	if(loc=="login") {
	var looker = setInterval(function() {
		var p = single("//input[@type='password']");
		if(p) {
			clearInterval(looker);
			single("/../../../../..", p).submit();
		}
	}, 200);
	} else location.href = "http://bitsoup.org/login.php";
	return;
} else if(single("//a[@href='clear_announcement.php']")) location.href = "http://bitsoup.org/clear_announcement.php";
var ts = {
	"recover" : "Recover Credentials",
	"useragreement" : "User Agreement",
	"view_announce_history" : "Announcement History",
	"blackjack" : "Blackjack",
	"report" : "Report User",
	"sendmessage": "Send message",
	"bookmarks" : "Wishlist",
	"" : "Home",
	"staff" : "Staff",
	"rules" : "Rules",
	"my" : "Settings",
	"mytorrents" : "My Torrents",
	"irc" : "Chat",
	"helpdesk" : "Help",
	"faq" : "FAQ",
	"friends" : "Friends",
	"upload" : "Upload",
	"casino" : "Casino",
	"tags" : "Post Tags",
	"smilies" : "Supported Smilies",
	"comment" : "Adding comment"
};
if(loc in ts) title(ts[loc]);
function loop(A, B, C) {
	A = document.evaluate("." + A, C || document.body, null, 6, null);
	var I = A.snapshotLength;
	while(--I >= 0) B.apply(A.snapshotItem(I));
}
if (/(?:browse|pronview)/.test(loc)) {
	loop("//table[@class='koptekst']//a", function() {
		this.href = this.href.replace("&hit=1", "&tdesc=1");
	});
}
loop("//img[@alt]", function() {
	this.title = this.alt;
});
var composer = {
	process : function(e) {
		if(!e.ctrlKey) return;
		if(e.keyCode in composer.tags) {
			e.preventDefault();
			var top = this.scrollTop, t = composer.tags[e.keyCode];
			var b=this.selectionStart, f=this.selectionEnd;
			var begin=this.value.substring(0, b), mid = this.value.substring(b, f), end=this.value.substring(f);
			if(typeof t == "function") {
				var obj = t.apply({start:b, finish:f, value: this.value, begin : begin, mid : mid, end : end});
				this.value = obj.value;
				this.setSelectionRange(obj.select[0], obj.select[1]);
			} else {
				this.value = begin + "[" + t+"]"+ mid +  "[/" + t + "]" + end;
				if(mid=="") {
					var start = b + 2 + t.length;
					this.setSelectionRange(start, start);
				}
				else this.setSelectionRange(b, f + 5 + (2 * t.length));
			}
			this.scrollTop = top;
		}
	},
	attf : function() {
		this.mid = "["+this.tag+"=]"+this.mid+"[/"+this.tag+"]";
		var sel = this.begin.length + this.tag.length + 2;
		return {
			value : this.begin + this.mid + this.end,
			select : [
				sel, sel
			]
		};
	},
	sizer : function() {
		if(this.mid.match(/^\[size=(\d+)\]([^]+)\[\/size\]/i)) {
			var size = Number(RegExp.$1);
			this.bigger ? ++size : --size;
			if(size > 7) size = 7;
			else if(size < 1) size = 1;
			this.mid = "[size=" + size + "]" + RegExp.$2 + "[/size]";
			return {
				value : this.begin + this.mid + this.end,
				select : [
					this.begin.length,
					this.begin.length + this.mid.length
				]
			};
		}
		this.mid = "[size="+(this.bigger ? "3" : "1")+"]"+this.mid+"[/size]";
	//	var sel = this.begin.length + this.tag.length + 2;
		return {
			value : this.begin + this.mid + this.end,
			select : [
				this.begin.length,
				this.begin.length + this.mid.length
			]
		};
	},
	tags : {
		66 : "b",
		69 : function() {
			this.mid = this.mid.replace(/\[/g, "&#5B;");
			return {
				value : this.begin + this.mid + this.end,
				select : [
					this.begin.length,
					this.begin.length + this.mid.length
				]
			};
		},
		70 : function() {
			this.tag = "font";
			return composer.attf.apply(this);
		},
		73 : "i",
		75 : function() {
			this.tag = "color";
			return composer.attf.apply(this);
		},
		76 : function() {
			if(/^http/.test(this.mid)) {
				this.mid = "[url=" + this.mid + "][/url]";
				var sel = this.begin.length + this.mid.length - 6;
				return {
					value : this.begin + this.mid + this.end,
					select : [
						sel, sel
					]
				};
			} else {
				this.tag = "url";
				return composer.attf.apply(this);
			}
		},
		77 : function() {
			this.mid = "[img=" + this.mid + "]";
			var sel = this.begin.length + this.mid.length;
			if(this.mid.length==6) --sel;
			return {
				value : this.begin + this.mid + this.end,
				select : [
					sel, sel
				]
			};
		},
		80 : "pre",
		81 : "quote",
		85 : "u",
		107 : function() {
			this.bigger = true;
			return composer.sizer.apply(this);
		},
		109 : function() {
			this.bigger = false;
			return composer.sizer.apply(this);
		}
	}
};
loop("//textarea", function() {
	this.addEventListener("keydown", composer.process, false);
});
if (loc=="browse") {
	var mySearch = single("//input[@checked]", document.forms[0]);
	mySearch = mySearch ? mySearch.nextSibling.textContent : "All Downloads";
	title(/search=/.test(document.URL) ? "search for \"" + unescape(location.href.match(/search=([^&]+)/)[1]).replace(/\+/g, " ") + "\"" : mySearch);
	var dates = document.evaluate("//table[@class='koptekst']/tbody/tr/td/nobr", document, null, 6, null),
	date,
	i = dates.snapshotLength;
	while (date = dates.snapshotItem(--i)) {
		var d = new Date(date.innerHTML.replace("<br>", " ").replace(/-/g, "/"));
		date.innerHTML = d.getMonth() + "/" + d.getDate() + "/" + (d.getFullYear() + "").substring(2) + "<br/>" + d.toLocaleTimeString();
	}
	var head = single("//table[@class='koptekst']").rows[0];
	head.cells[2].innerHTML = "Wish";
	head.cells[8].firstChild.firstChild.innerHTML = "D";
	head.cells[8].firstChild.title = "Downloads";
	head.cells[9].firstChild.firstChild.innerHTML = "S";
	head.cells[9].firstChild.title = "Seeders";
	head.cells[10].firstChild.firstChild.innerHTML = "L";
	head.cells[10].firstChild.title = "Leechers";
	head.cells[11].firstChild.firstChild.innerHTML = "Uploader";
	var imdbs = document.evaluate("//img[contains(@alt,'Movies') or @alt='x264' or @alt='TV-Episodes' or @alt='Anime']/../../following-sibling::td[1]/a", document, null, 6, null), imdb, i = imdbs.snapshotLength - 1;
	function google(S, OL) {
		GM_xmlhttpRequest({
			url : "http://ajax.googleapis.com/ajax/services/search/web?v=1.0&q=" + encodeURIComponent(S),
			method : "GET",
			headers : {
				"Referer": "http://userscripts.org/users/avindra"
			},
			onload : function(A) {
				var resp = JSON.parse(A.responseText);
				if(resp.responseStatus == 403) GM_log("Google thinks we're abusing.");
				else OL(resp.responseData.results[0]);
			}
		});
	}
	function getIMDB(i) {
		imdb = imdbs.snapshotItem(i);
		var fixed = imdb.textContent.replace(/WarMovie/i, "") // dumb tag
		.replace(/s(\d+)\.?d\d+/i, "season $1") // only season, not disk
		.replace(/\b(?:REAL|LIMITED|READNFO)\b(?:.+)?/, "") // tag info
		.replace(/\./g, " ") // dots
		.replace(/\([^\d].+\)/, "") // non-year parenthetical
		.replace(/ *\(? *(\d{4}) *\)?.+/, " $1") // anything after year is usually unimportant
		.replace(/(?:\S+rips?|(?:dvd)?scr(?:eener)?|\b(?:cam|t(?:elesync|s)|a(?:c3|vi)|w(?:mv|s)|[hp]dtv|(?:72|(?:4|10)8)0 ?p|mpe?g|(?: - )?\S+ edition|h\.?264|p(?:pv|roper)|multisubs|fs|dc|complete|extended|unrated|bluray|hr|r(?:[15]|epack)|line|divx|xvid)\b|- ?\S+$)(?:.+)?/gi, "")
		// motherload of tags after name
		.replace(/(?:ntsc|pal|dvd[+-]?r?)(?:.+)?/gi, "")
		// region information
		.replace(/\[/g, "(").replace(/\]/g, ")")
		// standards
		.replace(/\s{2,}/g, " ").replace(/^\s+|\s+$/g, ""); // trim whitespace
		if(fixed.match(/s0?(\d+) ?e0?(\d+)/i)) {
			fixed += "(Season " + RegExp.$1 + ", Episode " + RegExp.$2 + ") -\"Episode List\" \"Original Air Date\"";
			fixed = fixed.replace(/s\d+ ?e\d+/i, "");
		}
		google(fixed + " site:imdb.com/title", function (A) {
			if (A) {
				var ag = document.createElement("a");
				ag.innerHTML = A.titleNoFormatting.replace(/\) - .+$/,")");
				ag.href = A.url.replace(/(tt\d{7}\/).+/, "$1");
				loadRating(ag);
				imdb.parentNode.appendChild(ag);
			}
			if (--i >= 0) getIMDB(i);
		});
	}
	function loadRating(A) {
		GM_xmlhttpRequest({
			url: A.href.replace(/(?:www\.)?imdb\./, "m.imdb."),
			method: "GET",
			onload: function (B) {
				if (!B.responseText.match(/<p class="votes">\n {4}<strong>([^<]+)/)) return;
				A.parentNode.style.backgroundColor = "rgb(" + Math.round(255 * (Number(RegExp.$1) / 10) ) + ", 0, 0)";
				A.innerHTML += " => <strong>" + RegExp.$1 + (B.responseText.match(/#40;([^&]+)/) ? " ("+RegExp.$1+")" : "") + "</strong>";
				A.setAttribute("style", "color:white;float:right");
				A.previousElementSibling.previousElementSibling.style.color = "white";
			}
		});
	}
	if (i >= 0) getIMDB(i);
	var games = document.evaluate("//img[contains(@alt,'Games')]/../../following-sibling::td[1]/a", document, null, 6, null), game, i = games.snapshotLength - 1;
	function getGame(i) {
		game = games.snapshotItem(i);
		var fixed = game.textContent.replace(/\./g, " ")
		.replace(/\b(?:demo|- ?[A-Z]+$|ntsc|full|dvd|readnfo|repack|v ?[\d ]+|wii|trainer|goty|r(?:eg)?(?:ion)? ?f(?:ree)?!*|multi\d|p(?:roper|al)|(?:rar)?fix|usa|x(?:box)? ?(?:360)?)(?:.+)?/gi, "")
		.replace(/ ?- ?$/, "");
		google(fixed + " site:" + game.parentNode.previousElementSibling.firstChild.firstChild.alt.substring(6).toLowerCase().replace(/ .+/,"") + ".ign.com/objects/", function(A) {
			if(A) {
				var ag = document.createElement("a");
				ag.innerHTML = A.titleNoFormatting;
				ag.href = A.url;
				game.parentNode.appendChild(ag);
				getRating(ag);
			}
			if (--i >= 0) getGame(i);
		});
	}
	function getRating(A) {
		GM_xmlhttpRequest({
			url: "http://websvc.ign.com/objectWebService?entityid=" + A.href.match(/objects\/\d+\/(\d+)/)[1] + "&format=json",
			method: "GET",
			onload: function (B) {
				B = JSON.parse(B.responseText).object;
				A.innerHTML += " => <strong>" + B.communityRatingAvg + "/" + B.readerReviewAvg + "/" +  B.pressRatingAvg.replace(/\.(\d{2})\d+/, ".$1") + "</strong>";
			}
		});
	}
	if(i >= 0) getGame(i);
} else if (loc=="messages") {
	title((/box=-1/.test(document.URL) ? "Out" : "In") + "box");
	if (/action=viewmessage/.test(document.URL)) {
		title(single("(//h1)[2]").textContent.replace(/\s+$/, ""));
	}
} else if (loc=="userdetails") {
	title(single("//h1").textContent.replace(/\s+$/, "") + "'s profile");
} else if (loc=="forums") {
	title("Forums");
	if (/(?:forum|topic)id/.test(document.URL) && !(/action=newtopic/.test(document.URL))) {
		title(single("//h1").lastChild.nodeValue.replace(/^\W+/, ""));
		loop("//td[@class='comment']", linkify);
	}
} else if (loc=="details") {
	title(document.title.substring(76, document.title.length - 1));
	var id = document.URL.match(/id=(\d+)/)[1], nfo;
	if (nfo = single("//b[.='View NFO']/../..")) {
		GM_xmlhttpRequest({
			url: "http://bitsoup.org/viewnfo.php?id=" + id,
			method: "GET",
			onload: function (A) {
				if (A.responseText.match(/space;">([\s\S]+)<\/pre>\n    <\/td>/)) nfo.innerHTML = "<pre>" + RegExp.$1 + "</pre";
			}
		});
	}
	loop("//td[@class='text']", linkify);
	(single("//a[contains(@href,'action=add')][2]/..") || single("//a[contains(@href,'action=add')]/..")).appendChild(
	makeForm(
	function () {
		post("http://" + location.host + "/comment.php?action=add", "tid=" + id + "&text=" + escape(this.parentNode.elements[0].value));
	}));
	var h = single("//h1");
	title(h.textContent);
	h.innerHTML += "<a href=\"/bookmarks.php?op=add&id=" + id + "\"><img style=\"border:0;\" alt=\"Add to wishlist!\" src=\"http://famspam.com/images/icons/large/check.png\"/></a>";
	var edits = document.evaluate("//a[contains(@href,'action=edit')]", document, null, 6, null),
	edit,
	i = edits.snapshotLength;
	while (edit = edits.snapshotItem(--i)) {
		edit.setAttribute("onclick", "return false;");
		edit.addEventListener("click", function () {
			var base = this.parentNode.nextSibling.nextSibling.rows[0].cells[1];
			var frm = makeForm(
			function () {
				var cid = this.offsetParent.offsetParent.previousSibling.previousSibling.childNodes[3].href.match(/cid=(\d+)/)[1];
				post("http://" + location.host + "/comment.php?action=edit&cid=" + cid, "cid=" + cid + "&text=" + escape(this.parentNode.elements[0].value) + "&returnto=" + location.href);
			},
			this);
			frm.elements[0].value = base.textContent;
			base.innerHTML = "";
			base.appendChild(frm);
		},
		false);
	}
} else if(loc=="") {
	var news = single("//td[@class='text']/ul");
	for(var i = news.children.length - 1; i >= 0; --i)
	{
		var n = news.children[i];
		if(n.textContent.match(/lottery|winner/i)) remove(n);
	}
	if(news.children.length == 0) {
		news = news.parentNode.parentNode.parentNode.parentNode;
		remove(news.previousSibling);
		remove(news);
	}
	var last = single("//body/table[@class='bottom']"), kill=-1;
	for(var i = document.body.childNodes.length - 1; i >= 0; --i)
	{
		if(last==document.body.childNodes[i])
		{
			kill = ++i;
			break;
		}
	}
	while(--kill >= 0) remove(document.body.childNodes[i]);
}
function openImg(A) {
	A.preventDefault();
	GM_openInTab(this.src);
}
var imgs = document.evaluate("//img[@width]", document, null, 6, null), img, i = imgs.snapshotLength;
while (img = imgs.snapshotItem(--i))
	img.addEventListener("click", openImg, false);
var outs = document.evaluate("//a[starts-with(@href,'http://www.bitsoup.o')]", document, null, 6, null), out, i = outs.snapshotLength;
while (out = outs.snapshotItem(--i))
	out.href = out.pathname + out.search;
function getBandwith(A) {
	return parseFloat(A.innerHTML.replace(/(.+)\s+([TGM])B/, function(all, $1, $2) {
		$1 = Number($1);
		switch($2) {
			case "T" : return $1 * 1024;
			case "G" : return $1;
			case "M" : return $1 * 0.0009765625;
		}
	}));
}
function fixBand(A) {
	return (A + "").replace(/(\.\d{2})\d+/, "$1");
}
var bar = single("//table[@class='statusbar']").rows[0].cells[0].firstChild;
var up = single("/font[@color='green']", bar).nextSibling.nextSibling,
down = single("/font[@color='darkred']", bar).nextSibling.nextSibling,
after = down.nextSibling.nextSibling;
var buffer = document.createElement("font");
buffer.color = "blue";
buffer.innerHTML = "Buffer: ";
var bmt = document.createElement("font");
bmt.color = "black";
bmt.innerHTML = fixBand(getBandwith(up) - getBandwith(down)) + " GB ";
bar.insertBefore(buffer, after);
bar.insertBefore(bmt, after);
remove(single("//td[@align='right']").firstChild.firstChild)(single("//a[contains(@href,'donate')]/.."))(single("//img[@src='http://bitsoup.org/pic/donate_browse.gif']/../.."))(single("//a[@href='/500.php']/.."));
single("//a[@href='my.php']").textContent = "Settings";