// ==UserScript==
// @name           Authorize.net Receipt Formatting
// @namespace      http://axisofevil.net/~xtina
// @description    Make the Authorize.net "Printable Receipt" into something better.
// @include        https://account.authorize.net/*/popup.aspx?page=history&sub=printtrandetail*
// ==/UserScript==

// This sets the maximum height and width of the logo.  Go to File > Print
// Preview to see what the page will look like before printing; use that to
// tinker with the values below.
var anHeight = '150px';
var anWidth  = '300px';

// Set the menu.
GM_registerMenuCommand("Set Letterhead", setHead);

// The window for entering in the letterhead info.
function setHead() {
	editWindow = window.open("about:blank", "_blank", "width=450, height=300, resizable=1");

// Style tiem.
	editWindow.document.writeln('<html><head><style type="text/css">body, td { font-family: Verdana; font-size: 10pt; color: #036; text-align: center; }');
	editWindow.document.writeln('form { border: 1px #CCC dotted; width: 400px; text-align: center; } p { color: #000; text-align: left; padding: 0 10px 0 10px;}');
	editWindow.document.writeln('td.opt { color: #000; } hr { border: 1px dotted #CCC; } input.txt, textarea, table { width: 380px; } </style></head><body>');

// Open the form, and warn.
	editWindow.document.writeln("<form name='letterhead' action='about:blank'>");
	editWindow.document.writeln("<p>Note: You should probably remove the header/footer for this to display properly.</p>");
	editWindow.document.writeln("<p>To do this, go to File &gt; Page Setup and click on the Margins &amp; Header/Footer tab, then make sure that all drop-down boxes are set to '--blank--'.</p><hr />");

// The logo part.
	editWindow.document.writeln("Enter the URL to your logo.<br />");
	editWindow.document.writeln("<input class='txt' name='logo_url' type='text' value='" + GM_getValue("logo_url", "") + "' /><br /><br />");

// The address part.
	editWindow.document.writeln("Enter the company address block.<br />");
	editWindow.document.writeln("<textarea class='txt' name='address' id='address' rows='8'>");
	editWindow.document.writeln(GM_getValue("address", ""));
	editWindow.document.writeln("</textarea><br /><br />");

// The layout part and options.
	editWindow.document.writeln("Your preferred orientation?<br />");
	editWindow.document.writeln("<center><table border=1 cellpadding=5 cellspacing=-1><tr>");

	editWindow.document.writeln("<td><input type='radio' name='orient' value='logo'");
	if (GM_getValue("orient", "") == "logo") { editWindow.document.writeln(" checked"); } 
	editWindow.document.writeln("></td>");

	editWindow.document.writeln("<td><input type='radio' name='orient' value='both'");
	if (GM_getValue("orient", "") == "both") { editWindow.document.writeln(" checked"); } 
	editWindow.document.writeln("></td>");

	editWindow.document.writeln("<td><input type='radio' name='orient' value='addy'");
	if (GM_getValue("orient", "") == "addy") { editWindow.document.writeln(" checked"); } 
	editWindow.document.writeln("></td></tr>");

	editWindow.document.writeln("<tr><td class='opt'>[Logo] [Address]</td><td class='opt'>[Logo]<br />[Address]</td><td class='opt'>[Address] [Logo]</td></tr></table></center><br />");

// La la close out.
	editWindow.document.writeln("<input type='submit' value='Set Letterhead'><br />");
	editWindow.document.writeln("</form>");
	editWindow.document.writeln("</body></html>");

	editWindow.document.close();

	var form = editWindow.document.forms.namedItem("letterhead");
	form.addEventListener("submit", processForm, true); 
	editWindow.focus();
}

// Process the form - set all the elements.
function processForm() {
	var form = editWindow.document.forms.namedItem("letterhead");

	var orient = editWindow.document.getElementsByName("orient");
	for (var x = 0; x < orient.length; x++) {
		if (orient[x].checked) {
			GM_setValue("orient", orient[x].value);
			break;
		}
	}
	var elem = form.elements.namedItem("logo_url").value;
	GM_setValue("logo_url", elem);
	var elem = form.elements.namedItem("address").value;
	GM_setValue("address", trim(elem));
	
	editWindow.close();
	location.reload();
}

// Code from: http://www.webtoolkit.info/javascript-trim.html
function trim(str, chars) {
    return ltrim(rtrim(str, chars), chars);
}
function ltrim(str, chars) {
    chars = chars || "\\s";
    return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
}
function rtrim(str, chars) {
    chars = chars || "\\s";
    return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
}


/* *** */


// Grab those values.
var anLogo = GM_getValue("logo_url", "");
var anAddy = GM_getValue("address", "");
var anOrient = GM_getValue("orient", "logo");

// Get all the cells and find the interesting parts.
var allCells = document.getElementsByTagName("td");
for (var x = 0; x < allCells.length; x++) {
	if (allCells[x].innerHTML.indexOf("Description:") > -1) break;
}

// Start the table.
var newReceipt = document.createElement("table");
newReceipt.setAttribute("border", 0);
newReceipt.setAttribute("cellpadding", 10);
newReceipt.setAttribute("width", "100%");
var newBody = document.createElement("tbody");

// Set the section titles.
var allThs = new Array("Description", "Submission Date", "Transaction ID", "Transaction Status", "Authorization Code", "Card Number", "Payment Method", "Amount", "Invoice");

// Letterhead tiem.
var newRow, newCell;

newRow = document.createElement("tr");
newRow.setAttribute("valign", "top");

switch(anOrient) {
	case "logo":
		// Logo.
		newCell = document.createElement("td");
		newCell.setAttribute("width", "40%");
		var newTmp = document.createElement("img");
		newTmp.setAttribute("src", anLogo);
		newTmp.setAttribute("style", "padding-bottom: 75px; max-height: " + anHeight + "; max-width: " + anWidth + ";");
		newCell.appendChild(newTmp);
		newRow.appendChild(newCell);

		// Address block.
		newCell = document.createElement("td");
		newCell.setAttribute("align", "right");
		newCell.setAttribute("width", "60%");
		newCell.innerHTML = anAddy.replace(/\n/g, "<br />");
		break;
	case "addy":
		// Address block.
		newCell = document.createElement("td");
		newCell.setAttribute("width", "40%");
		newCell.innerHTML = anAddy.replace(/\n/g, "<br />");
		newRow.appendChild(newCell);

		// Logo.
		newCell = document.createElement("td");
		newCell.setAttribute("width", "60%");
		newCell.setAttribute("align", "right");
		var newTmp = document.createElement("img");
		newTmp.setAttribute("src", anLogo);
		newTmp.setAttribute("style", "padding-bottom: 75px; max-height: " + anHeight + "; max-width: " + anWidth + ";");
		newCell.appendChild(newTmp);
		break;
	case "both":
		newCell = document.createElement("td");
		newCell.setAttribute("align", "center");

		newCell.innerHTML = "<img src='" + anLogo + "' style='max-height: " + anHeight + "; max-width: " + anWidth + ";'><br />";
		newCell.innerHTML += anAddy.replace(/\n/g, "<br />") + '<br />';
		break;
	default:
		newCell = document.createElement("td");
		newCell.innerHTML = "";
}

newRow.appendChild(newCell);
newBody.appendChild(newRow);

// Add the Receipt line first.
newRow = document.createElement("tr");
newRow.setAttribute("valign", "top");
newCell = document.createElement("td");
newCell.setAttribute("colspan", 2);
newCell.setAttribute("style", "border-bottom: 1px #069 solid;");
var returnLink = document.createElement("a");
returnLink.setAttribute("onClick", "javascript:window.open('https://account.authorize.net/UI/themes/anet/merch.aspx?page=history&sub=detail&transID=" + window.location.href.split("transid=")[1] + "')");
returnLink.setAttribute("style", "text-decoration: none; text-align: left; color: #069; font-weight: bold; font-size: 14pt; cursor: pointer;");
returnLink.innerHTML = "Receipt";
newCell.appendChild(returnLink);
newRow.appendChild(newCell);
newBody.appendChild(newRow);

// Add the details.
for (var y = 0; y < allThs.length; y++) {
	x++; //To get the value.

	// Set the browser window title.
	if (allThs[y] == "Invoice") {
		if (allCells[x].innerHTML == '') {
			document.title = "(no title)";
		} else {
			document.title = allCells[x].innerHTML;
		}
	}

	// Correct for junk HTML.
	var cellText = allCells[x].innerHTML;
	if (cellText.match("&nbsp;")) { cellText = cellText.substr(0, cellText.length - 6); }
	if (cellText.match("<!--")) { cellText = cellText.substr(0, cellText.indexOf("<!--")); }

	newRow = document.createElement("tr");
	newRow.setAttribute("valign", "top");

	newCell = document.createElement("td");
	newCell.appendChild(document.createTextNode(allThs[y] + ':'));
	newRow.appendChild(newCell);

	newCell = document.createElement("td");
	newCell.appendChild(document.createTextNode(cellText));
	newRow.appendChild(newCell);

	newBody.appendChild(newRow);
	x++; //To move to the next row.
}

// If there's any billing/shipping...
x += 5;
var newBill = '';
var newShip = '';

for (var y = x; y < allCells.length; y++) {
	if (y % 2 == 1) {	// Shipping.
		if (allCells[y].innerHTML != '') {
			newShip += allCells[y].innerHTML + '<br />';
		}
	} else {			// Billing.
		if (allCells[y].innerHTML != '') {
			newBill += allCells[y].innerHTML + '<br />';
		}
	}
}

if (newBill != '') {
	newRow = document.createElement("tr");
	newRow.setAttribute("valign", "top");

	newCell = document.createElement("td");
	newCell.appendChild(document.createTextNode('Billing Information:'));
	newRow.appendChild(newCell);

	newCell = document.createElement("td");
	newCell.innerHTML = newBill;
	newRow.appendChild(newCell);

	newBody.appendChild(newRow);
}

if (newShip != '') {
	newRow = document.createElement("tr");
	newRow.setAttribute("valign", "top");

	newCell = document.createElement("td");
	newCell.appendChild(document.createTextNode('Shipping Information:'));
	newRow.appendChild(newCell);

	newCell = document.createElement("td");
	newCell.innerHTML = newShip;
	newRow.appendChild(newCell);

	newBody.appendChild(newRow);
}

// Add and replace.
newReceipt.appendChild(newBody);

var theForm = document.getElementsByTagName("form")[1];
theForm.parentNode.replaceChild(newReceipt, theForm);

// Uncomment this to test.
//theForm.parentNode.appendChild(newReceipt);
