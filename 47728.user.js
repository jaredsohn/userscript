// ==UserScript==
// @name           Wurzelimperium Allzweckzwerg
// @namespace      wurzelimperium
// @include        http://s*.wurzelimperium.de/verkauf_map.php
// ==/UserScript==

(function() {
	function Alles() {
		var iArr = randArray(1, 204);
		var i;
		//location.href = "javascript: top.selectMode(2,true,top.selected);";
		for(i=0; i<=203; i++) {
			location.href = "javascript: top.cache_me(" + iArr[i] + ", top.garten.garten_prod[" + iArr[i] + "], top.garten.garten_kategorie[" + iArr[i] + "] );";
		}
	}
	
	function randArray(min,max) {
		var Arr = new Array();
		var tmpI;
		
		for(var i=0; i<=max-min; i++) {
			Arr[i] = i + min;
		}
		return Arr.sort(random);
	}
	
	function random(a,b)	{
		return Math.random()-Math.random()
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
		_eventPanel.addEventListener( "click", Alles, true );
		
   }	
	window.setTimeout(function() { startScript(); }, "50");
})();