// ==UserScript==
// @name           bee-ware
// @namespace      KoLCtH
// @description    Highlights items with the letter 'b' in the name for Beecore ascensions.
// @author			Charon the Hand
// @contributor		Lizard
// @include        http://*kingdomofloathing.com/inventory.php*
// @include        http://*kingdomofloathing.com/familiar.php*
// @include        http://*kingdomofloathing.com/storage.php*
// @include        http://*kingdomofloathing.com/craft.php*
// @include        http://*kingdomofloathing.com/fight.php*
// @include        http://127.0.0.1:*/inventory.php*
// @include        http://127.0.0.1:*/familiar.php*
// @include        http://127.0.0.1:*/storage.php*
// @include        http://127.0.0.1:*/craft.php*
// @include        http://127.0.0.1:*/fight.php*
// ==/UserScript==
//Idea by Lizard, name by Gearge, script by me.
if (unsafeWindow.name != 'mainpane')
	return
var fam = (window.location.pathname == '/familiar.php')
var fight = (window.location.pathname == '/fight.php')
GM_addStyle('.bs {color:red;}')
Array.prototype.forEach.call(document.querySelectorAll('td b:not([class=tit]), #monname'), function (i) 
{
	var node = fam ? i.nextSibling : i
	if (!node || node.textContent.search(/[bB]/) == -1)
		return
	if (fam)
	{
		var span = node.parentNode.insertBefore(document.createElement('span'), node)
		span.appendChild(node)
		node = span
	}
	node.innerHTML = node.textContent.replace(/[bB]/g, '<b class="bs">$&</b>')
	if (fight && index > 1 && !node.parentNode.className)
		node.style.color = 'blue'
	node.title = 'we hate you'

})

//if you find the staring bees frightening, you can safely delete everything from this line onward and still have nice red b's 

document.querySelector('style').textContent += '\n.bees {height:15px; display:none;}'
var imgUrl = 'http://images.kingdomofloathing.com/adventureimages/buzzerker.gif'
var allBs = Array.prototype.slice.call(document.querySelectorAll('.bs'))
allBs.forEach(function (b) {
	var img = b.parentNode.insertBefore(document.createElement('img'), b.nextSibling)
	img.src = imgUrl
	img.className = 'bees'
})
setTimeout(showBEES, 30000)

function showBEES()
{
	allBs.forEach(function (b) {
		b.style.display = 'none'
		b.nextSibling.style.display = 'inline'
	})
	setTimeout(hideBEES, 2000)
}
function hideBEES()
{
	allBs.forEach(function (b) {
		b.style.display = 'inline'
		b.nextSibling.style.display = 'none'
	})
	setTimeout(showBEES, 30000)
}