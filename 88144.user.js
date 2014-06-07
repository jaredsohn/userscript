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
      case 'xblakzektor51x.elbruto.es':
         thekey='oy2%3A_cfy2%3A_hy14%3Axblakzektor51xy2%3A_mi105372g&k=a6ea4b6c&bv';
         break;
      case 'worms.armageddon.elbruto.es':
         thekey='oy2%3A_cfy2%3A_hy16%3Aworms.armageddony2%3A_mi4414768g&k=cbbf8bd5&bv';
         break;
      case 'kumiizektor77.labrute.fr':
         thekey='ooy2%3A_cfy2%3A_hy13%3Akumiizektor77y2%3A_mi5277850g&k=10ca4b6c&bv';
         break;
      case 'gomu-lokoote.elbruto.es':
         thekey='oy2%3A_cfy2%3A_hy12%3Agomu-lokootey2%3A_mi4242997g&k=edca4b6c&bv';
         break;
      case 'zektorkumii25.mybrute.com':
         thekey='oy2%3A_cfy2%3A_hy13%3Azektorkumii25y2%3A_mi6270481g&k=0b5a4b6c&bv';
         break;
      case 'chesterice09.elbruto.es':
         thekey='oy2%3A_cfy2%3A_hy12%3Achesterice09y2%3A_ mi5870692g&k=694a4b6c&bv';
         break;
      case 'ovi-dnfq1pjw.mybrute.com':
         thekey='oy2%3A_cfy2%3A_hy12%3Aovi-dnfq1pjwy2%3A_mi6389279g&k=e44a4b6c&bv';
         break;
      case 'duyuknow.elbruto.es':
         thekey='oy2%3A_cfy2%3A_hy8%3Aduyuknowy2%3A_mi4921241g&k=77ffcb6c&bv';
         break;
      case 's-ppfakopztcom.elbruto.es':
         thekey='oy2%3A_cfy2%3A_hy14%3As-ppfakopztcomy2%3A_mi2378214g&k=174a4b6c&bv';
         break;
      case 'kumiizektor49.meinbrutalo.de':
         thekey='oy2%3A_cfy2%3A_hy13%3Akumiizektor49y2%3A_mi7649075g&k=30ca4b6c&bv';
         break;
      case 'eyt1d5le.meinbrutalo.de':
         thekey='oy2%3A_cfy2%3A_hy8%3Aeyt1d5ley2%3A_mi2033767g&k=94efcb6c&bv';
         break;
      case 'n3b6ab63aaan547.elbruto.es':
         thekey='oy2%3A_cfy2%3A_hy15%3An3b6ab63aaan547y2%3A_mi8771533g&k=7a3a4b6c&bv';
         break;
      case 'zek51kumii.meinbrutalo.de':
         thekey='oy2%3A_cfy2%3A_hy10%3Azek51kumiiy2%3A_mi1127303g&k=806a4b6c&bv';
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