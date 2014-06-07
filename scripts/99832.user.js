// ==UserScript==
// @name          	MyBrute Captcha Bypass
// @namespace      	http://mybrute.forumotion.com/
// @version        	1.0.0
// @author        	MSox - Modified by Sioc
// @description    	Removes captcha for given brutes on MyBrute LaBrute ElBrute MeinBrutalo.
// @include			http://*.meinbrutalo.de/
// @include			http://*.labrute.fr/
// @include			http://*.mybrute.com/
// @include			http://*.elbruto.es/
// ==/UserScript==

//*************************************************************************************************************************************
// SEE http://mybrute.forumotion.com/cheats-scripts-f13/release-mybrute-captcha-bypass-t9334.htm for instructions on how to set this up
//*************************************************************************************************************************************

(function(){

   //Getting the brute URL name and defining the keys when there are less than 100 pupils
   var thebrute=document.location.host
   var includedpage='1';
   switch(thebrute){
      //*************************************************************************************************************************
	  // TO BE EDITED BY THE USER
	  //*************************************************************************************************************************
      case 'kdhsngsv.mybrute.com':
         thekey='oy2%3A_cfy2%3A_hy8%3Akdhsngsvy2%3A_mi7350326g&k=291fcb6c&bv';
         break;
      case 'jsgjnsf.mybrute.com':
         thekey='oy2%3A_cfy2%3A_hy7%3Ajsgjnsfy2%3A_mi7350326g&k=0d3d4b6c&bv';
         break;
      case 'lord-jet23-4s.meinbrutalo.de':
         thekey='oy2%3A_cfy2%3A_hy13%3Alord-jet23-4sy2%3A_mi8019809g&k=869a4b6c&bv';
         break;
      case 'adfgxcs.meinbrutalo.de':
         thekey='oy2%3A_cfy2%3A_hy7%3Aadfgxcsy2%3A_mi8920430g&k=d93d4b6c&bv';
         break;
      case 'iwqjusdhsdjshd.elbruto.es':
         thekey='oy2%3A_cfy2%3A_hy14%3Aiwqjusdhsdjshdy2%3A_mi6546788g&k=162a4b6c&bv';
         break;
      case 'jsgfnsgc.elbruto.es':
         thekey='oy2%3A_cfy2%3A_hy8%3Ajsgfnsgcy2%3A_mi4242997g&k=6bbfcb6c&bv';
         break;
      case 'spikalimety.elbruto.es':
         thekey='oy2%3A_cfy2%3A_hy11%3Aspikalimetyy2%3A_mi9068901g&k=b63a4b6c&bv';
         break;
      case 'macx.meinbrutalo.de':
         thekey='oy2%3A_cfy2%3A_hy4%3Amacxy2%3A_mi4774084g&k=17eccb6c&bv';
         break;
      case 'afdhf.meinbrutalo.de':
         thekey='oy2%3A_cfy2%3A_hy5%3Aafdhfy2%3A_mi4774084g&k=905c4b6c&bv';
         break;
      case 'legen-ah5f9.meinbrutalo.de':
         thekey='oy2%3A_cfy2%3A_hy11%3Alegen-ah5f9y2%3A_mi7896409g&k=591a4b6c&bv';
         break;
	  //*************************************************************************************************************************
      // END OF USER EDIT
      //************************************************************************************************************************* 
      default:
         includedpage='-1';
         break;
   }
   
   //Getting the server with suffix
   var srv=document.location.host.match(/.+\.(.+)\..+/)[1];
   var theurl=srv;
   var v1='1';
   var v2='1';
   var lng='en';
   switch(srv){
      case 'mybrute':
         theurl=theurl+'.com';
         v1='18';
         v2='22';
         lng='en';
         break;
      case 'labrute':
         theurl=theurl+'.fr';
         v1='17';
         v2='22';
         lng='fr';
         break;
      case 'elbruto':
         theurl=theurl+'.es';
         v1='18';
         v2='22';
         lng='es';
         break;
      case 'meinbrutalo':
         theurl=theurl+'.de';
         v1='17';
         v2='22';
         lng='de';
   }

   //Captcha bypass
   var e = document.getElementById('swf_create_form');
   if(includedpage=='1'){if(e)
      e.innerHTML='<embed type="application/x-shockwave-flash" src="http://data.'+theurl+'/swf/uc.swf?v='+v1+'" id="create_form" name="create_form" bgcolor="#FAF8C3" quality="high" menu="false" wmode="transparent" allowscriptaccess="always" flashvars="__file=http://data.'+theurl+'/swf/create_form_versus.swf?v='+v2+'&__key=http://data_labrute_fr/swf_key&lang='+lng+'&path=http://data.'+theurl+'/swf/&lang='+lng+'&i='+thekey+'bv=http://data.'+theurl+'/img/'+lng+'/btn_valb.gif&bvo=http://data.'+theurl+'/img/'+lng+'/btn_valb_over.gif" scale="noscale" height="380" width="250">'
	}
         
})();