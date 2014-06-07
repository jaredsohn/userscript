// ==UserScript==
// @name         Blogger Current Time Publish
// @namespace    http://fatknowledge.blogspot.com/
// @description  v 1.04 Add a "Publish Now" button that will set the time to current time before publishing
// @include       http://www.blogger.com/post-edit.g*
// @include       http://www.blogger.com/post-create.g*
// ==/UserScript==

/*

	Author: Fat Knowledge fatknowledge@gmail.com
	Date:   2008-08-20

*/

var pubButton, pubTimeButton;
pubButton = document.getElementById('publishButton');
if (pubButton) {
	//create new "Publish Now" button
    pubTimeButton = document.createElement('div');
    pubTimeButton.innerHTML="\x3ca id\x3d\x22publishNowButton\x22 class\x3d\x22cssButton\x22 href\x3d\x22javascript:void(0)\x22 onclick\x3d\x22var e \x3d document[\x26#39;stuffform\x26#39;].publish;(e.length) ? e[0].click() : e.click();\x22\x3e\x3cdiv class\x3d\x22cssButtonOuter\x22\x3e\x3cdiv class\x3d\x22cssButtonMiddle\x22\x3e\x3cdiv class\x3d\x22cssButtonInner\x22\x3ePublish Now\x3c/div\x3e\x3c/div\x3e\x3c/div\x3e\x3c/a\x3e";

/* 
Javascript encoding
" \x22
& \x26
> \x3c
= \x3d
< \x3e
*/

// old version
//    pubTimeButton.innerHTML="<div id\u003d\"publishButton\" onclick\u003d\"var e \u003d document[&#39;stuffform&#39;].publish;(e.length) ? e[0].click() : e.click();\" class\u003d\"ubtn  ubtn-left\"> <div class\u003d\"i\"> <div class\u003d\"t\"><div>&nbsp;</div></div> <a href\u003d\"javascript:void(0)\" onclick\u003d\"return false;\" tabindex\u003d\"7\"><span>Publish Now</span></a> <div class\u003d\"b\"><div>&nbsp;</div></div> </div> </div>  <input style\u003d\"position:absolute; display:block; width:0; padding:0; z-index:-1; border:none; top:-5000px; left:-5000px\" name\u003d\"publish\" value\u003d\"true\" type\u003d\"submit\" id\u003d\"publishButton-hidden\" tabindex\u003d\"-1\">";

	//when clicked, run set_time_now, then do the normal publish call (in innerHTML code above)
	pubTimeButton.addEventListener('click', function(event) {
		set_time_now();
	}, true);

	//add the Publish Now button after the Publish button
	//isn't javascript syntax frickin' intuitive?
    pubButton.parentNode.insertBefore(pubTimeButton, pubButton.nextSibling);
}


//Set Publish Date Time to current time in form 01/14/2007 7:00PM
function set_time_now(){
	var now = new Date();

	var date_input = document.getElementById('date-input');
	date_input.value = (now.getMonth()+1)+"/"+now.getDate()+"/"+now.getFullYear();

	var hours = now.getHours();
	var ampm = "AM";
	if (hours > 11)
		ampm = "PM";
	if (hours > 12)
		hours -= 12;
	if (hours == 0) hours = 12;

	var time_input = document.getElementById('time-input');
	time_input.value=hours+":"+now.getMinutes()+" "+ampm;

}