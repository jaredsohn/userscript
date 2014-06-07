// ==UserScript==
// @name           Webshots Fullsize Images
// @namespace     Webshots Fullsize Images
// @include		http://*.webshots.com
// @include		http://www.webshots.com
// @include		http://*.webshots.com/*
// ==/UserScript==
	
var rt = window.document.body.innerHTML;
var io1=0; io1 = rt.indexOf('<param name="flashvars" value="src=http://');

if(io1)
{
	var imgSrc = rt.substring(io1+35, rt.indexOf('_ph.jpg"',io1));
	if (imgSrc.substring(0,7) == 'http://') 
	{
		var FullSizeImg = imgSrc + '_fs.jpg';
		var NormalSizeImg = imgSrc + '_ph.jpg';
		var UserMenu  = document.getElementsByClassName('tt fullsize');
		var FSElement = document.createElement('div');
		var FSImage = document.getElementById('photo-frame');
		
		var fslink = '<a href="' + FullSizeImg + '" target="_blank" style="display: block; line-height: 14px; border: 1px solid #fff; background: #666; font-family: Arial, Helvetica; font-size: 10px; font-weight: bold; color: #fff;">FULL<br>SIZE</a>';
		
		FSElement.innerHTML = fslink;
		FSElement.style.marginTop = '15px';
		FSElement.style.width = '35px';
		FSElement.style.textAlign = 'center';
		FSImage.appendChild(FSElement);
		
	}
}	
