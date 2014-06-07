// ==UserScript==
// @name           EN-TR dictionary.
// @namespace      ApranaxFort
// @description    Seslisözlük altyapısından faydalanarak hazırlanmış bu scripti kullanabilemk için sadece bir sayfada kelimeyi seçip klavyeden "S" tuşuna basmanız yeterli.
// @include        http://*
// @include        https://*
// ==/UserScript==


function $(id) {return document.getElementById(id)};
function parofe(e,i) {return e.target.getAttribute('id').split('_')[i]}
function idofe(e,i) {return parseInt(parofe(e,i), 10)}

// ------------------------------------------------------------------------------------
//                              Part 1: Settings 
// ------------------------------------------------------------------------------------
var defaultSites = [
    ['Sozluk', 'http://mobile.seslisozluk.com/?word=[words]', "s", 'narrowbar']
]
var defaultStyles = [
    ['narrowbar', 'width:200px;height:100%;top:0px;right:0px;padding-left:0px;position:fixed;border:1px solid black;background-color:white;z-index:1000']
]
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

/*****************************************BURASINI KALDIRDIM*****************************/
function showSettings() {
    var div = $('LIU_settings');
    if (div != null) closeSettings();
    div = document.createElement("div");
    div.setAttribute("id", "LIU_settings");
    div.setAttribute("style", "display:block;z-index:1002;position:fixed;overflow:auto;left:10%;top:10%;width:80%;height:80%;background-color:white;padding:15px;border:1px solid black");
    document.body.appendChild(div);
    if (!$('LIU_settings')) {
        alert("Settings could not be shown. It probably due to a greasemonkey bug. Highlight some text and press '#' to see the settings");
        return
    }
    var s='';
    var a = sites;
    s+="<h2>Sites</h2>";
    s+="<table cellspacing='0' cellpadding='0'><tr style='font-weight:bold;'><td>Name</td><td>Url</td><td>Trigger</td><td>Style</td></tr>";
    for (var i=0;i<a.length;i++) {
        var site=a[i];
        s+="<tr>";
        s+="<td><input id='LIU_" + i + "_0' type='text' size='15' value='" + site[0] + "'/></td>";
        s+="<td><input id='LIU_" + i + "_1' type='text' size='80' value=''/></td>";
        s+="<td><input id='LIU_" + i + "_2' type='text' size='13' value='" + site[2] + "'/></td>";
        s+="<td><input id='LIU_" + i + "_3' type='text' size='10' value='" + site[3] + "'/></td>";
        s+="<td><button id='LIU_" + i + "_up'>Move up</button></td>";
        s+="<td><button id='LIU_" + i + "_remove'>Delete</button></td>";
        s+="</tr>";
        s+="";
    }
    s+="<tr><td colspan=4></td><td colspan=2><button id='LIU_add'>Add site</button></td></tr>";
    s+="</table>";
    s+="<button id='LIU_mergedefauls'>Merge default sites into sites</button>";
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
    s+="&nbsp;&nbsp;&nbsp;&nbsp;<button id='LIU_defauls'>Revert to default sites/styles</button>";
    div.innerHTML = s;
    
    for (var i=0;i<a.length;i++) {
        $('LIU_'+ i + '_1').value=sites[i][1];
        $('LIU_'+ i + '_up').addEventListener('click', function(e) {storeSettings();var id=idofe(e,1);var temp=sites[id];sites[id]=sites[id-1];sites[id-1]=temp;showSettings()}, false);
        $('LIU_'+ i + '_remove').addEventListener('click', function(e) {storeSettings();var id=idofe(e,1);var a=[];for(var j=0;j<sites.length;j++) if (j!=id) a.push(sites[j]); sites=a;showSettings()}, false);
    }
    for (var i=0;i<styles.length;i++) {
        $('LIU_'+ i + '_removeStyle').addEventListener('click', function(e) {storeSettings();var id=idofe(e,1);var a=[];for(var j=0;j<styles.length;j++) if (j!=id) a.push(styles[j]); styles=a;showSettings()}, false);
    }
    $('LIU_add').addEventListener('click', function(e) {storeSettings();sites.push(['','','','']); showSettings()}, false);
    $('LIU_addStyle').addEventListener('click', function(e) {storeSettings();styles.push(['','']); showSettings()}, false);
    $('LIU_save').addEventListener('click', function(e) {storeSettings();saveSettings();closeSettings()}, false);
    $('LIU_cancel').addEventListener('click', function(e) {loadSettings();closeSettings()}, false);
    $('LIU_defauls').addEventListener('click', function(e) {sites=defaultSites;styles=defaultStyles;showSettings()}, false);
    $('LIU_mergedefauls').addEventListener('click', function(e) {for(var i=0;i<defaultSites.length;i++){var site=defaultSites[i]; var found=false; for(var j=0;j<sites.length;j++) {if (sites[j][0]==site[0]){sites[j][1]=site[1];found=true}}; if (!found) sites.push(site)};showSettings()}, false);
}
function storeSettings() {
    for (var i=0;i<sites.length;i++) {
        var site=sites[i];
        for (var j=0;j<site.length;j++) {
            var elm = $('LIU_'+i+'_'+j);
            if (elm) sites[i][j] = elm.value;
        }
    }
    for (var i=0;i<styles.length;i++) {
        var style=styles[i];
        for (var j=0;j<style.length;j++) {
            var elm = $('LIU_'+i+'_'+j+'style');
            if (elm) styles[i][j] = elm.value;
        }
    }
}
function saveSettings() {
    GM_setValue("sites", sites.toSource());
    GM_setValue("styles", styles.toSource());
}    
function closeSettings() {
    var div = $('LIU_settings');
    if (div) {
        div.parentNode.removeChild(div);
    }
}

loadSettings();
GM_registerMenuCommand("LookItUp settings", showSettings)

// ------------------------------------------------------------------------------------
//                              Part 2: Cleanup
// ------------------------------------------------------------------------------------

// useful xpath function by alien_scum (http://userscripts.org/scripts/show/8370)
function $x(xpath) {
    xpath=xpath.replace(/((^|\|)\s*)([^/|]+)/g,'$2//$3').replace(/([^.])\.(\w*)/g,'$1[@class="$2"]').replace(/#(\w*)/g,'[@id="$1"]').replace(/\/\[/g,'/*[');
    var got=document.evaluate(xpath,document,null,0,null), result=[];
    while(next=got.iterateNext()) result.push(next);
    return result;
}

var lh = unescape(location.href);
var pos3 = lh.indexOf('lookitup');
// only perform cleanup, if "lookitup" is in the url (to avoid that the script messes with stuff it shouldn't be messing with)
if (pos3 > 0) {
    var sep = lh.charAt(pos3+8);
    var a = lh.substr(pos3+9).split(sep);
    for (var i=0; i<a.length; i++) {
        var pos = a[i].indexOf("=");
        if (pos<0) continue;
        var name = a[i].substr(0, pos);
        var value = a[i].substr(pos+1);
        switch(name) {
            case 'xcrop': 
                var r=$x(value);
                document.body.innerHTML = '';
                r.forEach(function(n){document.body.appendChild(n)});
                break;
            case 'xremove':
                var r=$x(value);
                r.forEach(function(elm){elm.parentNode.removeChild(elm);});
                break;            
            case 'eval': 
                eval(value); 
                break;
            case 'css': 
                GM_addStyle("@namespace url(http://www.w3.org/1999/xhtml); " + value); 
                break;
            case 'crop':
                var b = value.split('|');
                if (b.length >= 2) {
                    var s = document.body.innerHTML;
                    var pos = s.indexOf(b[0]);
                    if (pos > 0) {
                        var pos2 = s.indexOf(b[1], pos + 1) 
                        if (pos2 > 0) {
                            if (b.length>=3) pos+=parseInt(b[2]);
                            if (b.length>=4) pos2+=parseInt(b[3]);
                            document.body.innerHTML = s.substr(pos, pos2-pos);
                        }
                    }
                }
                break;
            case 'replace':
                var b = value.split('|');
                if (b.length == 2) {
                    b[2]=b[1];
                    b[1]="gi";
                }
                if (b.length == 3) {
                    var re = new RegExp(b[0], b[1]);
                    document.body.innerHTML = document.body.innerHTML.replace(re, b[2]);
                }
        }
    }
}

// ------------------------------------------------------------------------------------
//                              Part 3: The actual stuff
// ------------------------------------------------------------------------------------

d = document;
var lastCharCode;
var exclamationChar;

function buildBox(siteId) {
    // Build popup //
    var popup = document.createElement('iframe');
    popup.setAttribute('id', 'ResultBox' + siteId);
    document.body.appendChild(popup);
    
    // Releasing mousebutton over popup should not close it //
    window.LIPIsMouseOverPopUp = false;
    popup.addEventListener('mouseover', function(e){window.LIPIsMouseOverPopUp = true;}, false);
    popup.addEventListener('mouseout', function(e){window.LIPIsMouseOverPopUp = false;}, false);
    return popup;
}

function hideResultBox(id) {
    var box = $('ResultBox' + id);
    if (box) box.style.display = 'none';
}

function hideResultBoxes() {
    for (var i=0; i<sites.length; i++) hideResultBox(i)
}

function closeAll() {
    hideResultBoxes();
    closeSearchBox();
    var esc = $('Esc');
    if (esc) esc.parentNode.removeChild(esc);
}

function showSearchBox() {
    // Build popup //
    var popup = document.createElement('div');
    popup.setAttribute('id', 'LIU_SearchBox');
    popup.setAttribute("style", "z-index:1102;position:fixed;overflow:auto;width:270px;left:20px;top:20px;background-color:white;padding:15px;border:1px solid black");
    document.body.appendChild(popup);
    popup.addEventListener('mouseover', function(e){
        window.LIPIsMouseOverPopUp = true;
    }, false);
    popup.addEventListener('mouseout', function(e){
        window.LIPIsMouseOverPopUp = false;
    }, false);

    var s = '<textarea id="LIU_search" style="width:250px; height:50px;">' + window.getSelection() + '</textarea><br><br>';
    for (var i=0;i<sites.length;i++) {
        var site=sites[i];
        s += "<button id='LIU_search_" + i + "'>" + site[0] + "</button><br>";
    }
    popup.innerHTML = s;
    
    for (var i=0;i<sites.length;i++) {
        $('LIU_search_' + i).addEventListener('click', function(e) {hideResultBoxes();var id=e.target.getAttribute('id');var siteId=parseInt(id.substr(id.lastIndexOf('_')+1), 10);lookup(siteId, $("LIU_search").value)}, false);   
    }
}

function closeSearchBox() {    
    var div = $('LIU_SearchBox');
    if (div) {
        div.parentNode.removeChild(div);
    }
}


window.LIPClickEvent  = function (e) {
	// Nothing should happen, if mouse is over an iframe //
	if (window.LIPIsMouseOverPopUp) return;
    
    // Nothing should happen if user pressed a button, radiobutton or alike
    if (e.target.toString().indexOf('HTMLButton') > 0) return;
    if (e.target.toString().indexOf('HTMLInput') > 0) return;
    
    closeAll();
    if (window.getSelection() == '') return;
    // Find if there are any of the sites that should trigger on a text selection
    var searchFor = 'SELECT';
    if (e.shiftKey) searchFor = 'SHIFT-SELECT'
    if (e.ctrlKey) searchFor = 'CTRL-SELECT'
    if (e.altKey) searchFor = 'ALT-SELECT'
    if (exclamationChar && (searchFor == 'SELECT')) {
        customKey(exclamationChar)
    }
    else {
        for (var i=0; i<sites.length; i++) {
            if (sites[i][2] == searchFor) {
                lookup(i);
            }
        }
    }
}

// http://www.quirksmode.org/js/keys.html
window.LIPKeyPressEvent  = function (e) {
    // esc key hides the box
    if (e.keyCode==27) {
        closeAll();
        closeSettings();
        return
    }
    if (window.getSelection() == '') return;
    if (e.ctrlKey) return;
    if (e.altKey) return;

    // user pressed a key, while text is selected
    switch (e.charCode) {
        case 63: // '?' shows the search box
            showSearchBox();
            return;
        case 35: // '#' shows the settings
            showSettings();
            return;
        case 113: // 'q' disables the script
            document.removeEventListener('mouseup', window.LIPClickEvent, false);
            document.removeEventListener('keypress', window.LIPKeyPressEvent, false);
            closeAll();
            return;
        case 33: // '!' -> the last command is executed on subsequent "SELECT"s
            exclamationChar = lastCharCode;
            return;
    }
    
    // 1-9: The first n sites are shown in a 3x3 matrix
    if ((e.charCode>=49) && (e.charCode <=57)) {
        var wish = e.charCode-48;
        var numCols = 2;
        var numRows = 1;
        while (wish>numCols*numRows) {
            if (numCols<=numRows) {
                numCols++
            }
            else {
                numRows++
            }
        }
        var num = Math.min(wish, sites.length+1);
        for (var i=0; i<sites.length; i++){
            if (i>=num) {
                hideResultBox(i);
            }
            else {
                var row = i%numRows;
                var col = numCols - Math.floor(i/numRows) - 1;
                var x = col*100/numCols;
                var y = row*100/numRows;
                var w = (100/numCols);
                var h;
                if (i==(wish-1)) {
                    h = 100/numRows*(numRows-row);
                }
                else {
                    h = 100/numRows;
                }
                lookup(i, null, "width:"+w+"%;height:"+h+"%;top:" + y + "%;left:" + x + "%;padding-left:0px;position:fixed;border:1px solid black;background-color:white;z-index:1000");
            }
        }
        if ((wish>1) && (!$('Esc'))) {
            var esc = document.createElement('div');
            esc.setAttribute('id', 'Esc');
            esc.appendChild(document.createTextNode('Esc'));
            document.body.appendChild(esc);
            esc.setAttribute('style', "width:40px;top:0px;left:0px;position:fixed;border:1px solid black;background-color:red;z-index:1200;text-align:center;display:none;");
        }
        return;
    }

    lastCharCode = e.charCode;
    customKey(lastCharCode);
}
window.LIPBlurEvent  = function (e) {
    var digit = (lastCharCode>=49) && (lastCharCode<=57);
    var esc = $('Esc');
    if (esc) esc.style.display = 'block';
}

// Set Up Selection Event Watch //
document.addEventListener('click', window.LIPClickEvent, false);
document.addEventListener('keypress', window.LIPKeyPressEvent, false);
document.addEventListener('blur', window.LIPBlurEvent, false);

function customKey(charCode) {
    for (var i=0; i<sites.length; i++) {
        hideResultBox(i);
        var cc = sites[i][2];
        if (typeof(cc)=='string') cc = cc.charCodeAt(0);
        if (cc == charCode) {
            lookup(i);
        }
    }
}

// words is optional
// style is optional
function lookup(siteId, words, style) {
    var box = $('ResultBox' + siteId);
    //if (box && (box.style.display != 'none')) return;
    if (!box) box=buildBox(siteId);
    var site = sites[siteId];
    // Set style
    if (!style) {
        for (var i=0; i<styles.length; i++) {
            if (styles[i][0] == site[3]) {
                style = styles[i][1];
                break;
            }
        }
    }
    box.setAttribute('style', style);
    lastSiteIdShown = siteId;
    
    // Get Text //
    //http://developer.mozilla.org/en/docs/DOM:range
    if (words == null) words = window.getSelection();
    if (words == "") {
        closeAll();
        return
    }
    words = String(words);
    words = words.replace(/(^\s+|\s+$)/g, '');

    // Kill HTML //
    words = words.replace(/"/g, "'").replace(/>/g, '&gt').replace(/</g, '&lt');

    var url = site[1];
    var pos = url.indexOf('[words]');
    //url = encodeURI(unescape(url.substr(0,pos))) + escape(words) + encodeURI(unescape(url.substr(pos+7)));
    url = url.substr(0,pos) + escape(words) + url.substr(pos+7);
    //url = url.replace(/#/g, '%23');
    if (box.src != url) box.src = url;
    box.style.display = 'block';
    
    // Reclaim focus, so Esc key still works
    setTimeout("window.focus()",1000)
}