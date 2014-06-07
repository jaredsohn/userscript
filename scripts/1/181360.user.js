// Pegasus Epsilon's Magic Nile Online Fair-Trade Calculator v10.04.28.1
// by "The Almighty Pegasus Epsilon" <pegasus@pimpninjas.org>
//
// Distribute Unmodified.
// http://pegasus.pimpninjas.org/license
//
// ==UserScript==
// @name Pegasus Epsilon's Magic Nile Online Fair-Trade Calculator
// @description Fair-Trade calculator for NileOnline by Pegasus Epsilon
// @namespace http://pegasus.pimpninjas.org/nileonline/PE-NO-fairtrade.user.js
// @include http://*.playnileonline.com/*
// ==/UserScript==

if (document.getElementById('header')) {
	// escape firefox' greasemonkey scope
	var script = document.getElementsByTagName('head')[0].appendChild(document.createElement('script'));
	script.setAttribute('type', 'text/javascript');
	script.textContent = PEfairTradeScript();
}

function PEfairTradeScript() { // begin script for window scope
	return PEfairTradeScript.toString().replace(/[\s\S]*"\$1"\);([\s\S]*)}/,"$1"); // clean this wrapper off

	// init
	var PEFT = {}
	PEFT.VERSION = '10.04.28.1';

	// display
	PEFT.resourceProductionCost = new $H({'Wheat': 30, 'Clay': 48, 'Reeds': 48, 'Bread': 100, 'Leather': 240, 'Bronze': 240, 'Cedar': 240, 'Kohl': 240, 'Henna': 240, 'Oil': 240, 'Emeralds': 240, 'Gold': 240, 'Bricks': 264, 'Pottery': 336, 'Baskets': 336, 'Cosmetics': 720, 'Perfume': 720, 'Jewelry': 720, 'Sandals': 912, 'Sculpture': 912, 'Limestone': 240});
	PEFT.calculator = document.body.appendChild(document.createElement('div'));
	PEFT.calculator.setAttribute('id', 'PEFT_calculator');
	PEFT.calculator.innerHTML = '<div class="h2line" id="PEFT_title"><a id="PEFT_version" href="http://pegasus.pimpninjas.org/nileonline/PE-NO-fairtrade.user.js" title="Version of this script, click to check for a new version."></a>Fairtrade</div>\
		<div><input id="PEFT_amount1" onclick="javascript:this.focus();this.select()" /><select id="PEFT_item1"></select></div>\
		<div><input id="PEFT_amount2" onclick="javascript:this.focus();this.select()" /><select id="PEFT_item2"></select></div>';
	document.getElementById('PEFT_version').innerHTML='<span style="color:#87ceeb">&#x3f5;</span> v'+PEFT.VERSION;
	PEFT.item1 = document.getElementById('PEFT_item1');
	PEFT.item2 = document.getElementById('PEFT_item2');
	PEFT.item1.innerHTML = PEFT.item2.innerHTML = '';
	PEFT.resourceProductionCost.each(function(resource) {
		PEFT.item1.innerHTML+='<option value="'+resource.value+'">'+resource.key+'</option>';
	});
	PEFT.item2.innerHTML = PEFT.item1.innerHTML;
	PEFT.amount1 = document.getElementById('PEFT_amount1');
	PEFT.amount2 = document.getElementById('PEFT_amount2');

	// style
	PEFT.style = document.getElementsByTagName('head')[0].appendChild(document.createElement('style'));
	PEFT.style.setAttribute('type', 'text/css');
	PEFT.style.textContent = '\
	#PEFT_calculator {\
		font-size: 9px;\
		position: fixed;\
		width: 110px;\
		height: 54px;\
		border-style: solid;\
		border-width: 1px;\
		border-color: #555555;\
		padding: 5px 0px 5px 5px;\
		background: transparent url(images/bg_75opacity.png) repeat scroll 0% 0%;\
		-moz-border-radius: 5px;\
		border-radius: 5px;\
		z-index: 1001;\
		color: #aaaaaa;\
		padding-right: 4px;\
	}\
	#PEFT_calculator a { float: right; font-weight: normal; font-size: .83em; }\
	#PEFT_calculator a span { font-size: 1.3em; line-height: .715em; }\
	#PEFT_calculator .h2line { font-size: 1.2em; cursor: default; }\
	#PEFT_calculator input, #PEFT_calculator select {\
		border: 1px solid #555555; text-align: center;\
		color: #aaaaaa;\
		background: transparent;\
		background-color: rgba(0,0,0,0.75);\
		font-size: 9px;\
	}\
	#PEFT_calculator input { width: 33px; }\
	#PEFT_calculator select { width: 72px; }';

	// behavior
	// -make draggable
	// --store position
	PEFT.storePosition = function(object,event) {
		PEFT.calculator.position = new $H({ 'top': PEFT.calculator.offsetTop, 'left': PEFT.calculator.offsetLeft });
		// woo! eternal cookie!
		document.cookie = 'PEFT_position='+PEFT.calculator.position.toJSON().replace(/"/g, "'")+';expires=Sat, 13 Sep 2038 00:00:00 GMT;path=/';
	}
	PEFT.draggable = new Draggable('PEFT_calculator', { handle: 'PEFT_title', onEnd: PEFT.storePosition });
	// --restore position with prototype object magic
	PEFT.cookies = ("{'"+document.cookie.replace(/; */g,"','").replace(/(^|,)([^=]*)= */g,"$1$2':'")+"'}").replace(/'{/g,'{').replace(/}'/g,'}').evalJSON();
	if (PEFT.cookies.PEFT_position !== undefined) {
		PEFT.calculator.style.top = PEFT.cookies.PEFT_position.top+'px';
		PEFT.calculator.style.left = PEFT.cookies.PEFT_position.left+'px';
	} else PEFT.calculator.style.bottom = PEFT.calculator.style.left = 0;
	// -validate
	PEFT.validateInput = function(e) {
		e = (e) ? e : event; // mozilla
		if (e.target.tagName == 'INPUT' && (e.keyCode > 0x39 || (e.keyCode > 0x1F && e.keyCode < 0x23))) return false;
	}
	// -calculate
	PEFT.calculate = function(e) {
		e = (e) ? e : event; // mozilla
		if (e.target.id == 'PEFT_amount2') {
			PEFT.amount1.value = (PEFT.amount2.value * PEFT.item2.value) / PEFT.item1.value;
		} else {
			PEFT.amount2.value = (PEFT.amount1.value * PEFT.item1.value) / PEFT.item2.value;
		}
	}

	// assign functions to controls
	PEFT.amount1.onkeypress = PEFT.amount2.onkeypress = PEFT.validateInput;
	PEFT.amount1.onkeyup = PEFT.amount2.onkeyup = PEFT.item1.onchange = PEFT.item2.onchange = PEFT.calculate;
}
