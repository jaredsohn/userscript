// Ottawa MLS Google Maps integration
// version 0.4
// 2008-06-01
// Copyright (c) 2008, Stephen Morton 
// emailstephendotc
//    dotmorton.at
//    gmail.com
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and then select File->Open File and open this script.
// Accept the install.
//
// To uninstall, go to Tools/Greasemonkey/Manage User Scripts,
// select "OttawaMLS Google Maps", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          OttawaMLS Google Maps
// @namespace     http://www.jamas.net/
// @description   Linkifies addresses in Ottawa MLS for GoogleMaps.  Short and simple.
// @include       http://oreb.mlxchange.com/*
// @include        http://www.mls.ca/PropertyDetails.aspx*
// ==/UserScript==
//
// Possible enhancements:
// * Use the postal codel, rather than just "Ottawa ON Canada" because rural addresses probably don't work.
// * Insert the link into the "URL Map:" field

function StandardAbbreviations(address)
{
    address = address.replace(/\bAV\b/, "Ave");
    address = address.replace(/\bBL\b/, "Blvd");
    address = address.replace(/\bPR\b/, "Pvt");
    return (address);
}

function FullAddress(address)
{
	address = address.replace(/&nbsp;/g, ' ');
	address = address.replace(/<br>/ig, ',');
	address = address.replace(/\n/g, ' ');
	address = address.replace(/\r/g, ' ');
	address = address.replace(/\s*,\s*$/,'');
	if (address.search(/Ottawa/) == -1)
		address = address + ", Ottawa, ON";
	if (address.search(/Canada/) == -1)
		address = address + ", Canada";
    return (address);
}

function AddressToGoogleLink(address)
{
    fullAddress = FullAddress(StandardAbbreviations(address));
    googleURL = 'http://maps.google.ca?q=' + escape(fullAddress);
    newHTML = '<a target="_blank" href="' + googleURL + '">' + address + '</a>';
    return newHTML;   
}

function SelectorLink(document) {
    if (document.title != "Email Report Action")
        return;
    addressSelector= document.getElementsByName( 'RecordIDList' )[0];
    addressIndex = addressSelector.selectedIndex;


    var address=addressSelector.options[addressSelector.selectedIndex].textContent;
    address = address.replace(/^[0-9]+ /,"");
    s = document.createElement("span");
    s.innerHTML = AddressToGoogleLink(address);
    document.firstChild.lastChild.insertBefore(s, document.firstChild.lastChild.firstChild);
}

function AgentMainFrameLink(document)
{
    x = document.evaluate("//span/nobr[contains( ., 'OTTAWA REAL ESTATE BOARD' )]", document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
    if (x.snapshotLength > 0)
    {
        var address = x.snapshotItem(0).parentNode.nextSibling.nextSibling.firstChild.innerHTML;
        x.snapshotItem(0).parentNode.nextSibling.nextSibling.firstChild.innerHTML = AddressToGoogleLink(address);

    }
}
function RegularMainFrameLink(document)
{
    x = document.evaluate("//td/span[contains( ., 'Location' )]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
    if (x.snapshotLength > 0)
    {
        var address = x.snapshotItem(0).nextSibling.innerHTML;
		address = address.replace(/^\s+:\s+/, '');
		address = address.replace(/\s+$/, '');
        x.snapshotItem(0).nextSibling.innerHTML = AddressToGoogleLink(address);
    }
}

/*
// For debugging:
frame = document.getElementsByTagName("frame")[0].contentDocument;
x = frame.evaluate("//span/nobr[contains( ., 'OTTAWA REAL ESTATE BOARD' )]", frame, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
x.snapshotItem(0).parentNode.nextSibling.nextSibling.firstChild.innerHTML;
*/
RegularMainFrameLink(document);
AgentMainFrameLink(document);
//SelectorLink(document);
