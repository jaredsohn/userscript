// ==UserScript==
// @name           panel profil
// @namespace      localhost
// @include        http://www.fotka.pl/konto*
// ==/UserScript==

var menu_konto = document.getElementById("menu_konto");
var nowyDiv = document.createElement("DIV");

nowyDiv.style.width = "10.5em";
nowyDiv.style.cssFloat  = "left";

var zawart = '													\
  <div class="icos16 ico16_02"></div>							\
  <b style="font-size: 1.2em;" class="k10">Profil</b><br/>		\
  <div style="margin-left: 2em;">								\
	<a href="http://www.fotka.pl/profil/login/#comments" class="k01">komentarze</a><br/>	 		\
    <a href="http://www.fotka.pl/albumy/login/" class="k01">albumy</a><br/> 				\
    <a href="http://www.fotka.pl/profil/login/Znajomi.html" class="k01">znajomi</a><br/> 			\
    <a href="http://www.fotka.pl/profil/login/Klany.html" class="k01">klany</a><br/> 				\
    <a href="http://www.fotka.pl/klan/495692/fotkamodstm/">FotkaTools[klan]</a><br/> \
	<a href="http://support.fotkatools.pl">FotkaTools[forum]</a><br/>		\
	<br/>														\
  </div>														\
';

var login = unsafeWindow.ad_zalogowany_login; // document.getElementById("logowanie").childNodes[7].firstChild.firstChild.innerHTML;
zawart = zawart.replace(/login/g, login);
nowyDiv.innerHTML = zawart;

menu_konto.appendChild(nowyDiv);