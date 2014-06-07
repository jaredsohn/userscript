// ==UserScript==
// @name          SERF Filler!
// @namespace     http://krev.webs.com
// @description	  Fills up the SERF text inputs.
// @include       http://serf.fontan.co/
// ==/UserScript==
//alert('hi');
document.getElementById('ctl00_cph_main_txtCorreo').value="your.name@mail.fontan.com.co";
document.getElementById('ctl00_cph_main_txtTicket').value="password";
document.getElementById('ctl00_cph_main_btnLogin').click();