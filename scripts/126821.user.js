// ==UserScript==
// @name        fb wall eraser
// @author		Marko Bewersdorff
// @version 	0.6 beta 27.02.2012
// @description	This facebook wall cleaner script removes all entries on a user's facebook wall. It uses m.facebook.com/user-name or http://m.facebook.com/profile.php?...v=feed  to clean up posts.
// @source 		http://www.internet-engineering.com/fb-wall-eraser/source/
// @identifier 	http://www.internet-engineering.com/fb-wall-eraser/source/fb_wall_cleaner.user.js
// @copyright	(C) 2012 Marko Bewersdorff 
// @license 	Creative Commons License "fb wall eraser" by Marko Bewersdorff is licensed under a Creative Commons Attribution-NoDerivs 3.0 Unported License. Permissions beyond the scope of this license may be available at http://www.internet-engineering.com/fb-wall-eraser/license/.
// @include         http://m.facebook.com/*
// @include         http://www.facebook.com/*
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// ==/UserScript==

// License
// -------
// Creative Commons License "fb wall eraser" by Marko Bewersdorff is licensed under a 
// Creative Commons Attribution-NoDerivs 3.0 Unported License. Permissions beyond the scope 
// of this license may be available at http://www.internet-engineering.com/fb-wall-eraser/license/.
// 

var version = "0.6 beta 26.02.2012"
var cleaner = GM_getValue("cleaner", "new");
var cleaneraction = GM_getValue("cleaneraction", "entering");
var onDesktopSite = 0;
var extraStep = "";
var pagetitle = document.title;
var filename = location.pathname.substr(location.pathname.lastIndexOf("m.facebook.com")+2,location.pathname.length);
var onWall = 0;
var d = new Date();
var ourEpoch = parseInt(d.getTime()/1000);
ourEpoch = ourEpoch.toString();

var removeText = '<font color=red>To disable this script:</font> Look for the \"Greasemonkey\" button on the upper right hand corner above this browser window, click the down triangle, remove the check mark from \"fb wall eraser\" and reload this page - this warning should be gone and there will be no more automatic deletion of your wall posts.<br><br>After \"fb wall eraser\" has deleted everything off the mobile wall, most likely due to database synching issues at facebook, the full dektop version of the wall will still contain some old posts. However there is no reason that those should remain for more than 24 hours.<br><br>To permanently remove this script, select the same drop-down and then click \"Manage User Scripts\". A new tab will open and you should see the \"fb wall eraser\" script together with 3 buttons, click \"Remove\" to make it be gone for good. You can always install it again. Or if you may want to use it again or use it with a friend, click \"Disable\". That way the script stays installed. ';

var noticeDiv = '<div id=\"cleanerStatus\" style=\"position:absolute; top:10px; left:400px; width:375px;  -moz-border-radius: 15px; border-radius: 15px;  border-width:8px; border-style:solid; border-color:red; background-color:white; padding:5px; font-size:17px; font-family:Arial; z-index:2;\"><b>Hold Down the \"ESC\" key or klick the Stop button a few times to stop anhilation of your wall<p><input type=\"button\" id=\"stop\" style=\"position:relative; top:0; left:130px; width:100px; height=30px;  -moz-border-radius: 15px; border-radius: 15px;  border-width:2px; border-style:solid; background-color:red; color:white; padding:5px; font-size:20px; z-index:2;\" onclick=\"window.location.href=\'http://m.facebook.com/home.php?refid=0\'\" value=\"STOP\"> <font size=\"-1\"><p>questions, comments, donations, latest version, &copy; notices:<br><a href=\"http://www.internet-engineering.com/fb-wall-eraser/\">www.internet-engineering.com/fb-wall-eraser/</a></font></b><div align=right><font size=-2>version: '+version+'</font></div></div>';  

var doneDiv = '<div id=\"cleanerStatusDDone\" style=\"position:absolute; top:10px; left:260px; width:550px;  -moz-border-radius: 15px; border-radius: 15px;  border-width:8px; border-style:solid; border-color:#58983A; background-color:white; padding:5px; font-size:17px; font-family:Arial; z-index:4;\"><b>Script is done. IMPORTANT: please turn off this script NOW, otherwise when you return to the mobile facebook page with it enabled, all new posts will be wiped clear, too!!!<p></b>'+removeText+'<p><b>If you think this script helped you save a few hours or days in front of the computer, feel free to share it with friends. <a href=\"http://www.internet-engineering.com/fb-wall-eraser/donate/\">please consider donating a dollar here</a>. <br>To get back to your regular desktop fb page click <a href=\"http://www.facebook.com/\" target=\"new\">here</a></b><br><div align=right><font size=-2>version: '+version+'</font></div></div>'; 

var homeNoticeDiv1 = '<div id=\"entryDiv\" style=\"position:absolute; top:10px; left:250px; width:575px; overflow: visible; -moz-border-radius: 15px; border-radius: 15px;  border-width:8px; border-style:solid; border-color:red; background-color:white; padding:5px; font-size:17px; font-family:Arial; z-index:16777200;\"><b>'+
'Warning!!! This script will delete ALL your wall entries, starting with the newest!!!<p><a href=\"#fbDl\">How to back up your profile</a><p>For maximum speed and least bandwith use in Firefox disable \'download images automatically\' under tools &rarr; options.</p><p>To continue ';

var homeNoticeDiv2 = ' click on your \"Profile\" tab </b>(or \"Edit Profile\" and then \"Wall\")<div id=\"backup\" style=\"position:absolute; top:35px; left:340px; width:270px; height=40px; -moz-border-radius: 10px; border-radius: 10px;  border-width:2px; border-style:solid; border-color:red; background-color:white; padding:3px; font-size:17px; font-family:Arial; z-index:3;\"><b>Back up your profile first! <br>This script has no undo option!</b></div><p><div style=\"font-size:12px;"\><p>After \"fb wall eraser\" has deleted everything off the mobile wall, most likely due to database synching issues at facebook, the full dektop version of the wall will still contain some old posts. However there is no reason that those should remain for more than 24 hours.<p>This script simply automates the clicking on each post, loading the post, and \"clicking\" the \"Remove\" option, over and over until the wall is scrubbed clean.<P>To stop the script hold down the \"ESC\"(ape) key, or click the \"Stop\" button that will be on each page, or close the browser window. This process depends on your browser having a connection with the internet. If your network connection is slow this process may stop, to restart it just click on your profile tab again.<P>'+

'<b>If you do not know why you are seeing this message - <font color=red>don\'t panic</font></b>, But by any means <b>do NOT click on your \"Profile\" Tab</b><br>'+removeText+'</div>'+
'<p><b>questions, comments, donations, latest version, &copy; notices:<br><a href=\"http://www.internet-engineering.com/fb-wall-eraser/\">www.internet-engineering.com/<br>fb-wall-eraser/</a></b><br><div align=right><font size=-2>version: '+version+'</font></div>'+
'<p><div id=\"fbdl\"><a name=\'fbDl\'> </a><p><b>How can I download my information from Facebook?</b></p> <p>You can download your information from the Account Settings page.</p> <ol> <li>Go to the <a href=\"http://www.facebook.com/\" target=\"fbDesktop\">Desktop version of Facebook</a> (opens in new tab)</li> <li>Click the account menu at the top right of any Facebook page</li> <li>Choose Account Settings</li> <li>Click on \"Download a copy\" of your Facebook data</li> <li>Click the Download button on the following page</li> <li>Check your email about 5 to 10 minutes later</li> <li>Click on the link in the email to download one ZIP file</li> <li>extract the ZIP file to your computer and browse those files with your web browser</li> </ol> <p>Because this download contains your profile (timeline) information, you should keep it secure and take precautions when storing, sending or uploading it to any other services. </p></div></div>';

// if we're on the home page show entry / exit dialog
if (window.location.hostname == "www.facebook.com"){
		var myHomeDiv = document.createElement('entryDiv');
		extraStep = "First go to the <a href=\"http://m.facebook.com\">mobile facebook page</a>. Then "
		myHomeDiv.innerHTML = homeNoticeDiv1 + extraStep + homeNoticeDiv2; 
		document.body.appendChild(myHomeDiv);
		onDesktopSite = 1;
}
else {
	if (filename == '' || filename == "home.php"){
		var myHomeDiv = document.createElement('entryDiv');
		myHomeDiv.innerHTML = homeNoticeDiv1 + homeNoticeDiv2; 
		document.body.appendChild(myHomeDiv);
		GM_setValue("cleaneraction","new");
	}
	if (filename == "delete.php"){
		// check if delete mode
		if (cleaneraction == "cleaning"){
			var myDiv = document.createElement('div');
			myDiv.innerHTML = noticeDiv; 
			document.body.appendChild(myDiv);
			document.forms[0].submit();	
		}
	}
	// checking if we are on the user's profile page
	// not trusting fb's url to be clean, mostly going by the tabs that are highlighted (highlit?)
	var userprofile = document.body.innerHTML.substr(document.body.innerHTML.indexOf("<a class=\"inv marquee_tab_select\" href=\"")+41,100);
	userprofile = userprofile.substr(0,userprofile.indexOf("?refid"));
	if (userprofile.indexOf(".php?refid") != -1 || userprofile.indexOf("home.php") == 0 || userprofile.indexOf("friends/") == 0 || userprofile.indexOf("messages/") == 0) {
		userprofile = 'no.match.found';
	}
	//for non named profiles
	if (location.href.indexOf("v=feed") != -1){
		onWall = 1;
	}
	if (userprofile == filename || filename == "wall.php"){
		//then we're on the user's wall
		onWall = 1;
	}
	if (onWall == 1){
		cleaneraction = GM_getValue("cleaneraction");
		if (cleaneraction != "cleaning" && cleaneraction != "noClean" && cleaneraction != "done"){
			var answer = confirm ("Do you want to FOR EVER DELETE ***ALL*** you facebook wall entries?")
			if (answer){
				GM_setValue("cleaneraction","cleaning");
				cleaneraction = "cleaning";
			}
		}
		if (cleaneraction == "cleaning"){	
			var myDiv = document.createElement('div');
			myDiv.innerHTML = noticeDiv; 
			document.body.appendChild(myDiv);
			// looking for  <abbr>Aug 17, 2011</abbr> to start next page load at that date
			var strgSrch = document.body.innerHTML.indexOf("<abbr>");
			if (strgSrch != -1){
				var date = document.body.innerHTML.substr(document.body.innerHTML.indexOf("<abbr>")+6,12);
				// converting to epoch
				// var date = "Aug 20, 2011"; // Aug 1, 2011
				var day = date.substr(date.indexOf(",")-2,2);
				var year = date.substr(date.indexOf(",")+2,4);
				var month = date.substr(0,3);
				// alert ("y"+year+"m"+month+"d"+day+".date:"+date);
				if (!(isNaN(year))){
					if (month == "Jan") {month = 0};if (month == "Feb") {month = 1};if (month == "Mar") {month = 2};if (month == "Apr") {month = 3};if (month == "May") {month = 4};if (month == "Jun") {month = 5};if (month == "Jul") {month = 6};if (month == "Aug") {month = 7};if (month == "Sep") {month = 8};if (month == "Oct") {month = 9};if (month == "Nov") {month = 10};if (month == "Dec") {month = 11};
					var humanDate = new Date(Date.UTC(year,month,day,0,0,0));
					var ourEpochHu = ((humanDate.getTime()/1000.0)+3600);
					GM_setValue("cleanerDate",ourEpochHu);	
				}
			}
			else {
				// checking current window time
				var thisEpoch = window.location.search;
				thisEpoch = thisEpoch.substr(thisEpoch.indexOf("?time=")+6,10);
				if (isNaN(thisEpoch)){
					// ourEpoch = ((getTime()/1000.0)+3600);
					GM_setValue("cleaner",ourEpoch);
				}
				else{
					GM_setValue("cleaner",thisEpoch);
				}
			}
			var TargetLink = $("a:contains('Remove')");
			if (TargetLink  &&  TargetLink.length) {
				window.location.href = TargetLink[0].href;
			}
			// else there is no 'remove' option on the page, we'll go to the wall.php
			else{
				var epochVal = GM_getValue("cleaner",ourEpoch)+ran;
				// Stop after reaching reaching 2010 where apparantly there is no more mobile feed available 1291161600 (or edit for 2004 (1072915200)).
				if (epochVal>=1291161600){ // if (epochVal>=1326054358){ // debug 2012 stop
					var nextLoc = GM_getValue("cleaner");
					window.location.href = window.location.href = "http://m.facebook.com/wall.php?time="+nextLoc+"&refid=0";
				}
			}
			// if looking for  <abbr>Aug xx, 20yy</abbr> to start next page load at that date does not exist we'll pull that from the GM_getValue("cleaner","http://m.facebook.com/wall.php?time="+ourEpoch+"&refid=0")  if it is there
			if  (strgSrch == -1){
				// add some randomness to the requested times not to cause too much caching
				var ran = Math.random();
				ran = parseInt(ran*1000);
				// month 2629743, week 604800 
				var epochVal = GM_getValue("cleaner",ourEpoch)-604800 +ran;
				// start walking the site, 7 days at a time 604800 sec or 30 days at a time, 1 month, approx 30.44 days, 2629743 seconds. Stop after reaching reaching 2010 where apparantly there is no more mobile feed available 1291161600 (or edit for 2004 (1072915200)).
				if (epochVal>=1291161600){ // if (epochVal>=1326054358){ // debug 2012 stop
					window.location.href = "http://m.facebook.com/wall.php?time="+epochVal+"&refid=0";
				}
				else {
					// no wall posts to remove setting status to "done"
					cleaneraction = "done";
					GM_setValue("cleaneraction", "done");
					var myDoneDiv = document.createElement('doDiv');
					myDoneDiv.innerHTML = doneDiv; 
					document.body.appendChild(myDoneDiv);
					alert ("--- No removable posts found. Program status set to \"done\" ---\n IMPORTANT: please turn off this script NOW, otherwise when you return to the mobile facebook page with it enabled all new posts will be wiped clear, too!!! \n\n\n To restart click on \"Home\" then on \"Wall\"");
				}
			}
			var epochYears = [[2013,1356998400],[2012,1325376000],[2011,1293840000],[2010,1262304000],[2009,1230768000],[2008,1199145600],[2007,1167609600],[2006,1136073600],[2005,1104537600],[2004,1072915200]];
			var epochLinks = 'Year &nbsp;Month<br>';
				// add some randomness to the requested times not to cause too much caching
				var ran = Math.random();
				ran = parseInt(ran*100000);
			for (var i=1;i<7;i++){
				epochLinks += epochYears[i][0]+' ';
				for (var j=0;j<12;j++){
					var epochMonth = ((epochYears[i][1])+j*2629743)+ran;
					(epochLinks = epochLinks+"<a href=\"http://m.facebook.com/wall.php?time="+epochMonth+"&filter=13&refid=20\">"+(j+1)+"</a> &nbsp;");
				}
				epochLinks += '<br>';
			}
			epochLinks += '<br>';
			// making time stamp human readable
			var thisEpoch = window.location.search;
			thisEpoch = thisEpoch.substr(thisEpoch.indexOf("?time=")+6,10);
			var thisTime = '';
			if (!isNaN(thisEpoch)){
				thisEpoch = thisEpoch*1000;
				thisTime = new Date(thisEpoch); 
				thisTime = 'Now working on:'+((thisTime.getMonth()+1)+'/'+thisTime.getDate()+'/'+thisTime.getFullYear());
			}
			var satusDivContent = '';
			if (cleaneraction == "done"){
				GM_setValue("cleaneraction", "done");
				satusDivContent = '<div id=\"statusD\" style=\"position:absolute; top:260px; left:20px; width:280px;  -moz-border-radius: 15px; border-radius: 15px;  border-width:8px; border-style:solid; border-color:#58983A; background-color:white; padding:2px; font-size:12px; font-family:Arial; z-index:3;\">go to:<br> '+epochLinks+' </div>';
			}
			else {
				satusDivContent = '<div id=\"statusD\" style=\"position:absolute; top:265px; left:400px; width:375px;  -moz-border-radius: 15px; border-radius: 15px;  border-width:8px; border-style:solid; border-color:#58983A; background-color:white; padding:5px; font-size:12px; font-family:Arial; z-index:3;\">'+thisTime+'<br> go to '+epochLinks+' </div>';
			}
			var myStatusDetail = document.createElement('statusDiv');
			myStatusDetail.innerHTML = satusDivContent; 
			document.body.appendChild(myStatusDetail);
		}
	}
}
