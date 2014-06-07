// ==UserScript==
// @name           Golem Gallery Linker
// @namespace      org.godsboss
// @description    Replaces Golem.de's JS gallery links' href with the urls of the images.
// @include        http://www.golem.de/*
// ==/UserScript==
function setHref(link){
	link.href = link.getElementsByTagName('img')[0].src.replace(/thumb[0-9]+\//, '');}

function handleGallery(node){
	var links = node.getElementsByTagName('a');
	for(var i=0,l=links.length;i<l;i++){
		setHref(links[i]);}}

window.addEventListener('load', function(){

	var galleries = document.evaluate(
		'//div[@class="golemGallery"]',
		document.body,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	var node;

	for(var i=0,l=galleries.snapshotLength;i<l;i++){
		handleGallery(galleries.snapshotItem(i));}}, false);
