// ==UserScript==
// @name           			DSmarkStorage
// @description			Hebt spezielle Speicherstandbereiche durch Farbe hervor
// @namespace			none
// @author		     	 	Heinzel
// @include				http://de*.die-staemme.de/game.php?*mode=prod*
// @include				http://de*.die-staemme.de/game.php?*screen=overview_villages
// @include				http://de*.die-staemme.de/targets.php?*mode=own*
// @exclude				http://de*.die-staemme.de/game.php?*screen=train&mode=mass*
// @exclude				http://de*.die-staemme.de/game.php?*screen=snob*
// ==/UserScript==


var allImgs = document.getElementsByTagName("img");
var count = 0;
var res = new Array();
var color = new Array();

for(var x = 0; x < allImgs.length; x++)
{
  if(allImgs[x].src.search(/graphic\/holz\.png/) != -1)
  {
    /* Die Ressieleiste, die in jedem Dorf is, sollte nich mitgez�hlt werden */
    if(count < 1 && location.href.search(/targets\.php/) == -1)
	{
	  count++;
	  continue;
	}
	
	/* Ermittlung der Speichergr��e */
	if(location.href.search(/targets\.php/) == -1)
	{
	  var speicher = allImgs[x].parentNode.nextSibling.nextSibling.innerHTML;
	} else {
	  var speicher = allImgs[(x+3)].parentNode.innerHTML;
	  speicher = speicher.replace('<img src="graphic/res.png" alt="Speicher" title="Speicher"> ', '');
	  speicher = speicher.replace('<span class="grey">.</span>', '');
	}
	
	var splitted1 = allImgs[x].parentNode.innerHTML.split('alt="">');
	var splitted2 = splitted1[1].split(' <img');
	var splitted3 = splitted1[2].split(' <img');

	res[0] = splitted2[0].replace(/<span class="grey">\.<\/span>/, ''); /* Die Holzmenge */
	res[1] = splitted3[0].replace(/<span class="grey">\.<\/span>/, ''); /* Die Lehmmenge */
	res[2] = splitted1[3].replace(/<span class="grey">\.<\/span>/, ''); /* Die Eisenmenge */
	
	/* Ermittlung der Farbe des jeweiligen rohstoffes */
	for(var y = 0; y < 3; y++)
	{
	  if((res[y]/parseInt(speicher)) > 0.125)
	  {
		if((res[y]/parseInt(speicher)) < 0.825)
		{
		  color[y] = "black";
		} else {
		  color[y] = "blue";
		}
	  } else {
		color[y] = "green";
	  }
	}
	
	/* Die Farben einsetzen durch span-Tags */
	var element = allImgs[x].parentNode;
	var html = element.innerHTML;
	var split1 = html.split('alt="">');
	var split2 = split1[1].split('<img');
	var split3 = split1[2].split('<img');
	
	html =	'<img src="graphic/holz.png" title="Holz" alt="">' + 
			'<span style = "color: ' + color[0] + ';">' + 
			split2[0] + 
			'</span>' + 
			'<img src="graphic/lehm.png" title="Lehm" alt="">' + 
			'<span style = "color: ' + color[1] + ';">' + 
			split3[0] + 
			'</span>' + 
			'<img src="graphic/eisen.png" title="Eisen" alt="">' + 
			'<span style = "color: ' + color[2] + ';">' + 
			split1[3] + 
			'</span>';
	
	element.innerHTML = html;
  }
}