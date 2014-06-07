// ==UserScript==
// @name           What.CD Debt Calculator
// @author         Wingman4l7
// @namespace      https://github.com/Wingman4l7/debtcalc
// @description    Displays credit "debt" (if any) based off of required ratio.
// @include        http*://what.cd/*
// @include        http*://ssl.what.cd/*
// @version        1.0
// ==/UserScript==
  
const KB = Math.pow(2,10);
const MB = Math.pow(2,20);
const GB = Math.pow(2,30);
const TB = Math.pow(2,40);
const PB = Math.pow(2,50);
 
// calculate & insert your debt, if any  
if (window.location.href.indexOf("what.cd") != -1) { 
	var myUp       = document.getElementById("stats_seeding").childNodes[2].innerHTML;
	var myDown     = document.getElementById("stats_leeching").childNodes[2].innerHTML;
	var myCurRatio = document.getElementById("stats_ratio").childNodes[1].firstChild.innerHTML;
	var myReqRatio = document.getElementById("stats_required").childNodes[2].innerHTML;
	
	// only bother if a debt exists
	if(myCurRatio < myReqRatio) {
		var myStatsListElem = document.getElementById("userinfo_stats");
		var myReqUploadElem = document.createElement("li");
		var myDebt = calcDebt(myUp, myDown, myReqRatio);
		var myRatioColor = spanColor(toBytes(myDebt));
		myReqUploadElem.innerHTML = "Debt: " + "<span class=\"" + myRatioColor + "\">" + myDebt + "</span>";
		myStatsListElem.appendChild(myReqUploadElem); // insert list item		
	}
}

// calculate & insert user debt, if any 
if (window.location.href.indexOf("user.php?id=") != -1) {
	var userStats = document.getElementsByClassName("box box_info box_userinfo_stats")[0];
	var userUp        = userStats.getElementsByTagName('li')[2].innerHTML.split(' ');
	var userDown      = userStats.getElementsByTagName('li')[3].innerHTML.split(' ');
	var userCurRatio  = userStats.getElementsByTagName('li')[4].getElementsByTagName('span')[0].innerHTML;
	var userReqRatio  = userStats.getElementsByTagName('li')[5].innerHTML.split(' ')[2];
	
	// concatenate the # amt & the unit back together, leaving off the "Uploaded / Downloaded" text prefix
	userUp =   userUp[1]   + " " + userUp[2];
	userDown = userDown[1] + " " + userDown[2];
	
	// only bother if a debt exists
	if (userCurRatio < userReqRatio) {
		var userStatsListElem = userStats.getElementsByClassName("stats nobullet")[0];
		var userReqUploadElem = document.createElement("li");
		var userDebt = calcDebt(userUp, userDown, userReqRatio);
		var userRatioColor = spanColor(toBytes(userDebt));
		userReqUploadElem.innerHTML = "Debt: " + "<span class=\"" + userRatioColor + "\">" + userDebt + "</span>";
		userStatsListElem.appendChild(userReqUploadElem);
	 }
}
 
// calcuates upload credit "debt" based off of required ratio  
 function calcDebt(upload, download, reqRatio) {
	var reqUpload = reqRatio * toBytes(download);
    var debt = reqUpload - toBytes(upload);
    debt = fromBytes(debt);
    return debt;
}
 
// convert from format (amount units) to bytes
function toBytes(amount) {
	amount = amount.split(' ');
	var bytes = amount[0];

	if ( amount[1] == "KB" ) bytes = amount[0] * KB;
		else if ( amount[1] == "MB" ) bytes = amount[0] * MB;
		else if ( amount[1] == "GB" ) bytes = amount[0] * GB;
		else if ( amount[1] == "TB" ) bytes = amount[0] * TB;
		else if ( amount[1] == "PB" ) bytes = amount[0] * PB;

	return bytes;
}

// convert from bytes to whatever is appropriate, appended with units used
function fromBytes(bytes) {
	var buffer = bytes;
	var units = 'B';

	if ( Math.abs(bytes) >= PB ) {
	  buffer = bytes/PB;
	  units = "PB";
	} else if ( Math.abs(bytes) >= TB ) {
	  buffer = bytes/TB;
	  units = "TB";
	} else if ( Math.abs(bytes) >= GB ) {
	  buffer = bytes/GB;
	  units = "GB";
	} else if ( Math.abs(bytes) >= MB ) {
	  buffer = bytes/MB;
	  units = "MB";
	} else if ( Math.abs(bytes) >= KB ) {
	  buffer = bytes/KB;
	  units = "KB";
	}
  
	return buffer.toFixed(2) + ' ' + units;
}

// sets the color based on the amount, similar to ratio coloring
function spanColor(bytes) {
	var r_class;
  
	if ( bytes < (250 * MB) )          r_class = 'r50'; // dark green
		else if ( bytes < (500 * MB) ) r_class = 'r10'; // light green
		else if ( bytes < (1 * GB) )   r_class = 'r09'; // orange-yellow
		else if ( bytes < (2 * GB) )   r_class = 'r05'; // red-orange
		else                           r_class = 'r00'; // red
    
    return r_class;
}