// ==UserScript==
// @name          iGoogle Inuyasha & Kagome theme enhancements
// @description   Repositions stuff so you can see the entire background image.
// @include       http*://*google.tld*
// ==/UserScript==
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
if(document.getElementById('sfrm')){
	try{
		var x=window.innerWidth-25;
	}
	catch(e){
		var x=document.body.offsetWidth-25;
	}
	if(document.body.offsetHeight-106>window.innerHeight){
		x-=25;
	}
	addGlobalStyle(// Code best viewed using firebug
		'#regular_logo {\n\tposition:absolute;\n\ttop:75px;\n\tleft:0px;\n\twidth:'+((x-655)/2)+'px; /* Generated Value */\n\tbackground-position:center;\n}\n' +
		'.gseaopt {\n\tposition:absolute;\n\ttop:85px;\n\tright:0px;\n\ttext-align:center !important;\n\t;width:'+((x-655)/2)+'px; /* Generated Value */\n}\n' +
		'#q {\n\tposition:absolute;\n\tleft:'+((x/2)-((x-321)/2))+'px; /* Generated Value */\n\ttop:202px;\n\twidth:'+(x-306)+'px; /* Generated Value */\n\theight:18px;\n\tbackground:black;\n\tmargin:-0px;\n\tcolor:white;\n\tborder:4px #D35143 solid;\n\ttext-align:center;\n\tfont-weight:bold;\n}\n' +
		'#nhdrwrapinner {\n\theight:215px;\n}\n' +
		'#addstuff a:hover {\n\topacity:1;\n\tcolor:white;\n\tbackground:black;\n\t-moz-border-radius-topleft:6px;\n\t-moz-border-radius-topright:6px;\n}\n' +
		'#noscript_box {\n\tposition:relative;\n\tleft:-315px;\n\ttop:-80px;\n\tborder-color:#d65142;\n\t-moz-border-radius-topleft:10px;\n\t-moz-border-radius-bottomleft:10px;\n\t-moz-border-radius-topright:10px;\n\t-moz-border-radius-bottomright:10px;\n\tbackground-color:#D65142 !important;\n\tcolor:black;\n}\n' +
		'#btnG:hover, #btnI:hover {\n\tcolor:yellow;\n\tcursor:pointer;\n}\n' +
		'#addstuff a {\n\topacity:.25;\n}\n' +
		'#btnG, #btnI {\n\tposition:absolute;\n\ttop:199px;\n\theight:28px !important;\n\tborder:4px #D35143 outset;\n\twidth:145px;\n\tbackground:#D35143;\n\tcolor:black;\n\tfont-weight:bold;\n}\n' +
		'#btnG:active, #btnI:active {\n\tborder-style:inset;\n\tcolor:yellow;\n\tbackground:black;\n}\n' +
		'#btnG {\n\tleft:'+(x-140)+'px; /* Generated Value */\n\t-moz-border-radius-bottomright:15px;\n\t-moz-border-radius-topright:15px;\n}\n' +
		'#btnI {\n\tleft:13px;\n\t-moz-border-radius-topleft:15px;\n\t-moz-border-radius-bottomleft:15px;\n}\n' +
		'#nhdrwrapsizer{\n\theight:146px!important;\n}\n'+
		'.gradient {\n\tposition:relative;\n\ttop:34px;\n\tz-index:0 !important;\n}\n' +
		'.tg {\n\tposition:relative;\n\ttop:-34px !important;\n}\n' +
		'#completeTable.google-ac-m .google-ac-a {\n\tbackground:black;\n\tcolor:#D35143\n}\n' +
		'#completeTable.google-ac-m .google-ac-e td {\n\tcolor:white;\n\tbackground:black\n}\n' +
		'.bottomline, .topline {\n\tdisplay:none\n}\n' +
		'#col2 {\n\tposition:relative;\n\tbackground-color:white;\n}\n' +
		'#promo,#set_homepage_msg {\n\topacity:.25;\n}\n' +
		'#promo:hover,#set_homepage_msg:hover {\n\topacity:1;\n\t-moz-border-radius-topleft:15px;\n\t-moz-border-radius-topright:8px;\n\tbackground-color:black;\n}\n' +
		'#enable_chat, #tab_chat, #talk_container, #bottom_nav {\n\tdisplay:none ;\n}\n'  +
		'#footerwrap {\n\theight:auto !important\n}\n' +
		'#footerwrapinner,#sfrm iframe {\n\tdisplay:none !important;\n}\n' +
		'html {\n\tbackground-color:black;\n}'
	);
}