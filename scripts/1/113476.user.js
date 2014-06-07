// ==UserScript==
// @name           Neopets : Shop Wizard
// @namespace      http://gm.wesley.eti.br/neopets
// @description    Allows you to use the Shop Wizard even if you are in a Faerie Quest
// @author         w35l3y
// @email          w35l3y@brasnet.org
// @copyright      2011+, w35l3y (http://gm.wesley.eti.br)
// @license        GNU GPL
// @homepage       http://gm.wesley.eti.br
// @version        2.0.0.0
// @language       en
// @include        http://www.neopets.com/market.phtml?type=wizard
// @include        http://www.neopets.com/market.phtml
// @icon           http://www.gravatar.com/avatar.php?gravatar_id=81269f79d21e612f9f307d16b09ee82b&r=PG&s=92&default=identicon
// @resource       meta http://userscripts.org/scripts/source/33958.meta.js
// @resource       i18n http://pastebin.com/download.php?i=1F0jQb5L
// @require        http://userscripts.org/scripts/source/63808.user.js
// @require        http://userscripts.org/scripts/source/85618.user.js
// @require        http://userscripts.org/scripts/source/87940.user.js
// @require        http://userscripts.org/scripts/source/87942.user.js
// @require        http://userscripts.org/scripts/source/56489.user.js
// @uso:version    version
// ==/UserScript==

/**************************************************************************

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.

**************************************************************************/

//GM_setValue("fill", false);
//GM_setValue("interval", "[500, 1000]");

(function () {	// script scope
	if (!xpath("string(.//tr/td[1]/img[contains(@src, 'shopwizard')]/@src)")) {
		var shopWizard = (<><![CDATA[
			<div class="contentModule" style="height: 100%">
				<table cellpadding="3" cellspacing="0" border="0" class="contentModuleTable">
				<tr>
					<td class="contentModuleHeaderAlt"> What are you looking for?</td>
				</tr>
				<tr>
					<td align="left" valign="top" class="contentModuleContent">
						<div align="center">
							<form action="market.phtml" method="post">
							<table cellpadding="4" cellspacing="0" border="0">
							<tr>
								<td align="center" valign="top"><img src="http://images.neopets.com/shopkeepers/shopwizard.gif" width="150" height="150" alt="" border="0" align="left"></td>
								<td align="left" valign="top">
									<input type="hidden" name="type" value="process_wizard">
									<input type="hidden" name="feedset" id="feedset" value="0">
									<table align="center" cellpadding="4" cellspacing="1" border="0">
										<tr>
											<td valign="middle" style="background-color: #EFEFEF;"><b>Search Text</b></td>
											<td valign="top"><input type="text" name="shopwizard" value="" size="50" maxlength="60" style="width: 300px"></td>
										</tr>
										<tr>
											<td valign="top" style="background-color: #EFEFEF;"><b>Area</b></td>
											<td valign="top"><input type="radio" name="table" value="shop" "checked"="checked" /> Shop<br />
											<input type="radio" name="table" value="gallery" /> Gallery</td>
										</tr>
										<tr>
											<td valign="middle" style="background-color: #EFEFEF;"><b>Search Items</b></td>
											<td valign="top"><select name="criteria">
												<option selected value="containing">containing my phrase</option>
												<option value="exact">identical to my phrase</option>
											</select></td>
										</tr>
										<tr>
											<td valign="middle" style="background-color: #EFEFEF;"><b>Min Price</b></td>
											<td valign="top"><input type="text" name="min_price" size="6" maxlength="6" value="0" /> <b>NP</b></td>
										</tr>
										<tr>
											<td valign="middle" style="background-color: #EFEFEF;"><b>Max Price</b></td>
											<td valign="top"><input type="text" name="max_price" size="6" maxlength="6" value="99999" /> <b>NP</b></td>
										</tr>
									</table>
								</td>
							</tr>
							</table>
							<div align="center" style="background-color: #EFEFEF; padding: 4px;">
								<input type="submit" value="Search">
							</div>
							</form>
						</div>
					</td>
				</tr></table>
			</div>
			<br clear="all">
			<br>
			<hr noshade size="1" color="#E4E4E4">
			<br>
		]]></>).toString(),
		faerieQuest = xpath(".//div[@class = 'main-icon']")[0],
		newDiv = document.createElement("div");

		newDiv.innerHTML = shopWizard;
		faerieQuest.parentNode.insertBefore(newDiv, faerieQuest);

		if (GM_getValue("fill", true)) {
			var interval = eval(GM_getValue("interval",	"[500, 1000]"));

			setTimeout(function() {
				HttpRequest.open({
					"method" : "get",
					"url" : "http://www.neopets.com/quests.phtml",
					"onsuccess" : function (xhr) {
						var input = xpath(".//form[contains(@action, 'market.phtml')]//input[@name = 'shopwizard']")[0],
						item = xpath("string(id('faerie-quest-event')//td[@class = 'item']/b/text())", xhr.response.xml);

						if (item) {
							input.value = item;
						}
					}
				}).send();
			}, interval[0] + Math.floor(Math.random() * interval[1]));
		}
	}
})();