// ==UserScript==
// @name           JSTOR PDFer
// @namespace      jstor.org/
// @description    Navigate JSTOR articles from every page.
// @include        *.jstor.org/view/*
// @exclude        *.pdf*
// ==/UserScript==

// Delete between the /// lines to stop "enter" taking you to the PDF.
////////////////////////////////////////////////////////////////////////
document.addEventListener("keypress",capturekey,true);

function capturekey(e){
	var key=(typeof event!='undefined')?window.event.keyCode:e.keyCode;
	if (key == 13) { window.location.href = newHref; }
}
////////////////////////////////////////////////////////////////////////

// Generate PDF link
idFromUrl = /view(.*\/)(\d)/;
var newHref;
var docId = idFromUrl.exec(window.location.href);
newHref = "http://www.jstor.org/cgi-bin/jstor/printpage" + docId[1] +docId[2] + ".pdf?dowhat=Acrobat"

navTitle = document.createElement("h4");
navTitle.setAttribute("class","relatedheading");
navTitle.innerHTML = "Quick navigation";

ul = document.createElement("ul");
ul.setAttribute("class","relatedlinks");

li = document.createElement("li");
csa = document.createTextNode(" (Shift-Alt-A)");

pdfLink = document.createElement("a");
pdfLink.title = "Go to PDF";
pdfLink.href = newHref;
pdfLink.accessKey="a";
pdfLink.innerHTML = "PDF version of article";
li.appendChild(pdfLink);
li.appendChild(csa);
ul.appendChild(li);

// Generate list of go-to-pages
pages = /of (\d+) pages/;

var pageB = document.getElementsByTagName("strong");
var noPages = pages.exec(pageB[0].innerHTML);
var pageLi = Array();
var pageLink = Array();
for (i = 0; i<noPages[1]; i++) {
	pageLi[i] = document.createElement("li")
	pageLink[i] = document.createElement("a")
	pageLink[i].href = "/view" + docId[1] + i;
	pageLink[i].innerHTML = "Page " + (i+1);
	if (i<9) pageLink[i].accessKey = (i+1);
	
	pageLi[i].appendChild(pageLink[i]);
	ul.appendChild(pageLi[i]);
}

//Add to CiteULike
citeULi = document.createElement("li");
citeULink = document.createElement("a");
citeULink.href = 'http://www.citeulike.org/posturl?bml=nopopup&url='+encodeURIComponent(location.href)+'&title='+encodeURIComponent(document.title);
citeULink.innerHTML = "Add to CiteULike";
citeULike = document.createTextNode(" (Shift-Alt-C)");

citeULi.appendChild(citeULink);
citeULi.appendChild(citeULike);
ul.appendChild(citeULi);

// Find the place in the table to put the link
	var arrElements = document.getElementsByTagName("h4");
	var arrReturnElements = new Array();
	var oCurrent;
	var oAttribute;
	for(var i=0; i<arrElements.length; i++){
		oCurrent = arrElements[i];
		oAttribute = oCurrent.innerHTML;
		if(typeof oAttribute == "string" && oAttribute.length > 0){
			if(oAttribute == "JSTOR"){
				oCurrent.parentNode.appendChild(navTitle);
				oCurrent.parentNode.appendChild(ul);
			}
		}
	}