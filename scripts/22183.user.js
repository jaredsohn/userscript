// ==UserScript==
// @name           deviantWatch Thumbnails
// @namespace      WindPower
// @description    Enables thumbnails in deviantWatch for deviantArt non-subscribers.
// @include        http://my.deviantart.com/devwatch/
// ==/UserScript==
var ch=document.getElementsByName('deviationids[]');
var as=new Array();
var xhr=new Array();
var deviants=new Array();
var deviationindex=new Array();
var deviations=new Array();
var gotdeviant='';
for(var i=0;i<ch.length;i++)
{
	as[i]=ch[i].parentNode.getElementsByTagName('a');
	var deviant=as[i][as[i].length-1].firstChild.nodeValue;
	if(gotdeviant.indexOf(','+deviant)==-1)
	{
		gotdeviant+=','+deviant;
		deviants[deviants.length]=deviant;
		deviations[deviant]=new Array();
		deviationindex[deviant]=new Array();
	}
	deviations[deviant][deviations[deviant].length]=ch[i].value;
	deviationindex[deviant][deviationindex[deviant].length]=i;
}
for(var i=0;i<deviants.length;i++)
{
	GM_xmlhttpRequest({'method':'GET',
		'url':'http://'+deviants[i]+'.deviantart.com/stats/gallery/script.js',
		'onload':eval('function(response){var devs=\''+deviations[deviants[i]].join(',')+'\'.split(\',\');var inds=\''+deviationindex[deviants[i]].join(',')+'\'.split(\',\');for(var i=0;i<devs.length;i++){img=document.createElement(\'img\');img.src=new RegExp(\'id:\\\\s*\'+devs[i]+\'\\\\s*,\\\\s*thumb:\\\\s*"([^"]+)"\',\'ig\').exec(response.responseText)[1].replace(/\\\\/ig,\'\').replace(\'/100/\',\'/150/\');img.style.marginRight=\'5px\';img.height=\'100\';var ch=document.getElementsByName(\'deviationids[]\')[inds[i]].parentNode.getElementsByTagName(\'a\')[1];ch.insertBefore(img,ch.firstChild);}}')
	});
}