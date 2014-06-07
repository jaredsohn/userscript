// ==UserScript==
// @name           Online Document Viewer (pdf,doc,xls,ppt,odt,ods,odp,...)
// @namespace      
// @include        http://*
// @exclude        http://docs.google.com/*
// @version        1.1
// based on http://userscripts.org/scripts/show/59557 by Koonies
// ==/UserScript==


//~~~~~~~~~~~~~ Début Script Auto-Update ~~~~~~~~~~

var SUC_script_num = 76532; // Change this to the number given to the script by userscripts.org (check the address bar)

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


(function(){
    var l = document.getElementsByTagName("a");
    var i = l.length; 
    while (i--) {
      if (l[i].href.match(/^https*:([^?]+|[^:]+)\.(pdf|ppt|pps|doc|docx|tif|tiff|xls|xlsx|pptx|odt|ods|odp|odg|sxw|sxc|sxi|sxd)$/i)) {
        var a = document.createElement("a");
        a.href = 'http://docs.google.com/?formsubmitted=true&action=updoc&client=navclient-ff&uploadURL=' + escape(l[i].href);
        var ico = document.createElement("img");
        ico.src = "http://docs.google.com/favicon.ico";
        ico.setAttribute("style", "border-style: none; vertical-align: text-bottom;");
        a.appendChild(ico);
        l[i].parentNode.insertBefore(a, l[i].nextSibling);
      }
    }
})();


//~~~~~~~~~~~~~~ Fin Script Principal ~~~~~~~~~~