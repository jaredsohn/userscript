[SPOILER="Code"][CODE]// ==UserScript==
// @name				DSMoveReports
// @author				Heinzel
// @version				2.0.0
// @namespace			http://die-staemme.de
// @description			Fügt in der Berichteübersicht eine Möglichkeit ein über die Berichte, die auf einen regulären Ausdruck passen, in eine eingestellte Gruppe verschoben werden können. Es können beliebig viele reguläre Ausdrücke und die entsprechenden Berichtegruppen gespeichert werden. 
// @include				http://*.die-staemme.de/game.php?*screen=report*
// ==/UserScript==



/**
 * A class implementing an amount of useful tools. 
 */
var Utility = {

	/**
	 * Gets an DOM Node by its XPath expression. 
	 */
	evaluate: function(path, context) {
		if(!context) {
			var context = document;
		}
		
		var XPath = document.evaluate(path, context, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var nodes = [];
		for(var x = 0; x < XPath.snapshotLength; x++) {
			nodes.push(XPath.snapshotItem(x));
		}
		
		return nodes;
	}, 
	
	/**
	 * Loads the value of a cookies. If cookie is undefined, 
	 * a default value is the result. 
	 * 
	 * @param key The key of the cookies to load. 
	 * @param defaultValue The value to return if cookie is undefined. 
	 */
	getCookie: function(key, defaultValue) {
		var reg = new RegExp(key + "=(.+?)(?:;|$)");
		var value = document.cookie.match(reg);
		if(value == null) {
			value = defaultValue;
		} else {
			value = value[1];
		}
		
		return value;
	}, 
	
	/** 
	 * Saves a value with a defined cookie. 
	 * 
	 * @param key The key of the cookie to save. 
	 * @param value The value to save. 
	 */
	setCookie: function(key, value) {
		var date = new Date();
		date.setYear(date.getYear() + 1900 + 5); // 5 years valid
		var expires = date.toGMTString();
		
		document.cookie = key + "=" + value + ";expires=" + expires;
	}, 

	/**
	 * Removes a defined cookie. 
	 * 
	 * @param key The key of the cookie to remove. 
	 */
	removeCookie: function(key) {
		document.cookie = name + "=;expires=Sun, 27 Jun 1999 13:09:38 GMT";
	}
};

/**
 * An representation of the current Game. 
 */
var Game = {

	/**
	 * Gets all Reports on the current page. 
	 * 
	 * @return All Reports of the current page. 
	 */
	getAllReports: function() {
		var reportElements = Utility.evaluate('//span[contains(@id, "labelText_")]');
		var reports = new Array();
		
		for(var x = 0; x < reportElements.length; x++) {
			var name = reportElements[x].textContent.trim();
			var id = reportElements[x].id.replace(/labelText_(\d+)/, "$1");
			
			var report = new Game.Report(name, id);
			reports.push(report);
		}
		
		return reports;
	}, 

	/**
	 * Returns the name of the current group. 
	 */
	getCurrentGroup: function() {
		return document.getElementsByTagName("strong")[0].textContent.replace(/^\s*|\&gt\;|\&lt\;|\s*$|>|</g, "");
	}, 

	/**
	 * Sets the check of a report defined by its id.  
	 * 
	 * @param rowId The id of the report to set the check. 
	 */
	setCheck: function(reportId) {
		document.getElementsByName('id_' + reportId)[0].checked = true;
	}, 

	/**
	 * Unsets the check of a report defined by its id.  
	 * 
	 * @param rowId The id of the report to unset the check. 
	 */
	removeCheck: function(reportId) {
		document.getElementsByName('id_' + reportId)[0].checked = false;
	}, 

	/**
	 * Submits the report moving form. 
	 */
	submit: function() {
		Utility.evaluate('//input[@value="Verschieben"]')[0].click();
	}, 

	/**
	 * Changes the group selection that defines the target report group to move a report to. 
	 * 
	 * @param The name of the group to select. 
	 * @return Whether the option got selected or not. 
	 */
	selectGroupByName: function(groupname) {
		try {
			var options = document.getElementsByName("group_id")[0].getElementsByTagName("option");
			var selected = false;
			
			for(var x = 0; x < options.length; x++) {
				if(options[x].textContent == groupname) {
					options[x].selected = true;
					selected = true;
				}
			}
			
			return selected;
		} catch(e) {
			return false;
		}
	}, 

	/**
	 * A representation of a TW Report. 
	 */
	Report: function(name, id) {
		var name = name;
		var id = id;
		
		/**
		 * Returns the name of this Report. 
		 * 
		 * @return The name of this Report. 
		 */
		this.getName = function() {
			return name;
		};
		
		/**
		 * Returns the id of this Report. 
		 * 
		 * @return The id of the Report. 
		 */
		this.getId = function() {
			return id;
		};
	}
};

/**
 * An representation of this Script. 
 */
var Script = {
	
	/**
	 * Constant that defines the name of the cookie that contains the saved options. 
	 */
	COOKIE_NAME: 'DSMoveReports_options', 

	/**
	 * Moves the reports that machtes the pattern into the selected report group. 
	 */
	moveReports: function() {
		var option = scriptMenu.getSelectedOption();
		var reports = Game.getAllReports();
		var checkCount = 0;
		
		for (var i = 0; i < reports.length; ++i) {
			if (reports[i].getName().match(new RegExp(option.getPattern()))) {
				Game.setCheck(reports[i].getId());
				checkCount++;
			} else {
				Game.removeCheck(reports[i].getId());
			}
		}
		
		// error handling
		var error = "";
		if (checkCount === 0) {
			var error = "Keine Berichte mit diesem Suchmuster vorhanden!";
		} else if (option.getGroup() === '') {
			var error = "Dieser Gruppenname ist ungültig!";
		} else if (Game.getCurrentGroup() == option.getGroup()) {
			var error = "Die Berichte befinden sich bereits in der angegebenen Gruppe!";
		} else if (Game.selectGroupByName(option.getGroup()) === false) {
			var error = "Sie müssen einen Gruppennamen angeben, der existiert!";
		}
		
		if (error == "") {
			Game.submit();
		} else {
			window.alert(error);
		}
	}, 

	/**
	 * Saves an Array of active Options. 
	 * 
	 * @param options An Array of Options. 
	 */
	saveOptions: function(options) {
		var savings = "";
		
		for (var i = 0; i < options.length; ++i) {
			savings += escape(options[i].getPattern()) + ":" + escape(options[i].getGroup());
			
			if (i != options.length - 1) {
				savings += ",";
			}
		}
		
		Utility.setCookie(Script.COOKIE_NAME, savings);
	}, 

	/**
	 * Loads an Array of active Options. 
	 * 
	 * @return An Array of saved Options. 
	 */
	loadOptions: function() {
		var options = new Array();
		var savingsStr = Utility.getCookie(Script.COOKIE_NAME, '');
		var savingsArr = savingsStr.split(',');
		
		for (var i = 0; i < savingsArr.length && savingsStr != ''; ++i) {
			var split = savingsArr[i].split(':');
			var pattern = unescape(split[0]);
			var group = unescape(split[1]);
			var option = new Script.Option(pattern, group);
			
			options.push(option);
		}
		
		return options;
	}, 

	/**
	 * Represents a possible combination of pattern and group name for the user. 
	 * 
	 * @param pattern The pattern to recognize which reports to move. 
	 * @param name The name of the group where to move the reports. 
	 */
	Option: function(pattern, name) {

		var pattern = pattern; 
		var groupName = name;
		
		/**
		 * Gets the name of the report group of this Option.  
		 * 
		 * @return The group name of this Option. 
		 */
		this.getGroup = function() {
			return groupName;
		};
		
		/**
		 * Edits the name of the report group of this Option. 
		 * 
		 * @param The new group name of this Option. 
		 */
		this.setGroup = function(name) {
			groupName = name;
		};
		
		/**
		 * Gets the pattern of this Option. 
		 * 
		 * @return The pattern of this Option. 
		 */
		this.getPattern = function() {
			return pattern;
		};
		
		/**
		 * Edits the pattern of this Option. 
		 * 
		 * @param The new pattern of this Option. 
		 */
		this.setPattern = function(p) {
			pattern = p;
		};
		
		/**
		 * Checks whether two Options are equal. 
		 * 
		 * @param otherOption The option to compare with. 
		 * @return Whether the Options are equal. 
		 */
		this.equals = function(otherOption) {
			return otherOption.getPattern() == this.getPattern() && otherOption.getGroup() == this.getGroup();
		};
	}, 

	/**
	 * Implements a menu or GUI addition for the user to use this Script. 
	 */
	Menu: function() {
		
		/**
		 * The HTML-ID of the select-Element. 
		 */
		const SELECTION_ID = 'DSMoveReports_selection';
		
		/**
		 * The icon for the delete-link. 
		 */
		const DELETE_ICON = 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJdSURBVDjLpZP7S1NhGMf9W7YfogSJboSEUVCY8zJ31trcps6zTI9bLGJpjp1hmkGNxVz4Q6ildtXKXzJNbJRaRmrXoeWx8tJOTWptnrNryre5YCYuI3rh+8vL+/m8PA/PkwIg5X+y5mJWrxfOUBXm91QZM6UluUmthntHqplxUml2lciF6wrmdHriI0Wx3xw2hAediLwZRWRkCPzdDswaSvGqkGCfq8VEUsEyPF1O8Qu3O7A09RbRvjuIttsRbT6HHzebsDjcB4/JgFFlNv9MnkmsEszodIIY7Oaut2OJcSF68Qx8dgv8tmqEL1gQaaARtp5A+N4NzB0lMXxon/uxbI8gIYjB9HytGYuusfiPIQcN71kjgnW6VeFOkgh3XcHLvAwMSDPohOADdYQJdF1FtLMZPmslvhZJk2ahkgRvq4HHUoWHRDqTEDDl2mDkfheiDgt8pw340/EocuClCuFvboQzb0cwIZgki4KhzlaE6w0InipbVzBfqoK/qRH94i0rgokSFeO11iBkp8EdV8cfJo0yD75aE2ZNRvSJ0lZKcBXLaUYmQrCzDT6tDN5SyRqYlWeDLZAg0H4JQ+Jt6M3atNLE10VSwQsN4Z6r0CBwqzXesHmV+BeoyAUri8EyMfi2FowXS5dhd7doo2DVII0V5BAjigP89GEVAtda8b2ehodU4rNaAW+dGfzlFkyo89GTlcrHYCLpKD+V7yeeHNzLjkp24Uu1Ed6G8/F8qjqGRzlbl2H2dzjpMg1KdwsHxOlmJ7GTeZC/nesXbeZ6c9OYnuxUc3fmBuFft/Ff8xMd0s65SXIb/gAAAABJRU5ErkJggg==';
		
		/**
		 * The icon for the add-link. 
		 */
		const ADD_ICON = 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJvSURBVDjLpZPrS5NhGIf9W7YvBYOkhlkoqCklWChv2WyKik7blnNris72bi6dus0DLZ0TDxW1odtopDs4D8MDZuLU0kXq61CijSIIasOvv94VTUfLiB74fXngup7nvrnvJABJ/5PfLnTTdcwOj4RsdYmo5glBWP6iOtzwvIKSWstI0Wgx80SBblpKtE9KQs/We7EaWoT/8wbWP61gMmCH0lMDvokT4j25TiQU/ITFkek9Ow6+7WH2gwsmahCPdwyw75uw9HEO2gUZSkfyI9zBPCJOoJ2SMmg46N61YO/rNoa39Xi41oFuXysMfh36/Fp0b7bAfWAH6RGi0HglWNCbzYgJaFjRv6zGuy+b9It96N3SQvNKiV9HvSaDfFEIxXItnPs23BzJQd6DDEVM0OKsoVwBG/1VMzpXVWhbkUM2K4oJBDYuGmbKIJ0qxsAbHfRLzbjcnUbFBIpx/qH3vQv9b3U03IQ/HfFkERTzfFj8w8jSpR7GBE123uFEYAzaDRIqX/2JAtJbDat/COkd7CNBva2cMvq0MGxp0PRSCPF8BXjWG3FgNHc9XPT71Ojy3sMFdfJRCeKxEsVtKwFHwALZfCUk3tIfNR8XiJwc1LmL4dg141JPKtj3WUdNFJqLGFVPC4OkR4BxajTWsChY64wmCnMxsWPCHcutKBxMVp5mxA1S+aMComToaqTRUQknLTH62kHOVEE+VQnjahscNCy0cMBWsSI0TCQcZc5ALkEYckL5A5noWSBhfm2AecMAjbcRWV0pUTh0HE64TNf0mczcnnQyu/MilaFJCae1nw2fbz1DnVOxyGTlKeZft/Ff8x1BRssfACjTwQAAAABJRU5ErkJggg==';

		/**
		 * The icon for the edit-link. 
		 */
		const EDIT_ICON = 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAFUSURBVDjLrZM/SAJxGIZdWwuDlnCplkAEm1zkaIiGFFpyMIwGK5KGoK2lphDKkMDg3LLUSIJsSKhIi+684CokOtTiMizCGuzEU5K3vOEgKvtBDe/2Pc8H3x8NAM1fQlx4H9M3pcOWp6TXWmM8A7j0629v1nraiAVC0IrrwATKIgs5xyG5QiE+Z4iQdoeU2oAsnqCSO1NSTu+D9VhqRLD8nIB8F0Q2MgmJDyipCzjvYJkIfpN2UBLG8MpP4dxvQ3ZzGuyyBQ2H+AnOOCBd9aL6soh81A5hyYSGWyCFvxUcerqI4S+CvYVOFPMHxLAq8I3qdHVY5LbBhJzEsCrwutpRFBlUHy6wO2tEYtWAzLELPN2P03kjfj3luqDycV2F8AgefWbEnVqEHa2IznSD6BdsVDNStB0lfh0FPoQjdx8RrAqGzC0YprSgxzsUMOY2bf37N/6Ud1Vc9yYcH50CAAAAAElFTkSuQmCC';
		
		var THIS = this;
		
		this.options = Script.loadOptions();
		
		/**
		 * Adds a new Option to this Menu. 
		 */
		this.addNewOption = function() {
			// create new option
			var pattern = window.prompt("Welches Suchmuster soll angewendet werden?", "");
			if (pattern == null) return;
			var target = window.prompt("In welche Gruppe sollen die Berichte geschoben werden?", "");
			if (target == null) return;
			
			var option = new Script.Option(pattern, target);
			this.options.push(option);
			
			// add Option to DOM
			var el = document.getElementById(SELECTION_ID).appendChild(document.createElement('option'));
			el.value = this.options.length - 1;
			el.textContent = option.getPattern() + " - " + option.getGroup();
			
			Script.saveOptions(this.options);
		};
		
		/**
		 * Edits the selected Option. 
		 */
		this.editSelectedOption = function() {
			// identify and edit Option Object
			var option = this.getSelectedOption();
			var index = getOptionsIndex(option);
			
			var pattern = window.prompt("Welches Suchmuster soll angewendet werden?", option.getPattern());
			if (pattern == null) return;
			var target = window.prompt("In welche Gruppe sollen die Berichte geschoben werden?", option.getGroup());
			if (target == null) return;
			
			// edit Option
			option.setPattern(pattern);
			option.setGroup(target);
			Script.saveOptions(this.options);
			
			// edit Option in DOM
			var selection = document.getElementById(SELECTION_ID);
			var el = selection.getElementsByTagName('option')[index];
			el.textContent = (new RegExp(pattern)).toString() + " - " + target;
		};
		
		/**
		 * Deletes the selected Option. 
		 */
		this.deleteSelectedOption = function() {
			// identify and remove Option Object from options-Array
			var option = this.getSelectedOption();
			var index = getOptionsIndex(option);
			this.options.splice(index, 1);
			
			Script.saveOptions(this.options);
			
			// remove Option in DOM
			var selection = document.getElementById(SELECTION_ID);
			var els = selection.getElementsByTagName('option');
			els[index].parentNode.removeChild(els[index]);
		};
		
		/**
		 * Gets the selected Option. 
		 * 
		 * @return The selected Option. 
		 */
		this.getSelectedOption = function() {
			var selection = document.getElementById(SELECTION_ID);
			return this.options[selection.selectedIndex];
		};
	
		/**
		 * Creates the menu line and activates all event listeners. 
		 */
		this.__construct = function() {
			// create Menu
			var parentTBody = Utility.evaluate('//tr[@id="report_filter_hide"]/parent::tbody')[0];
			
			var mainRow = parentTBody.appendChild(document.createElement('tr'));
			var mainCell = mainRow.appendChild(document.createElement('td'));
			mainCell.colSpan = "3";
			
			selection = mainCell.appendChild(document.createElement('select'));
			selection.id = SELECTION_ID;
			
			// add options
			for (var i = 0; i < this.options.length; ++i) {
				var option = selection.appendChild(document.createElement('option'));
				option.innerHTML = (new RegExp(this.options[i].getPattern())).toString() + " - " + this.options[i].getGroup();
			}
			
			mainCell.innerHTML += "&nbsp;"
			
			var addLink = mainCell.appendChild(document.createElement('a'));
			addLink.href = 'javascript:window.scriptMenu.addNewOption();';
			var addImage = addLink.appendChild(document.createElement('img'));
			addImage.src = ADD_ICON;
			addImage.style.position = "relative";
			addImage.style.top = "3px";
			
			mainCell.innerHTML += "&nbsp;"
			
			var editLink = mainCell.appendChild(document.createElement('a'));
			editLink.href = 'javascript:window.scriptMenu.editSelectedOption();';
			var editImage = editLink.appendChild(document.createElement('img'));
			editImage.src = EDIT_ICON;
			editImage.style.position = "relative";
			editImage.style.top = "3px";
			
			mainCell.innerHTML += "&nbsp;"
			
			var deleteLink = mainCell.appendChild(document.createElement('a'));
			deleteLink.href = 'javascript:window.scriptMenu.deleteSelectedOption();';
			var deleteImage = deleteLink.appendChild(document.createElement('img'));
			deleteImage.src = DELETE_ICON;
			deleteImage.style.position = "relative";
			deleteImage.style.top = "3px";
			
			mainCell.innerHTML += "&nbsp;";
			
			var moveButton = mainCell.appendChild(document.createElement('button'));
			moveButton.innerHTML = 'Verschieben';
			moveButton.addEventListener('click', Script.moveReports, false);
		}
		
		function getOptionsIndex(option) {
			var index = null;
			
			for (var i = 0; i < THIS.options.length; ++i) {
				if (THIS.options[i].equals(option)) {
					index = i;
					break;
				}
			}
			
			return index;
		}
		
		
		this.__construct();
	}
};


(function main() {
	win = (typeof unsafeWindow != 'undefined') ? unsafeWindow : window;
	win.ScriptAPI.register('DSMoveReports', [8.6], 'Heinzelmänchen', 'Heinzelmänchen@scripter.die-staemme.de');
	
	window.scriptMenu = win.scriptMenu = new Script.Menu();
})();[/CODE][/SPOILER]