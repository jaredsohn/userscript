// ==UserScript==
// @name           masowe zerowanie wieku
// @namespace      local
// @include        http://www.fotka.pl/szukaj.php
// @copyright	   bozar
// @version        1.0.0
// ==/UserScript==

if(document.getElementById("f_miejscowosc")) return;
var tds = document.getElementsByTagName("td");
for(var td in tds){	

	if(tds[td].childNodes[1].childNodes[1].nodeType != 3) continue;
	var link = document.createElement("span");
	link.innerHTML = " [zeruj]";
	link.style.color = "red";
	link.style.cursor = "pointer";	
	var id = tds[td].firstChild.firstChild.firstChild.src;	
	link.id = "zeruj_" + id.substring(id.lastIndexOf("/")+1).split(".")[0];
	
	tds[td].childNodes[1].insertBefore(link, tds[td].childNodes[1].childNodes[2]);
	link.addEventListener("click", reset, true);
}

function reset(e){	
	GM_xmlhttpRequest({
		method: "POST",
		url: "http://www.fotka.pl/ajax/info_operacje.php",		
		data: 'val=[' + e.target.id.split("_")[1] + ',0,"zeruj_wiek"]',
		headers: {
		"Content-Type": "application/x-www-form-urlencoded"
		},
		onload: function(){
					e.target.parentNode.removeChild(e.target.previousSibling);
					e.target.parentNode.removeChild(e.target);
				}
	});	
}