// ==UserScript==
// @name			Steam Badge Helper
// @namespace		iFantz7E.SteamBadgeHelper
// @version			1.0
// @description		Add various features to Steam focus on Trading Cards and Badges
// @match			http://store.steampowered.com/app/*
// @match			http://store.steampowered.com/search/*
// @match			http://steamcommunity.com/app/*/tradingforum/*
// @match			http://steamcommunity.com/sharedfiles/filedetails/*
// @match			http://steamcommunity.com/market/listings/753/*
// @match      		http://steamcommunity.com/*/gamecards/*
// @grant 			GM_getValue
// @grant 			GM_setValue
// @grant 			GM_listValues
// @grant 			GM_deleteValue
// @grant 			GM_xmlhttpRequest
// @icon      		http://store.steampowered.com/favicon.ico
// @copyright		2014, 7-elephant
// @updateURL   	http://userscripts.org/scripts/source/186163.meta.js
// @downloadURL		https://userscripts.org/scripts/source/186163.user.js
// ==/UserScript==

(function ()
{

	// ===== Config =====

	var enableDebug = false;
	var enableDebugConsole = false;
	var enableCleanLink = true;
	var enableGreenlight = true;
	var enableLinkBadgeToFriend = true;
	var enableLinkStoreToBadge = true;
	var enableLinkForumToBadge = true;
	var enableLinkBadgeToForum = true;
	var enableLinkMarketToBadge = true;
	var enableLinkBadgeToMarket = true;
	var enableCompareBadge = true;
	var enableAlwaysClearCache = false;
	var enableHideEnhancedMenu = false;
	var enableHideEnhancedBadgePrice = true;
	
	var enableCache = true;
	var timeCacheExpireSec = 60 * 5;

	// ===== End Config =====

	// ===== Helper =====

	var timeStart = new Date();

	setTimeout(function ()
	{
		var counter = GM_getValue('counter', 0);
		GM_setValue('counter', ++counter);
	}, 0);

	function debug(msg)
	{
		try
		{
			msg = msg ? (new String(msg)).trim().replace(/\s\s/gi, "").replace(/\s/gi, " ") : "";
			
			if (enableDebugConsole)
				console.log(msg);
			
			if (enableDebug)
			{
				var divDebugID = "div_debug_7e";
				var divDebugOuterID = divDebugID + "_outer";
				var divOut = document.getElementById(divDebugOuterID);
				var div = document.getElementById(divDebugID);

				var isExistOuter = divOut != null;
				if (!isExistOuter)
				{
					divOut = document.createElement("div");
					divOut.id = divDebugOuterID;
					divOut.style = "font-family:'Courier New', Courier; font-size: 11px; z-index: 999999; padding: 3px; text-align: left;"
						+ " border: 3px solid orange; color: black; background-color: rgba(255,255,255,0.9);"
						+ " position: fixed; top: 10px; left: 10px; overflow-x:hidden; overflow-y:scroll; resize: both;";
					divOut.style.width = "185px";
					divOut.style.height = "200px";

					if (div == null)
					{
						div = document.createElement("div");
						div.id = divDebugID;
						div.style.minWidth = "1000px";
						div.innerHTML = "<span style='font-weight: bold; line-height: 18px;'>Debug:</span>";
					}
					divOut.appendChild(div);
					document.body.appendChild(divOut);
				}
				div.innerHTML = div.innerHTML + " <br/> " + msg;
				divOut.scrollTop = divOut.scrollHeight;
			}
		}
		catch (e)
		{
			console.log("Ex: " + e);
		}
	}

	function debugTime(header)
	{
		header = header ? (new String(header)) + ": " : "";
		var ms = (new Date()) - timeStart;
		debug(header + ms + "ms");
	}

	function randNum()
	{
		return parseInt(Math.random() * 900000 + 100000);
	}

	function randTempID()
	{
		return "id_temp_7e_" + randNum();
	}

	function createDivTemp(id, html)
	{
		var div = document.getElementById(id);
		if (div == null)
		{
			div = document.createElement("div");
			div.id = id;
			document.body.appendChild(div);
		}
		div.style.display = "none";
		div.style.zIndex = "-999999";

		// remove all external sources
		var pattScript = /(<(script|meta|link|style|title)[^>]*>|<\/(script|meta|link|style|title)>)/gi;
		html = html.replace(pattScript, "");

		div.innerHTML = html;
	}

	function removeDivTemp(id)
	{
		var ele = document.getElementById(id);
		ele.parentNode.removeChild(ele);
	}

	function attachOnload(callback)
	{
		if (window.attachEvent)
		{
			window.attachEvent('onload', callback);
		}
		else
		{
			if (window.onload)
			{
				var curronload = window.onload;
				var newonload = function ()
				{
					curronload();
					callback();
				};
				window.onload = newonload;
			} else
			{
				window.onload = callback;
			}
		}
	}

	// ===== End Helper =====


	// ===== Cleaner =====

	/** Remove unnessary parameters in URL
	*/
	function cleanLink()
	{
		var url = document.documentURI;
		var pattApp = /^http[s]?:\/\/store.steampowered.com\/(app|sub)\/[0-9]+/i;
		var pattBadge = /^http[s]?:\/\/steamcommunity.com\/(id|profiles)\/[^\/]+\/gamecards\/[0-9]+/i;

		if (pattApp.test(url))
		{
			var urlNew = url;
			var urlNews = url.match(pattApp);
			if (urlNews != null)
			{
				var urlTail = url.replace(pattApp, "");
				if (urlTail.charAt(0) != "/")
				{
					if (urlTail.charAt(0) == "?")
					{
						urlTail = "";
					}
					urlNew = urlNews[0] + "/" + urlTail;
					window.location = urlNew;
				}
			}
		}
		else if (pattBadge.test(url))
		{
			var urlNews = url.match(pattBadge);
			if (urlNews != null)
			{
				var urlTail = url.replace(pattBadge, "");

				if (urlTail.charAt(0) != "/")
				{
					window.location = urlNews[0] + "/" + urlTail;
				}
			}
		}
	}
	if (enableCleanLink) cleanLink();

	/** Change search parameter to page 1 to determine visited links
	*/
	function cleanLinkSearch()
	{
		var pattSearch = /snr=1_7_7_230_150_[0-9]+/i

		var as = document.querySelectorAll("a.search_result_row");
		for (var j = 0; j < as.length; j++)
		{
			var urlSearch = as[j].href;
			urlSearch = urlSearch.replace(pattSearch, "snr=1_7_7_230_150_1");
			as[j].href = urlSearch;
		}

		document.addEventListener("DOMNodeInserted", onNodeInserted);
		function onNodeInserted(e)
		{
			try
			{
				var node = e.target;
				if (node.classList.contains("search_result_row"))
				{
					var urlSearch = node.href;
					urlSearch = urlSearch.replace(pattSearch, "snr=1_7_7_230_150_1");
					node.href = urlSearch;
				}
			}
			catch (ex)
			{
			}
		}
	}
	function cleanLinkSearchTimeout(tm)
	{
		var url = document.documentURI;
		var patt = /^http[s]?:\/\/store.steampowered.com\/search\//i;

		if (patt.test(url))
		{
			setTimeout(cleanLinkSearch, tm);
		}
	}
	if (enableCleanLink) cleanLinkSearchTimeout(100);

	/** Hide EnhancedSteam's menu on top
	*/
	function hideEnhancedMenuTimeout(tm)
	{
		setTimeout(function()
		{
			var as = document.querySelectorAll(".header_installsteam_btn_content , .header_installsteam_btn");
			for (var i = 0; i < as.length; i++)
			{
				as[i].style.display = "none";
			}
		}, tm);
				
		attachOnload(function ()
		{
			setTimeout(function()
			{
				var aE = document.getElementById("enhanced_pulldown");
				if (aE != null)
				{
					aE.style.display = "none";
				}
			}, tm);
		});		
	}
	if (enableHideEnhancedMenu) hideEnhancedMenuTimeout(1000);

	/** Hide EnhancedSteam's price on Badge page
	*/
	function hideEnhancedBadgePrice()
	{
		document.addEventListener("DOMNodeInserted", onNodeInserted);
		function onNodeInserted(e)
		{
			try
			{
				var node = e.target;
				if (node.classList.contains("es_card_search"))
				{
					debug("hideEnhanced: " + node.innerHTML);
					node.style.display = "none";
				}
			}
			catch (ex)
			{
			}
		}
	}
	function hideEnhancedBadgePriceTimeout(tm)
	{
		var url = document.documentURI;
		var patt = /^http[s]?:\/\/steamcommunity.com\/(id|profiles)\/[^\/]+\/gamecards\/[0-9]+/i;

		if (patt.test(url))
		{
			setTimeout(hideEnhancedBadgePrice, tm);
		}
	}
	if (enableHideEnhancedBadgePrice) hideEnhancedBadgePriceTimeout(100);

	
	// ===== End Cleaner =====

	// ===== Main =====

	/** Disable autoplay on Greenlight page while autoplay option is on
	*/
	function disableGreenlightAutoplay()
	{
		var iframes = document.getElementsByTagName("iframe");
		for (var i in iframes)
		{
			if (iframes[i].className == "highlight_flash_player_notice")
			{
				iframes[i].src = iframes[i].src.replace("autoplay=1", "autoplay=0");
			}
		}
	}
	function disableGreenlightAutoplayTimeout(tm)
	{
		var url = document.documentURI;
		var patt = /^http:\/\/steamcommunity.com\/sharedfiles\/filedetails\//i;

		if (patt.test(url))
		{
			attachOnload(function ()
			{
				setTimeout(disableGreenlightAutoplay, tm);
			});
		}
	}
	if (enableGreenlight) disableGreenlightAutoplayTimeout(0);

	/** Add small button on friend section in Badge page to view friends' Badge page for comparing cards
	*   Reduce height of Review textbox
	*/
	function linkBadgeToFriend()
	{
		var url = document.documentURI;
		var pattHead = /^http[s]?:\/\/steamcommunity.com\/(id|profiles)\/[^\/]*/i;
		var urlTail = url.replace(pattHead, "");
		var pattProfile = /^http[s]?:\/\/steamcommunity.com\/(id|profiles)/i;

		var els = document.getElementsByTagName("div");

		for (var i in els)
		{
			if (els[i].className == "badge_friends_have_earned_friends"
				|| els[i].className == "badge_friendwithgamecard")
			{
				var as = els[i].getElementsByTagName("a");
				var limit = 1;
				var curLimit = 0;

				for (var j in as)
				{
					var a = as[j];
					if (pattProfile.test(a.href))
					{
						var badgeUrl = a.href + urlTail;

						if (els[i].className == "badge_friends_have_earned_friends"
							|| !a.parentNode.classList.contains("playerAvatar"))
						{
							a.href = badgeUrl;
						}

						if (curLimit < limit && els[i].className == "badge_friendwithgamecard")
						{
							elActs = els[i].getElementsByClassName("badge_friendwithgamecard_actions");
							for (var k in elActs)
							{
								elActs[k].innerHTML = elActs[k].innerHTML
									+ " <a class='btn_grey_grey btn_medium' title=\"View friend\'s badge\" href='"
									+ badgeUrl
									+ "'><img style='height:16px; opacity:0.66'"
									+ " src='http://cdn4.store.steampowered.com/public/images/ico/ico_cards.png'></a> ";
								curLimit += 1;
							}
						}
					}
				} // end for
			}
		}
	}
	function linkBadgeToFriendTimeout(tm)
	{
		var url = document.documentURI;
		var patt = /^http[s]?:\/\/steamcommunity.com\/(id|profiles)\/[^\/]+\/gamecards\/[0-9]+/i;

		if (patt.test(url))
		{
			setTimeout(linkBadgeToFriend, tm);
		}
	}
	if (enableLinkBadgeToFriend) linkBadgeToFriendTimeout(100);

	/** Add button on top of Store page to view Badge page
	*/
	function linkStoreToBadge()
	{
		var url = document.documentURI;
		var patt = /^http[s]?:\/\/store.steampowered.com\/app\//i;
		var pattEnd = /[^0-9].*$/i;
		var app = url.replace(patt, "").replace(pattEnd, "");

		var aOwner = document.querySelector("#global_actions > .user_avatar");
		var isLoggedIn = aOwner != null;
		var ownerUrl = isLoggedIn ? aOwner.href.substr(0, aOwner.href.length - 1) : "http://steamcommunity.com/my";

		var urlDlc = "http://store.steampowered.com/search/?term=#category2=21&sort_order=ASC";
		var urlCard = "http://store.steampowered.com/search/?term=#category2=29&sort_order=ASC";

		var isBadge = false;
		var as = document.querySelectorAll(".game_area_details_specs > .icon > a")
		for (var i = 0; i < as.length; i++)
		{
			if (as[i].href == urlDlc)
			{
				isBadge = false;
				break;
			}
			else if (as[i].href == urlCard)
			{
				isBadge = true;
			}
		}

		if (isBadge)
		{
			var divs = document.getElementsByClassName("apphub_OtherSiteInfo");
			for (var i = 0; i < divs.length; i++)
			{
				divs[i].innerHTML = divs[i].innerHTML
					+ " &nbsp;<a class=\"btn_darkblue_white_innerfade btn_medium\""
					+ " href=\"" + ownerUrl + "/gamecards/" + app + "/\">"
					+ "<span>Trading Cards</span></a>";
			}
		}

		var txtRec = document.getElementById("game_recommendation");
		if (txtRec != null)
		{
			// reduce height of review textbox
			txtRec.style.height = "16px";
		}
	}
	function linkStoreToBadgeTimeout(tm)
	{
		var url = document.documentURI;
		var patt = /^http[s]?:\/\/store.steampowered.com\/app\//i;

		if (patt.test(url))
		{
			setTimeout(linkStoreToBadge, tm);
		}
	}
	if (enableLinkStoreToBadge) linkStoreToBadgeTimeout(100);

	/** Add button in Forum page to view Badge page
	*   Mark topic to determine visited links
	*/
	function linkForumToBadge()
	{
		var url = document.documentURI;
		var pattAppHead = /^http[s]?:\/\/steamcommunity.com\/app\//i;
		var pattAppTail = /[^0-9]+.*/i;
		var app = url.replace(pattAppHead, "").replace(pattAppTail, "");

		var aOwner = document.querySelector("div.user_avatar > div.playerAvatar > a");
		var isLoggedIn = aOwner != null;
		var ownerUrl = isLoggedIn ? aOwner.href : "http://steamcommunity.com/my";

		var as = document.getElementsByClassName("forum_topic_overlay");
		for (var i = 0; i < as.length; i++)
		{
			// mark topic
			as[i].style.borderLeft = "3px solid";
		}

		var divs = document.getElementsByClassName("apphub_OtherSiteInfo");
		for (var j = 0; j < divs.length; j++)
		{
			var aBadge = " <a class='btn_darkblue_white_innerfade btn_medium' href='"
				+ ownerUrl + "/gamecards/" + app
				+ "/'><span>Trading Cards</span></a> ";
			divs[j].innerHTML = divs[j].innerHTML + aBadge;
		}
	}
	function linkForumToBadgeTimeout(tm)
	{
		var url = document.documentURI;
		var patt = /^http:\/\/steamcommunity.com\/app\/[0-9]+\/tradingforum\//i;

		if (patt.test(url))
		{
			setTimeout(linkForumToBadge, tm);
		}
	}
	if (enableLinkForumToBadge) linkForumToBadgeTimeout(100);

	/** Add buttons in Badge page to view Trading Forum, Store, friend's Inventory and my Badge page
	*/
	function linkBadgeToForum()
	{
		var url = document.documentURI;

		var pattAppHead = /^http[s]?:\/\/steamcommunity.com\/(id|profiles)\/[^\/]+\/gamecards\//i;
		var pattAppTail = /[^0-9]+.*/i;
		var app = url.replace(pattAppHead, "").replace(pattAppTail, "");

		var divs = document.getElementsByClassName("gamecards_inventorylink");
		if (divs.length > 0)
		{

			var aStoreUrl = "http://store.steampowered.com/app/" + app + "/";
			var aForumUrl = "http://steamcommunity.com/app/" + app + "/tradingforum/";
			var aCustom = " <a class='btn_grey_grey btn_small_thin' href='" + aStoreUrl + "'><span>Visit Store Page</span></a> "
				+ " <a class='btn_grey_grey btn_small_thin' href='" + aForumUrl + "'><span>Visit Trade Forum</span></a> ";

			divs[0].innerHTML = divs[0].innerHTML + aCustom;
		}

		var aOwner = document.querySelector("div.user_avatar > div.playerAvatar > a");
		var isLoggedIn = aOwner != null;
		var ownerUrl = isLoggedIn ? aOwner.href : "http://steamcommunity.com/my";

		var aFriend = document.querySelector(".profile_small_header_name > a");
		var isFriendExist = aFriend != null;
		var friendUrl = isFriendExist ? aFriend.href : "http://steamcommunity.com/my";
		var friendName = isFriendExist ? aFriend.textContent.trim() : "my"
		var friendNameOwner = isFriendExist ? friendName + "'s" : friendName;

		var isOwner = isLoggedIn && ownerUrl == friendUrl;

		if (!isOwner)
		{

			var divInv;
			if (divs.length > 0)
			{
				divInv = divs[0];
			}
			else
			{
				divInv = document.createElement("div");
				divInv.classList.add("gamecards_inventorylink");
				var divBadge = document.querySelector(".badge_detail_tasks");
				if (divBadge != null)
				{
					divBadge.insertBefore(divInv, divBadge.firstChild);
				}
			}
			var aFrInvUrl = friendUrl + "/inventory/#753_6";
			var aOwnUrl = url.replace(pattAppHead, ownerUrl + "/gamecards/");
			divInv.innerHTML = divInv.innerHTML
				+ " <a class='btn_grey_grey btn_small_thin' href='" + aFrInvUrl + "'><span>View cards in "
				+ friendNameOwner + " Inventory</span></a> "
				+ " <a class='btn_grey_grey btn_small_thin' href='" + aOwnUrl + "'><span>View my Progress</span></a> ";

		}
	}
	function linkBadgeToForumTimeout(tm)
	{
		var url = document.documentURI;
		var patt = /^http[s]?:\/\/steamcommunity.com\/(id|profiles)\/[^\/]+\/gamecards\/[0-9]+/i;

		if (patt.test(url))
		{
			setTimeout(linkBadgeToForum, tm);
		}
	}
	if (enableLinkBadgeToForum) linkBadgeToForumTimeout(0);

	/** Add button in Market page to view Badge and Store page
	*/
	function linkMarketToBadge()
	{
		var url = document.documentURI;

		var pattAppHead = /^http[s]?:\/\/steamcommunity.com\/market\/listings\/753\//i;
		var pattAppTail = /[^0-9]+.*/i;
		var app = url.replace(pattAppHead, "").replace(pattAppTail, "");

		var aOwner = document.querySelector("div.user_avatar > div.playerAvatar > a");
		var isLoggedIn = aOwner != null;
		var ownerUrl = isLoggedIn ? aOwner.href : "http://steamcommunity.com/my";

		var div_tabL = document.querySelectorAll("div.market_large_tab_well");
		for (var i = 0; i < div_tabL.length; i++)
		{
			// reduce height of header
			div_tabL[i].style.height = "50px";
		}
		var div_tabLB = document.querySelectorAll("div.market_large_tab_well_gradient");
		for (var i = 0; i < div_tabLB.length; i++)
		{
			div_tabLB[i].style.height = "65px";
		}

		var div_store = document.getElementById("largeiteminfo_game_name");
		if (div_store != null)
		{
			div_store.innerHTML = "<a href='http://store.steampowered.com/app/" + app + "/'>"
				+ div_store.innerHTML + "</a>";
		}

		var isFoil = false;
		var ele_name = document.getElementById("largeiteminfo_item_name");
		if (ele_name != null)
		{
			isFoil = (ele_name.innerHTML.search("Foil") > -1);
			ele_name.innerHTML = "<a href='" + ownerUrl + "/gamecards/" + app
				+ (isFoil ? "/?border=1" : "/") + "'>" + ele_name.innerHTML + "</a>";
		}

		var ele_icon = document.getElementsByClassName("item_desc_game_icon");
		for (var i = 0; i < ele_icon.length; i++)
		{
			ele_icon[i].innerHTML = "<a href='http://store.steampowered.com/app/" + app + "/'>"
				+ ele_icon[i].innerHTML + "</a>";
		}

		var div_nav = document.getElementsByClassName("market_large_tab_well");
		for (var j = 0; j < div_nav.length; j++)
		{
			var aBadge = ' <div class="apphub_OtherSiteInfo" '
				+ 'style="position: relative; float: right; right: 2px; top: 2px;"> '
				+ '<a style="position: relative; z-index: 1;" class="btn_darkblue_white_innerfade btn_medium" '
				+ 'href="http://store.steampowered.com/app/' + app + '"><span>Store Page</span></a> &nbsp;'
				+ '<a class="btn_darkblue_white_innerfade btn_medium" '
				+ 'href="' + ownerUrl + '/gamecards/' + app + (isFoil ? "/?border=1" : "/")
				+ '"><span>Trading Cards</span></a></div>';
			div_nav[j].innerHTML = div_nav[j].innerHTML + aBadge;
		}
	}
	function linkMarketToBadgeTimeout(tm)
	{
		var url = document.documentURI;
		var patt = /^http:\/\/steamcommunity.com\/market\/listings\/753\/[0-9]+/i;

		if (patt.test(url))
		{
			setTimeout(linkMarketToBadge, tm);
		}
	}
	if (enableLinkMarketToBadge) linkMarketToBadgeTimeout(100);

	/** Add price of each cards in Badge page and link to Market page
	*/
	function linkBadgeToMarket()
	{
		var url = document.documentURI;

		var pattAppHead = /^http[s]?:\/\/steamcommunity.com\/(id|profiles)\/[^\/]+\/gamecards\//i;
		var pattAppTail = /[^0-9]+.*/i;
		var app = url.replace(pattAppHead, "").replace(pattAppTail, "");
		var isFoil = url.indexOf("border=1") > -1;
		var urlExternal = "http://www.steamcardexchange.net/index.php?gamepage-appid-" + app;
		var urlMarket = "http://steamcommunity.com/market/listings/753/";

		var cacheDiff = getCacheTimeDiff(app);
		var isCacheExpire = cacheDiff < 0 || cacheDiff > timeCacheExpireSec;

		debug("cacheTimeDiff: " + cacheDiff + "s");
		debug("isCacheExpire: " + isCacheExpire);

		updatePrice();

		if (isCacheExpire)
		{
			setTimeout(function ()
			{
				GM_xmlhttpRequest({
					method: "GET",
					url: urlExternal,
					onload: getExternalPrice,
				});
			}, 0);
		}

		function getExternalPrice(res)
		{
			try
			{
				var pattNumCard = /Card [0-9]+ of /i;
				var pattMarket = /^http:\/\/steamcommunity.com\/market\/listings\/753\//i;
				var pattPrice = /Price: /i;

				var aOwner = document.querySelector("div.user_avatar > div.playerAvatar > a");
				var isLoggedIn = aOwner != null;
				var ownerUrl = isLoggedIn ? aOwner.href : "http://steamcommunity.com/my";

				var aFriend = document.querySelector(".profile_small_header_name > a");
				var isFriendExist = aFriend != null;
				var friendUrl = isFriendExist ? aFriend.href : "http://steamcommunity.com/my";
				var friendName = isFriendExist ? aFriend.textContent.trim() : "my"
				var friendNameOwner = isFriendExist ? friendName + "'s" : friendName;

				var isOwner = isLoggedIn && ownerUrl == friendUrl;

				var divTempID = randTempID();
				createDivTemp(divTempID, res.responseText);
				try
				{
					//debug("ID: "+divTempID);
					var divTemp = document.getElementById(divTempID);
					var numCard = 0;
					try
					{
						var spanNumber = divTemp.getElementsByClassName("card-number")[0];
						if (spanNumber == null)
						{
							debug("Error: can't get price");
							return;
						}
						numCard = parseInt(spanNumber.textContent.replace(pattNumCard, ""));
					}
					catch (e)
					{
						debug("Ex: " + e);
					}

					var offsetCard = isFoil ? numCard : 0;
					var curCard = 0;

					var priceCards = new Array();
					var priceUrls = new Array();

					var as = divTemp.getElementsByClassName("button-blue");
					for (var i = 0; i < as.length; i++)
					{
						if (pattMarket.test(as[i].href))
						{
							if (curCard < numCard * 2)
							{
								var cPrice = as[i].textContent.replace(pattPrice, "").trim();
								var cUrl = as[i].href.replace(urlMarket, "");

								var indexCard = curCard - offsetCard;
								if (indexCard >= 0 && indexCard < numCard)
								{
									priceCards[indexCard] = cPrice;
									priceUrls[indexCard] = cUrl;
								}

								// cache
								if (enableCache)
								{
									setCacheTime(app);
									if (curCard < numCard)
									{
										setCachePrice(app, false, curCard, cPrice);
										setCacheUrl(app, false, curCard, cUrl);
									}
									else // foil
									{
										setCachePrice(app, true, curCard - numCard, cPrice);
										setCacheUrl(app, true, curCard - numCard, cUrl);
									}
								}

								curCard += 1;
							}
							else
							{
								break;
							}
						}
					}
				}
				catch (e)
				{
					debug("Ex: " + e);
				}
				removeDivTemp(divTempID);

				updatePrice();

				debugTime("getExternalPrice");
			}
			catch (e)
			{
				debug("Ex: " + e);
			}
		}

		function updatePrice()
		{
			var pattNum = /[0-9\.]+/;
			
			var priceCards = new Array();
			var priceUrls = new Array();

			for (var i = 0; i < 15; i++)
			{
				var p = getCachePrice(app, isFoil, i);
				var u = getCacheUrl(app, isFoil, i);
				if (p != 0 && u != 0)
				{
					priceCards[i] = p;
					priceUrls[i] = u;
				}
				else
				{
					break;
				}
			}

			var texts = document.getElementsByClassName("badge_card_set_card");
			var numCard = texts.length;

			for (var j = 0; j < texts.length; j++)
			{
				var pUrl = priceUrls[j] ? urlMarket + priceUrls[j] : "";
				var pCard = priceCards[j] ? priceCards[j] : "-";
				var pOnClick = priceCards[j] ? "" : " onclick='return false;' ";
				var pDiff = "";
				var pCardOld = "";
				
				var divTexts = texts[j].querySelectorAll("div.badge_card_set_text");
				var divText = divTexts[divTexts.length - 1];
				var divMarkets = texts[j].getElementsByClassName("div_market_price");
				var divMarket;
				if (divMarkets.length == 0)
				{
					divMarket = document.createElement("div");
					divMarket.classList.add("div_market_price");
					divMarket.style.cssFloat = "right";
					divText.appendChild(divMarket);
				}
				else
				{
					divMarket = divMarkets[0];
					var as = divMarket.getElementsByTagName("a");
					if (as.length > 0)
					{
						var pOld = as[0].textContent;
						var pValOld = pOld.match(pattNum);
						if (pValOld != null)
						{
							//debug("oldPrice[" + j + "]: "+ pValOld);
							
							pCardOld = "title='Cache Price: " + pOld + "'";
														
							var pVal = pCard.match(pattNum);
							pVal = pVal ? pVal : 0;
							
							var pValDiff = (parseFloat(pVal) - parseFloat(pValOld)).toFixed(2);
							if(pValDiff > 0)
							{
								pDiff = "<span style='cursor: help; color: red;' " + pCardOld + ">+" + pValDiff + "</span>";
							}
							else if (pValDiff < 0)
							{
								pDiff = "<span style='cursor: help; color: green;' " + pCardOld + ">" + pValDiff + "</span>";
							}
							else
							{
								pCardOld = "";
							}
						}
					}
				}

				divMarket.innerHTML = pDiff + " <a href='" + pUrl + "' " + pOnClick + " title='Lowest Price'>" + pCard + "</a>";
			} // end for
		}
	}
	function linkBadgeToMarketTimeout(tm)
	{
		var url = document.documentURI;
		var patt = /^http[s]?:\/\/steamcommunity.com\/(id|profiles)\/[^\/]+\/gamecards\/[0-9]+/i;

		if (patt.test(url))
		{
			setTimeout(linkBadgeToMarket, tm);
		}
	}
	if (enableLinkBadgeToMarket) linkBadgeToMarketTimeout(0);

	/** Compare my cards and friend's cards in Badge page
	*   Mark color of my cards count (Green) and friend's cards count (Blue)
	*/
	function compareBadge()
	{
		var url = document.documentURI;

		var pattAppHead = /^http[s]?:\/\/steamcommunity.com\/(id|profiles)\/[^\/]+\/gamecards\//i;
		var pattAppTail = /[^0-9]+.*/i;
		var app = url.replace(pattAppHead, "").replace(pattAppTail, "");

		{
			try
			{
				var pattNumCard = /Card [0-9]+ of /i;
				var pattMarket = /^http:\/\/steamcommunity.com\/market\/listings\/753\//i;
				var pattPrice = /Price: /i;

				var isFoil = url.indexOf("border=1") > -1;

				var aOwner = document.querySelector("div.user_avatar > div.playerAvatar > a");
				var isLoggedIn = aOwner != null;
				var ownerUrl = isLoggedIn ? aOwner.href : "http://steamcommunity.com/my";

				var aFriend = document.querySelector(".profile_small_header_name > a");
				var isFriendExist = aFriend != null;
				var friendUrl = isFriendExist ? aFriend.href : "http://steamcommunity.com/my";
				var friendName = isFriendExist ? aFriend.textContent.trim() : "my"
				var friendNameOwner = isFriendExist ? friendName + "'s" : friendName;

				var isOwner = isLoggedIn && ownerUrl == friendUrl;

				//debug("ownerUrl: "+ownerUrl);
				//debug("friendUrl: "+friendUrl);

				var texts = document.getElementsByClassName("badge_card_set_card");
				var numCard = texts.length;

				//debug("isOwner: "+isOwner);
				//debug("numCard: "+numCard);

				for (var j = 0; j < texts.length; j++)
				{
					var divQty = texts[j].querySelector("div.badge_card_set_text_qty");
					var numQty = "(0)";
					if (divQty != null)
					{
						numQty = divQty.textContent.trim();
					}
					else
					{
						divQty = document.createElement("div");
						divQty.classList.add("badge_card_set_text_qty");
						divQty.innerHTML = numQty;

						var divCtn = texts[j].querySelector("div.game_card_ctn");
						if (divCtn != null)
						{
							var divTexts = texts[j].querySelectorAll("div.badge_card_set_text");
							if (divTexts.length < 2)
							{
								texts[j].insertBefore(divQty, divCtn.nextSibling);
							}
							else
							{
								divTexts[0].insertBefore(divQty, divTexts[0].firstChild);
							}
						}
					}
					//debug("numQty: "+numQty);
				} // end for

				var colorOwner = "#8cbe0f";//"#9CCF55";//"#99E600";//"#5C9E4C";
				var colorFriend = "#5491CF";

				var divQtys = document.querySelectorAll("div.badge_card_set_text_qty");
				for (var k = 0; k < divQtys.length; k++)
				{
					var num = divQtys[k].textContent.trim().replace(/[\(\)]/gi, "");
					divQtys[k].innerHTML = "";

					var spanNum = document.createElement("span");
					spanNum.classList.add("span_card_qty");
					spanNum.style.cursor = "help";
					spanNum.innerHTML = " (" + num + ") ";
					divQtys[k].insertBefore(spanNum, null);

					if (isOwner)
					{
						spanNum.classList.add("span_card_qty_owner");
						spanNum.style.color = colorOwner;
						spanNum.title = "My cards: " + num;
					}
					else
					{
						spanNum.classList.add("span_card_qty_friend");
						spanNum.style.color = colorFriend;
						spanNum.title = friendNameOwner + " cards: " + num;
					}
				}

				if (!isOwner)
				{
					var pattProfile = /^http[s]?:\/\/steamcommunity.com\/(id|profiles)\/[^\/]*/i;
					var urlExternal = url.replace(pattProfile, ownerUrl);
					//debug("urlExternal: "+urlExternal);

					setTimeout(function ()
					{
						GM_xmlhttpRequest({
							method: "GET",
							url: urlExternal,
							onload: compareCard,
						});
					}, 0);

					function compareCard(res)
					{
						var divTempID = randTempID();
						createDivTemp(divTempID, res.responseText);
						try
						{
							//debug("ID: "+divTempID);
							var divTemp = document.getElementById(divTempID);

							var owner_texts = divTemp.getElementsByClassName("badge_card_set_card");
							var owner_numCard = owner_texts.length;

							if (numCard == owner_numCard)
							{
								var owner_numQtys = new Array();

								for (var i = 0; i < owner_texts.length; i++)
								{
									var owner_divQty = owner_texts[i].querySelector("div.badge_card_set_text_qty");
									if (owner_divQty != null)
									{
										owner_numQtys[i] = owner_divQty.textContent.trim().replace(/[\(\)]/gi, "");
									}
									else
									{
										owner_numQtys[i] = "0";
									}
									//debug("owner_numQtys[i]: "+owner_numQtys[i]);
								} // end for

								var friend_divQtys = document.querySelectorAll("div.badge_card_set_text_qty");
								for (var k = 0; k < friend_divQtys.length; k++)
								{
									var owner_spanNum = friend_divQtys[k].querySelector("span_card_qty_owner");
									if (owner_spanNum == null)
									{
										owner_spanNum = document.createElement("span");
										owner_spanNum.classList.add("span_card_qty");
										owner_spanNum.style.cursor = "help";
										owner_spanNum.classList.add("span_card_qty_owner");
										owner_spanNum.style.color = colorOwner;
										owner_spanNum.title = "My cards: " + owner_numQtys[k];
										friend_divQtys[k].insertBefore(owner_spanNum, friend_divQtys[k].firstChild);
									}
									owner_spanNum.innerHTML = " (" + owner_numQtys[k] + ") ";
								}
							}
						}
						catch (e)
						{
							debug("Ex: " + e);
						}
						removeDivTemp(divTempID);
						debugTime("compareBadge");
					}
				}
			}
			catch (e)
			{
				debug("Ex: " + e);
			}
		}
	}
	function compareBadgeTimeout(tm)
	{
		var url = document.documentURI;
		var patt = /^http[s]?:\/\/steamcommunity.com\/(id|profiles)\/[^\/]+\/gamecards\/[0-9]+/i;

		if (patt.test(url))
		{
			setTimeout(compareBadge, tm);
		}
	}
	if (enableCompareBadge) compareBadgeTimeout(0);

	// ===== End Main 

	// ===== Cache =====

	var tmpl_time = "badge_{APP}_time";
	var tmpl_price = "badge_{APP}_{SET}_{NUM}_price";
	var tmpl_url = "badge_{APP}_{SET}_{NUM}_url";
	var tmpl_owned = "badge_{APP}_{SET}_{NUM}_owned";

	function clearCache()
	{
		var keep = ["counter"];
		var cache = GM_listValues()
		debug("clearCache: " + cache.length);
		for (var i = 0; i < cache.length; i++)
		{
			if (keep.indexOf(cache[i]) < 0)
			{
				GM_deleteValue(cache[i]);
			}
		}
	}
	if (enableAlwaysClearCache) clearCache();

	function debugCache()
	{
		var cache = GM_listValues()
		if (false)
		{
			debug("debugCache: ");
			for (var i = 0; i < cache.length; i++)
			{
				debug("-> " + cache[i] + ": " + GM_getValue(cache[i], 0));
			}
		}
		debug("debugCache: " + cache.length);
	}
	debugCache();

	function generateCacheName(tmpl, app, isFoil, number)
	{
		var name = tmpl.replace("{APP}", app);
		if (isFoil != null)
		{
			var set = isFoil ? "F1" : "N1";
			name = name.replace("{SET}", set);
		}
		if (number != null)
		{
			name = name.replace("{NUM}", number);
		}
		return name;
	}
	function generateCacheNameTime(app)
	{
		return generateCacheName(tmpl_time, app);
	}
	function generateCacheNamePrice(app, isFoil, number)
	{
		return generateCacheName(tmpl_price, app, isFoil, number);
	}
	function generateCacheNameUrl(app, isFoil, number)
	{
		return generateCacheName(tmpl_url, app, isFoil, number);
	}
	function generateCacheNameOwned(app, isFoil, number)
	{
		return generateCacheName(tmpl_owned, app, isFoil, number);
	}

	function getCacheTime(app)
	{
		var name = generateCacheNameTime(app);
		return GM_getValue(name, 0);
	}
	function getCacheTimeDiff(app)
	{
		return parseInt((new Date()) / 1000 - getCacheTime(app));
	}
	function setCacheTime(app)
	{
		var name = generateCacheNameTime(app);
		GM_setValue(name, parseInt((new Date()) / 1000));
	}

	function getCachePrice(app, isFoil, number)
	{
		var name = generateCacheNamePrice(app, isFoil, number);
		return GM_getValue(name, 0);
	}
	function setCachePrice(app, isFoil, number, data)
	{
		var name = generateCacheNamePrice(app, isFoil, number);
		GM_setValue(name, data);
	}

	function getCacheUrl(app, isFoil, number)
	{
		var name = generateCacheNameUrl(app, isFoil, number);
		return GM_getValue(name, 0);
	}
	function setCacheUrl(app, isFoil, number, data)
	{
		var name = generateCacheNameUrl(app, isFoil, number);
		GM_setValue(name, data);
	}

	function getCacheOwned(app, isFoil, number)
	{
		var name = generateCacheNameOwned(app, isFoil, number);
		return GM_getValue(name, 0);
	}
	function setCacheOwned(app, isFoil, number, data)
	{
		var name = generateCacheNameOwned(app, isFoil, number);
		GM_setValue(name, data);
	}

	// ===== End Cache =====

})();