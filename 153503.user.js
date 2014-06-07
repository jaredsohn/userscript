// ==UserScript==
// @name        myStandard.at
// @namespace   myStandard.at
// @description Hide postings from stupid users.
// @include     http://derstandard.at/*
// @include     https://derstandard.at/*
// @include	http://diestandard.at/*
// @include	https://diestandard.at/*
// @include	http://dastandard.at/*
// @include	https://dastandard.at/*
// @grant       GM_deleteValue
// @grant       GM_getValue
// @grant       GM_setValue
// @version     0.2.20121224
// @author	Arni Schulze
// ==/UserScript==


// Changes the website: Adds the hide-buttons and hides the postings.
// This function is always called when entering an included website.
function changeWebsite() {
	// the highest node of a single posting has the attribute: class="up"
	var upNodes = document.getElementsByClassName("up");
	for(var i = 0; i < upNodes.length; i++) {
		var uname;
		try {
			uname = upNodes[i].getElementsByClassName("uname")[0].firstChild.firstChild.data;
		} catch(e) {
			uname = upNodes[i].getElementsByClassName("uname power")[0].firstChild.data;
		}
		var banned = isBanned(uname);
		// add a ban/unban-button and hide/not hide the posting
		addOrUpdateBanButton(upNodes[i], uname, !banned);
		showOrHidePosting(upNodes[i], i, !banned);
	}
}


// Adds a ban button if not present or updates it if it exists.
// @attribute upNode - highest node of a single posting (class="up")
// @attribute uname - the username of the posting's author
// @attribute ban - true if it should be a "ban user"-button, false it it should be a "unban user"-button
function addOrUpdateBanButton(upNode, uname, ban) {
	var buttons = upNode.getElementsByClassName("myBanButton");
	if(buttons == null || buttons.length == 0) {
		var button = document.createElement("a");
		button.setAttribute("class", "myBanButton");
		button.setAttribute("uname", uname);
		button.setAttribute("href", "javascript:;");
		if(ban == true) {
			button.setAttribute("job", "ban");
			button.appendChild(document.createTextNode("Poster ignorieren"));
		}
		else {
			button.setAttribute("job", "unban");
			button.appendChild(document.createTextNode("Poster zulassen"));
		}
		button.addEventListener("click", banButtonClicked, false);
		// surround the button with a <div> to include it into the derStandard-design
		var buttonDiv = document.createElement("div");
		buttonDiv.setAttribute("class", "r a");
		buttonDiv.appendChild(button);
		// place it right beside the text "antworten" in the posting's head
		var someNode = upNode.getElementsByClassName("r a")[0];
		someNode.setAttribute("class", "r p");
		someNode.parentNode.insertBefore(buttonDiv, someNode);
	}
	else if(ban == true) {
		buttons[0].setAttribute("job", "ban");
		buttons[0].firstChild.data = "Poster ignorieren";
	}
	else {
		buttons[0].setAttribute("job", "unban");
		buttons[0].firstChild.data = "Poster zulassen";
	}
}


// Shows the posting and hides the "show posting"-button, or
// hides the posting and shows the "show posting"-button.
// @attribute upNode - highest node of a single posting (class="up")
// @attribute id - the posting's and the button's id
// @attrubute showPosting - true if the posting should be visible, false if not
function showOrHidePosting(upNode, id, showPosting) {
	var txtNode = upNode.getElementsByClassName('txt')[0];
	txtNode.setAttribute("id", "txt" + id);
	
	var showButton = document.getElementById(id);
	if(showButton == null) {
		showButton = document.createElement("a");
		showButton.setAttribute("id", id);
		showButton.setAttribute("href", "javascript:;");
		showButton.appendChild(document.createTextNode("Posting anzeigen"));
		showButton.addEventListener("click", showPostingButtonClicked, false);
		txtNode.parentNode.insertBefore(showButton, txtNode);
	}
	
	if(showPosting == true) {
		txtNode.setAttribute("style", "display:inline");
		showButton.setAttribute("style", "display:none");
	}
	else {
		txtNode.setAttribute("style", "display:none");
		showButton.setAttribute("style", "display:inline");
	}
}


// Looks into the firefox configuration if a user is banned or not.
// @return true if banned, false if not.
function isBanned(uname) {
	if(GM_getValue("ban_" + uname) == "")
		return true;
	else
		return false;
}


// Saves a banned user into the firefox configuration.
// @attribute uname - the username
// @attribute value - some value (this value is not used yet!)
function banUser(uname, value) {
	GM_setValue("ban_" + uname, "");
}


// Deletes a banned user from the firefox configuration.
// @attribute uname - the username
function unbanUser(uname) {
	GM_deleteValue("ban_" + uname);
}


// Called by the ban/unban-button.
// @attribute event - the event that triggers this function
function banButtonClicked(event) {
	var job = event.target.getAttribute("job");
	var uname = event.target.getAttribute("uname");
	
	if(job == "ban") {
		if(isBanned(uname))
			alert("User is already banned!");
		else
			banUser(uname,"");
	}
	else {
		if(isBanned(uname))
			unbanUser(uname);
		else
			alert("User isn't banned at all!");
	}
	
	// update the site to see the changes
	changeWebsite();
}


// Called by the show-posting-button.
// @attribute event - the event that triggers this function
function showPostingButtonClicked(event) {
	var id = event.target.getAttribute("id");
	document.getElementById(id).setAttribute("style", "display:none");
	document.getElementById("txt" + id).setAttribute("style", "display:inline");
}



changeWebsite();