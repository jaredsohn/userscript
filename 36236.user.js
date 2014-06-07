// ==UserScript==
// @name           amazondekalb.user.js
// @namespace      www.kleinfelter.com
// @description    Looks up ISBN from Amazon on Dekalb County (Georgia) Public library web site.  Since DeKalb keeps changing its ISBN lookup, this user script works as of October 29, 2008.  if they change ISBN lookup again, it will probably break.
// @include        http://www.amazon.com/*
// ==/UserScript==

(

function() {


// *************** BEGIN LIBRARY SPECIFIC CONTENT *************************
//var libraryUrlPattern = 'http://findit.dekalblibrary.org/uPortal/Initialize?doSearch=true&uP_tparam=props&props=CAS&uP_sparam=activeTab&activeTab=2&index1=ISBNEX&term1='
var libraryUrlPattern = 'http://findit.dekalblibrary.org/ipac20/ipac.jsp?&index=ISBNEX&term=';
var libraryName = 'Dekalb County';
var notFound = /We were unable to find/;


// These are checked in sequence and the *first* match is reported.
var status = []; var ix=0;
status[ix++] = /Checked In/;
status[ix++] = /Just Returned/;
status[ix++] = /Checked out/;
status[ix++] = /Item being held/;
status[ix++] = /Transit Request/;
status[ix++] = /Trace/;
// *************** END LIBRARY SPECIFIC CONTENT *************************


var idConfig = "randomStringHereToEnsureUniqueness20080620";
var theDiv;
var theStyle;
var debugTitle = "Debugging Message";

function alterMyDivText(isbn, theText, theTitle, newColor) {
    var t;
    
    if (theTitle == debugTitle) {
        // Remove the next line when you want to see ALL the debugging text.
        theText = theText.substr(0, 80);
    }
    
    t = document.getElementById("AmazonDekalbId");
    t.firstChild.nodeValue = theTitle + ": " + theText;

    var st = theDiv.getAttribute("style");
    theDiv.setAttribute("style", theStyle);
	theDiv.style.display = 'block';
	theDiv.style.background = newColor;
}

function hideMyDiv(e) {
    theDiv.setAttribute("style", "opacity: 0; z-index: 0; background: #FFF;");
    if (e.which > 1) {
        gotoLibrary();
    }
}

function gotoLibrary() {
    alert("open the library window here");
}

var libraryLookup = 
    {

    cleanStatusString: function(messy) 
    {
        if (messy.substr(0, 1) == '/') {
            return messy.substr(1, messy.length - 2);
        } else {
            return messy;
        }
    },

    alterLink: function(aIsbn, aText, aTitle, aColor )
    {
    alterMyDivText(aIsbn, aText, aTitle, aColor);
    },
    
    insertLink: function(isbn, hrefTitle, aLabel, color )
    {
      
    		var c = document.createElement("div");
    		c.setAttribute("style", "margin: 3em 15%; position: fixed; top: 0; left: 0; "
    		                 + "border: thin solid black; color: black; background: "
    		                 + color + "; opacity: 0.8; " +
    						 "font-size: 10pt; " +
    						 "z-index: 99999; padding: 1px; display: none; " +
    						 "font-family: Arial, sans-serif;");
    		theStyle = c.getAttribute("style");
    		c.setAttribute("id", idConfig);
            theDiv = c;
    
    		var form = document.createElement("form");
    		form.setAttribute("method", "get");
    		form.setAttribute("action", "");
    		form.setAttribute("id", idConfig + 'Form');
    		form.setAttribute("style", "padding: 0; margin: 0;");
    		var myDiv = document.createElement("div");
    		myDiv.setAttribute("style", "width: 100%; margin: 2px; padding: 2px; border-spacing: 0; ");
    		myDiv.setAttribute("id", "AmazonDekalbId");
    		form.appendChild(myDiv);
    
    		var btext = document.createTextNode(aLabel);
    		myDiv.appendChild(btext);
            myDiv.addEventListener('mouseup', hideMyDiv, true);
    		c.appendChild(form);
    
    		var b = document.getElementsByTagName("body");
    		b[0].appendChild(c);
    		c.style.display = 'block';
    },


    doLookup: function ( isbn )
        {
        alterMyDivText("", "ISBN:" + isbn + "...", "Library look-up in progress", "#CFA");
        //alert("ISBN:" + isbn);
        GM_xmlhttpRequest
            ({
            method:'GET',
            url: libraryUrlPattern + isbn,
            onload:function(results) {
                alterMyDivText("", "ISBN lookup completed...", debugTitle, "#CFA");
                page = results.responseText;
                alterMyDivText("", "Lookup results:" + page + "...", debugTitle, "#CFA");
                if ( notFound.test(page) ) {
                    var due = page.match(notFound)[1]
                    libraryLookup.alterLink (
                        isbn,
                        "Not carried",
                        "This book is not in " + libraryName + " Library",
                        "#FCA"
                        );
                
                } else {
			var i;
			for (i = 0; i < status.length; i++) {
				if (status[i].test(page)) {
				    //alert("Found a MATCH");
				    var tmpStr = status[i].toString();
				    tmpStr = libraryLookup.cleanStatusString(tmpStr);
				    libraryLookup.alterLink (
					isbn,
					tmpStr,
					"Status at " + libraryName + " is",
					"#CFA");
				    i = status.length + 99;
                    		}
			}

		    }
		}
            });
        }
    };

try 
    { 
        libraryLookup.insertLink (
            "isbn-here",
            "status-here",
            "Searching " + libraryName + " Library",
            "#FCA"
            );

        alterMyDivText("", "Checking Amazon page for isbn...", debugTitle, "#CFA");
        var isbn = window.content.location.href.match(/\/(\d{7,9}[\d|X])\//)[1];
        alterMyDivText("", "Checked Amazon page for isbn...", debugTitle, "#CFA");
        if (isbn) {
            alterMyDivText("", "ISBN located on Amazon page...", debugTitle, "#CFA");
        } else {
            alterMyDivText("", "ISBN not found on Amazon page.", debugTitle, "#CFA");
        }
    }
catch (e)
    { 
        alterMyDivText("", "Can't find an ISBN on this page.", "", "#CFC");
        theDiv.style.background = "#DDF";
    	theDiv.style.opacity = "0.5";
        return; 
    }


libraryLookup.doLookup(isbn);

}
)();
