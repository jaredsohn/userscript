// ==UserScript==
// @name           Blingbot Assistant for CC
// @namespace      Blingbot CC
// @version        1.2.2
// @include        http://prodgame*.lordofultima.com/*/index.aspx*
// ==/UserScript==

(
    function() {

    var CT_mainFunction = function() {

       function createCtTweak() {
           qx.Class.define("blingbotClaimThis.main", {
               type: "singleton",
               extend: qx.core.Object,
               members: {
                   app: null,
		   chat: null,
		   lawlessView: null,
		   buttonRow: null,
		   buttonRowN: null,
		   newcityView: null,				   
                   initialize: function() {
                       this.app = qx.core.Init.getApplication();
					this.lawlessView = this.app.cityDetailView;
					this.newcityView = this.app.newCityView;						   
					this.chat = this.app.chat;

                       this.createClaimButtons();
                   },
                   createClaimButtons: function() {
				   
						var buttonLayout = new qx.ui.layout.HBox(4).set( {alignX:"center"} );
						this.buttonRow = new qx.ui.container.Composite( buttonLayout ).set({maxWidth:306});

						var buttonLayoutN = new qx.ui.layout.HBox(4).set({alignX:"center"});
						this.buttonRowN = new qx.ui.container.Composite( buttonLayoutN ).set({maxWidth:306});

						this.lawlessView.actionArea.add(this.buttonRow);
						this.newcityView.container.add(new qx.ui.core.Spacer(0,40));
						this.newcityView.container.add(this.buttonRowN);
				
					   btnCcC = new qx.ui.form.Button(" Check LL").set({Width:70, height: 32, alignX: "center", paddingLeft: 0, paddingRight: 0});
					   btnCcC.addListener("click", function() {this.claimThis("h")}, this);
					   this.buttonRow.add(btnCcC);
					   
					   btnCC = new qx.ui.form.Button(" Claim LL").set({Width:70, height: 32, alignX: "center", paddingLeft: 0, paddingRight: 0});
					   btnCC.addListener("click", function() {this.claimThis("c")}, this);
					   this.buttonRow.add(btnCC);
					   
					   btnRC = new qx.ui.form.Button(" Unclaim LL").set({Width:80, height: 32, alignX: "center", paddingLeft: 0, paddingRight: 0});
					   btnRC.addListener("click", function() {this.claimThis("r")}, this);
					   this.buttonRow.add(btnRC);

					   //Not city area
					   btnCcN = new qx.ui.form.Button(" Check").set({Width:50, height: 32, alignX: "center", paddingLeft: 0, paddingRight: 0});
					   btnCcN.addListener("click", function() {this.claimThis("k")}, this);
					   this.buttonRowN.add(btnCcN);
					   
					   btnCN = new qx.ui.form.Button(" Claim").set({Width:50, height: 32, alignX: "center", paddingLeft: 0, paddingRight: 0});
					   btnCN.addListener("click", function() {this.claimThis("n")}, this);
					   this.buttonRowN.add(btnCN);
					   
					   btnRN = new qx.ui.form.Button(" Unclaim").set({Width:60, height: 32, alignX: "center", paddingLeft: 0, paddingRight: 0});
					   btnRN.addListener("click", function() {this.claimThis("b")}, this);
					   this.buttonRowN.add(btnRN);
                   },
					claimThis: function(v) {
						posX = posY = 0;
						if (v == "c" || v == "r" || v == "h" || v == "cp" || v == "mp") {
							if (typeof this.lawlessView.city.get_Coordinates == "undefined") {
								posX = this.lawlessView.city.getPosX(); posY = this.lawlessView.city.getPosY();
							} else {
								ctid = this.lawlessView.city.get_Coordinates(); posX = ctid & 0xFFFF; posY = ctid >> 16;
							}
							switch (v) {
								case "c": botAction = " !ll "; break;
								case "r": botAction = " !removell "; break;
								case "h": botAction = " !checkll "; break;
							}
						}
						else if (v == "n" || v == "b" || v == "k") {
							posX = this.newcityView.cityPosX; posY = this.newcityView.cityPosY;
							switch (v) {
								case "n": botAction = " !claim "; break;
								case "b": botAction = " !unclaim "; break;
								case "k": botAction = " !check "; break;
							}
						}
						checkchat = this.chat.chatLine.getValue();
						if (checkchat == null) { this.chat.chatLine.setValue(""); checkchat = ""; }
						if (posX >= 0 && posX <= 9) posX = "00" + posX;
						else if (posX > 9 && posX < 100) posX = "0" + posX;
						if (posY >= 0 && posY <= 9) posY = "00" + posY;
						else if (posY > 9 && posY < 100) posY = "0" + posY;

						this.chat.chatLine.setValue("/a"+botAction+posX+":"+posY);
						this.chat.sendCurrent();							
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
                       window.blingbotClaimThis.main.getInstance().initialize();
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
    var blingbotClaimThisScript = document.createElement("script");
    txt = CT_mainFunction.toString();
    if (window.opera != undefined)
       txt = txt.replace(/</g, "&lt;"); // rofl Opera
    blingbotClaimThisScript.innerHTML = "(" + txt + ")();";
    blingbotClaimThisScript.type = "text/javascript";
    if (/lordofultima\.com/i.test(document.domain))
       document.getElementsByTagName("head")[0].appendChild(blingbotClaimThisScript);
})();