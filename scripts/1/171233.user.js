// ==UserScript==
// @name        AutoYT2MP3
// @namespace   AutoYT2MP3
// @include     http://*.youtube.com/watch*
// @include     http://youtube.com/watch*
// @include     http://www.video2mp3.net/view/*
// @include     http://www.video2mp3.net/promo.php?dlink=*
// @include     http://www.vidtomp3.com/middle.php?server=*
// @include     http://www.vidtomp3.com/download.php?server=*
// @require http://www.aussieelectronics.com/gm_config.js
// @version     1
// ==/UserScript==

GM_config.init('AutoYT2MP3 Options',
{
	'downloadit':
	{
		'label': 'Automatically convert every video to mp3?',
		'type': 'checkbox',
		'default': false
	}
});

GM_registerMenuCommand('AutoYT2MP3 Options', opengmcf);

function opengmcf(){
	GM_config.open();
}

if(document.location.href.indexOf('video2mp3.net') != -1){
	document.location = location.href.replace('view', 'load');
}
else if(document.location.href.indexOf('youtube.com') != -1){
	var newElement;
	var newElement2;
	if(GM_config.get('downloadit') == 1){
		newElement = document.createElement('iframe');
		newElement.src = 'http://www.video2mp3.net/loading.php?url=' + escape(document.location.href + '&hd=1&fmt=22') + '&hq=1';
		newElement.width = '1';
		newElement.height = '1';
	}
	else{
		newElement = document.createElement('a');
		newElement.id = 'newElement';
		newElement.href = "javascript:function func() {newFElement=document.createElement('iframe');newFElement.src='http://www.video2mp3.net/loading.php?url='+escape(document.location.href+'&hd=1&fmt=22')+'&hq=1&quality=1';newFElement.width='1';newFElement.height='1';document.getElementById('watch7-headline').parentNode.insertBefore(newFElement,document.getElementById('watch7-headline').nextSibling);document.getElementById('newElement').innerHTML='Converting and downloading..';} func();";
		newElement.innerHTML= 'Convert with Video2MP3';

		newElement2 = document.createElement('a');
		newElement2.id = 'newElement2';
		newElement2.href = "javascript:function func() {newFElement2=document.createElement('iframe');newFElement2.src='http://www.vidtomp3.com/process.php?url='+escape(document.location.href+'&hd=1&fmt=22');newFElement2.width='1';newFElement2.height='1';document.getElementById('watch7-headline').parentNode.insertBefore(newFElement2,document.getElementById('watch7-headline').nextSibling);document.getElementById('newElement2').innerHTML='Converting and downloading..';} func();";
		newElement2.innerHTML= '(or VidToMp3)';
	}
	var navbar = document.getElementById('watch7-sentiment-actions');
	if (navbar) {
		navbar.parentNode.insertBefore(newElement2, navbar.nextSibling);
		navbar.parentNode.insertBefore(document.createTextNode(' '), navbar.nextSibling);
		navbar.parentNode.insertBefore(newElement, navbar.nextSibling);
	}
}
else if(document.location.href.indexOf('vidtomp3.com') != -1){
	if(document.getElementById('downloadmp3') != null){
		var dllink = document.getElementById('downloadmp3').parentNode.innerHTML;
		dllink = dllink.substring(dllink.indexOf('location.href') + 15);
		dllink = dllink.substring(0, dllink.indexOf("'"));
		location.href=dllink;
	}
	else{
		//location.href = document.getElementById('linkarea').childNodes[1].childNodes[1].childNodes[1].childNodes[3].childNodes[5].childNodes[1].href;
		document.getElementById('linkarea').childNodes[1].childNodes[1].childNodes[1].childNodes[3].childNodes[5].childNodes[1].click();
	}
}