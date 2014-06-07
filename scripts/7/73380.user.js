// ==UserScript==
// @name           Przeróbka nowego YouTube
// @description    Ukrywa pasek akcji, stale wyświetla ilość subskrybcji a data jest z pełną nazwą miesiąca.
// @version        4.02.080
// @author         look997
// @license        MIT License
// @resource       metadata http://userscripts.org/scripts/source/73380.meta.js
// @include        *youtube.com/*
// @date           2014-03-03
// @updateURL      http://userscripts.org/scripts/source/73380.meta.js
// @grant		   none
// ==/UserScript==

/*var urlPLL = "/feeds/api/users/default/playlists";
var params = "lorem=ipsum&name=binny";
PLlacz.open("POST", urlPLL, true);
PLlacz.setRequestHeader("Host", 'gdata.youtube.com');
PLlacz.setRequestHeader("Content-Type", 'application/atom+xml');
PLlacz.setRequestHeader("Content-Length", '0');
PLlacz.setRequestHeader("Authorization", 'Bearer MmlNCzmTOKGfMK7zuq7e4I5n');
PLlacz.setRequestHeader("GData-Version", '2');
PLlacz.setRequestHeader("X-GData-Key", 'key="AI39si6-w6IavzJiV2ELkwSF_iTqkLaKR80Ux-VyrKUB_LUa60lMcPjEMjmlhmYxo3cnfOxHSAYRDMsevsv8DKLVu9FplA2zvA"');

PLlacz.send();*/

var yt = yt;
yt = yt || {};
yt.playerConfig = {"player_wide": 1};
document.cookie = "wide=1; domain=.youtube.com";
function $(a) {return document.getElementById(a);}
$("watch7-container").className = "watch-wide";
var $ = function(selector,context){return(context||document).querySelector(selector)};


// Skok do aktualnie odtwarzanego elementu na playliście
function plCurrJump() {
	var PLscroll = $(".playlist-videos-list");
	if (PLscroll) {
		var CP = $("li.yt-uix-scroller-scroll-unit.currently-playing");
		pozycjaCP = CP.offsetTop;
		//console.log(pozycjaCP);
		PLscroll.scrollTop = pozycjaCP;
		/*var qSA = function(selector){return document.querySelectorAll(selector)};
		
		var ilePlLi = 0;
		console.log("cl1");
		for(var nrPlLi = 1; nrPlLi <= qSA("li.yt-uix-scroller-scroll-unit").length; nrPlLi++) {
			//console.log(CP== $("li.yt-uix-scroller-scroll-unit:nth-child("+nrPlLi+")"));
			if ( CP == $("li.yt-uix-scroller-scroll-unit:nth-child("+nrPlLi+")") ) {
				ilePlLi = nrPlLi-1;
			}
			//console.log(ilePlLi+" cl");
		}
		console.log("cl2 "+ilePlLi);
		var WDFAGGAgjj = 65*ilePlLi;
		console.log("cl3 "+WDFAGGAgjj);
		console.log("cl4 "+typeof(WDFAGGAgjj));
		console.log(PLscroll.scrollTop+" ccc1 ");
		PLscroll.scrollTop = WDFAGGAgjj;
		console.log(PLscroll.scrollTop+" ccc2");*/
	}
}

if ($(".toggle-menu-visibility")) {
	$(".toggle-menu-visibility").addEventListener("click", plCurrJump, false);
}

/*var repeatFunction = function(repeatedFunctionName, time){
  (function repeater(){
    repeatedFunctionName()
    setTimeout(repeater, time);
  })();
}

stopek = 0;

function przeniesPrzyciskPobierania(){
	console.log($('button[data-trigger-for="action-panel-sldownload"]'));
	if(stopek == 0){
		if($('button[data-trigger-for="action-panel-sldownload"]')){
			$("#footer-links-secondary").appendChild($('button[data-trigger-for="action-panel-sldownload"]'));
			stopek = 1;
		}
	} else if($('#action-panel-share[data-panel-loaded="true"]')) {
		$('#share-panel-buttons').appendChild($('button[data-trigger-for="action-panel-sldownload"]'));
	}
}*/

function glFun() { // GŁÓWNA FUNKCJA
	
	var $ = function(selector,context){return(context||document).querySelector(selector)};
	
 // ciasteczko wide wielkość odtwarzacza
	//if(readCookie("wide") != "1") document.cookie="wide=1; path=/; domain=.youtube.com";
	
	if (readCookie("VISITOR_INFO1_LIVE") != "LlWIQlLwL_Y") {
		document.cookie="VISITOR_INFO1_LIVE=LlWIQlLwL_Y; path=/; domain=.youtube.com";
		window.location.reload();
	}
	
	/*var yt = yt;
	yt = yt || {};
	yt.playerConfig = {"player_wide": 1};
	document.cookie = "wide=1; domain=.youtube.com";
	function $(a) {return document.getElementById(a);}
	$("watch7-container").className = "watch-wide";*/
	
 // Przeniesienie przycisku pobierania do "Udostępnij" [w budowie]
	//repeatFunction(przeniesPrzyciskPobierania, 5000);
	
	var pasekAkcji = $("#watch7-action-buttons");
	var poleAutora = $("#watch7-user-header");
	
	poleAutora.appendChild(pasekAkcji);
	
 // 2 wersje: bez ikony Transkrybcji i z
	if(document.getElementById("watch7-secondary-actions").getElementsByClassName("action-panel-trigger")[3].getAttribute("data-trigger-for") == "action-panel-transcript"){
		 var viewsInfo = 184;
	} else { var viewsInfo = 161; }
	
	dodajStyl('dataDodSId',''
		+"#watch7-user-header:hover #watch7-action-buttons { visibility: visible !important; }" // Autoodkrywanie paska akcji
		+"#watch7-action-buttons { visibility: hidden; }" // Domyślnie ukryty pasek akcji
		+"#watch7-user-header { position: relative !important; }" // Ustawienie punktu odniesienia dla paska akcji
		+"#watch7-user-header { border-bottom: 1px solid rgb(230, 230, 230) !important; }" // Kreska rozdzielająca głowę od panelu
		
		+"#watch7-action-buttons button { height: 25px !important; }" // Wyrówanie różnic wysokości like-dislike z resztą przycisków akcji
		+"#watch7-action-buttons { margin-right: 1px !important; padding: 0 19px !important; background: white !important; }"
		+"#watch-like, #watch-dislike, #watch7-action-buttons .yt-uix-button-group .yt-uix-button { margin-right: 1px !important }"
		
		 // Wyrówanie różnic, usunięcie ramek i teł ikon
		+"#watch7-action-buttons { position: absolute !important; right: 0 !important; border: 0 !important; top: 30px !important; }"
		+"#watch-like, #watch-dislike { margin-right: 0 !important; padding: 0 !important; border: 0 !important; box-shadow: none !important; background: transparent !important; }"
		+"#watch-like .yt-uix-button-icon-watch-like { margin-right: 0 !important; } "		
		+"#watch7-sentiment-actions { margin-top: 0 !important; }"
		+"#watch7-secondary-actions .yt-uix-button-icon { margin-right: 0 !important; }"
		+"#watch7-secondary-actions .yt-uix-button { margin-left: 0 !important; padding: 0 !important; border-width: 0 !important; }"
		+".yt-uix-button-icon-wrapper { margin-right: 0 !important;}"
		+"#watch-like .yt-uix-button-content { display: none !important; }" // Usunięcie napisu Fajne
		+"#watch7-views-info {min-width: "+viewsInfo+"px !important;}" // wyrówanie szerokości paska z oceną
		
		 // Zachowanie
		+"#watch7-secondary-actions .yt-uix-button.yt-uix-button-toggled[data-trigger-for='action-panel-details'] { opacity: 0 !important; cursor: auto !important;}" // Ikona info ukryta gdy info się wyświetla
		+"#watch-like .unlike-button-text, .liked #watch-like.yt-uix-button-toggled:hover .like-button-text, .liked #watch-like.yt-uix-button-toggled:hover .yt-uix-button-icon-watch-like { visibility: visible !important; }" // Zachowanie ikony Fajne
		
		 // Grafika ikon
		+"#watch7-secondary-actions > span:nth-child(1) .yt-uix-button-icon, "
		+"#watch7-secondary-actions > span:nth-child(2) .yt-uix-button-icon, "
		+"#watch7-secondary-actions > span:nth-child(3) .yt-uix-button-icon { background-image: url('data:image/png;base64,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') !important; }"
		
		 // Stałe wyświetlanie liczby subskrybcji kanału autora filmu
		+".yt-subscription-button-subscriber-count-branded-horizontal, .html5-text-button, .yt-subscription-button-subscriber-count-unbranded { display: inline-block !important; }"
		
		// Wyłączenie ramek wokół przycisków odtwarzacza HTML5
		+" .html5-volume-panel, .html5-watch-later-button, .html5-volume-button, .html5-playlist-button, .html5-text-button, .html5-captions-button, .ytp-button{ outline: medium none !important; }"
		
		+" .watch-wide #watch-appbar-playlist.watch-playlist-collapsed .playlist-videos-list { "
		+"    display: block !important; "
		+"    height: 0px !important; "
		+" } "
		// Sam film - bez propozycji
		/*+" .site-center-aligned .watch #content.content-alignment, .site-center-aligned #player.watch-small {"
		+"    min-width: 854px !important;"
		+"    max-width: 854px !important;"
		+" } "
		+" #watch7-sidebar { display: none !important; } "*/
		 // Przewodnik
		/*+"#guide-main .guide-module-toggle { position: absolute; top: -71px; height: 30px; }"
		+"#guide-main .guide-module-toggle .guide-module-toggle-icon { padding-top: 10px; }"
		+"#guide-main .guide-module-toggle .guide-module-toggle-icon .guide-module-toggle-arrow { margin-top: -3px; }"
		+"#guide-main.collapsed .guide-module-toggle > * { visibility: hidden; }"
		+"#gh-personal .guide-item.narrow-item { margin-right: 0; }" // username
		*/
	);
	/*
	var PlayerCN = document.getElementById("player").className;
	document.getElementById("player").className = PlayerCN.replace("watch-medium", "watch-large");
	*/
 // Usunięcie nazw, dodanie toltipów i wyrównanie ikon
	for(nrWP=1; 3 >= nrWP; nrWP++){
		var jUp = document.getElementById("watch7-secondary-actions").getElementsByClassName("action-panel-trigger")[nrWP-1].getElementsByTagName('span')[0];
		
		jUp.firstChild.nodeValue = '';
		jUp.innerHTML += '<img alt="" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" class="yt-uix-button-icon yt-uix-button-icon-action-panel-report">';
	}
	document.getElementById("watch7-secondary-actions").getElementsByClassName("action-panel-trigger")[0].getElementsByTagName('span')[0].getElementsByTagName("img")[0].style.backgroundPosition = "0 -134px";
	document.getElementById("watch7-secondary-actions").getElementsByClassName("action-panel-trigger")[1].getElementsByTagName('span')[0].getElementsByTagName("img")[0].style.backgroundPosition = "0 -152px";
	document.getElementById("watch7-secondary-actions").getElementsByClassName("action-panel-trigger")[2].getElementsByTagName('span')[0].getElementsByTagName("img")[0].style.backgroundPosition = "0 -17px";
	
	document.getElementById("watch7-secondary-actions").getElementsByClassName("action-panel-trigger")[0].setAttribute("title","Informacje");
	document.getElementById("watch7-secondary-actions").getElementsByClassName("action-panel-trigger")[1].setAttribute("title","Udostępnij");
	document.getElementById("watch7-secondary-actions").getElementsByClassName("action-panel-trigger")[2].setAttribute("title","Dodaj do");
	if(document.getElementById("watch7-secondary-actions").getElementsByClassName("action-panel-trigger")[3].getAttribute("data-trigger-for") == "action-panel-transcript"){
		document.getElementById("watch7-secondary-actions").getElementsByClassName("action-panel-trigger")[3].setAttribute("title","Lista dialogowa");
		document.getElementById("watch7-secondary-actions").getElementsByClassName("action-panel-trigger")[4].setAttribute("title","Statystyki");
		document.getElementById("watch7-secondary-actions").getElementsByClassName("action-panel-trigger")[5].setAttribute("title","Zgłoś");
	} else {
		document.getElementById("watch7-secondary-actions").getElementsByClassName("action-panel-trigger")[3].setAttribute("title","Statystyki");
		document.getElementById("watch7-secondary-actions").getElementsByClassName("action-panel-trigger")[4].setAttribute("title","Zgłoś");
	}	
	
	
	
 // Pełna nazwa miesiąca dodania filmu
	datfilm = $("#eow-date").firstChild.nodeValue;
	odatmies = datfilm.substring(datfilm.length-8, datfilm.length-5);
	switch (odatmies){
		case 'sty':	datmies = "stycznia"; break;
		case 'lut':	datmies = "lutego"; break;
		case 'mar':	datmies = "marca"; break;
		case 'kwi':	datmies = "kwietnia"; break;
		case 'maj':	datmies = "maja"; break;
		case 'cze':	datmies = "czerwca"; break;
		case 'lip':	datmies = "lipca"; break;
		case 'sie':	datmies = "sierpnia"; break;
		case 'wrz':	datmies = "września"; break;
		case 'paź':	datmies = "października"; break;
		case 'lis':	datmies = "listopada"; break;
		case 'gru':	datmies = "grudnia"; break;
		default: datmies = datmies+" (Błąd Skryptu PNYT)";
	} $("#eow-date").firstChild.nodeValue = datfilm.replace(odatmies, datmies);
	
	
 // Widoczność paska akcji w zależności od tego czy widać oceny
	if(!($(".video-extras-sparkbar-likes"))){
		$("#watch7-action-buttons").style.visibility = "visible";
	} else {
		 // Włączenie stałej widoczności paska akcji
		document.getElementById("watch7-action-buttons").getElementsByTagName("button")[0].addEventListener("click", SSPP, true);
		document.getElementById("watch7-action-buttons").getElementsByTagName("button")[3].addEventListener("click", SSPP, true);
		document.getElementById("watch7-action-buttons").getElementsByTagName("button")[4].addEventListener("click", SSPP, true);
		document.getElementById("watch7-action-buttons").getElementsByTagName("button")[5].addEventListener("click", SSPP, true);
		document.getElementById("watch7-action-buttons").getElementsByTagName("button")[6].addEventListener("click", SSPP, true);

		lidili(); // Sprawdzenie oceny użytkownika i nadanie koloru dla wybranego sentymentu
		document.getElementById("watch7-action-buttons").getElementsByTagName("button")[2].addEventListener("click", function(){ $("#watch7-action-buttons").style.visibility = "hidden"; }, true); // Przywrócenie autoodkrywania paska akcji
		
		// Dodanie kolorów dla wybranego sentymentu
		//document.getElementById("watch7-action-buttons").getElementsByTagName("button")[0].addEventListener("click", liFu, true);
		//document.getElementById("watch7-action-buttons").getElementsByTagName("button")[1].addEventListener("click", fDislike, true);
		document.getElementById("watch-like").addEventListener("click", butLike, true);
		document.getElementById("watch-dislike").addEventListener("click", butDislike, true);
	}
	
	
	
 // Funkcje zależne
	function butLike(){ // Dynamiczne barwienie sentymentalnej opcji
		if( $("#watch-like.yt-uix-button-toggled") ){ // unlike
			$(".video-extras-likes-dislikes .likes-count").style.color = "rgb(102, 102, 102)"; // siwe
			$(".video-extras-likes-dislikes .dislikes-count").style.color = "rgb(102, 102, 102)"; // siwe
		} else { // like
			$(".video-extras-likes-dislikes .likes-count").style.color = "#2793E6"; // niebieskie
			$(".video-extras-likes-dislikes .dislikes-count").style.color = "rgb(102, 102, 102)"; // siwe
		}
	}	
	function butDislike (){ // Dynamiczne barwienie sentymentalnej opcji
		if( $("#watch-dislike.yt-uix-button-toggled") ){ // undislike
			$(".video-extras-likes-dislikes .likes-count").style.color = "rgb(102, 102, 102)"; // siwe
			$(".video-extras-likes-dislikes .dislikes-count").style.color = "rgb(102, 102, 102)"; // siwe
		} else {
			$(".video-extras-likes-dislikes .dislikes-count").style.color = "rgb(204, 0, 0)"; // czerwone
			$(".video-extras-likes-dislikes .likes-count").style.color = "rgb(102, 102, 102)"; // siwe
		}
		
	}
	
	 // Kolor wybranego sentymentu
	function lidili(){ // Sprawdzenie oceny użytkownika
		if($("#watch-like-dislike-buttons.liked")){console.log("lidili");
			$(".video-extras-likes-dislikes .likes-count").style.color = "#2793E6"; // niebieskie
			$(".video-extras-likes-dislikes .dislikes-count").style.color = "rgb(102, 102, 102)"; // siwe
		} else 
		if($("#watch-like-dislike-buttons.disliked")){
			$(".video-extras-likes-dislikes .dislikes-count").style.color = "rgb(204, 0, 0)"; // czerwone
			$(".video-extras-likes-dislikes .likes-count").style.color = "rgb(102, 102, 102)"; // siwe
		}
	}
	
	function SSPP(event){ // Włączenie stałej widoczności paska akcji
		if(event.target == document.getElementById("watch7-action-buttons").getElementsByTagName("button")[0] && $("#watch-like.yt-uix-button-toggled") ) {
			
		} else {
			$("#watch7-action-buttons").style.visibility = "visible";
		}
	}
}

function dodajStyl(idStyle,styles) { // Dodanie stylu
        if(document.getElementById(idStyle)){ document.getElementsByTagName("head")[0].removeChild(document.getElementById(idStyle)); }
        var css = document.createElement('style'); css.type = 'text/css'; css.id = idStyle;
        css.styleSheet ? css.styleSheet.cssText = styles : css.appendChild( document.createTextNode(styles) );
        document.getElementsByTagName("head")[0].appendChild(css);
}


	
	function readCookie(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	}

document.addEventListener("DOMContentLoaded", glFun);
