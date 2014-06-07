// THwiki by livercat
// 
//Concept by Naltrexone (WikiLink for KoL) .
//Updater function code by JHunz (KoL Battlefield Counter).
//Thanks to Kizu for a lot of JS help.
// ==UserScript==
// @name           THwiki by livercat
// @namespace   	http://livercat.ru/th
// @description   Wikifikation script for Twilight Heroes. Version 0.8.
// @include	*.twilightheroes.com/*.php*
// @exclude	*.twilightheroes.com/skills.php*
// @exclude	*.twilightheroes.com/contact.php*
// @exclude	*.twilightheroes.com/bugreport.php*
// ==/UserScript==

/********************************** Recent Changes **********************************************

0.8	*Fixed several typos in Category links.
	*Better Character Page and level-up handling.

0.71	*Quick fix for forums.

0.7	+Support for every page in game, yay!
	*Much more elegant handling of buffs/effects.

0.6	+Full support for non-combat adventures.
	*Fixed potentially evil bug in charpane handler.

0.5	+Items and monsters in combat are wikified.
	*Some code refactoring and bug fixes.

0.4 	*Fixed unwanted popups when clicking buffs in charpane.
	*Removed unnecessary text handling in popups.
	*Fixed some typos %)
	+Added Category links for item types.
	+Auto-updater!
	
0.3 	First public release.

********************************************************************************************/

const VERSION=0.8;
const RELEASECOMMENT='Fixed several typos in Category links; better Character Page and level-up handling.';

//when logged in, check for updates
if (window.location.pathname == "/main.php")
{
	CheckForUpdates();
	//GM_log("checking for updates");
}

function CheckForUpdates() 
{
	var scriptUrl = 'http://userscripts.org/scripts/source/28205.user.js';

	var lastUpdateCheck = GM_getValue('lastUpdateCheck','NEVER');
	var curTime = new Date().getTime();
	if ((lastUpdateCheck == 'NEVER') || (parseInt(lastUpdateCheck,10) < (curTime - 86400000))) 
	{
		GM_setValue('lastUpdateCheck',''+curTime);
		GM_xmlhttpRequest({	
						method: 'GET',
						url: scriptUrl,
						onload: function(responseDetails) 
						{
							var bodyText = responseDetails.responseText;
							var matches = bodyText.match(/const VERSION=([\d\.]+);(\s+const RELEASECOMMENT='(.*)';)?/);
							var curVersionNum = parseFloat(matches[1]);
							GM_log('fetched script version: ' + curVersionNum);
							if (matches[3] && (matches[3] != '')) 
							{
								GM_setValue('releaseComment', matches[3]);
							}
							else 
							{
								GM_setValue('releaseComment','');
							}
							if (curVersionNum > VERSION) 
							{
								GM_setValue('outOfDate','true');
							}
							else 
							{
								GM_setValue('outOfDate','false');
							}
						}
		});
	}
	
	var curVersion = GM_getValue('curVersion','0');
	if (parseFloat(curVersion) != VERSION) 
	{
		GM_setValue('curVersion',''+VERSION);
		GM_setValue('outOfDate','false');
	}
	//Nag user with update link if the script is out of date
	var outOfDate = GM_getValue('outOfDate');
	if((outOfDate != 'false') && (window.location.pathname == "/main.php")) 
	{
		var releaseComment = GM_getValue('releaseComment','');
		var newElement = document.createElement('div');
		newElement.setAttribute("class","wikiLinkUpdaterContainer");
		newElement.setAttribute("width","95%");
		newElement.innerHTML = '<div class="wikiLinkUpdaterHeader">New version of the THwiki script is available.</div>' + 
			'<div class="wikiUpdaterRelNotes"><a href="' + scriptUrl + '" target="_blank"><strong>Update</strong></a><br/>' + 
			((releaseComment!='')?('Release notes:&nbsp;'+releaseComment):'') + '</div>';
		
		var updateBarCSS = "" + 
				".wikiLinkUpdaterContainer" +
				"{" +
					"border: 1px dashed black;" +
					"margin-bottom: 4px;" +
					"color: black;" +
					"font-size: 85%;" +
				"}" +
				".wikiLinkUpdaterHeader" +
				"{" +
					"background-color: yellow;" +
					"color: black;" +
					"height: 1.5em;" +
					"padding: 3px;" +
					"border-bottom: 1px black;" +
				"}" +
				".wikiUpdaterRelNotes" +
				"{" +
				"padding: 3px;" +
				"}";
		
		//insert the counter at the top of the page
		AddElementToTop(newElement,document);
		
		//add css style to the document
		AddGlobalStyle(updateBarCSS);
	}
}

//adds specified element to the top of the page
function AddElementToTop(newElement,refDocument) 
{
	var element = refDocument.getElementsByTagName("h1")[0];
	if (element && element.parentNode) 
	{
		element.parentNode.insertBefore(newElement,element);
	}
}

//adds style to the document
function AddGlobalStyle(css) 
{
	var head = document.getElementsByTagName('head')[0];
	if (head) 
	{
		var style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		head.appendChild(style);
	}
}

//turn object name into wiki link to the corresponding object
const wikiWrapperPre = '&nbsp;<sup><a tabindex="-1" href="http://th.blandsauce.com/wiki/';
const wikiWrapperPost = '" TARGET="_blank">w</a></sup>&nbsp;'; 
function wikify(EntryName)
{
	return wikiWrapperPre + EntryName + wikiWrapperPost;
}

//inserts wiki link for given object into defined position
function insertWikiLink(itemElement, wikiEntryName, textToInsertAfter) 
{	  		
		if (itemElement.tagName.toUpperCase() == "IMG")
		{
			var newElement = document.createElement("span");
			newElement.innerHTML = wikify(wikiEntryName);

			var itemParent = itemElement.parentNode;
			if (itemElement.nextSibling && itemParent)
			{
				itemParent.insertBefore(newElement,itemElement.nextSibling); 
			}				
		}
		else
		{
			/*****************
			if it's buff or effect, it has onclick property with popup inside, and we want to isolate wiki link from popup.
			so we add some conditions to onclick: show popup only if clicked element isn't <a>
			*****************/
			if ((itemElement.tagName.toUpperCase() == "DIV") && (itemElement.attributes[0].name.toUpperCase() == "ONCLICK"))
			{
				var attr = itemElement.attributes;
				itemElement.attributes[0].value='if ((event.target.nodeName.toUpperCase() || event.srcElement.nodeName.toUpperCase()) != "A"){' + 
					itemElement.attributes[0].value + '}';
				
				//DIV on the training page contains <b> inside, so we dig a little further
				if (itemElement.hasChildNodes())
				{
					var iter = itemElement.firstChild;
					//because of stupid DOM structure, empty #text child nodes may appear  in <div> before <b>
					//so we need to find actual <b>
					while (iter)
					{
						if (iter.nodeName.toUpperCase() == "B")
						{
							wikiEntryName = iter.innerHTML;
							textToInsertAfter = wikiEntryName;
							itemElement = iter;
							break;
						}
						iter = iter.nextSibling;
					}
				}
			}
			var insertionPoint = itemElement.innerHTML.indexOf(textToInsertAfter) + textToInsertAfter.length;
			var newInnerHTML = itemElement.innerHTML.substring(0, insertionPoint) +
				wikify(wikiEntryName) + itemElement.innerHTML.substring(insertionPoint);        	
			itemElement.innerHTML = newInnerHTML;
		}
}

/*****Charpane Handler*****
   The charpane appears on the left and displays active buffs and effects.
*************************/
if (window.location.pathname == "/nav.php")
{
	var curDivElement;
	var allDivs = document.evaluate(
		'//div[@onclick]',
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);

	for (var i = 0; i < allDivs.snapshotLength; i++)
	{
		curDivElement = allDivs.snapshotItem(i);
		if ((curDivElement.innerHTML.indexOf("minutes") != -1) || (curDivElement.innerHTML.indexOf("perpetual") != -1)) 
		{ 
			var effectName = curDivElement.innerHTML.substring(0,curDivElement.innerHTML.indexOf("-")-1); 			
			insertWikiLink(curDivElement, effectName, effectName);
		} 
	}
}
/*****Charsheet Handler*****
   The charsheet is Character page, where skills and Merit Badges are listed.
*************************/
if (window.location.pathname == "/character.php")
{
	//wikify skills
	var curDivElement, skillName;
	var allDivs = document.evaluate(
		'//div[@onclick]',
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for (var i = 0; i < allDivs.snapshotLength; i++)
	{
		curDivElement = allDivs.snapshotItem(i);
		skillName = curDivElement.innerHTML; 			
		insertWikiLink(curDivElement, skillName, skillName);
	}
	
	//wikify badges
	var curImgElement, badgeName;
	var allImgs = document.evaluate(
		'//img[@alt]',
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for (var i = 0; i < allImgs.snapshotLength; i++)
	{
		curImgElement = allImgs.snapshotItem(i);
		badgeName = curImgElement.getAttribute("alt");
		insertWikiLink(curImgElement, badgeName, badgeName);
		curImgElement.setAttribute("style","vertical-align:top");
	}
	
	//wikify class
	var classElement = document.getElementsByTagName("h2")[0];
	var className = classElement.innerHTML.replace(/.*\d+ ([\w ]+?) Hero.*/, "$1");
	insertWikiLink(classElement, className, className);

}


/*****Training Page Handler*****
   When you gain level, you awarded a skill. This code handles it.
*************************/
if (window.location.pathname == "/training.php")
{
	//wikify skills
	var curDivElement, skillName;
	var allDivs = document.evaluate(
		'//div[@onclick]',
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for (var i = 0; i < allDivs.snapshotLength; i++)
	{
		curDivElement = allDivs.snapshotItem(i);
		skillName = curDivElement.innerHTML;
		insertWikiLink(curDivElement, skillName, skillName);
	}
}

/*****Popup Handler*****
   There are several <b> elements in popup, but we need only name and type.
**********************/
if (window.location.pathname == "/popup.php") 
{
	//item Name is always first <b> element
	var curItem = document.getElementsByTagName("b")[0];
	var itemName = curItem.innerHTML;
	if (curItem && curItem.innerHTML)
	{
		insertWikiLink(curItem, itemName, itemName);
	}
 
	//item type is always first <strong> element, so we add Category link to the type
	curItem = document.getElementsByTagName("strong")[0];
	if (curItem.innerHTML.indexOf('Helmet') != -1)
	{
		insertWikiLink(curItem,'Category:Helmets','Helmet');
	}
	if (curItem.innerHTML.indexOf('Ranged weapon') != -1)
	{
		insertWikiLink(curItem,'Category:Ranged_Weapons','Ranged weapon');
	}
	if (curItem.innerHTML.indexOf('Melee weapon') != -1)
	{
		insertWikiLink(curItem,'Category:Melee_Weapons','Melee weapon');
	}
	if (curItem.innerHTML.indexOf('Shirt') != -1)
	{
		insertWikiLink(curItem,'Category:Shirts','Shirt');
	}
	if (curItem.innerHTML.indexOf('Gloves') != -1)
	{
		insertWikiLink(curItem,'Category:Gloves','Gloves');
	}
	if (curItem.innerHTML.indexOf('Pants') != -1)
	{
		insertWikiLink(curItem,'Category:Pants','Pants');
	}
	if (curItem.innerHTML.indexOf('Boots') != -1)
	{
		insertWikiLink(curItem,'Category:Boots','Boots');
	}
	if (curItem.innerHTML.indexOf('Offhand Item') != -1)
	{
		insertWikiLink(curItem,'Category:Offhand_Items','Offhand Item');
	}
	if (curItem.innerHTML.indexOf('Accessory') != -1)
	{
		insertWikiLink(curItem,'Category:Accessories','Accessory');
	}
	if (curItem.innerHTML.indexOf('Talisman') != -1)
	{
		insertWikiLink(curItem,'Category:Talismans','Talisman');
	}
	if (curItem.innerHTML.indexOf('Transportation') != -1)
	{
		insertWikiLink(curItem,'Category:Transoptation','Transportation');
	}
	if (curItem.innerHTML.indexOf('Full-body suit') != -1)
	{
		insertWikiLink(curItem,'Category:Full-body_Suits','Full-body suit');
	}
	if (curItem.innerHTML.indexOf('Miscellaneous Item') != -1)
	{
		insertWikiLink(curItem,'Category:Miscellaneous_Item','Miscellaneous Item');
	}
}
	
/*****General "Items" Handler*****
   All things in inventory, in combat and in messages, that surrounded by <b>, are elements.
**********************/
if ((window.location.pathname != "/popup.php")&&(window.location.pathname != "/training.php"))
{
	var itemElements = document.getElementsByTagName("b");
	
	for (var i=0; i < itemElements.length; i++ ) 
	{
		var curItem = document.getElementsByTagName("b")[i];
		var itemName = curItem.innerHTML;
		if ((itemName.indexOf("chips") == -1) && (itemName.indexOf("experience") == -1) && (itemName != ""))
		{
			//multiple items check
			if (itemName.indexOf("quantity") != -1)
			{
				itemName = itemName.substring(0, itemName.indexOf("quantity")-2);
				insertWikiLink(curItem, itemName, itemName);
			}
			else
			{
				insertWikiLink(curItem, itemName, itemName);
			}
		}
    }
}

/*****Non-combat Adventures Handler*****
   For non-combats we want their names.
**********************/
if (window.location.pathname == "/fight.php") 
{
	var hElement = document.getElementsByTagName("h2")[0];
	
	if (hElement)
	{
		insertWikiLink(hElement, hElement.innerHTML, hElement.innerHTML);
	}
}