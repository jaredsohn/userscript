// ==UserScript==
// @name           Virtonomica: Unit sale
// @namespace      Virtonomics
// @description    Sets a price of 70%, 100%, 300% of the value of assets
// @version        1.00
// @include        http://*virtonomic*.*/*/window/unit/market/sale/*
// ==/UserScript==

var run = function() {

	function setPrice( sal) { 	
		return (Math.floor(sal *100) +1)/100;
	}

  var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
	$ = win.$;

	$("td:contains('$')").each(function() { 
		str = this.textContent;
 		prize = '';
	 	for(i = 0 ; i< str.length-1; i++){
		if (str[i] == '$'){
			i = str.length-1;
			continue;}
		if (str[i] == ' ') continue;
    		prize += str[i];
 		}
	});

  var container = $('div.headerSeparator');

  var input_70 = $('<button id=b_70>70%</button>').click(function() {
	val = 0.70* prize;
	val = setPrice(val);
        var zzz = document.getElementsByName('price');
        zzz[0].value = val;
  });

  var input_100 = $('<button id=b_100>100%</button>').click(function() {
	val = prize;
        var zzz = document.getElementsByName('price');
        zzz[0].value = val;
  });

  var input_300 = $('<button id=b_300>300%</button>').click(function() {
	val = 3*prize - 0.01;
        var zzz = document.getElementsByName('price');
        zzz[0].value = val;
  });

  container.append( $('<table><tr>').append('<td>').append(input_70).append('<td>').append(input_100).append('<td>').append(input_300) );
}

// Хак, что бы получить полноценный доступ к DOM >:]
var script = document.createElement("script");
script.textContent = '(' + run.toString() + ')();';
document.documentElement.appendChild(script);