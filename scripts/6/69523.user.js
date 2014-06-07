// ==UserScript==
// @name           Chat Control Panel
// @namespace      kol.interface.unfinished
// @description    Adds a small panel to the top of the chat window with a list of macros, allowing you to fire chat macros with mouse actions.
// @include        http://*kingdomofloathing.com/lchat.php*
// @include        http://*kingdomofloathing.com/mchat.php*
// @include        http://127.0.0.1:*/lchat.php*
// @include        http://127.0.0.1:*/mchat.php*
// @version        2.0
// ==/UserScript==

//Version 2.0
// - modified heavily to work with the new tabbed chat.  This 
//   changes the way the docking works, and there is now an
//   icon on the top right corner that toggles the appearance
//   of the panel instead of the bar on the right.
//Version 1.0.3
// - more minor interface changes
//   - resizing is now granular, always shrinking or growing by 
//     a full entry.
//   - the toggle bar now stays on the right of the chat control
//     panel so you can quickly toggle on/off without moving
//     the mouse.
//   - the control panel sticks to the top when moved very close
//     to the top of the chat pane.
//Version 1.0.2
// - a minor aesthetic change, using partial transparency to 
//   hide slightly less of the underlying chap panel text.
//Version 1.0.1
// - fix mouse-over message for resize dragging
//Version 1.0
// - changed the docking method, so you now click on a bar 
//   on the right to dock it on the right
// - added a pull bar next to the docking bar so you can 
//   slide it anywhere in the chat pane
// - the former docking tab (line) at the bottom is now a 
//   pull tab so you can resize it to as many entries as 
//   you want (or can fit).
//Version 0.9

var height=unitHeight(5);
var ccmds;
var playername;

var dims;

function rollHandler() {
    var cp = document.getElementById('chatcp');
    var cph = document.getElementById('chatcp_handle');
    if (cp && cph) {
        var v = cp.getAttribute('style');
        var w = cph.getAttribute('style');
        if (v.match(/display\s*:\s*none/)) {
            cp.setAttribute('style',removeStyle(v,'display'));
            cph.setAttribute('style',removeStyle(w,'display'));
            saveDock(false);
        } else {
            cp.setAttribute('style','display:none;'+v);
            cph.setAttribute('style','display:none;'+w);
            saveDock(true);
        }

    }
}


function replaceOrAddStyle(s,a,v) {
    var r = new RegExp(a+'\\s*:','i');
    var sa = s.split(';');
    for (var i=0;i<sa.length;i++) {
        var x = sa[i].match(r);
        if (x) {
            sa[i] = a+':'+v;
            return sa.join(';');
        }
    }
    return a+':'+v+';'+s;
}

function removeStyle(s,a) {
    var r = new RegExp(a+'\\s*:','i');
    var sa = s.split(';');
    for (var i=0;i<sa.length;i++) {
        var x = sa[i].match(r);
        if (x) {
            sa[i] = '';
            return sa.join(';').replace(';;',';');
        }
    }
    return s;
}

function getStyleAttr(s,a) {
    var r = new RegExp('(^|;\\s*)'+a+'\\s*:\\s*([0-9]+)','i');
    var x = s.match(r);
    if (x)
        return Number(x[2]);
    GM_log('could not find style: "' +a+'" in "'+s+'"');
    return -1;
}

function setTopBorder(s) {
    return replaceOrAddStyle(s,'border-top','1px solid black');
}

function removeTopBorder(s) {
    return removeStyle(s,'border-top');
}

function setWidths(e) {
    getMaxDimensions();
    var cp = document.getElementById('chatcp');
    var cph = document.getElementById('chatcp_handle');
    var cpd = document.getElementById('chatcp_dock');
    if (cp && cph && cpd) {
        var w = (dims.headerw) ? dims.headerw : dims.width; //document.body.clientWidth-19;
        cph.setAttribute('style',cph.getAttribute('style').replace(/width\s*:\s*[0-9;px]*/,'width:'+(w+1)+'px;'));
        cp.setAttribute('style',cp.getAttribute('style').replace(/width\s*:\s*[0-9;px]*/,'width:'+w+'px;'));
        if (dims.headerw) 
            cpd.setAttribute('style',cpd.getAttribute('style').replace(/left\s*:\s*[0-9;px]*/,'left:'+(dims.headerw-15)+'px;'));
        else
            cpd.setAttribute('style',cpd.getAttribute('style').replace(/left\s*:\s*[0-9;px]*/,'left:'+(w-15)+'px;'));
        var texts = document.getElementsByClassName('chatcp_text');
        for (var i=0;i<texts.length;i++) {
            texts[i].setAttribute('style',texts[i].getAttribute('style').replace(/width\s*:\s*[0-9;px]*/,'width:'+(w-56)+'px;'));
        }
    }
}

function tHandler(e) {
    var ci = this.getAttribute('cmdidx');
    ccmds[ci] = this.value;
    saveTable(ccmds);
    if (e.keyCode==13)
        insertCmd(ccmds[ci]);
}


function insertCmd(c) {
    if (c)
        unsafeWindow.submitchat(c);
}

function bHandler() {
    insertCmd(ccmds[this.getAttribute('cmdidx')]);
}


function addPanel() {
    height = restoreHeight();
    ccmds = restoreTable();
    var f = document.getElementById('ChatWindow');
    var cp = document.getElementById('chatcp');
    if (f && !cp) {
        placeDockIcon(f);
        cp = document.createElement('div');
        var w = (dims.headerw) ? dims.headerw : dims.width;//document.body.clientWidth-19;
        var p = restorePos();
        cp.setAttribute('style','height:'+height+'px;width:'+w+'px;'+((p>0)?'border-top:1px solid black;':'')+'background-image:-moz-linear-gradient(center top , white 50%, transparent 100%);z-index:7;font-size:12px;position:absolute;font-family:arial;left:2px;top:'+p+'px;');
        cp.setAttribute('id','chatcp');

        var t = document.createElement('table');
        t.setAttribute('cellspacing','0');
        for(var i=0;unitHeight(i)<height;i++) {
            newEntry(i,w-40,t);
        }

        var tt = document.createElement('table');
        tt.setAttribute('style','vertical-align:top;');
        var tr = document.createElement('tr');
        var td = document.createElement('td');
        tt.setAttribute('cellspacing','0');
        tt.setAttribute('cellpadding','0');
        td.setAttribute('style','vertical-align:top;');
        td.appendChild(t);
        tr.appendChild(td);
        td = document.createElement('td');
        var span = document.createElement('div');
        span.setAttribute('style','background:lightgray;height:'+(height-4)+'px;width:15px;position:relative;top:2px;');
        span.setAttribute('title','Click and drag to position the chat control panel.');
        span.setAttribute('class','chatcpbar');
        td.appendChild(span);
        tr.appendChild(td);
        tt.appendChild(tr);

        cp.appendChild(tt);

        var handle = document.createElement('div');
        handle.setAttribute('style','height:7px;width:'+(w+1)+'px;text-align:center;vertical-align:middle;border-bottom:1px solid black;background-color:transparent;z-index:8;font-size:12px;position:absolute;font-family:arial;left:2px;top:'+(p+height-3)+'px;');
        handle.setAttribute('id','chatcp_handle');
        handle.setAttribute('title','Click and drag to resize the chat control panel.');
        var a = document.createElement('img');
        a.setAttribute('src',"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%1E%00%00%00%05%08%02%00%00%00%DDC%CB%AD%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%00%07tIME%07%DA%0C%17%002%18%89S%DB%E9%00%00%00%19tEXtComment%00Created%20with%20GIMPW%81%0E%17%00%00%00%16IDAT%18%D3c%60%A0%19%60%FC%FF%FF%3F%C3%90%03C%D3%D5%00W%E9%05%FD%13%F9%A0%92%00%00%00%00IEND%AEB%60%82");
        handle.appendChild(a);

        //handle.addEventListener('click',rollHandler,false);
        handle.addEventListener('mousedown',dragStartSize,false);
        cp.addEventListener('mousedown',dragStart,true);
        
        f.parentNode.insertBefore(cp,f);
        f.parentNode.insertBefore(handle,f);

        //cp.appendChild(handle);
        window.addEventListener('resize',setWidths,false);

        if (restoreDock())
            rollHandler();
    }
}

function unitHeight(u) {
    return u*22+5;
}

function heightUnit(h) {
    return Math.floor((h-5)/22);
}

function saveTable(t) {
    var pn = getPlayerNameFromCharpane();
    if (pn) {
        GM_setValue(pn+'_cmds',t.join('#####'));
    }
}

function saveHeight(h) {
    height = h;
    var pn = getPlayerNameFromCharpane();
    if (pn) {
        GM_setValue(pn+'_cpheight',h);
    }
}

function restoreHeight() {
    var pn = getPlayerNameFromCharpane();
    if (pn) {
        return Math.ceil(Number(GM_getValue(pn+'_cpheight',unitHeight(5))));
    }
    return Math.ceil(unitHeight(5));
}

function saveDock(b) {
    var pn = getPlayerNameFromCharpane();
    if (pn) {
        GM_setValue(pn+'_docked',b);
    }
}

function restoreDock() {
    var pn = getPlayerNameFromCharpane();
    if (pn) {
        return Boolean(GM_getValue(pn+'_docked',false));
    }
}

function restoreTable() {
    var pn = getPlayerNameFromCharpane();
    if (pn) {
        var t = GM_getValue(pn+'_cmds','');
        if (t) {
            t = t.split('#####');
            return t;
        }
    }
    return ['Good morning clan-mates!', '/unequip all', '', '', ''];
}


function savePos(y) {
    var pn = getPlayerNameFromCharpane();
    if (pn) {
        GM_setValue(pn+'_pos',y);
    }
}

function restorePos() {
    var pn = getPlayerNameFromCharpane();
    if (pn) {
        var t = Number(GM_getValue(pn+'_pos',2));
        return t;
    }
    return 2;
}


// utility to get player name; hacked/stolen from Antimarty's fortune cookie script
function getPlayerNameFromCharpane() {
    var somef=window.parent.frames;
    var goo;
    for(var j=0;j<somef.length;j++) {
        if (somef[j].name=="charpane") {
            goo=somef[j];
            var username = goo.document.getElementsByTagName("b");
            if (!username || username.length < 1) return playername;
            username = username[0];
            if (!username) return playername;
            username = username.firstChild;
            if (!username) return playername;
            // in full mode the link is <a><b>Name</b></a>
            // in compact mode it's <b><a>Name</a></b>
            // so have to handle this, and also can use it to tell
            // whether it's in compact mode or not.
            var fullmode = true;
            while (username && username.nodeType == 1)
                {
                    username = username.firstChild;
                    fullmode = false;
                }
            if (!username) return playername;
            username = username.nodeValue;
            if (!username) return playername;
            username = username.toLowerCase();
            playername = username;
            return username;
        }
    }
}


// code to drag the panel around
var d;
function dragStart(event, id) {
    var cp = document.getElementById('chatcp');
    var cph = document.getElementById('chatcp_handle');
    if (cp && cph) {
        var v = getStyleAttr(cp.getAttribute('style'),'width');
        if (v>=0) {
            if (event.clientX<v-50)
                return;
        }

        d = new Object();
        d.cp = cp;
        d.cph = cph;
        var x = event.clientX + window.scrollX;
        var y = event.clientY + window.scrollY;

        // Save starting positions of cursor and element.
        d.cursorStartX = x;
        d.cursorStartY = y;
        d.elStartLeft = parseInt(cp.style.left, 10);
        d.elStartTop = parseInt(cp.style.top, 10);

        d.baseH = getStyleAttr(cp.getAttribute('style'),'height');

        if (isNaN(d.elStartLeft)) d.elStartLeft = 2;
        if (isNaN(d.elStartTop)) d.elStartTop = 2;

        document.addEventListener("mousemove", dragGo, true);
        document.addEventListener("mouseup", dragStop, true);
        event.preventDefault();
    }
}

// drag handler for positioning the panel
function dragGo(event)  {
    var x, y;
    // Get cursor position with respect to the page.
    y = event.clientY + window.scrollY;

    //d.elNode.style.left = (d.elStartLeft + x - d.cursorStartX) + "px";
    if ((d.elStartTop + y - d.cursorStartY)>=(dims.headerw? (dims.headert+16) : (dims.top+16)) && (d.elStartTop + y - d.cursorStartY)<(dims.height+(dims.headerw? (dims.headert+16) : (dims.top+16)))-height) {
        if ((d.elStartTop + y - d.cursorStartY)<=3)
            y = d.cursorStartY - d.elStartTop;
        d.cp.style.top = (d.elStartTop + y - d.cursorStartY) + "px";
        if ((d.elStartTop + y - d.cursorStartY)>0)
            d.cp.setAttribute('style',setTopBorder(d.cp.getAttribute('style')));
        else
            d.cp.setAttribute('style',removeTopBorder(d.cp.getAttribute('style')));
        d.cph.style.top = (d.elStartTop + y - d.cursorStartY + d.baseH - 3) + "px";
        savePos(d.elStartTop + y - d.cursorStartY);
    }
    event.preventDefault();
}

// terminate dragging to position the panel
function dragStop(event)  {
    // Stop capturing mousemove and mouseup events.
    document.removeEventListener("mousemove", dragGo, true);
    document.removeEventListener("mouseup", dragStop, true);
    d = null;
}


// code to resize the panel
function dragStartSize(event, id) {
    var cp = document.getElementById('chatcp');
    var cph = document.getElementById('chatcp_handle');
    if (cp && cph) {
        d = new Object();
        d.cp = cp;
        d.cph = cph;
        var y = event.clientY + window.scrollY;
        d.baseH = getStyleAttr(cp.getAttribute('style'),'height');
        d.baseO = getStyleAttr(cph.getAttribute('style'),'top');

        // Save starting positions of cursor and element.
        d.cursorStartY = y;
        d.elStartLeft = parseInt(cp.style.left, 10);
        d.elStartTop = parseInt(cp.style.top, 10);

        if (isNaN(d.elStartLeft)) d.elStartLeft = 2;
        if (isNaN(d.elStartTop)) d.elStartTop = 2;

        document.addEventListener("mousemove", dragGoSize, true);
        document.addEventListener("mouseup", dragStopSize, true);
        event.preventDefault();
    }
}

// create cp index i in table t with width w
function newEntry(i,w,t) {
    var tr = document.createElement('tr');
    tr.setAttribute('id','chatcp_index'+i);
    var td = document.createElement('td');
    var i1 = document.createElement('input');
    i1.setAttribute('type','button');
    i1.setAttribute('value','>');
    i1.setAttribute('style','font-size:9px;');
    i1.setAttribute('cmdidx',i);
    i1.addEventListener('mouseup',bHandler,false);
    var i2 = document.createElement('input');
    i2.setAttribute('type','text');
    i2.setAttribute('width','128');
    i2.setAttribute('value',((i>=ccmds.length)?'':ccmds[i]));
    i2.setAttribute('class','chatcp_text');
    i2.setAttribute('style','font-size:9px;width:'+(w-16)+'px;');
    i2.setAttribute('cmdidx',i);
    i2.addEventListener('keyup',tHandler,true);
    i2.addEventListener('change',tHandler,true);
    td.appendChild(i1);
    td.appendChild(i2);
    tr.appendChild(td);
    t.appendChild(tr);
}

// update the interior of the panel during resizing
function updateCPSize(h) {
    var bars = document.getElementsByClassName('chatcpbar');
    for (var i=0;i<bars.length;i++) {
        var s = bars[i].getAttribute('style');
        bars[i].setAttribute('style',replaceOrAddStyle(s,'height',(h-4)+'px'));
    }
    var last = heightUnit(h);
    var ins = document.getElementById('chatcp_index'+last);
    if (!ins) {
        // we must have an entry 0
        var w = document.getElementById('chatcp_index0');
        if (w) {
            var t = w.parentNode;
            w = getStyleAttr(w.firstChild.firstChild.nextSibling.getAttribute('style'),'width');
            for (var i=1;i<last;i++) {
                ins = document.getElementById('chatcp_index'+i);
                if (!ins) {
                    newEntry(i,(w+16),t);
                }
            }
        }
    } else {
        var del = document.getElementById('chatcp_index'+last);
        while (del) {
            del.parentNode.removeChild(del);
            last++;
            del = document.getElementById('chatcp_index'+last);
        }
    }
    saveHeight(h);
}

// drag handler for resizing the panel
function dragGoSize(event)  {
    var y;
    // Get cursor position with respect to the page.
    y = event.clientY + window.scrollY;

    var delta = y - d.cursorStartY;
    if (delta!=0) {
        var newh = d.baseH + delta;
        if (newh>unitHeight(1) && newh<(dims.height+(dims.headerw? (dims.headert+16) : (dims.top+16)))) {
            newh = unitHeight(heightUnit(newh));
            delta = newh - d.baseH;
            d.cp.setAttribute('style',replaceOrAddStyle(d.cp.getAttribute('style'),'height',newh+'px'));
            d.cph.setAttribute('style',replaceOrAddStyle(d.cph.getAttribute('style'),'top',(d.baseO+delta)+'px'));
            updateCPSize(newh);
        }
    }
    event.preventDefault();
}

// terminate dragging to resize the panel
function dragStopSize(event)  {
    // Stop capturing mousemove and mouseup events.
    document.removeEventListener("mousemove", dragGoSize, true);
    document.removeEventListener("mouseup", dragStopSize, true);
    d = null;
}

function getMaxDimensions() {
    var chats = document.getElementsByClassName('chatdisplay');
    for (var i=0;i<chats.length;i++) {
        if (chats[i].style.display!='none') {
            var header = document.evaluate('.//div[@class="header"]',chats[i],null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
            dims = {top:Number(chats[i].style.top.replace(/[^0-9]+/,'')),width:Number(chats[i].clientWidth),height:Number(chats[i].style.height.replace(/[^0-9]+/,''))};
            if (header.singleNodeValue) {
                dims.headert = Number(header.singleNodeValue.style.top.replace(/[^0-9]+/,''));
                dims.headerw = Number(header.singleNodeValue.style.width.replace(/[^0-9]+/,''));
            }
            //GM_log('dimensions: top='+dims.top+', width='+dims.width+', height='+dims.height+', offw='+chats[i].offsetWidth+', cw='+chats[i].clientWidth);
			chats[i].addEventListener('scroll',setWidths,false);
            return;
        }
    }
}

function placeDockIcon(f) {
    var img=document.createElement('img');
    img.setAttribute('src',"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%0E%00%00%00%0C%08%06%00%00%00R%80%8C%DA%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00%06bKGD%00%00%00%00%00%00%F9C%BB%7F%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%00%07tIME%07%DC%03%1E%14)%06%E8D%1D%FA%00%00%00%19tEXtComment%00Created%20with%20GIMPW%81%0E%17%00%00%00%5BIDAT(%CF%ED%8F%A1%11%C0%20%10%04%97L%8Ay%85%A0%8F%EF%80b%9E%8EPt%81%A7%10%FC%23%A228TD%D6%9C%DA%99%DB%E0%EE%CE%017%40%CE%99Z%2BsNJ)%00%98%19%00)%A5M%EA%BD%3Fb%8C%91%D6%1A%00%AA%FA%DA1%06%22%B2%C9%E1%F4%EA%C5!%7F%E3%A7%1A%17%CC%8BJ%7F%13%D8%1D%F7%00%00%00%00IEND%AEB%60%82");
    if (dims.headerw) 
        img.setAttribute('style','position:absolute;top:'+(dims.headert+1)+'px;left:'+(dims.headerw-15)+'px;z-index:7;');
    else
        img.setAttribute('style','position:absolute;top:'+(dims.top+2)+'px;left:'+(dims.width-15)+'px;z-index:7;');
    img.setAttribute('title','Click to toggle display of chat control panel.');
    img.setAttribute('id','chatcp_dock');
    img.addEventListener('click',rollHandler,false);
    f.parentNode.insertBefore(img,f);
}


function initialize() {
    getMaxDimensions();
    if (dims) {
        addPanel();
    }
}

setTimeout(initialize,30);
