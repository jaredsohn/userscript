// ==UserScript==
// @name           Aggregats-Filter
// @namespace      starborn
// @include        http://horitest.goetterheimat.de/game/main/main.php?cmd=trade*
// @include	http://horiversum.org/game/main/main.php?cmd=trade*
// @grant	none
// Version 0.2b
// ==/UserScript==

//Settings:(nur hier was verändern)

/**
 * Hier können Suchbegriffe für die besondere Heraushebung eingetragen werden
 * Auf rechtschreibung muss geachtet werden auf, Groß- und Klein-Schreibung nicht
 * zur Erläuterung: "+" ist ein "und" und "," ein "oder"
 * ACHTUNG DIE GÄNSFÜßE MÜSSEN STEHEN BLEIBEN
 * wenn ihr zB. Diggen des Überfluss Aggs besonders herausgehoben haben wollt:
 * "Diggen+Überfluss" (des aus informativer sicht weggelassen)
 * Achtet auf die Leerzeichen(werden mitgesucht), daher keine setzten
 * Wenn man verschiedene Begriffe sucht werden diese mit einen Komma verbunden:
 * "Suchgruppe1,Suchgruppe2", als Suchgruppe sind hier Undverbindungen gemeint
 * Beides Kombinierbar (Standartausdruck):
 * "Quipgrex+Konstruktor,Nux+Überfluss"
 **/
var SpecialAggSuche = "Diggren,Quipqrex+Genauigkeit";

/**
 * hier kann ein Fester farbwert eingetragen werden oder eine HTML coodierte Farbe
 * siehe: http://de.selfhtml.org/helferlein/farben.htm
 **/
var SpecialColor = "red";

/**
 * AM BESTEN FINGERWEG
 * nur verändern wenn man ahnung von regulären Ausdrücken hat!!!
 * wenn auf true -> Specialaggsuche wird gleich als Regulärer Ausdruck übernommen übernommen
 **/
var SpecialRegExp = false;

/**
 * Neueinfärbung der Symbole
 **/
var NewColorSymbol = false;

var SchnaeppchenColor = "green";
var TeuerColor = "black"
var Pfad = "http://horitest.goetterheimat.de/game/pix/skins/default/cnt/trade/trade_button_blind.gif";
var showPreise = true;

/**
 * Preis <= (Maximalpreis/schnaeppchenfaktor) -> damit es als Günstig geführt wird.
 */
var schnaeppchenfaktor = 5;

/**
 * Maximale Preise je Güte.
 */
var MaxPreis = new Array();
MaxPreis["0,1%"] = 5000;
MaxPreis["0,25%"] = 7000;
MaxPreis["0,5%"] = 80000;
MaxPreis["1%"] = 90000;
MaxPreis["2%"] = 100000;
MaxPreis["5%"] = 200000;

//Script (AB hier NICHTS VERÄNDERN)

function makeRegExp () {
  if (!SpecialRegExp && (SpecialAggSuche != false || SpecialAggSuche != "")){
    var gruppen = SpecialAggSuche.split(",");
    var result = "";
    for (var i = 0; i < gruppen.length; i++){
      if (i == 0) result += "(";
      else result += "|(";
      var kompo = gruppen[i].split("+");
      for (var j = 0; j < kompo.length; j++){
        if (j == 0) result +="("+kompo[j]+")";
        else result +="(.*)("+kompo[j]+")";
      }
      result += ")";
    }
    SpecialAggSuche = new RegExp(result, "i");
  }
}

console.log("ho");
var nodes = new Array();
var menue = null;
var Bereich = null;	
var div = document.evaluate('/html/body/div[5]/div[@class="BldContainer"]', document, null, XPathResult.ANY_TYPE, null );
var subdiv = div.iterateNext();
while (subdiv != null) {
	var gal = document.evaluate('div/div', subdiv, null, XPathResult.ANY_TYPE, null );
  var tr = gal.iterateNext(); 
  //Aggregatbereich
  if (tr != null) {
  	if(tr.innerHTML.match("Aggregatb") != null){
		  Bereich = "Aggs";
		  var aggs = document.evaluate('div[2]/table/tbody/tr', subdiv, null, XPathResult.ANY_TYPE, null );
		  var atr = aggs.iterateNext(); //Fist is the tableHead
		  atr = aggs.iterateNext();
		  while (atr != null) {
		    nodes.push(atr);
		    atr = aggs.iterateNext();
		  }
		  }
    if(tr.innerHTML.match("Fehler") != null){
    	Bereich = "Fehler";
    	div = document.evaluate('/html/body/div[5]/div[@class="BldContainer"][2]', document, null, XPathResult.ANY_TYPE, null );
    }
  }
  subdiv = div.iterateNext();
}

if (Bereich == "Aggs" && nodes != null) {
  makeRegExp();
  for (var j = 0; j < nodes.length; j++){
    if (nodes[j].childNodes.length >= 15){
      var color = null;
     
      var guete = nodes[j].childNodes[5].innerHTML;
      var aktPreis = nodes[j].childNodes[13].innerHTML.replace(/\'/g,"");
      if (showPreise && aktPreis > MaxPreis[guete]){
      	if (nodes[j].childNodes[15].firstChild.firstChild != null){
        	nodes[j].childNodes[15].firstChild.firstChild.setAttribute("src", Pfad);
        }
        color = TeuerColor;
      }
      if (showPreise && aktPreis <= Math.round(MaxPreis[guete]/schnaeppchenfaktor)){
        color = SchnaeppchenColor;
      }

      if ((SpecialAggSuche != false || SpecialAggSuche != "") && nodes[j].childNodes[3].innerHTML.match(SpecialAggSuche) != null){
        color = SpecialColor;
      }      
      if (nodes[j].childNodes[11].innerHTML != "UNKNOWN" && nodes[j].childNodes[11].innerHTML != "&nbsp;" && nodes[j].childNodes[11].innerHTML != false ){
        nodes[j].childNodes[15].innerHTML = "X";
        color = null;
      }
      if (color != null)
        for (var i = 3; i <= 15; i = i+2)
          nodes[j].childNodes[i].setAttribute("style", "background-color:"+color+";");
     }
  }
}
nodes = null;