// ==UserScript==
// @name           Wakaba Extension
// @description    Commonly requested features for Wakaba boards (and Kareha Boards in Wakaba Mode), in particular Desuchan
// @include http://www.desuchan.net/*
// @include http://desuchan.net/*
// @include https://www.desuchan.net/*
// @include https://desuchan.net/*
// @include http://*.420chan.org/*
// @include http://www.not420chan.com/*
// @include http://iichan.net/*
// @include http://*.iichan.net/*
// @include http://iichan.ru/*
// @include http://*.iichan.ru/*
// @include http://*.wakachan.org/*
// @include http://wakachan.org/*
// @include http://*.iiichan.net/*
// @include http://iiichan.net/*
// @include http://secchan.net/*
// @include http://*.secchan.net/*
// @include http://www.pooshlmer.com/wakaba/*
// @include http://*.bbwchan.org/*
// @include http://bbwchan.org/*
// @include http://2ch.ru/*
// @include http://*.2ch.ru/*
// @include http://*.teamtao.com/*
// @include http://teamtao.com/*
// @include http://shanachan.*/*
// @include http://*.deadgods.net/*
// @include http://deadgods.net/*
// @include http://*.chiyochan.net/*
// @include http://chiyochan.net/*
// @include http://1chan.net/*
// @include http://*.1chan.net/*
// @include http://chupatz.com/*
// @include http://*.chupatz.com/*
// @include http://liarpedia.org/dorifuto/*
// @include http://*.koichan.net/*
// @include http://koichan.net/*
// @include http://raki-suta.com/*
// @include http://*.raki-suta.com/*
// @include http://img.7clams.org/*
// @include http://bokuchan.org/*
// @include http://www.bokuchan.org/*
// @include http://*.gurochan.net/*
// @include http://www.gurochan.net/*
// @include http://server50734.uk2net.com/*
// ==/UserScript==

// Wakaba Extension v.0.9.5.2

// HISTORY
// 2008-03-09: First public release.
// 2008-03-10: Quick reply fix for Desuchan, minor fixes in quick reply for BBWChan.
// 2008-03-21: Cancel button for quick reply, fixes for thread expansion and post expansion
// 2008-03-29: Added Raki-Suta and 7clams.
// 2008-04-01: Added Bokuchan. Some code cleanup.
// 2008-04-13: Function nesting.
// 2008-04-16: Fixed CAPTCHA.
// 2008-05-30: Minor fix for restricting link handling for Quick Reply. Desuchan mod panel is left out of by script.
// 2008-06-23: Code for Image Expansion sucks less now. Nasty slow-down when clicking image several times is gone. Opera works better with it. Basic thread hiding routines written.
// 2008-06-24: Storage of hidden threads by cookie and hiding affected threads upon page load now implemented. Added Gurochan directly to @include list.
// 2008-06-25: Quick Sage implemented through checkbox. Post fields updated for Wakachan.org. Auto-focus on comment field when using Quick Reply.
// 2008-06-29: Clicking the post number in quick reply will now insert a reference into the quick reply field. The action carried out by alt- or ctrl- clicking an image is no longer intercepted.
// 2008-07-03: Reference changes after thread expansion were having issues due to incorrect thread number being extracted--fixed.
// 2008-08-05: Options Panel introduced, with optionally hardcoded default options.
// 2008-08-06: Partial thread expansion with option for the number of shown replies (including those already shown).
// 2008-08-07: Quick Reply Backup: Save Quick Reply input if open when leaving page and restore upon return if the post is open. Thread Hiding on nanoha.chumatz.com fixed. (These crazy XHTML/HTML chimeras will be the death of me.)
// 2008-08-14: Bug fix for Opera: Only the first image expanding when choosing to select all.

// FEATURES
// * Image Expansion
// * Thread/Post Expansion
// * Quick Reply
// * Global Expansion Options
// * Thread Hiding
// * Quick Sage

// TODO
// * Add options for disabling unwanted features and controlling others.
// * Add some icons and other niceties.
// * Other possible features.


// CROSS BROWSER EVEN LISTENER FUNCTION
function addEvent(obj, evType, fn){ 
	 if (obj.addEventListener){ 
	   obj.addEventListener(evType, fn, false); 
	   return true; 
	 } else if (obj.attachEvent){ 
	   var r = obj.attachEvent("on"+evType, fn); 
	   return r; 
	 } else { 
	   return false; 
	 } 
}

//LETS ADD A LISTENER TO WINDOW.LOAD
addEvent(window, 'load', init);

//INIT: 
function init(){
	// THIS IS A SMALL PIECE OF CODE I MAKE SO THAT YOUR PASSWORD IS NEVER EMPTY. I'VE JUST TESTED THIS WITH 420CHAN,
	// YOU MIGHT HAVE TO CHANGE THE NAME OF THE ID (POSTFORM) AND OBVIOUSLY CHANGE THE DEFAULT PASSWORD.
	a = document.getElementById('postform');
	b = a.getElementsByTagName('input');
	
	if(a){
		for(c=0;c<=b.length;c++){
			if(a[c].type == "password")
				// IMPORTANT: THIS IS YOUR PASSWORD. CHANGE IT AND PUT WHATEVER PASS YOU WANT.
				a[c].value = "sega";
		}
	}
	//OK, NOW LETS GO WITH THE ORIGINAL CODE
	olawds();
}


// DEFAULT SETTINGS
	var doQuickReply = true;
	var doThreadExpansion = true;
	var doPostExpansion = true;
	var doThreadHiding = true;
	var doQuickSage = true;
	var doGlobalExpansion = true;
	var doImageExpansion = true;
	var doPartialThreadExpansion = false;
	var partialThreadExpansionLimit = 50;
	var doPartialImageExpansion = false;
	var partialImageExpansionWidthLimit = 500;
	var doFullImageExpansionOnSecondClick = true;
	var doOptionsPanel = true;			// TIP for the User: Set to false if you want to configure these options manually without the options panel showing.

//INSIDE THIS FUNCTION IS ALL THE CODE THAT WASN'T INSIDE OF A FUNCTION ON THE ORIGINAL OLAWD'S SCRIPT
function olawds(){

	// Tracking variable for quick reply construction/destruction
	window.lastQuickReply = false; 

	// Is this a Kareha Board?
	window.karehaBoard = (window.location.href.indexOf("deadgods.net/") != -1 || window.location.href.indexOf("kaede.iichan.net/") != -1 || window.location.href.indexOf("liarpedia.org/") != -1) ? true : false;

	// Board path variable
	window.boardPath = getBoardPath();

	// Add "h:" namespace to XPath queries and translate it only for XHTML docs rendered as such.
	// Thanks to Cloggedtube.com for the idea.
	window.nsResolver = function(prefix)
	{
		var ns = {'h' : 'http://www.w3.org/1999/xhtml'};
		return ns[prefix];
	}
	window.ns = document.evaluate('count(/h:html)',document,nsResolver,1,null).numberValue > 0 ? 'h:' : '';

	window.specialKeyIsDown = false;
	
	//OH LORD FIX THIS PLZ
	
if (document.getElementById('delform') && window.location.href.indexOf('task=') == -1){
		if (doOptionsPanel)							// Set up Options Panel
		{
			// Grab previous coordinates of the option panel, if available/applicable.
			var optionPanelCoordinatesString = get_cookie('wkExtOptionPanelCoordinates');
			var optionPanelCoordinates = (optionPanelCoordinatesString.length>0) ? optionPanelCoordinatesString.split(/,/) : new Array ("10px", "300px");

			var optionPanelWrapper = document.createElement('div');
			optionPanelWrapper.style.width = "250px";
			optionPanelWrapper.style.fontSize = "small";
			optionPanelWrapper.style.position = "absolute";
			optionPanelWrapper.style.left = optionPanelCoordinates[0];
			optionPanelWrapper.style.top = optionPanelCoordinates[1];
			optionPanelWrapper.style.zIndex = "250";
			optionPanelWrapper.setAttribute("class", "reply");			// Use the reply class to maintain a background conforming to the CSS color scheme.
			optionPanelWrapper.style.borderStyle = "double";
			optionPanelWrapper.style.padding = "5px 5px 5px 5px";

			var optionPanelHandle = document.createElement('div');		// For use with moving the box around. (Event listener below.)
			optionPanelHandle.style.width="100%";
//		optionPanelHandle.style.height="10px";
			optionPanelHandle.style.opacity = ".6";
			optionPanelHandle.style.background="white";
			optionPanelHandle.style.cursor = "move";
			optionPanelWrapper.appendChild(optionPanelHandle);

			var optionsHeader = document.createElement("div");
			optionsHeader.textContent="Wakaba Extension";
			optionsHeader.style.fontWeight="bold";
			optionsHeader.style.fontFamily = "sans-serif";
//		optionsHeader.style.cssFloat="left";
			optionPanelHandle.appendChild(optionsHeader);

			var optionPanelForm = document.createElement("form");
			optionPanelForm.setAttribute('action', window.location.href);	// Eh, standards require it.
			optionPanelForm.setAttribute('method', 'get');			// This form will not be submitted, per se.

			var optionsDisplayToggleLink = document.createElement("a");	// Yep, it toggles the options' display.
			optionsDisplayToggleLink.setAttribute("href","#");
			optionsDisplayToggleLink.textContent = "Show Options";
			optionsDisplayToggleLink.style.cssFloat = "left";
			optionPanelForm.appendChild(optionsDisplayToggleLink);

			var reloadButton = document.createElement("input");	// Create reload button.
			reloadButton.setAttribute('type','submit');
			reloadButton.setAttribute('name','optionspanelsubmit');
			reloadButton.setAttribute('value','Reload Page');
			reloadButton.style.cssFloat = 'right';
			optionPanelForm.appendChild(reloadButton);
			reloadButton.addEventListener('click', function(event) 
			{
				window.location.reload();	// Once the button is clicked, just reload the page.

				event.stopPropagation();	// Do not submit the form.
				event.preventDefault();
			}, false);

			var optionsDiv = document.createElement("div");			// Start new division for the body of the options
			optionsDiv.style.clear = "both";
			optionsDiv.style.display = "none";				// Hide options by default.

			// Quick Reply Option
			var quickReplyOptionLabel = document.createElement('label'); // Create label and checkbox for option
			var quickReplyOptionText = document.createTextNode(" Enable Quick Reply");
			var quickReplyOptionCheckbox = document.createElement('input');
			quickReplyOptionCheckbox.setAttribute("type","checkbox");
			quickReplyOptionCheckbox.setAttribute("name","quickreplytoggle");
			quickReplyOptionCheckbox.setAttribute("value","on");
			if (optionValue('doQuickReply'))	// If the option is currently enabled, check the option checkbox.
				quickReplyOptionCheckbox.setAttribute("checked","checked");
			quickReplyOptionLabel.appendChild(quickReplyOptionCheckbox);
			quickReplyOptionLabel.appendChild(quickReplyOptionText);
			quickReplyOptionCheckbox.addEventListener('click', function(event)	// Toggle the option in realtime once clicked. (The page will still need to be reloaded for changes to take effect.)
			{
				toggleOption('doQuickReply');
			}, false);
			optionsDiv.appendChild(quickReplyOptionLabel);

			optionsDiv.appendChild(document.createElement('br'));	// Insert line break. Ooh, nesting!

			// Thread Expansion Option
			var threadExpansionOptionLabel = document.createElement('label');
			var threadExpansionOptionText = document.createTextNode(" Enable Thread Expansion");
			var threadExpansionOptionCheckbox = document.createElement('input');
			threadExpansionOptionCheckbox.setAttribute("type","checkbox");
			threadExpansionOptionCheckbox.setAttribute("name","threadexpansiontoggle");
			threadExpansionOptionCheckbox.setAttribute("value","on");
			if (optionValue('doThreadExpansion'))
				threadExpansionOptionCheckbox.setAttribute("checked","checked");
			threadExpansionOptionLabel.appendChild(threadExpansionOptionCheckbox);
			threadExpansionOptionLabel.appendChild(threadExpansionOptionText);
			threadExpansionOptionCheckbox.addEventListener('click', function(event)
			{
				toggleOption('doThreadExpansion');
			}, false);
			optionsDiv.appendChild(threadExpansionOptionLabel);

			optionsDiv.appendChild(document.createElement('br'));

			// Partial Thread Expansion Option
			var partialThreadExpansionOptionLabel = document.createElement('label');
			var partialThreadExpansionOptionText = document.createTextNode(" Enable Partial Thread Expansion");
			var partialThreadExpansionOptionCheckbox = document.createElement('input');
			partialThreadExpansionOptionCheckbox.setAttribute("type","checkbox");
			partialThreadExpansionOptionCheckbox.setAttribute("name","partialthreadexpansiontoggle");
			partialThreadExpansionOptionCheckbox.setAttribute("value","on");
			if (optionValue('doPartialThreadExpansion'))
				partialThreadExpansionOptionCheckbox.setAttribute("checked","checked");
			partialThreadExpansionOptionLabel.appendChild(partialThreadExpansionOptionCheckbox);
			partialThreadExpansionOptionLabel.appendChild(partialThreadExpansionOptionText);
			partialThreadExpansionOptionCheckbox.addEventListener('click', function(event)
			{
				toggleOption('doPartialThreadExpansion');
			}, false);
			optionsDiv.appendChild(partialThreadExpansionOptionLabel);

			optionsDiv.appendChild(document.createElement('br'));

			// Partial Thread Expansion Limit Option (Dependent on Partial Thread Expansion Option above)
			var partialThreadExpansionLimitOptionLabel = document.createElement('label');
			partialThreadExpansionLimitOptionLabel.style.marginLeft = '2.5em';
			var partialThreadExpansionLimitOptionText1 = document.createTextNode("Show Last ");
			var partialThreadExpansionLimitOptionField = document.createElement('input');
			var partialThreadExpansionLimitOptionText2 = document.createTextNode(" Replies");
			partialThreadExpansionLimitOptionField.setAttribute("type","text");
			partialThreadExpansionLimitOptionField.setAttribute("size","3");
			partialThreadExpansionLimitOptionField.setAttribute("name","partialthreadexpansionlimit");
			partialThreadExpansionLimitOptionField.setAttribute("value",optionValue('partialThreadExpansionLimit'));
			partialThreadExpansionLimitOptionLabel.appendChild(partialThreadExpansionLimitOptionText1);
			partialThreadExpansionLimitOptionLabel.appendChild(partialThreadExpansionLimitOptionField);
			partialThreadExpansionLimitOptionLabel.appendChild(partialThreadExpansionLimitOptionText2);
			partialThreadExpansionLimitOptionField.addEventListener('keyup', function(event)
			{
				setOption('partialThreadExpansionLimit', event.target.value);
			}, false);
			optionsDiv.appendChild(partialThreadExpansionLimitOptionLabel);

			optionsDiv.appendChild(document.createElement('br'));

			// Post Expansion Option
			var postExpansionOptionLabel = document.createElement('label');
			var postExpansionOptionText = document.createTextNode(" Enable Post Expansion");
			var postExpansionOptionCheckbox = document.createElement('input');
			postExpansionOptionCheckbox.setAttribute("type","checkbox");
			postExpansionOptionCheckbox.setAttribute("name","postexpansiontoggle");
			postExpansionOptionCheckbox.setAttribute("value","on");
			if (optionValue('doPostExpansion'))
				postExpansionOptionCheckbox.setAttribute("checked","checked");
			postExpansionOptionLabel.appendChild(postExpansionOptionCheckbox);
			postExpansionOptionLabel.appendChild(postExpansionOptionText);
			postExpansionOptionCheckbox.addEventListener('click', function(event)
			{
				toggleOption('doPostExpansion');
			}, false);
			optionsDiv.appendChild(postExpansionOptionLabel);

			optionsDiv.appendChild(document.createElement('br'));

			// Image Expansion Option
			var imageExpansionOptionLabel = document.createElement('label');
			var imageExpansionOptionText = document.createTextNode(" Enable Image Expansion");
			var imageExpansionOptionCheckbox = document.createElement('input');
			imageExpansionOptionCheckbox.setAttribute("type","checkbox");
			imageExpansionOptionCheckbox.setAttribute("name","imageexpansiontoggle");
			imageExpansionOptionCheckbox.setAttribute("value","on");
			if (optionValue('doImageExpansion'))
				imageExpansionOptionCheckbox.setAttribute("checked","checked");
			imageExpansionOptionLabel.appendChild(imageExpansionOptionCheckbox);
			imageExpansionOptionLabel.appendChild(imageExpansionOptionText);
			imageExpansionOptionCheckbox.addEventListener('click', function(event)
			{
				toggleOption('doImageExpansion');
			}, false);
			optionsDiv.appendChild(imageExpansionOptionLabel);

			optionsDiv.appendChild(document.createElement('br'));

			// Partial Image Expansion Option (Dependent on Image Expansion Option above)
			// This is one of two choices on how to handle image expansion.
			var partialImageExpansionOptionLabel = document.createElement('label');
			partialImageExpansionOptionLabel.style.marginLeft = '2.5em';
			var partialImageExpansionOptionText = document.createTextNode(" Expand Image Partially");
			var partialImageExpansionOptionCheckbox = document.createElement('input');
			partialImageExpansionOptionCheckbox.setAttribute("type","radio");
			partialImageExpansionOptionCheckbox.setAttribute("name","partialimageexpansiontoggle");
			partialImageExpansionOptionCheckbox.setAttribute("value","on");
			if (optionValue('doPartialImageExpansion'))
				partialImageExpansionOptionCheckbox.setAttribute("checked","checked");
			partialImageExpansionOptionLabel.appendChild(partialImageExpansionOptionCheckbox);
			partialImageExpansionOptionLabel.appendChild(partialImageExpansionOptionText);
			partialImageExpansionOptionCheckbox.addEventListener('click', function(event)
			{
				setOption('doPartialImageExpansion',true);
			}, false);
			optionsDiv.appendChild(partialImageExpansionOptionLabel);

			optionsDiv.appendChild(document.createElement('br'));

			// Maximum Width of Partial Image Expansion (Dependent on Partial Image Expansion Option above.)
			var partialImageExpansionLimitOptionLabel = document.createElement('label');
			partialImageExpansionLimitOptionLabel.style.marginLeft = '5.0em';
			var partialImageExpansionLimitOptionText1 = document.createTextNode("Expand To ");
			var partialImageExpansionLimitOptionField = document.createElement('input');
			var partialImageExpansionLimitOptionText2 = document.createTextNode(" Pixels");
			partialImageExpansionLimitOptionField.setAttribute("type","text");
			partialImageExpansionLimitOptionField.setAttribute("size","3");
			partialImageExpansionLimitOptionField.setAttribute("name","partialthreadexpansionlimit");
			partialImageExpansionLimitOptionField.setAttribute("value",optionValue('partialImageExpansionWidthLimit'));
			partialImageExpansionLimitOptionLabel.appendChild(partialImageExpansionLimitOptionText1);
			partialImageExpansionLimitOptionLabel.appendChild(partialImageExpansionLimitOptionField);
			partialImageExpansionLimitOptionLabel.appendChild(partialImageExpansionLimitOptionText2);
			partialImageExpansionLimitOptionField.addEventListener('keyup', function(event)
			{
				setOption('partialImageExpansionWidthLimit', event.target.value);
			}, false);
			optionsDiv.appendChild(partialImageExpansionLimitOptionLabel);

			optionsDiv.appendChild(document.createElement('br'));

			// Option to Fully Expand Image on the Second Click (Dependent on Partial Image Expansion Option above)
			var fullImageOnSecondClickOptionLabel = document.createElement('label');
			fullImageOnSecondClickOptionLabel.style.marginLeft = '5.0em';
			var fullImageOnSecondClickOptionText = document.createTextNode(" Full Image on Second Click");
			var fullImageOnSecondClickOptionCheckbox = document.createElement('input');
			fullImageOnSecondClickOptionCheckbox.setAttribute("type","checkbox");
			fullImageOnSecondClickOptionCheckbox.setAttribute("name","fullimageonsecondclicktoggle");
			fullImageOnSecondClickOptionCheckbox.setAttribute("value","on");
			if (optionValue('doFullImageExpansionOnSecondClick'))
				fullImageOnSecondClickOptionCheckbox.setAttribute("checked","checked");
			fullImageOnSecondClickOptionLabel.appendChild(fullImageOnSecondClickOptionCheckbox);
			fullImageOnSecondClickOptionLabel.appendChild(fullImageOnSecondClickOptionText);
			fullImageOnSecondClickOptionCheckbox.addEventListener('click', function(event)
			{
				toggleOption('doFullImageExpansionOnSecondClick');
			}, false);
			optionsDiv.appendChild(fullImageOnSecondClickOptionLabel);

			optionsDiv.appendChild(document.createElement('br'));

			// Full Image Expansion Choice (Dependent on Image Expansion Option above.)
			// This is the second of the two alternatives on how to expand images.
			var fullImageExpansionOptionLabel = document.createElement('label');
			fullImageExpansionOptionLabel.style.marginLeft = '2.5em';
			var fullImageExpansionOptionText = document.createTextNode(" Expand Image Fully");
			var fullImageExpansionOptionCheckbox = document.createElement('input');
			fullImageExpansionOptionCheckbox.setAttribute("type","radio");
			fullImageExpansionOptionCheckbox.setAttribute("name","partialimageexpansiontoggle");
			fullImageExpansionOptionCheckbox.setAttribute("value","off");
			if (!optionValue('doPartialImageExpansion'))
				fullImageExpansionOptionCheckbox.setAttribute("checked","checked");
			fullImageExpansionOptionLabel.appendChild(fullImageExpansionOptionCheckbox);
			fullImageExpansionOptionLabel.appendChild(fullImageExpansionOptionText);
			fullImageExpansionOptionCheckbox.addEventListener('click', function(event)
			{
				setOption('doPartialImageExpansion',false);
			}, false);
			optionsDiv.appendChild(fullImageExpansionOptionLabel);

			optionsDiv.appendChild(document.createElement('br'));

			// Thread Hiding Option (Non-applicable on Desu/Boku)
			if (window.location.href.indexOf('desuchan.net/') == -1 && window.location.href.indexOf('bokuchan.org/') == -1 && !karehaBoard)
			{
				var threadHidingOptionLabel = document.createElement('label');
				var threadHidingOptionText = document.createTextNode(" Enable Thread Hiding");
				var threadHidingOptionCheckbox = document.createElement('input');
				threadHidingOptionCheckbox.setAttribute("type","checkbox");
				threadHidingOptionCheckbox.setAttribute("name","threadhidingtoggle");
				threadHidingOptionCheckbox.setAttribute("value","on");
				if (optionValue('doThreadHiding'))
					threadHidingOptionCheckbox.setAttribute("checked","checked");
				threadHidingOptionLabel.appendChild(threadHidingOptionCheckbox);
				threadHidingOptionLabel.appendChild(threadHidingOptionText);
				threadHidingOptionCheckbox.addEventListener('click', function(event)
				{
					toggleOption('doThreadHiding');
				}, false);
				optionsDiv.appendChild(threadHidingOptionLabel);

				optionsDiv.appendChild(document.createElement('br'));
			}

			// Quick Sage Option
			var quickSageOptionLabel = document.createElement('label');
			var quickSageOptionText = document.createTextNode(" Enable Quick Sage");
			var quickSageOptionCheckbox = document.createElement('input');
			quickSageOptionCheckbox.setAttribute("type","checkbox");
			quickSageOptionCheckbox.setAttribute("name","quicksagetoggle");
			quickSageOptionCheckbox.setAttribute("value","on");
			if (optionValue('doQuickSage'))
				quickSageOptionCheckbox.setAttribute("checked","checked");
			quickSageOptionLabel.appendChild(quickSageOptionCheckbox);
			quickSageOptionLabel.appendChild(quickSageOptionText);
			quickSageOptionCheckbox.addEventListener('click', function(event)
			{
				toggleOption('doQuickSage');
			}, false);
			optionsDiv.appendChild(quickSageOptionLabel);

			optionsDiv.appendChild(document.createElement('br'));

			// Global Expansion Links Option
			var globalExpansionOptionLabel = document.createElement('label');
			var globalExpansionOptionText = document.createTextNode(" Enable Global Expansion Links");
			var globalExpansionOptionCheckbox = document.createElement('input');
			globalExpansionOptionCheckbox.setAttribute("type","checkbox");
			globalExpansionOptionCheckbox.setAttribute("name","globalexpansiontoggle");
			globalExpansionOptionCheckbox.setAttribute("value","on");
			if (optionValue('doGlobalExpansion'))
				globalExpansionOptionCheckbox.setAttribute("checked","checked");
			globalExpansionOptionLabel.appendChild(globalExpansionOptionCheckbox);
			globalExpansionOptionLabel.appendChild(globalExpansionOptionText);
			globalExpansionOptionCheckbox.addEventListener('click', function(event)
			{
				toggleOption('doGlobalExpansion');
			}, false);
			optionsDiv.appendChild(globalExpansionOptionLabel);

			optionsDiv.appendChild(document.createElement('br'));

			// Attach division and form
			optionPanelForm.appendChild(optionsDiv);
			optionPanelWrapper.appendChild(optionPanelForm);

			// Set up option display toggling
			optionsDisplayToggleLink.addEventListener('click', function(event)
			{
				if (optionsDiv.style.display == 'none')
				{
					optionsDiv.style.display = '';
					event.target.textContent = "Hide Options";
				}
				else
				{
					optionsDiv.style.display = 'none';
					event.target.textContent = "Show Options";
				}

				event.stopPropagation();
				event.preventDefault();
			}, false);

			// Set up drag-n-drop
			makeMoveableHandle(optionPanelHandle);

			// When letting go of the handle, take note of the current position and save to cookie.
			optionPanelHandle.addEventListener('mouseup', function(event)
			{
				set_cookie('wkExtOptionPanelCoordinates', this.parentNode.style.left+","+this.parentNode.style.top, 9001);
			}, false);

			document.getElementById('delform').parentNode.insertBefore(optionPanelWrapper, document.getElementById('delform'));
		}

		if (window.location.href.indexOf("/res/") == -1 && window.location.href.indexOf("/kareha.pl/") == -1) // Non-reply pages only
		{
			// Go ahead and start hiding threads ASAP.
			if (optionValue('doThreadHiding') && window.location.href.indexOf('desuchan.net') == -1 && window.location.href.indexOf('bokuchan.org') == -1)
			{
				addThreadHiding(null);				// First add the thread hiding function to the first thread, which lacks a preceding horizontal rule.

				var threadDivisions = document.evaluate('.//'+ns+"hr",document.getElementById('delform'),nsResolver,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null); 	// Grab all thread links
				for (var i=0; i<threadDivisions.snapshotLength; i++)
				{
					addThreadHiding(threadDivisions.snapshotItem(i));
				}
			}

			// Post Expansion
			if (optionValue('doPostExpansion'))
			{
				var divs = document.evaluate("//"+ns+"div[@class='abbrev']//"+ns+"a", document, nsResolver, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);	// Grab all <div>s--post expansion
				for (var i=0; i<divs.snapshotLength; i++)
				{
					createPostExpandEvent(divs.snapshotItem(i));
				}
			}

			// Thread Expansion
			if (optionValue('doThreadExpansion') || optionValue('doPartialThreadExpansion'))
			{
				var spans = document.evaluate('//'+ns+"span[@class='omittedposts']",document,nsResolver,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null); // Grab all <span>s--thread expansion
				for (var i=0; i<spans.snapshotLength; i++)
				{
					var replyUrl = null;
					var currentSpan = spans.snapshotItem(i);
					if (window.location.href.indexOf("2ch.ru/") == -1 && window.location.href.indexOf("deadgods.net/") == -1 && window.location.href.indexOf("kaede.iichan.net/") == -1)
					{
						var linkSet = document.evaluate('preceding-sibling :: '+ns+"a[@href]",currentSpan,nsResolver,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
						replyUrl = linkSet.snapshotItem(linkSet.snapshotLength-1).getAttribute('href');
					}
					else
					{
						var linkSet = document.evaluate('preceding-sibling :: '+ns+"span//"+ns+"a[@href]",currentSpan,nsResolver,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
						replyUrl = linkSet.snapshotItem(linkSet.snapshotLength-1).getAttribute('href');
					}	

					replyUrlRegExp = (karehaBoard) ? new RegExp ("/kareha.pl/(\\d+)") : new RegExp ("res\\/(\\d+)\\.");
					threadOp = replyUrlRegExp.exec(replyUrl)[1];
			
					var expandDiv = document.createElement("div");
					expandDiv.setAttribute("class", "threadexpand");
					currentSpan.parentNode.insertBefore(expandDiv, currentSpan.nextSibling);

					// The first post actually shown on the page is in the following table's anchor
					var upperLimit = document.evaluate('following :: '+ns+"table//"+ns+"a[@name]",currentSpan,nsResolver,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0).getAttribute("name");

					if (optionValue('doPartialThreadExpansion'))
					{
						var partialThreadLink = document.createElement("a");
						partialThreadLink.setAttribute("href", replyUrl);
						var partialThreadLinkText = document.createTextNode("[Show Latest "+optionValue('partialThreadExpansionLimit')+"]");
						partialThreadLink.appendChild(partialThreadLinkText);
						partialThreadLink.setAttribute("class", "partialthreadexpandlink");
						currentSpan.appendChild(partialThreadLink);
			
						createThreadExpandEvent(expandDiv, replyUrl, threadOp, upperLimit, partialThreadLink, true);
					}

					currentSpan.appendChild(document.createTextNode("\u00A0"));

					if (optionValue('doThreadExpansion'))
					{
						var threadLink = document.createElement("a");
						threadLink.setAttribute ("href", replyUrl);
						var threadLinkText = document.createTextNode("[Expand]");
						threadLink.appendChild(threadLinkText);
						threadLink.setAttribute("class", "threadexpandlink");
						currentSpan.appendChild(threadLink);
			
						createThreadExpandEvent(expandDiv, replyUrl, threadOp, upperLimit, threadLink, false);
					}
				}
			}

			if (optionValue('doQuickReply'))
			{
				// Quick Reply to Thread OPs
				var links = document.evaluate('.//'+ns+"a[@href]",document.getElementById('delform'),nsResolver,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
				for (var i=0; i<links.snapshotLength; i++)
				{
					addOPQuickReply(links.snapshotItem(i));
				}

				// Quick Reply to Thread Replies
				var tables = document.getElementById('delform').getElementsByTagName("table");
				for (var i=0; i<tables.length; i++)
				{	
					addQuickReply(tables[i]);
				}
			}
		}

				window.addEventListener('unload', function(event)
				{
					if (lastQuickReply[1])
					{
						saveQuickReply(lastQuickReply[1]);
					}
				}, false);

		// Image Expansion
		if (optionValue('doImageExpansion'))
		{
			var images = document.evaluate('//'+ns+"img[@class='thumb']",document,nsResolver,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null); // Grab all images--image expansion
			for (var i=0; i<images.snapshotLength; i++)
			{
				setUpImageForExpansion(images.snapshotItem(i));
			}
		}

		// Quick Sage
		if ((optionValue('doQuickSage') && window.location.href.indexOf('/res/') != -1 || window.location.href.indexOf("/kareha.pl/") != -1) && document.getElementById('postform')) // Reply pages only.
		{
			addQuickSage(document.getElementById('postform'));
		}

		// Create global expansion links
		// Global Thread Expansion
		if (window.location.href.indexOf("/res/") == -1 && window.location.href.indexOf("/kareha.pl/") == -1 && optionValue('doThreadExpansion') && optionValue('doGlobalExpansion')) 
		{
			var expandThreads = document.createElement("a");
			expandThreads.setAttribute("href", "#");
			expandThreads.textContent = 'Expand all threads';
			expandThreads.setAttribute("class", "expandthreadslink");
			document.getElementById('delform').parentNode.insertBefore(expandThreads,document.getElementById('delform'));
		
			expandThreads.addEventListener('click', function(event)
			{
				var links = (event.target.getAttribute("class") == "expandthreadslink") ? // Grab all thread expand or collapse links
					document.evaluate('//'+ns+"a[@class='threadexpandlink']",document,nsResolver,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null)
					: document.evaluate('//'+ns+"a[@class='threadcollapselink']",document,nsResolver,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

				for (var i=0; i<links.snapshotLength; i++) // Simulate click
				{
					if (links.snapshotItem(i).parentNode.style.display != "none") // If expand or collapse link is "active..."
					{
						var evObj = document.createEvent('MouseEvents');
						evObj.initMouseEvent( 'click', false, true, window, 0,0,0,0,0, false, false, true, false, 0, null  );
						links.snapshotItem(i).dispatchEvent(evObj);
					}
				}
		
				event.target.textContent = (event.target.getAttribute("class") == "expandthreadslink") ? "Collapse all threads" : 'Expand all threads';
				event.target.setAttribute("class", (event.target.getAttribute("class") == "expandthreadslink") ? "collapsethreadslink" : "expandthreadslink");
		
				event.stopPropagation();
				event.preventDefault();
			}, false);

			// Add line break for following image expansion link
			document.getElementById('delform').parentNode.insertBefore(document.createElement("br"),document.getElementById('delform'));
		}

		// Global Image Expansion
		if (optionValue('doImageExpansion') && optionValue('doGlobalExpansion'))
		{
			var expandAll = document.createElement("a");
			expandAll.setAttribute("href", "#");
			expandAll.textContent = 'Expand all images';
			expandAll.setAttribute("class", "expandimageslink");
			document.getElementById('delform').parentNode.insertBefore(expandAll,document.getElementById('delform'));
		
			expandAll.addEventListener('click', function(event)
			{
				var allImages = (event.target.getAttribute("class") == "expandimageslink") ? 		// Grab images to expand or collapse.
					document.evaluate('//'+ns+"img[@class='thumb']",document,nsResolver,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null)
					: document.evaluate('//'+ns+"img[@class='thumb expanded']",document,nsResolver,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
				for (var i=0; i<allImages.snapshotLength; i++) 					// Simulate clicks on the images.
				{
					var evObj = document.createEvent('MouseEvents');				// Create automatic mouse click event.
					evObj.initMouseEvent( 'click', false, true, window, 1, 12, 345, 7, 220, false, false, true, false, 0, null )
					allImages.snapshotItem(i).dispatchEvent(evObj);
				}

				if (optionValue('doPartialImageExpansion') && optionValue('doFullImageExpansionOnSecondClick') && event.target.getAttribute("class") != "expandimageslink")		// Next, handle partially expanded images if collapsing.
				{
					var allPartiallyExpandedImages = document.evaluate('//'+ns+"img[@class='thumb partiallyexpanded']",document,nsResolver,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
					for (var j=0; j<allPartiallyExpandedImages.snapshotLength; j++) 		// Simulate clicks on the images.
					{
						var firstEvObjForPartialImages = document.createEvent('MouseEvents');
						firstEvObjForPartialImages.initMouseEvent( 'click', false, true, window, 1, 12, 345, 7, 220, false, false, true, false, 0, null )
						allPartiallyExpandedImages.snapshotItem(j).dispatchEvent(firstEvObjForPartialImages);
						var secondEvObjForPartialImages = document.createEvent('MouseEvents');
						secondEvObjForPartialImages.initMouseEvent( 'click', false, true, window, 1, 12, 345, 7, 220, false, false, true, false, 0, null )
						allPartiallyExpandedImages.snapshotItem(j).dispatchEvent(secondEvObjForPartialImages);	// Do this twice to handle the full expansion on first click.
					}
				}
		
				event.target.textContent = (event.target.getAttribute("class") == "expandimageslink") ? "Collapse all images" : 'Expand all images';
				event.target.setAttribute("class", (event.target.getAttribute("class") == "expandimageslink") ? "collapseimageslink" : "expandimageslink");
		
				event.stopPropagation();
				event.preventDefault();
			}, false);	
		}

		// Add extra rule if we have global expansion links available.
		if (optionValue('doGlobalExpansion') && (optionValue('doImageExpansion') || optionValue('doThreadExpansion')))
			document.getElementById('delform').parentNode.insertBefore(document.createElement("hr"),document.getElementById('delform'));

		// Key Detection
		document.addEventListener('keydown', function(event) 
		{
			if (event.keyCode == 18 || event.keyCode == 17) // When ctrl or alt is pressed...
				specialKeyIsDown = true; // set this condition.
		},false);

		document.addEventListener('keyup', function(event) 
		{
			specialKeyIsDown = false;
		},false);

		window.addEventListener('blur', function(event) 
		{
			specialKeyIsDown = false;
		},false);

		window.addEventListener('focus', function(event) 
		{
			specialKeyIsDown = false;
		},false);
	}
}

// The next two functions are the same as in Wakaba's Javascript, credits to !Waha.06x36
function get_cookie(name) 
{
	with(document.cookie)
	{
		var regexp=new RegExp("(^|;\\s+)"+name+"=(.*?)(;|$)");
		var hit=regexp.exec(document.cookie);
		if(hit&&hit.length>2) return unescape(hit[2]);
		else return '';
	}
}

function set_cookie(name,value,days)
{
	if(days)
	{
		var date=new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires="; expires="+date.toGMTString();
	}
	else expires="";
	document.cookie=name+"="+value+expires+"; path=/";
}

// String prototype methods for encoding and decoding UTF-8 strings for cookie storage.
// Based on code from http://www.webtoolkit.info/javascript-url-decode-encode.html
String.prototype.urlEncode = function()
{
	string = this.replace(/\r\n/g,"\n");
	var utftext = "";

	for (var n = 0; n < string.length; n++) 
	{
		var c = string.charCodeAt(n);

		if (c < 128) 
		{
			utftext += String.fromCharCode(c);
		}
		else if ((c > 127) && (c < 2048))
		{
			utftext += String.fromCharCode((c >> 6) | 192);
			utftext += String.fromCharCode((c & 63) | 128);
		}
		else
		{
			utftext += String.fromCharCode((c >> 12) | 224);
			utftext += String.fromCharCode(((c >> 6) & 63) | 128);
			utftext += String.fromCharCode((c & 63) | 128);
		}
	}

	return escape(utftext);
}

String.prototype.urlDecode = function()
{
	var utftext = unescape(this);
	var string = "";
	var i = 0;
	var c = c1 = c2 = 0;

	while ( i < utftext.length ) 
	{
		c = utftext.charCodeAt(i);

		if (c < 128) 
		{
			string += String.fromCharCode(c);
			i++;
		}
		else if((c > 191) && (c < 224))
		{
			c2 = utftext.charCodeAt(i+1);
			string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
			i += 2;
		}
		else
		{
			c2 = utftext.charCodeAt(i+1);
			c3 = utftext.charCodeAt(i+2);
			string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
			i += 3;
		}
	}

	return string;
}

// Another string prototype method: Add a random query parameter at the end of the string. (Does not include "?")
String.prototype.addRandomQueryString = function() { return this+"desu="+Math.floor(Math.random()*300); }

// Acquire the board directory--useful for board-specific cookies
function getBoardPath()
{
	var documentLocation = window.location.href;
	var pathMatch = new RegExp (":\\/\\/.*?\\/(.*)\\/");		// This will indeed grab the *full* path. For example www.fakeimageboard.com/suigintou/is/loev/ will have "suigintou/is/loev" returned.
	if (pathMatch.test(documentLocation))
	{
		return pathMatch.exec(documentLocation)[1];
	}
	else
	{
		return '/';					// Root directory. Might be possible somewhere.
	}
}

// Function for holding the current post field names, for customizing per website; does not include CAPTCHA field
function postFieldsForSite()
{
	var postFields;

	if (window.location.href.indexOf("desuchan.net/") != -1 || window.location.href.indexOf("bokuchan.org/") != -1) // Post fields for Desuchan/Bokuchan.
	{
		postFields = new Array ("field1", "email", "subject", "comment", "file", "password");
	}
	else if (window.location.href.indexOf("2ch.ru/") != -1) // 2ch.ru renames its post fields after Ranma 1/2 characters.
	{
		postFields = new Array ("akane", "nabiki", "kasumi", "shampoo", "file", "password");
	}
	else if (window.location.href.indexOf("iichan.ru/") != -1) // iichan.ru is clearly operated by cats.
	{
		postFields = new Array ("nya1", "nya2", "nya3", "nya4", "file", "password");
	}
	else if (window.location.href.indexOf("deadgods.net/") != -1 || window.location.href.indexOf("kaede.iichan.net/") != -1 || window.location.href.indexOf("liarpedia.org/") != -1) // These are boards running on Kareha in default Wakaba mode.
	{
		postFields = new Array ("field_a", "field_b", "title", "comment", "file", "password");
	}
	else if (window.location.href.indexOf("teamtao.com/") != -1 || window.location.href.indexOf("1chan.net/") != -1 || window.location.href.indexOf("wakachan.org/") != -1) // These boards are running on an older version of Wakaba.
	{
		postFields = new Array ("name", "email", "subject", "comment", "file", "password");
	}
	else // Wakaba 3.0.7 post fields
	{
		postFields = new Array ("field1", "field2", "field3", "field4", "file", "password");
	}

	return postFields;
}

function setUpImageForExpansion(imageToHandle)
{
	thumbUrl = imageToHandle.getAttribute("src"); // grab the thumb source,
	
	thumbHeight = imageToHandle.getAttribute("height"); // grab the thumb height,
	thumbWidth = imageToHandle.getAttribute("width"); // and grab the thumb width.
	
	var parentLink = imageToHandle.parentNode; // Then it's time to grab the link....
	
	var expandUrl = parentLink.getAttribute("href"); // We also want the URL, of course.
	var testUrl = new RegExp ("(\\.|%2e)(jpg|jpeg|png|gif|bmp|tif)$",'i');
	if (!testUrl.test(expandUrl))
		return; // I shouldn't mess with the thumbnail if it's not an image link.

	fileDimensionsRegExp = new RegExp ("(\\d+)\\s*[x\u00D7]\\s*(\\d+)"); // This is how Wakaba formats its file dimensions.

	// To grab the new width and height now, though, one must first appeal to the file info nearby....
	var linkSet = document.evaluate('preceding-sibling :: '+ns+"span[@class='filesize']",parentLink,nsResolver,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	var fileInfo = linkSet.snapshotItem(linkSet.snapshotLength-1);
	var fileDimensions = fileInfo.textContent;

	fileDimensionsMatch = fileDimensionsRegExp.exec(fileDimensions);
	expandWidth = fileDimensionsMatch[1];
	expandHeight = fileDimensionsMatch[2];

	// Create loading message
	var loadScreen = document.createElement("div");
	loadScreen.setAttribute('class','imageloadingmessage');
	loadScreen.style.fontSize = "20px";
	loadScreen.style.backgroundColor="red";
	loadScreen.style.color="white";
	loadScreen.style.padding = "5px 5px 5px 5px";
	loadScreen.style.position = "relative";
	loadScreen.style.left = "20px";
	loadScreen.style.top = "0px";
	loadScreen.style.width = "200px";
//	imageToHandle.style.marginTop="20px";
//	loadScreen.style.marginRight = thumbWidth + "px";
	loadScreen.style.zIndex = "255";
	imageToHandle.style.zIndex = "250";
	var loadText = document.createTextNode("(\u00B4\u30FB\u03C9\u30FB`) Loading!"); 
	loadScreen.appendChild(loadText);
	loadScreen.style.display = 'none';
	var loadMessage=parentLink.parentNode;
	loadMessage.insertBefore(loadScreen,parentLink);

	addClickListenerToImage(imageToHandle, loadScreen, expandHeight, expandWidth, expandUrl, thumbHeight, thumbWidth, thumbUrl);
	hideLoadMessage(imageToHandle, loadScreen);

	function addClickListenerToImage(currentImage, loadMessage, srcHeight, srcWidth, srcUrl, currentHeight, currentWidth, currentUrl)
	{
		imageToHandle.addEventListener('click', imgReplace = function(event) 
		{  
			replaceImage(event.target, loadMessage, srcHeight, srcWidth, srcUrl, currentHeight, currentWidth, currentUrl); 

			if (!specialKeyIsDown) // If alt or ctrl is being held, this will be skipped so that the desired action will happen.
			{
				event.stopPropagation();
				event.preventDefault();
			}
		}, false);
	}

	function replaceImage(img, loadMessage, newHeight, newWidth, newUrl, oldHeight, oldWidth, oldUrl) 
	{ 
		var doNotShowLoadMessage;					// Boolean variable
		if (img.getAttribute("class") != "thumb expanded") 		// If we are expanding...
		{
			// If we are doing a partial expansion first...
			if (optionValue('doPartialImageExpansion') && img.getAttribute("width") < optionValue('partialImageExpansionWidthLimit') && newWidth >= optionValue('partialImageExpansionWidthLimit') && oldWidth <= optionValue('partialImageExpansionWidthLimit'))
			{
				img.setAttribute("height", Math.floor(optionValue('partialImageExpansionWidthLimit')*newHeight/newWidth));
				img.setAttribute("width", optionValue('partialImageExpansionWidthLimit'));
				img.setAttribute("src", newUrl); // Then load new.
				if (optionValue('doFullImageExpansionOnSecondClick'))		// Change class name of image. If expanding on second click, give intermediate name.
				{
					img.setAttribute("class", "thumb partiallyexpanded");
				}
				else
				{
					img.setAttribute("class", "thumb expanded");
				}
			}
			// Other
			else
			{
				img.setAttribute("height", newHeight);
				img.setAttribute("width", newWidth); 			// Stretchcurrent image.
				img.setAttribute("src", newUrl);			 // Then load new.
				if (img.getAttribute("class") == "thumb partiallyexpanded")
					doNotShowLoadMessage = true;		// If we are expanding further, the source will not be changed. In this case, the image need not reload, so we may have to hide the loading message manually. (Fix for Opera.)
				img.setAttribute("class", "thumb expanded");		// Change class name of image
			}

			if (!doNotShowLoadMessage)	
			{
				loadMessage.style.display = "";
				loadMessage.style.marginRight = newWidth + "px";
				img.style.marginTop="-30px";
//				img.style.opacity = ".5";
			}
		}
		else // If image was already expanded...
		{
			img.setAttribute("height", oldHeight);
			img.setAttribute("width", oldWidth); // Re-compress current image.
			img.setAttribute("src", oldUrl); // Then load thumbnail.
	
			// Change class name of image
			img.setAttribute("class", "thumb");
	
			loadMessage.style.display = "";
			loadMessage.style.marginRight = newWidth + "px";
			img.style.marginTop="-20px";
//			img.style.opacity = ".5";
		}
	 }
	
	function hideLoadMessage(loadedImage, loadAnnounce)
	{
		loadedImage.addEventListener('load', function(event) 
			{
			loadAnnounce.style.display = 'none';
			this.style.marginTop="";
	//		event.target.style.opacity = "1.0";
		}, false);
	}
}

function createThreadExpandEvent(threadDiv, replyLink, threadNumber, threadLimit, expandLink, partial)
{
	expandLink.addEventListener('click', function(event)
	{
		expandThread(threadDiv, replyLink, threadNumber, threadLimit, expandLink, partial);

		event.stopPropagation();
		event.preventDefault();
	}, false);
	
	function expandThread(threadDiv, reply, threadNum, threadUpperLimit, expandLink, partial)
	{
		var oldSpan = expandLink.parentNode;
		oldSpan.style.display = "none"; // Hide omitted posts text
		var newSpanLoading = document.createTextNode("(\u00B4\u30FB\u03C9\u30FB`) Loading!"); // Create new text in place.
		var newSpan = document.createElement("span");
		newSpan.setAttribute("class","omittedposts");
		newSpan.appendChild(newSpanLoading);
		threadDiv.parentNode.insertBefore(newSpan, oldSpan.nextSibling);	
	
		var xmlHttp = new XMLHttpRequest();		// AJAX TIEM!
		xmlHttp.onreadystatechange = function() 
		{ 
			if (xmlHttp.readyState==4)		// When we get a response.....
			{ 
				switch (xmlHttp.status)	
				{
					case 200:			// check the status code.
						var startingPoint;
						if (xmlHttp.getResponseHeader("Content-Type").indexOf("xml") != -1) // Pages served as XML/XHTML
						{
							var replyPage = xmlHttp.responseXML.documentElement;
							var replyBoxes = xmlHttp.responseXML.evaluate('.//'+ns+"td[@class and @id and contains(@class,'reply')]",replyPage,nsResolver,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);

							startingPoint = (partial) ? replyBoxes.snapshotLength - optionValue('partialThreadExpansionLimit') : 0;
							if (startingPoint < 0)
								startingPoint = 0;

							for (var j=startingPoint; j<replyBoxes.snapshotLength; j++)
							{
								var replyNumberRegExp = new RegExp ("reply(\\d+)$");
								var currentThread = (replyNumberRegExp.exec(replyBoxes.snapshotItem(j).getAttribute("id")))[1];
								if (parseInt(currentThread)<parseInt(threadUpperLimit))
								{
									var tableBlock = document.createElement("table");
									var tableBody = document.createElement("tbody");
									var tableRow = document.createElement("tr");
									var tableDoubleDash = document.createElement("td");
									tableDoubleDash.setAttribute("class","doubledash");
									var doubleDash = document.createTextNode(">>");
									tableDoubleDash.appendChild(doubleDash);
									tableRow.appendChild(tableDoubleDash);
									tableRow.appendChild(replyBoxes.snapshotItem(j));
									tableBody.appendChild(tableRow);
									tableBlock.appendChild(tableBody);
									threadDiv.appendChild(tableBlock);
								}
							}
						}
						else // Pages served as text/html.
						{
							var replyPage = xmlHttp.responseText;
							var contentToPutIn = "";
	
							var currentPost = replyPage.match("<table><tbody><tr><td class=\\\"doubledash\\\">[^\0]*?<td class=\\\"reply\\\" id=\\\"reply\\d+\\\">[^\0]*?</table>", "g"); 
							// currentPost is now an array of all of the grabbed posts.

							startingPoint = (partial) ? currentPost.length - optionValue('partialThreadExpansionLimit') : 0;
							if (startingPoint < 0)
								startingPoint = 0;	

							for (var j=startingPoint; j < currentPost.length; j++)
							{
								var grabPostNumber = new RegExp ("<td class=\\\"reply\\\" id=\\\"reply(\\d+)\\\">"); // Grab subpattern containing post number.
								var postNumber = grabPostNumber.exec(currentPost[j])[1];

								if (parseInt(postNumber)<parseInt(threadUpperLimit))
								{
									// Add in current post to the division where the new content will appear
									// Some things are not matched by the regular expression, so they are prefixed here.
									// contentToPutIn += "<table><tbody><tr><td class=\"doubledash\">&gt;&gt;</td> ";
									if (window.location.href.indexOf('bokuchan.org/') != -1)
									{
										var re = new RegExp("<form[^\0]*</form>", "g");
										currentPost[j] = currentPost[j].replace(re," ");
									} // This is a temporary fix for Bokuchan until either Photoshop_Addict or I get rid of that nasty embedded form.
									contentToPutIn += currentPost[j]; 
								}
							}

							threadDiv.innerHTML = contentToPutIn;		
						}

						if (optionValue('doImageExpansion'))	// Handle expansion for all new images.
						{
							var newImages = document.evaluate(".//" + ((window.location.href.indexOf('kaede.iichan.net/') != -1) ? 'h:' : ns) +"img[@class='thumb']",threadDiv,nsResolver,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null); // A special exception is made for this site due to inconsistent Content-Types affecting namespaces across the DOM after thread expansion.
							for (var i=0; i<newImages.snapshotLength; i++)
							{
								setUpImageForExpansion(newImages.snapshotItem(i));
							}
						}

						if (optionValue('doQuickReply'))	// Handle quick reply for all new tables.
						{
							var newTables = threadDiv.getElementsByTagName("table"); 
							for (var i=0; i<newTables.length; i++)
							{
								if (newTables[i].getElementsByTagName("blockquote")[0])
								{
									var thisTableHasImage = false;
									if (document.evaluate('count(.//' + ((window.location.href.indexOf('kaede.iichan.net/') != -1) ? 'h:' : ns) + "span[@class='filesize'])",newTables[i],nsResolver,1,null).numberValue > 0)
										thisTableHasImage = true; // If file message is here, then this reply has an attachment.

									var thePlaceToPrependLink;

									if (thisTableHasImage)
									{  
										if (window.location.href.indexOf("bokuchan.org/") != -1 || window.location.href.indexOf("desuchan.net/") != -1)
										{
											thePlaceToPrependLink = document.evaluate(".//"+ns+"br",newTables[i],nsResolver,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);
										}
										else
										{
											thePlaceToPrependLink = document.evaluate(".//"+ns+"span[@class='reflink']",newTables[i],nsResolver,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0).nextSibling;
										}
									}
									else
									{
										if (window.location.href.indexOf("bokuchan.org/") != -1 || window.location.href.indexOf("desuchan.net/") != -1) // Desuchan/Bokuchan lacks the extra text padding other sites have before the post body.
										{
											thePlaceToPrependLink = newTables[i].getElementsByTagName("blockquote")[0];
										}
										else
										{
											thePlaceToPrependLink = newTables[i].getElementsByTagName("blockquote")[0].previousSibling;
										}
									}

									var leftBracket = document.createTextNode("\u00A0[");
									newTables[i].getElementsByTagName("blockquote")[0].parentNode.insertBefore(leftBracket, thePlaceToPrependLink);
									var myQuickReplyLink = document.createElement("a");
									myQuickReplyLink.setAttribute("href", "#");
									var myQuickReplyText = document.createTextNode("Quick Reply");
									myQuickReplyLink.appendChild(myQuickReplyText);
									newTables[i].getElementsByTagName("blockquote")[0].parentNode.insertBefore(myQuickReplyLink, thePlaceToPrependLink);
									var rightBracket = document.createTextNode("]");
									newTables[i].getElementsByTagName("blockquote")[0].parentNode.insertBefore(rightBracket, thePlaceToPrependLink);
									var myQuickReplyDiv = document.createElement("div");
									newTables[i].parentNode.insertBefore(myQuickReplyDiv,newTables[i].nextSibling);
									var myReplyNumber = newTables[i].getElementsByTagName("a")[0].getAttribute("name");

									var parentNumber;
									var niChannelStyleLinkTest = new RegExp ("\\/(\d+)\\/$")
									if (niChannelStyleLinkTest.test(expandLink)) // Thread is 2ch-style; thread number is different.
									{
										parentNumber = niChannelStyleLinkTest.exec(expandLink)[1];
									}
									else
									{
										parentNumber = threadNum;
									}
		
									createQuickReplyEvent(myQuickReplyLink, myQuickReplyDiv, parentNumber, myReplyNumber, expandLink);
								}
							}
						}

						// Grab the page extension from reply link (usually html)
						var extension = reply.match( /\.([^\.]*)$/)[1];

						// Convert all post numbers in the new header to a consistent URL and insert text into the quick reply area, if any
						var postMatch = new RegExp ("\\('\\>\\>(\\d+)'\\)");
						var linksInDiv = document.evaluate('.//'+ns+"a[contains(@href,'javascript:') or contains(@href,'#i')]",threadDiv,nsResolver,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
						for (var i = 0; i<linksInDiv.snapshotLength;i++)
						{
							if (postMatch.test(linksInDiv.snapshotItem(i).getAttribute("href")))
							{
								var postNumber = postMatch.exec(linksInDiv.snapshotItem(i).getAttribute("href"))[1];
								linksInDiv.snapshotItem(i).setAttribute('href','res/'+threadNum+'.'+extension+'#i'+postNumber);
							}
							if (document.getElementById('quickreplytextarea'))
							{
								convertPostLink(document.getElementById('quickreplytextarea'),linksInDiv.snapshotItem(i));
							}
						}

						// Convert >>1 links to link to the posts already present now. I find this more intuitive than having them link to the reply page.
						var refLinks = document.evaluate(".//"+ns+"a[@href and contains(@href,'"+threadNum+"')]",document.getElementById('delform'),nsResolver,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
						var linkTest = new RegExp ("res\\/"+threadNum+"\\."+extension+"(\\#\\d+)$");
						for (var i = 0; i<refLinks.snapshotLength; i++)
						{
							var currentLink = refLinks.snapshotItem(i);
							if (linkTest.test(currentLink.getAttribute("href")) && currentLink.textContent.indexOf(">>") != -1) // Prevent from stumbling onto other types of links such as those for viewing entire posts, the [Reply] links, etc.
							{
								var switchUrl= linkTest.exec(currentLink.getAttribute("href"));
								currentLink.setAttribute("href", switchUrl[1]);
								currentLink.setAttribute("class", "convertedurl "+switchUrl[0]); // Probably not the best solution
							}
							else if (currentLink.getAttribute("href") == reply && currentLink.textContent.indexOf(">>") != -1)
							{
								currentLink.setAttribute("href", "#"+threadNum);
								currentLink.setAttribute("class", "convertedurl "+reply); // Probably not the best solution
							}
						}
						if (partial)
						{
							newSpan.textContent = "Showing Last " +optionValue('partialThreadExpansionLimit')+ " Replies ";
						}
						else
						{
							newSpan.textContent = "Showing All Posts ";
						}
						newSpan.setAttribute('class',"omittedposts");
						var undoLinkText = document.createTextNode("[Collapse]");
						var undoLink = document.createElement("a");
						undoLink.setAttribute("href", "#");
						undoLink.setAttribute("class", "threadcollapselink");
						undoLink.appendChild(undoLinkText);
						newSpan.appendChild(undoLink);

						undoLink.addEventListener('click', function(event) // Create a thread collapse event.
						{
							while (threadDiv.firstChild)
							{
								threadDiv.removeChild(threadDiv.firstChild);
							}
	
							oldSpan.parentNode.removeChild(newSpan);
							oldSpan.style.display = "";

							var linksToUnconvert = threadDiv.parentNode.getElementsByTagName("a"); // Convert >>1 links back to what they were
							var classCheck = new RegExp ("^convertedurl\\s+(.*/"+threadNum+"\\.\\w+ml.*)$");
							for (var i = 0; i<linksToUnconvert.length; i++)
							{
								if (linksToUnconvert[i].getAttribute("class") && classCheck.test(linksToUnconvert[i].getAttribute("class")))
								{
									linksToUnconvert[i].setAttribute("href", classCheck.exec(linksToUnconvert[i].getAttribute("class"))[1]);
									linksToUnconvert[i].setAttribute("class", "");
								}
							}

							event.stopPropagation();
							event.preventDefault();
						}, false);

						break;

					case 404:
						alert('Thread no longer exists.');
						break;

					case 403:
						alert('HTTP Forbidden error. (Possible ban?)');
						break;

					default:
						alert('Server status: '+xmlHttp.status);
				}
			}
		}
	
		xmlHttp.open("GET", reply, true);
		xmlHttp.send(null);
	}
}

function createPostExpandEvent(link)
{
	link.addEventListener('click', function(event)
	{
		expandPost(event.target);

		event.stopPropagation();
		event.preventDefault();
	}, false);
	
	function expandPost(link)
	{
		var parentQuote = link.parentNode.parentNode;
		var parentPost = parentQuote.parentNode;
	
		var linkToReplyRegExp = new RegExp ("/\\d+\\..*\\#(\\d+)$"); // Capture post ID
		var linkToThreadRegExp = new RegExp ("/(\\d+)\\..*$"); // Capture thread ID
		var linkToReply = link.getAttribute('href');
		var replyNumber;
		var isReply;
	
		if (linkToReplyRegExp.test(linkToReply)) // Reply post--grab reply ID
		{
			replyNumber = linkToReplyRegExp.exec(linkToReply)[1];
			isReply = true;
		}
		else // OP--grab thread ID
		{
			replyNumber = linkToThreadRegExp.exec(linkToReply)[1];
			isReply = false;
		}
	
		var xmlHttp = new XMLHttpRequest(); // AJAX TIEM!
		xmlHttp.onreadystatechange = function() 
		{ 
			if (xmlHttp.readyState==4) // When we get a response.....
			{ 
				switch (xmlHttp.status)
				{
				case 200:
				if (xmlHttp.getResponseHeader("Content-Type").indexOf("xml") != -1) // Pages served as XML/XHTML
				{
					var replyPage = xmlHttp.responseXML.documentElement;
					var fullReply;
					if (isReply)
					{
						var replyBoxes = replyPage.getElementsByTagName("td"); // smrt nam iz smrt!
						for (var j=0; j<replyBoxes.length; j++)
						{
							if (replyBoxes[j].getElementsByTagName("a")[0] && replyBoxes[j].getElementsByTagName("a")[0].getAttribute("name") == replyNumber)
							{
								fullReply = replyBoxes[j].getElementsByTagName("blockquote")[0];
							}
						}
					}
					else
					{
						fullReply = replyPage.getElementsByTagName("blockquote")[0];
					}
					parentPost.replaceChild(fullReply, parentQuote);
				}
				else // Pages served as text/html.
				{
					var replyPage = xmlHttp.responseText;
					var newContent;
					replyPageReplyQuoteGrab = new RegExp ("<td class=\\\"reply\\\" id=\\\"reply"+replyNumber+"\\\">[^\0]*?<blockquote>(([^\0]*?(<blockquote class = \\\"unkfunc\\\">[^\0]*?</blockquote>)*[^\0]*?)*?)</blockquote>[^\0]*</td>");
					replyPageOPQuoteGrab = new RegExp ("[^\0]*?<blockquote>(([^\0]*?(<blockquote class = \\\"unkfunc\\\">[^\0]*?</blockquote>)*[^\0]*?)*?)</blockquote>[^\0]*<td>");
					if (isReply)
					{
						newContent = replyPageReplyQuoteGrab.exec(replyPage)[1];
					}
					else
					{
						newContent = replyPageOPQuoteGrab.exec(replyPage)[1];
					}
					parentQuote.innerHTML = newContent;
				}
				break;

				case 404:
				alert('Cannot expand post: Thread no longer exists.')
				break;

				case 403:
				alert('Cannot expand post: Forbidden. (Possible ban?)');
				break;

				default:
				alert('Cannot expand post: HTTP Server status '+xmlHttp.status);
				break;
				}
			}
		}
	
		xmlHttp.open("GET", linkToReply, true);
		xmlHttp.send(null);
	}
}

function addQuickReply(table)
{
	if (table.getElementsByTagName("blockquote")[0])
	{
		var linkToReplyRegExp = (karehaBoard) ? new RegExp ("\\'>>(\\d+)\\'.*\\/(\\d+)\\/\\'\\)$") : new RegExp ("/(\\d+)\\..*\\#i(\\d+)$"); // First group: thread ID; second group: post ID
		var linkToReply = document.evaluate(".//"+ns+"span[@class='reflink']//"+ns+"a[@href]",table,nsResolver,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0).getAttribute("href"); // Grab reference link from which to extract the reply and thread ID.
		var tableHasImage = false;
		if (document.evaluate('count(.//'+ns+"span[@class='filesize'])",table,nsResolver,1,null).numberValue > 0)
			tableHasImage = true; // If file message is here, then this reply has an attachment.

		var placeToPrependLink;
		if (tableHasImage)
		{  
			if (window.location.href.indexOf("bokuchan.org/") != -1 || window.location.href.indexOf("desuchan.net/") != -1)
			{
				placeToPrependLink = document.evaluate(".//"+ns+"br",table,nsResolver,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);
			}
			else
			{
				placeToPrependLink = document.evaluate(".//"+ns+"span[@class='reflink']",table,nsResolver,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0).nextSibling;
			}
		}
		else
		{
			if (window.location.href.indexOf("bokuchan.org/") != -1 || window.location.href.indexOf("desuchan.net/") != -1) // Desuchan/Bokuchan lacks the extra text-padding other sites have.
			{
				placeToPrependLink = table.getElementsByTagName("blockquote")[0];
			}
			else
			{
				placeToPrependLink = table.getElementsByTagName("blockquote")[0].previousSibling;
			}
		}

		var linkToReplyData = linkToReplyRegExp.exec(linkToReply);
		var extractedThreadNumber = (karehaBoard) ? linkToReplyData[2] : linkToReplyData[1];
		var extractedReplyNumber = (karehaBoard) ? linkToReplyData[1] : linkToReplyData[2];
		var leftBracket = document.createTextNode("\u00A0["); // \u00A0 corresponds with entity "&nbsp;"
		table.getElementsByTagName("blockquote")[0].parentNode.insertBefore(leftBracket, placeToPrependLink);
		var quickReplyLink = document.createElement("a"); // Add quick reply link.
		quickReplyLink.setAttribute("href", '#');
		quickReplyLink.setAttribute("class", "quickreplylink");
		var quickReplyText = document.createTextNode("Quick Reply");
		quickReplyLink.appendChild(quickReplyText);
		table.getElementsByTagName("blockquote")[0].parentNode.insertBefore(quickReplyLink, placeToPrependLink);
		var rightBracket = document.createTextNode("]");
		table.getElementsByTagName("blockquote")[0].parentNode.insertBefore(rightBracket, placeToPrependLink);
		var quickReplyDiv = document.createElement("div");
		quickReplyDiv.setAttribute("class", "quickreplyarea");
		table.parentNode.insertBefore(quickReplyDiv, table.nextSibling);

		createQuickReplyEvent(quickReplyLink, quickReplyDiv, extractedThreadNumber, extractedReplyNumber, linkToReply);
	}
}

function addOPQuickReply(link)
{
	replyLinkTest = (karehaBoard) ? new RegExp ("\\'>>1\\'.*\\/(\\d+)\\/\\'\\)$") : new RegExp ("/res/(\\d+)\\.\\w+ml$"); // Reply link test/extraction. In Wakaba, non-reply links in threads tend to have html (or similar extension) at the end.
	if ((!link.parentNode.getAttribute("class") || link.parentNode.getAttribute("class").indexOf("abbrev") == -1) && replyLinkTest.test(link.getAttribute("href")) && (!link.getAttribute("class") || link.getAttribute("class").indexOf("threadexpand") == -1) && link.textContent.indexOf(">>") == -1 && link.textContent.indexOf("Hidden thread") == -1 && link.textContent.indexOf("Show") == -1 && link.textContent.indexOf("http") == -1 && link.nextSibling) // Post abbreviation messages, reference links to the OP, and BBWchan's "Thread Hidden" messages also carry a URL to the reply page.
	{
		var threadID = replyLinkTest.exec(link.getAttribute("href"))[1];
		var leftBracket = document.createTextNode("\u00A0["); // \u00A0 corresponds with entity "&nbsp;"
		if (karehaBoard)
		{
			link.parentNode.parentNode.insertBefore(leftBracket, link.parentNode.nextSibling.nextSibling.nextSibling);
		}
		else
		{
			link.parentNode.insertBefore(leftBracket, link.nextSibling.nextSibling);
		}

		var attachNode = (karehaBoard) ? link.parentNode.parentNode : link.parentNode;

		var quickReplyLink = document.createElement("a");
		quickReplyLink.setAttribute("href", '#');
		quickReplyLink.setAttribute("class", "quickreplylink");
		var quickReplyText = document.createTextNode("Quick Reply");
		quickReplyLink.appendChild(quickReplyText);
		attachNode.insertBefore(quickReplyLink, leftBracket.nextSibling);
		var rightBracket = document.createTextNode("]");
		attachNode.insertBefore(rightBracket, quickReplyLink.nextSibling);

		var quickReplyDiv = document.createElement("div");
		quickReplyDiv.setAttribute("class", "quickreplyarea");
		if (window.location.href.indexOf('bbwchan.org/') != -1 || window.location.href.indexOf('2ch.ru/') != -1 || window.location.href.indexOf('iichan.ru/') != -1)
		{
			attachNode.insertBefore(quickReplyDiv, rightBracket.nextSibling);
		}
		else
		{
			attachNode.insertBefore (quickReplyDiv, rightBracket.nextSibling.nextSibling.nextSibling);
		}

		createQuickReplyEvent(quickReplyLink, quickReplyDiv, threadID, (karehaBoard) ? 1 : threadID, link.getAttribute("href"));
	}
}

function createQuickReplyEvent(link, replyDiv, threadNumber, replyNumber, url)
{
	link.addEventListener('click', quickReplySet = function(event)			// Open Quick Reply in response to click
	{
		quickReply(event.target, replyDiv, threadNumber, replyNumber, url);

		event.stopPropagation();
		event.preventDefault();
	}, false);
	
	// The Quick Reply function.
	function quickReply(link, replyDiv, threadNumber, replyNumber, replyUrl)
	{
		if (lastQuickReply)
		{
			if (lastQuickReply[3] == replyNumber) 				// If we just opened the quick reply division for the current post...
			{
				if (collapseQuickReply()) 				// then collapse the previously open quick reply division...
					return; 					// and stop if operation is successful.
			}
			else
			{
				collapseQuickReply();
			}
		}
	
		document.getElementById("delform").setAttribute("enctype", "multipart/form-data"); // Set up the deletion form to send a new post instead.
		var inputs = document.getElementById("delform").getElementsByTagName("input");
		for (var j=0; j<inputs.length; j++)
		{
			if (inputs[j].getAttribute("name") == "task" && inputs[j].getAttribute("type") != "submit")
			{
				inputs[j].setAttribute("value","post");
			}
			if (inputs[j].getAttribute("name") == "password")
			{
				inputs[j].setAttribute("name","desupassworddesu"); // Temporary filler name
			}
			if (inputs[j].getAttribute("type") == "submit")
			{
				inputs[j].addEventListener('click', function(event)
				{
					collapseQuickReply();
				}, false); // When one hits the Delete button, this new behavior must be reverted.
			}
		}
	
		var postFields = postFieldsForSite(); // Determine the post field names for this board.
	
		var replyBox = document.createElement("table");
		replyBox.setAttribute("id", "quickreplyformtable");
		replyBox.style.paddingLeft = "2em";
		replyBox.style.marginTop = "0";
		var replyBoxBody = document.createElement("tbody");
		replyBox.appendChild(replyBoxBody);
	
		var replyBoxRow = document.createElement("tr");
		replyBoxBody.appendChild(replyBoxRow);
		var replyBoxMarkColumn = document.createElement("td");
		replyBoxMarkColumn.setAttribute("class", "doubledash");
		var replyBoxMark = document.createElement("span");
		replyBoxMark.style.fontSize = "2em";
		var replyBoxMarkText = document.createTextNode("\u21B3");
		replyBoxMark.appendChild(replyBoxMarkText);
		replyBoxMarkColumn.appendChild(replyBoxMark);
		replyBoxRow.appendChild(replyBoxMarkColumn);
		var replyBoxContentColumn = document.createElement("td");
		var replyBoxContentColumnHeader = document.createElement("h3");
		replyBoxContentColumnHeader.style.fontSize = "1em";
		var replyBoxContentColumnHeaderText = document.createTextNode("Replying to "+replyNumber);
		replyBoxContentColumnHeader.appendChild(replyBoxContentColumnHeaderText);
		replyBoxContentColumn.appendChild(replyBoxContentColumnHeader);
		replyBoxRow.appendChild(replyBoxContentColumn);
	
		var replyBoxContentParent = document.createElement("input");
		replyBoxContentParent.setAttribute("type", "hidden");
		if (karehaBoard) // Kareha boards use a "thread" parameter to mark the parent thread.
		{
			replyBoxContentParent.setAttribute("name", "thread");
		}
		else
		{
			replyBoxContentParent.setAttribute("name", "parent");
		}
		replyBoxContentParent.setAttribute("value",threadNumber);
		replyBoxContentColumn.appendChild(replyBoxContentParent);
	
		var replyBoxContentPostAreaTable = document.createElement("table");
		var replyBoxContentPostAreaTBody = document.createElement("tbody");
		replyBoxContentPostAreaTable.appendChild(replyBoxContentPostAreaTBody);
		replyBoxContentColumn.appendChild(replyBoxContentPostAreaTable);
	
		var replyBoxContentPostAreaTableNameRow = document.createElement("tr");
		var replyBoxContentPostAreaTableNameRowLeftColumn = document.createElement("td");
		replyBoxContentPostAreaTableNameRowLeftColumn.setAttribute("class","postblock");
		var replyBoxContentPostAreaTableNameRowLeftColumnText = document.createTextNode("Name");
		replyBoxContentPostAreaTableNameRowLeftColumn.appendChild(replyBoxContentPostAreaTableNameRowLeftColumnText);
		var replyBoxContentPostAreaTableNameRowRightColumn = document.createElement("td");
		var replyBoxContentPostAreaTableNameRowRightColumnTextField = document.createElement("input");
		replyBoxContentPostAreaTableNameRowRightColumnTextField.setAttribute("type","text");
		replyBoxContentPostAreaTableNameRowRightColumnTextField.setAttribute("name",postFields[0]);
		replyBoxContentPostAreaTableNameRowRightColumnTextField.setAttribute("value", get_cookie("name")); // Autofill
		replyBoxContentPostAreaTableNameRowRightColumnTextField.setAttribute("size","32");
		replyBoxContentPostAreaTableNameRowRightColumnTextField.style.cssFloat='left';
		replyBoxContentPostAreaTableNameRowRightColumn.appendChild(replyBoxContentPostAreaTableNameRowRightColumnTextField);
		replyBoxContentPostAreaTableNameRow.appendChild(replyBoxContentPostAreaTableNameRowLeftColumn);
		replyBoxContentPostAreaTableNameRow.appendChild(replyBoxContentPostAreaTableNameRowRightColumn);
		replyBoxContentPostAreaTBody.appendChild(replyBoxContentPostAreaTableNameRow);
	
		var replyBoxContentPostAreaCloseLink = document.createElement("a");
		replyBoxContentPostAreaCloseLink.setAttribute('href', '#');
		replyBoxContentPostAreaCloseLink.textContent = "Cancel";
		replyBoxContentPostAreaCloseLink.style.cssFloat = 'right';
		replyBoxContentPostAreaCloseLink.style.fontSize = 'small';
		replyBoxContentPostAreaCloseLink.style.verticalAlign = 'top';
		replyBoxContentPostAreaTableNameRowRightColumn.appendChild(replyBoxContentPostAreaCloseLink);
	
		replyBoxContentPostAreaCloseLink.addEventListener('click', function(event)
		{
			collapseQuickReply();
	
			event.stopPropagation();
			event.preventDefault();
		}, false);
	
		var replyBoxContentPostAreaTableLinkRow = document.createElement("tr");
		var replyBoxContentPostAreaTableLinkRowLeftColumn = document.createElement("td");
		replyBoxContentPostAreaTableLinkRowLeftColumn.setAttribute("class","postblock");
		var replyBoxContentPostAreaTableLinkRowLeftColumnText = document.createTextNode("Link");
		replyBoxContentPostAreaTableLinkRowLeftColumn.appendChild(replyBoxContentPostAreaTableLinkRowLeftColumnText);
		var replyBoxContentPostAreaTableLinkRowRightColumn = document.createElement("td");
		var replyBoxContentPostAreaTableLinkRowRightColumnTextField = document.createElement("input");
		replyBoxContentPostAreaTableLinkRowRightColumnTextField.setAttribute("type","text");
		replyBoxContentPostAreaTableLinkRowRightColumnTextField.setAttribute("name",postFields[1]);
		replyBoxContentPostAreaTableLinkRowRightColumnTextField.setAttribute("value", get_cookie("email")); // Autofill
		replyBoxContentPostAreaTableLinkRowRightColumnTextField.setAttribute("size","32");
		replyBoxContentPostAreaTableLinkRowRightColumn.appendChild(replyBoxContentPostAreaTableLinkRowRightColumnTextField);
		replyBoxContentPostAreaTableLinkRow.appendChild(replyBoxContentPostAreaTableLinkRowLeftColumn);
		replyBoxContentPostAreaTableLinkRow.appendChild(replyBoxContentPostAreaTableLinkRowRightColumn);
		replyBoxContentPostAreaTBody.appendChild(replyBoxContentPostAreaTableLinkRow);

		var replyBoxContentPostAreaTableSubjectRow = document.createElement("tr");
		var replyBoxContentPostAreaTableSubjectRowLeftColumn = document.createElement("td");
		replyBoxContentPostAreaTableSubjectRowLeftColumn.setAttribute("class","postblock");
		var replyBoxContentPostAreaTableSubjectRowLeftColumnText = document.createTextNode("Subject");
		replyBoxContentPostAreaTableSubjectRowLeftColumn.appendChild(replyBoxContentPostAreaTableSubjectRowLeftColumnText);
		var replyBoxContentPostAreaTableSubjectRowRightColumn = document.createElement("td");
		var replyBoxContentPostAreaTableSubjectRowRightColumnTextField = document.createElement("input");
		replyBoxContentPostAreaTableSubjectRowRightColumnTextField.setAttribute("type","text");
		replyBoxContentPostAreaTableSubjectRowRightColumnTextField.setAttribute("name",postFields[2]);
		replyBoxContentPostAreaTableSubjectRowRightColumnTextField.setAttribute("size","40");
		replyBoxContentPostAreaTableSubjectRowRightColumn.appendChild(replyBoxContentPostAreaTableSubjectRowRightColumnTextField);
		var replyBoxContentPostAreaTableSubjectRowRightColumnSubmitTask = document.createElement("input"); // For the sake of bbwchan.org's use of submit buttons for setting the task parameter, instead.
		replyBoxContentPostAreaTableSubjectRowRightColumnSubmitTask.setAttribute("type", "hidden");
		replyBoxContentPostAreaTableSubjectRowRightColumnSubmitTask.setAttribute("name", "task");
		replyBoxContentPostAreaTableSubjectRowRightColumnSubmitTask.setAttribute("value", "post");
		replyBoxContentPostAreaTableSubjectRowRightColumn.appendChild(replyBoxContentPostAreaTableSubjectRowRightColumnSubmitTask);
		var replyBoxContentPostAreaTableSubjectRowRightColumnSubmitButton = document.createElement("input");
		replyBoxContentPostAreaTableSubjectRowRightColumnSubmitButton.setAttribute("type", "submit");
		replyBoxContentPostAreaTableSubjectRowRightColumnSubmitButton.setAttribute("value", "Submit");
		replyBoxContentPostAreaTableSubjectRowRightColumn.appendChild(replyBoxContentPostAreaTableSubjectRowRightColumnSubmitButton);
		replyBoxContentPostAreaTableSubjectRow.appendChild(replyBoxContentPostAreaTableSubjectRowLeftColumn);
		replyBoxContentPostAreaTableSubjectRow.appendChild(replyBoxContentPostAreaTableSubjectRowRightColumn);
		replyBoxContentPostAreaTBody.appendChild(replyBoxContentPostAreaTableSubjectRow);

		// Prevent quick reply from being saved once post is submitted.
		replyBoxContentPostAreaTableSubjectRowRightColumnSubmitButton.addEventListener('click', function(event) { lastQuickReply = false; }, false);
	
		var replyBoxContentPostAreaTableCommentRow = document.createElement("tr");
		var replyBoxContentPostAreaTableCommentRowLeftColumn = document.createElement("td");
		replyBoxContentPostAreaTableCommentRowLeftColumn.setAttribute("class","postblock");
		var replyBoxContentPostAreaTableCommentRowLeftColumnText = document.createTextNode("Comment");
		replyBoxContentPostAreaTableCommentRowLeftColumn.appendChild(replyBoxContentPostAreaTableCommentRowLeftColumnText);
		var replyBoxContentPostAreaTableCommentRowRightColumn = document.createElement("td");
		var replyBoxContentPostAreaTableCommentRowRightColumnTextField = document.createElement("textarea");
		replyBoxContentPostAreaTableCommentRowRightColumnTextField.setAttribute("name",postFields[3]);
		replyBoxContentPostAreaTableCommentRowRightColumnTextField.setAttribute("cols","48");
		replyBoxContentPostAreaTableCommentRowRightColumnTextField.setAttribute("rows","4");
		replyBoxContentPostAreaTableCommentRowRightColumnTextField.setAttribute("id","quickreplytextarea");
		var textBeingInsert = '';
		if (replyNumber != threadNumber) // Add in >>1 reference for responses to thread replies
		{
			textBeingInsert = ">>"+replyNumber+"\n";
			var replyBoxContentPostAreaTableCommentRowRightColumnTextFieldInput = document.createTextNode(textBeingInsert);
			replyBoxContentPostAreaTableCommentRowRightColumnTextField.appendChild(replyBoxContentPostAreaTableCommentRowRightColumnTextFieldInput);
		}
		replyBoxContentPostAreaTableCommentRowRightColumn.appendChild(replyBoxContentPostAreaTableCommentRowRightColumnTextField);
		replyBoxContentPostAreaTableCommentRow.appendChild(replyBoxContentPostAreaTableCommentRowLeftColumn);
		replyBoxContentPostAreaTableCommentRow.appendChild(replyBoxContentPostAreaTableCommentRowRightColumn);
		replyBoxContentPostAreaTBody.appendChild(replyBoxContentPostAreaTableCommentRow);
	
		var replyBoxContentPostAreaTableFileRow = document.createElement("tr");
		var replyBoxContentPostAreaTableFileRowLeftColumn = document.createElement("td");
		replyBoxContentPostAreaTableFileRowLeftColumn.setAttribute("class","postblock");
		var replyBoxContentPostAreaTableFileRowLeftColumnText = document.createTextNode("File");
		replyBoxContentPostAreaTableFileRowLeftColumn.appendChild(replyBoxContentPostAreaTableFileRowLeftColumnText);
		var replyBoxContentPostAreaTableFileRowRightColumn = document.createElement("td");
		var replyBoxContentPostAreaTableFileRowRightColumnField = document.createElement("input");
		replyBoxContentPostAreaTableFileRowRightColumnField.setAttribute("type","file");
		replyBoxContentPostAreaTableFileRowRightColumnField.setAttribute("name",postFields[4]);
		replyBoxContentPostAreaTableFileRowRightColumnField.setAttribute("size","40");
		replyBoxContentPostAreaTableFileRowRightColumn.appendChild(replyBoxContentPostAreaTableFileRowRightColumnField);
		replyBoxContentPostAreaTableFileRow.appendChild(replyBoxContentPostAreaTableFileRowLeftColumn);
		replyBoxContentPostAreaTableFileRow.appendChild(replyBoxContentPostAreaTableFileRowRightColumn);
		replyBoxContentPostAreaTBody.appendChild(replyBoxContentPostAreaTableFileRow);
		
		// For sites with verification
		if (document.evaluate("count(.//"+ns+"input[@name='captcha'])",document.getElementById("postform"),nsResolver,1,null).numberValue > 0) 
		{
			var replyBoxContentPostAreaTableCaptchaRow = document.createElement("tr");
			var replyBoxContentPostAreaTableCaptchaRowLeftColumn = document.createElement("td");
			replyBoxContentPostAreaTableCaptchaRowLeftColumn.setAttribute("class","postblock");
			var replyBoxContentPostAreaTableCaptchaRowLeftColumnText = document.createTextNode("Verification");
			replyBoxContentPostAreaTableCaptchaRowLeftColumn.appendChild(replyBoxContentPostAreaTableCaptchaRowLeftColumnText);
			var replyBoxContentPostAreaTableCaptchaRowRightColumn = document.createElement("td");
			var replyBoxContentPostAreaTableCaptchaRowRightColumnTextField = document.createElement("input");
			replyBoxContentPostAreaTableCaptchaRowRightColumnTextField.setAttribute("type","text");
			replyBoxContentPostAreaTableCaptchaRowRightColumnTextField.setAttribute("name","captcha");
			replyBoxContentPostAreaTableCaptchaRowRightColumnTextField.setAttribute("size","8");
			replyBoxContentPostAreaTableCaptchaRowRightColumnTextField.setAttribute("autocomplete","off");
			replyBoxContentPostAreaTableCaptchaRowRightColumn.appendChild(replyBoxContentPostAreaTableCaptchaRowRightColumnTextField);
			var replyBoxContentPostAreaTableCaptchaRowRightColumnImage = document.createElement("img");
			replyBoxContentPostAreaTableCaptchaRowRightColumnImage.setAttribute("alt","");
			replyBoxContentPostAreaTableCaptchaRowRightColumnImage.setAttribute("align","middle");
			replyBoxContentPostAreaTableCaptchaRowRightColumnImage.setAttribute("title","Extracted CAPTCHA image");
			replyBoxContentPostAreaTableCaptchaRowRightColumn.appendChild(replyBoxContentPostAreaTableCaptchaRowRightColumnImage);
			replyBoxContentPostAreaTableCaptchaRow.appendChild(replyBoxContentPostAreaTableCaptchaRowLeftColumn);
			replyBoxContentPostAreaTableCaptchaRow.appendChild(replyBoxContentPostAreaTableCaptchaRowRightColumn);
			replyBoxContentPostAreaTBody.appendChild(replyBoxContentPostAreaTableCaptchaRow);
	
			var karehaStyleReflinkTest = new RegExp (",\\'\\/(.*?)\\/\\'\\)$");
			var imageUrl;
			if (karehaStyleReflinkTest.test(replyUrl))
			{
				var images = document.evaluate('.//'+ns+"img",document.getElementById("postform"),nsResolver,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null); 
				for (var j=0; j < images.snapshotLength; j++)
				{
					if (images.snapshotItem(j).getAttribute("src").indexOf("captcha.pl") != -1)
					{
						imageUrl = images.snapshotItem(j).getAttribute("src");
						imageUrl += "?".addRandomQueryString();		// Add query string--Kareha's CAPTCHA has no query string by default and this may help prevent caching.
						replyBoxContentPostAreaTableCaptchaRowRightColumnImage.setAttribute("src", imageUrl);
						break;
					}
				}
	
			}
			else
			{
				var xmlHttp = new XMLHttpRequest(); // AJAX TIEM!
				xmlHttp.onreadystatechange = function() 
				{ 
					if (xmlHttp.readyState==4)
					{ 
						switch(xmlHttp.status)
						{
							case 200:
								var replyPage = xmlHttp.responseText;
								var imageRegExp = new RegExp ("<img .*? src=\\\"(.*?captcha\\.pl.*?)\\\".*?>");
								imageUrl = imageRegExp.exec(replyPage)[1];
								imageUrl += "&amp;"; // Start new parameter to add on to Wakaba's CAPTCHA
								imageUrl.addRandomQueryString();
								replyBoxContentPostAreaTableCaptchaRowRightColumnImage.setAttribute("src", imageUrl);
								break;

							case 404:
								alert("Cannot acquire image for verification: Thread does not exist.");
								break;

							case 403:
								alert("Cannot acquire image for verification: HTTP Forbidden. (Possible ban?)");
	
							default:
								alert("Cannot acquire image for verification: HTTP Status "+xmlHttp.status);
						}
					}
				}
	
				xmlHttp.open("GET", replyUrl, true);
				xmlHttp.send(null);
			}
		}
	
		var replyBoxContentPostAreaTablePasswordRow = document.createElement("tr");
		var replyBoxContentPostAreaTablePasswordRowLeftColumn = document.createElement("td");
		replyBoxContentPostAreaTablePasswordRowLeftColumn.setAttribute("class","postblock");
		var replyBoxContentPostAreaTablePasswordRowLeftColumnText = document.createTextNode("Password");
		replyBoxContentPostAreaTablePasswordRowLeftColumn.appendChild(replyBoxContentPostAreaTablePasswordRowLeftColumnText);
		var replyBoxContentPostAreaTablePasswordRowRightColumn = document.createElement("td");
		var replyBoxContentPostAreaTablePasswordRowRightColumnTextField = document.createElement("input");
		replyBoxContentPostAreaTablePasswordRowRightColumnTextField.setAttribute("type","password");
		replyBoxContentPostAreaTablePasswordRowRightColumnTextField.setAttribute("name",postFields[5]);
		replyBoxContentPostAreaTablePasswordRowRightColumnTextField.setAttribute("value", get_cookie("password"));
		replyBoxContentPostAreaTablePasswordRowRightColumnTextField.setAttribute("size","8");
		replyBoxContentPostAreaTablePasswordRowRightColumnTextField.setAttribute("autocomplete","off");
		replyBoxContentPostAreaTablePasswordRowRightColumn.appendChild(replyBoxContentPostAreaTablePasswordRowRightColumnTextField);
		replyBoxContentPostAreaTablePasswordRow.appendChild(replyBoxContentPostAreaTablePasswordRowLeftColumn);
		replyBoxContentPostAreaTablePasswordRow.appendChild(replyBoxContentPostAreaTablePasswordRowRightColumn);
		replyBoxContentPostAreaTBody.appendChild(replyBoxContentPostAreaTablePasswordRow);

		// Convert post numbers in header to insert into our current box instead.
		var linksInBoard = document.evaluate('.//'+ns+"a[@href and contains(@href,'#i')]",document.getElementById('delform'),nsResolver,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
		for (var i = 0; i<linksInBoard.snapshotLength; i++)
		{
			convertPostLink(replyBoxContentPostAreaTableCommentRowRightColumnTextField,linksInBoard.snapshotItem(i));
		}

		if (optionValue('doQuickSage'))	// Set up quick sage features.
			addQuickSage(replyBox);

		// Append our new table.
		replyDiv.appendChild(replyBox);

		// Automatically focus to comment area.
		replyBoxContentPostAreaTableCommentRowRightColumnTextField.focus();

		// Set tracking variable.
		lastQuickReply = new Array (link, replyDiv, threadNumber, replyNumber, replyUrl); // Set the tracking variable to currently open division, so we can close it if we open another quick reply form.
	}
	
	function collapseQuickReply()
	{
		if (!lastQuickReply[1].parentNode)
			return 0; // Handle strange bug with the tracking variable in GreaseMonkey
	
		var blankQRDiv = document.createElement("div");
		blankQRDiv.setAttribute("class", "quickreplyarea");
	
		lastQuickReply[1].parentNode.replaceChild(blankQRDiv, lastQuickReply[1]);
		createQuickReplyEvent(lastQuickReply[0], blankQRDiv, lastQuickReply[2], lastQuickReply[3], lastQuickReply[4]);
	
		var inputsToSearch = document.getElementById("delform").getElementsByTagName("input");
		for (var k=0; k<inputsToSearch.length; k++)
		{
			if (inputsToSearch[k].getAttribute("name") == "desupassworddesu")
			{
				inputsToSearch[k].setAttribute("name","password");
			}
			else if (inputsToSearch[k].getAttribute("name") == "task" && inputsToSearch[k].getAttribute("type") != "submit")
			{
				inputsToSearch[k].setAttribute("value","delete");  // Restore deletion task
			}
		}

		lastQuickReply = false;
		return 1;
	}
	if (parseInt(replyNumber) == parseInt(get_cookie('wkExtQRBackupID_'+boardPath)))
	{
		var evObj = document.createEvent('MouseEvents');
		evObj.initMouseEvent( 'click', false, true, window, 0,0,0,0,0, false, false, true, false, 0, null  );
		link.dispatchEvent(evObj);
		restoreQuickReply(replyDiv);
	}
}

function saveQuickReply(table)	// Save what was typed to a temporary cookie. 4K limit makes this *NOT* an ideal solution for backing up essay-length posts.
{
	if (lastQuickReply)
	{
		var postFields = postFieldsForSite();

		var nameToSave = document.evaluate(".//"+ns+"input[@name='"+postFields[0]+"']",table,nsResolver,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0).value.urlEncode();
		var linkToSave = document.evaluate(".//"+ns+"input[@name='"+postFields[1]+"']",table,nsResolver,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0).value.urlEncode();
		var subjectToSave = document.evaluate(".//"+ns+"input[@name='"+postFields[2]+"']",table,nsResolver,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0).value.urlEncode();
		var commentToSave = document.evaluate(".//"+ns+"textarea[@name='"+postFields[3]+"']",table,nsResolver,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0).value.urlEncode();
		var passwordToSave = document.evaluate(".//"+ns+"input[@name='"+postFields[5]+"']",table,nsResolver,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0).value.urlEncode();

		set_cookie('wkExtQRBackupID_'+boardPath,lastQuickReply[3],14); 			// Set temporary cookies. Reply ID is stored in lastQuickReply
		set_cookie('wkExtQRBackupName_'+boardPath,nameToSave,14);
		set_cookie('wkExtQRBackupLink_'+boardPath,linkToSave,14);
		set_cookie('wkExtQRBackupSubject_'+boardPath, subjectToSave,14);
		set_cookie('wkExtQRBackupComment_'+boardPath, commentToSave,14);
		set_cookie('wkExtQRBackupPassword_'+boardPath, passwordToSave,14);
	}
}

function restoreQuickReply(table)
{
	var postFields = postFieldsForSite();

	document.evaluate(".//"+ns+"input[@name='"+postFields[0]+"']",table,nsResolver,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0).value = get_cookie('wkExtQRBackupName_'+boardPath).urlDecode();
	document.evaluate(".//"+ns+"input[@name='"+postFields[1]+"']",table,nsResolver,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0).value = get_cookie('wkExtQRBackupLink_'+boardPath).urlDecode();
	document.evaluate(".//"+ns+"input[@name='"+postFields[2]+"']",table,nsResolver,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0).value = get_cookie('wkExtQRBackupSubject_'+boardPath).urlDecode();
	document.evaluate(".//"+ns+"textarea[@name='"+postFields[3]+"']",table,nsResolver,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0).value = get_cookie('wkExtQRBackupComment_'+boardPath).urlDecode();
	document.evaluate(".//"+ns+"input[@name='"+postFields[5]+"']",table,nsResolver,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0).value = get_cookie('wkExtQRBackupPassword_'+boardPath).urlDecode();

	set_cookie('wkExtQRBackupID_'+boardPath, '', -1); 					// Clear out all cookies.
	set_cookie('wkExtQRBackupName_'+boardPath, '', -1);
	set_cookie('wkExtQRBackupLink_'+boardPath, '', -1);
	set_cookie('wkExtQRBackupSubject_'+boardPath, '', -1);
	set_cookie('wkExtQRBackupComment_'+boardPath, '', -1);
	set_cookie('wkExtQRBackupPassword_'+boardPath, '', -1);
}

function convertPostLink(textArea, link)
{
	// Create event handler as an object method, to facilitate the detachment of the function from the link object.
	var quoteInsert =
	{
		handleEvent : function(event)
		{
			if (!document.getElementById('quickreplytextarea'))
			{
				link.removeEventListener('click',this,false);
				return 0;
			}
			var replyMatch = new RegExp ("\\#i(\\d+)$");
			var textToInsert = '>>'+replyMatch.exec(event.target.getAttribute('href'))[1]+"\n";
			var start = textArea.selectionStart;
			var end = textArea.selectionEnd;
			textArea.value=textArea.value.substr(0,start)+textToInsert+textArea.value.substr(end); // Replace selected text (if any) with the text to insert.
			textArea.setSelectionRange(start+textToInsert.length,start+textToInsert.length); // Set cursor after inserted text.

			textArea.focus();

			event.stopPropagation();
			event.preventDefault();
		}
	};

	link.addEventListener('click', quoteInsert, false);
}

function addThreadHiding(threadDiv)
{
	// This function adds a link to toggle a thread's display to the start of each thread. The threads are separated by horizontal rules (<hr>) and are thus handled that way.
	// However, the first thread does not have a preceding <hr>. It is handled when the argument is null.

	var followingLinks;
	if (threadDiv == null)
	{
		followingLinks = document.evaluate(".//"+ns+"a[@href]",document.getElementById("delform"),nsResolver,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	}
	else
	{
		followingLinks = document.evaluate("following :: "+ns+"a[@href]",threadDiv,nsResolver,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	}
	var numberGrab = new RegExp ("res\\/(\\d+)\\."); // We will need to grab the thread number that follows our horizontal rule.
	var threadNum;

	for (var i=0; i<followingLinks.snapshotLength && i < 7; i++) // One of the links immediately following is what we want.
	{
		if (numberGrab.test(followingLinks.snapshotItem(i).getAttribute('href')))
		{
			threadNum = numberGrab.exec(followingLinks.snapshotItem(i).getAttribute('href'))[1];

			break;
		}
	}

	if (!threadNum) // If no thread was found, quit while we are ahead.
		return 0;

	var newLink = document.createElement('a');
	newLink.setAttribute('href','#');
	newLink.textContent = 'Hide Thread (\u2212)';
	newLink.setAttribute('class','hidethreadlink');
	newLink.style.cssFloat = 'right';
	newLink.style.fontSize = '80%';
	if (threadDiv == null)
	{
		document.getElementById("delform").insertBefore(newLink,document.getElementById("delform").firstChild);
	}
	else
	{
		document.getElementById("delform").insertBefore(newLink,threadDiv.nextSibling);
	}
	newLink.addEventListener('click', function(event)
	{
		toggleThreadDisplay(threadNum, event.target, false);

		event.stopPropagation();
		event.preventDefault();
	}, false);

	var threadContainer = document.createElement('div');
	threadContainer.setAttribute('id','thread'+threadNum);

	var allElementsFollowing = document.evaluate("following-sibling::"+ ((window.location.href.indexOf('nanoha.chupatz.com/') != -1) ? '' : ns) + "node()",newLink,nsResolver,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	for (var j=0; j<allElementsFollowing.snapshotLength; j++)
	{
		if (allElementsFollowing.snapshotItem(j).nodeName == 'HR' || allElementsFollowing.snapshotItem(j).nodeName == 'hr')
		{
			break;
		}
		else
		{
			allElementsFollowing.snapshotItem(j).parentNode.removeChild(allElementsFollowing.snapshotItem(j));
			threadContainer.appendChild(allElementsFollowing.snapshotItem(j));
		}
	}

	document.getElementById('delform').insertBefore(threadContainer,newLink.nextSibling);

	// Check for thread number's presence in stored list.
	var threadMatch = new RegExp ("thread"+threadNum+',');

	// If the new thread division is in the board's designated cookie, go ahead and hide it.
	if (threadMatch.test(get_cookie('wkExtHiddenThreads_'+boardPath)))
		toggleThreadDisplay(threadNum, newLink, true);
}

function toggleThreadDisplay(threadNumber, toggleLink, calledByCookie)
{
	var threadToToggle = document.getElementById('thread'+threadNumber);

	if (toggleLink.getAttribute('class') == 'hidethreadlink') // If the thread was not hidden (and will now be toggled hidden)...
	{
		threadToToggle.style.display = 'none';
		var threadHiddenNote = document.createElement('div');
		threadHiddenNote.textContent = 'Thread '+threadNumber+' Hidden.';
		threadHiddenNote.style.fontStyle = 'italic';
		threadHiddenNote.style.fontWeight = 'bold';
		threadHiddenNote.setAttribute('class','threadhiddennote');
		document.getElementById('delform').insertBefore(threadHiddenNote,threadToToggle);

		toggleLink.setAttribute('class','showthreadlink');
		toggleLink.textContent = 'Show Thread (+)'; // Update the link user has clicked accordingly
		if (!calledByCookie)
		{
			// Save the hidden thread to cookie
			// The cookie is set up as a comma-delimited list. It's data is named "threadNumber_<board_dir>"
			set_cookie('wkExtHiddenThreads_'+boardPath,'thread'+threadNumber+','+get_cookie('wkExtHiddenThreads_'+boardPath),365);
		}
	}
	else // If the thread was already hidden...
	{
		if (threadToToggle.previousSibling.getAttribute('class') == 'threadhiddennote') // Remove the notification about the thread being hidden
			document.getElementById('delform').removeChild(threadToToggle.previousSibling);

		threadToToggle.style.display = ''; // HAX

		toggleLink.setAttribute('class','hidethreadlink');
		toggleLink.textContent = 'Hide Thread (\u2212)';

		// Remove the hidden thread from cookie
		var wkExtHiddenThreads = get_cookie('wkExtHiddenThreads_'+boardPath);
		var threadMatch = new RegExp ("thread"+threadNumber+',', "g");
		wkExtHiddenThreads = wkExtHiddenThreads.replace(threadMatch,'');
		set_cookie('wkExtHiddenThreads_'+boardPath,wkExtHiddenThreads,365);
	}
}

function quickSage(checkbox)		// Clicking the sage checkbox automatically inputs "sage"
{
	if (checkbox.checked == true) // If the checkbox was turned on...
	{
		checkbox.parentNode.previousSibling.previousSibling.value = 'sage'; // Add in the sage.
		checkbox.parentNode.previousSibling.previousSibling.style.color = '#DD0000'; // Change the color of the text field
	}
	else
	{
		checkbox.parentNode.previousSibling.previousSibling.value = ''; // Remove the sage.
		checkbox.parentNode.previousSibling.previousSibling.style.color = ''; // Revert text field's color
	}
}

function updateSageStatus(textfield) // Sage checkbox is checked and field turns red when "sage" or case variant is present in link field
{
	var sageMatch = new RegExp ("^sage$","i");
	if (sageMatch.test(textfield.value))
	{
		textfield.nextSibling.nextSibling.firstChild.checked = true;
		textfield.style.color = '#DD0000';
	}
	else
	{
		textfield.nextSibling.nextSibling.firstChild.checked = false;
		textfield.style.color = '';
	}
}

function addQuickSage(postForm)
{
	var postFields = postFieldsForSite();
	var linkField = document.evaluate('.//'+ns+"input[@type='text' and @name='" + postFields[1] + "']",postForm,nsResolver,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);

	// Bracket delimiters are conventional in Futaba-style boards.
	var leftBracket = document.createTextNode(" [");
	var rightBracket = document.createTextNode("]");

	// The new sage checkbox with label
	var sageLabel = document.createElement('label');
	var sageCheckbox = document.createElement('input');
	sageCheckbox.setAttribute('type', 'checkbox');
	sageCheckbox.setAttribute('name', 'sagecheckbox');
	sageCheckbox.setAttribute('value', 'on');
	sageLabel.appendChild(sageCheckbox);
	var sageText = document.createTextNode(" No Bump");
	sageLabel.appendChild(sageText);

	// Add them in after the link field.
	if (linkField.nextSibling)	
	{
		linkField.parentNode.insertBefore(rightBracket,linkField.nextSibling);
		linkField.parentNode.insertBefore(sageLabel,linkField.nextSibling);
		linkField.parentNode.insertBefore(leftBracket,linkField.nextSibling);
	}
	else
	{
		linkField.parentNode.appendChild(leftBracket);
		linkField.parentNode.appendChild(sageLabel);
		linkField.parentNode.appendChild(rightBracket);
	}

	// Set up quick sage features.
	linkField.addEventListener('keyup', function(event) { updateSageStatus(event.target); }, false  );
	linkField.addEventListener('change', function(event) { updateSageStatus(event.target); }, false  );
	updateSageStatus(linkField); // Check the link field now just in case sage is its value.
	sageCheckbox.addEventListener('click', function(event) { quickSage(event.target); }, false );
}

// Option Storage Management

// Options are stored to *cookies,* for compatibility with non-GreaseMonkey platforms.
// The set of options resolves to a string of numbers, delimited by commas.
// The format is parsed as follows to store and retrieve options:

// <doQuickReply>,<doThreadExpansion>,<doPostExpansion>,<doThreadHiding>,<doQuickSage>,<doGlobalExpansion>,<doImageExpansion>,<doPartialThreadExpansion>,<partialThreadExpansionLimit>

// Naturally, if the option is enabled, it is set to 1. If set to 0, it is disabled. This facilitates later handling by Javascript.
// If the user sets doOptionsPanel to false, the defaults above are automatically consulted. This allows for optionally hardcoding the options.

function optionValue(optionName)
{
	var optionsString = (doOptionsPanel) ? get_cookie('wkExtOptions') : '';
	if (optionsString == '')
	{
		switch (optionName)
		{
			case 'doQuickReply':
				return doQuickReply;
				break;
			case 'doThreadExpansion':
				return doThreadExpansion;
				break;
			case 'doPostExpansion':
				return doPostExpansion;
				break;
			case 'doThreadHiding':
				return doThreadHiding;
				break;
			case 'doQuickSage':
				return doQuickSage;
				break;
			case 'doGlobalExpansion':
				return doGlobalExpansion;
				break;
			case 'doImageExpansion':
				return doImageExpansion;
				break;
			case 'doPartialThreadExpansion':
				return doPartialThreadExpansion;
				break;
			case 'partialThreadExpansionLimit':
				return partialThreadExpansionLimit;
				break;
			case 'doPartialImageExpansion':
				return doPartialImageExpansion;
				break;
			case 'partialImageExpansionWidthLimit':
				return partialImageExpansionWidthLimit;
				break;
			case 'doFullImageExpansionOnSecondClick':
				return doFullImageExpansionOnSecondClick;
				break;
			default:
				return 0;
		}
	}
	else
	{
		var optionsArray = optionsString.split(/,/);
		switch (optionName)
		{
			case 'doQuickReply':
				return parseInt(optionsArray[0]); // parseInt ensures that 0 is handled as an integer. lol, weak types
				break;
			case 'doThreadExpansion':
				return parseInt(optionsArray[1]);
				break;
			case 'doPostExpansion':
				return parseInt(optionsArray[2]);
				break;
			case 'doThreadHiding':
				return parseInt(optionsArray[3]);
				break;
			case 'doQuickSage':
				return parseInt(optionsArray[4]);
				break;
			case 'doGlobalExpansion':
				return parseInt(optionsArray[5]);
				break;
			case 'doImageExpansion':
				return parseInt(optionsArray[6]);
				break;
			case 'doPartialThreadExpansion':
				return parseInt(optionsArray[7]);
				break;
			case 'partialThreadExpansionLimit':
				return parseInt(optionsArray[8]) || partialThreadExpansionLimit;
				break;
			case 'doPartialImageExpansion':
				return parseInt(optionsArray[9]);
				break;
			case 'partialImageExpansionWidthLimit':
				return parseInt(optionsArray[10]) || partialImageExpansionWidthLimit;
				break;
			case 'doFullImageExpansionOnSecondClick':
				return parseInt(optionsArray[11]);
				break;
			default:
				return 0;
		}
	}
}

function setOption(optionName, value)
{
	if (!doOptionsPanel)
		return 0;
	var optionsString = get_cookie('wkExtOptions');
	var optionsArray = new Array;
	if (optionsString == '')
	{
		optionsArray[0] = (doQuickReply) ? '1' : '0';
		optionsArray[1] = (doThreadExpansion) ? '1' : '0';
		optionsArray[2] = (doPostExpansion) ? '1' : '0';
		optionsArray[3] = (doThreadHiding) ? '1' : '0';
		optionsArray[4] = (doQuickSage) ? '1' : '0';
		optionsArray[5] = (doGlobalExpansion) ? '1' : '0';
		optionsArray[6] = (doImageExpansion) ? '1' : '0';
		optionsArray[7] = (doPartialThreadExpansion) ? '1' : '0';
		optionsArray[8] = partialThreadExpansionLimit;
		optionsArray[9] = (doPartialImageExpansion) ? '1' : '0';
		optionsArray[10] = partialImageExpansionWidthLimit;
		optionsArray[11] = (doFullImageExpansionOnSecondClick) ? '1' : '0';
	}
	else
	{
		optionsArray = optionsString.split(/,/);
	}
	switch(optionName)
	{
		case 'doQuickReply':
			optionsArray[0] = (value) ? '1' : '0'; // true: 1; false: 0
			break;
		case 'doThreadExpansion':
			optionsArray[1] = (value) ? '1' : '0';
			break;
		case 'doPostExpansion':
			optionsArray[2] = (value) ? '1' : '0';
			break;
		case 'doThreadHiding':
			optionsArray[3] = (value) ? '1' : '0';
			break;
		case 'doQuickSage':
			optionsArray[4] = (value) ? '1' : '0';
			break;
		case 'doGlobalExpansion':
			optionsArray[5] = (value) ? '1' : '0';
			break;
		case 'doImageExpansion':
			optionsArray[6] = (value) ? '1' : '0';
			break;
		case 'doPartialThreadExpansion':
			optionsArray[7] = (value) ? '1' : '0';
			break;
		case 'partialThreadExpansionLimit':
			optionsArray[8] = value;
			break;
		case 'doPartialImageExpansion':
			optionsArray[9] = (value) ? '1' : '0';
			break;
		case 'partialImageExpansionWidthLimit':
			optionsArray[10] = value;
			break;
		case 'doFullImageExpansionOnSecondClick':
			optionsArray[11] = (value) ? '1' : '0'	;
			break;
		default:
			return 0;
	}
	var newOptionsString = optionsArray.join(",");
	set_cookie('wkExtOptions', newOptionsString, 9001);
}

function toggleOption(optionName)
{
	if (optionValue(optionName))
	{
		setOption(optionName, false);
	}
	else
	{
		setOption(optionName, true);
	}
}

// Code for moving panes around by clicking and dragging a handle.
// Based on code from

function makeMoveableHandle(element)
{
	var moveableElement = null;				// Tracking variable for the element to be moved. The parent of the clicked handle.
	var dragXoffset = 0;
	var dragYoffset = 0;

	element.addEventListener('mousedown', function(event)
	{
		moveableElement = element.parentNode;

		dragHandler(event);

		event.stopPropagation();			// Prevent text selection, etc.
		event.preventDefault();	
	}, false);

	function dragHandler(e)
	{
		if (e == null) { e = window.event; htype='move';} 
		dragXoffset=e.clientX-parseInt(moveableElement.style.left);		// Will not work unless position is already defined for this element. However, using the element's offset properties proves to be unreliable, based on experience and on QuirksMode's reports.
		dragYoffset=e.clientY-parseInt(moveableElement.style.top);
		document.addEventListener('mousemove',moveHandler,false); 	// Whenever the mouse is moved, respond by invoking moveHandler().
		document.addEventListener('mouseup',cleanup,false);		// When letting go of the handle, remove these event listeners and clean the tracking variable.
	}

	function moveHandler(e)
	{
		if (e == null) { e = window.event; } 
		if (e.button==0)				// Theoretically should prevent response from middle- or right-clicking. Doesn't work. OH WELL.
		{
			moveableElement.style.left=e.clientX-dragXoffset+'px';
			moveableElement.style.top=e.clientY-dragYoffset+'px';
		}
	}

	function cleanup(e)
	{
		document.removeEventListener('mousemove',moveHandler,false);
		document.removeEventListener('mouseup',cleanup,false);
	}
}
