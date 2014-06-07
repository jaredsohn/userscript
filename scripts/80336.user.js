// ==UserScript==
// @name           dfgfdg
// @namespace      Atordan
// @description    Removes need to enter captcha info.
// @include        http://Nejib770241.meinbrutalo.de/
// ==/UserScript==

(function(){


   //*************************************************************************************************************************
   // TO BE EDITED BY THE USER
   //*************************************************************************************************************************
   //Getting the brute URL name and defining the keys when there are less than 100 pupils
   var thebrute=document.location.host
   //var thebrute=thebrute.replace('.'+theurl,"");
   switch(thebrute){
      case 'Nejib770241.meinbrutalo.de':
         thekey='oy2%3A_cty2%3A_hy11%3Anejib770241y2%3A_mi4144300g&k=571b2b6c&bv';
         break;
      case 'yolio23.labrute.fr':
         thekey='oy2%3A_cfy2%3A_hy7%3Ayolio23y2%3A_mi4712980g&k=b8dd4b6c&bv"';
         break;
   }
   //*************************************************************************************************************************


   
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



   /*
   //Getting the current brute key - does not work because the current key changes as a function of the number of pupils: if there are more than 100 it is a new key with captcha, otherwise it is the good key
   var thekey='aaa';
   var s1=";i=";
   var s2="bv=";
   var d=document.getElementById('swf_create_form').innerHTML;
   var p1=d.search(s1);
   var p2=d.search(s2);
   if(p1 != -1 || p2 != -1){thekey=d.substring(p1+3,p2)};
   thekey=thekey.replace(/amp;/g,"")
   thekey=thekey+'bv'
   */
   
   
   //Captcha bypass
   var e = document.getElementById('swf_create_form');
   if(e)
      e.innerHTML='<embed type="application/x-shockwave-flash" src="http://data.'+theurl+'/swf/uc.swf?v='+v1+'" id="create_form" name="create_form" bgcolor="#FAF8C3" quality="high" menu="false" wmode="transparent" allowscriptaccess="always" flashvars="__file=http://data.'+theurl+'/swf/create_form_versus.swf?v='+v2+'&__key=http://data_labrute_fr/swf_key&lang='+lng+'&path=http://data.'+theurl+'/swf/&lang='+lng+'&i='+thekey+'bv=http://data.'+theurl+'/img/'+lng+'/btn_valb.gif&bvo=http://data.'+theurl+'/img/'+lng+'/btn_valb_over.gif" scale="noscale" height="380" width="250">'


})();