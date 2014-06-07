// ==UserScript==

// @name           anti - ikariamplus

// @namespace      test

// @include        http://*.ikariam.*/*

// @autor          Soleuu

// @email          sol-666@voila.Fr

// ==/UserScript==

//besoin de ikariam v.0.2.6 minimum

//fonctionne sur ikariam v.0.2.7
//mise à jour pour ikariam 0.3.1



//version number: Years.month.day

//@version 9.6.6

var version= "9.6.6";



/*suppression des + sur les superviseurs */

var values = new Array ("advCities","advMilitary","advResearch","advDiplomacy");

var d = null; 

var old = null;

var supervisor = "";

for (i =0 ; i< values.length; i++){

   supervisor = values[i];

   old=document.getElementById(supervisor).childNodes[2];

   d=document.getElementById(supervisor);

   d.removeChild(old);

}

//*/

/*suppression des boites vers ikariam+ dans chacun des superviseurs */

values = new Array ("viewCityImperium","viewMilitaryImperium","viewResearchImperium","viewDiplomacyImperium");

old=null;

for (i=0;i<values.length && old ==null; i++){//récupère le bloc

   old=document.getElementById(values[i]);

}

if (old != null){//supprime le bloc

   d = document.getElementById("container2");

   d.removeChild(old);

}





/*suppression de mercenariat*/

old=null;

old=document.getElementById("setPremiumTransports");	

if (old != null){//supprime le bloc

   d = old.parentNode;

   d.removeChild(old);

}



/*supprimer le marchand premium des batiments*/

var searchPremiumTrader = document.evaluate("//div[@class='premiumExchange']",

		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = searchPremiumTrader.snapshotLength - 1; i >= 0; i--) {

		var toDel = searchPremiumTrader.snapshotItem(i);

		toDel.parentNode.removeChild(toDel);

}





/*supprimer le marchand premium du marche* /

var searchPremiumTrader = document.evaluate("//div[@id='container2']//a[@href='?view=premiumTrader']",
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = searchPremiumTrader.snapshotLength - 1; i >= 0; i--) {

		var toDel = searchPremiumTrader.snapshotItem(i).parentNode.parentNode;

		toDel.parentNode.removeChild(toDel);

}

/*/
var searchPremiumTrader = document.evaluate(
		"//div[@id='container2']//div[@id='trader']",
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = searchPremiumTrader.snapshotLength - 1; i >= 0; i--) {

		var toDel = searchPremiumTrader.snapshotItem(i);

		toDel.parentNode.removeChild(toDel);

}

//*/


/*

// this one remove the plus



var ricercaPiu = document.evaluate("//div[@id='advisors']//a[@class='plusteaser']",

		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);



for (var i = ricercaPiu.snapshotLength - 1; i >= 0; i--) {

		var elm = ricercaPiu.snapshotItem(i);

		elm.parentNode.removeChild(elm);

}





// this one remove the link at top for plus functions

var ricercaLinkPlus = document.evaluate("//li[@class='premium']",

		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);



for (var i = ricercaLinkPlus.snapshotLength - 1; i >= 0; i--) {

		var elm = ricercaLinkPlus.snapshotItem(i);

		elm.parentNode.removeChild(elm);

}





//*/