// ==UserScript==
// @name       91Porn下载地址获取器
// @updateURL  http://userscripts.org/scripts/source/483538.meta.js
// @homepageURL http://userscripts.org/scripts/show/483538
// @version    0.1
// @description  91Porn下载地址获取器
// @include      http://91p.vido.ws/*
// @include      http://www.91porn.com/*
// @copyright  2014+, 哎哟不错哦
// ==/UserScript==

if( typeof(so) != 'undefined'){
	//console.log('http://91p.vido.ws/getfile.php?VID='+so.getVariable('file')+'&mp4=1&seccode='+so.getVariable('seccode')+'&max_vid='+so.getVariable('max_vid'));
	$('#mediaspace').append('<a href="'+'getfile.php?VID=' +so.getVariable('file') +'&mp4=1&seccode=' +so.getVariable('seccode') +'&max_vid='+so.getVariable('max_vid')+'" target="_blank">高清版下载</a><br>');
	$('#mediaspace').append('<a href="'+'getfile.php?VID=' +so.getVariable('file') +'&mp4=0&seccode=' +so.getVariable('seccode') +'&max_vid='+so.getVariable('max_vid')+' " target="_blank">普通版下载<br>');
}
