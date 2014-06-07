// ==UserScript==

// @name           Gelbooru Link from IQDB

// @namespace      hentaiprovisions

// @description    In doing the moderating for Gelbooru it takes too long to get the MD5 hash so I decided to create a link on the page.

// @include        http://*.iqdb.org/*

// ==/UserScript==

var allImgs, thisImg, ident_img;

allImgs = document.getElementsByTagName('img');

for (var i = 0; i < allImgs.length; i++)

{

	thisImg = allImgs[i];

	thisImgSrc = thisImg.attributes.getNamedItem("src").value;

	if (thisImgSrc.match(/http:\/\/\w+\.iqdb\.org\//))

	{

		var filenameGet = thisImgSrc.match(/\w+\.(jpg|png|gif|jpeg)/);

		var removeFilenameExt = filenameGet[0].replace(/\.\w{3}/,'');

		var imgMD5= "md5:" + removeFilenameExt;		

		var gelbooruLink = document.createElement("div");

		gelbooruLink.innerHTML = '<a href="http://gelbooru.com/index.php?page=post&s=list&tags=' + imgMD5 + '">Gelbooru Search w/ MD5</a>';

		thisImg.parentNode.parentNode.insertBefore(gelbooruLink, thisImg.nextSibiling);

	}

}