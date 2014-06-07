// ==UserScript==
// @name	TransFiX Urdu Nastaleeq
// @namespace   http://www.imughal.com , facebook.com/imughal7
// @description	Vanilla Forums  /  Resources (ur_PK)  /  Core  / Urdu (Pakistan) (ur_PK)
// @author	Imran Ali Mugha
// @homepage    facebook.com/imughal7
// @include	https://www.transifex.com/projects/p/vanilla/resource*
// ==/UserScript==

function UrduStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

UrduStyle('body{font-family:"Jameel Noori Nastaleeq",Tahoma; font-size:120%} .dataTables_wrapper table tbody td.msg{font-size:120%} textarea.translation{font-size:20px}');
