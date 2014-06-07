// ==UserScript==
// @name           BvS_Speedloop
// @namespace      SirDuck36
// @description    Assist in all things speedlooping
// @include        http://*animecubed.com/billy/bvs*
// ==/UserScript==


////////////////////////////////////////////////////////////////////////
///////////                LIBRARY CODE                /////////////////
////////////////////////////////////////////////////////////////////////

/*
	DOM Storage wrapper class (credits: http://userscripts.org/users/dtkarlsson)
	Constructor:
		var store = new DOMStorage({"session"|"local"}, [<namespace>]);
	Set item:
		store.setItem(<key>, <value>);
	Get item:
		store.getItem(<key>[, <default value>]);
	Remove item:
		store.removeItem(<key>);
	Get all keys in namespace as array:
		var array = store.keys();
*/

function DOMStorage(type, namespace) {
	var my = this;

	if (typeof(type) != "string")
		type = "session";
	switch (type) {
		case "local": my.storage = localStorage; break;
		case "session": my.storage = sessionStorage; break;
		default: my.storage = sessionStorage;
	}

	if (!namespace || typeof(namespace) != "string")
		namespace = "Greasemonkey";

	my.ns = namespace + ".";
	my.setItem = function(key, val) {
		try {
			my.storage.setItem(escape(my.ns + key), val);
		}
		catch (e) {
			GM_log(e);
		}
	},
	my.getItem = function(key, def) {
		try {
			var val = my.storage.getItem(escape(my.ns + key));
			if (val)
				return val;
			else
				return def;
		}
		catch (e) {
			return def;
		}
	}
	// Kludge, avoid Firefox crash
	my.removeItem = function(key) {
		try {
			my.storage.setItem(escape(my.ns + key), null);
		}
		catch (e) {
			GM_log(e);
		}
	}
	// Return array of all keys in this namespace
	my.keys = function() {
		var arr = [];
		var i = 0;
		do {
			try {
				var key = unescape(my.storage.key(i));
				if (key.indexOf(my.ns) == 0 && my.storage.getItem(key))
					arr.push(key.slice(my.ns.length));
			}
			catch (e) {
				break;
			}
			i++;
		} while (true);
		return arr;
	}
}
// End DOM Storage Wrapper class

// UI (credits: http://userscripts.org/users/dtkarlsson)
function Window(id, storage)
{
	var my = this;
	my.id = id;
	my.offsetX = 0;
	my.offsetY = 0;
	my.moving = false;

	// Window dragging events
	my.drag = function(event) {
		if (my.moving) {
			my.element.style.left = (event.clientX - my.offsetX)+'px';
			my.element.style.top = (event.clientY - my.offsetY)+'px';
			event.preventDefault();
		}
	}
	my.stopDrag = function(event) {
		if (my.moving) {
			my.moving = false;
			var x = parseInt(my.element.style.left);
			var y = parseInt(my.element.style.top);
			if(x < 0) x = 0;
			if(y < 0) y = 0;
			storage.setItem(my.id + ".coord.x", x);
			storage.setItem(my.id + ".coord.y", y);
			my.element.style.opacity = 1;
			window.removeEventListener('mouseup', my.stopDrag, true);
			window.removeEventListener('mousemove', my.drag, true);
		}
	}
	my.startDrag = function(event) {
		if (event.button != 0) {
			my.moving = false;
			return;
		}
		my.offsetX = event.clientX - parseInt(my.element.style.left);
		my.offsetY = event.clientY - parseInt(my.element.style.top);
	       
                if (my.offsetY > 27)
    		    return;

		my.moving = true;
	        my.element.style.opacity = 0.75;
		event.preventDefault();
		window.addEventListener('mouseup', my.stopDrag, true);
		window.addEventListener('mousemove', my.drag, true);
	}

    my.show = function()
    {
	this.element.style.visibility = 'visible';
    }

    my.hide = function()
    {
	this.element.style.visibility = 'hidden';
    }

    my.reset = function()
    {
	storage.setItem(my.id + ".coord.x", 6);
	storage.setItem(my.id + ".coord.y", 6);
	
	my.element.style.left = "6px";
	my.element.style.top = "6px";
    }	


	my.element = document.createElement("div");
	my.element.id = id;
	document.body.appendChild(my.element);
	my.element.addEventListener('mousedown', my.startDrag, true);

	if (storage.getItem(my.id + ".coord.x"))
		my.element.style.left = storage.getItem(my.id + ".coord.x") + "px";
	else
		my.element.style.left = "6px";
	if (storage.getItem(my.id + ".coord.y"))
		my.element.style.top = storage.getItem(my.id + ".coord.y") + "px";
	else
		my.element.style.top = "6px";
}
// End UI Window implementation






////////////////////////////////////////////////////////////////////////
///////////             DATA STRUCTURES                /////////////////
////////////////////////////////////////////////////////////////////////


function speedloopData()
{
    // Save the storage object
    this.storage = new DOMStorage("local", "BvSSpeedloop");
    this.namePlayer = GetPlayerName();

    // start with first task by default
    this.taskNum = 0;

    // Array of string flags to save information... a flag is set if contained in the array
    //     Crude but simple
    this.flagStr = "|";

    // Helper function to set a flag
    this.SetFlag = function(flagtext)
    {
	if (!this.TestFlag(flagtext))
	    this.flagStr += flagtext + "|";
    }

    // Helper function to test for a flag
    this.TestFlag = function(flagtext)
    {
	if (this.flagStr.indexOf("|" + flagtext + "|") > -1)
	    return true;
	else
	    return false;
    }

    this.Save = function()
    {
	this.storage.setItem(this.namePlayer + "_SpeedTaskNum", this.taskNum);
	this.storage.setItem(this.namePlayer + "_SpeedFlags", this.flagStr );
    }

    this.Load = function()
    {
	this.taskNum = parseInt( this.storage.getItem(this.namePlayer + "_SpeedTaskNum", "0") );
	this.flagStr = this.storage.getItem(this.namePlayer + "_SpeedFlags", "|");
    }
    
    // Call the load function once by default on initialization
    this.Load();
}

// task object has a description to be shown and a function that gets called
function Task(description, taskfun)
{
    this.description = description;
    this.taskfun = taskfun;
}

// Ally object to simplify user interface
function Ally(name, code1, code2, code3)
{
    this.name = name;
    this.code1 = code1;
    this.code2 = code2;
    this.code3 = code3;
}

function Jutsu(name, code)
{
    this.name = name;
    this.code = code;
}

function Mission(name, jutsu, allyget)
{
    this.name = name;
    this.jutsu = jutsu;
    this.allyget = allyget;
}

function Quest(name, code, numsteps, flag)
{
    this.name = name;
    this.code = code;
    this.numsteps = numsteps;
    this.flag = flag;
}


////////////////////////////////////////////////////////////////////////
///////////              FLOATING WINDOWS                ///////////////
////////////////////////////////////////////////////////////////////////


function FloatingSpeedloop() 
{

    this.window = new Window("floatingSpeedloop", data.storage);
    
    // Add css style for report window
    GM_addStyle("#floatingSpeedloop {border: 2px solid #000000; position: fixed; z-index: 100; " +
		"color: #000000; background-color: #FFFFFF; padding: 5; text-align: left; " +
		"overflow-y: auto; overflow-x: auto; width: 200; height: 400; " +
		"background: none repeat scroll 0% 0% rgb(216, 216, 255);}");

    this.Draw = function()
    {
	// Helper array to build the HTML
	var arr = new Array();
	
	arr.push("SpeedLoop Helper<br><br>");
	
	arr.push("Task: " + data.taskNum + "<br>" + tasklist[data.taskNum].description + "<br><br>");

	var stamNeeded = EstimateStaminaNeeded();
	if (stamNeeded != -1)
	    arr.push("Stamina Needed: " + stamNeeded + "<br><br>");

	arr.push('<p style="margin: 0pt; text-align: right;">',
		 '<a href="javascript:void(0)" id="SpeedloopResetDataButton">',
		 'Reset Data &gt;</a></p><br>');

	arr.push('<p style="margin: 0pt; text-align: right;">',
		 '<a href="javascript:void(0)" id="SpeedloopSkipTaskButton">',
		 'Skip Task &gt;</a></p><br>');

	arr.push('<p style="margin: 0pt; text-align: right;">',
		 '<a href="javascript:void(0)" id="SpeedloopBackTaskButton">',
		 'Back Task &gt;</a></p><br>');

	arr.push('<br><br><div id="SpeedloopMsgDiv"></div>');

	arr.push("<b>Flags</b>:");
	arr.push(data.flagStr.replace(/\|/g, "<br>"));
	
	// Concatenate everything in the array to form the html
	this.window.element.innerHTML = arr.join("");

	document.getElementById("SpeedloopResetDataButton").addEventListener("click", floatingSpeedloop.ResetData, true);
	document.getElementById("SpeedloopSkipTaskButton").addEventListener("click", floatingSpeedloop.SkipTask, true);
	document.getElementById("SpeedloopBackTaskButton").addEventListener("click", floatingSpeedloop.BackTask, true);
    }

    this.showErr = function(err)
    {
	document.getElementById("SpeedloopMsgDiv").innerHTML = err.message;
    }

    this.ResetData = function()
    {
	data.taskNum = 0;
	data.flagStr = "|";
	data.Save();
	floatingSpeedloop.Draw();
    }

    this.SkipTask = function()
    {
	IncrementTask();
    }

    this.BackTask = function()
    {
	// Temporary for debugging
	data.taskNum--;
	data.Save();
	floatingSpeedloop.Draw();
    }

    // Draw the window upon initialization
}



////////////////////////////////////////////////////////////////////////
///////////          GENERAL UTILITY FUNCTIONS           ///////////////
////////////////////////////////////////////////////////////////////////

// Get the Players Name
function GetPlayerName() 
{
    return document.evaluate("//input[@name='player' and @type='hidden']", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue.value;
}

function GetLevel()
{
    return  parseInt(/>Level <b>(\d+)<\/b>:/.exec(document.body.innerHTML)[1]);
}

function GetMaxSingleLevel()
{
    var genlevel = parseInt(/Genjutsu: <font ([^>]+)><b>(\d+)<font/.exec(document.body.innerHTML)[2]);
    var ninlevel = parseInt(/Ninjutsu: <font ([^>]+)><b>(\d+)<font/.exec(document.body.innerHTML)[2]);
    var tailevel = parseInt(/Taijutsu: <font ([^>]+)><b>(\d+)<font/.exec(document.body.innerHTML)[2]);
    return Math.max(genlevel, ninlevel, tailevel);
}

function GetNumFights()
{
//    <tr><td>Battles Left today:</td><td align="right"><b>14</b></td></tr>
    elem = document.evaluate('//td[text()="Battles Left today:"]', 
			     document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;

    if (!elem)
	throw new Error("Can't find number of battles left today");

    return parseInt(elem.nextSibling.firstChild.innerHTML);
}

// Test the document body HTML for the given text
function DocTest(text)
{
    return (document.body.innerHTML.indexOf(text) > -1);
}

// Test the href location for the given text
function LocationTest(text)
{
    return (location.href.indexOf(text) > -1);
}

function IncrementTask()
{
    data.taskNum++;
    data.Save();
    floatingSpeedloop.Draw();
}

// If we are not already on the teamchange page... go there and throw an exception to halt code
function GoTeamPage()
{
    if( ! LocationTest("/bvs/team.html") )
    {
	var menucell = document.evaluate('//a[text()="Team"]', document, null,
					 XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;				     
	eval("unsafeWindow." + menucell.href.split(":")[1]);
	throw new Error("Moving to team page");	
   }
}

function GoPHWheelPage()
{
    if( ! LocationTest("billy/bvs/partyhouse.html") )
    {
	var menucell = document.evaluate('//a[text()="Party House"]', document, null,
					 XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;				     
	eval("unsafeWindow." + menucell.href.split(":")[1]);
	throw new Error("Moving to partyhouse page");	
    }
    
    if (!unsafeWindow.document.raf)
    {
	var menucell = document.evaluate('//a[text()="Wheel"]', document, null,
					 XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;				     
	eval("unsafeWindow." + menucell.href.split(":")[1]);
	throw new Error("Moving to the wheel game");
    }
}

function GoPHDartsPage()
{
    if( ! LocationTest("billy/bvs/partyhouse.html") )
    {
	var menucell = document.evaluate('//a[text()="Party House"]', document, null,
					 XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;				     
	eval("unsafeWindow." + menucell.href.split(":")[1]);
	throw new Error("Moving to partyhouse page");
    }
    
    if (!unsafeWindow.document.dgame)
    {
	var menucell = document.evaluate('//a[text()="Darts"]', document, null,
					 XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;				     
	eval("unsafeWindow." + menucell.href.split(":")[1]);
	throw new Error("Moving to the darts game");
    }
}


function GoJutsuPage()
{
    if( ! LocationTest("/bvs/jutsu.html") )
    {
	var menucell = document.evaluate('//a[text()="Jutsu"]', document, null,
					 XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;				     
	eval("unsafeWindow." + menucell.href.split(":")[1]);
	throw new Error("Moving to jutsu page");
   }
}

function BuyJutsu(jutsu)
{
    elem = document.getElementById("a" + jutsu.code);
    if (elem)
    {
	elem.checked = "checked";
	unsafeWindow.document.jutsu.submit();
	throw new Error("Learning Jutsu: " + jutsu.name);
    }
}

function EnableMegamissions()
{
    // Possibilities are missionstart.html and bvs/missions/*
    if( ! LocationTest("/bvs/missions") )
    {
	var menucell = document.evaluate('//a[text()="Missions"]', document, null,
					 XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;				     
	eval("unsafeWindow." + menucell.href.split(":")[1]);
	throw new Error("Moving to missions page");	
    }

    if ( ! DocTest("<i>MegaMissions Active!</i>") )
    {
	unsafeWindow.document.megamis.submit();
	throw new Error ("Enabling megamissions");
    }
    else
    {
	IncrementTask();
    }
}

function GoMissionPage(rank)
{
    // Possibilities are missionstart.html and bvs/missions/*
    if( ! LocationTest("/bvs/missions") )
    {
	var menucell = document.evaluate('//a[text()="Missions"]', document, null,
					 XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;				     
	eval("unsafeWindow." + menucell.href.split(":")[1]);
	throw new Error("Moving to missions page");	
    }

    if ( LocationTest("/bvs/missionstart.html") )
    {
	objMissionLookup = {
	    D:    "d",
	    genD: "gd",
	    genC: "gc",
	    genB: "gb",
	    ninB: "nb",
	    taiC: "tc",
	    taiB: "tb",
	    taiA: "ta",
	    taiAA: "taa" };

	eval("unsafeWindow.document.misform" + objMissionLookup[rank] + ".submit();");
	throw new Error("Getting " + rank + " rank mission");
    }
}

function GoArenaPage()
{
    if (! LocationTest("/bvs/arena.html") )
    {
	var menucell = document.evaluate('//a[text()="Arena"]', document, null,
					 XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;				     
	eval("unsafeWindow." + menucell.href.split(":")[1]);
	throw new Error("Moving to quests page");	
    }
}

function GoQuestPage()
{
    if( ! LocationTest("/bvs/quests.html") &&
	! LocationTest("/bvs/questattempt.html") &&
	! LocationTest("/bvs/chuninexam.html") ) // Special page name for chunin exam
    {
	var menucell = document.evaluate('//a[text()="Quests"]', document, null,
					 XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;				     
	eval("unsafeWindow." + menucell.href.split(":")[1]);
	throw new Error("Moving to quests page");	
    }

    if (unsafeWindow.document.questcontinue)
    {
	unsafeWindow.document.questcontinue.submit();
	throw new Error("Continuing quest");
    }
}

function GoJutsuEnhancePage()
{
    if (LocationTest("/bvs/villagejenhance.html"))
	return;  // Mission accomplished

    if (LocationTest("/bvs/village.html"))
    {
	if (unsafeWindow.document.jenhance)
	{
	    unsafeWindow.document.jenhance.submit();
	    throw new Error("Going to Jutsu Enhance Page");
	}
	else
	{
	    throw new Error("Village does not have Jutsu enhancement");
	}
    }

    // Otherwise, go to main village page
    var menucell = document.evaluate('//a[text()="Village"]', document, null,
				     XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;				     
    eval("unsafeWindow." + menucell.href.split(":")[1]);
    throw new Error("Moving to village page");	
}

function GetStalker3()
{
    if (LocationTest("/bvs/villagefields.html"))
    {
	if (data.TestFlag("Stalkergirl Lvl. 3"))
	{
	    IncrementTask();
	    throw new Error("Task Complete");
	}
	else
	{
	    CheckAllyGet(allies.Stalkergirl);
	    if (unsafeWindow.document.r00t)
	    {
		unsafeWindow.document.r00t.submit();
		throw new Error("Getting stalker 3");
	    }
	    else
		throw new Error("Wrong field?  Don't have 6 LW?");
	}

    }

    if (LocationTest("/bvs/village.html"))
    {
	if (unsafeWindow.document.fieldmenu)
	{
	    unsafeWindow.document.fieldmenu.submit();
	    throw new Error("Going to Fields Page");
	}
	else
	{
	    throw new Error("Village does not have R00T");
	}
    }

    // Otherwise, go to main village page
    var menucell = document.evaluate('//a[text()="Village"]', document, null,
				     XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;				     
    eval("unsafeWindow." + menucell.href.split(":")[1]);
    throw new Error("Moving to village page");
}

function BlindQuestAttempt()
{
    // Blindly attempt the quest
    if (DocTest("document.attack.submit()"))
	unsafeWindow.document.attack.submit();
    if (DocTest("document.goquest.submit()"))
	unsafeWindow.document.goquest.submit();
}

// Simple attempt for current mission with given jutsu... does not return, always throws exception
function MissionAttempt(jutsu)
{
    if (!data.TestFlag("Level41+") && GetLevel >= 41)
    {
	data.SetFlag("Level41+");
	data.Save();
	throw new Error("Level 41 achieved");
    }

    // Blindly attempt the mission using the given jutsu
    if (unsafeWindow.document.domission)
	unsafeWindow.document.domission.submit();
    if (unsafeWindow.document.attempt)
    {
	if (jutsu.code > -1)
	    document.getElementById("jutsu" + jutsu.code).checked = true;
	unsafeWindow.document.attempt.submit();    
    }

    // Throw exception
    throw new Error("Attempting mission with jutsu: " + jutsu.name);
}

// Complex attempt for current mission stack
//     Script defaults to given jutsu if not found in the stack
function MissionStackAttempt(stack, defaultjutsu)
{
    // Get the mission name cell
    var missioncell = document.evaluate('//div[@class="miscontainer"]/div/div/div/center/font/b', document, null,
					XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
    var strMissionName = missioncell.innerHTML;

    // stack is an array of Mission objects
    for (var i in stack)
	if (stack[i].name == strMissionName) 
        {
	    if (stack[i].allyget)
		CheckAllyGet(stack[i].allyget);
	    MissionAttempt(stack[i].jutsu);
	}

    // This point is not reached unless mission is not in the stack

    // Default jutsu
    MissionAttempt(defaultjutsu);
}

function CheckAllyGet(ally)
{
    // Somewhat better version of CheckStuffGet()
    if (DocTest("You got an Ally!<br><b>" + ally.name + "!</b>") ||
	DocTest("<b>" + ally.name + " joins you!</b>") ||
	DocTest("<b>" + ally.name + " joins your party!</b>")  ||
	DocTest("<b>" + ally.name + " joined your party!</b>") ||
	DocTest("You got <b>" + ally.name + "!</b>")   )
    {
	data.SetFlag(ally.name);
	data.Save();
	throw new Error("Got ally:" + ally.name);
    }

    // Ally Level 2
    if (DocTest("Level Up!<br><b>" + ally.name + "</b> is now <b>" + ally.name + " Lvl. 2!</b>"))
    {
	data.SetFlag(ally.name + " Lvl. 2");
	data.Save();
	throw new Error("Got " + ally.name + " Lvl. 2");
    }

    // Ally Level 3
    if (DocTest("<b>" + ally.name + " is now Lvl. 3!</b>")) // specific to stalker3 for now
    {
	data.SetFlag(ally.name + " Lvl. 3");
	data.Save();
	throw new Error("Got " + ally.name + " Lvl. 3");
    }
}

function EstimateStaminaNeeded()
{
    if ( !LocationTest("bvs/missions/mission1.html") )
	return -1;

    // Build array of ap needed to achieve the next level
    var arrAP = [
	0, 1500, 2000, 3000, 3500, 4500, 6000, 8500, 10500, 16000, 26000, 40000, 
	60000, 80000, 110000, 160000, 210000, 300000, 330000, 360000,
	400000 + 0*50000,
	400000 + 1*50000,
	400000 + 2*50000,
	400000 + 3*50000,
	400000 + 4*50000,
	400000 + 5*50000,
	400000 + 6*50000,
	400000 + 7*50000,
	800000 + 0*100000,
	800000 + 1*100000,
	800000 + 2*100000,
	800000 + 3*100000,
	800000 + 4*100000,
	800000 + 5*100000,
	800000 + 6*100000
    ];

    // Get the taijutsu information cell
    var taicell = document.evaluate('//td[contains(text(),"Taijutsu:")]', document, null,
				    XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;

    if (!taicell)
	return -1;

    // Extract useful info
    var taiLevel = parseInt(/Taijutsu: <font ([^>]+)><b>(\d+)<font/.exec(taicell.innerHTML)[2]);
    var taiAP = parseInt(/>\((\d+)\/(\d+) AP\)<br>\+(\d+). AP Bonus/.exec(taicell.innerHTML)[1]);
    var taiBonus = parseInt(/>\((\d+)\/(\d+) AP\)<br>\+(\d+). AP Bonus/.exec(taicell.innerHTML)[3]);

    // Grab the amount of AP earned this mission
    var earnedAP = 0;
    if (DocTest(" Tai AP</font>"))
	earnedAP = parseInt(/>\+(\d+) Tai AP<\/font>/.exec(document.body.innerHTML)[1]);
    if (earnedAP == 0)
	return -1;

    var megasEnabled = DocTest("<i>MegaMissions Enabled!</i>");

    // Compute total AP needed to level
    var neededAP = arrAP[taiLevel] - taiAP;
    for (var i = taiLevel+1; i<35; i++)
	neededAP += arrAP[i];

    // Stamina cost
    var stamCost = megasEnabled ? 70 : 7; //hardcode for now... change later v2.0

    // Compute total stamina needed
    var neededStam = Math.ceil(neededAP * stamCost / earnedAP);

    return neededStam > 0 ? neededStam : 0;
}

////////////////////////////////////////////////////////////////////////
///////////                 SPEEDLOOP CODE                 /////////////
////////////////////////////////////////////////////////////////////////

function SpeedloopStep()
{
    // Perform a single step of speedloop
    try
    {
	// Call the next function in the tasklist
	tasklist[data.taskNum].taskfun();
    }
    catch(err)
    {
	// Report the error or message on the floating window
	floatingSpeedloop.showErr(err);
    }
}


function DoGenericQuest(quest, endstep, jutsu)
{
    // Ensure that we are on the quest page or go there
    //    This function also continues a quest in progress
    GoQuestPage();

    // safeguard against bad code for eval statement
    if (typeof(quest.code) != "number")
	throw new Error("quest.code must be a number");

    // Sanity check to make sure that we are on the correct page
    if (!DocTest(quest.name))
	throw new Error("We are on the wrong quest?!?");

    // Select the desired quest to start
    if (DocTest("document.quest" + quest.code + ".submit()"))
    {
	eval("unsafeWindow.document.quest" + quest.code + ".submit()");
	return;
    }

    // Check termination conditions
    if ( (endstep == -1 && DocTest("--Epilogue--")) || 
	 DocTest("--Part " + endstep + " of " + quest.numsteps + "--") )
    {
	if (quest.flag)
	{
	    data.SetFlag(quest.flag);
	    data.Save();
	}
	IncrementTask();
	unsafeWindow.document.minim4.submit();
	return;
    }

    // Set the requested jutsu
    if (jutsu && unsafeWindow.document.attack)
	elem = document.getElementById(jutsu.code).checked = "checked";

    BlindQuestAttempt();
}


function TeamChange(ally1, ally2, ally3)
{
    // Check whether we are performing a team change confirmation
    if (unsafeWindow.document.conteam)
    {
	// Confirm the team without thinking
	unsafeWindow.document.conteam.submit();
	return;
    }

    // Move to the team page (execution halts if we are not already there)
    GoTeamPage();

    // Check whether the task is already complete
    indstart = document.body.innerHTML.indexOf("<b>-Current Team-</b>");
    ind1 = document.body.innerHTML.indexOf("<b>" + ally1.name, indstart);
    ind2 = document.body.innerHTML.indexOf("<b>" + ally2.name, indstart);
    ind3 = document.body.innerHTML.indexOf("<b>" + ally3.name, indstart);
    indend = document.body.innerHTML.indexOf("Save current team as Quickteam:");

    if (ind1 < indend && ind2 < indend && ind3 < indend)
    {
	// This team is already set (yay!)
	IncrementTask();
	return;
    }

    // Quick helper function to select ally boxes
    allyBoxCheck = function(idnum)
    {
	var elem = false;
	if (idnum != -1)
	    elem = document.getElementById("id_" + idnum);
	if (elem)
	    elem.checked = "checked";
    };

    allyBoxCheck(ally1.code1);
    allyBoxCheck(ally1.code2);
    allyBoxCheck(ally1.code3);

    allyBoxCheck(ally2.code1);
    allyBoxCheck(ally2.code2);
    allyBoxCheck(ally2.code3);

    allyBoxCheck(ally3.code1);
    allyBoxCheck(ally3.code2);
    allyBoxCheck(ally3.code3);

    // Submit the form
    unsafeWindow.document.maketeam.submit();
}

function TeamThreeLvl2()
{
    // Form a team of three level 2 allies
    var team = new Array();

    // Find level 2 allies
    for (var i in allies)
	if ( data.TestFlag(allies[i].name + " Lvl. 2") )
        {
	    team.push(allies[i]);
	    if (team.length >= 3)
		break;
	}

    // die if not enough are found
    if (team.length < 3)
	throw new Error("Get more level 2's...");

    // Change to the proper team
    TeamChange(team[0], team[1], team[2]);
}

function TeamThreeJonin()
{
    // Form a team of three jonin
    var team = new Array();

    var jonins = [
	allies.Annie,
	allies.BruceSr,
	allies.Haus,
	allies.JDiddy,
	allies.KY,
	allies.KDog,
	allies.RoversMom,
	allies.SmokeyBear,
	allies.TripleH,
	allies.TheRack ];

    for (var i in jonins)
	if ( data.TestFlag(jonins[i].name) )
        {
	    team.push(jonins[i]);
	    if (team.length >= 3)
		break;
	}

    // die if not enough are found
    if (team.length < 3)
	throw new Error("Get more jonin...");

    // Change to the proper team
    TeamChange(team[0], team[1], team[2]);
}

function GetPHWheelStuff()
{
    GoPHWheelPage();

    if (data.TestFlag("The Rack")) 
    {
	IncrementTask();
	return;
    }
    else if (!data.TestFlag("Yuri"))
	CheckAllyGet(allies.Yuri); 
    else
	CheckAllyGet(allies.TheRack); 

    if (unsafeWindow.document.raf)
	unsafeWindow.document.raf.submit();
}

function GetPHDartsStuff()
{
    GoPHDartsPage();

    if (data.TestFlag("Tsukasa"))
    {
	IncrementTask();
	return;
    }

    CheckAllyGet(allies.Tsukasa);

    elem = document.evaluate("//input[@name='dartthrown' and @value='Kunai']", 
				 document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
    elem.checked = "checked";

    elem = document.evaluate("//input[@name='megadart']",
				 document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
    elem.checked = "checked";

    if (unsafeWindow.document.dgame)
	unsafeWindow.document.dgame.submit();
}

function ChuninExamQuest1()
{
    // Move to the quests page (execution halts if not already there)
    GoQuestPage();

    // Check quest termination conditions
    if (DocTest("You sit there, and you and Billy automatically pass!"))
    {
	IncrementTask();
	unsafeWindow.document.minim4.submit();
	throw new Error("Task Complete!");
    }
    
    // Select the quest Chunin exam part 1
    if (unsafeWindow.document.questchu1)
    {
	unsafeWindow.document.questchu1.submit();
	return;
    }

    if (unsafeWindow.document.skipchu)
    {
	unsafeWindow.document.skipchu.submit();
	return;
    }
}


function GetLevel12()
{
    // Go to the missions select page
    GoMissionPage("D");

    // Inefficient, but we're only gong to do one mission here anyway
    if (!data.TestFlag("Pinky"))
	CheckAllyGet(allies.Pinky);
    if (!data.TestFlag("Billy"))
	CheckAllyGet(allies.Billy);
    if (!data.TestFlag("Emosuke"))
	CheckAllyGet(allies.Emosuke);
    if (!data.TestFlag("Lil' Ro"))
	CheckAllyGet(allies.LilRo);
    if (!data.TestFlag("Red Rover"))
	CheckAllyGet(allies.RedRover);

    // Check termination conditions
    if (unsafeWindow.document.domission && GetLevel() >= 12)
    {
	IncrementTask();
	unsafeWindow.document.minim2.submit();
	throw new Error("Task Complete!");
    }

    MissionAttempt(jutsus.SRS);    
}

function GetTimmy30()
{
    GoMissionPage("taiC");

    var resultsTimmyMissions = /Timmy Missions Completed: <b>(\d+)<\/b>/.exec(document.body.innerHTML);

    // Check termination conditions
    if (unsafeWindow.document.domission && resultsTimmyMissions &&
	parseInt(resultsTimmyMissions[1]) >= 30)
    {
	IncrementTask();
	unsafeWindow.document.minim2.submit();
	throw new Error("Task Complete!");
    }

    var stack = new Array();
    if (!data.TestFlag("Yuri Lvl. 2"))
	stack.push(new Mission("Undermine a Wall!", jutsus.SRS, allies.Yuri));
    if (!data.TestFlag("Bruce Sr."))
	stack.push(new Mission("Challenge a Dojo Master!", jutsus.SRS, allies.BruceSr));

    // Button mash for missions
    MissionStackAttempt(stack, jutsus.SRS);
}

function GetDrankStuff()
{
    // Go to the missions select page
    GoMissionPage("genD");

    // Check termination conditions
    if (unsafeWindow.document.domission && 
	data.TestFlag("Emosuke") &&
	data.TestFlag("Pinky") &&
	data.TestFlag("Billy") &&
	data.TestFlag("Lil' Ro") )
    {
	IncrementTask();
	unsafeWindow.document.minim2.submit();
	throw new Error("Task Complete!");
    }

    // Prepare the mission stack
    var stack = new Array();
    if (!data.TestFlag("Pinky"))
    {
	stack.push(new Mission("Babysit the Ninja Academy", jutsus.SRS, allies.Pinky));
	stack.push(new Mission("Hiding!", jutsus.SRS, allies.Pinky));
    }
    if (!data.TestFlag("Billy"))
    {
	stack.push(new Mission("Check out a Ninja Centerfold", jutsus.SRS, allies.Billy));
	stack.push(new Mission("Inscribe Scrolls", jutsus.SRS, allies.Billy));
	stack.push(new Mission("Sneak out of Detention", jutsus.SRS, allies.Billy));
	stack.push(new Mission("Missing Pet Tora", jutsus.SRS, allies.Billy));
    }
    if (!data.TestFlag("Emosuke"))
    {
	stack.push(new Mission("Practice Spying", jutsus.SRS, allies.Emosuke));
	stack.push(new Mission("Hiding in Smoke", jutsus.SRS, allies.Emosuke));
    }
    if (!data.TestFlag("Lil' Ro"))
	stack.push(new Mission("Ninja Academy Demonstration", jutsus.SRS, allies.LilRo));

    if (!data.TestFlag("Red Rover"))
	stack.push(new Mission("Clean the Ninja Dog Pen", jutsus.SRS, allies.RedRover));

    // Attempt the mission stack
    MissionStackAttempt(stack, jutsus.Escape);
}

function GetGenCrankStuff()
{
    // Go to the missions select page
    GoMissionPage("genC");

    // Check termination conditions
    // Require level 13 in a stat to proceed
    if (GetMaxSingleLevel() >= 13)
    {
	IncrementTask();
	unsafeWindow.document.minim2.submit();
	throw new Error("Task Complete!");
    }

    // Prepare the mission stack
    var stack = new Array();

    // do any gen/tai dual stat missions
    stack.push(new Mission("Finish a Delivery!", jutsus.SRS));
    stack.push(new Mission("Sabotage a Scientist!", jutsus.SRS));

    if (!data.TestFlag("Trapchan"))
	stack.push(new Mission("Angry Villagers!", jutsus.SRS, allies.Trapchan)); // also gets trapchan
    else
	stack.push(new Mission("Angry Villagers!", jutsus.SRS));

    if (!data.TestFlag("K.Y."))
	stack.push(new Mission("Clear Out the Forest of Death!", jutsus.SRS, allies.KY)); // also gets K.Y.
    else
	stack.push(new Mission("Clear Out the Forest of Death!", jutsus.SRS));

    if (!data.TestFlag("Spot Lvl. 2"))
	stack.push(new Mission("Strike Down a Sentry!", jutsus.SRS, allies.Spot)); // Also levels Spot
    else
	stack.push(new Mission("Strike Down a Sentry!", jutsus.SRS));

    if (!data.TestFlag("Meatballs Lvl. 2"))
	stack.push(new Mission("Overthrow a Captain!", jutsus.SRS, allies.Meatballs));

    if (data.TestFlag("Red Rover") && !data.TestFlag("Red Rover Lvl. 2"))
	stack.push(new Mission("Interrupt a Meeting!", jutsus.SRS, allies.RedRover));

    if (data.TestFlag("Terri") && !data.TestFlag("Terri Lvl. 2"))
	stack.push(new Mission("Leap a Gorge!", jutsus.SRS, allies.Terri));

    MissionStackAttempt(stack, jutsus.Escape);
}

function GetPinky2()
{
    GoMissionPage("taiB");

    // Check termination conditions
    if (unsafeWindow.document.domission && data.TestFlag("Pinky Lvl. 2"))
    {
	IncrementTask();
	unsafeWindow.document.minim2.submit();
	throw new Error("Task Complete!");
    }

    var stack = new Array();
    stack.push( new Mission("Confess their Emo Love!", jutsus.AOTNS, allies.Pinky) );
    
    MissionStackAttempt(stack, jutsus.Escape);
}


function GetLevel41()
{
    GoMissionPage("taiB");

    // Check termination conditions
    if (data.TestFlag("Level41+")) // Flag set by function MissionAttempt
    {
	IncrementTask();
	unsafeWindow.document.minim2.submit();
	throw new Error("Task Complete!");
    }

    var stack = new Array();
    MissionStackAttempt(stack, jutsus.AOTNS);
}

function GetStalkergirl2()
{
    GoMissionPage("ninB");

    // Check termination conditions
    if (unsafeWindow.document.domission && data.TestFlag("Stalkergirl Lvl. 2"))
    {
	IncrementTask();
	unsafeWindow.document.minim2.submit();
	throw new Error("Task Complete!");
    }

    var stack = new Array();
    stack.push( new Mission("Defend the WhiteEye Princess!", jutsus.AOTNS, allies.Stalkergirl) );

    // dual stat gen and nin
    stack.push( new Mission("Chase down Timmy!", jutsus.AOTNS, allies.MrSmith) ); // Mr. Smith    
    stack.push( new Mission("Catch a Ninja Fish!", jutsus.AOTNS) );
    stack.push( new Mission("Cut through a Platoon!", jutsus.AOTNS) );
    stack.push( new Mission("Row a Gondola!", jutsus.AOTNS) );

    MissionStackAttempt(stack, jutsus.Escape);
}

function GetMrSmith()
{
    GoMissionPage("ninB");

    // Check termination conditions
    if (unsafeWindow.document.domission && data.TestFlag("Mr. Smith"))
    {
	IncrementTask();
	unsafeWindow.document.minim2.submit();
	throw new Error("Task Complete!");
    }

    var stack = new Array();
    stack.push( new Mission("Chase down Timmy!", jutsus.AOTNS, allies.MrSmith) ); // Mr. Smith

    // dual stat gen and nin
    stack.push( new Mission("Catch a Ninja Fish!", jutsus.AOTNS) );
    stack.push( new Mission("Cut through a Platoon!", jutsus.AOTNS) );
    stack.push( new Mission("Row a Gondola!", jutsus.AOTNS) );



    MissionStackAttempt(stack, jutsus.Escape);
}

function GetBruceSr()
{
    GoMissionPage("taiC");

    // Check termination conditions
    if (unsafeWindow.document.domission && data.TestFlag("Bruce Sr."))
    {
	IncrementTask();
	unsafeWindow.document.minim2.submit();
	throw new Error("Task Complete!");
    }

    var stack = new Array();
    stack.push( new Mission("Challenge a Dojo Master!", jutsus.AOTNS, allies.BruceSr) ); // Bruce Sr.

    MissionStackAttempt(stack, jutsus.Escape);
}

function GetBilly2()
{
    GoMissionPage("genB");

    // Check termination conditions
    if (unsafeWindow.document.domission && data.TestFlag("Billy Lvl. 2"))
    {
	IncrementTask();
	unsafeWindow.document.minim2.submit();
	throw new Error("Task Complete!");
    }

    var stack = new Array();
    stack.push( new Mission("Defeat an Evil Pirate!", jutsus.AOTNS, allies.Billy) );

    MissionStackAttempt(stack, jutsus.Escape);
}

function GetLevel60()
{
    GoMissionPage("taiA");

    // Check termination conditions
    if (unsafeWindow.document.domission && GetLevel() >= 60)
    {
	IncrementTask();
	unsafeWindow.document.minim2.submit();
	throw new Error("Task Complete!");
	return;
    }

    var stack = new Array();

    // Missions sorted by number of tai successes

    // 17
    stack.push(new Mission("Read an Ancient Text!", jutsus.PSPDP));

    // 15
    stack.push(new Mission("Exorcise a Haunted Graveyard!", jutsus.PSPDP));

    // 13
    stack.push(new Mission("Finish a Theme Song!", jutsus.PSPDP));
    stack.push(new Mission("Get the Cake!", jutsus.PSPDP));
    stack.push(new Mission("Help the Heroes of Justice!", jutsus.PSPDP));

    // 12
    stack.push(new Mission("Become the King of Fighters!", jutsus.PSPDP));
    stack.push(new Mission("Defeat the Army of Darkness!", jutsus.PSPDP));
    stack.push(new Mission("Fight a Giant Briefcase!", jutsus.PSPDP));
    stack.push(new Mission("Protect your Companion Cube!", jutsus.FOS));

    // 11
    stack.push(new Mission("Beat up a Whale!", jutsus.PSPDP));
    stack.push(new Mission("D-d-d-d-d-duel!", jutsus.PSPDP));
    stack.push(new Mission("Switch Golden Idols!", jutsus.FOS));

    // 10
    stack.push(new Mission("Fly a Giant Robot!", jutsus.FOS));
    stack.push(new Mission("Write Mission Text!", jutsus.PSPDP));

    // 9
    stack.push(new Mission("Calm a Crazy Housecat!", jutsus.PSPDP));
    stack.push(new Mission("Crush a Forest of Evil!", jutsus.PSPDP));
    stack.push(new Mission("Cure a Parasite!", jutsus.PSPDP));
    stack.push(new Mission("Get past Temple Guards!", jutsus.PSPDP));
    stack.push(new Mission("Seal a Vampire!", jutsus.AOTNS));
    stack.push(new Mission("Smuggle Rebels through a War!", jutsus.AOTNS));

    // 8 
    stack.push(new Mission("Fight off a Strike Force!", jutsus.AOTNS));

    // 7
    stack.push(new Mission("Stop an Assassination!", jutsus.FOS));

    MissionStackAttempt(stack, jutsus.PSPDP);
}

function GetTaiLevel35()
{
    GoMissionPage("taiAA");

    // Check termination conditions
    if (unsafeWindow.document.domission && GetMaxSingleLevel() >= 35)
    {
	IncrementTask();
	unsafeWindow.document.minim2.submit();
	throw new Error("Task Complete!");
    }

    // Setup the mission stack
    var stack = new Array();

    // Missions sorted by tai successes

    // 15
    stack.push(new Mission("Split an Atom", jutsus.PSPDP));
    stack.push(new Mission("Stall an Invasion", jutsus.AOTNS));

    // 13
    stack.push(new Mission("A Fray! ", jutsus.PSPDP));
    stack.push(new Mission("Eat a Cathedral", jutsus.AOTNS));
    stack.push(new Mission("Find the Ultimate Answer", jutsus.FOS));
    stack.push(new Mission("Get your Lame On!", jutsus.AOTNS));
    stack.push(new Mission("Wrestle a Turkish Giant!", jutsus.AOTNS));

    // 12
    stack.push(new Mission("Act in the Kage\'s Place", jutsus.AOTNS));
    stack.push(new Mission("Fix the Monument", jutsus.AOTNS));

    // 11
    stack.push(new Mission("It Is Dark", jutsus.FOS));
    stack.push(new Mission("Turn on a Robot Girl!", jutsus.PSPDP));

    // For now just do all missions
    MissionStackAttempt(stack, jutsus.PSPDP);
}


function BuyFlipperJutsu()
{
    // Go to the Jutsu page
    GoJutsuPage();

    // BuyJutsu only returns if jutsu cannot be purchased
    BuyJutsu(jutsus.Clone);
    BuyJutsu(jutsus.Disguise);
    BuyJutsu(jutsus.ETA);
    BuyJutsu(jutsus.PWS);
    BuyJutsu(jutsus.Escape);

    // We only reach this point if the desired jutsu have been learned
    IncrementTask();
}

function BuyMissionJutsu()
{
    GoJutsuPage();
    
    BuyJutsu(jutsus.AOTNS);
    BuyJutsu(jutsus.FOS);

    IncrementTask();
}

function BuyJoninJutsu()
{
    GoJutsuPage();

    BuyJutsu(jutsus.MBST); // mind body switch technique
    BuyJutsu(jutsus.FSFJ); // fireball jutsu
    BuyJutsu(jutsus.PSPDP); // Pinky style: Pervert Destroying punch

    IncrementTask();
}

function UseArenaFight(useall)
{
    GoArenaPage();

    numFights = GetNumFights();
    if(numFights == 0)
    {
	IncrementTask();
	throw new Error("Task Complete");
    }
    
    if (unsafeWindow.document.arenafight)
    {
	if (useall)
	{
	    elem = document.evaluate("//input[@name='megaarena']", 
				     document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	    if (elem)
		elem.checked = "checked";
	}

	unsafeWindow.document.arenafight.submit();
	throw new Error("Fighting the fight");
    }
}

////////////////////////////////////////////////////////////////////////
///////////                  HOTKEY CODE                   /////////////
////////////////////////////////////////////////////////////////////////

var hotkeyLock = false;

function KeyCheck(event) 
{
    var KeyID = event.keyCode;
    
    if (KeyID == 192 && !hotkeyLock) // backquote key: `
    {
	// Lock hotkey usage to protect from button spamming
	hotkeyLock = true;

	// Perform one speedloop step
	SpeedloopStep();

	// Unlock hotkey usage
	hotkeyLock = false;
    }
}

document.documentElement.addEventListener("keyup", KeyCheck, true);




////////////////////////////////////////////////////////////////////////
///////////             PAGE LOAD RUNTIME                ///////////////
////////////////////////////////////////////////////////////////////////

// Initialize the allies object
var allies = {
    // Ally(name, code1, code2, code3)

    Flipper:      new Ally("Flipper",          269,  -1,  -1),
    ProofReader:  new Ally("Proof Reader",     379,  -1,  -1),
    Tempest:      new Ally("Tempest Kitsune",  385,  -1,  -1), 
    Meatballs:    new Ally("Meatballs",        290, 291,  -1),
    Stalkergirl:  new Ally("Stalkergirl",      312, 313, 381),
    Spot:         new Ally("Spot",             310, 311,  -1),
    TicTac:       new Ally("TicTac",           360,  -1,  -1),
    RoboGirl:     new Ally("Robogirl",          -1,  -1, 393),
    Strawberry:   new Ally("Strawberry",        -1,  -1,  -1),
    MisterTea:    new Ally("Mister Tea",       346,  -1,  -1),
    Emosuke:      new Ally("Emosuke",          266,  -1, 268),
    RedRover:     new Ally("Red Rover",        302, 303,  -1),
    Billy:        new Ally("Billy",            254, 255, 256),
    Pinky:        new Ally("Pinky",            300, 301, 399),
    Olmek:        new Ally("Olmek",            297,  -1,  -1),
    LilRo:        new Ally("Lil\' Ro",         283,  -1,  -1),
    Tsukasa:      new Ally("Tsukasa",          377, 380,  -1),
    Trapchan:     new Ally("Trapchan",          -1, 384,  -1),
    Terri:        new Ally("Terri",             -1,  -1, 318), 
    LilRack:      new Ally("Lil' Rack",        405,  -1,  -1),
    TACOS:        new Ally("TACOS",            404,  -1,  -1),
    Timmy:        new Ally("Timmy",            361, 362,  -1),
    Yuri:         new Ally("Yuri",             328, 329,  -1),
    MrSmith:      new Ally("Mr. Smith",        294, 411,  -1),
    Annie:        new Ally("Annie",             -1,  -1,  -1),
    Haus:         new Ally("Haus",              -1,  -1,  -1),
    SmokeyBear:   new Ally("Smokey the Bear",   -1,  -1,  -1),
    TripleH:      new Ally("Triple H",          -1,  -1,  -1),
    KDog:         new Ally("K-Dog",            277,  -1,  -1),
    BruceSr:      new Ally("Bruce Sr.",        261,  -1,  -1),
    RoversMom:    new Ally("Rover's Mom",      304,  -1,  -1),
    KY:           new Ally("K.Y.",             279, 383,  -1),
    JDiddy:       new Ally("J-Diddy",          275,  -1,  -1),
    Snakeman:     new Ally("SNAKEMAN",         309,  -1,  -1),
    TheRack:      new Ally("The Rack",         320,  -1,  -1),

    Blank:    new Ally("", -1,  -1,  -1)
};

// Initialize the jutsus object
var jutsus = {
    // Jutsu(name, code)
    
    SRS:      new Jutsu("Soul Reaper Style: Lunch, SandySword!", 499),
    MBST:     new Jutsu("Mind Body Switch Technique", 393),
    PWK:      new Jutsu("Projectile Weapons: Kunai", 373),
    Redeye:   new Jutsu("RedEye",  502),
    Clone:    new Jutsu("Clone Jutsu", 368),
    Disguise: new Jutsu("Disguise Jutsu", 370),
    ETA:      new Jutsu("Exploding Tags: Activate", 371),
    PWS:      new Jutsu("Projectile Weapons: Shuriken", 372),
    Escape:   new Jutsu("Escape Jutsu", 374),
    FSFJ:     new Jutsu("Fire Style: Fireball Jutsu", 376),

    PSPDP:    new Jutsu("Pinky Style: Pervert-Destroying Punch", 416),
    AOTNS:    new Jutsu("Attack on the Nervous System", 429),
    FOS:      new Jutsu("Flock of Seagulls", 419),

    Blank:    new Jutsu("", -1)
};

// Initialize the quests object
var quests = {
    // Quest(name, code, numsteps, flag)

    Meatballs:   new Quest("Very Tragic Story", 89, 3, "Meatballs"),
    Stalkergirl: new Quest("Stalkergirl",      123, 3, "Stalkergirl"),
    Tsukasa2:    new Quest("Walking Alone",     45, 1, "Tsukasa Lvl. 2"),
    Trapchan2:   new Quest("Wild Child",        41, 1, "Trapchan Lvl. 2"),
    Chunin2:     new Quest("Forest of Death",   49, 4, ""),
    Chunin3:     new Quest("Final Fight",       75, 4, "K-Dog"),
    SpJonin:     new Quest("The Student Becomes the Teacher (Genjutsu S2+)", 55, 4, ""),
    Jonin:       new Quest("Jonin Ascension (S2+ RedEye)",                  102, 10, ""),
    Snakeman:    new Quest("Wake the Snake",    99, 3, "SNAKEMAN"),
    Sannin:      new Quest("The Big Three",    107, 7, ""),
    Peeping:     new Quest("Peeping",           81, 1, ""),

    Blank:     new Quest("", -1, -1, "")
}


// Initialize the list of tasks to be performed
var tasklist = new Array(
    new Task("Use Booster/Ninja-On", function() { alert("Skip this step when ready"); }),
    new Task("Get Tsukasa",          function() { GetPHDartsStuff(); }),
    new Task("Genin Quest Team",     function() { TeamChange(allies.Flipper, allies.ProofReader, allies.Blank); }),
    new Task("Get Meatballs",        function() { DoGenericQuest(quests.Meatballs, -1); }),
    new Task("Get Stalkergirl",      function() { DoGenericQuest(quests.Stalkergirl, -1); }),
    new Task("Get Tsukasa2",         function() { DoGenericQuest(quests.Tsukasa2, -1); }),
    new Task("Genin Mission Team",   function() { TeamChange(allies.Flipper, allies.Stalkergirl, allies.Blank); }),
    new Task("Do a kaiju whack",     function() { alert("Skip this step when ready"); }),
    new Task("Level 12 GO!",         function() { GetLevel12(); }),
    new Task("Use Arena Fights",     function() { UseArenaFight(false); }),
    new Task("Buy Flipper Jutsu",    function() { BuyFlipperJutsu(); }),
    new Task("Get Chunin (part 1)",  function() { ChuninExamQuest1(); }),
    new Task("Get Chunin (part 2)",  function() { DoGenericQuest(quests.Chunin2, -1); }),
    new Task("Get Chunin (part 3)",  function() { DoGenericQuest(quests.Chunin3, -1); }),
    new Task("Chunin D-rank Team",   function() { TeamChange(allies.Flipper, allies.Stalkergirl, allies.ProofReader); }),
    new Task("Get D-rank Stuff",     function() { GetDrankStuff(); }),
    new Task("PH Wheel Team",        function() { TeamChange(allies.Stalkergirl, allies.Billy, allies.Meatballs); }),
    new Task("Get Yuri and Rack",    function() { GetPHWheelStuff(); }),
    new Task("Gen C-rank Team",      function() { TeamChange(allies.Stalkergirl, allies.Meatballs, 
	data.TestFlag("Red Rover") ? allies.RedRover : (data.TestFlag("Terri") ? allies.Terri : allies.Billy ) ); }),
    new Task("Get Gen C-rank stuff", function() { GetGenCrankStuff(); }),
    new Task("Get trapchan2 maybe",  function() { if(data.TestFlag("Meatballs Lvl. 2")) {IncrementTask();} else {DoGenericQuest(quests.Trapchan2, -1);} }),
    new Task("Start Timmy Quest",    function() { DoGenericQuest(quests.SpJonin, 3); }),
    new Task("Timmy farm team",      function() { TeamChange(allies.Stalkergirl, allies.Timmy, allies.Yuri); }),
    new Task("Timmy farm GO!",       function() { GetTimmy30(); }),
    new Task("Finish Timmy Quest",   function() { DoGenericQuest(quests.SpJonin, -1); }),
    new Task("Get Mission jutsu",    function() { BuyMissionJutsu(); }),
    new Task("Enhance Jutsu",        function() { GoJutsuEnhancePage(); alert("Skip this step when ready"); }),
    new Task("Crazy Love Triangle",  function() { TeamChange(allies.Stalkergirl, allies.Pinky, allies.Billy); }),
    new Task("Get Pinky2",           function() { GetPinky2(); }),
    new Task("Get Stalkergirl2",     function() { GetStalkergirl2(); }),
    new Task("Get Billy2",           function() { GetBilly2(); }),
    new Task("Get Mr. Smith",        function() { GetMrSmith(); }),
    new Task("Get Bruce Sr.",        function() { GetBruceSr(); }),
    new Task("Glowsling team",       function() { TeamChange(allies.Stalkergirl, allies.BruceSr, allies.MrSmith); }),
    new Task("Do glowslings",        function() { alert("Skip this step when ready"); }),
    new Task("Get Level 41",         function() { GetLevel41(); }),
    new Task("Buy Jonin Jutsu",      function() { BuyJoninJutsu(); }),
    new Task("Enhance Jutsu",        function() { GoJutsuEnhancePage(); alert("Skip this step when ready"); }),
    new Task("Get J-Diddy",          function() { CheckAllyGet(allies.JDiddy); if (data.TestFlag("J-Diddy")){IncrementTask();} }),
    new Task("Get Jonin (part 1)",   function() { DoGenericQuest(quests.Jonin, 4); }),
    new Task("Get Jonin (part 2)",   function() { DoGenericQuest(quests.Jonin, 5, jutsus.MBST); }),
    new Task("Get Jonin (part 3)",   function() { DoGenericQuest(quests.Jonin, 6, jutsus.FSFJ); }),
    new Task("Get Jonin Team",       function() { TeamThreeJonin(); }),
    new Task("Get Jonin (part 4)",   function() { DoGenericQuest(quests.Jonin, 7, jutsus.FSFJ); }),
    new Task("Crazy Love Triangle",  function() { TeamChange(allies.Stalkergirl, allies.Pinky, allies.Billy); }),
    new Task("Get Jonin (part 5)",   function() { DoGenericQuest(quests.Jonin, -1, jutsus.FSFJ); }),
    new Task("Get Bingo'd",          function() { alert("Skip this step when ready"); }),
    new Task("Get SNAKEMAN",         function() { DoGenericQuest(quests.Snakeman, -1); }),
    new Task("Get Stalker3 Team",    function() { TeamChange(allies.LilRo, allies.Olmek, allies.TheRack); }),
    new Task("Get Stalker3",         function() { GetStalker3(); }),
    new Task("A-rank team",          function() { TeamChange(allies.Stalkergirl, allies.Pinky, allies.MrSmith); }),
    new Task("Enable megamissions",  function() { EnableMegamissions(); }),
    new Task("Get Level 60",         function() { GetLevel60(); }),
    new Task("Get Sannin Team",      function() { TeamChange(allies.TheRack, allies.JDiddy, allies.Snakeman); }),
    new Task("Sannin Quest",         function() { DoGenericQuest(quests.Sannin, -1); }),
    new Task("AA-rank team",         function() { TeamChange(allies.Stalkergirl, allies.Pinky, allies.MrSmith); }),
    new Task("Enable megamissions",  function() { EnableMegamissions(); }),
    new Task("Tai 35 GO GO GO!",     function() { GetTaiLevel35(); }),
    new Task("Peeping Team",         function() { TeamChange(allies.Tempest, allies.Snakeman, allies.Stalkergirl); }),
    new Task("Peeping Quest",        function() { DoGenericQuest(quests.Peeping, -1, jutsus.ETA); }),
    new Task("Use Arena Fights",     function() { UseArenaFight(true); }),

    new Task("Loop!", function() {alert("done");})
);



// Create global instance of speedloop data object
var data = new speedloopData();

// Create the floating window objects
var floatingSpeedloop = new FloatingSpeedloop();
floatingSpeedloop.Draw();

