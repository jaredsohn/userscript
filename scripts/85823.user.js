// ==UserScript==
// @name           noob_INC Viewer Addon
// @description    Adds Button for EV-URL to LoU
// @namespace      AmpliDude + Brindarion (sorry for destroying the script xD)
// @include        http://prodgame*.lordofultima.com/*/index.aspx*
// @version        0.1a
// ==/UserScript==

// TODO: CLEAN

(function(){
   // ***** GM_getValue and GM_setValue emulation in Chrome / Opera
   // Chrome, source: userscripts.org
   function cGetValue(name, def) {var s=localStorage.getItem(name); return (s=="undefined" || s=="null") ? def : s};
   function cSetValue(name, value) {return localStorage.setItem(name, value)};

   // Opera, by TarquinWJ
   function oSetValue( cookieName, cookieValue, lifeTime ) {
      if( !cookieName ) { return; }
      if( lifeTime == "delete" ) { lifeTime = -10; } else { lifeTime = 31536000; }
      document.cookie = escape( cookieName ) + "=" + escape( getRecoverableString( cookieValue ) ) +
         ";expires=" + ( new Date( ( new Date() ).getTime() + ( 1000 * lifeTime ) ) ).toGMTString() + ";path=/";
   }

   function oGetValue( cookieName, oDefault ) {
      var cookieJar = document.cookie.split( "; " );
      for( var x = 0; x < cookieJar.length; x++ ) {
         var oneCookie = cookieJar[x].split( "=" );
         if( oneCookie[0] == escape( cookieName ) ) {
            try {
               eval('var footm = '+unescape( oneCookie[1] ));
            } catch(e) { return oDefault; }
            return footm;
         }
      }
      return oDefault;
   }
   //
   
   var isGM = (typeof GM_getValue != 'undefined' && typeof GM_getValue('a','b') != 'undefined');
   
   if (window.opera != undefined) {
      GM_getValue = oGetValue;
      GM_setValue = oSetValue;
   } else if (!isGM) {
      // gah! Chrome does not support DOMAttrModified, workaround
      var LT_chDiv = document.createElement('div');
      LT_chDiv.innerHTML = "12345";
      LT_chDiv.id = "LTchromeDiv";
      LT_chDiv.style.display = "none";
      LT_chDiv.addEventListener("DOMCharacterDataModified", saveGlobalVars, false);
      document.body.appendChild(LT_chDiv);
      
      GM_getValue = cGetValue;
      GM_setValue = cSetValue;
   }

   // ***** globalVars Exchange Between GM And Website ***** //
   var gv = null;
      gv = GM_getValue("globalVars");
      
   var inp = document.createElement('input');
      inp.type = 'hidden';
      inp.id = "LTglobalVars";
      inp.value = gv;
      inp.addEventListener("DOMAttrModified", saveGlobalVars, false);
   document.body.appendChild(inp);
   
   function saveGlobalVars() {
      gv = document.getElementById("LTglobalVars").value;
      setTimeout(function() {
         GM_setValue("globalVars", gv);
      }, 0);
   }

   // ***** Lou Tweak Main Function ***** //
   var LT_mainFunction = function(){
      var a;
      var srvBar;
      window.setTimeout(checkIfLoaded, 1000);

      // ***** Check if the app has loaded ***** //
      function checkIfLoaded() {
         if (qx.$$domReady == true) {
            a = qx.core.Init.getApplication(); // application
            if (a) {

               tweakLoU();
            }
            else
               window.setTimeout(checkIfLoaded, 1000);
         } else {
            window.setTimeout(checkIfLoaded, 1000);
         }
      }
   
      function tweakLoU() {
try {         
         srvBar = a.serverBar;
         if (!srvBar) {
            window.setTimeout(tweakLoU, 1000);
            return;
         }
         // ***** LoU Tweak Options Button ***** //
         var optionsButton = new qx.ui.form.Button("EV");
            optionsButton.set({width: 30, appearance: "button-text-small", toolTipText: "Click to open Empire Viewer"});
            optionsButton.addListener("click", evViewerURL, false);
            srvBar._add(optionsButton, {top: 2, left: 430});
}catch(e) {
   if (typeof console != 'undefined') console.log(e);
   else if (window.opera) opera.postError(e);
   else GM_log(e);
}
      } // tweakLoU

      // ***** Open Empire Viewer ***** //
      function evViewerURL() {
         var evViewerText; 
         urlprep = location.href.replace(/#/g,'');
         evViewertext = 'http://daniii.eu/empire/l.php?s='+urlprep+'?sessionId='+webfrontend.net.CommandManager.getInstance().getSessionGuid();
         window.open(evViewertext);
       }

   }

   // injecting, because there seem to be problems when creating game inteface with unsafeWindow
   var louTweakScript = document.createElement("script");
      txt = LT_mainFunction.toString();
      if (window.opera != undefined)
         txt = txt.replace(/</g,"&lt;"); // rofl
      louTweakScript.innerHTML = "(" + txt + ")();";
      louTweakScript.type = "text/javascript";
   document.getElementsByTagName("head")[0].appendChild(louTweakScript);
   
   // by TarquinWJ
   if (window.opera) {
      window._content = window;

      function getRecoverableString(oVar,notFirst) {
         var oType = typeof(oVar);
         if( ( oType == 'null' ) || ( oType == 'object' && !oVar ) ) {
            //most browsers say that the typeof for null is 'object', but unlike a real
            //object, it will not have any overall value
            return 'null';
         }
         if( oType == 'undefined' ) { return 'window.uDfXZ0_d'; }
         if( oType == 'object' ) {
            //Safari throws errors when comparing non-objects with window/document/etc
            if( oVar == window ) { return 'window'; }
            if( oVar == document ) { return 'document'; }
            if( oVar == document.body ) { return 'document.body'; }
            if( oVar == document.documentElement ) { return 'document.documentElement'; }
         }
         if( oVar.nodeType && ( oVar.childNodes || oVar.ownerElement ) ) { return '{error:\'DOM node\'}'; }
         if( !notFirst ) {
            Object.prototype.toRecoverableString = function (oBn) {
               if( this.tempLockIgnoreMe ) { return '{\'LoopBack\'}'; }
               this.tempLockIgnoreMe = true;
               var retVal = '{', sepChar = '', j;
               for( var i in this ) {
                  if( i == 'toRecoverableString' || i == 'tempLockIgnoreMe' || i == 'prototype' || i == 'constructor' ) { continue; }
                  if( oBn && ( i == 'index' || i == 'input' || i == 'length' || i == 'toRecoverableObString' ) ) { continue; }
                  j = this[i];
                  if( !i.match(basicObPropNameValStr) ) {
                     //for some reason, you cannot use unescape when defining peoperty names inline
                     for( var x = 0; x < cleanStrFromAr.length; x++ ) {
                        i = i.replace(cleanStrFromAr[x],cleanStrToAr[x]);
                     }
                     i = '\''+i+'\'';
                  } else if( window.ActiveXObject && navigator.userAgent.indexOf('Mac') + 1 && !navigator.__ice_version && window.ScriptEngine && ScriptEngine() == 'JScript' && i.match(/^\d+$/) ) {
                     //IE mac does not allow numerical property names to be used unless they are quoted
                     i = '\''+i+'\'';
                  }
                  retVal += sepChar+i+':'+getRecoverableString(j,true);
                  sepChar = ',';
               }
               retVal += '}';
               this.tempLockIgnoreMe = false;
               return retVal;
            };
            Array.prototype.toRecoverableObString = Object.prototype.toRecoverableString;
            Array.prototype.toRecoverableString = function () {
               if( this.tempLock ) { return '[\'LoopBack\']'; }
               if( !this.length ) {
                  var oCountProp = 0;
                  for( var i in this ) { if( i != 'toRecoverableString' && i != 'toRecoverableObString' && i != 'tempLockIgnoreMe' && i != 'prototype' && i != 'constructor' && i != 'index' && i != 'input' && i != 'length' ) { oCountProp++; } }
                  if( oCountProp ) { return this.toRecoverableObString(true); }
               }
               this.tempLock = true;
               var retVal = '[';
               for( var i = 0; i < this.length; i++ ) {
                  retVal += (i?',':'')+getRecoverableString(this[i],true);
               }
               retVal += ']';
               delete this.tempLock;
               return retVal;
            };
            Boolean.prototype.toRecoverableString = function () {
               return ''+this+'';
            };
            Date.prototype.toRecoverableString = function () {
               return 'new Date('+this.getTime()+')';
            };
            Function.prototype.toRecoverableString = function () {
               return this.toString().replace(/^\s+|\s+$/g,'').replace(/^function\s*\w*\([^\)]*\)\s*\{\s*\[native\s+code\]\s*\}$/i,'function () {[\'native code\'];}');
            };
            Number.prototype.toRecoverableString = function () {
               if( isNaN(this) ) { return 'Number.NaN'; }
               if( this == Number.POSITIVE_INFINITY ) { return 'Number.POSITIVE_INFINITY'; }
               if( this == Number.NEGATIVE_INFINITY ) { return 'Number.NEGATIVE_INFINITY'; }
               return ''+this+'';
            };
            RegExp.prototype.toRecoverableString = function () {
               return '\/'+this.source+'\/'+(this.global?'g':'')+(this.ignoreCase?'i':'');
            };
            String.prototype.toRecoverableString = function () {
               var oTmp = escape(this);
               if( oTmp == this ) { return '\''+this+'\''; }
               return 'unescape(\''+oTmp+'\')';
            };
         }
         if( !oVar.toRecoverableString ) { return '{error:\'internal object\'}'; }
         var oTmp = oVar.toRecoverableString();
         if( !notFirst ) {
            //prevent it from changing for...in loops that the page may be using
            delete Object.prototype.toRecoverableString;
            delete Array.prototype.toRecoverableObString;
            delete Array.prototype.toRecoverableString;
            delete Boolean.prototype.toRecoverableString;
            delete Date.prototype.toRecoverableString;
            delete Function.prototype.toRecoverableString;
            delete Number.prototype.toRecoverableString;
            delete RegExp.prototype.toRecoverableString;
            delete String.prototype.toRecoverableString;
         }
         return oTmp;
      }
      var basicObPropNameValStr = /^\w+$/, cleanStrFromAr = new Array(/\\/g,/'/g,/"/g,/\r/g,/\n/g,/\f/g,/\t/g,new RegExp('-'+'->','g'),new RegExp('<!-'+'-','g'),/\//g), cleanStrToAr = new Array('\\\\','\\\'','\\\"','\\r','\\n','\\f','\\t','-\'+\'->','<!-\'+\'-','\\\/');
   }
   
})();