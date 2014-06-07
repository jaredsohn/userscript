// Move Reddit Buttons
// Author: Ictinus
// Released: 16 May 2010, move buttons to the right of vote arrows.
// Updated: 11 June 2010, CSS min-width specified to prevent hide shift.
// Updated: 03 July 2010, fixed button move in user comments. Added 'context' button to list of those moved.
// Updated: 07 July 2010, prevent script running twice with exclude.
// Updated: 30 August 2010, don't process buttons when there are none.
// Updated: 19 November 2010, allowed each button to be moved or not.
// Updated: v1.20 10 July 2011, added 'applyToComments' flag to allow comment buttons to remain untouched.
// Updated: v1.21 11 July 2011, removed 'collapse' btn incomplete code.
// Updated: v1.22 20 September 2011, i be fixin. aargh, too late!

// ==UserScript==
// @name			Move Reddit Buttons
// @version 		1.22
// @namespace		http://ictinus.com/mrb/
// @description		Moves the Reddit buttons so that they are in a consistent position regardless of title length (vertical) or comment count (horizontal) changes.
// @include			http://www.reddit.com/*
// @exclude			http://www.redditmedia.com/*
// @exclude         http://www.reddit.com/comscore-iframe/*
// @exclude         http://static.reddit.com/*
// ==/UserScript==

var moveRedditButtons = {
	// Start editable settings, set true to move buttons, false to not move them.
	moveShare: true,  
	moveSave: true,
	moveHide: true,
	moveReport: false,
	movePermalink: true,
	moveContext: true,
	moveParent: true,
	moveEdit: true,
	moveDelete: true,
	moveReply: true,
	
	applyToComments: false,
	applyToUserOverview: true,
	applyToUserComments: true,
	// End editable settings
	
	version : 1.21,
	toRegEx: function (bTest, strSearch, strNewEx) {
		return (bTest)?((strSearch==="")?strNewEx:strNewEx+"|"+strSearch):strSearch;
	},
	init: function () {
		var allDivs, thisDiv;
		//identify the type of page: reddit; user;
		var b
		
		allDivs = document.evaluate(
			"//div[contains(@class,'entry')]",
			document,
			null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			null);
		var strSearch = "";
		strSearch = this.toRegEx(this.moveReply,strSearch,"reply");
		strSearch = this.toRegEx(this.moveDelete,strSearch,"delete"); strSearch = this.toRegEx(this.moveDelete,strSearch,"pillage");
		strSearch = this.toRegEx(this.moveEdit,strSearch,"edit"); strSearch = this.toRegEx(this.moveEdit,strSearch,"be editin'");
		strSearch = this.toRegEx(this.moveParent,strSearch,"parent");
		strSearch = this.toRegEx(this.moveContext,strSearch,"context");
		strSearch = this.toRegEx(this.movePermalink,strSearch,"permalink"); strSearch = this.toRegEx(this.movePermalink,strSearch,"permasail");
		strSearch = this.toRegEx(this.moveReport,strSearch,"report"); strSearch = this.toRegEx(this.moveReport,strSearch,"be squawkin'");
		strSearch = this.toRegEx(this.moveHide,strSearch,"hide"); strSearch = this.toRegEx(this.moveHide,strSearch,"stow");
		strSearch = this.toRegEx(this.moveShare,strSearch,"share");
		strSearch = this.toRegEx(this.moveSave,strSearch,"save"); strSearch = this.toRegEx(this.moveSave,strSearch,"be savin'");

		strSearch = new RegExp(strSearch,"i"); 

		for (var i = 0; i < allDivs.snapshotLength; i++) {
			thisDiv = allDivs.snapshotItem(i);
			var nodeParent = thisDiv.parentNode;
			if (this.applyToComments || !moveRedditButtons.hasClass(nodeParent, 'comment')) {
				//create the moved buttons div
				var newBtns, newClear;
				newBtns = document.createElement('div');
				newBtns.className = 'movedButtons';
				newClear = document.createElement('div');
				newClear.className = 'clearleft';
				newClear.innerHTML = '<!--IESux-->';
				
				//get the button content
				var allULs, btnContent;
				allULs = thisDiv.getElementsByTagName('ul');
				btnContent = allULs[allULs.length-1]; //hack, grab the last UL to be found, should be class='flat-list buttons'
				
				//insert the button content
				if (typeof(btnContent) != 'undefined') {
					newBtns.innerHTML = '<ul class="buttons">' + btnContent.innerHTML + '</ul>';
					//remove unwanted buttons from original button ul
					var allLIs = btnContent.getElementsByTagName('li');
					for (var iLI = allLIs.length-1; iLI >= 0; iLI--) {
						var objLink = allLIs[iLI].getElementsByTagName('a');
						if (typeof(objLink[0]) != 'undefined') {
							if (objLink[0].innerHTML.search(strSearch) != -1) {
								allLIs[iLI].parentNode.removeChild(allLIs[iLI]);
							}
						}
					}
					//now insert the moved buttons
	//				var nodeParent = thisDiv.parentNode;
					var divMidCol = nodeParent.getElementsByClassName('midcol');
					if (typeof(divMidCol[0]) != 'undefined') {
						
						nodeParent.insertBefore(newBtns, divMidCol[0].nextSibling);
						nodeParent.insertBefore(newClear, thisDiv.nextSibling);
					
						//remove unwanted buttons from moved Buttons
						var allLIs = newBtns.getElementsByTagName('li');
						for (var iLI = allLIs.length-1; iLI >= 0; iLI--) {
							var objLink = allLIs[iLI].getElementsByTagName('a');
								if (typeof(objLink[0]) != 'undefined') {
								
								if (objLink[0].innerHTML.search(strSearch) === -1) {
									allLIs[iLI].parentNode.removeChild(allLIs[iLI]);
								}
							} else {
								allLIs[iLI].parentNode.removeChild(allLIs[iLI]);
							}
						}
					}
				}
			}
		}
	},
	addGlobalStyle: function(css) {
		var head, style;
		head = document.getElementsByTagName('head')[0];
		if (!head) { return; }
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		head.appendChild(style);
	},
	hasClass : function(el, selector) {
		var className = " " + selector + " ";
		if ((" " + el.className + " ").replace(/[\n\t]/g, " ").indexOf(className) > -1) {
			return true;
		}
		return false;
	}
}

if (document.body) { 
moveRedditButtons.addGlobalStyle('div.movedButtons{float:left; padding-right: 5px; min-width:4em;} div.movedButtons ul li a {color:#888; font-weight:bold; display:block;} div.movedButtons ul li{padding:1px;} div.movedButtons ul li:hover{padding:1px; background-color:#DDD; -webkit-border-radius: 2px; -moz-border-radius: 2px; border-radius:2px;} div.movedButtons ul li:hover a {color:#111; width:100%;}');
moveRedditButtons.init();
}
