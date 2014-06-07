// ==UserScript==
// @name           mituwo20100423
// @namespace      mry
// @include        http://livetube.cc/%E3%81%BF%E3%81%A4%E3%82%92%E6%98%A5/%E3%81%93%E3%82%93%E3%81%AB%E3%81%A1%E3%82%8F
// ==/UserScript==

(function(){

	var MRY = {
		live2: document.getElementById('live2'),
		server:'s2.livetube.cc',
		stream:'aaaackbgoeudq'
	};
	
	
	MRY.live2.innerHTML = '<object type="application/x-shockwave-flash" data="/swf/player_flv_maxi.swf" width="100%" height="100%" id="stream_host">'+
		'<param name="movie" value="/swf/player_flv_maxi.swf" />'+
		'<param name="FlashVars" value="flv=http://' + MRY.server + '/stream/' + MRY.stream +'.flv'+
			'&amp;autoplay=1&amp;margin=0&amp;showvolume=1&amp;playercolor=aaaaaa&amp;playeralpha=50'+
			'&amp;onclick=&amp;buffershowbg=0&amp;buffer=0&amp;playertimeout=800" />'+
		'</object>';

})();