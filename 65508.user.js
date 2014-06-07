// Torpia Forum Extra Pagination
// Frazer Davidson
// 2010-01-01 23:02

// version user.0.2 - greasemonkey
// Last Updated: 2010-01-04 00:53

// ==UserScript==
// @name           Torpia Move Finish Button
// @version        0.2.1
// @namespace      http://userscripts.org/scripts/show/65508
// @description    For the Browser MMO Torpia, moves the 'Finish' button away from the 'Upgrade' button.
// @include        http://*.torpia.*/building/building/*
// ==/UserScript==

// 0.2.1
// fix for building that can be upgraded, but others are taking up the slots.
// 0.2
// red out cancel button
// fix the greyed out box moving upgrade button

// get all divs, to be used to find div we want
var divs = document.getElementsByTagName('div');

//declare var to store div we want
var buttonsDiv;
var upgradeBox;
var greyUpgradeBox;

//loop through divs
for (i=0;i<divs.length;i++) {
	//get style, as only div we want uses this setup
	var divStyle = divs[i].getAttribute("style");
		var divClass = divs[i].getAttribute("class");
	if (divClass == 'contentbox upgrade'){
		upgradeBox = divs[i];
	} else if (divClass == 'contentbox upgrade seethrough') {
    greyUpgradeBox = divs[i];
	}
	//if this is our div, store it in buttonsDiv
	if(divStyle == "float: right;"){
		buttonsDiv = divs[i];
	}  
}

//if we found it
if(buttonsDiv && !greyUpgradeBox){

	//set the div to full width
	buttonsDiv.setAttribute('style','width:100%');
	//get the anchors
	var anchors = buttonsDiv.getElementsByTagName('a');
	//shift one over
	if(anchors[1]){
		//shift one over
		anchors[1].setAttribute('style','float:right');
	} else {
		//not anchor but <span class="linkbutton seethrough">Upgrade</span>
		upgradeSpan = buttonsDiv.getElementsByTagName('span');
		upgradeSpan[0].setAttribute('style','float:right');
	}
	
} else {

  //no buttons div, so make it
  //find button li
  var lis = upgradeBox.getElementsByTagName('li');
  
  //we're using the last so lis[lis.length-1]
  buttonsLi = lis[lis.length-1];

	//swap the two links inside around
	divString = buttonsLi.innerHTML;
	var finishButton = divString.substring(divString.indexOf('</a>')+4);
	var cancelButton = divString.substring(0,divString.indexOf('</a>')+4);
	
  upgradeBox.innerHTML += '<div id="newButtons" style="width:100%;">'+finishButton+cancelButton+'</div>';
  
  
  buttonsDiv = document.getElementById('newButtons');
  var anchors = buttonsDiv.getElementsByTagName('a');
	anchors[1].setAttribute('style','float:right;background:#000000 url(/images/layout/dark/notify_bg.gif) repeat-x scroll left top;border-color:#905555 #111111 #111111 #905555;');


  //remove old buttons
  //find the li
  //delete it
  
  var uls = upgradeBox.getElementsByTagName('ul');
  
  //remove everything after and including the start of li <li class="widelistitem">
  uls[0].innerHTML = uls[0].innerHTML.substring(0,uls[0].innerHTML.indexOf('<li class="widelistitem">'));

}





  

  
  
  