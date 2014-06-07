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
    var re=/operate\((\d+)[^0-9]+(\d+)[^0-9]+(\d+),[^0-9a-zA-Z]+([0-9a-zA-Z]+)/;
    var arr=re.exec(str);
    var addon=document.createElement("a");
    var user=arr[3];
    if (user<100000) {
	user=parseInt(user)+100000;
	user=(user.toString()).substr(1);
    }
    
    document.getElementById('imgbutton'+id).alt = 'Was';
    
    var tr=img.parentNode.parentNode;

    var title_a=tr.getElementsByTagName('td')[1].getElementsByTagName('b')[0].innerHTML;
    var title_t=tr.getElementsByTagName('td')[1].getElementsByTagName('span')[0].innerHTML;
    var songtitle = title_a+" - "+title_t;
    songtitle = trim(songtitle);

    
    var link="http://cs"+arr[2]+".vkontakte.ru/u"+user+"/audio/"+arr[4]+".mp3";

    addon.setAttribute("href",link);
    addon.innerHTML="\u0441\u043A\u0430\u0447\u0430\u0442\u044C";

    var span = document.getElementById("title"+id);
    var title=span.innerHTML.replace(/<[^>]+>/g,"");
    var artb=document.getElementById("performer"+id);
    var artist=artb.innerHTML.replace(/<[^>]+>/g,"");    
    var newdiv=document.createElement("div");
    var addon1=document.createElement("a");
    var lyrics = "http://www.lyricsplugin.com/wmplayer03/plugin/?artist="+encodeURIComponent(artist)+"&title="+encodeURIComponent(title);
    
    

    var thisuserstr=document.getElementById("myprofile").childNodes[0].getAttribute("href");
    var userre=/\/id([0-9]+)\?/;
    var thisuser=userre.exec(thisuserstr)[1];
    var notelink="[[audio"+thisuser+"_"+arr[1]+"]]";

    blogcode='<embed width="342" height="30" type="application/mpeg" src="'+link+'">'+songtitle.replace(/\'/g,"`")+'</embed>';
	artb.parentNode.parentNode.getElementsByTagName('div')[1].style.padding = "0px";
    artb.parentNode.parentNode.getElementsByTagName('div')[1].innerHTML = '<table cellspacing=\'0\' cellpadding=\'0\'><tr><td style=\'padding-right:2px\' align=\'right\'><a href="'+link+'" title="'+artist+' - '+title+'"><img alt="скачать" title="'+artist+' - '+title+'" width="38" height="9"/></a> </td><td> | '+artb.parentNode.parentNode.getElementsByTagName('div')[1].innerHTML+"</td></tr>"+
	"<tr><td style=\'text-align: right; padding-right:2px;\'><a href='"+lyrics+"' target='_blank'>текст</a></td></tr></table>";
    artb.parentNode.parentNode.getElementsByTagName('div')[0].style.width='275px';
    
    //artb.parentNode.parentNode.appendChild(newdiv);
    
}

function addLyrics() {
    var parent = document.getElementById("audios");
    if (!parent) {
	parent = document.getElementById("searchResults");
    }
    
    if(parent){
	
	var audios = parent.getElementsByTagName("div");
	re=/audio(\d+)/;
	for (var i=0;i<audios.length;i++) {
	    var m = audios[i].id.match(re);
			if (m) {
				if (document.getElementById('imgbutton'+m[1]).alt!='Was')
					addLyric(m[1]);
			}
		}
    }
}



function ch_node(event) {
	e = event.target;
	re=/audio(\d+)/;
	if (!typeof(e) == 'object' || !e.tagName || e.tagName.toUpperCase() != 'DIV' || !e.hasAttribute('class')) {
      	return;
      }
	var m = e.id.match(re);
	if (m) {
		
		try {
			addLyric(m[1]);
			
		} catch (ex) {document.title = ex;}
	}
	
}

document.addEventListener('DOMNodeInserted', function(event) {ch_node(event);},false);
addLyrics();

