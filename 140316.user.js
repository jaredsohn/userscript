// ==UserScript==
// @name          mixiチェック for Twitter
// @namespace     http://www.chipple.net/tools/gmscripts
// @include       https://twitter.com/*
// @version       1.0
// ==/UserScript==

function gm_mcftwitter_onClick(event) {
	if (!event) return;
	var target = event.target;
	if (!target) return;
	while (target && target.tagName != "A") target = target.parentNode;
	if (!target) return;
	var permalink = target.getAttribute("_permalink");
	if (!permalink) return;
	// 
	// ここにあるキーはこのユーザスクリプト専用に登録したものです。
	// 他の目的でキーが必要の場合は、 http://developer.mixi.co.jp/ で登録してください。
	//
	// The key embedded here is registered for this UserScript only.
	// If you need one for another purpose, make your own at http://developer.mixi.co.jp/
	//
	var u = 'http://mixi.jp/share.pl?u='+encodeURIComponent(permalink)+'&k=5befd91e68793e48b9'+/*DO NOT USE THIS KEY ELSEWHERE*/'92b25e368959d9e2e59d80';
	window.open(u,'share','width=632,height=456,location=yes,resizable=yes,toolbar=no,menubar=no,scrollbars=no,status=no');
}

function gm_mcftwitter_getRetweetLI(parent_ul) {
	var lis = parent_ul.getElementsByTagName("li");
	var retweet_li = false;
	for (var i = 0; i < lis.length; i++) {
		if (/\baction-rt-container\b/.test(lis[i].className)) {
			retweet_li = lis[i];
		} else if (/\baction-mixi-check-container\b/.test(lis[i].className)) {
			// Already has mixi Check: do nothing
			return false;
		}
	}
	return retweet_li;
}

function gm_mcftwitter_getImageURL(retweet_li, css_color, size) {
	if (!document._mixi_check_icon_url) {
		var base_color_rgb = css_color.match(/\d+/g).slice(0,3); //new Array(0x00,0x84,0xb4);
		var grays = new Array(0x00,0x15,0x28,0x36,0x4a,0x55,0x6b,0x78,0x88,0xa1,0xb2,0xc1,0xd7,0xe9,0xf5,0xff);
		var color_table_url_encoded = "";
		for (var i = 0; i < grays.length; i++) {
			for (var rgb = 0; rgb < base_color_rgb.length; rgb++) {
				var color_byte = 0xff-Math.floor((0xff-grays[i])*(0xff-base_color_rgb[rgb])/0xff);
				color_table_url_encoded += "%" + ("0"+color_byte.toString(16)).slice(-2);
			}
		}
		if (size == 16) {
			document._mixi_check_icon_url = "url(data:image/gif,GIF89a%10%00%0f%00%b3%00%00"+color_table_url_encoded+"%21%f9%04%01%00%00%0f%00%2c%00%00%00%00%10%00%0f%00%00%04%6b%f0%c9%e7%10%09%41%90%34%3b%0a%40%28%02%02%d3%15%63%1a%2e%d2%a1%aa%81%d3%84%c4%a2%38%0c%c1%38%8a%88%b8%00%82%63%00%58%34%30%0e%01%8d%18%64%84%10%88%10%83%29%50%06%17%4f%e0%34%34%20%d0%b0%80%9f%94%79%48%70%cd%00%83%21%94%b0%36%1e%d6%97%c8%20%69%c4%5f%83%8e%e3%00%52%0d%1c%1d%13%0c%0a%09%28%01%08%81%89%0f%09%07%80%1d%11%00%00%3b)";
		} else {
			document._mixi_check_icon_url = "url(data:image/gif,GIF89a%0d%00%0c%00%b3%00%00"+color_table_url_encoded+"%21%f9%04%01%00%00%0f%00%2c%00%00%00%00%0d%00%0c%00%00%04%47%f0%49%66%44%08%03%39%29%0f%f8%20%20%30%5d%68%06%cd%f2%25%c8%52%b4%c6%77%14%1f%33%04%36%fe%0d%42%ed%03%8c%8f%a0%07%fc%05%01%84%18%40%f1%61%2e%57%8d%80%29%34%98%0c%a6%a2%06%e7%a1%30%10%08%9f%82%76%cb%69%14%16%db%08%00%3b)";
		}
	}
	return document._mixi_check_icon_url;
}

function gm_mcftwitter_addMixiCheckToDiv(div, size) {
	// Get permalink
	var as = div.getElementsByTagName("a");
	if (as.length == 0) return;
	var a_permalink;
	for (var i = 0; i < as.length; i++) {
		if (/\bjs-permalink\b/.test(as[i].className)) {
			a_permalink = as[i];
			break;
		}
	}
	if (!a_permalink) return;
	var permalink = a_permalink.href.replace(/^\//, "https://twitter.com/");
	// Get parent UL
	var uls = div.getElementsByTagName("ul");
	if (uls.length == 0) return;
	var parent_ul;
	for (var i = 0; i < uls.length; i++) {
		if (/\btweet-actions\b/.test(uls[i].className)) {
			parent_ul = uls[i];
			break;
		}
	}
	if (!parent_ul) return;
	var retweet_li = gm_mcftwitter_getRetweetLI(parent_ul);
	if (!retweet_li) return;
	// Add mixi Check
	var css_color = window.getComputedStyle(retweet_li.getElementsByTagName("a")[0]).color;
	var new_li = document.createElement("li");
	new_li.className = "action-mixi-check-container";
	var new_a = document.createElement("a");
	new_a.className = "with-icn";  // js-toggle-fav
	new_a.style.color = css_color;
	new_a.setAttribute("_permalink", permalink);
	new_a.addEventListener("click", gm_mcftwitter_onClick);
	var new_i = document.createElement("i");
	new_i.style.marginRight = "3px";
	new_i.style.width = size == 16 ? "16px" : "13px";
	new_i.style.height = size == 16 ? "16px" : "12px";
	new_i.style.backgroundImage = gm_mcftwitter_getImageURL(retweet_li, css_color, size);
	new_a.appendChild(new_i);
	var new_b = document.createElement("b");
	var new_span = document.createElement("span");
	new_span.innerHTML = "mixiチェック";
	new_span.title = "mixiチェック";
	new_b.appendChild(new_span);
	new_a.appendChild(new_b);
	new_li.appendChild(new_a);
	var insert_before_li = retweet_li.nextSibling;
	if (insert_before_li)
		parent_ul.insertBefore(new_li, insert_before_li);
	else
		parent_ul.appendChild(new_li);
}

function gm_mcftwitter_onMouseOverTweet(event) {
	if (!event) return;
	var target = event.target;
	if (!target) return;
	gm_mcftwitter_addMixiCheckToDiv(target, 13);
}

function gm_mcftwitter_prepareDivs() {
	var divs = document.getElementsByTagName("div");
	for (var i = 0; i < divs.length; i++) {
		var div = divs[i];
		var className = div.className;
		if (/\btweet-mixi-check-prepared\b/.test(className)) {
			continue;
		} else if (/\bpermalink-tweet\b/.test(className)) {
			gm_mcftwitter_addMixiCheckToDiv(div, 16);
			return false;
		} else if (/\btweet\b/.test(className)) {
			div.addEventListener("mouseover", gm_mcftwitter_onMouseOverTweet);
			div.className += " tweet-mixi-check-prepared";
		}
	}
	setTimeout(gm_mcftwitter_prepareDivs,1000);
}

var script = document.createElement("script");
script.textContent = 
	gm_mcftwitter_prepareDivs.toString() +
	gm_mcftwitter_onMouseOverTweet.toString() +
	gm_mcftwitter_addMixiCheckToDiv.toString() +
	gm_mcftwitter_getRetweetLI.toString() +
	gm_mcftwitter_getImageURL.toString() +
	gm_mcftwitter_onClick.toString() +
	"gm_mcftwitter_prepareDivs();";
document.body.appendChild(script);
