// ==UserScript==
// @name           VK Audio Leecher
// @namespace      Oberon
// @description    Download Music Easily
// @include        vkontakte.ru/*
// ==/UserScript==

var intID;
var num = 0;
addEventListener('load',Interval,false);
addEventListener('click',Interval,false);
addEventListener('keydown',Interval,false);

function makeLinks(){
	num++;
	if (num==10)
	{
		clearInterval(intID);
		num=0;
	}
	//document.title=num;
    var allImgs = document.getElementsByClassName("playimg");
    //if (allImgs.length && allImgs[0].parentNode.parentNode.getElementsByClassName("MP3Link").length) 
    //    return;
    for (var i = 0; i < allImgs.length; i++) 
        extend(allImgs[i]);
    hasLinks=true;
}

function Interval()
{
        var reslist = document.getElementsByClassName(" first ");
	if (reslist[0])
		reslist[0].addEventListener('mousedown',Interval,false);
	reslist = document.getElementsByClassName("last active last_active");
	if (reslist[0])
		reslist[0].addEventListener('mousedown',Interval,false);
	clearInterval(intID);
	num=0;
	intID = setInterval(makeLinks, 300)
}

function extend(img){
    if (img.parentNode.parentNode.getElementsByClassName("MP3Link").length)
	return;
    var str = img.wrappedJSObject.onclick.toString();
    var mp3link = '';
    var arr = /operate.*?(http\:\/\/.*?\.mp3)/(str);
    if (arr == null) {
        arr = /operate.*?(\d+?)\,.+?(\d+?)\,.+?(\d+)\,(.+?)\,.+?(\d+?)/(str);
        if (arr != null) {
            var filename = arr[4];
            filename = filename.replace('"', '');
            filename = filename.replace(' ', '');
            filename = filename.slice(0, filename.length - 1);
            mp3link = 'http://cs' + arr[2] + '.vkontakte.ru/u' + arr[3] + '/audio/' + filename + '.mp3';
        }
    }
    else {
        mp3link = arr[1];
    }
    if (mp3link != '') {
        var imgtd = img.parentNode;
	var td = imgtd.parentNode.getElementsByClassName("duration")[0].parentNode.childNodes[0];
        var downloadSpan = document.createElement("span");
        var link = document.createElement("a");
        link.setAttribute("title", "Download this file");
        link.setAttribute("href", mp3link);
        link.innerHTML = "<img src=\"http://img710.imageshack.us/img710/7205/download.gif\">";
        downloadSpan.setAttribute("class", "MP3Link");
        td.insertBefore(downloadSpan, td.childNodes[0]);
	downloadSpan.appendChild(link);
	downloadSpan.innerHTML+="&nbsp;&nbsp;";
    }
}