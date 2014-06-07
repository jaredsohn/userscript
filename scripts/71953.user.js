// ==UserScript==
// @name           Flickr — Display Image URL
// @namespace      http://userscripts.org/users/5310
// @description    Displays flic.kr Image URL on a photo page
// @include        http://flickr.com/photos/*
// @include        http://www.flickr.com/photos/*
// @version        1.0
// @copyright      2009, Scott Johnson (http://scottj.info/) & 2010, Matt Sephton (http://www.gingerbeardman.com)
// ==/UserScript==

var images = document.evaluate(
	'//div[starts-with(@id,"photoImgDiv")]//img',
    document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
if (images) {
	var image = images.snapshotItem(0);

	var newDiv = document.createElement('div');
	newDiv.id = 'image_url';
	newDiv.setAttribute('style', 'width:240px; word-wrap:break-word;');

	newDiv.innerHTML = '<h4>Image URL</h4>' + image.src;
	var sib = document.getElementsByClassName('PeopleTagList')[0];
	sib.parentNode.insertBefore(newDiv,sib);
	newDiv.addEventListener('click',selectLink,false);

}

function selectLink () {
	var p=document.getElementById("image_url");
	var el=p.childNodes[1];
	var s=window.getSelection();
	var r=document.createRange();
	r.selectNodeContents(el);
	s.removeAllRanges();
	s.addRange(r);
}
