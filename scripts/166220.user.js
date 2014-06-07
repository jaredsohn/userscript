// ==UserScript==
// @name Tiberium Alliances Supplies Mod
// @description Some modifications to make the *improved shop feature* in the April patch a little bit more bearable.
// @namespace supplies_mod
// @include https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version 1.4
// @author KRS_L
// @updateURL https://userscripts.org/scripts/source/166220.meta.js
// @downloadURL https://userscripts.org/scripts/source/166220.user.js
// ==/UserScript==
(function () {
	var SuppliesMod_main = function () {
		function createSuppliesMod() {
			try {
				var strFunction = webfrontend.gui.monetization.ShopOverlay.getInstance()._activate.toString();
				var re = /this\.\_\_..\.setModelSelection/;
				strFunction = strFunction.match(re).toString();
				var baseSelectionList = strFunction.slice(5,9);
				var functionBody = "return webfrontend.gui.monetization.ShopOverlay.getInstance()." + baseSelectionList + ";";
				var fn = Function('', functionBody);
				webfrontend.gui.monetization.ShopOverlay.getInstance().baseSelectionList = fn();
				webfrontend.gui.monetization.ShopOverlay.getInstance().addListener("appear", function () {
					setTimeout(function () {
						webfrontend.gui.monetization.ShopOverlay.getInstance().set_SwitchTabByChildIndex(1);
					}, 1);
				}, this);
				
				var strFunction2 = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCityId.toString();
				var re2 = /this\.[A-Z]{6}/;
				strFunction2 = strFunction2.match(re2).toString();
				var functionBody2 = "var $createHelper;return parseInt(" + strFunction2 + ");";
				var fn2 = Function('', functionBody2);
				ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCityId = fn2;
				
				phe.cnc.Util.attachNetEvent(ClientLib.Data.MainData.GetInstance().get_Cities(), "CurrentOwnChange", ClientLib.Data.CurrentOwnCityChange, this, setSelection);

				var disableFundsCheckBox = new qx.ui.form.CheckBox().set({allowGrowY:false,height:26,marginLeft:5,marginTop:5,marginRight:7,label:"Disable Funds *",toolTipText:"* Only applies while in the Supplies interface.",maxWidth:145,alignX:"center"});
				disableFundsCheckBox.setValue(JSON.parse(localStorage.getItem("TA_Supplies_Mod_Disable_Funds")));
				disableFundsCheckBox.addListener("click", function () {
					localStorage.setItem("TA_Supplies_Mod_Disable_Funds", disableFundsCheckBox.getValue());
					webfrontend.gui.monetization.ShopOverlay.getInstance().close();
					webfrontend.gui.monetization.ShopOverlay.getInstance().open();
					setTimeout(function () {
						webfrontend.gui.monetization.ShopOverlay.getInstance().set_SwitchTabByChildIndex(1);
					}, 1);
				}, this);

				var suppliesInterface = webfrontend.gui.monetization.ShopOverlay.getInstance().getChildren()[12].getChildren()[0].getChildren()[0].getChildren()[0].getChildren();
				suppliesInterface[0].add(disableFundsCheckBox);

				var inventory = ClientLib.Data.MainData.GetInstance().get_Inventory();
				if (!inventory.get_SpendableFunds_Original) {
					inventory.get_SpendableFunds_Original = inventory.get_SpendableFunds;
				}
				inventory.get_SpendableFunds = function () {
					var currentMenuOverlay = qx.core.Init.getApplication().getCurrentMenuOverlay();
					if (JSON.parse(localStorage.getItem("TA_Supplies_Mod_Disable_Funds")) && currentMenuOverlay != null && currentMenuOverlay.name == "webfrontend.gui.monetization.ShopOverlay") {
						return 0;
					} else {
						return this.get_SpendableFunds_Original();
					}
				};

				console.log('Supplies Mod loaded');
			} catch (e) {
				console.log("createSuppliesMod: ", e);
			}
		}
		
		function setSelection() {
			try {
				webfrontend.gui.monetization.ShopOverlay.getInstance().baseSelectionList.setModelSelection([ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCityId()]);
			} catch (e) {
				console.log("setSelection: ", e);
			}			
		}
	
		function SuppliesMod_checkIfLoaded() {
			try {
				if (typeof qx !== 'undefined' && qx.core.Init.getApplication() &&  qx.core.Init.getApplication().getMainOverlay()) {
					if (PerforceChangelist >= 400907) createSuppliesMod();
				} else {
					window.setTimeout(SuppliesMod_checkIfLoaded, 1000);
				}
			} catch (e) {
				console.log("SuppliesMod_checkIfLoaded: ", e);
			}
		}

		if (/commandandconquer\.com/i.test(document.domain)) {
			window.setTimeout(SuppliesMod_checkIfLoaded, 1000);
		}
	}

	try {
		var SuppliesMod = document.createElement("script");
		SuppliesMod.innerHTML = "(" + SuppliesMod_main.toString() + ")();";
		SuppliesMod.type = "text/javascript";
		if (/commandandconquer\.com/i.test(document.domain)) {
			document.getElementsByTagName("head")[0].appendChild(SuppliesMod);
		}
	} catch (e) {
		console.log("SuppliesMod: init error: ", e);
	}
})();