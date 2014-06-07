// ==UserScript==
// @name           Ogame Total Resources
// @namespace      Ogame
// @include        http://uni*.ogame.*/game/index.php?page=*
// @include        http://uni*.ogame.*/game/index.php?page=resources*
// @version        0.01
// @source         http://userscripts.org/scripts/show/106419
// ==/UserScript==

var div;
var interval;
var totres;
var text;

var init = function() {
    var offdiv = document.getElementById("resources");
    div = document.createElement("div");
    document.body.appendChild(div);
    div.innerHTML = "";
	
	totres = document.createElement("span");
	text = document.createElement("span");
	
	div.appendChild( text );
	div.appendChild( totres );
	text.innerHTML = "Risorse Totali: "
	
    div.style['text-align'] = 'center';
    div.style['font-size'] = '10px';
    div.style['margin-top'] = '5px';
    div.style['position'] = 'fixed';
    div.style['right'] = "10px";
    div.style['bottom'] = "25px";
	
    text.style['color'] = "deepskyblue";
	text.style['font-weight'] = 'bold';
	
	function getTotRes() {
        var metal     = document.getElementById( "resources_metal" ).innerHTML.replace( /\./g, '' );
        var crystal   = document.getElementById( "resources_crystal" ).innerHTML.replace( /\./g, '' );
        var deuterium = document.getElementById( "resources_deuterium" ).innerHTML.replace( /\./g, '' );
        var output = "";
        var sum = ( parseInt( metal ) + parseInt( crystal ) + parseInt( deuterium ) ).toString();
        
		function addCommas(someNum){
			while (someNum.match(/^(.*\d)(\d{3}(\.|,|$).*$)/)) {
				someNum = someNum.replace(/^(.*\d)(\d{3}(\.|,|$).*$)/, '$1.$2');
			}
			return someNum;
		}
		
		var bCargos = parseInt( Math.ceil( parseInt( sum ) / 25000 ) ).toString();
		var lCargos = parseInt( Math.ceil( parseInt( sum ) / 5000 ) ).toString();
		
		totres.innerHTML = addCommas( sum );
		div.setAttribute( "title", bCargos + ' Carghi Pesanti | ' + lCargos + ' Cargo Leggeri' );
	}
	
    interval = setInterval( getTotRes, 1000 );
}

window.onload = init();