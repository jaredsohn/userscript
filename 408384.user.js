// ==UserScript==
// @name                WME Invalidated Camera Mass Eraser
// @namespace           @UCME_Myriades
// @description         Allow you to hide specific landmarks type
// @include             https://www.waze.com/editor/*
// @include             https://www.waze.com/*/editor/*
// @icon                
// @updateURL           https://userscripts.org/scripts/source/408384.meta.js
// @downloadURL         https://userscripts.org/scripts/source/408384.user.js
// @version             0.4
// @grant               Timbones, berestovskyy, dummyd2, Nomenclator1677
// ==/UserScript==

var wme_ucme_script_name = 'WME Unvalidated Camera Mass Eraser';
var wme_ucme_version = "0.4";
var wme_ucme_script_url = 'http://userscripts.org/scripts/show/408384';

/* bootstrap, will call initialiseHighlights() */
function UCME_bootstrap(){
	UCME_addLog('init');
	if (typeof(unsafeWindow) === "undefined"){
		unsafeWindow = ( function () {
			var dummyElem = document.createElement('p');
			dummyElem.setAttribute('onclick', 'return window;');
			return dummyElem.onclick();
		}) ();
	}
	/* begin running the code! */
	window.setTimeout(UCME_init, 500);
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

function UCME_addLog(UCME_text){
	console.log('WME_UCME_' + wme_ucme_version + ' : ' + UCME_text);
}

function UCME_del_cams(){
	if(UCME_waze_Map.camerasLayer.visibility === false)return;
	var action = [];
	// action.length = 0;
	for(var cams in UCME_waze_cameras.objects){
		UCME_addLog(cams);
	}
	for(var cams in UCME_waze_cameras.objects){
		var the_cam = UCME_waze_cameras.objects[cams];
		if(!the_cam.onScreen(the_cam))continue;
		if(the_cam.attributes.validated === true)continue;
		if(the_cam.state == 'Delete')continue;
		if(the_cam.attributes.permissions == -1){
			action.unshift(new UCME_Waze.Action.DeleteObject(UCME_waze_cameras.objects[cams]));
		}
	}
	var delCams = action.length;
	if(delCams > 0){
		UCME_addLog('Invalidated cam deleted : ' + delCams);
		UCME_waze_model.actionManager.add(new UCME_Waze.Action.MultiAction(action));
	}
}

function UCME_html(){
	WME_UCME_addon = document.createElement('div');
	WME_UCME_addon.id = 'UCME_btn';
	WME_UCME_addon.innerHTML = '<input type="button" id="_UCME_btn" value="Delete unvalidated cameras" /><hr>';
	UCME_userInfos.appendChild(WME_UCME_addon);
	UCME_addLog('HTML renderred');
}

function UCME_init(){
	//	Waze object needed
	UCME_Waze = unsafeWindow.W;
	if(typeof(UCME_Waze) === 'undefined'){
		UCME_addLog('unsafeWindow.W NOK');
		window.setTimeout(UCME_init, 500);
		return;
	}
	UCME_waze_loginmanager = UCME_Waze.loginManager;
	if(typeof(UCME_waze_loginmanager) === 'undefined'){
		UCME_addLog('login manager NOK');
		window.setTimeout(UCME_init, 500);
		return;
	}
	UCME_waze_user = UCME_waze_loginmanager.user;
	if(typeof(UCME_waze_user) === 'undefined' || UCME_waze_user === null){
		UCME_addLog('user NOK');
		window.setTimeout(UCME_init, 500);
		return;
	}
	if(UCME_waze_user.rank < 2){
		UCME_addLog('User rank is not high enough. Exiting script.');
		return;
	}
	UCME_addLog('User rank OK : ' + eval(UCME_waze_user.rank + 1));
	UCME_waze_controler = UCME_Waze.controller;
	if(typeof(UCME_waze_controler) === 'undefined'){
		UCME_addLog('UCME_waze_controler NOK');
		window.setTimeout(UCME_init, 500);
		return;
	}
	UCME_waze_Map = UCME_Waze.map;
	if(typeof(UCME_waze_Map) === 'undefined'){
		UCME_addLog('map NOK');
		window.setTimeout(UCME_init, 500);
		return;
	}
	UCME_waze_model = UCME_Waze.model;
	if(typeof(UCME_waze_model) === 'undefined'){
		UCME_addLog('model NOK');
		window.setTimeout(UCME_init, 500);
		return;
	}
	UCME_waze_cameras = UCME_waze_model.cameras;
	if(typeof(UCME_waze_cameras) === 'undefined'){
		UCME_addLog('cameras NOK');
		window.setTimeout(UCME_init, 500);
		return;
	}
	UCME_addLog('Waze OK');
	//	Waze GUI needed
	UCME_userInfos = getId('user-details');
	if(typeof(UCME_userInfos) === 'undefined'){
		UCME_addLog('userInfos NOK');
		window.setTimeout(UCME_init, 500);
		return;
	}
	//	Then do the job
	//	HTML
	UCME_html();
	//	Event
	getId('_UCME_btn').onclick = UCME_del_cams;
}

/* engage! =================================================================== */
UCME_bootstrap();
/* end ======================================================================= */