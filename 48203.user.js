// ==UserScript==
// @name           Facebook - Add Recent Friends To Mafia Wars
// @namespace      http://facebook.com
// @description    shows remove buttons, adds 'Add' links and has function to open a tab for each invite
// @version        0.4
// @date           2009-09-01
// @include        http://www.facebook.com/friends/*
// ==/UserScript==


function xpath(query) {
    return document.evaluate(query, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

function log(message) {
    GM_log(message);
}
function my_getPreviousElementSibling ( aNode )
{
    var aReturn = aNode;
    do
    {
        aReturn = aReturn.previousSibling;
        log ( "aReturn is " + aReturn );
    }
    while ( aReturn && aReturn.nodeType != 1 );
    return aReturn;
}
function getRegex ( aRow )
{
    var aRegEx = aRow.innerHTML.match(/id=([0-9]+)/);
    if ( aRegEx == null )
    {
        log ( "id match didn't work" );
        aPredecessor = my_getPreviousElementSibling( aRow);
        log ( "pred = " + aPredecessor.innerHTML );

        //aRegEx = aPredecessor.innerHTML.match(/\/q([0-9]+)_([0-9]+)\.jpg"\//);
        aRegEx = aPredecessor.innerHTML.match(/\/q([0-9]+)_[0-9]+\.jpg/);
    }
    return aRegEx;
}
function addLinksAndShowButtons()
{
    try
    {
        var aRows = xpath("//div[@class='UIObjectListing_MetaData']");
        for (var i=0; i < aRows.snapshotLength; i++ )
        {
            try
            {
                var aRow = aRows.snapshotItem(i);
                var aRegEx = getRegex ( aRow );
                var sNewSpanId = "MafiaAddLink-" + aRegEx[1];

                var aOldElement = document.getElementById ( sNewSpanId );

                if ( aOldElement == null )
                {
                    var aNewSpan = document.createElement('span');
                    aNewSpan.innerHTML = " [<a href='http://apps.facebook.com/inthemafia/status_invite.php?from=" + aRegEx[1] + "' target='_blank'>Add to Mafia Wars</a>]";
                    aNewSpan.id = sNewSpanId;
                    aRow.appendChild ( aNewSpan );
                }
            }
            catch ( e )
            {
                log ( "Got error on row " + i + " : " + e );
            }
        }
    }
    catch ( e )
    {
        log ( "Got error: " + e );
    }
}
function openAllTabs()
{
    try
    {
        var aRows = xpath("//div[@class='UIObjectListing_MetaData']");
        for (var i=0; i < aRows.snapshotLength; i++ )
        {
            try
            {
                var aRow = aRows.snapshotItem(i);
                var aRegEx = getRegex ( aRow );

                var aNewSpan = document.createElement('span');
                var sUrl = "http://apps.facebook.com/inthemafia/status_invite.php?from=" + aRegEx[1];
                log ( "Opening tab to: " + sUrl );
                GM_openInTab ( sUrl );
            }
            catch ( e )
            {
                log ( "Got error on row " + i + " : " + e );
            }
        }
    }
    catch ( e )
    {
        log ( "Got error: " + e );
    }
}

window.addEventListener( 'load', function( e ) 
{
    try
    {
        var aToolBar = xpath("//span[@class='UIToolbarWell_Left']");
        aRow =  aToolBar.snapshotItem(0);
        var aNewSpan = document.createElement('span');
        aNewSpan.innerHTML = "[<a>Add Links</a>] ";
        aNewSpan.addEventListener ( "click", addLinksAndShowButtons, true );
        aRow.appendChild(aNewSpan);

        aNewSpan = document.createElement('span');
        aNewSpan.innerHTML = " [<a>Open Links in Tabs</a>]";
        aNewSpan.addEventListener ( "click", openAllTabs, true );
        aRow.appendChild(aNewSpan);
            
    }
    catch ( e )
    {
        log ( "Got error: " + e );
    }
},false);
