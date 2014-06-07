// ==UserScript==
// @name        Veselaferma BG
// @namespace   http://userscripts.org/scripts/show/186116
// @description Language pack "BG" for MyFreeFarm Scripts
// @include     http://*.veselaferma.com*
// @include     http://veselaferma.com*
// @version     1.0.2
// @grant       GM_log
// ==/UserScript==

// Edit above the @include. This controls on which pages the script is called.
window.addEventListener("load",function(){
try{

	// Do not edit
	var texte=new Object();
	texte["category"]=new Object();
	texte["help"]=new Object();
	texte["automat"] = new Object();
	texte["automat"]["help"] = new Object();
	texte["automat"]["MillPowerUpText"] = new Array();
	texte["automat"]["title"] = new Object();
	texte["automat"]["title"]["on"] = new Object();
	texte["automat"]["title"]["off"] = new Object();	
	const PRODSTOP=-1;
	const GFX = "http://mff.wavecdn.de/mff/"; // The path to the in-game images
	// Important constants
	const LNG="bg"; // The country ISO-code (2 digits)
	const delimThou="."; // The separator for thousands (e.g. in 1.000).
	const regDelimThou=" "; // = delimThou. " " has to be masked to "\\ "!
	const regDelimThou2="([\\d,])(\\d),(\\d{1,2}\\D)"; // = "([\\d"+delimThou+"])(\\d)"+delimThou+"(\\d{1,2}\\D)"
	const regDelimThou3="(\\d),(,*)(\\d{1,2}\\D)"; // = "(\\d)"+delimThou+"("+delimThou+"*)(\\d{1,2}\\D)"
	const delimDeci="."; // The separator for decimals (e.g. in 1.99).
	const regDelimDeci="\\ "; // = delimDeci. " " has to be masked to "\\ "!
	const dateFormatDM = "day.month."; // The style a short date is displayed. You can use the tags "day" and "month".
	const dateFormatDMY = "day.month.year"; // The style a date is displayed. You can use the tags "day", "month" and "year".
	const timeFormatHM = "hour:min"; // The style a time is displayed. You can use the tags "hour" and "min".
	const timeFormatHMS = "hour:min:sec"; // The style a precise time is displayed. You can use the tags "hour", "min" and "sec".
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
	// Take the following from the game
        texte["waehrung"]=cyr_ka+cyr_De;
		texte["coins"]=cyr_Ka+cyr_er+cyr_ie+cyr_de+cyr_i+cyr_te+cyr_i;
		texte["msgMarketsale"]=cyr_Pe+cyr_a+cyr_ze+cyr_a+cyr_er;		
		texte["msgMarketsaleContent"]="(.*) "+cyr_ze+cyr_a+cyr_ka+cyr_u+cyr_pe+cyr_i+"\\s*(\\d+)x (.*?) "+cyr_ze+cyr_a+"<br>\\s*(.*?) "+cyr_ka+cyr_De+" "+cyr_o+cyr_te+" "+cyr_te+cyr_ie+cyr_be+"\\.";
		texte["msgContractsale"]=cyr_Pe+cyr_er+cyr_i+cyr_ie+cyr_te+ +cyr_de+cyr_o+cyr_ghe+cyr_o+cyr_ve+cyr_o+cyr_er;
		texte["msgContractsaleContent"]="(.*) "+cyr_ie+" "+cyr_pe+cyr_o+cyr_de+cyr_pe+cyr_i+cyr_es+cyr_a+cyr_el+" "+cyr_ve+cyr_a+cyr_sha+" "+cyr_de+cyr_o+cyr_ghe+cyr_o+cyr_ve+cyr_o+cyr_er+"!<br><br>\\s*"+cyr_Es+cyr_el+cyr_ie+cyr_de+cyr_en+cyr_i+cyr_te+cyr_ie+" "+cyr_pe+cyr_er+cyr_o+cyr_de+cyr_u+cyr_ka+cyr_te+cyr_i+" "+cyr_es+cyr_a+" "+cyr_be+cyr_i+cyr_el+cyr_i+" "+cyr_pe+cyr_er+cyr_o+cyr_de+cyr_a+cyr_de+cyr_ie+cyr_en+cyr_i+":<br>([\\S\\s]*)\\s*<br>\\s*"+cyr_Es+cyr_u+cyr_em+cyr_a+cyr_te+cyr_a+" "+cyr_o+cyr_te+" (.*?) "+cyr_ka+cyr_De+" "+cyr_ie+" "+cyr_pe+cyr_er+cyr_ie+cyr_ve+cyr_ie+cyr_de+cyr_ie+cyr_en+cyr_a+" "+cyr_ve+cyr_hardsign+cyr_ve+" "+cyr_ve+cyr_a+cyr_sha+cyr_i+cyr_ya+cyr_te+" "+cyr_a+cyr_ka+cyr_a+cyr_u+cyr_en+cyr_te+"\\.";
		texte["msgContractsaleList"]="\\s*(\\d+)x (.*?)<br>";
		texte["msgFriend"]="(.+) wants to add you as friend";
		texte["msgMarketplace"]="(\\d+)\\s+(\\D+)\\s+"+cyr_ze+cyr_a+"\\s+(\\d+)";
	
	// And all the other texts you can enter what you want ...
	texte["category"]["c"]=texte["coins"];
	texte["category"]["v"]="Plants";
	texte["category"]["e"]="Advanced products";
	texte["category"]["z"]=unsafeWindow.rack_deco;
	texte["category"]["o"]=unsafeWindow.rack_oil;
	texte["category"]["f1"]="Saplings";
	texte["category"]["f2"]="Logs";
	texte["category"]["f3"]="Sawmill products";
	texte["category"]["f4"]="Carpentry products";
	texte["category"]["f5"]="Wooden farmhouse items";
	texte["category"]["fw"]=unsafeWindow.rack_foodworld;
	texte["category"]["fw1"]="Drinks";
	texte["category"]["fw2"]="Food";
	texte["category"]["fw3"]="Cakes";
	texte["category"]["fw4"]="not yet available";
	texte["adviser"]="Adviser";
	texte["yes"]="Yes";
	texte["no"]="No";
	texte["ok"]="OK";
	texte["default"]="Default";
	texte["manageVariables"]="Manage variables";	
	texte["autologinChecking"]="Checking active sessions.  Please wait %1% seconds<br>...";
	texte["autologinAllOk"]="All accounts logged in.";
	texte["login"]="Login";
	texte["farm"]="Farm";
	texte["city"]="City";
	texte["marketplace"]="Сергия";
	texte["marketstall"]="Пазар";
	texte["NPC"]="NPC";
	texte["SGH"]="SGH"; // Short for the seller of plants
	texte["statistics"]="Statistics";
	texte["stat_days1"]="1 day";
	texte["stat_days3"]="3 days";
	texte["stat_days5"]="5 days";
	texte["stat_days7"]="7 days";
	texte["stat_gamefield"]="Show game";
	texte["stat_stats"]="Show statistics";
	texte["goToPage"]="Go to page";
	texte["goToRank"]="Go to rank";
	texte["goToLottery"]="Go to lottery";
	texte["overview"]="overview";
	texte["scriptHomepage"]="Script Homepage";
	texte["options"]="Options";
	texte["hotkeys"]="Hotkeys";
	texte["profitTable"]="Profit per Zone per Day";
	texte["recipes"]="Recipes";
	texte["windmill"]="Windmill";
	texte["lodge"]="Log cabin";	
	texte["forestry"]="Forestry";
	texte["forest"]="Forest";
	texte["sawmill"]="Sawmill";
	texte["carpentry"]="Carpentry";
	texte["foodworld"]="Picnic area"; // Harry	
	texte["foodworld-1"]="Soda stall";
	texte["foodworld-2"]="Snack booth";
	texte["foodworld-3"]="Pastry shop";
	texte["farmpediaUrl"]="http://farmpedia.myfreefarm.de/";
	texte["farmpedia"]="FarmPedia";
	texte["formulaType"]=["Prod","+val","+pts"];
	texte["alertWillLowRack"]="Attention! This will drop your rackamount below the minimal value!";
	texte["newLevelReached"]="Congratulations!<br>You have reached the next level!";
	texte["shouldReload"]="You should reload the page.";
	texte["editPrice"]="Edit price";
	texte["loading"]="Loading";
	texte["lotteryLog"]="Lottery Log";
	texte["dailyTicket"]="Daily ticket";
	texte["boughtTickets"]="Bought tickets";
	texte["keptLots"]="Kept lots";
	texte["exchangedLots"]="Exchanged lots";
	texte["serverTime"]="Time of server";
	texte["localTime"]="Local time";
	texte["sessionEnd"]="End of Session at %1%<br>Click for new login";	
	// quests 
	texte["activation"]="Activation";
	texte["farmX"]="%1%. farm";
	texte["rackX"]="%1%. rack";
	texte["productTimeSaving"]="%1% minutes saving for %2%";
	texte["additionalFarmi"]="%1% additional farmi daily";
	texte["waterBonus"]="%1%% water bonus";
	texte["farmzone"]="Building place %1% of %2%. farm";
	texte["additionalLogCapacity"]="Rack capacity for logs increases of %1%";
	texte["additionalForestFarmiSlot"]="%1% additional place in the forest farmi waiting queue";
	texte["wateringFeature"]="Watering feature";
	texte["absolute"]="absolute";
	texte["relative"]="relative";
	texte["demand"]="Demand";
	texte["reward"]="Reward";
	texte["calcTo"]="Calculate to";
	texte["start"]="Start";
	// market
	texte["goToMarket"]="Go to market";
	texte["goToMarketOfX"]="Go to market of %1%";
	texte["goToMarketstall"]="Go to market stall";
	texte["toSGH"]="Go to shop";
	texte["productOverview"]="Product overview";
	texte["currentOffers"]="Current offers";
	texte["above"]="above";
	texte["overNPCprice"]="over NPC-price";
	texte["overX"]="over %1%";
	texte["buy"]="Buy";
	texte["price"]="Price";
	texte["prices"]="Prices";
	texte["unitPrice"]="Unit price";
	texte["all"]="All";
	texte["product"]="Product";
	texte["inventory"]="Inventory";
	texte["NPCprice"]="NPC-Price";
	texte["observed"]="Observed";
	texte["marketPrice"]="Market&nbsp;Price";
	texte["afterFee"]="After Fee";
	texte["takeObservedPrices"]="Take observed prices";
	texte["stock"]="Stock";
	texte["stockValue"]="Stock value";
	texte["minRack"]="Min&nbsp;rack";
	texte["alertSetPriceNone"]="Do you really want to set no price for %PRODUCT%?";
	texte["alertSetPriceOverNPC"]="Do you really want to set the price of %PRICE% for %PRODUCT%?<br>It is higher than the NPC-value of %NPC%.";
	texte["alertSetPriceOverObs"]="Do you really want to set the price of %PRICE% for %PRODUCT%?<br>It is much higher than the observed value of %OBS%.";
	texte["alertSetPriceUnderObs"]="Do you really want to set the price of %PRICE% for %PRODUCT%?<br>It is much lower than the observed value of %OBS%.";
	texte["click"]="Click";
	texte["clickDouble"]="Double-Click";
	texte["clickAlt"]="Alt+Click";
	texte["clickCtrl"]="Ctrl+Click";
	texte["load"]="Load";
	texte["save"]="Save";
	texte["commission"]	= "Commission";
	// main
	texte["upgradeForX"]="upgrade&nbsp;for&nbsp;%1%";
	texte["emptyField"]="Empty field!";
	texte["day0"]="Today";
	texte["day1"]="Tomorrow";
	//texte["day2"]="Day after tomorrow"; //comment it if not used in the language
	texte["readyAtX"]="Ready at %1%"; //%1%=2:15+texte["shortOClock"]
	texte["readyAtX_day1"]="Tomorrow ready at %1%"; 
	// texte["readyAtX_day2"]="Ready in 2days at %1%"; //comment it if not used in the language
	texte["readySinceX"]="Ready since %1%"; 
	texte["waterNeededAtX"]="Water needed at %1%"; 
	texte["waterNeededAtX_day1"]="Tomorrow water needed at %1%";
	texte["sinceX"]="since %1%";
	texte["shortOClock"]="h";
	texte["shortHours"]="h";
	texte["level"]="Level";
	texte["levelTooLow"]="Your level is too low";
	texte["levelXneeded"]="Level&nbsp;%1%&nbsp;needed";
	texte["finished"]="Finished";
	texte["waterNeeded"]="Water needed";
	texte["cropped"]="Cropped";
	texte["searchPlayer"]="Search player";
	texte["relogin"]="Session ends soon.<br>New login in %1%.";
	texte["advertisingEnds"]="Advertising ends today";
	texte["upjersAdvertising"]="Upjers-Advertising";
	texte["market"]="Market";
	texte["quests"]="Quests";
	texte["quest_farm"]="Quest";
	texte["quest_lodge"]="Quest Lodge";
	texte["quest_foodworld"]="Quest Foodworld";
	texte["recursive"]="Recursive Needed";
	texte["contract"]="Contract";
	texte["upgradeLevel"]="Upgrade level";
	texte["clickToChange"]="Click to change";
	// messages
	texte["writeMessage"]="write message";
	texte["saveAsTemplate"]="Save as template";
	texte["toMessage"]="to message";
	texte["previousMessage"]="previous message";
	texte["nextMessage"]="next message";
	texte["formatNumbers"]="Format numbers";
	// contracts
	texte["sendContract"]="Send contract";
	texte["sendContractAgain"]="Send contract again";
	texte["contractsReceived"]="Contracts received";
	texte["contractsSent"]="Contracts sent";
	texte["oldOnes"]="Old";
	texte["storeXinContract"]="Store %1% in contract";
	// system messages
	texte["showLog"]="Show log";
	texte["readAll"]="Read all";
	texte["quantity"]="Quantity";
	texte["turnover"]="Turnover";
	texte["profit"]="Profit";
	texte["filterForX"]="Filter for %1%";
	texte["summarize"]="Summarize";
	texte["filter"]="Filter";
	texte["buyers"]="Buyers";
	texte["goods"]="Goods";
	// score history
	texte["day"]="Ден";
	texte["points"]="Точки";
	texte["rank"]="Място";
	texte["inStock"]="in stock";
	texte["stockXmissing"]="Stock %1% missing!!!";
	texte["stockXlow"]="Stock %1% low";
	// overview
	texte["farmi"]="Farmie";
	texte["farmis"]="Farmies";	
	texte["products"]="Products";
	texte["money"]="Offered";
	texte["value"]="Value";
	texte["missing"]="Need";
	texte["yield"]="Yield";
	texte["dailyYield"]="Daily yield";
	texte["dailyRuns"]="Daily runs";
	texte["production"]="Production";
	texte["powerups"]="Power-Ups";
	texte["single"]="Single";
	texte["total"]="Total";
	texte["given"]="Given";
	texte["idle"]="idle !!";
	texte["duration"]="duration";
	texte["feed"]="Feed";
	texte["requirement"]="Need";
	texte["yieldPerProduction"]="Yield per production";
	texte["requirementPerProduction"]="Requirement per production";	
	// recipe table
	texte["showAll"]="Show all";
	texte["nr"]="Nr";
	texte["lvl"]="Lvl";
	texte["title"]="Title";
	texte["ingredients"]="Ingredients";
	texte["time"]="Time";
	texte["gain"]="Gain";
	texte["price"]="Price";
	// options panel
	texte["valAutoWater"]=["Automatic watering","Plants will be watered after planting, if you have 'Water everything' (Premium)."];
	texte["valAssumeWater"]=["Assume watering","This is important for plants growing more than 24h. The calculation of the cropping time assumes watering when needed."];
	texte["valAutoCrop"]=["Automatic harvesting","After opening your field, crops will be harvested if necessary."];
	texte["valWaterNeeded"]=["Watering needed","Shall the necessity of watering be displayed?"];
	texte["valCropMsg"]=["Close harvest dialog","Don't like the annoying harvest notification with the pig?  Get rid of it here."];
	texte["valLimitEmptyFields"]=["Empty areas","If the number of unplanted areas in your field exceeds this number, the field will be shown as empty."];
	texte["valLimitEmptyFields_forest"]=["Empty forest areas","If the number of unplanted areas in your field exceeds this number, the field will be shown as empty."];
	texte["valMoveAnimals"]=["Move animals",""];
	texte["valContractLogAmount"]=["Number contracts kept","Your last sent and received contracts are kept so that a history of them can be shown."];
	texte["valSpoilerZoneUpdate"]=["Spoiler Zone Update","Shows the next update of the zone if the needed level is not reached."];
	texte["valFarmiLimits"]=["Farmie Limits","The farmies are marked in 3 cases depending on their payment-rate."];
	texte["valFarmiMiniInfo"]=["Farmie Mini Info","Displays a small circle below each farmie showing its case of payment-rate."];
	texte["initRackamount"]="Initial rackamount";
	texte["minRackamount"]="Minimal rackamount";
	texte["valMinRackMan"]=["Detail configuration","You edit the amount on your own *here*"];
	texte["valMinRack"]=[,"A product is marked if its amount in your rack is falling below this value. You can enter different values depending on the category."];
	texte["valMinRackPlantsize"]=["Aspect size of plant","For example grain needs only half of the value above."];
	texte["valMinRackGrowing"]=["Growing products","Adds the amount of products that are in production and ready by powerup."];
	texte["valMinRackQuest"]=["Quest products","Adds the amount of the quest products"];
	texte["valMinRackLodgeQuest"]=["LodgeQuest products","Adds the amount of the lodgequest products"];
	texte["valMinRackRecursive"]=["Recursive products","Add the required products needed to make missing products, and calculate these again for the required proucts.(used by forestry products)"];
	texte["valMinRackFarmis"]=["Farmie products","Adds the amount of the products wanted by the farmies which pay more than the lower limit."];
	texte["valMinRackForestryFarmis"]=["Lodge farmie products","Adds the amount of the products wanted by the lodge farmies."];
	texte["protectMinRack"]=["Selling protection","Prohibits to sell products at market below the minimal rackamount"];
	texte["valBuyingLimitDown"]=["Bottom buy highlight",""];
	texte["valBuyingLimit"]=["Top buy limit","You can only buy products at the Market up to the limit given.  This protects you from accidentally purchasing very over-priced goods."];
	texte["valBuyingLimitNPC"]=["Only allow buy less than price of NPC",""];
	texte["valSellingLimit"]=["Sell limits","Your sales are also protected, so that you don't price your own goods too cheaply or too highly."];
	texte["valJoinPrices"]=["One input","Joins the price input fields at the market stand."];
	texte["valQuicklinks"]=["Show market quicklinks","Show Quicklinks at Market place"];
	texte["highlightUser"]="Highlight user at market";
	texte["highlightProducts"]="Highlight products at market";
	texte["useQuestProducts"]= "Use current quest products";
	texte["valUseObservedPrices"]=["Use observed prices","Prices are observed while clicking through the market place. A calculated price can be seen in the price list. Shall this automatically override your settings?"];
	texte["confirmUseObservedPrices"]="The observed prices will overwrite previously saved market prices ...";
	texte["valSendStatistics"]=["Send statistics","Support the <a href='http://mff.metrax.eu/' target='_blank'>Statistik-Server</a>.  No private data is sent!"];
	texte["messages"]="Messages";
	texte["valPrivateMessages"]=["Number private messages kept","Your last private messages are kept so that a message history of one contact can be shown."];
	texte["valMarketMessages"]=["Number market messages kept","Old messages remain in this archive, even if they are older than the maximum 7 days."];
	texte["valMessageRe"]=["Short subject","Replaces \"Re:Re:\" to \"Re:\" in the subject when you reply to a message."];
	texte["general"]="General";
	texte["valAutoLogin"]=["Automatic login","Once username and password information is given, all accounts will be logged in, so that they can be fed, harvested, watered, and planted. Popups must be allowed with multiple accounts."];
	texte["valUpdate"]=["Update","Checks whether an updated version of this Advisor script is available."];
	texte["valServerTimeOffset"]=["Time of server",""];
	texte["valGamecursor"]=["Game cursor","Use the game cursors instead of your system cursors."];
	texte["valDrag"]=["Dragging","Allow moving windows by clicking the upper left corner."];
	texte["valClickErrorbox"]=["Hide errorbox","Some users have problems with the error box. Keep in mind that this alert is normally useful!"];
	texte["valHotkeys"]=["Hotkeys","Use hotkeys to quicker navigate the game. See the help."];
	texte["hotkeymap"]={"prevPage":"previous Message, Zone, ...","nextPage":"next Message, Zone, ...","farm1":"1st farm","farm2":"2nd farm","farm3":"3rd farm","guild":"Club","city1":"First Village","city2":"Second Village","farmilog":"Farmi-Log","help":"Help","market":"Market place","marketstand":"Market stand","messages":"Messages","options":"Options","profit":"Profit Calculation","sgh":"Seed retailer","overview":"Overview","contract":"Contracts","systemmessage":"(next unread) system message"};
	texte["valzoneAddToGlobalTime"]=["Integrate","Shall the time be included to the global time?"];
	texte["valGlobaltimeShowCroppedZone"]=["Integrate cropped zone","Shall the ready-state of the cropped zones be included in the global time?"];
	texte["cacheReset"]=["Cache reset","All information about your farms will be deleted ..."];
	texte["accounts"]="Accounts";
	texte["accountActive"]="Account active";
	texte["server"]="Server";
	texte["invalidServer"]="Invalid Server";
	texte["name"]="Name";
	texte["password"]="Password";
	texte["delete"]="Delete";
	texte["msgUpdate"]="There is a new script version of the Adviser. Install?";
	texte["showPasswords"]="show passwords";
	//help
	texte["showMissingProducts"]="Show product shortage";
	texte["help"][0]="This is small introduction to the functions of the Adviser-Script. Not all changes are written here, go find them yourself ... Sometimes a mouse-over helps. <br>At the bottom you see a button to visit the <a href=\"http://userscripts.org/scripts/show/66964\" target=\"_blank\">homepage</a>. Next to it, there is the button for the options. You should look at them and configure as you desire.<br>Generally the script only knows what you have seen. So just visit the field if something is wrong.";
	texte["help"]["The Zones"]="The fields are observed while you see them. The script saves the plants, times and watering. So on the farm view this can be displayed. Each zone has a time counter at its top to show you when it is ready.<br>If you own the planting helper, you can access it directly from opened field. At the top of an opened zone you can navigate directly to zones of the same type.";
	texte["help"]["The Overview"]="Click the pig on the top and you will see an overview of your complete farm. Each zone, its output (product and points) and the next time of work are displayed. Also your total crop is shown. Below you see the wishes of your farmies. You can click each zone or farmie to navigate there. If you are run out of a product, it can take you directly to the market place.";
	texte["help"]["Blue Bar"]="Your points are kept daily. At the bottom you see a bar displaying the current and past level. Each white and red (sunday) line is a day. If you click it you get a detailed table and perhaps a hint if you are lack of a product.";
	texte["help"]["Shelf"]="Here informations of prices and value are added. The amount are reformatted to better style. At the bottom you have an input to seach an other player.";
	texte["help"]["Profit Calculation"]="Next to the bottom of the shelf you can click <img src=\""+GFX+"buildingupdatebutton_off.png\" style=\"width: 15px;height: 15px;\">. This shows you a table calculating times and profits of your products. Click the stars to change the upgrade levels. Click the headline to sort.";
	texte["help"]["Farmies"]="The bubbles of the farmies are expanded by a calculation if they pay enough. If your product amount runs too low, the product is marked. Click the house next to the farmies to see the ones of the last month. At the blue bar on the right you can set which farmies you send away. At the top a calculation is made, so you can decide if an advertising is profitable.";
	texte["help"]["Hotkeys"]="You can quickly move to a place by pressing <i>Alt</i>+... See the options!";
	texte["help"]["Market place"]="On the market place you are \"protected\", means that you can't buy a product more expensive than in the retailer or by options set. If activated, you can directly switch to a product page by the incoming window on the right. At the top you can step to the next/previous product and see your current amount.<br>You find at the bottom a very important button: the prices. It gives you a table listing your product amounts, values and the prices that are everywhere used. So keep attention they are set right! An \"observed\" price is kept when you visit a market page of a single product.<br>On your market stall a few usefull values are displayed and your last offer was kept and is set now.";
	texte["help"]["Messages"]="Your sales are kept and directly displayed - no need to open a message two times! Note the \"Read all\" and \"Log\" buttons. Your private messages are kept, too. So no need to look for the last messages of the current contact.";
	texte["help"]["Contracts"]="They are kept, too. While creating a contact an input displays the value of the entered product. Enter first the price and then the amount to get inverse the amount. You can submit the same contract multiple times!";
	texte["help"]["Account Managing"]="You can save all your accounts in the options. So you can login easily in each one by the displayed buttons on the starting page. Note that you can switch directly the accounts at the same server.";

	// AUTOMAT
	texte["automat"]["automat"] = "Automaton";
	texte["automat"]["planting"] = "Planting...";
	texte["automat"]["waiting"] = "Waiting...";
	texte["automat"]["watering"] = "Watering...";
	texte["automat"]["feeding"] = "Feeding...";
	texte["automat"]["automatPlanting"] = "Seedingmachine";
	texte["automat"]["automatFeeding"] = "Feedingmachine...";
	texte["automat"]["automatFactory"] = "Factorymachine...";
	texte["automat"]["automatWindmill"] = "Millmachine...";
	texte["automat"]["botStart"] = "Start Automaton-Bot";
	texte["automat"]["botStop"] = "Stop Automaton-Bot";
	texte["automat"]["zonePairing"] = "Zone pairing";
	texte["automat"]["debugInfo"] = "Debug Info";
	texte["automat"]["recoverInfo"] = "Recover Info";
	texte["automat"]["windmill"] = "windmill";
	texte["automat"]["timing"] = "Timing";
	texte["automat"]["general"] = "General";
	texte["automat"]["development"] = "Development";
	texte["automat"]["msgUpdate"] = "There is a new script version of the automaton. Install?";
	texte["automat"]["shouldUpdateAdviser"] = "You should update the script of the Adviser!<br>The Automaton will not run properly.";
	texte["automat"]["valUpdate"] = ["Update","Checks whether an updated version of this Advisor script is available."];
	texte["automat"]["setvalUseBot_plant"] = "Shall the planting machine be displayed?";
	texte["automat"]["setvalUseBot_water"] = "Shall the fields be watered?";
	texte["automat"]["setvalUseBot_feed"] = "Shall the feeding machine be displayed?";
	texte["automat"]["setvaluseBot_foodworld"] = "Use bot on picnic area"; // Harry;
	texte["automat"]["setvaluseBot_farmi"] = "Use farmie bot";
	texte["automat"]["setvaluseBot_lottery"] = "Use lottery bot";
	texte["automat"]["setvaluseBot_windmill"] = "Use windmill bot";
	texte["automat"]["setvalDisableCropFields"]="Block the cropping of sleeping fields.";
	texte["automat"]["settMin"] = "Minimal clicking delay of the automaton";
	texte["automat"]["settMax"] = "Maximal clicking delay of the automaton";
	texte["automat"]["settMin2"] = "Minimal waiting delay of the automaton";
	texte["automat"]["settMax2"] = "Maximal waiting delay of the automaton";
	texte["automat"]["setToDefault"] = "Set to default";
	texte["automat"]["setvalSeedWaitForCrop"] = "Wait planting if next cropping time is less than";
	texte["automat"]["emergencyPlants"] = "Emergency Plants. They are taken first if the needed plant is not available or fitting.";
	texte["automat"]["setvalUseQueueList"] = "Use queue for the fields.";
	texte["automat"]["set12a"] = "Delete \n all zone queue\n data";
	texte["automat"]["set12b"] = "Delete Completed.";
	texte["automat"]["setvalShowQueueTime"] = "Show calculated product ready time in the queue.";
	texte["automat"]["set18a"] = "Delete all mill queue data";
	texte["automat"]["set18b"] = "Delete Completed";
	texte["automat"]["setvalPowerUpActivate"] = "Activate powerups for products";
	texte["automat"]["setvalLotteryActivate"] = "Activate the daily lottery automatically";
	texte["automat"]["setvalLotteryDailyLot"] = "Choose to keep the daily lot";
	texte["automat"]["setvalQuestActivate"] = "Activate the Quest automatically to quest:";
	texte["automat"]["setvalQuestSolving"] = "Solve the Quest automatically to quest:";
	texte["automat"]["setvalFarmiReject"] = "Auto reject farmi below:";
	texte["automat"]["setvalFarmiAccept"] = "Auto accept farmi above:";
	texte["automat"]["setvalFarmiAcceptBelowMinValue"] = "Accept a farmi with an product item that is below the minimal product amount in the rack.";
	texte["automat"]["setvalFarmiRemoveMissing"] = "Remove a farmi with missing products and the lowest yield. Threshold:";
	texte["automat"]["fields"] = "Fields";
	texte["automat"]["titleGeneral"] = "General queue";
	texte["automat"]["titleQueue"] = "Queue";
	texte["automat"]["QueCopyTextHeader"] = "Copy queue";
	texte["automat"]["QueCopyTextHeaderFrom"] = "Copy from:";
	texte["automat"]["QueCopyTextHeaderTo"] = "Copy to:";
	texte["automat"]["QueAddText"] = "Click to add a product to the list."; //Add product
	texte["automat"]["QueAddAboveText"] = "Click to add a product to the list before this product";
	texte["automat"]["QueDeleteText"] = "Delete this product from the list.";
	texte["automat"]["QueClose"] = "Close this menu";
	texte["automat"]["QueCloseAll"] = "Close all open Queue windows.";
	texte["automat"]["QueMin"] = "Lower value";
	texte["automat"]["QuePlus"] = "Increase value";
	texte["automat"]["QueBehaviourF"] = "Click to switch to rack-mode";
	texte["automat"]["QueBehaviourR"] = "Click to switch to field-mode";
	texte["automat"]["QueUpButton"] = "Move Up";
	texte["automat"]["QueDownButton"] = "Move Down";
	texte["automat"]["buttonTimeLine"] = "Show field timelines";
	texte["automat"]["buttonOverview"] = "Show overview of automatons";
	texte["automat"]["repeat_on"] = "Repeat list is ON, press to turn off repeat.";
	texte["automat"]["repeat_off"] = "Repeat list is OFF, press to turn on repeat.";
	texte["automat"]["shuffle_on"] = "Shuffle list is ON, press to turn off shuffle.";
	texte["automat"]["shuffle_off"] = "Shuffle list is OFF, press to turn on shuffle.";
	texte["automat"]["rotate"] = "Rotate: place first entry after the last entry";
	texte["automat"]["stop"] = "STOP";
	texte["automat"]["week"] = "week";
	texte["automat"]["inftext"] = "Runs indefinitely";
	texte["automat"]["removeAllWeed"] = "Remove all %AMOUNT% %PROD%<br>a piece = %COST%<br>total = %TCOST%";
	texte["automat"]["usedFarmFieldsReadyAt"] = "Used farm fields are ready at:";
	texte["automat"]["CloseWindowTimer"] = "Closing screen in :%1%";
	texte["automat"]["CloseWindowTimerClick"] = "Click to reset timer!";
	//%PRODNAME% = product name, %FLDFROM% = field nr from, %FLDTO% = field nr until,
	texte["automat"]["QueDoWork"] = "Zone is done by bot";
	texte["automat"]["QueDontWork"] = "Zone is ignored by bot";
	texte["automat"]["QueueStoped"] = "A culture stop is detected these %PRODNAME% will not be cultured.";
	texte["automat"]["QueStop0"] = "The automatic culturing process will be stopped";
	texte["automat"]["QueStop1"] = "After culturing %FLDFROM% field the automatic process will be stopped.";
	texte["automat"]["QueStopX"] = "After culturing %FLDFROM% fields the automatic process will be stopped.";
	texte["automat"]["QueRepeat"] = "(Repeat mode)";
	texte["automat"]["QueShuffle"] = "(Shuffle mode)";
	texte["automat"]["QueRepeatShuffle"] = "(Shuffle repeat mode)";
	texte["automat"]["QueFieldInRow1"] = "(Nr. %FLDFROM%)";
	texte["automat"]["QueFieldInRowX"] = "(Nr. %FLDFROM% to %FLDTO%)";
	texte["automat"]["QueRoundDoneR"] = "These fields %PRODNAME% are already cultured and will be skipped";
	texte["automat"]["QueRoundDone1"] = "This field %PRODNAME% s already cultured in this turn, <br/>next turn it will be cultured again.";
	texte["automat"]["QueRoundDoneX"] = "These fields %PRODNAME% are already cultured in this turn, <br/>next turn they will be cultured again.";
	texte["automat"]["QueFieldMake"] = "Total:";
	texte["automat"]["QueFieldToGo"] = "To go:";
	texte["automat"]["QueRoundMake"] = "Each turn: ";
	texte["automat"]["QueRoundMade"] = "Made:";
	texte["automat"]["QueRoundToGo"] = "To do:";
	texte["automat"]["QueUses"] = "Uses:";
	texte["automat"]["QueGives"] = "Yield:";
	texte["automat"]["QueFutter"] = "Time discount:";
	texte["automat"]["QueTimeThis"] = "Production time:";
	texte["automat"]["QueTimeToGo"] = "Culture time to go:";
	texte["automat"]["QueTimeReady"] = "Ready at:";
	texte["automat"]["QueTimeFirstReady"] = "First is ready at:";
	texte["automat"]["QueTimeNextReady"] = "Next is ready at:";
	texte["automat"]["QueTimeRound"] = "Average each turn:";
	//For the Mill
	//%PRODNAME% = product name, %FLDFROM% = field nr from, %FLDTO% = field nr until,
	texte["automat"]["MillQueue"] = "Mill Queue";
	texte["automat"]["MillDoWork"] = "The windmill is automatically maintained.";
	texte["automat"]["MillDontWork"] = "The windmill is ignored. Manual maintenance is required.";
	texte["automat"]["MillClearAddAll"] = "Clear mill list then add all recieps";
	texte["automat"]["MillShuffle"] = "(Shuffle mode)";
	texte["automat"]["MillInRow1"] = "(Nr. %FLDFROM%)";
	texte["automat"]["MillInRowX"] = "(Nr. %FLDFROM% to %FLDTO%)";
	texte["automat"]["MillTimeTotal"] = "Total Bakeing time:";
	texte["automat"]["MillTimeReady"] = "Ready:";
	texte["automat"]["MillStoped"] = "There is a stop added to the queue this %PRODNAME% will not be bakeed";
	texte["automat"]["MillStop0"] = "The automatic bakeing process will be stopped";
	texte["automat"]["MillStop1"] = "After %FLDFROM% recipe the automatic bakeing process will be stopped.";
	texte["automat"]["MillStopX"] = "After %FLDFROM% recipes the automatic bakeing process will be stopped.";
	try{
	texte["automat"]["MillTimeThis"] = top.window.wrappedJSObject.windmill_bakeingtime;
	texte["automat"]["MillPowerUpText"][0] = top.window.wrappedJSObject.powerup_bonustext1;
	texte["automat"]["MillPowerUpText"][1] = top.window.wrappedJSObject.powerup_bonustext2;
	texte["automat"]["MillPowerUpText"][2] = top.window.wrappedJSObject.powerup_bonustext3;
	texte["automat"]["MillIngredients"] = top.window.wrappedJSObject.windmill_zutaten;
	}catch(err){GM_logError("texte: Mill from game missing \n"+err);}
	texte["automat"]["number"] = "Number";
	texte["automat"]["lack"] = "Lack";
	texte["automat"]["MillRecipesBought"] = "Total recipes bought: ";
	texte["automat"]["MillRecipesUsed"] = "Total recipes used: ";
	texte["automat"]["MillRecipesBake"] = "Max recipes to bake: ";
	//title
	texte["automat"]["title"]["on"]["general"] = "Show general queue only<br>+Ctrl: Show general queue";
	texte["automat"]["title"]["off"]["general"] = "Show general queue only<br>+Ctrl: Hide general queue";
	texte["automat"]["title"]["on"]["farm1"] = "Show first farm only<br>+Ctrl: Show first farm";
	texte["automat"]["title"]["off"]["farm1"] = "Show first farm only<br>+Ctrl: Hide first farm";
	texte["automat"]["title"]["on"]["farm2"] = "Show second farm only<br>+Ctrl: Show second farm";
	texte["automat"]["title"]["off"]["farm2"] = "Show second farm only<br>+Ctrl: Hide second farm";
	texte["automat"]["title"]["on"]["farm3"] = "Show third farm only<br>+Ctrl: Show third farm";
	texte["automat"]["title"]["off"]["farm3"] = "Show third farm only<br>+Ctrl: Hide third farm";
	texte["automat"]["title"]["on"]["farm4"] = "Show fourth farm only<br>+Ctrl: Show fourth farm";
	texte["automat"]["title"]["off"]["farm4"] = "Show fourth farm only<br>+Ctrl: Hide fourth farm";
	texte["automat"]["title"]["on"]["windmill"] = "Show windmill only<br>+Ctrl: Show windmill";
	texte["automat"]["title"]["off"]["windmill"] = "Show windmill only<br>+Ctrl: Hide windmill";
	texte["automat"]["title"]["on"]["forestry"] = "Show forestry only<br>+Ctrl: Show forestry";
	texte["automat"]["title"]["off"]["forestry"] = "Show forestry only<br>+Ctrl: Hide forestry";
	texte["automat"]["title"]["on"]["foodworld"] = "Show picnic area only<br>+Ctrl: Show picnic area";
	texte["automat"]["title"]["off"]["foodworld"] = "Show picnic area only<br>+Ctrl: Hide picnic area";
	texte["automat"]["title"]["on"]["type0"] = "Show fields only<br>+Ctrl: Show fields";
	texte["automat"]["title"]["off"]["type0"] = "Show fields only<br>+Ctrl: Hide fields";
	texte["automat"]["title"]["on"]["type1"] = "Show stables only<br>+Ctrl: Show stables";
	texte["automat"]["title"]["off"]["type1"] = "Show stables only<br>+Ctrl: Hide stables";
	texte["automat"]["title"]["on"]["type2"] = "Show factories only<br>+Ctrl: Show factories";
	texte["automat"]["title"]["off"]["type2"] = "Show factories only<br>+Ctrl: Hide factories";
	texte["automat"]["title"]["on"]["all"] = "Show all farm queues";
	texte["automat"]["title"]["off"]["all"] = "Hide all farm queues";

	//help
	texte["automat"]["help"]["intro"] = [,"This script can be used to add automation to the cultivation process."];
	texte["automat"]["help"]["botStart"] = ["How it works","If you click the \""+texte["automat"]["botStart"]+"\" button at the bottom of the page the automation process will be started.<br>You even can continue gaming as long as nothing is ready. Then the bot begins to simulate the clicks a user does. During that period you shouldn't interact."];
	texte["automat"]["help"]["field"] = ["Field","At the bottom of every zone an icon is displayed. If the icon shows <div class = \"kp"+PRODSTOP+"\" style = \"display:inline-block;\">&nbsp;</div> the automation process is stopped or will be stopped at the next culture moment. There will not be any culturing for this garden until you select an other product. When a product icon is displayed this product is cultured next at the field."];
	texte["automat"]["help"]["queue"] = ["Queue","If in the option menu of the Automat the queue checkbox is checked, clicking the product culturing icon of a zone will display a queue where multiple products can be queued. If the background of a queue item is red this item will not be cultered because a production stop item is added somewhere before in the list."];
	texte["automat"]["help"]["queueRepeat"] = ["Repeat","Enabling the \"Repeat\" check box will enable the \"loop\" feature of the queue."];
	texte["automat"]["help"]["queueShuffle"] = ["Shuffle","Enabling the \"Shuffle\" check box will randomly culture a product from the list."];
	texte["automat"]["help"]["stable"] = ["Stables","At the bottom of every zone with a stable an icon is displayed. If the icon shows <div class = \"kp"+PRODSTOP+"\" style = \"display:inline-block;\">&nbsp;</div> the automation process is stopped or will be stopped at the next culture moment. When a product is displayed this product will be used to feed the stable. Click this icon to choose the feed amount through the slider or change the feed product by selecting the product."];
	texte["automat"]["help"]["factory"] = ["Factories","At the bottom of every zone with a factory an icon is displayed. If the icon shows <div class = \"kp"+PRODSTOP+"\" style = \"display:inline-block;\">&nbsp;</div> the automation process is stopped or will be stopped at the next culture moment. When a product is displayed this will be the produced product of this factory."];
	texte["automat"]["help"]["zonePairing"] = [texte["automat"]["zonePairing"],"In the \""+texte["automat"]["zonePairing"]+"\" menu of the Automat the radio-buttons controle the pairing of the zones. Also the general queue is extended to allow multiple general queues."];
	texte["automat"]["help"]["windmill"] = ["Windmill","The windmill queue works the same as the zone queue but instead of products recipes are baked.<br>As extra the mill queue has a <div class = \"queueButtonAddAll\">&nbsp;</div> button which can be used to clear and refill the queue with all available recipes that were bought and where there are enough ingredients in the rack to bake them.<br>If the background of a queue item is yellow then there are not enough products to bake all these recipes.<br><br><b>Note: </b>For first time user that have already bought recipes. Go to the miller or the trading lady screen so the bought recipes can be stored into the system."];

	
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
	top.unsafeData.texte=texte;
	top.unsafeData.LNG=LNG;
	top.unsafeData.delimThou=delimThou;
	top.unsafeData.regDelimThou=regDelimThou;
	top.unsafeData.regDelimThou2=regDelimThou2;
	top.unsafeData.regDelimThou3=regDelimThou3;
	top.unsafeData.delimDeci=delimDeci;
	top.unsafeData.regDelimDeci=regDelimDeci;
	top.unsafeData.dateFormatDM=dateFormatDM;
	top.unsafeData.dateFormatDMY=dateFormatDMY;
}catch(err){ GM_log("ERROR\npage="+location.href+"\n"+err); }
},false);