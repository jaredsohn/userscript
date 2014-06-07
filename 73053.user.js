// ==UserScript==
// @name           Sanki SpeedAnki.com Shortcuts
// @namespace      #nlf
// @description    Adds keyboard shortcuts to speedanki site
// @include        http://*speedanki.com/cards.php*
// @version        0.1.2
// ==/UserScript==

var sankiMD = false;
var sankiOrig = {x:0, y:0};
var sankiShiftDown = false;

function sankiBack() { var sbm = document.getElementsByName('sbm'); for (i=0; i < sbm.length; i++) { if (sbm[i].value == 'BACK') sbm[i].click(); }}
function sankiNext() { var sbm = document.getElementsByName('sbm'); for (i=0; i < sbm.length; i++) { if (sbm[i].value == 'NEXT') sbm[i].click(); } }
function sankiFlip() { var sbm = document.getElementsByName('sbm'); for (i=0; i < sbm.length; i++) { if (sbm[i].value == 'FLIP') sbm[i].click(); }}
function sankiGetCat() { var found = -1; for (i = 1; i <= 5; i++) { var chk = document.getElementById('fld' + i); if (chk && chk.checked) found = i; } return found; }
function sankiCat(cat) { var chk = document.getElementById('fld' + cat); if (chk) chk.click(); }
function sankiExample() { var ex = document.getElementById('example'); if (ex) ex.click(); }
function sankiMeaning() { var mn = document.getElementById('meaning'); if (mn) mn.click(); }
function sankiMoveCat(up) {
	var i = sankiGetCat(); //get current category
	if (i > 0) {
		if (up) {
			if (i > 1) i--; else i = 5;
			sankiCat(i); //click the radio button for category
		}
		else {
			if (i < 5) i++; else i = 1;
			sankiCat(i); //click the radio button for category
		}
	}
}

function sankiMouseDown(e)
{
	if (!e) e = window.event;

	if (e.button == 1)
	{
		sankiMD = true;
		sankiOrig.x = e.clientX;
		sankiOrig.y = e.clientY;
	}
}

function sankiMouseUp(e)
{
	if (!e) e = window.event;

	if (e.button == 1)
	{
		var x = e.clientX - sankiOrig.x;
		var y = e.clientY - sankiOrig.y;
		
		if (Math.abs(x) > Math.abs(y) && Math.abs(x) > 60) //left/right move bigger and significant
		{
			if (x > 0) {
				if (!sankiShiftDown)
					sankiNext();
				else
					sankiMeaning();
			}
			else
			{
				if (!sankiShiftDown)
					sankiBack();
				else
					sankiExample();
			}
		}
		else if (Math.abs(y) > 60) //up/down move bigger
		{
			if (!sankiShiftDown)
				sankiFlip();
			else
				if (y < 0)
					sankiMoveCat(true);
				else
					sankiMoveCat(false);
		}
	}
}

function sankiKeyDown(e)
{
	if (!e) e = window.event;
	
	if (e.keyCode == '16') //shift
	{
		//GM_log('shift down');
		sankiShiftDown = true;
	}
}

function sankiKeyUp(e)
{
	if (!e) e = window.event;
	
	if (e.keyCode == '37') //left
	{
		if (!sankiShiftDown)
			sankiBack();
		else
			sankiExample();
	}
	else if (e.keyCode == '39') //right
	{
		if (!sankiShiftDown)
			sankiNext();
		else
			sankiMeaning();
	}
	else if (e.keyCode == '38' || e.keyCode == '40') //flip
	{
		if (!sankiShiftDown)
			sankiFlip();
		else
			if (e.keyCode == '38')
				sankiMoveCat(true);
			else
				sankiMoveCat(false);
	}
	else if (e.keyCode == '16') //shift released
	{
		//GM_log('shift up');
		sankiShiftDown = false;
	}
}

function addEvent(obj, evType, fn){ 
 if (obj.addEventListener){ 
   obj.addEventListener(evType, fn, false); 
   return true; 
 } else if (obj.attachEvent){ 
   var r = obj.attachEvent("on"+evType, fn); 
   return r; 
 } else { 
   return false; 
 } 
}
var body = document.getElementsByTagName('body')[0];
addEvent(window, 'mousedown', sankiMouseDown);
addEvent(window, 'mouseup', sankiMouseUp);
addEvent(window, 'keydown', sankiKeyDown);
addEvent(window, 'keyup', sankiKeyUp);
