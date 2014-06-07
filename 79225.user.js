// ==UserScript==
// @name           obrazki
// @namespace      local
// @include        http://www.fotka.pl/konto.php
// ==/UserScript==

	


	if ($("lokalizacja") != null){  // czy jesteśmy na profilu?
		dodajPrzycisk()

}
		
		
function dodajPrzycisk(){
	var l = $("lokalizacja")
	if (l != null){
		var gdzie = l.parentNode.previousSibling
		var p = newElem("IMG")
		p.src = "http://www.jobfree24.com/img/add.png"	
		p.id = "przycisk_dodaj"
		p.title = "Zgłoś BANA!"
		p.style.cursor = "pointer"
		p.style.marginLeft = "35px"
		p.addEventListener("click", pokazMenu, false); 
	
		gdzie.appendChild(p)

	}
}



///////////////////////////////////////////////////////////////
// credits: http://www.quirksmode.org/js/cookies.html 

// funkcja pozwala na obejście zabezpieczneń funkcji GM_*
// http://wiki.greasespot.net/0.7.20080121.0_compatibility

function safeWrap(f) {
  return function() {
    setTimeout.apply(window, [f, 0].concat([].slice.call(arguments)));
  };
}