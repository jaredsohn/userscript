// ==UserScript==
// @name        PluginsLib - mhNotification - Tiberium Alliances
// @author      MrHIDEn(game:PEEU)
// @description - PluginsLib.Menu plugin
// @version     0.01 alpha
// @namespace   http*://*.alliances.commandandconquer.com/*
// @include     http*://*.alliances.commandandconquer.com/*
// @grant       none
// @downloadURL https://userscripts.org/scripts/source/167592.user.js
// @updateURL   https://userscripts.org/scripts/source/167592.meta.js
// ==/UserScript==
(function(){
var injectBody = function()
{
	//TODO for debug purpose only. remove if you do not need.
	var ccl=console.log;var cci=console.info;var ccw=console.warn;var ccd=console.dir; var ccc=console.clear;
	if(disable){var f=new Function();var ccl=f;var cci=f;var ccw=f;var ccd=f;var ccc=f;}

	var spaceName = 'PluginsLib.mhNotification';
	function createClasses()
	{
    //class PluginsLib.Test
		qx.Class.define("PluginsLib.mhNotification",
		{
			type: "singleton",
			extend: webfrontend.gui.CustomWindow,

      statics : {
				PLUGIN: 'Test',
				AUTHOR: 'MrHIDEn',
				VERSION: 0.01,
				REQUIRES: 'Menu,Util',
				INFO: 'Test window [Template] for PluginsLib'
				WWW: 'http://userscripts.org/scripts/show/167586'	
      },

			//class PluginsLib.mhNotification.construct
			construct: function() //Test
			{
        //GUI
				this.base(arguments);
				this.setLayout(new qx.ui.layout.VBox(2));

        //WINDOW
				this.set({
					width: 400,
					caption: "Test Window 1.00",
					padding: 2,
					allowMaximize: true,
					showMaximize: true,
					allowMinimize: false,
					showMinimize: false,
				});

        //custom items
				this.__txtArea = new qx.ui.form.TextArea();
        this.__txtArea.set(
        {
          tabIndex    : 2,
          //height      : 60,
          required    : true,
          placeholder : "Test area"
        });
				this.__btnRun = new qx.ui.form.Button("Run");
				this.__btnRun.addListener("execute", this.__run, this);

        //base
				var cntContainer = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({ padding: 5, decorator: "pane-light-opaque"});

				var lblTitle = new qx.ui.basic.Label("Test area:").set({ alignX: "left", font: "font_size_14_bold"});//center


				var cntVBox = new qx.ui.container.Composite(new qx.ui.layout.VBox(5));

        var lblOptions = new qx.ui.basic.Label("<u>Options</u>").set({ rich: true, alignX: "right"});
				lblOptions.addListener("click", this.__onOptions, this);

        //custom items
				cntVBox.add(this.__txtArea);
				cntVBox.add(this.__btnRun);
        //base
        cntContainer.add(lblTitle);
				cntContainer.add(cntVBox);
				cntContainer.add(lblOptions);

				this.add(cntContainer);

        this.__btnMenuDelegate = new qx.ui.form.Button("Notification").set({
          toolTipText: "test win"
        });
        this.__btnMenuDelegate.addListener("execute",this.onMenuDelegate, this);
				PluginsLib.Menu.getInstance().RegisterPlugin(this);

        console.info(this.classname,".mhNotification.contruct DONE");
      },

			destruct: function()
			{

			},

			//class PluginsLib.mhNotification.members
			members:
			{
        //custom
				__txtArea: null,
				__btnRun: null,

        __winOption: null,

        //INFO can be popup, label, btn, ect
        __btnMenuDelegate: null,
        getMenuDelegate: function()
        {
          //console.info(this.classname,'.getMenuDelegate');
          return this.__btnMenuDelegate;
        },
        onMenuDelegate: function()
        {
          this.open();
        },

        __onOptions: function()
        {
          //TODO
          //this.winO....
          console.info('__onOptions');
        },

        __run: function()
        {
          //TODO fill this function
          console.log("__run");
          this.__txtArea.setValue("__run");
        }
			}
		});
	}//createClasses()

	function appendScript(src) {
		src = src || '';
		if(src=='') return;
		var list = document.getElementsByTagName('script');
		for(var i=0;i<list.length;i++) {
			if(list[i].src.indexOf(src)>=0) {
				//console.log(spaceName.'.appendScript: FOUND (',list[i].src,')');
				return;
			}
		}
		var script = document.createElement('script');
		script.setAttribute('type','text/javascript');
		script.setAttribute('charset','UTF-8');
		script.setAttribute('src',src);
		document.body.appendChild(script);
		list = document.getElementsByTagName('script');
		for(var i=0;i<list.length;i++) {
				if(list[i].src.indexOf(src)>=0) {
				console.log(spaceName,'.appendScript: READY (',list[i].src,')');
				return;
			}
		}
		console.log(spaceName,'.appendScript: ERROR (',src,')');
	}
	function WaitForGame() {
		try
		{
			if (typeof(qx) != 'undefined' && typeof(qx.core) != 'undefined' && typeof(qx.core.Init) != 'undefined')
			{
				var app = qx.core.Init.getApplication();
				if (app.initDone == true)
				{
					createClasses();
					switch('undefined')
					{
						case typeof(PluginsLib.Menu):
							//WAIT for //PluginsLib.Menu
							break;
						case typeof(PluginsLib.Util):
							//WAIT for //PluginsLib.Util
							break;
						default:
							//PLUG
							PluginsLib.mhNotification.getInstance();
							return;
					}
				}
			}
		} catch (e) {
			console.log(spaceName,'.WaitForGame: ', e);
		}
		window.setTimeout(WaitForGame, 1000);
	}
	window.setTimeout(WaitForGame, 1000);
}
function Inject() {
	var script = document.createElement('script');
	var txt = injectBody.toString();
	script.innerHTML = '(' + txt + ')();';
	script.type = 'text/javascript';
	document.head.appendChild(script);
}
Inject();
})();