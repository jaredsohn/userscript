// ==UserScript==
// @name PNO Nefertiti Nile script
// @namespace 
// @creator Muhha!
// @include http://*.playnileonline.com/*
// @exclude http://playnileonline.com/*
// @exclude http://www.playnileonline.com/*
// @description Interface changes for the browser game Play Nile Online
// @version 	12.04.09.2
// @date 2012-04-09
// ==/UserScript==

/****************************** ATTENTION ******************************
 I  stopped  playing  this  game a long long time ago, and (sadly) never
 really got to get into ripping this apart and rewiring it as I saw fit.
 Although I enjoyed the process of working with ArmEagle, him and I have 
 both  stopped  playing  the game, and I, for one, simply don't have the 
 time  to  invest  in  this  anymore.  If  anyone  wants to take it over 
 properly,  email  pegasus@pimpninjas.org  and  we  can likely make that 
 happen.
 ****************************** ATTENTION ******************************
 *
 * Makes some handy changes to the game Play Nile Online
 * *** Disclaimer ***
 * - By using this script you acknowledge that the author of this script takes
 * no responsibility for whatever damages or legal issues the use of this script
 * causes the user.
 *
 * *** Featuring: ***
 * - Labels for all plots showing the plot name, level and (max) workers.
 *	This can be disabled in the Options panel in the top left.
 * - Clicking on all resources now opens the first plot making that item.
 * - Similarly added buttons (to the left of the cities bar) to direct link
 *	to the Warehouse and Exchange. (Long nome+city names would wrap, now
 *	limiting the width and preventing wrapping.)
 * - At each resource a 'timer' is added.
 * -- When this resource is (said to be) used more than produced this will show
 *	 the time till you run out of the item.
 * -- When the net production is positive this will show the time until the
 *	 warehouse will be full (~ if this is greater than 500 days, or 'infinity').
 * -- When the warehouse is being upgraded the current level is not shown in the
 *	 tooltip. But it is retrieved and stored when you open the warehouse view. It
 *	 doesn't update the resource view right there and then though.
 * - Similarly the upgrade and found city windows will show you how long till each
 *	resource is completed for you to upgrade.
 * - With v0.40 the found city window had this market overview added. But the data
 *	wasn't styled for easy reading. This is now reparsed into a list ordered by
 *	the 'relatively' cheapest resource.
 * -- Also added a button (next to Market/Exchange) to show the found city screen
 *	 for your current city.
 *	*** NOTE *** I did NOT test what happens when you try to found a city ***
 *	*** 'over' your current city. Do NOT try to!						  ***
 * - The 'new scroll' animated icon isn't very clear. When a new scroll is
 *	received the background of the city window will light up. And optionally
 *	an alert will popup (blinking the browser when inactive - default: off).
 * - Changed the server clock (upper right corner) to use a more acurate way
 *	of keeping the server time (by default this has a skew).
 * - If 'Barracks' isn't at the start of the title, remove it (shows just
 *	'Archers/Charioteers/Spearmen (x/y)').
 * - Made small-caps for Scribe Wall optional since the game changed it to normal
 *	with v0.47 (last part of the CSS code near the end), as suggested by shasamrat.
 *	This is optional and you have to set MUH.WALL_SMALL_CAPS to true, just below here. 
 * -- Added a config option to keep the Small Caps if wanted.
 * - By default Scribe Wall text is bold again now. Change with MUH.WALL_BOLD.
 * - Like with Warehouse limits, same for Exchange (Ships) and Palace (Laborers) to
 *	reach the limits.
 * - Added time left display of minutes.
 * -- Coloring time left red when <=12h and orange when <=48h.
 * - Can set the market 10% bread tax in the Found City Market Overview by setting
 *	 MUH.MARKET_OVERVIEW_TAX to 1.1. By default it is 1; basic resource cost.
 * - Also added a tooltip to the ordered listings explaining what each part means.
 * - Showing the basic production bonus next to the [!].
 * - The script should now be working with Monument sites!
 * - The transports overview now lists the totals of incoming goods (and added to
 *	city stock in parenthesis).
 * - Changed my 'Exchange' icon to a new one in a city. One half opens the Exchange
 *	normally. The bottom part opens the Exchange and then switches to the
 *	'To Monument' view.
 * - In the Exchange and Trade forms you can now click on a resource icon. That will toggle that
 *	resource's background color. This can be used to set per city what resources
 *	you should not trade away. (Sometimes I or friends would send out gold in a
 *	gold:emeralds trade where they were supposed to send out the emeralds and get
 *	the gold)
 * - Thanks to Pegasus added the option to toggle between time left or limit of resources.
 * - Added the option to ask for confirmation on trades with other people
 * - In this update I added the start of something completely NEW!: Store Trades
 *   - In the trade windows with other people a new button is added 'Store Trade'. This gathers
 *	  all data from the form and stores it (in a cookie - thus amount of stored trades is somewhat
 *	  limited, but you'll be warned).
 *   - I added a new button which opens a new window that lists all your stored trades per city.
 *   - - You can deleted them with the [x] on the right.
 *   - - Or open the stored trade in a trade window with the icon on the left.
 *   *** You don't have to be your the trade's 'source' city, the trade will automatically take place
 *		from the right city (see the amount of ships) when you submit. But after that the game will
 *		switch to that city.
 *   - - I do plan to add some more features, like setting a note, a 'timer' and make this work for
 *		your inter-city trades.
 * - Found a new position for the extra buttons.
 * - Added an overview window (access trough the new Horus' Eye button). This shows an overview of
 *	resource production, laborers and plot levels
 * - Added access keys to the tabs of Scribe Wall, Game Log and my Overview window. The access keys are 1-3. 
 *	Based on your browser and settings they require a different mod-key (ctrl/&alt/&shift) to be
 *	held down while being pressed. I don't think 1-3 will cause any issues with default browser
 *	behavior. But you can easily disable it in the options window.
 *	Thanks go to Kosminhotep for suggesting this.
 * - In a Bandits Outpost window you can set that outpost, which allows the use of the new button on the
 *	resources 'Units' list header. Then clicking that will open said bandits outpost directly. This
 *	allows for easy contribution of troops from any city or monument, without having to go trough all
 *	the nomes.
 * - In a Bandits Outpost window each player's contributions are calculated to show the rewards in luxury
	 *	goods and bread they'll receive. It also shows the percentage of the current total 'donation' for
	 *	each contributor (counting charioteers double). And it shows the percentage of completion of each
	 *	type of troop.
 * - Added a toggle 'Include Transports'. If enabled this will include incoming resources for the upgrade
 *	UI and Overview with the stored amounts (if you've viewed the Transports window of course). For the
 *	upgradeUI this does not take transport times into account for the time estimates. The toggle does
 *	not auto-update the view.
 * - The Overview (Plots) now shows what plot type is being upgraded in a city by coloring the background
 *	and showing the time left (from last city-view, does not update, disabled by default)
 * - The Stored Trades window now lets you reset a timer-of-last-sent ( '?' for existing trades )
 * - On the market showing the relative price of goods to their production cost, like in the city founding
 *	screen.
 * - When trading on the Scribe Wall, you have to click the player name to get their list of cities to send
 *	your ships. This moved you away from the Scribe Wall. I now scan the Scribe Wall chat and replace
 *	the link that opens the player profile and show the important (trade) details in a small popup now.
 *	For easy use it closes on any link click.
 * - Control-clicking the player name in the Scribe Wall will insert that player's name in the chat field.
 * - You can now set words that will highlight a row in Scribe Wall (click 'Wall Highlights' in the options
 *	box to configure). The background of the row will be colored red and the amount of 'hits' is shown
 *	in the top right. You can use this to hilight for your own name, friends, or specific goods.
 *	* The first two entries will have special colors (blue, bright red). The rest is dark red, but you
 *	  can edit the script and set more colors/styles yourself (#chatlog .hl2 - the number is the 0-based
 *	  index of the highlight word you entered).
 * - Using the same configuration option as for the plot labels, the nome view show labels for cities and
 *	monuments now too.
 * - When enabled, you can drag around the Scrolls box, Allies Manager, Papyrus Scroll, Trade (with others)
 *	window, my Options box and my Stored Trades window (after ctrl-clicking to toggle dragging). The
 *	positions are stored between sessions. Some of these windows are re-styled to make them take less
 *	space. Shift-click the elements to toggle their size.
 * - Added a filter option to the Game Logs. No fancy search options/combos, but you can search for both
 *	text in the log entries, as well as the transported resources.
 * - You can directly open the Transports window of a city or monument by shift-clicking it's icon. That
 *	will also change the bottom UI. This way you can quickly get the script to scan all production and
 *	incoming goods. This is handy for getting all resource data for the Overview window, saving half the
 *	clicks and even more time.
 * - As has been suggested some time ago, I added a button to the Labor Tool. This will show and set the
 *	amount of laborers needed to (at least) break-even production of the resource, for all resources but
 *	Limestone. For Bread, Bricks, Baskets and Pottery this tries to set the used resource to BEP instead.
 * - Changed all repeating scans into hooked functions (hooked into the game's functions).
 * - The Immortality cost is parsed for completion (time) now too. But only when you view it in a level 22
 *	palace.
 * - Coloring required warehouse level green or red based on whether you meet the requirement (when the
 *	warehouse level is known, else it stays unchanged).
 * - Showing total bread value (and amount of orders) in your sell orders list (in parenthesis in the header).
 * - Added a toggle that lets you show the resource production in a day instead of just one hour.
 * - When you have the (compose) mail form open (to the trade contact) while storing a trade, the Stored Trade
 *	entry will now have a mail icon. Next time you send such a Stored Trade, a pre-filled mail will show up
 *	after the trade window closed. You only have to submit the mail yourself then.
 * - The Labortool form was a weak slave, submitting to nothing from the textfield. Now it acts like the 
 *	"Apply" link. Now you can adjust the number in the textfield and press Enter to apply. 
 */
function DOM_script() {
	var script = document.getElementsByTagName('head')[0].appendChild(document.createElement('script'));
	script.setAttribute('type', 'text/javascript');
	return script.textContent=DOM_script.toString().replace(/[\s\S]*"\$1"\);([\s\S]*)}/,"$1");
	var MUH = {};
	// create container Object to prevent variables and function from going global

	MUH.VERSION = '12.04.10.1';
	// **** Configure options: ****
	// show labels over the plots
	MUH.SHOW_LABELS = true; // options
	// show labels in the nome view
	MUH.SHOW_NOME_LABELS = true; // options
	// popup alert for a new scroll
	MUH.NEW_SCROLL_ALERT = false; // options
	// display either time till limit (true) or the limit itself (false)
	MUH.RESOURCE_LIMIT_TIME = true;
	// Send Trade confirmation box
	MUH.TRADE_CONFIRMATION = false;
	// store last 'used' bandit camp
	MUH.STORE_BANDITS = true;
	// include transport amounts in upgradeUI and Overview
	MUH.INCLUDE_TRANSPORTS = false;
	// make certain UI elements draggable, store their position, make scrollsbox smaller
	MUH.DRAGGABLE_UI = true;
	// show production numbers per 24 hours, instead on just 1 hour
	MUH.DAY_PRODUCTION = false;

	// show break-even production laborer assignment
	MUH.LABORERS_BEP = true;

	// Option to enable the Scribe Wall 'Small Caps'. If you actually like them, set this to true.  
	MUH.WALL_SMALL_CAPS = false;
	
	// scan for new scroll notice
	MUH.SCAN_NEW_SCROLL = true;
	// style for the #wrapper div when there's a new scroll
	MUH.NEW_SCROLL_ALERT_STYLE = 'background-color: rgb(100, 20, 20)';
	// show production details
	MUH.SHOW_PRODUCTION = true;
	// go trough all the plots (required for MUH.SHOW_LABELS)
	MUH.PARSE_PLOTS = true;
	// addup all incoming transports into 1 line.
	MUH.TOTAL_TRANSPORTS = true;
	// scan for an exchange. (Allow for) alert for resources you don't want to send from this city
	MUH.EXCHANGE_ALERTS = true;
	// Multiplier for resource value for the 'Found City Market Prices'. Default is 1. Feel
	//  free to change it to 1.1 to add in the market tax cost when buying resources. 
	MUH.MARKET_OVERVIEW_TAX = 1;
	// Allow setting of access keys. 1-3 for Scribe Wall; General-Nome
	MUH.ACCESS_KEYS = true; // removed/override to default enabled
	// Show rewards in bandits window
	MUH.SHOW_BANDITS_REWARDS = true;
	// scan market, show value difference
	MUH.MARKET_SCAN = true;
	// scribe wall user detail popup
	MUH.USER_DETAILS_POPUP = true;
	// logs filter
	MUH.LOG_FILTER = true;
	
	MUH.debug = true; // to print or report exceptions at all
	// If MUH.debug is true, this defaults to silently printing errors, if set to false it will show the exceptions in a popup
	// The only problem is, that all the AJAX work prevents Exceptions to pass trough.
	MUH.silent_debug = true;

	// store timers
	MUH.timers = new Hash();
	// guard
	MUH.waiting_for_scroll_alert_confirm = false;

	MUH.plotResourceLink = new Hash(); // store plotid's by resource name
									   //  (stored per city) note: do not confuse with MUH.mapPlotResources
									   //  first index by city name, then to a Hash indexed by resource name
	MUH.resourceLaborers = new Hash(); // store amount of laborers working on a resource, note that multiple plots can produce the same
									   //   key is resourcename, value is an array with the amounts of workers/limit (hash with those keys) producing that resource in that city (for multiple plots)
	MUH.resourcePlotLevels = new Hash();	// Store plot levels per city.
										//  Second key is resourcename (even set for non-producing buildings like palace, pyramid, sphinx (laborers) and warehouse (warehouse)), value is an array with the plot levels producing that resource in that city (for multiple plots)
										// Can store multiple (same) plots and does so in an array. This conflicts a bit with using this to store plot levels from the 'header' when a plot is being upgraded. Only one plot level can be set that way then. 
	MUH.currentProduction = new Hash(); // store all town's current production, so it can be used in estimating time to
										//  gather resources for an upgrade. Indexed by city ID then by resource name
	MUH.incomingTransports = new Hash();	   // store incoming transports per target city ID, like currentProduction
	MUH.cityUpgrades = new Hash();  // store plot upgrades per city. Key is city ID and then object.plotName, object.upgradeTime 
	MUH.mycities = $H({}); 			// store cities (id, name, type) by their ID
	MUH.citiesWithStele = ""; // add city IDs with leading whitespace to store cities that have a stele, to be used when the cityvies is not open and the resource panel reloaded
	MUH.storedTradesWindow = null;
	MUH.overviewLastTab = undefined; // store last selected tab
	MUH.currentCityID = undefined; // update from showBotUI

	MUH.resourceProductionCost = new $H({'Wheat': 0.3, 'Clay': 0.48, 'Reeds': 0.48, 'Bread': 1, 'Leather': 2.4, 'Bronze': 2.4, 'Cedar': 2.4, 'Kohl': 2.4, 'Henna': 2.4, 'Oil': 2.4, 'Emeralds': 2.4, 'Gold': 2.4, 'Bricks': 2.64, 'Pottery': 3.36, 'Baskets': 3.36, 'Cosmetics': 7.2, 'Perfume': 7.2, 'Jewelry': 7.2, 'Sandals': 9.12, 'Sculpture': 9.12, 'Limestone': 2.4});
	// Resources not in these arrays are assumed to be unlimited
	// new warehouse limits for resource groups levels 0 through 19, skipping 20-21, including 22
	// (level zero lux good storage still uncertain)
	MUH.warehouseLimits = [
							   ['Clay Wheat Reeds Bronze Cedar Limestone Kohl Henna Leather Oil Emeralds Gold', [180, 200, 400, 600, 1000, 1600, 2600, 4000, 6000, 8000, 11000, 14000, 18000, 22000, 27000, 33000, 39000, 47000, 56000, 64000, 77000, 99999, 99999]], //gamecode-forced limits 100000, 160000]],
							   ['Bricks Baskets Pottery', [90, 100, 200, 300, 500, 800, 1300, 2000, 3000, 4000, 5500, 7000, 9000, 11000, 13500, 16500, 19500, 23500, 28000, 32000, 38500, 50000, 80000]],
							   ['Sandals Sculpture Cosmetics Perfume Jewelry', [45, 50, 100, 150, 250, 400, 650, 1000, 1500, 2000, 2750, 3500, 4500, 5500, 6750, 8250, 9750, 11750, 14000, 16000, 19250, 25000, 40000]]
							  ];
	MUH.exchangeLimits = [0, 5, 10, 20, 30, 40, 50, 60, 70, 80, 100, 120, 140, 160, 180, 200, 240, 280, 320, 360, 400, 460, 500];
	MUH.palaceLimits = [0, 30, 45, 65, 90, 120, 155, 195, 240, 290, 345, 405, 470, 540, 615, 695, 780, 870, 965, 1065, 1170, 1280, 1395];
	// map (part of) structure name to resource name (even set for non-producing buildings like palace, pyramid, sphinx (laborers) and warehouse (warehouse))
	MUH.mapPlotResources = new $H({'Pyramid': 'Laborers', 	'Sphinx': 'Laborers',		'Warehouse': 'Warehouse',		'Market': 'Market',	
								'Palace': 'Laborers',			'Exchange': 'Ships',
								'Spearmen': 'Spearmen',			'Archers': 'Archers',		'Charioteers': 'Charioteers',
								'Clay': 'Clay',					'Wheat': 'Wheat',			'Reed': 'Reeds',
								'Bronze': 'Bronze',				'Cedar': 'Cedar',			'Limestone': 'Limestone',
								'Kohl': 'Kohl',					'Henna': 'Henna',			'Tannery': 'Leather',
								'Oil': 'Oil',					'Emerald': 'Emeralds',		'Gold': 'Gold',
								'Bakery': 'Bread',				'Brickworks': 'Bricks',   	'Basket': 'Baskets',
								'Pottery': 'Pottery',			'Sandal': 'Sandals',		'Sculpture': 'Sculpture',
								'Cosmetics': 'Cosmetics',		'Perfume': 'Perfume',		'Jewelry': 'Jewelry'
								 });
	MUH.plotImages = new $H({			'Palace': 'palace_4',
		'Reed': 'reeds',					'Tannery': 'leather', 				'Emerald': 'emeralds',
		'Spearmen': 'barracks_spearmen',	'Archers': 'barracks_archers',		'Charioteers': 'barracks_charioteers',
		'Bakery': 'bakery_3',				'Brickworks': 'brickworks_3',  		'Basket': 'basket_shop_3',
		'Pottery': 'pottery_shop_3',		'Sandal': 'sandals_shop_3',			'Sculpture': 'sculpture_shop_3',
		'Cosmetics': 'cosmetics_shop',		'Perfume': 'perfume_shop',			'Jewelry': 'jewelry_shop_3'
		 });
	// all others get _3
	MUH.labelPositions = new $H({'plot1': 'left:850px;top:270px',	'plot2': 'left:660px;top:255px',	'plot3': 'left:738px;top:308px',
								 'plot4': 'left:582px;top:350px',		'plot5': 'left:426px;top:224px',	'plot6': 'left:625px;top:150px',
								 'plot7': 'left:278px;top:130px',		'plot8': 'left:598px;top:75px',		'plot9': 'left:280px;top:272px',
								 'plot10': 'left:418px;top:74px',		'plot11': 'left:200px;top:336px',	'plot12': 'left:120px;top:262px',	
								 'plot13': 'left:428px;top:328px',		'plot14': 'left:502px;top:112px',	'plot15': 'left:186px;top:184px',
								 'plot16': 'left:64px;top:212px',		'plot17': 'left:102px;top:147px',
								 'mplot5p': 'left:421px;top:244px',		'mplot5s': 'left:421px;top:244px',
								 'mplot6': 'left:165px;top:295px',		'mplot14': 'left:800px;top:240px'
								 });
	MUH.images = $H({
		'anchor': "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAZCAYAAAAv3j5gAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kBHBcPOGi5N3QAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAFmklEQVRIx42WW4heVxXHf2vtc5szl2RmMpeOxuYrEvIyUkNrY5vaTIK90FIrbcEHpYWChSr4UEUNRgoKoi+CBO2DVNQKii9FSx5aSApt7RDSUDPpdHJpPqdtpknmkib5Zr7LOXsvH77JdKbJVP9w4MBZa//XWv+91jrCJ2Dnf3Ge4lIXrbrgW0IwT6SCF0fsmpRlipnHm+DEEBFAseBBlEQCObMy+Nstq8+VFYK5/dPMnfHMHD3MUuMtGuVFIMJbhmpJRIsgMViJN4eYB41RCsw8aIKFnDTZzkDHfQwNddMZT8vQH7esENn8b6aZPjzNzImfy/G3Dsd7i6gMOMAiodaOZNna2ICANy44IcdYXP6SArlGdJ0t7u3sr/Iz6tHXyaN3pfLC59tnTD1+zF68ZSyL6G/XAVIh2pLFrH7s6G2JTdzjDtqujE3ah5JnwkgmxE6InJDFQCbk7Ns4bC/t3G9H7mkAiE098h7z889l9x/6p13iTQwAN5LFfnWNq6+OfYbS/wDkSwAorxD5Zxm5dK5SmWh9UuuLRTFSLfdc7n25eI7U3aTQUHzrIJc444CRLOYakioK9k1MduLsILG+QuABzN0PnY7roDeOZ3rHziQstl7AM6jUWiV5c7oJF4fSmOviw+0ZZttwdpqO6M906e8ReY/AKFfyvB3IddGBhfOoqFKEQEOTFCLWw1xRAu8T5EYa/m5qxVcx24wxS2iGdf2K4EjjAqdXI2niYOO6DqMTBYn+DbXzeJ6kkKcQOUPCi2yoN9f1S11J7ARMFcRIJHiYW8++UsEY6pgic0+DTKP8hw55hrz5LhxtVCpcP6vQ9DQLAQmKmSKmTvkfOBDokI/AFoFLdLlZehZr65IAlFFJFoGAYiituOUDmz6NplLB1uhRXwI2+/X1KXIAWkExE0XwxGXE/wPxArYq9/fdurYxEExJNIBYhIjQSlacq//6ygCROs7NL1QevLYRQVaVarOHidX9JsyPjRDX6/SML/CotPtFRBQzIy4/LkFgjCX7Hb19j1WP3D7yKT0C4wt6laB6aNcwZ+/6FrXwPPXsizDqiLRF4Q0zU0BR7zIlXx6eEbCN0n5EI32cuTs7q9WPp/wa7Lj6sislsW9TsBfjRlp0wxWhDO0p2N4jCIuRNgJL7RnmPMJZoIH6KSK3Soce1mrUt1zGhifYaSBBOUNss3ww7InUaJpgQRQxTyy2cr17WofI9GmUNyj0KRrcDDuyahWhVsqKRuaMU6eiahXhXHYHnidw8hKx/JDUH+fYuAGO3DyippQI9dL5QAFA1+uzDM69Q4fux0KDZvg+Z9MHqN0xQCTRSkYSKb3DfXx410M0wz5EaiTlH0gap+g9f3nrdwqhDCVlSIkkLDtGfU6ZWekXJlrVf4xOMtz/E+r2PQp7hvno32j5DsgggTpLPIbpzQRGcXKQRP9EUpuid2ixUhm36o5h8Ekn3R39ZFGplDQJyZ0+pnNNgz440eLc/CT98mMS24twBc9OIELpJISdIEvE/JQu/0uGykl646VK5UD7BntN2aid3DD4ZdAL7VX+xp5JehqP8OQHJytHZsprdtGFPR34IkfdIKXvIVIDm6M7nqeot9gQN5LNL6fqCZHQiIT8o9s+B3+5+xa6uv8qA78eaet6+N6GXfzGAXtt93bbtXXIbo2TXNkUC9tiYVuqELn2jk4/S854zOv2BfIEUoemiosFlwjkgnQ5UpvfN2oXnz9kJ7775tq/oNMPG91Dk7iuZ5k88SqazTBQK3ltyrh9t1GbUk7mwjZKqrPK8A0xx6c9u28tqU0ql/sifBLY0n0T/V/bRbn0BAtvq2z91dY1RAB28iFDB4wsXSBLLuCccbk0UglEGmFaEpmjJZ7YO2rOk5YOp47SYjQFc/00nWfm7WOy4+9jV8/+L8HzcA1x3eJsAAAAAElFTkSuQmCC",
		'anchor_pyramid': "data:image/png;base64,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",
		'coins_boxes': "data:image/png;base64,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",
		'scroll': "data:image/png;base64,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",
		'eye': "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAZCAYAAAAv3j5gAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kCAQQFLQQ4064AAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAHC0lEQVRIx4WWbWyeZRXHf+e6X5+Xts/aPl3LaLtBNhAihI0lDiMbEOcLKkNhBmIQnYgTZRGRDxpdMSQqH0gQgQVFg0FMBiaE4BSNoowXg6zgso22wPoytrZP+7TPe5/7fu77Pn4oGwMS/SfXt5P/Odd1/tf5H+F90NmfzNIqZwmXhDgUEo2xjRCLhWMFRJGHakysgiWKiAAGTWIQgysJaeak54HVp/PKqQTzv5hk/mjMieGXaTRfoxktAjax+hgTYROSiAMaEauFaAzGwdBCdRaMgyY+nnsu+dQ36TkjQ9Yck5WPvJtQiz+f1OEvPadPb9zE/4EOYfZei6WnFelA+uQ5FTd2U0GPfD7W8W1vnrqRjtx4kDcP7Upte+XlZkS9F+maQYsniScGcTv7SLd3401OkbMibCtDJZumXhuj0beCQLYTf6Cov23ZQ4d3o1z8jC86cs0UxeKv/SufvVPLSKgkALoXq5ymvVqhXwMuzvawzctzIWCjqEASlJioFnhKbPa7eSYaxyg/8hXC3aDHdbubphiv+GvrMTzrLNGRz7xNYfF6f/ML+4d34+Q302mBXZ+lz09xSzrPpaq0JEGThLhVp2yU0PLIiYuPhYrBShpMl06wR1K8ku39UPvi5Ovza17oKfLxsz5HR+qnNrUwIh3M3HsTtreajek0v0TJuv20RLDDMkcbVe73ckwEdTpaZdZZ4ONzNNXJ8STACUp8tKOf7Z1rGdIYsF43+TM5Xhyo7uyK4gJGjE0rSYiNfmITlib0ieInEXb1bfZFCQcdYUO2i9tNirTfTsasIgcYVZY0ohgp001lX6vCLfNT5O2YC2yXVa0GI95Ru8l5TgvLYC+3LeDfGVoXlDmwOMWPHcOWVI6LnXa2KiRhmTdKb/GE45DJreU2EVLNImPVAo+4Hus6z2ZHEnGdX+dfYcCLSzEjWFTinmQB3x4ANTaI4kpy1iLZbJrrcv3cLEJHUGSidJTfGZcnBabmZwhzeda3hWwXQ3dUYzhu8nTLplqY4lE/4YuZHj6ZW8O1QDMRji3azR2EoSHlJjaqBlGTLZHEHrU4YN5OY9kZfCmSaIJmV6JnLNKq1zlQGOG7tnB22OTv7Q2KqUG84gIhStU4pMMyR+uzPBH7/MV7zZ/mU86ZyLJUDaEjN+6l+eQuHpYsj1WLtLVmuCa7ik87GbYF8xwPffY5bRxQZQaLgrFIN9NcZbe4umcNGzTBXZrh+UaLO8swNfo4zWunu5UrEoOvYiPE2FH86jDaewN1oK5DLBzM8IC7it9Wxlmb8djRfQ7fUAERFEDBFqVLI2Rpjle0Ras6xzOpGSYvHKIBoJeohWsSELUREULXXLQeefirZAc3kCnWsc+cptp5BXP8g2KpxKFKkY4wIJ2EuB5YGC7KdvO9Vp2xpRKPdQxwR32ORr3ztAlhZHlMiYhBVXGieNdmOlbk2WXgn36G/S2HodG76WUL8YqrKfVdydTgQUYXRngjikilUnwhavJWZYG7xLDOcun1OjjfSpHbuxdLp9cLtoFWrKiqAUwQBO6aNQxkz+D6RoGZuIHl5thEG92Pb8e8MxT1pXa8nkE2tHXyA2NBaYEhYziW7uJSsenM9PNl2+Om8yfI0zsMUQKOJSz7CCJ1sX1ltUbUlsrcF1V5MapxWIXKkfNRBTl8P9n+Xja3rWI3gpSK3DVb4JBx6PI7OQ/BkZg4CplcalARQeX5yYhABU3ERjTGRi2LQARpJRwL6nw7CIjO7aK6exZz7Pf0pGFrboDbwjmOlOe5J27wH8DQYCNCSmNqjVme8tP8acMQS6f6lNYYMWqIEBKhmvCWGpyUz3aTpc1fiTOfY+XMhazP5nioq5/bm/O8JBZ3TL7N8NpbCc7pwXHSrNcEWiVeblR5sG+MBWFZmQBEiYctiQ1qXMvLFUYZGejmD+0D3EDIVo2oGY+0tONqQqM4zo+CGs+t+zrFyz67TNRwsVMug0mT6cos98Z1JmRo2WZOoS3VhW9HhoiAxP3YVfex0Czx0MIod7cazGBwG3O8uvA6368UuLpV5I/n3Ezx5D8CyECcNJkojfOrqMn+tbcSfMCS+3o2gSksO+FLW0cAhsC8eA+p8p/pnN5Hfvw35A4P4Z6+W7zHQfdijd7DqpGf0ab63hi9ZMDT8a9dqnPfOfGOt+/M6tjOuo7trJ8K2uiYtMF1BN8R/P+1QwwNLcv/dGQturX4ww/r4qPP6ui3Dry7M4ztzEI0S4czgZXdw5HR/Rj/BPlaxPMjyiWXK7URw1haOBcYn0vo7XM4NBlw+UaoHTFUOl1iV1ndNkjXVVuIGjtYOGxk3d3reP+T6Ng2xeQV31vAdwtYllKJFE8SbGOjJsJWi1BinNiiZsV4kYVlLCJ1MB6o1UVgxZw4fFA+8vhlJ7n/CynmSMgEUJc5AAAAAElFTkSuQmCC",
		'spearshield': "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAPCAYAAADtc08vAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kCDQgVGSyCc5YAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAADKklEQVQoz3XTSUxTURgF4HNfSymvIBXQImWmaERpsE6VmQZEkZggoqio4EqDBhJ0oQsNDlHjhjjFaIxxITgADoiJWgZRcQKMEwiEhqGgYKWAWqB9715XkorxbP/ky1mcn8ApC1Vq7uNgP8V/4o7ZAbtzl62yfO29mJiwAP6+coH8OW5MWExuPGlmACTpcSkFBXnzJleE2ZjCdxHNL26ccb607PSJwuw6XbioXxrhQq+V10HKB3MEADYnR6PU2AgAyIqNrEqNUaZrwyhqWn6ASXj4zvRA3zePptUG1awgb0dQ87t21t3TT7wDk44S54px0bmqvZmjXyPneSIkeqc9PT0L1Y19JFErF7asDHYzxC3DoGXYXl71RBaoiUZ8fJo/5wzM92qtUs10wDtyGwPvJ9uTmygDIDVZOLdJJqG3qmpxv65T5h+wAHnrlyTp1hb0/wWEhc5xEQURcjmPYXMbtNoInCxaTS6VHECUbjnXO6IQQiKSLzZ3BRg89cfqS/IXcxJnIDUpZkdDQ73aR+lK5MwCq+kpYpdqmDYmi3S2GEGo28SuI9dXfOhs7T6+Z51k39layhXnZ04BZrOFc9h/4dfoIMatJrS1fsSNylpYv3QzJozh5ZsOHsjgAWD/mUoRALhD5yrw4HIRBwBvmz7ZUvVqREVFgfcKRcewN9IysqF0F4jMMYhR6/fHwG2bc2uyPSONu3r7AT1SVJjAjT2rlnMWxeacHMAzEkoFQ+uHFjS+aoJaPoSMvIUaEni9KybUjzw3DbAp5WnpQcP5ffFsU6In08+F8P7mFjrSVko/31xHw31AXQnY/q2LWMOFHP30dXIvrmSvaXtnrLlb+xY9FjaRrA+ifeYBQu2jhAk/iMkCBPrJINoFlBu/Of4B2rv67h++/BoimLBG5yMfn5ztYvs5RmeQfnbn+RBEgGj83ei4zYbqms/8dEDqmLCVbDL4FkohkZbd+17s4d7r0IZojj58VIMLlR0AICoVLpJQFa3osva8mQ4QAGCvE2JTtnbC2D7wjA3tVJ86WG+2T45DwbsyQaQOkUpk4cFeGzIPvLilm6PkWr6MTH3sb5EuUWJuixeKAAAAAElFTkSuQmCC",
		'highlight_all': "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAZCAYAAAAv3j5gAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kBHBYyC7xDdOsAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAT0lEQVRIx2NgoBNgRBf4/7K2mGJDxZt78VpEDUtwWcZIC0uwWchIS0uQLWOiV2IYtWjUolGLRi0atWjUImLaDLSuYZnwNSgGfSuIXo7HCgBLdxlRA6fguAAAAABJRU5ErkJggg==",
		'highlight_bottomright': "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAZCAYAAAAv3j5gAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kBHBUnBvcBUBsAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAeElEQVRIx+3VOw6AIBCEYeASHtTaytqDegqoSIgB2ccMsfDvtvoy1Ybw97XyfeztHdlI3M6LAj2XVCyxkVpagcCgGQKBJIgbkiIuSIOYIS1igiyIGrIiKsiDiCEvIoIQyBRCIa8QEhlCaKT7j9BI9/GxEOqiFllaAWnrQaTgwcrCAAAAAElFTkSuQmCC",
		'highlight_topleft': "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAZCAYAAAAv3j5gAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kBHBUmH4pxyZoAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAeUlEQVRIx+3WqxWAQAxE0VmaoFA0Cr2FUgU4BIdk85ms4smIXBETYFLtPbjOfUsvXY+uQgxEwtoM5IGqEQBYqAcXECqkITRohFAgC5KGrEgK8iBhyIuEoAjihqKIC8ogZiiLmCAGMoRYiAoxERFiI59QBUL/Ff5KugFANSV9qKpQXwAAAABJRU5ErkJggg=="
	});
	MUH.getImage = function(name) { return MUH.images.get(name); };
	
	MUH.lookupLimit = function(city_id, resource_name) {
		try {
			switch ( resource_name ) {
			case 'Spearmen':
			case 'Archers':
			case 'Charioteers':
			case 'Bread':
				return 999999; // gamecode forced limits. Certain about bread, unknown about the troops
				break;
			case 'Ships':
				return MUH.lookupExchangeLimit(city_id);
				break;
			case 'Laborers':
				return MUH.lookupPalaceLimit(city_id);
				break;
			default:
				return MUH.lookupWarehouseLimit(city_id, resource_name);
			}
		} catch (exc) {
			MUH.debugHandleException('MUH.lookupLimit '+ city_id +' '+ resource_name, exc);
			return undefined;
		}			
	};
	MUH.lookupWarehouseLimit = function(city_id, resource_name) {
		try {
			var cityResourcePlotLevels = MUH.resourcePlotLevels.get(Number(city_id));
			if ( cityResourcePlotLevels === undefined ) {
				return undefined;
			}
			var warehouse_level = cityResourcePlotLevels.get('Warehouse');
			warehouse_level = ( warehouse_level === undefined ? undefined : warehouse_level[0]); 
			if ( warehouse_level === undefined ) {
				return undefined; // because it is unknown, 0 would have been set
			}
			for ( var ind = 0; ind < MUH.warehouseLimits.length; ind++ ) {
				if ( MUH.warehouseLimits[ind][0].indexOf(resource_name) >= 0 ) {
					return MUH.warehouseLimits[ind][1][warehouse_level];
				}
			}
			return Infinity; // only return Infinity here, the resource was not defined, and that means it has no limit
		} catch (exc) {
			MUH.debugHandleException('MUH.lookupWarehouseLimit', exc);
		}
	};
	MUH.lookupExchangeLimit = function(city_id) {
		try {
			var cityResourcePlotLevels = MUH.resourcePlotLevels.get(Number(city_id));
			if ( cityResourcePlotLevels === undefined ) {
				return undefined;
			}
			var exchange_level = cityResourcePlotLevels.get('Ships');
			exchange_level = ( exchange_level === undefined ? undefined : exchange_level[0]);
			if ( exchange_level === undefined ) {
				return undefined; // should normally not happen
			}
	   		return MUH.exchangeLimits[exchange_level];
		} catch (exc) {
			MUH.debugHandleException('MUH.lookupExchangeLimit', exc);
		}
	};
	MUH.lookupPalaceLimit = function(city_id) {
		try {
			var cityResourcePlotLevels = MUH.resourcePlotLevels.get(Number(city_id));
			if ( cityResourcePlotLevels === undefined ) {
				return undefined;
			}
			var palace_level = cityResourcePlotLevels.get('Laborers');
			palace_level = ( palace_level === undefined ? undefined : palace_level[0]);
			if ( palace_level === undefined ) {
					return undefined; // should normally not happen
			}
	   		return MUH.palaceLimits[palace_level];
		} catch (exc) {
			MUH.debugHandleException('MUH.lookupPalaceLimit', exc);
		}
	};
	
	// show permanent labels over the plots, with occupation meter
	// and store the plot ids per resource (with duplicate buildings it only
	// stores the last)
	MUH.parsePlots = function(REQ, cityID) {
		try {
			if ( REQ === undefined ) {
				return REQ;
			}
			var game_div = REQ.dom;
			
			// test for plot items in city or monument (2; pyramid and sphinx)
			if ( game_div.select('#plot1box')[0] === undefined && game_div.select('#mplot5p')[0] === undefined && game_div.select('#mplot5s')[0] === undefined ) {
				return REQ;
			}
			var iscity = (game_div.select('#plot1box')[0] !== undefined );
			var ismonument = !iscity;
			
			var game_sub_div = game_div.getElementsByTagName('div')[0];
			if ( game_sub_div === undefined ) {
				return REQ;
			}
			var plotplus_divs = game_sub_div.getElementsByTagName('div');
			if ( plotplus_divs === null ) {
				return REQ;
			}
			
			var cityPlotResources = new Hash();
			var cityResourceLaborers = new Hash();
			var cityResourcePlotLevels = new Hash();
			// copy over some values
			var copy_plots = ['Warehouse', 'Laborers', 'Ships'];

			if ( (iscity || ismonument) ) { // label_container to store that it has been parsed since the last update already
				// get upgrade timer if there is any in this city
				var upgradeTimerDiv = game_div.select('#timer');
				if ( upgradeTimerDiv !== null && upgradeTimerDiv.length == 1 ) {
					// get time left from first img if there are three (timer onload, construction and botUI onload)
					var onloadimgs = game_div.select('img');
					if ( onloadimgs.length == 3 ) {
						var mins = (onloadimgs[0].getAttribute('onload') || onloadimgs[0].getAttribute('ondblclick')).tail(',').head(');'); // needed to replace onload with a different attribute to prevent from loading, but keep onload for the initial parse
						var timerHours = Math.floor(mins/60);
						var timerMinutes = mins%60;
						var timerString = undefined;
						if (timerHours > 0) {
							timerString = timerHours +"h "+ timerMinutes +"m";
						} else {
							timerString = timerMinutes +"m";
						}
						MUH.cityUpgrades.set(cityID, {upgradeTime: timerString,
													plotName: upgradeTimerDiv[0].getAttribute('title').replace('Time remaining until ', '').replace(' construction complete!', '')} );
					}
				}
				// copy over some values
				if ( MUH.resourcePlotLevels.get(Number(cityID)) !== undefined ) {
					for ( var cp_ind=0; cp_ind < copy_plots.length; cp_ind++ ) {
						cityResourcePlotLevels.set(copy_plots[cp_ind], MUH.resourcePlotLevels.get(Number(cityID)).get(copy_plots[cp_ind]));
					}
				}

				// add the label_container for above reason and to store labels over all other things
				var label_container = document.createElement('div');
				label_container.setAttribute('id', 'label_container');
				game_div.appendChild(label_container);			
	
				for ( var index=0; index < plotplus_divs.length; index++ ) {
					var div = plotplus_divs[index];
					if ( div.id.indexOf('plot') >= 0 ) { // only plot(box) divs					
						if ( div.title ) { // div.title is used to find the div
											// (plot or plot-box) that contains the
											// info
							var plot_id = div.id.replace('box', '');
	
							var mtitle = div.title;
							mtitle = mtitle.replace('Level: ', '');
							mtitle = mtitle.replace('Laborers: ', '');
							// available lot, remove '(0)'
							if ( mtitle.indexOf('Available') === 0 ) {
								mtitle = mtitle.replace(' (0)', '');
								mtitle = mtitle.replace('Available ', '');
							}
							// if 'Barracks' isn't at the start of the title, remove it (remaining with 'Archers/Charioteers/Spearmen (x/y)')
							if ( mtitle.indexOf('Barracks') > 0 ) {
								mtitle = mtitle.replace('Barracks ', '');
							}
							// find specific production plots to link them to their resources
							// go trough MUH.mapPlotResources to lookup
							var mapResourcePlot = null;
							var mapResourceName = null;
							try {
								var keys = MUH.mapPlotResources.keys();
								MUH.mapPlotResources.each(function(pair) {
									if ( mtitle.indexOf(pair.key) >= 0 ) {
										mapResourcePlot = pair.key;
										mapResourceName = pair.value;
										throw $break; // no regular break command available (prototype)
									}
								});
							} catch (excin) {
								MUH.debugHandleException('MUH.parsePlots inner', excin);
							} //break
							// remove 'box' and replace 'mplot' with 'plot' since monument sites cheat :)
							// pyramid/sphynx had 'p' or 's' appended (latter possibly only at level 5) but don't produce a good anyway
							//  so no need to cut that off
							// store plot with resource, laborers and plot levels for resource production
							if ( mapResourceName !== null) {
								// plotID to resource
								cityPlotResources.set(mapResourceName, div.id.replace('box','').replace('mplot', 'plot'));
								
								// laborer amounts per plot (array)
								if ( mtitle.indexOf('/') >= 0 ) {
									var laborers = cityResourceLaborers.get(mapResourceName);
									laborers = (laborers === undefined ? [] : laborers);
										
									var labtitle = mtitle.substring(mtitle.lastIndexOf('(')+1, mtitle.lastIndexOf(')')).split('/');
									var workers = Number(labtitle[0]);
									var limit = Number(labtitle[1]);
	
									
									if ( !isNaN(workers) ) {
										laborers.push({'workers': workers, 'limit' : limit});
									}
									cityResourceLaborers.set(mapResourceName, laborers);
	
								}
								if ( copy_plots.indexOf(mapResourceName) < 0 || cityResourcePlotLevels.get(mapResourceName) === undefined ) {
									// plot levels (array)
									var plotLevels = cityResourcePlotLevels.get(mapResourceName);
									plotLevels = (plotLevels === undefined ? [] : plotLevels);
									var plevel = '?';
									if ( mtitle.indexOf('plot') >= 0 ) {
										plevel = 0;
									} else if ( mtitle.indexOf('(') >= 0 ) {
										var levtitle = mtitle.split('(')[1].split(')')[0]; // get first () part
										if ( levtitle.indexOf('/') < 0 ) { // it's the laborers field, probably upgrading
											plevel = Number(levtitle);
										}
									}
									plotLevels.push(plevel);
									// if any value in copy_plots (Warehouse, Laborers, Ships) is already set, skip it
									// or, Morgans: if it is any other plot, or if it is undefined, set it
									cityResourcePlotLevels.set(mapResourceName, plotLevels);
								}
							}
	
							// add label, if enabled
							if ( MUH.SHOW_LABELS ) {
								var label_div = document.createElement('div');
								label_div.setAttribute('class', 'label');
								var label_text_div = document.createElement('div');
								label_text_div.setAttribute('class', 'text');
								label_text_div.innerHTML = mtitle;
								var label_progress_div = document.createElement('div');
								
								var label_width = (mtitle.length*5+10);
								if ( mtitle.indexOf('/') >= 0 ) {
									var partsslash = mtitle.split('/');
		
									var partsslashleft = partsslash[0].split('(');
									if ( partsslashleft.length == 2 ) { // construction
										partsslashleft = partsslashleft[1];
									} else {
										partsslashleft = partsslashleft[2];
									}
									var partsslashright = partsslash[1].split(')')[0];
		
									var progress = partsslashleft/partsslashright;
									// color progress different colorsbased on progress, green 75% yellow 90% red
									if ( progress >= 0.9 ) {
										label_progress_div.setAttribute('class', 'progress high');
									} else if ( progress >= 0.75 ) {
										label_progress_div.setAttribute('class', 'progress med');
									} else {
										label_progress_div.setAttribute('class', 'progress low');
									}
		
									label_progress_div.setAttribute('style', 'width: '+ Math.round(progress*100) +'%;');
									label_progress_div.innerHTML = '&nbsp;';
									label_text_div.appendChild(label_progress_div);
								}							
								label_div.appendChild(label_text_div);	
								label_div.setAttribute('style', MUH.labelPositions.get(plot_id));
								label_container.appendChild(label_div);
							}
						}
					}
				} // end for
				MUH.plotResourceLink.set(cityID, cityPlotResources);
				MUH.resourceLaborers.set(cityID, cityResourceLaborers);
	 			MUH.resourcePlotLevels.set(cityID, cityResourcePlotLevels);
				// call now, after the city has been scanned, to update warehouse,exchange,palace levels and have the
				//  results in the resources listing. Needed for initial showing of cities, where these functions
				//  are called before this one itself is finished storing the levels
				if ( MUH.SHOW_PRODUCTION ) {
					MUH.upgradeUI();
					MUH.productionUI();
				}
			}
		} catch (exc) {
			MUH.debugHandleException('MUH.parsePlots', exc);
		}
		return REQ;
	};
	// show more stats in production numbers (botUI)
	MUH.productionUI = function(REQ, cityID) {
		try {
			if ( REQ === undefined ) {
				return REQ;
			}
			var botUI = REQ.dom;
			
			// store units section ul-tag for later comparison to distinguish
			var unitsSection = botUI.getElementsByTagName('ul')[0];
			var resources = botUI.getElementsByClassName('uiList');
			if ( resources === null ) {
				return REQ;
			}

			var city = {id: cityID};
			city.type = ( botUI.select('.uiList').length > 7 ? 'city' : 'monument' );
			
			var thisCityResources = new Hash(); // hash for this city, to be added to MUH.currentProduction in a whole
			for ( var rInd = 0; rInd < resources.length; rInd++ ) {
				var res = resources[rInd];
				var resourceImg = res.getElementsByTagName('img')[0];
				var resName = resourceImg.title.head(' '); // get name from the image title, strip production requirement info
				
				// add click link to related plot. Clay,  Wheat and Reeds already have a link, skip those
				var plot_rl_cn = MUH.plotResourceLink.get(city.id);
				if (plot_rl_cn !== undefined) {
					var plot_id = plot_rl_cn.get(resName);
					// do not add another click for the three resources, the game already provides them.
					if ( plot_id !== undefined && resName != 'Clay' && resName != 'Wheat' && resName != 'Reeds') {
						// check for Laborers and monument, then link to plot5
						if ( resName == 'Laborers' && city.type == 'monument' ) {
							resourceImg.setAttribute('onclick', "manageObject("+ city.id +", 'plot5')");
						} else {
							resourceImg.setAttribute('onclick', "manageObject("+ city.id +", '"+ plot_id +"')");
						}
						resourceImg.setAttribute('class', resourceImg.getAttribute('class')+ ' resourceClickable');
					}
				}
				
				// -- If the resource is over the warehouse limit, the amount in the warehouse,
				//  which is normally in a textnode after the img-tag, is now in it's own span
				//  with className 'maxVal'. resAmount = spans[0].textContent, and diffSpan (if there)
				//  is spans[1] this clashes with the first test.
				
				// There is a major difference between the first section 'Units' and other two
				// resources. Used to detect the difference by amount of spans, but that conflicts
				// with when a resource is over the warehouse limit. Now going to filter on checking
				// whether the parent 'ul' is the first

				// *Units section*: with 2 or 3 spans, 'available, (total) [diff]' total isn't used.
				// Even though you shouldn't be able to get over the maxVal for these goods, I think it
				// would work with this setup.
				// *other*: a(img), textnode/span [, diffspan] ||  img, textnode/span [, diffspan]

				var spans = res.getElementsByTagName('span');
				var diffSpan = null;
				var resDiff = 0; // default
				var resAmount = -1;
				if ( res.parentNode == unitsSection ) {
					resAmount = spans[1].textContent.replace('(', '').replace(')', ''); // first is available amount, which we don't need for production limit calculations
					if ( spans.length == 3 ) {
						diffSpan = spans[2];
					}
					// also store 'available amount' for the units
					thisCityResources.set('available'+resName, [spans[0].textContent.replace(' ', ''), -1]);
				} else {
					// if no spans, then no maxVal and just an amount in textnode
					if ( spans.length === 0 ) {
						// image can be child of an 'a'-tag (when that links to a
						// plot already). then the text node is the a-tag's nextSibling
						if ( resourceImg.parentNode.tagName.toLowerCase() == 'a' ) {
							resAmount = resourceImg.parentNode.nextSibling.nodeValue;
						} else {
							resAmount = resourceImg.nextSibling.nodeValue;
						}
					} else if (spans.length == 1 ) {
						// either maxVal or diffPos/Neg
						if ( spans[0].getAttribute('class') == 'maxVal' ) {
							resAmount = spans[0].textContent;
						} else {
							if ( resourceImg.parentNode.tagName.toLowerCase() == 'a' ) {
								resAmount = resourceImg.parentNode.nextSibling.nodeValue;
							} else {
								resAmount = resourceImg.nextSibling.nodeValue;
							}
							diffSpan = spans[0];
						}
					} else if ( spans.length == 2 ) {
						// 2 spans, first is maxVal, second diffPos/Neg
						resAmount = spans[0].textContent;
						diffSpan = spans[1];
					}
				}
				
				// check for white space at the start
				if ( resAmount.indexOf(' ') === 0 ) {
					resAmount = resAmount.substr(1);
				}
				// check for smaller then ('<') character
				if ( resAmount.indexOf('<') === 0 ) {
					resAmount = resAmount.substr(1);
				}
				
				var timeLeft = res.getElementsByClassName('timeLeft')[0];
				if ( timeLeft === undefined ) {
					timeLeft = document.createElement('div');
					timeLeft.setAttribute('class', 'timeLeft');
				}
				var limit = MUH.lookupLimit(city.id, resName);

				resAmount = Number(resAmount);
				var time = -1;
				if ( diffSpan !== null ) {
					resDiff = diffSpan.getAttribute('title').split(' per hour (')[0].split(' of ')[1];
					// 24h production
					if ( MUH.DAY_PRODUCTION ) {
						diffSpan.textContent = Math.round(24*resDiff);
					}

					// positive or negative based on span class (diffNeg |
					// diffPos)
					if ( diffSpan.getAttribute('class') == 'diffNeg' ) {
						// show hours to go to reach 0 amount
						time = Math.round(resAmount*10/resDiff)/10; // hours
						if ( time > 500*24 ) {
							timeLeft.setAttribute('title', 'More than 500 days to go till all resources are exhausted.');
						} else {
							timeLeft.setAttribute('title', 'Time till all resources are exhausted.');
						}
						// make negative
						resDiff = 0-resDiff;						
					} else if ( diffSpan.getAttribute('class') == 'diffPos' ) {
						// show hours till filling the warehouse
						if ( limit == Infinity ) {
							timeLeft.setAttribute('title', 'Time till the maximum capacity (∞) is reached');
							time = limit;
						} else if ( limit === undefined ) {
							timeLeft.setAttribute('title', 'Time till the maximum capacity (?) is reached');
							time = limit;
						} else if ( limit >= 0 ) {
							// when resAmount > limit, set it to 0, so the timeleft will be "0m" 
							if ( resAmount > limit ) {
								time = 0;
							} else {
								time = Math.round((limit-resAmount)*10/resDiff)/10; // hours
							}
							if ( time > 500*24 ) {
								timeLeft.setAttribute('title', 'More than 500 days to go till the maximum capacity ('+ limit +') is reached');
							} else {
								timeLeft.setAttribute('title', 'Time till the maximum capacity ('+ limit +') is reached');
							}
						}
					}
					// round to days if > 48h, show ~ when over 100, or even show infinity if truly no limit
					if ( time === undefined ) {
						timeLeft.textContent = '?';
					} else if ( !isFinite(time) ) {
						timeLeft.innerHTML = '&infin;';
					} else if ( time > 100*24 ) {
						timeLeft.textContent = '~';
					} else if ( time > 48 ) {
						timeLeft.textContent = Math.round(time*10/24)/10 +'d';
					} else if ( time >= 1 ) {
						timeLeft.textContent = time + 'h';							
					} else {
						timeLeft.textContent = Math.round(60*time) + 'm';
					}
					// set colors 
					if ( time <= 12 ) {
						timeLeft.setAttribute('class', 'timeLeft timeLeftRealShort');
					} else if ( time <= 48 ) {
						timeLeft.setAttribute('class', 'timeLeft timeLeftShort');
					}					
				}
				if ( !MUH.RESOURCE_LIMIT_TIME ) {				  	
				  	if ( time >= 0 ) {
				  		timeLeft.setAttribute('title', 'Warehouse limit, which will be reached in '+ timeLeft.innerHTML);
				  	} else {
				  		timeLeft.setAttribute('title', 'Warehouse limit');
				  	} if ( limit == Infinity ) {
				   		timeLeft.innerHTML = '(&infin;)';
				  	} else if ( limit === undefined ) {
				   		timeLeft.textContent = '(?)';
				  	} else {
				   		timeLeft.textContent = '('+limit+')';
				  	}
				}
				try {
					res.appendChild(timeLeft);
				} catch( excin ) {
					MUH.debugHandleException('MUH.productionUI', excin);
					throw(excin +'\n\n'+ res +'\n'+ timeLeft);
				}
				thisCityResources.set(resName, {amount: resAmount, change: resDiff});
			} // for resources
			MUH.currentProduction.set(city.id, thisCityResources);
			
			// Show the basic production next to [!] - which uses class 'bonusTip'
			var bonusTypes = ['godBonusTip', 'monumentBonusTip'];
			var totalBonus = 0;
			for ( var btInd = 0; btInd < bonusTypes.length; btInd++ ) {
				// get the first with that class
				if ( botUI.getElementsByClassName(bonusTypes[btInd])[0] === undefined ) {
					continue; // either might not be there
				}
				var splitbonus = botUI.getElementsByClassName(bonusTypes[btInd])[0].title.split('%')[0].split(' ');
				totalBonus += splitbonus[splitbonus.length-1]*1;
			}
			// done showing production bonus
			// calculate trough wheat and bakery laborers, net wheat change and production bonus (from !'s)
			//  whether there's an uneven bonus to wheat production (stella gives 7%, specs give 2%)
			// If we ended up here then the plots were parsed already and now also this city's production
			// ** Only try to parse it when we can see the city (so it won't mess up when we chance labor amounts)
			if ( totalBonus !== null &&
					thisCityResources.get('Wheat') !== undefined &&
					MUH.resourceLaborers.get(city.id) !== undefined &&
					MUH.resourceLaborers.get(city.id).get('Wheat') !== undefined &&
					MUH.resourceLaborers.get(city.id).get('Bread') !== undefined ) {
				if ( botUI.select('#plot5') !== null ) { // we have cityview. go check
					MUH.citiesWithStele = MUH.citiesWithStele.replace(' '+city.id, ''); // remove old
					var wheatDiff = thisCityResources.get('Wheat').change;
					var bonus = 1+totalBonus/100;
					var wheatLaborers = 0;
					MUH.resourceLaborers.get(city.id).get('Wheat').each(function(item) {
						wheatLaborers += item.workers;
					});
					var breadLaborers = 0;
					MUH.resourceLaborers.get(city.id).get('Bread').each(function(item) {
						breadLaborers += item.workers;
					});
					var wheatProd = wheatLaborers*8*bonus;
					var wheatUse =  breadLaborers*12*bonus;
					var netBonus = Math.round(( (wheatDiff - (wheatProd - wheatUse))/wheatProd ) * 100); // ignoring wheat or bread bonuses
					if ( Math.abs(netBonus % 2) == 1 ) {
						MUH.citiesWithStele += ' '+city.id; // store
					}
				}
				if ( MUH.citiesWithStele.indexOf(' '+city.id) >= 0 ) {
					// stele bonus!
					var excl = document.createElement('span');
					excl.textContent = '[!]';
					excl.setAttribute('title', 'Wheat production bonus of 7% from stele!');
					excl.setAttribute('style', 'color: #E2D39C; cursor: help; font-size: 12px; font-weight: bold; letter-spacing: 2px;');
					// add to first group
					var header = botUI.getElementsByTagName('ul')[1].getElementsByTagName('div')[0];
					if ( header !== undefined ) {
						header.appendChild(document.createTextNode(' '));
						header.appendChild(excl);
					}
				}
			}
			
			// now go trough each 'row' and append the text
			if ( totalBonus > 0 ) {
				for ( var hInd = 1; hInd < botUI.getElementsByTagName('ul').length; hInd++ ) {
					var btText = document.createElement('span');
					btText.setAttribute('class', 'bonusTipText');
					btText.textContent = totalBonus +'%';
					botUI.getElementsByTagName('ul')[hInd].getElementsByTagName('div')[0].appendChild(btText);
				}
			}
		} catch (exc) {
			MUH.debugHandleException('MUH.productionUI', exc +'\n\n'+ botUI.innerHTML);
		}
		return REQ;
	};
	// show time to go for resources of upgrade (upgradeUI)
	MUH.upgradeUI = function(REQ, cityID) {
		try {
			if ( REQ === undefined ) {
				return REQ;
			}
			// normal buildings
			var costContLists = REQ.dom.getElementsByClassName('costListHolder');
			if ( costContLists === null || costContLists.length === 0 ) {
				// try city building
				costContLists = REQ.dom.getElementsByClassName('uiCost');
				if ( costContLists === null || costContLists.length === 0 ) {
					// Immortality has no classed parent element for costList elements, just get the one element as parent from
					var costListElems = REQ.dom.select('.costList');
					if ( costListElems.length > 0 ) {
						costContLists = [costListElems[0].parentNode];
					} else {
						costContLists = undefined;
					}
				}
			}

			if ( costContLists !== undefined ) {
				// ** the city found UI now also shows all market listings at the lowest price, restyle that - before adding the upgradeScanned marker
				if ( costContLists[0].getAttribute('class') == 'uiCost' ) {
					// the text we want is in the last sibling of costContLists
					var marketListings = costContLists[0].parentNode.lastChild;
					if ( marketListings.nodeType == 3 && marketListings.nodeValue.indexOf('listings for') >= 0 ) { // textnode
						var listingsText = marketListings.nodeValue.replace(/^\s+|\s+$/g,""); // trim
						// create new element so we can add newlines
						var newListings = document.createElement('div');
						newListings.setAttribute('title',  'Product (number of offers) @minumum offer price [normal price] and percentage of minimum offer price compared to production cost.');
						newListings.setAttribute('style', 'max-height: 145px; width: 280px; overflow: auto;');
						marketListings.parentNode.appendChild(newListings);
						// delete the textnode so we can add newlines
						marketListings.parentNode.removeChild(marketListings);
						var listings = listingsText.split(', ');
						var sortedListings = []; // sorted on value/production difference. lower value on top
						for ( var ind = 0; ind < listings.length; ind++ ) {
							var listingwords = listings[ind].split(' '); // '7 listings for baskets (lowest: 6/per)'
							var amount = listingwords[0];
							var resource = listingwords[3];
							resource = resource.substr(0, 1).toUpperCase() + resource.substr(1); // uppercase first
							var value = listingwords[5].split('/')[0];
							var productionCost = Math.round(MUH.resourceProductionCost.get(resource) * MUH.MARKET_OVERVIEW_TAX*100)/100;
							var valueDifference = Math.round(value*100/productionCost);
							for ( var sortInd = 0; sortInd < sortedListings.length; sortInd++ ) {
								if ( sortedListings[sortInd].diff > valueDifference ) {
									break;
								}
							}
							var newsortListing = {};
							newsortListing.diff = valueDifference;
							newsortListing.string = resource +' ('+ amount +') @'+ value +' ['+ productionCost +']'; 
							sortedListings.splice(sortInd, 0, newsortListing);
						}
						for ( var slind = 0; slind < sortedListings.length; slind++ ) {
							var span = document.createElement('span');
							span.textContent = sortedListings[slind].diff+'%';
							span.setAttribute('style', 'float: right; margin-right: 5px;');
							newListings.appendChild(span);
							newListings.appendChild(document.createTextNode(sortedListings[slind].string));
							newListings.appendChild(document.createElement('br'));
						}
					}
				}
				// end 21nome market overview 
				
				// Palace has a second 'first' costListHolder, that should not be parsed, parent id = specsUI.
				//  Loop trough all entries (for when you can choose what to build), and skip over this one
				var costCont = null;
				for ( var ccInd = 0; ccInd < costContLists.length; ccInd++ ) {
					costCont = costContLists[ccInd];
					// check for palace situation with specsUI
					if ( costCont.parentNode.id == 'specsUI') {
						continue;
					}
					
					var resources = costCont.getElementsByTagName('li');
					if ( resources === null || resources.length === 0 ) {
						continue;
					}
					
					for ( var rInd = 0; rInd < resources.length; rInd++ ) {
						var res = resources[rInd];
						// remove any existing 'span' elements
						var resSpans = res.getElementsByTagName('span');
						while ( resSpans !== null && resSpans.length > 0 ) {
							resSpans[0].parentNode.removeChild(resSpans[0]);
						}
						
						// simple 'li' elements with an [img] [textnode].
						var img = res.getElementsByTagName('img')[0];
						// ignore the one with an [img] with text 'Time to construct'
						if ( img.title.indexOf('Time') >= 0 ) {
							continue;
						}
						var resourceName = img.title;
						var requiredAmount = img.nextSibling.nodeValue;
						// check for white space at the start
						if ( requiredAmount.indexOf(' ') === 0 ) {
							requiredAmount = requiredAmount.substr(1);
						}
						
						requiredAmount = Number(requiredAmount);
						var cpCity = MUH.currentProduction.get(cityID);
						if ( cpCity === undefined ) {
							// try MUH.currentCityID before failing.. foundCity called on an empty spot will not pass the current city
							cpCity = MUH.currentProduction.get(MUH.currentCityID);
							cityID = MUH.currentCityID;
							if ( cpCity === undefined ) {
								continue;
							}
						}
						var cpResToClone = cpCity.get(resourceName); // object  .amount, .change
						if ( cpResToClone === undefined ) {
							continue;
						} else {
							var cpRes = {amount: cpResToClone.amount, change: cpResToClone.change}; // or else transport amounts are added all the time
						}
						// incoming transports
						var trRes = undefined;
						var titleIncoming = '';
						var incomingAmount = 0;
						if ( MUH.INCLUDE_TRANSPORTS ) {
							var trCity = MUH.incomingTransports.get(cityID);
							if ( trCity !== undefined ) {
								trRes = trCity.get(resourceName); // integer
								if ( trRes !== undefined ) {
									incomingAmount = trRes;
									titleIncoming = ( trRes !== undefined ? ' ['+ trRes +' incoming]' : '');
								}
							}
						}
						var timeElem = null;
						if ( cpRes.amount + incomingAmount >= requiredAmount ) {
							timeElem = document.createElement('span');
							if ( MUH.INCLUDE_TRANSPORTS ) {
								timeElem.setAttribute('title', 'There is enough of this resource in the warehouse and/or incoming');
							} else {
								timeElem.setAttribute('title', 'There is enough of this resource in the warehouse');
							}
							// different mark when including transport is needed to reach the required amount 
							if ( MUH.INCLUDE_TRANSPORTS && cpRes.amount < requiredAmount ) { 
								// include transport needed
								//timeElem.innerHTML = '&#10004;'; //check mark OPERA BUG!
								timeElem.textContent = '+' + (cpRes.amount + incomingAmount - requiredAmount);
								timeElem.setAttribute('class', 'donewithtransport');
								timeElem.setAttribute('title', 'There is enough of this resource in the warehouse and incoming');
							} else { // when incomging transports aren't needed just a green questionmark 
								//timeElem.innerHTML = '&#10004;'; //check mark OPERA BUG!
								//timeElem.innerHTML = '&#10004;'; //check mark OPERA BUG!
								timeElem.textContent = '+' + (cpRes.amount - requiredAmount);
								timeElem.setAttribute('class', 'done');
								timeElem.setAttribute('title', 'There is enough of this resource in the warehouse');
							}							
							res.appendChild(timeElem);
						} else {
							if ( cpRes.amount < requiredAmount && cpRes.change > 0 ) {
								timeElem = document.createElement('span');
								timeElem.setAttribute('class', 'time');
								if ( MUH.INCLUDE_TRANSPORTS ) {									
									timeElem.setAttribute('title', 'Time to go till this resource is gathered'+ titleIncoming + ' (not accounting for transport time)');
								} else {
									timeElem.setAttribute('title', 'Time to go till this resource is gathered');
								}
								// also substract incoming amount; it's 0 when it shouldn't be used
								var time = Math.round((requiredAmount-cpRes.amount-incomingAmount)*10/cpRes.change)/10; // hours
								// round to days if > 48h, or even show infinity if > 500
								if ( time > 500*24 ) {
									timeElem.innerHTML = '&infin;';
								} else if ( time > 48 ) {
									timeElem.innerHTML = Math.round(time*10/24)/10 +'d';
								} else {
									timeElem.innerHTML = time + 'h';
								}
								res.appendChild(timeElem);
							}
							if ( cpRes.amount < requiredAmount ) {
								timeElem = document.createElement('span');
								timeElem.setAttribute('class', 'shortage');
								timeElem.setAttribute('title', 'There is a shortage of this resource' + titleIncoming);
								// also add incoming amount; it's 0 when it shouldn't be used
								timeElem.innerHTML = cpRes.amount + incomingAmount - requiredAmount;
								res.appendChild(timeElem);
							}
						}
					}
				}
			}

			// look for the 'h3line' 'Construction Costs' line,
			var upgradeUI = REQ.dom.select('#upgradeUI')[1]; //Reed uses this ID multiple times in the Palace view...
			if ( upgradeUI !== undefined ) {
				var ccHeader = upgradeUI.select('.h3line')[0];
				if ( ccHeader !== undefined ) {
					var span = ccHeader.select('span')[0];
					if ( span !== undefined ) {
						/* ok, part found, parse out the required warehouse level now
						 * "[REQ: LEVEL 17 WAREHOUSE]"
						 */
						var level = Number(span.textContent.tail('LEVEL ').head(' WAREHOUSE'));
						
						var cityResourcePlotLevels = MUH.resourcePlotLevels.get(Number(cityID));
						if ( cityResourcePlotLevels !== undefined ) {
							var cityWarehouseLevel = cityResourcePlotLevels.get('Warehouse');
							cityWarehouseLevel = ( cityWarehouseLevel === undefined ? undefined : cityWarehouseLevel[0]);
							if ( cityWarehouseLevel !== undefined && cityWarehouseLevel !== '?' ) {
								
								if ( cityWarehouseLevel >= level ) {
									span.setAttribute('style', 'color: #33CC00;');
								} else {
									span.setAttribute('style', 'color: #FF9999');									
								}									
							}
						}
					}
				}
			}
		} catch (exc) {
			MUH.debugHandleException('MUH.upgradeUI', exc);
		}
		return REQ;
	};

	// show price percentages in the market
	MUH.marketScan = function(REQ) {
		try {
			var main = REQ.dom;
			var marketTable = main.select('#marketTable')[0];
			if ( marketTable !== undefined ) {
				// get the right column to scan for price.. normally it's [3], but for the sales log it is [4], check for latter from the little header text
				var pricerow = 3;
				var headerspan = main.getElementsByTagName('span')[0];
				if ( headerspan !== undefined && headerspan.textContent.indexOf('Your past') >= 0 ) {
					pricerow = 4;
				}
				var itemrows = marketTable.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
				for ( irind = 0; irind < itemrows.length; irind++ ) {
					var row = itemrows[irind];
					var cells = row.getElementsByTagName('td');
					var resource_img = cells[0].getElementsByTagName('img')[0];
					if ( resource_img !== undefined ) {
						var resource_name = resource_img.getAttribute('title');
						resource_name = resource_name.substr(0, 1).toUpperCase() + resource_name.substr(1); // uppercase first character; in Buy screen the title is lowercase for some reason
						
						var pricestring = cells[pricerow].textContent;
						var value = Number(pricestring.split('/')[0].split('(')[1]);
						var productionCost = Math.round(MUH.resourceProductionCost.get(resource_name) * MUH.MARKET_OVERVIEW_TAX*100)/100;
						var valueDifference = Math.round(value*100/productionCost);
						cells[pricerow].textContent = pricestring +' '+ valueDifference +'%';
						cells[pricerow].setAttribute('title', 'Production cost: '+ productionCost +'. Amount for sale (price/per) and percentage of price compared to production cost');
					}
				}
			}
		} catch (exc) {
			MUH.debugHandleException('MUH.marketScan', exc);
		}
		return REQ;
	}
	// add up all incoming transports 
	MUH.totalTransports = function(REQ, cityID) {
		try {
			var game = REQ.dom;
			// test for the Transports screen and summarize not yet being there
			// would show up in the logs too (after split at around v0.50?), so an extra test to prevent that.
			var header = game.getElementsByTagName('div')[0];
			if ( header !== undefined &&
				 header.textContent.indexOf('Transports') >= 0 &&
				 header.textContent.indexOf('Log') < 0 ) {
				
				var cont = game.getElementsByClassName('uiToolBG')[0];
				if ( cont === undefined ) {
					return REQ;
				}
				var list = cont.childNodes;
				var transportResources = new Hash(); // indexed by resource name
				for ( var list_ind = 0; list_ind < list.length; list_ind++ ) {
					// skip all but elements
					if ( list[list_ind].nodeType != Node.ELEMENT_NODE ) {
						continue;
					}
					var images = list[list_ind].getElementsByTagName('img');
					// check first image for incoming
					if ( images[0] !== undefined &&
							images[0].getAttribute('title') !== null &&
							images[0].getAttribute('title').indexOf('Incoming') >= 0 ) {
						// then go trough each image after that (which is a resource) and get the amount
						//  from the textnode before (last number)
						for ( var img_ind = 1; img_ind < images.length; img_ind++ ) {
							var resource_name = images[img_ind].getAttribute('title');
							resource_name = resource_name.substr(0, 1).toUpperCase() + resource_name.substr(1);
							var add_amount = images[img_ind].previousSibling.nodeValue.split(' ');
							add_amount = add_amount[add_amount.length-2]*1;
							var old_amount = transportResources.get(resource_name);
							if ( old_amount === undefined ) {
								old_amount = 0;
							}
							transportResources.set(resource_name, old_amount + add_amount);
						}
					}
				}
				MUH.incomingTransports.set(cityID, transportResources);
				var total_div = document.createElement('div');
				total_div.setAttribute('id', 'totalTransports');
				total_div.setAttribute('title', 'Total incoming goods, and in parenthesis that added to the city stock.');
				total_div.appendChild(document.createTextNode('Total incoming goods: '));
				transportResources.each(function(pair) {
					if ( total_div.childNodes.length > 1 ) {
						total_div.appendChild(document.createTextNode(', '));
					}
					var cpCity = MUH.currentProduction.get(cityID);
					var cityAndIncomingValue = pair.value;
					if ( cpCity !== undefined ) {
						var res = cpCity.get(pair.key);
						if ( res !== undefined ) {
							cityAndIncomingValue += res.amount;
						}
					}
					total_div.appendChild(document.createTextNode(pair.value +' ('+ cityAndIncomingValue +') '));
					var resource_img = document.createElement('img');
					resource_img.setAttribute('style', 'vertical-align: middle');
					resource_img.setAttribute('height', '20');
					resource_img.setAttribute('width', '20');
					resource_img.setAttribute('title', pair.key);
					resource_img.setAttribute('src', 'images/icon_'+ pair.key.toLowerCase() + '.png');
					total_div.appendChild(resource_img);
				});
				list[0].parentNode.insertBefore(total_div, list[0]);
			}
		} catch (exc) {
			MUH.debugHandleException('MUH.totalTransports', exc);
		}
		return REQ;
	};
	// scan whether there's a new scroll and change the background color of the wrapper if so
	MUH.newScrollScan = function(REQ, cityID) {
		try {
			var wrapper = $('wrapper');
			if ( REQ === undefined || wrapper === null ) {
				return REQ;
			}

			var botUI = REQ.dom;

			if ( botUI.getElementsByTagName('div')[0] === undefined ) {
				return REQ;
			}
			// get the relevant button bar
			// v1.2, Reed put the Scarabs button to the right of the other buttons, putting the index before the normal button bar
			//  changing (last) index from 2 to 3 to grab the right bar (mainly? for new scroll check)
			var buttonbar = botUI.getElementsByTagName('div')[0].getElementsByTagName('div')[3];
			if ( buttonbar === undefined ) {
				return REQ;
			}
			var buttonbarimgs = buttonbar.getElementsByTagName('img');
			// look for the one with a title 'Scrolls' - could do on index, but then that has changed in the past
			for ( var ind = 0; ind < buttonbarimgs.length; ind++ ) {
				if ( buttonbarimgs[ind].title.indexOf('Scrolls') >= 0 ) {
					// now check the image source for 'alert'
					// if it's the alert icon and the style has not yet been set
					if ( buttonbarimgs[ind].src.indexOf('alert') >= 0 ) {
						if ( wrapper.getAttribute('style') === null ) { // only when not yet changed
							$('wrapper').setAttribute('style', MUH.NEW_SCROLL_ALERT_STYLE);
							// wait for the confirm result
							if ( MUH.NEW_SCROLL_ALERT && !MUH.waiting_for_scroll_alert_confirm ) {
								MUH.waiting_for_scroll_alert_confirm = true;
								if ( confirm("You have a new scroll, do you want to read it now?") ) {
									// no confirm when the mailbox is already open.
									//  now this is a bit tricky, since the mail element is simply hidden after it's been shown once
									//  check parent element for style setting 'display: none'
									// so, no confirm but an alert if, mail exists and no display: none setting
									var maildiv = $('mail');
									if ( maildiv !== null && maildiv.parentNode.getAttribute('style').indexOf('display: none') < 1 ) {
										showMail();
									} else {
										showMail('','',1);
									}
								}
								MUH.waiting_for_scroll_alert_confirm = false;
							}
						}
					} else {
						$('wrapper').removeAttribute('style');
					}
					break;
				}
			}
		} catch (exc) {
			MUH.debugHandleException('MUH.newScrollScan', exc);
		}
		return REQ;
	};
	// botUI hook, storing all cities and monuments in MUH.mycities
	MUH.getAllCitMons = function(REQ, cityID) {
		try {
			if ( REQ === undefined ) {
				return REQ;
			}
			var botUI = REQ.dom;
			if ( botUI.getElementsByTagName('div')[0] !== undefined && botUI.getElementsByTagName('div')[0].getElementsByTagName('div')[1] !== undefined ) {
				//  scan the city/monument bar for all images find the first one without 'gray' in it
				var citiesicons = botUI.getElementsByTagName('div')[0].getElementsByTagName('div')[1].getElementsByTagName('img');
				for ( var ci_ind = 0; ci_ind < citiesicons.length; ci_ind++ ) {					
					// active city found.
					var c = {};
					c.id = Number(citiesicons[ci_ind].parentNode.getAttribute('onclick').tail('showCity(').head(')'));
					c.name = citiesicons[ci_ind].getAttribute('title').replace('Go to ', '').replace('Viewing ', '').replace(' (Capital City)', '').head(',');
					if ( citiesicons[ci_ind].getAttribute('src').indexOf('city') >= 0 ) {
						c.type = 'city';
					} else if ( citiesicons[ci_ind].getAttribute('src').indexOf('monument') >= 0 ) {
						c.type = 'monument';
					}
					MUH.mycities.set(c.id, c);
				}
			}
		} catch (exc) {
			MUH.debugHandleException('MUH.getAllCityMons', exc);
		}
		return REQ;
	}
	// add buttons for market, exchange and market deals below the city map
	MUH.addButtons = function(REQ, cityID) {
		try {
			if ( REQ === undefined ) {
				return REQ;
			}
			var botUI = REQ.dom;

			var city = {id: cityID};
			city.type = ( botUI.select('.uiList').length > 7 ? 'city' : 'monument' );

			var insertDiv = botUI.getElementsByTagName('div')[0];
			if ( insertDiv !== undefined ) {
				var cityHotkeys = document.createElement('span');
				cityHotkeys.setAttribute('id', 'cityHotkeys');

				// add own buttons
				var overviewButton = document.createElement('img');
				overviewButton.setAttribute('src', MUH.getImage('eye'));
				overviewButton.setAttribute('id', 'MUbuttonOverview');
				overviewButton.setAttribute('title', 'Open the Overview window');
				overviewButton.setAttribute('onclick', "window.MUH.overviewWindow.show()");
				overviewButton.setAttribute('onmouseover', 'MUH.highlightButton("MUbuttonOverview", "highlight_all")');
				overviewButton.setAttribute('onmouseout', 'MUH.highlightButton("MUbuttonOverview", null)');				
				
				var exchangeButton = document.createElement('img');
				exchangeButton.setAttribute('id', 'MUbuttonExchange');
				if ( city.type == 'city' ) {
					var tradesButton = document.createElement('img');
					tradesButton.setAttribute('src', MUH.getImage('scroll'));
					tradesButton.setAttribute('id', 'MUbuttonTrades');
					tradesButton.setAttribute('title', 'Open the Stored Trades window');
					tradesButton.setAttribute('onclick', "window.MUH.storedTradesWindow.toggle()");
					tradesButton.setAttribute('onmouseover', 'MUH.highlightButton("MUbuttonTrades", "highlight_all")');
					tradesButton.setAttribute('onmouseout', 'MUH.highlightButton("MUbuttonTrades", null)');

					exchangeButton.setAttribute('src', MUH.getImage('anchor_pyramid'));
					exchangeButton.setAttribute('usemap', '#exchangemap');
					exchangeButton.setAttribute('onmouseover', 'MUH.highlightButton("MUbuttonExchange", "highlight_topleft")');
					exchangeButton.setAttribute('onmouseout', 'MUH.highlightButton("MUbuttonExchange", null)');
					exchangeButton.setAttribute('title', 'Open the Exchange');				
					exchangeButton.setAttribute('onclick', "manageObject('"+ city.id +"','plot4');");
					var exchangemap = document.createElement('map');
					exchangemap.setAttribute('id', 'exchangemap');
					exchangemap.setAttribute('name', 'exchangemap');
					var exchangemapareabotr = document.createElement('area');
					exchangemapareabotr.setAttribute('shape', 'poly');
					exchangemapareabotr.setAttribute('coords', '0,25 ,26,0, 26,25');
					exchangemapareabotr.setAttribute('title', 'Open the Exchange to your monuments');
					exchangemapareabotr.setAttribute('onclick', 'manageObject('+ city.id +', "plot4", "citycargo");'); 
					exchangemapareabotr.setAttribute('onmouseover', 'MUH.highlightButton("MUbuttonExchange", "highlight_bottomright")');
					exchangemapareabotr.setAttribute('onmouseout', 'MUH.highlightButton("MUbuttonExchange", null)');
					exchangemap.appendChild(exchangemapareabotr);
					cityHotkeys.appendChild(exchangemap);

					var marketButton = document.createElement('img');
					marketButton.setAttribute('src', MUH.getImage('coins_boxes'));
					marketButton.setAttribute('id', 'MUbuttonMarket');
					marketButton.setAttribute('usemap', '#marketmap');
					marketButton.setAttribute('onmouseover', 'MUH.highlightButton("MUbuttonMarket", "highlight_topleft")');
					marketButton.setAttribute('onmouseout', 'MUH.highlightButton("MUbuttonMarket", null)');
					marketButton.setAttribute('title', 'Show 21 nome wide market deals');
					marketButton.setAttribute('onclick', "showGameItem('foundCityUI','"+ city.id +"');");
					var marketmap = document.createElement('map');
					marketmap.setAttribute('id', 'marketmap');
					marketmap.setAttribute('name', 'marketmap');
					var marketmapareabotr = document.createElement('area');
					marketmapareabotr.setAttribute('shape', 'poly');
					marketmapareabotr.setAttribute('coords', '0,25 ,26,0, 26,25');
					marketmapareabotr.setAttribute('title', 'Open the Market');
					marketmapareabotr.setAttribute('onclick', "showGameItem('marketUI','"+ city.id +"');");
					marketmapareabotr.setAttribute('onmouseover', 'MUH.highlightButton("MUbuttonMarket", "highlight_bottomright")');
					marketmapareabotr.setAttribute('onmouseout', 'MUH.highlightButton("MUbuttonMarket", null)');
					marketmap.appendChild(marketmapareabotr);
					cityHotkeys.appendChild(marketmap);
					cityHotkeys.appendChild(overviewButton); // need special order or else the areamaps mess it all up
					cityHotkeys.appendChild(tradesButton);
					cityHotkeys.appendChild(marketButton);
				} else if ( city.type == 'monument' ) {
					exchangeButton.setAttribute('src', MUH.getImage('anchor'));
					exchangeButton.setAttribute('title', 'Open the Warehouse');				
					exchangeButton.setAttribute('onclick', "manageObject('"+ city.id +"','plot14');");
					exchangeButton.setAttribute('onmouseover', 'MUH.highlightButton("MUbuttonExchange", "highlight_all")');
					exchangeButton.setAttribute('onmouseout', 'MUH.highlightButton("MUbuttonExchange", null)');
					cityHotkeys.appendChild(overviewButton);
				}
				cityHotkeys.appendChild(exchangeButton);			
				insertDiv.appendChild(cityHotkeys);
				
				// change city&monument buttons to open the transports window when shift-clicked
				try {
				var cmanchors = insertDiv.getElementsByTagName('div')[1].select('a');
				cmanchors.each(function(item) {
					var city_id = Number(item.getAttribute('onclick').tail('(').head(')'));
					if ( !isNaN(city_id) ) {
						var img = item.select('img')[0]; 
						img.setAttribute('title', img.getAttribute('title')+ ', Shift-click to open Transports');
						item.setAttribute('onclick', "if (!event){event=window.event;}if(event.shiftKey){showBotUI("+city_id+");showGameItem('transportsUI',"+city_id+");}else{showBotUI("+city_id+");showCity("+city_id+");}return false;");
					}
				});
				} catch (exc) {
				}
			}
		} catch (exc) {
			MUH.debugHandleException('MUH.addButtons', exc);			
		}
		return REQ;
	};
	// highlight given image with 'name' image, or clear if null
	MUH.highlightButton = function(imgId, name) {
		try {
			var img = $(imgId);
			if ( name === null) {
				img.removeAttribute('style');
			} else {
				img.setAttribute('style', 'background-image: url("'+ MUH.getImage(name) +'")');
			}
		} catch (exc) {
			MUH.debugHandleException('MUH.highlightButton', exc);
		}
	};

	// Find the exchange or cargo form. Make all Input's Images clickable to toggle the resource alert at this city.
	// If a resource is set to alert, mark the div
	MUH.exchangeCargoScan = function(REQ, cityID) {
		var checkforms = ['cargoexchange', 'cargoform'];
		for ( var find = 0; find < checkforms.length; find++ ) { // both could be open at the same time
			try {			
				var form = REQ.dom.select('#'+checkforms[find])[0];
				if ( form === undefined ) {
					continue;
				}
				var inputs = form.select('input');
				
				// go trough all input's
				for ( var inp_ind = 0; inp_ind < inputs.length ; inp_ind++ ) {
					var thisinput = inputs[inp_ind]; 
					if ( thisinput.getAttribute('type') == 'text' && thisinput.getAttribute('name') !== null ) {
						// ok, got one. let's get to work
						var img = thisinput.previousSibling;
						if ( img.tagName.toLowerCase() != 'img' ) {
							continue;
						}
						img.setAttribute('class', 'inputImg');
						img.setAttribute('onclick', 'new MUH.CexchangeAlerts().toggle('+ cityID +',"'+ thisinput.getAttribute('name') +'");');
						
						// mark div if set to alert
						if ( new MUH.CexchangeAlerts().get(cityID, thisinput.getAttribute('name')) ) {
							thisinput.parentNode.setAttribute('class', thisinput.parentNode.getAttribute('class') + ' exchangeAlert' );
						}
					}
				}
			} catch (exc) {
				MUH.debugHandleException('MUH.exchangeCargoScan', exc);
			}
		} //end for
		return REQ;
	};
	// scan sections to add access keys to some links (Scribe Wall, Game Log and Overview window) 
	MUH.accessKeysScan = function(REQ) {
		try {
			if ( MUH.ACCESS_KEYS ) {
				var keymap = new $H({'General' : '1', 'Trade' : '2', 'Nome' : '3', // scribe wall and game log
									'Market' : '2', 'Transports' : '3' // game log
									});
				var game = REQ.dom;
				if ( game !== null ) {
					// scribe wall and transport window tabs
					var headers = game.getElementsByClassName('h2line');
					if ( headers !== null && headers.length > 0 ) {
						var headerText = headers[0].textContent;
						if ( headerText.indexOf('Scribe Wall') >= 0 ||
							 headerText.indexOf('Game Log') >= 0 )
						{
							var ahrefs = headers[0].getElementsByTagName('a');
							for ( var aind = 0; aind < ahrefs.length; aind++ ) {
								var link = ahrefs[aind];
								var accesskey = keymap.get(link.textContent);
								if ( accesskey !== undefined ) {
									link.setAttribute('accesskey', accesskey);
								}
							}
							// if scribe wall, focus the chat field
							// add an image with an 'onload' attribute to focus the text field (though not use onload but ondblclick, as that will be replaced later
							if ( headerText.indexOf('Scribe Wall') >= 0 ) {
								var onloadimg = document.createElement('img');
								onloadimg.setAttribute('src', '/images/0.png');
								onloadimg.setAttribute('width', '0');
								onloadimg.setAttribute('height', '0');
								onloadimg.setAttribute('ondblclick', "$('msg').focus()");
								game.appendChild(onloadimg);
							}
						}
					}
				}
			}
		} catch (exc) {
			MUH.debugHandleException('MUH.accessKeysScan', exc);
		}
		return REQ;
	};
	// Scan for the bandits window and show the amount of lux goods and bread people will get for their contribution
	// Also show the percentage of soldiers 'donated' 
	MUH.banditsOutpostScan = function(REQ) {
		try {
			if ( REQ === undefined ) {
				return REQ;
			}
			var game = REQ.dom;
			if ( game === null ) {
				return REQ;
			}
			var contdiv = game.getElementsByTagName('div')[0];
			if ( contdiv === undefined ) {
				return REQ;
			}
			var divs = contdiv.getElementsByTagName('div');
			if ( divs === null || divs.length < 3 ) {
				return REQ;
			}
			if ( divs[0].textContent.indexOf('Defeat the Bandit Outposts in ') < 0 ) {
				return REQ;
			}
			var tallydiv = contdiv.getElementsByClassName('h2line')[2].parentNode; // third header
			if ( tallydiv === undefined ) {
				return REQ;
			}
			var donateddiv = contdiv.getElementsByClassName('h2line')[0].parentNode; // first header
			
			// donated div, show percentage completed
			//  search for text nodes with the format "xxx of yyy"
			var troopCount = 0; // count amount of donated troops, count charioteers double, to calculate one's contribution
			
			for ( dind = 0; dind < donateddiv.childNodes.length; dind++ ) {
				var node = donateddiv.childNodes[dind];
				if ( node.nodeType === 3 && (matches = node.nodeValue.match(/(\d+) of (\d+)/)) !== null ) { // textNode
					var percentage = Math.round((matches[1]*1000)/matches[2])/10;
					
					var span = document.createElement('span');
					span.textContent = ' ('+ percentage +'%)';
					span.setAttribute('class', 'MUdonationProgress');
					node.parentNode.insertBefore(span, node.nextSibling);
					// count troops
					if ( node.previousSibling.getAttribute('title') === 'Charioteers' ) {
						troopCount += 2*Number(matches[1]);
					} else {
						troopCount += Number(matches[1]);
					}
				}
			}
			
			// tally div first has a h2line div, then a long list of ungrouped elements creating the tally:
			// name sent xxx img title="Spearmen"  xxx img title="Archers" xxx img title="Charioteers"
			// Any of the 3 could be missing
			// lux reward (each) is Math.floor((#spearmen*3+#archers*3+#charioteers*6)/5)
			// bread reward is #spearmen*4+#archers*4+#charioteers*8
			var names = tallydiv.getElementsByTagName('b');
			// for each continue till next 'b', find each image and amount
			for ( nind = 0; nind < names.length; nind++ ) {
				var troops = new $H({'Spearmen': 0, 'Archer': 0, 'Charioteers': 0});
				var walker = names[nind];
				while ( walker !== null && walker.nextSibling !== null ) {
					walker = walker.nextSibling;
					switch ( walker.tagName && walker.tagName.toLowerCase() ) {
					case 'img':
						var amount = Number(walker.previousSibling.nodeValue.replace('sent', '').replace(/\s/g,"")); // strip 'sent' and all whitespace;
						troops.set(walker.getAttribute('title'), amount);
						// remove empty 'alt' tag
						walker.removeAttribute('alt');
						break;
					case 'br':
						var personalTroopCount = troops.get('Spearmen') + troops.get('Archers') + troops.get('Charioteers')*2;
						var personalContribution = Math.round((personalTroopCount*1000)/troopCount)/10;
						var lux = Math.floor((troops.get('Spearmen')*3 + troops.get('Archers')*3 + troops.get('Charioteers')*6)/5);
						var bread = troops.get('Spearmen')*4 + troops.get('Archers')*4 + troops.get('Charioteers')*8;
						var span = document.createElement('span');
						span.setAttribute('class', 'MUbanditsRewards');
						span.textContent = '('+ personalContribution +'% : '+ lux +' each lux, '+ bread +' bread)';
						walker.parentNode.insertBefore(span, names[nind]);
						walker = null;
						break;
					}
				}
			}
		} catch (exc) {
			MUH.debugHandleException('MUH.banditsOutpostScan', exc);
		}
		return REQ;
	};
	
	// scan the nome view
	// - add labels to cities and monuments
	MUH.nomeScan = function(REQ) {
		try {
			if ( REQ === undefined ) {
				return REQ;
			}
			
			if ( MUH.SHOW_NOME_LABELS ) {
				var game = REQ.dom;
				if ( game === null || game.select('#city20')[0] === undefined ) {
					return REQ;
				}
				
				// find all occupied cities and monuments
				var occupied = game.select('img.sIMG');
				occupied.each(function(item) {
					var gparent = item.parentNode.parentNode; // container
					var title = item.getAttribute('title');
					var label = document.createElement('div');
					label.setAttribute('title', title);
					
					switch ( gparent.getAttribute('id').substr(0,4) ) { 
					case 'city':
						var cityNr = Number(gparent.getAttribute('id').substr(4));
						var align = Math.floor((cityNr%6) / 3) ? 'right' : 'left';						
						var nomeplayer = title.replace('Immortal ', '').head('(').split(' by '); // nomename, playername(with title)
						var level = title.tail('Level: ').head(' ');
						label.setAttribute('class', 'nomelabel'+ align);
						label.appendChild(document.createTextNode(nomeplayer[0] +' ('+ level +')'));
						label.appendChild(document.createElement('br'));
						var bold = document.createElement('b');
						bold.textContent = nomeplayer[1].tail(' ');
						label.appendChild(bold);
						item.parentNode.appendChild(label);
						// reposition the activity marker
						var activity = item.parentNode.select('div')[0];
						activity.setAttribute('class', 'nomecityactivity'+ align);
						break;
					case 'monu':
						var cityNr = Number(gparent.getAttribute('id').substr(8));
						var align = Math.floor((cityNr-1)/3) ? 'left' : 'right';
						label.setAttribute('class', 'nomemonument nomelabel'+ align);
						var bold = document.createElement('b');
						var playername = title.replace('Immortal ', '').tail(' by ').tail(' '); 
						bold.textContent = playername;
						label.appendChild(bold);
						item.parentNode.appendChild(label);
						break;
					}
				});
			}
		} catch (exc) {
			MUH.debugHandleException('MUH.nomeScan', exc);
		}
		return REQ;
	};
	// Show the amount of laborers required to just break-even the production of the good, or used materials
	MUH.laborToolScan = function(REQ, cityID) {
		try {
			var labtool = REQ.dom;
			if ( labtool === null ) {
				return REQ;
			}
			var sliderholder = labtool.getElementsByClassName('sliderHolder')[0];
			if ( sliderholder === undefined ) {
				return REQ;
			}
			var applyonclick = sliderholder.getElementsByTagName('a')[0].getAttribute('onclick');
					
			var cont = sliderholder.getElementsByTagName('div')[0];
			// looking up the anchor, to make this live-editing compatible (running this function on $('laborTool') in the real document
			var anchor = labtool.select('#laborToolScanned')[0];
			if ( anchor === undefined ) {
				anchor = document.createElement('a');
				anchor.setAttribute('id', 'laborToolScanned');
				cont.appendChild(anchor);
				anchor.setAttribute('href', 'javascript:void();');
			}			
			
			// stop the form from submitting when pressing enter in the textfield, but do the labortool action instead
			var form = labtool.select('form')[0];
			var apply_anchor = labtool.select('a')[0];
			form.setAttribute('onsubmit', apply_anchor.getAttribute('onclick'));
			
			var bold_children = labtool.select('b')[0].childNodes;
			var hourly_production = Number(bold_children[0].nodeValue.match(/[0-9]+/));
			var resource_name = bold_children[1].getAttribute('title');
			var hourly_change = Number(MUH.currentProduction.get(cityID).get(resource_name).change); // 'actual' change in resource amount
			
			var laborers = labtool.select('#laborers')[0];				
			var laborers_amount = Number(laborers.value); // current amount of laborers at work
			var laborer_production = hourly_production / laborers_amount; // amount made by one laborer in an hour
			var laborers_max = Number(labtool.select('#capacity')[0].getAttribute('value')); // max amount of laborers that can be assigned (limited by plot size or free labor force)

			var laborers_bep_amount, bep_change, laborers_bep_change = null;
			
			// different actions for different resources
			if ( resource_name != 'Limestone' && MUH.warehouseLimits[0][0].indexOf(resource_name) >= 0 ) {
				// basic materials (in string array MUH.warehouseLimits[0]), do simple BEP
				laborers_bep_change = Math.ceil(0-hourly_change/laborer_production); 
			} else if ( resource_name == 'Bread' ) {
				// for bread BEP is set at just using 'all' wheat
				var wheat_cur = MUH.currentProduction.get(cityID).get('Wheat');
				if ( wheat_cur !== undefined ) {
					laborers_bep_change = Math.floor(wheat_cur.change/laborer_production/2); // 2 wheat is used per bread
				}
			} else if ( resource_name == 'Baskets' ) {
				var reeds_cur = MUH.currentProduction.get(cityID).get('Reeds');
				if ( reeds_cur !== undefined ) {
					laborers_bep_change = Math.floor(reeds_cur.change/laborer_production/2); // 2 reeds are used per basket
				}
			} else if ( resource_name == 'Pottery' ) {
				var clay_cur = MUH.currentProduction.get(cityID).get('Clay');
				if ( clay_cur !== undefined ) {
					laborers_bep_change = Math.floor(clay_cur.change/laborer_production/2); // 2 clay is used per pottery
				}
			} else if ( resource_name == 'Bricks' ) {
				var reeds_cur = MUH.currentProduction.get(cityID).get('Reeds');
				var clay_cur = MUH.currentProduction.get(cityID).get('Clay');
				if ( clay_cur !== undefined && reeds_cur !== undefined ) {
					var reeds_laborers_bep_change = Math.floor(reeds_cur.change/laborer_production); // 1 reeds is used per bricks
					var clay_laborers_bep_change = Math.floor(clay_cur.change/laborer_production/2); // 2 clay is used per bricks
					laborers_bep_change = Math.min(reeds_laborers_bep_change, clay_laborers_bep_change);
				}
			}

			if ( laborers_bep_change !== null ) {
				laborers_bep_amount = Number(laborers_amount+laborers_bep_change); // amount of laborers needed to break-even
				bep_change = Math.round((hourly_change+laborers_bep_change*laborer_production)*10)/10; // netto hourly change of the resource 'at' (nearest above) bep
				// different for bread, every added or removed laborer influences the amount of bread produced
				if ( resource_name == 'Bread' ) {
					bep_change -= laborers_bep_change; // - since removing laborers adds bread
				}
				bep_change = (bep_change < 0) ? bep_change : '+'+bep_change;
			}

			if ( laborers_bep_amount != null && bep_change != null ) {
				var newspan = document.createElement('span');
				// we have rounding errors, but at least show 0 change when there are no laborers set to work
				bep_change = (laborers_bep_amount == 0) ? 0 : bep_change;
				newspan.textContent = 'BEP: '+ laborers_bep_amount +' ('+ Math.round(bep_change*10)/10 +'/h)';
	
				// default onclick
				anchor.setAttribute('onclick', 'return false;');
				// different style based on whether there are enough laborers to break-even
				if ( isNaN(laborers_bep_amount) || isNaN(Number(bep_change)) ) {
					newspan.textContent = 'BEP: error';
					anchor.setAttribute('class', 'txtbuttonNeg');
					newspan.setAttribute('title', 'Cannot calculate at zero production');
				} else if ( laborers_bep_amount > laborers_max ) {
					anchor.setAttribute('class', 'txtbuttonNeg');
					newspan.setAttribute('title', 'Not enough free laborers or work space to get to break-even production, will set to maximum');
					anchor.setAttribute('onclick', applyonclick.replace("$('laborers').value", laborers_max));
				} else if ( laborers_bep_amount < 0 ) {
					anchor.setAttribute('class', 'txtbuttonNeg');
					newspan.setAttribute('title', 'Cannot get to break-even production by changing this good any further, will set to minimum');
					anchor.setAttribute('onclick', applyonclick.replace("$('laborers').value", 0));
				} else if ( laborers_bep_amount == laborers_amount ){
					anchor.setAttribute('class', 'txtbuttonPos');
					newspan.setAttribute('title', 'You are already at break-even production');
				} else {
					anchor.setAttribute('class', 'txtbutton');
					newspan.setAttribute('title', 'Click to set amount of laborers to get break-even production');
					// Can't apply '0'. So if amount of laboreres is 0, use 'substract', [amount]
					if ( laborers_bep_amount == 0 ) {
						anchor.setAttribute('onclick', applyonclick.replace("'',$('laborers').value", "'subtract',"+ laborers_amount));
					} else {
						anchor.setAttribute('onclick', applyonclick.replace("$('laborers').value", laborers_bep_amount));
					}

				}				
				anchor.setAttribute('style', 'margin-left: 5px;');
				anchor.textContent = ''; // live-editing compatibility
				anchor.appendChild(newspan);
			}
			// go trough all anchors and add resource_name as an extra parameter
			var anchors = REQ.dom.select('a');
			for ( aind = 0; aind < anchors.length; aind++ ) {
				var a = anchors[aind];
				var onclick = a.getAttribute('onclick');
				if ( onclick !== null && onclick.indexOf('laborTool') >= 0 ) {
					onclick = onclick.replace(');', ', "'+ resource_name +'");');
				}
				a.setAttribute('onclick', onclick);
			}
		} catch (exc) {
			MUH.debugHandleException('MUH.laborToolScan', exc);
		}
		return REQ;
	}
	MUH.getPlotLevel = function(REQ, cityID) {
		try {
			if ( REQ === undefined ) {
				return REQ;
			}
			var game_div = REQ.dom;
			
			var cityResourcePlotLevels = MUH.resourcePlotLevels.get(Number(cityID));
			// Building levels are not shown in the tooltip when they are being upgraded.
			//  We get here too when the plot view is open, so get the building level from the 'header'
			var header_div = game_div.select('div')[0].select('div')[0]; 
			if ( 	cityResourcePlotLevels !== undefined &&
					header_div !== undefined &&
					header_div.childNodes.length == 1 &&
					header_div.childNodes[0].nodeType == Node.TEXT_NODE &&
					header_div.childNodes[0].nodeValue.indexOf('Level ') >= 0 ) {
		 		var resource_name = MUH.mapPlotResources.get(header_div.childNodes[0].nodeValue.split(' ')[0]); // left part of the 'title' is the building name
		 		var level = Number(header_div.childNodes[0].nodeValue.replace('Level ','').split('(')[1].split(')')[0]);
		 		var storedPlotLevels = cityResourcePlotLevels.get(resource_name);
		 		
		 		if ( resource_name !== undefined && !isNaN(level) && (storedPlotLevels === undefined || storedPlotLevels[0] != level) ) {
		 			cityResourcePlotLevels.set(resource_name, [level]);
		 			MUH.resourcePlotLevels.set(cityID, cityResourcePlotLevels);
		 			// reload bottom UI to remove ?'s
		 			showBotUI(cityID);
		 		}
			}
		} catch (exc) {
			MUH.debugHandleException('MUH.getPlotLevel', exc);
		}
		return REQ;
	}

	MUH.sellOrderTotals = function(REQ, cityID, type) {
		try {
			if ( REQ === undefined || type != 'mysellorders' ) {
				return REQ;
			}
			var totalBread = 0;
			
			var tbody = REQ.dom.select('tbody')[0];
			var rows = undefined
			if ( tbody !== undefined ) {
				rows = tbody.select('tr');
				for ( rind = 0; rind < rows.length; rind++ ) {
					var cells = rows[rind].select('td');
					// sell price is in the 4th TD "3300 (11/per)"
					var sellTD = cells[3];
					totalBread += Number(sellTD.textContent.head(' ('));
				}
				
				var headerCells = REQ.dom.select('thead')[0].select('tr')[0].select('th');
				headerCells[2].textContent += ' ('+ rows.length +')';
				headerCells[2].setAttribute('title', 'Total amount of trades');
				headerCells[3].textContent += ' ('+ totalBread +')';
				headerCells[3].setAttribute('title', 'Total bread value of sales');
			}
		} catch (exc) {
			MUH.debugHandleException('MUH.getPlotLevel', exc);
		}
		return REQ;
	}
	
	MUH.compressString = function(str) {
		try {
			str = str.replace(/, /g, ',').replace(/: /g, ':');
			return str;
		} catch (exc) {
			MUH.debugHandleException('MUH.compressString', exc);
		}
	};

	MUH.createCookie = function(name,value,days) {
		try {
			var expires = "";
			if (days) {
				var date = new Date();
				date.setTime(date.getTime()+(days*24*60*60*1000));
				expires = "; expires="+date.toGMTString();
			}
			document.cookie = name+"="+value.replace(/"/g,'\'')+expires+"; path=/"; // replace the JSON double quotes with single ones
		} catch (exc) {
			MUH.debugHandleException('MUH.createCookie', exc);
		}
	};
	MUH.readCookie = function(name) {
		try {
			var nameEQ = name + "=";
			var ca = document.cookie.split(';');
			for( var i=0; i < ca.length; i++ ) {
				var c = ca[i];
				while ( c.charAt(0) == ' ' ) {
					c = c.substring(1,c.length);
				}
				if ( c.indexOf(nameEQ) === 0 ) {
					return c.substring(nameEQ.length,c.length).replace(/'/g, '"');
				}
			}
			return null;
		} catch (exc) {
			MUH.debugHandleException('MUH.readCookie', exc);
		}
	};
	MUH.eraseCookie = function(name) {
		try {
			createCookie(name,"",-1);
		} catch (exc) {
			MUH.debugHandleException('MUH.eraseCookie', exc);
		}
	};

	// central spot to handle all function's try/catches
	MUH.debugHandleException = function(func, exc) {
		if (MUH.debug) {
			if (MUH.silent_debug) {
				// Prototype seems to silently kill any exceptions in Ajax calls, defer delays the call with 10ms, showing it in the console again. Easier than fixing Prototype.
				// the throwing function will now continue out of the catch and return whatever, then the throw is spawned.
				(function () {throw(new Error(func +' :\n '+ exc.name +' | \n'+ exc.message, 'play_nile_online_gmscrip.user.js', exc.lineNumber)) }).defer(); 
			} else {
				alert(func +'\n\n'+ exc);
			}
		}
	};

	MUH.optionsInit = function() {
		try {
			// *** START options box
			var options_box = document.createElement('div');
			options_box.setAttribute('id', 'MUHOptionsBox');
			
			var current_version = document.createElement('a');
			current_version.textContent = 'v'+MUH.VERSION;
			current_version.setAttribute('id', 'currentVersion');
			current_version.setAttribute('href', 'http://pegasus.pimpninjas.org/nileonline/pno-GMscript.user.js');
			current_version.setAttribute('title', 'Version of this GM script, click to check for a new version.');
			options_box.appendChild(current_version);
	
			var header = document.createElement('div');
			var headerText = document.createElement('div');
			headerText.setAttribute('class', 'h2line');
			headerText.textContent = 'Options';
			header.appendChild(headerText);
			options_box.appendChild(header);
			
			var options_list = document.createElement('ul');
			options_list.setAttribute('id', 'myOptionsList');
			
			var options = new $H({'options_toggle_labels': new $H({'label': 'Plot Labels', 'title': 'Show plot labels (reloads the page when enabling)'}),
				'options_toggle_nome_labels': new $H({'label': 'Nome Labels', 'title': 'Show labels in the nome view'}),
				'options_toggle_scroll_alert': new $H({'label': 'Scroll Alert', 'title': 'Show an alert popup when there is a new scroll'}),
				'options_toggle_draggable_ui': new $H({'label': 'Movable UI', 'title': 'Change some UI elements and make them repositional (scrolls box, allies list - reloads the page)'}),
				'options_toggle_trade_confirmation': new $H({'label': 'Trade Confirmation', 'title': 'Ask for confirmation when sending a trade shipment'}),
				'options_toggle_store_bandits': new $H({'label': 'Store Bandits', 'title': 'Store and add link (in Units resources header) to stored bandit camp'}),
				'options_toggle_include_transports': new $H({'label': 'Include Transports', 'title': 'Include incoming transports in the Upgrade UI and Overview'}),
				'options_toggle_resource_limit': new $H({'label': 'Resource Limits', 'title': 'Switch between resource time or limits (reloads the page)'}),
				'options_toggle_day_production': new $H({'label': '24h Production', 'title': 'Show resource production per day instead of one hour (reloads the page)'}),
				//'options_toggle_access_keys': new $H({'label': 'Access Keys', 'title': 'Enable access keys (1,2,3) for tabs in some windows'}),
				'separator': null,
				'options_set_wall_highlights': new $H({'label': 'Wall Highlights', 'title': 'Set preferred Scribe Wall highlights'})
			});
	
			options.each(function(pair) {
				if ( pair.key == 'separator' ) {
					var separator = document.createElement('hr');
					options_list.appendChild(separator);
				} else {
					var listitem = document.createElement('li');
					listitem.textContent = pair.value.get('label');
					listitem.setAttribute('id', pair.key);
					listitem.setAttribute('title', pair.value.get('title'));
					listitem.setAttribute('onclick', 'MUH.optionsClick("'+ pair.key +'");');
					// different bullet for 'set' items
					if ( pair.key.indexOf('_set_') >= 0 ) {
						listitem.setAttribute('class', 'set');
					}
					options_list.appendChild(listitem);
				}
			});
			options_box.appendChild(options_list);		
			document.getElementsByTagName('body')[0].appendChild(options_box);
			// *** END options box
			
			// init settings storage
			var settings_str = MUH.readCookie('MUsettings');
			if ( settings_str !== null ) {
				var settings = settings_str.evalJSON();
				if ( settings.options_toggle_labels !== undefined ) {
					MUH.SHOW_LABELS = settings.options_toggle_labels;
				}
				if ( settings.options_toggle_nome_labels !== undefined ) {
					MUH.SHOW_NOME_LABELS = settings.options_toggle_nome_labels;
				}
				if ( settings.options_toggle_scroll_alert !== undefined ) {
					MUH.NEW_SCROLL_ALERT = settings.options_toggle_scroll_alert;
				}
				if ( settings.options_toggle_resource_limit !== undefined ) {
					MUH.RESOURCE_LIMIT_TIME = settings.options_toggle_resource_limit;
				}
				if ( settings.options_toggle_trade_confirmation !== undefined ) {
					MUH.TRADE_CONFIRMATION = settings.options_toggle_trade_confirmation;
				}
				/* removed/override
				if ( settings.options_toggle_access_keys !== undefined ) {
					MUH.ACCESS_KEYS = settings.options_toggle_access_keys;
				}
				*/				
				if ( settings.options_toggle_store_bandits !== undefined ) {
					MUH.STORE_BANDITS = settings.options_toggle_store_bandits;
				}
				if ( settings.options_toggle_include_transports !== undefined ) {
					MUH.INCLUDE_TRANSPORTS = settings.options_toggle_include_transports;
				}
				if ( settings.options_toggle_draggable_ui !== undefined ) {
					MUH.DRAGGABLE_UI = settings.options_toggle_draggable_ui;
				}
				if ( settings.options_toggle_day_production !== undefined ) {
					MUH.DAY_PRODUCTION = settings.options_toggle_day_production;
				}				
				// set
			} else {
				MUH.createCookie('MUsettings', new $H({'options_toggle_labels': MUH.SHOW_LABELS,
													 'options_toggle_nome_labels': MUH.SHOW_NOME_LABELS,
	   										   		 'options_toggle_scroll_alert': MUH.NEW_SCROLL_ALERT,
	   										   		 'options_toggle_resource_limit': MUH.RESOURCE_LIMIT_TIME,
	   										   		 'options_toggle_trade_confirmation': MUH.TRADE_CONFIRMATION,
	   										   		 'options_toggle_access_keys': MUH.ACCESS_KEYS,
	   										   		 'options_toggle_store_bandits': MUH.STORE_BANDITS,
	   										   		 'options_toggle_include_transports': MUH.INCLUDE_TRANSPORTS,
	   										   		 'options_toggle_draggable_ui': MUH.DRAGGABLE_UI,
	   										   		 'options_toggle_day_production': MUH.DAY_PRODUCTION
	   										   		 }).toJSON(), 1000);
			}
			// if false, change the looks of the option
			if ( !MUH.SHOW_LABELS ) {
				$('options_toggle_labels').setAttribute('class', 'disabled');
			}
			if ( !MUH.SHOW_NOME_LABELS ) {
				$('options_toggle_nome_labels').setAttribute('class', 'disabled');
			}
			if ( !MUH.NEW_SCROLL_ALERT ) {
				$('options_toggle_scroll_alert').setAttribute('class', 'disabled');
			}
			if ( !MUH.RESOURCE_LIMIT_TIME ) {
				$('options_toggle_resource_limit').setAttribute('class', 'disabled');
			}
			if ( !MUH.TRADE_CONFIRMATION ) {
				$('options_toggle_trade_confirmation').setAttribute('class', 'disabled');
			}
			if ( !MUH.ACCESS_KEYS ) {
				$('options_toggle_access_keys').setAttribute('class', 'disabled');
			}
			if ( !MUH.STORE_BANDITS ) {
				$('options_toggle_store_bandits').setAttribute('class', 'disabled');
			}
			if ( !MUH.INCLUDE_TRANSPORTS ) {
				$('options_toggle_include_transports').setAttribute('class', 'disabled');
			}
			if ( !MUH.DRAGGABLE_UI ) {
				$('options_toggle_draggable_ui').setAttribute('class', 'disabled');
			}
			if ( !MUH.DAY_PRODUCTION ) {
				$('options_toggle_day_production').setAttribute('class', 'disabled');
			}			
		} catch (exc) {
			MUH.debugHandleException('MUH.optionsInit', exc);
		}
	};

	// toggle an option
	// toggle is in the classname, which is either 'disabled' or not set/''
	MUH.optionsClick = function(option) {
		try {
			// the DOM element
			var li = $(option);
			var classname = li.getAttribute('class'); // if null, enabled
	
			// toggle the UI, only when a toggle 'option' was clicked
			if ( option.indexOf('toggle') >= 0 ) {
				var isenabled = (classname !== null); // set to new state
				if ( isenabled ) {
					li.removeAttribute('class');
				} else {
					li.setAttribute('class', 'disabled');
				}
			}
			
			switch( option ) {
			case 'options_toggle_labels':
				MUH.SHOW_LABELS = isenabled;
				// 'immediately' toggle labels
				var label_container = $('label_container');
				if ( label_container !== null ) {
					if ( isenabled ) {
						// show: reload				
						label_container.parentNode.removeChild(label_container);
						window.location.reload(false);
					} else {
						// hide: remove all children of label_container
						while ( label_container.childNodes.length > 0 ) {
							label_container.removeChild(label_container.childNodes[0]);
						}
					}
				}
				break;
			case 'options_toggle_nome_labels':
				MUH.SHOW_NOME_LABELS = isenabled;
				if ( $('coord') !== null ) {
					// reload nome view
					showGameItem('nomeLevel','','',$('coord').value);
				}
				break;
			case 'options_toggle_scroll_alert':
				MUH.NEW_SCROLL_ALERT = isenabled;
				break;
			case 'options_toggle_resource_limit':
				MUH.RESOURCE_LIMIT_TIME = isenabled;
				window.location.reload(false);
				break;
			case 'options_toggle_trade_confirmation':
				MUH.TRADE_CONFIRMATION = isenabled;
				break;
			case 'options_toggle_access_keys':
				MUH.ACCESS_KEYS = isenabled;
				if ( !isenabled ) { // stop interval
					clearInterval(MUH.timers.get('MUH.accessKeysScan').id);
				} else {
					setInterval('MUH.accessKeysScan()', MUH.timers.get('MUH.accessKeysScan').interval);
				}
				break;
			case 'options_toggle_store_bandits':
				MUH.STORE_BANDITS = isenabled;
				break;
			case 'options_toggle_include_transports':
				MUH.INCLUDE_TRANSPORTS = isenabled;
				break;
			case 'options_toggle_draggable_ui':
				MUH.DRAGGABLE_UI = isenabled;
				window.location.reload(false);
				break;
			case 'options_set_wall_highlights':
				var stored = MUH.cookieStore.get('wall_highlights');
				stored = ( stored === undefined || stored === null ) ? '' : stored;
				stored = prompt('Set your preferred Scribe Wall highlights (separated by whitespace)', stored);
				if ( stored !== null ) { 
					MUH.cookieStore.set('wall_highlights', stored.toLowerCase());
				}
				break;
			case 'options_toggle_day_production':
				MUH.DAY_PRODUCTION = isenabled;
				window.location.reload(false);
				break;
			}
			// and save
	   		MUH.createCookie('MUsettings', new $H({'options_toggle_labels': MUH.SHOW_LABELS,
	   											 'options_toggle_nome_labels': MUH.SHOW_NOME_LABELS,
	   											 'options_toggle_scroll_alert': MUH.NEW_SCROLL_ALERT,
	   											 'options_toggle_resource_limit': MUH.RESOURCE_LIMIT_TIME,
	   											 'options_toggle_trade_confirmation': MUH.TRADE_CONFIRMATION,
	   											 'options_toggle_access_keys': MUH.ACCESS_KEYS,
	   											 'options_toggle_store_bandits': MUH.STORE_BANDITS,
	   											 'options_toggle_include_transports': MUH.INCLUDE_TRANSPORTS,
	   											 'options_toggle_draggable_ui': MUH.DRAGGABLE_UI,
	   											 'options_toggle_day_production': MUH.DAY_PRODUCTION
   											 	}).toJSON(), 1000);
		} catch (exc) {
			MUH.debugHandleException('MUH.optionsClick', exc);
		}		
	};
	
	
	
	// Make certain elements draggable
	MUH.initDraggableUI = function() {
		try {
			// element IDs, only works for container elements that are in the document from the start
			var draggableElements = new $H({'scrollsbox': null, 'alliesbox': null, 'notesbox': null, 'cargoTrade': null,
											'MUHOptionsBox': null, 'MUstoredTradesWindow': null });
			draggableElements.each(function (pair) {
				var id = pair.key;
				var domElem = $(id);
				if ( domElem !== null ) {
					// restore previous position
					var dragStore = new Hash().merge(window.MUH.cookieStore.get('drags'));
					if ( dragStore !== undefined ) {
						var dragStoreElem = new Hash().merge(dragStore.get(id));
						if ( dragStoreElem !== undefined ) {
							domElem.style.left = dragStoreElem.get('left');
							domElem.style.top = dragStoreElem.get('top');
							if ( dragStoreElem.get('size') == 'large' ) {
								domElem.addClassName('large');
							}
						}
					}
					domElem.setAttribute('title', 'Ctrl-click to enable dragging, Shift-click to toggle size');
					
					Event.observe(domElem, 'click', function(e) {
						if ( !e ) {
							e = window.event;
						}
						// Shift-click on element to toggle size
						if ( e.shiftKey ) {
							if ( domElem !== undefined ) {
								var dragStore = new Hash().merge(window.MUH.cookieStore.get('drags'));
								var dragStoreElem = new Hash().merge(dragStore.get(id));
								if ( !domElem.hasClassName('large') ) {
									domElem.addClassName('large');
									dragStoreElem.set('size', 'large');
								} else {
									domElem.removeClassName('large');
									dragStoreElem.set('size', 'small');
								}
								dragStore.set(id, dragStoreElem);
								window.MUH.cookieStore.set('drags', dragStore);
							}
						}
						// Ctrl-click to toggle dragging 
						if ( e.ctrlKey ) {
							var handle = draggableElements.get(id);
							if ( handle !== null ) {
								handle.destroy();
								draggableElements.set(id, null);
								domElem.removeClassName('draggable');
								domElem.setAttribute('title', 'Ctrl-click to enable dragging, Shift-click to toggle size');
							} else {
								draggableElements.set(id, new Draggable(id, {
									onEnd: function(draggable, event) {
										try {
											var dragStore = new Hash().merge(window.MUH.cookieStore.get('drags'));
											var dragStoreElem = new Hash().merge(dragStore.get(id));
											var elem = draggable.element;
											dragStoreElem.set('left', elem.style.left);
											dragStoreElem.set('top', elem.style.top);
											dragStore.set(id, dragStoreElem);
											window.MUH.cookieStore.set('drags', dragStore);
										} catch (iexc) {}
									}
								}));
								domElem.addClassName('draggable');
								domElem.setAttribute('title', 'Ctrl-click to disable dragging, Shift-click to toggle size');
							}
						}
					});
				}
			});
		} catch (exc) {
			MUH.debugHandleException('MUH.initDraggableUI', exc);
		}
	};
		
	// show all-cities overview of resources, laborers and plots levels per resource type
	MUH.CoverviewWindow = Class.create();
	MUH.CoverviewWindow.prototype = {
		initialize: function() {
		
			try {
				this.accessKeys = $H({'Resources' : '1', 'Laborers' : '2', 'Plots' : '3'});
				this.tabs = new $H({'Resources' : 'Overview of resources in all your cities and monuments',
						'Laborers' : 'Overview of amount of laborers in all your cities and monuments',
						'Plots' : 'Overview of plot levels in all your cities and monuments'
						});
			} catch (exc) {
				MUH.debugHandleException('MUH.CoverviewWindow.initialize', exc);
			}
		},
		show: function(tab) {
			try {
				MUH.overviewLastTab = tab = ( (tab===undefined) ? ( (MUH.overviewLastTab===undefined) ? this.tabs.keys()[0] : MUH.overviewLastTab ) : tab );
				// clear game 'window'
				var game = $('game');
				game.textContent = '';
				
				// container window
				var cont = document.createElement('div');
				game.appendChild(cont);
				cont.setAttribute('id', 'MUoverviewWindow');
				// create headers
				var header1 = document.createElement('div');
				header1.setAttribute('class', 'h2line');
				var headerstr = 'Overview of';
				this.tabs.each(function(pair) {
					headerstr += ' [ ';
					if ( pair.key != tab ) {
						header1.appendChild(document.createTextNode(headerstr));
						headerstr = '';
						var headerlink = document.createElement('a');
						headerlink.setAttribute('href', '#bot');
						headerlink.setAttribute('onclick', 'MUH.overviewWindow.show("'+ pair.key +'")');
						headerlink.setAttribute('accesskey', this.accessKeys.get(pair.key));
						headerlink.textContent = pair.key;
						header1.appendChild(headerlink);
					} else {
						headerstr += pair.key;
					}
					headerstr += ' ]';
				}.bind(this));
				header1.appendChild(document.createTextNode(headerstr));
				cont.appendChild(header1);
				var header2 = document.createElement('div');
				header2.setAttribute('class', 'h3line');
				header2.textContent = this.tabs.get(tab);
				cont.appendChild(header2);
				
				var ctable = document.createElement('table');
				ctable.setAttribute('class', 'MUoverviewTableColumn');
				var chrow = document.createElement('tr');
				ctable.appendChild(chrow);
				chrow.setAttribute('class', 'header');
				var thcity = document.createElement('th');
				thcity.setAttribute('class', 'city');
				thcity.setAttribute('width', '200');
				thcity.innerHTML = '&nbsp;';
				chrow.appendChild(thcity);
				cont.appendChild(ctable);
				
				//create content table
				var tablecont = document.createElement('div');
				cont.appendChild(tablecont);
				tablecont.setAttribute('class', 'scrollbox');
				var table = document.createElement('table');
				tablecont.appendChild(table);
				table.setAttribute('class', 'MUoverviewTable');
				// header row with city names and then resource icon columns
				var hrow = document.createElement('tr');
				table.appendChild(hrow);
				hrow.setAttribute('class', 'header');
				// add icons
				MUH.mapPlotResources.each(function(res_pair) {
					if ( res_pair.key == 'Pyramid' || res_pair.key == 'Sphinx' ||
							(tab != 'Plots' && (res_pair.key == 'Warehouse' || res_pair.key == 'Market')) ) {
						return; // is a continue trough Prototype each construct
					}
					var th = document.createElement('th');
					hrow.appendChild(th);
					th.setAttribute('width', '40');
					var img = document.createElement('img');
					th.appendChild(img);
					// use plot images when tab = Plots instead
					if ( tab != 'Plots' ) {
						img.setAttribute('src', '/images/icon_'+ res_pair.value.toLowerCase() +'.png');
						img.setAttribute('title', res_pair.value);
						img.setAttribute('width', 24);
						img.setAttribute('height', 24);
					} else {
						// plot, use pair.key to lookup in MUH.plotImages
						var plImg = MUH.plotImages.get(res_pair.key);
						if ( plImg === undefined ) {
							plImg = res_pair.key.toLowerCase();
						}
						img.setAttribute('src', '/images/bldg_'+ plImg +'.png');
						img.setAttribute('title', res_pair.key);
						img.setAttribute('width', 32);
						img.setAttribute('height', 32);
					}
				});
				// add totals field (per city) for 'Laborers' tab
				if ( tab == 'Laborers' ) {
					var th = document.createElement('th');
					hrow.appendChild(th);
					th.setAttribute('width', '80');
					th.innerHTML = '&nbsp;';
				}
				var oddrow = true;
				var totals = new Hash(); // indexed by resource name, values can differ
				MUH.mycities.each(function(citmon_pair) {
					// citmon_pair; key is city ID, city object with attributes id, name, type
					var row = document.createElement('tr');
					table.appendChild(row);
					var crow = document.createElement('tr');
					ctable.appendChild(crow);
					if ( oddrow ) {
						row.setAttribute('class', 'row odd');
						crow.setAttribute('class', 'row odd');
					} else {
						row.setAttribute('class', 'row');
						crow.setAttribute('class', 'row');
					}
					var tdcity = document.createElement('td');
					crow.appendChild(tdcity);
					tdcity.setAttribute('onclick', 'showCity('+ citmon_pair.key +')');
					tdcity.setAttribute('title', 'Go to '+ citmon_pair.value.name);
					tdcity.setAttribute('class', 'city');
					tdcity.textContent = citmon_pair.value.name;
					// add totals field (per city) for 'Laborers' tab
					if ( tab == 'Laborers' ) {
						var laborTotals = {workers: 0, limit: 0};
					}
					MUH.mapPlotResources.each(function(res_pair) { // use this to get the resource names in order
						if ( res_pair.key == 'Pyramid' || res_pair.key == 'Sphinx' ||
								(tab != 'Plots' && (res_pair.key == 'Warehouse' || res_pair.key == 'Market')) ) {
							return; // is a continue trough Prototype each construct
						}
						var cell = document.createElement('td');
						row.appendChild(cell);
						if ( tab != 'Plots' ) {
							this.prepareCell(tab, cell, citmon_pair, res_pair.value, totals, laborTotals);
						} else { // use key/plot 'name' when plots
			   				this.prepareCell(tab, cell, citmon_pair, res_pair.value, totals);
						}
					}.bind(this));
					// add totals field (per city) for 'Laborers' tab
					if ( tab == 'Laborers' ) {
						var cell = document.createElement('td');
						row.appendChild(cell);
						cell.setAttribute('title', 'Total workers/plot limit (difference), excluding Exchange and Barracks');
						cell.textContent = laborTotals.workers +'/'+ laborTotals.limit +' ('+ (laborTotals.limit-laborTotals.workers) +')';
					}
					oddrow = !oddrow;
				}.bind(this));
				// totals row
				if ( tab != 'Plots' ) {
					var ctrow = document.createElement('tr');
					ctable.appendChild(ctrow);
					ctrow.setAttribute('class', 'row totals');
					var ctcity = document.createElement('td');
					ctcity.setAttribute('class', 'city');
					ctcity.innerHTML = '&nbsp;';
					ctrow.appendChild(ctcity);

					var trow = document.createElement('tr');
					table.appendChild(trow);
					trow.setAttribute('class', 'row totals');
					// add totals per resource
					MUH.mapPlotResources.each(function(res_pair) {
						if ( res_pair.key == 'Pyramid' || res_pair.key == 'Sphinx' ||
								res_pair.key == 'Warehouse' || res_pair.key == 'Market' ) {
							return; // is a continue trough Prototype each construct
						}
						var ttd = document.createElement('td');
						trow.appendChild(ttd);
						var resource = totals.get(res_pair.value);
						var title = 'Total '+ res_pair.key +' : ';
						this.fillCell(tab, ttd, -1, resource, [title], res_pair.key);
					}.bind(this));
					if ( tab == 'Laborers' ) {
						var ttd = document.createElement('td');
						trow.appendChild(ttd);
						ttd.innerHTML = '&nbsp;';
					}
				}
			} catch (exc) {
				MUH.debugHandleException('MUH.CoverviewWindow.show', exc);
			}
		},
		prepareCell: function(tab_type, target_cell, citmon_pair, resource_name, totals, laborTotals) {
			// add contents to 'target_call'(td), for 'tab_type',
			// citmon_pair; key is city ID, value is city name
			// resource_name; first-letter capitalizes resource
			try {
				var city_id = citmon_pair.key;
				var city_name = citmon_pair.value.name;
				switch ( tab_type ) {
				case 'Resources':
					var citycp = MUH.currentProduction.get(city_id);
					if ( citycp !== undefined ) {
						var cpResToClone = citycp.get(resource_name); 
						if ( cpResToClone !== undefined ) {
							var cpRes = {amount: cpResToClone.amount, change: cpResToClone.change}; // or else transport amounts are added all the time
							// incoming transports
							var trRes = undefined;
							var titleIncoming = undefined;
							if ( MUH.INCLUDE_TRANSPORTS ) {
								var trCity = MUH.incomingTransports.get(city_id);
								if ( trCity !== undefined ) {
									trRes = trCity.get(resource_name); // integer
									if ( trRes !== undefined ) {
										cpRes.amount += trRes;
										titleIncoming = ( trRes !== undefined ? ' ['+ trRes +' incoming]' : undefined);
									}
								}
							}
							// addup for totals
							var restotals = totals.get(resource_name);
							restotals = ( restotals === undefined ? {} : restotals );
							restotals.amount = Number(restotals.amount === undefined ? 0 : restotals.amount) + Number(cpRes.amount === undefined ? 0 : cpRes.amount);
							restotals.change = Number(restotals.change === undefined ? 0 : restotals.change) + Number(cpRes.change === undefined ? 0 : cpRes.change);
							totals.set(resource_name, restotals);
							// done addup for totals
							var title = [city_name +', '+ resource_name +' : ', titleIncoming];
							this.fillCell(tab_type, target_cell, citmon_pair, cpRes, title, resource_name);						
						}
					}
					break;
				case 'Laborers':
					var citylb = MUH.resourceLaborers.get(city_id);
					if ( citylb !== undefined ) {
						var reslb = citylb.get(resource_name);
						if ( reslb !== undefined ) {
							var restotals = totals.get(resource_name);
							restotals = ( restotals === undefined ? {workers: 0, limit: 0} : restotals );
							reslb.each(function(item) {
								restotals.workers += item.workers;
								restotals.limit += item.limit;
								// not for Exchange and Barracks
								if ( resource_name != 'Ships' && resource_name != 'Archers' && 
										resource_name != 'Spearmen' && resource_name != 'Charioteers' ) {
									laborTotals.workers += item.workers;
									laborTotals.limit += item.limit;
								}
							});
							totals.set(resource_name, restotals);
							var title = city_name +', '+ resource_name +' : ';
							this.fillCell(tab_type, target_cell, citmon_pair, reslb, title, resource_name);
						}
					}
					break;
				case 'Plots':
					var citypl = MUH.resourcePlotLevels.get(city_id);
					if ( citypl !== undefined ) {
						var resplot = citypl.get(resource_name);
						if ( resplot !== undefined ) {
							var title = city_name +', '+ resource_name +' level ';
							this.fillCell(tab_type, target_cell, citmon_pair, resplot, title, resource_name);
						}
					}
					break;
				}
			} catch (exc) {
				MUH.debugHandleException('MUH.CoverviewWindow.prepareCell', exc);
			}
		},
		fillCell: function(tab_type, target_cell, citmon_pair, resource, title, resource_name) {
			try {
				switch ( tab_type ) {
				case 'Resources':
					if ( resource !== undefined ) {
						var amount = resource.amount;
						var cellTitle = title[0];
						cellTitle += amount;
						if ( amount >= 10000 ) {
							target_cell.setAttribute('class', 'much');
							amount = Math.floor(amount/100)/10+'k';
						}
						target_cell.appendChild(document.createTextNode(amount));
						target_cell.appendChild(document.createElement('br'));
						var det = document.createElement('span');
						var change = Math.round(resource.change*100)/100; 
						if ( change !== 0 ) {
							if ( resource.change > 0 ) {
								det.setAttribute('class', 'pos');
								cellTitle += ' (+'+ change +')';
							} else {
								det.setAttribute('class', 'neg');
								cellTitle += ' ('+ change +')';
							}
							if ( Math.abs(change) >= 100 ) {
								change = Math.round(change);
							}
							det.textContent = change;
						} else {
							det.innerHTML = '&nbsp;';
							det.setAttribute('class', 'pos'); // to keep the font small
						}
						if ( MUH.INCLUDE_TRANSPORTS && title[1] !== undefined ) {
							cellTitle += title[1];
						}
						target_cell.setAttribute('title', cellTitle);
						target_cell.appendChild(det);
					}
					break;
				case 'Laborers':
					if ( resource !== undefined && resource_name != 'Laborers' ) {					
						if ( resource instanceof Array ) {
							var str = "";
							for ( rind = 0; rind < resource.length; rind++ ) {
								if ( str.length > 0 ) {
									str += ', ';
								}
								str += resource[rind].workers +'/'+ resource[rind].limit;
							}
							target_cell.textContent = str;
						} else {
							target_cell.textContent = resource.workers +'/'+ resource.limit;
						}				
						target_cell.setAttribute('title', title + target_cell.textContent);
					}
					break;
				case 'Plots':
					if ( resource !== undefined ) {
						if ( resource instanceof Array ) {
							target_cell.textContent = resource.join('/');
						} else {
							target_cell.textContent = resource;
						}
						var upgradeCity = MUH.cityUpgrades.get(citmon_pair.key)
						if ( upgradeCity !== undefined && 
								resource_name == MUH.mapPlotResources.get(upgradeCity.plotName.split(' ')[0]) ) {
							target_cell.setAttribute('title', title + target_cell.textContent + ' ['+ upgradeCity.upgradeTime +']');
							target_cell.appendChild(document.createElement('br'));
							target_cell.appendChild(document.createTextNode(upgradeCity.upgradeTime));
							target_cell.setAttribute('class', 'upgrading');
						} else {
							target_cell.setAttribute('title', title + target_cell.textContent);
						}
					}				
					break;
				}
			} catch (exc) {
				MUH.debugHandleException('MUH.CoverviewWindow.fillCell', exc);
			}
		},
		toString: function() {
			return "MUH.overviewWindow Object";
		}
	};
	// Create a popup that lists all stored trades
	MUH.CstoredTradesWindow = Class.create();
	MUH.CstoredTradesWindow.prototype = {
		initialize: function() {
			try {
				this.shown = false;
				this.win = null;
				this.cookiename = 'MUtrades';
				this.storedTradeToCopy = null; // used to store a trade that has to be sent
				this.createWindow();
			} catch (exc) {
				MUH.debugHandleException('MUH.CstoredTradesWindow.initialize', exc);
			}
		},
		show: function() {
			try {
				if ( !this.shown ) { // only show when not shown yet
					if ( this.win !== null ) {
						this.clear();
						this.win.show();
					} else {
						this.createWindow();
						this.win.show();
					}				
					this.fill();
					this.shown = true;
				}
			} catch (exc) {
				MUH.debugHandleException('MUH.CstoredTradesWindow.show', exc);
			}
		},
		hide: function() {
			try {
				if ( this.shown ) {
					this.win.hide(); //blindUp({duration:0.5});
					this.shown = false;
				}
			} catch (exc) {
				MUH.debugHandleException('MUH.CstoredTradesWindow.hide', exc);
			}
		},
		toggle: function() {
			if ( this.shown ) {
				this.hide();
			} else {
				this.show();
			}
		},
		createWindow: function() {
			try {
				this.win = document.createElement('div');				
				this.win.setAttribute('id', 'MUstoredTradesWindow');				
				this.win.setAttribute('style', 'display: none');
				// start close button
				var closeX = document.createElement('span');
				closeX.setAttribute('class', 'right');
				var bold = document.createElement('b');
				bold.appendChild(document.createTextNode('[ '));
				var ahref = document.createElement('a');
				ahref.setAttribute('title', 'Close Box');
				ahref.setAttribute('href', '#bot');
				ahref.setAttribute('onclick', "MUH.storedTradesWindow.hide()");
				ahref.textContent = 'X';
				bold.appendChild(ahref);
				bold.appendChild(document.createTextNode(' ]'));
				closeX.appendChild(bold);
				this.win.appendChild(closeX);
				// end close button
				// start title
				var title = document.createElement('div');
				title.setAttribute('class', 'h2line');
				title.textContent = 'Stored Trades';
				this.win.appendChild(title);
				// end title
							
				$('wrapper').appendChild(this.win);
			} catch (exc) {
				MUH.debugHandleException('MUH.CstoredTradesWindow.createWindow', exc);
			}
		},
		fill: function() {
			try {
				var mytrades = MUH.readCookie(this.cookiename);
				var mytradesLength = 0;				
				if ( mytrades !== null ) {
					mytradesLength = mytrades.length;
				}
				
				this.win.childNodes[1].setAttribute('title', 'Using '+ mytradesLength +'/4096 bytes to store these trades'); // set title with cookie size on the window title/header 
				if ( mytradesLength <= 10 ) {
					var empty = document.createElement('div');
					empty.textContent = 'No stored trades';
					this.win.appendChild(empty);
					return;
				}
				mytrades = new Hash().merge(mytrades.evalJSON(true));
				var cities = new Hash(); // cityID -> container element. As we go trough the trades, create new containers when non-existant
				mytrades.each(function(pair) {
					var trade = new MUH.Ctrade(pair.value);
					var citycontainer = cities.get(trade.get('fromId'));
					if ( citycontainer === undefined ) {
						citycontainer = document.createElement('div');
						citycontainer.setAttribute('class', 'city');
						cities.set(trade.get('fromId'), citycontainer);
	
						var subtitle = document.createElement('div');
						subtitle.setAttribute('class', 'h2');
						subtitle.textContent = ' Going out from '+ trade.get('fromName');
						citycontainer.appendChild(subtitle);
						this.win.appendChild(citycontainer);
					}
					var row = document.createElement('div');
					row.setAttribute('class', 'row');
					var timestamp = ( pair.key < 1000000000000 ? pair.key*1000 : Number(pair.key) ); // on feb 17 changed this to seconds since epoch				
					row.setAttribute('title', 'Created on '+ new Date(timestamp).toLocaleString());
					// start close button
					var closeX = document.createElement('span');
					closeX.setAttribute('class', 'right');
					var bold = document.createElement('b');
					var aupdate = document.createElement('a');
					aupdate.setAttribute('title', 'Last sent (click to reset)');
					aupdate.setAttribute('class', 'lastupdate');
					aupdate.setAttribute('href', '#bot');
					aupdate.setAttribute('onclick', 'MUH.storedTradesWindow.update('+ pair.key +')');
					var lastupdate = trade.get('lastupdate');
					if ( lastupdate !== undefined ) {
						var timeago = Math.round(new Date().getTime()/1000) - lastupdate;
						if ( timeago >= 86400 ) { // if longer than a day, display as 0d00h
							var days = Math.floor(timeago / 86400);
							var hours = Math.floor((timeago - days*86400) / 3600);
							hours = ( hours < 10 ? '0'+hours : hours);
							aupdate.textContent = days +'d'+ hours +'h';
						} else if ( timeago >= 3600 ){ // shorter than a day, longer than an hour, display as 0h00m
							var hours = Math.floor(timeago / 3600);
							var minutes = Math.floor((timeago - hours*3600) / 60);
							minutes = ( minutes < 10 ? '0'+minutes : minutes);
							aupdate.textContent = hours +'h'+ minutes +'m';
						} else { // shorter than an hour, display as 0m
							var minutes = Math.floor(timeago / 60);
							aupdate.textContent = minutes +'m';
						}
					} else {
						aupdate.textContent = '?';
					}
					bold.appendChild(aupdate);
					bold.appendChild(document.createTextNode(' [ '));
					var ahref = document.createElement('a');
					ahref.setAttribute('title', 'Remove this stored trade');
					ahref.setAttribute('href', '#bot');
					ahref.setAttribute('onclick', 'MUH.storedTradesWindow.remove('+ pair.key +')');
					ahref.textContent = 'X';
					bold.appendChild(ahref);
					bold.appendChild(document.createTextNode(' ]'));
					closeX.appendChild(bold);
					row.appendChild(closeX);
					// end close button
					// start trade button
					var trade_icon = document.createElement('img');
					trade_icon.setAttribute('src', '/images/btn_trade.png');
					trade_icon.setAttribute('class', 'trade');
					trade_icon.setAttribute('width', 16);
					trade_icon.setAttribute('height', 16);
					trade_icon.setAttribute('title', 'Open trade window for this stored trade');
					trade_icon.setAttribute('onclick', 'MUH.storedTradesWindow.openTrade('+ pair.key +')');
					row.appendChild(trade_icon);
					// end trade button
					// mail button if we have an id
					if ( trade.get('contactId') !== undefined ) {
						var mail_a = document.createElement('a');
						mail_a.setAttribute('onclick', 'composeMail('+ trade.get('contactId') +'); return false;');
						var mail_icon = document.createElement('img');
						mail_icon.setAttribute('class', 'mail');
						mail_icon.setAttribute('width', 13);
						mail_icon.setAttribute('height', 13);
						mail_icon.setAttribute('title', 'Send player a message');
						mail_icon.setAttribute('alt', '');
						mail_icon.setAttribute('src', 'images/icon_sendmail.png');
						mail_a.appendChild(mail_icon);
						row.appendChild(mail_a);
					}
					// end mail button
					var sp = document.createElement('span');
					sp.setAttribute('style', 'margin-right: 15px');
					sp.textContent = trade.get('contact') +', '+ trade.get('destName') + ' [Σ '+ trade.get('total') +' | '+ trade.get('travel') +'] ';
					row.appendChild(sp);
					var firstresource = true;
					trade.get('resources').each(function(pair) {
						var res_icon = document.createElement('img');
						res_icon.setAttribute('title', pair.key.substr(0, 1).toUpperCase() + pair.key.substr(1));
						res_icon.setAttribute('width', 18);
						res_icon.setAttribute('height', 18);
						res_icon.setAttribute('class', 'resource');
						res_icon.setAttribute('src','/images/icon_'+ pair.key.toLowerCase() +'.png');
						if ( !firstresource ) { // put comma if a resource was already added
							row.appendChild(document.createTextNode(', '));
						} else {
							firstresource = false;
						}
						row.appendChild(res_icon);
						row.appendChild(document.createTextNode(' '+ pair.value));
					});	  
					citycontainer.appendChild(row);
				}.bind(this) );
			} catch (exc) {
				MUH.debugHandleException('MUH.CstoredTradesWindow.fill', exc);
			}
		},
		clear: function() {
			// two items form the title and close button, keep those but remove all other childnodes
			try {
				while ( this.win.childNodes.length > 2 ) {
					this.win.removeChild(this.win.childNodes[this.win.childNodes.length-1]);
				}
			} catch (exc) {
				MUH.debugHandleException('MUH.CstoredTradesWindow.clear', exc);
			}
		},
		// store a trade, button is the 'store' button, cityID is the user's own (source) city
		store: function(button, cityID) {
			try {
				var tradeform = button.parentNode;
				var inputs = tradeform.getElementsByTagName('input');
				var dest_id_e = tradeform.select('#destid')[0];
				if ( dest_id_e === undefined ) { // Exchange (with yourself), skip this for now
					return;
				}
				var dest_id = Number(dest_id_e.value);
								
				var city = MUH.mycities.get(cityID);
				if ( city === null ) {
					return;
				}
				
				var tradewindow = tradeform.parentNode;
				var title = tradewindow.getElementsByTagName('div')[0].textContent.replace('Trading with ', '').split(' ('); // TODO Exchange
				var subtitle_e = tradewindow.getElementsByTagName('span')[1];
				var contact_name = title[1].replace(')','');
				var dest_name = title[0];
				var totalcargo = subtitle_e.getElementsByTagName('span')[1].textContent*1;
				var traveltime = subtitle_e.textContent.split(': ');
				traveltime = traveltime[traveltime.length-1].replace(' 00m', '');
				

				// try and find the mailform to store a userID.
				var contact_ID = undefined;
				try {
					var mailform = $('mailform');
					if ( mailform !== null ) {
						// compare 'to' name with trade name
						var mailto = mailform.getElementsByTagName('legend')[0].lastChild.nodeValue.replace(' ', '');
						if ( contact_name != mailto ) {
							alert( 'Player names do not match. Mail to: '+ mailto +', Trade to: '+ contact_name +'.\nOpen a mail form to '+ contact_name +'.\n\nCancelling storing of the trade.');
							return;
						} else {
							var input_to = mailform.getElementsByTagName('input')[1]; //first input is the subject line
							if ( input_to.getAttribute('name') == 'toid' ) {
								contact_ID = Number(input_to.getAttribute('value'));
							}
						}
					}
				} catch (mailtoexc) { }
				// end finding to ID
				
				if ( totalcargo <= 0 ) {
					alert('There is no cargo set to be traded.');
					return;
				}
				var trade = new MUH.Ctrade(null);
				trade.set(cityID, city.name, contact_ID, contact_name, dest_id, dest_name, totalcargo, traveltime);
				
				for ( var inp_ind = 0; inp_ind < inputs.length ; inp_ind++ ) {
					var thisinput = inputs[inp_ind]; 
					if ( thisinput.getAttribute('type') == 'text' &&
							thisinput.getAttribute('name') !== null &&
							thisinput.value > 0 ) {
						// only store when greater than zero to save on cookie size
						trade.addResource(thisinput.getAttribute('name'), thisinput.value*1);
					}
				}
				var mytrades = MUH.readCookie(this.cookiename);
				if ( mytrades === null ) {
					mytrades = new Hash();
				} else {
					mytrades = new Hash().merge(mytrades.evalJSON(true));
				}
	
				mytrades.set(Math.round(new Date().getTime()/1000), trade); // use seconds since epoch as unique identifier  DBG? divided it by 1000 to make it seconds on feb17, shouldn't cause conflicts for a long time
				mytrades = MUH.compressString(mytrades.toJSON());
				if ( mytrades.length > 4096 ) { // (probably) too long for cookie
					alert('Cannot add this trade because of the cookie size limit. Remove another trade first.');
					return;
				}
				MUH.createCookie(this.cookiename, mytrades, 1000);
				// mark button to show it being completed/accepted
				button.setAttribute('class', button.getAttribute('class') + 'clicked');
				button.removeAttribute('onclick');
				button.blur();
				// update the window if it's open
				if ( this.shown ) {
					this.clear();
					this.fill();
				}
			} catch (exc) {
				MUH.debugHandleException('MUH.CstoredTradesWindow.store', exc);
			}
		},
		remove: function(timestampid) {
			try {
				var mytrades = MUH.readCookie(this.cookiename);
				if ( mytrades === null ) {
					alert('Could not read cookie: '+ this.cookiename);
				} else if ( confirm("Do you really want to remove this stored trade?") ) {
					mytrades = new Hash().merge(mytrades.evalJSON(true));
	
					mytrades.unset(timestampid); // use seconds since epoch as unique identifier
					mytrades = MUH.compressString(mytrades.toJSON());
					MUH.createCookie(this.cookiename, mytrades, 1000);
					
					this.clear();
					this.fill();
				}
			} catch (exc) {
				MUH.debugHandleException('MUH.CstoredTradesWindow.remove', exc);
			}
			return false;
		},
		update: function(timestampid) {
			try {
				var mytrades = MUH.readCookie(this.cookiename);
				if ( mytrades === null ) {
					alert('Could not read cookie: '+ this.cookiename);
				} else {
					mytrades = new Hash().merge(mytrades.evalJSON(true));
	
					var trade = new MUH.Ctrade(mytrades.get(timestampid)); // use seconds since epoch as unique identifier
					trade.update();
					mytrades.set(timestampid, trade);
					mytrades = MUH.compressString(mytrades.toJSON());
					MUH.createCookie(this.cookiename, mytrades, 1000);
					
					this.clear();
					this.fill();
				}
			} catch (exc) {
				MUH.debugHandleException('MUH.CstoredTradesWindow.update', exc);
			}
			return false;
		},
		openTrade: function(timestampid) {
			try {
				var mytrades = MUH.readCookie(this.cookiename);
				if ( mytrades === null ) {
					alert('Could not read cookie: '+ this.cookiename);
				} else {
					// get the stored trade from the cookie and get the fromID and destID
					mytrades = new Hash().merge(mytrades.evalJSON(true));
					var trade = new MUH.Ctrade(mytrades.get(timestampid));
					
					if ( trade.get('fromId') === undefined || trade.get('destId') === undefined ) {
						alert('No such trade found: '+ this.cookiename +' ('+ timestampid +') '+ trade.toJSON());
					} else {
						this.storedTradeToCopy = trade;
						// all ok, inject an extra element we can easily check for - so when that's gone we know the form
						// has reloaded
						// TODO now only for trade with others
						var ctrade = $('cargoTrade');
						var hdiv = document.createElement('img');
						hdiv.setAttribute('src', '/images/loading.gif');
						hdiv.setAttribute('width', '43');
						hdiv.setAttribute('height', '11');
						hdiv.setAttribute('title', 'Loading');
						ctrade.textContent = '';
						ctrade.appendChild(hdiv);
						
						ctrade.setAttribute('style', ctrade.getAttribute('style').replace('display: none', ''));
						cargoTrade(trade.get('fromId'), trade.get('destId'), undefined, trade);
					}
				}
			} catch (exc) {
				MUH.debugHandleException('MUH.CstoredTradesWindow.openTrade', exc);
			}
		},
		scanCargoWindow: function(REQ, cityID, MUtrade) {
			// scan the cargoTrade form to add the 'Store Trade' button and set the sliders
			try {			
				// go trough all (resource)images that have an onload (which is an ondblclick here, check whether they match a resource in MUtrade
				// append a setSlider to the onload, take the slider ID from the createSlider call
				if ( MUtrade !== undefined ) {
					var imgs = REQ.dom.select('img');
					MUH.storedTradesWindow.checkSliderCount = 0; // used to count up and then down to react on the last slider set to check the total cargo amount
					for ( iind = 0; iind < imgs.length; iind++ ) {
						var img = imgs[iind];
						if ( img.hasAttribute('ondblclick') ) {
							var onload = img.getAttribute('ondblclick');
							var resourceName = onload.tail("'").head("'").replace('handle', '');
							var resourceTradeAmount = MUtrade.getResource(resourceName);
							if ( resourceTradeAmount !== undefined ) {
								var sliderID = 'slider'+ onload.lastTail(',').head(')');
								MUH.storedTradesWindow.checkSliderCount++;
								img.setAttribute('ondblclick', onload + '; setSliderValue(window["'+ sliderID +'"], '+ resourceTradeAmount +'); MUH.storedTradesWindow.checkTradeTotalCargo('+ MUtrade.get('total') +');');
							}
						}
					}
				}
				
				// store trade button
				var form = REQ.dom.select('#cargoform')[0];
				if ( form !== undefined ) {
					var inputs = form.getElementsByTagName('input');				
					// for cargoTool cityID is set to the current city, cargoTrade gives 0 though, but we can get the cityID from the form's onsubmit (cargoform)
					cityID = Number(form.getAttribute('onsubmit').tail('(').head(','));
					// if trade.contactId is not undefined, then open write an email
					if ( MUtrade !== undefined && MUtrade.get('contactId') !== undefined ) {
						var sendCargoStr = form.getAttribute('onsubmit').head(';');
						form.setAttribute('onsubmit', 'MUH.storedTradesWindow.tradeMail('+ MUtrade.get('contactId') +', "'+ MUtrade.get('destName') +'"); Effect.toggle("cargoTrade","appear",{duration:0.1}); '+ sendCargoStr +'; return false;');
					}
	
					// get for-last input element; the submit button, add a confirmation popup if it's the cargoform and it's set to 
					var input_submit = inputs[inputs.length - 2]; // for-last because of the marker
					if ( MUH.TRADE_CONFIRMATION &&
						 input_submit.getAttribute('type') == 'submit' ) { // just an extra check, and skip if not the right one
						 input_submit.setAttribute('onclick', 'return confirm("Are you sure you want to send this shipment?")');
					}
					form.appendChild(document.createElement('br'));
					var store = document.createElement('input'); 
					store.setAttribute('type', 'button');
					store.setAttribute('class', 'input-submit MUHinput-button');
					store.setAttribute('value', 'Store Trade');
					store.setAttribute('onclick', 'MUH.storedTradesWindow.store(this, '+ cityID +');');
					form.appendChild(store);
				}
			} catch (exc) {
				MUH.debugHandleException('MUH.CstoredTradesWindow.scanCargoWindow', exc);
			}
			return REQ;
		},
		checkTradeTotalCargo: function(tradeTotalCargo) {
			MUH.storedTradesWindow.checkSliderCount--;
			if ( MUH.storedTradesWindow.checkSliderCount == 0 ) {
				var submit = $('submitcargo');
				if ( $('totalcargo') === null || Number($('totalcargo').textContent) != Number(tradeTotalCargo) ) {
					submit.setAttribute('class', submit.getAttribute('class') +' MUHinput-buttonRed');
					submit.setAttribute('title', 'Your city did not have enough resources, ships, or something went wrong');
				} else {
					submit.setAttribute('class', submit.getAttribute('class') +' MUHinput-buttonGreen');
					submit.setAttribute('title', 'All resources and enough ships available, press to send');
				}
			}
		},
		tradeMail: function(contactId, destName) {
			try {
				// Parse the cargoform to take any changes and create a scroll
				var str = '';
				var inputs = $('cargoform').getElementsByTagName('input');			
				for ( iind = 0; iind < inputs.length; iind++ ) {
					//skip capacity and destid inputs
					var input = inputs[iind];
					if ( input.getAttribute('type') == 'text' && input.value > 0 ) {
						if ( str.length > 0 ) {
							str += ', ';
						}
						var resName = input.getAttribute('id');
						resName = resName.substr(0, 1).toUpperCase() + resName.substr(1); //uppercase first
						str += input.value +' '+ resName;
					}
				}
						
				var date = new Date();
				var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
				var str = 'Stored Trade '+ months[date.getMonth()] +' '+ date.getDate() +' : '+ str;
				
				var url = '/nile.php?what=composeMail&toid='+contactId+'&id=';
				var ajax = new Ajax.Request(url,{ onComplete: display });
			} catch (exc) {
				MUH.debugHandleException('MUH.CstoredTrade.tradeMail', exc);
			}
			function display(REQ){
				Effect.Appear('scrollsbox',{duration:0.3});
				$('scrollsbox').innerHTML = REQ.responseText;
				$('scrollsbox').select('#subject')[0].setAttribute('value', str);
				$('scrollsbox').select('#message')[0].textContent = str +' sent to '+ destName;
			}
		},
		toString: function() {
			return "MUH.storedTradesWindow Object";
		}
	};

	// wrapper for trade-store object
	MUH.Ctrade = Class.create();
	MUH.Ctrade.prototype = {
		initialize: function(hash) {
			try {
				if ( hash === null ) {
					this.data = new Hash();
				} else {
					this.data = new Hash().merge(hash);
					this.data.set('resources', new Hash().merge(this.data.get('resources')));
				}
			} catch (exc) {
				MUH.debugHandleException('MUH.Ctrade.initialize', exc);
			}
		},
		set: function(from_id, from_name, contact_ID, contact_name, dest_id, dest_name, totalcargo, traveltime, lastupdate) {
			try {
				this.data.set('fromId', from_id); // what city/monument to send from
				this.data.set('fromName', from_name.replace(/\'/g,"|")); // what city/monument to send from
				//this.data.set('fromName', from_name.sub("'","|",100)); // what city/monument to send from
				if ( contact_ID !== undefined ) {
					this.data.set('contactId', contact_ID); // undefined if not stored with a mailform open
				}
				this.data.set('contact', contact_name); // null if to another city of yourself
				this.data.set('destId', dest_id); // id of city/monument to trade to
				this.data.set('destName', dest_name.replace(/\'/g,"|")); // name of city/monument to trade to
				//this.data.set('destName', dest_name.sub("'","|",100)); // name of city/monument to trade to
				this.data.set('total', totalcargo); // amount of all resources
				this.data.set('travel', traveltime); // travel time
				if ( lastupdate === undefined ) {
					this.update();
				} else {
					this.data.set('lastupdate', lastupdate);
				}
				this.data.set('resources', new Hash()); // hash of resources in this trade, lowercase resourcename as key, amount as value
			} catch (exc) {
				MUH.debugHandleException('MUH.Ctrade.set', exc);
			} 
		},
		update: function() {
			try {
				this.data.set('lastupdate', Math.round(new Date().getTime()/1000));
			} catch (exc) {
				MUH.debugHandleException('MUH.Ctrade.update', exc);
			}
		},
		get: function(key) {
			// if 'fromName' or 'destName', replace '|'s with single quotes (replaced for single quote limitation in cookies in Opera)
			try {
				if ( key.indexOf('Name') >= 0 ) {
					return this.data.get(key).replace(/\|/g,"'");
				} else {
					return this.data.get(key);
				}
			} catch (exc) {
				MUH.debugHandleException('MUH.Ctrade.get', exc);
			}
		},
		addResource: function(resource_name, amount) {
			try {
				var resources = this.data.get('resources');
				resources.set(resource_name, amount);
				this.data.set('resources', resources);
			} catch (exc) {
				MUH.debugHandleException('MUH.Ctrade.addResource', exc);
			}
		},
		getResource: function(resource_name) {
			try {
				var resources = this.data.get('resources');
				return resources.get(resource_name);
			} catch (exc) {
				MUH.debugHandleException('MUH.Ctrade.getResource', exc);
			}
		},
		toJSON: function() {
			return this.data.toJSON();
		},
		toMailString: function() {
			//not used anymore since we parse the trade form directly now
			var str = '';
			this.data.get('resources').each(function(pair) {
				if ( str.length > 0 ) {
					str += ', ';
				}
				str += pair.value +' '+ pair.key;
			});
			var date = new Date();
			var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
			return 'Stored Trade '+ months[date.getMonth()] +' '+ date.getDate() +' : '+ str +' sent to '+ this.data.get('destName');
		}
	};
	
	// Class MUH.CexchangeAlerts. get/set alert on cookie backend
	// Cookie will be a Hash (indexed by city_id) pointing to an array of strings (resource names for which to alert).
	MUH.CexchangeAlerts = Class.create();
	MUH.CexchangeAlerts.prototype = {
		initialize: function() {
			try {
				this.cookiename = 'MUexchangeAlerts';
				var cookiestring = MUH.readCookie(this.cookiename);
				if ( cookiestring === null) {
					this.data = null;
				} else {
					this.data = cookiestring.evalJSON(true);
				}
			} catch (exc) {
				MUH.debugHandleException('MUH.CexchangeAlerts.initialize', exc);
			}
		},		
		// set resource to alert if doalert is true (else it will be unset to do so, if it was defined) at city
		set: function(city_id, resource_name, doalert) {
			try {
				var thisinput = $(resource_name);
				if ( thisinput === null ) {
					return;
				}
				
				if ( this.data === null ) {
					this.data = new Hash();
				}
				var city = this.data[city_id];
				if ( doalert && (city === undefined || (city !== undefined && city.indexOf(resource_name) == -1)) ) {
					if ( city === undefined ) {
						city = [resource_name];
					} else {// it's not yet in
						city.push(resource_name);
					}
					// add alert class
					thisinput.parentNode.setAttribute('class', thisinput.parentNode.getAttribute('class') + ' exchangeAlert' );
				} else if ( !doalert && city !== undefined ) {
					// remove it - yay for Prototype!
					city = city.without(resource_name);
					// remove alert class
					thisinput.parentNode.setAttribute('class', thisinput.parentNode.getAttribute('class').replace(' exchangeAlert', '') );
				}
				this.data[city_id] = city;
				// write away
				MUH.createCookie(this.cookiename, Object.toJSON(this.data), 1000);
			} catch (exc) {
				MUH.debugHandleException('MUH.CexchangeAlerts.set', exc);
			}
		},
		// get whether resource at city should alert
		get: function(city_id, resource_name) {
			try {
				if ( this.data === null || this.data[city_id] === undefined ) {
					return false;
				}
				return ( this.data[city_id].indexOf(resource_name) >= 0 );
			} catch (exc) {
				MUH.debugHandleException('MUH.CexchangeAlerts.get', exc);
			}
		},
		toggle: function(city_id, resource_name) {
			try {
				this.set(city_id, resource_name, !this.get(city_id, resource_name));
			} catch (exc) {
				MUH.debugHandleException('MUH.CexchangeAlerts.toggle', exc);
			}
		}
	};
	MUH.CcookieStore = Class.create();
	MUH.CcookieStore.prototype = {
		initialize: function() {
			try {
				this.cookiename = 'MUstore';
				this.store_data = new $H({});
				var cookiestring = MUH.readCookie(this.cookiename);
				if ( cookiestring !== null) {
					try {
						this.store_data = new Hash().merge(cookiestring.evalJSON(true));
					} catch (exc) {}
				}
			} catch (exc) {
				MUH.debugHandleException('MUH.CcookieStore.initialize', exc);
			}
		},
		set: function(key, value) {
			// store value in cookie
			try {
				this.store_data.set(key, value);
				// write away
				MUH.createCookie(this.cookiename, Object.toJSON(this.store_data), 1000);
			} catch (exc) {
				MUH.debugHandleException('MUH.CcookieStore.set', exc);
			}
		},
		get: function(key) {
			// get value from cookie
			try {
				var value = this.store_data.get(key);
				if ( value !== undefined ) {
					return value;
				} else {
					return undefined;
				}
			} catch (exc) {
				MUH.debugHandleException('MUH.CcookieStore.get', exc);
			}
		}
	}
	// Class MUH.CstoreBandits. Add buttons/icons for setting/using bandit outpost
	// Cookie will be the nome ID of the bandit outpost to be used
	MUH.CstoreBandits = Class.create();
	MUH.CstoreBandits.prototype = {
		initialize: function() {
		},
		setNome: function(nome_id) {
			// store nome ID in cookie
			try {
				MUH.cookieStore.set('nomeID', Number(nome_id));
			} catch (exc) {
				MUH.debugHandleException('MUH.CstoreBandits.setNome', exc);
			}
		},
		getNome: function() {
			try {
				// get nome ID from cookie
				var nome_id = MUH.cookieStore.get('nomeID');
				if ( nome_id !== undefined ) {
					return Number(nome_id);
				} else {
					return undefined;
				}
			} catch (exc) {
				MUH.debugHandleException('MUH.CstoreBandits.getNome', exc);
				return undefined;
			}
		},
		addUnitsButton: function(REQ, cityID) {			
			// put spearshield image in the Units header
			try {
				if ( REQ === undefined ) {
					return REQ;
				}
				var botUI = REQ.dom;
				
				if ( botUI.getElementsByTagName('ul')[0] === undefined ) {
					return REQ;
				}
				var parentElement = botUI.getElementsByTagName('ul')[0].getElementsByTagName('div')[0];
				
				var ssimg = document.createElement('img');
				ssimg.setAttribute('src', MUH.getImage('spearshield'));
				ssimg.setAttribute('id', 'MUHotoBanditsOutpost');
				ssimg.setAttribute('title', 'Goto stored bandits outpost');
				ssimg.setAttribute('onclick', 'MUH.storeBandits.gotoBanditsOutpost();');
				parentElement.insertBefore(ssimg, parentElement.childNodes[0]);
			} catch (exc) {
				MUH.debugHandleException('MUH.CstoreBandits.addUnitsButton', exc);
			}
			return REQ;
		},
		addStoreButton: function(parentElement) {
			// add 'store' button to bandit camp form
			try {
				parentElement.appendChild(document.createElement('br'));
				var storeButton = document.createElement('a');
				parentElement.appendChild(storeButton);
				storeButton.setAttribute('href', '#');
				storeButton.setAttribute('id', 'MUstoreBanditsOutpost');
				storeButton.setAttribute('class', 'txtbutton');
				storeButton.textContent = 'Store Bandit Outpost';
				storeButton.setAttribute('title', 'Store bandit outpost nome for shortcut key (will show in the Units resources header');
				storeButton.setAttribute('onclick', 'MUH.storeBandits.storeBanditsOutpost(this); return false;');
			} catch (exc) {
				MUH.debugHandleException('MUH.CstoreBandits.addStoreButton', exc);
			}
		},
		scanSendSoldiersForm: function(REQ) {
			// scan for the send soldier form and add the store button
			try {
				if ( REQ === undefined ) {
					return REQ;
				}
				var game = REQ.dom;
				if ( game === null ) {
					return REQ;
				}
				var contdiv = game.getElementsByTagName('div')[0];
				if ( contdiv === undefined ) {
					return REQ;
				}
				var divs = contdiv.getElementsByTagName('div');
				if ( divs === null || divs.length < 2 ) {
					return REQ;
				}
				if ( divs[0].textContent.indexOf('Defeat the Bandit Outposts in ') < 0 ) {
					return REQ;
				}
				var formdiv = divs[1].getElementsByTagName('div')[0];
				if ( formdiv === undefined ) {
					return REQ;
				}
				MUH.storeBandits.addStoreButton(formdiv);				
			} catch (exc) {
				MUH.debugHandleException('MUH.CstoreBandits.scanSendSoldiersForm', exc);
			}
			return REQ;
		},
		storeBanditsOutpost: function(element) {
			try {
				// get the nome ID, element is 'my' clicked button.
				if ( element === null || element === undefined ) {
					return;
				}
				var ahref = element.parentNode.getElementsByTagName('a')[0];
				if ( ahref === null ) {
					return;
				}
				this.setNome(ahref.getAttribute('onclick').split('(')[1].split(')')[0]);
				element.setAttribute('class', 'txtbuttonNeg');
				element.blur();
			} catch (exc) {
				MUH.debugHandleException('MUH.CstoreBandits.storeBanditsOutpost', exc);
			}
		},
		gotoBanditsOutpost: function() {
			// check for bandit camp, set marker if it already exists
			var donateform = $('donateform');
			if ( donateform !== null ) {
				var marker = document.createElement('div');
				marker.setAttribute('id', 'MUHdonateformMarker');
				marker.setAttribute('style', 'display: none;');
				donateform.appendChild(marker);
			}
			// open the right bandit camp
			showGameItem('banditOutpost', this.getNome());
			// fill in the max values automatically, start a timed-scan
			this.repeatTimerStart = new Date();
			this.repeatTimer = setInterval(function() {
				// wait till we find the form, or too long has passed
				if ( this.repeatTimerStart.getTime()+5000 < new Date().getTime() ) {//kill the timer
					//kill the timer
					clearInterval(this.repeatTimer);
				} else if ( $('donateform') !== null && $('MUHdonateformMarker') === null ) {
					//kill the timer
					clearInterval(this.repeatTimer);
					try {
						setSliderValue(sliderA, Infinity);
						setSliderValue(sliderB, Infinity);
						setSliderValue(sliderC, Infinity);
						clearInterval(this.repeatTimer);
					} catch (exc) {
					}
				}
			}.bind(this), 500); // run every half second
		}
	};
	
	// replace showGameItem in scribe wall to show a minimum of info in a popup
	MUH.CscribeWall = Class.create();
	MUH.CscribeWall.prototype = {
		initialize: function() {
			try {
				this.createUserDetailsPopup();
			} catch (exc) {
				MUH.debugHandleException('MUH.CscribeWall.initialize', exc);
			}
		},
		createUserDetailsPopup: function() {
			try {
				this.popup = document.createElement('div');
				this.popup.setAttribute('id', 'MUHuserDetailsPopup');
				var close = document.createElement('span');
				close.setAttribute('class', 'close');
				close.setAttribute('onclick', 'MUH.scribeWall.hideDetailsPopup();');
				close.setAttribute('title', 'Close this popup');
				close.textContent = '[ X ]';
				this.popup.appendChild(close);
				var container = document.createElement('div');
				this.popup.appendChild(container);
				document.getElementsByTagName('body')[0].appendChild(this.popup);
			} catch (exc) {
				MUH.debugHandleException('MUH.CscribeWall.createUserDetailsPopup', exc);
			}
		},
		playerClick: function(e, element, uid) {
			// if ctrl-click, put the name in the chat field.
			try {
				if ( e.ctrlKey ) {
					var textfield = $('msg');
					if ( textfield !== null ) {
						textfield.value = element.textContent +' '+ textfield.value;
						textfield.focus();
					}
				} else {
					// get posx, posy relative to the document
					var posx = 0, posy = 0;
					if ( !e ) var e = window.event;
					if ( e.pageX || e.pageY ) {
						posx = e.pageX;
						posy = e.pageY;
					} else if ( e.clientX || e.clientY ) {
						posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
						posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
					}
					var winWidth = 1024, winHeight = 768; // default
					if( typeof( window.innerWidth ) == 'number' ) {
					  //Non-IE
					  winWidth = window.innerWidth;
					  winHeight = window.innerHeight;
					} else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
					  //IE 6+ in 'standards compliant mode'
					  winWidth = document.documentElement.clientWidth;
					  winHeight = document.documentElement.clientHeight;
					} else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
					  //IE 4 compatible
					  winWidth = document.body.clientWidth;
					  winHeight = document.body.clientHeight;
					}
					
					// show wait image
					var container = this.popup.getElementsByTagName('div')[0];
					container.innerHTML = '';
					var waitimage = document.createElement('img');
					waitimage.setAttribute('src', '/images/loading.gif');
					container.appendChild(waitimage);
					this.popup.setAttribute('class', 'visible');
					// position to mouse, but different based on quadrant the mouse is at
					var style = 'left:'+ posx +'px;';
					style += ( posy-80 < winHeight / 2 ) ? 'top:'+ posy +'px;' : 'bottom:'+ (winHeight - posy+ ( document.body.offsetWidth < winWidth ? -20 : 0 ) ) +'px;';  
					this.popup.setAttribute('style',  style);
					var url = '/nile.php?what=userProfile&id='+uid;
					var ajax = new Ajax.Request(url,{ onComplete: this.displayDetailsPopup });
				}
			} catch (exc) {
				MUH.debugHandleException('MUH.CscribeWall.playerClick', exc);
			}
		},
		displayDetailsPopup: function(REQ) {
			// for some stupid reason 'display' is not in the same scope, so we can't use 'this' to get the popup
			var popup = $('MUHuserDetailsPopup');
			if (REQ.responseText.substring(0,6) == "ECODE:") {
				displayError(REQ.responseText.substring(6,10));
				popup.removeAttribute('class');
			} else if (REQ.responseText.substring(0,6) == "SCODE:") {
				displayResult(REQ.responseText.substring(6,10));
				popup.removeAttribute('class');
			} else {
				try {
					var container = popup.getElementsByTagName('div')[0];
					container.innerHTML = '';
					var dummy = document.createElement('div');
					dummy.innerHTML = REQ.responseText;
					// find the 'root' 'b' tag
					var divchilds = dummy.getElementsByClassName('uiToolBG')[0].childNodes;
					var citmons = undefined;
					for ( var dind = 0; dind < divchilds.length; dind++ ) {
						citmons = divchilds[dind];
						if ( citmons.nodeType == Node.ELEMENT_NODE &&
								citmons.tagName.toLowerCase() == 'b' ) {
							break;
						}
					}
					if ( citmons.innerHTML.length <= 1 ) {
						container.innerHTML = 'No such, or expired player';
						return;
					} else {	 
						// put each 'root' image on a new line (starting with the second) and make the images smaller
						// also remove monuments
						// root images don't have an 'a' element as parent
						var imgs = citmons.getElementsByTagName('img');
						for ( var iind = 0; iind < imgs.length; iind++ ) {
							var i = imgs[iind];
							if ( i.parentNode.tagName.toLowerCase() != 'a' ) {
								// check whether it's a monument
								if ( i.getAttribute('title') == 'Limestone' ) {
									// remove lastchilds until lastchild is this
									var parent = i.parentNode; 
									while ( parent.lastChild != i ) {
										parent.removeChild(parent.lastChild);
									}
									parent.removeChild(i);
									// break out
									break;
								}
								// newline
								if ( iind > 0 ) {
									i.parentNode.insertBefore(document.createElement('br'), i);
								}
								//resize
								i.setAttribute('width', '16');
								i.setAttribute('height', '16');
							}
						}
						// add contact name and 'scroll' image. name will open the profile
						var header = dummy.getElementsByClassName('uiToolBG')[0].getElementsByClassName('h1')[0];
						var h1 = document.createElement('div');
						h1.setAttribute('class', 'h1');
						var alink = header.getElementsByTagName('a')[0];
						// alink is undefined when you are clicking yourself
						if ( alink === undefined ) {
							container.innerHTML = 'Trading yourself is pointless';
							return;
						}
						// add scroll link
						var name = document.createElement('a');
						name.setAttribute('href', '#');
						name.setAttribute('title', 'View player profile');
						name.setAttribute('onclick', alink.getAttribute('onclick').replace('composeMail(', "showGameItem('userProfile',"));
						name.textContent = header.childNodes[0].nodeValue;
						h1.appendChild(name);
						h1.appendChild(alink);
						container.appendChild(h1);						
						container.appendChild(citmons);
		   				
						// change all onclicks to hide the popup
						var alinks = container.getElementsByTagName('a');
						for ( var aind = 0; aind < alinks.length; aind++ ) {
							var a = alinks[aind];
							a.setAttribute('onclick', a.getAttribute('onclick') +'; MUH.scribeWall.hideDetailsPopup();' );
						}
					}
				} catch (exc) {
					MUH.debugHandleException('MUH.CscribeWall.displayDetailsPopup', exc);
					popup.removeAttribute('class');
				}
			}
		},
		hideDetailsPopup: function() {
			try {
				this.popup.removeAttribute('class');
			} catch (exc) {
				MUH.debugHandleException('MUH.CscribeWall.hideDetailsPopup', exc);
			}
			return false;
		},
		scanScribeWall: function(REQ) {
			try {
				var chatlog = REQ.dom;
				
				var logentries = chatlog.getElementsByClassName('logentry');
				// check for highlights
				var highlights = MUH.cookieStore.get('wall_highlights');
				if ( highlights !== undefined && highlights !== null && highlights.length > 0 ) {
					highlights = highlights.split(' ');
					var temp = new Hash();
					for ( hind = 0; hind < highlights.length; hind++ ) {
						temp.set(highlights[hind], 0);
					}
					highlights = temp;
				} else {
					highlights = undefined;
				}
				// it can reload and entries would be nonexistant suddenly, just catch silently
				for ( var lind = 0; lind < logentries.length; lind++ ) {
					var entry = logentries[lind];
					var nameNode = entry.getElementsByTagName('a')[0];
					var nameNodeLCtext = nameNode.textContent.toLowerCase(); // lower case text
					var messageNode = entry.childNodes[entry.childNodes.length-1];
					var messageNodeLCtext = messageNode.textContent.toLowerCase(); // lower case text

					var a = entry.getElementsByTagName('a')[0];
					a.setAttribute('onclick', a.getAttribute('onclick').replace("showGameItem('userProfile',", 'MUH.scribeWall.playerClick(event, this, ').replace(');', '); return false;'));
					a.setAttribute('title', 'Click to open profile, ctrl-click to insert name in textfield'); 
					
					if ( highlights !== undefined ) {
						var ind = 0;
						highlights.each(function(pair) {
							if ( nameNodeLCtext.indexOf(pair.key) >= 0 ) {
								// name
								entry.setAttribute('class', entry.getAttribute('class')+ ' sl sl'+ind);
								throw $break; // break; no multiple hits
							} else if ( messageNodeLCtext.indexOf(pair.key) >= 0 ) {
								// written text
								highlights.set(pair.key, pair.value + 1);
								entry.setAttribute('class', entry.getAttribute('class')+ ' hl hl'+ind);
								throw $break; // break; no multiple hits
							}
							ind++;
						});
					}
					// make links clickable
					var messageStr = messageNode.textContent;
					if ( messageStr.match(/https?:\/\//) ||
						 messageStr.indexOf('www.') >= 0 ) {
						// prepend http:// to www. if it's not there. Makes other regexp easier, and need http:// in a url to make it link global
						// no negative look-back, so just allow for two http://'s and get rid of those again
						messageStr = messageStr.replace(/ www\./g, ' http://www.');
						messageStr = messageStr.replace(/\/\/http:/g, '');
						var span = document.createElement('span');
						span.innerHTML = messageStr.replace(/(https?:\/\/[^ ]+)/g, '<a target="_blank" href="$1">$1</a>');
						entry.replaceChild(span, messageNode);
					}
				}
				// add results
				if ( highlights !== undefined && chatlog.getElementsByClassName('logentry').length > 0 ) {						
					var highlightscount = $('highlight_counts');
					if ( highlightscount === null ) {
						highlightscount = document.createElement('div');
						highlightscount.setAttribute('id', 'highlight_counts');
						highlightscount.setAttribute('style', '');
						
						// unfortunately outside the chatlog element
						var insert = $('chatlog').parentNode.getElementsByClassName('h2line')[0];
						insert.insertBefore(highlightscount, insert.childNodes[0]);
					}
					highlightscount.textContent = 'Highlight counts: ';
					highlights.each(function(pair) {
						highlightscount.textContent += pair.key +': '+ pair.value +' ';
					});
				}
			} catch (exc) {
				MUH.debugHandleException('MUH.CscribeWall.scanScribeWall', exc);
			}
			return REQ;
		}
	};
	
	// Add a simple filter to the Logs
	MUH.ClogFilter = Class.create();
	MUH.ClogFilter.prototype = {
		initialize: function() {
		},
		scanForLogWindow: function(REQ) {
			try {
				// look for the log window and inject
				var game = REQ.dom;
				if ( game !== null ) {
					var headers = game.getElementsByClassName('h2line');
					if ( headers !== null && headers.length > 0 ) {
						var headerText = headers[0].textContent;
						if ( headerText.indexOf('Game Log') >= 0 ) {
							var div = document.createElement('div');
							div.setAttribute('id', 'MUHlogFilter');
							var form = document.createElement('form');
							form.setAttribute('action', '');
							form.setAttribute('onsubmit', 'window.MUH.logFilter.apply(); return false;');
							var input = document.createElement('input');
							input.setAttribute('id', 'MUHlogFilterInput');
							input.setAttribute('type', 'text');
							input.setAttribute('size', '16');
							form.appendChild(input);
							var apply = document.createElement('input');
							apply.setAttribute('class', 'submit');
							apply.setAttribute('type', 'submit');
							apply.setAttribute('value', 'Apply Filter');
							form.appendChild(apply);
							div.appendChild(form);
							headers[0].insertBefore(div, headers[0].childNodes[0]);
						}
					}
				}
			} catch (exc) {
				MUH.debugHandleException('MUH.ClogFilter.scanForLogWindow', exc);
			}
			return REQ;
		},
		apply: function() {			
			var filter = $('MUHlogFilterInput').value = $('MUHlogFilterInput').value.strip().toLowerCase();
			var gamelog = $('gamelog');
			if ( gamelog !== null ) {
				gamelog.select('.logentry').each(function (element) {
					// skip the last row, which shows the different pages
					if ( !element.hasAttribute('style') ) {
						element.removeClassName('hiddenentry');
						// now, if it matches the filter in some way, clear it
						if ( filter.length != 0 ) {
							element.addClassName('hiddenentry'); // just to be sure we don't get duplicates
							if ( element.textContent.stripTags().toLowerCase().indexOf(filter) >= 0 ) {
								// simple text
								element.removeClassName('hiddenentry');
							} else {
								// goods images
								var imgs = element.select('img');
								for ( iind = 1; iind < imgs.length; iind++ ) {
									if ( imgs[iind].getAttribute('title').toLowerCase().indexOf(filter) >= 0 ) {
										element.removeClassName('hiddenentry');
										break;
									}
								}
							}
						}
					}
				});
			}
		}
	}

	MUH.setStyle = function() {
	MUH.newstyle = document.createElement('style');
	MUH.newstyle.setAttribute('type', 'text/css');
	MUH.newstyle.textContent = '\
		#MUHOptionsBox {\
			font-size: 9px;\
			position: absolute;\
			top: 5px;\
			left: 5px;\
			width: 110px;\
			border-style: solid;\
			border-width: 1px;\
			border-color: #555;\
			padding: 5px 0px 5px 5px;\
			background: transparent url("/images/bg_75opacity.png") repeat scroll 0% 0%;\
			-moz-border-radius: 5px;\
			z-index: 1001;\
			color: #aaaaaa;\
			padding-right: 4px;\
		}\
		#MUHOptionsBox .h2line {\
			font-size: 11px;\
		}\
		#MUHOptionsBox #myOptionsList {\
			padding-left: 15px;\
			margin-bottom: 2px;\
		}\
		\
		#MUHOptionsBox #myOptionsList li {\
			list-style-type: circle;\
			cursor: pointer;\
		}\
		#MUHOptionsBox #myOptionsList li.set {\
			list-style-type: square;\
		}\
		#MUHOptionsBox #myOptionsList li:hover.disabled {\
			color: #ff7070;\
		}\
		#MUHOptionsBox #myOptionsList li:hover {\
			color: white;\
		}\
		#MUHOptionsBox #myOptionsList li.disabled {\
			color: red;\
		}\
		#botUI {\
			overflow: visible !important;\
		}\
		#botUI > div {\
			position: relative;\
		}\
		#botUI .diffPos,\
		#botUI .diffNeg {\
		  position: absolute;\
		}\
		#botUI .timeLeft {\
		  position: absolute;\
		  font-size: 9px;\
		  display: inline;\
		  vertical-align: sub;\
		  margin-top: 10px;\
		  margin-left: 3px;\
		  cursor: help;\
		}\
		#botUI .timeLeftShort {\
			color: orange;\
		}\
		#botUI .timeLeftRealShort {\
			color: red;\
		}\
		#botUI #productionScanned,\
		#upgradeUI #upgradeScanned {\
			visibility: hidden;\
			display: none;\
		}\
		#cityHotkeys {\
			display: block;\
			position: absolute;\
			right: -3px;\
			top: -30px;\
		}\
		#cityHotkeys img {\
			margin-right: 3px;\
			cursor: pointer;\
			border-style: none;\
			border-width: 0px;\
		}\
		.costList {\
			text-align: left;\
		}\
		.costList .done {\
			position: absolute;\
			color: rgb(51, 204, 0);\
			font-size: 9px;\
			vertical-align: super;\
			margin-left: 5px;\
			cursor: help;\
		}\
		.costList .donewithtransport {\
			position: absolute;\
			color: orange;\
			font-size: 9px;\
			vertical-align: super;\
			margin-left: 5px;\
			cursor: help;\
		}\
		.costList .shortage {\
			position: absolute;\
			font-size: 9px;\
			vertical-align: super;\
			color: red;\
			margin-left: 5px;\
			cursor: help;\
		}\
		.costList .time {\
			position: absolute;\
			font-size: 9px;\
			vertical-align: sub;\
			margin-top: 10px;\
			font-size: 9px;\
			margin-left: 5px;\
			cursor: help;\
		}\
		.uiList {\
			margin-bottom: 2px !important;\
		}\
		.uiList a img,\
		.uiList img {\
			width: 20px;\
			height: 20px;\
			border-style: solid;\
			border-width: 2px;\
			border-color: rgb(29,0,0);\
			padding: 2px;\
		  -moz-border-radius: 5px;\
		}\
		.uiList a img,\
		.uiList img.resourceClickable {\
			border-style: solid;\
			border-width: 2px;\
			border-color: rgb(80,0,0);\
		}\
		.uiList a img:hover,\
		.uiList img.resourceClickable:hover {\
			background: rgb(80, 0, 0);\
		}\
		.resourceClickable {\
			cursor: pointer;\
		}\
		#currentVersion {\
			float: right;\
			cursor: pointer;\
		}\
		.bonusTipText {\
			margin-left: 3px;\
			font-size: 9px;\
			color: rgb(51, 255, 0);\
		}\
		#totalTransports {\
			padding: 4px;\
			background: rgb(121, 21, 21) none repeat scroll 0% 0%;\
			margin-bottom: 6px;\
		}\
		#cargoexchange .inputImg,\
		#cargoform .inputImg {\
			cursor: pointer;\
		}\
		#cargoexchange .exchangeAlert,\
		#cargoform .exchangeAlert {\
			background-color: rgb(121, 21, 21);\
		}\
		#label_container {\
			position: relative;\
			width: 0px;\
			height: 0px;\
			top: -378px;\
		}\
		#label_container .label,\
		.nomelabel,\
		.nomelabelleft,\
		.nomelabelright,\
		.nomecityactivityleft,\
		.nomecityactivityright {\
			position: absolute;\
			z-index: 200;\
		}\
		#label_container .label .text {\
			position: relative;\
			left: -50%;\
			padding: 0px 5px 2px 5px;\
			background: transparent url("/images/bg_50opacity.png") repeat scroll 0% 0%;\
			font-size: 0.8em;\
			white-space: nowrap;\
		}\
		#label_container .label .text .low {\
			background-color: #00DD00;\
			color: #00DD00;\
		}\
		#label_container .label .text .med {\
			background-color: #EEEE00;\
			color: #EEEE00;\
		}\
		#label_container .label .text .high {\
			background-color: #FF0000;\
			color: #FF0000;\
		}\
		#label_container .label .text .progress {\
			position: absolute;\
			bottom: 0px;\
			left: 0px;\
			height: 2px;\
		}\
		.nomelabel,\
		.nomelabelleft,\
		.nomelabelright {\
			bottom: -9px;\
			padding: 1px 3px;\
			white-space: nowrap;\
			font-size: 9px;\
			background: transparent url("/images/bg_50opacity.png") repeat scroll 0% 0%;\
			min-width: 40px;\
			text-align: center;\
		}\
		.nomelabelleft,\
		.nomecityactivityleft {\
			left: 0px;\
			margin: 0px 12px;\
		}\
		.nomelabelright,\
		.nomecityactivityright {\
			right: 0px;\
			margin: 0px 12px;\
		}\
		.nomemonument {\
			bottom: 2px;\
			margin: 0px 6px;\
		}\
		.nomecityactivityleft,\
		.nomecityactivityright {\
			margin: 0px 2px;\
		}\
		input.MUHinput-buttonclicked,\
		input.MUHinput-button {\
			margin-left: 10px;\
			margin-top: 8px;\
			cursor: pointer;\
			color: #99C9FF;\
			background-color: #003A7A;\
			border-color: #005ABE;\
		}\
		input.MUHinput-buttonGreenclicked,\
		input.MUHinput-buttonGreen {\
			cursor: pointer;\
			color: #9DF37F;\
			background-color: #27770C;\
			border-color: #3AB211;\
		}\
		input.MUHinput-buttonRedclicked,\
		input.MUHinput-buttonRed {\
			cursor: pointer;\
			color: #FF9999;\
			background-color: #7E0000;\
			border-color: #C00000;\
		}\
		input.MUHinput-buttonclicked {\
			cursor: default;\
			color: #FF9999;\
			background-color: #7E0000;\
			border-color: #C00000;\
		}\
		#MUstoredTradesWindow {\
			-moz-border-radius-bottomleft:8px;\
			-moz-border-radius-bottomright:8px;\
			-moz-border-radius-topleft:8px;\
			-moz-border-radius-topright:8px;\
			background:transparent url("/images/bg_90opacity.png") repeat scroll 0 0;\
			border:1px solid #333;\
			padding:10px;\
			position:absolute;\
			left:25px;\
			top:190px;\
			width:885px;\
			z-index:801;\
		}\
		#MUstoredTradesWindow .row {\
			background: #222;\
			margin-bottom: 3px;\
			padding: 3px;\
		}\
		#MUstoredTradesWindow .row:hover {\
			background: #333;\
		}\
		#MUstoredTradesWindow .row b {\
			margin-right: 5px;\
		}\
		#MUstoredTradesWindow .row b .lastupdate {\
			margin: 0px 5px;\
		}\
		#MUstoredTradesWindow .row img {\
			vertical-align: top;\
		}\
		#MUstoredTradesWindow .row img.trade,\
		#MUstoredTradesWindow .row img.mail {\
			margin-right: 5px;\
			cursor: pointer;\
		}\
		#MUstoredTradesWindow .row img.mail {\
			margin-top: 2px;\
		}\
		#MUoverviewWindow .scrollbox {\
			width: 720px;\
			overflow: auto;\
		}\
		#MUoverviewWindow table {\
			table-layout: fixed;\
			width: 1040px;\
			border-style: none;\
			border-width: 0px;\
			padding: 0px;\
			margin: 20px 0px 0px 0px;\
			border-spacing: 0px;\
		}\
		#MUoverviewWindow table.AEoverviewTableColumn {\
			width: 200px;\
			float: left;\
		}\
		#MUoverviewWindow table.AEoverviewTable {\
			clear: left;\
		}\
		#MUoverviewWindow table tr.row td {\
			height: 30px;\
			overflow: hidden;\
			white-space: nowrap;\
			font-size: 0.8em;\
			text-align: center;\
			cursor: help;\
		}\
		#MUoverviewWindow table tr.odd {\
			background-color: rgb(21, 21, 21);\
		}\
		#MUoverviewWindow table tr:hover {\
			background-color: rgb(36, 36, 36);\
		}\
		#MUoverviewWindow table tr.header {\
			height: 46px;\
		}\
		#MUoverviewWindow table tr.header,\
		#MUoverviewWindow table tr.totals,\
		#MUoverviewWindow table tr.totals:hover {\
			background-color: rgb(42, 42, 42);\
		}\
		#MUoverviewWindow table tr td.much {\
			color: #888888;\
		}\
		#MUoverviewWindow table tr td.upgrading {\
			background-color: #753030;\
		}\
		#MUoverviewWindow table tr td .pos {\
			color: #33CC00;\
			font-size: 9px;\
		}\
		#MUoverviewWindow table tr td .neg {\
			color: #FF0000;\
			font-size: 9px;\
		}\
		#MUoverviewWindow table tr th.city,\
		#MUoverviewWindow table tr td.city {\
			font-size: 1em;\
			font-weight: bold;\
			text-align: left;\
			cursor: default;\
		}\
		#MUoverviewWindow table tr td.city {\
			cursor: pointer;\
		}\
		#MUHotoBanditsOutpost {\
			cursor: pointer;\
			float: right;\
			margin-top: 2px;\
			margin-right: 10px\
		}\
		#MUstoreBanditsOutpost {\
			 line-height: 50px;\
		}\
		.AEbanditsRewards {\
			margin-top: 0.3em;\
			font-size: 0.8em;\
			float: right;\
		}\
		.AEdonationProgress {\
			margin-top: 0.3em;\
			margin-left: 10px;\
			font-size: 0.8em;\
		}\
		#MUHuserDetailsPopup {\
			-moz-border-radius-bottomleft:8px;\
			-moz-border-radius-bottomright:8px;\
			-moz-border-radius-topleft:8px;\
			-moz-border-radius-topright:8px;\
			background:transparent url("/images/bg_90opacity.png") repeat scroll 0 0;\
			border:1px solid #333;\
			padding:10px;\
			position:absolute;\
			min-width:250px;\
			z-index:802;\
			display:none;\
		}\
		#MUHuserDetailsPopup.visible {\
			display:block;\
		}\
		#MUHuserDetailsPopup > div {\
			margin-right: 30px;\
		}\
		#MUHuserDetailsPopup > div > .h1 {\
			font-size: 14px;\
		}\
		#MUHuserDetailsPopup > div > .h1 a {\
			text-decoration: none;\
		}\
		#MUHuserDetailsPopup > .close {\
			float: right;\
			font-family: arial,sans-serif;\
			font-size: 12px;\
			color: #AAAAAA;\
			cursor: pointer;\
		}\
		#MUHuserDetailsPopup > .close:hover {\
			color: white;\
		}\
		#MUHlogFilter {\
			float: right;\
			font-size: 12px;\
		}\
		#MUHlogFilter #MUHlogFilterInput,\
		#MUHlogFilter .submit {\
			color: #c5a1a1;\
			background-color: rgb(34, 34, 34);\
			border-color: rgb(170, 51, 51);\
			border-width: 1px;\
		}\
		#MUHlogFilter #MUHlogFilterInput {\
			height: 15px;\
			font-size: 12px;\
			padding: 0px 2px;\
			margin-right: 5px;\
		}\
		#MUHlogFilter .submit {\
			margin-right: 10px;\
		}\
		#gamelog .hiddenentry {\
			display: none;\
		}\
		#game #highlight_counts {\
			font-size: 10px;\
			float: right;\
			margin: 3px 10px 0px 0px;\
		}\
		#chatlog .hl {\
			background-color: rgb(102, 52, 52);\
		}\
		#chatlog .hl0 {\
			background-color: rgb(52, 52, 102);\
		}\
		#chatlog .hl1 {\
			background-color: rgb(162, 62, 62);\
		}\
		#chatlog .sl {\
			color: rgb(162, 102, 102);\
		}\
		#chatlog .sl0 {\
			color: rgb(102, 102, 162);\
		}\
		#chatlog .sl1 {\
			color: rgb(212, 122, 122);\
		}\
		';
	if ( MUH.WALL_SMALL_CAPS ) {
		// Enable small-caps for Scribe Wall chat 
		MUH.newstyle.textContent += '\
			.logentry {\
				font-variant: small-caps !important;\
			}\
		';
	}
	if ( MUH.DRAGGABLE_UI ) {
		MUH.newstyle.textContent += '\
			.draggable {\
				cursor: move;\
			}\
			#scrollsbox {\
				height: 30px !important;\
			}\
			#scrollsbox #mail {\
				height: 145px !important;\
			}\
			#scrollsbox.large #mail {\
				height: 300px !important;\
			}\
			#scrollsbox > .sm {\
				display: none;\
			}\
			#alliesbox {\
				width: 200px !important;\
				padding: 5px !important;\
				font-size: smaller;\
			}\
			#alliesbox .h2 {\
				font-size: 12px;\
			}\
			#alliesbox > span, \
			#alliesbox br {\
				display: none;\
			}\
			#alliesbox > span.right {\
				display: inline;\
			}\
			#alliesbox form input#name {\
				width: 95px;\
			}\
			#alliesbox.large {\
				height: 550px !important;\
			}\
			#alliesbox.large > #allieslist {\
				height: 465px !important;\
			}\
			#alliesbox > #allieslist {\
				height: 280px !important;\
			}\
			#alliesbox > #allieslist > div {\
				margin-bottom: -3px !important;\
				overflow: auto;\
			}\
			#alliesbox > #allieslist > div > div {\
				margin-bottom: 1px !important;\
			}\
			#alliesbox > #allieslist > div > div,\
			#alliesbox > #allieslist > div > img,\
			#alliesbox > #allieslist > div > span,\
			#alliesbox > #allieslist > div > a {\
				float: left;\
				display: block;\
			}\
			#alliesbox > #allieslist > div > div {\
				clear: left;\
				width: 180px;\
				padding: 0px !important;\
			}\
			#alliesbox > #allieslist > div > img {\
				width: 16px;\
				height: 16px;\
				margin-right: 3px;\
				clear: left;\
			}\
			#alliesbox > #allieslist > div > a > img {\
				width: 11px;\
				height: 12px;\
				vertical-align: middle;\
				margin-left: 3px;\
			}\
		';
	}		
	document.getElementsByTagName('head')[0].appendChild(MUH.newstyle);
	}
	
	MUH.init = function() {
		Object.extend(String.prototype, {
		head: function(pattern) {
			// split string on first occurance of pattern and return the first part, 'split' is twice as slow as using substring(indexOf())
			var index = this.indexOf(pattern);
			if ( index >= 0 ) {
				return this.substring(0, index);
			} else {
				return this.toString();
			}
		},
		tail: function(pattern) {
			// split string on first occurance of pattern and return the last part, 'split' is twice as slow as using substring(indexOf())
			var index = this.indexOf(pattern);
			if ( index >= 0 ) {
				return this.substr(index+pattern.length);
			} else {
				return this.toString();
			}
		},
		lastTail: function(pattern) {
			// split string on last occurance of pattern and return the last part, 'split' is twice as slow as using substring(indexOf())
			var index = this.lastIndexOf(pattern);
			if ( index >= 0 ) {
				return this.substr(index+pattern.length);
			} else {
				return this.toString();
			}
		}
		});
		try {
			window.MUH.storedTradesWindow = new MUH.CstoredTradesWindow();
			window.MUH.overviewWindow = new MUH.CoverviewWindow();
			window.MUH.cookieStore = new MUH.CcookieStore();
			if ( MUH.STORE_BANDITS ) {
				window.MUH.storeBandits = new MUH.CstoreBandits();
			}			
			
			// *** hookables
			// create 'namespace' HOOK if undefined
			if ( window.HOOK === undefined ) {
				window.HOOK = $H({});
			}
			// hook chatLog
			if ( window.HOOK.get('chatLog') === undefined ) {
				window.HOOK.set('chatLog', []);
			}
			window.MUH.scribeWall = new MUH.CscribeWall();
			window.HOOK.get('chatLog').unshift(MUH.scribeWall.scanScribeWall);

			// hook showBotUI
			if ( window.HOOK.get('showBotUI') === undefined ) {
				window.HOOK.set('showBotUI', []);
			}
			if ( MUH.SCAN_NEW_SCROLL ) {
				window.HOOK.get('showBotUI').unshift(MUH.newScrollScan);
			}
			if ( MUH.STORE_BANDITS ) {
				window.HOOK.get('showBotUI').unshift(MUH.storeBandits.addUnitsButton);
			}
			if ( MUH.SHOW_PRODUCTION ) {
				window.HOOK.get('showBotUI').unshift(MUH.productionUI);
			}
			window.HOOK.get('showBotUI').unshift(MUH.addButtons);
			window.HOOK.get('showBotUI').unshift(MUH.getAllCitMons);
			// hook show city for parsing plots
			if ( MUH.PARSE_PLOTS ) {
				if ( window.HOOK.get('showCity') === undefined ) {
					window.HOOK.set('showCity', []);
				}
				window.HOOK.get('showCity').unshift(MUH.parsePlots);
			}
			// hook marketUI
			if ( MUH.MARKET_SCAN ) {
				if ( window.HOOK.get('showListingItems') === undefined ) {
					window.HOOK.set('showListingItems', []);
				}
				window.HOOK.get('showListingItems').unshift(MUH.marketScan);
			}
			// hook laborTool
			if ( MUH.LABORERS_BEP ) {
				if ( window.HOOK.get('laborTool') === undefined ) {
					window.HOOK.set('laborTool', []);
				}
				window.HOOK.get('laborTool').unshift(MUH.laborToolScan);
			}
			if ( window.HOOK.get('cargoTrade') === undefined ) {
				window.HOOK.set('cargoTrade', []);
			}
			window.HOOK.get('cargoTrade').unshift(MUH.storedTradesWindow.scanCargoWindow);
			// hook cargoTool and cargoTrade
			if ( MUH.EXCHANGE_ALERTS ) {
				if ( window.HOOK.get('cargoTool') === undefined ) {
					window.HOOK.set('cargoTool', []);
				}
				window.HOOK.get('cargoTrade').unshift(MUH.exchangeCargoScan);
				window.HOOK.get('cargoTool').unshift(MUH.exchangeCargoScan);
			}
			// hook plotLevel scan (for when being upgraded)
			if ( window.HOOK.get('manageObject') === undefined ) {
				window.HOOK.set('manageObject', []);
			}
			window.HOOK.get('manageObject').unshift(MUH.getPlotLevel);
			
			// hook upgradeUI and foundCityUI
			if ( MUH.SHOW_PRODUCTION ) {
				// hook manageObject and showGameItem->foundCityUI 
				if ( window.HOOK.get('showGameItem_foundCityUI') === undefined ) {
					window.HOOK.set('showGameItem_foundCityUI', []);
				}
				window.HOOK.get('showGameItem_foundCityUI').unshift(MUH.upgradeUI);
				
				window.HOOK.get('manageObject').unshift(MUH.upgradeUI);
				
				if ( window.HOOK.get('selectObject') === undefined ) {
					window.HOOK.set('selectObject', []);
				}
				window.HOOK.get('selectObject').unshift(MUH.upgradeUI);
			}			
			// hook banditOutpost
			if ( MUH.STORE_BANDITS || MUH.SHOW_BANDITS_REWARDS ) {
				if ( window.HOOK.get('showGameItem_banditOutpost') === undefined ) {
					window.HOOK.set('showGameItem_banditOutpost', []);
				}
				if ( MUH.STORE_BANDITS ) {
					window.HOOK.get('showGameItem_banditOutpost').unshift(MUH.storeBandits.scanSendSoldiersForm);
				}
				if ( MUH.SHOW_BANDITS_REWARDS ) {
					window.HOOK.get('showGameItem_banditOutpost').unshift(MUH.banditsOutpostScan);
				}
			}
			// hook nomeLevel
			if ( window.HOOK.get('showGameItem_nomeLevel') === undefined ) {
				window.HOOK.set('showGameItem_nomeLevel', []);
			}
			window.HOOK.get('showGameItem_nomeLevel').unshift(MUH.nomeScan);
			// hook transportsUI
			if ( MUH.TOTAL_TRANSPORTS ) {
				if ( window.HOOK.get('showGameItem_transportsUI') === undefined ) {
					window.HOOK.set('showGameItem_transportsUI', []);
				}
				window.HOOK.get('showGameItem_transportsUI').unshift(MUH.totalTransports);
			}
			// gameLogUI for log filter and access keys
			if ( MUH.LOG_FILTER || MUH.ACCESS_KEYS ) {
				if ( window.HOOK.get('showGameItem_gameLogUI') === undefined ) {
					window.HOOK.set('showGameItem_gameLogUI', []);
				}
			}
			// hook game log filter
			if ( MUH.LOG_FILTER ) {
				window.MUH.logFilter = new MUH.ClogFilter();				
				window.HOOK.get('showGameItem_gameLogUI').unshift(MUH.logFilter.scanForLogWindow);
			}
			// access keys
			if ( MUH.ACCESS_KEYS ) {
				// chatUI headers
				if ( window.HOOK.get('showGameItem_chatUI') === undefined ) {
					window.HOOK.set('showGameItem_chatUI', []);
				}
				window.HOOK.get('showGameItem_chatUI').unshift(MUH.accessKeysScan);
				// game log 
				window.HOOK.get('showGameItem_gameLogUI').unshift(MUH.accessKeysScan);
			}
			// hook showListingItems, to hook to sellOrderTotals
			if ( window.HOOK.get('showListingItems') === undefined ) {
				window.HOOK.set('showListingItems', []);
			}
			window.HOOK.get('showListingItems').unshift(MUH.sellOrderTotals);
			// *** end hookables

			MUH.optionsInit();
			MUH.setStyle();
			// draggable UI
			if ( MUH.DRAGGABLE_UI ) {
				MUH.initDraggableUI();
			}
		} catch (exc) {
			MUH.debugHandleException('MUH.init', exc);
		}
	}
	MUH.init();
	
	// Replace old server clock, with one that doesn't skew, since the printed time is based on a newly created timestamp everytime.
	function srvclock(srvsec, srvm, srvhr, zone) {
		try {
			var now = new Date();
			var servernow = new Date(now.getTime());
			if ( zone == 'EST' && now.getMonth() > 1 && now.getMonth() < 10 ) { // rough USA daylight savings test, from 1st March till 1st November, though it really is 2nd Sunday / 1st Sunday 
				srvhr++;
				zone = 'EDT';
			}
			servernow.setHours(srvhr, srvm, srvsec); // overwrite time from the server
			var serverTimeOffset = now.getTime() - servernow.getTime(); // store difference with local PC
			// Now update by an interval, which doesn't skew off
			// The variables 'serverTimeOffset' and 'zone' are available in the callback, because it's inside this function's scope.
			setInterval(function () {
				var clientDate = new Date(new Date().getTime()-serverTimeOffset);
				var srvtime = document.getElementById('srvtime');
				var hours = clientDate.getHours();
				var ap = (hours < 12 ? "AM" : "PM");
				if ( hours === 0 ) {
					hours = 12;
				} else if ( hours > 12 ) {
					hours -= 12;
				}
				var seconds = ( clientDate.getSeconds() < 10 ? "0"+clientDate.getSeconds() : clientDate.getSeconds() );
				var minutes = ( clientDate.getMinutes() < 10 ? "0"+clientDate.getMinutes() : clientDate.getMinutes() );
			
				srvtime.textContent = hours +':'+ minutes +':'+ seconds +' '+ ap +' '+ zone;
			}, 1000);
		} catch (exc) {
			MUH.debugHandleException('srvclock', exc);
		}
	}
}

function HOOK_script() {
	var script = document.getElementsByTagName('head')[0].appendChild(document.createElement('script'));
	script.setAttribute('type', 'text/javascript');
	return script.textContent=HOOK_script.toString().replace(/[\s\S]*"\$1"\);([\s\S]*)}/,"$1");
	// run the hooks in window.HOOK.get(key) on REQ and return the result
	// in some cases a cityID is passed as well, which the 'parser' can use not having to find that itself
	function runHooks(key, REQ, cityID, param) {
		try {
			var start = new Date().getTime();
			if ( REQ !== undefined && window.HOOK !== undefined && window.HOOK.get(key) !== undefined ) {
				// try to see whether putting img's with onload in a non-hosted div actually calls the function
				REQ.responseText = REQ.responseText.replace(/onload/g, 'ondblclick');
				var div = document.createElement('div');
				div.innerHTML = REQ.responseText;
				REQ.dom = div;				
				for (var i = 0; i < window.HOOK.get(key).length; i++) {
					REQ = window.HOOK.get(key)[i](REQ, cityID, param);
				}
				REQ.responseText = REQ.dom.innerHTML;
				// try to see whether putting img's with onload in a non-hosted div actually calls the function
				REQ.responseText = REQ.responseText.replace(/ondblclick/g, 'onload');
				REQ.dom = null;
			}
		} catch (exc) {
			MUH.debugHandleException('runHooks', exc);
		}
		return REQ;
	}
	// hookable replacement Ajax.Updater
	Ajax.Updater = Class.create(Ajax.Request, {
		initialize: function($super, container, url, options) {
			this.container = {
				success: (container.success || container),
				failure: (container.failure || (container.success ? null : container))
			};

			options = Object.clone(options);
			var onComplete = options.onComplete;
			options.onComplete = (function(response, json) {
				if (Object.isFunction(onComplete)) response = onComplete(response, json);
				this.updateContent(response.responseText);
			}).bind(this);

			$super(url, options);
		},

		updateContent: function(responseText) {
			var receiver = this.container[this.success() ? 'success' : 'failure'], options = this.options;

			if (!options.evalScripts) responseText = responseText.stripScripts();

			if (receiver = $(receiver)) {
				if (options.insertion) {
					if (Object.isString(options.insertion)) {
						var insertion = {}; insertion[options.insertion] = responseText;
						receiver.insert(insertion);
					} else options.insertion(receiver, responseText);
				} else receiver.update(responseText);
			}
		}
	});

	// hookable replacement Ajax.PeriodicalUpdater
	Ajax.PeriodicalUpdater = Class.create(Ajax.Base, {
		initialize: function($super, container, url, options) {
			options = Object.clone(options);
			$super(options);
			this.onComplete = this.options.onComplete;
	
			this.frequency = (this.options.frequency || 2);
			this.decay = (this.options.decay || 1);
			this.onStop = this.options.onStop;
	
			this.updater = { };
			this.container = container;
			this.url = url;

			this.start();
		},
	
		start: function() {
			this.options.onComplete = (function(response, json) {
				if ( $(this.container) ) {
					if (Object.isFunction(this.onComplete)) response = this.onComplete(response, json);
					this.updateComplete(response);
				}
				return response;
			}).bind(this);
			this.onTimerEvent();
		},
	
		stop: function() {
			this.updater.options.onComplete = undefined;
			this.updater.onComplete = undefined;
			this.updater.updateContent = undefined;
			this.options.onComplete = undefined;
			this.onComplete = undefined;
			this.updateComplete = undefined;
			clearTimeout(this.timer);
			(this.options.onStop || Prototype.emptyFunction).apply(this, arguments);
		},
	
		updateComplete: function(response) {
			if (this.options.decay) {
				this.decay = (response.responseText == this.lastText ? this.decay * this.options.decay : 1);
				this.lastText = response.responseText;
			}
			this.timer = this.onTimerEvent.bind(this).delay(this.decay * this.frequency);
		},
		onTimerEvent: function() {
			this.updater = new Ajax.Updater(this.container, this.url, this.options);
		}
	});
	// end hookable Ajax.PeriodicalUpdater
	
	// hookable chatLog function
	function chatLog(channel) {
		if (document.chatupdater) {
			document.chatupdater.stop();
		}
		document.chatupdater = new Ajax.PeriodicalUpdater('chatlog', 'nile.php?what=chatLog&channel='+channel, {method: 'get', frequency: 10, onComplete: runOnComplete});
		//$('chatlog').innerHTML = "<img src=\"/images/loading.gif\" width=\"43\" height=\"11\" alt=\"\" title=\"Loading\" />";

		function runOnComplete(REQ) {
			return runHooks('chatLog', REQ);
		}

		//check to see if chatupdater should be shut off
		checkchatter = function() {
			 if ($('chatlog') == null){ 
			 	//user no longer viewing chat display, so stop the updater!
				clearTimeout (window.checkid);
				document.chatupdater.stop();
			 } else {
				checkid = window.setTimeout("checkchatter()",30000)
				mins-=1
			}
		}
		checkchatter();
	}
	// hookable showBotUI function
	function showBotUI(cityid) {
		// store this city ID
		MUH.currentCityID = cityid;

		if (document.botUIupdater) {
			document.botUIupdater.stop();
		}
		document.botUIupdater = new Ajax.PeriodicalUpdater('botUI', 'nile.php?what=botUI&cityid='+cityid, {method: 'get', frequency: 300, onComplete: runOnComplete});
		
		function runOnComplete(REQ) {
			REQ = runHooks('showBotUI', REQ, cityid);
			
			if ( $('laborTool') !== null ) {
				// re-parse #laborTool, to update BEP, doing this on the 'live' DOM
				MUH.laborToolScan({dom: $('laborTool')}, cityid);
			}
			return REQ;
		}
	}
	// end of hookable showBotUI function

	// hookable showCity function
	function showCity(cityid) {
		var url = '/nile.php';
		var params = 'what=showCity&cityid='+cityid+'';

		var ajax = new Ajax.Request(url,{
			method: 'get',
			parameters: params,
			onComplete: display
		});
		function display(REQ){
			REQ = runHooks('showCity', REQ, cityid);
			$('game').innerHTML = REQ.responseText;
		}
	}
	// end of hookable showCity function
	// hookable showGameItem function
	function showGameItem(what,id,var2,var3) {
		var url = '/nile.php?what='+what+'&id='+id+'&var2='+var2+'&var3='+var3+'';
		var ajax = new Ajax.Request(url,{ onComplete: display });

		function display(REQ){
			if (REQ.responseText.substring(0,6) == "ECODE:") {
				displayError(REQ.responseText.substring(6,10));
			} else if (REQ.responseText.substring(0,6) == "SCODE:") {
				displayResult(REQ.responseText.substring(6,10));
			} else {				
				REQ = runHooks('showGameItem_'+ what, REQ, id);
				$('game').innerHTML = REQ.responseText;
			}
		}
	}
	// end of hookable showGameItem function
	// hookable laborTool function
	function laborTool(id,plot,action,val, resource_name) {
		var url = '/nile.php';
		var params = 'what=laborTool&plot='+plot+'&action='+action+'&val='+val+'&id='+id+'';
		$('laborTool').innerHTML = "<img src=\"/images/loading.gif\" width=\"43\" height=\"11\" alt=\"\" title=\"Loading\" />";
		var ajax = new Ajax.Request(url,{
			method: 'get',
			parameters: params,
			onComplete: display
		});
		// Set new labor amount for resource_name based on action and val and MUH.resourceLaborers
		try {
			if ( resource_name !== undefined ) {
				var plotLaborers = MUH.resourceLaborers.get(id).get(resource_name)[0];
				switch ( action ) {
				case "add":
					plotLaborers.workers += val;
					break;
				case "subtract":
					plotLaborers.workers -= val;
					break;
				default:
					plotLaborers.workers = val;						
				}				
			}
		} catch (exc) {
			MUH.debugHandleException('laborTool', exc);
		}
		
		function display(REQ){
			REQ = runHooks('laborTool', REQ, id);
			$('laborTool').innerHTML = REQ.responseText;
		}
	}
	// end of hookable laborTool function
	// hookable showListingItems function
	function showListingItems(cityid,type,whatitem) {
		var url = '/nile.php';
		var params = 'what=showListingItems&cityid='+cityid+'&type='+type+'&item='+whatitem+'';
		$('listingitems').innerHTML = "<img src=\"/images/loading.gif\" width=\"43\" height=\"11\" alt=\"\" title=\"Loading\" />";
		var ajax = new Ajax.Request(url,{
			method: 'get',
			parameters: params,
			onComplete: display
		});
		
		function display(REQ){
			REQ = runHooks('showListingItems', REQ, cityid);
			$('listingitems').innerHTML = REQ.responseText;
		}
	}
	// end of hookable showListingItems function	
	// hookable manageObject function
	function manageObject(id,plot,type,tradeto) {
		var url = '/nile.php';
		var params = 'what=manageObject&plot='+plot+'&id='+id+'&type='+type+'&tradeto='+tradeto+'';
		
		var ajax = new Ajax.Request(url,{
			method: 'get',
			parameters: params,
			onComplete: display
		});
		
		function display(REQ){
			REQ = runHooks('manageObject', REQ, id);
			$('game').innerHTML = REQ.responseText;
		}
	}
	// end of hookable manageObject function
	// hookable selectObject function
	function selectObject(id,plot) {
		var url = '/nile.php';
		var params = 'what=selectObject&plot='+plot+'&id='+id+'';
		
		var ajax = new Ajax.Request(url,{
			method: 'get',
			parameters: params,
			onComplete: display
		});
		
		function display(REQ){
			REQ = runHooks('selectObject', REQ, id);
			$('game').innerHTML = REQ.responseText;
		}
	}
	// end of hookable selectObject function
	// hookable cargoTool function
	function cargoTool(id,type,result) {
		var url = '/nile.php';
		var params = 'what=cargoTool&id='+id+'&type='+type+'&result='+result+'';
		
		var ajax = new Ajax.Request(url,{
			method: 'get',
			parameters: params,
			onComplete: display
		});
		
		function display(REQ){
			REQ = runHooks('cargoTool', REQ, id);
			$('cargoTool').innerHTML = REQ.responseText;
		}
	}
	// end of hookable cargoTool function
	// hookable cargoTrade function, added parameter MUtrade to pass my stored trade to the hooked functions
	function cargoTrade(id,toid,result, MUtrade) {
		var url = '/nile.php';
		var params = 'what=cargoTrade&id='+id+'&toid='+toid+'&result='+result+'';
		var ajax = new Ajax.Request(url,{
			method: 'get',
			parameters: params,
			onComplete: display
		});
		
		function display(REQ){
			REQ = runHooks('cargoTrade', REQ, id, MUtrade);
			$('cargoTrade').innerHTML = REQ.responseText;
		}
	}
	// end of hookable cargoTrade function
	// hookable showListingItems function
	function showListingItems(cityid,type,whatitem) {
		var url = '/nile.php';
		var params = 'what=showListingItems&cityid='+cityid+'&type='+type+'&item='+whatitem+'';
		$('listingitems').innerHTML = "<img src=\"/images/loading.gif\" width=\"43\" height=\"11\" alt=\"\" title=\"Loading\" />";
		var ajax = new Ajax.Request(url,{
			method: 'get',
			parameters: params,
			onComplete: display
		});
		
		function display(REQ){
			REQ = runHooks('showListingItems', REQ, cityid, type);
			$('listingitems').innerHTML = REQ.responseText;
		}
	}
	// end of hookable showListingItems function
	
	// can't intercept the first call to showCity quickly enough, so parse the shown city
	// but it's tricky, if you do this too quickly, we're still reading the 'showCity(ID)' script bit - though we can't change it.
	window.startupHookPoller = window.setInterval(function() {
		try {
			if ( game = document.getElementById('game') ) {
				// wait till the initial content is gone, just call it another time, since stele bonus and other data isn't calculated //TODO fix that?
				if ( game.textContent.indexOf('CDATA') < 0) {
					var plot = document.getElementById('plot1box') || document.getElementById('mplot5p') || document.getElementById('mplot5s');
					if ( plot !== null ) {
						showCity(Number(plot.getAttribute('onclick').tail("('").head("',")));
					}
					window.clearInterval(window.startupHookPoller);
				}
			}
		} catch (exc) {
			MUH.debugHandleException('startupHookPoller', exc);
		}
	}, 500);
	// stop it from running indefinitely if something goes wrong
	window.setTimeout(function() {window.clearInterval(window.startupHookPoller);}, 10000);
}


//a basic test, so it doesn't run on the login page
if ( document.getElementById('header') != null ) {
	DOM_script();
	HOOK_script();
}
