// Flickr - Widescreen
// Copyright (c) 2010, Patrick Joseph.
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// ==UserScript==
// @name            Flickr - Widescreen
// @namespace       http://userscripts.org/users/isamux
// @description     Adjusts the appearance of photostream pages depending on the browser's window size.
// @version         1.2.2.1
// @date            2011-04-24
// @creator         Patrick Joseph
// @include         http://*.flickr.com/photos/*
// @include         http://*.flickr.com/groups/*/pool*/
// @exclude         http://*.flickr.com/photos/friends*  
// ==/UserScript==

// ==Changelog==
//2011-04-24 v1.2.2:
// * Flickr changed id of photostream's content div from "Main" to "main". Changed it in the script to make it work again.
// * Updated integrated Flickr - TopPager to version 1.0.5.
// 2010-11-21  v1.2.1:
// * experimatal adjustment on photo page: comments are displayed in a column left to the photo.
//   Can be disabled by setting CONF_DISPLAY_COMMENTS_AS_LEFT_COLUMN to false.
// 2010-10-11  v1.2:
// * fixed medium + sets view
// * added logging functionality
// * added widescreen display for sets overview page (Example: http://www.flickr.com/photos/barackobamadotcom/sets/)
// * added @include for group pool 
// 2010-04-23  v1.1:
//  * added top pager functionality (http://userscripts.org/scripts/show/73290).
// 2010-04-22  v1.0.2:
//  * added handling for photostream layout "Medium + sets" (big5).
//  * removed @require dependency from userscript metablock. 
// 2010-04-15  v1.0.1:
//  * some minor adjustments.             
// ==/Changelog==

// ---------------
//  CONFIGURATION
// ---------------
const CONST_ENABLE_FIREBUG_LOGGING = false;

// some "constants" for the script
const CONST_MINIMUM_COLUMN_COUNT = 3; // minimum count of columns in photostream table. Should be at least 1.
const CONST_MAIN_CONTAINER = "Main";  // id of main photostream div
const CONST_CELL_WIDTH = 340;         // width of a single photostream table cell (Used for AUTO ADJUSTMENT)
const CONST_SETS_COLUMNS_WIDTH = 300; // width of the photostream's sets column
const CONST_PHOTOSTREAM_WRAPPER = '//div[@class="PhotosColumn"]'

// if CONF_AUTO_ADJUST is set to false, the values configured below, 
// are used to rearrange the photostream table.
var CONF_AUTO_ADJUST = true;
var CONF_COLUMN_COUNT = 3;              // [AUTO ADJUSTED] count of columns. Cannot be set below CONST_MINIMUM_COLUMN_COUNT;
var CONF_MAIN_CONTAINER_WIDTH = 1800;   // [AUTO ADJUSTED] width of main container. Original width 800.

// config for photostream layout "Medium + sets"
var CONF_MEDIUM_SIZE_STREAM_RESIZE_ENABLED = true;      // allows to disable resize of images in "Medium + sets" layout.
var CONF_MEDIUM_SIZE_STREAM_MINIMUM_IMAGE_WIDTH = 340;  // minimum size for resized images in "Medium + sets" layout.

var CONF_ADD_TOP_PAGER = true;          				// allows to disable top pager.
var CONF_DISPLAY_COMMENTS_AS_LEFT_COLUMN = true;		// experimental: displays comments as left column on photo page   

//  Flickr - TopPager CONFIGURATION (should not be changed)
const CONST_PAGINATED_CONTENT_XPATH_PHOTOSTREAM = '//div[starts-with(@class,"PhotoStream")]';
const CONST_PAGINATED_CONTENT_XPATH_GROUP = '//div[@class="HoldPhotos"]';
const CONST_PAGINATED_CONTENT_ID_FAVORITES = 'favoriteThumbs';
             
// ---------------

// ---------------
//  SCRIPT-MAIN
// ---------------

// 0. Prepare everything
// init logging
if(typeof console === "undefined" || !CONST_ENABLE_FIREBUG_LOGGING) {
    
   console = { log: function() { }, 
                info: function() {}, 
               debug: function() { } ,
               warn: function() {},
                error: function() {} };
}

// add top pager
if(CONF_ADD_TOP_PAGER)
  tryAddTopPager();

computeAdjustments(); 	// compute column resize parameters

// I. Adjust main div width
var mainEl = document.getElementById(CONST_MAIN_CONTAINER);
if(mainEl == null)
{
    // on some pages the main-container is named "Main" and on newer ones "main".
    mainEl = document.getElementById(CONST_MAIN_CONTAINER.toLowerCase());  
}
if(mainEl !== null)
{
    mainEl.style.width = CONF_MAIN_CONTAINER_WIDTH + "px";
}

// II.a Rearrange photostream ("Small + sets" layout)
var elPhotoColumn =  getElement(CONST_PHOTOSTREAM_WRAPPER);
if(elPhotoColumn !== null)
{
    elPhotoColumn.style.setProperty("width", (CONF_COLUMN_COUNT * CONST_CELL_WIDTH) + "px","important");
}

// II.b Rearrange photostream ("Big wo sets" layout)
elPhotoColumn =  getElement('//div[@class="PhotosColumn Big5Column Big5NoSets"]');
if(elPhotoColumn !== null)
{
    rearrangeLargeSizeLayoutPhotoStream(elPhotoColumn);
}

// // II.c Rearrange photostream in "Medium + sets" layout
// oMediumSizeImageDivs = getElementSnapshots('//div[starts-with(@class,"StreamView Big5Photo")]');
// if(null != oMediumSizeImageDivs)
// {
    // console.info("PageInfo: Photostream Medium + sets column");
    // rearrangeMediumSizeLayoutPhotoStream(oMediumSizeImageDivs);
// }

// III. Remove width from favorites container, to adjust to new width of CONST_MAIN_CONTAINER.
var oFavoritesContainer = document.getElementById('favoriteThumbs');
if(null != oFavoritesContainer)
{
    console.info("PageInfo: Favorites");
    oFavoritesContainer.style.width = "auto";
}

// IV. Adjust width on set page
var oSetContainer = document.getElementById('ViewSet');
if(null != oSetContainer)
{
    console.info("PageInfo: Single set overview");
    oSetContainer.style.width = "auto";
    var el = getElement('//div[@class="vsThumbs"]');
    el.style.width = (CONF_MAIN_CONTAINER_WIDTH-CONST_SETS_COLUMNS_WIDTH) + "px";
}

// V. Handle Sets-Overview Page
if(isSetsPage(document.URL))
{
    console.info("PageInfo: Set overview");
    oBreaks = getElementSnapshots('//div[@class="Sets"]/following-sibling::br[@clear="all"]');
    if(oBreaks != null)
    {
        for(i = 0; i < oBreaks.snapshotLength-3; i++)
        {
            obreakElement = oBreaks.snapshotItem(i);
            obreakElement.parentNode.removeChild(obreakElement);
        }
    }
}
  

 // VI. Insert Widescreen next to Flickr logo 
 insertLogo();

 // VII. Experimental new photopage adjustment
mainElNewPhotPage = document.getElementById("main");
if(null !== mainElNewPhotPage)
{
	//console.info("PageInfo: New Photopage");
	experimentalNewPhotoPageAdjust(mainElNewPhotPage); 
}

// ===============
//  FUNCTION LIB
// ===============

function computeAdjustments()
{
    // 0. auto config
    if(CONF_AUTO_ADJUST)
    {
        // compute count of fitting columns
        CONF_COLUMN_COUNT = Math.floor(window.innerWidth/CONST_CELL_WIDTH);
        
		console.debug("Computed count of columns fitting the window: " + CONF_COLUMN_COUNT);
		
        // by adjusting the width, the main content container on the photostream is moved to the left.
        // Otherwise the table with more columns, would be growing out of the main window to the right.
        CONF_MAIN_CONTAINER_WIDTH = (CONF_COLUMN_COUNT * CONST_CELL_WIDTH); 
        
        // consider sets column. If sets column exists, the CONF_COLUMN_COUNT needs to be reduced by one.
        if(additionalRightColumnExists())
        {
            CONF_COLUMN_COUNT = CONF_COLUMN_COUNT -1;
			console.debug("Additional right column exists. Count of fitting columns was reduced to " + CONF_COLUMN_COUNT);
        }
    }

    // apply minimum column count
    if(CONF_COLUMN_COUNT < CONST_MINIMUM_COLUMN_COUNT)
        CONF_COLUMN_COUNT = CONST_MINIMUM_COLUMN_COUNT
}

function additionalRightColumnExists()
{
	
	return (collectionsColumnExists() || setsColumnExists());
}

function setsColumnExists()
{
    return elementExists('//*[@class="SetsColumn"]');
}

function collectionsColumnExists()
{
	return elementExists('//*[@class="CollectionsColumn"]');
}

function isSetsPage(psUrl)
{
    bResult = false;
    iUrlLength = psUrl.length;
    
    // main sets page wo pagination
    bNoPagination = psUrl.indexOf("/sets/") == iUrlLength-6;
    bResult = bNoPagination;
    console.debug("Is main set overview page: " + bNoPagination);
    
    if(!bNoPagination)
    {
        // is main sets page on a certain page
        iLastEqual = psUrl.lastIndexOf("=");
        sTestForSetsPaginated = "/sets/?&page";
        
        sToTest = psUrl.substr(iLastEqual - sTestForSetsPaginated.length, sTestForSetsPaginated.length);
        bWithPagination = (sToTest == sTestForSetsPaginated);
        console.debug("Is main set overview page on a specific page: " + bWithPagination);
        bResult = bWithPagination;
    }

    return bResult;
}

function getOrignialPhotostreamTableElement()
{
    // get orignal photostream table position
    return getElement('//td[@class="PhotosColumn"]//table');
}

function rearrangeTable(poTableElement, piNewColumnCount)
{
    var allHeaderCells = getAllPhotostreamHeaderCells(poTableElement);
    var allImgCells = getAllPhotostreamImageCells(poTableElement);
    
    // create new table element and replace orginal
    elTable = document.createElement("table");
    elTable.innerHTML = buildTable(allHeaderCells, allImgCells, piNewColumnCount);
    
    return elTable;
}

function getAllPhotostreamHeaderCells(poTable)
{
    return getElementSnapshotsFromContext(poTable, './/tr[@valign="bottom"]//td');
}

function getAllPhotostreamImageCells(poTable)
{
    return getElementSnapshotsFromContext(poTable,'.//tr[@valign="top"]//td');
}
      
function buildTable(paAllHeaderCells, paAllImgCells, piColumnCount)
{
    var tmpTableString = '<table width="100%" cellspacing="0"><tbody>';

    for (var i = 0; i < paAllHeaderCells.snapshotLength; i++)
    {
        tmpTableString += buildTableRow(paAllHeaderCells, i, piColumnCount);
        tmpTableString += buildTableRow(paAllImgCells, i, piColumnCount);
        i+=piColumnCount;
    }

    tmpTableString += "</tbody></table>";

    return tmpTableString;
}

function buildTableRow(paCellContent,piOffset, piColumnCount)
{
    var tmp = "<tr>";
    
    while(piColumnCount--)
    {
        oTd = paCellContent.snapshotItem(piOffset++);
        tmp += buildTableCell(oTd);
    }
   
    return  tmp + "</tr>";
}

function buildTableCell(poTd)
{
    if(poTd == null)
        return "<td>-</td>";
    else
        return "<td>" + poTd.innerHTML + "</td>";
}


function rearrangeLargeSizeLayoutPhotoStream(poPhotoColumn)
{
    poPhotoColumn.style.setProperty("width", (CONF_COLUMN_COUNT * CONST_CELL_WIDTH) + "px","important");
    poPhotoColumn.style.setProperty("padding-left", "10px","important");
    poPhotoColumn.style.setProperty("padding-right", "10px","important");

    var oPhotoItemSnapsthots = getElementSnapshots('//div[@class="photo-display-item"]');
    for(i = 0; i < oPhotoItemSnapsthots.snapshotLength; i++)
    {
        oPhotoItem = oPhotoItemSnapsthots.snapshotItem(i);
        oPhotoItem.style.setProperty("float", "left","important");
        oPhotoItem.style.setProperty("margin-left", "15px","important");
    }

}

function rearrangeMediumSizeLayoutPhotoStream(paImageDivs)
{
    iMargin = 15;
    bRightColumnExists = additionalRightColumnExists();
    
    if(!bRightColumnExists)
    {
        oContainerElement = getElement('//td[contains(@class,"Big5NoSets")]');
        oContainerElement.style.setProperty("padding-left", 0, "important");
    }
    
    iWidth = computeAvailableColumnsWidthForMediumSizeLayout(iMargin, bRightColumnExists);
    sPhotItemWidth = iWidth + iMargin + "px";
    sSubItemWidth = iWidth+ "px";
     
    for (var i = 0; i < paImageDivs.snapshotLength; i++)
    {
        paImageDivs.snapshotItem(i).style.cssFloat="left";
 
        // resize images
        if(CONF_MEDIUM_SIZE_STREAM_RESIZE_ENABLED)
        {
            oImage = getElementFromContext(paImageDivs.snapshotItem(i),'.//img[@class="pc_img"]');
            
            // resize image container
            paImageDivs.snapshotItem(i).style.setProperty("width",  sPhotItemWidth , "important");
           
            // resize image
            oImage.style.height="auto";
            oImage.style.width=sSubItemWidth;
            
            // resize description
            oDescription = getElementFromContext(paImageDivs.snapshotItem(i),'.//p[@class="Desc"]');
            if(oDescription != null)
             oDescription.style.setProperty("width", sSubItemWidth, "important");

             // resize caption
             oCaption = getElementFromContext(paImageDivs.snapshotItem(i),'.//h4')
             if(oCaption != null)
                oCaption.style.setProperty("width", sSubItemWidth, "important");
      
        }
    }
}

function computeAvailableColumnsWidthForMediumSizeLayout(piMargin, pbSetsColumnExists)
{
    iColumns = 5;
    iTotalMargin = piMargin*iColumns;
    iAvailableColumnWidth = CONF_MAIN_CONTAINER_WIDTH-iTotalMargin;
    
    if(pbSetsColumnExists)
    {
        iAvailableColumnWidth = iAvailableColumnWidth - CONST_SETS_COLUMNS_WIDTH-iTotalMargin;
    }

    iWidth = iAvailableColumnWidth/iColumns;
    
    if(CONF_MEDIUM_SIZE_STREAM_MINIMUM_IMAGE_WIDTH > iWidth)
    { 
        iWidth = CONF_MEDIUM_SIZE_STREAM_MINIMUM_IMAGE_WIDTH;
    }  

     return iWidth;
}

function insertLogo()
{
    widescreenLogo = createLogo();
	
    // get flickr logo
    logo = document.getElementById('FlickrLogo');
    if(logo == null)
    {
        logo = document.getElementById('head-logo');
    }
	
	// insert widescreen logo
    logo.parentNode.insertBefore(widescreenLogo,logo);
}

function createLogo()
{
	el = document.createElement("div");
    el.innerHTML ='<a style="font-size:10px;" href="http://userscripts.org/scripts/show/73305" target="_blank" title="Widescreen-ed by Flickr-Widescreen">Widescreen</a>';
    el.style.setProperty("font-size","10px","");
    el.style.setProperty("float","left","");
    el.style.setProperty("position","relative","");
    el.style.setProperty("top","0px","");
    el.style.setProperty("left","188px","");
    el.style.setProperty("padding","1px","");
    el.style.setProperty("border","1px solid #7B0099","");
    el.style.setProperty("background-color","#FFBFE1","");
    el.style.setProperty("-moz-border-radius","3px","");
    el.style.setProperty("text-align","center","");
    el.style.setProperty("width","65px","");
	
	return el;
}


function experimentalNewPhotoPageAdjust(pMainElNewPhotPage)
{
	if(pMainElNewPhotPage == null) 
		return;
	
	
	primCol =  document.getElementById("primary-column"); 
    if(primCol ===  null)
        return;
    
	if(CONF_DISPLAY_COMMENTS_AS_LEFT_COLUMN && window.innerWidth > 1800)
	{
		// display comments in left column
		console.info("Widescreening: Inserting comments as left column");

		primCol.style.setProperty("clear","right","");

		comments =  document.getElementById("comments"); 
		comments.style.setProperty("float","left","");
		comments.style.setProperty("margin-left","25px","");
		comments.style.setProperty("width","370px","");
		document.body.insertBefore(comments,pMainElNewPhotPage)  
		document.getElementById("message").style.width="300px";
	}
}

// --------------------
//  TOP PAGER (v1.0.5)
// --------------------
function tryAddTopPager()
{
    // get paginator
    oPaginator = getPaginator();
    if(oPaginator !== null)
    {
        // get element before which the top pager will be inserted.
        oPaginatedContent = getPaginatedContent();
        
        // insert top page paginator
        if(oPaginatedContent != null)
        {
            oPaginatorClone = oPaginator.cloneNode(true);
            oPaginatedContent.parentNode.insertBefore(oPaginatorClone, oPaginatedContent);
        }
    }
}

function getPaginatedContent()
{
	// try get that element on photostream pages, ...
	oTmpFound =  getElement(CONST_PAGINATED_CONTENT_XPATH_PHOTOSTREAM);

	if(oTmpFound == null)
	{
		//...then on groups pages
		oTmpFound = getElement(CONST_PAGINATED_CONTENT_XPATH_GROUP);
	}

	if(oTmpFound == null)
	{
		//...and finally on favorites pages.
		oTmpFound = document.getElementById(CONST_PAGINATED_CONTENT_ID_FAVORITES);
	}

	return oTmpFound;
}

function getPaginator()
{
    return getElement('//div[@class="Pages"]');
}



// ===============
//  BASE LIB
// ===============

// returns result of xpath query
function getElementSnapshots(xpathExp)
{
    oResult = document.evaluate(
        xpathExp,
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);
        
    return (oResult.snapshotLength > 0)? oResult : null;
}

// returns result of xpath query below a given node
function getElementSnapshotsFromContext(contextNode, xpathExp)
{
        return document.evaluate(
        xpathExp,
        contextNode,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);
}

// returns a single dom element by xpath expression
function getElement(xpathExp)
{
    oResult = getElementSnapshots(xpathExp);
    return (oResult == null)?null:oResult.snapshotItem(0);
}

function getElementFromContext(contextNode, xpathExp)
{
    oResult = getElementSnapshotsFromContext(contextNode, xpathExp);
    return (oResult == null)?null:oResult.snapshotItem(0);
}

function elementExists(xpathExp)
{
    return (getElement(xpathExp) != null);
}

function replaceElement(oldElement, newElement)
{
    oldElement.parentNode.insertBefore(newElement, oldElement);
    
    // remove original table 
    oldElement.parentNode.removeChild(oldElement);
}
