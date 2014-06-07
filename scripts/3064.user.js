// ==UserScript==
// @name          CincinnatiPublicLibraryLookup
// @namespace     http://weblog.infoworld.com/udell
// @description   Automatically check the availability of a book in the 
// Cincinnati Public Library system when browsing Amazon.com
// This is version 0.3
// Now adds a semi-transparent div in the right hand column to show if the book
// is available.
// --version 0.2 --
// Fixed a bug that caused the script not to evaluate the regex appropriately.
// @include       http://*.amazon.*
// ==/UserScript==
//
// This is based on the fine work by Jon Udell ( http://weblog.infoworld.com/udell )
//

(

function()
{

var libraryUrlPattern = 'http://catalog.cincinnatilibrary.org/uhtbin/isbn/'
var libraryName = 'Cincinnati Public';
var libraryAvailability = /(copy available)|(copies available)/;
var libraryDueBack = /DUE (\d{2}\-\d{2}\-\d{2})/;
var notFound = /found no matches in the library/

var libraryLookup = 
    {
    insertLink: function(isbn, hrefTitle, aLabel, due )
        {
/*
        var div = origTitle.parentNode;
        var title = origTitle.firstChild.nodeValue;

        var newTitle = document.createElement('b');
        newTitle.setAttribute('class','sans');

        var titleText = document.createTextNode(title);
        newTitle.appendChild(titleText);
        
        var sp = document.createTextNode(' ');

        var link = document.createElement('a');
        link.setAttribute ( 'title', hrefTitle );
        link.setAttribute('href', libraryUrlPattern + isbn);

        var label = document.createTextNode( aLabel );

        link.appendChild(label);

        div.insertBefore(newTitle, origTitle);
        div.insertBefore(sp, origTitle);
        div.insertBefore(link, origTitle);
        div.removeChild(origTitle);
*/
        var notice = document.createElement("div");
        notice.innerHTML = '<div id="CincyLibraryNotice" style="background-color:#abcdef;position:absolute; top: 15px; left: 15px;opacity:.80;">' +
                           '<a href="' + libraryUrlPattern + isbn + '">' + aLabel + 
                           '</a> <sup>[ <a onClick="document.getElementById(\'CincyLibraryNotice\').style.visibility = \'hidden\';" href="#">X</a> ]</sup></div>';
        document.body.insertBefore(notice, document.body.firstChild);
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
                if ( libraryAvailability.test(page) )
                    {
                    GM_log("found");
                    libraryLookup.insertLink (
                      isbn,
                      "On the shelf now!",
                      "Available in the " + libraryName + " Library!"
                       );
                    }
                else if ( libraryDueBack.test(page) )
                    {
                    GM_log("due");
                    var due = page.match(libraryDueBack)[1]
                    libraryLookup.insertLink (
                        isbn,
                        "Due back " + due,
                        "Due back at the " + libraryName + " Library on " + due
                        );
                    }
                else if ( notFound.test(page) )
                    {
                    GM_log("not found");
                    libraryLookup.insertLink (
                        isbn,
                        "Not carried",
                        "Not in " + libraryName + " Library",
                        "red"
                        );
                    }
                }
            });
        }


    }

try { 
    //GM_log('trying to do the regex');
    var isbn = window.location.href.match(/\/(\d{7,9}[\d|X])\//)[1];  
    //GM_log('regex did not cause an error');
} catch (e) { 
    GM_log('exception: ' + e);
    return; 
}

var origTitle = document.evaluate("//b[@class='sans']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;

//GM_log('origTitle: ' + origTitle);

if ( ! origTitle )
  { return; }

libraryLookup.doLookup(isbn);

}
)();