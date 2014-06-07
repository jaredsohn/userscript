// ==UserScript==
// @name	Simple Vbox7 Downloader
// @namespace   http://userscripts.org/scripts/show/106027
// @description Download videos directly from vbox7.com
// @include	http://*vbox7.com/play:*
// @version	0.2
// @copyright	chazz <chazzbg@gmail.com>
// @author	Chazz
// @homepage 	http://worldofchazz.net
// ==/UserScript==
var clipid = window.location.href;
clipid = clipid.split("play:");
if(clipid[1].search("&")>0){
	clipid=clipid[1].split("&");
	clipid = clipid[0];
} else {
	clipid = clipid[1];
}

var elm = document.createElement('span');
elm.id = 'vbdl';
elm.setAttribute('style', 'position:fixed;z-index:1100;bottom:-3px;left: -3px;background-color: #292929;border: 1px solid #afafaf;border-radius: 5px;box-shadow: 0 0 5px #afafaf;color: #afafaf;height:25px;padding:3px;font-size: 11px;');
document.body.appendChild(elm);

var post_data = 'vid=http://vbox7.com/play:'+clipid+'&gm=true';
	
GM_xmlhttpRequest({
method: 'POST',
url: 'http://vbox.worldofchazz.net/handler.php',
data: post_data,
headers: {
	'User-Agent':'Mozilla/5.0 (Windows NT 6.1; rv:5.0) Gecko/20100101 Firefox/5.0',
	'Content-type':'application/x-www-form-urlencoded'
},onload:function(r){

	elm.innerHTML = '<a style="float:left; color:#afafaf" href="http://vbox.worldofchazz.net"><img src="http://vbox.worldofchazz.net/images/fav.png" width=" 23px" /></a> <div style="float:left;padding:5px;color:#afafaf" ><a style="color:#afafaf" href="'+r.responseText+'">Свали/Download</a></div>';
}
	
});