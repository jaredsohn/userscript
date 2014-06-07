// ==UserScript==
// @name           ZBot Assistant
// @namespace      ZBotAssist
// @version        1.3.7
// @include        http://prodgame*.lordofultima.com/*/index.aspx*
// ==/UserScript==

(
    function () {

        var CT_mainFunction = function () {

            function createCtTweak() {
                qx.Class.define("ZbotClaimThis.main", {
                    type: "singleton",
                    extend: qx.core.Object,
                    members: {
                        app: null,
                        chat: null,
                        cDetailView: null,
                        buttonRow: null,
                        buttonRowN: null,
                        buttonRow2: null,
                        buttonRowN2: null,
                        newcityView: null,
                        btnBaron: null,
                        btnBaron2: null,
                        sbBaron: null,
                        btnCastle: null,
                        btnCastle2: null,
                        sbCastle: null,

                        palaceList: null,
                        palaceBusy: null,

                        minResource: null,

                        initialize: function () {
                            this.app = qx.core.Init.getApplication();
                            this.cDetailView = this.app.getCityDetailView();
                            this.newcityView = this.app.getNewCityView();
                            console.log(this.app);
                            console.log(this.cDetailView);
                            console.log(this.newcityView);

                            this.chat = this.app.chat;

                            this.palaceList = [];
                            this.palaceBusy = false;

                            this.minResource = 25000;

                            this.createClaimButtons();
                        },
                        _onSendDone: function (isOk, errorCode, context) {
                            try {
                                if (isOk == false || errorCode == null) {
                                    //comm error			
                                } else {
                                }
                            } catch (e) {
                            }
                        },
                        createClaimButtons: function () {

                            var Palacemenu = new qx.ui.menu.Menu();

                            var btnResSend10 = new qx.ui.menu.Button("Try to overflow 10 mill each", null);
                            btnResSend10.addListener("execute", function (event) { ZbotClaimThis.main.getInstance().palaceAmount(10000000) });
                            var btnResSend50 = new qx.ui.menu.Button("Try to overflow 50 mill each", null);
                            btnResSend50.addListener("execute", function (event) { ZbotClaimThis.main.getInstance().palaceAmount(50000000) });
                            var btnResSend100 = new qx.ui.menu.Button("Try to overflow 100 mill each", null);
                            btnResSend100.addListener("execute", function (event) { ZbotClaimThis.main.getInstance().palaceAmount(100000000) });
                            var btnResSend250 = new qx.ui.menu.Button("Try to overflow 250 mill each", null);
                            btnResSend250.addListener("execute", function (event) { ZbotClaimThis.main.getInstance().palaceAmount(250000000) });

                            Palacemenu.add(btnResSend250);
                            Palacemenu.add(btnResSend100);
                            Palacemenu.add(btnResSend50);
                            Palacemenu.add(btnResSend10);

                            var buttonLayout = new qx.ui.layout.HBox(4).set({ alignX: "center" });
                            this.buttonRow = new qx.ui.container.Composite(buttonLayout).set({ maxWidth: 306 });

                            var buttonLayoutN = new qx.ui.layout.HBox(4).set({ alignX: "center" });
                            this.buttonRowN = new qx.ui.container.Composite(buttonLayoutN).set({ maxWidth: 306 });

                            var buttonLayout2 = new qx.ui.layout.HBox(4).set({ alignX: "center" });
                            this.buttonRow2 = new qx.ui.container.Composite(buttonLayout2).set({ maxWidth: 306 });

                            var buttonLayoutN2 = new qx.ui.layout.HBox(4).set({ alignX: "center" });
                            this.buttonRowN2 = new qx.ui.container.Composite(buttonLayoutN2).set({ maxWidth: 306 });

                            this.btnBaron = new qx.ui.form.Button(" Baron ").set({ Width: 40, height: 32, alignX: "center", paddingLeft: 0, paddingRight: 0, toolTipText: "Refreshes list of baron cities" });
                            this.btnBaron.addListener("click", function () { this.baron() }, this);
                            this.btnCastle = new qx.ui.form.Button(" Castle ").set({ Width: 40, height: 32, alignX: "center", paddingLeft: 0, paddingRight: 0, toolTipText: "Refreshes list of castle cities" });
                            this.btnCastle.addListener("click", function () { this.castle() }, this);
                            this.btnPalace = new qx.ui.form.Button(" Palace ").set({ Width: 40, height: 32, alignX: "center", paddingLeft: 0, paddingRight: 0, toolTipText: "Send res to enlightned palace" });
                            this.btnPalace.addListener("click", this.palace, this);
                            this.btnPalace.setContextMenu(Palacemenu);

                            this.btnBaron2 = new qx.ui.form.Button(" Baron ").set({ Width: 40, height: 32, alignX: "center", paddingLeft: 0, paddingRight: 0, toolTipText: "Refreshes list of baron cities" });
                            this.btnBaron2.addListener("click", function () { this.baronN() }, this);
                            this.btnCastle2 = new qx.ui.form.Button(" Castle ").set({ Width: 40, height: 32, alignX: "center", paddingLeft: 0, paddingRight: 0, toolTipText: "Refreshes list of castle cities" });
                            this.btnCastle2.addListener("click", function () { this.castleN() }, this);

                            this.buttonRow2.add(this.btnBaron);
                            this.buttonRow2.add(this.btnPalace);

                            this.buttonRow2.add(this.btnCastle);

                            this.buttonRowN2.add(this.btnBaron2);
                            this.buttonRowN2.add(this.btnCastle2);

                            this.sbBaron = new qx.ui.form.SelectBox().set({
                                width: 80,
                                height: 32,
                                alignX: "center",
                                toolTipText: "Nearest baroncitys from target, rightclick to hide"
                            });
                            this.sbBaron.addListener("changeSelection", function () { this.baronSelect() }, this);
                            this.sbBaron.addListener("contextmenu", function () { this.baronSelectHide() }, this);
                            this.app.desktop.add(this.sbBaron, { left: 405, top: 115 });
                            this.sbBaron.exclude()

                            this.sbCastle = new qx.ui.form.SelectBox().set({
                                width: 80,
                                height: 32,
                                alignX: "center",
                                toolTipText: "Nearest castlecitys from target, rightclick to hide"
                            });
                            this.sbCastle.addListener("changeSelection", function () { this.castleSelect() }, this);
                            this.sbCastle.addListener("contextmenu", function () { this.castleSelectHide() }, this);
                            this.app.desktop.add(this.sbCastle, { left: 490, top: 115 });
                            this.sbCastle.exclude()


                            this.cDetailView.actionArea.add(this.buttonRow);
                            this.cDetailView.actionArea.add(this.buttonRow2);
                            this.newcityView.container.add(new qx.ui.core.Spacer(0, 20));
                            this.newcityView.container.add(this.buttonRowN);
                            this.newcityView.container.add(new qx.ui.core.Spacer(0, 5));
                            this.newcityView.container.add(this.buttonRowN2);

                            btnCheck = new qx.ui.form.Button(" Check ").set({ Width: 40, height: 32, alignX: "center", paddingLeft: 0, paddingRight: 0 });
                            btnCheck.addListener("click", function () { this.claimThis("check") }, this);
                            this.buttonRow.add(btnCheck);

                            btnClaim = new qx.ui.form.Button(" Claim ").set({ Width: 40, height: 32, alignX: "center", paddingLeft: 0, paddingRight: 0 });
                            btnClaim.addListener("click", function () { this.claimThis("claim") }, this);
                            this.buttonRow.add(btnClaim);

                            btnUnclaim = new qx.ui.form.Button(" Unclaim ").set({ Width: 50, height: 32, alignX: "center", paddingLeft: 0, paddingRight: 0 });
                            btnUnclaim.addListener("click", function () { this.claimThis("unclaim") }, this);
                            this.buttonRow.add(btnUnclaim);

                            btnLand = new qx.ui.form.Button(" Settle Land ").set({ Width: 65, height: 32, alignX: "center", paddingLeft: 0, paddingRight: 0 });
                            btnLand.addListener("click", function () { this.claimThis("land") }, this);
                            this.buttonRow.add(btnLand);

                            btnSea = new qx.ui.form.Button(" Settle Sea ").set({ Width: 60, height: 32, alignX: "center", paddingLeft: 0, paddingRight: 0 });
                            btnSea.addListener("click", function () { this.claimThis("sea") }, this);
                            this.buttonRow.add(btnSea);

                            btnSlap = new qx.ui.form.Button(" Read ").set({ Width: 40, height: 32, alignX: "center", paddingLeft: 0, paddingRight: 0 });
                            btnSlap.addListener("click", function () { this.claimThis("read") }, this);
                            this.buttonRow.add(btnSlap);

                            btnCheckN = new qx.ui.form.Button(" Check ").set({ Width: 40, height: 32, alignX: "center", paddingLeft: 0, paddingRight: 0 });
                            btnCheckN.addListener("click", function () { this.claimThis("checkn") }, this);
                            this.buttonRowN.add(btnCheckN);

                            btnClaimN = new qx.ui.form.Button(" Claim ").set({ Width: 40, height: 32, alignX: "center", paddingLeft: 0, paddingRight: 0 });
                            btnClaimN.addListener("click", function () { this.claimThis("claimn") }, this);
                            this.buttonRowN.add(btnClaimN);

                            btnUnclaimN = new qx.ui.form.Button(" Unclaim ").set({ Width: 50, height: 32, alignX: "center", paddingLeft: 0, paddingRight: 0 });
                            btnUnclaimN.addListener("click", function () { this.claimThis("unclaimn") }, this);
                            this.buttonRowN.add(btnUnclaimN);

                            btnLandN = new qx.ui.form.Button(" Settle Land ").set({ Width: 65, height: 32, alignX: "center", paddingLeft: 0, paddingRight: 0 });
                            btnLandN.addListener("click", function () { this.claimThis("landn") }, this);
                            this.buttonRowN.add(btnLandN);

                            btnSeaN = new qx.ui.form.Button(" Settle Sea ").set({ Width: 60, height: 32, alignX: "center", paddingLeft: 0, paddingRight: 0 });
                            btnSeaN.addListener("click", function () { this.claimThis("sean") }, this);
                            this.buttonRowN.add(btnSeaN);

                        },
                        palace: function (e) {
                            if (e.getButton() == "right") {
                                return;
                            };

                            console.log("palace");
                            console.log(this.cDetailView.city.get_IsEnlighted());
                            id = this.cDetailView.city.get_Coordinates()
                            if (this.cDetailView.city.get_IsEnlighted()) {
                                webfrontend.net.CommandManager.getInstance().sendCommand("GetPublicCityInfo", { id: id }, this, this.onPalaceInfo, { onlyValidCity: true, showLocationInfo: true, cityId: id, amount: 0, initial: true });
                            };

                        },
                        palaceAmount: function (amount) {


                            console.log("palaceAmount");
                            console.log(this.cDetailView.city.get_IsEnlighted());
                            id = this.cDetailView.city.get_Coordinates()
                            if (this.cDetailView.city.get_IsEnlighted()) {
                                webfrontend.net.CommandManager.getInstance().sendCommand("GetPublicCityInfo", { id: id }, this, this.onPalaceInfo, { onlyValidCity: true, showLocationInfo: true, cityId: id, amount: amount, initial: true });
                            };

                        },
                        onPalaceInfo: function (r, data, info) {
                            var Player = webfrontend.data.Player.getInstance();
                            var cities = Player.cities;
                            var resMain = webfrontend.res.Main.getInstance();

                            if (resMain.shrines.hasOwnProperty(data.st)) {
                                shrineId = resMain.shrines[data.st].p;
                            }
                            var allianceId = webfrontend.data.Alliance.getInstance().getId();
                            console.log(data);
                            if (allianceId != 0 && data.a == allianceId && data.st != 0) {
                                var resInfo = webfrontend.gui.Util.getPalaceResInfo({ t: shrineId, nl: data.pl + 1, r: data.r, ra: data.ra });
                                //                                console.log(resInfo);
                                var wood = 0;
                                var stone = 0;
                                if (!resInfo.bMaxLevel) {
                                    if (resInfo.res[1].remaining > 0) {
                                        wood = 250000 + resInfo.res[1].remaining;
                                    }
                                    if (resInfo.res[2].remaining > 0) {
                                        stone = 250000 + resInfo.res[2].remaining;
                                    }

                                    var req = {
                                        maxWoodToSend: parseInt(wood),
                                        maxStoneToSend: parseInt(stone),
                                        cityId: info.cityId,
                                        targetPlayer: data.pn,
                                        tradesSent: 0
                                    };
                                    for (i = 0; i < this.palaceList.length; i++) {
                                        if (this.palaceList[i].cityId == info.cityId) {
                                            console.log("Already queued");
                                            if (info.initial == false) {
                                                this.palaceSend();
                                            };
                                            return;
                                        };
                                    };
                                    if (stone == 0 && wood == 0 && info.amount == 0) {
                                        console.log("Nothing to send");
                                        if (info.initial == false) {
                                            this.palaceSend();
                                        };
                                        return;
                                    };
                                    //                                    console.log(info.amount);
                                    if (info.amount > 0) {
                                        req.maxWoodToSend = parseInt(info.amount);
                                        req.maxStoneToSend = parseInt(info.amount);
                                    };
                                    this.palaceList.push(req);
                                    //                                    console.log("Req");
                                    //                                    console.log(req);
                                    if (this.palaceBusy == false) {
                                        this.palaceBusy = true;
                                        console.log("Initialising messenger gnomes");
                                        this.palaceSend();
                                    };

                                };
                            };
                        },
                        palaceSend: function () {
                            if (this.palaceList.length == 0) {
                                this.palaceBusy = false;
                                console.log("Palace send idle");
                                return;
                            };

                            request = this.palaceList.shift();

                            if (request.maxWoodToSend == 0) {
                                request.currentRes = 2;
                            } else {
                                request.currentRes = 1;
                            };
                            //                            console.log(request.currentRes);

                            webfrontend.net.CommandManager.getInstance().sendCommand("TradeSearchResources", { cityid: request.cityId, resType: request.currentRes, minResource: this.minResource, maxTime: 48 * webfrontend.data.ServerTime.getInstance().getStepsPerHour() }, this, this.sortPalace, request);


                        },
                        sortPalace: function (result, data, request) {
                            if (result == false || data == null) this.palaceSend();
                            var cities = new Array();
                            var transports = new Array();

                            var destCoords = this.convertIdToCoordinatesObject(request.cityId);

                            for (var i = 0; i < data.length; i++) {
                                var city = data[i];
                                var srcCoords = this.convertIdToCoordinatesObject(city.i);

                                if (city.i == request.cityId || city.sg) {
                                    continue;
                                }
                                if (destCoords.cont != srcCoords.cont) {
                                    continue;
                                }



                                cities.push(city);

                                if (city.lt > 0) {
                                    transports.push({
                                        cityIndex: cities.length - 1,
                                        capacity: city.la,
                                        travelTime: city.lt,
                                        land: true
                                    });
                                }
                            };

                            transports.sort(function (a, b) {
                                if (a.travelTime > b.travelTime) {
                                    return 1;
                                } else if (a.travelTime < b.travelTime) {
                                    return -1;
                                } else {
                                    return 0;
                                }
                            });

                            request.sentThisBatch = 0;
                            request.cities = cities;
                            request.transports = transports;
                            request.thisSend = 0;
                            request.destCoords = destCoords;
                            //                            console.log("Sending request");
                            //                            console.log(request);
                            this.sendTrade(5, 0, request);

                        },
                        sendTrade: function (result, data, request) {
                            if (result == true) {
                                request.sentThisBatch = request.sentThisBatch + request.thisSend;
                                switch (request.currentRes) {
                                    case 1:
                                        {
                                            request.maxWoodToSend = request.maxWoodToSend - request.thisSend;
                                            break;
                                        };
                                    case 2:
                                        {
                                            request.maxStoneToSend = request.maxStoneToSend - request.thisSend;
                                            break;
                                        };
                                };
                            } else {
                                //No send
                            };
                            if (request.transports.length == 0) {
                                console.log("No more transports");
                                if (request.currentRes == 1) {
                                    request.maxWoodToSend = 0;
                                    console.log("Cannot send more wood");
                                    console.log(request);
                                } else {
                                    request.maxStoneToSend = 0;
                                    console.log("Cannot send more stone");
                                    console.log(request);

                                };
                            };


                            switch (request.currentRes) {
                                case 1:
                                    {
                                        if (request.sentThisBatch > 10000000) {
                                            if (request.maxStoneToSend > 0) {
                                                request.sentThisBatch = 0;
                                                request.currentRes = 2;

                                            } else if (request.maxWoodToSend > 0) {
                                                request.sentThisBatch = 0;
                                            } else {
                                                console.log("Next palace");
                                                this.palaceSend();
                                                webfrontend.net.CommandManager.getInstance().sendCommand("GetPublicCityInfo", { id: request.cityId }, this, this.onPalaceInfo, { onlyValidCity: true, showLocationInfo: true, cityId: request.cityId, amount: 0, initial: false });
                                                return;
                                            };
                                            if (request.tradesSent > 0)
                                                webfrontend.net.CommandManager.getInstance().sendCommand("TradeSearchResources", { cityid: request.cityId, resType: request.currentRes, minResource: this.minResource, maxTime: 48 * webfrontend.data.ServerTime.getInstance().getStepsPerHour() }, this, this.sortPalace, request);
                                            return;
                                        } else if (request.maxWoodToSend <= 0) {
                                            console.log("No more wood to send");
                                            if (request.maxStoneToSend > 0) {
                                                request.sentThisBatch = 0;
                                                request.currentRes = 2;
                                                if (request.tradesSent > 0)
                                                    webfrontend.net.CommandManager.getInstance().sendCommand("TradeSearchResources", { cityid: request.cityId, resType: request.currentRes, minResource: this.minResource, maxTime: 48 * webfrontend.data.ServerTime.getInstance().getStepsPerHour() }, this, this.sortPalace, request);
                                                return;
                                            } else {
                                                console.log("Next palace");
                                                this.palaceSend();
                                                webfrontend.net.CommandManager.getInstance().sendCommand("GetPublicCityInfo", { id: request.cityId }, this, this.onPalaceInfo, { onlyValidCity: true, showLocationInfo: true, cityId: request.cityId, amount: 0, initial: false });
                                                return;
                                            };
                                        };
                                        break;
                                    };
                                case 2:
                                    {
                                        if (request.sentThisBatch > 10000000) {
                                            if (request.maxWoodToSend > 0) {
                                                request.sentThisBatch = 0;
                                                request.currentRes = 1;

                                            } else if (request.maxStoneToSend > 0) {
                                                request.sentThisBatch = 0;
                                            } else {
                                                console.log("Next palace");
                                                this.palaceSend();
                                                if (request.tradesSent > 0)
                                                    webfrontend.net.CommandManager.getInstance().sendCommand("GetPublicCityInfo", { id: request.cityId }, this, this.onPalaceInfo, { onlyValidCity: true, showLocationInfo: true, cityId: request.cityId, amount: 0 });
                                                return;
                                            };
                                            webfrontend.net.CommandManager.getInstance().sendCommand("TradeSearchResources", { cityid: request.cityId, resType: request.currentRes, minResource: this.minResource, maxTime: 48 * webfrontend.data.ServerTime.getInstance().getStepsPerHour() }, this, this.sortPalace, request);
                                            return;
                                        } else if (request.maxStoneToSend <= 0) {
                                            console.log("No more stone to send");
                                            if (request.maxWoodToSend > 0) {
                                                request.sentThisBatch = 0;
                                                request.currentRes = 1;
                                                webfrontend.net.CommandManager.getInstance().sendCommand("TradeSearchResources", { cityid: request.cityId, resType: request.currentRes, minResource: this.minResource, maxTime: 48 * webfrontend.data.ServerTime.getInstance().getStepsPerHour() }, this, this.sortPalace, request);
                                                return;
                                            } else {
                                                console.log("Next palace");
                                                this.palaceSend();
                                                if (request.tradesSent > 0)
                                                    webfrontend.net.CommandManager.getInstance().sendCommand("GetPublicCityInfo", { id: request.cityId }, this, this.onPalaceInfo, { onlyValidCity: true, showLocationInfo: true, cityId: request.cityId, amount: 0 });
                                                return;
                                            };
                                        };
                                        break;
                                    };
                            };

                            var transport = request.transports.shift();
                            var city = request.cities[transport.cityIndex];
                            var srcCoords = this.convertIdToCoordinatesObject(city.i);
                            if (request.currentRes == 1) {
                                toBeSent = request.maxWoodToSend;
                            } else {
                                toBeSent = request.maxStoneToSend;
                            };


                            var resCount = Math.min(city.rc, transport.capacity, toBeSent);


                            var trade = {
                                cityid: city.i,
                                tradeTransportType: 1,
                                targetPlayer: request.targetPlayer,
                                targetCity: request.destCoords.xPos + ":" + request.destCoords.yPos,
                                palaceSupport: 1,
                                res: new Array()
                            };

                            trade.res.push({
                                t: request.currentRes,
                                c: resCount
                            });
                            request.thisSend = resCount;
                            request.tradesSent++;
                            webfrontend.net.CommandManager.getInstance().sendCommand("TradeDirect", trade, this, this.sendTrade, request);

                        },
                        baron: function () {
                            var Player = webfrontend.data.Player.getInstance();
                            var cities = Player.cities;
                            var baroncities = [];
                            this.sbBaron.show()

                            this.sbBaron.removeAll();

                            if (typeof this.cDetailView.city.get_Coordinates == "undefined") {
                                posX = this.cDetailView.city.getPosX(); posY = this.cDetailView.city.getPosY();
                            } else {
                                ctid = this.cDetailView.city.get_Coordinates(); posX = ctid & 0xFFFF; posY = ctid >> 16;
                            }


                            for (var city in cities) {
                                if (this.parseReference(cities[city].reference).isBaron) {
                                    var thisdist = this.getDistance(posX, posY, cities[city].xPos, cities[city].yPos);
                                    var num = new Number(thisdist);
                                    baroncities.push({ dist: num.toFixed(2), name: cities[city].name, ref: cities[city].reference, id: city });
                                }
                            }
                            baroncities.sort(function (a, b) {
                                return (a.dist - b.dist);
                            });
                            for (i = 0; i < baroncities.length - 1; i++) {
                                //                                console.log(baroncities[i].dist);
                                this.sbBaron.add(new qx.ui.form.ListItem(baroncities[i].name + " " + baroncities[i].ref, null, baroncities[i].id));
                            };
                        },
                        baronN: function () {
                            var Player = webfrontend.data.Player.getInstance();
                            var cities = Player.cities;
                            var baroncities = [];
                            this.sbBaron.show()
                            this.sbBaron.removeAll();

                            posX = this.newcityView.cityPosX; posY = this.newcityView.cityPosY;


                            for (var city in cities) {
                                if (this.parseReference(cities[city].reference).isBaron) {
                                    var thisdist = this.getDistance(posX, posY, cities[city].xPos, cities[city].yPos);
                                    var num = new Number(thisdist);
                                    baroncities.push({ dist: num.toFixed(2), name: cities[city].name, ref: cities[city].reference, id: city });
                                }
                            }
                            baroncities.sort(function (a, b) {
                                return (a.dist - b.dist);
                            });
                            for (i = 0; i < baroncities.length - 1; i++) {
                                //                                console.log(baroncities[i].dist);
                                this.sbBaron.add(new qx.ui.form.ListItem(baroncities[i].name + " " + baroncities[i].ref, null, baroncities[i].id));
                            };
                        },
                        baronSelect: function () {
                            if (!(this.sbBaron.getSelection()[0] == undefined)) {
                                var target = this.sbBaron.getSelection()[0].getModel();
                                console.log(target);
                                //this.app.setMainView("c", target, -1, -1);

                                webfrontend.data.City.getInstance().setRequestId(target);
                            };
                        },
                        baronSelectHide: function () {
                            this.sbBaron.exclude()

                        },
                        castle: function () {
                            var Player = webfrontend.data.Player.getInstance();
                            var cities = Player.cities;
                            var castlecities = [];
                            this.sbCastle.show()

                            this.sbCastle.removeAll();

                            if (typeof this.cDetailView.city.get_Coordinates == "undefined") {
                                posX = this.cDetailView.city.getPosX(); posY = this.cDetailView.city.getPosY();
                            } else {
                                ctid = this.cDetailView.city.get_Coordinates(); posX = ctid & 0xFFFF; posY = ctid >> 16;
                            }


                            for (var city in cities) {
                                if (this.parseReference(cities[city].reference).isCastle) {
                                    var thisdist = this.getDistance(posX, posY, cities[city].xPos, cities[city].yPos);
                                    var num = new Number(thisdist);
                                    castlecities.push({ dist: num.toFixed(2), name: cities[city].name, ref: cities[city].reference, id: city });
                                }
                            }
                            castlecities.sort(function (a, b) {
                                return (a.dist - b.dist);
                            });
                            for (i = 0; i < castlecities.length - 1; i++) {
                                //                                console.log(castlecities[i].dist);
                                this.sbCastle.add(new qx.ui.form.ListItem(castlecities[i].name + " " + castlecities[i].ref, null, castlecities[i].id));
                            };
                        },
                        castleN: function () {
                            var Player = webfrontend.data.Player.getInstance();
                            var cities = Player.cities;
                            var castlecities = [];
                            this.sbCastle.show()
                            this.sbCastle.removeAll();

                            posX = this.newcityView.cityPosX; posY = this.newcityView.cityPosY;


                            for (var city in cities) {
                                if (this.parseReference(cities[city].reference).isCastle) {
                                    var thisdist = this.getDistance(posX, posY, cities[city].xPos, cities[city].yPos);
                                    var num = new Number(thisdist);
                                    castlecities.push({ dist: num.toFixed(2), name: cities[city].name, ref: cities[city].reference, id: city });
                                }
                            }
                            castlecities.sort(function (a, b) {
                                return (a.dist - b.dist);
                            });
                            for (i = 0; i < castlecities.length - 1; i++) {
                                //                                console.log(castlecities[i].dist);
                                this.sbCastle.add(new qx.ui.form.ListItem(castlecities[i].name + " " + castlecities[i].ref, null, castlecities[i].id));
                            };
                        },
                        castleSelect: function () {
                            if (!(this.sbCastle.getSelection()[0] == undefined)) {
                                var target = this.sbCastle.getSelection()[0].getModel();
                                console.log(target);
                                //this.app.setMainView("c", target, -1, -1);

                                webfrontend.data.City.getInstance().setRequestId(target);
                            };
                        },
                        castleSelectHide: function () {
                            this.sbCastle.exclude()

                        },
                        parseReference: function (ref) {
                            var result = {
                                isCastle: false,
                                isBuildInProgress: false,
                                isWarehouse: false,
                                hasMoonglowTower: false,
                                isGold: false,
                                isDefensive: false,
                                isRaiding: false,
                                isHub: false,
                                isTransport: false,
                                isBaron: false,
                                customTypes: new qx.data.Array([])
                            };

                            if (ref == null) {
                                return result;
                            }

                            var insideOptions = false;
                            for (var i = 0; i < ref.length; i++) {
                                var c = ref.charAt(i);
                                if (c == '*') {
                                    insideOptions = !insideOptions;
                                } else if (insideOptions) {
                                    switch (c) {
                                        case 'C':
                                            result.isCastle = true;
                                            break;
                                        case 'B':
                                            result.isBuildInProgress = true;
                                            break;
                                        case 'W':
                                            result.isWarehouse = true;
                                            break;
                                        case 'M':
                                            result.hasMoonglowTower = true;
                                            break;
                                        case 'G':
                                            result.isGold = true;
                                            break;
                                        case 'D':
                                            result.isDefensive = true;
                                            break;
                                        case 'I':
                                            result.isRaiding = true;
                                            break;
                                        case 'H':
                                            result.isHub = true;
                                            break;
                                        case 'T':
                                            result.isTransport = true;
                                            break;
                                        case 'X':
                                            result.isBaron = true;
                                            break;
                                        default:
                                            result.customTypes.push(c);
                                            break;
                                    }
                                }
                            }

                            return result;

                        },
                        getDistance: function (x1, y1, x2, y2) {
                            var diffX = Math.abs(x1 - x2);
                            var diffY = Math.abs(y1 - y2);
                            return Math.sqrt(diffX * diffX + diffY * diffY);
                        },
                        getDistanceUsingIds: function (id1, id2) {
                            var c1 = this.convertIdToCoodrinates(id1);
                            var c2 = this.convertIdToCoodrinates(id2);
                            return this.getDistance(c1.xPos, c1.yPos, c2.xPos, c2.yPos);
                        },
                        convertIdToCoodrinates: function (id) {
                            var o = this.convertIdToCoordinatesObject(id);
                            return o.xPos + ":" + o.yPos;
                        },
                        convertIdToCoordinatesObject: function (id) {
                            var o = {
                                xPos: (id & 0xFFFF),
                                yPos: (id >> 16)
                            }
                            o.cont = webfrontend.data.Server.getInstance().getContinentFromCoords(o.xPos, o.yPos);
                            return o;
                        },
                        convertCoordinatesToId: function (xPos, yPos) {
                            var id = (xPos << 16) & yPos;
                            return id;
                        },
                        convertIdToCoordinatesObject: function (id) {
                            var o = { xPos: (id & 0xFFFF), yPos: (id >> 16) };
                            o.cont = webfrontend.data.Server.getInstance().getContinentFromCoords(o.xPos, o.yPos);
                            return o;
                        },
                        claimThis: function (v) {
                            posX = posY = 0;

                            if (v == "check" || v == "claim" || v == "unclaim" || v == "land" || v == "sea" || v == "read") {
                                if (typeof this.cDetailView.city.get_Coordinates == "undefined") {
                                    posX = this.cDetailView.city.getPosX(); posY = this.cDetailView.city.getPosY();
                                } else {
                                    ctid = this.cDetailView.city.get_Coordinates(); posX = ctid & 0xFFFF; posY = ctid >> 16;
                                }
                                switch (v) {
                                    case "check": botAction = "!check "; break;
                                    case "claim": botAction = "!claim "; break;
                                    case "unclaim": botAction = "!unclaim "; break;
                                    case "sea": botAction = "!claim "; break;
                                    case "land": botAction = "!claim "; break;
                                    case "read": botAction = "!read "; break;
                                }
                            }

                            else if (v == "checkn" || v == "claimn" || v == "unclaimn" || v == "landn" || v == "sean") {
                                posX = this.newcityView.cityPosX; posY = this.newcityView.cityPosY;
                                switch (v) {
                                    case "checkn": botAction = "!check "; break;
                                    case "claimn": botAction = "!claim "; break;
                                    case "unclaimn": botAction = "!unclaim "; break;
                                    case "sean": botAction = "!claim "; break;
                                    case "landn": botAction = "!claim "; break;
                                }
                            }
                            var curCity = webfrontend.data.City.getInstance();
                            var SrvData = webfrontend.data.Server.getInstance();
                            var SrvTime = webfrontend.data.ServerTime.getInstance();
                            var SrvStep = SrvTime.getServerStep();
                            var SrvTech = webfrontend.data.Tech.getInstance();
                            var cartTech = SrvTech.getBonus("tradeSpeed", webfrontend.data.Tech.research, 1);
                            var shipTech = SrvTech.getBonus("tradeSpeed", webfrontend.data.Tech.research, 2);
                            var cartShrine = SrvTech.getBonus("tradeSpeed", webfrontend.data.Tech.shrine, 1);
                            var shipShrine = SrvTech.getBonus("tradeSpeed", webfrontend.data.Tech.shrine, 2);
                            var player = webfrontend.data.Player.getInstance();
                            speeds = new Array(SrvData.getTradeSpeedLand(), SrvData.getTradeSpeedShip());
                            var dist = player.getDistanceByCoord(curCity.getId(), posX, posY);

                            //land
                            var traveltimeLand = Math.max(0, dist.l * speeds[0]);
                            var arrivalLand = (webfrontend.Util.getDateTimeString(SrvTime.getStepTime(parseInt(SrvStep + traveltimeLand / (1 + (cartTech + cartShrine) / 100)))));

                            //sea
                            var bM = speeds[1] / (1 + (shipTech + shipShrine) / 100);
                            var traveltimeSea = Math.max(0, dist.w * bM + SrvData.getTradeShipPreparationTime());
                            var arrivalSea = (webfrontend.Util.getDateTimeString(SrvTime.getStepTime(SrvStep + traveltimeSea)));

                            checkchat = this.chat.chatLine.getValue();
                            if (checkchat == null) { this.chat.chatLine.setValue(""); checkchat = ""; }
                            if (posX >= 0 && posX <= 9) posX = "00" + posX;
                            else if (posX > 9 && posX < 100) posX = "0" + posX;
                            if (posY >= 0 && posY <= 9) posY = "00" + posY;
                            else if (posY > 9 && posY < 100) posY = "0" + posY;
                            if (v == "whip" || v == "cake") {
                                pname = qx.core.Init.getApplication().cityDetailView.city.get_PlayerName();
                                this.chat.chatLine.setValue("/a " + botAction + pname);
                                this.chat.sendCurrent();
                            }
                            else if (v == "land" || v == "landn") {
                                this.chat.chatLine.setValue("/a " + botAction + posX + ":" + posY + " ETA " + arrivalLand);
                                this.chat.sendCurrent();

                                curcityId = webfrontend.data.City.getInstance().getId()
                                settle = {
                                    cityid: curcityId,
                                    units: [{ "t": "19", "c": 1}],
                                    targetPlayer: "",
                                    targetCity: posX + ":" + posY,
                                    order: 9,
                                    transport: 1,
                                    createCity: "" + posX + "" + posY,
                                    timeReferenceType: 1,
                                    referenceTimeUTCMillis: 0,
                                    raidTimeReferenceType: 0,
                                    raidReferenceTimeUTCMillis: 0,
                                    iUnitOrderOptions: 0
                                };
                                webfrontend.net.CommandManager.getInstance().sendCommand("OrderUnits", settle, this, this._onSendDone, settle);

                            }
                            else if (v == "sea" || v == "sean") {
                                this.chat.chatLine.setValue("/a " + botAction + posX + ":" + posY + " ETA " + arrivalSea);
                                this.chat.sendCurrent();

                                curcityId = webfrontend.data.City.getInstance().getId()
                                settle = {
                                    cityid: curcityId,
                                    units: [{ "t": "19", "c": 1}],
                                    targetPlayer: "",
                                    targetCity: posX + ":" + posY,
                                    order: 9,
                                    transport: 2,
                                    createCity: "" + posX + "" + posY,
                                    timeReferenceType: 1,
                                    referenceTimeUTCMillis: 0,
                                    raidTimeReferenceType: 0,
                                    raidReferenceTimeUTCMillis: 0,
                                    iUnitOrderOptions: 0
                                };
                                webfrontend.net.CommandManager.getInstance().sendCommand("OrderUnits", settle, this, this._onSendDone, settle);

                            }
                            else if (v == "claim" || v == "claimn") {
                                this.chat.chatLine.setValue("/a " + botAction + posX + ":" + posY + " ETA " + arrivalLand);
                                this.chat.sendCurrent();
                            }
                            else {
                                this.chat.chatLine.setValue("/a " + botAction + posX + ":" + posY);
                                this.chat.sendCurrent();
                            }
                        }
                    }
                });

            }

            function CT_checkIfLoaded() {
                try {
                    if (typeof qx != 'undefined') {
                        a = qx.core.Init.getApplication();
                        c = a.cityInfoView;
                        ch = a.chat;
                        wdst = webfrontend.data.ServerTime.getInstance().refTime;
                        if (a && c && ch && wdst) {
                            createCtTweak();
                            window.ZbotClaimThis.main.getInstance().initialize();
                        } else
                            window.setTimeout(CT_checkIfLoaded, 1000);
                    } else {
                        window.setTimeout(CT_checkIfLoaded, 1000);
                    }
                } catch (e) {
                    if (typeof console != 'undefined') console.log(e);
                    else if (window.opera) opera.postError(e);
                    else GM_log(e);
                }
            }

            if (/lordofultima\.com/i.test(document.domain))
                window.setTimeout(CT_checkIfLoaded, 1000);

        }
        // injecting, because there seem to be problems when creating game interface with unsafeWindow
        var ZbotClaimThisScript = document.createElement("script");
        txt = CT_mainFunction.toString();
        if (window.opera != undefined)
            txt = txt.replace(/</g, "&lt;"); // rofl Opera
        ZbotClaimThisScript.innerHTML = "(" + txt + ")();";
        ZbotClaimThisScript.type = "text/javascript";
        if (/lordofultima\.com/i.test(document.domain))
            document.getElementsByTagName("head")[0].appendChild(ZbotClaimThisScript);
    })();