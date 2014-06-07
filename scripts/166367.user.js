// ==UserScript==
// @name		News
// @version		1.2
// @include		/^http:\/\/www\.jeuxvideo\.com\/forums\/.*/
// ==/UserScript==

var xhr = new XMLHttpRequest(),
    bloc = document.querySelector('#col2 .bloc3'),
    bloc_inner = bloc.querySelector('.bloc_inner');

bloc_inner.innerHTML = '<img style="display:block;margin:auto" src="http://image.jeuxvideo.com/pics/loader.gif" />';
bloc.querySelector('h3 span').textContent = 'Les dernières news';
xhr.open('GET', 'http://www.jeuxvideo.com/news.htm', true);

xhr.onreadystatechange = function(e) {
	if (xhr.readyState == 4 && xhr.status == 200)
		bloc_inner.innerHTML = xhr.responseText.split('<div class="bloc_inner bloc_inner2">')[1].split('</div>')[0];
}
xhr.send(null);
