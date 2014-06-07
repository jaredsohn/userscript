/*
    Main developer: F.M.
    Additional features: Martin Hedman
	
	Changelog:
	v1.00	First official release.
	v1.01	Better logging of exp and loot from achievements.
	v1.02	New way to determine if page has reloaded or not.
			Moscow Boss now always city 3.
			Test to ignore help again jobs.
			Fix for Wars, Boosts and Loots.
	v1.03	Tracking of jobs done and in what cities.
	v1.04	Bangkok added.
	v1.05	More Bangkok added.
	v1.06	Valentines and more Bangkok episodes added.
	v1.07	Updated to handle responses in the right infobox.
	v1.08	Updated for the new boss help format in Moscow and Bangkok
	v1.09	Added option to customize the number of posts to fetch per request.
	v1.10	Added sending Chop Shop parts to friends.
			New achievements.
	v1.11	Pause on event now avalible. Also showing exp/energy ratios.
	v1.12	Added upgrade Chop Shop part sending.
	v1.13	Added crew jobs.
	v1.14	Updated holiday job output and added reverse option
	v1.15	Added cookie for keeping track of latest url checked.
	v1.15	Added new robbery bonus
	v1.17	Added easter crew job
	v1.18	Added Weapons Depot
	v1.19	Switching to FQL instead of stream.get
	v1.20	Added call for burner (broken?) and rewrote retry handling
	v1.21	Autostart option added, tweaked what should be cut out from the s response.
	v1.22	Added the clicking of confirmation boxes.
	v1.24	Updated for the new Zynga userid. p|number
	v1.25	Added the Casino Vault loot
	v1.26	Added Las Vegas jobs/bosses and building parts
	v1.27	Fixed for Zynga changes
	v1.28	Fixed for Zynga Mumbai changes
*/

// ==UserScript==
// @name        Only For Me
// @namespace   
// @description Please this script for test not recomended
// @include     http://apps.facebook.com/inthemafia*
// @exclude     http://facebook.mafiawars.com/mwfb/remote/html_server.php?xw_controller=gift*
// @version     1.28
// ==/UserScript==

javascript: (function () {
	if (navigator.appName == 'Microsoft Internet Explorer') {
		alert('You are using Internet Explorer, this bookmarklet will not work.\nUse Firefox or Chrome instead.');
	}
	else if (document.getElementsByName('mafiawars')[0]) {
		window.location.href=document.getElementsByName('mafiawars')[0].src;
		return;
	}
	else if (document.getElementsByClassName('canvas_iframe_util')[0]) {
		window.location.href=document.getElementsByClassName('canvas_iframe_util')[0].src;
		return;
	}
	else if (document.getElementById('some_mwiframe')) {
		//new mafiawars.com iframe
		window.location.href=document.getElementById('some_mwiframe').src;
		return;
	}
	else {
		document.body.parentNode.style.overflowY="scroll";
		document.body.style.overflowX="auto";
		document.body.style.overflowY="auto";
		try {
			document.evaluate('//div[@id="mw_city_wrapper"]/div',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0).style.margin="auto";
			if(typeof FB != 'undefined') {
				FB.CanvasClient.stopTimerToSizeToContent; 
				window.clearInterval(FB.CanvasClient._timer);
				FB.CanvasClient._timer=-1;
			}
			document.getElementById('mw_zbar').parentNode.removeChild(document.getElementById('mw_zbar'));
		}
		catch (fberr) {}
	}
  var userid = /'sf_xw_user_id': '(.+)'/.exec(document.body.innerHTML)[1];
  var fbuserid;
  	FB.ensureInit(function() {
		try {
			fbuserid = FB.Facebook.apiClient.get_session().uid+'';
		}
		catch (fberr) {
			alert('Error: '+fberr+'\n\n\nIf you get "TypeError: FB.Facebook.apiClient.get_session() is null"\nthat means you are logged out from Facebook.\nGo to www.facebook.com and log in again.');
		}
	});
  //var fbuserid = FB.Facebook.apiClient.get_session().uid+'';
  var version = 'Stream Helper v1.28 beta',
    aft = '&skip_interstitial=1&skip_req_frame=1',
    mw_url = 'http://facebook.mafiawars.com/mwfb/remote/html_server.php?xw_controller=stats&xw_action=view&user=',
    fb_url = 'http://www.facebook.com/profile.php?id=',
    manual = 0,
    combinedloot = '',
    money = [],
	jobsdone = [],
	jobsnum = [],
	other_apps = [],
    exp = 0,
    run = 0,
    wait = 0,
	t = new Date(),
    wait1 = 4,
    wait2 = 6,
	limit = 1000,
	pause = 0,
	ratiolvl = 99,
	ratiolvl2 = 99,
	expneed = 0,
	reverse = false,
	laundry_limit = false,
	newyork_limit = false,
	cuba_limit = false,
	moscow_limit = false,
	bangkok_limit = false,
	retries=0,
    content = document.getElementById('popup_fodder'),
	preurl = 'http://facebook.mafiawars.com/mwfb/';
  var loots = new Array();
  var debug = false;
  var debug2 = false;
  if (debug) { console.log('In debug mode.'); }
  
	money['$'] = 0;
	money['C$'] = 0;
	money['R$'] = 0;
	money['B$'] = 0;
	money['V$'] = 0;
	jobsdone['New York'] = 0;
	jobsdone['Cuba'] = 0;
	jobsdone['Moscow'] = 0;
	jobsdone['Bangkok'] = 0;
	jobsdone['Vegas'] = 0;
	jobsdone['Laundry'] = 0;
	jobsdone['Late'] = 0;
	jobsdone['Limited'] = '<span class="bad">Limits Reached:</span> ';
	jobsnum['New York'] = 0;
	jobsnum['Cuba'] = 0;
	jobsnum['Moscow'] = 0;
	jobsnum['Bangkok'] = 0;
	jobsnum['Vegas'] = 0;

	//new code for keeping track of last job checked
	var lastpost = readCookie('sh_timelast');
	if (lastpost) { lastpost=lastpost.replace(/[^0-9]/g,''); }
	if ((lastpost == null) || (lastpost.length == 0)) { lastpost = 0; }
	var tmp_currentDate = new Date();
	var tmp_timediff = parseInt(tmp_currentDate.getTime()-lastpost);
	var tmp_minutes = parseInt(tmp_timediff/60/1000);
	var sincelast = parseFloat(tmp_minutes/60).toFixed(1);

	var cityMap = {
		1: "New York",
		2: "Cuba",
		3: "Moscow",
		4: "Bangkok",
		5: "Las Vegas"
	};

  var newYorkTierMap = {
	"Street Thug": 1,
	"Associate": 2,
	"Soldier": 3,
	"Enforcer": 4,
	"Hitman": 5,
	"Capo": 6,
	"Consigliere": 7,
	"Underboss": 8,
	"Boss": 9
  };

  var newYorkJobMap = {
    1: "Mugging (Street Thug)",
    2: "Corner Store Hold-up (Street Thug)",
    3: "Warehouse Robbery (Street Thug)",
    4: "Auto Theft (Street Thug)",
    5: "Beat Up Rival Gangster (Street Thug)",
    6: "Collect Protection Money (Associate)",
    7: "Rough Up Dealers (Associate)",
    8: "Rob a Pimp (Street Thug)",
    9: "Take Out a Rogue Cop (Associate)",
    10: "Perform a Hit (Associate)",
    11: "Bank Heist (Associate)",
    12: "Jewelry Store Job (Associate)",
    13: "Destroy Enemy Mob Hideout (Soldier)",
    14: "Kill a Protected Snitch (Soldier)",
    15: "Bust a Made Man Out of Prison (Soldier)",
    16: "Asian Museum Break-in (Soldier)",
    17: "Fight a Haitian Gang (Soldier)",
    18: "Federal Reserve Raid (Enforcer)",
    19: "Smuggle Thai Gems (Enforcer)",
    22: "Liquor Smuggling (Enforcer)",
    23: "Distill Some Liquor (Enforcer)",
    24: "Manufacture Tokens (Enforcer)",
    25: "Get Cheating Deck (Enforcer)",
    26: "Run Illegal Poker Game (Enforcer)",
    27: "Overtake Phone Central (Enforcer)",
    28: "Wiretap the Cops (Enforcer)",
    29: "Repel the Yakuza (Hitman)",
    30: "Disrupt Rival Smuggling Ring (Hitman)",
    31: "Invade Tong-controlled Neighborhood (Hitman)",
    32: "Sell Guns to the Russian Mob (Hitman)",
    33: "Protect your City against a Rival Family (Hitman)",
    34: "Assassinate a Political Figure (Hitman)",
    35: "Exterminate a Rival Family (Hitman)",
    37: "Collect on a Loan (Street Thug)",
    38: "Hijack a Semi (Associate)",
    39: "Clip the Irish Mob's Local Enforcer (Soldier)",
    40: "Steal a Tanker Truck (Soldier)",
    41: "Rob an Electronics Store (Enforcer)",
    42: "Burn Down a Tenement (Enforcer)",
    43: "Obtain Compromising Photos (Hitman)",
    44: "Frame a Rival Capo (Hitman)",
    45: "Steal an Air Freight Delivery (Capo)",
    46: "Run a Biker Gang Out of Town (Capo)",
    47: "Flip a Snitch (Capo)",
    48: "Steal Bank Records (Capo)",
    49: "Loot the Police Impound Lot (Capo)",
    50: "Recruit a Rival Crew Member (Capo)",
    51: "Dodge an FBI Tail (Capo)",
    52: "Whack a Rival Crew Leader (Capo)",
    53: "Influence a Harbor Official (Consigliere)",
    54: "Move Stolen Merchandise (Consigliere)",
    55: "Snuff a Rat (Consigliere)",
    56: "Help a Fugitive Flee the Country (Consigliere)",
    57: "Dispose of a Body (Consigliere)",
    58: "Ransom a Businessman's Kids (Consigliere)",
    59: "Fix the Big Game (Consigliere)",
    60: "Steal an Arms Shipment (Consigliere)",
    61: "Extort a Corrupt Judge (Underboss)",
    62: "Embezzle Funds Through a Phony Company (Underboss)",
    63: "Break Into the Armory (Underboss)",
    64: "Rip Off the Armenian Mob (Underboss)",
    65: "Muscle in on a Triad Operation (Underboss)",
    66: "Ambush a Rival at a Sit Down (Underboss)",
    67: "Order a Hit on a Public Official (Underboss)",
    68: "Take Over an Identity Theft Ring (Underboss)",
    69: "Settle a Beef... Permanently (Boss)",
    70: "Buy Off a Federal Agent (Boss)",
    71: "Make a Deal with the Mexican Cartel (Boss)",
    72: "Blackmail the District Attorney (Boss)",
    73: "Shake Down a City Council Member (Boss)",
    74: "Make Arrangements for a Visiting Don (Boss)",
    75: "Take Control of a Casino (Boss)",
    76: "Travel to the Old Country (Boss)"
  };

  var cubaTierMap = {
    "El Soldado": 1,
    "El Capitan": 2,
    "El Jefe": 3,
    "El Patron": 4,
    "El Padrino": 5,
    "El Cacique": 6
  };

  var cubaJobMap = {
    1: "Rob Your Cab Driver (El Soldado)",
    2: "Secure A Safehouse (El Soldado)",
    3: "Intimidate The Locals (El Soldado)",
    4: "Silence a Noisy Neighbor (El Soldado)",
    5: "Smuggle In Some Supplies (El Soldado)",
    6: "Set Up A Numbers Racket (El Soldado)",
    7: "Establish Contact With The FRG (El Soldado)",
    8: "Take Out The Local Police Chief (El Soldado)",
    9: "Transport A Shipment of US Arms (El Capitan)",
    10: "Meet With The FRG Leadership (El Capitan)",
    11: "Hold Up A Tour Bus (El Capitan)",
    12: "Ambush A Military Patrol (El Capitan)",
    13: "Capture An Army Outpost (El Capitan)",
    14: "Sneak A Friend Of The Family Into The Country (El Capitan)",
    15: "Ransack A Local Plantation (El Capitan)",
    16: "Burn Down A Hacienda (El Capitan)",
    17: "Offer Protection To A Nightclub (El Jefe)",
    18: "Rob The Banco Nacional Branch (El Jefe)",
    19: "Shake Down A Hotel Owner (El Jefe)",
    20: "Bring The Local Teamsters Under Your Control (El Jefe)",
    21: "Help The FRG Steal A Truckload Of Weapons (El Jefe)",
    22: "Hijack A Booze Shipment (El Jefe)",
    23: "Pillage A Shipyard (El Jefe)",
    24: "Take Over The Docks (El Jefe)",
    25: "Muscle In On A Local Casino (El Patron)",
    26: "Establish A Loansharking Business (El Patron)",
    27: "Eliminate A Rival Family's Agent (El Patron)",
    28: "Pass On Some Intel To The FRG (El Patron)",
    29: "Execute A Regional Arms Dealer (El Patron)",
    30: "Sink A Competing Smuggler's Ship (El Patron)",
    31: "Gun Down An Enemy Crew At The Airport (El Patron)",
    32: "Assassinate An Opposing Consigliere (El Patron)",
    33: "Raid The Arms Depot (El Padrino)",
    34: "Supply The FRG With Some Extra Muscle (El Padrino)",
    35: "Capture The Airport (El Padrino)",
    36: "Knock Off A Visiting Head Of State (El Padrino)",
    37: "Set Up A High Volume Smuggling Operation (El Padrino)",
    38: "Blow Up A Rail Line (El Padrino)",
    39: "Attack The Army Command Post (El Padrino)",
    40: "Storm The Presidential Palace (El Padrino)",
    41: "Persuade A Local To Talk (El Soldado)",
    42: "Assault A Snitch's Hideout (El Soldado)",
    43: "Arrange A New York Drug Shipment (El Cacique)",
    44: "Launder Money Through A Resort (El Cacique)",
    45: "Loot The National Museum (El Cacique)",
    46: "Send Some Help Home To New York (El Cacique)",
    47: "Take Over The Havana Reconstruction (El Cacique)",
    48: "Help Get An Associate A No Bid Contract (El Cacique)",
    49: "Trans-Ship A Container Full of Refugees (El Cacique)",
    50: "Meet With The Russian (El Cacique)"
  };

  var moscowTierMap = {
    "Baklany": 1,
    "Boets": 2,
    "Brigadir": 3,
    "Avtoritet": 4,
    "Vor": 5,
    "Pakhan": 6
  };

  var moscowJobMap = {
    1: "Smuggle Consumer Electronics for the Vory (Baklany)",
    2: "Arrange A Drug Shipment for the Mafiya (Baklany)",
    3: "Fight Off An Ultra-National Gang (Baklany)",
    4: "Kidnap A Local Gang Leader for the Vory (Baklany)",
    5: "Collect the Ransom (Baklany)",
    6: "Receive Vory Intel On Dimitri (Baklany)",
    7: "Kill A Local Gang Leader for the Mafiya (Baklany)",
    8: "Collect the Hit Payoff (Baklany)",
    9: "Buy Mafiya Intel On Dmitri (Baklany)",
    10: "Threaten A Gang's Supplier (Baklany)",
    11: "Hijack An Arms Shipment From A Militant Gang (Baklany)",
    12: "Hospitalize Some Nationalists (Baklany)",
    13: "Confront Gang Leader Dmitri Leonov (Baklany)",
    14: "Bribe An Election Official (Boets)",
    15: "Silence A Political Critic (Boets)",
    16: "Violently Break Up A Campaign Rally (Boets)",
    17: "Fix A Local Election for the Vory (Boets)",
    18: "Extract A Favor From The Winner (Boets)",
    19: "Catch Karpov Accepting A Bribe (Boets)",
    20: "Abduct A Candidate's Wife For the Mafiya (Boets)",
    21: "Convince The Candidate to Withdraw (Boets)",
    22: "Kill An Investigative Reporter (Boets)",
    23: "Pay Off The Port Authority In Arkhangelsk (Boets)",
    24: "Re-route An Equipment Shipment (Boets)",
    25: "Circulate Damaging Photos (Boets)",
    26: "Take Down Party Boss Karpov (Boets)",
    31: "Case The RossijaBanc Building (Brigadir)",
    32: "Map Out The Escape Route (Brigadir)",
    33: "Rob The RossijaBanc Central Repository (Brigadir)",
    34: "Take A Guard Hostage During Your Escape (Brigadir)",
    35: "Use The Guard's Keys To Access the Bank Armory (Brigadir)",
    36: "Borrow The Guard's Uniform After Releasing Him (Brigadir)",
    37: "Execute A Bank Guard During Your Escape (Brigadir)",
    38: "Steal The Bank President's Car Keys (Brigadir)",
    39: "Strip A Uniform Off The Corpse (Brigadir)",
    40: "Blackmail A Secretary For An Exec's Itinerary (Brigadir)",
    41: "Dispose Of A RossijaBanc Exec At Sea (Brigadir)",
    42: "Replace A Guard With Your Own Man (Brigadir)",
    43: "Fire Bank President Gregor Belikov (Brigadir)",
    44: "Manage An Escort Service Catering to Soldiers (Avtoritet)",
    45: "Support The Habit Of A Procurement Officer (Avtoritet)",
    46: "Ransack A Defense Contractor's Office (Avtoritet)",
    47: "Fly To The Siberian Military District (Avtoritet)",
    48: "Rob A Troop Convoy (Avtoritet)",
    49: "Intercept The Base's Pay Shipment (Avtoritet)",
    50: "Travel to The Volga Miltary District (Avtoritet)",
    51: "Arrange The Sale Of Weapons-Grade Explosives (Avtoritet)",
    52: "Capitalize On An Officer's Gambling Problem (Avtoritet)",
    53: "Make Connections With An Arms Dealer (Avtoritet)",
    54: "Transport Some Stolen Military Hardware (Avtoritet)",
    55: "Buy Off the General's Command Team (Avtoritet)",
    56: "Forcibly Demote General Osipov (Avtoritet)",
    61: "Stop A Terrorist Attack In Moscow (Vor)",
    62: "Discover Who Was Responsible (Vor)",
    63: "Hunt Down A Ural Liberation Front Contact (Vor)",
    64: "Infiltrate The ULF Cell (Vor)",
    65: "Help Plan The Next Attack (Vor)",
    66: "Sabotage The Plan From The Inside (Vor)",
    67: "Discover The Location Of The Next ULF Attack (Vor)",
    68: "Kill A Lookout (Vor)",
    69: "Stop The ULF Attack (Vor)",
    70: "Torture A ULF Lieutenant (Vor)",
    71: "Look For The Boss' Mountain Hideout (Vor)",
    72: "Start An Avalanche Above The Terrorist Camp (Vor)",
    73: "Battle Sonya The Wolf Bassinov (Vor)",
    74: "Foil The Sabotage Of Your Moscow Holdings (Pakhan)",
    75: "Acquire Classified Files On Crime Syndicates (Pakhan)",
    76: "Gun Down Some Russian Muscle (Pakhan)",
    77: "Attack A Mafiya Business (Pakhan)",
    78: "Hijack A Mafiya Cargo (Pakhan)",
    79: "Threaten A Mafiya Moneyman's Family (Pakhan)",
    80: "Burn Down A Vory Safehouse (Pakhan)",
    81: "Hit a Vory Nightclub (Pakhan)",
    82: "Break Into An Architect's Office (Pakhan)",
    83: "Take Over A West-Bound Trafficking Pipeline (Pakhan)",
    84: "Ship Black-Market Caviar To London (Pakhan)",
    85: "Assault The Mansion Walls (Pakhan)",
    86: "Take Out Viktor Sibirchik Titov (Pakhan)"
  };

  var bangkokTierMap = {
	"Brawler": 1,
	"Criminal": 2,
	"Pirate": 3,
	"Commandant": 4,
	"Oyabun": 5,
	"Dragon Head": 6,
	"Saboteur": 7,
	"Assassin": 8
  };

  var bangkokJobMap = {
    1: "Move Stolen Art Through Suvarnabhumi Airport (Brawler)",
	2: "Show A Cocky Biker Who's In Charge (Brawler)",
    3: "Take On Local Motorcycle Thugs (Brawler)",
	4: "Unknown (Brawler)",
	5: "Meet A Gang's Rep In A Go-Go Bar (Brawler)",
	6: "Unknown (Brawler)",
	7: "Unknown (Brawler)",
	8: "Meet A Gang's Rep In A Go-Go Bar (Brawler)",
	9: "Raid One Of Suchart's Gambling Dens (Brawler)",
	10: "Trash The Low-Rent Casino (Brawler)",
	11: "Intercept An Ammo Shipment (Brawler)",
	12: "Unknown (Brawler)",
	13: "Unknown (Brawler)",
	14: "Intercept An Ammo Shipment (Brawler)",
	15: "Sneak It On To A Chinese Cargo Ship (Brawler)",
	16: "Bribe A Dock Guard (Brawler)",
	17: "Blow Up Suchart's Warehouse (Brawler)",
	18: "Suchart of 1 (Brawler)",
	19: "Unknown (Brawler)",
	20: "Force A Local Landowner To Sell (Criminal)",
	21: "Receive A Kickback From The Buye (Criminal)",
	22: "Attack A Paramilitary Police Post (Criminal)",
	23: "Unknown (Criminal)",
	24: "Set Up A Phony Business (Criminal)",
	25: "Unknown (Criminal)",
	26: "Unknown (Criminal)",
	27: "Set Up A Phony Business (Criminal)",
	28: "Set Up A Bogus Chess Tournament  (Criminal)",
	29: "Rob The Chess Masters (Criminal)",
	30: "Pay Off The Guards At Bangkwang Prison (Criminal)",
	31: "Unknown (Criminal)",
	32: "Unknown (Criminal)",
	33: "Pay Off The Guards At Bangkwang Prison (Criminal)",
	34: "Break A Triad Hitman Out (Criminal)",
	35: "Help Rub Out A Bosozoku Leader (Criminal)",
	36: "Expose A Crooked Royal Thai Police Officer (Criminal)",
	37: "Discredit Police Commissioner Chatri (Criminal)",
	38: "Unknown (Criminal)",
	39: "Secure A Pirate Vessel	(Pirate)",
	40: "Hire An Unsavory Crew (Pirate)",
	41: "Take Down A Rival Pirate Outfit (Pirate)",
	42: "Unknown (Pirate)",
	43: "Hijack A Boat Load Of Electronics (Pirate)",
	44: "Truck The Cargo To Kuala Lumpur (Pirate)",
	45: "Smuggle Cigarettes Back Into Thailand (Pirate)",
	46: "Unknown (Pirate)",
	47: "Ship The Cargo To Jakarta (Pirate)",
	48: "Return With A Shipment Of Weapons (Pirate)",
	49: "Steal Shipping Manifests (Pirate)",
	50: "Sink A Chinese Metals Freighter (Pirate)",
	51: "Hire Divers To Retrieve The Gold Bars (Pirate)",
	52: "Unknown (Pirate)",
	53: "Steal Japanese Auto Shipping Containers (Pirate)",
	54: "Offload The Cars Onto A Waiting Barge (Pirate)",
	55: "Sink A Fleet Vessel (Pirate)",
	56: "Send Captain Mok Overboard (Pirate)",
	57: "Unknown (Pirate)",
	58: "Buy Some Chemicals On The Black Market (Commandant)",
	59: "Make Contact With The United Wa State Army (Commandant)",
	60: "Ambush A Burmese Army Convoy (Commandant)",
	61: "Unknown (Pirate)",
	62: "Unknown (Pirate)",
	63: "Set Up An Opium Shipment (Commandant)",
	64: "Arrange To Process It In Bangkok (Commandant)",
	65: "Unknown (Pirate)",
	66: "Set Up The Import Of Illegal Chinese Arms (Pirate)",
	67: "Ship The Yaa Baa Payment To Phuke (Pirate)",
	68: "Unknown (Pirate)",
	69: "Unknown (Pirate)",
	70: "Unknown (Pirate)",
	71: "Unknown (Pirate)",
	72: "Eliminate An Insurgent Escort (Commandant)",
	73: "Make Off With Stolen Military Hardware (Commandant)",
	74: "Attack Chang's Heroin-Processing Facility (Commandant)",
	75: "Unknown (Pirate)",
	76: "Unknown (Pirate)",
	77: "Ship Burmese Sapphires Into Thailand (Oyabun)",
	78: "Smuggle The Sapphires Into Tokyo (Oyabun)",
	79: "Fight Off A Minato-Kai Sponsored Hit (Oyabun)",
	80: "Unknown (Pirate)",
	81: "Unknown (Pirate)",
	82: "Help Broker A Minato-Matsumura Peace (Oyabun)",
	83: "Take A Piece Of The Kabukicho Action (Oyabun)",
	84: "Unknown (Pirate)",
	85: "Unknown (Pirate)",
	86: "Unknown (Pirate)",
	87: "Unknown (Pirate)",
	88: "Unknown (Pirate)",
	89: "Unknown (Pirate)",
	90: "Unknown (Pirate)",
	91: "Spread Distrust Among The Yakuza Families (Oyabun)",
	92: "Start A War Between Matsumura and Minato (Oyabun)",
	93: "Unknown (Pirate)",
	94: "Execute Oyabun Matsumura (Oyabun)",
	95: "Unknown (Pirate)",
	96: "Set Up A Drug Shipment To China (Dragon Head)",
	97: "Dodge Customs At The Port of Hong Kong (Dragon Head)",
	98: "Win A Shoot-Out With The Kowloon Police (Dragon Head)",
	99: "Unknown (Dragon Head)",
	100: "Intimidate Wealthy Expatriates (Dragon Head)",
	101: "Intimidate Wealthy Foreign ExpatriatesMake An Example Of A Wealthy Industrialist (Dragon Head)",
	102: "Fence The Goods Stolen From The Mansion (Dragon Head)",
	113: "Master Wei (Dragon Head)",
	114: "Unknown (Dragon Head)",
	115: "Unknown (Dragon Head)",
	116: "Unknown (Dragon Head)",
	117: "Eliminate The Last Traces Of Resistance (Saboteur)",
	118: "Unknown (Dragon Head)",
	119: "Unknown (Dragon Head)",
	120: "Unknown (Dragon Head)",
	121: "Unknown (Dragon Head)",
	122: "Unknown (Dragon Head)",
	123: "Unknown (Dragon Head)",
	124: "Unknown (Dragon Head)",
	125: "Unknown (Dragon Head)",
	126: "Unknown (Dragon Head)",
	127: "Unknown (Dragon Head)",
	128: "Unknown (Dragon Head)",
	129: "Unknown (Dragon Head)",
	130: "Unknown (Saboteur)",
	132: "Depose Prime Minister Nongchai (Saboteur)",
	136: "Foil An Attempt On Your Life (Assassin)",
	145: "Overthrow The Shadow King (Assassin)"
  };
  var vegasJobMap = {
	1: "Unknown Vegas (North Las Vegas)",
	2: "Unknown Vegas (North Las Vegas)",
	3: "Unknown Vegas (North Las Vegas)",
	4: "Unknown Vegas (North Las Vegas)",
	5: "Unknown Vegas (North Las Vegas)",
	6: "Unknown Vegas (North Las Vegas)",
	7: "Unknown Vegas (North Las Vegas)",
	8: "Unknown Vegas (North Las Vegas)",
	9: "Unknown Vegas (North Las Vegas)",
	10: "Unknown Vegas (Paradise City)",
	11: "Unknown Vegas (Paradise City)",
	12: "Unknown Vegas (Paradise City)",
	13: "Unknown Vegas (Paradise City)",
	14: "Unknown Vegas (Paradise City)",
	15: "Unknown Vegas (Paradise City)",
	16: "Unknown Vegas (Paradise City)",
	17: "Unknown Vegas (Paradise City)",
	18: "Unknown Vegas (Paradise City)",
	19: "Unknown Vegas (Paradise City)",
	20: "Unknown Vegas (Paradise City)",
	21: "Unknown Vegas (Paradise City)",
	22: "Unknown Vegas (Paradise City)",
	23: "Unknown Vegas (Paradise City)",
	24: "Unknown Vegas (Paradise City)",
	25: "Rob A Gem Broke (The Lower Strip)",
	26: "Unknown Vegas (Paradise City)",
	27: "Unknown Vegas (Paradise City)",
	28: "Unknown Vegas (Paradise City)",
	29: "Unknown Vegas (Paradise City)",
	30: "Unknown Vegas (Paradise City)",
	31: "Unknown Vegas (Paradise City)",
	32: "Unknown Vegas (Paradise City)",
	33: "Unknown Vegas (Paradise City)",
	34: "Unknown Vegas (Paradise City)",
	35: "Unknown Vegas (Paradise City)",
	36: "Unknown Vegas (Paradise City)",
	37: "Unknown Vegas (Paradise City)",
	38: "Unknown Vegas (Paradise City)",
	39: "Unknown Vegas (Paradise City)",
	40: "Unknown Vegas (Paradise City)",
	41: "Unknown Vegas (Paradise City)",
	42: "Run A Highway Patrol (Mojave Desert)",
	43: "Unknown Vegas (Mojave Desert)",
	44: "Unknown Vegas (Mojave Desert)",
	45: "Unknown Vegas (Mojave Desert)",
	46: "Unknown Vegas (Mojave Desert)",
	47: "Unknown Vegas (Mojave Desert)",
	48: "Unknown Vegas (Mojave Desert)",
	49: "Unknown Vegas (Mojave Desert)",
	50: "Unknown Vegas (Mojave Desert)",
	51: "Unknown Vegas (Mojave Desert)",
	52: "Unknown Vegas (Mojave Desert)",
	53: "Unknown Vegas (Mojave Desert)",
	54: "Unknown Vegas (Mojave Desert)",
	55: "Unknown Vegas (Mojave Desert)",
	56: "Remove The Hill's (The Upper Strip)",
	57: "Unknown Vegas 57 (The Upper Strip)",
	58: "Unknown Vegas 58 (The Upper Strip)",
	59: "Unknown Vegas 59 (The Upper Strip)",
	60: "Unknown Vegas 60 (The Upper Strip)",
	61: "Unknown Vegas 61 (The Upper Strip)",
	62: "Unknown Vegas 62 (The Upper Strip)",
	63: "Unknown Vegas 63 (The Upper Strip)",
	64: "Unknown Vegas 64 (The Upper Strip)",
	65: "Unknown Vegas 65 (The Upper Strip)",
	66: "Unknown Vegas 66 (The Upper Strip)",
	67: "Unknown Vegas 67 (The Upper Strip)",
	68: "Unknown Vegas 68 (The Upper Strip)",
	69: "Unknown Vegas 69 (The Upper Strip)",
	70: "Unknown Vegas 70 (The Upper Strip)"
  };
  var vegasTierMap = {
	"North Las Vegas": 1,
	"Paradise City": 2,
	"The Lower Strip": 3,
	"Shogun Casino": 4,
	"Mojave Desert": 5,
	"The Upper Strip": 6
  };
  var cityJobMap = {
    1: newYorkJobMap,
    2: cubaJobMap,
    3: moscowJobMap,
    4: bangkokJobMap,
	5: vegasJobMap
  };

  var cityTierMap = {
    1: newYorkTierMap,
    2: cubaTierMap,
    3: moscowTierMap,
    4: bangkokTierMap,
	5: vegasTierMap
  };

  var achMap = {
    1: "One Down",
    2: "What else you got?",
    3: "Napoleon Complex",
    4: "Unstoppable",
    5: "Armed & Dangerous",
    6: "Personal Fleet",
    7: "The First is the Hardest",
    8: "Personal Bailout",
    9: "That's with a \"T\"",
    10: "Nest Egg",
    11: "Collector",
    12: "Curator",
    13: "Wing Man",
    14: "Mercenary",
    15: "Giver",
    16: "Spreading it Around",
    17: "Island Bound",
    18: "Banana Republic",
    19: "Havana Hat Trick",
    20: "No Razors Needed",
    21: "Like a Hurricane",
    22: "My Little Friend",
    23: "Unknown 23",
    24: "International",
    25: "Big Business",
    26: "Tycoon",
    27: "Working Man",
    28: "Dependable",
    29: "Big Spender",
    30: "Treasure Hunter",
    31: "Slum Lord",
    32: "Cashing Out",
    33: "Getting the Crew Together",
    34: "Crime C.E.O.",
    35: "Knife Thrower",
    36: "Uncle Sam",
    37: "What's after Trillion?",
    38: "Bulletproof",
    39: "That's Amore",
    40: "The Best Offense...",
    41: "Hitman",
    42: "Bounty Hunter",
    43: "Master Collector",
    44: "Next!",
    45: "Dedicated",
    46: "Set Them up for Later",
    47: "Brawler",
    48: "It's Good to be the King",
    49: "First Blood",
    50: "Veteran",
    51: "Rossiya Matushka",
    52: "Pank'n'Spank",
    53: "Back in The U.S.S.R.",
	54: "Got Tools?",
	55: "Sawatdee",
	56: "Dead Or Alive",
	57: "Hard Boiled",
	58: "Bangkok Dangerous",
	59: "One Night in Bangkok",
	60: "Love Hurts",
	61: "Land Holder",
	62: "Land Baron",
	63: "Real Estate Tycoon",
	64: "Lucky Shot",
	65: "Mobile and Dangerous",
	66: "Mobile Hit",
	67: "Working Remotely",
	68: "Burglar",
	69: "Master Thief",
	70: "Synchronized Watches",
	71: "Ace Up The Sleeve",
	72: "Pocket Rockets",
	73: "How Eggsciting",
	74: "Pick of the Litter ",
	75: "Over Achiever",
	76: "Green as Grass",
	77: "Clean Sweep",
	78: "Chimney Sweep",
	79: "Mona Lisa",
	80: "Unknown 80",
	81: "Unknown 81",
	82: "Unknown 82",
	83: "Unknown 83",
	84: "Winners are Grinners",
	85: "Unknown 85",
	86: "Unknown 86",
	87: "Unknown 87",
	88: "Unknown 88",
	89: "Unknown 89",
	90: "Unknown 90",
	91: "Unknown 91",
	92: "Unknown 92",
	93: "Unknown 93",
	94: "Unknown 94",
	95: "Unknown 95",
	96: "Unknown 96",
	97: "Unknown 97",
	98: "Unknown 98",
	99: "Unknown 99",
	100: "Unknown 100"
};

var lootMap = {
    394: 'Modified Tommy Guns',
    395: 'Dentist\'s Drills',
    402: 'Ugly Sweaters',
    444: 'Dragos',
	456: 'Alley Apple'
};
  
var crewMap = {
	  1: 'Prototype Carjacking',
	  2: 'Theft of a Drone',
	  3: 'Weapons Shipment Hijacking',
	  4: 'Bring Back the Pack'
};

var config_html = 
'<style type="text/css">' + 
        '.messages img{margin:0 3px;vertical-align:top};' + 
        '#close{display:inline};' + 
'</style>' + 
'<table class="messages">' + 
        '<tr><td colspan="2">Configuration &nbsp; <a href="#" id="tickall">QuickTick</a></td><td align="right" style="text-align:right;font-size:0.8em">' + version + ' - Visit <a href="http://www.spockholm.com/mafia/bookmarklets.php?StreamHelper" target="_top">Spockholm Mafia Tools</a> and F.M. - <a href="#" id="close"><img src="http://www.spockholm.com/mafia/stop.gif" title="Close" width="16" height="16"></a></td></tr>' + 
        '<tr>' + 
                '<td>Status:</td>' + 
                '<td colspan="2" id="status"></td>' + 
        '</tr>' + 
        '<tr><td>Hours to load: </td><td><input type="text" id="text_hours" value="1" size="5"/></td><td>Decimals are usable, 0.5 for 30 minutes.';
		if (lastpost > 0) { config_html +=' <span class="good">'+sincelast+' since oldest checked post</span>.'; }
		config_html +=	'</td></tr>'+
		'<tr><td>Posts / request: </td><td><input type="text" id="limit" value="1000" size="4"/></td><td>If you are having trouble, try lowering this value. <span id="limitmsg" class="bad"></span></td></tr>' + 
        '<tr><td>Delay interval:</td><td><input type="text" name="wait1" id="wait1" value="'+wait1+'" size="3">-<input type="text" name="wait2" id="wait2" value="'+wait2+'" size="3"></td><td>Delay in seconds between checks.</td></tr>' +
		'<tr><td>Exp before level: </td><td><input type="text" id="pause" value="0" size="3"/></td><td>Exp to next level to pause at. 0 to disable.</td></tr>' + 
		'<tr><td></td><td colspan="2">&nbsp;If enabled, will also pause when energy ratio 1.5 or stamina ratio reaches 2.3.</td></tr>' + 
		'<tr><td>Reverse list:</td><td colspan="2"><input type="checkbox" id="cb_reverse"/>Do newest jobs first, instead of oldest?</span></td></tr>' + 
        '<tr><td>Ask permission: </td><td colspan="2"><input type="checkbox" id="cb_perm"/>Ask for permission to read Facebook stream? <span class="good">Only needed one time.</span></td></tr>' + 
		'<tr><td><span class="good">Autostart:</span></td><td colspan="2"><input type="checkbox" id="cb_autostart"/>Start when the initial stream reading is finished?</span></td></tr>' + 
        '<tr><td>Achievement: </td><td colspan="2"><input type="checkbox" id="cb_ach"/>Scan for achievements.</td></tr>' + 
        '<tr><td>Bonus: </td><td colspan="2"><input type="checkbox" id="cb_bonus"/>Scan for bonuses (Robbery, Boosts, Holiday Specials, completed Chop Shop\'s etc.).</td></tr>' + 
        '<tr><td>Boss: </td><td colspan="2"><input type="checkbox" id="cb_boss"/>Scan for boss jobs.</td></tr>' + 
        '<tr><td>Jobs: </td><td colspan="2"><input type="checkbox" id="cb_jobs"/>Scan for jobs.</td></tr>' + 
        '<tr id="cb_jobs_1_row" style="display:none;"><td></td><td><input type="checkbox" id="cb_jobs_1"/>Scan for New York jobs.</td><td>' + 
                '<select id="cb_tier_jobs_1">' + 
                        '<option value="0">All</option>' + 
                        '<option value="1">Street Thug</option>' + 
                        '<option value="2">Soldier</option>' + 
                        '<option value="3">Associate</option>' + 
                        '<option value="4">Hitman</option>' + 
                        '<option value="5">Enforcer</option>' + 
                        '<option value="6">Consigliere</option>' + 
                        '<option value="7">Capo</option>' + 
                        '<option value="8">Underboss</option>' + 
                        '<option value="9">Boss</option>' + 
                '</select></td></tr>' + 
        '<tr id="cb_jobs_2_row" style="display:none;"><td></td><td><input type="checkbox" id="cb_jobs_2"/>Scan for Cuba jobs.</td><td>' + 
                '<select id="cb_tier_jobs_2">' + 
                        '<option value="0">All</option>' + 
                        '<option value="1">El Soldado</option>' + 
                        '<option value="2">El Capitan</option>' + 
                        '<option value="3">El Jefe</option>' + 
                        '<option value="4">El Patron</option>' + 
                        '<option value="5">El Padrino</option>' + 
                        '<option value="6">El Cacique</option>' + 
                '</select></td></tr>' + 
        '<tr id="cb_jobs_3_row" style="display:none;"><td></td><td><input type="checkbox" id="cb_jobs_3"/>Scan for Moscow jobs.</td><td>' + 
                '<select id="cb_tier_jobs_3">' + 
                        '<option value="0">All</option>' + 
                        '<option value="1">Baklany</option>' + 
                        '<option value="2">Boets</option>' + 
                        '<option value="3">Brigadir</option>' + 
                        '<option value="4">Avtoritet</option>' + 
                        '<option value="5">Vor</option>' + 
                        '<option value="6">Pakhan</option>' + 
                '</select></td></tr>' + 
        '<tr id="cb_jobs_4_row" style="display:none;"><td></td><td><input type="checkbox" id="cb_jobs_4"/>Scan for Bangkok jobs.</td><td>' + 
                '<select id="cb_tier_jobs_4">' + 
                        '<option value="0">All</option>' + 
                        '<option value="1">Brawler</option>' + 
                        '<option value="2">Criminal</option>' +
						'<option value="3">Pirate</option>' +
						'<option value="4">Commandant</option>' +
						'<option value="5">Oyabun</option>' +
						'<option value="6">Dragon Head</option>' +
						'<option value="7">Saboteur</option>' +
						'<option value="8">Assassin</option>' +
				'</select></td></tr>' + 
        '<tr id="cb_jobs_5_row" style="display:none;"><td></td><td><input type="checkbox" id="cb_jobs_5"/>Scan for Las Vegas jobs.</td><td>' + 
                '<select id="cb_tier_jobs_5">' + 
                        '<option value="0">All</option>' + 
                        '<option value="1">North Las Vegas</option>' + 
                        '<option value="2">Paradise City</option>' +
						'<option value="3">The Lower Strip</option>' +
						'<option value="4">Shogun Casino</option>' +
						'<option value="5">Mojave Desert</option>' +
						'<option value="6">The Upper Strip</option>' +
				'</select></td></tr>' + 
		'<tr><td>Launder: </td><td colspan="2"><input type="checkbox" id="cb_launder"/>Scan for money laundering jobs.</td></tr>' + 
        '<tr><td>Loot: </td><td colspan="2"><input type="checkbox" id="cb_loot"/>Scan for loot jobs.</td></tr>' + 
        '<tr><td>Stash: </td><td colspan="2"><input type="checkbox" id="cb_stash"/>Scan for secret stashes.</td></tr>' + 
		'<tr><td>Building Parts: </td><td colspan="2"><input type="checkbox" id="cb_chop"/>Send Chop Shop/Weapons Depot parts.</td></tr>' + 
		'<tr><td>Vegas Parts: </td><td colspan="2"><input type="checkbox" id="cb_vegas"/>Send Vegas building parts.</td></tr>' + 
		'<tr><td>Burner Phones: </td><td colspan="2"><input type="checkbox" id="cb_burner"/>Search for Burner phones. <span class="more_in">(Manual collection only)</span></td></tr>' + 
		'<tr><td>Crew Jobs: </td><td colspan="2"><input type="checkbox" id="cb_crew"/>Search for crew jobs and Casino Vault parts. <span class="more_in">(Manual collection only)</span></td></tr>' + 
        '<tr><td>War: </td><td colspan="2"><input type="checkbox" id="cb_wars"/>Scan for wars. <span class="more_in">(Manual fighting only)</span></td></tr>' + 
		'<tr><td><span class="more_in">Debug2:</span></td><td colspan="2"><input type="checkbox" id="cb_debug2"/><span class="more_in">Popup the result object (only for debugging purposes)</span></td></tr>' + 
        '<tr><td colspan="3"><a class="sexy_button" id="start">Scan</a></td></tr>' + 
'</table>';

var running_html = 
'<style type="text/css">' + 
        '.messages img{margin:0 3px;vertical-align:middle}' + 
        '.messages iframe{border:0;margin:0 3px}' + 
        '.messages input {border: 1px solid #111;margin 0; width: 25px;}' + 
        '#close{display:inline}' + 
        '#play{display:inline}'+
        '#pause{display:none}'+
'</style>' + 
'<table class="messages">' + 
        '<tr>' + 
                '<td width="17%"><a href="#" id="next">Next link</a></td>' + 
                '<td id="attempts"></td>' + 
                '<td align="right" style="text-align:right;font-size:0.8em">' + version + ' - Visit <a href="http://www.spockholm.com/mafia/bookmarklets.php?StreamHelper" target="_top">Spockholm Mafia Tools</a> - <a href="http://www.spockholm.com/mafia/donate.php?StreamHelper" id="donate" alt="Donate a beer" target="_blank">Donate</a> - <a href="#" id="play"><img src="http://www.spockholm.com/mafia/play.gif" title="Play" alt="Play" width="16" height="16" /></a> <a href="#" id="pause"><img src="http://www.spockholm.com/mafia/pause.gif" title="Pause" alt="Pause" width="16" height="16" /></a> <a href="#" id="close"><img src="http://www.spockholm.com/mafia/stop.gif" title="Close" alt="Close" width="16" height="16" /></a></td>' + 
        '</tr>' + 
        '<tr>' +
          '<td colspan="3"><div id="spockcontent" class="player_updates">' +
          '<table>'+
          '<tr>' + 
                  '<td colspan="3" id="specialmsg"></td>' + 
          '</tr>' + 
          '<tr>' + 
                  '<td valign="top">Status:</td>' + 
                  '<td colspan="2" id="status"></td>' + 
          '</tr>' +
          '<tr id="manual_exp" style="display:none;">' + 
                  '<td valign="top">Gained:</td>' + 
                  '<td colspan="2" id="manual_gained"></td>' + 
          '</tr>' +
		  '<tr id="jobdone_row" style="display:none;">' + 
                  '<td valign="top">Jobs Done:</td>' + 
                  '<td colspan="2" id="jobdone_log""></td>' + 
          '</tr>' +
          '<tr id="manual_loot" style="display:none;">' + 
                  '<td valign="top"><a href="#" id="looted_logshow">Loot Gained</a>:</td>' + 
                  '<td colspan="2" id="looted_log" style="display:none;"></td>' + 
          '</tr>' +
		  '<tr id="ach_row" style="display:none;">' + 
                  '<td valign="top"><a href="#" id="ach_logshow">Achievements</a>:</td>' + 
                  '<td colspan="2"><span id="ach_count"></span><table id="ach_log" style="display:none;"></table></td>' + 
          '</tr>' + 
          '<tr id="bonus_row" style="display:none;">' + 
                  '<td valign="top"><a href="#" id="bonus_logshow">Bonuses</a>:</td>' + 
                  '<td colspan="2"><span id="bonus_count"></span><table id="bonus_log" style="display:none;"></table></td>' + 
          '</tr>' +
          '<tr id="crew_row" style="display:none;">' + 
                  '<td valign="top"><a href="#" id="crew_logshow">Crew Jobs</a>:</td>' + 
                  '<td colspan="2"><span id="crew_count"></span><table id="crew_log" style="display:none;"></table></td>' + 
          '</tr>' + 
          '<tr id="boss_row" style="display:none;">' + 
                  '<td valign="top"><a href="#" id="boss_logshow">Bosses</a>:</td>' + 
                  '<td colspan="2"><span id="boss_count"></span><table id="boss_log" style="display:none;"></table></td>' + 
          '</tr>' + 
          '<tr id="job_row" style="display:none;">' + 
                  '<td valign="top"><a href="#" id="job_logshow">Jobs</a>:</td>' + 
                  '<td colspan="2"><span id="job_count"></span><table id="job_log" style="display:none;"></table></td>' + 
          '</tr>' + 
          '<tr id="launder_row" style="display:none;">' + 
                  '<td valign="top"><a href="#" id="launder_logshow">Launderings</a>:</td>' + 
                  '<td colspan="2"><span id="launder_count"></span><table id="launder_log" style="display:none;"></table></td>' + 
          '</tr>' + 
          '<tr id="loot_row" style="display:none;">' + 
                  '<td valign="top"><a href="#" id="loot_logshow">Loots</a>:</td>' + 
                  '<td colspan="2"><span id="loot_count"></span><table id="loot_log" style="display:none;"></table></td>' + 
          '</tr>' + 
          '<tr id="stash_row" style="display:none;">' + 
                  '<td valign="top"><a href="#" id="stash_logshow">Stashes</a>:</td>' + 
                 '<td colspan="2"><span id="stash_count"></span><table id="stash_log" style="display:none;"></table></td>' + 
          '</tr>' + 
          '<tr id="chop_row" style="display:none;">' + 
                  '<td valign="top"><a href="#" id="chop_logshow">Build Parts</a>:</td>' + 
                  '<td colspan="2"><span id="chop_count"></span><table id="chop_log" style="display:none;"></table></td>' + 
          '</tr>' + 
          '<tr id="burner_row" style="display:none;">' + 
                  '<td valign="top"><a href="#" id="burner_logshow">Burner Phones</a>:</td>' + 
                  '<td colspan="2"><span id="burner_count"></span><table id="burner_log" style="display:none;"></table></td>' + 
          '</tr>' + 
          '<tr id="war_row" style="display:none;">' + 
                  '<td valign="top"><a href="#" id="war_logshow">Wars</a>:</td>' + 
                  '<td colspan="2"><span id="war_count"></span><table id="war_log" style="display:none;"></table></td>' + 
          '</tr>' + 
          '</table></div></td></tr>' + 
'</table>';

function create_div() {
	if (document.getElementById('spockdiv')) {
		document.getElementById('spockdiv').innerHTML = config_html;
    }
	else {
		var spock_div = document.createElement("div");
		spock_div.id = 'spockdiv';
		spock_div.innerHTML = config_html;
		content.insertBefore(spock_div, content.firstChild);
    }
}

create_div();

function close() {
	run = 0;
	content.removeChild(document.getElementById("spockdiv"));
	return false;
}
document.getElementById("close").onclick = close;

function my_toggle(s) {
	var p = document.getElementById(s);
	p.style.display = p.style.display == '' ? 'none' : '';
	return false;
}
function tickall() {
	document.getElementById('text_hours').value = 2;
	document.getElementById('limit').value = 1000;
	document.getElementById('cb_autostart').checked = true;
	do_ach = document.getElementById('cb_ach').checked = true;
	do_boss = document.getElementById('cb_boss').checked = true;
	do_launder = document.getElementById('cb_launder').checked = true;
	do_loot = document.getElementById('cb_loot').checked = true;
	do_jobs = document.getElementById('cb_jobs').checked = true;
	do_chop = document.getElementById('cb_chop').checked = true;
	do_vegas = document.getElementById('cb_vegas').checked = true;
	do_burner = document.getElementById('cb_burner').checked = true;
	//do_crew = document.getElementById('cb_crew').checked = true;
	document.getElementById('cb_jobs_1_row').style.display = '';
	document.getElementById('cb_jobs_2_row').style.display = '';
	document.getElementById('cb_jobs_3_row').style.display = '';
	document.getElementById('cb_jobs_4_row').style.display = '';
	document.getElementById('cb_jobs_5_row').style.display = '';
	do_stash = document.getElementById('cb_stash').checked = true;
	do_bonus = document.getElementById('cb_bonus').checked = true;
	document.getElementById('cb_jobs_1').checked = true;
	document.getElementById('cb_tier_jobs_1').selectedIndex = 9;
	document.getElementById('cb_jobs_2').checked = true;
	document.getElementById('cb_tier_jobs_2').selectedIndex = 6;
	document.getElementById('cb_jobs_3').checked = true;
	document.getElementById('cb_tier_jobs_3').selectedIndex = 6;
	document.getElementById('cb_jobs_4').checked = true;
	document.getElementById('cb_tier_jobs_4').selectedIndex = 5;
	document.getElementById('cb_jobs_5').checked = true;
	document.getElementById('cb_tier_jobs_5').selectedIndex = 0;

}
document.getElementById("tickall").onclick = tickall;

document.getElementById('limit').onkeyup = function () {
	if (parseInt(document.getElementById('limit').value) > 1000) {
		document.getElementById('limitmsg').innerHTML = 'Above 100 is not recommended!';
	}
	else {
		document.getElementById('limitmsg').innerHTML = '';
	}
};

document.getElementById('cb_jobs').onclick = function () {
	my_toggle('cb_jobs_1_row');
	my_toggle('cb_jobs_2_row');
	my_toggle('cb_jobs_3_row');
	my_toggle('cb_jobs_4_row');
	my_toggle('cb_jobs_5_row');
};

// createCookie from Vern's Toolkit http://vern.com/mwtools/
function createCookie(name,value) {
	// expire one month from now
	var expires = new Date();
	expires.setDate(expires.getDate()+30);
	document.cookie = name+"="+value+";expires="+expires.toGMTString()+"; path=/";
}

// readCookie from Vern's Toolkit http://vern.com/mwtools/
function readCookie(name) {
	var i,
		cookie,
		nameEQ = name+"=",
		cookieArray = document.cookie.split(";");
	for (i=0; i< cookieArray.length; i++) {
		cookie = cookieArray[i];
		while (cookie.charAt(0)==' ')
			cookie = cookie.substring(1,cookie.length);
		if (cookie.indexOf(nameEQ) == 0)
			return cookie.substring(nameEQ.length,cookie.length);
	}
	return null;
}

var dataObject = function () {
    var ach_count = 0,
      boss_count = 0,
      job_count = 0,
      launder_count = 0,
      loot_count = 0,
      war_count = 0,
      stash_count = 0,
      bonus_count = 0,
      post_count = 0,
	  chop_count = 0,
	  crew_count = 0,
	  burner_count = 0,
	  vegas_count = 0,
      objects = [],
      links = [],
      wars_over = [],
	  do_reverse = false,
	  do_autostart = false,
      do_ach = false,
      do_boss = false,
      do_launder = false,
      do_loot = false,
      do_jobs = false,
      do_wars = false,
      do_stash = false,
      do_bonus = false,
	  do_crew = false,
	  do_chop = false,
	  do_burner = false,
      tier_city = [0, 0, 0, 0, 0];
	var currentPageCount = 1;
    job_city = [false, false, false, false, false];
    hours = 1,
    start_time = new Date(),
    target_time = new Date(),
    self = {
      getHours: function () {
        return hours;
      },
      requestData: function () {
        //console.warn('start_time = ' + target_time.toString() + ' end_time=' + start_time.toString());
        //FB.Facebook.apiClient.stream_get('', (target_time.getTime() / 1000), (start_time.getTime() / 1000), limit, 'app_10979261223', self.dataReceived);
		//FB.Facebook.apiClient.stream_get('', (target_time.getTime() / 1000), (start_time.getTime() / 1000), limit, '', self.dataReceived);
		//var fql="SELECT post_id,actor_id,created_time,action_links,app_data,app_id FROM stream WHERE filter_key='app_10979261223' AND created_time > (now() - 4*60*60) LIMIT 50";
		
		//orginal stream helper query
		var fql="SELECT post_id,actor_id,created_time,action_links,app_data,app_id FROM stream WHERE source_id in (select uid2 from friend where uid1 = '"+fbuserid+"') AND viewer_id = '"+fbuserid+"' AND app_id = '10979261223' AND created_time < "+parseInt(start_time.getTime() / 1000)+" ORDER BY created_time desc LIMIT "+limit;
		
		//query without app id
		//var fql="SELECT post_id,actor_id,created_time,action_links,app_data,app_id FROM stream WHERE source_id in (select uid2 from friend where uid1 = '"+userid+"') AND viewer_id = '"+userid+"' AND created_time < "+parseInt(start_time.getTime() / 1000)+" ORDER BY created_time desc LIMIT "+limit;

		//big j app id added
		//var fql="SELECT post_id,actor_id,created_time,action_links,app_data,app_id FROM stream WHERE source_id in (select uid2 from friend where uid1 = '"+userid+"') AND viewer_id = '"+userid+"' AND (app_id = '10979261223' OR app_id = '294376243098') AND created_time < "+parseInt(start_time.getTime() / 1000)+" ORDER BY created_time desc LIMIT "+limit;
		//console.log(fql);
		
		//get all posts with app id
		//var fql="SELECT post_id,actor_id,created_time,action_links,app_data,app_id FROM stream WHERE source_id in (select uid2 from friend where uid1 = '"+userid+"') AND viewer_id = '"+userid+"' AND created_time < "+parseInt(start_time.getTime() / 1000)+" ORDER BY created_time desc LIMIT "+limit;
		
		//unknown query
		//var fql="SELECT post_id, actor_id, target_id, message FROM stream WHERE source_id in (SELECT target_id FROM connection WHERE source_id='"+FB.Facebook.apiClient.get_session().uid+"') AND is_hidden = 0";
		FB.ensureInit(function() {
			FB.Facebook.apiClient.fql_query(fql, self.dataReceived);
		});
		//FB.Facebook.apiClient.fql_query(fql, self.dataReceived);
      },
      init: function () {
        do_perms = document.getElementById('cb_perm').checked;
        if (do_perms) {
          FB.Connect.showPermissionDialog('read_stream');
        }
        do_ach = document.getElementById('cb_ach').checked;
		do_autostart = document.getElementById('cb_autostart').checked;
        do_boss = document.getElementById('cb_boss').checked;
        do_launder = document.getElementById('cb_launder').checked;
        do_loot = document.getElementById('cb_loot').checked;
        do_jobs = document.getElementById('cb_jobs').checked;
        do_wars = document.getElementById('cb_wars').checked;
        do_stash = document.getElementById('cb_stash').checked;
        do_bonus = document.getElementById('cb_bonus').checked;
		do_crew = document.getElementById('cb_crew').checked;
		do_chop = document.getElementById('cb_chop').checked;
		do_vegas = document.getElementById('cb_vegas').checked;
		do_burner = document.getElementById('cb_burner').checked;
		do_reverse = document.getElementById('cb_reverse').checked;
		debug2 = document.getElementById('cb_debug2').checked;

		limit = parseInt(document.getElementById('limit').value);
        wait1 = parseInt(document.getElementById('wait1').value);
        wait2 = parseInt(document.getElementById('wait2').value);
		pause = parseInt(document.getElementById('pause').value);

        tier_city[0] = document.getElementById("cb_tier_jobs_1").selectedIndex;
        tier_city[1] = document.getElementById("cb_tier_jobs_2").selectedIndex;
        tier_city[2] = document.getElementById("cb_tier_jobs_3").selectedIndex;
		tier_city[3] = document.getElementById("cb_tier_jobs_4").selectedIndex;
		tier_city[4] = document.getElementById("cb_tier_jobs_5").selectedIndex;
        if (document.getElementById('cb_jobs_1').checked) job_city[0] = true;
        if (document.getElementById('cb_jobs_2').checked) job_city[1] = true;
        if (document.getElementById('cb_jobs_3').checked) job_city[2] = true;
		if (document.getElementById('cb_jobs_4').checked) job_city[3] = true;
		if (document.getElementById('cb_jobs_5').checked) job_city[4] = true;
        hours = parseFloat(document.getElementById("text_hours").value.replace(",","."));
        if (hours < 0) hours = 1;
        if (hours > 24) hours = 24;
        target_time.setTime(start_time.getTime() - 1000 * 60 * 60 * hours);
      },
      dataReceived: function (results, exception) {
		if (debug2) { 
			function dirtypop() {
				var generator=window.open('','name','height=500,width=600');
				generator.document.write('<html><head><title>Stream Helper debug window</title>');
				generator.document.write('</head><body>');
				generator.document.write('<pre>Response given when we tried to read the FB stream:</pre><textarea rows="20" cols="70">');
				generator.document.write(results.toSource()+'\n');
				// for(var key1 in results) {
					// var obj = results[key1];
					// for(var key2 in obj) {
						// var attrName = key2;
						// var attrValue = obj[key2];
						// generator.document.write(key1+' '+attrName+': '+attrValue+'\n');
					// }
				// }
				generator.document.write('</textarea><pre><a href="javascript:self.close()">Close</a> the popup.</pre>');
				generator.document.write('</body></html>');
				generator.document.close();
			}
			dirtypop();
		}
        if (exception != null) msg("Error during execution: " + exception.toString());
        if (!results) {
          msg('<span class="bad">No matching links were found, increase time or add more categories.</span><br />Also make sure you have asked for permission on this account.<br />Check if Mafia Wars is <a href="http://www.facebook.com/home.php?sk=lf">visible in your news feed</a>.');
        }
        function includeJob(city, job) {
			try {
				var m = /\((.+)\)/.exec(cityJobMap[city][job]);
				var tier = cityTierMap[city][m[1]];
				return tier >= tier_city[city - 1];
			}
			catch (joberr) {
				return false;
			}
        }

        var i;
        var m;
        //var posts = results['posts'];
		var posts = results;
        //var profiles = results['profiles'];
        var names = {};
        var done = false;
        var last_time = new Date();
        var time_minus_6h = new Date();
        time_minus_6h.setTime(time_minus_6h.getTime() - 6 * 60 * 60 * 1000); // time cutoff for wars
        //for (i = 0; i < profiles.length; i++) {
          //var p = profiles[i];
          //names[p['id']] = p['name'];
        //}
        post_count += posts.length;
        msg('Received ' + post_count + ' posts');
		
		//start for each posts loop
        for (i = 0; i < posts.length; i++) {
			var res = posts[i];
			t = new Date(parseInt(res['created_time'])*1000);
			last_time = t;
			//console.log(res['app_data']['attachment_data']);
			//start app id if check
			//if ((res['app_id'] == 10979261223) || (res['app_id'] == 294376243098)) {
			if (res['app_id'] == 10979261223) {
				//if (debug && (res['action_links'] != null)) { console.log(res['action_links']); }
				if (res['action_links'] != null) {
					var a = res['action_links'][0]['href'].replace(/&amp;/g, '&');
					var text = res['action_links'][0]['text'];
					//console.warn('[' + i + ']=' + t.toString());
					//console.log(parseInt(res['created_time'])+' '+t);
					//var n = names[res['source_id']];
					var n = res['actor_id'];
					var str;
					var ts;
					if (do_ach && (a.indexOf('ach_celeb') != -1 || a.indexOf('achievement_share_stream') != -1) && (m = /.+%22sharer%22%3A%22(p%7C\d+)%22%2C%22aid%22%3A%22(\d+)%22/.exec(a))) {
						str = "remote/html_server.php?xw_controller=index&xw_action=ach_celeb&skip_interstitial=1&skip_req_frame=1&aid=" + m[2] + "&sharer=" + m[1];
						if (links.indexOf(str) == -1) {
							ts = timestamp(t);
							objects[objects.length] = {
							name_str: n,
							url: str,
							original_url: a,
							type: 'ach',
							timestamp: ts,
							original_time: parseInt(res['created_time'] * 1000),
							aid: m[2],
							friend: m[1],
							msg: '<span class="more_in">' + ts + '</span> ' + fblink(m[1], n) + ' has a <span class="good">"' + achMap[m[2]] + '" achievement</span>!' + mwlink(m[1]) + achlink(str, 'Achievement') + '</span>'
						};
						links[links.length] = str;
						ach_count++;
						}
					}
					else if (do_launder && a.indexOf('launder') != -1 && (m = /launder.+%22target_id%22%3A%22(p%7C\d+)%22%2C%22job_city%22%3A%22(\d+)%22%2C%22job%22%3A%22(\d+)%22/.exec(a))) {
						str = "remote/html_server.php?xw_controller=launder&xw_action=give_help&skip_interstitial=1&skip_req_frame=1&target_id=" + m[1] + "&job_city=" + m[2] + "&job=" + m[3];
						if (links.indexOf(str) == -1 && includeJob(m[2], m[3])) {
							var job = 'unknown';
							job = cityJobMap[m[2]][m[3]];
							ts = timestamp(t);
							objects[objects.length] = {
								name_str: n,
								url: str,
								original_url: a,
								type: 'launder',
								timestamp: ts,
								original_time: parseInt(res['created_time'] * 1000),
								job: m[3],
								job_city: m[2],
								friend: m[1],
								msg: '<span class="more_in">' + ts + '</span> ' + fblink(m[1], n) + ' has a money laundering job <span class="good">"' + job + '"</span> in ' + cityMap[m[2]] + '!' + mwlink(m[1]) + achlink(str, 'Launder') + '</span>'
							};
						links[links.length] = str;
						launder_count++;
						}
					}
					else if (do_boss && a.indexOf('claim_boss_bonus') != -1 && a.indexOf('request_job_help_friend') == -1 && (m = /claim_boss_bonus.+jobId=(\d+).+%22target_id%22%3A%22(p%7C\d+)%22%2C\+%22job_city%22%3A%22(\d+)%22/.exec(a))) {
						str = "remote/html_server.php?xw_controller=story&xw_action=claim_boss_bonus&skip_interstitial=1&skip_req_frame=1&target_id=" + m[2] + "&job_city=" + m[3] + "&job_id=" + m[1];
						//if (links.indexOf(str) == -1 && includeJob(m[3], m[1])) {
							var job = 'unknown';
							job = cityJobMap[m[3]][m[1]];
							ts = timestamp(t);
							objects[objects.length] = {
								name_str: n,
								url: str,
								original_url: a,
								type: 'boss',
								timestamp: ts,
								original_time: parseInt(res['created_time'] * 1000),
								job: m[1],
								job_city: m[3],
								friend: m[2],
								msg: '<span class="more_in">' + ts + '</span> ' + fblink(m[2], n) + ' needs helps with <span class="good">' + job + '</span> in ' + cityMap[m[3]] + '!' + mwlink(m[2]) + achlink(str, 'Boss') + '</span>'
							};
						links[links.length] = str;
						boss_count++;
						//}
					}
					else if (do_jobs && a.indexOf('give_help') != -1 && !/Help (.*?)'s friend/.test(text) && (m = /give_help.+jobId=(\d+).+%22target_id%22%3A%22(p%7C\d+)%22%2C(\+)?%22job_city%22%3A%22(\d+)%22/.exec(a))) {
						var checked = job_city[m[4] - 1];
						if (checked) {
							str = "remote/html_server.php?xw_controller=";
							if (m[4] == '3') str = str + 'episode';
							else if (m[4] >= '4') str = str + 'story';
							else str = str + 'job';
							str = str + '&xw_action=give_help';
							if (m[4] == '3') str = str + '_moscow_social';
							if (m[4] >= '4') str = str + '_social';
							str = str + "&skip_interstitial=1&skip_req_frame=1&target_id=" + m[2] + "&job_city=" + m[4];
							if (links.indexOf(str) == -1 && includeJob(m[4], m[1])) {
								var job = 'unknown';
								job = cityJobMap[m[4]][m[1]];
								ts = timestamp(t);
								objects[objects.length] = {
									name_str: n,
									url: str,
									original_url: a,
									type: 'job',
									timestamp: ts,
									original_time: parseInt(res['created_time'] * 1000),
									job: m[1],
									job_city: m[4],
									friend: m[2],
									msg: '<span class="more_in">' + ts + '</span> ' + fblink(m[2], n) + ' needs helps with <span class="good">' + job + '</span> in ' + cityMap[m[4]] + '!' + mwlink(m[2]) + achlink(str, 'Job') + '</span>'
								};
								links[links.length] = str;
								job_count++;
								jobsnum[cityMap[m[4]]] > 0 ? jobsnum[cityMap[m[4]]]++ : jobsnum[cityMap[m[4]]] = 1;
							}
						}
					}
					else if (do_loot && (m = /viral_loot.+%22initiator%22%3A%22(p%7C\d+)%22%2C\+%22id%22%3A%22(p%7C\d+)%22/.exec(a))) {
						str = "remote/html_server.php?xw_controller=index&xw_action=loot_vloot_job&xw_city=&initiator=" + m[1] + '&friend=' + m[1] + '&id=' + m[2] + '&skip_interstitial=1&skip_req_frame=1';
						if (links.indexOf(str) == -1) {
							var loot = lootMap[m[2]];
							ts = timestamp(t);
							objects[objects.length] = {
								name_str: n,
								url: str,
								original_url: a,
								type: 'loot',
								timestamp: ts,
								original_time: parseInt(res['created_time'] * 1000),
								friend: m[1],
								loot: m[2],
								msg: '<span class="more_in">' + ts + '</span> ' + fblink(m[1], n) + ' found a shipment of <span class="good">' + loot + '</span>!' + mwlink(m[1]) + achlink(str, 'Loot') + '</span>'
							};
							links[links.length] = str;
							loot_count++;
						}
					}
					else if (do_wars && (m = /controller=war&next_action=view.*?leader_id%22%3A%22((p%7C)?\d+)%22/.exec(a))) {
						str = "remote/html_server.php?xw_controller=war&xw_action=view&leader_id=" + m[1] + '&skip_interstitial=1&skip_req_frame=1';
						if (! (m[1] in wars_over) && links.indexOf(str) == -1 && t.getTime() >= time_minus_6h.getTime()) {
							ts = timestamp(t);
							objects[objects.length] = {
								name_str: n,
								url: str,
								original_url: a,
								type: 'war',
								timestamp: ts,
								original_time: parseInt(res['created_time'] * 1000),
								leader_id: m[1],
								msg: '<span class="more_in">' + ts + '</span> ' + fblink(n,n) + ' has a war!' + mwlink(m[1]) + achlink(str, 'War') + '</span>'
							};
						links[links.length] = str;
						war_count++;
						}
					}
					else if (do_wars && (m = /story_war_declared_stream.+%22leader_id%22%3A%22(p%7C\d+)%22/.exec(a))) {
						str = "remote/html_server.php?xw_controller=war&xw_action=view&leader_id=" + m[1] + '&skip_interstitial=1&skip_req_frame=1';
						if (! (m[1] in wars_over) && links.indexOf(str) == -1 && t.getTime() >= time_minus_6h.getTime()) {
							ts = timestamp(t);
							objects[objects.length] = {
								name_str: n,
								url: str,
								original_url: a,
								type: 'war',
								timestamp: ts,
								original_time: parseInt(res['created_time'] * 1000),
								leader_id: m[1],
								msg: '<span class="more_in">' + ts + '</span> ' + fblink(m[1], n) + ' has a war!' + mwlink(m[1]) + achlink(str, 'War') + '</span>'
							};
						links[links.length] = str;
						war_count++;
						}
					}
					else if (do_wars && (m = /declare_war.+%22leader_id%22%3A%22(p%7C\d+)%22/.exec(a))) {
						str = "remote/html_server.php?xw_controller=war&xw_action=view&leader_id=" + m[1] + '&skip_interstitial=1&skip_req_frame=1';
						if (! (m[1] in wars_over) && links.indexOf(str) == -1 && t.getTime() >= time_minus_6h.getTime()) {
							ts = timestamp(t);
							objects[objects.length] = {
								name_str: n,
								url: str,
								original_url: a,
								type: 'war',
								timestamp: ts,
								original_time: parseInt(res['created_time'] * 1000),
								leader_id: m[1],
								msg: '<span class="more_in">' + ts + '</span> ' + fblink(m[1], n) + ' has a war!' + mwlink(m[1]) + achlink(str, 'War') + '</span>'
							};
							links[links.length] = str;
							war_count++;
						}
					} 
					else if (do_wars && (m = /story_war_helped_stream.+%22leader_id%22%3A%22(p%7C\d+)%22/.exec(a))) {
						str = "remote/html_server.php?xw_controller=war&xw_action=view&leader_id=" + m[1] + '&skip_interstitial=1&skip_req_frame=1';
						if (! (m[1] in wars_over) && links.indexOf(str) == -1 && t.getTime() >= time_minus_6h.getTime()) {
						//if (res['attachment']['attachment_data']) { var m2 = /sided\swith\s(.+?)\sand\sattacked/.exec(res['attachment']['attachment_data']); }
						var m2;
						if (m2 == null || m2 == undefined) m2 = ['unknown', 'unknown'];
						ts = timestamp(t);
						objects[objects.length] = {
							name_str: m[2],
							url: str,
							original_url: a,
							type: 'war',
							timestamp: ts,
							original_time: parseInt(res['created_time'] * 1000),
							leader_id: m[1],
							msg: '<span class="more_in">' + ts + '</span> ' + fblink(m[1], m2[1]) + ' has a war!' + mwlink(m[1]) + achlink(str, 'War') + '</span>'
						};
						links[links.length] = str;
						war_count++;
						}
					}
					else if (do_wars && (m = /story_war_betrayed_stream.+%22leader_id%22%3A%22(p%7C\d+)%22/.exec(a))) {
						str = "remote/html_server.php?xw_controller=war&xw_action=view&leader_id=" + m[1] + '&skip_interstitial=1&skip_req_frame=1';
						if (! (m[1] in wars_over) && links.indexOf(str) == -1 && t.getTime() >= time_minus_6h.getTime()) {
						//if (res['attachment']['attachment_data']) { var m2 = /betrayed\s(.+?)\sand\ssided\swith\s(.+?)\sin\stheir/.exec(res['attachment']['attachment_data']); }
						var m2;
						if (m2 == null || m2 == undefined) m2 = ['unknown', 'unknown'];
						ts = timestamp(t);
						objects[objects.length] = {
							name_str: m2[1],
							url: str,
							original_url: a,
							type: 'war',
							timestamp: ts,
							original_time: parseInt(res['created_time'] * 1000),
							leader_id: m[1],
							msg: '<span class="more_in">' + ts + '</span> ' + fblink(m[1], m2[1]) + ' has a war!' + mwlink(m[1]) + achlink(str, 'War') + '</span>'
						};
						links[links.length] = str;
						war_count++;
						}
					}
					else if (do_wars && (m = /story_war_won_stream.+%22user%22%3A%22(p%7C\d+)%22/.exec(a))) {
						wars_over[wars_over.length] = m[1];
					}
					else if (do_stash && (m = /collect_loot.+%22sender%22%3A%22(p%7C\d+)%22%2C%22time%22%3A%22(\d+)%22/.exec(a))) {
					//else if (do_stash && (m = /collect_fight_loot.+22loot_time%22%3A%22(\d+)%22%2C%22friend%22%3A%22(\d+)%22/.exec(a))) {
						str = "remote/html_server.php?xw_controller=job&xw_action=collect_loot&sender=" + m[1] + '&install_source=newsfeed&sendtime=' + m[2] + '&time=' + m[2] + '&friend=' + m[1];
						//str = 'remote/html_server.php?xw_controller=fight&xw_action=collect_fight_loot&loot_time='+m[1]+'&friend='+m[2];
						if (links.indexOf(str) == -1) {
							try {
								//console.log(res['app_data']['attachment_data']);
								var m2 = /secret\sstash\sof\s(.+)\sand\sis\swilling/.exec(res['app_data']['attachment_data']); 
							}
							catch (no_data) {
								var m2 = ['unknown', 'unknown'];
							}
							if (m2 == null || m2 == undefined) { m2 = ['unknown', 'unknown']; }
							ts = timestamp(t);
							objects[objects.length] = {
								name_str: n,
								url: str,
								original_url: a,
								type: 'stash',
								timestamp: ts,
								original_time: parseInt(res['created_time'] * 1000),
								friend: m[1],
								loot: m2[1],
								time: m[2],
								msg: '<span class="more_in">' + ts + '</span> ' + fblink(m[1], n) + ' found a secret stash of ' + m2[1] + '!' + mwlink(m[1]) + achlink(str, 'Stash') + '</span>'
							};
							links[links.length] = str;
							stash_count++;
						}
					}
					else if (do_bonus && (m = /levelup_boost_claim.+%22friend_id%22%3A%22(p%7C\d+)%22/.exec(a))) {
						str = "remote/html_server.php?xw_controller=index&xw_action=levelup_boost_claim&friend_id=" + m[1];
						if (links.indexOf(str) == -1) {
							ts = timestamp(t);
							objects[objects.length] = {
								name_str: n,
								url: str,
								original_url: a,
								type: 'bonus',
								timestamp: ts,
								original_time: parseInt(res['created_time'] * 1000),
								friend: m[1],
								msg: '<span class="more_in">' + ts + '</span> ' + fblink(m[1], n) + ' has a level up bonus!' + mwlink(m[1]) + achlink(str, 'Bonus') + '</span>'
							};
							links[links.length] = str;
							bonus_count++;
						}
					}
					else if (do_bonus && (m = /iced_boost_claim.+%22friend_id%22%3A%22(p%7C\d+)%22/.exec(a))) {
						str = "remote/html_server.php?xw_controller=index&xw_action=iced_boost_claim&friend_id=" + m[1];
						if (links.indexOf(str) == -1) {
							ts = timestamp(t);
							objects[objects.length] = {
							name_str: n,
							url: str,
							original_url: a,
							bonus: 'an iced',
							type: 'bonus',
							timestamp: ts,
							original_time: parseInt(res['created_time'] * 1000),
							friend: m[1],
							msg: '<span class="more_in">' + ts + '</span> ' + fblink(m[1], n) + ' has an iced bonus!' + mwlink(m[1]) + achlink(str, 'Bonus') + '</span>'
						};
						links[links.length] = str;
						bonus_count++;
						}
					}
					else if (do_bonus && (m = /feature_job.+FEATJB%22%3A%22([a-f0-9]+).+%22friend%22%3A%22(p%7C\d+)%22/.exec(a))) {
						str = "remote/html_server.php?xw_controller=index&xw_action=holiday_feed_reward&FEATJB="+m[1]+"&friend="+m[2];
						if (links.indexOf(str) == -1) {
							ts = timestamp(t);
							objects[objects.length] = {
								name_str: n,
								url: str,
								original_url: a,
								bonus: 'featured',
								type: 'bonus',
								timestamp: ts,
								original_time: parseInt(res['created_time'] * 1000),
								friend: m[1],
								msg: '<span class="more_in">' + ts + '</span> ' + fblink(m[1], n) + ' shares a holiday bonus!' + mwlink(m[1]) + achlink(str, 'Bonus') + '</span>'
							};
							links[links.length] = str;
							bonus_count++;
						}
					}
					
					else if (do_bonus && (m = /robbing.*?next_action=mastery_bonus.*?next_params=%7B%22target%22%3A%22(p%7C\d+)%22%7D/.exec(a))) {
						str = "remote/html_server.php?xw_controller=robbing&xw_action=mastery_bonus&target="+m[1];
						if (links.indexOf(str) == -1) {
							ts = timestamp(t);
							objects[objects.length] = {
								name_str: n,
								url: str,
								original_url: a,
								bonus: 'robbery',
								type: 'bonus',
								timestamp: ts,
								original_time: parseInt(res['created_time'] * 1000),
								friend: m[1],
								msg: '<span class="more_in">' + ts + '</span> ' + fblink(m[1], n) + ' shares a robbery bonus!' + mwlink(m[1]) + achlink(str, 'Rob') + '</span>'
							};
							links[links.length] = str;
							bonus_count++;
						}
					}
					//new chop chop requests
					else if (do_vegas && (m = /itemFeedHelp.*?next_params=%7B%22item_id%22%3A%22(\d+)%22%2C%22item_type%22%3A%22(\d+)%22%2C%22target%22%3A%22(p%7C\d+)%22%2C%22city_id%22%3A%22(\d+)%22%2C%22building_type%22%3A%22(\d+)%22%2C%22destination%22%3A%22(\d+)%22/.exec(a))) {
						str = "remote/html_server.php?xw_controller=propertyV2&xw_action=itemFeedHelp&item_id="+m[1]+"&item_type="+m[2]+"&target="+m[3]+"&building_type="+m[5]+'&city_id='+m[4]+'&destination='+m[6];
						var building = 'Unknown';
						if (m[4] == 1) { building = 'Vegas'; }
						if (links.indexOf(str) == -1) {
							ts = timestamp(t);
							objects[objects.length] = {
								name_str: n,
								url: str,
								original_url: a,
								type: 'chop',
								timestamp: ts,
								original_time: parseInt(res['created_time'] * 1000),
								friend: m[3],
								loot: m[2],
								msg: '<span class="more_in">' + ts + '</span> ' + fblink(m[3], n) + ' needs '+building+' parts!' + mwlink(m[3]) + achlink(str, 'Parts') + '</span>'
							};
							links[links.length] = str;
							chop_count++;
						}
					}
					else if (do_chop && (m = /cs_help_item.*?next_params=%7B%22item%22%3A%22(\d+)%22%2C%22type%22%3A%22(\d+)%22%2C%22target%22%3A%22(p%7C\d+)%22%2C%22building_type%22%3A%22(\d+)%22/.exec(a))) {
						str = "remote/html_server.php?xw_controller=propertyV2&xw_action=cs_help_item&item="+m[1]+"&type="+m[2]+"&target="+m[3]+"&building_type="+m[4];
						var building = 'Unknown';
						if (m[4] == 11) { building = 'Chop Shop'; }
						if (m[4] == 12) { building = 'Weapons Depot'; }
						if (links.indexOf(str) == -1) {
							ts = timestamp(t);
							objects[objects.length] = {
								name_str: n,
								url: str,
								original_url: a,
								type: 'chop',
								timestamp: ts,
								original_time: parseInt(res['created_time'] * 1000),
								friend: m[3],
								loot: m[2],
								msg: '<span class="more_in">' + ts + '</span> ' + fblink(m[3], n) + ' needs '+building+' parts!' + mwlink(m[3]) + achlink(str, 'Parts') + '</span>'
							};
							links[links.length] = str;
							chop_count++;
						}
					}
					else if (do_chop && (m = /cs_help_initial.*?next_params=%7B%22target%22%3A%22(p%7C\d+)%22%2C%22building_type%22%3A%22(\d+)%22/.exec(a))) {
						str = "remote/html_server.php?xw_controller=propertyV2&xw_action=cs_help_initial&target="+m[1]+"&building_type="+m[2];
						var building = 'Unknown';
						if (m[2] == 11) { building = 'Chop Shop'; }
						if (m[2] == 12) { building = 'Weapons Depot'; }
						if (links.indexOf(str) == -1) {
							ts = timestamp(t);
							objects[objects.length] = {
								name_str: n,
								url: str,
								original_url: a,
								type: 'chop',
								timestamp: ts,
								original_time: parseInt(res['created_time'] * 1000),
								friend: m[1],
								msg: '<span class="more_in">' + ts + '</span> ' + fblink(m[1], n) + ' needs '+building+' upgrade parts!' + mwlink(m[1]) + achlink(str, 'Parts') + '</span>'
							};
							links[links.length] = str;
							chop_count++;
						}
					}
					else if (do_bonus && (m = /cs_help_final.*?next_params=%7B%22target%22%3A%22(p%7C\d+)%22%2C%22building_type%22%3A%22(\d+)%22/.exec(a))) {
						str = "remote/html_server.php?xw_controller=propertyV2&xw_action=cs_help_final&target="+m[1]+"&building_type="+m[2];
						var building = 'Unknown';
						if (m[2] == 11) { building = 'Chop Shop'; }
						if (m[2] == 12) { building = 'Weapons Depot'; }
						if (links.indexOf(str) == -1) {
							ts = timestamp(t);
							objects[objects.length] = {
								name_str: n,
								url: str,
								original_url: a,
								type: 'bonus',
								timestamp: ts,
								original_time: parseInt(res['created_time'] * 1000),
								friend: m[1],
								msg: '<span class="more_in">' + ts + '</span> ' + fblink(m[1], n) + ' upgraded '+building+'.' + mwlink(m[1]) + achlink(str, 'Bonus') + '</span>'
							};
							links[links.length] = str;
							bonus_count++;
						}
					}
					
					else if (do_bonus && (m = /propertyV2.*?next_action=build_brag_click.*?next_params=%7B%22target%22%3A%22(p%7C\d+)%22%7D/.exec(a))) {
						str = "remote/html_server.php?xw_controller=propertyV2&xw_action=build_brag_click&target="+m[1];
						if (links.indexOf(str) == -1) {
							ts = timestamp(t);
							objects[objects.length] = {
								name_str: n,
								url: str,
								original_url: a,
								type: 'bonus',
								timestamp: ts,
								original_time: parseInt(res['created_time'] * 1000),
								friend: m[1],
								msg: '<span class="more_in">' + ts + '</span> ' + fblink(m[1], n) + ' built a special car/weapon.' + mwlink(m[1]) + achlink(str, 'Bonus') + '</span>'
							};
							links[links.length] = str;
							bonus_count++;
						}
					}
					//chop chop end
					//new crew jobs start
					else if (do_crew && (m = /social_col_help.*?next_params=%7B%22target%22%3A%22(p%7C\d+)%22.*?vault%22%3A%22(\d+)%22.*?secret.*?%25(.*?)%25/.exec(a))) {
						str = "remote/html_server.php?xw_controller=job&next_action=social_col_help&target="+m[1]+'&vault='+m[2]+'&secret=%25'+m[3]+'%25';
						if (links.indexOf(str) == -1) {
							ts = timestamp(t);
							var collection = crewMap[m[2]];
							objects[objects.length] = {
								name_str: n,
								url: str,
								original_url: a,
								type: 'crew',
								timestamp: ts,
								original_time: parseInt(res['created_time'] * 1000),
								friend: m[1],
								loot: m[2],
								//msg: '<span class="more_in">' + ts + '</span> ' + fblink(m[1], n) + ' needs help completing '+collection+'.' + achlink(str, 'Crew')+ '</span>'
								msg: '<span class="more_in">' + ts + '</span> ' + fblink(m[1], n) + ' needs items from '+collection+'. [<a href="'+a+'" target="_blank" onclick="this.innerHTML=\'Visited\';">Crew</a>]</span>'
							};
							links[links.length] = str;
							crew_count++;
						}
					}
					else if (do_crew && (m = /feature_collection_req.*?next_params=%7B%22target%22%3A%22(p%7C\d+)%22/.exec(a))) {
						str = "remote/html_server.php?xw_controller=job&next_action=feature_collection_req&target="+m[1];
						if (links.indexOf(str) == -1) {
							ts = timestamp(t);
							var collection = 'feature collection';
							objects[objects.length] = {
								name_str: n,
								url: str,
								original_url: a,
								type: 'crew',
								timestamp: ts,
								original_time: parseInt(res['created_time'] * 1000),
								friend: m[1],
								loot: m[2],
								//msg: '<span class="more_in">' + ts + '</span> ' + fblink(m[1], n) + ' needs help completing '+collection+'.' + achlink(str, 'Crew')+ '</span>'
								msg: '<span class="more_in">' + ts + '</span> ' + fblink(m[1], n) + ' needs items from '+collection+'. [<a href="'+a+'" target="_blank" onclick="this.innerHTML=\'Visited\';">Crew</a>]</span>'
							};
							links[links.length] = str;
							crew_count++;
						}
					}
					else if (do_crew && (m = /loot_drop_event_feed_reward.*?&sendkey=([a-zA-Z0-9]+).*?next_params=%7B%22tag%22%3A%22([a-zA-Z0-9]+)%22.*?friend%22%3A%22(p%7C\d+)%22/.exec(a))) {
						str = 'remote/html_server.php?xw_controller=index&next_action=loot_drop_event_feed_reward&sendkey='+m[1]+'&tag='+m[2]+'&friend='+m[3];
						if (links.indexOf(str) == -1) {
							ts = timestamp(t);
							var collection = 'Casino Vault';
							objects[objects.length] = {
								name_str: n,
								url: str,
								original_url: a,
								type: 'crew',
								timestamp: ts,
								original_time: parseInt(res['created_time'] * 1000),
								friend: m[1],
								loot: m[2],
								//msg: '<span class="more_in">' + ts + '</span> ' + fblink(m[1], n) + ' needs help completing '+collection+'.' + achlink(str, 'Casino')+ '</span>'
								msg: '<span class="more_in">' + ts + '</span> ' + fblink(m[1], n) + ' offers items from '+collection+'. [<a href="'+a+'" target="_blank" onclick="this.innerHTML=\'Visited\';">Casino</a>]</span>'
							};
							links[links.length] = str;
							crew_count++;
						}
					}
					//crew jobs end
					else if (do_burner && (m = /call_for_help_get_phone.*?next_params=%7B%22from%22%3A%22(p%7C\d+)%22.*?%22di%22%3A%22(\d+)%22/.exec(a))) {
						str = 'remote/html_server.php?xw_controller=robbing&next_action=call_for_help_get_phone&from='+m[1]+'&di='+m[2];
						if (links.indexOf(str) == -1) {
							ts = timestamp(t);
							var collection = 'burner phone';
							objects[objects.length] = {
								name_str: n,
								url: str,
								original_url: a,
								type: 'burner',
								timestamp: ts,
								original_time: parseInt(res['created_time'] * 1000),
								friend: m[1],
								loot: m[2],
								//msg: '<span class="more_in">' + ts + '</span> ' + fblink(m[1], n) + ' needs a '+collection+'. '+achlink(str, 'Burner')+'</span>'
								msg: '<span class="more_in">' + ts + '</span> ' + fblink(m[1], n) + ' needs '+collection+'. [<a href="'+a+'" target="_blank" onclick="this.innerHTML=\'Visited\';">Burner</a>]</span>'
							};
							links[links.length] = str;
							burner_count++;
						}
					}
					//burner end
					
				}
				//end app_id if check
				//count other apps
				else {
					other_apps[res['app_id']] > 0 ? other_apps[res['app_id']]++ : other_apps[res['app_id']] = 1;
				}
			  
				if (t.getTime() <= target_time.getTime()) {
					done = true;
					break;
				}
			}
        }
		//end for each posts loop
		
        if (results.length < limit) done = true;
        if (!done) {
          if (last_time.getTime() < start_time.getTime()) {
            msg('Requesting more data. '+post_count+' posts so far. Last timestamp was '+timestamp(last_time));
            start_time.setTime(last_time.getTime() - 1);
            //console.warn('Requesting data for start of ' + last_time.toString());
            self.requestData();
          } else done = true;
        }

        if (done) {

			if (debug) {
				var output3 = '';
				for (x in other_apps) {
					if (other_apps[x] > 0) {
						output3 += x +': '+ other_apps[x]+'\n';
					}
				}
				console.log(output3);
			}
			
			links.reverse(); 
			objects.reverse();
			if(do_reverse) { 
				links.reverse(); 
				objects.reverse();
			}
			document.getElementById('specialmsg').innerHTML = 'Found ' + links.length + ' interesting posts out of '+post_count+'.';
			if (links.length == 0) {
				msg('<span class="bad">Add more categories or increase time to find links. Make sure MW is visible on your <a href="http://www.facebook.com/home.php?sk=lf">news feed</a>.</span>');
			}
			for (i = 0; i < objects.length; i++) {
				o = objects[i];
				log(o.msg, o.type);
			}
			document.getElementById('ach_count').innerHTML = ach_count + ' achievement' + (ach_count == 1 ? '' : 's') + '<br/>';
			if (ach_count > 0) {
				my_toggle('ach_row');
			}
			document.getElementById('ach_logshow').onclick = function () {
				my_toggle('ach_log');
			};
			document.getElementById('boss_count').innerHTML = boss_count + ' boss job' + (boss_count == 1 ? '' : 's') + '<br/>';
			if (boss_count > 0) {
				my_toggle('boss_row');
			}
			document.getElementById('boss_logshow').onclick = function () {
				my_toggle('boss_log');
			};
			var output3 = ' - ';
			for (x in jobsnum) {
				if (jobsnum[x] > 0) {
					output3 += x +': '+ jobsnum[x]+'&nbsp; ';
				}
			}
			
			document.getElementById('job_count').innerHTML = job_count + ' job' + (job_count == 1 ? '' : 's') +output3+'<br/>';
			if (job_count > 0) {
				my_toggle('job_row');
				my_toggle('jobdone_row');
			}
			document.getElementById('job_logshow').onclick = function () {
				my_toggle('job_log');
			};
			
			document.getElementById('launder_count').innerHTML = launder_count + ' money laundering job' + (launder_count == 1 ? '' : 's') + '<br/>';
			if (launder_count > 0) {
				my_toggle('launder_row');
			}
			document.getElementById('launder_logshow').onclick = function () {
				my_toggle('launder_log');
			};
			
			document.getElementById('loot_count').innerHTML = loot_count + ' loot shipment' + (loot_count == 1 ? '' : 's') + '<br/>';
			if (loot_count > 0) {
				my_toggle('loot_row');
			}
			document.getElementById('loot_logshow').onclick = function () {
				my_toggle('loot_log');
			};
			
			document.getElementById('war_count').innerHTML = war_count + ' war' + (war_count == 1 ? '' : 's') + '<br/>';
			if (war_count > 0) {
				my_toggle('war_row');
			}
			document.getElementById('war_logshow').onclick = function () {
				my_toggle('war_log');
			};
			
			document.getElementById('stash_count').innerHTML = stash_count + ' stash' + (stash_count == 1 ? '' : 'es') + '<br/>';
			if (stash_count > 0) {
				my_toggle('stash_row');
			}
			document.getElementById('stash_logshow').onclick = function () {
				my_toggle('stash_log');
			};
			
			document.getElementById('bonus_count').innerHTML = bonus_count + ' bonus' + (bonus_count == 1 ? '' : 'es') + '<br/>';
			if (bonus_count > 0) {
				my_toggle('bonus_row');
			}
			document.getElementById('bonus_logshow').onclick = function () {
				my_toggle('bonus_log');
			};
			
			document.getElementById('crew_count').innerHTML = crew_count + ' crew job' + (crew_count == 1 ? '' : 's') + '<br/>';
			if (crew_count > 0) {
				my_toggle('crew_row');
			}
			document.getElementById('crew_logshow').onclick = function () {
				my_toggle('crew_log');
			};
			
			document.getElementById('chop_count').innerHTML = chop_count + ' Build Part' + (chop_count == 1 ? '' : '\'s') + '<br/>';
			if (chop_count > 0) {
				my_toggle('chop_row');
			}
			document.getElementById('chop_logshow').onclick = function () {
				my_toggle('chop_log');
			};
			
			document.getElementById('burner_count').innerHTML = burner_count + ' Burner Phone' + (burner_count == 1 ? '' : '\'s') + '<br/>';
			if (burner_count > 0) {
				my_toggle('burner_row');
			}
			document.getElementById('burner_logshow').onclick = function () {
				my_toggle('burner_log');
			};

			document.getElementById('looted_logshow').onclick = function () {
				my_toggle('looted_log');
			};
			document.getElementById('pause').onclick = function (e) {
				run = 0;
				document.getElementById("pause").style.display = 'none';
				document.getElementById("play").style.display = 'inline';
				return false;
			};
			document.getElementById('play').onclick = function (e) {
				run = 1;
				document.getElementById("play").style.display = 'none';
				document.getElementById("pause").style.display = 'inline';
				document.getElementById('manual_loot').style.display = '';
				document.getElementById('manual_exp').style.display = '';
				document.getElementById('looted_log').style.display = '';
				msg('Checking all the found links...');
				nextlink();
				return false;
			};
		    document.getElementById('donate').onmouseover = function () {
				this.innerHTML = 'Donate a Pint';
				return false;
			};
			document.getElementById('donate').onmouseout = function () {
				this.innerHTML = 'Donate';
				return false;
			};

			function check_next() {
				createCookie('sh_timelast',objects[manual]['original_time']);
				manual++;
				document.getElementById('attempts').innerHTML = manual + ' of ' + links.length;
				//alert('ratiolvl: '+ratiolvl+' ratiolvl2: '+ratiolvl2+' expneed: '+expneed+' pause: '+pause);
				if ((ratiolvl < 1.5) && (pause > 0)) {
					run = 0;
					document.getElementById("pause").style.display = 'none';
					document.getElementById("play").style.display = 'inline';
					msg('Paused, can gain level with energy on jobs with ratio above 1.5.');
				}
				else if ((ratiolvl2 < 2.3) && (pause > 0) && (stamina > 0)) {
					run = 0;
					document.getElementById("pause").style.display = 'none';
					document.getElementById("play").style.display = 'inline';
					msg('Paused, can gain level with stamina.');
				}
				else if ((expneed <= pause) && (pause > 0)) {
					run = 0;
					document.getElementById("pause").style.display = 'none';
					document.getElementById("play").style.display = 'inline';
					msg('Paused, reached "exp before leveling"-limit.');
				}
				else if (run == 0) {
					document.getElementById("pause").style.display = 'none';
					document.getElementById("play").style.display = 'inline';
					msg('Paused. Press play to resume again.');
				}
				else if (run == 1) {
				  wait = myRandom(parseInt(wait1), parseInt(wait2));
				  pausing(wait, 'Loading next link in ', nextlink);
				}
				else {
					msg('Do not know what to do...');
				}
			}

			function state_change(s) {
				currentPageCount = pageCount;
				//document.getElementById('inner_page').removeEventListener('DOMSubtreeModified',state_change,false);
				loot='';
				try {
					local_xw_sig = /local_xw_sig = '([a-f0-9]+)'/.exec(s)[1]; 
					
					if (/loot_confirmed=yes.*?incnt_choice/.test(s)) {
						sclick=s.substr(s.indexOf('<table class="messages"'));
						sclick=sclick.substr(0,sclick.indexOf('</table'));
						//console.log(sclick);
						if (button=/(xw_controller=(story|index|robbing|launder|propertyV2|war|fight|job|episode).*?loot_confirmed=yes.*?incnt_choice)(=multi)?/.exec(sclick)) {
							//console.log(button[1].replace('http://facebook.mafiawars.com/mwfb/',''));
							//request('remote/html_server.php?'+button[1]);
							wait = myRandom(parseInt(wait1), parseInt(wait2));
							pausing(wait, 'Loading the real url in...',function() { request('remote/html_server.php?'+button[1]+button[3]) });
						}
						else {
							check_next();
						}
					}
					else {
						parselog(s,links[manual]);
						//console.log('Manual: '+manual+' Link: '+links[manual]);
						check_next();
					}
				}
				catch (ignoree) { 
					if (debug) { console.log('Error in state_change: '+ignoree) }
					msg(timestamp()+'Error when loading page, retry #'+retries);
					retry('Some sort of problem when loading page, retrying...');
					return;
				}
			}

			function request(url) {
				if (debug) { console.log(url); }
				if (manual < links.length) {
					if (run == 1) {
						cb = fbuserid+unix_timestamp();
						var params = { 
							'ajax': 1, 
							'liteload': 1, 
							'sf_xw_user_id': userid,
							'sf_xw_sig': local_xw_sig,
							'xw_client_id': 8,
							'skip_req_frame': 1
						};
						$.ajax({
							type: "POST",
							url: preurl+url+'&cb='+cb,
							data: params,
							timeout: 10000,
							success: function (msg){
								state_change(msg);
							},
							error: function(request,status,error){
								if (debug) { console.log('Problem loading: '+url); }
								retry(timestamp()+status+' '+error+' Error when loading page, retry #'+retries); return;
							}
						});
					} else {
						msg('Paused searching.');
					}
					last_url=url;
				}
				else {
					msg('All links checked. Done.');
				}
			}
			function retry(s) {
				if (retries > 3) {
					msg(s + ', not retrying this link any more.');
					check_next();
				}
				else {
					retries++;
					//pausing(5, 'Retry #'+retries+' in ' , request(last_url));
					//pausing(5, 'Retry #'+retries+' in ' , console.log(last_url));
					pausing(5, 'Retry #'+retries+' in ' , check_next);
					return;
				}
			}
	
			//load the next link
			function nextlink() {
				if (manual < links.length) {
					//console.log('Next link to load is: '+links[manual]);
					if (/xw_controller=war/.test(links[manual])) {
						msg('Link was a war, not checking those in auto mode...');
						manual++;
						nextlink();
					}
					else if (/social_col_help/.test(links[manual])) {
						msg('Link was a crew collection job, not checking those in auto mode...');
						if (debug) { console.log('Link was a crew collection job, not checking those in auto mode...'); }
						manual++;
						nextlink();
					}
					else if (/feature_collection_req/.test(links[manual])) {
						msg('Link was a crew collection job, not checking those in auto mode...');
						if (debug) { console.log('Link was a crew collection job, not checking those in auto mode...'); }
						manual++;
						nextlink();
					}
					else if (/call_for_help_get_phone/.test(links[manual])) {
						msg('Link was a burner phone, not checking those in auto mode...');
						if (debug) { console.log('Link was a burner phone, not checking those in auto mode...'); }
						manual++;
						nextlink();
					}
					else if (/xw_controller=launder/.test(links[manual]) && laundry_limit) {
						currentPageCount = pageCount;
						//document.getElementById('inner_page').addEventListener('DOMSubtreeModified',state_change,false);
						document.getElementById('attempts').innerHTML = manual + ' of ' + links.length;
						msg('Laundry limit has been reached, skipping and loading next link...');
						if (debug) { console.log('Laundry limit reached. Skipping link. '+links[manual]); }
						manual++;
						nextlink();
					}
					else if (/xw_controller=job.*?job_city=1/.test(links[manual]) && newyork_limit) {
						currentPageCount = pageCount;
						//document.getElementById('inner_page').addEventListener('DOMSubtreeModified',state_change,false);
						document.getElementById('attempts').innerHTML = manual + ' of ' + links.length;
						msg('New York limit has been reached, skipping and loading next link...');
						if (debug) { console.log('New York limit reached. Skippling link. '+links[manual]); }
						manual++;
						nextlink();
						return;
					}
					else if (/xw_controller=job.*?job_city=2/.test(links[manual]) && cuba_limit) {
						currentPageCount = pageCount;
						//document.getElementById('inner_page').addEventListener('DOMSubtreeModified',state_change,false);
						document.getElementById('attempts').innerHTML = manual + ' of ' + links.length;
						msg('Cuba limit has been reached, skipping and loading next link...');
						if (debug) { console.log('Cuba limit reached. Skipping link. '+links[manual]); }
						manual++;
						nextlink();
						return;
					}
					else if (/xw_controller=(job|episode).*?job_city=3/.test(links[manual]) && moscow_limit) {
						currentPageCount = pageCount;
						//document.getElementById('inner_page').addEventListener('DOMSubtreeModified',state_change,false);
						document.getElementById('attempts').innerHTML = manual + ' of ' + links.length;
						msg('Moscow limit has been reached, skipping and loading next link...');
						if (debug) { console.log('Moskow limit reached. Skipping link. '+links[manual]); }
						manual++;
						nextlink();
						return;
					}
					else if (/xw_controller=story.*?job_city=4/.test(links[manual]) && bangkok_limit) {
						currentPageCount = pageCount;
						//document.getElementById('inner_page').addEventListener('DOMSubtreeModified',state_change,false);
						document.getElementById('attempts').innerHTML = manual + ' of ' + links.length;
						msg('Bangkok limit has been reached, skipping and loading next link...');
						if (debug) { console.log('Bangkok limit reached. Skipping link. '+links[manual]); }
						manual++;
						nextlink();
						return;
					}
					else if (/call_for_help_get_phone/.test(links[manual]) && burner_limit) {
						currentPageCount = pageCount;
						//document.getElementById('inner_page').addEventListener('DOMSubtreeModified',state_change,false);
						document.getElementById('attempts').innerHTML = manual + ' of ' + links.length;
						msg('Burner Phone limit has been reached, skipping and loading next link...');
						if (debug) { console.log('Burner Phone limit reached. Skipping link. '+links[manual]); }
						manual++;
						nextlink();
						return;
					}
					else {
						currentPageCount = pageCount;
						//document.getElementById('inner_page').addEventListener('DOMSubtreeModified',state_change,false);
						//msg('Loading next link. Helping '+objects[manual]['timestamp']+objects[manual]['name_str']+'...');
						msg('Loading next link. Helping '+objects[manual]['name_str']+'...');
						//do_ajax('inner_page', links[manual], 1, 0);
						request(links[manual]);
					}
				}
				else {
					msg('All links checked. Done.');					
				}
			}

			document.getElementById('next').onclick = function () {
				document.getElementById('manual_loot').style.display = '';
				document.getElementById('manual_exp').style.display = '';
				document.getElementById('attempts').innerHTML = manual + ' of ' + links.length;
				nextlink();
				return false;
			};

			if (do_autostart) { 
				document.getElementById("play").style.display = 'none';
				document.getElementById("pause").style.display = 'inline';
				document.getElementById('manual_loot').style.display = '';
				document.getElementById('manual_exp').style.display = '';
				document.getElementById('looted_log').style.display = '';
				run = 1;
				nextlink();
			}
		}
      }
    };
    return self;
  }();

  function start() {
    dataObject.init();
    document.getElementById('spockdiv').innerHTML = running_html;
    document.getElementById("close").onclick = close;
    document.getElementById("close").style.display = 'inline';
    msg('Requesting data...');
    dataObject.requestData();
  }

  document.getElementById('start').onclick = start;

  function msg(s) {
    document.getElementById('status').innerHTML = s;
  }

  function timestamp(d) {
    now = d == undefined ? new Date() : d;
    var CurH = now.getHours();
    CurH = (CurH < 10 ? "0" + CurH : CurH);
    var CurM = now.getMinutes();
    CurM = (CurM < 10 ? "0" + CurM : CurM);
    return '<span class="more_in">[' + CurH + ':' + CurM + ']</span> ';
  }

  function log(s, r) {
    if (r != undefined) r = r + '_';
    else r = '';
    var l = document.getElementById(r + 'log');
    l = l.insertRow(-1);
    l = l.insertCell(0);
    l.innerHTML = s + '.';
  }

  function mwlink(f, n) {
    return '<span class="more_in">[<a href="' + mw_url + f + aft + '" target="_blank">' + (n == undefined ? 'MW' : n) + '</a>]</span>';
  }

  function fblink(f, n) {
    return '<a href="' + fb_url + f + '" target="_blank">' + (n == undefined ? 'FB' : n) + '</a>';
  }

  function achlink(l, t) {
    return '<span id="achlink" class="more_in">[<a href="http://facebook.mafiawars.com/mwfb/' + l + '" onclick="this.innerHTML=\'Visited\'; return do_ajax(\'inner_page\',\'' + l + '\',1,0); return false;">' + t + '</a>]</span>';
  }
  var expnow,expnext,stamina,energy,ratiolvl3;
	function stats_ratios(s) {
		if (/user_info_update/.test(s)) { var s=s.substr(0,s.indexOf('user_info_update')); }
		document.getElementById('user_cash_nyc').innerHTML = /user_cash_nyc.*?"(.*?)"/.exec(s)[1];
		document.getElementById('user_cash_cuba').innerHTML = /user_cash_cuba.*?"(.*?)"/.exec(s)[1];
		document.getElementById('user_cash_moscow').innerHTML = /user_cash_moscow.*?"(.*?)"/.exec(s)[1];
		document.getElementById('user_cash_bangkok').innerHTML = /user_cash_bangkok.*?"(.*?)"/.exec(s)[1];
		document.getElementById('user_cash_vegas').innerHTML = /user_cash_vegas.*?"(.*?)"/.exec(s)[1];
		expnow = parseInt(/user_experience.*?(\d+)/.exec(s)[1]);
		expnext = parseInt(/exp_for_next_level.*?(\d+)/.exec(s)[1]);
		expneed = eval(expnext-expnow);

		if (document.getElementById('exp_to_next_level')) {
			document.getElementById('exp_to_next_level').innerHTML = expneed;
		}
		else {
			document.getElementById('user_experience').innerHTML = expnow;
			document.getElementById('exp_for_next_level').innerHTML = expnext;
		}	
		
		energy = parseInt(/user_energy.*?(\d+)/.exec(s)[1]);
		document.getElementById('user_energy').innerHTML = energy;
		stamina = parseInt(/user_stamina.*?(\d+)/.exec(s)[1]);
		document.getElementById('user_stamina').innerHTML = stamina;
		
		ratiolvl=eval(expneed/energy);
		ratiolvl2=eval(expneed/stamina);
		ratiolvl3=eval(expneed/(parseInt(energy)+parseInt(stamina)));
		(Math.abs(ratiolvl)<5)?(d=2):(d=0);
		(Math.abs(ratiolvl2)<5)?(d2=2):(d2=0);
		(Math.abs(ratiolvl3)<5)?(d3=2):(d3=0);
		if(ratiolvl=='Infinity') { ratiolvl=0; d=0; }
		if(ratiolvl2=='Infinity') { ratiolvl2=0; d2=0; }
		if(ratiolvl3=='Infinity') { ratiolvl3=0; d3=0; }
		
		if (document.getElementById('exp_to_next_level')) {
			document.getElementsByClassName('experience')[0].innerHTML='(<span class="energy_highlight">'+(ratiolvl).toFixed(d)+'</span><img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_energy_16x16_01.gif" width="12" height="12" title="Exp needed per Energy">)(<span class="energy_highlight">'+(ratiolvl2).toFixed(d2)+'</span><img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_stamina_16x16_01.gif" width="12" height="12" title="Exp needed per Stamina">) <span class="more_in">'+(ratiolvl3).toFixed(d3)+'</span>';
			document.getElementById('level_bar').style.width = /percent_complete.*?(\d+)/.exec(s)[1]+'%';
		}
		else {
			document.getElementById('user_experience').innerHTML='(<span class="energy_highlight">'+(ratiolvl).toFixed(d)+'</span><img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_energy_16x16_01.gif" width="12" height="12" title="Exp needed per Energy">)(<span class="energy_highlight">'+(ratiolvl2).toFixed(d2)+'</span><img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_stamina_16x16_01.gif" width="12" height="12" title="Exp needed per Stamina">) <span class="more_in">'+(ratiolvl3).toFixed(d3)+'</span>';
			document.getElementById('level_bar_new_header').style.width = /percent_complete.*?(\d+)/.exec(s)[1]+'%';
		}
		
		//document.getElementById('user_stats').getElementsByClassName('experience')[0].innerHTML='Exp Need: <span class="energy_highlight">'+expneed+'</span><br>(<span class="energy_highlight">'+(ratiolvl).toFixed(d)+'</span><img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_energy_16x16_01.gif" width="12" height="12" title="Exp needed per Energy">)(<span class="energy_highlight">'+(ratiolvl2).toFixed(d2)+'</span><img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_stamina_16x16_01.gif" width="12" height="12" title="Exp needed per Stamina">)<span class="more_in">'+(ratiolvl3).toFixed(d3)+'</span>';
	}

  //parse the message for money, exp and loot
  function parselog(s,link) {
	stats_ratios(s);
	if(!link) {
		link = '';
	}
	else {
		if (debug) { console.log('Parsed link: '+link); }
	}
    //var s = '';
    //try { s = document.getElementsByClassName('message_body')[0].innerHTML; }
    //catch(ignore) {
	//	try { s = document.getElementById('message_box_generics').innerHTML; }
	//	catch (ignore2) {}
	//}
	
	//chop of the initial variables, off with his head i say
	var choptext = '';
	choptext += 'Before chopping: '+s.length;
	if (/user_info_update/.test(s)) { s=s.substr(s.indexOf('user_info_update')); }
	choptext += ' After head shop: '+s.length;
	//check for the heavy front page load in NY and Cuba
	//lets hope we do not get any false positives
	//if ((/xw_controller=job.*?job_city=1/.test(link)) || (/xw_controller=job.*?job_city=2/.test(link))) {
	if (/<div id="message_box_generics" class="mbox_container_item">/.test(s)) { s=s.substr(s.indexOf('<div id="message_box_generics" class="mbox_container_item">')); }
//	}
	//chop of end stuff, ninja style
	if (/xw_controller=job.*?job_city=1/.test(link) || /xw_controller=job.*?job_city=2/.test(link)) {
		choptext += ' In NY/Cuba, not shopping popup_fodder';
	}
	else {
		if (/popup_fodder/.test(s)) { s=s.substr(0,s.indexOf('popup_fodder')); } 
		choptext += ' After leg non NY/Cuba shop: '+s.length;
	}
	if (/<!-- BEGIN JS FUNCTIONS -->/.test(s)) { s=s.substr(0,s.indexOf('<!-- BEGIN JS FUNCTIONS -->')); } 
	choptext += ' After leg shop: '+s.length;
	if (debug) { console.log(choptext); }
	//console.log(s);
    if (m = /You sent (some|a|an)? ?(.+?) to/.exec(s)) {
      add_loot(m[2]+' <span class="more_in">(Sent)</span>');
    }
    if (m = /You (earned|gained|received|collected) (some|a|an)  ?(.+?) from/.exec(s)) {
      add_loot(m[3]);
    }
	if (m = /You shared in .*? bounty and collected:.*?<span class="good">(.*?)<\/span>/.exec(s)) {
	  add_loot(m[1]);	
	}
    if (m = /You gave a (.*?) to (.*?) and collected one yourself/.exec(s)) {
      add_loot(m[1]);
	  add_loot(m[1]+' <span class="more_in">(Sent)</span>');
    }
    if (m = /you were given (some|a|an) (.+?)\./.exec(s)) {
      add_loot(m[2]);
    }
    if (m = /and received (some|a|an) (.+?)\./.exec(s)) {
      add_loot(m[2]);
    }
    if (m = /You have been awarded the (.+?)\./.exec(s)) {
      add_loot(m[1]);
    }
    if (m = /you received a (.+?) for/.exec(s)) {
      add_loot(m[1]);
    }
    if (m=/<div style=.*?float.*?left.*?width.*?140px.*?>(\d+) (.*?)<\/div>/.exec(s)) {
      add_loot(m[2], parseInt(m[1]));
    }
    if (m = /(\d+)(<\/span>)? ?experience point/.exec(s)) {
      xp = m[1].replace(/[^0-9]/g, '');
      exp += parseInt(xp);
	  if (debug) { console.log('Matched exp in first expression: '+xp); }
    }
    if (m = /(\d+) Experience/.exec(s)) {
      xp = m[1].replace(/[^0-9]/g, '');
      exp += parseInt(xp);
	  if (debug) { console.log('Matched exp in second expression: '+xp); }
    }
	// if (/ZUGZUGYou received <span class="good">(\d+) experience points<\/span> and <strong class="money">([A-Z]?\$)([\d,]+)<\/strong> for helping/.exec(s)) {
	    // xp = m[1].replace(/[^0-9]/g, '');
		// exp += parseInt(xp);
		// var c = /([A-Z]?\$)/.exec(m[2]);
		// var cash = parseInt(m[3].replace(/[^0-9]/g, ''));
		// console.log('Narrow match: '+cash);
		// if (money[c[1]] > 0) {
			// money[c[1]] += cash;
		// }
		// else {
			// money[c[1]] = cash;
		// }
		// track cities 1
	  	// if (/are too late to help/.test(s)) {
			// jobsdone['Late'] > 0 ? jobsdone['Late']++ : jobsdone['Late'] = 1;
		// }
		// else {
			// if (cash > 0) {
				// if (/xw_controller=launder/.test(link)) {
					// jobsdone['Laundry'] > 0 ? jobsdone['Laundry']++ : jobsdone['Laundry'] = 1;
				// }
				// if (/xw_controller=job.*?job_city=1/.test(link)) {
					// jobsdone['New York'] > 0 ? jobsdone['New York']++ : jobsdone['New York'] = 1;
				// }
				// if (/xw_controller=job.*?job_city=2/.test(link)) {
					// jobsdone['Cuba'] > 0 ? jobsdone['Cuba']++ : jobsdone['Cuba'] = 1;
				// }		
				// if (/xw_controller=(job|episode).*?job_city=3/.test(link)) {
					// jobsdone['Moscow'] > 0 ? jobsdone['Moscow']++ : jobsdone['Moscow'] = 1;
				// }
				// if (/xw_controller=story.*?job_city=4/.test(link)) {
					// jobsdone['Bangkok'] > 0 ? jobsdone['Bangkok']++ : jobsdone['Bangkok'] = 1;
				// }
			// }
		// }
		// track cities 1 end	
	// }
    if (m = /([A-Z]?\$)([\d,]+)/.exec(s)) {
		var c = /([A-Z]?\$)/.exec(m[1]);
		var cash = parseInt(m[2].replace(/[^0-9]/g, ''));
		if (debug) { console.log('Wide match: '+cash); }
		if (money[c[1]] > 0) {
			money[c[1]] += cash;
		}
		else {
			money[c[1]] = cash;
		}
		//track cities 2
	  	if (/are too late to help/.test(s)) {
			jobsdone['Late'] > 0 ? jobsdone['Late']++ : jobsdone['Late'] = 1;
		}
		else {
			if (cash > 0) {
				if (/xw_controller=launder/.test(link)) {
					jobsdone['Laundry'] > 0 ? jobsdone['Laundry']++ : jobsdone['Laundry'] = 1;
				}
				if (/xw_controller=job.*?job_city=1/.test(link)) {
					jobsdone['New York'] > 0 ? jobsdone['New York']++ : jobsdone['New York'] = 1;
				}
				if (/xw_controller=job.*?job_city=2/.test(link)) {
					jobsdone['Cuba'] > 0 ? jobsdone['Cuba']++ : jobsdone['Cuba'] = 1;
				}		
				if (/xw_controller=(job|episode).*?job_city=3/.test(link)) {
					jobsdone['Moscow'] > 0 ? jobsdone['Moscow']++ : jobsdone['Moscow'] = 1;
				}
				if (/xw_controller=story.*?job_city=4/.test(link)) {
					jobsdone['Bangkok'] > 0 ? jobsdone['Bangkok']++ : jobsdone['Bangkok'] = 1;
				}
				if (/xw_controller=story.*?job_city=5/.test(link)) {
					jobsdone['Vegas'] > 0 ? jobsdone['Vegas']++ : jobsdone['Vegas'] = 1;
				}
			}
		}
		//track cities 2 end
    }
	if (/already laundered too much money today/.test(s)) {
		if (!laundry_limit) {
			jobsdone['Limited'] += ' Laundry';
		}
		laundry_limit=true;
		jobsdone['Laundry'] > 0 ? jobsdone['Laundry'] = '<span class="bad">'+jobsdone['Laundry']+'</span>' : '';
		//console.log('Laundry limit reached.' +link);
	}
	if (/you can only help 25 friends per day per city/.test(s)) {
		//console.log('City limit noticed.' +link);
		if (/xw_controller=job.*?job_city=1/.test(link)) {
			if (!newyork_limit) {
				jobsdone['Limited'] += ' New York';
			}
			newyork_limit = true;
			//jobsdone['New York'] > 0 ? jobsdone['New York'] = '<span class="bad">'+jobsdone['New York']+'</span>' : '';
		}
		if (/xw_controller=job.*?job_city=2/.test(link)) {
			if (!cuba_limit) {
				jobsdone['Limited'] += ' Cuba';
			}
			cuba_limit = true;
			//jobsdone['Cuba'] > 0 ? jobsdone['Cuba'] = '<span class="bad">'+jobsdone['Cuba']+'</span>' : '';
		}
		if (/xw_controller=(job|episode).*?job_city=3/.test(link)) {
			if (!moscow_limit) {
				jobsdone['Limited'] += ' Moscow';
			}
			moscow_limit = true;
			//jobsdone['Moscow'] > 0 ? jobsdone['Moscow'] = '<span class="bad">'+jobsdone['Moscow']+'</span>' : '';
		}
		if (/xw_controller=story.*?job_city=4/.test(link)) {
			if (!bangkok_limit) {
				jobsdone['Limited'] += ' Bangkok';
			}
			bangkok_limit = true;
			//jobsdone['Bangkok'] > 0 ? jobsdone['Bangkok'] = '<span class="bad">'+jobsdone['Bangkok']+'</span>' : '';
		}
	}
    var output = '<span class="good">Money: </span>';
    for (x in money) {
      if (money[x] > 0) {
        output += x + commas(money[x]) + '&nbsp;';
      }
    }
	var output2 = ' ';
	for (x in jobsdone) {
		if (jobsdone[x] > 0) {
			output2+=x+': '+jobsdone[x]+' ';
		}
	}
	output2 += jobsdone['Limited'];
    output += '&nbsp;<span class="good">Exp: </span>' + exp;
    document.getElementById('manual_gained').innerHTML = output;
	document.getElementById('jobdone_log').innerHTML = output2;
    document.getElementById('looted_log').innerHTML = combinedloot;
	retries = 0;
    return false;
  }

	//keep track of the loot gained
	var WeaponsDepot = ['Forge','Arc Welder','Buzzsaw','Gunpowder','Gun Drill','Sonic Emitter','Weapon Part','Grapple','Boomerang','Railgun Barrel','Laser Rangefinder','Explosive Arrow','Portable Fusion Reactor'];
	var ChopShop = ['Cement Block','Power Tool','Car Lift','Acetylene Torch','Shipping Container','Car Part','High Tech Car Part','Cuban Car Part','Thai Car Part','Russian Car Part','Solar Panel','Bulletproof Glass'];
	var WeaponsDepotCount = 0;
	var ChopShopCount = 0;
	var loots=new Array();
	function add_loot(s, c) {
		if (WeaponsDepot.indexOf(s) > -1) {
			s = '<span class="more_in">(WD)</span> '+s;
			WeaponsDepotCount++;
		}
		if (ChopShop.indexOf(s) > -1) {
			s = '<span class="more_in">(CS)</span> '+s;
			ChopShopCount++;
		}
		var f = -1;
		for (var i = 0; i < loots.length && f == -1; ++i) {
			if (loots[i][0] == s) {
				f = i;
			}
		}
		if (c == null || c == undefined) c = 1;
		if (f != -1) {
			loots[f][1] += c;
		}
		else {
			loots[loots.length] = new Array(s, c);
		}
		var t = '';
		loots.sort();
		for (var i = 0; i < loots.length; ++i) {
			t += '<span class="good">' + loots[i][1] + 'x</span> ' + loots[i][0] + '<br />';
		}
		combinedloot = t;
		//lootcount++;
		return false;
	}
  //add thousand comma

  function commas(s) {
    while (d = /(\d+)(\d{3}.*)/.exec(s)) {
      s = d[1] + ',' + d[2];
    }
    return s;
  }
  //random value for delay
  function myRandom(min, max) {
    return min + Math.floor(Math.round((Math.random() * (max - min))));
  }
  // deliberate pause from Vern's toolkit.js, http://vern.com/mwtools/
  // given a number of seconds, an optional message and a resume
  // function, will pause a few seconds and then execute the function
	

	
	function unix_timestamp() {
		return parseInt(new Date().getTime().toString().substring(0, 10))+'';
	}
	
  function pausing(seconds, message, resume_func) {
    // if the message was left out, shuffle things a bit
    if (typeof(message) == 'function') {
      resume_func = message;
      message = null;
    }
    
    if (message) message = message;
    else message = 'Pausing';
    msg(message + ' <span id="seconds">' + seconds + ' second' + (seconds == 1 ? '' : 's') + '</span>...');
    //var me = this;
    var timer = setInterval(function () { //)
      seconds--;
      if (document.getElementById('seconds')) document.getElementById('seconds').innerHTML = seconds + ' second' + (seconds == 1 ? '' : 's');
      else clearInterval(timer);
      if (seconds <= 0) {
        clearInterval(timer);
        if (typeof(resume_func) == 'function') resume_func();
      }
    },
    1000);
  }

  //testing to add analytics

    // var _gaq = _gaq || [];
  // _gaq.push(['_setAccount', 'UA-8435065-3']);
  // _gaq.push(['_trackPageview']);
  // _gaq.push(['_trackPageview("/script/StreamHelper")']);

  // (function() {
    // var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    // ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    // var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  // })();

  
  function loadContent(file) {
    var head = document.getElementsByTagName('head').item(0)
    var scriptTag = document.getElementById('loadScript');
    if (scriptTag) head.removeChild(scriptTag);
    script = document.createElement('script');
    script.src = file;
    script.type = 'text/javascript';
    script.id = 'loadScript';
    head.appendChild(script);
  }
  loadContent('http://www.google-analytics.com/ga.js');
  try {
    var pageTracker = _gat._getTracker("UA-8435065-3");
    pageTracker._trackPageview();
    pageTracker._trackPageview("/script/StreamHelper");
  } catch(err) {}
  //end analytics
}())

