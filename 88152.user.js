// ==UserScript==
// @name           Gmail Basic Helper
// @namespace      http://userscripts.org/users/irzan2010
// @description    Helper for Gmail in basic HTML mode.
// @version        1.0
// @include        https://mail.google.com/mail/*
// @include        http://mail.google.com/mail/*
// @require        http://sizzlemctwizzle.com/updater.php?id=88152&show
// ==/UserScript==

// find location for place a dropdownlist
var tLocation = document.getElementsByName("tact"); // top location
var bLocation = document.getElementsByName("bact"); // bottom location

// create 2 dropdownlist (top & bottom)
var tBox = document.createElement("span");
var bBox = document.createElement("span");

tBox.innerHTML =
	'<select id="tddMsg">'+
	'<option>Mark unread message(s)</option>'+
	'<option>Mark readed message(s)</option>'+
	'<option>Mark all messages</option>'+
	'<option selected>Mark none</option>'+
	'</select>&nbsp;';

bBox.innerHTML =
	'<select id="bddMsg">'+
	'<option>Mark unread message(s)</option>'+
	'<option>Mark readed message(s)</option>'+
	'<option>Mark all messages</option>'+
	'<option selected>Mark none</option>'+
	'</select>&nbsp;';

// insert the dropdownlist into page
tLocation[0].parentNode.insertBefore(tBox, tLocation[0]);
bLocation[0].parentNode.insertBefore(bBox, bLocation[0]);


// register "onchange" event for both dropdownlist
tDdl = document.getElementById("tddMsg");
tDdl.addEventListener("change", function() {markCheckBox(tDdl.selectedIndex)}, false);

bDdl = document.getElementById("bddMsg");
bDdl.addEventListener("change", function() {markCheckBox(bDdl.selectedIndex)}, false);

// global variable for use in function below
var chk = document.getElementsByName("t");

// mark checkbox based on dropdownlist selection
function markCheckBox(selIndex)
{
	if (selIndex == 0)
	{
		// clear all checked
		markNone();
		// then find an unread message and checked it
		for (a=0; a<chk.length; a++)
		{
			if (isUnread(chk[a]) == true)
			{
				chk[a].checked = true;
			}
		}
	}
	else if (selIndex == 1)
	{
		// clear all checked
		markNone();
		// find a readed message and checked it
		for (b=0; b<chk.length; b++)
		{
			if (isUnread(chk[b]) == false)
			{
				chk[b].checked = true;
			}
		}
	}
	else if (selIndex == 2)
	{
		// all message
		markAll();
	}
	else if (selIndex == 3)
	{
		// none checked
		markNone();
	}
}


// mark all checkboxes
function markAll()
{
	for (i=0; i<chk.length; i++)
		{
			chk[i].checked = true;
		}
}


// remove mark on all checkboxes
function markNone()
{
	for (j=0; j<chk.length; j++)
		{
			chk[j].checked = false;
		}
}


// check whether the item is unread message or not
function isUnread(chkBox)
{
	/*
	list item structure :
	list item (tr)
	|- td
	|--- checkbox
	*/
	var parent1 = chkBox.parentNode;
	var parent2 = parent1.parentNode; // parent2 is the "tr"
	if (parent2.getAttribute('bgcolor') == '#ffffff')
	{
		// this is an unread message
		return true;
	}
	else if (parent2.getAttribute('bgcolor') == '#e8eef7')
	{
		// this is a readed message
		return false;
	}
}

// ** End of script **