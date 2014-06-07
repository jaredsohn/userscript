// ==UserScript==
// @name            Amazon Right-Click Search
// @namespace       http://userscripts.org/users/496661
// @description     Right click to search with Amazon
// @author          LostAndFound
// @license         GPL
// @updateURL       https://userscripts.org/scripts/source/154303.meta.js
// @include         *
// @exclude         file://*
// @grant           none
// ==/UserScript==




// ICONS

blank='iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAEUlEQVR4nGNhIABYRhWMJAUASDAAQbwy4fkAAAAASUVORK5CYII%3D'
amz='iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAMFBMVEX////4+Pf38eb/5br/257Z3OHX1tX/wmW4u7v/rTCSkpJzc3NBQUEcHBwODg4AAAB/HwUdAAAAAXRSTlMAQObYZgAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAItJREFUeJxjYWDoCeLbGs/AwsBRzMAQBWKIMuxkt1d4wMLAf8ZD9pHDAhaGK2YRYQwMQCnG1c4CYAZX8J39gSBGy7/WvWCGwv8FeWApBsakRIaAhSwMBwK6BRmUy1gYZjcIbVfvf8TicidTtzrsMwPL/pK/69yVpfJZ/vaUpTHcygXq+tuu9O8BAwMA0z4ovkizRgYAAAAASUVORK5CYII%3D'

// MENU ITEMS

var urls = new Array()
var icons = new Array();
var labels = new Array();

urls.push('');

urls.push('http://www.amazon.com/gp/search?ie=UTF8&camp=1789&creative=9325&index=aps&keywords={searchTerms}&linkCode=ur2&tag=metasearch-20');
urls.push('http://www.amazon.co.uk/gp/search?ie=UTF8&camp=1634&creative=6738&index=aps&keywords={searchTerms}&linkCode=ur2&tag=metasearch03-21');
urls.push('http://www.amazon.de/gp/search?ie=UTF8&camp=1638&creative=6742&index=aps&keywords={searchTerms}&linkCode=ur2&tag=metasearch-21');
urls.push('http://www.amazon.fr/gp/search?ie=UTF8&keywords={searchTerms}&tag=metasearch09-21&index=aps&linkCode=ur2&camp=1642&creative=6746');
urls.push('http://www.amazon.it/gp/search?ie=UTF8&keywords={searchTerms}&tag=claudidivizip-21&index=aps&linkCode=ur2&camp=3370&creative=23322');

icons.push(amz);
icons.push(amz);
icons.push(amz);
icons.push(amz);
icons.push(amz);
icons.push(amz);

labels.push('Search ALL (opens multiple tabs)');
labels.push('Search Amazon .com');
labels.push('Search Amazon .co.uk');
labels.push('Search Amazon .de');
labels.push('Search Amazon .fr');
labels.push('Search Amazon .it');

// MENU

menuitems='';
for (var i=0;i<labels.length;i++)
{
	menuitems=menuitems+'<menuitem label="'+labels[i]+'" icon="data:image/png;base64,'+icons[i]+'"></menuitem>';
}

var body = document.body;

body.addEventListener('contextmenu', initMenu, false);

var menu = body.appendChild(document.createElement("menu"));

function initMenu()
{
	body.setAttribute('contextmenu', 'menuid');
}

menu.outerHTML = '<menu id="menuid" type="context">'+menuitems+'</menu>';

function search(n)
{
	var selection = window.getSelection();
	if (selection==''&&n==0){selection=prompt(labels[n])}
	if ((selection!==''&&selection!==null))
	{
		if (n!=0)
		{
			window.open(urls[n].replace('{searchTerms}',selection),'_blank');
		}
		else
		{
			for (var i=1;i<urls.length;i++)
			{
				window.open(urls[i].replace('{searchTerms}',selection),'_blank');
			}
		}
	}
}

items=document.querySelectorAll('#menuid menuitem')
items[0].addEventListener('click', search0, false); function search0(){search(0)}
items[1].addEventListener('click', search1, false); function search1(){search(1)}
items[2].addEventListener('click', search2, false); function search2(){search(2)}
items[3].addEventListener('click', search3, false); function search3(){search(3)}
items[4].addEventListener('click', search4, false); function search4(){search(4)}
items[5].addEventListener('click', search5, false); function search5(){search(5)}
