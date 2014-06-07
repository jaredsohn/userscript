// ==UserScript==
// @name           Spy Battle Time Online
// @description    Tracks time spent online in Spy Battle
// @include        http://www.spybattle.com/*
// ==/UserScript==


//record starting date, if this is the first time the tracker is used.
if(GM_getValue('tracking_startdate', 0) == 0)
{
	GM_setValue('tracking_startdate', new Date().toString());

	// Detect login page
	var images = document.evaluate("//img[@alt='SPY BATTLE LOGIN']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	if(images.snapshotLength == 0)
	{
		// Find current time
		var current_time = new Date().getTime();

		//register login time even though user already started
		GM_setValue('last_login', current_time.toString());
	}
}

//convert time in milliseconds to string of "uuu years, vv weeks, w days, xx hours, yy minutes and zz seconds"
function durationstring(duration)
{
	var str = "";
	var seconds = Math.round(parseFloat(duration)/1000);

	if(seconds >= 60)
	{
		var minutes = Math.floor(seconds/60);
		seconds = Math.round(seconds - (minutes*60));

		if(minutes >= 60)
		{
			var hours = Math.floor(minutes/60);
			minutes = Math.round(minutes - (hours*60));

			if(hours >= 24)
			{
				var days = Math.floor(hours/24);
				hours = Math.round(hours - (days*24));

				if(days >= 7)
				{
					var weeks = Math.floor(days/7);
					days = Math.round(days - (weeks*7));

					if(weeks >= 52)
					{
						var years = Math.floor(weeks/52);
						weeks = Math.round(weeks - (years*52));

						str += years+" years, ";
					}
					str += weeks+" weeks, ";
				}
				str += days+" days, ";
			}
			str += hours+" hours, ";
		}
		str += minutes+" minutes and ";
	}
	str += seconds+" seconds";	

	return str;
}


// Detect login page
var images = document.evaluate("//img[@alt='SPY BATTLE LOGIN']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

if(images.snapshotLength != 0)
{

// on clicking login or leaving login page, record time if previous recorded time was of logout.
	window.addEventListener("submit", 
				function()
				{
					// Find current time
					var current_time = new Date().getTime();

					//register login time
					var last_login = parseInt(GM_getValue('last_login', "0"));
					var last_logout = parseInt(GM_getValue('last_logout', current_time.toString() ));
					var last_activity = parseInt(GM_getValue('last_activity', current_time.toString() ));

					var online_today = parseInt(GM_getValue('online_today', "0") );
					var online_total = parseInt(GM_getValue('online_total', online_today.toString()) );


					if(last_login < last_logout)
					{	//was properly logged out
						GM_setValue('last_login', current_time.toString());
					}
					else	//was automatically logged out
					{
						GM_setValue('last_login', current_time.toString());
						GM_setValue('last_logout', (last_activity+(10*60*1000)).toString() );
								
						online_total += last_activity+(10*60*1000) - last_login;
						GM_setValue('online_total', online_total.toString());

						//check if midnight passed							
						var midnight = new Date();
						midnight.setTime(current_time);
						midnight.setHours(0,0,0,0);
						midnight = midnight.getTime();
					
						if(last_activity < midnight)
						{
							online_today = 0;
						}
						else
						{
							if(last_login > midnight)
							{
								online_today += last_activity+(10*60*1000) - last_login;
							}
							else
							{
								online_today = last_activity+(10*60*1000) - midnight;
							}
						}
						GM_setValue('online_today', online_today.toString());
						
					}
				},
				true);
}
else	// not the login page
{
//track time last activity
	GM_setValue('last_activity', new Date().getTime().toString());



// on clicking logout: record time and update time online today
	var logout_link = document.evaluate("//a[@href='index.php?action=logout']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if(logout_link.snapshotLength == 1)
	{
		logout_link = logout_link.snapshotItem(0);

		logout_link.addEventListener(	"click",
						function()
						{
							// Find current time
							var current_time = new Date().getTime();

							var last_login = parseInt(GM_getValue('last_login', current_time.toString()) );
							var last_logout = parseInt(GM_getValue('last_logout', current_time.toString() ));

							var online_today = parseInt(GM_getValue('online_today', "0") );
							var online_total = parseInt(GM_getValue('online_total', online_today.toString()) );
	
							var online_this_session = current_time - last_login;

							//check if midnight passed							
							var midnight = new Date();
							midnight.setTime(current_time);
							midnight.setHours(0,0,0,0);
							midnight = midnight.getTime();
				
							if(last_login < midnight)
							{
								online_today = current_time - midnight;
							}
							else
							{
								if(last_logout < midnight)
								{
									online_today = online_this_session;
								}
								else
								{
									online_today += online_this_session;
								}
							}
	
							if( last_login > last_logout )
							{
								//update Time online today and total
								GM_setValue('online_today', online_today.toString());
								GM_setValue('online_total', (online_total+online_this_session).toString());
							}
							//register logout time
							GM_setValue('last_logout', current_time.toString());
						},
						true);
	}

//Detect 'Home' page and find location to put 'Time Online' information
	// Find element with "Safe House"
	var allTDTags = document.getElementsByTagName('td');

	//GM_log("allTDTags.length="+ allTDTags.length);
	for (var i = allTDTags.length -1 ; i >= 0 ; --i)
	{
		//if( allTDTags[i].innerHTML == " Safe House" )
		if( allTDTags[i].innerHTML == " <a href=\"safe%20house.php\" title=\"Click to See Safe House List and Costs\">Safe House</a>" )
		{
			//GM_log("Safe House found");

			// Double check by finding "Agent Class Experience" in a grandchild of element-with-safe-house's grandparent
			//if (allTDTags[i].parentNode.parentNode.innerHTML.search("Agent Class Experience") != -1 )
			//{
				// Find current time
				var current_time = new Date().getTime();

				// Calculate time since last login
				var last_login = parseInt(GM_getValue('last_login', current_time.toString()) );
				var last_logout = parseInt(GM_getValue('last_logout', "0") );
				var online_today = parseInt(GM_getValue('online_today', "0") );
				var online_total = parseInt(GM_getValue('online_total', online_today.toString()) );
	
				var online_this_session = current_time - last_login;

				//check if midnight passed
				var midnight = new Date();
				midnight.setTime(current_time);
				midnight.setHours(0,0,0,0);
				midnight = midnight.getTime();
				
				if(last_login < midnight)
				{
					online_today = current_time - midnight;
				}
				else
				{
					if(last_logout < midnight)
					{
						online_today = online_this_session;
					}
					else
					{
						online_today += online_this_session;
					}
				}

	
				// Add to grandparent lines "Time online this session..." "Time online today..." & "Time online since (tracker start)..." 
				var Grandparent = allTDTags[i].parentNode.parentNode;
				Grandparent.innerHTML +=	"<tr><td colspan='1' width='50%'> Time Online This Session</td>"
								+"<td colspan='1' width='50%'>"
								+durationstring(online_this_session)
								+"</td></tr>"
								+"<tr><td colspan='1' width='50%'> Time Online Today</td>"
								+"<td colspan='1' width='50%'>"
								+durationstring(online_today)
								+"</td></tr>"
								+"<tr><td colspan='1' width='50%'> Time Online Since "
								+GM_getValue('tracking_startdate', new Date().toString())
								+"</td><td colspan='1' width='50%'>"
								+durationstring(online_total+online_this_session)
								+"</td></tr>"
								+"<tr><td colspan='4' align='center'>"
								+"<input class='button' type='button' value='Reset Time Online' name='resettimeonline' />"
								+"</td></tr>";

				var reset_button = document.getElementsByName("resettimeonline");
				if(reset_button.length == 1)
				{
					reset_button = reset_button[0];

					reset_button.addEventListener(	"click",
									function()
									{
										// Find current time
										var current_time = new Date();
				
										GM_setValue('tracking_startdate', current_time.toString());
										
										current_time = current_time.getTime();

										GM_setValue('online_today', "0");
										GM_setValue('online_total', "0");
										GM_setValue('last_logout', "0");
										GM_setValue('last_login', current_time.toString());
										
										location.href=unescape(window.location.pathname);
									},
									true);
				}

	
			//}
				break;
		}	
	}


}
