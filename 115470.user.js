// ==UserScript==
// @name           Kings Of Chaos Battlefield Sorter
// @namespace      http://psxlover.no-ip.info
// @copyright      2011-2012, Aleksandros Papadogiannakis "psxlover"
// @description    Click a column name to sort the battlefield.
// @include        http://www.kingsofchaos.com/battlefield.php*
// @version        1.4
// ==/UserScript==

/**
 *					Changelog:
 *	1.4: Fixed a problem caused by the "Age 15 will end.." message
 *	1.3: Added option to automatically sort the battlefield with each visit
 *	
 */

/**
 * Icons indicating the sorted column
 * Source :http://www.gfe.com/Images/products/sortArrowDesc.gif
 */
var sortArrowDown = "data:image/gif;base64,R0lGODlhDQANAIABAJOSl%2F%2F%2F%2FyH5BAEKAAEALAAAAAANAA0AAAIRjI%2Bpy%2B0PozSgWrAuZvbtaRQAOw%3D%3D";
var sortArrowUp = "data:image/gif;base64,R0lGODlhDQANAIABAJOSl%2F%2F%2F%2FyH5BAEKAAEALAAAAAANAA0AAAIRjI%2Bpy%2B2fwAO00buuhrz7UAAAOw%3D%3D";

/**
 * Function to remove the seperators from an arithmetic field and turn it into a number
 */
String.prototype.getNumber = function() {
	if (this.indexOf(",") > -1) {
		return  parseInt(this.replace(",","","g"));
	}
	if (this.indexOf(".") > -1)
		return parseInt(this.replace(".","","g"));
	return parseInt(this);
}

/**
 * Define sortRules class
 * It will be used to mark which columns will be sorted and using what function
 */

function sortRulesClass(sortVariable) {
	this.rules = new Array;
	this.sortVariable = sortVariable;
	/**
	 * Adds a new rule
	 * @param headerIndex index of the header who's rule we're adding in the table's children
	 * @param sortColumn which column of the table corresponds to the header
	 * @param sortMethod the method we'll use to compare the Column's cells
	 */
	this.add = function (headerIndex, sortColumn, sortMethod) {
		this.rules[headerIndex] = {
			sortColumn: sortColumn,
			sortMethod: sortMethod
		};
	}
}

/**
 * Function that evalutates an XPath and return on node
 */
function getSingleNode(XPath) {
	return document.evaluate(XPath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

/**
 * The function that does all the sorting
 * @param XPath path to the table's rows which it'll sort by (the table's headers must no be included in the XPath)
 * @param sortColumn index of the column we'll sort by
 * @param compare a function that will be used to compare the entries of the table
 */
function sortTable(XPath, sortColumn, compare) {
	var rows = document.evaluate(XPath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 1; i < rows.snapshotLength; i++) {
		var row1 = rows.snapshotItem(i), row2 , j;
		for (j = 0; j < i; j++) {
			row2 = rows.snapshotItem(j);
			if (compare(row1.children[sortColumn],row2.children[sortColumn]))
				break;
		}
		if (i != j) {
			row2.parentNode.insertBefore(row1,row2);
			rows = document.evaluate(XPath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		}
	}
}

/**
 * Function that sets the listener on the header of the table for sorting
 * @param headingsXPath the path ot the tables headers
 * @param rowsXPath path to the table's elements excluding the headers
 * @param sortRules a sortRulesClass object containing information on which columns to sort and the function to use on each colum
 */
function addSortTable(headingsXPath, rowsXPath, sortRules) {
	var headingsRow = getSingleNode(headingsXPath)
	if (headingsRow) {
		headingsRow.addEventListener("click", function(event) {
			var clicked = event.target.cellIndex;
			var rule = sortRules.rules[clicked];
			if (rule) {
				if (addSortTable.sortedColumn) {
					var sortArrow = getSingleNode("//img[@name='sortArrow']")
					if (sortArrow)
						sortArrow.parentNode.removeChild(sortArrow);
				}
				if (addSortTable.sortedColumn == clicked) {
					sortTable(rowsXPath, rule.sortColumn, reverseNodes);
					addSortTable.sortedColumn *= -1;
					event.target.innerHTML += "<img src=\"" + sortArrowUp + "\" name=\"sortArrow\">";
				} else {
					sortTable(rowsXPath, rule.sortColumn, rule.sortMethod);
					addSortTable.sortedColumn = clicked;
					event.target.innerHTML += "<img src=\"" + sortArrowDown + "\" name=\"sortArrow\">";
				}
				
				//Store the sorted column for auto sorting
				GM_setValue(sortRules.sortVariable,addSortTable.sortedColumn);
			}
		}, true);

		for (var i = 0; i < sortRules.rules.length; i++) {
			if (sortRules.rules[i]) {
				if (headingsRow.children[i])
					headingsRow.children[i].style.cursor = "pointer";
			}
		}
		
		//If autosorting is true click the last sorted column
		var col = Math.abs(GM_getValue(sortRules.sortVariable))
		var reverse = GM_getValue(sortRules.sortVariable) < 0;

		if (GM_getValue("autoSort") && (col) && headingsRow.children[col]) {
			headingsRow.children[col].click();
			if (reverse)
				headingsRow.children[col].click();
		}
	} else
		GM_log("addSortTable error: can't find headings on xpath: " + headingsXPath);
}

/*******************************************************************************
 *							Sorting functions
 ******************************************************************************/
/**
 * Compares arithmetical cells
 */
function compareNumberNodes(node1, node2) { //Propably needs some optimization
	//The ifs are for placing the "??? Gold" of the battlefield in the bottom of the table
	//If node1 (the node we have picked in the for and are trying to sort) is null then leave it where it is
	if (!node1.textContent.getNumber()) {
		return false;
	}
	//If node2 (the node we are currently comparing against node1) is null then picked node should go before node2
	if (!node2.textContent.getNumber()) {
		return true;
	}
	return (node1.textContent.getNumber() > node2.textContent.getNumber());
}
/**
 * Compares sting nodes
 */
function compareCharNodes(node1, node2) {
	return node1.textContent.toLowerCase() < node2.textContent.toLowerCase();
}
/**
 * Reverses the table's rows
 */
function reverseNodes(node1, node2) {
	return true;
}





/**
 * Create the rules and add them to the table
 */
var sortRules = new sortRulesClass("battlefieldSort");
sortRules.add(1, 1, compareCharNodes);
sortRules.add(2, 2, compareCharNodes);
sortRules.add(3, 3, compareNumberNodes);
sortRules.add(4, 5, compareNumberNodes);
sortRules.add(5, 6, compareNumberNodes);
sortRules.add(6, 7, compareNumberNodes);
addSortTable("//table[@class='table_lines battlefield']/tbody/tr[1]", "//table[@class='table_lines battlefield']/tbody/tr[@class='player']", sortRules);


/**
 * Default value for auto sorting
 */
if (GM_getValue("autoSort") == null)
	GM_setValue("autoSort",true);

/**
 * Menu option to turn off auto sorting
 */
if (GM_getValue("autoSort"))
	GM_registerMenuCommand("Turn auto sort off", autoSort, "T");
else 
	GM_registerMenuCommand("Turn auto sort on", autoSort, "T");

/**
 * Function to turn on/off auto sorting
 */
function autoSort() {
	if (GM_getValue("autoSort"))
		GM_setValue("autoSort",false);
	else 
		GM_setValue("autoSort",true);
}