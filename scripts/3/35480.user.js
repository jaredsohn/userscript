// ==UserScript==
// @name           Amazon Link to San Diego Libraries
// @namespace      shervey.userscripts.org
// @include        *.amazon.*/*
// ==/UserScript==

// All the clever stuff is Mr. Udell.
// Tweaks and fixes by Shaun Hervey

(

function()
{


var sdpl = {
    searchURL: 'https://sddp.sirsi.net/uhtbin/cgisirsi/x/x/0/5?library=ALL&user_id=catalog&srchfield1=GENERAL^SUBJECT^GENERAL^^words+or+phrase&submit=Find+It+!&searchdata1=',
	libraryName: 'San Diego Public Library',
    availableStr: /Item Information/
};
    
var sdcl = {
	searchURL: 'http://dbpcosdcsgt.co.san-diego.ca.us/search/?searchtype=i&searchscope=38&SORT=D&extended=0&SUBMIT=Search&searchlimits=&searcharg=',
	libraryName: 'San Diego County Library',
	availableStr: /Author/
};
 
var ucsd = {
	searchURL: 'http://ucsd.worldcat.org/search?qt=advanced&q=isbn%3A',
	libraryName: 'UCSD Library',
	availableStr: /Author/
};

var sdsu = {
	searchURL: 'http://libpac.sdsu.edu/search/~?searchtype=i&SORT=D&searcharg=',
	libraryName: 'SDSU Library',
	availableStr: /Author/
};

var libraryLookup = {

    insertLink: function(node, hrefTitle, aLabel, url ) {
        var link = document.createElement('a');
        link.setAttribute ( 'title', hrefTitle );
        link.setAttribute('href', url);
        link.setAttribute('class', 'gm_amazon');
        link.setAttribute('style', 'font-weight: bold; color: #F00;');

        var label = document.createTextNode( aLabel );
        link.appendChild(label);
        
        var div = document.createElement("div");
        div.style.display = "block";
        div.style.padding = "3px";
        
        div.appendChild(link)
		node.parentNode.parentNode.appendChild(div);
    },

    doLookup: function ( isbn, liby, node ) {
        GM_xmlhttpRequest
            ({
            method:'GET',
            url: liby.searchURL + isbn,
            onload:function(results)
                {
                page = results.responseText;
                if ( liby.availableStr.test(page) )
                    {
                    libraryLookup.insertLink (
                      node,
                      "On the shelf now!",
                      "Available in a " + liby.libraryName + "!" ,
                      liby.searchURL+isbn
                       );
                    }
                }
            });
    }
}

try { 
	var isbn = window.content.location.href.match(/\/(\d{7,9}[\d|X])\//)[1];
} catch (e) { 
	return; 
}

// Get the Amazon element that contains the title
var origTitle = document.getElementById("btAsinTitle");

if ( ! origTitle ) { 
	return; 
}

libraryLookup.doLookup(isbn, sdpl, origTitle);
libraryLookup.doLookup(isbn, sdcl, origTitle);
libraryLookup.doLookup(isbn, ucsd, origTitle);
libraryLookup.doLookup(isbn, sdsu, origTitle);

}
)();
