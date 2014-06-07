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
	var string = "i=oy2%3A_cfy2%3A_hy7%3Arandrewy2%3A_mi6588328g&amp;k=af9d4b6c&amp";
	var e = document.getElementById("swf_create_form");

	if(e)
		e.innerHTML="<object id="create_form" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" height="380" width="250"><param name="Movie" value="http://data.elbruto.es/swf/uc.swf?v=15"><param name="BGColor" value="FAF8C3"><param name="Quality" value="High"><param name="Menu" value="0"><param name="WMode" value="Transparent"><param name="AllowScriptAccess" value="always"><param name="FlashVars" value="__file=http://data.elbruto.es/swf/create_form_versus.swf?v=21&amp;__key=http://data_labrute_fr/swf_key&amp;lang=es&amp;path=http://data.elbruto.es/swf/&amp;lang=es&amp;"+string+";bv=http://data.elbruto.es/img/es/btn_valb.gif&amp;bvo=http://data.elbruto.es/img/es/btn_valb_over.gif"><param name="Scale" value="NoScale"></object>";

})();

