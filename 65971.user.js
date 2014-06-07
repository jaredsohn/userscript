// ==UserScript==
// @name           -Enschede: AEGEE-Drienerlo integratie
// @description    Vult het Europa-weblog blok van -Enschede door de laatste posts van Drienerlo.
// @include        http://www.aegee.utwente.nl/enschede*
// ==/UserScript==

GM_xmlhttpRequest({
  method: "GET",
  url: "http://drienerlo.blogspot.com/feeds/posts/default?max-results=3&alt=json",
  onload: function(response) {
		json = JSON.parse(response.responseText);

		content = '<h2 class="title">AEGEE-Drienerlo</h2>';
		content += '<div class="content"><div class="item-list"><ul>';
		
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
		
		content += '</ul></div></div>';
		content += '<div class="more-link"><a href="http://drienerlo.blogspot.com">meer</a></div>';
	
		document.getElementById("block-aggregator-feed-1").innerHTML = content;
	
	  // update sIFR header.
	  var script = document.createElement('script');
	  script.setAttribute('type', 'text/javascript');
	  script.innerHTML = 'sIFR.replaceElement(named({sSelector:".block h2",sFlashSrc:"/enschede/themes/aegee_default/calcite.swf", sColor:"#29125B",sWmode:"transparent",sCase:"upper"}));';
	  document.documentElement.firstChild.appendChild(script);	
  }
});