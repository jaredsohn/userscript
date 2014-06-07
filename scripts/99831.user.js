// ==UserScript==
// @name           lt-tf98ld-CaptchaBypass
// @namespace      Labrute
// @description    BypassMyCaptcha by Bubble20000
// @include        http://lt-tf98ld.labrute*
// @include        http://lt-tf98ld.mybrute*
// @include        http://lt-tf98ld.elbruto*
// @include        http://lt-tf98ld.meinbrutalo*
// ==/UserScript==

var flashvar = 'i=oy2%3A_cfy2%3A_hy9%3Alt-tf98ldy2%3A_mi4891365g&k=95af4b6c'

var swfcreatform = '<embed width="250" height="380" scale="noscale" flashvars="__file=http://data.labrute.fr/swf/create_form_versus.swf?v=22&amp;__key=http://data_labrute_fr/swf_key&amp;lang=fr&amp;path=http://data.labrute.fr/swf/&amp;lang=fr&amp;'+flashvar+'" allowscriptaccess="always" wmode="transparent" menu="false" quality="high" bgcolor="#FAF8C3" name="create_form" id="create_form" src="http://data.labrute.fr/swf/uc.swf?v=17" type="application/x-shockwave-flash"/>';
document.getElementById('swf_create_form').innerHTML = swfcreatform;
