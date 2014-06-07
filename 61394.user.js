// ==UserScript==
// @name           Anandtech VB - Contacts on left
// @namespace      hg
// @description    Adds contact/buddy list to the left navigation menu
// @include        http://forums.anandtech.com/*
// ==/UserScript==

var placement = 'top';

// -- Find Left Side --
var navsearch = document.evaluate("//tbody[@id='collapseobj_leftsidebar_1']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
if(navsearch.snapshotLength > 0) 
{ 
    var nav = navsearch.snapshotItem(0);
    var navtable = nav.parentNode;
    var navparent = navtable.parentNode;
}
else { return; }
// !-- Find left side --


// -- Get buddy list in Iframe --
var iframe = document.createElement('iframe');
iframe.addEventListener("load",loadbuddy,false);
iframe.style.visibility = 'hidden';
iframe.src = 'http://forums.anandtech.com/misc.php?do=buddylist&focus=1';
document.body.appendChild(iframe);
// !-- Buddy list iframe --


function loadbuddy() {
    var iframedoc = iframe.contentDocument;
    var buddyTable = iframedoc.evaluate("//table[@class='tborder']", iframedoc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    var buddyNode = buddyTable.snapshotItem(0);
 
    // remove stuff
    var buddyfooter = buddyNode.ownerDocument.evaluate(".//td[@class='tfoot']", buddyNode, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    var buddyfooterel = buddyfooter.snapshotItem(0);
    buddyfooterel.parentNode.removeChild(buddyfooterel);
 
    var onoff = buddyNode.ownerDocument.evaluate(".//td[@class='thead']", buddyNode, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    var onel = onoff.snapshotItem(0);
    var offel = onoff.snapshotItem(1);
    onel.parentNode.parentNode.removeChild(onel.parentNode);
    offel.parentNode.parentNode.removeChild(offel.parentNode);
    
    var checkboxes = buddyNode.ownerDocument.evaluate(".//td[@class='alt2']", buddyNode, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for(var i = 0; i < checkboxes.snapshotLength; i++)
    {
        var checkboxel = checkboxes.snapshotItem(i);
        checkboxel.parentNode.removeChild(checkboxel.nextSibling.nextSibling);
    }
    
    var spans = buddyNode.ownerDocument.evaluate(".//span[@class='highlight']", buddyNode, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for(var i = 0; i < spans.snapshotLength; i++)
    {
        var thisspan = spans.snapshotItem(i);
        thisspan.removeAttribute('class');
    }
    
    var contacthead = buddyNode.ownerDocument.evaluate(".//td[@class='tcat']", buddyNode, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    var contactheadel = contacthead.snapshotItem(0);
    contactheadel.style.textAlign = 'center';
    
    // Delete iframe
    setTimeout( function() { iframe.parentNode.removeChild(iframe); }, 300);
    

    // -- Add clickable name/PM links to users in buddy list --
    var buddynames = buddyNode.ownerDocument.evaluate(".//label[contains(@for,'buddy_')]", buddyNode, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0; i < buddynames.snapshotLength; i++) 
    {
        thisbuddy = buddynames.snapshotItem(i);
        var parseid = thisbuddy.getAttribute('for');
        var userid = parseid.substring(6);
        
        var buddylink = buddyNode.ownerDocument.createElement('a'); 
        buddylink.setAttribute('href','http://forums.anandtech.com/private.php?do=newpm&userid[]='+userid);
        buddylink.appendChild(thisbuddy.firstChild);
        thisbuddy.insertBefore(buddylink,thisbuddy.firstChild);  
    }
    // !-- add clickable names in buddy list --

    
    // -- Add to Nav Menu --
    if(placement == 'top') { navparent.insertBefore(buddyNode, navtable); }
    else { navparent.appendChild(buddyNode); }
    // !-- Add to Nav Menu --
}