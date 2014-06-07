// ==UserScript==
// @name	Youtube User Filter
// @author	bolsheviktory
// @description	Hides videos of users you never want to see on youtube
// @include	/^https?://(www.)?youtube.com/watch*/
// @grant       GM_getValue
// @grant       GM_setValue
// @namespace	bolsheviktory-youtube-user-filter
// @updateURL	http://userscripts.org/scripts/source/128235.meta.js
// @downloadURL	https://userscripts.org/scripts/source/128235.user.js
// @version	1.3
// ==/UserScript==

//compare string 'name' to every element in userList, return true if found
function filterUser(name) {
	return listContainsUserName(userList, name.toLowerCase());
}

//return true if substring exists in object (case insensitive)
function listContainsUserName(obj, substring) {
	var i = obj.length;
	while (i--) {
		if ((obj[i] != null) && (substring == obj[i].toString().toLowerCase())) {
			return true;
		}
	}
	return false;
}

//on click handler for 'Block this user'
function addToUserList (){
	//hide to prevent this button from being clicked again
	button.setAttribute('style','display:none');
	//add to list
	userList.push(uploader[0].innerHTML);
	userList.sort();
	//put userList back into about:config
	GM_setValue("userList",JSON.stringify(userList));
	//reload page
	window.location.href=window.location.href;
}

//on click handler for 'Unblock this user'
function removeFromUserList (){
	//hide to prevent this button from being clicked again
	button.setAttribute('style','display:none');
	//remove from list
	var index = userList.indexOf(uploader[0].innerHTML);
	userList.splice(index,1);
	//put userList back into about:config
	GM_setValue("userList",JSON.stringify(userList));
	//reload page
	window.location.href=window.location.href;
}

//create function, it expects 2 values.
function insertAfter(newElement,targetElement) {

	// target is what you want it to go after. Look for this elements parent.
	var parent = targetElement.parentNode;
	
	// if the parents lastchild is the targetElement...
	if(parent.lastchild == targetElement) {
	
		// add the newElement after the target element.
		parent.appendChild(newElement);
		
		} else {
		// else the target has siblings, insert the new element between the target and it's next sibling.
		parent.insertBefore(newElement, targetElement.nextSibling);
		}
}

//Load userlist from about:config
var userList;
if(GM_getValue("userList")){
	userList = JSON.parse(GM_getValue("userList"));
}else{
	userList=[];
}

//sort document by uploader name class
var uploader=document.getElementsByClassName('yt-uix-sessionlink yt-user-name ');
//avoid putting clickable button in pages other than one where
//we are watching a video
//alert(uploader[0].innerHTML);
if(uploader[0]){

	//set up clickable button to add to filter list
	var button = document.createElement('input');
	button.setAttribute('type','button');
	button.setAttribute('class',' yt-uix-button yt-uix-button-text yt-uix-tooltip');
	
	//test if user is already blocked, check to see which listener and info to insert
	if(filterUser(uploader[0].innerHTML)){
		button.setAttribute('name','Unblock User');
		button.setAttribute('value','Unblock User');
		button.setAttribute('data-tooltip-text','Unblock this user and see their videos in the "Suggested Videos" area again');
		button.addEventListener("click", removeFromUserList, true);
	}else{
		button.setAttribute('name','Block User');
		button.setAttribute('value','Block User');
		button.setAttribute('data-tooltip-text','Block this user and remove their videos from the "Suggested Videos" area');
		button.addEventListener("click", addToUserList, true);	
	}
	
	//find button group
	var buttongroup=document.getElementsByClassName(' yt-uix-button yt-uix-button-text yt-uix-tooltip yt-uix-button-empty');
	//put clicakble link into watch-actions button area after flag user button
	insertAfter(button,buttongroup[2]);
	
}

//filter by whatever is currently in the userList
var ele=document.getElementsByClassName('yt-user-name ');
for(i in ele){
	if(filterUser(ele[i].innerHTML) && (i>2)){
		//if not the video info, filter it    
		ele[i].parentNode.parentNode.setAttribute('style','display:none');
	}
}