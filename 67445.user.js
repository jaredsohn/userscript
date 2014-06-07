// ==UserScript==
// @name           GLB Parse Test Builds
// @namespace      monsterkill
// @include        http://test.goallineblitz.com/game/game.pl?game_id=*
// @include        http://test.goallineblitz.com/game/replay.pl?game_id=*
// ==/UserScript==

        GM_xmlhttpRequest({
            method: 'GET',
            url: "http://test.goallineblitz.com/game_summaries/"+ /game\_id\=(\d+)/i.exec(window.location)[1] +".txt",
            headers: {
                'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
                'Accept': 'application/xml,text/xml'
            },
            onload: parsePlayerList
        });

var players = {};
function parsePlayerList(response) {
    var txt = response.responseText; 
    var result;

    var currentPlayerId = null;
    while (result = /(.*?)(\s*)(\d*).*?\|(.+?)\|(.+?)\|(.+?)\|(.+?)\|(.+?)\|(.+?)\|(.+?)\|(.+?)\|(.+?)\|(.+?)\|(.+?)\|\|(.+?)\|(.+?)\|(.+?)\|(.+?)\|(.+?)\|(.+?)\|(.+?)\n/gi.exec(txt)) {
            if (result != null && result.length > 3) {
                if (result[3]!=null && parseInt(result[3]) > 0 ) {
                    currentPlayerId = result[3];
                    // first line of a build                    
                    players[currentPlayerId] = {
                        str: result[6],
                        spd: result[7],
                        agi: result[8],
                        jmp: result[9],
                        stm: result[10],
                        vis: result[11],
                        con: result[12],
                        blk: result[13],
                        tak: result[14],
                        thr: result[15],
                        cat: result[16],
                        car: result[17],
                        kck: result[18],
                        pnt: result[19],
                        SA: result[20],
                        VA: result[21]
                    };
                } else {
                    // overflow line                                    
                    if (currentPlayerId != null) {
                        players[currentPlayerId].SA += result[20];                
                        players[currentPlayerId].VA += result[21];
                    }
                }
            } else {
                GM_log('error parsing a line: '+result);
            }
    }
    
    // we have the player data now add the mouse handlers
    // get every link on the page
    var iterator = document.evaluate('//a',
                                        document,
                                        null,
                                        XPathResult.ORDERED_NODE_ITERATOR_TYPE ,
                                        null);
    
    var node = iterator.iterateNext();
    // if a link is to a player page then add a tooltip listener to it
    var pattern = /player\_id=(\d+)/gi;
    while (node) {
        var link = node.href;
        var r;
        if (r = pattern.exec(link)) {
            node.addEventListener('mouseover', showBuild, false);
            node.addEventListener('mouseout', unset_tip, false);
        }
        pattern.compile(pattern);
        node = iterator.iterateNext();
    }
    GM_log('done adding handlers');
}
function showBuild(evt) {
    var pattern = /player\_id=(\d+)/gi;
    pattern.compile(pattern);
    if (r = pattern.exec(evt.target)) {
        set_tip(getPlayerText(r[1]), 0, 1, 1, 1, 0);        
    } else {
        alert('couldnt parse player id');
        GM_log(r);
    }
}

function getPlayerText(pid) {
        var playerText = "";
        for (att in players[pid]) {
            if (att != 'SA' && att!= 'VA') {
                playerText += att + " : " + players[pid][att] + "<br/>";
            } else {
                //additional line break for SA and VA
                playerText += "<br/>"+att + " : " + players[pid][att] + "<br/>";
            }
        }
        return playerText;
}


// 1-second delayed tooltips (or immediate if specified)

var tt_above = 0;
var tt_left = 0;
var tt_follow = 0;
var tt;

var _tt_timer;

mouseInit();

function create_tip() {
	if (!document.getElementById('tip')) {
		var newDiv = document.createElement("div");
		newDiv.id = "tip";
		newDiv.className = "tip";
		newDiv.style.visibility = 'hidden';
		newDiv.style.display = 'none';
		newDiv.style.position = 'absolute';
		newDiv.style.zIndex = '255';
		newDiv.style.width = '200px';
		newDiv.style.height = '40px';
		
		var tip_content  = '<div class="tt_rounded">';
		tip_content     += ' <div class="tt_top"><div><center><p>&nbsp;</p></center></div></div>';
		tip_content     += ' <div class="tt_content" id="tip_content"></div>';
		tip_content     += '<div class="tt_bot"><div><center><p>&nbsp;</p></center></div></div></div>';
		
		newDiv.innerHTML = tip_content;	

		document.body.appendChild(newDiv);

		if (window.addEventListener) {
			window.addEventListener('mousemove', checkTipMovement, false);
		}
		else if (document.all) {
			document.attachEvent("onmousemove", checkTipMovement);
		}
	}
}

function startTooltipTimer() {
	_tt_timer = setTimeout("enableTooltip()", 1000);
}

function enableTooltip() {
	if (tt == 1) {
		tt = 2;
		show_tip();
	}

	if (_tt_timer) {
		clearTimeout(_tt_timer);
	}
}

function checkTipMovement() {
	if (tt && tt_follow && !_tt_timer) {
		show_tip();
	}
}

function set_tip(text, lft, abv, immediate, followmouse, unrounded) {
	create_tip();
	
	// document.getElementById('tip_content').innerHTML = text;

	if (lft) {tt_left = 1;} else {tt_left = 0;}
	if (abv) {tt_above = 1;} else {tt_above = 0;}

	if (unrounded) {
		document.getElementById('tip').innerHTML = '<div class="tt_content_unrounded" id="tip_content">' + text + '</div>';
		document.getElementById('tip').style.width = '';
	}
	else {
		var tip_content  = '<div class="tt_rounded">';
		tip_content     += ' <div class="tt_top"><div><center><p>&nbsp;</p></center></div></div>';
		tip_content     += ' <div class="tt_content" id="tip_content">' + text + '</div>';
		tip_content     += '<div class="tt_bot"><div><center><p>&nbsp;</p></center></div></div></div>';
		document.getElementById('tip').style.width = '200px';
		
		document.getElementById('tip').innerHTML = tip_content;
	}
	
	if (immediate) {
		tt = 2;
		show_tip();
	}
	else {
		tt = 1;
		startTooltipTimer();
	}
		
	if (followmouse) {tt_follow = 1;} else {tt_follow = 0;}
}

function unset_tip() {
	create_tip();

	document.getElementById('tip_content').innerHTML = "";
	tt = 0;
	if (_tt_timer) {
		clearTimeout(_tt_timer);
	}
	tt_left = 0;
	tt_above = 0;
	hide_tip();
}

function check_tip() {
	if (tt == 2) {
		show_tip();
	}
}

function show_tip() {
	create_tip();

	var left = 0;
	var top = 0;

	if (tt_left) {
		left = (mouseX - parseInt(document.getElementById('tip').style.width));
	}
	else {
		left = (mouseX + 7);
	}

	if (tt_above) {
		if (document.getElementById('tip').offsetHeight > 0) {
			top = (mouseY - parseInt(document.getElementById('tip').offsetHeight));
		}
		else {
			top = mouseY - 45;
		}
	}
	else {
		top = (mouseY + 5);
	}

	document.getElementById('tip').style.left = left + 'px';
	document.getElementById('tip').style.top = top + 'px';
	document.getElementById('tip').style.visibility = "visible";
	document.getElementById('tip').style.display = "block";
}

function hide_tip() {
	create_tip();

	var tip = document.getElementById('tip');
	if (tip) {
		tip.style.top = '100px';
		tip.style.left = '100px';
		// Hide it
		tip.style.visibility = "hidden";
		tip.style.display = "none";
	}
}

// Commonly used mouse functions with basic function stubs
//
// mouseMoveHandler(e) - define custom mouse move stuff
// mouseLeftClickHandler(e) - define left click actions
// mouseRightClickHandler(e) - define right click actions
// mouseUpHandler(e) - handle mouseup actions
// keyCustomHandler(key) - handle keypresses

function mouseInit() {
	if (document.all) {
		document.oncontextmenu = _handle_mouseClick;
		document.onmousemove = _handle_mouseMove;
		document.onmousedown = _handle_mouseClick;
		document.onmouseup = _handle_mouseUp;
		document.onkeypress = _handle_keyHandler;
	}
	else {
		if (window.addEventListener) {
			window.addEventListener('keypress', _handle_keyHandler, false);
			window.addEventListener('contextmenu', _handle_mouseClick, false);
			window.addEventListener('mousedown', _handle_mouseClick, false);
			window.addEventListener('mousemove', _handle_mouseMove, false);
			window.addEventListener('mouseup', _handle_mouseUp, false);
		}
		else {
			window.captureEvents(Event.KEYPRESS);
			window.captureEvents(Event.MOUSEMOVE);
			window.oncontextmenu = _handle_mouseClick;
			window.onmousemove = _handle_mouseMove;
			window.onmousedown = _handle_mouseClick;
			window.onmouseup = _handle_mouseUp;
			window.onkeypress = _handle_keyHandler;
		}
	}
}

var mouseX = 0;
var mouseY = 0;
var oldMouseX = 0;
var oldMouseY = 0;
function _handle_mouseMove(event) {
	if (document.all) {
		mouseX = window.event.clientX + document.documentElement.scrollLeft
		  + document.body.scrollLeft;
		mouseY = window.event.clientY + document.documentElement.scrollTop
		  + document.body.scrollTop;
	}
	else if (window.opera) {
		mouseX = event.pageX;
		mouseY = event.pageY;
	}
	else {
		mouseX = event.clientX + window.scrollX;
		mouseY = event.clientY + window.scrollY;
	}

	var ret;

	try {
		ret = mouseMoveHandler(event);
	} catch(e) {return true;}

	oldMouseX = mouseX;
	oldMouseY = mouseY;

	return ret;
}

function _handle_mouseClick(e) {
	var button;

	if (document.all) {e = window.event; button = window.event.button;}
				 else {button = e.which;}

	if (button == 1) {
		try {
			return mouseLeftClickHandler(e);
		} catch(e) {return true;}			
	}
	else {
		if (button == 2 || button == 3) {
			try {
				return mouseRightClickHandler(e);
			} catch(e) {return true;}
		}
	}
	return true;
}

function _handle_mouseUp(e) {
	try {
		return mouseUpHandler(e);
	} catch(e) {return true;}
}

function _handle_keyHandler(e) {
	var key;
	if (document.all) {key = window.event.keyCode;}
				 else {key = e.which;}

	try {
		return keyCustomHandler(key);
	} catch(e) {return true;}
}

GM_addStyle(" \
\
.tt_top div  { background: url(/images/game/tooltip_ul.gif) no-repeat top left;} \
.tt_top      { background: url(/images/game/tooltip_ur.gif) no-repeat top right; } \
.tt_bot div  { background: url(/images/game/tooltip_ll.gif) no-repeat bottom left; } \
.tt_bot      { background: url(/images/game/tooltip_lr.gif) no-repeat bottom right; } \
.tt_top div, .tt_top, .tt_bot div, .tt_bot { \
	width: 100%; \
	height: 10px; \
	font-size: 1px; \
}\
.tt_top div p {\
	background-color: #263ea4;\
	border-top: 1px solid black;\
	width: 93%;\
	height: 9px;\
}\
.tt_bot p {\
	margin: 0px;\
	background-color: #263ea4;\
	border-bottom: 1px solid black;\
	width: 93%;\
	height: 9px;\
}\
.tt_content  {\
	margin: 0 0px;\
	background-color: #263ea4;\
	border-left: 1px solid black;\
	border-right: 1px solid black;\
	color: white;\
    text-align: center;\
    padding-left: 5px;\
    padding-right: 5px;\
}\
.tt_content_unrounded {\
	margin: 0 0px;\
	background-color: white;\
	border: 1px solid black;\
    text-align: center;\
	padding: 0px;\
}\
.tt_rounded { width: 200px; margin: auto; }\
.skill_tip {\
	text-align: left;\
	color: #EEEEEE;	\
}\
.skill_name {\
	font-size: 14px;\
	font-weight: bold;\
	color: #FFFFFF;\
}");
