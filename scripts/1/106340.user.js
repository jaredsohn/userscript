// ==UserScript==
// @name           MulliganMover
// @namespace      st
// @description    moves mulligan all around
// @include        *
// ==/UserScript==

//EDIT THIS TO FIT YOUR SCREEN RESOLUTION!
var screen_width=1920;
var screen_height=1080;

var toolbar_height=90;

var img_w=320;
var img_h=240;

var img_movespeed_x=5;
var img_movespeed_y=5;

//EDIT NO MORE!

var img_pos_x=0;
var img_pos_y=0;

var dir_hor=true;
var dir_vert=true;

var img = document.createElement('img');
img.setAttribute('src', 'http://oi53.tinypic.com/4v1dao.jpg');
img.setAttribute('name', 'jim');
img.setAttribute('id', 'jim');
img.setAttribute('style', 'position:fixed;');
document.body.appendChild(img);

randomize()
moveAround();


function randomize(){
	img_movespeed_x=Math.floor(Math.random()*10)+2;
	if(Math.random() < 0.25)	img_movespeed_y=Math.floor(Math.random()*10)+2;	else	img_movespeed_y=img_movespeed_x;
	img_pos_x=Math.floor(Math.random()*(1920-img_w));
	img_pos_y=Math.floor(Math.random()*(1080-toolbar_height-img_h));
	dir_hor=Math.random() < 0.5;
	dir_vert=Math.random() < 0.5;
}

function moveAround(){
	document.getElementById("jim").style.left  = (img_pos_x+'px');
	document.getElementById("jim").style.top  = (img_pos_y+'px');
	if(dir_hor)		img_pos_x+=img_movespeed_x;	else	img_pos_x-=img_movespeed_x;
	if(dir_vert)	img_pos_y+=img_movespeed_y;	else	img_pos_y-=img_movespeed_y;
	setTimeout(moveAround,20);
	
	if(dir_hor && img_pos_x>=(screen_width-img_w)){
		dir_hor=!dir_hor;
	}else if(!dir_hor && img_pos_x<(0)){
		dir_hor=!dir_hor;
	}
	if(dir_vert && img_pos_y>=(screen_height-img_h-toolbar_height)){
		dir_vert=!dir_vert;
	}else if(!dir_vert && img_pos_y<(0)){
		dir_vert=!dir_vert;
	}
}
