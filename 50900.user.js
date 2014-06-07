// ==UserScript==
// @name          Wikipedia Backbars
// @namespace     http://elzr.com
// @description   Add backbars to Wikipedia tables.
// @include       http://en.wikipedia.org/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// @author        Eliazar Parra elzr.com
// ==/UserScript==
//
// For detailed info and screenshots see http://elzr.com/posts/wikipedia-backbars

$(document).ready(function() {
	//helpers
	function massage(text) {
		var toR = '';
		var multi;
		if(text.match(/[a-z]\d/i)) 
			return 'NaN';
		toR = text.replace(/<a[^>]*>(.*?)<\/a>/g,'$1'). //unlink
					replace(/<[^>]*>/g,''). //untag
					replace(/\[[^\]]*\]/g,''). // []
					replace(/\([^\(]*\)/g,''). // ()
					replace(/,/g,'').
					replace(/\s/g,'').
					replace(/^[^\d]*?(\-?[\d\.\×x]+)[^\d]*?$/,'$1');
		if(multi = toR.match(/([\d\.]+)[\×x]([\d\.]+)/)) 
			toR = (parseFloat(multi[1])*parseFloat(multi[2]))+'';
		if(toR.match(/[^\d\.\-]/)) 
			return 'NaN';
		return toR;
	}
	function isWorld(col) {
		var toR = false;
		col.numbers[0][1].parent().children().filter('td').each(function() {
			if($(this).html().match(/\/wiki\/World/)) {
				toR = true;
				}
		});
		return toR;
	}

	//real action
	var ntds = []; //(possibly) numeric tds
	$('table.wikitable').each(function() {
		var l = $(this).find('tr').length;
		var indexes = [];
		for(var i=1; i<Math.min(5,l); i++) { //check first 4 trs for numberic tds
			$($(this).find('tr')[i]).each(function() {
				var tds = $(this).children().filter('td');
				tds.each(function() {
					var index = tds.index($(this));
					if( (indexes.indexOf(index)==-1) && $(this).text().match(/\d/) ) {
						ntds=ntds.concat([{table:$($(this).parents('table')[0]), ntd:$(this), index:index, width:$(this).innerWidth()}]);
						indexes=indexes.concat([index]);
					}
				})
			});
		};
		console.log(indexes);
	});
	
	function backbars() {
		$('#backbars').html('loading...');
		$(ntds).each(function() {
			var col = this; //column
			col.sum = 0;

			col.numbers = [];
			col.table.find('tr').each(function() {
				var ntd = $($(this).children().filter('td')[col.index]); //(possibly) numeric td
				var n = parseFloat(massage(ntd.text()));

				if( !isNaN(n) ) {
					col.numbers=col.numbers.concat([[n, ntd]]);
					col.sum += n;
				}
			});

			for(var i=1; i<col.numbers.length; i++) {
				if(col.numbers[0][0]!=col.numbers[i][0]) {
					col.notSame = true;
					i=col.numbers.length;
				}
			}; if(!col.notSame) return;

			col.numbers.sort(function(a,b){return b[0]-a[0]});

			col.min = col.numbers[col.numbers.length-1][0];
			col.max = col.numbers[0][0];
			col.absMax = Math.abs(col.max < 0 ? col.min : col.max);

			if(Math.abs(Math.abs(col.max) - Math.abs(col.min)) < Math.abs(col.max)*.1) col.narrowRange = true;
			else {
				if(((col.numbers.length > 3) || (col.sum > 6)) && //don't detect 1, 2, 3
					( (Math.abs(Math.abs(col.sum) - 2*col.absMax) < col.absMax*.05) ||
					isWorld(col) ) ){ //.05 = rounding error

					col.totalIncluded = true;
					if(col.max > 0) 
						col.absMax = col.max = col.numbers[1][0];
					else
						col.absMax = col.min = col.numbers[col.numbers.length-2][0];
				}
			}

			$(col.numbers).each(function() {
				var n = this[0], cell = this[1];
				var adjustment = 499;
				var signedMax = col.max;

				if( !isNaN(n) ) {
					if(n < 0) {
						adjustment = -col.width;
						signedMax = col.min;
					}
					if(col.narrowRange) {
						signedMax = Math.abs(Math.abs(col.max) - Math.abs(col.min));
						n = signedMax - (col.max-n);
					}
					cell.css('background-image','url(http://elzr.com/images/else/backbar-'+
						(col.totalIncluded && ((n>col.max) || (n<col.min)) ? (n >= 0 ? 'bbb' : 'b9a0a0') : (n >= 0 ? 'ddd' : 'dcc3c3'))+
						'.gif)');
					cell.css('background-repeat','no-repeat');
					cell.css('background-position', (col.totalIncluded && ((n>col.max) || (n<col.min)) ? 0 : Math.ceil(-adjustment + n*col.width/Math.abs(signedMax)))+'px 0');
				}
			});
		});
		$('#backbars').remove();
	};

	if(ntds.length>0) {
		$('.pBody ul').append('<li id="backbars" style="padding:0 10px; font-weight:bold; cursor:pointer" title="May take a while...">backbars</li>');
		$('#backbars').click(backbars);
	}
});
	
