// ==UserScript==
// @name           Astro Empires Free Extension
// @namespace      aefe
// @description    Extension to Empire Display for Free Accounts
// @include        http://*.astroempires.com/empire.aspx*
// @include        http://*.astroempires.com/base.aspx*
// @include        http://*.astroempires.com/fleet.aspx*
// @compatability  Firefox 3.5+
// @date           08/28/2010
// @author         Dave Clark Consulting
// @homepage       http://www.daveclarkconsulting.com/
// ==/UserScript==

// NOTE:	This script does not use any of the GreaseMonkey API's.

/*
	This script adds four working buttons to the Empire display to replace
	the four supplied non-working buttons, which are intended only for
	Premium (i.e., paying) Accounts.  These four new buttons will give the
	Free Account the ability to display empire-wide Capacities, Structures,
	Defenses, and Fleets -- each of which include all bases (or fleets) in
	just the one display.  Premium Accounts will not be affected.

	This script's operation responds to the clicked button through a real-
	time extraction process which requires automatically navigating through
	every one of the user's bases/fleets to obtain the required information.
	Thus, patience is required while this information is extracted and sum-
	marized for your perusal.  The resulting display will contain clickable
	links back to the original resource page from which it was obtained.

	Once built, to save time, the information is not re-extracted each time
	the display is requested during the same browser session.  Thus, the
	information can easily become stale.  Two ways this information will
	get refreshed is (1) the first time it is requested after a new browser
	session is started or (2) you click on the "Refresh" link provided in
	the footer of these new displays.
*/

var	aefeScriptName = 'aefe';

/* ------------------------------------------------------------ */
/* USER OBJECTS                                                 */
/* ------------------------------------------------------------ */

var	aefeGlobal = {},
	aefeScript = {};

/* ------------------------------------------------------------ */
/* PROTOTYPES                                                   */
/* ------------------------------------------------------------ */

String.prototype.contains = function(str)		// boolean test to see of object string contains argument
{
	return this.toString().indexOf(str.toString()) < 0 ? false : true;
};

String.prototype.isEmpty = function()		// boolean test for empty string (or only white space)
{
	return /^\s*$/.test(this.toString());
};

String.prototype.left = function(len)		// return specified number of left chars from string
{
	if (typeof len !== "number" || len < 1) len = 1;	// default = 1
	else len = Math.floor(len);
	return this.substr(0, len)
};

String.prototype.parsePairs = function ()		// parse delimited string of name/value pairs
{
	if (this.length == 0) return null;			// return null for zero-length string
	var p_delim = (arguments[0]) ? arguments[0] : '&';	// set default pair delimiter
	var n_delim = (arguments[1]) ? arguments[1] : '=';	// set default name delimiter
	var items = this.split(p_delim);			// split argument string into an array
	var x, len = items.length;				// get number of name/value pairs
	for (x=0; x<len; ++x)					// loop on name/value pairs
	{
		items[x] = items[x].split(n_delim);			// split them and re-add to array
		items[x][0] = unescape(items[x][0].replace(/\+/g,' ')).trimEnds(); // massage and trim name value
		items[x][1] = (items[x][1]) ? unescape(items[x][1].replace(/\+/g,' ')).trimEnds() : ""; // massage and trim data value
		if (items[x][0].length > 0) {				// add hash entry, also
			if (typeof items[items[x][0]] === 'undefined') {
				items[items[x][0]] = items[x][1];
			} else {						// use array for duplicate hash entries
				if (typeof items[items[x][0]] !== 'object') {
					items[items[x][0]] = new Array(items[items[x][0]]);
				}
				items[items[x][0]].push(items[x][1]);
			}
		}
	}								// end loop
	return items;
};

String.prototype.right = function(len)		// return specified number of right chars from string
{
	if (typeof len !== "number" || len < 1) len = 1;	// default = 1
	else len = Math.floor(len);
	return this.substr(this.length - len)
};

String.prototype.tagged = function()		// prepend object string with script name tag
{
	return aefeScript.name + ':: ' + this.toString();
};

Number.prototype.toCommaFormat = function()	// format numeric string with commas
{
	var str = (this) ? this.toString() : '0';
	var re = new RegExp('(-?[0-9]+)([0-9]{3})');
	while (re.test(str))
	{
		str = str.replace(re, '$1,$2');
	}
	return str;
};
String.prototype.toCommaFormat = Number.prototype.toCommaFormat;

String.prototype.toNumber = function()		// convert numeric-formatted string into a number result
{
	var nbr = Number((this.toString()).replace(/[\$,]/g,""));
	return ((isNaN(nbr)) ? 0 : nbr);
};

String.prototype.trimEnds = function ()		// trim white-space off both ends of object string
{
	return this.replace(/(^\s+)|(\s+$)/g, '');
};

/* ------------------------------------------------------------ */
/* Define global elements                                       */
/* ------------------------------------------------------------ */

aefeGlobal = {

	log: function (text)
	{
		if (console.log !== undefined)
		{
			if (arguments.length > 1)
			{
				console.log(text.tagged(), Array.prototype.slice.call(arguments, 1));
			}
			else
			{
				console.log(text.tagged());
			}
		}
	},

	warn: function (text)
	{
		if (console.warn !== undefined)
		{
			if (arguments.length > 1)
			{
				console.warn(text.tagged(), Array.prototype.slice.call(arguments, 1));
			}
			else
			{
				console.warn(text.tagged());
			}
		}
		else
		{
			if (arguments.length > 1)
			{
				this.log(text, Array.prototype.slice.call(arguments, 1));
			}
			else
			{
				this.log(text);
			}
		}
	},

	error: function (text)
	{
		if (console.error !== undefined)
		{
			if (arguments.length > 1)
			{
				console.error(text.tagged(), Array.prototype.slice.call(arguments, 1));
			}
			else
			{
				console.error(text.tagged());
			}
		}
		else
		{
			if (arguments.length > 1)
			{
				this.log(text, Array.prototype.slice.call(arguments, 1));
			}
			else
			{
				this.log(text);
			}
		}
	},

	getElementsByNodeName: function (obj, name)
	{
		var ele, ary = [];
		for each(ele in obj.childNodes)
		{
			if (ele.nodeName == name)
			{
				ary[ary.length] = ele;
			}
		}
		return ary;
	},

	getSessionValue: function (key)
	{
		var value;
		if ((value = window.sessionStorage.getItem(key))
		|| typeof arguments[1] !== "undefined")
		{
			if (!value)
			{
				value = aefeGlobal.setSessionValue(key, arguments[1]);
			}
			return JSON.parse(value);
		}
		throw new Error("'"+key+"' is not defined in session storage.");
		return null;
	},

	removeAllChildNodes: function (obj)
	{
		while (obj.firstChild) 
		{
		    obj.removeChild(obj.firstChild);
		}
	},

	removeSessionKey: function (key)
	{
		window.sessionStorage.removeItem(key);
	},

	setSessionValue: function (key)
	{
		var value = (typeof arguments[1] === "undefined") ? '""' : JSON.stringify(arguments[1]);
		window.sessionStorage.setItem(key, value);
		return value;
	}

};

/* ------------------------------------------------------------ */
/* Define script elements                                       */
/* ------------------------------------------------------------ */

aefeScript = {

	name:		aefeScriptName,

	delay:	500,

	url:	{
			bases:	"/base.aspx",
			fleets:	"/fleet.aspx",
			fleetss:	"/fleet.aspx?fleet=",
			capacities:	"/base.aspx?base=",
			structures:	"/base.aspx?view=structures&base=",
			defenses:	"/base.aspx?view=defenses&base=",
			economy:	"/empire.aspx?view=economy",
			empire:	"/empire.aspx"
		},

	capacity_labels:
		[
			["AstroType",		"Typ",	1,	"Astro Type"],
			["Terrain",			"Ter",	3,	"Astro Terrain"],
			["BaseArea",		"A",		0,	"Area Availability"],
			["BaseEnergy",		"S",		0,	"Solar Availability"],
			["BaseFertility",		"F",		0,	"Astro Fertility"],
			["BaseMetal",		"M",		0,	"Metal Resource Density"],
			["BaseGas",			"G",		0,	"Gas Resource Density"],
			["BaseCrystal",		"C",		0,	"Crystal Resource Density"],
			["Construction",		"Con",	0,	"Construction Capacity in credits/hour"],
			["Production",		"Pro",	0,	"Production Capacity in credits/hour"],
			["Research",		"Res",	0,	"Research Capacity in credits/hour"],
			["UsedArea",		"Area",	0,	"Base Area Used vs. Maximum"],
			["UsedEnergy",		"Ener",	0,	"Base Energy Used vs. Maximum"],
			["Population",		"Popu",	0,	"Urban Population Used vs. Maximum"],
			["TradeRoutes",		"Trade",	0,	"Trade Routes Used vs. Maximum"],
			["Economy",			"Econ",	0,	"Base Economy Collected vs. Generated"],
			["Occupied",		"Occ",	"Y",	"Is Base Occupied by an Enemy?"]
		],

	structure_labels:
		[
			["UrbanStructures",	"US",		0,	"Urban Structures"],
			["SolarPlants",		"SP",		0,	"Solar Plants"],
			["GasPlants",		"GP",		0,	"Gas Plants"],
			["FusionPlants",		"FP",		0,	"Fusion Plants"],
			["AntimatterPlants",	"AP",		0,	"Antimatter Plants"],
			["ResearchLabs",		"RL",		0,	"Research Labs"],
			["MetalRefineries",	"MR",		0,	"Metal Refineries"],
			["CrystalMines",		"CM",		0,	"Crystal Mines"],
			["RoboticFactories",	"RF",		0,	"Robotic Factories"],
			["Shipyards",		"SH",		0,	"Shipyards"],
			["OrbitalShipyards",	"OS",		0,	"Orbital Shipyards"],
			["Spaceports",		"SP",		0,	"Spaceports"],
			["CommandCenters",	"CC",		0,	"Command Centers"],
			["NaniteFactories",	"NF",		0,	"Nanite Factories"],
			["AndroidFactories",	"AF",		0,	"Android Factories"],
			["EconomicCenters",	"EC",		0,	"Economic Centers"],
			["Terraform",		"TF",		0,	"Terraform"],
			["MultiLevelPlatforms",	"MP",		0,	"Multi-Level Platforms"],
			["OrbitalBase",		"OB",		0,	"Orbital Base"],
			["JumpGate",		"JG",		0,	"Jump Gate"],
			["BiosphereModification","BM",	0,	"Biosphere Modification"],
			["Capital",			"CA",		0,	"Capital"]
		],

	defense_labels:
		[
			["Barracks",		"Barrack",	0,	"Barracks"],
			["LaserTurrets",		"Laser",	0,	"Laser Turrets"],
			["MissileTurrets",	"Missile",	0,	"Missile Turrets"],
			["PlasmaTurrets",		"Plasma",	0,	"Plasma Turrets"],
			["IonTurrets",		"Ion",	0,	"Ion Turrets"],
			["PhotonTurrets",		"Photon",	0,	"Photon Turrets"],
			["DisruptorTurrets",	"Disrup.",	0,	"Disruptor Turrets"],
			["DeflectionShields",	"DeflSh",	0,	"Deflection Shields"],
			["PlanetaryShield",	"PlShld",	0,	"Planetary Shield"],
			["PlanetaryRing",		"PlRing",	0,	"Planetary Ring"]
		],

	fleet_labels:
		[
			["FleetWeight",		"Weight",	0,	"Fleet Weight in Battle"],
			["Fighters",		"Fi",		0,	"Fighters"],
			["Bombers",			"Bo",		0,	"Bombers"],
			["HeavyBombers",		"HB",		0,	"Heavy Bombers"],
			["IonBombers",		"IB",		0,	"Ion Bombers"],
			["Corvette",		"Co",		0,	"Corvette"],
			["Recycler",		"Re",		0,	"Recycler"],
			["Destroyer",		"De",		0,	"Destroyer"],
			["Frigate",			"Fr",		0,	"Frigate"],
			["IonFrigate",		"IF",		0,	"Ion Frigate"],
			["ScoutShip",		"SS",		0,	"Scout Ship"],
			["OutpostShip",		"OS",		0,	"Outpost Ship"],
			["Cruiser",			"Cr",		0,	"Cruiser"],
			["Carrier",			"Ca",		0,	"Carrier"],
			["HeavyCruiser",		"HC",		0,	"Heavy Cruiser"],
			["Battleship",		"Ba",		0,	"Battleship"],
			["FleetCarrier",		"FC",		0,	"Fleet Carrier"],
			["Dreadnought",		"Dr",		0,	"Dreadnought"],
			["Titan",			"Ti",		0,	"Titan"],
			["Leviathan",		"Le",		0,	"Leviathan"],
			["DeathStar",		"DS",		0,	"Death Star"]
		],

	init: function ()
	{
		if (!window.sessionStorage)
		{
			throw new Error("Browser does not support the sessionStorage object.");
		}
		try
		{
			if (top.location.pathname === aefeScript.url["empire"])
			{
				window.setTimeout(aefeScript.modifyButtons, aefeScript.delay);
			}

			aefeScript.processDataCollection();
		}
		catch (err)
		{
			aefeGlobal.error("Failure during init() processing.", err);
		}
		return true;
	},

	processDataCollection: function ()
	{
		try
		{
			aefeScript.setupSessionStorage();
			var stage = aefeGlobal.getSessionValue("stage", 0);
			var inprocess = aefeGlobal.getSessionValue("inprocess", "");
			if (inprocess)
			{
				switch (top.location.pathname)
				{
					case aefeScript.url["bases"]:
						switch (stage)
						{
							case 1:
								window.setTimeout(
									function() { aefeScript.basesStage1Collection(inprocess, stage); },
									aefeScript.delay);
								break;
							case 2:
								window.setTimeout(
									function() { aefeScript.basesStage2Collection(inprocess, stage); },
									aefeScript.delay);
								break;
							default:
						}
						break;

					case aefeScript.url["fleets"]:
						switch (stage)
						{
							case 1:
								window.setTimeout(
									function() { aefeScript.fleetsStage1Collection(inprocess, stage); },
									aefeScript.delay);
								break;
							case 2:
								window.setTimeout(
									function() { aefeScript.fleetsStage2Collection(inprocess, stage); },
									aefeScript.delay);
								break;
							default:
						}
						break;

					case aefeScript.url["empire"]:
						switch (inprocess)
						{
							case "fleetss":
								window.setTimeout(
									function() { aefeScript.outputFleetSummary(); },
									aefeScript.delay);
								break;
							case "defenses":
								window.setTimeout(
									function() { aefeScript.outputDefenseSummary(); },
									aefeScript.delay);
								break;
							case "structures":
								window.setTimeout(
									function() { aefeScript.outputStructureSummary(); },
									aefeScript.delay);
								break;
							default:
								window.setTimeout(
									function() { aefeScript.outputCapacitySummary(); },
									aefeScript.delay);
						}
						aefeGlobal.setSessionValue("inprocess", "");
						aefeGlobal.setSessionValue("stage", 0);
						break;

					default:
				}
			}
		}
		catch (err)
		{
			aefeGlobal.error("Failure during processDataCollection() processing.", err);
		}
	},

	setupSessionStorage: function ()
	{
		try
		{
			var myName = aefeGlobal.getSessionValue("name", "");
			if (!myName
			|| myName !== aefeScript.name)
			{
				aefeGlobal.setSessionValue("name", aefeScript.name);
				aefeGlobal.setSessionValue("inprocess", "");
				aefeGlobal.setSessionValue("stage", 0);
				aefeGlobal.setSessionValue("bases", "");
				aefeGlobal.setSessionValue("basecnt", -1);
				aefeGlobal.setSessionValue("fleets", "");
				aefeGlobal.setSessionValue("fleetcnt", -1);
			}
		}
		catch (err)
		{
			aefeGlobal.error("Failure during setupSessionStorage() processing.", err);
		}
	},

	basesStage1Collection: function (inprocess, stage)
	{
		var bases, baseno, basecnt;
		try
		{
			aefeGlobal.setSessionValue("bases", bases = aefeScript.extractBaseList());
			aefeGlobal.setSessionValue("baseno", baseno = 0);
			basecnt = aefeGlobal.getSessionValue("basecnt", 0);
			if (basecnt == bases.length)
			{
				aefeGlobal.removeSessionKey(inprocess);
			}
			else
			{
				aefeGlobal.removeSessionKey("capacities");
				aefeGlobal.removeSessionKey("structures");
				aefeGlobal.removeSessionKey("defenses");
				aefeGlobal.setSessionValue("basecnt", basecnt = bases.length);
			}
			if (basecnt == 0)
			{
				aefeGlobal.setSessionValue("stage", 3);
				top.location.replace(aefeScript.url["economy"]);
			}
			else
			{
				aefeGlobal.setSessionValue("stage", ++stage);
				top.location.replace(aefeScript.url[inprocess] + bases[baseno][1]);
			}
		}
		catch (err)
		{
			aefeGlobal.error("Failure during basesStage1Collection() processing.", err);
		}
	},

	basesStage2Collection: function (inprocess, stage)
	{
		try
		{
			var bases = aefeGlobal.getSessionValue("bases", "");
			var baseno = aefeGlobal.getSessionValue("baseno", 0);
			var basecnt = aefeGlobal.getSessionValue("basecnt", 0);
			var infoArray = aefeGlobal.getSessionValue(inprocess, []);
			switch (inprocess)
			{
				case "defenses":
					infoArray[infoArray.length] = aefeScript.extractDefenseInfo();
					break;
				case "structures":
					infoArray[infoArray.length] = aefeScript.extractStructureInfo();
					break;
				default:
					infoArray[infoArray.length] = aefeScript.extractCapacityInfo();
			}
			aefeGlobal.setSessionValue(inprocess, infoArray);
			aefeGlobal.setSessionValue("baseno", ++baseno);
			if (baseno < basecnt)
			{
				top.location.replace(aefeScript.url[inprocess] + bases[baseno][1]);
			}
			else
			{
				aefeGlobal.setSessionValue("stage", ++stage);
				top.location.replace(aefeScript.url["economy"]);
			}
		}
		catch (err)
		{
			aefeGlobal.error("Failure during basesStage2Collection() processing.", err);
		}
	},

	fleetsStage1Collection: function (inprocess, stage)
	{
		var fleets, fleetno, fleetcnt;
		try
		{
			aefeGlobal.setSessionValue("fleets", fleets = aefeScript.extractFleetList());
			aefeGlobal.setSessionValue("fleetno", fleetno = 0);
			fleetcnt = aefeGlobal.getSessionValue("fleetcnt", 0);
			if (fleetcnt != fleets.length)
			{
				aefeGlobal.setSessionValue("fleetcnt", fleetcnt = fleets.length);
			}
			aefeGlobal.removeSessionKey(inprocess);
			if (fleetcnt == 0)
			{
				aefeGlobal.setSessionValue("stage", 3);
				top.location.replace(aefeScript.url["economy"]);
			}
			else
			{
				aefeGlobal.setSessionValue("stage", ++stage);
				top.location.replace(aefeScript.url[inprocess] + fleets[fleetno][1]);
			}
		}
		catch (err)
		{
			aefeGlobal.error("Failure during fleetsStage1Collection() processing.", err);
		}
	},

	fleetsStage2Collection: function (inprocess, stage)
	{
		try
		{
			var fleets = aefeGlobal.getSessionValue("fleets", "");
			var fleetno = aefeGlobal.getSessionValue("fleetno", 0);
			var fleetcnt = aefeGlobal.getSessionValue("fleetcnt", 0);
			var infoArray = aefeGlobal.getSessionValue(inprocess, []);
			infoArray[infoArray.length] = aefeScript.extractFleetInfo();
			aefeGlobal.setSessionValue(inprocess, infoArray);
			aefeGlobal.setSessionValue("fleetno", ++fleetno);
			if (fleetno < fleetcnt)
			{
				top.location.replace(aefeScript.url[inprocess] + fleets[fleetno][1]);
			}
			else
			{
				aefeGlobal.setSessionValue("stage", ++stage);
				top.location.replace(aefeScript.url["economy"]);
			}
		}
		catch (err)
		{
			aefeGlobal.error("Failure during fleetsStage2Collection() processing.", err);
		}
	},

	extractBaseList: function ()
	{
		var bases = new Array();
		var tbl = document.getElementById("bases_list").getElementsByTagName("TABLE")[3];
		var lnk, ary, r, rc = tbl.rows.length;
		for (r=1; r<rc; ++r)
		{
			lnk = tbl.rows[r].cells[0].firstChild;
			ary = lnk.href.split("?")[1].parsePairs();
			bases[bases.length] = [lnk.firstChild.data, ary["base"]];
		}
		return bases;
	},

	extractFleetList: function ()
	{
		var fleets = new Array();
		var tbl = document.getElementById("fleets-list").getElementsByTagName("TABLE")[3];
		var lnk, ary, r, rc = tbl.rows.length;
		for (r=1; r<rc; ++r)
		{
			lnk = tbl.rows[r].cells[0].firstChild;
			ary = lnk.href.split("?")[1].parsePairs();
			fleets[fleets.length] = [lnk.firstChild.data, ary["fleet"]];
		}
		return fleets;
	},

	extractCapacityInfo: function ()
	{
		var obj, ele, summary = {};

		obj = document.getElementById("astro_specs");
		ele = aefeGlobal.getElementsByNodeName(obj, "#text");
		summary.AstroType		= ele[0].data.trimEnds();
		summary.Terrain		= ele[1].data.trimEnds();
		summary.BaseArea		= Number(ele[2].data);
		summary.BaseEnergy	= Number(ele[3].data);
		summary.BaseFertility	= Number(ele[4].data);

		obj = document.getElementById("base_resources");
		obj = obj.rows[1].cells[0].getElementsByTagName("TABLE")[0];
		obj = obj.rows[0].cells[1].getElementsByTagName("TABLE")[0];
		summary.BaseMetal		= Number(obj.rows[0].cells[1].firstChild.data);
		summary.BaseGas		= Number(obj.rows[1].cells[1].firstChild.data);
		summary.BaseCrystal	= Number(obj.rows[2].cells[1].firstChild.data);

		obj = document.getElementById("local-header_content");
		obj = obj.getElementsByTagName("TABLE")[0];
		ele = obj.rows[1].cells[4].getElementsByTagName("DIV")[0];
		summary.UsedArea		= ele.firstChild.data;
		ele = obj.rows[1].cells[6].getElementsByTagName("DIV")[0];
		summary.UsedEnergy	= ele.firstChild.data;
		ele = obj.rows[1].cells[8].getElementsByTagName("DIV")[0];
		summary.Population	= ele.firstChild.data;
		ele = obj.rows[1].cells[10].getElementsByTagName("DIV")[0];
		summary.TradeRoutes	= ele.firstChild.data;

		obj = document.getElementById("base_processing-capacities");
		obj = obj.rows[1].cells[0].getElementsByTagName("TABLE")[0];
		obj = obj.rows[0].cells[1].getElementsByTagName("TABLE")[0];
		summary.Construction	= Number(obj.rows[0].cells[1].firstChild.data);
		summary.Production	= Number(obj.rows[1].cells[1].firstChild.data);
		summary.Research		= Number(obj.rows[2].cells[1].firstChild.data);
		summary.Economy		= obj.rows[5].cells[1].firstChild.data;
		summary.Economy		+= "/" + obj.rows[4].cells[1].firstChild.data;
		summary.Occupied		= "";
		if ((ele = obj.rows[8].cells[1].firstChild))
		{
			summary.Occupied	= ele.data;
		}

		return summary;
	},

	extractStructureInfo: function ()
	{
		var obj, ele, x, len, lbl, grp, txt, summary = {};

		obj = document.getElementById("base_structures");
		obj = obj.rows[1].cells[0].getElementsByTagName("TABLE")[0];
		obj = obj.rows[0].cells[1].getElementsByTagName("TABLE")[0];
		len = obj.rows.length;
		for (x=1; x<len; x=x+2)
		{
			ele = obj.rows[x].cells[1].getElementsByTagName("A")[0];
			for each(lbl in aefeScript.structure_labels)
			{
				if (ele.firstChild.data == lbl[3])
				{
					grp = aefeGlobal.getElementsByNodeName(obj.rows[x].cells[1], "#text");
					if (grp.length > 0)
					{
						for each(txt in grp)
						{
							if (txt.data.contains("Level"))
							{
								summary[lbl[0]] = parseInt(txt.data.split(" ")[2]);
							}
						}
					}
					break;
				}
			}
		}

		return summary;
	},

	extractDefenseInfo: function ()
	{
		var obj, ele, x, len, lbl, grp, txt, summary = {};

		obj = document.getElementById("base_defenses");
		obj = obj.rows[1].cells[0].getElementsByTagName("TABLE")[0];
		obj = obj.rows[0].cells[1].getElementsByTagName("TABLE")[0];
		len = obj.rows.length;
		for (x=1; x<len; x=x+2)
		{
			ele = obj.rows[x].cells[1].getElementsByTagName("A")[0];
			for each(lbl in aefeScript.defense_labels)
			{
				if (ele.firstChild.data == lbl[3])
				{
					grp = aefeGlobal.getElementsByNodeName(obj.rows[x].cells[1], "#text");
					if (grp.length > 0)
					{
						for each(txt in grp)
						{
							if (txt.data.contains("Level"))
							{
								summary[lbl[0]] = parseInt(txt.data.split(" ")[2]);
							}
						}
					}
					break;
				}
			}
		}

		return summary;
	},

	extractFleetInfo: function ()
	{
		var obj, ele, x, len, lbl, grp, txt, summary = {};

		obj = document.getElementById("fleet_overview");
		obj = obj.rows[1].cells[0].getElementsByTagName("TABLE")[0];
		obj = obj.rows[0].cells[1].getElementsByTagName("TABLE")[0];
		len = obj.rows.length;
		for (x=1; x<len; ++x)
		{
			if ((ele = obj.rows[x].cells[0].getElementsByTagName("B")[0]))
			{
				for each(lbl in aefeScript.fleet_labels)
				{
					if (ele.firstChild.data == lbl[3])
					{
						summary[lbl[0]] = obj.rows[x].cells[1].firstChild.data.toNumber();
						break;
					}
				}
			}
			else break;
		}
		ele = obj.rows[len-1].cells[0].getElementsByTagName("SMALL")[0];
		summary["FleetWeight"] = ele.firstChild.data.split(" ")[2];

		return summary;
	},

	setDisplayTitle: function (title)
	{
		var ele, obj = document.getElementById("empire_economy_bases");

		ele = obj.rows[0].cells[0].getElementsByTagName("TABLE")[0];
		ele = ele.rows[0].cells[1].getElementsByTagName("TABLE")[0];
		ele.rows[0].cells[1].firstChild.data = title;

		obj = obj.rows[1].cells[0].getElementsByTagName("TABLE")[0];
		obj = obj.rows[0].cells[1].getElementsByTagName("TABLE")[0];
		obj.className = "layout listing";

		return obj;
	},

	outputCapacitySummary: function ()
	{
		var lbl, x, len, row, link, child, value;
		var bases = aefeGlobal.getSessionValue("bases", []);
		var summary = aefeGlobal.getSessionValue("capacities", []);
		aefeScript.changeLink2Normal("economy");
		aefeScript.changeLink2Normal("scanners");
		aefeScript.changeLink2Active("bases_capacities");
		aefeScript.changeLink2Normal("structures");
		aefeScript.changeLink2Normal("fleets");

		var ele, tbl = aefeScript.setDisplayTitle("Capacity Summary");

		ele = tbl.tHead;
		ele.firstChild.className = "listing-header";
		aefeGlobal.removeAllChildNodes(ele.firstChild);
		child = document.createElement("TH");
		child.appendChild(document.createTextNode("Base Name"));
		ele.firstChild.appendChild(child);
		for each(lbl in aefeScript.capacity_labels)
		{
			child = document.createElement("TH");
			child.setAttribute("title", lbl[3]);
			child.appendChild(document.createTextNode(lbl[1]));
			ele.firstChild.appendChild(child);
		}

		ele = tbl.tBodies[0];
		aefeGlobal.removeAllChildNodes(ele);
		len = bases.length;
		for (x=0; x<len; ++x)
		{
			row = document.createElement("TR");
			row.setAttribute("align", "center");
			child = document.createElement("TD");
			link = document.createElement("A");
			link.setAttribute("href", aefeScript.url["capacities"]+bases[x][1]);
			link.appendChild(document.createTextNode(bases[x][0]));
			child.appendChild(link);
			row.appendChild(child);
			for each(lbl in aefeScript.capacity_labels)
			{
				child = document.createElement("TD");
				child.setAttribute("title", lbl[3]);
				value = (summary[x][lbl[0]]) ? summary[x][lbl[0]] : " ";
				if (lbl[2] == "Y")
				{
					value = (value.isEmpty()) ? " " : lbl[2];
				}
				else if (lbl[2] > 0)
				{
					value = value.left(lbl[2]);
				}
				child.appendChild(document.createTextNode(value));
				row.appendChild(child);
			}
			ele.appendChild(row);
		}

		aefeScript.addRefreshLink("capacities", "Rebuild base capacity summary.");
		return true;
	},

	outputStructureSummary: function ()
	{
		var lbl, x, len, row, link, child, value;
		var bases = aefeGlobal.getSessionValue("bases", []);
		var summary = aefeGlobal.getSessionValue("structures", []);
		aefeScript.changeLink2Normal("economy");
		aefeScript.changeLink2Normal("scanners");
		aefeScript.changeLink2Normal("bases_capacities");
		aefeScript.changeLink2Active("structures");
		aefeScript.changeLink2Normal("fleets");

		var ele, tbl = aefeScript.setDisplayTitle("Structure Summary");

		ele = tbl.tHead;
		ele.firstChild.className = "listing-header";
		aefeGlobal.removeAllChildNodes(ele.firstChild);
		child = document.createElement("TH");
		child.appendChild(document.createTextNode("Base Name"));
		ele.firstChild.appendChild(child);
		for each(lbl in aefeScript.structure_labels)
		{
			child = document.createElement("TH");
			child.setAttribute("title", lbl[3]);
			child.appendChild(document.createTextNode(lbl[1]));
			ele.firstChild.appendChild(child);
		}

		ele = tbl.tBodies[0];
		aefeGlobal.removeAllChildNodes(ele);
		len = bases.length;
		for (x=0; x<len; ++x)
		{
			row = document.createElement("TR");
			row.setAttribute("align", "center");
			child = document.createElement("TD");
			link = document.createElement("A");
			link.setAttribute("href", aefeScript.url["structures"]+bases[x][1]);
			link.appendChild(document.createTextNode(bases[x][0]));
			child.appendChild(link);
			row.appendChild(child);
			for each(lbl in aefeScript.structure_labels)
			{
				child = document.createElement("TD");
				child.setAttribute("title", lbl[3]);
				value = (summary[x][lbl[0]]) ? summary[x][lbl[0]] : " ";
				if (lbl[2] == "Y")
				{
					value = (value.isEmpty()) ? " " : lbl[2];
				}
				else if (lbl[2] > 0)
				{
					value = value.left(lbl[2]);
				}
				child.appendChild(document.createTextNode(value));
				row.appendChild(child);
			}
			ele.appendChild(row);
		}

		aefeScript.addRefreshLink("structures", "Rebuild base structure summary.");
		return true;
	},

	outputDefenseSummary: function ()
	{
		var lbl, x, len, row, link, child, value;
		var bases = aefeGlobal.getSessionValue("bases", []);
		var summary = aefeGlobal.getSessionValue("defenses", []);
		aefeScript.changeLink2Normal("economy");
		aefeScript.changeLink2Active("scanners");
		aefeScript.changeLink2Normal("bases_capacities");
		aefeScript.changeLink2Normal("structures");
		aefeScript.changeLink2Normal("fleets");

		var ele, tbl = aefeScript.setDisplayTitle("Defense Summary");

		ele = tbl.tHead;
		ele.firstChild.className = "listing-header";
		aefeGlobal.removeAllChildNodes(ele.firstChild);
		child = document.createElement("TH");
		child.appendChild(document.createTextNode("Base Name"));
		ele.firstChild.appendChild(child);
		for each(lbl in aefeScript.defense_labels)
		{
			child = document.createElement("TH");
			child.setAttribute("title", lbl[3]);
			child.appendChild(document.createTextNode(lbl[1]));
			ele.firstChild.appendChild(child);
		}

		ele = tbl.tBodies[0];
		aefeGlobal.removeAllChildNodes(ele);
		len = bases.length;
		for (x=0; x<len; ++x)
		{
			row = document.createElement("TR");
			row.setAttribute("align", "center");
			child = document.createElement("TD");
			link = document.createElement("A");
			link.setAttribute("href", aefeScript.url["defenses"]+bases[x][1]);
			link.appendChild(document.createTextNode(bases[x][0]));
			child.appendChild(link);
			row.appendChild(child);
			for each(lbl in aefeScript.defense_labels)
			{
				child = document.createElement("TD");
				child.setAttribute("title", lbl[3]);
				value = (summary[x][lbl[0]]) ? summary[x][lbl[0]] : " ";
				if (lbl[2] == "Y")
				{
					value = (value.isEmpty()) ? " " : lbl[2];
				}
				else if (lbl[2] > 0)
				{
					value = value.left(lbl[2]);
				}
				child.appendChild(document.createTextNode(value));
				row.appendChild(child);
			}
			ele.appendChild(row);
		}

		aefeScript.addRefreshLink("defenses", "Rebuild base defense summary.");
		return true;
	},

	outputFleetSummary: function ()
	{
		var lbl, x, len, row, link, child, value;
		var fleets = aefeGlobal.getSessionValue("fleets", []);
		var summary = aefeGlobal.getSessionValue("fleetss", []);
		aefeScript.changeLink2Normal("economy");
		aefeScript.changeLink2Normal("scanners");
		aefeScript.changeLink2Normal("bases_capacities");
		aefeScript.changeLink2Normal("structures");
		aefeScript.changeLink2Active("fleets");

		var ele, tbl = aefeScript.setDisplayTitle("Fleet Summary");

		ele = tbl.tHead;
		ele.firstChild.className = "listing-header";
		aefeGlobal.removeAllChildNodes(ele.firstChild);
		child = document.createElement("TH");
		child.appendChild(document.createTextNode("Fleet Name"));
		ele.firstChild.appendChild(child);
		for each(lbl in aefeScript.fleet_labels)
		{
			child = document.createElement("TH");
			child.setAttribute("title", lbl[3]);
			child.appendChild(document.createTextNode(lbl[1]));
			ele.firstChild.appendChild(child);
		}

		ele = tbl.tBodies[0];
		aefeGlobal.removeAllChildNodes(ele);
		len = fleets.length;
		for (x=0; x<len; ++x)
		{
			row = document.createElement("TR");
			row.setAttribute("align", "center");
			child = document.createElement("TD");
			link = document.createElement("A");
			link.setAttribute("href", aefeScript.url["fleetss"]+fleets[x][1]);
			link.appendChild(document.createTextNode(fleets[x][0]));
			child.appendChild(link);
			row.appendChild(child);
			for each(lbl in aefeScript.fleet_labels)
			{
				child = document.createElement("TD");
				child.setAttribute("title", lbl[3]);
				value = (summary[x][lbl[0]]) ? summary[x][lbl[0]] : " ";
				if (lbl[2] == "Y")
				{
					value = (value.isEmpty()) ? " " : lbl[2];
				}
				else if (lbl[2] > 0)
				{
					value = value.left(lbl[2]);
				}
				child.appendChild(document.createTextNode(value));
				row.appendChild(child);
			}
			ele.appendChild(row);
		}

		aefeScript.addRefreshLink("fleetss", "Rebuild fleet strength summary.");
		return true;
	},

	addRefreshLink: function(inprocess, title)
	{
		var ele, obj = document.getElementById("empire_economy_bases");
		obj = obj.rows[2].cells[0].getElementsByTagName("TABLE")[0];
		obj.className = "astro-detail_box-status box-status";
		obj.rows[0].cells[0].className = "astro-detail_box-status left box-status-left";
		obj.rows[0].cells[1].className = "astro-detail_box-status center box-status-center";
		obj.rows[0].cells[2].className = "astro-detail_box-status right box-status-right";
		ele = obj.rows[0].cells[1];
		aefeGlobal.removeAllChildNodes(ele);
		var link = document.createElement("A");
		link.setAttribute("href", "javascript:void(0)");
		link.setAttribute("title", title);
		link.addEventListener("click",
			function() { return aefeScript.refreshAllSummaries(inprocess) },
			false);
		var child = document.createElement("SMALL");
		child.appendChild(document.createTextNode("Refresh"));
		link.appendChild(child);
		ele.appendChild(link);
	},

	refreshAllSummaries: function (inprocess)
	{
		if (inprocess != "fleetss")
		{
			aefeGlobal.removeSessionKey("bases");
			aefeGlobal.removeSessionKey("capacities");
			aefeGlobal.removeSessionKey("structures");
			aefeGlobal.removeSessionKey("defenses");
		}
		else
		{
			aefeGlobal.removeSessionKey("fleets");
			aefeGlobal.removeSessionKey("fleetss");
		}
		return aefeScript.beginDataCollection(inprocess);
	},

	modifyButtons: function ()
	{
		try
		{
			aefeScript.changeLink2Usable("scanners", "defenses", "Defenses");
			aefeScript.changeLink2Usable("bases_capacities", "capacities", "Capacities");
			aefeScript.changeLink2Usable("structures", "structures", "Structures");
			aefeScript.changeLink2Usable("fleets", "fleetss", "Fleets");
		}
		catch (err)
		{
			aefeGlobal.error("Failure during modifyButtons() processing.", err);
		}
	},

	changeLink2Active: function (id)
	{
		var obj = document.getElementById(id);
		obj.className = "button button-normal-active";
		obj.removeAttribute("onmouseover");
		obj.removeAttribute("onmouseout");
	},

	changeLink2Normal: function (id)
	{
		var obj = document.getElementById(id);
		obj.className = "button button-normal";
		obj.setAttribute("onmouseout", "buttonOut(this)");
		obj.setAttribute("onmouseover", "buttonOver(this, 'button button-normal-over')");
	},

	changeLink2Usable: function (id, inprocess, text)
	{
		var links, link, temp, obj = document.getElementById(id);
		if (obj.className.contains("button-premium"))
		{
			obj.className = "button button-normal";
			obj.setAttribute("onmouseover", "buttonOver(this, 'button button-normal-over')");
			links = obj.getElementsByTagName("A");
			for each(link in links)
			{
				link.setAttribute("href", "javascript:void(0)");
				link.addEventListener("click",
					function() { return aefeScript.beginDataCollection(inprocess) },
					false);
			}
			aefeGlobal.removeAllChildNodes(links[1]);
			links[1].appendChild(document.createTextNode(text));
		}
	},

	beginDataCollection: function (inprocess)
	{
		try
		{
			var group = (inprocess != "fleetss") ? "bases" : "fleets";
			var list = aefeGlobal.getSessionValue(group, "");
			aefeGlobal.setSessionValue("inprocess", inprocess);
			var summary = aefeGlobal.getSessionValue(inprocess, "");
			if (typeof list === "object" && list.length > 0
			&& typeof summary === "object" && summary.length > 0)
			{
				aefeGlobal.setSessionValue("stage", 3);
				top.location.assign(aefeScript.url["economy"]);
			}
			else
			{
				aefeGlobal.setSessionValue("stage", 1);
				top.location.assign(aefeScript.url[group]);
			}
		}
		catch (err)
		{
			aefeGlobal.error("Failure during beginDataCollection() processing.", err);
		}
		return false;
	}

};

/* ------------------------------------------------------------ */
/* Begin processing                                             */
/* ------------------------------------------------------------ */

window.addEventListener('load',
	function() { return aefeScript.init(); },
	false);

/* ------------------------------------------------------------ */
