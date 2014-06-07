/*
	This is based on the Google results numbering script from;
	Adam Langley <agl@imperialviolet.org>
	A Firefox Greasemonkey script,

	Released under the GPL.
	Mark Langenhoven 2005/05/20

*/

/* Version history
0.3.0 2006/02/25 Placed search ratings area in a span tag to minimize
                 interference with other scripts
0.2.3 2005/10/28 DOM Layout changed again!
0.2.2 2005/10/27 Search site has been updated and previous scripts 
                 no longer worked.
                 Negative ratings "fades" don't work at the moment and 
                 search history is still borked as well.
                 Also fixed the missing ratings on PDF links
0.2.1 2005/05/26 "Fade" negative searches into the background
0.2   2005/05/26 Expand script to work on Searchhistory as well
0.1.1 2005/05/23 Refresh page after the rating has been clicked to
                 display the new value.
0.1   2005/05/20 Original version.
*/


// ==UserScript==
// @name 		Google Search Ratings
// @namespace 		http://www.langenhoven.com/
// @description 	Adds ratings to search results
// @include 		http://www.google.*/search*
// ==/UserScript==

(function() {

	//Check if we are on the results page or the search history 
	//page as the links are displayed differently
	rexp = /searchhistory/;
	locstr = window.location.href;

	if ( locstr.search(rexp) > 0 ) {
	  //We are on the search history page
	  var searchpage = true;

          var results = document.evaluate('//td[@valign="top"]', document, null, 
			XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	  

        } else {
	  //We are on the regular results page
	  var searchpage = false;
	
 	  // Search results are in p elements with a class of 'g'
	  // This uses XPath to find all such elements and returns a 
	  // snapshot. (A snapshot doesnt become invalid after changing
	  // the DOM)
		
	  var results = document.evaluate("//p[@class='g']", document, null, 
			XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

	}


	for (var i = 0; i < results.snapshotLength; ++i) {
		var result = results.snapshotItem(i);


		//We want to rate by domain, so chop the text down to the domain.
		//First get the plain url
		try {
			if (searchpage == true ) {
				//History page handling
				var urlname = '';
				try 
				{

                          if (result.firstChild.firstChild.nodeName.toUpperCase() == "A") {
					urlname = result.firstChild.firstChild.getAttribute("href");
				  } else {
					urlname = '';
				  }

				} catch (e) {
					urlname = '';
				}
	
				//Catch links pointing to tables
				if ( urlname == 'undefined' ) {
					urlname = '';
				}
				//Catch other links on the page
				rexp = /:///;
				if ( urlname.search(rexp)  < 0 ) {
					urlname = '';
				}


			} else {
			   //Regular search handling
                       if ( result.firstChild.nodeName.toUpperCase() == "A" ) {
                          var urlname = result.firstChild.getAttribute("href");
                       } else {
                       if ( result.firstChild.nextSibling.nodeName.toUpperCase() == "A" ) {
                        //Get past the silly PDF tags
                          var urlname = result.firstChild.nextSibling.getAttribute("href");
                       }
                       }
			}


		//If you want to rate by URL instead of domainname then simply
		//comment out the following section
		var domname = urlname;

		if ( urlname != '' ) {
			var domarr = urlname.split("/");
			//We grab section 0 which is the "http" part and section 2
			//because section 1 is just the second / and will be blank
			urlname = domarr[0] + "//" + domarr[2] + "/";
		}

		domname = urlname;

                 
		} catch (error) {
			//simply skip to the next entry
			domname = '';
			GM_log('gsearchrate Error: ' + error)
            }

		if (domname != '') {
               //Items are now placed in a table to try and prevent interference
               //with other scrips running on the search page 

  		   //Put a space between our rating modifiers and the actual link
		   var newspan = document.createTextNode("  ");
		   result.insertBefore(newspan, result.firstChild);

               var newcell = document.createElement("span");
               result.insertBefore(newcell, result.firstChild);


		//Take a look to see if this link has been rated before
		var rating = GM_getValue(domname, 0);
		if (rating > 0) {
                   //We found a positive rating so display it with the link
                   var colspan = document.createElement("span");
                   colspan.setAttribute("style", "color:green; font-weight: bold; font-size: small;");
                   colspan.appendChild(document.createTextNode('[' + rating + '] '));

                   //Highlight the Link
                   result.setAttribute("style", "background-color:Cornsilk !important;");
                   newcell.appendChild(colspan);

		} //positive rating

		if (rating < 0) {
                   //Negative rating - display with the link
                   //This is deliberately handled separately so that we could 
                   //possibly delete this domain later on if we felt like it
                   var colspan = document.createElement("span");
                   colspan.setAttribute("style", "color:red; font-weight: bold; font-size: small;");
                   colspan.appendChild(document.createTextNode('[' + rating + '] '));

                   //Fade the Link
                   result.setAttribute("style", "color:DarkGray !important;");
			 newcell.appendChild(colspan);
                   //result.insertBefore(colspan, result.firstChild);

                   //Possibly delete links completely after a certain threshold
                   //result.parentNode.removeChild(result);


		} //negative rating

		   // We put the positive rating box in a small-caps green span
		   var newspan = document.createElement("a");
                   newspan.setAttribute("href", domname + "#posrate");
	 	   newspan.setAttribute("name", "posrate");
		   newspan.setAttribute("style", "color:green; font-size: small; font-weight: bold; text-decoration: none");
		   newspan.appendChild(document.createTextNode('[+]'));
               newcell.appendChild(newspan);

		   // We put the negative rating box in a small-caps red span
		   var newspan = document.createElement("a");
                   newspan.setAttribute("href", domname + "#negrate");
		   newspan.setAttribute("name", "negrate");
		   newspan.setAttribute("style", "color:red; font-size: small; font-weight: bold; text-decoration: none;");
		   newspan.appendChild(document.createTextNode('[-]'));
               newcell.appendChild(newspan);


		

		} //error checking
	} //loop through the results links


	results = null;


	//Add an event listener to trap the mouse clicks so that we can grab our
	//ratings if they come through
	document.addEventListener('click', function(event) {
		// event.target is the element that was clicked

		//Split the name on our divider to see if it is 
		//one of our special clicks. Hopefully I find a
		//better way to do this through the name value
		var click_val = '' + event.target;
		try {
		var click_arr = click_val.split("#");

		if (click_arr.length > 1) {
			//click_arr[0] will contain our domain to check for


			if (click_arr[click_arr.length - 1] == "posrate" ) {
				var rating_count = GM_getValue(click_arr[0], 0);

				//Increment the counter
				rating_count += 1;

				//Save the value
				GM_setValue(click_arr[0], rating_count);

				//Refresh the window so that the results are
				//immediately displayed
				window.location.reload(true);

				//Prevent the click from going through 
				event.stopPropagation();
				event.preventDefault();
		  	} //positive rating

			if (click_arr[click_arr.length - 1] == "negrate" ) {
				var rating_count = GM_getValue(click_arr[0], 0);

				//Decrement the counter
				rating_count -= 1;

				//Save the value
				GM_setValue(click_arr[0], rating_count);


				//Refresh the window so that the results are
				//immediately displayed
				window.location.reload(true);

				//Prevent the click from going through 
				event.stopPropagation();
				event.preventDefault();

		  	} //negative rating

  		} //found a rating link

		} catch (error) {
			//Shoot straight past on errors
		}

	}, true);


})();





