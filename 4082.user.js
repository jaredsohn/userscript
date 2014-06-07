// ==UserScript==
// @name           Touch N Go e-Statement Details
// @namespace      unhosted
// @description    Re-fining touch n go e-statement
// @include        http://e-services.touchngo.com.my/e-Statement/statementdetails.cfm*

// ==/UserScript==
acName = new Array();
reName = new Array();
acName = ["KMN","PCB","PCS","SWY","ABE","ABW","BGI","SBI","ABW","SGR","SEA","DMR","PTJ","PLK","DMS","SNW","BRY","KJ G","BT3","TPH","EBS","JLD","BKR","BRJ","KPB","IPS","SGP"];
reName = ["Kemuning[KESAS]","Puchong B.[LDP]","Puchong S.[LDP]","Sunway E.[KESAS]","Awan Besar  E.[KESAS]","Awan Besar W.[KESAS]","Bangi[PLUS]","Sg. Besi[PLUS]","Awan Besar W.[KESAS]","Sg.  Rasah[FEDERAL]","Seafield[ELITE]","Damansara[NKVE]","Putrajaya[ELITE]","Penchala  Link","Damansara[SPRINT]","Sunway[LDP]","Mines[BESRAYA]","Kajang[PLUS]","Batu3[FEDERAL]","Tapah[PLUS]","B atu3[ELITE]","Jalan Duta[PLUS]","Bukit Raja[NKVE]","Bukit Raja[OLD SHAPADU]","Kpb*[SHAPADU]","Ipoh  S.[PLUS]","Simpang Pulai[PLUS]"];

var allElements, thisElement;
allElements = document.getElementsByTagName('table');
for (var i = 0; i < allElements.length; i++) {
	thisElement = allElements[i];
	for (n = 0; n < acName.length; n++) {
		if (thisElement.innerHTML.indexOf(acName[n])) {
			thisElement.innerHTML = thisElement.innerHTML.replace(acName[n],reName[n]);
		}
	}
}
