// ==UserScript==
// @name           vkontakte music download
// @namespace      http://vkontakte.net.ru
// @description    Music download for vkontakte.ru
// @include        http://vkontakte.ru/*
// ==/UserScript==


function addDownload(img) {
    var str="";
    if (img.wrappedJSObject) {
	str=img.wrappedJSObject.onclick.toString();
    } else {
	str=img.onclick.toString(); //opera workaround
    }
    var re=/operate\((\d+)[^0-9]+(\d+)[^0-9]+(\d+),[^0-9a-zA-Z]+([0-9a-zA-Z]+)/;
    var arr=re.exec(str);
    //operate(209145,1044,362847,'db5a6cba31',194);
    //http://cs1044.vkontakte.ru/u362847/audio/db5a6cba31.mp3
    var td=img.parentNode;
    var addon=document.createElement("a");
    var user=arr[3];
    if (user<100000) {
	user=parseInt(user)+100000;
	user=(user.toString()).substr(1);
    }
    addon.setAttribute("href","http://cs"+arr[2]+".vkontakte.ru/u"+user+"/audio/"+arr[4]+".mp3");
    addon.innerHTML="download";
    td.appendChild(addon);
}

function addDownloads() {
    var imgs=document.getElementsByTagName("img");

    for (var i=0;i<imgs.length;i++) {
	if (imgs[i].className=="playimg") {
	    addDownload(imgs[i]);
	}
    }
}

function addLyric(span) {
    var title=span.innerHTML;
    if (span.getElementsByTagName("a").length>0) {
	title=span.getElementsByTagName("a")[0].innerHTML;
    }
    var parent=span.parentNode;
    var artb=parent.getElementsByTagName("b")[0];
    var artist=artb.innerHTML;    
    if (artb.getElementsByTagName("a").length>0) {
	artist=artb.getElementsByTagName("a")[0].innerHTML;
    }
    var newdiv=document.createElement("div");
    var addon=document.createElement("a");
    //    addon.setAttribute("href","http://lyrc.com.ar/en/tema1en.php?artist="+artist+"&songname="+title);
    addon.setAttribute("href","http://www.lyricsplugin.com/wmplayer03/plugin/?artist="+encodeURIComponent(artist)+"&title="+encodeURIComponent(title));
    addon.setAttribute("target","_blank");
    addon.innerHTML="lyrics";
    newdiv.appendChild(addon);
    newdiv.className="duration";
    parent.parentNode.appendChild(newdiv);
}

function addLyrics() {
    var spans= document.getElementsByTagName("span");
    re=/title\d+/;
    for (var i=0;i<spans.length;i++) {
	if (re.test(spans[i].id)) {
	    addLyric(spans[i]);
	}
    }
}

addLyrics();
addDownloads();