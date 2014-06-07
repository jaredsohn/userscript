// ==UserScript==
// @name           Capcha Killer V-2.0
// @namespace      Atordan
// @description    Removes need to enter captcha info.
// @include        http://[insert brute name].elbruto.es/
// ==/UserScript==

(function(){
	var string = 'i=[insert your string here]...'
	var e = document.getElementById('swf_create_form');
	if(e)
		e.innerHTML='<embed type="application/x-shockwave-flash" src="http://data.elbruto.es/swf/uc.swf?v=15" id="create_form" name="create_form" bgcolor="#FAF8C3" quality="high" menu="false" wmode="transparent" allowscriptaccess="always" flashvars="__file=http://data.elbruto.es/swf/create_form_versus.swf?v=21&amp;__key=http://data_labrute_fr/swf_key&amp;lang=en&amp;path=http://data.elbruto.es/swf/&amp;lang=en&amp;'+string+'bv=http://data.elbruto.es/img/en/btn_valb.gif&amp;bvo=http://data.elbruto.es/img/en/btn_valb_over.gif" scale="noscale" height="380" width="250">'

})();