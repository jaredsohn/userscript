// ==UserScript==
// @name           Die Fanfare, Die!!!
// @description    Removes the ridiculously hugeass fanfare icon from commands
// @author		   Mallor
// @namespace      DFD
// @include        http://prodgame*.lordofultima.com/*/index.aspx*
// @version        1.0.0
// ==/UserScript==

(function()
{
try
{

var DFDMain = function() 
{
	function createDFD() 
	{	    	    
		qx.Class.define("DFD.main",
		{
			type: "singleton",
			extend: qx.core.Object,
			
			members:
			{
				initialize: function()
				{
					var app = qx.core.Init.getApplication();
					var commandView = null;
					
					var children = app.cityInfoView.container.getChildren();
					for(i=0;i<children.length;i++)
					{
						if(children[i].basename=="CityCommandInfoView")
						{
							commandView = children[i];
							break;
						}
					}
					
					if(commandView == null)
					{
						window.setTimeout(qx.lang.Function.bind(this.initialize, this), 1000);
						return;
					}
					
					var commands = commandView.commands;
					commands.addListener("addChildWidget", this.onAddChildWidget, this);
					
					for(var i = 0; i < commands.getChildren().length; i++)
					{
						var e = new qx.event.type.Data();
						e.init(commands.getChildren()[i], null, false);
						this.onAddChildWidget(e);
					}
				},
				
				onAddChildWidget: function(e)
				{
					var widget = e.getData();
					var optionsPanel = widget.getChildren()[4].getChildren()[1].getChildren()[2];

					if(!optionsPanel || optionsPanel.getChildren().length < 2)
						return;
					
					if(optionsPanel.getChildren()[1].classname == "webfrontend.ui.QuickUseButton")
						optionsPanel.remove(optionsPanel.getChildren()[1]);
				},
			}
		});
	}
	
	function DFDCheckIfLoaded() 
	{
		try 
		{
			if (typeof qx != 'undefined') 
			{
				var a = qx.core.Init.getApplication();
				c = a.cityInfoView;
				ch = a.chat;
				var p = webfrontend.data.Player.getInstance();
				var al = webfrontend.data.Alliance.getInstance();
				var srv = webfrontend.data.Server.getInstance();
				if (a && c && ch && p && al && srv) 
				{
					createDFD();
					DFD.main.getInstance().initialize();
				} 
				else
					window.setTimeout(DFDCheckIfLoaded, 1000);
			} 
			else 
			{
				window.setTimeout(DFDCheckIfLoaded, 1000);
			}
		} 
		catch (e) 
		{
		    console.log(e);
		    console.log(e.stack);
		}
	}
	if (/lordofultima\.com/i.test(document.domain))
		window.setTimeout(DFDCheckIfLoaded, 1000);
			
}

	var DFDScript = document.createElement("script");
		txt = DFDMain.toString();
		if (window.opera != undefined)
			txt = txt.replace(/</g,"&lt;");
		DFDScript.innerHTML = "(" + txt + ")();";
		DFDScript.type = "text/javascript";
	if (/lordofultima\.com/i.test(document.domain))
		document.getElementsByTagName("head")[0].appendChild(DFDScript);


}
catch(e)
{
    console.log(e);
    console.log(e.stack);
}	
})();