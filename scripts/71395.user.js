// ==UserScript==
// @name           DS Processing Test
// @description    bindet Processing.js via greasemonkey ein
// @include        http://*.tribalwars.*/game.php*
// @require https://github.com/jeresig/processing-js/raw/master/processing.js
// ==/UserScript==

//Canvas erzeugen
var mycanvas = document.createElement("canvas");
mycanvas.width=canvaswidth=250;
mycanvas.height=canvasheigth=250;

//Canvas irgendwo hinsetzen
freieStelle=document.getElementById("menu_row").parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
freieStelle.appendChild(mycanvas);

//Processing für Canvas starten
Processing(mycanvas,""+<![CDATA[
	//Start Processing Code
	boolean togglecolor=true;
	void setup(){
		size(canvaswidth,canvasheigth);
		strokeWeight(10);
		ellipseMode(RADIUS);
		frameRate(30);
		fill(0,121,184);
		stroke(255);
	}
	void draw(){
		background(#F0E0D0);
		ellipse( width/2, height/2, Math.abs(width/2-mouseX), Math.abs(height/2-mouseY));
	}
	void mousePressed(){
		if(togglecolor){
			fill( 121, 0, 184 );
			togglecolor=false;
		}else{
			fill(0, 121, 184 );
			togglecolor=true;
		}
	}
	//Ende Processing Code
]]>);