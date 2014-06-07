// ==UserScript==
// @name           Initial Focus
// @namespace      http://nomadlabs.com
// @include        http://www.amazon.*/
// @include        http://*.craigslist.*/
// @description    Sets the focus on the "appropriate" field for a given website - usually the search field.
// ==/UserScript==

var foci = {
    amazon: "twotabsearchtextbox",
    craigslist: "query",
}

function setDesiredFocus(host) {
    alert(host);
    if foci[host]
        document.getElementById(foci[host]).focus();
}

var hostParts = window.location.host.split('.').reverse();
for host in hostParts {
    if foci[host] {
        setDesiredFocus(host);
    }
}
