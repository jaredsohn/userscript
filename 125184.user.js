// ==UserScript==
// @name           GSS-EveOnline frontpage
// @namespace      GSS-EveOnline-Custom
// @description    Replaces EveOnline frontpage with custom page
// @include        http://*.eveonline.com/*
// @include        https://*.eveonline.com/*
// @include	   http://failheap-challenge.com/*
// ==/UserScript==

(function() {
if(false || document.location.href.match(/www\.eveonline\.com\/$/))
{
	var newBody = 
	'<html>' +
	'<head>' +
	'<style type="text/css">' +
	'html { overflow: hidden; }' +
	'body {' +
	'background-image: none !important;' +
	'color: white;' +
	'width: 100% !important; min-width:966px !important;' +
	'height:100% !important; min-height:100px !important;' +
	'margin:0px !important;' +
	'}' +
	'td { padding: 0px; }' +
	'a:visited {color: white;}' +
	'a:link {color: white;}' +
	'a:hover {color: #FA9E0E;}' +
	'div {' +
	'border: 1px; border-color: #343434; border-style: solid;' +
  	'margin: 0px;' +
	'font-size: 13px;' +
  	'opacity:0.9;' +
	'filter:alpha(opacity=90);' + /* For IE8 and earlier */
  	'}' +
	'iframe {' +
	'border: 0px; border-color: #343434; border-style: solid;' +
  	'margin: 0px; padding: 0px;' +
  	'}' +
	'ul {' +
  	'padding: 0;' +
  	'margin-left: 5px; margin-right: 5px; margin-top: 1px; margin-bottom: 3px;' +
	'font-size: 11px;' +
  	'list-style: none;' +
  	'}' +
	'</style>' +
	'<title>Custom EveOnline frontpage</title>' +
	'</head>' +
	'<body>' +

	'<table width=100% height=100% style="background: #272727" align=center border=0>' +

	'<tr valign=top style="border: 1px; border-color: #343434; border-style: solid;">' +
	'<td align=center width=130 style="background: #1F1F1F"><b><a href="http://www.eveonline.com/" target=_top><img src="http://wiki.eveonline.com/wikiEN/skins/eveskin/new_img/eve_online_logo.png" height=22></a></b></td>' +
	'<td align=center style="background: #1F1F1F; max-width: 40px"><b><a href="https://secure.eveonline.com/" target=_new>Account</a></b></td>' +
	'<td align=center style="background: #1F1F1F; max-width: 40px"><b><a href="https://gate.eveonline.com/Calendar" target=eveiframe>Calendar</a></b></td>' +
	'<td align=center style="background: #1F1F1F; max-width: 40px"><b><a href="http://community.eveonline.com" target=eveiframe>Community</a></b></td>' +
	'<td align=center style="background: #1F1F1F; max-width: 40px"><b><a href="https://gate.eveonline.com" target=eveiframe>Eve Gate</a></b></td>' +
	'<td align=center style="background: #1F1F1F; max-width: 40px"><b><a href="https://forums.eveonline.com/" target=eveiframe>Forums</a></b></td>' +
	'<td align=center style="background: #1F1F1F; max-width: 40px"><b><a href="https://gate.eveonline.com/Mail/Inbox" target=eveiframe>Mail</a></b></td>' +
	'<td align=center style="background: #1F1F1F; max-width: 40px"><b><a href="http://community.eveonline.com/news.asp" target=eveiframe>News</a></b></td>' +
	'</tr>' +

	'<tr>' +
	'<td style="background: #1F1F1F url(\'http://web.ccpgamescdn.com/newssystem/media/3062/3337/23_940.jpg\') no-repeat; background-size:940px 100%;">' +
	/*---------------------------------------------------------------------------*/
	/*-LINE BELOW CONTAINS MAXIMUM LINK BAR HEIGHT BEFORE THE SCROLL BAR APPEARS-*/
	/*---------------------------------------------------------------------------*/
	'<div style="max-height:700px !important; overflow: auto; background: #272727">' +
	'<div style="background: #4D4D57"><a href="#" onclick="document.getElementById(\'div_communic\').style.display=(document.getElementById(\'div_communic\').style.display== \'block\')?\'none\':\'block\';">&nbsp;Communication</a></div><div id="div_communic" style="display:block;"><ul><li><a href="http://community.eveonline.com/news.asp" target=eveiframe>News Channels</a></li><li><a href="https://forums.eveonline.com" target=eveiframe>Forums</a></li><li><a href="http://community.eveonline.com/devblog.asp" target=eveiframe>Dev Blogs</a></li><li><a href="http://community.eveonline.com/updates/patchnotes.asp" target=eveiframe>Patch Notes</a></li><li><a href="http://community.eveonline.com/community/awards_reviews.asp" target=eveiframe>Awards and Accolades</a></li><li><a href="http://community.eveonline.com/news/rss-feeds/" target=eveiframe>RSS Feeds</a></li><li><a href="http://www.twitter.com/eveonline" target=_blank>Twitter</a></li></ul></div>' +
	'<div style="background: #4d4d57"><a href="#" onclick="document.getElementById(\'div_communit\').style.display=(document.getElementById(\'div_communit\').style.display== \'block\')?\'none\':\'block\';">&nbsp;Community</a></div><div id="div_communit" style="display:block;"><ul><li><a href="http://wiki.eveonline.com/en/wiki/" target=eveiframe>EVElopedia</a></li><li><a href="http://community.eveonline.com/community/csm/" target=eveiframe>CSM</a></li><li><a href="http://community.eveonline.com/community/fansites.asp" target=eveiframe>Fansites</a></li><li><a href="http://community.eveonline.com/isd.asp" target=eveiframe>Volunteer Program</a></li><li><a href="http://community.eveonline.com/community/alliance-tournament/" target=eveiframe>Alliance Tournament</a></li><li><a  href="http://fanfest.eveonline.com/en/default" target=eveiframe>Fanfest</a></li><li><a href="https://truestories.eveonline.com/" target=eveiframe>True Stories</a></li></ul></li></div>' +
	'<div style="background: #4d4d57"><a href="#" onclick="document.getElementById(\'div_gameinfo\').style.display=(document.getElementById(\'div_gameinfo\').style.display== \'block\')?\'none\':\'block\';">&nbsp;Game Info</a></div><div id="div_gameinfo" style="display:none;"><ul><li><a href="http://www.eveonline.com/expansions/overview/" target=eveiframe>Expansions</a></li><li><a href="http://community.eveonline.com/background/" target=eveiframe>Backstory</a></li><li><a href="http://www.eveonline.com/universe/" target=eveiframe>One Universe</a></li><li><a href="http://www.eveonline.com/sandbox/" target=eveiframe>The Sandbox</a></li><li><a href="http://www.eveonline.com/rubicon/" target=eveiframe>Latest expansion</a></li></ul></div>' +
	'<div style="background: #4d4d57"><a href="#" onclick="document.getElementById(\'div_evegate\').style.display=(document.getElementById(\'div_evegate\').style.display== \'block\')?\'none\':\'block\';">&nbsp;Eve Gate</a></div><div id="div_evegate" style="display:block;"><ul><li><a href="https://gate.eveonline.com/Contacts" target=eveiframe>Contacts</a></li><li><a href="https://gate.eveonline.com/Mail/Inbox" target=eveiframe>Mail</a></li><li><a href="https://gate.eveonline.com/Calendar" target=eveiframe>Calendar</a></li><li><a href="https://gate.eveonline.com/Home#" target=eveiframe>Voice</a></li></ul></div>' +
	'<div style="background: #4d4d57"><a href="#" onclick="document.getElementById(\'div_evesuppo\').style.display=(document.getElementById(\'div_evesuppo\').style.display== \'block\')?\'none\':\'block\';">&nbsp;Eve support</a></div><div id="div_evesuppo" style="display:none;"><ul><li><a href="https://secure.eveonline.com/" target=_new>Account management</a></li><li><a href="http://support.eveonline.com/Pages/KB/" target=eveiframe>Knowledge base</a></li><li><a href="http://support.eveonline.com/Pages/Petitions/CreatePetition.aspx" target=eveiframe>Create new petition</a></li><li><a href="http://support.eveonline.com/Pages/Petitions/MyPetitions.aspx" target=eveiframe>Petitions</a></li><li><a href="http://support.eveonline.com/api" target=eveiframe>API keys</a></li><li><a href="http://community.eveonline.com/download/" target=eveiframe>Download EVE</a></li><li><a href="http://community.eveonline.com/download/?s=singularity" target=eveiframe>Test Servers</a></li><li><a href="http://community.eveonline.com/pnp/" target=eveiframe>Policies</a></li><li><a href="http://community.eveonline.com/support/fleet-fight/" target=eveiframe>Fleet Fight Notification</a></li><li><a href="https://bugs.eveonline.com" target=eveiframe>Bug Reporting</a></li></ul></div>' +
	'<div style="background: #4D4D57"><a href="#" onclick="document.getElementById(\'div_media\').style.display=(document.getElementById(\'div_media\').style.display== \'block\')?\'none\':\'block\';">&nbsp;Media</a></div><div id="div_media" style="display:none;"><ul><li><a href="http://www.eveonline.com/universe/spaceships/" target=eveiframe>Spaceship viewer</a></li><li><a href="http://www.eveonline.com/universe/" target=eveiframe>Features</a></li><li><a href="http://www.eveonline.com/sandbox/personality-analysis/" target=eveiframe>Persona test</a></li><li><a href="http://www.eveonline.com/creations/fiction/" target=eveiframe>Fiction</a></li><li><a href="http://www.eveonline.com/creations/videos/" target=eveiframe>Videos</a></li><li><a href="http://www.eveonline.com/creations/wallpapers/" target=eveiframe>Wallpapers</a></li><li><a href="http://www.eveonline.com/creations/screenshots/" target=eveiframe>Screenshots</a></li><li><a href="http://www.eveonline.com/creations/concept-art/" target=eveiframe>Concept Art</a></li><li><a href="http://youtube.com/ccpgames/" target=_blank>Youtube</a></li></ul></div>' +
	'<div style="background: #4D4D57"><a href="#" onclick="document.getElementById(\'div_custom\').style.display=(document.getElementById(\'div_custom\').style.display== \'block\')?\'none\':\'block\';">&nbsp;Custom stuff</a></div><div id="div_custom" style="display:none;"><ul><li><a href="http://evemaps.dotlan.net/" target=eveiframe>Dotlan</a></li><li><a href="http://eve-central.com/" target=eveiframe>Eve Central</a></li><li><a href="http://eve-files.com/" target=eveiframe>Eve Files</a></li><li><a href="http://eve-kill.net/" target=eveiframe>Eve Kill</a></li><li><a href="http://eve-live.com/" target=eveiframe>Eve Live</a></li><li><a href="http://eve-offline.net/" target=eveiframe>Eve Offline</a></li><li><a href="http://eve-search.com/" target=eveiframe>Eve Search</a></li><a href="http://www.eve-tribune.com/" target=eveiframe>Eve Tribune</a></li><li><a href="http://evewho.com/" target=eveiframe>Eve Who</a></li><li><a href="http://failheap-challenge.com/" target=eveiframe>Failheap challenge</a></li><br><li><a href="http://stream.evehost.net:8000/listen.pls" target=_blank>Eve Radio</a></li><li><a href="http://sc1.newedenradio.info/8002.pls" target=_blank>New Eden Radio</a></li><li><a href="http://listen.di.fm/public3/ambient.pls" target=_blank>DI-Ambient</a></li><li><a href="http://listen.di.fm/public3/djmixes.pls" target=_blank>DI-DJ Mixes</a></li><li><a href="http://listen.di.fm/public3/spacemusic.pls" target=_blank>DI-Space Dreams</a></li></ul></div>' +
	'</div>' +
	'</td>' +

	'<td height=100% style="background: #D4D5D6" colspan="7">' +
	/*--------------------------------------------------------------------*/
	/*-LINE BELOW CONTAINS URL OF DEFAULT PAGE WHICH OPENS TO MAIN WINDOW-*/
	/*--------------------------------------------------------------------*/
	'<iframe src="http://community.eveonline.com/news.asp" width=100% height=100% frameborder=0 name=eveiframe></iframe>' +
	'</td>' +
	'</tr>' +

	'<tr valign=top style="border: 1px; border-color: #343434; border-style: solid;">' +
	'<td align=center colspan="8"><b><a href="http://userscripts.org/scripts/show/125184" target=_blank><font size=-2>EveOnline frontpage v1.242 by Grey Stormshadow</a></b></td>' +
	'</tr>' +

	'</table>' +
	'</body>' +
	'</html>';

	/*window.addEventListener(
	    'load', 
	    function() { document.body.innerHTML = newBody; },
	    true);
	*/
	
	document.body.innerHTML = newBody;
}

if (false || (document.domain.match(/\.eveonline\.com/)) || (document.domain.match(/failheap-challenge\.com/)))
{
	/* THIS SECTION BASED HEAVILY ON Mittineague "No Pop-up Links GreaseMonkey Userscript" */
	/* ORIGINAL SOURCE AVAILABLE HERE: http://www.mittineague.com/dev/npl.php */
	var remove_href_popups = "true"; // <a href="javascript:window.open ....
	var remove_event_popups = "true"; // <a href="#" onclick="window.open ....
	var remove_target_popups = "true"; // <a .... target="_blank"
	var remove_on_top = "false"; // <a .... target="_top"
	
	var expression = /(.)*(window\.open\([\'|\"])(https?\:\/\/)?(www\.)?([-_A-Z0-9\/\.]+[^#|?|\'|\"|\s])*/gi;

	allLinks = document.evaluate(
	      '//a',
	      document,
	      null,
	      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	      null
	      );
	  for (var i = 0; i < allLinks.snapshotLength; i++)
	  {
	    thisLink = allLinks.snapshotItem(i);
	    if(thisLink.href.match(/www\.eveonline\.com\/$/))
	    {
	    	thisLink.setAttribute("target","_top");
	    }
	    else if(thisLink.href.match(/\.eveonline\.com/) || thisLink.href.match(/^javascript\:/) || thisLink.href.match(/failheap-challenge\.com/))
	    {
		    L_att_vals = thisLink.attributes;
		    for (var j = 0; j < L_att_vals.length; j++)
		    {
		      L_attr = L_att_vals[j].value;
		        if((L_att_vals[j].name == "href") && L_attr.match(expression) && (remove_href_popups == "true"))
		      {
		        thisLink.setAttribute("href", RegExp.$3 + RegExp.$4 + RegExp.$5);
		      }
		        if((L_att_vals[j].name != "href") && L_attr.match(expression) && (remove_event_popups == "true"))
		      {
		        thisLink.setAttribute("href", RegExp.$3 + RegExp.$4 + RegExp.$5);
		        thisLink.setAttribute(L_att_vals[j].name, "");
		      }
		        if((L_att_vals[j].name == "target") && L_attr.match(/_blank/gi) && (remove_target_popups == "true"))
		      {
		        thisLink.setAttribute(L_att_vals[j].name, "_self");
		      }
		        if((L_att_vals[j].name == "target") && L_attr.match(/_top/gi) && (remove_on_top == "true"))
	   	      {
	        	thisLink.setAttribute(L_att_vals[j].name, "_self");
	              }
		    }
	    }
	    else if(thisLink.href.match(/facebook\.com/) || thisLink.href.match(/twitter\.com/) || thisLink.href.match(/youtube\.com/) || thisLink.href.match(/google\.com/))
	    {
	       	thisLink.setAttribute("target","_blank");
	    }
		
	  }
}
})();
