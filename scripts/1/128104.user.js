// ==UserScript==
// @name           Rozszerzanie belki - pandas
// @namespace      wytest
// @include        http://*.wykop.pl/*
// ==/UserScript==



if(unsafeWindow.jQuery){
var $ = unsafeWindow.jQuery;
 main();
} else {
 addJQuery(main);
}

function main(){
	
	var grp='<div class="fleft">' +
				'<a href="http://grupa-ratowania-poziomu.wykop.pl/" title="Grupa Ratowania Poziomu"'+
				'class="tip fleft cfff tab fbold  ">GRP</a>'+
			'</div>';	
			
	var H='<div class="fleft">' +
				'<a href="http://historia.wykop.pl/" title="Historia"'+
				'class="tip fleft cfff tab fbold  ">H</a>'+
			'</div>';
	var AFM='<div class="fleft">' +
				'<a href="http://astronomia-fizyka-matematyka.wykop.pl/" title="Astronomia, fizyka i matematyka"'+
				'class="tip fleft cfff tab fbold  ">AFM</a>'+
			'</div>';
	var BCM='<div class="fleft">' +
				'<a href="http://biologia-chemia-medycyna.wykop.pl/" title="Biologia, chemia i medycyna"'+
				'class="tip fleft cfff tab fbold  ">BCM</a>'+
			'</div>';
	var M='<div class="fleft">' +
				'<a href="http://militaria.wykop.pl/" title="Militaria"'+
				'class="tip fleft cfff tab fbold  ">Mil</a>'+
			'</div>';
	var CSI='<div class="fleft">' +
				'<a href="http://csiwykop.wykop.pl/" title="CSI:WYKOP"'+
				'class="tip fleft cfff tab fbold  ">CSI</a>'+
			'</div>';
	var GzW='<div class="fleft">' +
				'<a href="http://gotuj-z-wykopem.wykop.pl/" title="Gotuj z Wykopem"'+
				'class="tip fleft cfff tab fbold  ">GzW</a>'+
			'</div>';
	var AMA='<div class="fleft">' +
				'<a href="http://zapytajmnie.wykop.pl/" title="AMA"'+
				'class="tip fleft cfff tab fbold  ">AMA</a>'+
			'</div>';
	var Muz='<div class="fleft">' +
				'<a href="http://muzyka.wykop.pl/" title="Muzyka"'+
				'class="tip fleft cfff tab fbold  ">Muz</a>'+
			'</div>';
	var SO='<div class="fleft">' +
				'<a href="http://systemy-operacyjne.wykop.pl/" title="Systemy operacyjne"'+
				'class="tip fleft cfff tab fbold  ">SO</a>'+
			'</div>';
	var PiW='<div class="fleft">' +
				'<a href="http://programowanie-i-webdesign.wykop.pl/" title="Programowanie i webdesign"'+
				'class="tip fleft cfff tab fbold  ">PiW</a>'+
			'</div>';
	var K='<div class="fleft">' +
				'<a href="http://komputery.wykop.pl/" title="Komputery"'+
				'class="tip fleft cfff tab fbold  ">K</a>'+
			'</div>';
	var G='<div class="fleft">' +
				'<a href="http://gadzety.wykop.pl/" title="Gadżety"'+
				'class="tip fleft cfff tab fbold  ">G</a>'+
			'</div>';
	var NT='<div class="fleft">' +
				'<a href="http://nowe-technologie.wykop.pl/" title="Nowe technologie"'+
				'class="tip fleft cfff tab fbold  ">NT</a>'+
			'</div>';
	var F='<div class="fleft">' +
				'<a href="http://film.wykop.pl/" title="Film"'+
				'class="tip fleft cfff tab fbold  ">F</a>'+
			'</div>';
	var L='<div class="fleft">' +
				'<a href="http://literatura.wykop.pl/" title="Literatura"'+
				'class="tip fleft cfff tab fbold  ">L</a>'+
			'</div>';
	var GiD='<div class="fleft">' +
				'<a href="http://grafika-i-design.wykop.pl/" title="Grafika i design"'+
				'class="tip fleft cfff tab fbold  ">GiD</a>'+
			'</div>';
	var Foto='<div class="fleft">' +
				'<a href="http://fotografia.wykop.pl/" title="Fotografia"'+
				'class="tip fleft cfff tab fbold  ">Foto</a>'+
			'</div>';
	var C='<div class="fleft">' +
				'<a href="http://ciekawostki.wykop.pl/" title="Ciekawostki"'+
				'class="tip fleft cfff tab fbold  ">C</a>'+
			'</div>';



	$('nav.main.medium.rel').append(grp);
	$('nav.main.medium.rel').append(H);
	$('nav.main.medium.rel').append(AFM);
	$('nav.main.medium.rel').append(BCM);
	$('nav.main.medium.rel').append(C);
	$('nav.main.medium.rel').append(M);
	$('nav.main.medium.rel').append(CSI);
	$('nav.main.medium.rel').append(GzW);
	$('nav.main.medium.rel').append(AMA);
	$('nav.main.medium.rel').append(Muz);
	$('nav.main.medium.rel').append(SO);
	$('nav.main.medium.rel').append(PiW);
	$('nav.main.medium.rel').append(K);
	$('nav.main.medium.rel').append(G);
	$('nav.main.medium.rel').append(NT);
	$('nav.main.medium.rel').append(F);
	$('nav.main.medium.rel').append(L);
	$('nav.main.medium.rel').append(GiD);
	$('nav.main.medium.rel').append(Foto);
	
	

}

function addJQuery(callback) {
  var script = document.createElement("script");
  script.textContent = "(" + callback.toString() + ")();";
  document.body.appendChild(script);
}