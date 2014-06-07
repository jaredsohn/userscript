// ==UserScript==
// @name           Anandtech VB - PM message previews
// @namespace      hg
// @include        http://forums.anandtech.com/*
// @exclude        http://forums.anandtech.com/*#dontrunGM
// @exclude        http://forums.anandtech.com/misc.php*
// ==/UserScript==


// Find if there's new notifications --
var notifications = document.evaluate("//span[@id='notifications']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
if(notifications.singleNodeValue != null) { var notification = notifications.singleNodeValue; }
else { return; }


// Get usercp in Iframe
var iframe = document.createElement('iframe');
iframe.addEventListener("load",checknewpm,false);
iframe.style.visibility = 'hidden';
iframe.src = 'http://forums.anandtech.com/usercp.php#dontrunGM';
document.body.appendChild(iframe);

function checknewpm() {
    
    var iframedoc = iframe.contentDocument;    
        
    // message preview divider
    var hr = document.createElement('hr');
    hr.setAttribute('style','color: rgb(109, 109, 125); background-color: rgb(109, 109, 125);');
    hr.setAttribute('size','1');
    notification.parentNode.insertBefore(hr, notification.nextSibling);

    // -- each new message --
    var newMessageCols = iframedoc.evaluate("//tbody[@id='collapseobj_usercp_pms']//td[starts-with(@id,'m')]", iframedoc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
   
    for(var i = 0; i < newMessageCols.snapshotLength; i++)
    {
        thisMessageCol = newMessageCols.snapshotItem(i);
        
        //var newMessageTitle = thisMessageCol.childNodes[1].childNodes[3].text;
        //var newMessageLink = thisMessageCol.childNodes[1].childNodes[3].href;
        //var newMessageAuthor = thisMessageCol.childNodes[3].childNodes[3].textContent;
               
        var newMessageLinks = thisMessageCol.ownerDocument.evaluate(".//div/a", thisMessageCol, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
        var newMessageAuthors = thisMessageCol.ownerDocument.evaluate(".//div/strong/span", thisMessageCol, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
        var newMessageLink = newMessageLinks.singleNodeValue.href;
        var newMessageTitle = newMessageLinks.singleNodeValue.firstChild.innerHTML; 
        var newMessageAuthor = newMessageAuthors.singleNodeValue.innerHTML;  
        
        // Preview text - change display here
        //var pmPreviewText = '('+newMessageAuthor+') '+newMessageTitle;
        
        var pmPreviewText = newMessageTitle;  
        if(pmPreviewText.length > 22) { pmPreviewText = pmPreviewText.substr(0,19)+'...'; }
        
        // Add to PM window
        var pmtext = document.createTextNode(pmPreviewText);
        
        var pmlink = document.createElement('a');
        pmlink.href = newMessageLink;
        pmlink.appendChild(pmtext);

        var pmdiv = document.createElement('div'); 
        pmdiv.setAttribute('class','smallfont');
        pmdiv.appendChild(pmlink);
        
        notification.parentNode.appendChild(pmdiv);    
    }
    // !-- each new message --

    // Delete usercp iframe
    setTimeout( function() { iframe.parentNode.removeChild(iframe); }, 300);
}