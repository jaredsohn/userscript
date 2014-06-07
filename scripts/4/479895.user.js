// ==UserScript==
// @name          AoA:GE
// @namespace     http://userscripts.org/scripts/show/479895
// @include       http://age-of-aincrad.com/game/?GameUI*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require       code.jquery.com/jquery-1.4.2.min.js
// @version       1.0
// @author        Haranobu
// @grant         GM_addStyle
// ==/UserScript==

GM_addStyle ( "                                     \
body {\
    margin: 0px;\
    background: url('http://img4.wikia.nocookie.net/__cb20121223021437/swordartonline/images/4/40/Aincard_in_ALO.png') top center / 100% auto transparent !important;\
    height: 100% !important;\
}\
span{\
	font-family:aoaui;\
	color:#FFF !important;\
    font-size:30px;\
    }\
p{\
	padding-top:2px;\
	font-family:aoaui;\
	color:#FFF !important;\
    }\
#Profile_Container{\
	position:fixed;\
	padding-top:74px;\
	font-family:aoaiu;\
	display: inline-block;\
	padding-left:30px;\
	height:64px;\
	width:1000px !important;\
    border-radius:50px;\
}\
#Name_Container{\
	font-family:aoaiu;\
	color:#333;\
	height:94px;\
    width:450px;\
	display: inline-block;\
	vertical-align: middle;\
    border-radius:0px;\
    background:url('http://i.imgur.com/ZbX4E1E.png') no-repeat !important;\
    background-position:0px -20px !important;\
}\
#Name_Container>p{\
    margin: 5px -284px 10px 290px !important;\
    display: inline-block !important;\
    font-size:9px !important;\
}\
#Name_Container>span{\
    margin-top:11px !important;\
    margin-left:38px !important;\
    right:20px !important;\
    display:block !important;\
    font-size:21px !important;\
}\
#Profile_Container{\
	position:fixed !important;\
	padding-top:20px !important;\
	font-family:aoaiu !important;\
	display: inline-block !important;\
	padding-left:20px !important;\
	height:64px !important;\
	width:1000px !important;\
    border-radius:50px !important;\
}\
.Player_Icon{\
	font-family:aoaiu !important;\
	border:1px solid #e2e2e2 !important;\
    border-radius:50px !important;\
	height:50px !important;\
	width:50px !important;\
    box-shadow: 0px 0px 10px #000;\
    -webkit-transition: all 0.5s ease-out;\
    -moz-transition: all 0.5s ease-out;\
    -o-transition: all 0.5s ease-out;\
}\
.Player_Icon:hover{\
	font-family:aoaiu !important;\
	border:1px solid #ffb31f !important;\
    border-radius:50px !important;\
	height:50px !important;\
	width:50px !important;\
    box-shadow: 0px 0px 10px #000;\
}\
.window {\
    background: none repeat scroll 0% 0% #FFF;\
    display: none;\
    font-size: 16px;\
    box-shadow: 0px 0px 10px 2px #616161;\
    opacity: 0.75;\
}\
#Version_Container {\
    color: #FFF\
}\
#haranobu {\
    position: fixed;\
    bottom: 0px;\
    right: 5px;\
    font-family: sans-serif;\
    font-size: 10px;\
    color: #FFF\
}\
a {\
    color: #286fff;\
	text-decoration:none;\
}\
" );

$("body").append ( '\
    <div id="haranobu">\
        GM © <a href="http://age-of-aincrad.com/forum/members/haranobu.4401/">Haranobu</a>\
    </div>\
' );


var SUC_script_num = 479895;

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