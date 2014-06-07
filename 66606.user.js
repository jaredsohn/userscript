// ==UserScript==
// @name           Facebook Favorites
// @namespace      http://userscripts.org
// @include        *facebook.com*
// ==/UserScript==

var fav1t = '';//Name your first favorite    ('Google') or ('Pandora')
var fav1l = '';//A link to your first favorite    ('http://www.google.com') or ('http://www.pandora.com')
var fav2t = '';//Name
var fav2l = '';//Link
var fav3t = '';//Name
var fav3l = '';//Link
var fav4t = '';//Name
var fav4l = '';//Link
var fav5t = '';//Name
var fav5l = '';//Link

//Gets the reference items
var menubar = document.getElementById('fb_menubar_core');
var inbox = document.getElementById('fb_menu_inbox');

//Creates the menu
var fav_menu_item = document.createElement('li');
fav_menu_item.setAttribute('class', 'fb_menu');
var fav_menu_item_link = document.createElement('a');
fav_menu_item_link.href = 'http://www.facebook.com/group.php?v=wall&gid=297747524571';
fav_menu_item_link.setAttribute('class', 'fb_menu_link');
var fav_menu_item_content = document.createTextNode('Favorites');
fav_menu_item_link.appendChild(fav_menu_item_content);
fav_menu_item.appendChild(fav_menu_item_link);

//Creates the dropdown
var fav_menu_dropdown = document.createElement('div');
fav_menu_dropdown.setAttribute('class', 'fb_menu_dropdown');

//Creates the first item
var fav1 = document.createElement('div');
fav1.setAttribute('class', 'fb_menu_item');
var fav1_link = document.createElement('a');
fav1_link.setAttribute('class', 'fb_menu_item_link');
fav1_link.href = fav1l;//link here
var fav1_content = document.createTextNode(fav1t);//text here
fav1_link.appendChild(fav1_content);
fav1.appendChild(fav1_link);

//Creates the second item
var fav2 = document.createElement('div');
fav2.setAttribute('class', 'fb_menu_item');
var fav2_link = document.createElement('a');
fav2_link.setAttribute('class', 'fb_menu_item_link');
fav2_link.href = fav2l;//link here
var fav2_content = document.createTextNode(fav2t);//text here
fav2_link.appendChild(fav2_content);
fav2.appendChild(fav2_link);

//Creates the third item
var fav3 = document.createElement('div');
fav3.setAttribute('class', 'fb_menu_item');
var fav3_link = document.createElement('a');
fav3_link.setAttribute('class', 'fb_menu_item_link');
fav3_link.href = fav3l;//link here
var fav3_content = document.createTextNode(fav3t);//text here
fav3_link.appendChild(fav3_content);
fav3.appendChild(fav3_link);

//Creates the fourth item
var fav4 = document.createElement('div');
fav4.setAttribute('class', 'fb_menu_item');
var fav4_link = document.createElement('a');
fav4_link.setAttribute('class', 'fb_menu_item_link');
fav4_link.href = fav4l;//link here
var fav4_content = document.createTextNode(fav4t);//text here
fav4_link.appendChild(fav4_content);
fav4.appendChild(fav4_link);

//Creates the fifth item
var fav5 = document.createElement('div');
fav5.setAttribute('class', 'fb_menu_item');
var fav5_link = document.createElement('a');
fav5_link.setAttribute('class', 'fb_menu_item_link');
fav5_link.href = fav5l;//link here
var fav5_content = document.createTextNode(fav5t);//text here
fav5_link.appendChild(fav5_content);
fav5.appendChild(fav5_link);

//Adds the items to the dropdown
fav_menu_dropdown.appendChild(fav1);
fav_menu_dropdown.appendChild(fav2);
fav_menu_dropdown.appendChild(fav3);
fav_menu_dropdown.appendChild(fav4);
fav_menu_dropdown.appendChild(fav5);


//Adds the dropdown to the menu
fav_menu_item.appendChild(fav_menu_dropdown);

//Adds the menu to the page
menubar.insertBefore(fav_menu_item, inbox);