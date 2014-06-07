// ==UserScript==
// @name           Nessus River Guardian Tools
// @namespace      Nessus
// @description    Adds various functionalities to Lord of Ultima
// @include        http://prodgame*.lordofultima.com/*/index.aspx*
// ==/UserScript==
(function () {

    var NRG_mainFunction = function () {
            window.debugLog = function (data) {

            }

            function initNessusRiverGuardian() {
                var NRG = {};
                qx.Class.define("nessusRiverGuardian.main", {
                    type: "singleton",
                    extend: qx.core.Object,
                    construct: function () {
                        this.app = qx.core.Init.getApplication();
                        this.player = webfrontend.data.Player.getInstance();
                        this.playerName = this.player.getName();
                        this.chat = this.app.chat;
                        this.contextMenu = new nessusRiverGuardian.contextMenu(this);
                        this.createRaidApplyToAll();
                        this.createWorldViewEnhancments();

                        _NRG = NRG;

                        window.console.debug("this.options", this.options);
                        this.loadOptions();
                        window.console.debug("this.options", this.options);
                        NRG.options = this.options;
                        NRG.a = this.app;
                        NRG.main = this;

                        // ***** Options button ***** //
                        btn = new qx.ui.form.Button("NRG");
                        btn.set({
                            width: 40,
                            appearance: "button-text-small",
                            toolTipText: "Nessus River Guardian Options"
                        });
                        btn.addListener("click", this.showOptionsPage, this);
                        this.app.serverBar.add(btn, {
                            top: 2,
                            left: 650
                        });

                        btn = new qx.ui.form.Button("AutoRaid");
                        btn.addListener("click", this.AutoRaid, this);
                        if (this.app.selectorBar.isMapSelectorBarAnchorToLeft()) {
                            this.app.desktop.add(btn, {left: 690, top: 125});
                        } else {
                            this.app.desktop.add(btn, {left: 405, top: 125});
                        }

                        this.optionsPage = new window.NRG.optionsPage();
                    },
                    members: {
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
                        worldViewMinBtn: null,
                        optionsPage: null,

                        AutoRaid: function ()
                        {
                            window.console.debug("autoRaid called");
                            var dungeons = new Array();
                            var dist = NRG.options.AutoRaidDist;
                            while (dungeons.length < 2 && dist < 10)
                            {
                                dungeons = this.findClosestDungeon(NRG.options.AutoRaidLevel, dist);
                                dist++;
                            }
                            var orderCount = 0;
                            if (webfrontend.data.City.getInstance().getUnitOrders() != null)
                            {
                                orderCount = webfrontend.data.City.getInstance().getUnitOrders().length;
                            }
                            var orderLimit = webfrontend.data.City.getInstance().getOrderLimit() - orderCount;
                            var sentRaid = true;
                            while (sentRaid)
                            {
                                sentRaid = false;
                                for (var i = 0; i < 13 && orderLimit > 0; i++) 
                                {
                                    if (webfrontend.data.City.getInstance().units[i] != null) 
                                    {
                                        if (NRG.options.RaidUnitCarry[i] > 0 && webfrontend.data.City.getInstance().units[i].count > 0) 
                                        {
                                            var troopsLeft = webfrontend.data.City.getInstance().units[i].count;
                                            for (var index = 0; index < dungeons.length && orderLimit > 0; index++)
                                            {
                                                var dungeonCoord = dungeons[index].coord;
                                                var level = dungeons[index].level;

                                                if (dungeonCoord != null)
                                                {
                                                    var loot = NRG.options.DungeonLoot[level];
                                                    var numUnitsPerRep = Math.floor(loot / NRG.options.RaidUnitCarry[i]);
                                                    if (troopsLeft > numUnitsPerRep)
                                                    {
                                                        window.console.debug("sending Dungeon: ", dungeonCoord, "level:", level, "dist:", dungeons[index].dist, numUnitsPerRep, troopsLeft);

                                                        var unitsToSend = new Array();
                                                        var unitString = "" + i;
                                                        unitsToSend.push({t: unitString, c: numUnitsPerRep});
                                                        webfrontend.net.CommandManager.getInstance().sendCommand("OrderUnits",
                                                        {
                                                                cityid: webfrontend.data.City.getInstance().getId(),
                                                                units: unitsToSend,
                                                                targetPlayer: "",
                                                                targetCity: dungeonCoord,
                                                                order: 8,
                                                                transport: 1,
                                                                iUnitOrderOptions: 0,
                                                                timeReferenceType: 1,
                                                                referenceTimeUTCMillis: 0,
                                                                raidTimeReferenceType: 1,
                                                                raidReferenceTimeUTCMillis: 0,
                                                                createCity: ""
                                                        },this,this.onTroopsSent);
                                                        sentRaid = true;
                                                        orderLimit = orderLimit - 1;
                                                        troopsLeft = troopsLeft - numUnitsPerRep;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            //this.scheduleSwitchCity();
                        },
                        scheduleSwitchCity: function()
                        {
                            var tempInterval = 1000 + Math.floor(Math.random()*2000);
                            window.console.debug("Switchin to next city at : " + new Date(new Date().getTime() + tempInterval));
                            qx.event.Timer.once(this.switchCity,this,tempInterval);
                        },
                        switchCity: function()
                        {
                            this.app.cityBar.nextButton.execute();
                        },
                        findClosestDungeon: function(minLevel, maxDist)
                        {
                            var dungeons = new Array();
                            var visMain = this.app.worldViewToolTip.getVisMain();
                            var coords = this.convertIdToCoordinatesObject(webfrontend.data.City.getInstance().getId());
                            window.console.debug("findClosestDungeon called", coords.xPos + ":" + coords.yPos, minLevel, maxDist);
                            for (var xCoord = coords.xPos - maxDist; xCoord <= coords.xPos + maxDist; xCoord++) 
                            {
                                for (var yCoord = coords.yPos - maxDist; yCoord <= coords.yPos + maxDist; yCoord++) 
                                {
                                    var xPos = visMain.ScreenPosFromWorldPosX(xCoord * 128 + 64);
                                    var yPos = visMain.ScreenPosFromWorldPosY(yCoord * 80 + 40);
                                    var tooltipText = visMain.GetTooltipText(xPos, yPos);
                                    var level = 0;
                                    if (tooltipText.match(/<td width="75">Type:<\/td><td>.+?<\/td>/))
                                    {
                                        if (tooltipText.match(/<td>Level:<\/td><td>(.+?)<\/td>/))
                                        {
                                            level = tooltipText.match(/<td>Level:<\/td><td>(.+?)<\/td>/)[1];
                                        }
                                    }
                                    if (level >= minLevel)
                                    {
                                        var diffX = Math.abs(coords.xPos - xCoord);
                                        var diffY = Math.abs(coords.yPos - yCoord);
                                        var dist = Math.sqrt(diffX * diffX + diffY * diffY);
                                        window.console.debug("found Dungeon: ", xCoord + ":" + yCoord, "level:", level, "dist:", dist);
                                        
                                        dungeons.push({
                                            coord: xCoord + ":" + yCoord,
                                            level: level,
                                            dist: dist
                                        });
                                    }
                                }
                            }
                            dungeons.sort(this.dungeonSort);
                            return dungeons;
                        },
                        dungeonSort: function(a,b)
                        {
                            if (a.level == b.level)
                            {
                                return a.dist - b.dist;
                            }
                            else
                            {
                                return b.level - a.level;
                            }
                        },
                        convertIdToCoordinatesObject: function(id) {
                            var o = {
                                xPos: (id & 0xFFFF),
                                yPos: (id >> 16),                                                        
                            }
                            o.cont = webfrontend.data.Server.getInstance().getContinentFromCoords(o.xPos, o.yPos);
                            return o;
                        },
                        showOptionsPage: function () {
                            this.app.switchOverlay(this.optionsPage);
                        },
                        loadOptions: function () {
                            _str = localStorage.getItem("NRG_options");
                            var options;
                            if (_str) {
                                options = qx.lang.Json.parse(_str);
                            }
                            this.options = {
                                "AttackPower": [0, 0, 0, 0, 0, 0, 50, 70, 0, 0, 0, 90, 120, 0, 0, 0, 1200, 12000],
                                "RaidUnitCarry": [0, 0, 0, 10, 0, 5, 10, 5, 0, 10, 20, 15, 5, 0, 0, 0, 1500, 3000],
                                "DungeonLoot": [0, 200, 1000, 5000, 20000, 50000, 100000, 200000, 300000, 400000, 800000],
                                "DungeonLootMax": [0, 400, 2000, 10000, 40000, 80000, 160000, 300000, 500000, 800000, 1400000],
                                "TargetsX": [0, 0, 0, 0, 0, 0, 0],
                                "TargetsY": [0, 0, 0, 0, 0, 0, 0],
                                "ArriveHour": 0,
                                "ArriveMin": 0,
                                "ArriveSec": 0,
                                "ArriveDay": 0,
								"UseFrigs": false,
                                "AutoRaidLevel": 8,
                                "AutoRaidDist": 3
                            };

                            try
                            {
                                this.options.AttackPower = options.AttackPower;
                            }
                            catch (e)
                            {
                            }
                            try
                            {
                                this.options.RaidUnitCarry = options.RaidUnitCarry;
                            }
                            catch (e)
                            {
                            }
                            try
                            {
                                this.options.DungeonLoot = options.DungeonLoot;
                            }
                            catch (e)
                            {
                            }
                            try
                            {
                                this.options.DungeonLootMax = options.DungeonLootMax;
                            }
                            catch (e)
                            {
                            }
                            try
                            {
                                this.options.AutoRaidLevel = options.AutoRaidLevel;
                            }
                            catch (e)
                            {
                            }
                            try
                            {
                                this.options.AutoRaidDist = options.AutoRaidDist;
                            }
                            catch (e)
                            {
                            }

                            this.app.setUserData("NRG_options", this.options);

                            str = qx.lang.Json.stringify(this.options);
                            localStorage.setItem("NRG_options", str);
                        },
                        parseWorldViewCoord: function (xCoord, yCoord) {
                            worldViewCoord = new Object();
                            var worldViewToolTip = this.app.worldViewToolTip;
                            var id = 0;
                            var playerName = null;
                            var allianceName = "";
                            var type = null;
                            var xPos = worldViewToolTip.getVisMain().ScreenPosFromWorldPosX(xCoord * 128);
                            var yPos = worldViewToolTip.getVisMain().ScreenPosFromWorldPosY(yCoord * 80);

                            var tooltipText = worldViewToolTip.getVisMain().GetTooltipText(xPos, yPos);
                            var level = 0;
                            var progress = 0;

                            if (tooltipText.match(/<td>Player:<\/td><td>(.+?) <span dir="ltr">(.+?)<\/td>/)) {
                                playerName = tooltipText.match(/<td>Player:<\/td><td>(.+?) <span dir="ltr">(.+?)<\/td>/)[1];
                                if (tooltipText.match(/<td>Alliance:<\/td><td>(.+?) <span dir="ltr">(.+?)<\/td>/)) {
                                    allianceName = tooltipText.match(/<td>Alliance:<\/td><td>(.+?) <span dir="ltr">(.+?)<\/td>/)[1];
                                }
                                type = "City";
                            } else if (tooltipText.match(/<td>Score:<\/td><td>.+?<\/td>/)) {
                                type = "LawlessCity";
                            } else if (tooltipText.match(/<td width="75">Type:<\/td><td>.+?<\/td>/)) {
                                type = "Dungeon";
                                if (tooltipText.match(/<td>Level:<\/td><td>(.+?)<\/td>/)) {
                                    level = tooltipText.match(/<td>Level:<\/td><td>(.+?)<\/td>/)[1];
                                }
                                if (tooltipText.match(/<td>Progress:<\/td><td>(.+?)%<\/td>/)) {
                                    progress = tooltipText.match(/<td>Progress:<\/td><td>(.+?)%<\/td>/)[1];
                                }
                            } else if (tooltipText.match(/<td width="75">Name:<\/td><td>.+?<\/td>/)) {
                                type = "Boss";
                                if (tooltipText.match(/<td>Level:<\/td><td>(.+?)<\/td>/)) {
                                    level = tooltipText.match(/<td>Level:<\/td><td>(.+?)<\/td>/)[1];
                                }
                                if (tooltipText.match(/<td width="75">Name:<\/td><td>(.+?)<\/td>/)) {
                                    playerName = tooltipText.match(/<td width="75">Name:<\/td><td>(.+?)<\/td>/)[1];
                                }
                                window.console.debug("Boss found:", type, level, playerName);
                            } else {
                                type = "FreeSlot";
                            }

                            worldViewCoord.id = (yCoord << 0x10) | xCoord;
                            worldViewCoord.xPos = xCoord;
                            worldViewCoord.yPos = yCoord;
                            worldViewCoord.playerName = playerName;
                            worldViewCoord.allianceName = allianceName;
                            worldViewCoord.type = type;
                            worldViewCoord.level = level;
                            worldViewCoord.progress = progress;
                            return worldViewCoord;
                        },
                        updateWorldViewCoord: function () {
                            if (this.worldViewCoord == null) {
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
                            if (tooltipText.match(/<td>Player:<\/td><td>(.+?) <span dir="ltr">(.+?)<\/td>/)) {
                                playerName = tooltipText.match(/<td>Player:<\/td><td>(.+?) <span dir="ltr">(.+?)<\/td>/)[1];
                                if (tooltipText.match(/<td>Alliance:<\/td><td>(.+?) <span dir="ltr">(.+?)<\/td>/)) {
                                    allianceName = tooltipText.match(/<td>Alliance:<\/td><td>(.+?) <span dir="ltr">(.+?)<\/td>/)[1];
                                }
                                type = "City";
                            } else if (tooltipText.match(/<td>Score:<\/td><td>.+?<\/td>/)) {
                                type = "LawlessCity";
                            } else if (tooltipText.match(/<td width="75">Type:<\/td><td>.+?<\/td>/)) {
                                type = "Dungeon";
                                if (tooltipText.match(/<td>Level:<\/td><td>(.+?)<\/td>/)) {
                                    level = tooltipText.match(/<td>Level:<\/td><td>(.+?)<\/td>/)[1];
                                }
                                if (tooltipText.match(/<td>Progress:<\/td><td>(.+?)%<\/td>/)) {
                                    progress = tooltipText.match(/<td>Progress:<\/td><td>(.+?)%<\/td>/)[1];
                                }
                            } else if (tooltipText.match(/<td width="75">Name:<\/td><td>.+?<\/td>/)) {
                                type = "Boss";
                                if (tooltipText.match(/<td>Level:<\/td><td>(.+?)<\/td>/)) {
                                    level = tooltipText.match(/<td>Level:<\/td><td>(.+?)<\/td>/)[1];
                                }
                                if (tooltipText.match(/<td width="75">Name:<\/td><td>(.+?)<\/td>/)) {
                                    playerName = tooltipText.match(/<td width="75">Name:<\/td><td>(.+?)<\/td>/)[1];
                                }
                                window.console.debug("Boss found:", type, level, playerName);
                            } else {
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
                        getBossLevel: function () {
                            var coord = this.worldViewCoord;
                            if (coord.type == "Boss") {
                                return coord.level;
                            }
                            return 0;
                        },
                        getBossName: function () {
                            var coord = this.worldViewCoord;
                            if (coord.type == "Boss") {
                                return coord.playerName;
                            }
                            return 0;
                        },
                        getDungeonLevel: function () {
                            var coord = this.worldViewCoord;
                            if (coord.type == "Dungeon") {
                                return coord.level;
                            }
                            return 0;
                        },
                        checkCoordType: function (types) {
                            var coord = this.worldViewCoord;
                            if (types & this.CITY && coord.type == "City") {
                                return true;
                            } else if (types & this.LAWLESS && coord.type == "LawlessCity") {
                                return true;
                            } else if (types & this.BOSS && coord.type == "Boss") {
                                return true;
                            } else if (types & this.DUNGEON && coord.type == "Dungeon") {
                                return true;
                            } else if (types & this.SHRINE && coord.type == "Shrine") {
                                return true;
                            } else if (types & this.MOONGATE && coord.type == "Moongate") {
                                return true;
                            } else if (types & this.SETTLE && coord.type == "Settle") {
                                return true;
                            } else if (types & this.EMPTY && coord.type == "FreeSlot") {
                                return true;
                            } else if (types & this.ATTACKABLE && (coord.type == "City" || coord.type == "Boss" || coord.type == "Dungeon" || coord.type == "LawlessCity")) {
                                return true;
                            } else if (types & this.ANY) {
                                return true;
                            }
                            return false;
                        },
                        selectCity: function (options) {
                            var cityID = 0;
                            if (!isNaN(parseFloat(options)) && isFinite(options)) {
                                cityID = options;
                            } else if (options.cityId) {
                                cityID = options.cityId;
                            } else if (options.cityX && options.cityY) {
                                for (var i in this.player.cities) {
                                    if (options.cityX == this.player.cities[i].xPos && options.cityY == this.player.cities[i].yPos) {
                                        cityID = i;
                                        break;
                                    }
                                }
                            } else if (options.cityName) {
                                for (var i in this.player.cities) {
                                    if (options.cityName == this.player.cities[i].name) {
                                        cityID = i;
                                        break;
                                    }
                                }
                            }

                            if (cityID) {
                                for (var i in this.player.cities) {
                                    if (cityID == i) {
                                        if (!options.cityIsMine) {
                                            webfrontend.data.City.getInstance().setRequestId(i);
                                        }
                                        return true;
                                    }
                                }
                            }
                            return false;
                        },
                        sendToChat: function (msg, overWrite) {
                            var str = "";
                            if (!overWrite && this.chat && this.chat.chatLine.getValue()) {
                                str = this.chat.chatLine.getValue();
                                str = str.substr(0, this.chat.chatLine.getTextSelectionStart()) + msg + str.substr(this.chat.chatLine.getTextSelectionEnd());
                                msg = "";
                            }
                            this.chat.chatLine.setValue(str + msg);
                        },
                        sendToMail: function (msg, overWrite) {
                            var str = "";
                            if (!overWrite && this.app.sendMail && this.app.sendMail.message.getValue()) {
                                str = this.app.sendMail.message.getValue();
                                str = str.substr(0, this.app.sendMail.message.getTextSelectionStart()) + msg + str.substr(this.app.sendMail.message.getTextSelectionEnd());
                                msg = "";
                            }
                            this.app.sendMail.message.setValue(str + msg);
                        },
                        onTroopsSent: function (ok, errorCode) {
                            try {

                                if (errorCode != 0) {
                                    window.console.debug("Troops won't go");
                                }

                            } catch (e) {
                                debug(e);
                            }
                        },
                        createRaidApplyToAll: function () {
                            var orderPage = this.app.getOrderDetailPage();
                            orderPage.applyAllBtn = new webfrontend.ui.SoundButton("Apply to all");
                            orderPage.applyAllBtn.addListener("execute", function (e) {
                                var currRecurrType = orderPage.raidUntilDropdown.getSelection()[0].getModel();
                                var orders = webfrontend.data.City.getInstance().unitOrders;
                                var endStep = orderPage.calculateTimeInputStep();
                                for (var i in orders) {
                                    if (orders[i].type == 8) {
                                        webfrontend.net.CommandManager.getInstance().sendCommand("UnitOrderSetRecurringOptions", {
                                            cityid: webfrontend.data.City.getInstance().getId(),
                                            id: orders[i].id,
                                            isDelayed: orders[i].isDelayed,
                                            recurringType: currRecurrType,
                                            recurringEndStep: endStep
                                        }, this, this.onTroopsSent);
                                    }
                                }
                            });
                            orderPage._createSaveOptionsOrig = orderPage._createSaveOptions;
                            orderPage._createSaveOptions = function () {
                                var rtnVal = orderPage._createSaveOptionsOrig();
                                rtnVal.remove(orderPage.btnApplyChanges);
                                rtnVal.add(orderPage.applyAllBtn);
                                rtnVal.add(orderPage.btnApplyChanges);
                                return rtnVal;
                            }
                            debugLog("HTK Apply to All Raid Button Initialized.");
                        },
                        createWorldViewEnhancments: function () {
                            this.worldViewMinBtn = new webfrontend.ui.SoundButton("").set({
                                icon: "webfrontend/ui/icons/icon_chat_resize_smaller.png",
                                padding: 4,
                                minWidth: 10,
                                width: 29
                            });
                            this.worldViewMinBtn.setLayoutProperties({
                                top: 3,
                                right: 9
                            });
                            this.worldViewMinBtn.addListener("execute", function (e) {
                                if (this.app.worldMapConfig.getLayoutProperties().top > 0) {
                                    this.app.worldMapConfig.setLayoutProperties({
                                        top: null,
                                        height: 4
                                    });
                                    this.worldViewMinBtn.setIcon("webfrontend/ui/icons/icon_chat_resize.png");
                                } else {
                                    this.app.worldMapConfig.setLayoutProperties({
                                        top: 187,
                                        height: null
                                    });
                                    this.worldViewMinBtn.setIcon("webfrontend/ui/icons/icon_chat_resize_smaller.png");
                                }
                            }, this);
                            this.worldViewMinBtn.addListener("appear", function (e) {
                                if (this.app.worldMapConfig.getLayoutProperties().top > 0) {
                                    this.worldViewMinBtn.setIcon("webfrontend/ui/icons/icon_chat_resize_smaller.png");
                                } else {
                                    this.worldViewMinBtn.setIcon("webfrontend/ui/icons/icon_chat_resize.png");
                                }
                            }, this);
                            if (this.app.worldMapConfig == null) {
                                this.app.worldMapConfig = new webfrontend.gui.WorldMapConfig().set({
                                    width: 400
                                });
                                this.app.worldMapConfig.setLayoutProperties({
                                    top: 187,
                                    left: 0,
                                    bottom: 0
                                });
                            }
                            this.app.worldMapConfig.setMinHeight(0);
                            this.app.worldMapConfig.add(this.worldViewMinBtn);
                            debugLog("HTK World View Enhancments Initialized.");
                        }
                    }
                });

                qx.Class.define("NRG.optionsPage", {
                    extend: webfrontend.gui.OverlayWidget,
                    construct: function () {
                        window.console.log("NRG.optionsPage construct");
                        webfrontend.gui.OverlayWidget.call(this);

                        this.clientArea.setLayout(new qx.ui.layout.Canvas());
                        this.setTitle("Nessus River Guardian Options");
                        this.tabView = new qx.ui.tabview.TabView().set({
                            contentPaddingLeft: 15,
                            contentPaddingRight: 10,
                            contentPaddingTop: 10,
                            contentPaddingBottom: 10
                        });
                        this.tabPages = [{
                            name: "General",
                            page: null,
                            vbox: null
                        }, {
                            name: "Attack",
                            page: null,
                            vbox: null
                        }, ];
                        for (i = 0; i < this.tabPages.length; i++) {
                            page = new qx.ui.tabview.Page(this.tabPages[i].name);
                            page.setLayout(new qx.ui.layout.Canvas());
                            vbox = new qx.ui.container.Composite(new qx.ui.layout.VBox(10));
                            scroll = new qx.ui.container.Scroll(vbox);
                            page.add(scroll, {
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0
                            });
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
                            bTypesLabels = ["Beserker", "Mage", "Knight", "Warlock", "Ranger", "Templar", "Xbow", "Paladin", "Guardian", "Sloop", "War Galleon"];
                            bTypesIndex = [6, 7, 11, 12, 3, 5, 9, 10, 4, 16, 17];

                            lab = new qx.ui.basic.Label("Unit");
                            cont.add(lab, {
                                row: 0,
                                column: 0
                            });
                            lab = new qx.ui.basic.Label("Attack Power");
                            cont.add(lab, {
                                row: 0,
                                column: 1
                            });
                            lab = new qx.ui.basic.Label("Loot Carry");
                            cont.add(lab, {
                                row: 0,
                                column: 2
                            });

                            for (i = 1; i <= 11; i++) {
                                lab = new qx.ui.basic.Label(bTypesLabels[i - 1]);
                                cont.add(lab, {
                                    row: i,
                                    column: 0
                                });
                                sp = new webfrontend.ui.SpinnerInt(0, NRG.options.AttackPower[bTypesIndex[i - 1]], 24000);
                                sp.getChildControl("textfield").setLiveUpdate(true);
                                sp.getChildControl("textfield").addListener("changeValue", function () {
                                    NRG.options.AttackPower[this.i] = parseInt(this.c.getValue(),10);
                                }, {
                                    c: sp,
                                    i: bTypesIndex[i - 1]
                                });
                                NRG.a.setElementModalInput(sp);
                                cont.add(sp, {
                                    row: i,
                                    column: 1
                                });
                                sp = new webfrontend.ui.SpinnerInt(0, NRG.options.RaidUnitCarry[bTypesIndex[i - 1]], 3000);
                                sp.getChildControl("textfield").setLiveUpdate(true);
                                sp.getChildControl("textfield").addListener("changeValue", function () {
                                    NRG.options.RaidUnitCarry[this.i] = parseInt(this.c.getValue(),10);
                                }, {
                                    c: sp,
                                    i: bTypesIndex[i - 1]
                                });
                                NRG.a.setElementModalInput(sp);
                                cont.add(sp, {
                                    row: i,
                                    column: 2
                                });
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
                            cont.add(lab, {
                                row: 0,
                                column: 0
                            });
                            lab = new qx.ui.basic.Label("Min Loot");
                            cont.add(lab, {
                                row: 0,
                                column: 1
                            });
                            lab = new qx.ui.basic.Label("Max Loot");
                            cont.add(lab, {
                                row: 0,
                                column: 2
                            });

                            for (i = 1; i <= 10; i++) {
                                lab = new qx.ui.basic.Label("Level " + i);
                                cont.add(lab, {
                                    row: i,
                                    column: 0
                                });

                                sp = new webfrontend.ui.SpinnerInt(0, NRG.options.DungeonLoot[i], 3000000);
                                sp.getChildControl("textfield").setLiveUpdate(true);
                                sp.getChildControl("textfield").addListener("changeValue", function () {
                                    NRG.options.DungeonLoot[this.i] = parseInt(this.c.getValue(),10);
                                }, {
                                    c: sp,
                                    i: i
                                });
                                NRG.a.setElementModalInput(sp);
                                cont.add(sp, {
                                    row: i,
                                    column: 1
                                });

                                sp = new webfrontend.ui.SpinnerInt(0, NRG.options.DungeonLootMax[i], 3000000);
                                sp.getChildControl("textfield").setLiveUpdate(true);
                                sp.getChildControl("textfield").addListener("changeValue", function () {
                                    NRG.options.DungeonLootMax[this.i] = parseInt(this.c.getValue(),10);
                                }, {
                                    c: sp,
                                    i: i
                                });
                                NRG.a.setElementModalInput(sp);
                                cont.add(sp, {
                                    row: i,
                                    column: 2
                                });
                            }
                            this.tabPages[0].vbox.add(cont);
                            this.tabPages[0].vbox.add(new qx.ui.core.Spacer(0, 10));

                        }
                        // ----- Page 2
                        {
                            lab = new qx.ui.basic.Label("*** BETA ***");
                            this.tabPages[1].vbox.add(lab);
                            lab = new qx.ui.basic.Label("If you use this the options button on the army screen may hang your browser.");
                            this.tabPages[1].vbox.add(lab);
                            lab = new qx.ui.basic.Label("Don't blame me if Llamas kill your armies!");
                            this.tabPages[1].vbox.add(lab);

                            lab = new qx.ui.basic.Label("Targets");
                            this.tabPages[1].vbox.add(lab);

                            gr = new qx.ui.layout.Grid(7, 3);
                            gr.setColumnMinWidth(0, 60);
                            gr.setColumnAlign(0, "right", "middle");
                            cont = new qx.ui.container.Composite(gr);
                            targetLabels = ["Real", "Fake 1", "Fake 2", "Fake 3", "Fake 4", "Fake 5", "Fake 6"];

                            for (i = 0; i < 7; i++) {
                                lab = new qx.ui.basic.Label(targetLabels[i]);
                                cont.add(lab, {
                                    row: i,
                                    column: 0
                                });
                                this.TargetsX[i] = new qx.ui.form.TextField(NRG.options.TargetsX[i].toString());
                                this.TargetsX[i].setLiveUpdate(true);
                                cont.add(this.TargetsX[i], {
                                    row: i,
                                    column: 1
                                });
                                this.TargetsY[i] = new qx.ui.form.TextField(NRG.options.TargetsY[i].toString());
                                this.TargetsY[i].setLiveUpdate(true);
                                cont.add(this.TargetsY[i], {
                                    row: i,
                                    column: 2
                                });
                            }

                            this.tabPages[1].vbox.add(cont);
                            this.tabPages[1].vbox.add(new qx.ui.core.Spacer(0, 10));


                            lab = new qx.ui.basic.Label("Arrival time:");
                            this.tabPages[1].vbox.add(lab);

                            gr = new qx.ui.layout.Grid(3, 4);
                            gr.setColumnMinWidth(0, 60);
                            gr.setColumnAlign(0, "right", "middle");
                            cont = new qx.ui.container.Composite(gr);

                            lab = new qx.ui.basic.Label("H:M:S");
                            cont.add(lab, {
                                row: 0,
                                column: 0
                            });
                            this.ArriveHour = new qx.ui.form.TextField(NRG.options.ArriveHour.toString());
                            this.ArriveHour.setLiveUpdate(true);
                            cont.add(this.ArriveHour, {
                                row: 0,
                                column: 1
                            });
                            this.ArriveMin = new qx.ui.form.TextField(NRG.options.ArriveMin.toString());
                            this.ArriveMin.setLiveUpdate(true);
                            cont.add(this.ArriveMin, {
                                row: 0,
                                column: 2
                            });
                            this.ArriveSec = new qx.ui.form.TextField(NRG.options.ArriveSec.toString());
                            this.ArriveSec.setLiveUpdate(true);
                            cont.add(this.ArriveSec, {
                                row: 0,
                                column: 3
                            });

                            lab = new qx.ui.basic.Label("Day");
                            cont.add(lab, {
                                row: 1,
                                column: 0
                            });
                            this.ArriveDay = new qx.ui.form.TextField(NRG.options.ArriveDay.toString());
                            cont.add(this.ArriveDay, {
                                row: 1,
                                column: 1
                            });
                            this.ArriveDay.setLiveUpdate(true);

							cb = new qx.ui.form.CheckBox("Use Frigs");
							if (NRG.options.UseFrigs)
								cb.setValue(true);
							cb.addListener("click", function() { NRG.options.UseFrigs = this.getValue() ? true : false; }, cb);
                            cont.add(cb, {
                                row: 2,
                                column: 0
                            });

                            this.tabPages[1].vbox.add(cont);
                            this.tabPages[1].vbox.add(new qx.ui.core.Spacer(0, 10));

                            btn = new qx.ui.form.Button("Assault").set({
                                width: 90,
                                marginLeft: 30
                            });
                            btn.addListener("click", this.sendAssault, this);
                            this.tabPages[1].vbox.add(btn);

                            btn = new qx.ui.form.Button("Siege").set({
                                width: 90,
                                marginLeft: 30
                            });
                            btn.addListener("click", this.sendSiege, this);
                            this.tabPages[1].vbox.add(btn);
                        }

                        {

                            // ----- Save Button
                            cont = new qx.ui.container.Composite(new qx.ui.layout.HBox());
                            btn = new qx.ui.form.Button("Save").set({
                                width: 90,
                                marginLeft: 30
                            });
                            btn.addListener("click", this.saveOptions, this);
                            cont.add(btn);

                            // ----- Add pages to tabview
                            for (i = 0; i < this.tabPages.length; i++) {
                                this.tabView.add(this.tabPages[i].page);
                            }

                            this.clientArea.add(this.tabView, {
                                top: 0,
                                right: 3,
                                bottom: 30,
                                left: 3
                            });
                            this.clientArea.add(cont, {
                                right: 3,
                                bottom: 3,
                                left: 3
                            });
                        }
                    },
                    members: {
                        tabView: null,
                        tabPages: null,
                        clrSel: null,
                        expImpWin: null,
                        TargetsX: [null, null, null, null, null, null, null],
                        TargetsY: [null, null, null, null, null, null, null],
                        ArriveHour: null,
                        ArriveMin: null,
                        ArriveSec: null,
                        ArriveDay: null,
                        UseFrigs: null,
                        saveOptions: function () {
                            str = qx.lang.Json.stringify(NRG.options);
                            localStorage.setItem("NRG_options", str);
                        },
                        GetArrivalTime: function (day, hour, min, sec) {
                            var hM = webfrontend.Util.getCurrentTime();
                            var hA = 0;
                            var ie = webfrontend.data.ServerTime.getInstance();
                            if (webfrontend.config.Config.getInstance().getTimeZone() > 0) {
                                hM.setHours(hM.getHours() + hM.getTimezoneOffset() / 60);
                                hA += hM.getTimezoneOffset() / 60;
                                if (webfrontend.config.Config.getInstance().getTimeZone() == 1) hA += ie.getServerOffset() / 1000 / 60 / 60;
                                else if (webfrontend.config.Config.getInstance().getTimeZone() == 2) hA += webfrontend.config.Config.getInstance().getTimeZoneOffset() / 1000 / 60 / 60;
                            }

                            var ic = new Date(hM.getTime());
                            ic.setDate(ic.getDate() + day);
                            ic.setHours(hour - hA);
                            ic.setMinutes(min);
                            ic.setSeconds(sec);
                            ic.setMilliseconds(500);
                            if (webfrontend.config.Config.getInstance().getTimeZone() == 0) ic = new Date(ic.getTime() - webfrontend.data.ServerTime.getInstance().getDiff());
                            return ic.getTime();
                        },
                        onTroopsSent: function (ok, errorCode) {
                            try {

                                if (errorCode != 0) {
                                    window.console.debug("Troops won't go");
                                }

                            } catch (e) {
                                debug(e);
                            }
                        },
                        sendAssault: function () {
                            this.sendAttack(webfrontend.base.GameObjects.eUnitOrderType.Attack, webfrontend.base.GameObjects.eUnitOrderType.Plunder);
                        },
                        sendSiege: function () {
                            this.sendAttack(webfrontend.base.GameObjects.eUnitOrderType.Siege, webfrontend.base.GameObjects.eUnitOrderType.Siege);
                        },
                        sendAttack: function (realAttack, fakeAttack) {
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
                            var TS = [1, 1, 300, 3000, 3000, 3000, 3000, 3000, 1500, 1500, 1500, 1500, 1500, 300, 300, 6, 6, 8];
                            var TSboat = [1, 1, 250, 2500, 2500, 2500, 2500, 2500, 1250, 1250, 1250, 1250, 1250, 250, 250, 6, 6, 8];
                            var unitsToSendReal = new Array();
                            var unitsToSendFake = new Array();
                            var fakeIndex = 0;
                            var fakeCount = 0;
                            var transport = 1;
                            var numFrigates = 0;
							window.console.debug("NRG: Attempting to send attack, UseFrigs=", NRG.options.UseFrigs);

                            for (var i = 0; i < 18; i++) {
                                if (webfrontend.data.City.getInstance().units[i] != null) {
                                    var total = webfrontend.data.City.getInstance().units[i].total;
                                    if (total > 0) {
                                        if (total > fakeCount) {
                                            fakeCount = total;
                                            fakeIndex = i;
                                        }
                                        if (i == 15 || i == 16 || i == 17) {
											if (NRG.options.UseFrigs)
											{
												transport = 2;
											}
                                        }
                                        if (i == 15) {
                                            numFrigates = total;
                                        }
                                    }
                                }
                            }

                            var numFakes = 0;
                            for (var i = 1; i < 6; i++) {
                                if (parseInt(this.TargetsX[i].getValue(),10) != 0 && parseInt(this.TargetsY[i].getValue(),10) != 0) {
                                    numFakes = numFakes + 1;
                                }
                            }
                            if (numFrigates > 0 && NRG.options.UseFrigs) {
                                unitsToSendFake.push({
                                    t: fakeIndex,
                                    c: TSboat[fakeIndex]
                                });
                                unitsToSendFake.push({
                                    t: 15,
                                    c: 5
                                });
                            } else {
                                unitsToSendFake.push({
                                    t: fakeIndex,
                                    c: TS[fakeIndex]
                                });
                            }
                            for (var i = 0; i < 18; i++) {
                                if (webfrontend.data.City.getInstance().units[i] != null) {
                                    var total = webfrontend.data.City.getInstance().units[i].total;
                                    if (total > 0) {
                                        if (i == fakeIndex) {
                                            if (numFrigates > 0 && NRG.options.UseFrigs) {
                                                total = total - TSboat[i] * numFakes;
                                                if (total > 500 * (numFrigates - numFakes * 5)) {
                                                    total = 500 * (numFrigates - numFakes * 5);
                                                }
                                                unitsToSendReal.push({
                                                    t: 15,
                                                    c: numFrigates - numFakes * 5
                                                });

                                            } else {
                                                total = total - TS[i] * numFakes;
                                            }
                                        }
                                        if (i != 15) {
                                            unitsToSendReal.push({
                                                t: i,
                                                c: total
                                            });
                                        }
                                    }
                                }
                            }
                            var time = this.GetArrivalTime(parseInt(this.ArriveDay.getValue(),10), parseInt(this.ArriveHour.getValue(),10), parseInt(this.ArriveMin.getValue(),10), parseInt(this.ArriveSec.getValue(),10));
                            for (var i = 0; i < 6; i++) {
                                if (parseInt(this.TargetsX[i].getValue(),10) != 0 && parseInt(this.TargetsY[i].getValue(),10) != 0) {
                                    var troops = unitsToSendFake;
                                    var order = fakeAttack;
                                    if (i == 0) {
                                        troops = unitsToSendReal;
                                        order = realAttack;
										window.console.debug("    ", "real target:", parseInt(this.TargetsX[i].getValue(),10), parseInt(this.TargetsY[i].getValue(),10));
                                    }
									else
									{
										window.console.debug("    ", "fake target:", parseInt(this.TargetsX[i].getValue(),10), parseInt(this.TargetsY[i].getValue(),10));
									}
									window.console.debug("    ", "troops:", troops);
                                    coord = NRG.main.parseWorldViewCoord(parseInt(this.TargetsX[i].getValue(),10), parseInt(this.TargetsY[i].getValue(),10));
                                    webfrontend.net.CommandManager.getInstance().sendCommand("OrderUnits", {
                                        cityid: webfrontend.data.City.getInstance().getId(),
                                        units: troops,
                                        targetPlayer: coord.playerName,
                                        targetCity: coord.xPos + ":" + coord.yPos,
                                        order: order,
                                        transport: transport,
                                        iUnitOrderOptions: 0,
                                        timeReferenceType: 3,
                                        referenceTimeUTCMillis: time,
                                        raidTimeReferenceType: 0,
                                        raidReferenceTimeUTCMillis: 0,
                                        createCity: ""
                                    }, this, this.onTroopsSent);
                                }
                            }
                        }
                    }
                });

                qx.Class.define("nessusRiverGuardian.contextMenu", {
                    type: "singleton",
                    extend: qx.core.Object,
                    construct: function (main) {
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
                        this.raidDungeonBtn = new qx.ui.menu.Button("Raid Max");
                        this.raidDungeon1Btn = new qx.ui.menu.Button("Raid 1");
                        this.raidDungeonAllBtn = new qx.ui.menu.Button("Raid all");
                        this.sendArmyBtn = new qx.ui.menu.Button("Send Army");
                        this.plunderBtn = new qx.ui.menu.Button("Plunder");
                        this.scoutBtn = new qx.ui.menu.Button("Scout");
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
                        this.worldContext.add(this.raidDungeon1Btn);
                        this.worldContext.add(this.raidDungeonAllBtn);
                        this.worldContext.add(this.sendArmyBtn);
                        this.worldContext.add(this.plunderBtn);
                        this.worldContext.add(this.scoutBtn);
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
                        this.main.app.worldView.addListener("beforeContextmenuOpen", function () {
                            this.updateWorldViewContext();
                        }, this);
                        this.selectCityBtn.addListener("execute", function (e) {
                            var coord = this.main.worldViewCoord;
                            if (coord && this.main.checkCoordType(this.main.CITY) && coord.playerName == this.main.playerName) {
                                this.main.selectCity({
                                    "cityX": coord.xPos,
                                    "cityY": coord.yPos
                                });
                            }
                        }, this);
                        this.viewReportsBtn.addListener("execute", function (e) {
                            var coord = this.main.worldViewCoord;
                            if (coord && this.main.checkCoordType(this.main.ATTACKABLE)) {
                                this.main.app.showInfoPage(this.main.app.getCityInfoPage(), {
                                    "id": coord.id
                                });
                            }
                        }, this);
                        this.killBossBtn.addListener("execute", function (e) {
                            var coord = this.main.worldViewCoord;
                            if (coord && this.main.checkCoordType(this.main.ATTACKABLE)) {
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
                                var bossStrLike = [420, 2500, 17000, 33000, 83000, 125000, 187500, 250000, 375000];
                                var bossStrUnlike = [625, 3750, 25000, 50000, 125000, 187500, 250000, 375000, 562500];
                                var unitBossMatch = ["", "", "", "Hydra", "", "Hydra", "Hydra", "Moloch", "", "Dragon", "Dragon", "Dragon", "Moloch", "", "", "", "Octopus", "Octopus"];
                                var bossLevel = this.main.getBossLevel();
                                var trans = 1;
                                if (bossLevel > 0) {
                                    var countNeeded = 0;
                                    var unitType = 0;
                                    for (var i = 0; i < 18; i++) {
                                        if (NRG.options.AttackPower[i] > 0 && webfrontend.data.City.getInstance().units[i] != null) {
                                            if (this.main.getBossName() == unitBossMatch[i]) {
                                                countNeeded = bossStrLike[bossLevel - 1] * 4 / NRG.options.AttackPower[i];
                                            } else {
                                                countNeeded = bossStrUnlike[bossLevel - 1] * 4 / NRG.options.AttackPower[i];
                                            }
                                            window.console.debug("Attackable: ", i, countNeeded, webfrontend.data.City.getInstance().units[i].count);
                                            if (countNeeded > 0 && countNeeded <= webfrontend.data.City.getInstance().units[i].count) {
                                                unitType = i;
                                                if (i > 14) {
                                                    trans = 2;
                                                } else {
                                                    trans = 1;
                                                }
                                                break;
                                            } else {
                                                countNeeded = 0;
                                            }
                                        }
                                    }
                                    if (countNeeded > 0) {
                                        var unitsToSend = new Array();

                                        unitsToSend.push({
                                            t: unitType,
                                            c: Math.floor(countNeeded)
                                        });
                                        webfrontend.net.CommandManager.getInstance().sendCommand("OrderUnits", {
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
                                        }, this, this.onTroopsSent);
                                    }
                                }
                            }
                        }, this);
                        this.raidDungeonBtn.addListener("execute", function (e) {
                            var coord = this.main.worldViewCoord;
                            if (coord && this.main.checkCoordType(this.main.ATTACKABLE) && this.main.getDungeonLevel() > 0) {
                                var level = this.main.getDungeonLevel();
                                var lootMin = NRG.options.DungeonLoot[level];
                                var lootMax = NRG.options.DungeonLootMax[level];
                                var loot = ((lootMax - lootMin) * coord.progress) / 100 + lootMin;
                                window.console.debug(coord.progress, lootMin, lootMax, loot);
                                var unitType = -1;
                                var orderCount = 0;
                                if (webfrontend.data.City.getInstance().getUnitOrders() != null) {
                                    orderCount = webfrontend.data.City.getInstance().getUnitOrders().length;
                                }
                                var orderLimit = webfrontend.data.City.getInstance().getOrderLimit() - orderCount;
                                for (var i = 0; i < 18 && orderLimit > 0; i++) {
                                    if (webfrontend.data.City.getInstance().units[i] != null) {
                                        if (NRG.options.RaidUnitCarry[i] > 0 && webfrontend.data.City.getInstance().units[i].count > 0) {
                                            var numUnitsPerRep = Math.floor(loot / NRG.options.RaidUnitCarry[i]);
                                            var maxReps = Math.floor(webfrontend.data.City.getInstance().units[i].count / numUnitsPerRep);
                                            for (var x = 0; x < maxReps && orderLimit > 0; x++) {
                                                var unitsToSend = new Array();
                                                var unitString = "" + i;
                                                var trans = 1;
                                                if (i > 14) {
                                                    trans = 2;
                                                }
                                                unitsToSend.push({
                                                    t: unitString,
                                                    c: numUnitsPerRep
                                                });
                                                webfrontend.net.CommandManager.getInstance().sendCommand("OrderUnits", {
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
                                                }, this, this.onTroopsSent);
                                                orderLimit = orderLimit - 1;
                                            }
                                        }
                                    }
                                }
                            }
                        }, this);
                        this.raidDungeon1Btn.addListener("execute", function (e) {
                            var coord = this.main.worldViewCoord;
                            if (coord && this.main.checkCoordType(this.main.ATTACKABLE) && this.main.getDungeonLevel() > 0) {
                                var level = this.main.getDungeonLevel();
                                var lootMin = NRG.options.DungeonLoot[level];
                                var lootMax = NRG.options.DungeonLootMax[level];
                                var loot = ((lootMax - lootMin) * coord.progress) / 100 + lootMin;
                                window.console.debug(coord.progress, lootMin, lootMax, loot);
                                var unitType = -1;
                                var orderCount = 0;
                                if (webfrontend.data.City.getInstance().getUnitOrders() != null) {
                                    orderCount = webfrontend.data.City.getInstance().getUnitOrders().length;
                                }
                                var orderLimit = webfrontend.data.City.getInstance().getOrderLimit() - orderCount;
                                for (var i = 0; i < 18 && orderLimit > 0; i++) {
                                    if (webfrontend.data.City.getInstance().units[i] != null) {
                                        if (NRG.options.RaidUnitCarry[i] > 0 && webfrontend.data.City.getInstance().units[i].count > 0) {
                                            var numUnitsPerRep = Math.floor(loot / NRG.options.RaidUnitCarry[i]);
                                            var maxReps = Math.floor(webfrontend.data.City.getInstance().units[i].count / numUnitsPerRep);
                                            for (var x = 0; x < maxReps && orderLimit > 0; x++) {
                                                var unitsToSend = new Array();
                                                var unitString = "" + i;
                                                var trans = 1;
                                                if (i > 14) {
                                                    trans = 2;
                                                }
                                                unitsToSend.push({
                                                    t: unitString,
                                                    c: numUnitsPerRep
                                                });
                                                webfrontend.net.CommandManager.getInstance().sendCommand("OrderUnits", {
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
                                                }, this, this.onTroopsSent);
                                                orderLimit = 0;
                                            }
                                        }
                                    }
                                }
                            }
                        }, this);
                        this.raidDungeonAllBtn.addListener("execute", function (e) {
                            var coord = this.main.worldViewCoord;
                            if (coord && this.main.checkCoordType(this.main.ATTACKABLE) && this.main.getDungeonLevel() > 0) {
                                var unitType = -1;
                                var orderCount = 0;
                                if (webfrontend.data.City.getInstance().getUnitOrders() != null) {
                                    orderCount = webfrontend.data.City.getInstance().getUnitOrders().length;
                                }
                                var orderLimit = webfrontend.data.City.getInstance().getOrderLimit() - orderCount;
                                var unitsToSend = new Array();
                                var trans = 1;
                                for (var i = 0; i < 15; i++) 
                                {
                                    if (webfrontend.data.City.getInstance().units[i] != null) 
                                    {
                                        if (NRG.options.RaidUnitCarry[i] > 0 && webfrontend.data.City.getInstance().units[i].count > 0) 
                                        {
                                            var unitString = "" + i;
                                            unitsToSend.push({
                                                t: unitString,
                                                c: webfrontend.data.City.getInstance().units[i].count
                                            });
                                        }
                                    }
                                }
                                if (orderLimit > 0 && unitsToSend.length > 0)
                                {
                                    webfrontend.net.CommandManager.getInstance().sendCommand("OrderUnits", {
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
                                    }, this, this.onTroopsSent);
                                }
                            }
                        }, this);
                        this.sendArmyBtn.addListener("execute", function (e) {
                            var coord = this.main.worldViewCoord;
                            if (coord && this.main.checkCoordType(this.main.ATTACKABLE)) {
                                this.main.app.showSendArmy(coord.xPos, coord.yPos);
                            }
                        }, this);
                        this.plunderBtn.addListener("execute", function (e) {
                            var coord = this.main.worldViewCoord;
                            if (coord && this.main.checkCoordType(this.main.CITY)) {
                                var unitsToSend = new Array();
                                for (var i = 0; i < 13; i++) {
                                    if (webfrontend.data.City.getInstance().units[i] != null) {
                                        if (webfrontend.data.City.getInstance().units[i].count > 0) {
                                            var unitString = "" + i;
                                            unitsToSend.push({
                                                t: unitString,
                                                c: webfrontend.data.City.getInstance().units[i].count
                                            });
                                        }
                                    }
                                }
                                webfrontend.net.CommandManager.getInstance().sendCommand("OrderUnits", {
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
                                }, this, this.onTroopsSent);
                            }
                        }, this);
                        this.scoutBtn.addListener("execute", function (e) {
                            var coord = this.main.worldViewCoord;
                            if (coord && this.main.checkCoordType(this.main.CITY)) {
                                var unitsToSend = new Array();
                                if (webfrontend.data.City.getInstance().units[8] != null) {
                                    if (webfrontend.data.City.getInstance().units[8].count >= 1500) {
                                        unitsToSend.push({
                                            t: 8,
                                            c: 1500
                                        });
                                    }
                                }
                                webfrontend.net.CommandManager.getInstance().sendCommand("OrderUnits", {
                                    cityid: webfrontend.data.City.getInstance().getId(),
                                    units: unitsToSend,
                                    targetPlayer: coord.playerName,
                                    targetCity: coord.xPos + ":" + coord.yPos,
                                    order: 1,
                                    transport: 1,
                                    iUnitOrderOptions: 0,
                                    timeReferenceType: 1,
                                    referenceTimeUTCMillis: 0,
                                    raidTimeReferenceType: 0,
                                    raidReferenceTimeUTCMillis: 0,
                                    createCity: ""
                                }, this, this.onTroopsSent);
                            }
                        }, this);
                        this.copyBtn.addListener("execute", function (e) {
                            var coord = this.main.worldViewCoord;
                            if (coord && this.main.checkCoordType(this.main.ANY)) {
                                this.main.sendToChat("[city]" + webfrontend.gui.Util.formatCoordinates(coord.xPos, coord.yPos) + "[/city]");
                            }
                        }, this);
                        this.copyBtnSub.addListener("execute", function (e) {
                            var coord = this.main.worldViewCoord;
                            if (coord && this.main.checkCoordType(this.main.ANY)) {
                                this.main.sendToChat("[city]" + webfrontend.gui.Util.formatCoordinates(coord.xPos, coord.yPos) + "[/city]");
                            }
                        }, this);
                        this.copyCoordBtn.addListener("execute", function (e) {
                            var coord = this.main.worldViewCoord;
                            if (coord && this.main.checkCoordType(this.main.ANY)) {
                                if (this.copyMenu.getOpener() == this.copyToMail) {
                                    this.main.sendToMail("[city]" + webfrontend.gui.Util.formatCoordinates(coord.xPos, coord.yPos) + "[/city]");
                                } else {
                                    this.main.sendToChat("[city]" + webfrontend.gui.Util.formatCoordinates(coord.xPos, coord.yPos) + "[/city]");
                                }
                            }
                        }, this);
                        this.copyPlayerBtn.addListener("execute", function (e) {
                            var coord = this.main.worldViewCoord;
                            if (coord && this.main.checkCoordType(this.main.CITY | this.main.LAWLESS)) {
                                if (this.copyMenu.getOpener() == this.copyToMail) {
                                    this.main.sendToMail("[player]" + coord.playerName + "[/player]");
                                } else {
                                    this.main.sendToChat("[player]" + coord.playerName + "[/player]");
                                }
                            }
                        }, this);
                        this.copyAllianceBtn.addListener("execute", function (e) {
                            var coord = this.main.worldViewCoord;
                            if (coord && this.main.checkCoordType(this.main.CITY)) {
                                if (this.copyMenu.getOpener() == this.copyToMail) {
                                    this.main.sendToMail("[alliance]" + coord.allianceName + "[/alliance]");
                                } else {
                                    this.main.sendToChat("[alliance]" + coord.allianceName + "[/alliance]");
                                }
                            }
                        }, this);
                        this.copyToMail.addListener("execute", function (e) {
                            var coord = this.main.worldViewCoord;
                            if (coord && this.main.checkCoordType(this.main.ANY)) {
                                this.main.sendToMail("[city]" + webfrontend.gui.Util.formatCoordinates(coord.xPos, coord.yPos) + "[/city]");
                            }
                        }, this);
                        this.sendResBtn.addListener("execute", function (e) {
                            var coord = this.main.worldViewCoord;
                            if (coord && this.main.checkCoordType(this.main.CITY)) {
                                this.main.app.showTrade(coord.xPos, coord.yPos);
                            }
                        }, this);
                        this.infoPlayerBtn.addListener("execute", function (e) {
                            var coord = this.main.worldViewCoord;
                            if (coord && this.main.checkCoordType(this.main.CITY)) {
                                this.main.app.showInfoPage(this.main.app.getPlayerInfoPage(), {
                                    "name": coord.playerName
                                });
                            }
                        }, this);
                        this.infoAllianceBtn.addListener("execute", function (e) {
                            var coord = this.main.worldViewCoord;
                            if (coord && this.main.checkCoordType(this.main.CITY)) {
                                this.main.app.showInfoPage(this.main.app.getAllianceInfoPage(), {
                                    "name": coord.allianceName
                                });
                            }
                        }, this);
                        this.whisperBtn.addListener("execute", function (e) {
                            var coord = this.main.worldViewCoord;
                            if (coord && this.main.checkCoordType(this.main.CITY)) {
                                this.main.sendToChat("/whisper " + coord.playerName + " ", true);
                            }
                        }, this);
                        debugLog("HTK Context Menu Initialized.");
                    },
                    members: {
                        main: null,
                        worldContext: null,
                        copyMenu: null,
                        infoMenu: null,
                        selectCityBtn: null,
                        viewReportsBtn: null,
                        killBossBtn: null,
                        raidDungeonBtn: null,
                        raidDungeon1Btn: null,
                        raidDungeonAllBtn: null,
                        sendArmyBtn: null,
                        plunderBtn: null,
                        scoutBtn: null,
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

                        func: function (obj) {},
                        onTroopsSent: function (ok, errorCode) {
                            try {

                                if (errorCode != 0) {
                                    window.console.debug("Troops won't go");
                                }

                            } catch (e) {
                                debug(e);
                            }
                        },
                        updateWorldViewContext: function () {
                            this.selectCityBtn.setVisibility("excluded");
                            this.viewReportsBtn.setVisibility("excluded");
                            this.killBossBtn.setVisibility("excluded");
                            this.raidDungeonBtn.setVisibility("excluded");
                            this.raidDungeon1Btn.setVisibility("excluded");
                            this.raidDungeonAllBtn.setVisibility("excluded");
                            this.sendArmyBtn.setVisibility("excluded");
                            this.plunderBtn.setVisibility("excluded");
                            this.scoutBtn.setVisibility("excluded");
                            this.sendResBtn.setVisibility("excluded");
                            this.copyBtn.setVisibility("excluded");
                            this.copyBtnSub.setVisibility("excluded");
                            this.copyToMail.setVisibility("excluded");
                            this.infoBtn.setVisibility("excluded");
                            this.whisperBtn.setVisibility("excluded");
                            if (this.main.app.visMain.mapmode == "r" || this.main.app.visMain.mapmode == "w") {
                                var coord = this.main.updateWorldViewCoord();
                                if (coord && this.main.checkCoordType(this.main.CITY) && coord.playerName == this.main.playerName && this.main.selectCity({
                                    "cityX": coord.xPos,
                                    "cityY": coord.yPos,
                                    "cityIsMine": true
                                })) {
                                    this.selectCityBtn.setVisibility("visible");
                                    this.sendArmyBtn.setVisibility("visible");
                                    this.viewReportsBtn.setVisibility("visible");
                                    this.copyBtnSub.setVisibility("visible");
                                    this.sendResBtn.setVisibility("visible");
                                    this.infoBtn.setVisibility("visible");
                                    if (this.main.app.sendMail && this.main.app.sendMail.isSeeable()) {
                                        this.copyToMail.setVisibility("visible");
                                    }
                                } else if (coord && this.main.checkCoordType(this.main.ATTACKABLE)) {
                                    this.viewReportsBtn.setVisibility("visible");
                                    this.sendArmyBtn.setVisibility("visible");
                                    if (this.main.getBossLevel() > 0) {
                                        this.killBossBtn.setVisibility("visible");
                                    }
                                    if (this.main.getDungeonLevel() > 0) {
                                        this.raidDungeonBtn.setVisibility("visible");
                                        this.raidDungeon1Btn.setVisibility("visible");
                                        this.raidDungeonAllBtn.setVisibility("visible");
                                    }
                                    if (this.main.checkCoordType(this.main.CITY)) {
                                        this.plunderBtn.setVisibility("visible");
                                        this.scoutBtn.setVisibility("visible");
                                        this.copyBtnSub.setVisibility("visible");
                                        this.sendResBtn.setVisibility("visible");
                                        this.infoBtn.setVisibility("visible");
                                        this.whisperBtn.setVisibility("visible");
                                        if (this.main.app.sendMail && this.main.app.sendMail.isSeeable()) {
                                            this.copyToMail.setVisibility("visible");
                                        }
                                    } else {
                                        this.copyBtn.setVisibility("visible");
                                    }
                                } else if (coord && this.main.checkCoordType(this.main.ANY)) {
                                    this.copyBtn.setVisibility("visible");
                                }
                            }
                        }
                    }
                });

                window.htk = new nessusRiverGuardian.main();
            }

            function checkLoad() {
                try {
                    if (typeof qx != 'undefined') {
                        var app = qx.core.Init.getApplication();
                        var cityInfo = app.cityInfoView;
                        var chat = app.chat;
                        var startTime = webfrontend.data.ServerTime.getInstance().refTime;
                        if (app && cityInfo && chat && startTime) {
                            debugLog("HTK Load Complete.");
                            initNessusRiverGuardian();
                        } else {
                            window.setTimeout(checkLoad, 1000);
                        }
                    } else {
                        window.setTimeout(checkLoad, 1000);
                    }
                } catch (e) {
                    if (typeof console != 'undefined') console.log(e);
                    else if (window.opera) opera.postError(e);
                    else GM_log(e);
                }
            }
            if (/lordofultima\.com/i.test(document.domain)) {
                debugLog("HTK Loading...");
                window.setTimeout(checkLoad, 1000);
            }
        }

        // injecting, because there seem to be problems when creating game interface with unsafeWindow
    var NRGScript = document.createElement("script");
    txt = NRG_mainFunction.toString();
    if (window.opera != undefined) txt = txt.replace(/</g, "&lt;"); // rofl Opera
    NRGScript.innerHTML = "(" + txt + ")();";
    NRGScript.type = "text/javascript";
    if (/lordofultima\.com/i.test(document.domain)) document.getElementsByTagName("head")[0].appendChild(NRGScript);

})();
