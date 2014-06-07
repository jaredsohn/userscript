// ==UserScript==
// @author         langware
// @version        1.0
// @name           Hotmail Auto Save Interval
// @description    Sets the interval (in minutes) for Hotmail's Auto Save to Drafts feature
// @include        http://*.mail.live.com/*
// @include        https://*.mail.live.com/*
// @include        http://mail.live.com/*
// @include        https://mail.live.com/*
// @date           Oct 8, 2009
// @injectframes   1
// ==/UserScript==



// This script can be used to change the interval that messages are auto saved in Hotmail.
// You must change the value below from 3 to whatever value (in minutes) you wish for the interval.
// Be sure to read the NOTES shown below.

window.wrappedJSObject.ComposePage.autoSaveDraft.interval = 3;


// NOTES ---- Please read all notes below -----

// Hotmail's default auto save interval is every 3 minutes.
// By setting a new value for the interval in the above line of code,
// the auto save interval can be changed.


// Due to the timing of when this script is invoked, it cannot change the first auto save interval.
// The Hotmail default interval (3 minutes) is immediately invoked when the 
// Compose New Message page is opened (which is BEFORE Greasemonkey runs this script). 
// By the time this script is run, the first interval (3 minutes) is already in progress.
// This script then gets run and changes the interval, but that change does not
// take effect until the second interval is invoked (three minutes after the Compose
// New Message page has been opened). 

// For example, if you make the interval 5 (minutes),
// and start composing a new Hotmail message, then the first interval will be 3 minutes.
// After the first 3 minutes, the message will automatically be saved. Then, the 5 minute
// interval takes effect. If the message is still being composed 5 minutes later, 
// it will again be saved to the Drafts folder. 
// If the message is still being composed after another 5 minutes have elapsed, 
// it will again be saved. Etc.
// This happens for each new message you compose.

// I have found a work around to address the above timing "issue" 
// where the first 3 minute interval cannot be changed. 
// You do not need to wait the full 3 minutes
// for the first interval to expire and the message to be saved. As soon as you open
// the Compose New Message page, click the "Save Draft" button. This will manually save the
// message being composed and start the second interval. Thereafter, all save intervals will be 
// based on the value in this script.

// For those who want more frequent save intervals (than the default of 3 minutes), 
// specify a 1 for the interval, and click "Save Draft" when you begin composing your message. 
// The first (3 minute) interval will be immediately concluded (by manually clicking "Save Draft"), 
// and the second (and all succeeding) save intervals will be set to 1 minute.

// This script cannot be used to completely "disable" the auto save feature, but you can come close.
// By specifying a large interval (such as 45) in this script, and manually clicking
// the "Save Draft" button as soon as you begin composing your message, the first (3 minute) interval
// will be immediately concluded (by manually clicking "Save Draft"), and the second 
// (and all succeeding) intervals will be large enough (say 45) such that your message will be 
// completed and sent before the second auto save interval ever occurs. So, you cannot use this
// script to disable the auto save feature, but you can set the interval large enough so that 
// the message will only be saved one time (by the initial click on the "Save Draft" button).


// As always, use at your own risk .... your mileage may vary.





