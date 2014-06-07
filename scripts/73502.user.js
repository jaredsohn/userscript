// ==UserScript==
// @name           ShowCss
// @namespace      http://members.multimania.co.uk/musl
// @version        1
// @description    Verander de opmaak van WaarMaarRaar.nl en geniet van o.a. een zwarte achtergrond.
// @include        http://members.multimania.co.uk/musl
// @include        http://www.arabicmafia.com/*
// ==/UserScript==
//
// Script door Thom Castermans
//

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('@import "http://members.multimania.co.uk/musl/Show.css"');

function changeFontColor(color,newcolor) {
    var font, usedcolor;
    font = document.getElementsByTagName('font');
    for (var i=0; i < font.length; i++)
	{
		usedcolor = font[i].getAttribute('color');
		if (usedcolor == color)
		{
			font[i].setAttribute("color", newcolor);
		}
	}
}


.normal_1{
color: #F08080;
background: #FF1493;
}

.shadow_1{
color: #FF1493;
background: #FF1493;
text-shadow: 2px -2px 3px  #F08080;
}

.shadow_2{
color: #33cc33;
background: #000;
text-shadow: 2px 2px 2px  #F08080;
}

.fire_1{
color: #000;
text-shadow: 0 0 4px #FF1493, 0 -5px 4px #FF1493, 2px -10px 6px #FF1493, -2px -15px 11px #FF1493, 2px -18px 18px #FF1493;
}

.blank{
text-decoration: none;
}

.blank:hover{

}

document.body.addEventListener('DOMNodeInserted', function() {
    changeFontColor("green","#51CD1C")
    changeFontColor("#ff0066","#FE7AAF")
    changeFontColor("#0033cc","#93ABF2")
    changeBgColor("td","#f2f2f2","#505050")
    changeBgColor("td","#ffece9","#EFB1A5")
}, false);