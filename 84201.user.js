// ==UserScript==
// @name          soundsnap.com download button
// @namespace     
// @author        Thomas Kekeisen (http://thomaskekeisen.de)
// @description   Adds a download button to download the file played/previewed in the sound player
// @include       http://*soundsnap.com*
// ==/UserScript==

// Get all flash objects
var allObjects = document.getElementsByTagName('object');

// Iterate all objects
for (i in allObjects)
{
    // Get all param objects
    var allParams = allObjects[i].getElementsByTagName('param');
    
    // Set up a buffer for the value
    value = '';
    
    // Iterate all params
    for (n in allParams)
    {
        // Check whether we found the "FlashVars"
        if (allParams[n].name == 'FlashVars')
        {
            // Get the value
            value = allParams[n].value;
            
            // Remove useless stuff
            value = value.replace('soundFile=', '');
            
        }
    }
    
    // Check whether we got a mp3 path
    if (value.length > 0)
    {    
        // Get the containing table
        var containingTable = allObjects[i].parentNode.parentNode.parentNode.parentNode;
        
        // Get the last child
        var lastChild = containingTable.getElementsByTagName('tr')[5];
       
        // Get the table cell
        var tableCell = lastChild.getElementsByTagName('td')[0];

        // Cache the value
        var oldText = tableCell.innerHTML;
        
        // Add the download link
        tableCell.innerHTML = '<a href="' + value + '">Download</a> - ' + oldText;
    }
}