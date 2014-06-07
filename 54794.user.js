// ==UserScript==
// @name		   Link to A-Koss map instead of Plus one, with crop-find (rev.1.5, travian 3.5 compatible)
// @version 	   1.5-crop
// @date		   14-10-2008 17:51:12
// @author		   Anton Fedorov <datacompboy@a-koss.ru>
// @description    Replace plus button, or add same button to extended map on a-koss. Support all servers automatically
// @include 	   http://*.travian.*/karte.php*
// ==/UserScript==

(function(){
  var server = window.location.host.match(/^(.*?)[.]travian[.](.*?)$/);
  if (server[2] == "ru") server = server[1]; else server = server[1]+"."+server[2];
  var nav = document.getElementById("navi_table") || document.getElementById("side_navi");
  var uid = nav.innerHTML.match(/spieler\.php\?uid=([0-9]+)/)[1];

  function setMap() {
	var f = document.forms[0]; if (f.wrappedJSObject) f = f.wrappedJSObject;
	var x = f.xp.value;
	var y = f.yp.value;
	var url = 'http://trav.datacompboy.ru/trav/map/'+server+'?uid='+uid+'&xp='+x+'&yp='+y;
	var map = document.getElementById('map_content');
	if (!map.innerHTML.match(/karte2[.]php/)) {
	  var link = document.createElement('A');
	  link.setAttribute("target", "_blank");
	  var img = document.createElement('IMG');
	  img.setAttribute("class", "map_link_to_xxlmap");
	  img.setAttribute("className", "map_link_to_xxlmap");
	  img.style.position='absolute';
	  img.style.zIndex = '1000';
	  img.setAttribute("src", "img/un/m/max.gif");
	  link.appendChild(img);
	  var pos = map.getElementsByTagName("DIV")[0];
	  map.insertBefore(link, pos);
	}
	var link = map.getElementsByTagName("A")[0];
	link.setAttribute("href", url);
	link.setAttribute("onclick", "return pop('"+url+"')");
	var img = link.getElementsByTagName("IMG")[0];
	img.setAttribute("alt", "A-Koss Map");
	img.setAttribute("title", "A-Koss Map");
	return true;
  }

  function my_al(block) {
	var wnd = window.wrappedJSObject ? window.wrappedJSObject : window;
	var res = wnd._real_al(block);
	if (block == "map_content") {
	  setMap();
	}
	return res;
  }

  function my_map_init() {
	var wnd = window.wrappedJSObject ? window.wrappedJSObject : window;
	var res = wnd._real_map_init();
	setMap();
	return res;
  }

  var wnd = window.wrappedJSObject ? window.wrappedJSObject : window;
  var init = 0;
  if (!wnd._real_al && wnd.al) {
	wnd._real_al = wnd.al;
	wnd.al = my_al;
	setMap();
	init = 1;
  }
  if (!wnd._real_map_init && wnd.map_init) {
	wnd._real_map_init = wnd.map_init;
	wnd.map_init = my_map_init;
	init = 1;
  }
  if (init) {
	wnd.pop = function(aQ){as=window.open(aQ,"map","scrollbars=yes,top=100,left=25,width=975,height=550");as.focus();return false;};
  }

})();
