// ==UserScript==
// @name           Axfood moms adder
// @require		   http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @namespace      se.narlivs.kopkop
// @include		   http://*.narlivs.se*
// @description    Räknar ut 12% moms på närlivs varor 
// @version        1.0
// @author         Copy and paste by Erik Johansson
// ==/UserScript==


$.each($(".width_e"),function(index,value) {
    $.each($(value).children(),function(index,value){

	text=$(value).text();
		var text = $(value).text();
	text.replace(/,/, '.');
	var oldValue = text.replace(/,/,".").replace(/[^\d\.,]/g,'');
	var roundedValue = Math.round(oldValue/100);
	var moms = oldValue*1.12;
		
	$(value).text($(value).text() + " mé moms: " +  moms);	

}
);
	
	});