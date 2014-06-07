// ==UserScript==
// @name           ytVideosPager
// @namespace      lonely.soul
// @description    Creates direct paging links below user's videos. in pre-AJAX days you could simply modify url to go to desired page but that is gone now since YouTube has implemented ajax.
// @include        http://*.youtube.com/profile?user=*&view=videos*
// ==/UserScript==

/****************************************************************************************************************************************************/
var version_scriptNum = 36355; // Change this to the number given to the script by userscripts.org (check the address bar)
var version_timestamp = 1203221923859; // Used to differentiate one version of the script from an older one. Use the Date.getTime() function to get a value for this.

function updateCheck(forced)
{
	if ((forced) || (parseInt(GM_getValue("lastUpdate", "0")) + 86400000 <= (new Date().getTime()))) // Checks once a day (24 h * 60 m * 60 s * 1000 ms)
	{
		try
		{
			GM_xmlhttpRequest(
			{
				method: "GET",
				url: "http://userscripts.org/scripts/review/" + version_scriptNum + "?" + new Date().getTime(),
				headers: {'Cache-Control': 'no-cache'},
				onload: function(xhrResponse)
				{
					GM_setValue("lastUpdate", new Date().getTime() + "");
					var rt = xhrResponse.responseText.replace(/&nbsp;?/gm, " ").replace(/<li>/gm, "\n").replace(/<[^>]*>/gm, "");
					var scriptName = (/@name\s*(.*?)\s*$/m.exec(rt))[1];
					GM_setValue("targetScriptName", scriptName);
					if (parseInt(/version_timestamp\s*=\s*([0-9]+)/.exec(rt)[1]) > version_timestamp)
					{
						if (confirm("There is an update available for the Greasemonkey script \"" + scriptName + ".\"\nWould you like to go to the install page now?"))
							{GM_openInTab("http://userscripts.org/scripts/show/" + version_scriptNum);}
					}
					else if (forced)
						{alert("No update is available for \"" + scriptName + ".\"");}
				}
			});
		}
		catch (err)
		{
			if (forced)
				{alert("An error occurred while checking for updates:\n" + err);}
		}
	}
}
GM_registerMenuCommand(GM_getValue("targetScriptName", "???") + " - Manual Update Check", function() {updateCheck(true);});
updateCheck(false);
/****************************************************************************************************************************************************/


var total = 1;
var _id="";

var a =$("*[@id]").filter(function() {
    //var regex = /^user_videos-\d{1,}-head/;
    var regex = /^user_videos-head/;
    if ($(this).attr('id').match(regex) != null)
    {
        return $(this);
    }
});

_id = $(a).attr('id');

var b="div#" + _id + " > span[name='channel-box-item-count']";

total = total * $(b).html();

var idStart=location.href.indexOf('user=') + 5;
var idLength=location.href.indexOf('&');

//alert(location.href.substring(idStart,idLength));
var _uid= location.href.substring(idStart,idLength);
//_id.substring(12);
//_uid = _uid.substring(0, _uid.indexOf('-'));

var pages = Math.floor(total / 20);

if ( pages%20 > 0)
 pages +=1;
//pages = pages + ((total - pages)/20);

//get_page(box_id, start, num, view_all_mode, opt_sort, opt_query)
var txt="<div id='myPager' class='profile-box box-body normalText' style='width:90%;margin-left:4%;white-space:normal;'>";
//var lnk = " <a onclick=\"get_page('user_videos', 20, 20, 'videos', 'True', 'p'); return false;\">1</a> ";
var lnk = ""; //"<a onclick=\"get_page('user_videos'" /*+ _uid*/ + "', 0, 20, 'True', 'p'); return false;\" href='#'>1</a> ";
//var len=3;

for(i=1;i<=pages;i++)
{
    //lnk = lnk + " <a onclick=\"get_page('user_videos', " + (i * 20) + ", 20, 'videos', 'True', 'p'); return false;\" title='Goto Page [" +
    //            i + "']>" + i + "</a> ";
	lnk = lnk + " <a onclick=\"get_page('user_videos" /*+ _uid */+ "', " + (i * 20) +
			", 20, 'True', 'p'); return false;\" href='#' title='Goto Page [" +
			i + "]'>" + i + "</a> ";
}

txt = txt + lnk + "</div>";

var mainDiv= "div#baseDiv"; //"div#user_videos-body";
$(mainDiv).append(txt);
