// ==UserScript==
// @name          NWAnime Subscription Addon
// @description   Expand Subscription functionality
// @version       1.2
// @namespace 	  http://www.nwanime.com/SunNoise
// @author        SunNoise
// @include       http://www.nwanime.com/mygroup.*
// @run-at        document-end
// ==/UserScript==

var counter = 0;
var images = document.getElementsByClassName("moduleEntryThumb");
var results = document.getElementsByClassName("resultstats");
var numberOf = document.getElementsByClassName("content_head");
var suscribers = new Array();
var clans = new Array();
var testSubs = numberOf[1].innerHTML.match(/-\d\d|-\d/);

if(testSubs != null)
{
  suscribers[1] = window.parseInt(numberOf[1].innerHTML.match(/-\d\d|-\d/)[0].replace("-", ""), 10);
  if (suscribers[1] == 0)
	  window.location.reload()//error loading site
  suscribers[2] = window.parseInt(numberOf[1].innerHTML.match(/\d\d-|\d-/)[0].replace("-", ""), 10);
  suscribers[0] = suscribers[1] - suscribers[2] + 1;
}
else
  suscribers[0] = 0;
var testClans = numberOf[0].innerHTML.match(/-\d\d|-\d/);
if(testClans != null)
{
  clans[1] = window.parseInt(numberOf[0].innerHTML.match(/-\d\d|-\d/)[0].replace("-", ""), 10);
  if (clans[1] == 0)
	  window.location.reload()//error loading site
  clans[2] = window.parseInt(numberOf[0].innerHTML.match(/\d\d-|\d-/)[0].replace("-", ""), 10);
  clans[0] = clans[1] - clans[2] + 1;
}
else
  clans[0] = 0;
for (var x in images)
{
  if (images[x].src.substr(-3) != "gif" && images[x].src.substr(0,33) != "http://www.nwanime.com/tmp/thumb/" && typeof images[x].src != "undefined")
  {
  var link = "http://www.nwanime.com/" + images[x].src.replace(/[^0-9]/g, "") + "/";
  var result = results[(suscribers[0] + clans[0] + counter)];
  var links = result.getElementsByTagName('a')[0];
  var click = document.createElement("a");
  var br = document.createElement("br");
  var span = document.createElement("span");
  click.href = link;
  click.innerHTML = links.innerHTML.replace("Unsubscribe to ","");
  result.replaceChild(click, links);
  counter++;
  }
}