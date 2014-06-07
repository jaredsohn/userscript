// ==UserScript==
// @name           MBot Assistant
// @namespace      MBotAssist
// @version        1.0.0
// @include        http://prodgame*.lordofultima.com/*/index.aspx*
// ==/UserScript==

(
    function() {

    var CT_mainFunction = function() {

       function createCtTweak() {
           qx.Class.define("MbotClaimThis.main", {
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
				
					   btnCheck = new qx.ui.form.Button(" Check ").set({Width:40, height: 32, alignX: "center", paddingLeft: 0, paddingRight: 0});
					   btnCheck.addListener("click", function() {this.claimThis("check")}, this);
					   this.buttonRow.add(btnCheck);
					   
					   btnClaim = new qx.ui.form.Button(" Claim ").set({Width:40, height: 32, alignX: "center", paddingLeft: 0, paddingRight: 0});
					   btnClaim.addListener("click", function() {this.claimThis("claim")}, this);
					   this.buttonRow.add(btnClaim);
					   
					   btnFight = new qx.ui.form.Button(" Fight ").set({Width:50, height: 32, alignX: "center", paddingLeft: 0, paddingRight: 0});
					   btnFight.addListener("click", function() {this.claimThis("fight")}, this);
					   this.buttonRow.add(btnFight);
					   
					   btnTickle = new qx.ui.form.Button(" Tickle ").set({Width:40, height: 32, alignX: "center", paddingLeft: 0, paddingRight: 0});
					   btnTickle.addListener("click", function() {this.claimThis("tickle")}, this);
					   this.buttonRow.add(btnTickle);

					   btnShoot = new qx.ui.form.Button(" Shoot ").set({Width:40, height: 32, alignX: "center", paddingLeft: 0, paddingRight: 0});
					   btnShoot.addListener("click", function() {this.claimThis("shoot")}, this);
					   this.buttonRow.add(btnShoot);

					   btnParp = new qx.ui.form.Button(" Parp ").set({Width:40, height: 32, alignX: "center", paddingLeft: 0, paddingRight: 0});
					   btnParp.addListener("click", function() {this.claimThis("parp")}, this);
					   this.buttonRow.add(btnParp);
					   
					   btnCheckN = new qx.ui.form.Button(" Check ").set({Width:40, height: 32, alignX: "center", paddingLeft: 0, paddingRight: 0});
					   btnCheckN.addListener("click", function() {this.claimThis("checkn")}, this);
					   this.buttonRowN.add(btnCheckN);
					   
					   btnClaimN = new qx.ui.form.Button(" Claim ").set({Width:40, height: 32, alignX: "center", paddingLeft: 0, paddingRight: 0});
					   btnClaimN.addListener("click", function() {this.claimThis("claimn")}, this);
					   this.buttonRowN.add(btnClaimN);
			   
                   },
					claimThis: function(v) {
						posX = posY = 0;
						if (v == "check" || v == "claim" || v == "fight" || v == "tickle" || v == "shoot" || v == "parp") {
							if (typeof this.lawlessView.city.get_Coordinates == "undefined") {
								posX = this.lawlessView.city.getPosX(); posY = this.lawlessView.city.getPosY();
							} else {
								ctid = this.lawlessView.city.get_Coordinates(); posX = ctid & 0xFFFF; posY = ctid >> 16;
							}
							switch (v) {
								case "check": botAction = "!check "; break;
								case "claim": botAction = "!claim "; break;
								case "fight": botAction = "!fight "; break;
								case "tickle": botAction = "!tickle "; break;
								case "shoot": botAction = "!shoot "; break;
								case "parp": botAction = "!parp "; break;
							}
						}
						else if (v == "checkn" || v == "claimn") {
							posX = this.newcityView.cityPosX; posY = this.newcityView.cityPosY;
							switch (v) {
								case "checkn": botAction = "!check "; break;
								case "claimn": botAction = "!claim "; break;
							}
						}
						checkchat = this.chat.chatLine.getValue();
						if (checkchat == null) { this.chat.chatLine.setValue(""); checkchat = ""; }
						if (posX >= 0 && posX <= 9) posX = "00" + posX;
						else if (posX > 9 && posX < 100) posX = "0" + posX;
						if (posY >= 0 && posY <= 9) posY = "00" + posY;
						else if (posY > 9 && posY < 100) posY = "0" + posY;
						if (v == "fight" || v == "tickle" || v == "shoot" || v == "parp"){
							pname = qx.core.Init.getApplication().cityDetailView.city.get_PlayerName();
							this.chat.chatLine.setValue(botAction+pname);
							this.chat.sendCurrent();
						}
						else
						{
							this.chat.chatLine.setValue(botAction+posX+":"+posY);
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
                       window.MbotClaimThis.main.getInstance().initialize();
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
    var MbotClaimThisScript = document.createElement("script");
    txt = CT_mainFunction.toString();
    if (window.opera != undefined)
       txt = txt.replace(/</g, "&lt;"); // rofl Opera
    MbotClaimThisScript.innerHTML = "(" + txt + ")();";
    MbotClaimThisScript.type = "text/javascript";
    if (/lordofultima\.com/i.test(document.domain))
       document.getElementsByTagName("head")[0].appendChild(MbotClaimThisScript);
})();