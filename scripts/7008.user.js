// ==UserScript==
// @name         Jasper's Blogger enhancements
// @namespace    http://browservulsel.blogspot.com/
// @description  v0.1 - Jasper's Blogger enhancements
// @include      http://*.blogger.com/*
// ==/UserScript==

//	Author: Jasper de Vries, jepsar@gmail.com
//	Date:   2007-01-06


// Post page
if (self.location.pathname.match(/^\/post-/)) {
	// Hide and disable post options link
	xpathExec("//div[@id='toggle-container']", hide);
	unsafeWindow.togglePostOptions = function(){};

	// Add keep current time UI
	xpathExec("//div[@class='right-section']/b", addKeepTimeUI);
}
// Postings page
else if (self.location.pathname.match(/^\/posts\.g/)) {
	// Add draft to link for keep time function
	xpathExec("//div[@class='softAlert']/../../td[2]//a", function(item){ item.href += "&draft=1" });
}

function addKeepTimeUI(item) {
	var cbO = new checkboxObj();
	cbO.label = "keep current";
	cbO.render(item);

	// Set checked for draft and new items
	if (self.location.search.match(/draft=1/) || (
        !document.getElementById("stuffform").elements.namedItem("postID") &&
			  !self.location.search.match(/quickEdit=true/) )
	) cbO.cb.checked = true;

	unsafeWindow.setInterval(updateTime, 1000, cbO);
}


function updateTime(cbO) {
	if (cbO.cb.checked) {
		var now = new Date();
		document.getElementById("date-input").value =
			now.getDate() +"-"+ (now.getMonth() + 1) +"-"+ (""+ now.getFullYear()).substr(2);
		document.getElementById("time-input").value =
			now.getHours() +":"+ ("0"+ now.getMinutes()).substr(-2, 2);
	}
}


function checkboxObj() {
	this.cb = document.createElement("input");
	this.cb.type = "checkbox";
	this.render = function (item) {
		var lb = document.createElement("label");
		lb.className = "gm-cb";
		lb.appendChild(this.cb);
		lb.appendChild(document.createTextNode(this.label));
		item.appendChild(lb);
	}
}


function xpathExec(xpath, func) {
	var result = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < result.snapshotLength; i++) {
		if (result.snapshotLength == 1) return func(result.snapshotItem(i), arguments[2], arguments[3]);
		else func(result.snapshotItem(i), arguments[2], arguments[3]);
	}
}

function hide(item) { item.style.display = "none"; }
