// ==UserScript==
// @name           Virtonomica: Сумма по облигациям своим и чужим
// @namespace      virtonomica
// @description    Расчет суммы
// @version        1.0
// @include        http://*virtonomic*.*/*/main/company/bonds/*/issued
// @include        http://*virtonomic*.*/*/main/company/bonds/*/purchased
// @include        http://*virtonomic*.*/*/main/bonds/market/*
// ==/UserScript==

var run = function() 
{


    	var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
    	$ = win.$;

	  $( '.odd,.even').each( function()
		{
		   var urlo=(location.href).slice(-3)
		   if (urlo=="ued") //страница чужих облигаций
		    {
		      var qualo=$(this).find('td:eq(3)').text().replace( ' ', '' ).replace( ' ', '' )
		      var priceo=$(this).find('td:eq(2)').find('span:eq(0)').text().replace( '.', ',' ).replace( ' ', '' ).replace( ' ', '' ).replace( ' ', '' ).replace( ' ', '' )
		      qualo=parseInt(qualo)
		      priceo=parseFloat(priceo)
		      var sumo=qualo*priceo
		      sumo=NumFormat(sumo)
		      $(this).find('td:eq(3)').append('<br/><span style="COLOR: magenta;"><b>'+sumo+'$</b></span>') 
		     }
		   else if (urlo=="sed") //страница своих облигаций
		    {
		      var qualo=$(this).find('td:eq(5)').text().replace( ' ', '' ).replace( ' ', '' )
		      var priceo=$(this).find('td:eq(4)').find('span:eq(0)').text().replace( '.', ',' ).replace( ' ', '' ).replace( ' ', '' ).replace( ' ', '' ).replace( ' ', '' )
		      qualo=parseInt(qualo)
		      priceo=parseFloat(priceo)
		      var sumo=qualo*priceo
		      sumo=NumFormat(sumo)
		      $(this).find('td:eq(5)').append('<br/><span style="COLOR: magenta;"><b>'+sumo+'$</b></span>') 
		     }
		});

	  $( '.hand').each( function()
		{
		      var qualo=$(this).find('td:eq(5)').text().replace( ' ', '' ).replace( ' ', '' )
		      var priceo=$(this).find('td:eq(4)').find('span:eq(0)').text().replace( '.', ',' ).replace( ' ', '' ).replace( ' ', '' ).replace( ' ', '' ).replace( ' ', '' )
		      qualo=parseInt(qualo)
		      priceo=parseFloat(priceo)
		      var sumo=qualo*priceo
		      sumo=NumFormat(sumo)
		      $(this).find('td:eq(5)').append('<br/><span style="COLOR: magenta;"><b>'+sumo+'$</b></span>') 
		});
//------------------------------------------------------------------------------------------------------------------------------------ 	
	function NumFormat( N ) // форматирование в удобочитаемые числа(с пробелами в разрядах)
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
