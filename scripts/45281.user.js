// ==UserScript==
// @name                       	DSaddColors
// @description            	Hebt spezielle Speicherstandbereiche durch Farbe hervor
// @namespace            	none
// @author                      	Heinzel
// @include                	http://de*.die-staemme.de/game.php?*mode=prod*
// @include                	http://de*.die-staemme.de/game.php?*screen=overview_villages
// ==/UserScript==


/* 
Einige Infos:
1. Wer die Farben ändern will, der kann das gleich nach diesem Kommentar machen, aber Achtung: entweder auf Englisch oder ungebräuchliche Farben im hexa-dezimal-Code angeben!
2. Das Einfügen neuer Variablen bringt nix! Wer neue Abgrenzungen machen will, der muss das Script in den Zeilen 54 - 73 verändern (Achtung! Nur für Leute, die scripten können!)
*/
var color125 = "#00F500";
var color25  = "#23D200";
var color375 = "#46AF00";
var color50  = "#698C00";
var color625 = "#8C6900";
var color75  = "#AF4600";
var color875 = "#D22300";
var color100 = "#F50000";



var allImgs = document.getElementsByTagName("img");
var count = 0;
var res = new Array();
var color = new Array();
var quo;

for(var x = 0; x < allImgs.length; x++)
{
  if(allImgs[x].src.search(/graphic\/holz\.png/) != -1)
  {
    /* Die Ressieleiste, die in jedem Dorf is, sollte nich mitgezählt werden */
    if(count < 1)
    {
      count++;
      continue;
    }
    
    /* Ermittlung der Speichergröße */
    var speicher = allImgs[x].parentNode.nextSibling.nextSibling.innerHTML;
    
    var splitted1 = allImgs[x].parentNode.innerHTML.split('alt="">');
    var splitted2 = splitted1[1].split(' <img');
    var splitted3 = splitted1[2].split(' <img');

    res[0] = splitted2[0].replace(/<span class="grey">\.<\/span>/, ''); /* Die Holzmenge */
    res[1] = splitted3[0].replace(/<span class="grey">\.<\/span>/, ''); /* Die Lehmmenge */
    res[2] = splitted1[3].replace(/<span class="grey">\.<\/span>/, ''); /* Die Eisenmenge */
    
    /* Ermittlung der Farbe des jeweiligen rohstoffes */
    for(var y = 0; y < 3; y++)
    {
	  if(!isNaN(res[y]))
	  {
		quo = res[y]/speicher;
	  } else {
		continue;
	  }
	  
	  if(quo <= 0.125)
	  {
		color[y] = color125;
		continue;
	  }
	  
	  if(quo <= 0.25)
	  {
		color[y] = color25;
		continue;
	  }
	  
	  if(quo <= 0.375)
	  {
		color[y] = color375;
		continue;
	  }
	  
	  if(quo <= 0.5)
	  {
		color[y] = color50;
		continue;
	  }
	  
	  if(quo <= 0.625)
	  {
		color[y] = color625;
		continue;
	  }
	  
	  if(quo <= 0.75)
	  {
		color[y] = color75;
		continue;
	  }
	  
	  if(quo <= 0.875)
	  {
		color[y] = color50;
		continue;
	  }
	  
	  if(quo <= 1)
	  {
		color[y] = color50;
		continue;
	  }
	  
	  window.alert(quo);
	  return;
    }
    
    /* Die Farben einsetzen durch span-Tags */
    var element = allImgs[x].parentNode;
    var html = element.innerHTML;
    var split1 = html.split('alt="">');
    var split2 = split1[1].split('<img');
    var split3 = split1[2].split('<img');
    
    html =    '<img src="graphic/holz.png" title="Holz" alt="">' + 
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