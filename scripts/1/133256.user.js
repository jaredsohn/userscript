// ==UserScript==
// @name           Nessus Script Fix Test
// @namespace      Nessus
// @description    Only a test.
// @include        http://prodgame*.lordofultima.com/*/index.aspx*
// ==/UserScript==
(function(){

var NRG_mainFunction = function() {
    window.debugLog = function(data)
    {
        
    }

    function initNessusRiverGuardian()
    {
		var NRG = {};
        qx.Class.define("nessusRiverGuardian.main",
        {
            type: "singleton",
            extend: qx.core.Object,
            construct: function ()
            {
                this.app = qx.core.Init.getApplication();
                this.player = webfrontend.data.Player.getInstance();
                this.playerName = this.player.getName();
                this.chat = this.app.chat;
                this.contextMenu = new nessusRiverGuardian.contextMenu(this);
                this.createRaidApplyToAll();
                this.createWorldViewEnhancments();

                _NRG = NRG;
				this.loadOptions();
				NRG.options = this.options;
				NRG.a = this.app;
                
				// ***** Options button ***** //
				btn = new qx.ui.form.Button("NRG");
				btn.set({width: 40, appearance: "button-text-small", toolTipText: "Nessus River Guardian Options"});
				btn.addListener("click", this.showOptionsPage, this);
				this.app.serverBar.add(btn, {top: 2, left: 430});

				this.optionsPage = new window.NRG.optionsPage();
            },
            members:
            {
                //Coord Types
                CITY: 1,
                LAWLESS: 2,
                BOSS: 4,
                DUNGEON: 8,
                SHRINE: 16,
                MOONGATE: 32,
                SETTLE: 64,
                EMPTY: 128,
                ATTACKABLE: 256,
                ANY: 512,
                app: null,
                player: null,
                playerName: null,
                chat: null,
                contextMenu: null,
                sortMenu: null,
                worldViewCoord: null,
                attacksWindow: null,
                attacksTable: null,
                attacksTableModel: null,
                worldViewMinBtn: null,
				optionsPage: null,
                
				showOptionsPage: function() {
					this.app.switchOverlay(this.optionsPage);
				},
				loadOptions: function() {
					_str = localStorage.getItem("NRG_options");
					if (_str)
                    {
						this.options = qx.util.Json.parse(_str);
                        if (this.options.AttackPower == null) {
                            this.options.RaidUnitCarry = [0,0,0,0,0,0,50,70,0,0,0,90,120,0,0,0,1200,3000];
                        }
                        if (this.options.RaidUnitCarry == null) {
                            this.options.RaidUnitCarry = [0,0,0,10,0,5,10,5,0,10,20,15,5,0,0,0,0,0];
                        }
                        if (this.options.DungeonLoot == null) {
                            this.options.DungeonLoot = [0,200,1000,5000,20000,40000,80000,150000,250000,350000,550000];
                        }
                        if (this.options.DungeonLootMax == null) {
                            this.options.DungeonLootMax = [0,400,2000,10000,40000,80000,160000,300000,500000,800000,1400000];
                        }
                    }
					else 
					{
						this.options = {
							"AttackPower": [0,0,0,30,10,25,50,70,0,40,60,90,120,0,0,0,1200,12000],
							"RaidUnitCarry": [0,0,0,10,20,5,10,5,0,10,20,15,5,0,0,0,1500,3000],
							"DungeonLoot": [0,200,1000,5000,20000,60000,120000,170000,200000,370000,550000],
                            "DungeonLootMax": [0,400,2000,10000,55000,100000,200000,450000,600000,900000,1400000]
						};
					}
					
					this.app.setUserData("NRG_options", this.options);
				},
                updateWorldViewCoord: function ()
                {
                    if (this.worldViewCoord == null)
                    {
                        this.worldViewCoord = new Object();
                    }
                    var worldViewToolTip = this.app.worldViewToolTip;
                    var id = 0;
                    var playerName = null;
                    var allianceName = "";
                    var type = null;
                    var xPos = worldViewToolTip.x - worldViewToolTip.getWorldView().getContentLocation().left;
                    var yPos = worldViewToolTip.y - worldViewToolTip.getWorldView().getContentLocation().top;
                    var xCoord = worldViewToolTip.getVisMain().GetXCoordFromViewPosition(xPos);
                    var yCoord = worldViewToolTip.getVisMain().GetYCoordFromViewPosition(yPos);
					window.console.debug(xPos + ":" + yPos, xCoord + ":" + yCoord);

					var tooltipText = worldViewToolTip.getVisMain().GetTooltipText(xPos, yPos);
                    var level = 0;
                    var progress = 0;

                    if (tooltipText.match(/<td>Player:<\/td><td>(.+?)\(.+?\)(.+?)<\/td>/))
                    {
                        playerName = tooltipText.match(/<td>Player:<\/td><td>(.+?)\(.+?\)(.+?)<\/td>/)[1];
                        if (tooltipText.match(/<td>Alliance:<\/td><td>(.+?)\(.+?\)<\/td>/))
                        {
                            allianceName = tooltipText.match(/<td>Alliance:<\/td><td>(.+?)\(.+?\)<\/td>/)[1];
                        }
                        type = "City";
                    }
                    else if (tooltipText.match(/<td>Score:<\/td><td>.+?<\/td>/))
                    {
                        type = "LawlessCity";
                    }
                    else if (tooltipText.match(/<td width="75">Type:<\/td><td>.+?<\/td>/))
                    {
                        type = "Dungeon";
                        if (tooltipText.match(/<td>Level:<\/td><td>(.+?)<\/td>/))
                        {
                            level = tooltipText.match(/<td>Level:<\/td><td>(.+?)<\/td>/)[1];
                        }
                        if (tooltipText.match(/<td>Progress:<\/td><td>(.+?)%<\/td>/))
                        {
                            progress = tooltipText.match(/<td>Progress:<\/td><td>(.+?)%<\/td>/)[1];
                        }
                    }
                    else if (tooltipText.match(/<td width="75">Name:<\/td><td>.+?<\/td>/))
                    {
                       type = "Boss";
                        if (tooltipText.match(/<td>Level:<\/td><td>(.+?)<\/td>/))
                        {
                            level = tooltipText.match(/<td>Level:<\/td><td>(.+?)<\/td>/)[1];
                        }
                        if (tooltipText.match(/<td width="75">Name:<\/td><td>(.+?)<\/td>/))
                        {
                            playerName = tooltipText.match(/<td width="75">Name:<\/td><td>(.+?)<\/td>/)[1];
                        }
                        window.console.debug("Boss found:", type, level, playerName);
                    }
                    else
                    {
                        type = "FreeSlot";
                    }
                    
                    this.worldViewCoord.id = (yCoord << 0x10) | xCoord;
                    this.worldViewCoord.xPos = xCoord;
                    this.worldViewCoord.yPos = yCoord;
                    this.worldViewCoord.playerName = playerName;
                    this.worldViewCoord.allianceName = allianceName;
                    this.worldViewCoord.type = type;
                    this.worldViewCoord.level = level;
                    this.worldViewCoord.progress = progress;
                    return this.worldViewCoord;
                },
                getBossLevel: function ()
                {
                    var coord = this.worldViewCoord;
                    if (coord.type == "Boss")
                    {
                        return coord.level;
                    }
                    return 0;
                },
                getBossName: function ()
                {
                    var coord = this.worldViewCoord;
                    if (coord.type == "Boss")
                    {
                        return coord.playerName;
                    }
                    return 0;
                },
                getDungeonLevel: function ()
                {
                    var coord = this.worldViewCoord;
                    if (coord.type == "Dungeon")
                    {
                        return coord.level;
                    }
                    return 0;
                },
                checkCoordType: function (types)
                {
                    var coord = this.worldViewCoord;
                    if (types & this.CITY && coord.type == "City")
                    {
                        return true;
                    }
                    else if (types & this.LAWLESS && coord.type == "LawlessCity")
                    {
                        return true;
                    }
                    else if (types & this.BOSS && coord.type == "Boss")
                    {
                        return true;
                    }
                   else if (types & this.DUNGEON && coord.type == "Dungeon")
                    {
                        return true;
                    }
                    else if (types & this.SHRINE && coord.type == "Shrine")
                    {
                        return true;
                    }
                    else if (types & this.MOONGATE && coord.type == "Moongate")
                    {
                        return true;
                    }
                    else if (types & this.SETTLE && coord.type == "Settle")
                    {
                        return true;
                    }
                    else if (types & this.EMPTY && coord.type == "FreeSlot")
                    {
                        return true;
                    }
                    else if (types & this.ATTACKABLE && (coord.type == "City" || coord.type == "Boss" || coord.type == "Dungeon" || coord.type == "LawlessCity"))
                    {
                        return true;
                    }
                    else if (types & this.ANY)
                    {
                        return true;
                    }
                    return false;
                },
                selectCity: function (options)
                {
                    var cityID = 0;
                    if (!isNaN(parseFloat(options)) && isFinite(options))
                    {
                        cityID = options;
                    }
                    else if (options.cityId)
                    {
                        cityID = options.cityId;
                    }
                   else if (options.cityX && options.cityY)
                    {
                        for (var i in this.player.cities)
                        {
                            if (options.cityX == this.player.cities[i].xPos && options.cityY == this.player.cities[i].yPos)
                            {
                                cityID = i;
                                break;
                            }
                        }
                    }
                    else if (options.cityName)
                    {
                        for (var i in this.player.cities)
                        {
                            if (options.cityName == this.player.cities[i].name)
                            {
                                cityID = i;
                                break;
                            }
                        }
                    }
                    
                    if (cityID)
                    {
                        for (var i in this.player.cities)
                        {
                            if (cityID == i)
                            {
                                if (!options.cityIsMine)
                                {
                                    webfrontend.data.City.getInstance().setRequestId(i);
                                }
                                return true;
                            }
                        }
                    }
                    return false;
                },
                sendToChat: function(msg, overWrite)
                {
                    var str = "";
                    if (!overWrite && this.chat && this.chat.chatLine.getValue())
                    {
                        str = this.chat.chatLine.getValue();
                        str = str.substr(0, this.chat.chatLine.getTextSelectionStart()) + msg + str.substr(this.chat.chatLine.getTextSelectionEnd());
                        msg = "";
                    }
                    this.chat.chatLine.setValue(str + msg);
                },
                sendToMail: function(msg, overWrite)
                {
                    var str = "";
                    if (!overWrite && this.app.sendMail && this.app.sendMail.message.getValue())
                    {
                        str = this.app.sendMail.message.getValue();
                        str = str.substr(0, this.app.sendMail.message.getTextSelectionStart()) + msg + str.substr(this.app.sendMail.message.getTextSelectionEnd());
                        msg = "";
                    }
                    this.app.sendMail.message.setValue(str + msg);
                },
                createRaidApplyToAll: function()
                {
                    var orderPage = this.app.getOrderDetailPage();
                    orderPage.applyAllBtn = new webfrontend.ui.SoundButton("Apply to all");
                    orderPage.applyAllBtn.addListener("execute", function (e)
                    {
                        var currRecurrType = orderPage.raidUntilDropdown.getSelection()[0].getModel();
                        var orders = webfrontend.data.City.getInstance().unitOrders;
                        var endStep = orderPage.calculateTimeInputStep();
                        for (var i in orders)
                        {
                            if (orders[i].type == 8)
                            {
                                webfrontend.net.CommandManager.getInstance().sendCommand("UnitOrderSetRecurringOptions",{cityid:webfrontend.data.City.getInstance().getId(),id:orders[i].id,isDelayed:orders[i].isDelayed,recurringType:currRecurrType,recurringEndStep:endStep},null,null,null);
                            }
                        }
                    });
                    orderPage._createSaveOptionsOrig = orderPage._createSaveOptions;
                    orderPage._createSaveOptions = function ()
                    {
                        var rtnVal = orderPage._createSaveOptionsOrig();
                        rtnVal.remove(orderPage.btnApplyChanges);
                        rtnVal.add(orderPage.applyAllBtn);
                        rtnVal.add(orderPage.btnApplyChanges);
                        return rtnVal;
                    }
                    debugLog("HTK Apply to All Raid Button Initialized.");
                },
                createWorldViewEnhancments: function ()
                {
                    this.worldViewMinBtn = new webfrontend.ui.SoundButton("").set({
                        icon: "webfrontend/ui/icons/icon_chat_resize_smaller.png",
                        padding: 4,
                        minWidth: 10,
                        width: 29
                    });
                    this.worldViewMinBtn.setLayoutProperties({top:3,right:9});
                    this.worldViewMinBtn.addListener("execute", function (e)
                    {
                        if (this.app.worldMapConfig.getLayoutProperties().top > 0)
                        {
                            this.app.worldMapConfig.setLayoutProperties({top:null,height:4});
                            this.worldViewMinBtn.setIcon("webfrontend/ui/icons/icon_chat_resize.png");
                        }
                        else
                        {
                            this.app.worldMapConfig.setLayoutProperties({top:187,height:null});
                            this.worldViewMinBtn.setIcon("webfrontend/ui/icons/icon_chat_resize_smaller.png");
                        }
                   }, this);
                    this.worldViewMinBtn.addListener("appear", function (e)
                    {
                        if (this.app.worldMapConfig.getLayoutProperties().top > 0)
                        {
                            this.worldViewMinBtn.setIcon("webfrontend/ui/icons/icon_chat_resize_smaller.png");
                        }
                        else
                        {
                            this.worldViewMinBtn.setIcon("webfrontend/ui/icons/icon_chat_resize.png");
                        }
                    }, this);
                    if (this.app.worldMapConfig == null)
                    {
                        this.app.worldMapConfig = new webfrontend.gui.WorldMapConfig().set({width:400});
                        this.app.worldMapConfig.setLayoutProperties({top:187,left:0,bottom:0});
                    }
                    this.app.worldMapConfig.setMinHeight(0);
                    this.app.worldMapConfig.add(this.worldViewMinBtn);
                    debugLog("HTK World View Enhancments Initialized.");
                }
            }
        });
        
		qx.Class.define("NRG.optionsPage", {
			extend: webfrontend.gui.OverlayWidget,
			construct: function() {
				window.console.log("NRG.optionsPage construct");
				webfrontend.gui.OverlayWidget.call(this);

				this.clientArea.setLayout(new qx.ui.layout.Canvas());
				this.setTitle("Nessus River Guardian Options");
				this.tabView = new qx.ui.tabview.TabView().set({contentPaddingLeft: 15, contentPaddingRight: 10, contentPaddingTop: 10, contentPaddingBottom: 10});
				this.tabPages = [
					{name:"General", page:null, vbox:null},
				];
				for (i=0; i<this.tabPages.length; i++) {
					page = new qx.ui.tabview.Page(this.tabPages[i].name);
					page.setLayout(new qx.ui.layout.Canvas());
					vbox = new qx.ui.container.Composite(new qx.ui.layout.VBox(10));
					scroll = new qx.ui.container.Scroll(vbox);
					page.add(scroll, {top: 0, left: 0, right: 0, bottom: 0});
					this.tabPages[i].vbox = vbox;
					this.tabPages[i].page = page;
				}
				
				// ----- Page 1
				{
					// ----- Boss attack power
					lab = new qx.ui.basic.Label("Unit Stats");
					this.tabPages[0].vbox.add(lab);
				
					gr = new qx.ui.layout.Grid(11, 3);
					gr.setColumnMinWidth(0, 60);
					gr.setColumnAlign(0, "right", "middle");
					cont = new qx.ui.container.Composite(gr);
					bTypesLabels = [ "Berserker", "Mage", "Knight", "Warlock", "Ranger", "Templar", "Crossbowman", "Paladin", "Guardian", "Sloop", "War Galleon"];
					bTypesIndex = [ 6, 7, 11, 12, 3, 5, 9, 10, 4, 16, 17];

                    lab = new qx.ui.basic.Label("Unit");
                    cont.add(lab, {row: 0, column: 0});
                    lab = new qx.ui.basic.Label("Attack Power");
                    cont.add(lab, {row: 0, column: 1});
                    lab = new qx.ui.basic.Label("Loot Carry");
                    cont.add(lab, {row: 0, column: 2});

                    for (i=1; i<=11; i++) {
						lab = new qx.ui.basic.Label(bTypesLabels[i-1]);
						cont.add(lab, {row: i, column: 0});
						sp = new webfrontend.gui.SpinnerInt(0, NRG.options.AttackPower[bTypesIndex[i-1]], 24000);
						sp.getChildControl("textfield").setLiveUpdate(true);
						sp.getChildControl("textfield").addListener("changeValue", function() { NRG.options.AttackPower[this.i] = parseInt(this.c.getValue()); }, {c:sp, i:bTypesIndex[i-1]});
						NRG.a.setElementModalInput(sp);
						cont.add(sp, {row: i, column: 1});
						sp = new webfrontend.gui.SpinnerInt(0, NRG.options.RaidUnitCarry[bTypesIndex[i-1]], 3000);
						sp.getChildControl("textfield").setLiveUpdate(true);
						sp.getChildControl("textfield").addListener("changeValue", function() { NRG.options.RaidUnitCarry[this.i] = parseInt(this.c.getValue()); }, {c:sp, i:bTypesIndex[i-1]});
						NRG.a.setElementModalInput(sp);
						cont.add(sp, {row: i, column: 2});
					}
					this.tabPages[0].vbox.add(cont);
					this.tabPages[0].vbox.add(new qx.ui.core.Spacer(0, 10));

					// ----- Dungeon Raid Limit
					lab = new qx.ui.basic.Label("Dungeon Raids");
					this.tabPages[0].vbox.add(lab);
				    
					gr = new qx.ui.layout.Grid(10, 3);
					gr.setColumnMinWidth(0, 60);
					gr.setColumnMinWidth(1, 90);
					gr.setColumnMinWidth(2, 90);
					gr.setColumnAlign(0, "right", "middle");
					cont = new qx.ui.container.Composite(gr);

                    lab = new qx.ui.basic.Label("Dungeon Level");
                    cont.add(lab, {row: 0, column: 0});
                    lab = new qx.ui.basic.Label("Min Loot");
                    cont.add(lab, {row: 0, column: 1});
                    lab = new qx.ui.basic.Label("Max Loot");
                    cont.add(lab, {row: 0, column: 2});

                    for (i=1; i<=10; i++) {
						lab = new qx.ui.basic.Label("Level " + i);
						cont.add(lab, {row: i, column: 0});

                        sp = new webfrontend.gui.SpinnerInt(0, NRG.options.DungeonLoot[i], 3000000);
						sp.getChildControl("textfield").setLiveUpdate(true);
						sp.getChildControl("textfield").addListener("changeValue", function() { NRG.options.DungeonLoot[this.i] = parseInt(this.c.getValue()); }, {c:sp, i:i});
						NRG.a.setElementModalInput(sp);
						cont.add(sp, {row: i, column: 1});

                        sp = new webfrontend.gui.SpinnerInt(0, NRG.options.DungeonLootMax[i], 3000000);
						sp.getChildControl("textfield").setLiveUpdate(true);
						sp.getChildControl("textfield").addListener("changeValue", function() { NRG.options.DungeonLootMax[this.i] = parseInt(this.c.getValue()); }, {c:sp, i:i});
						NRG.a.setElementModalInput(sp);
						cont.add(sp, {row: i, column: 2});
					}
					this.tabPages[0].vbox.add(cont);
					this.tabPages[0].vbox.add(new qx.ui.core.Spacer(0, 10));

                }		

				{

					// ----- Save Button
					cont = new qx.ui.container.Composite(new qx.ui.layout.HBox());
					btn = new qx.ui.form.Button("Save").set({width: 90, marginLeft: 30});
					btn.addListener("click", this.saveOptions, this);
					cont.add(btn);

					// ----- Add pages to tabview
					for (i=0; i<this.tabPages.length; i++) {
						this.tabView.add(this.tabPages[i].page);
					}
				
					this.clientArea.add(this.tabView, {top: 0, right: 3, bottom: 30, left: 3});
					this.clientArea.add(cont, {right: 3, bottom: 3, left: 3});
				}
			},
			members: {
				tabView: null,
				tabPages: null,
				clrSel: null,
				expImpWin: null,
				saveOptions: function() 
                {
					str = qx.util.Json.stringify(NRG.options);
					localStorage.setItem("NRG_options", str);
				}
			}
		});

        qx.Class.define("nessusRiverGuardian.contextMenu",
        {
            type: "singleton",
            extend: qx.core.Object,
           construct: function (main)
            {
                this.main = main;
                this.worldContext = new qx.ui.menu.Menu();
                this.worldContext.setIconColumnWidth(0);
                this.copyMenu = new qx.ui.menu.Menu();
                this.copyMenu.setIconColumnWidth(0);
                this.infoMenu = new qx.ui.menu.Menu();
                this.infoMenu.setIconColumnWidth(0);
                this.selectCityBtn = new qx.ui.menu.Button("Switch to City");
                this.viewReportsBtn = new qx.ui.menu.Button("View Reports");
                this.killBossBtn = new qx.ui.menu.Button("Kill Boss");
                this.raidDungeonBtn = new qx.ui.menu.Button("Raid");
                this.sendArmyBtn = new qx.ui.menu.Button("Send Army");
                this.plunderBtn = new qx.ui.menu.Button("Plunder");
                this.copyBtn = new qx.ui.menu.Button("Copy to Chat");
                this.copyBtnSub = new qx.ui.menu.Button("Copy to Chat", null, null, this.copyMenu);
                this.copyCoordBtn = new qx.ui.menu.Button("Coordinates");
                this.copyPlayerBtn = new qx.ui.menu.Button("Player");
                this.copyAllianceBtn = new qx.ui.menu.Button("Alliance");
                this.copyToMail = new qx.ui.menu.Button("Copy to Mail", null, null, this.copyMenu);
                this.sendResBtn = new qx.ui.menu.Button("Send Resources");
                this.infoBtn = new qx.ui.menu.Button("Info", null, null, this.infoMenu);
                this.infoPlayerBtn = new qx.ui.menu.Button("Player");
                this.infoAllianceBtn = new qx.ui.menu.Button("Alliance");
                this.whisperBtn = new qx.ui.menu.Button("Whisper");
                this.worldContext.add(this.selectCityBtn);
                this.worldContext.add(this.killBossBtn);
                this.worldContext.add(this.raidDungeonBtn);
                this.worldContext.add(this.sendArmyBtn);
                this.worldContext.add(this.plunderBtn);
                this.worldContext.add(this.sendResBtn);
                this.worldContext.add(this.viewReportsBtn);
                this.worldContext.add(this.infoBtn);
                this.worldContext.add(this.whisperBtn);
                this.worldContext.add(this.copyBtn);
                this.worldContext.add(this.copyBtnSub);
                this.worldContext.add(this.copyToMail);
                this.copyMenu.add(this.copyCoordBtn);
                this.copyMenu.add(this.copyPlayerBtn);
                this.copyMenu.add(this.copyAllianceBtn);
                this.infoMenu.add(this.infoPlayerBtn);
                this.infoMenu.add(this.infoAllianceBtn);
                this.main.app.worldView.setContextMenu(this.worldContext);
                this.main.app.worldView.addListener("beforeContextmenuOpen", function ()
                {
                    this.updateWorldViewContext();
                }, this);
                this.selectCityBtn.addListener("execute", function (e)
                {
                    var coord = this.main.worldViewCoord;
                    if (coord && this.main.checkCoordType(this.main.CITY) && coord.playerName == this.main.playerName)
                    {
                        this.main.selectCity({"cityX": coord.xPos, "cityY": coord.yPos});
                    }
                }, this);
                this.viewReportsBtn.addListener("execute", function (e)
                {
                    var coord = this.main.worldViewCoord;
                    if (coord && this.main.checkCoordType(this.main.ATTACKABLE))
                    {
                        this.main.app.showInfoPage(this.main.app.getCityInfoPage(),{"id":coord.id});
                    }
                }, this);
                this.killBossBtn.addListener("execute", function (e)
                {
                    var coord = this.main.worldViewCoord;
                    if (coord && this.main.checkCoordType(this.main.ATTACKABLE))
                    {
                        // unit types
                        // 0 - cg
                        // 1 - baron?
                        // 2 - ballista
                        // 3 - ranger
                        // 4 - guardian
                        // 5 - templar
                        // 6 - zerk
                        // 7 - mage
                        // 8 - scout
                        // 9 - xbow
                        // 10 - paladin
                        // 11 - knight
                        // 12 - warlock
                        // 13 - ram
                        // 14 - cat
                        // 15 - frigate
                        // 16 - sloop
                        // 17 - WG
                        var bossStrLike = [420,2500,17000,33000,83000,125000,187500,250000,375000];
                        var bossStrUnlike = [625,3750,25000,50000,125000,187500,250000,375000,562500];
                        var unitBossMatch = ["", "", "", "Hydra", "", "Hydra", "Hydra", "Moloch", "", "Dragon", "Dragon", "Dragon", "Moloch", "", "", "", "Octopus", "Octopus"];
                        var bossLevel = this.main.getBossLevel();
                        var trans = 1;
                        if (bossLevel > 0) 
                        {
                            var countNeeded = 0;
                            var unitType = 0;
                            for (var i=0; i < 18; i++)
                            {
                                if (NRG.options.AttackPower[i] > 0 && webfrontend.data.City.getInstance().units[i] != null) 
                                {
                                    if (this.main.getBossName() == unitBossMatch[i]) 
                                    {
                                        countNeeded = bossStrLike[bossLevel-1] * 4 / NRG.options.AttackPower[i];
                                    }
                                    else
                                    {
                                        countNeeded = bossStrUnlike[bossLevel-1] * 4 / NRG.options.AttackPower[i];
                                    }
                                    window.console.debug("Attackable: ", i, countNeeded, webfrontend.data.City.getInstance().units[i].count);
                                    if (countNeeded > 0 && countNeeded <= webfrontend.data.City.getInstance().units[i].count) 
                                    {
                                        unitType = i;
                                        if (i > 14) 
                                        {
                                            trans = 2;
                                        }
                                        else
                                        {
                                            trans = 1;
                                        }
                                        break;
                                    }
                                    else
                                    {
                                        countNeeded = 0;
                                    }
                                }
                            }
                            if (countNeeded > 0) 
                            {
                                var unitsToSend = new Array();
                                
                                unitsToSend.push({t: unitType, c: Math.floor(countNeeded)});
                                webfrontend.net.CommandManager.getInstance().sendCommand("OrderUnits",
                                {
                                    cityid: webfrontend.data.City.getInstance().getId(),
                                    units: unitsToSend,
                                    targetPlayer: "",
                                    targetCity: coord.xPos + ":" + coord.yPos,
                                    order: 8,
                                    transport: trans,
                                    timeReferenceType: 1,
                                    referenceTimeUTCMillis: 0,
                                    raidTimeReferenceType: 0,
                                    raidReferenceTimeUTCMillis: 0
                                },this,this.onTroopsSent);
                            }
                        }
                    }
                }, this);
                this.raidDungeonBtn.addListener("execute", function (e)
                {
                    var coord = this.main.worldViewCoord;
                    if (coord && this.main.checkCoordType(this.main.ATTACKABLE) && this.main.getDungeonLevel() > 0)
                    {
                        var level = this.main.getDungeonLevel();
                        var lootMin = NRG.options.DungeonLoot[level];
                        var lootMax = NRG.options.DungeonLootMax[level];
                        var loot = ((lootMax - lootMin) * coord.progress) / 100 + lootMin;
                        window.console.debug(coord.progress, lootMin, lootMax, loot);
                        var unitType = -1;
                        var orderCount = 0;
                        if (webfrontend.data.City.getInstance().getUnitOrders() != null)
                        {
                            orderCount = webfrontend.data.City.getInstance().getUnitOrders().length;
                        }
                        var orderLimit = webfrontend.data.City.getInstance().getOrderLimit() - orderCount;
                        for (var i = 0; i < 18 && orderLimit > 0; i++) 
                        {
                            if (webfrontend.data.City.getInstance().units[i] != null) 
                            {
                                if (NRG.options.RaidUnitCarry[i] > 0 && webfrontend.data.City.getInstance().units[i].count > 0) 
                                {
                                    var numUnitsPerRep = Math.floor(loot / NRG.options.RaidUnitCarry[i]);
                                    var maxReps = Math.floor(webfrontend.data.City.getInstance().units[i].count / numUnitsPerRep );
                                    for (var x = 0; x < maxReps && orderLimit > 0; x++)
                                    {
                                        var unitsToSend = new Array();
                                        var unitString = "" + i;
                                        var trans = 1;
                                        if (i > 14) 
                                        {
                                            trans = 2;
                                        }
                                        unitsToSend.push({t: unitString, c: numUnitsPerRep});
                                        webfrontend.net.CommandManager.getInstance().sendCommand("OrderUnits",
                                        {
                                                cityid: webfrontend.data.City.getInstance().getId(),
                                                units: unitsToSend,
                                                targetPlayer: "",
                                                targetCity: coord.xPos + ":" + coord.yPos,
                                                order: 8,
                                                transport: trans,
                                                iUnitOrderOptions: 0,
                                                timeReferenceType: 1,
                                                referenceTimeUTCMillis: 0,
                                                raidTimeReferenceType: 1,
                                                raidReferenceTimeUTCMillis: 0,
                                                createCity: ""
                                        },this,this.onTroopsSent);
                                    }
                                }
                            }
                        }
                    }
                }, this);
                this.sendArmyBtn.addListener("execute", function (e)
                {
                    var coord = this.main.worldViewCoord;
                    if (coord && this.main.checkCoordType(this.main.ATTACKABLE))
                    {
                        this.main.app.showSendArmy(coord.xPos, coord.yPos);
                    }
                }, this);
                this.plunderBtn.addListener("execute", function (e)
                {
                    var coord = this.main.worldViewCoord;
                    if (coord && this.main.checkCoordType(this.main.CITY))
                    {
                        var unitsToSend = new Array();
                        for (var i = 0; i < 13; i++) 
                        {
                            if (webfrontend.data.City.getInstance().units[i] != null) 
                            {
                                if (webfrontend.data.City.getInstance().units[i].count > 0) 
                                {
                                    var unitString = "" + i;
                                    unitsToSend.push({t: unitString, c: webfrontend.data.City.getInstance().units[i].count});
                                }
                            }
                        }
                        webfrontend.net.CommandManager.getInstance().sendCommand("OrderUnits",
                        {
                                cityid: webfrontend.data.City.getInstance().getId(),
                                units: unitsToSend,
                                targetPlayer: coord.playerName,
                                targetCity: coord.xPos + ":" + coord.yPos,
                                order: 2,
                                transport: 1,
                                iUnitOrderOptions: 0,
                                timeReferenceType: 1,
                                referenceTimeUTCMillis: 0,
                                raidTimeReferenceType: 0,
                                raidReferenceTimeUTCMillis: 0,
                                createCity: ""
                        },this,this.onTroopsSent);
                    }
                }, this);
                this.copyBtn.addListener("execute", function (e)
                {
                    var coord = this.main.worldViewCoord;
                    if (coord && this.main.checkCoordType(this.main.ANY))
                    {
                        this.main.sendToChat("[city]" + webfrontend.gui.Util.formatCoordinates(coord.xPos,coord.yPos) + "[/city]");
                    }
                }, this);
                this.copyBtnSub.addListener("execute", function (e)
                {
                    var coord = this.main.worldViewCoord;
                    if (coord && this.main.checkCoordType(this.main.ANY))
                    {
                        this.main.sendToChat("[city]" + webfrontend.gui.Util.formatCoordinates(coord.xPos,coord.yPos) + "[/city]");
                    }
                }, this);
                this.copyCoordBtn.addListener("execute", function (e)
                {
                    var coord = this.main.worldViewCoord;
                    if (coord && this.main.checkCoordType(this.main.ANY))
                    {
                        if (this.copyMenu.getOpener() == this.copyToMail)
                        {
                            this.main.sendToMail("[city]" + webfrontend.gui.Util.formatCoordinates(coord.xPos,coord.yPos) + "[/city]");
                        }
                        else
                        {
                            this.main.sendToChat("[city]" + webfrontend.gui.Util.formatCoordinates(coord.xPos,coord.yPos) + "[/city]");
                        }
                    }
                }, this);
                this.copyPlayerBtn.addListener("execute", function (e)
                {
                    var coord = this.main.worldViewCoord;
                    if (coord && this.main.checkCoordType(this.main.CITY | this.main.LAWLESS))
                    {
                        if (this.copyMenu.getOpener() == this.copyToMail)
                        {
                            this.main.sendToMail("[player]" + coord.playerName + "[/player]");
                        }
                        else
                        {
                            this.main.sendToChat("[player]" + coord.playerName + "[/player]");
                        }
                    }
                }, this);
                this.copyAllianceBtn.addListener("execute", function (e)
                {
                    var coord = this.main.worldViewCoord;
                    if (coord && this.main.checkCoordType(this.main.CITY))
                    {
                        if (this.copyMenu.getOpener() == this.copyToMail)
                        {
                            this.main.sendToMail("[alliance]" + coord.allianceName + "[/alliance]");
                        }
                        else
                        {
                            this.main.sendToChat("[alliance]" + coord.allianceName + "[/alliance]");
                        }
                    }
                }, this);
                this.copyToMail.addListener("execute", function (e)
                {
                    var coord = this.main.worldViewCoord;
                    if (coord && this.main.checkCoordType(this.main.ANY))
                    {
                        this.main.sendToMail("[city]" + webfrontend.gui.Util.formatCoordinates(coord.xPos,coord.yPos) + "[/city]");
                    }
                }, this);
                this.sendResBtn.addListener("execute", function (e)
                {
                    var coord = this.main.worldViewCoord;
                    if (coord && this.main.checkCoordType(this.main.CITY))
                    {
                        this.main.app.showTrade(coord.xPos, coord.yPos);
                    }
                }, this);
                this.infoPlayerBtn.addListener("execute", function (e)
                {
                    var coord = this.main.worldViewCoord;
                    if (coord && this.main.checkCoordType(this.main.CITY))
                    {
                        this.main.app.showInfoPage(this.main.app.getPlayerInfoPage(),{"name":coord.playerName});
                    }
                }, this);
                this.infoAllianceBtn.addListener("execute", function (e)
                {
                    var coord = this.main.worldViewCoord;
                    if (coord && this.main.checkCoordType(this.main.CITY))
                    {
                        this.main.app.showInfoPage(this.main.app.getAllianceInfoPage(),{"name":coord.allianceName});
                    }
                }, this);
                this.whisperBtn.addListener("execute", function (e)
                {
                   var coord = this.main.worldViewCoord;
                    if (coord && this.main.checkCoordType(this.main.CITY))
                    {
                        this.main.sendToChat("/whisper " + coord.playerName + " ", true);
                    }
                }, this);
                debugLog("HTK Context Menu Initialized.");
            },
            members:
            {
                main: null,
                worldContext: null,
                copyMenu: null,
                infoMenu: null,
                selectCityBtn: null,
                viewReportsBtn: null,
                killBossBtn: null,
                raidDungeonBtn: null,
                sendArmyBtn: null,
                plunderBtn: null,
                sendResBtn: null,
                copyBtn: null,
                copyBtnSub: null,
                copyCoordBtn: null,
                copyPlayerBtn: null,
                copyAllianceBtn: null,
                copyToMail: null,
                infoBtn: null,
                infoPlayerBtn: null,
                infoAllianceBtn: null,
                whisperBtn: null,
                
                func: function (obj)
                {
                },
            	onTroopsSent: function(ok, errorCode)
				{
					try {
					
					if (errorCode != 0)
					{
						window.console.debug("Troops won't go");
					}
				
					}catch(e){ debug(e); }
				},
			updateWorldViewContext: function ()
                {
                    this.selectCityBtn.setVisibility("excluded");
                    this.viewReportsBtn.setVisibility("excluded");
                    this.killBossBtn.setVisibility("excluded");
                    this.raidDungeonBtn.setVisibility("excluded");
                    this.sendArmyBtn.setVisibility("excluded");
                    this.plunderBtn.setVisibility("excluded");
                    this.sendResBtn.setVisibility("excluded");
                    this.copyBtn.setVisibility("excluded");
                    this.copyBtnSub.setVisibility("excluded");
                    this.copyToMail.setVisibility("excluded");
                    this.infoBtn.setVisibility("excluded");
                    this.whisperBtn.setVisibility("excluded");
                    if (this.main.app.visMain.mapmode == "r" || this.main.app.visMain.mapmode == "w")
                    {
                        var coord = this.main.updateWorldViewCoord();
                        if (coord && this.main.checkCoordType(this.main.CITY) && coord.playerName == this.main.playerName && this.main.selectCity({"cityX": coord.xPos, "cityY": coord.yPos, "cityIsMine": true}))
                        {
                            this.selectCityBtn.setVisibility("visible");
                            this.sendArmyBtn.setVisibility("visible");
                            this.viewReportsBtn.setVisibility("visible");
                            this.copyBtnSub.setVisibility("visible");
                            this.sendResBtn.setVisibility("visible");
                            this.infoBtn.setVisibility("visible");
                            if (this.main.app.sendMail && this.main.app.sendMail.isSeeable())
                            {
                                this.copyToMail.setVisibility("visible");
                            }
                        }
                        else if (coord && this.main.checkCoordType(this.main.ATTACKABLE))
                        {
                            this.viewReportsBtn.setVisibility("visible");
                            this.sendArmyBtn.setVisibility("visible");
                            if (this.main.getBossLevel() > 0)
                            {
                                this.killBossBtn.setVisibility("visible");
                            }
                            if (this.main.getDungeonLevel() > 0)
                            {
                                this.raidDungeonBtn.setVisibility("visible");
                            }
                            if (this.main.checkCoordType(this.main.CITY))
                            {
                                this.plunderBtn.setVisibility("visible");
                                this.copyBtnSub.setVisibility("visible");
                                this.sendResBtn.setVisibility("visible");
                                this.infoBtn.setVisibility("visible");
                                this.whisperBtn.setVisibility("visible");
                                if (this.main.app.sendMail && this.main.app.sendMail.isSeeable())
                                {
                                    this.copyToMail.setVisibility("visible");
                                }
                            }
                            else
                            {
                                this.copyBtn.setVisibility("visible");
                            }
                        }
                        else if (coord && this.main.checkCoordType(this.main.ANY))
                        {
                            this.copyBtn.setVisibility("visible");
                        }
                    }
                }
            }
        });
        
        window.htk = new nessusRiverGuardian.main();
    }

    function checkLoad()
    {
        try {
            if (typeof qx != 'undefined')
            {
                var app = qx.core.Init.getApplication();
                var cityInfo = app.cityInfoView;
                var chat = app.chat;
                var startTime = webfrontend.data.ServerTime.getInstance().refTime;
                if (app && cityInfo && chat && startTime)
                {
                    debugLog("HTK Load Complete.");
                    initNessusRiverGuardian();
                }
                else
                {
                    window.setTimeout(checkLoad, 1000);
                }
            }
            else
            {
                window.setTimeout(checkLoad, 1000);
            }
        } catch (e) {
            if (typeof console != 'undefined') console.log(e);
            else if (window.opera) opera.postError(e);
            else GM_log(e);
        }
    }
    if (/lordofultima\.com/i.test(document.domain))
    {
        debugLog("HTK Loading...");
        window.setTimeout(checkLoad, 1000);
    }
}

    // injecting, because there seem to be problems when creating game interface with unsafeWindow
    var NRGScript = document.createElement("script");
        txt = NRG_mainFunction.toString();
        if (window.opera != undefined)
            txt = txt.replace(/</g,"&lt;"); // rofl Opera
        NRGScript.innerHTML = "(" + txt + ")();";
        NRGScript.type = "text/javascript";
    if (/lordofultima\.com/i.test(document.domain))
        document.getElementsByTagName("head")[0].appendChild(NRGScript);

})();

