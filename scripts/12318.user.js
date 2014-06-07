// ==UserScript==
// @name	  OGame - Manen Spioneren + Puin Ruimen 
// @namespace	  OGame - Manen Spioneren + Puin Ruimen 
// @author 	  OgamerNL
// @description   OGameNL - Spy moons and Recycle without leaving Galaxyview
// @include	  http://*ogame*/game/index.php?page=galaxy*
// @exclude	   
// ==/UserScript==    


// Variables to be translated for other languages
	var sMoon="Moon";
	var sRecycle="Harvest";
	var sDebris="Debris Field:";
	var sSpy="Espionage";
// Variables to be translated for other languages


var galaxy = document.getElementsByName("galaxy")[0].value;
var system = document.getElementsByName("system")[0].value;
var galaxyfields = document.getElementsByTagName ('th');

for (var i = galaxyfields.length - 1; i >= 0; i--) {
	
	if(galaxyfields[i].innerHTML.search(sMoon)!=-1) {
		var moonfield=galaxyfields[i].innerHTML;
		if(moonfield.indexOf(sSpy)!=-1) {
		    	var pos=moonfield.substring(moonfield.indexOf('&planet=')+8,moonfield.indexOf('&planet=')+10);
			if(pos.indexOf('&')!=-1) {
				pos=pos.substring(0,1);
			}
			var sClickAction="doit(6, "+galaxy+", "+system+", "+pos+", 3, 4)";
			sReplacement = "<a style=\\'cursor:pointer\\' onclick=\\'" + sClickAction + "\\'>"+sSpy+"</a>";
			galaxyfields[i].innerHTML=galaxyfields[i].innerHTML.replace(sSpy,sReplacement);
		}
	}
	
	if(galaxyfields[i].innerHTML.search(sRecycle)!=-1) {
		var debrisfield=galaxyfields[i].innerHTML;
		var debrissize=galaxyfields[i-4].innerHTML;
		var debrispos=galaxyfields[i-3].innerHTML;
		var pos=debrispos.substring(debrispos.indexOf('&planet=')+8,debrispos.indexOf('&planet=')+10);
		if(pos.indexOf('&')!=-1) {
			pos=pos.substring(0,1);
		}
		
		var debrisMetal = debrissize.substring(debrissize.indexOf('title="'+sDebris)+sDebris.length+11,debrissize.indexOf(','));
		var debrisCrystal = debrissize.substring(debrissize.indexOf(',')+5,debrissize.indexOf('"></a>'));
		iRecyclers=Math.ceil((parseInt(debrisMetal)+parseInt(debrisCrystal))/20000);
		var sClickAction="doit(8, "+galaxy+", "+system+", "+pos+", 2, "+iRecyclers+")";
	 	sReplacement = "<a style=\\'cursor:pointer\\'  onclick=\\'" + sClickAction + "\\'>"+sRecycle+"</a>";
		galaxyfields[i].innerHTML=galaxyfields[i].innerHTML.replace(sRecycle,sReplacement);
	}
}
