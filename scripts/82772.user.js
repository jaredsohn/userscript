// ==UserScript==
// @name           Auto BYOND nay
// @namespace      http://userscripts.org/users/cboland
// @description    Automatic nay blog posts on BYOND
// @include        http://www.byond.com/members/*
// @include        http://byond.com/members/*
// ==/UserScript==

if( window.location.href.search(/command=vote_post_ajax/i) == -1 ) {
	var links = document.getElementsByTagName("a");
	var i=0;
	for (i=0;i<=links.length;i++) {
		if(links[i].getAttribute('onClick') != null ) {
			if( isNay( links[i].getAttribute('onClick') ) ) {
				var str = links[i].getAttribute('onClick');
				str = str.replace("&amp;","&");
				str = str.replace("','post_status_1','post_1'); return false;","");
				str = str.replace("sendRequest('","?");
				
				GM_xmlhttpRequest({
				  method: "GET",
				  url: links[i].href + str,
				  onload: function(response) {
					note("- Auto Nayed!");
				  }
				});
				
				links[i].innerHTML += '+1';
			}
		}
	}
}

function isNay(str) {
	if( str.search(/vote=-1/i) != -1 ) return 1;
	return 0;
}

function note(note) {
	var post = document.getElementById('post_1');
	post.innerHTML = '<br/><span class="notice">' + note + '</span><br/>' + post.innerHTML;
}