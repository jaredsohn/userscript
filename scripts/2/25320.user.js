// ==UserScript==
// @name           Mouse Rocking
// @namespace      http://rickyc.org
// @include        *
// ==/UserScript==

var leftBtnDown = false;
var rightBtnDown = false;
var BTN_LEFT = 0;
var BTN_RIGHT = 2;
var goAfterMouseup = 0;
var preventContextMenu = true;

function mrMouseDown(e)
{
	if(e.button == BTN_LEFT)
		leftBtnDown = true;
	else if(e.button == BTN_RIGHT)
		rightBtnDown = true;
		
	if(goAfterMouseup == 0)
	{
		if(e.button == BTN_LEFT && rightBtnDown)
			goAfterMouseup = -1;
		else if(e.button == BTN_RIGHT && leftBtnDown)
			goAfterMouseup = 1;
	}
}
window.addEventListener("mousedown",mrMouseDown,true);

function mrMouseUp(e)
{
	if(e.button == BTN_RIGHT && goAfterMouseup == 0)
		preventContextMenu = false;

	if(e.button == BTN_LEFT)
		leftBtnDown = false;
	else if(e.button == BTN_RIGHT)
		rightBtnDown = false;
		
	if(goAfterMouseup != 0 && !leftBtnDown && !rightBtnDown)
	{
		leftBtnDown = false;
		rightBtnDown = false;
		var tempGo = goAfterMouseup;
		goAfterMouseup = 0;
		history.go(tempGo);
	}
}
window.addEventListener("mouseup",mrMouseUp,true);

function mrContextMenu(e)
{
	if(goAfterMouseup != 0 || preventContextMenu)
		e.preventDefault();
	preventContextMenu = true;
	
}
window.addEventListener("contextmenu",mrContextMenu,true);