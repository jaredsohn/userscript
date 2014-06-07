// ==UserScript==
// @name           Tender Filtr
// @namespace      virtonomica
// @version        0.3
// @description    Virtonomica Tender Filtr v0.1
// @include        http://virtonomica.*/*/main/competitionlist/tender/*
// ==/UserScript==

var run = function() {

  var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
  $ = win.$;
  var n = 0;

var container = $('#headerInfoCenter h3');

var input = $('<select>').append('<option value=0>&nbsp;</option>').append('<option value=1>1 вирт</option>').append('<option value=3>3 вирта</option>').append('<option value=5>5 вирт</option>').append('<option value=531>5+3+1 вирт</option>').change(function() {

  //alert (input.val() ) ;
  find = input.val();
  if (find == '531') find = '5  + 3  + 1';
  $('div.competitionDescr').find('div.cheader div').each(function() {
	//alert ( n );
	//n++;
	str = this.innerHTML;
	pos_begin = str.indexOf(':');
	pos_end = str.indexOf('вирт'); 
	//alert ('[' + pos_begin + '] ['+ pos_end + ']');
	var prize = '';

	var block = this.parentNode.parentNode;
	for(i =pos_begin +2; i< pos_end-1; i++){
   		prize += str[i];
	}
	
	if (pos_end > 0) { 
		//alert ('['+prize+']');
		if (find != 0 ) {
		if (find == prize) { $(this.parentNode.parentNode).show(); }
		else { $(this.parentNode.parentNode).hide(); }
		} else $(this.parentNode.parentNode).show();

	}
	else {
		if (find != 0 ) { $(this.parentNode.parentNode).hide();}
		else $(this.parentNode.parentNode).show();
	}
  });
});

container.append('<br>Фильтр по призам: ').append(input);
}

// Грязный хак для Google Chrome >:]
if(typeof window.chrome != 'undefined') {
    var script = document.createElement("script");
    script.textContent = '(' + run.toString() + ')();';
    document.documentElement.appendChild(script);
} else {
    run();
}