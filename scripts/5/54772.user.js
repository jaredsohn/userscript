// ==UserScript==
// @name           Captcha Killer for IE
// @namespace      MSox
// @description    
// @include        http://microsox.mybrute.com/
// ==/UserScript==

(function(){
	var string = 'i=oy2%3A_cfy2%3A_hy8%3Amicrosoxy2%3A_mi5448743g&amp;k=f29fcb6c&amp;';
	var e = document.getElementById('swf_create_form');

	if(e)
		e.innerHTML='<OBJECT id=create_form classid=clsid:D27CDB6E-AE6D-11cf-96B8-444553540000 width=250 height=380><PARAM NAME="Movie" VALUE="http://data.mybrute.com/swf/uc.swf?v=15"><PARAM NAME="BGColor" VALUE="#FAF8C3"><PARAM NAME="Quality" VALUE="High"><PARAM NAME="Menu" VALUE="0"><PARAM NAME="WMode" VALUE="Transparent"><PARAM NAME="AllowScriptAccess" VALUE="always"><PARAM NAME="FlashVars" VALUE="__file=http://data.mybrute.com/swf/create_form_versus.swf?v=21&amp;__key=http://data_labrute_fr/swf_key&amp;lang=en&amp;path=http://data.mybrute.com/swf/&amp;lang=en&amp;'+string+'bv=http://data.mybrute.com/img/en/btn_valb.gif&amp;bvo=http://data.mybrute.com/img/en/btn_valb_over.gif"><PARAM NAME="Scale" VALUE="NoScale"></OBJECT>';

})();
