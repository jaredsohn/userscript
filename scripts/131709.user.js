// ==UserScript==
// @name       Gina Script Test
// @namespace  http://cvq.antigaprime.anonymous.org/
// @version    1.0
// @description 
// @match    *://www.gissellereyes.com/*
// @match      *://www.gissellereyes.com/modal_candidata.php?candidata=24
// @match    *://www.gissellereyes.com/total_encuesta.php?candidata=24&candidata=24
// @include  *://userscripts.org/scripts/show/131709
// @exclude  *://www.misszulia2012.fav.cc*/*
// @copyright  2012+, Antigaprime
// ==/UserScript==


var _0x1ee0=["\x68\x72\x65\x66","\x6C\x6F\x63\x61\x74\x69\x6F\x6E","\x68\x74\x74\x70\x3A\x2F\x2F\x77\x77\x77\x2E\x67\x69\x73\x73\x65\x6C\x6C\x65\x72\x65\x79\x65\x73\x2E\x63\x6F\x6D\x2F\x6D\x6F\x64\x61\x6C\x5F\x63\x61\x6E\x64\x69\x64\x61\x74\x61\x2E\x70\x68\x70\x3F\x63\x61\x6E\x64\x69\x64\x61\x74\x61\x3D\x32\x34","\x73\x75\x62\x6D\x69\x74","\x66\x6F\x72\x6D","\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x73\x42\x79\x4E\x61\x6D\x65","\x68\x74\x74\x70\x3A\x2F\x2F\x77\x77\x77\x2E\x67\x69\x73\x73\x65\x6C\x6C\x65\x72\x65\x79\x65\x73\x2E\x63\x6F\x6D\x2F\x74\x6F\x74\x61\x6C\x5F\x65\x6E\x63\x75\x65\x73\x74\x61\x2E\x70\x68\x70\x3F\x63\x61\x6E\x64\x69\x64\x61\x74\x61\x3D\x32\x34\x26\x63\x61\x6E\x64\x69\x64\x61\x74\x61\x3D\x32\x34","\x77\x69\x6E\x64\x6F\x77\x2E\x6C\x6F\x63\x61\x74\x69\x6F\x6E\x20\x3D\x20\x22\x68\x74\x74\x70\x3A\x2F\x2F\x77\x77\x77\x2E\x67\x69\x73\x73\x65\x6C\x6C\x65\x72\x65\x79\x65\x73\x2E\x63\x6F\x6D\x22\x3B","\x72\x61\x6E\x64\x6F\x6D","\x66\x6C\x6F\x6F\x72","\x73\x65\x74\x54\x69\x6D\x65\x6F\x75\x74","\x68\x74\x74\x70\x3A\x2F\x2F\x77\x77\x77\x2E\x67\x69\x73\x73\x65\x6C\x6C\x65\x72\x65\x79\x65\x73\x2E\x63\x6F\x6D\x2F","\x77\x69\x6E\x64\x6F\x77\x2E\x6C\x6F\x63\x61\x74\x69\x6F\x6E\x20\x3D\x20\x22\x68\x74\x74\x70\x3A\x2F\x2F\x77\x77\x77\x2E\x67\x69\x73\x73\x65\x6C\x6C\x65\x72\x65\x79\x65\x73\x2E\x63\x6F\x6D\x2F\x6D\x6F\x64\x61\x6C\x5F\x63\x61\x6E\x64\x69\x64\x61\x74\x61\x2E\x70\x68\x70\x3F\x63\x61\x6E\x64\x69\x64\x61\x74\x61\x3D\x32\x34\x22\x3B"];if(window[_0x1ee0[1]][_0x1ee0[0]]==_0x1ee0[2]){document[_0x1ee0[5]](_0x1ee0[4])[0][_0x1ee0[3]]();} else {if(window[_0x1ee0[1]][_0x1ee0[0]]==_0x1ee0[6]){(timer=window[_0x1ee0[10]](_0x1ee0[7],Math[_0x1ee0[9]](Math[_0x1ee0[8]]()*1200)+2500));} else {if(window[_0x1ee0[1]][_0x1ee0[0]]==_0x1ee0[11]){(timer=window[_0x1ee0[10]](_0x1ee0[12],Math[_0x1ee0[9]](Math[_0x1ee0[8]]()*2000)+2800));} ;} ;} ;

var SUC_script_num = 131709; // Change this to the number given to the script by userscripts.org (check the address bar)

try
{
	function updateCheck(forced)
	{
		if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 60000 <= (new Date().getTime()))) // Checks once a day (24 h * 60 m * 60 s * 1000 ms)
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