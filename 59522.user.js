// ==UserScript==
// @name           tpb-enhance
// @namespace      tpb-enhance
// @description    Hide seedless torrents, widen search result, bold current page number, sort results by seeders, maintain "single" row view
// @include        http://thepiratebay.org/*
// @include        http://www.thepiratebay.org/*
// @include        http://thepiratebay.com/*
// @include        http://www.thepiratebay.com/*
// ==/UserScript==
(function() {
    var css = "@namespace url(http://www.w3.org/1999/xhtml); ";
    css += "div#main-content { margin: 0 4%;} ";
    css += "div#content tr:last-child td:only-child   { font-weight: bold;} ";
    css += "div#content tr:last-child td:only-child a { font-weight: normal;} ";

    if (typeof GM_addStyle != "undefined") {
        GM_addStyle(css);
    } else if (typeof addStyle != "undefined") {
        addStyle(css);
    } else {
        var heads = document.getElementsByTagName("head");
        if (heads.length > 0) {
            var node = document.createElement("style");
            node.type = "text/css";
            node.appendChild(document.createTextNode(css));
            heads[0].appendChild(node); 
        }
    }

    // Delete table rows where the there are not enough seeders.
    var seederCountPattern = /^\s*[0-1]{1}\s*$/;
    var results = document.getElementById('searchResult');
    if (results) {
        var colLength = results.rows[0].cells.length;
        GM_log(colLength);
        for (i = results.rows.length - 1; i >= 1; i--) {
            if ( (results.rows[i].cells[colLength - 2]) && (seederCountPattern.test(results.rows[i].cells[colLength - 2].innerHTML) == true) ) { // check second to last column
                results.deleteRow(i);
            }
        }
    }
    
    // Change search form to sort by seeders.
    var form = document.forms.namedItem('q');
    var input = form.elements.namedItem('orderby');
    input.value=7;

    // Change browsing links to sort by seeders, if on the /browse page
    if (window.location.pathname === '/browse') {
        var link, i, anchor;
        var numberAtEnd = /(\d+)$/;
        var anchors = document.getElementsByTagName("a");
        for (i = 0; i < anchors.length; i++) {
            anchor = anchors[i];
            anchor.href = anchor.href.replace(numberAtEnd, '$1/0/7');
        }
    }

    // Make an Ajax call to ensure we're in single row view mode

    if (typeof GM_xmlhttpRequest != "undefined") {
	    GM_xmlhttpRequest({
	        'method': 'GET',
	        'url': 'http://' + window.location.host + '/switchview.php?view=s'
	    });
	}
	
})();
