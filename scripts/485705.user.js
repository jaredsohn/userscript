// ==UserScript==
// @name		UD Scale
// @namespace		http://www.cursedtower.com/dem
// @description		Betrays the weight of things
// @include		http://urbandead.com/*
// @include		http://www.urbandead.com/*
// @grant      
// ==/UserScript==

/* Urban Dead Scale
 * v1.0
 *
 * Copyright (C) 2014 Dr Heward
 * Author: Elaine M Heward (MEMS)
 * Last Modified: 2014-04-27
 * 
 * Tested under: Firefox 28 on Windows
 *   
 * Changes:
 *   v1.0 - Now works in Firefox
 *
 */

var drops = document.evaluate("//select[@name='drop']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for(var i=0;i<drops.snapshotLength;i++){
    drop = drops.snapshotItem(i);
    for(j=0;j<drop.options.length;j++){
        if(drop.options[j].value!="")
           drop.options[j].text=drop.options[j].text+" - "+getWeight(drop.options[j].value)+"%";
    }
}

function getWeight(item){
    switch(item.substring(0,1)){
        case "a": case "c": case "e": case "f":
        case "g": case "h": case "j": case "k":
        case "l": case "m": case "n": case "r":
        case "t": case "x": case "y": case "z":
            val=2;
            break;
        case "b": case "B": case "d": case "D":
        case "F": case "p": case "q": case "u":
        case "w":
            val=4;
            break;
        case "o": case "s":
            val=6;
            break;
        case "i":
            val=10;
            break;
        default:
       switch(item){
        case "G6":
               val=0;
               break;
        case "J1":
               val=16;
               break;
        case "G2": case "G3": case "G4": case "J2":
               val=2;
               break;
        case "I39":
               val=6;
               break;
           default:
               val=20;
       }
    }
    return val;
}
