// ==UserScript==
// @name		zive.cz - přidání linků na youtube pod videi, úprava linků na obrázky
// @description		Přidá odkaz na youtube pro přehrání videa. Taky po kliknutí na náhled obrázeku v článku se zobrazí v novém okně.
// @include		http://www.zive.cz/*
// @include		http://doupe.zive.cz/*
// @include		http://connect.zive.cz/*
// @include		http://www.mobilmania.cz/*
// @include		http://vtm.e15.cz/*
// @include		http://avmania.e15.cz/*
// @include		http://jnp.zive.cz/*
// @include		http://digiarena.e15.cz/*
// @author		Marek Lutonský
// @version		70
// @downloadURL		https://userscripts.org/scripts/source/323293.user.js
// @updateURL		https://userscripts.org/scripts/source/323293.meta.js
// ==/UserScript==


var list=document.getElementsByClassName('YOUTUBE_CONTAINER');
for(var i=0;i<list.length;i++){
	var el=list[i];
	var a=document.createElement('a');
	a.setAttribute('href',"//youtube.com/watch?v="+el.firstElementChild.attributes['data-yt'].value);
	a.appendChild(document.createTextNode('přehrát na youtube'));
	el.parentNode.insertBefore(a,el);
	el.parentNode.insertBefore(a.cloneNode(true),el.nextSibling);
}

var a='Getfile.aspx?id_';
var b='ShowArticleImageFull.aspx?';
var list=document.querySelectorAll("a[href^='/Getfile.aspx']")
for(var i=0;i<list.length;i++){
    with(list[i]){
    	with(attributes['href']) value=value.replace(a,b)
    	setAttribute ("onclick","");
    	setAttribute("target","_blank");
    }
	
}
