// ==UserScript==
// @name                boligportal.dk address google mapper
// @namespace	        tag:userscripts.org/users/Shaedar,2014-03-23:BP
// @description	        Adds links on boligportal.dk's results to google map for property address. Worked on chrome+tampermonkey on 2014-03-23
// @version    0.3
// @include		http://www.boligportal.dk/en/lejebolig/*
// @include		http://www.boligportal.dk/lejebolig/*
// ==/UserScript==

function addLingToMaps(elmFoo, address)
{
   
    var elmNewContent = document.createElement('a');
	elmNewContent.href = 'https://www.google.com/maps/place/' + address;
	elmNewContent.appendChild(document.createTextNode('[GM]'));
    
    elmFoo.appendChild(elmNewContent);
}

//Putting [GM] link to detail page.
var elmFoo = document.getElementsByClassName('addressSubheadLine')[0];
if (elmFoo != null)
{
	addLingToMaps(elmFoo, elmFoo.innerHTML);
}

//Removing stupid onclicks from search results
var lejeboligTables = document.getElementsByClassName('lejebolig ');
for (var i = 0; i < lejeboligTables.length; i++)
{
    lejeboligTables[i].removeAttribute('onclick');
}

//Putting links to addresses.
var bposts = document.evaluate('//*[@id="bpost"]',document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
for (var j = 0; j < bposts.snapshotLength; j++)
{
	var elem = bposts.snapshotItem(j);
    if (elem != null)
    {
        addLingToMaps(elem, elem.innerText);
    }
}