// ==UserScript==
// @name           ZBot Assistant
// @namespace      ZBotAssist
// @version        1.2.2
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
                        lawlessView: null,
                        buttonRow: null,
                        buttonRowN: null,
                        newcityView: null,
                        initialize: function () {
                            this.app = qx.core.Init.getApplication();
                            this.lawlessView = this.app.getCityDetailView();
                            this.newcityView = this.app.getNewCityView();
                            this.chat = this.app.chat;

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

                            var buttonLayout = new qx.ui.layout.HBox(4).set({ alignX: "center" });
                            this.buttonRow = new qx.ui.container.Composite(buttonLayout).set({ maxWidth: 306 });

                            var buttonLayoutN = new qx.ui.layout.HBox(4).set({ alignX: "center" });
                            this.buttonRowN = new qx.ui.container.Composite(buttonLayoutN).set({ maxWidth: 306 });


                            this.lawlessView.actionArea.add(this.buttonRow);
                            this.newcityView.container.add(new qx.ui.core.Spacer(0, 40));
                            this.newcityView.container.add(this.buttonRowN);

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

                            btnSlap = new qx.ui.form.Button(" Slap ").set({ Width: 40, height: 32, alignX: "center", paddingLeft: 0, paddingRight: 0 });
                            btnSlap.addListener("click", function () { this.claimThis("slap") }, this);
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
                        claimThis: function (v) {
                            posX = posY = 0;
                            
                            if (v == "check" || v == "claim" || v == "unclaim" || v == "land" || v == "sea" || v == "slap") {
                                if (typeof this.lawlessView.city.get_Coordinates == "undefined") {
                                    posX = this.lawlessView.city.getPosX(); posY = this.lawlessView.city.getPosY();
                                } else {
                                    ctid = this.lawlessView.city.get_Coordinates(); posX = ctid & 0xFFFF; posY = ctid >> 16;
                                }
                                switch (v) {
                                    case "check": botAction = "!check "; break;
                                    case "claim": botAction = "!claim "; break;
                                    case "unclaim": botAction = "!unclaim "; break;
                                    case "sea": botAction = "!claim "; break;
                                    case "land": botAction = "!claim "; break;
                                    case "slap": botAction = "!slap "; break;
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
                            if (v == "whip" || v == "cake" || v == "slap") {
                                pname = qx.core.Init.getApplication().getCityDetailView().city.get_PlayerName();
                                this.chat.chatLine.setValue("/a " + botAction + pname);
                                this.chat.sendCurrent();
                            }
                            else if (v == "land" || v == "landn") {
                                this.chat.chatLine.setValue("/a " + botAction + posX + ":" + posY + " ETA " + arrivalLand);
                                this.chat.sendCurrent();

                                var curcityId = webfrontend.data.City.getInstance().getId()
                                var settle = {
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

                                var curcityId = webfrontend.data.City.getInstance().getId()
                                var settle = {
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
                            else if (v == "claim" || v == "claimn")
                            {
                                this.chat.chatLine.setValue("/a " + botAction + posX + ":" + posY + " ETA " + arrivalLand);
                                this.chat.sendCurrent();
                            }
                            else 
                            {
                                this.chat.chatLine.setValue("/a " + botAction + posX + ":" + posY );
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