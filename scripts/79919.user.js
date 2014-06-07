// ==UserScript==
// @name          myfreefarm Giesszwerg
// @namespace      myfreefarm
// @include        http://s*.myfreefarm.de/main.php
// ==/UserScript==

(function() {
	function AllesGiessen() {
		var novIndex = 0;
		var now = 0;
		var felder = "";
		location.href = "javascript: top.selectMode(2,true,top.selected);";
		for(novIndex=1; novIndex<=204; novIndex++) {
			location.href = "javascript: top.cache_me(" + novIndex + ", top.garten.garten_prod[" + novIndex + "], top.garten.garten_kategorie[" + novIndex + "] );";
		}
	}
   function startScript() {
      var gz = document.createElement("span");
		var gz_style = document.createAttribute("style");
		var gz_class = document.createAttribute("class");
		gz_style.nodeValue = "position:absolute;z-index:1;width:45px;height:45px;top:0px;right:25px;background:url('http://d3o68bgrbhx8hn.cloudfront.net/pics/verkauf/kannenzwerg.gif') top left no-repeat;";
		gz_class.nodeValue = "link";
		gz.setAttributeNode(gz_style);
		gz.setAttributeNode(gz_class);
		_eventPanel = gz;
		document.getElementsByTagName("body")[0].appendChild(gz);
		_eventPanel.addEventListener( "click", AllesGiessen, true );
		
   }	
	window.setTimeout(function() { startScript(); }, "50");
})();