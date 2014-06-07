// ==UserScript==
// @name                WME Extra angle infos
// @namespace           @EAI_Myriades
// @description         Shows some additive grid line and specials angle infos
// @include             https://www.waze.com/editor/*
// @include             https://www.waze.com/*/editor/*
// @include             https://editor-beta.waze.com/*
// @version             0.1
// @updateURL         	http://userscripts.org/scripts/source/404372.meta.js
// @downloadURL         http://userscripts.org/scripts/source/404372.user.js
// @grant               Timbones, berestovskyy
// ==/UserScript==

// wme_eai_script_name = 'WME Extra angle infos';
var wme_eai_version = "0.1";
// wme_eai_script_url = 'http://userscripts.org/scripts/show/404372';
// var EAI_options = new Array();

/* bootstrap, will call initialiseHighlights() */
function EAI_bootstrap(){
	EAI_addLog('init');
	if (typeof(unsafeWindow) === "undefined"){
		unsafeWindow = ( function () {
			var dummyElem = document.createElement('p');
			dummyElem.setAttribute('onclick', 'return window;');
			return dummyElem.onclick();
		}) ();
	}
	/* begin running the code! */
	setTimeout(EAI_init, 500);
}

/* helper function */
function getElementsByClassName(classname, node) {
  if(!node) node = document.getElementsByTagName("body")[0];
  var a = [];
  var re = new RegExp('\\b' + classname + '\\b');
  var els = node.getElementsByTagName("*");
  for (var i=0,j=els.length; i<j; i++)
    if (re.test(els[i].className)) a.push(els[i]);
  return a;
}

function getId(node) {
  return document.getElementById(node);
}

function getSelectedValue(node){
	var t = getId(node);
	return t.options[t.selectedIndex].value;
}

function EAI_addLog(EAI_text){
	console.log('WME_EAI_' + wme_eai_version + ' : ' + EAI_text);
}

function EAI_init(){
	//	Waze object needed
	EAI_Waze = unsafeWindow.W;
	if(typeof(EAI_Waze) == 'undefined'){
		EAI_addLog('unsafeWindow.W NOK');
		window.setTimeout(EAI_init, 500);
		return;
	}
	EAI_waze_Map = unsafeWindow.W.controller.map;
	if(typeof(EAI_waze_Map) == 'undefined'){
		EAI_addLog('map NOK');
		window.setTimeout(EAI_init, 500);
		return;
	}
	EAI_waze_model = EAI_Waze.model;
	if(typeof(EAI_waze_model) == 'undefined'){
		EAI_addLog('model NOK');
		window.setTimeout(EAI_init, 500);
		return;
	}
	EAI_selectionManager = EAI_Waze.selectionManager;
	if(typeof(EAI_selectionManager) == 'undefined'){
		EAI_addLog('selectionManager NOK');
		window.setTimeout(EAI_init, 500);
		return;
	}
	EAI_waze_landmarks = EAI_waze_model.landmarks;
	if(typeof(EAI_waze_landmarks) == 'undefined'){
		EAI_addLog('landmarks NOK');
		window.setTimeout(EAI_init, 500);
		return;
	}
	EAI_addLog('Waze OK');
	//	Waze GUI needed
	EAI_userTabs = getId('user-info');
	if(typeof(EAI_userTabs) == 'undefined'){
		EAI_addLog('userTabs NOK');
		window.setTimeout(EAI_init, 500);
		return;
	}
	EAI_navTabs = EAI_userTabs.getElementsByTagName('ul')[0];
	if(typeof(EAI_navTabs) == 'undefined'){
		EAI_addLog('navTabs NOK');
		window.setTimeout(EAI_init, 500);
		return;
	}
	EAI_tabContent = EAI_userTabs.getElementsByTagName('div')[0];
	if(typeof(EAI_tabContent) == 'undefined'){
		EAI_addLog('tabContent NOK');
		window.setTimeout(EAI_init, 500);
		return;
	}
	EAI_addLog('GUI OK');
}

/* engage! =================================================================== */
EAI_bootstrap();
/* end ======================================================================= */
