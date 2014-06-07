// ==UserScript==
// @name           Cheeseroller Autofudger
// @description	   Autoplays Cheeseroller
// @namespace      http://userscripts.org/users/83296
// @include        http://www.neopets.com/medieval/cheeseroller.phtml
// ==/UserScript==

var x = 1000 //change the page delay here; 1000 = 1 second
function delay() {
if(document.body.innerHTML.indexOf('DISTANCE TO FINISH LINE') != -1){
	var lists = document.getElementsByTagName("select");for(var i = 0; i < lists.length; i++){if(lists[i].name == "cheese_action"){lists[i].options[3].selected = true;}}
	var cheese = document.evaluate('//form[@action="cheeseroller.phtml"]/input[@type = "submit" and @value = "Go!"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);cheese.click();cheese.form.submit();}

if(document.body.innerHTML.indexOf('GO!!!!') != -1){
	var cheese = document.evaluate('//input[@type = "submit" and @value = "GO!!!!"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);cheese.click();cheese.form.submit();}

if(document.body.innerHTML.indexOf('Play Again') != -1){
	var cheese = document.evaluate('//input[@type = "submit" and @value = "Play Again?"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);cheese.click();cheese.form.submit();}


if(document.body.innerHTML.indexOf('Quadruple Fudge Cheese at 1800 NP') != -1){
	var cheese = document.evaluate('//input[@type = "submit" and @value = "Buy Quadruple Fudge Cheese at 1800 NP"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);cheese.click();cheese.form.submit();}

if(document.body.innerHTML.indexOf('Which cheese do you wish to purchase?') != -1){
	var fudge="Quadruple Fudge"; document.getElementsByName("cheese_name")[0].value=fudge;
	var cheese = document.evaluate('//input[@type = "submit" and @value = "Submit"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);cheese.click();cheese.form.submit();}

}window.setTimeout(delay, x)