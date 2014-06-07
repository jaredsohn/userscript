// ==UserScript==
// @name           Menetrendek tab sorrend
// @namespace      menetrendek.hu
// @description    menetrendek.hu-n a tab sorrend kijavítása, küldés enter-rel, két reklám eltávolítása
// @include        http://www.menetrendek.hu/cgi-bin/menetrend/html.cgi
// ==/UserScript==


function log(line)
{
//console.log(line)
}


function getXPath( xpath, root)
{
return document.evaluate(
    xpath,
    root,
    null, 
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);
}


function deleteElement(element)
{
if (element) element.parentNode.removeChild(element);
}


function getFirstElementXPath(path)
{
var allElements =0;
allElements = getXPath('/html/body/table/tbody/tr/td[2]/div', document);
if (allElements.snapshotLength>0)
  return allElements.snapshotItem(0);
else
  return 0;
}



allElements = getXPath('//a[@tabindex="1"]', document);
if (allElements.snapshotLength>0) allElements.snapshotItem(0).focus();

//log("hello")
allElements = getXPath('/html/body/table/tbody/tr/td[2]/div[5]/center/table/tbody/tr/td/form/table/tbody/tr/td/input[@type="text"]', document);
if (allElements.snapshotLength>1)
{
allElements.snapshotItem(0).focus();
allElements.snapshotItem(0).tabIndex = 2;
allElements.snapshotItem(1).tabIndex = 3;
}

allElements = getXPath('/html/body/table/tbody/tr/td[2]/div[5]/center/table/tbody/tr/td/form/p[2]/input', 
document);
if (allElements.snapshotLength>0)
{
allElements.snapshotItem(0).tabIndex = 4;
// küldés Enter-rel:
// nagyon trükkös, át kell nevezni, mert különben a Firefeox beleteszi a POST-ba, h keres.x = 0, és akkor nem veszi elküldöttnek a menetrendek.hu
allElements.snapshotItem(0).setAttribute("name","keres2");
}

var form = document.forms[0];

var el = document.createElement("INPUT"); 
el.type="hidden"; 
el.name="keres.x"; 
el.value="5"; 
form.appendChild(el); 

el = document.createElement("INPUT"); 
el.type="hidden"; 
el.name="keres.y"; 
el.value="8"; 
form.appendChild(el);

deleteElement(getFirstElementXPath('/html/body/table/tbody/tr/td[2]/div'));


// elsó reklám törlése
if (getFirstElementXPath('/html/body/table/tbody/tr/td[2]/table/tbody/tr/td/a/img')) // kezdőoldalun vagyunk
{
  allElements = getXPath('/html/body/table/tbody/tr/td[2]/table', document);
  if (allElements.snapshotLength>0) deleteElement(allElements.snapshotItem(0));
}
else
{
  allElements = getXPath('/html/body/table/tbody/tr/td[2]/table/tbody/tr[2]', document);
  if (allElements.snapshotLength>0) deleteElement(allElements.snapshotItem(0));
}  
