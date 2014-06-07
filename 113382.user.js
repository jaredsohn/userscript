// ==UserScript==
// @name           No boosters
// @namespace      http://userscripts.org/users/
// @include        *chirto.*
// @include        chirto.*
// @include        *chirtostadium*
// @require		   http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// ==/UserScript==

var names = new Array('10110','5','6','10109','3','1','60','56','684','673','10002','10089','gb_black.png','gb_white.png','10001','10100','10102','10104','10103','10107','10106','vm4','vm1','vm2','vm3','401','402','403','10111','10112','2','4','10105','10108');

$(function(){
	setInterval(function(){
		if ($('#divmercadotiendas:visible')[0] != null){
			for (i=0; i < names.length; i++){
				if (names[i].indexOf('.png') == -1){
					var latabla=jQuery(jQuery('img[src$="img/tiendas/'+ names[i] +'.jpg"]').parents('table')[0]);
					if (latabla[0] != null)
						latabla.html('No lucho, no lo hagas').width(246).height(107).css('text-align', 'center');
				}
				else {
					var latabla=jQuery(jQuery('img[src$="img/tiendas/'+ names[i] +'"]').parents('table')[0]);
					if (latabla[0] != null)
						latabla.html('No lucho, no lo hagas').width(246).height(107).css('text-align', 'center');
				}
			}
		}
		}, 300
	);
});