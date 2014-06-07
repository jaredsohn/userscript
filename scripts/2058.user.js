/*

Mercado Livre - Direct Link

DESCRIPTION:

http://www.mercadolivre.com.br is an "eBay like" auction and commerce site.

This scrit, based on "boston-dot-com-necn-video--direct-link", changes
some javascript functions to open pages into direct links.

*/

// ==UserScript==
// @name          mercadolivre-dot-com-dot-br--direct-link
// @namespace     http://dunck.us/code/greasemonkey/
// @description   Makes some MercadoLivre <a> tags point directly to pages instead of javascript url
// @include       http://*.mercadolivre.com.br/*
// @include       http://mercadolivre.com.br/*
// ==/UserScript==

(function() {

   function slash(param) { return param.replace(/^\//, ''); }

   // sample link we want to rewrite:
   //    javascript:playVideoClip('plV556598')

   var re1 = /^javascript:h\('(.*)'\)$/;
   var re2 = /^javascript:setPrCategLink\('(.*)'\)$/;
   var re3 = /^javascript:set_page\('(.*)'\)$/;
   var re4 = /^javascript:getItems\('(.*)'\)$/;
   var re_desde1 = /[&]?as_desde=\d+/gi;
   var re_desde2 = /_Desde_\d+/gi;
   var url = 'http://www.mercadolivre.com.br/';
   var anchors = document.getElementsByTagName("A");
   for(var i = 0; i < anchors.length; i++) {
      var anchor = anchors[i];
      if(anchor.href) {
         // "h" function:
         // from: javascript:h('search?as_filter_id=xxxxxxx&as_display_type=G')
         // to..: http://www.mercadolivre.com.br/jm/search?as_filter_id=xxxxxxx&as_display_type=G
         var results = null;
         results = re1.exec(anchor.href);
         if(results) { anchor.href = url + 'jm/' + slash(results[1]); }
         else {
            // "setPrCategLink" function:
            // from: javascript:setPrCategLink('/brasil/ml/l_find.user?as_cust_id=xxxxxxxx')
            // to..: http://www.mercadolivre.com.br/brasil/ml/l_find.user?as_cust_id=xxxxxxxx
            var results = null;
            results = re2.exec(anchor.href);
            if(results) { anchor.href = url + slash(results[1]); }
            else {
               // "set_page(xxx)" function
               // from: http://www.mercadolivre.com.br/brasil/ml/l_user.main?as_qshow=100&as_visual_id=MLI&as_order_id=POINTS_NICK&as_filtro_id=&as_pcia_id=&as_debug=N&as_nickname=&as_filter_id=MLIBRE
               // to..: http://www.mercadolivre.com.br/brasil/ml/l_user.main?as_qshow=100&as_visual_id=MLI&as_order_id=POINTS_NICK&as_filtro_id=&as_pcia_id=&as_debug=N&as_nickname=&as_filter_id=MLIBRE&as_desde=xxx
               var results = null;
               results = re3.exec(anchor.href);
               if(results) {
                  var doc = document.location.href;
                  if (re_desde1.exec(doc))
                     doc = doc.replace(re_desde1,'');
                  if (re_desde2.exec(doc))
                     doc = doc.replace(re_desde2,'');
                  if (doc.indexOf('?') >= 0)
                       anchor.href = doc + '&as_desde=' + slash(results[1]);
                  else if (doc.indexOf('-') >= 0)
                             anchor.href = doc.replace('-', '-_Desde_' + slash(results[1]));
                        else anchor.href = doc.replace('/_', '/_Desde_' + slash(results[1]) + '_');
               } else {
                  // "getItems" function:
                  // from: javascript:getItems('xxxxxx')
                  // to..: "http://www.mercadolivre.com.br/brasil/ml/l_find.user?as_nickname="+encodeURIComponent(xxxxxx)
                  var results = null;
                  results = re4.exec(anchor.href);
                  if(results) { anchor.href = url + 'brasil/ml/l_find.user?as_nickname=' + encodeURIComponent(results[1]); }
               }
            }
         }
      }
   }

})();