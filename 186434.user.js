// ==UserScript==
// @name          PluginsLib - mhZoom - Tiberium Alliances
// @description   Enhanced zoom.
// @version       1.00
// @author        MrHIDEn (in game: PEEU) based on Panavia code.
// @namespace     PluginsLib.mhZoom
// @include       http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @grant         none
// @downloadURL   https://userscripts.org/scripts/source/186434.user.js
// @updateURL     https://userscripts.org/scripts/source/186434.meta.js
// ==/UserScript==
/*TODO
0 options window in Menu-Options
0 store settings in localStorage
*/
(function () {
var InjectBody = function ()
{
  //TODO for debug purpose only. remove if you do not need.
  var ccl=console.log;var cci=console.info;var ccw=console.warn;var ccd=console.dir;var ccc=console.clear;var cce=console.error;
  var disable=0;if(disable){var f=function(){};ccl=f;cci=f;ccw=f;ccd=f;ccc=f;cce=f;}

  var pluginName = "mhZoom";
  var created = false;
  function CreateClasses() {
    // Classes    
    qx.Class.define("PluginsLib." + pluginName,
    {
      type: "singleton",
      extend: qx.core.Object,
      statics : {
        NAME: 'Zoom',
        PLUGIN: 'mhZoom',
        AUTHOR: 'MrHIDEn (orgin Panavia)',
        VERSION: 1.00,
        REQUIRES: '',//Menu
        NEEDS: '',
        INFO: 'Enhanced zoom.',
        WWW: 'http://userscripts.org/scripts/show/186434',
        ONPLUGIN: null,
        ONOPTIONS: null,
        SIZE: 0
      },
      construct: function() {//mhZoom
        var self = this;
        try {            
          webfrontend.gui.BackgroundArea.prototype.onHotKeyPress = function(be) {
            if(!this.active || be.getTarget() != this.mapContainer) return;
            var bg;
            var bh = be.getKeyIdentifier();
            var bf = ClientLib.Vis.VisMain.GetInstance();
            switch(bh) {
              case "+":
                bg = bf.get_Region().get_ZoomFactor() + self.settings.zoomInc;
                bf.get_Region().set_ZoomFactor(Math.min(self.settings.zoomMin, Math.max(self.settings.zoomMax, bg)));
                break;
              case "-":
                bg = bf.get_Region().get_ZoomFactor() - self.settings.zoomInc;
                bf.get_Region().set_ZoomFactor(Math.min(self.settings.zoomMin, Math.max(self.settings.zoomMax, bg)));
                break;
            }
            this.closeCityInfo();
            this.closeCityList();
          };

          var backgroundArea = qx.core.Init.getApplication().getBackgroundArea();
          qx.bom.Element.removeListener(backgroundArea.mapContainer, "mousewheel", backgroundArea._onMouseWheel, backgroundArea);
          qx.bom.Element.removeListener(backgroundArea.mapBlocker, "mousewheel", backgroundArea._onMouseWheel, backgroundArea);
          webfrontend.gui.BackgroundArea.prototype._onMouseWheel = function(e) {
            if(this.activeSceneView === null) return;
            var bz = e.getWheelDelta();
            var by = this.activeSceneView.get_ZoomFactor();
            by += bz > 0 ? -self.settings.zoomInc : self.settings.zoomInc;
            by = Math.min(self.settings.zoomMin, Math.max(self.settings.zoomMax, by));
            this.activeSceneView.set_ZoomFactor(by);
            e.stop();
          };
          qx.bom.Element.addListener(backgroundArea.mapContainer, "mousewheel", backgroundArea._onMouseWheel, backgroundArea);
          qx.bom.Element.addListener(backgroundArea.mapBlocker, "mousewheel", backgroundArea._onMouseWheel, backgroundArea);
        
        
          //DELEGATES FOR REGISTER PLUGIN
          //this.constructor.ONPLUGIN = function(){this.constructor.getInstance().winPlugin.open();};
          //this.constructor.ONOPTIONS = function(){this.constructor.getInstance().winOptions.open();};
          
          //READY
          console.info("Plugin '"+pluginName+"' LOADED");
        }
        catch (e) {
          console.error(this.classname,'.construct: ', e);
        }
      },
      members: {        
        settings: {     //stored settings
          zoomMin: 1.0,	// Larger number means able to zoom in closer.
          zoomMax: 0.2,	// Smaller number means able to zoom out further.
          zoomInc: 0.05 // Larger number for faster zooming, Smaller number for slower zooming.
        },
        loadFromStorage: function(key,preval) {
          var S = ClientLib.Base.LocalStorage;
          if (S.get_IsSupported()) {
            var wid = ClientLib.Data.MainData.GetInstance().get_Server().get_WorldId();
            var val = S.GetItem(wid+'.'+this.classname+'.'+key);
            if(val!==null) {
              preval = val;
            }
          }
          return preval;
        },
        saveToStorage: function(key,val) {
          if(val!==null) {
            var S = ClientLib.Base.LocalStorage;
            if (S.get_IsSupported()) {
              var wid = ClientLib.Data.MainData.GetInstance().get_Server().get_WorldId();
              S.SetItem(wid+'.'+this.classname+'.'+key, val);
            }
          }
        },
        winOptions: null
      }
    });
    created = true;
  }//CreateClasses()
  function WaitForGame() {
    //CreateClasses -> getInstance -> construct
    try
    {
      if(typeof(qx) != 'undefined' && typeof(qx.core) != 'undefined' && typeof(qx.core.Init) != 'undefined') //typeof(PluginsLib) != 'undefined' &&
      {
        var app = qx.core.Init.getApplication();
        if(app.initDone===true)
        {
          if(!created) CreateClasses();
          
          var plugin;
          var registerPlugin = false;
          var ready = typeof(PluginsLib[pluginName]) != 'undefined';
          if(ready) {
            plugin = PluginsLib[pluginName];
            if(plugin.REQUIRES.length > 0) {
              var req = plugin.REQUIRES.split(',');
              //check all requires
              for(var i in req) {
                //cci(req[i]);
                if(typeof(PluginsLib[req[i]]) == 'undefined') {
                  ready = false;
                  console.warn("Plugin '" + pluginName + "' REQUIRES: '" + req[i] + "' Waiting...");
                  break;//WAIT
                }
                if(req[i] == "Menu") registerPlugin = true;
              }
            }
          }
          else {
            console.warn("Plugin '" + pluginName + "' UNDEFINED");
            if(typeof(PluginsLib) != 'undefined') console.dir(PluginsLib);
            else console.warn("Plugin 'PluginsLib' UNDEFINED");
          }
          if(ready) {
            plugin.SIZE = scriptSize;
            // START PLUGIN
            plugin.getInstance(); //needed? YES
            //REGISTER PLUGIN
            if(registerPlugin) PluginsLib.Menu.getInstance().RegisterPlugin(plugin.getInstance());
            console.info("Plugin '" + pluginName + "' READY");
            return;//DONE
          }
        }
      }
    }
    catch (ex) {
      console.error('PluginsLib.'+pluginName+'.WaitForGame: ', ex);
    }
    window.setTimeout(WaitForGame, 3000);
  }
  window.setTimeout(WaitForGame, 3000);
};
function Inject() {
  var script = document.createElement('script');
  var txt = InjectBody.toString();
  txt = txt.replace('{','{\r\n  var scriptSize='+(txt.length+22).toString()+';');
  script.innerHTML = '(' + txt + ')();';
  script.type = 'text/javascript';
  document.head.appendChild(script);
}
Inject();
})();