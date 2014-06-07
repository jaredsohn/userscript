// ==UserScript==
// @name		Last.fm - Get TOM [Spanish and With Graphics Version]
// @namespace	http://no.name.space/	
// @description	Display taste-o-meter ratings for user lists
// @include	http://www.lastfm.es/group/*/members*
// @include	http://www.lastfm.es/users*
// @include http://www.lastfm.es/user/*/neighbours*
// @include http://www.lastfm.es/user/*/friends*
// @include http://www.lastfm.es/music/*/+listeners*
// ==/UserScript==

//Spanish and With Graphics Version by LucasXIIHK

function xpath(query) {
	return document.evaluate(query, document, null, 

XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

// Ratings (commented colours are the defaults for last.fm for these ratings)
//
var tomColor = new Object();
tomColor.unknown 	=   "#DDD" ; // "#D01F3C"; //"#777777" ;
tomColor.verylow 	=   "#AAA" ; // "#a0a0a0"; //"#6974bb" ;
tomColor.low 		=   "#777" ; // "#777"; //"#55a7d5" ;
tomColor.medium 	=   "#04F" ; // "#869ab7"; //"#4bcad3" ;
tomColor.high 		=   "#80F" ; // "#4b72a9"; //"#85c95b" ;
tomColor.veryhigh 	=   "#F0D" ; // "#4e334f"; //"#e8a034" ;
tomColor.super 		=   "#F00" ; // "#D71378"; //"#f27164" ;

var tomCount = new Object();
tomCount.unknown 	= 0 ;
tomCount.verylow 	= 0 ;
tomCount.low 		= 0 ;
tomCount.medium 	= 0 ;
tomCount.high 		= 0 ;
tomCount.veryhigh 	= 0 ;
tomCount.super 		= 0 ;

(function () {
	var meLink = xpath("//a[@id='idBadgerUser']/SPAN");
	if (meLink.snapshotLength < 1) { return; }
	var whoAmI = meLink.snapshotItem(1).innerHTML;

	var neighbours = xpath("//DIV[@Class='vcard']/P[@Class='info']");
	var snoopMe = "";
	var snoopAge = 0;
	var items = new Array();
	var totalAge = 0;
	var totalF = 0;
	var totalM = 0;
	var allAge = 0;
	var MaxAge = 0; 
	MinAge = 200;

	for (var i = 0; i < neighbours.snapshotLength; i++) {
		snoopMe = neighbours.snapshotItem(i).innerHTML+"";
		if (snoopMe) {
			var snopMe = snoopMe+"";
			if (snopMe.match(/mujer/)) {totalF++;}
			if (snopMe.match(/hombre/)) {totalM++;}
			var thisAge = snopMe.match(/[^0-9]*([0-9]*)[^0-9]*/)[1]+"";
			if (thisAge) { totalAge = totalAge + parseInt(thisAge); allAge++; 
			if(parseInt(thisAge)>MaxAge){MaxAge=parseInt(thisAge);}
			if(parseInt(thisAge)<MinAge){MinAge=parseInt(thisAge);}}
		}
	}
	var aveAge = (totalAge/allAge);
	var doHere = xpath("//DIV[@Class='skyWrap']");
	var PercentF = (totalF * 100)/neighbours.snapshotLength;
	var PercentM = (totalM * 100)/neighbours.snapshotLength;
	var GraphF = "";
	var GraphM = "";
	for (var j = 0; j < PercentF.toFixed(0); j++){GraphF=GraphF+"-";}
	for (var j = 0; j < PercentM.toFixed(0); j++){GraphM=GraphM+"-";}
        GraphF="&nbsp;<b style='background-color:#FF0080;color:#FF0080;border-color:#FF0000;border:1;border-style:solid;'>"+GraphF+"</b>";
        GraphM="&nbsp;<b style='background-color:#0080FF;color:#0080FF;border-color:#0000FF;border-width:1;border-style:solid;'>"+GraphM+"</b>";
	var dispString = "<br><font size=-1 face='Tahoma,Verdana,Arial' bgcolor='#fffedd'onmousedown='return false;' oncontextmenu='alert(\"Versión en español de Script por LucasXIIHK\");return false;'><table border='0'><tr border='0'><td colspan='4'><h2>Resumen:</h2></td></tr><tr><td><img src='http://hitskin.com/themes/12/97/68/i_tabs_less.png'></td><td><b>Cantidad de Usuarios:&nbsp;</b></td><td colspan='2'>"+neighbours.snapshotLength+"</td></tr><tr><td><img src='http://hitskin.com/themes/12/97/68/i_right_arrow.png'></td><td><b>Edad Promedio: </b></td><td colspan='2'>"+aveAge.toFixed(0)+" años</td></tr><tr><td><img src='http://hitskin.com/themes/12/97/68/i_up_arrow.png'></td><td><b>Edad M&aacute;xima: </b></td><td colspan='2'>"+MaxAge+" años</td></tr><tr><td><img src='http://hitskin.com/themes/12/97/68/i_down_arrow.png'></td><td><b>Edad Minima: </b></td><td colspan='2'>"+MinAge+" años</td></tr><tr><td><img src='http://illiweb.com/fa/subsilver/icon_gender_female.gif'></td><td><b>Mujeres: </b></td><td>"+totalF+"("+PercentF.toFixed(2)+"%)</td><td>"+GraphF+"</td></tr><tr><td><img src='http://illiweb.com/fa/subsilver/icon_gender_male.gif'></td><td><b>Hombres:</b></td><td>"+totalM+"("+PercentM.toFixed(2)+"%)</td>"+GraphM+"<td></td></tr></table></font>";
	if (doHere.snapshotLength > 0) {
		doHere.snapshotItem(0).innerHTML = dispString + doHere.snapshotItem

(0).innerHTML;
	}})();