// ==UserScript==
// @name			Advanced Search Options on Digg's Search Forms
// @namespace		http://jake.kasprzak.ca
// @description		Replaces the search forms on Digg with search forms that include advanced search options.
// @version 		0.1.2
// @include		*digg.com/*
// @exclude		*digg.com/search*
// ==/UserScript==

(function(){

	//add style information to the node passed
	function addStyles(node) {
		
		var css = "margin-left: 3px; color: #5f6e7c; width: 220px; border: 0; border-left: 4px solid #fff; padding: 0px 0 0 0px;  background: #fff; height: 19px; font-size: 100%; text-align:left; position:relative;";
		
		//add bottom margin to text input element
		if (node.id == 'top-keywords') {
			
			css = css + "margin-bottom: 2px;";
		}
		
		node.setAttribute("style", css);
	
	}

	//given the header to which the new form is to be added and the search element previously found, add advanced search elements and functionality to the page
	function insertAfterHeader(header, topKeywords) {
		
		//create elements to be added to the page
		var areaSelect = document.createElement('select');
		addStyles(areaSelect);
		
		var typeSelect = document.createElement('select');
		addStyles(typeSelect);
		
		var sortSelect = document.createElement('select');
		addStyles(sortSelect);
		
		addStyles(topKeywords);
	
		//set search type options
		var all = new Option("Title, Description, and URL", "all", true, true);
		var both = new Option("Title and Description", "both");
		var title = new Option("Title Only", "title");
		var url = new Option("URL only", "url");
		
		typeSelect.name = "type";
		
		typeSelect.options[0] = all;
		typeSelect.options[1] = both;
		typeSelect.options[2] = title;
		typeSelect.options[3] = url;
		
		//set area search options
		var all = new Option("All Stories", "all", true, true);
		var promoted = new Option("Front Page Stories", "promoted");
		var dig = new Option("Upcoming Stories", "dig");
		
		areaSelect.name = "area";
		
		areaSelect.options[0] = all;
		areaSelect.options[1] = promoted;
		areaSelect.options[2] = dig;
		
		
		//set sorting options
		var score = new Option("Sort Best Match First", "score", true, true);
		var newStories = new Option("Sort Newest First", "new");
		var old = new Option("Sort Oldest First", "old");
		var most = new Option("Sort by Most Diggs", "most");
		
		sortSelect.name = "sort";
		
		sortSelect.options[0] = score;
		sortSelect.options[1] = newStories;
		sortSelect.options[2] = old;
		sortSelect.options[3] = most;
		
		
		//add hidden form field for determining whether to search everything on Digg, or just sections for videos, images, or podcasts
		var section = document.createElement('input');
		
		section.type = 'hidden';
		section.name = 'section';
		
		//by default, search all sections
		section.value = 'all';
		
		//check URL to see what kind of search is to be done
		//whether to search for videos image, or podcasts depends on whether one regular expression in a series of regular expressions match the URL
		var sectionValues = new Array("videos", "images", "podcasts");
		
		var diggURLRe = "digg\.com\/";
		
		for (i=0; i<sectionValues.length; i++) {
		
			var re = new RegExp(diggURLRe + sectionValues[i]); 
			
			if (re.test(document.location.href)) {
				section.value = sectionValues[i];
				break;
			}
		
		}
		
		//create the new form element and its child elements, and the <div> tag to which the new form is to be added, then set the styles and add these new elements to the page 
		newForm = document.createElement('form');
		newForm.action = "/search";
		newForm.method = "get";
		
		var newDiv = document.createElement('div');
		newDiv.id = "newDiv"; 
		
		newDiv.setAttribute("style", "background: #1B5790");
		
		var newSubmit = document.createElement('input');
		newSubmit.type = "image";		
		newSubmit.id = "new-submit";
		newSubmit.src = "/img/search.gif";
		newSubmit.alt = "Submit";
		newSubmit.name = "submit";
		
		//then simply add the elements to the page
		newForm.appendChild(section, newForm.nextSibling); 
		
		newForm.appendChild(typeSelect, newForm.nextSibling);
		newForm.appendChild(areaSelect, newForm.nextSibling);
		newForm.appendChild(sortSelect, newForm.nextSibling);
		newForm.appendChild(topKeywords, newForm.nextSibling);
		newForm.appendChild(newSubmit, newForm.nextSibling);
		
		newDiv.appendChild(newForm);
		
		header.parentNode.insertBefore(newDiv, header.nextSibling);
		
	}  //insertAfterHeader
	
	
	
	//only add advanced search functionality on pages on which searches can be done
	
	var topKeywords = document.getElementById('top-keywords');
	if (topKeywords) {
	
		topKeywords.parentNode.removeChild(topKeywords);
		
		//remove search-related page elements from their original locations
		var topSubmit = document.getElementById('top-submit');
		
		if (topSubmit) {
		
			topSubmit.parentNode.removeChild(topSubmit);
		}
		
		//find section to which advanced search options are to be added, then pass information to be added to function that adds these options
		
		var headerPrimary = document.getElementById('h-pri');
		var headerSecondary = document.getElementById('h-sec');
		
		if (headerSecondary) {
				
			//take out rounded corners in this section
			
			var newStyle = document.createElement('style');
	
			newStyle.type = 'text/css';
			newStyle.innerHTML = '#h-sec { background: #90b557} #h-sec div { background: #90b557}  .header-simple #h-sec ul {background: transparent; height:26px; padding-left:14px; padding-top:0; }';
			
			head = document.getElementsByTagName('head')[0];
			head.appendChild(newStyle);
					
			insertAfterHeader(headerSecondary, topKeywords);
				
		}
		if (!headerSecondary && headerPrimary) {		
			insertAfterHeader(headerPrimary, topKeywords);
		}
		
	}  //if
	
})();









