// ==UserScript==
// @name          Kongregate statuscolor
// @description   Shows a color to display the status of a poster instead of a symbol.
// @include       http://www.kongregate.com/forums/*/topics/*
// ==/UserScript==

var posts = document.getElementsByClassName("post hentry");
var cimg, i, span, op, link, ptitle, len = posts.length;
function getPostSpan(ind) {
	return posts[ind].getElementsByTagName("td")[0].getElementsByClassName("fn")[0];
}
function getPostLink() {
	return span.getElementsByTagName("a")[0];
}

for(i=0;i<len;i++) {
	span = getPostSpan(i);
	link = getPostLink();
	op = link.className.indexOf("post_creator") != -1;
	ptitle = (link.className.match(/[a-zA-Z_]+_icon/) || "null").toString().toLowerCase();
	switch(ptitle) {
		case "null":
		break;
		case "developer_icon":
			link.style.color = op ? "#9999FF" : "#0000FF";
		break;
		case "admin_icon":
			link.style.color = op ? "#FF9999" : "#FF0000";
		break;
		case "forummod_icon":
			link.style.color = op ? "#DDAA77" : "#CC6600";
		break;
		default:
			link.style.color = op ? "#FFCC99" : "#FF9900";
		break;
	}
	if(ptitle == "null") continue;
	link.className = null;
	link.title = ptitle.charAt(0).toUpperCase()+ptitle.split("_")[0].slice(1)+(op?" (OP)":"");
}
