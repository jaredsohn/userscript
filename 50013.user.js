// ==UserScript==
// @name           Govno reloaded
// @description    Govno je
// @include http://2-ch.ru/*
// @include http://*.2-ch.ru/*
// ==/UserScript==

// made from wakaba extension

// DEFAULT SETTINGS
const doQuickReply = true;
const doThreadExpansion = true;
const doPostExpansion = true;
const doThreadHiding = true;
const doQuickSage = true;
const doGlobalExpansion = true;
const doImageExpansion = true;
const doPartialThreadExpansion = false;
const partialThreadExpansionLimit = 50;
const doPartialImageExpansion = false;
const partialImageExpansionWidthLimit = 500;
const partialImageExpansionHeightLimit = 500;
const doFullImageExpansionOnSecondClick = true;
const doThreadNav = true;
const doDiscussionMap = true;
const doOptionsPanel = true;			// TIP for the User: Set to false if you want to configure these options manually without the options panel showing.

// INITIALIZATION
window.addEventListener('load', init, false);
function init()
{
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
	
	// Set up features on board pages
	if (document.getElementById('delform') && window.location.href.indexOf('task=') == -1) // Exempt non-board pages.
	{
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
			optionPanelWrapper.style.width = "auto";
			optionPanelWrapper.style.borderStyle = "solid";
			optionPanelWrapper.style.borderWidth = "1px";
			optionPanelWrapper.style.padding = "2px 2px 2px 2px";

			var optionPanelHandle = document.createElement('div');		// For use with moving the box around. (Event listener below.)
			optionPanelHandle.style.width="100%";
	//		optionPanelHandle.style.height="10px";
			optionPanelHandle.style.opacity = ".6";
			optionPanelHandle.style.background="white";
			optionPanelHandle.style.cursor = "move";
			optionPanelWrapper.appendChild(optionPanelHandle);

			var optionsHeader = document.createElement("div");
			optionsHeader.textContent="Wishmaster v5.0";
			optionsHeader.style.fontWeight="bold";
			optionsHeader.style.fontFamily = "sans-serif";
	//		optionsHeader.style.cssFloat="left";
			optionPanelHandle.appendChild(optionsHeader);

			var optionPanelForm = document.createElement("form");
			optionPanelForm.setAttribute('action', window.location.href);	// Eh, standards require it.
			optionPanelForm.setAttribute('method', 'get');			// This form will not be submitted, per se.

			var optionsDisplayToggleLink = document.createElement("a");	// Yep, it toggles the options' display.
			optionsDisplayToggleLink.setAttribute("href","#");
			optionsDisplayToggleLink.textContent = "Показать опции";
			optionsDisplayToggleLink.style.cssFloat = "left";
			optionsDisplayToggleLink.style.marginRight = "1em";
			optionPanelForm.appendChild(optionsDisplayToggleLink);

			var reloadButton = document.createElement("input");	// Create reload button.
			reloadButton.setAttribute('type','submit');
			reloadButton.setAttribute('name','optionspanelsubmit');
			reloadButton.setAttribute('value','Перезагрузить страницу');
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
			quickReplyOptionLabel.setAttribute("title","This option places links at the top of each post in the board pages that allow one to reply to a post without needing to navigate to the board page. It is intended for quick messages or bumps.");
			var quickReplyOptionText = document.createTextNode(" Включить быстрый ответ");
			var quickReplyOptionCheckbox = document.createElement('input');
			quickReplyOptionCheckbox.setAttribute("type","checkbox");
			quickReplyOptionCheckbox.setAttribute("Имя","quickreplytoggle");
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
			threadExpansionOptionLabel.setAttribute("title","This option enables links directly next to the omitted posts message in each thread in the board pages that, when clicked, give quick access to all of the posts and images in the thread without navigating to the reply page.");
			var threadExpansionOptionText = document.createTextNode(" Включить расширение тредов");
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
			partialThreadExpansionOptionLabel.setAttribute('title',"This option enables links that, when clicked, give access to the latest number of posts from a thread without needing to navigate to the thread page. This is intended to allow one to catch up with the latest discussion and files shared without needing to bring up an entire large thread.");
			var partialThreadExpansionOptionText = document.createTextNode(" Включить частичное расширение тредов");
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
			partialThreadExpansionLimitOptionLabel.setAttribute("title","This option controls how many posts are brought up when partially expanding a thread. (See above.)");
			partialThreadExpansionLimitOptionLabel.style.marginLeft = '2.5em';
			var partialThreadExpansionLimitOptionText1 = document.createTextNode("Показывать последние ");
			var partialThreadExpansionLimitOptionField = document.createElement('input');
			var partialThreadExpansionLimitOptionText2 = document.createTextNode(" ответов");
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
			postExpansionOptionLabel.setAttribute('title',"In board pages, this option changes the behavior of links in messages indicating that the post has been abbreviated, such that it loads the rest of the post in its place, rather than directing the user to the reply page.");
			var postExpansionOptionText = document.createTextNode(" Включить расширение постов");
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
			imageExpansionOptionLabel.setAttribute("title","This option, the original motivation behind Wakaba Extension, allows one to blow-up images inline, that is, within the post itself, by clicking the thumbnail.");
			var imageExpansionOptionText = document.createTextNode(" Включить увеличение изображений");
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
			partialImageExpansionOptionLabel.setAttribute("title","This option sets up image expansion so that the image is only partly blown up when loaded. This allows one to view both the picture and the posts at once regardless of an attachment's high resolution and reduces page and reply distortion from the large image.");
			partialImageExpansionOptionLabel.style.marginLeft = '2.5em';
			var partialImageExpansionOptionText = document.createTextNode(" Увеличивать изображения частично");
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
			partialImageExpansionLimitOptionLabel.setAttribute("title","This is the width to which a partially expanded image will be limited. (See above.)");
			partialImageExpansionLimitOptionLabel.style.marginLeft = '5.0em';
			var partialImageExpansionLimitOptionText1 = document.createTextNode("Увеличивать до ");
			var partialImageExpansionLimitOptionField = document.createElement('input');
			var partialImageExpansionLimitOptionText2 = document.createTextNode(" пикселей в ширину");
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
			
			// Maximum Height of Partial Image Expansion (Dependent on Partial Image Expansion Option above.)
			var partialImageExpansionHeightLimitOptionLabel = document.createElement('label');
			partialImageExpansionHeightLimitOptionLabel.setAttribute("title","This is the height to which a partially expanded image will be limited. (See above.)");
			partialImageExpansionHeightLimitOptionLabel.style.marginLeft = '5.0em';
			var partialImageExpansionHeightLimitOptionText1 = document.createTextNode("Увеличивать до ");
			var partialImageExpansionHeightLimitOptionField = document.createElement('input');
			var partialImageExpansionHeightLimitOptionText2 = document.createTextNode(" пикселей в высоту");
			partialImageExpansionHeightLimitOptionField.setAttribute("type","text");
			partialImageExpansionHeightLimitOptionField.setAttribute("size","3");
			partialImageExpansionHeightLimitOptionField.setAttribute("name","partialthreadexpansionheightlimit");
			partialImageExpansionHeightLimitOptionField.setAttribute("value",optionValue('partialImageExpansionHeightLimit'));
			partialImageExpansionHeightLimitOptionLabel.appendChild(partialImageExpansionHeightLimitOptionText1);
			partialImageExpansionHeightLimitOptionLabel.appendChild(partialImageExpansionHeightLimitOptionField);
			partialImageExpansionHeightLimitOptionLabel.appendChild(partialImageExpansionHeightLimitOptionText2);
			partialImageExpansionHeightLimitOptionField.addEventListener('keyup', function(event)
			{
				setOption('partialImageExpansionHeightLimit', event.target.value);
			}, false);
			optionsDiv.appendChild(partialImageExpansionHeightLimitOptionLabel);

			optionsDiv.appendChild(document.createElement('br'));

			// Option to Fully Expand Image on the Second Click (Dependent on Partial Image Expansion Option above)
			var fullImageOnSecondClickOptionLabel = document.createElement('label');
			fullImageOnSecondClickOptionLabel.setAttribute("title","When enabled, this option will bring up the full picture when clicking the partially expanded one. This always happens on the second click: double-clicking is not implemented simply because Konqueror/Safari does not support the event (at this time).");
			fullImageOnSecondClickOptionLabel.style.marginLeft = '5.0em';
			var fullImageOnSecondClickOptionText = document.createTextNode(" Полноразмерное изображение на втором клике");
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
			fullImageExpansionOptionLabel.setAttribute("title","This option sets up image expansion so that the loaded image is in full resolution whenever the thumbnail is clicked.");
			fullImageExpansionOptionLabel.style.marginLeft = '2.5em';
			var fullImageExpansionOptionText = document.createTextNode(" Увеличивать изображения полностью");
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
			
			// Global Expansion Links Option
			var globalExpansionOptionLabel = document.createElement('label');
			globalExpansionOptionLabel.setAttribute("title", "This option adds links immediately below the post area of all pages. These links enable one to expand all threads and/or images on the page at once, provided the expansion option is enabled.");
			var globalExpansionOptionText = document.createTextNode(" Включить глобальные расширения");
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

			// Thread Hiding Option (Non-applicable on Desu/Boku)
			if (window.location.href.indexOf('desuchan.net/') == -1 && window.location.href.indexOf('bokuchan.org/') == -1 && !karehaBoard)
			{
				var threadHidingOptionLabel = document.createElement('label');
				threadHidingOptionLabel.setAttribute("title","This option enables the hiding of unwanted threads in board pages by clicking a link at the top right corner of each thread. Note this implementation is not optimal because userscripts are loaded after the page is loaded. On a slow connection, therefore, you may be briefly exposed to the unwanted thread.");
				var threadHidingOptionText = document.createTextNode(" Включить сокрытие тредов");
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
			
			// Thread Navigation Option
			var threadNavOptionLabel = document.createElement('label');
			threadNavOptionLabel.setAttribute("title","This option enables arrow links at the top right of each thread in the board pages that allow the user to skip from thread to thread, to reduce scrolling. This functionality is similar to what is seen in 2ch-style BBSs, such as Kareha.");
			var threadNavOptionText = document.createTextNode(" Включить быструю навигацию по тредам");
			var threadNavOptionCheckbox = document.createElement('input');
			threadNavOptionCheckbox.setAttribute("type","checkbox");
			threadNavOptionCheckbox.setAttribute("name","threadnavtoggle");
			threadNavOptionCheckbox.setAttribute("value","on");
			if (optionValue('doThreadNav'))
				threadNavOptionCheckbox.setAttribute("checked","checked");
			threadNavOptionLabel.appendChild(threadNavOptionCheckbox);
			threadNavOptionLabel.appendChild(threadNavOptionText);
			threadNavOptionCheckbox.addEventListener('click', function(event)
			{
				toggleOption('doThreadNav');
			}, false);
			optionsDiv.appendChild(threadNavOptionLabel);

			optionsDiv.appendChild(document.createElement('br'));

			// Quick Sage Option
			var quickSageOptionLabel = document.createElement('label');
			quickSageOptionLabel.setAttribute("title","This option enables, on reply pages and in Quick Reply, a checkbox for automatically setting the email field to 'sage,' to avoid bumping a thread, in addition to a highlighter that indicates when 'sage' is in the field. Be warned that on Firefox, this will interrupt the loading of saved form data, so if you tend to use refresh or the back and forward buttons when typing a post, you may wish to disable this!");
			var quickSageOptionText = document.createTextNode(" Включить быструю сажу");
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
			
			// Discussion Map Option
			var discussionMapOptionLabel = document.createElement('label');
			discussionMapOptionLabel.setAttribute("title","This option enables a notice in reply pages and expanded threads when a reply has been followed by another post containing a quotation link (e.g., >>23442) that references the reply in question, presumably to indicate a direct response. When the notice is clicked, a list of links to all such follow-up replies appears immediately below the reply box. This is intended to facilitate keeping track of multiple discussions within a single thread and to quickly find any direct replies to one's own post, even if they scattered throughout the thread.");
			var discussionMapOptionText = document.createTextNode(" Включить карту дискуссий");
			var discussionMapOptionCheckbox = document.createElement('input');
			discussionMapOptionCheckbox.setAttribute("type","checkbox");
			discussionMapOptionCheckbox.setAttribute("name","discussionmaptoggle");
			discussionMapOptionCheckbox.setAttribute("value","on");
			if (optionValue('doDiscussionMap'))
				discussionMapOptionCheckbox.setAttribute("checked","checked");
			discussionMapOptionLabel.appendChild(discussionMapOptionCheckbox);
			discussionMapOptionLabel.appendChild(discussionMapOptionText);
			discussionMapOptionCheckbox.addEventListener('click', function(event)
			{
				toggleOption('doDiscussionMap');
			}, false);
			optionsDiv.appendChild(discussionMapOptionLabel);

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
					event.target.textContent = "Скрыть опции";
				}
				else
				{
					optionsDiv.style.display = 'none';
					event.target.textContent = "Показать опции";
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
						var partialThreadLinkText = document.createTextNode("[Показывать последние "+optionValue('partialThreadExpansionLimit')+"]");
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
						var threadLinkText = document.createTextNode("[Раскрыть]");
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
			addQuickSage(document.getElementById('postform'));
		
		// Discussion Map
		if ((optionValue('doDiscussionMap') && window.location.href.indexOf('/res/') != -1 || window.location.href.indexOf("/kareha.pl/") != -1) && document.getElementById('postform'))
			addReplyNotes();

		// Create global expansion links
		// Global Thread Expansion
		if (window.location.href.indexOf("/res/") == -1 && window.location.href.indexOf("/kareha.pl/") == -1 && optionValue('doThreadExpansion') && optionValue('doGlobalExpansion')) 
		{
			var expandThreads = document.createElement("a");
			expandThreads.setAttribute("href", "#");
			expandThreads.textContent = 'Расширять все треды';
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
		
				event.target.textContent = (event.target.getAttribute("class") == "expandthreadslink") ? "Скрыть все треды" : 'Раскрыть все треды';
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
			expandAll.textContent = 'Расширить все изображения';
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
					evObj.initMouseEvent( 'click', false, true, window, 0,0,0,0,0, false, false, true, false, 0, null )
					allImages.snapshotItem(i).dispatchEvent(evObj);
				}

				if (optionValue('doPartialImageExpansion') && optionValue('doFullImageExpansionOnSecondClick') && event.target.getAttribute("class") != "expandimageslink")		// Next, handle partially expanded images if collapsing.
				{
					var allPartiallyExpandedImages = document.evaluate('//'+ns+"img[@class='thumb partiallyexpanded']",document,nsResolver,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
					for (var j=0; j<allPartiallyExpandedImages.snapshotLength; j++) 		// Simulate clicks on the images.
					{
						var firstEvObjForPartialImages = document.createEvent('MouseEvents');
						firstEvObjForPartialImages.initMouseEvent( 'click', false, true, window, 0,0,0,0,0, false, false, true, false, 0, null )
						allPartiallyExpandedImages.snapshotItem(j).dispatchEvent(firstEvObjForPartialImages);
						var secondEvObjForPartialImages = document.createEvent('MouseEvents');
						secondEvObjForPartialImages.initMouseEvent( 'click', false, true, window, 0,0,0,0,0, false, false, true, false, 0, null )
						allPartiallyExpandedImages.snapshotItem(j).dispatchEvent(secondEvObjForPartialImages);	// Do this twice to handle the full expansion on first click.
					}
				}
		
				event.target.textContent = (event.target.getAttribute("class") == "expandimageslink") ? "Скрыть все изображения" : 'Расширить все изображения';
				event.target.setAttribute("class", (event.target.getAttribute("class") == "expandimageslink") ? "collapseimageslink" : "expandimageslink");
		
				event.stopPropagation();
				event.preventDefault();
			}, false);	
		}

		// Add extra rule if we have global expansion links available.
		if (optionValue('doGlobalExpansion') && (optionValue('doImageExpansion') || optionValue('doThreadExpansion')))
			document.getElementById('delform').parentNode.insertBefore(document.createElement("hr"),document.getElementById('delform'));
			
		if (optionValue('doThreadNav'))
		{
			var threadDivisions = document.evaluate('.//'+ns+"hr",document.getElementById('delform'),nsResolver,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null); 	// Grab all thread links
			addThreadNav(null,0,threadDivisions.snapshotLength);
			for (var i=1; i<threadDivisions.snapshotLength; i++) // Ignore last div....
			{
				addThreadNav(threadDivisions.snapshotItem(i-1),i,threadDivisions.snapshotLength);
			}
		}
			

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

// Helper function for creating DOM objects
function createDOMElement()
{
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
	var pathMatch = new RegExp (":\\/\\/.*?\\/(.*)\\/");		// This will indeed grab the *full* path. For example www.fakeimageboard.com/pathetically/lonely/weeaboo/example/was/here will have "pathetically/lonely/weeaboo/example/was/here" returned.
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
	var testUrl = new RegExp ("(\\.|%2e)(jpe?g|png|gif|bmp|tiff?)$",'i');
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
	
	var imageContainerDiv = document.createElement("div"); // Div-within-a-div technique
	imageContainerDiv.style.padding="0 0 0 0";
	imageContainerDiv.style.cssFloat="left";
	var imageDiv = document.createElement("div");
	imageDiv.style.padding="0 0 0 0";
	imageDiv.style.position="relative"; // Set up relative positioning so that child divs can be positioned inside.
	var followingElement = parentLink.nextSibling;
	var linkParent = parentLink.parentNode;
	linkParent.removeChild(parentLink);
	linkParent.insertBefore(imageContainerDiv,followingElement);
	imageContainerDiv.appendChild(imageDiv);
	imageDiv.appendChild(parentLink);

	// Create loading message
	var loadScreen = document.createElement("div");
	loadScreen.setAttribute('class','imageloadingmessage');
	loadScreen.style.fontSize = "20px";
	loadScreen.style.backgroundColor="red";
	loadScreen.style.color="white";
	loadScreen.style.padding = "5px 5px 5px 5px";
	loadScreen.style.margin = "2px 20px"; // Same as image.
	loadScreen.style.position = "absolute";
	loadScreen.style.left = "0px";
	loadScreen.style.top = "0px";
	loadScreen.style.whiteSpace = "nowrap"; // Now why didn't I do this earlier? 
	loadScreen.style.width = "auto";
	loadScreen.style.opacity = "0.8";
	
//	imageToHandle.style.marginTop="20px";
//	loadScreen.style.marginRight = thumbWidth + "px";
	loadScreen.style.zIndex = "255";
	//imageToHandle.style.zIndex = "250";
	var loadText = document.createTextNode("(\u00B4\u30FB\u03C9\u30FB`) Загрузка!"); 
	loadScreen.appendChild(loadText);
	loadScreen.style.display = 'none';
	imageDiv.insertBefore(loadScreen,parentLink);

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
			if (optionValue('doPartialImageExpansion') && img.getAttribute("class") != "thumb partiallyexpanded" && (newWidth > optionValue('partialImageExpansionWidthLimit') || newHeight > optionValue('partialImageExpansionHeightLimit')))
			{
			
				var thisWidth = newWidth;
				var thisHeight = newHeight;
				
				var tooSmall = true;	// Boolean for whether or not the image is actually too small for partial expansion
			
				if (optionValue('partialImageExpansionWidthLimit') && thisWidth > optionValue('partialImageExpansionWidthLimit'))
				{
					thisHeight = Math.floor(optionValue('partialImageExpansionWidthLimit')*newHeight/newWidth);
					thisWidth = optionValue('partialImageExpansionWidthLimit');
					img.setAttribute("height", thisHeight);
					img.setAttribute("width", thisWidth);
				}
				
				if (optionValue('partialImageExpansionHeightLimit') && thisHeight > optionValue('partialImageExpansionHeightLimit'))
				{
					img.setAttribute("height", optionValue('partialImageExpansionHeightLimit'));
					img.setAttribute("width", Math.floor(optionValue('partialImageExpansionHeightLimit')*newWidth/newHeight));
				}
				
				img.setAttribute("src", newUrl); // Then load new.
				
				if (optionValue('doFullImageExpansionOnSecondClick'))		// Change class name of image. If expanding on second click, give intermediate name.
				{
					img.setAttribute("class", "thumb partiallyexpanded");
				}
				else
				{
					img.setAttribute("class", "thumb expanded");
				}
				
				// Change thumbnail message.
				var grabbedThumbnailMsgs = document.evaluate('preceding-sibling :: '+ns+"span[@class='thumbnailmsg']",imageContainerDiv,nsResolver,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
				if (grabbedThumbnailMsgs.snapshotLength > 0)
				{
					grabbedThumbnailMsgs.snapshotItem(grabbedThumbnailMsgs.snapshotLength - 1).textContent = "Image partially expanded.";
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
				
				// Change thumbnail message.
				var grabbedThumbnailMsgs = document.evaluate('preceding-sibling :: '+ns+"span[@class='thumbnailmsg']",imageContainerDiv,nsResolver,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
				if (grabbedThumbnailMsgs.snapshotLength > 0)
				{
					grabbedThumbnailMsgs.snapshotItem(grabbedThumbnailMsgs.snapshotLength - 1).textContent = "Показано полноразмерное изображение.";
				}
			}

			if (!doNotShowLoadMessage)	
			{
				loadMessage.style.display = "";
				loadMessage.style.marginRight = newWidth + "px";
				//img.style.marginTop="-30px";
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
			//img.style.marginTop="-20px";
//			img.style.opacity = ".5";

			// Change thumbnail message.
			var grabbedThumbnailMsgs = document.evaluate('preceding-sibling :: '+ns+"span[@class='thumbnailmsg']",imageContainerDiv,nsResolver,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
			if (grabbedThumbnailMsgs.snapshotLength > 0)
			{
				grabbedThumbnailMsgs.snapshotItem(grabbedThumbnailMsgs.snapshotLength - 1).textContent = "Показана уменьшенная копия, оригинал по клику.";
			}
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
		var newSpanLoading = document.createTextNode("(\u00B4\u30FB\u03C9\u30FB`) Загрузка!"); // Create new text in place.
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
							
							currentPost = new Array;
							var currentPostRegExp = new RegExp ("<table><tbody><tr><td class=\\\"doubledash\\\">[^\0]*?<td class=\\\"reply\\\" id=\\\"reply\\d+\\\">[^\0]*?</table>", "g");
							var currentPost = replyPage.match(currentPostRegExp);
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
						
						if (optionValue('doDiscussionMap'))
						{
							cleanOldReplyNotes();
							addReplyNotes();
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
									var myQuickReplyText = document.createTextNode("Быстрый ответ");
									myQuickReplyLink.appendChild(myQuickReplyText);
									newTables[i].getElementsByTagName("blockquote")[0].parentNode.insertBefore(myQuickReplyLink, thePlaceToPrependLink);
									var rightBracket = document.createTextNode("]\u00A0");
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
							newSpan.textContent = "Показаны все посты ";
						}
						newSpan.setAttribute('class',"omittedposts");
						var undoLinkText = document.createTextNode("[Скрыть]");
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
				alert('Тред больше не существует.')
				break;

				case 403:
				alert('Ошибка 403. Доступ запрещен.');
				break;

				default:
				alert('Не могу расширить тред: '+xmlHttp.status);
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
		var linkToReplyRegExp = (karehaBoard) ? new RegExp ("\\'>>(\\d+)\\'.*\\/(\\d+)\\/\\'\\)$") : new RegExp ("/(\\d+)\\..*\\#i?(\\d+)$"); // First group: thread ID; second group: post ID
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
		var quickReplyText = document.createTextNode("Быстрый ответ");
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
	if ((!link.parentNode.getAttribute("class") || link.parentNode.getAttribute("class").indexOf("abbrev") == -1) && replyLinkTest.test(link.getAttribute("href")) && (!link.getAttribute("class") || link.getAttribute("class").indexOf("threadexpand") == -1) && link.textContent.indexOf(">>") == -1 && link.textContent.indexOf("Скрытый тред") == -1 && link.textContent.indexOf("Показать") == -1 && link.textContent.indexOf("http") == -1 && link.nextSibling) // Post abbreviation messages, reference links to the OP, and BBWchan's "Thread Hidden" messages also carry a URL to the reply page.
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
		var quickReplyText = document.createTextNode("Быстрый ответ");
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
		var replyBoxContentColumnHeaderText = document.createTextNode("Ответ на пост "+replyNumber);
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
		var replyBoxContentPostAreaTableNameRowLeftColumnText = document.createTextNode("Имя");
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
		replyBoxContentPostAreaCloseLink.textContent = "Отмена";
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
		var replyBoxContentPostAreaTableLinkRowLeftColumnText = document.createTextNode("Мыло");
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
		var replyBoxContentPostAreaTableSubjectRowLeftColumnText = document.createTextNode("Тема");
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
		replyBoxContentPostAreaTableSubjectRowRightColumnSubmitButton.setAttribute("value", "Отправить");
		replyBoxContentPostAreaTableSubjectRowRightColumn.appendChild(replyBoxContentPostAreaTableSubjectRowRightColumnSubmitButton);
		replyBoxContentPostAreaTableSubjectRow.appendChild(replyBoxContentPostAreaTableSubjectRowLeftColumn);
		replyBoxContentPostAreaTableSubjectRow.appendChild(replyBoxContentPostAreaTableSubjectRowRightColumn);
		replyBoxContentPostAreaTBody.appendChild(replyBoxContentPostAreaTableSubjectRow);

		// Prevent quick reply from being saved once post is submitted.
		replyBoxContentPostAreaTableSubjectRowRightColumnSubmitButton.addEventListener('click', function(event) { lastQuickReply = false; }, false);
	
		var replyBoxContentPostAreaTableCommentRow = document.createElement("tr");
		var replyBoxContentPostAreaTableCommentRowLeftColumn = document.createElement("td");
		replyBoxContentPostAreaTableCommentRowLeftColumn.setAttribute("class","postblock");
		var replyBoxContentPostAreaTableCommentRowLeftColumnText = document.createTextNode("Комментарий");
		replyBoxContentPostAreaTableCommentRowLeftColumn.appendChild(replyBoxContentPostAreaTableCommentRowLeftColumnText);
		var replyBoxContentPostAreaTableCommentRowRightColumn = document.createElement("td");
		var replyBoxContentPostAreaTableCommentRowRightColumnTextField = document.createElement("textarea");
		replyBoxContentPostAreaTableCommentRowRightColumnTextField.setAttribute("name",postFields[3]);
		replyBoxContentPostAreaTableCommentRowRightColumnTextField.setAttribute("cols","65");
		replyBoxContentPostAreaTableCommentRowRightColumnTextField.setAttribute("rows","8");
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
		var replyBoxContentPostAreaTableFileRowLeftColumnText = document.createTextNode("Файл");
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
			var replyBoxContentPostAreaTableCaptchaRowLeftColumnText = document.createTextNode("Каптча");
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
		var replyBoxContentPostAreaTablePasswordRowLeftColumnText = document.createTextNode("Пароль");
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
			if (inputsToSearch[k].getAttribute("name") == "govno256")
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
	// This function adds a link to toggle a thread's display after a specified thread division. The threads are separated by horizontal rules (<hr />).
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
	newLink.textContent = 'Скрыть тред (\u2212)';
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
	
	// Slurp up all contents of the thread, until we hit the next <hr>.
	var allElementsFollowing = document.evaluate("following-sibling::"+ ((window.location.href.indexOf('nanoha.chupatz.com/') != -1 || window.location.href.indexOf('iichan.ru/') != -1) ? '' : ns) + "node()",newLink,nsResolver,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	for (var j=0; j<allElementsFollowing.snapshotLength; j++)
	{
		if (allElementsFollowing.snapshotItem(j).nodeName == 'hr' || allElementsFollowing.snapshotItem(j).nodeName == 'HR')
		/* Think that simply using the toLowerCase() method would work and therefore be a better approach? Think again. 
		   Try it and see what happens on certain sites, such as iichan.ru. This is one of those things that just make me shake my head at Javascript. */
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
		threadHiddenNote.textContent = 'Тред '+threadNumber+' скрыт.';
		threadHiddenNote.style.fontStyle = 'italic';
		threadHiddenNote.style.fontWeight = 'bold';
		threadHiddenNote.setAttribute('class','threadhiddennote');
		document.getElementById('delform').insertBefore(threadHiddenNote,threadToToggle);

		toggleLink.setAttribute('class','showthreadlink');
		toggleLink.textContent = 'Показать тред (+)'; // Update the link user has clicked accordingly
		if (!calledByCookie)
		{
			// Save the hidden thread to cookie
			// The cookie is set up as a comma-delimited list of the hidden threads' OP IDs. It's data is named "wkExtHiddenThreads_<board_dir>"
			set_cookie('wkExtHiddenThreads_'+boardPath,'thread'+threadNumber+','+get_cookie('wkExtHiddenThreads_'+boardPath),365);
		}
	}
	else // If the thread was already hidden...
	{
		if (threadToToggle.previousSibling.getAttribute('class') == 'threadhiddennote') // Remove the notification about the thread being hidden
			document.getElementById('delform').removeChild(threadToToggle.previousSibling);

		threadToToggle.style.display = ''; // HAX

		toggleLink.setAttribute('class','hidethreadlink');
		toggleLink.textContent = 'Скрыть тред (\u2212)';

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
	var sageText = document.createTextNode(" Сажа");
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

// Thread Jumping

function addThreadNav(threadDiv, count, total)
{
//	if (!threadDiv || !threadDiv.parentNode)
//		return;

	if (!count) // Use top <hr> if handling the first thread.
		threadDiv = document.getElementById('delform').previousSibling;
		
	// Create <a name> tag to reference thread's location.
	var threadLocationReference = document.createElement("a");
	threadLocationReference.setAttribute("name","D"+count);
	threadDiv.parentNode.insertBefore(threadLocationReference, threadDiv);
		
	if (count == 0)
	{
		var noUp = document.createElement("span");
		noUp.textContent = "\u25B2";
		noUp.style.cssFloat = 'right';
		noUp.style.marginLeft = "1em";
		noUp.style.fontSize = "80%";
		noUp.style.opacity = ".25";
		threadDiv.parentNode.insertBefore(noUp, threadDiv.nextSibling);
	}
	else
	{
		var upLink = document.createElement('a');
		upLink.setAttribute('href',"#D"+(count-1));
		upLink.textContent = "\u25B2";
		upLink.style.cssFloat = 'right';
		upLink.style.marginLeft = "1em";
		upLink.style.fontSize = "80%";
		upLink.style.textDecoration = 'none';
		threadDiv.parentNode.insertBefore(upLink, threadDiv.nextSibling);
	}

	if (count == total-1)
	{
		var noDown = document.createElement('span');
		noDown.textContent = "\u25BC";
		noDown.style.cssFloat = 'right';
		noDown.style.fontSize = "80%";
		noDown.style.opacity = ".25";
		threadDiv.parentNode.insertBefore(noDown,threadDiv.nextSibling);
	}
	else
	{	
		var downLink = document.createElement('a');
		downLink.setAttribute('href',"#D"+(count+1));
		downLink.textContent = "\u25BC";
		downLink.style.cssFloat = 'right';
		downLink.style.fontSize = "80%";
		downLink.style.textDecoration = 'none';
		threadDiv.parentNode.insertBefore(downLink, threadDiv.nextSibling);
	}
}
// Return a boolean value telling whether // the first argument is a string. 

function isString() {if (typeof arguments[0] == 'string') return true;if 

(typeof arguments[0] == 'object') {  var criterion =   

    arguments[0].constructor.toString().match(/string/i); 
 return (criterion != null);  }return false;}


function addReplyNotes()
{
	var threadMap = new Object();	// Associative arrays should be implemented as generic objects in JS.
	var replyBoxes = document.evaluate('.//'+ns+"td[contains(@id,'reply')]",document.getElementById('delform'),nsResolver,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);

	for (var j=0; j<replyBoxes.snapshotLength; j++)
	{
		// What is the ID of the current reply?
		var replyNumberRegExp = new RegExp ("reply(\\d+)$");
		var currentReply = (replyNumberRegExp.exec(replyBoxes.snapshotItem(j).getAttribute("id")))[1];
		
		// XPath command to grab all links in post
		var links = document.evaluate('.//'+ns+"a[@href]",replyBoxes.snapshotItem(j),nsResolver,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
		
		// Regular expression for grabbing the post to which the contents are responding, if present.
		var replyLinkRegExp = new RegExp ("#(\\d+)$");
		
		if (links)
		{
			for (var k=0; k<links.snapshotLength; k++)
			{
				var replyParent;
				if (replyLinkRegExp.test(links.snapshotItem(k).getAttribute("href")))
				{
					replyParent = replyLinkRegExp.exec(links.snapshotItem(k).getAttribute("href"))[1];
					if (replyParent != currentReply)
					{
						if (!threadMap[replyParent])
							threadMap[replyParent] = new Array(); // Use replyParent as the property (key) for the respective array of threads that are references to this post.

						threadMap[replyParent].push(currentReply);

						// GM_log (replyParent+" => ("+threadMap[replyParent]+")");
					}
				}
			}
		}
	}

	for (var j=0; j<replyBoxes.snapshotLength; j++)
	{
			var replyNumberRegExp = new RegExp ("reply(\\d+)$");
			var currentBox = replyBoxes.snapshotItem(j);
			var currentReply = (replyNumberRegExp.exec(currentBox.getAttribute("id")))[1];

			if (threadMap[currentReply] != null )
				addChildrenView(currentReply, currentBox);
	}
	
	function addChildrenView(currentReply, currentBox)
	{
		// Containing div for viewing immediate references.
		var childPostsDiv = document.createElement('div');
		childPostsDiv.setAttribute('id','responsesto'+currentReply);
		childPostsDiv.setAttribute('class','postresponses');

		// Attach div below table (hence the use of parentNode)
		currentBox.parentNode.parentNode.parentNode.parentNode.insertBefore(childPostsDiv, currentBox.parentNode.parentNode.parentNode.nextSibling);
		
		// Create interface link
		var replyNotice = document.createElement('a');
		replyNotice.setAttribute('href','#');
		replyNotice.setAttribute('class','replynotice');
		replyNotice.textContent = " "+threadMap[currentReply].length+((threadMap[currentReply].length > 1) ? " ответов" : " ответ (>>"+threadMap[currentReply][0]+")")+" \u2192";
		
		replyNotice.style.fontSize = "small";
		//replyNotice.style.display = "inline";
		//replyNotice.style.cssFloat="left";
		replyNotice.style.textDecoration = 'none';	// It tends to look much better without the underline some stylesheets give it.
		
		if (threadMap[currentReply].length == 1)	// Create a direct link to the reply post if it is just a single response.
		{
			replyNotice.setAttribute('href','#'+threadMap[currentReply][0]);
		}
		else
		{
			// Event listener for the interface link
			replyNotice.addEventListener('click', function(event)
			{
				togglePostChildrenView(currentReply, childPostsDiv);
				
				event.stopPropagation();
				event.preventDefault();
			}, false);
		}
		
		// Add interface link before blockquote (post contents)
		var blockQuote = document.evaluate('.//'+ns+"blockquote",currentBox,nsResolver,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);
		blockQuote.parentNode.insertBefore(replyNotice,blockQuote);
	}
	
	// Function for displaying the actual reply posts.
	function togglePostChildrenView(parentNumber, postsContainer)
	{
		if (postsContainer.firstChild) // If it is already non-empty, toggle its display with CSS. (Subject to change if dynamic refreshing is implemented.)
		{
			if (postsContainer.style.display == 'none')
			{
				postsContainer.style.display = '';
			}
			else
			{
				postsContainer.style.display = 'none';
			}
		}
		else						// Otherwise, set up the container and add in each reply post.
		{
			postsContainer.style.marginLeft = '3em';
			var headerText = document.createTextNode("Ответы к №."+parentNumber);
			var header = document.createElement('h3');	// Create heading for our child posts
			header.style.fontSize = '1em';
			header.style.fontWeight = 'bold';
			header.style.marginTop = '0';
			header.appendChild(headerText);
			postsContainer.appendChild(header);			
			
			for (var i=0; i<threadMap[parentNumber].length; i++)
			{
				var current = threadMap[parentNumber][i]
				var childLinkText = document.createTextNode(">>"+threadMap[parentNumber][i]);
				var childLink = document.createElement('a');
				childLink.setAttribute('href','#'+threadMap[parentNumber][i]);
				childLink.appendChild(childLinkText);
				// childLink.addEventListener('click', function(event) { highlightPost(current); }, false);
				postsContainer.appendChild(childLink);
				postsContainer.appendChild(document.createElement('br'));
			}
		}
	}
}

function cleanOldReplyNotes()
{
	var junk = document.evaluate('.//'+ns+"*[@class='replynotice' or @class='postresponses']",document,nsResolver,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	for (var i=0; i<junk.snapshotLength; i++)
	{
		junk.snapshotItem(i).parentNode.removeChild(junk.snapshotItem(i));
	}
}

function highlightPost(postNum)
{

}

// Option Storage Management

// Options are stored to *cookies,* for compatibility with non-GreaseMonkey platforms.
// The set of options resolves to a string of numbers, delimited by commas.
// The format is parsed as follows to store and retrieve options:

// <doQuickReply>,<doThreadExpansion>,<doPostExpansion>,<doThreadHiding>,<doQuickSage>,<doGlobalExpansion>,<doImageExpansion>,<doPartialThreadExpansion>,<partialThreadExpansionLimit>,<doPartialImageExpansion>,<partialThreadExpansionWidthLimit>,<doFullImageExpansionOnSecondClick>,<partialThreadExpansionHeightLimit>

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
			case 'partialImageExpansionHeightLimit':
				return partialImageExpansionHeightLimit;
				break;
			case 'doFullImageExpansionOnSecondClick':
				return doFullImageExpansionOnSecondClick;
				break;
			case 'doThreadNav':
				return doThreadNav;
				break;
			case 'doDiscussionMap':
				return doDiscussionMap;
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
			case 'partialImageExpansionHeightLimit':
				return parseInt(optionsArray[12]) || partialImageExpansionHeightLimit;
				break;
			case 'doThreadNav':
				return parseInt(optionsArray[13]);
				break;
			case 'doDiscussionMap':
				return parseInt(optionsArray[14]);
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
	if (optionsString == '')	// If the cookie is missing, consult hardcoded values above.
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
		optionsArray[12] = partialImageExpansionHeightLimit;
		optionsArray[13] = (doThreadNav) ? '1' : '0';
		optionsArray[14] = (doDiscussionMap) ? '1' : '0';
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
		case 'partialImageExpansionHeightLimit':
			optionsArray[12] = value;
			break;
		case 'doThreadNav':
			optionsArray[13] = (value) ? '1' : '0';
			break;
		case 'doDiscussionMap':
			optionsArray[14] = (value) ? '1' : '0';
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
//ХУЙНЯ ХУЙНЯ хуйня хуйня
if ((location.hostname.indexOf('2-ch.ru') != -1) ||
    (location.hostname.indexOf('iichan.ru') != -1)) {
var f_main = function() {
  var strBoard, iInThread, strHost;
  strHost = window.location.hostname;
  if (strBoard = window.location.href.match(/\/([a-z0-9]{1,3})\/((res\/)?((\d+)|wakaba)\.html)?([\?#].*)?$/)) {
    iInThread = strBoard[5];
    strBoard = strBoard[1];
  } else {
    return;
  }

  function addGlobalStyle(strCSS) {
    var objHead = document.getElementsByTagName('head')[0];
    if (!objHead) { return; }
    var objStyle = document.createElement('style');
    objStyle.type = 'text/css';
    objStyle.appendChild(document.createTextNode(strCSS));
    objHead.appendChild(objStyle);
  }

  function removeAllChilds(objParent) {
    while (objParent.firstChild) {
      objParent.removeChild(objParent.firstChild);
    }
  }

  function normalizeURL(strURL) {
    if (strURL.match(/^[a-z0-9]+:/)) {
      return strURL;
    } else if (strURL.match(/^\//)) {
      return 'http://' + strHost + strURL;
    } else {
      return window.location.href + strURL; // Total crap.
    }
  }

  // Helper function to aid debugging
  function dumpObject(objSomething, bShowFunctions) {
    var strResult = typeof(objSomething) + " {\n";
    for (mIndex in objSomething) {
      try {
        if (typeof objSomething[mIndex] == 'function') {
          if (bShowFunctions) { strResult += "\u3000\u3000" + mIndex + ": (function)\n"; }
        } else {
          strResult += "\u3000\u3000" + mIndex + ": " + objSomething[mIndex] + "\n";
        }
      } catch(e) {
        strResult += "\u3000\u3000" + mIndex + ": (Error: " + e.message + ")\n";
      }
    }
    strResult += "}";
    return strResult;
  }

  function doExpandThread(objLink, objEvent) {
    var strURL = normalizeURL(objLink.getAttribute('href'));
    var iThreadId = strURL.match(/\/(\d+)\.html/);
    if (!iThreadId || !iThreadId[1]) { return; }
    iThreadId = iThreadId[1];
    var objOP = objLink.parentNode;
    if (objOP.tagName.toLowerCase() != 'span' || objOP.className != 'omittedposts') { return; }
    var objRequest = new XMLHttpRequest();
    if (!objRequest) { return false; }
    objLink.className += ' loading';
    objRequest.onreadystatechange = function(objREvent) {
      if (objRequest.readyState == 4 && objRequest.status == 200) {
        var objParser = null;
        if (typeof(XPCNativeWrapper) == "function") {
          // Firefox XPCNativeWrapper workaround
          var objDP = new XPCNativeWrapper(window, "DOMParser()");
          objParser = new objDP.DOMParser();
        } else {
          objParser = new DOMParser();
        }
        var objDoc = objParser.parseFromString(objRequest.responseText, 'application/xhtml+xml');
        var objPosts = objDoc.evaluate(
          "//xhtml:form[@id='delform']//xhtml:table//xhtml:td[@class='reply']", objDoc,
          {
            normalResolver: objDoc.createNSResolver(objDoc.documentElement),
            lookupNamespaceURI : function (strPrefix) {
              switch (strPrefix) {
                case "xhtml": return "http://www.w3.org/1999/xhtml";
                default: return this.normalResolver.lookupNamespaceURI(strPrefix);
              }
            }
          },
          XPathResult.ORDERED_NODE_ITERATOR_TYPE, null
        );
        var objPost, arrPosts = [];
        while (objPost = objPosts.iterateNext()) {
          arrPosts.push(objPost);
        }
        arrPosts.reverse();
        for (iIndex in arrPosts) {
          objPost = arrPosts[iIndex];
          if (!document.getElementById(objPost.id)) {
            var objParent = objPost.parentNode;
            while (objParent.tagName.toLowerCase() != 'table') {
              objParent = objParent.parentNode;
            }
            objOP.parentNode.insertBefore(objParent, objOP.nextSibling);
            objParent.className += (objParent.className != '' ? ' ' : '') + 'x_unfoldreply x_unfoldthread' + iThreadId;
            try {
              if (window.opera) { objDoc = document; }
              var objReplyLink = objDoc.evaluate(
                "//xhtml:span[@class='reflink']/xhtml:a", objParent,
                {
                  normalResolver: objDoc.createNSResolver(objDoc.documentElement),
                  lookupNamespaceURI : function (strPrefix) {
                    switch (strPrefix) {
                      case "xhtml": return "http://www.w3.org/1999/xhtml";
                      default: return this.normalResolver.lookupNamespaceURI(strPrefix);
                    }
                  }
                },
                XPathResult.FIRST_ORDERED_NODE_TYPE, null
              ).singleNodeValue;
              var arrLinkID;
              if (arrLinkID = objReplyLink.getAttribute('href').match(/'>>(\d+)'/)) {
                objReplyLink.setAttribute('href', strURL + '#i' + arrLinkID[1]);
                objReplyLink.addEventListener('click', doQuickReplyForm, true);
                if (window.opera) { objReplyLink.onclick = doQuickReplyForm; }
                objReplyLink.className += ' x_qrattached';
              }
            } catch(e) { ; }
          }
        }
        objLink.className = 'x_foldlink';
        objLink.firstChild.nodeValue = '\u0441\u0432\u0435\u0440\u043d\u0443\u0442\u044c';
        objLink.nextSibling.nodeValue = '\xbb \u0447\u0442\u043e\u0431\u044b \u0441\u043a\u0440\u044b\u0442\u044c \u0442\u0440\u0435\u0434 \u043e\u0431\u0440\u0430\u0442\u043d\u043e.';
      }
    }
    objRequest.open('GET', strURL, true);
    objRequest.setRequestHeader('User-Agent', navigator.userAgent);
    objRequest.setRequestHeader('Referer', strURL);
    objRequest.setRequestHeader('Accept', 'application/xhtml+xml,application/xml,text/xml');
    objRequest.setRequestHeader('X-Extension-UUID', 'ec9e3abf-72c1-45f1-ae32-d683f9a8a92a');
    objRequest.send(null);
    objEvent.preventDefault();
  }

  function doCollapseThread(objLink, objEvent) {
    objLink.className = 'x_unfoldlink';
    var strURL = normalizeURL(objLink.getAttribute('href'));
    var iThreadId = strURL.match(/\/(\d+)\.html/);
    if (!iThreadId || !iThreadId[1]) { return; }
    iThreadId = iThreadId[1];
    try {
      var arrReplies = [];
      var objReply;
      var objOP = document.evaluate("//*[starts-with(@class, 'x_unfoldreply')]", document, null, XPathResult.ANY_TYPE, null);
      while (objReply = objOP.iterateNext()) {
        arrReplies.push(objReply);
      }
      for (iIndex in arrReplies) {
        objReply = arrReplies[iIndex];
        objReply.parentNode.removeChild(arrReplies[iIndex]);
      }
      objLink.className = 'x_unfoldlink';
      objLink.firstChild.nodeValue = '\u0440\u0430\u0437\u0432\u0435\u0440\u043d\u0443\u0442\u044c';
      objLink.nextSibling.nodeValue = '\xbb \u0447\u0442\u043e\u0431\u044b \u0443\u0432\u0438\u0434\u0435\u0442\u044c \u0442\u0440\u0435\u0434 \u0446\u0435\u043b\u0438\u043a\u043e\u043c.';
      objEvent.preventDefault();
    } catch(e) { ; }
  }

  function doExpandOrCollapse(objEvent) {
    if (this.className == 'x_unfoldlink') {
      doExpandThread(this, objEvent);
    } else {
      doCollapseThread(this, objEvent);
    }
  }

  function createElementEx(strTagName, arrAttrs, arrChildren) {
    var objElement = document.createElement(strTagName);
    for (strIndex in arrAttrs) {
      objElement.setAttribute(strIndex, arrAttrs[strIndex]);
    }
    for (strIndex in arrChildren) {
      objElement.appendChild(arrChildren[strIndex]);
    }
    return objElement;
  }

  var objReplyForm = null; // "Global" variable
  function getReplyForm(iThreadId) {
    if (!strBoard) { return null; } // Should not happen
    if (!objReplyForm) {
      objReplyForm = createElementEx('form', {
        'action': ('/cgi-bin/wakaba.pl/' + strBoard),
        'method': 'post',
        'enctype': 'multipart/form-data'
      });
      objReplyForm.id = 'x_replyform';
      objReplyForm.appendChild(createElementEx('input', {'name': 'task', 'value': 'post', 'type': 'hidden'}));
      objReplyForm.appendChild(createElementEx('input', {'name': 'parent', 'value': iThreadId, 'type': 'hidden', 'id': 'x_replyform_iparent'}));
      objReplyForm.appendChild(createElementEx('input', {'name': 'gb2', 'value': 'board', 'type': 'hidden'}));
      objReplyForm.appendChild(createElementEx('textarea', {'id': 'x_replyform_text', 'name': strHost == 'iichan.ru' ? 'nya4' : 'shampoo', 'rows': '5', 'cols': '40'}));
      var objBottomDiv = document.createElement('div');
      var objPassLabel = createElementEx('label', {'for': 'x_replyform_pass', 'title': '\u041f\u0430\u0440\u043e\u043b\u044c \u043d\u0430 \u0443\u0434\u0430\u043b\u0435\u043d\u0438\u0435 \u043f\u043e\u0441\u0442\u0430'});
      objPassLabel.appendChild(document.createTextNode('\u043f\u0430\u0440\u043e\u043b\u044c: '));
      objPassLabel.appendChild(createElementEx('input', {'id': 'x_replyform_pass', 'name': 'password', 'size': '8', 'type': 'password'}));
      var objFileLabel = createElementEx('label', {'for': 'x_replyform_file', 'title': '\u0424\u0430\u0439\u043b'});
      objFileLabel.appendChild(document.createTextNode('\u0444\u0430\u0439\u043b: '));
      objFileLabel.appendChild(createElementEx('input', {'id': 'x_replyform_file', 'name': 'file', 'size': '20', 'type': 'file'}));
      var objSageLabel = createElementEx('label', {'for': 'x_replyform_sage', 'title': '\u0421\u0430\u0433\u0435 aka DO NOT WANT'});
      objSageLabel.appendChild(createElementEx('input', {'id': 'x_replyform_sage', 'type': 'checkbox', 'name': strHost == 'iichan.ru' ? 'nya2' : 'nabiki', 'value': 'sage'}));
      objSageLabel.appendChild(document.createTextNode('sage'));
      var objCaptcha = createElementEx('span', {'id': 'x_replyform_captcha'});
      var iNeedCaptcha = qrNeedCaptcha();
      objCaptcha.style.display = iNeedCaptcha ? 'inline' : 'none';
      objCaptcha.appendChild(document.createTextNode('CAPTCHA: '));
      objCaptcha.appendChild(createElementEx('input', {'id': 'x_replyform_captcha_input', 'name': 'captcha', 'size': '10', 'value': '', 'type': 'text'}));
      objCaptcha.appendChild(document.createTextNode('<='));
      objCaptcha.appendChild(createElementEx('img', {'id': 'x_replyform_captcha_img',
        'src': iNeedCaptcha ? '/cgi-bin/captcha.pl/' + strBoard + (strHost == 'iichan.ru' ? '/' : '') + '?key=res' + iThreadId + '&dummy=quickreply' : 'about:blank', 'alt': 'CAPTCHA',
	'style': 'vertical-align: middle;'}));
      objBottomDiv.appendChild(objFileLabel);
      objBottomDiv.appendChild(objSageLabel);
      objBottomDiv.appendChild(objPassLabel);
      objBottomDiv.appendChild(objCaptcha);
      objBottomDiv.appendChild(createElementEx('input', {'type': 'submit', 'value': '\u041e\u0442\u043f\u0440\u0430\u0432\u0438\u0442\u044c'}));
      var objCloseBtn = document.createElement('button');
      objCloseBtn.addEventListener('click', hideQuickReplyForm, true);
      if (window.opera) { objCloseBtn.onclick = hideQuickReplyForm; }
      objCloseBtn.appendChild(document.createTextNode('\u2716'));
      objBottomDiv.appendChild(objCloseBtn);
      objReplyForm.appendChild(objBottomDiv);
    } else {
      var objInputParent = document.getElementById('x_replyform_iparent');
      if (!objInputParent) { return null; } // Someone touched our document. Bail out.
      objInputParent.value = iThreadId;
      qrReAddCaptcha(iThreadId);
    }
    return objReplyForm;
  }

  function qrNeedCaptcha() {
    var objCaptchaTop = document.evaluate("//img[contains(@src,'/captcha.pl/') or (@id = 'x_captcha')]", document,
					  null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    var objCaptchaTop2 = document.evaluate("//input[@name = 'captcha']", document,
					  null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    return objCaptchaTop ? 1 : objCaptchaTop2 ? 1 : 0;
  }

  function qrReAddCaptcha(iThreadId) {
    var objCaptcha = document.getElementById('x_replyform_captcha');
    if (objCaptcha) {
      if (qrNeedCaptcha()) {
        objCaptcha.style.display = 'inline';
        var objCaptchaImg = document.getElementById('x_replyform_captcha_img');
        objCaptchaImg.src = '/cgi-bin/captcha.pl/' + strBoard + '?key=res' + iThreadId + '&amp;dummy=quickreply';
        var objCaptchaInput = document.getElementById('x_replyform_captcha_input');
        objCaptchaInput.value = '';
      } else {
        objCaptcha.style.display = 'none';
      }
    } else {
      window.alert('Internal code error: no x_replyform_captcha');
    }
  }

  function doQuickReplyForm(objEvent) {
    var strURL = normalizeURL(this.getAttribute('href'));
    var iThreadId = strURL.match(/\/(\d+)\.html(#i?(\d+)|\?.*)?$/);
    if (!iThreadId || !iThreadId[1]) { return; }
    var iPostId = iThreadId[3] ? iThreadId[3] : 0;
    iThreadId = iThreadId[1];
    var objRText = document.getElementById('x_replyform_text');
    if (!objRText || !objEvent.shiftKey) {
      var objPost = this.parentNode;
      while (objPost && objPost.tagName.toLowerCase() != 'table') {
        objPost = objPost.parentNode;
      }
      var objReplyForm = getReplyForm(iThreadId);
      objReplyForm.style.display = 'block';
      objPost.parentNode.insertBefore(objReplyForm, objPost.nextSibling);
      var objRPass = document.getElementById('x_replyform_pass');
      if (objRPass) {
        try {
          var objRealPass = document.evaluate("//tr[@id='trpassword']/td/input[@name='password']", document,
                                              null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
          if (objRealPass) {
            if (objRPass.value == '') {
              objRPass.value = objRealPass.value;
            } /* else if (objRealPass.value != objRPass.value) {
              objRealPass.value = objRPass.value; // Should we?
            } */
          }
        } catch(e) { window.alert(e); }
      }
    }
    if (!objRText) { objRText = document.getElementById('x_replyform_text'); }
    if (objRText && iPostId) {
      if (objRText.value.match(/^>>\d+\s*$/) && !objEvent.shiftKey) { objRText.value = ''; }
      objRText.value += '>>' + iPostId + ' ';
    }
    objEvent.preventDefault();
  }

  function hideQuickReplyForm(objEvent) {
    try {
      if (!objReplyForm) { return; }
      var objTemp = document.getElementById('x_replyform_pass');
      if (objTemp) { objTemp.value = ''; }
      var objTemp = document.getElementById('x_replyform_text');
      if (objTemp) { objTemp.value = ''; }
      objReplyForm.style.display = 'none';
    } catch(e) { ; }
    objEvent.preventDefault();
  }

  var arrHideThreads = {};

  function loadHiddenThreads() {
    var strData = GM_getValue('2ch_hide_t.' + strBoard, '');
    if (strData != '') {
      var arrPairs = strData.split(';');
      if (arrPairs.shift() == 'Hide.v2') {
        for (var iIndex in arrPairs) {
	  try {
            var arrPair = arrPairs[iIndex].split('=');
            arrHideThreads[arrPair[0]] = decodeURIComponent(arrPair[1]);
            hideThread(arrPair[0], arrHideThreads[arrPair[0]]);
          } catch(e) { ; }
        }
      }
    }
  }

  function saveHiddenThreads() {
    var strData = 'Hide.v2';
    var arrTIDs = [];
    for (var iTID in arrHideThreads) { arrTIDs.push(iTID); }
    arrTIDs.sort(); arrTIDs.reverse();
    for (var iTIdx in arrTIDs) {
      var iTID = arrTIDs[iTIdx];
      if (strData.length < 10240) { // Should be reasonable limit
        strData += ';' + iTID + '=' + encodeURIComponent(arrHideThreads[iTID]).replace(/[=;]/g, '_');
      }
    }
    GM_setValue('2ch_hide_t.' + strBoard, strData);
  }

  function hideThread(iNumber, strReason) {
    var objThread = document.getElementById('thread-' + iNumber);
    if (objThread) {
      objThread.style.display = 'none';
      objThread.parentNode.insertBefore(
	createElementEx('div', {'id': 'thread-' + iNumber + '-hidden', 'class': 'hidden-thread'}, [
          createElementEx('a', {'href': normalizeURL('/' + strBoard + '/res/' + iNumber + '.html')}, [
            document.createTextNode('\u0422\u0440\u0435\u0434 \u2116' + iNumber)
          ]),
          document.createTextNode(' \u0441\u043a\u0440\u044b\u0442' +
            (strReason ? ' \u043f\u043e \u043f\u0440\u0438\u0447\u0438\u043d\u0435: \xab' + strReason + '\xbb ' : '. ')),
        ]),
        objThread
      );
    }
  }

  function unhideThread(iNumber) {
    if (arrHideThreads[iNumber]) {
      delete arrHideThreads[iNumber];
      saveHiddenThreads();
    }
  }

  function hideThreadClick(objEvent) {
    if (this && this.parentNode && this.parentNode.id) {
      var iNumber = this.parentNode.id.replace('thread-', '');
      var strReason =  window.prompt('\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043f\u0440\u0438\u0447\u0438\u043d\u0443 \u0441\u043a\u0440\u044b\u0442\u0438\u044f \u0442\u0440\u0435\u0434\u0430 \u2116' + iNumber + ':');
      if (strReason) {
        arrHideThreads[iNumber] = strReason;
        saveHiddenThreads();
        hideThread(iNumber, strReason);
      }
    }
    objEvent.preventDefault();
  }

  function unhideThreadClick(objEvent) {
    if (this && this.parentNode && this.parentNode.id) {
      var iNumber = this.parentNode.id.replace('thread-', '').replace('-hidden', '');
      if (window.confirm('\u0412\u0435\u0440\u043d\u0443\u0442\u044c \u0442\u0440\u0435\u0434 \u2116' + iNumber + '?')) {
        unhideThread(iNumber);
        window.location.reload();
      }
    }
    objEvent.preventDefault();
  }

  addGlobalStyle(
    '.postername, .postertrip, .commentpostername { display: inline; visibility: visible; font-weight: bold; color: #339; } \
    .postertrip { color: #993; } \
    .hidden-thread { color: #666; padding: 5px 0 0 28px; min-height: 24px; vertical-align: middle; background: url(' +
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAC5VBMVEUAAIlvDBBzDQ6ZAACNCQuXBgaQCguSDQ6OEhKdDAw4O' +
      'EZ%2FHSOaExOcFRWbFxebGBhAQECbGRmcHx%2BgHx9HRkalHh5IR0elICBISEijISFvOTqlIyKlJCOWKiymJCSnJCSnJSU%2FT2CmJiWnJiaoJiZOTU2oJy' +
      'enKCdvP0WnKChHTmSoKCipKCieLS2oKSmpKSmpKipTT0%2BpKyuqKyuqLCyrLS1cUFCZNjaeNjatNjaeQUCfQUFeXV2MSkmvQD9jY2OxQkGgTEyzRERVaX6' +
      '0RUVqZWVnZ2dpZW%2B1Rka1R0e0TEuJYGB5aWm1UlC5UVG1U1K3VlW4VlSiYGB9cnK7WFiiY2O8WFiaZmq8WVm8Wlq9WlqkZWW9XFt8eHi%2BXV2%2BXl6%' +
      '2FX1%2BpaWmjbGu%2FYGB%2BfHzAYmLAY2OEf36DgoKEhIO%2BbGm%2FbWuFjpeOjIzHdXXIdnbId3enhoaRkZHJeXnGe3rIfn2VlZaZlJKmj462iIinkZD' +
      'Lg4KampqmlpXKiYfKionKi4menp68kpGpmpqnnZyonp2poKCloqKqoaGpo6PSkpHSk5KmpqXTk5POlpPAnJyop6aqpqbUlJSop6eoqKepqamqqanPmpfVl5' +
      'eqqqmqqqrVmJirq6qrq6vQnJmsrKzKoJ2tra21qqqurq6nsLqvr66xsLDYoaGysrKzs7Pao6O1tLO6sbbZpqW3t7bbqKjcqamzusHdqqrdq6vLtLLZr6%2F' +
      'cubfExMTFxcXjurrevrrKx8nNzc3hxcPOzs3Q0M%2Fgysfa0M%2FhzczpysrlzMzk0M3X19ft1tbf3dvv2Njg39zf39%2Fg393n3Nru2dnv2dnh4N%2Fw2t' +
      'rp3trh4eDi4d%2Fw3Nzl5eXp5eHq5eDr5uLr5%2BPo6Ojs6OTt6Ojt6ubx6Oft7Ojs7Oz06%2Bru7u707Ozw8PD47u7z8vH39PT39vX49%2Fb69vb79%2Ff' +
      '6%2BPf5%2Bff5%2Bfj7%2BPj8%2BPj6%2Bfn8%2Bfn7%2Bvr8%2B%2FsqJSU76%2FbaAAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxMA' +
      'AAsTAQCanBgAAAAHdElNRQfXBQcQAg8od%2B2dAAABbUlEQVQoz2NgoCfYXBwVVbwJQ3i2p6majo6asccMFOHzaSoGCb07d06KN1BJOw8V3L%2B4p9aKzyK' +
      'poqWzs7UqSJDHunnWwttAiZmn7jRIe207e%2BLMhcuXD1kyyyt0v3i4ECjR8%2BCAnVLfwdUZqgISPrrMetX6Tue%2BTAVKTLg1XdN%2FS65NWY4ilywzR%' +
      '2F%2BRSKO1n%2BYCJaZcz5JMDBbZsdHZnZGZtzJlUb1K3of5IIkbvsLe32oeL9FiYmYJv9to2KQQ8hoqIbOgXOzaGm5mdo3d2%2B1dtyqHvQFL3MyWq7u0z' +
      '8ycmU0qtshtz6MulfzPIInJ9%2BZpBu7dFcDMapueue752%2BMx%2Buu%2FgixfeuWog3qJNjNn6f2Xr969f7Jc2%2BXq05VAiWPL2kP5hJiZHdtmzZozra' +
      'PQgj964orT0GBJFTVNO%2Fzs48dnF1f5iScjBeLJVHn9OFAgxunLp55EC3YTNSAwQQt2ENhUEBFRsIGCmAYAfnmQEILCdB4AAAAASUVORK5CYII%3D' +
    ') no-repeat left center; } \
    form > div + br[clear="left"] { display: block; height: 1px; } \
    .reply label { font-size: 80%; color: #666; } .reply label span { font-size: 125%; } \
    .reply label a[href="mailto:sage"] { color: #f33; padding-left: 16px; background: url(' + 
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAMAAAAolt3jAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYm' + 
      'UgSW1hZ2VSZWFkeXHJZTwAAAClUExURcA%2FP5APD5wcHJgXF40MDMJBQZMTE%2Fr6%2BqEgIOjo6PHx8aw5ObZDQ79MTLU0NN7e3qYlJbk4OKsqKrAvL%' +
      '2BPj4%2B3t7fb29sxgYKA5OdXV1d%2Bfn708PKU6OrxUVKc0NJ4qKshcXOCgoLJKSqhAQPns7PPm5tDQ0LE%2BPsVdXdnZ2caFhbtHR6A0NMeHh9qXl81w' +
      'cM6EhMNPT8VoaMV7e798fK5HR7tfX0Qr1q0AAADCSURBVHjaYlBRFGeFAnFFFYAAYpBiQAJSAAHEoCCtxw4B%2BobSCgABxCAoKKbBy8sLxGJigoIAAcTA' +
      'x8cFBAZG2tpcXHx8AAHEICwsKsvDwwPEoqLCwgABxCAkxAkExmbq6pycQkIAAcQgICCixM3NDcQiIgICAAHEwMFhws%2FPbyonx88BBAABxMAEBprKypog' +
      'GiCAGJjBQFJeXhJEAwQQgwwbCEioqUkAKRmAAGLQZUQCugABxKCqpcMCBTpaqgABBgA0Xgxlx6wWOwAAAABJRU5ErkJggg%3D%3D) no-repeat left center; } \
    label, label input { vertical-align: middle; } \
    a.loading { padding-left: 16px; \
      background: url(data:image/gif;base64,R0lGODlhEAAQAOYAAP%2F%2F%2F9TU1JSUlGBgYEBAQERERG5ubqKiotzc3KSkpCQkJCgoK' +
      'DAwMDY2Nj4%2BPmpqarq6uhwcHHJycuzs7O7u7sLCwoqKilBQUF5eXr6%2BvtDQ0Do6OhYWFoyMjKqqqlxcXHx8fOLi4oaGhg4ODmhoaJycnGZmZra2tkZ' +
      'GRgoKCrCwsJaWlhgYGAYGBujo6PT09Hh4eISEhPb29oKCgqioqPr6%2Bvz8%2FMDAwMrKyvj4%2BNbW1q6urvDw8NLS0uTk5N7e3s7OzsbGxry8vODg4Nj' +
      'Y2PLy8tra2np6erS0tLKyskxMTFJSUlpaWmJiYkJCQjw8PMTExHZ2djIyMurq6ioqKo6OjlhYWCwsLB4eHqCgoE5OThISEoiIiGRkZDQ0NMjIyMzMzObm5' +
      'ri4uH5%2BfpKSkp6enlZWVpCQkEpKSkhISCIiIqamphAQEAwMDKysrAQEBJqamiYmJhQUFDg4OHR0dC4uLggICHBwcCAgIFRUVGxsbICAgAAAAAAAAAAAA' +
      'AAAACH%2FC05FVFNDQVBFMi4wAwEAAAAh%2BQQFAAAAACwAAAAAEAAQAAAHjYAAgoOEhYUaIigshoUHGyMpLYI1OTaFCQocJCougjYvPDWDAQURHYY1ExO' +
      'WAAIKEowAPD48ggMLELEyPz6CBAwTsQA6RIIFDRSxNkA9ggYOFbETQTqCBwUWsT1CQ4IIDxcehjoqFUWDEBgfJRovMgg3BzvdhBkgJgYwMx0rOwiMIU6si' +
      'NGBBo5gwhIGAgAh%2BQQFCgAAACwBAAEADgAOAAAHg4AAgjoCVlcLWlwagow7F1QKWCxbI14ljElOUkcQE1NJXSlbgkYDT5eMgjGMCQUiqbA2AEdKULCpO' +
      'TUDSzy3jEVFJkxFvoITFBZNQMU5YRRIDwfFUz88PhZRGbcuAUM1ADgxM0gIOTkuRF8aFIxAJVUrWR5JQmBTsFM4SDQqQQgvjAIBACH5BAUKAAAALAEAAQA' +
      'OAA4AAAeDgACCCAkSaAVdKwGCjEIGSgUODQwLaWuMN11mZ1AUFEJRagsHACFjTTuMjGcsTxpiD2Wqqg9sXCsSPbOMSW1pMUcvu4JTLSwdMzLDqjQWRsuMX' +
      '2RCyzU5ABMeZbqzOTzKAEY0HkBTNjYvEy4UNYw%2FQidCQUA6Py7XqkUIGjg9Q%2ByMAgEAIfkEBQoAAAAsAQABAA4ADgAAB4WAAII%2BJx0PTSBrRoKMO' +
      'BYGJhhmWmlNSYxAIkdrGkU8QVwOTjsAUyUxN4yMZV5LOjhVJ6qqRwsCSSsIs4wQalZrZTm7ghMRVG5rwsNTHHEVO2HDAElsSkYnPdJNKSJFXzchw28MQAA' +
      'uXzghL4I27QBwjBNEAQghUzwyNbs5E2FhEy%2F0MQoEACH5BAUKAAAALAEAAQAOAA4AAAeEgACCE2BuZB0lED6CjAgqcGQWM0cSMRWMQzsJFT8yMgEJJA8' +
      'ZAEU3OzqMjEkfEj8%2FYhqqqmRaaz03U7OMQWl0YEE2u4IUDko9QMLDFA0FPwEvwwBCdV0UCLrDdHECNWE%2B0bMdWCgBADJTEzKMKiZyCgmMNUUvOYItb' +
      'XMHuzbKBSKyBAUCACH5BAUKAAAALAEAAQAOAA4AAAeDgACCLz84JyoQQBOCjFNAN2JJHgdwCT2MFBpfRlM1OSEZVVVAADU%2FPS6MjEEzZGE8CKmqjG5RE' +
      'FNDMrOMPQZnU2G7jEVdBhSLwgBFTCYvRTbJQUtjNTLQwlxpawA217MlDk1GqgMqU1NiMFJOSap1dm1bLFhxFzuzQCJoCgtmZDqMAgEAIfkEBQoAAAAsAQA' +
      'BAA4ADgAAB4CAAII2PD46PTohL4KMOVNDCAFAQTdQIYw1FC4UMgA2FDonSD%2BCLzw5jIxGHkkUNjKoqYxQZUA2NbKpQys7ubIyHWS%2BqTIzHQUtvb4BM' +
      'CUxKV3DWQYQGg1bFrk7TXuXWWosd2ITFBVVeV03jAdOeHF1DQ5pekKyAWQYDgUGBwiMgQAh%2BQQFCgAAACwBAAEADgAOAAAHf4AAggA2OUUUFEU1g4w1M' +
      'kUTYUNDPIMljII5E0Q6EwBADC2YglNAPTIiKU2jgggVQ0ojKqwAE0I4CltTtDVJYgssu6w5HipmWCe0Q1kQZAp0tBArQAFKV3CjFRYHu25PczFQPEVAayA' +
      'WGoMqH05pS0xdBh1gmEYHMBgmFic%2Bg4EAOw%3D%3D) no-repeat left center; } \
    .x_unfoldreply td { border-color: #999; } \
    .x_qrattached:hover { border-bottom: 1px #ccc dotted; } \
    div a.show-hide-thread { display: block; float: right; font-size: 70%; text-decoration: none; } \
    div a.show-hide-thread:hover { text-decoration: underline; color: #f33; } \
    #x_replyform { display: block; border: 1px #ccc solid; margin: 0 2px 2px 2px; padding: 5px; \
                   background-color: #ddd; -moz-border-radius: 5px; } \
    #x_replyform textarea { width: 100%; border: 1px #888 solid; } \
    #x_replyform div { overflow: hidden; margin-top: 5px; } \
    #x_replyform label { float: left; margin-right: 10px; } \
    #x_replyform input[type="text"], #x_replyform input[type="password"] { border: 1px #888 solid; } \
    #x_replyform input[type="file"] > input[type="text"] { border: 1px #888 solid; } /* doesn`t work, however... */ \
    #x_replyform input[type="submit"] { /* float: right; */ border: 1px #666 solid; margin-left: 10px; } \
    #x_replyform button { /* float: right; */ border: 1px #666 solid; margin-left: 10px; }'
  );
  // Add thread unfolding stuff
  var arrSpans = [];
  var objSpan, iIndex;
  //var objOP = document.evaluate("//span[@class='omittedposts']", document, null, XPathResult.ANY_TYPE, null);
  var objOP = document.evaluate('//span[@class="omittedposts"]', document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null );
  while (objSpan = objOP.iterateNext()) {
    arrSpans.push(objSpan);
  }
  for (iIndex in arrSpans) {
    objSpan = arrSpans[iIndex];
    try {
      var strText = objSpan.childNodes[0].nodeValue;
      var arrMatches;
      if (arrMatches = strText.match(/^([^\.]+\s+\d+\s+[^\.]+\.).*/)) {
        var objSibling = objSpan.previousSibling;
        var strURL = null;
        while (objSibling && !strURL) {
          if (objSibling.tagName && objSibling.tagName.toLowerCase() == 'span') {
            if (objSibling.className.toLowerCase() == 'replytothread') {
              objSibling = objSibling.firstChild;
              while (objSibling && !strURL) {
                if (objSibling.tagName && objSibling.tagName.toLowerCase() == 'a') {
                  strURL = objSibling.getAttribute('href');
                }
                objSibling = objSibling.nextSibling;
              }
            }
          } else if (objSibling.tagName && objSibling.tagName.toLowerCase() == 'a') {
	    if (objSibling.getAttribute('href').match(/\/res\/\d+\.html/)) {
	      strURL = objSibling.href;
	    }
          }
          objSibling = objSibling.previousSibling;
        }
        if (strURL) {
          removeAllChilds(objSpan);
          objSpan.appendChild(document.createTextNode(arrMatches[1] + ' \u041d\u0430\u0436\u043c\u0438\u0442\u0435 \xab'));
          var objExpandLink = document.createElement('a');
          objExpandLink.appendChild(document.createTextNode('\u0440\u0430\u0437\u0432\u0435\u0440\u043d\u0443\u0442\u044c'));
          objExpandLink.setAttribute('href', strURL);
          objExpandLink.className = 'x_unfoldlink'
          objExpandLink.addEventListener('click', doExpandOrCollapse, true);
          if (window.opera) {
            objExpandLink.onclick = doExpandOrCollapse;
          }
          objSpan.appendChild(objExpandLink);
          objSpan.appendChild(document.createTextNode('\xbb \u0447\u0442\u043e\u0431\u044b \u0443\u0432\u0438\u0434\u0435\u0442\u044c \u0442\u0440\u0435\u0434 \u0446\u0435\u043b\u0438\u043a\u043e\u043c.'));
        }
      } else {
        window.alert(strText);
      }
    } catch(e) { ; }
  }
  // Attach quick reply code to links
  var arrLinks = [];
  var objLink, iIndex;
  var objRL = document.evaluate("//td[@class='reply']/span[@class='reflink']/a", document, null, XPathResult.ANY_TYPE, null);
  while (objLink = objRL.iterateNext()) {
    arrLinks.push(objLink);
  }
  for (iIndex in arrLinks) {
    objLink = arrLinks[iIndex];
    objLink.addEventListener('click', doQuickReplyForm, true);
    if (window.opera) { objLink.onclick = doQuickReplyForm; }
    objLink.className += ' x_qrattached';
  }
  // Replace email input with "sage" checkbox
  var objEmail = document.evaluate(strHost == 'iichan.ru' ? "//input[@name='nya2']" : "//input[@name='nabiki']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  if (objEmail) {
    var objEmailCell = objEmail.parentNode;
    removeAllChilds(objEmailCell); objEmail = 0;
    var objSageLabel = createElementEx('label', {'title': 'DO NOT WANT'});
    objSageLabel.appendChild(createElementEx('input', {'name': strHost == 'iichan.ru' ? 'nya2' : 'nabiki', 'value': 'sage', 'type': 'checkbox', 'style': 'margin-left: 0; padding-left: 0;'}));
    objSageLabel.appendChild(document.createTextNode(' sage'));
    objEmailCell.appendChild(objSageLabel);
  }
};
}