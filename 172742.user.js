// ==UserScript==
// @name        Borderlands 2 - Key Grabber
// @namespace   http://userscripts.org/users/23652
// @description Grabs the BL2 keys (FB/Twitter) from the page and puts them in your clipboard
// @include     http://twitter.com/*
// @include     https://twitter.com/*
// @copyright   JoeSimmons
// @version     1.0.1
// @license     http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @require     http://userscripts.org/scripts/source/49700.user.js
// @require     http://usocheckup.dune.net/172742.js
// @grant       GM_getValue
// @grant       GM_log
// @grant       GM_openInTab
// @grant       GM_registerMenuCommand
// @grant       GM_setValue
// @grant       GM_xmlhttpRequest
// @grant       GM_addStyle
// @grant       GM_setClipboard
// ==/UserScript==

/* CHANGELOG

1.0.1
    - added GM_setClipboard as added in GM 1.10
    - added a little display to show that the copy button worked

1.0.0
    - created

*/

(function bl2_key_grabber() {

// Make sure the page is not in a frame (return method, for anonymous function wrapper)
if(window.self !== window.top) return;

// $ by JoeSimmons. Supply it a string and it will return an element with that ID
function $(id) {
	return document.getElementById(id + "");
}

// Created by avg, modified by JoeSimmons
function create(elemName, attr, kids) {
	if(typeof elemName !== "string") return false;
		else if(elemName === "text" && typeof attr === "string") return document.createTextNode( attr );
	var i, l, prop, ret = document.createElement( elemName.toLowerCase() );
	if(typeof attr === "object") {
		for(prop in attr) {
			if(prop.indexOf("on") === 0 && typeof attr[prop] === "function") ret.addEventListener(prop.substring(2), attr[prop], false);
				else ret.setAttribute(prop.toLowerCase(), attr[prop]);
				//else if(",style,accesskey,id,name,src,href,type,target,class".indexOf("," + prop.toLowerCase()) !== -1) ret.setAttribute(prop.toLowerCase(), attr[prop]);
				//else ret[prop] = attr[prop];
		}
	}
	if(typeof kids === "object" && typeof kids.push === "function") for(i = 0; i < kids.length; i++) ret.appendChild( kids[i] );
	return ret;
}

// automatically highlight a key when the user clicks on the text field
function highlight(event) {

	event.currentTarget.select();

}

// disallow the user to modify the key
function prevent(event) {

	event.preventDefault();

}

function getKeys() {

	var platform = GM_config.get("platform"),
		$key = /((win)?PC\s*\/\s*Mac|Mac|(win)?PC|X(box)?\s*360|PS3|PlayStation\s*3)[^:]*:\s*(\w{5}-\w{5}-\w{5}-\w{5}-\w{5})/i,
		$spaces = /\s+/g,
		keys = document.evaluate(".//text()[contains(., '-')]", document.body, null, 7, null),
		i, j, key, text, split, splits, tmpMatch, keyList = [];

	switch(platform) {

		case "xbox":
			platform = /x(box)?\s*360/;
			break;
		case "ps3":
			platform = /(ps3|playstation\s*3)/;
			break;
		case "pc":
			platform = /(win)?pc/;
			break;
		case "mac":
			platform = /mac/;
			break;

	}

	for(i = 0; (key = keys.snapshotItem(i)); i++) {

		text = key.nodeValue;

		if( $key.test(text) ) {

			// split the text node, one platform:key in each array index
			splits = text.split("\n");

			if(splits.length > 0) {

				for(j = 0; (split = splits[j]); j++) {

					// set a temp match
					tmpMatch = split.trim().match($key);

					// it is the correct platform that the user wants
					if(tmpMatch && platform.test( tmpMatch[1].toLowerCase().replace($spaces, "") ) ) keyList.push( tmpMatch[5].toUpperCase() );

				}

			}

		}

	}

	return keyList;

}

function showKeys() {

	var i, key, newKey,
		holder = $("bl2_key_grabber_holder"),
		$hyphen = /-+/g,
		keyList = getKeys();

	if(keyList.length === 0) return alert("No keys were found for " + GM_config.get("platform").toUpperCase() + ".");

	for(i = 0; (key = keyList[i]); i++) {

		newKey = key.replace($hyphen, "");

		// add found keys to holder div if they don't exist
		if(!$(newKey)) holder.appendChild(
			create("div", {id: newKey, style: "width: 100%; padding: 2px;"}, [
				create("span", {style: "margin-right: 8px; font-size: 10pt; font-style: sans-serif, arial; font-weight: bold;"}, [
					create("text", GM_config.get("platform").toUpperCase() )
				]),
				create("input", {type: "text", value: key, style: "width: 30%; font-size: 9pt; font-family: sans-serif, arial; padding: 4px; color: #000000;", onfocus: highlight, onkeydown: prevent, ondblclick: highlight, onclick: highlight}),
				create("input", {type: "button", value: "Copy", style: "margin-left: 8px; width: 10%; font-size: 9pt; font-family: sans-serif, arial; padding: 4px;", onclick: copy})
			])
		);

	}

}

function addMainDiv() {

	var mainDiv = $("bl2_key_grabber");

	// add the main div
	if(!mainDiv) {

		// if it's non-existant, create it
		document.body.appendChild(
			create("div", {id: "bl2_key_grabber", style: "position: fixed; top: 0; left: 0; background: rgba(0, 0, 0, 0.5); width: 100%; height: 100%; z-index: 999998;"}, [
				create("div", {id: "bl2_key_grabber_box", style: "position: fixed; top: 20%; left: 20%; width: 60%; height: 60%; z-index: 999999; text-align: center; border: 3px ridge #AAAAAA; border-radius: 8px; background: #F3F3F3;"}, [
					create("div", {id: "bl2_key_grabber_header", style: "display: block; height: 10%; width: 100%; margin-top: 30px; font-size: 14pt; font-weight: bold; font-family: \"myriad pro\", arial,"}, [
						create("text", "Borderlands 2 - Key Grabber")
					]),
					create("div", {id: "bl2_key_grabber_holder", style: "display: block; height: 50%; width: 100%;"}),
					create("input", {type: "button", value: "Grab Keys", style: "font-size: 10pt; font-family: sans-serif, arial; padding: 4px; margin-right: 12px;", onclick: showKeys}),
					create("input", {type: "button", value: "Options", style: "font-size: 10pt; font-family: sans-serif, arial; padding: 4px; margin-right: 12px;", onclick: GM_config.open}),
					create("input", {type: "button", value: "Close", style: "font-size: 10pt; font-family: sans-serif, arial; padding: 4px;", onclick: close})
				])
			])
		);

	} else {

		// if it already exists, just show it
		mainDiv.style.display = "";

	}

	// add the keys
	showKeys();

}

// close the main div
function close() {

	var div = $("bl2_key_grabber")

	if(div) div.style.display = "none";

}

function showCopied(key) {
    var text = key.value;
    key.value = 'Copied!';
    key.style.color = '#00B300';
    setTimeout(function () {
        (function (key) {
            key.value = text;
            key.style.color = '#000000';
        }(key));
    }, 1000);
}

// copy the value to the clipboard
function copy(e) {
	var copy = e.target,
        key = copy.parentNode.querySelector("input[type='text']"),
        text = key.value;

    if(typeof GM_setClipboard === 'function') {
        // copy the key into the clipboard
        GM_setClipboard(text);

        // a little something to show the user it was copied
        showCopied(copy);
    } else {
        alert('This feature does not work at the moment, except for in Greasemonkey.\nSorry.');
    }
}

GM_config.init("Borderlands 2 - Key Grabber", {

	platform : {
		label : "Platform",
		type : "select",
		options : {
			pc : "PC",
			mac : "Mac",
			xbox : "Xbox 360",
			ps3 : "PS3"
		},
		"default" : "pc"
	}

}, "#section_kids_0 { margin-top: 6px !important; }");

if(typeof GM_registerMenuCommand === "function") GM_registerMenuCommand("Borderlands 2 - Key Grabber", addMainDiv);

document.body.appendChild(
	create("input", {type: "button", value: "BL2 Key Grabber", style: "position: fixed; bottom: 2px; right: 2px; z-index: 999999; font-size: 9pt; font-family: sans-serif, arial; padding: 2px;", onclick:addMainDiv})
);



})();