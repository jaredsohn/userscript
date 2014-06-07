// ==UserScript==
// @name           KB bevlista
// @description    Kertbirodalom bevásárlólista
// @version        1.0.2
// @author		   Amarok
// @namespace      http://s*.kertbirodalom.hu/
// @include        http://s*.kertbirodalom.hu/verkauf.php*
// ==/UserScript==


var WaitSmall = 150;
var WaitLoad = 300;
var delta = 5;

var piacURL = "/stadt/markt.php?order=p&filter=1&v=";
var TermekNevek = new Array("Áfonya","Alma","Búzavirág","Brokkoli","Cseresznye","Cukkíni",
						"Dió","Fokhagyma","Gerbera","Hagyma","Kávé","Karfiol","Körömvirág",
						"Körte","Krumpli","Levendula","Liliom","Málna","Napraforgó","Oliva",
						"Orchidea","Padlizsán","Paprika","Paradicsom","Rózsa","Retek","Ribizli",
						"Sáfrány","Sárgarépa","Sárgaszilva","Saláta","Spárga","Spenót","Szamóca",
						"Szeder","Szilva","Tök","Tulipán","Uborka","Vöröskáposzta");
						
var TermekKodok = new Array(34,4,52,33,1,16,19,35,58,9,64,32,49,21,22,59,51,10,48,55,
							53,7,15,5,50,14,11,54,6,17,2,20,36,3,8,13,18,60,12,61);


							
var thisTermek = -1;
var child = null;
var Lista = new Array();


Number.prototype.toStr = function() {
	return this.toString().replace(".", ",");
}


function convert(num) {
	return num.toFixed(2).toString().replace(".", ",");
}


function clearURL() {
	return (location.protocol + "//" + location.host);
}


function isLoaded(wnd, func) {

	if (wnd.document == null) {
		setTimeout(func, WaitSmall);	
		return false;
	}

	var body = wnd.document.getElementsByTagName("body");
	if (body.length == 0) {
		setTimeout(func, WaitSmall);	
		return false;
	}
	return true;
}

function getTerkerKod(tNev)	{

	for (var i=0; i<TermekNevek.length; i++)
		if (TermekNevek[i] == tNev) return TermekKodok[i];

}
	
	
function fillLista() {
	var db = 0;
	var pos =0;
	var ih = "";

	var divs = document.getElementsByTagName("div");
	
	for (var i=0; i<divs.length; i++)
		if ((divs[i].getAttribute("class") == "blau") || (divs[i].getAttribute("class") == "rot")) {
			ih = divs[i].innerHTML;
			
			if ((ih.indexOf("Bev")==-1) && (ih.indexOf("gyT")==-1)) {
				Lista[db] = new Array(6);
				pos = ih.indexOf("x");
				Lista[db][0] = ih.substring(ih.indexOf("x")+2,ih.length);
				Lista[db][1] = parseInt(ih.substring(0, pos));
				Lista[db][2] = 0;
				Lista[db][3] = 0;
				Lista[db][4] = getTerkerKod(Lista[db][0]);
				Lista[db][5] = i;
				db++;
			}
		}
		
}
	
function tovabb(htmlCode) {
	
	htmlCode = htmlCode.substring(htmlCode.indexOf("table"));
	var pos = htmlCode.indexOf("gyT");
	
	htmlCode = htmlCode.substring(htmlCode.lastIndexOf(">", pos)+1, pos-1).replace(",", ".");
	Lista[thisTermek][2] = parseFloat(htmlCode);
	Lista[thisTermek][3] = parseFloat(Lista[thisTermek][1] * Lista[thisTermek][2] * 0.9);
		
	getArak();	
}	


function getResult(inURL) {
	GM_xmlhttpRequest({
		method: 'GET',
		url: inURL ,
		overrideMimeType: 'text/html; charset=utf-8',
		onload: function(responseDetails) {
			tovabb(responseDetails.responseText);
		}
	});	
	
}

function writeSz(node, sz) {

	var strColor = "";

	if (sz > (100 + delta)) {
		strColor = "green";
	} else if (sz < (100 - delta)) {
		strColor = "red";	
	} else {
		strColor = "white";
	}

	var div = document.createElement("h2");
	div.innerHTML = convert(sz) + "%";	

	div.setAttribute("style", "color:" + strColor + "; position:absolute;top:280px;width:320px;text-align:center;");
	
	node.parentNode.parentNode.insertBefore(div, node.parentNode);
}



function writeOn() {
	var summ = 0;
	var divs = document.getElementsByTagName("div");
	var i = 0;
	var ih = "";

	for (i=0; i<Lista.length; i++) {
		divs[Lista[i][5]].innerHTML += " (" + convert(Lista[i][3]) + ")";
		summ += Lista[i][3];
	}




	for (i; i<divs.length; i++) {
		if (divs[i].getAttribute("class") == "blau") {
			ih = divs[i].innerHTML; 
			if (ih.indexOf("sszeg")!=-1) {
			
				divs[i].innerHTML = "Ö" + ih.substring(ih.indexOf(":"), ih.indexOf("gyT")-1)  + " (" + convert(summ) + ") gyT";

				var vSzumm = parseFloat(ih.substring(ih.indexOf(";")+1, ih.indexOf("gyT")-1).replace(",", "."));
				writeSz(divs[i], vSzumm/summ*100);
								
				break;
			}
		}
	}

		
		
}
	
	
function getArak() {
	
	if ((thisTermek+1)==Lista.length) {
		writeOn();
	} else {
		thisTermek++;
		getResult(clearURL() + piacURL + Lista[thisTermek][4]);
	}		

}	
	
	
		
function startScript() {

	if (!isLoaded(this, startScript)) return 0;

	fillLista();	
	getArak();
	
}
   

   

   
setTimeout(startScript, WaitSmall);