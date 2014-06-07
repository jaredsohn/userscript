// ==UserScript==
// @name           tontf72lst3r-CaptchaBypass
// @namespace      Labrute
// @description    BypassMyCaptcha by Bubble20000
// @include        http://tontf72lst3r.labrute*
// @include        http://tontf72lst3r.mybrute*
// @include        http://tontf72lst3r.elbruto*
// @include        http://tontf72lst3r.meinbrutalo*
// ==/UserScript==

var flashvar = 'i=oy2%3A_cfy2%3A_hy12%3Atontf72lst3ry2%3A_mi194736g&k=2a2a4b6c'

var swfcreatform = '<embed width="250" height="380" scale="noscale" flashvars="__file=http://data.labrute.fr/swf/create_form_versus.swf?v=22&amp;__key=http://data_labrute_fr/swf_key&amp;lang=fr&amp;path=http://data.labrute.fr/swf/&amp;lang=fr&amp;'+flashvar+'" allowscriptaccess="always" wmode="transparent" menu="false" quality="high" bgcolor="#FAF8C3" name="create_form" id="create_form" src="http://data.labrute.fr/swf/uc.swf?v=17" type="application/x-shockwave-flash"/>';
document.getElementById('swf_create_form').innerHTML = swfcreatform;
