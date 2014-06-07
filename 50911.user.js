// ==UserScript==
// @name           gw_generell
// @namespace      galaxywars
// @include        *galaxywars.de/*
// @exclude        *galaxywars.de/nav*

// ==/UserScript==

//function resOhnePunkt(res) {

//	var ress = document.getElementById(res).textContent;
//	if (ress.length > 4) {
//		if (ress.length < 8) { //12.000.124
//			var res0 = ress.substring(0, ress.length - 4);
//			var res1 = ress.substring(ress.length - 3, ress.length);
//			return (res0 + res1);
//		}else {
//			var res0 = ress.substring(0, ress.length - 4);
//			var res1 = ress.substring(ress.length - 7, ress.length - 5);
//			var res2 = ress.substring(ress.length - 3, ress.length);
//			return (res0 + res1 + res2);
//		}
//	}else {return ress;}
	
//}

//var eisen 		= resOhnePunkt('res1');
//var lutinum 	= resOhnePunkt('res2');
//var wasser 		= resOhnePunkt('res3');
//var wasserstoff = resOhnePunkt('res4');

//alert("eisen: " + eisen + " - lutinum: " + lutinum + " - wasser: " + wasser + " - wasserstoff: " + wasserstoff);


document.body.getElementsByTagName('center')[0].style.textAlign = "left";
document.body.getElementsByTagName('center')[0].getElementsByTagName('table')[0].style.marginLeft = "60px";


var iframe = document.createElement('iframe');

iframe.style.position = "absolute";
iframe.style.right = "0px";
iframe.style.top = "0px";
iframe.style.border = "none";
iframe.style.height = "1000px";
iframe.style.width = "200px";
iframe.src = "http://stevo.saxn.at/gw/sidebar.php";

document.body.appendChild(iframe);
