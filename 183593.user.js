// ==UserScript==
// @name          PluginsLib - mhNotepad - Tiberium Alliances
// @author        MrHIDEn(game:PEEU)
// @description   Personal Notepad for PluginsLib.Menu plugin
// @namespace     http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @include       http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @grant         none
// @downloadURL   https://userscripts.org/scripts/source/183593.user.js
// @updateURL     https://userscripts.org/scripts/source/183593.meta.js
// @version       1.00
// ==/UserScript==
/*TODO
0 btn align left
*/
(function(){
var InjectBody = function()
{
  //TODO for debug purpose only. remove if you do not need.
  var ccl=console.log;var cci=console.info;var ccw=console.warn;var ccd=console.dir;var ccc=console.clear;
  var disable=0;if(disable){var f=function(){};ccl=f;cci=f;ccw=f;ccd=f;ccc=f;}

  var pluginName = "mhNotepad";
  var created = false;
  function CreateClasses()
  {
    //class PluginsLib.mhNotepad
    qx.Class.define("PluginsLib." + pluginName,
    {
      type: "singleton",
      //extend: webfrontend.gui.CustomWindow,
      extend: qx.core.Object,
      statics : {
        NAME: 'Personal notepad',
        PLUGIN: 'MH Notepad',//=Menu Name
        HINT: 'Open notepad',
        AUTHOR: 'MrHIDEn',
        VERSION: 1.00,
        REQUIRES: 'Menu',
        NEEDS: '',
        INFO: 'Personal Notepad for PluginsLib',
        WWW: 'http://userscripts.org/scripts/show/183593',
        ONPLUGIN: null,
        ONOPTIONS: null,//no need
        SIZE: 0
      },
      //class PluginsLib.mhNotepad.construct
      construct: function() //mhNotepad
      {
        try
        {
          //GUI
          //this.base(arguments);
          this.stats.src = '//goo.gl/IGTma9';
          this.Self = this;
          var backColor = '#eeeeff';    
          //TEST AREA
          function getDebug(pn) {
            //EX, var debug = (PluginsLib.Debug[pluginName].onFoo = {});
            //where onFoo is a particular entry which corresponds to debug ex debug.foo = 12 -> ...onFoo.foo = 12
            //or just, var debug = PluginsLib.Debug[pluginName];
            var debug = "PluginsLib.Debug." + pn;
            debug = debug.split('.');
            var o = window;
            for(var i=0; i<debug.length; i++) {
              if(typeof(o[debug[i]])=='object') o = o[debug[i]];
              else o = (o[debug[i]] = {});
            }
            return o;
          }          
          var debug = getDebug(pluginName);      
          
          //PLUGIN window
          this.winPlugin = new qx.ui.window.Window();
          this.winPlugin.set({
            width:600,
            height:500,
            caption:"Notepad " + this.constructor.VERSION.toFixed(2) + " (MH)",
            padding:1,
            allowMaximize:0,
            showMaximize:0,
            allowMinimize:0,
            showMinimize:0, 
            allowClose:1,           
            showClose:1,
            resizable:false
          });          
          //more Listeners
          this.winPlugin.addListener("appear", function(){ this.onCityChanged();}, this);
          this.winPlugin.addListener("move", function(e) {
            var pos = {left:e.getData().left, top:e.getData().top};
            this.saveToStorage('winpos', pos);
          }, this);
          pos = this.loadFromStorage('winpos', {left:130, top:5});
          this.winPlugin.moveTo(pos.left, pos.top);
          var winLayout = new qx.ui.layout.VBox(1);
          //winLayout.setAlignX("center");
          this.winPlugin.setLayout(winLayout);
          
          //notes
          this.notes = this.loadFromStorage('notes', {main:"Welcome!!"});
          //this.saveToStorage('notes', this.notes);
          debug.notes = this.notes;
          
          //custom items
          ////////////////// TABVIEW ////////////////////
          var tHeight = 420;
          this.tabView = new qx.ui.tabview.TabView();
          this.tabView.setWidth(600);
          this.tabView.setHeight(tHeight);
          //q.tv.setBarPosition("top");//"left"
          ////////////////// PAGE 1 ////////////////////
          this.tabPage1 = new qx.ui.tabview.Page("Main");
          this.tabPage1.setLayout(new qx.ui.layout.VBox(1));
          this.tabPage1.setUserData("page",1);
          //this.tabPage1.add(new qx.ui.basic.Label("Layout-Settings"));
          this.tabView.add(this.tabPage1);
          ////////////////// PAGE 2 ////////////////////
          this.tabPage2 = new qx.ui.tabview.Page("Current");
          this.tabPage2.setLayout(new qx.ui.layout.VBox(1));
          this.tabPage2.setUserData("page",2);
          //this.tabPage2.add(new qx.ui.basic.Label("Notes..."));
          this.tabView.add(this.tabPage2);          
          ////////////////// TXT 1 ////////////////////
          this.txtArea1 = new qx.ui.form.TextArea();
          this.txtArea1.set(
          {
            tabIndex    : 1,
            height      : tHeight-60,
            required    : true,
            placeholder : "Main note area."
          });
          ////////////////// TXT 2 ////////////////////
          this.txtArea2 = new qx.ui.form.TextArea();
          this.txtArea2.set(
          {
            tabIndex    : 2,
            height      : tHeight-60,
            required    : true,
            placeholder : "Current base note area."
          });
          ////////////////// SAVE ////////////////////
          this.btnSaveNote = new qx.ui.form.Button("Save both").set({width:80});
          this.btnSaveNote.addListener("execute", this.onSaveNote, this);

          //base
          var cntContainer = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({ padding: 1, decorator: "pane-light-opaque"});

          //this.lblTitle = new qx.ui.basic.Label("Info: ").set({ alignX: "left"});//, font: "font_size_12_bold"});//center

          //var cntVBox = new qx.ui.container.Composite(new qx.ui.layout.VBox(1));
          var cntHBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(1));

          //moved to MENU
          //var lblOptions = new qx.ui.basic.Label("<u>Options</u>").set({ rich: true, alignX: "right"});
          //lblOptions.addListener("click", this.__onOptions, this);

          //custom items
          this.tabPage1.add(this.txtArea1);
          this.tabPage2.add(this.txtArea2);
          //cntVBox.add(this.tabView);
          //cntVBox.add(this.btnSaveNote);
          //cntContainer.add(cntVBox);
          cntHBox.add(this.btnSaveNote);
          cntContainer.add(this.tabView);
          cntContainer.add(cntHBox);
          this.winPlugin.add(cntContainer);
          
          
          
          //base
          //cntContainer.add(this.lblTitle);
          //cntContainer.add(lblOptions);

          this.txtAreaPrint(1);
          //var c = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCityId();
          //if(this.notes[c]===undefined) this.notes[c] = "";
          //this.saveToStorage('notes', this.notes);
          //this.onCityChanged(null,ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCityId());
          //ClientLib.Net.CommunicationManager.GetInstance().RegisterDataReceiver(bI, phe.cnc.Util.createEventDelegate(ClientLib.Net.UpdateData, this, this._onSysMsg));

          //test
          //PluginsLib.Debug = {tv:this.tabView,tp1:this.tabPage1,tp2:this.tabPage2,lb:this.lblTitle};
          var debug = PluginsLib.Debug[pluginName];
          debug = {tv:this.tabView,tp1:this.tabPage1,tp2:this.tabPage2,tva1:this.txtArea1,tva2:this.txtArea2};
          debug.cntM = cntContainer;
          //debug.oc = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
          //debug.cid = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCityId();//-1
          //qx.event.Registration.addListener(qx.dom.Node.getWindow(this.getRoot()), D, this._onResize, this);
          
          //phe.cnc.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance().get_Region(), "PositionChange", ClientLib.Vis.PositionChange, this, this.onPositionChange);
          //phe.cnc.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "SelectionChange", ClientLib.Vis.SelectionChange, this, this.onSelectionChange);
          phe.cnc.Util.attachNetEvent(ClientLib.Data.MainData.GetInstance().get_Cities(), "CurrentOwnChange", ClientLib.Data.CurrentOwnCityChange, this, this.onCityChanged);
          
          //move window left if needed ///////////////////////////
          //var dsk = qx.core.Init.getApplication().getDesktop();
          //dsk.addListener("resize", function(){console.warn(pluginName+" onResize");}, this);
          
          //DELEGATES FOR REGISTER PLUGIN
          this.constructor.ONPLUGIN = function(){this.constructor.getInstance().winPlugin.open();};
          //this.constructor.ONOPTIONS = function(){this.constructor.getInstance().open();};//test = null
          
          //READY
          console.info("Plugin '"+pluginName+"' LOADED");
        }
        catch (e) {
          console.error(this.classname,'.construct: ', e);
        }
      },
      destruct: function(){},
      members:
      {
        main: function() {
          ccw('self main');
        },
        Self: null,
        stats: document.createElement('img'),
        winPlugin: null,
        //winOptions: null,
        notes: null,
        lblTitle: null,
        tabView: null,
        tabPage1: null,
        tabPage2: null,
        txtArea1: null,
        txtArea2: null,
        btnSaveNote: null,
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
        onCityChanged: function (l,c) {
          var oc = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
          this.tabPage2.setLabel(oc.get_Name());
          //this.tabView.setSelection([this.tabPage2]);// reconsider this
          this.txtAreaPrint(2);
          //test
          var debug = PluginsLib.Debug[pluginName];
          debug.oc = oc;
          debug.c = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCityId();
        },
        onSaveNote: function() {          
          //var p = this.tabView.getSelection()[0].getUserData("page");// future
          var c = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCityId();
          if(this.notes[c]===undefined) this.notes[c] = "";
          this.notes.main = this.txtArea1.getValue();
          this.notes[c] = this.txtArea2.getValue();
          this.saveToStorage('notes',this.notes);
        },
        txtAreaPrint: function(p) {
          p = p | 1;
          if(p==1) {
            this.txtArea1.setValue(this.notes.main);
          }
          else {
            var c = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCityId();
            if(this.notes[c]===undefined) this.notes[c] = "";
            this.txtArea2.setValue(this.notes[c]);
          } 
        }
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