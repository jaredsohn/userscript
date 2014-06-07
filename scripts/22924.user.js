// ==UserScript==
// @name Statystyki mapaogame
// @namespace li-on@wp.pl
// @description Dodaje link  pod nazwa gracza do statystyk na mapaogame.net
// @include      http://s*.ogame.onet.pl/game/index.php?page=galaxy*
// ==/UserScript==

  var th = document.getElementsByTagName ('th');
  for (var i = 0; i < th.length; i++) {
	a=th[i].getElementsByTagName ('a');
	if(a.length){
		span=a[0].getElementsByTagName ('span');
		if(span.length){
			a[0].setAttribute('href','http://mapaogame.net/szukaj.php?act=szukaj&typ=1&uni=15&fraza='+span[0].innerHTML);
			a[0].setAttribute('target','_blank');
		}
	}
  }   
   
str = GM_getValue("fr");
	if(str==null){ 
	alert(unescape("Niniejszy%20skrypt%20jest%20darmowy%20mo%u017Cesz%20go%20%0Arozprowadza%u0107%20dalej%20i/lub%20modyfikowa%u0107%20%0Apod%20warunkiem%20nie%20pobierania%20z%20tego%20tytu%u0142u%20%0Aop%u0142at%20%28z%20wyj%u0105tkiem%20ceny%20no%u015Bnika%29%0Ai%20zachowania%20tej%20informacji%0ANiniejszy%20skrypt%20rozpowszechniany%20jest%20%0A%0ABEZ%20JAKIEJKOLWIEK%20GWARANCJI%20%0A%0AU%u017Cywanie%20skryptu%20mo%u017Ce%20by%u0107%20niezgodne%20z%20regulaminem%20gry"));
	GM_setValue("fr","lion")
	}