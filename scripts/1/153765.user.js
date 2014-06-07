// ==UserScript==
// @name           Youtube - title over video
// @version       1.3
// @updateURL     http://userscripts.org/scripts/source/153765.meta.js
// @downloadURL   http://userscripts.org/scripts/source/153765.user.js
// @include       https://www.youtube.com/watch*
// @include       http://www.youtube.com/watch*
// ==/UserScript==
(function() {
function addClassNameListener(elemId, callback) {
	var elem = document.getElementById(elemId);
	var lastClassName = elem.className;
	window.setInterval( function() {   
		var className = elem.className;
		if (className !== lastClassName) {
			callback();   
			lastClassName = className;
		}
	},100);
}
function makeCss(){
var player_h=document.getElementById('player-api').offsetHeight;
var player_w=document.getElementById('player-api').firstElementChild.offsetWidth;
var title_h=document.getElementById('watch7-headline').offsetHeight;
document.getElementById('some-css').innerHTML = [
	'#watch7-headline {width:'+(player_w-42)+'px}',
	'#watch7-sidebar {margin-top:-'+(390+title_h)+'px}',
	'#watch7-playlist-tray-container {height:'+(player_h+title_h)+'px!important}'
	].join('\n');
}
var q=document.getElementById('watch7-headline');
var o=document.getElementById('player-api');
o.parentNode.insertBefore(q.parentNode.removeChild(q),o);
var css2=document.createElement('style');
css2.type='text/css';
css2.id='some-css';
document.getElementsByTagName('head')[0].appendChild(css2);
var css=document.createElement('style');
css.type='text/css';
css.innerHTML=[
	'#watch7-user-header {padding-top:15px}',
	'#watch7-views-info {top:15px}',
	'#watch7-headline {border-width:1px;padding-top:9px}',
	'.watch-playlist-collapsed #watch7-playlist-tray-container {height:0!important}'
	].join('\n');
document.getElementsByTagName('head')[0].appendChild(css);
makeCss();
addClassNameListener('watch7-headline', makeCss);
addClassNameListener('player', makeCss);
window.addEventListener('resize', makeCss, false);
})();