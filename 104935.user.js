// ==UserScript==
// @name           Kuesioner SIM Akademik ITS Autofill
// @namespace      http://coexistentrandom.wordpress.com/kuesioner-sim-akademik-autofill
// @description    Autofill kuesioner agar memudahkan mahasiswa
// @license        whatever..
// @author         CR
// @include        http://akademik.its.ac.id/ipd_kuesionermk.php
// @include        http://akademik.its.ac.id/ipd_kuesionerdosen.php
// @version        1.0
// ==/UserScript==

var buttoninputs = document.querySelectorAll('input[id^="MK"],input[id^="DO"]');
for (var i = 0; i < buttoninputs.length; i+=4) {
	var j = Math.floor(Math.random()*4);
	buttoninputs[i+j].checked = true;
}

var checkbox = document.querySelector('input[id="chkPermanent"]');
checkbox.checked = true;

var form = document.querySelector('#form2');
form.submit();