// ==UserScript==
// @name            CleanItUp
// @description     Lets you clean up a page by putting instructions in url (css, xpath selecting, regexp and more)
// @source          http://userscripts.org/scripts/show/9724
// @identifier      http://userscripts.org/scripts/source/9724.user.js
// @version         1.1
// @date            2007-06-02
// @author          Bjorn Rosell
// @namespace       http://www.rosell.dk/gm/
// @include         *
// ==/UserScript==
// update-message   There is a new version of the "CleanItUp" userscript.<br>Click <a href="http://userscripts.org/scripts/source/9724.user.js">here</a> to install it<br>Click <a href="http://userscripts.org/scripts/show/9724">here</a> to go to the script page

/*
Based on xstripper by alien_scum (http://userscripts.org/scripts/show/8370)
*/


// ------------------------------------------------------------------------------------
//                              Part 0: Auto-update
// ------------------------------------------------------------------------------------


function autoupdate() {
    var countdown = GM_getValue('countdown');
    GM_setValue('countdown', countdown - 1);
    if (countdown>0) return
    var daysSinceLastInstall = (Math.floor(new Date().getTime() / 60000) - GM_getValue('install-time')) / 60 / 24;
    GM_setValue('countdown', daysSinceLastInstall<7 ? 100:1000);
    
    // check for update
    get('http://www.rosell.dk/gm/cleanitup.user.js', function (s) {
        if (s.indexOf('@version         1.1') == -1) {
            var div = document.createElement("div");
            document.body.insertBefore(div, document.body.firstChild);
            div.innerHTML = s.match(/update-message\s*(.*)/)[1];            
            GM_setValue('countdown', 5);
        }
    });
}
if (GM_getValue('version') != "1.1") {
    GM_setValue('version', "1.1");
    GM_setValue('install-time', Math.floor(new Date().getTime() / 60000));
    GM_setValue('countdown', 20);
}

autoupdate();


// ------------------------------------------------------------------------------------
//                              Cleanup code
// ------------------------------------------------------------------------------------

// useful xpath function by alien_scum (http://userscripts.org/scripts/show/8370)
function $x(xpath) {
    xpath=xpath.replace(/((^|\|)\s*)([^/|]+)/g,'$2//$3').replace(/([^.])\.(\w*)/g,'$1[@class="$2"]').replace(/#(\w*)/g,'[@id="$1"]').replace(/\/\[/g,'/*[');
    var got=document.evaluate(xpath,document,null,0,null), result=[];
    while(next=got.iterateNext()) result.push(next);
    return result;
}

function applyFilter(name,value) {
    switch(name) {
    case 'xcrop': 
        var r=$x(value);
        db.innerHTML = '';
        r.forEach(function(n){db.appendChild(n)});
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
            var s = db.innerHTML;
            var pos = s.indexOf(b[0]);
            if (pos > 0) {
                var pos2 = s.indexOf(b[1], pos + 1) 
                if (pos2 > 0) {
                    if (b.length>=3) pos+=parseInt(b[2]);
                    if (b.length>=4) pos2+=parseInt(b[3]);
                    db.innerHTML = s.substr(pos, pos2-pos);
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
            db.innerHTML = db.innerHTML.replace(re, b[2]);
        }
        break;
    }
}

var lh = unescape(location.href);
var activator = 'cleanitup'
var pos3 = lh.indexOf(activator);
// only perform cleanup, if "cleanitup" is in the url (to avoid that the script messes with stuff it shouldn't be messing with)
if (pos3 > 0) {
    var sep = lh.charAt(pos3+activator.length);
    var a = lh.substr(pos3+activator.length+1).split(sep);
    var db = document.body;
    for (var i=0; i<a.length; i++) {
        var pos = a[i].indexOf("=");
        if (pos<0) continue;
        applyFilter(a[i].substr(0, pos), a[i].substr(pos+1))
    }
}
