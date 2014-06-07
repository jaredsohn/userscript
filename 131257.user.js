// ==UserScript==
// @name         Fallen London - Calculate Net Worth
// @namespace    http://thedave/fallen.london.networth
// @description  Modifies the Fallen London UI to have a number of features that I personally want.
// @include      http://*.fallenlondon.com/Gap/Load*
// @include      http://fallenlondon.com/Gap/Load*
// @include	 http://fallenlondon.storynexus.com*
// @version      1.1.2
// ==/UserScript==

/*
Author: The Dave
Contributers:
Vyrlokar - CSV data improvements, fixing double-counting mantelpiece item
*/


var Options = {
	displayStatsOnWardrobe:false
}
	
/*
 * Handles cross-browser support issues (what is this, 1994? Why is this still an issue?)
 */
var CrossBrowserSupport = {
	/*
	 * Greasemonkey save functions have been replaced with HTML5 local storage.
	 * This removes compatability for firefox versions that support greasemonkey but not HTML5;
	 * I think that's a minority of users.
	 */
	supportGM:function(){
		keyPrefix = 'FL_Dave_';
		LS_deleteValue = function(name) {
		    localStorage.removeItem(keyPrefix+name);
		}
		LS_getValue = function(name, defaultValue) {
		    var value = localStorage[keyPrefix+name];
		    return (value == null) ? defaultValue : JSON.parse(value);
		}
		LS_setValue = function(name, value) {
		    localStorage[keyPrefix+name] = JSON.stringify(value);
		}
		LS_listValues = function(){
		    var list = [];
		    for(var key in localStorage){
		    	var re = new RegExp('^' + keyPrefix);
		    	if(key.match(re)){
		    		list.push(key.replace(keyPrefix,''));
		    	}
		    }
		    return list;
		}
	},
	/*
	* Supports trimming white space even if our particular javascript implimentation is missing it
	*/
	supportTrim:function(){
		if(typeof String.prototype.trim == "undefined"){
			String.prototype.trim = function(){
				return String(this).replace(/^\s+|\s+$/g, '');
			}
		}
	}
};

/*
 * Handles injecting code onto the page to get around sandbox restrictions
 */
var Inject = {
    /*
     * Injects text as a javascript function into the web page's scope.
     * Accepts either text or a function as a parameter.
     */
	aFunction:function(f){
    	this.injectThis(f, false);
    },
    /*
     * Injects text as a javascript function into the web page's scope and runs it immediately
     */
    andRun:function(f){
    	this.injectThis(f, true)
    },
	injectThis:function(text, andRun){
    	 if(this.isFunction(text)){
    		 text = text.toString();
    	 }
    	 if(andRun){
    		 text = "(" + text + ")()";
    	 }
    	 var scriptNode = document.createElement("script");
    	 scriptNode.type = "text/javascript";
    	 scriptNode.textContent = text;
    	 var target = document.getElementsByTagName("head")[0] || document.body || document.documentElement;
    	 target.appendChild(scriptNode);
	},
	/*
	 * Tests if an object is a function 
	 */
    isFunction:function(x) {
		return Object.prototype.toString.call(x) == '[object Function]';
	}
};

/*
 * Handles intercepting Ajax events from the main window and providing callback hooks back to user script land
 */	
var AjaxInterceptor = {
    callbackString : 'DavesAjaxEvents = {',
    callbackEmpty : true,
    /*
     * Sets up Ajax callbacks.
     * 
     * Depends on the "callback" function being injected into the page before any ajax is called.
     */	
    interceptAjax : function(){
    	$('body').ajaxSuccess(
    		function(event, requestData, options){
    			var match = false;
    			for(var key in DavesAjaxEvents) {
    				if(key == options.url){
    					var datDest = getCallbackDataDiv();
    					datDest.innerHTML = options.data;
    					callback(DavesAjaxEvents[key]);
    					match = true;
    					break;
    				}
    			}
    			if(!match){
    				callback('UnknownAjax')
    				//console.log(options.url, options)
    			}
    		}
    	);
    },
    /*
     * Adds an ajax callback.
     * func is called if an ajax callback matching url is called.
     */
    addCallback:function(url, func, propogate){
    	var callbackname = 'Ajax' + url;
    	this.callbackString += this.callbackEmpty?'':', ';
    	this.callbackEmpty = false;
    	this.callbackString += '"' + url + '":"' + callbackname + '"';
    	document.addEventListener(callbackname, func, propogate);
    },
    /*
     * Called to begin listening for ajax events.  No more callbacks can be added after this point. 
     */
    finalizeIntercepts:function(){
    	this.callbackString += '};';
    	Inject.aFunction(this.callbackString);
    	Inject.andRun(this.interceptAjax);
    }
};

function getCallbackDataDiv(){
	var cbDiv = document.getElementById("callback_data_div");
	if(!cbDiv){
		cbDiv = document.createElement('div');
		cbDiv.setAttribute('style','display:none;');
		cbDiv.setAttribute('id', 'callback_data_div');
		document.body.appendChild(cbDiv);
	}
	return cbDiv;
}

/*
 * Generic callback function to raise an event from the page scope
 * Must be injected to run.
 */	
function callback(eventName){
	var customEvent = document.createEvent('Event');
	customEvent.initEvent(eventName, false, true);
	document.dispatchEvent(customEvent);
}

/*
 * Handles toggleable elements on our page for us
 */
function handleToggles()
{   $(document).ready(function(){
        $('.toggler').live('click',function(){
            $(this).parent().children().toggle();  //swaps the display:none between the two spans
            $(this).parent().parent().find('.toggled_content').slideToggle();  //swap the display of the main content with slide action
        });
    });
}

/*
 * Uses the same general purpose modal dialog that FB has already included for whatever content we want.  Handy!
 */
function customModal(myHTML){
	$('#general-dialog').html(myHTML); //General Dialog, Sir!
	$('#general-dialog').dialog('open');
}

	/*
This function is injected into the page to handle equipping an entire set of items more quickly than the
default interface allows.  Watch out, if the equip method changes on the back end this will no longer work!

Takes as input a ; seperated list of integers, where each integer is the identifier of the equipment item to
be equipped.
*/
function handleEquipSet(setinfo)
{   closeGeneralDialog();
    var items = setinfo.split(';');
    monitorEquips(items.length); //Tell the monitor function how many equip callbacks to expect
    //We need to tell jquery where to dump the info from the "adopt" command - if we are on the "me"
    //tab this should be the usual place, but otherwise dump it to a hidden div.
    var id1 = document.getElementById('meTab');
    var selectd = id1.getAttribute('class');
    if (id1 && selectd && selectd.trim().toLowerCase() == 'selected')
    {   var loc = '#inventory';
    }
    else //If we aren't on the 'myself' tab, we'll need somewhere else to put our callback data (like a trashcan)
    {   var tempdiv = document.getElementById('devnull'); //See if we already have a trashcan
        if(!tempdiv) //if not, create one.
        {   tempdiv = document.createElement('div');
            tempdiv.setAttribute('id','devnull');
            tempdiv.setAttribute('style','display:none');
            document.body.appendChild(tempdiv);
        }
        var loc = '#devnull';
    }
    //Set up our loading dialog
    customModal(getLoadingHTML());
    //Have the server update, and use our monitoring method as the callback
    for ( var i = 0; i < items.length; i++)
    {   var myid = items[i].trim();
        $(loc).load('/Me/AdoptThing', {id:myid, showExpanded:false}, function(){monitorEquips(0)});
    }
}

/*
This function counts the callbacks from adopting multiple items, and when they have all been processed
updates the display to show the new values.  It must be injected into the page to function.
*/
function monitorEquips(total)
{   if(total)
    {   this.waitfor = total;
        this.sofar = 0;
    }
    else
    {   this.sofar += 1;
        var bar = document.getElementById('outfit_progress');
        if(bar){
        	bar.setAttribute('width', Math.floor((this.sofar * 100)/this.waitfor) + '%');
        }
        if (this.sofar >= this.waitfor)
        {   $("#lhs_col").load('/User/InfoSummary', { cb : 1});
            closeGeneralDialog();
        }
    }
}

/*
 * A class for handling output formats (number conversion, formatted elements, etc.)
 */
var EB = {
	formatCost:function(cost, size){
	 	if(isNaN(cost)){
	 		//cost = 0;
	 		return '';
	 	}
	 	var currencySymbol = size?'<img height="' + size + '" width="' + size +'" style="position: relative; top: 1px;" src="http://images.echobazaar.failbettergames.com/echoblack.png">':'\u20AC';
	 	var echos = Math.floor(cost/100).toString();
	 	var pence = cost % 100;
	 	pence = (10 > pence)?'0'+ pence.toString():pence.toString();
	 	var split = /(\d+)(\d{3})/;
	 	while(split.test(echos)){
	 		echos = echos.replace(split, '$1' + ',' + '$2');
	 	}
	 	return currencySymbol + echos + '.' + pence;		
 	},
 	bazaarTotalValueSpan:function(){
 		var span = document.createElement('span');
 		span.setAttribute('style','font-weight:normal');
 		span.setAttribute('class','total_value_span');
 		return span;
 	},
 	bazaarGrandTotalSpan:function(){
 		var span = document.createElement('span');
 		span.setAttribute('class','grand_total_span');
 		return span;
 	},
 	bazaarHiddenDiv:function(){
 		var div = document.createElement('div');
 		div.setAttribute('style', 'display:none')
 		return div;
 	},
 	myselfTotalValueSpan:function(){
 		var span = document.getElementById('myself_total_value_span');
 		if(span){
 			return span;
 		}
 		else {
 			span = document.createElement('span');
 			span.setAttribute('style', 'float:right; margin:0px 15px 0px 0px; font-weight:normal');
 			span.setAttribute('id', 'myself_total_value_span');
 			return span;
 		}
 	},
 	inventoryTotalSpan:function(hh){
 		name = InterfaceMyself.getCategoryText(hh);
 		name = name + '_total_id';
 		var span = document.getElementById(name);
 		if(span) {
 			return span;
 		}
 		else {
 			span = document.createElement('span');
 			span.setAttribute('style', 'float:right; margin:5px 35px 0px 0px');
 			span.setAttribute('id',name);
 			hh.parentNode.insertBefore(span, hh.nextSibling)
 			return span;
 		}
 	},
 	inventoryGrandTotalSpan:function(){
 		var span = document.getElementById('myself_inventory_total');
 		if(span){
 			return span;
 		}
 		else {
 			var target = document.getElementsByClassName('you_bottom_rhs');
 			target = target?target[0]:null;
 			target = target?target.firstChild:null;
 			while(target && target.tagName != 'H2'){
 				target = target.nextSibling;
 			}
 			span = document.createElement('span');
 			span.setAttribute('style', 'float:right; margin:0px 25px 5px 0px; font-weight:bold');
 			span.setAttribute('id', 'myself_inventory_total')
 			target.parentNode.insertBefore(span, target);
 			return span;
 		}
 	},
 	inventoryCSVDiv:function(){
 		var csv = document.getElementById('inventory_csv_div');
 		if(csv){
 			return csv;
 		}
 		else {
 			var parnt = document.getElementsByClassName('you_bottom_lhs')[0];
 		    var toggleparent = document.createElement('div');
 		    toggleparent.setAttribute('class','toggel_parent');
 		    var toggleholder = document.createElement('h3');
 		    toggleholder.setAttribute('style','cursor: pointer;');
 		    toggleholder.setAttribute('class','toggleHolder');
 		    var span1 = document.createElement('a');
 		    span1.setAttribute('class','toggler');
 		    span1.setAttribute('style','display: block; color:black');
 		    span1.innerHTML = '+&nbsp;&nbsp;&nbsp;CSV';
 		    toggleholder.appendChild(span1);
 		    var span2 = document.createElement('a');
 		    span2.setAttribute('class','toggler');
 		    span2.setAttribute('style','display: none; color:black');
 		    span2.innerHTML = '-&nbsp;&nbsp;&nbsp;CSV';
 		    toggleholder.appendChild(span2);
 		    toggleparent.appendChild(toggleholder);
 		    csv = document.createElement('div');
 		    csv.setAttribute('class','toggled_content');
 		    csv.setAttribute('id', 'inventory_csv_div');
 		    csv.setAttribute('style','display: none; font-size: 0.7em');
 		    toggleparent.appendChild(csv);
 		    parnt.appendChild(toggleparent);
 		    return csv;
 		}
 	},
 	getName:function(){
 		if(this.name){
 			return this.name;
 		}
 		var div = document.getElementsByClassName("welcome");
 		div = div?div[0]:null;
 		this.name = /It's ([^!]+)/.exec(div.innerHTML); //Get our name
 		this.name = this.name?this.name[1]:null;
 		return this.name;
 	},
 	isTabMyself:function(){
 		var el = document.getElementById('meTab');
 		if (el){
 			var selected = el.getAttribute('class');
 			if('selected' == selected){
 				return true;
 			}
 		}
 		return false;
 	},
 	/*
 	 * Creates a small icon panel we can use for our own settings and outfits, etc.
 	 */
 	youPanel:function(){
 		var ul = document.getElementById('dave_you_panel');
 		if(!ul){ //If it already exists, just return what we have.  Otherwise, build it.
 			var base = document.getElementsByClassName('you_lhs');
 			base = base?base[0]:null;
 			var div = base.firstChild;
 			var founddiv = null;
 			while(div){ //Get the current last divider; it's our anchor point.
 				if('undefined' != typeof div.getAttribute && div.getAttribute('class') == 'you_divider'){
 					founddiv = div;
 				}
 				div = div.nextSibling;
 			}
 			var target = founddiv.nextSibling;
 			ul = document.createElement('ul');
 			ul.setAttribute('class', 'you_icon');
 			ul.setAttribute('id', 'dave_you_panel')
 			ul.setAttribute('style','float:none')
 			div = document.createElement('div');
 			div.setAttribute('class','you_divider');
 			target.parentNode.insertBefore(ul, target);
 			target.parentNode.insertBefore(div, target);
 		}
 		return ul; 		
 	},
 	/*
 	 * Mangles our html so that it can be passed safely as a javascript parameter.
 	 */
 	makePassableHTML:function(html){
 		html = html.replace(/\\/g, '\\\\')
 		html = html.replace(/'/g, "\\'"); //"
 		return "'" + html + "'"
 	},
 	/*
 	 * Creates a div on the "myself" page for outfit management.
 	 */
 	getOutfitDiv:function(){
 		var outfitDiv = document.getElementById('outfit_button_div');
 		if('undefined' == typeof outfitDiv || null == outfitDiv){
 			//First we must put the portrait/lodgings div into a parent div we can use
 			var target = document.getElementsByClassName('you_mid_lhs');
 			target = target?target[0]:null;
 			var parent = document.createElement('div');
 			parent.setAttribute('style','float:left');
 			target.parentNode.insertBefore(parent, target);
 			parent.appendChild(target); //This should move (not duplicate!) the original node.
 			outfitDiv = document.createElement('div');
 			outfitDiv.setAttribute('style','clear:left;float:left; width:235px;')//'clear:both;float:left')
 			outfitDiv.setAttribute('id', 'outfit_button_div');
 			parent.appendChild(outfitDiv);
 		}
 		return outfitDiv;
 	},
 	whereAmI:function(){
 		var div = document.getElementById("area_hdr_name");
 		return div?div.innerText:null;
 	},
 	amIFreeToMove:function(){
 		var where = EB.whereAmI();
 		for(var loc in EB.FallenLondonFree){
 			if(where == loc){
 				return true;
 			}
 		}
 		return false;
 	},
 	getImportantStats:function(){
 		var iStats = {};
 		var retStats = [];
 		for(var stat in EB.Stats){
 			iStats[EB.Stats[stat]] = true;
 		}
 		for(stat in EB.IgnoreStats){
 			delete iStats[EB.IgnoreStats[stat]];
 		}
 		for(stat in iStats){
 			retStats[retStats.length] = stat;
 		}
 		return retStats;
 	},
 	Stats:['Dangerous', 'Watchful', 'Persuasive', 'Shadowy', 'Respectable', 'Dreaded', 'Bizarre', 'Nightmares', 'Suspicion', 'Scandal', 'Wounds'],
 	IgnoreStats:['Nightmares', 'Suspicion', 'Scandal', 'Wounds'],
 	FallenLondonFree:['The Shuttered Palace','The Labyrinth of Tigers', 'Ladybones Road','The Forgotten Quarter','The University',"Wilmot's End",'Bazaar Side-streets','Veilgarden','The House of Chimes','The Flit','Spite','Wolfstack Docks','Mahogany Hall',"Watchmaker's Hill","Mrs Plenty's Carnival",'your Lodgings']
}

/*
 * Stores and manages our inventory
 */
var Inventory = {
	items:{},
	categories:{},
	customWardrobes:['Dangerous','Watchful','Persuasive','Shadowy','Respectable','Dreaded','Bizarre', 'total'],
	/*
	 * Marks every item for a mark-and-sweep cleanup
	 */
	mark:function(){
		for(var thing in this.items){
			thing.mark = true;
		}
	},
	 /*
	  * Sweeps up any item that is still marked
	  */
	sweep:function(){
		for(var thing in this.items){
			if(thing.mark){
				delete thing;
			}
		}
	},
	/*
	 * Gets total value of all items in the inventory
	 */
	totalValue:function(){
		 var total = 0;
		 for(var item in this.items){
			 var c = this.items[item].cost;
			 var a = this.items[item].count
			 if(c && a){
				 total += c * a;
			 }
		 }
		 return total;
	 },
	 /*
	  * Saves all values to the local storage to be used on later loads of the page
	  */
	storeAllValues:function(){
		  for(var item in this.items){
			  var name = item + '_cost';
			  var cost = this.items[item].cost;
			  if(name && typeof cost != 'undefined' && cost != null){
				  LS_setValue(name, cost)
			  }
		  }
	},
	/*
	 * Loads missing values from stored database
	 */
	loadMissingValues:function(){
		for(var item in this.items){
			if(!this.items[item].cost){
				var cost = LS_getValue(item + '_cost');
				if(cost){
					this.items[item].cost = cost;
				}
			}
		}
	},
	/*
	 * Updates an item with any new information we have while preserving older information that we haven't.
	 */
	mergeItem:function(name, keyValues){
		for(var key in keyValues) {
			if(!this.items[name]){ //Create the element if we don't already have it
				this.items[name] = {};
			}
			this.items[name][key] = keyValues[key];
		}
		//Check to see if we need to updated our categories / subcategories list
		var cat = keyValues['category'];
	 	if(cat){
	 		var subcat = keyValues['subcat'];
	 		if(subcat){
	 			if(this.categories[cat]){ //If we have a category list arleadd
	 				this.categories[cat][subcat] =true;
	 			}
	 			else { //Otherwise add it to it.
	 				this.categories[cat] = {subcat:true};
	 			}
	 		}
	 		else{
	 			this.categories[cat] = false;
	 		}//End If Subcat
		}//End if cat
	},
	/*
	 * Gets the total value of a single category of items
	 */
	getCategoryTotal:function(category){
		var total = 0;
		for(var key in this.items){
			var item = this.items[key];
			if (item.category == category && item.count && item.cost){
				total += item.cost * item.count;
			}
		}
		return total;
	},
	/*
	 * Returns a list of all categories
	 */
	getCategories:function(){
		 var cats = [];
		 for(var cat in this.categories){
			 cats[cats.length] = cat;
		 }
		 return cats;
	 },
	 /*
	  * Returns a list of sub-categories for a given category
	  */
	getSubCategories:function(cat){
		var sc = [];
		var subcats = this.categories[cat];
		if(subcats){
			for(var subcat in subcats){
				sc[sc.length] = subcat;
			}
		}
		return sc;
	},
	/*
	 * Returns all items in a category (optionally restricting them to a subcategory
	 */
	getItemsByCategory:function(cat, subcat){
		var itemlist = {};
		for(var i in this.items){ //Three important cases
			var ourcat = this.items[i].category;
			if(subcat && (cat == ourcat)){ //Case 1: categories match and we need to check subcategory
				if(this.items[i].subcat == subcat){
					itemlist[i] = this.items[i];
				} //Else do not add
			}
			else if(cat == ourcat){//Case 2: categories match, but we have no subcategory
				itemlist[i] = this.items[i]
			}
			//Case 3:: Cat doesn't match; do nothing.
		}
		return itemlist;
	},
	getAlwaysEquipped:function(){
		var things = {};
		var list = Inventory.getItemsByCategory('POSI Equipment', 4);
		for(var i in list){
			things[i] = list[i];
		}
		list = Inventory.getItemsByCategory('POSI Equipment', 5);
		for(i in list){
			things[i] = list[i];
		}
		list = Inventory.getItemsByCategory('POSI Equipment', 6);
		for(i in list){
			things[i] = list[i];
		}
		return things;
	},
	/*
	 * Gets a list of items that maximize the given stat
	 */
	getBestOutfitForStat:function(stat, category){
		 var outfit = {};
		 for(var i in Inventory.items){
			 var item = Inventory.items[i]
			 var cat = item.category;
			 var subcat = item.subcat;
			 if(cat && subcat){ //If our item has a sub-category, it is equippable (at least for now!)
				 if(item.category == 'POSI Equipment' && 
					 (item.subcat == '4' || 
					  item.subcat == '5' ||
					  item.subcat == '6' )){
						//Exclude these from our list because we can't equip them.
					 }
				 else{
					if('undefined' != typeof outfit[cat] && 'undefined' != typeof outfit[cat][subcat]){
						var current = Inventory.items[outfit[cat][subcat]][stat]; //You can solve any problem in CS with enough indirection.
						var compare = item[stat];
						var curtotal = Inventory.items[outfit[cat][subcat]].total;
						var comptotal = item.total;
						if(compare > current){
							outfit[cat][subcat] = i;
						}
						else if(compare == current && comptotal > curtotal){
							outfit[cat][subcat] = i;
						}
					}
					else{//Anything is better than nothing (except a rediculous hat; but we don't support unequipping)
						if(!outfit[cat]){
							outfit[cat] = {};
						}
				 		outfit[cat][subcat] = i;
					}
				 }//End not an excludec category
			 }//End equippable item
		 }//End for each item
		 return outfit;
	 },
	 getEquippedOutfit:function(){
		 var outfit = {};
		 for(var i in this.items){
			if(true == this.items[i].equipped){ //If it is equipped save it
				var cat = this.items[i].category
				if('undefined' ==  typeof outfit[cat]){
    				outfit[cat] = {}; //Create a category header if necessary
    			}
    			outfit[cat][i] = i;//this.items[i];
    		}
    	}
		 //Remove any persistantly equipped items
		var always = Inventory.getAlwaysEquipped();
		for(var cat in outfit){
			for(var i in outfit[cat]){
				for(var ae in always){
					if(outfit[cat][i] == ae){
						delete outfit[cat][i];
					}
				}
			}
		}
		return outfit; 
	},
	changeItemEquipped:function(adoptid){
		for (var item in this.items){
			if(adoptid == this.items[item].adoptId){
				var found = item;
			}
		}
		if(found){
			var samecatitems = Inventory.getItemsByCategory(this.items[found].category, this.items[found].subcat);
			for(item in samecatitems){
				this.items[item].equipped = false;
			}
			this.items[found].equipped = true;
		}
		else{
			console.log('Equipped un-scanned item!  Wonkiness until user refreshes the me tab.')
		}
	}
}

/*
 * Stores and manages our Qualities (for now does no real work)
 */
var Qualities = {
    q:{},
    getCategories:function(){
    	var cats = {}; //Use javascript's built in associative array type properties to ensure uniqueness (faster than ohter checking)
    	for(var qual in this.q){
    		cats[this.q[qual].category] = true;
    	}
    	var catlist = [];
    	for(var cat in cats){
    		catlist[catlist.length] = cat;
    	}
    	return catlist
    },
    /*
     * Returns all items in a category
	 */
	getItemsByCategory:function(cat){
		var itemlist = {};
		for(var i in this.q){ 
			var ourcat = this.q[i].category;
			if(cat == ourcat){
				itemlist[i] = this.q[i]
			}
		}
		return itemlist;
	}
    
}

/*
 * Stores and manages our Stats (for now does no real work)
 */
var Stats = {
    s:{}         
}

var SavedOutfit = {
	maxOutfits:10,
    generateSaveString:function(itemlist, name){
	 	var idstr = '';
	 	var imgstr = '';
	 	name = name.replace(/[;|]/g, ''); //Silently erase any disallowed characters
	 	var first = true;
	 	for(var cat in itemlist){
	 		var sortlist = [];
	 		for(var item in itemlist[cat]){
	 			sortlist[sortlist.length] = itemlist[cat][item];
	 		} //Do a quick buble sort to make sure items are always in the same order on the display
	 		for(var i = 0; i < sortlist.length - 1; i++){
	 			for(var j = i+1; j < sortlist.length; j++){
	 				if(Inventory.items[sortlist[i]].subcat > Inventory.items[sortlist[j]].subcat){
	 					var tmp = sortlist[i];
	 					sortlist[i] = sortlist[j];
	 					sortlist[j] = tmp;
	 				}
	 			}
	 		}//Once the items are sorted add them to our string
	 		for(var item in sortlist){
	 			idstr +=  first?'':';';
	 			imgstr += first?'':';';
	 			idstr += Inventory.items[sortlist[item]].adoptId;
	 			imgstr += Inventory.items[sortlist[item]].imgURL;
	 			first = false;
	 		}
	 	}
	 	var statstr = SavedOutfit.createStatString(itemlist);
	 	return name + '|' + idstr + '|' + imgstr + '|' + statstr;
 	},
 	createStatString:function(itemlist){
 		var stats = EB.getImportantStats();
 		var totalstats = {};
 		var statstr = '';
 		for(var stat in stats){
 			totalstats[stats[stat]] = 0;
 		}
 		for(var cat in itemlist){
 			for(var item in itemlist[cat]){
     			for(stat in stats){
     				totalstats[stats[stat]] += Inventory.items[itemlist[cat][item]][stats[stat]];
     			}
 			}
 		}
 		var alwaysEquipped = Inventory.getAlwaysEquipped();
 		for(item in alwaysEquipped){
 			for(stat in stats){
 				totalstats[stats[stat]] += alwaysEquipped[item][stats[stat]];
 			}
 		}
 		var first = true;
 		for(stat in totalstats){
 			var prefix = totalstats[stat]>0?'+':'';
 			var div = first?' (':'/';
 			statstr += div + stat.substr(0,2) + ' ' + prefix + totalstats[stat];
 			first = false;
 		}
 		return statstr + ')';
 	},
	createHTMLFromSaveString:function(str){
 		var parts = str.split('|');
 		var name = parts[0]?parts[0]:null;
 		var items = parts[1]?parts[1]:null;
 		var imgs = parts[2]?parts[2]:null;
 		var stats = parts[3]?parts[3]:null;
 		imgs = imgs?imgs.split(';'):null;
 		var div = document.createElement('div');
 		div.setAttribute('style','float:none')
 		var ul = document.createElement('ul');
 		ul.setAttribute('class','you_icon');
 		ul.setAttribute('style','float:none')
 		for(var i in imgs){
 			var li = document.createElement('li');
 			var img = document.createElement('img');
 			img.setAttribute('src',imgs[i]);
 			li.appendChild(img);
 			ul.appendChild(li);
 		}
 		div.appendChild(ul);
 		var subdiv = document.createElement('p');
 		subdiv.setAttribute('style','float:none')
 		div.appendChild(subdiv);
 		var a = document.createElement('a');
 		a.setAttribute('href','#');
 		a.setAttribute('onclick',"handleEquipSet('" + items +"')");
 		a.setAttribute('style', 'color:black; float:none')
 		a.innerHTML = name;
 		var b = document.createElement('b');
 		b.appendChild(a);
 		subdiv.appendChild(b);
 		if(stats && Options.displayStatsOnWardrobe){
 			var statspan = document.createElement('span');
 			statspan.innerHTML = stats;
 			subdiv.appendChild(statspan);
 		}
 		return div.outerHTML;
 	},
 	getNameFromSaveString:function(str){
 		var parts = str?str.split('|'):null;
 		return parts?parts[0]:null;
 	},
 	saveOutfit:function(itemlist, name){
 		var charName = EB.getName();
 		var lastOutfit = SavedOutfit.getOutfitCount();
 		if(lastOutfit >= SavedOutfit.maxOutfits){
 			alert("Sorry, I currently only support " + SavedOutfit.maxOutfits + "Outfits.  You can increase this by modifying the script if you really want to.")
 		}
 		else{
     		var outfitString = SavedOutfit.generateSaveString(itemlist, name);
     		LS_setValue(charName + '_outfit_' + lastOutfit, outfitString);
     		lastOutfit += 1;
     		LS_setValue(charName + '_saved_outfit_count', lastOutfit);
 		}
 	},
 	deleteOutfit:function(index){
 		var charName = EB.getName();
 		var lastOutfit = SavedOutfit.getOutfitCount();
 		if(index >= 0 && index < lastOutfit){
 			for(var i = index; i < lastOutfit - 1; i++){
 				var name1 = charName + '_outfit_' + i;
 				var name2 = charName + '_outfit_' + (i+1);
 				LS_setValue(name1, LS_getValue(name2, ''));
 			}
 			LS_deleteValue(charName + '_outfit_' + lastOutfit);
 			LS_setValue(charName + '_saved_outfit_count', (lastOutfit - 1))
 		}
 		else{
 			console.log("Attempted to delete outfit that doesn't exist", index);
 		}
 	},
 	getSavedOutfitStrings:function(){
 		var charName = EB.getName();
 		var lastOutfit = SavedOutfit.getOutfitCount();
 		var outfits = [];
 		for(var i = 0; i < lastOutfit; i++){
 			var str = LS_getValue(charName + '_outfit_' + i);
 			outfits[outfits.length] = str?str:null;
 		}
 		return outfits;
 	},
 	getOutfitCount:function(){
 		var charName = EB.getName();
 		var lastOutfit = parseInt(LS_getValue(charName + '_saved_outfit_count', 0));
 		return lastOutfit;
 	}
}
	
/*
 * Handles interfacing with the Bazaar page
 */
var InterfaceBazaar = {
    /*
     * Does a simple check to see if the page is loaded
     */
	isLoaded:function(){
		if('undefined' == typeof document.getElementsByClassName('currentEchoes')[1]){
			return false;
		}
		return true;
	},
	/*
	 * Returns a list of all the elements that contain bazaar price info
	 */
	getItemElements:function(){
		return document.getElementsByClassName('bazaar_item');
	},
	getCostInPennies:function(s){
		var echo =  /([0-9]+) Echo/.exec(s);
		var pence = /([0-9]+) pence/.exec(s);
		var penny = /penny/.exec(s);
		var cost = echo?parseInt(echo[1]) * 100:0;
		cost += pence?parseInt(pence[1]):0;
		cost += penny?1:0;
		return cost;
		
	},
	/*
	 * Returns the name, amount, and value of a bazaar item
	 */
	parseItemElement:function(item){
		 var ourItem = {};
		 var title = item.getElementsByClassName('bazaar_item_title');
		 ourItem.name = title?title[0].firstChild.nodeValue.trim():null;
		 var amount = item.getElementsByClassName('bazaar_item_amount');
		 amount = amount?/([0-9]+)/.exec(amount[0].innerHTML):null;
		 ourItem.count = amount?parseInt(amount[1]):null;
		 var buttons = item.getElementsByClassName('shop_btn');
		 var sell = null;
		 for(var i = 0; i < buttons.length; i++){
			 if(buttons[i].getAttribute('value') == 'SELL'){
				 var sell = buttons[i].parentNode.nextSibling.getElementsByTagName('SPAN');
				 sell = sell?sell[0].innerHTML:null;
				 ourItem.value = this.getCostInPennies(sell);
			 }
		 }
		 return ourItem;
	 },
	 /*
	  * Writes the total values out to the bazaar
	  */
	outputTotals:function(){
		 var titles = document.getElementsByClassName('bazaar_item_title');
		 for(var i = 0; i < titles.length; i++){
			var name = titles[i].firstChild.nodeValue;
			name = name?name.trim():null;
			var item = name?Inventory.items[name]:null;
			var target = titles[i].getElementsByClassName('total_value_span');
			target = target?target[0]:null;
			if(!target){ //If we don't find an insertion target, make one
				var subtarget = titles[i].getElementsByTagName('BR');
				subtarget = subtarget?subtarget[0]:null;
				target = EB.bazaarTotalValueSpan();
				titles[i].insertBefore(target, subtarget);
			}
			if(item != null && target != null){
				target.innerHTML = ' (total value: ' + EB.formatCost(item.count * item.cost,10) + ')';
			}
		}
	},
	outputGrandTotal:function(){
		var target = document.getElementsByClassName('grand_total_span');
		target = target?target[0]:null;
		if(!target){
			var insert = document.getElementsByClassName('currentEchoes');
			insert = insert?insert[1]:null;
			var target = EB.bazaarGrandTotalSpan();
			insert.parentNode.appendChild(target);	  
		}
		target.innerHTML = '<br/> You have ' + EB.formatCost(Inventory.totalValue(),11) + ' worth of goods.';
	}
}

/*
 * Handles our side of the bazaar scanning, item tracking, etc.
 */
var HandleBazaar = { 
    /*
     * Called when the user selects the bazaar.  If the tab is any other than the 'my things' tab,
     * reset should be false - otherwise any items not currently displayed will be erased.
     */                
	scanMyThings:function(reset){
		if(reset){ //To avoid resetting data scanned elsewhere, use a mark-and-sweep cleanup of our data
			Inventory.mark();
		}
		var itemElements = InterfaceBazaar.getItemElements();
		for(var i = 0; i < itemElements.length; i++){
			var parsed = InterfaceBazaar.parseItemElement(itemElements[i]);
			if (parsed.name && parsed.value && parsed.count){
				var item = Inventory.items[parsed.name]; //Get the item if we already have it, or make a new one if we don't.'
				item = item?item:{};
				item.cost = parsed.value;
				item.count = parsed.count;
				Inventory.items[parsed.name] = item; //Update the properties we have 
			}
		}
		InterfaceBazaar.outputTotals();
		InterfaceBazaar.outputGrandTotal();
		if(reset){
			Inventory.sweep();
		}
		Inventory.storeAllValues();
		
	},
	/*
	 * Called when the user clicks on "my things" tab at the bazaar (or the "bazaar" tab which
	 * opens the same page)
	 */
	handleMyThings:function(){
		if(!InterfaceBazaar.isLoaded()){
			setTimeout(HandleBazaar.handleMyThings, defaultTimeout); //If we haven't loaded yet, wait a bit longer
		}
		else {
			HandleBazaar.scanMyThings(true);
		}
	},
	/*
	 * Called when the user clicks any other bazaar tab.
	 */
	handleOtherThings:function(){
		 if(!InterfaceBazaar.isLoaded()){
			 setTimeout(HandleBazaar.handleOtherThings,defaultTimeout); //If we haven't loaded yet, wait a bit longer)
		 }
		 else {
			 HandleBazaar.scanMyThings(false);
		 }
	}
}

/*
 * Handles interfacing with the Myself page
 */	
var InterfaceMyself = {
    /*
     * Does a simple check to determin if the "myself" page is finished loading
     */
	isLoaded:function(){
    	var inv = document.getElementById('inventory');
    	if (inv && inv.firstChild){
    		return true; //Check for first child; this will tell us if sub-areas are loading too
    	}
    	return false;
    },
    /*
     * Injects jquery script into the page and runs it, which loads the extended inventory into a div that is hidden from the user
     */
    loadExtendedHidden:function() {
    	var hidden = EB.bazaarHiddenDiv();
    	hidden.setAttribute('id', 'hidden_extended_inventory');
    	var target = document.getElementById('inventory');
    	target.appendChild(hidden);
    	var jquery = function(){
    		$('#hidden_extended_inventory').load('/Me/InventoryExpanded', function(){callback('hidden_extended_loaded')});
    	}
    	Inject.andRun(jquery);
    },
    /*
     * Parse equippable items.  Parameter is true if we should parse our "hidden" extended inventory,
     * false for the normal inventory (or whatever is currently displayed)
     */
    getEquipmentElements:function(hidden){
    	if(!hidden){
    		var base = document.getElementById('inventory');
    	}
    	else {
    		var base = document.getElementById('hidden_extended_inventory')
    	}
    	if(!base){ //It's possible that while we were waiting for the hidden inventory to load, the user left.
    		return null;
    	}
    	var equippedBase = base.getElementsByClassName('you_mid_mid');
    	var unEquippedBase = base.getElementsByClassName('you_mid_rhs');
    	equippedBase = equippedBase?equippedBase[0]:null;
    	unEquippedBase = unEquippedBase?unEquippedBase[0]:null;
    	var eq = {};
    	eq.equipped = equippedBase.getElementsByClassName('qq');
    	eq.unequipped = unEquippedBase.getElementsByClassName('qq');
    	return eq;
    },
    /*
     * This returns the sub-category of a bit of equipment (i.e. hat slot, gloves slot, etc. by number)
     * Pass in the qq element and whether or not the item is currently equipped.
     */
    getSubCategory:function(qq, equipped){
    	var eltype = equipped?'LI':'UL'; //Equipped items are in one list, unequipped are in multiple lists
    	var qqParent = qq.parentNode;
    	while(qqParent && qqParent.tagName != eltype){
    		qqParent = qqParent.parentNode;
    	}
    	var count = 0;
    	while(qqParent){
    		if(qqParent.tagName == eltype){
    			count += 1;
    		}
    		qqParent = qqParent.previousSibling;
    	}
    	return count;
    },
    /*
     * Parse Tooltip for amount, item name, and stats (from EB.Stats) if "parseStats" is true
     */
    parseTooltip:function(tt, parseStats){
    	var item = {};
    	var countAndTitle = /([0-9]+) x ([^<]+)/.exec(tt); //Take the amount and hte title, up until the start of the html tag
    	item.count = countAndTitle?parseInt(countAndTitle[1]):null;
    	item.name = countAndTitle?countAndTitle[2]:null;
    	var unname = /\(([^\d]+)\)/.exec(item.name); //Handle "named" items in the inventory
    	item.name = unname?unname[1]:item.name;    	
    	if(parseStats) {
    		var total = 0;
    		for(var stat in EB.Stats) {
    			var statMatch = new RegExp(EB.Stats[stat] + '[ ]?([+-]?[0-9]+)');
    			var statValue = statMatch.exec(tt);
    			statValue = statValue?parseInt(statValue[1]):0;
    			statValue = isNaN(statValue)?0:statValue;
    			item[EB.Stats[stat]] = statValue; //Mark the stat as zero, rather than null, if the item doesn't modify it.
    			if(!InterfaceMyself.isIgnoreStat(EB.Stats[stat])){ //Ignore certain stats (such as Scandal) that are negative
    				total += statValue;
    			}
    		}
    		item.total = total;
    	}
    	return item;
     },
     isIgnoreStat:function(stat){
    	 for(var i in EB.IgnoreStats){
    		 if(EB.IgnoreStats[i] == stat){
    			 return true;
    		 }
    	 }
    	 return false;
     },
     getTooltipFromQQ:function(qq){
    	 var ttEl = qq.parentNode;
    	 while(ttEl && ttEl.tagName != 'A'){
    		 ttEl = qq.parentNode;
    	 }    	 
    	 return ttEl;
     },
     parseAdoptThingIdFromQQ:function(qq){
  		var onclick = qq.parentNode.getAttribute('onclick');
  		var re = /adoptThing\(([0-9]+)/;
  		var id = onclick?re.exec(onclick):null;
  		id = id?id[1]:null;
  		return id;
  	},
  	parseImageFromQQ:function(qq){
  		var sib = qq.nextSibling;
  		while(sib && !sib.getAttribute('id').match(/Image/)){
  			sib = sib.nextSibling;
  		}
  		var img = sib.firstChild;
  		while(img && img.tagName != 'IMG'){
  			img = img.nextSibling;
  		}
  		return img?img.getAttribute('src'):null;
  	},
     /*
      * Adds the category value to the inventory screen
      */
    addEquipmentValue:function(){
    	var target = document.getElementById('inventory');
    	var span = EB.myselfTotalValueSpan();
    	var eqValue = Inventory.getCategoryTotal('Equipment');
    	span.innerHTML = '(Equipment value: ' + EB.formatCost(eqValue, 13) + ')';
    	target.appendChild(span);
    },
    getInventoryElements:function(){
    	var base = document.getElementsByClassName('you_bottom_rhs');
    	base = base?base[0]:null;
    	var items = base.getElementsByClassName('qq');
    	return items;
    },
    getInventoryCategories:function(){
    	var base = document.getElementsByClassName('you_bottom_rhs');
    	base = base?base[0]:null;
    	var next = base?base.firstChild:null;
    	var cats = Array();
    	while(next){
    		if(next.tagName == 'H3'){
    			cats[cats.length] = next;
    		}
    		next = next.nextSibling;
    	}
    	return cats;
    },
    getCategoryHeaderFromElement:function(qq){
    	var up = qq.parentNode;
    	while (up && up.tagName != 'UL'){
    		up = up.parentNode
    	}
    	while (up && up.tagName != 'H3'){
    		up = up.previousSibling;
    	}
    	return up;
    },
    /*
     * Returns an html string for the worth of an item or stack for use in a tooltip
     */
    formatTooltipAmount:function(qq, amount){
    	var ourtext = '<br/><i>Worth ' + EB.formatCost(amount, 10) + '.</i>';
    	var oldtt = qq.getAttribute('original_tooltip');
    	if(oldtt){
    		var tt = oldtt; 
    	}
    	else {
    		var tt = qq.getAttribute('title');
    		qq.setAttribute('original_tooltip', tt);
    	}
    	qq.setAttribute('title', tt + ourtext);
    },
    getCategoryText:function(hh){
    	return hh.firstChild.nodeValue.trim();
    },
    writeCategoryValue:function(hh, value){
    	if(value) {
    		hh.innerHTML = EB.formatCost(value, 13);
    	}
    },
    setGrandTotal:function(){
    	var span = EB.inventoryGrandTotalSpan();
    	var total = Inventory.totalValue() - Inventory.getCategoryTotal('Equipment');
    	span.innerHTML = '('+EB.formatCost(total, 13)+')';
    },
    /*
     * Returns the list of divs containing the qualities.  May also contain other html in the innerHTML tags.
     */
    getQualityElements:function(){
    	var base = document.getElementById('mainContentViaAjax');
    	base = base.getElementsByClassName('you_bottom_lhs');
    	base = base?base[0]:null;
    	return base.getElementsByClassName('qualities_rhs');
    },
    getQualityHeaderElement:function(qualityCategory){
    	var base = document.getElementById('mainContentViaAjax');
    	base = base.getElementsByClassName('you_bottom_lhs');
    	base = base?base[0]:null;
    	var hh = base.firstChild;
    	while(hh){
    		var text = hh.innerText;
    		var re = RegExp(qualityCategory)
    		if(text && text.match(re)){
    			break;
    		}
    		hh = hh.nextSibling;
    	}
    	return hh;
    },
    getQualityCategoryFromElement:function(qe){
    	var up = qe.parentNode;
    	while(up && up.getAttribute('class') != 'qualitiesToggleDiv'){
    		up = up.parentNode;
    	}
    	while(up && up.tagName != 'H3'){
    		up = up.previousSibling;
    	}
    	return up;
    },
    createDeleteOutfitButton:function(index){
 		var a = document.createElement('a');
 		a.setAttribute('onclick', 'callback("delete_outfit_'+index+'");return 0;');
 		a.setAttribute('style','float:none');
 		a.setAttribute('href', '#');
 		a.setAttribute('class', 'standard_btn');
 		return a;
 	},
 	createSaveOutfitButton:function(){
 		var a = document.createElement('a');
 		a.setAttribute('onclick', 'callback("save_current_outfit");return 0;');
 		a.setAttribute('class', 'standard_btn');
 		a.setAttribute('href', '#');
 		a.setAttribute('style','float:none');
 		return a;
 	},
 	createNameInputBox:function(d){
 		var nm = document.createElement('input');
 		nm.setAttribute('id','saved_custom_name');
 		nm.setAttribute('style', 'width:250px');
 		return nm
 	},
 	isExpandedInventoryShowing:function(){
 		//Shortcut: if we dont' have an expanded inventory, it isn't showing!
 		if(!InterfaceMyself.areWePOSI()){
 			return false;
 		}
 		var base = document.getElementById('inventory');
 		var button = base?base.firstChild:null;
 		while (button && button.tagName != 'A'){
 			button = button.nextSibling;
 		}
 		var find = button?/EXPANDED/.exec(button.innerHTML):null;
 		if(find){
 			return false;
 		}
 		return true;
 	},
 	calculateCP:function(stat){
 		if (stat >=50){ //It takes 1275 cp points to reach 50, and 50 cp for each level after that
 			return ((stat - 50) * 50) + 1275;
 		}
 		else if(1 == stat){ //Reaching level 1 just takes 1
 			return 1;
 		}
 		else { //Otherwise, the cost depends on the previous level - use the memoize patern to this up and avoid many recursive calls.
 			this.cpMemoize = this.cpMemoize?this.cpMemoize:[];
 			if('undefined' == typeof this.cpMemoize[stat]){
 				this.cpMemoize[stat] = stat + InterfaceMyself.calculateCP(stat - 1);
 			}
 			return this.cpMemoize[stat];
 		}
 	},
 	areWePOSI:function(){
 		var base = document.getElementById('inventory');
 		var child = base?base.firstChild:null;
 		while(child && 'EXPANDED INVENTORY' != child.innerText && 'STANDARD INVENTORY' != child.innerText){
 			child = child.nextSibling;
 		}
 		return child?true:false;
 	}
}

/*
 * Handles our side of the "myself" page such as inventory scanning, equipment calculations, etc.
 */
var HandleMyself = {
    handleMe:function(){
	 	if(!InterfaceMyself.isLoaded()){
	 		setTimeout(HandleMyself.handleMe, defaultTimeout);
	 	}
	 	else {
	 		if(InterfaceMyself.areWePOSI()){
	 			InterfaceMyself.loadExtendedHidden(); //Load our extended inventory (parsed when it arrives)
	 		}
	 		HandleMyself.handleVisibleEquipment();
	 		HandleMyself.handleInventory();
	 		HandleMyself.parseQualities();
	 		HandleMyself.displayCSV();
	 		HandleMyself.createOutfitManagementButtons();
	 		//HandleMyself.displayContactsCP();
	 	}
 	},
 	/*
 	 * Parses and updates the visible equipment, but not extended inventory or "INVENTORY"
 	 */
 	handleVisibleEquipment:function(){
 		if(!InterfaceMyself.isLoaded()){
	 		setTimeout(HandleMyself.handleVisibleEquipment, defaultTimeout);
	 		return;
	 	}
 		var extended = InterfaceMyself.isExpandedInventoryShowing();
 		var equipElements = InterfaceMyself.getEquipmentElements(false); //Fetch our equipment from the displayed section
 		for(var i = 0; i < equipElements.unequipped.length; i++){
 			HandleMyself.addInventoryEquipmentElement(equipElements.unequipped[i], false, extended);
 		}
 		//Parse equipped second so that the "equipped" flag overwrites the unequipped flag in case one of a
 		//stack of items is equipped (e.g. a goldfish)
 		for(var i = 0; i < equipElements.equipped.length; i++){
 			HandleMyself.addInventoryEquipmentElement(equipElements.equipped[i], true, extended);
 		}
 		Inventory.loadMissingValues();
 		InterfaceMyself.addEquipmentValue();
 		var allElements = HandleMyself.mergeElements(equipElements.equipped, equipElements.unequipped);
 		for(var i = 0; i < allElements.length; i++){
 			HandleMyself.setTooltipWorth(allElements[i]);
 		}
 		if(!InterfaceMyself.areWePOSI()){ //If we aren't a PoSI, we need to do this here rather than wait for the extended inventory
 			HandleMyself.displayCSV();
 		 	HandleMyself.saveBestOutfits();
 		}
 	},
 	/*
 	 * Parses the non-equipable inventory and sets up tooltips and category values.
 	 */
 	handleInventory:function(){
 		 var items = InterfaceMyself.getInventoryElements();
 		 for(var i = 0; i < items.length; i++){
 			 HandleMyself.addInventoryElement(items[i]);
 		 }
 		 Inventory.loadMissingValues();
 		 for(var i = 0; i < items.length; i++){
 			 HandleMyself.setTooltipWorth(items[i]);
 		 }
 		 var cats = InterfaceMyself.getInventoryCategories();
 		 for(var i = 0; i < cats.length; i++){
 			 var span = EB.inventoryTotalSpan(cats[i])
 			 var name = InterfaceMyself.getCategoryText(cats[i]);
 			 var value = Inventory.getCategoryTotal(name);
 			 InterfaceMyself.writeCategoryValue(span, value);
 		 }
 		 InterfaceMyself.setGrandTotal();
 	 },
 	 /*
 	  * Sets the tooltip associated with a quanity to include it's worth.  Will use the unmodified tooltip as its base.
 	  */
 	setTooltipWorth:function(qq){
 		var ttEl = InterfaceMyself.getTooltipFromQQ(qq);
 		var tt = ttEl?ttEl.getAttribute('title'):null;
		if(tt){
			var name = /[0-9]+ x ([^<]+)/.exec(tt)[1];
			var unname = /\(([^\d]+)\)/.exec(name); //Handle "named" items in the inventory
			name = unname?unname[1]:name; 
			var item = Inventory.items[name];
			var worth = item.count * item.cost;
			if(worth){
				InterfaceMyself.formatTooltipAmount(ttEl, worth);
			}
		}
 	},
 	/*
 	 * Merges two lists.  If you've mucked around with prototypes you'll wind up with the prototype of list 2.
 	 */
 	mergeElements:function(list1, list2){
 		var merge = Array();
 		for (var i = 0; i < list1.length; i++){
 			merge[merge.length] = list1[i];
 		}
 		for (var i = 0; i < list2.length; i++){
 			merge[merge.length] = list2[i];
 		}
 		return merge;
 	},
 	/*
 	 * Adds an item (pointed to by an element) to the inventory, assuming it's an Equippable item
 	 */
 	addInventoryEquipmentElement:function(element, equipped, extended){
 		var tt = InterfaceMyself.getTooltipFromQQ(element).getAttribute('title');
 		var item = InterfaceMyself.parseTooltip(tt, true);
 		item.category = extended?'POSI Equipment':'Equipment';
 		item.subcat = InterfaceMyself.getSubCategory(element, equipped);
 		item.equipped = equipped;
 		item.adoptId =InterfaceMyself.parseAdoptThingIdFromQQ(element);
 		item.imgURL = InterfaceMyself.parseImageFromQQ(element);
 		name = item.name;
 		delete item.name; //We store this differently in the inventory
 		Inventory.mergeItem(name, item);
 	},
 	/*
 	 * Adds a non-equippable item to the inventory
 	 */
 	addInventoryElement:function(element){
 		var tt = InterfaceMyself.getTooltipFromQQ(element).getAttribute('title');
 		var item = InterfaceMyself.parseTooltip(tt, true);
 		var hh = InterfaceMyself.getCategoryHeaderFromElement(element);
 		item.category = InterfaceMyself.getCategoryText(hh)
 		name = item.name;
 		delete item.name;
 		Inventory.mergeItem(name, item);
 	},
 	/*
 	 * Handles when the POSI equipment is loaded into our hidden div
 	 */
 	handleExtendedLoaded:function(){
 		var equipElements = InterfaceMyself.getEquipmentElements(true); //Fetch our equipment from its hidden div
 		if(null == equipElements){
	 		setTimeout(HandleMyself.handleExtendedLoaded, defaultTimeout);
	 		return;
	 	}
 		for(var i = 0; i < equipElements.equipped.length; i++){
	 		HandleMyself.addInventoryEquipmentElement(equipElements.equipped[i], true, true);
	 	}
	 	for(var i = 0; i < equipElements.unequipped.length; i++){
	 		HandleMyself.addInventoryEquipmentElement(equipElements.unequipped[i], false, true);
	 	}
	 	//Now that we have all our equipment scanned, update our lists
	 	HandleMyself.displayCSV();
	 	HandleMyself.saveBestOutfits();
 	},
 	parseQualities:function(){
 		Qualities.q = {};//Erase all our old qualities
 		var qualities = InterfaceMyself.getQualityElements();
 		var qualityPartsPattern = /^(<[^>]+>)*([^\d<\n]+)([0-9]*)( - )?([^<\n]*)/; //A good RegEx is like a magic spell...
 		var matchCategory = /<a[^>]*>([^<]*)/;
 		for(var i = 0; i < qualities.length; i++){
 			var text = qualities[i].innerHTML;
 			//text = text.trim().replace(/<[^>]+>/g,'');//Strip off any HTML tags from the text
 			var parts = qualityPartsPattern.exec(text);
 			var cat = InterfaceMyself.getQualityCategoryFromElement(qualities[i]);
 			cat = matchCategory.exec(cat.innerHTML);
 			Qualities.q[parts[2]] = {'category':cat[1], 'value':parseInt(parts[3]), 'flavor':parts[5]};
 		}
 	},
 	/*
 	 * Outputs the CSV data to the "myself" page
 	 */
 	displayCSV:function(){
 		var csv = EB.inventoryCSVDiv();
 		var csvText = '';
 		var w = 4;
 		csvText += HandleMyself.makeCSVLine(['_Main Qualities_'],w);
 		for(var stat in Stats.s){
 			csvText += HandleMyself.makeCSVLine([stat, Stats.s[stat]],w);
 		}
 		csvText += HandleMyself.makeCSVLine(['_Total Worth_', EB.formatCost(Inventory.totalValue(),0)],w);
 		csvText += HandleMyself.makeCSVLine(['_Equipment_', EB.formatCost(Inventory.getCategoryTotal('Equipment'),0)],w);
 		var items = Inventory.getItemsByCategory('Equipment');
 		for(var item in items){
 			csvText += HandleMyself.makeCSVLine([item, items[item].count, EB.formatCost(items[item].cost,0), EB.formatCost(items[item].cost*items[item].count)],w)
 		}
 		csvText += HandleMyself.makeCSVLine(['_POSI Equipment_', EB.formatCost(Inventory.getCategoryTotal('POSI Equipment'),0)],w);
 		var items = Inventory.getItemsByCategory('POSI Equipment');
 		for(var item in items){
 			csvText += HandleMyself.makeCSVLine([item, items[item].count, EB.formatCost(items[item].cost,0), EB.formatCost(items[item].cost*items[item].count)],w)
 		}
 		var cats = Inventory.getCategories();
 		for(var cat in cats){
 			if('Equipment' != cats[cat] && 'POSI Equipment' != cats[cat]){
 				var items = Inventory.getItemsByCategory(cats[cat]);
 				csvText += HandleMyself.makeCSVLine(['_'+cats[cat]+'_', EB.formatCost(Inventory.getCategoryTotal(cats[cat]),0)],w);
 				for(var item in items){
 		 			csvText += HandleMyself.makeCSVLine([item, items[item].count, EB.formatCost(items[item].cost,0), EB.formatCost(items[item].cost*items[item].count)],w)
 		 		}
 			}
 		}
 		var cats = Qualities.getCategories();
 		for(var cat in cats){
 			csvText += HandleMyself.makeCSVLine(['_'+cats[cat]+'_'],w)
 			var items = Qualities.getItemsByCategory(cats[cat]);
 			for(var item in items){
 				csvText += HandleMyself.makeCSVLine([item, items[item].value, items[item].flavor],w);
 			}
 		}
 		csv.innerHTML = csvText;
 	},
 	makeCSVLine:function(arr, width){
 		var str = '';
 		for(var i = 0; i < width; i++){
 			str += i?',':''; //Add a comma if this isn't our first element
 			var value = arr[i];
 			if(typeof value != 'undefined' && value != null && value != ''){
 				var forbidden = /[",\n]/g; //characters not allowed in CSV"
 				if(forbidden.test(value)){
 					value = value.replace('"', '""'); //CSV convention is to double quotes to escape them
 					value = '"' + value + '"';
 				}
 				str += value;
 			}
 			else if(i == width - 1) { //Special case: last entry can't be null.
 				str += ' ';
 			}//In any other position we can accept null entries; do nothing.
 		}
 		str += '</br>';
 		return str;
 	},
 	saveBestOutfits:function(){
 		var alwaysOn = Inventory.getAlwaysEquipped();
 		for(var st in Inventory.customWardrobes){
 			var stat = Inventory.customWardrobes[st];
 			var outfit = Inventory.getBestOutfitForStat(stat);
 			var statTotal = 0;
 			for(var cat in outfit){
 				for(var item in outfit[cat]){
 					statTotal += Inventory.items[outfit[cat][item]][stat];
 				}
 			}
 			for(item in alwaysOn){
 				statTotal += alwaysOn[item][stat];
 			}
 			var plus = statTotal > -1?' +':' ';
 			var name = 'Max ' + stat + plus + statTotal;
 			var string = SavedOutfit.generateSaveString(outfit, name);
 			var savename = EB.getName() + '_outfit_' + stat;
 			LS_setValue(savename, string);
 		}
 		HandleLHS.handleUpdate();//Update the wardrobe function values now that we have a wardrobe.
 	},
 	createOutfitManagementButtons:function(){
 		var ourdiv = EB.getOutfitDiv();
 		while(ourdiv.lastChild){ //Clear out any old data, if it exists
			ourdiv.removeChild(ourdiv.lastChild);
		}
 		var outfits = SavedOutfit.getSavedOutfitStrings();
 		for(var i = 0; i < outfits.length;i++){
 			var a = InterfaceMyself.createDeleteOutfitButton(i);
 			a.innerHTML = 'Delete "' + SavedOutfit.getNameFromSaveString(outfits[i]) +'"';
 			ourdiv.appendChild(a);
 			ourdiv.appendChild(document.createElement('br'));
 		}
 		var maxoutfits = SavedOutfit.getOutfitCount();
 		var a = InterfaceMyself.createSaveOutfitButton();
 		a.innerHTML = "Save outfit (name below)";
 		ourdiv.appendChild(a);
 		ourdiv.appendChild(document.createElement('br'))
 		var nm = InterfaceMyself.createNameInputBox();
 		nm.value = 'Outfit #' + maxoutfits;
 		ourdiv.appendChild(nm);
 	},
 	/*
 	 * Handles the save outfit callback
 	 * Assumes outfits as parsed are accurate - this saves us from having to wait on callbacks for the hidden inventory!
 	 */
 	handleSaveOutfit:function(){
 		var outfit = Inventory.getEquippedOutfit();
 		var current = SavedOutfit.getOutfitCount();
 		var namebx = document.getElementById('saved_custom_name');
 		var name = namebx?namebx.value:'Outfit' + current;
 		name = (name.length<1)?'Outfit' + current:name;
 		SavedOutfit.saveOutfit(outfit, name);
 		HandleMyself.createOutfitManagementButtons(); //Refresh our buttons now that we have one more
 		HandleLHS.handleUpdate(); //Update our wardrobe too
 	},
 	handleDeleteOutfit:function(index){
 		var i = parseInt(/([0-9]+)/.exec(index.type)[1]);
 		SavedOutfit.deleteOutfit(i);
 		HandleMyself.createOutfitManagementButtons(); //Refresh our buttons
 		HandleLHS.handleUpdate(); //Update our wardrobe too
 	},
 	handleAdoptThing:function(){
 		var thingEl = document.getElementById('callback_data_div');
 		var thingId = thingEl?/([0-9]+)/.exec(thingEl.innerHTML):null;
 		thingId = thingId?parseInt(thingId[0]):null;
 		if(thingId){
 			Inventory.changeItemEquipped(thingId);
 		}
 		else{
 			console.log("Unable to determin what the user equipped; outfits will be messed up.")
 		}
 	},
 	displayContactsCP:function(){
 		var hh = InterfaceMyself.getQualityHeaderElement('Contacts');
 		var contacts = Qualities.getItemsByCategory('Contacts');
 		if(hh && contacts){
     		var totalcp = 0;
     		for(var c in contacts){
     			var contact = Qualities.q[c];
     			totalcp += InterfaceMyself.calculateCP(contact['value']);
     		}
     		totalcp += '';
     		var split = /(\d+)(\d{3})/;
    	 	while(split.test(totalcp)){
    	 		totalcp = totalcp.replace(split, '$1' + ',' + '$2');
    	 	}
    	 	hh.innerHTML = hh.innerHTML + ' (' + totalcp + ' cp)';
    	 }
 	}
}

var HandleLHS = {
    handleUpdate:function(){
	 	HandleLHS.setStats(['FATE', 'DANGEROUS', 'WATCHFUL', 'PERSUASIVE', 'SHADOWY']);
	 	HandleLHS.createPanel();
 	},
	setStats:function(statlist){
 		var base = document.getElementsByClassName('you_lhs');
 		base = base?base[0]:null;
 		var matchstring = "("
 		for(var stat in statlist){
 			matchstring += statlist[stat] + '|';
 		}
 		matchstring = matchstring.slice(0, matchstring.length-1) + ')[^>]*>([0-9]+)';
 		var re = RegExp(matchstring);
 		var possibles = base.getElementsByTagName('P');
 		for(var i = 0; i < possibles.length; i++){
 			var match = re.exec(possibles[i].innerHTML);
 			if(match){
 				Stats.s[match[1]] = match[2];
 			}
 		}
 	},
 	createPanel:function(){
 		var ul = EB.youPanel();
 		while(ul.lastChild){ //Clear out any old data, if it exists
 			ul.removeChild(ul.lastChild);
 		}
 		var li = document.createElement('li');
 		ul.appendChild(li);
 		var a = document.createElement('a');
 		a.setAttribute('href','#');
 		var html = HandleLHS.outfitChooser();
 		a.setAttribute('onclick', 'customModal('+html+');return 0;');
 		li.appendChild(a);
 		var img = document.createElement('img');
 		img.setAttribute('src', 'http://images.echobazaar.failbettergames.com/icons/cloaksmall.png');
 		img.setAttribute('alt','Choose Outfit');
 		a.appendChild(img);
 		var p = document.createElement('p')
 		p.innerHTML = "Wardrobe";
 		var li2 = document.createElement('li');
 		li2.appendChild(p);
 		ul.appendChild(li2);
 		//ul.parentNode.insertBefore(p, ul.nextSibling);
 	},
 	outfitChooser:function(){
 		var html = '<br/><h1 class="redesign" style="text-align:center">Choose an outfit to equip</h1><br/>'
 		html += '<img style="cursor:pointer;z-index:100;float: left; position: absolute;left:10px;top:10px;" alt="close" src="http://images.echobazaar.failbettergames.com/functionalicons/close.png" title="close"onclick="closeGeneralDialog()" />';
 		var charName = EB.getName();
 	 	var lastOutfit = SavedOutfit.getOutfitCount();
 	 	for(var i = 0; i < lastOutfit; i++){
 	 		var str = LS_getValue(charName + '_outfit_' + i);
 	 		var outfitHTML = str?SavedOutfit.createHTMLFromSaveString(str):'';
 	 		html += outfitHTML;
 	 	}
 		for(var stat in Inventory.customWardrobes){ //Now add all the automatic outfits
 			var savedName = EB.getName() + '_outfit_' + Inventory.customWardrobes[stat];
 			var savedOutfit = LS_getValue(savedName, null);
 			if(savedOutfit){
 				var outfitHTML = savedOutfit?SavedOutfit.createHTMLFromSaveString(savedOutfit):'';
 				html += outfitHTML;
 			}
 		}
 		return EB.makePassableHTML(html);
 	}
}

var clearOldData = function(force) {
	var currentDataScheme = 2;
	var storedDataScheme = LS_getValue('data_scheme', 0);
	if(force || (currentDataScheme != storedDataScheme)) {
		var stored = LS_listValues();
		for(var i = 0; i < stored.length; i++){
			LS_deleteValue(stored[i]);
		}
	}
	LS_setValue('data_scheme', currentDataScheme);
}

/*
 * Used for testing purposes.  Will erase all local data for this site, even if it isn't ours
 */
var clobberAllLocalStorage = function(){
	for(item in localStorage){
		console.log('erasing', item)
		localStorage.removeItem(item);
	}
}

function makeClothingProgressHTML(){
	var html = '<br/><h1 class="redesign" style="text-align:center">Equipping Outfit</h1><br/>'
	html += '<img style="cursor:pointer;z-index:100;float: left; position: absolute;left:10px;top:10px;" alt="close" src="http://images.echobazaar.failbettergames.com/functionalicons/close.png" title="close"onclick="closeGeneralDialog()" />';
	var imgicon = document.createElement('img');
	imgicon.setAttribute('src','http://images.echobazaar.failbettergames.com/icons/tattoo.png');
	imgicon.setAttribute('style','display:block;margin-left:auto;margin-right:auto;');
	html += imgicon.outerHTML;
	html += '</br>';
	var p = document.createElement('p');
	p.innerHTML = "Please be patient.  Donning proper attire takes time!";
	p.setAttribute("style",'display:block;text-align:center')
	html += p.outerHTML;
	var progress = document.createElement('span');
	progress.setAttribute('class','rank');
	progress.setAttribute('style','display:block;margin-left:auto;margin-right:auto;width:15em');
	var bar = document.createElement('img');
	bar.setAttribute('id','outfit_progress');
	bar.setAttribute('width','0%');
	bar.setAttribute('height','12');
	bar.setAttribute('src','http://images.echobazaar.failbettergames.com/rank.png');
	bar.setAttribute('style','float:left')
	progress.appendChild(bar);
	html += progress.outerHTML;
	html = EB.makePassableHTML(html);
	return html;		
}
	
/*
 * Entry point
 * Not necessary for javascript, but keeps "run immediatley" code from littering the file
 */
var main = function(){
	//Global data store
	myThings = {};
	defaultTimeout = 100;
	
	//Handle cross-browser differneces
	CrossBrowserSupport.supportGM();
	CrossBrowserSupport.supportTrim();

	//Make sure we're not reading old data
	clearOldData(false);
	
	//Add a div where we can download content unseen by the user
	var div = document.createElement('div');
	div.setAttribute('style', 'display: none');
	div.setAttribute('id', 'devnull');
	document.body.appendChild(div);
	
	//Set up any javascript we will need to run on the  page
	Inject.andRun(handleToggles);
	Inject.aFunction(customModal);
	Inject.aFunction(handleEquipSet);
	Inject.aFunction(monitorEquips);
	Inject.aFunction("function getLoadingHTML(){return " + makeClothingProgressHTML() + ";}");
	Inject.aFunction(getCallbackDataDiv)
	
	//Set up ajax intercepts and handlers
	Inject.aFunction(callback);
	AjaxInterceptor.addCallback('/Me', HandleMyself.handleMe);
	AjaxInterceptor.addCallback('/Bazaar', HandleBazaar.handleMyThings);
	AjaxInterceptor.addCallback('/Bazaar/ByCategory?category=Weapon', HandleBazaar.handleOtherThings);
	AjaxInterceptor.addCallback('/Bazaar/ByCategory?category=Hat', HandleBazaar.handleOtherThings);
	AjaxInterceptor.addCallback('/Bazaar/ByCategory?category=Gloves', HandleBazaar.handleOtherThings);
	AjaxInterceptor.addCallback('/Bazaar/ByCategory?category=Clothing', HandleBazaar.handleOtherThings);
	AjaxInterceptor.addCallback('/Bazaar/ByCategory?category=Companion', HandleBazaar.handleOtherThings);
	AjaxInterceptor.addCallback('/Bazaar/ByCategory?category=Boots', HandleBazaar.handleOtherThings);
	AjaxInterceptor.addCallback('/Bazaar/ByCategory?category=Curiosity', HandleBazaar.handleOtherThings);
	AjaxInterceptor.addCallback('/Bazaar/ByCategory?category=Goods', HandleBazaar.handleOtherThings);
	AjaxInterceptor.addCallback('/Me/InventoryStandard', function(){setTimeout(HandleMyself.handleVisibleEquipment, defaultTimeout);});
	AjaxInterceptor.addCallback('/Me/InventoryExpanded', function(){setTimeout(HandleMyself.handleVisibleEquipment, defaultTimeout);});
	AjaxInterceptor.addCallback('/User/InfoSummary', function(){setTimeout(HandleLHS.handleUpdate, defaultTimeout);});
	AjaxInterceptor.addCallback('/Me/AdoptThing', function(){setTimeout(HandleMyself.handleAdoptThing, defaultTimeout);});
	AjaxInterceptor.finalizeIntercepts();
	
	//Set up other listeners and handlers
	document.addEventListener('hidden_extended_loaded', HandleMyself.handleExtendedLoaded, false);
	document.addEventListener('save_current_outfit', HandleMyself.handleSaveOutfit, false);
	for(var i = 0; i < SavedOutfit.maxOutfits; i++){
		document.addEventListener('delete_outfit_' + i, function(i){HandleMyself.handleDeleteOutfit(i);});
	}
}
main();
