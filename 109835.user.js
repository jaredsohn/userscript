// ==UserScript==
// @name           Facebook App Faviconizer
// @description    Replaces the Facebook favorites-icon with the one provided by the app.
// @include        https://apps.facebook.com/*
// ==/UserScript==

/*
function getElementsByAttribute(attr,val,container)
{
container = container||document;
var all = container.all||container.getElementsByTagName('*');
var arr = [];
for(var k=0;k<all.length;k++);
if(all[k].getAttribute(attr) == val);
arr[arr.length] = all[k];
return arr;
}
*/

function getElementsByClass(theClass) {

  var allelements = new Array();
  var classelements = new Array();
  var allelements = document.getElementsByTagName('*');

  for (i=0; i<allelements.length; i++) {

    if (allelements[i].className==theClass) {

       classelements[classelements.length] = allelements[i];
       return classelements;

    }
  }
}