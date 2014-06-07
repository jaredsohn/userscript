// ==UserScript==
// @name            Sector HUD
// @description     Displays a tiny HUD with the Sector you are viewing.
// @version         2.0c
// @namespace       http*://*.alliances.commandandconquer.com/*
// @include         http*://*.alliances.commandandconquer.com/*
// @updateURL       https://userscripts.org/scripts/source/172964.meta.js
// @downloadURL     https://userscripts.org/scripts/source/172964.user.js
// ==/UserScript==
(function () {
    var injectFunction = function () {
        function createClasses() {
            qx.Class.define("SectorHUD", {
                type: "singleton",
                extend: qx.core.Object,
                construct: function () {
                    this.SectorText = new qx.ui.basic.Label("").set({
                        textColor : "#FFFFFF",
                        font : "font_size_11"
                    });
                    var HUD = new qx.ui.container.Composite(new qx.ui.layout.HBox()).set({
                        decorator : new qx.ui.decoration.Background().set({
                            backgroundRepeat : "no-repeat",
                            backgroundImage : "webfrontend/ui/menues/notifications/bgr_ticker_container.png",
                            backgroundPositionX : "center"
                        }),
                        padding : 2,
                        opacity: 0.75
                    });
                    HUD.add(this.SectorText);
                    HUD.addListener("click", function () {
                        this.paste_Coords();
                    }, this);
                    qx.core.Init.getApplication().getDesktop().add(HUD, {left: 211, top: 45});
                    phe.cnc.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance().get_Region(), "PositionChange", ClientLib.Vis.PositionChange, this, this._update);
                },
                destruct: function () {},
                members: {
                    SectorText: null,
                    get_SectorText: function (i) {
                        var qxApp = qx.core.Init.getApplication();
                        switch (i) {
                        case 0:
                            return qxApp.tr("tnf:south abbr");
                        case 1:
                            return qxApp.tr("tnf:southwest abbr");
                        case 2:
                            return qxApp.tr("tnf:west abbr");
                        case 3:
                            return qxApp.tr("tnf:northwest abbr");
                        case 4:
                            return qxApp.tr("tnf:north abbr");
                        case 5:
                            return qxApp.tr("tnf:northeast abbr");
                        case 6:
                            return qxApp.tr("tnf:east abbr");
                        case 7:
                            return qxApp.tr("tnf:southeast abbr");
                        }
                    },
                    get_SectorNo: function (x, y) {
                        var WorldX2 = Math.floor(ClientLib.Data.MainData.GetInstance().get_Server().get_WorldWidth() / 2);
                        var WorldY2 = Math.floor(ClientLib.Data.MainData.GetInstance().get_Server().get_WorldHeight() / 2);
                        var SectorCount = ClientLib.Data.MainData.GetInstance().get_Server().get_SectorCount();
                        var WorldCX = (WorldX2 - x);
                        var WorldCY = (y - WorldY2);
                        var WorldCa = ((Math.atan2(WorldCX, WorldCY) * SectorCount) / 6.2831853071795862);
                        WorldCa += (SectorCount + 0.5);
                        return (Math.floor(WorldCa) % SectorCount);
                    },
                    get_Coords: function () {
                        var Region = ClientLib.Vis.VisMain.GetInstance().get_Region();
                        var GridWidth = Region.get_GridWidth();
                        var GridHeight = Region.get_GridHeight();
                        var RegionPosX = Region.get_PosX();
                        var RegionPosY = Region.get_PosY();
                        var ViewWidth = Region.get_ViewWidth();
                        var ViewHeight = Region.get_ViewHeight();
                        var ZoomFactor = Region.get_ZoomFactor();
                        var ViewCoordX = Math.floor((RegionPosX + ViewWidth / 2 / ZoomFactor) / GridWidth - 0.5);
                        var ViewCoordY = Math.floor((RegionPosY + ViewHeight / 2 / ZoomFactor) / GridHeight - 0.5);
                        return {X: ViewCoordX, Y: ViewCoordY};
                    },
                    paste_Coords: function(){
                        var Coords = this.get_Coords();
                        var input = qx.core.Init.getApplication().getChat().getChatWidget().getEditable();
                        var inputDOM = input.getContentElement().getDomElement();
                        var text = [];
                        text.push(inputDOM.value.substring(0, inputDOM.selectionStart));
                        text.push("[coords]" + Coords.X + ':' + Coords.Y + "[/coords]");
                        text.push(inputDOM.value.substring(inputDOM.selectionEnd, inputDOM.value.length));
                        input.setValue(text.join(' '));
                    },
                    _update: function () {
                        var Coords = this.get_Coords();
                        this.SectorText.setValue(Coords.X + ":" + Coords.Y + " [" + this.get_SectorText(this.get_SectorNo(Coords.X, Coords.Y)) + "]");
                    }
                }
            });
        }
        function waitForGame() {
            try {
                if (typeof qx !== "undefined" && typeof qx.core !== "undefined" && typeof qx.core.Init !== "undefined" && typeof ClientLib !== "undefined" && typeof phe !== "undefined") {
                    var app = qx.core.Init.getApplication();
                    if (app.initDone == true) {
                        try {
                            console.log("Sector HUD: Loading");
                            createClasses();
                            SectorHUD.getInstance();
                            console.log("Sector HUD: Loaded");
                        } catch (e) {
                            console.log("Sector HUD: initialization error:");
                            console.log(e);
                        }
                    } else
                        window.setTimeout(waitForGame, 1000);
                } else {
                    window.setTimeout(waitForGame, 1000);
                }
            } catch (e) {
                console.log(e);
            }
        }
        window.setTimeout(waitForGame, 1000);
    };
    var script = document.createElement("script");
    var txt = injectFunction.toString();
    script.innerHTML = "(" + txt + ")();";
    script.type = "text/javascript";
    document.getElementsByTagName("head")[0].appendChild(script);
})();