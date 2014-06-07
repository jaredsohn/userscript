// JavaScript Document

// ==UserScript==
// @name          Barnes & Noble-Kent Memorial Library Lookup
// @namespace     http://www.mundell.org
// @description	  Search Kent Memorial Library catalog with BN listings.
// @include       http://*.barnesandnoble.*
// ==/UserScript==

// fixed for Firefox 1.5 and GM 0.6.4

(

function()
{

var libraryUrlPattern = ' http://bibcat2.biblio.org/ipac20/ipac.jsp?profile=suffld&index=.ET&term='

var libraryName = 'Kent Memorial';
var libraryAvailability = /Checked In/;
var libraryOnOrder = /(\d+) Copies On Order/;
var libraryInProcess = /Pending/; 
var libraryHolds = /Current Requests: (\d+)/;
var libraryCopies = /Reservable copies: (\d+)/;
var libraryDueBack = /(\d{2}\/\d{2}\/\d{4})/;
var notFound = /Sorry, could not find anything matching/

var libraryLookup = 
    {
    insertLink: function(isbn, hrefTitle, aLabel, color)
        {
        var div = origTitle.parentNode;
        var title = origTitle.firstChild.nodeValue;

        var newTitle = document.createElement('b');
        newTitle.setAttribute('class','sans');

        var titleText = document.createTextNode(title);
        newTitle.appendChild(titleText);
        
        var br = document.createElement('br');

        var link = document.createElement('a');
        link.setAttribute ( 'title', hrefTitle );
        link.setAttribute('href', libraryURLPatternForLink + isbn);
        link.setAttribute('style','color: ' + color + '\;' + 'background-color:#FFFF99; font-size:70%');

        var label = document.createTextNode( aLabel );

        link.appendChild(label);

        div.insertBefore(newTitle, origTitle);
        div.insertBefore(br, origTitle);
        div.insertBefore(link, origTitle);
        div.removeChild(origTitle);
        },

    insertNoMatchLink: function(TheTitle, hrefTitle, aLabel, color)
        {
        var div = origTitle.parentNode;
        var title = origTitle.firstChild.nodeValue;

        var newTitle = document.createElement('b');
        newTitle.setAttribute('id','title');

        var titleText = document.createTextNode(title);
        newTitle.appendChild(titleText);
        
        var br = document.createElement('br');

        var link = document.createElement('a');
        link.setAttribute ( 'title', hrefTitle );
        link.setAttribute('href', libraryURLPatternForNoMatch + TheTitle);
        link.setAttribute('style','color: ' + color + '\;' + 'background-color:#FFFF99; font-size:70%');

        var label = document.createTextNode( aLabel );

        link.appendChild(label);

        div.insertBefore(newTitle, origTitle);
        div.insertBefore(br, origTitle);
        div.insertBefore(link, origTitle);
        div.removeChild(origTitle);
        },
		
    doLookup: function ( isbn )
        {
        GM_xmlhttpRequest
            ({
            method:'GET',
            url: libraryUrlPattern + isbn,
            onload:function(results)
                {
                page = results.responseText;
                if ( notFound.test(page) )
                    {
                    var due = page.match(notFound)[1]
                    libraryLookup.insertNoMatchLink (
                        TheTitle,
                        "Check for other editions",
                        "This edition not in " + libraryName + " Library. Click to check for other editions.",
                        "red"
                        );
                    }
				else if ( libraryAvailability.test(page) )
                    {
					var copies = page.match(libraryCopies)[1]
                    libraryLookup.insertLink (
                        isbn,
                        "On the shelf now!",
                        "Available in " + libraryName + " Library!  (Library owns " + copies + " copies)",
                        "green"
                        );
                    }
                else if ( libraryOnOrder.test(page) )
                    {
					var CopiesOnOrder = page.match(libraryOnOrder)[1]
					var holds = page.match(libraryHolds)[1]
                    libraryLookup.insertLink (
                        isbn,
                        "On order!",
                        "Request from " + libraryName + " Library (" + CopiesOnOrder + " copies on order, " + holds + " requests)",
                        "#AA7700"  // dark yellow
                        );
                    }                    
                else if ( libraryInProcess.test(page) )
                    {
					var copies = page.match(libraryCopies)[1]
                    libraryLookup.insertLink (
                        isbn,
                        "In process!",
                        "Available soon at " + libraryName + " Library! (" + copies + " copies pending)" ,
                        "#AA7700"  // dark yellow
                        );
                    }                    
                 else if ( libraryHolds.test(page)  )
                    {
                    var holds = page.match(libraryHolds)[1]
                    var copies = page.match(libraryCopies)[1]
                    var due = page.match(libraryDueBack)[1]
                    libraryLookup.insertLink (
                        isbn,
                        holds + " Holds",
                        "Request from " + libraryName + " Library (currently " + holds + " requests on " + copies + " copies)",
                        "#AA7700"   //dark yellow
                        );
                    }
				else if ( libraryDueBack.test(page) )
                    {
                    var due = page.match(libraryDueBack)[1]
                    libraryLookup.insertLink (
                        isbn,
                        "Due back " + due,
                        "Due back at " + libraryName + " Library on " + due,
                        "#AA7700"  // dark yellow
                        );
                    }
                else
                    {
                    libraryLookup.insertLink (
                        isbn,
                        "Error",
                        "Error checking " + libraryName + " Library",
                        "orange"
                        );
                    }
                }
            });
        }


    }

// var isbn = window.genTextSm.location.href.match(/isbn=(\d{7,9}[\d|X])/)[1];

/*
var isbn;
for (var i  in document.anchors) {
	if (i.href != null) {
	  alert(i.href);	
	  if (i.href.match(/selection=(\d{7,9}[\d|X])/)) {
	    isbn = i.href.match(/selection=(\d{7,9}[\d|X])/);
	  }
	}
}
*/

/*
try 
    { var isbn = window.content.location.href.match(/\/(\d{7,9}[\d|X])\//)[1];  }
catch (e)
    { return; }
*/

var origTitle = document.evaluate("//h1[@id='title']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
var TheTitle = origTitle.textContent ;

var isbnNode = document.evaluate("//li[@class='isbn']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
var rawisbn = isbnNode.textContent ;
var isbn = rawisbn.match(/\d{1,12}[\d|X]/);

if ( ! origTitle )
  { return; }

libraryLookup.doLookup(isbn);

}
)();