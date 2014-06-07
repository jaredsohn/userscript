// ==UserScript==
// @name		Ikariam Tokens
// @author		Copyright (c) Si Dunford 2008
// @version	1.01
// @namespace      http://www.itspeedway.net/greasemonkey
// @description	Adds Token Icons to buildings
// @include	http://*.ikariam.*/*
// ==/UserScript==

// ===========================================================================
// Based on code from HadesArmyScripts by arya and Kronos Utils by Kronos.
// ==========================================================================

GM_log('BEGIN');

  try {
    switch (urlParse("view") || urlParse("action")) {
		case "loginAvatar":
		case "CityScreen": 
		case "city": levelBat(); break;  
		case "port": 
		case "island": levelTown(); levelResources(); break;
		case "townHall": 
		case "shipyard":
		case "researchOverview": 
		case "colonize": 
		case "academy":
		case "researchAdvisor":
	}
  } catch(e) {}

GM_log('EXITING');
  
// on rйcupйre une des valeurs get d'une url(son nom est le param.
function urlParse(param, url) {
  if (!url) url = location.search; // On rйcupйre l'url du site.
  if (!url && param == "view") {
    var view = { cities: "island", locations: "city" };
    for (var id in view)
      if ($(id)) return view[id];
  }
  var keys = {};
  url.replace(/([^=&?]+)=([^&]*)/g, function(m, key, value) {
    keys[decodeURIComponent(key)] = decodeURIComponent(value);
  });
  return param ? keys[param] : keys;
}

  
// ########################################
function levelBat() { // Ajout d'un du level sur les batiments.
GM_log('levelbat()');

  function addnum(node) {
GM_log('addnum()');
    var a = $X('a', node);
    if (!a) return;
    var id = buildingID(a);
GM_log('buldingid='+id);
GM_log(a.title);
    var level = a.title.match(/\d+$/); //Number(a.title);
GM_log('level='+level);

    var div = createNode("", "pointsLevelBat", level);
GM_log('Created div');

    div.title = a.title;
    node.appendChild(div);
    div.addEventListener("click", function() { goto(a.href); }, true);
    div.style.visibility = "visible";
GM_log('<addnum()');

	}

	addCSSBubbles();

GM_log('t2');

  $x('id("locations")/li[not(contains(@class,"buildingGround"))]').map(addnum);
}

function levelResources() {
  function annotate(what) {
    var node = $X('id("islandfeatures")/li['+ what +']');
    var level = node.className.replace(/\D/g, "");
    var div = createNode("", "pointsLevelBat", level);
    node.appendChild(div);
  }
  addCSSBubbles();
  annotate('contains(@class,"wood")');
  annotate('not(contains(@class,"wood")) and not(@id)');
}

function levelTown() {
  function level(li) {
    var level = li.className.match(/\d+/)[0];
    var div = createNode("", "pointsLevelBat", level);	
    li.appendChild(div);
  }
  $x('//li[starts-with(@class,"cityLocation city level")]').forEach(level);
}

function levelTownOLD() {
  function level(li) {
    var level = li.className.match(/\d+/)[0];
    var name = $X('a[@onclick]/span/text()[preceding-sibling::span]', li);
    if (name) {
      name.nodeValue = level +":"+ name.nodeValue;
      name = name.parentNode;
      name.style.left = Math.round((name.offsetWidth) / -2 + 34) + "px";
    }
  }
  $x('//li[starts-with(@class,"cityLocation city level")]').forEach(level);
}


function createNode(id, classN, html, tag) { // On ajoute un div
GM_log('createnode()');
  var div = document.createElement(tag||"div"); // on crйe le div
  if (id) div.id = id; // on lui ajoute l'id
  if (classN) div.className = classN; // le class
  if ("undefined" != typeof html)
    div.appendChild(document.createTextNode(html)); // on lui ajoute du texte
  return div;
}

function $(id) {
GM_log('$(id)'+id);
  return document.getElementById(id);
}

function $x( xpath, root ) {
  var doc = root ? root.evaluate ? root : root.ownerDocument : document, next;
  var got = doc.evaluate( xpath, root||doc, null, 0, null ), result = [];
  switch (got.resultType) {
    case got.STRING_TYPE:
      return got.stringValue;
    case got.NUMBER_TYPE:
      return got.numberValue;
    case got.BOOLEAN_TYPE:
      return got.booleanValue;
    default:
      while (next = got.iterateNext())
	result.push( next );
      return result;
  }
}

function $X( xpath, root ) {
  var got = $x( xpath, root );
  return got instanceof Array ? got[0] : got;
}

function buildingID(a) {
GM_log('buildingid('+a+')');

  var building = a.parentNode.className; //urlParse("view", a.search);
  return {
    townHall: 0, port: 3, academy: 4, shipyard: 5, barracks: 6,
    warehouse: 7, wall: 8, tavern: 9, museum: 10, palace: 11,
    embassy: 12, branchOffice:13, "workshop-army": 15, safehouse: 16, palaceColony: 11
  }[building];
}

// ########################################
function addCSSBubbles() { 
GM_log('addcssbubbles()');
addGlobalStyle( ".pointsLevelBat { background-color: #FDF8C1;  -moz-border-radius: 1em;  border: 2px solid #918B69; border-radius: 1em;  font-family: Sylfaen, 'Times New Roman', sans-serif;  font-size: 12px;  font-weight: bold;  text-align: center;  position: absolute;  width: 18px;  cursor: pointer;  height: 15px;  visibility: visible;  margin-top: 10px;  margin-left: 25px;  z-index: 50;}" );
addGlobalStyle( ".toBuild {  width: auto;  height: 23px;  white-space: pre;  margin: -120px auto -3px -50%;  padding: 3px 5px 0;  z-index: 1000;}" );
addGlobalStyle( "#islandfeatures .wood .pointsLevelBat {  margin-top: -21px;  margin-left: 7px;}" );
addGlobalStyle( "#islandfeatures .wine .pointsLevelBat {  margin-top: -38px;  margin-left: 35px;}" );
addGlobalStyle( "#islandfeatures .marble .pointsLevelBat {  margin-top: -28px;  margin-left: 23px;}" );
addGlobalStyle( "#islandfeatures .crystal .pointsLevelBat {  margin-top: -9px;  margin-left: 21px;}" );
addGlobalStyle( "#islandfeatures .sulfur .pointsLevelBat {  margin-top: -33px;  margin-left: 35px;}" );
}

function addGlobalStyle(css) {
	var head, style;
	head=document.getElementsByTagName('head')[0];
	if (!head) { return; }
	style=document.createElement('style');
	style.type='text/css';
	style.innerHTML=css;
	head.appendChild(style);
}

