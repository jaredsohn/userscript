// ==UserScript==
// @name          Ohio State Library in Amazon
// @namespace     
// @description   Yet another script based on John Udell's LibraryLookup, this time for the Ohio State University library. The script displays, on amazon, the current status of a book in the OSU library (available, or when it is due, or that it is on order, etc.)
// @include       *.amazon.*/*
// ==/UserScript==

(

function()
{

var libraryUrlPattern = 'http://library.ohio-state.edu/search/i?SEARCH=';
var libraryName = 'OSU';
var libraryAvailability = /AVAILABLE/;
var libraryOnOrder = /ON ORDER/;
var libraryInProcess = /IN PROCESS/;
var libraryDueBack = /DUE (\d{2}-\d{2}-\d{2})/;
var notFound = /No matches found/;

var libraryLookup = 
    {
    insertLink: function(isbn, hrefTitle, aLabel, color )
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
        link.setAttribute('href', libraryUrlPattern + isbn);
        link.setAttribute('style','color: ' + color);

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
            onload: function (results)
                {
                page = results.responseText;
                if ( notFound.test(page) )
                    {
                    libraryLookup.insertLink (
                        isbn,
                        "Not carried",
                        libraryName + ": not found (maybe another edition?)",
                        "red"
                        );
                    }
                else if ( libraryAvailability.test(page) )
                    {
                    libraryLookup.insertLink (
                        isbn,
                        "On the shelf now!",
                        libraryName + ": available",
                        "green"
                        );
                    }
                else if ( libraryOnOrder.test(page) )
                    {
                    libraryLookup.insertLink (
                        isbn,
                        "On order!",
                        libraryName + ": on order",
                        "#AA7700"  // dark yellow
                        );
                    }                    
                else if ( libraryInProcess.test(page) )
                    {
                    libraryLookup.insertLink (
                        isbn,
                        "In process!",
                        libraryName + ": in process",
                        "#AA7700"  // dark yellow
                        );
                    }                    
                else if ( libraryDueBack.test(page) )
                    {
                    var due = page.match(libraryDueBack)[1]
                    libraryLookup.insertLink (
                        isbn,
                        "Due back " + due,
                        libraryName + ": due " + due,
                        "#AA7700"  // dark yellow
                        );
                    }
                else
                    {
                    libraryLookup.insertLink (
                        isbn,
                        "Error",
                        libraryName + ": error",
                        "orange"
                        );
                    }
                }
            });
        }


    }


try     { 
    var isbn = window.location.href.match(/\/(\d{7,9}[\d|X])\//)[1];  
    }

catch (e)    { return; }var origTitle = document.evaluate("//b[@class='sans']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;if ( ! origTitle )  { return; }libraryLookup.doLookup(isbn);})();

