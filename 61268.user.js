// ==UserScript==
// @name           LDR pin push
// @namespace      d.hatena.ne.jp/arikui
// @include        http://reader.livedoor.com/reader/
// ==/UserScript==

var w = unsafeWindow;
var _onload = w.onload;

w.onload = function(){
	_onload();
	var pin = w.pin;
	var pin_add = pin.add;

	pin.add = function(url,title){
		if(this.has(url)) return;
		pin.pins.unshift = pin.pins.push;
		pin_add.apply(this, arguments);

		if(pin.pins.length == 100)
			pin.open_group();
	};
}
