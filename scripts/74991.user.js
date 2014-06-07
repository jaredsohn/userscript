// ==UserScript==
// @name           quaste
// @namespace      http://quaste.services.openoffice.org
// @description    direct list of listbox items; remove header and footer stuff
// @include        http://quaste.services.openoffice.org/*
// ==/UserScript==

//alert('hello from Greasemonkey');
 function removeElement(ElementXpath)
{
var alltags = document.evaluate(ElementXpath,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (i=0; i<alltags.snapshotLength; i++)
{
element = alltags.snapshotItem(i);
element.parentNode.removeChild(element); // Remove this element from its parent.
}
} 

(function()
{
  try {
LangPath = "/html/body/table/tbody/tr[2]/td/table/tbody/tr/td/div/div/div/div[3]/form/select";
LangPath2 = "/html/body/table/tbody/tr[2]/td/table/tbody/tr/td/div/div/div/div[4]/form/select";
var myNodeList;
var myNodeList2;
myNodeList = document.evaluate(LangPath,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
myNodeList2 = document.evaluate(LangPath2,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

if (myNodeList.snapshotLength == 0) {
LangPath = "/html/body/div/table/tbody/tr/td/table/tbody/tr/td/div/div[2]/div/div[3]/form/select";
LangPath2 = "/html/body/div/table/tbody/tr/td/table/tbody/tr/td/div/div[2]/div/div[4]/form/select";
//LangPath = "/html/body/table/tbody/tr[3]/td/table/tbody/tr/td/div/div/div/div[3]/form/select";
//LangPath2 = "/html/body/table/tbody/tr[3]/td/table/tbody/tr/td/div/div/div/div[4]/form/select"
myNodeList = document.evaluate(LangPath,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
myNodeList2 = document.evaluate(LangPath2,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
removeElement('/html/body/table/tbody/tr[1]');
}

var monkeyNode;
for (var i = 0; i < myNodeList.snapshotLength; i++)
{
    monkeyNode = myNodeList.snapshotItem(i);
}
monkeyNode.size = 4;
for (var i = 0; i < myNodeList2.snapshotLength; i++)
{
    monkeyNode = myNodeList2.snapshotItem(i);
}
monkeyNode.size = 35;
   } catch (eErr) {
      alert ("Greasemonkey error: " + eErr);
   }
   return;
}) ();

 try
{
removeElement('//*[@id="body_wrapper_header"]');
removeElement('//*[@id="top_menu"]');
removeElement('/html/body/div/table/tbody/tr/td/div');
removeElement('/html/body/table/tbody/tr[1]');
removeElement('//*[@id="pathway"]');
//removeElement('/html/body/table/tbody/tr/td/table/tbody/tr/td/div/div/div/div');
}
catch (e)
{
alert("UserScript exception:\n" + e);
} 

