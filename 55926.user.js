// ==UserScript==
// @name           bcc-to-gdocs
// @namespace      http://userscripts.org/users/useridnumber
// @description    Jquery commands to get data from forms, ala datatel
// @include        https://go.bergen.edu/WebAdvisor/WebAdvisor?TOKENIDX*&APP=ST&CONSTITUENCY=WBFC
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// ==/UserScript==

/* On WebAdvisor class rosters add buttons for BCC faculty to display student names
** in easily cut-and-pasted to spreadsheet form, and automatically create the spreadsheet
** in Google Docs. I am using the ClientLogin functions from http://userscripts.org/scripts/show/27673
** which was written by Michael Freeman and AJAX functions from
** http://gdatatips.blogspot.com/2009/07/create-new-google-docs-spreadsheet-from.html
** by Eric from Google.
** and loads of JQuery
*/

/*
** Professor of Art and Animation
** Francis Scrubjay Schmidt 2009, updated 2011
** Bergen Community College
*/

var gdocsbuttonfront = '<input name="GDOCS" class="gdocsbutton" value=" To GoogleDocs " id=';
var gdocsbuttonback = ' class="Button"> </td>'; //WebAdvisor looking button straight to gdocs
var login    = '<p> Gmail Login &nbsp &nbsp &nbsp &nbsp <input id="name" size=24 type="text"> </p>'; //Gmail user name
var password    = '<p> Gmail Password &nbsp <input id="password" size=24 type="password"> </p>'; //Google password
var cellbuttonfront = '<td> <input name="C&P" class="rostbutton" value=" Roster '; // first half names button
var cellbuttonmiddle = '" id="'; // middle of button
var cellbuttonback = '" class="shortButton">'; // back half names button
var cellblank = '<th class=" FranAdded"> <div> <p id="blank"> <input type="hidden" name="blank" value="o"> </p> </div> </th>'
var classname = new Array(); //where the classname will go
var csv = ''; //where the csv version is
var names = "";
var hrefs = new Array();//the URLS for AJAX student names
var hoursroom = new Array();//class meeting times and room
var term = new Array();//term

// Gdocs login stuff at top of page
$('<TextNode textContent="Class Roster Select Section">').each(function () {   // Make sure we are on the right page
	$('<p> &nbsp </p>').appendTo("#screenTitle span:contains('Class Roster Select Section')"); // make a line between
	$(login).appendTo("#screenTitle span:contains('Class Roster Select Section')");       // put username
	$(password).appendTo("#screenTitle span:contains('Class Roster Select Section')");       // put password

	// Place to attach buttons for each class		
	$("#GROUP_Grp_LIST_VAR2").each(function () {    // find the table with the classnames
		var classcount = 0;
		$(this).find('table').each(function () {    // find the main table
			$(this).find('tr:first').each(function () {   // find the header
			   	$(this).prepend(cellblank); // add a spacer to match rows
				}); 
			$(this).find('tr:gt(0):not(:has(th))').each(function () {   // get rows greater than header (0)
				classcount ++; //increment the class #
				$(this).prepend(cellbuttonfront + classcount + cellbuttonmiddle + classcount + cellbuttonback + gdocsbuttonfront + classcount + gdocsbuttonback); // put the button in to grab and print student names
				hoursroom[classcount] = $(this).find('.LIST_VAR6 > div > p').text();//the hours and room
				term[classcount] = $(this).find('.LIST_VAR4 > div > p').text();// get the term
				$(this).find('td:visible').each(function () { //get each cell of the row
					$(this).find('a').each(function () { // grabs 'a' tags, with URL of student names for course
						classname[classcount] = $(this).text(); //for the popup window
						hrefs[classcount] = $(this).attr("href"); // gets the actual URL
					});
				});
			}); // end class row reads
		}); // end table read
				
		// What the Roster button does			
		$(".rostbutton").click(function(){ // Action for class roster button to be pushed to make window
			var target = $(this).attr("id"); //get the # of the row, assign to 'target'
			$.get(hrefs[target], function(data){ //AJAX get url data
				var rosternames = $(data).find('#GROUP_Grp_LIST_VAR7').html();//student name class table data
				myWindow = window.open('', 'MyNewWindow', 'width=900,height=500,left=100,top=100,scrollbars= 1'); // makes popup
				myWindow.document.write('<html><head><title>' + classname[target]+'</title></head><body><font  face="geneva, helvetica, arial"><div><table>' + rosternames + '</table></div></font></body></html>'); // page html
				myWindow.document.close();
				myWindow.focus();
			});
		});
		 
	
		$(".gdocsbutton").click(function() {  // Action for gdocs button when clicked do this
	         // login modified from http://userscripts.org/scripts/show/27673
	         // ajax modified from http://gdatatips.blogspot.com/2009/07/create-new-google-docs-spreadsheet-from.html
			var gauthURL = 'https://www.google.com/accounts/ClientLogin';    // using clientlogin method from google api
			var gToken = '';     // where the string that lets us authenticate lives
			var loginInfo = 'accountType=HOSTED_OR_GOOGLE&service=writely&source=bcc-to-gdocs-Francis-Schmidt';    // header stuff for xml
			var target = $(this).attr("id");
			$.get(hrefs[target], function(data){ //AJAX get url data
				$(data).find('#GROUP_Grp_LIST_VAR7').each(function (){
					csv = '"' + hoursroom[target] + '"' + '\n';
					csv += "Name,ID Number,Email Address,Phone Number" + '\n'; //header row for csv
					$(this).find('tr:gt(1)').each(function () { 
						csv += '"'+$(this).find('td.LIST_VAR7 > div > a ').text()+'"' + ','; //student # for csv
						csv += $(this).find('td.LIST_VAR6 > div > p').text() + ','; //student # for csv
						csv += $(this).find('td.LIST_VAR8 > div > a ').text() + ','; //student # for csv
						csv += $(this).find('td.VAR_LIST1 > div > p').text() + '\n'; //student # for csv
						})
				}); //end student name class table data
			}); //end AJAX response
			
			//These pieces form the xml that is sent to google docs
			var atom = ["<?xml version='1.0' encoding='UTF-8'?>",
	  		'<entry xmlns="http://www.w3.org/2005/Atom">',
	  		'<category scheme="http://schemas.google.com/g/2005#kind"',
	  		' term="http://schemas.google.com/docs/2007#spreadsheet"/>',
	  		'<title>', term[target] + " " + classname[target], '</title>',                    //name the spreadsheet after the classname 
	  		'</entry>'].join('');
	 
			var body = ['--END_OF_PART\r\n',
	  		'Content-Type: application/atom+xml;\r\n\r\n',
	  		atom, '\r\n',
	  		'--END_OF_PART\r\n',
	  		'Content-Type: text/csv\r\n\r\n',
	  		csv, '\r\n', // the actual data from webadvisor
	  		'--END_OF_PART--\r\n'].join('');
	  
			//logininfo has the useremail and password added to the xml needed for authentication
			loginInfo = loginInfo + '&Email=' + $("#name").val();
			loginInfo = loginInfo + '&Passwd=' + $("#password").val();

			GM_xmlhttpRequest({   // greasemonkey xml
				method: 'POST',
				url: gauthURL,
				headers: {
		    		'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
		    		'Content-type': 'application/x-www-form-urlencoded'
				},
				data: loginInfo,    // the authentication
				onload: function(responseDetails){
		         		if(responseDetails.status != 200) {    // failure 
		 		 			alert('Whoa.  Did you log in? \n\n   Error: ' + responseDetails.status + ': ' + responseDetails.statusText);
						};  
						if (responseDetails.status == 200) {    // 200 means we are successful, so we send up the spreadsheet
			        		tokenText = responseDetails.responseText;   // get the text
			        		gToken = tokenText.match(/Auth=[a-z0-9_-]+/i);    // turn it into our token
			         		GM_xmlhttpRequest({     // let's light this candle
			            		method: 'POST',
			            		url: 'http://docs.google.com/feeds/documents/private/full',
			            		headers: {
									'Authorization': 'GoogleLogin ' + gToken,  
			                    	'Content-Type': 'multipart/related; boundary=END_OF_PART',
			                    	'Slug': term[target] + " " + classname[target] +'.csv'
									},                // proves we are allowed to, and says what we are going to do
			
			            		contentType: 'multipart/related; boundary=END_OF_PART',
			            		data: body,  //the xml we made above, called body
			            		dataType: 'xml',
			            		onload: function(responseDetails){ 
					                if (responseDetails.status == 201) {   // success!
										alert('Spreadsheet named ' + term[target] + " " + classname[target] + '\n is now in ' + $("#name").val() + ' docs account')
										};
									if(responseDetails.status != 201) {    // failure  ;(
										alert('Whoops! There was a problem \n\n   Error: ' + responseDetails.status + ': ' + responseDetails.statusText);
										};
									showLoad(false);
									}
			            	});//end putting stuff up on google
			        	};
		    		}
				});
		}); //end google docs button
	 }); // end main table read
 });
