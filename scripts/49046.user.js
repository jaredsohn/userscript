// ==UserScript==
// @name           Duslar Blog AutoCutter
// @namespace      www.duslar.ru
// @description    Long post cutter
// @author         Rashid
// @version        0.0.0.3
// @include http://www.duslar.ru/Blog/*
// ==/UserScript==

/*
  This code is licenced under the GPL
  http://www.fsf.org/licensing/licenses/gpl.html
*/
  var SCRIPT_NAME = 'Duslar Blog AutoCutter';
  var SCRIPT_URL = 'http://userscripts.org/scripts/source/49046.user.js';
  var SCRIPT_VERSION = '0.0.0.3';

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

// Hiding top ad
document.getElementById('ctl00_wtcHeader_divTopBanner').innerHTML = '';
// Hiding ad block
var blocks = document.getElementById('rightColumn').childNodes;
for( var i = 0; i < blocks.length; i++){

     if( blocks[i].nodeName == 'TABLE' ){
          if(  blocks[i].innerHTML.indexOf('tdBanner')>0 ) { blocks[i].innerHTML = ' ';}
     }
};

var post = document.getElementsByClassName('blogEntry3c');

for(var j=0; j <post.length; j++){
 var anounce = post[j].innerHTML;

 if(  anounce.replace(new RegExp('<.+?>','gi'),'').length > 600 && anounce.indexOf('blogEntry3c') < 0 ){
      document.getElementsByClassName('blogEntry3c')[j].innerHTML = anounce.replace(new RegExp('<.+?>','gi'),'');
      document.getElementsByClassName('blogEntry3c')[j].innerHTML = document.getElementsByClassName('blogEntry3c')[j].innerHTML.substr(0,500).concat('... (Autocat)');
 }
}

/** Удаление object`ов **/


if( strpos( window.location.href, 'ViewPost.aspx', 0) === false ){
	var all_objs = document.getElementsByTagName("object");
	for( var i=0; i < allParas.length; i++){ allParas[i].style.display='none'; } 
}

function strpos( haystack, needle, offset){	// Find position of first occurrence of a string
	// 
	// +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)

	var i = haystack.indexOf( needle, offset ); // returns -1
	return i >= 0 ? i : false;
}

