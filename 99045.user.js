// ==UserScript==
// @name           Ravenwood Fair Annoying Frame Closer
// @description    Hides the so-called FB_HiddenContainer which is not very hidden
// @include        http://apps.facebook.com/ravenwoodfair/?*
// @include        http://www.ravenwoodfair.com/app/1/home/swf?*
// @include        http://fbcanvas.ravenwoodfair.com/app/1/home/swf?*
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @version        0.0.4
// @copyright      Charlie Ewing
// @require        http://sizzlemctwizzle.com/updater.php?id=99045&days=1
// ==/UserScript== 

(function() { 

	var version = "0.0.4";

	function run(){
		try{
			var div=document.getElementById('FB_HiddenContainer');
			var style=div.getAttribute('style');
			style+="display:none;";
			div.setAttribute('style',style);
		} catch(e){window.setTimeout(function(e){run();},500);}
	}

	run();

})(); // anonymous function wrapper end