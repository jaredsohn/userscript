// ==UserScript==
// @name           Google+ Photos Download
// @description    Download Google+ Album using Picasa, showing all full size images in new tab
// @author         vinsai
// @updateURL      https://userscripts.org/scripts/source/135225.meta.js
// @version        1.6.0
// @include        *.google.com/*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// ==/UserScript==
var MAX_IMAGES = 30;

GM_registerMenuCommand("G+->Maximum Images", SetMax);

function SetMax() {
	var maximum = prompt("Maximum Number of Images to show:",GM_getValue(MAX_IMAGES, 30));

	maximum = parseInt(maximum, 10);
	
	GM_setValue(MAX_IMAGES, maximum);
}

function getDocHeight() {
    //utility function to find dimensions of page
    var D = document;
    return Math.max(
        Math.max(D.body.scrollHeight, D.documentElement.scrollHeight),
        Math.max(D.body.offsetHeight, D.documentElement.offsetHeight),
        Math.max(D.body.clientHeight, D.documentElement.clientHeight)
    );
}

(function()
{

	var css =
		'<style type="text/css">\n\
		img {margin: 5px auto;}\n\
		#imagesCollection {display:table-cell;vertical-align:middle;text-align:center;}\n\
		a {color:white;text-align:center;}\n\
		body {background-color:black;width:99%;height:98%;display:table;font-family:"メイリオ",Meiryo;}\n\
		</style>\n';
		
	var plainTextCSS =
		'<style type="text/css">\n\
		#imagesCollection {vertical-align:middle;text-align:left;}\n\
		a {color:white;text-align:left;}\n\
		body {background-color:black;font-family:"メイリオ",Meiryo;}\n\
		</style>\n';	
	
	var js = 
		'<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>\n\
		<script type="text/javascript">\n\
			function setMaxWidth(){\n\
				var mwidth = $(document).width()-15;\n\
				$("img").css("max-width", mwidth);\n\
			}\n\
			$(document).ready(function(){\n\
				setMaxWidth();\n\
			});\n\
			$(window).resize(function(){\n\
				setMaxWidth();\n\
			});\n\
		</script>\n';

	var append = '<div id="gplus"><div class="a-n og SlsZEc" id="PicasaDownload">Picasa</div>';

	append += '<div class="a-n og SlsZEc" id="NewPage">Full Size Images</div>';
	
	append += '<div class="a-n og SlsZEc" id="ScrollToBottom">︾</div></div>';	


//	var d = document.querySelector('#gbvg>.gbtc>.gbt');
	var d = document.querySelector('body');
	d.insertAdjacentHTML('beforeEnd', append);
	console.log($('.Koa').offset());
	console.log($('.Koa').offset().top);
	$('#gplus').css('top', 0);
	$('#gplus').css('left', $(document).width()-360);
	$('#gplus').css('position', 'fixed');
	$('#gplus').css('z-index', 1000);
	
//===============================================================================
//			- Scroll to bottom -
//===============================================================================

	var scrolling = false;
	var terminate = false;

	
	$('#ScrollToBottom').click(function(e) {
		if (scrolling == false) {
			scrolling = true;
			terminate = false;
		}
		else {
			scrolling = false;
			terminate = true;
		}
		
		var delay = 100;
		var retry = 30;
		var fail = 0;
		var top = 0;
		
		function scrollB() {
			if (terminate == false) {
				var mTop = getDocHeight() + $(window).height();

				if ( top < mTop) {
					top = mTop;
					fail = 0;
//					$(document).scrollTop(mTop);
					$('html, body').animate({scrollTop:mTop}, 200);
					setTimeout(scrollB,delay);
				}
				else if (fail < retry) {
					fail++;
					setTimeout(scrollB,delay);
				}
				else {
					scrolling = false;
				}
			}
		}
		scrollB();
	});
//===============================================================================
//			- End of Scroll to bottom -
//===============================================================================
	
//===============================================================================
//			- Picasa Download -
//===============================================================================
	$('#PicasaDownload').click(function() {
		var currentPage = location.href;

		if (currentPage.search('plus.google.com/') != -1 && currentPage.search('/photos/') != -1 && currentPage.search('/albums/') != -1) {
			var findex = currentPage.indexOf("photos");
			if (findex > 0) {
				findex += 7;
				
				var lindex = currentPage.indexOf("/albums/");
				if(lindex >0) {
					var userID
					var albumID;
					userID = currentPage.substr(findex, lindex-findex);
					findex = lindex + 8;
					lindex = currentPage.lastIndexOf("/");
					if (findex == lindex) {
						albumID = currentPage.substr(findex);
					}
					else {
						albumID = currentPage.substr(findex, lindex);
					}
					
					var picasa_dl_url = 'picasa://downloadfeed/'
					 + '?url=https://picasaweb.google.com/data/feed/back_compat'
					 + '/user/' + userID + '/albumid/' + albumID
					 + '?kind=photo&alt=rss&imgdl=1';				
					 
					window.location = picasa_dl_url;
				}
			}
		}
	});
	$('#PicasaDownload').mouseover(function() {
		var currentPage = location.href;
		
		if (currentPage.search('plus.google.com/') != -1 && currentPage.search('/photos/') != -1 && currentPage.search('/albums/') != -1) {
			$(this).find('span').css('color', '#C53727');//"rgb(197,55,39)";
		}
		else {
			$(this).find('span').css('color', '#666666');//"rgb(107,107,107)";
		}
	});
//===============================================================================
//			- End of Picasa Download -
//===============================================================================		
	
//===============================================================================
//			- Full Size images -
//===============================================================================	
	$('#NewPage').click(function() {	
		var images = $('.m-la-Kb-Z-ba>img');
		
		if (images.length <1) {
			images = $('.zMxm7c>img');
		}
		
		if (images.length <1) {
			images = $('.Waa>.tDMXke');
		}
		if (images.length <1) {
			images = $('.Mn>img');
		}
		if (images.length <1) {
			images = $('.FB>img');
		}
		
		var page = "<html>\n<head>\n<meta charset='utf-8'>\n<title>";
		page += "Google+ Images";
		if (images.length <= GM_getValue(MAX_IMAGES, 30)) {
			page += '</title>\n'  + css + js + '</head>\n<body>\n';
		}
		else {
			page += '</title>\n'  + plainTextCSS + '</head>\n<body>\n';
		}
		page += '<div id=imagesCollection>\n';

		var url = "";
		var findex = -1;
		var lindex = -1;

		images.each(function(i, image) {
			var	src = image.src;
			lindex = src.lastIndexOf("/");
			if (lindex > -1 && src.search("focus-opensocial") < 0) {
				if (src.match('=.*-p-no')) {
					url = src.replace(/=.*p-no/, '=s0');
				}
				else {
					findex = src.substr(0,lindex).lastIndexOf("/");
					if (findex > -1) {
						url = src.substr(0, findex) + "/s0" + src.substr(lindex);
					}
				}
			}
			
			if (url) {
				if (images.length <= GM_getValue(MAX_IMAGES, 30)) {
					page += '<a href="' + url + '" target="_blank"><img id="img' + i + '" src=' + url + '></a><br />\n';
				}
				else {
//						page += '<a href="' + url + '" target="_blank"><img style="width:auto;height:300px;" src=' + images.item(i).src+ '><br />' + url + '</a><br />';
					page += '<a href="' + url + '" target="_blank">' + url + '</a><br />\n';
				}
			}
        });	

		page += "</div>\n</body>\n</html>";
		
		var uriContent = "data:text/html;charset=utf-8," + encodeURIComponent(page);
		window.open(uriContent);
	});
//===============================================================================
//			- End of Full Size images -
//===============================================================================	

//===============================================================================
//			- View images -
//===============================================================================	
	var app = '<div class="a-f-e dk view" title="View images in new tap" tabindex="0" role="button">'
		+ '<img alt="Im" class="sr" src="http://cdn1.iconfinder.com/data/icons/fatcow/32x32_0500/image_add.png" style="width:16px;height:auto;" /></div>';

	$(document).off('mouseover', '.qf');
	$(document).on('mouseover', '.qf', function() {
		if ($(this).find('.Ry>.Mm').length && !$(this).find('.LI>.view').length) {
			var add = $(this).find('.LI>.rE');
			add.before(app);
			
			$(this).find('.LI>.view').click( function() {
				var page = "<html>\n<head>\n<meta charset='utf-8'>\n<title>";
				page += "Google+ Images";
				page += '</title>\n'  + css + js + '</head>\n<body>\n';
				page += '<div id=imagesCollection>\n';
		
				var url = "";
				var findex = -1;
				var lindex = -1;			
	
				var images = $(this).closest('.qf').find('.Mm').find('img').each(function(i, image) {
					src = image.src;
					lindex = src.lastIndexOf("/");
	
					if (lindex > -1 && src.search("focus-opensocial") < 0) {
						url = src.substr(0,lindex);
		
						findex = url.lastIndexOf("/");
						if (findex > -1) {
							url = src.substr(0, findex) + "/s0" + src.substr(lindex);		
							page += '<a href="' + url + '" target="_blank"><img id="img' + i + '" src=' + url + '></a><br />\n';
						}
					}                           
				});
		
				page += "</div>\n</body>\n</html>";
				
				var uriContent = "data:text/html;charset=utf-8," + encodeURIComponent(page);
				window.open(uriContent);
			});			
		}
	});

//===============================================================================
//			- End of View images -
//===============================================================================

//===============================================================================
//			- View album image -
//===============================================================================
	var ap = '<div class="downloadIt a-f-e m-la-qONoCf-Id-jNm5if fu Bchcbd" title="View in new tab" ><a  href="';
	var ap2 = '" target="_blank"><img alt="Im" src="http://cdn1.iconfinder.com/data/icons/fatcow/32x32_0500/image_add.png" style="z-index:1000;width:26px;height:auto;" /></a></div>';

	$(document).off('mouseover', '.m-la-Kb');
	$(document).on('mouseover', '.m-la-Kb', function() {
		if (!$(this).find('.downloadIt').length) {
			var t = $(this).find('.m-la-qONoCf-Id-soaiwe-b');
			
			var s = $(this).find('img').attr('src');
	
			var findex = -1;
			var lindex = -1;
			lindex = s.lastIndexOf("/");
			if (lindex > -1 ) {
				var src = s.substr(0,lindex);
	
				findex = src.lastIndexOf("/");
				if (findex > -1) {
					src = s.substr(0, findex) + "/s0" + s.substr(lindex);
				}
			}
	
			t.before(ap + src +ap2);
		}
	});
//===============================================================================
//			- End of View album image -
//===============================================================================

})();


//===============================================================================
//			- Weekly Auto-Update Check -
//===============================================================================
// CheckForUpdate() will verify if the time has come to look if an update is available.
// CheckVersion() will verify if this script version is the latest available.
//===============================================================================
var script_title = "Google+ Photos Download";
var source_location = "http://userscripts.org/scripts/source/135225.user.js";
var current_version = "1.6.0";
var latest_version = " ";
var gm_updateparam = "GoogleDownload_lastupdatecheck";
var lastupdatecheck = GM_getValue(gm_updateparam, "never");

// a google document is used to store the latest version number (If the version in that file does not match the current_version variable, an update will be triggered)
var version_holder = "http://dl.dropbox.com/u/4978696/userscripts/GooglePhotosDownloadversion.txt";

//Add a command to the menu in case someone wants to manually check for an update.
GM_registerMenuCommand("Google+ Download->Manually Update", CheckVersion);

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