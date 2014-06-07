// ==UserScript==
// @version        0.1
// @name           FilterDents
// @author         Emilien Klein
// @namespace      http://emilien.klein.st/gmscripts/
// @description    Filters out dents containing particular words
// @include        http://identi.ca/*
// @include        http://*.identi.ca/*
// ==/UserScript==

/*

History:

30/04/2010 - v0.1 - First version of the script

*/

//unsafeWindow.console.log("XX");

"use strict";
var getBannedWords, updateUI, $;
var bannedWords, promptBannedWords;

function startProcess() {
    var i, j, k;
    // Retrieve the list of "banned" words
    bannedWords = getBannedWords();
    // Show the list of banned words and a button to change this list
    updateUI(bannedWords);
    notices = document.getElementsByClassName('notice');
    k = 0;
    for(i=0; i<notices.length; i++){
        content = notices[i].getElementsByClassName('entry-content')[0].innerHTML.toLowerCase();
        for(j=0; j<bannedWords.length; j++){
            if(content.match(bannedWords[j])){
                notices[i].style.display = "none";
                k++;
            }
        }
    }
}

function getBannedWords() {
    var bannedWords;

    // Retrieve saved values
    //GM_deleteValue("bannedWords");
    bannedWords = deserialize("bannedWords");
    if(!bannedWords.length) {
        // There are no saved values, so prompt for values to filter out
        bannedWords = promptBannedWords("");
    }
    return bannedWords;
}

function promptBannedWords(def) {
    var bannedWords, vals, i;
    vals = unsafeWindow.prompt("Enter a comma separated list of words you want to filter out:", def).toLowerCase();
    if(vals){
        bannedWords = vals.split(",");
        for(i=0; i<bannedWords.length; i++){
            bannedWords[i] = bannedWords[i].replace(/^\s\s*/, '').replace(/\s\s*$/, '');
        }
        // Save the values to filter out
        serialize("bannedWords", bannedWords);
    } else {
        GM_deleteValue("bannedWords");
        bannedWords = [];
    }
    return bannedWords;
}

function updateUI(bannedWords) {
    // Show the list of banned words
    createEl({n: 'dl', a: {}, c: [
    {n: 'dt', a: {textContent: 'Banned words'}},
    {n: 'dd', a: {textContent: bannedWords}}
    ]}, $("entity_statistics"));
    
    // Add a link to change the list of banned words
    createEl({n: 'dl', a: {}, c: [
    {n: 'a', a: {'@href': '#', textContent: 'Change banned words'}, evl: {type: 'click', f: function(e) {e.preventDefault(); promptBannedWords(bannedWords); location.reload(true);}, bubble: true}}
    ]}, $("entity_statistics"));
}

// From http://wiki.greasespot.net/Code_snippets#document.getElementById_helper
function $() {
    var z=[], i=0, el;
    if (arguments.length==1) {
        return document.getElementById(arguments[0]);
    }
    while(el = document.getElementById(arguments[i++])) {
        if (el) {
            z.push(el);
        }
    }
    return z;
}

// From http://wiki.greasespot.net/Serialization_Helpers
function deserialize(name, def) {
    return eval(GM_getValue(name, (def || '({})')));
}

function serialize(name, val) {
    GM_setValue(name, uneval(val));
}

// From http://wiki.greasespot.net/Create_DOM_Structure
function createEl(elObj, parent) {
  var el;
  if (typeof elObj == 'string') {
     el = document.createTextNode(elObj);
  }
  else {
     el = document.createElement(elObj.n);
     if (elObj.a) {
        attributes = elObj.a;
        for (var key in attributes) if (attributes.hasOwnProperty(key)) {
           if (key.charAt(0) == '@')
              el.setAttribute(key.substring(1), attributes[key]);
           else 
              el[key] = attributes[key];
        }
     }
     if (elObj.evl) {
        el.addEventListener(elObj.evl.type, elObj.evl.f, elObj.evl.bubble);
     }
     if (elObj.c) {
        elObj.c.forEach(function (v, i, a) { createEl(v, el); });
     }
  }
  if (parent)
     parent.appendChild(el);
  return el;
}

startProcess();

