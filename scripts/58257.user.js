// ==UserScript==
// @name           Mafia Wars Facebook - Add Mafia Wars Links to Facebook profiles.
// @namespace      Facebook
// @description    Adds Mafia Wars specific links to the standard Facebook profile menu.
// @include        http://*.facebook.com/*
// @exclude        http://apps.facebook.com/*
// @exclude        http://www.facebook.com/*viewas*
// @date 20100522
// @time 1317
// @version 2010.05.22.1317
// ==/UserScript==
//
// Based on http://userscripts.org/scripts/show/55960 !!!
// updateScript function adapted from http://userscripts.org/scripts/show/43573 !!!
// HTML insertion of new link inspired by http://userscripts.org/scripts/show/48627 !!!
// --------------------------------------------------
//
// History
// 200909302339 - Update for FB change
// 200910011527 - More error catching
//		- Detect if on your own profile so it won't run because the send
//		  message link is not available on your own profile.
//		- Attempt to auto-update if error occurs, make it easier on users when
//		  Facebook changes things around.
// 200910032115 - Add my own menu entry instead of replacing one
//		- Display detected Facebook user ID.
//		- Not sure this is ready for prime time because I don't know why half the stuff I do actually works?!?!
// 200910140824 - Quickfix for FB changes.
// 200910201944 - Quickfix for FB changes.
// 200910232155 - Added Promote and Send Gift to menu and space at end of menu (strictly cosmetic).
// 200912092317 - Better user ID detection and fixed links.
// 200912102253 - Fix user ID detection, should cover own profile, friends and non-friends (hopefully).
// 200912111326 - Fix user ID detection on group/fan pages and fix profile link since Zynga insists on changing things on a daily basis.
// 201001222331 - Added "Add To Mafia" link to add individual users to own mob using war backdoor.
// 201003261955 - Changed the "Add To Mafia" Link so it will work even if you are not in New York.
// 201004161208 - Fix user ID detection on application pages (didn't think of that, thanks Sonar).
// 201005101634 - Disable script on "viewas" preview pages in privacy settings.
// 201005221317 - Quick fix for promote link not working.

var SCRIPT =
{
  home: "http://userscripts.org/scripts/show/58257",
  url: "http://userscripts.org/scripts/source/58257.user.js",
  date: '20100510',
  time: '1634',
  errors: 0,
  Interval: 0
}

window.addEventListener("load", function ()
{
	addMWLink();
	SCRIPT.Interval = setInterval(function (){addMWLink()}, 2500);
}	
,true);



function addMWLink()
{
	if(!document.getElementById("FBUserID"))
	{
                //The link to the mafia profile
		//http://apps.facebook.com/inthemafia/track.php?next_controller=stats&next_action=view&next_params=%7B%22user%22%3A%221373851008%3D%3D%22%7D
		//var MobProfile = "http://apps.facebook.com/inthemafia/remote/html_server.php?xw_controller=stats&xw_action=view&user=";
		//var MobProfile = "http://apps.facebook.com/inthemafia/track.php?next_controller=stats&next_action=view&next_params=%7B%22user%22%3A%22USER_ID%3D%3D%22%7D";
		var MobProfile = "http://apps.facebook.com/inthemafia/profile.php?id=%7B%22user%22%3A%22BASE64USER_ID%22%7D";
                //var MobPromote = "http://apps.facebook.com/inthemafia/remote/html_server.php?xw_controller=group&xw_action=view&promote=yes&uid=USER_ID";
		var MobPromote = "http://apps.facebook.com/inthemafia/track.php?next_controller=group&next_action=view&next_params=%7B%22promote%22%3A%22yes%22%2C%22pid%22%3A%22USER_ID%22%7D";
                //var MobPromote = "http://mwfb.zynga.com/mwfb/remote/html_server.php?xw_controller=group&xw_action=view&promote=yes&uid=USER_ID";
                //var MobGift =    "http://apps.facebook.com/inthemafia/remote/html_server.php?xw_controller=gift&xw_action=view&target_id=USER_ID";
                //var MobGift = "http://mwfb.zynga.com/mwfb/remote/html_server.php?xw_controller=gift&xw_action=view&target_id=USER_ID"
                var MobGift = "http://apps.facebook.com/inthemafia/track.php?next_controller=gift&next_action=view&next_params=%7B%22target_id%22%3A%22USER_ID%22%7D";
                //var MobAdd = "http://mwfb.zynga.com/mwfb/remote/html_server.php?skip_req_frame=1&xw_controller=war&xw_action=add&xw_city=1&friend_id=
		var MobAdd1 = 'http://apps.facebook.com/inthemafia/index.php?next_params=';
		var MobAdd2 = 'a:3:{i:0;s:3:"war";i:1;s:3:"add";i:2;s:CMDLEN:"';
		//var MobAdd3 = '&xw_city=1&friend_id=USER_ID";}';
		var MobAdd3 = '&friend_id=USER_ID";}'; 		
		var MobAdd4 = '&_fb_q=1&_fb_qsub=apps.facebook.com';
		var MobAdd = "";
                
		// Check to see if we are on a wall of some sort, not a feed
		if(!document.getElementById("profile_top_bar"))
		{
    			//GM_log("Not on a wall, leaving.");
    			return;
    		}

		try
                {       //Get the left column element (if it's not there, FB either changed something or we're not on a profile).
                        var leftColumn = document.getElementById("left_column");
                        if(leftColumn)
                        {
        		 	var columnHTML = leftColumn.innerHTML;
        		 	var userID = "0";

				// Check for preview page
				GM_log("Checking for preview page");
				if(columnHTML.indexOf('"Preview" mode') != -1)
				{
					GM_log("Detected preview page, outta here");
					return;
				}
				else
				{
        				// Check for fan page
        				GM_log("Checking for fan page");
        				if(columnHTML.indexOf("Remove Me from Fans") != -1 || columnHTML.indexOf("Report Page") != -1)
        				{
        					GM_log("Detected fan page, outta here");
        					return;
        				}
        				else
        				{
                				// Check for group page
                				GM_log("Checking for group page");
                				if(columnHTML.indexOf("Report Group") != -1)
                				{
                					GM_log("Detected group page, outta here");
                					return;
                				}
        					else
        					{
        						// Check for application page
                        				GM_log("Checking for application page");
                        				if(columnHTML.indexOf("Report Application") != -1)
                        				{
                        					GM_log("Detected application page, outta here");
                        					return;
                        				}
                					else
                					{
                                				// Get User ID from Facebook
                                        			// For non-friends, get user ID from report/block link
                                				GM_log("Checking non-friend");
                                        			if(columnHTML.indexOf("report.php") != -1)
                                        			{
                                        				GM_log("Retrieving non-friend");
                                        				userID = columnHTML.split('report.php?')[1].split('rid=')[1].split('&')[0];
                                				}
                                				else
                                				{
                                                			// For friends, use the remove as friend link
                                                			GM_log("Checking friend");
                                                			if(columnHTML.indexOf('removefriendconfirm.php') != -1)
                                                			{
                                						GM_log("Retrieving friend");
                                                				userID = columnHTML.split("removefriendconfirm.php?uid=")[1].split('"')[0];
                                        	        		}
                                        	        		else
                                        	        		{
                                        	        			// Check for own profile
                                	                			GM_log("Checking own");        	        			
                                        	        			if(columnHTML.indexOf('Edit My Profile') != -1)
                                        	        			{
                                                	        			GM_log("Retrieving own profile");
                                                	        			userID = columnHTML.split('album.php?profile=1&amp;id=')[1].split('"')[0];
                                                	        		}
                                                	        		else
                                                	        		{
                                							// If we get here, either Facebook changed something or the page isn't fully loaded yet.
                                							// Either way, we need to exit.
                                
                                							GM_log("Unable to detect any page type. Possibly page is not fully loaded yet. Try again... ");
                                							
                                							// Increase error counter by 1
                                							SCRIPT.errors += 1;
                									
                									// If that error occured over 10 times, something has change, so alert user
                									if(SCRIPT.errors == 10)
                									{
                										throw "DetectionErrors";
                									}
                									
                                							return;
                                                	        		}
                                                			}
                                                		}
                                        		}
                                        	}
                                        }
                		}
        			// Should have proper ID here, if not, something changed
        			if(!isNaN(parseInt(userID)))
        			{
					// Get AddToMob URL ready
					//***********************
                              	        // Put user ID in command
                              	        MobAdd = MobAdd3.replace('USER_ID',userID);
                              	        // Add length of command
                              	        MobAdd = MobAdd2.replace('CMDLEN',(MobAdd.length - 3).toString()) + MobAdd;
                              	        // Encode the URL
                              	        MobAdd = MobAdd1 + Base64.encode(MobAdd) + MobAdd4;

        				// Add Mafia Wars menu items to Facebook menu
        				//*******************************************
        				leftColumn.innerHTML = leftColumn.innerHTML.replace("<div class="+String.fromCharCode(34)+"profile_actions"+String.fromCharCode(34)+">",
        					// Divider
        					"<div class='profile_actions'>"+			
        					// Goto Profile link
        					"<a id='mafia_wars_links' class=' profile_action actionspro_a' href=" + MobProfile.replace("BASE64USER_ID",Base64.encode(userID)) + " target='_blank'>Mafia Wars: Show Profile</a>" +
        					// Send Gift Link
        					"<a id='mafia_wars_links' class=' profile_action actionspro_a' href=" + MobGift.replace("USER_ID",userID) + " target='_blank'>Mafia Wars: Send Gift</a>" +
        					// Promote Link
						"<a class=' profile_action actionspro_a' href=" + MobPromote.replace("USER_ID",userID) + " target='_blank'>Mafia Wars: Promote</a>" +
						// Add To Mafia Link
						"<a class=' profile_action actionspro_a' href=" + MobAdd + " target='_blank'>Mafia Wars: Add To Mafia</a>" +        						
						// Put some space between me and the rest ;)
						"</div><div style='border-bottom: 1px solid #D8DFEA'></div><div class='profile_actions'>");
        				// Check if link installed properly
        				if(!document.getElementById("mafia_wars_links"))
        				{
        					throw "BadHMTL";
        				}
       
        				// Display detected Facebook user ID underneath profile picture
        				//************************************************************
        				var pageletLeftColumn = document.getElementById("pagelet_left_column")
        				if(pageletLeftColumn)
        				{
        					pageletLeftColumn.innerHTML = pageletLeftColumn.innerHTML.replace('<div class="profile_actions">',"<div id='FBUserID' style='text-align:center; padding: 3px 8px; border-bottom: 1px solid #D8DFEA'>User ID: <B>"+userID+"</B></div><div class='profile_actions'>");
						// Check if it inserter properly
                				if(!document.getElementById("FBUserID"))
                				{
                					throw "BadHMTL";
                				}
                				else
                				{
                					// Success, so reset error counter since it may just be a fluke that caused an error earlier.
                					SCRIPT.errors = 0;
                				}
        				}
        				else
        				{
        					throw "BadpageletLeftColumnTag";
        				}
                                }
                                else
                                {
                                	throw "BadUserID";
                                }
         		}
        		else
        		{
      				// If we get here, either Facebook changed something or the page isn't fully loaded yet.
      				// Either way, we need to exit.

      				GM_log("Unable to find left column. Try again... ");
      				
      				// Increase error counter by 1
      				SCRIPT.errors += 1;
      				
      				// If that error occured over 10 times, something has change, so alert user
      				if(SCRIPT.errors == 10)
      				{
      					throw "DetectionErrors";
      				}
      				
      				return;
        		}
        	}
        	// Catch if anything went wrong
                catch(err)
                {
      			// Disable timer
                        clearInterval(SCRIPT.Interval);

			// ultra lame way of preventing the script from bugging the user more than once...
			document.body.innerHTML = "<div id='FBUserID'></div>" + document.body.innerHTML;

                    	// Brief user
                    	var answer = confirm('Unable to find user ID or insert menu link.\n\nFacebook probably changed something and an updated script might fix that. Do you want to check for an update?');
                    	if(answer)
                    	{
                    		updateScript();
                    	}
                    	else
                    	{
                    		alert('Since this script will no longer work and you do not want to update, you should deactivate this script to prevent further messages!');
                    	}
      		}
        }
}


function updateScript()
{
	try
	{
		if (!GM_getValue)
		{
			return;
		}

		GM_xmlhttpRequest(
		{
        		method: 'GET',
        		url: SCRIPT.url + '?source',
        		onload: function(result)
        		{
        			if (result.status != 200 || !result.responseText.match(/@time\s+([\d.]+)/))        			
        			{
        				alert('Unknown answer received while checking for update!\n\nTaking you to ' + SCRIPT.home + ' so you can download the newer script.');
        				window.location.href = SCRIPT.home;
        				return;
        			}
        		        var theOtherTime = parseInt(RegExp.$1);
        		        var runningTime = parseInt(SCRIPT.time);
        		        var theOtherDate = parseInt(result.responseText.match(/@date\s+([\d.]+)/)? RegExp.$1 : '');
        		        if (theOtherTime > runningTime && theOtherDate >= parseInt(SCRIPT.date))
        		        {
        				if (window.confirm('Version ' + theOtherDate + ' build ' + theOtherTime + ' is available!\n\n' + 'Do you want to upgrade?' + '\n'))
        				{
        					window.location.href = SCRIPT.url;
        				}
        			}
        			else
        			{
        				alert('You already have the latest version.');
        				return;
        		        }
        		}
		}
		);
	}
	catch (err)
	{
        	alert('Unknown problem occured while checking for update!\n\nTaking you to ' + SCRIPT.home + ' so you can download the newer script.');
		window.location.href = SCRIPT.home;
	} 
}


/**
*
*  Base64 encode / decode
*  http://www.webtoolkit.info/
*
**/
 
var Base64 = {
 
	// private property
	_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
 
	// public method for encoding
	encode : function (input) {
		var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;
 
		input = Base64._utf8_encode(input);
 
		while (i < input.length) {
 
			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);
 
			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;
 
			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}
 
			output = output +
			this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
			this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
 
		}
 
		return output;
	},
 
	// public method for decoding
	decode : function (input) {
		var output = "";
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;
 
		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
 
		while (i < input.length) {
 
			enc1 = this._keyStr.indexOf(input.charAt(i++));
			enc2 = this._keyStr.indexOf(input.charAt(i++));
			enc3 = this._keyStr.indexOf(input.charAt(i++));
			enc4 = this._keyStr.indexOf(input.charAt(i++));
 
			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;
 
			output = output + String.fromCharCode(chr1);
 
			if (enc3 != 64) {
				output = output + String.fromCharCode(chr2);
			}
			if (enc4 != 64) {
				output = output + String.fromCharCode(chr3);
			}
 
		}
 
		output = Base64._utf8_decode(output);
 
		return output;
 
	},
 
	// private method for UTF-8 encoding
	_utf8_encode : function (string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";
 
		for (var n = 0; n < string.length; n++) {
 
			var c = string.charCodeAt(n);
 
			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}
 
		}
 
		return utftext;
	},
 
	// private method for UTF-8 decoding
	_utf8_decode : function (utftext) {
		var string = "";
		var i = 0;
		var c = c1 = c2 = 0;
 
		while ( i < utftext.length ) {
 
			c = utftext.charCodeAt(i);
 
			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			}
			else if((c > 191) && (c < 224)) {
				c2 = utftext.charCodeAt(i+1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			}
			else {
				c2 = utftext.charCodeAt(i+1);
				c3 = utftext.charCodeAt(i+2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}
 
		}
 
		return string;
	}
 
}