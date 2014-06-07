// ==UserScript==
// @name           LoU Baron Bar
// @namespace      php|uber.leetphp
// @license        Creative Commons Attribution-ShareAlike 3.0 Unported License - http://creativecommons.org/licenses/by-sa/3.0/
// @description    Add Baron information to the players title bar. Created by resurrecting the discontinued "LoU UI MS Baron" script by OzGoober. Updated by orshee
// @include        http://prodgame*.lordofultima.com/*/index.aspx*
// @version        2.0.8
// ==/UserScript==

(function () {
    try {
        var mainLoU_Baron = function () {
            try {
                var oApp, oPlayer, oTech, playerBar;
                var BaronLabel, BaronValue, availableBarons, PurifiedResourcesLabel, PurifiedResourcesValue;

                function startCheck() {
                    window.setTimeout(checkIfLoaded, 5000);
                }

                function checkIfLoaded() {
                    try {
                        var isLoaded = false;
                        oApp = qx.core.Init.getApplication(); // application
                        oPlayer = webfrontend.data.Player.getInstance(); // player data

                        if (oApp && oPlayer) {
                            if (oApp.title) {
                                playerBar = oApp.title; // top player info bar
                                oTech = webfrontend.data.Tech.getInstance();

                                if (oTech && oTech.getBonus("baronCount", webfrontend.data.Tech.research) > 0) {
                                    isLoaded = true;
                                }
                            }
                        }

                        if (isLoaded) {
                            //console.log("oApp");
                            //console.log(oApp);
                            //console.log("oPlayer");
                            //console.log(oPlayer);
                            //console.log("oTech");
                            //console.log(oTech);
                            console.log("LoU Baron Bar: Injecting");
                            tweakGuiLoU();
                        }
                        else {
                            console.log("LoU Baron Bar: Waiting");
                            startCheck();
                        }
                    }
                    catch (e) {
                        console.log(e);
                    }
                }

                function tweakGuiLoU() {
                    try {
                        var Appearance = "label-playername-banner";
                        var Color = "player-name-banner-dark";
                        var ToolTip = "Total / Current / Recruiting / Available";
                        var LeftIdent = 1010;

                        // Baron Info in Title Bar
                        BaronLabel = new qx.ui.basic.Label("Barons:");
                        BaronLabel.setAppearance(Appearance);
                        BaronLabel.setTextColor(Color);
                        BaronLabel.setToolTipText(ToolTip);
                        playerBar.add(BaronLabel, { top: 37, left: LeftIdent+5 });
                        BaronValue = new qx.ui.basic.Label("0/0/0/0");
                        BaronValue.setAppearance(Appearance);
                        BaronValue.setToolTipText(ToolTip);
                        playerBar.add(BaronValue, { top: 37, left: LeftIdent + 45 });
                        webfrontend.base.Timer.getInstance().addListener("uiTick", updateCurBarons, this);

                        PurifiedResourcesLabel = new qx.ui.basic.Label("Purified Resources:");
                        PurifiedResourcesLabel.setAppearance(Appearance);
                        PurifiedResourcesLabel.setTextColor(Color);
                        PurifiedResourcesLabel.setToolTipText("Darkwood / Runestone / Veritum / Trueseed");
                        playerBar.add(PurifiedResourcesLabel, { top: 37, left: LeftIdent + 110 });

                        PurifiedResourcesValue = new qx.ui.basic.Label("0/0/0/0");
                        PurifiedResourcesValue.setAppearance(Appearance);
                        PurifiedResourcesValue.setToolTipText("Darkwood / Runestone / Veritum / Trueseed");
                        playerBar.add(PurifiedResourcesValue, { top: 37, left: LeftIdent + 208 });
                        webfrontend.base.Timer.getInstance().addListener("uiTick", updatPurifiedResources, this);
                    }
                    catch (e) {
                        console.log(e);
                    }
                } // tweakGuiLoU

                function updateCurBarons() {
                    var TotalBarons = oPlayer.getBarons();
                    var IdleBarons = oPlayer.getBaronsIdle();
                    var QueuedBarons = oPlayer.getBaronsQueue();
                    var AvailableBarons = oTech.getBonus("baronCount", webfrontend.data.Tech.research) - ((oPlayer.getNumCities() - 1) + IdleBarons + QueuedBarons);
                    BaronValue.setValue(TotalBarons + "/" + IdleBarons + "/" + QueuedBarons + "/" + AvailableBarons);
                    //BaronValue.setValue("100/100/20/100");
                }

                function updatPurifiedResources() {
                    var pr = oPlayer.getVoidResources();
                    if (pr) {
                        PurifiedResourcesValue.setValue(pr[3][1] + "/" + pr[2][1] + "/" + pr[1][1] + "/" + pr[0][1]);
                        //PurifiedResourcesLabel.setValue("100/100/20/100");
                    }
                }

                startCheck();
                console.log("LoU Baron Bar: Loaded");

            }
            catch (e) {
                console.log(e);
            }
        } // mainLoU_Baron

        var louUIBaronBarScript = document.createElement("script");
        var txt = mainLoU_Baron.toString();
        if (window.opera != undefined) txt = txt.replace(/</g, "&lt;");
        louUIBaronBarScript.innerHTML = "(" + txt + ")();";
        louUIBaronBarScript.type = "text/javascript";
        document.getElementsByTagName("head")[0].appendChild(louUIBaronBarScript);

    }
    catch (e) {
        console.log(e);
    }
})();
