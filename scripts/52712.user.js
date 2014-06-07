// ==UserScript==
// @name           HabraUserInfo
// @namespace      usernameinfo
// @description    отображение информации о пользователи при наведении на его ник
// @author         ZhenO
// @source         http://userscripts.org/scripts/show/52712
// @version        0.0.0.1
// @include 	   http://habrahabr.ru/*
// @include        http://habrahabr.ru/blogs/*
// @include        http://habrahabr.ru/company/*
// @include        http://*.habrahabr.ru/blog/*



// ==/UserScript==
  var SCRIPT_NAME = 'HabraUserInfo';
  var SCRIPT_URL = 'http://userscripts.org/scripts/source/52712.user.js';
  var SCRIPT_VERSION = '0.0.0.1'; // DO NOT FORGET TO UPDATE!!!

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
        if ((now.getTime() - lastCheck) > 86400000) {
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
                if (response.status == 206) {
                  var matches = response.responseText.match(/^\s*\/\/\s*\@version\s+(.+?)\s*$/m);
                  if (matches != null) {
                    var currentVersion = sender.getValue('version', '0.0.0.1');
                    if (currentVersion != matches[1]) {
                      if (confirm('Доступна новая версия ' + SCRIPT_NAME + '. Хотите скачать?')) {
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
  
  //Real code goes here!