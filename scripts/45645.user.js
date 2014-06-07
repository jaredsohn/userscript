// ==UserScript==
	// @name          PatentlyUseful for USPTO
	// @uso:script    45645
	// @namespace     kwgoodwin
	// @description	  Provides helpful links for Issued Patents and Patent Applications at the United States Patent Office ( USPTO ).  Additional information available at PatentlyUseful.com.  
	// @version       0.7.7
	// @require       http://sizzlemctwizzle.com/updater.php?id=45645
	// @author        Kirk W Goodwin
	// @copyright     2009, 2011 Kirk W Goodwin (http://www.patentlyuseful.com/)
	// @include       http://patft*.uspto.gov/netacgi/*
	// @include       http://appft*.uspto.gov/netacgi/*
// ==/UserScript==              

// PatentlyUseful for USPTO was written by Kirk Goodwin - ALL RIGHTS RESERVED
// More information upcoming at http://PatentlyUseful.com

/*
Release History
--------------------------------------------------------------
2011/06/30: Ver 0.7.7
- Removal of PatentStorm.us as a link and the addition of Google Patents as a new link

2009/10/07: Ver 0.7.4
- Additional cleaning of searched patent text to help with avoiding extraneous materials showing up.

2009/08/26: Ver 0.7.3
- Yet another update to attempt to combat the difference between the way Firefox 3.5+ and an prior versions handle and pass html code

2009/08/26: Ver 0.7.2
- Modified additional data to help with backward compatibility
- Removed the wrapping updater code to stick with the @require http://sizzlemctwizzle.com/updater.php?id=45645

2009/08/13: Ver 0.7.1
- Modified some data to help reduce potential bugs with Firefox ver 3.0 and earlier
- Small improvements made to the Assignee Search

2009/08/12: Ver 0.7.0
- Started improving the appearance

2009/08/11: Ver 0.6.9
- Bug Fix
	o Fixed an error related to certain filing date months
	o Fixed an error related to certain very old patents displaying both the "searching" status and the results simultaneously

2009/08/11: Ver 0.6.8
- In the upper right hand corner
	o Added a blinking searching notice while the search request is being made, sent, received and processed.

2009/08/10: Ver 0.6.7
- In the upper right hand corner
	o Added related issued patent (if found) for a published patent(may take up to 30 sec as it is grabbing a search page)
	o Added other information including, Publication Number, Publication Date, Filing Date, Serial number and code
	o Assignee (if found) and search of Assignee in the published applications database
	o Current US Classification and search of the class in the published applications database
- In the upper left hand corner
	o Added link to the USPTO assignment page

2009/08/04: Ver 0.6.6		
- Added related published application for an issued patent (may take up to 30 sec as it is grabbing a search page)

2009/08/04: Ver 0.6.5		
- Added commas to the patent number (thanks to commafy)
- Updated the autoupdater (thanks to sizzlemctwizzle)
- Did some internal code organizing
- Replace INPADOC with Bibliographic Info for Issued Patents due to inconsistancies at the EPO

2009/08/03: Ver 0.6.4		
- Added pat2pdf and EPO links to the cited US published applications
- Added a link to a self-populated page for Patent Bibilographic information
  - NOTE: If someone clicks on one of the buttons too quickly USPTO sends a message that it may be against the TOS if automated. As this script does not automate the collection of data, but merely forwards known information to the 
next page I don't believe it's against the TOS.  But if it is, it's NOT MY FAULT as you've been warned.

2009/07/31: Ver 0.6.3		
- Fixed Finding the Issue Date for really old patents that don't have full text searching (e.g. patent before US Pat. 3584130)

2009/07/29: Ver 0.6.2		
- Fixed weird bug for search resultant patents (as opposed to patent number search results) which could hork the info in the righthand side

2009/07/29: Ver 0.6.1       
- Turned off all GM logs accidentially left on

2009/07/29: Ver 0.6		    
- Removed Patent Fetcher due to their limit of 10 patents PER IP ADDRESS (bad for companies)
- Added link to USPTO Patent Assignment Records
- Added patent information to top right corner including:
	+ Patent Number, Serial Number, Assignee (if known), Filing and issue dates, and Main US Class
- Added links to the top right corner for Assignee and Main US Class

2009/07/19: Ver 0.5.4       
- Wrapped variables into a JavaObject

2009/04/07: Ver 0.5.3       
- Added the EPO's INPADOC Family Link (Published applications only)

2009/04/07: Ver 0.5.2       
- Changed Version numbers to a standard format (also to make the Firefox Add-on Version)
- Adding similar links to the cited art

2009/04/01: Ver 2009.04.01.4 
- Added the Automatic Script updating back in with the corrected format.

2009/04/01: Ver 2009.04.01.3 
- Removed Automatic Script Updating due to an unexpected error in the script header.

2009/04/01: Ver 2009.04.01.2 
- Added Automatic Script Updating	

2009/04/01: Ver 2009.04.01.1 
- Initial Release
*/

/* 
NOTES
--------------------------------------------------------------
Additional potential features:
o Display the information in the right hand corner in a nice manner (e.g. a table? a floating box?)
o Add INPADOC for issued patents as we now have the published patent application number related to the patent
o Allow for an options menu for each user to select links they want, etc....
o Find any priority date and/or extension to calculate the date of expiration
o Add IC classification info and search
o Find a way to link to the File History at the EPO
o Change left hand links to nicer looking buttons
o Include the search links in the main body at the appropriate point(s)
o Avoid the CAPTCHA entry to get a pdf of an issued patent from the EPO patent site by using the corresponding publication number if found.
o Add Patent Title of Cited Art and/or Abstract to the list with the xmlhttpRequest command

DONE:
o Find cooresponding publication for an issued patent - DONE in 0.6.5!
o Find cooresponding issued patent for a publication (if in existance) - DONE in 0.6.7!
o Add a "searching" notice while looking for the corresponding patent/app - DONE in 0.6.7!
o Google Patents use: "http://www.google.com/patents?vid=" + patno   - DONE in 7.7!

*/
	
/*
 Known Issues
--------------------------------------------------------------	
o No known critical issues
*/	

// Javascript Closure

	if(!com) var com={};
	if(!com.patentlyuseful) com.patentlyuseful={};
	
com.patentlyuseful.USPTO = function(){

// Check Title to make sure it is a patent application or an issued patent which will start with "United States Patent"
    title = document.title;
	// GM_log('Getting title: ' + title);  

// Check to make sure it is a patent, not a search, etc.
    if (title.substring(0,20) == "United States Patent") { // START THE IMPORTANT PART OF THE SCRIPT



// Declaring and defining the variables
var title;				// Title of the viewed page
var issuedpat;			// Flag to show the page is of an issued patent (1=yes)
var pubapp;				// Flag to show the page is of a published patent application (1=yes)	
var patno;				// The number of the patent (although sometimes used as publication number to reduce overhead)
var pubno;				// The number of the patent application
var pattext;			// The actual inner HTML of the viewed patent page
var oldpat;				// Flag (using .indexOf) to see if it's an old patent where the full text is not available (-1=no)
var issuedate;			// The date the patet issued (in word format)
var patassignee;		// The full name of the patent assignee
var patass;				// The full name of the patent assignee where spaces are replaced with "-" to allow for a search
var sernum;				// The Patent Serial number
var shortser;			// The patent serial number in searchable format (no commas, slashes or spaces)
var filedate;			// The date of filing of the patent (NOT the necessarily the priority date)
var usclass;			// The main US classification - NOTE: should consider making this an arrary and grabbing all classes.
var usc;				// The main US classification where the slash is replaced with %2F to be in a searchable format
// var intlclass;		// The international classification (should be an array if possible)
var eponum;				// Patent Application Publication number in usable format at the EPO (removed the first zero after the year)
var relapp;				// Published application related to viewed issued pat (if available)
var relpat;				// Issued patent related to viewed published application (if available)

// Cited Prior Art Variables
var as;					// Listing of all of the hrefs of the <a> persuasion.  Should be found BEFORE adding the links to the page.
var asingle;			// Variable used to look at one of the as variables at a time
var patnum;				// Variable used to see if the asignle is a patent number
var pubum;				// Variable used to see if the asignle is a Published application serial number
/*
// Creation of display tables

// Right Hand Table
var right_string = (<r><![CDATA[
    <div id="Table">
		<table class="records table_view" id="righthanddata">
			<thead>
				<tr>
    				<th class="spacer"/>
					<th class="key_column only">
						Source
					</th>
					<th class="" id="f_column_0">
						<u>Visits</u>
					</th>
					<th class="" id="f_column_1">
						<u>Pages/Visit</u>
					</th>
					<th class="" id="f_column_2">
						<u>Avg. Time on Site</u>
					</th>
					<th class="" id="f_column_3">
						<u>% New Visits</u>
					</th>
					<th class="" id="f_column_4">
						<u>Bounce Rate</u>
					</th>
				</tr>
			</thead> ]]></r>).toString();
 */

// Style for displaying the links
	// PDF Header and Links
	GM_addStyle("a.pu_pdfhead    { position: absolute;  top:  14px;  left:   5px;  font-size: 14px; font-weight: bold;  text-decoration: underline; }");
	GM_addStyle("a.pu_pat2pdf    { position: absolute;  top:  30px;  left:  10px;  font-size: 14px; }");
	GM_addStyle("a.pu_EPOpdf     { position: absolute;  top:  30px;  left: 160px;  font-size: 14px; }");
	GM_addStyle("a.pu_freepats   { position: absolute;  top:  58px;  left:  10px;  font-size: 14px; }");
	GM_addStyle("a.pu_goopats    { position: absolute;  top:  58px;  left: 160px;  font-size: 14px; }");
	
	// USPTO Header and Records
	GM_addStyle("a.pu_usptohead  { position: absolute;  top: 100px;  left:     5px;  font-size: 14px; font-weight: bold; text-decoration: underline; }");
	GM_addStyle("a.pu_PatBio     { position: absolute;  top: 115px;  left:   160px;  font-size: 14px; }");
	GM_addStyle("a.pu_PatAssign  { position: absolute;  top: 115px;  left:    10px;  font-size: 14px; }");
	
	// EPO Header and Records
	GM_addStyle("a.pu_epohead    { position: absolute;  top: 150px;  left:   5px;  font-size: 14px; font-weight: bold;  text-decoration: underline; }");
	GM_addStyle("a.pu_EPOurl     { position: absolute;  top: 165px;  left:  10px;  font-size: 14px; }");
	GM_addStyle("a.pu_EPOlegal   { position: absolute;  top: 165px;  left: 160px;  font-size: 14px; }");
	// Note: either EPOINPADOC or PatBio will be used due to issues in finding if it's a B1 or B2 doc at the EPO 
	//  and published apps not having a Bio area
	GM_addStyle("a.pu_EPOINPADOC { position: absolute;  top: 180px;  left: 10px;  font-size: 14px; }");



// Note space for each link
	GM_addStyle("a.pu_pat2pdfnote     { position: absolute;  top:  45px;  left:  20px;  font-size: 10px;  color: RED }");
	GM_addStyle("a.pu_freepatsnote    { position: absolute;  top:  73px;  left:  20px;  font-size: 10px;  color: RED }");
	GM_addStyle("a.pu_goopatsnote     { position: absolute;  top:  73px;  left: 175px;  font-size: 10px;  color: RED }");
	GM_addStyle("a.pu_EPOurlnote      { position: absolute;  top:  48px;  left: 245px;  font-size: 10px;  color: RED }");
	GM_addStyle("a.pu_EPOpdfnote      { position: absolute;  top:  45px;  left: 175px;  font-size: 10px;  color: RED }");
	GM_addStyle("a.pu_EPOlegalnote    { position: absolute;  top: 109px;  left: 245px;  font-size: 10px;  color: RED }");
	// Note: either EPOINPADOC or PatBio will be used due to issues at the EPOS as it difficult to determin if it's
	// a B1 or B2 doc at the EPO and published apps not having a Bio area
	GM_addStyle("a.pu_EPOINPADOCnote  { position: absolute;  top: 126px;  left: 245px;  font-size: 10px;  color: RED }");
	GM_addStyle("a.pu_PatBioNote      { position: absolute;  top: 126px;  left: 245px;  font-size: 10px;  color: RED }");
	GM_addStyle("a.pu_PatAssignNote   { position: absolute;  top: 143px;  left: 245px;  font-size: 10px;  color: RED }");


// Adding a styles for cited art links
	GM_addStyle("a.pu_citedlink {font-size: 12px;}");

// Addings style for displaying Patent Info
	GM_addStyle("a.pu_patno       { position: absolute;  top:    17px;   right:  10px;  font-size: 14px; }");
	GM_addStyle("a.pu_sernum      { position: absolute;  top:    35px;   right:  10px;  font-size: 14px; }");
	GM_addStyle("a.pu_filedate    { position: absolute;  top:    53px;   right:  10px;  font-size: 14px; }");
	GM_addStyle("a.pu_issuedate   { position: absolute;  top:    71px;   right:  10px;  font-size: 14px; }");
	GM_addStyle("a.pu_patassignee { position: absolute;  top:    88px;   right:  10px;  font-size: 14px; }");
	GM_addStyle("a.pu_USClassSrch { position: absolute;  top:   107px;   right:  10px;  font-size: 14px; }");
	GM_addStyle("a.pu_relcase	  { position: absolute;  top:   124px;   right:  10px;  font-size: 14px; }");
	GM_addStyle("a.pu_relcasesrch { position: absolute;  top:   124px;   right:  10px;  font-size: 14px; text-decoration: blink; }");

	
	
// Universal Functions

// Make <b> </b> <i> </i> <a </a> uniform
function cleanpattext() {
	if (pattext.indexOf("<B>")>=0) {
		for (var i = pattext.indexOf("<B>"); i >= 0; i--) {
			pattext = pattext.replace("<B>","<b>");
			pattext = pattext.replace("</B>","</b>");
			}
		}
	if (pattext.indexOf("<I>")>=0) {
		for (var i = pattext.indexOf("<I>"); i >= 0; i--) {
			pattext = pattext.replace("<I>","<i>");
			pattext = pattext.replace("</I>","</i>");
			}
		}
	if (pattext.indexOf("<A ")>=0) {
		for (var i = pattext.indexOf("<A "); i >= 0; i--) {
			pattext = pattext.replace("<A NAME","<a name");
			pattext = pattext.replace("<A Name","<a name");
			pattext = pattext.replace("<A ","<a ");
			pattext = pattext.replace("</A>","</a>");H
			}
		}
	if (pattext.indexOf("HREF=")>=0) {
		for (var i = pattext.indexOf("HREF="); i >= 0; i--) {
			pattext = pattext.replace("HREF=","href=");
			}
		}
			//GM_log('patent text made uniform: ' + pattext);

	if (pattext.indexOf("&amp;")>=0) {
		for (var i = pattext.indexOf("&amp;"); i >= 0; i--) {
			pattext = pattext.replace("&amp;","&");
			}
		}
			//GM_log('patent text made uniform: ' + pattext);

	
	if (pattext.indexOf("&nbsp")>=0) {
		for (var i = pattext.indexOf("&nbsp"); i >= 0; i--) {
			pattext = pattext.replace("&nbsp","&");
			}
		}
			//GM_log('patent text made uniform: ' + pattext);
		return pattext;
	}	

// Clean pattext from search left overs.  Should make this a global change to save overhead.
function cleanpatfromsearch() {
	if (pattext.indexOf("a name="+'"'+"h1")>=0) {
		for (var i = pattext.indexOf("a name="+'"'+"h1")-1; i >= 0; i--) {
			pattext = pattext.replace("<a name=" + '"' + "h1" + '"' + " href=" + '"' + "#h0" + '"' + "></a><a href=" 
			+ '"' + "#h2" + '"' + "></a>","");
						pattext = pattext.replace("<a name=" + '"' + "h1" + '"' + " href=" + '"' + "#h0" + '"' + "></a><a  href=" 
			+ '"' + "#h2" + '"' + "></a>","");
			// At least make sure the <b><i> open and close are gone
			pattext = pattext.replace("<b> <i>","");
			pattext = pattext.replace("</i> </b>","");
			pattext = pattext.replace("<i><b>","");
			pattext = pattext.replace("</b></i>","");
			pattext = pattext.replace("<B><I>","");
			pattext = pattext.replace("</I></B>","");
			pattext = pattext.replace("<i> <b>","");
			pattext = pattext.replace("</b> </i>","");
				// GM_log('i: ' + i);
			// End loop if we got them all (Would a global replace make more sense?)
			if (pattext.indexOf("a name="+'"'+"h1")<0) 
				{
			i=-1
				// GM_log('i: ' + i);
				}
			}
		}
			// GM_log('Patent text cleaned: ' + pattext);
	if (pattext.indexOf("<b><i>")>=0) {
		for (var i = pattext.indexOf("<b><i>")-1; i >= 0; i--) {
			pattext = pattext.replace("<b><i>","");
			pattext = pattext.replace("</i></b>","");
				// GM_log('i: ' + i);
			// End loop if we got them all (Would a global replace make more sense?)
			if (pattext.indexOf("a name="+'"'+"h1")<0) 
				{
			i=-1
				// GM_log('i: ' + i);
				}
			}
		}
			// GM_log('Patent text cleaned: ' + pattext);
		return pattext;
	}
	
function cleanassignee() {
	var patass, replacements, regex, key;
	patass=patassignee;
	// Remove Leading "The " of a company's name
	if (patass.substring(0,4)=="The " || patass.substring(0,4)=="THE ") {
		patass=patass.substring(4);
	}
	replacements = {
		", Incorporated": "",
		", INCORPORATED": "",
		", Inc": "",
		", INC": "",
		", Limited": "",
		", LIMITED": "",
		", Ltd": "",
		", LTD": "",
		" Ltd": "",
		" LTD": "",
		", LLC": "",
		" LLC": "",
		", Corporation": "",
		" Corporation": "",
		" GmbH": "",
		" and Company": "",
		", Company": "",
		" Company": "",
		" ": "-",
		",": "",
		"&": "and"}
	regex = {};
		for (key in replacements) {
			regex[key] = new RegExp(key, 'g');
		}
		for (key in replacements) {
			patass = patass.replace(regex[key], replacements[key]);
			}
	// Having trouble with the period being read as a wildcard above so using this ugly hack
		patass = patass.replace(["Co."],[""]);
		patass = patass.replace(["CO."],[""]);
		patass = patass.replace(["."],[""]);
		patass = patass.replace(["."],[""]);
		// GM_log('Pat Assignee in cleaning function: ' + patass);
		// Removing a trailing space (now a dash)
		if (patass.substring(patass.length-1,patass.length)=="-"){
			patass=patass.substring(0,patass.length-1)
			}
		// GM_log('Pat Assignee in cleaning function: ' + patass);
	return patass;	
	}

function ptosearchabledate(date){
	for (var i = date.length - 1; i >= 0; i--) {
		date=date.replace(" ","%2F");
		date=date.replace(",","");
		}
	return date;
	}

// Take sernum and make it useable in the GET link	
function ptosearchableappnum(sernum){
		// GM_log('starting ptosearchableappnum function');
	var appnum=sernum;
	// GM_log('appnum start: ' + appnum);
	for (var i = appnum.length - 1; i >= 0; i--) {
		appnum=appnum.replace(" ","");
		appnum=appnum.replace(",","%2C");
		}
	appnum=appnum.substring(3);
	return appnum
}

// Function to find related published patent application (if exists)	
function getrelapp(filedate,sernum) {
	// GM_log('Function getrelapp started');
	if (filedate.indexOf("Unknown")>=0 || sernum.indexOf("Unknown")>=0) {
		relapp = "Unknown";
		displayrelapp(relapp);
	} else {
		var searchdate=ptosearchabledate(filedate);
		var searchnum=ptosearchableappnum(sernum);
		// GM_log('searchdate: ' + searchdate);
		// GM_log('searchnum: ' +searchnum);
		var searchsite="http://appft.uspto.gov/netacgi/nph-Parser?Sect1=PTO2&Sect2=HITOFF&u=%2Fnetahtml%2FPTO%2Fsearch-adv.html&r=0&p=1&f=S&l=50&"
					+ "Query=apd%252F" + searchdate + "+and+apn%2F" + searchnum + "&d=PG01";
		// GM_log('searchsite: ' +searchsite);			
		GM_xmlhttpRequest({method:'GET', 
			url:searchsite,
			onload:function(results) {
				var foundtext=results.responseText;
				// GM_log('Search results: ' + foundtext);
				if (foundtext.indexOf(": 1 applications")>=0) {
					foundtext=foundtext.substring((foundtext.indexOf("</A></TD>")-11),foundtext.indexOf("</A></TD>"));
					// GM_log('first shortend: ' + foundtext);
					relapp = foundtext;
					// GM_log('related app found');
					// GM_log('Relapp: ' + relapp);
				} else {
				if (foundtext.indexOf("No application publications have matched your query">=0)) {
					relapp= "Not Published";
					// GM_log('related app not found');
					// GM_log('Relapp: ' + relapp);
				} else {
					relapp= "Unknown";
					// GM_log('related app error');
					// GM_log('Relapp: ' + relapp);
					}
				}
				displayrelapp(relapp);	
			}
		});
	}
}

function displayrelapp(relapp){
		var rcs = document.getElementById('relcasesrch');
		if (rcs) {
		// GM_log('found relcasesrch id');
		rcs.parentNode.removeChild(rcs);
		}
		if (relapp.indexOf("Not Published")>=0 || relapp.indexOf("Unknown")>=0) {
		// show result w/o link
		var a60 = document.createElement("a");
		a60.setAttribute("id", "relapp");
		a60.appendChild(document.createTextNode("Published Prior in US As: " + relapp));
		a60.className = "pu_relcase";
		document.body.appendChild(a60);
		} else {
	    var a60 = document.createElement("a");    		// Create link to related US Published App
		a60.setAttribute("id", "relapp");
		a60.setAttribute("href", getrelappurl(relapp));
        a60.appendChild(document.createTextNode("Published Prior in US As: US" + relapp));
		a60.className = "pu_relcase";
		document.body.appendChild(a60);
		}
}


// Function to find related patent application (if exists)	
function getrelpat(filedate,sernum,numericfdate) {
	// GM_log('Function getrelapp started');
	if (filedate.indexOf("Unknown")>=0 || sernum.indexOf("Unknown")>=0) {
		relpat = "Unknown";
		displayrelpat(relpat);
	} else {
		var searchdate=ptosearchabledate(filedate);
		var searchnum=ptosearchableappnum(sernum);
		// GM_log('searchdate: ' + searchdate);
		// GM_log('searchnum: ' +searchnum);
		var searchsite="http://patft.uspto.gov/netacgi/nph-Parser?Sect1=PTO2&Sect2=HITOFF&u=%2Fnetahtml%2FPTO%2Fsearch-adv.htm" 
						+ "&r=1&p=1&f=G&l=50&d=PTXT&S1=%28" + numericfdate + ".AD.+AND+" + sernum + ".AP.%29&OS=apd/" 
						+ searchdate + "+and+apn/" + sernum + "&RS=%28APD/" + numericfdate + "+AND+APN/" + sernum + "%29";
		// GM_log('searchsite: ' +searchsite);			
		GM_xmlhttpRequest({method:'GET', 
			url:searchsite,
			onload:function(results) {
				var foundtext=results.responseText;
				// GM_log('Search results: ' + foundtext);
				if (foundtext.indexOf("<TITLE>United States Patent:")>=0) {
					foundtext=foundtext.substring((foundtext.indexOf("<TITLE>United States Patent:")+29),foundtext.indexOf("</TITLE>"));
					relpat = foundtext;
					// GM_log('related pat found');
					// GM_log('Relpat: ' + relpat);
				} else {
				// GM_log('starting first else');
				if (foundtext.indexOf("No patents have matched your query">=0)) {
					relpat= "Not Found";
					// GM_log('related pat not found');
					// GM_log('Relpat: ' + relpat);
				} else {
				// GM_log('starting second else');
					relpat= "Unknown";
					// GM_log('related pat error');
					// GM_log('Relpat: ' + relpat);
					}
				} 
				
				// GM_log('Display related patent routine to start')
				displayrelpat(relpat);	
			}
		});
	}
}

function displayrelpat(relpat){
		// removing blinking search notice
		var rcs = document.getElementById('relcasesrch');
		if (rcs) {
		// GM_log('found relcasesrch id');
		rcs.parentNode.removeChild(rcs);
		}
		// GM_log('starting displayrelatedpat routine');
		if (relpat=="Not Found" || relpat=="Unknown") {
		// show result w/o link
		var a60 = document.createElement("a");
		a60.setAttribute("id", "relapp");
		a60.appendChild(document.createTextNode("Issued US Patent: " + relpat));
		a60.className = "pu_relcase";
		document.body.appendChild(a60);
		} else {
	    var a60 = document.createElement("a");                                       // Create link to related US Published App
       	a60.setAttribute("id", "relapp");
	    a60.setAttribute("href", ("http://patft1.uspto.gov/netacgi/nph-Parser?patentnumber=" + relpat));
        a60.appendChild(document.createTextNode("Issued As: US Pat. No. " + relpat));
		a60.className = "pu_relcase";
		document.body.appendChild(a60);
		}
}
	
function commafy(num) {
		var str = (num+"").split("."),
		dec=str[1]||"",
		num=str[0].replace(/(\d)(?=(\d{3})+\b)/g,"$1,");
		return (dec) ? num+'.'+dec : num;
	}		

function fdateconvert(filedate){
	var fddate, fdmonth, fdday, fdyear, numericfdate;
	// Go after months first

	fddate = filedate;
	// GM_log('Filed date: [' +fddate+']');
// Starting convering word month to a numeric value (use 00 as an error dector) 
	fdmonth="00"
	if (fddate.indexOf("January")>=0) {
		fdmonth="01"
		fddate=fddate.substring(8);
	}
	if (fddate.indexOf("February")>=0) {
		fdmonth="02"
		fddate=fddate.substring(9);
	}
	if (fddate.indexOf("March")>=0) {
		fdmonth="03"
		fddate=fddate.substring(6);
	}
	if (fddate.indexOf("April")>=0) {
		fdmonth="04"
		fddate=fddate.substring(6);
	}
	if (fddate.indexOf("May")>=0) {
		fdmonth="05"
		fddate=fddate.substring(4);
	}
	if (fddate.indexOf("June")>=0) {
		fdmonth="06"
		fddate=fddate.substring(5);
	}
	if (fddate.indexOf("July")>=0) {
		fdmonth="07"
		fddate=fddate.substring(5);
	}
	if (fddate.indexOf("August")>=0) {
		fdmonth="08"
		fddate=fddate.substring(7);
	}
	if (fddate.indexOf("September")>=0) {
		fdmonth="09"
		fddate=fddate.substring(10);
	}
	if (fddate.indexOf("October")>=0) {
		fdmonth="10"
		fddate=fddate.substring(8);
	}
	if (fddate.indexOf("November")>=0) {
		fdmonth="11"
		fddate=fddate.substring(9);
	}	
	if (fddate.indexOf("December")>=0) {
		fdmonth="12"
		fddate=fddate.substring(9);
	}	
	// GM_log('file dat month =' + fdmonth);
	// GM_log('fddate' + fddate);
// If fdmonth hasn't changed we have a problem Houston
if (fdmonth=="00"){ 
	numericfdate="Error";
	return numericfdatep;
	} 

	else {
	// Get the Day
	// Add as zero in front of the day to account for single digit days
	fdday="0"+fddate.substring(0,fddate.indexOf(","));
	// GM_log('file date day =' + fdday);
	// GM_log('fileday length:'+fdday.length);
	// Now remove the first digit if we have three digits
	if (fdday.length==3){
		fdday=fddate.substring(0,2);
	}
	// GM_log('fileday length:'+ fdday.length );
	// GM_log('file date day = [' + fdday + ']');
	// Get the Year
	fdyear=fddate.substring(fddate.indexOf(",")+2);	
	// GM_log('file date year = [' + fdyear + ']');
	// Put them altogether in the desired way of YYYYMMDD
	numericfdate=fdyear+fdmonth+fdday;
	// GM_log('Numeric File Date ['+ numericfdate + ']');
	return numericfdate;
	}
}
/*
// Images to be used
// PDF Icon (9x10)
var pdficon9 = 	'<img src="' +
				'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAKCAYAAABmBXS%2BAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAe' +
				'iYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAlwSFlzAAAbewAAG3sBMuHPPgAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQ' +
				'AAAT5JREFUKFNFkD1Lw2AUhV87ZXdw628Qf4KrTi7ioogOblZB1D8haAV1cXBxFJ110lKo1rSpKYQQkjZtvlrSfJS2aWuO783iXQ5cHs459y7Yti3mcrnl%2B' +
				'XzOfmczNrVNli4uMT5TQRDW8vn8K%2Bv3%2B7UwDMEV5vsb5KNdGIYBXddpF7VarRXW6%2FVqcRxjMBjAkSWI2%2Bvodrtot9vodDrQNM1mnufVCYqiKAMrG6' +
				'twLCsDuQtUVU2Z4zh1AobDIbxmA9W9TTTvinBdNwN5bMp4cYk6kZt2fwNfVVA9OYT68gytVIJpmv8QuX0e7KBZvIB8fYnycQHls1PwpJRZltVwf%2BoQzwtQH' +
				'h%2BybqPRCJPJBEmSUI2UGeJXo7K%2FBfn2ChRL3Qgaj8cZxDVliqI8aeUPiTtKdARdS2%2Fxfb8WBAHp9x8QIil4uYy0UAAAAABJRU5ErkJggg%3D%3D+' +
                '" />';



// PDF Icon (15x18)
var pdficon15 = '<img src="' +
				'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAASCAYAAACEnoQPAAAABmJLR0QA%2FwD%2FAP%2BgvaeTAAAACXBIWXMAAAsTAAALEwEAm' +
				'pwYAAAAB3RJTUUH1wUWDCwYXToLmAAAAZ5JREFUOMulk09IFHEUxz%2Fv9xtL%2BgNBKEoUQXTR09YlIlBDO8Re6rBdki7pzZMHYUEED9Gx8BLWIWQv5l0IZT' +
				'0EIuwliA7RHjwEM4y5DoLNLrMzr4Mo4swsWN%2Fje%2B%2Fz%2FsD7CkClUrHFYnEkDEPDoYRsKYDneduFQqEOQLlcvqIZSnY81fBPKl6r1d4DlwyA7%2FtOa' +
				'sSuTzQ%2BTLzyITU%2BCILLQJcBUNX0ggf7aNBAg9307qoCYHJuQ67dRPquIz39eSX5MNbBjBTRoPEPMKA7LsnqMrr3%2B4xwO4L9PWzpJfHi67PB%2BvM7cu' +
				'MWtjRB8uMbydZGqsbJg%2BMvnzFjT9BmiHnwiGh2EjN4FzSBsecd4HZEsrkOrSZsrmPuj2LvPaT97hUycAfOdWfBSvJ1i3hpATv0GPtsEi5cPM52vf0EIrC2d' +
				'gpuNWl%2FfIP09MHVXuz4FDineotk3xwvL6LeL2j4OBMzaTBDzmFDwT59gWzXMbcH4Xx3R8gYo8dwtVo9mJ6bL7mu23%2F0t7lvK6Ku69aBlpzwrwPYDl4%2B' +
				'6ekEiPgf%2FQVVAbbY52ZRIQAAAABJRU5ErkJggg%3D%3D' +
                '" />';

// PDF Logo (45x50)
var pdflogo =	'img src="' +
				'data:image/gif;base64,R0lGODlhLQAyAPcAAAAAAJoBAJwCAZ0EAZwFBKAGA6IIA6EJBaQKBKYNBqIPDKQOCagOBqoQB6oSCakUDawSCK4UCa4WDKUYFqg' +
				'aFrEWCrIYC7AYDbQZC7UaDLYcDLgeDbIdErogDrwhD7IgFrUgE7YoHLohEbklFr4jEL8kELwkErwnFr4oF7koGrkqHbwpGr4sG6clJbIpIbUtJLkuIbsxJb81' +
				'Jbs6L706LbU5M7k6Mbk8NL8%2FM71ANr1COLZGRLZPTrpVVbxUUcAkEMEmEcMnEsMoEsQoEsYqE8csFMArGcAtG8gsFMouFMMxHcEwHsQwG8wwFs4yFskwGM4' +
				'2G843Hc84HtA0F9E1GNA2GtA5HcM3JcQ0IcM5KMM8LdI9ItA%2BJMNEN8FFOMNJOsZJOs5IMtBELNBNNtJPOMFNRMFUSsNVTMVZT8hSRdBXRNFYQ9NfS9ReSM' +
				'VhWclhVs5gUs1iV81mWtVkT9dlUNFoWMFlY8ZoYMhpY8htZc5uY85vZc9zaMx0a8x0bs58dtBtYdJxYtR2Z9J5b9N6bNB4cc%2BBes%2BAfNWEetWGfdiAcsq' +
				'EgsuHhs%2BOidOIg9SKg9WLhNaMgdCOiNmNg9WRjtiUiNmUi9qWj9GSkNaVkNqXkNiZk9yZkdycltyhldqimduon9KiodWmodWrq9unotmqptyqp9%2Bvpdmo' +
				'qNqvq92vrd60tN%2B5s%2BCspOGzrOGzruG0ruCzsOG5tuW%2BudzAvuHBu%2BLCv%2BTAvejCvc%2FPz9vEwt7Fwt7FxN7LyN%2FNy9DQ0NLS0tTU1NbW1t7' +
				'S0djY2Nra2tzc3N7e3ubDwOXFweXGxOfIxeTMyejNyujPzevQz%2BPV1OXU0uXX1OPZ1%2Bba1%2BPe3ubc2%2Bfe3ejT0OrV1OzV0%2BzW1Onb2ejb2uve3e' +
				'3c2u3e3eXg3%2Bjg3%2Bzg3%2BDg4OLi4uXi4eXj4uTk5Obm5uri4enm5u7i4u%2Fk4%2B7l5ejo6Orq6uzp6ezs7O7u7vDr6%2FTt7PXw7%2FDw8PLy8fLy8' +
				'vTy8fT09Pb29vj39%2Fn5%2BQAAACH5BAEAAP8ALAAAAAAtADIAAAj%2FAP8RI0fwmEFjCI0VW0isobCHwoJJBEbxl8VcGDMC%2B8exI0dy8%2BbJGwmv5LuT' +
				'6VKiQ1euJUFyBo8lXEiTZjmPHcuFFEnSJEqVK1uWK3gQYU2a6W7iLHdv50h5JeGdfJcy3UqWLonKVHhU5dJ8TUM%2BjTq16spznua0AaXVaM108Kx6RJdvH1i' +
				'xPaX%2BtHqKyhQnUHq1dVvsnTyq6DrS3cc47FifVFPSmULGSZNKL2POLCwyMsdy%2Beo2xgsVcrpwW6xMG5NE0NDBCt81lZru3T%2FQokeThiytCpdwa5LUyQ' +
				'qzqDF492a%2FS4w7993dJqlBiWItjHChmYsiTz5P6u3Qufdx%2F4cOT5yUJrWeIAmE9XVxmfKSJ4f6HTzjxmF5ln4nJokaJEUQchVxMc0jX1Py1BfafeKNp19' +
				'JbCSBBBJERGJVUFkdA5JYUSm4IGNgOTiWIhMSQcQnQLX3UnEzeRjegU6N1AqFRAzBilkYuqcZQi46ByNe3DxRoxDRRHahioP1yOCB441UxxBDMFFWiti19Q85' +
				'4GV5X4g%2FzgPLEEEocc2UR1b53pX3ZPkhfkyGhI0QQPyAiE84IlkcmmquySWMrsRZwhHRmFYmgWimqeaSTCY3SZwkeMAHWXvl%2BFKhefqYKBw%2FNOqBCcx' +
				'AauSALhVqqJb3JSoPFiUsgUIHG7xRml6f5v8oaqWIyrdMCR7IMcgGvMryKpmgijqqfVseaEmjl3izwgYZeBHPr5EGJSyttcLhgQfJ3AOJBhlgkElewK4k7LBr' +
				'bknPEh6wEF88OGBgQQjdgBvtuNQyiIsHHcTRDz%2F9zJJBBRXk8RS0Zo1LbniMIcJqJ%2Fw07E8hFUQggS0P0pmSwfUyBsYGHWizT8P82JNDBBDYUE8%2Bj8G' +
				'ajsEHM%2FiNCBt0oc%2FH%2FHz8zAcQNICHP%2FzcI69t5CR6cG6c8PpIaA0zxk8sEjTAACXgxILJIoyEwstULLfMWBq8OoN00g0fwkACZCNwQAEFDDAAD%2B' +
				'sALfTQ%2B7y8gRdp0rzPMn%2Fc4MDYCJj%2FvcABagsQwCjwZN2yJhtosImB%2B2zjiA05M8DAAzX8bYAPyuwgeAChFB7022rqc48XGqSgTjyklHEBBBA44EI' +
				'eprCzjyoUpH3ABAEE0II6hR%2FzdnJaIsMsGobAEHEEL%2Fhxi92MgWOHAgMIQEAP4PQzzz%2B%2B%2F67mHty6WwEHbsgy8z76EMuYO6ugkk0%2F%2FrSP%2' +
				'Fe%2FA54PPLSN0a8EMmbTToIEhIgyyw%2F54H%2Fzy0Yw3cEsDZ0hFPPASkroBkGdKe6AA35YNPYhAA9zKwzuiAg%2F%2B0Qxk7QuhCEM4QSa5IxEo2MAIYJC' +
				'BEEDjJPKYR27%2BB8IRjrCE8nmFFlTYh12oAAOSgEvdqhj0wRrakITZkw84AOEBEbzBF%2BjIAwZ0YA7ZlCuCNDwiEg90iyx4QAaiIAc6SqEBENAiHTK8IhaN' +
				'eMQJzsIIHvjCMNABD2ao4AKNQOOhiEjDB9pQgOO4wqZ0gUZlxAADbiiHPPJExDX68YbZu8S1ZEAOazxiBBgwQzX4x0g%2B9lGLArQEvkRAAxFkIAN3OIeB4kc' +
				'qT%2F4PlNlzhxxYxSwalCI%2BB8qYIx%2FZvoAAADs%3D'+
                '" />';
*/


// Grab the inner document body HTML
	pattext = content.document.body.innerHTML;  	
	pattext = cleanpattext(); // Making sure <b>,</b>,<i>,</i> are lower case and fix &amp; to "&"

	
// Check to see if a US Issued Patent is diplayed
    issuedpat = 0;
    if (title.substring(0,21) == "United States Patent:") { 
	// START US ISSUED PATENTS LOOP
	//GM_log('Starting Issued Patent Loop');
		issuedpat = 1;
		
	// Creating URLs based on the U.S. Patent number or other information
		function getpat2pdf(patno)    { return "http://www.pat2pdf.org/pat2pdf/foo.pl?number=" + patno;}
		function getfreepats(patno)   { return "http://www.freepatentsonline.com/" + patno + ".pdf";}
		function getEPOurl(patno)     { return "http://v3.espacenet.com/searchResults?locale=en_EP&NUM=US" + patno;}
		function getEPOappurl(eponum) { return "http://v3.espacenet.com/publicationDetails/biblio?adjacent=true&KC=A1&NR=" 
												+ eponum + "A1&DB=EPODOC&locale=en_EP&CC=US&FT=D";}
		function getgoopats(patno)   { return "http://www.google.com/patents?vid=" + patno;}
		function getEPOpdf(patno)     { return "http://v3.espacenet.com/content/fullpdfdoc/US" + patno + ".pdf?DB=EPODOC&IDX=US" + patno;}
		function getEPOlegal(patno)   { return "http://v3.espacenet.com/publicationDetails/inpadoc?CC=US&NR=" + patno 
												+ "B2&KC=A1&FT=D&DB=&locale=en_EP";}
		function getPatAssign(patno)  { return "http://assignments.uspto.gov/assignments/q?db=pat&pat=" + patno;}
		function getUSClassSrch(usc)  { return "http://patft.uspto.gov/netacgi/nph-Parser?Sect1=PTO2&Sect2=HITOFF&u=%2Fnetahtml%2FPTO%2F"
												+ "search-adv.htm&r=0&p=1&f=S&l=50&Query=ccl%2F%28" + usc + "%29&d=PTXT";}
		function getpatassSrch(patass) { return "http://patft.uspto.gov/netacgi/nph-Parser?Sect1=PTO2&Sect2=HITOFF&u=%2Fnetahtml%2FPTO%2F"
												+ "search-adv.htm&r=0&p=1&f=S&l=50&Query=AN%2F" + patass + "$&d=PTXT";}
		function getPatBio(patno,shortser) { return "https://ramps.uspto.gov/eram/patentMaintFees.do?patentNum=" + patno 
												+ "&applicationNum=" + shortser;}
		function getrelappurl(appnum) { return "http://appft.uspto.gov/netacgi/nph-Parser?Sect1=PTO1&Sect2=HITOFF&d=PG01&p=1&u=%252Fnetahtml"
												+ "%252FPTO%252Fsrchnum.html&r=1&f=G&l=50&s1=%22" + appnum + "%22.PGNR.&OS=DN/" + appnum;}
		function getrelpaturl(relpat) { return "http://patft1.uspto.gov/netacgi/nph-Parser?patentnumber=" + relpat;}
		// Removing this until either I find a way to see if it was published to see if it should end with a B1 or B2
		// function getEPOINPADOC(patno) { return "http://v3.espacenet.com/inpadoc?DB=EPODOC&locale=en_EP&FT=D&CC=US&NR=" + patno + "B2";}

	// Get U.S. Patent Number:
	// Page Name is in the form of  "United States Patent: #######" 
	// Take patent number ####### from the title as a substring.

		patno = title.substring(22);
   
		// Add information in top right hand corner
		// GM_log('Got Patent Number: ' + patno);

			// Finding out some important data on the patent viewed	
			// Truncating from "United States Patent" to the start of the claims the top text of the patent
			// 
			// if(patno>3584129)  <-- need this somewhere to deal with really old patents
			// or look for "Full text is not available for this patent. Click on "Images" button above to view full patent." 
			// only the Pat.No, Issue Date, and US Class is shown for old patents.  Need a routine(s) to handle just those.
			// See if the patent is not full text searchable
			
			oldpat=pattext.indexOf("Full text is not available for this patent.");
			//GM_log('pattext at start' + pattext);
			
			//GM_log('Old pat variable ' + oldpat);
			
			// Removing search result tags if present as they make finding the desired information difficult
				pattext = cleanpatfromsearch();
				// GM_log('Cleaned Pattext' + pattext);
			//  
			// Prefer to truncate at the beginning of the claims, but design patents has "Claim" before wanted info
			// Truncating pattext at the Description header (if present)
			
				pattext=pattext.substring(pattext.indexOf("<b>United States Patent")+28);
				if (pattext.indexOf("Description</i>")>=0) 
				{
				pattext=pattext.substring(0,pattext.indexOf("Description</i>"));
				}
				// GM_log('Patent text truncated ' + pattext);
			


			// FUTURE FEATURE HERE : Swap out 8-bit characters for 7 bit ones
						
			// Find Patent number in pattext
				pattext=pattext.substring(pattext.indexOf("<b>")+3);
				// GM_log('pattext'+pattext);
				// We won't do this now as we found it in the title!
				var patno2=pattext.substring(0,pattext.indexOf("</b>"));
				pattext=pattext.substring(pattext.indexOf("</b>")+4);
				// GM_log('Pat No 2nd time' + patno2);
			
			// Find Issue Date by using the html code uniquely found around it
			// GM_log('Start looking for issue date');
			if (oldpat >=0)
				{
					// Do loop for old patents which have a different appearance
					// GM_log('Start looking for old patent issue date');
					pattext=pattext.substring(pattext.indexOf("Issue Date:")+69);
					issuedate=pattext.substring(0,pattext.indexOf("</b>"));
					// GM_log('Found Old Issue Date: ' + issuedate);
					}
				else {
					// Do loop for full text patents
					// GM_log('Start looking for newer patent issue date');
					pattext=pattext.substring(pattext.indexOf("<b>")+4);
					// GM_log('pattext in first loop' + pattext);
					// First Named inventor should be about here
					var firstetal=pattext.substring(0,pattext.indexOf("</b>"));
					firstetal = firstetal.replace("&amp;","&");
					// GM_log('First Named or et al: ' + firstetal);
					pattext=pattext.substring(pattext.indexOf("</b>")+4);
					pattext=pattext.substring(pattext.indexOf("<b>")+3);
					issuedate=pattext.substring(0,pattext.indexOf("</b>"));
					// GM_log('Found New Issue Date: ' + issuedate);
					}
				// GM_log('Found Issue Date: ' + issuedate);
			
			// Find the Inventors, but not in this version.
				// InventorNames = pattext;
			
			// Find the Assignee (if listed) (different than PatAssign which is used for the link to the assignments at the USPTO)
				
				if(pattext.indexOf("Assignee:")>=0)
				{		
					// Set Assignee to listed name if found
				
					// USPTO nicely brackets the Assignee with the Bold on and off calls so we're taking advantage of that!
					pattext=pattext.substring(pattext.indexOf("Assignee:"));
					patassignee = pattext.substring(pattext.indexOf("<b>")+3,pattext.indexOf("</b>"));
					patassignee = patassignee.replace("&amp;","&");
					// GM_log('Found Patassignee: ' + patassignee);
					// Removing some company abbreviations and replace spaces with dashes
					patass = cleanassignee();
					// GM_log('Cleaned Assignee: ' + patassignee);
					// Be good to truncate off endings such as "Inc." etc. to help search results 
					// and fix 8 bit to 7 bit errors (e.g. change &amp to "&")
					// Replacing spaces with dashed for search
						//for (var i = patass.length - 1; i >= 0; i--) {
						//	patass = patass.replace(" ", "-");
						//	}

					// GM_log('Found Assignee: ' + patassignee);
					// GM_log('Assignee Search As: ' + patass);
				}
					// Set Assignee to "Unknown" if not found
					else {
						patassignee="Unknown";	
						}
			// Find the patent file date by looking for "Filed:" in the patent text top
			// FUTURE FEATURE HERE : This won't be in a numerical or usable value but we will change it later when necessary
			// FUTURE FEATURE HERE : Need to add an if/else statement to deal with really old patents as they look different
				
			// Find the Application Serial Number (if listed)
				
				if (pattext.indexOf("Appl. No.:")>=0) 
				{
					// Set Sernum to Serial Number if found
					pattext=pattext.substring(pattext.indexOf("Appl. No.:"));
					sernum = pattext;
					// USPTO nicely brackets the date with the Bold on and off calls so we're taking advantage of that!
					sernum=sernum.substring(sernum.indexOf("<b>")+3,sernum.indexOf("</b>"));
					// Removing the slash, commas and spaces (need to change this to a global replace) 
					// GM_log('sernum: ' + sernum);
					shortser = sernum.replace(["/"],[""]);
					shortser = shortser.replace([","],[""]);
					shortser = shortser.replace([" "],[""]);
				}
				else{
					// Set Sernum to "Unknown" if not found
					sernum="Unknown";
				}
				// GM_log('Ser Num:' + sernum);
				// GM_log('Short Ser Num:' + shortser);
				
			// Find the date the patent was filed by looking for "Filed:" in the patent text top, again this is non-numerical
			
				if (pattext.indexOf("Filed:")>=0)
				{
					pattext=pattext.substring(pattext.indexOf("Filed:")+45);
					filedate=pattext;
				// GM_log('Truncated filedate data ' + pattext);
					// USPTO nicely brackets the date with the Bold on and off calls so we're taking advantage of that!
					filedate=filedate.substring(filedate.indexOf("<b>")+3,filedate.indexOf("</b>"));
				// GM_log('Filed On: ' + filedate);
				}
				else{
					// Set pattext to "Unknown" if not found
					filedate="Unknown";
				}
				// GM_log('Filed on: ' + filedate);
				
			// Have everything we need to see if there is a corresponding published application
			// Note: I THINK this will run in the background while the rest is running so this function needs to do the printing calls as well
				// GM_log('Start looking for the related published application');
				// GM_log('filedate: ' + filedate);
				// GM_log('sernum: ' + sernum);
				getrelapp(filedate,sernum);
				// GM_log("relapp: " + relapp);
				
			// Find the Main US Classification
				if (pattext.indexOf("Current U.S. Class:")>=0) 
				{
				// Set US Class to classification if found
					pattext=pattext.substring(pattext.indexOf("Current U.S. Class:")+20);
					usclass = pattext;
					usclass=usclass.substring(usclass.indexOf("<b>")+3,usclass.indexOf("</b>"));
					usc=usclass.replace(["/"],["%2F"]);
				}
				else{
				// Set US Class to "Unknown" if not found
					usclass="Unknown";
					// Need to make sure the link isn't created instead of doing this.
					usc="0%2F0";
				}
				// GM_log('US Classification: ' + usclass);
				// GM_log('US Classification short: ' + usc);
				
			// Find the International Classification - but not in this version
				//
				// if(intlclass.indexOf("Current International Class:")!=-1 
				// {
				//	intlclass=intlclass.substring(intlclass.indexOf("Current International Class:"));
				//	intlclass=intlclass.substring(intlclass.indexOf("80%"+'"'+">"),intlclass.indexOf("</TD>"));
				// }
				// else {
				// 	intlclass="Unknown";
				// }
			
// Adding Links to the Cited Prior Art
	// GM_log('Adding links to the Cited Prior Art');
    var as = document.getElementsByTagName('a');
    for (var i = as.length - 1; i >= 0; i--) {
        asingle = as[i].innerHTML;
        patnum = asingle.replace(/[^0-9]/g,"");		// If they match it is a "good" patent number
		pubnum = asingle.replace(/[^0-9,/]/g,"");
		// GM_log('i =' + i );
		// GM_log('asingle = ' + asingle);
		// GM_log('patnum = ' + patnum);
		// GM_log('pubnum = ' + pubnum);
        if (asingle == patnum && patnum > 0) {
            patnum = patnum.replace(/\,/g,'');
			// GM_log('patnum: ' + patnum);
            var a20 = document.createElement("a");
            a20.appendChild(document.createTextNode(" "));                 // Create a whitespace
            a20.className = "pu_citedlink";
			
            var a21 = document.createElement("a");                         // Create link to Pat2Pdf
            a21.setAttribute("href", getpat2pdf(patnum));
            a21.appendChild(document.createTextNode("[ Pat2Pdf ]"));
            a21.className = "pu_citedlink";
			
            var a22 = document.createElement("a");                                                   
            a22.appendChild(document.createTextNode(" "));                 // Create a whitespace
            a22.className = "pu_citedlink";

            var a23 = document.createElement("a");                         // Create link to the EPO site
            a23.setAttribute("href", getEPOurl(patnum));
            a23.appendChild(document.createTextNode("[ EPO Site ]"));
            a23.className = "pu_citedlink";
		
            as[i].parentNode.insertBefore(a23, as[i].nextSibling);         // Note: there should be a more elegant way to do this
            as[i].parentNode.insertBefore(a22, as[i].nextSibling);  
            as[i].parentNode.insertBefore(a21, as[i].nextSibling);
            as[i].parentNode.insertBefore(a20, as[i].nextSibling);  
        } else { 
		if (asingle == pubnum && pubnum.replace(/\//g,'') > 0) {
			// GM_log('found a patent app: ' + asingle);
		    // pubnum = pubnum.replace(/\//g,'');
			// GM_log('pubnum: ' + pubnum);
            var a20 = document.createElement("a");
            a20.appendChild(document.createTextNode(" "));                 // Create a whitespace
            a20.className = "pu_citedlink";
			
            var a21 = document.createElement("a");                         // Create link to Pat2Pdf
            a21.setAttribute("href", getpat2pdf(pubnum));
            a21.appendChild(document.createTextNode("[ Pat2Pdf ]"));
            a21.className = "pu_citedlink";
			
			var a22 = document.createElement("a");                                                   
            a22.appendChild(document.createTextNode(" "));                 // Create a whitespace
            a22.className = "pu_citedlink";

			// var fronteponum = pubnum.substring(0,4);
			// var endeponum = pubnum.substring(5,11);
			// var eponum = fronteponum + endeponum;
			var eponum = pubnum.substring(0,4) + pubnum.substring(5,11);
			// GM_log('eponum: ' + eponum);
			
            var a23 = document.createElement("a");                          // Create link to the EPO site
            a23.setAttribute("href", getEPOappurl(eponum));
            a23.appendChild(document.createTextNode("[ EPO Site ]"));
            a23.className = "pu_citedlink";
			
			as[i].parentNode.insertBefore(a23, as[i].nextSibling);    		// Note: there should be a more elegant way to do this
            as[i].parentNode.insertBefore(a22, as[i].nextSibling);  
			as[i].parentNode.insertBefore(a21, as[i].nextSibling);
            as[i].parentNode.insertBefore(a20, as[i].nextSibling); 
			}
		}
    }
	
	// Start adding to the right hand corner	
		// GM_log('Start adding to the right hand corner');
    // Add Patent Number
		var a51 = document.createElement("a");
		a51.setAttribute("id", "patno");
		a51.appendChild(document.createTextNode("Patent No.: " + commafy(patno)));
		a51.className = "pu_patno";
		document.body.appendChild(a51);
	
	// Add Application Number
		var a52 = document.createElement("a");
		a52.appendChild(document.createTextNode("Serial Number: " + sernum));
		a52.setAttribute("id", "sernum");
		a52.className = "pu_sernum";
		document.body.appendChild(a52);
	
	// Add Filing Date
		var a53 = document.createElement("a");
		a53.appendChild(document.createTextNode("Filed On: " + filedate));
		a53.setAttribute("id", "filedate");
		a53.className = "pu_filedate";
		document.body.appendChild(a53);
	
	// Add Issue Date
		var a54 = document.createElement("a");
		a54.appendChild(document.createTextNode("Issued On: " + issuedate));
		a54.setAttribute("id", "issuedate");
		a54.className = "pu_issuedate";
		document.body.appendChild(a54);
	
	// Add Patent Assignee (different than the function PatAssign)
		var a55 = document.createElement("a");   		// Create link to US Assignee Search
		a55.appendChild(document.createTextNode("Assignee: "));
		a55.setAttribute("id", "assignee");
		if (patassignee=="Unknown"){
		} else {
			a55.setAttribute("href", getpatassSrch(patass));
		}
        a55.appendChild(document.createTextNode(patassignee));
		a55.className = "pu_patassignee";
		document.body.appendChild(a55);
			
	// Add US Classification
	    var a56 = document.createElement("a");     		// Create link to US Class Search
		a56.appendChild(document.createTextNode("Main US Classification: "));
        a56.setAttribute("href", getUSClassSrch(usc));
		a56.setAttribute("id", "usclass");
        a56.appendChild(document.createTextNode(usclass));
		a56.className = "pu_usclassSrch";
		document.body.appendChild(a56);
		
	// Check to see if filedate was found or not
	if (filedate!=="Unknown"){
		// GM_log('adding blinking notice');
		// Add searching notice
		var a59 = document.createElement("a");
		a59.appendChild(document.createTextNode("Searching for the corresponding published US Application..."));
		a59.className = "pu_relcasesrch";
		a59.setAttribute("id", "relcasesrch");
		document.body.appendChild(a59);
	}

	// Add CAPTCHA notice for issued patents for the EPO pdf link
        var a15 = document.createElement("a");
        a15.setAttribute("href", getEPOpdf(patno));
		a15.setAttribute("id", "epopdfnote");
        a15.appendChild(document.createTextNode("Requires Captcha entry"));
        a15.className = "pu_EPOpdfnote";     
        document.body.appendChild(a15);

	// End CAPTCHA notice


// USPTO Patent Assignment Record 

    var a8 = document.createElement("a");
    a8.setAttribute("href", getPatAssign(patno));
    a8.appendChild(document.createTextNode("Assignment Records"));
	a8.setAttribute("id", "assignrecords");
    a8.className = "pu_PatAssign";     
    document.body.appendChild(a8);
/*
    var a18 = document.createElement("a");
	a18.setAttribute("id", "assignrecordsnote");
    a18.appendChild(document.createTextNode("FROM USPTO"));
    a18.className = "pu_PatAssignNote";     
    document.body.appendChild(a18);
*/
	  
// USPTO Patent Bio Record (won't work for applications)	  
    var a9 = document.createElement("a");
    a9.setAttribute("href", getPatBio(patno,shortser));
    a9.appendChild(document.createTextNode("Bibilographic Records"));
    a9.setAttribute("id", "patbio");
	a9.className = "pu_PatBio";     
    document.body.appendChild(a9);
/*
    var a19 = document.createElement("a");
    a19.appendChild(document.createTextNode("FROM USPTO"));
    a19.className = "pu_PatBioNote";
    a19.setAttribute("id", "patbionote");	
    document.body.appendChild(a19);
*/
	  
// GM_log('ending US issued patent loop');
} // END US ISSUED PATENT LOOP

// Check to see if a US Published Application is displayed

    pubapp = 0;
    if(title.substring(0,34) == "United States Patent Application: "){

// START PUBLISHED PATENT APPLICATION LOOP
	// GM_log('Starting Published Patent Application Loop');
    pubapp = 1;

// Take patent application number ####### from the title as a substring and add the missing leading "2"
    pubno = 2 + title.substring(34);

// EPO site removes one of the zeros from US Published Applications
    // var fronteponum = pubno.substring(0,4);
    // var endeponum = pubno.substring(5,11);
    eponum = pubno.substring(0,4) + pubno.substring(5,11);
	 
// As there is sharing of the function between patent applications and issued patents, we need to harmonize, for now.  
	patno = pubno;

// Creating links based on variables

function getpat2pdf(patno)    { return "http://www.pat2pdf.org/pat2pdf/foo.pl?number=" + patno;}
function getfreepats(patno)   { return "http://www.freepatentsonline.com/" + patno + ".pdf";}
function getgoopats(patno)    { return "http://www.google.com/patents?vid=" + patno;}
function getEPOurl(patno)     { return "http://v3.espacenet.com/publicationDetails/biblio?adjacent=true&KC=A1&NR=" + eponum 
										+ "A1&DB=EPODOC&locale=en_EP&CC=US&FT=D";}
function getEPOpdf(patno)     { return "http://v3.espacenet.com/publicationDetails/originalDocument?CC=US&NR=" + eponum 
										+ "A1&KC=A1&FT=D&DB=EPODOC&locale=en_EP";}
function getEPOlegal(patno)   { return "http://v3.espacenet.com/publicationDetails/inpadoc?CC=US&NR=" + eponum 
										+ "A1&KC=A1&FT=D&DB=EPODOC&locale=en_EP";}
function getEPOINPADOC(patno) { return "http://v3.espacenet.com/inpadoc?KC=A1&NR=" + eponum 
										+ "A1&DB=EPODOC&submitted=true&locale=en_EP&CC=US&FT=D";}
function getPubPatAssign(pubno) { return "http://assignments.uspto.gov/assignments/q?db=pat&qt=pub&reel=&frame=&pat=&pub=" + pubno;}
function getPatAssSrch(patass) { return "http://appft.uspto.gov/netacgi/nph-Parser?Sect1=PTO2&Sect2=HITOFF"
										+ "&u=%2Fnetahtml%2FPTO%2Fsearch-adv.html&r=0&p=1&f=S&l=50&Query=an%2F" + patass + "$&d=PG01";}							
function getUSClassSrch(usclass) { return "http://appft.uspto.gov/netacgi/nph-Parser?Sect1=PTO2&Sect2=HITOFF&u=%2Fnetahtml%2F"
										+ "PTO%2Fsearch-adv.html&r=0&p=1&f=S&l=50&Query=CCL%2F" + usc + "&d=PG01";}
									


// Finding Application information
	pattext=pattext.substring(pattext.indexOf("<b>United States Patent")+3);
	if (pattext.indexOf("<b><i>Claims")>=0) 
		{
			pattext=pattext.substring(0,pattext.indexOf("<b><i>Claims"));
		}
	// GM_log('truncated pattext: ' + pattext);
	
// Removing search result tags if present as they make finding the desired information difficult
	pattext = cleanpatfromsearch();
	// GM_log('cleaned pattext: ' + pattext);
	
	// Need to grab each field and truncate off to get what we want
	// Grab the Pub Num (again)
	pattext=pattext.substring(pattext.indexOf("<b>")+3);
	var pappnum=pattext.substring(0,pattext.indexOf("</b>"));
	// GM_log('pappnum: ' + pappnum);
	
	// Grab Kind code
	pattext=pattext.substring(pattext.indexOf("<b>Kind Code</b>")+16);
	pattext=pattext.substring(pattext.indexOf("<b>")+3);
	// GM_log('pattext:' + pattext);
	var kindc=pattext.substring(0,pattext.indexOf("</b>"));
	// GM_log('Kind Code: ' + kindc);
	
	// Grab First Named Inventor
	pattext=pattext.substring(pattext.indexOf("<b>")+3);
	// GM_log('pattext:' + pattext);
	var inventor1=pattext.substring(1,pattext.indexOf("</b>"));
	// GM_log('inventor1:' + inventor1);
	
	//Grab Publication Date
	pattext=pattext.substring(pattext.indexOf("<b>")+3);
	var pubdate=pattext.substring(1,pattext.indexOf("</b>"));
	// GM_log('pubdate: ' + pubdate);
	
	// Grab Title
	// GM_log(pattext);
	pattext=pattext.substring(pattext.indexOf("<font size=" + '"' + "+1")+16);
	var apptitle=pattext.substring(0,pattext.indexOf("</font>")-1);
	// GM_log('apptitle:' + apptitle);
	
	// Grab Inventor
		// Not in this version, maybe in later versions
	
	// Grab Assignee
	if (pattext.indexOf(">Assignee")>=0) { 
		pattext=pattext.substring(pattext.indexOf(">Assignee")+13);
		// GM_log('pattext ' + pattext);
		patassignee=pattext.substring(pattext.indexOf("<b>")+3);
		patassignee=patassignee.substring(0,patassignee.indexOf("</b>"));
		patassignee = patassignee.replace("&amp;","&");
		// GM_log('Found Patassignee: ' + patassignee);
		// Removing some company abbreviations and replace spaces with dashes
		patass = cleanassignee();

		// Removing some company abbreviations and replace spaces with dashes
		patass = cleanassignee(patass);
	} else {
		patassignee="Unknown";
		patass=patassignee;
	}
	// GM_log('patassignee: ' + patassignee);
	// GM_log('patass: ' + patass);	
	
	// Grab Serial number
	// GM_log(pattext);
	pattext=pattext.substring(pattext.indexOf("Serial ")+10);
	pattext=pattext.substring(pattext.indexOf("<b>")+3);
	sernum=pattext.substring(0,pattext.indexOf("</b>"));
	sernum = sernum.replace(" ","");	
	sernum = sernum.replace(" ","");
	sernum = sernum.replace("<i>","");
	sernum = sernum.replace("</i>","");
	// GM_log('sernum:"' + sernum + '"');
	
	// Series Code
	// GM_log(pattext);
	pattext=pattext.substring(pattext.indexOf("<b>")+3);
	var sercode=pattext.substring(0,pattext.indexOf("</b>"));
	sercode = sercode.replace(" ","");
	sercode = sercode.replace(" ","");
	sercode = sercode.replace("<i>","");
	sercode = sercode.replace("</i>","");
	sercode = sercode.substring(0,2);
	// GM_log('sercode:"' + sercode+ '"');
	
	//Grab File Date
	// GM_log(pattext);
	pattext=pattext.substring(pattext.indexOf("<b>")+3);
	filedate=pattext.substring(0,pattext.indexOf("</b>"));
	// GM_log('filedate: ' + filedate);
	numericfdate = fdateconvert(filedate);
	
	// Have everything we need for related patent app, start the routine now
	// Get related US Issued Patent (if it exists)		
		getrelpat(filedate,sernum,numericfdate);
			
	//Grab Current US Class
	pattext=pattext.substring(pattext.indexOf("Current Class")+15);
	pattext=pattext.substring(pattext.indexOf("<b>")+3);
	usclass=pattext.substring(0,pattext.indexOf("</b>"));
	// GM_log('usclass: ' + usclass);	
	usc=usclass.replace(["/"],["%2F"]);
	// GM_log('usc: ' + usc);	
	
	// Start adding to the right hand corner	
		// GM_log('Start adding to the right hand corner');
    // Add Patent Number
		var a51 = document.createElement("a");
		a51.appendChild(document.createTextNode("Publication No.: US" + (patno)));
		a51.className = "pu_patno";
		a51.setAttribute("id", "pubno");
		document.body.appendChild(a51);
	
	// Add Application Number
		var a52 = document.createElement("a");
		a52.appendChild(document.createTextNode("Serial Number: " + sercode + "/" + sernum.substring(0,3) + "," + sernum.substring(3,6)));
		a52.className = "pu_sernum";
		a52.setAttribute("id", "sernum");
		document.body.appendChild(a52);
	
	// Add Filing Date
		var a53 = document.createElement("a");
		a53.appendChild(document.createTextNode("Filed On: " + filedate));
		a53.className = "pu_filedate";
		a53.setAttribute("id", "filedate");
		document.body.appendChild(a53);
	
	// Add Publication Date
		var a54 = document.createElement("a");
		a54.appendChild(document.createTextNode("Published On: " + pubdate));
		a54.className = "pu_issuedate";
		a54.setAttribute("id", "issuedate");
		document.body.appendChild(a54);
				
	// Add Patent Assignee (different than the function PatAssign used with Issued Patents)
		var a55 = document.createElement("a");   		// Create link to US Assignee Search
		a55.appendChild(document.createTextNode("Assignee: "));
		if (patassignee=="Unknown"){
			} else {			
			a55.setAttribute("href", getPatAssSrch(patass));
			}
		a55.appendChild(document.createTextNode(patassignee));
		a55.className = "pu_patassignee";
		a55.setAttribute("id", "patassignee");
		document.body.appendChild(a55);				
				
	// Add US Classification
	    var a56 = document.createElement("a");     		// Create link to US Class Search
		a56.appendChild(document.createTextNode("Main US Classification: "));
        a56.setAttribute("href", getUSClassSrch(usc));
        a56.appendChild(document.createTextNode(usclass));
		a56.className = "pu_usclassSrch";
		a56.setAttribute("id", "usclass");
		document.body.appendChild(a56);
	
	// Add searching notice
		var a59 = document.createElement("a");
		a59.appendChild(document.createTextNode("Searching for the corresponding US Patent..."));
		a59.className = "pu_relcasesrch";
		a59.setAttribute("id", "relcasesrch");
		document.body.appendChild(a59);

										
	// INPADOC only shown for published apps until a fix is found for issued patents
	// EPO INPADOC Family Link
		var a7 = document.createElement("a");
		a7.setAttribute("href", getEPOINPADOC(patno));
		a7.appendChild(document.createTextNode("Patent Family Info"));
		a7.className = "pu_EPOINPADOC"; 
		a7.setAttribute("id", "epoinpadoc");	  
		document.body.appendChild(a7);
/*
		var a17 = document.createElement("a");
		a17.appendChild(document.createTextNode("View EPO's INPADOC patent family"));
		a17.className = "pu_EPOINPADOCnote";
		a17.setAttribute("id", "epoinpadocnote");			
		document.body.appendChild(a17);
*/
	  
	// USPTO Patent Assignment Record 

		var a8 = document.createElement("a");
		a8.setAttribute("href", getPubPatAssign(pubno));
		a8.appendChild(document.createTextNode("Assignment Records"));
		a8.setAttribute("id", "patassign");
		a8.className = "pu_PatAssign";     
		document.body.appendChild(a8);
/*
		var a18 = document.createElement("a");
		a18.appendChild(document.createTextNode("FROM USPTO"));
		a18.className = "pu_PatAssignNote"; 
		a18.setAttribute("id", "patassignnote");		
		document.body.appendChild(a18);	  
*/  
		// GM_log('ending Published patent loop');

} // END PUBLISHED PATENT APPLICATION LOOP

// Add the links
	// GM_log('Adding the links that are shown for both issued and published patents');

// PDF Header
	var a01 = document.createElement("a");
	a01.setAttribute("id", "pdfhead");
    a01.appendChild(document.createTextNode("RETRIEVE A PDF OF THE PATENT FROM:"));
    a01.className = "pu_pdfhead";
    document.body.appendChild(a01);
	
// PAT2PDF link
    var a1 = document.createElement("a");
    a1.setAttribute("href", getpat2pdf(patno));
	a1.setAttribute("id", "pat2pdf");
    a1.appendChild(document.createTextNode("Pat2Pdf.org"));
    a1.className = "pu_pat2pdf";
    document.body.appendChild(a1);
	
	var a11 = document.createElement("a");
    a11.setAttribute("href", "http://www.pat2pdf.org/");
    a11.appendChild(document.createTextNode("Approx 1-2 mins for download"));
	a11.setAttribute("id", "pat2pdfnote");
    a11.className = "pu_pat2pdfnote"; 
	document.body.appendChild(a11);

// Free Patents Online Link
    var a2 = document.createElement("a");
    a2.setAttribute("href", getfreepats(patno));
    a2.appendChild(document.createTextNode("FreePatentsOnline.com"));
	a2.setAttribute("id", "freepats");
    a2.className = "pu_freepats";    
    document.body.appendChild(a2);

    var a12 = document.createElement("a");
    a12.setAttribute("href", "http://www.freepatentsonline.com/register.html");
    a12.appendChild(document.createTextNode("Requires Free Registration"));
	a12.setAttribute("id", "freepatsnote");
    a12.className = "pu_freepatsnote"; 
	document.body.appendChild(a12);

// Google Patents url Link
    var a3 = document.createElement("a");
    a3.setAttribute("href", getgoopats(patno));
    a3.appendChild(document.createTextNode("Google Patents"));
	a3.setAttribute("id", "goopats");
    a3.className = "pu_goopats";     
    document.body.appendChild(a3);

    var a13 = document.createElement("a");
    a13.appendChild(document.createTextNode("Click Download PDF"));
	a13.setAttribute("id", "goopatsnote");
    a13.className = "pu_goopatsnote";     
    document.body.appendChild(a13);

// USPTO Header
	var a02 = document.createElement("a");
	a02.setAttribute("id", "usptohead");
    a02.appendChild(document.createTextNode("RETRIEVE ADDITIONAL INFO FROM USPTO"));
    a02.className = "pu_usptohead";
    document.body.appendChild(a02);
	
// EPO Header
	var a03 = document.createElement("a");
	a03.setAttribute("id", "epohead");
    a03.appendChild(document.createTextNode("RETRIEVE ADDITIONAL INFO FROM EPO"));
    a03.className = "pu_epohead";
    document.body.appendChild(a03);

// EPO url Link
    var a4 = document.createElement("a");
    a4.setAttribute("href", getEPOurl(patno));
    a4.appendChild(document.createTextNode("Patent General Info"));
	a4.setAttribute("id", "epourl");
    a4.className = "pu_EPOurl";     
    document.body.appendChild(a4);

// EPO pdf Link
    var a5 = document.createElement("a");
    a5.setAttribute("href", getEPOpdf(patno));
    a5.appendChild(document.createTextNode("European Patent Office (EPO)"));
	a5.setAttribute("id", "epopdf");
    a5.className = "pu_EPOpdf";     
    document.body.appendChild(a5);

// EPO legal Link
    var a6 = document.createElement("a");
    a6.setAttribute("href", getEPOlegal(patno));
    a6.appendChild(document.createTextNode("Patent Legal Status"));
	a6.setAttribute("id", "epolegal");
    a6.className = "pu_EPOlegal";    
    document.body.appendChild(a6);

// GM_log('ending the important part of the script');
} // END IMPORTANT PART OF THE SCRIPT 
}();