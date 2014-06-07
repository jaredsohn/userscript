// ==UserScript==
// @name 		   BSCF : image to macro
// @namespace	   http://supportforums.blackberry.com/
// @description	version 3
// @include		http://supportforums.blackberry.com/t5/media/gallerypage/user-id/*/album-id/*/image-id/*
// @include		http://supportforums.blackberry.com/t5/media/gallerypage/user-id/*/image-id/*
// ==/UserScript==

//window.addEventListener("load", function() {
var t = document.evaluate( "//div[@class='lia-media-image-title lia-media-image-details']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null ).snapshotItem(0).firstChild.textContent;
var m = document.evaluate( "//div[@class='lia-media-image-nav-wrapper']//a//img", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null ).snapshotItem(0);
var i = m.src;
var j;
alert("a:"+i);
j = i.indexOf('_'			); if (-1!=j) i = i.substring(0,j);
alert("b:"+i);
j = i.indexOf('/image-size/'); if (-1!=j) i = i.substring(0,j);
alert("c:"+i);
i = i.substring(1+i.lastIndexOf('/'));
alert("d:"+i);
var fi = document.createElement('input');
	fi.setAttribute('type','text');
	fi.setAttribute('size','80');
	fi.setAttribute('onClick','select()');
	fi.setAttribute('value','<p><img style="display: block; margin-left: auto; margin-right: auto;" border="0" align="middle" src="http://supportforums.blackberry.com/t5/image/serverpage/image-id/'+i+'" alt="'+t+'" title="'+t+'" /></p>');
var ff = document.createElement('form');
	ff.appendChild(fi);
m.parentNode.parentNode.appendChild(ff);
//}, false);