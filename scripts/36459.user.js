// ==UserScript==
// @name           {deviantART} Add Submission Post Dates
// @namespace      http://wolfey.sillydog.org/
// @description    Adds the date a submission was posted under that submission's title.
// @include        http://*.deviantart.com/gallery/*
// @include        http://*.deviantart.com/favourites/*
// ==/UserScript==

// [Last Updated] June 2, 2011

var daAddDates = function () {
	
	// Set variables
	
	var currentItem, currentItemNode, currentItemTitle, itemDate, itemDateLocation, itemDateSpan, itemDateSpanText, itemDay, itemFullDate, itemLineBreak, itemMonth, itemYear, thumbnailPreviews = "";
	
	// Determine where the thumbnail previews section is located
	
	thumbnailPreviews = document.getElementById("gmi-ResourceStream");
	
	// Find and add a submission date for each item
	
	for (currentItem = 0; currentItem < thumbnailPreviews.getElementsByTagName("div").length; currentItem = currentItem + 1) {
		
		if (thumbnailPreviews.getElementsByTagName("div")[currentItem].getAttribute("class") !== null) {
			
			if (thumbnailPreviews.getElementsByTagName("div")[currentItem].getAttribute("class").split(" ")[0] === "tt-a") {
				
				// Set a variable for the current item
				
				currentItemNode = thumbnailPreviews.getElementsByTagName("div")[currentItem];
				
				// Set a variable for the item's full submission date
				
				itemFullDate = "";
				
				// Find the item's "title" attribute (which contains the submission date)
				
				itemDate = currentItemNode.getElementsByTagName("a")[1].getAttribute("title");
				
				// Extract the submission date
				
				itemDateLocation = itemDate.match("[A-z]{3} [0-9]{1,2}, [0-9]{4}");
				
				// Convert the submission date to a string
				
				itemDateLocation = String(itemDateLocation);
				
				// Remove the comma from the submission date
				
				itemDateLocation = itemDateLocation.replace(",", "");
				
				// Set individual variables for the item's day, month and year
				
				itemDay = itemDateLocation.split(" ")[1];
				itemMonth = itemDateLocation.split(" ")[0];
				itemYear = itemDateLocation.split(" ")[2];
				
				// Add a leading zero to the day's value if it is under ten
				
				if (itemDay < 10) {
					
					itemDay = "0" + itemDay;
					
				}
				
				// Convert the month shorthand into a number
				
				if (itemMonth === "Jan") {
					
					itemMonth = "01";
					
				}
				
				else if (itemMonth === "Feb") {
					
					itemMonth = "02";
					
				}
				
				else if (itemMonth === "Mar") {
					
					itemMonth = "03";
					
				}
				
				else if (itemMonth === "Apr") {
					
					itemMonth = "04";
					
				}
				
				else if (itemMonth === "May") {
					
					itemMonth = "05";
					
				}
				
				else if (itemMonth === "Jun") {
					
					itemMonth = "06";
					
				}
				
				else if (itemMonth === "Jul") {
					
					itemMonth = "07";
					
				}
				
				else if (itemMonth === "Aug") {
					
					itemMonth = "08";
					
				}
				
				else if (itemMonth === "Sep") {
					
					itemMonth = "09";
					
				}
				
				else if (itemMonth === "Oct") {
					
					itemMonth = "10";
					
				}
				
				else if (itemMonth === "Nov") {
					
					itemMonth = "11";
					
				}
				
				else if (itemMonth === "Dec") {
					
					itemMonth = "12";
					
				}
				
				// The item's full submission date is available - show it in the format of "DD/MM/YYYY"
				
				itemFullDate = itemMonth + "/" + itemDay + "/" + itemYear;
				
				// Add a "span" element to contain the item submission date
				
				itemDateSpan = document.createElement("span");
				
				// Add a "br" element to split up the lines between the date and user
				
				itemLineBreak = document.createElement("br");
				
				// Add a text node within the "span" element to contain the item submission date
				
				itemDateSpanText = document.createTextNode(itemFullDate);
				
				// Set an "id" attribute for the item submission date's "span" element (for user customization)
				
				itemDateSpan.setAttribute("id", "item_date");
				
				// Set a "style" attribute for the item submission date's "span" element
				
				itemDateSpan.setAttribute("style", "display: block; font-size: smaller;");
				
				// Place the item submission date's text into its "span" element
				
				itemDateSpan.appendChild(itemDateSpanText);
				
				// Place the item submission date's "span" element after its "a" element, the title
				// For "Favorites", add it after its user link
				
				currentItemTitle = currentItemNode.getElementsByTagName("a")[1];
				
				// Add the item submission date to the item
				
				currentItemNode.appendChild(itemDateSpan);
				
			}
			
			// If a submission is marked "deviation in storage", fix its vertical alignment
			
			else if (thumbnailPreviews.getElementsByTagName("div")[currentItem].getAttribute("class") === "tt-a tt-special") {
				
				thumbnailPreviews.getElementsByTagName("div")[currentItem].setAttribute("style", "vertical-align: top;");
				
			}
			
		}
		
	}
	
};

window.addEventListener("load", daAddDates, true);