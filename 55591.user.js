// ==UserScript==
// @name           avoid proxy blacklist
// @namespace      matobaa.ocharake.org
// @include        *
// ==/UserScript==

(function(){
	siteinfo = [
		{match: "http://.*twitter.com/.*"},
		{match: "http://.*sugoren.com/.*"},
		{match: "http://.*wassr.jp/.*"},
	]
	
	function translate(docs){
		links = docs.getElementsByTagName("a")
		for (i=0,ilen=links.length; i<ilen; i++) {
			for(j=0,jlen=siteinfo.length; j<jlen; j++) {
				if(links[i].href.match(siteinfo[j].match)) {
					links[i].href = "http://www.google.com/search?strip=1&q=cache:"+links[i].href
					break;
				}
			}
		}
	};
	translate(document);

	// autopagerize hook
	if (window.AutoPagerize) {
		boot();
	} else {
		window.addEventListener('GM_AutoPagerizeLoaded',boot,false);
	}
	function boot() {
		window.AutoPagerize.addFilter(function(docs){
			docs.forEach(translate);
		});
	}
}());
