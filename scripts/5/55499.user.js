// ==UserScript==
// @name Original Blue
// @namespace Travian
// @description altes GP "Orginal Blue"
// @include http://*.travian.*
// @exclude http://www.travian.*
// @exclude http://forum.travian.*
// ==/UserScript==
window.addEventListener('load', main, false);
var color = 'blue'; //-> 'blue' 'red' 'orange' 'dark' 'girls'
function main()
{	switch(color)
	{	case 'blue': var color1='#096cd0';var color2='#0e559d';var color3='#f0f1ff';var color4='#005dd0';break;
		case 'girls': var color1='#f62354';var color2='#df0739';var color3='#fbdee2';var color4='#eb8a98';break;
		case 'red':	var color1='#f80023'; var color2='#c80c26';	var color3='#fbdee0';var color4='#d43843';break;
		case 'infrared':	var color1='transparent'; var color2='transparent';	var color3='transparent';
							var color4='transparent';break; //xD
		case 'orange':	var color1='#e6b520'; var color2='#e7a800';	var color3='#fff3cd';var color4='#ffc105';break;
		case 'dark':	var color1='#666460'; var color2='#33312b';	var color3='#d1cfc8';var color4='#403f3b';break;
		default: var color1='#096cd0';var color2='#0e559d';var color3='#f0f1ff';var color4='#005dd0';break;
	}
	addGlobalStyle('a { color: '+color1+' ! important; }');								//alle links blau
	addGlobalStyle('a:hover { color: '+color2+' ! important; }');							//blau hover
	addGlobalStyle('#side_navi a { color: #000 ! important; }');						//linke seite (logout usw.)
	addGlobalStyle('#mfoot a { color: #666 ! important; }');							//travian copyright unten
	addGlobalStyle('#vlist thead a { color: #000 ! important; }');						//dörferlink über dorfliste
	addGlobalStyle('#llist thead a { color: #000 ! important; }');						//direktlinks überschrift
	addGlobalStyle('th.sent a { color: #000 ! important; }');							//gesendet link
	addGlobalStyle('tr.hl{ background-color: '+color3+'! important;');						//bg stats
	addGlobalStyle('table tr.hl td{border-top:2px solid '+color4+' ! important; border-bottom:2px solid '+color4+'! important;}'); //rahmen
	addGlobalStyle('table tr.hl td.fc{border-left:2px solid '+color4+' ! important;}');	//rahmen links
	addGlobalStyle('table tr.hl td.lc{border-right:2px solid '+color4+' ! important;}');	//rahmen rechts
	addGlobalStyle('div.reports td.report_content table.defender td.role {color:'+color1+' ! important;}');	//verteidiger txt
}
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}