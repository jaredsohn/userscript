// ==UserScript==
// @name           TwistedForums
// @version        0.3
// @namespace      http://Twistedforums.com
// @include        http://twistedforums.com/forums/index.php*
// ==/UserScript==
 
/* Author: Daniel Baucom 
 * License: GPL2
 * Version: 0.3
 */
var tfhack

function getMessages(item)
{ 
	tfhack=new XMLHttpRequest();
	if (tfhack==null)
	{
		alert ("Browser does not support HTTP Request");
		return;
	}
	var url="http://twistedforums.com/forums/private.php";
	tfhack.onreadystatechange=function() 
	{ 
		if (tfhack.readyState==4 || tfhack.readyState=="complete")
		{
			item.innerHTML=tfhack.responseText;
			var table;
			var thead = getElementsByStyleClass("tcat");
			var toggle = 0;
			for(var node=0; node<thead.length; node++){
				if (thead[node].innerHTML.match(/Private Messages in Folder/)){
					if (toggle>0){
						table=thead[node].parentNode.parentNode.parentNode;
						break;
					}else{
						toggle++;
			}	}	}
			var trs = table.getElementsByTagName("tr");
			item.innerHTML="";
			for (var ele=0; ele<trs.length; ele++){
				if(trs[ele].childNodes!=undefined){
					if(trs[ele].innerHTML.match(/src=\"images\/statusicon\/pm_new.gif\"/)){
						trs[ele].getElementsByTagName("td")[3].style.display="none";
						item.appendChild(trs[ele].cloneNode(true));
				}	}
			}
			item.parentNode.style.padding="0";
			item.parentNode.style.display="";
		}
	};
	tfhack.open("GET",url,true);
	tfhack.send(null);
}

function getElementsByStyleClass (className) {
  var all = document.all ? document.all :
    document.getElementsByTagName('*');
  var elements = new Array();
  for (var e = 0; e < all.length; e++)
    if (all[e].className == className)
      elements[elements.length] = all[e];
  return elements;
}

var element = getElementsByStyleClass("alt2")[0].childNodes[1];
if (element.innerHTML!=undefined && !element.innerHTML.match(/\: Unread 0/))
{
	var message = document.createElement("tbody");
	message.appendChild(document.createElement("tr"));
	message.childNodes[0].appendChild(document.createElement("td"));
	message.childNodes[0].childNodes[0].setAttribute("colspan",6);
	message.childNodes[0].childNodes[0].setAttribute("style","display:none");
	message.childNodes[0].childNodes[0].appendChild(document.createElement("table"));
	message.childNodes[0].childNodes[0].childNodes[0].setAttribute("width","100%");
	var maintable = getElementsByStyleClass("tborder")[2];
	var thead = maintable.getElementsByTagName("thead")[0];
	var title = thead.nextSibling.nextSibling.cloneNode(true);
	title.childNodes[1].childNodes[1].removeChild(title.childNodes[1].childNodes[1].childNodes[1]);
	var div = title.childNodes[1].childNodes[1].childNodes[2];
	div.innerHTML="New Messages";
	document.getElementsByTagName("table")[6].insertBefore(message, thead);
	document.getElementsByTagName("table")[6].insertBefore(title, message);
	getMessages(message.childNodes[0].childNodes[0].childNodes[0]);
}