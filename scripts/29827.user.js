// ==UserScript==
// @name           NameChanger
// @namespace      http://localhost
// @description    This script allows you to change the names of peoples tags on the FB 
//                 Hobowars boards.
// @author         Original Xyan Flux (modified by me)

// @version        1.0.0a
// @include        http://www.hobowars.com/fb/game.php*
// @exclude
// ==/UserScript==


var allLinks, thisLink;

var name='Andy'; 			// The Creator
var tag='The Phantom';		        // Enter new tag here

//**********************************************************************************************
var name1='Minister';			// Enter name of Hobo here
var name1a='Governor';			// Enter alias of Hobo here
var name1b='Alias_b';				
var tag1='Big Boss';			// Enter the name you wan to call the Gov and Minister here

//**********************************************************************************************
var name2='Secretary'; 			// The Secretary
var tag2='Little Boss';			// Enter what you want the sec to be called here

//**********************************************************************************************
var name3='Maddness';			// Here's one big Douche's name that should be changed
var name3a='Malefic';			// Some of the many Alias he goes by
var name3b='True Maddness'; 		
var name3c='Nicki Loves Labia';
var name3d='Aliasnew';                   // Left open for new alias
var tag3='Closet Gay';			// Enter a Name for the Douche here, or leave it as is

//**********************************************************************************************
var name4='Hoboname'; 			// Enter name of Hobo here
var tag4='Hobotage';		        // Enter Change of Name 4 here

//**********************************************************************************************
var name5='Hoboname1'; 			// Enter name of Hobo here
var tag5='HoboTag1';		        // Enter Change of Name 5 here

//**********************************************************************************************
var name6='Hoboname2'; 			// Enter name of Hobo here
var tag6='Hobotag2';			// Enter Change of Name 6 here

//**********************************************************************************************
//**********************************************************************************************

allLinks = document.evaluate('//a[@style]',document,null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (var i = 0; i < allLinks.snapshotLength; i++) {
	thisLink = allLinks.snapshotItem(i);
	
	thisLink.innerHTML = thisLink.innerHTML.replace(name,tag);

        thisLink.innerHTML = thisLink.innerHTML.replace(name1,tag1);
	thisLink.innerHTML = thisLink.innerHTML.replace(name1a,tag1);
	thisLink.innerHTML = thisLink.innerHTML.replace(name1b,tag1);

	thisLink.innerHTML = thisLink.innerHTML.replace(name2,tag2);

	thisLink.innerHTML = thisLink.innerHTML.replace(name3,tag3);	
	thisLink.innerHTML = thisLink.innerHTML.replace(name3a,tag3);	
	thisLink.innerHTML = thisLink.innerHTML.replace(name3b,tag3);	
	thisLink.innerHTML = thisLink.innerHTML.replace(name3c,tag3);
	thisLink.innerHTML = thisLink.innerHTML.replace(name3d,tag3);

	thisLink.innerHTML = thisLink.innerHTML.replace(name4,tag4);
	thisLink.innerHTML = thisLink.innerHTML.replace(name5,tag5);
	thisLink.innerHTML = thisLink.innerHTML.replace(name6,tag6);
}