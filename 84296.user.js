// ==UserScript==
// @name           cpan dependents
// @description    Show the CPAN dependents in the CPAN search results page
// @include        http://search.cpan.org/search*
// ==/UserScript==

var infoblocks_by_module = new Array();
var dists_by_module = new Array();
var dists = new Array();
var dependent_counts = new Array();
var num_dists_fetched = 0;
var num_dists = 0;

for each ( sr in document.getElementsByTagName( 'h2' ) ) {

    // parse the page to get the list of modules
    module = sr.childNodes[0].childNodes[0].innerHTML;

    // keep a reference to the line that shows information about the module
    infoblock = find_sibling_by_tagname(sr, "SMALL", "P", 1);
    if ( ! infoblock ) {
        // edge case - there is no description for this module
        infoblock = find_sibling_by_tagname(sr, "SMALL", "P", 0);
    }

    // keep track of the module distribution 
    if ( infoblock && infoblock.childNodes[1] ) {
        dist = infoblock.childNodes[1].href;
    }
    if ( dist ) {
        dist = dist.replace(/\/$/, '');
        dist = dist.replace(/^.*\//, '');

        dists_by_module[module] = dist;
        infoblocks_by_module[module] = infoblock;
        dists[dist] = 1;
    }
}

// loop through the dists to get the number cpan dependents
// a callback will update the page with the number of dependents for each module
for ( var dist in dists ) {
    num_dists++;
}
for ( var dist in dists ) {
    gather_cpan_dependents(dist);
}

// the DOM for search.cpan.org isn't easy to parse
// this function recursively finds DOM siblings by tagname
function find_sibling_by_tagname(start, tagname, failsafe, iteration) {
    next = start.nextSibling;
    if ( ! next ) {
        return;
    }
    if ( next.tagName ) {
        if ( next.tagName == failsafe ) {
            return;
        }
        if ( next.tagName == tagname ) {
            if ( ! iteration || iteration == 0 ) {
                return next;
            }
            else {
                iteration = iteration - 1;
            }
        }
    }
    return find_sibling_by_tagname(next, tagname, failsafe, iteration);
}

// this queries the external deps.cpantesters.org for the distribution 
// and counts the number of dependents
// and calls the callback to have the page updated for all modules that are part of the distribution
function gather_cpan_dependents(dist) {
    GM_xmlhttpRequest({ 
        method: "GET",
        url: 'http://deps.cpantesters.org/depended-on-by.pl?dist=' + escape(dist),
        onload: function( resp ) {
            num = '0';
            if ( resp.responseText ) {
                num = resp.responseText.split('<li>').length-1;
            }
            dependent_counts[dist] = num;
            add_dependents_to_page(dist);
            num_dists_fetched += 1;
            if ( num_dists_fetched == num_dists ) {
                show_top_dists();
            }
        }
    });
}

// this is the callback to update the page
// for the distribution, it updates the page for each module that is part of the distribution
function add_dependents_to_page(dist) {
    for ( var module in infoblocks_by_module ) {
        if ( infoblocks_by_module[module] && dists_by_module[module] == dist ) {
            infoblocks_by_module[module].innerHTML += "(<a href=\"http://deps.cpantesters.org/depended-on-by.pl?dist=" + dists_by_module[module] + "\">CPAN dependents</a>: " + dependent_counts[dist] + ")";
        }
    }
}

function show_top_dists() {
    var newP = document.createElement("p");
    var txt = 'Distributions in order of number of CPAN dependents: <pre>';
    dependent_counts = assocSort(dependent_counts);
    for ( var dist in dependent_counts ) {
        txt += dist + " (" + dependent_counts[dist] + " dependents)";
        txt += "\n";
        for ( module in infoblocks_by_module ) {
            if ( infoblocks_by_module[module] && dists_by_module[module] == dist ) {
                txt += "    " + module + "\n";
            }
        }
        txt += "\n";
    }
    txt += "</pre>";
    newP.innerHTML = txt;
    document.getElementsByTagName('h2')[0].parentNode.insertBefore(newP,document.getElementsByTagName('h2')[0].previousSibling);
}

// found this function on the interwebs for sorting an associative array by value
function assocSort (oAssoc) {
    var idx; var key; var arVal = []; var arValKey = []; var oRes = {};
    for (key in oAssoc) {
        arVal[arVal.length] = oAssoc[key];
        arValKey[oAssoc[key]] = key;
    }
    arVal.sort().reverse();
    for (idx in arVal)
        oRes[arValKey[arVal[idx]]] = arVal[idx];
    return oRes;
}