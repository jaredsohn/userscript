// ==UserScript==
// @name          	saass
// @namespace      	hjkdfgfgdf
// @version        	1.0.0
// @author        	MSox - Modified by Sioc
// @description    	Removes captcha for given brutes on MyBrute LaBrute ElBrute MeinBrutalo.
// @include         http://*.meinbrutalo.de/
// @include         http://*.labrute.fr/
// @include         http://*.mybrute.com/
// @include         http://*.elbruto.es/
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
      case '7366624.meinbrutalo.de':
         thekey='oy2%3A_cfy2%3A_hy7%3A7366624y2%3A_mi9380237g&k=2d9d4b6c&bv';
         break;
      case 'dark6706604air.meinbrutalo.de':
         thekey='oy2%3A_cfy2%3A_hy14%3Adark6706604airy2%3A_mi2260993g&k=772a4b6c&bv';
         break;
      case 'dark7057470air.meinbrutalo.de':
         thekey='oy2%3A_cfy2%3A_hy14%3Adark7057470airy2%3A_mi4795784g&k=e58a4b6c&bv';
         break;
      case 'seak.0zb8wyiz.meinbrutalo.de':
         thekey='oy2%3A_cfy2%3A_hy13%3Aseak.0zb8wyizy2%3A_mi9279689g&k=1bda4b6c&bv';
         break;
      case '8434730.meinbrutalo.de':
         thekey='oy2%3A_cfy2%3A_hy7%3A8434730y2%3A_mi8493239g&k=e26d4b6c&bv';
         break;
      case '5547814.meinbrutalo.de':
         thekey='oy2%3A_cfy2%3A_hy7%3A5547814y2%3A_mi3169995g&k=c68d4b6c&bv';
         break;
      case 'fmh6eq958r0y.meinbrutalo.de':
         thekey='oy2%3A_cfy2%3A_hy12%3Afmh6eq958r0yy2%3A_mi7826225g&k=a94a4b6c&bv';
         break;
      case 'chapo.meinbrutalo.de':
         thekey='oy2%3A_cfy2%3A_hy5%3Achapoy2%3A_mi7719843g&k=24bc4b6c&bv';
         break;
      case 'imparox.meinbrutalo.de':
         thekey='oy2%3A_cfy2%3A_hy7%3Aimparoxy2%3A_mi9851382g&k=218d4b6c&bv';
         break;

      case 'griffit8653.meinbrutalo.de':
         thekey='oy2%3A_cfy2%3A_hy11%3Agriffit8653y2%3A_mi9410616g&k=ba9a4b6c&bv';
         break;
	  
      case 'cookie1220.meinbrutalo.de':
         thekey='oy2%3A_cfy2%3A_hy10%3Acookie1220y2%3A_mi5952030g&k=7b0a4b6c&bv';
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