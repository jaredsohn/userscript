// ==UserScript==
// @name	AP-areena_Ignore
// @namespace	AP
// @description	The script removes users with content matching from the filter list
// @include	http://apareena.arvopaperi.fi*
// @include	http://apareena*
// @include	http://apareena.arvopaperi.fi/*
// ==/UserScript==

//lisaa hakasulkuihin aina vain c++
var c=0;
var filter_keywords= new Array()
	filter_keywords[c++]="-- testi";
	filter_keywords[c++]="-- testi2";
	filter_keywords[c++]="-- testi3";

//Tehosiivous poistaa myos kaikki muut vastaukset jos ketjun aloittaja on listallasi
//arvot "true" = paalla, "false" = vain listalla olevat poistetaan
var Tehosiivous = "true";
// Don't edit below this line unless you know what you are doing!
var allElements, thisElement;
var ind=0;
var prev_ind=0;
var kaikki="false";
allElements = document.getElementsByTagName("table");
for (var i = 0; i < allElements.length; i++) {
	thisElement = allElements[i];
	if (ind == prev_ind)
		ind=0;	

	prev_ind = ind;			
	for (var n = 0; n < filter_keywords.length; n++) {
	    if(i>2){					
			if(thisElement.innerHTML.indexOf(filter_keywords[n])!=-1)
			{
			    thisElement.style.display = 'none';
		            ++ind;
			}	
		   }
		}
if (Tehosiivous == "true")
{
	if ((ind == prev_ind) && (thisElement.innerHTML.indexOf("/gfx/tree/tree") == -1))
		kaikki = "false"; 
	else if ( (ind > 0) && (thisElement.innerHTML.indexOf("/gfx/tree/tree") == -1) )
		kaikki = "true";

	
	if (kaikki == "true")
	{
		thisElement.style.display = 'none';
		++ind;
	}
}
}
//END