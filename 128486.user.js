// ==UserScript==
// @name	force_flash_wmode_window
// @description	Set all transparent flash objects to normal (window) to prevent needless CPU hogging
// @include	*
// ==/UserScript==

/*
Many web designers nowadays set wmode=transparent for
flash objects in order to be able to place small overlapping 
divs in front of them or sometimes even for no particular 
reason at all. But doing this will also completely disable all 
hardware acceleration and video playback will needlessly
use a lot more CPU and even lead to stuttering video on 
older hardware.

This script will wait a few seconds to allow their JS to create 
the object tags, then it will search the entire document for object
tags and if they have a param of wmode != window replace
them with a copy that has wmode=window. This might be 
beneficial for many different websites, so I set the include 
filter to *, if this is problematic on some websites then you
can explicitly exclude these sites in the user script settings.
*/

var tWait = 1000;

function dbg(x){
	// uncomment this to see log messages in the console
	// GM_log(x);
}

/**
 * This function will be called on every 'param' node
 * to filter the ones where a wrong wmode is defined
 */
function isParamWmodeWrong(oParam){
	return (
		(oParam.tagName == 'PARAM') && 
		(oParam.getAttribute('name') == 'wmode') && 
		(oParam.getAttribute('value') != 'window')
	)
}

/**
 * this will be called on every 'param ' node where the
 * wmode has been found to be wrong. It will correct it 
 * and then immediately force the flash to be reloaded
 */
function setCorrectWmode(oParam){
	var oObject = oParam.parentNode;
	var oCont = oObject.parentNode;
	dbg('replacing with correct wmode and forcing reload');
	oParam.setAttribute('value', 'window');
	oCont.replaceChild(oObject, oObject);
}

/**
 * this will be called on every 'object' node and 
 * immediately correct it if neccesary
 */
function checkObjectWmode(oObject){
	[].slice.apply(oObject.childNodes).filter(isParamWmodeWrong).map(setCorrectWmode)
}

/**
* this will be called periodically to find all 'object' nodes,
* even the ones that were dynamically added later
*/
function checkAllObjects(){
	dbg('searching for objects');
	[].slice.apply(document.getElementsByTagName('object')).map(checkObjectWmode)
	tWait = tWait * 2;
	setTimeout(checkAllObjects, tWait); // try again periodically
}

setTimeout(checkAllObjects, tWait);
dbg('script started');
