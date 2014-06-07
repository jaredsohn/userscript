// ==UserScript==
// @name			GitHub Auto Expand Watched Repository List
// @author			Erik Vold
// @namespace		githubAutoExpandWatchedRepos
// @include			https://www.github.com/
// @include			https://github.com/
// @include			http://www.github.com/
// @include			http://github.com/
// @version			0.1.1
// @license			GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @datecreated		2009-11-07
// @lastupdated		2010-05-10
// @description		This userscript will automatically expand your watched repository list on your dashboard.
// ==/UserScript==

(function(){
	var bot=document.getElementById('inline_watched_repos');
	if(!bot) return;
	if(bot.style.display=="none") return;
	var simulateClick = function( el ) {
		var customEvent = document.createEvent("MouseEvents");
		customEvent.initMouseEvent( "click",
									true,
									true,
									unsafeWindow,
									1,
									0,
									0,
									0,
									0,
									false,
									false,
									false,
									false,
									0,
									undefined
		);
		el.dispatchEvent( customEvent );
	};
	window.setTimeout(function(){simulateClick(bot)},1000);
})();