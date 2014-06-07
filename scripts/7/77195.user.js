// ==UserScript==
// @name           vkontakte music download
// @namespace      http://vkontakte.net.ru
// @description    Music download for vkontakte.ru
// @include        http://vkontakte.ru/*
// ==/UserScript==

function trim(str) {
    return str.replace(/\"/g, "");
}


function addLyric(id) {
    var img = document.getElementById("imgbutton"+id);
    var str = img.getAttribute("onclick");
    var re=/operate\(\d+,\'([^\']+)\'/;
    var arr=re.exec(str);
    var addon=document.createElement("a");
    var link=arr[1];
    
    var tr=img.parentNode.parentNode;

    var title_a=tr.getElementsByTagName('td')[1].getElementsByTagName('b')[0].innerHTML;
    var title_t=tr.getElementsByTagName('td')[1].getElementsByTagName('span')[0].innerHTML;
    var songtitle = title_a+" - "+title_t;
    songtitle = trim(songtitle);

    addon.setAttribute("title",songtitle);
    addon.setAttribute("alt",songtitle);

    addon.setAttribute("href",link);
    addon.innerHTML="\u0441\u043A\u0430\u0447\u0430\u0442\u044C";

    var span = document.getElementById("title"+id);
    var title=span.innerHTML.replace(/<[^>]+>/g,"");
    var artb=document.getElementById("performer"+id);
    var artist=artb.innerHTML.replace(/<[^>]+>/g,"");    
    var newdiv=document.createElement("div");
    var addon1=document.createElement("a");
    addon1.setAttribute("href","http://www.lyricsplugin.com/wmplayer03/plugin/?artist="+encodeURIComponent(artist)+"&title="+encodeURIComponent(title));
    addon1.setAttribute("target","_blank");
    addon1.innerHTML="\u0442\u0435\u043A\u0441\u0442";
    newdiv.appendChild(addon);
    newdiv.innerHTML += " | ";
    newdiv.appendChild(addon1);
    newdiv.className="duration";

    artb.parentNode.parentNode.appendChild(newdiv);
    
}

function addLyrics() {
    var parent = document.getElementById("audios");
    if (!parent) {
	parent = document.getElementById("bigResult");
    }
    if(parent){
	code=document.createElement("div");
	code.setAttribute("id","blogcode");
	code.style.display='none';
	code.setAttribute("style","font-size:30px;background-color:white;display:none;position:absolute;width:500px;height:100px;top:100px;left:200px;");
	bloglabel=document.createElement("div");
	bloglabel.innerHTML="\u041a\u043e\u0434 \u0434\u043b\u044f \u0432\u0441\u0442\u0430\u0432\u043a\u0438 \u0432 \u0431\u043b\u043e\u0433";
	bloglabel.setAttribute("style","float:left;");
 
	bloginput=document.createElement("input");
	bloginput.setAttribute("id","bloginput");
	bloginput.setAttribute("readonly","1");
	bloginput.setAttribute("style", "background-color:white;font-size:30px;width:450px;border:#CCCCCC 5px solid;color:#666666");
	bloginput.setAttribute("onclick","javascript:this.focus();this.select();");


	cross=document.createElement("a");
	cross.setAttribute("href","#");
	cross.setAttribute("style", "float:right;background-color:white;font-size:30px;width:30px;border:#CCCCCC 0px solid;color:#666666");
	cross.setAttribute("title","\u0437\u0430\u043a\u0440\u044b\u0442\u044c");
	cross.innerHTML="X";
	cross.setAttribute("onclick","javascript:document.getElementById('blogcode').style.display='none';");

	code.appendChild(bloglabel);
	code.appendChild(cross);
	code.innerHTML+="<br>";
	code.appendChild(bloginput);


	notelabel=document.createElement("div");
	notelabel.innerHTML+="\u041a\u043e\u0434 \u0434\u043b\u044f \u0432\u0441\u0442\u0430\u0432\u043a\u0438 \u0432 \u0437\u0430\u043c\u0435\u0442\u043a\u0438"
	notelabel.setAttribute("style","display:none;");

	noteinput=document.createElement("input");
	noteinput.setAttribute("id","noteinput");
	noteinput.setAttribute("readonly","1");
	noteinput.setAttribute("style", "display:none;");
	noteinput.setAttribute("onclick","javascript:this.focus();this.select();");	

	var re=/audio\.php\?[0-9]+/;
	var ll=re.exec(document.location);
	if (ll) {
	    noteinput.setAttribute("style", "background-color:white;display:block;font-size:30px;width:450px;border:#CCCCCC 5px solid;color:#666666");
	    notelabel.setAttribute("style","display:block;");
	}

	code.appendChild(notelabel);
	code.appendChild(noteinput);

	document.body.appendChild(code);
	var audios = parent.getElementsByTagName("div");
	re=/audio(\d+)/;
	for (var i=0;i<audios.length;i++) {
	    var m = audios[i].id.match(re);
	    if (m) {
		addLyric(m[1]);
	    }
	}
    }
}

function makeLyrics(){

    var ab = document.getElementById('audioBar');
    if (ab){
    	pages = ab.getElementsByTagName("li");
	for (var i=0;i<pages.length;i++) {
	    pages[i].childNodes[0].addEventListener('click', function(){window.setTimeout(makeLyrics, 3000);}, false);
	}
    }
    addLyrics();
}

makeLyrics();


