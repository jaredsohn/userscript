// ==UserScript==
// @name         Google Images Transparent Image Finder
// @namespace    http://skoshy.com
// @version      0.1
// @description  Helps find transparent images on Google Images
// @match        http*://www.google.com/*
// @match        http*://google.com/*
// @copyright    2013+, Stefan Koshy
// ==/UserScript==

var rule = '#irc_mi {background-color: transparent; background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAIAAAD9b0jDAAAAOklEQVRIiWM8dOgQA3FASEiISJVMRKojCYwaOmroqKEj01AW4sued+/eEaly6Hh/1NBRQ0cNHfSGAgCa6wW2k3rIewAAAABJRU5ErkJggg==);} ';

addStyle(rule, 'google-images-transparent');

function addStyle(rules, id) {
    var node = document.createElement("style");
    node.setAttribute("type", "text/css");
    node.innerHTML = rules;
    if (id) node.setAttribute("id", id);

    document.getElementsByTagName("head")[0].appendChild(node);
}