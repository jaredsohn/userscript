// ==UserScript==
// @name           ImageFap Gallery Filter
// @namespace      rlvision
// @version        1.1
// @description    Allows you to hide galleries that have 1) low resolution images 2) a description you don't like, or 3) too few images. Edit the script to configure it to suit your taste.
// @include        http://www.imagefap.com/gallery.php*
// @include        http://www.imagefap.com/pics/*
// @include        http://www.imagefap.com/search/*
// ==/UserScript==


// -- config --------------------------------------

var unwanted_sizes = [ 'medium' ,  'small' ];
var unwanted_words = [ 'fake' , 'caption' , 'scat' ];
var min_num_images = 5;

// ------------------------------------------------




// -- remove unwanted sizes --

var elm = document.getElementsByTagName('img');
for (var i = 0; i < elm.length; i++)
{
	for( n=0; n<unwanted_sizes.length; n++)
	{
		if( elm[i].src.indexOf( unwanted_sizes[n] ) != -1 )
		{
			elm[i].parentNode.parentNode.parentNode.style.display = 'none';
			elm[i].parentNode.parentNode.parentNode.nextSibling.nextSibling.style.display = 'none';
		}
	}
}

// -- remove unwanted words --

elm = document.getElementsByClassName('gal_title');
for (var i = 0; i < elm.length; i++)
{
	for( n=0; n<unwanted_words.length; n++)
	{
		if( elm[i].innerHTML.toLowerCase().indexOf( unwanted_words[n] ) != -1 )
		{
			elm[i].parentNode.parentNode.style.display = 'none';
			elm[i].parentNode.parentNode.nextSibling.nextSibling.style.display = 'none';
		}
	}
}

// -- remove min number of images --

var unwanted_numbers = new Array();
for( n=1; n<min_num_images; n++ )
{
	unwanted_numbers[n]= '<center>&nbsp;' + n + '&nbsp;</center>';
}

elm = document.getElementsByTagName('td');
for (var i = 0; i < elm.length; i++)
{
	for( n=0; n<unwanted_numbers.length; n++)
	{
		if( elm[i].innerHTML == unwanted_numbers[n] )
		{
			elm[i].parentNode.style.display = 'none';
			elm[i].parentNode.nextSibling.nextSibling.style.display = 'none';
		}
	}
}

