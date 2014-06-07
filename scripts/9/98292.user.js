// ==UserScript==
// @name              reddit top bar
// @namespace         com.stupidkitties
// @version           1.2.3
// @description       Fixes reddit's stupid top bar.
// @author            kine (kine@stupidkitties.com)
// @acknowledgements  impl (minor code improvements)
// @date              2012-08-04
// @licence           Modified (3-clause) BSD
// @notes             For description, licence text, and change log, see bottom of file.
// @include           http://reddit.com/*
// @include           https://reddit.com/*
// @include           http://*.reddit.com/*
// @include           https://*.reddit.com/*
// ==/UserScript==


// ==============================
// INITIALISE SETTINGS VARS
// ==============================
// The following lines generate default settings if there are none already present.
// (Otherwise things break.)
if (GM_getValue("MyRedditsListName", "na") == "na") {
	GM_setValue("MyRedditsListName", "my reddits");
}
if (GM_getValue("MyRedditsListContents", "na") == "na") {
	var okMyRedditsListContents = [];
	okMyRedditsListContents     = ["announcements","askreddit","blog","funny","gaming","iama","pics","politics","reddit.com","todayilearned","videos","worldnews"];
	GM_setValue("MyRedditsListContents", uneval(okMyRedditsListContents));
}
if (GM_getValue("MyRedditsListShowLastFour", "na") == "na") {
	GM_setValue("MyRedditsListShowLastFour", true);
}
if (GM_getValue("ShortcutsListContents", "na") == "na") {
	var okShortcutsListContents = [];
	okShortcutsListContents     = [""];
	GM_setValue("ShortcutsListContents", uneval(okShortcutsListContents));
}
if (GM_getValue("UseURLOnOff", "na") == "na") {
	GM_setValue("UseURLOnOff", false);
}
if (GM_getValue("UseURLText", "na") == "na") {
	GM_setValue("UseURLText", "http://");
}


// ==============================
// PREFERENCES LINK
// ==============================
function okPreferencesInit() {
	var okUserActionsBar, okUserActionsBarPreferenceSpan, okUserActionsBarPreferenceAnchor;

	// Define variable linking to the element to insert into.
	// (This is what we'd have to change if reddit updated their element IDs.)
	okUserActionsBar = document.getElementById("header-bottom-right");

	// Create RTB preference elements.
	okUserActionsBarPreferenceSpan = document.createElement("span");
	okUserActionsBarPreferenceSpan.setAttribute("class", "separator");
	okUserActionsBarPreferenceSpan.innerHTML = "|";

	okUserActionsBarPreferenceAnchor = document.createElement("a");
	okUserActionsBarPreferenceAnchor.setAttribute("title", "View/set preferences for reddit top bar script");
	okUserActionsBarPreferenceAnchor.setAttribute("href", "#");
	okUserActionsBarPreferenceAnchor.innerHTML = "top bar";

	// Check to see what the last child node is — we prefer to insert before 'log out'.
	okUserActionsBarLength = okUserActionsBar.childNodes.length - 1;
	// If 'log out' is the last child...
	if (okUserActionsBar.childNodes[okUserActionsBarLength].tagName == "FORM") {
		okUserActionsBarInsertBefore = okUserActionsBar.childNodes.length - 1;

		// Insert them into the page.
		okUserActionsBar.insertBefore(okUserActionsBarPreferenceSpan, okUserActionsBar.childNodes[okUserActionsBarInsertBefore]);
		okUserActionsBar.insertBefore(okUserActionsBarPreferenceAnchor, okUserActionsBarPreferenceSpan);
	// If 'log out' is not the last child...
	} else {
		okUserActionsBarInsertBefore = okUserActionsBar.childNodes.length;

		// Insert them into the page.
		okUserActionsBar.insertBefore(okUserActionsBarPreferenceAnchor, okUserActionsBar.childNodes[okUserActionsBarInsertBefore]);
		okUserActionsBar.insertBefore(okUserActionsBarPreferenceSpan, okUserActionsBarPreferenceAnchor);
	}

	// Make the link show the preferences panel when clicked.
	okUserActionsBarPreferenceAnchor.addEventListener("click", okShowPreferencesPanel, false);
}


// ==============================
// SHOW PREFERENCES PANEL
// ==============================
function okShowPreferencesPanel() {
	var okPreferencesPanelDarkOverlay, okPreferencesPanelDiv, okPreferencesPanelWellDiv;

	// Set up the style.
	okPreferencesPanelCSS = document.createElement("style");
	okPreferencesPanelCSS.setAttribute("type", "text/css");
	okPreferencesPanelCSSRules = '' +
		'#okOverlay { position: fixed; z-index: 998; left: 0; top: 0; width: 100%; height: 100%; opacity: 0.75; background-color: #000000; } ' +
		'#okPreferences { position: fixed; z-index: 999; left: 50%; top: 30px; width: 520px; margin: auto auto; margin-left: -240px; padding: 10px 10px; text-align: center; background-color: #ffffff; border: 1px solid #666666; border-radius: 5px; } ' +
		'#okPreferences * { font-size: 9pt; font-family: "Lucida Grande", "Segoe UI", sans-serif; line-height: 9pt; } ' +
		'#okPreferencesTitle { margin: auto auto; padding: 0px 0px; text-align: center; color: #404040; font-size: 11pt; font-weight: normal; font-family: "Helvetica Neue", "Lucida Grande", "Segoe UI", sans-serif; text-shadow: 0 1px 1px rgba(0, 0, 0, 0.1); } ' +
		'#okPreferencesWell { margin: auto auto; margin-top: 10px; padding: 10px 10px; text-align: left; background-color: #f8f8f8; border: 1px solid #e2e2e2; border-radius: 5px; box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.1); } ' +
		'#okPreferencesWell p { margin-top: 20px; margin-bottom: 0px; } ' +
		'#okPreferencesWell p:first-child { margin-top: 0px; } ' +
		'#okPreferencesWell p:nth-child(3) { margin-top: 0px; } ' +
		'#okPreferencesWell p:last-child { margin-top: 20px; font-size: 8pt; color: #505050; } ' +
		'#okPreferencesWell .okExText { font-size: inherit; color: #4e628b; } ' +
		'#okPreferencesMyRedditsSubredditsLabel, #okPreferencesShortcutsSubredditsLabel, #okPreferencesUseURLLabel { display: block; } ' +
		'#okPreferencesMyRedditsName { width: 16em; margin-left: 12px; } ' +
		'input[type="checkbox"] { position: relative; top: -1px; margin-right: 6px; vertical-align: bottom; } ' +
		'input[type="text"], textarea { padding: 2px 2px; border: 1px solid #c5c5c5; border-radius: 2px; } ' +
		'textarea { width: 100%; height: 80px; min-width: 100%; min-height: 3em; margin-top: 4px; word-wrap: break-word; -moz-box-sizing: border-box; } ' +
		'input[type="text"]:focus, textarea:focus { border: 1px solid #94bbf5; } ' +
		'#okPreferencesUseURLText { width: 100%; margin-top: 4px; -moz-box-sizing: border-box; }' +
		'input[type="text"][disabled], textarea[disabled] { color: #808080; background-color: #f0f0f0; }' +
		'#okPreferencesClose { ' +
			'display: inline-block; margin: auto auto; margin-top: 10px; padding: 5px 20px; text-align: center; color: #202026; font-weight: normal; text-decoration: none; font-family: "Lucida Grande", "Segoe UI", sans-serif; ' +
			'text-shadow: 0 1px 1px rgba(0, 0, 0, 0.1); background: -moz-linear-gradient(top, #e1edfd, #c1d8f9); outline: none; border: 1px solid #94bbf5; border-radius: 2px; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2); ' +
		'} ' +
		'#okPreferencesClose:hover { background: -moz-linear-gradient(top, #dae8fc, #b2cef8); }' +
		'#okPreferencesClose:active { position: relative; top: 1px; color: rgba(32, 32, 38, 0.7); background: -moz-linear-gradient(top, #b2cef8, #dae8fc); }';
	okPreferencesPanelCSS.innerHTML = okPreferencesPanelCSSRules;
	document.getElementsByTagName('head')[0].appendChild(okPreferencesPanelCSS);

	// Create the overlay.
	okPreferencesPanelDarkOverlay = document.createElement("div");
	okPreferencesPanelDarkOverlay.setAttribute("id", "okOverlay");

	// Create the preferences panel.
	okPreferencesPanelDiv = document.createElement("div");
	okPreferencesPanelDiv.setAttribute("id", "okPreferences");

	// Create the preferences-panel title.
	okPreferencesPanelTitleH2 = document.createElement("h2");
	okPreferencesPanelTitleH2.setAttribute("id", "okPreferencesTitle");
	okPreferencesPanelTitleH2.innerHTML = "Preferences: reddit top bar";

	// Create the preference-panel 'well'.
	okPreferencesPanelWellDiv = document.createElement("div");
	okPreferencesPanelWellDiv.setAttribute("id", "okPreferencesWell");

	// Create the main preferences-panel paragraphs.
	okPreferencesPanelWellP1 = document.createElement("p");
	okPreferencesPanelWellP2 = document.createElement("p");
	okPreferencesPanelWellP3 = document.createElement("p");
	okPreferencesPanelWellP4 = document.createElement("p");
	okPreferencesPanelWellP5 = document.createElement("p");

	// Create the 'name of my reddits menu' label.
	okPreferencesPanelMyRedditsNameLabel = document.createElement("label");
	okPreferencesPanelMyRedditsNameLabel.setAttribute("id", "okPreferencesMyRedditsNameLabel");
	okPreferencesPanelMyRedditsNameLabel.setAttribute("for", "okPreferencesMyRedditsName");
	okPreferencesPanelMyRedditsNameLabel.setAttribute("title", "This field determines the name (or title) of the 'my reddits' menu at the top left of the page. The default is 'my reddits'.");
	okPreferencesPanelMyRedditsNameLabel.innerHTML = "Name of 'my reddits' menu:";

	// Create the 'name of my reddits menu' text box.
	okPreferencesPanelMyRedditsNameInput = document.createElement("input");
	okPreferencesPanelMyRedditsNameInput.setAttribute("id", "okPreferencesMyRedditsName");
	okPreferencesPanelMyRedditsNameInput.setAttribute("type", "text");
	okPreferencesPanelMyRedditsNameInput.setAttribute("value", okGetPreferences("MyRedditsListName", "my reddits"));
	if (okGetPreferences("UseURLOnOff", false) == true) {
		okPreferencesPanelMyRedditsNameInput.setAttribute("disabled", "disabled");
	}

	// Create the 'sub-reddits to show in my reddits' label.
	okPreferencesPanelMyRedditsSubredditsLabel = document.createElement("label");
	okPreferencesPanelMyRedditsSubredditsLabel.setAttribute("id", "okPreferencesMyRedditsSubredditsLabel");
	okPreferencesPanelMyRedditsSubredditsLabel.setAttribute("for", "okPreferencesMyRedditsSubreddits");
	okPreferencesPanelMyRedditsSubredditsLabel.setAttribute("title", "This field contains a comma-separated list of the sub-reddits you would like to display in the 'my reddits' menu at the top left of the page. You may enter them in any order. To set a custom display name, add a '|' (pipe) after the sub-reddit name, followed by the desired display name (e.g., australia|oz).");
	okPreferencesPanelMyRedditsSubredditsLabel.innerHTML = "Sub-reddits to show in 'my reddits' menu:";

	// Create the 'sub-reddits to show in my reddits' text box.
	okPreferencesPanelMyRedditsSubredditsInput = document.createElement("textarea");
	okPreferencesPanelMyRedditsSubredditsInput.setAttribute("id", "okPreferencesMyRedditsSubreddits");
	okPreferencesPanelMyRedditsSubredditsInput.setAttribute("spellcheck", "false"); // disable spell-check in FF
	okPreferencesPanelMyRedditsSubredditsInput.innerHTML = eval(okGetPreferences("MyRedditsListContents", "announcements\",\"askreddit\",\"blog\",\"funny\",\"gaming\",\"iama\",\"pics\",\"politics\",\"reddit.com\",\"todayilearned\",\"videos\",\"worldnews"));
	if (okGetPreferences("UseURLOnOff", false) == true) {
		okPreferencesPanelMyRedditsSubredditsInput.setAttribute("disabled", "disabled");
	}

	// Create the 'show last four' tick box.
	okPreferencesPanelShowLastFourInput = document.createElement("input");
	okPreferencesPanelShowLastFourInput.setAttribute("id", "okPreferencesShowLastFour");
	okPreferencesPanelShowLastFourInput.setAttribute("type", "checkbox");
	okPreferencesPanelShowLastFourInput.setAttribute("value", GM_getValue("MyRedditsListShowLastFour", false));
	if (GM_getValue("MyRedditsListShowLastFour", false) == true) {
		okPreferencesPanelShowLastFourInput.setAttribute("checked", "checked");
	}
	if (okGetPreferences("UseURLOnOff", false) == true) {
		okPreferencesPanelShowLastFourInput.setAttribute("disabled", "disabled");
	}

	// Create the 'show last four' label.
	okPreferencesPanelShowLastFourLabel = document.createElement("label");
	okPreferencesPanelShowLastFourLabel.setAttribute("id", "okPreferencesShowLastFourLabel");
	okPreferencesPanelShowLastFourLabel.setAttribute("for", "okPreferencesShowLastFour");
	okPreferencesPanelShowLastFourLabel.setAttribute("title", "Enabling this option will display the all, random, friends, and mod links at the bottom/end of the 'my reddits' menu, separated by a thin line.");

	// Put the 'show last four' tick box inside its label so the tick box is properly aligned.
	okPreferencesPanelShowLastFourLabel.appendChild(okPreferencesPanelShowLastFourInput);
	okPreferencesPanelShowLastFourLabel.appendChild(document.createTextNode("Show all/random/friends/mod at end of list"));

	// Create the 'sub-reddits to show in short-cuts bar' label.
	okPreferencesPanelShortcutsSubredditsLabel = document.createElement("label");
	okPreferencesPanelShortcutsSubredditsLabel.setAttribute("id", "okPreferencesShortcutsSubredditsLabel");
	okPreferencesPanelShortcutsSubredditsLabel.setAttribute("for", "okPreferencesShortcutsSubreddits");
	okPreferencesPanelShortcutsSubredditsLabel.setAttribute("title", "This field contains a comma-separated list of the sub-reddits you would like to display in the short-cuts bar across the top of the page. You may enter them in any order. To set a custom display name, add a '|' (pipe) after the sub-reddit name, followed by the desired display name (e.g., australia|oz). As a rule of thumb, a 1024px browser window will generally show about 15 links at a time; a 1920px window, about 28. (Any over-flow will be clipped.)");
	okPreferencesPanelShortcutsSubredditsLabel.innerHTML = "Sub-reddits to show in short-cuts bar:";

	// Create the 'sub-reddits to show in short-cuts bar' text box.
	okPreferencesPanelShortcutsSubredditsInput = document.createElement("textarea");
	okPreferencesPanelShortcutsSubredditsInput.setAttribute("id", "okPreferencesShortcutsSubreddits");
	okPreferencesPanelShortcutsSubredditsInput.setAttribute("spellcheck", "false"); // disable spell-check in FF
	okPreferencesPanelShortcutsSubredditsInput.innerHTML = eval(GM_getValue("ShortcutsListContents", ""));
	if (okGetPreferences("UseURLOnOff", false) == true) {
		okPreferencesPanelShortcutsSubredditsInput.setAttribute("disabled", "disabled");
	}

	// Create the 'use URL' tick box.
	okPreferencesPanelUseURLInputTick = document.createElement("input");
	okPreferencesPanelUseURLInputTick.setAttribute("id", "okPreferencesUseURLOnOff");
	okPreferencesPanelUseURLInputTick.setAttribute("type", "checkbox");
	okPreferencesPanelUseURLInputTick.setAttribute("value", GM_getValue("okUseURLOnOff", false));
	if (okGetPreferences("UseURLOnOff", false) == true) {
		okPreferencesPanelUseURLInputTick.setAttribute("checked", "checked");
	}

	// Create the 'use URL' label.
	okPreferencesPanelUseURLLabel = document.createElement("label");
	okPreferencesPanelUseURLLabel.setAttribute("id", "okPreferencesUseURLLabel");
	okPreferencesPanelUseURLLabel.setAttribute("for", "okPreferencesUseURLOnOff");
	okPreferencesPanelUseURLLabel.setAttribute("title", "You can automatically pull your settings from a text file located on an external server by ticking this box and entering the full Web address below. Note: This will over-write your existing settings.");

	// Put the 'use URL' tick box inside its label so the tick box is properly aligned.
	okPreferencesPanelUseURLLabel.appendChild(okPreferencesPanelUseURLInputTick);
	okPreferencesPanelUseURLLabel.appendChild(document.createTextNode("Pull settings from the Web (this will over-write your existing settings):"));

	// Create the 'use URL' text box.
	okPreferencesPanelUseURLInputText = document.createElement("input");
	okPreferencesPanelUseURLInputText.setAttribute("id", "okPreferencesUseURLText");
	okPreferencesPanelUseURLInputText.setAttribute("type", "text");
	okPreferencesPanelUseURLInputText.setAttribute("value", okGetPreferences("UseURLText", "http://"));
	if (okPreferencesPanelUseURLInputTick.getAttribute("checked") != "checked") {
		okPreferencesPanelUseURLInputText.setAttribute("disabled", "disabled");
	}

	// Create the help-text paragraph.
	okPreferencesPanelHelpText = document.createElement("p");
	okPreferencesPanelHelpText.setAttribute("id", "okPreferencesHelpText");
	okPreferencesPanelHelpText.innerHTML = "Enter the 'simple' names of sub-reddits (as seen in their URLs), separated by commas (e.g., <span class=\"okExText\">reddit.com,pics,apple</span>). To set a custom display name, add '|' (pipe), followed by the desired name (e.g., <span class=\"okExText\">australia|oz</span>). To pull your settings from the Web instead, create a text file containing values for the four fields, each separated by any number of new lines, and then upload it to a host such as Dropbox or GitHub (<a href=\"https://gist.github.com/raw/952782/ce792a3c27d2e9407ca35ae1097be66bebca406f/reddit%20top%20bar%20example%20settings%20file\">example</a>). Then enter the Web address in the field above.";

	// Create the preferences-panel close button.
	okPreferencesPanelCloseAnchor = document.createElement("a");
	okPreferencesPanelCloseAnchor.setAttribute("id", "okPreferencesClose");
	okPreferencesPanelCloseAnchor.setAttribute("href", "#");
	okPreferencesPanelCloseAnchor.innerHTML = "Close";

	// Append everything to their paragraphs.
	okPreferencesPanelWellP1.appendChild(okPreferencesPanelMyRedditsNameLabel);
	okPreferencesPanelWellP1.appendChild(okPreferencesPanelMyRedditsNameInput);
	okPreferencesPanelWellP2.appendChild(okPreferencesPanelMyRedditsSubredditsLabel);
	okPreferencesPanelWellP2.appendChild(okPreferencesPanelMyRedditsSubredditsInput);
	okPreferencesPanelWellP3.appendChild(okPreferencesPanelShowLastFourLabel);
	okPreferencesPanelWellP4.appendChild(okPreferencesPanelShortcutsSubredditsLabel);
	okPreferencesPanelWellP4.appendChild(okPreferencesPanelShortcutsSubredditsInput);
	okPreferencesPanelWellP5.appendChild(okPreferencesPanelUseURLLabel);
	okPreferencesPanelWellP5.appendChild(okPreferencesPanelUseURLInputText);

	// Append everything to the well.
	okPreferencesPanelWellDiv.appendChild(okPreferencesPanelWellP1);
	okPreferencesPanelWellDiv.appendChild(okPreferencesPanelWellP2);
	okPreferencesPanelWellDiv.appendChild(okPreferencesPanelWellP3);
	okPreferencesPanelWellDiv.appendChild(okPreferencesPanelWellP4);
	okPreferencesPanelWellDiv.appendChild(okPreferencesPanelWellP5);
	okPreferencesPanelWellDiv.appendChild(okPreferencesPanelHelpText);

	// Append everything to the panel.
	okPreferencesPanelDiv.appendChild(okPreferencesPanelTitleH2);
	okPreferencesPanelDiv.appendChild(okPreferencesPanelWellDiv);
	okPreferencesPanelDiv.appendChild(okPreferencesPanelCloseAnchor);

	// Insert all of the above into the page.
	document.body.appendChild(okPreferencesPanelDarkOverlay);
	document.body.appendChild(okPreferencesPanelDiv);

	// Kill the panel if you click off it, or if you pres butan
	okPreferencesPanelDarkOverlay.addEventListener("click", okHidePreferencesPanel, false);
	okPreferencesPanelCloseAnchor.addEventListener("click", okHidePreferencesPanel, false);

	// Do the other things, apply changes instantly!
	okPreferencesPanelMyRedditsNameInput.addEventListener("change", function()       { okUpdatePreferences("MyRedditsListName", okPreferencesPanelMyRedditsNameInput.value) },                              false);
	okPreferencesPanelMyRedditsSubredditsInput.addEventListener("change", function() { okUpdatePreferences("MyRedditsListContents", uneval(okPreferencesPanelMyRedditsSubredditsInput.value.split(","))) }, false);
	okPreferencesPanelShowLastFourInput.addEventListener("change", function()        { okUpdatePreferences("MyRedditsListShowLastFour", okPreferencesPanelShowLastFourInput.checked) },                     false);
	okPreferencesPanelShortcutsSubredditsInput.addEventListener("change", function() { okUpdatePreferences("ShortcutsListContents", uneval(okPreferencesPanelShortcutsSubredditsInput.value.split(","))) }, false);
	okPreferencesPanelUseURLInputTick.addEventListener("change", function()          { okUpdatePreferences("UseURLOnOff", okPreferencesPanelUseURLInputTick.checked); okTurnUseURLOnOrOff(okPreferencesPanelUseURLInputTick.checked) }, false);
	okPreferencesPanelUseURLInputText.addEventListener("change", function()          { okUpdatePreferences("UseURLText", okPreferencesPanelUseURLInputText.value); okUpdateFromURL() }, false);
}


// ==============================
// TURN URL UPDATING ON/OFF
// ==============================
function okTurnUseURLOnOrOff(okURLPrefValue) {
	// Unticking: Disable URL field, we are *not* pulling from the URL.
	if (okURLPrefValue == false) {
		okPreferencesPanelUseURLInputText.setAttribute(             "disabled", "disabled");

		okPreferencesPanelMyRedditsNameInput.removeAttribute(       "disabled");
		okPreferencesPanelMyRedditsSubredditsInput.removeAttribute( "disabled");
		okPreferencesPanelShowLastFourInput.removeAttribute(        "disabled");
		okPreferencesPanelShortcutsSubredditsInput.removeAttribute( "disabled");

	// Ticking: Disable top fields, we *are* pulling from the URL.
	} else {
		okPreferencesPanelUseURLInputText.removeAttribute(       "disabled");

		okPreferencesPanelMyRedditsNameInput.setAttribute(       "disabled", "disabled");
		okPreferencesPanelMyRedditsSubredditsInput.setAttribute( "disabled", "disabled");
		okPreferencesPanelShowLastFourInput.setAttribute(        "disabled", "disabled");
		okPreferencesPanelShortcutsSubredditsInput.setAttribute( "disabled", "disabled");

		// Update everything from the URL.
		okUpdateFromURL();
	}
}


// ==============================
// UPDATE PREFS FROM URL
// ==============================
function okUpdateFromURL(okIsInit) {
	okResponseFromURL = "";

	if (okGetPreferences("UseURLText", "http://") != "http://") {
		okResponseFromURL = GM_xmlhttpRequest({
			method: "GET",
			url: okGetPreferences("UseURLText", "http://"),
			onload: function(response) {
				// Normalise carriage returns!
				okResponseFromURL = response.responseText.replace(/[\r\n]+/g, "\n");
				// Trim!
				okResponseFromURL = okResponseFromURL.replace(/^[\t\r\n ]+/, "").replace(/[\t\r\n ]+$/, "");
				// Split into an array!
				okResponseFromURL = okResponseFromURL.split("\n");

				// Return if this doesn't appear to be a valid file.
				if (okResponseFromURL.length != 4) {
					console.log("Invalid settings file. File must contain four preference values separated by one or more new lines each.");
					return;
				}

				// [0] = my reddits name
				// [1] = my reddits contents
				// [2] = show last four?
				// [3] = short-cuts bar contents

				// Don't do the following if we're not initialising the page.
				if (okIsInit != "init") {
					// Update the text fields in the panel.
					okPreferencesPanelMyRedditsNameInput.value = okResponseFromURL[0];
					okPreferencesPanelMyRedditsSubredditsInput.innerHTML = okResponseFromURL[1];
					okPreferencesPanelShortcutsSubredditsInput.innerHTML = okResponseFromURL[3];
				}

				// Update the preferences related to the text fields.
				// (Not going to use okUpdatePreferences here because it makes it regenerate four times)
				GM_setValue("MyRedditsListName", okResponseFromURL[0]);
				GM_setValue("MyRedditsListContents", uneval(okResponseFromURL[1].split(",")));
				GM_setValue("ShortcutsListContents", uneval(okResponseFromURL[3].split(",")));

				// Untick the 'show last four' box if it's not on/yes/true,
				// then update the preferences
				if (okResponseFromURL[2] == "on" || okResponseFromURL[2] == "yes" || okResponseFromURL[2] == "true") {
					if (okIsInit != "init") { okPreferencesPanelShowLastFourInput.setAttribute("checked", "checked"); }
					GM_setValue("MyRedditsListShowLastFour", true);
				} else {
					if (okIsInit != "init") { okPreferencesPanelShowLastFourInput.removeAttribute("checked"); }
					GM_setValue("MyRedditsListShowLastFour", false);
				}

				// Reload the top bar.
				okGenerateTopBar();
			}
		});
	}
}


// ==============================
// HIDE PREFERENCES PANEL
// ==============================
function okHidePreferencesPanel() {
	var okPreferencesPanelDiv, okPreferencesPanelDarkOverlay;

	// Find the panel elements, then get rid of them.
	okPreferencesPanelDarkOverlay = document.getElementById("okOverlay");
	okPreferencesPanelDiv         = document.getElementById("okPreferences");

	document.body.removeChild(okPreferencesPanelDiv);
	document.body.removeChild(okPreferencesPanelDarkOverlay);
}


// ==============================
// HIDE PREFERENCES ON ESCAPE
// ==============================
document.addEventListener("keydown",
	function(e) {
		okKeyCode = e.which;
		// If Escape is pressed...
		if (okKeyCode == 27) {
			// ... and the preferences panel is open...
			if (document.getElementById("okPreferences")) {
				// ... get rid of it!
				okHidePreferencesPanel();
			}
		}
	},
	false);


// ==============================
// UPDATE PREFERENCES
// ==============================
function okUpdatePreferences(okPrefName, okPrefValue) {
	// Update the setting.
	GM_setValue(okPrefName, okPrefValue);
	// Reload the top bar.
	okGenerateTopBar();
}


// ==============================
// RETURN PREFERENCES
// ==============================
function okGetPreferences(okPrefName, okPrefDefault) {
	// This function works like GM_getValue, except that it returns the default if the key is empty.
	// (The original only returns the default if the key is non-existent.)
	if (GM_getValue(okPrefName, okPrefDefault) == "") {
		return okPrefDefault;
	// This is for arrays. I'm not sure if this is the right way to do this, but w/e
	} else if (GM_getValue(okPrefName, okPrefDefault) == "[\"\"]") {
		return "[\"" + okPrefDefault + "\"]";
	} else {
		return GM_getValue(okPrefName, okPrefDefault);
	}
}


// ==============================
// TOP-BAR GENERATOR
// ==============================
function okGenerateTopBar() {
	var okMyRedditsLink, okMyRedditsMenu, okShortcutsList, okMoreLink;

	// Define variable linking to the top element to insert into.
	// (This is what we'd have to change if reddit updated their element IDs.)
	okHeaderArea    = document.getElementById("sr-header-area");

	// Check to see what's inside this — sometimes there's no menu.
	// (We'll get DIV if there's a menu, probably UL if there's not.)

	// If there is a menu...
	if (okHeaderArea.firstChild.firstChild.tagName == "DIV") {
		// Set our variables.
		okMyRedditsLink = okHeaderArea.firstChild.firstChild;
		okMyRedditsList = okHeaderArea.firstChild.firstChild.nextSibling;
		okShortcutsList = okHeaderArea.firstChild.firstChild.nextSibling.nextSibling.firstChild;

	// If there's NOT a menu...
	} else {
		// Get rid of what's there.
		okHeaderArea.removeChild(okHeaderArea.firstChild);

		// Create a new element for our menu link.
		okMyRedditsLink           = document.createElement("div");
		okMyRedditsLink.className = "dropdown srdrop";
		okMyRedditsLink.setAttribute("onclick", "open_menu(this)");
		okMyRedditsLink.setAttribute("onmouseover", "hover_open_menu(this)");

		// Create a new element for the menu itself.
		okMyRedditsList           = document.createElement("div");
		okMyRedditsList.className = "drop-choices srdrop";

		// Create short-cuts list.
		okShortcutsList           = document.createElement("ul");
		okShortcutsList.className = "flat-list sr-bar hover";
		okShortcutsList.id        = "sr-bar";

		// Append the short-cuts list, then the reddits list, then the link in front of it.
		okHeaderArea.insertBefore(okShortcutsList, okHeaderArea.firstChild);
		okHeaderArea.insertBefore(okMyRedditsList, okHeaderArea.firstChild);
		okHeaderArea.insertBefore(okMyRedditsLink, okHeaderArea.firstChild);
	}

	// ==============================
	// 'MY REDDITS' LIST (NAME)
	// ==============================
	// Set the name of the 'my reddits' list ('my reddits' by default, obv).
	okMyRedditsLink.innerHTML = '<span class="selected title">' + okGetPreferences("MyRedditsListName", "my reddits") + '</span>';

	// ==============================
	// 'MY REDDITS' LIST (CONTENTS)
	// ==============================
	// Get the contents of our (custom) 'my reddits' menu.
	var okMyRedditsListContentsAgain = [];
	okMyRedditsListContentsAgain = eval(okGetPreferences("MyRedditsListContents",
		"announcements\",\"askreddit\",\"blog\",\"funny\",\"gaming\",\"iama\",\"pics\"," +
		"\"politics\",\"reddit.com\",\"todayilearned\",\"videos\",\"worldnews"));

	// If we have custom contents...
	if (okMyRedditsListContentsAgain.length > 0) {
		// Clear the original list.
		okMyRedditsList.innerHTML = "";

		// If we're showing all/random/friends/mod, add these to the array.
		if (GM_getValue("MyRedditsListShowLastFour") == true) {
			okMyRedditsListContentsAgain.push("all", "random", "friends", "mod");
		}

		// Define how we want the columns set up.
		if (okMyRedditsListContentsAgain.length > 64) {
			var okMyRedditsListColumns = 5;
		} else {
			var okMyRedditsListColumns = Math.ceil(okMyRedditsListContentsAgain.length / 24);
		}

		// Define the max column length (height).
		var okMyRedditsListMaxColumnLength = Math.ceil(okMyRedditsListContentsAgain.length / okMyRedditsListColumns);

		// Generate our columns.
		// (We'll do this even if it's just one column, since it's easy and it looks better anyway.)
		var i
		for (i = 1; i <= okMyRedditsListColumns; i++) {
			// Create column elements...
			var okMyRedditsListColumnDiv = document.createElement("div");
			okMyRedditsListColumnDiv.setAttribute("style", "float: left; margin: 5px 5px;");
			// ... and add them to the list.
			okMyRedditsList.appendChild(okMyRedditsListColumnDiv);
		}

		// Do the needful
		var i, l = okMyRedditsListContentsAgain.length, c = 0, j = 0;
		for (i = 0; i < l; i++) {
			// Move on to the next column if counter == max column length.
			if (j == okMyRedditsListMaxColumnLength) {
				c++;
				j = 0;
			}

			// Create list-item elements.
			var okMyRedditsListItemAnchor = document.createElement("a");
			okMyRedditsListItemAnchor.setAttribute("class", "choice");

			// Put a line above 'all' if we've got the last four turned on.
			if ( (GM_getValue("MyRedditsListShowLastFour") == true) && (i == (okMyRedditsListContentsAgain.length - 4)) ) {
				okMyRedditsListItemAnchor.setAttribute("style", "border-top: 1px dotted #c5c5c5; padding-top: 1px; margin-top: 0px;");
			}

			// Check to see if the item has a '|' in it — if it does, it has a custom name set.
			if (okMyRedditsListContentsAgain[i].indexOf('|') != -1) {
				okMyRedditsListItemAnchor.setAttribute("href", "http://www.reddit.com/r/" + okMyRedditsListContentsAgain[i].substr(0, okMyRedditsListContentsAgain[i].indexOf('|')) + "/");
				okMyRedditsListItemAnchor.appendChild(document.createTextNode(okMyRedditsListContentsAgain[i].substr((okMyRedditsListContentsAgain[i].indexOf('|') + 1), okMyRedditsListContentsAgain[i].length)));
			// If it doesn't, return like normal.
			} else {
				okMyRedditsListItemAnchor.setAttribute("href", "http://www.reddit.com/r/" + okMyRedditsListContentsAgain[i] + "/");
				okMyRedditsListItemAnchor.appendChild(document.createTextNode(okMyRedditsListContentsAgain[i]));
			}

			// Append them to the column.
			okMyRedditsList.childNodes[c].appendChild(okMyRedditsListItemAnchor);

			// Increment counter.
			j++;
		}
	}

	okMoreLink = document.getElementById("sr-more-link");

	// ==============================
	// SHORTCUTS LIST
	// ==============================
	// Get the contents of our (custom) shortcuts menu.
	var okShortcutsListContentsAgain = [];
	okShortcutsListContentsAgain     = eval(GM_getValue("ShortcutsListContents", ""));

	// If we have custom contents...
	if (okShortcutsListContentsAgain.length > 0) {
		// Clear the original list.
		okShortcutsList.innerHTML = "";

		// Do the needful
		var i, l = okShortcutsListContentsAgain.length;
		for (i = 0; i < l; i++) {
			// Check to see if the item has a '|' in it — if it does, it has a custom name set.
			if (okShortcutsListContentsAgain[i].indexOf('|') != -1) {
				okShortcutsList.innerHTML += '<li><a href="http://www.reddit.com/r/' + okShortcutsListContentsAgain[i].substr(0, okShortcutsListContentsAgain[i].indexOf('|')) + '/">' + okShortcutsListContentsAgain[i].substr((okShortcutsListContentsAgain[i].indexOf('|') + 1), okShortcutsListContentsAgain[i].length) + '</a></li>';
			// If it doesn't, return like normal.
			} else {
				okShortcutsList.innerHTML += '<li><a href="http://www.reddit.com/r/' + okShortcutsListContentsAgain[i] + '/">' + okShortcutsListContentsAgain[i] + '</a></li>';
			}

			// If we're not at the end, add a separator.
			if (i != (l - 1)) {
				okShortcutsList.innerHTML += '<li><span class="separator">&nbsp;&#183;&nbsp;</separator></li>';
			}
		}
	}


	// ==============================
	// 'MORE' LINK
	// ==============================
	// Set up 'more' link.
	okMoreLink.innerHTML = '&raquo;';
}


// Initialise!
// Generate the top bar first so we can go off our existing preferences.
okGenerateTopBar();
// Then we can update from the URL if appropriate.
if ( (okGetPreferences("UseURLOnOff", false) != false) && (okGetPreferences("UseURLText", "http://") != "http://") ) {
	okUpdateFromURL("init");
}
okPreferencesInit();




// ================================================================================================
// This script is designed to fix what i think is the very irritating and useless default
// implementation of the top bar (including 'my reddits' menu) on reddit.com. It does the
// following things, specifically:
//
// (1) Provides an option to rename the 'my reddits' menu.
//
// (2) Populates the 'my reddits' menu with sub-reddits of your own choosing. These can be given
//     in any order, may be assigned custom display names, and will be arranged into columns.
//
// (3) Provides an option to show/hide the all/random/friends/mod links in the 'my reddits' menu.
//
// (4) Populates the short-cuts bar (the horizontal menu across the top) with sub-reddits of your
//     own choosing. As with the 'my reddits' menu, these can be in any order and may have custom
//     display names applied.
//
// (5) Provides an in-page preferences panel to modify all of the above options.
//
// (6) Provides the ability to pull data from a Web-based settings file for easy synchronisation
//     of settings across multiple machines. [1.2+]
//
//
// There are a few known limitations and/or bugs:
//
// (1) I did not take into account situations where the 'my reddits' menu is not displayed. (This
//     typically occurs with new accounts; the menu is not shown until you have subscribed to
//     a few additional sub-reddits.)
//
// (2) The sub-reddits must be added manually. This is not as immediately gratifying as the way
//     Reddit Enhancement Suite does it, but i think my way looks nicer, and functionally it has
//     several advantages: (1) sub-reddits can be put into any order; (2) sub-reddits can be
//     renamed; (3) sub-reddits can be added to the menu even if you are not subscribed to them;
//     (4) sub-reddits can be excluded from the menu even if you are subscribed to them. Also,
//     from a development stand-point this was an easy way of doing things.
//
// (3) Column creation in the menu is not configurable. Having more than 64 sub-reddits forces it
//     to 4 columns (4 being the max number of columns).
//
// (4) Probably (?) works only in Firefox.
//
//
// Things i do eventually hope to implement:
//
// (1) Better handling of case mentioned in bug # 1 above. — FIXED in 1.1
//
// (2) Ability to pull at least the currently subscribed sub-reddits into the list when the
//     script is first run (similar to RES). (Sort of addresses bug # 2)
//
// (3) Option to have the script automatically insert new sub-reddits into the list upon
//     subscribing to them. (Sort of addresses bug # 2)
//
// (4) Ability to configure column creation (bug # 3).
//
// (5) Ability to run in Chrome (bug # 4).
//
// (6) Ability to change short-cuts separator character. (⌘F '183' for now)
//
// (7) Ability to change 'more' link name. (⌘F 'raquo' for now)
//
//
// As far as usage: The script will add a 'top bar' link to the user bar at the top right of the
// page; clicking this will display the preferences panel. Everything from there should be fairly
// straight-forward.
//
// Note to Reddit Enhancement Suite users: These two scripts are compatible, but you will need to
// make one change to your RES configuration first. Access the RES console via the '[RES]' link
// at the top right, then click on 'Configure Modules'. Select 'betteReddit' from the list, then
// untick the 'manageSubreddits' option. Lastly, click 'save' and close the RES console; you may
// also need to reload the page.
//
//
// One final thing i ought to mention: I am a very amateur programmer, and extending this script
// so that it would be worth releasing was mainly a learning exercise for me. I'm sure i've taken
// the long/slow way of doing several things. Please keep my inexperience in mind if you happen
// to look through the code. :x
//
// ♥ kine
// ================================================================================================


// ================================================================================================
// CHANGE LOG:
// 1.2.3 (2012-08-04) — Very minor CSS changes (no more -moz- prefix).
// 1.2.2 (2012-02-03) — Fixed a 'critical' error which prevented the script from loading; this was
//                      apparently caused by a small change in reddit's HTML. Also changed max
//                      menu columns to 5 instead of 4, and moved the preference pane up by 40 px
//                      (should be much better for small screens).
// 1.2.1 (2011-05-02) — Wording, &c.
// 1.2   (2011-05-02) — Added ability to pull info from a settings file hosted on an external
//                      server. This file should be in plain-text format and should contain four
//                      values, each separated by any number of new lines: (1) name of menu,
//                      (2) contents of menu, (3) show last four?, (4) contents of short-cut bar.
// 1.1.1 (2011-03-20) — Tested on Mac, looks OK; preferences panel now hides on Escape.
// 1.1   (2011-03-20) — Disabled spell-check in textareas.
//                      Fixed tick-box alignment in FF for Windows (will test Mac later).
//                      Code changes (clean-up, renamed vars, changed from DOM to innerHTML).
//                      Script now functions as expected when not logged in to reddit! (Bug #1 ✓)
//                      More consistent insertion of preferences link.
// 1.0.8 (2011-03-04) — Added word-wrap: break-word to textareas to fix scroll bars.
// 1.0.7 (2011-03-04) — Fixed bug that prevented the script from running on new installations...
// 1.0.6 (2011-03-04) — Initial public release (2 years later to the day!); documentation.
// 1.0.5 (2011-03-04) — Changes to preferences panel appearance; fixed issue with column handling.
// 1.0.4 (2011-03-04) — Fixed issue with default settings not sticking.
// 1.0.3 (2011-03-03) — Changes to preferences-panel appearance.
// 1.0.2 (2011-03-03) — Changes to preferences-panel appearance.
// 1.0.1 (2011-03-03) — Changes to preferences-panel appearance; added help text.
// 1.0   (2011-03-03) — Instantaneous page updating; major features in place. (Skipped 0.9+)
// 0.8   (2011-03-03) — Basic preferences-panel functionality in place.
// 0.7   (2011-03-02) — Preferences-panel elements added, but non-functioning.
// 0.6   (2011-03-02) — Redesign complete; everything now produced programmatically.
// 0.5   (2011-03-02) — Short-cuts bar now produced programmatically.
// 0.4   (2010-??-??) — NFR.
// 0.3   (2010-??-??) — NFR.
// 0.2   (2009-??-??) — NFR.
// 0.1   (2009-03-04) — Created; NFR.
// ================================================================================================




// =========================================================================
// Copyright © 2012 kine  (kine@stupidkitties.com)
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions
// are met:
//
// 1. Redistributions of source code must retain the above copyright
//    notice, this list of conditions, and the following disclaimer.
//
// 2. Redistributions in binary form must reproduce the above copyright
//    notice, this list of conditions, and the following disclaimer in the
//    documentation and/or other materials provided with the distribution.
//
// 3. The name of the author may not be used to endorse or promote products
//    derived from this software without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE AUTHOR "AS IS" AND ANY EXPRESS OR
// IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
// OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE, ARE DISCLAIMED.
// IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY DIRECT, INDIRECT,
// INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
// NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
// DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
// THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
// THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
// =========================================================================

// ( EOF )