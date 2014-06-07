// ==UserScript==
// @name           Avatares Largos T!
// @namespace      LeoTorreZ
// @description    LeoTorreZ
// @include         http://*taringa.net/*// ==/UserScript==
// Autor: j0hn & BrunoGB
if( window.location.href.search("perfil") != -1 ){
	document.getElementsByClassName("avaPerfil")[0].getElementsByTagName("img")[0].style.height = "auto";
}
else if( window.location.href.search("posts") != -1){
	document.getElementsByClassName("avatarBox")[0].style.height = "auto";
}
// Autor: j0hn & BrunoGB
