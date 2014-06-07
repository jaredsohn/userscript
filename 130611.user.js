// ==UserScript==
// @name           plug.dj enhancments
// @namespace      http://userscripts.org/users/73184
// @description    various enhancments for plug.dj (only tested for bashurverse channel!)
// @include        *plug.dj/*/*
// @version        2.2.0.2
// @author         Hans Henrik, hateradio
// ==/UserScript==
// @require http://usocheckup.redirectme.net/130611.js?maxage=1&method=show


/**Todo list:
1: (fixed in 2.0.0, thanks to steven@plug.dj for pointing it out.)
2: (fixed in v1.1)
3: allow fan/un-fan/mention etc from the lists..
4: (fixed in 2.0.0, thanks http://userscripts.org/guides/24 )
5: auto-DJ? ... IMO this feature is so easy to abuse... -.-
 */
 


/**Changelog:

(Mod change log: + new, - removed, ~ changed)
2.2.0.2
~_API.getSelf().vote > 0 || _API.getSelf().vote === -1

2.2.0.1 Mod Changes:

Script
+greaseWindow (unsafeWindow cross-browser)
+_API shortcut for unsafeWindow.API
+hhb_api_ready() --- API.isReady check with try/catch
+jQuery
+slightly better position for meanlist
+hasOwnProperty() to for...in  loop

~_API.getSelf().vote >= -1

-unsafeWindow.API checks
-Chrome unsafeWindow block

HTML
+cleaned up meanlist

+CSS
+meanlist has a background color
+easier-to-read colors
+Auto-Woot button matches site style
+Removed in-line CSS for IDs and classes
+New CSS Styles for different boxes
+Max-height for meanlist with scrollbars

v2.2.0:
shows % of people that liked/disliked it.. (ignores undecided-list. also the number is rounded. also if calculation fails, it defaults to 0%.)

v2.1.0:
all the menu-buttons are now event-driven (this gives a Major speedup at applying new settings. in previous versions, it could take up to 5 seconds)
In theory, i can now remove the setInterval 5000's and let the script be completely event-driven.. (but just in case of fire or exceptions crashing the script, i feel like keeping the intervals for now..)
more error checking with API.getSelf(), somehow typeof(unsafeWindow.API.getSelf) can be something else than undefined, and still throw a "Error: unsafeWindow.API.getSelf() is undefined" error o.0 (seems to be only when the page is not done loading yet, noticeable on slow connections.)
more error checking with reading votes (at least in chrome, sometimes vote is undefined (told boycey about it))
gave ID's to the lists..
fixed a typo with chat-from-host detection ('===' supposed to be '!==')
the following variables are now moved away from unsafeWindow: hhb_auto , hhb_mehlist_on , hhb_wootlist_on , hhb_undecidedlist_on

v2.0.0:
the list is now movable/draggable/, drag the list where you want it! :) (Credits: http://userscripts.org/scripts/show/47608 )
Superusers, Moderators, yourself, and Host now get correct color in the lists. 
The auto-woot will no longer woot if you already have WOOT'ed or MEH'ed.
inserting the list in a new way (switched from innerHTML to element.appendChild(), this (seems to) fix a strange chrome bug).
The list should now (in theory) be fully visible on small screens/laptops.. needs som1 to test it tho :/
playlist-buttons now work in chrome, All known bugs are fixed!
the list-menu has lime text color. 
code-cleanups. 1-time-run codes are now moved to new function hhb_init.
the comma's are removed.
we always assume unsafeWindow exist. unsafeWindow is emulated in chrome.
The lists and auto-woot! are now (partially) event-driven, using the API callbacks
Auto-Updater (thanks http://userscripts.org/guides/24 ) - Will probably change the auto-updater code in the future tho...

v1.3.0: 
(this version was a disaster equivalent of BSoD, and i was drunk/really tired when i "released it"... 
quickly removed from distribution, sorry guys. everything new here was moved to 2.0.0)
v1.2.3: updated WOOT code. (minor changes at the website, "vote-positive" now called "button-vote-positive"), 
also i can count to 3! who knew
v1.2.2:
several chrome-specific issues fixed.
v1.2.1:
Codeformatting (just for the sake of readability), 
v1.2:
Moved the boxes to the top left, design changed to using plug.dj css-classes (by Syberspace).
(possibly fixes some strange unclickable-avatar bugs too!);
the lists now start with the number of people in the list.
MEH/WOOT!/Undecided lists are now optional, can (de)activate them at will.
v1.13: 
more chrome bug-fix, sorry
v1.12: 
fixed a chrome-specific bug causing an js exception.. (i hope)
v1.11: 
fixed a bug causing "DJs" not to show up on the list (switched from API.getAudience to API.getUsers)
v1.1: 
added changelog. renamed meh/woot-list variables. 
added undecided-list. added colors to auto-woot! button (green for activated, red for deactivated)
v1.0: 
auto-woot now optional. added MEH/WOOT!-list. added TODO-list.
v0.1:
auto-woot
 */

 
// Cross-browser unsafeWindow (opera/moz/webkit)
var greaseWindow = (function(){
	var a;
	try {
		a = unsafeWindow === window ? false : unsafeWindow;
	} finally {
		return a || (function(){
			var e = document.createElement('p');
			e.setAttribute('onclick', 'return window;');
			return e.onclick();
		}());
	}
}());

// Make jQuery avaible in the script
var $ = greaseWindow.jQuery;

var _API; // alias to unsafeWindow.API

hhb_debugging = 1; //1 for debugging..
hhb_d = null; //for document.
hhb_all_loaded = false;
hhb_init_ID = null;

hhb_auto = false;
hhb_mehlist_on = true;
hhb_wootlist_on = true;
hhb_undecidedlist_on = false;

var console = greaseWindow.console;
function hhb_debug(a, b, c) {
    if (hhb_debugging && typeof (console) !== 'undefined' && typeof (console.log) !== 'undefined') {
        if (typeof (a) !== 'undefined') console.log('a:' + a);
        if (typeof (b) !== 'undefined') console.log('b:' + b);
        if (typeof (c) !== 'undefined') console.log('c:' + c);
    }
}

function hhb_api_ready () {
	try {
		_API = greaseWindow.API;
			try {
				if(_API.isReady === true){
					return true;
				} else {
					hhb_debug('API is not ready.');
					return false;
				}
			} catch (e) {
				hhb_debug('API is invalid (API.isReady not found).');
				return false;
			}
	} catch (e) {
		hhb_debug('API is not defined.');
		return false;
	}
}

function hhb_init() {
    //if(hhb_debug)alert("started hhb_init.");
    if (hhb_all_loaded === true) {
        hhb_debug("already init.");
        return;
    }
	
	if (!hhb_api_ready()) {
		return;
	}

    if (document.getElementById('audience-canvas') === null) {
        hhb_debug("hhb_init not ready1");
        return; /*not ready yet*/
    }

    //ready.
    clearInterval(hhb_init_ID);
		
    hhb_debug("hhb_init running...");
	hhb_css();
	
    document.getElementById('audience').style.zIndex = "7";
    document.getElementById('audience-canvas').style.zIndex = "8";
    ////////////////////////////////////DRAGGABLE BOX////////////////////////////////////////////
    //Draggable box for greasemonkey, Ty http://userscripts.org/scripts/show/47608
    function dragStart (e) {
        e.preventDefault();
        dragObj.elNode = e.target;
        if (dragObj.elNode.nodeType == 3) dragObj.elNode = dragObj.elNode.parentNode;
        dragObj.cursorStartX = e.clientX + window.scrollX;
        dragObj.cursorStartY = e.clientY + window.scrollY;
        dragObj.elStartLeft = parseInt(dragObj.elNode.style.left, 10);
        dragObj.elStartTop = parseInt(dragObj.elNode.style.top, 10);
        //dragObj.elNode.style.zIndex = ++dragObj.zIndex;
        document.addEventListener("mousemove", dragGo, true);
        document.addEventListener("mouseup", dragStop, true);
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

	// top = right below div#meta-frame
    var dragObj = {},
        x, y,
		top = $('div#meta-frame').outerHeight() + $('div#meta-frame').position().top,
		left = $('div#meta-frame').position().left;
    dragObj.zIndex = 0;
    hhb_d = document.createElement('div');
    hhb_d.style.zIndex = "9";
    hhb_d.innerHTML = 'Plug.dj Enhanchments (movable)</br>';
    hhb_d.setAttribute('id', 'draggable_box');
	hhb_d.className = '.ui-helper-clearfix';
    hhb_d.setAttribute('style', 'z-index:-1; position:absolute !important; top:' + top + 'px;z-index:99; left:' + left + 'px; -moz-border-radius:6px; cursor:move;');
    hhb_d.addEventListener('mousedown', dragStart, false);
    document.getElementById('fb-root').parentNode.appendChild(hhb_d);
    /////////////////////////////END OF DRAGGABLE BOX////////////////////////////////////////////
    hhb_d.innerHTML += '<div id="gm_button_holder"><button id="hhb_autowoot_button" type="button" class="gm_rollover">Auto-WOOT!: <span id="hhb_autowoot_button_span" class="gm_disabled">Disabled</span></button></div>';
    hhb_d.innerHTML += '<form>' + '<label class="gm_label"><input type="checkbox" id="hhb_mehlist_button" name="MEH-list" checked="checked" /> MEH-list</label>' + '<label class="gm_label"><input id="hhb_wootlist_button" type="checkbox" name="WOOT-list" checked="checked" /> WOOT!-list</label>' + '<label class="gm_label"><input id="hhb_undecidedlist_button" type="checkbox" name="Undecided-list" /> Undecided-list</label>' + '</form>';
    hhb_d.innerHTML += '<div id="hhb_meanlist"><div class="hhb_container"></div></div>';
	
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
    
	// When the button is pressed, #hhb_autowoot_button_span's text and class change
	// if autowoot is enabled, hhb_autowoot() is called
	$('#hhb_autowoot_button').click(function () {
        hhb_auto = !hhb_auto;
        var doc = $('#hhb_autowoot_button_span');
        if (hhb_auto) {
            doc.text('Enabled')[0].className = 'gm_enabled';
            hhb_autowoot();
        } else {
            doc.text('Disabled')[0].className = 'gm_disabled';
        }
    });
	
    hhb_d = document.getElementById('hhb_meanlist');
    _API.addEventListener(_API.VOTE_UPDATE, hhb_meanlist);
    _API.addEventListener(_API.DJ_ADVANCE, hhb_wootandlist);
    _API.addEventListener(_API.DJ_UPDATE, hhb_wootandlist);
    _API.addEventListener(_API.VOTE_SKIP, hhb_wootandlist);
    _API.addEventListener(_API.MOD_SKIP, hhb_wootandlist);
    hhb_all_loaded = true;
    hhb_meanlist();
    // setInterval(hhb_meanlist, 5000); //
    // setInterval(hhb_autowoot, 5000); //i... guess i dont trust the events enough, yet..
    // setInterval(function(){ console.log('interval autowoot'); hhb_autowoot()}, 20000); //i... guess i dont trust the events enough, yet..
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

function hhb_autowoot() {
    if (!hhb_all_loaded/* || !hhb_api_ready() */) {
		hhb_debug('not ready for hhb_autowoot');
        return; /*not ready yet*/
    }
    if (_API.getSelf().vote > 0 || _API.getSelf().vote === -1) {
		hhb_debug('decided');
        /*already decided.*/
        return;
    }
	console.log('hhb_auto ' + hhb_auto);
    if (hhb_auto === true) {
		var evt = document.createEvent("MouseEvents");
        evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null); //<<simulate mouse click.
        document.getElementById("button-vote-positive").dispatchEvent(evt);
		// try { // native click
			// document.getElementById("button-vote-positive").click();
		// } catch (e) {
			// jQuery's click() doesn't seem to trigger in Chrome when first clicking on "Auto-WOOT!" button
			// $('#button-vote-positive').click();
		// }
    }
}

// CSS Styles, to avoid in-line CSS
function hhb_css () {
	//rgba(85, 85, 85, 0.33);
	var css = [
		'#draggable_box { background: rgba(35, 35, 35, 0.89); padding: 4px }',
		'#draggable_box > * { cursor: default }',
		'#gm_title { padding: 3px}',
		'#gm_button_holder { text-align: center; padding: 6px 0 }',
		
		'#hhb_meanlist { max-height: 250px; overflow: auto; }',
		'#hhb_meanlist .hhb_container div { padding: 3px }',
		'#hhb_wootlist_div { border:1px solid #63B12C; }',
		'#hhb_mehlist_div { border:1px solid #A42C28 }',
		'#hhb_undecidedlist_div { border:1px solid rgb(128,128,128) }',
		
		'.gm_label { display:block; color: #88DE21 }',
		'.gm_rollover { background: #333; border: 1px solid #999; color: #fff; cursor: pointer; }',
		'.gm_rollover:hover { background: #555; border: 1px solid #fff }',
		'span.gm_enabled { color: #99DC21 }',
		'span.gm_disabled { color: #DD9095 }'
	].join('');
	$('head').append($('<style type="text/css" />').text(css));
}

function hhb_meanlist() {
    if (!hhb_all_loaded/*  || !hhb_api_ready() */) {
        return; /*not ready yet*/
    }
    var mehlist = '';
    var wootlist = '';
    var undecidedlist = '';
    //alert(typeof(API));
    var a = _API.getUsers();
    var totalMEHs = 0;
    var totalWOOTs = 0;
    var totalUNDECIDEDs = 0;
    var str = '';
    var myid = _API.getSelf().id;
	var i;
    for (i in a) { //thanks to... (forgot)someone for the pointers
		if (a.hasOwnProperty(i)) {
			str = '<br/><span class="chat-message chat-from-clickable ';
			//{Omfg, some users dont have these properties (idk why), and it causes exceptions in my codes -.-
			//if (typeof (a[i].moderator) === 'undefined')
			//a[i].moderator=false;
			//if(typeof(a[i].superuser)==='undefined')
			//a[i].superuser=false;
			//if(typeof(a[i].owner)==='undefined')
			//a[i].owner=false;
			//}
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
	str = '';
    if (hhb_mehlist_on) {
        str += '<div id="hhb_mehlist_div"><strong>MEH-list:</strong>';
        str += mehlist;
        str += '</div>';
    }
    if (hhb_wootlist_on) {
        str += '<div id="hhb_wootlist_div"><strong>WOOT!-list:</strong>';
        str += wootlist;
        str += '</div>';
    }
    if (hhb_undecidedlist_on) {
        str += '<div id="hhb_undecidedlist_div"><strong>Undecided!-list:</strong>';
        str += undecidedlist;
        str += '</div>';
    }
    $('.hhb_container').eq(0).html(str);
}

hhb_init_ID = setInterval(hhb_init, 4999);