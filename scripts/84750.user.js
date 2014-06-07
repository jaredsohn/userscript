// ==UserScript==
// @name           Bypass Cpalead
// @description    Bypasses CPAlead.com popup
// ==/UserScript==


(function(){

var toDOM = document.createElement('script');
toDOM.innerHTML='(' + (function(){
var d=0;

function NoCPA(){
	for(var i in window){
		if(typeof(window[i]) == 'function'){
			if(window[i].toString().indexOf('http://www.surveysforcharity.org/thankyou-overlay.php') != -1){
				
				var r = new RegExp('if \\(([a-zA-Z0-9]*) != ([a-zA-Z0-9]*)\\) \\{');
				var hash = r.exec(window[i].toString());
				
				if (!hash){
					r = new RegExp('if\\(([a-zA-Z0-9]*)!=([a-zA-Z0-9]*)\\)\\{');
					hash = r.exec(window[i].toString());
				}

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
		window.createOverlay=function(gateid){return false;}

		NoCPA();
	}
}

}).toString() + ')();';

document.body.appendChild(toDOM);
})();