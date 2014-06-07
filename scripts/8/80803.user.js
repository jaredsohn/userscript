// ==UserScript==
// @name           JAlbum Direct links
// @namespace      JAlbum_Direct_links_User3274647385
// @description    Creates Direct links for JAlbum.
// @include        *
// @require        http://ajax.microsoft.com/ajax/jQuery/jquery-1.3.2.min.js
// @version        0.0.1
// ==/UserScript==

String.prototype.startsWith = function(str){
    return (this.indexOf(str) === 0);
}

if($('#jalbumwidgetcontainer').length<=0)
	return;

$('img').each( function() 
{
	var img = $(this);
	var src = img.attr('src');
	if(!src.startsWith("thumbs/"))
		return;
	src = src.replace('thumbs/', 'slides/');
	var a = img.closest('a');
	var ahref = a.attr('href');
	if(ahref.startsWith('slides/'))
		a.attr('href', src);
});

//alert('d');

