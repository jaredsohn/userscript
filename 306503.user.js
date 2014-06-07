// ==UserScript==
// @name        MyFreeFarm Bulgarian
// @namespace   http://userscripts.org/scripts/show/306503
// @description Language pack "Bulgarian" for MyFreeFarm Scripts
// @date        07.04.2014
// @version     1.0.6
// @include     /^http:\/\/(|www\.|s\d+\.)veselaferma.com\/.*$/
// @grant       GM_log
// ==/UserScript==

// Edit above the @include. This controls on which pages the script is called.
window.addEventListener("load",function(){
try{
	// Do not edit
	var texte=new Object();
	const PRODSTOP=-1;
	const GFX = "http://mff.wavecdn.de/mff/"; // The path to the in-game images
	const cyr_a = "\u0430";
	const cyr_be = "\u0431";
	const cyr_che = "\u0447";
	const cyr_De = "\u0414";
	const cyr_de = "\u0434";
	const cyr_el = "\u043B";
	const cyr_em = "\u043C";
	const cyr_en = "\u043D";
	const cyr_Er = "\u0420";
	const cyr_er = "\u0440";
	const cyr_Es = "\u0421";
	const cyr_es = "\u0441";
	const cyr_ghe = "\u0433";
	const cyr_hardsign = "\u044A";
	const cyr_Ka = "\u041A";
	const cyr_ka = "\u043A";
	const cyr_i = "\u0438";
	const cyr_ie = "\u0435";
	const cyr_io = "\u0451";
	const cyr_i_short = "\u0439";
	const cyr_o = "\u043E";
	const cyr_Pe = "\u041F";
	const cyr_pe = "\u043F";
	const cyr_sha = "\u0448";
	const cyr_shcha = "\u0449";
	const cyr_softsign = "\u044C";
	const cyr_Te = "\u0422";
	const cyr_te = "\u0442";
	const cyr_U = "\u0423";
	const cyr_u = "\u0443";
	const cyr_ve = "\u0432";
	const cyr_ya = "\u044F";
	const cyr_yeru = "\u044B";
	const cyr_yu = "\u044E";
	const cyr_ze = "\u0437";
	// Important constants
	const COUNTRY="BG"; // The country ISO-code (2 digits)
	const LANGUAGE="bg"; // The language ISO-code (2 digits)	
	const delimThou="."; // The separator for thousands (e.g. in 1,000).
	const regDelimThou="\\."; // = delimThou. "." has to be masked to "\\."!
	const regDelimThouShift="([\\d\\.])(\\d)\\.(\\d{1,2}\\D)"; // = "([\\d"+delimThou+"])(\\d)"+delimThou+"(\\d{1,2}\\D)"
	const regDelimThouDelete="(\\d)\\.(\\.*)(\\d{1,2}\\D)"; // = "(\\d)"+delimThou+"("+delimThou+"*)(\\d{1,2}\\D)"
	const delimDeci=","; // The separator for decimals (e.g. in 1.99).
	const regDelimDeci=","; // = delimDeci. "." has to be masked to "\\."!
	const dateFormatDM = "day.month."; // The style a short date is displayed. You can use the tags "day" and "month".
	const dateFormatDMY = "day.month.year"; // The style a date is displayed. You can use the tags "day", "month" and "year".
	const timeFormatHM = "hour:min"; // The style a time is displayed. You can use the tags "hour" and "min".
	const timeFormatHMS = "hour:min:sec"; // The style a precise time is displayed. You can use the tags "hour", "min" and "sec".
	// For the following you have to take a message sent if you sell something on the market place
	texte["msgMarketsaleContent"]="(.*) "+cyr_ze+cyr_a+cyr_ka+cyr_u+cyr_pe+cyr_i+"\\s*(\\d+)x (.*?) "+cyr_ze+cyr_a+"<br>\\s*(.*?) "+cyr_ka+cyr_De+" "+cyr_o+cyr_te+" "+cyr_te+cyr_ie+cyr_be+"\\."; // The text where the information is stated. The information has to be replaced by "(.*?)".
	// For the following you have to take a message sent if you sell something via contract
	texte["msgContractsaleContent"]="(.*) "+cyr_ie+" "+cyr_pe+cyr_o+cyr_de+cyr_pe+cyr_i+cyr_es+cyr_a+cyr_el+" "+cyr_ve+cyr_a+cyr_sha+" "+cyr_de+cyr_o+cyr_ghe+cyr_o+cyr_ve+cyr_o+cyr_er+"!<br><br>\\s*"+cyr_Es+cyr_el+cyr_ie+cyr_de+cyr_en+cyr_i+cyr_te+cyr_ie+" "+cyr_pe+cyr_er+cyr_o+cyr_de+cyr_u+cyr_ka+cyr_te+cyr_i+" "+cyr_es+cyr_a+" "+cyr_be+cyr_i+cyr_el+cyr_i+" "+cyr_pe+cyr_er+cyr_o+cyr_de+cyr_a+cyr_de+cyr_ie+cyr_en+cyr_i+":<br>([\\S\\s]*)\\s*<br>\\s*"+cyr_Es+cyr_u+cyr_em+cyr_a+cyr_te+cyr_a+" "+cyr_o+cyr_te+" (.*?) "+cyr_ka+cyr_De+" "+cyr_ie+" "+cyr_pe+cyr_er+cyr_ie+cyr_ve+cyr_ie+cyr_de+cyr_ie+cyr_en+cyr_a+" "+cyr_ve+cyr_hardsign+cyr_ve+" "+cyr_ve+cyr_a+cyr_sha+cyr_i+cyr_ya+cyr_te+" "+cyr_a+cyr_ka+cyr_a+cyr_u+cyr_en+cyr_te+"\\."; // The text where the general information is stated. The information has to be replaced by "(.*?)".
	texte["msgContractsaleList"]="\\s*(\\d+)x (.*?)<br>"; // The line-pattern for the detailed selling list
	// For the following you have to take a message sent if somebody wants to add you as friend
	texte["msgFriend"]="(.+) wants to add you as friend"; // The subject. The person has to be replaced by "(.+)"
		
	// And all the other texts you can enter what you want ...
        texte["above"]="above";
	texte["absolute"]="absolute";
	texte["accountActive"]="Account active";
	texte["accounts"]="Accounts";
	texte["activation"]="Activation";
	texte["additionalFarmi"]="%1% additional farmie daily";
	texte["additionalForestFarmiSlot"]="%1% additional place in the forest farmi waiting queue";
	texte["additionalLogCapacity"]="Rack capacity for logs increases of %1%";
	texte["advertisingEnds"]="Advertising ends today";
	texte["adviser"]="Adviser";
	texte["afterFee"]="After Fee";
	texte["alertSetPriceNone"]="Do you really want to set no price for %PRODUCT%?";
	texte["alertSetPriceOverNPC"]="Do you really want to set the price of %PRICE% for %PRODUCT%?<br>It is higher than the NPC-value of %NPC%.";
	texte["alertSetPriceOverObs"]="Do you really want to set the price of %PRICE% for %PRODUCT%?<br>It is much higher than the observed value of %OBS%.";
	texte["alertSetPriceUnderObs"]="Do you really want to set the price of %PRICE% for %PRODUCT%?<br>It is much lower than the observed value of %OBS%.";
	texte["alertWillLowRack"]="Attention! This will drop your stock below the minimal value!";
	texte["all"]="All";
	texte["autologinAllOk"]="All accounts logged in.";
	texte["autologinChecking"]="Checking active sessions.  Please wait %1% seconds<br>...";
	texte["boughtTickets"]="Bought tickets";
	texte["buy"]="Buy";
	texte["buyers"]="Buyers";
	texte["calcTo"]="Calculate to";
	texte["carpentry"]="Carpentry";
	texte["city"]="City";
        texte["clearFilter"]="Clear filter";
	texte["click"]="Click";
	texte["clickAlt"]="Alt+Click";
	texte["clickCtrl"]="Ctrl+Click";
	texte["clickDouble"]="Double-Click";
	texte["clickToChange"]="Click to change";
	texte["coins"]=unsafeWindow.t_coins;
	texte["commission"]	= "Commission";
	texte["confirmUseObservedPrices"]="The observed prices will overwrite previously saved market prices ...";
	texte["contract"]="Contract";
	texte["contractsReceived"]="Contracts received";
	texte["contractsSent"]="Contracts sent";
	texte["couldNotGetRank"]="Your rank could not be determined.";
	texte["couldNotGetUpdateInfoOfX"]="Update information for %1% could not be determined."
	texte["cropped"]="Cropped";
	texte["currentOffers"]="Current offers";
	texte["dailyRuns"]="Daily runs";
	texte["dailyTicket"]="Daily ticket";
	texte["dailyYield"]="Daily yield";
	texte["day"]="Day";
	texte["day0"]="Today";
	texte["day1"]="Tomorrow";
	// texte["day2"]="Day after tomorrow"; // comment it if not used in the language
	texte["default"]="Default";
	texte["delete"]="Delete";
	texte["demand"]="Demand";
        texte["detail"]="Detail";
	texte["duration"]="duration";
	texte["editPrice"]="Edit price";
	texte["emptyField"]="Empty field!";
	texte["exchangedLots"]="Exchanged lots";
	texte["farm"]="Farm";
	texte["farmX"]="%1%. farm";
	texte["farmi"]="Farmie";
	texte["farmis"]="Farmies";	
	texte["farmpedia"]="FarmPedia";
	texte["farmpediaUrl"]="http://farmpedia.myfreefarm.de/";
	texte["farmzone"]="Building place %1% of %2%. farm";
	texte["feed"]="Feed";
	texte["filter"]="Filter";
	texte["filterForX"]="Filter for %1%";
	texte["finished"]="Finished";
	texte["foodworld"]="Picnic area"; // Harry	
	texte["forest"]="Forest";
	texte["forestry"]="Forestry";
	texte["formatNumbers"]="Format numbers";
	texte["formulaType"]=["Prod","+val","+pts"];
	texte["fw1"]="Soda stall";
	texte["fw2"]="Snack booth";
	texte["fw3"]="Pastry shop";
	texte["gain"]="Gain";
	texte["gamecurrency"]=unsafeWindow.gamecurrency;
	texte["general"]="General";
	texte["given"]="Given";
	texte["goToLottery"]="Go to lottery";
	texte["goToMarket"]="Go to market";
	texte["goToMarketOfX"]="Go to market of %1%";
	texte["goToMarketstall"]="Go to market stall";
	texte["goToPage"]="Go to page";
	texte["goToRank"]="Go to rank";
	texte["goToZoneX"]="Go to zone %1%";
	texte["goods"]="Goods";
	texte["hide"]="hide";
	texte["highlightProducts"]="Highlight products at market";
	texte["highlightUser"]="Highlight user at market";
	texte["hotkeys"]="Hotkeys";
	texte["idle"]="idle !!";
	texte["inStock"]="in stock";
	texte["informationIsMissing"]="Information is missing."
	texte["ingredients"]="Ingredients";
	texte["invalidServer"]="Invalid Server";
	texte["inventory"]="Inventory";
	texte["keptLots"]="Kept lots";
	texte["level"]="Level";
	texte["levelTooLow"]="Your level is too low";
	texte["levelXneeded"]="Level&nbsp;%1%&nbsp;needed";
	texte["load"]="Load";
	texte["loading"]="Loading";
	texte["localTime"]="Local time";
	texte["lodge"]="Log cabin";	
	texte["login"]="Login";
	texte["lotteryLog"]="Lottery Log";
	texte["lvl"]="Lvl";
	texte["manageVariables"]="Manage variables";	
	texte["market"]="Market";
	texte["marketPrice"]="Market&nbsp;Price";
	texte["marketplace"]="Market place";
	texte["marketstall"]="Market stall";
	texte["messages"]="Messages";
	texte["minRack"]="Min&nbsp;rack";
	texte["minRackamount"]="Minimal rackamount";
	texte["missing"]="Need";
	texte["money"]="Offered";
	texte["msgUpdate"]="There is a new script version of the Adviser. Install?";
	texte["msgUpdateX"]="A new script version of %1% is available. Do you want to install it?";
	texte["name"]="Name";
	texte["newLevelReached"]="Congratulations!<br>You have reached the next level!";
	texte["nextMessage"]="next message";
	texte["no"]="No";
	texte["NPC"]="NPC";
	texte["NPCprice"]="NPC-Price";
	texte["nr"]="Nr";
	texte["observed"]="Observed";
	texte["ok"]="OK";
	texte["oldOnes"]="Old";
	texte["options"]="Options";
	texte["overNPCprice"]="over NPC-price";
	texte["overX"]="over %1%";
	texte["overview"]="overview";
	texte["password"]="Password";
	texte["pleaseOpenX"]="Please open %1%.";
	texte["points"]="Points";
	texte["powerups"]="Power-Ups";
	texte["previousMessage"]="previous message";
	texte["price"]="Price";
	texte["prices"]="Prices";
	texte["product"]="Product";
	texte["productOverview"]="Product overview";
	texte["productTimeSaving"]="%1% minutes saving for %2%";
	texte["production"]="Production";
	texte["products"]="Products";
	texte["profit"]="Profit";
	texte["profitTable"]="Profit per Zone per Day";
	texte["quantity"]="Quantity";
	texte["quest_foodworld"]="Picnic area quest series";
	texte["quest_forestry"]="Series of quests (forestry)";
	texte["quest_main"]="Series of quests (farm)";
	texte["questfoodworld1"]="Picnic area quest series";
	texte["questforestry1"]="1st series of quests (forestry)";
	texte["questforestry2"]="2nd series of quests (forestry)";
	texte["questmain1"]="1st series of quests (farm)";
	texte["questmain2"]="2nd series of quests (farm)";
	texte["quests"]="Quests";
	texte["rackX"]="%1%. rack";
	texte["rank"]="Rank";
	texte["readAll"]="Read all";
	texte["readyAtX"]="Ready at %1%"; // %1%=2:15+texte["shortOClock"]
	texte["readyAtX_day1"]="Tomorrow ready at %1%"; 
	// texte["readyAtX_day2"]="Ready in 2days at %1%"; // comment it if not used in the language
	texte["readySinceX"]="Ready since %1%"; 
	texte["recipes"]="Recipes";
	texte["recursive"]="Recursive Needed";
	texte["relative"]="relative";
	texte["relogin"]="Session ends soon.<br>New login in %1%.";
	texte["requestingUpdateInfoOfX"]="Requesting update information for %1% ..."
	texte["requestingUserStatistic"]="Requesting user statistic ...";
	texte["requirement"]="Need";
	texte["requirementPerProduction"]="Requirement per production";	
	texte["reward"]="Reward";
        texte["salesLog"]="Sales log";
	texte["save"]="Save";
	texte["saveAsTemplate"]="Save as template";
	texte["sawmill"]="Sawmill";
	texte["scriptHomepage"]="Script Homepage";
	texte["searchPlayer"]="Search player";
	texte["sendContract"]="Send contract";
	texte["sendContractAgain"]="Send contract again";
	texte["sentContractNrX"]="Sent contract no %1%."
	texte["sendingXObservedPricesToServer"]="Sending %1% observed prices to server ...";
	texte["server"]="Server";
	texte["serverTime"]="Time of server";
	texte["sessionEnd"]="End of Session at %1%<br>Click for new login";	
	texte["SGH"]="SGH"; // Short for the seller of plants
	texte["shortHours"]="h";
	texte["shortOClock"]="h";
	texte["shouldReload"]="You should reload the page.";
	texte["showAll"]="Show all";
	texte["showLog"]="Show log";
	texte["showMissingProducts"]="Show product shortage";
	texte["showPasswords"]="show passwords";
	texte["sinceX"]="since %1%";
	texte["single"]="Single";
	texte["start"]="Start";
	texte["stat_days1"]="1 day";
	texte["stat_days3"]="3 days";
	texte["stat_days5"]="5 days";
	texte["stat_days7"]="7 days";
	texte["stat_gamefield"]="Show game";
	texte["stat_stats"]="Show statistics";
	texte["statistics"]="Statistics";
	texte["stock"]="Stock";
	texte["stockValue"]="Stock value";
	texte["stockXlow"]="Stock %1% low";
	texte["stockXmissing"]="Stock %1% missing!!!";
	texte["storeXinContract"]="Store %1% in contract";
	texte["summarize"]="Summarize";
	texte["takeObservedPrices"]="Take observed prices";
	texte["time"]="Time";
	texte["title"]="Title";
	texte["toMessage"]="to message";
	texte["toSGH"]="Go to shop";
	texte["total"]="Total";
	texte["turnover"]="Turnover";
	texte["unitPrice"]="Unit price";
	texte["updateOfXAvailable"]="A new script version of %1% is available. You refused to install it."
	texte["upgradeForX"]="upgrade&nbsp;for&nbsp;%1%";
	texte["upgradeLevel"]="Upgrade level";
	texte["upjersAdvertising"]="Upjers-Advertising";
	texte["useQuestProducts"]= "Use current quest products";
        texte["useWildcard"]= "Use * to match one or more letters.";
	texte["value"]="Value";
	texte["waterBonus"]="%1%% water bonus";
	texte["waterNeeded"]="Water needed";
	texte["waterNeededAtX"]="Water needed at %1%"; 
	texte["waterNeededAtX_day1"]="Tomorrow water needed at %1%";
	texte["wateringFeature"]="Watering feature";
	texte["windmill"]="Windmill";
	texte["writeMessage"]="write message";
	texte["XIsUpToDate"]="%1% is up-to-date."
	texte["yes"]="Yes";
	texte["yield"]="Yield";
	texte["yieldPerProduction"]="Yield per production";
	texte["youAreOnRankX"]="You are on rank %1%.";
	// category
	texte["category_c"]=texte["coins"];
	texte["category_v"]="Plants";
	texte["category_e"]="Advanced products";
	texte["category_z"]=unsafeWindow.rack_deco;
	texte["category_o"]=unsafeWindow.rack_oil;
        texte["category_f1"]="Saplings";
	texte["category_f2"]="Logs";
	texte["category_f3"]="Sawmill products";
	texte["category_f4"]="Carpentry products";
	texte["category_f5"]="Wooden farmhouse items";
	texte["category_fw"]=unsafeWindow.rack_foodworld;
	texte["category_fw1"]="Drinks";
	texte["category_fw2"]="Food";
	texte["category_fw3"]="Cakes";
	texte["category_fw4"]="not yet available";
        texte["category_r0"]="Recipes product";
        texte["category_r1"]="Recipes increade yield";
        texte["category_r2"]="Recipes increade points";
        texte["category_p0"]="Power-Ups Produkt";
        texte["category_p1"]="Power-Ups increade yield";
        texte["category_p2"]="Power-Ups increade points";
	// settings
	texte["settings_valAutoWater"]=["Automatic watering","Plants will be watered after planting, if you have 'Water everything' (Premium)."];
	texte["settings_valAssumeWater"]=["Assume watering","This is important for plants growing more than 24h. The calculation of the cropping time assumes watering when needed."];
	texte["settings_valAutoCrop"]=["Automatic harvesting","After opening your field, crops will be harvested if necessary."];
	texte["settings_valWaterNeeded"]=["Watering needed","Shall the necessity of watering be displayed?"];
	texte["settings_valCropMsg"]=["Close harvest dialog","Don't like the annoying harvest notification with the pig?  Get rid of it here."];
	texte["settings_valLimitEmptyFields"]=["Empty areas","If the number of unplanted areas in your field exceeds this number, the field will be shown as empty."];
	texte["settings_valLimitEmptyFields_forest"]=["Empty forest areas","If the number of unplanted areas in your field exceeds this number, the field will be shown as empty."];
	texte["settings_valMoveAnimals"]=["Move animals",""];
	texte["settings_valContractLogAmount"]=["Number contracts kept","Your last sent and received contracts are kept so that a history of them can be shown."];
	texte["settings_valFarmiLimits"]=["Farmie Limits","The farmies are marked in 3 cases depending on their payment-rate."];
	texte["settings_valFarmiMiniInfo"]=["Farmie Mini Info","Displays a small circle below each farmie showing its case of payment-rate."];
	texte["settings_valMinRackMan"]=["Detail configuration","You edit the amount on your own *here*"];
	texte["settings_valMinRack"]=[,"A product is marked if its amount in your rack is falling below this value. You can enter different values depending on the category."];
	texte["settings_valMinRackPlantsize"]=["Aspect size of plant","For example grain needs only half of the value above."];
	texte["settings_valMinRackGrowing"]=["Growing products","Adds the amount of products that are in production and ready by powerup."];
	texte["settings_valMinRackQuest"]=["Quest products","Adds the amount of the quest products"];
	texte["settings_valMinRackRecursive"]=["Recursive products","Add the required products needed to make missing products, and calculate these again for the required proucts.(used by forestry products)"];
	texte["settings_valMinRackFarmis"]=["Farmie products","Adds the amount of the products wanted by the farmies which pay more than the lower limit."];
	texte["settings_valMinRackForestryFarmis"]=["Lodge farmie products","Adds the amount of the products wanted by the lodge farmies."];
	texte["settings_protectMinRack"]=["Selling protection","Prohibits to sell products at market below the minimal rackamount"];
	texte["settings_valBuyingLimitDown"]=["Bottom buy highlight",""];
	texte["settings_valBuyingLimit"]=["Top buy limit","You can only buy products at the Market up to the limit given.  This protects you from accidentally purchasing very over-priced goods."];
	texte["settings_valBuyingLimitNPC"]=["Only allow buy less than price of NPC",""];
	texte["settings_valSellingLimit"]=["Sell limits","Your sales are also protected, so that you don't price your own goods too cheaply or too highly."];
	texte["settings_valJoinPrices"]=["One input","Joins the price input fields at the market stand."];
	texte["settings_valQuicklinks"]=["Show market quicklinks","Show Quicklinks at Market place"];
	texte["settings_valUseObservedPrices"]=["Use observed prices","Prices are observed while clicking through the market place. A calculated price can be seen in the price list. Shall this automatically override your settings?"];
	texte["settings_valSendStatistics"]=["Send statistics","Support the <a href='http://mff.metrax.eu/' target='_blank'>Statistik-Server</a>.  No private data is sent!"];
	texte["settings_valPrivateMessages"]=["Number private messages kept","Your last private messages are kept so that a message history of one contact can be shown."];
	texte["settings_valMarketMessages"]=["Number market messages kept","Old messages remain in this archive, even if they are older than the maximum 7 days."];
	texte["settings_valMessageRe"]=["Short subject","Replaces \"Re:Re:\" to \"Re:\" in the subject when you reply to a message."];
	texte["settings_valMessagesSystemMarkRead"]=["Read system messages","System messages are marked read automatically."];
        texte["settings_valFoodworldFarmiPlacing"]=["Locate picnic area farmis","Accepted picnic area farmis are located automatically to a vacant seat."]; 
        texte["settings_valAutoLogin"]=["Automatic login","Once username and password information is given, all accounts will be logged in, so that they can be fed, harvested, watered, and planted. Popups must be allowed with multiple accounts."];
	texte["settings_valUpdate"]=["Update","Checks whether an updated version of this Advisor script is available."];
	texte["settings_valServerTimeOffset"]=["Time of server",""];
	texte["settings_valGamecursor"]=["Game cursor","Use the game cursors instead of your system cursors."];
	texte["settings_valDrag"]=["Dragging","Allow moving windows by clicking the upper left corner."];
	texte["settings_valClickErrorbox"]=["Hide errorbox","Some users have problems with the error box. Keep in mind that this alert is normally useful!"];
	texte["settings_valHotkeys"]=["Hotkeys","Use hotkeys to quicker navigate the game. See the help."];
	texte["settings_hotkeymap"]={"prevPage":"previous Message, Zone, ...","nextPage":"next Message, Zone, ...","farm1":"1st farm","farm2":"2nd farm","farm3":"3rd farm","guild":"Club","city1":"First Village","city2":"Second Village","farmilog":"Farmi-Log","help":"Help","market":"Market place","marketstand":"Market stand","messages":"Messages","options":"Options","profit":"Profit Calculation","sgh":"Seed retailer","overview":"Overview","contract":"Contracts","systemmessage":"(next unread) system message"};
	texte["settings_valzoneAddToGlobalTime"]=["Integrate","Shall the time be included to the global time?"];
	texte["settings_valGlobaltimeShowCroppedZone"]=["Integrate cropped zone","Shall the ready-state of the cropped zones be included in the global time?"];
	texte["settings_cacheReset"]=["Cache reset","All information about your farms will be deleted ..."];
	//help
	texte["help_0"]=[,"This is small introduction to the functions of the Adviser-Script. Not all changes are written here, go find them yourself ... Sometimes a mouse-over helps. <br>At the bottom you see a button to visit the <a href=\"http://userscripts.org/scripts/show/66964\" target=\"_blank\">homepage</a>. Next to it, there is the button for the options. You should look at them and configure as you desire.<br>Generally the script only knows what you have seen. So just visit the field if something is wrong."];
	texte["help_1"]=["The Zones","The fields are observed while you see them. The script saves the plants, times and watering. So on the farm view this can be displayed. Each zone has a time counter at its top to show you when it is ready.<br>If you own the planting helper, you can access it directly from opened field. At the top of an opened zone you can navigate directly to zones of the same type."];
	texte["help_2"]=["The Overview","Click the pig on the top and you will see an overview of your complete farm. Each zone, its output (product and points) and the next time of work are displayed. Also your total crop is shown. Below you see the wishes of your farmies. You can click each zone or farmie to navigate there. If you are run out of a product, it can take you directly to the market place."];
	texte["help_3"]=["Blue Bar","Your points are kept daily. At the bottom you see a bar displaying the current and past level. Each white and red (sunday) line is a day. If you click it you get a detailed table and perhaps a hint if you are lack of a product."];
	texte["help_4"]=["Shelf","Here informations of prices and value are added. The amount are reformatted to better style. At the bottom you have an input to seach an other player."];
	texte["help_5"]=["Profit Calculation","Next to the bottom of the shelf you can click <img src=\""+GFX+"buildingupdatebutton_off.png\" style=\"width: 15px;height: 15px;\">. This shows you a table calculating times and profits of your products. Click the stars to change the upgrade levels. Click the headline to sort."];
	texte["help_6"]=["Farmies","The bubbles of the farmies are expanded by a calculation if they pay enough. If your product amount runs too low, the product is marked. Click the house next to the farmies to see the ones of the last month. At the blue bar on the right you can set which farmies you send away. At the top a calculation is made, so you can decide if an advertising is profitable."];
	texte["help_7"]=["Hotkeys","You can quickly move to a place by pressing <i>Alt</i>+... See the options!"];
	texte["help_8"]=["Market place","On the market place you are \"protected\", means that you can't buy a product more expensive than in the retailer or by options set. If activated, you can directly switch to a product page by the incoming window on the right. At the top you can step to the next/previous product and see your current amount.<br>You find at the bottom a very important button: the prices. It gives you a table listing your product amounts, values and the prices that are everywhere used. So keep attention they are set right! An \"observed\" price is kept when you visit a market page of a single product.<br>On your market stall a few usefull values are displayed and your last offer was kept and is set now."];
	texte["help_9"]=["Messages","Your sales are kept and directly displayed - no need to open a message two times! Note the \"Read all\" and \"Log\" buttons. Your private messages are kept, too. So no need to look for the last messages of the current contact."];
	texte["help_10"]=["Contracts","They are kept, too. While creating a contact an input displays the value of the entered product. Enter first the price and then the amount to get inverse the amount. You can submit the same contract multiple times!"];
	texte["help_11"]=["Account Managing","You can save all your accounts in the options. So you can login easily in each one by the displayed buttons on the starting page. Note that you can switch directly the accounts at the same server."];

	// AUTOMAT
	texte["automat"] = "Automaton";
	texte["automat_planting"] = "Planting...";
	texte["automat_waiting"] = "Waiting...";
	texte["automat_watering"] = "Watering...";
	texte["automat_feeding"] = "Feeding...";
	texte["automat_automatPlanting"] = "Seedingmachine";
	texte["automat_automatFeeding"] = "Feedingmachine...";
	texte["automat_automatFactory"] = "Factorymachine...";
	texte["automat_automatWindmill"] = "Millmachine...";
	texte["automat_botStart"] = "Start Automaton-Bot";
	texte["automat_botStop"] = "Stop Automaton-Bot";
	texte["automat_zonePairing"] = "Zone pairing";
	texte["automat_debugInfo"] = "Debug Info";
	texte["automat_recoverInfo"] = "Recover Info";
	texte["automat_windmill"] = "windmill";
	texte["automat_timing"] = "Timing";
	texte["automat_general"] = "General";
	texte["automat_development"] = "Development";
	texte["automat_msgUpdate"] = "There is a new script version of the automaton. Install?";
	texte["automat_shouldUpdateAdviser"] = "You should update the script of the Adviser!<br>The Automaton will not run properly.";
	texte["automat_valUpdate"] = ["Update","Checks whether an updated version of this Advisor script is available."];
	texte["automat_setvalUseBot_plant"] = "Shall the planting machine be displayed?";
	texte["automat_setvalUseBot_water"] = "Shall the fields be watered?";
	texte["automat_setvalUseBot_feed"] = "Shall the feeding machine be displayed?";
	texte["automat_setvaluseBot_foodworld"] = "Use bot on picnic area"; // Harry;
	texte["automat_setvaluseBot_farmi"] = "Use farmie bot";
	texte["automat_setvaluseBot_lottery"] = "Use lottery bot";
	texte["automat_setvaluseBot_windmill"] = "Use windmill bot";
	texte["automat_setvalDisableCropFields"]="Block the cropping of sleeping fields.";
	texte["automat_settMin"] = "Minimal clicking delay of the automaton";
	texte["automat_settMax"] = "Maximal clicking delay of the automaton";
	texte["automat_settMin2"] = "Minimal waiting delay of the automaton";
	texte["automat_settMax2"] = "Maximal waiting delay of the automaton";
	texte["automat_setToDefault"] = "Set to default";
	texte["automat_setvalSeedWaitForCrop"] = "Wait planting if next cropping time is less than";
	texte["automat_emergencyPlants"] = "Emergency Plants. They are taken first if the needed plant is not available or fitting.";
	texte["automat_setvalUseQueueList"] = "Use queue for the fields.";
	texte["automat_set12a"] = "Delete \n all zone queue\n data";
	texte["automat_set12b"] = "Delete Completed.";
	texte["automat_setvalShowQueueTime"] = "Show calculated product ready time in the queue.";
	texte["automat_set18a"] = "Delete all mill queue data";
	texte["automat_set18b"] = "Delete Completed";
	texte["automat_setvalPowerUpActivate"] = "Activate powerups for products";
	texte["automat_setvalLotteryActivate"] = "Activate the daily lottery automatically";
	texte["automat_setvalLotteryDailyLot"] = "Choose to keep the daily lot";
	texte["automat_setvalQuestActivate"] = "Activate the Quest automatically to quest:";
	texte["automat_setvalQuestSolving"] = "Solve the Quest automatically to quest:";
	texte["automat_setvalFarmiReject"] = "Auto reject farmi below:";
	texte["automat_setvalFarmiAccept"] = "Auto accept farmi above:";
	texte["automat_setvalFarmiAcceptBelowMinValue"] = "Accept a farmi with an product item that is below the minimal product amount in the rack.";
	texte["automat_setvalFarmiRemoveMissing"] = "Remove a farmi with missing products and the lowest yield. Threshold:";
	texte["automat_fields"] = "Fields";
	texte["automat_titleGeneral"] = "General queue";
	texte["automat_titleQueue"] = "Queue";
	texte["automat_QueCopyTextHeader"] = "Copy queue";
	texte["automat_QueCopyTextHeaderFrom"] = "Copy from:";
	texte["automat_QueCopyTextHeaderTo"] = "Copy to:";
	texte["automat_QueAddText"] = "Click to add a product to the list."; //Add product
	texte["automat_QueAddAboveText"] = "Click to add a product to the list before this product";
	texte["automat_QueDeleteText"] = "Delete this product from the list.";
	texte["automat_QueClose"] = "Close this menu";
	texte["automat_QueCloseAll"] = "Close all open Queue windows.";
	texte["automat_QueMin"] = "Lower value";
	texte["automat_QuePlus"] = "Increase value";
	texte["automat_QueBehaviourF"] = "Click to switch to rack-mode";
	texte["automat_QueBehaviourR"] = "Click to switch to field-mode";
	texte["automat_QueUpButton"] = "Move Up";
	texte["automat_QueDownButton"] = "Move Down";
	texte["automat_buttonTimeLine"] = "Show field timelines";
	texte["automat_buttonOverview"] = "Show overview of automatons";
	texte["automat_repeat_on"] = "Repeat list is ON, press to turn off repeat.";
	texte["automat_repeat_off"] = "Repeat list is OFF, press to turn on repeat.";
	texte["automat_shuffle_on"] = "Shuffle list is ON, press to turn off shuffle.";
	texte["automat_shuffle_off"] = "Shuffle list is OFF, press to turn on shuffle.";
	texte["automat_rotate"] = "Rotate: place first entry after the last entry";
	texte["automat_stop"] = "STOP";
	texte["automat_week"] = "week";
	texte["automat_inftext"] = "Runs indefinitely";
	texte["automat_removeAllWeed"] = "Remove all %AMOUNT% %PROD%<br>a piece = %COST%<br>total = %TCOST%";
	texte["automat_usedFarmFieldsReadyAt"] = "Used farm fields are ready at:";
	texte["automat_CloseWindowTimer"] = "Closing screen in :%1%";
	texte["automat_CloseWindowTimerClick"] = "Click to reset timer!";
	//%PRODNAME% = product name, %FLDFROM% = field nr from, %FLDTO% = field nr until,
	texte["automat_QueDoWork"] = "Zone is done by bot";
	texte["automat_QueDontWork"] = "Zone is ignored by bot";
	texte["automat_QueueStoped"] = "A culture stop is detected these %PRODNAME% will not be cultured.";
	texte["automat_QueStop0"] = "The automatic culturing process will be stopped";
	texte["automat_QueStop1"] = "After culturing %FLDFROM% field the automatic process will be stopped.";
	texte["automat_QueStopX"] = "After culturing %FLDFROM% fields the automatic process will be stopped.";
	texte["automat_QueRepeat"] = "(Repeat mode)";
	texte["automat_QueShuffle"] = "(Shuffle mode)";
	texte["automat_QueRepeatShuffle"] = "(Shuffle repeat mode)";
	texte["automat_QueFieldInRow1"] = "(Nr. %FLDFROM%)";
	texte["automat_QueFieldInRowX"] = "(Nr. %FLDFROM% to %FLDTO%)";
	texte["automat_QueRoundDoneR"] = "These fields %PRODNAME% are already cultured and will be skipped";
	texte["automat_QueRoundDone1"] = "This field %PRODNAME% s already cultured in this turn, <br/>next turn it will be cultured again.";
	texte["automat_QueRoundDoneX"] = "These fields %PRODNAME% are already cultured in this turn, <br/>next turn they will be cultured again.";
	texte["automat_QueFieldMake"] = "Total:";
	texte["automat_QueFieldToGo"] = "To go:";
	texte["automat_QueRoundMake"] = "Each turn: ";
	texte["automat_QueRoundMade"] = "Made:";
	texte["automat_QueRoundToGo"] = "To do:";
	texte["automat_QueUses"] = "Uses:";
	texte["automat_QueGives"] = "Yield:";
	texte["automat_QueFutter"] = "Time discount:";
	texte["automat_QueTimeThis"] = "Production time:";
	texte["automat_QueTimeToGo"] = "Culture time to go:";
	texte["automat_QueTimeReady"] = "Ready at:";
	texte["automat_QueTimeFirstReady"] = "First is ready at:";
	texte["automat_QueTimeNextReady"] = "Next is ready at:";
	texte["automat_QueTimeRound"] = "Average each turn:";
	texte["automat_QueRackMode"]="(Rack mode)";
	texte["automat_recovertext"]="Paste here the code of the debug info then press the recode-button. A screen opens and select import or cancel.";
	texte["automat_queueshow"]="Click to edit the queue";	
	//For the Mill
	//%PRODNAME% = product name, %FLDFROM% = field nr from, %FLDTO% = field nr until,
	texte["automat_MillQueue"] = "Mill Queue";
	texte["automat_MillDoWork"] = "The windmill is automatically maintained.";
	texte["automat_MillDontWork"] = "The windmill is ignored. Manual maintenance is required.";
	texte["automat_MillClearAddAll"] = "Clear mill list then add all recieps";
	texte["automat_MillShuffle"] = "(Shuffle mode)";
	texte["automat_MillInRow1"] = "(Nr. %FLDFROM%)";
	texte["automat_MillInRowX"] = "(Nr. %FLDFROM% to %FLDTO%)";
	texte["automat_MillTimeTotal"] = "Total Bakeing time:";
	texte["automat_MillTimeReady"] = "Ready:";
	texte["automat_MillStoped"] = "There is a stop added to the queue this %PRODNAME% will not be bakeed";
	texte["automat_MillStop0"] = "The automatic bakeing process will be stopped";
	texte["automat_MillStop1"] = "After %FLDFROM% recipe the automatic bakeing process will be stopped.";
	texte["automat_MillStopX"] = "After %FLDFROM% recipes the automatic bakeing process will be stopped.";
	try{
	texte["automat_MillTimeThis"] = top.window.wrappedJSObject.windmill_bakeingtime;
	texte["automat_MillPowerUpText_0"] = top.window.wrappedJSObject.powerup_bonustext1;
	texte["automat_MillPowerUpText_1"] = top.window.wrappedJSObject.powerup_bonustext2;
	texte["automat_MillPowerUpText_2"] = top.window.wrappedJSObject.powerup_bonustext3;
	texte["automat_MillIngredients"] = top.window.wrappedJSObject.windmill_zutaten;
	}catch(err){GM_log("Mill from game missing \n"+err);}
	texte["automat_number"] = "Number";
	texte["automat_lack"] = "Lack";
	texte["automat_MillRecipesBought"] = "Total recipes bought: ";
	texte["automat_MillRecipesUsed"] = "Total recipes used: ";
	texte["automat_MillRecipesBake"] = "Max recipes to bake: ";
	//title
	texte["automat_title_on_general"] = "Show general queue only<br>+Ctrl: Show general queue";
	texte["automat_title_off_general"] = "Show general queue only<br>+Ctrl: Hide general queue";
	texte["automat_title_on_farm1"] = "Show first farm only<br>+Ctrl: Show first farm";
	texte["automat_title_off_farm1"] = "Show first farm only<br>+Ctrl: Hide first farm";
	texte["automat_title_on_farm2"] = "Show second farm only<br>+Ctrl: Show second farm";
	texte["automat_title_off_farm2"] = "Show second farm only<br>+Ctrl: Hide second farm";
	texte["automat_title_on_farm3"] = "Show third farm only<br>+Ctrl: Show third farm";
	texte["automat_title_off_farm3"] = "Show third farm only<br>+Ctrl: Hide third farm";
	texte["automat_title_on_farm4"] = "Show fourth farm only<br>+Ctrl: Show fourth farm";
	texte["automat_title_off_farm4"] = "Show fourth farm only<br>+Ctrl: Hide fourth farm";
	texte["automat_title_on_windmill"] = "Show windmill only<br>+Ctrl: Show windmill";
	texte["automat_title_off_windmill"] = "Show windmill only<br>+Ctrl: Hide windmill";
	texte["automat_title_on_forestry"] = "Show forestry only<br>+Ctrl: Show forestry";
	texte["automat_title_off_forestry"] = "Show forestry only<br>+Ctrl: Hide forestry";
	texte["automat_title_on_foodworld"] = "Show picnic area only<br>+Ctrl: Show picnic area";
	texte["automat_title_off_foodworld"] = "Show picnic area only<br>+Ctrl: Hide picnic area";
        texte["automat_title_on_type1"] = "Show fields only<br>+Ctrl: Show fields";
        texte["automat_title_off_type1"] = "Show fields only<br>+Ctrl: Hide fields";
        texte["automat_title_on_type2"] = "Show stables only<br>+Ctrl: Show stables";
        texte["automat_title_off_type2"] = "Show stables only<br>+Ctrl: Hide stables";
        texte["automat_title_on_type3"] = "Show factories only<br>+Ctrl: Show factories";
        texte["automat_title_off_type3"] = "Show factories only<br>+Ctrl: Hide factories"; 
	texte["automat_title_on_all"] = "Show all farm queues";
	texte["automat_title_off_all"] = "Hide all farm queues";

	//help
	texte["automat_help_0"] = [,"This script can be used to add automation to the cultivation process."];
	texte["automat_help_1"] = ["How it works","If you click the \""+texte["automat_botStart"]+"\" button at the bottom of the page the automation process will be started.<br>You even can continue gaming as long as nothing is ready. Then the bot begins to simulate the clicks a user does. During that period you shouldn't interact."];
	texte["automat_help_2"] = ["Field","At the bottom of every zone an icon is displayed. If the icon shows <div class = \"kp"+PRODSTOP+"\" style = \"display:inline-block;\">&nbsp;</div> the automation process is stopped or will be stopped at the next culture moment. There will not be any culturing for this garden until you select an other product. When a product icon is displayed this product is cultured next at the field."];
	texte["automat_help_3"] = ["Queue","If in the option menu of the Automat the queue checkbox is checked, clicking the product culturing icon of a zone will display a queue where multiple products can be queued. If the background of a queue item is red this item will not be cultered because a production stop item is added somewhere before in the list."];
	texte["automat_help_4"] = ["Repeat","Enabling the \"Repeat\" check box will enable the \"loop\" feature of the queue."];
	texte["automat_help_5"] = ["Shuffle","Enabling the \"Shuffle\" check box will randomly culture a product from the list."];
	texte["automat_help_6"] = ["Stables","At the bottom of every zone with a stable an icon is displayed. If the icon shows <div class = \"kp"+PRODSTOP+"\" style = \"display:inline-block;\">&nbsp;</div> the automation process is stopped or will be stopped at the next culture moment. When a product is displayed this product will be used to feed the stable. Click this icon to choose the feed amount through the slider or change the feed product by selecting the product."];
	texte["automat_help_7"] = ["Factories","At the bottom of every zone with a factory an icon is displayed. If the icon shows <div class = \"kp"+PRODSTOP+"\" style = \"display:inline-block;\">&nbsp;</div> the automation process is stopped or will be stopped at the next culture moment. When a product is displayed this will be the produced product of this factory."];
	texte["automat_help_8"] = [texte["automat_zonePairing"],"In the \""+texte["automat_zonePairing"]+"\" menu of the Automat the radio-buttons controle the pairing of the zones. Also the general queue is extended to allow multiple general queues."];
	texte["automat_help_9"] = ["Windmill","The windmill queue works the same as the zone queue but instead of products recipes are baked.<br>As extra the mill queue has a <div class = \"queueButtonAddAll\">&nbsp;</div> button which can be used to clear and refill the queue with all available recipes that were bought and where there are enough ingredients in the rack to bake them.<br>If the background of a queue item is yellow then there are not enough products to bake all these recipes.<br><br><b>Note: </b>For first time user that have already bought recipes. Go to the miller or the trading lady screen so the bought recipes can be stored into the system."];
	
	// Do not edit
	if(!top.window.wrappedJSObject.greaseMonkeyData){ top.window.wrappedJSObject.greaseMonkeyData=new Object(); }
	top.unsafeData = top.window.wrappedJSObject.greaseMonkeyData;
/*
function compareObjectsExistance(obj1,obj2,pre){
	try{
		if(typeof(pre)=="undefined") pre="";
		for(i in obj1){
			if(!obj1.hasOwnProperty(i)){ continue; }
			if(typeof obj2[i] == "undefined"){
				GM_log("miss in 2: "+pre+i);
			}else{
				if(typeof obj1[i] == "object"){
					compareObjectsExistance(obj1[i],obj2[i],pre+i+" : ");
				}
			}
		}
		for(i in obj2){
			if(!obj2.hasOwnProperty(i)){ continue; }
			if(typeof obj1[i] == "undefined"){
				GM_log("miss in 1: "+pre+i);
			}else{
				if(typeof obj2[i] == "object"){
					compareObjectsExistance(obj1[i],obj2[i],pre+i+" : ");
				}
			}
		}
	}catch(err){ GM_log("ERROR compareObjectsExistance\n"+err); }
}
window.setTimeout(function(){
	GM_log("START COMPARING");
	compareObjectsExistance(texte,top.unsafeData.texte);
	GM_log("END COMPARING");
},1000);
*/	
	top.unsafeData.texte=new Object();
	top.unsafeData.texte[LANGUAGE]=texte;
	top.unsafeData.LANGUAGE=LANGUAGE;
	top.unsafeData.COUNTRY=COUNTRY;
	top.unsafeData.delimThou=delimThou;
	top.unsafeData.regDelimThou=regDelimThou;
	top.unsafeData.regDelimThouShift=regDelimThouShift;
	top.unsafeData.regDelimThouDelete=regDelimThouDelete;
	top.unsafeData.delimDeci=delimDeci;
	top.unsafeData.regDelimDeci=regDelimDeci;
	top.unsafeData.dateFormatDM=dateFormatDM;
	top.unsafeData.dateFormatDMY=dateFormatDMY;
}catch(err){ GM_log("ERROR\npage="+location.href+"\n"+err); }
},false);