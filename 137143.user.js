// ==UserScript==
// @name        Better akibahobby
// @namespace   'vinsai'
// @description One click to show all full size images in http://akibahobby.net
// @include     http://akibahobby.net/*.html
// @version     1.0
// ==/UserScript==
(function()
{
	var css =
		'<style type="text/css">\n\
		img {margin: 5px auto;}\n\
		#content {text-align:center;}\n\
		.article_body_caption {background-color:rgb(238,238,255);}\n\
		body {background-color:rgb(248,248,248);font-family:"メイリオ",Meiryo;}\n\
		</style>\n';
	
	var target = document.getElementsByClassName('article_header_image');
	if (target != null) {
		var append = '<span id="showAllImages" style="border:1px solid rgb(190,202,215);background:#FCFCFC;padding:2px;cursor:pointer;width:100px;">&gt;&nbsp;画像を一覧で見る</span>';
		target.item(0).parentNode.getElementsByTagName('span').item(0).insertAdjacentHTML('beforeBegin', append);
		
		document.getElementById('showAllImages').onclick = function() {
			var bodyNode = document.getElementsByClassName('textBody');
			if (bodyNode == null) return;
			
			var i = 0;
			var title ="アキバHOBBY";
			var headerImage ="";
			var description =" ";
			var newPage = "";
						
			// find images and description
			for (; i < bodyNode.item(0).childNodes.length; ++i) {
				var node = bodyNode.item(0).childNodes.item(i);

				if (node.className == 'article_body_image') {
					var im = node.getElementsByTagName('img');
					for (var j = 0; j < im.length; ++j) {
						var src = im.item(j).src.replace("s.", ".");
						newPage += '<div class="article_body_image"><a target="_blank" href="' + src + '"><img src="' + src + '"></a></div>\n';
					}
					
					var embed = node.getElementsByTagName('object');
					for (var k = 0; k < embed.length; ++k) {
						newPage += '<br>' + embed.item(k).innerHTML + '<br>';
					}
				}
				else if (node.className == 'article_body_caption') {
					newPage += '<span class="article_body_caption">' + node.innerHTML + '</span>\n';
				}
				else if (node.className == 'article_header_image') {
					headerImage = '<div class="article_header_image">' + node.innerHTML + '</div>\n';
					if (node.getElementsByClassName("article_header_caption_short").length > 0) {
						title = node.getElementsByClassName("article_header_caption_short").item(0).textContent;
					}
				}
				else if (node.className == ('article_header_caption_large')) {
					title = node.textContent;
				}
				else if (node.className == ('article_header_text_large')) {
					description= '<span class="article_header_text_large">' + node.innerHTML + '</span>\n';
				}
			}

			newPage += "<div>\n</body>\n</html>";
			
			var prePage = "<html>\n<head>\n<meta charset='utf-8'>\n<title>";
			prePage += title;
			prePage += '</title>\n'  + css + '</head>\n<body>\n';
			prePage += '<div id="content">\n'
			prePage += headerImage;
			prePage += '<div class="article_header_caption_large"><strong>' + title +'</strong></div>';
			prePage += description;
			
			newPage = prePage + newPage;
	
			var uriContent = "data:text/html;charset=utf-8," + encodeURIComponent(newPage);
			window.open(uriContent);
		};
	}
})();

//===============================================================================
//			- Weekly Auto-Update Check -
//===============================================================================
// CheckForUpdate() will verify if the time has come to look if an update is available.
// CheckVersion() will verify if this script version is the latest available.
//===============================================================================
var script_title = "Better akibahobby";
var source_location = "http://userscripts.org/scripts/source/137143.user.js";
var current_version = "1.0";
var latest_version = " ";
var gm_updateparam = "Better_akibahobby_lastupdatecheck";
var lastupdatecheck = GM_getValue(gm_updateparam, "never");

// a google document is used to store the latest version number (If the version in that file does not match the current_version variable, an update will be triggered)
var version_holder = "http://dl.dropbox.com/u/4978696/userscripts/Better_akibahobby.txt";

//Add a command to the menu in case someone wants to manually check for an update.
GM_registerMenuCommand("Better akibahobby->Manually Update", CheckVersion);

//Initiate the download of the new script version.
function GetNewVersion() {
        var today = new Date();
        GM_setValue(gm_updateparam, String(today));
        window.location = source_location;
}

//Verify if it's time to update
function CheckForUpdate()
{	
	var today = new Date();
	var one_day = 24 * 60 * 60 * 1000; //One day in milliseconds

	if(lastupdatecheck != "never")
	{
		today = today.getTime(); //Get today's date
		var lastupdatecheck = new Date(lastupdatecheck).getTime();
		var interval = (today - lastupdatecheck) / one_day; //Find out how much days have passed		

		//If a week has passed since the last update check, check if a new version is available
		if(interval >= 7)			
			CheckVersion();
	}
	else
		CheckVersion();
}

//Make sure we don't have the latest version
function CheckVersion()
{
	GM_xmlhttpRequest({
		    method: 'GET',
		    url: version_holder,
		    headers: {'Content-type':'application/x-www-form-urlencoded'},		    
		    onload: function(responseDetails)
			{
				var line = String(responseDetails.responseText.match(/version=[0-9].[0-9]?[0-9].[0-9]?[0-9]/));				
				
				if(line != null)
				{
					var strSplit = new Array();
					strSplit = line.split('=');					
					latest_version = strSplit[1];

					if(current_version != latest_version && latest_version != "undefined")
					{
						if(confirm("A more recent version of " + script_title + " (" + latest_version + ") has been found.\r\nWould you like to get it now?"))
							GetNewVersion();
						else
							AskForReminder();
					} 
					else if(current_version == latest_version)
						alert("You have the latest version of " + script_title + ".");
				}
				else
				{
					alert("Could not locate the version holder file.\r\nThis should be reported to the script author.\r\nThank you!");
					SkipWeeklyUpdateCheck();
				}
					
		    }
		});
}

//Ask the user to be reminded in 24 hours or only next week.
function AskForReminder()
{
	if(confirm("Would you like to be reminded in 24 hours ?\r\n(Cancel to be reminded next week only)"))
	{
		var today = new Date();
		today = today.getTime();		
		var sixdays_ms = 6 * 24 * 60 * 60 * 1000;
		var sda_ms = today - sixdays_ms;		
		var sixdaysago = new Date(sda_ms)

		//Since we check for updates after 7 days, just make it seem like the last check was 6 days ago.
		GM_setValue(gm_updateparam, String(sixdaysago));
	}
	else
		SkipWeeklyUpdateCheck();
}

//Set the next update check in seven days
function SkipWeeklyUpdateCheck()
{
	var today = new Date();
	//As if we've just updated the script, the next check will only be next week.
	GM_setValue(gm_updateparam, String(today));
}
//===============================================================================
//			- Weekly Auto-Update Check -
//===============================================================================