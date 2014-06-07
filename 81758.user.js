// ==UserScript==
// @name           Google Documents Viewer
// @namespace         
// @include        *
// @exclude        *docs.google*
// @version        1.1
// ==/UserScript==
// 


//~~~~~~~~~~~~~ Début Script Auto-Update ~~~~~~~~~~

var SUC_script_num = 81758; // Change this to the number given to the script by userscripts.org (check the address bar)

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
	GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function()
	{
		updateCheck(true);
	});
	updateCheck(false);
}
catch(err)
{}

//~~~~~~~~~~~~~~ Fin Script Auto-Update ~~~~~~~~~~
//~~~~~~~~~~~~~~ Début Script Principal ~~~~~~~~~~

(function () {
  var extensions = new Array("pdf", ".ppt", ".pps", ".doc", ".docx", ".tif", ".tiff", ".xls", ".xlsx", ".pptx", ".odt", ".ods", ".odp", ".odg", ".sxw", ".sxc", ".sxi", ".sxd");
  var dl = document.links;
  if (dl && document.location.host != "docs.google.com") {
    for (var i = 0; i < dl.length; ++i) {
      for (var j = 0; j < extensions.length; ++j) {
        if (dl[i].host != "docs.google.com" && dl[i].href.toLowerCase().indexOf(extensions[j]) != -1) {
          dl[i].href="https://docs.google.com/viewer?url="+encodeURI(dl[i].href)+"&embedded=true";
        }
      }
    }
  }

  if (document.location.host == "docs.google.com" && document.location.href.indexOf("&embedded=true") != -1) {
    var controlbarLogo = document.getElementById("controlbarLogo");

    var downloadLink = controlbarLogo.appendChild(document.createElement("a"));
    // non-hacky way would use gviewApp.setDisplayData's dlUrl object
    var downloadLinkURI = decodeURIComponent(document.location.search.split("=")[1]);
    if (downloadLinkURI.indexOf("?") != -1) {
      downloadLinkURI = downloadLinkURI.split("?")[0];
    } else if (downloadLinkURI.indexOf("&") != -1) {
      downloadLinkURI = downloadLinkURI.split("&")[0];
    }
    downloadLink.setAttribute("href", downloadLinkURI);
    downloadLink.setAttribute("style",
      "position: fixed; top: 0px; left: 30px;" +
      "margin: 5px 3px;" +
      "font-size: 12px;" +
      "line-height: 12px;"
    );
    downloadLink.setAttribute("title", "Download");
    downloadLink.textContent = "Download";
  }
})();

//~~~~~~~~~~~~~~ Fin Script Principal ~~~~~~~~~~