// ==UserScript==
// @name           Goloci Profile Viewer
// @namespace      Goloci
// @description    Schaut Profile auf der Seite goloci.de an
// @include        http://www.goloci.de/online_list.php
// ==/UserScript==

(function() {
	function process() {
		var online_user = getOnlineUser();
		makeIt(online_user,0);
	}
	
	function makeIt(arr,i) {
		if(i<arr.length-1) {
			location.href = arr[i];
			setTimeout(function() {makeIt(arr,i+1);}, 2000);
		} else {
			alert("Ende");
		}
	}
	
	function getOnlineUser() {
		var retVal = document.getElementsByTagName("body")[0].innerHTML.match(/javascript:view_member\([0-9]+\);/gi);
		return retVal.sort(random);
	}
	
	function random(a,b)	{
		return Math.random()-Math.random()
	}
	
   function startScript() {
      var w = document.createElement("span");
		var w_style = document.createAttribute("style");
		var w_id = document.createAttribute("id");
		w_style.nodeValue = "border: 3px dashed black; background-color: #CCCCCC; position: fixed; top: 200px; left: 200px;";
		w_id.nodeValue = "view_win";
		w.setAttributeNode(w_style);
		w.setAttributeNode(w_id);
		//w.innerHTML = "";
		var txt = document.createTextNode("Um alle Profile der Online-User anzuschauen Klicke Bitte hier");
		var b = document.createElement("button");
		var b_type = document.createAttribute("type");
		var b_id = document.createAttribute("id");
		b_type.nodeValue = "button";
		b_id.nodeValue = "pbutton"
		b.setAttributeNode(b_type);
		b.setAttributeNode(b_id);
		b.appendChild(txt);
		_eventPanel = b;
		_eventPanel.addEventListener("click", process, true );
		w.appendChild(b);		
		document.getElementsByTagName("body")[0].appendChild(w);
   }	
	window.setTimeout(function() { startScript();}, "500");
})();