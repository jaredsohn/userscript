// ==UserScript==
// @name           restyle_cafebeta_twitter
// @namespace      com.zhangkf
// @include        http://cafebeta.com/twitter/
// ==/UserScript==

(function() {
	var tables = document.getElementsByTagName("table");
	if(tables.length > 0){
		var tableE = tables[0];
		tableE.style.width = "600px";
		tableE.style.marginLeft = "250px";
	}
	
	var trs = document.getElementsByTagName("tr");
	for(var i=1;i<trs.length;i++){
		trs[i].style.height = "90px";
	}
	
	var tds = document.getElementsByTagName("td");
	for(var i=0;i<tds.length;i++){
		tds[i].style.lineHeight = "20px";
	}
	
	var forms = document.getElementsByTagName("form");
	forms[0].style.marginLeft = "250px";
	
	var ps = document.getElementsByTagName("p");
	ps[0].style.marginLeft = "730px";
	
	var divs = document.getElementsByClassName("menu")
	for(var i = 0;i<divs.length;i++){
		divs[i].style.textAlign = "center";
	}
	
	if(document.getElementById("status"))
		document.getElementById("status").style.maxWidth = "600px";
	if(document.getElementsByName("status"))
		document.getElementsByName("status")[0].size= "80";
})();