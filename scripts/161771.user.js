// ==UserScript==
// @name           Example RaidCatcher Mod
// @namespace      tag://kongregate
// @description    This is example of how to mod the RaidCatcher script to add a new tab.
// @author         wpatter6
// @version        0.0.2
// @date           3.11.2013
// @include		   *armorgames.com/dawn-of-the-dragons-game*
// @include        http://www.kongregate.com/games/5thPlanetGames/dawn-of-the-dragons*
// @include        *newgrounds.com/portal/view/609826*
// ==/UserScript==

if(window.top == window.self){
	var gm = false;
	try {if (typeof Components.interfaces.gmIGreasemonkeyService === "object") gm = true; }
	catch (err) {}
	if (typeof unsafeWindow === "undefined" || !gm){
		unsafeWindow = (function (){
			var el = document.createElement('p');
			el.setAttribute('onclick', 'return window;');
			return el.onclick();
		})();
	}
	window.myFunc = function (t){
		var rc = unsafeWindow.RaidCatcher
		if(typeof rc === 'object'){//Raidcatcher is found, tab can be created.
			console.log("myFunc RaidCatcher found!");
			rc.ui.addTab("New Tab", "<b>This is new tab content!</b><br><ul><li>It is cool.</li><li>It can include HTML Tags.</li></ul>", function(){alert('Custom Tab Clicked')});
		}else{
			console.log("myFunc " + t);
			if(t < 10) setTimeout("myFunc("+(++t)+")", 1000, ++t);
		}
	}
	myFunc(1);
}