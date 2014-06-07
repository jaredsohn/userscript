// ==UserScript==
// @name           Virtonomica:Итого в отчете по подразделениям
// @namespace      virtonomica
// @description    Итоговая строка в отчете по подразделениям
// @include	   http://*virtonomic*.*/*/main/company/view/*/finance_report/by_units*
// @version        1.2
// ==/UserScript==

var run = function() 
{

	var tt1="- - - - -";
	var tt2="- - - - -";
	var tt3="- - - - -";
	var tt4="Количество подразделений =";
	var tt5="Доходы";
	var tt6="Расходы";
	var tt7="Налоги";
	var tt8="Прибыль";
	var tt9="Рентабельность";
	var sumtt5=0;
	var sumtt6=0;
	var sumtt7=0;
	var numrow=0;
	var ttt1="";			  
	var ttt2="";			  
	var ttt3="";

    	var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
    	$ = win.$;
	
    	$( '#mainContent tr[class]' ).each( function() 
	{

	  var cells = $( 'td', this );
	  tt1 = $( cells[0] ).text();
	  tt2 = $( cells[1] ).text();
	  tt3 = $( cells[2] ).text();
	  if (numrow==0) {
	    ttt1=tt1;			  
	    ttt2=tt2;			  
	    ttt3=tt3;
	    }

	  if (numrow>0 && tt1!=ttt1) ttt1="- - - - -";
	  if (numrow>0 && tt2!=ttt2) ttt2="- - - - -";
	  if (numrow>0 && tt3!=ttt3) ttt3="- - - - -";
					    

//	  tt4 = $( cells[3] ).text();

	  sumtt5 = sumtt5+parseFloat( $( cells[4] ).text().replace(' ', '' ).replace(' ', '').replace(' ', '') );
	  sumtt6 = sumtt6+parseFloat( $( cells[5] ).text().replace(' ', '' ).replace(' ', '').replace(' ', '') );
	  sumtt7 = sumtt7+parseFloat( $( cells[6] ).text().replace(' ', '' ).replace(' ', '').replace(' ', '') );
	  numrow=numrow+1;

    	});
	
	sumtt8 = sumtt5-sumtt6-sumtt7;
	sumtt9 = Math.round((sumtt8+sumtt7)/sumtt6*10000)/100;
	var tclass ="nowrap"
	if (sumtt8<0) tclass="moneySmallerZero"
	tt4=tt4 + numrow;


	var text="<tr style='background: #EEFACA'> <td style='font-size:14px'>"+"Итого :"+"</td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> </tr> <tr style='background: #EEFACA'> <td>"+ttt1+"</td> <td>"+ttt2+"</td> <td>"+ttt3+"</td> <td>"+tt4+"</td>  <td align=\"right\" class=\"nowrap\">"+edit_summ(sumtt5)+"$</td> <td align=\"right\" class=\"nowrap\">"+edit_summ(sumtt6)+"$</td> <td align=\"right\" class=\"nowrap\">"+edit_summ(sumtt7)+"$</td>     <td align=\"right\" class=\"nowrap\">"+" <span class=\""+tclass+"\">" + edit_summ(sumtt8)+"</span> "+"$</td>  <td align=\"right\" class=\"nowrap\">"+edit_summ(sumtt9)+"%</td> </tr>"
	
	$(text).insertBefore($('table.grid>tbody>tr:last'));
	
	function edit_summ(pr) {			//Вставка пробела-разделителя в числа
	  var es=pr.toFixed(2)
	  var ls = es.length
	  if( ls<7 ) return es
	  es = es.substring(0,(ls-6)) + " " + es.slice(-6) // вставка пробела в тысячах
	  if( ls<10 ) return es
	  es = es.substring(0,(ls-9)) + " " + es.slice(-10) // вставка пробела в лямах
	  if( ls<13 ) return es
	  es = es.substring(0,(ls-12)) + " " + es.slice(-14) // вставка пробела в ярдах
	 // alert (es)
	  return es
	 }
	
/*	$( 'div.#mainContent table.grid').each( function()
	  {
			this.innerHTML =  this.innerHTML  + text;
	   });
*/
}

var script = document.createElement("script");
script.textContent = '(' + run.toString() + ')();';
document.documentElement.appendChild(script);
