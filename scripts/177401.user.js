// ==UserScript==
// @name       Unten Ohne
// @namespace  Kaffeejunkie
// @version    0.2
// @description  entfernt den unteren teil von WOD und macht vollbild möglich
// @match      http://wodde.igg.com/main.php*
// @copyright  2012+, You
// ==/UserScript==

// Unteren Teil entfernen (wrapper)
var unten = document.getElementById('wrapper');
if (unten) {
    unten.parentNode.removeChild(unten);
}
    
// Oberen Teil entfernen (headerWrapper)    
//var oben = document.getElementById('headerWrapper');
//if (oben) {
//	oben.parentNode.removeChild(oben);
//}

// Swf maxGrÃ¶ÃŸe Funktion Ã¤ndern Funktion austauschen
// this is where we are going to build our new script
  var scriptCode = new Array();   
    
    // here's the build of the new script, one line at a time
	scriptCode.push('function getClientHeight(){');
	scriptCode.push('	var winHeight = $(window).height();');
	scriptCode.push('	var swfHeight = winHeight - $("#headerWrapper").height();');   
	scriptCode.push('	if (swfHeight < 600) {');
	scriptCode.push('		swfHeight = 600;');
	scriptCode.push('}	else if(swfHeight > 1080){');
	scriptCode.push('		swfHeight = 1080;');
	scriptCode.push('	}');
	scriptCode.push('	return swfHeight;');
	scriptCode.push('}');
                    
                      
    // now, we put the script in a new script element in the DOM
    var script = document.createElement('script');    // create the script element
    script.innerHTML = scriptCode.join('\n');         // add the script code to it
    scriptCode.length = 0;                            // recover the memory we used to build the script
    
    // this is sort of hard to read, because it's doing 2 things:
    // 1. finds the first <head> tag on the page
    // 2. adds the new script just before the </head> tag
    document.getElementsByTagName('head')[0].appendChild(script); 