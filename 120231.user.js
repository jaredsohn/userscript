// ==UserScript== 
// @name           Bau-Mogul Ausschreibung
// @author         banane4fun
// @description    Bau-Mogul Ausschreibungsrechner
// @include     http://www.bau-mogul.de/default.aspx?dp=auftragmarkt
// ==/UserScript==

// Auschreibungen automatisch berechnen
if (window.location.search != "")
var reMat = 0;
var reGrMat = 0;
//  alert(window.location.search);
var spanMat = document.getElementById('_ctl46_lblMaterial');
var str=spanMat.innerHTML;
var Ergebnis = str.search(/<br>.+/);
if (Ergebnis >= 1){
	var mySplitResult = str.split("<br>");
	var reMatre=new Array();
	for(i = 0; i < mySplitResult.length; i++){

		var strAusgang=mySplitResult[i].substr(0,mySplitResult[i].indexOf(" "));
		if (strAusgang >= 1)
		{
			var strStart=mySplitResult[i].indexOf("(")+1;
			var strEnd=mySplitResult[i].indexOf(")");
			var strNumber=mySplitResult[i].substr(strStart,strEnd);
			var vzweiter=strNumber.replace(/\./gi,"");
			var strAusgabe=vzweiter.substr(0,vzweiter.indexOf(" "));
			reMatre[i]=eval(Number(strAusgang)*Number(strAusgabe));
		}
		else
		{	
			var strStart=mySplitResult[i].indexOf("(")+1;
			var strEnd=mySplitResult[i].indexOf(")");
			var strNumber=mySplitResult[i].substr(strStart,strEnd);
			var vzweiter=strNumber.replace(/\./gi,"");
			reMatre[i]=vzweiter.substr(0,vzweiter.indexOf(" "));
		}
	}
	for(z = 0; z < reMatre.length; z++){
		if (reMatre[z] != "0")
		{
			reMat += reMatre[z];
		}
	}
}
else
{
if (spanMat) {

		var strAusgang=str.substr(0,str.indexOf(" "));
		if (strAusgang != 1)
		{
			var strStart=str.indexOf("(")+1;
			var strEnd=str.indexOf(")");
			var strNumber=str.substr(strStart,strEnd);
			var vzweiter=strNumber.replace(/\./gi,"");
			var strAusgabe=vzweiter.substr(0,vzweiter.indexOf(" "));
			var reMat=eval(Number(strAusgang)*Number(strAusgabe));
		}
		else
		{	
			var strStart=str.indexOf("(")+1;
			var strEnd=str.indexOf(")");
			var strNumber=str.substr(strStart,strEnd);
			var vzweiter=strNumber.replace(/\./gi,"");
			var reMat=vzweiter.substr(0,vzweiter.indexOf(" "));
		}
}
}
var spanGruppen = document.getElementById('_ctl46_lblBaugruppe');
var strGR=spanGruppen.innerHTML;
//alert('strGR');
var ErgebnisGR = strGR.search(/<br>.+/);
if (ErgebnisGR >= 1){
	var mySplitResultGR = strGR.split("<br>");
	var reGRre=new Array();
	for(t = 0; t < mySplitResultGR.length; t++){

		var strAusgangGR=mySplitResultGR[t].substr(0,mySplitResultGR[t].indexOf("/"));
		if (strAusgangGR >= 1)
		{
		var strStartGR=mySplitResultGR[t].indexOf("(")+1;
			var strEndGR=mySplitResultGR[t].indexOf(")");
			var strNumberGR=mySplitResultGR[t].substr(strStartGR,strEndGR);
			var vzweiterGR=strNumberGR.replace(/\./gi,"");
			var strAusgabeGR=vzweiterGR.substr(0,vzweiterGR.indexOf("b"));
			reGRre[t]=eval(Number(strAusgangGR)*Number(strAusgabeGR));
		}
		else
		{	
			var strStartGR=mySplitResultGR[t].indexOf("(")+1;
			var strEndGR=mySplitResultGR[t].indexOf(")");
			var strNumberGR=mySplitResultGR[t].substr(strStartGR,strEndGR);
			var vzweiterGR=strNumberGR.replace(/\./gi,"");
			reGRre[t]=vzweiterGR.substr(0,vzweiterGR.indexOf("b"));
		}

	}
	for(f = 0; f < reGRre.length; f++){
		if (reGRre[f] != "0")
		{
			reGrMat += reGRre[f];
		}
	}
}
else
{
if (spanGruppen) {

		var strGr=spanGruppen.innerHTML;
		var strGrAusgang=strGr.substr(0,strGr.indexOf("/"));
		if (strGrAusgang != 1)
		{
			var strGrStart=strGr.indexOf("(")+1;
			var strGrEnd=strGr.indexOf(")");
			var strGrNumber=strGr.substr(strGrStart,strGrEnd);
			var vGrzweiter=strGrNumber.replace(/\./gi,"");
			var strGrAusgabe=vGrzweiter.substr(0,vGrzweiter.indexOf("b"));
			var reGrMat=eval(Number(strGrAusgang)*Number(strGrAusgabe));
		}
		else
		{	
			var strGrStart=strGr.indexOf("(")+1;
			var strGrEnd=strGr.indexOf(")");
			var strGrNumber=strGr.substr(strGrStart,strGrEnd);
			var vGrzweiter=strGrNumber.replace(/\./gi,"");
			var reGrMat=vGrzweiter.substr(0,vGrzweiter.indexOf("b"));
		}

}
}
var vorschlag=eval((Number(reGrMat)+Number(reMat))*1.5);
var vRunden=(Math.round(vorschlag/10)*10);
document.getElementById('_ctl46_txtAngebot').value=vRunden;