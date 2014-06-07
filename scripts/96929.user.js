// ==UserScript==
// @name           FB Image URL
// @description    Script for showing image URLs
// @include        http://www.facebook.com/*
// @include        https://www.facebook.com/*
// @version        1.7
// @author         Jake Lauer
// ==/UserScript==

//================Helper Methods==========================


window.addEventListener("mousemove", function(e) {
	var image = document.querySelector('img.spotlight');
	var linker = document.getElementById('linker');
	var fullPageImage = document.getElementById('fbPhotoImage');
	if( image && !fullPageImage )
	{
		if( !linker )
		{
			var where = document.getElementById('fbPhotoSnowboxMediaInfo');
			var linkWrap = document.createElement('div');
			linkWrap.setAttribute('id', 'linker');
			
			var link = document.createElement('a');
			link.setAttribute('href', image.getAttribute('src'));
			link.setAttribute('target', '_null');
			link.style.color = 'red';
			link.style.fontWeight = 'bold';
			link.innerHTML = 'Image Link&nbsp;<img src="http://upload.wikimedia.org/wikipedia/commons/6/64/Icon_External_Link.png"/>';
			
			linkWrap.appendChild(link);		
			
			where.appendChild(linkWrap);
		}
		else
		{
			linker.setAttribute('href', image.getAttribute('src'));
		}
		
		linker.style.paddingTop = '5px';
	}
	
	if( fullPageImage )
	{
		if( !linker )
		{
			var image = fullPageImage;
			var where = document.getElementById('fbPhotoPageMediaInfo');
			var linkWrap = document.createElement('div');
			linkWrap.setAttribute('id', 'linker');
			
			var link = document.createElement('a');
			link.setAttribute('href', image.getAttribute('src'));
			link.setAttribute('target', '_null');
			link.style.color = 'red';
			link.style.fontWeight = 'bold';
			link.innerHTML = 'Image Link&nbsp;<img src="http://upload.wikimedia.org/wikipedia/commons/6/64/Icon_External_Link.png"/>';
			
			linkWrap.appendChild(link);		
			
			where.appendChild(linkWrap);
		}
		else
		{
			linker.setAttribute('href', image.getAttribute('src'));
		}
		
		linker.style.paddingTop = '5px';
	}
	
}, false);