// ==UserScript==
// @name           Wowhead Undermine Journal Link
// @namespace      Wowhead Undermine Journal Link
// @description    Adds a link in wowhead's item pages to open that item in the Undermine Journal
// @include        http://www.wowhead.com/?item=*
// @include        http://www.wowhead.com/item=*
// ==/UserScript==

function gup( name )
{
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return results[1];
}

var id = gup('item');
var server = GM_getValue("uj_server");

var hLink = document.createElement('p');
var aLink = document.createElement('p');
hLink.innerHTML = "<a href=\"http://theunderminejournal.com/item.php?realm=H-"+server+"&item="+id+"\" class=\"button-red\"><em><b><i>UJ</i></b><span>UJ-H</span></em></a>";
aLink.innerHTML = "<a href=\"http://theunderminejournal.com/item.php?realm=A-"+server+"&item="+id+"\" class=\"button-red\"><em><b><i>UJ</i></b><span>UJ-A</span></em></a>";

var divCollection = document.getElementsByTagName("div");
for (var i=0; i<divCollection.length; i++) {
	if(divCollection[i].getAttribute("class") == "text") {
		divCollection[i].insertBefore(hLink, divCollection[i].firstChild);
		divCollection[i].insertBefore(aLink, divCollection[i].firstChild);
		break;
	} 
}

//server options
function changeServer () {
	var server = prompt("What is the name of the server you use for Undermine Journal?", "");
	GM_setValue("uj_server", server);
	location.reload(true);
}

GM_registerMenuCommand("Server name", changeServer);