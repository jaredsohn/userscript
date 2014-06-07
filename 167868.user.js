// ==UserScript==
// @name		Konachan/yande.re: Thumbnail Highres Fix
// @namespace	Zolxys
// @description	*Does not work on wiki pages* (1) Changes the links below thumbnails to link to the original PNG instead of the highres JPEG. • (2) Changes the image size shown below thumbnails to the size of the original PNG which can be different for large images.
// @include	http://konachan.com/post
// @include	http://konachan.com/post?*
// @include	http://konachan.com/user/show/*
// @include	http://konachan.com/post/similar*
// @include	http://konachan.net/post
// @include	http://konachan.net/post?*
// @include	http://konachan.net/user/show/*
// @include	http://konachan.net/post/similar*
// @include	https://yande.re/post
// @include	https://yande.re/post?*
// @include	https://yande.re/user/show/*
// @include	https://yande.re/post/similar*
// @version	1.1
// ==/UserScript==
if (document.getElementById('post-list-posts') != null) {
	var f = String(function(){
var zola = document.getElementsByTagName('li'); // Searches from document instead of id 'post-list-posts' because that id occurs multiple times on the profile page.
for (var zoli = 0; zoli < zola.length; ++zoli) {
	if (!/^p\d+$/.test(zola[zoli].id)) continue;
	var zoln = parseInt(zola[zoli].id.substr(1));
	if (!/\bcreator-id-\d+\b/.test(zola[zoli].className))
		continue;
	var zols = zola[zoli].getElementsByTagName('span');
	for (var zolp = 0; zolp < zols.length; ++zolp) 
	  if (zols[zolp].childElementCount == 0 && /\bdirectlink-res\b/.test(zols[zolp].className)) {
		zols[zolp].textContent = Post.posts._object[zoln].width +' × '+ Post.posts._object[zoln].height;
		if (zols[zolp].parentNode.nodeName != 'A') continue;
		zols[zolp].parentNode.href = Post.posts._object[zoln].file_url;
	}
}
});
	var ne = document.createElement('script');
	ne.setAttribute('type','text/javascript');
	ne.innerHTML=f.substring(f.indexOf('\n') + 1, f.lastIndexOf('}'));
	document.head.appendChild(ne);
}
