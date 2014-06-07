// ==UserScript==
// @name           Virtonomica: Баланс товаров на складе
// @namespace      Virtonomica
// @include        http://virtonomic*.*/*/main/unit/view/*
// @exclude        http://virtonomic*.*/*/main/unit/view/*/*
// ==/UserScript==

var run = function() 
{

function NumFormat( N )
{
    	var res = '';
	N = N.toString();
    	for (var i=0, j=N.length; i<j; i++) 
	{
		if (i%3 == 0 && i != 0) 
			res = ' ' + res;
		res = N.substr(j-1-i, 1) + res;
    	}
    	return res;
}


   	var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
	$ = win.$;

	// сперва надо убедиться, что мы на странице склада
	var isStorage = 0;

	$( 'img[src*="warehouse_"]' ).each ( function()
	{
		isStorage = 1;
	});
	
	if ( !isStorage ) return;

	$( 'tr.even, tr.odd' ).each ( function()
	{
		var cells = $( 'td', this );

		// всего на складе
 		var total = parseInt($(cells[1]).text().replace(' ', '').replace(' ', '').replace(' ', '').replace(' ', ''));

		// отгрузки по контракту
		var kont = parseInt($(cells[5]).text().replace(' ', '').replace(' ', '').replace(' ', '').replace(' ', ''));

		// закуплено
 		var zak = parseInt($(cells[7]).text().replace(' ', '').replace(' ', '').replace(' ', '').replace(' ', ''));

		// отгружено
		var otgr = parseInt($(cells[8]).text().replace(' ', '').replace(' ', '').replace(' ', '').replace(' ', ''));
	
		
		if ( kont > zak )
		{
			var days = Math.floor((total-kont)/(kont-zak));
			if ( days < 0 )
				days = 0;

			cells[2].innerHTML = '<table width="100%"><tr><td width="40%" style="color:red; font-weight:bold; text-align:right">'+ days.toString() + 
				'</td><td width="*" style="text-align:right">'  + cells[2].innerHTML + '</td></tr></table>';

		}
		var balans = zak - otgr;
		if (balans < 0)
			cells[1].innerHTML = cells[1].innerHTML + '<br/><font color="red">' + NumFormat( -balans ) + '</font>';
		else			
			cells[1].innerHTML = cells[1].innerHTML + '<br/><font color="green">' + NumFormat( balans ) + '</font>';

	});


}

var script = document.createElement("script");
script.textContent = '(' + run.toString() + ')();';
document.documentElement.appendChild(script);