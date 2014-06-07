// ==UserScript==
// @name 	Opel Műhely Youtube Videó Beillesztő
// @description Youtube videók beillesztése 1 kattintással az Opel Műhely oldalra!
// @version     1.0
// @date 	2012-05-25
// @creator 	info@opelmuhely.com
// @include	http://youtube.com/*v=*
// @include	http://www.youtube.com/*v=*
// @homepage	http://opelmuhely.com
// ==/UserScript==

var local_version = '1.0';

var youtubeTitleLink = 1;

var vars = {};

var url = encodeURIComponent(document.URL);

var video_id = window.location.search.split('v=')[1];
var ampersandPosition = video_id.indexOf('&');
if(ampersandPosition != -1) {
  video_id = video_id.substring(0, ampersandPosition);
}

var dl_url = 'http://opelmuhely.com/video-beillesztes/'+video_id;


addDownloadBox();
if (url.indexOf('youtube.com')!=-1 && youtubeTitleLink){
	
	addDownloadLink();
}

function addDownloadLink(){
    var link =' [ <a href="' + dl_url + '" title="Beillesztés az Opel Műhely-re">Beillesztés az Opel Műhely-re</a> ]';
	var title = document.getElementById("watch-headline-title").innerHTML.replace("</h1>",link+"</h1>");
	document.getElementById("watch-headline-title").innerHTML = title;
}

function addDownloadBox() {

	var styles = [
		'#OMBox {position: fixed; right: 5px; bottom: 5px; z-index: 1000;opacity: 0.8;}',
		'#OMBox a {font-size:11px;font-family:Verdana;font-weight:bold;color:#008C00 !important;text-align:center;outline:none;background-color: #DFF1FD;border:1px solid #B6D9EE;padding:4px;display:block;text-decoration:none;}',
		'#OMBox a:hover {border:1px solid #AE150E;background-color:#CE1A10;color:#FFFFFF !important;text-decoration:none;}'
	];
	
	GM_addStyle(styles.join("\r\n"));

	var downloadBox = document.createElement('div');
	document.body.appendChild(downloadBox);
	
	downloadBox.id = 'OMBox';
	downloadBox.innerHTML = '<a title="Beillesztés" target="_blank" href="' + dl_url + '">Beillesztés az Opel Műhely-re</a>';
	
	
}