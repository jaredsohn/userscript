// ==UserScript==
// @name           UnShortenURL
// @namespace      http://www.nitinh.com
// @description    Unshorten shortened urls (tinyurl.com, bit.ly etc.) in twitter
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// @include        http://search.twitter.com/*
// ==/UserScript==

var services = [
'http://bit.ly/',
'http://tinyurl.com/',
'http://is.gd/',
'http://tl.gd/',
'http://ow.ly/',
'http://tumblr.com/',
'http://ping.fm/',
'http://post.ly/',
'http://ff.im/',
'http://goo.gl/',
'http://j.mp/',
'http://twt.tl/',
'http://wp.me/',
'http://disq.us/',
'http://icio.us/',
'http://digg.com/',
'http://flic.kr/',
'http://tcrn.ch/',
'http://oreil.ly/',
'http://twurl.nl/',
'http://ub0.cc/',
'http://retwt.me/',
'http://short.to/',
'http://snurl.com/',
'http://su.pr/',
'http://tr.im/',
'http://ur1.ca/',
'http://grab.ly/',
'http://ur.ly/',
'http://twt.gs/',
'http://r2.ly/',
'http://jr.ly/',
'http://om.ly/',
'http://fb.me/',
'http://on.cnn.com/',
'http://cli.gs/',
'http://tiny.cc/',
'http://snipr.com/',
'http://instapaper.com/',
'http://arst.ch/',
'http://blo.gr/',
'http://lnk.ms/',
'http://3.ly/',
'http://zz.gd/',
'http://mu.ly/',
'http://snipurl.com/',
'http://fav.me/',
'http://2tu.us/',
'http://b2l.me/',
'http://chart.ly/',
'http://dlvr.it/',
'http://pwr.com/',
'http://bt.io/',
'http://nyturl.com/',
'http://s.nyt.com/',
'http://nyti.ms/',
'http://plr.is/',
'http://gclink.us/',
'http://url.ag/',
'http://db.ly/',
'http://reg.cx/',
'http://shozu.com/',
'http://moourl.com/',
'http://con.st/',
'http://s2t.vg/',
'http://tnw.to/',
'http://drp.ly/',
'http://alturl.com/',
'http://on0.us/',
'http://cptlst.com/',
'http://idek.net/',
'http://gdzl.la/',
'http://cnt.to/',
'http://jan.io/',
'http://afx.cc/',
'http://u.nu/',
'http://minurl.org/',
'http://swtiny.eu/',
'http://pop.is/',
'http://vf.cx/',
'http://cot.ag/',
'http://neow.in/',
'http://econ.st/',
'http://xrl.in/',
'http://uurl.in/',
'http://shar.es/',
'http://kiq.me/'
];

var as = document.getElementsByTagName('a');
for (var i = 0; i < as.length; i++) {
	var a = as[i];
	if (isshort(a)){
		unshorten(a);			
	}
}

var ols=document.getElementsByTagName('ol');
var ol=ols[0];
ol.addEventListener('DOMNodeInserted', function (event) {
	var leenks=event.target.getElementsByTagName('a');
	for (var i = 0; i < leenks.length; i++) {
		var leenk = leenks[i];
		if (isshort(leenk)){
			window.setTimeout(unshorten, 0,leenk);
		}
		
	}
}, false);

function unshorten(short_link) {	
	GM_xmlhttpRequest({
		method: "HEAD",
		url: short_link.href,
		headers: {"User-Agent": "Mozilla/5.0","Accept": "text/xml"},
		onload: function(response) {
			short_link.href = response.finalUrl;
            var tempDiv = document.createElement('div');
            tempDiv.innerHTML = response.responseText.replace(/<script(.|\s)*?\/script>/g, '');
            short_link.innerHTML = tempDiv.getElementsByTagName('title')[0].innerHTML;
		}
	});
}

function isshort(link) {
    var short_link = false;
    for (var j = 0; j < services.length; j++) {
        if (link.href && link.href.indexOf(services[j]) == 0) {
            short_link = true;
            break;
        }
    }
    return short_link;
}