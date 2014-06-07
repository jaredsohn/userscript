// ==UserScript==
// @name          Bankmanagergame - Konsortium-Immobilien
// @namespace     http://scripte.georglink.de/
// @description	  bessere Sortierfunktion, bei auktionen immer eigener username ausgewählt.
// @author        Stevo
// @include       http://bankmanagergame.de/index.php?section=konsortium_immobilien
// @include       http://www.bankmanagergame.de/index.php?section=konsortium_immobilien
// ==/UserScript==


// deine userid - damit du automatisch ausgewählt wirst. du findest deine id im quellcode von der konsortiums-immobilienseite. einfach nach deinem usernamen suchen. die id hier eintragen:
var myuserid = 12345;

var $1;

// Add jQuery
(function(){
	if (typeof unsafeWindow.jQuery == 'undefined') {
		var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
			GM_JQ = document.createElement('script');

		GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
		GM_JQ.type = 'text/javascript';
		GM_JQ.async = true;

		GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
	}
	GM_wait();
})();

// Check if jQuery's loaded
function GM_wait() {
	if (typeof unsafeWindow.jQuery == 'undefined') {
		window.setTimeout(GM_wait, 100);
	} else {
		$1 = unsafeWindow.jQuery;
		window.setTimeout(gemma,100);
	 }
}



function gemma() {

  $('#filter').hide();

  var filtermenu = document.createElement('div');


  var haggl1 = document.createElement('input');
  var haggl2 = document.createElement('input');
  var haggl3 = document.createElement('input');
  var haggl4 = document.createElement('input');
  var haggl5 = document.createElement('input');
  var inp1 = document.createElement('input');
  var inp2 = document.createElement('input');
  var inp3 = document.createElement('input');

  haggl1.type = 'checkbox';
  haggl2.type = 'checkbox';
  haggl3.type = 'checkbox';
  haggl4.type = 'checkbox';
  haggl5.type = 'checkbox';
  
  haggl1.onchange = function(){    checkFilter();  };
  haggl2.onchange = function(){    checkFilter();  };
  haggl3.onchange = function(){    checkFilter();  };
  haggl4.onchange = function(){    checkFilter();  };
  haggl5.onchange = function(){    checkFilter();  };
  inp3.onchange   = function(){    checkFilter();  };
  inp3.onkeyup    = function(){    checkFilter();  };

  haggl1.id = 'stevofilterh1';
  haggl2.id = 'stevofilterh2';
  haggl3.id = 'stevofilterh3';
  haggl4.id = 'stevofilterh4';
  haggl5.id = 'stevofilterh5';
  inp1.id = 'stevofilteri1';
  inp2.id = 'stevofilteri2';
  inp3.id = 'stevofilteri3';

 // haggl1.checked = 'checked';
 // haggl2.checked = 'checked';
  haggl3.checked = 'checked';
  haggl4.checked = 'checked';
  haggl5.checked = 'checked';
  inp1.value = '10';
  inp2.value = '1';
  inp3.value = '1';

  haggl1.style.marginRight = '5px';
  haggl2.style.marginRight = '5px';
  haggl3.style.marginRight = '5px';
  haggl4.style.marginRight = '5px';
  haggl5.style.marginRight = '5px';
  inp1.style.marginRight = '5px';
  inp2.style.marginRight = '5px';
  inp3.style.marginRight = '5px';
  inp1.style.width = '30px';
  inp2.style.width = '30px';
  inp3.style.width = '30px';
  inp1.style.padding = '3px';
  inp2.style.padding = '3px';
  inp3.style.padding = '3px';
  inp1.style.textAlign = 'center';
  inp2.style.textAlign = 'center';
  inp3.style.textAlign = 'center';

  haggl1.title = 'Einfamilienhaus';
  haggl2.title = 'Plattenbau';
  haggl3.title = 'Luxus-Mietwohnungen';
  haggl4.title = 'Luxusvilla';
  haggl5.title = 'Wolkenkratzer';
  inp1.title = 'Maximaler Vandalismus';
  inp2.title = 'Maximaler Mietausfall';
  inp3.title = 'Maximaler Wertverlust';

  filtermenu.appendChild(haggl1);
  filtermenu.appendChild(haggl2);
  filtermenu.appendChild(haggl3);
  filtermenu.appendChild(haggl4);
  filtermenu.appendChild(haggl5);
 // filtermenu.appendChild(inp1);
 // filtermenu.appendChild(inp2);
  filtermenu.appendChild(inp3);

  $("select option[value='"+myuserid+"']").attr('selected',true); 
  $("button:contains('filtern')").replaceWith(filtermenu);
  

  checkFilter();

}

function checkFilter() {
  
  $("tr").show();


  var haggl1 = document.getElementById('stevofilterh1').checked;
  var haggl2 = document.getElementById('stevofilterh2').checked;
  var haggl3 = document.getElementById('stevofilterh3').checked;
  var haggl4 = document.getElementById('stevofilterh4').checked;
  var haggl5 = document.getElementById('stevofilterh5').checked;
 // var inp1 = document.getElementById('stevofilteri1').value;
 // var inp2 = document.getElementById('stevofilteri2').value;
  var inp3 = document.getElementById('stevofilteri3').value;




 var i = 10;
 while (i > inp3) {
   $("tr:contains('"+i+" Pkt/Tag')").hide();
   i = (i - 1);
 }


 if (haggl1 != true) {
   $("tr:contains('Einfamilienhaus')").hide();
 }
 if (haggl2 != true) {
   $("tr:contains('Plattenbau')").hide();
 }
 if (haggl3 != true) {
   $("tr:contains('Luxusmietwohnungen')").hide();
 }
 if (haggl4 != true) {
   $("tr:contains('Luxusvilla')").hide();
 }
 if (haggl5 != true) {
   $("tr:contains('Wolkenkratzer')").hide();
 }
 


}
