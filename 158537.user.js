// ==UserScript==
// @name Tiberium Alliances "Alliance Officials" Message Mod
// @description Replaces the "My Commanders" option in the new message window with an "Alliance Officials" option.
// @namespace message_mod
// @include https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version 1.3
// @author KRS_L
// @updateURL https://userscripts.org/scripts/source/158537.meta.js
// @downloadURL https://userscripts.org/scripts/source/158537.user.js
// ==/UserScript==
(function () {
	var MessageMod_main = function () {
		function createMessageMod() {
			try {
				console.log('MessageMod loaded');
				qx.$$translations[qx.locale.Manager.getInstance().getLocale()]["tnf:my officers"]="Alliance Officials";
				var addOfficers = function () {
					var roles = this.get_Roles().d;
					var members = this.get_MemberData().d;
					for (var x in members) {
						if (roles[members[x].Role].Name === 'Officer') {
							this.get_SecondLeaders().l.push(members[x].Id);
						}
					}
				};
				ClientLib.Data.Alliance.prototype.addOfficersToSecondLeadersArray = addOfficers;
				var refreshResult = ClientLib.Data.Alliance.prototype.RefreshMemberData.toString().match(/this.this.[A-Z]{6}/).toString().slice(10,16);
				var refreshResult_original = "ClientLib.Data.Alliance.prototype.refreshResult_Original = ClientLib.Data.Alliance.prototype."+refreshResult;
				var rro = Function('', refreshResult_original);
				rro();
				var refreshResult_new = "ClientLib.Data.Alliance.prototype." + refreshResult + " = function(a,b){this.refreshResult_Original(a,b);this.addOfficersToSecondLeadersArray();}";
				var rrn = Function('', refreshResult_new);
				rrn();
				webfrontend.gui.mail.MailOverlay.getInstance().addListener("appear", function () {
					ClientLib.Data.MainData.GetInstance().get_Alliance().RefreshMemberData();
				}, this);
				webfrontend.gui.mail.MailOverlay.getInstance().onNewMessage_Original = webfrontend.gui.mail.MailOverlay.getInstance().onNewMessage;
				webfrontend.gui.mail.MailOverlay.getInstance().onNewMessage = function (a) {
					ClientLib.Data.MainData.GetInstance().get_Alliance().RefreshMemberData();
					this.onNewMessage_Original(a);
				};
			} catch (e) {
			console.log("createMessageMod: ", e);
			}
		}

		function MessageMod_checkIfLoaded() {
			try {
				if (typeof qx !== 'undefined' && typeof qx.locale !== 'undefined' && typeof qx.locale.Manager !== 'undefined') {
					if (ClientLib.Data.MainData.GetInstance().get_Alliance().get_FirstLeaders() !== null && ClientLib.Data.MainData.GetInstance().get_Alliance().get_FirstLeaders().l.length != 0) {
						createMessageMod();
					} else {
						window.setTimeout(MessageMod_checkIfLoaded, 1000);
					}
				} else {
					window.setTimeout(MessageMod_checkIfLoaded, 1000);
				}
			} catch (e) {
			console.log("MessageMod_checkIfLoaded: ", e);
			}
		}

		if (/commandandconquer\.com/i.test(document.domain)) {
			window.setTimeout(MessageMod_checkIfLoaded, 1000);
		}
	}

	try {
		var MessageMod = document.createElement("script");
		MessageMod.innerHTML = "(" + MessageMod_main.toString() + ")();";
		MessageMod.type = "text/javascript";
		if (/commandandconquer\.com/i.test(document.domain)) {
			document.getElementsByTagName("head")[0].appendChild(MessageMod);
		}
	} catch (e) {
	console.log("MessageMod: init error: ", e);
	}
})();