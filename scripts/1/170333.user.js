// ==UserScript==
// @name           Facebook Unfriend Finder
// @namespace      http://www.pc-gizmos.com
// @description    Facebook Unfriend Finder
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
// @version        1.0.110813
// @howto_img_url  http://files.pc-gizmos.com/scripts/170333.png
// ==/UserScript==
//-----------------------------------------------------------------------
//-----------------------------------------------------------------------
// in order to debug just change the FBU_debug to 1 or:
// ------------------
// goto chrome : F12 : Local Storage :
// change FBU_savedHour value and 
// some of the numbers in savedUsersStr.
//-----------------------------------------------------------------------
var FBU_debug = 0;
var FBU_CurFbUser="";
//-----------------------------------------------------------------------
function FBU_getRandomInt (min, max) 
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function FBU_clearSavedDeletedUsers()
{
	//localStorage.setItem('FBU_Arr_SavedDeletedUsers',"" );	
	PCG_cookieMonster.save(FBU_CurFbUser,"FBU_Arr_SavedDeletedUsers","");
	FBU_drawDeletedUsers();
	FBU_addNavBar();
}

function FBU_handle_current_friend_list(current_users_list)
{
	//-------------------------------------
	// JSON didnt work :( => code is ugly
	//-------------------------------------	
	var FBU_Arr_CurrentUsers = {}; 	
	for( f = 0 ; f < current_users_list.length ; f ++ )
	{
		if(current_users_list[f])
		{			
			FBU_Arr_CurrentUsers[current_users_list[f].uid] = current_users_list[f].text;
			if(FBU_debug)
			{
				var rand = FBU_getRandomInt(1,4);
				if(rand==3)
				{			
					delete FBU_Arr_CurrentUsers[current_users_list[f].uid];
				}
			}
		}						
	}
	//------------
	//GM_log("FBU_Arr_CurrentUsers="+JSON.stringify(FBU_Arr_CurrentUsers));
	//------------
	//var FBU_Arr_SavedUsers_str = localStorage.getItem('FBU_Arr_SavedUsers');	
	var FBU_Arr_SavedUsers_str = PCG_cookieMonster.load(FBU_CurFbUser,"FBU_Arr_SavedUsers");	
	//GM_log("FBU_Arr_SavedUsers_str="+FBU_Arr_SavedUsers_str);
	//------------
	if(FBU_Arr_SavedUsers_str)
	{
		var FBU_Arr_SavedUsers = JSON.parse(FBU_Arr_SavedUsers_str);
		
		//var FBU_Arr_SavedDeletedUsers_str = localStorage.getItem('FBU_Arr_SavedDeletedUsers');
		var FBU_Arr_SavedDeletedUsers_str = PCG_cookieMonster.load(FBU_CurFbUser,'FBU_Arr_SavedDeletedUsers');
		
		if(!FBU_Arr_SavedDeletedUsers_str||FBU_Arr_SavedDeletedUsers_str=="")
			FBU_Arr_SavedDeletedUsers={};
		else
			FBU_Arr_SavedDeletedUsers = JSON.parse(FBU_Arr_SavedDeletedUsers_str);
								
		for (var userId in FBU_Arr_SavedUsers)		
		{			
			if(FBU_Arr_SavedDeletedUsers[userId]=="")
				continue;			
			//GM_log("FBU_Arr_CurrentUsers["+userId+"]="+FBU_Arr_CurrentUsers[userId]);
			//GM_log("FBU_Arr_SavedUsers["+userId+"]="+FBU_Arr_SavedUsers[userId]);
			//GM_log("FBU_Arr_SavedDeletedUsers["+userId+"]="+FBU_Arr_SavedDeletedUsers[userId]);
			
			if ( ! ( userId in FBU_Arr_CurrentUsers)     && 
			     ! ( userId in FBU_Arr_SavedDeletedUsers)   ) // new deleted user
			{
				//GM_log("adding FBU_Arr_SavedDeletedUsers["+userId+"] as : "+FBU_Arr_SavedUsers[userId]);
				FBU_Arr_SavedDeletedUsers[userId] = FBU_Arr_SavedUsers[userId];					
			}
		}
		//------------		
		PCG_cookieMonster.save(FBU_CurFbUser,'FBU_Arr_SavedDeletedUsers',JSON.stringify(FBU_Arr_SavedDeletedUsers));
		//localStorage.setItem('FBU_Arr_SavedDeletedUsers',JSON.stringify(FBU_Arr_SavedDeletedUsers));
	}
	//------------
	PCG_cookieMonster.save(FBU_CurFbUser,'FBU_Arr_SavedUsers',JSON.stringify(FBU_Arr_CurrentUsers));
	//localStorage.setItem('FBU_Arr_SavedUsers',JSON.stringify(FBU_Arr_CurrentUsers) );
	//------------	
}
//-----------------------------------------------------------------------
function FBU_getCurrentFbUser()
{
	if(!document.cookie)
		return "";
	var user_id_arr = document.cookie.match(/c_user=(\d+)/);
	if(!user_id_arr||user_id_arr.length<1)
		return "";
	var user_id = document.cookie.match(user_id_arr[1]);
	return user_id;
}
//-----------------------------------------------------------------------
function FBU_updateDeletedUsersDatabase()
{
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function () 
	{
		if(xmlhttp.readyState == 4)
		{			
			//alert(xmlhttp.responseText);		
			eval("user_friends_obj = " + xmlhttp.responseText.toString().replace("for (;;);","") + ";");		
			FBU_handle_current_friend_list(user_friends_obj.payload.entries);
			FBU_addNavBar();			
		}

	};

	//var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
	var user_id = FBU_getCurrentFbUser();
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
	
	xmlhttp.open("GET", http + "://www.facebook.com" + "/ajax/"+"typeahead/"+"first_degree.php"+"?__a=1" + params, true); 
	
	xmlhttp.send();
}
//-----------------------------------------------------------------------
function FBU_addNavBar()
{
	var numOfDeletedUsers = 0;
	//var FBU_Arr_SavedDeletedUsers_str = localStorage.getItem('FBU_Arr_SavedDeletedUsers' );
	var FBU_Arr_SavedDeletedUsers_str = PCG_cookieMonster.load(FBU_CurFbUser,'FBU_Arr_SavedDeletedUsers');
			
	if (FBU_Arr_SavedDeletedUsers_str && FBU_Arr_SavedDeletedUsers_str!="")
	{	
		var FBU_Arr_SavedDeletedUsers = JSON.parse(FBU_Arr_SavedDeletedUsers_str);			
		numOfDeletedUsers = Object.keys(FBU_Arr_SavedDeletedUsers).length ;
	}
	
	FBU_addNotificationBar(numOfDeletedUsers);
	
	var FBU_countOfDeletedUsers = document.getElementById("FBU_countOfDeletedUsers");
	if(FBU_countOfDeletedUsers)
	{
		if(numOfDeletedUsers==0)
		{			
			FBU_countOfDeletedUsers.parentNode.style.display = "none";
		}
		else
		{
			FBU_countOfDeletedUsers.innerHTML = numOfDeletedUsers;
			FBU_countOfDeletedUsers.parentNode.style.display = "";			
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
	<a class="item clearfix sortableItem" style="background-color:rgb(252, 245, 244)" href="" onclick="FBU_drawDeletedUsers();return false;" title="UnFriend Finder" > \
		<div class="rfloat"> \
			<img class="uiLoadingIndicatorAsync img" src="https://fbstatic-a.akamaihd.net/rsrc.php/v2/yb/r/GsNJNwuI-UM.gif" alt="" width="16" height="11"> \
			<span class="count uiSideNavCount" '+style+' > \
				<span id="FBU_countOfDeletedUsers" class="countValue fss">'+numOfDeletedUsers+'</span> \
				<span class="maxCountIndicator"></span> \
			</span> \
			<span class="grip"></span> \
		</div> \
		<div> \
			<span class="imgWrap"> \
				<i class="img" style="background-image: url(https://fbstatic-a.akamaihd.net/rsrc.php/v2/y-/r/C4N9eCQc_fR.png);background-size: auto;background-repeat: no-repeat;display: inline-block;height: 16px;width: 16px;background-position: 0 -787px;"></i> \
			</span> \
			<div class="linkWrap hasCount" style="font-weight: bold;">UnFriend Finder</div> \
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
function FBU_addNotificationBar(count)
{
	var notificationsCountValue_FBU = document.getElementById("notificationsCountValue_FBU");
	if(notificationsCountValue_FBU)
	{
		if(count==0)
		{			
			notificationsCountValue_FBU.parentNode.style.display = "none";
		}
		else
		{
			notificationsCountValue_FBU.innerHTML = count;
			notificationsCountValue_FBU.parentNode.style.display = "";			
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
	div.setAttribute("id","FBU_NotificationDiv");
	div.setAttribute("class","uiToggle fbJewel hasCountSmall hasNew");
	div.setAttribute("style","background-size: 25px 25px;background-image: url(data:image/png;base64,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); background-repeat:no-repeat");	
	div.innerHTML = ' <a  onclick="FBU_drawDeletedUsers();return false;" name="notifications_FBU" href="#"   style="display: block;height: 31px;position: relative;text-decoration: none;margin: 0 1px;width: 24px;" > \
						<span id="notificationsCountWrapper_FBU" class="jewelCount" '+style+'> \
							<span  id="notificationsCountValue_FBU">'+count+'</span> \
						</span> \
					  </a> ';
	jewelContainer.appendChild(div);
}
//-----------------------------------------------------------------------
function FBU_drawDeletedUsers()
{
	var contentArea = document.getElementById("contentArea");
	if(!contentArea)
	{
		setTimeout("FBU_drawDeletedUsers()", 1000);	
		return;
	}
	
var html_header = ' \
<div id="contentArea" role="main" aria-describedby="pageTitle"> \
	<div id="pagelet_friends" data-referrer="pagelet_friends"> \
		\
		<div class="uiHeader uiHeaderWithImage uiHeaderPage"> \
			<div class="clearfix uiHeaderTop"> \
				<div class="rfloat"> \
					<h2 class="accessible_elem">Friends</h2> \
					<a class="uiHeaderActions uiButton" onClick="FBU_clearSavedDeletedUsers();return false;" href="" role="button"> \
						<span class="uiButtonText">Clear All UnFriends Messages</span> \
					</a> \
				</div> \
				<div> \
					<h2 class="uiHeaderTitle" aria-hidden="true"> \
						<i class="uiHeaderImage img " style="background-image:url(https://fbstatic-a.akamaihd.net/rsrc.php/v2/y-/r/C4N9eCQc_fR.png);background-size:auto;background-repeat:no-repeat;display:inline-block;height:16px;width:16px;background-position: 0 -787px";></i> \
						UnFriend Finder \
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
										<h3 class="uiHeaderTitle">People that aren\'t your friends anymore :</h3> \
									</div> \
								</div> \
							</div> \
							<div class="fbRequestList mbs"> \
								<ul class="uiList" style="padding-bottom: 10px;" > ';
		//----------------------
		//var FBU_Arr_SavedDeletedUsers_str = localStorage.getItem('FBU_Arr_SavedDeletedUsers' );
		var FBU_Arr_SavedDeletedUsers_str = PCG_cookieMonster.load(FBU_CurFbUser,'FBU_Arr_SavedDeletedUsers');
	
		var inner_html = "";
		if (FBU_Arr_SavedDeletedUsers_str && FBU_Arr_SavedDeletedUsers_str!="")
		{
			FBU_Arr_SavedDeletedUsers = JSON.parse(FBU_Arr_SavedDeletedUsers_str);
				
			for (var userId in FBU_Arr_SavedDeletedUsers)		
			{			
				if(FBU_Arr_SavedDeletedUsers[userId]=="")
					continue;
				
				inner_html =  inner_html + '<li class="objectListItem" id="" style="border-color: #e9e9e9;border-style: solid;border-width: 1px 0 0 0;" > \
										<div class="clearfix"> \
											<a class="lfloat" target="_blank" href="//facebook.com/profile.php?id='+userId+'" tabindex="-1" style="display: block;margin-right: 8px;"> \
												<img class="img" src="//graph.facebook.com/'+userId+'/picture" alt=""> \
											</a> \
											<div class="clearfix"> \
												<div class="rfloat"></div> \
												<div style="display:block;overflow:hidden;word-break: break-word"> \
													<div style="height:20px"> \
													</div> \
													<div> \
														<div> \
															<span class="" style="color: #333;font-weight: bold;font-size: 13px;"> \
																<a target="_blank" href="//facebook.com/profile.php?id='+userId+'">'+FBU_Arr_SavedDeletedUsers[userId]+'</a> \
															</span> \
														</div> \
													</div> \
												</div> \
											</div> \
										</div> \
									</li>';
			}		
		}
									
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
		var share_html = "Please Share Facebook UnFriend Finder:<BR><BR>"+ google_plus + like_button;
		//-----------------------
	
	contentArea.innerHTML = html_header + inner_html + html_footer + share_html;
	//-----------------------
	var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
	po.src = 'https://apis.google.com/js/plusone.js';
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
	//-----------------------
	
	PCG_GA_recordEvent_IncrementActions("FBU");
	PCG_GA_recordEvent_OpenUserMsg("FBU",
									{ // params									 									 
									 "scriptDesc":"Facebook UnFriend Finder",
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
var FBU_getuser_retries=5;
function FBU_main()
{
	FBU_CurFbUser = FBU_getCurrentFbUser();
	if(FBU_CurFbUser=="")
	{
		if(FBU_getuser_retries)
		{
			GM_log("FBU_getuser_retries="+FBU_getuser_retries);
			FBU_getuser_retries--;
			setTimeout("FBU_main()", 1000);			
		}
		return;
	}
	
	var currentFullDate = new Date();
	var currentFullDate_hour = currentFullDate.getHours();
	
	//var FBU_savedHour = localStorage.getItem("FBU_savedHour");
	var FBU_savedHour = PCG_cookieMonster.load(FBU_CurFbUser,'FBU_savedHour');
	
	if( FBU_savedHour != currentFullDate_hour || FBU_debug )
	{
		FBU_updateDeletedUsersDatabase();
		//localStorage.setItem("FBU_savedHour",currentFullDate_hour);
		PCG_cookieMonster.save(FBU_CurFbUser,'FBU_savedHour',currentFullDate_hour);
	}	
	FBU_addNavBar();
	
	//debug big cookies
	/*
	var FBU_TestBigCookie={};
	for ( var i = 0 ; i < 500 ; i++)
	{
		FBU_TestBigCookie[FBU_getRandomInt(100001449250222,900001449250222)] = "John Smith the "+i+"th";
	}
	GM_log("JSON.stringify(FBU_TestBigCookie)="+JSON.stringify(FBU_TestBigCookie));
	PCG_cookieMonster.save(FBU_CurFbUser,'FBU_TestBigCookie',JSON.stringify(FBU_TestBigCookie));
	var readBigCookie = PCG_cookieMonster.load(FBU_CurFbUser,'FBU_TestBigCookie');
	GM_log("load(FBU_TestBigCookie)="+readBigCookie);
	*/
	//debug big cookies
}
//-----------------------------------------------------------------------
FBU_main();
PCG_GA_recordEvent_OnceADay("FBU");
//-----------------------------------------------------------------------
