// ==UserScript==
// @name           Facebook App Setting
// @namespace      FAS
// @description	   Facebook Application Setting Link
// @auther		   Mesak http://mesak.wablog.info/blog
// @include        http://apps.facebook.com/*
// ==/UserScript==
var uw = (this['unsafeWindow']||window);
var bodyClass = document.body.className.split(" ");
var Lang = 'zh_tw';
for(x in bodyClass){
	if(bodyClass[x].indexOf("Locale") != -1){
		Lang = bodyClass[x].toLowerCase().replace("locale_","");
	}
}
function $T(LANG){
	switch (LANG){
	case "zh_hk":
	case "zh_tw":
		LANG = '編輯設定';
		break;
	case "fr_fr":
		LANG = 'ProfilModifier les paramètres';
	case "es_la":
	case "es_es":
	default:
		LANG = 'Edit Settings';
		break;
	}
	return LANG;
}
uw.onload = function(){
	var app_id = 0;
	var user_id = uw.Env.user;
	for(x in uw.__UIControllerRegistry){
		if(typeof(uw.__UIControllerRegistry[x]._context_data.app_id) != 'undefined'){
			app_id = uw.__UIControllerRegistry[x]._context_data.app_id;
		}
	}
	var a = document.createElement('li');
	a.innerHTML = '<a onclick="Dialog.bootstrap(DialogBootstrapEndpoints.EDIT_APPS_DIALOG, {&quot;app_id&quot;:&quot;'+app_id+'&quot;,&quot;profile_id&quot;:&quot;'+user_id+'&quot;});">'+$T(Lang)+'</a>';
	//document.getElementById('pageNav').appendChild(a);
	var pageNav = document.getElementById('pageNav');
	pageNav.insertBefore( a ,pageNav.firstChild);
}