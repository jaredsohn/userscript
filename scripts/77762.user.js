// ==UserScript==
// @name           Color Your Youtube
// @namespace      -
// @description    Colors Youtube videos depending on their ratings.
// @include        http://www.youtube.com/*
// ==/UserScript==
function d2h(d)             //converts Decimal Integers to Hexadecimal Integers
{
   return d.toString(16);
}
allIDs = new Array();
var allObjects, thisObject, modus;
allObjects = document.evaluate("//a[@class='video-list-item-link']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
if (allObjects.snapshotLength>0){
for (var i = 0; i < allObjects.snapshotLength;
i ++ )
{
   thisObject = allObjects.snapshotItem(i);
   try
   {
      var thisObject_Link = thisObject.getAttribute("href");
      var thisObject_Link_getID = /v=(...........)/;
      [, allIDs[i]] = thisObject_Link_getID.exec(thisObject_Link);
   }
   catch(e)
   {
      allIDs[i] = "";
   }
}
modus=1;}
// TEIL 2
// für andere Seiten, z.B. durchsuchen, suchen...
if(modus!=1){
modus=2;
var allObjects, thisObject;
allObjects = document.evaluate("//span[@class='video-view-count']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < allObjects.snapshotLength;
i ++ )
{
   thisObject = allObjects.snapshotItem(i);
   try
   {
      var thisObject_ID = thisObject.getAttribute("id");
      var thisObject_ID_getID = /video-num-views-(...........)/;
      [, allIDs[i]] = thisObject_ID_getID.exec(thisObject_ID);
   }
   catch(e)
   {
      allIDs[i] = "";
   }
}}
response = new Array();
likeCount = new Array();
dislikeCount = new Array();
ratingCount = new Array();
likeAmount = new Array();
xmlhttprequest = new Array();
isexisting = new Array();
var abfrage1 = /"totalItems":(\d+),/;
var abfrage2 = /"likeCount":"(\d+)","ratingCount":(\d+),/;
var j = 0;
loadPage();
function ColorIt(color)
{switch (modus)
 {
     case 1:allObjects.snapshotItem(j).parentNode.style.backgroundColor = color;
         break;
     case 2:allObjects.snapshotItem(j).parentNode.parentNode.parentNode.style.backgroundColor = color;
         break;
 }  
}
function loadPage()
{
   if (j < allObjects.snapshotLength)
   {
      if(allIDs[j])
      {
         xmlhttprequest[j] = new XMLHttpRequest();
         if(allIDs[j].charAt(0)=="-")xmlhttprequest[j].open('GET', 'http://gdata.youtube.com/feeds/api/videos?v=2&alt=jsonc&q="' + allIDs[j]+'"', true);
         else xmlhttprequest[j].open('GET', 'http://gdata.youtube.com/feeds/api/videos?v=2&alt=jsonc&q=' + allIDs[j], true);
         xmlhttprequest[j].send("");
         xmlhttprequest[j].onreadystatechange = stateHandler;
      }
   }
}
function stateHandler()
{
   if (xmlhttprequest[j].readyState == 4 && xmlhttprequest[j].status == 200)
   {
      response[j] = xmlhttprequest[j].responseText;
      [, isexisting[j]] = abfrage1.exec(response[j]);
      if(isexisting[j] >= 1)
      {
         try
         {
            [, likeCount[j], ratingCount[j]] = abfrage2.exec(response[j]);
            dislikeCount[j] = ratingCount[j] - likeCount[j];
            likeAmount[j] = likeCount[j] / ratingCount[j];
            if (likeAmount[j] > 0.5)
            ColorIt("#" + d2h(466 - Math.round(422 * likeAmount[j])) + "ff" + d2h(466 - Math.round(422 * likeAmount[j])));
            else
            ColorIt("#ff" + d2h(44 + Math.round(422 * likeAmount[j])) + d2h(44 + Math.round(422 * likeAmount[j])));
            j ++ ;
            loadPage();
         }
         catch(e)
         {
            j ++ ;
            loadPage();
         }

      }
      else
      {
         ColorIt('#c0c0c0');
         j ++ ;
         loadPage();
      }


   }
}