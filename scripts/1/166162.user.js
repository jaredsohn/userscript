// ==UserScript==
// @name           Times Archives Linker
// @namespace      http://library.williams.edu/
// @description    Adds links from a NY Times Archives article to our ProQuest Subscription
// @include        http://*.nytimes.com/*
// ==/UserScript==

// Updates:
//
// The latest version of this script is always available at 
// http://userscripts.org/scripts/show/25781

/* -- Preferences -------------------------------------------------------------- */


( function () {

	//var linkFormat = 'http://proquest.umi.com/pqdweb?RQT=512&querySyntax=PQ&searchInterface=1&SrchMode=2&TS=1246303011&moreOptState=OPEN&clientId=3620&SQ=#PP#&FO=PAGE&OP1=AND&SQ1=#TT#&FO1=BITXT&DBId=6861&date=ON&onDate=#MM#%2F#DD#%2F#YY#'; 
	var linkFormat = 'http://search.proquest.com/hnpnewyorktimes/results/13D5B0BBEE425F58CD3/1/$5bqueryType$3dadvanced:hnpnewyorktimes$3b+sortType$3dDateDesc$3b+searchTerms$3d$5b$3cAND$7cti:#TT#$3e$5d$3b+searchParameters$3d$7bNAVIGATORS$3dpubtitlenav,decadenav$28filter$3d110$2f0$2f*,sort$3dname$2fascending$29,yearnav$28filter$3d1100$2f0$2f*,sort$3dname$2fascending$29,yearmonthnav$28filter$3d120$2f0$2f*,sort$3dname$2fascending$29,monthnav$28sort$3dname$2fascending$29,daynav$28sort$3dname$2fascending$29,+RS$3dOP,+chunkSize$3d20,+instance$3dprod.academic,+ftblock$3d102+1+194102+660848+670831+194001+670829+194000+660843+660840,+removeDuplicates$3dtrue$7d$3b+metaData$3d$7bUsageSearchMode$3dAdvanced,+dbselections$3d1007155,+fdbok$3dN,+siteLimiters$3dRecordType$7d$5d?accountid=15054';
	
	/*
		http://proquest.umi.com/pqdweb?RQT=512&querySyntax=PQ&searchInterface=1&SrchMode=2&TS=1246303011&moreOptState=OPEN&clientId=3620&SQ=33&FO=PAGE&OP1=AND&SQ1=policemen&FO1=BITXT&DBId=6861&date=ON&onDate=6%2F29%2F1969
		http://search.proquest.com/hnpnewyorktimes/results/13D5B0BBEE425F58CD3/1/$5bqueryType$3dadvanced:hnpnewyorktimes$3b+sortType$3dDateDesc$3b+searchTerms$3d$5b$3cAND$7cti:4+POLICEMEN+HURT+IN+$27VILLAGE$27+RAID$3e$5d$3b+searchParameters$3d$7bNAVIGATORS$3dpubtitlenav,decadenav$28filter$3d110$2f0$2f*,sort$3dname$2fascending$29,yearnav$28filter$3d1100$2f0$2f*,sort$3dname$2fascending$29,yearmonthnav$28filter$3d120$2f0$2f*,sort$3dname$2fascending$29,monthnav$28sort$3dname$2fascending$29,daynav$28sort$3dname$2fascending$29,+RS$3dOP,+chunkSize$3d20,+instance$3dprod.academic,+ftblock$3d102+1+194102+660848+670831+194001+670829+194000+660843+660840,+removeDuplicates$3dtrue$7d$3b+metaData$3d$7bUsageSearchMode$3dAdvanced,+dbselections$3d1007155,+fdbok$3dN,+siteLimiters$3dRecordType$7d$5d?accountid=15054

	*/
	
	//var notes = document.getElementsByClassName("note"); // not working on mac
	var notes = document.getElementsByTagName("p");
	var insertPlace = document.getElementsByClassName("abstractSummary");
	var insertPoint = insertPlace[0];
	//var insertPoint = document.getElementById("ArchivePromo");
	//var insertPoint = document.getElementById("optionsHeader");
	try
	{
		console.log(insertPoint);
		console.log(insertPoint.innerHTML);
	}
	catch ( e ) 
	{
	}
	var year = 0;
	var month = 0;
	var day = 0;
	var page = 0;
	
	// get the title of the article from the document header
	var title = document.title;
	console.log(title);
	title = title.replace(/\-.+$/, ""); // strip out subtitle
	title = title.replace(/ \- Free Preview.+$/, ""); // strip out extra info
	console.log(title);
	
	/*
	var months = new Array(12);
	months[0] = "january";
	months[1] = "febuary";
	months[2] = "march";
	months[3] = "april";
	months[4] = "may";
	months[5] = "june";
	months[6] = "july";
	months[7] = "august";
	months[8] = "september";
	months[9] = "october";
	months[10] = "november";
	months[11] = "december"; 
	*/
	
	if(insertPoint) 
	{
	
		/*	
		// Check each note paragraph for date and page info.
		for(var i=0; i<notes.length; i++) {
			
			var text = notes[i].textContent;
			var m = null;
			
			// find the date
			m = text.match(/^(\w+)\s(\d+), (\d{4})/);
			if(m) {
				month = m[1].toLowerCase();
				day = m[2];
				year = m[3];
				
				// translate month from text to numeral
				for (var j = 0; j < 12; j++) {
					if (month == months[j]) {
						month = j + 1;
						if(month < 10) month = '0' + month.toString();
						continue;
					}
				}
				
				continue;
			}
			
			// find the page number
			m = text.match(/page\s(\w+),/i);
			if(m) {
				page = m[1];
				continue;
			}
			
		}
		*/	
		// If we found all the parameters we need, format and insert the link
		try
		{
    		if(title) 
			{
    			console.log(title);
    
    			// translate title into url format
    			title = title.replace(/[^a-zA-Z0-9]+/g, " ").toLowerCase(); // strip out non-letters
    			title = title.replace(/\b\w{1,3}\b/g, " "); // remove short words
    			title = title.replace(/^\s*(.*)\s*$/, "$1"); // trim
    			title = title.replace(/\s+/g, "+"); // encode for url
    			console.log(title);
    			//alert(title);
    
    
    			var uri = linkFormat;
    			uri = uri.replace(/#TT#/, title);
    			console.log(uri);
    			//alert(uri);
		
			/*
			if(day && month && year && page) {
				console.log(year + '-' + month + '-' + day + ' p.' + page + ' ' + title);

				// translate title into url format
				title = title.replace(/[^a-zA-Z0-9]+/g, " ").toLowerCase(); // strip out non-letters
				title = title.replace(/\b\w{1,3}\b/g, " "); // remove short words
				title = title.replace(/^\s*(.*)\s*$/, "$1"); // trim
				title = title.replace(/\s+/g, "+"); // encode for url
				//alert(title);


				var uri = linkFormat;
				uri = uri.replace(/#PP#/, page);
				uri = uri.replace(/#YY#/, year);
				uri = uri.replace(/#MM#/, month);
				uri = uri.replace(/#DD#/, day);
				uri = uri.replace(/#TT#/, title);
				//alert(uri);
			*/	
			/*
			var libraryDiv = document.createElement('div');
			//libraryDiv.className = "abstractSummary";
			libraryDiv.innerHTML = '<p id="proquest" style="border:5px solid #ff9; ' +
				'border-top:none; display:block; font-size:12px; background-color:#ff9;">Find it in <a href="' + uri + 
				'" target="_blank">ProQuest Historical Newspapers</a> ' +
				'(Williams College Subscription)</p>';
			console.log(libraryDiv.innerHTML);	
			
			//document.body.appendChild(libraryDiv);
            document.insertBefore(libraryDiv, insertPoint);		
			*/
						
		      
			insertPoint.innerHTML += '<p id="proquest" style="border:5px solid #ff9; ' +
				'border-top:none; display:block; font-size:12px; background-color:#ff9;">Find it in <a href="' + uri + 
				'" target="_blank">ProQuest Historical Newspapers</a> ' +
				'(Williams College Subscription)</p>';
			
			}	
		}
		catch ( e )
		{
		} 	
		
		
		//alert(year + '-' + month + '-' + day + ' p.' + page + ' ' + title);
		
	}

})();