// ==UserScript==
// @name            LookItUp2
// @description     Anthony Select a word, and immidiately see it looked up in your wikipedia, a dictionary or whatever you like (it can be customized!)
// @source          http://userscripts.org/scripts/show/9620
// @identifier      http://userscripts.org/scripts/source/9620.user.js
// @version         0.5.91
// @date            2007-06-02
// @author          Bjorn Rosell
// @namespace       http://www.rosell.dk/
// @include         *
// @exclude         http*://mail.google.com/*
// @exclude         http://*google.com/reader/*
// ==/UserScript==
// update-message   There is a new version of the "LookItUp2" userscript.<br>Fixed false triggers problem<br>Click <a href="http://www.rosell.dk/gm/lookitup2.user.js">here</a> to install it<br>Click <a href="http://userscripts.org/scripts/show/9620">here</a> to go to the script page

/*
Based on "QuickiWiki" by script by Tarmle (http://www.ruinsofmorning.net/greasemonkey/)
Thanks to alien_scum for the brilliant idea to put the cleanup code in url, and for letting me use his xpath code (http://userscripts.org/scripts/show/8370)
*/

// some useful functions
function $(id) {return document.getElementById(id)};
function get(url,cb) {GM_xmlhttpRequest({method:"GET",url:url,onload:function(xhr){cb(xhr.responseText);}})}
function parofe(e,i) {return e.target.getAttribute('id').split('_')[i]}
function idofe(e,i) {return parseInt(parofe(e,i), 10)}
function hide(elm) {if (elm) elm.style.display='none'}
function show(elm) {if (elm) elm.style.display='block'}
function remElm(elm) {if (elm) elm.parentNode.removeChild(elm)}

// ------------------------------------------------------------------------------------
//                              Part 1: Settings 
// ------------------------------------------------------------------------------------
var defaultSites = [
    
    ['VT Catalog','http://www.google.com/#hl=en&q=[words]+site%3Awww.undergradcatalog.registrar.vt.edu%2F0910&aq=f&oq=&aqi=&fp=VEE02fthf5k&btnI=745&xremove=/html/body/table[position()%3C=3]','z', 0, 0],
   ]

// Firefox 3 and greater uses charCode instead of keyCode
var bCharCode = (parseInt(navigator.appVersion) >= 3);

var defaultSettings = {
    sites: defaultSites,
    switchToSiteModeOnShortcut: false,
    switchToSiteModeOnTabClick: false,
    searchBoxKey: {
        ctrl: true,
        alt: false,
        shift: true,
        charCode: (bCharCode?32:0),
        keyCode: (bCharCode?0:32)
    },
    modes: [
        {width:460,side:'right',inline:false,select:false,cacheAhead:1},
        {width:300,side:'right',inline:true,select:true,cacheAhead:0}
    ]
}
var sites;
var settings;
var ext
function loadSettings() {
    var savedSettings = GM_getValue("settings");
    if (typeof savedSettings == "undefined") {
        settings = defaultSettings;
    }
    else {
        eval('settings = ' + savedSettings);
    }
    sites = settings.sites;
    if (settings.modes == null) {
        settings.modes = defaultSettings.modes;
        // be kind...
        if (settings.width) settings.modes[0].width = settings.width;
        if (settings.cacheAhead) settings.modes[0].cacheAhead = settings.cacheAhead;
    }
	var sbk = settings.searchBoxKey;
    if (sbk == null) {
        settings.searchBoxKey = defaultSettings.searchBoxKey;
    }
	
	if ((sbk.charCode == defaultSettings.keyCode) && (sbk.keyCode == defaultSettings.charCode)) {
		sbk.charCode = defaultSettings.charCode;
		sbk.keyCode = defaultSettings.keyCode;
	}
}

/*function buildAdd() {
    div = document.createElement("div");
    div.setAttribute("id", "LIU_addsites");
    div.setAttribute("style", "display:block;z-index:1003;position:fixed;overflow:auto;right:2px;width:230px;top:30px;bottom:20px;background-color:white;padding:15px;border:1px solid black");
    document.body.appendChild(div);
    get('http://rosell.dk/gm/lookitupurls2.php', function(rs) {
        var s="<b><big>Add sites</big></b><br>";
        s+="<button id='LIU_merge'>Merge into sites</button>"
        var a=rs.split('\n');
        ext = [];
        
        for (var i=0;i<a.length;i++) {
            var item=a[i];
            if ((item.charAt(0)=='[') && (item.charAt(item.length-1)==']')) {
                s+="<br><b>" + item.substr(1, item.length-2) + "</b><br>";
            }
            else {
                var a2=item.split(' » ');
                if (a2 && a2.length >= 4) {
                    s+="<div style='width:150px;float:left;height:20px;clear:right;overflow:hidden;'>" + a2[1] + "</div><button id='LIU_load_" + ext.length + "'>Add</button><br>";
                    ext.push([a2[1],a2[2],a2[0],0,a2[3]])
                }
            }
        }
        $('LIU_addsites').innerHTML = s;
        for (var i=0; i<ext.length; i++) {
            $('LIU_load_' + i).addEventListener('click', function(e) {storeSettings();sites.push(ext[idofe(e,2)]);showSettings()}, false);
        }
//        $('LIU_merge').addEventListener('click', function(e) {alert('hi'+ext)}, false);
        $('LIU_merge').addEventListener('click', function(e) {for(var i=0;i<ext.length;i++){var site=ext[i]; var found=false; for(var j=0;j<sites.length;j++) {if (sites[j][0]==site[0]){sites[j][1]=site[1];sites[j][4]=site[4];found=true}}};showSettings()}, false);        
        return;
    });
}*/

function $$(id) {return $('LIU_settings').contentDocument.getElementById(id)};


function showSettings() {
    hideBox();
    mode=0;
    if (!$('LIU_addsites')) buildAdd();
    if (settings == defaultSettings) {
        eval('settings = ' + uneval(defaultSettings));
        sites=settings.sites;
    }
    var iframe = $('LIU_settings');
    if (!iframe) {
        iframe = document.createElement("iframe");
        iframe.setAttribute("id", "LIU_settings");
        iframe.setAttribute("style", "display:block;z-index:1002;position:fixed;overflow:auto;top:30px;background-color:white;left:20px;border:1px solid black;height:100%;width:100%");
        iframe.addEventListener('load', showSettings2, false);
        document.body.appendChild(iframe);
        if (!$('LIU_settings')) {
            alert("Settings could not be shown. It probably due to a greasemonkey bug. Highlight some text and press '#' to see the settings");
            return
        }
		else {
			$('LIU_settings').style.width = ($('LIU_settings').offsetWidth - 300).toString() + 'px';
			$('LIU_settings').style.height = ($('LIU_settings').offsetHeight - 55).toString() + 'px';
		}
    }
    else {
        show($('LIU_settings'));
        showSettings2();
    }
    show($('LIU_addsites'));
}
function showSettings2() {    
    var s='';
    s+="<html><body><style>*{font-family:sans-serif;font-size:12px!important} h3{background-color:#333;color:white;padding:2px;padding-left:10px} td{padding-right:7px}</style>";
    s+="<table cellspacing='0' cellpadding='0' width='100%'><tr><td valign='top' style='padding-right:40px'>";
    s+="<h3>General settings</h3>";
    s+="<table cellspacing='0' cellpadding='2'>";
//    s+='<tr><td>Search box shortcut</td><td><input id="LIU_searchBoxKey" value="' + settings.searchBoxKey + '" size="15" disabled/> <button id="LIU_sbk">Change</button></td></tr>';
    s+="<tr><td>Switch to site mode, when key shortcut</td><td><input id='LIU_switchmode1' type='checkbox'" + (settings.switchToSiteModeOnShortcut ? " checked" : "") + "/></td></tr>";
    s+="<tr><td>Switch to site mode, when tab is clicked</td><td><input id='LIU_switchmode2' type='checkbox'" + (settings.switchToSiteModeOnTabClick ? " checked" : "") + "/></td></tr>";
    s+="</table></td><td valign='top'>";
    s+="<h3>Modes</h3>";
    s+="<table cellspacing='0' cellpadding='2'><tr style='font-weight:bold;'><td>Mode</td><td>Width</td><td>Side</td><td>Inline</td><td>Select</td><td>Cache-ahead</td></tr>";
    var a = settings.modes;
    for (var i=0;i<a.length;i++) {
        var m=a[i];
        s+="<tr>";
        s+="<td>" + i + "</td>";
        s+="<td><input id='LIU_" + i + "_width' type='text' style='width:50px' value='" + m.width + "'/> px</td>";        
        s+='<td><select id="LIU_'+ i + '_side"><option>left</option><option' + (m.side=='right'?' selected':'') + '>right</option></select></td>'
        s+="<td><input id='LIU_" + i + "_inline' type='checkbox'" + (m.inline ? " checked" : "") + "/></td>";
        s+="<td><input id='LIU_" + i + "_select' type='checkbox'" + (m.select ? " checked" : "") + "/></td>";
        s+="<td><input id='LIU_" + i + "_cache' type='text' style='width:20px' value='" + m.cacheAhead + "'/> sites</td>";
        if (a.length > 1) s+="<td><button id='LIU_removemode_" + i + "' style='width:60px'>Delete</button></td>";
        s+="</tr>";
    }
    s+="<tr><td colspan=4><button id='LIU_addmode'>New mode</button></td></tr>";
    s+="</table>";
    s+="</td></tr></table>";
    s+="<h3>Sites</h3>";
    s+="<table cellspacing='0' cellpadding='0' width='100%'><tr style='font-weight:bold;'><td>Name</td><td>Url</td><td>Encoding</td><td>Key</td><td>Mode</td></tr>";
    var a = sites;
    for (var i=0;i<a.length;i++) {
        var site=a[i];
        s+="<tr>";
        s+="<td width='140'><input id='LIU_" + i + "_0' type='text' style='width:140px' value='" + site[0] + "'/></td>";
        s+="<td width='100%'><input id='LIU_" + i + "_1' type='text' style='width:100%' value=''/></td>";
        s+="<td><select id='LIU_" + i + "_4' style='width:48px'>";
        s+='<option>UTF-8 (encodeUri)</option>'
        s+='<option' + (site[4]==1 ?' selected':'') + ' >ISO-8859-1 (escape)</option>'
        s+='<option' + (site[4]==2 ?' selected':'') + ' >Both</option>'
        s+='</select></td>'
        s+="<td width='30'><input id='LIU_" + i + "_2' type='text' style='width:30px' value='" + site[2] + "'/></td>";
        s+="<td width='30'><input id='LIU_" + i + "_3' type='text' style='width:30px' value='" + (site[3]||0) + "'/></td>";
        s+="<td width='80'><button id='LIU_up_" + i + "' style='width:70px'>Move up</button></td>";
        s+="<td width='60'><button id='LIU_remove_" + i + "' style='width:60px'>Delete</button></td>";
        s+="</tr>";
    }
    s+="<tr><td colspan=4><button id='LIU_add'>New site</button></td></tr>";
    s+="</table>";
    s+="<br><button id='LIU_save'>Save</button>";
    s+="<button id='LIU_cancel'>Cancel</button>";
    s+="&nbsp;&nbsp;&nbsp;&nbsp;<button id='LIU_defaults'>Revert to defaults</button>";
    s+="</body></html>";
    //div.innerHTML = s;

    $('LIU_settings').contentDocument.body.innerHTML = s;
    $$('LIU_addmode').addEventListener('click', act, false);
    for (var i=0;i<a.length;i++) {
        $$('LIU_'+ i + '_1').value=sites[i][1];
        $$('LIU_up_'+ i).addEventListener('click', act, false);
        $$('LIU_remove_'+ i).addEventListener('click', act, false);
    }
    var a = settings.modes;
    if (a.length > 1) {
        for (var i=0;i<a.length;i++) {
            $$('LIU_removemode_'+ i).addEventListener('click', act, false);
        }
    }
    $$('LIU_add').addEventListener('click', act, false);
    $$('LIU_save').addEventListener('click', act, false);
    $$('LIU_cancel').addEventListener('click', act, false);
    $$('LIU_defaults').addEventListener('click', act, false);
}

function act(e) {
    var action = parofe(e,1);
    storeSettings();
    switch (action) {
        case 'up':
            var id=idofe(e,2);
            var temp=sites[id];
            sites[id]=sites[id-1];
            sites[id-1]=temp;
            break;
        case 'remove':
            sites.splice(idofe(e,2), 1);
            break;
        case 'removemode':
            settings.modes.splice(idofe(e,2), 1);
            break;
        case 'add':
            sites.push(['','','', 0, 0]);
            break;
        case 'addmode':
            settings.modes.push({width:400,side:'right',cacheAhead:0});
            break;
        case 'save':
            GM_setValue("settings", uneval(settings));
            // rebuild box, so new width can take effect (TODO: is this still neccessary?)
            remElm(box);buildBox();hideBox()
            // empty the cache
            siteLocations = {}
            break;
        case 'cancel':
            loadSettings();
            break;
        case 'defaults':
            settings=defaultSettings;
            break;
    }
    if ((action == 'cancel') || (action=='save')) {
        closeSettings();
    }
    else {
        showSettings();
    }
}

function storeSettings() {
    //settings.stickToMode = ($$('LIU_stickToMode').checked);
    settings.switchToSiteModeOnShortcut = ($$('LIU_switchmode1').checked);
    settings.switchToSiteModeOnTabClick = ($$('LIU_switchmode2').checked);
    //settings.encoding = $$('LIU_encoding').selectedIndex;
    var a = settings.modes;
    for (var i=0;i<a.length;i++) {
        a[i].width = parseInt($$('LIU_'+i+'_width').value);
        a[i].side = $$('LIU_'+i+'_side').options[$$('LIU_'+i+'_side').selectedIndex].value
        a[i].inline = ($$('LIU_'+i+'_inline').checked);
        a[i].select = ($$('LIU_'+i+'_select').checked);
        a[i].cacheAhead = parseInt($$('LIU_'+i+'_cache').value);
    }
    for (var i=0;i<sites.length;i++) {
        var site=sites[i];
        for (var j=0;j<4;j++) {
            var elm = $$('LIU_'+i+'_'+j);
            if (elm) sites[i][j] = elm.value;
        }
        sites[i][4] = $$('LIU_'+i+'_4').selectedIndex;
        var key=sites[i][2];
        if (key == 'q') alert('Warning: "q" key is used for disabling the script')
        if (key == '#') alert('Warning: "#" key is used for displaying settings')
        if (key == '?') alert('Warning: "?" key is used for opening search box')
    }
}
function closeSettings() {
    hide($('LIU_settings'));
    hide($('LIU_addsites'));
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

// only perform cleanup, in frames, and if "lookitup" is in the url (to avoid that the script messes with stuff it shouldn't be messing with)
if ((self!=top) && (pos3>0)) {
//if (pos3>0) {
    var sep = lh.charAt(pos3+8);
    var a = lh.substr(pos3+9).split(sep);

    for (var i=0; i<a.length; i++) {
        var pos = a[i].indexOf("=");
        if (pos<0) continue;
        var name = a[i].substr(0, pos);
        var value = a[i].substr(pos+1);
        switch(name) {
            case 'redir':
                document.addEventListener('click', function(e) {
                    var elm = e.target;
                    if (elm.hasAttribute('href')) {
                        var b = value.split('|');
                        var reLinkTitle = new RegExp(b[0], "gi")
                        var reUrlTitle = new RegExp(b[1], "gi")
                        var a=reLinkTitle.exec(elm.getAttribute('href'));
                        if (a) {
                            var linkTitle = a[1];
                            var a = reUrlTitle.exec(unescape(location.href));
                            elm.setAttribute('href', a[1]+linkTitle+a[3]);
                        }
                    }
                }, false)
                break;
            case 'changetarget':
                document.addEventListener('click', function(e) {
					var elm = e.target;
					elm.setAttribute("target", value)
				}, false)
                break;
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
//                              Part 3: The actual LookItUp code
// ------------------------------------------------------------------------------------


d = document;
var exclamationChar;
var box;
var dragObj = {};
var lastSiteId;
var siteLocations = {};
var spliceLocations = {};
var mode = 0;


function getSelectedText() {
    var words = window.getSelection();
    words = String(words).replace(/(^\s+|\s+$)/g, '');
    return words.replace(/"/g, "'").replace(/>/g, '&gt').replace(/</g, '&lt');
}

function scrollSelectionIntoView() {
    var r = window.getSelection().getRangeAt(0).cloneRange();
    var y=0
    var elm=r.startContainer.parentNode;
    if (!elm) return
    while (elm!=document.body) {
        y+=elm.offsetTop;        
        elm = elm.offsetParent;
    }
    window.scrollTo(0,y-100);
}

function getSiteIdFromCharCode(charCode) {
    for (var i=0; i<sites.length; i++) {
        var cc = sites[i][2];
        if (typeof(cc)=='string') cc = cc.charCodeAt(0);
        if (cc == charCode) {
            return i
        }
    }
}

function hideBox() {
    hide(box);
    removeMode();
    if (settings.modes[mode].inline) scrollSelectionIntoView();
}

function removeMode() {
    var m = settings.modes[mode];
    if (m.inline) {
        //document.body.style.position = 'relative'
        //document.body.style[m.side] = '0px'
        document.body.style['padding' + m.side.charAt(0).toUpperCase()+m.side.substr(1)] = '0px'
    }    
}

function applyMode() {
    var m = settings.modes[mode];
    if (m.inline) {
        //document.body.style.position = 'absolute'
        //document.body.style[m.side] = m.width + 'px'
        document.body.style['padding' + m.side.charAt(0).toUpperCase()+m.side.substr(1)] = m.width + 'px'
    }
    var oppSite = (m.side=='left' ? 'right' : 'left');
    box.setAttribute('style', 'width:'+(m.width)+'px;height:100%;top:0px;' + m.side + ':0px;padding-' + oppSite + ':0px;position:fixed;border:0px solid black;border-' + oppSite + ':1px solid black;background-color:white;z-index:1000');
}

function changeMode(m) {
    removeMode();
    mode = m;
    applyMode();
    if ($('LIU_mode')) $('LIU_mode').innerHTML = mode
}

function buildBox() {
    box = document.createElement('div');
    applyMode();

    var search = document.createElement('div');
    var h = 21;
    search.setAttribute('style', 'top:1px;width:100%;height:' + (h+21) + 'px;position:absolute;border:0px');    
    box.appendChild(search);

    var s='<form onsubmit="return false">';
    s+='<div style="position:absolute;left:2px;right:0px;">';
    s+='<input id="LIU_txt" style="position:absolute;left:0px;right:240px;font-size:' + (h-7) + 'px!important;height:' + (document.doctype==null ? h-2 : h-4) + 'px!important;line-height:50px;display:block;font-face:Arial;border:1px solid black;padding:0;margin:0"/>'
    s+='<select id="LIU_sel" style="position:absolute;width:100px;right:138px;font-size:' + (h-7) + 'px!important;height:' + (h - 4) + 'px;border:1px solid black;padding:0;margin:0">'
    for (var i=0;i<sites.length;i++) {
        var site=sites[i];
        s += '<option style="width:30%;height:'+ (h-2) + 'px;border:0">' + site[0] + '</option>';
    }
    s+='</select>';
    s+='<input type="submit" id="LIU_search" style="position:absolute;width:68px;padding:0;right:68px;font-size:' + (h-7) + 'px!important;height:' + (h-2) + 'px;border:1px solid black" value="Search"/>';
    s+='<button id="LIU_prev" style="position:absolute;width:20px;padding:0;right:46px;height:' + (h-2) + 'px;border:1px solid black">&lt;</button>';    
    s+='<button id="LIU_next" style="position:absolute;width:20px;padding:0;right:24px;height:' + (h-2) + 'px;border:1px solid black;">&gt;</button>';
    s+='<button id="LIU_mode" style="position:absolute;width:20px;padding:0;right:2px;height:' + (h-2) + 'px;border:1px solid black">'+mode+'</button>';    
    s+='</div>';
    s+='<div style="position:absolute;left:0px;right:0px;top:40px;width:100%;height:1px;background-color:black;"></div>'
    s+='<div style="position:absolute;left:2px;right:0px;top:22px;">';
    for (var i=0;i<sites.length;i++) {
        var site=sites[i];
        s+='<button id="LIU_'+i+'" style="width:20px;padding:0;margin-right:2px;height:' + (h-2) + 'px;border:1px solid black;background-color:white;">' + site[2] + '</button>';
    }
    s+='</div>';
    s+='</form>'
    search.innerHTML = s;
    document.body.appendChild(box);
    
    $('LIU_search').addEventListener('click', function(e) {var sel=$('LIU_sel');liuTxt(sel.selectedIndex, true)}, false);
    $('LIU_next').addEventListener('click', function(e) {var sel=$('LIU_sel');liuTxt((sel.selectedIndex + 1) % sel.options.length)}, false);
    $('LIU_prev').addEventListener('click', function(e) {var sel=$('LIU_sel');liuTxt((sel.selectedIndex - 1 + sites.length) % sel.options.length)}, false);
        
    $('LIU_mode').addEventListener('click', function(e) {changeMode((mode+1)%(settings.modes.length));scrollSelectionIntoView()}, false);
    for (var i=0;i<sites.length;i++) {
        $('LIU_' + i).addEventListener('click', function(e) {liuTxt(idofe(e,1))}, false);        
    }
    $('LIU_sel').addEventListener('change', function(e) {var sel=$('LIU_sel');liuTxt(sel.selectedIndex, true)}, false);
    
    
    // Releasing mousebutton over box should not close it //
    window.LIUIsMouseOverBox = false;
    box.addEventListener('mouseover', function(e){window.LIUIsMouseOverBox = true;}, false);
    box.addEventListener('mouseout', function(e){window.LIUIsMouseOverBox = false;}, false);
    return box;
}

window.LIUClickEvent  = function (e) {
    if ($('LIU_settings') && $('LIU_settings').style.display=='block') return
    if (window.LIUIsMouseOverBox) return;    
    if (e.target.toString().indexOf('HTMLButton') > 0) return;
    if (e.target.toString().indexOf('HTMLInput') > 0) return;
    if (settings.modes[mode].select) {
        if (window.getSelection() == '') return;
        if (!box) return
        if (box.style.display == 'none') return;
        liuSel();
    }
    else {
        hideBox();
    }
}

// http://www.quirksmode.org/js/keys.html
window.LIUKeyPressEvent  = function (e) {
    // esc key hides the box
    if (e.keyCode==27) {
        hideBox();
        closeSettings();
        return
    }
    
    var sbk = settings.searchBoxKey;
	
    if ((e.shiftKey == sbk.shift) && (e.ctrlKey == sbk.ctrl) && (e.altKey == sbk.alt) && (e.keyCode==sbk.keyCode) && (e.charCode==sbk.charCode)) {
        liuSel();
    }
    if (window.getSelection() == '') return;
    if (e.ctrlKey) return;
    if (e.altKey) return;

    // user pressed a key, while text is selected
    switch (e.charCode) {
        case 63: // '?' shows the search box
            liuSel();
            return;
        case 35: // '#' shows the settings
            showSettings();
            return;
        case 113: // 'q' disables the script
            document.removeEventListener('mouseup', window.LIUClickEvent, false);
            document.removeEventListener('keypress', window.LIUKeyPressEvent, false);
            hideBox();
            return;
    }
    var siteId = getSiteIdFromCharCode(e.charCode);
    if (siteId != null) liuSel(siteId);
}

document.addEventListener('click', window.LIUClickEvent, false);
document.addEventListener('keypress', window.LIUKeyPressEvent, false);

function joinLoaded(siteId) {
    // TODO: check if its already loaded
    var url = sites[siteId][1];
    var words = siteLocations[siteId];
    if (spliceLocations[siteId] == words) return;
    spliceLocations[siteId];
    var iframe = $('LIU_iframe_'+siteId);
    var s='<style>iframe{position:fixed;padding:0;margin:0;border:0;left:0;width:100%}</style>'
    var codes = url.substr(5);
    var h=100/codes.length;
    for (var i=0; i<codes.length; i++) {
        var sid = getSiteIdFromCharCode(codes.charAt(i).charCodeAt(0));
        s+="<iframe style='top:" + (h*i) + "%;height:" + h + "%' src='" + sites[sid][1].split('[words]').join(encodeWords(words,sites[sid][4])) +"'></iframe>";
    }
    iframe.contentDocument.body.innerHTML = s;
    frameLoaded(siteId)
}

function frameLoaded(siteId) {
    if ((siteId+1)%sites.length == lastSiteId) return
    var dif = (sites.length + siteId - lastSiteId) % sites.length
    if (dif<settings.modes[mode].cacheAhead) {
        gourl((siteId+1) % sites.length, $('LIU_txt').value)
    }
}

function encodeWords(s,m) {
    switch (m) {
        case 0:
            return encodeURI(s);
        case 1:
            return escape(s);
        case 2:
            return escape(encodeURI(s));
    }
    return escape(s);
}

function gourl(siteId, words, forceReload) {
    if (forceReload) {
        siteLocations[siteId] = '';
        remElm($('LIU_iframe_'+siteId));
    }
    var url = sites[siteId][1];
    var bJoin = (url.indexOf('join:') == 0);
    // get iframe, or create
    var iframe = $('LIU_iframe_'+siteId);
    if (!iframe) {    
        iframe = document.createElement('iframe');
        iframe.setAttribute('id', 'LIU_iframe_'+siteId);
        if (!bJoin) {
            iframe.addEventListener('load', function(e) {frameLoaded(siteId);}, false);
        }
        else {
            iframe.addEventListener('load', function(e) {joinLoaded(siteId);}, false);
        }
        iframe.setAttribute('style', 'top:42px;left:0px;right:0px;bottom:0px;position:absolute;border:0px;z-index:'+siteId+';background-color:white;width:100%;height:100%');
        box.appendChild(iframe);
    }

    if (siteLocations[siteId] != words) {
        // go to the url
        url = url.split('[words]').join(encodeWords(words, sites[siteId][4]));
        siteLocations[siteId] = words;
        if (url.indexOf('join:') != 0) {
            iframe.src = url;
        }
        else {
            iframe.src = 'about:blank';
            //frameLoaded(siteId)
        }
        //GM_log("Loading:" + sites[siteId][0] + ":" + words);
    }
    else {
        frameLoaded(siteId)
    }
}

function liu(siteId, words, forceReload, forceMode) {
    lastSiteId = siteId;
    if (!box) box = buildBox();

    // update toolbar
    $('LIU_txt').value = words;
    $('LIU_sel').selectedIndex = siteId;
    for (var i=0;i<sites.length;i++) {
        $('LIU_' + i).style.borderBottom = '1px solid black';
        $('LIU_' + i).style.backgroundColor = '#ddd';
    }
    show(box);
    applyMode();
    if (siteId == null) return;

    if (forceMode) {
        changeMode(parseInt(sites[siteId][3]||0),10);
    }

    $('LIU_' + siteId).style.borderBottom = '1px solid white';
    $('LIU_' + siteId).style.backgroundColor = 'white';

    gourl(siteId, words, forceReload);
    for (var i=0; i<sites.length; i++) {
        if ($('LIU_iframe_'+i)) $('LIU_iframe_'+i).style.zIndex = i
    }
    $('LIU_iframe_'+siteId).style.zIndex = sites.length;

    // Reclaim focus, so Esc key still works
    //window.focus();
    setTimeout("window.focus()",1000)
}

function liuTxt(siteId, forceReload) {
    liu(siteId, $('LIU_txt').value, forceReload, settings.switchToSiteModeOnTabClick)
}
function liuSel(siteId, forceReload) {
    var visible = (box && (box.style.display != 'none'))
    if (isNaN(siteId)) siteId = lastSiteId;
    if (isNaN(siteId)) siteId = 0;
    liu(siteId, getSelectedText(), forceReload, settings.switchToSiteModeOnShortcut);
    if (!visible && settings.modes[mode].inline) scrollSelectionIntoView()
}

