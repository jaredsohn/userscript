// ==UserScript==
// @name           Meteoid Path Finder
// @namespace      kol.interface.unfinished
// @description    Provides pathfinding for the mini-map in KoL's mini-game Meteoid.
// @include        http://*kingdomofloathing.com/choice.php*
// @include        http://127.0.0.1:*/choice.php*
// ==/UserScript==

// Version 1.0

function doAction(vars,callback,time) {
    GM_xmlhttpRequest({
            method: "POST",
                url: "http://" + location.host + "/choice.php",
                headers: {"Content-type": "application/x-www-form-urlencoded"},
                data: vars,
                onload: function(response){
                var d = document.getElementById('meteoidresult');
                if (!d) {
                    var p = document.body.firstChild;
                    while (p.nextSibling && p.tagName!='CENTER') {
                        p = p.nextSibling;
                    }
                    d = document.createElement('center');
                    d.setAttribute('id','meteoidresult');
                    p.parentNode.replaceChild(d,p);
                }
                d.innerHTML = response.responseText;
                if (callback)
                    setTimeout(callback,200);
                //location.reload(); 
            }
        });
}

function press(input,callback) {
    input.setAttribute('style','color:red;');
    var f = input.parentNode;
    var ps = document.evaluate('.//input',f,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
    var args = '';
    for (var i=ps.snapshotLength-1;i>=0;i--) {
        var p = ps.snapshotItem(i);
        var n = p.getAttribute('name');
        if (n) {
            if (args)
                args += '&';
            args += n+'='+encodeURI(p.getAttribute('value'));
        }
    }
    doAction(args,callback);
}

var map;

function check() {
    if (document.evaluate( '//b[text()="Meteoid"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue) {
        var opt = document.evaluate( '//td[@bgcolor="pink"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
        if (opt.singleNodeValue) {
            // found the minimap
            var t = opt.singleNodeValue.parentNode;
            while (t && t.tagName!='TABLE')
                t = t.parentNode;
            if (t) {
                t = t.parentNode;
                while (t && t.tagName!='TABLE')
                    t = t.parentNode;
                if (t) {
                    var tx = Number(GM_getValue('targetx','-1'));
                    var ty = Number(GM_getValue('targety','-1'));
                    if (tx>=0 && ty>=0) {
                        parseMap(t);
                        if (tx==map.you[0] && ty==map.you[1]) {
                            GM_setValue('targetx','-1');
                            GM_setValue('targety','-1');
                            parseMap(t,true);
                        } else 
                            move(map.you[0],map.you[1],tx,ty);
                    } else
                        parseMap(t,true);
                    //printMap();
                }
            }
        }
    }
}

function printMap() {
    var line='';
    for (var y=0;y<5;y++) {
        for (var x=0;x<5;x++) {
            var c = map[y][x];
            line +='\t'+c;
        }
        line +='\n';
    }
    GM_log('\n'+line);
    GM_log('you are at: '+map.you[0]+','+map.you[1]);
}

function parseMap(t,add) {
    var ps = document.evaluate('.//td[@align="center"]',t,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
    var a = [];
    for (var i=0;i<ps.snapshotLength;i++) {
        a[i] = ps.snapshotItem(i);
    }
    map = [];
    var x=0,y=0;
    for (var i=0;i<a.length;i++) {
        var td = a[i];
        var row;
        if (x==0) 
            row = [];
        else
            row = map[y];
        if (td.getAttribute('bgcolor')=='pink') {
            var symbol = td.innerHTML;
            if (symbol) 
                symbol = symbol.replace(/<[^>]*>/g,'');
            if (symbol=='*')
                map.you = [x,y];
            else if (add) {
                td.setAttribute('cx',x);
                td.setAttribute('cy',y);
                td.parentNode.parentNode.parentNode.setAttribute('title','Click to move to here.');
                td.addEventListener('click',moveTo,false);
            }
            var n = 0;
            // check for left neighbour
            if (x>0 && row[x-1]) {
                if (connects(td,-1,0))
                    n |= 1;
            }
            // check for right neighbour
            if (x<4) {
                if (connects(td,1,0))
                    n |= 2;
            }
            // check for top neighbour
            if (y>0 && map[y-1][x]) {
                if (connects(td,0,-1))
                    n |= 4;
            }
            // check for bottom neighbour
            if (y<4) {
                if (connects(td,0,1))
                    n |= 8;
            }
            if (n==0) n |= 16;
            row[x] = n;
        } else
            row[x] = 0;
        map[y] = row;
        x++;
        if (x>4) { 
            x = 0;
            y++;
        }
    }
}

function moveTo(e) {
    var tx = this.getAttribute('cx');
    var ty = this.getAttribute('cy');
    this.removeEventListener('click',moveTo,false);
    move(map.you[0],map.you[1],tx,ty);
}

var dir;

function clone(obj) { 
    var clone = {};
    clone.prototype = obj.prototype;
    for (property in obj) clone[property] = obj[property];
    return clone;
}

function move(fx,fy,tx,ty) {
    //GM_log('moving you from '+fx+','+fy+' to '+tx+','+ty);
    // find next step
    dir = '';
    var s = search(Number(map.you[0]),Number(map.you[1]),{},tx,ty,0);
    //GM_log('distance: '+s+', move: '+dir);
    if (dir) {
        GM_setValue('targetx',tx);
        GM_setValue('targety',ty);
        var input;
        input = document.evaluate('//input[@value="'+dir+'"]',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
        if (input.singleNodeValue)
            press(input.singleNodeValue,check);
    } else {
        GM_setValue('targetx','-1');
        GM_setValue('targety','-1');
    }
}

function search(x,y,done,tx,ty,dist) {
    if (x==tx && y==ty) {
        return dist;
    }
    
    var mx = 10000000;
    var d = clone(done);
    dist = Number(dist)+1;
    d[x+','+y] = true;
    // left
    if (map[y][x] & 1) {
        var m = (x-1)+','+y;
        if (!d[m]) {
            var c = search(x-1,y,d,tx,ty,dist);
            if (c<mx) {
                mx = c;
                dir = 'Left';
            }
        }
    }
    // right
    if (map[y][x] & 2) {
        var m = (Number(x)+1)+','+y;
        if (!d[m]) {
            var c = search(x+1,y,d,tx,ty,dist);
            if (c<mx) {
                mx = c;
                dir = 'Right';
            }
        }
    }
    // up
    if (map[y][x] & 4) {
        var m = x+','+(y-1);
        if (!d[m]) {
            var c = search(x,y-1,d,tx,ty,dist);
            if (c<mx) {
                mx = c;
                //dir = '&nbsp;&nbsp;Up&nbsp;&nbsp;';
                dir = '\u00A0\u00A0Up\u00A0\u00A0';
            }
        }
    }
    // down
    if (map[y][x] & 8) {
        var m = x+','+(Number(y)+1);
        if (!d[m]) {
            var c = search(x,y+1,d,tx,ty,dist);
            if (c<mx) {
                mx = c;
                dir = 'Down';
            }
        }
    }
    return mx;
}

function connects(td,xd,yd) {
    if (xd==0) {
        if (yd<0) {
            var tr = td.parentNode.previousSibling;
            td = tr.firstChild.nextSibling;
            if (td.getAttribute('bgcolor')=='pink')
                return true;
            return false;
        } else { // yd>0
            var tr = td.parentNode.nextSibling;
            td = tr.firstChild.nextSibling;
            if (td.getAttribute('bgcolor')=='pink')
                return true;
            return false;
        }
    } else if (xd<0) {
        td = td.previousSibling;
        if (td.getAttribute('bgcolor')=='pink')
            return true;
        return false;
    } // xd>0
    td = td.nextSibling;
    if (td.getAttribute('bgcolor')=='pink')
        return true;
    return false;
}

function getState() {
    var s = GM_getValue('state',0);
    if (s>=path.length) s = 0;
    return s;
}

function setState(s) {
    GM_setValue('state',s);
}

check();
