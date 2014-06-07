// ==UserScript==
// @name        Flickr Alternative Map Links
// @description Displays alternative (Google, Bing, etc.) map links on Flickr (geotagged) photo/video pages.
// @version     1.20
// @namespace   http://www.flickr.com/services/apps/by/tarmo888
// @include     http://www.flickr.com/*/*
// ==/UserScript==

(function() {
var map = document.getElementById('photo-story-map-zoom-out');
if (!map) {
	/*alert('Not geotagged');*/
}
else {
	var regex = new RegExp('[\\?&]c=([^&#]*),([^&#]*)');
	var results = regex.exec(map.src);
	if (results && results.length == 3) {
		var lat = results[1];
		var latd = results[1];
		var lon = results[2];
		var lond = results[2];
		sign = latd>0?1:-1;
		lat4 = latd>0?'N':'S';
		latd *= sign;
		lat1 = Math.floor(latd);
		lat2 = Math.floor((latd-lat1)*60);
		lat3 = Math.floor((latd-lat1-lat2/60)*3600);
		sign = lond>0?1:-1;
		lon4 = lond>0?'E':'W';
		lond *= sign;
		lon1 = Math.floor(lond);
		lon2 = Math.floor((lond-lon1)*60);
		lon3 = Math.floor((lond-lon1-lon2/60)*3600);
		p = lat1+'_'+lat2+'_'+lat3+'_'+lat4+'_';
		p += lon1+'_'+lon2+'_'+lon3+'_'+lon4;
		var map_links = document.getElementById('photo-story-map');
		var new_div = document.createElement('div');
		new_div.innerHTML = '<a href="http://toolserver.org/~geohack/geohack.php?params='+p+'&amp;pagename=Flickr" target="_blank">GeoHack</a>';
		new_div.innerHTML += ' | <a href="http://maps.google.com/maps?q='+lat+','+lon+'(Flickr)&amp;z=15" target="_blank">Google</a>';
		new_div.innerHTML += ' | <a href="http://www.bing.com/maps/default.aspx?cp='+lat+'~'+lon+'&amp;q='+lat+'%20'+lon+'&amp;lvl=15" target="_blank">Bing</a>';
		new_div.innerHTML += ' | <a href="http://www.openstreetmap.org/index.html?mlat='+lat+'&amp;mlon='+lon+'&amp;zoom=15" target="_blank">OSM</a>';
		new_div.innerHTML += ' | <a href="http://www.wikimapia.org/#lat='+lat+'&amp;lon='+lon+'&amp;z=15&amp;m=w" target="_blank">Wikimapia</a>';
		new_div.innerHTML += ' | <a href="http://maps.nokia.com/'+lat+','+lon+',15,0,0,normal.day?plcsDl=loc" target="_blank">OVI</a>';
		new_div.innerHTML += ' | <a href="http://geoportaal.maaamet.ee/url/xgis-latlon.php?lat='+lat+'&amp;lon='+lon+'&amp;out=xgis" target="_blank">xGIS</a>';
		if (map_links) {
			map_links.appendChild(new_div);
		}
	}
}
})();