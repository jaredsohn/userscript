// ==UserScript==
// @name           DragCave Advancer
// @namespace      http://userscripts.org/scripts/show/98748
// @version        4c
// @description    Refreshes cave, adds wikia link, adds view link.
// @require        http://sizzlemctwizzle.com/updater.php?id=98748&uso
// @include        http://dragcave.net/abandoned
// @include        http://dragcave.net/*
// ==/UserScript==

// Options
// User Name
// this must be *IDENTICAL* to your login
// If this is not filled in, but userRep is set to 1, it won't show the right URL or link.
var user='El_Espado';

// Set this to 1 and set your username above to show a textbox instead of link
// Set it to 0(optional: and set var user to equal '') to disable
	// due to an issue as of v4b, you can still show the box, but the link will be right under it.
var userRep=1;

// Refresh every XX seconds:
// Set to 0 to not refresh.
var time=0;

// 1 = show view link
// 0 = do not show view link
var view=1;

// 1 = show wikia link
// 0 = do not show any link
var wikiaLink=1;
// End Options

if (wikiaLink==1){
	var wikia = document.createElement("div");
wikia.innerHTML = '<div style="margin: 0 auto 0 auto; ' +
    'border-bottom: 1px solid #000000; margin-bottom: 5px; ' +
    'font-size: small; background-color: #000000; ' +
    'color: #FFFFFF;"><p style="margin: 0px 0 3px 0;"> ' +
    '<a style="color:#00FFFF;" href="http://dragcave.wikia.com/" target="_blank">DragCave Wikia</a> ' +
    '~~ <a style="color:#00FFFF;" href="http://dragcave.wikia.com/wiki/Which_egg_is_which" target="_blank">Egg Guide</a> ' +
    '<p style="margin: 0px 0 3px 0;"><em><strong>Hatcheries:</strong></em> <a style="color:#00FFFF;" href="http://www.coup-detat.info/NDER/" target="_blank">Allure of Neglected Dragons</a> ' +
    '~~ <a style="color:#00FFFF;" href="http://draghatch.tk" target="_blank">DragHatch</a> ' +
    '~~ <a style="color:#00FFFF;" href="http://dc.fo-c.us/hatchery/" target="_blank">Dragon Cave Focus</a> ' +
    '~~ <a style="color:#00FFFF;" href="http://dragcave.wikia.com/wiki/Click_Sites" target="_blank">More Hatcheries</a> ' +
    '</p></p></div>';
document.body.insertBefore(wikia, document.body.firstChild);
}

// refresh the page
if (urlCheck('http://dragcave.net/abandoned')==1 && time!=0){
setTimeout("location.reload(true);",time*1000);
}

// add view links
if (urlCheck('http://dragcave.net/abandoned')==1){
var eggView = document.evaluate("//a[contains(@href,'abandoned')]",
	 document.getElementById("middle"), null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
if (view==1){
	createLinks();
}
}

function createLinks(){
for (var i=0; i<eggView.snapshotLength; i++) {
	var viewLink = document.createElement('a');
	viewLink.href = eggView.snapshotItem(i).href.replace(/abandoned/,'view');
	viewLink.appendChild(document.createTextNode("View"));
	eggView.snapshotItem(i).parentNode.appendChild(document.createElement('br'));
	eggView.snapshotItem(i).parentNode.appendChild(viewLink);
}
}

// Check URL
function urlCheck(url){
	var curURL=document.location.href;
	if (curURL==url){
		return 1;
	}else{
		return 0;
	}
}

if (urlCheck('http://dragcave.net/account')==1 && userRep==1){
// Remove the link to prevent redundancy :)
/* Get menu -- Start code by Cletus
var menu = document.getElementById('menu');

// Add each element to an array
var elements = [];
elements.push(menu.nextSibling);
elements.push(menu.nextSibling.nextSibling);
elements.push(menu.nextSibling.nextSibling.nextSibling);
elements.push(menu.nextSibling.nextSibling.nextSibling.nextSibling);

// Remove each element in that array
for (var i = 0; i < elements.length; i++) {
    elements[i].parentNode.removeChild(elements[i]);
} // -- end code by Cletus */

// now add the text box :)
var logo = document.createElement("div");
var mydiv = document.getElementById('menu');
var userURL = 'http://dragcave.net/user/' + user;
logo.innerHTML = '<div>You can copy and paste the following URL to share your scroll:<br>' +
	'<input size=' + userURL.length + ' type="text" value="' +
	userURL +
    '"> (or view your <a href="' +
    userURL +
    '">public profile</a>)</div>';
mydiv.parentNode.insertBefore(logo, mydiv.nextSibling);
}

// Removes the ads :)
var adRemove = document.getElementById('prefooter');
if (adRemove) {
    adRemove.parentNode.removeChild(adRemove);
}