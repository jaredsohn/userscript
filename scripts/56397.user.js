// ==UserScript==
// @name           elbruto
// @description    nop
// @include        http://elbruto.es/
// @language       English
// @author         randrew
// @version        1.0
// @copyright      ----
// ==/UserScript==
(function(){
	var string = 'i=oy2%3A_cfy2%3A_hy7%3Arandrewy2%3A_mi6588328g&amp;k=af9d4b6c&amp';
	var e = document.getElementById('swf_create_form');

	if(e)
		e.innerHTML='<div class="swf" id="swf_create_form"><div style="overflow: visible; padding-left: 250px; display: block; position: relative; width: 0px; height: 0px; left: 0px; top: 0px; z-index: 65535; opacity: 0.5;"/><embed width="250" height="380" scale="noscale" flashvars="__file=http://data.elbruto.es/swf/create_form_versus.swf?v=21&amp;__key=http://data_labrute_fr/swf_key&amp;lang=es&amp;path=http://data.elbruto.es/swf/&amp;lang=es&amp;'+string+';bv=http://data.elbruto.es/img/es/btn_valb.gif&amp;bvo=http://data.elbruto.es/img/es/btn_valb_over.gif" allowscriptaccess="always" wmode="transparent" menu="false" quality="high" bgcolor="#FAF8C3" name="create_form" id="create_form" src="http://data.elbruto.es/swf/uc.swf?v=15" type="application/x-shockwave-flash"/></div>';

})();

