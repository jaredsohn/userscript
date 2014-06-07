// ==UserScript==
// @name           Youtube inline watcher
// @namespace      *
// @include        *
// @exclude        http://www.youtube.com/*
// @exclude        http://youtube.com/*
// @author         mcm69
// ==/UserScript==

/* show or hide the inline player */
function showdiv() {
	var vid = this.getAttribute('wtf'); //video id
	dd = document.getElementById('youtube_inline_div');
	if ((dd.style.display == 'block') && (vid == dd.getAttribute('videoid'))) {
			dd.style.display = 'none';
			return;
	} 
		else
	{
		//load contents
		
		dd.setAttribute('videoid', vid);
		dd.innerHTML = 
		'<object width="425" height="350">' +
		'<param name="movie" value="http://www.youtube.com/v/' + vid + '&amp;autoplay=1"></param>' +
		'<param name="wmode" value="transparent"></param>' +
		'<embed src="http://www.youtube.com/v/' + vid
		+ '&amp;autoplay=1" type="application/x-shockwave-flash" wmode="transparent" width="425" height="350">' +
		'</embed></object>';
		// insert it in new place
		var winwidth = window.innerWidth;
		if(winwidth<450)
			dd.style.left = Math.max((findPosX(this) - 130), 20) + "px";
		else
			if (findPosX(this)+300 > winwidth)
				dd.style.left = winwidth-450 + "px";
			else
				dd.style.left = Math.max((findPosX(this) - 130), 20) + "px";
		dd.style.top = (findPosY(this) + 20) + "px";
		dd.style.display = 'block';
		d.focus();
	}
}

	
/* init div */
	var d = document.createElement('DIV');
	d.id = "youtube_inline_div";
	d.style.display="none";
	d.innerHTML = "";
	document.body.appendChild(d);
	var css=" #youtube_inline_div { position: absolute; display: none; border: 1px solid #999;"+
			"	background: #ececec; padding: 1px; text-align: center; z-index:99}";
	style = document.createElement('STYLE');
	style.type = 'text/css';
	style.innerHTML = css;
	document.body.appendChild(style);

/* init links */
function init() 
{
		var all = document.getElementsByTagName('a')
		for (var i = 0, o; o = all[i]; i++) {
			if(o.href.match(".*youtube.com\/watch\?.*v=.*($|&)")) {
				var img = document.createElement('img');
				img.src = 'http://images.del.icio.us/static/img/mp3/play.gif'; img.title = 'play inline';
				img.height = img.width = 12;
				img.style.border = 'none';
				img.style.marginRight = '0.5em';
				img.style.cursor = 'pointer';
				var href=o.href;
				href = href.substr(href.indexOf('v=')+2);
				if (href.indexOf('&') != -1)
					href = href.substr(0, href.indexOf('&'));
				img.setAttribute('wtf', href);
				img.addEventListener('click', showdiv, false);
				o.parentNode.insertBefore(img, o);
			}
		}
}
init();

/* routines */
function findPosX(obj) {
	var curleft = 0;
	if (obj.offsetParent) {
		while (obj.offsetParent) {
			curleft += obj.offsetLeft
			obj = obj.offsetParent;
		}
	} 
	return curleft;
}

function findPosY(obj) {
	var curtop = 0;
	if (obj.offsetParent) {
		while (obj.offsetParent) {
			curtop += obj.offsetTop
			obj = obj.offsetParent;
		}
	} 
	return curtop;
}