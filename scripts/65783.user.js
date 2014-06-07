// ==UserScript==
// @name           MSG&Friend
// @namespace      DeNada
// @include        http://ww*.erepublik.com/*/list/online_users/*/*
// ==/UserScript==

// add as friend links

var allLinks = document.getElementsByClassName('dotted');
var junk = '';
var stuff = '';
var newElement = '';

for(var i=0; i < allLinks.length; i++) {

        stuff = allLinks[i].href.replace('citizen/profile','messages/compose');
        junk = allLinks[i].href.replace('en/citizen/profile','citizen/friends/add');

    	newElement = document.createElement('a');
newElement.innerHTML = '<br> <a title="Add Friend" href="'+junk+' " target="_blank">Add as Friend</a>';
    	allLinks[i].parentNode.insertBefore(newElement, allLinks[i].nextSibling);
}

// gets value

var chead = GM_getValue("head","Head");
var cbody = GM_getValue("body","Body");


function update(e) {

	var body = document.getElementById("message_body");
	var subject = document.getElementById("message_subject");



	if (!confirm("Do you want to update?"))
		return false;	

	GM_setValue("head", subject.value);   	
	GM_setValue("body", body.value);

var allDivs, thisDiv;
allDivs = document.evaluate(
    "//a[@title='Send message']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
var split = thisDiv.href.split("?");
    thisDiv.href = split[0] +'?message_subject='+subject.value+'&message_body='+body.value+' ';
    thisDiv.target = '_blank';
} 	
	return false
}


// creates message input areas

junk = document.getElementsByClassName('bestof');

newElement = document.createElement('div');
newElement.innerHTML = '<div><p>Subject</p><input type="text" name="message_subject" id="message_subject" value="'+chead+'"><p>Message</p><textarea name="message_body" id="message_body">'+cbody+'</textarea></div>';

	var button = document.createElement("input");	
	button.setAttribute("type","button");	
	button.setAttribute("value","Update");
	button.setAttribute("class","arrowbutton");	
	button.addEventListener("click", update, true)


    	junk[0].parentNode.insertBefore(newElement, allLinks.length.nextSibling);
	junk[0].parentNode.insertBefore(button, allLinks.length.nextSibling);
// changes message links

var allDivs, thisDiv;

allDivs = document.evaluate(
    "//a[@title='Send message']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
    thisDiv.href = thisDiv.href +'?message_subject='+chead+'&message_body='+cbody+' ';
    thisDiv.target = '_blank';
}
