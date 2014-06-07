// ==UserScript==
// @name        ES Quick Reply
// @namespace   http://shadow.ed
// @include     https://www.elitesecurity.org/t*
// @include     http://www.elitesecurity.org/t*
// @include     https://www.elitemadzone.org/t*
// @include     http://www.elitemadzone.org/t*
// @version     0.2.2
// @updateURL   https://userscripts.org/scripts/source/186811.user.js
// @grant       GM_getValue
// @grant       GM_setValue
// @grant	GM_xmlhttpRequest
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==

var ESQROptions = {
	AlwaysQuick : true,
	QuickQuote: true,
	IgnoreUsers: true,
	InitialyHideQR: false,
	HideRelatedAndNavigation: false,
	HeaderCollapsed: false,
	MarkMarkedTopics: false,
	IgnoredUsers: [],
	Load : function() {
		this.AlwaysQuick = GM_getValue('AlwaysQuick', true);
		this.QuickQuote = GM_getValue('QuickQuote', true);
		this.IgnoreUsers = GM_getValue('IgnoreUsers', true);
		this.InitialyHideQR = GM_getValue('InitialyHideQR', false);
		this.HideRelatedAndNavigation = GM_getValue('HideRelatedAndNavigation', false);
		this.HeaderCollapsed = GM_getValue('HeaderCollapsed', true);
		this.IgnoredUsers = JSON.parse(GM_getValue('IgnoredUsers', '[]'));
	},
	Save : function() {
		GM_setValue('AlwaysQuick', this.AlwaysQuick);
		GM_setValue('QuickQuote', this.QuickQuote);
		GM_setValue('IgnoreUsers', this.IgnoreUsers);
		GM_setValue('InitialyHideQR', this.InitialyHideQR);
		GM_setValue('HideRelatedAndNavigation', this.HideRelatedAndNavigation);
		GM_setValue('HeaderCollapsed', this.HeaderCollapsed);
		GM_setValue('IgnoredUsers', JSON.stringify(this.IgnoredUsers));
	}
};

var TopicID = $('form[name="pretragateme"] input[name="TopicID"]').attr('value');
var BoardID = $('input[name="BoardID"]').attr('value');
var TopicTitle = $('#naslovteme h1').text();
var IsMod = ($('.output_pmt1').length > 0);
var IsHTTPS = (window.location.href.indexOf('https:') == 0);
var CurrentForumStyle = $('select[name="novi_stil"] option:selected').text();
var MenuList = $('#menu > ul');
var UserMenuList = $('#loginBox > ul');
var HeaderBox = $('#headerbox');
var MarkedTopics = [];
var HeaderButtons = {	//Not all of them!
	Homepage: MenuList.children(':contains("Naslovna")'),
	ES: $('<li><a href="//www.elitesecurity.org" class="menu">ES</a></li>'),
	EM: $('<li><a href="//www.elitesemadzone.org" class="menu">EM</a></li>'),
	FAQ: MenuList.children(':contains("FAQ")'),
	Rules : MenuList.children(':contains("Pravilnik")'),
	About : MenuList.children(':contains("O ES-u")'),
	Team: MenuList.children(':contains("Tim")'),
	Users : MenuList.children(':contains("Korisnici")'),
	Email : MenuList.children(':contains("Email")'),
	Statistics: MenuList.children(':contains("Statistike")'),
	Chat: MenuList.children(':contains("Chat")'),
	Profile: UserMenuList.children(':contains("Moj profil")'),
	EditProfile: UserMenuList.children(':contains("Izmena profila")'),
	MailingLists: UserMenuList.children(':contains("Mailing liste")'),
	FollowedTopics: UserMenuList.children(':contains("Praćenje tema")'),
	MarkedTopics: UserMenuList.children(':contains("Markirane teme")'),
	Flashback: UserMenuList.children(':contains("Flashback")'),
	PrivateMessages: UserMenuList.children(':contains("Privatne poruke")'),
	Mods: UserMenuList.children(':contains("Mods")')
};
var ReplyForm = $('<form name="form1" method="post" action="tema/odgovor/poruka.php">\
<table id="QuickReply" width="98%" cellspacing="0" cellpadding="0" border="0" align="center" style="margin-top: 10px;"><tbody><tr><td class="brdr">\
<table width="100%" cellspacing="1" cellpadding="4" border="0">\
<tbody>\
<tr>\
<td width="150" nowrap="nowrap" align="left" class="msg1"><b>Naslov:</b></td>\
<td width="100%" align="left" class="msg1">\
<input type="text" minlength="2" required="1" value="Re: Sečenje kabla za kablovsku televiziju." maxlength="100" size="80" name="subject">\
</td>\
</tr>\
<tr>\
<td width="130" valign="top" nowrap="nowrap" align="left" class="msg1"><b>Sličica poruke:</b></td>\
<td width="100%" align="left" class="msg1"><input type="radio" checked="checked" value="1" name="posticon" class="checkbox"><img border="0" alt="" src="https://www.elitesecurity.org/images/static/post.gif"> <input type="radio" value="2" name="posticon" class="checkbox"><img border="0" alt="" src="https://www.elitesecurity.org/images/static/idea.gif"> <input type="radio" value="3" name="posticon" class="checkbox"><img border="0" alt="" src="https://www.elitesecurity.org/images/static/alert.gif"> <input type="radio" value="4" name="posticon" class="checkbox"><img border="0" alt="" src="https://www.elitesecurity.org/images/static/attention.gif"> <input type="radio" value="5" name="posticon" class="checkbox"><img border="0" alt="" src="https://www.elitesecurity.org/images/static/angry.gif"> <input type="radio" value="6" name="posticon" class="checkbox"><img border="0" alt="" src="https://www.elitesecurity.org/images/static/thumbup.gif"> <input type="radio" value="7" name="posticon" class="checkbox"><img border="0" alt="" src="https://www.elitesecurity.org/images/static/thumbdown.gif"> <input type="radio" value="8" name="posticon" class="checkbox"><img border="0" alt="" src="https://www.elitesecurity.org/images/static/questionmark.gif"> <input type="radio" value="10" name="posticon" class="checkbox"><img border="0" alt="" src="https://www.elitesecurity.org/images/static/smile4.gif"> <input type="radio" value="11" name="posticon" class="checkbox"><img border="0" alt="" src="https://www.elitesecurity.org/images/static/cry.gif"> <br><input type="radio" value="12" name="posticon" class="checkbox"><img border="0" alt="" src="https://www.elitesecurity.org/images/static/disgust.gif"> <input type="radio" value="13" name="posticon" class="checkbox"><img border="0" alt="" src="https://www.elitesecurity.org/images/static/sad.gif"> <input type="radio" value="14" name="posticon" class="checkbox"><img border="0" alt="" src="https://www.elitesecurity.org/images/static/Up_to_something.gif"> <input type="radio" value="15" name="posticon" class="checkbox"><img border="0" alt="" src="https://www.elitesecurity.org/images/static/laff.gif"> <input type="radio" value="16" name="posticon" class="checkbox"><img border="0" alt="" src="https://www.elitesecurity.org/images/static/eek2.gif"> <input type="radio" value="17" name="posticon" class="checkbox"><img border="0" alt="" src="https://www.elitesecurity.org/images/static/cwm13.gif"> <input type="radio" value="18" name="posticon" class="checkbox"><img border="0" alt="" src="https://www.elitesecurity.org/images/static/eek4.gif"> <input type="radio" value="19" name="posticon" class="checkbox"><img border="0" alt="" src="https://www.elitesecurity.org/images/static/grrr.gif"> <input type="radio" value="22" name="posticon" class="checkbox"><img border="0" alt="" src="https://www.elitesecurity.org/images/static/coolsquare.gif"> <input type="radio" value="21" name="posticon" class="checkbox"><img border="0" alt="" src="https://www.elitesecurity.org/images/static/square.gif"> <br><input type="radio" value="23" name="posticon" class="checkbox"><img border="0" alt="" src="https://www.elitesecurity.org/images/static/angrysquare.gif"> <input type="radio" value="24" name="posticon" class="checkbox"><img border="0" alt="" src="https://www.elitesecurity.org/images/static/confusedsquare.gif"> <input type="radio" value="25" name="posticon" class="checkbox"><img border="0" alt="" src="https://www.elitesecurity.org/images/static/winksquare.gif"> <input type="radio" value="26" name="posticon" class="checkbox"><img border="0" alt="" src="https://www.elitesecurity.org/images/static/frownsquare.gif"> <input type="radio" value="27" name="posticon" class="checkbox"><img border="0" alt="" src="https://www.elitesecurity.org/images/static/icon34.gif"> <input type="radio" value="28" name="posticon" class="checkbox"><img border="0" alt="" src="https://www.elitesecurity.org/images/static/icon40.gif"> <input type="radio" value="29" name="posticon" class="checkbox"><img border="0" alt="" src="https://www.elitesecurity.org/images/static/icon30.gif"> <input type="radio" value="30" name="posticon" class="checkbox"><img border="0" alt="" src="https://www.elitesecurity.org/images/static/bsd.gif"> <input type="radio" value="31" name="posticon" class="checkbox"><img border="0" alt="" src="https://www.elitesecurity.org/images/static/icon11.gif"> <input type="radio" value="32" name="posticon" class="checkbox"><img border="0" alt="" src="https://www.elitesecurity.org/images/static/vertwijfeld.gif"> <br></td>\
</tr>\
<tr valign="top">\
<td width="130" valign="top" nowrap="nowrap" align="left" class="msg1"><b>Poruka:</b>\
<hr width="90%" height="1">\
<b>Instant dodavanje:</b><br><br>\
\
<span style="font-size:8pt">\
<a href="javascript:addtag(\'„\',0)"><big>„</big></a> <a href="javascript:addtag(\'“\',0)"><big>“</big></a> <a href="javascript:addtag(\'”\',0)"><big>”</big></a> <a href="javascript:addtag(\'&ndash;\',0)"><big>&ndash;</big></a> <a href="javascript:addtag(\'&mdash;\',0)"><big>&mdash;</big></a> <a href="javascript:addtag(\'€\',0)"><big>€</big></a> <a href="javascript:addtag(\'‰\',0)">‰</a> <a href="javascript:addtag(\'•\',0)"><big>•</big></a> <a href="javascript:addtag(\'→\',0)"><big>→</big></a><br><br>\
\
<b>Bold</b> - <a href="javascript:addtag(\'b\',2)" class="small">[b] [/b]</a><br>\
<i>Italic</i> - <a href="javascript:addtag(\'i\',2)" class="small">[i] [/i]</a><br>\
<u>Underline</u> - <a href="javascript:addtag(\'u\',2)" class="small">[u] [/u]</a><br>\
Horizontal line - <a href="javascript:addtag(\'hr\',1)" class="small">[hr]</a><br>\
\
<span style="color:red">Red</span> - <a href="javascript:addtag(\'red\',2)" class="small">[red] [/red]</a><br>\
<span style="color:blue">Blue</span> - <a href="javascript:addtag(\'blue\',2)" class="small">[blue] [/blue]</a><br>\
<sup>SuperScript - </sup><a href="javascript:addtag(\'sup\',2)" class="small">[sup] [/sup]</a><br>\
<sub>SubScript - </sub><a href="javascript:addtag(\'sub\',2)" class="small">[sub] [/sub]</a><br>\
Code - <a href="javascript:addtag(\'code\',2)" class="small">[code] [/code]</a><br>\
\
Quote - <a href="javascript:addtag(\'quote\',2)" class="small">[quote] [/quote]</a><br>\
Image - <a href="javascript:addtag(\'img\',2)" class="small">[img] [/img]</a><br>\
Google search - <a href="javascript:addtag(\'google\',2)" class="small">[google] [/google]</a><br>\
Url - <a href="javascript:addurltag(\'link\')" class="small">[url=] [/url]</a><br>\
Email - <a href="javascript:addurltag(\'email\')" class="small">[url=] [/url]</a><br>\
TT - <a href="javascript:addtag(\'tt\',2)" class="small">[tt] [/tt]</a><br>\
\
Term - <a href="javascript:addtag(\'term\',2)" class="small">[term] [/term]</a><br>\
BSoD - <a href="javascript:addtag(\'bsod\',2)" class="small">[bsod] [/bsod]</a><br>\
Pre - <a href="javascript:addtag(\'pre\',2)" class="small">[pre] [/pre]</a><br>\
LateX - <a href="javascript:addtag(\'tex\',2)" class="small">[tex] [/tex]</a><br>\
Youtube - <a href="javascript:addtag(\'youtube\',2)" class="small">[youtube] [/youtube]</a><br>\
[att_img] - <a href="javascript:addtag(\'att_img\',1)" class="small">[att_img]</a><br>\
[att_url] - <a href="javascript:addtag(\'att_url\',1)" class="small">[att_url]</a><br>\
</span>\
\
</td>\
<td width="100%" valign="top" align="left" class="msg1"><textarea wrap="virtual" rows="30" style="width:99%" name="message" id="message"></textarea></td>\
</tr>\
<tr valign="top">\
<td width="130" valign="top" nowrap="nowrap" align="left" class="msg1"><b>Opcije:</b></td>\
<td width="100%" valign="top" align="left" class="msg1">\
<input type="checkbox" value="1" name="emoticon" id="emoticon" class="checkbox"><b><label for="emoticon">Smajliji u ovoj poruci?</label><b><br>\
<input type="checkbox" value="1" name="pracenje" id="pracenje" class="checkbox"><b><label for="pracenje">Obaveštavanje emailom o novim odgovorima?</label></b>\
\
\
</b></b></td>\
</tr>\
<tr>\
<td width="130" nowrap="nowrap" align="left" class="msg1">&nbsp;</td>\
<td width="100%" align="left" class="msg1">\
<input type="hidden" value="" name="TopicID">\
<input type="hidden" value="2" name="BoardID">\
<input type="submit" value="Pošalji odgovor" name="Submit">\
</td>\
</tr>\
</tbody></table></td></tr></tbody></table>\
</form>');

var OptionsBox = $('<div style="position:fixed;	top:0;	left:0;	width:100%;	height:100%; display: none;">\
	<div style="position:fixed;	top:0;	left:0;	width:100%;	height:100%; background-color: #bbbbdd; opacity: 0.5; position:absolute; z-index: 0;">\
	</div>\
	<div style="width: 100%; margin-top: 100px; position:absolute; z-index: 1;">\
		<div style="margin-left: auto; margin-right: auto; padding: 20px 8px 8px 8px; width: 250px; background-color: white; border: 1px solid #888888; box-shadow: 0px 0px 10px 10px white;">\
			<span style="font-size: 12pt;">ES Quick Reply</span>\
			<div style="margin-top: 8px;">\
				<input style="float: left" type="checkbox" id="esqr_alwaysquick" />\
				<span style="float: left;">Uvek koristi brzi odgovor</span>\
				<input style="clear: left; float: left" type="checkbox" id="esqr_quickquote" />\
				<span style="float: left">Brzi odgovor sa citatom</span>\
				<input style="clear: left; float: left" type="checkbox" id="esqr_inithideqr" />\
				<span style="float: left">Inicijalno sakrij brzi odgovor</span>\
				<input style="clear: left; float: left" type="checkbox" id="esqr_hidenavigation" />\
				<span style="float: left">Sakrij srodne teme i "navigaciju"</span>\
				<input style="clear: left; float: left" type="checkbox" id="esqr_ignoreusers" />\
				<span style="float: left">Ignorisanje korisnika</span>\
				<span style="clear: left; float: left">Ignorisani korisnici</span>\
				<div id="ignorelist" style="clear: left; float: left; width: 100%; height: 150px; overflow: auto; border: solid 1px #666666; padding-left: 4px; text-align: left;">\
				</div>\
				<div style="clear: left; margin-left: auto; margin-right: auto; padding-top: 8px;">\
					<input type="button" id="esqr_save" value="Sačuvaj" />\
					<input type="button" id="esqr_cancel" value="Otkaži" />\
				</div>\
			</div>\
		</div>\
	</div>\
</div>');

var InMenuSearch = $('<form method="GET" action="/pretraga" style="display: inline">\
	<input type="text" value="" maxlength="40" size="20" name="Phrase" placeholder="Pretraga">\
	<input type="hidden" value="searchoptions" name="action">\
	<input type="hidden" value="" name="BoardID">\
	<input type="hidden" value="Search" name="Submit">\
	<input type="submit" value="Google" name="SubmitType" style="text-ident: 0px; padding: 0px;">\
	<input type="submit" value="Forum" name="SubmitType" onclick="this.value=\'Ovog foruma\'" style="text-ident: 0px; padding: 0px;">\
</form>');

var chkAlwaysQuick = OptionsBox.find('#esqr_alwaysquick');
var chkQuickQuote = OptionsBox.find('#esqr_quickquote');
var chkIgnoreUsers = OptionsBox.find('#esqr_ignoreusers');
var chkInitialyHideQR = OptionsBox.find('#esqr_inithideqr');
var chkHideNavigation = OptionsBox.find('#esqr_hidenavigation');
var divIgnoreList = OptionsBox.find('#ignorelist');



function ShowQuickReplyOptions() {
	chkAlwaysQuick.attr('checked', ESQROptions.AlwaysQuick);
	chkQuickQuote.attr('checked', ESQROptions.QuickQuote);
	chkInitialyHideQR.attr('checked', ESQROptions.InitialyHideQR);
	chkIgnoreUsers.attr('checked', ESQROptions.IgnoreUsers);
	chkHideNavigation.attr('checked', ESQROptions.HideRelatedAndNavigation);
	FillIgnoreList();
	OptionsBox.show();
}
function HideQuickReplyOptions() {
	OptionsBox.hide();
	ESQROptions.Load();
}
function SaveOptions() {
	ESQROptions.AlwaysQuick = chkAlwaysQuick.is(':checked');
	ESQROptions.QuickQuote = chkQuickQuote.is(':checked');
	ESQROptions.InitialyHideQR = chkInitialyHideQR.is(':checked');
	ESQROptions.IgnoreUsers = chkIgnoreUsers.is(':checked');
	ESQROptions.HideRelatedAndNavigation = chkHideNavigation.is(':checked');
	ESQROptions.Save();
	HideQuickReplyOptions();
	HideIgnoredUsersPosts();
}
function AddQuote() {
	var UserName = $(this).parents(':eq(7)').find('p.tiny span:first').text();
	var AjaxUrl = $(this).attr('href').split('?')[0].replace('poruka/odgovorsacitatom', 'ajax/izmena-poruke');
	var PostID = $(this).attr('href').split('?')[0].split('/')[3];

	GM_xmlhttpRequest({
		method: "GET",
		url: AjaxUrl,
		onload: function (response) {
			var RawPost = $(response.responseText).find('textarea').val();
			var MessageBox = ReplyForm.find('#message');
			MessageBox.val(MessageBox.val() + '[quote][url=/p' + PostID + ']' + UserName + ': [/url]\n' + RawPost + '[/quote]');
		}
	});
	ReplyForm.show();
	location.href = location.href.replace(window.location.hash, '') + '#QuickReply';
	return false;
}
function IgnoreUser() {
	var UserToIgnore = $(this).parent().find('span:first').text();
	if ($.inArray(UserToIgnore, ESQROptions.IgnoredUsers) == -1) {
		ESQROptions.IgnoredUsers.push(UserToIgnore);
		ESQROptions.Save();
		alert('Korisnik/ca ' + UserToIgnore + ' dodat(a) na ignore listu');
	}
	HideIgnoredUsersPosts();
}
function UnignoreUser()
{
	var UserToUnignore = $(this).prev().text();
	var UserIndex = $.inArray(UserToUnignore, ESQROptions.IgnoredUsers);
	if (UserIndex > -1)
	{
		ESQROptions.IgnoredUsers.splice(UserIndex, 1);
	}
	FillIgnoreList();
}
function FillIgnoreList() {
	divIgnoreList.empty();
	$.each(ESQROptions.IgnoredUsers, function (index, value) {
		divIgnoreList.append($('<span>' + value + '</span>'));
		var DelImg = $('<img alt="Ukloni iz liste" />');
		DelImg[0].src = 'data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%0C%00%00%00%0C%08%06%00%00%00Vu%5C%E7%00%00%00%04gAMA%00%00%AF%C87%05%8A%E9%00%00%00%09pHYs%00%00%0E%C3%00%00%0E%C3%01%C7o%A8d%00%00%00%1AtEXtSoftware%00Paint.NET%20v3.5.11G%F3B7%00%00%01%99IDAT%28Sc%F8%CF%C0%90%F0MK%7D%DBC%23%FD%04CFFF%06%2C%E0%033%B3%DBKu%F5%A6%0322%81%0C%FF%18%18%5C%FFF%05%FF%FF%9C%11%F5%F7%91%BD%FE%DA%5E%3E6A%A8%3A%866v6%96W""K%CEy%B8%5D%BE%A8%A4%B4p%13%03%83%1C%C3%FF%FF%FFA%9A%D4%3E%049%FD%FAl%29%FB%FF%A6%0C%E7%85I%1C%CC2k%D9YTNJ%8A%1D%3A%21%27w.%8B%8FO%05%A8%86%0Fl%0AH%03%D0Y%CC3%C5y%F5%2FHq%1D%BC%29%C8%FA%FF%24%07%D3%DD%93%2CL%1F%96%B2%B3-%28d%60%10%02%2B%C4%06"%98%998%F6%B10%1D%3B%CD%C4%F0%7F%1F%13%E3%AB%10f%26q%A8%14%26%A8fea%DD%CF%C4%B8%F8%14%23%C3%FF%15L%8C%EB%CEr1%BF%DF%2F%C8%BAX%96%91%91%09%AA%04%01%DAY%98X%F632%AE8%034y-%0B%E36qFF%8E%B9%7C%AC%A6%8FU%B9_%AF%97%E6%0C%85%2AC%80%5DL%8C%F5%E7X%18%FF%1F%E6d~%1A%C4%CC%24%07%15f8%26%C8%1AvM%91%FB%E6%1D%06%06c%90%3F%C1%82%0BE%85e%2F%08%F1%7C%BB.%C0%FA%BF%83%8B%25%02%2C%08%05%20EO%D9Y%D7%3E%60gZ%0Bd%F3%80%05%0Fy%BB%85%BD%08v%FB%7FWS%E4%27%90%CB%0B%16D%02%27%19%18%84w%F1%B2-%052%216%AC%F0t%D1%FA%D0%D7%F0%FDb%80%DDi%20%97%05%2C%88%06v%B30%98%F620pB%B9%0C%0C%F5%FAZ%1A%81b"%B8%83%10%0E%18%18%00%D02x3f%D8%F9%DF%00%00%00%00IEND%AEB%60%82"';
		DelImg[0].addEventListener('click', UnignoreUser, true);
		divIgnoreList.append(DelImg);
		divIgnoreList.append($('<br />'));
	});
}
function HideIgnoredUsersPosts()
{
	$('td[id="posterinfo"]').each(function ()
	{
		var UserToIgnore = $(this).find('span:first').text();
		if ($.inArray(UserToIgnore, ESQROptions.IgnoredUsers) > -1)	{
			$($(this).parents()[5]).hide();
		}
		else {
			$($(this).parents()[5]).show();
		}
	});
}
function ToggleHeader()
{
	var header = $('#header');
	if(ESQROptions.HeaderCollapsed)
	{
		HeaderButtons.Homepage.show();
		HeaderButtons.About.show();
		HeaderButtons.Users.show();
		HeaderButtons.Email.show();
		HeaderButtons.Statistics.show();
		HeaderButtons.ES.hide();
		HeaderButtons.EM.hide();
		InMenuSearch.hide();
		$([HeaderButtons.Profile[0],
			HeaderButtons.EditProfile[0],
			HeaderButtons.PrivateMessages[0]]).children('a').removeClass('menu').addClass('menut');
		$([HeaderButtons.Profile[0],
			HeaderButtons.EditProfile[0]]).insertBefore(HeaderButtons.MailingLists).after('\n');
		HeaderButtons.PrivateMessages.insertAfter(HeaderButtons.Flashback).before('\n');
		if (HeaderButtons.Mods.length > 0) {
			HeaderButtons.Mods.removeClass('menu').addClass('menut').insertAfter(HeaderButtons.PrivateMessages).before('\n');
		}
		HeaderButtons.Profile.children(':first').text('Moj Profil');
		HeaderBox.appendTo(UserMenuList.next().next());
		HeaderBox.css({ 'position': '', 'left': '', 'margin-left': '' });
		header.css({ 'height': '', 'overflow': '' });
		ToggleHeaderButton.text('-');
	}
	else
	{
		HeaderButtons.Homepage.hide();
		HeaderButtons.About.hide();
		HeaderButtons.Users.hide();
		HeaderButtons.Email.hide();
		HeaderButtons.Statistics.hide();
		HeaderButtons.ES.show();
		HeaderButtons.EM.show();
		InMenuSearch.show();
		HeaderButtons.EditProfile.children('a').addClass('menu').removeClass('menut');
		HeaderButtons.EditProfile.insertBefore(HeaderButtons.Homepage).after('\n');
		$([HeaderButtons.Profile[0],
			HeaderButtons.EditProfile[0],
			HeaderButtons.PrivateMessages[0]]).children('a').addClass('menu').removeClass('menut');
		$([HeaderButtons.Profile[0],
			HeaderButtons.EditProfile[0]]).insertBefore(HeaderButtons.FAQ).after('\n');
		HeaderButtons.PrivateMessages.insertAfter(HeaderButtons.Chat).before('\n');
		if (HeaderButtons.Mods.length > 0) {
			HeaderButtons.Mods.removeClass('menut').addClass('menu').insertAfter(HeaderButtons.PrivateMessages).before('\n');
		}
		HeaderButtons.Profile.children(':first').text('Profil');
		header.css({ 'height': '50px', 'overflow': 'hidden' });
		HeaderBox.insertAfter(HeaderButtons.PrivateMessages);
		HeaderBox.css({ 'position': 'absolute', 'left' : '50%', 'margin-left' : '-200px' });
		ToggleHeaderButton.text('+');
	}
	ESQROptions.HeaderCollapsed = !ESQROptions.HeaderCollapsed;
	ESQROptions.Save();
}
function LoadMarkedTopics() {
	if (Math.random() < 0.01) {
		$.get('/ajax/mt-lista/25', function (data) {
			$(data).find('a:first-child').each(function () {
				MarkedTopics.push($(this).attr('href'));
			});
		});
	}
}


ESQROptions.Load();
//LoadMarkedTopics();

InMenuSearch.find('input[name=BoardID]').val(BoardID);
//alert(JSON.stringify(ESQROptions));
OptionsBox.find('#esqr_cancel')[0].addEventListener('click', HideQuickReplyOptions, true);
OptionsBox.find('#esqr_save')[0].addEventListener('click', SaveOptions, true);
$('body').append(OptionsBox);

if (ESQROptions.InitialyHideQR) {
	ReplyForm.hide();
}

ReplyForm.find('input[name="subject"]').attr('value', 'Re: ' + TopicTitle);
ReplyForm.find('input[name="TopicID"]').attr('value', TopicID);
ReplyForm.find('input[name="BoardID"]').attr('value', BoardID);
if (IsMod) {
	ReplyForm.insertAfter($('.output_pmt2').parents('table'));
}
else {
	ReplyForm.insertAfter($('.post:last').next().next());
}

var SettingsImage = $('<img alt="Opcije" style="float:right"></img>');
var SettingsLink = $('<a href="javascript:void(0)"></a>');
SettingsLink[0].addEventListener('click', ShowQuickReplyOptions, true);
SettingsImage[0].src = 'data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%12%00%00%00%12%08%02%00%00%00%D9%AC%19%00%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%00%09pHYs%00%00%0E%C3%00%00%0E%C3%01%C7o%A8d%00%00%00%1AtEXtSoftware%00Paint.NET%20v3.5.11G%F3B7%00%00%03TIDAT8O5S%FBOZY%10%E6%DFlb%9A%14%9B%D2l%D6%AA%DD%96%95h%E2%2BZ%5Cm%B0%98-%5D%5DY-%12%8B%C0%B5%96u%176%B1%3CD%40VyH%80%CBUy%C3%05.%AF%CB%7Dp%9Ft%87%E2%CE%0F%E7%CC%99s%BE%9993%DF%28%BE%FD%2F%B2%2CK%92%24%8A"%C7q%91H%C4%EB%F5%9E%9F%9F%27%12%09%9E%E7%E1%0Ad%F0%5DF%FA%106%3A%B3%2CK%10%04%3Cj%B7%DBv%BB%3D%1C%0E%07%83APp%1Cg%18%A6R%A9%F4z%3DA%10%C05%AC%8A%91%0309%9DN%8B%C5%82%A2%28%E8%C7%C7%C7%B9%5C.%93%C9%80%05%BC%04%02%01%93%C9d%B5ZK%A5%D2%28%B8b%84%3E%F7%F9%02%5E%7F4%9A%B4%DB%1D%FF%B8%9C%8E%D3%CF%AD%0E%81%D7%9A%9F%EC%88%D5f6%EF%7D%CAf%B3%5E%DF%D9%FE%FE~%B7%DB%05%C8%10%D6j%B5%10%C4%1E%BE%0C2%2C%97%BD%CD%E5%B14%CBv9%9E%96%05%89b%98%DB%DB0%5Eh%D4%28%DA%E1v%E8t%3AH%01%FE%AF%80%88%B0%A52%E9%3D%C4%94H%85%25%A1%03%25%E9J%DFr%9C%88%89r%7D%20s%02%253%B2%CF%1F%DE%D0%EB%DCn7M%D3C%18l%CDf%B3%C7%B0%D6%2F%A7%F7%D8%0D7%10R%FC%E0%D7%04%F1%D2s%F7%F4kV%1B%AA%DD%91%A2L%8Bh%F0%FA%FD%E6%16%14%A6X%2CR%14%A5%B8%B8%B88%3A%3A%B2Z%11%DB%A1%93%25%7B%F8%60%F06%D9%9D%F2%97%0C%C9%F6%C7%18%3DuP_%3F%C1qQlr%ED%0FF%A3V%AB%5DXX0%9B%CD%0A%9B%CD%96N%A7%F3%F9b%A7E%89%3C%8B%F1%03%CD%D7%C2a%9A%A0%25%96%E3%A9%2F7%FC%93%D5t%81%95%FA%02%D3gx%88vuu%B5%BC%BC%AC%40%10%04%DAzyu%5D%A8%D7D%B9s%CF%0FfN%1B%27h%8F%11%EB%ACH"%01%5E%B9%94%CB%D32Kw%93%B1%D8%EE%EE%AE%5E%AF_%5C%5CTx%3C%9E%ED%EDm%83a%E7%60%CF%26t%F0%96%24h%3D%F8%D3%DF%92%F6K%F2%B3%BF%AB%9CI%AC%1A1B%90%3A%8D%E6%D2%EC%3C%24%B9%B6%B6%06%09%2A%80%1C%C0%83%1AN%18%B7%0E2%BE%18K%B5n%28f%D5Q%7B%3C%9F%7B%A4%8El%9A%EE%CA-%86%EC%96%13%171%CD%F4%1Ct%0F%DEC%C7%87%7D%83%82f%0B%F7%9B%06%7D%D0%15%27%CB%BD%06Y%C4%88v%BA"f%1Bb%B9%2A%12x%ABV%CB%5DF%FE%FD%E1%C5%24%B0%07%886d%09P%04%1A%AF%7B%B7a%3C0%A0h%DD%7F%16%BF%0Ez%9A%B5T%A3%92%EAT%D0F%BE%E8w%87w%FF0%FB%E3%FE%BF%CE%FET%A9T%D1h%F4%01%D6%EF%F7-%26%F3%C7%8D-%CB%E1%E1%D4%8C%E6%D5%EB%D9%F5_t%C9x%BC%84%26%DE%AE%AF%AA%9E%FF%F8jzvI%A3%D1%AD%BF%99%98%98%80%3C%87%E4%02%2A%C3%86W%AA%BF%BF%FF%F0%B3%FA%F5%91%CD%9AF%B1%B9%B9%F9c%E4%24%1C%0A%A9T%CF%FEv%3A%EF%EF%B2%2F_L%FD4%3D%0D5%7F%A02%0C%0E%FC%0D%90%90%2A%86a%24I%02%E5%D5j%F5%CE%CE%8E%CB%E5R%2A%95%A1P%08n%AB%D5j%B9%5C%1E%0D%CE%10%F6%7D%D6%1E%04L%40H%18%9C%95%95%95%F1%F1%F1%B1%B1%B1%C9%C9I%F0%05%F6%91%00%60%B8%CA%F2%7F%E0%13%18%D6wE%03%A0%00%00%00%00IEND%AEB%60%82';
SettingsLink.append(SettingsImage);
SettingsLink.insertAfter(ReplyForm.find('input:first'));

var LastReplyButton = $('.msgoptions > a.tiny:last');
if (LastReplyButton.prev().length == 0 || LastReplyButton.prev().text() != 'Odgovor sa citatom') {
	LastPostID = LastReplyButton.parents(':eq(7)').find('tr:first td:eq(1) a').attr('href').replace('p', '');
	$('<a href="/poruka/odgovorsacitatom' + LastPostID + '?refresh=MTM4ODYyMzIwMQ==" class="tiny" style="margin-right: 5px;">Odgovor sa citatom</a>').insertBefore(LastReplyButton);
}

$('td[id="posterinfo"]').each(function() {
	var IgnoreButton = $('<a href="javascript:void(0)" class="profil_menu">Ignoriši</a>');
	IgnoreButton[0].addEventListener('click', IgnoreUser);
	IgnoreButton.insertAfter($(this).find('a.profil_menu:last'));
});

//var ToggleHeaderButton = $('<a class="menu" href="javascript:void(0)" style="float: left; width: 10px; margin-top: 4px; margin-left: 10px; line-height: 10pt;">-</a>');
//ToggleHeaderButton[0].addEventListener('click', ToggleHeader, true);
//ToggleHeaderButton.insertBefore('#menu > ul');

//$([HeaderButtons.ES[0], HeaderButtons.EM[0]]).insertBefore(HeaderButtons.Homepage);
//HeaderButtons.ES.after('\n');
//InMenuSearch.appendTo(MenuList);
//ESQROptions.HeaderCollapsed = !ESQROptions.HeaderCollapsed;
//ToggleHeader();

if (ESQROptions.AlwaysQuick) {
	$('.msgoptions > a.tiny').each(function () {
		if ($(this).text() == 'Odgovor na temu') {
			this.addEventListener('click', function () { ReplyForm.show(); }, true);
			$(this).attr('href', window.location.href.replace(window.location.hash, '') + '#QuickReply');
		}
	});
}

if (ESQROptions.QuickQuote) {
	$('.msgoptions > a.tiny').each(function () {
		if ($(this).text() == 'Odgovor sa citatom') {
			//$(this).attr('href', 'javascript:void(0)');
			this.onclick = function () { return false; };
			this.addEventListener('click', AddQuote, true);
		}
	});
}

if (ESQROptions.IgnoreUsers)
{
	HideIgnoredUsersPosts();
}

if (ESQROptions.HideRelatedAndNavigation)
{
	$('body > p:first').remove();
	$('body > p:first').remove();
	$('#header').css('margin-bottom', '0px');
}

if (CurrentForumStyle == 'Original') {
	$('td[id=posterinfo] a.profil_menu').css('display', 'block');
}

if (IsHTTPS) {
	$('iframe.youtube-player').each(function() {
			$(this).attr('src', $(this).attr('src').replace('http:', 'https:'));
		}
	);
	$('div.fajlovi a').each(function() {
			var att_url = $(this).attr('href').replace('https:', 'http:').replace('www.', 'static.').replace('/images/', '/uploads/').replace('static/uploads/', '');
			$(this).attr('href', att_url);
		}
	);
}

//if (ESQROptions.MarkMarkedTopics) {
//	$('#teme a.msg2').each(function () {
//		for (i = 0; i < MarkedTopics.length; i++) {
//			if ($(this).attr('href').indexOf(MarkedTopics[i]) == 0) {
//				$(this).css('background-color', 'crimson');
//				break;
//			}
//		}
//	});
//}