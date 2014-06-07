// ==UserScript==
// @name           Virtonomics Tender Type 1.0
// @namespace      Virtonomics
// @description    Filters tenders by type
// @include        http://virtonomics.*/*/main/competitionlist/tender/*
// ==/UserScript==


var run = function() {

  var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
  $ = win.$;
  var n = 0;

var container = $('#headerInfoCenter h3');

var input = $('<select>').append('<option value=0>&nbsp;</option>')
.append('<option value=1>Storm</option>')
.append('<option value=2>Cities Supply</option>')
.append('<option value=3>Trade in cities</option>')
.append('<option value=4>Best store</option>')
.append('<option value=5>Head Commodity expert</option>')
.append('<option value=6>Tender Mania</option>')
.append('<option value=7>Best range of goods</option>')
.append('<option value=8>Consumer magic</option>')
.append('<option value=9>Technomania</option>')
.append('<option value=10>Order of a research institution</option>')
.append('<option value=11>Regional leader</option>').change(function() {

  //alert (input.val() ) ; Order of a research institution
  find = input.val();
  if (find == '1') find = 'Storm';
  if (find == '2') find = 'Cities supply';
  if (find == '3') find = 'Trade in cities';
  if (find == '4') find = 'Best store';
  if (find == '5') find = 'Head commodity expert';
  if (find == '6') find = 'Tender mania';
  if (find == '7') find = 'Best range of goods';
  if (find == '8') find = 'Consumer magic';
  if (find == '9') find = 'Technomania';
  if (find == '10') find = 'Order of a research institution';
  if (find == '11') find = 'Regional leader';	
  $('div.competitionDescr').find('div.cheader div').each(function() {
	//alert ( n );
	//n++;
	str = this.innerHTML;
	pos_begin = str.indexOf('#');
	pos_end = str.indexOf('Prize'); 
	//alert ('[' + pos_begin + '] ['+ pos_end + ']');
	var prize = '';

	var block = this.parentNode.parentNode;
	for(i =pos_begin +8; i< pos_end-2; i++){
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

container.append('<br><br>Filter By Type: ').append(input);
}

// A dirty hack for Google Chrome >:]
if(typeof window.chrome != 'undefined') {
    var script = document.createElement("script");
    script.textContent = '(' + run.toString() + ')();';
    document.documentElement.appendChild(script);
} else {
    run();
}