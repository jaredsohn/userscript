// ==UserScript==
// @name           WeBWorK Display Scores
// @namespace      nonw
// @include        *webwork.asu.edu*
// @description	   Displays the scores for each ASU WeBWorK assignment in a separate column, so you can see your grades as well as which ones you have yet to complete from the main page.
// ==/UserScript==

function loadScores() {

	//Find main scores table.
	var gtable;
	var divs = iframe.contentDocument.getElementsByTagName("DIV");
	for(i=0; i<divs.length; i++) {
		if(divs[i].className=="Body") {
			for(j=0; j<divs[i].childNodes.length; j++) {
				if(divs[i].childNodes[j].tagName=="TABLE"){
					gtable = divs[i].childNodes[j]; 
					break;
				}
			}
			break;
		}
	}
	if(gtable==null){
	return;
	}

	// Store assignment names and calculated percentage scores.
	var sets = new Array(gtable.rows.length-1), scores = new Array(gtable.rows.length-1);
	for(i=0; i<gtable.rows.length-1; i++) {
		sets[i]=unescape(gtable.rows[i+1].cells[0].childNodes[0].innerHTML);
		scores[i]=Math.round(gtable.rows[i+1].cells[1].innerHTML/gtable.rows[i+1].cells[2].innerHTML*1000)/10+"%";
	}
	
	// Add new column header to the table
	var node = window.document.createElement( 'TH' );
	node.innerHTML = "<u>Current Score</u>";
	table.rows[0].appendChild(node);
	
	// Iterate through table, match assignment names to rows, and append the score cells
	for(i=0; i<table.rows.length-1; i++) {
		for(j=0; j<sets.length; j++) {
			if(table.rows[i+1].cells[1].childNodes[0].innerHTML==sets[j]) {
				node = window.document.createElement( 'TD' );
				node.innerHTML = scores[j];
				node.style.textAlign="center";
				table.rows[i+1].appendChild(node);
				break;
			}
		}
	}
	
	
}
	



//Ensure the you're on the main page;
if(document.getElementsByName("hardcopy").length!=1)return;

//Loop through HTML hierarchy and and locate the main assigment table, and store it to "table".
var divs = document.getElementsByTagName("DIV");
top:
for(i=0; i<divs.length; i++) {
	if(divs[i].className=="Body") {
		for(j=0; j<divs[i].childNodes.length; j++) {
			if(divs[i].childNodes[j].tagName=="FORM") {
				for(k=0; k<divs[i].childNodes[j].childNodes.length; k++){
					if(divs[i].childNodes[j].childNodes[k].tagName=="TABLE"){
						table = divs[i].childNodes[j].childNodes[k]; 
						break top;
					}
				}
			}
		}
	}
}
if(table==null){
	//alert("table is null");
	return;
}


//Create an iframe that loads the "Grades" page so we can access grade data, and set it to call loadScores() when the it finishes loading.
iframe = window.document.createElement( 'iframe' );
iframe.src = document.getElementById("Grades").href;
iframe.width = 0;
iframe.height = 0;
iframe.style.display = "none";
document.getElementsByTagName("BODY")[0].appendChild(iframe);
iframe.onload = loadScores;
//iframe.contentWindow.addEventListener('load', loadScores, true);