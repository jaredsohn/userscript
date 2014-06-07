// ==UserScript==
// @name           Turk accept next hit box 1.0 
// @namespace      http://bluesky.software.com/turkscripts
// @description    Clicks the accept next hit box if it isn't active
// @include https://www.mturk.com/mturk/submit
// @include https://www.mturk.com/mturk/preview*
// @include https://www.mturk.com/mturk/accept*
// @include https://www.mturk.com/mturk/return*
// @include https://www.mturk.com/mturk/continue*
// ==/UserScript==

//
// Checkmark the auto accept button if needed
//

AutoBox = document.getElementsByName("autoAcceptEnabled");

if (AutoBox.item(0).checked) return; //else click it
AutoBox.item(0).click();
