// ==UserScript==
// @name        TD-W8961ND
// @namespace   http://192.168.1.1/
// @description Show detailed info of hosts
// @include     http://192.168.1.1/status/status_deviceinfo.htm
// @version     1
// @grant       none
// ==/UserScript==

var username="";
var password="";

var hosts = new Array();
var parser=new DOMParser();
function getTable(dest,macs){
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "/basic/home_lan.htm", true,username,password);
	xhr.onreadystatechange = function () {
		if (xhr.status === 200 && xhr.readyState === 4) {
			var txt=xhr.response;
			htmlDoc=parser.parseFromString(txt, "text/html");
			var table = htmlDoc.getElementsByTagName("table")[5];
			var rows = table.getElementsByTagName("tr");
			rows[1].parentNode.removeChild(rows[1]);
			rows[0].style.height="30";
			rows[0].style.background="#999999";
			console.log(rows.length);
			for(var i=1;i<rows.length;i++){
				var divs = rows[i].getElementsByTagName("div");
				hosts.push({
					"hostname":divs[0].innerHTML,
					"ipaddress":divs[1].innerHTML,
					"macaddress":divs[2].innerHTML,

				})
				if(macs.indexOf(divs[2].innerHTML.trim())>=0)
					rows[i].style.fontWeight = "bold";
			}
			dest.innerHTML = table.innerHTML;
			dest.border="1";
		}
	};
	xhr.send();
}

var macs = new Array();
var tables = document.getElementsByTagName("table");
var element = tables[2];
var rows = element.getElementsByTagName("td");

for(var i=3;i<rows.length;i+=2){
	macs.push(rows[i].innerHTML);
}
var dest = tables[1];
getTable(dest,macs);

