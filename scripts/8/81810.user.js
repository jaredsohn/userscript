// ==UserScript==
	// @name		Custom iplay4e CSS
	// @description		This script enhances the iplay4e site for reduced eye fatigue; 
	// @version		0.0.1
	// @date		2010-07-18
	// @source		http://userscripts.org/scripts/show/12917
	// @identifier		http://userscripts.org/users/194355
	// @author		Steve Jankowski
       // @namespace      http://userscripts.org/scripts/show/81810
      // @include        http://iplay4e.appspot.com/characters/
	
// ==/UserScript==

// GENUINE FREEWARE <3
// (CC) BY-NC-SA: This work is licensed under a Creative Commons Attribution-Noncommercial-Share Alike 3.0 United States License. <http://creativecommons.org/licenses/by-nc-sa/3.0/us/>

// Change Log & To-Do Lists available @source (URI above)
// Feel free to leave suggestions/criticism on the UserScript Page or via email; THANX! =)

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('body
{
	line-height:1.5;
	font-size:75%;
	color:#222;
	font-family:"Helvetica Neue",Arial,Helvetica,sans-serif;
	background:#ccc;
}');