// ==UserScript==
// @name           {Katbox: Forums} Collapsible Smiley List
// @namespace      http://wolfey.sillydog.org/
// @description    Organizes smileys into groups by character; only the first smiley in each group is shown until hovered over, which will reveal the remaining smileys in that group.
// @include        http://www.katbox.net/forum/index.php?action=post*
// ==/UserScript==

// [Last Updated] January 30, 2009

// Set up a variable for the smiley group

var smileyGroupName = "";

// Set up a variable for the current smiley

var smileyCurrentItem = "";

// Set up a variable for the name of the current smiley

var smileyCurrentItemName = "";

// Set up a variable for the division container to hold the current smiley

var smileyContainer = "";

// Set up a variable for the list item to hold the current smiley group

var smileyGroup = "";

// Set up a variable for the list to hold all of the smiley groups

var smileyList = "";

// Create a list to hold all of the smiley groups

smileyList = document.createElement("UL");

// Find the table cell containing the smileys

var smileyCell = document.getElementById("postmodify").getElementsByTagName("table")[2].getElementsByTagName("table")[0].getElementsByTagName("tr")[5].getElementsByTagName("td")[1];

// Apply a class name of "block_list" to the table cell

smileyCell.className = "block_list";

// Count the total number of smileys

var smileyCellItemCount = smileyCell.getElementsByTagName("a").length;

// Group the smileys together

for (var smileyCellItemTotal = 0; smileyCellItemTotal < smileyCellItemCount; smileyCellItemTotal = smileyCellItemTotal + 1) {
	
	// Find the current smiley
	
	smileyCurrentItem = smileyCell.getElementsByTagName("a")[0];
	
	// Remove the "emotion" part from the smiley group's name, leaving only the character's name/abbreviation
	
	smileyGroupName = smileyCell.getElementsByTagName("a")[0].firstChild.getAttribute("src").split("Smileys")[1].split("/")[2].split(".")[0].match(/[A-Z]\w*/)[0];
	
	// If the "emotion" part is "XD", remove it from the smiley group's name
	
	smileyGroupName = smileyGroupName.replace(/^XD/, "");
	
	// If the name of the current smiley is the same as the group name, it is part of the same group
	
	if (smileyCurrentItemName === smileyGroupName) {
		
		// Add the current smiley to its respective division container
		
		smileyContainer.appendChild(smileyCurrentItem);
		
	}
	
	// If the name of the current smiley is different from the group name, it is the beginning of a new group
	
	if (smileyCurrentItemName !== smileyGroupName) {
		
		// Close the previous list item and start a new one (if not the first smiley in the list)
		
		if (smileyCellItemTotal > 0) {
			
			smileyGroup.appendChild(smileyContainer);
			smileyList.appendChild(smileyGroup);
			
		}
		
		// Create a list item for the smiley group
		
		smileyGroup = document.createElement("LI");
		
		// Apply a class name of "smiley_set" to the list item
		
		smileyGroup.className = "smiley_set";
		
		// Add the smiley group to its list item
		
		smileyGroup.appendChild(smileyCurrentItem);
		
		// Create a new division container
		
		smileyContainer = document.createElement("DIV");
		
		// Add the current smiley to its group
		
		smileyGroup.appendChild(smileyContainer);
		
		// Set the current name of the smiley to match the group name
		
		smileyCurrentItemName = smileyGroupName;
		
	}
	
}

// Create a stylesheet element to hold CSS code

var styleElement = document.createElement("style");

// Provide the necessary CSS code for the collapsible smiley list

var cssCode =
	".block_list {overflow: hidden;}" +
	".block_list a {padding: 2px; height: 16px;}" +
	".block_list br, .block_list li div, .block_list li li {display: none;}" +
	".block_list div a {height: auto;}" +
	".block_list div {background-color:#ECEDF3;}" +
	".block_list img {margin-left: auto; margin-right: auto; border: 0; display: block;}" +
	".block_list li a {display: block; font-style: normal; font-weight: bold;}" +
	".block_list li a, .block_list ul {clear: both;}" +
	".block_list li {float: left; font-style: italic; list-style-type: none;}" +
	".block_list li:hover div, .block_list li:hover li {display: block; position: absolute;}" +
	".block_list ul {margin: 0 -1px; padding: 0;}" +
	".smiley_set {background-color:#ECEDF3;}" +
	".smiley_set, .smiley_set div {width: 42px;}";

// Apply a MIME type of "text/css" to the stylesheet element

styleElement.type = "text/css";

// Add the CSS code the stylesheet element

styleElement.appendChild(document.createTextNode(cssCode));

// Add the stylesheet element to the page head

document.getElementsByTagName("head")[0].appendChild(styleElement);

// Add the collapsible smiley list into the table cell containing the smileys

smileyCell.appendChild(smileyList);