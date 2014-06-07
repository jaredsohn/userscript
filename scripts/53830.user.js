// ==UserScript==
// @name          MAK Mafia Links
// @description   Simple Link Menu Addon for [MAK] Members
// @include       http://apps.facebook.com/inthemafia/*
// @include       http://apps.new.facebook.com/inthemafia/*
// @include       http://www.facebook.com/s.php?*
// @namespace     http://userscripts.org/scripts/show/53830
// ==/UserScript==

var SUC_script_num = 53830; // Change this to the number given to the script by userscripts.org (check the address bar)
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + (86400000*7) <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}


var MakMenu = document.createElement("div");
MakMenu.innerHTML = '<style type=text/css>' +
	'.BgMak {background-color: #5c75aa;}' +
	'.BgMakAlpha {background-color: transparent;}' +
	'.Mak{' +
	'background-image: url(http://img.freecodesource.com/images/generators/linkbgimage/blood.gif);' + 
	'</style>' +
	'<div class="Mak" style="margin: 0px 21.5px; ' +
    'border-bottom: 1px solid #000000; margin-bottom: -1px; ' +
    'font-size: small; background-color: #3b5998; ' +
    'color: #FFFFFF;"><p style="margin: 0px 0 1px 0;"> ' +
	'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="http://photos-h.ak.fbcdn.net/hphotos-ak-snc1/hs126.snc1/5416_233287060726_552965726_7867047_998433_s.jpg"' + 	'style="border-width:0px;position:absolute;margin:1px 0 0 0px;">' +
    '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
	'<a href="http://www.facebook.com/s.php?k=100000004&id=94085138906&gr=2&a=7" onmouseover="this.className=\'BgMak\'" onmouseout="this.className=\'BgMakAlpha\'" style="color: white; font-size: 11px; text-decoration: none;" target="_blank">' +
	'<b>Member List</a> |</b>' +
	'<a href="http://www.facebook.com/group.php?gid=78937098356" onmouseover="this.className=\'BgMak\'" onmouseout="this.className=\'BgMakAlpha\'" style="color: white; font-size: 11px; text-decoration: none;" target="_blank">' +
    '<b>&nbsp;&nbsp;MAK Public</a> |</b>' +
	'<a href="http://www.facebook.com/group.php?gid=94085138906" onmouseover="this.className=\'BgMak\'" onmouseout="this.className=\'BgMakAlpha\'" style="color: white; font-size: 11px; text-decoration: none;" target="_blank">' +
    '<b>&nbsp;&nbsp;MAK Private</a> |</b>' +
	'<a href="http://www.facebook.com/topic.php?uid=78937098356&topic=8399" onmouseover="this.className=\'BgMak\'" onmouseout="this.className=\'BgMakAlpha\'" style="color: white; font-size: 11px; text-decoration: none;" target="_blank">' +
    '<b>&nbsp;&nbsp;Hitlist Help</a> |</b>' +
    '</p></div>';
document.body.insertBefore(MakMenu, document.body.firstChild);

 
// ==UserScript== Mafia Wars Addomator found at http://userscripts.org/users/96500
 function xpath(query) {
	return document.evaluate(query, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

function log(message) {
	GM_log(message);
}
function openAllTabs()
{
    try
    {
		var aRows = xpath("//div[@class='info']");
		for (var i=0; i < aRows.snapshotLength; i++ )
		{
			var aRow = aRows.snapshotItem(i);
			var aRegEx = aRow.innerHTML.match(/id=([0-9]+)/);
			var aNewSpan = document.createElement('span');
			var sUrl = "http://mwdirectfb10.zynga.com/mwfb/remote/html_server.php?xw_controller=friendbar&xw_action=send_add&fid=" + aRegEx[1];
			log ( "Opening tab to: " + sUrl );
			GM_openInTab ( sUrl );
		}
	}
	catch ( e )
	{
		log ( "Got error: " + e );
	}
}
function addLinksAndShowButtons()
{
    try
    {
		var aRows = xpath("//div[@class='info']");
		for (var i=0; i < aRows.snapshotLength; i++ )
		{
			var aRow = aRows.snapshotItem(i);
			var aRegEx = aRow.innerHTML.match(/id=([0-9]+)/);
            var sNewSpanId = "MafiaAddLink-" + aRegEx[1];

            var aOldElement = document.getElementById ( sNewSpanId );

            if ( aOldElement == null )
            {
                var aNewSpan = document.createElement('span');
                aNewSpan.innerHTML = " [<a href='http://mwdirectfb10.zynga.com/mwfb/remote/html_server.php?xw_controller=friendbar&xw_action=send_add&fid=" + aRegEx[1] + "' target='_blank'>Add to Mafia Wars</a>]";
                aNewSpan.id = sNewSpanId;
                aRow.appendChild ( aNewSpan );
            }
		}
        /*
		var aRemoveRows = xpath("//div[@class='UIObjectListing_RemoveContainer hidden_elem']");
		for (var i=0; i < aRemoveRows.snapshotLength; i++ )
		{
			var aRow = aRemoveRows.snapshotItem(i);
			aRow.className = "UIObjectListing_RemoveContainer";
		}
        */
	}
	catch ( e )
	{
		log ( "Got error: " + e );
	}
}

window.addEventListener( 'load', function( e ) 
{
    try
	{
		var aToolBar = xpath("//div[@class='object_members']");
		aRow =  aToolBar.snapshotItem(0);
		var aNewSpan = document.createElement('span');
		aNewSpan.innerHTML = "<b>  ADD [MAK] MEMBERS -----></b> ";
		aNewSpan.addEventListener ( "click", addLinksAndShowButtons, true );
		aRow.appendChild(aNewSpan);

		aNewSpan = document.createElement('span');
		aNewSpan.innerHTML = " [<a><b>Open Links in Tabs</b></a>]";
		aNewSpan.addEventListener ( "click", openAllTabs, true );
		aRow.appendChild(aNewSpan);
			
	}
	catch ( e )
	{
		log ( "Got error: " + e );
	}
},false);
addLinksAndShowButtons()