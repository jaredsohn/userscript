// ==UserScript==
// @name          change rapidshare.de to 80.237.244.50
// @namespace     file:///D:/download/rapidshare/
// @description	  change rapidshare.de to 80.237.244.50.
// @include       http://80.237.244.50/*
// ==/UserScript==

//
// Originally written by Anthony Lieuallen of http://www.arantius.com/
// Licensed for unlimited modification and redistribution as long as
// this notice is kept intact.
//
// If possible, please contact me regarding new features, bugfixes
// or changes that I could integrate into the existing code instead of
// creating a different script.  Thank you
//

dump('===== Load ALT Tooltips =====\n');

(function () {
var res = document.evaluate("//form", document, null,	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
var i, el;
for (i=0; el=res.snapshotItem(i); i++) {
	el.action='http://80.237.244.50';
}


  sstr = "document.getElementById(\"dl\").innerHTML = unescape('";
  index = document.body.parentNode.innerHTML.indexOf(sstr);
  // realy - second page
  if (index != -1)
  {
   resstr = "";
   index += sstr.length;
   while(true)
   {
    chr = document.body.parentNode.innerHTML.substring(index, index + 1);
    if (chr == "'")
    {
     break;
    }
    resstr+=chr;
    index++;
   }
   resstr =  unescape(resstr)
   alert(resstr);
   //document.body.parentNode.innerHTML = "<p align='center'>" + resstr + "</p>";
   
/*
replacements = {
    "http://dl3.rapidshare.de/": "http://130.117.156.7/",
    "c = c - 1;": "c = -1;"
    };  

//var bodytext = document.body.textContent;


for (key in replacements) {
    bodytext = bodytext.replace(key, replacements[key]);
    //alert(key);
    alert(replacements[key]);
}
*/

//document.body.parentNode.innerHTML=bodytext;
})();