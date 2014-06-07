// ==UserScript==
// @name			Preview GWO MVT combinations in new tab
// @author			Erik Vold
// @namespace		gwoPreviewInNewTab
// @include			https://www.google.com/analytics/siteopt/settings?*
// @include			https://www.google.com/analytics/siteopt/review?*
// @version			1.1
// @datecreated		2009-04-24
// @lastupdated		2009-07-06
// @description		This will add ability to preview MVT combination in a new tab to the GWO settings page so that you do not have to use the preview iFrame which is provided.
// ==/UserScript==


var gwoPreviewInNewTab = {};

gwoPreviewInNewTab.setup = function(){
	//try {
		var contentTD = gwoPreviewInNewTab.getContentTD();
		//alert(gwoPreviewInNewTab.contentTD);
		if (contentTD == "undefined") {
			return;
		}
		
		gwoPreviewInNewTab.testPage = gwoPreviewInNewTab.getTestpage(contentTD);
		//alert(gwoPreviewInNewTab.testPage);
		if (gwoPreviewInNewTab.testPage == "") {
			return;
		}
		
		gwoPreviewInNewTab.pageSectionAry = gwoPreviewInNewTab.getPageSectionsAry(contentTD);
		//alert(gwoPreviewInNewTab.pageSectionAry.length);
		if (gwoPreviewInNewTab.pageSectionAry.length <= 0) {
			return;
		}
		
		gwoPreviewInNewTab.experimentID = gwoPreviewInNewTab.getExperimentID();
		//alert(gwoPreviewInNewTab.experimentID);
		if (gwoPreviewInNewTab.experimentID == "") {
			return;
		}
	/*
	}
	catch(e){
		// do nothing
		return;
	}
	*/

	gwoPreviewInNewTab.addPreviewLinks(contentTD,gwoPreviewInNewTab.pageSectionAry,gwoPreviewInNewTab.experimentID,gwoPreviewInNewTab.testPage);
}

gwoPreviewInNewTab.getContentTD = function(){
	var contentTD = "";
	//try {
		var h3s = document.getElementsByTagName("h3");
		var h3 = 0;
		for (var i = 0; i < h3s.length; i++) {
			if ((/experiment(&nbsp;|\s)*pages/i).exec(h3s[i].innerHTML)) {
				//alert(h3s[i].innerHTML);
				h3 = h3s[i];
				break;
			}
		}
		if (h3 == 0) {
			return "";
		}
		contentTD = h3.parentNode;
	/*
	}
	catch(e){}
	*/

	return contentTD;
}

gwoPreviewInNewTab.getTestpage = function(contentTD){
	var testPage = "";

	//alert(contentTD.childNodes[3].tagName);
	//alert(contentTD.childNodes[3].childNodes[1].tagName);
	//alert(contentTD.childNodes[3].childNodes[1].childNodes[1].tagName);
	//alert(contentTD.childNodes[3].childNodes[1].childNodes[1].childNodes[0].tagName);
	//alert(contentTD.childNodes[3].childNodes[1].childNodes[1].childNodes[0].childNodes[5].tagName);
	//alert(contentTD.childNodes[3].childNodes[1].childNodes[1].childNodes[0].childNodes[5].childNodes[1].tagName);

	//try {
		testPage = contentTD.childNodes[3].childNodes[1].childNodes[1].childNodes[0].childNodes[5].childNodes[1].innerHTML;
	/*
	}
	catch(e){}
	*/

	return testPage;
}

gwoPreviewInNewTab.getPageSectionsAry = function(contentTD){
	var sectionsUL = "";
	var sectionsAry = new Array();
	
	//try {
		//alert(contentTD.childNodes[7].childNodes[1].childNodes[1].childNodes[0].childNodes[3].childNodes[1].innerHTML);
		sectionsUL = contentTD.childNodes[7].childNodes[1].childNodes[1].childNodes[0].childNodes[3].childNodes[1];
		
		var j = 0;
		for (var i = 1; i < sectionsUL.childNodes.length; i = i + 2) {
			//alert(sectionsUL.childNodes[i].innerHTML);
			sectionsAry[j] = {};
			sectionsAry[j].title = sectionsUL.childNodes[i].childNodes[0].cloneNode(true);
			sectionsAry[j].sections = sectionsUL.childNodes[i].innerHTML.match(/<\/strong>[^\d]*(\d+)/i)[1];
			j++;
		}
	/*
	}
	catch(e){}
	*/

	return sectionsAry;
}

gwoPreviewInNewTab.getExperimentID = function(){
	var experimentID = "";
	//try {
		var links = document.getElementsByTagName("a");
		var link = 0;
		for (var i = 0; i < links.length; i++) {
			//alert(links[i].href);
			if ((/\?experiment/i).exec(links[i].href)) {
				link = links[i].href;
				break;
			}
		}
		//alert(link);
		if (link == 0) {
			return "";
		}
		experimentID = link.match(/experiment=([^\s&$]*)/i)[1];
		//alert(experimentID);
	/*
	}
	catch(e){}
	*/

	return experimentID;
}

gwoPreviewInNewTab.addPreviewLinks = function(contentTD,sectionsAry,experimentID,testPageURL){
	var newH3 = document.createElement('h3');
	newH3.innerHTML = "Preview In New Tab";
	

	var newPageSection = document.createElement('div');
	newPageSection.className="pagesection";

	var newTable = document.createElement('table');
	newTable.setAttribute("cellspacing", "0");
	newTable.setAttribute("cellpadding", "5");
	newTable.setAttribute("border", "0");

	var newTBody = document.createElement('tbody');
	var newTR, newTD, newSelect, newOption, newSubmit, newPreviewLink, newButon;

	if (true) {
		for (var i = 0; i < sectionsAry.length; i++) {
			newTR = document.createElement('tr');
			newTD = document.createElement('td');
			newSelect = document.createElement('select');
			newSelect.id="preview-section-"+i;
			newOption = "";

			for (var k = 0; k < sectionsAry[i].sections; k++) {
				newOption = document.createElement('option');
				newOption.value = k;
				if(k==0){
					newOption.innerHTML = k+": Original";
				}
				else{
					newOption.innerHTML = k+": Variation";
				}

				newSelect.appendChild(newOption);
			}

			sectionsAry[i].title.innerHTML+="&nbsp;";
			newTD.appendChild(sectionsAry[i].title);
			newTD.appendChild(newSelect);
			newTR.appendChild(newTD);
			newTBody.appendChild(newTR);
		}
		
			newTR = document.createElement('tr');
			newTD = document.createElement('td');

			if (false) {
				newPreviewLink = document.createElement("a");
				newPreviewLink.title = "Preview";
				newPreviewLink.innerHTML = "Preview";
				newPreviewLink.href = "javascript:void(0);";

				// add on click event
				newPreviewLink.addEventListener("click", gwoPreviewInNewTab.preview, false);
				newTD.appendChild(newPreviewLink);
			}
			else{
				newButon = document.createElement("input");
				newButon.type = "button";
				newButon.value = "Preview";
				newButon.name = "previewInNewTab";
				newButon.id = "previewInNewTabID";

				// add on click event
				newButon.addEventListener("click", gwoPreviewInNewTab.preview, false);
				newTD.appendChild(newButon);
			}

			newTR.appendChild(newTD);
			newTBody.appendChild(newTR);
	}

	newTable.appendChild(newTBody);
	newPageSection.appendChild(newTable);

	contentTD.insertBefore(newPageSection,contentTD.childNodes[4]);
	contentTD.insertBefore(newH3,newPageSection);
}

gwoPreviewInNewTab.preview = function(e){
	var choiceAry = new Array();
	if(gwoPreviewInNewTab.pageSectionAry.length<=0){
		return false;
	}

	for(var i=0;i<gwoPreviewInNewTab.pageSectionAry.length;i++){
		choiceAry[i] = document.getElementById("preview-section-"+i).selectedIndex;
	}

	GM_openInTab( gwoPreviewInNewTab.testPage + '#utmxid=' + gwoPreviewInNewTab.experimentID + ';utmxpreview=' + choiceAry.join("-") );

	return false;
}

gwoPreviewInNewTab.setup();