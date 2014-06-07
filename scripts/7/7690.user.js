// ==UserScript==
// @name OGame - Spy moons without leaving Galaxyview
// @namespace OGame Spy Moon
// @author OgamerNL
// @description OGame - Spy moons without leaving Galaxyview
// @include http://*/game/galaxy.php?session=*
// @exclude
// ==/UserScript==


element = document.evaluate('/html/body/center/form/table/tbody/tr[1]/td[1]/table/tbody/tr[2]/td[2]/input', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
galaxy = element.value;

element = document.evaluate('/html/body/center/form/table/tbody/tr[1]/td[2]/table/tbody/tr[2]/td[2]/input', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
system = element.value;

element = document.evaluate('/html/body/center/form/input', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
session = element.value;

mission=6;
planettype=3;
spiocount=3;

tablecolnumber=4;
tablerownumber=2;
while (tablerownumber != 17){
tablerownumber++;
oggetto = '/html/body/center/table/tbody/tr[';
oggetto += tablerownumber;
oggetto += ']/th['
oggetto += tablecolnumber;
oggetto += ']/a';
element = document.evaluate(oggetto, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
if (element) {
planet = tablerownumber - 2;
element.href = "javascript:doit(" + mission + ", " + galaxy + ", " + system + ", " + planet + ", " + planettype + ", " + spiocount + ");";
};
};