// ==UserScript==
// @name		IRCTC Availability Status
// @description	Adds a column for availability status in IRCTC search result, removes ads, and allows you to set default values for search.
// @namespace	IRCTC
// @include		http://*irctc.co.in/*
// @include		https://*irctc.co.in/*
// @version     0.6
// @author		Sharath. Credits to Nitin Kishen for older(beta) version (http://code.google.com/p/irctcbeta-availability-greasemonkey-script/)
// ==/UserScript==

//================Settings================================
var defaultUsername = GM_getValue("defaultUsername", '');
var defaultPassword = GM_getValue("defaultPassword", '');
var defaultFromStation = GM_getValue("defaultFromStation", '');
var defaultToStation = GM_getValue("defaultToStation", '');
var defaultTicketType = GM_getValue("defaultTicketType","eticket");
var defaultClass = GM_getValue("defaultClass","SL");
var defaultQuota = GM_getValue("defaultQuota","GN");
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
	}	
	
	
	//Add Swap stations link.
	var swapLink = jQ("<span>&uarr;<a href='#' style='font-size:12px; font-weight:bold; color:#0066BB;'>Swap</a>&darr;</span>");
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
	
	
	//Auto-login if username and password is given
	if( jQ("input[value='Login']").length && defaultUsername.length && defaultPassword.length  )
	{
		jQ("input[name='userName']").val(defaultUsername);
		jQ("input[name='password']").val(defaultPassword);
		if( autoLogin && jQ("input[name='userName']").length )
		{
			jQ(".buttonSubmit").click();
		}
	}
	
	
	if( document.location.href.match('planner.do') || document.location.href.match('quickBook.do') )
	{
		if( jQ(".boldEleven:contains(Your Session has Expired)").length )
		{
			jQ("a.readon:contains(here)").click();
		}
		else
		{
			loadDefaultSettings();

			if( isFirstRun )//Show the settings form for user to set if its a first run.
			{
				IRCTCSettings();			
			}
		}
		

	}
	
	if ( document.location.href.match('planner.do') )
	{	
		showAvailStatusNew();	
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

function showAvailStatusNew()
{

	var trainResults = jQ("td[id*='trainNo']");
	jQ(trainResults).parents("div:first").css("height", "").attr("id", "resultsDiv");
	if( trainResults.length > 0 )
	{
		var colToShow;
	
		switch(GM_getValue("defaultClass") )
		{		
			case "1A":
				colToShow = 0;
			break;
			case "FC":
				colToShow = 1;			
			break;
			case "2A":
				colToShow = 2;			
			break;
			case "3A":
				colToShow = 3;			
			break;
			case "3E":
				colToShow = 4;			
			break;
			case "CC":
				colToShow = 5;			
			break;		
			case "SL":
				colToShow = 6;			
			break;
			case "2S":
				colToShow = 7;			
			break;
		}
	
		trainResults.each( function()
		{			
			jQ(this).nextAll("td[id*='arrival']").nextAll("td").hide();
			radioBtnCol = jQ(this).nextAll("td[id*='arrival']").nextAll("td").eq(colToShow);
			radioBtnCol.show();
			
			radioBtnCol.parents("tr:first").click( function()
			{	
				jQ(this).find("input[type='radio']:visible").attr("checked", "checked");
				eval( "unsafeWindow."+jQ(this).find("input[type='radio']:visible")[0].getAttribute('onclick') );
				
				jQ("#resultsDiv tr").css("background-color", "#fff");
				jQ(this).css("background-color", "#B7CEE2");
			})
			.css("cursor", "pointer");
			
			if( radioBtnCol.find("input[type='radio']").length)
			{
				radioBtnCol.append("<div class='statusResults' style='width:300px; text-align:left;color:black; font-weight:bold; border:1px solid #ccc;'><img class='ajaxLoadStatus' src='https://www.irctc.co.in/beta_images/ajax-loader.gif'/></div>");
				var radioOnclick = radioBtnCol.find("input[type='radio']")[0].getAttribute('onclick');
				radioOnclick = radioOnclick.replace("setvalue", "getStatusResults");
				eval(radioOnclick);
			}
			
			
		});
	
		jQ("td:contains(Arrives):last").nextAll().hide();
		jQ("td:contains(Arrives):last").nextAll("td").eq(colToShow).show().append("<div class='statusResults' style='width:300px; font-weight:bold'>Train Availabilty Status</div>");
		
	}
}


function getStatusResults(clscode, trnNo, trnName, trainType, departure, arrival, runson, boardpt, destpt)
{

	var bv_SessionIDValue = getURLParameter('BV_SessionID');
	var bv_EngineIDValue = getURLParameter('BV_EngineID');
	
	// Get the Date
	var date = jQ("input[name='JDate1']").val();		
	var hdnMonth = date.split('/')[1];// Get the month	
	var hdnDay = date.split('/')[0];// Get the Date	
	var hdnYear = date.split('/')[2];// Get the year	

	var quota = jQ("select[name='quota']").val();

	
	var url = "/cgi-bin/bv60.dll/irctc/booking/PlannerAjaxAction.do";	
	
	var getParams = {'BV_SessionID':bv_SessionIDValue,
		'BV_EngineID':bv_EngineIDValue ,
		'AVaction':true,
		'hdnTrnNo':trnNo,
		'hdnDay':hdnDay,
		'hdnMonth':hdnMonth,
		'hdnYear':hdnYear,
		'hdnClasscode':clscode,
		'fromStation':boardpt,
		'toStation':destpt,
		'hdnQuota':quota
	};	
	
	jQ.get(url, getParams, function(data)
	{	
		if( data.length == 0)
		{
			//jQ(thisRow).children(".autocomplete_text_busy").removeClass().addClass("boldFourteen").html("Error");				
		}
		else
		{
			trainRowStatus = jQ("td[id*='trainNo']:contains("+trnNo+")").parents("tr:first").find(".statusResults");
			trainRowStatus.find(".ajaxLoadStatus").remove();
			//alert( data.split("<<")[0] );
			var i = 1; 
			jQ(data.split("<<")[0].split("|") ).each( function()
			{
				if(i%2 == 0)
				{
					colorCode = '#e7f4fd';
				}
				else
				{
					colorCode = '#fff';
				}
				
				var statusText = this;				
				statusText = statusText.replace("&", "&nbsp;-&nbsp;");				
				statusInnerDiv = jQ("<div style='background-color:"+colorCode+";padding-left:50px;>"+statusText+"</div>");				
				trainRowStatus.append( statusInnerDiv );				
				 if( i++ >= defaultAvailDays)
					return false;			 
			});
		}
	});
}

unsafeWindow.jQ = jQ;

function IRCTCSettings()
{
	mySpan=document.createElement('span');
	mySpan.id='settingsSpan';		
	document.body.appendChild(mySpan);
	mySpan.setAttribute("style", "position:fixed; width:100%; height: 100%; z-index:101; left: 0; top: 0; background-color: #D9E6F7; opacity:.75; display:none;");			
	var myDiv = document.createElement('div');
	myDiv.id = 'settingsDiv';

	myDiv.setAttribute("style","position:fixed; width:650px; height: 420px; z-index: 102; background-color: #444; border:2px solid #0ad; text-align:center; display:none;font-family:verdana;font-weight:bold;-moz-border-radius: 10px;-webkit-border-radius: 10px;");
	document.body.appendChild(myDiv);
	myDiv.innerHTML="<span style='font-size:18px; color:white; line-height:35px;'>IRCTC Availability Script Settings</span><br/><br/>\
	<div style='padding-left:55px; font-size:10pt;line-height:22px;height:320px;'>\
		<form name='defSettingsForm' id='defSettingsForm'>\
		<div id='innerDiv1' style='float:left;text-align:left; background:#000;color:#fff;padding:16px; width:510px; height:290px;-moz-border-radius: 5px;-webkit-border-radius: 5px;'>\
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
		<label style='display:inline-block; width:95px; height:30px;'>Quota:</label> <select name='defQuota' id='defQuota'>\
			<option value='GN' id='GN'>General</option>\
			<option value='CK' id='CK'>Tatkal</option>\
			<option value='LD' id='LD'>Ladies</option>\
			</select><br/>\
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
		GM_setValue("defaultQuota", document.getElementById('defQuota').value );		
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
	
	document.getElementById( GM_getValue("defaultQuota","GN") ).selected = true;	
	
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
	settingsLink.css({'color':'#f2ff22', 'font-weight':'bold', 'font-size':'10px', 'padding':'3px', 'text-decoration':'underline'});
	settingsLink.click(IRCTCSettings);		
	jQ(".boxHead .heading").append(settingsLink);

	//Set default values according to user settings.
	jQ("select[name='ticketType']").val( defaultTicketType);
	
	if( jQ("select[name='classCode'] option:selected").val() == "")
	{
		jQ("select[name='classCode'] option:contains("+defaultClass+")").attr("selected", true);//Select default class
	}

	jQ("select.planCombo option[value='"+defaultQuota+"']").attr("selected", true);//Select default quota	
	
	
	if( jQ("input[name='stationFrom']").val() == "" || jQ("input[name='stationFrom']").val().match('Enter') )
	{
		jQ("input[name='stationFrom']").val(defaultFromStation).css("color", "#333");
	}

	if( jQ("input[name='stationTo']").val() == "" || jQ("input[name='stationTo']").val().match('Enter') )	
	{	
		jQ("input[name='stationTo']").val(defaultToStation).css("color", "#333");	
	}
}



GM_registerMenuCommand("IRCTC Availability Status Settings", IRCTCSettings);
