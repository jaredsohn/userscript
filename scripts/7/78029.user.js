// ==UserScript==
// @name 		TinierMe Linker 
// @author		Mr. Picky & AmpliDude
// @description		Provides exact link of a thread in the forum/group, or a diary entry.
// @instruction 	When viewing a thread, click anywhere, and the exactl url should appear right beside the thread title
// @include 		http://www.tinierme.com/tinierme/gameThread.do
// @include		http://www.tinierme.com/tinierme/circleThreadDisp.do
// @include		http://www.tinierme.com/tinierme/diarydisp.do
// @include		http://www.tinierme.com/tinierme/circleDisp.do
// @exclude 	
// ==/UserScript==


var urll = document.location.href;

var threadID;
var inp = document.evaluate('//input[@name="threadId"]', document, null, 9, null).singleNodeValue;
if (inp != null) {
	threadID = inp.value;
	document.body.addEventListener('click', showLink, false);
}
var gameID;
var inp = document.evaluate('//input[@name="gameId"]', document, null, 9, null).singleNodeValue;
if (inp != null) {
	gameID = inp.value;
	document.body.addEventListener('click', showLink, false);
}
var circleID;
var inp = document.evaluate('//input[@name="circleId"]', document, null, 9, null).singleNodeValue;
if (inp != null) {
	circleID = inp.value;
	document.body.addEventListener('click', showLink, false);
}
var authorID;
var inp = document.evaluate('//input[@name="authorId"]', document, null, 9, null).singleNodeValue;
if (inp != null) {
	authorID = inp.value;
	document.body.addEventListener('click', showLink, false);
}
var diaryDate;
var inp = document.evaluate('//input[@name="diaryDate"]', document, null, 9, null).singleNodeValue;
if (inp != null) {
	diaryDate = inp.value;
	document.body.addEventListener('click', showLink, false);
}


	
function showLink(e) {

	if (urll.indexOf("gameThread") != -1){

	input = document.createElement('input');
	input.type = "text";
	input.setAttribute('style', 'position:absolute;top:235px;left:540px;border:solid 1px #dddddd;background-color:#ffffff;font:normal 9px Tahoma;color:#555555');
	input.value = document.URL + '?gameId=' + gameID + '&threadId=' + threadID;
	input.size = input.value.length;
	document.body.appendChild(input);
	document.body.removeEventListener('click', showLink, false);

	}

	
	else if (urll.indexOf("circleThread") != -1){

	input = document.createElement('input');
	input.type = "text";
	input.setAttribute('style', 'position:absolute;top:235px;left:540px;border:solid 1px #dddddd;background-color:#ffffff;font:normal 9px Tahoma;color:#555555');
	input.value = document.URL + '?circleId=' + circleID + '&threadId=' + threadID;
	input.size = input.value.length;
	document.body.appendChild(input);
	document.body.removeEventListener('click', showLink, false);

	}

	else if (urll.indexOf("diarydisp") != -1){

	input = document.createElement('input');
	input.type = "text";
	input.setAttribute('style', 'position:absolute;top:215px;left:515px;border:solid 1px #dddddd;background-color:#ffffff;font:normal 9px Tahoma;color:#555555');
	input.value = document.URL + '?authorId=' + authorID + '&diaryDate=' + diaryDate;
	input.size = input.value.length;
	document.body.appendChild(input);
	document.body.removeEventListener('click', showLink, false);

	}

	else if (urll.indexOf("circleDisp") != -1){

	input = document.createElement('input');
	input.type = "text";
	input.setAttribute('style', 'position:absolute;top:130px;left:653px;border:solid 1px #dddddd;background-color:#ffffff;font:normal 9px Tahoma;color:#555555');
	input.value = document.URL + '?circleId=' + circleID;
	input.size = input.value.length;
	document.body.appendChild(input);
	document.body.removeEventListener('click', showLink, false);
	
	}


}