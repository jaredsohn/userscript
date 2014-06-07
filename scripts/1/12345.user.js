// version 0.7.1
// 2007/09/17

// ==UserScript==
// @name           OGame - Cargo calculator for resources
// @author	   Don't know. I'm not taking credit for this, I just translated it (Fox)
// @namespace      http://userscripts.org/scripts/show/12345
// @description    Calculates the amount of cargo's needed to move the resources to or from a planet. 
// @include        http://*ogame*/*
// ==/UserScript==

// Orriginal script can be found at: http://userscripts.org/scripts/show/8329
// This is the spanish version.

// constantes de contrucciones
const cMinaMetal 					= "Metal Mine";
const br									= "<br>";
const sp									= "&nbsp;";
const cRequiereMetal			=	"Metal: <b>";
const cRequiereCrystal		=	"Crystal: <b>";
const cRequiereDeuterium		=	"Deuterium: <b>";
const cRequiereCommander	= "<span class=\"noresources\">"
const cBarraB							= "</b>";
const cBarraSpan					= "</span>";

var strHTML;
var strTemp;
var bComandante;
var iReqM;
var iReqC;
var iReqD;
var iReqTotal;
var iDispM;
var iDispC;
var iDispD;
//var regexCom 	= '<a style="cursor: pointer" title="\-\b(\d{1,3}\.)?(\d{3,3}\.){0,2}\d{1,3}\b"><span class="noresources">';
var regexCom1	= /<span [^>]*>/g;
var regexCom2	= /<a [^>]*>/g;
var regexCom3	= /<\/span><\/a>/g;
var regexCom4	= /<font[^>]*>/g;


function LZ(x) {return(x<0||x>9?"":"0")+x};

function addDots(nStr){
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + '.' + '$2');
	}
	return x1 + x2;
}

function locate(xpath, xpres) {
	return document.evaluate(xpath, document, null, xpres, null);
}

function locateFirst(xpath) {
	// gracias SpitFire: http://userscripts.org/scripts/show/8555
	return locate(xpath, XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue;
}

function get_from_to(strLine, begin, end) {
	var strTemp;
	
	strTemp = strLine.substring(strLine.indexOf(begin) + begin.length, strLine.length);
	return strTemp.substring(0, strTemp.indexOf(end));
}

(function(){
	var table;
	// Modifica el ancho de la tabla principal
	for (i=0; i < document.getElementsByTagName("table").length; i++) {
		if (location.pathname.search("notizen") == -1 ) {
			table = document.getElementsByTagName("table").item(i);
			//if (table.width == 519) table.setAttribute("width","95%"); //table.width = 800;
			//if (table.width == 530) table.setAttribute("width","95%"); //table.width = 800;
		};
	};
	
	// recursos actuales	
	iDispM = -1;
	iDispC = -1;
	iDispD = -1;
	for(i=14; i<=16; i++) {
		strHTML = document.getElementsByTagName("td").item(i).innerHTML.replace(regexCom4, '');
		strHTML = strHTML.replace(/<\/font>/g, '');
		strHTML = parseInt(strHTML.replace(/[.]/g,''));
		
		if (!isNaN(strHTML)) {
			switch (i) {
    		case 14: 
    			iDispM = strHTML;
       		break
    		case 15:
       		iDispC = strHTML;
       		break
		    case 16:
		    	iDispD = strHTML;
       		break
			};
			//alert(strHTML);
		};
	};
	
	if (location.href.search("building") != -1 ) {
		for (i=0; i < document.getElementsByTagName("td").length; i++) {
			
			//alert(iDispM + '-' + iDispC + '-' + iDispD);
			if (document.getElementsByTagName("td").item(i).className == "l"){
				strHTML = document.getElementsByTagName("td").item(i).innerHTML;

				//alert(regexCom.test(strHTML) + br + strHTML);
				strHTML = strHTML.replace(regexCom1, '');
				strHTML = strHTML.replace(regexCom2, '<b>');
				strHTML = strHTML.replace(regexCom3, cBarraB);
				//if (i == 31) alert(strHTML);
				iReqM = parseInt(get_from_to(strHTML, cRequiereCommander, cBarraSpan).replace(/[.]/g,''));
				iReqM = parseInt(get_from_to(strHTML, cRequiereMetal, cBarraB).replace(/[.]/g,''));
				iReqC = parseInt(get_from_to(strHTML, cRequiereCrystal, cBarraB).replace(/[.]/g,''));
				iReqD = parseInt(get_from_to(strHTML, cRequiereDeuterium, cBarraB).replace(/[.]/g,''));
				
				iReqTotal = 0;
				strTemp = "";
				if (!(isNaN(iReqM))) {
					if (iReqM < iDispM) {
						strTemp = strTemp + "Metal: <b>0</b>" + sp;
					} else {
						iReqTotal += iReqM - iDispM;
						strTemp = strTemp + "Metal: <b>" + addDots(iReqM - iDispM) + "</b>" + sp;
					};
				};
				if (!(isNaN(iReqC))) {
					if (iReqC < iDispC) {
						strTemp = strTemp + "Crystal: <b>0</b>" + sp;
					} else {
						strTemp = strTemp + "Crystal: <b>" + addDots(iReqC - iDispC) + "</b>" + sp;
						iReqTotal += iReqC - iDispC;
					};
				};
				if (!(isNaN(iReqD))) {
					//alert(iReqD + "-" + iDispD);
					if (iReqD < iDispD) {
						strTemp = strTemp + "Deuterium: <b>0</b>" + sp;
					} else {
						strTemp = strTemp + "Deuterium: <b>" + addDots(iReqD - iDispD) + "</b>" + sp;
						iReqTotal += iReqD - iDispD;
					};
				};
				if (iReqTotal != 0) {
					strTemp = strTemp + br + 
						"Large Cargo's: <b>" + Math.ceil(iReqTotal / 25000) + "</b>"+ sp + sp + 
						"Small Cargo's: <b>" + Math.ceil(iReqTotal / 25000 * 5) + "</b>";
				}; 
				if (strTemp.length != 0) {
					strTemp = 
						document.getElementsByTagName("td").item(i).innerHTML + 
						br +
						"Still missing: " + strTemp;
					strTemp = strTemp.replace(/<br><br>/g, br);
					document.getElementsByTagName("td").item(i).innerHTML = strTemp;
				}
			}
		}
	} else if (location.href.search("flotten1") != -1) {
	
		var iDispT = iDispM + iDispC + iDispD;
		var infoRow = locateFirst('//div[@id="content"]/center/center/form/table[last()]').getElementsByTagName('tr');
		
		infoRow = infoRow[infoRow.length-1].firstChild;
		infoRow.innerHTML =
			"<a title='Total amount of Large Cargos needed to move all the resources'>" + 
			"Large Cargo's: " + Math.ceil(iDispT/25000) + '</a>' + '&nbsp;&nbsp;&nbsp;' + 
			"<a title='Total amount of Small Cargos needed to move all the resources'>" + 
			"Small cargo's: " + Math.ceil(iDispT/5000) + '</a>';
	};		
})();