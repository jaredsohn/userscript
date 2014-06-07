// ==UserScript==
// @name           WoTMUD Forum Utilities
// @description    Allows you to quickly switch characters on the wotmud forums amongst other things
// @include        http://wotmud.org/forums/*
// @include        http://www.wotmud.org/forums/*
// @match          http://wotmud.org/forums/*
// @match          http://www.wotmud.org/forums/*
// @version        0.1
// ==/UserScript==

var version = "0.1";

try {
    console.log('Console exists.');
} catch(e) {
    console = {}
    console.log = function() {};
}

var GM_getSet = false;
try {
    if (typeof GM_getValue === 'function' && typeof GM_setValue === 'function') {
        GM_setValue('testkey', 'testvalue');
        GM_getSet = GM_getValue('testkey', false) === 'testvalue';
    }
} catch(x) {}

var id = "wmfu";
var prefs = {
    'characters': get_characters()
};

add_css(
    '.wmfu-popup { background:#f6f6f6; border:3px double #666666; -moz-border-radius:5px; -webkit-border-radius:5px; -khtml-border-radius:5px; border-radius:5px; }'+
    '.wmfu-popup-container { display:none; top:0; right:0; bottom:0; left:0;}'+
    '#wmfu-config { background:#ddd; width:700px; padding:10px; margin:20px auto 0; }'+
    '#wmfu-config label, #wmfu-config .wmfu-label { color:#666666; font-weight:normal; } '+
    '#wmfu-config .wmfu-header { font-weight:bold; }'+
    '#wmfu-shadow { display:none; position:fixed; top:0; left:0; right:0; bottom:0; background:black; opacity:0.8; }'+
    '#wmfu-update-popup { max-width:450px; margin:100px auto; padding:10px;background:#ddd; }'+
    '.wmfu-important { font-weight:bold; }'+
    '.wmfu-note { color:#777777; }'+
    '.wmfu-right { text-align:right; }'+
    "#wmfu-config div { padding: 10px;}"+
    "#wmfu-config div.wmfu-config-section { border-top: 1px solid #aaa;}"+
    "div.wmfu-left { float: left;padding: 0px !important;width: 40%}"+
    "div.wmfu-right { display: block;float: right;border-left: 1px solid #aaa;padding: 0px !important;padding-left: 10px !important;width: 50%}"+
    "#wmfu-config h2 { margin-bottom: 10px;}"+
    "#wmfu-config-footer { text-align: right;padding: 10px 0 0 !important;}"+
    "#wmfu-config-header h1 { line-height: 0px;}"+
    "#wmfu-config-header h1 span { font-size: 11px;font-weight: normal;float: right;line-height: 0px;}"+
    "#wmfu-config-header {}"+
    "#wmfu-config-characters ul { font-size: 12px;}"+
    "#wmfu-config-character-pane { display:none; }"+
    "#wmfu-config-general .wmfu-config-option { padding: 0 !important;padding-bottom: 5px !important;}"+
    "#wmfu-config-general .wmfu-config-option label { float:left;width: 40%;}"+
    "br.wmfu-clear { clear: both;}"+
    "#wmfu-config button { background-color: #FAFAFA;border: 1px solid #B6B6B6;color: #333;font-family: 'Lucida Grande', Verdana, Helvetica, sans-serif;font-size: 1.1em;font-weight: normal;padding: 1px;}"+
    "a.wmfu-config-edit-char.wmfu-active{font-weight:bold;}"
);

//add necessary divs for popups
var popup_div = document.createElement('div');
popup_div.id = 'wmfu-popup-container';
popup_div.className = 'wmfu-popup-container';
document.body.appendChild(popup_div);

var shadow_div = document.createElement('div');
shadow_div.id = 'wmfu-shadow';
document.body.appendChild(shadow_div);

var logout_href = get_logout_href();

add_ui_elements();

/*
Main Functions
*/

function add_ui_elements() {
    //if you are currently logged in, that one is not added
    if(logout_href) {
        //set the root to the logout link
        var root = $x1('//a[starts-with(@href, "./ucp.php?mode=logout")]');
    } else {
        //set the root to the login link
        var root = $x1('//a[starts-with(@href, "./ucp.php?mode=login")]');
    }
    
    //console.log(root);
    var qsw = document.createElement('select');
    qsw.id = 'wmfu-qsw';
    //qsw.onchange = switch_chars;
    
    var logged_in = !!logout_href;
    
    if(!logged_in) {
        var opt = document.createElement('option');
        opt.innerHTML = '-- Login';
        opt.disabled = 'disabled';
        opt.selected = 'selected';
        qsw.appendChild(opt);
    }
        
    for(var c in prefs['characters']) {
        console.log('Building option for ' + c);
        ch = prefs['characters'][c];
        console.log('Adding link for ' + ch['name']);
        var opt = document.createElement('option');
        opt.innerHTML = ch['name'];
        opt.value = c;
        
        if(c == get_current_user()) {
            console.log('Already logged in as ' + ch['name']);
            opt.disabled = 'disabled';
            opt.selected = 'selected';
        }
        
        //anchor.onclick = (function(c) { return function() { do_login(c['name']); return false; }})(ch);
        qsw.appendChild(opt);
    }
    
    if(logged_in) {
        var opt = document.createElement('option');
        opt.innerHTML = '-- Logout';
        qsw.appendChild(opt);
    }
    
    var opt = document.createElement('option');
    opt.innerHTML = '-- Config';
    qsw.appendChild(opt);
    
    var lbl = document.createElement('label');
    lbl.innerHTML = '<img src="./styles/wotmud/theme/images/icon_mini_login.gif" width="12" height="13" alt="*" /> Switch: ';
    lbl.appendChild(qsw);
    
    /*var tr = document.createElement('tr');
    var td = document.createElement('td');
    td.className = 'genmed';
    td.appendChild(lbl).appendChild(qsw);
    qsw_td = td;
    
    var config_td = document.createElement('td');
    config_td.className = 'genmed';
    config_td.align = 'right';
    
    var config_link = document.createElement('a');
    config_link.innerHTML = 'Configure WoTMUD Forum Utilities';
    config_link.href = '#';
    config_link.onclick = function() { show_config(); return false; };
    
    config_td.appendChild(config_link);
    
    tr.appendChild(td);
    tr.appendChild(config_td);*/
        
    //root.parentNode.parentNode.parentNode.appendChild(tr);
    root.parentNode.replaceChild(lbl, root);
    
    bind('wmfu-qsw', 'change', switch_chars);
    
}

function switch_chars(evt) {
    var e = evt.target;
    var ch = e.options[e.selectedIndex].value;
    
    console.log('Selected option: "' + ch + '"');
    if(ch=='-- Config') return show_config();
    if(ch=='-- Logout') {
        window.location = logout_href;
        return;
    }

    do_login(ch);
}

function get_logout_href() {
    var link = $x1('//a[starts-with(@href, "./ucp.php?mode=logout")]');
    if(link) return link.href;
    return null;
}

function get_current_user() {
    //returns the current logged in user
    var f = document.evaluate('//a[starts-with(@href, "./ucp.php?mode=logout")]', document, null, 9, null).singleNodeValue;
    
    if(f==null) {
        //console.log('Not currently logged in.');
        return f;
    }
    
    var ch = f.text.substring(' Logout ['.length, f.text.length-1).trim().toLowerCase();
    console.log('Logged in as: "' + ch + '"');
        
    return ch;
}

function is_logged_in() {
    console.log('Checking if user is logged in.');
    //searches for the login link. if it exists, returns false, otherwise returns true
    var login_link = document.evaluate('//a[@href="./ucp.php?mode=login"]', document, null, 9, null).singleNodeValue;
    console.log(login_link);
    console.log(!login_link);
    return !login_link;
}

function do_login(name) {
    console.log('Logging in as ' + name);
    var ch = prefs['characters'][name];
    
    if(logout_href) {
        do_logout(function() { __login(ch); });
    } else {
        __login(ch);
    }
    
    return false;
    
}

function __login(ch) {
    //performs an actual login
    show_popup('<div id="wmfu-update-popup" class="wmfu-popup">Logging in...</div>');
    var params = 'username='+escape(ch.name)+"&password="+escape(ch.password)+"&login=Login";
    GM_xmlhttpRequest({
        method: "POST",
        url: "http://"+window.location.hostname+"/forums/ucp.php?mode=login",
        data: params,
        headers: {
            "Content-type": "application/x-www-form-urlencoded"
        },
        onload: function(response) {
            //console.log(response);
            location.reload();
        }
    });
}

function do_logout(fn) {
    show_popup('<div id="wmfu-update-popup" class="wmfu-popup">Logging out...</div>');
    GM_xmlhttpRequest({
        method: "GET",
        url: logout_href,
        onload: fn
    });    
}

/*
Config Functions
*/

function setValue(key, value) {
    if (GM_getSet) { GM_setValue(id+'-'+key, value); }
    else if (navigator.cookieEnabled) {
        var d = new Date();
        d.setTime(new Date().getTime()+31536000000);
        document.cookie = 'wmfu-' + id + '-' + key + "=" + escape(value) + ";expires=" + d.toGMTString() + ';domain=.wotmud.org';
    }
    prefs[key] = value;
}

function getValue(key, value) {
    if (GM_getSet) { console.log('Getting ' + id+'-'+key);return GM_getValue(id+'-'+key, value); }
    else if (navigator.cookieEnabled && document.cookie.length>0) {
        var c_name = 'wmfu-' + id + '-' + key;
        var c_start=document.cookie.indexOf(c_name + "=");
        if (c_start!=-1) {
            c_start=c_start + c_name.length+1;
            c_end=document.cookie.indexOf(";",c_start);
            if (c_end==-1) c_end=document.cookie.length;
            var val = unescape(document.cookie.substring(c_start,c_end));
            if (val=='true') { return true; }
            else if (val=='false') { return false; }
            else if (val) { return val; }
        }
    }
    return value;
}

function get_characters() {
    //returns a hash of character data
    console.log('Getting characters.');
    console.log('Raw: ' + getValue('characters', null));
    return JSON.parse(getValue('characters', null)) || {};
}

function save_characters(o) {
    o = o || prefs['characters'];
    setValue('characters', JSON.stringify(o));
    prefs['characters'] = o;
}

function show_config() {
    //pops up the config page
    var editing_char = false;
    
    function make_char_links() {
        //makes character links for the config page
        var chars = get_characters();
        console.log('Making char links.');
        console.log(chars);
        var links = [];
        for(var id in chars) {
            var ch = chars[id];
            links.push("<li><a class='wmfu-config-edit-char' id='wmfu-config-edit-char-"+id+"' href='#'>"+ch['name']+'</a></li>');
        }
        return links.join("\n");
    }
    
    show_popup(
        "<div id='wmfu-config' class='wmfu-popup'>"+
        "    <div id='wmfu-config-header'>"+
        "        <h1>"+
        "            <span class='wmfu-version'>v0.1 <a href='#'>[homepage]</a></span>"+
        "            WMFU Configuration"+
        "        </h1>"+
        "    </div>"+
        "    <br class='wmfu-clear'/>"+
        "    <div id='wmfu-config-characters' class='wmfuConfig-section'>"+
        "        <h2>Characters</h2>"+
        "        <div class='wmfu-left'>"+
        "            <ul>"+
                        make_char_links()+
        "            </ul><br/>"+
        "            <a id='wmfu-config-add-char' href='#'>Add new character</a>"+
        "        </div>"+
        "        <div class='wmfu-right' id='wmfu-config-character-pane'>"+
        "            Name: <input type='text' id='wmfu-config-character-name' style='width:65%;float:right;' value='' /><br/><br/>"+
        "            Password: <input id='wmfu-config-character-passwd' style='width:65%;float:right;'/><br/><br/>"+
        "            <div style='float:right;padding:0 !important'>"+
        "                <button id='wmfu-config-save-char'>Save</button>"+
        "                <button id='wmfu-config-delete-char'>Delete</button>"+
        "                <button id='wmfu-config-cancel-char'>Cancel</button>"+
        "            </div>"+
        "        </div>"+
        "        <br class='wmfu-clear'/>"+
        "    </div>"+
        /*"    <div id='wmfu-config-general' class='wmfuConfig-section'>"+
        "        <h2>General</h2>"+
        "        <div class='wmfu-config-option'>"+
        "            <label for='hide_avatars'>Hide avatars:</label> <input type='checkbox' name='hide_avatars' id='hide_avatars'/>"+
        "        </div>"+
        "    </div>"+*/
        "    <div id='wmfu-config-footer' class='wmfu-config-section'>"+
        "        <button id='wmfu-config-save'>Save and Close</button>"+
        "        <button id='wmfu-config-cancel'>Cancel</button>"+
        "    </div>"+
        "</div>"
    );
    
    function toggle_char_pane(vis) {
        $('wmfu-config-character-pane').style.display = vis ? 'block' : 'none';
    }
    
    
    bind('wmfu-config-cancel','click',function() {
        hide_popup();
    });

    bind('wmfu-config-save','click',function() {
        hide_popup();
        location.reload();
    });
    
    bind('wmfu-config-add-char','click',function() {
        toggle_char_pane(true);
        return false;
    });
    
    var char_links = $c('wmfu-config-edit-char');
    if(char_links.length) {
        for(var i = 0; i < char_links.length; i++) {
            var l = char_links[i];
            bind(l.id,'click',function(evt) {
                var e = evt.target;
                var id = e.id.substring('wmfu-config-edit-char-'.length);
                console.log('Link for ' + id + ' clicked.');
                editing_char = id;
                var ch = prefs['characters'][id];
                $('wmfu-config-character-name').value = ch['name'];
                $('wmfu-config-character-passwd').value = ch['password'];
                toggle_char_pane(true);
                return false;
            });
        }
    }
    
    bind('wmfu-config-cancel-char','click',function() {
        editing_char = false;
        $('wmfu-config-character-name').value = "";
        $('wmfu-config-character-passwd').value = "";
        toggle_char_pane(false);
        return false;
    });
    
    bind('wmfu-config-save-char','click',function() {
        //if they click save, we need to either save a new one or save over the existing one
        var name = $('wmfu-config-character-name').value;
        var passwd = $('wmfu-config-character-passwd').value;
        
        if(editing_char === false) {
            //save a new character
            prefs['characters'][name.toLowerCase()] = {'name': name, 'password': passwd};
        } else {
            //overwrite an existing char
            prefs['characters'][editing_char] = {'name': name, 'password': passwd};
        }
        
        save_characters();
        toggle_char_pane(false);
    });
    
    bind('wmfu-config-delete-char','click',function() {
        
        if(confirm('Are you sure you want to delete this character?')) {
            delete prefs['characters'][editing_char];
            save_characters();
            editing_char = false;
            $('wmfu-config-character-name').value = "";
            $('wmfu-config-character-passwd').value = "";
            toggle_char_pane(false);
            return false;
        }
    });
    
    bind('wmfu-config-save','click',hide_popup);
    
    return false;
}

/*
Utility Functions
*/

function $(id,root) { return (root||document).getElementById(id); }
function $x(xpath,root) { return document.evaluate(xpath,(root?root:document),null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null); }
function $x1(xpath,root) { return document.evaluate(xpath,(root?root:document),null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue; }

// Get element(s) by class name
function $c(className,root){
    if (document.getElementsByClassName) { return (root||document).getElementsByClassName(className); }
    else {
        var elms = $x('.//*[contains(@class,"'+className+'")]',root);
        var buffer = new Array();
        for (var i=0; i<elms.snapshotLength; i++) { buffer.push(elms.snapshotItem(i)); }
        return buffer;
    }
}

function $c1(className,root){ return (document.getElementsByClassName && (root||document).getElementsByClassName(className)[0]) || $x1('.//*[contains(@class,"'+className+'")][1]',root); }

function onclick(id,func){$(id).addEventListener('click',func,false);}

String.prototype.trim = function() { return this.replace(/^\s+|\s+$/g, '');}

// Show a popup div with a shadow background
function show_popup(content, fixedPosition) {
    fixedPosition = fixedPosition || false;
    $('wmfu-popup-container').innerHTML = content;
    $('wmfu-popup-container').style.position = fixedPosition ? 'fixed' : 'absolute';
    $('wmfu-shadow').style.zIndex = '1000';
    $('wmfu-popup-container').style.zIndex = '1001';
    $('wmfu-shadow').style.display = 'block';
    $('wmfu-popup-container').style.display = 'block';
    if (!fixedPosition) { window.scroll(0,0); }
}

// Hide popups created with showPopup()
function hide_popup() {
    if ($('wmfu-popup-container')) {
        $('wmfu-popup-container').style.display = 'none';
        $('wmfu-shadow').style.display = 'none';
    }
}

function add_css(css) {
    if (typeof GM_addStyle !== 'undefined') { return GM_addStyle(css); }
    else if (heads = document.getElementsByTagName('head')) {
        var style = document.createElement('style');
        try { style.innerHTML = css; }
        catch(x) { style.innerText = css; }
        style.type = 'text/css';
        heads[0].appendChild(style);
    }
}

function bind(id,evt,func){$(id).addEventListener(evt,func,false);}