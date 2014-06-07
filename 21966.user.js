// ==UserScript==
// @name           Pleobar
// @namespace      www.pleonast.com/
// @include        http://*.pleonast.com/users/*
// @include        http://*.pleonast.com/groups/*
// @include	    http://*.pleonast.com/rooms/*
// @include        http://pleonast.com/users/*
// @include        http://pleonast.com/groups/*
// @include	    http://pleonast.com/rooms/*
// ==/UserScript==

(function()
{
function $x1(xpath,root){return document.evaluate(xpath,(root?root:document),null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function $c1(className,root){
	if (document.getElementsByClassName) {
		return root ? root.getElementsByClassName(className)[0] : document.getElementsByClassName(className)[0];
	} else {
		return $x1('//*[contains(@class,"'+className+'")][1]',root);
	}
}

function createLink(varName, className, href, text, alt) {
	
	//create new elements
	newLI = document.createElement('li'); 
	newURL = document.createElement('a');
	spacerElement = document.createTextNode('|');
		
	// Add new Elements to document
	varName.appendChild(newLI);
	newLI.appendChild(spacerElement);
	newLI.appendChild(newURL);
	
	//set List Item Properties
	newLI.id = text; 
	newLI.className = 'weblog pleobar';
	
	//set URL Properties
	//newURL.id = "url." + text;
	newURL.className = className ;
	newURL.href = href ;
	newURL.title = alt ;
	newURL.innerHTML = " "+text+" ";
	
	}

URLPathArr = window.location.pathname.split( '/' );

URLPath = window.location.pathname;
URL = window.location.href;

var newnav = document.createElement("li");
var oldnav = document.getElementById('nav');
newnav.id = "nav";

var username = $c1('username').innerHTML;
addGlobalStyle('.pleobar { font-size: .7em !important; padding-top: 14px !important;}');

if (!$c1('login') || URLPathArr[4] == 'new') { //if logged in or on add entry page (which you can only do if logged in)
	if (URLPathArr[1] == 'users') { //if on user page
		var addEntry = 'blog' ;
		if(URLPathArr[2] == username) {
		createLink(oldnav, 'nav_url', '/users/'+ URLPathArr[2] +'/entries/new', "add entry to "+ addEntry+"", "add entry to "+ addEntry+"");
	} else {
		createLink(oldnav, 'nav_url', '/'+URLPathArr[1]+'/'+ username + '/entries/new', "add entry to blog", "add entry to "+ addEntry+""); 
	}
	} else if (URLPathArr[1] == "groups") { // if on group page
		var addEntry = URLPathArr[2] ;
		if (URLPathArr[4] == 'new') { // if on add new group discussion page
			createLink(oldnav, 'nav_url', '/users/'+ username +'/entries/new', "add entry to blog", "add entry to "+ addEntry+""); 	
		} else { createLink(oldnav, 'nav_url', '/groups/'+ URLPathArr[2] +'/entries/new', "add entry to "+ addEntry+"", "add entry to "+ addEntry+""); }
	} else if(URLPathArr[1] == "rooms") { //if in room
		var addEntry = "blog" ;
	createLink(oldnav, 'nav_url', '/users/'+ username +'/entries/new', "add entry to "+ addEntry+"", "add entry to "+ addEntry+""); 
	}
	
	if (URLPathArr[1] == 'users' || URLPathArr[1] == 'groups' || URLPathArr[1] == 'rooms' && URLPathArr[3] != 'messages') { // if on messages don't print send msg buttons
		if (URLPathArr[2] == username || URLPathArr[1] == 'groups' || URLPathArr[1] == "rooms") {
			createLink(oldnav, "nav_url message", 'http://pleonast.com/users/'+username+'/messages/new', 'send msg', 'send a message'); 
		} else {
			createLink(oldnav, "nav_url message", 'http://pleonast.com/users/'+username+'/messages/new?return='+URL+'&to='+URLPathArr[2], 'send msg to '+URLPathArr[2], 'send a message to '+URLPathArr[2]); 
		}
	}	
	
	createLink(oldnav, "nav_url", "http://pleonast.com/logout", "logout", "logout of pleonast");

	}

var SUC_script_num = 21966; // Change this to the number given to the script by userscripts.org (check the address bar)
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}


}) ();