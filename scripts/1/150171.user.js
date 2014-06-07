// ==UserScript==
// @name           Share Report
// @description    Reports sharing
// @namespace      RShare
// @include        http://prodgame*.lordofultima.com/*/index.aspx*
// @version        1.0.0
// ==/UserScript==

(function()
{
try
{

var RSMain = function() 
{
	function createRS() 
	{	    	    	
		qx.Class.define("RShare.main", 
		{
			type: "singleton",
			extend: qx.core.Object,

			members: 
			{
				app: null,
				
				initialize: function() 
				{
					this.app = qx.core.Init.getApplication();
					
					injectReportActivateEvent();
				},
				
		        reportOpened: function(e)
		        {
		            // Only inject to report pages
		            if(this.app.infoNavigatorWidget.currentPage==null)
		                return;
		            
		            if(this.app.infoNavigatorWidget.currentPage.name!="webfrontend.gui.ReportPage")
		                return;
		            		            
		            injectAttempts = 0;
		            this.injectReportLabel();
		        },
				
				addToChat: function(str)
				{
					var curVal = this.app.chat.chatLine.getValue();
					
					this.app.chat.chatLine.setValue((curVal != null ? curVal + " " : "") + str + " ");
					this.app.chat.chatLine.focus();
				},
				
				injectReportLabel: function()
				{
					try
					{
						var app = qx.core.Init.getApplication();
						panel = app.getReportPage().reportBody;

						// Stop after 10 seconds, to prevent constant load on browser
						if(injectAttempts>1000)
							return;
					
						if(panel.getChildren().length==0)
						{   
							injectAttempts++;
							window.setTimeout(qx.lang.Function.bind(this.injectReportLabel,this), 10);
						}
						else
						{                
							var shareLbl = this.app.reportPage.getChildren()[0].getChildren()[0].getChildren()[0].getChildren()[0];
							
							if(shareLbl.getValue().translate == undefined)
								return;
								
							var shareStr = shareLbl.getValue().translate().toString();
							var reportId = shareStr.substr(shareStr.search(": ") + 2);
							shareLbl.setRich(true);
							var link = '<a onclick="RShare.main.getInstance().addToChat(\'' + reportId + '\');" style="color:#1d79ff" href="#">' + shareStr + '</a>';
							console.log(link);
							shareLbl.setValue(link);
						}
					}
					catch(e)
					{
						console.log(e);
					}
				},
			}
		});
	}

        //==============================================================================================//
	    //                                     MISC FUNCTIONS                                           //
	    //==============================================================================================//

    function injectReportActivateEvent()
    {
        try
        {
            var app = qx.core.Init.getApplication();;
        
            if(app.infoNavigatorWidget==null)
            {   
                window.setTimeout(injectReportActivateEvent,1000);
            }
            else
            {
                app.infoNavigatorWidget.addListener("activate", RShare.main.getInstance().reportOpened, RShare.main.getInstance());
                // After injection fire event as well
                RShare.main.getInstance().reportOpened(this);
            }
        }
        catch(e)
        {
            console.log(e);
        }
    }

	function TNACheckIfLoaded() 
	{
		try 
		{
			if (typeof qx != 'undefined') 
			{
				var a = qx.core.Init.getApplication(); // application
				c = a.cityInfoView;
				ch = a.chat;
				wdst = webfrontend.data.ServerTime.getInstance().refTime;
				var p = webfrontend.data.Player.getInstance();
				var al = webfrontend.data.Alliance.getInstance();
				var srv = webfrontend.data.Server.getInstance();
				if (a && c && ch && wdst && p && al && al.hasOwnProperty("$$user_name") && srv) 
				{
					createRS();
					window.RShare.main.getInstance().initialize();
				} 
				else
					window.setTimeout(TNACheckIfLoaded, 1000);
			} 
			else 
			{
				window.setTimeout(TNACheckIfLoaded, 1000);
			}
		} 
		catch (e) 
		{
		    console.log(e);
		    console.log(e.stack);
		}
	}
	if (/lordofultima\.com/i.test(document.domain))
		window.setTimeout(TNACheckIfLoaded, 1000);
			
}

	// injecting, because there seem to be problems when creating game interface with unsafeWindow
	var script = document.createElement("script");
		txt = RSMain.toString();
		if (window.opera != undefined)
			txt = txt.replace(/</g,"&lt;"); // rofl Opera
		script.innerHTML = "(" + txt + ")();";
		script.type = "text/javascript";
	if (/lordofultima\.com/i.test(document.domain))
		document.getElementsByTagName("head")[0].appendChild(script);


}
catch(e)
{
    console.log(e);
    console.log(e.stack);
}	
})();