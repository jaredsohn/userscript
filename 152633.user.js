// ==UserScript==
// @name   LoUAntiFortuneTeller popup
// @description remove the FortuneTeller popup on startup and the free token nag screen
// @namespace   LoUAntiFortuneTeller 
// @include     http://prodgame*.lordofultima.com/*/index.aspx*
// @version     1.4
// @grant       none
// ==/UserScript==
(function () {
  /*
   * Changelog
   * 19/07/2013
   * 1.0   - initial
   * 1.1   - remove sizzlemctwizzle.com while its broken
   * 1.2   - change dependency
   * 1.3   - add blinking ft icon
   * 1.4   - remove blinking ft icon
   */
  var main = function () {
      var LoUAntiFortuneTellerVersion = '1.4';

      function debug(msg) {
        msg = (msg instanceof Error && msg.stack) ? msg.stack : String(msg);
        if (window.console && typeof console.log === "function") {
          console.log('LoUAntiFortuneTeller: ' + msg);
        }
      }
      
      function checkDependencies() {
        var app = qx.core.Init.getApplication(),
          dependencies = [
          app.getTitleWidget,
          webfrontend.gui.FortuneTeller.WelcomeScreen],
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
          qx.Class.define("LoUAntiFortuneTeller.main", {
            // let's create a new instance for EXT additional tweaks.
            type: "singleton",
            extend: qx.core.Object,
            members: {
              initialize: function () {
                this.remover();
              },
              remover: function () {
                // FortuneTeller
                var app = qx.core.Init.getApplication();
                webfrontend.gui.FortuneTeller.WelcomeScreen = LoUAntiFortuneTeller.welcomeScreen;
                app._showFortuneTellerPreWindow = app.showFortuneTellerPreWindow;
                app.showFortuneTellerPreWindow = function (fS) {
                  if (!(fS && webfrontend.gui.FortuneTeller.Util.getStepsTillNextFreeToken() <= 0)) {
                    debug('default FortuneTeller');
                    app.showFortuneTellerWindow(fS);
                  }
                };
              }
            }
          });

          qx.Class.define("LoUAntiFortuneTeller.welcomeScreen", {
            type: "singleton",
            extend: qx.core.Object,
            construct: function () {
              this.base(arguments);
              this.redirecting();
            },
            members: {
              redirecting: function () {
                try {
                  debug('call FortuneTellerWindow');
                  qx.core.Init.getApplication().showFortuneTellerWindow(true);
                } catch (err) {
                  console.log(err);
                }
              },
              setQueued: function () {},
              open: function () {}
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
                LoUAntiFortuneTeller.main.getInstance().initialize();
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
      console.log('LoUAntiFortuneTeller: ' + e);
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