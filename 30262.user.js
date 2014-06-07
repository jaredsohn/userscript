// ==UserScript==
// @name           iwiw horoszkop
// @namespace      http://userscripts.org/scripts/show/30262
// @author         gab0r
// @description    iwiw-en kiírja a születési dátum mellé a horoszkópot
// @include        http*wiw.*/pages/user/userdata.jsp?*
// ==/UserScript==

var ho_full = "január,február,március,április,május,június,július,augusztus,szeptember,október,november,december".split(",");
var ho_rov = "jan,febr,márc,ápr,máj,jún,júl,aug,szept,okt,nov,dec".split(",");
var horoszkop_nev = "bak,vízönt&#337;,halak,kos,bika,ikrek,rák,oroszlán,sz&#369;z,mérleg,skorpió,nyilas,bak".split(",");
var horoszkop_nap = "20,20,20,20,20,21,22,23,23,23,22,21".split(",");
var szuldatum_eredeti, ps, n, idekellmenteni, szul_ev, szul_ho, szul_nap, horoszkop;

ps = document.body.getElementsByTagName('tr');
for(n=0; n<ps.length; n++) {
	if (ps[n].innerHTML.search(/Születésnap/) >= 0) {
		td = ps[n].getElementsByTagName('td');
		szuldatum_eredeti = td[0].innerHTML.replace(new RegExp("[\\s]+$", "g"), "").replace(new RegExp("^[\\s]+", "g"), "");
		idekellmenteni = td[0];
		break;
	}
}

szul_ev = szuldatum_eredeti.match(/(\d*)*(\.*\s*)*([a-záúó]*)*(\.*\s*)*(\d*)/)[1];
szul_ho = szuldatum_eredeti.match(/(\d*)*(\.*\s*)*([a-záúó]*)*(\.*\s*)*(\d*)/)[3];
szul_nap = szuldatum_eredeti.match(/(\d*)*(\.*\s*)*([a-záúó]*)*(\.*\s*)*(\d*)/)[5];
szul_nap = parseInt(szul_nap * 1);

for(n=0; n<12; n++) {
	if(szul_ho == ho_rov[n]) szul_ho = ho_full[n];
	if(szul_ho == ho_full[n] && szul_nap <= horoszkop_nap[n]) horoszkop = horoszkop_nev[n];
	if(szul_ho == ho_full[n] && szul_nap > horoszkop_nap[n]) horoszkop = horoszkop_nev[n+1];
	if(horoszkop) break;
}

if (szul_ev) {
	var szuldatum = szul_ev + '. ' + szul_ho + ' ' + szul_nap + '. (' + horoszkop + ')';
} else if (szul_ho) {
	var szuldatum = szul_ho + ' ' + szul_nap + '. (' + horoszkop + ')';
} else {
	var szuldatum = '[nem látható]';
}

idekellmenteni.innerHTML = szuldatum;