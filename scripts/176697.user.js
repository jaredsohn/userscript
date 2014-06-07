// ==UserScript==
// @name           Breakup Alert
// @namespace      http://www.pc-gizmos.com
// @description    Facebook Breakup Alert
// @include        htt*://*.facebook.com/*
// @match          http://*.facebook.com/*
// @match          https://*.facebook.com/*
// @version        1
// @encoding       UTF-8
// @exclude        htt*://*static*.facebook.com*
// @exclude        htt*://*channel*.facebook.com*
// @exclude        htt*://developers.facebook.com/*
// @exclude        htt*://upload.facebook.com/*
// @exclude        htt*://*onnect.facebook.com/*
// @exclude        htt*://*acebook.com/connect*
// @exclude        htt*://*.facebook.com/plugins/*
// @exclude        htt*://*.facebook.com/l.php*
// @exclude        htt*://*.facebook.com/ai.php*
// @exclude        htt*://*.facebook.com/extern/*
// @exclude        htt*://*.facebook.com/pagelet/*
// @exclude        htt*://api.facebook.com/static/*
// @exclude        htt*://*.facebook.com/contact_importer/*
// @exclude        htt*://*.facebook.com/ajax/*
// @exclude        htt*://www.facebook.com/places/map*_iframe.php*
// @version        1.0.270813
// @howto_img_url  http://files.pc-gizmos.com/scripts/176697.png

// ==/UserScript==
//-----------------------------------------------------------------------
//-----------------------------------------------------------------------
var FBS_debug_savedHour = 0;
var FBS_debug_randNotification = 0;
//-----------------------------------------------------------------------
var FBS_CurFbUser=""; // global
//-----------------------------------------------------------------------
function FBS_getRandomInt (min, max) 
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
//-----------------------------------------------------------------------
function FBS_drawGuiAgain()
{
	FBS_drawMonitoredUsers();
	FBS_addNavBar();
}
//-----------------------------------------------------------------------
function FBS_clearSavedDeletedUsers()
{
	PCG_cookieMonster.save(FBS_CurFbUser,"FBS_Arr_MonitoredUsers_str","",undefined,"/");
	FBS_drawGuiAgain();
}
//-----------------------------------------------------------------------
function FBS_checkIfUserIdExistInStorage(curUserId)
{
	var FBS_Arr_MonitoredUsers_str = PCG_cookieMonster.load(FBS_CurFbUser,'FBS_Arr_MonitoredUsers_str');
		
	if(!FBS_Arr_MonitoredUsers_str||FBS_Arr_MonitoredUsers_str=="")
		return false;
	
	var FBS_Arr_MonitoredUsers = JSON.parse(FBS_Arr_MonitoredUsers_str);
					
	if (curUserId in FBS_Arr_MonitoredUsers)		
	{					
		return true;		
	}
	else
	{
		return false;
	}
}
//-----------------------------------------------------------------------
function FBS_removeUserIdFromStorage(curUserId)
{
	var FBS_Arr_MonitoredUsers_str = PCG_cookieMonster.load(FBS_CurFbUser,'FBS_Arr_MonitoredUsers_str');
		
	if(!FBS_Arr_MonitoredUsers_str||FBS_Arr_MonitoredUsers_str=="")
		return ;
	
	var FBS_Arr_MonitoredUsers = JSON.parse(FBS_Arr_MonitoredUsers_str);
				
	delete FBS_Arr_MonitoredUsers[curUserId];				
	
	PCG_cookieMonster.save(FBS_CurFbUser,'FBS_Arr_MonitoredUsers_str',JSON.stringify(FBS_Arr_MonitoredUsers),undefined,"/");
}
//-----------------------------------------------------------------------
function FBS_getCurrentFbUser()
{
	//var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;	
	if(!document.cookie)
		return "";
	var user_id_arr = document.cookie.match(/c_user=(\d+)/);
	if(!user_id_arr||user_id_arr.length<1)
		return "";
	var user_id = document.cookie.match(user_id_arr[1]);
	return user_id;
}
//-----------------------------------------------------------------------
FBS_Enum1 = {
    NOT_RIGHT_PAGE : 0,
    PLEASE_RETRY : 1,
    OK : 2
}
//-----------------------------------------------------------------------
function FBS_aboutPageButton_watchdog()
{
	var ret = FBS_addStatusChangeButtonOnAboutPage();	
	if(FBS_aboutPageButton_retries && ret==FBS_Enum1.PLEASE_RETRY)
	{
		FBS_aboutPageButton_retries--;
		GM_log("FBS_aboutPageButton_watchdog():FBS_aboutPageButton_retries="+FBS_aboutPageButton_retries);
		setTimeout("FBS_aboutPageButton_watchdog()", 1000);
	}
	return;
}
//-----------------------------------------------------------------------
function FBS_addStatusChangeButtonOnAboutPage()
{
	if( location.href.indexOf("/about") == -1   &&
		location.href.indexOf("sk=about") == -1    )
		return FBS_Enum1.NOT_RIGHT_PAGE;
	
	var FBS_AddStatusChangeUserId = document.getElementById("FBS_AddStatusChangeUserId");
	if(FBS_AddStatusChangeUserId)
	{
		GM_log("FBS_AddStatusChangeUserId already existed");
		return;
	}
	var pageTitle = document.getElementById("pageTitle");
	if(!pageTitle)
		return FBS_Enum1.PLEASE_RETRY;
		
	var userName = pageTitle.innerHTML;
	if(!userName||userName=="")
		return FBS_Enum1.PLEASE_RETRY;
		
	userName_sog_pos = userName.indexOf(")");
	if(userName_sog_pos!=-1)
	{
		userName = userName.substring(userName_sog_pos+2);
	}
	if(!userName||userName=="")
		return FBS_Enum1.PLEASE_RETRY;
		
	userName = escape(userName);
	//userName = userName.replace(/'/g, "").replace(/"/g, ""); // kill '/"	
	//userName = userName.replace(/^[\u0080-\uffff]/g, ""); // kill non-ascii-chars
	//userName = userName.replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~\']*/g, '') ; 
	
	var pagelet = document.getElementById("pagelet_timeline_main_column");
	if(!pagelet)
		return FBS_Enum1.PLEASE_RETRY;
	
	var data_gt = pagelet.getAttribute("data-gt");
	if(!data_gt||data_gt=="")
		return FBS_Enum1.PLEASE_RETRY;
	
	var data_gt_obj = JSON.parse(data_gt);
	if(!data_gt_obj)
		return FBS_Enum1.PLEASE_RETRY;
	
	var curAboutPageUserId = data_gt_obj.profile_owner;
	if ( typeof(curAboutPageUserId) == "undefined" )
		return FBS_Enum1.PLEASE_RETRY;
	
	GM_log("curAboutPageUserId="+curAboutPageUserId+",userName="+userName);
	
	var pagelet_basic = document.getElementById("pagelet_basic");
	if(!pagelet_basic)
		return FBS_Enum1.PLEASE_RETRY;
		
	if(!pagelet_basic.firstChild)
		return FBS_Enum1.PLEASE_RETRY;
	
	var rel_status = FBS_parseRelationshipStatusFromHTML(pagelet_basic.innerHTML);
	if(rel_status=="")
		return FBS_Enum1.PLEASE_RETRY;
		
	var div = document.createElement("div");
	div.setAttribute("id","FBS_AddStatusChangeUserId");
		
	var existedUserInStorage = FBS_checkIfUserIdExistInStorage(curAboutPageUserId);
	if(existedUserInStorage)
	{
		div.innerHTML = '<a class="uiButton uiButtonOverlay uiButtonLarge" style="background-color:'+"gray"+'" onClick="FBS_removeUserIdFromStorage(\'' + curAboutPageUserId + '\');window.location.reload();" ><span class="uiButtonText" style="color:white;font-weight:normal;" >Remove Breakup Alert Notification</span></a>';	
	}
	else
	{
		div.innerHTML = '<a class="uiButton uiButtonOverlay uiButtonLarge" style="background-color:'+"#425F9C"+'" onClick="FBS_addUserToMonitoring(\'' + curAboutPageUserId + '\',\'' + userName + '\',\'' + rel_status + '\');window.location.reload();" ><span class="uiButtonText" style="color:white;font-weight:normal;" >Add Breakup Alert Notification</span></a>';
	}
	pagelet_basic.firstChild.appendChild(div);
	
	return FBS_Enum1.OK;
}
//-----------------------------------------------------------------------
function FBS_addUserToMonitoring(userId,userName,rel_status)
{
	GM_log("FBS_addUserToMonitoring:userId="+userId+",rel_status="+rel_status);
	
	var FBS_Arr_MonitoredUsers_str = PCG_cookieMonster.load(FBS_CurFbUser,'FBS_Arr_MonitoredUsers_str');
		
	if(!FBS_Arr_MonitoredUsers_str||FBS_Arr_MonitoredUsers_str=="")
		FBS_Arr_MonitoredUsers={};
	else
		FBS_Arr_MonitoredUsers = JSON.parse(FBS_Arr_MonitoredUsers_str);
	
	FBS_Arr_MonitoredUsers[userId] = {};
	FBS_Arr_MonitoredUsers[userId]["user_name"] = userName;
	FBS_Arr_MonitoredUsers[userId]["rel_status"] = rel_status;
	FBS_Arr_MonitoredUsers[userId]["triggered"] = 0;
		
	PCG_cookieMonster.save(FBS_CurFbUser,'FBS_Arr_MonitoredUsers_str',JSON.stringify(FBS_Arr_MonitoredUsers),undefined,"/");
}
//-----------------------------------------------------------------------
function FBS_setExistingUserNewRelStatusAndTriggered(userId,rel_status)
{
	GM_log("FBS_setExistingUserNewStatus:userId="+userId+",rel_status="+rel_status);
	
	var FBS_Arr_MonitoredUsers_str = PCG_cookieMonster.load(FBS_CurFbUser,'FBS_Arr_MonitoredUsers_str');
		
	if(!FBS_Arr_MonitoredUsers_str||FBS_Arr_MonitoredUsers_str=="")
		return;
	
	FBS_Arr_MonitoredUsers = JSON.parse(FBS_Arr_MonitoredUsers_str);
	
	FBS_Arr_MonitoredUsers[userId]["rel_status"] = rel_status;
	FBS_Arr_MonitoredUsers[userId]["triggered"] = 1;
		
	PCG_cookieMonster.save(FBS_CurFbUser,'FBS_Arr_MonitoredUsers_str',JSON.stringify(FBS_Arr_MonitoredUsers),undefined,"/");
}
//-----------------------------------------------------------------------
function FBS_deleteNotificationFromExistingUserId(userId)
{
	GM_log("FBS_deleteNotificationFromExistingUserId:userId="+userId);
	
	var FBS_Arr_MonitoredUsers_str = PCG_cookieMonster.load(FBS_CurFbUser,'FBS_Arr_MonitoredUsers_str');
		
	if(!FBS_Arr_MonitoredUsers_str||FBS_Arr_MonitoredUsers_str=="")
		return;
	
	FBS_Arr_MonitoredUsers = JSON.parse(FBS_Arr_MonitoredUsers_str);
	
	FBS_Arr_MonitoredUsers[userId]["triggered"] = 0;
		
	PCG_cookieMonster.save(FBS_CurFbUser,'FBS_Arr_MonitoredUsers_str',JSON.stringify(FBS_Arr_MonitoredUsers),undefined,"/");
}
//-----------------------------------------------------------------------
function FBS_parseRelationshipStatusFromHTML(html_str)
{
	var rel_status="";
	var rel_pos = html_str.indexOf("Relationship Status");
	if(rel_pos!=-1)
	{
		var buf1 = html_str.substring(rel_pos+19);
		end_rel_pos = buf1.indexOf("</td>");
		if(end_rel_pos!=-1)
		{
			var buf2 = buf1.substring(0,end_rel_pos);
			//GM_log("buf2="+buf2);
			var regex = /(<([^>]+)>)/ig ;
			rel_status = buf2.replace(regex, "");
			//GM_log("rel_status="+rel_status);
		}
	}
	return rel_status;
}
//-----------------------------------------------------------------------
function FBS_CheckIfAllUsersChangedTheirRelStatus()
{
	var FBS_Arr_MonitoredUsers_str = PCG_cookieMonster.load(FBS_CurFbUser,'FBS_Arr_MonitoredUsers_str');
			
	if (FBS_Arr_MonitoredUsers_str && FBS_Arr_MonitoredUsers_str!="")
	{	
		var FBS_Arr_MonitoredUsers = JSON.parse(FBS_Arr_MonitoredUsers_str);
		
		for (var userId in FBS_Arr_MonitoredUsers)		
		{			
			if(FBS_Arr_MonitoredUsers[userId]=="")
				continue;		
			if(!FBS_Arr_MonitoredUsers[userId]["triggered"])
			{
				FBS_CheckIfOneUserChangedHisRelStatus(
						userId,FBS_Arr_MonitoredUsers[userId]["rel_status"]);
			}
		}		
	}	
}
//-----------------------------------------------------------------------
function FBS_CheckIfOneUserChangedHisRelStatus(userId,rel_status)
{
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function () 
	{
		if(xmlhttp.readyState == 4)
		{			
			var cur_rel_status = FBS_parseRelationshipStatusFromHTML(xmlhttp.responseText);
			if(cur_rel_status!="")
			{
				if(FBS_debug_randNotification)
				{
					var rand = FBS_getRandomInt(1,4);
					if(rand==3)
					{			
						cur_rel_status = cur_rel_status + "_rand" + FBS_getRandomInt(1,10);
					}
				}
				GM_log("FBS_CheckIfOneUserChangedHisRelStatus():userId="+userId+",rel_status="+rel_status+",cur_rel_status="+cur_rel_status);
				if(cur_rel_status != rel_status)
				{			
					FBS_setExistingUserNewRelStatusAndTriggered(userId,cur_rel_status);
					FBS_addNavBar();
				}
			}
		}

	};

	var user_id = FBS_getCurrentFbUser();
	if(user_id=="")
		return;

	var params = "&filter[0]=user";
	params += "&options[0]=friends_only";
	params += "&options[1]=nm";
	params += "&token=v7";
	params += "&viewer=" + user_id;
	params += "&__user=" + user_id;

	var http = "http";
	if (document.URL.indexOf("https://") >= 0) 
		http = "https";
	
	
	xmlhttp.open("GET", http + "://www.facebook.com" + "/profile.php?id="+userId+"&sk=about"+ params, true); 
	
	//xmlhttp.open("GET", http + "://www.facebook.com" + "/ajax/"+"typeahead/"+"first_degree.php"+"?__a=1" + params, true); 
	
	xmlhttp.send();
}
//-----------------------------------------------------------------------
function FBS_addNavBar()
{
	var numOfDeletedUsers = 0;
	var FBS_Arr_MonitoredUsers_str = PCG_cookieMonster.load(FBS_CurFbUser,'FBS_Arr_MonitoredUsers_str');
			
	if (FBS_Arr_MonitoredUsers_str && FBS_Arr_MonitoredUsers_str!="")
	{	
		var FBS_Arr_MonitoredUsers = JSON.parse(FBS_Arr_MonitoredUsers_str);
		for (var userId in FBS_Arr_MonitoredUsers)		
		{			
			if(FBS_Arr_MonitoredUsers[userId]=="")
				continue;		
			if(FBS_Arr_MonitoredUsers[userId]["triggered"])
				numOfDeletedUsers++;
		}		
	}
	
	FBS_addNotificationBar(numOfDeletedUsers);
	
	var FBS_countOfDeletedUsers = document.getElementById("FBS_countOfDeletedUsers");
	if(FBS_countOfDeletedUsers)
	{
		if(numOfDeletedUsers==0)
		{			
			FBS_countOfDeletedUsers.parentNode.style.display = "none";
		}
		else
		{
			FBS_countOfDeletedUsers.innerHTML = numOfDeletedUsers;
			FBS_countOfDeletedUsers.parentNode.style.display = "";			
		}
		return;
	}
	var style = "";
	if(numOfDeletedUsers==0)			
		style='style="display:none"';
	
	var html = ' \
	<li class="sideNavItem stat_elem "  id=""> \
	<div class="buttonWrap"> \
	</div> \
	<a id="FBS_navBar" class="item clearfix sortableItem" style="background-color:rgb(252, 245, 244)" href="" onclick="FBS_drawMonitoredUsers();return false;" title="Breakup Alert" > \
		<div class="rfloat"> \
			<img class="uiLoadingIndicatorAsync img" src="https://fbstatic-a.akamaihd.net/rsrc.php/v2/yb/r/GsNJNwuI-UM.gif" alt="" width="16" height="11"> \
			<span class="count uiSideNavCount" '+style+' > \
				<span id="FBS_countOfDeletedUsers" class="countValue fss">'+numOfDeletedUsers+'</span> \
				<span class="maxCountIndicator"></span> \
			</span> \
			<span class="grip"></span> \
		</div> \
		<div> \
			<span class="imgWrap"> \
				<i class="img" style="background-image: url(https://fbstatic-a.akamaihd.net/rsrc.php/v2/y-/r/C4N9eCQc_fR.png);background-size: auto;background-repeat: no-repeat;display: inline-block;height: 16px;width: 16px;background-position: 0 -787px;"></i> \
			</span> \
			<div class="linkWrap hasCount" style="font-weight: bold;">Breakup Alert</div> \
		</div> \
	</a> \
	<span class="mover hidden_elem"></span> \
	</li> ';
	
	var uiSideNav = document.getElementsByClassName("uiSideNav");
	if(uiSideNav&&uiSideNav.length>0)
	{
		uiSideNav[0].innerHTML = uiSideNav[0].innerHTML + html;
	}
}
//-----------------------------------------------------------------------
function FBS_addNotificationBar(count)
{
	var notificationsCountValue_FBS = document.getElementById("notificationsCountValue_FBS");
	if(notificationsCountValue_FBS)
	{
		if(count==0)
		{			
			notificationsCountValue_FBS.parentNode.style.display = "none";
		}
		else
		{
			notificationsCountValue_FBS.innerHTML = count;
			notificationsCountValue_FBS.parentNode.style.display = "";			
		}	
		return;
	}

	var jewelContainer = document.getElementById("jewelContainer");
	if(!jewelContainer)
		return;
	
	var style = "";
	if(count==0)			
		style='style="display:none"';
	
	var div = document.createElement("div");
	div.setAttribute("id","FBS_NotificationDiv");
	div.setAttribute("class","uiToggle fbJewel hasCountSmall hasNew");
	div.setAttribute("style","background-size: 25px 25px;background-image: url(data:image/png;base64,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); background-repeat:no-repeat");	
	div.innerHTML = ' <a  onclick="FBS_drawMonitoredUsers();return false;" name="notifications_FBS" href="#"   style="display: block;height: 31px;position: relative;text-decoration: none;margin: 0 1px;width: 24px;" > \
						<span id="notificationsCountWrapper_FBS" class="jewelCount" '+style+'> \
							<span  id="notificationsCountValue_FBS">'+count+'</span> \
						</span> \
					  </a> ';
	jewelContainer.appendChild(div);
}
//-----------------------------------------------------------------------
function FBS_drawMonitoredUsers()
{
	var contentArea = document.getElementById("contentArea");
	if(!contentArea)
	{
		setTimeout("FBS_drawMonitoredUsers()", 1000);	
		return;
	}
	
var html_header = ' \
<div id="contentArea" role="main" aria-describedby="pageTitle"> \
	<div id="pagelet_friends" data-referrer="pagelet_friends"> \
		\
		<div class="uiHeader uiHeaderWithImage uiHeaderPage"> \
			<div class="clearfix uiHeaderTop"> \
				<!--<div class="rfloat"> \
					<h2 class="accessible_elem">Friends</h2> \
					<a class="uiHeaderActions uiButton" onClick="FBS_clearSavedDeletedUsers();return false;" href="" role="button"> \
						<span class="uiButtonText">Clear All UnFriends Messages</span> \
					</a> \
				</div>--> \
				<div> \
					<h2 class="uiHeaderTitle" aria-hidden="true"> \
						<i class="uiHeaderImage img " style="background-image:url(https://fbstatic-a.akamaihd.net/rsrc.php/v2/y-/r/C4N9eCQc_fR.png);background-size:auto;background-repeat:no-repeat;display:inline-block;height:16px;width:16px;background-position: 0 -787px";></i> \
						Breakup Alert \
					</h2> \
				</div> \
			</div> \
		</div> \
		\
		<div id="content_inner" class="clearfix findfriends"> \
			<div id="importer_frame" class="new_ff"> \
				<div id="main_ff_container"> \
					<div id="new_ff"> \
						<div class="" style="margin-bottom: 20px;"> \
							<div class="uiHeader uiHeaderTopAndBottomBorder uiHeaderSection"> \
								<div class="clearfix uiHeaderTop"> \
									<div> \
										<h3 class="uiHeaderTitle">People that you monitor :</h3> \
									</div> \
								</div> \
							</div> \
							<div class="fbRequestList mbs"> \
								<ul class="uiList" style="padding-bottom: 10px;" > ';
		//----------------------
		var FBS_Arr_MonitoredUsers_str = PCG_cookieMonster.load(FBS_CurFbUser,'FBS_Arr_MonitoredUsers_str');
	
		var inner_html = "";
		if( !FBS_Arr_MonitoredUsers_str 	 || 
			FBS_Arr_MonitoredUsers_str=="" 	 || 
			FBS_Arr_MonitoredUsers_str=="{}"    )
		{
			inner_html = "<BR><BR><strong>You didn't add any users to monitor,<BR>"+
						 "please go to the user 'about' page and click on the 'add monitoring' button.</strong><BR><BR>";
		}
		else		
		{
			FBS_Arr_MonitoredUsers = JSON.parse(FBS_Arr_MonitoredUsers_str);
				
			for (var userId in FBS_Arr_MonitoredUsers)		
			{			
				if(FBS_Arr_MonitoredUsers[userId]=="")
					continue;
				
				if(FBS_Arr_MonitoredUsers[userId]["triggered"])
				{
					triggered_str = "<span style='color:red'>Status was changed to : "+FBS_Arr_MonitoredUsers[userId]["rel_status"]+"</span>";
					triggered_bg_color_str = "background-color: rgb(252, 245, 244)";
				}
				else
				{
					triggered_str = "<span style=''>Current Status is : "+FBS_Arr_MonitoredUsers[userId]["rel_status"]+"</span>";
					triggered_bg_color_str="";
				}
					
				inner_html =  inner_html + '<li class="objectListItem" id="" style="border-color: #e9e9e9;border-style: solid;border-width: 1px 0 0 0;'+triggered_bg_color_str+'" > \
										<div class="clearfix"> \
											<a class="lfloat" target="_blank" href="//facebook.com/profile.php?id='+userId+'" tabindex="-1" style="display: block;margin-right: 8px;"> \
												<img class="img" src="//graph.facebook.com/'+userId+'/picture" alt=""> \
											</a> \
											<div class="clearfix"> \
												<div class="rfloat"></div> \
												<div style="display:block;overflow:hidden;word-break: break-word">\
													<div> \
														<div> \
															<span class="" style="color: #333;font-weight: bold;font-size: 13px;"> \
																<a target="_blank" href="//facebook.com/profile.php?id='+userId+'&sk=about">'+unescape(FBS_Arr_MonitoredUsers[userId]["user_name"])+'</a> \
																<span style="float:right;font-weight:normal"><a onclick="FBS_removeUserIdFromStorage('+userId+');FBS_drawGuiAgain();">Don\'t monitor this user anymore</a></span>\
														        <div style="height:20px"> \
																</div>'+
																triggered_str+'<span style="float:right;font-weight:normal"><a  onclick="FBS_deleteNotificationFromExistingUserId('+userId+');FBS_drawGuiAgain();" title="Clear notification on Breakup Alert but still monitor this user ">Clear Notification</a></span>'+
															'</span> \
														</div> \
													</div> \
												</div> \
											</div> \
										</div> \
									</li>';
			}		
		}
		inner_html = inner_html + '<li class="objectListItem" id="" style="border-color: #e9e9e9;border-style: solid;border-width: 1px 0 0 0;"> </li> ';
		//-----------------------
	var html_footer = '			</ul> \
							</div> \
						</div> \
					</div> \
				</div> \
			</div> \
		</div> \
	</div> \
</div> ';
		//-----------------------
		var google_plus = '<g:plusone data-size="small" href="https://plus.google.com/114469834305807226647/posts" ></g:plusone>';
		var like_button = '<iframe src="//www.facebook.com/plugins/like.php?href=http%3A%2F%2Fdownload.cnet.com%2FFacebook-Unfriend-Finder%2F3000-12941_4-75940351.html&amp;send=false&amp;layout=button_count&amp;width=100&amp;show_faces=false&amp;action=like&amp;colorscheme=light&amp;font&amp;height=21&amp;appId=243212289037659" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:100px; height:21px;" allowTransparency="true"></iframe>';
		var share_html = "Breakup Alert is triggered once in an hour."+"<BR><BR>"+
						 "Please Share Breakup Alert:<BR><BR>"+ google_plus + like_button;
		//-----------------------
	
	contentArea.innerHTML = html_header + inner_html + html_footer + share_html;
	//-----------------------
	var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
	po.src = 'https://apis.google.com/js/plusone.js';
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
	//-----------------------
	
	PCG_GA_recordEvent_IncrementActions("FBS");
	PCG_GA_recordEvent_OpenUserMsg("FBS",
									{ // params									 									 
									 "scriptDesc":"Facebook Breakup Alert",
									 "google_plus":"https://plus.google.com/114469834305807226647/posts",
									 "fb_like_url":"http://download.cnet.com/Facebook-Unfriend-Finder/3000-12941_4-75940351.html"
									},
								    function(daysInstalled,numOfActions_Aggr,numOfUpdates,numOfRemindMeLater,numOfShareMsgPresented)
									{
										if( daysInstalled > 2		&& 
											numOfActions_Aggr > 2   &&
											numOfUpdates < 1  		&&
											numOfRemindMeLater < 4     )
										{
											return "update1";
										}										
										else if( daysInstalled > 6 		 && 
												 numOfActions_Aggr > 6   &&
												 numOfUpdates < 2  		 &&
												 numOfRemindMeLater < 4     )
										{
											return "update2";
										}
										else if( daysInstalled > 3 		 &&
												 numOfShareMsgPresented < 1 )
										{
											return "share1";
										}
										return "";
									}
									);	
}
//-----------------------------------------------------------------------
var FBS_getuser_retries=5;
var FBS_navbar_retries=7;
var FBS_aboutPageButton_retries=7;
//-----------------------------------------------------------------------
function FBS_addNavBar_watchdog()
{
	var FBS_navBar = document.getElementById("FBS_navBar");
	if(!FBS_navBar)
	{
		FBS_addNavBar();
	}	
	if(FBS_navbar_retries)
	{
		FBS_navbar_retries--;
		GM_log("FBS_addNavBar_watchdog():FBS_navbar_retries="+FBS_navbar_retries);
		setTimeout("FBS_addNavBar_watchdog()", 1000);
	}
	return;
}
//-----------------------------------------------------------------------
function FBS_main()
{
	FBS_CurFbUser = FBS_getCurrentFbUser();
	if(FBS_CurFbUser=="")
	{
		if(FBS_getuser_retries)
		{
			GM_log("FBS_getuser_retries="+FBS_getuser_retries);
			FBS_getuser_retries--;
			setTimeout("FBS_main()", 1000);
		}
		return;
	}
	
	var currentFullDate = new Date();
	var currentFullDate_hour = currentFullDate.getHours();
	
	var FBS_savedHour = PCG_cookieMonster.load(FBS_CurFbUser,'FBS_savedHour');
	
	if( FBS_savedHour != currentFullDate_hour || FBS_debug_savedHour )
	{		
		FBS_CheckIfAllUsersChangedTheirRelStatus();
		PCG_cookieMonster.save(FBS_CurFbUser,'FBS_savedHour',currentFullDate_hour,undefined,"/");
	}	
	//---------
	FBS_addNavBar();	
	FBS_addNavBar_watchdog();
	//---------
	FBS_aboutPageButton_watchdog();
	//---------
}
//-----------------------------------------------------------------------
FBS_main();
PCG_GA_recordEvent_OnceADay("FBS");
//-----------------------------------------------------------------------
