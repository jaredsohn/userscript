// Teljes szelessegure veszi a www.bombagyar.hu oldalait	
// 
//
// ==UserScript==
// @name          bombagyar.hu full width
// @namespace     http://kovianyo.hu
// @description   Gives full width to bombagyar.hu
// @include       *bombagyar.hu/index.php?post=*
// @author        Kovianyo
// ==/UserScript==

function log(line)
{
/*
var curdate = new Date();
var times = curdate.toGMTString();

GM_log("\n" + times + ";  " + line);
*/
//console.log(line);
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
if (element)  element.parentNode.removeChild(element);
}


var allElements, thisElement;
allElements = getXPath("/html/body/center/table", document);

//log("sorok: " + allElements.snapshotLength);

for (var i = 0; i < allElements.snapshotLength; i++) 
{
  thisElement = allElements.snapshotItem(i);
  thisElement.setAttribute("width","100%");
}
                        
allElements = getXPath("/html/body/center/table[2]/tbody/tr/td[2]/table/tbody/tr[2]/td", document);
for (var i = 0; i < allElements.snapshotLength; i++) 
{
  thisElement = allElements.snapshotItem(i);
  thisElement.setAttribute("background","");
  thisElement.setAttribute("bgcolor","lightgrey");
}


allElements = getXPath("/html/body/center/table[2]/tbody/tr/td[2]/table/tbody/tr/td", document);
for (var i = 0; i < allElements.snapshotLength; i++) 
if (i==0)
{
  thisElement = allElements.snapshotItem(i);
  thisElement.setAttribute("background","");
}


allElements = getXPath("/html/body/center/table[2]/tbody/tr/td[2]/table/tbody/tr/td/img", document);
for (var i = 0; i < allElements.snapshotLength; i++) 
{
  thisElement = allElements.snapshotItem(i);
  deleteElement(thisElement);
}


allElements = getXPath("/html/body/center/table[2]/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr/td[3]/div", document);
for (var i = 0; i < allElements.snapshotLength; i++) 
{
  thisElement = allElements.snapshotItem(i);
  thisElement.setAttribute("style","overflow: hidden; width: 100%;");
}


allElements = getXPath("/html/body/center/table[2]/tbody/tr/td[2]/table/tbody/tr[(position()>=6) and (position()<=25) and ((position() mod 2)=1)]/td", document);
for (var i = 0; i < allElements.snapshotLength; i++) 
{
  thisElement = allElements.snapshotItem(i);
  thisElement.setAttribute("background","");
  thisElement.setAttribute("bgcolor","lightgrey");
}
