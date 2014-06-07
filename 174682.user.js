// ==UserScript==
// @name        RS Forums Enhancer
// @namespace   http://userscripts.org/users/418758
// @description Provides extra custimization for posts on the Runescape forums.
// @include     http://services.runescape.com/m=forum/*
// @include     https://services.runescape.com/m=forum/*
// @grant       none
// @version     1.0.0
// ==/UserScript==
/*
Created by S a z h
1.0.0	- Initial version
		- Post numbers
		- Images (Whitelist: Imgur)
		- Links (Whitelist: Imgur)
		- Font color
		- Ordered & Unordered lists
		- Tabs
		- Thematic break (horizontal rule)

Todo:
	Text-shadow
	Tables

	Can be added if enough support:
	Alignment (left, center, right)
	Backwards text (will probably remove because it's useless)
	Description list (hard to explain)
*/

var content = document.getElementById('contentmsg').childNodes;
var length = content.length;
var postNum = 0;
for(var i = 0; i < length; i += 1){
if(content[i].className == null) continue;
	if(content[i].className == "msgplace"){
		if(content[i].length < 4){
			postNum = parseInt(content[i].name) + 1;
		}else{
			postNum = numberFormat(parseInt(content[i].name) + 1);
		}
	}else if(content[i].className.indexOf("message") != -1){
		var links = content[i].getElementsByClassName('BubbleLinks')[0]; //leftpanel
		links.innerHTML = "Post #"+postNum+links.innerHTML;
		var msg = content[i].getElementsByClassName('msgcontents')[0].getElementsByTagName('td')[0];
		msg.innerHTML = bbcode(msg.innerHTML);
	}
}

function bbcode(str){
	search = [
		/\[hr\]/gi,
		/\[olist\]([\s\S]*?)\[\/olist\]/gi,
		/\[list\]([\s\S]*?)\[\/list\]/gi,
		/\[\*\]\s?(.*?)\n/gi,
		/\[color=([0-9A-F]{6}|[0-9A-F]{3})\](.*?)\[\/color\]/gi,
		/\[tab=([0-9]{1})\](.*?)\[\/tab\]/gi,
		/\[img (.*?)=(.*?)\]/gi,
		/\[url (.*?)=(.*?)\](.*?)\[\/url\]/gi
	];
	replace = [
		"<hr>",
		"<ol>$2</ol>",
		"<ul>$1</ul>",
		"<li>$1</li>",
		"<span style='color: #$1;'>$2</span>",
		padding,
		img,
		url
	];
	for (var i = 0;i<search.length;i++) {
		str = str.replace(search[i], replace[i]);
	}
	return str;
}
function padding(str, p1, p2, offset, s){
	return "<span style='margin-left: "+(p1*16)+"px;'>"+p2+"</span>";
}
function img(str, p1, p2, p3, offset, s){
	if(p1 == "imgur"){
		return "<a href='http://i.imgur.com/$2' title='$3' target='_blank'><img src='http://i.imgur.com/$2' alt='$3' style='max-height:300px;max-width:300px;'></a>";
	}
}
function url(str, p1, p2, p3, offset, s){
	if(p1 == "imgur"){
		return "<a href='http://i.imgur.com/$2' title='$3' target='_blank'>$3</a>";
	}
}
function numberFormat(num){num=num+'';return num.replace(/[^\d\.\-]/g,'').replace(/(\.\d{2})[\W\w]+/g, '$1').split('').reverse().join('').replace(/(\d{3})/g,'$1,').split('').reverse().join('').replace(/^([\-]{0,1}),/,'$1').replace(/(\.\d)$/,'$1'+'0').replace(/\.$/,'.00');}