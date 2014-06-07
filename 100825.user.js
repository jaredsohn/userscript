// ==UserScript==
// @name           Virtonomica: Апгрейд оборудования
// @namespace      virtonomica
// @description    Помощник по апгрейду оборудования
// @include        http://*virtonomic*.*/*/window/unit/equipment/*
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


	var total; // всего установлено оборудования
	var cQ;    // текущее качество
	var rQ;    // требуемое качество
	var min = 1000000000;
	var minname;
	var minneed;
	var mincell;
	var notfarm;



    	var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
    	$ = win.$;

	// проверка, что это не животноводческая ферма
	notfarm = 1;
	$( 'img[src="/img/unit_types/animalfarm.gif"]' ).each( function( ) 
	{
		// таки да
		notfarm = 0;
	});

	if ( !notfarm ) return;

    	$( 'div.recommended_quality' ).each( function( ) 
	{
        	var spans = $( 'span', this );
		cQ = parseFloat( $( spans[0] ).text() );
		rQ = parseFloat( $( spans[1] ).text() ) + 0.01;
		total = parseInt( $( spans[2] ).text().replace(' ', '').replace(' ', '') );    

    	});


	if (rQ <= cQ ) return;

    	$( '#mainTable tr' ).each( function() 
	{
        	if ($( this ).attr( 'id' )[0] != 'r') return;

        	var cells = $( 'td', this );
		var offer = parseInt( $(cells[2]).text().trim().replace( ' ', '' ).replace(' ', '') ); 
	        var price = parseFloat( $( cells[6] ).text().replace(' ', '' ).replace(' ', '') );
        	var qual = parseFloat( $( cells[7] ).text() );

	        if ( isNaN(price) || isNaN(qual) ) return;
        	if ( qual < rQ ) return;

  		var need = Math.ceil( total * ( rQ - cQ )/( qual - cQ ) );

		if ( offer < need )
			return;

		var cost = Math.round( need * price );

		if ( cost < min )
		{
			min = cost;
			minname = $( cells[0] ).text();
			mincell = cells[0];
			minneed = need;
		}
	
        	cells[0].innerHTML = cells[0].innerHTML + '<div style="color: grey"><nobr>' + 
			NumFormat( need ) + ' (' +  NumFormat( cost ) + '$)</nobr></div>';
    	});

	if ( min < 1000000000 )
	{
		mincell.innerHTML = '<img src="/img/supplier_add.gif"> '  + mincell.innerHTML;
		$( 'div.header h3').each( function()
		{
			this.innerHTML = this.innerHTML + ' --> <font color="green">' + minname + ' --> ' + NumFormat( minneed ) + 'шт (' +  NumFormat( min ) + '$)</font>';
		});
	}
}

var script = document.createElement("script");
script.textContent = '(' + run.toString() + ')();';
document.documentElement.appendChild(script);
