// ==UserScript==
// @name           Ogame Eventlist Farben
// @include        http://*.ogame.de/game/index.php?*
// ==/UserScript==


function getElementsByClass (cName, domNode) {
	if (cName == undefined || cName.length == 0) return;
	if (domNode == undefined) domNode = document;
	if (domNode.getElementsByClassName)
		return domNode.getElementsByClassName(cName);
	// browser doesn't support getElementsByClassName
	cName = " " + cName + " "; // add spaces here so that we won't find class "a" in className == "abc"
	var elements = domNode.getElementsByTagName('*');
	var res = new Array();
	for (var i = 0; i < elements.length; i++) {
		var className = " " + elements[i].className + " ";
		if (className.indexOf(cName) > -1) {
			res.push(elements[i]);
		}
	}
	return res;
}


function colors(){
  var node = document.getElementById("eventboxContent");
  var fleets = getElementsByClass('eventFleet', node);
  for (var i = 0; i < fleets.length; i++){
    if (fleets[i].innerHTML.indexOf("Stationieren")>-1){ 
             fleets[i].style.color = "#aa9933";            // Stationieren farbe 
    }
    if (fleets[i].innerHTML.indexOf("Transport")>-1){ 
             fleets[i].style.color = "#057700";            // transport farbe 
    }
    if (fleets[i].innerHTML.indexOf("Halten")>-1){ 
             fleets[i].style.color = "#009999";            // Halten farbe 
    }
    if (fleets[i].innerHTML.indexOf("Abbau")>-1){ 
             fleets[i].style.color = "#0500F0";            // Abbau farbe
    }
    if (fleets[i].innerHTML.indexOf("Angreifen")>-1){ 
             fleets[i].style.color = "#FF0000";            // angriff farbe
    }
    if (fleets[i].innerHTML.indexOf("Verbandsangriff")>-1){ 
             fleets[i].style.color = "#800000";            // Verbandsangriff farbe
    }
    if (fleets[i].innerHTML.indexOf("Spionage")>-1){ 
           fleets[i].style.color = "#aa00aa";              // spionage farbe 
    }
    if (fleets[i].innerHTML.indexOf("Zerstören")>-1){ 
           fleets[i].style.backgroundColor = "#FF0000";    // Zerstören farbe 
    }
    if (fleets[i].innerHTML.indexOf("Expedition")>-1){ 
           fleets[i].style.color = "#FFFFFF";    // expo farbe 
    }
    if (fleets[i].innerHTML.indexOf("Kolonisieren")>-1){ 
           fleets[i].style.color = "#FFFFFF";    // Kolonisieren farbe 
    }
  }
}

if (document.getElementById("eventboxContent")){
  document.getElementById("eventboxContent").addEventListener("DOMNodeInserted", colors, false);
}