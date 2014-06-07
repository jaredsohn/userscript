// ==UserScript==
// @name           slå av "bästa filmerna denna vecka"
// @namespace      injection@swedvdr.org
// @include        *swedvdr.org*
// ==/UserScript==


// Kommentera de saker du vill ska vara kvar.
var hides=new Array();
hides[1]="//html/body/center/table/tbody/tr[2]/td/table/tbody/tr/td/table[2]/tbody/tr/td/h2"; //De bästa filmerna från arkivet denna veckan
//hides[2]="//html/body/center/table/tbody/tr[2]/td/table/tbody/tr/td/h2"; //  De bästa nya filmerna denna veckan
hides[3]="//html/body/center/table/tbody/tr[2]/td/table/tbody/tr/td/table[2]/tbody/tr/td/table"; //Arkiv-filmerna
//hides[4]="//html/body/center/table/tbody/tr[2]/td/table/tbody/tr/td/table";//Nytt-filmerna

for (x in hides){
	var remove = document.evaluate(hides[x], document, null, XPathResult.ANY_TYPE,null);
	var thisremove = remove.iterateNext();
	thisremove.style.display="none";
}