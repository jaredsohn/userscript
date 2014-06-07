// ==UserScript==
// @name           Facebook album merger
// @namespace      http://mike.thedt.net
// @description    This script will add a drop-down list on the "Edit Album" page that will  automatically select the album you want to move all the photos in the current album. This is useful since Facebook has increased the maximum photos an album can hold to 200 photos, and you may want to move all the photos from one album into another.
// @include        http://www.facebook.com/editphoto.php?aid=*
// @include        http://facebook.com/editphoto.php?aid=*
// ==/UserScript==

var editphotoalbum = document.getElementById('editphotoalbum');
var photos = editphotoalbum.childNodes;
var selects = editphotoalbum.getElementsByTagName('select');
var moveallphotostext = document.createElement("div");
var tempHTML;

function MoveAllToAlbum()
{
	var mySelect = document.getElementById('moveallphotos');
	album = mySelect.value;

	for (var i = 0; i < selects.length; i++) 
	{
		document.getElementById(selects[i].name).value = album;
    }	
}

	tempHTML = '<div style="padding-left: 10px; padding-bottom: 5px;">Move all photos to:\n<select id="moveallphotos" class="" name="moveallphotos">\n';

    for (var i = 0; i < selects[0].length; i++) {
		tempHTML = tempHTML + '\t<option value="' + selects[0].options[i].value + '">' + selects[0].options[i].text +'</option>\n';
	}

	  tempHTML = tempHTML + '</select></div>'
	  
moveallphotostext.innerHTML = tempHTML;
photos[0].parentNode.insertBefore(moveallphotostext, photos[0]); //Insert our select object before the first photo

var mySelect = document.getElementById('moveallphotos');
mySelect.addEventListener("change", MoveAllToAlbum, true); 