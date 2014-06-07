// ==UserScript==
// @name       Internet Feminizer
// @namespace  http://*/*
// @version    0.2
// @description  Chages every occurance of bro into sis
// @match      http://*/*
// @copyright  2014, d4m4s74
// ==/UserScript==

textNodes = document.evaluate( 
    "//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
var searchRE = new RegExp('bro','gi'); 
var replace = 'sis'; 
for (var i=0;i<textNodes.snapshotLength;i++) { 
    var node = textNodes.snapshotItem(i); 
    node.data = node.data.replace(searchRE, replace);}

var searchRE = new RegExp('sisther','gi'); 
var replace = 'sister'; 
for (var i=0;i<textNodes.snapshotLength;i++) { 
    var node = textNodes.snapshotItem(i); 
    node.data = node.data.replace(searchRE, replace);}

var searchRE = new RegExp('gentleman','gi'); 
var replace = 'lady'; 
for (var i=0;i<textNodes.snapshotLength;i++) { 
    var node = textNodes.snapshotItem(i); 
    node.data = node.data.replace(searchRE, replace);}

var searchRE = new RegExp('gentlemen','gi'); 
var replace = 'ladies'; 
for (var i=0;i<textNodes.snapshotLength;i++) { 
    var node = textNodes.snapshotItem(i); 
    node.data = node.data.replace(searchRE, replace);}

var searchRE = new RegExp('man','gi'); 
var replace = 'woman'; 
for (var i=0;i<textNodes.snapshotLength;i++) { 
    var node = textNodes.snapshotItem(i); 
    node.data = node.data.replace(searchRE, replace);}

var searchRE = new RegExp('wowoman','gi'); 
var replace = 'woman'; 
for (var i=0;i<textNodes.snapshotLength;i++) { 
    var node = textNodes.snapshotItem(i); 
    node.data = node.data.replace(searchRE, replace);}

var searchRE = new RegExp('men','gi'); 
var replace = 'women'; 
for (var i=0;i<textNodes.snapshotLength;i++) { 
    var node = textNodes.snapshotItem(i); 
    node.data = node.data.replace(searchRE, replace);}

var searchRE = new RegExp('wowomen','gi'); 
var replace = 'women'; 
for (var i=0;i<textNodes.snapshotLength;i++) { 
    var node = textNodes.snapshotItem(i); 
    node.data = node.data.replace(searchRE, replace);}

var searchRE = new RegExp('boy','gi'); 
var replace = 'girl'; 
for (var i=0;i<textNodes.snapshotLength;i++) { 
    var node = textNodes.snapshotItem(i); 
    node.data = node.data.replace(searchRE, replace);}

var searchRE = new RegExp('he','gi'); 
var replace = 'she'; 
for (var i=0;i<textNodes.snapshotLength;i++) { 
    var node = textNodes.snapshotItem(i); 
    node.data = node.data.replace(searchRE, replace);}

var searchRE = new RegExp('sshe','gi'); 
var replace = 'she'; 
for (var i=0;i<textNodes.snapshotLength;i++) { 
    var node = textNodes.snapshotItem(i); 
    node.data = node.data.replace(searchRE, replace);}

var searchRE = new RegExp('guy','gi'); 
var replace = 'gal'; 
for (var i=0;i<textNodes.snapshotLength;i++) { 
    var node = textNodes.snapshotItem(i); 
    node.data = node.data.replace(searchRE, replace);}

var searchRE = new RegExp('god','gi'); 
var replace = 'goddess'; 
for (var i=0;i<textNodes.snapshotLength;i++) { 
    var node = textNodes.snapshotItem(i); 
    node.data = node.data.replace(searchRE, replace);}

var searchRE = new RegExp('goddessdess','gi'); 
var replace = 'goddess'; 
for (var i=0;i<textNodes.snapshotLength;i++) { 
    var node = textNodes.snapshotItem(i); 
    node.data = node.data.replace(searchRE, replace);}

var searchRE = new RegExp('son','gi'); 
var replace = 'daughter'; 
for (var i=0;i<textNodes.snapshotLength;i++) { 
    var node = textNodes.snapshotItem(i); 
    node.data = node.data.replace(searchRE, replace);}
