// ==UserScript==
// @name           GA Download limit remover
// @namespace      http://arjansnaterse.nl/seo-tools/google-analytics-download-limit
// @description    Expands the download export options and removes the download limit.
// @license GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @include        https://www.google.com/analytics/*
// ==/UserScript==

var limit = 50000;
var start = 0;

var downloadBox = document.getElementById("export_dropbox_data");
var downloadBoxDiv = getElementsByClassName(downloadBox, "div", "export_dropbox_listbox")[0];
var downloadBoxUl = downloadBoxDiv.getElementsByTagName("ul")[0];
var nrRows = getNrRows();

downloadBoxDiv.innerHTML = "";

while(nrRows-limit > 0) {
	if(start == limit)
		start += 1;
		
	newUl = copyDropBox(downloadBoxUl, start, false);
	downloadBoxDiv.innerHTML  = downloadBoxDiv.innerHTML + "<br>";
	downloadBoxDiv.appendChild(newUl);
	
	start += limit;
	nrRows -= limit;
}

newUl = copyDropBox(downloadBoxUl, start, true);
downloadBoxDiv.innerHTML  = downloadBoxDiv.innerHTML + "<br>";
downloadBoxDiv.appendChild(newUl);

var links = downloadBox.getElementsByTagName("a");
for(var i=0; i<links.length; i++) {
	links[i].href = links[i].href + "&limit=" + limit;
	links[i].setAttribute("onclick", "")
}


function getNrRows() {
	var rows = 0;
	var pagControls = getElementsByClassName(document, "div", "pagination_controls");
	var spans = getElementsByClassName(pagControls[0], "span", "button_label");
	var spanParts = spans[2].innerHTML.split(" ");
	var rows = spanParts[spanParts.length-2];
	var rows = rows.replace(/[\.,]/g, "");

	return (1*rows);
}

function copyDropBox(ul, start, lastOne) {
	var newUl = document.createElement("ul");
	var lis = ul.getElementsByTagName("li");

	for(var i=0; i<lis.length; i++) {
		var newLi = document.createElement("li");
		var a = lis[i].getElementsByTagName("a")[0];
		var newA = a.cloneNode(true);
		newA.href = a.href + "&tst=" + start;
		newLi.appendChild(newA);
		newUl.appendChild(newLi);
	}
	
	var newLi = document.createElement("li");
	var end = lastOne ? getNrRows() : (start + limit);
	newLi.innerHTML = "Results " + start + " - " + end;
	newUl.appendChild(newLi);
	
	return newUl;
}

function getElementsByClassName(oElm, strTagName, oClassNames){
	var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
	var arrReturnElements = new Array();
	var arrRegExpClassNames = new Array();
	if(typeof oClassNames == "object"){
		for(var i=0; i<oClassNames.length; i++){
			arrRegExpClassNames.push(new RegExp("(^|\\s)" + oClassNames[i].replace(/\-/g, "\\-") + "(\\s|$)"));
		}
	}
	else{
		arrRegExpClassNames.push(new RegExp("(^|\\s)" + oClassNames.replace(/\-/g, "\\-") + "(\\s|$)"));
	}
	var oElement;
	var bMatchesAll;
	for(var j=0; j<arrElements.length; j++){
		oElement = arrElements[j];
		bMatchesAll = true;
		for(var k=0; k<arrRegExpClassNames.length; k++){
			if(!arrRegExpClassNames[k].test(oElement.className)){
				bMatchesAll = false;
				break;
			}
		}
		if(bMatchesAll){
			arrReturnElements.push(oElement);
		}
	}
	return (arrReturnElements)
}