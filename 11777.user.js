// ==UserScript==
// @name           Digg Washer v2
// @namespace      http://home.comcast.net/~teridon73
// @description    Based on Digg Washer by Timbo, but works with August 2007 version of digg.  You can also hide posts by username.
// @include        http://digg.com/*
// @include        http://www.digg.com/*
// ==/UserScript==

var hidewordstring = GM_getValue("diggwasherwords", "");
var hideuserstring = GM_getValue("diggwasherusers", "");
var hidesitestring = GM_getValue("diggwashersites", "");
var topicstring = GM_getValue("diggwashertopics", "");
var showSidebar = GM_getValue("diggwashersidebar", true);

// Toggle this to turn on global logging
var log = false;

var hidewords = hidewordstring.split("|");
var hideusers = hideuserstring.split("|");
var hidesites = hidesitestring.split("|");

var hiddenStories = 0;
var navbar = document.getElementById("wrapper");
var selectors;
selectors = document.evaluate("//div[contains(@class, 'selector')]",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
navbar = selectors.snapshotItem(0);

var enclosures;
var wordsShown = false;
var barShown = false;
var hidden;
var addremove;
var link;
var clear;
var showHiddenStories = false;
var hideside;

function ToggleSidebar()
{
    showSidebar = !showSidebar;
    var sidebar = document.getElementById("wrapper");
    sidebar = sidebar.firstChild;
    if (!showSidebar) {
        var head = window.document.getElementsByTagName( "head" )[0];
        var style = window.document.createElement( "style" );
        style.id = "style";
        style.setAttribute( "type", "text/css" );
        style.innerHTML = ".sidebar { display: none; } .main { margin-right: -10px; } body { padding: 0; } html { min-width: 100%; } .comment { margin-right: -15px; }";
        head.appendChild( style );        
    } else {
        var style = document.getElementById( "style" );
		if (style) {
			style.parentNode.removeChild(style);
		}
    }
    GM_setValue("diggwashersidebar", showSidebar);
}

function showHideStories()
{
    showHiddenStories = !showHiddenStories;
    if (hiddenStories.length == 1) var story_sp = "story";
        else var story_sp = "stories";
    if (showHiddenStories) {
        hidden.innerHTML = "Hide " + hiddenStories + " tagged " + story_sp;
    } else {
        hidden.innerHTML = "Show " + hiddenStories + " hidden " + story_sp;
    }
    filterStories(log);
}

function filterStories(log)
{
    hiddenStories = 0;
    enclosures = document.evaluate("//div[contains(@id, 'enclosure')]",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
    hidewords = hidewordstring.split("|");
    topics = topicstring.split("|");
    hideusers = hideuserstring.split("|");
    for (var i = 0; i < enclosures.snapshotLength; i++) {
	    var topic = 'unknown';
	    var text;
	    var story_src;
	    var user;
	    
        div = enclosures.snapshotItem(i);
        if (log) { GM_log("classname is " + div.className); }
        var title = document.evaluate("div/h3/a/text()", div, null, XPathResult.STRING_TYPE, null).stringValue;
        if (log) { GM_log("title is " + title ); }
        if (div.className.indexOf("news-summary v") != -1)
        {        
	        if (log) {GM_log("vid or pic type");}
	        // Videos page
	        text = document.evaluate("div/div/p/a/text()", div, null, XPathResult.STRING_TYPE, null).stringValue;

	        var vidlink = document.evaluate("div/h3/a/span", div, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	        if (vidlink.snapshotLength > 0) {
		        var style_text = vidlink.snapshotItem(0).getAttribute('style');
		        if (style_text == true) {
			        topic = style_text.split('/',2)[1];
		        }
	        }
            story_src = document.evaluate("div/div/p/em/a/text()", div, null, XPathResult.STRING_TYPE, null).stringValue;
        } else {
            // Regular Digg pages
	        text = document.evaluate("div/p/a/text()", div, null, XPathResult.STRING_TYPE, null).stringValue;
            var image = document.evaluate("a/img", div, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            if (image.snapshotLength > 0) {
	            var image_src = image.snapshotItem(0).getAttribute('src');
	            topic = image_src.substr( 1, image_src.indexOf('/',2)-1 );
            }
            var story_src = document.evaluate("div/p/em/a/text()", div, null, XPathResult.STRING_TYPE, null).stringValue;
		}
	    if (log) {GM_log("text is " + text );}

        if (log) { GM_log("topic is " + topic );}
        var user = document.evaluate("div/div/span/a/text()", div, null, XPathResult.STRING_TYPE, null).stringValue;
        if (log) {GM_log("user is " + user );}
        
        // Remove stupid dash character from story_src
        story_src = story_src.replace(/\s.*/,"");
        if (log) {GM_log("story_src is " + story_src );}

        title = title.toLowerCase();
        text = text.toLowerCase();
        topic = topic.toLowerCase();
        user = user.toLowerCase();
        var clear = false;
        if (hidewordstring.length != 0 ) {
            for (var j = 0; j < hidewords.length; j++)
            {
                if((text.indexOf(hidewords[j]) != -1) || (title.indexOf(hidewords[j]) != -1))
                {
                    clear = true;
                    if (log) {
                        GM_log("Hid story based on blockword("+ hidewords[j] +"): " + title);
                    }
                    break;
                }
            }
        }
        if (topicstring.length != 0 ) {
            for (var j = 0; j < topics.length; j++)
            {
                if(topic.indexOf(topics[j]) != -1)
                {
                    clear = true;
                    if (log) {
                        GM_log("Hid story based on topic("+ topics[j] +"): " + title);
                    }
                    break;
                }
            }
        }

        if (hideuserstring.length != 0 ) {
            for (var j = 0; j < hideusers.length; j++)
            {
                if(user.indexOf(hideusers[j]) != -1)
                {
                    clear = true;
                    if (log) {
                        GM_log("Hid story based on user("+ hideusers[j] +"): " + user);
                    }
                    break;
                }
            }
        }
        
        if (hidesitestring.length != 0 ) {
            for (var j = 0; j < hidesites.length; j++)
            {
                if(story_src.indexOf(hidesites[j]) != -1)
                {
                    clear = true;
                    if (log) {
                        GM_log("Hid story based on site("+ hidesites[j] +"): " + story_src);
                    }
                    break;
                }
            }
        }
                
                
        if(clear) {
            if (showHiddenStories) {
                div.style.display="block";
                div.style.border = "dashed 2px red";
            } else {
                div.style.display="none";
            }
            hiddenStories += 1;
        } else {
            div.style.border = "";
            div.style.display="block";
        }
    }
    
    // Filter Top 10 List using hidewords
    var toptenlist = document.getElementById("topten-list");
    var summaries = document.evaluate("div[contains(@class, 'news-summary')]",toptenlist,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

    hidewords = hidewordstring.split("|");
    for (var i = 0; i < summaries.snapshotLength; i++) {
	    clear = false;
        div = summaries.snapshotItem(i);
		if (log) { GM_log("classname is " + div.className); }
		

        var title = document.evaluate("h3/a/text()", div, null, XPathResult.STRING_TYPE, null).stringValue;
        if (log) { GM_log("title is " + title ); }
        title = title.toLowerCase();
        if (hidewordstring.length != 0 ) {
            for (var j = 0; j < hidewords.length; j++)
            {
                if(title.indexOf(hidewords[j]) != -1)
                {
                    clear = true;
                    if (log) {
                        GM_log("Hid story based on blockword("+ hidewords[j] +"): " + title);
                    }
                    break;
                }
            }
        }
        
        if(clear) {
            if (showHiddenStories) {
                div.style.display="block";
                div.style.border = "dashed 2px red";
            } else {
                div.style.display="none";
            }
            hiddenStories += 1;
        } else {
            div.style.border = "";
            div.style.display="block";
        }
    }
}


function clearList()
{
    showHidewords();
    hidewordstring = "";
    GM_setValue("diggwasherwords", hidewordstring);
    topicstring = "";
    GM_setValue("diggwashertopics", topicstring);
    hideuserstring = "";
    GM_setValue("diggwasherusers", hideuserstring);
    hidesitestring = "";
    GM_setValue("diggwasherusers", hidesitestring);

    filterStories(log);
    installRemoveBar();
    installRemoveBar();
    showHidewords();
}

function installRemoveBar()
{
    if (!barShown)
    {
        if (hiddenStories.length == 1) var story_sp = "story";
        else var story_sp = "stories";
        hidden = document.createElement("a");
        hidden.className = 'tool';
        hidden.id = 'hiddentag';
        hidden.innerHTML = "Show " + hiddenStories + " hidden " + story_sp;
        hidden.addEventListener('click', showHideStories, true);
        addremove = document.createElement("a");
        addremove.className = 'tool';
        addremove.id = 'addremove';
        addremove.innerHTML = "Show Options";
        addremove.addEventListener('click', showHidewords, true);

        navbar.appendChild(hidden);
        navbar.appendChild(addremove);
        barShown = true;
    } else {
        navbar.removeChild(hidden);
        navbar.removeChild(addremove);
        barShown = false;
    }
}

function addSite()
{
    add(hidesitestring, "diggwashersites");
    hidesitestring = GM_getValue("diggwashersites", hidesitestring);
    filterStories(log);
    showHidewords();
    installRemoveBar();
    installRemoveBar();
    showHidewords();
}

function addWord()
{
    add(hidewordstring, "diggwasherwords");
    hidewordstring = GM_getValue("diggwasherwords", hidewordstring);
    filterStories(log);
    showHidewords();
    installRemoveBar();
    installRemoveBar();
    showHidewords();
}

function addTopic()
{
    add(topicstring, "diggwashertopics");
    topicstring = GM_getValue("diggwashertopics", topicstring);
    filterStories(log);
    showHidewords();
    installRemoveBar();
    installRemoveBar();
    showHidewords();
}

function addUser()
{
    add(hideuserstring, "diggwasherusers");
    hideuserstring = GM_getValue("diggwasherusers", hideuserstring);
    filterStories(log);
    showHidewords();
    installRemoveBar();
    installRemoveBar();
    showHidewords();
}

function add( str, save )
{
    var input = document.getElementById("top-keywords");
    var word = input.value;
    
    if ((input.value == "Search the News...") || (input.value == "")) {
        alert("Please type the word you wish to block in the search box in the upper right and click the add link.");
    } else {
        if (str.length > 1) {
            str = str + "|" + word.toLowerCase();
        } else {
            str = word.toLowerCase();
        }
        hidewords = str.split("|");
        input.value = "";
        GM_setValue(save, str);
    }
}

function showHidewords()
{
    if (!wordsShown)
    {
        addremove.innerHTML = "Hide Options";
        if (!barShown)
        {
            installRemoveBar();
        }
        
        link = document.createElement('a');
        link.id = "addlink"
        link.innerHTML = "Add HideWord";
        link.className = "tool";
        link.style.textDecoration = "underline";
        link.style.cursor = 'pointer';
        link.addEventListener('click', addWord, true);

        addtopic = document.createElement('a');
        addtopic.id = "addtopic"
        addtopic.innerHTML = "Add Topic";
        addtopic.className = "tool";
        addtopic.style.textDecoration = "underline";
        addtopic.style.cursor = 'pointer';
        addtopic.addEventListener('click', addTopic, true);
        
        adduser = document.createElement('a');
        adduser.id = "adduser"
        adduser.innerHTML = "Add User";
        adduser.className = "tool";
        adduser.style.textDecoration = "underline";
        adduser.style.cursor = 'pointer';
        adduser.addEventListener('click', addUser, true);

        addsite = document.createElement('a');
        addsite.id = "addsite"
        addsite.innerHTML = "Add Site";
        addsite.className = "tool";
        addsite.style.textDecoration = "underline";
        addsite.style.cursor = 'pointer';
        addsite.addEventListener('click', addSite, true);

        clear = document.createElement('a');
        clear.id = "clear"
        clear.innerHTML = "Clear";
        clear.className = "tool";
        clear.style.textDecoration = "underline";
        clear.style.cursor = 'pointer';
        clear.addEventListener('click', clearList, true);

        hideside = document.createElement('a');
        hideside.id = "clear"
        hideside.innerHTML = "Toggle Sidebar";
        hideside.className = "tool";
        hideside.style.textDecoration = "underline";
        hideside.style.cursor = 'pointer';
        hideside.addEventListener('click', ToggleSidebar, true);

        navbar.appendChild(link);
        navbar.appendChild(addtopic);
        navbar.appendChild(adduser);
        navbar.appendChild(addsite);
        navbar.appendChild(clear);
        navbar.appendChild(hideside);
        
        if (hidewordstring.length != 0 ) {
            hidewords = hidewordstring.split("|");
            for( var i = 0; i < hidewords.length; i++ )
            {
                var span = document.createElement('a');
                span.id = "hw_" + hidewords[i];
                span.className = "tool";
                span.remove = function ()
                {
                    if (hidewordstring.indexOf(this.firstChild.textContent) == 0) {
                        hidewordstring = hidewordstring.replace(this.firstChild.textContent, "");
                    } else {
                        hidewordstring = hidewordstring.replace("|" + this.firstChild.textContent, "");
                    }
                    if (hidewordstring[0] == '|') hidewordstring = hidewordstring.substr(1, hidewordstring.length - 1);
                    if (hidewordstring[hidewordstring.length - 1] == '|') hidewordstring = hidewordstring.substr(hidewordstring.length - 1, 1);
                    var me = document.getElementById("hw_" + this.firstChild.textContent);
                    me.parentNode.removeChild(me);
                    GM_setValue("diggwasherwords", hidewordstring);
                    filterStories(log);
                    showHidewords();
                    installRemoveBar();
                    installRemoveBar();
                    showHidewords();
                }
                span.addEventListener('click', span.remove, true);
                span.innerHTML = hidewords[i];
                navbar.appendChild(span);
            }
        }

        if (topicstring.length != 0 ) {
            topics = topicstring.split("|");
            for( var i = 0; i < topics.length; i++ )
            {
                var span = document.createElement('a');
                span.id = "t_" + topics[i];
                span.className = "tool";
                span.remove = function ()
                {
                    if (topicstring.indexOf(this.firstChild.textContent) == 0) {
                        topicstring = topicstring.replace(this.firstChild.textContent, "");
                    } else {
                        topicstring = topicstring.replace("|" + this.firstChild.textContent, "");
                    }
                    if (topicstring[0] == '|') topicstring = topicstring.substr(1, topicstring.length - 1);
                    if (topicstring[topicstring.length - 1] == '|') topicstring = topicstring.substr(topicstring.length - 1, 1);
                    var me = document.getElementById("t_" + this.firstChild.textContent);
                    me.parentNode.removeChild(me);
                    GM_setValue("diggwashertopics", topicstring);
                    filterStories(log);
                    showHidewords();
                    installRemoveBar();
                    installRemoveBar();
                    showHidewords();
                }
                span.addEventListener('click', span.remove, true);
                span.innerHTML = "<font color = 'green'>" + topics[i] + "</font>";
                navbar.appendChild(span);
            }
        }
        
       if (hideuserstring.length != 0 ) {
            hideusers = hideuserstring.split("|");
            for( var i = 0; i < hideusers.length; i++ )
            {
                var span = document.createElement('a');
                span.id = "hu_" + hideusers[i];
                span.className = "tool";
                span.remove = function ()
                {
                    if (hideuserstring.indexOf(this.firstChild.textContent) == 0) {
                        hideuserstring = hideuserstring.replace(this.firstChild.textContent, "");
                    } else {
                        hideuserstring = hideuserstring.replace("|" + this.firstChild.textContent, "");
                    }
                    if (hideuserstring[0] == '|') hideuserstring = hideuserstring.substr(1, hideuserstring.length - 1);
                    if (hideuserstring[hideuserstring.length - 1] == '|') hideuserstring = hideuserstring.substr(hideuserstring.length - 1, 1);
                    var me = document.getElementById("hu_" + this.firstChild.textContent);
                    me.parentNode.removeChild(me);
                    GM_setValue("diggwasherusers", hideuserstring);
                    filterStories(log);
                    showHidewords();
                    installRemoveBar();
                    installRemoveBar();
                    showHidewords();
                }
                span.addEventListener('click', span.remove, true);
                span.innerHTML = "<font color = 'blue'>" + hideusers[i] + "</font>";
                navbar.appendChild(span);
            }
        }

       if (hidesitestring.length != 0 ) {
            hidesites = hidesitestring.split("|");
            for( var i = 0; i < hidesites.length; i++ )
            {
                var span = document.createElement('a');
                span.id = "hu_" + hidesites[i];
                span.className = "tool";
                span.remove = function ()
                {
                    if (hidesitestring.indexOf(this.firstChild.textContent) == 0) {
                        hidesitestring = hidesitestring.replace(this.firstChild.textContent, "");
                    } else {
                        hidesitestring = hidesitestring.replace("|" + this.firstChild.textContent, "");
                    }
                    if (hidesitestring[0] == '|') hidesitestring = hidesitestring.substr(1, hidesitestring.length - 1);
                    if (hidesitestring[hidesitestring.length - 1] == '|') hidesitestring = hidesitestring.substr(hidesitestring.length - 1, 1);
                    var me = document.getElementById("hu_" + this.firstChild.textContent);
                    me.parentNode.removeChild(me);
                    GM_setValue("diggwashersites", hidesitestring);
                    filterStories(log);
                    showHidewords();
                    installRemoveBar();
                    installRemoveBar();
                    showHidewords();
                }
                span.addEventListener('click', span.remove, true);
                span.innerHTML = "<font color = 'red'>" + hidesites[i] + "</font>";
                navbar.appendChild(span);
            }
        }        

        wordsShown = true;
    } else {
        if (hidewordstring.length > 0 ) {
            hidewords = hidewordstring.split("|");
            for( var i = 0; i < hidewords.length; i++ )
            {
                var tempword = document.getElementById("hw_" + hidewords[i]);
                if (tempword) {
	                if (log) {
		                GM_log ("removing hideword child hw_" + hidewords[i]);
	                }
                    tempword.parentNode.removeChild(tempword);
                }
            }
        }
        if (topicstring.length > 0 ) {
            topics = topicstring.split("|");
            for( var i = 0; i < topics.length; i++ )
            {
                var tempword = document.getElementById("t_" + topics[i]);
                if (tempword) {
	                if (log) {
		                GM_log ("removing topic child t_" + topics[i]);
	                }
                    tempword.parentNode.removeChild(tempword);
                }
            }
        }
        if (hideuserstring.length > 0 ) {
            hideusers = hideuserstring.split("|");
            for( var i = 0; i < hideusers.length; i++ )
            {
                var tempword = document.getElementById("hu_" + hideusers[i]);
                if (tempword) {
	                if (log) {
		                GM_log ("removing user child hu_" + hideusers[i]);
	                }
                    tempword.parentNode.removeChild(tempword);
                }
            }
        }        
        if (hidesitestring.length > 0 ) {
            hidesites = hidesitestring.split("|");
            for( var i = 0; i < hidesites.length; i++ )
            {
                var tempword = document.getElementById("hu_" + hidesites[i]);
                if (tempword) {
	                if (log) {
		                GM_log ("removing site child hu_" + hidesites[i]);
	                }
                    tempword.parentNode.removeChild(tempword);
                }
            }
        }        
        link.parentNode.removeChild(link);
        addtopic.parentNode.removeChild(addtopic);
        adduser.parentNode.removeChild(adduser);
        addsite.parentNode.removeChild(addsite);
        clear.parentNode.removeChild(clear);
        hideside.parentNode.removeChild(hideside);
        wordsShown = false;
        addremove.innerHTML = "Show Options";
    }
}

showSidebar = !showSidebar;
ToggleSidebar();
filterStories(log);
installRemoveBar();