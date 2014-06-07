// ==UserScript==
// @name           kott's vkontakte music download
// @namespace      http://vkontakte.ru
// @description    Music download for vkontakte.ru
// @include        http://vkontakte.ru/*
// ==/UserScript==

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
    addon.innerHTML="<img src=http://s42.radikal.ru/i098/0909/f6/3244096f02de.png>";

    var artb=document.getElementById("performer"+postfix+id);

    var el = artb.parentNode.getElementsByTagName("small")[0];
    if (el) artb.parentNode.removeChild(el);
    
    var duration = artb.parentNode.parentNode.getElementsByTagName("div")[1];
    duration.innerHTML += "&nbsp;";
    duration.appendChild(addon);
    
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
}


addLyrics("audios");
addLyrics("results");
addLyrics("wall");