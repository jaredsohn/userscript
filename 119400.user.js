// ==UserScript==
// @name           ETI Color Scheme Randomizer
// @namespace      pendevin
// @description    Randomly generates a new color scheme every page load
// @include        http://endoftheinter.net*
// @include        http://boards.endoftheinter.net*
// @include        http://images.endoftheinter.net*
// @include        http://archives.endoftheinter.net*
// @include        https://endoftheinter.net*
// @include        https://boards.endoftheinter.net*
// @include        https://images.endoftheinter.net*
// @include        https://archives.endoftheinter.net*
// @exclude        http://endoftheinter.net/?r=*
// @exclude        http://wiki.endoftheinter.net/img/*
// @exclude        http://images.endoftheinter.net/img/*
// @exclude        https://endoftheinter.net/?r=*
// @exclude        https://wiki.endoftheinter.net/img/*
// @exclude        https://images.endoftheinter.net/img/*
// ==/UserScript==

//
//  **BEGIN USER SETTINGS**
//

//When true, the script automatically changes the color scheme after a set amount of time as well as each page load
const Timer=true;

//User defined values
//when Timer is true, defines the interval between color scheme changes
const Minutes=5;
const Seconds=0;

//When true, the script changes the color scheme whenever the 'R' key is pressed
const RRRR=false;

//
//	**END USER SETTINGS**
//

//adds a style to a document and returns the style object
//css is a string, id is an optional string that determines the object's id
function addStyle(css,id){
	var style=document.createElement('style');
	style.type='text/css';
	style.innerHTML=css;
	if(id)
		style.id=id;
	document.head.appendChild(style);
	return style;
}

//Converts an RGB color value to HSV. Conversion formula
//adapted from http://en.wikipedia.org/wiki/HSV_color_space.
//Assumes r, g, and b are contained in the set [0, 255] and
//returns hin the set [0, 360] and, s and v in the set [0, 1].
function rgbToHsl(r,g,b){
	r/=255, g/=255, b/=255;
	var max=Math.max(r,g,b), min=Math.min(r,g,b);
	var h, s, l=(max+min)/2;
	if(max==min)
		h=s=0; // achromatic
	else{
		var d=max-min;
		s=l>0.5?d/(2-max-min):d/(max+min);
		if(max==r)
			h=(g-b)/d+(g<b?6:0);
		else if(max==g)
			h=(b-r)/d+2;
		else if(max==b)
			h=(r-g)/d+4;
		h/=6;
	}
	return [Math.round(h*360), Math.round(s*100), Math.round(l*100)];
}

//takes a color <decimal rgb> and returns a contrasting color
//99% guaranteed readable, 50% guaranteed ugly
function complement(color){
	var hsl=rgbToHsl(color[0],color[1],color[2]);
	hsl[0]=(hsl[0]+180)%360;

	if(hsl[1]<=40)
		hsl[1]=hsl[1]+60;
	else if(hsl[1]<=50)
		hsl[1]=100;
	else if(hsl[1]>=60)
		hsl[1]=hsl[1]-60;
	else if(hsl[1]>50)
		hsl[1]=0;

	if(hsl[2]<=40)
		hsl[2]=hsl[2]+60;
	else if(hsl[2]<50)
		hsl[2]=100;
	else if(hsl[2]>=60)
		hsl[2]=hsl[2]-60;
	else if(hsl[2]>=50)
		hsl[2]=0;
	return hsl;
}

//takes a number and changes it to a random number in a range centered on the input, weighted towards the center
//(input number <0-1>, acceptable range of output <fraction of 1>)
function fudge(input,range){
	var output=range*Math.tan(Math.PI*(Math.random()/2-.25))/2+input;
	if(output>1)
		output=output+range/2;
	else if(output<0)
		output=output-range/2;
	return output;
}

function fudger(color){
	return [Math.round(fudge(color[0]/360,.3)*360),Math.round(fudge(color[1]/100,.2)*100),Math.round(fudge(color[2]/100,.2)*100)];
}

function randomColor(){
	return [Math.round(Math.random()*255),Math.round(Math.random()*255),Math.round(Math.random()*255)];
}

function randomize(){
	var bg1=randomColor()
	var color1=complement(bg1);
	var color11=fudger(color1);
	var color12=fudger(color1);

	var bg2=randomColor();
	var color2=complement(bg2);
	var color21=fudger(color2);
	var color22=fudger(color2);

	var bg3=randomColor();
	var color3=complement(bg3);
	var color31=fudger(color3);
	var color32=fudger(color3);

	var bg4=randomColor();
	var color4=complement(bg4);
	var color41=fudger(color4);
	var color42=fudger(color4);

	var bg5=randomColor();
	var color5=complement(bg5);
	var color51=fudger(color5);
	var color52=fudger(color5);

	var bg6=randomColor();
	var color6=complement(bg6);
	var color61=fudger(color6);
	var color62=fudger(color6);

	var css="\
		div.menubar, table.classic tr th, table.classic tr th.title, div.stats{\
			background-color:rgb("+bg1[0]+","+bg1[1]+","+bg1[2]+");\
			color:hsl("+color1[0]+","+color1[1]+"%,"+color1[2]+"%);\
		}\
		div.menubar a, table.classic tr th a, div.menubar a:visited, table.classic tr th a:visited, div.stats a, div.stats a:visited{\
			color:hsl("+color1[0]+","+color1[1]+"%,"+color1[2]+"%);\
		}\
		div.menubar a:hover, table.classic tr th a:hover, div.stats a:hover{\
			color:hsl("+color11[0]+","+color11[1]+"%,"+color11[2]+"%);\
		}\
		div.menubar a:active, table.classic tr th a:active, div.stats a:active{\
			color:hsl("+color12[0]+","+color12[1]+"%,"+color12[2]+"%);\
		}\
		\
		div.userbar{\
			background-color:rgb("+bg2[0]+","+bg2[1]+","+bg2[2]+");\
			color:hsl("+color2[0]+","+color2[1]+"%,"+color2[2]+"%);\
		}\
		div.userbar a, div.userbar a:visited{\
			color:hsl("+color2[0]+","+color2[1]+"%,"+color2[2]+"%);\
		}\
		div.userbar a:hover{\
			color:hsl("+color21[0]+","+color21[1]+"%,"+color21[2]+"%);\
		}\
		div.userbar a:active{\
			color:hsl("+color22[0]+","+color22[1]+"%,"+color22[2]+"%);\
		}\
		table.poll div{\
			background-color:rgb("+bg2[0]+","+bg2[1]+","+bg2[2]+");\
		}\
		div.graph{\
			background-color:rgb("+bg2[0]+","+bg2[1]+","+bg2[2]+");\
			border-color:hsl("+color4[0]+","+color4[1]+"%,"+color4[2]+"%);\
		}\
		.quickpost-expanded .quickpost{\
			border-top-color:rgb("+bg2[0]+","+bg2[1]+","+bg2[2]+");\
		}\
		\
		div.infobar, table.grid tr th, div.pager{\
			background-color:rgb("+bg3[0]+","+bg3[1]+","+bg3[2]+");\
			color:hsl("+color3[0]+","+color3[1]+"%,"+color3[2]+"%);\
		}\
		div.infobar a, table.grid tr th a, div.infobar a:visited, table.grid tr th a:visited, div.pager a, div.pager a:visited{\
			background-color:rgb("+bg3[0]+","+bg3[1]+","+bg3[2]+");\
			color:hsl("+color3[0]+","+color3[1]+"%,"+color3[2]+"%);\
		}\
		div.infobar a:hover, table.grid tr th a:hover, div.pager a:hover{\
			color:hsl("+color31[0]+","+color31[1]+"%,"+color31[2]+"%);\
		}\
		div.infobar a:active, table.grid tr th a:active, div.pager a:active{\
			color:hsl("+color32[0]+","+color32[1]+"%,"+color32[2]+"%);\
		}\
		.quoter-button{\
			background-color:rgb("+bg3[0]+","+bg3[1]+","+bg3[2]+");\
			color:hsl("+color3[0]+","+color3[1]+"%,"+color3[2]+"%);\
			border-color:rgb("+bg2[0]+","+bg2[1]+","+bg2[2]+");\
		}\
		a.quoter-button:visited{\
			color:hsl("+color3[0]+","+color3[1]+"%,"+color3[2]+"%);\
		}\
		\
		body{\
			background:rgb("+bg4[0]+","+bg4[1]+","+bg4[2]+");\
			color:hsl("+color4[0]+","+color4[1]+"%,"+color4[2]+"%);\
		}\
		textarea.locked, .quickpost{\
			background-color:rgb("+bg4[0]+","+bg4[1]+","+bg4[2]+");\
		}\
		.imagemap{\
			background-color:rgb("+bg4[0]+","+bg4[1]+","+bg4[2]+");\
			border-color:rgb("+bg2[0]+","+bg2[1]+","+bg2[2]+");\
		}\
		a{\
			color:hsl("+color41[0]+","+color41[1]+"%,"+color41[2]+"%);\
		}\
		a:visited{\
			color:hsl("+color42[0]+","+color42[1]+"%,"+color42[2]+"%);\
		}\
		a span.m{\
			border-bottom-color:hsl("+color41[0]+","+color41[1]+"%,"+color41[2]+"%);\
		}\
		a:visited span.m{\
			border-bottom-color:hsl("+color42[0]+","+color42[1]+"%,"+color42[2]+"%);\
		}\
		table.grid tr td, table.grid tr th{\
			border-color:rgb("+bg4[0]+","+bg4[1]+","+bg4[2]+");\
		}\
		\
		table.search th, table.search tr td, div.graph span, table.message-body tr td.message, div.message, table.message-body tr td.userpic, table.grid tr td,\
		.image_grid .grid_block .block_desc,.quoted-message .message-top{\
			background-color:rgb("+bg5[0]+","+bg5[1]+","+bg5[2]+");\
			color:hsl("+color5[0]+","+color5[1]+"%,"+color5[2]+"%);\
		}\
		table.message-body tr td.message a, div.message a, table.grid tr td a, .image_grid .grid_block .block_desc a, .quoted-message a,\
		.quoted-message .message-top a{\
			color:hsl("+color51[0]+","+color51[1]+"%,"+color51[2]+"%);\
		}\
		table.message-body tr td.message a:visited, div.message a:visited, table.grid tr td a:visited, .image_grid .grid_block .block_desc a:visited,\
		.quoted-message a:visited, .quoted-message .message-top a:visited{\
			color:hsl("+color52[0]+","+color52[1]+"%,"+color52[2]+"%);\
		}\
		.quoted-message{\
			background-color:rgb("+bg5[0]+","+bg5[1]+","+bg5[2]+");\
			color:hsl("+color5[0]+","+color5[1]+"%,"+color5[2]+"%);\
			border-left-color:rgb("+bg6[0]+","+bg6[1]+","+bg6[2]+");\
		}\
		.quickpost .quickpost-nub{\
			background-color:rgb("+bg5[0]+","+bg5[1]+","+bg5[2]+");\
			color:hsl("+color5[0]+","+color5[1]+"%,"+color5[2]+"%);\
			border-color:rgb("+bg2[0]+","+bg2[1]+","+bg2[2]+");\
		}\
		\
		div.message-top{\
			background-color:rgb("+bg6[0]+","+bg6[1]+","+bg6[2]+");\
			color:hsl("+color6[0]+","+color6[1]+"%,"+color6[2]+"%);\
		}\
		div.message-top a{\
			color:hsl("+color61[0]+","+color61[1]+"%,"+color61[2]+"%);\
		}\
		div.message-top a:visited{\
			color:hsl("+color62[0]+","+color62[1]+"%,"+color62[2]+"%);\
		}\
		\
		span.window-header-title{\
			color:#000000;\
		}\
	";

	if(document.getElementById('Random_Colors'))
		document.head.removeChild(document.getElementById('Random_Colors'));
	addStyle(css,'Random_Colors');
}

randomize();
if(Timer)
	window.setInterval(randomize,Minutes*60000+Seconds*1000);
if(RRRR)
	document.addEventListener('keypress',function(e){if(e.ctrlKey&&e.charCode==114)randomize();},false);
GM_registerMenuCommand("Randomize Color Scheme",randomize,"R");