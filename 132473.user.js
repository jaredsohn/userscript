// ==UserScript==
// @name           JoggTimeSort
// @description    Sorterar träningspass på samma datum i fallande ordning, dvs nyaste överst
// @include        http://www.jogg.se/Traning/Tdbok.aspx?*
// @include        http://jogg.se/Traning/Tdbok.aspx?*
// @version        0.1
// ==/UserScript==

var r=document.getElementById('MainContent_tdFull_m_compactDiaryUpdatePanel').getElementsByTagName('TR');
var d=0;
var t=0;
for (i=0; r.length-1>i; i++) {
	if (r[i].id.indexOf('MainContent_tdFull_m_weekRepeater_m_dayRepeater')==-1) continue;
	a=r[i].getElementsByTagName('A');
	if (a.length==0) continue; // No training this day
	if (a[0].text==d) { // Move upwards
		r[i].parentNode.insertBefore(r[i],r[t]);
	} else {
		d=a[0].text;
		t=i;
	}
}