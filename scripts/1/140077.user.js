// ==UserScript==
// @name           plug.dj D&B Room Enhanced
// @namespace      Punkred
// @include        http://www.plug.dj/drum-bass/
// @include        www.plug.dj/drum-bass/
// @include        socketio.plug.dj/drum-bass/
// @include        http://socketio.plug.dj/drum-bass/
// @include        http://www.plug.dj/punkreds-room/
// @include        www.plug.dj/punkreds-room/
// @version        2.1
// @updateURL      https://raw.github.com/Punkred/DnBplug/plug/plug.js
// @downloadURL    https://raw.github.com/Punkred/DnBplug/plug/plug.js
// ==/UserScript==

//plug enhanced

hhb_debugging = 0; //1 for debugging..
hhb_d = null; //for document.
hhb_all_loaded = false;
hhb_init_ID = null;

hhb_auto = false;
hhb_mehlist_on = true;
hhb_wootlist_on = true;
hhb_undecidedlist_on = false;


function hhb_debug(a, b, c) {
    if (hhb_debugging && typeof (console) !== 'undefined' && typeof (console.log) !== 'undefined') {
        if (typeof (a) !== 'undefined') console.log('a:' + a);
        if (typeof (b) !== 'undefined') console.log('b:' + b);
        if (typeof (c) !== 'undefined') console.log('c:' + c);
    }
}

function hhb_init() {
    //if(hhb_debug)alert("started hhb_init.");
    if (hhb_all_loaded === true) {
        hhb_debug("already init.");
        return;
    }

    if (document.getElementById('audience-canvas') === null) {
        hhb_debug("hhb_init not ready1");
        return; /*not ready yet*/
    }
    if (typeof (unsafeWindow) !== 'undefined' && (typeof (unsafeWindow.API) === 'undefined' || typeof (unsafeWindow.API.getSelf) === 'undefined' || typeof (unsafeWindow.API.getSelf()) === 'undefined')) {
        hhb_debug("hhb_init not ready2");
        return; /*not ready yet*/
    }
    if (typeof (unsafeWindow) === 'undefined' && (typeof (API) === 'undefined' || typeof (API.getSelf) === 'undefined' || typeof (API.getSelf()) === 'undefined')) {
        hhb_debug("hhb_init not ready3");
        return; /*not ready yet. chrome-specific.*/
    }
    //ready.
    clearInterval(hhb_init_ID);

    hhb_debug("hhb_init running...");
    document.getElementById('audience').style.zIndex = "7";
    document.getElementById('audience-canvas').style.zIndex = "8";
    ////////////////////////////////////DRAGGABLE BOX////////////////////////////////////////////
    //Draggable box for greasemonkey, Ty http://userscripts.org/scripts/show/47608
    function dragStart(e) {
        dragObj.elNode = e.target;
        if (dragObj.elNode.nodeType == 3) dragObj.elNode = dragObj.elNode.parentNode;
        dragObj.cursorStartX = e.clientX + window.scrollX;
        dragObj.cursorStartY = e.clientY + window.scrollY;
        dragObj.elStartLeft = parseInt(dragObj.elNode.style.left, 10);
        dragObj.elStartTop = parseInt(dragObj.elNode.style.top, 10);
        //dragObj.elNode.style.zIndex = ++dragObj.zIndex;
        document.addEventListener("mousemove", dragGo, true);
        document.addEventListener("mouseup", dragStop, true);
        e.preventDefault();
    }

    function dragGo(e) {
        e.preventDefault();
        var x = e.clientX + window.scrollX,
            y = e.clientY + window.scrollY;
        dragObj.elNode.style.left = (dragObj.elStartLeft + x - dragObj.cursorStartX) + "px";
        dragObj.elNode.style.top = (dragObj.elStartTop + y - dragObj.cursorStartY) + "px";
    }

    function dragStop(e) {
        document.removeEventListener("mousemove", dragGo, true);
        document.removeEventListener("mouseup", dragStop, true);
    }

    var dragObj = new Object(),
        x, y;
    dragObj.zIndex = 0;
    hhb_d = document.createElement('div');
    hhb_d.style.zIndex = "9";
    hhb_d.innerHTML = 'Plug.dj Enhanchments (movable)<br/>';
    hhb_d.setAttribute('id', 'draggable_box');
    hhb_d.setAttribute('style', 'z-index:-1; position:absolute !important; top:' + /*((window.innerHeight/2)-50)+*/ '0px;z-index:99; left:' + /*((window.innerWidth/2)-50)+*/ '0px; -moz-border-radius:6px; cursor:move;');
    hhb_d.addEventListener('mousedown', function (e) {
        dragStart(e);
    }, false);
    document.getElementById('fb-root').parentNode.appendChild(hhb_d);
    /////////////////////////////END OF DRAGGABLE BOX////////////////////////////////////////////
    //hhb_d.innerHTML += '<button id="hhb_autowoot_button" type="button" style="cursor:default;" >Auto-WOOT!: <span style=\'color:rgb(233,6,6);\'>Disabled</span>.</button>';
    hhb_d.innerHTML += '<form style="cursor:default;">' + '<input type="checkbox" id="hhb_mehlist_button" name="MEH-list" checked="checked" /> <span style="color:lime;">MEH-list</span> ' + '<input id="hhb_wootlist_button" type="checkbox" name="WOOT-list" checked="checked" /> <span style="color:lime;">WOOT!-list</span><br/>' + '<input id="hhb_undecidedlist_button" type="checkbox" name="Undecided-list" /><span style="color:lime;">Undecided-list</span>' + '</form>';
    hhb_d.innerHTML += '<span id="hhb_meanlist" style="cursor:default;"></span>';
    document.getElementById('hhb_mehlist_button').addEventListener('change', function () {
        hhb_mehlist_on = !hhb_mehlist_on;
        hhb_meanlist();
    });
    document.getElementById('hhb_wootlist_button').addEventListener('change', function () {
        hhb_wootlist_on = !hhb_wootlist_on;
        hhb_meanlist();
    });
    document.getElementById('hhb_undecidedlist_button').addEventListener('change', function () {
        hhb_undecidedlist_on = !hhb_undecidedlist_on;
        hhb_meanlist();
    });
    //firefox 12 bug? add this code right below creation of the button, and this happens: document.getElementById('hhb_autowoot_button').addEventListener('mouseover',function(){alert("getElementById is returning the correct button object. this event is never activated. button exists, cus im looking right at it.");});
    //document.getElementById('hhb_autowoot_button').addEventListener('click', function (e) {
    //    hhb_auto = !hhb_auto;
    //    var doc = document.getElementById('hhb_autowoot_button');
        //To experience Inception, un-comment the line below, and play with the button :P  (click at it in the corners; at least it works in chrome)
        //		doc =e.target;
    //    if (hhb_auto) {
    //        doc.innerHTML = 'Auto-WOOT!: <span style=\'color:rgb(0,138,5);\'>Enabled</span>.';
    //        hhb_autowoot();
    //    } else {
    //        doc.innerHTML = 'Auto-WOOT!: <span style=\'color:rgb(233,6,6);\'>Disabled</span>.';
    //    }
    //});
    hhb_d = document.getElementById('hhb_meanlist');
    unsafeWindow.API.addEventListener(unsafeWindow.API.VOTE_UPDATE, hhb_meanlist);
    unsafeWindow.API.addEventListener(unsafeWindow.API.DJ_ADVANCE, hhb_wootandlist);
    unsafeWindow.API.addEventListener(unsafeWindow.API.DJ_UPDATE, hhb_wootandlist);
    unsafeWindow.API.addEventListener(unsafeWindow.API.VOTE_SKIP, hhb_wootandlist);
    unsafeWindow.API.addEventListener(unsafeWindow.API.MOD_SKIP, hhb_wootandlist);
    hhb_all_loaded = true;
    hhb_meanlist();
    setInterval(hhb_meanlist, 5000); //
    setInterval(hhb_autowoot, 5000); //i... guess i dont trust the events enough, yet..
}

function hhb_wootandlist() {
    hhb_autowoot();
    hhb_meanlist();
}

function hhb_removeElement(e) {
    if (typeof (e) !== 'undefined' && typeof (e.parentNode) !== 'undefined') {
        e.parentNode.removeChild(e);
    }
}

//function hhb_autowoot() {
//    if (!hhb_all_loaded) {
//        return; /*not ready yet*/
//    }
//    if (typeof (unsafeWindow.API.getSelf().vote) !== 'undefined' && unsafeWindow.API.getSelf().vote != 0) { //Sometimes (in chrome at least) "vote" is undefined, and sometimes, its 0... -.- (told boycey/scallywag about it.)
//        /*already decided.*/
//        return;
//    }
//    if (hhb_auto == true) {
//        var evt = document.createEvent("MouseEvents");
//        evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null); //<<simulate mouse click.
//        document.getElementById("button-vote-positive").dispatchEvent(evt);
//    }
//}



function hhb_meanlist() {
    if (!hhb_all_loaded) {
        return; /*not ready yet*/
    }
    var mehlist = '';
    var wootlist = '';
    var undecidedlist = '';
    //alert(typeof(API));
    var a = unsafeWindow.API.getUsers();
    var totalMEHs = 0;
    var totalWOOTs = 0;
    var totalUNDECIDEDs = 0;
    var str = '';
    var myid = unsafeWindow.API.getSelf().id
    for (i in a) { //thanks to... (forgot)someone for the pointers
        str = '<br/><span class="chat-message chat-from-clickable ';
        ///{Omfg, some users dont have these properties (idk why), and it causes exceptions in my codes -.-
        ///if (typeof (a[i].moderator) === 'undefined')
        //a[i].moderator=false;
        //if(typeof(a[i].superuser)==='undefined')
        //a[i].superuser=false;
        //if(typeof(a[i].owner)==='undefined')
        //a[i].owner=false;
        ///}
        if (typeof (a[i].superuser) !== 'undefined' && a[i].superuser == true) {
            str += 'chat-from-super ';
        } else if (typeof (a[i].moderator) !== 'undefined' && a[i].moderator == true) {
            str += 'chat-from-moderator ';
        }
        if (typeof (a[i].owner) !== 'undefined' && a[i].owner != false) {
            str += 'chat-from-host '; //i guess owner==host
        }
        if (a[i].id === myid) {
            str += 'chat-from-you ';
        }
        str += '" onclick="Javascript:void(0);" onmouseover="Javascript:void(0);">' + a[i].username + '</span>'; //TODO: what do we need to do to make the avatar-info-modal thing appear? x.x
        if (typeof (a[i].vote) !== 'undefined' && a[i].vote == -1) {
            //          if (!hhb_mehlist_on) continue;
            totalMEHs++;
            mehlist += str; //
        } else if (typeof (a[i].vote) !== 'undefined' && a[i].vote == +1) {
            //          if (!hhb_wootlist_on) continue;
            totalWOOTs++;
            wootlist += str; //
        } else {
            //          if (!hhb_undecidedlist_on) continue;
            totalUNDECIDEDs++;
            undecidedlist += str; //
        }
    }
    var totalDECIDED = totalWOOTs + totalMEHs;
    var totalMEHsPercentage = Math.round((totalMEHs / totalDECIDED) * 100);
    var totalWOOTsPercentage = Math.round((totalWOOTs / totalDECIDED) * 100);
    if (isNaN(totalMEHsPercentage) || isNaN(totalWOOTsPercentage)) {
        //hhb_debug('calculation failed, defaulting to 0.');
        totalMEHsPercentage = totalWOOTsPercentage = 0;
    }

    mehlist = ' ' + totalMEHs.toString() + ' (' + totalMEHsPercentage.toString() + '&#37;)' + mehlist;
    wootlist = ' ' + totalWOOTs.toString() + ' (' + totalWOOTsPercentage.toString() + '&#37;)' + wootlist;
    undecidedlist = ' ' + totalUNDECIDEDs.toString() + undecidedlist;

    //dmFyIHN0cj0nPHRhYmxlIGJvcmRlcj0iMSIgc3R5bGU9ImJvcmRlci13aWR0aDoxMHB4O2JvcmRlci1jb2xvcjpyZ2IoMjMzLDYsNik7YmFja2dyb3VuZC1jb2xvcjpyZ2IoMjMzLDYsNik7Ij48dHI+PHRkPk1FSC1saXN0Oic7DQpzdHIrPW1laGxpc3Q7DQpzdHIrPSc8L3RkPjwvdHI+PC90YWJsZT48dGFibGUgYm9yZGVyPSIxIiBzdHlsZT0iYm9yZGVyLXdpZHRoOjEwcHg7Ym9yZGVyLWNvbG9yOnJnYigwLDEzOCw1KTtiYWNrZ3JvdW5kLWNvbG9yOnJnYigwLDEzOCw1KTsiPjx0cj48dGQ+V09PVCEtbGlzdDonOw0Kc3RyKz13b290bGlzdDsNCnN0cis9JzwvdGQ+PC90cj48L3RhYmxlPjx0YWJsZSBib3JkZXI9IjEiIHN0eWxlPSJib3JkZXItd2lkdGg6MTBweDtib3JkZXItY29sb3I6cmdiKDEyOCwxMjgsMTI4KTtiYWNrZ3JvdW5kLWNvbG9yOnJnYigxMjgsMTI4LDEyOCk7Ij48dHI+PHRkPlVuZGVjaWRlZCEtbGlzdDonOw0Kc3RyKz11bmRlY2lkZWRsaXN0Ow0Kc3RyKz0nPC90ZD48L3RyPjwvdGFibGU+Jzs=
    str = '<div style="position:absolute; top:auto; left:5px">';
    str += '<div class="frame-background">';
    if (hhb_mehlist_on) {
        str += '<div id="hhb_mehlist_div" style="border:1px solid rgb(233,6,6);"><span style="font-weight:bold">MEH-list:</span>';
        str += mehlist;
        str += '</div>';
    }
    if (hhb_wootlist_on) {
        str += '<div id="hhb_wootlist_div" style="border:1px solid rgb(0,138,5); "><span style="font-weight:bold">WOOT!-list:</span>';
        str += wootlist;
        str += '</div>';
    }
    if (hhb_undecidedlist_on) {
        str += '<div id="hhb_undecidedlist_div" style="border:1px solid rgb(128,128,128); "><span style="font-weight:bold">Undecided!-list:</span>';
        str += undecidedlist;
        str += '</div>';
    }
    str += '</div></div>';
    hhb_d.innerHTML = str;
}


if (window.navigator.vendor.match(/Google/)) { //yet another chrome-specific code..
    var div = document.createElement("div");
    div.setAttribute("onclick", "return window;");
    unsafeWindow = div.onclick();
};
hhb_init_ID = setInterval(hhb_init, 4999);

//github.

javascript: (function () { 
var jsCode = document.createElement('script'); 
jsCode.setAttribute('id', 'plugbot-js'); 
jsCode.setAttribute('src', 'https://raw.github.com/Punkred/DnBplug/plug/plug.js'); 
document.body.appendChild(jsCode); }());
