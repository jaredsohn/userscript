// ==UserScript==
// @name           Odeon Smart
// @namespace      dabeale.com
// @include        *odeon.co.uk*film_times*
// ==/UserScript==
function apply(event){
	if(event.target.parentNode.className=="c_featureheader greymiddle"){
			var sto=event.target.parentNode;
			while(sto.className != "featureboxa" | "featureboxb")
				sto = sto.nextSibling;
			sto.style.display=(sto.style.display=="block")?"none":"block";
			openBox(sto, 2, sto.getElementsByTagName('div')[0].offsetHeight);

	}
}

function openBox(box, min, max) {
	box.style.height=min+"px";
	if(min<max) setTimeout(openBox, 1, box, 3*min+5, max);
	else box.style.height=max+"px";
}
GM_addStyle('#fourintern{margin-top:-60px;}.bluedark, .bluetabc, .greylight{margin-right:5px;margin-top:5px;-moz-border-radius-topleft: 10px;-moz-border-radius-topright: 10px;}.featureboxa{display:none;height:0px;overflow:hidden;}'+
            '.textbox, #headcrumb,.tabimg, .tabimga{display:none;}.featureboxb{display:none;height:0px;overflow:hidden;}'+
            '.c_featureheader{border-bottom:1px dotted #bbb}'+
            '.greymiddle{background:#e4e4e4}'+
            '.greymiddle div:hover{background:#dedede}'+
            '.greymiddle div div:hover{background:none}');

document.addEventListener('click', function(event) {
	apply(event);
}, true);