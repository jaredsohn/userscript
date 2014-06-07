// ==UserScript==
// @name           Die Staemme Gebaeude Buttons
// @namespace      userscripts.org
// @description    Fuegt dem Spiel "Die Staemme" Buttons für Gebaeude hinzu
// @include        http://de*.die-staemme.de/*
// ==/UserScript==

//inspired by http://cocher.de.vu
window.addEventListener("load",function(){
function $(ID){return document.getElementById(ID);}
function createElement(type, attributes, append, inner){
	var node = document.createElement(type);
	for (var attr in attributes) {
		if (attr=="checked") node.checked=attributes[attr];
		else if (attributes.hasOwnProperty(attr)) node.setAttribute(attr, attributes[attr]);
	}
	if (append) append.appendChild(node);
	if (inner) node.innerHTML = inner;
	return node;
}

// Umlaute
const ae = "\u00E4";	const oe = "\u00F6";	const ue = "\u00FC";
const Ae = "\u00C4";	const Oe = "\u00D6";	const Ue = "\u00DC";
const sz = "\u00DF";

//[name,webpage,iconSrc,showAtOverviewAll]
const screens = [[Ue+"bersicht","overview",false],["Hauptgeb"+ae+"ude","main","main.png",true],["Kaserne","barracks","barracks.png",true],["Stall","stable","stable.png",true],["Werkstatt","garage","garage.png",true],["Erste Kirche","church_f","church.png"],["Kirche","church","church.png",false],["Adelshof","snob","snob.png",true],["Schmiede","smith","smith.png",true],["Versammlungsplatz","place","place.png",true],["Statue","statue","statue.png",true],["Marktplatz","market","market.png",true],["Holzf"+ae+"ller","wood","wood.png",false],["Lehmgrube","stone","stone.png",false],["Eisenmine","iron","iron.png",false],["Bauernhof","farm","farm.png",false],["Speicher","storage","storage.png",false],["Versteck","hide","hide.png",false],["Wall","wall","wall.png",false]];
const currVillage = unsafeWindow.game_data["village"]["id"];
const currScreen = ((help=/screen=(.*?)\&/.exec(document.location.href+"&"))?help[1]:"");

if(document.getElementById("header_info")){
	var show = [[1],[2,3,4,8],[7,9,11]];
	var newtable = createElement("tr",{},document.getElementById("header_info").getElementsByTagName("tbody")[0]);
	var newtr = createElement("tr",{},createElement("table",{"cellspacing":"0"},createElement("td",{"colspan":"6"},newtable)));
	for(var i=0;i<show.length;i++){
		newtable = createElement("td",{},createElement("tr",{},createElement("tbody",{},createElement("table",{"style":"border-collapse:collapse;","class":"navi-border"},createElement("td",{},newtr)))));
		newtable = createElement("tr",{},createElement("tbody",{},createElement("table",{"style":"width:100%;","class":"menu nowrap"},newtable)));
		for(var j=0;j<show[i].length;j++){
			createElement("a",{"href":"game.php?village="+currVillage+"&screen="+screens[show[i][j]][1]},createElement("td",{},newtable),screens[show[i][j]][0]);
		}
	}
	newtable=null;newtr=null;
}

if(currScreen=="overview_villages"){
	var thisVillage="";
	var newtr = $("production_table").getElementsByTagName("tr");
	var newtd,newa;
	for(var v=1;v<newtr.length;v++){
		thisVillage = /(\d+)/.exec(newtr[v].getElementsByTagName("span")[0].id)[1];
		newtd = createElement("td",{},newtr[v]);
		for(var w=0;w<screens.length;w++){
			if(screens[w][3]){
				newa = createElement("a",{"href":"game.php?village="+thisVillage+"&screen="+screens[w][1],"title":screens[w][0]},newtd);
				createElement("img",{"src":"graphic/buildings/"+screens[w][2]+"?1"},newa);
			}
		}
	}
	newtr=null;newtd=null;newa=null;
}
},false);