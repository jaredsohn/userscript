// ==UserScript==
// @name Hex Parser
// @author Veridis
// @namespace http://www.veridis.com/HexParser
// @description Parses the page for Hex values and colours them
// @license Creative Commons Attribution License
// @version 1.3
// @include *
// @released 2009-01-31
// @compatible Greasemonkey
// ==/UserScript==

//unsafeWindow = window;
//start = new Date().getTime();

Object.create = function (o) {
	function F() {}
	F.prototype = o;
	return new F();
};

color = function(){
	
	var _name = 'black',
		_hex = '#000000',
		_red = 0,
		_green = 0,
		_blue = 0,
		colorNames = {
			'f0f8ff': 'aliceblue',
			'faebd7': 'antiquewhite',
			'00ffff': 'aqua',
			'7fffd4': 'aquamarine',
			'f0ffff': 'azure',
			'f5f5dc': 'beige',
			'ffe4c4': 'bisque',
			'000000': 'black',
			'ffebcd': 'blanchedalmond',
			'0000ff': 'blue',
			'8a2be2': 'blueviolet',
			'a52a2a': 'brown',
			'deb887': 'burlywood',
			'5f9ea0': 'cadetblue',
			'7fff00': 'chartreuse',
			'd2691e': 'chocolate',
			'ff7f50': 'coral',
			'6495ed': 'cornflowerblue',
			'fff8dc': 'cornsilk',
			'dc143c': 'crimson',
			'00ffff': 'cyan',
			'00008b': 'darkblue',
			'008b8b': 'darkcyan',
			'b8860b': 'darkgoldenrod',
			'a9a9a9': 'darkgray',
			'006400': 'darkgreen',
			'a9a9a9': 'darkgrey',
			'bdb76b': 'darkkhaki',
			'8b008b': 'darkmagenta',
			'556b2f': 'darkolivegreen',
			'ff8c00': 'darkorange',
			'9932cc': 'darkorchid',
			'8b0000': 'darkred',
			'e9967a': 'darksalmon',
			'8fbc8f': 'darkseagreen',
			'483d8b': 'darkslateblue',
			'2f4f4f': 'darkslategray',
			'2f4f4f': 'darkslategrey',
			'00ced1': 'darkturquoise',
			'9400d3': 'darkviolet',
			'ff1493': 'deeppink',
			'00bfff': 'deepskyblue',
			'696969': 'dimgray',
			'696969': 'dimgrey',
			'1e90ff': 'dodgerblue',
			'b22222': 'firebrick',
			'fffaf0': 'floralwhite',
			'228b22': 'forestgreen',
			'ff00ff': 'fuchsia',
			'dcdcdc': 'gainsboro',
			'f8f8ff': 'ghostwhite',
			'ffd700': 'gold',
			'daa520': 'goldenrod',
			'808080': 'gray',
			'008000': 'green',
			'adff2f': 'greenyellow',
			'808080': 'grey',
			'f0fff0': 'honeydew',
			'ff69b4': 'hotpink',
			'cd5c5c': 'indianred',
			'4b0082': 'indigo',
			'fffff0': 'ivory',
			'f0e68c': 'khaki',
			'e6e6fa': 'lavender',
			'fff0f5': 'lavenderblush',
			'7cfc00': 'lawngreen',
			'fffacd': 'lemonchiffon',
			'add8e6': 'lightblue',
			'f08080': 'lightcoral',
			'e0ffff': 'lightcyan',
			'fafad2': 'lightgoldenrodyellow',
			'd3d3d3': 'lightgray',
			'90ee90': 'lightgreen',
			'd3d3d3': 'lightgrey',
			'ffb6c1': 'lightpink',
			'ffa07a': 'lightsalmon',
			'20b2aa': 'lightseagreen',
			'87cefa': 'lightskyblue',
			'778899': 'lightslategray',
			'778899': 'lightslategrey',
			'b0c4de': 'lightsteelblue',
			'ffffe0': 'lightyellow',
			'00ff00': 'lime',
			'32cd32': 'limegreen',
			'faf0e6': 'linen',
			'ff00ff': 'magenta',
			'800000': 'maroon',
			'66cdaa': 'mediumaquamarine',
			'0000cd': 'mediumblue',
			'ba55d3': 'mediumorchid',
			'9370db': 'mediumpurple',
			'3cb371': 'mediumseagreen',
			'7b68ee': 'mediumslateblue',
			'00fa9a': 'mediumspringgreen',
			'48d1cc': 'mediumturquoise',
			'c71585': 'mediumvioletred',
			'191970': 'midnightblue',
			'f5fffa': 'mintcream',
			'ffe4e1': 'mistyrose',
			'ffe4b5': 'moccasin',
			'ffdead': 'navajowhite',
			'000080': 'navy',
			'fdf5e6': 'oldlace',
			'808000': 'olive',
			'6b8e23': 'olivedrab',
			'ffa500': 'orange',
			'ff4500': 'orangered',
			'da70d6': 'orchid',
			'eee8aa': 'palegoldenrod',
			'98fb98': 'palegreen',
			'afeeee': 'paleturquoise',
			'db7093': 'palevioletred',
			'ffefd5': 'papayawhip',
			'ffdab9': 'peachpuff',
			'cd853f': 'peru',
			'ffc0cb': 'pink',
			'dda0dd': 'plum',
			'b0e0e6': 'powderblue',
			'800080': 'purple',
			'ff0000': 'red',
			'bc8f8f': 'rosybrown',
			'4169e1': 'royalblue',
			'8b4513': 'saddlebrown',
			'fa8072': 'salmon',
			'f4a460': 'sandybrown',
			'2e8b57': 'seagreen',
			'fff5ee': 'seashell',
			'a0522d': 'sienna',
			'c0c0c0': 'silver',
			'87ceeb': 'skyblue',
			'6a5acd': 'slateblue',
			'708090': 'slategray',
			'fffafa': 'snow',
			'00ff7f': 'springgreen',
			'4682b4': 'steelblue',
			'd2b48c': 'tan',
			'008080': 'teal',
			'd8bfd8': 'thistle',
			'ff6347': 'tomato',
			'40e0d0': 'turquoise',
			'ee82ee': 'violet',
			'f5deb3': 'wheat',
			'ffffff': 'white',
			'f5f5f5': 'whitesmoke',
			'ffff00': 'yellow',
			'9acd32': 'yellowgreen'
		};
	
	var hexFromRGB = function(rgb) {
		var hex = [
			rgb[0].toString(16),
			rgb[1].toString(16),
			rgb[2].toString(16)
		];
		for (h in hex) {
			if (hex[h].length == 1) {
				hex[h] = '0' + hex[h];
			}
		}
		
		return '#' + hex.join('').toUpperCase();
	};
	
	var hexFromColorName = function(colorName) {
		for (hex in colorNames) {
			if (colorNames[hex] === colorName) {
				return '#' + hex;
			}
		}
	};
	
	var RGBFromHex = function(hex) {
		hex = hex.substr(1);
		
		return [
			parseInt(hex.substr(0, 2),16),
			parseInt(hex.substr(2, 2),16),
			parseInt(hex.substr(4, 2),16)
		];
	};

	var colorNameFromHex = function(hex) {
		return colorNames[hex.substr(1)] | hex;
	};
	
	var parseHex = function(hex) {
		hex = hex.toUpperCase();
		if(hex.length === 4){
			return '#' + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
		}
		return hex;
	};

	
	return {
		name: function( name ){
			if ( !name ) {
				return _name;
			}
			_name = name;
			_hex = hexFromColorName(_name);
			[_red, _green, _blue] = RGBFromHex(_hex);
			return this;
		},
		hex: function( hex ){
			if ( !hex ) {
				return _hex;
			}
			_hex = parseHex(hex);
			_name = colorNameFromHex(_hex);
			[_red, _green, _blue] = RGBFromHex(_hex);
			return this;
		},
		red: function( red ){
			if ( !red ) {
				return _red;
			}
			_red = parseInt(red,10);
			_hex = hexFromRGB([_red,_green,_blue]);
			_name = colorNameFromHex(_hex);
			return this;
		},
		green: function( green ){
			if ( !green ) {
				return _green;
			}
			_green = parseInt(green,10);
			_hex = hexFromRGB([_red,_green,_blue]);
			_name = colorNameFromHex(_hex);
			return this;
		},
		blue: function( blue ){
			if ( !blue ) {
				return _blue;
			}
			_blue = parseInt(blue,10);
			_hex = hexFromRGB([_red,_green,_blue]);
			_name = colorNameFromHex(_hex);
			return this;
		},
		rgb: function( rgb ){
			if ( !rgb ) {
				return [_red, _green, _blue];
			}
			_hex = hexFromRGB(rgb);
			_name = colorNameFromHex(_hex);
			[_red, _green, _blue] = rgb;
			return this;
		},
		blackWhite: function( threshold ){
			
			var grey = (_red + _green + _blue) / 3;
			if ( grey > (threshold|0x7F) ){
				this.hex('#FFFFFF');
			}
			else {
				this.hex('#000000');
			}
			return this;
		},
		invert: function(){
		
			this.rgb([
				0xff - _red,
				0xff - _green,
				0xff - _blue
			]);
			
			return this;
		}
	}
}();

parseTextNode = function(textNode) {
	var match = re(textNode.data);
		
	if (match === null) {
		return;
	}
	
	var rightTextNode = textNode.splitText(match.index);
	
	var hexValue = rightTextNode.data.substr(0,match[0].length),
		hexColor = Object.create(color).hex( hexValue ),
		span = document.createElement('span');
	
	span.innerHTML = hexValue;
	span.style.backgroundColor = hexColor.hex();
	span.style.color = hexColor.invert().blackWhite().hex();
	span.className = 'hex';
	
	rightTextNode.parentNode.insertBefore(span, rightTextNode);
	rightTextNode.data = rightTextNode.data.substr(match[0].length);
	delete span, hexValue, hexColor;//does this help? it might.
	parseTextNode(rightTextNode);
}

var elems = Array.prototype.slice.call(document.body.getElementsByTagName('*')),
	re = /#([\da-f]{3})([\da-f]{3})?/i,
	elem,
	child;
	
while (elem = elems.shift()) {
	var children = Array.prototype.slice.call(elem.childNodes);
	while (child = children.shift()) {
		if (
			child.nodeType === unsafeWindow.Node.TEXT_NODE 
			&& child.parentNode.className !== 'hex'
			&& child.parentNode.nodeName !== 'TEXTAREA'
			&& child.parentNode.nodeName !== 'SCRIPT'
			&& child.parentNode.nodeName !== 'STYLE' 
		) {
			parseTextNode(child);
		}
	}
}


//end = new Date().getTime() - start;