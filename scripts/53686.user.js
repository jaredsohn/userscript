// ==UserScript==
// @name          CLUEbar
// @description   CLUEbar v2
// @namespace	http://tls-3.com/llmenubar.user.js
// @include http://*endoftheinter.net/*
// @include https://*endoftheinter.net/*
// @exclude http://u.endoftheinter.net/u.php*
// @exclude https://u.endoftheinter.net/u.php*
// @exclude http://wiki.endoftheinter.net/*
// @exclude https://wiki.endoftheinter.net/*
// ==/UserScript==
//
/////////////////////////////////////
// +-----------------------------+ //
// |                             | //
// |       === CLUEbar ===       | //
// |                             | //
// |         Version 2.0         | //
// |                             | //
// +-----------------------------+ //
/////////////////////////////////////
// PM me with any questions or bugs or anything
// ~ Kalphak

config = new Array();

// ========================
// CONFIG STUFF - EDIT THIS BIT

// Use topic quick-create?
config.qc            =  true;

// Topic quick-create refresh or follow to the topic?
config.rf            =  "refresh"; //change to "follow" to make it follow

// Make mainbar float? (Note; this is the primary function of this script...)
config.mainbar       =   true;

// Make userbar float?
config.userbar       =   true;

// Display home icon?
config.icon          =   true;

// If you want the home icon on the left, enter 'left'. However, this will interfere with FOXlinks I believe.
config.iconposition  =   "right";

// Have a bottom border on the userbar?
config.border        =   true;

// Colour for the toggle highlight
// You can also use an HTML colour code (remember the #)
config.highlight     =   "skyblue";
// ========================

// DON'T EDIT BELOW THIS LINE
// --------------------------
// NOT KIDDING!










// funkshuns and shizzle
GM_registerMenuCommand('[Lb] Check for Updates', updatecheck);
function updatecheck(){
    var v = "2.0";
    GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://tls-3.com/cbuc.txt',
        headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Accept': 'text/plain'
        },
        onload: function(responseDetails) {
        var ucr = responseDetails.responseText;
        var tmp = ucr.split("|");
        if (v < tmp[0]){
            alert("Please please please update to the new version of CLUEbar!\n\n"+tmp[1])
        }else{
            alert("Version "+tmp[0]+" of CLUEbar is up to date!")
        }
       }
    });
}
var l = new String(window.location);
var tl = (l.match("showtopics.php") != null) ? true : false;
if (tl){
    var temp = l.split('board=');
    var bn = temp[1];
}
function createlldiv(name){
    var a = document.getElementsByTagName("div")[0];
    var b = document.createElement("div");
    b.innerHTML = '<div id="' + name + '">&nbsp;</div>';
    a.parentNode.insertBefore(b, a.nextSibling);
    return document.getElementById(name);
}
function addJs(js) {
    var head, script;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = js;
    head.appendChild(script);
}
addJs('                                                                             \
     function shoide(id){							    \
     obj = document.getElementById(id);					            \
     obj.style.display = (obj.style.display == \'none\') ? \'block\' : \'none\';    \
     }								                    \
     ')
//more prep
var ub = new Array();
var divs = document.getElementsByTagName('div');
for(var i=0; i<divs.length; i++){ if (divs[i].className == 'userbar'){ ub.push(divs[i]); } }
var onoff = (ub.length > 0) ? true : false;
var mb = document.getElementsByTagName("div")[1];
//mainbar doodah
if (config.mainbar){
var top = document.getElementsByTagName("h1")[0];
top.style.marginTop = ((config.userbar) && (onoff)) ? '60px' : '37px';
mb.style.position = "absolute";
mb.style.top = '0px';
mb.style.left = '0px';
mb.style.position = 'fixed';
mb.style.width = '100%';
mb.style.paddingBottom = '3px';
mb.style.borderBottom = '1px black solid';
mb.style.display = 'block';
mb.setAttribute('id','usermenu');
}
if ((config.userbar) && (onoff)){
    var ubar = ub[0];
    ubar.style.position = "absolute";
    ubar.style.top = '37px';
    ubar.style.left = '0px';
    ubar.style.position = 'fixed';
    ubar.style.width = '100%';
    ubar.style.paddingBottom = '3px';
    ubar.style.display = 'block';
    ubar.setAttribute('id','userbar');    
    if (config.border){ ubar.style.borderBottom = '1px black solid'; }
}
//icon doodah
if (config.icon){
    var hm = createlldiv("home");
    hm.innerHTML = ' \
        <a href="http://endoftheinter.net/main.php"> \
        <img src="http://i4.endoftheinter.net/i/n/bc8ec59b9a0e6b6f96df1bb30cf93941/home-icon.png" height="30" width="30"> \
        </a>';
    hm.style.position = "absolute";
    hm.style.top = '1px';
    if (config.iconposition == "right"){
        hm.style.right = '0px';
    }else{
        hm.style.left = '3px';
        hm.style.position = 'fixed';
        hm.style.padding = '3px';
    }
}
//show/hide stuff doodah
if (onoff){
    var too = createlldiv("too");
    too.innerHTML = '<a href="#" onclick="shoide(\'usermenu\'); shoide(\'home\'); shoide(\'userbar\');">Hide/Unhide</a>';
    too.style.position = "absolute";
    too.style.top = '42px';
    too.style.right = '5px';
    too.style.position = 'fixed';
    too.style.background = config['highlight'];
}
//quickcreate doodah
if ((tl) && (config.qc)){
    
    function postit() {
    var board = document.getElementById("a").value;
    var tt = document.getElementById("b").value;
    var tm = document.getElementById("message").value;
    var h = document.getElementById("c").value;
        GM_xmlhttpRequest({
            method: 'POST',
            url: 'http://boards.endoftheinter.net/postmsg.php',
            data: encodeURI('board='+board+'&title='+tt+'&message='+tm+'&h='+h+'&submit=Post+Message'),
            headers: {
                'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
                'Accept': 'ext/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            onload: function(responseDetails) {
               window.location.reload();
            }
        });
    }
    
  
    for(var i=0; i<divs.length; i++){ if (divs[i].className == 'infobar'){ divs[i].innerHTML+= ' | <a href="#" onclick="shoide(\'qcdiv\'); return false;">QC</a>'; } }

    //mb.innerHTML += ' | <a href="#" onclick="shoide(\'qcdiv\'); return false;">QC</a>';
    var qcdiv = createlldiv('qcdiv');
    qcdiv.style.position = 'absolute';
    qcdiv.style.width = '50%';
    qcdiv.style.top = '110px';
    qcdiv.style.left = '0';
    qcdiv.style.right = '0';
    qcdiv.style.marginLeft ='auto';
    qcdiv.style.marginRight = 'auto';
    qcdiv.style.background = 'skyblue';
    qcdiv.style.opacity = '0.9';
    qcdiv.style.textAlign = 'center';
    qcdiv.style.border = '2px solid black';
    qcdiv.style.display = 'none';
    GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://boards.endoftheinter.net/postmsg.php?board='+bn,
        headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Accept': 'text/plain'
        },
        onload: function(responseDetails) {
        var resp = responseDetails.responseText;
        var rega = new RegExp('<input type="hidden" name="h" value="(.*?)" />');
        var codea = rega.exec(resp);
        var xc = codea[1];
        
        
        var regb = new RegExp(/---\n(.*?)<\/textarea>/);
        var codeb = regb.exec(resp);
        var xb = codeb[1];
        //alert (xb)
               //var text = resp.Substring(resp.IndexOf("---"), resp.IndexOf("</textarea>"));

        var rof = (config.rf == "follow") ? '<input type="submit" value="Post Message"></form>' : '</form><button id="d">Post Message</button>';
      
        qcdiv.innerHTML = '                                                                                     \
            <h2>Create new topic</h2><form name="z" method="post" action="http://boards.endoftheinter.net/postmsg.php">                                                                         \
            <input type="hidden" name="board" id="a" value="' + bn + '" />                                      \
            <b>Topic Title:</b><br><input type="text" id="b" name="title" value="" maxlength="80" size="60" />  \
            <br /><br /><b>Your Message</b><br />                                                               \
            <textarea cols="100" rows="20" name="message" id="message">\n\n---\n'+xb+'</textarea>                              \
            <br><br><input type="hidden" id="c" name="h" value="' + xc + '"><input type="hidden" name="submit" value="Post Message">'+rof+'<br><br>';
   var butt = document.getElementById("d");
   butt.addEventListener('click', postit, false);
       }
    });
}
 
// ~ Fin.
// Don't do drugs, kids.