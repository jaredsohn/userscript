// ==UserScript==
// @name                Nukezone Color Scheme Modder
// @namespace           noes
// @description         bring back pink!
// @include             http://www.nukezone.nu/*
// @exclude 		http://www.nukezone.nu/
// @exclude             http://www.nukezone.nu/logout.asp
// @exclude             http://www.nukezone.nu/dologin.asp
// @exclude             http://www.nukezone.nu/accessdenied.asp*
// @include		*colorschemefornukezone.html
// ==/UserScript==

//checker
if (document.location.href.search('colorschemefornukezone.html') != -1)
{
	var bs = document.getElementsByTagName('b');
	var is = document.getElementsByTagName('i');

	if (bs[0].innerHTML == 'ThisLineIndicatesItIsAnAwesomeColorScheme')
	{
		for (var i=1; i<bs.length; i++)
		{
			GM_setValue(bs[i].innerHTML, is[i].innerHTML);
		}
	}
}
else
{


//stuff
if (document.location.href.search('forum') != -1)
{
	addGlobalStyle('body { background-color: ' + GM_getValue('NZC_ForumBackgroundColor', '#D8D4B6')+ '; }');
	addGlobalStyle('td { color: ' + GM_getValue('NZC_tdFontColor', '#35382F')+ '; } ');
	addGlobalStyle('.bigTitle { color: ' + GM_getValue('NZC_BigTitleFontColor', '#35382F')+ '; } ');
	addGlobalStyle('.grayedText { color: '+ GM_getValue('NZC_ForumGUandLevelFontColor', '#52564A') + '; }');
	addGlobalStyle('.background { BACKGROUND-COLOR: ' + GM_getValue('NZC_ForumBackgroundColorTwo', '#B3B198')+ '; } ');
	addGlobalStyle('TR.BgColorHeader { background-color: ' + GM_getValue('NZC_TRBGColorHeader', '#747463')+ '; } ');
	addGlobalStyle('TR.BgColorLight { background-color: ' + GM_getValue('NZC_TRBGColorLight', '#C6C4A8')+ '; } ');
	addGlobalStyle('TR.BgColorDark { background-color: ' + GM_getValue('NZC_TRBGColorDark', '#AEAF96')+ '; } ');
	addGlobalStyle('TR.BgColorHighlight { background-color: ' + GM_getValue('NZC_TRBGColorHighlight', '#949580')+ '; } ');
	addGlobalStyle('TD.Quote { background-color: ' + GM_getValue('NZC_QuoteFontColor', '#D1CDB1')+ '; border: 1px dashed ' + GM_getValue('NZC_QuoteBorderColor', '#000000') + '; } ');
}
else
{
	addGlobalStyle('body { background-color: ' + GM_getValue('NZC_BodyColor', '#78806B')+ '; }');	
	addGlobalStyle('body#smallWindow { background-color: ' + GM_getValue('NZC_ForumBackgroundColor', '#D8D4B6')+ '; }');
	addGlobalStyle('td { color: ' + GM_getValue('NZC_tdFontColor', '#000000')+ '; } ');
}
addGlobalStyle('.contentBg{ background-color: ' + GM_getValue('NZC_ContentBGColor', '#D8D4B6')+ '; }');
addGlobalStyle('.Menu { color: ' + GM_getValue('NZC_tdMenuFontColor', '#000000')+ '; }');
addGlobalStyle('.AttackInfo { color: ' + GM_getValue('NZC_tdAttackInfoFontColor', '#35382F')+ '; }');
addGlobalStyle('.Text { color: ' + GM_getValue('NZC_tdTextFontColor', '#35382F')+ '; }');
addGlobalStyle('.PageName { color: ' + GM_getValue('NZC_tdPageNameFontColor', '#35382F')+ '; }');
addGlobalStyle('.Title { color: ' + GM_getValue('NZC_tdTitleFontColor', '#FFFFFF')+ '; }');
addGlobalStyle('.Resources { color: ' + GM_getValue('NZC_tdResourcesFontColor', '#95947E')+ '; }');
addGlobalStyle('.SmallText { color: ' + GM_getValue('NZC_tdSmallTextFontColor', '#35382F')+ '; }');
addGlobalStyle('.BigText { color: ' + GM_getValue('NZC_BigTextFontColor', '#35382F')+ '; }');
addGlobalStyle('.TitleText { color: ' + GM_getValue('NZC_TitleTextFontColor', '#35382F')+ '; }');
addGlobalStyle('.TextBoxA { background-color: ' + GM_getValue('NZC_tdTextBoxABackgroundColor', '#78806B')+ '; border: 1px solid ' + GM_getValue('NZC_tdTextBoxABorderColor', '#D8D4B6')+ '; color: ' + GM_getValue('NZC_tdTextBoxAFontColor', '#000000')+ '; }');
addGlobalStyle('.TextBoxA2 { background-color: ' + GM_getValue('NZC_tdTextBoxA2BackgroundColor', '#D1CDB1')+ '; border: 1px solid ' + GM_getValue('NZC_tdTextBoxA2BorderColor', '#000000')+ '; color: ' + GM_getValue('NZC_tdTextBoxA2FontColor', '#35382F')+ '; }');
addGlobalStyle('.TextBoxB { background-color: ' + GM_getValue('NZC_tdTextBoxBBackgroundColor', '#B3B198')+ '; border: 1px solid ' + GM_getValue('NZC_tdTextBoxBBorderColor', '#000000')+ '; color: ' + GM_getValue('NZC_tdTextBoxBFontColor', '#000000')+ '; }');
addGlobalStyle('.TextBoxB2 { background-color: ' + GM_getValue('NZC_tdTextBoxB2BackgroundColor', '#B3B198')+ '; border: 1px solid ' + GM_getValue('NZC_tdTextBoxB2BorderColor', '#000000')+ '; color: ' + GM_getValue('NZC_tdTextBoxB2FontColor', '#000000')+ '; }');
addGlobalStyle('a:link, a:visited { color: '+ GM_getValue('NZC_aLinkColor', '#52544e')+ '; }');
addGlobalStyle('a:hover { color: '+ GM_getValue('NZC_aHoverColor', '#ffffff')+ '; }');
addGlobalStyle('.Menu:link, .Menu:visited { color: '+ GM_getValue('NZC_MenuLinkColor', '#35382F')+ '; }');
addGlobalStyle('.Menu:hover { color: '+ GM_getValue('NZC_MenuHoverColor', '#696C63')+ '; }');
addGlobalStyle('.Button { background: ' + GM_getValue('NZC_aButtonBackgroundColor', '#78806B')+ ' none repeat scroll 0 0; color: ' + GM_getValue('NZC_aButtonFontColor', '#D8D4B6')+ '; }');
addGlobalStyle('.Button2 { background: ' + GM_getValue('NZC_aButton2BackgroundColor', '#B3B198')+ ' none repeat scroll 0 0; color: ' + GM_getValue('NZC_aButtonFontColor', '#000000')+ '; }');
addGlobalStyle('.BorderImage { border-color: '+ GM_getValue('NZC_aBorderImageColor', '#000000')+ '; }');
addGlobalStyle('.Border { color: ' + GM_getValue('NZC_aBorderColor', '#000000')+ '; }');

//tabs
addGlobalStyle('a#tabMessages { background:transparent url(' + GM_getValue('NZC_TabMessages', 'http://img.nukezone.nu/c1/tab_inbox.gif') + ') repeat scroll 0 0; }');
addGlobalStyle('a#tabMessages.new { background:transparent url(' + GM_getValue('NZC_TabMessagesNew', 'http://img.nukezone.nu/c1/tab_inbox_blink.gif') + ') repeat scroll 0 0; }');
addGlobalStyle('a#tabMessages:hover { background:transparent url(' + GM_getValue('NZC_TabMessagesHover', 'http://img.nukezone.nu/c1/tab_inbox_over.gif') + ') repeat scroll 0 0; }');
addGlobalStyle('a#tabLocals { background:transparent url(' + GM_getValue('NZC_TabLocals', 'http://img.nukezone.nu/c1/tab_local.gif') + ') repeat scroll 0 0; }');
addGlobalStyle('a#tabLocals.new { background:transparent url(' + GM_getValue('NZC_TabLocalsNew', 'http://img.nukezone.nu/c1/tab_local_blink.gif') + ') repeat scroll 0 0; }');
addGlobalStyle('a#tabLocals:hover { background:transparent url(' + GM_getValue('NZC_TabLocalsHover', 'http://img.nukezone.nu/c1/tab_local_over.gif') + ') repeat scroll 0 0; }');
addGlobalStyle('a#tabGlobals { background:transparent url(' + GM_getValue('NZC_TabGlobals', 'http://img.nukezone.nu/c1/tab_global.gif') + ') repeat scroll 0 0; }');
addGlobalStyle('a#tabGlobals:hover { background:transparent url(' + GM_getValue('NZC_TabGlobalsHover', 'http://img.nukezone.nu/c1/tab_global_over.gif') + ') repeat scroll 0 0; }');
addGlobalStyle('a#tabAttacks { background:transparent url(' + GM_getValue('NZC_TabAttacks', 'http://img.nukezone.nu/c1/tab_attack.gif') + ') repeat scroll 0 0; }');
addGlobalStyle('a#tabAttacks:hover { background:transparent url(' + GM_getValue('NZC_TabAttacksHover', 'http://img.nukezone.nu/c1/tab_attack_over.gif') + ') repeat scroll 0 0; }');
addGlobalStyle('a#tabSearchEvents { background:transparent url(' + GM_getValue('NZC_TabSearchEvents', 'http://img.nukezone.nu/c1/tab_searchevents.gif') + ') repeat scroll 0 0; }');
addGlobalStyle('a#tabSearchEvents:hover { background:transparent url(' + GM_getValue('NZC_TabSearchEventsHover', 'http://img.nukezone.nu/c1/tab_searchevents_over.gif') + ') repeat scroll 0 0; }');
addGlobalStyle('a#tabForums { background:transparent url(' + GM_getValue('NZC_TabForums', 'http://img.nukezone.nu/c1/tab_forums.gif') + ') repeat scroll 0 0; }');
addGlobalStyle('a#tabForums:hover { background:transparent url(' + GM_getValue('NZC_TabForumsHover', 'http://img.nukezone.nu/c1/tab_forums_over.gif') + ') repeat scroll 0 0; }');
addGlobalStyle('a#tabClanForum { background:transparent url(' + GM_getValue('NZC_TabClanForum', 'http://img.nukezone.nu/c1/tab_clanforum.gif') + ') repeat scroll 0 0; }');
addGlobalStyle('a#tabClanForum:hover { background:transparent url(' + GM_getValue('NZC_TabClanForumHover', 'http://img.nukezone.nu/c1/tab_clanforum_over.gif') + ') repeat scroll 0 0; }');
addGlobalStyle('a#tabCrewForum { background:transparent url(' + GM_getValue('NZC_TabCrewForum', 'http://img.nukezone.nu/c1/tab_crewforum.gif') + ') repeat scroll 0 0; }');
addGlobalStyle('a#tabCrewForum:hover { background:transparent url(' + GM_getValue('NZC_TabCrewForumHover', 'http://img.nukezone.nu/c1/tab_crewforum_over.gif') + ') repeat scroll 0 0; }');
addGlobalStyle('a#tabHelp { background:transparent url(' + GM_getValue('NZC_TabHelp', 'http://img.nukezone.nu/c1/tab_help.gif') + ') repeat scroll 0 0; }');
addGlobalStyle('a#tabHelp:hover { background:transparent url(' + GM_getValue('NZC_TabHelpHover', 'http://img.nukezone.nu/c1/tab_help_over.gif') + ') repeat scroll 0 0; }');
addGlobalStyle('a#tabClan { background:transparent url(' + GM_getValue('NZC_TabClan', 'http://img.nukezone.nu/c1/tab_clan.gif') + ') repeat scroll 0 0; }');
addGlobalStyle('a#tabClan:hover { background:transparent url(' + GM_getValue('NZC_TabClanHover', 'http://img.nukezone.nu/c1/tab_clan_over.gif') + ') repeat scroll 0 0; }');
addGlobalStyle('a#tabSpeedRound { background:transparent url(' + GM_getValue('NZC_TabSpeedRound', 'http://img.nukezone.nu/c1/tab_speedround.gif') + ') repeat scroll 0 0; }');
addGlobalStyle('a#tabSpeedRound:hover { background:transparent url(' + GM_getValue('NZC_TabSpeedRoundHover', 'http://img.nukezone.nu/c1/tab_speedround_over.gif') + ') repeat scroll 0 0; }');

//tables
addGlobalStyle('table.content tr { background-color: ' + GM_getValue('NZC_TableContentBackgroundColor', '#c6c4a8') + '; }');
addGlobalStyle('table.content tr.header, table.content tr.headerRow { background-color: ' + GM_getValue('NZC_TableContentSpecialBackgroundColor', '#747463') + '; }');
addGlobalStyle('table.content tr.header td { color: ' + GM_getValue('NZC_TableContentFontColor', '#ffffff') + '; }');
addGlobalStyle('table.content tr.headerRow td { color: ' + GM_getValue('NZC_TableContentSpecialFontColor', '#ffffff') + '; }');
addGlobalStyle('table tr.frame { background-color: ' + GM_getValue('NZC_TableFrameBackgroundColor', '#000000') + '; }');
addGlobalStyle('table.content tr.dark, table.content tr td.dark { background-color: ' + GM_getValue('NZC_TableContentDarkBackgroundColor', '#aba98e') + '; }');
if (GM_getValue('NZC_MenuHolderBorderColor') != '')
{
addGlobalStyle('#menuHolder { background-color: ' + GM_getValue('NZC_MenuHolderBackgroundColor', '#c6c4a8') + '; border: 1px solid ' + GM_getValue('NZC_MenuHolderBorderColor', '#aeaf96') + '; color: ' + GM_getValue('NZC_MenuHolderFontColor', '#000000') + '; }');
}
else
{
addGlobalStyle('#menuHolder { background-color: ' + GM_getValue('NZC_MenuHolderBackgroundColor', '#c6c4a8') + '; border: 1px solid #aeaf96; color: ' + GM_getValue('NZC_MenuHolderFontColor', '#000000') + '; }');	
}
addGlobalStyle('#menuHeader { background: transparent url(' + GM_getValue('NZC_MenuHeaderImage', 'http://se.images.nukezone.nu/c1/game_menu.gif') + ') no-repeat scroll left top; } ');
addGlobalStyle('#menuHolder a:link, #menuHolder a:visited { color: ' + GM_getValue('NZC_MenuHolderLinkColor', '#35382f') + '; }');
addGlobalStyle('#menuHolder a:hover { color: ' + GM_getValue('NZC_MenuHolderHoverColor', '#ffffff') + '; }');
addGlobalStyle('option.highlight { background-color: ' + GM_getValue('NZC_OptionHighlightBackgroundColor', '#949580') + '; }');

//power status bar
addGlobalStyle('.bar .voteDesignator { background: transparent url(' + GM_getValue('NZC_BarVoteDesignator', 'http://se.images.nukezone.nu/c1/vote_sign.gif') + ') no-repeat scroll left top }');
addGlobalStyle('.bar .barLeft { background:  transparent url(' + GM_getValue('NZC_BarLeft', 'http://se.images.nukezone.nu/c1/bar_left.gif') + ') no-repeat scroll left top }');
addGlobalStyle('.bar .barRight { background:  transparent url(' + GM_getValue('NZC_BarRight', 'http://se.images.nukezone.nu/c1/bar_right.gif') + ') no-repeat scroll left top }');
addGlobalStyle('.bar .barFill { background:  transparent url(' + GM_getValue('NZC_BarFill', 'http://se.images.nukezone.nu/c1/bar_fill.gif') + ') repeat-x scroll left top }');
addGlobalStyle('.bar .barWarning { background:  transparent url(' + GM_getValue('NZC_BarWarning', 'http://se.images.nukezone.nu/c1/bar_warning.gif') + ') repeat-x scroll left top }');
addGlobalStyle('.bar .barEmpty { background:  transparent url(' + GM_getValue('NZC_BarEmpty', 'http://se.images.nukezone.nu/c1/bar_empty.gif') + ') repeat-x scroll left top }');

addGlobalStyle('h1 { background: transparent url(' + GM_getValue('NZC_SmallWindowTitle', 'http://glamdring.se/files/friblurks.2009.04.02.19.22.34.png') + ') repeat scroll 0 0; }');
addGlobalStyle('h1 { color: ' + GM_getValue('NZC_BigTextFontColor', '#35382F') + '; }');

addGlobalStyle('.Asterisk { color: ' + GM_getValue('NZC_AsteriskColor', '#FFFF00')+ '; } ');



alterTDs();
alterImages();
}
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function alterTDs() {
	var tds = document.getElementsByTagName('td');
	for (var i=0; i<tds.length; i++)
	{
		var td = tds[i];
		if (td.getAttribute('background') != '')
		{
			changeImage(td);
		}
		if (td.getAttribute('bgcolor') == '#d8d4b6' && GM_getValue('NZC_ContentBGColor') != '')
		{
			td.setAttribute('bgcolor', GM_getValue('NZC_ContentBGColor', '#d8d4b6'));
		}

	}
}

//weeeeeeeeee
function changeImage(td)
{
	if (td.getAttribute('background') == 'http://se.images.nukezone.nu/c1/up_left.gif')
	{
		td.setAttribute('background', GM_getValue('NZC_ImageUpLeft', 'http://se.images.nukezone.nu/c1/up_left.gif'));
	}
	if (td.getAttribute('background') == 'http://se.images.nukezone.nu/c1/logo_top.gif')
	{
		td.setAttribute('background', GM_getValue('NZC_ImageLogoTop', 'http://se.images.nukezone.nu/c1/logo_top.gif'));	
		td.setAttribute('bgcolor', GM_getValue('NZC_ContentBGColor', '#D8D4B6'));
	}
	if (td.getAttribute('background') == 'http://se.images.nukezone.nu/c1/up_right.gif')
	{
		td.setAttribute('background', GM_getValue('NZC_ImageUpRight', 'http://se.images.nukezone.nu/c1/up_right.gif'));		
	}
	if (td.getAttribute('background') == 'http://se.images.nukezone.nu/c1/middle_left.gif')
	{
		td.setAttribute('background', GM_getValue('NZC_ImageMiddleLeft', 'http://se.images.nukezone.nu/c1/middle_left.gif'));		
	}
	if (td.getAttribute('background') == 'http://se.images.nukezone.nu/c1/logo_middle.gif')
	{
		td.setAttribute('background', GM_getValue('NZC_ImageLogoMiddle', 'http://se.images.nukezone.nu/c1/logo_middle.gif'));		
		td.setAttribute('bgcolor', GM_getValue('NZC_ContentBGColor', '#D8D4B6'));
	}
	if (td.getAttribute('background') == 'http://se.images.nukezone.nu/c1/middle_right.gif')
	{
		td.setAttribute('background', GM_getValue('NZC_ImageMiddleRight', 'http://se.images.nukezone.nu/c1/middle_right.gif'));		
	}
	if (td.getAttribute('background') == 'http://se.images.nukezone.nu/c1/logo_bottom.gif')
	{
		td.setAttribute('background', GM_getValue('NZC_ImageLogoBottom', 'http://se.images.nukezone.nu/c1/logo_bottom.gif'));		
		td.setAttribute('bgcolor', GM_getValue('NZC_ContentBGColor', '#D8D4B6'));
	}
	if (td.getAttribute('background') == 'http://se.images.nukezone.nu/c1/bottom_left.gif')
	{
		td.setAttribute('background', GM_getValue('NZC_ImageBottomLeft', 'http://se.images.nukezone.nu/c1/bottom_left.gif'));		
	}
	if (td.getAttribute('background') == 'http://se.images.nukezone.nu/c1/middle_background1.gif')
	{
		td.setAttribute('background', GM_getValue('NZC_ImageMiddleBackground', 'http://se.images.nukezone.nu/c1/middle_background1.gif'));		
	}
	if (td.getAttribute('background') == 'http://se.images.nukezone.nu/c1/middle_background2.gif')
	{
		td.setAttribute('background', GM_getValue('NZC_ImageMiddleBackground2', 'http://se.images.nukezone.nu/c1/middle_background2.gif'));		
	}
	if (td.getAttribute('background') == 'http://se.images.nukezone.nu/c1/bottom_right.gif')
	{
		td.setAttribute('background', GM_getValue('NZC_ImageBottomRight', 'http://se.images.nukezone.nu/c1/bottom_right.gif'));		
	}
	
	if (td.getAttribute('background') == 'http://se.images.nukezone.nu/forum1/top_filler.gif')
	{
		td.setAttribute('background', GM_getValue('NZC_ForumTopFiller', 'http://glamdring.se/files/friblurks.2009.04.02.19.32.25.png'));
	}
	
}

function alterImages()
{
	var images = document.getElementsByTagName('img');
	for (k=0;k<images.length;k++)
	{
		var img = images[k];
		if (img.getAttribute('src') == 'http://se.images.nukezone.nu/c1/primetic.gif')
		{
			img.setAttribute('src', GM_getValue('NZC_ImagePrimetic', 'http://glamdring.se/files/friblurks.2009.04.02.14.15.13.png'));
		}
		if (img.getAttribute('src') == 'http://se.images.nukezone.nu/c1/find_province.gif')
		{
			img.setAttribute('src', GM_getValue('NZC_ImageFindProvince', 'http://glamdring.se/files/friblurks.2009.03.17.21.21.38.png'));
		}
		if (img.getAttribute('src') == 'http://se.images.nukezone.nu/c1/graph_dark.gif')
		{
			img.setAttribute('src', GM_getValue('NZC_ImageGraphDark', 'http://glamdring.se/files/friblurks.2009.04.02.19.10.21.png'));
		}
		if (img.getAttribute('src') == 'http://se.images.nukezone.nu/c1/graph_light.gif')
		{
			img.setAttribute('src', GM_getValue('NZC_ImageGraphLight', 'http://glamdring.se/files/friblurks.2009.04.02.19.10.33.png'));
		}
		if (img.getAttribute('src') == 'http://se.images.nukezone.nu/forum1/top_title.gif')
		{
			img.setAttribute('src', GM_getValue('NZC_ForumTitle', 'http://glamdring.se/files/friblurks.2009.04.02.19.43.31.png'));
		}
		if (img.getAttribute('src') == 'http://se.images.nukezone.nu/forum1/search_forums_options.gif')
		{
			img.setAttribute('src', GM_getValue('NZC_ForumSearch', 'http://glamdring.se/files/friblurks.2009.04.02.19.50.45.png'));
		}
		if (img.getAttribute('src') == 'http://se.images.nukezone.nu/forum1/create_topic.gif')
		{
			img.setAttribute('src', GM_getValue('NZC_ForumCreateTopic', 'http://glamdring.se/files/friblurks.2009.04.02.20.01.15.png'));
		}
		if (img.getAttribute('src') == 'http://se.images.nukezone.nu/forum1/post_reply.gif')
		{
			img.setAttribute('src', GM_getValue('NZC_ForumPostReply', 'http://glamdring.se/files/friblurks.2009.04.02.20.01.31.png'));
		}
		if (img.getAttribute('src') == 'http://se.images.nukezone.nu/forum1/primetic.gif')
		{
			img.setAttribute('src', GM_getValue('NZC_ImagePrimetic', 'http://glamdring.se/files/friblurks.2009.04.02.14.15.13.png'));
		}
		
		
		if (img.getAttribute('src') == 'http://se.images.nukezone.nu/c1/icons/event_1.gif' || img.getAttribute('src') == 'http://se.images.nukezone.nu/c1/icons/event_1b.gif')
		{
			img.setAttribute('src', GM_getValue('NZC_ImageEvent1', 'http://glamdring.se/files/friblurks.2009.04.02.14.32.08.png'));
		}
		if (img.getAttribute('src') == 'http://se.images.nukezone.nu/c1/icons/event_2.gif' || img.getAttribute('src') == 'http://se.images.nukezone.nu/c1/icons/event_2b.gif')
		{
			img.setAttribute('src', GM_getValue('NZC_ImageEvent2', 'http://glamdring.se/files/friblurks.2009.04.02.14.32.40.png'));
		}
		if (img.getAttribute('src') == 'http://se.images.nukezone.nu/c1/icons/event_3.gif' || img.getAttribute('src') == 'http://se.images.nukezone.nu/c1/icons/event_3b.gif')
		{
			img.setAttribute('src', GM_getValue('NZC_ImageEvent3', 'http://glamdring.se/files/friblurks.2009.04.02.14.32.53.png'));
		}
		if (img.getAttribute('src') == 'http://se.images.nukezone.nu/c1/icons/event_4.gif' || img.getAttribute('src') == 'http://se.images.nukezone.nu/c1/icons/event_4b.gif')
		{
			img.setAttribute('src', GM_getValue('NZC_ImageEvent4', 'http://glamdring.se/files/friblurks.2009.04.02.14.33.04.png'));
		}
		if (img.getAttribute('src') == 'http://se.images.nukezone.nu/c1/icons/event_5.gif' || img.getAttribute('src') == 'http://se.images.nukezone.nu/c1/icons/event_5b.gif')
		{
			img.setAttribute('src', GM_getValue('NZC_ImageEvent5', 'http://glamdring.se/files/friblurks.2009.04.02.14.33.13.png'));
		}
		if (img.getAttribute('src') == 'http://se.images.nukezone.nu/c1/icons/event_6.gif' || img.getAttribute('src') == 'http://se.images.nukezone.nu/c1/icons/event_6b.gif')
		{
			img.setAttribute('src', GM_getValue('NZC_ImageEvent6', 'http://glamdring.se/files/friblurks.2009.04.02.14.33.23.png'));
		}
		if (img.getAttribute('src') == 'http://se.images.nukezone.nu/c1/icons/event_7.gif' || img.getAttribute('src') == 'http://se.images.nukezone.nu/c1/icons/event_7b.gif')
		{
			img.setAttribute('src', GM_getValue('NZC_ImageEvent7', 'http://glamdring.se/files/friblurks.2009.04.02.14.33.35.png'));
		}
		if (img.getAttribute('src') == 'http://se.images.nukezone.nu/c1/icons/event_8.gif' || img.getAttribute('src') == 'http://se.images.nukezone.nu/c1/icons/event_8b.gif')
		{
			img.setAttribute('src', GM_getValue('NZC_ImageEvent8', 'http://glamdring.se/files/friblurks.2009.04.02.14.33.44.png'));
		}
		if (img.getAttribute('src') == 'http://se.images.nukezone.nu/c1/icons/event_9.gif' || img.getAttribute('src') == 'http://se.images.nukezone.nu/c1/icons/event_9b.gif')
		{
			img.setAttribute('src', GM_getValue('NZC_ImageEvent9', 'http://glamdring.se/files/friblurks.2009.04.02.14.33.54.png'));
		}
		if (img.getAttribute('src') == 'http://se.images.nukezone.nu/c1/icons/event_10.gif' || img.getAttribute('src') == 'http://se.images.nukezone.nu/c1/icons/event_10b.gif')
		{
			img.setAttribute('src', GM_getValue('NZC_ImageEvent10', 'http://glamdring.se/files/friblurks.2009.04.02.14.32.20.png'));
		}
		if (img.getAttribute('src') == 'http://se.images.nukezone.nu/c1/icons/event_11.gif' || img.getAttribute('src') == 'http://se.images.nukezone.nu/c1/icons/event_11b.gif')
		{
			img.setAttribute('src', GM_getValue('NZC_ImageEvent11', 'http://glamdring.se/files/friblurks.2009.04.02.14.32.30.png'));
		}
		if (img.getAttribute('src') == 'http://se.images.nukezone.nu/forum1/new_arrow_a.gif' || img.getAttribute('src') == 'http://se.images.nukezone.nu/forum1/new_arrow_b.gif')
		{
			img.setAttribute('src', GM_getValue('NZC_ForumIconArrows', 'http://glamdring.se/files/friblurks.2009.04.02.21.06.52.png'));
		}
		if (img.getAttribute('src') == 'http://se.images.nukezone.nu/forum1/icons/1a.gif' || img.getAttribute('src') == 'http://se.images.nukezone.nu/forum1/icons/1b.gif')
		{
			img.setAttribute('src', GM_getValue('NZC_ForumIconDiamond', 'http://glamdring.se/files/friblurks.2009.04.02.21.07.19.png'));
		}
		if (img.getAttribute('src') == 'http://se.images.nukezone.nu/forum1/icons/102b.gif' || img.getAttribute('src') == 'http://se.images.nukezone.nu/forum1/icons/102a.gif')
		{
			img.setAttribute('src', GM_getValue('NZC_ForumIconFag', 'http://glamdring.se/files/friblurks.2009.04.02.21.07.28.png'));
		}
		if (img.getAttribute('src') == 'http://se.images.nukezone.nu/forum1/icons/101a.gif' || img.getAttribute('src') == 'http://se.images.nukezone.nu/forum1/icons/101b.gif')
		{
			img.setAttribute('src', GM_getValue('NZC_ForumIconGlobe', 'http://glamdring.se/files/friblurks.2009.04.02.21.07.44.png'));
		}
		if (img.getAttribute('src') == 'http://se.images.nukezone.nu/forum1/icons/4a.gif' || img.getAttribute('src') == 'http://se.images.nukezone.nu/forum1/icons/4b.gif')
		{
			img.setAttribute('src', GM_getValue('NZC_ForumIconHelp', 'http://glamdring.se/files/friblurks.2009.04.02.21.07.52.png'));
		}
		if (img.getAttribute('src') == 'http://se.images.nukezone.nu/forum1/icons/3a.gif' || img.getAttribute('src') == 'http://se.images.nukezone.nu/forum1/icons/3b.gif')
		{
			img.setAttribute('src', GM_getValue('NZC_ForumIconInfo', 'http://glamdring.se/files/friblurks.2009.04.02.21.08.01.png'));
		}
		if (img.getAttribute('src') == 'http://se.images.nukezone.nu/forum1/icons/8a.gif' || img.getAttribute('src') == 'http://se.images.nukezone.nu/forum1/icons/8b.gif')
		{
			img.setAttribute('src', GM_getValue('NZC_ForumIconLight', 'http://glamdring.se/files/friblurks.2009.04.02.21.08.09.png'));
		}
		if (img.getAttribute('src') == 'http://se.images.nukezone.nu/forum1/icons/2a.gif' || img.getAttribute('src') == 'http://se.images.nukezone.nu/forum1/icons/2b.gif')
		{
			img.setAttribute('src', GM_getValue('NZC_ForumIconLightning', 'http://glamdring.se/files/friblurks.2009.04.02.21.08.20.png'));
		}
		if (img.getAttribute('src') == 'http://se.images.nukezone.nu/forum1/icons/7a.gif' || img.getAttribute('src') == 'http://se.images.nukezone.nu/forum1/icons/7b.gif')
		{
			img.setAttribute('src', GM_getValue('NZC_ForumIconSad', 'http://glamdring.se/files/friblurks.2009.04.02.21.08.28.png'));
		}
		if (img.getAttribute('src') == 'http://se.images.nukezone.nu/forum1/icons/6a.gif' || img.getAttribute('src') == 'http://se.images.nukezone.nu/forum1/icons/6b.gif')
		{
			img.setAttribute('src', GM_getValue('NZC_ForumIconSmile', 'http://glamdring.se/files/friblurks.2009.04.02.21.08.39.png'));
		}
		if (img.getAttribute('src') == 'http://se.images.nukezone.nu/forum1/icons/5a.gif' || img.getAttribute('src') == 'http://se.images.nukezone.nu/forum1/icons/5b.gif')
		{
			img.setAttribute('src', GM_getValue('NZC_ForumIconStar', 'http://glamdring.se/files/friblurks.2009.04.02.21.09.00.png'));
		}
	}
// 	
}
