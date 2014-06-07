// ==UserScript==
// @name           Capcha Killer
// @namespace      MSox
// @description    Removes need to enter captcha info.
// @include        http://nejib770241.meinbrutalo.de/
// ==/UserScript==

(function(){
	var string = 'i=oy2%3A_cty2%3A_hy11%3Anejib770241y2%3A_mi9787684g&k'
	var e = document.getElementById('swf_create_form');
	if(e)
		e.innerHTML='<embed type="application/x-shockwave-flash" src="http://data.meinbrutalo.de/swf/uc.swf?v=17" id="create_form" name="create_form" bgcolor="#FAF8C3" quality="high" menu="false" wmode="transparent" allowscriptaccess="always" flashvars="__file=http://data.meinbrutalo.de/swf/create_form_versus.swf?v=21&amp;__key=http://data_labrute_fr/swf_key&amp;lang=en&amp;path=http://data.meinbrutalo.de/swf/&amp;lang=en&amp;'+string+'bv=http://data.meinbrutalo.de/img/en/btn_valb.gif&amp;bvo=http://data.meinbrutalo.de/img/en/btn_valb_over.gif" scale="noscale" height="380" width="250">'

})();