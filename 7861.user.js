// ==UserScript==
// @name           Shelfari - Tags to shelves
// @namespace      http://mathiasbaert.be/userscripts/shelfari.com/tagstoshelves
// @description    Removes certain tags from the taglist and adds them as shelves
// @include        http://www.shelfari.com/*/shelf
// @include        http://www.shelfari.com/*/tags/*
// @include        http://www.shelfari.com/*/lists*
// ==/UserScript==

// startpoint of this script
// this function takes an arbitrary number of tags as argument
tagsToShelves(
		'books i have read',
		'books i own'
	);

// add the most popular tags too
popularTagsToShelves();

// functions
	/**
	 * @param string
	 */
function tagsToShelves(){
	for ( var i=0; i<arguments.length; i++ ) {
		addShelfToDocument(arguments[i]);
	}
	removeTags.apply(null, arguments);
	if ( getCurrentTag() ) {
		var tagShelf = getShelf('tag');
		tagShelf.parentNode.removeChild(tagShelf);
	}
}
	/**
	 * Changes the tags with level0 into shelves
	 */
function popularTagsToShelves(){
	var tags = getTagsByLevel(0);
	for ( var i=0; i<tags.length; i++ ) {
		tags[i] = tags[i].innerHTML;
	}
	tagsToShelves.apply(null, tags);
}
	/**
	 * @param string
	 */
function addShelfToDocument(tag){
	var breakDiv = getShelfBreakDiv();
	var currentTag = getCurrentTag();
	breakDiv.parentNode.insertBefore(makeShelfElement(tag, tag==currentTag), breakDiv);
}
	/**
	 * @return array
	 */
function getTags(){
	return getElementsByXPath("//a[starts-with(@class, 'tagCloudLink')]");
}
	/**
	 * @param int
	 * @return array
	 */
function getTagsByLevel(level){
	return getElementsByXPath("//a[@class = 'tagCloudLink"+level+"']");
}
	/**
	 * @param string
	 */
function removeTags(){
	var i, j, tags = getTags();
	for ( i=0; i<tags.length; i++ ) {
		for ( j=0; j<arguments.length; j++ ) {
			GM_log ( '"'+tags[i].innerHTML+'"=="'+arguments[j]+'"' );
			if ( tags[i].innerHTML == arguments[j] ) {
				tags[i].parentNode.removeChild(tags[i]);
				break;
			}
		}
	}
}
	/**
	 * @param string 'ShowAllBooks', 'Top10', 'Reading', 'Wish', 'Tag' or a tag
	 * @return HTMLElement
	 */
function getShelf(name){
	return document.getElementById('ctl00_ContentPlaceHolder1_TheShelf_'+toCamelCase(name)+'Link');
}
	/**
	 * Get the last div in the shelfcontainer that forces the break
	 * @return HTMLElement
	 */
function getShelfBreakDiv(){
	return getElementsByXPath("//div[@id='ctl00_ContentPlaceHolder1_TheShelf_ListSelectionContainer']/div[@class='floatClear']")[0];
}
	/**
	 * @param string
	 * @return array
	 */
function getElementsByXPath(expression){
	var result;
	var elements = [];
	result = document.evaluate(
		expression,
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for ( var i = 0; i < result.snapshotLength; i++ ) {
		elements.push(result.snapshotItem(i));
	}
	return elements;
}
	/**
	 * @param string
	 * @param boolean
	 * @return HTMLElement
	 */
function makeShelfElement(tag, selected){
	var camelTag = toCamelCase(tag);

	var shelf = document.createElement('a');
	shelf.setAttribute('style', 'margin:0pt 6px;');
	shelf.setAttribute('href', 'http://www.shelfari.com/'+getShelfPath()+'/tags/'+tag);
	shelf.setAttribute('id', 'ctl00_ContentPlaceHolder1_TheShelf_'+camelTag);

	var box = document.createElement('img');
	box.setAttribute('style', 'border-width:0px; height:25px; width:24px;');
	box.setAttribute('alt', tag);
	box.setAttribute('id', 'ctl00_ContentPlaceHolder1_TheShelf_'+camelTag+'CheckBoxImage');
	if ( selected ) {
		box.setAttribute('src', '/images/listsel-check-actv.png');
	} else {
		box.setAttribute('src', '/images/listsel-check.png');
	}

	var label = document.createElement('img');
	label.setAttribute('style', 'border-width:0px; height:25px; width:auto;');
	label.setAttribute('alt', tag);
	label.setAttribute('id', 'ctl00_ContentPlaceHolder1_TheShelf_'+camelTag+'LabelImage');
	if ( selected ) {
		label.setAttribute('src', '/images/listsel-'+camelTag+'.png');
	} else {
		label.setAttribute('src', '/images/listsel-'+camelTag+'-actv.png');
	}

	shelf.appendChild(box);
	shelf.appendChild(label);

	return shelf;
}
	/**
	 * @return string
	 */
function getShelfPath(){
	return window.location.href.match(/^.*shelfari.com\/(.*)\/(shelf|tags|lists).*/)[1];
}
	/**
	 * @return string
	 */
function getCurrentTag(){
	var matches;
	if ( matches = window.location.href.match(/\/tags\/(.*)/) ) {
		return matches[1].replace(/%20/g, ' ');
	}
	return false;
}
	/**
	 * @param string
	 * @param string
	 */
function toCamelCase(text){
	if ( !text ) {
		return '';
	}
	var parts = text.split(/\s+/);
	var result = '';
	for ( var i=0; i<parts.length; i++ ) {
		result += parts[i].substring(0, 1).toUpperCase() + parts[i].substring(1).toLowerCase();
	}
	return result;
}
