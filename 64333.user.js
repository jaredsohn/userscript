// ==UserScript==
// @name           UnShortenEmAll
// @namespace      http://saperduper.org
// @description    Unshorten shortened urls (tinyurl.com, bit.ly etc.) in twitter and identica
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// @include        http://search.twitter.com/*
// @include        http://identi.ca/*
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
'http://y.ahoo.it/',
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
'http://fb.me/',
'http://on.cnn.com/',
'http://bbc.in/',
'http://gu.com/',
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
'http://wapo.st/',
'http://nyr.kr/',
'http://amzn.to/',
'http://mzl.la/',
'http://mee.bo/',
'http://plr.is/',
'http://gclink.us/',
'http://url.ag/',
'http://db.ly/',
'http://awe.sm/',
'http://reg.cx/',
'http://shozu.com/',
'http://moourl.com/',
'http://con.st/',
'http://s2t.vg/',
'http://tnw.to/',
'http://drp.ly/',
'http://r2.ly/',
'http://jr.ly/',
'http://alturl.com/',
'http://on0.us/',
'http://cptlst.com/',
'http://idek.net/',
'http://om.ly/',
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
'http://huff.to/',
'http://xrl.in/',
'http://uurl.in/',
'http://shar.es/',
'http://kiq.me/',
'http://lev.me/',
'http://ptiturl.com/',
'http://l.pr/',
'http://cl.ly/',
'http://sn.im/',
'http://datafl.ws/'
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
			short_link.href=response.finalUrl;
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