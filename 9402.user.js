// ==UserScript==
// @name          FBookProfileMenu
// @namespace     http://goodevilgenius.blogspot.com/2007/05/facebook-profile-menu.html
// @description   Displays a drop down menu of links to your stuff in the navigation bar.
// @include       http://*facebook.com*
// ==/UserScript==
//
// By: Dan Jones
// Email: good.evil.genius+Facebook AT gmail
// Last Update:  19 Aug 2007

function JSON2Dom(json){if(json.text){return document.createTextNode(json.text);}
if(json.comment){return document.createComment(json.comment);}
var node=document.createElement(json.n);for(var i in json.att){node.setAttribute(i,json.att[i]);}
for(var i in json.ch){var child=JSON2Dom(json.ch[i]);node.appendChild(child);}
for(var i in json.ev){node.addEventListener(i,json.ev[i]);}
for(var i in json.prop){node[i]=json.prop[i];}
return node;}
var navbar=document.getElementById('nav_unused_1');var profItem=navbar.firstChild;var profLink=profItem.firstChild.getAttribute('href');var uid=profLink.match(new RegExp('id=([0-9]*)'))[1];var newDiv=document.createElement('div');newDiv.setAttribute('class','with_arrow');while(profItem.firstChild){newDiv.appendChild(profItem.firstChild);}
profItem.appendChild(newDiv);var clickfunc="return optional_drop_down_menu(this,ge('profile_link'),ge('profile_menu'), event);";var link={"n":"a","att":{"class":"global_menu_arrow","href":"#","onclick":clickfunc},"ch":[{"n":"img","att":{"align":"top","src":"http://static.ak.facebook.com/images/global_menu_space.gif"}}]};newDiv.insertBefore(JSON2Dom(link),newDiv.lastChild);var list={"n":"ul","ch":[],"add":function(link,text){this.ch.push({"n":"li","ch":[{"n":"a","att":{"href":link},"ch":[{"text":text}]}]});}};list.ch.push({"n":"li","ch":[{"text":"See my..."}]});list.ch.push({"n":"li","att":{"class":"menu_divider"}});list.add("/profile.php?id="+uid,"Profile");list.add("/photos.php?id="+uid,"Photos");list.add("/video/?id="+uid,"Videos");list.add("/notes.php?id="+uid,"Notes");list.add("/groups.php?id="+uid,"Groups");list.add("/posted.php?id="+uid,"Posted Items");list.add("/marketplace/?id="+uid,"Marketplace");var listDiv={"n":"div","att":{"id":"profile_menu","class":"navigator_menu profile","style":"display:none;"},"ch":[list]};profItem.appendChild(JSON2Dom(listDiv));