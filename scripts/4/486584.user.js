// ==UserScript==
// @id             lookupDictionary.com
// @name           lookupDictionary.com
// @version        1.0
// @namespace      tag:lieutar@gmail.com,2014
// @author         lieutar
// @description    The plugin of PlagableLookuper that lookups dictionary.com
// @include        *
// @run-at         document-end
// ==/UserScript==


var ICON_URL = 'https://lh4.googleusercontent.com/-f-jfwavZ5Fc/AAAAAAAAAAI/AAAAAAAAAJw/5cMQEekp2MU/photo.jpg?sz=16';



var addContent = function(area, e){
  var rm = function(a){
    a.parentNode.removeChild(a);
  };
  this.xex( './/a[@class="more" or @class = "less"]',e ).forEach(rm);
  this.xex( './/div[@id="rltqns"]',e).forEach(rm);
  this.xex( './/a', e).forEach(
    function(a){
      a.target = '_blank';
      var href = a.getAttribute('href');
      if(!href) return;
      if(href.match(/^https?:\/\//)) return;
      if(href.match(/^\//)){
        a.href = 'http://dictionary.reference.com' + href;
        return;
      }
      a.href = 'http://dictionary.reference.com/browse/' + href;
    }
  );
  area.appendChild(e);
};


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
          name: 'dictionary.com',
          icon: ICON_URL,
          action: function(str){
            var self = this;
            var url = 'http://dictionary.reference.com/browse/'+
              encodeURIComponent(str);

            GM_xmlhttpRequest(
              {
	            method: 'get',
	            url: url,
	            onload : function (req) {
                  var a = self.node(
                    'a',
                    {href: url,
                     target: '_blank'},
                    'go to Dictionary.com'
                  );
                  var area = self.popup(a);
		          var t = self.node('div');
		          t.innerHTML = req.responseText;
                  self.xex('.//div[@class="luna-Ent"]', t).forEach(
                    function(e){
                      addContent.apply(self,[area,e]);
                    });
	            }
	          });
          }
        }
      );
    })();
})();



