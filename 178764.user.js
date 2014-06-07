// ==UserScript==
// @name        DailyStats
// @namespace   DailyStats
// @description Script that opens 
// @version     0.1.0.0
// @author      InFlames2k (Patrick Schubert)
// @include     http*://*.alliances.commandandconquer.com/*
// ==/UserScript==
(function(){
	var DailyStats = function()
	{
		// create the main class
		function createClass()
		{
		  
			qx.Class.define("DailyStats.Window",
			{
				type: "singleton",
				extend: qx.ui.window.Window,
				
				// constructor of the class
				construct: function()
				{
					try
					{		
					    console.log("DailyStats: Initializing");
						var app = qx.core.Init.getApplication();
						this.base(arguments);
						
						var layout = new qx.ui.layout.Grid(2, 2);
						layout.setColumnAlign(0, "left", "top");
                        layout.setColumnAlign(1, "right", "top");
                        layout.setColumnWidth(0, 150);
                        layout.setColumnWidth(1, 100);
						
						this.setLayout(layout);
						
						this.set(
						{				
							width: 250,
							height: 70,
							caption: "Daily Stats",
							allowMaximize: false,
							showMaximize: false,
							allowMinimize: false,
							showMinimize: false,
							showClose: true,
							resizable: false							
						});		
						
						app.getDesktop().add(this);	
						this.show();					
						
						var parent = this.getLayoutParent();
						if(parent)
						{
							var bounds = parent.getBounds();
							var left = (bounds.width - 250) - 140;
							var top = bounds.height - 100 - 30;
							this.moveTo(left, top);
						}						
					    console.log("DailyStats: creating labels");
					    this.valueLabels = [];
					    var font = new qx.bom.Font();
					    font.set({ color: "#FF0000", bold: true, size: 15});
					    var labels = ["Punkte seit Login:", "Credits seit Login:"];
						for (var i=0; i < labels.length; i++) 
						{
						    var label = new qx.ui.basic.Label(labels[i]);
						    label.set({font: font, textColor: "#FFFFFF"});

						    this.valueLabels[i] = new qx.ui.basic.Label();
						    this.valueLabels[i].set({font: font, textColor: "#FFFFFF"});
						    
						    this.add(label, {row: i, column: 0 });    
                            this.add(this.valueLabels[i], {row: i, column: 1 });
                        }
                        
                        var player = ClientLib.Data.MainData.GetInstance().get_Player();
                        
                        this.valueLabels[0].setValue("0");
                        this.valueLabels[1].setValue("0");
                        //this.valueLabels[2].setValue("0");
                        
                        var timer = qx.util.TimerManager.getInstance();
                        timer.start(this.RunTimer, 1000,
						                          this,
						                          null,
						                          3000);
						                          
						this.AddButton();
					}
					catch(e)
					{
						console.log(e);
					}
				},
				
				// destructor of the class
				destruct: function()
				{
				},
				
				members:
				{
				    valueLabels: null,
				    startUpPoints: 0,
				    startUpCredits: 0,
				    options: null,

                    AddButton: function()
                    {
                        var DailyStatsButton = new qx.ui.form.Button("Daily Stats");
						DailyStatsButton.set(
						{			
							alignY: "middle",							
							width : 120,							
							toolTipText : "open DailyStats window",
							appearance: "button-text-small"
						});
												
						DailyStatsButton.addListener("execute", this.__openOpenDailyStatsWindow, this);
		
						console.log("DailyStats: Adding DailyStatsButton to view");
						var app = qx.core.Init.getApplication();
						app.getDesktop().add(DailyStatsButton, 
						{
							bottom: 20, 
							right: 120
						});
                    },
                    
                    __openOpenDailyStatsWindow: function()
					{
						if(this.isVisible())
						{
							console.log("closing DailyStatsWindow");
							this.close();
						}
						else
						{
							console.log("opening DailyStatsWindow");
							this.open();
						}
					},
				    
				    RunTimer: function()
				    {
				        try
				        {
				            console.log("DailyStats: Timer elapsed");
				           // this.options = DailyStats.Preferences.getInstance();
    					   // this.options.ReadSettings();	
    				        //console.log("DailyStats: Timer elapsed");
    				        //var currentDate = this.options.GetValueFromLocalStorage("CurrentDate", new Date());
                        
                            /*if(this.options.Settings[DailyStats.Preferences.LASTPLAYEDDATE] < currentDate)
    						{
    						  this.options.SetValueToLocalStorage(DailyStats.Preferences.LASTPLAYEDDATE, currentDate);
    					      this.options.SetValueToLocalStorage(DailyStats.Preferences.CURRENTSAVEDPOINTS, player.get_ScorePoints());
    					    }*/
    				    
    				        var player = ClientLib.Data.MainData.GetInstance().get_Player();
    				        
    				        if(this.startUpPoints == 0)
    				            this.startUpPoints = player.get_ScorePoints();
    				        if(this.startUpCredits == 0)
    				            this.startUpCredits = player.GetCreditsCount();
    				        
    				        var score = player.get_ScorePoints();
    				        var credits = player.GetCreditsCount();
    				     //   var dayScore = score;
    				        score = score - this.startUpPoints;
    				        credits = credits - this.startUpCredits;
    				        
    				     //   dayScore = dayScore - this.options.Settings[DailyStats.Preferences.CURRENTSAVEDPOINTS];
    				    
    				        this.valueLabels[0].setValue(this.formatNumber(score, 0, "", "."));
    				        this.SetLabelColor(this.valueLabels[0], ""+score+"");		
    				        this.valueLabels[1].setValue(this.formatNumber(credits, 0, "", "."));
    				        this.SetLabelColor(this.valueLabels[1], ""+credits+"");
    				      //  this.valueLabels[1].setValue(this.formatNumber(credits, 0, "", "."));
    				      //  this.SetLabelColor(this.valueLabels[1], ""+credits+"");	
    				        }
    				        catch(e)
    				        {
    				            console.log("DailyStats: ", e);
    				        }
				    },
				    
				   SetLabelColor: function(label, value)
				    {
				        if(value < 0)
				            label.set({ textColor: "#FF0000" });
				        else if(value == 0)
				            label.set({ textColor: "#FFFFFF" });
				        else
				            label.set({ textColor: "#00FF00" });
				    },
				    
				    formatNumber: function(num,dig,dec,sep)
				    {
                        x=new Array();
                        s=(num<0?"-":"");
                        num=Math.abs(num).toFixed(dig).split(".");
                        r=num[0].split("").reverse();
                        for(var i=1;i<=r.length;i++){x.unshift(r[i-1]);if(i%3==0&&i!=r.length)x.unshift(sep);}
                        return s+x.join("")+(num[1]?dec+num[1]:"");
                    }
				}
			});
		}	
		
		
		// **************************************************************
		// Main Initialization
		function DailyStats_checkIfLoaded() 
		{
			try 
			{
				if (typeof qx != 'undefined' && qx.core.Init.getApplication() && qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_NAVIGATION) && qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_NAVIGATION).isVisible())
				{
					createClass();
					window.DailyStats.Window.getInstance();			
				} else 
				{
					window.setTimeout(DailyStats_checkIfLoaded, 1000);
				}
			} catch (e) 
			{
				console.log("DailyStats_checkIfLoaded: ", e);
			}
		}
		
		if (/commandandconquer\.com/i.test(document.domain)) {
			window.setTimeout(DailyStats_checkIfLoaded, 1000);
		}
	};	
	
	try 
	{
		var script = document.createElement("script");
		script.innerHTML = "(" + DailyStats.toString() + ")();";
		script.type = "text/javascript";
		if (/commandandconquer\.com/i.test(document.domain)) {
			document.getElementsByTagName("head")[0].appendChild(script);
		}
	} 
	catch (e) 
	{
		console.log("DailyStats init error: ", e);
	}
})();