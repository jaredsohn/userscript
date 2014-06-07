// ==UserScript==
// @name        TVGuideRig
// @namespace   tvrig
// @include     http://www.tv.com/lists/SpecialFeatures:list:best-animated-series/widget/poll/
// @version     1.2
// ==/UserScript==
 
alert('running');
//ponies
var msg = {
	"vote_rate_limit": "3",
	'list_id': 'SpecialFeatures:list:best-animated-series',
	'id': 's:79180',
	'a': 'a',
	'v': '+1'
};
function update()
{
	unsafeWindow.ListUtils.publish(msg);
}
window.setInterval(update,100);