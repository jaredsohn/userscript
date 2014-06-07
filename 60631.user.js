// ==UserScript==
// @name         locapoint link
// @namespace    http://d.hatena.ne.jp/arikui/
// @include      *
// ==/UserScript==

var mapURL = GM_getValue("url")   || "http://maps.google.co.jp/";
var param  = GM_getValue("param") || "q=%lat%,%lon%";

var w = window;
var r = /([A-Z][A-Z][0-9]\.[A-Z][A-Z][0-9]\.[A-Z][A-Z][0-9]\.[A-Z][A-Z][0-9])/g;

w.addEventListener("load", function(){
	var tags = document.body.getElementsByTagName("*");
	if(document.body.innerHTML.match(r)) replaceText(tags);
}, false);

function replaceText(t){
	for(var i = 0; i < t.length; i++){
		if(t[i].tagName.match(/STYLE|SCRIPT|A/i)) continue;
		var childs = t[i].childNodes;
		for(var j = 0; j < childs.length; j++){
			var text = childs[j].nodeValue;
			if(childs[j].nodeType == 3 && text.match(r)){
				if(text.length == 15)
					t[i].replaceChild(repElement(text), childs[j]);
				else
					t[i].innerHTML = t[i].innerHTML.replace(r, function($0){
						var l   = LocaPoint2LatLon($0);
						var prm = param.replace(/%lat%/g, l.latitude).replace(/%lon%/g, l.longitude);
						return ["<a href='",mapURL,"?",prm,"' title='lat,lon = ,",l.latitude,",",l.longitude,"'>",$0,"</a>"].join("");
					});
			}
		}
	}
}

function repElement(locapo){
	var a   = document.createElement("a");
	var l   = LocaPoint2LatLon(locapo);
	var prm = param.replace(/%lat%/g, l.latitude).replace(/%lon%/g, l.longitude);
	a.href  = [mapURL,"?",prm].join("");
	a.title = ["lat,lon = ",l.latitude,",",l.longitude].join("");
	a.appendChild(document.createTextNode(locapo));
	return a;
}


GM_registerMenuCommand("locapoint link", function(){
	var url = prompt("map service URL", mapURL);
	var prm = prompt([
		"parameters",
		"latitude : %lat%",
		"longitude: %lon%"
	].join("\n"), param);
	url = (url)? url : mapURL;
	prm = (prm)? prm : param;
	GM_setValue("url",   url);
	GM_setValue("param", prm);
	location.reload();
});


//Deocde
function LocaPoint2LatLon(locapoint){
	var location = {
		latitude: (
			 (locapoint.charCodeAt(0) - 65) * 1757600
			+(locapoint.charCodeAt(1) - 65) * 67600
			+(locapoint.charCodeAt(2) - 48) * 6760
			+(locapoint.charCodeAt(8) - 65) * 260
			+(locapoint.charCodeAt(9) - 65) * 10
			+(locapoint.charCodeAt(10)- 48) * 1
		) * 180 / 45697600 - 90,
		longitude: (
			 (locapoint.charCodeAt(4) - 65) * 1757600
			+(locapoint.charCodeAt(5) - 65) * 67600
			+(locapoint.charCodeAt(6) - 48) * 6760
			+(locapoint.charCodeAt(12)- 65) * 260
			+(locapoint.charCodeAt(13)- 65) * 10
			+(locapoint.charCodeAt(14)- 48) * 1
		) * 360 / 45697600 - 180
	};
	return(location);
}

//Encode
function LatLon2LocaPoint(location){
	var latitude_step  = (location.latitude  +  90) / 180 * 45697600;
	var longitude_step = (location.longitude + 180) / 360 * 45697600;
	var locapoint = String.fontCharCode(
		latitude_step/1757600 % 26 + 65,
		latitude_step/  67600 % 26 + 65,
		latitude_step/   6760 % 10 + 48,
		46,
		longitude_step/1757600 % 26 + 65,
		longitude_step/  67600 % 26 + 65,
		longitude_step/   6760 % 10 + 48,
		46,
		latitude_step/260 % 26 + 65,
		latitude_step/ 10 % 26 + 65,
		latitude_step/  1 % 10 + 48,
		46,
		longitude_step/260 % 26 + 65,
		longitude_step/ 10 % 26 + 65,
		longitude_step/  1 % 10 + 48
	);
	return(locapoint);
}
