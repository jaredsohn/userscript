// ==UserScript==
// @name          LibraryLookup
// @namespace     http://amit.chakradeo.net/LibraryLookup
// @description   Check availability in San Diego libraries
// @include       *.amazon.*/*
// ==/UserScript==

// Requires at least ver 0.2.6 of Greasemonkey
// Tweaked by Bill Stilwell (bill@marginalia.org) for the VPL lookup,
// all the clever stuff is Mr. Udell.
// Further tweaks by Amit Chakradeo for San Diego Public Library lookup

(

function()
{

var sdpl = 
  {
    searchURL: 'http://sdplweb.sannet.gov/web2/tramp2.exe/do_authority_search/guest?SETTING_KEY=English&location_group_filter=all&servers=1home&index=(&query=',
    name: 'San Diego Public Library',
    available: /Item Holdings/
  };
    
var sdcl = 
  {
    searchURL: 'http://sdcl.org/search/?searchtype=i&searcharg=',
    name: 'San Diego County Library',
    available: /Status/
  };

var libraryLookup = 
    {
    insertLink: function(node, hrefTitle, aLabel, url )
        {
        var div = node.parentNode;

        var br = document.createElement('br');

        var link = document.createElement('a');
        link.setAttribute ( 'title', hrefTitle );
        link.setAttribute('href', url);
        link.setAttribute('class', 'gm_amazon');
        link.setAttribute('style', 'font-weight: bold; color: #F00; background-color:#FEE; border: thin dashed blue;');

        var label = document.createTextNode( aLabel );
        link.appendChild(label);

        div.insertBefore(link,node.nextSibling);
        div.insertBefore(br,link);
        },

    doLookup: function ( isbn, liby, node )
        {
        GM_xmlhttpRequest
            ({
            method:'GET',
            url: liby.searchURL + isbn,
            onload:function(results)
                {
                page = results.responseText;
                if ( liby.available.test(page) )
                    {
                    libraryLookup.insertLink (
                      node,
                      "On the shelf now!",
                      "Hey! It's available in the " + liby.name+"!" ,
                      liby.searchURL+isbn
                       );
                    }
                }
            });
        }


    }

try 
    { var isbn = window._content.location.href.match(/\/(\d{7,9}[\d|X])\//)[1];  }
catch (e)
    { return; }


var origTitle = document.evaluate("//b[@class='sans']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;

if ( ! origTitle )
  { return; }

libraryLookup.doLookup(isbn,sdcl, origTitle);
libraryLookup.doLookup(isbn,sdpl, origTitle);

}
)();
