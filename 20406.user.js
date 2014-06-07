// ==UserScript==
// @name          MySpace Home - Customize it!
// @namespace     Seifer - http://userscripts.org/users/33118
// @description   Customize your homepage to exactly the way you want it. WORKS WITH InsaneNinja's Home Skin Switchup! Author: Seifer.
// @include       http://home.myspace.com/*fuseaction=user*
// @exclude       *fuseaction=user.*
// ==/UserScript==


	/* ==================================================================================
	Change the variables below to setup your home page exactly how you want!
	-------------------------------------------------------------------------------------
	Use the letters to position the different "pieces" of the homepage in each column.
	The first letter is the top, the last number is the bottom.

		EG. LEFT_COLUMN = 'ABE';	Would show from top to bottom in the left column,
									your profile pic, your control panel, and then
									your friends' status updates.
	A	Profile
	B	Updates
	C	Control Panel - **See the comment below**
	D	Various Useful Links
	E	Friend Status
	F	Bulletin Space
	G	Friend Space
	H	SquareAd (at top of the right column)
	I	Featured Profile
	J	Sponsored Links
	K	Various 'marketing' ads box
	L	Flash Ad below Featured Profile
	M	MySpace Annoucement (message from Tom)
	N	Today Heading
	O	UserScript Link-Backs
	P	Friend Updates
	Q	Address Book (Find Your Friends..)

	**If you use the Control Panel in the full length top or bottom rows it will be
	redesigned to use less space. Try it out to see what I mean! It's really nice
	in the top row!

	======================= RESIZE_TYPE =========================
	Use the RESIZE_TYPE variable to set whether or not to resize the standard columns if
	the right column is not used.
	0 = do not resize
	1 = resize both the left and middle column to use an equal amount of space
	2 = do not resize left column, stretch center column to use right column space also
	=====================================================================================*/

	RESIZE_TYPE			= 2; // See help above

	FULL_TOP_ROW		= "CM";
	LEFT_COLUMN			= "AB";
	CENTER_COLUMN		= "NFE";
	RIGHT_COLUMN		= "P";
	FULL_BOTTOM_ROW		= "GO";

	// To hide a piece completely just don't use its letter.

	/* ==================================================================================
	STOP EDITTING HERE UNLESS YOU KNOW WHAT YOU'RE DOING!
	=====================================================================================*/

if ($('col3')) // Check that we're using the new skin
	{

	// Re-Create missing updates block )(THANKS InsaneNinja!)
	if (!$('updates') && $('userdisplay'))
		{
		updates_div = document.createElement('div');
		updates_div.setAttribute('id','updates')
		updates_div.setAttribute('class','module')
		updates_div.setAttribute('style','display: none;')
		$('userdisplay').parentNode.insertBefore(updates_div, $('userdisplay').nextSibling);
	}

	// Set ID of top advert
	$('toprightlinks').nextSibling.nextSibling.setAttribute('id','advert');

	// Create top and bottom rows
	top_row_div = document.createElement('div');
	top_row_div.setAttribute('id', 'toprow');
	top_row_div.setAttribute('style', 'width: 98%; margin: 0px 0px -10px 10px; display:inline; float:left');
	bottom_row_div = document.createElement('div');
	bottom_row_div.setAttribute('id', 'bottomrow');
	bottom_row_div.setAttribute('style', 'width: 98%; margin: 0px 0px 0px 10px; display:inline; float:left');
	$('col1').parentNode.insertBefore(top_row_div, $('col1'));
	$('col3').parentNode.insertBefore(bottom_row_div, $('col3').nextSibling);

	////////////////////////////////
    // Create script link-back (Concept by InsaneNinja)
    //
        if (!$('GM_Script_Links')) { var gsl = document.createElement('p'); gsl.setAttribute('id','GM_Script_Links');
            if ($('col1')) $('col1').appendChild(gsl); GM_addStyle('#GM_Script_Links a {display:block;color:#CCC!important;}') }

        GM_addStyle('#GM_Script_Links { text-align: center }');
        $('GM_Script_Links').innerHTML += '<a href="http://userscripts.org/scripts/show/12646">GM - Customize it!</a>';
    //
    // if ($('GM_Script_Links') && $('GM_Script_Links').innerHTML.match('scripts/show/12646">GM')) (
    ////////////////////////////////


	/*	==========================
		Define all the pieces of the homepage so
		they can be manipulated later.
		------------------------*/
	var piece = [];
	piece['A'] = $('userdisplay');
	piece['B'] = $('updates');
	piece['C'] = $('manage');
	piece['D'] = $('grayboxrounded');
	piece['E'] = $('userstatus');
	piece['F'] = $('bulletins');
	piece['G'] = $('friendspace');
	piece['H'] = $('squareAd');
	piece['I'] = $('featuredprofilerounded');
	piece['J'] = $('googlead');
	piece['K'] = $('ctl00_cpMain_MarketingBox.Skin_userHomeTabs_userHomeTabs');
	piece['L'] = $('marketingcontent');
	piece['M'] = $('tomannouncement');
	piece['N'] = $('today');
	piece['O'] = $('GM_Script_Links');
	piece['P'] = $('friendUpdate');
	piece['Q'] = $('addressbook');
	if(!piece['Q']) { piece['Q'] = $('addressbookintl'); }
	//	========================

	function setPiece(sel, display)
		{
		if(piece[sel]) {
			piece[sel].setAttribute('style','display:'+display);
		}
	}

	pieces="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	pieces = pieces.split('');
	for(i=0; ii=pieces[i]; i++)
		{
		setPiece(ii,'none');
	}

	if((RIGHT_COLUMN == "" && CENTER_COLUMN.indexOf('G') != -1) || FULL_TOP_ROW.indexOf('G') != -1 || FULL_BOTTOM_ROW.indexOf('G') != -1)
		{
		// Remove newline spaces from friends list
		for (var i=0; i < $('friends').childNodes.length; i++)
			{
			if($('friends').childNodes[i].className == "clear")
				{
				$('friends').removeChild($('friends').childNodes[i]);
				i = i-1;
			}
		}

		for (var i=0; i<$('friends').childNodes.length; i++)
			{
			if($('friends').childNodes[i].tagName !== "DIV")
				{
				$('friends').removeChild($('friends').childNodes[i]);
				i=i-1;
			}
		}

		if(CENTER_COLUMN.indexOf('G') != -1)
			{
			var ii=0;
			for (var i=0; i<$('friends').childNodes.length; i++)
				{
				ii++;
				if(ii == 8)
					{
					cleardiv = document.createElement('div');
					cleardiv.setAttribute('style','clear:both');
					$('friends').insertBefore(cleardiv,$('friends').childNodes[i]);
					ii=0;
				}
			}
		}

		if(FULL_TOP_ROW.indexOf('G') != -1 || FULL_BOTTOM_ROW.indexOf('G') != -1)
			{
			var ii=0;
			for (var i=0; i<$('friends').childNodes.length; i++)
				{
				ii++;
				if(ii == 10)
					{
					cleardiv = document.createElement('div');
					cleardiv.setAttribute('style','clear:both');
					$('friends').insertBefore(cleardiv,$('friends').childNodes[i]);
					ii=0;
				}
			}
		}
	}

	// Set width of control panel so it doesn't stretch when used in other columns.
	if(FULL_TOP_ROW.indexOf('C') != -1 || FULL_BOTTOM_ROW.indexOf('C') != -1)
		{
		newcpcontainer = document.createElement('div');
		newcpcontainer.setAttribute('style','display:block; height:35px; border-bottom: 1px solid #CCCCCC; padding-bottom: 3px');
		newcpcontainer.setAttribute('id','newcpcontainer');
		newcp = document.createElement('div');
		newcp.setAttribute('id','newcp');
		newcp.innerHTML = '<a class=cplink href='+$('cpHrf001').href+'>Compose</a>'
		+'<a class=cplink href='+$('cpHrf002').href+'>Inbox</a>'
		+'<a class=cplink href='+$('cpHrf003').href+'>Sent</a>'
		+'<a class=cplink href='+$('cpHrf004').href+'>Friend Requests</a>'
		+'<a class=cplink href='+$('cpHrf005').href+'>Profile</a>'
		+'<a class=cplink href='+$('cpHrf006').href+'>Settings</a>'
		+'<a class=cplink href='+$('cpHrf007').href+'>Photos</a>'
		+'<a class=cplink href='+$('cpHrf008').href+'>Videos</a>'
		+'<a class=cplink href='+$('cpHrf009').href+'>Calendar</a>'
		+'<a class=cplink href='+$('cpHrf0010').href+'>Blog</a>'
		+'<a class=cplink href='+$('cpHrf0011').href+'>Address Book</a>'
		GM_addStyle('.cplink {margin-right: 10px}'
		+'#newcpcontainer {'
		+'display:block;'
		+'height:35px;'
		+'border-bottom: 1px solid #CCCCCC;'
		+'padding-bottom: 3px;'
		+'margin-bottom: 10px'
		+'}'
		+'#newcp {'
		+'background:#E5E5E5 url(http://x.myspace.com/Modules/HomeDisplay/Static/img/BlueRounded/navigation_background.gif) no-repeat scroll 0px 50%;'
		+'float:right;'
		+'font-size:10px;'
		+'height:17px;'
		+'margin-top:10px;'
		+'padding:7px 8px 4px 38px;'
		+'border-bottom: 1px solid #CCCCCC'
		+'}');
		$('bottomrow').appendChild(newcpcontainer);
		$('newcpcontainer').appendChild(newcp);
		piece['C'].parentNode.removeChild(piece['C']);
		piece['C'] = $('newcpcontainer');
	} else {
		GM_addStyle('#manage {width: 180px}');
	}
	GM_addStyle('#bulletins_scroll {\n'
	+'position:relative;\n'
	+'right:-8px;\n'
	+'}');
	GM_addStyle('#friendspace {\n'
	+'	margin-bottom:10px;\n'
	+'}');

	// Resize columns if right column is not being used
	if(RIGHT_COLUMN == "") {
		switch(RESIZE_TYPE){
			case 1:
				$('col1').setAttribute('style','width: 48%');
				$('col2').setAttribute('style','width: 48%');
				$('col3').setAttribute('style','width: 0pz');
				break;
			case 2:
				$('col2').setAttribute('style','width: 750px');
				$('col3').setAttribute('style','width: 0px');
				;
				break;
		} // switch
	}

	FULL_TOP_ROW = FULL_TOP_ROW.split('');
	for(i=0; sel=FULL_TOP_ROW[i]; i++)
		{
		if(piece[sel]) {
			$('toprow').appendChild(piece[sel]);
			setPiece(sel,'block');
		}
	}
	LEFT_COLUMN = LEFT_COLUMN.split('');
	for(i=LEFT_COLUMN.length-1; sel=LEFT_COLUMN[i]; i=i-1)
		{
		if(piece[sel]) {
			$('col1').insertBefore(piece[sel],$('col1').firstChild);
			setPiece(sel,'block');
		}
	}
	CENTER_COLUMN = CENTER_COLUMN.split('');
	for(i=0; sel=CENTER_COLUMN[i]; i++)
		{
		if(piece[sel]) {
			$('col2').appendChild(piece[sel]);
			setPiece(sel,'block');
		}
	}
	RIGHT_COLUMN = RIGHT_COLUMN.split('');
	for(i=0; sel=RIGHT_COLUMN[i]; i++)
		{
		if(piece[sel]) {
			$('col3').appendChild(piece[sel]);
			setPiece(sel,'block');
		}
	}
	FULL_BOTTOM_ROW = FULL_BOTTOM_ROW.split('');
	for(i=0; sel=FULL_BOTTOM_ROW[i]; i++)
		{
		if(piece[sel]) {
			$('bottomrow').appendChild(piece[sel]);
			setPiece(sel,'block');
		}
	}


// Old variables for the old update notification script.
	script_version=1.24;
	script_updatetext='Now supports the Address Book and new Friend Updates box. You will lose your previous customizations once you update.';

// ========= ADD FROM HERE ONWARDS TO YOUR SCRIPT =========
// This auto update-notification script was made by Seifer
// You can find it at http://userscripts.org/scripts/show/12193
// ========================================================
// === Edit the next four lines to suit your script. ===
	scriptName='Myspace - Customize it!';
	scriptId='12646';
	scriptVersion=1.24;
	scriptUpdateText='Now supports the Address Book and new Friend Updates box. You will lose your previous customizations once you update.';
// === Stop editing here. ===


	var lastCheck = GM_getValue('lastCheck', 0);
	var lastVersion = GM_getValue('lastVersion', 0);
	var d = new Date();
	var currentTime = Math.round(d.getTime() / 1000); // Unix time in seconds
	if (parseInt(navigator.appVersion)>3) {
		if (navigator.appName=="Netscape") {
			winW = window.innerWidth;
			winH = window.innerHeight;
		}
		if (navigator.appName.indexOf("Microsoft")!=-1) {
			winW = document.body.offsetWidth;
			winH = document.body.offsetHeight;
		}
	}
	if (currentTime > (lastCheck + 86400)) { //24 hours after last check
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://userscripts.org/scripts/review/'+scriptId+'?format=txt',
			headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey','Accept': 'text/plain',},
			onload: function(responseDetails) {
				var text = responseDetails.responseText;
	   	 		var onSiteVersion = text.substring(text.indexOf("scriptVersion=")+14,text.indexOf("\n",text.indexOf("scriptVersion="))-2);
	    		var onSiteUpdateText = text.substring(text.indexOf("scriptUpdateText=")+18,text.indexOf("\n",text.indexOf("scriptUpdateText="))-3);
	    		if(onSiteVersion > scriptVersion && onSiteVersion > lastVersion) {
		    		GM_addStyle('#gm_update_alert {'
					+'	position: fixed;'
//					+'	z-index: 100000;'
					+'	top: '+((winH/2)-60)+'px;'
					+'	left: '+((winW/2)-275)+'px;'
					+'	width: 550px;'
					+'	height: 120px;'
					+'	background-color: yellow;'
					+'	text-align: center;'
					+'	font-size: 11px;'
					+'	font-family: Tahoma;'
					+'}'
					+'#gm_update_alert_buttons {'
					+'	position: relative;'
					+'	top: -5px;'
					+'	margin: 7px;'
					+'}'
					+'#gm_update_alert_button_close {'
					+'	position: absolute;'
					+'	right: 0px;'
					+'	top: 0px;'
					+'	padding: 3px 5px 3px 5px;'
					+'	border-style: outset;'
					+'	border-width: thin;'
					+'	z-index: inherit;'
					+'	background-color: #FF0000;'
					+'	color: #FFFFFF;'
					+'	cursor:pointer'
					+'}'
					+'#gm_update_alert_buttons span, #gm_update_alert_buttons span a  {'
					+'	text-decoration:underline;'
					+'	color: #003399;'
					+'	font-weight: bold;'
					+'	cursor:pointer'
					+'}'
					+'#gm_update_alert_buttons span a:hover  {'
					+'	text-decoration:underline;'
					+'	color: #990033;'
					+'	font-weight: bold;'
					+'	cursor:pointer'
					+'}');
		    		newversion = document.createElement("div");
		    		newversion.setAttribute('id', 'gm_update_alert');
		    		newversion.innerHTML = ''
					+'	<b>GreaseMonkey UserScript Update Notification</b><br>'
					+'	There is an update available for &quot;'+scriptName+'&quot; <br>'
					+'	You are currently running version '+scriptVersion+'. The newest version is '+onSiteVersion+'.<br>'
					+'	<br>'
					+'	<div id="gm_update_alert_button_close">'
					+'		Close</div>'
					+'	<b>What do you want to do?</b><br>'
					+'	<div id="gm_update_alert_buttons">'
					+'		<span id="gm_update_alert_button_showinfo"><a href="#">Show Update Info</a></span>&nbsp;&nbsp;'
					+'		<span id="gm_update_alert_button_scripthome"><a target="_blank" href="http://userscripts.org/scripts/show/'+scriptId+'">Go To Script Homepage</a></span>&nbsp;&nbsp;'
					+'		<span id="gm_update_alert_button_upgrade"><a href="http://userscripts.org/scripts/source/'+scriptId+'.user.js">Upgrade to version '+onSiteVersion+'</a></span>&nbsp;&nbsp;'
					+'		<span id="gm_update_alert_button_wait"><a href="#">Don&#39;t remind me again until tomorrow</a></span>&nbsp;&nbsp;'
					+'		<span id="gm_update_alert_button_waitnextversion"><a href="#">Don&#39;t remind me again'
					+'		until the next new version</a></span> </div>';
					document.body.insertBefore(newversion, document.body.firstChild);
					document.getElementById('gm_update_alert_button_showinfo').addEventListener('click', function(event) {
              alert(onSiteUpdateText);
           }, true);
					document.getElementById('gm_update_alert_button_wait').addEventListener('click', function(event) {
              GM_setValue('lastCheck', currentTime);
              alert("You will not be reminded again until tomorrow.");
              document.body.removeChild(document.getElementById('gm_update_alert'));
           }, true);
           			document.getElementById('gm_update_alert_button_waitnextversion').addEventListener('click', function(event) {
              GM_getValue('lastVersion', onSiteVersion);
              alert("You will not be reminded again until the next new version is released.");
              document.body.removeChild(document.getElementById('gm_update_alert'));
           }, true);
					document.getElementById('gm_update_alert_button_close').addEventListener('click', function(event) {
              document.body.removeChild(document.getElementById('gm_update_alert'));
           }, true);
		    	}
		    }
		});
	}
}


function $( elementId ) { return document.getElementById( elementId ); } // shortcut from "Prototype Javascript Framework"
function $$( elementName ) { return document.getElementsByName( elementName ); }