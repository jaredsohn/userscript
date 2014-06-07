// ==UserScript==
// @name          NWAnime UnSubscription Addon
// @description   Expand UnSubscription functionality
// @version       1.0
// @namespace 	  http://www.nwanime.com/SunNoise
// @author        SunNoise
// @include       http://www.nwanime.com/*/
// @include       http://www.nwanime.com/category_detail.*
// @run-at        document-end
// ==/UserScript==

var desc = document.getElementsByClassName("category_desc");

if(desc != null)
{
  var br = document.createElement("br");
  var unsub = document.createElement("a");
  var anime = document.URL.replace(/%20/g,"").replace(/\D/g,"");
  unsub.href = "http://www.nwanime.com/mygroup.php?do=un&chid=" + anime;
  unsub.innerHTML = "Unsubscribe";
  desc[0].appendChild(br);
  desc[0].appendChild(unsub);
}