// ==UserScript==
// @name        TrollShaker
// @description    Whenever a key is pressed, any active window will rotate just a wee bit, enought to be extremely annoying. 
// @description    Troll made by Lanjelin
// @include     *.*/*/*/*/*/*/*
// @include     *.*/*/*/*/*/*
// @include     *.*/*/*/*/*
// @include     *.*/*/*/*
// @include     *.*/*/*
// @include     *.*/*
// @include     *.*
// @version     1
// @require     http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==


function getDegree() {
	var number = 1 + Math.floor(Math.random() * 6);
	var direction = 1 + Math.floor(Math.random() * 6);
	if (direction >= 4) {
		turnIt(number);
	} else {
		turnIt('-'+number);
	}
}

function turnIt(degrees) {
    $('html').css({
  '-webkit-transform' : 'rotate('+degrees+'deg)',
     '-moz-transform' : 'rotate('+degrees+'deg)',  
      '-ms-transform' : 'rotate('+degrees+'deg)',  
       '-o-transform' : 'rotate('+degrees+'deg)',  
          'transform' : 'rotate('+degrees+'deg)',  
               'zoom' : 1

    });
}


$(document).keypress(function(){
  getDegree();
}); 
$(document).click(function(event) {
  getDegree();
}); 