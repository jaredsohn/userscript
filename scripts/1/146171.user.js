// ==UserScript==
// @name        Craigslist Date Search
// @namespace   http://jobson.us
// @include     http://*.craigslist.org/*
// @require     https://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @version     1.0
// @license     http://creativecommons.org/licenses/by-nc-sa/3.0/
// ==/UserScript==

var clss = {
	init: function() {
		if ($('table#searchtable').length === 0) return;
		if (/\/(cta|cto|ctd|mca|mcy|mcd|rva|rvs|rvd)(\/|\?)/.test(window.location.href)) {
			clss.addYearSelector();
		}
		
		
	},
	addYearSelector: function() {
		
		$($('table#searchtable td')[1]).attr('colspan','4');
		$($('table#searchtable td')[5]).before('<td align="right">years:</td><td><select id="yearSelector"></select></td>');
		
		$('#yearSelector').mousedown(function() {
		
			if ($(this).attr('multiple') == false) {
				
				$('#yearSelector').attr('multiple','multiple');
				$('#yearSelector').attr('size','5');
				$('#yearSelector option').each(function() {
					$(this).removeAttr('selected');
				});
			}
		});
		$('#yearSelector').css('width','100px');
		
		
		$('#yearSelector option').live('mouseup',function() {
				var dates = [];
	
				var q = $('#query').attr('value');
				q = q.replace(/ \*\*\(.*?\)\*\*/,'');
				
				$('option.yrRange').each(function() {
					if($(this).attr('selected')) {
						var yr = parseInt($(this).attr('value'),10);
						for (i=0;i<10;i++) {
							dates.push(i+yr);
						}
					}
				});
				
				if (dates.length>0) {
					q = q + ' **('+ dates.join('|') +')**';
				}
				
				$('#query').attr('value',q);

		});
		
		var cnt = Math.floor(new Date().getFullYear()/10)-190+1;
		
		for (i=0;i<cnt;i++) {
			var yr = (1900 + (i*10));
			
			$('#yearSelector').append('<option class="yrRange" value="'+ yr +'">' + yr + "'s" + '</option>');
			
		}
		
	}
}

clss.init();

