// RAC Helper
// Author:		Diaa Mahmoud Sami Abdel-Ghani
// Date: 		29/8/2007
// Version:		0.2 - 24/11/2007
// Copyright (c) 2007 Diaa Mahmoud Sami
// This work is licensed under a Creative Commons Attribution-Share Alike 3.0 License
// To view a copy of this license, visit http://creativecommons.org/licenses/by-sa/3.0/
// or send a letter to Creative Commons, 543 Howard Street, 5th Floor,
// San Francisco, California, 94105, USA.

// ==UserScript==
// @name			RAC Helper
// @namespace		http://www.thunderbird-software.com/
// @include			http://www.rentacoder.com/RentACoder/misc/BidRequests/ShowBidRequest.asp?*
// @include			https://www.rentacoder.com/RentACoder/misc/BidRequests/ShowBidRequest.asp?*
// @include			http://www.rentacoder.com/RentACoder/misc/Bids/Threading/ShowRepliesToBid.asp?*
// @include			https://www.rentacoder.com/RentACoder/misc/Bids/Threading/ShowRepliesToBid.asp?*
// @description		Improves the usability of www.rentacoder.com
// ==/UserScript==

// Ideas for more improvements: 
// 1- Add simple Rich-text support to the textarea, like the GM script
// 	  http://www.rhyley.org/gm/flickrRichEdit.user.js or may be check other
//    scripts http://userscripts.org/scripts/search?q=text+area
///2- Add <br>'s automatically to at the end of each line.
///3- On the messages screen(Postings on <Job_Name>): check whether the file actually
//	  has a zip extension or not because otherwise RAC does a very stup behaviour which
//	  is uploading the whole file then telling you that you can't attach anything but *.zip!
// 4- On the messages screen(Postings on <Job_Name>): check whether the message should contain
//    an attachment and warn if one doesn't exist. Use conditions from Gmail Attachment Reminder[
//    http://userscripts.org/scripts/show/2419]
// 5- On the Confirmation screen(Warning: Your comment is not yet posted!), check links in the
//    message for having a valid target and warn if it doesn't.
//
// Known Issues:
// 1- Relative time may be off by one hour due to DST.

// customization variables
var newNodeStyle = "font-size:160%; color:red;";


var milliSecondsPerMinute = 1000 * 60;
var milliSecondsPerHour = 1000 * 60 * 60;
var milliSecondsPerDay = 1000 * 60 * 60 * 24;
var hoursPerDay = 24;
var minutesPerHour = 60;
var minutesPerDay = 60 * hoursPerDay;
var daysPerWeek = 7;
var weeksPerMonth = 4;
var daysPerMonth = weeksPerMonth * daysPerWeek;

//create function, it expects 2 values.
function insertAfter(newElement,targetElement) {
	//target is what you want it to go after. Look for this elements parent.
	var parent = targetElement.parentNode;
	
	//if the parents lastchild is the targetElement...
	if(parent.lastchild == targetElement) {
		//add the newElement after the target element.
		parent.appendChild(newElement);
		} else {
		// else the target has siblings, insert the new element between the target and it's next sibling.
		parent.insertBefore(newElement, targetElement.nextSibling);
		}
}

// TODO: approximation; i.e. 2 days 23 hours -> 3 days,
// 1 hour 55 minutes -> 2 hours, etc

function FormatPeriod(millisecs)
{
	var numMinutes = Math.floor(millisecs / milliSecondsPerMinute) % 60;
	var numHours = Math.floor(millisecs / milliSecondsPerHour) % 24;
	var numDays = Math.floor(millisecs / milliSecondsPerDay);

	var text = "";

	/*
	// Method 1
	if (numDays != 0)
		text += numDays + " day(s)";
	
	if (numDays == 0 || numHours > 4)
		{
		if (text.length != 0)
			text += ", ";
		text += numHours + " hour(s)";
		}
	
	if (numDays == 0 && numHours == 0 ||
		numHours > 4 && numMinutes > 10)
		{
		if (text.length != 0)
			text += ", ";
		text += numMinutes + " minute(s)";		
		}
	*/
	
	// Method 2
	if (numDays != 0)
		text += numDays + " day(s)";
	
	if ((numDays == 0 ||
		((numHours/hoursPerDay) / numDays) > 0.2) && numHours != 0)
		{
		if (text.length != 0)
			text += ", ";
		text += numHours + " hour(s)";
		}
	
	if (numDays == 0 &&
		(numHours == 0 || (numHours != 0 && ((numMinutes/minutesPerHour) / numHours) > 0.2)))
		{
		if (text.length != 0)
			text += ", ";
		text += numMinutes + " minute(s)";
		}

	text += " ago";

	return text;
	/*
	if (numMinutes < minutesPerHour * .8)
	{
	return numMinutes + " minute(s) ago.";
	}
	else if (numHours < hoursPerDay * .8)
	{
	return numHours + " minute(s) ago.";
	}


	else if (Math.abs(numMinutes % 60) < 10)
	{
	return (Math.abs(2.1)
	}
	*/
}

function Wrap(text, width)
	{
	const chunks = text.split(/\b/);	// break words at spaces, tabs and dashes
	var currentLineLength = 0;
	var wrapped = "";
	
	for each (c in chunks)
		{
		if (currentLineLength + c.length > width)
			{
			wrapped += '\n'
			currentLineLength = 0;
			}
			
		wrapped += c;
		
		const newlinePos = c.indexOf('\n');
		if (newlinePos == -1)
			currentLineLength += c.length;
		else
			currentLineLength = c.length - newlinePos;
		}
	
	// remove the last character because it is an
	// extra space.
	wrapped = wrapped.substr(0, wrapped.length);

	return wrapped;
	}

function RacQuoter(node)
	{
	// extract
	var children = this.parentNode.parentNode.parentNode.parentNode.parentNode.childNodes[0].childNodes;
	
	var text = "";
	for (var i = 0; i < children.length; i ++)
		{
		if (children[i].nodeType == children[i].ELEMENT_NODE)
			{
			if (children[i].nodeName == "BR")
				text += "\n";
			}
		else
			text += children[i].nodeValue.replace(/\n/g, "");
		}

	text = text.replace(/\s+/," ");	// Replace multiple spaces with one.
	text = text.replace(/^\s+/,"");	// Left trim
	text = text.replace(/\s+$/,"");	// Right trim
	
	// wrap
	wrapped = Wrap(text, 75);
	
	// quote
	const quotingMark = "> "
	wrapped = quotingMark + wrapped.replace(/\n/g, '\n' + quotingMark);
	
	document.getElementsByTagName("textarea")[0].value=wrapped;
	}

textArea = document.getElementById("txtBidComment");

function AddBrs()
{
	textArea.value = textArea.value.replace(/\n/gi,"<br>\n");
}

var tables = document.getElementsByTagName('table')
for (var i=0,l=tables.length; i<l; i++)
	{
	if (tables[i].id == "Table10")
		{
		var td = tables[i].getElementsByTagName("td")[0];
		if (td.className=="SmallRow")
			{
			newCell = td.parentNode.insertCell(1);
			newCell.setAttribute('valign', 'bottom');
			newCell.className = td.className
			var innerHtml = "<a href=\'#reply\'>Quote</a>";
			newCell.innerHTML = innerHtml;
			newCell.getElementsByTagName("a")[0].addEventListener("click", RacQuoter, false);
			}
		}
	}

var now = new Date();
var messagesTable = document.getElementById("tblBigTable")
if (messagesTable)
	{
	var tds = messagesTable.getElementsByTagName("td");

	var dayOfWeekRegexp = /(Sunday)|(Monday)|(Tuesday)|(Wednesday)|(Thursday)|(Friday)|(Saturday)/i;

	for (var i=0,l=tds.length; i<l; i++)
		{
		if (tds[i].className == "smallrow")
			{
			fontNodes = tds[i].getElementsByTagName("font");
			var fontNode = 0;
			for (var j=0,m=fontNodes.length; j<m; j++)
				if (fontNodes[j].innerHTML.search(dayOfWeekRegexp) != -1)
					{
					fontNode = fontNodes[j];
					break;
					}

			if (fontNode == 0)
				continue;
			
			// for opitmization, instead of using the regexp again.
			dayOfWeek = RegExp.lastMatch;
			
			var textNode;
			var startIndex;
			for (var k=0,n=fontNode.childNodes.length; k<n; k++)
				if (fontNode.childNodes[k].nodeType == fontNode.TEXT_NODE &&
					(startIndex = fontNode.childNodes[k].nodeValue.search(dayOfWeek)) != -1)
					{
					textNode = fontNode.childNodes[k];
					break;
					}

			var timeZoneNode = textNode.nextSibling;
			if (!(timeZoneNode.nodeType == timeZoneNode.ELEMENT_NODE &&
				  timeZoneNode.nodeName == "A" &&
				  timeZoneNode.childNodes[0].nodeType == fontNode.TEXT_NODE))
				 {
				 // found faulty node, skip it.
				 //alert("Node skipped");
				 continue;
				 }
			
			// read date starting from day of week until PM|AM
			// and insert the relative date after PM
			var endIndex = textNode.nodeValue.search(/(A|P)M/i) + 2;

			var newNode = document.createElement("span"); 
			var timeZone = timeZoneNode.childNodes[0].nodeValue;
				
			var date = new Date(textNode.nodeValue.substr(startIndex, endIndex - startIndex) + ' ' + timeZone);
			
			var diff = now - date;
			
			var newNodeText = " [" + FormatPeriod(diff) + ']';
			newNode.appendChild(document.createTextNode(newNodeText));
			//newNode.style.fontSize= "160%";
			newNode.setAttribute("style", newNodeStyle, 1);
			//newNode.style.fontWeight= "bolder";
			
			insertAfter(newNode, timeZoneNode);
			}
		}
	}
// Add "Add <br>'s" link
linksDiv = document.createElement("div");
linksDiv.setAttribute("style", "margin-left: 5px; margin-right: 5px; padding-left: 5px; padding-right: 5px;");
linksDiv.innerHTML = "<a href='javascript:;'>Add &lt;br&gt;'s</a>";
textArea.parentNode.insertBefore(linksDiv, textArea);
addBrsLink = linksDiv.getElementsByTagName("a")[0];
addBrsLink.addEventListener("click", AddBrs, false);

// Add check for zip file extension
//var xpath_result = document.evaluate("//input[@type='submit' and @name='B1']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null );
//var button = xpath_result.singleNodeValue;

if (unsafeWindow.FrontPage_Form1_Validator)
	{
	oldValidatorFunc = unsafeWindow.FrontPage_Form1_Validator;
	unsafeWindow.FrontPage_Form1_Validator = function(theForm) {
		if (oldValidatorFunc(theForm))
			{
			fileChooser = document.getElementById("File1");
			filename = fileChooser.value;
			m = filename.match(/^.+\.zip$/i);
			
			if (filename.length > 0 && m == null)
				{
				alert("Attached file extension must be zip!");
				return false;
				}
			else
				return true;
			}
		else
			return false;
	   }
	}