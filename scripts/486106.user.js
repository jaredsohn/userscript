// ==UserScript==
// @name        Redirect to OpenStreetMap Changeset
// @namespace   http://userscripts.org/users/69817
// @include     http*://www.openstreetmap.org/api/*/changeset/*/download
// @version     1
// ==/UserScript==

var show_confirm = true;

var redirect_by_default = false;    // acts if show_confirm=false

/*
 
 http://www.openstreetmap.org/api/0.6/changeset/21978076/download
 
 http://www.openstreetmap.org/changeset/21978076
 
*/

var url = location.href;

//alert(location.href);

url = url.replace(/\/download$/, '');
url = url.replace(/\.org\/.*\/changeset/, '.org/changeset');

//alert(url);

var answer = undefined;

if (show_confirm) {
    answer = confirm("Do you want to view the changeset on the website?");
    if (answer) {
        location.href = url;
    }
} else {
    if (redirect_by_default) {
        location.href = url;
    }
}

function go() {
    location.href = url;
}

GM_registerMenuCommand("Show changeset on openstreetmap.org", go);

