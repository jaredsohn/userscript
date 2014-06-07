// ==UserScript==
// @name            Macro Monkey
// @description     
// @source          http://userscripts.org/scripts/show/25337
// @identifier      http://userscripts.org/scripts/source/25337.user.js
// @version         0.3.1
// @date            2007-06-02
// @author          Bjorn Rosell
// @namespace       http://www.rosell.dk/gm/
// @include         *
// ==/UserScript==
// update-message   There is a new version of the "Macro Monkey" userscript.<br>v3.0: Fixed bug, which meant that the script sometimes ended prematurely<br>v2.0: Added concurrency. Up to 10 scripts can now execute at a time, without interfering with each other<br>Click <a href="http://userscripts.org/scripts/source/25337.user.js">here</a> to install it<br>Click <a href="http://userscripts.org/scripts/show/25337">here</a> to go to the script page

// some useful functions
function $(id) {return document.getElementById(id)};
function get(url,cb) {GM_xmlhttpRequest({method:"GET",url:url,onload:function(xhr){cb(xhr.responseText);}})}
function parofe(e,i) {return e.target.getAttribute('id').split('_')[i]}
function idofe(e,i) {return parseInt(parofe(e,i), 10)}
function hide(elm) {if (elm) elm.style.display='none'}
function show(elm) {if (elm) elm.style.display='block'}
function remElm(elm) {if (elm) elm.parentNode.removeChild(elm)}

// ------------------------------------------------------------------------------------
//                              Part 0: Auto-update
// ------------------------------------------------------------------------------------

function autoupdate() {

    if (self != top) return
    if (window.location.protocol == 'https:') return
    var countdown = GM_getValue('countdown');
    GM_setValue('countdown', countdown - 1);
    if (countdown>0) return
    var daysSinceLastInstall = (Math.floor(new Date().getTime() / 60000) - GM_getValue('install-time')) / 60 / 24;
    GM_setValue('countdown', daysSinceLastInstall<7 ? 100:1000);

    // check for update
    get('http://www.rosell.dk/gm/macromonkey.user.js', function (s) {
        if (s.indexOf('update-message') == -1) return
        if (s.indexOf('@version         0.3') == -1) {
            var pos = s.indexOf('@version')+9;
            while (s.charAt(pos) == " ") pos++
            var pos2 = s.indexOf('\n', pos);
            var ver = s.substr(pos, pos2-pos)
            if (ver > "0.3.a") {
                var div = document.createElement("div");
                document.body.insertBefore(div, document.body.firstChild);
                div.innerHTML = s.match(/update-message\s*(.*)/)[1];            
                GM_setValue('countdown', 5);
            }
        }
    });
}
if (GM_getValue('version') != "0.1") {
    GM_setValue('version', "0.1");
    GM_setValue('install-time', Math.floor(new Date().getTime() / 60000));
    GM_setValue('countdown', 20);
}

autoupdate();


// ------------------------------------------------------------------------------------
//                           Here comes the macro monkey
// ------------------------------------------------------------------------------------

var sq;
var lh = unescape(location.href);
var pos = lh.indexOf('monkeythis=');
var seqId;
if (pos!=-1) {
    sq = lh.substr(pos+11);
    seqId = parseInt(GM_getValue('seqId') || "0", 10) + 1;
    if (seqId > 10) seqId = 1;
    GM_setValue('seqId', seqId);
}
else {
/*
    if (GM_getValue('ref') != document.referrer.split("#")[0]) {
	//alert("mismatch:\n" + GM_getValue('ref')+"\n"+document.referrer.split("#")[0])
	//alert("mismatch:\n" + GM_getValue('ref').split("&").join("\n")+"\n"+document.referrer.lengh)
        return
    }*/

    var id = document.referrer.split("#")[0];
    for (var i=1; i<=10; i++) {
        if (GM_getValue('id'+i) == id) {
            seqId  = i;
	}
    }
    sq = GM_getValue('sequence'+seqId);
}

if (!sq) return

GM_setValue('id'+seqId, document.location.href.split("#")[0])
//GM_setValue('ref', document.location.href)

//alert(document.referrer+"\n"+document.location.href)

// useful xpath function by alien_scum (http://userscripts.org/scripts/show/8370)
function $x(xpath) {
    xpath=xpath.replace(/((^|\|)\s*)([^/|]+)/g,'$2//$3').replace(/([^.])\.(\w*)/g,'$1[@class="$2"]').replace(/#(\w*)/g,'[@id="$1"]').replace(/\/\[/g,'/*[');
    var got=document.evaluate(xpath,document,null,0,null), result=[];
    while(next=got.iterateNext()) result.push(next);
    return result;
}


var sep = "&";
var db = document.body;

var name;
var value;
while(true) {
	
    var nextPos = sq.indexOf(sep, 0);
    if (nextPos == -1) nextPos = sq.length + 1;

    var pos = sq.indexOf("=");
	if ((pos == -1) || (pos>nextPos)) {
        name = sq.substr(0, nextPos);
        value = '';
    }
    else {
        name = sq.substr(0, pos);
        value = sq.substr(pos+1, nextPos - pos - 1);
    }
    //alert(name+":"+value)
    switch(name) {
        case 'haltif':
            if (eval(value)) return
            break;
    }
    
    sq = sq.substr(nextPos+1);
    GM_setValue('sequence' + seqId, sq);
    
    switch(name) {
        case 'go':
            location.href = value;
            return
            break;
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
    }
    if (sq=='') break;
}

//alert('fin')
