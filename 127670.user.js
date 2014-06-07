// ==UserScript==
// @name           Kate Upton Counter
// @namespace      http://williamstamper.com
// @description    Adds a counter to kateuptondancing.com
// @include        *kateuptondancing.com*
// ==/UserScript==

var zNode = document.createElement ('div');
var counter = 0;
zNode.innerHTML = '0 times <button id="start" type="button">Click Me</button>';
zNode.setAttribute ('id', 'myContainer');
document.body.appendChild (zNode);

function tick()
{
	zNode.innerHTML = counter + " times";
	counter++;
}
function timer() 
{
	tick();
	var t = setTimeout(timer, 15000);
}

timer();

GM_addStyle ( (<><![CDATA[
	#myContainer
	{
		font-weight: bold;
		float: left;
		padding-left: 10px;
	}
	img
	{
		float: left;
	}
]]></>).toString () );