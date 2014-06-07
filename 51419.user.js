// ==UserScript==
// @name           Organization Donation Links

// @namespace      DeNada

// @description    Under My Places - Organizations, changes links beside organization pictures into a direct link to donate to them.
// @include        http://www.erepublik.com/en/my-places/organizations

// ==/UserScript==

var allLinks = document.getElementsByClassName('nameholder dotted');

for(var i=0; i < allLinks.length; i++) {
    // check if the link href matches pattern
        allLinks[i].href = allLinks[i].href.replace('organization','organization/donate/items');
}