// ==UserScript==
// @name          Forum Linux Mint Polska SB Mod by Tracerneo
// @namespace     http://linuxmint.pl/
// @include       http://forum.linuxmint.pl/*
// @exclude       http://forum.linuxmint.pl/*/*
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js
// ==/UserScript==

// Autor: Tracerneo
// Licencja: CC-BY
// Licencja (Link): http://creativecommons.org/licenses/by/3.0/pl/
// Licencja (Tekst prawny - pełna licencja): http://creativecommons.org/licenses/by/3.0/pl/legalcode

/*CSS*/
var css = "<style type=\"text/css\">\
/* <![CDATA[ */\
#ajaxChatContent #ajaxChatChatList { height: 500px!important; margin-right: 300px; } \
#SBMod { position: relative; float: right; overflow: hidden; width: 300px; height: 500px; padding: 0 3px 0; text-align: right; }\
span.user,span.moderator,span.admin,span.guest,span.chatBot { display: inline-block!important; width: 100px!important; text-align: right!important; } \
#ajaxChat_m* { color: red!important; } \
.rowOdd,.rowEven { !important; } \
.aliasbox { width: 200px; }\
.aliasboxshow { align: right; width: 250px; }\
.aliasinfo { text-align: right; }\
#SBModsettings { overflow: auto; position: absolute; height: 400px; }\
#SBModsettings table input { width: 100px }\
/* ]]> */\
</style>";

/*HTML*/
var trescHTML = "<div id=\"SBMod\">\
<div style=\"text-align: center\"><b>\
<button onclick=\"javascript:void(tabs('zakladka2', 'zakladka1', 'zakladka3', 'zakladka4'))\">Pokoje</button>\
<button onclick=\"javascript:void(tabs('zakladka3', 'zakladka1', 'zakladka2', 'zakladka4'))\">Opcje</button>\
</b></div>\
<div id=\"zakladka2\">\
	<b>Pokoje:<br />\
	<a href=\"javascript:ajaxChat.sendMessageWrapper('/join Public');\" >Publiczny</a><br />\
	<a href=\"javascript:ajaxChat.sendMessageWrapper('/join Ogoszenia_i_nowoci');\" >Ogłoszenia i nowości</a><br />\
	<a href=\"javascript:ajaxChat.sendMessageWrapper('/join Linuxmint.pl');\" >Linuxmint.pl</a><br />\
	<a href=\"javascript:ajaxChat.sendMessageWrapper('/join Howtos_i_FAQ');\" >Howtos i FAQ</a><br />\
	<a href=\"javascript:ajaxChat.sendMessageWrapper('/join System');\" >System</a><br />\
	<a href=\"javascript:ajaxChat.sendMessageWrapper('/join Dwik_i_Wideo');\" >Dźwięk i Wideo</a><br />\
	<a href=\"javascript:ajaxChat.sendMessageWrapper('/join Wygld_i_menadery_okien');\" >Wygląd i menadżery okien</a><br />\
	<a href=\"javascript:ajaxChat.sendMessageWrapper('/join Hardware_i_Sterowniki');\" >Hardware i Sterowniki</a><br />\
	<a href=\"javascript:ajaxChat.sendMessageWrapper('/join Gry_i_wine');\" >Gry i Wine</a><br />\
	<a href=\"javascript:ajaxChat.sendMessageWrapper('/join Inne');\" >Inne</a><br />\
	<a href=\"javascript:ajaxChat.sendMessageWrapper('/join Nie_tylko_Mint...');\" >Nie tylko Mint...</a> (\
	<a href=\"javascript:ajaxChat.sendMessageWrapper('/join openSUSE');\" >openSUSE</a>, \
	<a href=\"javascript:ajaxChat.sendMessageWrapper('/join Debian');\" >Debian</a>, \
	<a href=\"javascript:ajaxChat.sendMessageWrapper('/join Arch_Linux');\" >Arch Linux</a>, \
	<a href=\"javascript:ajaxChat.sendMessageWrapper('/join PLD_Linux');\" >PLD Linux</a>, \
	<a href=\"javascript:ajaxChat.sendMessageWrapper('/join Gentoo/Funtoo');\" >Gentoo/Funtoo</a>)<br />\
	<a href=\"javascript:ajaxChat.sendMessageWrapper('/join Polska_Edycja_Linux_Mint');\" >Polska Edycja Linux Mint</a> (\
	<a href=\"javascript:ajaxChat.sendMessageWrapper('/join Julia');\" >Julia</a>, \
	<a href=\"javascript:ajaxChat.sendMessageWrapper('/join Isadora');\" >Isadora</a>, \
	<a href=\"javascript:ajaxChat.sendMessageWrapper('/join Starsze_wersje');\" >Starsze wersje</a>)<br />\
	<a href=\"javascript:ajaxChat.sendMessageWrapper('/join KDE');\" >KDE</a><br />\
	<a href=\"javascript:ajaxChat.sendMessageWrapper('/join Lekkie_edycje_Linux_Mint');\" >Lekkie edycje Mint</a> (\
	<a href=\"javascript:ajaxChat.sendMessageWrapper('/join Fluxbox');\" >Fluxbox</a>, \
	<a href=\"javascript:ajaxChat.sendMessageWrapper('/join Xfce');\" >Xfce</a>, \
	<a href=\"javascript:ajaxChat.sendMessageWrapper('/join LXDE');\" >LXDE</a>)<br />\
	<a href=\"javascript:ajaxChat.sendMessageWrapper('/join Inne_edycje');\" >Inne edycje</a><br />\
	<a href=\"javascript:ajaxChat.sendMessageWrapper('/join Mint_Debian');\" >Linux Mint Debian Edition</a><br />\
	<a href=\"javascript:ajaxChat.sendMessageWrapper('/join Off_topic');\" >Off topic</a><br />\
	<a href=\"javascript:ajaxChat.sendMessageWrapper('/join Hyde_Park');\" >Hyde Park</a><br />\
	<a href=\"javascript:ajaxChat.sendMessageWrapper('/join Pchli_targ');\" >Pchli targ</a><br />\
	<a href=\"javascript:ajaxChat.sendMessageWrapper('/join Wymiana_plikami');\" >Wymiana plikami</a><br />\
	<a href=\"javascript:ajaxChat.sendMessageWrapper('/join Wymiana_dowiadczeniami');\" >Wymiana doświadczeniami</a><br />\
	<a href=\"javascript:ajaxChat.sendMessageWrapper('/join Kosz/Archiwum');\" >Kosz/Archiwum</a></b>\
</div>\
<div id=\"zakladka3\" style=\"display: none;\">\
	<div id=\"opcje1\">\
 			<h3>Ustawienia</h3>\
 			<div id=\"SBModsettings\">\
				<table>\
					<tr class=\"rowOdd\">\
						<td><label for=\"bbCodeSetting\">Pozwól na BBCode:</label></td>\
						<td class=\"setting\"><input type=\"checkbox\" id=\"bbCodeSetting\" onclick=\"ajaxChat.setSetting('bbCode', this.checked);\"/></td>\
					</tr>\
					<tr class=\"rowEven\">\
						<td><label for=\"bbCodeImagesSetting\">Enable image BBCode:</label></td>\
						<td class=\"setting\"><input type=\"checkbox\" id=\"bbCodeImagesSetting\" onclick=\"ajaxChat.setSetting('bbCodeImages', this.checked);\"/></td>\
					</tr>\
					<tr class=\"rowOdd\">\
						<td><label for=\"bbCodeColorsSetting\">Enable font color BBCode:</label></td>\
						<td class=\"setting\"><input type=\"checkbox\" id=\"bbCodeColorsSetting\" onclick=\"ajaxChat.setSetting('bbCodeColors', this.checked);\"/></td>\
					</tr>\
					<tr class=\"rowEven\">\
						<td><label for=\"hyperLinksSetting\">Pozwól na linki:</label></td>\
						<td class=\"setting\"><input type=\"checkbox\" id=\"hyperLinksSetting\" onclick=\"ajaxChat.setSetting('hyperLinks', this.checked);\"/></td>\
					</tr>\
					<tr class=\"rowOdd\">\
						<td><label for=\"lineBreaksSetting\">Pozwól na używanie wielu linijek:</label></td>\
						<td class=\"setting\"><input type=\"checkbox\" id=\"lineBreaksSetting\" onclick=\"ajaxChat.setSetting('lineBreaks', this.checked);\"/></td>\
					</tr>\
					<tr class=\"rowEven\">\
						<td><label for=\"emoticonsSetting\">Pozwól na emotikonki:</label></td>\
						<td class=\"setting\"><input type=\"checkbox\" id=\"emoticonsSetting\" onclick=\"ajaxChat.setSetting('emoticons', this.checked);\"/></td>\
					</tr>\
					<tr class=\"rowOdd\">\
						<td><label for=\"autoFocusSetting\">Automatycznie ustawiaj kursor w polu tekstowym:</label></td>\
						<td class=\"setting\"><input type=\"checkbox\" id=\"autoFocusSetting\" onclick=\"ajaxChat.setSetting('autoFocus', this.checked);\"/></td>\
					</tr>\
					<tr class=\"rowEven\">\
						<td><label for=\"maxMessagesSetting\">Maksymalna liczba wiadomości w głównym oknie:</label></td>\
						<td class=\"setting\"><input type=\"text\" class=\"text\" id=\"maxMessagesSetting\" onchange=\"ajaxChat.setSetting('maxMessages', parseInt(this.value));\"/></td>\
					</tr>\
					<tr class=\"rowOdd\">\
						<td><label for=\"wordWrapSetting\">Pozwól dzielić długie wyrazy:</label></td>\
						<td class=\"setting\"><input type=\"checkbox\" id=\"wordWrapSetting\" onclick=\"ajaxChat.setSetting('wordWrap', this.checked);\"/></td>\
					</tr>\
					<tr class=\"rowEven\">\
						<td><label for=\"maxWordLengthSetting\">Maksymalna długość wyrazu, którego nie wolno dzielić:</label></td>\
						<td class=\"setting\"><input type=\"text\" class=\"text\" id=\"maxWordLengthSetting\" onchange=\"ajaxChat.setSetting('maxWordLength', parseInt(this.value));\"/></td>\
					</tr>\
					<tr class=\"rowOdd\">\
						<td><label for=\"dateFormatSetting\">Format wyświetlanej daty i czasu:</label></td>\
						<td class=\"setting\"><input type=\"text\" class=\"text\" id=\"dateFormatSetting\" onchange=\"ajaxChat.setSetting('dateFormat', this.value);\"/></td>\
					</tr>\
					<tr class=\"rowEven\">\
						<td><label for=\"persistFontColorSetting\">Nie pozwól na zmianę koloru tekstu:</label></td>\
						<td class=\"setting\"><input type=\"checkbox\" id=\"persistFontColorSetting\" onclick=\"ajaxChat.setPersistFontColor(this.checked);\"/></td>\
					</tr>\
					<tr class=\"rowOdd\">\
						<td><label for=\"audioVolumeSetting\">Głośność:</label></td>\
						<td class=\"setting\">\
							<select class=\"left\" id=\"audioVolumeSetting\" onchange=\"ajaxChat.setAudioVolume(this.options[this.selectedIndex].value);\">\
								<option value=\"1.0\">100%</option>\
								<option value=\"0.9\">90%</option>\
								<option value=\"0.8\">80%</option>\
								<option value=\"0.7\">70%</option>\
								<option value=\"0.6\">60%</option>\
								<option value=\"0.5\">50%</option>\
								<option value=\"0.4\">40%</option>\
								<option value=\"0.3\">30%</option>\
								<option value=\"0.2\">20%</option>\
								<option value=\"0.1\">10%</option>\
								<option value=\"0.0\">0%</option>\
							</select>\
						</td>\
					</tr>\
					<tr class=\"rowEven\">\
						<td><label for=\"blinkSetting\">Miganie okienka przy nadejściu nowej wiadomości:</label></td>\
						<td class=\"setting\"><input type=\"checkbox\" id=\"blinkSetting\" onclick=\"ajaxChat.setSetting('blink', this.checked);\"/></td>\
					</tr>\
					<tr class=\"rowOdd\">\
						<td><label for=\"blinkIntervalSetting\">Odstęp pomiędzy mignięciami (w milisekundach):</label></td>\
						<td class=\"setting\"><input type=\"text\" class=\"text\" id=\"blinkIntervalSetting\" onchange=\"ajaxChat.setSetting('blinkInterval', parseInt(this.value));\"/></td>\
					</tr>\
					<tr class=\"rowEven\">\
						<td><label for=\"blinkIntervalNumberSetting\">Liczba mignięć:</label></td>\
						<td class=\"setting\"><input type=\"text\" class=\"text\" id=\"blinkIntervalNumberSetting\" onchange=\"ajaxChat.setSetting('blinkIntervalNumber', parseInt(this.value));\"/></td>\
					</tr>\
				</table>\
			</div>\
	</div>\
</div></div>";

$(function() { 
/* Dodanie CSS */
$("head").append(css);
/* Umieszczenie <div> z HTML */
$("#ShoutBox .tborder:first-child #ajaxChatContent #ajaxChatChatList").before(trescHTML);

/*Zakladki*/
var tabscode = "function tabs(show_tab1, hide_tab2, hide_tab3, hide_tab4) { \
document.getElementById(show_tab1).style.display = \"block\"; \
document.getElementById(hide_tab2).style.display = \"none\"; \
document.getElementById(hide_tab3).style.display = \"none\"; \
document.getElementById(hide_tab4).style.display = \"none\"; \
}";

/* Dodaje skrypt zakładek. */
var skrypthead = document.getElementsByTagName('head')
var test = document.createElement("script");
test.type = "text/javascript";
test.appendChild(document.createTextNode(tabscode));
skrypthead[0].appendChild(test);

/* Ustawienia SB */
	function initialize() {
		ajaxChat.updateButton('audio', 'audioButton');
		ajaxChat.updateButton('autoScroll', 'autoScrollButton');
		$("#bbCodeSetting").checked = ajaxChat.getSetting('bbCode');
		$("#bbCodeImagesSetting").checked = ajaxChat.getSetting('bbCodeImages');
		$("#bbCodeColorsSetting").checked = ajaxChat.getSetting('bbCodeColors');
		$("#hyperLinksSetting").checked = ajaxChat.getSetting('hyperLinks');
		$("#lineBreaksSetting").checked = ajaxChat.getSetting('lineBreaks');
		$("#emoticonsSetting").checked = ajaxChat.getSetting('emoticons');
		$("#autoFocusSetting").checked = ajaxChat.getSetting('autoFocus');
		$("#maxMessagesSetting").value = ajaxChat.getSetting('maxMessages');
		$("#wordWrapSetting").checked = ajaxChat.getSetting('wordWrap');
		$("#maxWordLengthSetting").value = ajaxChat.getSetting('maxWordLength');
		$("#dateFormatSetting").value = ajaxChat.getSetting('dateFormat');
		$("#persistFontColorSetting").checked = ajaxChat.getSetting('persistFontColor');
		for(var i=0; i<$("#audioVolumeSetting").options.length; i++) {
			if($("#audioVolumeSetting").options[i].value == ajaxChat.getSetting('audioVolume')) {
				$("#audioVolumeSetting").options[i].selected = true;
				break;
			}
		}
		ajaxChat.fillSoundSelection('soundReceiveSetting', ajaxChat.getSetting('soundReceive'));
		ajaxChat.fillSoundSelection('soundSendSetting', ajaxChat.getSetting('soundSend'));
		ajaxChat.fillSoundSelection('soundEnterSetting', ajaxChat.getSetting('soundEnter'));
		ajaxChat.fillSoundSelection('soundLeaveSetting', ajaxChat.getSetting('soundLeave'));
		ajaxChat.fillSoundSelection('soundChatBotSetting', ajaxChat.getSetting('soundChatBot'));
		ajaxChat.fillSoundSelection('soundErrorSetting', ajaxChat.getSetting('soundError'));
		document.getElementById('blinkSetting').checked = ajaxChat.getSetting('blink');
		document.getElementById('blinkIntervalSetting').value = ajaxChat.getSetting('blinkInterval');
		document.getElementById('blinkIntervalNumberSetting').value = ajaxChat.getSetting('blinkIntervalNumber');
	}
	//ajaxChat.init(ajaxChatConfig, ajaxChatLang, true, true, true, initialize);
	initialize()
});
