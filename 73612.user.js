// ==UserScript==
// @name          GReader 'Add a subscription" mover
// @namespace     http://userstyles.org
// @author        RNiK
// @version       1.0
// @description	  Move the 'Add a subscription" button next to the 'Search' button
// @include       http://*google.tld/reader/view*
// @include       https://*google.tld/reader/view*
// ==/UserScript==
var AddSubscription = document.getElementById("lhn-add-subscription");
AddSubscription.parentNode.removeChild(AddSubscription);
var Search = document.getElementById("search");
var NewSearch = Search.appendChild(AddSubscription);
NewSearch.setAttribute("style","margin:0 1px;padding:0 0.461em;");
