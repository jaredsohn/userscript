// ==UserScript==
// @name           BvS_Daily
// @namespace      SirDuck36
// @description    Assist in daily tasks
// @include        http://*animecubed.com/billy/bvs*
// ==/UserScript==


// 4.14.2011 Initial version by SirDuck36
// 4.19.2011 Major overhaul of the API by SirDuck36
// 4.20.2011 Minor updates and bug fixes from North
// 4.20.2011 Updated ChangeSequence to include a task number
// 4.20.2011 Bug fix for GoPage('glowslinging');
// 4.21.2011 Added several new options for gopage function
// 4.23.2011 Added sequences link -- suggested by WolfX
// 4.23.2011 Add hotkeylock to left and right arrow hotkeys -- suggested by Skarn22
// 4.23.2011 Added support for //@SequenceCode before first task -- suggested by North
// 4.23.2011 Fixed editor window hide to remove lingering select box -- SirDuck36
// 4.23.2011 Added functionality to hide daily window on desired pages -- SirDuck36
// 6.12.2011 Bug fix for ChangeSequence function -- Skarn22
// 6.19.2011 Add newline to ShowMsg and add pizzawitch to GoPage function -- SirDuck36


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



// Make infinite alerts less miserable
var displayAlerts = true;
function alert(msg) {
  if (displayAlerts) {
     if (!confirm(msg)) {
       displayAlerts = false;           
     }
  }
}

////////////////////////////////////////////////////////////////////////
///////////             DATA STRUCTURES                /////////////////
////////////////////////////////////////////////////////////////////////


function dailyData()
{
    // Save the storage object
    this.storage = new DOMStorage("local", "BvSDaily");
    this.namePlayer = document.evaluate("//input[@name='player' and @type='hidden']", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue.value;

    // List of all sequences stored in memory
    this.sequenceList = "";

    // List of all pages on which the daily window is hidden
    this.hidePageList = "";

    // Name and task number of current sequence
    this.sequenceName = "";
    this.taskNum = 0;

    // Actual tasklist for this sequence
    this.taskList = new Array();

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

    // Check whether a page is in the hidePageList
    this.TestHidePage = function(pageName)
    {
	for (var i=0; i < this.hidePageList.length; i++)
	    if (this.hidePageList[i] === pageName)
		return true;
	return false;
    }

    // Add a page to the hidePageList
    this.AddHidePage = function(pageName)
    {
	if (!this.TestHidePage(pageName))
	    this.hidePageList.push(pageName);
	this.SaveState();
    }

    // Remove a page from the hidePageList
    this.RemoveHidePage = function(pageName)
    {
	for (var i=0; i < this.hidePageList.length; i++)
	    if (this.hidePageList[i] === pageName)
	    {
		this.hidePageList.splice(i,1);
		break;
	    }
	this.SaveState();
    }

    // Check whether a sequence name is in the sequence list
    this.TestSequence = function(sequenceName)
    {
	for (var i=0; i < this.sequenceList.length; i++)
	    if (this.sequenceList[i] === sequenceName)
		return true;
	return false;
    }

    // Remove a sequence
    this.RemoveSequence = function(sequenceName)
    {
	// Remove sequence from sequence list
	for (var i=0; i<this.sequenceList.length; i++)
	    if (this.sequenceList[i] === sequenceName)
	    {
		// Remove this element from sequencelist
		this.sequenceList.splice(i,1);
		break;
	    }

	this.SaveState();

	this.storage.removeItem("Daily_Sequence_" + sequenceName);
    }

    // Store a new or modified sequence
    this.SaveSequence = function(sequenceName, sequenceCode)
    {
	if (!this.TestSequence(sequenceName))
	{
	    // Add sequenceName to sequenceList and save
	    this.sequenceList.push(sequenceName);
	    this.SaveState();
	}
	
	// Save the sequence code
	this.storage.setItem("Daily_Sequence_" + sequenceName, sequenceCode);

	// Update the daily window
	floatingDaily.Draw();
    }

    // Load and parse a given new sequence name
    this.LoadSequence = function(newSequenceName)
    {
	// Set the current sequence name and reinitialize taskList

	if (!(this.sequenceName === newSequenceName))
	{
	    // Only reset the sequencename and tasknum if this is not the current sequence in use
	    this.sequenceName = newSequenceName;
	    this.taskNum = 1;
	}
	
	// Initialize empty tasklist
	this.taskList = new Array();

	// Load newSequenceName from memory and parse into this.taskList
	var strSequenceData = this.storage.getItem("Daily_Sequence_" + newSequenceName, "");
	if (!strSequenceData)
	    return; // no sequence data to be loaded

	var sequenceData = strSequenceData.split("@NewTask");

	// Implementation of sequence code goes into task 0
	if (sequenceData[0].indexOf("@SequenceCode") > -1)
	    this.taskList.push(new Task("SequenceCode", sequenceData[0]));
	else
	    this.taskList.push(null);

	// Input the various tasks to be performed
	for (i=1; i < sequenceData.length; i++)
	{
	    // Default taskname from a line such as "//@TaskName: Example Task Name"
	    var taskname;
	    var res = /@TaskName: (.+)(?=\r|\n)/.exec(sequenceData[i]);

	    if (res)
		taskname = res[1];
	    else
		taskname = "task " + i; // default taskname

	    this.taskList.push(new Task(taskname, sequenceData[i]) );
	} 

	// Add a final ending task which does nothing
	this.taskList.push(new Task("Done", "ShowMsg(\"Sequence Complete!\")"));
	
    }

    this.SaveState = function()
    {
	// Save the current state of this script (sequence name, task number, flags in use)

	this.storage.setItem("Daily_SequenceList", this.sequenceList.join("|") );
	this.storage.setItem("Daily_HidePageList", this.hidePageList.join("|") );
	this.storage.setItem(this.namePlayer + "_DailyTaskNum", this.taskNum);
	this.storage.setItem(this.namePlayer + "_Daily_" + this.sequenceName + "_Flags", this.flagStr );
	this.storage.setItem(this.namePlayer + "_DailySequenceName", this.sequenceName);
    }

    this.LoadState = function()
    {
	// Load the previous state of this script (sequence name, task number, flags in use)

	this.sequenceList = this.storage.getItem("Daily_SequenceList", this.sequenceList ).split("|");
	this.hidePageList = this.storage.getItem("Daily_HidePageList", this.hidePageList ).split("|");
	this.sequenceName = this.storage.getItem(this.namePlayer + "_DailySequenceName", "");

	if (this.sequenceName)
	{
	    this.taskNum = parseInt( this.storage.getItem(this.namePlayer + "_DailyTaskNum", "0") );
	    this.flagStr = this.storage.getItem(this.namePlayer + "_Daily_" + this.sequenceName + "_Flags", "|" );
	}

	// remove leading empty sequence strings
	//   problem only occurs intially (I think)
	if (this.sequenceList[0] === "")
	{
	    this.sequenceList.splice(0,1);
	    this.SaveState();
	}

	if (this.hidePageList[0] === "")
	{
	    this.hidePageList.splice(0,1);
	    this.SaveState();
	}
    }
    
    // Load the current state
    this.LoadState();

    // Load the sequence corresponding to the current state
    this.LoadSequence(this.sequenceName);
}



// task object has a description to be shown and a function that gets called
function Task(taskname, taskfun)
{
    this.taskname = taskname;
    this.taskfun = taskfun;
}

function Jutsu(name, code)
{
    this.name = name;
    this.code = code;
}

function Mission(name, jutsu, allyget, type, diff, succ)
{
    this.name = name;
    this.jutsu = jutsu;
    this.type = type;
    this.diff = diff;
    this.succ = succ;
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


function FloatingDaily() 
{

    this.window = new Window("floatingDaily", data.storage);
    
    // Add css style for report window
    GM_addStyle("#floatingDaily {border: 2px solid #000000; position: fixed; z-index: 100; " +
		"color: #000000; background-color: #FFFFFF; padding: 5; text-align: left; " +
		"overflow-y: auto; overflow-x: auto; width: 200; height: 500; " +
		"background: none repeat scroll 0% 0% rgb(216, 216, 216);}");

    this.Draw = function()
    {
	// Test whether the daily window should be drawn on this page
	if (data.TestHidePage(location.href))
	{
	    this.Hide();
	    return;
	}

	// Show the window if not already
	this.window.show();

	// Helper array to build the HTML
	var arr = new Array();
	
	arr.push('<table width="200"><tr><td align="left">Daily Helper</td>',
		 '<td align="right"><p style="margin: 0pt; text-align: right;">',
		 '<a href="javascript:void(0)" id="DailyHidePageButton">',
		 '(Hide)</a></p></td></tr></table><br>');

	arr.push("Sequence: <b>" + data.sequenceName + "</b><br><br>");
	
	arr.push('<table width="200"><tr><td align="left">',
		 '<a href="javascript:void(0)" id="DailyBackTaskButton">',
		 '&lt;-----</a></td>');

	arr.push('<td align="center"><b>' + data.taskNum + '</b> / ' + (data.taskList.length-1) + '</td>');

	arr.push('<td align="right"><a href="javascript:void(0)" id="DailySkipTaskButton">',
		 '-----&gt;</a></td></tr></table><br>');
	
	if (data.taskNum > 0 && data.taskNum < data.taskList.length)
	    arr.push('Task: <b>' + data.taskList[data.taskNum].taskname + '</b>');
	else
	    arr.push('Task: Undefined Task');

	arr.push('<br><br><div id="DailyMsgDiv"></div><br><br>');

	arr.push('Your sequences:');
	
	// Generate list of sequence options to choose from
	for (var i=0; i<data.sequenceList.length; i++)
	{
	    var sequenceName = data.sequenceList[i];

	    arr.push('<p style="margin: 0pt; text-align: right;">',
		     '<a href="javascript:void(0)" val="' + sequenceName,
		     '" id="ChooseSequenceButton_' + sequenceName + '">',
		     sequenceName + ' &gt;</a></p>');
	}

	arr.push('<br><p style="margin: 0pt; text-align: left;">',
		 '<a href="javascript:void(0)" id="DailySequenceEditorButton">',
		 '&lt; Open Sequence Editor</a></p>');

	arr.push('<br><p style="margin: 0pt; text-align: left;">',
		 '<a href="https://docs.google.com/leaf?id=0B10D12_4U2KiNzYxZjY0YTEtYzU1Mi00Y2YzLTg5NGYtYWZlNGQzMDQyNDE0&hl=en" id="MoreSequencesButton" target="_blank">',
		 '&lt; Get More Sequences</a></p>');

//	arr.push("<b>Flags</b>:");
//	arr.push(data.flagStr.replace(/\|/g, "<br>"));
	
	// Concatenate everything in the array to form the html
	this.window.element.innerHTML = arr.join("");

	// Event handlers for sequenceList items
	for (var i=0; i<data.sequenceList.length; i++)
	{
	    var sequenceName = data.sequenceList[i];

	    var elem = document.getElementById("ChooseSequenceButton_" + sequenceName);
	    elem.addEventListener("click", function() { data.LoadSequence(this.id.split("_")[1]); data.SaveState(); floatingDaily.Draw(); }, false);
	}

	document.getElementById("DailyHidePageButton").addEventListener("click", floatingDaily.HidePage, true);
//	document.getElementById("DailyResetDataButton").addEventListener("click", floatingDaily.ResetData, true);
	document.getElementById("DailySkipTaskButton").addEventListener("click", floatingDaily.SkipTask, true);
	document.getElementById("DailyBackTaskButton").addEventListener("click", floatingDaily.BackTask, true);
	document.getElementById("DailySequenceEditorButton").addEventListener("click", floatingDaily.OpenSequenceEditor, true);
    }

    // Hide the window (and remove the interior)
    this.Hide = function()
    {
	this.window.element.innerHTML = "";
	this.window.hide();
    }

    this.showErr = function(err)
    {
	document.getElementById("DailyMsgDiv").innerHTML += err.message;
    }

    this.HidePage = function()
    {
	data.AddHidePage(location.href);
	floatingDaily.Hide();
    }

    this.ResetData = function()
    {
	data.taskNum = 1;
	data.flagStr = "|";
	data.SaveState();
	floatingDaily.Draw();
    }

    this.SkipTask = function()
    {
	IncrementTask();
    }

    this.BackTask = function()
    {
	// Temporary for debugging
	if (data.taskNum > 1)
	    data.taskNum--;
	data.SaveState();
	floatingDaily.Draw();
    }

    this.OpenSequenceEditor = function()
    {
	// Disable hotkeys
	hotkeyLock = true;

	// Initialize the Editor window if not already
	floatingEditor.Draw();

	// Load the current sequence if it exists
	if (data.TestSequence(data.sequenceName))
	    floatingEditor.LoadSequence(data.sequenceName);

	// Show the editor window
	floatingEditor.window.show();
    }
}




function FloatingEditor()
{

    this.window = new Window("floatingEditor", data.storage);

    // Add css style for report window
    GM_addStyle("#floatingEditor {border: 2px solid #000000; position: fixed; z-index: 100; " +
		"color: #000000; background-color: #FFFFFF; padding: 5; text-align: left; " +
		"overflow-y: auto; overflow-x: auto; width=600; height: 620; " +
		"background: none repeat scroll 0% 0% rgb(216, 216, 216);}");

    this.Draw = function()
    {
	// Helper array to build the HTML
	var arr = new Array();
	
	arr.push("Sequence Editor<br><br>");

	// Drop down box for things in the sequence list
	arr.push('Choose an existing sequence to edit:  ');
	arr.push('<select id="sequenceSelect">');
	for (var i=0; i < data.sequenceList.length; i++)
	    arr.push('<option value="' + data.sequenceList[i] + '">' + data.sequenceList[i] + '</option>');
	arr.push('</select>&nbsp&nbsp');

	arr.push('<a href="javascript:void(0)" id="EditorLoadSequenceButton">',
		 'Load Sequence &gt;</a><br>');

	arr.push('<br><br>');

	// Textbox for sequence code
	arr.push('<textarea id="sequenceCode" rows="30" cols="76"></textarea><br>');	

	// Remove button
	arr.push('<p style="margin: 0pt; text-align: left;">',
		 '<a href="javascript:void(0)" id="EditorDeleteSequenceButton">',
		 '&lt; Delete Sequence</a></p>');

	// Save button
	arr.push('<p style="margin: 0pt; text-align: right;">',
		 '<a href="javascript:void(0)" id="EditorSaveSequenceButton">',
		 'Save Sequence &gt;</a></p><br>');


	// Concatenate everything in the array to form the html
	this.window.element.innerHTML = arr.join("");

	floatingEditor.LoadSequence(data.sequenceName);
	document.getElementById("EditorSaveSequenceButton").addEventListener("click", floatingEditor.SaveSequence, true);
	document.getElementById("EditorDeleteSequenceButton").addEventListener("click", floatingEditor.DeleteSequence, true);
	document.getElementById("EditorLoadSequenceButton").addEventListener("click", floatingEditor.LoadSelectedSequence, true);

	// Load the textarea with a sample sequence
	var sequenceStr = 
	    "//@SequenceName: Default\n\n\n" +
	    "//------------------------------------------\n" +
	    "//@NewTask\n" +
	    "//@TaskName: Example Task 1\n\n" +
	    "ShowMsg(\"Example task 1 only shows this message\");\n\n\n" +
	    "//------------------------------------------\n" +
	    "//@NewTask\n" +
	    "//@TaskName: Example Task 2\n\n" +
	    "ShowMsg(\"Example task 2 is almost the same\");";

	document.getElementById("sequenceCode").value = sequenceStr;
    }

    // Hide the window (and remove the interior)
    this.Hide = function()
    {
	this.window.element.innerHTML = "";
	this.window.hide();
    }

    this.SaveSequence = function()
    {
	// Extract the sequence string
	var sequenceCode = document.getElementById("sequenceCode").value;
	var sequenceName;

	// Get the sequence name and verify correct input formatting
	try
	{
	    sequenceName = /@SequenceName: (.+)(?=\r|\n)/.exec(sequenceCode)[1];
	}
	catch(err)
	{
	    alert("Please enter a sequence name on the first line with format:\n" +
		  "//@SequenceName: Example Sequence Name");
	    return;
	}
	
	// Clean the string for only alphanumeric characters and spaces
	if ( !(sequenceName === sequenceName.replace(/[^a-zA-Z 0-9]+/g,'')) )
	{
	    alert("Alphanumeric characters and spaces only in sequence names");
	    return;
	}

	data.SaveSequence(sequenceName, sequenceCode);
	data.LoadSequence(sequenceName);

//	floatingEditor.Draw();	
//	document.getElementById("sequenceCode").value = sequenceCode;
    }

    this.LoadSelectedSequence = function()
    {
	var elem = document.getElementById("sequenceSelect");
	var sequenceName = elem.options[elem.selectedIndex].value;
	floatingEditor.LoadSequence(sequenceName);
    }

    this.DeleteSequence = function()
    {
	// Extract the sequence string
	var sequenceCode = document.getElementById("sequenceCode").value;
	var sequenceName;

	// Get the sequence name and verify correct input formatting
	try
	{
	    sequenceName = /@SequenceName: (.+)(?=\r|\n)/.exec(sequenceCode)[1];
	}
	catch(err)
	{
	    alert("Please enter a sequence name on the first line with format:\n" +
		  "//@SequenceName: Example Sequence Name");
	    return;
	}
	
	// Clean the string for only alphanumeric characters and spaces
	if ( !(sequenceName === sequenceName.replace(/[^a-zA-Z 0-9]+/g,'')) )
	{
	    alert("Alphanumeric characters and spaces only in sequence names");
	    return;
	}

	// Make sure the user really wants to do this
	if (!confirm("Are you sure you want to delete the sequence: \'" + sequenceName + "\'?"))
	    return;

	// Remove the sequence and reload the editor
	data.RemoveSequence(sequenceName);
	data.LoadSequence("");
	floatingEditor.LoadSequence("");
	floatingEditor.Draw();
	floatingDaily.Draw();
    }

    this.LoadSequence = function(sequenceName)
    {
	// If sequenceName is null do nothing
	if (!sequenceName)
	    return;

	// sequenceName is assumed to exist... error if not
	var sequenceStr = data.storage.getItem("Daily_Sequence_" + sequenceName, "");

	if (!sequenceStr)
	{
	    alert("Sequence " + sequenceName + " does not exist\nThis is an error that should be reported.");
	    return;
	}

	// Otherwise, load up the sequence text
	document.getElementById("sequenceCode").value = sequenceStr;

	// Also load up this sequence in browser cache
	data.LoadSequence(sequenceName);
	floatingDaily.Draw();
    }

    // hide the window by default
    this.window.hide();
}





////////////////////////////////////////////////////////////////////////
///////////             USER API FUNCTIONS               ///////////////
////////////////////////////////////////////////////////////////////////

//////////////// API Functions which halt task execution //////////////////

// Put up a message in the floating daily window
//     This function halts script execution
function ShowMsg(strMsg)
{
    if (!strMsg)
	strMsg = "";
    else
	strMsg += '<br>';
    throw new Error(strMsg);
}

// Submit a form with name strName and display message strMsg on success
//    This function always halts task execution
function FormSubmit(strName, strMsg)
{
    if (!strMsg)
	strMsg = 'Submitting Form: ' + strName;

    if (FormTest(strName))
    {
	// Success, submit the form and display the desired message
	document.forms.namedItem(strName).submit();
	ShowMsg(strMsg);
    }
    else
    {
	// Display error message for user to see
	ShowMsg('Form ' + strName + ' does not exist');
    }
}

// Move to the next task if possible
//    This function always halts task execution
function IncrementTask(strMsg)
{
    if (data.taskNum < data.taskList.length-1)
	data.taskNum++;
    data.SaveState();
    floatingDaily.Draw();

    ShowMsg(strMsg);
}

// Move to the next task if possible
//    This function does NOT halt task execution
function IncrementTaskNonBlock()
{
    if (data.taskNum < data.taskList.length-1)
	data.taskNum++;
    data.SaveState();
    floatingDaily.Draw();
}

// Move to next task if condition is true
//    This function halts task execution if condition is true
function IncrementTaskIf(cond, strMsg)
{
    if (cond)
	IncrementTask(strMsg);
}

// Change to new sequence (useful for chaining together separate sequences)
function ChangeSequence(strSequenceName, newTaskName)
{
    // Search for strSequenceName in sequence list
    for (var i=0; i < data.sequenceList.length; i++)
	if (data.sequenceList[i] === strSequenceName)
        {
	    // Load the sequence and set the task number if desired
	    data.LoadSequence(strSequenceName);

	    if (newTaskName)
	    {
		for (var j=1; j < data.taskList.length; j++)
		    if (data.taskList[j].taskname === newTaskName)
			data.taskNum = j;

	    }

	    // Save state
	    data.SaveState();

	    // Redraw the window
	    floatingDaily.Draw();

	    // Done
	    ShowMsg('Loaded Sequence: ' + strSequenceName);
	}

    // If code reaches this point, sequence does not exist
    ShowMsg('Sequence ' + strSequenceName + ' does not exist');
}


//////////////// API Functions which test the page for information //////////////////

// Test the document body HTML for the given text
function DocTest(strText)
{
    return (document.body.innerHTML.indexOf(strText) > -1);
}

// Test the href location for the given text
function LocationTest(strText)
{
    return (location.href.indexOf(strText) > -1);
}

// Test for the existence of a form with name = strName
function FormTest(strName)
{
    return (document.forms.namedItem(strName) ? true : false);
}

// Test whether a form input is already checked
function FormCheckTest(strFormName, strInputName, strInputValue)
{
    var strXPath = "";

    // Form name is optional, include it if necessary
    if (strFormName)
	strXPath += '//form[@name=\'' + strFormName + '\']';

    // Input name is mandatory (else we cannot find the input box...)
    strXPath += '//input[@name=\'' + strInputName + '\'';

    // Input value is also optional
    if (strInputValue)
	strXPath += ' and @value=\'' + strInputValue + '\'';
    strXPath += ']';

    var elem = document.evaluate(strXPath, document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;

    // Element does not exist
    if (!elem)
	return false;

    // Otherwise return checked state
    return elem.checked;
}



/////////////// API Functions to manipulate forms on the page //////////////

// Check a checkbox on a form
//    Returns false if element does not exist, or is disabled
function FormCheck(strFormName, strInputName, strInputValue)
{
    var strXPath = "";

    // Form name is optional, include it if necessary
    if (strFormName)
	strXPath += '//form[@name=\'' + strFormName + '\']';

    // Input name is mandatory (else we cannot find the input box...)
    strXPath += '//input[@name=\'' + strInputName + '\'';

    // Input value is also optional
    if (strInputValue)
	strXPath += ' and @value=\'' + strInputValue + '\'';
    strXPath += ']';

    var elem = document.evaluate(strXPath, document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;

    // Return without action if element does not exist or is disabled
    if (!elem || elem.disabled)
	return false;

    // Otherwise check the box and return true
    elem.checked = "checked";
    return true;
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

// Set .value field of an Input object
function FormSetValue(strFormName, strInputName, newValue)
{
    var strXPath = "";

    // Form name is optional, include it if necessary
    if (strFormName)
	strXPath += '//form[@name=\'' + strFormName + '\']';

    // Input name is mandatory (else we cannot find the input box...)
    strXPath += '//input[@name=\'' + strInputName + '\']';

    var elem = document.evaluate(strXPath, document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;

    // Return without action if element does not exist or is disabled
    if (!elem || elem.disabled)
	return false;

    // Otherwise check the box and return true
    elem.value = newValue;
    return true;
}

// Get .value field of an Input object
function FormGetValue(strFormName, strInputName)
{
    var strXPath = "";

    // Form name is optional, include it if necessary
    if (strFormName)
	strXPath += '//form[@name=\'' + strFormName + '\']';

    // Input name is mandatory (else we cannot find the input box...)
    strXPath += '//input[@name=\'' + strInputName + '\']';

    var elem = document.evaluate(strXPath, document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;

    // Return without action if element does not exist or is disabled
    if (!elem)
	return false;

    // Otherwise check the box and return true
    return elem.value;
}




////////////// API Functions which navigate around the BvS world //////////////

// Helper function to interact with BvS menus
function GoMenuPage(strMenuItem)
{
    var menucell = document.evaluate('//a[text()="' + strMenuItem + '"]', document, null,
				     XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;				     
    FormSubmit(menucell.href.split(":")[1].split(".")[1], 'Moving to page: ' + strMenuItem);
};

// General function to go to any (or at least most) bvs page
function GoPage(strPageName)
{
    // Class to define how to get to a specific page
    //    funLoad is a function which loads the desired page (starting on the prereq page)
    //    strPrereq indicates whether we should start from a simpler page
    //    funTest is a function which determines whether we are already on the correct page

    function objPage(funLoad, strPrereq, funTest)
    {
	this.funLoad = funLoad;
	this.strPrereq = strPrereq;
	this.funTest = funTest;
    };

    // Create the list of page objects
    var pageList = {
	// Main menu items
	main:           new objPage(function(){GoMenuPage('Main');},        null, function(){return LocationTest('/bvs/pages/main.html');}   ),
	village:        new objPage(function(){GoMenuPage('Village');},     null, function(){return LocationTest('/bvs/village.html');}      ),
	partyhouse:     new objPage(function(){GoMenuPage('Party House');}, null, function(){return LocationTest('/bvs/partyhouse.html');}   ),
	shop:           new objPage(function(){GoMenuPage('Shop');},        null, function(){return LocationTest('/bvs/shop.html');}         ),
	consumables:    new objPage(function(){GoMenuPage('Consumables');}, null, function(){return LocationTest('/bvs/oneuseitems.html');}  ),
	worldkaiju:     new objPage(function(){GoMenuPage('WorldKaiju');},  null, function(){return LocationTest('/bvs/worldkaiju.html');}   ),
	missions:       new objPage(function(){GoMenuPage('Missions');},    null, function(){return LocationTest('/bvs/missionstart.html') || LocationTest('/bvs/missions');} ),
	quests:         new objPage(function(){GoMenuPage('Quests');},      null, function(){return LocationTest('/bvs/quests.html') || LocationTest('/bvs/questattempt.html') || LocationTest('/bvs/chuninexam.html');}       ),
	spar:           new objPage(function(){GoMenuPage('Spar');},        null, function(){return LocationTest('/bvs/spar.html');}         ),
	arena:          new objPage(function(){GoMenuPage('Arena');},       null, function(){return LocationTest('/bvs/arena.html');}        ),
	team:           new objPage(function(){GoMenuPage('Team');},        null, function(){return LocationTest('/bvs/team.html');}         ),
	jutsu:          new objPage(function(){GoMenuPage('Jutsu');},       null, function(){return LocationTest('/bvs/jutsu.html');}        ),
	summons:        new objPage(function(){GoMenuPage('Summons');},     null, function(){return LocationTest('/bvs/summon.html');}       ),
	bucket:         new objPage(function(){GoMenuPage('Bucket');},      null, function(){return LocationTest('/bvs/bucket.html');}       ),

	// Party house menu items
	ph_tipline:     new objPage(function(){GoMenuPage('Tip Line');},       'partyhouse', function(){return FormTest('tipline');} ),
	ph_juicebar:    new objPage(function(){GoMenuPage('\'Juice\' Bar');},  'partyhouse', function(){return FormTest('br');} ),
	ph_firstloser:  new objPage(function(){GoMenuPage('First Loser');},    'partyhouse', function(){return DocTest('Four times a day a new First Loser contest begins (and the old one finishes).');} ),
	ph_wheel:       new objPage(function(){GoMenuPage('Wheel');},          'partyhouse', function(){return FormTest('raf');} ),
	ph_jackpot:     new objPage(function(){GoMenuPage('Jackpot');},        'partyhouse', function(){return FormTest('ninrou');} ),
	ph_lottery:     new objPage(function(){GoMenuPage('Lottery');},        'partyhouse', function(){return FormTest('el');} ),
	ph_tsukiball:   new objPage(function(){GoMenuPage('Tsukiball');},      'partyhouse', function(){return FormTest('skib');} ),
	ph_bigboard:    new objPage(function(){GoMenuPage('Big Board');},      'partyhouse', function(){return DocTest('<b>The Big Board</b>');} ),
	ph_scratchies:  new objPage(function(){GoMenuPage('Scratchies');},     'partyhouse', function(){return FormTest('scratch') || FormTest('mainform2');} ),
	ph_darts:       new objPage(function(){GoMenuPage('Darts');},          'partyhouse', function(){return FormTest('dgame');} ),
	ph_partyroom:   new objPage(function(){GoMenuPage('Party Room');},     'partyhouse', function(){return FormTest('pr');} ),
	ph_crane:       new objPage(function(){GoMenuPage('Crane');},          'partyhouse', function(){return FormTest('cgame');} ),
	ph_over11k:     new objPage(function(){GoMenuPage('Over 11K');},       'partyhouse', function(){return FormTest('over11');} ),
	ph_snakeman:    new objPage(function(){GoMenuPage('SNAKEMAN');},       'partyhouse', function(){return FormTest('newsnake');} ),
	ph_roulette:    new objPage(function(){GoMenuPage('Roulette');},       'partyhouse', function(){return LocationTest('/bvs/partyhouse-roulette.html');} ),
	ph_mahjong:     new objPage(function(){GoMenuPage('Mahjong');},        'partyhouse', function(){return LocationTest('/bvs/partyhouse-mahjong.html');} ),
	ph_superfail:   new objPage(function(){GoMenuPage('SUPERFAIL');},      'partyhouse', function(){return LocationTest('/bvs/partyhouse-superfail.html');} ),
	ph_pigeons:     new objPage(function(){GoMenuPage('Pigeons');},        'partyhouse', function(){return LocationTest('/bvs/partyhouse-keno.html');} ),
	ph_flowerwars:  new objPage(function(){GoMenuPage('Flower Wars');},    'partyhouse', function(){return LocationTest('/bvs/partyhouse-hanafuda.html');} ),

	// Linked from village
	fields:         new objPage(function(){FormSubmit('fieldmenu');},  'village', function(){return LocationTest('/bvs/villagefields.html');}   ),
	phases:         new objPage(function(){FormSubmit('phases');},     'village', function(){return LocationTest('/bvs/villagephases.html') || LocationTest('/bvs/villager00t.html');} ),
	bingo:          new objPage(function(){FormSubmit('bbook');},      'village', function(){return LocationTest('/bvs/bingo');}   ),
	jutsuenhance:   new objPage(function(){FormSubmit('jenhance');},   'village', function(){return LocationTest('/bvs/villagejenhance.html');}   ),
	billycon:       new objPage(function(){FormSubmit('concenter');},  'village', function(){return LocationTest('/bvs/billycon-register.html');}  ),
	robofighto:     new objPage(function(){FormSubmit('robofighto');}, 'village', function(){return LocationTest('/bvs/villagerobofighto.html');}  ),
	zrewards:       new objPage(function(){FormSubmit('zrt');},        'village', function(){return LocationTest('/bvs/zombjarewards.html');}  ),
	kaiju:          new objPage(function(){FormSubmit('kat');},        'village', function(){return LocationTest('/bvs/villagemonsterfight');}   ),
	pizzawitch:     new objPage(function(){FormSubmit('pizzamenu');},  'village', function(){return LocationTest('/bvs/pizzawitch.html') || LocationTest('/bvs/pizzawitchgarage.html');}  ),

	// Linked from billycon
	glowslinging:   new objPage(function(){FormSubmit('glowsling');},   'billycon', function(){return LocationTest('/bvs/billycon-glowslinging.html') || LocationTest('/billycon-glowslingfight.html');}   ),

	// Linked from main page
	themes:         new objPage(function(){FormSubmit('theme');},   'main', function(){return LocationTest('/bvs/themesdifficulty.html');}  ),
	tinybeevault:   new objPage(function(){FormSubmit('tinybee');}, 'main', function(){return LocationTest('/bvs/tinybees.html');}  ),
	sponsoritem:    new objPage(function(){FormSubmit('sponsor');}, 'main', function(){return LocationTest('/bvs/sponsoritems.html');}  ),
	favors:         new objPage(function(){FormSubmit('sandstorm');}, 'main', function(){return LocationTest('/bvs/sandstorm.html');}  ),
	reaperblood:    new objPage(function(){FormSubmit('reaper');}, 'main',  function(){return LocationTest('/bvs/reaper.html');}  ),
	driftstyle:     new objPage(function(){FormSubmit('drifter');}, 'main', function(){return LocationTest('/bvs/drifter.html');}  ),
	avatar:         new objPage(function(){FormSubmit('avatar');}, 'main', function(){return LocationTest('/bvs/avatar.html');}  ),


	blank:          new objPage(null,null,null)
    };

    // Extract the page from the pageList object
    var page = pageList[strPageName];
    if (!page)
	throw new Error('Page list object: ' + strPageName + ' does not exist');
    
    // Test whether we are already on the correct page
    if (page.funTest())
	return;  // Early return, on a good page

    // If a prerequisite page is listed, go to it first
    if (page.strPrereq)
	GoPage(page.strPrereq);

    // Finally, move to the desired page
    page.funLoad();
    ShowMsg('Moving to page: ' + strPageName);
}

// Get a mission of a given rank
function GetMission(rank)
{
    GoPage('missions');

    if ( !LocationTest("/bvs/missionstart.html") )
	return;

    objMissionLookup = {
	D:    "d",
	genD: "gd",
	ninD: "nd",
	taiD: "td",

	C:    "c",
	genC: "gc",
	ninC: "nc",
	taiC: "tc",

	B:    "b",
	genB: "gb",
	ninB: "nb",
	taiB: "tb",

	A:    "a",
	genA: "ga",
	ninA: "na",
	taiA: "ta",

	AA:    "aa",
	genAA: "gaa",
	ninAA: "naa",
	taiAA: "taa",

	Reaper:    "reaper",
	genReaper: "greaper",
	ninReaper: "nreaper",
	taiReaper: "treaper",

	Monochrome:    "monochrome",
	genMonochrome: "gmonochrome",
	ninMonochrome: "nmonochrome",
	taiMonochrome: "tmonochrome",

	Outskirts:    "outskirts",
	Wasteland:    "wasteland",
	Burgerninja:  "burger",
	Pizzawitch:   "pizza",
	Witchinghour: "witch",
	S:            "s",

	Blank: ""
    };
    
    FormSubmit("misform" + objMissionLookup[rank], 'Getting ' + rank + ' rank mission');
}

// Set the r00t field keys
function SetField(key1, key2, key3)
{
    GoPage('fields');

    // See whether we are on the right field
    if ( key1 && key2 && key3 &&
	 (!DocTest("<b>"+key1+"</b></td>") ||
	  !DocTest("<b>"+key2+"</b></td>") ||
	  !DocTest("<b>"+key3+"</b></td>")) )
    {
	// Go to the right field if possible
	if ( FormSelect(null, 'key_1', null, key1) &&
	     FormSelect(null, 'key_2', null, key2) &&
	     FormSelect(null, 'key_3', null, key3) )
	{
	    FormSubmit('field', 'Changing to: ' + key1 + ' ' + key2 + ' ' + key3);
	}
    }
}





//////////////// API Functions for running missions //////////////////

// Enable megamissions -- this function might go away
function EnableMegamissions()
{
    GoPage('missions');
    IncrementTaskIf(DocTest("<i>MegaMissions Active!</i>"));
    FormSubmit('megamis', 'Enabling megamissions');
}

// Simple attempt for current mission with given jutsu... does not return, always throws exception
function MissionAttempt(jutsu)
{
    if (!jutsu)
    {
	jutsu = { code: -1, name: '' };
    }

    // Blindly attempt the mission using the given jutsu
    if (FormTest('domission'))
	FormSubmit('domission');

    if (FormTest('attempt'))
    {
	if (jutsu.code > -1)
	    FormCheck(null, 'usejutsu', "" + jutsu.code);
	FormSubmit('attempt', 'Attempting mission with jutsu: ' + jutsu.name);
    }

    // Show message
    ShowMsg("Attempting mission with jutsu: " + jutsu.name);
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

// Function to attempt a mission based on difficulty and success (before crank) in addition to name and mission type
function MissionDetailedStackAttempt(stack, defaultjutsu)
{
/*
<div class="miscontainer"><div class="misshadow"><div class="miscontent_g"><div class="miscontent2" align="left">
<div class="misstat_g">Genjutsu</div><center>
<font style="font-size: 18px;"><b>Wander the Sands</b></font><br>The Wasteland is endless..<br><b><i><font style="font-size: 16px;">Crank Level: 27</font></i></b>
<i><font style="font-size: 12px;"><br>(+27 Diff, +27 Succ, +135% Ryo)</font></i><font style="font-size: 12px;"></font><br><br>
<div class="misonestat_g"><table class="misonetable"><tbody><tr><td align="right">Difficulty 40&nbsp;&nbsp;&nbsp;Successes 36&nbsp;</td></tr></tbody></table></div>
*/

    // Get the mission name
    var missioncell = document.evaluate('//div[@class="miscontainer"]/div/div/div/center/font/b', document, null,
					XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
    var strMissionName = missioncell.innerHTML;

    // Get mission type
    missioncell = document.evaluate('//div[@class="miscontainer"]/div/div/div/div', document, null,
					XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
    var strMissionType = missioncell.innerHTML;

    // Get crank
    var numMissionCrank;
    if (DocTest('Crank Level'))
    {
	missioncell = document.evaluate('//div[@class="miscontainer"]/div/div/div/center', document, null,
					XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	numMissionCrank = parseInt(/Crank Level: (\d+)</.exec(missioncell.innerHTML)[1], 10);
    }
    else
	numMissionCrank = 0;

    // Get difficulty and successes
    missioncell = document.evaluate('//div[@class="miscontainer"]/div/div/div/center/div/table/tbody/tr/td', document, null,
					XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;

    // Difficulty 40&nbsp;&nbsp;&nbsp;Successes 36&nbsp;
    var numMissionDiff = parseInt(/Difficulty (\d+)&/.exec(missioncell.innerHTML)[1], 10) - numMissionCrank;
    var numMissionSucc = parseInt(/Successes (\d+)&/.exec(missioncell.innerHTML)[1], 10) - numMissionCrank;

    // stack is an array of Mission objects
    for (var i in stack)
	if (stack[i].name == strMissionName &&
	    stack[i].type == strMissionType &&
	    stack[i].diff == numMissionDiff &&
	    stack[i].succ == numMissionSucc) 
        {
	    if (stack[i].allyget)
		CheckAllyGet(stack[i].allyget);

	    MissionAttempt(stack[i].jutsu);
	}

    // This point is not reached unless mission is not in the stack

    // Default jutsu
    MissionAttempt(defaultjutsu);
}



/////////////  API Functions for doing quests ///////////////////

// Generic function to perform quest steps -- jutsu selection is currently broken
function DoGenericQuest(quest, endstep, jutsu)
{
    // Ensure that we are on the quest page or go there
    //    This function also continues a quest in progress
    GoPage('quests');

    if (FormTest('questcontinue'))
	FormSubmit('questcontinue');

    // safeguard against bad code for eval statement
    if (typeof(quest.code) != "number")
	ShowMsg("quest.code must be a number");

    // Sanity check to make sure that we are on the correct page
    if (!DocTest(quest.name))
	ShowMsg("We are on the wrong quest?!?");

    // Select the desired quest to start
    if (FormTest('quest' + quest.code))
	FormSubmit("quest" + quest.code);

    // Check termination conditions
    if ( (endstep == -1 && DocTest("--Epilogue--")) || 
	 DocTest("--Part " + endstep + " of " + quest.numsteps + "--") )
    {
	if (quest.flag)
	{
	    data.SetFlag(quest.flag);
	    data.SaveState();
	}

	// Manually increment the task without halting execution
	if (data.taskNum < data.taskList.length-1)
	    data.taskNum++;
	data.SaveState();
	floatingDaily.Draw();

	GoMenuPage('Quests');
	return;
    }

    // Set the requested jutsu
    if (jutsu && FormTest('attack'))
	FormCheck(null, 'usejutsu', '' + jutsu.code);

//	document.getElementById(jutsu.code).checked = "checked";

    // Blindly attempt the quest if we get this far

    if (FormTest('attack'))
	FormSubmit('attack');

    if (FormTest('goquest'))
	FormSubmit('goquest');
}


////////////// API Functions primarily for convenience / miscellaneous /////////////

// Generic function to set flags based on an ally we might get on this page
//    ally is an object of type Ally
function CheckAllyGet(strAllyName)
{
    // Somewhat better version of CheckStuffGet()
    if (DocTest("You got an Ally!<br><b>" + strAllyName + "!</b>") ||
	DocTest("<b>" + strAllyName + " joins you!</b>") ||
	DocTest("<b>" + strAllyName + " joins your party!</b>")  ||
	DocTest("<b>" + strAllyName + " joined your party!</b>") ||
	DocTest("You got <b>" + strAllyName + "!</b>")   )
    {
	data.SetFlag(strAllyName);
	data.SaveState();
	ShowMsg("Got ally:" + strAllyName);
    }

    // Ally Level 2
    if (DocTest("Level Up!<br><b>" + strAllyName + "</b> is now <b>" + strAllyName + " Lvl. 2!</b>"))
    {
	data.SetFlag(strAllyName + " Lvl. 2");
	data.SaveState();
	ShowMsg("Got " + strAllyName + " Lvl. 2");
    }

    // Ally Level 3
    if (DocTest("<b>" + strAllyName + " is now Lvl. 3!</b>")) // specific to stalker3 for now
    {
	data.SetFlag(strAllyName + " Lvl. 3");
	data.SaveState();
	ShowMsg("Got " + strAllyName + " Lvl. 3");
    }
}

// Set themes
function SetThemes(theme1, theme2, theme3, theme4)
{
    GoPage('themes');

    if (theme1 && !FormCheckTest('themes1', 'theme_entry_1', theme1))
    {
	FormCheck('themes1', 'theme_entry_1', theme1);
	FormSubmit('themes1');
	ShowMsg("Setting Opening Theme");
    }
    
    if (theme2 && !FormCheckTest('themes2', 'theme_entry_2', theme2))
    {
	FormCheck('themes2', 'theme_entry_2', theme2);
	FormSubmit('themes2');
	ShowMsg("Setting Battle Theme");
    }
    
    if (theme3 && !FormCheckTest('themes3', 'theme_entry_3', theme3))
    {
	FormCheck('themes3', 'theme_entry_3', theme3);
	FormSubmit('themes3');
	ShowMsg("Setting Ending Theme");
    }
    
    if (theme4 && !FormCheckTest('themes4', 'theme_entry_4', theme4))
    {
	FormCheck('themes4', 'theme_entry_4', theme4);
	FormSubmit('themes4');
	ShowMsg("Setting Overworld Theme");
    }    
}



// Change teams -- exact text strings for ally names required
function TeamChange(strAllyName1, strAllyName2, strAllyName3)
{
    GoPage('team');

    // Confirm teams without thinking
    if (FormTest('conteam'))
	FormSubmit('conteam');

    // Check whether the task is already complete
    var indstart = document.body.innerHTML.indexOf("<b>-Current Team-</b>");
    var ind1 = document.body.innerHTML.indexOf("<b>" + strAllyName1, indstart);
    var ind2 = document.body.innerHTML.indexOf("<b>" + strAllyName2, indstart);
    var ind3 = document.body.innerHTML.indexOf("<b>" + strAllyName3, indstart);
    var indend = document.body.innerHTML.indexOf("Save current team as Quickteam:");

    IncrementTaskIf(ind1 < indend && ind2 < indend && ind3 < indend);

    // Helper function to test each element against the ally name
    function AllyTest(strFor, strText)
    {
	return (strFor.indexOf('id_') > -1 &&
		( strText.indexOf('<b>' + strAllyName1) > -1 ||
		  strText.indexOf('<b>' + strAllyName2) > -1 ||
		  strText.indexOf('<b>' + strAllyName3) > -1 ) );
    };


    // Get a snapshot for each message in the village chat
    var snapMessageList = document.evaluate("//label", document, null,
					 XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

    // Examine each snapshot
    for (var i=0; i<snapMessageList.snapshotLength; i++)
    {
	var snap = snapMessageList.snapshotItem(i);

	if (AllyTest(snap.htmlFor, snap.innerHTML))
	    document.getElementById(snap.htmlFor).checked = "checked";
    }

    // Submit the form
    FormSubmit('maketeam');
}



////////////////////////////////////////////////////////////////////////
///////////                 DAILY CODE                 /////////////
////////////////////////////////////////////////////////////////////////

function DailyStep()
{
    // Perform a single step of daily
    try
    {
	// Execute SequenceCode if it exists, stored in task 0
	if (data.taskList[0])
	    eval(data.taskList[0].taskfun);

	// Call the next function in the tasklist
	eval(data.taskList[data.taskNum].taskfun);
    }
    catch(err)
    {
	// Report the error or message on the floating window
	floatingDaily.showErr(err);
    }
}



////////////////////////////////////////////////////////////////////////
///////////                  HOTKEY CODE                   /////////////
////////////////////////////////////////////////////////////////////////

var hotkeyLock = false;
var keyDailyCheckRecentEscape = false;

function KeyCheck(event) 
{
    var KeyID = event.keyCode;

    // Lock hotkeys if daily window is hidden
    if (data.TestHidePage(location.href))
	hotkeyLock = true;
    
    if ( (KeyID == 192 || KeyID == 61) && !hotkeyLock) // backquote key or equals: ` or =
    {
	// Lock hotkey usage to protect from button spamming
	hotkeyLock = true;

	// Perform one daily step
	DailyStep();

	// Unlock hotkey usage
	hotkeyLock = false;
    }

    if (KeyID == 27) // escape key
    {
	// Close editor window if not already and unlock hotkeys
	floatingEditor.Hide();
	hotkeyLock = false;

	// Unhide daily window if hidden
	if (data.TestHidePage(location.href))
	{
	    data.RemoveHidePage(location.href);
	    floatingDaily.Draw();
	}
	
	// If escape is pressed twice in succession, reset the window positions
	if (keyDailyCheckRecentEscape)
	{
	    floatingEditor.window.reset();
	    floatingDaily.window.reset();
	}
	else
	{
	    keyDailyCheckRecentEscape = true;
	    setTimeout(function(){keyDailyCheckRecentEscape = false;}, 1000);
	}
    }

    if (KeyID == 37 && !hotkeyLock) // left arrow
	floatingDaily.BackTask();

    if (KeyID == 39 && !hotkeyLock) // right arrow
	floatingDaily.SkipTask();
}

document.documentElement.addEventListener("keyup", KeyCheck, true);




////////////////////////////////////////////////////////////////////////
///////////             PAGE LOAD RUNTIME                ///////////////
////////////////////////////////////////////////////////////////////////


// Initialize the jutsus object
var jutsus = {
    // Jutsu(name, code)
    
    SRS:       new Jutsu("Soul Reaper Style: Lunch, SandySword!", 499),
    MBST:      new Jutsu("Mind Body Switch Technique", 393),
    PWK:       new Jutsu("Projectile Weapons: Kunai", 373),
    Redeye:    new Jutsu("RedEye",  500),
    Clone:     new Jutsu("Clone Jutsu", 368),
    Disguise:  new Jutsu("Disguise Jutsu", 370),
    ETA:       new Jutsu("Exploding Tags: Activate", 371),
    PWS:       new Jutsu("Projectile Weapons: Shuriken", 372),
    Escape:    new Jutsu("Escape Jutsu", 374),
    FSFJ:      new Jutsu("Fire Style: Fireball Jutsu", 376),
    OI:        new Jutsu("Obsessive Insight", 466),

    PSPDP:     new Jutsu("Pinky Style: Pervert-Destroying Punch", 416),
    AOTNS:     new Jutsu("Attack on the Nervous System", 429),
    FOS:       new Jutsu("Flock of Seagulls", 419),

    EDUT:      new Jutsu("Epic Dog Urination Technique", 421),
    KICHC:     new Jutsu("Kido: I can has cheeseburger", 484),
    INT:       new Jutsu("I Need This", 497),

    FGTT:      new Jutsu("Flying Thunder God Technique", 448),
    BSTIS:     new Jutsu("Billy Style: This is Sparta", 444),

    SSFLB:     new Jutsu("Stalker Style: Freaking Laser Beams", 418),

    SRSIN:     new Jutsu("Soul Reaper Style: Imperishable Night", 480),

    Diagnosis: new Jutsu("Diagnosis", 485),

    Blank:     new Jutsu("", -1)
};

// Initialize the quests object
var quests = {
    // Quest(name, code, numsteps, flag)
    ShowWatchin: new Quest("Watchin' Your Shows", 8, 1),

    Blank:     new Quest("", -1, -1, "")
}


// Create global instance of daily data object
var data = new dailyData();
    
// Create the floating window objects
var floatingDaily = new FloatingDaily();
var floatingEditor = new FloatingEditor();

floatingDaily.Draw();