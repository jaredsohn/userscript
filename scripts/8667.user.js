// ==UserScript==
// @name          SubToZhuaxia
// @description   Subscribe rss feed to zhuaxia
// @namespace     http://www.webinterface.cn
// @include       *
//by Zakk (http://www.webinterface.cn)
// ==/UserScript==

var href = window.location.host;
if(href == 'blog.sina.com.cn'){
	// for SB sina blog
	var sina_rss = document.getElementById('rssArea');
	if(sina_rss) {
		var anchors = sina_rss.getElementsByTagName('a');
		if (anchors.length) {
			link = anchors[0];
			url = 'http://www.zhuaxia.com/add_channel.php?sourceid=101&url='+link.href;
			addSubBtn(url);
		}
	}
} else {
	// other sites, find in the meta's link 
	var links = document.getElementsByTagName('link');
	if (links.length) {
		var link, url, rss_url, atom_url;
		for (var i = 0; i < links.length; i++) {
			link = links[i];
			if(link.rel.toLowerCase() == "alternate") {
				if(link.type.toLowerCase() == "application/rss+xml"){
					rss_url = link.href;
				} else if (link.type.toLowerCase() == "application/atom+xml") {
					atom_url = link.href;
				}
			}
		}
		if(rss_url){
			url = 'http://www.zhuaxia.com/add_channel.php?sourceid=101&url=' + rss_url;
		} else if(atom_url){
			url = 'http://www.zhuaxia.com/add_channel.php?sourceid=101&url=' + atom_url;
		}
		if(url){
			addSubBtn(url);
		}
	} 
}

function addSubBtn(url){
 var div = document.createElement("DIV");
 div.style.position = "fixed";
 div.style.right = "0px";
 div.style.bottom = "0px";
 div.style.visibility = "visible";
 div.style.width = "91px";
 div.style.height = "17px";
 div.style.cursor = "hand";
 div.style.cursor = "pointer";
 div.innerHTML = "<img src='http://www.zhuaxia.com/images/subscribe_12.gif' border='0' alt='subscribe to zhuaxia' />";
 div.addEventListener('click',
  function() {
   window.open(url, "zhuaxia")
  },
  false);
 document.documentElement.appendChild(div);
}