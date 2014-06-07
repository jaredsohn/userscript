// ==UserScript==
// @name  			HF Script - Favorite Forums
// @namespace       TheOne
// @version         1.0.8
// @description     Adds a new tab to HackForums' index with your favorite forums
// @include    	    *hackforums.net*
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @grant 			GM_setValue
// @grant 			GM_getValue
// @grant 			GM_info
// @run-at 			document-start
// @copyright 		None
// ==/UserScript==

var showFavoriteForum = false;
if (getCookie('menutabs') == -1 || getCookie('favoriteForumFired') == 'theone') // first connection since browser restart or is our tab .click handler fired
{
    showFavoriteForum = true;
}

$(document).on('DOMContentLoaded', loadOnBodyLoadCompleted);

var unselectedStar = "<div style=\"background: url('http://darkwhispers.co.uk/images/darkfusion/star_rating.gif') no-repeat 0 0; width: 16px; height: 14px;display: inline-block;\"></div> ";
var selectedStar = "<div style=\"background: url('http://darkwhispers.co.uk/images/darkfusion/star_rating.gif') no-repeat 0; width: 16px; height: 14px;display: inline-block;\"></div> ";
var favoriteForums = GM_getValue('favoriteForumIds');
//cl(favoriteForums);
function loadOnBodyLoadCompleted()
{
	if (document.getElementById('menutabs'))
	{
		if (!favoriteForums)
		{
			GM_setValue('favoriteForumIds', '1337,');
			favoriteForums = '1337,';
			// no items set yet
		}
		// inject id's in tr
		var tds = document.getElementsByTagName("td");
		for (var i = 0; i < tds.length; i++) 
		{
			if (tds[i].className == "trow1" || tds[i].className == "trow2") // subforum classes
			{
				// Check if forum title
				if (tds[i].hasChildNodes())
				{
					insertForum(tds[i]);
				}
			}
		}
				
		// When page loads, insert favo forum & forum itself
		if (favoriteForums && favoriteForums.length > 2)
		{
			var tabElement = document.getElementById('menutabs');
			var favoTab = createElement('li','<a id="favoriteTab" style="cursor: pointer;">Favorite Forums</a>');
			if (favoTab && tabElement)
			{
				// if the tab is successfully created, add an event listener on click & add it to the forum
				favoTab.addEventListener("click", favoriteTabClick , false);
				tabElement.insertBefore(favoTab, tabElement.firstChild);
				
				// create forum elements
				var forumElement = '<table border="0" cellspacing="1" cellpadding="4" class="tborder"><thead><tr><td class="thead" colspan="5"><div class="expcolimage"><img src="http://x.hackforums.net/images/modern_bl/collapse.gif" id="cat_1_img" class="expander" alt="[-]" title="[-]" style="cursor: pointer;"></div><div><strong><a href="#">Your Favorite Forums</a></strong><br><div class="smalltext"></div></div></td></tr></thead><br>';
				// add columns
				forumElement += '<tbody style="" id="cat_favoforum"><tr id="columnNames"><td class="tcat" colspan="2"><span class="smalltext"><strong>Forum</strong></span></td><td class="tcat" width="85" align="center" style="white-space: nowrap"><span class="smalltext"><strong>Threads</strong></span></td><td class="tcat" width="85" align="center" style="white-space: nowrap"><span class="smalltext"><strong>Posts</strong></span></td><td class="tcat" width="200" align="center"><span class="smalltext"><strong>Last Post</strong></span></td></tr>';
				// add forums
				var forumSubIds = favoriteForums.substring(0, favoriteForums.length - 1).split(",");
				if (forumSubIds.length == 1 && forumSubIds[0] == '1337')
				{
					forumElement += "<tr id='favoInfobar'><td>Start adding your favorite forums now! Just click the star infront of all sub-forums, reload the page and they will appear right here!</td></tr>";
				}
				else
				{
					for (var i = 0; i < forumSubIds.length; i++) 
					{
						var subforumElement = document.getElementById("sfid_" + forumSubIds[i]);
						if (subforumElement)
						{
							forumElement += "<tr id=dynamic_sfid_" + forumSubIds[i] + ">" + subforumElement.innerHTML + "</tr>";
						}
						else
						{
							cl("Element: sfid_" + forumSubIds[i] + " could not be located!");
						}
					}
				}
				// add closing table/tbody tag
				forumElement += "</tbody></table><br>";
				var favoForum = createElement('div', forumElement);
				// for some strange reason setting an empty element adds an extra <br>, thus remove it
				favoForum.innerHTML = favoForum.innerHTML.substring(4); 
				favoForum.innerHTML += "<div class=\"menu\"><ul>Favorite Forum Userscript version " + GM_info.script.version  + " | Made by <a href=\"/member.php?action=profile&uid=101521\">The-One</a> | <a href=\"/showthread.php?tid=4014405\">HF Thread</a> | <a id='resetcache'>Reset Cache</a></ul></div><br>";
				favoForum.id = "favoForum";
				favoForum.style.display = "none";
				// insert before general forum
				document.getElementsByClassName('quick_keys')[0].insertBefore(favoForum, document.getElementById('tabmenu_1')); 
				document.getElementById('resetcache').addEventListener("click", resetCache, false);
				if (showFavoriteForum)
				{
					favoTab.click();
				}
				// make forums in favorite forum (de)selectable
				var favoriteElement = document.getElementById("favoForum");
				for (var i = 0; i < forumSubIds.length; i++) 
				{
					var tempSubForumElement = document.getElementById("dynamic_sfid_" + forumSubIds[i]);
					if (tempSubForumElement)
					{
						insertForum(tempSubForumElement);
					}
				}
				var allTabs = tabElement.childNodes;
				for (var i = 0; i < allTabs.length; i++) 
				{
					 if (allTabs[i] != favoTab)
					 {
						 allTabs[i].addEventListener("click", hideFavoriteForum, false);
					 }
				}
			}
		}
	}
}

function insertForum(mainNode, index)
{
	if (!index) index = 0;
	
	var titleAhrefCollection = mainNode.getElementsByTagName("a");
	if (titleAhrefCollection[index] && titleAhrefCollection[index].parentNode)
	{
		if (titleAhrefCollection[index].parentNode.tagName == "STRONG")
		{
			// new 1.0.2, ids are forumids:
			var id = titleAhrefCollection[0].href.split("=")[1];
			// Find parent element, and give it an id, where needed
			var parentElement = mainNode.parentNode;
			if (parentElement)
			{
				if (parentElement.tagName == 'TR' && parentElement.hasAttributes() == false)
				{
					parentElement.setAttribute('id', "sfid_" + id);
				}
			}
			// Add star button if not exists (this due our favourite forums 
			
			if (mainNode.id.indexOf('dynamic_') > -1)
			{
                id = mainNode.id.replace('dynamic_sfid_', '');
				for(var i = 0; i < titleAhrefCollection.length; i++)
				{
					if (titleAhrefCollection[i].name && titleAhrefCollection[i].name == ("static_" + id))
					{
						addDropEvents(titleAhrefCollection[i].parentNode.parentNode.parentNode);
						titleAhrefCollection[i].nextSibling.draggable = true;
						addDragEvents(titleAhrefCollection[i].nextSibling);
                        titleAhrefCollection[i].name = (mainNode.id.replace('sfid_', ''));
						titleAhrefCollection[i].addEventListener("click", function() { starClick(mainNode.id.replace('dynamic_sfid_', ''), titleAhrefCollection[i]) } , false);
						return;
					}
				}
			}
			
			var aFavorite = createElement('a', "");
			var starHtml = unselectedStar;
			var starId = 'unselected';
			if (favoriteForums && favoriteForums.indexOf("," + id + ",") > -1)
			{
				starHtml = selectedStar;
				starId = 'selected';
			}
			var aFavorite = createElement('a', starHtml);
			aFavorite.id = starId;
			aFavorite.name = "static_" + id;
			aFavorite.style.cursor = "pointer";
			//aFavorite.href = '#';
			aFavorite = titleAhrefCollection[index].parentNode.insertBefore(aFavorite, titleAhrefCollection[index]);
			aFavorite.firstChild.addEventListener("click", function() { starClick(id, aFavorite); } , false);
		}
	}
}

// Custom functions;
function createElement(type, html)
{
    var temp = document.createElement(type);
	temp.innerHTML = html;
    return temp;
}

function cl(input)
{
    console.log('The-One whispers: ' + input);
}
function getCookie(cname)
{ //w3
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i=0; i<ca.length; i++) 
	{
	  var c = ca[i].trim();
	  if (c.indexOf(name)==0) 
	  {
		return c.substring(name.length,c.length);
	  }
	}
	return -1;
}
function setCookie(cname,cvalue)
{ //w3
	// no date, this way it expires when the browser closes itself
	document.cookie = cname + "=" + cvalue;
}
function removeCookie(cname)
{
	document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
}

function addDropEvents(element)
{
	element.addEventListener("drop", function(e) { onDrop(e); }, false);
	element.addEventListener("dragover", function(e) { allowDrop(e); }, false);
}

function addDragEvents(element)
{
	element.addEventListener("dragstart", function(e) { onDrag(e); }, false);
}

function resetCache()
{
	var response =confirm("Cleaning cache will remove all your saved forums (and its order).\nPress OK to continue.");
	if (response==true)
	{
		GM_setValue('favoriteForumIds', '');
		window.location.reload();
	}	
}

// Custom events;
function favoriteTabClick(eventArg)
{
    var tabElement = document.getElementById('menutabs');
    
    // Reset styling:
    
    // Reset selected tab
    var currentSelectedTab = tabElement.getElementsByClassName('selected')[0]; // there can only be only tab selected
    if (currentSelectedTab)
    {
        currentSelectedTab.className = "";
        document.getElementById('favoriteTab').className = "selected";
    }
    
    // Reset content:
    var forumContent = document.getElementsByClassName('quick_keys')[0].childNodes;
    for (var i = 0; i < forumContent.length; i++) 
    {
        if (forumContent[i].style && forumContent[i].style.display)
        {
            forumContent[i].style.display = "none";
        }
    }
    
	setCookie('favoriteForumFired', 'theone');
    document.getElementById('favoForum').style.display = "block";
}

function hideFavoriteForum()
{
	var favoForum = document.getElementById('favoForum');
	if (favoForum.style.display != "none")
	{
		// hf won't hide our forum, so we have to do it ourselves
		favoForum.style.display = "none";
	}
		removeCookie('favoriteForumFired');
}

function addForum(forumElement, afterElement)
{
    $(afterElement).after(forumElement);
}

function starClick(forumId, starElement)
{
    // reset star 'state'
	if (starElement.id == 'unselected')
	{
		starElement.innerHTML = selectedStar;
		starElement.id = 'selected';
        var allIds = favoriteForums.split(',');
		// set new ids for 'dynamic' subforum
        var originalForum = document.getElementById("sfid_" + forumId).innerHTML;
        originalForum = "<tr id='dynamic_sfid_" + forumId + "'>" + originalForum + "</tr>"; 
		originalForum = originalForum.replace(('static_' + forumId), ('dynamic_' + forumId));
		var afterElement = document.getElementById("dynamic_sfid_" + allIds[allIds.length - 2]);
		if (!afterElement)
		{
			// OUR FIRST ELEMENT, OHYEAH
			afterElement = document.getElementById("columnNames");
			var infobar = document.getElementById('favoInfobar').remove();
		}
        addForum(originalForum, afterElement);
		addDropEvents(document.getElementById('dynamic_sfid_' + forumId));
		
		// set star element
		var newStarElement = document.getElementsByName('dynamic_' + forumId)[0];
		newStarElement.nextSibling.draggable = true;
		addDragEvents(newStarElement.nextSibling);
		newStarElement.firstChild.addEventListener("click", function() { starClick(forumId, newStarElement); } , false)
        GM_setValue('favoriteForumIds', favoriteForums += (forumId + ","));
	}
	else if (starElement.id == 'selected')
	{
        // also remove the star tab from the forum inside the 'real' forum
        if (starElement.name == ('dynamic_' + forumId))
        {
            var staticElement = document.getElementsByName('static_' + forumId)[0];
           staticElement.innerHTML = unselectedStar;
		   staticElement.id = 'unselected';
           staticElement.firstChild.addEventListener("click", function() { starClick(forumId, staticElement); } , false)
        }
		else
        {
            starElement.innerHTML = unselectedStar;
			starElement.id = 'unselected';
        }
   	    $(document.getElementById("dynamic_sfid_" + forumId)).remove();
        GM_setValue('favoriteForumIds', favoriteForums.replace((forumId + ","), ""));
	}
    // add new click listener as the old one is removed when we replace the html    
	starElement.firstChild.addEventListener("click", function() { starClick(forumId, starElement); } , false);
	favoriteForums = GM_getValue('favoriteForumIds');
}

function onDrop(event)
{
	event.preventDefault();
	var data = event.dataTransfer.getData("text/plain");
	var subforum = event.target;
	while (!subforum.id || subforum.id.indexOf('dynamic_sfid') < 0)
	{
		subforum = subforum.parentNode;
	}
	var replaceMe = document.getElementById('dynamic_sfid_' + data.split('=')[1]);
	// Reset forum setting aka save the order
	var replaceMeId = replaceMe.id.replace('dynamic_sfid_', '');
	var subforumId = subforum.id.replace('dynamic_sfid_', '');
	if (replaceMeId != subforumId)
	{
		favoriteForums = favoriteForums.replace((replaceMeId + ","), "");
		favoriteForums = favoriteForums.replace((subforumId+ ","), (subforumId + "," + replaceMeId + ","));
		GM_setValue('favoriteForumIds', favoriteForums);
		// Replace actual forum
		addForum(replaceMe, subforum);
	}
}
function onDrag(event)
{
	event.dataTransfer.setData("text/plain", event.target.id);
}
function allowDrop(event)
{
	event.preventDefault();
}
