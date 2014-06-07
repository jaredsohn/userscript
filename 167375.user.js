// ==UserScript==
// @name          PluginsLib - Menu - Tiberium Alliances
// @author        MrHIDEn(game:PEEU)
// @description   Provides Menu for PluginsLib
// @version       1.11
// @namespace     http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @include       http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @grant         none
// @downloadURL   https://userscripts.org/scripts/source/167375.user.js
// @updateURL     https://userscripts.org/scripts/source/167375.meta.js
// ==/UserScript==
/*NOTES
Flybar option
0 add, option both,ico,txt - buttons
0 add, option tools always on top - ontop
0 add, shortcuts list
Template - Options window in Menu script
for any purpose
0 use prepared names for labels

0 Window Settings/Customize move to the center
*/
(function(){
function injectBody()
{
  //TODO for debug purpose only. remove if you do not need.
  var ccl=console.log;var cci=console.info;var ccw=console.warn;var ccd=console.dir;var ccc=console.clear;var cce=console.error;
  var disable=0;if(disable){var f=function(){};ccl=f;cci=f;ccw=f;ccd=f;ccc=f;cce=f;}

  var spaceName = 'PluginsLib.Menu';
  var created = false;
  function CreateClasses()
  {
    //class PluginsLib.Menu
    qx.Class.define("PluginsLib.Menu", {
      type: "singleton",
      extend: qx.core.Object,
      statics : {
        NAME: 'User Menu',
        PLUGIN: 'Menu',
        AUTHOR: 'MrHIDEn',
        VERSION: 1.11,//PluginsLib.Menu.VERSION.toFixed(2)
        REQUIRES: '',
        NEEDS: '',
        INFO: 'Menu button for PluginsLib',
        WWW: 'http://userscripts.org/scripts/show/167375',
        SIZE: 0
      },
      //class PluginsLib.Menu.construct
      construct: function()  {
        try
        {
          //var app = qx.core.Init.getApplication();
          this.stats.src = 'http://goo.gl/Zq0Ng';//1.00
          //ccl('__settings load');
          //ccd(this.__settings);
          this.__settings = this.loadFromStorage('settings', this.__settings);
          //ccd(this.__settings);
          //this.saveToStorage('settings', this.__settings);//TODO add in places you change something

          //TODO test area
          aaa={};

          //create settings common
          this.__winSettings = new qx.ui.window.Window();
          var laySettings = new qx.ui.layout.VBox();
          laySettings.setSpacing(10);
          this.__winSettings.set({
            caption:"Customize menu",
            showClose:1,
            showMinimize:0,
            showMaximize:0,
            width:200,
            height:100,
            //movable:0,
            //resizeable:0,
            layout:laySettings
          });
          var cntSettings = new qx.ui.container.Composite(new qx.ui.layout.VBox());
          cntSettings.setPadding(5);
          cntSettings.setBackgroundColor(this._backColor);
          //settings,items
          // create group box
          var boxMode = new qx.ui.groupbox.GroupBox("View mode");
          boxMode.getChildrenContainer().setBackgroundColor(this._backColor);
          boxMode.setLayout(new qx.ui.layout.VBox());
          var rbMode0 = new qx.ui.form.RadioButton("R/B button");
          var rbMode1 = new qx.ui.form.RadioButton("Game menu");
          var rbMode2 = new qx.ui.form.RadioButton("Flybar");
          new qx.ui.form.RadioGroup(rbMode0, rbMode1, rbMode2);
          //rbMode2.setEnabled(false);
          rbMode0.setUserData("mode",0);
          rbMode1.setUserData("mode",1);
          rbMode2.setUserData("mode",2);
          //do menu
          //cci('create mode',this.__settings.options.mode);
          switch (this.__settings.options.mode) {
            case 0:
              this.__makeMode0();
              rbMode0.setValue(true);
              break;
            case 1:
              this.__makeMode1();
              rbMode1.setValue(true);
              break;
            case 2:
              this.__makeMode2();
              rbMode2.setValue(true);
              break;
          }
          function changeMode(e) {
            //ccl('create.changeMode');
            if(e.getTarget().getValue()) {
              //aaa.changeMode={};
              //aaa.changeMode.This = this;
              //aaa.changeMode.E = e;
              //var mode = this.getUserData("mode");
              var mode = e.getTarget().getUserData("mode");//old
              //cci('create.changeMode.mode',mode);
              try{
                this.__settings.options.mode = mode;
                this.saveToStorage('settings', this.__settings);
                switch (mode) {
                  case 0:
                    //rbMode0.setValue(true);
                    this.__makeMode0();
                    break;
                  case 1:
                    //rbMode1.setValue(true);
                    this.__makeMode1();
                    break;
                  case 2:
                    //rbMode2.setValue(true);
                    this.__makeMode2();
                    break;
                }
              }catch(ex){console.error('changeMode',ex);}
            }
          }
          rbMode0.addListener("changeValue",changeMode,this);
          rbMode1.addListener("changeValue",changeMode,this);
          rbMode2.addListener("changeValue",changeMode,this);
          boxMode.add(rbMode0);
          boxMode.add(rbMode1);
          boxMode.add(rbMode2);
          cntSettings.add(boxMode);

          // create group box
          var boxButton = new qx.ui.groupbox.GroupBox("Draw buttons as");
          boxButton.getChildrenContainer().setBackgroundColor(this._backColor);
          boxButton.setLayout(new qx.ui.layout.VBox());
          var rbButton0 = new qx.ui.form.RadioButton("Both");
          var rbButton1 = new qx.ui.form.RadioButton("Icon");
          var rbButton2 = new qx.ui.form.RadioButton("Txt");
          new qx.ui.form.RadioGroup(rbButton0, rbButton1, rbButton2);
          //TODO
          rbButton0.setEnabled(false);
          rbButton1.setEnabled(false);
          rbButton2.setEnabled(false);
          rbButton0.setUserData("mode",0);
          rbButton1.setUserData("mode",1);
          rbButton2.setUserData("mode",2);
          //choose
          switch (this.__settings.options.button) {
            case 0:
              rbButton0.setValue(true);
              break;
            case 1:
              rbButton1.setValue(true);
              break;
            case 2:
              rbButton2.setValue(true);
              break;
          }
          function changeButtonMode(e) {
            //ccl('create.changeMode');
            if(e.getTarget().getValue()) {
              //aaa.changeMode={};
              //aaa.changeMode.This = this;
              //aaa.changeMode.E = e;
              //var mode = this.getUserData("mode");
              var mode = e.getTarget().getUserData("mode");//old
              //cci('create.changeMode.mode',mode);
              //TODO fill this up
              try{
                this.__settings.options.button = button;
                this.saveToStorage('settings', this.__settings);
                //TODO
                //this.__makeButtonMode(mode);
                switch (mode) {
                  case 0:
                    //rbMode0.setValue(true);
                    //this.__makeMode0();
                    break;
                  case 1:
                    //rbMode1.setValue(true);
                    //this.__makeMode1();
                    break;
                  case 2:
                    //rbMode2.setValue(true);
                    //this.__makeMode2();
                    break;
                }
              }catch(ex){console.error('changeButtonMode',ex);}
            }
          }
          rbButton0.addListener("changeValue",changeButtonMode,this);
          rbButton1.addListener("changeValue",changeButtonMode,this);
          rbButton2.addListener("changeValue",changeButtonMode,this);
          boxButton.add(rbButton0);
          boxButton.add(rbButton1);
          boxButton.add(rbButton2);
          cntSettings.add(boxButton);

          //ontop
          var chbOntop = new qx.ui.form.CheckBox("Toolbar on the top");
          //TODO
          chbOntop.setEnabled(false);
          //TODO
          function changeOntopMode(e) {
            //ccl('create.changeMode');
            //var mode = e.getTarget().getUserData("mode");//old
            //cci('create.changeMode.mode',mode);
            //TODO fill this up
            try{
              var ontop = e.getTarget().getValue();
              this.__settings.options.ontop = ontop;
              this.saveToStorage('settings', this.__settings);
              //TODO
              //this.__makeOntopMode(ontop);
            }catch(ex){console.error('changeOntopMode',ex);}
          }
          //addListener
          chbOntop.addListener("changeValue",changeOntopMode,this);
          //var chb = new qx.ui.form.CheckBox("Box");
          //getValue()
          cntSettings.add(chbOntop);

          //add to settings container
          this.__winSettings.add(cntSettings);


          console.info("Plugin '"+this.basename+"' LOADED");
        } catch (ex) {
          console.error(this.classname,".create: ", ex);
        }
      },
      destruct: function() {
        //ccl(this.classname,'.destruct');
      },
      //class PluginsLib.Menu.members
      members:
      {
        RegisterPlugin: function(plugin) {// `plugin` is application `this`
          try
          {
            //TODO new approach
            //a - Tool button
            //plugin.getMenuDelegate()
            //plugin.getOptionsDelegate()
            //b - Top menu
            //var bntScript = qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_MENU).getScriptsButton();
            //var submenu = new qx.ui.menu.Menu();
            //bntScript.Add("Test", null, submenu);
            //c - Icons bar
            //
            //NOTE new approach
            //{plugin `this` `self`
            //entry name getName(),
            //application delegate onApplication(), onPlugin()
            //option delegate onOptions(),
            //icon getIcon()}
            //this could be in plugin namespace like
            //plugin.getName or
            //plugin.NAME or
            //THIS looks great
            //this.__arrDelegates.push
            //plugin.getDelegetes()={plugin,name,application,options,icon}
            //but rises problem that this application must work with this
            //or
            //this.__arrPlugins.push(plugin)
            //and inside `plugin` menu can use some restricted / abstract methods/fields
            //store data around pluginname and fields mhNavigator -> shortcut, menu position, ect
            //localStore ('PluginsLib.Menu',this.settings)
            //this.settings =
            //{options:{mode:a,alwaysontop:0},
            //plugins:[mhNavigator:{shortcut:'Ctrl+A',position:1}]}
            //you must make some job:
            //a generate buttons for a type menu
            //b generate menus for b type menu
            //c generate icons bar and icons for c type menu
            // try {arrPlugins}
            // catch (ex){
              // arrPlugins = [];
              // arrPlugins.push(PluginsLib.mhUpgrade.getInstance());
              // arrPlugins.push(PluginsLib.mhLoot.getInstance());
              // arrPlugins.push(PluginsLib.mhNavigator.getInstance());
              // ccl('ini2');
              // //ccl(arrPlugins);
            // }
            // // delete arrPlugins;
            // a=arrPlugins[0].basename;
            // b=PluginsLib[a];
            // b.getInstance().getMenuDelegate()
            //
            // onPlugin: function()
            // onOptions: function()
            // getIcon: function()

            //name = this.__arrPlugins[i].basename
            //this.__arrPlugins[i].onPlugin
            //this.__arrPlugins[i].onOptions
            //this.__arrPlugins[i].getIcon //to do
            //var pluginStatics = PluginsLib[register.pluginName];//=plugin.constructor
            try{//test
              cci('mhMenu test');ccl('plugin.constructor.PLUGIN',plugin.constructor.PLUGIN);
            }catch(e){cce('mhMenu test:'+e);}

            var pc = plugin.constructor;
            var register = {};
            register.pluginName = plugin.basename;
            //register.pluginStatics = PluginsLib[register.pluginName];
            register.pluginStatics = pc;
            register.menuName = pc.PLUGIN !== undefined ? pc.PLUGIN : register.pluginName;
            register.menuHint = pc.HINT !== undefined ? pc.HINT : register.pluginName;
            register.menuIcon = pc.ICON !== undefined ? pc.ICON : this._iconDefault;//default icon
            if(register.menuIcon===null) register.menuIcon = this._iconDefault;
            // register.onPlugin = pc.ONPLUGIN !== undefined ? function(){plugin.ONPLUGIN();} : null;//TOOL ITEM
            // register.onOptions = pc.ONOPTIONS !== undefined ? function(){plugin.ONOPTIONS();} : null;//OPTION ITEM
            register.onPlugin = typeof(pc.ONPLUGIN) == 'function' ? function(){pc.ONPLUGIN();} : null;//TOOL ITEM
            register.onOptions = typeof(pc.ONOPTIONS) == 'function' ? function(){pc.ONOPTIONS();} : null;//TOOL ITEM
            //{options:{mode:a},plugins:{mhNavigator:{shortcut:'Ctrl+A',position:1}}}
            var onShortcut = null;
            if(this.__settings.plugins[register.pluginName]===undefined) {
              this.__settings.plugins[register.pluginName] = {shortcut:'',position:-1};
              this.saveToStorage('settings', this.__settings);
            }
            else {
              //Alt+F1, Control+C, Control+Alt+Delete
              if(register.onPlugin!==null) {
                onShortcut = new qx.bom.Shortcut();
                onShortcut.setShortcut(this.__settings.plugins[register.pluginName].shortcut);
                onShortcut.addListener("execute",function(){register.onPlugin();});
                // this.__newCommand = new qx.ui.core.Command("Ctrl+N");
                // this.__newCommand.addListener("execute", function(){o.onPlugin();});
              }
            }
            register.onShortcut = onShortcut;
            register.position = this.__settings.plugins[register.pluginName].position;
            this.__arrPlugins.push(register);

            this.__uiAddPlugin(register);

            //TODO add reset button
            //http://demo.qooxdoo.org/1.6/demobrowser/#widget~Menu.html

            console.info("Plugin '"+plugin.basename+"' REGISTRED");
          }
          catch (ex)
          {
            console.warn(this.classname,".RegisterPlugin: ", ex);
          }
        },
        stats: document.createElement('img'),
        loadFromStorage: function(key,preval) {
          var S = ClientLib.Base.LocalStorage;
          if (S.get_IsSupported()) {
            var val = S.GetItem(this.classname+'.'+key);
            if(val!==null && val.version!==undefined && val.version==preval.version) {
              preval = val;
            }
          }
          return preval;
        },
        saveToStorage: function(key,val,classname) {
          classname = classname || this.classname;
          if(val!==null) {
            var S = ClientLib.Base.LocalStorage;
            if (S.get_IsSupported()) S.SetItem(classname+'.'+key, val);
          }
        },
        //{options:{mode:a},plugins:{mhNavigator:{shortcut:'Ctrl+A',position:1}}}
        __settings: {
          version:3,
          options:{
            mode:0,//0-rb,1-menu,2-toolbar
            button:0,//0-both,1-ico,2-txt
            ontop:0 //0-no,1-yes
          },
          plugins:{}
        },//version is for memory update
        __optionsLabels:{
          mode:"Choose menu mode",
          modes:["R/B button","In game menu","Toolbar"],
          button:"Draw buttons as",
          buttons:["Ico+Txt","Icon only","Txt only"],
          ontop:"Toolbar on the top"
        },
        //general
        _iconTools: "webfrontend/ui/gdi/icons/icon_repair_all_button.png",
        _iconSettings: "FactionUI/icons/icon_forum_properties.png",
        _iconDefault: "FactionUI/icons/icon_collect_packages.png",
        _backColor: '#eeeeff',
        __arrPlugins: [],
        __winSettings: null,
        //ui routines
        __uiRemoveItems: [],
        __uiArrTools: {},
        __uiArrOptions: {},
        __uiClear: function() {
          if(this.__uiRemoveItems.length===0) return;
            aaa.__uiClear={};
            aaa.__uiClear.__uiRemoveItems = this.__uiRemoveItems;
          this.__uiRemoveItems.forEach(function(val,idx,arr){
            //ex {parent:dsk,child:btnTools}
            //aaa.__uiClear.val;
            //ccl(aaa.__uiClear.val);
            if(val.parent.remove!==undefined) {
              val.parent.remove(val.child);
            }
            else {
              val.child.removeAll();
            }
          });
          this.__uiRemoveItems = [];
        },
        __uiAddPlugin: function(){},
        __uiAddPlugins: function(){},
        __uiRemovePlugins: function(){},
        //TODO
        //mode 0
        //__winTools: null,
        //__winOptions: null,
        //__btnOpenTools: null,
        //__btnOpenOptions: null,
        __cntToolsWindow: null,
        __cntOptionsWindow: null,
        __objTALogo: null,//{parent:cntButton, child:d[i], idx:i};//parent.addAt(child,idx)
        __makeMode0: function() {//"R/B button"
          ccl('__makeMode0');
          try{
            function removePlugins() {//from ui
              var k,btn;
              for(k in this.__uiArrTools) {
                btn = this.__uiArrTools[k];
                this.__cntToolsWindow.remove(btn);
              }
              for(k in this.__uiArrOptions) {
                btn = this.__uiArrOptions[k];
                this.__cntOptionsWindow.remove(btn);
              }
            }
            function addPlugin(plugin){//to ui
              var btn;
              try{
                if(plugin.onPlugin!==null) {
                  btn = new qx.ui.form.Button(plugin.menuName, plugin.menuIcon).set({
                    toolTipText: plugin.menuName + "<br>" + plugin.menuHint
                  });
                  btn.addListener("execute",function(){plugin.onPlugin();});
                  this.__cntToolsWindow.add(btn);
                  this.__uiArrTools[plugin.pluginName] = btn;
                }
              }catch(ex){console.error('addPlugin 1',ex);}
              try{
                if(plugin.onOptions!==null) {
                  btn = new qx.ui.form.Button(plugin.menuName,plugin.menuIcon).set({
                    toolTipText: plugin.menuName + "<br>" + "Plugin options"
                  });
                  btn.addListener("execute",function(){plugin.onOptions();});
                  this.__cntOptionsWindow.add(btn);
                  this.__uiArrOptions[plugin.pluginName] = btn;
                }
              }catch(ex){console.error('addPlugin 2',ex);}
            }
            function addPlugins(){
              try{
                var plugins = this.__arrPlugins;
                for(var k in plugins){
                  var p = plugins[k];
                  this.__uiAddPlugin(p);
                }
              }catch(ex){console.error('addPlugins',ex);}
            }
            var app = qx.core.Init.getApplication();
            //var dsk = app.getDesktop();
            //var sw = ClientLib.Vis.VisMain.GetInstance().get_Region().get_ViewWidth();
            //var sh = ClientLib.Vis.VisMain.GetInstance().get_Region().get_ViewHeight();
            this.__uiClear();

            //get options bar
            var bar = app.getOptionsBar();
            var cntButton = bar.getChildren()[2];
            var d = cntButton.getChildren();
            for(var i in d) {//indexes
              if(d[i].classname=="qx.ui.basic.Image") {
                this.__objTALogo = {parent:cntButton, child:d[i], idx:i};//you can restore
                cntButton.removeAt(i);//removes TA logo. Obj at position k
                //or cntButton.remove(d[i]);
                //parent.addAt(child,idx)
                break;
              }
            }
            function btnOpenToolsEX() {
              aaa.btnOpenToolsEX = {};
              aaa.btnOpenToolsEX.This = this;
              try{
                //var boml = this.getContainerLocation();
                var boml = btnOpenTools.getContainerLocation();
                //ccl('boml',boml);
                winTools.moveTo(boml.left - winTools.getWidth(), boml.top - winTools.getHeight() + 40);
                winTools.open();
              }catch(ex){console.error('btnOpenToolsEX',ex);}
            }
            var btnOpenTools = new qx.ui.form.Button("<b>PL Tools</b>", this._iconTools).set({rich:true});//set({rich:true,width:80});
            //btnOpenTools.setUserData("target",btnOpenTools);
            btnOpenTools.addListener("click", btnOpenToolsEX);
            cntButton.addAt(btnOpenTools, 0);//add
            this.__uiRemoveItems.push({parent:cntButton,child:btnOpenTools});


            // create menu
            var winTools = new qx.ui.window.Window();
            winTools.set({
              caption:"Menu "+PluginsLib.Menu.VERSION.toFixed(2)+" (MH)",
              showClose:1,
              showMinimize:0,
              showMaximize:0,
              width:200,
              height:100,
              layout:new qx.ui.layout.VBox()
            });
            function winToolsEX() {
              winTools.close();
            }
            winTools.addListener("click",winToolsEX);
            this.__cntToolsWindow = new qx.ui.container.Composite(new qx.ui.layout.VBox());//.set({ padding: 5, decorator: "pane-light-opaque" });
            this.__cntToolsWindow.setBackgroundColor(this._backColor);

            function btnOpenOptionsEX() {
              aaa.btnOpenOptionsEX = {};
              aaa.btnOpenOptionsEX.This = this;
              try{
                //var boml = this.getContainerLocation();
                var boml = btnOpenTools.getContainerLocation();
                winOptions.moveTo(boml.left - winOptions.getWidth(), boml.top - winOptions.getHeight() + 40);
                winOptions.open();
              }catch(ex){console.error('btnOpenOptionsEX',ex);}
            }
            var btnOpenOptions = new qx.ui.form.Button("<b>PL Options</b>", this._iconSettings).set({rich:true});//,width:80});
            btnOpenOptions.addListener("execute", btnOpenOptionsEX);

            var cntBtnOptions = new qx.ui.container.Composite(new qx.ui.layout.VBox());
            cntBtnOptions.set({ padding: 2});
            cntBtnOptions.setBackgroundColor(this._backColor);
            cntBtnOptions.add(this.__cntToolsWindow);
            cntBtnOptions.add(btnOpenOptions);

            winTools.add(cntBtnOptions);

            //create options
            var winOptions = new qx.ui.window.Window();
            winOptions.set({
              caption:"Plugins options",
              showClose:1,
              showMinimize:0,
              showMaximize:0,
              width:200,
              height:100,
              layout:new qx.ui.layout.VBox()
            });
            winOptions.addListener("click",function() {
              winOptions.close();
            },this);
            this.__cntOptionsWindow = new qx.ui.container.Composite(new qx.ui.layout.VBox());//.set({ padding: 2});//, decorator: "pane-light-opaque" });
            this.__cntOptionsWindow.setBackgroundColor(this._backColor);

            function btnOpenSettingsEX() {
              aaa.btnOpenSettingsEX = {};
              aaa.btnOpenSettingsEX.This = this;
              try{
                var sw = ClientLib.Vis.VisMain.GetInstance().get_Region().get_ViewWidth();
                var sh = ClientLib.Vis.VisMain.GetInstance().get_Region().get_ViewHeight();
                // var w = this.__winSettings.getBounds().width;
                // var h = this.__winSettings.getBounds().height;
                var w = this.__winSettings.getWidth();
                var h = this.__winSettings.getHeight();
                // b.getBounds().top
                // b.getBounds().left
                this.__winSettings.moveTo((sw-w)/2, (sh-h)/2);
                this.__winSettings.open();
              }catch(ex){console.error('btnOpenSettingsEX',ex);}
            }
            var btnOpenCustomize = new qx.ui.form.Button("<b>PL Settings</b>", this._iconSettings).set({rich:true});//,width:80});
            btnOpenCustomize.addListener("execute", btnOpenSettingsEX,this);

            var cntOptions = new qx.ui.container.Composite(new qx.ui.layout.VBox());
            cntOptions.set({ padding: 2});
            cntOptions.setBackgroundColor(this._backColor);
            cntOptions.add(this.__cntOptionsWindow);
            cntOptions.add(btnOpenCustomize);

            winOptions.add(cntOptions);

            this.__uiRemovePlugins = removePlugins;
            this.__uiAddPlugin = addPlugin;
            this.__uiAddPlugins = addPlugins;
            this.__uiAddPlugins();

          }catch(ex){console.error('__makeMode0',ex);}
        },
        //mode 1
        __mnuTools: null,
        __mnuOptions: null,//convert?
        __btnMenuOptions: null,//convert?
        __btnMenuSettings: null,//convert?
        __makeMode1: function() {//"In game menu"
          ccl('__makeMode1');
          try{
            function removePlugins() {//from ui
              var k,btn;
              for(k in this.__uiArrTools) {
                btn = this.__uiArrTools[k];
                this.__mnuTools.remove(btn);
              }
              for(k in this.__uiArrOptions) {
                btn = this.__uiArrOptions[k];
                this.__mnuOptions.remove(btn);
              }
            }
            function addPlugin(plugin){//to ui
              var btn;
              try{
                if(plugin.onPlugin!==null) {
                  btn = new qx.ui.menu.Button(plugin.menuName,plugin.menuIcon).set({
                      toolTipText: plugin.menuName + "<br>" + plugin.menuHint
                    });
                  btn.addListener("execute",function(){plugin.onPlugin();});
                  //this.__mnuTools.addAt(btn,0);
                  this.__mnuTools.add(btn);
                  this.__uiArrTools[plugin.pluginName] = btn;
                }
              }catch(ex){console.error('addPlugin 1',ex);}
              try{
                if(plugin.onOptions!==null) {
                  btn = new qx.ui.menu.Button(plugin.menuName,plugin.menuIcon).set({
                      toolTipText: plugin.menuName + "<br>" + "Plugin options"
                    });
                  btn.addListener("execute",function(){plugin.onOptions();});
                  //this.__mnuOptions.addAt(btn,0);
                  this.__mnuOptions.add(btn);
                  this.__uiArrOptions[plugin.pluginName] = btn;
                }
              }catch(ex){console.error('addPlugin 2',ex);}
            }
            function addPlugins(){
              try{
                var plugins = this.__arrPlugins;
                for(var k in plugins){
                  var p = plugins[k];
                  this.__uiAddPlugin(p);
                }
              }catch(ex){console.error('addPlugins',ex);}
            }
            //var app = qx.core.Init.getApplication();
            //var dsk = app.getDesktop();
            //var sw = ClientLib.Vis.VisMain.GetInstance().get_Region().get_ViewWidth();
            //var sh = ClientLib.Vis.VisMain.GetInstance().get_Region().get_ViewHeight();
            this.__uiClear();
            //__objTALogo: null,//{parent:cntButton, child:d[i], idx:i};//parent.addAt(child,idx)
            if(this.__objTALogo!==null) {//restore
              var img = this.__objTALogo;
              img.parent.addAt(img.child, img.idx);
              this.__objTALogo = null;
            }

            //mode 1
            // __mnuTools: null,
            // __mnuOptions: null,
            // __btnMenuOptions: null,
            // __btnMenuSettings: null
            var btnScript = qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_MENU).getScriptsButton();

            //mode 1,tools
            if(this.__mnuTools===null) {
              this.__mnuTools = new qx.ui.menu.Menu();//store
              this.__mnuTools.setToolTipText("PluginsLib");
              btnScript.Add("PL Tools", this._iconTools, this.__mnuTools);
            }
            this.__uiRemoveItems.push({parent:btnScript,child:this.__mnuTools});
            //mode 1,options
            this.__mnuOptions = new qx.ui.menu.Menu();
            this.__mnuOptions.setToolTipText("Plugins options.<br>Customize menu.");
            //mode 1,btn Options
            this.__btnMenuOptions = new qx.ui.menu.Button("PL Options", this._iconSettings, null, this.__mnuOptions);
            this.__btnMenuOptions.setToolTipText("Plugins options.<br>Customize menu.");
            this.__mnuTools.add(this.__btnMenuOptions);
            //mode 1,btn Settings
            this.__btnMenuSettings = new qx.ui.menu.Button("PL Customize", this._iconSettings);
            this.__btnMenuSettings.setToolTipText("Customize menu.");
            this.__btnMenuSettings.addListener("execute",function(){
              //var boml = btnOpenTools.getContainerLocation();//TODO wrong element
              //this.__winSettings.moveTo(boml.left-this.__winSettings.getWidth(),boml.top-this.__winSettings.getHeight()+50);
              //this.__winSettings.moveTo(boml.left-this.__winSettings.getWidth(), 50);
              var sw = ClientLib.Vis.VisMain.GetInstance().get_Region().get_ViewWidth();
              var sh = ClientLib.Vis.VisMain.GetInstance().get_Region().get_ViewHeight();
                // var w = this.__winSettings.getBounds().width;
                // var h = this.__winSettings.getBounds().height;
                var w = this.__winSettings.getWidth();
                var h = this.__winSettings.getHeight();
              // b.getBounds().top
              // b.getBounds().left
              this.__winSettings.moveTo((sw-w)/2, (sh-h)/2);
              this.__winSettings.open();
            },this);
            this.__mnuOptions.add(this.__btnMenuSettings);
            //end of menu 1

            this.__uiRemovePlugins = removePlugins;
            this.__uiAddPlugin = addPlugin;
            this.__uiAddPlugins = addPlugins;
            this.__uiAddPlugins();

          }catch(ex){console.error('__makeMode1',ex);}
        },
        //mode 2
        //TODO
        //moze przycisk opcji i customizacji powinien byc na dole, choc teraz jest szybciej, zostaje
        __cntToolsButtons: null,//remove, this.__uiRemoveItems.push({parent:dsk,child:btnTools});
        __cntOptionsButtons: null,//remove
        __makeMode2: function() {//"Toolbar"
          ccl('__makeMode2');
          try{
            function removePlugins() {//from ui
              var k,btn;
              for(k in this.__uiArrTools) {
                btn = this.__uiArrTools[k];
                this.__cntToolsButtons.remove(btn);
              }
              for(k in this.__uiArrOptions) {
                btn = this.__uiArrOptions[k];
                this.__cntOptionsButtons.remove(btn);
              }
            }
            function addPlugin(plugin){//to ui
              ccl('plugin.menuIcon',plugin.menuIcon);
              var btn;
              try{
              if(plugin.onPlugin!==null) {
                btn = new qx.ui.form.Button(plugin.menuName, plugin.menuIcon).set({
                    toolTipText: plugin.menuName + "<br>" + plugin.menuHint
                  });
                btn.addListener("execute",function(){plugin.onPlugin();});
                this.__cntToolsButtons.add(btn);
                this.__uiArrTools[plugin.pluginName] = btn;
              }
              }catch(ex){console.error('addPlugin 1',ex);}
              try{
              if(plugin.onOptions!==null) {
                btn = new qx.ui.form.Button(plugin.menuName, plugin.menuIcon).set({
                    toolTipText: plugin.menuName + "<br>" + "Plugin options"
                  });
                btn.addListener("execute",function(){plugin.onOptions();});
                this.__cntOptionsButtons.add(btn);
                this.__uiArrOptions[plugin.pluginName] = btn;
              }
              }catch(ex){console.error('addPlugin 2',ex);}
            }
            function addPlugins(){
              try{
                var plugins = this.__arrPlugins;
                for(var k in plugins){
                  var p = plugins[k];
                  this.__uiAddPlugin(p);
                }
              }catch(ex){console.error('addPlugins',ex);}
            }
            var app = qx.core.Init.getApplication();
            var dsk = app.getDesktop();
            var sw = ClientLib.Vis.VisMain.GetInstance().get_Region().get_ViewWidth();
            //var sh = ClientLib.Vis.VisMain.GetInstance().get_Region().get_ViewHeight();
            this.__uiClear();
            //__objTALogo: null,//{parent:cntButton, child:d[i], idx:i};//parent.addAt(child,idx)
            if(this.__objTALogo!==null) {//restore
              var img = this.__objTALogo;
              img.parent.addAt(img.child, img.idx);
              this.__objTALogo = null;
            }
            var settings = {btnTools:{l:220,t:18},cntTools:{l:240,t:4},cntOptions:{l:240,t:4}};
            ccl('settMode2 load');
            ccd(settings);
            settings = this.loadFromStorage('settMode2', settings);
            ccd(settings);
            var saveToStorage = this.saveToStorage;
            //settings.btnTools,cntTools,cntOptions,{l:220,t:10}
            //this.saveToStorage('settMode2', settings);
            //button
            function btnToolsMM (e) {
              aaa.btnToolsMM = e;
              aaa.btnToolsMM.This = this;
              try{
                this.setUserData("moved",true);
                var sw = ClientLib.Vis.VisMain.GetInstance().get_Region().get_ViewWidth();
                var sh = ClientLib.Vis.VisMain.GetInstance().get_Region().get_ViewHeight();
                var x = e.getViewportLeft();
                var y = e.getViewportTop();
                if(x>10 && x<sw-30 && y>10 && y<sh-10) {
                  var t = this;
                  var w = t.getBounds().width;
                  var left = x-w/2;
                  var top = y-10;
                  t.setDomPosition(left,top);
                  //TODO save position mode3, btnTool
                  settings.btnTools = {l:sw-left, t:top};
                  //settings.btnTools,cntTools,cntOptions,{l:220,t:10}
                  saveToStorage('settMode2', settings,"PluginsLib.Menu");
                }
              }catch(ex){console.error('btnToolsMM',ex);}
            }
            function btnToolsMD () {
              //aaa.btnToolsMD = e;
              //aaa.btnToolsMD.This = this;
              try{
                var d = qx.core.Init.getApplication().getDesktop();
                this.setToolTipText("");
                var dmm = this.getUserData("mousemove");//clear
                if(dmm!==null) {
                  d.removeListenerById(dmm);
                }
                dmm = d.addListener("mousemove",btnToolsMM,this);
                this.setUserData("mousemove",dmm);
              }catch(ex){console.error('btnToolsMD',ex);}
            }
            function btnToolsMU () {
              //aaa.btnToolsMU = e;
              //aaa.btnToolsMU.This = this;
              try{
                var d = qx.core.Init.getApplication().getDesktop();
                var dmm = this.getUserData("mousemove");
                if(dmm!==null) {
                  d.removeListenerById(dmm);
                }
              }catch(ex){console.error('btnToolsMU',ex);}
            }
            function btnToolsEX () {
              //aaa.btnToolsEX = e;
              //aaa.btnToolsEX.This = this;
              try{
                var vis = cntTools.getVisibility();
                var mm = this.getUserData("moved");
                if(mm===null) mm = false;
                this.setUserData("moved",false);
                if(!mm) {
                  if(vis==="visible") {
                    cntTools.hide();
                  }
                  else {
                    cntTools.show();
                  }
                }
              }catch(ex){console.error('btnToolsEX',ex);}
            }
            //try{btnTools;}catch(ex){/*new*/}
            var btnTools = new qx.ui.form.Button("<b>PL Tools</b>", this._iconTools).set({rich:true});
            btnTools.setToolTipText("Hold to move button");
            //btnTools.setUserData("btn","btnTools");
            btnTools.addListener("mousedown",btnToolsMD);
            btnTools.addListener("mouseup",btnToolsMU);
            btnTools.addListener("click",btnToolsEX);
            //TODO load position mode3, btnTools
            //settings.btnTools,cntTools,cntOptions,{l:220,t:10}
            dsk.add(btnTools, {left: sw - settings.btnTools.l, top: settings.btnTools.t});
            this.__uiRemoveItems.push({parent:dsk,child:btnTools});

            //tools,general
            function ToolsMM (e) {
              //aaa.ToolsMM = e;
              //aaa.ToolsMM.This = this;
              try{
              this.setUserData("moved",true);
                var sw = ClientLib.Vis.VisMain.GetInstance().get_Region().get_ViewWidth();
                var sh = ClientLib.Vis.VisMain.GetInstance().get_Region().get_ViewHeight();
                var x = e.getViewportLeft();
                var y = e.getViewportTop();
                if(x>10 && x<sw-30 && y>10 && y<sh-10) {
                  var t = this.getUserData("target");
                  var w = t.getBounds().width;
                  var left = x-w/2;
                  var top = y-10;
                  t.setDomPosition(left,top);
                  //TODO save position mode3, cntTools
                  settings.cntTools = {l:sw-left, t:top};
                  //settings.btnTools,cntTools,cntOptions,{l:220,t:10}
                  saveToStorage('settMode2', settings,"PluginsLib.Menu");
                }
              }catch(ex){console.error('ToolsMM',ex);}
            }
            function ToolsMD () {
              // aaa.ToolsMD = e;
              // aaa.ToolsMD.This = this;
              try{
                var d = qx.core.Init.getApplication().getDesktop();
                this.setToolTipText("");
                var dmm = this.getUserData("mousemove");//clear
                if(dmm!==null) {
                  d.removeListenerById(dmm);
                }
                dmm = d.addListener("mousemove",ToolsMM,this);
                this.setUserData("mousemove",dmm);
              }catch(ex){console.error('ToolsMD',ex);}
            }
            function ToolsMU () {
              // aaa.ToolsMU = e;
              // aaa.ToolsMU.This = this;
              try{
                var d = qx.core.Init.getApplication().getDesktop();
                var dmm = this.getUserData("mousemove");
                if(dmm!==null) {
                  d.removeListenerById(dmm);
                }
              }catch(ex){console.error('ToolsMU',ex);}
            }
            function ToolsEX () {
              // aaa.ToolsEX = e;
              // aaa.ToolsEX.This = this;
              try{
                var mm = this.getUserData("moved");
                if(mm===null) mm = false;
                this.setUserData("moved",false);
                if(!mm) cntTools.hide();
              }catch(ex){console.error('ToolsEX',ex);}
            }
            var layTools = new qx.ui.layout.VBox(2);
            var cntTools = new qx.ui.container.Composite(layTools);
            cntTools.setBackgroundColor(this._backColor);
            cntTools.setPadding(1);
            cntTools.hide();
            cntTools.setUserData("target",cntTools);
            cntTools.addListener("mousedown",ToolsMD);
            cntTools.addListener("mouseup",ToolsMU);
            cntTools.addListener("click",ToolsEX);
            //TODO load position mode3, cntTools
            //settings.btnTools,cntTools,cntOptions,{l:220,t:10}
            dsk.add(cntTools, {left: sw - settings.cntTools.l, top:settings.cntTools.t});
            this.__uiRemoveItems.push({parent:dsk,child:cntTools});
            //tools,btn options & label
            var layBtnOptions = new qx.ui.layout.VBox(2);
            var cntBtnOptions = new qx.ui.container.Composite(layBtnOptions);
            cntBtnOptions.setBackgroundColor(this._backColor);
            var lblTools = new qx.ui.basic.Label("Tools").set({alignX:"center"});
            cntBtnOptions.add(lblTools);
            function btnOptionsEX () {
              // aaa.btnOptionsEX = e;
              // aaa.btnOptionsEX.This = this;
              try{
                var vis = cntOptions.getVisibility();
                if(vis==="visible") {
                  cntOptions.hide();
                }
                else {
                  cntOptions.show();
                }
              }catch(ex){console.error('btnOptionsEX',ex);}
            }
            var btnBtnOptions = new qx.ui.form.Button("<b>PL Options</b>", this._iconSettings).set({rich:true});
            btnBtnOptions.addListener("click",btnOptionsEX);
            cntBtnOptions.add(btnBtnOptions);
            cntTools.add(cntBtnOptions);
            //tools,tools buttons
            var layToolsButtons = new qx.ui.layout.VBox(2);
            //layToolsButtons.setSpacing(2);    //this.__cntToolsButtons
            //var cntToolsButtons = new qx.ui.container.Composite(layToolsButtons);
            this.__cntToolsButtons = new qx.ui.container.Composite(layToolsButtons);
            this.__cntToolsButtons.setBackgroundColor(this._backColor);
            cntTools.add(this.__cntToolsButtons);
            //options,general
            function OptionsMM (e) {
              // aaa.OptionsMM = e;
              // aaa.OptionsMM.This = this;
              try{
                this.setUserData("moved",true);
                var sw = ClientLib.Vis.VisMain.GetInstance().get_Region().get_ViewWidth();
                var sh = ClientLib.Vis.VisMain.GetInstance().get_Region().get_ViewHeight();
                var x = e.getViewportLeft();
                var y = e.getViewportTop();
                if(x>10 && x<sw-30 && y>10 && y<sh-10) {
                  var t = this.getUserData("target");
                  var w = t.getBounds().width;
                  var left = x-w/2;
                  var top = y-10;
                  t.setDomPosition(left,top);
                  // TODO save position mode3, cntOptions
                  settings.cntOptions = {l:sw-left, t:top};
                  //settings.btnTools,cntTools,cntOptions,{l:220,t:10}
                  saveToStorage('settMode2', settings,"PluginsLib.Menu");
                }
              }catch(ex){console.error('OptionsMM',ex);}
            }
            function OptionsMD () {
              // aaa.OptionsMD = e;
              // aaa.OptionsMD.This = this;
              try{
                var d = qx.core.Init.getApplication().getDesktop();
                this.setToolTipText("");
                var dmm = this.getUserData("mousemove");//clear
                if(dmm!==null) {
                  d.removeListenerById(dmm);
                }
                dmm = d.addListener("mousemove",OptionsMM,this);
                this.setUserData("mousemove",dmm);
              }catch(ex){console.error('OptionsMD',ex);}
            }
            function OptionsMU () {
              // aaa.OptionsMU = e;
              // aaa.OptionsMU.This = this;
              try{
                var d = qx.core.Init.getApplication().getDesktop();
                var dmm = this.getUserData("mousemove");
                if(dmm!==null) {
                  d.removeListenerById(dmm);
                }
              }catch(ex){console.error('OptionsMU',ex);}
            }
            function OptionsEX () {
              // aaa.OptionsEX = e;
              // aaa.OptionsEX.This = this;
              try{
                var mm = this.getUserData("moved");
                if(mm===null) mm = false;
                this.setUserData("moved",false);
                if(!mm) cntOptions.hide();
              }catch(ex){console.error('OptionsEX',ex);}
            }
            var layOptions = new qx.ui.layout.VBox(2);
            var cntOptions = new qx.ui.container.Composite(layOptions);
            cntOptions.setBackgroundColor(this._backColor);
            cntOptions.setPadding(1);
            cntOptions.hide();
            cntOptions.setUserData("target",cntOptions);
            cntOptions.addListener("mousedown",OptionsMD);
            cntOptions.addListener("mouseup",OptionsMU);
            cntOptions.addListener("click",OptionsEX);
            //TODO load position mode3, cntOptions
            //settings.btnTools,cntTools,cntOptions,{l:220,t:10}
            dsk.add(cntOptions, {left: sw - settings.cntOptions.l, top:settings.cntOptions.t});
            this.__uiRemoveItems.push({parent:dsk,child:cntOptions});
            //options,btn settings & label
            var layBtnSettings = new qx.ui.layout.VBox(2);
            //layBtnSettings.setSpacing(2);
            var cntBtnSettings = new qx.ui.container.Composite(layBtnSettings);
            cntBtnSettings.setBackgroundColor(this._backColor);
            //cntBtnSettings.setPadding(1);
            var lblOptions = new qx.ui.basic.Label("Options").set({alignX:"center"});
            cntBtnSettings.add(lblOptions);
            function btnSettingsEX () {
              //aaa.btnSettingsEX = e;
              //aaa.btnSettingsEX.This = this;
              try{
                //ccw('winSettings.open();');
                var t = this.getUserData("target");
                t.open();
              }catch(ex){cce('btnSettingsEX',ex);}
            }
            var btnBtnSettings = new qx.ui.form.Button("<b>PL Settings</b>", this._iconSettings).set({rich:true});
            btnBtnSettings.setUserData("target",this.__winSettings);
            btnBtnSettings.addListener("click",btnSettingsEX);
            cntBtnSettings.add(btnBtnSettings);
            cntOptions.add(cntBtnSettings);
            //options,tools buttons
            var layOptionsButtons = new qx.ui.layout.VBox(2);
            //var cntOptionsButtons = new qx.ui.container.Composite(layOptionsButtons);
            this.__cntOptionsButtons = new qx.ui.container.Composite(layOptionsButtons);
            this.__cntOptionsButtons.setBackgroundColor(this._backColor);
            cntOptions.add(this.__cntOptionsButtons);

            this.__uiRemovePlugins = removePlugins;
            this.__uiAddPlugin = addPlugin;
            this.__uiAddPlugins = addPlugins;
            this.__uiAddPlugins();
          }catch(ex){console.error('__makeMode2',ex);}
        }
        //^more members
      }
    });
    created = true;
  }//CreateClasses()
  function WaitForGame() {
    try
    {
      if (typeof(qx) != 'undefined' && typeof(qx.core) != 'undefined' && typeof(qx.core.Init) != 'undefined')
      {
        var app = qx.core.Init.getApplication();
        if (app.initDone===true)
        {
          if(!created) CreateClasses();
          var plugin = PluginsLib.Menu;
          plugin.getInstance();
          plugin.SIZE = scriptSize;
          console.info("Plugin '"+plugin.getInstance().basename+"' READY");
          return;//DONE
        }
      }
    } catch (ex) {
      console.log(spaceName,'.WaitForGame: ', ex);
    }
    window.setTimeout(WaitForGame, 2000);
  }
  window.setTimeout(WaitForGame, 2000);
}
function Inject() {
  var script = document.createElement('script');
  var txt = injectBody.toString();
  txt = txt.replace('{','{\r\n  var scriptSize='+(txt.length+22).toString()+';');
  script.innerHTML = '(' + txt + ')();';
  script.type = 'text/javascript';
  document.head.appendChild(script);
}
Inject();
})();