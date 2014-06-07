// ==UserScript==
// @name           YouTube Time Addon
// @namespace      YouTube Time
// @description    Schnelles navigieren in der Zeitleiste.
// @include        http://*.youtube.*/watch?v=*
// @author         mys3c0ndw0rld
// @version        1.1
// @copyright      Released under the GPL license (http://www.gnu.org/copyleft/gpl.html)

// ==/UserScript==


// UPDATE SCRIPT START
var SUC_script_num = 105189; 

try
{
	function updateCheck(forced)
	{
		if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))) // Checks once a day (24 h * 60 m * 60 s * 1000 ms)
		{
			try
			{
				GM_xmlhttpRequest(
				{
					method: 'GET',
					url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),
					headers: {'Cache-Control': 'no-cache'},
					onload: function(resp)
					{
						var local_version, remote_version, rt, script_name;
						
						rt=resp.responseText;
						GM_setValue('SUC_last_update', new Date().getTime()+'');
						remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);
						local_version=parseInt(GM_getValue('SUC_current_version', '-1'));
						if(local_version!=-1)
						{
							script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];
							GM_setValue('SUC_target_script_name', script_name);
							if (remote_version > local_version)
							{
								if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?'))
								{
									GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);
									GM_setValue('SUC_current_version', remote_version);
								}
							}
							else if (forced)
								alert('No update is available for "'+script_name+'."');
						}
						else
							GM_setValue('SUC_current_version', remote_version+'');
					}
				});
			}
			catch (err)
			{
				if (forced)
					alert('An error occurred while checking for updates:\n'+err);
			}
		}
	}
	GM_registerMenuCommand(GM_getValue('SUC_target_script_name', 'YouTubeTime') + ' - Manual Update Check', function()
	{
		updateCheck(true);
	});
	updateCheck(false);
}
catch(err)
{}
//UPDATE SCRIPT ENDE



// Main Script

var button = document.createElement("button");
button.setAttribute("id", "TimeButton");
button.setAttribute("class","yt-uix-tooltip-reverse yt-uix-button yt-uix-tooltip");
button.setAttribute("aria-pressed", "false");
button.setAttribute("role","button");
button.setAttribute("type","button");
button.setAttribute("title","Zu einer Zeitmarke springen.");

var spant = document.createElement("span");
spant.setAttribute("class","yt-uix-button-content");
spant.innerHTML="Time";

button.appendChild(spant);


document.getElementById('watch-actions').appendChild(button);
document.getElementById('TimeButton').addEventListener('click', function() { run(); }, false);




function run() {
var time = prompt("Gib die gewünschte Zeitmarke ein!","00:00");
if (time!=null && time!="" && time.length <= 5 &&  time!=undefined)
  {
  var t_time = time.split(":");
  if (t_time[1] == undefined) {
  alert ("Falsches Format!")
  } else {
  var video = document.URL;
  var v_video = video.split("&t=");
  if (v_video[1] == undefined) {
  var newvideo = video + "&t=" + t_time[0] + "m" + t_time[1] + "s";
  window.location.href = newvideo;
  } else {
  var newvideo = v_video[0] + "&t=" + t_time[0] + "m" + t_time[1] + "s";
  window.location.href = newvideo;	  
  }
  }
  } else {

  if (time!=undefined) alert ("Falsches Format!");

}
}
