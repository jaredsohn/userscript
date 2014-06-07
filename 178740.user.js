// ==UserScript==
// @name        AllianceMemberOnline
// @namespace   AllianceMemberOnline
// @description Gives an overview of all online alliance members sorted by there member state.
// @version     0.1.3.0
// @updateURL     https://userscripts.org/scripts/source/178740.meta.js
// @downloadURL   https://userscripts.org/scripts/source/178740.user.js
// @author      InFlames2k (Patrick Schubert)
// @include     http*://*.alliances.commandandconquer.com/*
// @grant         GM_log
// @grant         GM_setValue
// @grant         GM_getValue
// @grant         GM_registerMenuCommand
// @grant         GM_xmlhttpRequest
// @grant         GM_updatingEnabled
// @grant         unsafeWindow
// @grant         metadata
// ==/UserScript==
(function(){
	var AllianceMemberOnline0 = function()
	{
		// create the main class
		function createClass()
		{
	      	console.log("Starting creation of classes");
			// define the memberoverview class
			qx.Class.define("AllianceMemberOnline.Main",
			{
				type: "singleton",
				extend: qx.core.Object,
				
				// constructor of the class
				construct: function()
				{
					try
					{				
						console.log("Initializing AllianceMemberOnlineButton Button");
						var AllianceMemberOnlineButton = new qx.ui.form.Button("Alliance Overview");
						AllianceMemberOnlineButton.set(
						{			
							alignY: "middle",							
							width : 120,							
							toolTipText : "open AllianceMemberOnline window",
							appearance: "button-text-small"
						});
												
						AllianceMemberOnlineButton.addListener("execute", this.__openAllianceMemberOnlineWindow, this);
		
						console.log("Adding AllianceMemberOnlineButton to view");
						var app = qx.core.Init.getApplication();
						app.getDesktop().add(AllianceMemberOnlineButton, 
						{
							bottom: 0, 
							right: 120
						});
						
					//	var AllianceMemberOnlineWindow = AllianceMemberOnline.Window.getInstance();
					//	AllianceMemberOnlineWindow.open();
					}
					catch(e)
					{
						console.log("Failed to initialize AllianceMemberOnline: ", e);
					}
					console.log("AllianceMemberOnline loaded");
				},
				
				// destructor of the class
				destruct: function()
				{
				},
				
				members:
				{				
					// Method to show the window
					__openAllianceMemberOnlineWindow: function()
					{
						var AllianceMemberOnlineWindow = AllianceMemberOnline.Window.getInstance();
						
						if(AllianceMemberOnlineWindow.isVisible())
						{
							console.log("closing AllianceMemberOnlineWindow");
							AllianceMemberOnlineWindow.close();
						}
						else
						{
							console.log("opening AllianceMemberOnlineWindow");
							AllianceMemberOnlineWindow.open();
						}
					}
				}
			});		
			
			qx.Class.define("AllianceMemberOnline.Window",
			{
				type: "singleton",
				extend: qx.ui.window.Window,
				
				// constructor of the class
				construct: function()
				{
					try
					{				
						console.log("Creating AllianceMemberOnline.Window");
						this.base(arguments);
						this.setLayout(new qx.ui.layout.Canvas());
						
						this.set(
						{				
							width: 150,
							caption: "Online Members",
							allowMaximize: false,
							showMaximize: false,
							allowMinimize: false,
							showMinimize: false,
							resizable: true
						});		
						
						this.model = new qx.ui.table.model.Simple();
						this.model.setColumns(["Role", "Name", "OnlineState", "RoleText"]);
						this.model.sortByColumn(1, true);						
						this.list = new qx.ui.table.Table(this.model);
						this.list.setColumnVisibilityButtonVisible(false);
						this.list.setColumnWidth(0, 0);
						this.list.setColumnWidth(1, 130);					
						this.list.setColumnWidth(2, 0);
						this.list.setColumnWidth(3, 0);	
						this.list.set({ width: 130, minHeight: 250 });
						var tModel = this.list.getTableColumnModel();
						tModel.setColumnVisible(0, false);
						tModel.setColumnVisible(2, false);
						tModel.setColumnVisible(3, false);
						this.list.setStatusBarVisible(false);
						this.add(this.list, {
							bottom: 0, 
							left: 0
						});
						
						this.list.addListener("mousemove", function(e)
                        {
                            var cell = this.getCellUnderMouse(this.list, e);
                            var row  = cell.row;
                            var col  = cell.col;
                            if((row >= 0) && (col >= 0))
                            {
                                if((this._curTtRow != row) || (this._curTtCol != col))
                                {
                                    this.list.setToolTipText("");
                                    var ttManager = qx.ui.tooltip.Manager.getInstance();
                                    ttManager.resetCurrent();
                                    var ttText = this._onGetToolTipText(this.list, row, col);
                                    if(ttText && (ttText != ""))
                                    {
                                        this.list.setToolTipText(ttText);
                                        ttManager.showToolTip(this.list);
                                    }
                                }
                            }
                            else
                            {
                                if((this._curTtRow >= 0) && (this._curTtCol >= 0))
                                {
                                    this.list.setToolTipText("");
                                    var ttManager = qx.ui.tooltip.Manager.getInstance();
                                    ttManager.resetCurrent();
                                }
                            }
                            this._curTtRow = row;
                            this._curTtCol = col;
                        }, this);
						
						try
						{
							var timer = qx.util.TimerManager.getInstance();
						}
						catch(e)
						{
							console.log("Failed to get timer");
							throw e;
						}
						timer.start(function()
						{
										console.log("Timer function running");
										// example getting player title icon
										// console.log(ClientLib.Data.MainData.GetInstance().get_Player().get_TitleIcon());
										console.log("Getting Members and members count");
										var alliance = ClientLib.Data.MainData.GetInstance().get_Alliance();
										alliance.RefreshMemberData();
										var members = alliance.get_MemberDataAsArray();
						
										console.log("Creating model");
										var rowArr=[];									
									
										var iCounter = 0;
										for(i = 0; i < alliance.get_NumMembers(); i++)
										{
											var member = members[i];
											var name = member.Name;
											if(member.OnlineState == ClientLib.Data.EMemberOnlineState.Away)
											     name=">>" + name;
											if(member.OnlineState == ClientLib.Data.EMemberOnlineState.Online || member.OnlineState == ClientLib.Data.EMemberOnlineState.Away)
											{	
											 
											 //   var name = member.Name;
												rowArr.push([member.Role, name, member.OnlineState, member.RoleName]);
												console.log(member.Role + " - " + member.Name);
												console.log("AllianceMemberOnlineView: " + member.Name + " - " + member.OnlineState);
												iCounter++;
											}
										}
						
										this.model.removeRows(0, this.model.getRowCount(), true)
										this.model.setData(rowArr);
										this.model.sortByColumn(0, true);
						},
						5000,
						this,
						null,
						1000); 
					}
					catch(e)
					{
						console.log("Failed to initialize AllianceMemberOnline.Window");
						console.log(e);
					}
					console.log("AllianceMemberOnline loaded");
				},
				
				// destructor of the class
				destruct: function()
				{
				},
				
				members:
				{			
					model: null,
					list: null,
				
					getCellUnderMouse : function(table, mouseEvent)
                    {
                        var row = -1, col = -1;
                        if(table && mouseEvent)
                        {
                            var pageX = mouseEvent.getDocumentLeft();
                            var pageY = mouseEvent.getDocumentTop();                    
                            var sc = table.getTablePaneScrollerAtPageX(pageX);                    
                            if(sc)                    
                            {                    
                              row = sc._getRowForPagePos(pageX, pageY);                    
                              col = sc._getColumnForPageX(pageX);                    
                              if((row === null) || (row === undefined)) { row = -1; }                    
                              if((col === null) || (col === undefined)) { col = -1; }                    
                            }                    
                          }                    
                          return({ "row": row, "col": col });
                    },
                    
                    _onGetToolTipText : function(table, row, col)
                    {     
                      //  console.log(this.model.getValue(3, row));
                        return this.model.getValue(3, row);                          
                    } 
				}
			});
		}	
		
		
		// **************************************************************
		// Main Initialization
		function AllianceMemberOnline_checkIfLoaded() 
		{
			try 
			{
				if (typeof qx != 'undefined' && qx.core.Init.getApplication() && qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_NAVIGATION) && qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_NAVIGATION).isVisible())
				{
					createClass();
					window.AllianceMemberOnline.Main.getInstance();			
				} else 
				{
					window.setTimeout(AllianceMemberOnline_checkIfLoaded, 1000);
				}
			} catch (e) 
			{
				console.log("AllianceMemberOnline_checkIfLoaded: ", e);
			}
		}
		
		if (/commandandconquer\.com/i.test(document.domain)) {
			window.setTimeout(AllianceMemberOnline_checkIfLoaded, 1000);
		}
	};	
	
	try 
	{
		var script = document.createElement("script");
		script.innerHTML = "(" + AllianceMemberOnline0.toString() + ")();";
		script.type = "text/javascript";
		if (/commandandconquer\.com/i.test(document.domain)) {
			document.getElementsByTagName("head")[0].appendChild(script);
		}
	} 
	catch (e) 
	{
		console.log("AllianceMemberOnline init error: ", e);
	}
})();