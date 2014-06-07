// ==UserScript==
// @name           HT-Highligts reorder - Invisible Supporter Tool
// @namespace      http://www.secretinternet.se/sites/greasemonkey/
// @description    Changes highlightview, sorting by time only
// @version        0.1.4
// @include        *.hattrick.org/Club/Matches/*
// ==/UserScript==
	
	// Function that sorts the events
	function sortHighlights(a,b){
		return a[1] - b[1];
	}

	// Creating the separator line element	
	function createSeparatorElement(){
		var url = 'Img.axd?res=Matches&amp;img=separator.gif';
		var lineSeparator = document.createElement('tr');
		var separatorTd = document.createElement('td');
		var separatorDiv = document.createElement('div');
		separatorTd.setAttribute('colspan', 3);
		separatorDiv.setAttribute('style', "height: 3px; background-image: url('Img.axd?res=Matches&img=separator.gif');background-repeat: repeat-x;");
		separatorTd.appendChild(separatorDiv);
		lineSeparator.appendChild(separatorTd);
		
		return lineSeparator;
	}
	
	// Selecting all sidebars
	var sidebar = document.querySelectorAll('.sidebarBox'),
		highlights = [],
		boxPattern = /H\u00F6jdpunkter/,
		timePattern = /class="right"/,
		sortPattern = /\d?\d(?=')/,
		changePattern = /style="vertical-align: middle/;
		
	// Selecting the sidebar containing the highlights
	for(var i = 0; i < sidebar.length; i++){
		if(sidebar[i].querySelector('.boxHead').innerHTML.match(boxPattern)){
			var box = sidebar[i].querySelector('.boxBody');
			break;
		}
	}
	
	// Saving all tr-elements ie all events
	var tr = box.querySelectorAll('tr');
	var k = 0;
	
	// Saving the event nodes in a sortable way
	for(var i = 0; i < tr.length; i++){
		if(tr[i].innerHTML.match(timePattern)){
			highlights[k] = [];
			highlights[k][0] = tr[i];
			highlights[k][1] = tr[i].innerHTML.match(sortPattern)[0];
			k++;
		}
	}
	
	// Sorting all the events
	var sorted = highlights.sort(sortHighlights);
		
	// Creating the new table body for the sorted events
	var newElement = document.createElement('tbody');
	
	// Appending the sorted elements to the table body, and inserting line separators in appropriate places
	for(var i = 0; i < sorted.length; i++){
		if(i != 0){
			if(sorted[i][0].innerHTML.match(changePattern) && !sorted[i-1][0].innerHTML.match(changePattern)){
				var newSeparator = createSeparatorElement();
				newElement.appendChild(newSeparator);
			}
			if(sorted[i-1][1] - 45 <= 0 && sorted[i][1] - 45 > 0){
				var newSeparator = createSeparatorElement();
				newElement.appendChild(newSeparator);
			}
		}
		newElement.appendChild(sorted[i][0]);
		if(sorted[i][0].innerHTML.match(changePattern)){
				var newSeparator = createSeparatorElement();
				newElement.appendChild(newSeparator);
		}
	}
	
	var replacedElement = box.querySelector('tbody');
	var parentElement = replacedElement.parentNode;
	parentElement.replaceChild(newElement, replacedElement);