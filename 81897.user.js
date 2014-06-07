// ==UserScript==
// @name           SIP
// @description    Usprawnia wyszukiwanie w SIP MF.
// @version        0.1a
// @include           http://sip.mf.gov.pl/*

// ==/UserScript==

var css = 'body { font-size: 14px; background: gray;} input { width: 180px;} .hidden { width: 25px; font-size: 9px; background-color: yellow;} td[align=left], input[name=i_smpp_s_wskaznik], input[name=i_smpp_s_slownik] { display: none;}';

var inputs = document.getElementsByTagName("input");
for (i = 0; i < 13; i++) {
	var input = inputs[i];
	input.disabled=false;
}

var form = document.getElementsByTagName("form")[0];
form.setAttribute('target','_blank');

var stylesheet_inner = document.createElement('link');
stylesheet_inner.rel='stylesheet';
stylesheet_inner.href='data:text/css,' + escape(css);
document.getElementsByTagName('head')[0].appendChild(stylesheet_inner);

var hidden = document.getElementsByTagName('input');

for(var i=0; i<inputs.length; i++){
	if(hidden[i].getAttribute('type')=='hidden'){
		hidden[i].setAttribute('type','text');
		hidden[i].setAttribute('class','hidden');
	}
}