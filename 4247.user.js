// Prosper Lender Tools user script
// version 0.7 ALPHA
// 2006-06-22b
// Copyright (c) 2006, westside1506
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Prosper Lender Tools", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Prosper Lender Tools
// @description   Adds info to search listings on Prosper.com
// @include       http://www.prosper.com/secure/lend/*
// @include       https://www.prosper.com/secure/lend/*
// @include       http://www.prosper.com/public/lend/*
// @include       https://www.prosper.com/public/lend/*
// @include       http://prosper.com/secure/lend/*
// @include       https://prosper.com/secure/lend/*
// @include       http://prosper.com/public/lend/*
// @include       https://prosper.com/public/lend/*
// @include       https://www.prosper.com/secure/account/lender/*
// @include       https://prosper.com/secure/account/lender/*
// @include       http://prosper.spreebb.com/*
//
// ==/UserScript==


// load the saved lenders and add some defaults (top 15)
var savedLenderNames = GM_getValue ( "ProsperSavedLenders", "" );
var deletedListings = GM_getValue ( "ProsperDeletedListings", "" );
var markedListings = GM_getValue ( "ProsperMarkedListings", "" );
var deletedGroups = GM_getValue ( "ProsperDeletedGroups", "" );
var showAllListings = GM_getValue ( "ProsperShowAllListings", false );

var defaultsDone = GM_getValue ( "ProsperDefaultsDone", false );
if ( defaultsDone == false )
{
    if ( confirm ( "Do you want to automatically install the Top 15 Lenders (as of 6/15/06) as defaults?\n\nClick OK to automatically install them\nClick CANCEL to avoid installing them" ) == true )
    {
        addSavedLender ( "L5" );
        addSavedLender ( "Fred93" );
        addSavedLender ( "anton" );
        addSavedLender ( "dm1244" );
        addSavedLender ( "rwm684" );
        addSavedLender ( "heretolend" );
        addSavedLender ( "larrybird" );
        addSavedLender ( "ski bum" );
        addSavedLender ( "malbec101" );
        addSavedLender ( "normal_cct" );
        addSavedLender ( "Dollars_for_Dough_Nuts" );
        addSavedLender ( "goldenretriever" );
        addSavedLender ( "RCK" );
        addSavedLender ( "jc" );
        addSavedLender ( "cellardoor" );
    }
    else
    {
        deleteSavedLender ( "L5" );
        deleteSavedLender ( "Fred93" );
        deleteSavedLender ( "anton" );
        deleteSavedLender ( "dm1244" );
        deleteSavedLender ( "rwm684" );
        deleteSavedLender ( "heretolend" );
        deleteSavedLender ( "larrybird" );
        deleteSavedLender ( "ski bum" );
        deleteSavedLender ( "malbec101" );
        deleteSavedLender ( "normal_cct" );
        deleteSavedLender ( "Dollars_for_Dough_Nuts" );
        deleteSavedLender ( "goldenretriever" );
        deleteSavedLender ( "RCK" );
        deleteSavedLender ( "jc" );
        deleteSavedLender ( "cellardoor" );
    }
    GM_setValue ( "ProsperDefaultsDone", true );
}

var doWiseClerk = GM_getValue ( "ProsperDoWiseClerk", -1 );
if ( doWiseClerk == -1 )
{
    doWiseClerk = confirm ( "Do you want to check the wiseclerk.com listing page if the wiki is empty?\nThis will slow down the page loads slightly.\n\nClick OK to check wiseclerk.com if wiki is empty\nClick CANCEL to disable wiseclerk.com checking" );
    GM_setValue ( "ProsperDoWiseClerk", doWiseClerk );
}


// scrapes information from page string 'tmpString' about lender 'name'
function scrapeName ( inString, name )
{
    if ( name == "" )
        return "";

    var showText = "";
    var ind = inString.indexOf("screen_name=" + name);
    while ( ind != -1 )
    {
        var curNameString = inString.substr ( ind+10 );
        var win = curNameString.indexOf ( "Winning" );
        if ( win == -1 )
            win = 99999999;
        var someWin = curNameString.indexOf ( "Partially winning" );
        if ( someWin == -1 )
            someWin = 99999999;
        var lose = curNameString.indexOf ( "Outbid" );
        if ( lose == -1 )
            lose = 99999999;

        var moneyInd = curNameString.indexOf ( "$" );
        var moneyString = "$0";
        if ( moneyInd != -1 )
        {
            var numMoneyChar = 1;
            while (( numMoneyChar < 10 ) && 
                   ((( curNameString.charAt(numMoneyChar+moneyInd) >= '0' ) && ( curNameString.charAt(numMoneyChar+moneyInd) <= '9' )) ||
                     ( curNameString.charAt(numMoneyChar+moneyInd) == '.' ) ||
                     ( curNameString.charAt(numMoneyChar+moneyInd) == ',' )))
                numMoneyChar++;
            moneyString = curNameString.substr ( moneyInd, numMoneyChar );
        }

        var winString;
        if (( win < someWin ) && ( win < lose ))
            winString = "win";
        else if (( someWin < win ) && ( someWin < lose ))
            winString = "pwin";
        else
            winString = "lose";
        showText += name + " " + winString + " " + moneyString + "<br>";
            
        inString = curNameString;
        ind = inString.indexOf("screen_name=" + name);
    }

    return showText;
}

// see if there is text on the wiseclerk page
function getWiseClerkString ( inString )
{
    var ind = inString.indexOf ( "Number of votes:" );
    if ( ind > -1 )
    {
        var numVotes = inString.charAt ( ind+17 );
        if (( numVotes > '0' ) && ( numVotes <= '9' ))
          return "WC = " + numVotes;
        else
          return "no wiki";
    }
    else
        return "no WC";
}

function checkWiseClerk ( listingID, thisNode )
{
    // check wiki status
    GM_xmlhttpRequest({
      method:"GET",
      url:"http://www.wiseclerk.com/vote-m-all-l-" + listingID + ".html",
      headers:	{
        "Accept":"text/xml",
        },
      onload:function(details) {
        if (( details.status == 200 ) && ( details.readyState == 4 ))
        {
            var wcString = getWiseClerkString ( details.responseText );

            var newLink = document.createElement ('a');
            if ( wcString == "no wiki" )
                newLink.setAttribute("href", "http://prosperlenders.wikispaces.com/" + listingID );
            else
                newLink.setAttribute("href", "http://www.wiseclerk.com/vote-m-all-l-" + listingID + ".html" );
            newLink.setAttribute("class", "small" );
            newLink.innerHTML = wcString;
            thisNode.parentNode.parentNode.appendChild( newLink );
        }
      }
    });
}

// see if there is text in the wiki
function getWikiString ( inString, listingID )
{
    if ( inString.indexOf ( "Welcome to the prosperlenders space" ) == -1 )
    {
        var startInd = inString.indexOf ( "<!-- google_ad_section_start -->" );
        var endInd = inString.indexOf ( "<!-- google_ad_section_end -->" );
        if (( startInd == -1 ) || ( endInd == -1 ))
            return "YES";

        var wikiLength = endInd - startInd - 32;
        if ( wikiLength > 300 )
            return inString.substr ( startInd + 32, 300 ) + "...";
        else
            return inString.substr ( startInd + 32, wikiLength );
    }
    else
        return "no wiki";
}

function checkWiki ( listingID, thisNode )
{
    // check wiki status
    GM_xmlhttpRequest({
      method:"GET",
      url:"http://prosperlenders.wikispaces.com/" + listingID,
      headers:	{
        "Accept":"text/xml",
        },
      onload:function(details) {
        if (( details.status == 200 ) && ( details.readyState == 4 ))
        {
            var wikiString = getWikiString ( details.responseText, listingID );

            if (( doWiseClerk == true ) && ( wikiString == "no wiki" ))
            {
                checkWiseClerk ( listingID, thisNode );
            }
            else
            {
                var newLink = document.createElement ('a');
                newLink.setAttribute("href", "http://prosperlenders.wikispaces.com/" + listingID );
                newLink.setAttribute("class", "small" );
                newLink.innerHTML = wikiString;
                thisNode.parentNode.parentNode.appendChild( newLink );
            }
        }
      }
    });
}

// AJAX load of page string for listingID
// adds details for saved lenders to element thisNode
function loadListing( listingID, thisNode )
{
    GM_xmlhttpRequest({
      method:"GET",
      url:"http://www.prosper.com/public/lend/listing.aspx?listingID=" + listingID,
      headers:	{
        "Accept":"text/xml",
        },
      onload:function(details) {
        if (( details.status == 200 ) && ( details.readyState == 4 ))
        {
            var showText = "";
            var splitLenderNames = savedLenderNames.split(",");
            for ( lender in splitLenderNames )
                showText += scrapeName ( details.responseText, splitLenderNames[lender] );

            var newLink = document.createElement ('a');
            newLink.setAttribute("href", "http://www.prosper.com/public/lend/listing.aspx?listingID=" + listingID);
            newLink.setAttribute("class", "small" );
            newLink.innerHTML = showText;
            thisNode.parentNode.parentNode.appendChild( newLink );

            checkWiki ( listingID, thisNode );
        }
      }
    });
}

// mark the listing with a large font if they marked it
// add the (mark listing) or (unmark listing) links
function markListing ( listingID, thisNode, listingTitleNumber )
{
    var newNode = document.createElement ('a');
    if ( isListingMarked ( listingID ) == true )
    {
        thisNode.innerHTML = "<h1>" + thisNode.innerHTML + "</h1>";
        newNode.innerHTML = "(unmark listing)";
        newNode.setAttribute("href", "Unmark " + listingID);
    }
    else
    {
        newNode.innerHTML = "(mark listing)";
        newNode.setAttribute("href", "Mark " + listingID);
    }
    newNode.setAttribute("class", "small" );
    newNode.setAttribute("listingID", listingID);
    newNode.setAttribute("listingTitleNumber", listingTitleNumber);
    thisNode.parentNode.appendChild( newNode );
}

// return true if lenderName is in the list of saved names
function isLenderSelected ( lenderName )
{
    var splitLenderNames = savedLenderNames.split(",");
    for ( lender in splitLenderNames )
    {
        if ( lenderName == splitLenderNames[lender] )
            return true;
    }
    return false;
}

// add lenderName to the list of saved lenders unless it is already there
function addSavedLender ( lenderName )
{
    if ( isLenderSelected ( lenderName ) == true )
        return;

    if ( savedLenderNames == "" )
        savedLenderNames += lenderName;
    else
        savedLenderNames += "," + lenderName;
    GM_setValue ( "ProsperSavedLenders", savedLenderNames );
}

// delete lenderName from the list of saved lenders
function deleteSavedLender ( lenderName )
{
    savedLenderNames = savedLenderNames.replace ( ',' + lenderName, "" );
    savedLenderNames = savedLenderNames.replace ( lenderName, "" );
    if ( savedLenderNames.charAt(0) == ',' )
        savedLenderNames = savedLenderNames.substr(1);

    GM_setValue ( "ProsperSavedLenders", savedLenderNames );
}

// return true if listingID is in the list of marked ones
function isListingMarked ( listingID )
{
    var splitListings = markedListings.split(",");
    for ( whichListing in splitListings )
    {
        if ( listingID == splitListings[whichListing] )
            return true;
    }
    return false;
}

// add listingID to the list of marked listings unless it is already there
function addMarkedListing ( listingID )
{
    if ( isListingMarked ( listingID ) == true )
        return;

    if ( markedListings == "" )
        markedListings += listingID;
    else
        markedListings += "," + listingID;
    GM_setValue ( "ProsperMarkedListings", markedListings );
}

// delete listingID from the list of marked listings
function deleteMarkedListing ( listingID )
{
    markedListings = markedListings.replace ( ',' + listingID, "" );
    markedListings = markedListings.replace ( listingID, "" );
    if ( markedListings .charAt(0) == ',' )
        markedListings = markedListings.substr(1);

    GM_setValue ( "ProsperMarkedListings", markedListings );
}

// return true if listingID is in the list of deleted ones
function isListingDeleted ( listingID )
{
    var splitListings = deletedListings.split(",");
    for ( whichListing in splitListings )
    {
        if ( listingID == splitListings[whichListing] )
            return true;
    }
    return false;
}

// add listingID to the list of deleted listings unless it is already there
function addDeletedListing ( listingID )
{
    if ( isListingDeleted ( listingID ) == true )
        return;

    if ( deletedListings == "" )
        deletedListings += listingID;
    else
        deletedListings += "," + listingID;
    GM_setValue ( "ProsperDeletedListings", deletedListings );
}

// return true if group is in the list of deleted ones
function isGroupDeleted ( group )
{
    var splitGroups = deletedGroups.split(",");
    for ( whichGroup in splitGroups )
    {
        if ( group == splitGroups[whichGroup] )
            return true;
    }
    return false;
}

// add group to the list of deleted groups unless it is already there
function addDeletedGroup ( group )
{
    if ( isGroupDeleted ( group ) == true )
        return;

    if ( deletedGroups == "" )
        deletedGroups += group;
    else
        deletedGroups += "," + group;
    GM_setValue ( "ProsperDeletedGroups", deletedGroups );
}

// add the (add) or (delete) link for the lender depending on whether they are in the saved list already
function addUserLink ( lenderName, thisNode )
{
    if ( isLenderSelected ( lenderName ) == true )
    {
        var newLink = document.createElement ('a');
        newLink.setAttribute("lenderName", lenderName);
        newLink.setAttribute("href", "Delete " + lenderName );
        newLink.innerHTML = " (delete)";
        thisNode.parentNode.appendChild( newLink );
    }
    else
    {
        var newLink = document.createElement ('a');
        newLink.setAttribute("lenderName", lenderName);
        newLink.setAttribute("href", "Add " + lenderName);
        newLink.innerHTML = " (add)";
        thisNode.parentNode.appendChild( newLink );
    }
    
}

// add link to delete listing or group
function addListingDeleteLink ( listingID, group, thisNode )
{
    var listingIDNode = document.createTextNode ( listingID + "  " );
    thisNode.parentNode.appendChild ( listingIDNode );

    var newDeleteNode = document.createElement ('a');
    if ( isListingDeleted ( listingID ) == true )
    {
        newDeleteNode.innerHTML = "(deleted listing already)";
    }
    else
    {
        newDeleteNode.setAttribute("href", "Delete " + listingID);
        newDeleteNode.innerHTML = "(delete listing)";
    }
    newDeleteNode.setAttribute("class", "small" );
    newDeleteNode.setAttribute("listingID", listingID);
    thisNode.parentNode.appendChild( newDeleteNode );

    var newDeleteNode2 = document.createElement ('a');
    if ( isGroupDeleted ( group ) == true )
    {
        newDeleteNode2.innerHTML = "(deleted group already)";
    }
    else
    {
        newDeleteNode2.setAttribute("href", "Delete " + group);
        newDeleteNode2.innerHTML = "(delete group)";
    }
    newDeleteNode2.setAttribute("class", "small" );
    newDeleteNode2.setAttribute("groupID", group);
    thisNode.parentNode.appendChild( newDeleteNode2 );
}

function addListingAddLink ( listingID, thisNode )
{
    var newAddNode = document.createElement ('a');
    newAddNode.setAttribute("href", "Add " + listingID);
    newAddNode.innerHTML = "(add " + listingID + ")";
    newAddNode.setAttribute("class", "small" );
    newAddNode.setAttribute("listingID", listingID);
    thisNode.parentNode.parentNode.parentNode.appendChild( newAddNode );
}

function addGroupAddLink ( group, thisNode )
{
    var newAddNode = document.createElement ('a');
    newAddNode.setAttribute("href", "Add group " + group);
    newAddNode.innerHTML = "(add group " + group + ")";
    newAddNode.setAttribute("class", "small" );
    newAddNode.setAttribute("groupID", group);
    thisNode.parentNode.parentNode.parentNode.appendChild( newAddNode );
}

function showWiki ( node, listingID )
{
    var br = document.createElement("br");
    var ifr = document.createElement("iframe");
    ifr.src = "http://prosperlenders.wikispaces.com/" + listingID;
    ifr.style.width = "100%";
    ifr.style.height = "400px";
        
    divs[idiv].appendChild(br);
    divs[idiv].appendChild(ifr);
}

// *************************
// main stuff below
// *************************


// set width of main table
var thisNode = document.getElementById("ctrlListingSearchResultDataGrid_ListingDataGrid");
if ( thisNode != null )
    thisNode.parentNode.parentNode.parentNode.parentNode.style.width = screen.width - 100;


// add the "show all listings" or "hide deleted listings" options
if ( thisNode != null )
{
    var newAddNode = document.createElement ('a');
    if ( showAllListings == true )
    {
        newAddNode.setAttribute("href", "hide deleted listings");
        newAddNode.innerHTML = "(hide deleted listings)";
    }
    else
    {
        newAddNode.setAttribute("href", "show all listings");
        newAddNode.innerHTML = "(show all listings)";
    }
    newAddNode.setAttribute("class", "small" );
    thisNode.appendChild( newAddNode );
}


// find saved lenders for each listing in the search results
for ( ilisting = 0; ilisting < 100; ilisting++ )
{
    var thisNode = document.getElementById("ctrlListingSearchResultDataGrid_ListingDataGrid__ctl" + ilisting + "_lnkListing_link");
    if ( thisNode != null )
    {
        var listingID =  thisNode.href.split("=")[1];
        var groupNode = document.getElementById("ctrlListingSearchResultDataGrid_ListingDataGrid__ctl" + ilisting + "_LabelGroupName");
        var group = "Cannot Find";
        if ( groupNode != null )
            group = groupNode.innerHTML;

        if (( showAllListings == false ) && ( isListingDeleted ( listingID ) == true ))
        {
            addListingAddLink ( listingID, thisNode );
            thisNode.parentNode.parentNode.parentNode.removeChild ( thisNode.parentNode.parentNode );
        }
        else if (( showAllListings == false ) && ( isGroupDeleted ( group ) == true ))
        {
            addGroupAddLink ( group, thisNode );
            thisNode.parentNode.parentNode.parentNode.removeChild ( thisNode.parentNode.parentNode );
        }
        else
        {
            markListing ( listingID, thisNode, ilisting );
            loadListing ( listingID, thisNode );
            addListingDeleteLink ( listingID, group, thisNode );
        }
    }
}

// put link to (add) or (delete) lenders from the saved lender list for each lender on this loan
for ( ilender = 0; ilender < 100; ilender++ )
{
    var thisNode = document.getElementById("ctrlBidHistoryDataGrid_datagrid__ctl" + ilender + "_cmpUserNameHyperlink_lnkUser");
    if ( thisNode != null )
    {
        var lenderName =  thisNode.href.split("=")[1];
        addUserLink ( lenderName, thisNode );
    }
}

// find table rows, sum columns, and get weight average for percent
var mainTable = document.getElementById("Portfolio_gridPools");
if ( mainTable != null )
{
    var tableRows = mainTable.getElementsByTagName("tr");

    var dollarSum = new Array();
    var dollarGotOne = new Array();
    var numColumns = 0;
    var percentSum = 0;
    var percentCount = 0;
    var lastPercentCount = 0;

    // skip first row (column titles)
    for ( irow = 1; irow < tableRows.length; irow++ )
    {
        var thisRow = tableRows[irow];
        var cells = thisRow.getElementsByTagName('td')
        numColumns = cells.length;

        for ( icell = 0; icell < cells.length; icell++ )
        {
            if ( irow == 1 )
            {
                dollarSum[icell] = 0;
                dollarGotOne[icell] = false;
            }

            var thisCell = cells[icell];

            if ( thisCell.firstChild.nodeValue.substr ( 6,1 ) == '$' )
            {
                var curDollarAmount = eval(thisCell.firstChild.nodeValue.substr ( 7 ));
                lastPercentCount = curDollarAmount;
                dollarSum[icell] += curDollarAmount;
                dollarGotOne[icell] = true;
            }
            else if ( thisCell.firstChild.nodeValue.search("%") > -1 )
            {
                var curPercentAmount = 0;
                if ( thisCell.firstChild.nodeValue.charAt(7) == '.' )
                    curPercentAmount = eval(thisCell.firstChild.nodeValue.substr ( 6, 4 ));  // one digit before decimal
                else
                    curPercentAmount = eval(thisCell.firstChild.nodeValue.substr ( 6, 5 ));  // two digits before decimal
                percentSum += curPercentAmount*lastPercentCount;
                percentCount += lastPercentCount;
            }
        }
    }

    // write the sums
    var tableRow = document.createElement ('tr');
    tableRow.style.backgroundColor = "#ddd";
    for ( icolumn = 0; icolumn < numColumns; icolumn++ )
    {
        var newCell = document.createElement ('td');
        if ( icolumn == 0 )
            newCell.appendChild ( document.createTextNode("Totals") );
        else if ( dollarGotOne[icolumn] != 0 )
            newCell.appendChild ( document.createTextNode("$" + Math.round(dollarSum[icolumn]*100.0)/100.0) );
        else if (( icolumn == 2 ) && ( percentCount > 0 ))
            newCell.appendChild ( document.createTextNode(Math.round(percentSum/percentCount*100.0)/100.0 + "%") );
        else if ( icolumn == 10 )
            newCell.appendChild ( document.createTextNode("acc. int. $" + Math.round((dollarSum[9]-dollarSum[4])*100.0)/100.0) );
        else
            newCell.appendChild ( document.createTextNode("") );
            
        if ( icolumn > 0 )
            newCell.setAttribute ( "align", "right" );
        tableRow.appendChild ( newCell );
    }
    mainTable.appendChild ( tableRow );
}



// find listings in prosper forums and link to wiki page
var divs = document.getElementsByTagName("div");
for ( idiv = 0; idiv < divs.length; idiv++ )
{
    if ( divs[idiv].getAttribute("class") == "postcolor" )
    {
        for ( ichild = 0; ichild < divs[idiv].childNodes.length; ichild++ )
        {
            if (( divs[idiv].childNodes.item(ichild).nodeName == "#text" ) || ( divs[idiv].childNodes.item(ichild).nodeName == "A" ))
            {
                var tmpString;
                if ( divs[idiv].childNodes.item(ichild).nodeName == "#text" )
                    tmpString = divs[idiv].childNodes.item(ichild).nodeValue;
                else
                    tmpString = divs[idiv].childNodes.item(ichild).getAttribute("href");

                var len = tmpString.length;

                var numDigits = 0;
                var listingID = "";
                for ( ilen = 0; ilen < len; ilen++ )
                {
                    if (( tmpString[ilen] >= '0' ) && ( tmpString[ilen] <= '9' ))
                    {
                        numDigits++;
                        listingID = listingID + tmpString[ilen];
                    }
                    else
                    {
                        if ( numDigits == 5 )
                            showWiki ( divs[idiv], listingID );
                        numDigits = 0;
                        listingID = "";
                    }
                }
                if ( numDigits == 5 )
                    showWiki ( divs[idiv], listingID );
            }
        }
    }
}


// add or delete lender from saved lender list if they click on the link we put there
// add or delete listing from deleted listing list if they click on the link we put there
document.addEventListener('click', function(event) 
{
    if ( event.target.innerHTML == " (add)" )
    {
        event.target.innerHTML = " (delete)";

        addSavedLender ( event.target.getAttribute("lenderName") );

        event.stopPropagation();
        event.preventDefault();
    }
    else if ( event.target.innerHTML == " (delete)" )
    {
        event.target.innerHTML = " (add)";

        deleteSavedLender ( event.target.getAttribute("lenderName") );

        event.stopPropagation();
        event.preventDefault();
    }
    else if ( event.target.innerHTML == "(delete listing)" )
    {
        addDeletedListing ( event.target.getAttribute("listingID") );

        event.stopPropagation();
        event.preventDefault();
    }
    else if ( event.target.innerHTML == "(delete group)" )
    {
        addDeletedGroup ( event.target.getAttribute("groupID") );

        event.stopPropagation();
        event.preventDefault();
    }
    else if ( event.target.innerHTML == "(mark listing)" )
    {
        event.target.innerHTML = "(unmark listing)";
        var thisNode = document.getElementById("ctrlListingSearchResultDataGrid_ListingDataGrid__ctl" + event.target.getAttribute("listingTitleNumber") + "_lnkListing_link");
        if ( thisNode != null )
            thisNode.innerHTML = "<h1>" + thisNode.innerHTML + "</h1>";
        addMarkedListing ( event.target.getAttribute("listingID") );

        event.stopPropagation();
        event.preventDefault();
    }
    else if ( event.target.innerHTML == "(unmark listing)" )
    {
        event.target.innerHTML = "(mark listing)";
        var thisNode = document.getElementById("ctrlListingSearchResultDataGrid_ListingDataGrid__ctl" + event.target.getAttribute("listingTitleNumber") + "_lnkListing_link");
        if ( thisNode != null )
        {
            thisNode.innerHTML = thisNode.innerHTML.replace ("</h1>", "" );
            thisNode.innerHTML = thisNode.innerHTML.replace ("<h1>", "" );
        }
        deleteMarkedListing ( event.target.getAttribute("listingID") );

        event.stopPropagation();
        event.preventDefault();
    }
    else if ( event.target.innerHTML.substr(0,11) == "(add group " )
    {
        var group = event.target.getAttribute("groupID");
        deletedGroups = deletedGroups.replace ( ',' + group, "" );
        deletedGroups = deletedGroups.replace ( group, "" );
        if ( deletedGroups.charAt(0) == ',' )
            deletedGroups = deletedListings.substr(1);

        GM_setValue ( "ProsperDeletedGroups", deletedGroups );

        event.stopPropagation();
        event.preventDefault();
    }
    else if ( event.target.innerHTML.substr(0,5) == "(add " )
    {
        var curListingID = event.target.getAttribute("listingID");
        deletedListings = deletedListings.replace ( ',' + curListingID, "" );
        deletedListings = deletedListings.replace ( curListingID, "" );
        if ( deletedListings.charAt(0) == ',' )
            deletedListings = deletedListings.substr(1);

        GM_setValue ( "ProsperDeletedListings", deletedListings );

        event.stopPropagation();
        event.preventDefault();
    }
    else if ( event.target.innerHTML == "(hide deleted listings)" )
    {
        showAllListings = false;
        GM_setValue ( "ProsperShowAllListings", showAllListings );

        event.stopPropagation();
        event.preventDefault();
    }
    else if ( event.target.innerHTML == "(show all listings)" )
    {
        showAllListings = true;
        GM_setValue ( "ProsperShowAllListings", showAllListings );

        event.stopPropagation();
        event.preventDefault();
    }
}, true);

