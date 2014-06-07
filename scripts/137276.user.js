// ==UserScript==
// @name           United Colors of Leprosorium (now with thicker frames)
// @namespace      ryotsuke
// @description    Разноцветные рамки для подсветки комментариев пользователей. Скрипт честно спижжен (http://userscripts.org/scripts/review/59915), дабы помочь полуслепым и сделать наконец рамочки потолще.
// @include        http://leprosorium.ru/comments/*
// @include        http://*.leprosorium.ru/comments/*
// @include        http://dirty.ru/comments/*
// ==/UserScript==


(function(){
	
	if ( typeof(unsafeWindow)!="undefined") 
	{
		w = unsafeWindow; 
	} else {
		w = window;	
	}
 
w.allUserPosts = function(className){
	if(w.matchClass(w.$('content'), className)){
		w.removeClass(w.$('content'), className);
		return false;
	}
	var color =  randomColor();
	var css = ""
	css += "." + className + " ." + className + " .dt {border:2px solid " + color + "; border-width:2px 2px 0 2px; padding:5px 5px 0.5em 5px;} ";
	css += "." + className + " ." + className + " .dd .p {border:2px solid " + color + "; border-width:0 2px 2px 2px; padding:0 5px 5px 5px;} ";
	css += "." + className + " .shrinked" + " .dd .p {border-width:1px;} ";
	w.addStyleProperties(css);
	w.addClass(w.$('content'), className);
	return false;
}

function randomColor() {
  var color = new Array();
  color[0]=128+Math.floor(Math.random()*128);
  color[1]=128+Math.floor(Math.random()*128);
  color[2]=128+Math.floor(Math.random()*128);

  color[Math.floor(Math.random()*3)]=Math.floor(Math.random()*128);

  if(Math.floor(Math.random()*2)==1) {
    color[Math.floor(Math.random()*3)]=Math.floor(Math.random()*128);
  }

  return getHex(color[0],color[1],color[2]);
}
 // changeColour
 function changeColour(e){
      // change the text colour of this element
      e.animate({ color: randomColor() }, 1000);

 }
 // intToHex()
 function intToHex(n){
 	n = n.toString(16);
 	// eg: #0099ff. without this check, it would output #099ff
 	if( n.length < 2)
 		n = "0"+n;
 	return n;
 }


function getHex(r, g, b){
 	return '#'+intToHex(r)+intToHex(g)+intToHex(b);
 }
})();
                                                                                         
 
 
 