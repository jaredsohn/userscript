// ==UserScript==
// @name           QuickNews
// @namespace      PardusWatched
// @description    Gives a little button next to peoples names that sets the news box
// @include        *pardus.at/news.php*
// @include        *chat.pardus.at/chattext.php*
// @include        *forum.parus.at*
// ==/UserScript==


/*
var prefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);    
var news = prefs.getCharPref("personToGetNews");
*/
var news = GM_getValue("personToGetNews");


//news = "fred"
if (news && /news\.php$/.test(window.location.href))
{
	var inputs = document.getElementsByTagName("input");
	var namebox = inputs[0];
        namebox.value=news;

}

var anchors = document.getElementsByTagName("a");
var i = 0;
while( i<anchors.length)
{
  
  
   
  var mtch = anchors[i].href.match(/sendmsg\(\'([\w ]+)\'\)/);
  //alert(anchors[i].href);
  if(mtch)
  {
     //alert(mtch[1])
     var a = document.createElement("a");
     
     

     
     a.innerHTML = "N&nbsp;"
     anchors[i].parentNode.insertBefore(a, anchors[i]);
     a.addEventListener("click", function(e){ var thisMatch = this.nextSibling.href.match(/sendmsg\(\'([\w ]+)\'\)/); GM_setValue("personToGetNews", thisMatch[1] ); if (/news\.php$/.test(window.location.href)){   var inputs = document.getElementsByTagName("input");    var namebox = inputs[0];    namebox.value=this.nextSibling.innerHTML ;} } , false);
     
     i = i +1;
  }

   i = i+1;

} 
