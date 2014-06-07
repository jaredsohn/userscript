// ==UserScript==
// @name			Sort AMO 'Add to a collection' Menu
// @author			Erik Vold
// @namespace		amoSortAddToCollectionMenu
// @include			https://addons.mozilla.org/*/addon/*
// @version			0.2.1
// @license			MPL 2.0
// @datecreated		2009-10-13
// @lastupdated		2013-07-13
// @homepageURL     https://userscripts.org/scripts/show/59758
// @description		This userscript will sort the AMO 'Add to a collection' menu.
// ==/UserScript==

(function() {
	var collectionBtn = document.getElementById('add-to-collection');
	if(!collectionBtn)
	  return;

	let observer = new MutationObserver(doSorting);
	observer.observe(collectionBtn, { childList: true });

	return;
})()

function doSorting() {
  let collectionList = document.getElementById('ajax_collections_list');
  if (!collectionList)
    return;

  // get
  let collections = toArray(collectionList.querySelectorAll('li'));
  
  if (collections.length <= 1)
    return;

  // sort
  collections.sort(function(a, b) {
    return (getTitle(a) > getTitle(b)) ? -1 : 1;
  });

  // update
  for (let i = collections.length - 1; i >= 0; i--) {
    collectionList.insertBefore(collections[i], null);
  }

  return;
}

function getTitle(thing) {
  return thing.querySelector('span').textContent.toLowerCase();
}

function toArray(thing) {
  let ary = [];
  for (let l = thing.length, i = 0; i < l; i++) {
    ary.push(thing[i]);
  }
  return ary;
}
