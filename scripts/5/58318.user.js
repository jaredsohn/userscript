// ==UserScript==
// @name           Five College Catalog Enhancer
// @namespace      http://www.mtholyoke.edu/
// @description    Makes various improvements to Aleph, such as highlighting an author result.
// @include        http://fcaw.library.umass.edu*
// ==/UserScript==

// Updates:
//
// The latest version of this script is always available at 
// http://userscripts.org/scripts/show/58318


( function () {


	var heading = document.getElementsByTagName("h3");

	var searchTerm = null;
	
	// Check each note paragraph for date and page info.
	for(var i=0; i<heading.length; i++) {
		
		var text = heading[i].textContent;
		var m = null;
	
		text = text.replace(/\s+/ig, " ");
	
		//GM_log(text);
			
		// find the date
		m = text.match(/document\.write\(myString\);(.+)/i);
		if(m) {
			//month = m[1].toLowerCase();
			//day = m[2];
			searchTerm = m[1];
			
			searchTerm = searchTerm.replace(/^\s*/, "");
			searchTerm = searchTerm.replace(/\s*$/, "");
							
			GM_log("'" + searchTerm + "'");
			
			break;
		}
		
		
	}
		
		
	if(searchTerm) {
		//alert(searchTerm);
		var searchTest = searchTerm.toLowerCase();
		
		var cells = document.getElementsByTagName("td");
		
		for(var i=0; i<cells.length; i++) {
			// get lowercase cell contents
			var html = cells[i].innerHTML.toLowerCase();
			
			// replace accented characters
			html = html.replace(/á|à|â|ä|ã|å/ig, "a");
			html = html.replace(/ç/ig, "c");
			html = html.replace(/é|è|ê|ë/ig, "e");
			html = html.replace(/í|ì|î|ï/ig, "i");
			html = html.replace(/ó|ò|ô|ö|õ/ig, "o");
			html = html.replace(/ú|ù|û|ü/ig, "u");
			
			// replace non-breaking spaces
			html = html.replace(/\&nbsp\;/ig, " ");

			// find position of string test
			if(html.indexOf(searchTest) >= 0) {
				
				if(html.indexOf("searched for") > 0) { continue; }
				
				var sPos = html.indexOf(searchTest);
				var ePos = sPos + searchTest.length;
				GM_log(sPos + ', ' + ePos + ', ' + html);
				
				cells[i].innerHTML = 
					cells[i].innerHTML.substr(0, sPos) +
					'<span style="font-weight:bold; color:red">' +
					cells[i].innerHTML.substr(sPos, ePos - sPos) +
					'</span>' + 
					cells[i].innerHTML.substr(ePos);
				
			}
			// replace from position to length with contents plus bold red tag
		}
	}
	

})();