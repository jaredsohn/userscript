// ==UserScript==
// @name        cleanIDEONE
// @namespace   http://elitelogics.com
// @description Clean interface and get more space for code
// @include     http://ideone.com/*
// @version     1
// @grant all
// ==/UserScript==

document.getElementById('header').style.display = 'none';
document.getElementById('header-bottom').style.display = 'none';
document.getElementById('footer').style.display = 'none';
document.getElementById('welcome_and_input').style.display = 'none';
document.getElementById('main').style.width = '100%';
document.getElementById('content').style.width = '100%';
document.getElementById('file_div').style.width = '100%';
document.getElementById('lang').style.height = '100px';
// Selects php as default, change options[XX] as per your requirement
document.getElementById('lang').options[47].selected = true;
document.getElementById('index_chk_visibility_private').checked = true;
var avaiableWidth = screen.width-180;
document.getElementsByClassName('index-right')[0].style.width = avaiableWidth+"px";



