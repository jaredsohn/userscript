// ==UserScript==
// @name        Youtube Auto ProxFree
// @namespace   perdu.com
// @description Remplace le lecteur Youtube par son équivalent fourni sur proxfree.com
// @include     *youtube.com/watch*
// @include     *proxfree.com/*
// @version     1
// @grant       1
// ==/UserScript==
var tag = "[Youtube Auto ProxFree] " ;
console.log(tag+"_______________________Démarrage_______________________") ;

function programme(){
	var youtubePage = (window.location.href.indexOf("www.youtube.com/watch?") > -1) ? 1 : 0 ;
	var proxfreeRequete = ( window.top != window.self && window.location.href.indexOf("https://www.proxfree.com/#") > -1) ? 1 : 0 ;
	var proxfreeVideo = ( window.top != window.self && window.location.href.indexOf("bit=1") > -1) ? 1 : 0 ;
	var proxfreeFlash = ( document.getElementsByTagName("embed").length > 0 ) ? 1 : 0 ;
	var proxfreeHTML5 = ( document.getElementsByTagName("video").length > 0 ) ? 1 : 0 ;

	console.log(tag+
		youtubePage +"|"+
		proxfreeRequete +"|"+
		proxfreeVideo +"|"+
		proxfreeFlash +"|"+
		proxfreeHTML5
	) ;

	if(youtubePage) {
		var lecteurYoutube = document.getElementById("movie_player") ;
		if( lecteurYoutube == undefined ) return ;
		console.log(tag+"Préparation de la vidéo.") ;
		
		var lecteurYoutubeContainer = lecteurYoutube.parentNode ;
		lecteurYoutubeContainer.setAttribute('id', 'player-api_CESTPASMOICESTLUI') ;
		
		var idVideo = window.location.href ;
		if( idVideo.indexOf("&", idVideo.indexOf("v=")) != -1 ) {
			idVideo = idVideo.substring(idVideo.indexOf("v=")+2, idVideo.indexOf("&", idVideo.indexOf("v="))) ;
		}
		else {
			idVideo = idVideo.substring(idVideo.indexOf("v=")+2) ;
		}

		var iframe = document.createElement("iframe") ;
		lecteurYoutubeContainer.innerHTML = "" ;
		lecteurYoutubeContainer.appendChild(iframe) ;
		iframe.src = "https://www.proxfree.com/#" + idVideo ;
		iframe.setAttribute("style", "width:100%;height:100%;overflow:hidden;z-index:500") ;

	}
	else if(proxfreeRequete) {
		console.log(tag+"Envoi de la requête à ProxFree") ;
		
		var champTexte = document.getElementsByClassName('pfproxInp') ;
		champTexte[0].value = "http://www.youtube.com/watch?v="+window.location.hash.substring(1) ;
		
		var bouton = document.getElementsByClassName('pfbtn') ;
		bouton = bouton[0] ;
		
		var evt = document.createEvent("MouseEvents");
		evt.initMouseEvent("click", true, true, window, 0, 1, 1, 1, 1, false, false, false, false, 0, null);
		bouton.dispatchEvent(evt);
	}
	else if(proxfreeVideo) {
		console.log(tag+"Affichage de la vidéo") ;
		
		var video ;
		
		if(proxfreeHTML5) {
			video = document.getElementsByTagName("video")[0] ;
			video.pause() ;
		}
		else if(proxfreeFlash) {
			video = document.getElementsByTagName("embed")[0] ;
		}
		
		console.log(tag+"Affichage de la vidéo") ;
		
		video.setAttribute("style", "width:100%;height:100%;position:fixed;top:0;left:0;z-index:100;") ;
		video.removeAttribute("width") ;
		video.removeAttribute("height") ;
		
		video.parentNode.removeChild(video) ;
		document.documentElement.innerHTML = "" ;
		document.documentElement.appendChild(video) ;
	}
}
programme() ;

console.log(tag+"_______________________Arrêt________________________") ;