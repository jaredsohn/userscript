// ==UserScript==
// @name           Imgur Stats
// @namespace      http://justinpoliey.com/userscripts
// @description    Adds a small overlay to imgur images showing statistics
// @include        *
// ==/UserScript==

var imgurs = document.evaluate(
	"//img[starts-with(@src, 'http://imgur.com')]|//img[starts-with(@src, 'http://i.imgur.com')]",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);

function number_format(number, decimals, dec_point, thousands_sep) {
    // http://kevin.vanzonneveld.net
    // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +     bugfix by: Michael White (http://getsprink.com)
    // +     bugfix by: Benjamin Lupton
    // +     bugfix by: Allan Jensen (http://www.winternet.no)
    // +    revised by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // +     bugfix by: Howard Yeend
    // +    revised by: Luke Smith (http://lucassmith.name)
    // +     bugfix by: Diogo Resende
    // +     bugfix by: Rival
    // +      input by: Kheang Hok Chin (http://www.distantia.ca/)
    // +   improved by: davook
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +      input by: Jay Klehr
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +      input by: Amir Habibi (http://www.residence-mixte.com/)
    // +     bugfix by: Brett Zamir (http://brett-zamir.me)
    // +   improved by: Theriault
    // *     example 1: number_format(1234.56);
    // *     returns 1: '1,235'
    // *     example 2: number_format(1234.56, 2, ',', ' ');
    // *     returns 2: '1 234,56'
    // *     example 3: number_format(1234.5678, 2, '.', '');
    // *     returns 3: '1234.57'
    // *     example 4: number_format(67, 2, ',', '.');
    // *     returns 4: '67,00'
    // *     example 5: number_format(1000);
    // *     returns 5: '1,000'
    // *     example 6: number_format(67.311, 2);
    // *     returns 6: '67.31'
    // *     example 7: number_format(1000.55, 1);
    // *     returns 7: '1,000.6'
    // *     example 8: number_format(67000, 5, ',', '.');
    // *     returns 8: '67.000,00000'
    // *     example 9: number_format(0.9, 0);
    // *     returns 9: '1'
    // *    example 10: number_format('1.20', 2);
    // *    returns 10: '1.20'
    // *    example 11: number_format('1.20', 4);
    // *    returns 11: '1.2000'
    // *    example 12: number_format('1.2000', 3);
    // *    returns 12: '1.200'
    var n = !isFinite(+number) ? 0 : +number, 
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function (n, prec) {
            var k = Math.pow(10, prec);
            return '' + Math.round(n * k) / k;
        };
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
}

function format_bytes(bytes) {
	var units = ['B', 'KB', 'MB', 'GB', 'TB'];
	bytes = Math.max(bytes, 0);
	var pow = Math.floor((bytes ? Math.log(bytes) : 0) / Math.log(1024));
	pow = Math.min(pow, units.length - 1);
	bytes /= Math.pow(1024, pow);
	return bytes.toFixed(2) + ' ' + units[pow];
}

function addOverlay(imgur, hash) {
	GM_xmlhttpRequest({
		method: 'GET',
		'url': 'http://imgur.com/api/stats/'+hash+'.json',
		'headers': {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'application/json,text/json'
		},
		onload: function(response_details) {
			var data = JSON.parse(response_details.responseText);
			if (data['stats']) {
				var overlay = document.createElement('div');
				imgur.parentNode.insertBefore(overlay, imgur);
				overlay.style.position = 'absolute';
				overlay.style.display = 'inline';
				overlay.style.top = imgur.style.top;
				overlay.style.left = imgur.style.left;
				overlay.style.backgroundColor = '#333333';
				overlay.style.color = '#ffffff';
				overlay.style.padding = '4px';
				overlay.style.opacity = '0.5';
				overlay.innerHTML = 'Views: '+number_format(data['stats']['views'])+'; Bandwidth: ' + format_bytes(data['stats']['bandwidth']);
			}
		}
	});
}

for (var i = 0; i < imgurs.snapshotLength; i++) {
	var imgur = imgurs.snapshotItem(i);
	var hash = imgur.src.match(/imgur\.com\/([A-Za-z0-9]{4,6})\.[a-z]+/)[1];
	if (hash) {
		addOverlay(imgur, hash);
	}
}