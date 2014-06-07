// ==UserScript==
// @name           cookpad_tukurepo
// @namespace      http://d.hatena.ne.jp/samurai20000/
// @include        http://cookpad.com/*
// ==/UserScript==

(function(){
     function get_tukurepo(elem) {
         if (!elem) {
             elem = document;
         }
         
         var recipe_titles = Array.slice($X('.//a[starts-with(@class, "recipe-title")]', elem));
         recipe_titles.forEach(function(title) {
             GM_xmlhttpRequest({
                 method: 'get',
                 url   : title.href,
                 onload: function(res) {
                     var matches = res.responseText.match(/<span class="tsukurepo_count">(\d+)<\/span>/);
                     var num = (matches) ? matches[1] : 0;
                     title.innerHTML += "("+ num + "件)";
                 }
             });
         });
     }

     get_tukurepo();
     if (window.AutoPagerize) {
         if (window.AutoPagerize.addFilter) {
             window.AutoPagerize.addFilter(function(docs) {
                 docs.forEach(get_tukurepo);
             });
         }
     }

     // utility thanks to os0x
     // very simple version of $X
     // $X(exp);
     // $X(exp, context, resolver, XPathResult.NUMBER_TYPE).numberValue;
     // @source http://gist.github.com/29681.txt
     function $X (exp, context, resolver, result_type) {
         context || (context = document);
         var Doc = context.ownerDocument || context;
         var result = Doc.evaluate(exp, context, resolver, result_type || XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
         if (result_type) return result;
         for (var i = 0, len = result.snapshotLength, res = new Array(len); i < len; i++) {
             res[i] = result.snapshotItem(i);
         }
         return res;
     }
})();

