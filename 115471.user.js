// ==UserScript==
// @name           Kickstarter Sortable
// @namespace      com.westpalmetto.scripts.kickstarter.sortable
// @description    Makes lists of backed and bookmarked pages within Kickstarter sortable.
// @include        http://www.kickstarter.com/profiles/*
// @include        https://www.kickstarter.com/profiles/*
// @author         Weston Clowney
// @version        1.1
// ==/UserScript==

/*
 * Latest update: 1 August 2012
 *    - Corrections for Kickstarter updates
 */

/*
 * Returns elements that have the given classname.
 * 
 * @param clsssName The classname for which to search
 * @param rootNode The element under which to search (Optional; defaults to document)
 * @return An array of matching elements.
 */
var getElementsByClassName = function(className, rootNode){
    var root = rootNode || document,
        clssEls = [],
        elems,
        clssReg = new RegExp("\\b" + className + "\\b");

    // use the built in getElementsByClassName if available
    if (document.getElementsByClassName){
        return root.getElementsByClassName(className);
    }

    // otherwise loop through all(*) nodes and add matches to clssEls
    elems = root.getElementsByTagName('*');
    for (var i = 0, len = elems.length; i < len; i+=1){
        if (clssReg.test(elems[i].className)) clssEls.push(elems[i])
    }

    return clssEls;
};

/*
 * Replaces the contents of an element with the given child.
 * 
 * @param target The element whose contents will be replaced
 * @param newContents The new child to append to element
 */
var replaceContents = function(target, newContents){
    while (target.childNodes.length >= 1){
        target.removeChild(target.firstChild);
    }
    target.appendChild(newContents);
}

/*
 * Sets up sorttable.js, to allow simple table sorting.
 */
var sorttableSetup = function (){
    if(!sorttableExists){
		//Add sorttable script to doc
		scriptTag = document.createElement('script');
		scriptTag.src = 'http://www.kryogenix.org/code/browser/sorttable/sorttable.js';
		scriptTag.type = 'text/javascript';
		document.getElementsByTagName('HEAD')[0].appendChild(scriptTag);
		
		//Wait for script to be loaded, and save to global namespace
		this.sorttableInit = function() {
			if(typeof unsafeWindow.sorttable == 'undefined') {
				window.setTimeout(sorttableInit,100);
			} else { 
				sorttable = unsafeWindow.sorttable;
			}
		};
		this.sorttableInit();
		
		//Update the flag
		sorttableExists = true;
	}
};
var sorttableExists = false;

/*
 * Object to contain funcitonality pertaining specifically to handling of table.backings
 */
var Backings = new function(){
	this.pledgeSplit = function(table){
		//Get the pledge header element
		pledgeHeader = table.getElementsByTagName('th')[3];
		
		//Replace the contents
		replaceContents(pledgeHeader, document.createTextNode("Pledge Amount"));
		
		//Create & insert the pledge date header
		dateHeader = document.createElement('th');
		dateHeader.appendChild(document.createTextNode("Pledge Date"));
		pledgeHeader.parentNode.insertBefore(dateHeader, pledgeHeader.nextSibling);
		
		//Cycle through each row & split the pledge amount & date
		rows = table.getElementsByTagName('tr');
		for(i=1; i<rows.length; i++){
			//Gather the data
			pledgeCell = rows[i].getElementsByTagName('td')[3];
			amount = pledgeCell.getElementsByTagName('strong')[0].innerHTML;
			date = pledgeCell.getElementsByTagName('span')[0].innerHTML.replace(/\((.+)\)/, "$1");
			
			//Replace the existing cell
			replaceContents(pledgeCell, document.createTextNode(amount));
			
			//Create & insert the new date cell
			dateCell = document.createElement('td');
			dateCell.appendChild(document.createTextNode(date));
			pledgeCell.parentNode.insertBefore(dateCell, pledgeCell.nextSibling);
		}
	};
	
	this.init = function(){
		tables = getElementsByClassName("backings");
		for(i=0; i<tables.length; i++){
			table = tables[i];
			sorttableSetup();
			this.pledgeSplit(table);
			
			//Add sortable classname to table & initialize
			table.className = table.className + " sortable";
			sorttable.makeSortable(table);
		}
	};
};

/*
 * Object to contain functionality specific to ol.project-card-list
 */
var CardList = new function(){
	this.listNode = null;
	this.cards = [];
	this.sortSelection = null;
	this.sortAsc = true;
	
	this.ascArrow = "\u2191";
	this.decArrow = "\u2193";
	this.failedBadge = "data:image/png;base64,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";
	
	/*
	 * Card is an object that handles parsing & data storage for a card in a list
	 * 
	 * @param cardNode The DOM node that represents the LI tag of the card
	 * @param pos The original position of the card in the list
	 */
	this.Card = function(cardNode, pos){
		this.node = cardNode;
		this.name = null;
		this.percentFunded = null;
		this.isActive = null;
		this.closing = null;
		this.timeleft = null;
		this.backed = pos;
		
		/*
		 * parseData parses the data contained in the attached node.
		 */
		this.parseData = function(){
			//Determine the name & status of the project
			this.name = this.node.getElementsByTagName('h2')[0].getElementsByTagName('a')[0].innerHTML;
			var isSuccess = getElementsByClassName('badge-success', this.node).length > 0;
			var isFailed = getElementsByClassName('project-failed', this.node).length > 0;
			
			if(isSuccess){
				this.isActive = false;
				this.percentFunded = getElementsByClassName('project-pledged-percent', this.node)[0].childNodes[0].nodeValue.replace(/\s*(\d+)%\s*/, "$1");
				
				//Calculate closing date
				daysNode = getElementsByClassName('last', this.node)[0];
				this.closing = Date.parse(daysNode.childNodes[daysNode.childNodes.length-1].nodeValue.replace(/\s*(.+?)\s*/, "$1"));
				this.timeLeft = 0;
			} else if(isFailed){
				this.isActive = false;
				this.percentFunded = 0;
				
				//Calculate closing date
				daysNode = getElementsByClassName('last', this.node)[0];
				this.closing = Date.parse(getElementsByClassName('project-status', this.node)[0].getElementsByTagName('span')[0].innerHTML.replace(/.*\(([^\)]+)\).*/, "$1"));;
				this.timeLeft = 0;
				
				//Add badge
				badgeImg = document.createElement('img');
				badgeImg.src = CardList.failedBadge;
				badgeImg.style.position = "absolute";
				badgeImg.style.zIndex = "2";
				badgeImg.style.left = "-15px";
				badgeImg.style.top = "-15px";
				this.node.insertBefore(badgeImg, this.node.firstChild);
			} else {//Ongoing
				this.isActive = true;
				this.percentFunded = getElementsByClassName('project-pledged-percent', this.node)[0].childNodes[0].nodeValue.replace(/\s*(\d+)%\s*/, "$1");
				
				//Calculate closing date
				daysNode = getElementsByClassName('last', this.node)[0];
				dataNode = daysNode.getElementsByTagName('strong')[0];

				timeRemaining = getElementsByClassName("num", dataNode)[0].childNodes[0].nodeValue.replace(/\s*(\d+)\s*/, "$1");
				timeUnit = daysNode.getElementsByTagName('div')[1].childNodes[0].nodeValue.replace(/\s*(\w+) \w+.*/, "$1");
				if((timeUnit == "days") || (timeUnit == "day")){
					this.closing = new Date().getTime() + (timeRemaining*24*60*60*1000);
					this.timeLeft = timeRemaining*24*60;
				} else if((timeUnit == "hours") || (timeUnit == "hour")){
					this.closing = new Date().getTime() + (timeRemaining*60*60*1000);
					this.timeLeft = timeRemaining*60;
				} else if((timeUnit == "minutes") || (timeUnit == "minute")){
					this.closing = new Date().getTime() + (timeRemaining*60*1000);
					this.timeLeft = timeRemaining;
				}
			}
		}
		this.parseData();
		
		this.displayData = function(){
			data = "Name: " + this.name
				+ "\nPercent funded: " + this.percentFunded
				+ "\nActive: " + this.isActive
				+ "\nClosing date: " + this.closing;
			return data;
		}
	}
	
	/*
	 * Sorts the list by backing date.
	 */
	this.sortByBacked = function (){
		//Pre-sort
		link = document.getElementById("sortLink-backed");
		CardList.prepareSort(link);
1
		//Sort the list & update the link
		if(CardList.sortAsc){
			CardList.cards.sort(function(a, b){
					return a.backed - b.backed;
				});
			replaceContents(link, document.createTextNode("Date backed " + CardList.ascArrow));
		} else {
			CardList.cards.sort(function(a, b){
					return b.backed - a.backed;
				});
			replaceContents(link, document.createTextNode("Date backed " + CardList.decArrow));
		}
		
		//Update the displayed list
		CardList.updateList();
	}
	
	/*
	 * Sorts the list by time remaining. Closed projects will always be last.
	 */
	this.sortByRemaining = function (){
		//Pre-sort
		link = document.getElementById("sortLink-remaining");
		CardList.prepareSort(link);

		//Sort the list & update the link
		if(CardList.sortAsc){
			CardList.cards.sort(function(a, b){
					comp = 0;
					if(a.timeLeft == 0){
						comp = 1
					} else if(b.timeLeft == 0){
						comp = -1
					} else {
						comp = a.timeLeft - b.timeLeft;
					}
					return comp;
				});
			replaceContents(link, document.createTextNode("Time remaining " + CardList.ascArrow));
		} else {
			CardList.cards.sort(function(a, b){
					comp = 0;
					if(a.timeLeft == 0){
						comp = 1
					} else if(b.timeLeft == 0){
						comp = -1
					} else {
						comp = b.timeLeft - a.timeLeft;
					}
					return comp;
				});
			replaceContents(link, document.createTextNode("Time remaining " + CardList.decArrow));
		}
		
		//Update the displayed list
		CardList.updateList();
	}
	
	/*
	 * Sorts the list by closing date.
	 */
	this.sortByClosing = function (){
		//Pre-sort
		link = document.getElementById("sortLink-closing");
		CardList.prepareSort(link);
1
		//Sort the list & update the link
		if(CardList.sortAsc){
			CardList.cards.sort(function(a, b){
					return a.closing - b.closing;
				});
			replaceContents(link, document.createTextNode("Closing date " + CardList.ascArrow));
		} else {
			CardList.cards.sort(function(a, b){
					return b.closing - a.closing;
				});
			replaceContents(link, document.createTextNode("Closing date " + CardList.decArrow));
		}
		
		//Update the displayed list
		CardList.updateList();
	}
	
	/*
	 * Sorts the list by percent funded.
	 */
	this.sortByFunded = function (){
		//Pre-sort
		link = document.getElementById("sortLink-funded");
		CardList.prepareSort(link);

		//Sort the list & update the link
		if(CardList.sortAsc){
			CardList.cards.sort(function(a, b){
					return b.percentFunded - a.percentFunded;
				});
			replaceContents(link, document.createTextNode("Percent funded " + CardList.ascArrow));
		} else {
			CardList.cards.sort(function(a, b){
					return a.percentFunded - b.percentFunded;
				});
			replaceContents(link, document.createTextNode("Percent funded " + CardList.decArrow));
		}
		
		//Update the displayed list
		CardList.updateList();
	}
	
	/*
	 * Performs all common logic that happens before a sort.
	 */
	this.prepareSort = function(link){
		//Fetch the data
		curSort = CardList.sortSelection;
		curAsc = CardList.sortAsc;
		
		//Clear any existing sort arrow
		if(curSort != null){
			replaceContents(curSort, document.createTextNode(curSort.innerHTML.replace(/(.+) ./, "$1")));
		}
		
		//Determine the sort order
		if(link != curSort){
			CardList.sortSelection = link;
			CardList.sortAsc = true;
		} else {
			CardList.sortAsc = !CardList.sortAsc;
		}
	}
	
	/*
	 * Updates the list, after sorting.
	 */
	this.updateList = function(){
		for(i=0; i<CardList.cards.length; i++){
			card = CardList.cards[i];
			CardList.listNode.removeChild(card.node);
			CardList.listNode.appendChild(card.node);
		}
	}
	
	this.init = function(){
		cardLists = getElementsByClassName("project-card-list");
		for(i=0; i<cardLists.length; i++){
			list = cardLists[i];
			this.listNode = list;
			
			//Parse the cards
			items = list.getElementsByTagName('li');
			for(j=0; j<items.length; j++){
				item = items[j];
				if(item.parentNode == list){
					card = new CardList.Card(item, j);
					this.cards.push(card);
				}
			}
			
			//Add the sort selector
			sortLi = document.createElement('li');
			sortLi.style.margin = "0 0 15px 0";
			
			//Add label
			sortLi.appendChild(document.createTextNode("Sort list by: "));
			
			//Add sort options
			backedSort = document.createElement('a');
			backedSort.id = "sortLink-backed";
			backedSort.addEventListener('click', this.sortByBacked, false);
			backedSort.appendChild(document.createTextNode("Date backed " + CardList.ascArrow));
			sortLi.appendChild(backedSort);
			CardList.sortSelection = backedSort;
			
			sortLi.appendChild(document.createTextNode(" | "));
			remainingSort = document.createElement('a');
			remainingSort.id = "sortLink-remaining";
			remainingSort.addEventListener('click', this.sortByRemaining, false);
			remainingSort.appendChild(document.createTextNode("Time remaining"));
			sortLi.appendChild(remainingSort);
			
			sortLi.appendChild(document.createTextNode(" | "));
			closingSort = document.createElement('a');
			closingSort.id = "sortLink-closing";
			closingSort.addEventListener('click', this.sortByClosing, false);
			closingSort.appendChild(document.createTextNode("Closing date"));
			sortLi.appendChild(closingSort);
			
			sortLi.appendChild(document.createTextNode(" | "));
			closingSort = document.createElement('a');
			closingSort.id = "sortLink-funded";
			closingSort.addEventListener('click', this.sortByFunded, false);
			closingSort.appendChild(document.createTextNode("Percent funded"));
			sortLi.appendChild(closingSort);
			
			//Insert at begininng of list
			list.insertBefore(sortLi, list.childNodes[0]);
		}
	};
}

/*
 * Initializes all possibilities for page updates.
 */
var init = function(){
	Backings.init();
	CardList.init();
};
init();