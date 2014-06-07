// ==UserScript==
// @name           Planetas Pequeños
// @namespace      Xeros
// @description    Lista de planetas reducidas V.5 de Ogame
// @include        http://*.ogame.*/game/index.php?page=overview*
// @include        http://*.ogame.*/game/index.php?page=resources*
// @include        http://*.ogame.*/game/index.php?page=resourceSettings*
// @include        http://*.ogame.*/game/index.php?page=station*
// @include        http://*.ogame.*/game/index.php?page=trader*
// @include        http://*.ogame.*/game/index.php?page=research*
// @include        http://*.ogame.*/game/index.php?page=shipyard*
// @include        http://*.ogame.*/game/index.php?page=defense*
// @include        http://*.ogame.*/game/index.php?page=fleet1*
// @include        http://*.ogame.*/game/index.php?page=fleet2*
// @include        http://*.ogame.*/game/index.php?page=fleet3*
// @include        http://*.ogame.*/game/index.php?page=movement*
// @include        http://*.ogame.*/game/index.php?page=galaxy*
// @include        http://*.ogame.*/game/index.php?page=alliance*
// @include        http://*.ogame.*/game/index.php?page=premium*
// @include        http://*.ogame.*/game/index.php?page=messages*
// @include        http://*.ogame.*/game/index.php?page=statistics*
// @include        http://*.ogame.*/game/index.php?page=highscore*
// @include        http://*.ogame.*/game/index.php?page=preferences*
// @include        http://*.ogame.*/game/index.php?page=changelog*
// ==/UserScript==

(function () {
	var evenSmaller = false;

	var borderImage = '../cdn/img/layout/myplanetsborder2.gif';
	var borderImageBold = '../cdn/img/layout/myplanetsborder.gif';
	
	if (typeof GM_setValue == 'undefined') {
		if (
			location.href.indexOf('/game/index.php?page=overview') == -1
			&& location.href.indexOf('/game/index.php?page=resources') == -1
			&& location.href.indexOf('/game/index.php?page=resourceSettings') == -1
			&& location.href.indexOf('/game/index.php?page=station') == -1
			&& location.href.indexOf('/game/index.php?page=trader') == -1
			&& location.href.indexOf('/game/index.php?page=research') == -1
			&& location.href.indexOf('/game/index.php?page=shipyard') == -1
			&& location.href.indexOf('/game/index.php?page=defense') == -1
			&& location.href.indexOf('/game/index.php?page=fleet1') == -1
			&& location.href.indexOf('/game/index.php?page=fleet2') == -1
			&& location.href.indexOf('/game/index.php?page=fleet3') == -1
			&& location.href.indexOf('/game/index.php?page=movement') == -1
			&& location.href.indexOf('/game/index.php?page=galaxy') == -1
			&& location.href.indexOf('/game/index.php?page=alliance') == -1
			&& location.href.indexOf('/game/index.php?page=premium') == -1
			&& location.href.indexOf('/game/index.php?page=messages') == -1
			&& location.href.indexOf('/game/index.php?page=statistics') == -1
			&& location.href.indexOf('/game/index.php?page=highscore') == -1
			&& location.href.indexOf('/game/index.php?page=preferences') == -1
			&& location.href.indexOf('/game/index.php?page=changelog') == -1
		) return;
	}
	
	var smallplanets = document.createElement('style');
	smallplanets.setAttribute('type', 'text/css');
	if (!evenSmaller) {
		smallplanets.appendChild(document.createTextNode("div#cutty #myPlanets .smallplanet{height:38px;}div#cutty #myPlanets .smallplanet .planetPic{top:3px;}div#cutty #myPlanets .smallplanet a.moonlink{top:-7px;}div#cutty #myPlanets .smallplanet a.constructionIcon.moon{top:25px;}div#cutty #myPlanets .smallplanet a.planetlink:hover{background-image:url('" + borderImageBold + "'),url('" + borderImageBold + "');background-position:left -10px,left top;}div#cutty #myPlanets .smallplanet a.active, #rechts #cutty #myPlanets .smallplanet a.active:link{background-image:url('" + borderImage + "'),url('" + borderImage + "');background-position:left 2px,left top;}"));
	} else {
		smallplanets.appendChild(document.createTextNode("div#cutty #myPlanets .smallplanet{height:35px;}div#cutty #myPlanets .smallplanet .planetPic{top:1px;}div#cutty #myPlanets .smallplanet a.moonlink{top:16px;}div#cutty #myPlanets .smallplanet a.constructionIcon.moon{top:20px;}div#cutty #myPlanets .smallplanet a.planetlink:hover{background-image:url('" + borderImageBold + "'),url('" + borderImageBold + "');background-position:left -20px,left top;}div#cutty #myPlanets .smallplanet a.active, #rechts #cutty #myPlanets .smallplanet a.active:link{background-image:url('" + borderImage + "'),url('" + borderImage + "');background-position:left -20px,left top;}"));
		smallplanets.appendChild(document.createTextNode("div#cutty #myPlanets .smallplanet .planet-name{top:3px;}div#cutty #myPlanets .smallplanet .planet-koords{top:18px}div#cutty #myPlanets .smallplanet .constructionIcon{top:20px}"));
	}
	document.getElementsByTagName('head')[0].appendChild(smallplanets);
}());