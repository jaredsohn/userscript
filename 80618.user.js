///////////////////////////////////////////////////////////////////////////////
//
// This is a Greasemonkey user script.
//
// vBulletin4 Thread Hider
// Version 1.02, 2011-06-24
// Coded by Paul Oliver.  See namespace URL below for contact info.
// Released under the GPL license: http://www.gnu.org/copyleft/gpl.html
//
// Script can be found at http://userscripts.org/scripts/show/80618
// 
// ==UserScript==
// @name		vBulletin4 Thread Hider V1.02
// @namespace	http://userscripts.org/users/187006
// @author		Paul Oliver
// @version		1.02
// @description	Hides threads you do not want to read again.
// @include */search.php?searchid=*
// @include */search.php?&searchid=*
// @include */forumdisplay.php*
// @include */forum.php*
// @include *vbseo.com*
// ==/UserScript==
//
///////////////////////////////////////////////////////////////////////////////
//
// For install, uninstall, and known issues, see the namespace link above.
//
///////////////////////////////////////////////////////////////////////////////
//
// This script allows you hide vBulletin4 threads that you don't want to see
// any more.  You can undo last hide too.
//
// This is based off the work from Mithrandir: vBulletin - Full ignore:
// http://userscripts.org/scripts/show/24465
//
// If you like it please visit my site: http://www.what-does-mba-stand-for.com/
//
///////////////////////////////////////////////////////////////////////////////
// 
// Last Change 2011-06-21
// 
// Version 1.0.2
// [*] Added the ability to filter threads based on a string
// [*] Added a popup screen to manage your filters
// [*] Added a feature that lets you show hidden threads (faded out)
//
///////////////////////////////////////////////////////////////////////////////

var Params = {
    scriptName: "vBulletin 4 Thread Hider",
    versionMajor: 1,
    versionMinor: 0,
    versionBuild: 2,
    dev: false,
    ready: false,
    started: false,
    debug: false,
    enabled: true,
    iFrame: false,
    screenNeedsRefresh: false,
    profilePicRegex: /(?:class=\\"img\\" )?src(?:\\)?=\\"([^"]*)\\" alt(?:\\)?=\\"([^"]*)\\" id(?:\\)?=\\"profile_pic\\"/,
    Ajax: {
        Headers: { 'Content-type': 'application/x-www-form-urlencoded', 'Pragma': 'no-cache' }
    },
    Paging: { },
    Logging: {
        times: false,
        errors: true,
        infos: false,
        warnings: true,
        debug: false,
        messages: false
    },
    defaultSettings: {
        deactivated: true,
        reappeared: true,
        accepted: true,
        ignored: true,
        icons: true,
        uid: false,
        notifUnfriend: true,
        notifIgnored: true,
        updatePicture: true,
        hideInMenubar: false,
        onlyShowNewUnfriends: true,
        dissociateLists: true,
        showTime: true,
        logging: true,
        hideOwnUnfriends: true,
        paging: 20,
        hideNub: false,
        sortBy: 'title',
        showIgnored: false,
    },
    versionChanged: false,
    url: window.location.href,
    env: { },
    settings: { logging: true }
};
var Strings = { };
var IgnoredThreads = [];
var IgnoredStrings = [];

function getFromId(_id) {
    return document.getElementById(_id) || null;
};

function evalName(name) {
    return eval('"'+name.replace(/"/g, '\"')+'"');
}

var xHTMLElement = function(__constructor) {
    var htmlelement = this;
    var __element, event;
    htmlelement.build = function() {
        try {
            if (!__constructor.element) return false;
            __element = document.createElement(__constructor.element);
            
            if (__constructor.listeners) {
                for (event in __constructor.listeners) {
                    if (typeof __constructor.listeners[event] == 'function') EventMgr.addListener(__element, event, __constructor.listeners[event]);     
                }
                delete __constructor.listeners;
            }
            Extend(__element, __constructor);
            if (__constructor.parentNode) {
                htmlelement.appendTo(__constructor.parentNode);
                delete __constructor.parentNode;
            }
            
            return htmlelement;
        }
        catch (exception) { return false; }
    };

    htmlelement.appendTo = function(__parent) {
        try {
            if (__parent) {
                if (__element.before) __parent.insertBefore(__element, __element.before);
                else __parent.appendChild(__element);
            }
            return htmlelement;
        }
        catch (exception) { return false; }
    };

    htmlelement.getElement = function() {
        return __element;
    };

    htmlelement.toString = function() { return '[object xHTMLElement]'; };

    return htmlelement.build();
};

var Switch = function(__value, __options, __default) {
    if (__options.hasOwnProperty(__value)) return __options[__value];
    else if (__options.hasOwnProperty('default')) return __options['default'];
    else return __default;
};

var Console = {
    time: function($str) {
        if (!Params.settings.logging) return;
        try { if (Params.Logging.times) console.time($str); }
        catch (exception) { ; }
    },                         
    error: function($str) {
        if (!Params.settings.logging) return;
        try { if (Params.Logging.errors) console.error($str); }
        catch (exception) { ; }
        if (Params.debug) this.addToDebug($str, 'error', arguments.caller);
    },
    info: function($str) {
        if (!Params.settings.logging) return;
        try { if (Params.Logging.infos) console.info($str); }
        catch (exception) { ; }
        if (Params.debug) this.addToDebug($str, 'info', arguments.caller);
    },
    warn: function($str) {
        if (!Params.settings.logging) return;
        try { if (Params.Logging.warnings) console.warn($str); }
        catch (exception) { ; }
        if (Params.debug) this.addToDebug($str, 'warn', arguments.caller);
    } ,
    debug: function($str) {
        if (!Params.settings.logging) return;
        try { if (Params.Logging.debug) console.debug($str); }
        catch (exception) { ; }
        if (Params.debug) this.addToDebug($str, 'debug', arguments.caller);
    },
    log: function($str) {
        if (!Params.settings.logging) return;
        try { if (Params.Logging.messages) console.log($str); }
        catch (exception) { ; }
        if (Params.debug) this.addToDebug($str, 'log', arguments.caller);
    },
    timeEnd: function($str) {
        if (!Params.settings.logging) return;
        try { if (Params.Logging.times) console.timeEnd($str); }
        catch (exception) { ; }
    },
    addToDebug: function($str, type, calling) {
        if (!Params.settings.logging) return;
        if (!getFromId('debugContainer')) new xHTMLElement({
            element: 'div',
            id: 'debugContainer',
            parentNode: document.body,
            style: {
                width: '500px',
                height: '400px',
                border: '1px solid red',
                position: 'fixed',
                top: '50px',
                left: '10px',
                overflowY: 'scroll',
                background: '#F2F2F2',
                opacity: '0.7',
                filter: 'filter:alpha(opacity=70)'
            }
        });
        var icon = Switch(type,{
            'warn': '<i class="UIImageBlock_Image UIImageBlock_ICON_Image img sp_29yryj sx_a735f9"></i>',
            'error': '<i style="top: 2px; position: relative;" class="GenericStory_Icon img spritemap_icons sx_app_icons_ignored"></i>',
            'log': '<i class="UIImageBlock_Image UIImageBlock_ICON_Image img sp_7y2vv3 sx_d77dd2"></i>',
            'info': '<i class="UIImageBlock_Image UIImageBlock_ICON_Image img sp_7y2vv3 sx_d77dd2"></i>',
            'debug': '<i class="UIImageBlock_Image UIImageBlock_ICON_Image img sp_o4h70e sx_6a642a"></i>'
        });
        var div = '<div style="height:18px;">';
        if (/------/.test($str)) { 
            $str = '<hr />';
            icon = '';
            div = '<div style="height:11px;">';
        }
        else if (/Starting Loop/.test($str)) {
            icon = '<i class="img" style="background: url(\''+Params.links.rsrc+'/z9/r/1UegXkZmC6E.png\') no-repeat 0 -34px; display: inline-block; height: 16px; width: 16px;"></i>';
        }
        getFromId('debugContainer').innerHTML += div+icon+' '+$str+'</div>';
        getFromId('debugContainer').scrollTop = '10000';
    }
};

//Copy properties from object to object
function Extend(target, source){ 
    if (typeof source === 'object') {
        var property;
        for(property in source) {
            if (source.hasOwnProperty(property)) {
                if (source[property] != null) {
                    if (/Object/.test(source[property].constructor)) {
                        if (property in target) void(0);
                        else target[property] = {};
                        Extend(target[property], source[property]);  
                    }
                    else try { 
                        target[property] = source[property];
                    } catch (exception) { ; }
                }
            }
        }
    }
    return target;
};

function ExtendNew(target, source){
    if (!target) target = {};
    if (typeof source === 'object') {
        var property;
        for(property in source) {
            if (source.hasOwnProperty(property)) {
                if (typeof source[property] === 'object') {
                    if (property in target) void(0);
                    else {
                        target[property] = {};
                        ExtendNew(target[property], source[property]);  
                    }
                }
                else try { 
                    if (property in target) void(0);
                    else target[property] = source[property];
                } catch (exception) { ; }
            }
        }
    }
    return target;
};

function findGoodPlaceToStickManageButton() {
	var stickMeHere = getFromId('navtabs');
}

initEnv();

try { Params.settings = eval(getKey('settings', stringify(Params.defaultSettings))); }
catch (ex) { Params.settings = Params.defaultSettings; }
ExtendNew(Params.settings, Params.defaultSettings);
setKey('settings', stringify(Params.settings));
Params.enabled = (getKey('enabled', 'enabled') == 'enabled'?true:false);

var alertLimit = 0;
var alertCount = 0;

// read the ignored Threads from storage
var ignoredThreadsText = getKey("ignoreThreadsById");
IgnoredThreads = eval(ignoredThreadsText);

var ignoredStringsText = getKey("ignoreThreadsByString");
IgnoredStrings = eval(ignoredStringsText);

var stickMeHere = getFromId('navtabs');
if (stickMeHere) {


	var img = document.createElement('img');
	img.width = '32';
	img.height = '32';
	img.setAttribute("border", '0');
	img.setAttribute("style", "cursor: pointer; border: 0px;");
	img.title = 'Manage Your vBulletin4 Hidden Threads';
	img.src = "data:image/gif,GIF89a%24%00%24%00%C4%00%00%BA%C5%D5r%82%A0%CB%D7%E4%C2" +
"%CD%DA%87%98%ABb%14%17%FB%01%04ny%8A%A8%B5%C9%ED%F3%F8%93%02%03%93%A1%" +
"B7%9C%A8%C3IVrFEO%D7%E1%EC%A1VY%3AIe%81%8C%9E%24%16!%2C4J%CC%00%00%B6%" +
"C7%F3%B2%BE%CEUaz%AC%BA%CE%A0%B0%C4%AA%B9%E5%60iz%82%93%C2cOQ%FF%FF%FF!" +
"%F9%04%00%00%00%00%00%2C%00%00%00%00%24%00%24%00%00%05%FF%E0%90-%DA5%0" +
"8%C2%83%A6%EAp%BD%C0*%0Ct%3D%00%F8%08HG%1FH%0BDL%80%90%40%8EH%C8aq%AA%" +
"E1%9E%97%22%80%E3hX%1B%98l%C3%A1%A8%18%BE%E0%AF%A2p%B8%002%19%84%1A%A1" +
"!p%06%12%0A%A5%11%A9G%26%0ApE%C1%E7%7B%C5%14%04Ql%1A%1A%0C%12o%08r%11V" +
"w%7Fc%11%18%00%0BX%5B%05%7F%05%01%00%84%86%881%18%11r%14%13%60%0A%11%01" +
"%A8%9B%A7%1D%1D%0C%1Ey%06%99Q%85%87%1CCm%07%13%7F%06%15%13%0D%A8%0B%00X" +
"%AC%0C%0F%01%05_%05%04%19%B4%9E(4%0D%5E%0A%BA%BC%13%12%01%1D%00%07%AB%D" +
"9%0F%12%C8%B1%1Al%B51%03%0F%1A%C8%15%18%E8b%11%0B%1D%19%04%14%1C%0C%AD'" +
"%07y%0A%1C%17%9Do3%02%1E%BC(%BB%C0%01%16%19%06%0C%10%D4a%B0%81%01%80%1B" +
"%0E%04%8A%ABuB%40%86t%0D%3A%A0%A2%00k%02B%82%14%3AX%D8%B0%81%C6%02d%0A" +
"%0E%FFd%A0%98BB%9E%02%ACbR%F0R%C1%83%85%0Bq%0E%08%B0%60%E1!%00%07_%1C%A" +
"CDt%E2A%40%03%146%18Zp%08%9C%02M%1A%EA%08H%90%60%C6%80%03%12Y%0AH7A%83%8" +
"0%0Dh%2C%E0KF%60%00%06%0A%00%3E%A8EA%E0%25%09%A23PR%08%90%40%C5%0A%0C%06" +
"%8B%04R%FB!%C1%00v%0A%24h%80%3B%40.%86%04%7D%A9~%10%10%91%97%03E%18%F8.F%" +
"80R0a%B9%0D%06HV%7BQ%0C%07%0E%14%04%F0M%00%98%C0%60%7F%8CyQ%88%20as_%02NC" +
"1%90%AC%C1%ED%E9%8A%18%BCL%60%84x%F3%83%B1%B1(%1C%90L%20%2B%5C%01.%83%3BH" +
"%BB%D9o%B4%2F%BB%7B%7F%F0%10t%A8-%14%9D%2B%C8i%ED%FA%C1%80%C6%BD%10%ACE%" +
"19%C0%FA%C3%13G%0BDw%FD%E1%01%00%A7%91%A7%0B%8CB%AE%06%BB%5E%13%987%7F%B" +
"0%C0%20%FF%7C%04XT%1F%0E%02p%20%CD%04%C3%B1%F7%40%FF%02%C0%15%90%8E%07%E" +
"D%010%E0y%8DM%23%1D%7BG%81Q%C0%03%7D%11%E1%C9%0D8%880%93c%1A%5CH%1B8%B1h" +
"%B6X%06%3B%EC%03b%88%194f%C0%18%07%20%60%8E%008%BD%F2E%05%05%5C%20%00%01" +
"Y0%00%C7%3E%00%BC%60%86O%18%A0%B8G%1F%5D%942%01%06%1C%60%11%80C-%9Aa%A4%9" +
"11%DC%D1d%18%3B%8E1O%00%040%A0%01%8B%9B%20be%06W%FA(O%04%04x%E0%20%1F%0E%" +
"3Ap%40%98%E2%98%81%C2%26%0B%98y%06%1Ah%C2%90%C1Y%0B%04%10J%04%1C%00!%0E%" +
"8B%15%DD%80%00Byr%80f%1A%7C%A2a%82%04%0ED%12%00Sc%3E%F4L%91%8B%22%C4(%22%" +
"8F%AE%11%E9Ci%A8a%C2%0A%8A%D2%E2%A9%A7%8D%22%C0%CC%AA%9E%96P%A4%197%BC%BA" +
"%C0%AD%B8%E6z%2B%01%01%60%B0%00%AF%3D%04%2B%AC%04%C4%06%20%EC%B1%C8%F6%C0%" +
"01%06rR%E1%C0%B3%D0F%2B%ED%B4%D4FKA%01%08%00%3B";
	
	var manageHidesLi = document.createElement("li");
	manageHidesLi.style.textAlign = "center";
	manageHidesLi.style.verticalAlign = "middle";
	var manageHidesA = document.createElement("a");
	manageHidesA.href = "#";
	manageHidesA.appendChild(img);
	manageHidesLi.appendChild(manageHidesA);
	Console.log("Putting the manage hides button inside navTabs");
	stickMeHere.appendChild(manageHidesLi);
	manageHidesLi.addEventListener("click", function(event) {
		event.stopPropagation();
		event.preventDefault();
		manageHide_clicked();	
		}, true);
	delete manageHidesLi;
	delete manageHidesA
	delete img;
}

updatePage();

return;

/*=====================================================================
 * Helper methods
 *=====================================================================*/
function myAlert(msg)
{
    if (alertCount++ < alertLimit) 
    {
        alert(alertCount + " of " + alertLimit + ": " + msg)
    }
}

function trim(stringToTrim, excessCharacter) {
    var trimmed = '';
    if (excessCharacter != null) {
        var regEx = new RegExp("^" + excessCharacter + "+|" + excessCharacter + "+$", "gim");
        trimmed = stringToTrim.replace(regEx, '');
    } else {
        // trim off spaces
        trimmed = stringToTrim.replace(/^\s+|\s+$/g, '')
    }
    
    return trimmed;
}

function threadButtonsCallBack() {
    loadIgnoredThreads();

    var ignoreMe = this.getAttribute("id"); // [32414]My Cool Spam Site
        
    var regEx = /^\[(\d+)\](.*)$/;
    var match = regEx.exec(ignoreMe);
    threadId = parseInt(match[1]);
    threadTitle = trim(match[2], '"');
    
    var d = new Date();
    
    var newIgnore = { "id": threadId, "title": threadTitle, "addedAt": d.getTime() / 1000 };
    
    IgnoredThreads[IgnoredThreads.length] = newIgnore;
       
    Console.log("Setting ignore for threadId " + newIgnore.id + "(" + newIgnore.id + ", " + newIgnore.title + "), index: " + IgnoredThreads.length + ", addedAt: " + newIgnore.addedAt);
    Params.screenNeedsRefresh = true;
        
    saveIgnoredThreads();
    
    var threadLi = getFromId('thread_' + threadId);
    if (threadLi) {
        showThreadLi(threadLi, false);
    } else {
        updatePage();
    }
    
    //location.reload(true);
    return;
}

function getThreadLis() {
    var node = document.getElementsByTagName("body")[0];
    return getElementsById(node, "thread_", "li");
}

// return the inner DIV inside the thread LI
function getInnerDiv(rootNode) {
    return getElementsByClassName(rootNode, "inner", "div")[0];
}

// Return the thread link inside the inner DIV
function getLinkParent(rootNode) {
	try {
		var linkParent = getElementsById(rootNode, "thread_", "a")[0].parentNode;
	} catch (exception) {
		var linkParent = null;
	}
	return linkParent;
}

// return all elements inside the rootNode that have an ID matching the given regEx.
// Optional: tagName if you know the tag you are looking for.
function getElementsById(rootNode, idRegEx, tagName) {
    if (rootNode == null)
    {
        var rootNode = document.getElementsByTagName("body")[0];
    }
    var a = [];
    var idRegEx = new RegExp(idRegEx);
    
    if (tagName == null)
    {
        tagName = "*";
    }
    
    var elements = rootNode.getElementsByTagName(tagName);
    for(var i=0, j=elements.length; i < j; i++)
    {
        if (elements[i].id != "") {
            if (idRegEx.test(elements[i].id))
            {
                // !!! myAlert("adding " + elements[i].id + ", which is at " + i);
                a.push(elements[i]);
            }
        }
    }
    return a;
}

// return TRUE if this LI already has an IGNORE button.
function alreadyHasIgnoreButton(rootNode) {
    var buttons = getElementsByClassName(rootNode, "ignoreButton", "input");
    myAlert("has a button? " + buttons.length);
    return buttons.length > 0;
}

// return all elements inside the rootNode that have a class matching the given regEx.
// Optional: tagName if you know the tag you are looking for.
function getElementsByClassName(rootNode, classNameRegEx, tagName) {
    if (rootNode == null)
    {
        var rootNode = document.getElementsByTagName("body")[0];
    }
    var a = [];
    var classRegEx = new RegExp(classNameRegEx);
    
    if (tagName == null)
    {
        tagName = "*";
    }
    
    var elements = rootNode.getElementsByTagName(tagName);
    for(var i=0, j=elements.length; i < j; i++)
    {
        if (elements[i].className != "") {
            if (classRegEx.test(elements[i].className))
            {
                // !!! myAlert("adding " + elements[i].id + ", which is at " + i);
                a.push(elements[i]);
            }
        }
    }
    return a;
}

function closeButton_clicked() {
    Params.screenNeedsRefresh = true;
    updatePage();
}

function showThreadLi(threadLi, shouldShow) {
    if (shouldShow) {
        // threadLi.style.display = "";
        threadLi.style.opacity = 1.0;
        threadLi.style.display = "";
    } else {
        if (Params.settings.showIgnored) {
            threadLi.style.opacity = 0.3;
        } else {
            threadLi.style.display = "none";
        }		
    }	
}

// Hide threads to be hidden and insert buttons to the visible ones
function updatePage()
{	
    Console.log("Updating page....need refresh? " + Params.screenNeedsRefresh);
    if (Params.screenNeedsRefresh) {
        location.reload(true);
    } else {
        loadIgnoredThreads();
        loadIgnoredStrings();
            
        
		// new version of vBulletin
		var threadTitles = getThreadLis();
		
		for (var threadDiv = 0; threadDiv < threadTitles.length; threadDiv++)
		{
			threadLi = threadTitles[threadDiv];
			var threadId = parseInt(threadLi.id.substring(7));
			var threadTitle = 'Thread ' + threadId;
			try {var threadTitle = getFromId('thread_title_' + threadId).text;}
			catch (exception) {
				Console.log('Error: could not read thread title by id thread_title_' + threadId);
			}

			// !!! myAlert("found thread: " + threadId);
			
			if (ShouldIgnoreThreadById(threadId) >= 0 || shouldIgnoreThreadByTitle(threadTitle) >= 0)
			{
				showThreadLi(threadLi, false);
			}
			else
			{
				showThreadLi(threadLi, true);
				
				// see if we already have a button, no need to add another
				if (alreadyHasIgnoreButton(threadLi))
				{
					Console.error("Error: Thread " + threadId + " (" + threadTitle + ") already has an ignore button. Ignoring.");
					return;
				}
				
				var button = document.createElement("input");	//add hide thread button
				button.setAttribute("type", "button");
				button.setAttribute("value","X");
				button.setAttribute("height", "20px");
				button.setAttribute("width", "20px");
				button.setAttribute("title", "Ignore this thread: " + threadId + ", " + threadTitle );
				button.setAttribute("id", "[" + threadId + "]" + stringify(threadTitle));
				button.setAttribute("class", "ignoreButton");
				button.addEventListener("click", threadButtonsCallBack, false);
				
				var innerDiv = getInnerDiv(threadLi);
				var linkParent = getLinkParent(innerDiv);
				if (linkParent) {
					linkParent.insertBefore(button, null);
				}
				
				delete button;
			}			
		}
	
        return;
    }
}

function loadIgnoredThreads() {
    var ignoredThreadsText = getKey("IgnoredThreads", "[{id: -1, title:'', addedAt:'321654'}]");
    IgnoredThreads = eval(ignoredThreadsText);
    removeIgnoredThreadById(-1); // remove the default one used to initialize the array.
    Console.log("Loaded ignored threads from storage. Found " + IgnoredThreads.length);
}

function loadIgnoredStrings() {
    var ignoredStringsText = getKey("IgnoredStrings", "[{string: 'bogusString11', addedAt:'321654'}]");
    IgnoredStrings = eval(ignoredStringsText);
    removeIgnoredString('bogusString11'); // remove the default one used to initialize the array.
    Console.log("Loaded ignored strings from storage. Found " + IgnoredStrings.length);
}

/*
 * Removes a ignore thread Id from the IgnoredThreads collection.
 */
function removeIgnoredThreadById(threadId) {
    for(var i=0; i<IgnoredThreads.length; i++) {
        if (IgnoredThreads[i].id == threadId) {
            Console.log("trying to remove IgnoredThreads[" + i + "]");
            IgnoredThreads.splice(i, 1);
            return;
        }
    }
}

function removeIgnoredString( removeMe ) {
    for(var i=0; i<IgnoredStrings.length; i++) {
        if (IgnoredStrings[i].string == removeMe) {
            Console.log("trying to remove IgnoredStrings[" + i + "]");
            IgnoredStrings.splice(i, 1);
            return;
        }
    }
}

function saveIgnoredThreads() {
    Console.log("Saving ignored threads to storage. It has " + IgnoredThreads.length);
    setKey("IgnoredThreads", stringify(IgnoredThreads));
}

function saveIgnoredStrings() {
    Console.log("Saving ignored strings to storage. It has " + IgnoredStrings.length);
    setKey("IgnoredStrings", stringify(IgnoredStrings));
}

function ShouldIgnoreThreadById(threadId) {
    if (IgnoredThreads.length > 0)
    {   
        for (var i=0; i<IgnoredThreads.length; i++)
        {
            if (IgnoredThreads[i].id == threadId) {
                Console.log("Ignoring Thread Id=" + IgnoredThreads[i].id + ", Title=" + IgnoredThreads[i].title + ", i=" + i);
                return i;
            }            
        }
    }
    return -1;
}

function shouldIgnoreThreadByTitle(title) {
    if (IgnoredStrings.length > 0) {
        for (var i=0; i<IgnoredStrings.length; i++) {
            var regEx = new RegExp(IgnoredStrings[i].string, "gim");
            if (regEx.test(title)) {
                Console.log("Ignoring Thread '" + title + "' because it matches the ignore string [" + IgnoredStrings[i].string + "]");
                return i;
            }          
        }
    }

    return -1;
}

//set/get stored values :
//if Firefox (GM) using setValue/getValue, otherwise using window.localStorage.
function setKey($key, $value) {
    try {
        if (!Params.env.isFirefox) return window.localStorage['vBulletin4ThreadHider_'+$key] = $value;
        else return GM_setValue($key, $value);
    }
    catch (exception) {
        if (Console) Console.error('Fatal error: Can\'t store value '+$key);
    }
}

function getKey($key, $default_) {
    var g;
    try {
        if (!Params.env.isFirefox) {
            g = window.localStorage['vBulletin4ThreadHider_'+$key];
            if (typeof g == 'undefined') return $default_;
            else return g;
        }
        else {
            g = GM_getValue($key);
            if (typeof g == 'undefined') return $default_;
            else return g;
        }
    }
    catch (exception) {
        if (Console) Console.error('Fatal error: Can\'t get stored value '+$key);
        return $default_;
    }
}

//Transform object into a string
function stringify($object) {
    try {
        if (this['uneval']) return uneval($object); //Firefox
        else if (this['JSON']) {
            if (typeof $object == 'object') return '('+JSON.stringify($object)+')';
            else return JSON.stringify($object);
        } //Chrome/Opera
    }
    catch (ex) { ; }
}

function initEnv() {
    if (document.body) Params.lang = (/fr_FR/.test(document.body.className)?'fr':'en');
    userAgent = navigator.userAgent.toLowerCase();
    isWindows = (/windows|win32/.test(this.userAgent));
    isMac = (/macintosh|mac os x/.test(this.userAgent));
    isLinux = (/linux/.test(this.userAgent));
    isGecko = /gecko/.test(this.userAgent);
    isWebkit = /webkit/.test(this.userAgent);
    isFirefox = this.isGecko && (/firefox/.test(this.userAgent));
    isOpera = /opera/.test(this.userAgent);
    isChrome = (/\bchrome\b/.test(this.userAgent));
    isSafari = /safari/.test(this.userAgent);
    isIE = /msie/.test(this.userAgent);
    isGM = (this['GM_registerMenuCommand']?true:false);
    Extend(Params.env, {
        userAgent: userAgent,
        isOpera: isOpera,
        isChrome: isChrome,
        isSafari: isSafari,
        isIE: isIE,
        isGecko: isGecko,
        isFirefox: isFirefox,
        isWindows: isWindows,
        isMac: isMac,
        isLinux: isLinux,
        isWebkit: isWebkit,
        isGM: isGM
    });
}

function removeIgnoreIdCallback(button) {
    Console.log("You'd like to stop ignoring thread " + this.getAttribute("id"));
    removeIgnoredThreadById(parseInt(this.getAttribute("id")));
    saveIgnoredThreads();
    Params.screenNeedsRefresh = true;
    manageHide_clicked();
}

function removeIgnoreString_clicked() {
    var stopIgnoring = this.getAttribute("id");
    Console.log("You'd like to stop ignoring string " + stopIgnoring);
    removeIgnoredString(stopIgnoring);
    saveIgnoredStrings();
    Params.screenNeedsRefresh = true;
    manageHide_clicked();
}

function sortByCallback() {
    Params.settings.sortBy = this.getAttribute("id");
    Console.log('Sortby is ' + Params.settings.sortBy);
    setKey('settings', stringify(Params.settings));
    manageHide_clicked();
}

function showHiddenCallback() {
    if (this.checked) {
        Params.settings.showIgnored = true;
        Console.log('Show ignored');
    } else {
        Params.settings.showIgnored = false;
        Console.log('Hide ignored');
    }
    setKey('settings', stringify(Params.settings));
    Params.screenNeedsRefresh = true;
    manageHide_clicked();
}

function btnAddIgnoreString_clicked() {
    var stringToIgnore = getFromId('txtAddIgnoreString').value;
    var d = new Date();
    
    var newIgnoreString = {"string": stringToIgnore, "addedAt": d.getTime()/1000};

    IgnoredStrings[IgnoredStrings.length] = newIgnoreString;
       
    Console.log("Adding new ignore string " + newIgnoreString.string + ", index: " + IgnoredStrings.length + ", addedAt: " + newIgnoreString.addedAt);
    Params.screenNeedsRefresh = true;
    
    // to get around Greasemonkey access violation: unsafeWindow cannot call GM_setValue
    window.setTimeout(function() {saveIgnoredStrings()}, 0);

    manageHide_clicked();
}

function btnRemoveAllIgnoredThreads_clicked() {
    IgnoredThreads = [];
    saveIgnoredThreads();
       
    Console.log("Clearing out ignored threads");
    Params.screenNeedsRefresh = true;

    manageHide_clicked();
}

/*
 * < 0 = a comes before b
 * 0   = a and b are equal, no sorting performed
 * > 0 = b comes before a
 */
function sortIgnoredThreadsByTitle(a, b) {
    if (a.title == b.title) {
        sortVal = 0;
    } else {
        sortVal = a.title < b.title ? -1 : 1;
    }
    
    return sortVal; // ascending by title
}

function sortIgnoredThreadsByDate(a, b) {
    var sortVal = (parseInt(b.addedAt) - parseInt(a.addedAt));
    return sortVal; // descending time
}


/*============================================================================= 
 * domCreate_ methods for creating the controls on the options dialog.
 =============================================================================*/ 
function domCreate_manageHidesWindow() {
	var screenWidth = screen.availWidth;
	var top = 25;
	var height = '75%';
	var width = 550;
	var left = ((screenWidth - width)/2);
	
	Console.log('thwl: ' + top + ', ' + height + ', ' + width + ', ' + left + ': ' + ', ' + screenWidth);

    if (!getFromId('manageHides')) new xHTMLElement({
            element: 'div',
            id: 'manageHides',
            parentNode: document.body,
            style: {
                width: width + 'px',
                height: height,
                border: '2px solid red',
                position: 'fixed',
                top: top + 'px',
                left: left + 'px',
                overflowY: 'scroll',
                background: '#eee',
                margin: '10px',
                padding: '15px',
				color: '#000'
            }
        });
    return getFromId('manageHides');
}

function domCreate_ignoredThreadsTable() {
    var tbl = document.createElement("table");
    tbl.setAttribute("border", "0");
    tbl.setAttribute("cellSpacing", "3");
    tbl.setAttribute("cellPadding", "3");
    tbl.setAttribute("width", "500");

    return tbl;
}

function domCreate_populateIgnoredThreadsTable(tbl) {
    if (Params.settings.sortBy == 'title') {
        IgnoredThreads = IgnoredThreads.sort(sortIgnoredThreadsByTitle);
    } else {
        IgnoredThreads = IgnoredThreads.sort(sortIgnoredThreadsByDate);
    }
    
    for(var i=0; i < IgnoredThreads.length; i++) {
        var row = tbl.insertRow(tbl.rows.length);
        if (i % 2 == 0) {
            row.setAttribute("bgcolor", "#ccc");
        } else {
            row.setAttribute("bgcolor", "#fff");
        }

        var cell0 = row.insertCell(0);
        var deleteButton = document.createElement("input");
        deleteButton.setAttribute("type", "button");
        deleteButton.setAttribute("value", "X");
        deleteButton.setAttribute("height", "25px");
        deleteButton.setAttribute("width", "150px");
        deleteButton.setAttribute("title", "Stop Ignoring This Thread");
        deleteButton.setAttribute("id", IgnoredThreads[i].id);
        deleteButton.addEventListener("click", removeIgnoreIdCallback, false);
        cell0.appendChild(deleteButton);

        var cell1 = row.insertCell(1);
        cell1.setAttribute("width", "95%");
        var span = document.createElement("span");
        span.setAttribute("style", "font-weight: bold; color: #a00;");
        span.innerHTML = IgnoredThreads[i].title;
        cell1.appendChild(span);


    }

    return tbl;
}

function domCreate_manageHidesHeader() {
    var header = document.createElement("h3");
    header.setAttribute("style", "padding-top:10px; padding-bottom:10px; font-size: x-large;");
    header.setAttribute("fontSize", "x-large");
    header.innerHTML = Params.scriptName + " V" + Params.versionMajor + "." + Params.versionMinor + "." + Params.versionBuild;

    return header;
}

function domCreate_dialogDescription() {
    var description = document.createElement("p");
    description.innerHTML = "These are the threads you are currently ignoring (based on threadId)";
    description.setAttribute("style", "padding-top: 10px; padding-bottom: 10px");

    return description;
}

function domCreate_sortButton() {
    var sortButton = document.createElement("input");
    if (Params.settings.sortBy == 'date') {
        sortButton.setAttribute("id", 'title');
        sortButton.setAttribute("value", "Sort Alphabetically");
    } else {
        sortButton.setAttribute("id", 'date');
        sortButton.setAttribute("value", "Sort by time added, newest to oldest");
    }
    sortButton.setAttribute("type", "button");
    sortButton.setAttribute("height", "20px");
    sortButton.setAttribute("width", "250px");
    sortButton.setAttribute("title", "Close");
    sortButton.setAttribute("style", "margin-right: 30px; margin-top: 30px;");
    sortButton.addEventListener("click", sortByCallback, false);

    return sortButton;
}

function domCreate_showHiddenCheckbox() {
    var div = document.createElement("div");

    var showHidden = document.createElement("input");
    showHidden.setAttribute("type", "checkbox");
    showHidden.setAttribute("value", "showHidden");
    showHidden.setAttribute("title", "Show hidden threads (they will be faded)");
    if (Params.settings.showIgnored == true) {
        showHidden.checked = true;
    } else {
        showHidden.checked = false;
    }
    showHidden.addEventListener("CheckboxStateChange", showHiddenCallback, false);
    
    var showHiddenLabel = document.createElement("span");
    showHiddenLabel.innerHTML = "Show hidden threads (faded)";
    showHiddenLabel.setAttribute("style", "color: #00a;");

    div.appendChild(showHidden);
    div.appendChild(showHiddenLabel);

    return div;
}

function domCreate_closeButton() {
    var closeButton = document.createElement("input");
    closeButton.setAttribute("type", "button");
    closeButton.setAttribute("value", "OK");
    closeButton.setAttribute("height", "40px");
    closeButton.setAttribute("width", "250px");
    closeButton.setAttribute("title", "Close");
    closeButton.setAttribute("style", "font-size:large; margin-right: 30px; margin-top: 30px; float:right");
        
    if (Params.screenNeedsRefresh == true) {
        Console.log("Close button is a refresh button.");
        closeButton.setAttribute("id", "needsRefresh");
        closeButton.addEventListener("click", closeButton_clicked, false);
    } else {
        Console.log("Close button is a hide button.");
        closeButton.setAttribute("onClick", "document.getElementById('manageHides').style.visibility = 'hidden';");
    }

    return closeButton;
}

function domCreate_ignoredStringsTable() {
    var tbl = domCreate_ignoredThreadsTable();
    tbl.setAttribute("style", "background: #faa;");
    return tbl;
}

function domCreate_populateIgnoredStringsTable(tbl) {
    if (IgnoredStrings.length == 0) {
        var row = tbl.insertRow(0);
        var cell = row.insertCell(0);
        var span = document.createElement("span");
        span.setAttribute("style", "font-style: italic; color: #000; text-align: center;");
        span.innerHTML = "You are not ignoring any strings in thread titles at this time.";
        cell.appendChild(span);
    } else {
        for(var i=0; i < IgnoredStrings.length; i++) {
            var row = tbl.insertRow(tbl.rows.length);
            if (i % 2 == 0) {
                row.setAttribute("bgcolor", "#ccc");
            } else {
                row.setAttribute("bgcolor", "#fff");
            }

            var cell0 = row.insertCell(0);
            cell0.setAttribute("width", "25px");
            var deleteButton = document.createElement("input");
            deleteButton.setAttribute("type", "button");
            deleteButton.setAttribute("value", "X");
            deleteButton.setAttribute("height", "25px");
            deleteButton.setAttribute("width", "150px");
            deleteButton.setAttribute("title", "Stop Ignoring Threads With This String");
            deleteButton.setAttribute("id", IgnoredStrings[i].string);
            deleteButton.addEventListener("click", removeIgnoreString_clicked, false);
            cell0.appendChild(deleteButton);

            var cell1 = row.insertCell(1);
            cell1.setAttribute("width", "95%");
            var span = document.createElement("span");
            span.setAttribute("style", "font-weight: bold; color: #a00;");
            span.innerHTML = IgnoredStrings[i].string;
            cell1.appendChild(span);
        }
    }

    return tbl;
}

function domCreate_ignoredStringsDescription() {
    var par = document.createElement("p");
    par.innerHTML = "Ignore threads that have the following strings in their title:";
    par.setAttribute("style", "padding-top: 10px; padding-bottom: 10px; color: black;");
    return par;
}

function domCreate_txtAddIgnoredString() {
    var txtBox = document.createElement("input");
    txtBox.setAttribute("type", "text");
    txtBox.setAttribute("id", "txtAddIgnoreString");
    txtBox.setAttribute("onKeyUp", "pressButtonIfEnter(event, getElementById('btnAddIgnored'))");
    return txtBox;
}

function domCreate_btnAddIgnoredString() {
    var addButton = document.createElement("input");
    addButton.setAttribute("type", "button");
    addButton.setAttribute("value", "Add string to ignore list");
    addButton.setAttribute("height", "25px");
    addButton.setAttribute("width", "250px");
    addButton.setAttribute("title", "Add string to your ignore list");
    addButton.setAttribute("id", "btnAddIgnored");
    addButton.setAttribute("style", "");
    addButton.addEventListener("click", btnAddIgnoreString_clicked, false);

    return addButton;
}

function domCreate_helperScript() {
    var s = document.createElement("script");
    s.setAttribute("type", "text/javascript");
    s.text = "function pressButtonIfEnter(e, btnToClick) {var k; if (window.event) {k=window.event.keyCode;} else {k=e.keyCode} if (k==13) {btnToClick.click();}}";
    return s;
}

function domCreate_deleteAllIgnoreThreadsButton() {
    var btn = document.createElement("input");
    btn.setAttribute("type", "button");
    btn.setAttribute("value", "Remove All");
    btn.setAttribute("height", "25px");
    btn.setAttribute("width", "250px");
    btn.setAttribute("title", "Remove all these threads from your ignore list");
    btn.setAttribute("id", "btnRemoveAllIgnoredThreads");
    btn.setAttribute("style", "");
    btn.addEventListener("click", btnRemoveAllIgnoredThreads_clicked, false);

    return btn;
}

/*
 * ////////////////////////////////////////////////
 * The hider manager popup window.
 * ////////////////////////////////////////////////
 */
function manageHide_clicked()
{
    var dialog = domCreate_manageHidesWindow();
    var helperScript = domCreate_helperScript();
    var header = domCreate_manageHidesHeader();
    var ignoredThreadsDescription = domCreate_dialogDescription();    
    var sortButton = domCreate_sortButton();
    var deleteAllButton = domCreate_deleteAllIgnoreThreadsButton();
    var showHiddenControl = domCreate_showHiddenCheckbox();

    var ignoredStringsDescription = domCreate_ignoredStringsDescription();
    var tblIgnoredStrings = domCreate_ignoredStringsTable();
    tblIgnoredStrings = domCreate_populateIgnoredStringsTable(tblIgnoredStrings);

    var txtboxAddIgnoredString = domCreate_txtAddIgnoredString();
    var btnAddIgnoredString = domCreate_btnAddIgnoredString();
    var tblIgnoredThreads = domCreate_ignoredThreadsTable();
    tblIgnoredThreads = domCreate_populateIgnoredThreadsTable(tblIgnoredThreads);

    var okayButton1 = domCreate_closeButton();
	var okayButton2 = domCreate_closeButton();

    dialog.innerHTML = '';
    dialog.appendChild(helperScript);
	dialog.appendChild(okayButton1);
    dialog.appendChild(header);
    dialog.appendChild(ignoredThreadsDescription);
    dialog.appendChild(showHiddenControl);

    // ignored threads
    dialog.appendChild(sortButton);
    dialog.appendChild(deleteAllButton);
    dialog.appendChild(tblIgnoredThreads);

    // ignored strings
    dialog.appendChild(ignoredStringsDescription);
    dialog.appendChild(txtboxAddIgnoredString);
    dialog.appendChild(btnAddIgnoredString);
    dialog.appendChild(tblIgnoredStrings);
    dialog.appendChild(okayButton2);

    dialog.style.zIndex = '99999999';    
    dialog.style.visibility = "visible";
    
    delete okayButton1;
	delete okayButton2;
    delete showHiddenControl;
    delete sortButton;
    delete description;
    delete header;
    delete tblIgnoredThreads;
    delete tblIgnoredStrings;
    delete helperScript;
    delete dialog;
}
