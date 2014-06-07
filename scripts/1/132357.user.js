// ==UserScript==
// @name           Hiob na żywo
// @namespace      http://userscripts.org/users/look997
// @description    Hiob na żywo + czat
// @include        *katolik.us/czat.php
// @version        2.60
// ==/UserScript==

function zwrot() {
	var wideo = document.getElementById("utv11766");
	var mapa = document.getElementById("map");
	var czat = document.getElementsByTagName("iframe")[0];
	var czatPoleWpisywania = document.getElementsByClassName("row1")[1].getElementsByTagName("span")[0];
	var gpsGate = document.getElementById("gpsgate");
	
	dodajStyl("#jedLink > a, #menuLinki > ul > li > a {outline: none !important;}"+
			  "#utv11766 {-moz-transition: all .1s ease-out; display: -moz-box; -moz-box-flex: 2; display: -webkit-box; -webkit-box-flex: 2;}"+
			  "#formCzat > span {display: -moz-box; display: -webkit-box; height: 24px !important; background-color: white;  border-bottom: 1px solid #ced5dd;}"+
			  "#kontenerGora {min-height: 200px; -moz-transition: all .1s ease-out; display: -moz-box; -moz-box-orient: horizontal; display: -webkit-box; -webkit-box-orient: horizontal;}"+
			  
			  "#kontenerCzat {-moz-transition: all .1s ease-out; display: -moz-box; display: -webkit-box;}"+
			  ".nieRozczat #kontenerCzat {-moz-box-flex: 1 !important; -webkit-box-flex: 1 !important;}"+
			  ".takRozczat #kontenerCzat {-moz-box-flex: 4 !important; -webkit-box-flex: 4 !important;}"+
			  "#formCzat {display: -moz-box; -moz-box-orient: vertical; -moz-box-flex: 1; display: -webkit-box; -webkit-box-orient: vertical; -webkit-box-flex: 1; margin-left: 0; margin-bottom: 0; border-left: 0;}"+
			  "#formCzat > iframe {-moz-box-flex: 1; display: -moz-box; border: 0; border-bottom: 1px solid #ced5dd;"+
								  "-webkit-box-flex: 1; display: -webkit-box;}"+
			  
			  "#formCzat > span > input {display: inline-block; height: 24px; border: 0; background-color: white;}"+
			  "#formCzat > span > [type='text'] {display: -moz-box; -moz-box-flex: 1; display: -webkit-box; -webkit-box-flex: 1; margin-left: 3px}"+
			  "#formCzat > span > [type='submit'] {-moz-transition: all .1s; -webkit-transition: all .1s; cursor: pointer; color: #424242;}"+
			  "#formCzat > span > [type='submit']:hover, .inczat:hover {background-color: rgb(241,241,241) !important;}"+
			  "#jedLink {display: -moz-box; display: -webkit-box; border: 0; padding-right: 5px; padding-top: 0;}"+
			  
			  ".inczat {display: -moz-box; -moz-transition: all .1s; display: -webkit-box; -webkit-transition: all .1s; background-origin: content-box; background-repeat: no-repeat; width: 26px; height: 24px; -moz-box-sizing: border-box; box-sizing: border-box; background-color: white; border: 0; border-left: 1px solid transparent; border-right: 1px solid transparent; margin: 0;  padding: 5px;}"+
			  ".inczat:hover {background-color: rgb(241,241,241) !important; cursor: pointer; border-left: 1px solid #e5eaef; border-right: 1px solid #e5eaef; }"+
			  ".inczat[disabled='disabled']:hover {background-color: transparent !important; cursor: auto !important; border-left: 1px solid transparent; border-right: 1px solid transparent;}"+
			  ".inczat[disabled='disabled'] {opacity: 0.5;}"+
			  "#jedLink :first-child {border-left: 1px solid #e5eaef !important;}"+
			  
			  "#reczat {background-image: url(data:image/gif;base64,R0lGODlhDgAOAIQBAGZmZv///6WlpYyMjLy8vMzMzH19fZSUlK6urnJyctfX15mZmefn57W1tWxsbIeHh////////////////////////////////////////////////////////////////yH+EUNyZWF0ZWQgd2l0aCBHSU1QACH5BAEHAAwALAAAAAAOAA4AAAVE4PAM4mOa5CIIQeu+rUC4BewSc2y3eFssu0AvcDi8jLzZydRiCnOJRCtKfbqkV+zQlmgkgw7Fd4e4eYM3hOBQWpIEjRAAOw==);}"+			  
			  "#rozczat {background-image: url(data:image/gif;base64,R0lGODlhDgAOAIQaAI+Pj5CQkJGRkZKSkpOTk5WVlZaWlpiYmJmZmZ2dnaCgoKKioqOjo6enp6mpqcfHx8vLy8zMzM7OzuXl5evr6/Pz8/X19fj4+Pr6+vv7+////////////////////////yH5BAEKAB8ALAAAAAAOAA4AAAVWoKGMZDmKWqqu6ci+mguvsiVlaSZZraJRicYFg7k0EpSYInIIDBiLBWMQOERGDwJAcEAgDgIA4eGaIBwVi6XiQEyUKQsEp8lAePCZSqbP9xUFJoIKBiEAOw==);}"+
			  ".takRozczat #rozczat {background-image: url(data:image/gif;base64,R0lGODlhDgAOAIQYAI+Pj5CQkJOTk5SUlJWVlZaWlpiYmJ2dnaCgoKOjo6ioqLS0tLi4uNbW1tnZ2d7e3uHh4ebm5unp6erq6vb29vn5+f39/f7+/v///////////////////////////////yH+EUNyZWF0ZWQgd2l0aCBHSU1QACH5BAEKAB8ALAAAAAAOAA4AAAVXYIGMZDmKWKqu6ci+mAuvruRc6+VIMWJBA8aKMYBYEInEARBQTCaKAOCQNBgKgcBBIjlkC1YE5SFYVFKVheBBcUUar0akp7LgMBeLSjZrIfp7BCaDCAUhADs=);}"+
			  "#samCzat {background-image: url(data:image/gif;base64,R0lGODlhDgAOAMIFAOvr6+/v776+vmVlZZqamv///////////yH5BAEAAAcALAAAAAAOAA4AAAM7eHpC/k6sQ0K5OJBJ8PhDsS0dVnxi85hh6Fiid7lljJoO1t16XZkXQO6igkRqwJECiePATMJJ0ShZJAAAOw==);}"+
			  
			  
			  "#menuLinki > ul {margin: 8px 7px 0; padding: 0; list-style-type: none; display: -moz-box; -moz-box-orient: vertical; display: -webkit-box; -webkit-box-orient: vertical;}"+			  
			  "#menuLinki > ul > li:hover {background-position: 6px -16px !important; background-color: white !important; box-shadow: 0 0 3px rgba(1, 1, 1, 0.1); border-radius: 3px; !important;}"+
			  "#menuLinki > ul > li {background-position: 6px 4px !important; padding: 5px 6px 5px 29px; display: -moz-box; -moz-transition: background-color .051s, box-shadow .051s; display: -webkit-box; -webkit-transition: background-color .051s, box-shadow .051s; font-weight: 900; background-repeat: no-repeat !important;}"+			  
			  "#menuLinki li:nth-child(1) {padding-left: 6px;}"+
			  "#menuLinki li:nth-child(1) a {top: 0px !important;}"+
			  "#menuLinki > ul > li:last-child {margin-bottom: 0;}"+
			  
			  "#menuLinki {display: -moz-box; -moz-box-orient: vertical; display: -webkit-box; -webkit-box-orient: vertical; background: threedface; box-shadow: 2px 2px 4px rgba(1, 1, 1, 0.21) inset;}"+
			  "#menuLinki > ul > li > a:hover {color: #009933 !important; text-decoration: underline !important;}"+
			  "#menuLinki a, #menuLinki a:visited, #menuLinki a:active {height: 14px; line-height: 14px; display: -moz-box; display: -webkit-box; color: rgb(66,66,66);text-decoration: none !important;}"+
			  "#kontZegarek {-moz-box-align: center; -moz-box-flex: 1; -moz-box-pack: center; display: -moz-box; -moz-box-orient: vertical; "+
							"-webkit-box-align: center; -webkit-box-flex: 1; -webkit-box-pack: center; display: -webkit-box; -webkit-box-orient: vertical;}"+
			  "#kontZegarek > div {margin: 0 13px; color: rgb(58,58,58)}"+
			  "#kontZegarek > iframe {box-shadow: 0 1px 4px rgba(1, 1, 1, 0.14);}"+
			  "#kontenerDol {display: -moz-box; -moz-box-flex: 1; -moz-box-orient: horizontal; display: -webkit-box; -webkit-box-flex: 1; -webkit-box-orient: horizontal; position: relative; margin-top: 0; background-color: white; overflow: auto;}"+
			  "#map {height: 1px !important;}"+
			  "#gpsgate {position: absolute; bottom: 7px; left: 71px;}"+
			  "#kontenerMapy {-moz-box-flex: 1; -moz-box-orient: vertical; -webkit-box-flex: 1; -webkit-box-orient: vertical; position: relative;}"+
			  
			  "#kontenerLewy {display: -moz-box; display: -webkit-box;}"+
			  "#kontenerPrawy {display: -moz-box; -moz-box-flex: 1; -moz-box-orient: vertical; display: -webkit-box; -webkit-box-flex: 1; -webkit-box-orient: vertical; margin: 0; overflow: hidden; width: 100%; height: 100%;}"+
			  "body {display: -moz-box; -moz-box-flex: 1; -moz-box-orient: horizontal; display: -webkit-box; -webkit-box-flex: 1; -webkit-box-orient: horizontal; margin: 0; overflow: hidden; width: 100%; height: 100%;}");
			  wideo.removeAttribute("width");
			  wideo.getElementsByTagName("embed")[0].removeAttribute("width");
			  wideo.removeAttribute("height");
			  wideo.getElementsByTagName("embed")[0].removeAttribute("height");
			  czat.removeAttribute("height");
			  czat.removeAttribute("width");
			  czatPoleWpisywania.removeChild(czatPoleWpisywania.firstChild);
			  czatPoleWpisywania.removeChild(czatPoleWpisywania.childNodes[1]);
			  czatPoleWpisywania.removeChild(czatPoleWpisywania.childNodes[2]);
			  czatPoleWpisywania.childNodes[2].setAttribute("title","Odśwież czat");
			  czatPoleWpisywania.childNodes[2].className = "inczat";
			  czatPoleWpisywania.childNodes[2].id = "reczat";
			  czatPoleWpisywania.childNodes[2].setAttribute("value","");
			  czatPoleWpisywania.getElementsByTagName("input")[0].removeAttribute("size");
			  
	
	var kontenerGora = document.createElement("div");
	kontenerGora.id = "kontenerGora";
	
	var kontenerCzat = document.createElement("div");
	kontenerCzat.id = "kontenerCzat";
	
	
	var formCzat = document.createElement("form");
	formCzat.id = "formCzat";
	formCzat.setAttribute("target","shout_iframe");
	formCzat.setAttribute("method","POST");
	formCzat.setAttribute("action","shoutbox_view.php");
	formCzat.setAttribute("name","post");
	
	formCzat.appendChild(czat);
	formCzat.appendChild(czatPoleWpisywania);
	
	kontenerCzat.appendChild(formCzat);
	
	kontenerGora.appendChild(wideo);
	kontenerGora.appendChild(kontenerCzat);
	
	var kontenerLewy = document.createElement("div");
	kontenerLewy.id = "kontenerLewy";
	document.getElementsByTagName("body")[0].appendChild(kontenerLewy);
	
	var kontenerPrawy = document.createElement("div");	
	kontenerPrawy.id = "kontenerPrawy";
	kontenerPrawy.className = "nieRozczat";
	
	document.getElementsByTagName("body")[0].appendChild(kontenerLewy);
	document.getElementsByTagName("body")[0].appendChild(kontenerPrawy);
	kontenerPrawy.appendChild(kontenerGora);
	
	  document.getElementsByName("message")[0].setAttribute("placeholder","Wpisz wiadomość");
	
	// zaczyna dół
	var kontenerDol = document.createElement("div");
	kontenerDol.id = "kontenerDol";
	
	var menuLinki = document.createElement("div");
	menuLinki.id = "menuLinki";
	
	var menuUl = document.createElement("ul");
	
	
	var faqHioba = document.createElement("a");
	var faqHiobaTekst = document.createTextNode(" - Często Zadawane Pytania");
	var sFaqHiobaTekst = document.createTextNode("FAQ");
	var sFaqHioba = document.createElement("span");
	sFaqHioba.style.color = "#009933";
	sFaqHioba.appendChild(sFaqHiobaTekst);
	faqHioba.href = "viewtopic.php?p=29420#29420";
	faqHioba.appendChild(sFaqHioba);
	faqHioba.appendChild(faqHiobaTekst);
	var liFaqHioba = document.createElement("li");
	liFaqHioba.appendChild(faqHioba);
	
	menuUl.appendChild(liFaqHioba);
	
	
	menuLinki.appendChild(menuUl);
	
	var kontenerMapy = document.createElement("div");
	kontenerMapy.id = "kontenerMapy";
	
	
	kontenerMapy.appendChild(mapa);
	mapa.appendChild(gpsGate);
	
	kontenerDol.appendChild(kontenerMapy);
	
	kontenerDol.appendChild(menuLinki);
	
	kontenerPrawy.appendChild(kontenerDol);
	
	
	
	
	
	
	
	
	//alert('t');
	document.getElementsByTagName("body")[0].removeChild(document.getElementsByTagName("body")[0].getElementsByTagName("center")[0]);
	
	//
	var jedLink = document.createElement('div');
	jedLink.id = "jedLink";
	//jedLink.style.width = menuLinki.clientWidth+"px";
	czatPoleWpisywania.appendChild(jedLink);
	
	document.getElementById("jedLink").appendChild(document.getElementById("formCzat").getElementsByTagName("span")[0].getElementsByTagName("input")[2]);
	
	var aJedEl = document.createElement("a");
	aJedEl.className = "inczat";
	aJedEl.href = "shoutbox_view_arch.php";
	aJedEl.title = "Sam czat";
	aJedEl.id = "samCzat";
	//jedLink.appendChild(aJedEl);
	
	
	//var powShou = document.createTextNode("[Powiększ Shoutbox]");
   // document.getElementById("jedLink").getElementsByTagName('a')[0].removeChild( document.getElementById("jedLink").getElementsByTagName('a')[0].firstChild);
	
	
	//
	
	function dodajLink(nazwaL, adresL, ikonaL){
		
	}
	
	var forumHioba = document.createElement("a");
	var forumHiobaTekst = document.createTextNode("Forum");
	forumHioba.href = "index.php";
	forumHioba.appendChild(forumHiobaTekst);
	var liforumHioba = document.createElement("li");
	liforumHioba.id = "forumhioba";
	liforumHioba.style.background = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAkCAYAAACAGLraAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wFCBQsLy2zjDAAAAIGSURBVEjH7VQtt+owEBzuuSKyK5FdVyRFoevQRYCPAYfgDyBAIBHgUf0L1SiKrQuyMpW4PpWc0K/LOffKtypNmsnszuwCv4xB3+FqtarMWgiB4/E4+AhgsVhUAEBEAACttV2fTqdBL8But6sAwPM85HkOIQR83wcR4Xa7NZh81wE8zwMzQ2uNIAjeWAghGmy/6htlWUJrDTeF5/MJAHi9Xg2A77YaGKq+7yPPc8tsOBxa8E4G7g+GjRDCsgCA6/VadTIgIvi+b8FmsxmICEoplGX5WQrua2VZ4vF42O/xeIzlctmtgkmhKApbRLOvtW6Y6avNAyaUUtaFriq9KRRF8ea+uqS9PvA8D9PpFEQEIsJoNLIgSqlWI3U202azqdw6BEEAAFiv14MfVTDVNqkwc8Mj/+MPo3cmxnFcuU12uVw+m4lhGFYArHxKKbtOkqR/Ju73e3s5SRIQEaIoAjPjcDg0mDSMxMyIoghKKcRx/MairR8aE0kpZbvQXE7TtNOJrVY2VKMoQpIkFiwMQwvey6DOhogsCwC43+/VjzUwAOfzGcyMNE0br3em4L7m1gQApJSYTCaDThmllBUAZFlmi+gCaa27Z6LxQJ2Jkc8F7Ewhy7I399UlNeetDJgZ2+0WzAxmtkZSSiFN01YjdTaTlLJy6xDHMQBgPp9/NhOllDYVV9Z6/AMV7gedxo2xGQAAAABJRU5ErkJggg==)";
	liforumHioba.appendChild(forumHioba);
	
	menuUl.appendChild(liforumHioba);
	
	var ytHioba = document.createElement("a");
	var ytHiobaTekst = document.createTextNode("YouTube");
	ytHioba.href = "http://www.youtube.com/user/truckerhiob";
	ytHioba.appendChild(ytHiobaTekst);
	var liytHioba = document.createElement("li");
	liytHioba.id = "ythioba";
	liytHioba.style.background = 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAkCAYAAACAGLraAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wFCBQWBdOhm58AAAI2SURBVEjH7ZTPaxNBFMc/s5muLUUhYQOCJWhFRDG5tAf9A3ISL6JCc8g19OrBo4ciiCiI+KMK3kJp/wJbqF6qWCl6KIIieAoUepB4aEyWyb4ZD601nY0RexHBB1922PfmzXd4wwf+dqjp6ekR4ClwEigC4W/2vAcM8GF2draqrbXXgcofHFrc+U7UarWNwFpbttbSK6UU1WqVKIrwc57KWkQK/hFhGDI5OUmpVGJubo61tbVfuSkEIpITEXrV7XaJ4xhrLZVKhampKYIgwK8TkZwWkYzfVkRot9s/L10sYoxhfn7eL81oEUn5SpJkT4PNzU0WFhboV6tl+2/GdxDHMQCrq6vU63Wy2SxhmJqwaBFpAnnfQavVol6vs76+Tj6fRynVz0FTW2sbfoNOp0OtViOKIqIowjmHc67fFBpaRJaBidR8CoXd6wyIZW2tnQGOAKd/vLABGz4BrZ31EjDD//gfgHqTG903E882v1V14tg3E19lRzeCBFdOcPRKwiGOP3jM0Pg4fs5TOehCoQv0SoaHyV26Qun5CtmLl/HzPSoExpEzDnrVsRDHMSYIOHb3Pkfv3CM5MIxfZxw5bTwabYfbg7SD5y8wJsLna1fTTOz2AYWzext8bTRYefSQsT612kCKiQ63y8SPS4u8vHmDUybGKJVmonGkmOgSS3trixe3b/Fl8RlndEAGhUkbaKonh0be+hQS4LVJOKEzHA7UoDfxTie4vkw8F27fKsENZmLi+MeZ+B2ON2cQ3G67hgAAAABJRU5ErkJggg==")';
	liytHioba.appendChild(ytHioba);
	
	menuUl.appendChild(liytHioba);
	
	
	var fbHioba = document.createElement("a");
	var fbHiobaTekst = document.createTextNode("Twitter");
	fbHioba.href = "https://twitter.com/#!/truckerhiob";
	fbHioba.appendChild(fbHiobaTekst);
	var lifbHioba = document.createElement("li");
	lifbHioba.id = "fbhioba";
	lifbHioba.style.background = 'url(data:image/gif;base64,R0lGODlhEAAkAMZtAGRkZBp1nBt6o2lpaRx8pmtraxx/qW1tbR2BrG9vbyh/pB2CrXBwcB2Drh6ItnV1dSqGrnd3dx+LuXh4eB+MuzeHq3l5eR+NvCqLtHp6eiCOviCPv3t7eyuNtiCQwHx8fCCRwX19fSCSwn5+fiGTxH9/fziPsyGUxiGVxoCAgCGWyEWOroGBgSGXySyVwCKXyoKCgiKYyiKYy4ODgyKZzIeHhy6byoiIiEaXuYmJiS+dzVOWs4qKioyMjDyeyY+PjzyizWGeuZOTk0qo0ZeXl2KkwJiYmJqamlepy52dnXCnv1it0J+fn1iv1Fiw1aCgoGWy0aSkpH2twnCyzaampq2trYq1yK6uroq2ybOzs4y80ba2toLC3o7H4L29vcHBwZvK3szMzKrU5rjb6tXV1dra2sXf6eTk5NTo8OXl5dTp8eLv9u3t7f///////////////////////////////////////////////////////////////////////////yH+EUNyZWF0ZWQgd2l0aCBHSU1QACH5BAEKAH8ALAAAAAAQACQAAAfwgH+Cg4SFhoeIh1dViYNJBQ+GAEKFDBkZDIVlFgcJV38lHzMwE0aFMB8RCTcRMDMzKRyFZzUwIRwlr68cCYVRObrBP0dZhUnBrzBhglGEXyzIPYQWLDwDDynBNWeFVA8WI66vRGmHbF5MT0xbZI3u7/Dx8vP09fZYVu9KBBCGAUGFGmjQsKCQGQwGFGD5Y8JDjBYUihRyAUICAhwSWtCggaJDITQ2XojYcELGxhgbEBSCokNGDJMbZQBBoqXQkhgbc7YQI0gKITAqctKQ4YNQhRU7BDhAIdQGmkJTHFwg8SLmEDWH1nRp4qQJlzH27AUCADs=)';
	lifbHioba.appendChild(fbHioba);
	
	menuUl.appendChild(lifbHioba);
	var blogHioba = document.createElement("a");
	var blogHiobaTekst = document.createTextNode("Blog - hiob.us");
	blogHioba.href = "http://www.hiob.us";
	blogHioba.appendChild(blogHiobaTekst);
	var liblogHioba = document.createElement("li");
	liblogHioba.id = "bloghioba";
	liblogHioba.style.background = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAkCAYAAACAGLraAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wFCBQuFK6OB5YAAALESURBVEjH7ZQ/aBRBFMa/9+bNzB4EjjTaWB6x0SApTIozpaQUTYpYysJpkVQSrDyuEOEIKsYmeJ3EAwn+qTT+SXG57rpLSBELAyGQEFIcWAR0WYvb2ezeXTzO2gfL7s7s9817b3Z+hChWV1dDDBDT09MEAPQv4qQJJcXDw8MVZoZSCkopiEjPe7PZ9J2Gk2IiAhH1XXlsbKzSZcDMYGYQUfy8t7fn7+7u+gDgzDsXEPeglOoySponDZJzPQ329/f95Co7Ozs+AIyOjla6Mtjc3AQRtba2thrOIAgC/4zyG8YYGGOwvb09EwRBNs7AWhvXLyIFEcHx8fEyAORyuYIxJt4dl22qhEwmE9cnIhCJp6C1htY6HmfmtAERpQyiLDAyMlJwQmfSmUFsdXBwULbWwvO8+HL1doprtVrZ6QgAisViGDWwFU8kuj0+Pr7gxBsbG+UgCLIAUCqV0nvijDpDKdWanJxcqNVq5SAIsqVSiVIZ9ItisRgqpVqd4oHirOz+R2IXwsXZgZpE96unTAwXZ0NcH3Dpz20TSorXj/y+TBQlyJ089J1JfBbWj/w0Eyn+p6NXNx7ix9CjStdxTmKLmcHEuPrxmQ8AzRsPKiB3Pv7KRAIzdTGRuD3el4lEABFjYu15CmmX3z72AeD77VK7TCQN3lfxq25aX65cbACAYsbE12pPJjYv3WoYY2GMwYWX72bU4UnERAI8zwIgKMV4evNJQUQw92Z+GQBW7r4qGG1hREGEoRR3l+BlMiAQiBkSbVn8kTbQWqBEoFQvJoKQ8SImRk0UJXh9b6WgtYbRAhEDLc6kk4kE3FmbL1vrwbMeMrbNRGvbTDSiowwUhBn5pak0E8M8QgD4fc6eMjHR6W+FDxETBddeTJXV4UkWAKiONBOdUWcE571Wfe7TQn6pLaY6BmNimEcYDHkt9TMtHijOyu4Prca85D34Lm8AAAAASUVORK5CYII=)";
	liblogHioba.appendChild(blogHioba);
	
	menuUl.appendChild(liblogHioba);

	
	var blog3Hioba = document.createElement("a");
	var blog3HiobaTekst = document.createTextNode("Blog - polon.us");
	blog3Hioba.href = "http://www.polon.us";
	blog3Hioba.appendChild(blog3HiobaTekst);
	var liblog3Hioba = document.createElement("li");
	liblog3Hioba.id = "blogphioba";
	liblog3Hioba.style.background = "url(data:image/gif;base64,R0lGODlhEAAkAIQVAP5mAoCAgIiIiP5yEv6CMpiYmP6eXq6urra2tv6qbv6ygsDAwMbGxv6+jv7OrtbW1t7e3v7avvb29v727v7+/v///////////////////////////////////////////yH+EUNyZWF0ZWQgd2l0aCBHSU1QACH5BAEKAB8ALAAAAAAQACQAAAWT4PcFZGmS4niuKOuejETNj+Ayc05BrkwdB1+BNUOQDrPF8KRrUlZOHZRiLCFmKx8QOJOscFEGK6aTiF9oFRolWgdS8Lh8Tq/b73GAfs/Xp/qAex+BhH0NEzkOA4QNThGEiBQGBpEEgTMJegYzCpZ9UTmAoDOiFJl7CaR9kZOTMxOAjVENgYc6E7SFuoO6giK9ACIhADs=)";
	liblog3Hioba.appendChild(blog3Hioba);
	
	menuUl.appendChild(liblog3Hioba);

	
	var blog2Hioba = document.createElement("a");
	var blog2HiobaTekst = document.createTextNode("Blog - jaskiernia.com");
	blog2Hioba.href = "http://www.jaskiernia.com";
	blog2Hioba.appendChild(blog2HiobaTekst);
	var liblog2Hioba = document.createElement("li");
	liblog2Hioba.id = "blogjhioba";
	liblog2Hioba.style.background = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAkCAYAAACAGLraAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wFCBQpKiCujPoAAACzSURBVEjH7ZIxDsMgDEVN5IUJ9k7tqSwxVMrdInGqZMrKFehkRB2TDKRLxZeQzMc8G2Qzz+8MHZqgU/8OIApAFFSfhZoZ4wJEAWJcypkWF4A0GaJVliCsK8qLZ97hCZJ81RWDUHt/6180mTHK/YAhAOO8HYP0S8C27rCtu+oXOW+z8zanlMrifX2mxc7bjEx8vh5fVeRe5nGMnMxt1RfPvOYgMVnrSstDSW1Va8HGKN8A+ABBvYeOVtK3QAAAAABJRU5ErkJggg==)";
	liblog2Hioba.appendChild(blog2Hioba);
	
	menuUl.appendChild(liblog2Hioba);
	
	
	
	document.getElementById('menuLinki').innerHTML +=  '<div id="kontZegarek" style="width: 200px;"><div style="display: inline;">Czas u hioba (<span title="Charlotte, Karolina Północna">Charlotte,  NC</span>):</div><iframe style="width: 100%; border-top: 1px solid silver; border-bottom: 1px solid silver;"  src="http://free.timeanddate.com/clock/i33twel4/n207/fn4/fs28/fc424242/tct/ftb/ts1" frameborder="0" width="170" height="35" allowTransparency="true"></iframe></div>';
	
	document.getElementById("kontZegarek").style.width = (document.getElementById('menuLinki').clientWidth)+"px";
	

	
	var poszerz = document.createElement("input");
	poszerz.title = "Rozszerz pole czatu";
	poszerz.className = "inczat";
	poszerz.id = "rozczat";
	kontenerPrawy.className = "nieRozczat";
	poszerz.alt = "nie";
	poszerz.type = "button";
	document.getElementById("jedLink").appendChild(poszerz);
	poszerz.addEventListener("click", rozszerz);	
	
	document.getElementById("jedLink").appendChild(aJedEl);
	
	
	var wysLinkow = document.getElementById("menuLinki").getElementsByTagName("ul")[0].clientHeight+8+14+35+2+1;
	
	//alert(document.getElementById("menuLinki").getElementsByTagName("ul")[0].clientHeight+' '+wysLinkow);
	if(window.innerHeight > (((((wideo.clientWidth)/4)*3)+26)+(wysLinkow))) {
		kontenerGora.style.height = ((((wideo.clientWidth)/4)*3)+26)+"px";
		dodajStyl("#map {height: "+(window.innerHeight-kontenerGora.clientHeight)+"px !important;}");
		document.getElementById("kontenerDol").style.minHeight = (wysLinkow/2)+"px";
		
		
		
		if(kontenerPrawy.className == "nieRozczat" /*document.getElementById("rozczat").alt == "nie"*/){
			document.getElementById("kontenerPrawy").className = "nieRozczat";
			document.getElementById("rozczat").title = "Rozszerz pole czatu";
		} else {
			document.getElementById("kontenerPrawy").className = "takRozczat";
			document.getElementById("rozczat").title = "Zwęż pole czatu";
		} 
		/*if(document.getElementById("rozczat").alt == "nie"){
			document.getElementById("kontenerPrawy").className = "nieRozczat";
		} else {
			document.getElementById("kontenerPrawy").className = "takRozczat";
		}*/
		
	} else if(window.innerHeight <= window.innerWidth/2) {
		kontenerGora.style.height = (window.innerHeight-(wysLinkow))+"px";
		kontenerLewy.appendChild(wideo);
		wideo.style.height = (window.innerHeight)+"px";
		wideo.style.width = (((window.innerHeight-26)/3)*4)+"px";;
		dodajStyl(
			"#kontenerGora {-moz-box-flex: "+(window.innerHeight-(wysLinkow))+" !important; -webkit-box-flex: "+(window.innerHeight-(wysLinkow))+" !important;}"+
			"#map, #kontenerDol {min-height: "+(wysLinkow)+"px !important;}"
		);
		poszerz.setAttribute("disabled", "disabled");
	}
	else {
		if(wysLinkow*2 > window.innerHeight){
			kontenerGora.style.height = (window.innerHeight-(wysLinkow/2))+"px";
			dodajStyl("#kontenerGora {-moz-box-flex: "+(window.innerHeight-(wysLinkow/2))+" !important; -webkit-box-flex: "+(window.innerHeight-(wysLinkow/2))+" !important;}");
			wideo.style.height = (window.innerHeight-(wysLinkow/2))+"px";
		} else {
			kontenerGora.style.height = (window.innerHeight-(wysLinkow))+"px";
			dodajStyl("#kontenerGora {-moz-box-flex: "+((window.innerHeight-(wysLinkow)))+" !important; -webkit-box-flex: "+((window.innerHeight-(wysLinkow)))+" !important;}");
			wideo.style.height = (window.innerHeight-(wysLinkow))+"px";
		}
		
		dodajStyl(
			"#map {min-height: "+(wysLinkow)+"px !important;}"
		);
		document.getElementById("kontenerDol").style.minHeight = (wysLinkow/2)+"px";
		
		var szerWideo = (((kontenerGora.clientHeight-26)/3)*4);
		
		wideo.setAttribute("width", szerWideo);
		dodajStyl(
			//"#utv11766 { -moz-box-flex: 0 !important; -webkit-box-flex: none !important;}"+
			".nieRozczat #kontenerCzat {width:"+(window.innerWidth-szerWideo)+" !important; -moz-box-flex: 0 !important; -webkit-box-flex: none !important;}"+
			".takRozczat #kontenerCzat {width:"+(window.innerWidth-(szerWideo/2))+" !important; -moz-box-flex: 0 !important; -webkit-box-flex: none !important;}"
		);
	}
	
	
	if(localStorage.getItem("szerczat") != null){
		//document.getElementById("rozczat").alt = localStorage.getItem("szerczat");
		kontenerPrawy.className = localStorage.getItem("szerczat");
	}
	
	dodajStyl("#kontenerCzat, #kontenerGora { -webkit-transition: all .1s ease-out;}");
	
	// nazwa strony
	var nazwaStrony = document.createTextNode("Trucker Hiob na żywo");
    document.getElementsByTagName("title")[0].removeChild( document.getElementsByTagName("title")[0].firstChild);
	document.getElementsByTagName("title")[0].appendChild(nazwaStrony);
}

if(document.body){
	zwrot();
}
else {
	window.addEventListener("DOMContentLoaded", zwrot, false);
}
/*
window.onload = function() {
  zwrot();
};*/
// rozszerz czat
function rozszerz(){
	if(document.getElementById("kontenerPrawy").className == "nieRozczat"){
		document.getElementById("kontenerPrawy").className = "takRozczat";
		document.getElementById("rozczat").title = "Zwęż pole czatu";
		//document.getElementById("rozczat").alt = "tak";
		localStorage.setItem("szerczat", "takRozczat");
	} else {
		document.getElementById("kontenerPrawy").className = "nieRozczat";
		document.getElementById("rozczat").title = "Rozszerz pole czatu";
		//document.getElementById("rozczat").alt = "nie";
		localStorage.setItem("szerczat", "nieRozczat");
	}
}

 // Dodanie stylu w prostej formie
function dodajStyl(toStyl){
	(function() {
		var css = toStyl;
		if (typeof GM_addStyle != "undefined") {
			GM_addStyle(css);
		} else if (typeof PRO_addStyle != "undefined") {
			PRO_addStyle(css);
		} else if (typeof addStyle != "undefined") {
			addStyle(css);
		} else {
			var heads = document.getElementsByTagName("head");
			if (heads.length > 0) {
				var node = document.createElement("style");
				node.type = "text/css";
				node.appendChild(document.createTextNode(css));
				heads[0].appendChild(node); 
			}
		}
	})();
}