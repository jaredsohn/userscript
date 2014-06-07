// ==UserScript==
// @name          Digg Washer
// @namespace     http://versememory.berlios.de/
// @description	  Adds a small app to the top of a digg page that allows you to specify keywords or topics by which to hide articles.  It can also toggle on/off the sidebar.
// @include       http://digg.com/*
// @include       http://www.digg.com/*
// ==/UserScript==

var hidewordstring = GM_getValue("diggwasherwords", "");
var topicstring = GM_getValue("diggwashertopics", "");
var showSidebar = GM_getValue("diggwashersidebar", true);

var hidewords = hidewordstring.split("|");

var hiddenStories = 0;
var parent = document.getElementById("wrapper");
parent = parent.firstChild.nextSibling.nextSibling.nextSibling;
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
    sidebar = sidebar.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling;
    if (!showSidebar) {
        var head = window.document.getElementsByTagName( "head" )[0];
        var style = window.document.createElement( "style" );
        style.id = "style";
        style.setAttribute( "type", "text/css" );
        style.innerHTML = ".sidebar { display: none; } .main { margin-right: 0; } body { padding: 0; } html { min-width: 100%; } .comment { margin-right: -15px; }";
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
    filterStories(false);
}

function filterStories(log)
{
    hiddenStories = 0;
    enclosures = document.evaluate("//div[contains(@id, 'enclosure')]",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
    hidewords = hidewordstring.split("|");
    topics = topicstring.split("|");
    for (var i = 0; i < enclosures.snapshotLength; i++) {
        div = enclosures.snapshotItem(i);
        var title = document.evaluate("div/h3/a/text()", div, null, XPathResult.STRING_TYPE, null).stringValue;
        var text = document.evaluate("div/p/text()", div, null, XPathResult.STRING_TYPE, null).stringValue;
        var topic = document.evaluate("div/div/span/a/text()", div, null, XPathResult.STRING_TYPE, null).stringValue;
        title = title.toLowerCase();
        text = text.toLowerCase();
        topic = topic.toLowerCase();
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
    filterStories(false);
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

        parent.appendChild(hidden);
        parent.appendChild(addremove);
        barShown = true;
    } else {
        parent.removeChild(hidden);
        parent.removeChild(addremove);
        barShown = false;
    }
}

function addWord()
{
    add(hidewordstring, "diggwasherwords");
    hidewordstring = GM_getValue("diggwasherwords", hidewordstring);
    filterStories(false);
    showHidewords();
    installRemoveBar();
    installRemoveBar();
    showHidewords();
}

function addTopic()
{
    add(topicstring, "diggwashertopics");
    topicstring = GM_getValue("diggwashertopics", topicstring);
    filterStories(false);
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

        parent.appendChild(link);
        parent.appendChild(addtopic);
        parent.appendChild(clear);
        parent.appendChild(hideside);
        
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
                    filterStories(false);
                    showHidewords();
                    installRemoveBar();
                    installRemoveBar();
                    showHidewords();
                }
                span.addEventListener('click', span.remove, true);
                span.innerHTML = hidewords[i];
                parent.appendChild(span);
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
                    filterStories(false);
                    showHidewords();
                    installRemoveBar();
                    installRemoveBar();
                    showHidewords();
                }
                span.addEventListener('click', span.remove, true);
                span.innerHTML = "<font color = 'green'>" + topics[i] + "</font>";
                parent.appendChild(span);
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
                    tempword.parentNode.removeChild(tempword);
                }
            }
        }
        link.parentNode.removeChild(link);
        addtopic.parentNode.removeChild(addtopic);
        clear.parentNode.removeChild(clear);
        hideside.parentNode.removeChild(hideside);
        wordsShown = false;
        addremove.innerHTML = "Show Options";
    }
}

showSidebar = !showSidebar;
ToggleSidebar();
filterStories(true);
installRemoveBar();