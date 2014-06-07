// ==UserScript==
// @name           Tumblr: Show followers instead of tumblarity
// @namespace      http://www.savethefaeries.com/tagged/tumblr
// @description    Show followers instead of tumblarity
// @include        http://www.tumblr.com/dashboard
// @include        http://www.tumblr.com/dashboard/*
// @include        http://www.tumblr.com/show/*
// @include        http://www.tumblr.com/tumblelog/*
// ==/UserScript==

var rc = document.getElementById('right_column');
var controls = rc.getElementsByTagName('ul');
var c_re = /\btumblelog_controls\b/;
for (var i=0;i<controls.length;i++) {
	if (c_re.test(controls[i].className)) {
		links = controls[i].getElementsByTagName('a');
		var a_re = /activity$/;
		var l_re = /\btumblelog_link\b/;
		for (var j=0;j<links.length;j++) {
			if (a_re.test(links[j])) {
				a = links[j];
				li = a.parentNode;
				li.innerHTML = '';
				var p = controls[i];
				do {
					p = p.previousSibling;
				} while (p.tagName != 'A');
				fetch_count(li, p.href);
				break;
			}
		}
	}
}

function fetch_count(li, link) {
	GM_xmlhttpRequest({
		method: 'GET',
		url: link+'/followers',
		onload: function(response) {
			if (response.status != 200)
				return;

			var res = response.responseText.match(/(\d+) people are following/);
			var count = 0;
			if (res)
				count = res[1];
			li.innerHTML = '<a href="'+link+'/followers">Followers</a>: '+count+' (<a href="/activity">Tumblarity</a>)';
		}
	});
}
