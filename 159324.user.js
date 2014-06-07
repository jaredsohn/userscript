// ==UserScript==
// @name            Amazon Right-Click Search
// @namespace       http://userscripts.org/users/496661
// @description     Right click to search with Amazon
// @author          LostAndFound
// @license         GPL
// @updateURL       https://userscripts.org/scripts/source/159324.meta.js
// @include         *
// @exclude         file://*
// @grant           none
// ==/UserScript==




// CONSTANTS

url_uk='http://www.amazon.co.uk/gp/search?ie=UTF8&camp=1634&creative=6738&index=aps&keywords={searchTerms}&linkCode=ur2&tag=metasearch03-21'

icon='iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAMFBMVEX////4+Pf38eb/5br/257Z3OHX1tX/wmW4u7v/rTCSkpJzc3NBQUEcHBwODg4AAAB/HwUdAAAAAXRSTlMAQObYZgAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAItJREFUeJxjYWDoCeLbGs/AwsBRzMAQBWKIMuxkt1d4wMLAf8ZD9pHDAhaGK2YRYQwMQCnG1c4CYAZX8J39gSBGy7/WvWCGwv8FeWApBsakRIaAhSwMBwK6BRmUy1gYZjcIbVfvf8TicidTtzrsMwPL/pK/69yVpfJZ/vaUpTHcygXq+tuu9O8BAwMA0z4ovkizRgYAAAAASUVORK5CYII%3D'

label='Search Amazon.co.uk'

// MENU FUNCTIONS

var body = document.body;
body.addEventListener('contextmenu', initMenu, false);

var menu = body.appendChild(document.createElement("menu"));
menu.outerHTML = '<menu id="menuid" type="context"><menuitem label="'+label+'" icon="data:image/png;base64,'+icon+'"></menuitem></menu>';
document.querySelector('#menuid menuitem').addEventListener('click', search, false);

function initMenu()
{
    var item1 = document.querySelector('#menuid menuitem');
	body.setAttribute('contextmenu', 'menuid');
}

function search()
{
	var selection = window.getSelection();
    window.open(url_uk.replace('{searchTerms}',selection),'am_uk');
}

