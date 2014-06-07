// ==UserScript==
// @name           vkontakte music download
// @namespace      http://vkontakte.net.ru
// @description    Music download for vkontakte.ru
// @include        http://vk.com/*
// ==/UserScript==

function trim(str) {
    return str.replace(/\"/g, ""); //"
}

function addbutton(node,link) {
    if (node.getElementsByClassName("addon").length>0) return; 

    var addon=document.createElement("a");
    var tr=node;

    var title_a=tr.getElementsByTagName('td')[1].getElementsByTagName('b')[0].getElementsByTagName('a')[0].innerHTML;
    var title_t=tr.getElementsByTagName('td')[1].getElementsByTagName('span')[0].innerHTML;
    var songtitle = title_a+" - "+title_t;
    songtitle = trim(songtitle);

    addon.setAttribute("title",songtitle);
    addon.setAttribute("alt",songtitle);

    addon.setAttribute("href",link);
    addon.innerHTML="\u0441\u043A\u0430\u0447\u0430\u0442\u044C";

    var newdiv=document.createElement("div");
    newdiv.style.fontSize="x-small";
    var addon1=document.createElement("a");
    addon1.setAttribute("href","http://lyrics.wikia.com/"+encodeURIComponent(title_a)+":"+encodeURIComponent(title_t));
    addon1.setAttribute("target","_blank");
    addon1.innerHTML="\u0442\u0435\u043A\u0441\u0442";
    newdiv.appendChild(addon);
    newdiv.innerHTML += " | ";
    newdiv.appendChild(addon1);
    newdiv.className="addon";
    tr.getElementsByTagName('td')[1].appendChild(newdiv);

//    node.insertBefore(newdiv);
    
}

function findAudio() {
    var btns=document.getElementsByClassName("play_new");
    //alert(btns.length);
    for (var i=0; i<btns.length; i++) {
	var rawurl=btns[i].parentNode.parentNode.getElementsByTagName('input')[0].value
	var url=rawurl.substring(0,rawurl.indexOf(','));
	addbutton(btns[i].parentNode.parentNode.parentNode,url);
	//    alert(url);
    }
}

findAudio();

window.addEventListener('scroll', findAudio, false);



