// ==UserScript==
// @name           LoU Command Executor
// @namespace      lpt
// @include        http://prodgame*.lordofultima.com/*/index.aspx*
// ==/UserScript==

(
    function() {

    var LPT_mainFunction = function() {

        function createLptTweak() {
            qx.Class.define("louPalaceTrader.main", {
                type: "singleton",
                extend: qx.core.Object,
                members: {
                    app: null,
                    timer: null,
                    stopButton: null,
                    commandName: null,
                    commandText: null,
                    lastSendCommand: null,
                    sendCommandBuffer: null,
                    sendCommandBusy: null,
                    tradeButtonsListener: null,
                    sendListener: null,
                    initialize: function() {
                        this.app = qx.core.Init.getApplication();
                        this.timer = qx.util.TimerManager.getInstance();
                        this.lastSendCommand = 0;
                        this.sendCommandBuffer = new Array();
                        this.sendCommandBusy = false;

                        this.tweakServerBar();
                    },
                    tweakServerBar: function() {
                        this.commandName = new qx.ui.form.TextField("tradeDirect");
                        this.commandName.set({width: 40, height: 19});
                        this.app.serverBar.add(this.commandName, {top: 2, left: 430});

                        this.commandText = new qx.ui.form.TextField("");
                        this.commandText.set({width: 90, height: 19});
                        this.app.serverBar.add(this.commandText, {top: 2, left: 475});

                        btn = new qx.ui.form.Button("Add");
                        btn.set({width: 50, appearance: "button-text-small", toolTipText: "Click to add command"});
                        btn.addListener("click", this.sendClicked, this);
                        this.app.serverBar.add(btn, {top: 2, left: 575});

                        this.stopButton = new qx.ui.form.Button("Stop");
                        this.stopButton.set({width: 50, appearance: "button-text-small", toolTipText: "Click to stop and remove all commands"});
                        this.stopButton.addListener("click", this.stopClicked, this);
                        this.app.serverBar.add(this.stopButton, {top: 2, left: 630});

                        this.timer.start(this.sendCmd, null, this, null, 60000);
                    },
                    sendClicked: function() {
                        name = this.commandName.getValue();
                        text = this.commandText.getValue();
                        if (name && name.length > 0 && text && text.length > 1) {
                            obj = eval('(' + text+ ')');
                            this.sendCommandBuffer.push(
                                {
                                    a: name,
                                    p: obj
                                });
                        }
                    },
                    stopClicked: function() {
                        this.sendCommandBuffer = new Array();
                    },
                    sendCmd: function() {
                        for (var i in this.sendCommandBuffer) {
                            cmd = this.sendCommandBuffer[i];
                            webfrontend.net.CommandManager.getInstance().sendCommand(cmd.a, cmd.p, this, function() {

                            });
                        }
                           this.timer.start(this.sendCmd, null, this, null, 60000);
                    }
                }
            });
        }

        function LPT_checkIfLoaded() {
            try {
                if (typeof qx != 'undefined') {
                    a = qx.core.Init.getApplication(); // application
                    c = a.cityInfoView;
                    ch = a.chat;
                    wdst = webfrontend.data.ServerTime.getInstance().refTime;
                    if (a && c && ch && wdst) {
                        createLptTweak();
                        window.louPalaceTrader.main.getInstance().initialize();
                    } else
                        window.setTimeout(LPT_checkIfLoaded, 1000);
                } else {
                    window.setTimeout(LPT_checkIfLoaded, 1000);
                }
            } catch (e) {
                if (typeof console != 'undefined') console.log(e);
                else if (window.opera) opera.postError(e);
                else GM_log(e);
            }
        }

        if (/lordofultima\.com/i.test(document.domain))
            window.setTimeout(LPT_checkIfLoaded, 1000);

    }
    // injecting, because there seem to be problems when creating game interface with unsafeWindow
    var louPalaceTraderScript = document.createElement("script");
    txt = LPT_mainFunction.toString();
    if (window.opera != undefined)
        txt = txt.replace(/</g, "&lt;"); // rofl Opera
    louPalaceTraderScript.innerHTML = "(" + txt + ")();";
    louPalaceTraderScript.type = "text/javascript";
    if (/lordofultima\.com/i.test(document.domain))
        document.getElementsByTagName("head")[0].appendChild(louPalaceTraderScript);


})();