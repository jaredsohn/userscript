// ==UserScript==
// @author anonymous
// @name 0chan sensible title
// @include http://0chan.hk/*/res/*
// @include http://www.0chan.hk/*/res/*
// @version 1.2
// @description Добавляет в заголовок треда заголовок ОП-поста (если есть) либо первые 70 символов самого поста.
// ==/UserScript==
function setTitle(){
    if (document.location.pathname.search("/res/")!=-1){
        var title="/"+document.location.pathname.split("/")[1]+"/ ";
        var opPost=document.getElementsByClassName("postnode")[0];
        var topic=opPost.getElementsByClassName("filetitle")[0];
        if(topic===undefined)
            title+=opPost.getElementsByClassName("postmessage")[0].textContent.substr(0,70);
        else
            title+=topic.textContent;
        //Свистоперделки - можно раскомментировать
        //title=title.replace(/[oо]/g,"ø");
        //title=title.replace(/[ОO0]/g,"Ø");
        document.title=title;
    }
}
if (typeof(unsafeWindow)=="undefined")
	document.addEventListener("DOMContentLoaded",setTitle,false);
else
	setTitle();