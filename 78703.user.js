// ==UserScript==
// @name           Plurk Random Laugh
// @namespace      com.manfreed.randomlaugh
// @include        http://www.plurk.com/*
// ==/UserScript==

//////////////////////////////////////////////////

if (location.href.search('comet') == -1) {

	var sor = document.getElementById('form_holder').getElementsByTagName('tr')[0];
	var lasttd = sor.getElementsByTagName('td')[2];
	var td = document.createElement('td');
	sor.insertBefore(td,lasttd);

	var link = document.createElement('img');
	link.setAttribute("src", "http://statics.plurk.com/3385896779bf1c13188bf92ca516878e.gif");
	link.setAttribute("style", "cursor:pointer;");
	td.appendChild(link);
	link.addEventListener("click", function(){
	
		var box = document.getElementById('input_small');
		var n = 140-box.value.length;
		var t = ["A", "S", "F", "D", "D", "D"];
		var s = "";


		for (var i=0;i<n;i++) {
			var r1 = Math.floor(Math.random()*5)
			if (( r1 > 0) && i%2==0) {
				s = s + ":";
			} else {
				s = s + t[Math.floor(Math.random()*t.length)];
			}
		}
		box.value = box.value + s;
		box.focus();
	}, false);
}


