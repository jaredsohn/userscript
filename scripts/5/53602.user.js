// ==UserScript==
// @name          Romanization Remover
// @namespace      khnoroma.khakionion.com
// @description    Culls romanized text from vocabulary pages on KoreanClass101 and JapanesePod101.
// @include        http://www.koreanclass101.com/*/vocabulary_list
// @include        http://www.koreanclass101.com/*/dictionary
// @include        http://www.japanesepod101.com/*/vocabulary_list
// @include        http://www.japanesepod101.com/*/dictionary
// ==/UserScript==

//support GreaseKit/Safari
var unsafeWindow = window;

//support both jp101 and kc101
kc101XPath = "//tbody/tr/*[3]";
jp101XPath = "//tbody/tr/*[4]";
myXPath = (location.href.search(/japanesepod101/i) == -1)?kc101XPath:jp101XPath;

//decide whether we operate straightaway, or create a button
createButton = (location.href.search(/dictionary$/i) == -1)?false:true;

//make the undesirables a global-level script object so we can remove/add the romanizations at will.
unsafeWindow.romanizationCount = 0;

//this function depends on the user script having found romanizations to toggle.
unsafeWindow.toggleRomaja = function() 
{
    for(i=0;i<unsafeWindow.romanizationCount;++i)
    {
	nextElem = document.getElementById("KHNoRoma"+i);
	nextElem.style.display=(nextElem.style.display=="none")?"":"none";
    }
}

unsafeWindow.findAndPurgeRomaja = function()
{
    unsafeWindow.romanizationCount = 0;
    //to start, find the first table of class 'Dictionary' in the page.
    dictionaryTable = document.evaluate( "//table[@class='Dictionary']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null );
    if(dictionaryTable.singleNodeValue)
    {
        //within this table, find all TDs that are third amonst their siblings.
        undesirables = document.evaluate( myXPath, dictionaryTable.singleNodeValue, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );

        //for each one of these TDs...hide them!
        for(i=0;i<undesirables.snapshotLength;i++)
        {
            undesirables.snapshotItem(i).style.display="none";
            undesirables.snapshotItem(i).setAttribute("id","KHNoRoma"+unsafeWindow.romanizationCount++);
        }
        //build a notification to tell the user that this table has been modified.
        notification = document.createElement("div");
        toggleLink = document.createElement("a");
        toggleLink.setAttribute("onclick", "toggleRomaja();");
        toggleLink.appendChild( document.createTextNode("This table had "+(i-1).toString()+" Romanized words removed. Click here to toggle them.") );
        toggleLink.style.fontStyle = "italic";
        notification.appendChild(toggleLink);
        //place the notification directly above the modified table. 
        dictionaryTable.singleNodeValue.parentNode.insertBefore(notification,dictionaryTable.singleNodeValue);
    }
}

if( createButton )
{
    dictionarySubmit = document.evaluate( "//input[@id='dictionary_submit']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null );
    if(dictionarySubmit.singleNodeValue)
    {
        newOnClick = dictionarySubmit.singleNodeValue.getAttribute("onclick").replace("Search Again';","Search Again';findAndPurgeRomaja();");
        dictionarySubmit.singleNodeValue.setAttribute("onclick",newOnClick);
    }
}
else
{
    unsafeWindow.findAndPurgeRomaja();
}