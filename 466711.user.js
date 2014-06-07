// ==UserScript==
// @name       ОА в информационной панели
// @namespace  http://heroeswm.ru/
// @version    0.1
// @include     http://www.heroeswm.ru/*
// @copyright  johniek_comp (http://www.heroeswm.ru/pl_info.php?id=1305405)
// ==/UserScript==

var url = document.location.pathname;
var td = document.getElementsByTagName('td')
var new_td = document.createElement("td");
new_td.width = "24";
new_td.height = "24";
new_td.innerHTML = "&nbsp;<b style='color:green'>ОА:</b><b id='oa'>"+GM_getValue('oa')+"</b>";
for (var i = 0; i <= td.length -1; i++) {
	if( td[i].getAttribute("width") == "24" &&  td[i].getAttribute("height") == "24") {
		if(i == 33){
			td[i].parentNode.appendChild(new_td)
		}
	}
};

if(url == "/inventory.php") {
	var oa = document.getElementById('ap').innerText;
	GM_setValue("oa", oa);
	setInterval(function(){
		var node_oa = document.getElementById('oa');
		if( parseInt(node_oa) !=  parseInt(document.getElementById('ap').innerText) ){
			GM_setValue("oa", document.getElementById('ap').innerText);
			node_oa.innerHTML = document.getElementById('ap').innerText;
		}
	}, 250);
}
