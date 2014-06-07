// ==UserScript==
// @name           Donations and Messages
// @description	   eRepublik script adds Donation and Message links to Employee page
// @author	   Endy
// @namespace      DeNada
// @include        http://www.erepublik.com/en/company-employees/*
// ==/UserScript==

var allLinks = document.getElementsByClassName('dotted');
var junk = '';
var stuff = '';
var newElement = '';

for(var i=0; i < allLinks.length; i++) {

        stuff = allLinks[i].href.replace('citizen/profile','messages/compose');
        junk = allLinks[i].href.replace('profile','donate/items');

    	newElement = document.createElement('a');
newElement.innerHTML = '<br> <a title="Donate" href="'+junk+'"><img alt="Donate" src="/images/parts/gold-from.gif" /></a> <a title="Send message" href="'+stuff+' "><img alt="Send message" src="/images/parts/btn-icon_send-message.gif" /></a>';
    	allLinks[i].parentNode.insertBefore(newElement, allLinks[i].nextSibling);
}


