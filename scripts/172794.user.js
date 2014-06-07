// ==UserScript==
// @name           URL2GRCODE
// @description Displays a GR CODE image on top right corner of your webpage.
// @namespace      anpho
// @include        http*
// @match		   http*
// @author		   anphorea@gmail.com
// @version 1.0.0
// @date 2013-7-8
// @license MIT License
// ==/UserScript==


var divMenu=document.createElement('div');
divMenu.id='divMenu';
divMenu.style.right='25px';
divMenu.style.visibility='visible';
divMenu.style.width='45px';
divMenu.style.position='absolute';
divMenu.style.zindex='1000';
divMenu.style.top='25px';
var u="https://chart.googleapis.com/chart?cht=qr&chs=300x300&chl="+document.location;
var divImg=document.createElement('img');
divImg.src=u;
divImg.width=50;	
divImg.height=50;
divMenu.appendChild(divImg);
document.body.appendChild(divMenu);