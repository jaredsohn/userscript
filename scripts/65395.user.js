// Torpia Forum Extra Pagination
// Frazer Davidson
// 2009-12-29 20:47

// version user.0.3.4 - greasemonkey
// Last Updated: 2009-12-31 15:44

// 0.3.4
// fixed bug where closed topics had my pagination 1 row early
// 0.3.3
// fixed noOfPages calculation
// 0.3.2
// fixed multi page numbering from 1,2,3,4...# to expected 1,2,3...#
// 0.3.1
// found out there are more than the .com servers - tweaked greasemonkey Meta Data to accomodate this.
// 0.3
// changed behaviour of thread link on multi page threads to point to last page - [../thread#/]to [../thread#/lastpage#/]
// 0.2.2
// added handling of large threads - over four pages (1,2,3...#) other wise (1,2,3,4) or less
// 0.2.1
// removed widget lines
// tweaked include to handle pages with index.php in it

// ==UserScript==
// @name          Torpia Forum Tweaks
// @version       0.3.4
// @namespace     http://userscripts.org/scripts/show/65395
// @description   For the browser MMO Torpia, adds pagination links to thread listing and to the bottom of thread in the ingame Brotherhood Forums.
// @include       http://*.torpia.*/*brotherhoodforum/viewtopic/*
// @include       http://*.torpia.*/*brotherhoodforum/overview*
// ==/UserScript==

//$(document).ready(function(){ //from widget
try {
	if ( window.location.href.indexOf('brotherhoodforum/viewtopic') != -1 ) {
		// Add Pagination to bottom of thread
				
		//get table, should be one so tables[0]
		var tables = document.getElementsByTagName ('table');
			
		//get number of rows
		var noOfRows = tables[0].rows.length;
			
		//last 3 == 'send',text box,'reply' so we want length -3?
		var newRowPos = 0;
			
		//get rows, first [0] is title, second [1] is pagination
		var rows= tables[0].rows
			
		//get last row to test if thread is closed
		var lastRow = rows[rows.length-1];
      
		//if the innerHTML contains closed info
		if(lastRow.innerHTML.indexOf('This topic is closed, you cannot reply to it.')) {
			//closed - last rows: 'closed','reply'
			newRowPos = noOfRows - 2;
		} else {
			//not closed - last rows: submit,textbox,'reply'
			newRowPos = noOfRows - 3;
		}
			
		//insert newRow at newRowPos
		newRow = tables[0].insertRow(newRowPos);

		//give the row an id
		newRow.id = 'newRowID';
			
		//copy pagination cell to newRow
		newRow.innerHTML = rows[1].innerHTML;
		 
	} else if ( window.location.href.indexOf('brotherhoodforum/overview') != -1 ) {
		//add pagination to thread list
		
		//get table
		var tables = document.getElementsByTagName ('table');
		
		//number of rows, [0] is title, [1] headings, [-1] is existing pagination
		var noOfRows = tables[0].rows.length;
		
		//get rows
		var rows = tables[0].rows;
		
		var noOfPosts = 0
		//loop through rows
		for (var i=2;i<=rows.length-2;i++) {
			//get cells
			cells = rows[i].getElementsByTagName ('td');
			//get no of posts
			noOfPosts = parseInt(cells[2].innerHTML);
			
			//if over 20, there for multi paged
			if(noOfPosts > 20){
				//add pagination

				//get link - one, so we need [0]
				var anchors = cells[0].getElementsByTagName('a');
				//pop it ina nice variable
				var threadLink = anchors[0].href;			
				//create links
				//If <=4 print all links else print 1-3 and last '(1,2,3...#)'
				//link for page 1 is already thread link
				paginateString = '(<a href="'+threadLink+'">1</a>,';
				//work out number of pages
				noOfPages = (Math.floor((noOfPosts-1)/20)+1);
				//loop through for rest
				if(noOfPages <=4){
					for(j=2;j<=noOfPages;j++){
						//add on link
						paginateString += '<a href="'+threadLink+'/'+j+'">'+j+'</a>';
						//and if not last, add comma, or add close bracket if it is last
						if (j != noOfPages){
							paginateString += ',';
						} else {
							paginateString += ')';
						}
					}
				} else {
					for (j=2;j<=3;j++){
											//add on link
						paginateString += '<a href="'+threadLink+'/'+j+'">'+j+'</a>';
						//and if not last, add comma, or add close bracket if it is last
						if (j != 3){
							paginateString += ',';
						} else {
							paginateString += '...';
						}
					}
					//add last link
					paginateString += '<a href="'+threadLink+'/'+noOfPages+'">'+noOfPages+'</a>)';
				}
				//add link text				
				cells[0].innerHTML +=paginateString;
				
				//change behaviour of threadLink to point to last page
				anchors[0].href +='/'+noOfPages;
			}

		}//end for row
			
			
				
	}
 
 } catch( exception ) {}
 
 
//}); //from widget