// Denver Lib Plus
// Sean LeBlanc

// This script makes the Denver County Library
// website a little more friendly. It can auto-fill
// lastname + cardnumber, as well as auto-select
// the branch you want holds to be saved at.

// Give feedback - seanleblanc @@@ comcast ... net


// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Jefferson - Prospector Library Lookup", and click Uninstall.
//
// * Instruction text lifted from Mark Pilgrim's Butler
// * http://diveintomark.org/projects/butler/
//
//
// ==UserScript==
// @name          DenverLibPlus
// @namespace     http://leblanc.org
// @description	  Configurable improvements to the Denver lib site. NOTE: Requires some configuration within the script! See the section starting with comment "**** CUSTOMIZE STARTING HERE: ****".
// @include       http://*.denver.lib.co.us*
// ==/UserScript==



// Simplify making a FIRST_ORDERED_NODE_TYPE XPath call
function xpathFirst(query, node) {
    if (!node) {
	node = document;
    }

    var result = document.evaluate(query, node, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null );

    if (!result) {
	return;
    }

    return result.singleNodeValue;
}

// Simplify making an UNORDERED_NODE_SNAPSHOT_TYPE XPath call
// Return a snapshot list
function xpathAll(query, node) {
    if (!node) {
	node = document;
    }

    return document.evaluate(query, node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}



if (!GM_xmlhttpRequest || !GM_log) {
    alert('The Denver Lib Plus script requires Greasemonkey 0.5.3 or higher.  Please upgrade to the latest version of Greasemonkey.');
    return;
}


/*
	This keeps the app from timing out.
	Clicks the "go back to what I was doing" link for you 
	after the five minute timeout goes off.
*/
function goBackToWork() {	
	// Check for "go back to what you were doing page":
	for (var i=0; i<document.links.length; i++) {
		if (document.links[i].text=="here" && document.links[i].target=="_top") {
			window.location=document.links[i];	
			break;		
		}
	}	
}

/*
	Fill out user's lastname and cardnumber.
*/
function autoFillUser() {	
	var i=0;
	t = document.forms[0];
	if (t) {					
		var count = t.elements.length - 1;	
		var data = false;
		while( i < count )
		{			
			// Last name:
			if (t.elements[i].name=="id1" ) {
				t.elements[i].value = lastName;
				data = true;
			}
			if (t.elements[i].name=="id0" ) {
				t.elements[i].value = cardNumber;
				data = true;
			}			
			i++;
		} // while
		
		if (data) {
			if (!cardNumber || !lastName) {
				alert("autoFillUser is on, but cardNumber & lastname are not defined. Open script and define them.");
				return;
			}
			t.submit();	
		}
	} 

}

/**
	This selects your favorite branch, 
	and clicks submit.
*/
function autoFillBranch() {
	
	var branchForm = xpathFirst("//FORM[@NAME='branches']");
	if (branchForm) {	
		if (!branchName) {	
			alert("autoFillBranch is on, but no branch set. Open script, and define one.");
			return;
		}
		var count = branchForm.elements.length - 1;	
		var i = 0;
		var data = false;
		while( i < count )
		{			
			// Branch:
			if (branchForm.elements[i].name=="branch") {
				if (0==branchForm.elements[i].value.indexOf(branchName)) {
					GM_log("Checking...");
					branchForm.elements[i].checked = 'checked';
					data = true;
					break;
				}
			}
				
			i++;
		} // while
		if (data) {
			branchForm.submit();
		}
	}
}

function autoBackToCatalog() {
	for (var i=0; i<document.links.length; i++) {
		var img = document.evaluate(".//img[@src='/cgi-icon/ReturnToCatalog.gif']",
			document.links[i], null, XPathResult.FIRST_ORDERED_NODE_TYPE,
				null).singleNodeValue;
		if (img) {
			//GM_log("Found img.");
			window.location=document.links[i];	
			break;		
		}
	}	
}



// **** CUSTOMIZE STARTING HERE: ****
// What features to use:
var GO_BACK_TO_WORK = true; 		// Go back to work; don't timeout after 5 minutes.
var AUTO_FILL_USER = true;			// Fills out user info on login pages.
var AUTO_FILL_BRANCH = true;		// Selects favorite branch during placing hold and clicks submit.
var AUTO_BACK_TO_CATALOG = true;	// Go back to catalog listings after placing a hold is finished.

// Values to use:
var lastName = null;	// Set user name here.
var cardNumber = null;  // Set card number here: Example dXXXXXXXXX.
var branchName = null;  // SET branch name. See comment below. 


// Branch can be one of:

// "ATHMAR "  > Athmar Park Branch                      
// "BARNUM "  > Ross-Barnum Branch                      
// "BEARV  "  > Bear Valley Branch                      
// "BLAIR  "  > Blair-Caldwell AARL                     
// "BMOBIL "  > Bookmobile                              
// "BROADW "  > Ross-Broadway Branch                    
// "BYERS  "  > Byers Branch                            
// "CENTRL "  > Central Library - 13th & Broadway       
// "CREEK  "  > Ross-Cherry Creek Branch                
// "DECKER "  > Decker Branch                        
// "FIELD  "  > Eugene Field Branch     
// "FORD   "  > Ford-Warren Branch                      
// "HADLEY "  > Hadley Branch                           
// "HMPDEN "  > Hampden Branch                          
// "MONTBL "  > Montbello Branch                        
// "PARKH  "  > Park Hill Branch                        
// "ROBINS "  > Pauline Robinson Branch                 
// "SCHLES "  > Schlessman Family Branch                
// "SMILEY "  > Smiley Branch                           
// "UHILLS "  > Ross-University Hills Branch            
// "VALDEZ "  > Valdez-Perry Branch                     
// "VILAGE "  > Virginia Village Branch                 
// "WOODBY "  > Woodbury Branch    

// **** END OF CUSTOMIZE SECTION. ****








if (GO_BACK_TO_WORK) goBackToWork();
if (AUTO_FILL_USER) autoFillUser();
if (AUTO_FILL_BRANCH) autoFillBranch();
if (AUTO_BACK_TO_CATALOG) autoBackToCatalog();
	
	





