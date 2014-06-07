// ==UserScript==
// @name           Virtonomica: Апгрейд оборудования new
// @namespace      virtonomica
// @description    Помощник по апгрейду оборудования
// @version        2.0
// @include        http://*virtonomic*.*/*/window/unit/equipment/*
// ==/UserScript==

var run = function() 
{

	var total; // всего установлено оборудования
	var cQ;    // текущее качество
	var rQ;    // требуемое качество
	var min = 1000000000;
	var minname;
	var minneed;
	var mincell;
	var notfarm=1;
	var notsu=1;



    	var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
    	$ = win.$;

	// проверка
	$( 'img[src="/img/unit_types/animalfarm.gif"]' ).each( function( ) // это животноводческая ферма
	{
		// таки да
		notfarm = 0;
	});

	$( 'img[src="/img/unit_types/restaurant.gif"]' ).each( function( ) // это ресторан
	{
		// таки да
		notsu = 0;
	});

	$( 'img[src="/img/unit_types/medicine.gif"]' ).each( function( ) // это МЦ
	{
		// таки да
		notsu = 0;
	});
	$( 'img[src="/img/unit_types/service_light.gif"]' ).each( function( ) // это СУ
	{
		// таки да
		notsu = 0;
	});

//	if ( !notfarm ) return; // возврат для исключения животноводческих ферм
	
	var firsttext=$('div.header h3').text()
	
	var newbut = document.createElement('div')
	newbut.innerHTML = "Апгрейд до кача: "
	newbut.setAttribute('class','header_up') 
	var newinput = document.createElement('input')
	newinput.setAttribute('type','text') 
	newinput.setAttribute('value','') 
	newinput.setAttribute('style','width:34px') 
	newinput.setAttribute('id','header_inp') 
	var newbut2 = document.createElement('button')
	newbut2.innerHTML = "Расчитать"
	newbut2.setAttribute('id','header_but') 
	var newinp = $( 'div.content') 
	newinp.prepend(newbut)
	newinp = $( 'div.header_up')
	newinp.append(newinput)
	newinp.append(newbut2)
	
	$('#header_but').css('cursor', 'pointer').click(function() 
	  {
	    var tQ= parseFloat($( '#header_inp' ).prop('value'))
	    if (isNaN(tQ)) tQ = 0
	      print_text ('');
	    if (tQ <= cQ ) 
	      {
		print_text (' --> <font color="red"> Запрашиваемое качество ниже текущего</font>');
		return;
	      }
	    print_text (' --> <font color="red"> Вариантов нет</font>');
	    get_var (tQ);

	  })



    	$( 'div.recommended_quality' ).each( function( ) 
	{
        	var spans = $( 'span', this );
		cQ = parseFloat( $( spans[0] ).text() );					// текущее качество
		rQ = parseFloat( $( spans[1] ).text() ) + 0.01;					// требуемое качество
		total = parseInt( $( spans[2] ).text().replace(' ', '').replace(' ', '') ); 	// всего установлено оборудования  
		if ( !notsu||!notfarm ) total = parseInt( $( spans[1] ).text().replace(' ', '').replace(' ', '') ); 
					    
    	});
	if ( !notsu||!notfarm ) rQ=cQ; // корректировка начальных данных для жив. ферм и СУ

	
	get_var (rQ)
	
//------------------------------------------------------------------------------------------------------------------------------------ 	
	
	function get_var (qQ) {
	
	if (qQ <= cQ ) 
	  {
	    print_text (' --> <font color="red"> Вариантов нет или апгрейд не требуется</font>');
	    return;
	  }
	get_nul () // очищаем изменения при повторном расчете
	  
	min=1000000000

    	$( '#mainTable tr[class]' ).each( function() 
	{
        	if ($( this ).attr( 'id' )[0] != 'r') return;

        	var cells = $( 'td', this );
		var offer = parseInt( $(cells[2]).text().trim().replace( ' ', '' ).replace(' ', '') ); 
	        var price = parseFloat( $( cells[6] ).text().replace(' ', '' ).replace(' ', '') );
        	var qual = parseFloat( $( cells[7] ).text() );

	        if ( isNaN(price) || isNaN(qual) ) return;
        	if ( qual < qQ ) return;

  		var need = Math.ceil( total * ( qQ - cQ )/( qual - cQ ) );

		if ( offer < need ) return;

		var cost = Math.round( need * price );

		if ( cost < min )
		{
			min = cost;
			minname = $( cells[0] ).text();
			mincell = cells[0];
			minneed = need;
		}
	
        	cells[0].innerHTML = cells[0].innerHTML + '<div class=upgrade style="color: grey"><nobr>' + 
			NumFormat( need ) + ' (' +  NumFormat( cost ) + '$)</nobr></div>';
    	});

	if ( min < 1000000000 )
	{
		mincell.innerHTML = '<img src="/img/supplier_add.gif"> '  + mincell.innerHTML;
		print_text (' --> <font color="green">' + minname + ' --> ' + NumFormat( minneed ) + 'шт (' +  NumFormat( min ) + '$)</font>');
	}
	}
	
//------------------------------------------------------------------------------------------------------------------------------------ 		
	function get_nul () 
	{
	 $( 'div.upgrade').each( function ()
	 { 
	   $( this).detach()	// удаляем данные предыдущего расчета
	 })
	 $( 'td.text_to_left > img').each( function ()
	 { 
	   $( this).detach()	// удаляем машинку из предыдущего расчета
	 })
	}
//------------------------------------------------------------------------------------------------------------------------------------ 		
	function print_text (ttext) {
	  $( 'div.header h3').each( function()
		{
			this.innerHTML = firsttext + ttext;
		});
	}
//------------------------------------------------------------------------------------------------------------------------------------ 	
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


}

var script = document.createElement("script");
script.textContent = '(' + run.toString() + ')();';
document.documentElement.appendChild(script);
