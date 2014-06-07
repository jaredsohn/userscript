// ==UserScript==
// @name           Dream World Timer
// @namespace      Dappy
// @include        http://*playmage.com/*
// ==/UserScript==

/////////////////////////////////// SETTINGS ///////////////////////////////////
 // 3 settings // 1 = 2.5 seconds refresh rate // 2 = 30 secons refresh rate // 3 = 1 min refresh rate
MAINLOOP = 1;
/////////////////////////////////// SETTINGS ///////////////////////////////////

if(MAINLOOP == 1) mainlooptimeout = 2500;
else if(MAINLOOP == 2) mainlooptimeout = 30000;
else if(MAINLOOP == 3) mainlooptimeout = 100000;
else mainlooptimeout = 30000;

// Add jQuery
if (typeof unsafeWindow.jQuery == 'undefined')
{
	var GM_JQ = document.createElement('script');
	GM_JQ.src = 'http://code.jquery.com/jquery-latest.min.js';
	GM_JQ.type = 'text/javascript';
	document.getElementsByTagName('head')[0].appendChild(GM_JQ);

	
	var GM_CB = document.createElement('script');
	GM_CB.src = 'http://bowser.effectgames.com/~jhuckaby/zeroclipboard/ZeroClipboard.js';
	GM_CB.type = 'text/javascript';
	document.getElementsByTagName('head')[0].appendChild(GM_CB);
}

// Check if jQuery's loaded

function GM_wait()
{
	if (typeof unsafeWindow.jQuery == 'undefined')
	{
		window.setTimeout(GM_wait, 100);
	}
	else
	{
		$ = unsafeWindow.jQuery;
		letsJQuery();
	}
}
GM_wait();



if (Array.prototype.clear == null) Array.prototype.clear = function ()
{
	this.splice(0, this.length);
}
if (String.prototype.format == null) String.prototype.format = function ()
{
	var a = arguments;
	if (a.length == 1 && typeof (a[0]) == "object" && a[0].constructor == Array) a = a[0];
	var t = this;
	for (var num1 = 0; num1 < a.length; num1++) if (a[num1] != null) t = t.replace(new RegExp("\\{" + num1 + "\\}", "gm"), a[num1]);
	return t;
}
if (String.prototype.trim == null) String.prototype.trim = function ()
{
	return this.replace(/^\s+|\s+$/gm, "");
}
if (String.prototype.beginsWith == null) String.prototype.beginsWith = function (text)
{
	return this.indexOf(text) == 0;
}
if (String.prototype.endsWith == null) String.prototype.endsWith = function (text)
{
	return this.lastIndexOf(text) == this.length - text.length;
}

function $x(path, method, element)
{
	return (element ? element.ownerDocument : document).evaluate(path, element || document, null, method || 0, null);
}

function $x1(path, element)
{
	return $x(path, 9, element).singleNodeValue;
}

function $xa(path, method, element)
{
	var x = $x(path, method, element);
	switch (x.resultType)
	{
	case 4:
	case 5:
		for (var num1 = 0, obj1 = null;
		(obj1 = x.iterateNext()) != null; num1++)
		{
			x[num1] = obj1;
			x.length = num1 + 1;
		}
		break;
	case 6:
	case 7:
		x.length = x.snapshotLength;
		for (var num1 = 0; num1 < x.length; num1++) x[num1] = x.snapshotItem(num1);
		break;
	}
	return x;
}

function $nc(nameclass, element)
{
	var r = (element ? element : document).getElementsByName(nameclass);
	if (r.length == 0) r = (element ? element : document).getElementsByClassName(nameclass);
	if (r.length == 0) r = null;
	return r;
}

function $inc1(idnameclass, element)
{
	var r = (element ? element.ownerDocument : document).getElementById(idnameclass);
	if (r == null)
	{
		r = $nc(idnameclass, element);
		if (r) r = r[0];
	}
	return r;
}

function $ce(tag, textContent, attributes)
{
	var e = document.createElement(tag);
	if (textContent) e.textContent = textContent;
	if (attributes) for (var name in attributes) e.setAttribute(name, attributes[name]);
	return e;
}

function stringToHTML(html)
{
	var div1 = $inc1("HiddenDivStringToHtml");
	if (div1 == null)
	{
		div1 = $ce("div", null, {
			id: "HiddenDivStringToHtml",
			style: "display:none;visibility:hidden;position:absolute;top:-1000px;left:-1000px;"
		});
		document.body.appendChild(div1);
	}
	div1.innerHTML = html;
	var element1 = div1.firstChild;
	if (element1) div1.removeChild(element1);
	return element1;
}

var bonusFactor = 1;
var playerName = "Hero";
var playerType = 0;
var chainWihsingWells = 6;
var logLevel = 5;

function log(message, level)
{
	if (logLevel == 0 || (logLevel && logLevel <= level)) GM_log(message);
}

function promptDebug(code)
{
	var result = null;
	while (code)
	{
		code = prompt(result, code);
		try
		{
			result = eval(code);
		}
		catch (ex)
		{
			result = ex.message;
		}
	}
}

function debugFunction(functionCall)
{
	var curLogLevel = logLevel;
	logLevel = 0;
	log("Debuging function: " + functionCall);
	try
	{
		return result = eval(functionCall);
	}
	finally
	{
		logLevel = curLogLevel
	};
}

puzzleSolverEnabled = false;

function setPuzzleSolverEnabled(enabled)
{
	puzzleSolverEnabled = enabled;
	var b = $inc1("puzzleSolver");
	if (b)
	{
		if (/Disable/.test(b.value) != enabled)
		{
			log("Changing puzle solver ...");
			clickElement(b);
		}
	}
	return b;
}

function setAutofightEnabled(enabled)
{
	var b = $inc1("disableauto");
	if (b && b.checked == enabled) clickElement(b);
}

if ($inc1("bodydiv"))
{
	log("starting up ...");
	if (/dream\/enter/.test(location.href))
	{
		getData().entryPoint = location.href;
		setData();
	}
	createGUI();
	removeAlertFunction();
	mainloop();
}

function removeAlertFunction()
{
	unsafeWindow.alert = function (msg)
	{
		setTimeout(log, 0, "Alert: " + msg);
	}
}

function createGUI()
{
	if (!$inc1("autoplay") && $inc1("bodydiv"))
	{
		log("create GUI");
		var options = getOptions();
		var div = document.createElement("div");
		//test stuff
		var div2 = document.createElement("div");
		div2.setAttribute("ID", "DWD");
		//div2.setAttribute("style", "visibility:hidden;display:none;");
		div2.innerHTML = "<iframe width='750px' scrolling='auto' height='30px' src='http://dreamwebdesign.comxa.com/test.php?' style='background:white;border:none;'>no frame</iframe>";
		div2.setAttribute("style", "position:absolute;left:0px;top:20px;z-index:1000;border:none;color:black;");
		document.body.appendChild(div2);
		//test stuff
		div.setAttribute("style", "position:absolute;left:0px;top:50px;z-index:999;background:white;border:solid 1px black;padding:1px;color:black;");
		div.innerHTML = "<span id='Hidey'><input type='checkbox' id='autoplay' name='autoplay' " + (options.autoplay ? "checked='checked'" : "") + "/><label for='autoplay'>Autoplay</label><br /><input type='checkbox' id='Invasion' name='Invasion' " + (options.Invasion ? "checked='checked'" : "") + "/><label for='Invasion'>Invasion</label><br /><input type='checkbox' id='Daily' name='Daily' " + (options.Daily ? "checked='checked'" : "") + "/><label for='Daily'>Daily Mbox</label><br /><input type='checkbox' id='Fallen' name='Fallen' " + (options.Fallen ? "checked='checked'" : "") + "/><label for='Fallen'>Fallen</label><br /><input type='checkbox' id='Energy' name='Energy' " + (options.Energy ? "checked='checked'" : "") + "/><label for='Energy'>Energy</label><br /></span><input type='checkbox' id='Hide' name='Hide' " + (options.Hide ? "checked='checked'" : "") + "/><label for='Hide'>Hide/show</label>&nbsp;<select id='method' name='method' style='visibility:hidden;display:none;'><option value='autoFight()' " + (options.method == "autoFight()" ? "selected='selected'" : "") + ">Auto Fight</option></select>&nbsp;<input type='checkbox' id='debug' name='debug' style='visibility:hidden;display:none;'/><a id='promptDebug' href='javascript:void(0);' style='visibility:hidden;display:none;'>Debug</a><span id='testy' style='visibility:hidden;display:none;'>loading...</span><span id='info' style='visibility:hidden;display:none;'/>";
		//<iframe width="100%" scrolling="auto" height="100%" src="http://dreamwebdesign.comxa.com/test.php?timer=1">no frame</iframe>
		document.body.appendChild(div); //visibility:hidden;display:none;
		$inc1("autoplay").addEventListener("click", function (e)
		{
			getOptions().autoplay = e.target.checked;
			setData();
		}, false);
		$inc1("Invasion").addEventListener("click", function (e)
		{
			getOptions().Invasion = e.target.checked;
			setData();
		}, false);
		$inc1("Fallen").addEventListener("click", function (e)
		{
			getOptions().Fallen = e.target.checked;
			setData();
		}, false);
		$inc1("Energy").addEventListener("click", function (e)
		{
			getOptions().Energy = e.target.checked;
			setData();
		}, false);
		$inc1("Daily").addEventListener("click", function (e)
		{
			getOptions().Daily = e.target.checked;
			setData();
		}, false);
		$inc1("Hide").addEventListener("click", function (e)
		{
			getOptions().Hide = e.target.checked;
			setData();
		}, false);
		$inc1("method").addEventListener("change", function (e)
		{
			getOptions().method = e.target.value;
			getQueue().clear();
			setData();
		}, false);
		$inc1("promptDebug").addEventListener("click", function (e)
		{
			promptDebug("true");
		}, false);
	}
}


function setInfo(text)
{
	var el = $inc1("info");
	if (el) el.textContent = text;
}

function setInfo2(text)
{
	var el2 = $inc1("ms");
	if (el2) el2.textContent = text;
}

function setInfo3(text)
{
	var el2 = $inc1("energy");
	if (el2) el2.textContent = text;
}



function hideStuff(input)
{
	hideWhat = input;
	var hide = 'document.getElementById("Hide").style';
	if(hideWhat == 0)
	{
		document.getElementById("Hidey").style.visibility = "visible";
		document.getElementById("Hidey").style.display = "inline";
	}
	if(hideWhat == 1)
	{
		document.getElementById("Hidey").style.visibility = "hidden";
		document.getElementById("Hidey").style.display = "none";
		//visibility:hidden;display:none;
	}
}


function mainloop()
{
	//log("mainloop");
	try
	{
		var options = getOptions();
		if (options.autoplay) eval(autoFight());
	}
	catch (e)
	{
		log(e.message + "\n" + e.stackTrace);
	}
	setTimeout(mainloop, mainlooptimeout);
	
}

function isLoading()
{
	var flag = unsafeWindow.requestPending;
	var state = getState();
	state.isLoading = flag ? state.isLoading + 1 : 0;
	setData();
	if (state.isLoading == 6) reload();
	return flag;
}

function roundNumber(num, dec)
{
	var result = Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
	return result;
}

function autoFight()
{
	if (isLoading()) return;
	setAutofightEnabled(false);
	setPuzzleSolverEnabled(puzzleSolverEnabled);
	if (!executeCommandsInQueue())
	{
		var queue = null;
		
		queue = ["emptyTurn()"];
		addToQueue(queue);
	}
}

function resetQueueFailedRepeatedCommand()
{
	log("reseting queue failed and repeated state");
	var state = getState();
	state.failedCommand = 0;
	state.repeatedCommand = 0;
	setData();
}
function randomFromTo(from, to)
{
	return Math.floor(Math.random() * (to - from + 1) + from);
}

function emptyTurn()
{
	return true;
}
function changeStateAction(newAction)
{
	if (newAction)
	{
		log("new action: " + newAction);
		getState().action = newAction;
		setData();
	}
	return newAction;
}

function getCurlevel()
{
	return getNumericValue("curlevel");
}

function getCurenergy()
{
	return getNumericValue("curenergy");
}

function getCurmaxenergy()
{
	return getNumericValue("curmaxenergy");
}

function getNumericValue(idname, defaultValue, selector)
{
	var num1 = defaultValue || 0;
	var el = $inc1(idname);
	//log(element+": "+el);
	if (el)
	{
		num1 = parseInt((selector ? selector(el) : el.textContent).replace(/,/gm, ""));
		//log("element value "+num1);
	}
	return num1;
}

function addToQueue(commands, keepCurrentQueue, ontop)
{
	//log(commands);
	if (commands)
	{
		var queue = getQueue();
		if (keepCurrentQueue)
		{
			if (ontop) commands = commands.concat(queue);
			else commands = queue.concat(commands);
		}
		queue.clear();
		for (var num1 = 0; num1 < commands.length; num1++) queue.push(commands[num1]);
		//log("actual queue:"+queue);
		setData();
	}
	return commands;
}

function fallenGET()
{
	//var helgate = "http://kong.playmage.com/dream/fallen?board";
	el2 = $inc1("fallen"); // this is just for me to print out the finished text when done
	el3 = $inc1("mbox");
	el4 = $inc1("maincontenttd");
	$.get("http://kong.playmage.com/dream/fallen?board", function (data)
	{
		temp = data;
		var TimeUntilRevival;
		if (temp.search("Time until revival:") != -1)
		{
			TimeUntilRevival = temp.match(/Time until revival:\s(\d+)\s/)[1];

			//debugScript("Found the number :" + numb, "debug");
			//if (el2) el2.textContent = " Fallen Revial in :" + TimeUntilRevival + "M(s)";
			hellInfo = " Fallen Revial in :" + TimeUntilRevival + "M(s)";
			document.getElementById("testy").innerHTML = hellInfo;
		}
		else
		{
			//temp = "ishjseio Current Fallen &nbsp (HP: 123,321,213,231) eji";
			//alert(ft);
			//ft.replace(/&nbsp;/,'');
			//alert(ft);
			//TimeUntilRevival = temp.match(/Current Fallen \(HP:\s((\d)+,((\d)+,)*(\d)+)/)[1];
			TimeUntilRevival = temp.match(/\(HP:\s((\d)+,((\d)+,)*(\d)+)/)[1];
			//TimeUntilRevival = "Fallen Currently Up!";
			//alert(tempdata);
			if (el2) el2.textContent = " Fallen HP :" + TimeUntilRevival;
			hellInfo = " Fallen HP :" + TimeUntilRevival;
			document.getElementById("testy").innerHTML = hellInfo;
		}
	});
}
function getFallen(mtext, mtime, mintext, minsleft, energy)
{
	var mBoxText = mtext;
	var mBoxTime = mtime;
	var minstime = minsleft;
	var minstext = mintext;	
	var energyText = energy;
	var helgate = "http://kong.playmage.com/dream/fallen?board";
	el2 = $inc1("fallen"); // this is just for me to print out the finished text when done
	el3 = $inc1("mbox");
	el4 = $inc1("maincontenttd");
	if (el3) el3.textContent = " Daily Mbox in " + mBoxTime + ":" + minstime + " Hours";
	//hellGate = "http://kong.playmage.com/dream/fallen?board";
	//hellGate = "http://www.dreamwebdesign.comxa.com/test.php?timer=1";
	fallenGET();
	hell = document.getElementById("testy").innerHTML;
	if(document.getElementById("Hide").checked == true) hideStuff(1);
	else if(document.getElementById("Hide").checked == false) hideStuff(0);
	
	tempwidth = 0;
	
	if(document.getElementById("Invasion").checked == false || getCurlevel() < 61) sendInvasion = 0;
	else 
	{
		sendInvasion = 1;
		tempwidth += 220;
	}
	
	if(document.getElementById("Daily").checked == false) sendDaily = 0;
	else 
	{
		sendDaily = 1;
		tempwidth += 150;
	}
	
	if(document.getElementById("Fallen").checked == false || getCurlevel() < 81) sendFallen = 0;
	else
	{
		sendFallen = 1;
		tempwidth += 190;
	}
	
	if(document.getElementById("Energy").checked == false) sendEnergy = 0;
	else 
	{
		sendEnergy = 1;
		tempwidth += 150;
	}
	tempwidth = tempwidth + "px";	
	
	//if(tempwidth == 0) tempwidth = 0;
	//else if(tempwidth == 1) tempwidth = 0;
	//else if(tempwidth == 2) tempwidth = 0;
	//else if(tempwidth == 3) tempwidth = 0;
	//else if(tempwidth == 4) tempwidth = 0;
	
	document.getElementById('DWD').innerHTML = "<iframe scrolling='auto' height='30px'  width='" + tempwidth +"' src='http://dreamwebdesign.comxa.com/test.php?hellgate=" + sendFallen + "&hell=" + hell + "&energy=" + sendEnergy + "&E= " + energyText + "&invasion=" + sendInvasion + "&mbox=" + sendDaily + "&debug=0' style='background:white;border:none;'>Frames Not Enabled Or Not Suported</iframe>";
}

function executeCommandsInQueue()
{
	log("executeCommandsInQueue");
	var queue = getQueue();
	var flag = queue.length != 0;
	if (flag)
	{
		var d = new Date();
		var hours = d.getHours();
		var hours2 = hours;

		var mins = d.getMinutes();

		var weekday = new Array(7);
		weekday[0] = "Sunday";
		weekday[1] = "Monday";
		weekday[2] = "Tuesday";
		weekday[3] = "Wednesday";
		weekday[4] = "Thursday";
		weekday[5] = "Friday";
		weekday[6] = "Saturday";
		now = weekday[d.getDay()];

		var daysLeft;
		switch (now)
		{
		case "Monday":
			daysLeft = 6;
			break;
		case "Tuesday":
			daysLeft = 5;
			break;
		case "Wednesday":
			daysLeft = 4;
			break;
		case "Thursday":
			daysLeft = 3;
			break;
		case "Friday":
			daysLeft = 2;
			break;
		case "Saturday":
			daysLeft = 1;
			break;
		default://sunday
			daysLeft = 0;
		}
		switch (hours)
		{
		case 0:
			Ihours = 2;
			Mhours = 8;
			break;
		case 1:
			Ihours = 1;
			Mhours = 7;
			break;
		case 2:
			Ihours = 0;
			Mhours = 6;
			break;
		case 3:
			Ihours = 23;
			Mhours = 5;
			break;
		case 4:
			Ihours = 22;
			Mhours = 4;
			break;
		case 5:
			Ihours = 21;
			Mhours = 3;
			break;
		case 6:
			Ihours = 20;
			Mhours = 2;
			break;
		case 7:
			Ihours = 19;
			Mhours = 1;
			break;
		case 8:
			Ihours = 18;
			Mhours = 0;
			break;
		case 9:
			Ihours = 17;
			Mhours = 23;
			break;
		case 10:
			Ihours = 16;
			Mhours = 22;
			break;
		case 11:
			Ihours = 15;
			Mhours = 21;
			break;
		case 12:
			Ihours = 14;
			Mhours = 20;
			break;
		case 13:
			Ihours = 13;
			Mhours = 19;
			break;
		case 14:
			Ihours = 12;
			Mhours = 18;
			break;
		case 15:
			Ihours = 11;
			Mhours = 17;
			break;
		case 16:
			Ihours = 10;
			Mhours = 16;
			break;
		case 17:
			Ihours = 9;
			Mhours = 15;
			break;
		case 18:
			Ihours = 8;
			Mhours = 14;
			break;
		case 19:
			Ihours = 7;
			Mhours = 13;
			break;
		case 20:
			Ihours = 6;
			Mhours = 12;
			break;
		case 21:
			Ihours = 5;
			Mhours = 11;
			break;
		case 22:
			Ihours = 4;
			Mhours = 10;
			break;
		default:
			//23
			Ihours = 3;
			Mhours = 9;
		}
		
		minsLeft = 60 - mins;
		if (daysLeft == 1) dayText = ':D, ';
		else if (daysLeft == 0)
		{
			dayText = '';
			daysLeft = '';
		}
		else dayText = ':D(s), ';

		if (Mhours == 1)
		{
			MHoursText = ': H, ';
		}
		else if (Mhours == 0)
		{
			MHoursText = '';
			Mhours = '';
		}
		else
		{
			MHoursText = ': H(s)';
		}

		if (Ihours == 1) hoursText = ': H, ';
		else if (Ihours == 0)
		{
			hoursText = '';
			Ihours = '';
		}
		else hoursText = ': H(s) ';

		if (minsLeft == 1) minsText = ': M!';
		else if (minsLeft == 0)
		{
			minsText = '';
			minsLeft = '';

		}
		else minsText = ': M(s)!';

		//minsLeft = 60 - mins;
		//Ihours = 0;
		//daysLeft = 6;
		if (daysLeft == 6 && hours == 2 || hours == 1 || hours == 0)
		{
			daysLeft = '';
			dayText = '';
		}
		//ends at 3am monday
		//starts at 3am tuesday
		getInvasion = daysLeft + dayText + Ihours + ":" + minsLeft + " Hours";
		curEnergy = getCurenergy();
		maxEnergy = getCurmaxenergy();

		tempEnergy = maxEnergy - curEnergy;
		getEnergyTime = roundNumber(tempEnergy * 4 / 60, 2);

		invasionString = "Invasion ends in " + getInvasion + " ";
		energyString = " Full E in: " + getEnergyTime + " Hours";
		getFallen(MHoursText, Mhours, minsText, minsLeft, energyString);

		//el5 = $inc1("test");
		//if (el5) el5.textContent = el5.textContent + " " + mtexter + " " + mhours;
		var state = getState();
		var command = queue.shift();
		//setInfo2(invasionString);
		//setInfo3(" Full E in: " + getEnergyTime + " Hours");
		setInfo("Executing: " + command + " (" + state.failedCommand + "," + state.repeatedCommand + ")");

		var result = null;
		try
		{
			result = eval(command);
		}
		catch (ex)
		{
			log(command + "\n" + ex.message + "\n" + ex.stack);
		}
		log("Result of '" + command + "' is " + result);
		if (result != null)
		{
			state.failedCommand = 0;
		}
		else
		{
			queue.unshift(command);
			var fails = state.failedCommand++;
			if (fails > 5)
			{
				if ($inc1("debug").checked) promptDebug(command);
				else
				{
					log("failedCommand detected desynchronization ...");
					state.failedCommand = 0;
				}
			}
		}

		if (command != state.lastCommand)
		{
			state.repeatedCommand = 0;
			state.lastCommand = command;
		}
		else
		{
			var repeated = state.repeatedCommand++;
			if (repeated > 5)
			{
				if ($inc1("debug").checked) promptDebug(command);
				else
				{
					log("repeatedCommand detected desynchronization ...");
					state.repeatedCommand = 0;
				}
			}
		}

		setData();
	}
	return flag;
}

function reload()
{
	log("reload");
	var href = getData().entryPoint;
	var state = getState();
	state.failedcommand = 0;
	state.repeatedcommand = 0;
	setData();
	if (location.href == href) location.reload(true);
	else location.href = href;
	return true;
}
var _data;

function getData()
{
	return _data || (_data = (eval(GM_getValue("data")) || new Object()));
}

function setData()
{
	//log("Setting data:"+getData().toSource());
	setTimeout(function ()
	{
		GM_setValue("data", getData().toSource());
	}, 0);
}

function getDataKey(key, newKey)
{
	var data = getData();
	var dataKey = data[key];
	if (!dataKey)
	{
		dataKey = data[key] = newKey;
		setData();
	}
	return dataKey;
}
function getOptions()
{
	return getDataKey("options", {
		autoplay: false,
		Daily: false,
		Energy: false,
		Fallen: false,
		Invasion: false,
		Hide: false,
		method: "fight()"
	});
}

function getQueue()
{
	return getDataKey("queue", new Array());
}

function getState()
{
	return getDataKey("state", {
		moneyWells: 0,
		WishingWells: 0,
		failedCommand: 0,
		repeatedCommand: 0,
		lastCommand: "",
		solvedPuzzle: 0
	});
}

function getStatistics()
{
	return getDataKey("statistics", {
		puzzleBoxes: 0,
		moneyPuzzleBoxes: 0,
		dexterityPuzzleBoxes: 0,
		speedPuzzleBoxes: 0,
		iqPuzzleBoxes: 0,
		WishingWells: 0,
		energyWells: 0,
		moneyWells: 0,
		skillWells: 0,
		restarts: 0,
		moneyWellsHistory: []
	});
}