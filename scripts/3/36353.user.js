// ==UserScript==
// @name          US.o script author helper
// @namespace     http://userscripts.org/scripts/show/36353
// @description   Shows how many new reviews, comments, installs and fans your scripts have got since you last checked
// @include       http://userscripts.org/home/scripts
// @include       http://userscripts.org/home/scripts?*
// @grant         GM_addStyle
// @grant         GM_getValue
// @grant         GM_setValue
// @updateURL     https://userscripts.org/scripts/source/36353.meta.js
// @version       2012.10.12
// ==/UserScript==

// The script is wrapped in an anonymous function
(function() {

////////////////////////// START OF HELPER FUNCTIONS //////////////////////////

// Runs a particular XPath expression p against the context node context (or the document, if not provided)
// If a document (docObj) is provided, its evaluate method is used instead of document.evaluate (and it's also the default context)
// Returns the results as an array
function $x(p, context, docObj) {
	if (!docObj) docObj = document;
	if (!context) context = docObj;
	var arr = [], xpr = docObj.evaluate(p, context, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0, l = xpr.snapshotLength; i < l; i++) arr.push(xpr.snapshotItem(i));
	return arr;
}

// Returns only the first element of the array returned by $x (or null if the array was empty)
function $x1(p, context, docObj) {
	var nodeArray = $x(p, context, docObj);
	return (nodeArray.length > 0) ? nodeArray[0] : null;
}

// Creates a new node with the given attributes, properties and event listeners
function createNode(type, attributes, props, evls) {

	var node = document.createElement(type);

	if (attributes) {
		for (var attr in attributes) {
			if (attributes.hasOwnProperty(attr)) node.setAttribute(attr, attributes[attr]);
		}
	}

	if (props) {
		for (var prop in props) {
			if ((props.hasOwnProperty(prop)) && (prop in node)) node[prop] = props[prop];
		}
	}

	if (Array.isArray(evls)) {
		evls.forEach(function(evl) {
			if (Array.isArray(evl)) node.addEventListener.apply(node, evl);
		});
	}

	return node;

}

// Returns the "pluralized" form of singularWord if it's necessary to express a timesNumber quantity
function adjustPlural(singularWord, timesNumber) {
	return singularWord + ((Math.abs(timesNumber) !== 1) ? "s" : "");
}

// Creates a span with the difference number as its text and a CSS class according to its sign
// If formatString is provided, the span will present it as its text (with each %s replaced with the difference number)
function createDiffSpan(diffNumber, formatString) {
	if (!formatString) formatString = " (%s)"; // Default span format
	return createNode("span", {class: ((diffNumber > 0) ? "gsPosDiff" : "gsNegDiff")},
														{textContent: formatString.replace(/%s/g, diffNumber.toCustomString(true))});
}

// Calculates the difference between two dates and returns it as a "humanized" string
// It uses UTC functions because the timezone offset can affect the calculations
function getDateDiffString(dateNew, dateOld) {

	// Creates a date object with the difference between the two passed dates
	var dateDiff = new Date(dateNew.getTime() - dateOld.getTime());
	dateDiff.setUTCFullYear(dateDiff.getUTCFullYear() - 1970); // Substracts 1970 years to compensate Date.getTime's (Unix) epoch (1 Jan 1970 00:00:00 UTC)

	// Initializes the variables (timeunitsHash correlates the time units names with its corresponding method of the Date object)
	var strDateDiff = "", timeunitValue = 0;
	var timeunitsHash = {year: "getUTCFullYear", month: "getUTCMonth", day: "getUTCDate",
											 hour: "getUTCHours", minute: "getUTCMinutes", second: "getUTCSeconds", millisecond: "getUTCMilliseconds"};

	// Appends the time units values and its names to construct the string
	for (var timeunitName in timeunitsHash) {

		// Gets the time unit value by calling the corresponding method of the Date object
		// It substracts 1 for the days because they begin with 1 (the other time units begin with 0)
		timeunitValue = dateDiff[timeunitsHash[timeunitName]]() - ((timeunitName == "day") ? 1 : 0);

		// If the value isn't 0, appends this time unit to the string
		if (timeunitValue !== 0) {
			if ((timeunitName === "millisecond") && (strDateDiff.length !== 0)) continue; // Milliseconds won't be added unless the difference is less than 1 second
			strDateDiff += ((strDateDiff.length === 0) ? "" : ", ") + // Adds a comma as separator if another time unit has already been added
										 timeunitValue.toCustomString(false) + " " +
										 adjustPlural(timeunitName, timeunitValue);
		}

	}

	// Replaces the last comma with an "and" to humanize the string
	strDateDiff = strDateDiff.replace(/,([^,]*)$/, " and$1");

	return strDateDiff;

}

// Adds !important to complete CSS rules (e.g. ".nd {display: none}")
function makeCSSImportant(cssString) {
	var impCssString = cssString.replace(/([^;]\s*)}/, "$1;}"); // Adds a trailing semicolon to the last rule if it doesn't have one
	return impCssString.replace(/(?:\s*!\s*important\s*)?;/gi, " !important;"); // Adds !important to each rule if it doesn't have it already
}

// Reverses a string
String.prototype.reverse = function() {
	return this.split("").reverse().join("");
};

// Transforms a number into a string with a coma as thousands separator
// If showSign is true, the plus (+) sign is appended to the positive numbers
// The double reverse is to workaround Javascript lack of lookbehind in regular expressions
Number.prototype.toCustomString = function(showSign) {
	var strNumber = this.toString();
	strNumber = strNumber.reverse().replace(/\d{3}(?!,|$|-)/g, "$&,").reverse();
	if (showSign) strNumber = ((this > 0) ? "+" : "") + strNumber;
	return strNumber;
};

// Checks if the passed variable is an array. Provides an acceptable solution in most cases if Array.isArray isn't implemented (Javascript 1.8.5 addition)
if (typeof Array.isArray !== "function") {
	Array.isArray = function(arrTest) { // Static method of Array
		return (Object.prototype.toString.call(arrTest) === "[object Array]");
	};
}

// Native JSON will be used to parse and stringify data from/to a string if available, eval/uneval if not
var jParse = (window.JSON && window.JSON.parse) ? window.JSON.parse : eval;
var jStringify = (window.JSON && window.JSON.stringify) ? window.JSON.stringify : uneval;

// "Constant" with the key name to save the scripts data
var DATA_KEY = "scriptData";

/////////////////////////// END OF HELPER FUNCTIONS ///////////////////////////

/////////////////////////// START OF OBJECT CLASSES ///////////////////////////

// Class for a base object with all the tracked properties of the scripts
function GmProps(baseReviews, baseComments, baseFans, baseInstalls) {

	// Makes sure that the passed argument is a number. If it can't be parsed as a number, 0 will be used
	function numerizeArg(baseArg) {
		var numArg = parseInt(baseArg, 10);
		return ((isNaN(numArg)) ? 0 : numArg);
	}

	this.reviews = numerizeArg(baseReviews); // Reviews
	this.comments = numerizeArg(baseComments); // Comments
	this.fans = numerizeArg(baseFans); // Fans
	this.installs = numerizeArg(baseInstalls); // Installs

}

// Class for the script object
// Each script row will be parsed to an object of this class and added to a SOA
function GmScript(scriptId, scriptName, scriptBase) {
	this.id = scriptId; // Script id
	this.name = scriptName;	//Script name
	this.props = (scriptBase instanceof GmProps) ? scriptBase : new GmProps(); // Script's properties object
}

// Class for the scripts' container object
function GmScriptContainer(dataKeyName) {

	// Script objects array (SOA). The data will be retrieved from storage if a key name is provided
	this.scripts = [];
	if (dataKeyName) this.getScriptsData(dataKeyName);

}
// Returns the script object from the container's SOA with the passed id
// If no script is found, it returns null
GmScriptContainer.prototype.getScriptById = function(scriptId) {
	var scriptArrayFiltered = this.scripts.filter(function(s) {return (s.id === scriptId);});
	return (scriptArrayFiltered.length > 0) ? scriptArrayFiltered[0]: null;
};
// Returns the total of the passed script property in the container's SOA
GmScriptContainer.prototype.getTotal = function(propName) {
	var totalItems = 0;
	this.scripts.forEach(function(s) {totalItems += s.props[propName]});
	return totalItems;
};
// Saves the SOA to storage in JSON format. It also saves the scripts in containerOld's SOA (if passed) which don't exist in the SOA
GmScriptContainer.prototype.saveScriptsData = function(dataKeyName, containerOld) {

	var scriptsArray = this.scripts, oldScriptsArray = (containerOld) ? containerOld.scripts : [];

	oldScriptsArray.forEach(function(s) {
		if (this.getScriptById(s.id) === null) scriptsArray.push(s); // Adds the script to the array if it doesn't exist in this container's SOA
	}, this);

	GM_setValue(dataKeyName, jStringify(scriptsArray));

};
// Populates the SOA from the data stored in storage, converting it from JSON format
// If storage is empty or its content isn't an array, then it doesn't do anything
GmScriptContainer.prototype.getScriptsData = function(dataKeyName) {

	// Loads the JSON string from storage and parses it. If it isn't an array, exits
	var loadArray = jParse(GM_getValue(dataKeyName, "null"));
	if (!Array.isArray(loadArray)) return;

	// Validates each script object and, if it's valid, adds it to the SOA
	loadArray.forEach(function(s) {

		// Makes sure the script name is a string and the script id a number
		var scriptName = String(s.name), scriptId = parseInt(s.id, 10);
		if (isNaN(scriptId)) return;

		// Makes sure it has a "props" object property
		if (typeof(s.props) != "object") return;

		// Makes sure each script property is a number. If it can't be parsed as a number, 0 will be used
		var parseObj = new GmProps();
		for (var propName in parseObj) {
			parseObj[propName] = parseInt(s.props[propName]);
			if (isNaN(parseObj[propName])) parseObj[propName] = 0; // New properties not supported in previous script versions (s.props[propName] === undefined) will be loaded as 0
		}

		// Creates a new GmScript object with the validated properties and adds it to the SOA
		var scriptObj = new GmScript(scriptId, scriptName, parseObj);
		this.scripts.push(scriptObj);

	}, this);

};

//////////////////////////// END OF OBJECT CLASSES ////////////////////////////

///////////////////////////// START OF CSS STYLES /////////////////////////////

// Adds classes to colorize positive and negative differences
GM_addStyle([
	".gsPosDiff {color: green}",
	"th > .gsPosDiff {color: lime}", // For better contrast with the th black background
	".gsNegDiff {color: red}"
].map(function(s) {return makeCSSImportant(s);}).join("\n"));

////////////////////////////// END OF CSS STYLES //////////////////////////////

///////////////////////////// START OF MAIN SCRIPT ////////////////////////////

// Associative array used to match each script property name with its corresponding column number (cells collection) in a script row
var columnsHash = {reviews: 2, comments: 3, fans: 4, installs: 5};

// Gets the scripts table (tbody)
var scriptTable = $x1("id('content')//table/tbody");
if (!scriptTable) return;

// Gets an array with all the rows that correspond to scripts
var scriptRows = $x("./tr[starts-with(@id, 'scripts-')]", scriptTable);
if (scriptRows.length === 0) return;

// Parses the script rows into script objects (GmScript class) and adds them to the SOA of a GmScriptContainer object. The old SOA is loaded into a container as well
// Then it compares each script object from the SOA with the corresponding script object from the old SOA, presenting the differences in the document
var containerNew = new GmScriptContainer(), containerOld = new GmScriptContainer(DATA_KEY);
scriptRows.forEach(function(scriptRow) {

	// Finds the link to the script homepage
	var scriptLink = $x1("./td[@class='script-meat']/a", scriptRow);
	if (!scriptLink) return;

	// Extracts the script name and id (parsed to an integer) from the link
	var scriptName = scriptLink.textContent;
	var scriptId = scriptLink.href.match(/\/(\d+)$/);
	if (scriptId === null) {
		return;
	}
	else {
		scriptId = parseInt(scriptId[1], 10);
		if (isNaN(scriptId)) return;
	}

	// Extracts and parses each property number from the apropiate cell of the script row
	var parseObj = new GmProps();
	for (var propName in parseObj) {

		// Finds the appropiate cell for this property using the scriptRow object (row) and the columnsHash information (column)
		var scriptPropCell = scriptRow.cells[columnsHash[propName]];
		if (!scriptPropCell) return;

		// Extracts the property value from its cell
		switch(propName) {

			case "reviews":
				var scriptReviewsLink = $x1("./a[contains(@href, '/reviews/')]", scriptPropCell);
				parseObj[propName] = (scriptReviewsLink) ? parseInt(scriptReviewsLink.textContent, 10) : 0;
				break;

			default:
				parseObj[propName] = parseInt(scriptPropCell.textContent, 10);
				break;

		}

		// If the property couldn't be parsed as a number, skips this script
		if (isNaN(parseObj[propName])) return;

	}

	// Creates a script object with the extracted data and adds it to the SOA
	var scriptObj = new GmScript(scriptId, scriptName, parseObj);
	containerNew.scripts.push(scriptObj);

	// Gets the corresponding script object from the old SOA. If it doesn't exists there (the script is new), it uses a new script object with 0 in all its properties
	var scriptObjOld = ((containerOld.getScriptById(scriptObj.id)) || (new GmScript(scriptObj.id, scriptObj.name, new GmProps())));

	// Compares each property of the script objects
	for (var propName in scriptObj.props) {

		// Calculates the difference between properties. If it's zero, there's nothing to indicate
		var propDiff = scriptObj.props[propName] - scriptObjOld.props[propName];
		if (propDiff === 0) continue;

		// Creates a difference span with the difference number
		var spanDiff = createDiffSpan(propDiff);

		// Finds the appropiate cell for this property using the scriptRow object (row) and the columnsHash information (column)
		var propCell = scriptRow.cells[columnsHash[propName]];
		if (!propCell) continue;

		// Appends the span to the cell
		propCell.appendChild(spanDiff);

	}

});
if (containerNew.scripts.length === 0) return; // If no script object has been added to the SOA, the script returns

// Saves the new SOA to storage, merging it with the old SOA's not seen scripts
containerNew.saveScriptsData(DATA_KEY, containerOld);

// Gets the header row of the script table
var scriptHeaderRow = $x1("./tr[th]", scriptTable);
if (!scriptHeaderRow) return;

// Calculates the total for each script property in the new container and its difference with the total of the old container
var totalPropNew, totalPropOld, totalPropDiff;
var totalsText = containerNew.scripts.length.toCustomString(false) + " " + adjustPlural("script", containerNew.scripts.length); // Builds a totals string with the number of scripts in the new container
for (var propName in new GmProps()) {

	// Gets the total of the property in both containers
	totalPropNew = containerNew.getTotal(propName);
	totalPropOld = containerOld.getTotal(propName);

	// If there is a difference between the totals, presents it in the appropiate cell of the header row
	totalPropDiff = totalPropNew - totalPropOld;
	if (totalPropDiff !== 0) scriptHeaderRow.cells[columnsHash[propName]].appendChild(createDiffSpan(totalPropDiff));

	// Adds to the totals string the total of the property
	totalsText += " / " + totalPropNew.toCustomString(false) + " " + adjustPlural(propName.slice(0, -1), totalPropNew);

}

// Creates a paragraph with the totals string and inserts it into the document before the script table
var totalsP = createNode("p", {class: "subtitle"}, {textContent: totalsText});
var scriptTableT = scriptTable.parentNode; // This is the "table" element
scriptTableT.parentNode.insertBefore(totalsP, scriptTableT);

// Gets the last check date (LCD) and saves the current one
var checkDate = new Date(), checkDateOld = parseInt(GM_getValue("lastCheck", null), 10);
checkDateOld = (isNaN(checkDateOld)) ? null : (new Date(checkDateOld));
GM_setValue("lastCheck", checkDate.getTime().toString());

// If there's a saved LCD, creates a paragraph with it (and its "humanized" difference with the current date) and insert it into the document before the script table
if (checkDateOld !== null) {
	var datesP = createNode("p", {class: "subtitle"},
															 {textContent: "Last check was " + getDateDiffString(checkDate, checkDateOld) + " ago (" + checkDateOld.toUTCString() + ")"});
	scriptTableT.parentNode.insertBefore(datesP, scriptTableT);
}

////////////////////////////// END OF MAIN SCRIPT /////////////////////////////

})();