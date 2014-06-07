// ==UserScript==
// @name           Swedbank bokföringsförenkling
// @require		   http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @namespace      se.swedbank.internetbank.bokforingstransaktioner
// @include		   https://*.swedbank.se*
// @description    Bokföring, Räknar ut moms och ändrar raden så att uppgifterna lättarer går att läsa ut när man klickar på dem.
// @version        1.0
// @author         Andreas Säterås
// ==/UserScript==

(function()
{
	$('<th class="tabell-huvud" style="text-align:right;">Moms</th>').insertBefore($(".sektion-innehall2 tr th:nth-child(7)"));
	$('<td class="tabell-cell" style="text-align:right;">0</td>').insertBefore($(".sektion-innehall2 tr td:nth-child(7)"));
	
	$.each($(".sektion-innehall2 tr td:nth-child(6)"),function(index,value) {
		var text = $(value).text();
		var oldValue = text.replace(/[^\d\.]/g,'');
		var roundedValue = Math.round(oldValue/100);
		$(value).text(roundedValue).attr('title',text);
		var moms = roundedValue*0.2;
		
		$(value).next().text(Math.round(moms));
	
	});
	
	$(".sektion-innehall2 tr").click(function(){ 
		
		
		var trs = $(this).parent().find('tr');
		trs.css('background-color','transparent');
		
		trs.find('td').css('color','black');
		trs.find('td').css('font-weight','normal');
		
		var c = $(this).css('background-color');

		if(c == "transparent")
		{
			$(this).find('td').css('font-weight','bold');
			$(this).find('td').css('color','red');
			
			$(this).find('td:nth-child(1),td:nth-child(3),td:nth-child(8)').css('color','#FFFF66');
			$(this).css('background-color','#FFFF66');
		}
		else
		{
			$(this).css('background-color','transparent');		
		}
	});

})();
