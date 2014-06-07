// ==UserScript==
// @name		Auto Save Forms No Cookie
// @namespace	http://userscripts.org/scripts/show/25419
// @description	Saves form data every few seconds and gives option of repopulating form later.
// @include		*
// @author		private_lock@yahoo.com
// @version		2008-04-21
// ==/UserScript==

/*
Description:
Did you ever type in a long eMail into the webform of Yahoo, GMail or any other freemail-account? What about forum posts? You like to write long stories and you cannot restrict yourself to one-line-answeres?

*BANG!*

Firefox crashed! The window is frozen, it might even be possible to read, whats on the screen, but you cannot copy it! Or the window is gone completely alltogether with your hard work of the last hour?

How about an autosave function, the way you know and love it from your Office text processor (OpenOffice Writer, M$ Word)? This is exactly what this script is supposed to do: It will remember the latest version of your work right before the crash occured. You don't need to copy the text manually back and forth.

And you can easily press "submit" or "preview" without fear the server logged you off or crashes while processing your request. Just check, that the server really did not accept your post (to not duplicate your order), go back to the form, where you typed for hours and klick a link in the new red box in the upper right corner.

As long as the current form has not been changed, the sript will offer you any previous dataset, it can match to this site and form (NOTE: The script will never offer information dedicated to another site!). First you see the number of available datasets (often only 1) and the redo link. A click on redo will bring back the youngest and hopefully the last words you typed before the crash. If there was only one matching form, the box will hide, to not confuse you. Even though it's not visible, behind the scenes the script will update this entry to reflect all your changes while you go on working on it. It's like the crash never happend. You are right back and prepared for the next!

Sometimes you choose not to restore an old form and directly type ahead. The script will change the box to allow you to browse between these alternatives. Click on '<' or '>' to navigate. This browse cycle is always sorted for time of last modification. So if you change a dataset, it will jump to entry 1 of the list, shifting the others back. This even works between multiple tabs/windows. (Please allow up to a minute for all forms to synchronize their browse cycle order.)

WARNING: The undo-buffer cannot be restored. Therefore Ctrl+Z will partly undo your last browse action and immediately overwrite the backup, leaving you with two copies of the same content for this textbox.

The current entry number in the browse cycle is followed by an exclamation mark! This is a link to delete this dataset from memory. If you click it, the form will not change. Only the internal copy is removed. If you change or submit the form, a fresh internal copy is newly created. Otherwise you can choose to redo another entry by browsing through the remaining.

WARNING: It is by design prohibited to delete the last entry. This is a required feature, to rectify it being an autosafe. If you enter confident information, it will reside unencrypted within the configuration data of your browser, until it expires (7 days by default). To overcome this, you should either:

1. Add that website to the excludes of this script, to never save a form from there.
2. Temporarily deactivate this script or greasemonkey itself BEFORE you load the form.
3. Workaround:
	- Come back to the form after transmission.
	- Click on redo and browse until you see the confident data.
	- Manually delete it from the textbox.
	- The script will synchronize the form with the saved entry and also delete those contents!
4. Workaround:
	- Type "about:config" into the location bar and press Enter.
	- Start type "Auto Save Forms No Cookie" into the search filter.
	- Select any offending entries from the list.
	- Rightclick and reset the value.

The methods 1 and 2 are strongly recommended. The workarounds 3 and 4 only repair the damage, after it has been done. You could easily forget about it. In addition information written to a harddrive is not neccassarily gone by simply marking that space as "free".

Inspired by "Auto Save Forms" from Dave Child available at http://userscripts.org/scripts/show/1525

Features of the old script:
- Save content of all textareas and all text-input elements on a website for reuse
- Never save passwords (currently all other input elements are left alone)
- Each entry expires and is strictly associated to a website
- Save entry automatically while typing

Problems of the old script:
- Only a single record for a whole domain
- Potentially large amounts of data by unlimited number of extra-cookies
- Interferes with Cookieculler -> data lost

Additional features of my rewritten script:
- Keep the values in a pool of greasemonkey variables
	-> Safer (the server cannot see the data until you post it)
	-> More persistent (you can empty your cookies on a regular basis without loosing your saved forms)
	-> Better control (just use about:config, and filter for "Auto Save Forms No Cookie")
- The time till expiry is userdefinable -> about:config (default 7 days)
- The pool will automatically adjust its size (grow and shrink as needed)
- Browse through any matching forms ("browse cycle")
	-> Independent forms (on other website or of differing number of textboxes) have independent browse cycles
	-> Matching forms from the same website share a "browse cycle"
- Periodically scan the pool for new matching entries (once a minute)
	-> This way you can easily copy forms from other tabs/windows
- Sort "browse cycle" for age
	-> The youngest item will jump to position one
	-> If two or more forms of the same browse cycle are modified, they will compete to be the number one
	-> If you don't change an item (don't type on keyboard), it will keep its date of expiry
- Manually delete old data (until only a single entry is left for this form as you see and edit it)
- Intelligent collision detection -> switch to another entry
- Recognize if a website already contains the contents of an entry
	-> Facilitates previews of forum posts
	-> Reduces the number of similar entries
- Fixed placement relative to window, to easily browse datasets in long scrolled forms

History
2008-04-20 Initial version
2008-04-21 Textual description, recognize previous, fixed placement

Ideas for future changes:
- Keyboard navigation - Tab focusable
- Minimal length of text to enter before save
- Monitor DOMaddNode and DOMremoveNode to trigger a rescan
- Option to exclude single word search boxes (found too often, to be useful)
- Config and help screen
- Size, position & style
- Writeprotected permanent entries
- Exclude content of disabled and readonly textboxes??? Licence data junk?
- really browse the pool contents and show each entry in full text.
*/

(function() {

	var keyNumber		= "numberOfEntries";
	var numberOfEntries	= 20;
	var keyExpire		= "daysTillExpiry";
	var daysTillExpiry	= 7;
	var keyEntryPrefix	= "entry";
	var keySeparator	= "|";

	var inputs, textareas;		// the text elements to save

	// every entry has to conform to this regular expression
	var parser = /^expires=([0-9]+); itf=([0-9]+),([0-9]+),([0-9]+); from=([^;]*); content=([^;]+);$/;

	var currentIndex = -1;		// remember the current index
	var view = -1;
	var lastSave = -1;			// remember the last time stamp as a fingerprint

	var saving;					// Timer to wait half a second after last typed event
	var scanner;

	var domainName;

	// @param myIndex Identify the entry to load from the pool of variables.
	// @return Null or a record of {myIndex, expiry, i, t, f, from, content}
	function loadData(myIndex) {
		var key = keyEntryPrefix + myIndex;
		var result = GM_getValue(key, null);
		if (!result)
			return null;
		result = parser.exec(result);
		if (!result
		|| result.length!=7					// invalid entry
		|| (result[1] = parseInt(result[1])) < new Date().getTime()	// expired entry
		) {
			GM_setValue(key, "");			// -> delete it
			return null;
		}
		result[0] = myIndex;				// we don't need the raw entry, but we keep a reference to its place
		// result[1]	-> time of expiry was already parsed
		result[2] = parseInt(result[2]);	// number of inputs
		result[3] = parseInt(result[3]);	// number of textareas
		result[4] = parseInt(result[4]);	// number of forms
		// result[5]	-> keep the domain name untouched
		// result[6]	-> keep the content untouched
		return result;
	}

	// relocate the position to save to
	function findFreeEntry() {
		lastSave = -1;
		var hot = new Date().getTime() + (daysTillExpiry * 24 - 1) * 60 * 60 * 1000;
		var shortest = -1, minLength = Number.MAX_VALUE;
		var oldest   = -1, minTime   = hot;
		for (i=0; i<numberOfEntries; i++) {
			var result = loadData(i);
			if (result) {
				if (result[1] < minTime) {
					oldest    = i;
					minTime   = result[1];
				}
				if (result[6].length < minLength && result[1]<hot) {
					shortest  = i;	// only, if older than 1 hour
					minLength = result[6].length;
				}
			} else {
				currentIndex = i;
				return;
			}
		}
		if (shortest>=0 && (oldest<0 || minLength<100))
			currentIndex = shortest;
		else if (oldest>=0)
			currentIndex = oldest;
		else {
			// The pool is to small, to keep up with the users needs.
			// All entries have been touched within the last hour.
			currentIndex = numberOfEntries;
			GM_setValue(keyNumber, numberOfEntries += 10);
		}
	}

	function validityCheck(result) {
		if (result
		&& result[2]==inputs        .length
		&& result[3]==textareas     .length
		&& result[4]==document.forms.length
		&& result[5]==domainName
		) return true;
		return false;
	}

	function encodeData() {
		var elem = new Array();
		for (i=0; i < inputs   .length; i++)
			elem.push(encodeURI(inputs   [i].value.toString()));
		for (i=0; i < textareas.length; i++)
			elem.push(encodeURI(textareas[i].value.toString()));
		return elem.join(keySeparator);
	}

	function saveData() {
		if (saving)
			clearInterval(saving);
		saving = null;

		// check to see, if this entry was overwritten since the last save.
		var expire;
		if (0<=lastSave) {
			var result = loadData(currentIndex);
			if (validityCheck(result) && result[1]==lastSave)
				return;					// nothing to save
			else {
				currentIndex = -1;		// take a fresh variable
				expire = lastSave;		// no new content, just a new place to save to
			}
		} else
			expire = new Date().getTime() + daysTillExpiry * 24 * 60 * 60 * 1000;

		var val = "expires="+expire
				+"; itf="+inputs.length+","+textareas.length+","+document.forms.length
				+"; from="+domainName
				+"; content="+encodeData()+";";

		var force;
		if (currentIndex<0 || numberOfEntries<=currentIndex) {
			findFreeEntry();
			force = true;				// on escape to another variable, the total number of entries is likely to change
		} else
			force = (view!=0 && expire!=lastSave); // because expire should be the latest, rescan to sort the entries
		var key = keyEntryPrefix + currentIndex;

// GM_log(view+" "+force+" "+lastSave+" "+key+" =\n"+val);
		GM_setValue(key, val);
		lastSave = expire;

		if (force) {
			if (scanner)
				clearInterval(scanner);	// stop the scanner and synchronously rescan
			rescan();
			scanner = setInterval(rescan, 60 * 1000);
		}
	}

	function prepareSave(evt) {
		evt = evt || window.event;
		var	key = evt.which || evt.keyCode;
// GM_log(key);
		// skip tab shift ctrl alt caps & cursor movement
		if (9==key || 16<=key && key<=18 || 20==key || 33<=key && key<=40)
			return;
		lastSave = -1;					// force a save
		if (saving)
			clearInterval(saving);
		saving = setInterval(saveData, 500);
	}

	// ========================================

	var browseCycle = new Array();

	function collectBrowseCycle() {
		var freeEntries = 0, tail = 0;
		browseCycle.splice(0, browseCycle.length);	// empty list
		for (i=0; i<numberOfEntries; i++) {
			var result = loadData(i);
			if (!result) {
				freeEntries++;
				tail++;
			} else {
				tail = 0
				if (validityCheck(result)) {
					var append = true;
					for (j=0; j<browseCycle.length; j++)
						if (browseCycle[j][1]<result[1]) {		// sort youngest first -> fast recover after crash
							browseCycle.splice(j, 0, result);
							append = false;
							break;
						}
					if (append)
						browseCycle.push(result);
				}
			}
		}
		tail = Math.min(tail, numberOfEntries-20);	// always keep 20 values
		tail = Math.min(tail, 10);					// don't take away more than 10 at a time
		if (0<tail && freeEntries<numberOfEntries/2)// loadfactor below 50 %
			GM_setValue(keyNumber, numberOfEntries-=tail);
// GM_log("collect: "+currentIndex+" in\n"+browseCycle.join("\n"));
	}

	var box;

	function viewNext(offset) {
		if (currentIndex<0 || numberOfEntries<=currentIndex)
			view = 0;
		else {
			for (i=0; i<browseCycle.length; i++)
				if (currentIndex==browseCycle[i][0]) {
					view = i;
					break;
				}
			view = (view+offset) % browseCycle.length;
		}
		currentIndex = browseCycle[view][0];
	}

	function repopulate(offset) {
		var count = 0;
		var result;
		do {
			viewNext(offset);
			result = loadData(currentIndex);
		} while (!validityCheck(result) && ++count<browseCycle.length);

		if (validityCheck(result)) {
			var elem = result[6].split(keySeparator);
			if (elem.length==inputs.length+textareas.length) {
				for (i=0; i<inputs   .length; i++)
					inputs   [i].value = decodeURI(elem[i              ]);
				for (i=0; i<textareas.length; i++)
					textareas[i].value = decodeURI(elem[i+inputs.length]);
				currentIndex = result[0];
				lastSave = result[1];		// avoid an immediate save
			} else
				count = 2;
		}

		if (1<count)
			rescan();
		else
			offer_repopulate();
	}

	function backwards() {
		repopulate(browseCycle.length-1);
	}

	function forwards() {
		repopulate(                   1);
	}

	function deleteCurrent() {
		if (currentIndex<0 || numberOfEntries<=currentIndex)
			return;
		GM_setValue(keyEntryPrefix+currentIndex, "");
		currentIndex = -1;
		view = -1;
		rescan();
	}

	var prev, kill, from, next;

	function offer_repopulate() {
		if (0<=currentIndex && currentIndex<numberOfEntries) {
			viewNext(0);
			saveData();		// regularly save data even, if unchanged; maybe the variable was reused for another form
		} else {			// otherwise check, if the defaults match an entry
			var enc = encodeData();
			for (i=0; i<browseCycle.length; i++)
				if (enc == browseCycle[i][6]) {
					currentIndex = browseCycle[i][0];
					view = i;
					break;
				}
		}

		if (browseCycle.length==0 || browseCycle.length==1 && currentIndex==browseCycle[0][0]) {
			if (box)
				box.setAttribute("style", "visibility: hidden");
			return;
		}

		// Found a matching entry. Write offer to repopulate the page.
		if (!box) {
			box  = document.createElement ("div" );
			// in default focus cycle, the browse box directly follows the last textarea
			if (textareas.length>0)
				next = textareas[textareas.length-1];
			else
				next = inputs   [   inputs.length-1];
			next.parentNode.insertBefore(box, next.nextSibling);

			prev = document.createElement ("a");
			kill = document.createElement ("a");
			from = document.createTextNode("" );
			next = document.createElement ("a");
			prev.appendChild(document.createTextNode(""));
			kill.appendChild(document.createTextNode(""));
			next.appendChild(document.createTextNode(""));
			box .appendChild(prev);
			box .appendChild(document.createTextNode(" "));
			box .appendChild(kill);
			box .appendChild(from);
			box .appendChild(next);
			prev.setAttribute("title", "Repopulate form with previous!");
			kill.setAttribute("title", "Delete this entry!");
			next.setAttribute("title", "Repopulate form with next!");

// 			prev.setAttribute("href", "javascript:backwards()"    );
// 			kill.setAttribute("href", "javascript:deleteCurrent()");
// 			next.setAttribute("href", "javascript:forwards()"     );

			prev.setAttribute("style", "cursor: pointer; text-decoration: underline;");
			kill.setAttribute("style", "cursor: pointer; text-decoration: underline;");
			next.setAttribute("style", "cursor: pointer; text-decoration: underline;");
			prev.addEventListener("click", backwards    , false);
			kill.addEventListener("click", deleteCurrent, false);
			next.addEventListener("click", forwards     , false);
		}
		box.setAttribute("style",
			"position: fixed; " +
			  "top: 20px; " +
			"right: 20px; " +
			"background-color: #fee; " +
					   "color: #f00; " +
			"border: 1px solid #f00; " +
			"padding: 3px 8px;");
		if (view<0) {
			prev.firstChild.data = "";
			kill.firstChild.data = "";
			from           .data =        browseCycle.length+" ";
			next.firstChild.data = "redo";
		} else {
			prev.firstChild.data = "<";
			kill.firstChild.data = (view+1)+"!";
			from           .data = " of "+browseCycle.length+" ";
			next.firstChild.data = ">";
		}
	}

	// ========================================

	var listening = new Array();

	function listenTo(element, isForm) {
		// search if we are already listening to this element
		for (i=0; i<listening.length; i++)
			if (listening[i]==element)
				return;
		if (isForm)
			element.addEventListener("submit", saveData,    false);
		else
			element.addEventListener("keyup" , prepareSave, false);
		listening.push(element);
	}

	function rescan() {
		var localInputs    = document.getElementsByTagName("input");
		var localTextareas = document.getElementsByTagName("textarea");

		// Strip inputs down to just text inputs
		var temp = new Array();
		for (i=0; i<localInputs.length; i++)
			if (localInputs[i].type == "text")
				temp.push(localInputs[i]);
		localInputs = temp;
		temp = null;

		// stop any scheduled save actions
		if (saving)
			clearInterval(saving);
		saving = null;

		// only continue, if there are texts to save on this page
		if (localInputs.length + localTextareas.length == 0) {
			inputs    = localInputs;
			textareas = localTextareas;
			if (scanner)
				clearInterval(scanner);
			scanner = null; // setInterval(rescan, 15 * 60 * 1000);
			browseCycle.splice(0, browseCycle.length);
			offer_repopulate();	// remove redo offer
			return;
		}

		temp = window.location.hostname.toLowerCase();

		if (  inputs && localInputs   .length!=   inputs.length
		|| textareas && localTextareas.length!=textareas.length
		|| temp != domainName
		) currentIndex = -1;

		domainName = temp;
		inputs     = localInputs;
		textareas  = localTextareas;

		// redetermine the numberOfEntries and the daysTillExpiry
		temp = GM_getValue(keyNumber, 0);
		if (temp<1)
			GM_setValue(keyNumber, numberOfEntries);
		else
			numberOfEntries = temp;

		temp = GM_getValue(keyExpire, 0);
		if (temp<1)
			GM_setValue(keyExpire, daysTillExpiry);
		else
			daysTillExpiry = temp;

		collectBrowseCycle();
		offer_repopulate();

		// try to register the listeners
		for (i=0; i< inputs        .length; i++)
			listenTo(inputs        [i], false);
		for (i=0; i< textareas     .length; i++)
			listenTo(textareas     [i], false);
		for (i=0; i< document.forms.length; i++)
			listenTo(document.forms[i], true );

/*GM_log("rescan:"
+" expire="+(new Date().getTime() + daysTillExpiry * 24 * 60 * 60 * 1000)+"ms"
+" last="+lastSave+"ms"
+" itf="+inputs.length+","+textareas.length+","+document.forms.length+"="+listening.length
+" ci="+currentIndex
+" view="+view
+" d="+domainName+";");*/
	}

	window.addEventListener("load", function() {
		// first rescan on load
		rescan();
		// rescan once a minute
		scanner = setInterval(rescan, 60 * 1000);
	}, false);

})();
