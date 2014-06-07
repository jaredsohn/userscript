// ==UserScript==
// @name       YouTube Embed
// @author     rp
// @description  Converts YouTube links into embedded video
// @include    http*://filelist.ro/*
// @include    http*://flro.org/*
// @date       2012.Feb.02
// @version    1.0
// ==/UserScript==

//// http ////

var e=document.getElementsByTagName('a');
var pushed=new Array();
for(i=0;i<e.length;i++)
{

	if(e[i].href.match("http://(www\.|)youtube\.com/watch"))
	{
		argus=e[i].href.substring(e[i].href.indexOf('?')+1).split('&');
		for(x=0;x<argus.length;x++)
			if(!argus[x].indexOf('v='))
				
				createVideo(e[i],argus[x].substring(2))
	}
}

function createVideo(e,tubelink)
{
if(!tubelink.match("[A-Za-z0-9_\-]{11}"))
	return;
if(pushed.indexOf(tubelink)!=-1){
	alink=document.createElement('a');
	alink.setAttribute('href','#shuTube_'+tubelink);
	alink.innerHTML=e.innerHTML;
	e.parentNode.replaceChild(alink,e);
	return;
}
pushed.push(tubelink);
tubeobj=document.createElement('object');
tubeobj.setAttribute('width','640');
tubeobj.setAttribute('height','380');
tubeobj.setAttribute('id','shuTube_'+tubelink)
tubeobj.innerHTML = '<param name="movie" value="http://www.youtube.com/v/"'+tubelink+'></param><param name="wmode" value="transparent"></param><embed src="http://www.youtube.com/v/'+tubelink+'" type="application/x-shockwave-flash" wmode="transparent" width="640" height="380"></embed>'
newline=document.createElement('br');
e.parentNode.insertBefore(newline,e);
e.parentNode.insertBefore(tubeobj,newline);
newline=document.createElement('br');
e.parentNode.insertBefore(document.createElement('br'),tubeobj);
}

//// https ////

var e=document.getElementsByTagName('a');
var pushed=new Array();
for(i=0;i<e.length;i++)
{

	if(e[i].href.match("https://(www\.|)youtube\.com/watch"))
	{
		argus=e[i].href.substring(e[i].href.indexOf('?')+1).split('&');
		for(x=0;x<argus.length;x++)
			if(!argus[x].indexOf('v='))
				
				createVideo(e[i],argus[x].substring(2))
	}
}

function createVideo(e,tubelink)
{
if(!tubelink.match("[A-Za-z0-9_\-]{11}"))
	return;
if(pushed.indexOf(tubelink)!=-1){
	alink=document.createElement('a');
	alink.setAttribute('href','#shuTube_'+tubelink);
	alink.innerHTML=e.innerHTML;
	e.parentNode.replaceChild(alink,e);
	return;
}
pushed.push(tubelink);
tubeobj=document.createElement('object');
tubeobj.setAttribute('width','640');
tubeobj.setAttribute('height','380');
tubeobj.setAttribute('id','shuTube_'+tubelink)
tubeobj.innerHTML = '<param name="movie" value="http://www.youtube.com/v/"'+tubelink+'></param><param name="wmode" value="transparent"></param><embed src="http://www.youtube.com/v/'+tubelink+'" type="application/x-shockwave-flash" wmode="transparent" width="640" height="380"></embed>'
newline=document.createElement('br');
e.parentNode.insertBefore(newline,e);
e.parentNode.insertBefore(tubeobj,newline);
newline=document.createElement('br');
e.parentNode.insertBefore(document.createElement('br'),tubeobj);
}