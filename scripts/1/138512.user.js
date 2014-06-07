// ==UserScript==
// @name   LoUAntiCastle customization
// @description remove any castle customization from region view
// @namespace   LoUAntiCastle
// @include     http://prodgame*.lordofultima.com/*/index.aspx*
// @version     1.2
// @grant       none
// ==/UserScript==
(function () {
  /*
   * Changelog
   * 11/18/2012
   * 1.0   - initial
   * 1.1   - add grand option
   * 1.2   - remove sizzlemctwizzle.com while its broken
   */
  var main = function () {
    var LoUAntiCastleVersion = '1.2';
    
    function debug(msg) {
      msg = (msg instanceof Error && msg.stack) ? msg.stack : String(msg);
      if (window.console && typeof console.log === "function") {
        console.log('LoUAntiCastle: ' + msg);
      }
    }
    
    function checkDependencies() {
      var dependencies = [
        FarmServiceURL],
      i = dependencies.length,
      checkPoint = true;
      // check (in)dependencies
      while (i--) {
        if (!dependencies[i]) {
          checkPoint = false;
        }
      }
      return checkPoint;
    }
    
    /*
     * @Core
     * main script that defines the plugin
     */
    var createTweak = function () {
      qx.Class.define("LoUAntiCastle.main", {
        // let's create a new instance for EXT additional tweaks.
        type : "singleton",
        extend : qx.core.Object,
        members : {
          initialize : function () {
            this.remover();
          },
          remover : function () {
            FarmServiceURL = null;
            webfrontend.gui.CastleCustomization.Util._getCastlePreviewImage = webfrontend.gui.CastleCustomization.Util.getCastlePreviewImage;
            webfrontend.gui.CastleCustomization.Util.getCastlePreviewImage = this.getCastlePreviewImage;
          },
          getCastlePreviewImage : function () {
            return "http://prodcdngame.lordofultima.com/cdn/363511/resource/webfrontend/ui/menues/shop/customized_castle_preview.png";
          }
        }
      });
      
      /* GPL header - I put this here out of way, even that its used in the code above or not */
      // var GPL = "This program is free software: you can redistribute it and/or modify" + " it under the terms of the GNU General Public License as published by" + " the Free Software Foundation, either version 3 of the License, or" + " (at your option) any later version." + "\n\n" + "This program is distributed in the hope that it will be useful," + " but WITHOUT ANY WARRANTY; without even the implied warranty of" + " MERCHANTABILITY or FITNESS FOR A EXTRTICULAR PURPOSE.  See the" + " GNU General Public License for more details." + "\n\n" + "You should have received a copy of the GNU General Public License" + " along with this program. If not, see http://www.gnu.org/licenses/.";
    };
    /* startup script to launch the tweak */
    var startup = function () {
      if (typeof qx === 'undefined') {
        window.setTimeout(startup, 1000);
      } else {
        if (checkDependencies()) {
          if (!startup.initialized) {
            startup.initialized = true;
            createTweak();
            LoUAntiCastle.main.getInstance().initialize();
          }
        } else {
          window.setTimeout(startup, 2000);
        }
      }
    };
    window.setTimeout(startup, 1000);
  };
  
  function debug(e) {
    if (window.console && typeof console.log === "function") {
      console.log('LoUAntiCastle: ' + e);
    }
  }
  /* inject this script into the website */
  function inject() {
    debug('Injecting script');
    var script = document.createElement("script"),
    txt = main.toString();
    if (typeof window.opera !== 'undefined') {
      txt = txt.replace(/</g, "<");
    }
    script.innerHTML = "(" + txt + ")();";
    script.type = "text/javascript";
    document.getElementsByTagName("head")[0].appendChild(script);
  }
  if (/lordofultima\.com/i.test(document.domain)) {
    inject();
  }
}());