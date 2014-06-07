// ==UserScript==
// @name           Basic Bing
// @description    Simplifies the Bing homepage, stripping away everything but the search bar, which it centers
// @author         Austin Owens
// @include        http://www.bing.com/
// @exclude        http://www.bing.com/s*
// @exclude        http://www.bing.com/n*
// @exclude        http://www.bing.com/v*
// @exclude        http://www.bing.com/i*
// @exclude        http://www.bing.com/m*
// @exclude        http://www.bing.com/t*
// @exclude        http://www.bing.com/e*
// @exclude        http://www.bing.com/p*
// @version        1.0
// ==/UserScript==

// Kill all excess elements on the page
document.styleSheets[0].addRule('.sa_om, .sh_hto, .hp_sw_logo, .sc_grad, #sw_pb, #sh_rdiv, #sch_scopes, #sb_form_go, #sb_foot, #hp_sw_hdr', 'display:none');

// Turns the page white.
document.styleSheets[0].addRule('td, #hp_sw_content, #bgDiv', 'background-color:white !important');
document.styleSheets[0].addRule('.hp_content_wrap, #hp_content', 'border:none !important');

// Create proper positioning for the box
document.getElementsByClassName('search_controls')[0].style.float = 'none';
document.getElementById('bgDiv').style.zIndex=-1;
document.getElementsByClassName('sw_sform')[0].style.position = 'static';

// Lengthen and center the search box.
document.getElementById('sb_form_q').style.width = '58em';
document.getElementsByClassName('sw_bd')[0].style.top = '200px';