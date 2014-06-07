// ==UserScript==
// @name          DM
// @namespace     http://devmarkup.com/dev-user-skills-21133.html
// @description   add color to skill table:)
// @include       http://devmarkup.com/dev-user-skills-21133.html
// ==/UserScript==


(function(){
	window.addEventListener("load",function(){
		var _table = document.getElementsByClassName("grid");
		for (var i=0; i<=_table.length; i++) {
			var _td =  _table[i].getElementsByTagName("td");
			var _th =  _table[i].getElementsByTagName("th");
			var _heading = document.getElementsByTagName("h1");
			for (var j=0; j<=_td.length; j++) {
				if (_td[j].innerHTML == "no") {
					_td[j].style.backgroundColor = "#ef6b59";
					_th[j].style.backgroundColor = "#ef6b59";
				}
				else {
					_td[j].style.backgroundColor = "#54a7ed";	
					_th[j].style.backgroundColor = "#54a7ed";	
				}
			}
		}
	}
	,false);
})();
