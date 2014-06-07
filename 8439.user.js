// ==UserScript==
// @name            LookItUp
// @description     Select a word, and immidiately see it looked up in your wikipedia, a dictionary or whatever you like (it can be customized!)
// @source          http://userscripts.org/scripts/show/7715
// @identifier      http://userscripts.org/scripts/source/7715.user.js
// @version         1.3
// @date            2007-02-28
// @author          Bjorn Rosell
// @namespace       http://www.rosell.dk/gm/
// @include         *
// ==/UserScript==

/*
Based on "QuickiWiki" by script by Tarmle (http://www.ruinsofmorning.net/greasemonkey/)

http://www.quirksmode.org/js/keys.html
*/
// ------------------------------------------------------------------------------------
//                              Part 0: Auto-update
// ------------------------------------------------------------------------------------

function autoupdate() {
    // only check for updates one time a day
    var d = new Date();
    if (GM_getValue('lastcheck') == d.getDate()) {
        return
    }
    GM_setValue('lastcheck',d.getDate());
    
    // check for update
    GM_xmlhttpRequest({
        method:"GET",
        url:'http://userscripts.org/scripts/source/7715.user.js',
        onload:function(result) {
            if (result.responseText.indexOf('@version         1.3') == -1) {
                var elmInsertPoint = document.body;
                var elmA = document.createElement("a");
                elmA.setAttribute("href", "http://userscripts.org/scripts/source/7715.user.js");
                elmA.appendChild(document.createTextNode('There is a new version of the "LookItUp" userscript. Click here to install it'));
                elmInsertPoint.insertBefore(elmA, elmInsertPoint.firstChild);
            }
        }
    });
}

// If its the first time the user runs the script, no update notice should be shown
if (GM_getValue('lastcheck') != null) {
    var feat1_2 = "New features of LookItUp 1.2:\n\nPressing '?' while text is highlighted displays a search menu.\nFrom this menu you can enter a word (the highlighted word is shown per default), and select which site you want to look the word(s) up in.\n\nPressing '!' while text is hightlighted temporarily sets the SELECT action to the last action\nExample:\n- Select some text\n- press 'w' to look it up in wikipedia\n- press '!' to temporarily make wikipedia your quick-lookup engine\n- Select some text.\nThe text will be looked up immidiately when its selected. The assignment is not saved. It only lasts while on page. Usefull if you are on a page where the text is hard, and you want to look up a lot of words quickly\n\nPressing Esc key closes the boxes\n\nPressing '#' key while text is hightlighted shows the settings\n\nPressing 'q' while text is highlighted disables the script\n\nThe urls are encoded using encodeURI, to support non-English characters"
    var feat1_3 = "Fixes in LookItUp 1.3:\n\nIf ctrl or alt is hold down while a key is pressed, no site will be opened"
    if (!GM_getValue('version')) {
        alert(feat1_2 + "\n\n" + feat1_3)
    }
    if (GM_getValue('version') == "1.2") {
        alert(feat1_3)
    }
    GM_setValue('version', "1.3");
}
autoupdate();

// ------------------------------------------------------------------------------------
//                              Part 1: Settings 
// ------------------------------------------------------------------------------------
var defaultSites = [
    ['Wikipedia', 'http://fr.wikipedia.org/w/index.php?lookitup&title=[words]&printable=yes', "W", 'widebar'],
    ['Wictionary', 'http://fr.wiktionary.org/w/index.php?lookitup&title=[words]&printable=yes', "V", 'narrowbar']
]

var defaultStyles = [
    ['widebar', 'width:460px;height:100%;top:0px;right:0px;position:fixed;border:1px solid black;background-color:white;z-index:1000'],
    ['narrowbar', 'width:300px;height:100%;top:0px;right:0px;position:fixed;border:1px solid black;background-color:white;z-index:1000'],
    ['megawidebar', 'width:750px;height:100%;top:0px;right:0px;position:fixed;border:1px solid black;background-color:white;z-index:1000']
]
// http://www.freetranslation.com/
// http://www.djh.dk/ejour/0104/31GratisOrdboger.html
// http://www.djh.dk/ejour/arkiv/Ordboger.html
// http://www.foreignword.com/Tools/transnow.htm
Number.prototype.toSource=Boolean.prototype.toSource=Function.prototype.toSource=function() {return this+''}
String.prototype.toSource=function() {var s=this;s=s.replace(/\\/g, "\\\\");s=s.replace(/\"/g, "\\\"");s=s.replace(/\n/g, "\\n");s=s.replace(/\r/g, "");return '"'+s+'"'}
Array.prototype.toSource=function() {var a=this;var s1='[';if (a.length>0) {for (var i=0;i<a.length;i++) {if ((a[i]+'')=='undefined') {s1+=', ';continue;};s1+=a[i].toSource()+(i<a.length-1?',':'')}};s1+=']';return s1}
Object.prototype.toSource=function() {var o=this;if (o==null) return 'null';var s1='';for (var item in o) {if (item=="toSource") continue;	if (o[item]==null) {continue;};s1+=item+':'+o[item].toSource()+','};s1=s1.substr(0,s1.length-1);s1='{'+s1+'}';return s1}

var sites;
function loadSettings() {
    var savedSites = GM_getValue("sites");
    if (typeof savedSites == "undefined") {
        sites = defaultSites;
        styles = defaultStyles;
    }
    else {
        eval('sites = ' + savedSites);
        eval('styles = ' + GM_getValue("styles"));
    }
}

function showSettings() {
    var div = document.getElementById('LIU_settings');
    if (div != null) closeSettings();
    div = document.createElement("div");
    div.setAttribute("id", "LIU_settings");
    div.setAttribute("style", "display:block;z-index:1002;position:fixed;overflow:auto;left:10%;top:10%;width:80%;height:80%;background-color:white;padding:15px;border:1px solid black");
    document.body.appendChild(div);
    if (!document.getElementById('LIU_settings')) {
        alert("Settings could not be shown. It probably due to a greasemonkey bug. Highlight some text and press '#' to see the settings");
        return
    }
    var s='';
    var a = sites;
    //s+="<h1>Settings</h2>";
    s+="<h2>Sites</h2>";
    /*
    s+="Name: Anything you like<br>";
    s+="Url: You must insert '[words]' somewhere here. This will be replaced by the selected words, before the url is opened<br>";
    s+="Trigger: Can be 'SHIFT-SELECT', 'SELECT' or any character. 'SELECT' means that the site will be displayed immidiately when a word is selected. 'SHIFT-SELECT' will trigger on a selection, but only if the SHIFT key is pressed when the selection is completed. A character trigger works like this: If that key is pressed while there is a selection, voila! - its triggered<br>";
    s+="Style: Must equal one of the defined style names<br>";
    */
    s+="<table cellspacing='0' cellpadding='0'><tr style='font-weight:bold;'><td>Name</td><td>Url</td><td>Trigger</td><td>Style</td></tr>";
    for (var i=0;i<a.length;i++) {
        var site=a[i];
        s+="<tr>";
        s+="<td><input id='LIU_" + i + "_0' type='text' size='15' value='" + site[0] + "'/></td>";
        s+="<td><input id='LIU_" + i + "_1' type='text' size='80' value='" + site[1] + "'/></td>";
        s+="<td><input id='LIU_" + i + "_2' type='text' size='13' value='" + site[2] + "'/></td>";
        s+="<td><input id='LIU_" + i + "_3' type='text' size='10' value='" + site[3] + "'/></td>";
        s+="<td><button id='LIU_" + i + "_remove'>Delete</button></td>";
        s+="</tr>";
        s+="";
    }
    s+="<tr><td colspan=4></td><td><button id='LIU_add'>Add site</button></td></tr>";
    s+="</table>";
    s+="<h2>Styles</h2>";
    s+="<table cellspacing='0' cellpadding='0'><tr style='font-weight:bold;'><td>Id</td><td>Style</td></tr>";
    for (var i=0;i<styles.length;i++) {
        var style=styles[i];
        s+="<tr>";
        s+="<td><input id='LIU_" + i + "_0style' type='text' size='15' value='" + style[0] + "'/></td>";
        s+="<td><input id='LIU_" + i + "_1style' type='text' size='100' value='" + style[1] + "'/></td>";
        s+="<td><button id='LIU_" + i + "_removeStyle'>Delete</button></td>";
        s+="</tr>";
        s+="";
    }
    s+="<tr><td colspan=2></td><td><button id='LIU_addStyle'>Add style</button></td></tr>";
    s+="</table>";
    s+="<br><button id='LIU_save'>Save</button>";
    s+="<button id='LIU_cancel'>Cancel</button>";
    s+="&nbsp;&nbsp;&nbsp;&nbsp;<button id='LIU_defauls'>Revert to defaults</button>";
    div.innerHTML = s;
    
    for (var i=0;i<a.length;i++) {
        document.getElementById('LIU_'+ i + '_remove').attachEvent('onclick', function(e) {storeSettings();var id=e.target.getAttribute('id');var i=id.substr(4,id.lastIndexOf('_')-4);var a=[];for(var j=0;j<sites.length;j++) if (j!=i) a.push(sites[j]); sites=a;showSettings()}, false);
    }
    for (var i=0;i<styles.length;i++) {
        document.getElementById('LIU_'+ i + '_removeStyle').attachEvent('onclick', function(e) {storeSettings();var id=e.target.getAttribute('id');var i=id.substr(4,id.lastIndexOf('_')-4);var a=[];for(var j=0;j<styles.length;j++) if (j!=i) a.push(styles[j]); styles=a;showSettings()}, false);
    }
    document.getElementById('LIU_add').attachEvent('onclick', function(e) {storeSettings();sites.push(['','','','']); showSettings()}, false);
    document.getElementById('LIU_addStyle').attachEvent('onclick', function(e) {storeSettings();styles.push(['','']); showSettings()}, false);
    document.getElementById('LIU_save').attachEvent('onclick', function(e) {storeSettings();saveSettings();closeSettings()}, false);
    document.getElementById('LIU_cancel').attachEvent('onclick', function(e) {loadSettings();closeSettings()}, false);
    document.getElementById('LIU_defauls').attachEvent('onclick', function(e) {sites=defaultSites;styles=defaultStyles;showSettings()}, false);
}
function storeSettings() {
    for (var i=0;i<sites.length;i++) {
        var site=sites[i];
        for (var j=0;j<site.length;j++) {
            var elm = document.getElementById('LIU_'+i+'_'+j);
            if (elm) sites[i][j] = elm.value;
        }
    }
    for (var i=0;i<styles.length;i++) {
        var style=styles[i];
        for (var j=0;j<style.length;j++) {
            var elm = document.getElementById('LIU_'+i+'_'+j+'style');
            if (elm) styles[i][j] = elm.value;
        }
    }
}
function saveSettings() {
    GM_setValue("sites", sites.toSource());
    GM_setValue("styles", styles.toSource());
}    
function closeSettings() {
    var div = document.getElementById('LIU_settings');
    if (div) {
        div.parentNode.removeChild(div);
    }
}

loadSettings();
GM_registerMenuCommand("LookItUp settings", showSettings)

// ------------------------------------------------------------------------------------
//                              Part 2: The actual stuff
// ------------------------------------------------------------------------------------

d = document;
var lastSiteShown;
var selectTriggersLastAction = false;

function buildBox() {    
    // Build popup //
    var popup = document.createElement('iframe');
    popup.setAttribute('id', 'ResultBox');
    //popup.setAttribute('style', "display:none;z-index:1000;position:fixed;top:0px;right:0px;width:460px;height:100%;border:1px solid black;");
    document.body.appendChild(popup);
    
    // Prevent miss-clicks from hiding popup //
    window.LIPPointer = false;
    popup.attachEvent('onmouseover', function(e){ e=e?e:event
        window.LIPPointer = true;
    }, false);
    popup.attachEvent('onmouseout', function(e){ e=e?e:event
        window.LIPPointer = false;
    }, false);
    return popup;
}

function hideBox() {    
    var box = document.getElementById('ResultBox');
    if (box) {
        box.style.display = 'none';
    }
    closeSearchBox();
}

function showSearchBox() {    
    // Build popup //
    var popup = document.createElement('div');
    popup.setAttribute('id', 'LIU_SearchBox');
    popup.setAttribute("style", "z-index:1102;position:fixed;overflow:auto;width:270px;left:20px;top:20px;background-color:white;padding:15px;border:1px solid black");
    document.body.appendChild(popup);
    popup.attachEvent('onmouseover', function(e){ e=e?e:event
        window.LIPPointer = true;
    }, false);
    popup.attachEvent('onmouseout', function(e){ e=e?e:event
        window.LIPPointer = false;
    }, false);

    var s = '<textarea id="LIU_search" style="width:250px; height:50px;">' + document.selection.createRange().text + '</textarea><br><br>';
    for (var i=0;i<sites.length;i++) {
        var site=sites[i];
        s += "<button id='LIU_search_" + i + "'>" + site[0] + "</button><br>";
    }
    popup.innerHTML = s;
    
    for (var i=0;i<sites.length;i++) {
        document.getElementById('LIU_search_' + i).attachEvent('onclick', function(e) {var id=e.target.getAttribute('id');var site=sites[parseInt(id.substr(id.lastIndexOf('_')+1), 10)];lookup(site, document.getElementById("LIU_search").value)}, false);   
    }
}

function closeSearchBox() {    
    var div = document.getElementById('LIU_SearchBox');
    if (div) {
        div.parentNode.removeChild(div);
    }
}


// Selected Text Event Function // 
window.LIPSelectEvent  = function (e) { e=e?e:event;
	// Was this a miss-click? //
	if (window.LIPPointer) return;
    if (document.selection.createRange().text == '') {
        hideBox();
        return
    }
    // Find if there are any of the sites that should trigger on a text selection
    var searchFor = 'SELECT';
    if (e.shiftKey) searchFor = 'SHIFT-SELECT'
    if (e.ctrlKey) searchFor = 'CTRL-SELECT'
    if (e.altKey) searchFor = 'ALT-SELECT'
    if (selectTriggersLastAction && (searchFor == 'SELECT')) {
        lookup(lastSiteShown);
    }
    else {
        for (var i=0; i<sites.length; i++) {
            if (sites[i][2] == searchFor) {
                lookup(sites[i]);
                break;
            }
        }
    }
}

window.LIPKeyPressEvent  = function (e) { e=e?e:event;
    //alert("PressEvent:" + e.keyCode)
    // esc key hides the box
    if (e.keyCode==27) {
        hideBox();
        closeSettings();
        return
    }
    if (document.selection.createRange().text == '') return;
    if (e.ctrlKey) return;
    if (e.altKey) return;

    // '?' key shows the search box
    if (e.charCode==63) {
        showSearchBox();
        return
    }
    // '#' key shows the settings
    if (e.charCode==35) {
        showSettings();
        return
    }

    // user presses "q" while text is selected -> the script is disabled
    if (e.charCode==113) {
        document.dettachEvent('onmouseup', window.LIPSelectEvent, false);
        document.dettachEvent('onkeydown', window.LIPKeyPressEvent, false);
        var box = document.getElementById('ResultBox');
        if (box) box.style.display = 'none';
    }

    // user presses "!" while text is selected -> the last command is executed on "SELECT"
    if (e.charCode==33) {
        selectTriggersLastAction = true;
    }
    
    for (var i=0; i<sites.length; i++) {
        var charCode = sites[i][2];
        if (typeof(charCode)=='string') charCode = charCode.charCodeAt(0);
        if (charCode == e.keyCode) {
            lookup(sites[i]);
            break;
        }
    }
}

// Set Up Selection Event Watch //
document.attachEvent('onmouseup', window.LIPSelectEvent, false);
document.attachEvent('onkeydown', window.LIPKeyPressEvent, false);

function lookup(site, words) {
    //alert(site + ":" + words)
    var box = document.getElementById('ResultBox');
    if (!box) box=buildBox();
    //alert(box.nodeName)
    // Set style
    for (var i=0; i<styles.length; i++) {
        if (styles[i][0] == site[3]) {
            box.style.cssText=(styles[i][1]);
            break;
        }
    }
    if(box.style.position=="fixed" || document.compatMode=="backCompat") {
        box.style.position="absolute";
        box.style.setExpression('height', 'document.body.clientHeight');
        box.style.setExpression('top', 'document.body.scrollTop+"px"');
    }

    lastSiteShown = site;
    
    // Get Text //
    if (words == null) words = document.selection.createRange().text;
    if (words == "") {
        hideBox();
        return
    }
    words = String(words);
    words = words.replace(/(^\s+|\s+$)/g, '');

    // Kill HTML //
    words = words.replace(/"/g, "'");
    words = words.replace(/>/g, '&gt');
    words = words.replace(/</g, '&lt');

    // Hide on Big Selections //
    //if (words.length > 40) {box.style.display = 'none'; return;}

    // Truncate on Long Selections //
    //if (words.length > 30) {words = words.substring(0,30);}

    var url = site[1];
    var pos = url.indexOf('[words]');
    url = encodeURI(url.substr(0,pos) + words + url.substr(pos+7));
    box.src = url;
    box.style.display = 'block';
}


