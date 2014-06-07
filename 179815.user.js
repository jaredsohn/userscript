// ==UserScript==
// @name          Floating XY_position
// @namespace     http://www.myspace.com/squirrelslax
// @description   Places a Position Box in top left
// @include       http://manulan.co.il/*
// ==/UserScript==


var myHaxMenu = document.createElement("div");
myHaxMenu.innerHTML = '<style type="text/css">'
+'<!--'
+'#myhaxlayer #table1 a {'
+'text-decoration: none !important;'
+'color: #000000 !important;'
+'font-family: Verdana, Arial, Helvetica, sans-serif !important;'
+'font-size: 10px !important;'
+'font-weight: bold !important;'
+'font-style: normal !important;'
+'}'
+'#myhaxlayer #table1 a:hover {'
+'text-decoration: none !important;'
+'color: #0000FF !important;'
+'font-family: Verdana, Arial, Helvetica, sans-serif !important;'
+'font-size: 10px !important;'
+'font-weight: bold !important;'
+'font-style: normal !important;'
+'}'
+'#myhaxlayer #table1 {'
+'background-color: #CCCCCC !important;'
+'}'
+'textarea.CommentBox {'
+'width:100px;'
+'height:50px;'
+'padding:5px;'
+'color:FFFFFF;'
+'font-size:8pt;'
+'font-family:Verdana;'
+'border-color:959385;'
+'border-style:solid;'
+'background-color:333333;'
+'}'
+'-->'
+'</style>'
+'<div style="position: fixed; width: 100px; height: 100px; z-index: 100; right; top: 0pt; left: 0pt" id="myhaxlayer">'
+'<table border="0" width="100%" id="table1" bgcolor="#C0C0C0">'
+'<tr><td><p align="left" id="x_pos"> x=123 </td></tr>'
+'<tr><td><p align="left" id="y_pos"> y=321 </td></tr>'
+'</table></div>'
document.body.insertBefore(myHaxMenu, document.body.firstChild);

function onmousemove_func(e)
{
	x=e.pageX;
	y=e.pageY;
	z=document.getElementById("x_pos");
	z.innerText="x: " +x;
	z=document.getElementById("y_pos");
	z.innerText="y: " +y;
};

document.onmousemove=onmousemove_func;