// ==UserScript==
// @name           UnshortenURLs
// @author         catalyst7193[@]gmail[.]com
// @namespace      http://userscripts.org/users/75492
// @description    Unshortens shortened URLS
// @include        *
// @version        0.0.3
// ==/UserScript==

try {
	(function(){	
		function matches(node) {
			return (node != null && node != undefined) && 
					((node.nodeName == 'a' || node.nodeName == 'A') && 
						(node.hasAttribute("href") && node.getAttribute("href") != ""));
		}
		
		function handle(node) {
			var href = node.getAttribute("href");
			
			var services = [
			"[a-z0-9]{1,4}\.[a-z]{2,3}/[a-zA-Z0-9]+", "bit.ly", "4sq.com", "tumblr.com", "un.cr", "j.mp", "www.bizz.cc", "www.checkthislink.com", "www.cjb.net", "clockurl.com", "forwarding.clockwatchers.com", "www.c-o.in", "www..*?.com.co.in", "www.freedomain.co.nr", "dickensurl.com", "doiop.com", "www.dot.tk", "www.dwarfurl.com", "easyurl.net", "fff.to", "gentleurl.net", "gu.ma", "www.hotshorturl.com", "href.to", 	"www.hugeurl.com",  "inturl.com", 	"is.gd", 	"iscool.net", 	"kickme.to", 	"linkfrog.net", 	"www.linkzip.com", "www.linkzip.net", 	"www.liteurl.com", 	"www.metamark.net", 	"minilink.org", 	"ne1.net", 	"normalurl.com", 	"notlong.com", "picsorlinks.com", 	"qwer.org", 	"www.redirecting.biz", 	"relurl.com", 	"sg5.co.uk", 	"www.shim.net", 	"shorl.com", "www.shorturl.com", 	"simurl.com", 	"smurl.lv", 	"snick.me", 	"snipurl.com", 	"www.tighturl.com", "tiny2go.com", 	"tinyurl.com", 	"98.to", 	"tr.im", 	"www.unonic.com", 	"u.nu", 	"ur1.ca", 	"www.6url.com",	"urlbit.us", 	"1url.com", 	"www.urlescort.com", 	"urlit.net", 	"www.urllogs.com", 	"www.v3.com", 	"webalias.com", "wurl.ca", 	"xaddr.com", 	"xiy.net", 	"www.xn6.net", 	"xrl.in", 	"yep.it", 	"zzz.ee"];
			
			for (var i = 0, service; service = services[i]; ++i) {
			
				var pattern = new RegExp("^(?:http|https|ftp)://" + service +".*?$");
				if (pattern.test( href )) {
					
					GM_xmlhttpRequest({
						method: 'GET',
						url: "http://api.unshort.me/?r=" + href,
						headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
								  'Accept': 'application/atom+xml,application/xml,text/xml'},
						onload: function(responseDetails) {
							  if (!responseDetails.responseXML) 
							  {
								responseDetails.responseXML = new DOMParser().parseFromString(responseDetails.responseText, "text/xml");
							  }
							  var element = responseDetails.responseXML.getElementsByTagName("resolvedURL");
							  if (element != null && element != undefined && element.length > 0) node.innerHTML = element[0].textContent;
						}
					});
					break;
				}
			}
		}
		
		var links = document.getElementsByTagName("a");
		for (var i = 0, link; link = links[i]; ++i) if (matches(link)) handle(link);
	})();
} catch (e) {
	GM_log(e);
}

