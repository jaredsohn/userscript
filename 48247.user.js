// ==UserScript==
// @name           Pennergame: Pfandkurs Auto-Refresh
// @namespace      Pennergame
// @description    Aktualisiert jede Sekunde den Pfandkurs (Verbessert by NettiCat).
// @include        http://*pennergame.de/*
// @include        http://pennergame.de/*
// @exclude        *.highscore.*
// @exclude        *.*board.*
// ==/UserScript==

var minflaschenkurs = 16;
var lastkurs = 0; 
var error = 0;
var req;

function request(){ 
req = 0;
try{
req = GM_xmlhttpRequest({

    method: 'GET',
    url: 'http://berlin.pennergame.de/news/',

    onload: function(responseDetails) {
				if (responseDetails.status != 200) {
					GM_log('invalid response');
					return;
				}
				var nod = responseDetails.responseText.match(/(?:pfandflaschen_kurs_ajax[^>]+>)\d+/mi);//use response
				if(!nod)
					return;
				nod = String(nod).replace(/[^\d]+/i, '');
        var newkurs = parseInt(nod);
				if(!newkurs || isNaN(newkurs))
					return;
				if (lastkurs && (newkurs >= minflaschenkurs) && (lastkurs < minflaschenkurs))//vermeide sekündlichen alert
				 		alert("Achtung! Flaschenkurs bei " + newkurs + " Cent! (alt=" + lastkurs +")");
				lastkurs = newkurs;
				var tc = document.getElementById("pfandflaschen_kurs_ajax");

				if(tc)
				tc.textContent = (/\:\d+/.test(tc.textContent)) ? ("." + newkurs) : (":" + newkurs);//some animation is nicer
    }
});
}catch(e){}

};


		window.setInterval(request, 1000);





