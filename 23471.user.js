// ==UserScript==
// @name           Twitter - IdentKaograph
// @namespace      http://polog.org/
// @include        http://twitter.com/home*
//
// ==/UserScript==
// based on http://d.hatena.ne.jp/brazil/20071207/1196997649

var cache = {};

function swapIcons(ctx){
	ctx = ctx.length? ctx[0] : ctx;
	$x('//td[@class="thumb vcard author"]/a', ctx).forEach(function(link){
		var name = link.href.split('/').pop();
		var src = cache[name];
		if(!src){
			var values = toValues(name);
			src = cache[name] = 'http://kaochart.com/api/draw?' + queryString({
				chart_type  : 'FukumotoPainter',
				size  : '55',
				data  : toDatas(values),
			});
		}
		link.childNodes[0].src = src;
	})
}
if(window.AutoPagerize)
	window.AutoPagerize.addFilter(swapIcons);
swapIcons(document);


// ---- [Application] --------------------------------------------------------------
function toValues(name){
	name = name.toLowerCase();
	var values = [];
	for(var i=0,len=name.length ; i<len ; i++){
		var c = name[i];
		var cc = c.charCodeAt();
		values.push((isNaN(Number(c))? cc-87 : cc-48) / 35);
	}
	return values;
}

function toDatas(values){
	var datas = [];
	for (var i=0; i<values.length; i++)
		datas.push(values);
	return datas.join(',');
}


function toColors(name, values){
	var tri = [name, name, name].join('');
	
	var colors = [];
	for (var i=0; i<name.length; i++){
		var c = crc32(tri.substr(i,2)).slice(-6);
		var s = parseInt(c[3], 16);
		if(s < 4){
			colors.push('ffffff');
		} else if(s < 10) {
			colors.push(toHexString(hsvToRGB(values[i], 1, 0.95)));
			// colors.push(c);
			// colors.push(('000000' + Math.round(0xffffff * values[i]).toString(16)).substr(-6));
		} else {
			colors.push('000000');
		}
	}
	
	return colors.join(',');
}

// ---- [Utility] --------------------------------------------------------------
function $x(exp, ctx){
	ctx = ctx || document;
	var res = document.evaluate(exp, ctx, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
	for(var i, nodes = [] ; i=res.iterateNext() ; nodes.push(i));
	return nodes;
}

function queryString(params){
	var qeries = [];
	for(var key in params)
		qeries.push(key + '='+ params[key]);
	return qeries.join('&');
}

function toHexString(c){
	return  '' + 
		toColorPart(255 * c.r) +
		toColorPart(255 * c.g) +
		toColorPart(255 * c.b);
}

function toColorPart(num) {
	num = Math.round(num);
	var res = num.toString(16);
	if (num < 16)
		return '0' + res;
	
	return res;
}

function hsvToRGB(h, s, v) {
	var r, g, b;
	if (s === 0) {
		r = g = b = v;
	} else {
		var i = Math.floor(h * 6);
		var f = (h * 6) - i;
		var p = v * (1 - s);
		var q = v * (1 - (s * f));
		var t = v * (1 - (s * (1 - f)));
		switch (i) {
			case 1: r = q; g = v; b = p; break;
			case 2: r = p; g = v; b = t; break;
			case 3: r = p; g = q; b = v; break;
			case 4: r = t; g = p; b = v; break;
			case 5: r = v; g = p; b = q; break;
			case 6: // fall through
			case 0: r = v; g = t; b = p; break;
		}
	}
	return {r: r, g: g, b: b,};
}

function hslToRGB(h, s, l){
	var r, g, b;
	if (s === 0) {
		r = g = b = l;
	} else {
		var m2;
		if (l <= 0.5) {
			m2 = l * (1.0 + s);
		} else {
			m2 = l + s - (l * s);
		}
		var m1 = (2.0 * l) - m2;
		var hsl = function(n1, n2, h){
			if (h > 6.0){
				h -= 6.0;
			} else if (h < 0.0){
				h += 6.0;
			}
			
			var val;
			if (h < 1.0) {
				val = n1 + (n2 - n1) * h;
			} else if (h < 3.0) {
				val = n2;
			} else if (h < 4.0) {
				val = n1 + (n2 - n1) * (4.0 - h);
			} else {
				val = n1;
			}
			return val;
		};
		
		var h6 = h * 6.0;
		r = hsl(m1, m2, h6 + 2);
		g = hsl(m1, m2, h6);
		b = hsl(m1, m2, h6 - 2);
	}
	return {r: r, g: g, b: b,};
}

function crc32(data) {
	var ch = [
		1026, 1027, 8218, 1107, 8222, 8230, 8224, 8225, 8364, 8240, 1033, 8249, 1034, 1036, 1035, 1039, 
		1106, 8216, 8217, 8220, 8221, 8226, 8211, 8212,    0, 8482, 1113, 8250, 1114, 1116, 1115, 1119, 
		 160, 1038, 1118, 1032,  164, 1168,  166,  167, 1025,  169, 1028,  171,  172,  173,  174, 1031, 
		 176,  177, 1030, 1110, 1169,  181,  182,  183, 1105, 8470, 1108,  187, 1112, 1029, 1109, 1111, 
		1040, 1041, 1042, 1043, 1044, 1045, 1046, 1047, 1048, 1049, 1050, 1051, 1052, 1053, 1054, 1055, 
		1056, 1057, 1058, 1059, 1060, 1061, 1062, 1063, 1064, 1065, 1066, 1067, 1068, 1069, 1070, 1071, 
		1072, 1073, 1074, 1075, 1076, 1077, 1078, 1079, 1080, 1081, 1082, 1083, 1084, 1085, 1086, 1087, 
		1088, 1089, 1090, 1091, 1092, 1093, 1094, 1095, 1096, 1097, 1098, 1099, 1100, 1101, 1102, 1103
	];
	var hash = {};
	for (var i=0; i<ch.length; ++i) hash[ch[i]] = i + 128;
	
	var crc32tab = [
		0x00000000, 0x77073096, 0xee0e612c, 0x990951ba, 0x076dc419, 0x706af48f, 0xe963a535, 0x9e6495a3, 
		0x0edb8832, 0x79dcb8a4, 0xe0d5e91e, 0x97d2d988, 0x09b64c2b, 0x7eb17cbd, 0xe7b82d07, 0x90bf1d91, 
		0x1db71064, 0x6ab020f2, 0xf3b97148, 0x84be41de, 0x1adad47d, 0x6ddde4eb, 0xf4d4b551, 0x83d385c7, 
		0x136c9856, 0x646ba8c0, 0xfd62f97a, 0x8a65c9ec, 0x14015c4f, 0x63066cd9, 0xfa0f3d63, 0x8d080df5, 
		0x3b6e20c8, 0x4c69105e, 0xd56041e4, 0xa2677172, 0x3c03e4d1, 0x4b04d447, 0xd20d85fd, 0xa50ab56b, 
		0x35b5a8fa, 0x42b2986c, 0xdbbbc9d6, 0xacbcf940, 0x32d86ce3, 0x45df5c75, 0xdcd60dcf, 0xabd13d59, 
		0x26d930ac, 0x51de003a, 0xc8d75180, 0xbfd06116, 0x21b4f4b5, 0x56b3c423, 0xcfba9599, 0xb8bda50f, 
		0x2802b89e, 0x5f058808, 0xc60cd9b2, 0xb10be924, 0x2f6f7c87, 0x58684c11, 0xc1611dab, 0xb6662d3d, 
		
		0x76dc4190, 0x01db7106, 0x98d220bc, 0xefd5102a, 0x71b18589, 0x06b6b51f, 0x9fbfe4a5, 0xe8b8d433, 
		0x7807c9a2, 0x0f00f934, 0x9609a88e, 0xe10e9818, 0x7f6a0dbb, 0x086d3d2d, 0x91646c97, 0xe6635c01, 
		0x6b6b51f4, 0x1c6c6162, 0x856530d8, 0xf262004e, 0x6c0695ed, 0x1b01a57b, 0x8208f4c1, 0xf50fc457, 
		0x65b0d9c6, 0x12b7e950, 0x8bbeb8ea, 0xfcb9887c, 0x62dd1ddf, 0x15da2d49, 0x8cd37cf3, 0xfbd44c65, 
		0x4db26158, 0x3ab551ce, 0xa3bc0074, 0xd4bb30e2, 0x4adfa541, 0x3dd895d7, 0xa4d1c46d, 0xd3d6f4fb, 
		0x4369e96a, 0x346ed9fc, 0xad678846, 0xda60b8d0, 0x44042d73, 0x33031de5, 0xaa0a4c5f, 0xdd0d7cc9, 
		0x5005713c, 0x270241aa, 0xbe0b1010, 0xc90c2086, 0x5768b525, 0x206f85b3, 0xb966d409, 0xce61e49f, 
		0x5edef90e, 0x29d9c998, 0xb0d09822, 0xc7d7a8b4, 0x59b33d17, 0x2eb40d81, 0xb7bd5c3b, 0xc0ba6cad, 
		
		0xedb88320, 0x9abfb3b6, 0x03b6e20c, 0x74b1d29a, 0xead54739, 0x9dd277af, 0x04db2615, 0x73dc1683, 
		0xe3630b12, 0x94643b84, 0x0d6d6a3e, 0x7a6a5aa8, 0xe40ecf0b, 0x9309ff9d, 0x0a00ae27, 0x7d079eb1, 
		0xf00f9344, 0x8708a3d2, 0x1e01f268, 0x6906c2fe, 0xf762575d, 0x806567cb, 0x196c3671, 0x6e6b06e7, 
		0xfed41b76, 0x89d32be0, 0x10da7a5a, 0x67dd4acc, 0xf9b9df6f, 0x8ebeeff9, 0x17b7be43, 0x60b08ed5, 
		0xd6d6a3e8, 0xa1d1937e, 0x38d8c2c4, 0x4fdff252, 0xd1bb67f1, 0xa6bc5767, 0x3fb506dd, 0x48b2364b, 
		0xd80d2bda, 0xaf0a1b4c, 0x36034af6, 0x41047a60, 0xdf60efc3, 0xa867df55, 0x316e8eef, 0x4669be79, 
		0xcb61b38c, 0xbc66831a, 0x256fd2a0, 0x5268e236, 0xcc0c7795, 0xbb0b4703, 0x220216b9, 0x5505262f, 
		0xc5ba3bbe, 0xb2bd0b28, 0x2bb45a92, 0x5cb36a04, 0xc2d7ffa7, 0xb5d0cf31, 0x2cd99e8b, 0x5bdeae1d, 
		
		0x9b64c2b0, 0xec63f226, 0x756aa39c, 0x026d930a, 0x9c0906a9, 0xeb0e363f, 0x72076785, 0x05005713, 
		0x95bf4a82, 0xe2b87a14, 0x7bb12bae, 0x0cb61b38, 0x92d28e9b, 0xe5d5be0d, 0x7cdcefb7, 0x0bdbdf21, 
		0x86d3d2d4, 0xf1d4e242, 0x68ddb3f8, 0x1fda836e, 0x81be16cd, 0xf6b9265b, 0x6fb077e1, 0x18b74777, 
		0x88085ae6, 0xff0f6a70, 0x66063bca, 0x11010b5c, 0x8f659eff, 0xf862ae69, 0x616bffd3, 0x166ccf45, 
		0xa00ae278, 0xd70dd2ee, 0x4e048354, 0x3903b3c2, 0xa7672661, 0xd06016f7, 0x4969474d, 0x3e6e77db, 
		0xaed16a4a, 0xd9d65adc, 0x40df0b66, 0x37d83bf0, 0xa9bcae53, 0xdebb9ec5, 0x47b2cf7f, 0x30b5ffe9, 
		0xbdbdf21c, 0xcabac28a, 0x53b39330, 0x24b4a3a6, 0xbad03605, 0xcdd70693, 0x54de5729, 0x23d967bf, 
		0xb3667a2e, 0xc4614ab8, 0x5d681b02, 0x2a6f2b94, 0xb40bbe37, 0xc30c8ea1, 0x5a05df1b, 0x2d02ef8d
	];
	
	return (crc32 = function(data){
		var crc = 0xffffffff;
		for (var i=0; i<data.length; ++i) {
			var cCode = data.charCodeAt(i);
			if (cCode >= 128) cCode = hash[cCode];
			crc = (crc >>> 8) ^ crc32tab[(crc ^ cCode) & 0xff];
		}
		return (crc>>>0).toString(16);
	})(data);
}