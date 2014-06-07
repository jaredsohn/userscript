// ==UserScript==
// @name	Trooli_Ignore
// @namespace	Trooli
// @description	The script removes or hightlights users with content matching from the filter list
// @include	http://www.trooli.fi*
// @include	http://www.trooli*
// @include	http://trooli*
// ==/UserScript==

// Lista nimimerkeistä jotka haluat filtteroida pois
//lisaa hakasulkuihin aina vain c++
var c=0;
var filter_keywords= new Array()
	filter_keywords[c++]="Nimimerkki";

// Lista nimimerkeistä jotka haluat korostaa listauksessa	
//lisaa hakasulkuihin aina vain h++	
var h=0;	
var highlight_keywords= new Array()
	highlight_keywords[h++]="Laimea Silli";

	
//Tehosiivous poistaa myos kaikki muut vastaukset jos ketjun aloittaja on listallasi
//arvot "true" = paalla, "false" = vain listalla olevat poistetaan
var Tehosiivous = "true";

// Älä muuta mitään tästä eteenpäin ellet tiedä mitä teet!
// Don't edit below this line unless you know what you are doing!
var allElements, thisElement;
var ind=0;
var prev_ind=0;
var kaikki="false";
allElements = document.getElementsByTagName("span");
for (var i = 0; i < allElements.length; i++) {
	thisElement = allElements[i];
	if (ind == prev_ind)
		ind=0;	

	prev_ind = ind;			
	for (var n = 0; n < filter_keywords.length; n++) {				
		if(thisElement.innerHTML.indexOf(filter_keywords[n])!=-1)
		{
			thisElement.style.display = 'none';
		        ++ind;
		}	
	}
if (Tehosiivous == "true")
{
	if ((ind == prev_ind) && (thisElement.innerHTML.indexOf("•") == -1))
		kaikki = "false"; 
	else if ( (ind > 0) && (thisElement.innerHTML.indexOf("•") == -1) )
		kaikki = "true";

	
	if (kaikki == "true")
	{
		thisElement.style.display = 'none';
		++ind;
	}
}
}

// make highlights
allElements = document.getElementsByTagName("span");
for (var i = 0; i < allElements.length; i++) {
	thisElement = allElements[i];
	for (var n = 0; n < highlight_keywords.length; n++) {				
	       var childIndex = 0;			
		if(thisElement.childNodes[0].textContent.indexOf("•")!=-1)
		{ // this is child
			childIndex = 2;	
		}
		else
		{ // this is master
			childIndex = 1;
			
		}	
		if(thisElement.childNodes[childIndex].textContent.indexOf(highlight_keywords[n])!=-1)
		{
			thisElement.style.color = 'magenta';
                }	
	}
}
//END