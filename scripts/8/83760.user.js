// ==UserScript==
// @name           vkontakte - appMM
// @autor          MeXaon
// @namespace      vkontakte
// @include        http://*vkontakte.ru/app*
// ==/UserScript==

var app_c;
var app;

function main()
{
	app_c = document.getElementById('flash_player_container');
	app = app_c.getElementsByTagName('embed')[0];
	
	GM_registerMenuCommand('VKontakte app - Max', app_max);
	GM_registerMenuCommand('VKontakte app - Min', app_min);
}

function app_max()
{
	app_c.style.position = 'absolute';
	app_c.style.left = '0';
	app_c.style.top = '0';
	app_c.style.width = '100%';
	app_c.style.height = '100%';
	app.style.width = '100%';
	app.style.height = '100%';
}

function app_min()
{
	app.style.removeProperty('width');
	app.style.removeProperty('height');
	app_c.style.position = 'static';
}

main();