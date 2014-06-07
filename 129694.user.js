// ==UserScript==
// @name           BvS_Bawg_Reporter_v1
// @namespace      SirDuck36
// @description    Generate a Bawg Report for BvS Forum Copy/Paste
// @include        http://*animecubed.com/billy/bvs/partyhouse-pachinkoplay*
// @version        1.5
// @history        1.5 Bug fix, script updates
// @history        1.4 Removed from userscripts to host locally, removed autoupdate feature
// @history        1.3 Updates by godofdeath to track additional information and simplify copy/paste
// @history        1.2 Update for settings input from setting string and bug fix for bawg win days
// @history        1.1 Bug fixes and extended capability for the new version
// @history        1.0 Update by SirDuck36 to save and combine info 
// @history        0.5 Update by ZeConster for script copy/paste
// @history        0.4 Fix for bawg multiplier text
// @history        0.3 Bug fix to fix the display
// @history        0.2 Bug fix thanks to kumida
// @history        0.1 Initial version by SirDuck36
// ==/UserScript==


// Script version
var scriptVersion = "1.5";


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

// Make infinite alerts less miserable
var displayAlerts = true;
function alert(msg) {
  if (displayAlerts) {
     if (!confirm(msg)) {
       displayAlerts = false;           
     }
  }
}

// Select summary string for copy paste
function SelectSummaryString() 
{
    var range = document.createRange();
    range.selectNodeContents( document.getElementById('dataStr') );
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
}

// Select an option form a drop down box
function FormSelect(strFormName, strSelectName, strOptionValue, strOptionText)
{
    // First get the select object
    var strXPath = "";

    // Form name is optional, include it if necessary
    if (strFormName)
	strXPath += '//form[@name=\'' + strFormName + '\']';

    // Input name is mandatory (else we cannot find the input box...)
    strXPath += '//select[@name=\'' + strSelectName + '\']';

    var elem = document.evaluate(strXPath, document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;

    // Element does not exist
    if (!elem  || elem.disabled)
	return false;

    // loop through options and select any if found
    for (var i=0; i<elem.options.length; i++)
    {
	if ( (!strOptionValue || elem.options[i].value == strOptionValue) &&
	     (!strOptionText  || elem.options[i].text == strOptionText) )
	{
	    elem.selectedIndex = i;
	    return true;
	}
    }

    // If the code reaches this point, we did not find the option to select
    return false;
}

function GetNumOccurrences(string, substring)
{
    var count=0;
    var pos=0;

    pos = string.indexOf(substring,pos);
    while( pos != -1 )
    {
	count++;
	pos = string.indexOf(substring, pos + substring.length);
    }

    return count;
}


////////////////////////////////////////////////////////////////////////
///////////                 Objects                    /////////////////
////////////////////////////////////////////////////////////////////////


function bawgData()
{
    // Save the storage object
    this.storage = new DOMStorage("local", "BvSBawgReporter");
    this.namePlayer = document.evaluate("//input[@name='player' and @type='hidden']", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue.value;
    
    // Internal data
    this.settingStr = "";    	 		// Current settings
    this.dataArr = "";       	 		// Array of strings, one for each unique attempt
    this.dataElectrumTotal = "0";	 	// Total number of Electrums thrown on the Bawg
    this.dataStartingBalls = "";                // Starting balls (recorded on bawg page load)
    
    // Save and Load functions
    this.Load = function()
    {
	this.settingStr 	  	= this.storage.getItem("BawgReporter_Settings_" + this.namePlayer, "");
	this.dataElectrumTotal 		= this.storage.getItem("BawgReporter_TotalElectrum_" + this.namePlayer, "");
	this.dataStartingBalls 		= this.storage.getItem("BawgReporter_StartingBallData_" + this.namePlayer, ""); 

	var dataStr 		  	= this.storage.getItem("BawgReporter_Data_" + this.namePlayer, "");
	this.dataArr = dataStr.split("||");
    }

    this.Save = function()
    {
	var dataStr = this.dataArr.join("||");

	this.storage.setItem("BawgReporter_Settings_" + this.namePlayer, this.settingStr);
	this.storage.setItem("BawgReporter_TotalElectrum_" + this.namePlayer, this.dataElectrumTotal);
	this.storage.setItem("BawgReporter_StartingBallData_" + this.namePlayer, this.dataStartingBalls);
	this.storage.setItem("BawgReporter_Data_" + this.namePlayer, dataStr);
    }
	
    // Insert Total Electrum Amount
    this.InsertElectrumData = function( dataElectrumTotal )
    {
	this.dataElectrumTotal = dataElectrumTotal;
	this.Save();
    }
	
    // Insert starting amount of all bally types, to track throws
    this.SaveStartingBallData = function()
    {
	this.dataStartingBalls = 
	    parseInt(/<tr><td>Electrum: <\/td><td>(\d+)<\/td><\/tr>/.exec(document.body.innerHTML)[1])
	    + '_' + parseInt(/<tr><td>Bronze: <\/td><td>(\d+)<\/td><\/tr>/.exec(document.body.innerHTML)[1])
	    + '_' + parseInt(/<tr><td>Silver: <\/td><td>(\d+)<\/td><\/tr>/.exec(document.body.innerHTML)[1])
	    + '_' + parseInt(/<tr><td>Gold: <\/td><td>(\d+)<\/td><\/tr>/.exec(document.body.innerHTML)[1]);

	this.Save();
    }

    // Insert a bawg data string
    this.InsertData = function( settings, data )
    {
	// Check to see whether these settings match the current settings
	if ( settings != this.settingStr )
	{
	    // Clear out the old data and insert this as the only string
	    this.settingStr = settings;
	    this.dataArr = new Array();
	    this.dataArr.push(data);
	}
	else
	{
	    // These settings have been used before, make sure our data string does not conflict
	    var found = false;
	    for (var i = 0; i < this.dataArr.length; i++)
	    {
		// Compare the unique strings generated by each previous data line to this one
		var compUnique = this.dataArr[i].split('###')[1];
		var dataUnique = data.split('###')[1];

		if (dataUnique == compUnique)
		    found = true;
	    }

	    
	    if (!found)
	    {
		// This is a new data entry, add it to the list
		this.dataArr.push(data);
	    }
	}
	
	// Save the data before returning
	this.Save();
    }
    
    // Generate the innerHTML for the floating div element
    this.GenerateHTML = function()
    {
	//////////  Build the Initial String /////////////
	var initStr = '';
	initStr += 'Bawg Reporter Version ' + scriptVersion + '<br>\n';
	initStr += 'Bawg Settings: ' + this.settingStr.split('_').join(' ') + '\n';

	//////////// Build the Data String (individual data rows) /////////////
	var dataStr = '';
	dataStr += '<table>\n';

	var totals = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	var electrumStr = '';
	var jackpotElectrumCount = 0;
	var jackpotBronzeCount = 0;
	var jackpotSilverCount = 0;
	var jackpotGoldCount = 0;

	// Counter for number of times a message could potentially come up (useful for non-electrum)
	var jackpotMessageCount = 0;

	// Loop through each of the data rows
	for (var i = 0; i < this.dataArr.length; i++)
	{
	    dataStr += '<tr><td>Data Row ' + i + '</td>';

	    // put in the settings line
	    var temp = this.settingStr.split('_');
	    for (var j = 0; j<11; j++)
		dataStr += '<td>' + temp[j] + '</td>';
	    
	    dataStr += '<td></td>'; // blank column for excel

	    // put in the data line
	    var temp = this.dataArr[i].split('_');
	    for (var j = 0; j<6; j++)
	    {
		totals[j] += parseInt(temp[j]);
		dataStr += '<td>' + temp[j] + '</td>';
	    }

	    // Total electrum in the jackpot at time of throw
	    //	    dataStr += '<td>' + this.dataElectrumTotal + '</td>';
	    dataStr += '<td></td>';

	    // Accumulate total balls successfully clearing each area
	    for(var j = 7; j < 11; j++)
	    {
		totals[j] += parseInt(temp[j]);
		dataStr += '<td>' + temp[j] + '</td>';
	    }

	    // Jackpot message, if any
	    dataStr += '<td>' + temp[6] + '</td>';

	    // Append any jackpot messages together in a long string
	    electrumStr += temp[6];

	    // Increment message counter if any ball made it to jackpot area
	    if ( parseInt(temp[5]) > 0 )
		jackpotMessageCount += 1;

	    // Accumulate number of each type of ball that successfully made it through to jackpot
	    if(parseInt(temp[7]) > 0)
		jackpotElectrumCount += parseInt(temp[5]);

	    if(parseInt(temp[8]) > 0)
		jackpotBronzeCount += parseInt(temp[5]);

	    if(parseInt(temp[9]) > 0)
		jackpotSilverCount += parseInt(temp[5]);

	    if(parseInt(temp[10]) > 0)
		jackpotGoldCount += parseInt(temp[5]);
	    
	    dataStr += '</tr>\n';
	}
	dataStr += '</table>\n\n';


	///////////// Build the Summary string (to be copy/pasted) ////////////////
	var summaryStr = '';
	summaryStr += 'Bawg Data String:<br><table id="dataStr"><tr><td> ' + this.namePlayer + ' </td>';

	// put in the settings line
	var temp = this.settingStr.split('_');
	for (var j = 0; j<11; j++)
	    summaryStr += '<td>' + temp[j] + '</td>';
		
	summaryStr += '<td></td>'; // blank column for excel

	// Put in the totals line  (Currently leaving out electrum count)
	totals[6] = this.dataElectrumTotal;
	for (var j = 0; j<6; j++)
	    summaryStr += '<td>' + totals[j] + '</td>';

	summaryStr += '<td></td>'; // blank column for excel

	// Put in info about number of reject messages received
	summaryStr += '<td>' + GetNumOccurrences(electrumStr, 'Forest') + '</td>';
	summaryStr += '<td>' + GetNumOccurrences(electrumStr, 'Gate') + '</td>';
	summaryStr += '<td>' + GetNumOccurrences(electrumStr, 'Tray One') + '</td>';
	summaryStr += '<td>' + GetNumOccurrences(electrumStr, 'Tray Two') + '</td>';
	summaryStr += '<td>' + GetNumOccurrences(electrumStr, 'Tray Three') + '</td>';
	summaryStr += '<td>' + GetNumOccurrences(electrumStr, 'Jackpot') + '</td>';
	summaryStr += '<td>' + jackpotMessageCount + '</td>';

	summaryStr += '<td></td>'; // blank column for excel

	// Total balls thrown of each type
	for (var j = 7; j<11; j++)
	    summaryStr += '<td>' + totals[j] + '</td>';

	summaryStr += '<td></td>'; // blank column for excel

	// Total balls of each type that make it to jackpot
	summaryStr += '<td>' + jackpotElectrumCount + '</td>';
	summaryStr += '<td>' + jackpotBronzeCount + '</td>';
	summaryStr += '<td>' + jackpotSilverCount + '</td>';
	summaryStr += '<td>' + jackpotGoldCount + '</td>';

	summaryStr += '<td></td>';

	// slepton
	summaryStr += '<td>slepton</td>';

	summaryStr += '</tr></table>\n\n';

	// Build HTML string and return
	return initStr + '<br><br>\n' + summaryStr + '<br><br>Data rows (only used in case of emergency):\n' + dataStr + '\n';
    }

    // Always load data upon instantiation
    this.Load();
}


////////////////////////////////////////////////////////////////////////
///////////                 Main Script                /////////////////
////////////////////////////////////////////////////////////////////////

// Bawg screen once settings are confirmed, before balls are thrown
if ( (document.body.innerHTML.indexOf("-- Report --") == -1) 
     && (document.body.innerHTML.indexOf("Choose ball type") > -1) )
{
    try
    {
	// Create a bawgData object
	var bawgdata = new bawgData(); 

	// Save the starting ball data
	bawgdata.SaveStartingBallData();
    }
    catch(err)
    {
	alert('An error has occured:\n\n' + err.message);
    }
}

// Bawg screen after a throw
if (document.body.innerHTML.indexOf("-- Report --") > -1)
{
    try
    {
	// Create a bawgData object
	var bawgdata = new bawgData();

	// Grab unique identifier information for this throw (number of electrum bronze silver gold)
	
	var uniqueStr = '###';  // identify start of unique string with ###
	uniqueStr += 'e: ' + /<td>Electrum: <\/td><td>(\d+)<\/td>/.exec(document.body.innerHTML)[1] + ' ';
	uniqueStr += 'b: ' + /<td>Bronze: <\/td><td>(\d+)<\/td>/.exec(document.body.innerHTML)[1] + ' ';
	uniqueStr += 's: ' + /<td>Silver: <\/td><td>(\d+)<\/td>/.exec(document.body.innerHTML)[1] + ' ';
	uniqueStr += 'g: ' + /<td>Gold: <\/td><td>(\d+)<\/td>/.exec(document.body.innerHTML)[1] + ' ';

//	alert('Unique string is: \n' + uniqueStr);
		
	// Extract Report
	var reportStr = /-- Report --<br>[^](.*)[^]<\/td>/.exec(document.body.innerHTML)[1];
	var rep = {total: 0, forest: 0, gate: 0, trayone: 0, traytwo: 0, traythree: 0, jackpot: 'none', electrum: 0, bronze: 0, silver: 0, gold: 0};
	rep.total = /<b>Forest of Pins:<\/b> (\d+) \/ (\d+) get through!<br>/.exec(reportStr)[2];
	rep.forest = /<b>Forest of Pins:<\/b> (\d+) \/ (\d+) get through!<br>/.exec(reportStr)[1];
	
	if (rep.forest > 0)
	    rep.gate = /<b>The Gate:<\/b> (\d+) \/ (\d+) get through!<br>/.exec(reportStr)[1];
	
	if (rep.gate > 0)
	    rep.trayone = /<b>Tray One:<\/b> (\d+) \/ (\d+) get through!<br>/.exec(reportStr)[1];
	
	if (rep.trayone > 0)
	    rep.traytwo = /<b>Tray Two:<\/b> (\d+) \/ (\d+) get through!<br>/.exec(reportStr)[1];
	
	if (rep.traytwo > 0)
	    rep.traythree = /<b>Tray Three:<\/b> (\d+) \/ (\d+) get through!<br>/.exec(reportStr)[1];
	
	if (rep.traythree > 0)
	    rep.jackpot = /<b>Jackpot:<\/b> (.*?)<br>/.exec(reportStr)[1];

	var startingBallArr = bawgdata.dataStartingBalls.split('_');
		
	rep.electrum = parseInt(startingBallArr[0]) - parseInt(/<tr><td>Electrum: <\/td><td>(\d+)<\/td><\/tr>/.exec(document.body.innerHTML)[1]);
	rep.bronze = parseInt(startingBallArr[1]) - parseInt(/<tr><td>Bronze: <\/td><td>(\d+)<\/td><\/tr>/.exec(document.body.innerHTML)[1]);
	rep.silver = parseInt(startingBallArr[2]) - parseInt(/<tr><td>Silver: <\/td><td>(\d+)<\/td><\/tr>/.exec(document.body.innerHTML)[1]);
	rep.gold = parseInt(startingBallArr[3]) - parseInt(/<tr><td>Gold: <\/td><td>(\d+)<\/td><\/tr>/.exec(document.body.innerHTML)[1]);
	
	
	// Check for a jackpot message
	//	<i>Something is stopping your shots at <b>Tray One</b>!</i>

	var resElectrum = /<i>Something is stopping your shots at <b>(.*?)<\/b>!<\/i>/.exec(document.body.innerHTML);

	// Include ball successes and message in unique string
	uniqueStr += rep.total + ' ' + rep.forest + ' ' + rep.gate + ' ' +
	    rep.trayone + ' ' + rep.traytwo + ' ' + rep.traythree + ' ' +
	     (resElectrum ? resElectrum[1] : 'No Message');
	
	// Construct the data string
	var dataStr = rep.total + '_' + rep.forest + '_' + rep.gate + '_' + rep.trayone
	    + '_' + rep.traytwo + '_' + rep.traythree + '_' 
	    + (resElectrum ? resElectrum[1] : 'No Message') + '_'
	    + rep.electrum + '_'
	    + rep.bronze + '_'
	    + rep.silver + '_'
	    + rep.gold + '_'
	    + uniqueStr;

	// Save the starting ball data for next throw
	bawgdata.SaveStartingBallData();

	// Extract last winner time and name
	var lastWinnerRes = /<center><b>The Bawg<\/b><br>[^]Last won on (.*?)<br>[^]by <b>(.*?)<\/b><br>/.exec(document.body.innerHTML);
	
	var win = new Object();
	win.time = lastWinnerRes[1];
	win.name = lastWinnerRes[2];

	// Extract Bawg Settings
	var settingRes = /<tbody>(?=<tr><td>Timing:)([^]*?)<\/tbody>.*?<tbody>([^]*?)<\/tbody>/.exec(document.body.innerHTML);
	
	settingStr = settingRes[1] + settingRes[2];
	
	var sets = new Object();
	
	var setnames = 
	    [
		'tim', 'Timing',
		'flo', 'Floor Tilt',
		'tig', 'Tightness',
		'aim', 'Aim',
		'bui', 'Building Tilt',
		'pin', 'Pin Setting',
		'mag', 'Magnetism',
		'vol', 'Volume',
		'hum', 'Humidity',
		'mac', 'Machine Tilt',
		'zaw', 'Zawa'
	    ];
	
	for (var i = 0; i<22; i+=2)
	    sets[ setnames[i] ] = RegExp(setnames[i+1]+ ': <\\/td><td>(\\d+)<').exec(settingStr)[1];
	
	var bawgStr = '';
	for (var i = 0; i<22; i+=2) {
	    bawgStr += sets[setnames[i]] + '_';
	}

	bawgStr += win.name + ' ' + win.time;

//	alert('Bawg string is:\n' + bawgStr);

	// Insert the data into the bawgData object
	bawgdata.InsertData( bawgStr, dataStr );
	
	// Get the html table containing all of the results and the summary lines
	var html_Str = bawgdata.GenerateHTML();

	
	// Finally, HTML div overlay
	
	var div=document.createElement("div");
	div.style.left = "40px";
	div.style.top = "100px";
	div.style.position = "fixed";
	div.style.width = "600px";
	div.style.height = "500px";
	div.style.overflow = "auto";
	div.style.background = 'rgb(216, 100, 100)';
		
	div.innerHTML= html_Str;
	
	document.body.appendChild(div);

	// Highlight string for copy/paste
	SelectSummaryString();
	
    }
    catch(err)
    {
	alert('An error has occured:\n\n' + err.message);
    }
}

// Bawg page before sitting down
if (document.body.innerHTML.indexOf("The Bawg is enshrined") > -1)
{
    // Create a bawgData object
    var bawgdata = new bawgData();
    var electrum = /<b>(\d+)<\/b> Electrum Balls<br>/.exec(document.body.innerHTML)[1];
    bawgdata.InsertElectrumData(electrum);
}

if (document.body.innerHTML.indexOf("Choose your Settings (1-11)") > -1)
{

    // Create the text area object
    var area = document.createElement("textarea");
    area.id = 'BawgInputArea';

    area.rows = 1;
    area.cols = 33;

    // Create the button to fill the settings
    var a = document.createElement("a");
    
    a.href = "javascript:void(0)";
    a.innerHTML = "Click here to insert settings";

    a.addEventListener("click", 
		       function() 
		       {
			   var setArr = document.getElementById('BawgInputArea').value.split(' ');
			   
			   if (setArr.length != 11)
			   {
			       document.getElementById('BawgInputArea').value = "Please try again.";
			       return;
			   }
			   
			   try
			   {
			       for (var i=0; i<11; i++)
				   FormSelect('bawgtalk', 'bset-' + (i+1), setArr[i], null);
			   }
			   catch (err)
			   {
			       alert('An error has occured:\n\n' + err.message);
			   }
		       }, 
		       false);

    // Finally, HTML div overlay	
    var div = document.createElement("div");
    div.style.left = "40px";
    div.style.top = "100px";
    div.style.position = "fixed";
    div.style.width = "300px";
    div.style.height = "120px";
    div.style.background = 'none repeat scroll 0% 0% rgb(216, 100, 100)';
 
    // Add the text area
    div.innerHTML = "<br>1. Paste the settings string here:<br>"
    div.appendChild(area);
    div.innerHTML += "<br><br>2. ";
    div.appendChild(a);
    
    document.body.appendChild(div);
}