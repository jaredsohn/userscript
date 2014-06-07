// ==UserScript==
// @name           BvS Village API
// @namespace      sa'saren
// @description    Provides an API for interacting with BvS Village page.
// @include        http://*animecubed.com/billy/bvs/village.html
// @require        http://userscripts.org/scripts/source/57756.user.js
// @history        0.0.6 - Added ramen value mappings
// @history        0.0.5 - Renamed entry function to VillageAPI from VillageAction
// @history        0.0.4 - Swapped over to ScriptUpdater instead of CheckForUpdate, will irritate users until they upgrade all userscripts that have old versions (huzzah!)
// @history        0.0.3 - Using snapshotItem(0) instead of snapshotItem() - fixes syntax error (hopefully)
// @history        0.0.1 - Fixed snapshot XPath issue (hopefully)
// @history        0.0.0 - Created
// @version        0.0.4
// ==/UserScript==
/*global document,XPathResult,ScriptUpdater*/
ScriptUpdater.check(74039, "0.0.6");

/*
Copyright (c) 2010 sa'saren

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
*/

/*
TODO:
	trick or treating
*/

var VillageAPI() {

	this.getFirstElementByName = function (name, tag) {
		if ( ! tag ) {
			tag = "";
		}
		var xpathExpression = "//" + tag + "[normalize-space(@name)='" + name + "']";
		var xpathResult = document.evaluate(xpathExpression, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		if ( xpathResult ) {
			var form = xpathResult.snapshotItem(0);
			return form;
		}
		return null;
	};

	this.getFirstElementByValue = function (value, tag, name) {
		if ( ! tag ) {
			tag = "";
		}
		var xpathExpression = "//" + tag + "[";
		if ( name ) {
			xpathExpression = xpathExpression + "normalize-space(@name)='" + name + "'";
		}
		xpathExpression = xpathExpression + ",normalize-space(@value)='" + value + "']";
		var xpathResult = document.evaluate(xpathExpression, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		if ( xpathResult ) {
			var form = xpathResult.snapshotItem(0);
			return form;
		}
		return null;
	};

	this.getForm = function (formName) {
		return this.getFirstElementByName(formName, "form");
	};

	this.submitForm = function (formName, subOptionValue, subOptionName) {
		var form = this.getForm(formName);
		if ( form ) {
			if ( subOptionValue ) {
				var choice = this.getFirstElementByValue(subOptionValue, "input", subOptionName);
				if ( choice ) {
					choice.click();
					form.submit();
					return true;
				}
			} else {
				form.submit();
				return true;
			}
		}
		return false;
	};


	this.performPatrol = function () {
		return this.submitForm("patrol");
	};
	
	this.performCollection = function () {
		return this.submitForm("rescol");
	};
	
	this.performZombjaSupport = function () {
		return this.submitForm("zatrs");
	};
	
	this.performPaperwork = function () {
		return this.submitForm("paperwork");
	};
	
	this.performRamenPurchase = function (ramenValue) {
		return this.submitForm("ramen", ramenValue, "ramentobuy");
	};
	
	this.performIngredientHunt = function (huntType) {
		return this.submitForm("ingredienthunt", huntType);
	};

	this.performForestHunt = function () {
		return this.performIngredientHunt("forest");
	};

	this.performDumpsterHunt = function () {
		return this.performIngredientHunt("dumpster");
	};

	this.performTrickOrTreatingHunt = function () {
		return this.performIngredientHunt("trickortreating???");
	};
	
	this.purchaseStaminaRamen = function() {
		return this.performRamenPurchase("stam");
	};

	this.purchaseBigStaminaRamen = function() {
		return this.performRamenPurchase("stam2");
	};

	this.purchaseAppetiteRamen = function() {
		return this.performRamenPurchase("app");
	};

	this.purchaseLevelBonusRamen = function() {
		return this.performRamenPurchase("bonus");
	};

	this.purchaseChakraRamen = function() {
		return this.performRamenPurchase("chak");
	};

	this.purchaseDoujutsuRamen = function() {
		return this.performRamenPurchase("dou");
	};

	this.purchaseFindRamen = function() {
		return this.performRamenPurchase("find");
	};

	this.purchaseArenaFights = function() {
		return this.performRamenPurchase("glad");
	};
	
	this.isHuntAvailable = function() {
		if ( this.getForm("ingredienthunt") ) {
			return true;
		} else {
			return false;
		}
	};

	this.isDailyActionAvailable = function() {
		if ( this.getForm("patrol") ) {
			return true;
		} else {
			return false;
		}
	};

	this.goVacationPage = function() {
		return this.submitForm("ninjabeach");
	};
	
	this.goStoreHousePage = function() {
		return this.submitForm("shouse");
	};
	
	this.goRoboFightoPage = function() {
		return this.submitForm("robofighto");
	};
	
	this.goJutsuEnhancementPage = function() {
		return this.submitForm("jenhance");
	};
	
	this.goMarketplacePage = function() {
		return this.submitForm("market");
	};
	
	this.goKaijuBattlePage = function() {
		return this.submitForm("kat");
	};
	
	this.goZombjaBattlePage = function() {
		return this.submitForm("zat");
	};
	
	this.goZombjaRewardsPage = function() {
		return this.submitForm("zrt");
	};

	this.goSpyReportPage = function() {
		return this.submitForm("spyreportshow");
	};
	
	this.showAllUpgrades = function() {
		return this.submitForm("showallups");
	};
	
	this.goShowAllSpies = function() {
		return this.submitForm("showallspies");
	};
	
	this.goShowAllVillagers = function() {
		return this.submitForm("showallvils");
	};
	
	this.isKaijuBattleAvailable = function() {
		if ( this.getForm("kat") ) {
			return true;
		} else {
			return false;
		}
	};
	
	this.isZombjaBattleAvailable = function() {
		if ( this.getForm("zat") ) {
			return true;
		} else {
			return false;
		}
	};
	
	this.sendVillageMessage = function(message) {
		if (!message ) {
			return false;
		}
		var form = this.getForm("leavem");
		if ( form ) {
			var text = this.getFirstElementByName("messageleft", "input");
			if ( text ) {
				text.value = message;
				form.submit();
				return true;
			}
		}
		return false;
	};
}
