// ==UserScript==
// @name           Temp stuff
// @description    XXXx
//                 XXX
// @author         Erendi
// @include        http://*formspring.me/*
// @version        0.1

// ==/UserScript==

if (window.top != window.self)  //don't run on frames or iframes
{
    //Optional: GM_log ('In frame');
    return;
}

window.addEventListener ('load', doSmile, true);

function doSmile() {

	var smilelist = document.getElementsByClassName('fspring.Smile.button');
	for (var index = 0; index < smilelist.length; index++) {
		location.assign('javascript:fspring.Smile.add(smilelist[index]);void(0)');
	}

}