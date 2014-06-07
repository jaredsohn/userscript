// ==UserScript==
// @name           Kickass Categorical Filter
// @namespace      http://userscripts.org./scripts/show/64843
// @description	   Filter and divide torrent list by category
// @include        http://www.kickasstorrents.com/new/*
// @include        http://www.kickasstorrents.com/releases/*
// @exclude        http://www.kickasstorrents.com/new/?*
// @exclude        http://www.kickasstorrents.com/releases/?*
// @version        1.0.1
// ==/UserScript==

/*
  To hide a category, set it to: filter: 1
    If you set a main category (designation 'main: 1') to 'filter: 1', then all
  sub categories will not be displayed (ie: filtering 'anime' will 
  automatically filter 'hentai' and 'other-anime').
    To alter the order in which the categories are displayed, simply change the 
  order they are displayed below. Only the position of the main categories will 
  affect the order, but I recommend moving the whole block for clarity's sake.
*/

var arrayCategory = [
	{name: "anime", main: 1, filter: 0},
	{name: "hentai", filter: 1},
	{name: "other-anime", filter: 0},

	{name: "applications", main: 1, filter: 0},
	{name: "handheld-applications", filter: 0},
	{name: "mac-software", filter: 0},
	{name: "other-applications", filter: 0},
	{name: "unix", filter: 0},
	{name: "windows", filter: 0},

	{name: "books", main: 1, filter: 0},
	{name: "audio-books", filter: 0},
	{name: "comics", filter: 0},
	{name: "ebooks", filter: 0},
	{name: "other-books", filter: 0},
	
	{name: "games", main: 1, filter: 0},
	{name: "mac-games", filter: 0},
	{name: "other-games", filter: 0},
	{name: "pc-games", filter: 0},
	{name: "ps2", filter: 0},
	{name: "wii", filter: 0},
	{name: "xbox360", filter: 0},

	{name: "movies", main: 1, filter: 0},

	{name: "music", main: 1, filter: 0},

	{name: "other", main: 1, filter: 0},
	{name: "covers", filter: 0},
	{name: "pictures", filter: 0},
	{name: "sound-clips", filter: 0},
	{name: "unsorted", filter: 0},

	{name: "tv", main: 1, filter: 0},

	{name: "xxx", main: 1, filter: 0},
];
//--End User Input-(do not alter anything below if you do not know JavaScript)--

//-----------------Create Category Filter and Category Tables-------------------
var snapMainDataTable = xpath("//table[@class='data']","FIRST"); //Table of torrents
var snapFirstr = xpath("//tr[@class='firstr']","FIRST"); //Torrent table header
var regexCategoryFilter = "improbablematch&&<>"; //Workaround for zero-filtered scenario
var categoryTableBody = new Object();
var categoryTables = new Array();

for (var i in arrayCategory)
{
  var elm = arrayCategory[i];
  
  if (elm.filter) //the "/name/" matches the href link, not the displayed text
    regexCategoryFilter += "|/" + elm.name + "/";
  else if (elm.main)
  {
    var firstr = snapFirstr.cloneNode(true);
    var table = categoryTables[i] = document.createElement("table");
    var tBody = categoryTableBody[elm.name] = document.createElement("tbody");
    
    table.setAttribute("class", "data");
    table.setAttribute("cellspacing", "0");
    table.setAttribute("cellpadding", "0");
    table.style.marginTop = "0px"; //Not canon, but makes for a tighter display
    
    table.appendChild(tBody);

    tBody.appendChild(firstr);
  }
}

regexCategoryFilter = new RegExp(regexCategoryFilter); //Filters main and sub-categories
regexCategoryGet = /in <a href="\/(\w+)\/">/; //Only retrieves main category

//------------Assign Non-Filtered Torrents to Appropriate Table-----------------
var snapAllTorrents = xpath("//tr[starts-with(@id,'torrent_')]","ORDERED"); //Torrent rows
var numGoodTorrents = 0;
for (var i = 0; i < snapAllTorrents.snapshotLength; i++)
{
	var torrent = snapAllTorrents.snapshotItem(i);
  if (!regexCategoryFilter.test(torrent.innerHTML) && regexCategoryGet.test(torrent.innerHTML) && categoryTableBody[RegExp.$1])
  {
    categoryTableBody[RegExp.$1].appendChild(torrent);
    numGoodTorrents++; //For displaying # of filtered torrents
  }
}

//----Create Category Titles, Fix Table Stripes, and Display Non-Empty Tables---
for (var i in arrayCategory)
{
  var elm = arrayCategory[i];
  var tBody = categoryTableBody[elm.name];
  if (elm.main && !elm.filter && (tBody.childNodes.length > 1))
  {
    var table = categoryTables[i];
    var isEven = true;
    
    snapMainDataTable.parentNode.insertBefore(table, snapMainDataTable); //Inserts the table only if it has torrents

    if (elm.name == "tv" | elm.name == "xxx") //'TV' and 'XXX' are in all caps
      var titleText = elm.name.toUpperCase();
    else //everything else just gets the first letter caped
      var titleText = elm.name.charAt(0).toUpperCase() + elm.name.slice(1);

    var title = document.createElement("h2");
    title.appendChild(document.createTextNode("\u00a0" + titleText)); //'\u' Unicode for &nbsp;
    title.style.marginTop = "7px"; //Main page uses 25px, but I like a tight display
    table.parentNode.insertBefore(title, table);

    for (var j = 1; j < tBody.childNodes.length; j++)
    {        
      var torrent = tBody.childNodes[j];
      torrent.setAttribute("class", isEven ? "even" : "odd"); //even=darker background
      isEven = !isEven;
    }
  }
}

//----------------------------Alter Old Title Info------------------------------
var oldTitle = snapMainDataTable.parentNode.firstChild; //returns DIV[@class='firstonpage']
while (oldTitle.nodeType!=1) //This skips the omnipresent text nodes
{
  oldTitle=oldTitle.nextSibling;
}
var oldTitleText = oldTitle.childNodes[0];
var oldResultsText = oldTitle.childNodes[1].firstChild;
var isReleases = /releases/.test(oldTitleText.data);
if (!isReleases) //Remove "All torrents" from Latest page, but keep the new "Our releases"
{
  oldTitle.removeChild(oldTitleText);
  oldResultsText.data = oldResultsText.data.slice(2); //Remove "- " as well
}
var filteredInsert = oldResultsText.data.search(/from/);
var numBadTorrents = snapAllTorrents.snapshotLength - numGoodTorrents;
oldResultsText.data = oldResultsText.data.slice(0,filteredInsert) + "(-" + 
  numBadTorrents + ") " + oldResultsText.data.slice(filteredInsert);

snapMainDataTable.parentNode.removeChild(snapMainDataTable); //Remove old table and filtered torrents

function xpath(query,type)
{
  if (type == "FIRST")
    return document.evaluate(query, document, null,
      XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  else if (type == "ORDERED")
    return document.evaluate(query, document, null,
      XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  else
    return document.evaluate(query, document, null,
      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}
