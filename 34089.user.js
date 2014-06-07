// ==UserScript==
// @name           Wikipedia reference @ scopus
// @namespace      toolserver.org/~verisimilus/Bot/DOI_bot/
// @description    Adds a link to Scopus to allow exporting of Wikipedia-formatted references
// @include        http://www.scopus.com*
// ==/UserScript==

function stopit(){
	document.getElementById(this.getAttribute("linkedBox")).checked=true; 
	GM_setValue("autoAdd", true);
	document.getElementsByName("SearchResultsForm")[0].target="_blank";
	document.getElementsByName("outputButton")[0].click(1,1);
}

if (window.location.href.match(/results\.url\?/)){
	oI = document.getElementsByTagName("td");

	newSpan = Array();
	newA = Array();
	title=Array();
	year=Array();
	journal=Array();
	issue=Array();
	volume=Array();
	pages=Array();
	yearCell = Array();
	authors=Array();
	source=Array();
	var thisLink;
	for (i=0; i<oI.length; i++){
		if (oI[i].width=="49%") {
			title[i] = oI[i].childNodes[0].innerHTML;
			var auth = oI[i].nextSibling.nextSibling.childNodes;
			authors[i]="";
			for (j=0; j<auth.length; j++){
				if (auth[j].nodeType==1) authors[i] += auth[j].innerHTML + "; ";
			}
			yearCell[i] = oI[i].nextSibling.nextSibling.nextSibling.nextSibling;
			year[i]=yearCell[i].innerHTML;
			
			source[i] = yearCell[i].nextSibling.nextSibling.childNodes;
			journal[i]= source[i][1].innerHTML;
			volume[i]=/^[\d]+/.exec(source[i][2].nodeValue);
			issue[i]=/\((.+)\)/.exec(source[i][2].nodeValue);
			pages[i]=/pp\.\s(.*)/.exec(source[i][2].nodeValue);
			if (volume[i]) volume[i] = volume[i][0]; else volume[i]=false;
			if (issue[i]) issue[i] = issue[i][1]; else issue[i]=false;
			if (pages[i]) pages[i] = pages[i][1]; else pages[i]=false;
			
			newA[i] = document.createElement("a");
			newSpan[i] = document.createElement("span");
			newA[i].innerHTML = "[W]";
			newA[i].href="http://toolserver.org/~verisimilus/Scholar/Cite.php?"
						+ "year=" + escape(year[i])
						+ (issue[i]?"&issue=" + escape(issue[i]):"")
						+ (volume[i]?"&volume=" + escape(volume[i]):"")
						+ (pages[i]?"&pages=" + escape(pages[i]):"")
						+ "&author=" + escape(authors[i])
						+ "&journal=" + escape(journal[i])
						+ "&title=" + escape(title[i]);
			newSpan[i].appendChild(newA[i]);
			oI[i].insertBefore(newSpan[i], oI[i].childNodes[2]);
		}
		
	}
}