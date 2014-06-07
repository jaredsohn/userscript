// ==UserScript==
// @name       Tabbed Workspaces for Producteev
// @namespace  http://sammcqueen.com
// @version    0.6
// @description  Opens the Workspace panel and creates a tab for the active workspace on Producteev.com
// @include    http://www.producteev.com/dashboard.php*
// @include    https://www.producteev.com/dashboard.php*
// @include    http://www.producteev.com/overview.php*
// @include    https://www.producteev.com/overview.php*
// @copyright  2012+, You
// ==/UserScript==

var SUC_script_num = 130313; // Change this to the number given to the script by userscripts.org (check the address bar)
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}

GM_addStyle((<><![CDATA[
    #dashboards_bar{border-bottom:none} #dashboards_bar .dashboard-item{-moz-border-radius:3px 3px 0 0;-webkit-border-radius:3px 3px 0 0;border-radius:3px 3px 0 0;margin:5px 5px 0;padding:0 0 8px 20px} #dashboards_bar .dashboard-item.active-dash,#dashboards_bar .dashboard-item:hover{background-color:white !important} #dashboards_bar .dashboard-item.active-dash .title,#dashboards_bar .dashboard-item:hover .title{color:#6e6e6e;text-shadow:none} .dashboards-search,#dashboards_bar .dashboard-item .pictures-frame,#dashboards_bar .dashboard-item .pictures,#wrapper #project.free_ws_brand,#wrapper #project.overview,#dashboards_bar .dashboard-item .action,.nipple,#project{display:none !important} #dashboards_bar .dashboard-item .options-popin {background: #EBEEF6;border-top:1px solid #D8DDF1;top:26px;-moz-box-shadow: 0px 2px 3px -1px rgba(0,0,0,0.8);-webkit-box-shadow: 0px 2px 3px -1px rgba(0,0,0,0.8);box-shadow: 0px 2px 3px -1px rgba(0,0,0,0.8);-moz-border-radius: 0 0 3px 3px;-webkit-border-radius: 0 0 3px 3px;border-radius: 0 0 3px 3px;}
]]></>).toString());


window.addEventListener("load", function(e) {    
window.location.href = "javascript:dashboards.display();void(0)";
}, true);

var windowLoc = window.location.href;
if (windowLoc.match(/overview/i)) {
	activeSpace = 'overview';
}
else {
	var activeSpace = windowLoc.match(/dashboard.php\?id_dashboard=(\d+)/i);
	activeSpace = activeSpace[1];
}

var checkerInterval = 0;

function CheckLoadedDash() {
	if (document.getElementsByClassName('dashboard-item')) {
		var menuItems = document.getElementsByClassName('dashboard-item');
		
		if (activeSpace == 'overview' && document.getElementsByClassName('dashboard-item')[0]) {
			document.getElementsByClassName('dashboard-item')[0].className += " active-dash";
			clearInterval(checkerInterval);
		}
		else {
			for (var i = 1; i < menuItems.length-1; i++) {
				var dashLink = document.getElementsByClassName('dashboard-item')[i];
				var dashHref = dashLink.href;
				var dashNum = dashHref.match(/dashboard.php\?id_dashboard=(\d+)/i);
				dashNum = dashNum[1];
				if (dashNum == activeSpace) {
					dashLink.className += " active-dash";
					clearInterval(checkerInterval);
				}
			}
		}
	}

}

var checkerInterval = setInterval(function() {CheckLoadedDash();}, 100);