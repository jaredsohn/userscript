// ==UserScript==
// @name          GrepoMapPlanquadrate
// @namespace     
// @description   Grepolis Planquadrate
// @version       0.1
// @include       http://*.grepolis.*/game/map*
// ==/UserScript==

function addCoordsToTitle()
{
	// Individuelle Einstellungen - Sollte jeder für sich anpassen
	var x1=400;
	var x2=700;
	var xTiles=9;
	var xChars="ABCDEFGHIKLMNOPQRSTUVWXYZ";
	
	var y1=500;
	var y2=800;
	var yTiles=9;

	// Hier beginnt das Script
	var x,y;
	x=document.getElementById("xcoord").value;
	y=document.getElementById("ycoord").value;

	var quadrXSize,quadrYSize;
	quadrXSize=(x2-x1)/xTiles;
	quadrYSize=(y2-y1)/yTiles;
	
	var coords,dx,xPos;
	if (x<x1 || x>x2 || y<y1 || y>y2)
	{
		coords="[??]";
	}
	else
	{
		dx=x-x1;
		xPos=Math.floor(dx/quadrXSize);
		coords=xChars[xPos];
		dy=y-y1;
		yPos=Math.floor(dy/quadrYSize)+1;
		coords="["+xChars[xPos]+yPos+"]";
	}
	
	var title;
	title=document.title;
	title=title.replace(/ \[.*$/,"");
	title=title+" "+coords;
	document.title=title;
};

window.setInterval(addCoordsToTitle, 200);
