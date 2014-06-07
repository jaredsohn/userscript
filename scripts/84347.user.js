// ==UserScript==
// @name           Procent zapełnienia magazynu
// @author         Wszechmogący
// @version        1.0
// @include        http://*.grepolis.*/game*
// @description    Skrypt pokazujący procentowe zapełnienie magazynu.
// ==/UserScript== 
 
(function () {
	var uW;
	if (typeof unsafeWindow === 'object'){
		uW = unsafeWindow;
	} else {
		uW = window;
	}
	var $ = uW.jQuery;

	var grepoPercent = (function () {
		
		var SCRIPTNAME = 'grepoPercent';
		var SCRIPTID = 66303;
		var SCRIPTVERSION = 0.1;
		
		var storage;
		var res = ['wood', 'stone', 'iron', 'favor'];
		
		var initStyle = function () {
				var style = [];
				style.push('div#box #main_area .tilx_percent {position:absolute;top:3px;left:12px; width:40px;height:29px; background:rgba(30, 30, 30, 0.7); font-size:11px;text-align:center;line-height:29px;}');
				style.push('div#box #main_area #favor .tilx_percent {padding-right:10px;}');
				style.push('.res_plenty,.res_rare {position:relative;z-index:1;}');
				$('<style type="text/css">' + style.join("\n") + '</style>').appendTo('head');
		}
		
		var calcColor =  function (p) {
			var r, g, b = '44';
			r = Number(Math.round(p / 100 * 255)).toString(16);
			if(r.length == 1) {
				r = '0' + r;
			}
			g = Number(Math.round((100 - p) / 100 * 255)).toString(16);
			if(g.length == 1) {
				g = '0' + g;
			}
			return '#' + r + g + b;
		};
		
		var calc = function () {
			$.each(res, function () {
				var p;
				if(this == 'favor'){
					p = Math.round((parseInt($('#' + this + '_text').text(), 10) / 500) * 100);
				} else {
					p = Math.round((parseInt($('#' + this + '_count').text(), 10) / storage) * 100);
				}
				$('#' + this + ' .tilx_percent')
					.text(p + '%')
					.css('color', calcColor(p));
				;
			});
			
			window.setTimeout(calc, 100);
		};
		
		return function () {
			initStyle();
			
			storage = parseInt($('a#storage').text(), 10);
			
			$.each(res, function () {
				$('a#' + this).prepend('<div class="tilx_percent">');
			});
			
			calc();
		};
	}());
	
	grepoPercent();
}());