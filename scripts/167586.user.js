// ==UserScript==
// @name          PluginsLib - Test - Tiberium Alliances
// @author        MrHIDEn(game:PEEU)
// @description   Test - Template window for PluginsLib.Menu plugin
// @version       0.01 alpha
// @namespace     http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @include       http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @grant         none
// ==/UserScript==
// @downloadURL   https://userscripts.org/scripts/source/167586.user.js
// @updateURL     https://userscripts.org/scripts/source/167586.meta.js
(function(){
var injectBody = function()
{
	//TODO for debug purpose only. remove if you do not need.
	var ccl=console.log;var cci=console.info;var ccw=console.warn;var ccd=console.dir; var ccc=console.clear;
	var disable=0;if(disable){var f=new Function();var ccl=f;var cci=f;var ccw=f;var ccd=f;var ccc=f;}

	var spaceName = 'PluginsLib.Test';
  var created = false;
	function createClasses()
	{
    //class PluginsLib.Test
		qx.Class.define("PluginsLib.Test",
		{
			type: "singleton",
			extend: webfrontend.gui.CustomWindow,

      statics : {
				PLUGIN: 'Test',
				AUTHOR: 'MrHIDEn',
				VERSION: 0.01,
				REQUIRES: 'Menu,Util',
				INFO: 'Test window [Template] for PluginsLib',
				WWW: 'http://userscripts.org/scripts/show/167586'	
      },

			//class PluginsLib.Test.construct
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

        this.__btnMenuDelegate = new qx.ui.form.Button("Test win").set({
          toolTipText: "test win"
        });
        this.__btnMenuDelegate.addListener("execute",this.onMenuDelegate, this);
				PluginsLib.Menu.getInstance().RegisterPlugin(this);

        console.info(this.classname,".Test.construct DONE");
      },

			destruct: function()
			{

			},

			//class PluginsLib.Test.members
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
    created = true;
  }//createClasses()
	function WaitForGame() {
		try
		{
			if (typeof(qx) != 'undefined' && typeof(qx.core) != 'undefined' && typeof(qx.core.Init) != 'undefined')
			{
				var app = qx.core.Init.getApplication();
				if (app.initDone == true)
				{
					if(!created) createClasses();
          //TODO make a function to check other classes in this file if required
          var req = PluginsLib.Test.REQUIRES.split(',');
          //check all requires
          var ready = true;
          for(var i in req) {
            if(typeof(PluginsLib[req[i]])=='undefined') {  
              console.log(spaceName,'.WaitForGame.REQUIRES ',req[i],typeof(PluginsLib[req[i]]));            
              ready = false;
              break;//wait
            }
          }
          if(ready) {
            //console.log(spaceName,'.WaitForGame: READY');
            //load
            PluginsLib.Test.getInstance();
            //end
            return;
          }
				}
			}
		} catch (e) {
			console.log(spaceName,'.WaitForGame: ', e);
		}
		window.setTimeout(WaitForGame, 3000);
	}
	window.setTimeout(WaitForGame, 3000);
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
