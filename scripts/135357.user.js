// ==UserScript==

// @name          Perl's 4Chan image enlarger

// @namespace     http://www.jimmi.es

// @description   Enlarge images in 4Chan threads.

// @include       http://boards.4chan.org/*

// ==/UserScript==

/*
<a class="fileThumb" href="//images.4chan.org/b/src/1338917539197.jpg" target="_blank">
<img src="//0.thumbs.4chan.org/b/thumb/1338917539197s.jpg" alt="113 KB" data-md5="+skHhbPzI/iVsuylvx/+DA==" style="height: 201px; width: 252px;"/>
</a>
*/

function enlargeImages() {
    node = document.getElementsByTagName("body")[0];
    var a = [];
    var re = new RegExp('\\b' + "fileThumb" + '\\b');
    var els = node.getElementsByTagName("*");
    for(var i=0,j=els.length; i<j; i++)
        if(re.test(els[i].className))a.push(els[i]);
    var fileThumbs = a;

	for ( i = 0; i < fileThumbs.length; i++)
	{
		var url = fileThumbs[i].href;
		var img = fileThumbs[i].childNodes[0];
		img.src = url;
		img.style.height = 'auto';
		img.style.width = 'auto';
	}
}

msg = document.getElementById("globalMessage")
button = document.createElement('input');
button.setAttribute('type', 'hidden');
button.click = enlargeImages;
setInterval(button.click, 1000)
