// ==UserScript==
// @name Robot Invasion - Style Changer
// @namespace Robot Invasion
// @description Ändern des Styles möglich
// @include http://*.robot-invasion.*
// @exclude http://www.robot-invasion.*
// @exclude http://forum.robot-invasion.*



// ==/UserScript==


window.addEventListener('load', main, false);

//Orange
var color1='#000000'; 
var color2='#f07c05';



function main()
{	
		
	

        addGlobalStyle('a:link, a:active, a:visited {color:'+color1+'}');					
	addGlobalStyle('table{background-color:'+color2+'}');                                                                                                        
        addGlobalStyle('body {background-image:url(http://www.imagedose.de/10657/image/)};');                   
        addGlobalStyle('table.vis td, table.visOver td, table.visTdOver td {background-color:'+color2+';}')
        addGlobalStyle('table.vis th, table.visOver th {background-image:url(http://www.imagedose.de/10663/image/);')
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