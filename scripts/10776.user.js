// ==UserScript==
// @name           Technorati Rank Display on SponsoredReviews.com
// @namespace      http://www.leftimpact.com
// @description    Adds technorati rank link to sponsoredreviews.com.
// @include        http://www.sponsoredreviews.com/*
// @include        http://sponsoredreviews.com/*
// @version 		0.1
// @author 			Vipul Arora
// ==/UserScript==

// Big ups to Valentin Laube ( http://userscripts.org/scripts/show/921 )
// Big ups to tyler ( http://userscripts.org/scripts/show/1807 )
// Big ups to timendum (http://userscripts.org/scripts/show/3233)
// I stole most of it from timendum who sote from tylerm who stole from Valentin ;)

var coralcacheicon  = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAOCAIAAACpTQvdAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJHSURBVHjabFJLaBNRFL3vzZt8+sk0JW2oUqvQFkktpaBIQFoE3bhQRHTn0nbRrupKcCHoVlD84Gcj4kLsIhUU6qKIoiIKXdS2asQEbD6NaSfNbzIzb+Y976TWlXcOlzf3nbnvnLkPFlKzNbuUMVbT9UXdysqdcATXrcy6md60sty1sGJx8+nyDVLjpevfzn/WX4TUjkux5we0MQBYKb+Zzz9MVj+ZbsVP2wZDh0/0TMS08UIlR3LG9+nFYd2yz/ROTA/cR/a74rNbyUnd3gooQAkICaaAsNo+s/9RLHCMEkIYsACFEe0osmtcn8vc3rC2Qir4KajEyxqDTauayNwr898MSUIASGDUj2tbmAY3m1V8/gYBYBLqvMSlRaVENrE4pKpLuNfp3xWPHLddMByv0TYaDpgOHOk6Gfb1UCRJ4fV4nX+SN1L4eq7v8oX+ax2su26DwQFzu9I1OXD1dO8MdzmaTk59HDWcOhcwHj07M/SgTe3AzwqNX6ulD2WnqPkiMS0eDe7F4noly1DS9rnobyE3OxIeO9U3jXvR4B7EjguUVMs3fhK3pWnP9YCyFEkZUbGSriwvld6Gfd0trNVyzaK59r7wElVM9d/cPkF6GaCVhVqVzrn03cc/rmyYRZX6CFGEdAXYNQ5D4WGFMCakaHAHDTAK+NfurFzMG1kgAhUKYcumHhwfKnFd11uHlMhg+0FsQqXCXbtgrOGkgkRRwANrgkpKJQxoo22qRua/JA7tixcb2X8zkvCfwAsR8e9+9TXxR4ABAFaEKGZWGw5oAAAAAElFTkSuQmCC";

var background_left   = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAOCAYAAADqtqZhAAAAZklEQVQI153OuwmAMBhF4ZOk%2BBuFgJbqCu7gBI6UWZzAEawcRC0VhNikCFj4wNpbna%2B7CqAbmxpw6o5BRKwGnIjYsqjQQJtlOcYYNECapAAXnv2GP%2FyLfttWYoxowIUQ9nmZUN%2BjJzhhGYq8ft%2BLAAAAAElFTkSuQmCC";
var background_middle = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAOCAYAAADuQ3ZcAAAAHElEQVQI12NYdMzpP5O6mgYDEwMDAznEzVs3GADbhgXE7HIXAgAAAABJRU5ErkJggg%3D%3D";
var background_right  = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAOCAYAAADqtqZhAAAAdklEQVQI153OIQ6DQBQA0elfsaYkJFtZegU8aoOr6wl6Fs6CqyonQOIQXAGQJWmymC82raAC3XHPDXVXPuuuzAEOj%2F76UdU34CU7X7DWpkAlxhicOwHcBCA5JgAIu%2F5GWMOGGCPL8gJoZJpHfjuVqGoD%2BHvRDl9lDiMntdjqogAAAABJRU5ErkJggg%3D%3D";

function addGlobalStyle(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}

function addIcons(node, isComment) {
	var anchor, container, background_left, background_middle, background_right;
	
	// add container
	container = document.createElement("div");
	container.className = "sam_container";
	node.parentNode.insertBefore(container, node.nextSibling);

	// add background
	background_left = document.createElement("div");
	background_left.className = "sam_backgroundimage_left";
	container.appendChild(background_left);

	background_middle = document.createElement("div");
	background_middle.className = "sam_backgroundimage_middle";
	container.appendChild(background_middle);

	background_right = document.createElement("div");
	background_right.className = "sam_backgroundimage_right";
	container.appendChild(background_right);
	

	
	//add coral cache link
	anchor = document.createElement("a");
	anchor.href = "http://www.technorati.com/blogs/" + node.href + "?reactions";
	anchor.title = "Vipul's Technorati Link Addition";
	anchor.className = "sam_coralcacheicon";
	background_middle.appendChild(anchor);
	



	// add a space so it wraps nicely
	node.parentNode.insertBefore(document.createTextNode(" "), node.nextSibling);
}

addGlobalStyle("a.sam_coralcacheicon { padding-left: 15px; background: center no-repeat; }");
addGlobalStyle("a.sam_coralcacheicon { background-image: url(" + coralcacheicon + "); }");
addGlobalStyle("a.sam_coralcacheicon:hover { opacity: 0.5; }");

addGlobalStyle("div.sam_container { display:inline; white-space:nowrap; }");
addGlobalStyle("div.sam_backgroundimage_left, div.sam_backgroundimage_middle, div.sam_backgroundimage_right { display: inline; background-repeat: no-repeat; background-position: center; }");
addGlobalStyle("div.sam_backgroundimage_left { padding-left: 3px; background-image:url(" +  background_left + "); }");
addGlobalStyle("div.sam_backgroundimage_middle { background-image:url(" +  background_middle + "); background-repeat: repeat-x; }");
addGlobalStyle("div.sam_backgroundimage_right { padding-left: 3px; background-image:url(" +  background_right + "); }");


var xpath  = "//tbody/tr/descendant::a[starts-with(@href, 'http://')]";
var result = document.evaluate ( xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );

for ( var i = 0; i < result.snapshotLength; i++ ) 
{
	addIcons ( result.snapshotItem ( i ), true );
}
	



