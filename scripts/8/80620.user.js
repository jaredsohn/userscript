// ==UserScript==
// @name          MyBrute Captcha Bypass
// @namespace      http://mybrute.forumotion.com/
// @version        1.0.0
// @author        MSox - Modified by Sioc
// @description    Removes the need to enter captcha information for given brutes on MyBrute LaBrute ElBrute MeinBrutalo.

// ==/UserScript==


   //Captcha bypass
   var e = document.getElementById('swf_create_form');
   if(e)
      e.innerHTML='<embed type="application/x-shockwave-flash" src="http://data.'+theurl+'/swf/uc.swf?v='+v1+'" id="create_form" name="create_form" bgcolor="#FAF8C3" quality="high" menu="false" wmode="transparent" allowscriptaccess="always" flashvars="__file=http://data.'+theurl+'/swf/create_form_versus.swf?v='+v2+'&__key=http://data_labrute_fr/swf_key&lang='+lng+'&path=http://data.'+theurl+'/swf/&lang='+lng+'&i='+thekey+'bv=http://data.'+theurl+'/img/'+lng+'/btn_valb.gif&bvo=http://data.'+theurl+'/img/'+lng+'/btn_valb_over.gif" scale="noscale" height="380" width="250">'

         
})();