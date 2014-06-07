// ==UserScript==
// @name        indentyfikacja na'ka
// @description	ułatwia rozpoznawanie ID na karachan.org
// @namespace   https://userscripts.org/users/548505
// @include     http://www.karachan.org/b/res/*
// @include     http://karachan.org/b/res/*
// @version     1.1
// ==/UserScript==
var randomcolor = function(table){
	var letters = "0123456789abcdef".split('');
	var color = "#";
	for(var i=0;i<6;i++){
		color+=letters[Math.round(Math.random()*15)];
	}
	if(table.indexOf(color)>-1){
		return randomcolor(table);
	}else{
		return color;
	}
}
var ids = document.getElementsByClassName("posteruid");
var id;
var colors = {};
var colortable = ["#ff7878", "#d778ff", "#788eff", "#78f4ff", "#78ff85", "#fffd78", "#a0a0a0", "#ffc4c4", "#e9c4ff", "#c4c7ff", "#c4fffc", "#c5ffc4", "#fffec4"];
var nextcolor = 0;
var colorsum = 0;
var was = {};
for(var i=0;i<ids.length;i++){
	id = ids[i].outerHTML.substring(28, 37);
	if(colors[id]==undefined){
		if(was[id]==undefined){
			was[id]=i;
		}else{
			if(colorsum === colortable.length){
				colors[id] = randomcolor(colortable);
			}else{
				colors[id] = colortable[nextcolor];
				nextcolor++;
				colorsum++;
			}
			if(was[id]!=="ok"){
				ids[was[id]].innerHTML = "<font style=\"background-color: "+colors[id]+"\">"+id+"</font>";
				was[id]="ok";
			}
		}
	}
	ids[i].innerHTML = "<font style=\"background-color: "+colors[id]+"\">"+id+"</font>";
}