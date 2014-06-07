// ==UserScript==
// @name			DSsendTroupsFaster
// @author			Heinzel
// @description		Dieses Script ermoeglicht es, durch drücken und halten verschiedener Tasten auf der Karte, die auf dieser sich befindenden Links zu verändern
// @namespace		none
// @include		http://ae*/game.php*screen=map*
// ==/UserScript==


/* 	
Die ASCII-Werte finden sich hier zum nachlesen: 
http://de.selfhtml.org/cgi-bin/812/zeichenketten4.pl  
*/


function getKoordsByID(id)
{
  var ownKoords = document.getElementById("menu_row2").innerHTML.match(/[0-9]{1,3}\|[0-9]{1,3}/);
  var ownVID = location.href.match(/village=(\d+)/)[1];
  var hits = document.body.innerHTML.match(/map_popup\(.+?(\)")/g);
  
  for(var x = 0; x < hits.length; x++)
  {
	if(hits[x].match(id + ", " + ownVID))
	{
	  var koords = hits[x].match(/map_popup\(.+?\((\d+\|\d+)/)[1];
	  
	  return "&x=" + koords.split("|")[0] + "&y=" + koords.split("|")[1];
	}
  }
}

document.addEventListener('keypress', function(event)
{
  var key = event.which.toString();
  if(key.match(/120|121|118|97|115|103|102/))
  {
	var links = document.getElementById("mapOld").getElementsByTagName("a");
	var link = location.href.split("village=")[0];
	
	for(var x = 0; x < links.length; x++)
	{
	  if(links[x].href.match(/village=(\d+)&screen=info_village&id=(\d+)/))
	  {
		var _1 = RegExp.$1;
		var _2 = RegExp.$2;
		
		switch(event.which)
		{
		  case (120):	// x0
			links[x].href = link + "village=" + _1 + "&screen=place&mode=command&target=" + _2;
			break;
		  case (121):	// y
			links[x].href = link + "village=" + _1 + "&screen=market&mode=send&target=" + _2;
			break;
		  case (118):	// v
			links[x].href = link + "village=" + _2 + "&screen=overview&target=" + _1 + "&id=switch";
			break;
		  case (97):	// a
			links[x].href = link + "village=" + _2 + "&screen=place&mode=command&target=" + _1 + "id=switch";
			break;
		  case (115):	// s
			links[x].href = link + "village=" + _2 + "&screen=market&mode=send&target=" + _1 + "id=switch";
			break;
		  case (103):	// g
			links[x].href = "javascript: var ID1 = " + _1 + "; var ID2 = " + _2 + "; var link = '" + link + "'; popup_scroll(link.replace(/game(.+)/, 'groups$1mode=village&village_id=' + ID2 + '&id=' + ID1),300,400);";
			break;
		  case (102):	// f
			links[x].href = link + "village=" + _1 + "&screen=map" + getKoordsByID(_2) + "&target=" + _2;
			break;
		}
	  }
	}
  }
}, true);

document.addEventListener('keyup', function(event)
{
  var links = document.getElementById("mapOld").getElementsByTagName("a");
  var link = location.href.split("village=")[0];
  
  for(var x = 0; x < links.length; x++)
  {
	if(links[x].href.match(/village=(\d+).+?target=(\d+)/))
	{
	  var _1 = RegExp.$1;
	  var _2 = RegExp.$2;
	  
	  if(links[x].href.match(/id=switch/))
		links[x].href = link + "village=" + _2 + "&screen=info_village&id=" + _1;
	  else
		links[x].href = link + "village=" + _1 + "&screen=info_village&id=" + _2;
	}
	
	if(links[x].href.match(/ID1%20=%20(\d+).+?ID2%20=%20(\d+)/))
	  links[x].href = link + "village=" + RegExp.$1 + "&screen=info_village&id=" + RegExp.$2;
  }
}, true);

function addCaption()
{
  var tab = document.evaluate('//table[@class="main"]/tbody/tr/td/table/tbody/tr[@class="nowrap"]',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0).parentNode.parentNode;
  var newTab = tab.cloneNode(false);
  
  var newTr = document.createElement("tr");
  newTr.className = "nowrap";
  
  var newTd = document.createElement("td");
  newTd.className = "small";
  
  newTd.innerHTML = "\"x\": عند الضغط على زر (x) من القريه الموجود فيه حاليا يتم ارسل هجوم&nbsp;";
  newTr.appendChild(newTd.cloneNode(true));
  
  newTd.innerHTML = "\"y\": عند الضغط على (y) يتم ارسل موارد الى القريه التي يتم الضغط عليها&nbsp;";
  newTr.appendChild(newTd.cloneNode(true));
  
  newTab.appendChild(newTr.cloneNode(true));
  newTr.innerHTML = "";
  
  newTd.innerHTML = "\"a\": عند الضغط على (A) ارسل دعم ل قريه الموجد فيه حاليا &nbsp;";
  newTr.appendChild(newTd.cloneNode(true));
  
  newTd.innerHTML = "\"s\": عند الضغط على (s) يتم احضار موارد الى القريه الموجود فيها &nbsp;";
  newTr.appendChild(newTd.cloneNode(true));
  
  newTab.appendChild(newTr.cloneNode(true));
  newTr.innerHTML = "";
  
  newTd.innerHTML = "\"v\": عند الضغط على (v) النظرة العامة للقرية  &nbsp;";
  newTr.appendChild(newTd.cloneNode(true));
  
  newTd.innerHTML = "\"g\": تعديل المجموعه القريه &nbsp;";
  newTr.appendChild(newTd.cloneNode(true));
  
  newTab.appendChild(newTr.cloneNode(true));
  newTr.innerHTML = "";
  
  newTd.innerHTML = "\"f\": توسيط القريه في الخريطه &nbsp;";
  newTr.appendChild(newTd.cloneNode(true));
  
  
  newTd.innerHTML = "<a href=http://www.plapl.com/>بلابل</a> &nbsp;";
  newTr.appendChild(newTd);
  
  newTab.appendChild(newTr);
  tab.parentNode.insertBefore(newTab, tab.previousSibling);
  tab.parentNode.insertBefore(tab.previousSibling.cloneNode(false), newTab);
}

addCaption();