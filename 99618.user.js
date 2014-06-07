// ==UserScript==
// @name			snakelp
// @namespace		GOVNOCODE
// @description		
// @include			http://game.nemexia.*/planet.php*
// ==/UserScript==

var over = document.createElement('script');
over.src = 'http://game.nemexia.ru/js/overview.js';
over.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(over);

opera.addEventListener('BeforeEvent.DOMContentLoaded', function (e)
{

var re = /\d{1,9}/i;
var oview = document.createElement('div')
var hrr = document.getElementsByTagName('h1')[0];
var actv = document.getElementsByClassName('active');
cor=actv.item(0).innerHTML.match(re);

oview.innerHTML = '<h1><a href=javascript:void(0); onclick=loadPlanetContent(cor);$(\'#PlanetHolder-\'+cor).toggle(\'normal\');>Overview</a></h1><div class="box" id="PlanetHolder-'+ cor +'" style="display:none"><div id="PlanetContentHolder-'+ cor +'"></div><a name="Info-'+ cor +'"></a><div class="innerBox"><div class="innerBoxTabs"><ul><li id="BuildingsLi-'+ cor +'"><a href="javascript:void(0);" onclick="loadModule(\'Buildings\',cor);">Buildings</a></li><li id="ShipsLi-'+ cor +'"><a href="javascript:void(0);" onclick="loadModule(\'Ships\',cor);">Ships</a></li><li id="DefenceLi-'+ cor +'"><a href="javascript:void(0);" onclick="loadModule(\'Defence\',cor);">Defence</a></li><li id="ScienceLi-'+ cor +'"><a href="javascript:void(0);" onclick="loadModule(\'Science\',cor);">Science</a></li></ul></div><div class="innerBoxContent" id="BuildingsHolder-'+ cor +'" style="display:block;"></div> <div class="innerBoxContent" id="ShipsHolder-'+ cor +'" style="display:none;"></div><div class="innerBoxContent" id="DefenceHolder-'+ cor +'" style="display:none;"></div><div class="innerBoxContent" id="ScienceHolder-'+ cor +'" style="display:none;"></div></div></div>';
contentWrapper.insertBefore(oview, hrr);

}, false);