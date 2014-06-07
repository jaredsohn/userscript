// ==UserScript==
// @name          	SUPERBRUTO
// @namespace      	http://cute.meinbrutalo.de/cellule/
// @version        	1.0.0
// @author        	MSox - Modified by xerox
// @description    	Removes captcha for given brutes on MyBrute LaBrute ElBrute MeinBrutalo.
// @include         http://*.meinbrutalo.de/
// @include         http://*.labrute.fr/
// @include         http://*.mybrute.com/
// @include         http://*.elbruto.es/
// ==/UserScript==

//*************************************************************************************************************************************
// SEE preguntarme en xat repartidores o en el foro de repartidores,  http://xat.com/chat/room/93430871/
//*************************************************************************************************************************************

(function(){

   //Getting the brute URL name and defining the keys when there are less than 100 pupils
   var thebrute=document.location.host
   var includedpage='1';
   switch(thebrute){
      //*************************************************************************************************************************
	  // TO BE EDITED BY THE USER
	  //*************************************************************************************************************************
      case 'vilker71.meinbrutalo.de':
         thekey='oy2%3A_cfy2%3A_hy8%3Avilker71y2%3A_mi400426g&k=76ffcb6c&bv';
         break;
      case 'rosanana.elbruto.es':
         thekey='oy2%3A_cty2%3A_hy8%3Arosananay2%3A_mi5548897g&k=243eab6c&bv';
         break;
      case 'gegitediqe.meinbrutalo.de':
         thekey='oy2%3A_cfy2%3A_hy10%3Agegitediqey2%3A_mi769688g&k=6e7a4b6c&bv';
         break;
      case 'mmlc02vemzky.meinbrutalo.de':
         thekey='oy2%3A_cfy2%3A_hy12%3Ammlc02vemzkyy2%3A_mi1347649g&k=aaea4b6c&bv';
         break;
      case '8ncaqp1ejf.elbruto.es':
         thekey='oy2%3A_cfy2%3A_hy10%3A8ncaqp1ejfy2%3A_mi3702274g&k=e1da4b6c&bv';
         break;
      case 'ay-eershr.elbruto.es':
         thekey='oy2%3A_cfy2%3A_hy9%3Aay-eershry2%3A_mi8933276g&k=54df4b6c&bv';
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