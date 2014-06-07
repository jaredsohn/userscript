// ==UserScript==
// @name           CPAlead Remover
// @namespace      http://cpa.vienalga.net
// @description    Bypasses CPAlead.com popup
// @include        http://*
// ==/UserScript==


// isolation for Opera
(function(){

// create isolated Script on DOM level
var toDOM = document.createElement('script');
toDOM.innerHTML='(' + (function(){
// innert NoCPA code
var d=0;

function NoCPA(){
	// Seeks for "Thank you" function
	for(var i in window){
		if(typeof(window[i]) == 'function'){
			if(window[i].toString().indexOf('http://www.surveysforcharity.org/thankyou-overlay.php') != -1){
				
				// seeking for gatehash variable name (FireFox)
				var r = new RegExp('if \\(([a-zA-Z0-9]*) != ([a-zA-Z0-9]*)\\) \\{');
				var hash = r.exec(window[i].toString());
				
				// seeking for gatehash variable name (Opera)
				if (!hash){
					r = new RegExp('if\\(([a-zA-Z0-9]*)!=([a-zA-Z0-9]*)\\)\\{');
					hash = r.exec(window[i].toString());
				}

				// executes "Thank you" function with Gateid and Gatehash args
				if (hash){
					try{
	 					window[i]('MzQ3MDk%3D',window[hash[2]]);
					}
					catch(err){}
				}
			}
		}
	}

	// Repeates 20 times
	d++;
	if (d<20){
		setTimeout(NoCPA, 500);
	}
}

if (typeof(window.myGatewayStart) == 'function') {
	if (typeof(window.createOverlay) == 'function') {
		// Remove CPAlead startup and displaying functions
		window.createOverlay=function(gateid){return false;}

		// Destroys CPAlead from inside
		NoCPA();
	}
}

// end inner NoCPA code
}).toString() + ')();';

document.body.appendChild(toDOM);
})();
// end Opera isolation