// ==UserScript==
// @name		[DS] Save Attack معرب 
// @namespace		agrafix.net
// @description		سكربت في نقطه التجمع مهمته حفظ القوات التي تريد الهجوم بها اكثر من مره
// @include		http://de*.die-staemme.de/game.php*screen=place*
// @include		http://ae*.tribalwars.ae/game.php*screen=place*
// ==/UserScript==


// @version 1.0

var $ = unsafeWindow.jQuery;

(function(){
	
	var UnitInputs = $('.unitsInput');
	
	var ImgPath = '/graphic/unit/unit_';
	
	function savedUnitsStr() {
		var savedUnits = ' » ضع القوات(';
		$.each(UnitInputs, function(idx, itm) { 
			var el = $(itm);
			var id = el.attr("id");
			var amount = loadSetting('siu_' + id);
			
			if (amount != 'undefined' && amount > 0) {
				savedUnits += amount + " <img src='" + ImgPath + id.replace("unit_input_", "") + ".png' alt='"+id+"' /> ";
			}
		});
		
		savedUnits += ")";
		
		return savedUnits;
	}
	
	$("<a href='javascript:;' id='saveInsertedUnits' />").text(" » حفظ القوات المطلوبه").click(function() {
		$.each(UnitInputs, function(idx, itm) { 
		
			var el = $(itm);
			var id = el.attr("id");
			
			saveSetting('siu_' + id, el.val());
		});
		
		$('#loadInsertedUnits').html(savedUnitsStr());
	}).insertAfter("#units_form");
	
	
	
	$("<a href='javascript:;' id='loadInsertedUnits' />").html(savedUnitsStr()).click(function() {
		$.each(UnitInputs, function(idx, itm) { 
			var el = $(itm);
		
			var id = el.attr("id");
			var amount = loadSetting('siu_' + id);
		
			el.val(amount);
		});
	}).insertAfter("#saveInsertedUnits");
	
	
	
})();

//
// Use cookies.
// based on PPK: http://www.quirksmode.org/js/cookies.html
//

function saveSetting(k, v) {
	var days = 30;

	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else {
		var expires = "";
	}
	
	window.document.cookie = k + "=" + v + expires + "; path=/";
}

function loadSetting(k) {
	var nameEQ = k + "=";
	var ca = window.document.cookie.split(';');
	for( var i=0; i < ca.length; i++) {
		var c = ca[i];
		while ( c.charAt(0)==' ' ) {
			c = c.substring(1,c.length);
		}
		if ( c.indexOf(nameEQ) == 0 ) {
			return c.substring(nameEQ.length,c.length);
		}
	}
	return null;

}
