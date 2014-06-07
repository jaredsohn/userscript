// ==UserScript==
// @name        data converter
// @namespace   *www.gems.slb.com*
// @include     *www.gems.slb.com*
// @require     http://code.jquery.com/jquery-1.7.2.min.js
// @require     http://www.zurb.com/playground/javascripts/plugins/jquery.textchange.min.js

// @version     1.1

// ==/UserScript==
console.log("begining, data_converter");

function check(name) {
	console.log('input[name="'+name+'"]');
	console.log("inside check function");
	$('input[name="'+name+'"]').removeAttr("readonly");
	console.log("readonly deleted");

	$('input[name="' + name + '"]').css('background', 'rgba(255, 0, 0, 0.2)');
	console.log("color chaged");
	
	$('input[name="' + name + '"]').bind('textchange', function (event, previousText) {
		console.log("bind catched");
		
		//	DD.MM.YYYY; DD,MM,YYYY; DD-MMM-YYYY
		var regexp = /(31|30|29|28|27|26|25|24|23|22|21|20|19|18|17|16|15|14|13|12|11|10|09|08|07|06|05|04|03|02|01|9|8|7|6|5|4|3|2|1)(\.|\,|\-)(12|11|10|09|08|07|06|05|04|03|02|01|9|8|7|6|5|4|3|2|1)(\.|\,|\-)(\d{4})/;
		console.log($('input[name="' + name + '"]').val().match(regexp) + ' - validation');
		
		
		if ($('input[name="' + name + '"]').val().match(regexp) !== null) {
			$('input[name="' + name + '"]').css('background', 'rgba(0, 255, 0, 0.2)');
			console.log('I see: '+$('input[name="' + name + '"]').val());
			var datainput = $('input[name="' + name + '"]').val().replace(/,/g,'\.').replace(/-/g,'\.');
			console.log('After replace: '+datainput);
			datainput = datainput.split(/\./);
			console.log('For Split: '+datainput);
			console.log("if is OK, "+datainput[1]);
			switch (datainput[1]) {
				case "1":
				case "01":
					datainput[1] = "Jan";
					break;
				case "2":
				case "02":
					datainput[1] = "Feb";
					break;
				case "3":
				case "03":
					datainput[1] = "Mar";
					break;
				case "4":
				case "04":
					datainput[1] = "Apr";
					break;
				case "5":
				case "05":
					datainput[1] = "May";
					break;
				case "6":
				case "06":
					datainput[1] = "Jun";
					break;
				case "7":
				case "07":
					datainput[1] = "Jul";
					break;
				case "8":
				case "08":
					datainput[1] = "Aug";
					break;
				case "9":
				case "09":
					datainput[1] = "Sep";
					break;
				case "10":
					datainput[1] = "Oct";
					break;
				case "11":
					datainput[1] = "Nov";
					break;
				case "12":
					datainput[1] = "Dec";
					break;
				default:
					datainput[1] = "Error";
					break;
			}
	 
			var result = datainput[1]+" "+datainput[0]+", "+datainput[2];
	
			console.log(result);
			$('input[name="' + name + '"]').val(result);
		} /*else { 
		$('input[name="' + name + '"]').css('background', 'rgba(255, 0, 0, 0.2)');
		}*/
		
		
		//    YYYY-MM-DD; YYYY,MM,DD; YYYY,MM,DD
		var regexp = /(\d{4})(\.|\,|\-)(12|11|10|09|08|07|06|05|04|03|02|01|9|8|7|6|5|4|3|2|1)(\.|\,|\-)(31|30|29|28|27|26|25|24|23|22|21|20|19|18|17|16|15|14|13|12|11|10|09|08|07|06|05|04|03|02|01|9|8|7|6|5|4|3|2|1)/;
		console.log($('input[name="' + name + '"]').val().match(regexp) + ' - validation');
		
		
		if ($('input[name="' + name + '"]').val().match(regexp) !== null) {
			$('input[name="' + name + '"]').css('background', 'rgba(0, 255, 0, 0.2)');
			console.log('I see: '+$('input[name="' + name + '"]').val());
			var datainput = $('input[name="' + name + '"]').val().replace(/,/g,'\.').replace(/-/g,'\.');
			console.log('After replace: '+datainput);
			datainput = datainput.split(/\./);
			console.log('For Split: '+datainput);
			console.log("if is OK, "+datainput[1]);
			switch (datainput[1]) {
				case "1":
				case "01":
					datainput[1] = "Jan";
					break;
				case "2":
				case "02":
					datainput[1] = "Feb";
					break;
				case "3":
				case "03":
					datainput[1] = "Mar";
					break;
				case "4":
				case "04":
					datainput[1] = "Apr";
					break;
				case "5":
				case "05":
					datainput[1] = "May";
					break;
				case "6":
				case "06":
					datainput[1] = "Jun";
					break;
				case "7":
				case "07":
					datainput[1] = "Jul";
					break;
				case "8":
				case "08":
					datainput[1] = "Aug";
					break;
				case "9":
				case "09":
					datainput[1] = "Sep";
					break;
				case "10":
					datainput[1] = "Oct";
					break;
				case "11":
					datainput[1] = "Nov";
					break;
				case "12":
					datainput[1] = "Dec";
					break;
				default:
					datainput[1] = "Error";
					break;
			}
	 
			var result = datainput[1]+" "+datainput[2]+", "+datainput[0];
	
			console.log(result);
			$('input[name="' + name + '"]').val(result);
		}
		
		//	DD-MMM-YYYY
		var regexp = /(31|30|29|28|27|26|25|24|23|22|21|20|19|18|17|16|15|14|13|12|11|10|09|08|07|06|05|04|03|02|01|9|8|7|6|5|4|3|2|1)\-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\-(\d{4})/;
		console.log($('input[name="' + name + '"]').val().match(regexp) + '- validation');
		
		
		if ($('input[name="' + name + '"]').val().match(regexp) !== null) {
			$('input[name="' + name + '"]').css('background', 'rgba(0, 255, 0, 0.2)');
			
			var datainput = $('input[name="' + name + '"]').val().split(/\-/);
				 
			var result = datainput[1]+" "+datainput[0]+", "+datainput[2];
	
			console.log(result);
			$('input[name="' + name + '"]').val(result);
		}
		
	});
}
console.log("Effectivity Date");
check("Effectivity Date");

console.log('Legacy Effectivity Date');
check('Legacy Effectivity Date');

console.log('Procurability Date');
check('Procurability Date');