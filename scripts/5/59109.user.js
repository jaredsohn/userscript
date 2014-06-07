// ==UserScript==
// @name           The West - Job Equip
// @namespace      http://armeagle.nl
// @description    Eases equipping the right equipment suggested by The West Insider.
// @include        http://*.the-west.*/game.php*
// @include        http://www.thewestinsider.com/job_calc*
// @include        http://www.westcalc.info/index.php?d=f&p=*&w=*.the-west.net
// @require        http://userscripts.org/scripts/source/75442.user.js
// @resource  meta http://userscripts.org/scripts/source/59109.meta.js
// @version        0.10b
// ==/UserScript==
/*
This is a script adding features to the webbrowser game The West on multiple levels.

In the game itself you can click the "The West" header in the center top of the game window to open a window that lets you store job locations.
The Inventory window has some new additions. These allow you to store and equip item sets. This works together with third party tools TheWestInsider.com and WestCalc.info. On the website of the first it will turn all the lists of "Your Best Items" into links. Clicking on them will store that as a set, so it can be used in the The West Inventory window again for easy equipping. Similar functionality exists for WestCalc.
Thirdly this script sets some default values in job/activity windows (2 hour duration) and the town Hotel window (most expensive room).

Requires Firefox 3.5+ [Using localStorage (falling back to globalStorage) and GM_set/getValue].
Suggested to use together with The West Extra Tools - Modified (http://userscripts.org/scripts/show/74678), so you have an easy button to open the The West Insider Job Calculator.

This work is licensed under a Creative Commons Attribution-Noncommercial-Share Alike 3.0 Unported License by Alex Haan (http://creativecommons.org/licenses/by-nc-sa/3.0/)

Changelog:
version 0.10b:
 - Remove a quote that prevented the 'store' button from showing in a job window.
version 0.10a:
 - Changed a URL specific check that limited use to the-west.net. This should make the script work on non .net the-west sites too.
version 0.10:
  The West updated to version 1.30 changing the Inventory window. The extra UI elements for this script are now placed in the Inventory  window title, moving the 'Inventory' text to the left.
  Everything should work again now, if not, I hope I find it myself and fix it soon. Else feel free to let me know.
version 0.9:
  - New feature: Storing of job locations.
	 In every job window a 'Store' button is added which will store the current job location and set amount of labor hours.
	 When you click on the "The West" header in the center top of the game window a popover will open listing all stored jobs for easy access.
	 Since I added the 'Store' button anyway, I made the Labor Duration drop-down default to 2 hours (and the hotel sleeping to the most expensive room).
version 0.8.4:
  - TWI was changed yet again, though it should have worked but it didn't seem to do so consistently. Maybe a stray 'console.log' was to blame.
version 0.8.3:
  - TWI changed the script to run in JavaScript. I hacked around to make this script load after the table is filled
version 0.8.2:
  - Made compatible with TheWestInsider reduced calculator.
version 0.8.1.a:
  - Removed a debug line 
version 0.8.1:
  - TWI was changed back, so changing the script to just find the right column now.
version 0.8:
  - TWI was updated, moving the Luck column to the right-hand side. Changed this script accordingly.
version 0.7.2:
 - Changed a very small thing to make script cooperate with another script I wrote: TheWestInsider Compare Labor | http://userscripts.org/scripts/show/76638
version 0.7.1:
 - Changed the equip script. The old one didn't like stacks of items if one of those needed to be equipped.
version 0.6.1:
 - Added an autoupdater script (I hope it works ok :P)
version 0.6.1:
 - Closing or canceling the prompt popup asking for a set name would add an entry named 'null'. Doing this a second time would lead to an infinite loop of canceling, forcing to choose a temporary name to exit the loop.
version 0.6:
 - Added support for westcalc.info's job calculator (supporting fort battle item calculations).
 - Slightly changed layout of the equip elements in the inventory window.
version 0.5:
 - On the West Insider job calculator page sometimes there's an extra whitespace after an item name. This prevented that item from being equipped.
version 0.4:
 - Better filtering on item names ("Gray bow" will not be equipped when "Gray bow tie" is supposed to be).
version 0.3.1:
 - Requiring Firefox 3.5 as minimum again now. It's too much hassle to make it work in older versions.
version 0.3:
 - Supporting Firefox 3+ now by falling back to globalStorage when localStorage (introduced with FF3.5+) is not available.
version 0.2:
 - Added saving, recalling and deleting (currently equipped) sets. Moved the equip button for that.
 - Will count down the amount of items that still have to be equipped (shown by amount of dots reducing in the equip button).
*/

// code namespace
if ( unsafeWindow.AEG === undefined ) {
	unsafeWindow.AEG = {};
}

// Script injected on The West (game)
function TW_DOM_script() {
	var script = document.getElementsByTagName('head')[0].appendChild(document.createElement('script'));
	script.setAttribute('type', 'text/javascript');
	return script.textContent=TW_DOM_script.toString().replace(/[\s\S]*"\$1"\);([\s\S]*)}/,"$1");
	// store last selected item of the equip dropdown
	AEG.equip_dropdown_changed = function (event) {
		AEG.lastSelectedEquipDropdown = event.target.value;
	}
	AEG.addEquipLink = function() {
		// check whether content is loaded
		var wear_group = document.getElementById('window_inventory_content');
		if ( document.getElementById('item_trader_button') == null) {
			// try again later
			AEG.addEquipLink.delay('500');
		} else if ( document.getElementById('AEGequip_wrapper') == null ) { // try to prevent multiple additions, if clicked too fast
			AEG.addGlobalStyle('#AEGequip_wrapper a:visited {color: #cccccc;}');
			AEG.addGlobalStyle('#window_inventory_title {margin: 8px 20px; text-align: left;}');
			// store, equip dropdown and link
			var equip_wrapper = document.createElement('form');
			equip_wrapper.setAttribute('id', 'AEGequip_wrapper');
			equip_wrapper.setAttribute('style', 'position: absolute; top: 8px; left: 170px; -moz-user-select: none; padding: 0px; margin: 0px;');
			wear_group.parentNode.appendChild(equip_wrapper);
			
			// add 'store set' link to bottom of the "wear" element
			var store_set_link = document.createElement('a');
			store_set_link.setAttribute('href', '#');			
			store_set_link.setAttribute('title', 'Store equipped items as a set');
			store_set_link.setAttribute('onclick', 'AEG.storeSet(); return false;');
			store_set_link.textContent = 'Store set';
			equip_wrapper.appendChild(store_set_link);
			
			// add dropdown with 'equip' link
			var equip_dropdown = document.createElement('select');
			equip_dropdown.setAttribute('id', 'AEGequip_dropdown');
			equip_dropdown.setAttribute('style', 'width: 190px; max-width: 190px; margin: 0px 5px 0px 10px;');
			equip_dropdown.addEventListener('change', AEG.equip_dropdown_changed, false);
			equip_wrapper.appendChild(equip_dropdown);

			//add delete link
			var delete_link = document.createElement('a');
			delete_link.setAttribute('href', '#');
			delete_link.setAttribute('title', 'Delete selected set');
			delete_link.setAttribute('style', 'margin-right: 7px');
			delete_link.setAttribute('onclick', 'AEG.deleteSet(); return false;');
			delete_link.textContent = 'x';
			equip_wrapper.appendChild(delete_link);

			//add equip link
			var equip_link = document.createElement('a');
			equip_link.setAttribute('href', '#');
			equip_link.setAttribute('id', 'equip_link');
			equip_link.setAttribute('onclick', 'AEG.equip(); return false;');
			equip_link.textContent = 'Equip';
			equip_wrapper.appendChild(equip_link);
			
			// fill dropdown
			AEG.fillEquipDropdown();
		}
	}
	// fill the equip dropdown with entries; the The West Insider option, and all stored sets
	AEG.fillEquipDropdown = function() {
		var dropdown = document.getElementById('AEGequip_dropdown');
		// clear it
		dropdown.textContent = '';
		// add TWI entry
		addItem(dropdown, {'name': "WestInsider imported", 'value': "_TWIji", 'style': "font-weight: bold;"});
		// add WestCalc entry
		addItem(dropdown, {'name': "WestCalc imported", 'value': "_WCji", 'style': "font-weight: bold;"});
		// create separator
		var sepgroup = document.createElement('optgroup');
		sepgroup.setAttribute("label", "Select stored set :");
		sepgroup.setAttribute("style", "padding: 0px 5px 0px 3px; font-style: normal");
		dropdown.appendChild(sepgroup);
		//
		var sets = AEG.getSets();
		for ( set_name in sets ) {
			addItem(sepgroup, {'name': set_name, 'value': set_name});
		}
		
		function addItem(select, attr) {
			var option = document.createElement('option');
			option.textContent = attr.name;
			option.setAttribute('value', attr.value);
			if ( AEG.lastSelectedEquipDropdown !== undefined && AEG.lastSelectedEquipDropdown == attr.value ) {
				option.setAttribute('selected', 'selected');
			}
			if ( attr.style != undefined ) {
				option.setAttribute('style', attr.style);
			}
			select.appendChild(option);
		}
	}
	
	// Gathers the item IDs, called when clicked on the Equip link
	// Equip TWI job set, or stored set
	AEG.equip = function() {
		AEG.setEquipLinkText('Equipping'); //change link text so it's showing that it is busy
		// get items based on dropdown value
		var dropdown_value = document.getElementById('AEGequip_dropdown').value;
		switch ( dropdown_value ) {
			case '':
				new HumanMessage("No sets listed!");
			break;
			case '_TWIji':
				AEG.getEquipItems(); // get the array as stored from The West Insider, using GM_getValue, and stores it in AEG.equipItems
			break;
			case '_WCji':
				AEG.equipItems = AEG.getWCEquipItems();
			break;
			default:
				// get set by value
				AEG.equipItems = AEG.getSets()[dropdown_value];
		}
		
		// call next step with a delay (for the GM_getValue delay
		(function(){
			// store the item IDs first, 'carry' them later
			var equip_item_idstrings = new Object();
			if ( AEG.equipItems != undefined && AEG.equipItems.length > 0 ) {
				var equip_items_string = '|'+ AEG.equipItems.join('|') +'|';
				var equip_items_count = AEG.equipItems.length;
				// remove all items in the set that are already equipped
				var wearing_items = AEG.getCurrentSet();
				for ( ind=0; ind < wearing_items.length; ind++ ) {
					if ( equip_items_string.indexOf(wearing_items[ind]) > 0 ) {
						equip_items_string.replace(wearing_items[ind]+'|', '');
						equip_items_count--;
					}
				}
				var progress_dots = ''; // initiate with set size [minus already equipped amount] and remove one with every item equipped
				for ( ind=0; ind < equip_items_count; ind++ ) {
					progress_dots += '.';
				}
				AEG.setEquipLinkText('Equipping'+progress_dots);
				var bag = document.getElementById('bag');
				if ( bag != null ) {
					// go trough all items in the bag, store the IDs of the (first) matching items
					var items = bag.getElementsByClassName('bag_item_trader');
					for ( var ind=0; ind < items.length; ind++) {
						var bag_item = items[ind];
						var item_img = bag_item.getElementsByTagName('img')[0];
						var item_name = item_img.getAttribute('alt');
						if ( equip_items_string.indexOf(item_name+'|') >= 0 ) {
							// store equip item id
							equip_item_idstrings[bag_item.getAttribute('id').replace('item_', '')] = item_name;
							bag_item.setAttribute('style', 'background-color: red');
							// remove item from the list/string
							equip_items_string.replace(item_name+'|', '');
						} else {
							bag_item.removeAttribute('style');
						}
					}					
				} else {
					new HumanMessage("No item bag found!");
					AEG.setEquipLinkText('Equip'); //reset link text
				}
				// clear the (TWI) storage
				AEG.equipItems = null;
				//now equip them one by one with a delay between
				AEG.equipIDs(equip_item_idstrings);
			} else {
				new HumanMessage("No stored items found, click a Best Items link on The West Insider's Job Calculator!");
				AEG.setEquipLinkText('Equip');
			}
		}).delay(200); // delay because the GM_getValue wrapper is 'asynchronous'
	}
	// Gathers items from the elements the WestCalc script added to the game page
	AEG.getWCEquipItems = function() {
		var equipItems = [];
		var WCcont = document.getElementById('apotelesma');
		if ( WCcont !== undefined ) {
			var selects = WCcont.getElementsByTagName('select');
			for ( var selInd = 0; selInd < selects.length; selInd++ ) {
				// test whether it's the first one in the cell and get item name
				if ( selects[selInd].parentNode.getElementsByTagName('select')[0] == selects[selInd] ) {
					equipItems.push(selects[selInd].value);
				}
			}
		}
		return equipItems;
	}

	// separate function to equip the items, by item ID.
	AEG.equipIDs = function(item_idstrings, last_equip_item) {
		// check whether the item is still in the bag, we need to space apart the carry commands enough or they won't all execute
		if ( last_equip_item !== undefined ) { // first call last_equip_item is undefined, skip
			// look in the current set of items whether the last item we tried to equip is not equipped yet
			if ( ('|'+ AEG.getCurrentSet().join('|') +'|').indexOf(last_equip_item['string']+'|') < 0 ) {
				// it's still here, wait a bit longer
				(function(){AEG.equipIDs(item_idstrings, last_equip_item)}).delay(200);
				return;
			} else {
				// reduce dots, done here, so it is only removed when the item has really been equipped
				AEG.setEquipLinkTextDotReduced();
			}
		}
		var equip_item = {'id' : undefined, 'string' : undefined};
		// get and remove first item in the list
		for ( id in item_idstrings ) {
			equip_item['id'] = id;
			equip_item['string'] = item_idstrings[id];
			delete (item_idstrings[id]);
			break;
		}
		if ( equip_item['id'] !== undefined ) {
			Bag.getInstance().carry(equip_item['id']);
			(function(){AEG.equipIDs(item_idstrings, equip_item)}).delay(200);
		} else {
			AEG.setEquipLinkText('Equip');
		}
	}
	// set equip link text
	AEG.setEquipLinkText = function(text) {
		document.getElementById('equip_link').textContent = text;
	}
	// set equip link text with one period removed
	AEG.setEquipLinkTextDotReduced = function() {
		var text = document.getElementById('equip_link').textContent;
		document.getElementById('equip_link').textContent = text.substr(0, text.length-1);
	}
	// store equipped items as a set, prompt for name
	AEG.storeSet = function() {
		var set_items = AEG.getCurrentSet();
		var set_items_string = set_items.join(', ');
		var sets = AEG.getSets();
		var set_name = prompt("  Give a name for this set:\n"+ set_items_string);
		if ( set_name == null ) {
			return;
		}
		while ( sets[set_name] != undefined ) {
			if( !confirm("This set name is already in use, do you want to overwrite?") ) {
				var set_name = prompt("  Give a name for this set:\n"+ set_items_string);
				if ( set_name == null ) {
					return;
				}
			} else {
				break;
			}
		}
		sets[set_name] = set_items;
		localStorage.setItem('AEGitem_sets', JSON.stringify(sets));
		AEG.fillEquipDropdown();
	}
	// delete selected set, after confirmation
	AEG.deleteSet = function() {
		var dropdown_value = document.getElementById('AEGequip_dropdown').value;
		var dropdown_value = document.getElementById('AEGequip_dropdown').value;
		switch ( dropdown_value ) {
			case '':
				new HumanMessage("No set selected!");
			break;
			case '_TWIji':
				new HumanMessage("Cannot delete this entry!");
			break;
			default:
				if ( confirm('Do you really want to delete set "'+ dropdown_value +'"?') ) {
					var sets = JSON.parse(localStorage.getItem('AEGitem_sets'));
					sets[dropdown_value] = undefined;
					localStorage.setItem('AEGitem_sets', JSON.stringify(sets));
					AEG.fillEquipDropdown();
				}
		}
	}
	AEG.getCurrentSet = function() {
		var wear_imgs = document.querySelectorAll('#window_inventory_content > div:first-child img');
		var set_items = []; 
		for ( var ind = 0; ind < wear_imgs.length; ind++ ) {
			var img = wear_imgs[ind];
			// filter for non-empty slots, when an item is equipped it will have an (empty) title and style set
			if ( img.hasAttribute('title') ) {
				set_items.push(img.getAttribute('alt'));
			}
		}
		return set_items;
	}
	// get the sets from localStorage, or return an empty object
	AEG.getSets = function() {
		var sets = localStorage.getItem('AEGitem_sets');
		if ( sets == null ) {
			sets = {};
		} else {
			sets = JSON.parse(sets);
		}
		return sets;
	}

	// job store
	AEG.JobStore = {};
	// some initial hooking
	AEG.JobStore.init = function () {
		var header = document.querySelector('#head_title');
		header.addEventListener('click', AEG.JobStore.createJobList, false);
		header.setAttribute('style', 'cursor: pointer');
	}
	// show a popup list with all stored jobs
	AEG.JobStore.createJobList = function(event) {
		// remove previous opened job list in case it is still showing
		AEG.JobStore.hideJobList();
		
		var cont = document.createElement('div');
		cont.setAttribute('id', 'AEG_JobList');
		cont.setAttribute('style', 'position: absolute; left: 400px; top: 100px; border: 1px solid black; background: url("../images/main/chatbg.jpg") repeat scroll 0 0 transparent; z-index: 100; padding: 10px;');
		
		var div_close = document.createElement('div');
		div_close.setAttribute('style', 'background: url("/images/icons/cancel_small.png") repeat scroll 0 0 transparent; cursor: pointer; position: absolute; top: 7px; right: 7px; height: 22px; width: 22px');
		div_close.setAttribute('title', 'Close window');
		div_close.addEventListener('click',
									function(ev) {
										AEG.JobStore.hideJobList();
									},
									false);
		cont.appendChild(div_close);
		
		var header = document.createElement('h2');
		header.appendChild(document.createTextNode('Jobs shortcuts'));
		header.setAttribute('style', 'text-align: center');
		cont.appendChild(header);
		
		var table = document.createElement('table');
		var tbody = document.createElement('tbody');
		table.appendChild(tbody);
		
		var jobs = AEG.JobStore.getJobs();
		for ( j in jobs ) {
			var job = jobs[j];
			var tr = document.createElement('tr');
			var td_icon = document.createElement('td');
			td_icon.setAttribute('style', 'width: 80px; height: 70px;');
			
			var div_img = document.createElement('div');
			div_img.setAttribute('class', 'wb_task_icon');
//			div_img.setAttribute('title', 'Open job window');
			div_img.setAttribute('style', 'cursor: pointer; background-image: url("images/jobs/mini/'+ job.image +'");');
			(function() {
				var jx = job.x;
				var jy = job.y;
			div_img.addEventListener('click',
									function(ev) {
										AEG.JobStore.hideJobList();
										AjaxWindow.show('job', {x: jx, y: jy}, jx +"_"+ jy);
										ev.stopPropagation();
									},
									false);
			})();
			td_icon.appendChild(div_img);
			
			var div_walk = document.createElement('div');
			div_walk.setAttribute('class', 'wb_task_walk');
			div_walk.setAttribute('title', 'Scroll to job location');
			(function() {
				var jx = job.x;
				var jy = job.y;
				div_walk.addEventListener('click',
									function(ev) {
										AEG.JobStore.hideJobList;
										WMap.scroll_map_to_pos(jx, jy);
										ev.stopPropagation();
									},
									false);
			})();
			div_img.appendChild(div_walk);
			
			var div_del = document.createElement('div');
			div_del.setAttribute('class', 'wb_task_cancel');
			div_del.setAttribute('title', 'Remove the stored job');

			(function() {
				var jx = job.x;
				var jy = job.y;
				div_del.addEventListener('click',
									function(ev) {
										AEG.JobStore.deleteJob(jx, jy, event);
										ev.stopPropagation();
									},
									false);
			})();
			div_img.appendChild(div_del);
			
			var div_time = document.createElement('div');
			div_time.setAttribute('class', 'wb_task_timedisplay');
			div_time.setAttribute('style', 'background: url("/images/main/workbar_item_background.png") no-repeat scroll 0pt -20px transparent; width: 75px; height: 17px;');
			
			var seconds_to_time_string = {600 : "00:10:00",
										  1800 : "00:30:00",
										  3600 : "01:00:00",
										  7200 : "02:00:00"
										 };
			
			div_time.appendChild(document.createTextNode(seconds_to_time_string[Number(job.duration)]));
			div_img.appendChild(div_time);
			
			tr.appendChild(td_icon);
			
			/*
			var td_time= document.createElement('td');
			td_time.appendChild(document.createTextNode(job.duration));
			td_time.setAttribute('style', 'vertical-align: middle');
			tr.appendChild(td_time);
			*/
			
			var td_name = document.createElement('td');
			td_name.appendChild(document.createTextNode(job.name));
			td_name.setAttribute('style', 'vertical-align: middle');
			tr.appendChild(td_name);
			
			tbody.appendChild(tr);
		}
		cont.appendChild(table);
		event.target.parentNode.parentNode.appendChild(cont);
	}
	/*
	 * Hide the job list
	 */
	AEG.JobStore.hideJobList = function() {
		var jl = document.querySelector('#AEG_JobList');
		if ( jl != null ) {
			jl.parentNode.removeChild(jl);
		}
	}
	
	/* Return the stored jobs 
	 * Is stored as an associative array, with 'x_y' as key, with attributes 'length' (int, seconds), 'name' job name and 'image'  an image URL
	 */
	AEG.JobStore.getJobs = function() {
		var jobs = localStorage.getItem('AEGjobs');
		if ( jobs == null ) {
			jobs = {};
		} else {
			jobs = JSON.parse(jobs);
		}
		return jobs;
	}
	// Store the jobs object
	AEG.JobStore.saveJobs = function(jobs) {
		localStorage.setItem('AEGjobs', JSON.stringify(jobs));
	}
	/*
	 * Remove the stored job, specified by the game x,y coordinates.
	 * Only called from the job list, rebuild the list
	 * @event: the original event of opening the job list window
	 */	
	AEG.JobStore.deleteJob = function(x, y, event) {
		var jobs = AEG.JobStore.getJobs();
		jobs[x +'_'+ y] = undefined;
		AEG.JobStore.saveJobs(jobs);
		
		// rebuild the list
		AEG.JobStore.hideJobList();
		AEG.JobStore.createJobList(event);
	}
	// add a job automatically overwrites (only duration will change anyway)
	AEG.JobStore.addJob = function(x, y, duration, name, image) {
		var job = {'x': x,
				   'y': y,
				   'duration': duration,
				   'name': name,
				   'image': image};
		var jobs = AEG.JobStore.getJobs();
		jobs[x +'_'+ y] = job;
		AEG.JobStore.saveJobs(jobs);
	}
	/*
	 * When the Job window is opened, add a store button
	 */
	AEG.JobStore.insert = function(params) {
		// check whether content is loaded
		var job_start_button = document.getElementById('button_start_task_job_'+ params.x +'-'+ params.y);
		if ( job_start_button == null) {
			// try again later
			AEG.JobStore.insert.delay('500', this, params);
		} else {
			var job_window = document.getElementById('window_job_'+ params.x +'_'+ params.y);
			var time_select = job_window.querySelector('select');

			// default to selecting 2 hours for the job
			time_select.selectedIndex = 3;

			// if this job is stored, set the stored duration
			var jobs = AEG.JobStore.getJobs();
			var job = jobs[params.x +'_'+ params.y];
			if ( job !== undefined ) {
				// this job was stored, set the duration by looping trough the options keeping index
				var time_options = time_select.querySelectorAll('option');
				for ( opt_ind = 0; opt_ind < time_options.length; opt_ind++ ) {
					if ( Number(time_options[opt_ind].value) == Number(job.duration) ) {
						time_select.selectedIndex = opt_ind;
						break;
					}
				}
			}
			
			// add a job-store button
			var store_button = AEG.JobStore.createButton('Store');
			var job_title = job_window.querySelector('h2.circleTitle');
			var job_name = job_title.firstChild.nodeValue;
			var job_image = job_title.getAttribute('style').split('url(images/jobs/')[1].split(')')[0];

			store_button.addEventListener('click',
										  function(event) {
											 try {
												AEG.JobStore.addJob(params.x, params.y,
																 job_window.querySelector('select').value,
																 job_name,
																 job_image);
											 } catch (ex) { alert(ex) }
												event.stopPropagation();
										  },
										  false);
			job_start_button.parentNode.parentNode.insertBefore(store_button, job_start_button.parentNode);
		}
	}
	/*
	 * Create a button in the job window similar to the 'Start' button
	 */
	AEG.JobStore.createButton = function(string) {
		var cont_store_button = document.createElement('span');
		var store_button = document.createElement('span');
		var store_button_a = document.createElement('a');
		store_button_a.setAttribute('class', 'button_wrap button');
		store_button_a.setAttribute('href', '#');
		
		var store_button_a_left = document.createElement('span');
		store_button_a_left.setAttribute('class', 'button_left');
		var store_button_a_middle = document.createElement('span');
		store_button_a_middle.setAttribute('class', 'button_middle');
		store_button_a_middle.appendChild(document.createTextNode(string));
		var store_button_a_right = document.createElement('span');
		store_button_a_right.setAttribute('class', 'button_right');
		var store_button_a_clear = document.createElement('span');
		store_button_a_clear.setAttribute('style', 'clear: both;');

		store_button_a.appendChild(store_button_a_left);
		store_button_a.appendChild(store_button_a_middle);
		store_button_a.appendChild(store_button_a_right);
		store_button_a.appendChild(store_button_a_clear);
		
		store_button.appendChild(store_button_a);
		cont_store_button.appendChild(store_button);
		cont_store_button.setAttribute('style', 'float: left');
		
		return cont_store_button;
	}

	AEG.hotelSetDuration = function() {
		var table_rooms = document.querySelector('table.rooms');
		if ( table_rooms == null) {
			// try again later
			AEG.hotelSetDuration.delay('500');
		} else {
			table_rooms.getElementsByTagName('input')[4].checked = "checked";
		}
	}
	
	// override AjaxWindow.show to add call to addEquipLink to the Inventory button
	AjaxWindow._show = AjaxWindow.show;
	AjaxWindow.show = function(name,params,appendName,data) {
		this._show(name,params,appendName,data);
		switch ( name ) {
			case 'inventory':
				AEG.addEquipLink();
				break;
			case 'job':
				AEG.JobStore.insert(params);
				break;
			case 'building_hotel':
				AEG.hotelSetDuration();
		}
	}
	
	AEG.JobStore.init();
	
	AEG.addGlobalStyle = function(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) {return;}
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
} // end of TW_DOM_SCRIPT


/*
 * Script injected on The West Insider (job calculator)
 */
function JC_DOM_script() {
	var script = document.getElementsByTagName('head')[0].appendChild(document.createElement('script'));
	script.setAttribute('type', 'text/javascript');
	return script.textContent=JC_DOM_script.toString().replace(/[\s\S]*"\$1"\);([\s\S]*)}/,"$1");
	
	// column of 'Your Best Items'
	var best_items_column = 5;
	
	AEG.applyToTable = function() {
		var table_rows = document.getElementById('mainTableBody').getElementsByTagName('tr');

		for ( ind=0; ind < table_rows.length; ind++ ) {
			var best_items_cell = table_rows[ind].getElementsByTagName('td')[best_items_column];
			var anchor = document.createElement('a');
			anchor.setAttribute('href', '#');		
			anchor.setAttribute('style', 'color: #333333');
			anchor.setAttribute('title', 'Store items for auto equip in The West');
			anchor.setAttribute('onclick', 'AEG.itemsClick(this); return false;');
			anchor.innerHTML = best_items_cell.innerHTML;
			best_items_cell.textContent = '';
			best_items_cell.appendChild(anchor);
		}
	}

	// wait for the page's calcjobs script to complete
	AEG.applyToTableReadyWait = function() {
		// wait for the table and rows to be there
		if ( document.getElementById('mainTableBody') == null ||
			 document.getElementById('mainTableBody').getElementsByTagName('tr') == null ) {
			setTimeout(AEG.applyToTableReadyWait, 1000);
		} else {
			// then wait just a little bit longer to be 'sure' the table is completely loaded.
			setTimeout(AEG.applyToTable, 1000);
		}
	}
//	AEG.applyToTableReadyWait();
	AEG.applyToTable(); // all script is serverside again, can just start the function when the page is done loading

	// click handler, cleans up the string and stores it using GM_setValue
	AEG.itemsClick = function(best_items_cell) {
		try {
			var items_string = best_items_cell.textContent.replace(/[ ]+\[[0-9]+\]/g,'').replace(/, \([^\)]+\)/g,'');
			AEG.storeEquipItems(items_string);
			// create notifaction popup
			AEG.popupMessage("&nbsp;&nbsp;Stored<br /><br />"+ items_string +"<br /><br />&nbsp;&nbsp;for automatic equipment", "green");
		} catch (e) {
			alert(e);
		}
	}
	AEG.popupMessage = function(string, bgcolor) {
		if ( bgcolor == null ) {
			bgcolor = "red";
		}
		var popupContainer = document.createElement('div');
		popupContainer.setAttribute('id', 'AEGpopupMessage');
		popupContainer.setAttribute('style', 'position: relative; margin: 0 auto; width: 500px');
		var popup = document.createElement('div');
		popup.setAttribute('style', 'border: black 3px solid; background: '+ bgcolor +'; color: white; font: larger bold Arial,Verdana,sans-serif; padding: 20px; position: fixed; top: 200px; width: 490px;');
		popup.innerHTML = string;
		popupContainer.appendChild(popup);
		document.getElementsByTagName('body')[0].appendChild(popupContainer);
		window.setTimeout(function() {
			var popup = document.getElementById('AEGpopupMessage');
			if ( popup != null ) {
				popup.parentNode.removeChild(popup);
			}
		}, 2000);
	}
}

// include different code for the different sites
if ( location.href.indexOf('the-west.') >= 0 && location.href.indexOf('/game.php') >= 0 ) {
	TW_DOM_script();
} else if ( location.href.indexOf('thewestinsider.com/job_calc') >= 0 ) {
	JC_DOM_script();
}

// Work arounds to be able to use the GM_setValue functions in the normal code
unsafeWindow.AEG.storeEquipItems = function(items) {
try{
  window.setTimeout(function() {GM_setValue("TheWestInsiderEquipItems", items)}, 0);
  } catch(e) {
  alert(e);
  }
};
// Work arounds to be able to use the GM_getValue functions in the normal code. Note that this function is 'asynchronous',
//  so any following code has to be called with a delay, to have AEG.equipItems set.
unsafeWindow.AEG.getEquipItems = function() {
  window.setTimeout(function() {
	unsafeWindow.AEG.equipItems = GM_getValue("TheWestInsiderEquipItems").split(', ');
	}, 0
  );
};