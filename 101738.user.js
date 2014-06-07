// Greasemonkey script...
// Provides a mechanism to flag Kiva loans (on the Lend page) based upon 
// who the MFI partner is that's supporting the loan, and whether that MFI
// partner is on a black or white list.
//
// Check out http://www.kiva.org
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Kiva MFI Checker", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           Kiva MFI Checker - Beta
// @namespace      http://www.intfar.com/kivamfichecker
// @include        http://*.kiva.org/lend*
// @exclude        http://*.kiva.org/lender*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @description    Highlights Kiva.org loan entries (on the Lend page) based upon the associated lender partner id, and a white/black list to match them against.
// @version        0.82
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_xmlhttpRequest
// @grant          GM_info
// ==/UserScript==
// @author         Chris Means (cmeans@intfar.com)
// @history        0.1 Initial implementation.
//                 0.2 Introduction of List and Type selection controls.
//                 0.3 Added config.defList option to set the default MFI entry.
//                 0.31 Added back-in lost @require for jQuery v1.3.2.
//                 0.4 Minor bug fixes, and introduction of support for getMFIId function for each MFI entry.
//                     Allowing for a custom list parsing routine.
//                 0.5 Added example using a filtered Google query using the Social MFI List.
//                 0.6 Adjusted JavaScript for changes in the Kiva JSON structures.
//                 0.61 Added Script Update Checker (http://userscripts.org/scripts/show/20145), to handle automated client script updates. 
//                 0.62 Improved initial load handling to deal with a slower UI load.
//                 0.63 Adjusted for changes in the Kiva Lend page UI CSS.
//                 0.7 All new MFI source lists
//                 0.71 Handler fixes as the source lists are filtered and only return MFI Ids.
//                 0.72 Fix for documentation.
//                 0.73 Fix for problem with code update.
//                 0.74 Removed auto-code update (bug with userscripts.org upload process).
//                 0.75 Added a Set Defaults button which saves the current settings, and a Help button.
//                 0.76 Reenabled auto-code update.
//                 0.77 Adjusted Google Spreadsheet filters to new layout requirements.
//                 0.78 Another adjustment for the Google Spreadsheet filters due to layout changes.
//                 0.79 Final adjustments prior to public release...slight List name changes, and setting White-list as default type.
//                 0.80 Adjustments to move from list of MFI ids to the MFI names. 20120909.
//                 0.81 Namespace and a few other minor improvements. 20120909.
//                 0.82 Adjustments to the mfiLists url query to properly match current AASFSHNR MFI list. 20120915.
//
// --------------------------------------------------------------------

// Update Checking...don't change this...
var SUC_script_num = 101738; 
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}

//
// ** How to configure this script to your own needs/preferences **
//
// Modify the "mfiLists" array to add or remove the lists you want available,
// and the settings that each should have.
// The first entry will be the default.
//
// The referenced URL is (by default) expected to return a comma delimited list of items, with
// the second item being an MFI Id.  This Id value is extracted and added to an internal list.

//
// Configuration section.
//

// MFI Lists Settings:
//
// This is an array of list source options.
//
// Each list consists of:
//
// name:	The list name to display.
// url:		The source URL for the list.
// type:	Whether the list (by default) should be treated as a "Black-list" or "White-list".
// getMFIId: [Optional] Function to provide custom parsing for each row of data returned from the "url".
//

// Make the initialization of the mfiLists a little easier, and pull this root URL & query string out.
var atheistsRootUrl = "https://spreadsheets.google.com/tq?key=0AhfuHQgSfgERdDhUOW9jajFUSWFiang0eXVlSGI3YVE&authkey=CK36kZMN&tqx=out:csv&gid=1";

var mfiLists = 
[
	{
		// Purpose: Secular MFI (whitelist) – secular rating of 4 (select C where G=4).
		// Maintainer: http://www.kiva.org/team/atheists
		name: "Top Secular",
		url: atheistsRootUrl + "&tq=" + encodeURI("select C where G=4"),
		type: "White-list",
		getMFIId: function(line)
		{
			return line.substring(1, line.length - 1);
		}
	},
	{
		// Purpose: Secular loan policy (whitelist) – secular rating of 3-4 (select C where G>2).
		// Maintainer: http://www.kiva.org/team/atheists
		name: "Generally Secular",
    		url: atheistsRootUrl + "&tq=" + encodeURI("select C where G>2"),
		type: "White-list",
		getMFIId: function(line)
		{
			return line.substring(1, line.length - 1);
		}
	},
	{
		// Purpose: Social Initiatives (whitelist) – social rating of 4 (select C where J=4).
		// Maintainer: http://www.kiva.org/team/atheists
		name: "Top Social Focus",
		url: atheistsRootUrl + "&tq=" + encodeURI("select C where J=4"),
		type: "White-list",
		getMFIId: function(line)
		{
			return line.substring(1, line.length - 1);
		}
	},
	{
		// Purpose: Social goals (whitelist) – social rating of 3-4 (select C where J>2).
		// Maintainer: http://www.kiva.org/team/atheists
		name: "Social Efforts",
		url: atheistsRootUrl + "&tq=" + encodeURI("select C where J>2"),
		type: "White-list",
		getMFIId: function(line)
		{
			return line.substring(1, line.length - 1);
		}
	},
	{
		// Purpose: Top Secular/Social  (whitelist) – combined rating of 4 (secular rating of 4, social rating of 4) (select C where G=4 and J=4)
		// Maintainer: http://www.kiva.org/team/atheists
		name: "Top Secular/Social",
		url: atheistsRootUrl + "&tq=" + encodeURI("select C where G=4 and J=4"),
		type: "White-list",
		getMFIId: function(line)
		{
			return line.substring(1, line.length - 1);
		}
	},
	{
		// Purpose: Generally Secular/Social (whitelist) – combined rating of 3-4 (secular rating of 3-4, social rating of 3-4) (select C where G>2 and J>2)
		// Maintainer: http://www.kiva.org/team/atheists
		name: "Generally Secular/Social",
		url: atheistsRootUrl + "&tq=" + encodeURI("select C where G>2 and J>2"),
		type: "White-list",
		getMFIId: function(line)
		{
			return line.substring(1, line.length - 1);
		}
	}
	/*
	,{
		// Purpose: Social MFI (filtered)
		// Maintainer: http://www.kiva.org/team/atheists
		// Help:  This example shows Google spreadsheet features:
		//        Only MFIs with a Risk of 4 or more will be returned.
		//        Only returns the MFI name field.
		// SQL:   select C where D>3 becomes select%20C%20where%20D%3E3
		// See: http://code.google.com/apis/visualization/documentation/querylanguage.html#Setting_the_Query_in_the_Data_Source_URL
		name: "Social [Risk > 3]",
		url: atheistsRootUrl + "&tq=" + encodeURI("select C where D>3"),
		type: "White-list",
		getMFIId: function(line)
		{
			return line.substring(1, line.length - 1);
		}
	}
	*/
];

// Config Settings:
//
// defList:	The (0 based) numerical entry to select from the "mfiLists" array by default.
// flag:	This is how the loan entry display is modified to show that it's being flagged.

var config = 
{

	defList: 1,

	// Flag the whole loan block.
	flag: function(element) { element.parent().parent().css('background-color', 'black'); }
};

//
// End Configuration section.
//

//
// Initialization section.
//

//unsafeWindow.mfiLists = mfiLists;

unsafeWindow.mfiChecker = 
	{
		mfiLists: mfiLists, 
		config : config
	};

var loadCount = 0;

function onLoadComplete()
{
	if (++loadCount < mfiLists.length)
	{
		return;
	}

	var listSource = GM_getValue("listSource");
	var listType = GM_getValue("listType");

	if (listSource == null || listType == null)
	{
		listSource = config.defList;
		listType = mfiLists[config.defList].type;
	}

	$('#kivaMFICheckerListSource').val(listSource);
	$('#kivaMFICheckerListType').val(listType);

	// Force the list to update.
	unsafeWindow.updateListings();
}

function onload(response)
{
	var mfiEntry = mfiLists[this.index];

	var lines = response.responseText.split('\n');

	var partnerIds = [];
	
	for (var i = 1; i < lines.length; i++)
	{
		var mfiId;
		
		if (mfiEntry.getMFIId)
		{
			mfiId = mfiEntry.getMFIId(lines[i]);
		}
		else
		{
			// Assumes "," delimited list with MFI Id in second column.
			mfiId = lines[i].split(/,(?=(?:[^\"]*\"[^\"]*\")*(?![^\"]*\"))/)[1];
		}
		
		mfiId = $.trim(mfiId);
		
		if (   (mfiId != "") 
			&& (mfiId != "null"))
		{
			partnerIds.push(mfiId);
		}
	}

	//partnerIds.sort(function(x,y) { return x - y; });
	
	unsafeWindow.mfiChecker.mfiLists[this.index].partnerIds = '.' + partnerIds.join('.') + '.';

	var option = $(document.createElement("option"))
		.val(this.index)
		.text(mfiEntry.name + " (" + partnerIds.length + ")");
	$('#kivaMFICheckerListSource').append(option);

	onLoadComplete();
}

for (var index in mfiLists)
{
	GM_xmlhttpRequest({
  		method: "GET",
  		url: mfiLists[index].url,
  		onload: onload,
		index: index
	});
}

//
// Setup the user interface bar (status, source & type selection user controls).
//

var ui = [];

ui.push("<label style='float: left' title='" + GM_info.script.name + " v" + GM_info.script.version + " by Chris Means'>MFI Checker: <span id='kivaMFIChecker_count'>? loans</span> flagged on this page</label>");
ui.push("<button id='kivaMFICheckerHelp' title='Help for the Kiva MFI Checker'>?</button>");
ui.push("<button id='kivaMFICheckerSetDefault' style='float: right' title='Set the current List and Type selections as the default'>Set Default</button>");
ui.push("<label>Type:&nbsp;<select id='kivaMFICheckerListType' title='Select how the list is treated'><option>White-list</option><option>Black-list</option></select></label>");
ui.push("<label>List:&nbsp;<select id='kivaMFICheckerListSource' title='Select the list of MFIs'></select>&nbsp;&nbsp;</label>");

var div = document.createElement("form");
div.className = "boxCap";
div.innerHTML = ui.join("");
$('#listingsForm').after(div);

$('#kivaMFICheckerSetDefault').click(function()
{
	GM_setValue("listSource", $("#kivaMFICheckerListSource").val());
	GM_setValue("listType", $("#kivaMFICheckerListType").val());

	alert("Default set to: " + mfiChecker.mfiLists[$("#kivaMFICheckerListSource").val()].name + " as a " + $("#kivaMFICheckerListType").val());

	return false;
});
$('#kivaMFICheckerHelp').click(function()
{
	window.open('http://userscripts.org/topics/72843', '_blank');

	return false;
});

//
// Setup the functional code.
//

var code = [];

code.push("$('#kivaMFICheckerListType').ajaxStop(");
code.push("	function() ");
code.push("	{ ");
code.push("		var flagged = 0;");
code.push("		if (!mfiChecker.mfiLists[$('#kivaMFICheckerListSource').val()]) return;");
code.push("		var partnerIds = mfiChecker.mfiLists[$('#kivaMFICheckerListSource').val()].partnerIds; ");
code.push("		jQuery.each(");
code.push("			$('div.mfi'), ");
code.push("			function (i, obj)"); 
code.push("			{ ");
code.push("				var elem = $(obj);");
code.push("				if ($('#kivaMFICheckerListType').val() == 'Black-list') ");
code.push("				{");
code.push("					// It's a blacklist.");
code.push("					if (partnerIds.indexOf('.' + elem.text().substring(12) + '.') != -1) { mfiChecker.config.flag(elem); flagged++;}");
code.push("				}");
code.push("				else ");
code.push("				{");
code.push("					// It's a whitelist.");
code.push("					if (partnerIds.indexOf('.' + elem.text().substring(12) + '.') == -1) { mfiChecker.config.flag(elem); flagged++;}");
code.push("				}");
code.push("			});");
code.push("		// Update the controller panel.");
code.push("		$('#kivaMFIChecker_count').html('' + flagged + ' loan' + ((flagged == 1) ? '' : 's'));");
code.push("	});");

// Code to handle List changes.
code.push("$('#kivaMFICheckerListSource').change(function(){ $('#kivaMFICheckerListType').val(mfiChecker.mfiLists[$('#kivaMFICheckerListSource').val()].type); updateListings(); });");

// Code to handle Type changes.
code.push("$('#kivaMFICheckerListType').change(function(){ updateListings(); });");

var script = document.createElement("script");
script.type = "text/javascript";
script.innerHTML = code.join("\n");
$("body").append(script);
