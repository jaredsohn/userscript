// ==UserScript==
// @id             lookupPlugExcite
// @name           lookupPlugExcite
// @version        1.0
// @namespace      tag:lieutar@gmail.com,2014
// @author         lieutar
// @description    
// @include        *
// @run-at         document-end
// ==/UserScript==



(function(){
   var count = 0;
   (function(){
      if(!unsafeWindow._plugableLookuper_register_){
        if(count++ > 10) return;
        setTimeout(arguments.callee, 500);
        return;
      }
      unsafeWindow._plugableLookuper_register_(
        {
          name: "excite",
          icon: 'http://www.exblog.jp/favicon.ico',
          action: function(selection){
            var self = this;
            var query = this.query({
                                     est_wb_jp: '',
                                     est_before : '',
                                     before: String(selection),
                                     wb_lp: 'ENJA'
                                   });
            GM_xmlhttpRequest(
              {
                method: 'post',
                url: 'http://www.excite.co.jp/world/english/',
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded"
                },
                data: query,
                onload: function(req){
                  var t = self.node('div');
                  var m = String(req.responseText).match(
                      /<textarea [^>]*?name="after"[^>]*>([^<]*)<\/textarea>/i
                  );
                  t.innerHTML = String(m[1]).replace(/\n/g,'<br/>');
                  var area= self.popup(t);
                }
              });
          }
        }
      );
    })();
})();