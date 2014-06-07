// ==UserScript==
// @name           mafia_Wars_loot_to_CSV
// @namespace      http://bonticus.com
// @include        http://facebook.mafiawars.com/mwfb/*
// @version 0.0.2
// ==/UserScript==

// VERSION HISTORY:
//     0.0.1:       Original release, opened window with CSV delimited data of Loot page with 1) Item Name 2) Attack  3) Defense
//     0.0.2:       Added new column "IsTradable"

function popup(theirtext)
{
	/*If anyone every finds where the original code for this script came from, please let me know.
	  I adopted a script (http://userscripts.org/scripts/show/74015)
	  I found a few issues and when I reported I found that the author had stolen the code from another source
	  which they had no clue where it had been take from.
	  Thank you to whomever originated it.
	*/
	var winPtr = window.open('', '_blank', '...features...');
	var str = '<html>\n';
	str += '<head>\n';
	str += '<title>Dynamic Page</title>\n';
	str += '</head>\n';
	str += '<body background="#000000" text="#FFFFFF">\n';
	str += '<p><pre>\n';
	str += theirtext + '\n';
	str += '</pr></p>\n';
	str += '</body>\n';
	str += '</html>';
	winPtr.document.open();
	winPtr.document.writeln(str);
	winPtr.document.close();
}

function xpathFirst(p, c)
{
	return document.evaluate(p, c || document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
}

function trimAll(sString)
{
	while (sString.substring(0,1) == ' ')
	{
		sString = sString.substring(1, sString.length);
	}
	while (sString.substring(sString.length-1, sString.length) == ' ')
	{
		sString = sString.substring(0,sString.length-1);
	}
	return sString;
} 

function $x(p, c)
{
	var i, r = [], x = document.evaluate(p, c || document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
	while ((i = x.iterateNext()))
	{
		r.push(i);
	}
	return r;
}

function xpath(query, element)
{
	var elt = (element == null) ? document : element;
	return document.evaluate(query, elt, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

function getText(x_path,c)
{
	var el = xpathFirst(x_path,c);
	if ( el )
	{
		return el.textContent;//innerHTML;
	}
	return "";
}

function makeElement(type, appendto, attributes, checked, chkdefault)
{
	var element = document.createElement(type);
	if (attributes != null)
	{
		for (var i in attributes)
		{
			element.setAttribute(i, attributes[i]);
		}
	}
	if (checked != null)
	{
		if (GM_getValue(checked, chkdefault) == 'checked')
		{
			element.setAttribute('checked', 'checked');
		}
	}
	if (appendto)
	{
		appendto.appendChild(element);
	}
	return element;
}

function clickElement(elt)
{
	if (!elt)
	{
		alert("click not available")
		return;
	}

	// Simulate a mouse click on the element.
	var evt = document.createEvent('MouseEvents');
	evt.initMouseEvent("click", true, true, window,	0, 0, 0, 0, 0, false, false, false, false, 0, null);
	elt.dispatchEvent(evt);
}


function domRemove(node)
{
	node.parentNode.removeChild(node);
}





	var sAllItemData;
	sAllItemData = '';

function displayCSV()
{
	try
	{
		for( cat in fightCategories )
		{
			getCategoryData(cat);
		}
		
		popup(sAllItemData);
	}
	catch(ex)
	{
		alert("[sort("+what+")] exception occured, please report: "+ex.message);
	}	
	
	
}

function getCategoryData(category) 
{
	var trCategory = fightCategories[category].tr;
	if ( !trCategory )
	{ 
		return;
	}
	var items = [];
	var tr;
	var prev_tr;
	prev_tr = null;
	tr = trCategory.nextElementSibling;

	var xpathNextCat = './/td/h3/span[@class="text"]';
	while (prev_tr != tr && tr && getText(xpathNextCat, tr).length == 0)
	{
		var itemName = getText('.//td[2]/strong', tr);
		var attack = parseInt(getText('.//td[2]/table//td[1]', tr));
		var defense = parseInt(getText('.//td[2]/table//td[2]', tr));
		var owned = trimAll(getText('.//td[3]/table//td[1]', tr).replace("Owned:",""));
		var IsTradable = '';
		if ( trimAll(getText('.//td[3]/table//tr[2]//td[1]', tr)).indexOf('Send') > 0)
		{
			IsTradable = 'Trade';
		}	

		//check if isNaN before adding to dictionary
		if (itemName.length > 0 && !isNaN(attack) && !isNaN(defense))
		{
			sAllItemData = sAllItemData + category + '|' + itemName + '|' + attack + '|'+ defense + '|' + owned + '|' + IsTradable + '~';
		}
		prev_tr = tr;
		tr = tr.nextElementSibling;
		//remove even if not added to items as only the items will be inserted again
		domRemove(prev_tr);
	}
}





var fightCategories = {}

function prepareSort() 
{
	try
	{
		var xpath1 = './/ul[contains(@class,"tabs")]/li[contains(@class,"tab_on")]/div[contains(@class,"tab_content")]';

		if( getText(xpath1+'/a') == "Loot" && xpathFirst(xpath1+'/span')==null) 
		{
			var trWeapons;
			var trArmor;
			var trVehicles;
			var trSpecialLoot;
			var trAnimals;
			//on loot page, find weapons, armor and vehicles
			var xpathAll = './/div[@id="inner_page"]/div/table[@class="main_table"]'
			var table = xpathFirst(xpathAll);
			var xpathCategory = './/tr/td/h3/span[@class="text"]';
			var categories = $x(xpathCategory,table);
			for(i=0;i<categories.length;i++) 
			{
				var trCat = categories[i].parentNode.parentNode.parentNode;
				if ( categories[i].textContent.indexOf("Weapons")>=0 )
				{
					trWeapons = trCat;
				}
				else if ( categories[i].textContent.indexOf("Armor")>=0 )
				{
					trArmor = trCat;
				}
				else if ( categories[i].textContent.indexOf("Vehicles")>=0 )
				{
					trVehicles = trCat;
				}
				else if ( categories[i].textContent.indexOf("Special Loot")>=0 )
				{
					trSpecialLoot = trCat;
				}
				else if ( categories[i].textContent.indexOf("Animals")>=0 )
				{
					trAnimals = trCat;
				}
			}
			fightCategories['weapons'] = { tr:trWeapons, isEnhanced: false};
			fightCategories['armor'] = { tr:trArmor, isEnhanced: false};
			fightCategories['vehicles'] = { tr:trVehicles, isEnhanced: false};
			fightCategories['specialloot'] = { tr:trSpecialLoot, isEnhanced: false, doNotSort:true};
			fightCategories['animals'] = { tr:trAnimals, isEnhanced: false};


			var el = xpathFirst(xpath1);
			makeElement('br',el);
			var span = makeElement('span',el,{'class': 'levels'});
			var a1 = makeElement('a',span);
			a1.addEventListener('click', function(){displayCSV();return false;}, false);
			a1.innerHTML = 'CSV';
		}
		window.setTimeout(prepareSort,5000);
	} 
	catch(ex)
	{
		alert("[prepareSort] exception occured, please report: "+ex.message);
	}
}
	
	

//find if the page is Loot
//xpath is /html/body/div[4]/div/div/table/tbody/tr[8]/td[2]/div/ul/li[7]/div/a
try
{
	
	prepareSort();


}
catch(ex)
{
	alert("[global] exception occured, please report: "+ex.message);
}
