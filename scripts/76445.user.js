// ==UserScript==
// @name		User's Settings
// @description	Adds a column for availability status in IRCTC search result, removes ads, and allows you to set default values for search.
// @namespace	IRCTC
// @include		http://*irctc.co.in/*
// @include		https://*irctc.co.in/*
// @version     0.47
// @author		Sharath. Credits to Nitin Kishen for older(beta) version (http://code.google.com/p/irctcbeta-availability-greasemonkey-script/)
// ==/UserScript==

//================Settings================================
var defaultUsername = GM_getValue("defaultUsername", 'alha1818');
var defaultPassword = GM_getValue("defaultPassword", '1234');
var defaultFromStation = GM_getValue("defaultFromStation", '');
var defaultToStation = GM_getValue("defaultToStation", '');
var defaultTicketType = GM_getValue("defaultTicketType","eticket");
var defaultClass = GM_getValue("defaultClass","SL");
var defaultAvailDays = GM_getValue("defaultAvailDays","3");
var blockAds = GM_getValue("blockAds", true );
var autoLogin = GM_getValue("autoLogin", true );
var isFirstRun = GM_getValue("firstRun", true );


//Remove the idiotic "Sorry, you do not have permission to right click." message on right click	
with (document.wrappedJSObject || document)
{
	onmouseup = null;
	onmousedown = null;
	oncontextmenu = null;
}

// Add jQuery for easy Javascripting :)
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.4/jquery.min.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);


GM_wait();
var jQ = {};
function GM_wait()
{
	if(typeof unsafeWindow.jQuery == 'undefined')
	{
		window.setTimeout(GM_wait,100);
	}
	else
	{
		jQ = unsafeWindow.jQuery.noConflict(true);
		startAddingInfo();
	}
}

function startAddingInfo()
{
	//Remove the annoying Ad banners
	if( blockAds )
	{
		jQ("img[src*=banner]").remove();
		jQ("img[src*=planner body.gif]").remove();
	}	
	
	
	//Add Swap stations link.
	var swapLink = jQ("<a href='#' style='font-size:15px; font-weight:bold; color:#0066BB; margin-left:10px;'>&larr;Swap&rarr;</a>");
	swapLink.click( function()
	{
		var fromStnInput = jQ("input[name='stationFrom']");
		var toStnInput = jQ("input[name='stationTo']");
		var tmp = fromStnInput.val();
		fromStnInput.val( toStnInput.val() );
		toStnInput.val( tmp );
		return false;
	});	
	var fromStnInput = jQ("input[name='stationFrom']");
	fromStnInput.parents("td:first").append( swapLink);
	
	

	//Make 'Train Reservation' link point to 'Plan My Travel' page.
	//jQ("a[href*='helpandinfo.html']").attr("href", jQ("a:contains('Plan')").attr("href") ).removeAttr("target");	
	
	//Auto-login if username and password is given
	if( jQ("input[value='Login']").length && defaultUsername.length && defaultPassword.length  )
	{
		jQ("input[name='userName']").val(defaultUsername);
		jQ("input[name='password']").val(defaultPassword);
		if( autoLogin )
		{
			jQ("input[name='submit']").click();
		}
	}
	
	
	if( document.location.href.match('planner.do') || document.location.href.match('quickBook.do') )
	{
		loadDefaultSettings();

		if( isFirstRun )//Show the settings form for user to set if its a first run.
		{
			IRCTCSettings();
		}		
	}
	
	if ( document.location.href.match('planner.do') )
	{		
		//Get the availability status of each train
		showAvailStatus();
		/*ToDo: Ajaxify the results for given form input.
		jQ("input[name='Submit']").click( function()
		{
			jQ.post( jQ("form[name='BookTicketForm']").attr("action"), jQ("form[name='BookTicketForm']").serialize(), function(data)
			{
				alert(data ) ;
			
			});			
			return false;		
		});
		*/		
	}
	
	if( jQ("td:contains('Your Session has Expired')").length )
	{	
		document.location.href = 'http://www.irctc.co.in';
	}
	else //If the re-enter password nag screen comes, here we re-enter :)
	if( jQ("td:contains('Re-enter Password')").length && defaultPassword.length )
	{
		jQ("input[name='password']").val(defaultPassword);
		if( autoLogin )
		{	
			jQ("input[name='Submit']").click();
		}
		
	}

}

function showAvailStatus()
{
	var bv_SessionIDValue = getURLParameter('BV_SessionID');
	var bv_EngineIDValue = getURLParameter('BV_EngineID');


	var trainTable = jQ(".TrainBackGround").eq(0).find("table:last");	
	// Holds the train numbers in an array
	var trainNoArr = Array();	
	
	var row = 0;	
	if( trainTable.find("tr").length ==0 )
	return;
	trainTable.find("tr").each( function()
	{	
		if( row != 0)//ignore first row (header).
		{
			trainNoArr[row-1] = jQ(this).children("td").eq(2).find("div").eq(0).html().trim();
		}
		row++;
	});
	
	var headerRow = jQ(trainTable).find("tr:first");
	jQ(headerRow).children("td:last").attr("colspan", "7");//fix the silly excess colspan for last column.
	newColumnHeader = document.createElement("td");
	newColumnHeader.className = 'boldEleven';
	//Append the Status text to the td
	jQ(newColumnHeader).text("Status");	
	//Append the status td to the tr.
	jQ(headerRow).append( newColumnHeader);
	
	// Get the Date
	var date = jQ("input[name='JDate1']").val();		
	var hdnMonth = date.split('/')[1];// Get the month	
	var hdnDay = date.split('/')[0];// Get the Date	
	var hdnYear = date.split('/')[2];// Get the year
	
	// Get the class code
	var hdnClasscode = jQ("select[name='classCode']").find("option:selected").val();
	
	var fromStation;
	var fromStationCode;	
	var toStation;
	var toStationCode;
	
	// Get the Quota information.	
	var quota =  jQ("input[name='quota']").val();	
	
	var i =0;	
	trainTable.find("tr").each( function()
	{

		if( i++ != 0 )//ignore first row (header).
		{
			var onclickAttr = jQ(this).children("td").eq(1).find("div:first").html();
			var startIndex = onclickAttr.indexOf('(') +1;
			var endIndex = onclickAttr.indexOf(')');
			var onClickArg = onclickAttr.substring(startIndex,endIndex);
			var splitter =  onClickArg.split(',');
			
			// Get the From station
			fromStation = splitter[splitter.length-2];
			fromStationCode = fromStation.substring(1,fromStation.length-1);

			// Get the To Station
			toStation = splitter[splitter.length-1];
			toStationCode = toStation.substring(1,toStation.length-1);

			// Get the train number
			var hdnTrnNo = trainNoArr[i-2];							
			
			////// AJAX for ticket availabilty /////			
			var url = "/cgi-bin/bv60.dll/irctc/enquiry/avail.do";
			var getParams = {'BV_SessionID':bv_SessionIDValue,
				'BV_EngineID':bv_EngineIDValue ,
				'trainToStation': true,
				'availabilityPop': true,
				'hdnTrnNo':hdnTrnNo,
				'hdnDay':hdnDay,
				'hdnMonth':hdnMonth,
				'hdnYear':hdnYear,
				'hdnClasscode':hdnClasscode,
				'fromStation':fromStationCode,
				'toStation':toStationCode,
				'hdnQuota':quota
			};
			
			var busyIcon = document.createElement("td");
			jQ(busyIcon).addClass("autocomplete_text_busy");			
			jQ(this).append(busyIcon);
			

			var thisRow = this;
			jQ.get(url, getParams, function(data)
			{
				/*
				var availResultTd = jQ(data).find("td:contains('Status'):last").parent().next().find("td").eq(2);				
				availResultTd.removeAttr("width");				
				jQ(thisRow).children(".autocomplete_text_busy").remove();
				jQ(thisRow).append(availResultTd);				
				*/
				if( data.length == 0)
				{
					jQ(thisRow).children(".autocomplete_text_busy").removeClass().addClass("boldFourteen").html("Error");				
				}
				else
				{
					var availResultRow = jQ(data).find("td:contains('Status'):last").parent();
					var statusHtml = "";
					var i = 1; 
					while( i++ <= defaultAvailDays )
					{
						availResultRow = availResultRow.next();
						var availDate = availResultRow.find("td").eq(1).html().split("-");
						if( jQ.trim(availDate[0]).length == 1 )//Make single digit date to pad with zero (for alignment).
						{
							availDate[0] = "0" + jQ.trim(availDate[0]);
						}
						statusHtml = statusHtml + availDate[0] + "-" + jQ.trim(availDate[1]) + ":" + availResultRow.find("td").eq(2).html() + "<br/>";

					}
					jQ(thisRow).children(".autocomplete_text_busy").removeClass().addClass("boldFourteen").html(statusHtml).css("width", "150px");
				}
				//jQ(thisRow).append(availResultTd);								
			});						
			
		}
		
	});
	
}

function IRCTCSettings()
{
	mySpan=document.createElement('span');
	mySpan.id='settingsSpan';		
	document.body.appendChild(mySpan);
	mySpan.setAttribute("style", "position:fixed; width:100%; height: 100%; z-index:101; left: 0; top: 0; background-color: #D9E6F7; opacity:.75; display:none;");			
	var myDiv = document.createElement('div');
	myDiv.id = 'settingsDiv';

	myDiv.setAttribute("style","position:fixed; width:650px; height: 400px; z-index: 102; background-color: #444; border:2px solid #0ad; text-align:center; display:none;font-family:verdana;font-weight:bold;-moz-border-radius: 10px;-webkit-border-radius: 10px;");
	document.body.appendChild(myDiv);
	myDiv.innerHTML="<span style='font-size:18px; color:white; line-height:35px;'>IRCTC Availability Script Settings</span><br/><br/>\
	<div style='padding-left:55px; font-size:10pt;line-height:22px;height:300px;'>\
		<form name='defSettingsForm' id='defSettingsForm'>\
		<div id='innerDiv1' style='float:left;text-align:left; background:#000;color:#fff;padding:16px; width:510px; height:270px;-moz-border-radius: 5px;-webkit-border-radius: 5px;'>\
		<h4 style='background:red; color:#000;-moz-border-radius: 3px;-webkit-border-radius: 3px; margin:10px;'>Set Default Settings Here:</h4>\
		<label style='display:inline-block; width:80px; height:30px;'>Username:</label>\
		<input type='text' name='defUsername' id='defUsername'><br/>\
		<label style='display:inline-block; width:80px; height:30px;'>Password:</label>\
		<input type='password' name='defPassword' id='defPassword'><br/>\
		<label style='display:inline-block; width:80px; height:30px;'>From:</label>\
		<input type='text' name='defFromStn' id='defFromStn'>\
		<img id='fetchFromStation' src='/Images/station_code.gif' style='vertical-align: middle;'>\
		<label style='display:inline-block; width:35px; height:30px;'>To:</label>\
		<input type='text' name='defToStn' id='defToStn'>\
		<img id='fetchToStation' src='/Images/station_code.gif' style='vertical-align: middle;'><br/>\
		<label style='display:inline-block; width:80px; height:30px;'>Class:</label>\
		<select name='classCode' id='defClass'>\
			<option value='SL' id='SL'>Sleeper Class(SL)</option>\
			<option value='1A' id='1A'>First Class AC(1A)</option>\
			<option value='FC' id='FC'>First Class(FC)</option>\
			<option value='2A' id='2A'>AC 2-tier sleeper(2A)</option>\
			<option value='3A' id='3A'>AC 3 Tier(3A)</option>\
			<option value='CC' id='CC'>AC chair Car(CC)</option>\
			<option value='2S' id='2S'>Second Sitting(2S)</option>\
			<option value='3E' id='3E'>AC 3 Tier Economy(3E)</option>\
			</select><br/>\
			<label style='display:inline-block; width:180px; height:30px;'>Show Avilability Days:</label>\
			<select name='defAvailDays' id='defAvailDays'>\
			<option value='1' id='availDays1'>1</option>\
			<option value='2' id='availDays2'>2</option>\
			<option value='3' id='availDays3'>3</option>\
			<option value='4' id='availDays4'>4</option>\
			<option value='5' id='availDays5'>5</option>\
			<option value='6' id='availDays6'>6</option>\
			</select><br/>\
		<label style='display:inline-block; width:95px; height:30px;'>Ticket Type:</label> <input type='radio' name='defTicketType' id='eticketRadio' value='eticket'>e-ticket <input type='radio' name='defTicketType' id='iticketRadio' value='iticket'>i-ticket<br/>\
		<input type='checkbox' name='blockAdsEnable' id='blockAdsEnable' /><label>Remove Ads</label><br/>\
		<input type='checkbox' name='autologinEnable' id='autologinEnable'/><label>Login/Relogin automatically</label><br/>\
		</div>\
		<br/>\
		</form>\
		</div>\
	<div style='text-align:center; padding-top:12px;'><input type='button' id='cancelBtn' value='Cancel'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type='button' id='saveSettings' value='Save and Exit'></div>\
	";
	jQ('#settingsSpan').show();
	jQ('#settingsDiv').css('top', parseInt( (jQ(window).height() - jQ('#settingsDiv').height() ) / 2) )
		.css('left', parseInt( (jQ(window).width() - jQ('#settingsDiv').width() ) / 2) )
		.show();		
	
	setTimeout( getDefaultsToSettingsForm, 0);
	
	jQ('#fetchFromStation').click( function()
	{		
		var bv_SessionIDValue = getURLParameter('BV_SessionID');
		var bv_EngineIDValue = getURLParameter('BV_EngineID');
		var stationCode = jQ("#defFromStn" ).val()
		window.open("../enquiry/stationnames.do?BV_SessionID="+bv_SessionIDValue+"&BV_EngineID="+bv_EngineIDValue+"&stnName="+escape(stationCode)+"&formName=defSettingsForm&fieldName=defFromStn&leftWidth=0","","dependent=yes,width=350,height=375,screenX=200,screenY=300,titlebar=no,scrollbars=auto,maximize=no");
	});

	jQ('#fetchToStation').click( function()
	{		
		var bv_SessionIDValue = getURLParameter('BV_SessionID');
		var bv_EngineIDValue = getURLParameter('BV_EngineID');
		var stationCode = jQ("#defToStn" ).val()
		window.open("../enquiry/stationnames.do?BV_SessionID="+bv_SessionIDValue+"&BV_EngineID="+bv_EngineIDValue+"&stnName="+escape(stationCode)+"&formName=defSettingsForm&fieldName=defToStn&leftWidth=0","","dependent=yes,width=350,height=375,screenX=200,screenY=300,titlebar=no,scrollbars=auto,maximize=no");
	});

	jQ('#saveSettings')[0].addEventListener('click',function()
	{
		GM_setValue("defaultUsername", document.getElementById('defUsername').value );
		GM_setValue("defaultPassword", document.getElementById('defPassword').value );
		GM_setValue("defaultFromStation", document.getElementById('defFromStn').value );
		GM_setValue("defaultToStation", document.getElementById('defToStn').value );
		GM_setValue("defaultClass", document.getElementById('defClass').value );		
		GM_setValue("defaultAvailDays", document.getElementById('defAvailDays').value );
		
		if( document.getElementById('eticketRadio').checked )
		{
			GM_setValue("defaultTicketType", document.getElementById('eticketRadio').value );
		}
		else
		if( document.getElementById('iticketRadio').checked )
		{
			GM_setValue("defaultTicketType", document.getElementById('iticketRadio').value );
		}
		
		
		if( document.getElementById("blockAdsEnable").checked )
		{
			GM_setValue("blockAds", true );
		}
		else
		{
			GM_setValue("blockAds", false );
		}
		
		if( document.getElementById("autologinEnable").checked )
		{
			GM_setValue("autoLogin", true );
		}
		else
		{
			GM_setValue("autoLogin", false );			
		}			
		
		GM_setValue("firstRun", false );
		jQ("#settingsSpan").remove();
		jQ("#settingsDiv").remove();			
	}, false);
	
	jQ('#cancelBtn')[0].addEventListener('click',function()
	{
		GM_setValue("firstRun", false );
		jQ("#settingsSpan").remove();
		jQ("#settingsDiv").remove();

	}, false);		
	
	
	
}

function getURLParameter(name)
{
	return unescape(
	(RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
	);
}

function getDefaultsToSettingsForm()
{
	//Enable Autocomplete on from and to stations.
	document.location.href="javascript:xmlhttpPost(document.getElementById('defFromStn'));xmlhttpPost(document.getElementById('defToStn'));";

	document.getElementById("defUsername").value = GM_getValue("defaultUsername", '' );
	document.getElementById("defPassword").value = GM_getValue("defaultPassword", '' );		
	document.getElementById("defFromStn").value = GM_getValue("defaultFromStation", '' );		
	document.getElementById("defToStn").value = GM_getValue("defaultToStation", '' );

	if( GM_getValue("defaultTicketType","eticket") == "iticket"	)
	{
		document.getElementById('iticketRadio').checked = true;
	}
	else
	if( GM_getValue("defaultTicketType","eticket") == "eticket"	)
	{
		document.getElementById('eticketRadio').checked = true;
	}
	
	document.getElementById( GM_getValue("defaultClass","SL") ).selected = true;
	
	document.getElementById( "availDays" + GM_getValue("defaultAvailDays","3") ).selected = true;	
	
	if( GM_getValue("blockAds", true ) )
	{
		document.getElementById("blockAdsEnable").checked = true;
	}
	
	if( GM_getValue("autoLogin", true  ) )
	{
		document.getElementById("autologinEnable").checked = true;		
	}	
	
	
}

function loadDefaultSettings() //Load default settings given to the search input form.
{
	var settingsLink = jQ( document.createElement('a') );
	settingsLink.attr("href", "javascript:;");
	settingsLink.text("IRCTC Avail Settings");
	settingsLink.css({'color':'#f2ff22', 'font-weight':'bold', 'padding':'3px', 'text-decoration':'underline'});
	settingsLink.click(IRCTCSettings);		
	jQ("td:contains('Mandatory'):last").html("").append(settingsLink);

	//Set default values according to user settings.
	if(jQ("input[name='ticketType']:checked").length == 0)//Select default ticket type.
	{
		jQ("input[value='"+defaultTicketType+"']").click();
	}
	
	if( jQ("select[name='classCode'] option:selected").val() == "")
	{
		jQ("select[name='classCode'] option:contains("+defaultClass+")").attr("selected", true);//Select default class
	}
	
	if( jQ("input[name='stationFrom']").val() == "" || jQ("input[name='stationFrom']").val().match('Enter') )
	{
		jQ("input[name='stationFrom']").val(defaultFromStation);
	}

	if( jQ("input[name='stationTo']").val() == "" || jQ("input[name='stationTo']").val().match('Enter') )	
	{	
		jQ("input[name='stationTo']").val(defaultToStation);	
	}
}

GM_registerMenuCommand("IRCTC Availability Status Settings", IRCTCSettings);