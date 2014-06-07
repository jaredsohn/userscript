// ==UserScript==
// @name           	LessKolPopouts
// @namespace      	bitwes
// @description     Replaces Item and Effect popouts with inline iframes in many but not all places.  A couple of other interface tweaks.  See comments for more description.
// @version			1.1
//
// @require         http://github.com/sizzlemctwizzle/GM_config/raw/master/gm_config.js
// require         http://userscripts.org/scripts/source/49700.user.js
// require         http://userscripts.org/scripts/source/50018.user.js

// @include			http://*kingdomofloathing.com/*
// @include		   	http://localhost:8080/SimpleServer/test_butch.html
// @include			*127.0.0.1*
// @exclude 	 	http://*.kingdomofloathing.com/desc_effect.php*
// @exclude 		http://*.kingdomofloathing.com/topmenu.php*
// @exclude 		http://*.kingdomofloathing.com/chatlaunch.php*
// @exclude 		http://*.kingdomofloathing.com/lchat.php*
// @exclude			http://*.kingdomofloathing.com/login.php*
// @exclude			http://*.kingdomofloathing.com/loggedout.php*
// @exclude			http://*.kingdomofloathing.com/game.php*
// exclude 		http://*.kingdomofloathing.com/familiar.php*
// @exclude 		http://*.kingdomofloathing.com/desc_familiar.php*
// @exclude 		http://*.kingdomofloathing.com/donatepopup*
//
// ==/UserScript==


/*-----------------------------------------------------------------------------
What it does:

**** WARNING ****
This might not play nicely with other scripts because of how it hijacks the 
onclick event for the items.  The old onclick is placed in an attribute of 
oldclick.
**** WARNING ****

This mostly uses iframes to display item information instead of the pop
out windows that normally are used.  The picture of the item will toggle the
iframe display for that item and there is sometimes a "show/hide details" button
that will show/hide all the iframes for a section.  You can shift+click an image
in order to view the pop-out window the normal way.

Places where it works:
-----------------------
	*	Inventory (all three sections on all item types)
			includes closet and Hangk's as well.
	*	Equipped Items (in the equipment inventory page)
	*	All Discoveries Pages
	*	Effects on character.
	*	Most any place.
	*	Prevents outfit description from popping out.

Other stuff it does:
-----------------------
	*	Puts a back button in Iframe when you navigate somewhere else
		(such as htting the effect description on a potion)
	*	Turns item names into coldfront links (kol wiki)
			Inventory (all three sections on all item types)
			Equipped Items
_______________________________________________________________________________
TODO
	*Discoveries wiki links.
-----------------------------------------------------------------------------*/


/*-----------------------------------------------------------------------------
History

Version 1.1
	Now plays nicely with KoLMafia
	Outfit descriptions no longer pop out, they open in the same iframe.
	Iframe widths are now 100% instead of static 250px.  Works in some places
		others it's a little ugly.  This change was mostly made to make it look
		better when 3 columns were shown and to address the width of the
		effects iframes.
	Works on Favorites page in inventory now.
	Settings page located on the KoL options page at the end of the verticle 
		tab list.  Settings for animation frame rate and size change, and 
		the maximum height of the iframe.
	Wiki Links on Discovery Items.
	Scroll to bottom now implemented and is a setting.
	Works on Familiars page now (except the equipped familiar)
-----------------------------------------------------------------------------*/

//array to hold all the itemIframeClass(s) so that they can be referenced elsewhere.
var allIframes=[];

//General constants.
var gBody = document.getElementsByTagName('body') [0];
var gDbgDiv;
var DEBUG=false;

//Holds all settings as defined by the GM_config object.  Look in the init method
//for the list of all the value sin GM_init
var gSettings=null;


//-----------------------------------------------------------------------------
//The back button isn't really a back button.  If the iframe's window's location
//doesn't match the iframe's original src, then a link is added that goes back
//to src.  I had a lot of trouble getting a real back button to work since it
//never wanted to work just for the iframe...it made all kinds of stuff "go back".
//So I went with this approach and gets us 95% of the way there.  
//-----------------------------------------------------------------------------
unsafeWindow.bitwesIframeOnLoad=function(iframeId){
	try{
		var iframe = document.getElementById(iframeId);
		var iframeBody = iframe.contentDocument.getElementsByTagName('body')[0];
		var a;

		//Whenever the window is someplace that isn't the original source for 
		//the iframe we add a back link to take us back there.
		if(iframe.src && iframe.src.toString() != iframe.contentWindow.location.toString()){		
			a = iframe.contentDocument.createElement('a');
			a.innerHTML = "Back";
			a.setAttribute('href', iframe.src.toString());
			iframeBody.insertBefore(a, iframeBody.childNodes[0]);
		}

		//Get rid of the blockquote so that the text fills the iframe instead of being 
		//centered.  That is, of course, if it can be found.  If it can't be found then
		//there was probably a problem.  Append a message informing the user that they
		//can shift click to make it do the original thing.
		var bq = iframe.contentDocument.getElementsByTagName("blockquote")[0];
		if(bq){
			var html = bq.innerHTML;
			var par = bq.parentNode;
			par.removeChild(bq);
			var div = par.appendChild(iframe.contentDocument.createElement('div'));
			div.innerHTML = html;
		//To prevent showing the error message on pages that are linked to from the item 
		//description, we check for the back tag.  An example of a this is the balloon 
		//monkey which has the "Hatches into" link.  The familiar description page
		//does not have a blockquote tag, but will have the back link.
		}else if(!a){
			//Not sure how to tell difference between an error page and a familiar page, so don't show
			//error on famliar description page.
			if(iframe.contentWindow.location.pathname.toString() != "/desc_familiar.php"){
				var div = iframeBody.appendChild(iframe.contentDocument.createElement('div'));
				div.innerHTML = "<font color=\"red\">Oops.  This might be broke.  If it is, then you can " + 
								"use a shift+click to view the pop-out window.  " + 
				                "<i>Actually you can do that anytime, not just when it's broke.</i></font>";
			}
		}		
		
		//Change the outfit span to be a link to stop yet another popout
		var spans = iframe.contentDocument.getElementsByTagName("span");
		var onclick = "";
		var outfitSearchStr = "desc_outfit.php?whichoutfit=";
		var outfitSearchLoc = -1;
		var endLoc = -1;
		var newLocation = "";
		for(var i = 0; i < spans.length; i ++){
			onclick = spans[i].getAttribute("onclick").toString();
			outfitSearchLoc = onclick.indexOf(outfitSearchStr);
			if( outfitSearchLoc > 0){
				endLoc = onclick.indexOf("\"", outfitSearchLoc);
				newLocation = onclick.substr(outfitSearchLoc, endLoc - outfitSearchLoc);
				spans[i].setAttribute("onclick", "window.location=\"" + newLocation + "\"");
			}
		}
		
		//attempt to resize the iframe window to fit everything...but all the other code is probably overriding this.
		//This might work, but need to have this onload do the initial grow.
		//iframe.iframeScrollableHeight=iframe.contentDocument.body.scrollHeight + 20;		
	}catch(err){
		dbgErr(err, "bitwesIframeOnLoad");
		throw(err);
	}
}

//-----------------------------------------------------------------------------
//Called by button clicks to toggle the iframe.  
//
//Put on unsafeWindow so that it could be called through the onclick attribute
//and pass in the event since I wasn't sure how to do this with the event 
//handler approach.  The event object is needed so that we can use the old way
//when a shift+click is performed.
//-----------------------------------------------------------------------------
unsafeWindow.toggleIframeAnimated=function(allIframesIndex, event){
	try{
		var iframeItem = allIframes[allIframesIndex];
		if(event.shiftKey){
			eval("unsafeWindow.descitem(" + event.currentTarget.getAttribute("itemid") + ")");
		}else{
			iframeItem.initIframe();
			if(iframeItem.isVisible()){
				iframeItem.shrink(gSettings.animationSizeChange);
			}else{
				iframeItem.grow(gSettings.animationSizeChange);
			}
		}
	}catch(err){
		dbgErr(err, "toggleIframeAnimated(" + allIframesIndex + ")");
		throw(err);
	}
}

//-----------------------------------------------------------------------------
//onclick method used by the settings button that is added to the options page
//by the run() method.
//-----------------------------------------------------------------------------
unsafeWindow.bitwesShowLKPSettings = function(){
	GM_config.open();
}

//-----------------------------------------------------------------------------
//Creates a debug div for output.  Should use the gm stuff to go to console, 
//but I did it my way before r(ing)tfm.
//-----------------------------------------------------------------------------
function createDebugDiv(){
	if(DEBUG){
		gDbgDiv = document.createElement('div');
		var _text = document.createTextNode('Debug Info')
		gDbgDiv.appendChild(_text);
		gBody.appendChild(gDbgDiv);	
		gDbgDiv.innerHTML += '<BR/>-----------------------------<BR/>';
	}
}

//-----------------------------------------------------------------------------
//Shoot text to debug div.
//-----------------------------------------------------------------------------
function dbg(txt){
	if(DEBUG){
		GM_log(txt);
		gDbgDiv.innerHTML += txt + '<BR/>';
	}
}
//-----------------------------------------------------------------------------
//convinience method for shooting out errors.
//-----------------------------------------------------------------------------
function dbgErr(err, where){
	dbg("Error (" + err.name + ") in " + where + ":  " + err.description);
}

//-----------------------------------------------------------------------------
//Called when the GM_config object saves it's settings.
//-----------------------------------------------------------------------------
settingsSaved = function(){
	gSettings = GM_config.read();
}

//-----------------------------------------------------------------------------
//Called when GM_config opens the settings iframe.
//-----------------------------------------------------------------------------
function settingsOpened(){
	gmIframe = document.getElementById("GM_config");
	if(gmIframe){
		//Do some sweet stuff here to make it look all cool and stuff.
	}
}

//-----------------------------------------------------------------------------
//shows/hides a range of iframes without animation.  This is called by the 
//Show/Hide details buttons on tables.
//-----------------------------------------------------------------------------
function toggleRangeOfIframes(startIndex, endIndex){
	try{
		var iframeItem;
		for(var i = startIndex; i <= endIndex; i ++){
			iframeItem = allIframes[i];
			iframeItem.initIframe();
			if(iframeItem.isVisible()){
				iframeItem.iframe.height = 0;
				iframeItem.hide();
			}else{
				iframeItem.iframe.height = gSettings.iframeMaxHeight;
				iframeItem.show();
			}		
		}
	}catch(err){
		dbgErr(err, "toggleRangeOfIframes " + startIndex + " to " + endIndex);
		throw(err);
	}
}

//-----------------------------------------------------------------------------
//Called indirectly by shrink member function of ItemIframeClass via setTimeout.
//Must be outside of class in order to be called by setTimeout.  Essentially
//a wrapper around the class functionality so that it can be called from 
//setTimeout.
//-----------------------------------------------------------------------------
function shrinkIframe(allIframesIndex){
	allIframes[allIframesIndex].shrink(gSettings.animationSizeChange);
}

//-----------------------------------------------------------------------------
//Called indirectly by grow member function of ItemIframeClass via setTimeout.
//Must be outside of class in order to be called by setTimeout.  Essentially
//a wrapper around the class functionality so that it can be called from 
//setTimeout.
//-----------------------------------------------------------------------------
function growIframe(allIframesIndex){
	allIframes[allIframesIndex].grow(gSettings.animationSizeChange);
}




//*****************************************************************************
//Container class for the iframe.  This class holds all the information the 
//iframe needs in order to be created at a later time.  This means that all the
//iframes don't need to be created and loaded when the page loads.
//*****************************************************************************
function ItemIframeClass(allIframesIndex){
	that = {};
	//This is the index of the iframe in the global allIframes.
	that.idx = allIframesIndex;

//public	
	that.iframe = null;
	//src that will be loaded when loadPage is called.
	that.srcToLoad = null;
	that.iframeParentNode = null;
	that.iframeDefaultWidth = "100%"
	//to be used at a later time, but it's kinda being used now.
	that.iframeScrollableHeight = gSettings.iframeMaxHeight;
//private
	that._visible=true;

	
	//-----------------------------------------------------------------------------
	//Call before showing the iframe.  This will create the iframe and put it into
	//the document.
	//-----------------------------------------------------------------------------
	that.initIframe=function(){
		if(!this.iframe){
			var parentDiv = document.createElement('div');
			this.iframe = document.createElement('iframe');
			
			this.iframe.height = 0;
			this.iframe.width = this.iframeDefaultWidth;
			//this might be good to do if i can get the iframe to resize to fit the text.
			//this looks like crap though with a scrollbar.
			//this.iframe.setAttribute("frameBorder", "0");
			//this.iframe.setAttribute("scrolling", "no");
			this.iframe.setAttribute("id", "itemIframe" + this.idx);
			this.hide();
			
			this.iframeParentNode.appendChild(parentDiv);
			parentDiv.appendChild(this.iframe);
			this.iframe.setAttribute('onload', "bitwesIframeOnLoad('"+ this.iframe.id + "')");
		}
	}
	
	//-----------------------------------------------------------------------------
	//-----------------------------------------------------------------------------
	that.isVisible=function(){
		return this._visible;
	}

	//-----------------------------------------------------------------------------
	//-----------------------------------------------------------------------------
	that.loadPage=function(){
		this.iframe.src = this.srcToLoad;
	}

	//-----------------------------------------------------------------------------
	//Only shows the iframe, does not change the size of it.
	//-----------------------------------------------------------------------------
	that.show=function(){
		this.iframe.style.display='';	
		this._visible=true;
		if(!this.iframe.src){
			this.loadPage();
		}
	}

	//-----------------------------------------------------------------------------
	//Only hides the iframe, does not change the size of it.
	//-----------------------------------------------------------------------------
	that.hide=function(){
		this.iframe.style.display='none';		
		this._visible=false;
	}
	
	//-----------------------------------------------------------------------------
	//grows the iframe to iframeScrollableHeight at a rate of the passed in
	//increment.  Used when animating the display of the iframe.  Uses setTimeout
	//and the growIframe method.
	//-----------------------------------------------------------------------------
	that.grow=function(increment){
		//used to send value through setTimeout since this.idx 
		//doesn't work for some reason.  Probably the "this"
		var whichOne = this.idx;

		this.show();
		this.iframe.height = parseInt(this.iframe.height) + parseInt(increment);

		if(this.iframe.height < this.iframeScrollableHeight){
			setTimeout(function(){growIframe(whichOne)} , gSettings.animationFrameRate)
		}
	}

	//-----------------------------------------------------------------------------
	//Used when animating the hiding of the iframe.  Uses setTimeoiut and the
	//shrinkIframe method.
	//-----------------------------------------------------------------------------
	that.shrink=function(increment){
		//used to send value through setTimeout since this.idx 
		//doesn't work for some reason.  Probably the "this"
		var whichOne = this.idx;
		
		this.iframe.height = parseInt(this.iframe.height) - parseInt(increment);
		if(this.iframe.height > 0){
			setTimeout(function(){shrinkIframe(whichOne)} , gSettings.animationFrameRate)
		}else{
			this.hide();
		}
	}

	return that;
}


//*****************************************************************************
//Class to manage creating ItemIframeClass for a all item image tags under
//the passed in nodeToProcess.
//
//Keeps track of all the iframes it creates by using the iframeStartIndex and
//iframeEndIdex.  This allows all the iframes to remain in the allIframes 
//global and easier to access, but for each one of these classes to
//keep track of the ones it owns.  These indexes are mostly (if not totally)
//used for the show/hide buttons.
//*****************************************************************************
function PutIframeOnItems(nodeToProcess){
	that = {};
	that.iframeStartIndex = -1;
	that.iframeEndIndex = -1;
	that.cls = 'PutIframeOnItems';
	that._nodeToProcess = nodeToProcess;

	//-----------------------------------------------------------------------------
	//Rips the item ID from an item's image node.
	//-----------------------------------------------------------------------------
	that.getItemId=function(imgNode){
		try{
			var itemID = imgNode.getAttribute("itemid");
			if(!itemID){
				var onclick = imgNode.getAttribute("onclick");
				var commaLoc = onclick.indexOf(",");
				var openParenLoc = onclick.indexOf("(");
				var closeParenLoc = onclick.indexOf(")");		
				var endLoc;
		
				if(commaLoc > 0 && commaLoc < closeParenLoc){
					endLoc = commaLoc;
				}else{
					endLoc = closeParenLoc;
				}
		
				itemID = onclick.substring(openParenLoc + 1, endLoc);	
			}
			return itemID;
		}catch(err){
			dbgErr(err, this.cls + ".getItemId");
			throw(err);
		}
	}

	//-----------------------------------------------------------------------------
	//Creates a new iframe and adds it to the allIframes array and sets the index
	//of the iframe to match it's place in the array.  Also sets the start and 
	//end indexes for this class.
	//-----------------------------------------------------------------------------
	that.getNewIframeItem=function(){
		try{
			if(this.iframeStartIndex == -1){
				this.iframeStartIndex = allIframes.length;
				this.iframeEndIndex = this.iframeStartIndex;
			}else{
				this.iframeEndIndex ++;
			}
			var itemIframe = new ItemIframeClass(this.iframeEndIndex);
			allIframes.push(itemIframe);

			return itemIframe;			
		}catch(err){
			dbgErr(err, this.cls + ".getNewIframeItem");
			throw(err);
		}
	}

	//-----------------------------------------------------------------------------
	//Takes in the item name (innerHTML of a description cell) and strips out
	//any html and returns a link to the description of the item in the kol wiki
	//-----------------------------------------------------------------------------
	that.getWikiLinkForName=function(itemName){
		var strippedItemName = itemName.replace(/<\/?[a-z][a-z0-9]*[^<>]*>/ig, "");
		var link = "<a href=\"http://kol.coldfront.net/thekolwiki/index.php/" + itemName.replace(/ /gi, "_") + 
					 "\" target=\"_blank\">" + strippedItemName + "</a>";
		return link;
	}
		
	//-----------------------------------------------------------------------------
	//Returns the URL for the description of an item.
	//-----------------------------------------------------------------------------
	that.getItemURL=function(imgNode){
		var ret = "http://" + window.location.host.toString() + "/desc_item.php?whichitem=" + this.getItemId(imgNode);
		return  ret;
	}

	//-----------------------------------------------------------------------------
	//Hijacks the onclick event for an item.  adds the itemid attribute to the tag
	//and sets the oldclick event.
	//-----------------------------------------------------------------------------
	that.setItemImgOnclick=function(imgNode, index){
		try{
			var itemId = this.getItemId(imgNode);
						
			imgNode.setAttribute("oldclick", imgNode.getAttribute("onclick"));
			imgNode.setAttribute("onclick", "toggleIframeAnimated(" + index + ", event)");
			imgNode.setAttribute('itemid', itemId);			
		}catch(err){
			dbgErr(err, this.cls + ".setItemImgOnclick");
			throw(err);
		}
	}

	//-----------------------------------------------------------------------------
	//Returns a button that will show/hide all the iframes this class owns.  This
	//should be called after all the iframes for this class have been created since
	//the values for the start and end that are set for the click event are 
	//"hard coded".
	//-----------------------------------------------------------------------------
	that.getShowHideButton=function(){
		try{
			var btn = document.createElement('input');
			var start = this.iframeStartIndex;
			var end = this.iframeEndIndex;

			btn.setAttribute('type', 'button');
			btn.setAttribute('value', 'Show/Hide Details');
			btn.addEventListener("click", function(){toggleRangeOfIframes(start, end)}, false); 
			return btn;
		}catch(err){
			dbgErr(err, this.cls + ".getShowHideButton");
			throw(err);
		}
	}
	
	//-----------------------------------------------------------------------------
	//Creates a new iframe and puts it on the desc cell.
	//-----------------------------------------------------------------------------
	that.putIframeOnCell=function(imgNode, descCell){
		try{
			var itemIframe = this.getNewIframeItem();
			itemIframe.iframeParentNode = descCell;
			itemIframe.srcToLoad = this.getItemURL(imgNode);
		}catch(err){
			dbgErr(err, this.cls + ".putIframeOnCell");
			throw(err);
		}
	}

	//-----------------------------------------------------------------------------
	//Takes in an image, determines if it's an item image and creates the iframe
	//class.
	//-----------------------------------------------------------------------------
	that.processImg=function(imgNode){
		try{
			var node;
			var imgCellIndex;
			var node;
			var descCell;

			if(imgNode.parentNode.innerHTML.indexOf("descitem") > 0){
				node = imgNode.parentNode;
				imgCellIndex = node.cellIndex;
				descCell = node.parentNode.cells[imgCellIndex + 1];		
				
				//make all cells in the row top aligned so they don't move
				//around when the iframe opens and closes.
				var row = node.parentNode;
				for(var i = 0; i < row.cells.length; i ++){
					row.cells[i].setAttribute("valign", "top");
				}
				
				this.putIframeOnCell(imgNode, descCell);
				this.setItemImgOnclick(imgNode, this.iframeEndIndex);	
			}
		}catch(err){
			dbgErr(err, this.cls + ".processImg");
			throw(err);
		}		
	}

	//-----------------------------------------------------------------------------
	//Processes all the img tags under _nodeToProcess.
	//-----------------------------------------------------------------------------
	that.processNode=function(){
		try{
			allImages = this._nodeToProcess.getElementsByTagName('img');
			
			for(var i = 0; i < allImages.length; i ++){
				this.processImg(allImages[i]);
			}
		}catch(err){
			dbgErr(err, this.cls + ".processNode");
			throw(err);
		}
	}
	
	return that;
}


//*****************************************************************************
//No difference other than it puts the wiki link on the description cell.
//*****************************************************************************
function PutIframeOnInventoryItems(nodeToProcess){
	var that = new PutIframeOnItems(nodeToProcess);
	//-----------------------------------------------------------------------------
	//
	//-----------------------------------------------------------------------------
	that.processImg=function(imgNode){
		try{
			var node;
			var imgCellIndex;
			var node;
			var descCell;

			if(imgNode.parentNode.innerHTML.indexOf("descitem") > 0){
				imgCell = imgNode.parentNode;
				imgCellIndex = imgCell.cellIndex;
				descCell = imgCell.parentNode.cells[imgCellIndex + 1];		
				
				imgCell.setAttribute("valign", "top");
				descCell.setAttribute("valign", "top");
				this.putIframeOnCell(imgNode, descCell);

				this.setItemImgOnclick(imgNode, this.iframeEndIndex);	
				descCell.childNodes[0].innerHTML = this.getWikiLinkForName(descCell.childNodes[0].innerHTML);
			}
		}catch(err){
			dbgErr(err, "PutIframeOnFightItems.processImg");
			throw(err);
		}		
	}
	return that;
}

//*****************************************************************************
//No difference other than it puts the wiki link on the description cell.
//*****************************************************************************
function PutIframeOnDiscoveryItems(nodeToProcess){
	var that = new PutIframeOnItems(nodeToProcess);

	//-----------------------------------------------------------------------------
	//
	//-----------------------------------------------------------------------------
	that.processImg=function(imgNode){
		try{
			var node;
			var imgCellIndex;
			var node;
			var descCell;

			if(imgNode.parentNode.innerHTML.indexOf("descitem") > 0){
				imgCell = imgNode.parentNode;
				imgCellIndex = imgCell.cellIndex;
				descCell = imgCell.parentNode.cells[imgCellIndex + 1];		
				
				imgCell.setAttribute("valign", "top");
				descCell.setAttribute("valign", "top");
				this.putIframeOnCell(imgNode, descCell);

				this.setItemImgOnclick(imgNode, this.iframeEndIndex);	
				descCell.childNodes[0].innerHTML = this.getWikiLinkForName(descCell.childNodes[0].innerHTML);
			}
		}catch(err){
			dbgErr(err, "PutIframeOnDiscoveryItems.processImg");
			throw(err);
		}		
	}
	return that;
}


//*****************************************************************************
//All the changes to PutIframeOnItem to make it work for effect descriptions.
//*****************************************************************************
function PutIframeOnEffects(nodeToProcess){
	var that = new PutIframeOnItems(gBody);	
	that.cls = "PutIframeOnEffects";
	//Used to put the button on the table
	that.effectsTable = null;
	
	//-----------------------------------------------------------------------------
	//-----------------------------------------------------------------------------
	that.processImg=function(imgNode){
		var node;
		var imgCellIndex;
		var node;
		var descCell;

		if(imgNode.parentNode.innerHTML.indexOf("eff(") > 0){
			if(!this.effectsTable){
				//                         | cell     |   row    |  tbody   |   table  |  center  |
				this.effectsTable = imgNode.parentNode.parentNode.parentNode.parentNode.parentNode;
			}
			node = imgNode.parentNode;
			imgCellIndex = node.cellIndex;
			descCell = node.parentNode.cells[imgCellIndex + 1];		
			
			node.setAttribute("valign", "top");
			descCell.setAttribute("valign", "top");
			this.putIframeOnCell(imgNode, descCell);
			this.setItemImgOnclick(imgNode, this.iframeEndIndex);	
		}
	}
	
	//-----------------------------------------------------------------------------
	//-----------------------------------------------------------------------------
	that.getItemId=function(imgNode){
		try{
			var itemID;
			var onclick = imgNode.getAttribute("onclick");
			var openParenLoc = onclick.indexOf("(");
			var closeParenLoc = onclick.indexOf(")");		
			
			itemID = onclick.substring(openParenLoc + 2, closeParenLoc -1);	
			return itemID;
		}catch(err){
			dbgErr(err, this.cls + ".getItemId");
			throw(err);
		}
	}
	
	//-----------------------------------------------------------------------------
	//-----------------------------------------------------------------------------
	that.getItemURL=function(imgNode){
		var ret = "http://" + window.location.host.toString() + "/desc_effect.php?whicheffect=" + this.getItemId(imgNode);
		return ret;
	}
	return that;	
}

//*****************************************************************************
//*****************************************************************************
function PutIframeOnFamiliars(nodeToProcess){
	var that = new PutIframeOnItems(nodeToProcess);	
	that.cls = "PutIframeOnFamiliars";

	//-----------------------------------------------------------------------------
	//-----------------------------------------------------------------------------
	that.processImg=function(imgNode){
		var node;
		var imgCellIndex;
		var node;
		var descCell;

		if(imgNode.parentNode.innerHTML.indexOf("fam(") > 0){
			node = imgNode.parentNode;
			imgCellIndex = node.cellIndex;
			descCell = node.parentNode.cells[imgCellIndex + 1];		
			
			node.setAttribute("valign", "top");
			descCell.setAttribute("valign", "top");
			this.putIframeOnCell(imgNode, descCell);
			this.setItemImgOnclick(imgNode, this.iframeEndIndex);	
		}
	}
	
	//-----------------------------------------------------------------------------
	//-----------------------------------------------------------------------------
	that.getItemId=function(imgNode){
		try{
			var itemID;
			var onclick = imgNode.getAttribute("onclick");
			var openParenLoc = onclick.indexOf("(");
			var closeParenLoc = onclick.indexOf(")");		
			
			itemID = onclick.substring(openParenLoc + 1, closeParenLoc);	
			return itemID;
		}catch(err){
			dbgErr(err, this.cls + ".getItemId");
			throw(err);
		}
	}
	
	//-----------------------------------------------------------------------------
	//-----------------------------------------------------------------------------
	that.getItemURL=function(imgNode){
		var ret = "http://" + window.location.host.toString() + "/desc_familiar.php?which=" + this.getItemId(imgNode);
		return ret;
	}

	return that;	
}

//-----------------------------------------------------------------------------
//Utility to check if a url has a string in it.
//-----------------------------------------------------------------------------
function isInUrl(searchFor){
	return parseInt(window.location.toString().indexOf(searchFor)) > 0;
}

//-----------------------------------------------------------------------------
//Processes inventory pages by the inventory tables.  Works for closet,
//inventory, and hangk's
//-----------------------------------------------------------------------------
function doInventoryPage(){
	var allIframeSections = [];
	var temp;
	var tbl;
	var allTables=['food','booze', 'call', 
				   'hats', 'weapons', 'rangedweapons', 'offhands', 'pants', 'accs', 'famequips', 'curequip', 
				   'all', 'potions', 'combat', 'quest', 'animalbones',
				   'faves'];						

	for(var i = 0; i < allTables.length; i ++){
		tbl = document.getElementById(allTables[i]);
		if(tbl){
			temp = new PutIframeOnInventoryItems(tbl);
			temp.processNode();
			tbl.insertBefore(temp.getShowHideButton(), tbl.childNodes[0]);
			allIframeSections.push(tbl);
		}
	}
	
	//This is supposed to get the stuff that you get when you use
	//something, but it doesn't work since the results are "loaded"
	var bq = document.getElementsByTagName("blockquote")[0];
	if(bq){
		dbg("found a blockquote");
		temp = new PutIframeOnInventoryItems(bq);
		temp.processNode();
		allIframeSections.push(tbl);		
	}
}

//-----------------------------------------------------------------------------
//Process items recieved on a fight results page.
//-----------------------------------------------------------------------------
function doFightPage(){
	//There might be more than one item table, though it seems doubtful
	var allItemTables = document.getElementsByClassName("item");
	var temp;
	var allIframeSections = [];
	
	for(var i = 0; i < allItemTables.length; i ++){
		temp = new PutIframeOnItems(allItemTables[i]);
		temp.processNode();
		allIframeSections.push(temp);
	}
}

//-----------------------------------------------------------------------------
//public void main...essentially.
//-----------------------------------------------------------------------------
function run(){
	try{
		var locStr = window.location.toString();

		if(isInUrl("discoveries") || isInUrl("craft")){
			dbg("Found Discoveries or Craft Page");
			
			var doIt = new PutIframeOnDiscoveryItems(gBody);
			doIt.processNode();
		}else if(isInUrl("charpane")){
			dbg("Charpane Class");
			
			effectIframer = new PutIframeOnEffects(gBody);
			effectIframer.processNode();
			effectIframer.effectsTable.insertBefore(effectIframer.getShowHideButton(), effectIframer.effectsTable.childNodes[0])
		}else if(isInUrl("inventory") || isInUrl("closet")){
			dbg("Treating as Inventory page");
			
			doInventoryPage();
		}else if(isInUrl("fight")){
			dbg("Treating as a fight page");
			
			doFightPage();
		}else if(isInUrl("account.php")){
			dbg("Treating as account page");
			var ahref = document.createElement("a");
			var tabDiv = document.getElementById('tabs');

			ahref.setAttribute("onclick", "bitwesShowLKPSettings();");
			ahref.innerHTML = "<u>LessKolPopouts Settings</u>";
			tabDiv.appendChild(ahref);	
		}else if(isInUrl("desc_item")){
			dbg("Treating as Item Description")
			//Scroll some arbitrarily large number down
			if(gSettings.scrollItemDescToBottom){
				window.scrollBy(0, 50000)
			}
		}else if(window.location.pathname.toString() == "/familiar.php"){
			dbg("Treating as Familiar Page");
			var tbl = gBody.getElementsByClassName("famlist")[0];
			if(tbl){
				var doIt = new PutIframeOnFamiliars(tbl);
				doIt.processNode();
				
				//These shouldn't be 100% width, they should be less.
				for(var i = doIt.iframeStartIndex; i <= doIt.iframeEndIndex; i ++){
					allIframes[i].iframeDefaultWidth = "250px";
				}
			}
		}else{
			dbg("Treating as any other page.");
			var doIt = new PutIframeOnItems(gBody);
			doIt.processNode();
		}
	}catch(err){
		dbgErr(err, 'run');
		throw(err);
	}
}

//-----------------------------------------------------------------------------
//Initialize it.
//-----------------------------------------------------------------------------
function init(){
	gBody = document.getElementsByTagName('body') [0];
	createDebugDiv();
	dbg(window.location);
	dbg(window.location.pathname);

	GM_config.init('Less KoL Poputs Settings',{
		animationFrameRate:{
			label: 'Animation Frame Rate (miliseconds)',
			type: 'int',
			cols:100,
			default: 20
		},
		animationSizeChange:{
			label: 'Animation Size Change Per Frame',
			type: 'int',
			cols: 3,
			default: 20
		},
		iframeMaxHeight:{
			label: 'iFrame Height',
			type: 'int',
			default: 250
		},
		scrollItemDescToBottom:{
			label: 'Scroll iFrame to bottom',
			type: 'checkbox',
			default: false
		}
	},
	{
		open:  settingsOpened,
		save:  settingsSaved
	});
	
	gSettings = GM_config.read();
}

//Make the magic happen.
init()
run();