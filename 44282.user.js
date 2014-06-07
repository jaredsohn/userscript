// ==UserScript==
// @name          beer-sheva dirot7 in ymap
// @namespace amirrima
// @version      0.1
// @description   in dirot7.co.il / dirot7.com adds ymap button next to every apartment so you can see the location
// @include  http://dirot7.co.il/*
// @include  http://dirot7.com/*
// ==/UserScript==

chart = [
['%u05D0',/א/g],
['%u05D1',/ב/g],
['%u05D2',/ג/g],
['%u05D3',/ד/g],
['%u05D4',/ה/g],
['%u05D5',/ו/g],
['%u05D6',/ז/g],
['%u05D7',/ח/g],
['%u05D8',/ט/g],
['%u05D9',/י/g],
['%u05DA',/ך/g],
['%u05DB',/כ/g],
['%u05DC',/ל/g],
['%u05DD',/ם/g],
['%u05DE',/מ/g],
['%u05DF',/ן/g],
['%u05E0',/נ/g],
['%u05E1',/ס/g],
['%u05E2',/ע/g],
['%u05E3',/ף/g],
['%u05E4',/פ/g],
['%u05E5',/ץ/g],
['%u05E6',/צ/g],
['%u05E7',/ק/g],
['%u05E8',/ר/g],
['%u05E9',/ש/g],
['%u05EA',/ת/g],
['%20',/ /g]
]

function hebcode(str){
	if (typeof(str)!="string") {return str};
	for (ii=0;ii<chart.length;ii++){
	str = str.replace(chart[ii][1],chart[ii][0]);
	}
	return str;
}


a = document.getElementsByTagName("tr");
b= [];
for (i=0;i<a.length;i++){if (a[i].id.substr(0,3)=="Row"){b.push(a[i])}};
for (i=0;i<b.length;i++){

c = b[i].getElementsByTagName("span");
for (j=0;j<c.length;j++){
	if (c[j].id.match(/.+diraName$/)){
		t = document.createElement("tr");
		location = c[j].innerHTML
		pat = location.match(/(\D+)(\d+)?/);
		link = "http://ymap.co.il/Navigate.aspx?"
		link += "CityNmS="+hebcode("באר שבע");
		link += "&StreetNmS="+hebcode(pat[1]);
		link += "&HouseNbrS=" + hebcode(pat[2]);
		link = "<a href = "+link+">ymap</a>"
		t.innerHTML = link;
		b[i].appendChild(t);
	}
}
}
