// ==UserScript==
// @name           cheggit VISITED
// @namespace      NA
// @include        http://cheggit.net/browsetorrents.php*
// ==/UserScript==

// VERSION: 1.000
// DATE: Oct 17, 2010

//*********************************************************
//*********************************************************
// USER SETTINGS <START>
//*********************************************************
//*********************************************************
// Items that will be 100% removed from view
const MY_BLACKLIST = new Array("gay", "tranny", "bbw", "hairy.armpits", "pregnant", "femdom");
const CREATE_BLACKLIST_TABLE = true

// Turning CHECK_EACH_TAG_FOR_MATCH to "true" is a lot more efficiant because it checks EACH tag for the EXACT name. 
// Downside: This can take about 15x more loops in the BANLIST loop. 
// EXAMPLE: If "false" and "anal" is blacklsited, it will also blacklist "no.anal", but if its set to true it wont have this issue.
const CHECK_EACH_TAG_FOR_MATCH = true;

// Items that will be crossed out, but not moved because they are in this list
const MY_CROSSED_OUT = new Array("shemale");

// will bold the title is part of the word is found in the entire tab body
const MY_HIGHLIGHT = new Array("malezia", "faye.reagan", "faye.valentine");


// Manage what happens to viewed torrents that you did not click on "download"
const CREATE_VIEWED_TABLE = true;
const DELETE_VIEWED = false;


// Manage what happens to viewed torrents that you DID click on "download"
const CREATE_VIEWED_TABLE_DOWNLOADED = true;
const DELETE_VIEWED_DOWNLOADED = false;


// Manage what happens to torrents with 0 (zero) seeds
const CREATE_NO_SEED_TABLE = false;
const DELETE_NO_SEED = true;

// Shows custom colors and customize them
const CUST_COLORS_ON = true;
const COLOR_CLICKED_SEEDS = "#CC99FF";
const COLOR_CLICKED_NO_SEEDS = "#FF5151";
const COLOR_UNCLICKED_NO_SEEDS = "#EF61D7";

//*********************************************************
//*********************************************************
// USER SETTINGS <END>
//*********************************************************
//*********************************************************

// My custome class Names
const CLICKED_SEEDS = " TRClickedWithSeeds";
const CLICKED_NO_SEEDS = " TRClickedWithoutSeeds";
const UNCLICKED_NO_SEEDS = " TRNoSeeds";
const BLACKLISTED = " TRBlackListed";
const HIGHLIGHT = " TextHighlight";

// Function that will temporarly display colors on the fly as the user clicks
function Clicked() 
{
	var Seeds = this.parentNode.parentNode.parentNode.childNodes[11].innerHTML;
	
	if (Seeds > 0)
		this.parentNode.parentNode.parentNode.className += CLICKED_SEEDS;
	else if (Seeds == 0)
		this.parentNode.parentNode.parentNode.className += CLICKED_NO_SEEDS;
}

function insertNewNode(tableName, newNode, canIaddIt)
{
	if (canIaddIt)
	{
		var nodeLength = tableName.childNodes.length;
		
		if (nodeLength > 1)
			tableName.insertBefore(newNode, tableName.childNodes[1]);
		else
			tableName.appendChild(newNode);
	}
}

var foundElements = document.getElementsByTagName("tr"); 
	for (var i = 0; i < foundElements.length; i++) { 
		if ( foundElements[i].getAttribute("class") == "breakrow" ) 
		{ 
			foundElements[i].parentNode.removeChild(foundElements[i]);
			break;
		}
	}


//Function that accepts and does most of th work
scanLinks = function (links) 
{
	var hex_color = '#0000cc';
	var id = 'vlink_scanner_link_id';
	
	var rgb_color = 'rgb(' + parseInt(hex_color.substring(1, 3), 16) + ', ' +  parseInt(hex_color.substring(3, 5), 16) + ', ' +  parseInt(hex_color.substring(5, 7), 16) + ')';

	try 
	{
		var style = document.createElement('style');
		style.innerHTML = '#' + id + ':visited{display:none;color:' + hex_color + '}';
		document.body.appendChild(style);
	} catch (e) {}
	
	var link = document.createElement('a');
	link.id = id;
	document.body.appendChild(link);
	
	if (CREATE_VIEWED_TABLE)
		var viewedTable = document.getElementById('myViewedTable');
		
	if (CREATE_VIEWED_TABLE_DOWNLOADED)
		var viewedAndDownloadedTable = document.getElementById('myViewedAndDownloadedTable');
	
	if (CREATE_NO_SEED_TABLE)
		var deadTable = document.getElementById('myDeadTable');
		
	if (CREATE_BLACKLIST_TABLE)
		var blacklistTable = document.getElementById('myBlacklistTable');
	
	var tempa;
	for (index = 0; index < links.length; index++) 
	{
		try
		{
			tBodyNode = links[index].parentNode.parentNode.parentNode.parentNode;
			Seeds = links[index].parentNode.parentNode.parentNode.childNodes[11].innerHTML;
			link.href = links[index].href;
				
			// get color of current link
			if(document.defaultView) 
				var this_color = document.defaultView.getComputedStyle(link, null).getPropertyValue('color');
			else 
				var this_color = link.currentStyle['color'];
			
			
			var tags = (String(links[index].parentNode.parentNode.childNodes[5].innerHTML));
			
			// Get rid of start of link tag
			tags = tags.replace(/\<a[a-zA-Z0-9\.\?=;\"\s\&]+>/g, "");
			
			// Get rid of end of link tag
			tags = tags.replace(/<\/a>/g, "");
			
			// Get rid of multiple spaces
			tags = tags.replace(/\s\s+/g, "");
			

			var canMoveItem = true;
			
			if (CHECK_EACH_TAG_FOR_MATCH)
			{
				var tagsArray = (tags.split(" "));
				for (ii=0;ii<=MY_BLACKLIST.length-1;ii++)
				{

					for (y=0;y<=tagsArray.length;y++)
					{

						if (MY_BLACKLIST[ii] == tagsArray[y])
						{
							if (CREATE_BLACKLIST_TABLE)
								insertNewNode(blacklistTable, links[index].parentNode.parentNode.parentNode, true);
							else
								links[index].parentNode.parentNode.parentNode.parentNode.removeChild(links[index].parentNode.parentNode.parentNode);

							canMoveItem = false;
							break;
						}
					
					}
				
				}
			}
			else
			{
				for (ii=0;ii<=MY_BLACKLIST.length-1;ii++)
				{
					if (tags.match(MY_BLACKLIST[ii]))
					{
						if (CREATE_BLACKLIST_TABLE)
							{
								insertNewNode(blacklistTable, links[index].parentNode.parentNode.parentNode, true);
							}
							else
								links[index].parentNode.parentNode.parentNode.parentNode.removeChild(links[index].parentNode.parentNode.parentNode);
						canMoveItem = false;
						break;
					}
				}
			}




				//links[index].parentNode.parentNode.parentNode.parentNode.removeChild(links[index].parentNode.parentNode.parentNode);
			

			
			
			// If clicked with Seeds
			if ((this_color == hex_color || this_color == rgb_color) && (Seeds != 0))
			{
				if (CUST_COLORS_ON)
					links[index].parentNode.parentNode.parentNode.className += CLICKED_SEEDS;
				
				// OLD IF THAT IS NOT NEEDED ANYMORE?
				//if (links[index].parentNode.parentNode.parentNode.parentNode.nodeName == "TBODY")
				
				// Create the download link
				var downloadLink = link.href = links[index].href + '&action=downloadtorrent';	
				link.href = downloadLink.replace(/torrents\.php/i, "download.php");
				
				// Get download color
				if(document.defaultView) 
					var this_color = document.defaultView.getComputedStyle(link, null).getPropertyValue('color');
				else 
					var this_color = link.currentStyle['color'];
					
				// test color of download link
				if ((this_color == hex_color || this_color == rgb_color))
				{
					if (canMoveItem)
					{
						if (CREATE_VIEWED_TABLE_DOWNLOADED)
							insertNewNode(viewedAndDownloadedTable, links[index].parentNode.parentNode.parentNode, true)
						else if (DELETE_VIEWED_DOWNLOADED)
							links[index].parentNode.parentNode.parentNode.parentNode.removeChild(links[index].parentNode.parentNode.parentNode);
					}
				}
				else
				{
					if (canMoveItem)
					{
						if (CREATE_VIEWED_TABLE)
							insertNewNode(viewedTable, links[index].parentNode.parentNode.parentNode, true);
						else if (DELETE_VIEWED)
							links[index].parentNode.parentNode.parentNode.parentNode.removeChild(links[index].parentNode.parentNode.parentNode);
					}
				}
	
			}
			else if (Seeds == 0) // clicked without seeds
			{
				if (CUST_COLORS_ON)
				{
					if ((this_color == hex_color || this_color == rgb_color))
						links[index].parentNode.parentNode.parentNode.className += CLICKED_NO_SEEDS;
					else
						links[index].parentNode.parentNode.parentNode.className += UNCLICKED_NO_SEEDS;	
				}
				
				
				if (canMoveItem)
				{
					if (CREATE_NO_SEED_TABLE)
						deadTable.appendChild(links[index].parentNode.parentNode.parentNode);	
					else if (DELETE_NO_SEED)
						links[index].parentNode.parentNode.parentNode.parentNode.removeChild(links[index].parentNode.parentNode.parentNode);
				}
			}
			
			// If it equals 1, then it means tBodyNode has only the data <tr> and no actual torrents, so delete it.
			if (tBodyNode.getElementsByTagName('tr').length == 1)
			{
				// Deletes the <br> that is after the <table> (do this first so the DOM isnt f'ed up)
				tBodyNode.parentNode.parentNode.parentNode.removeChild(tBodyNode.parentNode.parentNode.nextSibling.nextSibling.nextSibling.nextSibling);
				
				// Delete the table itself (which now only contain the date with no torrents)
				tBodyNode.parentNode.parentNode.parentNode.removeChild(tBodyNode.parentNode.parentNode);
			}
			

		} catch (e) {}
	}

	if (style.innerHTML)
		document.body.removeChild(style);
		
	document.body.removeChild(link);
};

//Adds a border so it looks better
var A = document.body.getElementsByTagName("table");
for (i = 0; i <A.length; i++)
{
	A[i].setAttribute('border',"1");
}

//Creates the style I use for the color
var newStyle=document.createElement('style');
newStyle.setAttribute('type','text/css');

newStyle.innerHTML = "tr.TRClickedWithSeeds td {background: " + COLOR_CLICKED_SEEDS + "}";
	newStyle.innerHTML += "\ntr.TRNoSeeds td {background: " + COLOR_CLICKED_NO_SEEDS + "}";
	newStyle.innerHTML += "tr.TRClickedWithoutSeeds td {background: " + COLOR_UNCLICKED_NO_SEEDS + "}";
	newStyle.innerHTML += "\ntr.TRBlackListed td {font-size:10px; text-decoration:line-through;}\n";
	newStyle.innerHTML += "\ntr.TextHighlight td {font-size:18px;}\n";
document.body.appendChild(newStyle);



var A = document.body.getElementsByTagName("a");
var myLinkObjects=new Array();
var incr = 0;
var NumberOfSeeds;


var torrentList = document.getElementById('torrentList');
if(torrentList)
{
	if (CREATE_NO_SEED_TABLE)
	{
		var newTable = document.createElement('table');
		newTable.setAttribute("id", "myDeadTable");
		newTable.setAttribute("border", "1");
		newTable.innerHTML = '<tr class="tablehead"><th width="*"><strong>== DEAD ITEMS ==</strong></th>        <th width="3%">DL</th><th width="3%">Files</th><th width="3%">Com</th><th width="8%"><strong>Size</strong></th><th width="5%"><strong>Sd</strong></th><th width="5%"><strong>Lch</strong></th><th width="15%">Owner</th></tr>';
		torrentList.parentNode.parentNode.appendChild(newTable);
	}

	if (CREATE_VIEWED_TABLE)
	{
		var newTable = document.createElement('table');
		newTable.setAttribute("id", "myViewedTable");
		newTable.setAttribute("border", "1");
		newTable.innerHTML = '<tr class="tablehead"><th width="*"><strong>== Viewed Torrents that have not been downloaded ==</strong></th>        <th width="3%">DL</th><th width="3%">Files</th><th width="3%">Com</th><th width="8%"><strong>Size</strong></th><th width="5%"><strong>Sd</strong></th><th width="5%"><strong>Lch</strong></th><th width="15%">Owner</th></tr>';
		torrentList.parentNode.parentNode.appendChild(newTable);
	}
	
	if (CREATE_VIEWED_TABLE_DOWNLOADED)
	{
		var newTable = document.createElement('table');
		newTable.setAttribute("id", "myViewedAndDownloadedTable");
		newTable.setAttribute("border", "1");
		newTable.innerHTML = '<tr class="tablehead"><th width="*"><strong>== Viewed Torrents that have been downloaded ==</strong></th>        <th width="3%">DL</th><th width="3%">Files</th><th width="3%">Com</th><th width="8%"><strong>Size</strong></th><th width="5%"><strong>Sd</strong></th><th width="5%"><strong>Lch</strong></th><th width="15%">Owner</th></tr>';
		torrentList.parentNode.parentNode.appendChild(newTable);
	}
	
	if (CREATE_BLACKLIST_TABLE)
	{
		var newTable = document.createElement('table');
		newTable.setAttribute("id", "myBlacklistTable");
		newTable.setAttribute("border", "1");
		newTable.innerHTML = '<tr class="tablehead"><th width="*"><strong>== BLACKLISTED ITEMS ==</strong></th>        <th width="3%">DL</th><th width="3%">Files</th><th width="3%">Com</th><th width="8%"><strong>Size</strong></th><th width="5%"><strong>Sd</strong></th><th width="5%"><strong>Lch</strong></th><th width="15%">Owner</th></tr>';
		torrentList.parentNode.parentNode.appendChild(newTable);
	}
}

//Checks everylink and finds the proper torrents
for (i = A.length-1; i >0; i--)
{
	if ((A[i].href.match(/php\?torrentid=\d+$/i)) && A[i].parentNode.parentNode.parentNode.className && !(A[i].parentNode.parentNode.parentNode.className.match(/menubox/i)))
	{		
		//Finds all the TD's, if there are 8 (regular torrent) get the number of Seeds
		var TD = A[i].parentNode.parentNode.parentNode.getElementsByTagName("td");
		var NumberOfSeeds = 0;
		
		// If TD length is 8 then it is a torrent
		if (TD.length == 8)
		{
			//Loops/thru all blacklist items, if blacklist is found, adds blacklist class then breaks
			for (ii=0;ii<=MY_CROSSED_OUT.length-1;ii++)
			{
				if (TD[0].childNodes[5].innerHTML.match(MY_CROSSED_OUT[ii]))
				{
					TD[0].parentNode.className += BLACKLISTED;
					break;
				}
			}
			
			
			//Loops thru all HIGHLIGHT items, if HIGHLIGHT is found, adds HIGHLIGHT class then breaks
			for (ii=0;ii<=MY_HIGHLIGHT.length-1;ii++)
			{
				if (TD[0].childNodes[5].innerHTML.match(MY_HIGHLIGHT[ii]))
				{
					TD[0].parentNode.className += HIGHLIGHT;
					break;
				}
			}
			
			//Adds all items that should be checked to myLinkObjects. Also adds an eventlistener to temporary show clicked items.
			if (A[i] != undefined)
			{
				myLinkObjects[incr++]= A[i];
				//alert(A[i].href);
				A[i].addEventListener('mousedown',Clicked,false);
			}
			
		}
	}
}








scanLinks(myLinkObjects);
myLinkObjects = null;
A = null;


//var f = new Date();
//alert((f.getTime()) - (d.getTime()));