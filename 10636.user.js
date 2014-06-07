// ==UserScript==
// @name           Travian center village help v.1.0
// @namespace      Travian
// @description    Center village help
// @include        http://*travian*/dorf2*
// ==/UserScript==

var hint_offset_x=-100;
var hint_offset_y=-100;
var hint_length=200;

var map=document.getElementsByName("map1")[0].childNodes;
for(var i=0;i<map.length;i++) {
	map[i].addEventListener('mouseover',hint_on,false);
	map[i].addEventListener('mouseout',hint_off,false);
}

var map2=document.getElementsByName("map2")[0].childNodes;
for(var i=0;i<map2.length;i++) {
	map2[i].addEventListener('mouseover',hint_on,false);
	map2[i].addEventListener('mouseout',hint_off,false);
}

var hintdiv=document.createElement('div');
hintdiv.setAttribute("id","hint");
hintdiv.setAttribute("style","position:absolute;z-index:200;display:none;top:0px;left:0px");
map[0].parentNode.insertBefore(hintdiv,map[0]);

document.addEventListener('mousemove',get_mouse,false);

function hint_on(z){
	hint_text='<table bgcolor=\"#000000\" border=\"0\" cellpadding=\"6\" cellspacing=\"1\" width=\"'+hint_length+'\"><tr bgColor=#ffffe1><td style=\"font:11px Verdana;COLOR:#000000;\">' + z.target.title + '</td></tr></table>';
	hintdiv.innerHTML=hint_text;
	hintdiv.style.display='';
}
function hint_off(){
	hintdiv.style.display='none';
}

function get_mouse(z){
	var x=z.pageX;
	var y=z.pageY;
	hintdiv.style.top=y+hint_offset_y+'px';
	hintdiv.style.left=x+hint_offset_x+'px';
}