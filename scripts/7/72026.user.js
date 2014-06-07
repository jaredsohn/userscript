// ==UserScript==
// @name           GhostTrappersHuntingDog_public.user.js
// @namespace      http://localhost/
// @description    More obvious annunciators (counter in page title, background color change, and (optionally) playing a sound) when GhostTrappers "Let's hunt" becomes active (http://apps.facebook.com/ghost-trappers/)
// @include        http://apps.facebook.com/ghost-trappers/
// @include        http://apps.facebook.com/ghost-trappers/?fb_dash_section=my_recent
// @include        http://apps.facebook.com/ghost-trappers/index.php*
// ==/UserScript==

// Adds stuff to make "Let's hunt" easier to notice...
//
//   Puts the counter in the page title so it is visible when the tab isn't open
//   When "Let's hunt" becomes active...
//     Changes the page icon (favicon)
//     Changes the page background color (to red by default) 
//     Plays a sound (optionally) (bark-bark by default)
//     Plays a beep-tune (optionally) via the computer speaker (doesn't work in Chrome)
//
// The ghost puppy (top right corner) is a button to hide/show the options menu
//
// There are a lot of variables up front in the code which can be modified to change behaviour, have fun
//
// disclaimers:
// I don't think this violates the GhostTrappers TOS, but will not swear to it.
// Embedded images should not be used outside a GhostTrappers context.
// The "bark-bark" sound is from http://www.partnersinrhyme.com/soundfx/dogsounds.shtml
//
// PLEASE DON'T MODIFY THIS CODE TO VIOLATE THE TOS (AKA CHEAT)
//
// Changelog: 
//   Added a popup when bait drops below 4 bottles
//   
// Just to be extra careful...
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.


//// User adjustable options /////////////////////////////////////////////////

// amount of bait <= this will popup a warning
window.GTDog_low_bait_warning_level = 3;

// page background colors 
window.GTDog_wait_background_color = 'gray'; // when waiting
window.GTDog_hunt_background_color = 'red';  // when ready to hunt

// page titles to use ("animated" is array of strings to cycle through)
window.GTDog_hunt_title_fixed = "LET'S HUNT!";
window.GTDog_hunt_title_animated = [ 'HUNT!', 
	                                   'HUNT! *woof*' ];
window.GTDog_title_animate_speed = 500; // in ms

// beep sequence to use (each value is a delay between notes, >0 at end will loop)
// only works for Firefox+Greasemonkey AFAIK
window.GTDog_beepTune_sequence = [6, 6, 2, 6, 6, 2, 6, 2, 6, 2, 100];
// how often bark sound (not beep) is optionally repeated (in ms) 
window.GTDog_repeat_sound_interval = 30*1000; 

// icon/image used as the main button (opens and closes option window)
//window.GTDog_main_icon_href = 'http://localhost/GTDog_main_icon.png';

// icons and sounds to use (file:///whatever or http://whatever or data:image...)
   // if these are commented out, we will use defaults embedded below
//window.GTDog_sound_href = 'http://localhost/GTDog/bark.wav';
//window.GTDog_wait_favicon_href = 'http://localhost/GTDog_icon_wait.gif'; 
//window.GTDog_hunt_favicon_href = 'http://localhost/GTDog_icon_hunt.gif';


//// Done with use defined parameters //////////////////////////////////////
// probably don't want to change anything below ///////////////////////////


//// Embedded data ... images, favicons, and maybe sounds (don't work on my browser... so no)
// greyscale icon (wait)
var GTDog_wait_icon_img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAAXNSR0IArs4c6QAAAetJREFUKM91UrvOaUEU/mb2RSK2QogQcYtC4gkUClFodB6ARiceQLVfQa11iVY8AQm9SAgSQkMk7hSTbeYUc/79y0nOV0wmk7W+y5pFFovF4/EYDAY+ny8UCrlcrsVicTqdAAAoFAqGYeALZLVatVqtYrEYjUaFEKqqappmWdZ4PB6NRrqu5/N5QoisdrvddLlcAohEIpxzTdNUVQWg63oulyuVSoyx2WwmfgCAbjYbwzAIIZRSSikAmy8Wi2Uymc1mY/tRVZXebje/3y8JptPp6/UCsN/vTdNsNpvZbBbAfD4nhEgiyhjzeDxCiF6vNxwOG40GY6zT6ZTL5XA4TClNJBK73e5XBIDP5yOE3O/3Wq0mhKCU1ut1ANFoFEAgEFiv14qiABBCUADBYBBApVLhnEuj33NMJpMApFUANJFIOJ1OSSyfVquVvJimCcDr9X5PQs1ms7JUnoqitNvtdDodj8dlhcPh0HX9crkYhvH5fKjL5ZJ15AemaU4mk3a7Xa1WZU84HJ7P57+hKaWywdaRZr5jrNfrvxlsekVR/olrI5VKAej3+/f7ndxuN03TpMj/Gt7v9/F47Ha7jDFyvV7tFZI69rgkOOfP51Ma3m639Hw+c84553I7LMuSvyHBGHs+n4PB4HA4yPR/AAa53/0CJbWDAAAAAElFTkSuQmCC";
// let's hunt icon
var GTDog_hunt_icon_img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAAXNSR0IArs4c6QAAAkdJREFUKM9tks9LW0EQx7+7s++FbJ5poE+xNjG5pIIlh1LBhEqp4CUnYymlImIORbyICP4BxdKroGcVeqqgLejFo1KCMYeWag9pba1Vg4KhmPThjxj3vR6eirQd9jCzM5/5zi7Dljs69i2rO5e7Hwg8DYWihvEqn/9QKgEA8Ka19VZNDa4Ze59MPlxc/Dg4GEmnHaWE3+8xTef8fLGr63E26yOaicc1zt1qaRh8fnMTQLi316lWddPUAwEAQspUJvN1bOxIqcmtLQdwDwC+fHAQlpIRMU0jXQfAidx+0aGhd4nE/N7e1Tzk9fIvlvWottZRihGtjYxY+TyA3dlZTpQKBjuXlgDM7OwIxgRjAPiRUg9ME7bdl0w+W1ioa2+vHB7G+vt/TE31RiJM0/rC4blC4UpEAIhFo+B8rVz+tr+vTk7I47HOzgBE0mkAnQ0Nr7e3udve4+EA6pNJAJ9WVs4tC4Dw+6//472BAQC7x8duyPvCYV9jI2ybCeFefZ+YuMgRAbidSl3n+YvRUfJ6AbiAkPLO8PDbtrYrTBiGj+hzufy7WrUrFeFvagJAhsF1nQnBdd1WihMhmy1mMi7zJBicKxTaTBMAB8A0jaTkQrg+AFspW6mbiYQLDMTj25dvYL9WV0UgIKQkKTXDcIG/rFIseuvrfUSTLS0cnHNdZ5xzov9WAzgrlTbGxwF053IXCu4KMSH+FXGq1dL6OiNiQvycnqbnsZgvEuFCwHEAqNNT0nV2uU6VYtHa2HjZ03O3rk6GQjeam/8AU6zFWII9umYAAAAASUVORK5CYII=";
// icon/image used as the main button (opens and closes option window)
var GTDog_main_icon_img = "data:image/png;base64,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";

// "bark bark" sounds
var GTDog_bark_sound = "data:audio/x-wav;base64,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VGh5g4+SlZ2jrLm3uaydkYiBfHRnXVBKR0lVYWx1d3yBj52rt729vK+gjnlpY1hYU1BUWmdqa2lsdoebrrq8uK2dkIB6eHZ0aWViZnF6endrZmZyfI2Tm5qZm6CjoZ2Nfm5gXFtfZGRlZWdxe4WQlpqbmJqVkpSPjoR6bmZiXmJjX2JhaXaCkZibmY2GfH+Mna+vppB3bGNnaGNgVEtQVXKMpLKql4l8gYmVmJmRiH90bGRgXl1VUElOXmyDlaOvt7e2rKCTiX99fX+Bf3NkU0pLTVxjbXqCkJidn6CmqqmijoBuaWVpcnR0b2RbWFtqeYiLjYiNkqCtsrCmmYd7bGZdVU9ISFFfcHZ7fHqAh5Kdqa6yrqKbkJCNiX1pTjs1OUpYZGtscnyMm6u1urmuopKDeXN1eXVsXk5HR0taZG14f4mWnqWnqq6ysa6ahm9dVFNbYWhlXllXW2h0go+ep7K3tLCimIt/eXVwc3BuZ1tTSUpOXm2Aj5yjqayrpJ+ShntxbGdqa3B2dnNsY15hanaFkJqgo6Kclo2FfnZyb3BxcXFubmtvc3iCiJCWlZKMhYOFiouIgnhzcG5taGVhZG18h4+Mh4GEjZmiop2Qfnp0eHt7eXBoZGNsc31/gYGBgoSJjY+OkI2QkY2Lg3lwa2tucG9vcXV9iIyQjYyPkJOWkY2Ff3t7eHl3b2pjYmdtdXyBg4OFiZCUl5eTjoqIiY+Nh3hqXVtianV8fXx4en2HkZiXlI+NjY6LgnZqYmVseYCEfXhubG93goySk5CNjZCXmZqOgXFoZmlxdnp6e3d2dXh+hY2NjYiGh4yOj42HgoB6eXp8gYSBem9rb3uJk5KLgHl3fIGHhIB6dnV4fYOHiIV/fXx+gYKCgYGCgIB+fX2AhISEiImWo6+4t7anlot7c2hcTTgtLjM7Q0BDTFx9n8LZ5Orp5uXd0bmWdVZGRD8+NzAzPlNpfYiQk5agoqWgmI2JhoN7eHh2dW9tZFpXQDEtKS07R2WTvOTw4tjU1uLbv6SGe3tsYFJCQUNJVVNMRz1CUlhmaWNtdIGjxeT269HBxeT537NvPDg8Sz8fDAscPFFbaHGFpsTh5eHOu6yUe2FWWmBiYldNPjUwKi0zOklnjLvn9PndzcG4uJ6CZVdTWVhQQzk3NztCSmWFrdLm9PLl1rucgGhfXVtbT0hEQ0RM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";

//// use embeded (data base64) images and sounds if none are specified above
if( !window.GTDog_wait_favicon_href ){ window.GTDog_wait_favicon_href = GTDog_wait_icon_img; }
if( !window.GTDog_hunt_favicon_href ){ window.GTDog_hunt_favicon_href = GTDog_hunt_icon_img; }
if( !window.GTDog_sound_href ){ window.GTDog_sound_href = GTDog_bark_sound; }
if( !window.GTDog_main_icon_href ){ window.GTDog_main_icon_href = GTDog_main_icon_img; }

//// global variables we need
// refrences to page elements (assigned on init)
window.GTDog_topHuntTD_minutes_div = null;
window.GTDog_topHuntTD_seconds_div = null;
// persistent variable accessor (for options) 
LS = new persistentLocalStorage;
// state variables (assign defaults up front for clarity)
window.GTDog_beepTune_instance = new beepTune(window.GTDog_beepTune_sequence, 100);
window.GTDog_showing_hunt = false; // state flag
window.GTDog_title_state = 0; // state variable for title (in case we are animating)


//// Intialization of the page 
window.GTDogInitFunction = function() {
	// set background (good to know that script is running)
	document.body.style.background = window.GTDog_wait_background_color;

	//// div containing button/icon and options
	var oDiv = document.createElement('div'); 
	oDiv.id = 'GTDogOptionsButtonDiv';
	oDiv.innerHTML = "";
	oDiv.innerHTML += '<div style="overflow:auto; width:100%">';
	oDiv.innerHTML += '<img src="'+window.GTDog_main_icon_href+'" style="cursor:pointer; float:right; background-color:red; border:solid black 2px;" id="GTDogToggleOptionsButton"></div>';
	oDiv.innerHTML += '<div style="overflow:auto; width:100%"></div>';
	oDiv.style.padding = "0px";
	oDiv.style.position = "fixed";
	oDiv.style.top = "0px";
	oDiv.style.right = "0px";
	oDiv.style.zIndex = 100; // absurdly high zIndex to ensure it is on top
	oDiv.style.visibility = 'visible';
	var top_options_div = oDiv;
	document.body.appendChild(oDiv);
	// Actual options div
	oDiv = document.createElement('div'); 
	oDiv.id = 'GTDogOptionsDiv';
	oDiv.innerHTML = "";
	oDiv.style.border = "solid black 2px";
	oDiv.style.padding = "5px";
	oDiv.style.background = "lightgray";
	oDiv.style.position = "relative";
	oDiv.style.top = "-2px";
	oDiv.style.visibility = 'hidden'; // start hidden
	top_options_div.appendChild(oDiv);
	// add click handler to button/icon
	var el = document.getElementById('GTDogToggleOptionsButton');
	el.addEventListener('click',window.GTDogToggleOptionsVisibility,false);

	// empty span to play the bark sound 
	var oSpan = document.createElement('span'); 
	oSpan.id = "GTDogSoundSpan";
	document.body.appendChild(oSpan);

	// div for popups
	oDiv = document.createElement('div'); 
	oDiv.id = 'GTDogPopupDiv';
	oDiv.innerHTML = "<h1>POPUP DIV</h1>";
	oDiv.style.position = "fixed";
	oDiv.style.width = "50%";
	oDiv.style.padding = "12px";
	oDiv.style.border = "ridge black 4px";
	oDiv.style.background = "yellow";
	oDiv.style.top = "0px";
	oDiv.style.left = "0px";
	oDiv.style.zIndex = 110; // absurdly high zIndex to ensure it is on top
	oDiv.style.visibility = 'hidden';
	document.body.appendChild(oDiv);

	// Set default options if needed (false is default)
	if( LS.getItem('GTDogOptions_div_open') == undefined ){
		LS.setItem('GTDogOptions_div_open',true);
	}
	if( !LS.getItem('GTDogOptions_title_animate') ){
		LS.setItem('GTDogOptions_title_animate',false);
	}
	if( !LS.getItem('GTDogOptions_play_beep') ){
		LS.setItem('GTDogOptions_play_beep',false);
	}
	if( !LS.getItem('GTDogOptions_loop_beep') ){
		LS.setItem('GTDogOptions_loop_beep',false);
	}
	if( !LS.getItem('GTDogOptions_play_sound') ){
		LS.setItem('GTDogOptions_play_sound',false);
	}
	if( !LS.getItem('GTDogOptions_repeat_sound') ){
		LS.setItem('GTDogOptions_repeat_sound',false);
	}
	if( !LS.getItem('GTDogOptions_loop_sound') ){
		LS.setItem('GTDogOptions_loop_sound',false);
	}

	// Favicon default is wait
	favicon.change(window.GTDog_wait_favicon_href);

	// fill in the options div html (and attach listeners)
	window.GTDogInitOptionsDiv();
	// open options div (if it was open before)
	if( LS.getItem('GTDogOptions_div_open') ){ 
		document.getElementById('GTDogOptionsDiv').style.visibility = 'visible';
	}

	// check if the "let's hunt" link has been added alread
	if( window.GTDogCheckHuntOn() ){
		// already "hunt on", so all done 
	}else{

		//// find the page elements we need ... also checks if hunt is on already triggers annunciations
		//   save them to variables (for speed)

		// the actual divs containing the topTimer values
		// get minutes part
		var allEl = document.evaluate('//*[@id="app51157989152_topminutesdiv"]',
					document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		if( allEl.snapshotLength > 0 ){
			window.GTDog_topHuntTD_minutes_div = allEl.snapshotItem(0);
		}
		// get seconds part
		allEl = document.evaluate('//*[@id="app51157989152_topsecondsdiv"]',
					document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		if( allEl.snapshotLength > 0 ){
			window.GTDog_topHuntTD_seconds_div = allEl.snapshotItem(0);
		}
	
		// check for error (if the timer isn't there)
		if( window.GTDog_topHuntTD_minutes_div == null || window.GTDog_topHuntTD_seconds_div == null ){
			// ---- Already on hunt or broken ----
			document.body.style.background = 'yellow';
			document.title= '?? GTDog BROKEN ??';
	
		}else{ // timer is there
			//// add event listeners to the topHuntTD_seconds_div 
			window.GTDog_topHuntTD_seconds_div.addEventListener('DOMSubtreeModified', window.GTDogEventTopHuntTDSecondsChanged, false);
		}
	} // if !CheckHuntOn()
}


//// What to do when seconds div changes ... function is repeated called ///////////////////

window.GTDogEventTopHuntTDSecondsChanged = function(){ 
	// check if timer has gone away
	if( window.GTDog_topHuntTD_minutes_div == null || window.GTDog_topHuntTD_seconds_div == null ){
		console.log("Timer divs gone");
		document.body.style.background = 'yellow';
		document.title= '?? GTDog CONFUSED ??';
	}else{

		// Waiting state update 
		if( window.GTDog_topHuntTD_seconds_div.innerHTML !== "" ){ // empty seconds is normally meaningless
			// update title
			document.title = window.GTDog_topHuntTD_minutes_div.innerHTML+":"+window.GTDog_topHuntTD_seconds_div.innerHTML;
			// if minutes and seconds both == "00" ... hunt on?
			if( window.GTDog_topHuntTD_minutes_div.innerHTML == "00" && 
					window.GTDog_topHuntTD_seconds_div.innerHTML == "00" ){
				// there is a delay before the "let's hunt" is actually shown... 
				window.setTimeout(function() {window.GTDogCheckHuntOn(); }, 500);
				// a final fail (fires after last check and does nothing if hunt is announced)
				window.setTimeout(function() {window.GTDogActiveHuntLinkTDFailCheck(); }, 1000);
			}
		}
	}
};


window.GTDogCheckHuntOn = function(){
	console.log('GTDogCheckHuntOn');
	// check if hunt is on... and triggers the annunciations
	if( document.getElementById('app51157989152_huntlinktop') ){
		// trigger annunciation
		window.GTDogAnnunciateHuntOn();
		return true;
	}
	return false;
};

window.GTDogActiveHuntLinkTDFailCheck = function(){
	if( !window.GTDog_showing_hunt ){ // if we still haven't found the hunt on
		console.log("Hunt should have started... but I don't see it!");
		document.body.style.background = 'yellow';
		document.title= '?? GTDog CONFUSED ??';
	}
}


//// Annunciation functions ///////////////////////////////////////////////////

window.GTDogAnnunciateHuntOn = function(){
	// Hunt is on
	//if( !window.GTDog_showing_hunt ){ // only fire once

		if( window.GTDog_TriggerExperimentalOptions ){
			window.GTDog_TriggerExperimentalOptions();
		}

		//// Just notify.... kosher IMO
		window.GTDog_showing_hunt = true; 
		// Background
		document.body.style.background = window.GTDog_hunt_background_color;
		// Favicon
		favicon.change(window.GTDog_hunt_favicon_href);
		// Title (possibly animated)
		window.GTDog_title_state = 0;
		window.GTDogDisplayHuntTitle();
		// Sound
		if( LS.getItem('GTDogOptions_play_beep') ){
			window.GTDog_beepTune_instance.play();
		}
		if( LS.getItem('GTDogOptions_play_sound') ){
			window.GTDogBarkSound();
		}
	//}
};


///// Popup Div ////////////////////////////////////////////////////////
window.GTDogPopupMessage = function(txt) {
	var div = document.getElementById('GTDogPopupDiv');
	div.innerHTML = txt;
	div.innerHTML += "\n<br><button type=\"button\" align=center style=\"position:absolute;bottom:5px;right:5px\" id=\"GTDogPopupCloseButton\">Close</button>\n";
	div.style.marginLeft = "+"+ ((parseInt(window.innerWidth)/2) - (div.offsetWidth/2)) +"px";
  div.style.marginTop = "+"+ ((parseInt(window.innerHeight)/3) - (div.offsetHeight/2)) +"px";
	// attach listener to close button
	el = document.getElementById('GTDogPopupCloseButton');
	el.addEventListener('click',window.GTDogPopupMessageClose,false);
	// reveal
	div.style.visibility = "visible";
};

window.GTDogPopupMessageClose = function() {
	var div = document.getElementById('GTDogPopupDiv');
	div.style.visibility = "hidden";
};

window.GTDogPopupMessageTest = function() {
	var bait_name = null;
	var bait_num = null;
	var allEl = document.evaluate('//img[@name="current_whisky"]',
					document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if( allEl.snapshotLength > 0 ){
		var thisEl = allEl.snapshotItem(0);
		bait_name = thisEl.title;
	}
	// bait number 
	thisEl = document.getElementById('app51157989152_profile_whisky_quantity');
	if( thisEl ){	bait_num = parseInt(thisEl.innerHTML); }
	// display (if we are passed in an element to put it in)
	window.GTDogPopupMessageBaitLow(bait_name,bait_num);
};

window.GTDogPopupMessageBaitLow = function(bait_name, bait_num) {
	var s = "";
	s += "<h1 align=center style=\"font-size:300%\">Low on Bait</h1>";
	s += "<hr><br>";
	s += "<p style=\"text-align:center; font-size:250%\">";
	s += bait_num+" &times; "+bait_name+" left";
	s += "</p>";
	window.GTDogPopupMessage(s);
};


///// Options selectors

window.GTDogToggleOptionsVisibility = function() {
	var el = document.getElementById('GTDogOptionsDiv');
	if( LS.getItem('GTDogOptions_div_open') ){
		LS.setItem('GTDogOptions_div_open', false);
		el.style.visibility = 'hidden';
	}else{
		LS.setItem('GTDogOptions_div_open', true);
		el.style.visibility = 'visible';
	}
};


window.GTDogGetBaitInfo = function(el){
	var bait_name = null;
	var bait_num = null;
	// bait name
	var allEl = document.evaluate('//img[@name="current_whisky"]',
					document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if( allEl.snapshotLength > 0 ){
		var thisEl = allEl.snapshotItem(0);
		bait_name = thisEl.title;
	}
	// bait number 
	thisEl = document.getElementById('app51157989152_profile_whisky_quantity');
	if( thisEl ){	bait_num = parseInt(thisEl.innerHTML); }
	// display (if we are passed in an element to put it in)
	if( el ){
		if( bait_name && bait_num !== null ){
			el.innerHTML = ""+bait_num+" &times; "+bait_name;
			//return {name:bait_name, num:bait_num};
		}else{
			el.innerHTML = "<b>CAN'T GET BAIT INFO</b>";
			return false;
		}
	}
	// Do a popup if bait_num is 0 
	if( bait_num !== null && parseInt(bait_num) <= window.GTDog_low_bait_warning_level ){
		window.GTDogPopupMessageBaitLow(bait_name,bait_num);
	}
}


window.GTDogInitOptionsDiv = function(){
	var oDiv = document.getElementById('GTDogOptionsDiv');
	// write the html
	// mode
	oDiv.innerHTML = "<b>GTHuntingDog Options</b>"; 
	// place to hold bait info
	oDiv.innerHTML += "<br><span id=GTDogOptionsBaitSpan></span><hr>\n";
	// options checkboxes and links
	//oDiv.innerHTML += "\n<span style=\"cursor:pointer; color:#3B5998;\" id=\"GTDogCheckBaitButton\"><small>(check bait status)</small></span>\n";
	oDiv.innerHTML += "\n<input type=\"checkbox\" id=\"GTDogTitleBlinkCheckbox\"> Animate \"Let's Hunt\" title";
	oDiv.innerHTML += "\n<br><input type=\"checkbox\" id=\"GTDogBeepCheckbox\"> Play beep tune";
	oDiv.innerHTML += "\n<span style=\"cursor:pointer; color:#3B5998;\" id=\"GTDogBeepPlayButton\"><small>(test)</small></span>\n";
	oDiv.innerHTML += "\n<span style=\"cursor:pointer; color:#3B5998;\" id=\"GTDogBeepStopButton\"><small>(stop)</small></span>\n";
	oDiv.innerHTML += "\n<br>&nbsp;&nbsp;&nbsp;&nbsp;<input type=\"checkbox\" id=\"GTDogLoopBeepCheckbox\"> Allow looping ";
	oDiv.innerHTML += "\n<br><input type=\"checkbox\" id=\"GTDogSoundCheckbox\"> Play sound";
	oDiv.innerHTML += "\n<span style=\"cursor:pointer; color:#3B5998;\" id=\"GTDogSoundPlayButton\"><small>(play)</small></span>\n";
	oDiv.innerHTML += "\n<span style=\"cursor:pointer; color:#3B5998;\" id=\"GTDogSoundStopButton\"><small>(stop)</small></span>\n";
	oDiv.innerHTML += "\n<br>&nbsp;&nbsp;&nbsp;&nbsp;<input type=\"checkbox\" id=\"GTDogRepeatSoundCheckbox\"> Repeat sound ("+Math.round(window.GTDog_repeat_sound_interval/1000)+"s)";
	oDiv.innerHTML += "\n<br>&nbsp;&nbsp;&nbsp;&nbsp;<input type=\"checkbox\" id=\"GTDogLoopSoundCheckbox\"> Loop sound";

	// some links
	oDiv.innerHTML += "\n<hr>";
	oDiv.innerHTML += '\n<a href="http://apps.facebook.com/ghost-trappers/index.php">Ghost Trappers index.php</a>';
	oDiv.innerHTML += '\n<br><a href="http://apps.facebook.com/ghost-trappers/index.php#topanchor">&nbsp;&nbsp;&nbsp;#topanchor</a>';
	oDiv.innerHTML += '\n<br><a href="http://apps.facebook.com/ghost-trappers/index.php#hunt">&nbsp;&nbsp;&nbsp;#hunt</a>';
	oDiv.innerHTML += '\n<br><a href="http://apps.facebook.com/ghost-trappers/scotch_intern.php" target="_blank">Bar (in new window)</a>';

	// Hook for extra experimental options
	if( window.GTDog_AddExperimentalOptions ){
		window.GTDog_AddExperimentalOptions(oDiv);
	}


	// add listeners and fill in the values
	var el = null;
	el = document.getElementById('GTDogTitleBlinkCheckbox');
	el.addEventListener('click',window.GTDogTitleBlinkCheckboxToggle,false);
	if( LS.getItem('GTDogOptions_title_animate') ){ el.checked = true; }

	el = document.getElementById('GTDogBeepCheckbox');
	el.addEventListener('click',window.GTDogBeepCheckboxToggle,false);
	if( LS.getItem('GTDogOptions_play_beep') ){ el.checked = true; }

	el = document.getElementById("GTDogBeepPlayButton");
	el.addEventListener('click',window.GTDog_beepTunePlay,false);
	el = document.getElementById("GTDogBeepStopButton");
	el.addEventListener('click',window.GTDog_beepTuneStop,false);

	el = document.getElementById('GTDogLoopBeepCheckbox');
	el.addEventListener('click',window.GTDogLoopBeepCheckboxToggle,false);
	if( LS.getItem('GTDogOptions_loop_beep') ){ el.checked = true; }

	el = document.getElementById('GTDogSoundCheckbox');
	el.addEventListener('click',window.GTDogSoundCheckboxToggle,false);
	if( LS.getItem('GTDogOptions_play_sound') ){ el.checked = true; }

	el = document.getElementById("GTDogSoundPlayButton");
	el.addEventListener('click',window.GTDogBarkSound,false);
	el = document.getElementById("GTDogSoundStopButton");
	el.addEventListener('click',window.GTDog_barkSoundStop,false);

	el = document.getElementById('GTDogRepeatSoundCheckbox');
	el.addEventListener('click',window.GTDogRepeatSoundCheckboxToggle,false);
	if( LS.getItem('GTDogOptions_repeat_sound') ){ el.checked = true; }

	el = document.getElementById('GTDogLoopSoundCheckbox');
	el.addEventListener('click',window.GTDogLoopSoundCheckboxToggle,false);
	if( LS.getItem('GTDogOptions_loop_sound') ){ el.checked = true; }

	if( window.GTDog_AttachExperimentalOptionsListeners ){
		window.GTDog_AttachExperimentalOptionsListeners();
	}
	// fill in info in subspans (do last to ensure everything is constructed first)
	window.GTDogGetBaitInfo(document.getElementById("GTDogOptionsBaitSpan"));
};


// simple wrappers needed for links to start and stop beepTune and sound (for testing it)
window.GTDog_beepTunePlay = function(){ window.GTDog_beepTune_instance.play(); };
window.GTDog_beepTuneStop = function(){ window.GTDog_beepTune_instance.stop(); };
window.GTDog_barkSoundStop = function(){
	if( window.GTDog_barkSoundTimerRef ){ window.clearTimeout(window.GTDog_barkSoundTimerRef); }
  document.getElementById("GTDogSoundSpan").innerHTML = '';
}

//// Checkbox toggles
window.GTDogTitleBlinkCheckboxToggle = function(){
	if( LS.getItem('GTDogOptions_title_animate') ){
		LS.setItem('GTDogOptions_title_animate', false);
	}else{
		LS.setItem('GTDogOptions_title_animate', true);
	}
	// make sure the checkbox agrees
	if( LS.getItem('GTDogOptions_title_animate') ){
		document.getElementById('GTDogTitleBlinkCheckbox').checked = true;
	}
};

window.GTDogBeepCheckboxToggle = function(){
	if( LS.getItem('GTDogOptions_play_beep') ){
		LS.setItem('GTDogOptions_play_beep', false);
	}else{
		LS.setItem('GTDogOptions_play_beep', true);
	}
	// make sure the checkbox agrees
	if( LS.getItem('GTDogOptions_play_beep') ){
		document.getElementById('GTDogBeepCheckbox').checked = true;
	}else{
		window.GTDog_beepTune_instance.stop(); // stop the beeps if they are going
		LS.setItem('GTDogOptions_loop_beep', false);
		document.getElementById('GTDogLoopBeepCheckbox').checked = false;
	}
};

window.GTDogLoopBeepCheckboxToggle = function(){
	if( LS.getItem('GTDogOptions_loop_beep') ){
		LS.setItem('GTDogOptions_loop_beep', false);
	}else{
		LS.setItem('GTDogOptions_loop_beep', true);
	}
	// make sure the checkbox agrees
	if( LS.getItem('GTDogOptions_loop_beep') ){
		document.getElementById('GTDogLoopBeepCheckbox').checked = true;
		// turn on play beep checkbox
		LS.setItem('GTDogOptions_play_beep', true);
		document.getElementById('GTDogBeepCheckbox').checked = true;
		// restore the sequence
		window.GTDog_beepTune_instance.allowLooping(window.GTDog_beepTune_sequence);
	}else{
		window.GTDog_beepTune_instance.stop(); // stop the beeps if they are going
		// set the end of the sequence to 0
		window.GTDog_beepTune_instance.disableLooping();
	}
};

window.GTDogSoundCheckboxToggle = function(){
	if( LS.getItem('GTDogOptions_play_sound') ){
		LS.setItem('GTDogOptions_play_sound', false);
	}else{
		LS.setItem('GTDogOptions_play_sound', true);
	}
	// make sure the checkbox agrees
	if( LS.getItem('GTDogOptions_play_sound') ){
		document.getElementById('GTDogSoundCheckbox').checked = true;
	}else{
		// turn off repeat & loop (radio button effect)
		LS.setItem('GTDogOptions_repeat_sound', false);
		document.getElementById('GTDogRepeatSoundCheckbox').checked = false;
		LS.setItem('GTDogOptions_loop_sound', false);
		document.getElementById('GTDogLoopSoundCheckbox').checked = false;
	}
};

window.GTDogRepeatSoundCheckboxToggle = function(){
	if( LS.getItem('GTDogOptions_repeat_sound') ){
		LS.setItem('GTDogOptions_repeat_sound', false);
	}else{
		LS.setItem('GTDogOptions_repeat_sound', true);
	}
	// make sure the checkbox agrees
	if( LS.getItem('GTDogOptions_repeat_sound') ){
		document.getElementById('GTDogRepeatSoundCheckbox').checked = true;
		// turn on sound & off loop (radio button effect)
		LS.setItem('GTDogOptions_play_sound', true);
		document.getElementById('GTDogSoundCheckbox').checked = true;
		LS.setItem('GTDogOptions_loop_sound', false);
		document.getElementById('GTDogLoopSoundCheckbox').checked = false;
	}
};

window.GTDogLoopSoundCheckboxToggle = function(){
	if( LS.getItem('GTDogOptions_loop_sound') ){
		LS.setItem('GTDogOptions_loop_sound', false);
	}else{
		LS.setItem('GTDogOptions_loop_sound', true);
	}
	// make sure the checkbox agrees
	if( LS.getItem('GTDogOptions_loop_sound') ){
		document.getElementById('GTDogLoopSoundCheckbox').checked = true;
		// turn on sound & off repeat (radio button effect)
		LS.setItem('GTDogOptions_play_sound', true);
		document.getElementById('GTDogSoundCheckbox').checked = true;
		LS.setItem('GTDogOptions_repeat_sound', false);
		document.getElementById('GTDogRepeatSoundCheckbox').checked = false;
	}
};

//// Other Annuciation Fucntions (util-ish) ////

window.GTDogDisplayHuntTitle = function(){ 
	// Set the window title
	if( !LS.getItem('GTDogOptions_title_animate') ){
		// flat title
		document.title = window.GTDog_hunt_title_fixed;

	}else{
		// animated title
		if( window.GTDog_title_state >= window.GTDog_hunt_title_animated.length ){
			window.GTDog_title_state = 0;
		}
		document.title = window.GTDog_hunt_title_animated[window.GTDog_title_state];
		window.GTDog_title_state++;
		// set a repeating timer
		window.setTimeout(function() {window.GTDogDisplayHuntTitle(); }, window.GTDog_title_animate_speed);
	}
}



window.GTDogBarkSound = function() {
	surl = window.GTDog_sound_href;
	if( 0 ){ // better object way
  	document.getElementById("GTDogSoundSpan").innerHTML =
				'<OBJECT DATA="'+surl+'" TYPE="audio/x-wav">'+
				'<PARAM NAME=autostart VALUE=true>'+
				'<PARAM NAME=hidden VALUE=true>'+
				'<PARAM NAME=loop VALUE='+LS.getItem('GTDogOptions_loop_sound')+'>'+
				'</OBJECT>';
	}else{ // depricated embed way
  	document.getElementById("GTDogSoundSpan").innerHTML =
    		'<embed src="'+surl+'" hidden=true autostart=true loop="'+LS.getItem('GTDogOptions_loop_sound')+'">';
	}
	if( !LS.getItem('GTDogOptions_loop_sound') && LS.getItem('GTDogOptions_repeat_sound') ){
		window.GTDog_barkSoundTimerRef = 
			window.setTimeout(function() {window.GTDogBarkSound(); }, window.GTDog_repeat_sound_interval);
	}
}

///// Stuff that would be included in a separate .js if this wasn't a user script //////////


//// Persistent variable accessor  
// should only have one global scope, created with "var foo = new persistentLocalStorage;"
// will map true and flase to "__ture__" and "__flase__" when using localStorage (simulate bools)
function persistentLocalStorage(){ // used like an object(simulate bools)
	// Public
	this.getItem = function(key){ return undefined; };
	this.setItem = function(key,value){ return undefined; };
	this.getMode = function(){ return mode; };
	// Private internals
	var fake_localstorage_data = null;
	var mode = null;
	// Initialization
	// Try to use localStorage (if we have it like for Chrome)....
	if( window.localStorage ){
		mode = "localStorage";
		this.getItem = function(key){ 
			var v = window.localStorage.getItem(key); 
			if( v == "__true__" ){ v = true; }
			if( v == "__false__" ){ v = false; }
			return v;};
		this.setItem = function(key,value){ 
			if( value==true ){ value="__true__"; }; 
			if( value==false ){ value="__false__"; }; 
			return window.localStorage.setItem(key,value); };
	}else{
		// Otherwise try to use GM_getValue and GM_setValue persistent variables
		if( GM_setValue ){
			mode = "GM";
			this.getItem = function(key){ return GM_getValue(key); };
			this.setItem = function(key,value){ return GM_setValue(key,value); };
		}else{
			// If no persistent variables are available, warn and fake it (won't work well) 
			mode = "fake";
			fake_localstorage_data = new Array();
			this.getItem = function(key){ return fake_localstorage_data[key]; };
			this.setItem = function(key,value){ fake_localstorage_data[key] = value; };
		}
	}
};


//// beepTune : play a sequence of beeps via the computer speaker (java.awt.Toolkit call)
function beepTune(sequence, rate){

	this.play = function(){
		this.stop();
	  idx = 0;
		timerRef = setTimeout(playNextNote, sequence[idx]*rate);
	}

	this.stop = function(){ 
		if( timerRef ){ clearTimeout(timerRef); }
	}

	this.allowLooping = function(){  
		sequence[sequence.length-1] = orig_seq_end;
	}

	this.disableLooping = function(){ 
		sequence[sequence.length-1] = 0;
	}

	// internal stuff //
	if( !sequence ){ sequence = [2,2,1,2,2,10]; } // default sequence
	if( !rate ){ rate = 200; } // default rate
	var idx = null;
	var timerRef = null;
	var orig_seq_end = sequence[sequence.length-1]; // to restore if nuked by disableLooping
	function playNextNote(){
		//// This is the code to actually play the note... 
		//It only works for greasmonkey and could probably be improved
		if( unsafeWindow ){ // if we have the unsafeWindow (greasemonkey), use it
			unsafeWindow.java.awt.Toolkit.getDefaultToolkit().beep();
		}else{  // just try beeping with the wrapped context (does not work in chrome, but might as well try)
			window.java.awt.Toolkit.getDefaultToolkit().beep();
		}
		// possibly set the timer for the next note
		idx += 1;
		if( idx < sequence.length ){ // not end of sequence ?
			timerRef = setTimeout(playNextNote, sequence[idx-1]*rate);
		}else{ // at end of sequence...
			if( sequence[sequence.length-1] ){ // loop?
				idx = 0;
				timerRef = setTimeout(playNextNote, sequence[sequence.length-1]*rate);
			}
		}
	}
}


//// functions to set the favicon 
// adpated from favicon.js by Michael Mahemoff [http://ajaxify.com/run/favicon] 
favicon = {
	change: function(iconURL, optionalDocTitle) {
		if (optionalDocTitle) { document.title = optionalDocTitle; }
		this.addLink(iconURL, true);
	},
	addLink: function(iconURL) {
		var link = document.createElement("link");
		link.type = "image/x-icon";
		link.rel = "shortcut icon";
		link.href = iconURL;
		this.docHead.appendChild(link);
	},
	removeLinkIfExists: function() {
		var links = this.docHead.getElementsByTagName("link");
		for (var i=0; i<links.length; i++) {
			var link = links[i];
			if (link.type=="image/x-icon" && link.rel=="shortcut icon") {
				this.docHead.removeChild(link);
				return; // Assuming only one match at most.
	    }
 		}
	},
	docHead:document.getElementsByTagName("head")[0]
}



//// MAIN aka actually trigger starting functions ////////////////////////////
window.GTDogInitFunction();

