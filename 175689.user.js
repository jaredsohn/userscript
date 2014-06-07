// ==UserScript==
// @name              Ostatni dystans dla #rowerowyrownik
// @namespace         http://wykop.pl/ludzie/anonim1133
// @description       Wstawia ostatni dystans w pole dodawania wpisu pod #rowerowyrownik
// @author            Anonim1133
// @version           0.1133
// @include           http://www.wykop.pl/tag/rowerowyrownik/*
// @grant             none
// @run-at            document-end
// ==/UserScript==

function addJQuery(callback) {
    var script = document.createElement("script");
    script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
    script.setAttribute("type", "text/javascript");
    script.addEventListener('load', function() {
        var script = document.createElement("script");
        script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
        document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
    
}


if (window.addEventListener) {
    window.addEventListener('load', function() { addJQuery(main); }, false);
} else {
    addJQuery(main); 
}

function main(){
	$.ajax(
			{
			url: 'http://www.wykop.pl/tag/rowerowyrownik/wszystkie/'
			}).success(
			function(result){
				var wynik = ($(result).find('blockquote:first p').text().split('\n')[1].split('=')[1]);
				$('textarea').prepend(wynik);
				//$('.width400.fright.margintop35').append('#rowerowyrownik = '+wynik);
			}).fail(function() { alert('Błąd pobierania ostatniego wyniku'); });
}
