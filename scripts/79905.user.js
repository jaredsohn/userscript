// ==UserScript==
// @name           MetVUW Chart Loader
// @namespace      http://userscripts.org/users/passcod
// @include        http://www.metvuw.com/forecast/forecast1.php?type=rain&region=ocean*
// @description    Loads all the charts, quickens navigation, and adds a lat-lon display.
// ==/UserScript==

// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://code.jquery.com/jquery-1.4.2.min.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
	if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();

// All your GM code must be inside this function
function letsJQuery() {
	$(function() {
		var imgorig = $("body > table:eq(3) > tbody > tr > td:eq(1) > img")
			.attr('id', 'meteo').attr('src');
		var numorig = imgorig.match(/\/([0-9]+)\//i)[1];
		var hrorig = imgorig.match(/([0-9]{2})\.gif$/i)[1];
		var url = "http://www.metvuw.com/forecast/__NUMORIG__/rain-ocean-__NUMORIG__-__HRORIG__.gif";
		var urlorig = url.replace(/__NUMORIG__/, numorig)
			.replace(/__NUMORIG__/, numorig)
			.replace(/__HRORIG__/, hrorig);
		
		$('body > table:eq(3)').attr('id', 'boite');
		$("body > *:not(table:eq(3))").remove();
		
		$('#boite').after('<div id="seaplane"></div>');
		
		$('#boite').each(function() {
			$(this).css('z-index', '100');
		});
		
		
		
		$('#meteo').data('hrnow', hrorig);
		
		$('#boite').before("<center><div id='buttons'></div></center>");
		$("#buttons").html("\
		<button id='b-first'>First</button>\
		<button id='b-m24'>-24</button>\
		<button id='b-m12'>-12</button>\
		<button id='b-m6'>-6</button>\
		<button id='b-p6'>+6</button>\
		<button id='b-p12'>+12</button>\
		<button id='b-p24'>+24</button>\
		<button id='b-last'>Last</button>\
		");
		
		$('#b-first').click(bFirst);
		$('#b-m24').click(bM24);
		$('#b-m12').click(bM12);
		$('#b-m6').click(bM6);
		$('#b-p6').click(bP6);
		$('#b-p12').click(bP12);
		$('#b-p24').click(bP24);
		$('#b-last').click(bLast);
		
		function bFirst() {
			var urlgo = url.replace(/__NUMORIG__/, numorig)
				.replace(/__NUMORIG__/, numorig)
				.replace(/__HRORIG__/, '06');
			
			$('#meteo').attr('src', urlgo).data('hrnow', '06');
		}
		
		function bM24() {
			var hrnow = parseInt( $('#meteo').data('hrnow') );
			
			if ( hrnow - 24 <= 6 ) {
				hrnow = '06';
			} else {
				hrnow = hrnow - 24;
			}
			
			var urlgo = url.replace(/__NUMORIG__/, numorig)
			.replace(/__NUMORIG__/, numorig)
			.replace(/__HRORIG__/, hrnow);
			
			$('#meteo').attr('src', urlgo).data('hrnow', hrnow);
		}
		
		function bM12() {
			var hrnow = parseInt( $('#meteo').data('hrnow') );
			
			if ( hrnow - 12 <= 6 ) {
				hrnow = '06';
			} else {
				hrnow = hrnow - 12;
			}
			
			var urlgo = url.replace(/__NUMORIG__/, numorig)
			.replace(/__NUMORIG__/, numorig)
			.replace(/__HRORIG__/, hrnow);
			
			$('#meteo').attr('src', urlgo).data('hrnow', hrnow);
		}
		
		function bM6() {
			var hrnow = parseInt( $('#meteo').data('hrnow') );
			
			if ( hrnow - 6 <= 6 ) {
				hrnow = '06';
			} else {
				hrnow = hrnow - 6;
			}
			
			var urlgo = url.replace(/__NUMORIG__/, numorig)
				.replace(/__NUMORIG__/, numorig)
				.replace(/__HRORIG__/, hrnow);
			
			$('#meteo').attr('src', urlgo).data('hrnow', hrnow);
		}
		
		function bP6() {
			var hrnow = parseInt( $('#meteo').data('hrnow') );
			
			if ( hrnow + 6 >= 180 ) {
				hrnow = 180;
			} else {
				hrnow = hrnow + 6;
			}
			
			var urlgo = url.replace(/__NUMORIG__/, numorig)
				.replace(/__NUMORIG__/, numorig)
				.replace(/__HRORIG__/, hrnow);
			
			$('#meteo').attr('src', urlgo).data('hrnow', hrnow);
		}
		
		function bP12() {
			var hrnow = parseInt( $('#meteo').data('hrnow') );
			
			if ( hrnow + 12 >= 180 ) {
				hrnow = 180;
			} else {
				hrnow = hrnow + 12;
			}
			
			var urlgo = url.replace(/__NUMORIG__/, numorig)
				.replace(/__NUMORIG__/, numorig)
				.replace(/__HRORIG__/, hrnow);
			
			$('#meteo').attr('src', urlgo).data('hrnow', hrnow);
		}
		
		function bP24() {
			var hrnow = parseInt( $('#meteo').data('hrnow') );
			
			if ( hrnow + 24 >= 180 ) {
				hrnow = 180;
			} else {
				hrnow = hrnow + 24;
			}
			
			var urlgo = url.replace(/__NUMORIG__/, numorig)
				.replace(/__NUMORIG__/, numorig)
				.replace(/__HRORIG__/, hrnow);
			
			$('#meteo').attr('src', urlgo).data('hrnow', hrnow);
		}
		
		function bLast() {
			var urlgo = url.replace(/__NUMORIG__/, numorig)
				.replace(/__NUMORIG__/, numorig)
				.replace(/__HRORIG__/, '180');
			
			$('#meteo').attr('src', urlgo).data('hrnow', 180);
		}
		
		var i = 180;
		while ( i >= 6 ) {
			j = i;
			if ( i == 6 ) { j = '06'; }
			
			var urlgo = url.replace(/__NUMORIG__/, numorig)
				.replace(/__NUMORIG__/, numorig)
				.replace(/__HRORIG__/, j);
			$.get(urlgo);
			
			i = i-6;
		}
		
		
		
		var x, y;
		x = $('#meteo').offset().left+73;
		y = $('#meteo').offset().top+112;
		
		$('#seaplane').css({
			position: 'absolute',
			top: y,
			left: x,
			'z-index': 50,
			width: 565,
			height: 415,
			'background-color': 'transparent'
		}).after('<center><div id="coords"></div></center>');
		
		$('#seaplane').mousemove(function(e) {
			var lon = Math.floor(e.pageX - $(this).offset().left);
			var lat = Math.floor(e.pageY - $(this).offset().top);
			
			var londeg = Math.floor( lon/15 ) + 156;
			var lonmin = Math.floor( (lon%15) / (15/60) );
			
			var latdeg = Math.floor( lat/15 ) + 14;
			var latmin = Math.floor( (lat%15) / (15/60) );
			
			var coor = 'Lon: '+londeg+'° '+lonmin+"' E"+', Lat: '+latdeg+'° '+latmin+"' S";
			
			$('#coords').text(coor);
		});
		
		$('#seaplane').after('<img id="seapoint" style="position: absolute; z-index: 40; left: 0; top: 0;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAANCAYAAABLjFUnAAAABGdBTUEAALGPC/xhBQAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjEwcrIlkgAAAHxJREFUOE9j/P//PwPVAMgwamGqGQT2IbVcRZRh2RbW/zOUlf/nGxoD1eMPErwuKxAW/v8Y5HggfgvE3ezseA3Ea9gSRka4QSADT4NDBbfr8BpWysv7/w3UZV+A9BQWFvINA7kCFF4gXKKiSlmYEQpwdHn6Jg1SXEdVlwEACCeTdyRPNssAAAAASUVORK5CYII="/>');
		
		$('#seaplane').click(function(e) {
			$('#seapoint').css({
				top: e.pageY-7,
				left: e.pageX-10
			});
		});
		
		$('#coords').after("\
		<br /><center id='placepoint'>\
			Lon: <input type='text' style='width: 30px; color: white; background: transparent; border: 1px white solid;' value='156' id='in_londeg' />° \
			<input type='text' style='width: 30px; color: white; background: transparent; border: 1px white solid;' value='0' id='in_lonmin' />', \
			Lat: <input type='text' style='width: 30px; color: white; background: transparent; border: 1px white solid;' value='14' id='in_latdeg' />° \
			<input type='text' style='width: 30px; color: white; background: transparent; border: 1px white solid;' value='0' id='in_latmin' />' \
		</center>\
		");
		
		$('#placepoint > input').keyup(function(e) {
			if( e.keyCode == 13 ) {
				var in_londeg = $('#in_londeg').val();
				var in_lonmin = $('#in_lonmin').val();
				var in_latdeg = $('#in_latdeg').val();
				var in_latmin = $('#in_latmin').val();
				
				var X = (in_londeg - 156) * 15 + in_lonmin / 60 + $('#seaplane').offset().left-10;
				var Y = (in_latdeg - 14) * 15 + in_latmin / 60 + $('#seaplane').offset().top-7;
				
				$('#seapoint').css({
					top: Y,
					left: X
				});
			}
		});
	});
}