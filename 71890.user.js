// ==UserScript==
// @name           WoW Armory Itemlink to Wowhead
// @namespace      http://www.erik-gulliksen.com
// @description    Adds a link to wowhead from Armory item pages.
// @include        http://eu.wowarmory.com/item-info.xml*
// @include        http://www.wowarmory.com/item-info.xml*
// ==/UserScript==



function gup( name )
{
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return results[1];
}

var id = gup('i');

var pLink = document.createElement('p');
pLink.innerHTML = "<br><strong><a href=\"http://www.wowhead.com/?item="+id+"\">Item at Wowhead</a></strong>";


var divCollection = document.getElementsByTagName("div");
for (var i=0; i<divCollection.length; i++) {
	if(divCollection[i].getAttribute("class") == "as-bot") {
		divCollection[i].appendChild(pLink);
	} 
}