// ==UserScript==
// @name           Facebook old links
// @namespace      http://userscripts.org
// @include        *facebook.com*
// ==/UserScript==

//Create the 'Friends' menubar item
var item = document.createElement('li');
item.setAttribute('id', 'navAccount')
var link = document.createElement('a');
link.setAttribute('id', 'navAccountLink');
link.setAttribute('href', 'http://www.facebook.com/friends/?ref=tn');
link.setAttribute('onclick', 'var toggle = function() {this.onclick = function(e) {e = e || window.event;e && Event.prevent(e);Toggler.toggle(this);}.bind(this);this.onclick();}.bind(this);this.onclick = function() {CSS.toggleClass(this.parentNode, \'openToggler\');return false;}.bind(this);this.onclick();onloadRegister(toggle);return false;');
var text = document.createTextNode('Friends');
var list = document.createElement('ul');

//Create 'Recently Added' link
var item1 = document.createElement('li');
var link1 = document.createElement('a');
link1.setAttribute('href', 'http://www.facebook.com/friends/?added&ref=tn');
var text1 = document.createTextNode('Recently Added');
link1.appendChild(text1);
item1.appendChild(link1);
list.appendChild(item1);

//Create the 'All Freinds' link
var item2 = document.createElement('li');
var link2 = document.createElement('a');
link2.setAttribute('href', 'http://www.facebook.com/friends/?filter=afp&ref=tn');
var text2 = document.createTextNode('All Friends');
link2.appendChild(text2);
item2.appendChild(link2);
list.appendChild(item2);

//Create the cool looking line
var item2_0 = document.createElement('li');
var rule2_0 = document.createElement('hr');
item2_0.appendChild(rule2_0);
list.appendChild(item2_0);

//Create the 'Invite Freinds' link
var item3 = document.createElement('li');
var link3 = document.createElement('a');
link3.setAttribute('href', 'http://www.facebook.com/invite.php?ref=tn');
var text3 = document.createTextNode('Invite Freinds');
link3.appendChild(text3);
item3.appendChild(link3);
list.appendChild(item3);

//Create the 'Find Friends' link
var item4 = document.createElement('li');
var link4 = document.createElement('a');
link4.setAttribute('href', 'http://www.facebook.com/find-friends/?ref=friends');
var text4 = document.createTextNode('Find Friends');
link4.appendChild(text4);
item4.appendChild(link4);
list.appendChild(item4);

//Build it all together
link.appendChild(text);
link.innerHTML = "Friends &darr;";//I tried putting the down arrow in before, but it didnt work. so i just put it here
item.appendChild(link);
item.appendChild(list);

//Insert the items onto the bar
var bar = document.getElementById('pageNav');
var tab = document.getElementById('navAccount');
bar.insertBefore(item, tab);

//get some stuff
var pitem = bar.getElementsByTagName('li')[1];
var plink = pitem.getElementsByTagName('a')[0];
var ploco = plink.href;

//Create the dropdown list
var plist = document.createElement('ul');

//Create the 'Wall' link
var pitem1 = document.createElement('li');
var plink1 = document.createElement('a');
plink1.setAttribute('href', ploco);
var ptext1 = document.createTextNode('My Wall');
plink1.appendChild(ptext1);
pitem1.appendChild(plink1);
plist.appendChild(pitem1);

//Create the 'Info' link
var piloco = ploco + '?v=info&ref';
var pitem2 = document.createElement('li');
var plink2 = document.createElement('a');
plink2.setAttribute('href', piloco);
var ptext2 = document.createTextNode('My Info');
plink2.appendChild(ptext2);
pitem2.appendChild(plink2);
plist.appendChild(pitem2);

//Create the 'Photos' link
var pploco = ploco + '?v=photos&ref';
var pitem3 = document.createElement('li');
var plink3 = document.createElement('a');
plink3.setAttribute('href', pploco);
var ptext3 = document.createTextNode('My Photos');
plink3.appendChild(ptext3);
pitem3.appendChild(plink3);
plist.appendChild(pitem3);

//If everything went well and it got the profile tab...
if (plink.innerHTML.match('Profile')) {
	pitem.setAttribute('id', 'navAccount');
	plink.setAttribute('id', 'navAccountLink');
	plink.setAttribute('onclick', 'var toggle = function() {this.onclick = function(e) {e = e || window.event;e && Event.prevent(e);Toggler.toggle(this);}.bind(this);this.onclick();}.bind(this);this.onclick = function() {CSS.toggleClass(this.parentNode, \'openToggler\');return false;}.bind(this);this.onclick();onloadRegister(toggle);return false;');
	pitem.appendChild(plist);
	plink.innerHTML = "Profile &darr;";
};