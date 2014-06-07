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
		e.innerHTML='<OBJECT id=create_form classid=clsid:D27CDB6E-AE6D-11cf-96B8-444553540000 width=250 height=380><PARAM NAME="Movie" VALUE="http://data.elbruto.es/swf/uc.swf?v=15"><PARAM NAME="BGColor" VALUE="FAF8C3"><PARAM NAME="Quality" VALUE="High"><PARAM NAME="Menu" VALUE="0"><PARAM NAME="WMode" VALUE="Transparent"><PARAM NAME="AllowScriptAccess" VALUE="always"><PARAM NAME="FlashVars" VALUE="__file=http://data.elbruto.es/swf/create_form_versus.swf?v=21&__key=http://data_labrute_fr/swf_key&lang=es&path=http://data.elbruto.es/swf/&amp;lang=es&amp;'+string+';bv=http://data.elbruto.es/img/es/btn_valb.gif&amp;bvo=http://data.elbruto.es/img/es/btn_valb_over.gif"><PARAM NAME="Scale" VALUE="NoScale"></OBJECT>';

})();

