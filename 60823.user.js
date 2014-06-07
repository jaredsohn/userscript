// ==UserScript==
// @name           kott's vkontakte music download
// @namespace      http://vkontakte.ru
// @description    Music download for vkontakte.ru
// @include        http://vkontakte.ru/*
// @include        http://vk.com/*
// ==/UserScript==

var lyrics = function() {

function trim(str) {
    return str.replace(/\"/g, "");
}

function addLyric(id, postfix) {
    if (postfix == undefined) postfix = '';
    var img = document.getElementById("imgbutton"+postfix+id);
	var str = img.getAttribute("onclick");
	
	var addon=document.createElement("a");
	var tr=img.parentNode.parentNode;
	
    var re=/operate([a-zA-Z]*?)\((\d+)[^0-9]+(\d+)[^0-9]+(\d+),[^0-9a-zA-Z]+([0-9a-zA-Z]+)/;
    var arr=re.exec(str);
    
    
    var link = '';
    if(arr !== null)
    {
        var user=arr[3];
        if (user<100000) {
	        user=parseInt(user)+100000;
	        user=(user.toString()).substr(1);
        }
        
        link="http://cs"+arr[2]+".vkontakte.ru/u"+user+"/audio/"+arr[4]+".mp3";
    }
    else
    {
        re=/'(\S+?)'/;
        arr=re.exec(str);
        link = arr[1];
    }
    

    addon.setAttribute("href",link);
    addon.innerHTML="\u2193" /*"\u0441\u043A\u0430\u0447\u0430\u0442\u044C"*/;
    
    var artb=document.getElementById("performer"+postfix+id);
    var title = document.getElementById("title"+postfix+id);
    var text = document.createElement("a");
    text.setAttribute("href","//lyricsplugin.com/wmplayer03/plugin/?artist="+encodeURIComponent(artb.textContent)+"&title="+encodeURIComponent(title.textContent));
    text.setAttribute("target","_blank");
    text.innerHTML="\u266A";

    var el = artb.parentNode.getElementsByTagName("small")[0];
    if (el) artb.parentNode.removeChild(el);
    
    var duration = artb.parentNode.parentNode.getElementsByTagName("div")[1];
    var len = duration.innerHTML;
    duration.innerHTML = "";
    duration.appendChild(addon);
    duration.innerHTML += "&nbsp;";
    duration.appendChild(text);
    duration.innerHTML += "&nbsp;" + len;
    
    var audioText = artb.parentNode.parentNode.getElementsByTagName("div")[0];
    if (audioText.getAttribute("class") == "audioText") audioText.setAttribute("style", "width:280px;");
}

function addLyrics(tag_class) {
    parent = document.getElementById(tag_class);
    if (parent)
    {
        audios = parent.getElementsByTagName("div");
	    re=/audio([a-zA-Z]*?)(\d+)/;
	    
	    for (var i=0;i<audios.length;i++)
	    {
	        m = audios[i].id.match(re);
	        if (m) { addLyric(m[2], m[1]); }
	    }
    }
    
    if (tag_class=="audios") {
		var s = document.getElementsByTagName("ul")[0].childNodes;
		for (i=0;i<s.length;i++) {
			if ( s[i].firstChild.href.match("javascript:") )
				s[i].firstChild.addEventListener("click", ff, false);
		}
	}
}

function again(){
	if (document.getElementById("progrTop").style.cssText.match("display: inline;")) {setTimeout(again,100);}
	else {setTimeout(lyrics,000);}
}

function ff(){
    setTimeout(again,200);
}
addLyrics("audios");
addLyrics("results");
addLyrics("wall");

}

var script = document.createElement("script");
script.type = "text/javascript";
script.textContent = lyrics.toString().replace("function ()","var lyrics = function ()") + "\nlyrics();";

document.body.appendChild(script);