// ==UserScript==
// @name           Where my therad at
// @include        *//boards.4chan.org/*/res/*
// ==/UserScript==

/*
*      ___        _                       _                   _ ___ _    _     _  
*     | __|  _ __| |__  _  _ ___ _  _    | |_ ___  ___     _ | / __| |  (_)_ _| |_
*     | _| || / _| / / | || / _ \ || |_  |  _/ _ \/ _ \_  | || \__ \ |__| | ' \  _|
*     |_| \_,_\__|_\_\  \_, \___/\_,_( )  \__\___/\___( )  \__/|___/____|_|_||_\__|
*                       |__/         |/               |/                          
*/

//CSS styling of window

var css1 = "#B7C5D9"; //border colour, example: #000000
var css2 = "#EEF2FF"; //window's background's colour, example: #000000 
var css3 = "font-family: Helvetica, Arial, sans-serif"; //text inside window
var css4 = "#000"; //text colour, example: #000000
//you can't change the page number's colour from here

// Do not edit anything below

var d = document, board = d.location.href.match(/https?:\/\/boards\.4chan\.org\/[\w]+\//i);
var threadNo = location.pathname.match(/res\/([\d]+)/i);
var main = d.getElementsByName("delform")[0];
var ttt = null, running, stor = localStorage;

function Id(id) { return d.getElementById(id); }

function eL(a) {
	var handler = function() {
		if (ttt != null) {
			clearTimeout(ttt);
			ttt = null;
		}
		setTimeout(function () {
			doIndex(0);
		}, 500);
	};
	a ? Id('shouldi').removeEventListener("change", handler, false) : Id('shouldi').addEventListener("change", handler, false);
}

function doIndex(pg) {
	var b = Id('shouldi'), found = 0;
	if (running || !b.checked) { return; }
	eL(true);
	b.setAttribute("disabled", "");
	var c = Id('timerbox').value;
	cstatus.innerHTML = "Status:&nbsp;Searching";
	var num = parseInt(c);
	if (num > 600) { var timer = 600; c = "600"; }
	if (num < 30) { var timer = 30; c = "30"; }
	if (isNaN(num)) {
		var timer = 60;
		alert("Value entered is not a valid number! Defaulting to 60");
		c = "60";
	}
	if (!timer) { var timer = num; }

	xhr = new XMLHttpRequest();
	!running && (xhr.open("GET", board[0] + (0 === pg ? "" : pg), true), (running = true));
	xhr.setRequestHeader("Cache-Control", "no-cache");
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				var html = xhr.responseText.match(/<div class="postContainer opContainer".*?<\/div>[^<]*?<\/div>/gi);
				if (html) {
					var th = 1;
					html.some(function(pos){
						if (threadNo[1] == pos.match(/<a href="res\/([\d]+)"/i)[1]) {
							Id('page').innerHTML = pg+":"+(th==1?"1st":th==2?"2nd":th==3?"3rd":th+"th");
							cstatus.innerHTML = "Status:&nbsp;Done";
							found = 1;
							return true;
						}
						th++;
					});
				}
			}

			if (found) {
				ttt = setTimeout(function () {
					doIndex(0);
				}, timer * 1000);
				eL(false);
				b.removeAttribute("disabled");
			} else {
				if (pg < 10) {
					doIndex(pg + 1);
				} else {
					cstatus.innerHTML = "Status:&nbsp;404?";
					xhtml = new XMLHttpRequest();
					xhtml.open("GET", board[0] + threadNo[0], true);
					xhtml.setRequestHeader("Cache-Control", "no-cache");
					xhtml.onreadystatechange = function () {
						if (xhtml.readyState == 4) {
							if (xhtml.status == 404) {
								cstatus.innerHTML = "Status:&nbsp;404";
								Id('page').innerHTML = "404";
								b.checked = false;
							} else {
								cstatus.innerHTML = "Status:&nbsp;Alive";
								setTimeout(function () {
									doIndex(0);
								}, 1000);
								b.removeAttribute("disabled");
								eL(false);
							}
						}
					};
					xhtml.send(null);
				}
			}
		}
	};
	xhr.send(null);
	running = false;
}

var ui = d.createElement('div'), iB = "span style=\"display: inline-block; margin: 0 5px", imp = "!important";
ui.className = 'desktop';
ui.id = "w";
ui.style.cssText = 'position: ' + (stor.lepos || 'absolute') + '; top: ' + (stor.letop || '16px') + '; ' + (stor.leleft ? ('left: '+stor.leleft+';') : 'right: 300px;') + ' width: 135px;' + (css2 ? " background-color: " + css2 + imp + ";" : "") + (css3 ? " " + css3 + imp + ";" : "") + (css4 ? " color: " + css4 + imp + ";" : "") + ' border: 1px solid' + (css1 ? " " + css1 + imp : "") +'; -moz-border-radius: 10px; border-radius: 10px; z-index: 3';
ui.innerHTML = '<center style="cursor: move; padding: 5px;">Thread status</center><span style="display: block; width: 100%; border-bottom-style: solid; border-bottom-width: 1px;'+ (css1 ? "border-color: " + css1 + imp : "") +'"></span><'+iB+'">Page:&nbsp;<font id="page" color="red">-1</font></span><'+iB+'" id="checkcheck"><label for="shouldi">Check thread:&nbsp;</label><input id="shouldi" type="checkbox"></span><'+iB+'">Interval:&nbsp;<input value="60" maxlength="3" size="3" id="timerbox" type="text" style="height: 15px"></span><'+iB+'" id="checkstatus">Status:&nbsp;Ready</span><'+iB+' 5px"><label for="stcik">Sticky popup:&nbsp;</label><input type="checkbox" id="stcik"'+("fixed" === stor.lepos && "checked")+'></span>';

d.body.appendChild(ui);
var cstatus = Id('checkstatus'), moveEl = Id('w'), m1 = moveEl.firstChild;

function startDrag(e) {
	if (e.type === 'touchstart') {
		m1.onmousedown = null;
		m1.ontouchmove = moveDrag;
		m1.ontouchend = function () {
			m1.ontouchmove = null;
			m1.ontouchend = null;
			m1.ontouchstart = startDrag;
		};
	} else {
		d.onmousemove = moveDrag;
		d.onmouseup = function () {
			d.onmousemove = null;
			d.onmouseup = null;
		};
	}

	function getCoors(e) {
		var coors = new Array(2);
		(e.touches && e.touches.length) && (e = e.touches[0]);
		coors[0] = e.clientX;
		coors[1] = e.clientY;
		return coors;
	}

	var pos = [moveEl.offsetLeft,moveEl.offsetTop];
	var origin = getCoors(e);

	function moveDrag(e) {
		var currentPos = getCoors(e);
		moveEl.style.right = "";
		var deltaX = currentPos[0] - origin[0];
		var deltaY = currentPos[1] - origin[1];
		moveEl.style.left = stor.leleft = (pos[0] + deltaX) + 'px';
		moveEl.style.top  = stor.letop = (pos[1] + deltaY) + 'px';
	}
	return false;
}

m1.onmousedown = m1.ontouchstart = startDrag;

function stick(e) {
	var we = Id('w');
	if (!e.target.checked) {
		we.style.position = stor.lepos = "absolute";
		we.style.top = stor.letop = (parseInt(we.style.top) + window.pageYOffset) + 'px';
	}else{
		we.style.position = stor.lepos = "fixed";
		we.style.top = stor.letop = (parseInt(we.style.top) - window.pageYOffset) + 'px';
	}
}

Id('stcik').addEventListener('change',stick,false);

var cstatus = Id('checkstatus');
cstatus.innerHTML = "Status:&nbsp;Ready";
eL(false);
Id('shouldi').click();
