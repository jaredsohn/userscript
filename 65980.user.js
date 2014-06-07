// ==UserScript==
// @name           -Enschede: AEGEE-Drienerlo als Europa-weblog
// @description    Vult het Europa-weblog blok van -Enschede met up-to-date reis verhalen.
// @include        http://www.aegee.utwente.nl/enschede*
// ==/UserScript==

GM_xmlhttpRequest({
  method: "GET",
  url: "http://drienerlo.blogspot.com/feeds/posts/default/-/Reizen?max-results=3&alt=json",
  onload: function(response) {
		json = JSON.parse(response.responseText);
		
		content = "";
		
		for (var i = 0; i < json.feed.entry.length; i++) {
	    var e = json.feed.entry[i];
			
			for (var k = 0; k < e.link.length; k++) {
	      if (e.link[k].rel == 'alternate') {
	        url = e.link[k].href;
	        break;
	      }
	    }
	    
			content += '<li><a href="'+url+'">'+e.title.$t+'</a></li>';
		}
		
		europaBlok = document.getElementById("block-aggregator-feed-1");
		
		europaBlok.getElementsByTagName("ul")[0].innerHTML = content;
		aEls = europaBlok.getElementsByTagName("a");
		aEls[aEls.length-1].href = "http://drienerlo.blogspot.com/search/label/Reizen";
  }
});