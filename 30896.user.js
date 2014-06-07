// ==UserScript==
// @name           IMDB Fixer
// @namespace      #aVg
// @description    IMDB has gotten worse recently. Use this to fix it, IMMENSELY.
// @include        http://www.imdb.com/*
// @version        0.1.6
// @license        Creative Commons Attribution-Noncommercial-No Derivative Works 3.0 Unported (http://creativecommons.org/licenses/by-nc-nd/3.0/)
// ==/UserScript==
if(location.hash.match(/TRAILER=(.+)/))
{
	location.href="http://www.imdb.com"+RegExp.$1;
	return;
}
if(top != self) return;
GM_addStyle(".title-extra {display:inline!important} .mature-content {padding:0 !important} #video_banner_wrapper, .aux-ad-widget-2 {display: none !important;} .actLink {margin-left: 7px;font-size:18px;} .info{height:!important;}");
document=unsafeWindow.document;
function single(A, B) {return document.evaluate("."+A, B || document.body, null, 9, null).singleNodeValue;}
function remove(A) {if(A) A.parentNode.removeChild(A);return remove;}
function $(A) {return document.getElementById(A);}
function ifdo(A, B) {if(A) B.apply(A)}
function loop(A, B, C) {
	A = document.evaluate("." + A, C || document.body, null, 6, null);
	var I = A.snapshotLength;
	while(--I >= 0) B.apply(A.snapshotItem(I));
}
var Element=function(A, B, C, D) {
	A = document.createElement(A);
	if(B) for(var b in B) A[b] = B[b];
	if(C) for(var c in C) A.setAttribute(c, C[c]);
	if(D) for(var i=0;i < D.length; ++i) A.appendChild(D[i]);
	return A;
};
var fns = {
	amazon : function() {
		fns.main.apply(this, ["Amazon"]);
	},
	bb : function() {
		fns.main.apply(this, ["Blockbuster"]);
	},
	main : function(A) {
		this.firstChild.nodeValue = A;
	},
	common : function() {
		remove(single("//span[@class='pro-link']"))($("tn15adrhs"));
		ifdo(single("//text()[.=' in popularity this week. See ']"), function() {
			this.nodeValue=" in popularity this week.";
			var p = this.parentNode;
			for(var i = 6; i >= 2; --i)
				remove(p.childNodes[i]);
		});
	}
};
var utils = {
	calcAge : function(A) {
		A = Math.round((utils.today - A) / 1000);
		var years = 0, months = 0, days = 0, tail = A >= 0 ? " ago" : " from now";
		if (A < 0) A = A * -1;
		while(A >= 31536000) {
			++years;
			A -= 31536000;
		}
		while(A >= 2678400) {
			++months;
			A -= 2678400;
		}
		while(A >= 86400) {
			++days;
			A -= 86400;
		}
		var out = "";
		if (years != 0) out = years + " years";
		if (months != 0) out += ", " + months + " months";
		if (days != 0) out += ", " + days + " days";
		return "(" + out.replace(/^, /, "") + tail + ")";
	},
	today : new Date()
};
remove($("bottom_ad_wrapper"))(single("//a[@href='http://pro.imdb.com/r/imdb-nav-nb/']/.."))(single("//a[@href='http://www.imdb.com/features/poweroffilm/']"))(single("//div[@class='info']/a[contains(@href, 'pro-contact')]/.."))(single("//a[text()='More at IMDb Pro']"))($("floating1_wrapper"));
var vid = $("video-player-container"), loc=location.pathname.substring(1);
if(loc.indexOf("name/")==0) {
	ifdo(single("//a[.='Shop at Amazon']"), fns.amazon);
	ifdo(single("//a[.='Rent at Blockbuster.com']"), fns.bb);
	remove(single("//p", $("action-nobox")));
	fns.common();
	var age = single("//h5[.='Date of Birth:']");
	if(age) {
		age = age.nextSibling.nextSibling;
		age.insertBefore(new Element("strong", {
			textContent : " " + utils.calcAge(new Date(age.textContent.replace(/,[^]+/, "").replace(/^\s+|\s+$/g, "").replace(/ \(.+/, "")))
		}),  age.childNodes[4]);
	}
	loop("//div[@class='filmo']", function() {
		if(single("//a[.='In Development:']", this)) {
			loop("//li", function() {
				var link = this.getElementsByTagName("a")[0];
				GM_xmlhttpRequest({
					url : link.href,
					method : "GET",
					onload : function(A) {
						link.textContent += " " + A.responseText.match(/(\(.+?\))<\/title>/)[1];
					}
				});
			}, this)
		}
/*
		var titles = [];
		var ol = single("//ol", this), node;
		for(var i = 0 ; i < ol.childNodes.length; i++) {
			node = ol.childNodes[i];
			if(node.childNodes.length == 0) continue;
			var title = {}, spec;
			title.link = node.childNodes[0].href;
			for(var b = 1; b < node.childNodes.length; b++) {
				spec = node.childNodes[b];
				if(!("year" in title) && spec.nodeType == 3 && spec.nodeValue.match(/\((.+?)\)/))
					title.year = RegExp.$1;
			}
			titles.push(title);
		}
*/
	});
} else if(vid && vid.className.indexOf("mature") != -1) {
	vid.innerHTML = "";
	vid.appendChild(new Element("iframe", {
		src : location.pathname.replace(/#.+$/,"").replace(/\?.+$,""/).replace(/([^\/])$/,"$1/") + "player"
	},{
		style : "width:102%;height:100%;border:0;" ,
		scrolling : "no",
		marginwidth : "0",
		marginheight : "0",
		leftmargin : "0",
		topmargin : "none",
		margin : "none"
	}));
}
else if(loc.indexOf("board") != -1) {
	document.title = document.title.substring(8).replace(/::/g, "|");
	remove(single("//b[text()='IMDbPro Message Boards']/../../../../../.."));
	var s = single("//b[text()='Posted by']/../../../../../..");
	if(s) for(var i = 4; i > 0; --i) remove(s.cells[i]);
	function fetch(A) {
		GM_xmlhttpRequest({
			url : A.href,
			method : "GET",
			onload : function(B) {
				if(!B.responseText.match(/<td valign="top"  colspan="3" >([\s\S]+?)<script/)) return;
				A = A.parentNode.parentNode;
				A.parentNode.replaceChild(new Element("div", {
					innerHTML : RegExp.$1
				}), A);
			}
		});
	}
	var link, i= document.links.length;
	while(--i >= 0) {
		link=document.links[i];
		if(/d=\d+&p=\d+#\d+/.test(link.href) && link.title!="Next Message") fetch(link);
	}
}
if(loc.indexOf("title")==0 && loc.indexOf("mediaindex") < 0) {
	for(var i = document.links.length - 1; i>=0; --i) {
		var link = document.links[i];
		link.href = link.href.replace("/thread", "/nest");
	}
	fns.common();
	ifdo($("tn15plotkeywords"), function() {
		this.className = "keyword-spoiler hover";
		this.onmouseover = null;
		this.onmouseout=null;
	});
	ifdo(single("//h3[contains(., 'In Development Overview')]/.."), function() {
		this.insertBefore(new Element("div", {
			className : "info"
		}, null, new Array(
			new Element("h5", {textContent : "Description:"}),
			new Element("div", {className : "info-content", textContent : document.getElementsByName("description")[0].content.replace(/ Visit IMDb for [^]+/, "")})
		)), this.childNodes[this.childNodes.length - 2]);
	});
	var acts=$("tn15title").childNodes[1];
	acts.appendChild(new Element("a", {
		className : "actLink",
		href : "http://www.google.com/search?q=intitle:" + document.title.replace(/ \((\d+)\)/," $1") + " site:wikipedia.org&btnI",
		title : "Wikipedia entry for this movie."
	}, false, [
		new Element("img", {
			src : "http://en.wikipedia.org/favicon.ico"
		})
	]))
	acts.appendChild(new Element("a", {
		className : "actLink",
		href : "http://www.rottentomatoes.com/alias?type=imdbid&s="+location.pathname.match(/\d+/)[0],
		title : "Rotten Tomatoes entry for this movie."
	}, false, [
		new Element("img", {
			src : "http://images.rottentomatoes.com/images/icons/favicon.ico"
		})
	]));
	remove(single("//a[@href='/r/contact-aa/rg/title-overview/pro-contact/']/../.."))(single("//a[.='Own the rights?']/.."))(single("//a[@class='linkasbutton-primary disabled']"));
	ifdo(single("//a[.='Buy it at Amazon']"), fns.amazon);
	ifdo(single("//a[.='Rent it at Blockbuster.com']"), fns.bb);
	
	var age = single("//h5[.='Release Date:']");
	if(age) {
		age = age.nextSibling.nextSibling.firstChild;
		age.parentNode.insertBefore(new Element("strong", {
			textContent : utils.calcAge(new Date(age.nodeValue.replace(/^\s+|\s+$/g, "").replace(/ \(.+/, "")))
		}),  age.nextSibling);
	}
} else if(loc.indexOf("media/")==0) {
	var img = single("//div[@class='primary']//img");
	if(img) {
		img.removeAttribute("onmousemove");
		img.removeAttribute("onmousedown");
		img.removeAttribute("oncontextmenu");
		img.src = img.src.replace(/\._V1.+/, "");
	}
	img.addEventListener("load", function() {
		if(this.width > 640) {
			this.width = 640;
			this.parentNode.appendChild(new Element("a", {
				href : this.src,
				textContent : "Image was re-scaled to fit the page. Click to view the original " + this.naturalWidth + "x" + this.naturalHeight + " picture."
			}, {
				style : "display:block"
			}));
		}
	}, false);
	remove(single("//b[.='IMDb Resume']/.."));
	document.addEventListener("keydown", function(e) {
		if("INPUTEXTAREA".indexOf(e.target.nodeName)>=0) return;
		switch(e.keyCode) {
			case 37: location.href=single("//a[@class='nav-overlay overlay-prev']").href;return;
			case 39: location.href=single("//a[@class='nav-overlay overlay-next']").href;return;
		}
	}, false);
}