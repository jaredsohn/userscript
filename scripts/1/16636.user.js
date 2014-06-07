// ==UserScript==
// @name           CPAN Search Enhancer
// @namespace      http://hexten.net/
// @description    Add links to CPAN
// @include        http://search.cpan.org/*
// ==/UserScript==

var new_links = {
    'CPAN Dependencies': function(url, name) {
        return 'http://cpandeps.cantrell.org.uk/?module='
            + escape(make_module_name(name));
    },
    'CPANTS': function(url, name) {
        return 'http://cpants.perl.org/dist/overview/'
            + escape(name);
    }
};

function canonical_url() {
    var permalink = document.getElementById('permalink');
    if (permalink) {
        return permalink.firstChild.href;
    }
    return '';
}

function trim_url(url) {
    return url.replace(/^http:\/\/[^\/]+\/[^\/]+\//, '').replace(/\/$/, '');
}

function make_module_name(dist_name) {
    return dist_name.replace(/-/, '::');
}

function add_links(nd) {
    var end = nd.lastChild;
    nd.removeChild(end);
    var dist_url  = canonical_url();
    var dist_name = trim_url(dist_url);
    // console.log(dist_name + ' ' + dist_url);
    var keys = [];
    for (var k in new_links) {
        keys.push(k);
    }
    keys = keys.sort();
    for (var l = 0; l < keys.length; l++) {
        nd.appendChild(document.createTextNode(" ]\n[ "));
        var name = keys[l];
        var link = document.createElement('A');
        link.href = new_links[name](dist_url, dist_name);
        link.innerHTML = name;
        nd.appendChild(link);
        // console.log(name + " " + link);
        
    }
    nd.appendChild(end);
}

var rows = document.getElementsByTagName('tr');
if (rows) {
    for (var r = 0; r < rows.length; r++) {
        var cells = rows[r].getElementsByTagName('td');
        if (cells.length == 2 && cells[0].innerHTML == 'Links') {
            add_links(cells[1].firstChild);
        }
    }
}
