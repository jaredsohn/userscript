// ==UserScript==
// @name           MAL Series Filter
// @version        1.3
// @description    Hides series that already exist on your MAL lists. Works with AutoPager and possibly other de-paginators. Based on "MAL Search Filter" by Bastvera <bastvera@gmail.com>. 
// @license        GPL; http://www.gnu.org/copyleft/gpl.html
// @include        http://myanimelist.net/anime.php?*
// @include        http://myanimelist.net/manga.php?*
// @include        http://myanimelist.net/topanime.php*
// @include        http://myanimelist.net/topmanga.php*
// @include        http://myanimelist.net/anime/*/*/userrecs
// @include        http://myanimelist.net/manga/*/*/userrecs
// @include        http://myanimelist.net/reviews.php*
// @include        http://myanimelist.net/profile/*/reviews*
// @include        http://myanimelist.net/favorites.php
// @include        http://myanimelist.net/favorites.php?type=anime*
// @include        http://myanimelist.net/favorites.php?type=manga*
// @exclude        http://myanimelist.net/anime.php?id=*
// @exclude        http://myanimelist.net/manga.php?id=*
// @require        http://userscripts.org/scripts/source/164164.user.js
// ==/UserScript==

//Anchor for checkbox
var	allElements = document.evaluate(
	"//div[@id='horiznav_nav']",
	document,
	null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	null);

var AnchorLink = allElements.snapshotItem(0);

if(AnchorLink!=null){
	
	//Element Placing
	var newElement;
	newElement = document.createElement('BR');
	AnchorLink.appendChild(newElement);
	
	var checkbox = document.createElement('input');
	checkbox.type = 'checkbox';
	checkbox.style.marginTop = '10px';
	AnchorLink.appendChild(checkbox);
	
	newElement = document.createElement('label');
	newElement.setAttribute('for','firstName');
	newElement.appendChild(document.createTextNode('Hide series that you have on your list.'));
	newElement.style.marginTop = '10px';
	newElement.style.fontWeight="normal";
	newElement.style.fontSize="10px";
	AnchorLink.appendChild(newElement);
	
	//Anime list entries search
	allElements = document.evaluate(
		"//a[@class='Lightbox_AddEdit button_edit']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	
	//Get or Set status of checkbox
	var checkboxmem = GM_getValue('checkboxmem'); //Get chceckbox status
	if(checkboxmem==null){
		checkboxmem=false;
		GM_setValue('checkboxmem', checkboxmem);
		checkbox.checked=checkboxmem;
	}
	else{
		checkbox.checked=checkboxmem;
		if(checkbox.checked==true)
			HideDivs();
	}
	
	//Listener
	checkbox.addEventListener('change',function () {
		
		if(checkbox.checked==true){
			HideDivs();
		}
		
		if(checkbox.checked==false){
			for (var i = 0; i < allElements.snapshotLength; i++){
				var EditLink = allElements.snapshotItem(i);
				trNode = getTrNode(EditLink, 4);
				if (trNode) {
					trNode = getDivNode(trNode, 4) || trNode;
					trNode.style.display = '';
				}
				else {
					trNode = getDivNode(EditLink, 4);
					if (trNode) {
						trNode.style.display = '';
					}
				}
			}
		}
		
		GM_setValue('checkboxmem', checkbox.checked);
		
	},false)
}

function HideDivs(){
	for (var i = 0; i < allElements.snapshotLength; i++){
		var EditLink = allElements.snapshotItem(i);
		trNode = getTrNode(EditLink, 4);
		if (trNode) {
			trNode = getDivNode(trNode, 4) || trNode;
			trNode.style.display="none";
		}
		else {
			trNode = getDivNode(EditLink, 4);
			if (trNode) {
				trNode.style.display="none";
			}
		}
	}
}

function getTrNode(node, maxLevel)
{
	if (node && maxLevel > 0)
	{
		if (node.tagName.toLowerCase() != 'tr')
		{
			return getTrNode(node.parentNode, maxLevel - 1);
		}
		
		return node;
	}
	
	return null;
}

function getDivNode(node, maxLevel)
{
	if (node && maxLevel > 0)
	{
		if (
			node.tagName.toLowerCase() != 'div' || (
				node.tagName.toLowerCase() == 'div' && 
				!node.className
			) || (
				node.tagName.toLowerCase() == 'div' && 
				node.className && 
				!node.className.contains('borderDark') && 
				!node.className.contains('borderClass')
			)
		)
		{
			return getDivNode(node.parentNode, maxLevel - 1);
		}
		
		return node;
	}
	
	return null;
}

addUnpaginationListener();

function addUnpaginationListener() {
	var contentElement = document.getElementById('content');
	if (contentElement) {
		contentElement.addEventListener('DOMNodeInserted', unpaginationHandler, false);
	}
}

function containsElementWithTag(elements, tagName) {
	if (typeof elements.length !== 'undefined' && typeof tagName === 'string') {
		for (var i = 0; i < elements.length; i++) {
			if (elements[i].tagName.toLowerCase() == tagName.toLowerCase()) {
				return true;
			}
		}	
	}
	
	return false;
}

function unpaginationHandler(event) {
	if (
		typeof event.target.tagName !== 'undefined' && 
		event.target.tagName.toLowerCase() == 'table'
	) {
		var firstElement = event.target.getElementsByTagName('td')[0];
		if (typeof firstElement !== 'undefined') {
			setTimeout(
				function() { 
					updateAllElements();
				}, 
				200
			);
		}
	}
}

function updateAllElements() {
	allElements = document.evaluate(
		"//a[@class='Lightbox_AddEdit button_edit']", 
		document, 
		null, 
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, 
		null
	);
	if(checkbox && checkbox.checked == true) {
		HideDivs();
	}
}