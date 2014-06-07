// ==UserScript==
// @name           Virtonomica: Израсходовано расходников в МЦ и ресторанах
// @namespace      virtonomica
// @description    Помощник по закупкам в МЦ, русский реалм
// @include	   http://*virtonomic*.*/*/main/unit/view/*/supply
// @version        1.2
// ==/UserScript==

var run = function() 
{
	
	var tcolor = "green";
	var pos=100;

    	var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
    	$ = win.$;
	
	
	var a1=$('div.officePlace').text().trim().slice(0,11)
	var a2="Медицинский"  /*Русский реалм т.к. сравнение на русском языке*/
	var a3="Ресторан ко"  /*Русский реалм т.к. сравнение на русском языке*/

	if((a1 != a2) && (a1 != a3))return; // Выход если не МЦ и не ресторан

	var Murl=window.location.href.slice(0,-7);
 	$.get(Murl,function(data){

	pos = $('td.title:contains("Количество посетителей")',data).next().text().replace(' ', ''); //русский поиск
	pos = parseFloat(pos);
	afterLoad();
 
	})
	
	function afterLoad(){
	
	
 	$('table.list>tbody>tr>td>table>tbody tr:contains("клиента")').each(function(){   //русский поиск
	var ras = $( 'td:eq(1)', this ).prop('textContent');
	var text='<tr> <td nowrap="" style="color: '+tcolor+'">' +  'Израсходовано'+'</td>'+'<td align="right" nowrap="">'+ras*pos+' </td></tr> '

	$(text).insertBefore($(this));
 	})
	}
	

}

var script = document.createElement("script");
script.textContent = '(' + run.toString() + ')();';
document.documentElement.appendChild(script);
