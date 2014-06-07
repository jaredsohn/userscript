// ==UserScript==
// @name           All at Once
// @namespace      kol.interface.unfinished
// @description    Allows aggregated actions on a selected range of your KoL inventory
// @include        http://*kingdomofloathing.com/inventory.php*
// @include        http://127.0.0.1:*/inventory.php*
// @version        1.1
// ==/UserScript==

//Version 1.1
// - test to avoid operating on invisible items (due to use of inventory filter script).
//Version 1.0

function checkSelect() {
    if (getSelect())
        setTimeout(checkMenu,200);
}

function getSelect() {
    var s = window.getSelection ? window.getSelection() : document.getSelection;
    if (s && s!='')
        return s;
}

function checkMenu() {
    var p = document.getElementById('pop_ircm');
    if (p) {
        var ds = document.evaluate( './/div', p, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
        
        var re = new RegExp('pircm_[0-9]*');
        for (var i=ds.snapshotLength-1;i>=0;i--) {
            var d = ds.snapshotItem(i);
            if (d.id && d.id.match(re)) {
                var a = document.createElement('a');
                a.className = 'small';
                a.setAttribute('href','#');
                a.addEventListener('click',handleSelected,false);
                var t = document.createTextNode('[select]');
                a.appendChild(t);
                d.appendChild(document.createTextNode('\xa0'));
                d.appendChild(a);
            }
        }
    }
}

function handleSelected() {
    var action = this.parentNode.getAttribute('rel');
    //GM_log('I would do: '+action);
    var s = getSelect();
    if (s) {
        var items={};
        for (var i=0;i<s.rangeCount;i++) {
            var r = s.getRangeAt(i);
            var ca = r.commonAncestorContainer;
            var ns = document.evaluate('.//table', ca, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
            var re = new RegExp('^ic[0-9]*$');
            for (var j=ns.snapshotLength-1;j>=0;j--) {
                var n = ns.snapshotItem(j);
                if (s.containsNode(n,true) && n.id && n.id.match(re)) {
                    if (n.parentNode.style.display!='none') {
                        var qty = n.getAttribute('rel','&n=1').match(/&n=([0-9]*)/)[1];
                        items[n.id.replace('ic','')] = qty;
                    }
                }
            }
        }
        createDiv();
        for (var itm in items) {
            var qty = items[itm];
            var act = 'http://'+window.location.host+'/'+action.replace('IID',itm).replace('NUM',qty);
            //GM_log('to item='+act);
            setTimeout(curry(act),30*i);
        }
    }
}

function curry(act) {
    return function() {
        process(act);
    }
}

// adapted from kol js 
function createDiv() {
    var mp = document.getElementById('effdiv');
    if (mp) {
        mp.parentNode.removeChild(mp);
    }
    
    if(!window.dontscroll || (window.dontscroll && dontscroll==0)) {
        window.scroll(0,0);
    }
    var d = document.createElement('div');
    d.id = 'effdiv';
    d.innerHTML = '<center><table cellspacing="0" width="95%"><tr><td align="center" style="color: white; background-color: blue">Results:</td></tr><tr><td align="center" style="border: 1px solid blue;">Loading Results...</td></tr></table></center><br />';
    var b = document.body;
    b.insertBefore(d, b.firstChild);
}

// utility function, stolen from other scripts
function GM_get(dest, callback)
{   GM_xmlhttpRequest({
    method: 'GET',
    url: dest,
    //onerror:function(error) { GM_log("GM_get Error: " + error); },
    onload:function(details) {
        if( typeof(callback)=='function' ){
            callback(details.responseText);
        }   }   }); 
}


function process(dourl) {
    GM_get(dourl,function(result) {
        var mp = document.getElementById('effdiv');
        if (mp) {
            //mp.parentNode.removeChild(mp);
            var mpt = mp.firstChild;
            if (mpt && mpt.getAttribute('name')=='effdivtop') {
                mp.removeChild(mpt);
                mp.innerHTML = '<a name="effdivtop"></a><center>' + result + '</center>' + mp.innerHTML;
            } else {
                mp.innerHTML = '<a name="effdivtop"></a><center>' + result + '</center>';
            }
        }
    });
}

function doPage() {
    var elts = document.getElementsByClassName('ircm');
    for (var i=0;i<elts.length;i++)  {
        var x = elts[i];
        x.addEventListener("contextmenu", checkSelect, false);
    } 
}

doPage();
