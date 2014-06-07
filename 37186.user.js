// ==UserScript==
// @name          	ActionRTM
// @namespace	http://www.rememberthemilk.com
// @description    	Creates a GTD-centric view of tasks within Remember The Milk
// @include       	http://www.rememberthemilk.com/*
// @include       	https://www.rememberthemilk.com/*
// ==/UserScript==

function Autocomplete(inputField, box, autocompleteStore, callback)
{
	this.inputField = inputField;
	this.box = box;
	this.autocompleteList = new AutocompleteList(inputField, autocompleteStore, this);
	this.callback = callback;
	this.hide();
	this.bind();
}

Autocomplete.prototype.show = function()
{
	this.box.wrappedJSObject.style.display = "block";
	this.inputField && this.inputField.focus();
}

Autocomplete.prototype.hide = function()
{
	this.box.wrappedJSObject.style.display = "none";
	this.inputField && (this.inputField.value = "");
	this.autocompleteList.clearOutput();
}

Autocomplete.prototype.doCallback = function()
{
	var completion = this.autocompleteList.getCurrentCompletion();
	this.hide();
	this.callback(completion);
}

Autocomplete.prototype.bind = function()
{
	var autocompleteList = this.autocompleteList;
	var inputField = this.inputField;
	var currentText = "";

	var handleKeyPressEvent = function(event)
	{
		currentText = inputField.value;
		if (event.keyCode == 9) // Tab
		{
			if (window.wrappedJSObject.utility)
				window.wrappedJSObject.utility.stopEvent(event);
			return false
		}
		else if (autocompleteList.isVisible)
		{
			if (event.keyCode == 13)// Enter
				autocompleteList.parent.doCallback();
			if (event.keyCode == 40)// Key down
				autocompleteList.highlightNextCompletion();
			else if (event.keyCode == 38)  // Key up
				autocompleteList.highlightPreviousCompletion();
			else if (event.keyCode == 27) // Esc
				autocompleteList.clearOutput();
		}
		else if (event.keyCode == 27)
			autocompleteList.parent.hide();
	
		return true;
	};
	var handleKeyUpEvent = function(event)
	{
		if (currentText === null || currentText != inputField.value)
			autocompleteList.update();
	};
	var handleClickEvent = function(event)
	{
		if (autocompleteList.isVisible)
			autocompleteList.hideOutput();

		if (window.wrappedJSObject.utility)
			window.wrappedJSObject.utility.stopEvent(event);
	}

	this.inputField.setAttribute("autocomplete", "off");
	this.inputField.addEventListener("keypress", handleKeyPressEvent, false);
	this.inputField.addEventListener("keyup", handleKeyUpEvent, false);
	this.box.addEventListener("click", handleClickEvent, false);
	this.autocompleteList.createOutput();
}

function AutocompleteList(inputField, autocompleteStore, parent)
{
	this.inputField = inputField;
	this.autocompleteStore = autocompleteStore;
	this.parent = parent;
	this.output = null;
	this.completions = null;
	this.position = -1;
	this.isVisible = false;
}

AutocompleteList.prototype.createOutput = function()
{
	if (!this.inputField) return;

	this.output = document.createElement('div');
	this.output.setAttribute('id','autoCompleteList_' + this.inputField.id);
	this.output.style.border = "solid 1px black";
	this.output.style.background = "white";
	this.output.style.position = "absolute";
	this.output.style.width = "150px";
	this.output.style.visibility = "hidden";

	this.inputField.parentNode.insertBefore(this.output, this.inputField.nextSibling);
}

AutocompleteList.prototype.showOutput = function()
{
	this.output && (this.output.style.visibility = "visible");
	this.isVisible = true;
}

AutocompleteList.prototype.hideOutput = function()
{
	this.output && (this.output.style.visibility = "hidden");
	this.isVisible = false;
}

AutocompleteList.prototype.clearOutput = function()
{
	while(this.output && this.output.childNodes.length)
		this.output.removeChild(this.output.firstChild);

	this.position = -1;
	this.hideOutput();
}

AutocompleteList.prototype.addCompletion = function(completion)
{
	var autocompleteList = this;

	var mouseOverHandler = function(event)
	{
		autocompleteList.position = this.position;
		autocompleteList.highlightCompletion();
	}

	var mouseClickHandler = function(event)
	{
		autocompleteList.parent.doCallback();
	}

	var completionBox = document.createElement("div");
	completionBox.style.textAlign = "left";
	completionBox.style.paddingLeft = "2px";
	completionBox.appendChild(document.createTextNode(completion));
	completionBox.wrappedJSObject.position = this.output.childNodes.length;
 	completionBox.addEventListener("mouseover", mouseOverHandler, false);
 	completionBox.addEventListener("click", mouseClickHandler, false);
	this.output.appendChild(completionBox);
}

AutocompleteList.prototype.highlightCompletion = function()
{
	if (this.output && this.output.childNodes)
	{
		for (var i = 0; i < this.output.childNodes.length; ++i)
		{
			if (i == this.position)
			{
				this.output.childNodes[i].style.color = "white";
				this.output.childNodes[i].style.background = "#316ac5";
			}
			else
			{
				this.output.childNodes[i].style.color = "black";
				this.output.childNodes[i].style.background = "white";
			}
		}
	}
}

AutocompleteList.prototype.highlightNextCompletion = function()
{
	if (this.completions && this.completions.length > 0 && this.position < this.completions.length - 1)
	{
		++this.position;
		this.highlightCompletion();
	}
}

AutocompleteList.prototype.highlightPreviousCompletion = function()
{
	if (this.completions && this.completions.length > 1 && this.position > 0)
	{
		--this.position;
		this.highlightCompletion();
	}
}

AutocompleteList.prototype.getCurrentCompletion = function()
{
	if (this.completions && this.completions.length > 0)
		return this.completions[this.position];

	return null;
}

AutocompleteList.prototype.update = function()
{
	if (this.inputField.value.length > 0)
	{
		this.completions = this.autocompleteStore.getCompletions(this.inputField.value);
		if (this.completions && this.completions.length > 0)
		{
			this.clearOutput();
			for (var i = 0; i < this.completions.length; ++i)
				this.addCompletion(this.completions[i]);

			this.showOutput();
			this.highlightNextCompletion();
		}
		else
		{
			this.hideOutput();
			this.position = -1;
		}
	}
	else
	{
		this.hideOutput();
		this.position = -1;
	}
}

function ListAutocompleteStore()
{
	
}

ListAutocompleteStore.prototype.getCompletions = function(text)
{
	if (window.wrappedJSObject.listTabs && window.wrappedJSObject.listTabs.entries && window.wrappedJSObject.listTabs.entries.length > 0)
	{
		var completions = new Array();

		for (var i = 0; i < window.wrappedJSObject.listTabs.entries.length; ++i)
		{
			if (window.wrappedJSObject.listTabs.entries[i].toLowerCase().indexOf(text.toLowerCase()) == 0)
				completions.push(window.wrappedJSObject.listTabs.entries[i]);
		}

		return completions;
	}

	return null;
}

window.wrappedJSObject.autocompletes = {};

var createAutoComplete = function(name, callback)
{
	var autocompleteBox = document.createElement('div');

	autocompleteBox.setAttribute("id", "autocompleteBox_" + name);
	autocompleteBox.style.width = "240px";
	autocompleteBox.style.position = "absolute";

	autocompleteBox.innerHTML = '<div class="white_rbroundbox"> <div class="white_rbtop"> <div> <div></div> </div> </div> <div class="white_rbcontentwrap"> <div class="white_rbcontent"> <div class="taskcloudcontent" style="padding: 0px 5px 0px 5px; height: 17px;" id="listtabscontainer"><div style="width: 70px; font-weight: bold; float: left; height: 17px; padding-top: 1px;">' + name + '</div><div style="text-align: right; float: right; width: 155px; padding-right: 2px;"><input type="text" id="autocompleteInputField_' + name + '" name="text" style="width: 151px;  ";/></div> </div> </div> </div> <div class="white_rbbot"> <div><div></div> </div> </div> </div> ';

	document.body.appendChild(autocompleteBox);
	var autocomplete = new Autocomplete(document.getElementById("autocompleteInputField_" + name),
		   								document.getElementById("autocompleteBox_" + name),
									   	new ListAutocompleteStore(),
									   	callback);
	
	function centerAutoCompleteBox()
	{
		var left = window.wrappedJSObject.innerWidth / 2 - 120 + window.wrappedJSObject.scrollX;
		var top = window.wrappedJSObject.innerHeight / 2 - 10 + window.wrappedJSObject.scrollY;

		autocompleteBox.style.left = left + "px";
		autocompleteBox.style.top = top + "px";
	}

	centerAutoCompleteBox();
	window.addEventListener("scroll", centerAutoCompleteBox, false);
	window.addEventListener("resize", centerAutoCompleteBox, false);

	return autocomplete;
}

var createAutoCompletes = function()
{
	window.wrappedJSObject.autocompletes["goTo"] = createAutoComplete("GO TO: ", selectListByName);
	window.wrappedJSObject.autocompletes["moveTo"] = createAutoComplete("MOVE TO: ", moveToListByName);
}

var moveToListByName = function(text)
{
	if (!window.wrappedJSObject.listTabs || !window.wrappedJSObject.listTabs.entries)
		return;

	for (var i = 0; i < window.wrappedJSObject.listTabs.entries.length; ++i)
	{
		if (window.wrappedJSObject.listTabs.entries[i].toLowerCase() == text.toLowerCase())
			window.wrappedJSObject.control.tasksSelectionChanged("", ["", "tasks.moveTo." + window.wrappedJSObject.listTabs.data[i][1]]);
	}
}

var selectListByName = function(text)
{
	if (!window.wrappedJSObject.listTabs || !window.wrappedJSObject.listTabs.entries)
		return;

	for (var i = 0; i < window.wrappedJSObject.listTabs.entries.length; ++i)
	{
		if (window.wrappedJSObject.listTabs.entries[i].toLowerCase() == text.toLowerCase())
			window.wrappedJSObject.listTabs.selectTabByPosition(i);
	}
}

var hideAutocompletes = function()
{
	if (window.wrappedJSObject.autocompletes)
		for (var name in window.wrappedJSObject.autocompletes)
			window.wrappedJSObject.autocompletes[name].hide();
}

// end Autocomplete

var createLeftColumn = function()
{
	var leftColumn = document.createElement('div');
	var appView = document.getElementById("appview");
	var listBox = document.getElementById("listbox");

	leftColumn.setAttribute('id','leftColumn');
	leftColumn.style.cssFloat = "left";
	leftColumn.style.paddingLeft = "5px";
	leftColumn.style.paddingRight = "8px";
	leftColumn.style.display = "none";

	if (appView && listBox)
		appView.insertBefore(leftColumn, listBox);
}

var createListTabsContainer = function()
{
	var listTabsBox = document.createElement('div');	
	var leftColumn = document.getElementById("leftColumn");

	if (leftColumn)
	{
		listTabsBox.innerHTML = '<div class="white_rbroundbox"> <div class="white_rbtop"> <div> <div></div> </div> </div> <div class="white_rbcontentwrap"> <div class="white_rbcontent"> <table><tr><td><div class="taskcloudcontent" style="padding: 0px 5px 0px 5px;" id="listtabscontainer"> </div></td></tr></table> </div> </div> <div class="white_rbbot"> <div><div></div> </div> </div> </div> ';

		leftColumn.appendChild(listTabsBox);
	}
}

var moveListTabs = function()
{
	var listTabs = document.getElementById("listtabs");
	if (listTabs)
	{
		listTabs.className = "";
		listTabs.style.width = "100%";

		var listTabsContainer = document.getElementById("listtabscontainer");

		if (listTabsContainer)
			listTabsContainer.appendChild(listTabs);
	}
}

var hideLeftColumn = function()
{
	var content = document.getElementById("content");
	var leftColumn = document.getElementById("leftColumn");

	if (leftColumn)
	{
		leftColumn.style.display = "none";
		content.style.width = "980px";
	}
}

var showLeftColumn = function()
{
	var content = document.getElementById("content");
	var leftColumn = document.getElementById("leftColumn");
	var listTabsContainer = document.getElementById("listtabscontainer");

	if (leftColumn)
	{
		leftColumn.style.display = "block";
		leftColumn.style.width = Math.round(listTabsContainer.clientWidth * 1.14) + "px";
		content.style.width = (973 + leftColumn.clientWidth) + "px";
	}
}

var moveTabsToTheLeft = function()
{
	var content = document.getElementById("content");
	var listBox = document.getElementById("listbox");
	var tools_spacer = document.getElementById("tools_spacer");
	var sorting = document.getElementById("sorting");
	var tools = document.getElementById("tools");

	createLeftColumn();
	createListTabsContainer();
	moveListTabs();

	var leftColumn = document.getElementById("leftColumn");

    var handleViewChanged = function(d, e) 
	{
		if (e[0][1] == "Tasks")
			hideLeftColumn();
		else if (e[1][1] == "Tasks")
			showLeftColumn();
    }

	if (window.wrappedJSObject.messageBus)
		window.wrappedJSObject.messageBus.subscribe(handleViewChanged, window.wrappedJSObject.view.getUniqueMessageBusName() + "viewChanged");

	if (tools_spacer)
	{
		tools_spacer.style.paddingTop = "1px";
		tools_spacer.style.borderTop = "1px solid #CACACA";
	}

	if (sorting)
		sorting.style.marginTop = "0px";

	if (tools)
		tools.style.paddingTop = "5px";

	if (content && window.wrappedJSObject.view)
	{
		if (window.wrappedJSObject.view.getSelected() == "Tasks")
			showLeftColumn();
		else
			hideLeftColumn();
	}
}

var handleKeyPressEvent = function(ev, ignoreCombo)
{
    ev || (ev = window.event);

	if (ev == null)
		return;

    var target = null;
	
	if (window.wrappedJSObject.utility)
		target = window.wrappedJSObject.utility.getEventTarget(ev);

    if (target == null) 
        return true

    var pressed = (ev.charCode) ? ev.charCode: ((ev.which) ? ev.which: ev.keyCode);

    if (target != null && target.type != null && (target.type == "textarea" || target.type == "input" || target.type.indexOf("select") == 0 || target.type == "button" || target.type === "submit" || target.type == "text" || target.type == "password" || (target.id != null && target.id == "map"))) 
        return true

	var tabs = null;

	if (window.wrappedJSObject.view)
		tabs = window.wrappedJSObject.view.getViewTabs();

	if (tabs)
	{
		switch (pressed) 
		{
			case 74:
				if (ev.shiftKey) 
				{
					tabs.selectRight();
					if (window.wrappedJSObject.utility)
						window.wrappedJSObject.utility.stopEvent(ev);

					return false
				}
				break;
			case 75:
				if (ev.shiftKey) 
				{
					tabs.selectLeft();
					if (window.wrappedJSObject.utility)
						window.wrappedJSObject.utility.stopEvent(ev);

					return false
				}
				break;
			case 103:
				if (ev.ctrlKey)
				{
					hideAutocompletes();
					window.wrappedJSObject.autocompletes["goTo"] && window.wrappedJSObject.autocompletes["goTo"].show();
					if (window.wrappedJSObject.utility)
						window.wrappedJSObject.utility.stopEvent(ev);
					
					return false;
				}
				break;
			case 109:
				if (ev.ctrlKey)
				{
					hideAutocompletes();
					window.wrappedJSObject.autocompletes["moveTo"] && window.wrappedJSObject.autocompletes["moveTo"].show();
					if (window.wrappedJSObject.utility)
						window.wrappedJSObject.utility.stopEvent(ev);

					return false;
				}
				break
		}
	}

	return true;
}

var overrideBodyKeyPressHandler = function()
{
	if (window.wrappedJSObject.eventMgr)
	{
		var oldBodyKeyPressHandler = window.wrappedJSObject.eventMgr.bodyKeyPressHandler;

		window.wrappedJSObject.eventMgr.bodyKeyPressHandler = function(ev, ignoreCombo)
		{
			if (handleKeyPressEvent(ev, ignoreCombo))
				return oldBodyKeyPressHandler.call(window.wrappedJSObject.eventMgr, ev, ignoreCombo);

			return true;
		}	
	}
}

var overrideListTabsBlitDiv = function()
{
	if (window.wrappedJSObject.listTabs)
	{
		var oldBlitDiv = window.wrappedJSObject.listTabs.blitDiv;

		window.wrappedJSObject.listTabs.blitDiv = function()
		{
			oldBlitDiv.call(window.wrappedJSObject.listTabs);
			refreshListTabsStyles();
			showTasksCount();
			hideLists();
		}	

		window.wrappedJSObject.listTabs.blitDiv();
	}
}

var refreshListTabsStyles = function()
{
	var divListTabs = document.getElementById("listtabs");

	if (divListTabs)
	{
		divListTabs.firstChild.style.listStyle = "none";
		divListTabs.firstChild.style.padding = "0px 5px 0px 5px";
		divListTabs.firstChild.style.whiteSpace = "nowrap";
	}
}

var hideLists = function()
{
	if (window.wrappedJSObject.listTabs)
	{
		var listItems = window.wrappedJSObject.listTabs.div.getElementsByTagName("li");
		
		for (var i = 0; i < window.wrappedJSObject.listTabs.data.length; ++i)
		{
			if (window.wrappedJSObject.listTabs.data[i] && isListHidden(window.wrappedJSObject.listTabs.data[i][1]))
				listItems[i].style.display = "none";
		}

		/*if (window.wrappedJSObject.view.getSelected() == "Tasks")
			showLeftColumn();*/
	}
}

var overrideListTabsSelectLeft = function()
{
	if (window.wrappedJSObject.listTabs)
	{
		var oldListTabsSelectLeft = window.wrappedJSObject.listTabs.selectLeft;

		window.wrappedJSObject.listTabs.selectLeft = function()
		{
			var position = this.selected - 1; 

			while (true)
			{
				if (position >= 0)
				{
					if (!isListHidden(this.data[position][1]))
						break;

					--position;
				}
				else
					position = this.entries.length - 1;
			}

			this.selectTabByPosition(position);
		}	
	}
}

var overrideListTabsSelectRight = function()
{
	if (window.wrappedJSObject.listTabs)
	{
		var oldListTabsSelectRight = window.wrappedJSObject.listTabs.selectRight;

		window.wrappedJSObject.listTabs.selectRight = function()
		{
			var position = this.selected + 1; 

			while (true)
			{
				if (position < this.entries.length)
				{
					if (!isListHidden(this.data[position][1]))
						break;

					++position;
				}
				else
					position = 0;
			}

			this.selectTabByPosition(position);
		}	
	}
}

var showTasksCount = function()
{
	if (window.wrappedJSObject.listTabs)
	{
		var listItems = window.wrappedJSObject.listTabs.div.getElementsByTagName("li");
		listItems.sort(listItems.firstChild.innerHTML);

		for (var i = 0; window.wrappedJSObject.listTabs.data && window.wrappedJSObject.listTabs.data[i]; ++i)
		{
			var tasksCount = 0;

			if (window.wrappedJSObject.listTabs.data[i][2])
			{
				var filter = window.wrappedJSObject.listTabs.data[i][2];

				if (filter && filter.indexOf("status:") < 0)
					filter = "(" + filter + ") and (status:incomplete)";

				if (window.wrappedJSObject.overviewList && filter)
					tasksCount = window.wrappedJSObject.overviewList.getFilteredList(filter).length
			}
			else
			{
				if (window.wrappedJSObject.format)
					tasksCount = window.wrappedJSObject.format.getListStatistics(window.wrappedJSObject.listTabs.data[i][1])[5];

				listItems[i].firstChild.style.color = "black";
			}

			if (tasksCount > 0) {
				listItems[i].firstChild.innerHTML = listItems[i].firstChild.innerHTML + " (" + tasksCount + ")";
			}
		}
	}
}

var subscribeToFilterEditFinished = function()
{
	if (window.wrappedJSObject.messageBus)
		window.wrappedJSObject.messageBus.subscribe(window.wrappedJSObject.listTabs.blitDiv, window.wrappedJSObject.listList.mbn + "setFilterSuccess");
}

var overrideTaskCloudUpdate = function()
{
	if (window.wrappedJSObject.taskCloud)
	{
		var oldTaskCloudUpdate = window.wrappedJSObject.taskCloud.update;

		window.wrappedJSObject.taskCloud.update = function()
		{
			oldTaskCloudUpdate.call(window.wrappedJSObject.taskCloud);
			
			if (window.wrappedJSObject.listTabs)
				window.wrappedJSObject.listTabs.blitDiv();
		}	
	}
}

var hiddenLists = GM_getValue("hiddenLists", "");

var isListHidden = function(listID)
{
	if (hiddenLists)
		return hiddenLists.indexOf(listID) >= 0;

	return false;
}

var isListArchived = function(listID)
{
	if (window.wrappedJSObject.stateMgr.lists[listID] && window.wrappedJSObject.stateMgr.lists[listID].archived)
		return true;

	return false;
}

var hideList = function(entry)
{
	hiddenLists = (hiddenLists || "") + entry[0] + ",";

	GM_setValue("hiddenLists", hiddenLists);

	window.wrappedJSObject.listList.list.updateEntry(entry);
	window.wrappedJSObject.listTabs.blitDiv();
}

var showList = function(entry)
{
	hiddenLists = hiddenLists.replace(entry[0], "");
	hiddenLists = hiddenLists.replace(",,", ",");

	GM_setValue("hiddenLists", hiddenLists);

	window.wrappedJSObject.listList.list.updateEntry(entry);
	window.wrappedJSObject.listTabs.blitDiv();
}


var overrideListListUpdateEntry = function()
{
	if (window.wrappedJSObject.listList)
	{
		var oldListListUpdateEntry = window.wrappedJSObject.listList.list.updateEntry;

		window.wrappedJSObject.listList.list.updateEntry = function(entry, D)
		{
			oldListListUpdateEntry.call(window.wrappedJSObject.listList.list, entry, D);

			var index = window.wrappedJSObject.listList.list.map[entry[0]];
			var row = window.wrappedJSObject.listList.list.table.rows[index];

			row.entry = entry;
			row.rowText.innerHTML = "<div id='listName_" + entry[0] + "' style='float: left;'>" + entry[1] + "</div><div style='align: right; float: right;'><a href=\"# \" id='displayListLink_" + entry[0] + "'></a></div>";

			var displayListLink = document.getElementById('displayListLink_' + entry[0]);
			var listName = document.getElementById('listName_' + entry[0]);

			var listClickHandler = function(event)
			{
				if (isListHidden(entry[0]))
					showList(entry);
				else
					hideList(entry);


				if (window.wrappedJSObject.utility)
					window.wrappedJSObject.utility.stopEvent(event);
			}

			displayListLink.addEventListener('click', listClickHandler, false);

			if (!isListArchived(entry[0]))
			{
				if (isListHidden(entry[0]))
				{
					displayListLink.innerHTML = "show";
					listName.style.color = "#cacaca";
				}
				else
				{
					displayListLink.innerHTML = "hide";
					listName.style.color = "";
				}
			}
		}

		window.wrappedJSObject.listList.doStyles();
	}
}

window.addEventListener('load', overrideListTabsBlitDiv, false);
window.addEventListener('load', moveTabsToTheLeft, false);
window.addEventListener('load', overrideBodyKeyPressHandler, false);
window.addEventListener('load', overrideTaskCloudUpdate, false);
window.addEventListener('load', overrideListTabsSelectLeft, false);
window.addEventListener('load', overrideListTabsSelectRight, false);
window.addEventListener('load', subscribeToFilterEditFinished, false);
window.addEventListener('load', createAutoCompletes, false);
window.addEventListener('click', hideAutocompletes, false);

window.addEventListener('load', overrideListListUpdateEntry, false);
