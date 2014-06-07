// ==UserScript==
// @name          MySpace Home - Customize it!
// @version       2.03
// @namespace     Seifer - http://userscripts.org/users/33118
// @description   Customize your homepage to exactly the way you want it. WORKS WITH InsaneNinja's Home Skin Switchup and Home Auto-Update! Author: Seifer.
// @include       http://home.myspace.com/*fuseaction=user*
// @exclude       *fuseaction=user.*
// ==/UserScript==


	/* ==================================================================================
	Change the variables below to setup your home page exactly how you want!
	-------------------------------------------------------------------------------------
	Use the letters to position the different "pieces" of the homepage in each column.
	The first letter is the top, the last letter is the bottom.

		EG. LEFT_COLUMN = 'ABN';	Would show from top to bottom in the left column,
						your Profile Pic, your Updates, and then
						your Applications.
	A	Profile
	B	Updates
	C	Applications Navigation
	D	Address Book (Find your friends..)
	E	Googles Ads
	F	Friend Status
	G	Friend Updates
	H	Bulletins
	I	Friend Space
	J	Square Ad
	K	Featured Profile and Ad
	L	Tabbed Ads
	M	MySpace Annoucement (message from Tom)
	N	Applications
	O	People You May Know

	Y	Comments On Homepage (needs http://userscripts.org/scripts/show/24394)
	Z	GreaseMonkey Script Link-Backs


	======================= RESIZE_TYPE =========================
	Use the RESIZE_TYPE variable to set how wide the columns are.
	0 = Do not resize columns
	1 = Resize both the left and middle column to use an equal amount of space, hides the right column.
	2 = Do not resize left column & stretch center column to use remaining space, hides the right column.
	3 = Wide Screen Mode. Extends the left and right column & shrinks the center. For users on res of 1280+ wide.
	4 = Wide Screen Mode. Extends the center and right column. For users on res of 1280+ wide.
	5 = Wide Screen Mode. Extends the left and right column & shrinks the center. For users on res of 1152+ wide.
	6 = Wide Screen Mode. Extends the center and right column. For users on res of 1152+ wide.
	7 = Wide Screen Mode. Extends the center and right column. For users on res of 1680+ wide.
	=====================================================================================*/


	RESIZE_TYPE		= 0; // See help above

	FULL_TOP_ROW		= "";
	LEFT_COLUMN		= "ABNZ";
	CENTER_COLUMN		= "MIG";
	RIGHT_COLUMN		= "FHO";
	FULL_BOTTOM_ROW		= "";


	SHOW_HAU_SETTINGS	= 0;  // Show InsaneNinja's Home-Auto Update controls. 1=yes, 0=no.

	/**** To hide a piece completely just don't use its letter. ****

	=======================================================================================
			STOP EDITTING HERE UNLESS YOU KNOW WHAT YOU'RE DOING!
	=====================================================================================*/





	// ========= ADD FROM HERE ONWARDS TO YOUR SCRIPT =========
	// This auto update-notification script was made by Seifer
	// You can find it at http://userscripts.org/scripts/show/12193
	// ========================================================
	// === Edit the next four lines to suit your script. ===
	scriptName='Myspace - Customize it!';
	scriptId='12646';
	scriptVersion=2.03;
	scriptUpdateText='Fixed ads not being hidden and added People You May Know.';
	// === Stop editing here. ===

	// Old variables for the old update notification script.
	script_version=2.03;
	script_updatetext='Fixed ads not being hidden and added People You May Know.';


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
					+'	z-index:100000;'
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


 	// Remove top ad and google search bar
	removeElement('leaderboard');
	removeElement('googlebar');


	/*	==========================
		Define all the pieces of the homepage so
		they can be manipulated later.
		------------------------*/
	var piece = [];
	piece['A'] = $('userdisplay');
	piece['B'] = $('updates');
	piece['C'] = $('appnavigation');
	piece['D'] = $('addressbook');
	if(!piece['D']) { piece['D'] = $('addressbookintl'); }
	piece['E'] = $('googleadtest_A');
	piece['F'] = $('userstatus');
	piece['G'] = $('friendUpdate');
	piece['H'] = $('bulletins');
	piece['I'] = $('friendspace');
	piece['J'] = $('squareAd');
	piece['K'] = $('featuredprofilerounded');
	if(piece['K']) { piece['K'] = piece['K'].parentNode; }
	piece['L'] = $('ctl00_ctl00_cpMain_cpMain_MarketingBox_userHomeTabs_userHomeTabs');
	piece['M'] = $('tomannouncement');
	piece['N'] = $('appslayer');
	piece['O'] = $('pymk');
	piece['Y'] = $('comments');
	piece['Z'] = $('GM_Script_Links');
	//	========================

	pieces="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	pieces = pieces.split('');
	for(i=0; ii=pieces[i]; i++)
		{
		setPiece(ii,'none');
	}


	GM_addStyle('#bulletins_scroll {\n'
	+'position:relative;\n'
	+'right:-8px;\n'
	+'}');
	GM_addStyle(".recommendation { display: inline-block !important; float: none !important; }");
	GM_addStyle('#friendspace {\n'
	+'	margin-bottom:10px;\n'
	+'}');


	// Resize columns
	switch(RESIZE_TYPE){
		case 1:
			$('col1').setAttribute('style','width: 48%;');
			$('col2').setAttribute('style','width: 48%;');
			$('col3').setAttribute('style','display:none;');
			break;
		case 2:
			
			$('col2').setAttribute('style','width: 750px');
			$('col3').setAttribute('style','display:none;');
			break;
		case 3:
			
			GM_addStyle('#col1 {width:510px !important;}');
			GM_addStyle('#col2 {width:180px !important;}');
			GM_addStyle('#col3 {width:510px !important;}');
			GM_addStyle('#main {width:1240px !important;}');
			GM_addStyle('#wrap {width:100% !important;}');
			break;
		case 4:
			
			GM_addStyle('#col1 {width:180px !important;}');
			GM_addStyle('#col2 {width:510px !important;}');
			GM_addStyle('#col3 {width:510px !important;}');
			GM_addStyle('#main {width:1240px !important;}');
			GM_addStyle('#wrap {width:100% !important;}');
			break;
		case 5:
			
			GM_addStyle('#col1 {width:456px !important;}');
			GM_addStyle('#col2 {width:180px !important;}');
			GM_addStyle('#col3 {width:456px !important;}');
			GM_addStyle('#main {width:1135px !important;}');
			GM_addStyle('#wrap {width:100% !important;}');
			break;
		case 6:
			
			GM_addStyle('#col1 {width:180px !important;}');
			GM_addStyle('#col2 {width:456px !important;}');
			GM_addStyle('#col3 {width:456px !important;}');
			GM_addStyle('#main {width:1135px !important;}');
			GM_addStyle('#wrap {width:100% !important;}');
			break;
		case 7:
			
			GM_addStyle('#col1 {width:300px !important;}');
			GM_addStyle('#col2 {width:650px !important;}');
			GM_addStyle('#col3 {width:650px !important;}');
			GM_addStyle('#main {width:1650px !important;}');
			GM_addStyle('#wrap {width:100% !important;}');
			GM_addStyle('#footer {width:99% }');
			break;
	} // switch



	if ($('GM_Script_Links') && $('GM_Script_Links').innerHTML.match('scripts/show/6365">GM')) {
		if(!SHOW_HAU_SETTINGS) {
			$('HAU_Choices').setAttribute('style','display:none;');
		}
	}


    ////////////////////////////////
    // Credit to InsaneNinja (http://userscripts.org/scripts/show/12610)
    // Adds the "view mine" between the "post bulletin | view all" bulletin links
    //
        var view_all = $('bulletins').getElementsByTagName('a')
            view_all = view_all[(view_all.length-1)]
        var view_mine = document.createElement('a')
            view_mine.setAttribute('href','http://bulletins.myspace.com/index.cfm?fuseaction=bulletin.ShowMyBulletins')
            view_mine.innerHTML = 'view mine'

            view_all.parentNode.insertBefore(view_mine, view_all)
            view_all.parentNode.insertBefore(document.createTextNode(' | '), view_all)
    //
    ////////////////////////////////



	if (document.getElementById('GM_Script_Links') && document.getElementById('GM_Script_Links').innerHTML.match('scripts/show/6365">GM'))
		{
	// Fix Friends Space
		GM_addStyle(".friend {"+
		"height:150px;"+
		"display:block;"+
		"width:100px;"+
		"overflow:hidden;"+
		"margin:0px 0px 0px 0px !important;"+
		"}"+
		".friend a {"+
		"line-height:10px !important;"+
		"}"+
		".friend img {"+
		"max-height: 100px;"+
		"}"+
		"#HAU_Friends .friend {"+
		"width: 100px !important;"+
		"margin:0px 18px 0px 20px !important"+
		"}");
	} else {
		GM_addStyle(".friend {"+
		"height:150px;"+
		"display:block;"+
		"width:100px;"+
		"overflow:hidden;"+
		"margin:0px 18px 0px 20px !important"+
		"}"+
		".friend a {"+
		"line-height:10px !important;"+
		"}"+
		".friend img {"+
		"max-height: 100px;"+
		"}");
	}

	GM_addStyle('#friends .clear, #HAU_Onlines .clear { clear:none !important; }');

	// Add style info for application boxes.
	if(FULL_TOP_ROW.indexOf('N') > 0 || FULL_BOTTOM_ROW.indexOf('N') > 0) { GM_addStyle("#appslayer .module { width:300px;float:left;margin-right:10px; }"); }


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
			$('mobilelayer').appendChild(piece[sel]);
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


	// Create hide link for MySpace/Tom's Annoucement.
	if($('tomannouncement'))
		{
		GM_addStyle('#gm_hideannounce {text-align:right;margin-top:10px !important;,margin-bottom:-20px !important;;}');
		hideannounce = document.createElement('div');
		hideannounce.setAttribute('id','gm_hideannounce');
		hideannounce.innerHTML = '<a href="#" id="gm_hideannouncelink">Got it! Hide this announcement.</a>';
		$('tomannouncement').lastChild.previousSibling.appendChild(hideannounce);
		document.getElementById('gm_hideannouncelink').addEventListener('click', function(event) { GM_setValue('tomannouncement',$('tomannouncement').innerHTML); $('tomannouncement').setAttribute('style','display:none'); }, true);
		if(GM_getValue("tomannouncement",false) == $('tomannouncement').innerHTML) {
			$('tomannouncement').setAttribute('style','display:none');
		}
	}
}


function setPiece(sel, display) { if(piece[sel]) { piece[sel].setAttribute('style','display:'+display); } }
function getAtt(elementId,att) { if(document.getElementById(elementId)) { return document.getElementById(elementId).getAttribute(att); } else { return false; } }
function removeElement(elementId) { if(document.getElementById(elementId )) { document.getElementById(elementId).setAttribute('style','display:none'); return true; } else { return false; } }
function $(elementId) { return document.getElementById(elementId); } // shortcut from "Prototype Javascript Framework"
function $$(elementName) { return document.getElementsByName(elementName); }