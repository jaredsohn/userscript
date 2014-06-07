// Recent changes
// 1.0.5           Added script update checker
// 1.0.6           Minor fix
// 1.1.0           Added "Stop update" button to the userscripts.com main menu while updating
// 1.1.1           Bug fix in update checker
// 1.1.2           Bug fix in update checker
// 1.1.3           Bug fix in node handling
// 1.1.4           Update checker is now only available for logged in user due to ads display problem
// 1.2.0           Update checker is now also working for not logged in users
// 1.2.1           Bugfix for empty search results
// 1.2.2           Fix for the userscripts.org update (all source lines are indented now)
// 1.3.0           Script is handling the new ad on the userscripts source page
// 1.4.0           Clicking into the userscripts.org search textbox suspends the update
// 1.4.1           Now includes version 0.6.0 of SVC Script Version Checker
// 1.4.2           Minor bugfix
// 1.4.3           Fix for new userscripts.org design ... ad has been added at the bottom of the source page
// 1.4.4           Bugfix: Update is stopped before you leave the /scripts page so using the back button will not execute two parallel updates
// 1.5.0           Taking new userscript.org design into account
//
// ==UserScript==
// @name           Userscripts show includes
// @namespace      http://userscripts.org/users/75950
// @description    Show includes for scripts on userscripts.org
// @include        http://userscripts.org/scripts
// @include        http://userscripts.org/scripts?*
// @include        http://userscripts.org/scripts/search?*
// @version        1.5.0
// ==/UserScript==

var theScripts = Array();
var theLinks = Array();
var theScriptMeats = Array();
var currentscript = 0;
var scriptcount = 0;
var oldHeading;
var newMenuEntry;
var theMainMenu;
var activeSuspend=false;

function DoRequest() {
	GM_xmlhttpRequest({
	    method: 'GET',
	    url: 'http://userscripts.org/scripts/review/'+theScripts[currentscript],
	    headers: {
	        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
	        'Accept': 'text/html',
	    },
	    onload: function(responseDetails) {
	    	var newelem=document.createElement('div');
	        newelem.innerHTML=responseDetails.responseText;
	        newelem.style.display='none';
		if(newelem.getElementsByClassName('ad')[0]!=undefined) newelem.getElementsByClassName('ad')[0].innerHTML='';
		if(newelem.getElementsByClassName('ad bottom')[0]!=undefined) newelem.getElementsByClassName('ad bottom')[0].innerHTML='';
	        document.getElementsByTagName('body')[0].appendChild(newelem);
	        newelem=document.getElementById('source');
	        insertIncludes(newelem.innerHTML);
	        newelem.parentNode.removeChild(newelem);
	    }
	});
}

function insertIncludes(theSource) {
    if(!activeSuspend) {
	    var theMeat = document.createElement('p');
	    theMeat.innerHTML='<b>Includes</b>';
	    theScriptMeat[currentscript].appendChild(theMeat);
	    var theLines = theSource.split('\n');
	    for(i=0; i<theLines.length; i++) {
	    	theLines[i]=theLines[i].replace(/^\s+|\s+$/, "");
	        if(theLines[i].indexOf('// @include')==0) {
	            // insert a paragraph for each include line
	            var theMeat = document.createElement('p');
	            theMeat.innerHTML=theLines[i].substring(11).replace(/^\s+|\s+$/, "");
	            theScriptMeat[currentscript].appendChild(theMeat);
	        }
	    }
	    currentscript++;
	    if(currentscript<scriptcount) {
	        var theHeading=document.getElementById('content').getElementsByTagName('th')[0];
	        theHeading.innerHTML=oldHeading+' (Updating script '+(currentscript+1)+' of '+scriptcount+')';
	        DoRequest();
	    } else {
	        SuspendUpdate();
	    }
    }
}

function SuspendUpdate() {
        var theHeading=document.getElementById('content').getElementsByTagName('th')[0];
        theHeading.innerHTML=oldHeading;
        theMainMenu.removeChild(newMenuEntry);
	document.getElementsByName('q')[0].removeEventListener('click',HandleTextboxClick, false);
}

function HandleTextboxClick(event) {
	currentscript=scriptcount;
	activeSuspend=true;
	SuspendUpdate();
	event.stopPropagation();
	event.preventDefault();
}

window.addEventListener(
  'load',
  function () {
    document.getElementsByName('q')[0].addEventListener('click',HandleTextboxClick, false);
    theLinks = document.getElementsByClassName('title');
    scriptcount = theLinks.length;
    if(scriptcount>0) {
        theScriptMeat = document.getElementsByClassName('script-meat');
        for(i=0; i<scriptcount; i++) {
            theScripts.push(theLinks[i].href.substring(36));
        }
        var theHeading=document.getElementById('content').getElementsByTagName('th')[0];
        oldHeading=theHeading.innerHTML;
        theHeading.innerHTML=oldHeading+' (Updating script '+(currentscript+1)+' of '+scriptcount+')';
        theMainMenu = document.getElementById('mainmenu');
        newMenuEntry = document.createElement('li');
        newMenuEntry.innerHTML = '<a id="stopupdate" href="#" rel="nofollow">Stop update</a>';
        theMainMenu.appendChild(newMenuEntry);
        newMenuEntry.addEventListener('click',
           function(event) {
              event.preventDefault();
              currentscript=scriptcount;
              activeSuspend=true;
              SuspendUpdate();
           }, false);
        DoRequest();
    }
  },
true);

window.addEventListener(
  'unload',
  function () {
      currentscript=scriptcount;
      activeSuspend=true;
      SuspendUpdate();
  },
true);
