// ==UserScript==
// @name           hyvesCleaner
// @namespace      http://scripts.highiq.nl/
// @description    Verwijdert smilies uit Hyves krabbels en verbergt BuddyPoke
// @include        http://hyves.nl/
// @include        http://*.hyves.nl/
// ==/UserScript==

function addEvent( obj, type, fn ) {
  if ( obj.attachEvent ) {
    obj["e" + type + fn] = fn;
    obj[type + fn] = function() { obj["e" + type + fn]( window.event ); return false;}
    obj.attachEvent( "on" + type, obj[type + fn] );
  } 
  else {
    obj.addEventListener( type, fn, false );
  }
}
// ==== functions ====
function parseAllImgTagInKrabbels(node)
{
	//node moet de parent node van de krabbels zijn
	//haal daar de plaatjes uit
	var imgElem = node.getElementsByTagName("img");
	//imgElem bevat alle img nodes, evalueer ze
	for (var i = 0; i < imgElem.length; i++) {
		suppressSmiley(imgElem[i]);
	}
}

function suppressSmiley(node)
/* smileys hebben een src die alvolgt is gevormd:
http://cache.hyves-static.net/images/smilies/default/naam_smiley_plaatje.gif
we willen dus die smileys waarin
http://*.hyves-static.net/images/smilies/* voorkomt onderdrukken
beste optie is wrsch om regular expression te gebruiken
we zijn nu gewoon ff lui
*/
{
var str = node.src;
var str_search = "hyves-static.net/images/smilies/"; //dit is vrij lomp
if (str.indexOf(str_search) > 0) {
	//replace node with original character combination,
	//which is stored in the alt attribute of the img element
	//GM_log('About to replace: ' + node.src);
	var newNode = document.createElement('div');
	newNode.innerHTML = node.alt;
	node.parentNode.replaceChild(newNode,node);
	//node.parentNode.appendChild(newNode);
	//node.parentNode.removeChild(node);
	}
}

//verwijder BuddyPoke
//element id voor BuddyPoke begint met 'gapmember'
//(bijv. gapmember_012345, nummer verschilt per Hyves gebruiker)
function deleteBuddyPoke() {
	//deletes any div that has gapmember in its id
	var divs = document.getElementsByTagName('div');
	var s = 'gapmember';
	for (var i = 0; i < divs.length; i++) {
		if (divs[i].id.indexOf(s) == 0) {
			divs[i].parentNode.removeChild(divs[i]);
		}
	}
}

// === main routine ===
addEvent( self, 'load', function(event) {

	//GM_log('load event handler added');
	//el is de div node waarin krabbels zitten
	var el = document.getElementById("pageDivId_show_reactions_1");
	//DOMNodeInserted wordt beperkt ondersteund in browsers, Mozilla hoort daarbij
	el.addEventListener('DOMNodeInserted', function(e) {
		parseAllImgTagInKrabbels(el);
		}, true);
	parseAllImgTagInKrabbels(el); //bij eerste keer laden
	deleteBuddyPoke();
});