// ==UserScript==
// @name           Digitalplace - smileys
// @description    script to add smileys next to quick reply
// @author         Thumb
// @include        http://digitalplace.nl/forum/viewtopic.php*
// @version        1.0.2
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

//de smiley boxen in variablen stoppen
	
//smiley box voor 100% thema
var smileyBox	 = "<div id=\"smiley-box\">"
				 + "	<a href=\"javascript: void(0);\" onclick=\"insert_text(':p', true); return false;\"><img src=\"./images/smilies/default/icon_razz.gif\" width=\"15\" height=\"15\" alt=\":p\" title=\"Tong\" /></a>"
				 + "	<a href=\"javascript: void(0);\" onclick=\"insert_text(':$', true); return false;\"><img src=\"./images/smilies/default/icon_redface.gif\" width=\"15\" height=\"15\" alt=\":$\" title=\"Verlegen\" /></a> "
				 + "	<a href=\"javascript: void(0);\" onclick=\"insert_text(':roll:', true); return false;\"><img src=\"./images/smilies/default/icon_rolleyes.gif\" width=\"15\" height=\"15\" alt=\":roll:\" title=\"Ogen rollen\" /></a> "
				 + "	<a href=\"javascript: void(0);\" onclick=\"insert_text(':twisted:', true); return false;\"><img src=\"./images/smilies/default/icon_twisted.gif\" width=\"15\" height=\"15\" alt=\":twisted:\" title=\"Twisted\" /></a> "
				 + "	<a href=\"javascript: void(0);\" onclick=\"insert_text(':D', true); return false;\"><img src=\"./images/smilies/default/icon_biggrin.gif\" width=\"15\" height=\"15\" alt=\":D\" title=\"Erg blij\" /></a> "
				 + "	<a href=\"javascript: void(0);\" onclick=\"insert_text(':mryellow:', true); return false;\"><img src=\"./images/smilies/mryellow.gif\" width=\"15\" height=\"15\" alt=\":mryellow:\" title=\"Mr. Yellow\" /></a> "
				 + "	<a href=\"javascript: void(0);\" onclick=\"insert_text(':mrgreen:', true); return false;\"><img src=\"./images/smilies/default/icon_mrgreen.gif\" width=\"15\" height=\"15\" alt=\":mrgreen:\" title=\"Groenman\" /></a> "
				 + "	<a href=\"javascript: void(0);\" onclick=\"insert_text(':right:', true); return false;\"><img src=\"./images/smilies/default/icon_arrow.gif\" width=\"15\" height=\"15\" alt=\":right:\" title=\"Rechts\" /></a> "
				 + "	<a href=\"javascript: void(0);\" onclick=\"insert_text(':eur:', true); return false;\"><img src=\"./images/smilies/default/icon_idea.gif\" width=\"15\" height=\"15\" alt=\":eur:\" title=\"Lampje\" /></a> "
				 + "	<a href=\"javascript: void(0);\" onclick=\"insert_text(':!:', true); return false;\"><img src=\"./images/smilies/default/icon_exclaim.gif\" width=\"15\" height=\"15\" alt=\":!:\" title=\"Uitroepteken\" /></a> "
				 + "	<a href=\"javascript: void(0);\" onclick=\"insert_text(':?:', true); return false;\"><img src=\"./images/smilies/default/icon_question.gif\" width=\"15\" height=\"15\" alt=\":?:\" title=\"Vraagteken\" /></a> "
				 + "	<a href=\"javascript: void(0);\" onclick=\"insert_text(':S', true); return false;\"><img src=\"./images/smilies/default/icon_confused.gif\" width=\"15\" height=\"15\" alt=\":S\" title=\"Verward\" /></a> "
				 + "	<a href=\"javascript: void(0);\" onclick=\"insert_text('(h)', true); return false;\"><img src=\"./images/smilies/default/icon_cool.gif\" width=\"15\" height=\"15\" alt=\"(h)\" title=\"Cool\" /></a> "
				 + "	<a href=\"javascript: void(0);\" onclick=\"insert_text(':\'(', true); return false;\"><img src=\"./images/smilies/default/icon_cry.gif\" width=\"15\" height=\"15\" alt=\":'(\" title=\"Huilt\" /></a> "
				 + "	<a href=\"javascript: void(0);\" onclick=\"insert_text('(6)', true); return false;\"><img src=\"./images/smilies/default/icon_evil.gif\" width=\"15\" height=\"15\" alt=\"(6)\" title=\"Duivel\" /></a> "
				 + "	<a href=\"javascript: void(0);\" onclick=\"insert_text(':shock:', true); return false;\"><img src=\"./images/smilies/default/icon_eek.gif\" width=\"15\" height=\"15\" alt=\":shock:\" title=\"Geschokt\" /></a>" 
				 + "	<a href=\"javascript: void(0);\" onclick=\"insert_text(':lol:', true); return false;\"><img src=\"./images/smilies/default/icon_lol.gif\" width=\"15\" height=\"15\" alt=\":lol:\" title=\"Lol\" /></a>" 			
				 + "	<a href=\"javascript: void(0);\" onclick=\"insert_text(':x', true); return false;\"><img src=\"./images/smilies/default/icon_mad.gif\" width=\"15\" height=\"15\" alt=\":x\" title=\"Boos\" /></a>" 
				 + "	<a href=\"javascript: void(0);\" onclick=\"insert_text(':|', true); return false;\"><img src=\"./images/smilies/default/icon_neutral.gif\" width=\"15\" height=\"15\" alt=\":|\" title=\"Neutraal\" /></a>" 
				 + "	<a href=\"javascript: void(0);\" onclick=\"insert_text(':(', true); return false;\"><img src=\"./images/smilies/default/icon_sad.gif\" width=\"15\" height=\"15\" alt=\":(\" title=\"Droevig\" /></a>" 
				 + "	<a href=\"javascript: void(0);\" onclick=\"insert_text(':)', true); return false;\"><img src=\"./images/smilies/default/icon_smile.gif\" width=\"15\" height=\"15\" alt=\":)\" title=\"Blij\" /></a>" 
				 + "	<a href=\"javascript: void(0);\" onclick=\"insert_text(';)', true); return false;\"><img src=\"./images/smilies/default/icon_wink.gif\" width=\"15\" height=\"15\" alt=\";)\" title=\"Knipoog\" /></a>" 
				 + "	<a href=\"javascript: void(0);\" onclick=\"insert_text(':shifty:', true); return false;\"><img src=\"./images/smilies/shifty.gif\" width=\"15\" height=\"15\" alt=\":shifty:\" title=\"Shifty\" /></a>" 
				 + "	<a href=\"javascript: void(0);\" onclick=\"insert_text(':applaus:', true); return false;\"><img src=\"./images/smilies/applaus.gif\" width=\"19\" height=\"16\" alt=\":applaus:\" title=\"Applaus\" /></a>" 
				 + "	<a href=\"javascript: void(0);\" onclick=\"insert_text(':bier:', true); return false;\"><img src=\"./images/smilies/bier.gif\" width=\"20\" height=\"15\" alt=\":bier:\" title=\"Bier\" /></a>" 
				 + "	<a href=\"javascript: void(0);\" onclick=\"insert_text(':dancer:', true); return false;\"><img src=\"./images/smilies/dancer.gif\" width=\"27\" height=\"16\" alt=\":dancer:\" title=\"I'm a dancer!\" /></a>" 
				 + "	<a href=\"javascript: void(0);\" onclick=\"insert_text(':doh:', true); return false;\"><img src=\"./images/smilies/doh.gif\" width=\"22\" height=\"16\" alt=\":doh:\" title=\"Doh!\" /></a>" 
				 + "	<a href=\"javascript: void(0);\" onclick=\"insert_text(':pinokkio:', true); return false;\"><img src=\"./images/smilies/pinokkio.gif\" width=\"20\" height=\"15\" alt=\":pinokkio:\" title=\"Pinokkio\" /></a>" 
				 + "	<a href=\"javascript: void(0);\" onclick=\"insert_text(':eh:', true); return false;\"><img src=\"./images/smilies/eh.gif\" width=\"15\" height=\"15\" alt=\":eh:\" title=\"Ehh...\" /></a>" 
				 + "	<a href=\"javascript: void(0);\" onclick=\"insert_text(':evil2:', true); return false;\"><img src=\"./images/smilies/evil2.gif\" width=\"15\" height=\"15\" alt=\":evil2:\" title=\"Duivels\" /></a>" 
				 + "	<a href=\"javascript: void(0);\" onclick=\"insert_text(':fluit:', true); return false;\"><img src=\"./images/smilies/fluit.gif\" width=\"22\" height=\"16\" alt=\":fluit:\" title=\"Fuut fuut\" /></a>" 
				 + "	<a href=\"javascript: void(0);\" onclick=\"insert_text(':geek:', true); return false;\"><img src=\"./images/smilies/geek.gif\" width=\"25\" height=\"24\" alt=\":geek:\" title=\"Geek\" /></a>" 
				 + "	<a href=\"javascript: void(0);\" onclick=\"insert_text(':gangstah:', true); return false;\"><img src=\"./images/smilies/gangstah.gif\" width=\"17\" height=\"15\" alt=\":gangstah:\" title=\"Gangster\" /></a>" 
				 + "	<a href=\"javascript: void(0);\" onclick=\"insert_text(':hand:', true); return false;\"><img src=\"./images/smilies/hand.gif\" width=\"17\" height=\"16\" alt=\":hand:\" title=\"Talk to the hand!\" /></a>" 
				 + "	<a href=\"javascript: void(0);\" onclick=\"insert_text(':hmmm:', true); return false;\"><img src=\"./images/smilies/hmmm.gif\" width=\"17\" height=\"16\" alt=\":hmmm:\" title=\"Hmmm...\" /></a>" 
				 + "	<a href=\"javascript: void(0);\" onclick=\"insert_text(':ja:', true); return false;\"><img src=\"./images/smilies/ja.gif\" width=\"15\" height=\"15\" alt=\":ja:\" title=\"Ja\" /></a>" 
				 + "	<a href=\"javascript: void(0);\" onclick=\"insert_text(':joker:', true); return false;\"><img src=\"./images/smilies/joker.gif\" width=\"27\" height=\"23\" alt=\":joker:\" title=\"Joker\" /></a>" 			
				 + "	<a href=\"javascript: void(0);\" onclick=\"insert_text(':kerstmis:', true); return false;\"><img src=\"./images/smilies/kerstmis.gif\" width=\"20\" height=\"20\" alt=\":kerstmis:\" title=\"Kerstmis\" /></a>" 
				 + "	<a href=\"javascript: void(0);\" onclick=\"insert_text(':muur:', true); return false;\"><img src=\"./images/smilies/muur.gif\" width=\"25\" height=\"15\" alt=\":muur:\" title=\"Muur\" /></a>" 
				 + "	<a href=\"javascript: void(0);\" onclick=\"insert_text(':king:', true); return false;\"><img src=\"./images/smilies/king.gif\" width=\"22\" height=\"22\" alt=\":king:\" title=\"King\" /></a>" 
				 + "</div>";

//smiley box voor normale grote
var smileyBox2	 = "<div id=\"smiley-box\">"
				 + "	<a href=\"javascript: void(0);\" onclick=\"insert_text(':p', true); return false;\"><img src=\"./images/smilies/default/icon_razz.gif\" width=\"15\" height=\"15\" alt=\":p\" title=\"Tong\" /></a>"
				 + "	<a href=\"javascript: void(0);\" onclick=\"insert_text(':$', true); return false;\"><img src=\"./images/smilies/default/icon_redface.gif\" width=\"15\" height=\"15\" alt=\":$\" title=\"Verlegen\" /></a> "
				 + "	<a href=\"javascript: void(0);\" onclick=\"insert_text(':roll:', true); return false;\"><img src=\"./images/smilies/default/icon_rolleyes.gif\" width=\"15\" height=\"15\" alt=\":roll:\" title=\"Ogen rollen\" /></a> "
				 + "	<a href=\"javascript: void(0);\" onclick=\"insert_text(':twisted:', true); return false;\"><img src=\"./images/smilies/default/icon_twisted.gif\" width=\"15\" height=\"15\" alt=\":twisted:\" title=\"Twisted\" /></a> "
				 + "	<a href=\"javascript: void(0);\" onclick=\"insert_text(':D', true); return false;\"><img src=\"./images/smilies/default/icon_biggrin.gif\" width=\"15\" height=\"15\" alt=\":D\" title=\"Erg blij\" /></a> "
				 + "	<a href=\"javascript: void(0);\" onclick=\"insert_text(':mryellow:', true); return false;\"><img src=\"./images/smilies/mryellow.gif\" width=\"15\" height=\"15\" alt=\":mryellow:\" title=\"Mr. Yellow\" /></a> "
				 + "	<a href=\"javascript: void(0);\" onclick=\"insert_text(':mrgreen:', true); return false;\"><img src=\"./images/smilies/default/icon_mrgreen.gif\" width=\"15\" height=\"15\" alt=\":mrgreen:\" title=\"Groenman\" /></a> "
				 + "	<a href=\"javascript: void(0);\" onclick=\"insert_text(':right:', true); return false;\"><img src=\"./images/smilies/default/icon_arrow.gif\" width=\"15\" height=\"15\" alt=\":right:\" title=\"Rechts\" /></a> "
				 + "	<a href=\"javascript: void(0);\" onclick=\"insert_text(':eur:', true); return false;\"><img src=\"./images/smilies/default/icon_idea.gif\" width=\"15\" height=\"15\" alt=\":eur:\" title=\"Lampje\" /></a> "
				 + "	<a href=\"javascript: void(0);\" onclick=\"insert_text(':!:', true); return false;\"><img src=\"./images/smilies/default/icon_exclaim.gif\" width=\"15\" height=\"15\" alt=\":!:\" title=\"Uitroepteken\" /></a> "
				 + "	<a href=\"javascript: void(0);\" onclick=\"insert_text(':?:', true); return false;\"><img src=\"./images/smilies/default/icon_question.gif\" width=\"15\" height=\"15\" alt=\":?:\" title=\"Vraagteken\" /></a> "
				 + "	<a href=\"javascript: void(0);\" onclick=\"insert_text(':S', true); return false;\"><img src=\"./images/smilies/default/icon_confused.gif\" width=\"15\" height=\"15\" alt=\":S\" title=\"Verward\" /></a> "
				 + "	<a href=\"javascript: void(0);\" onclick=\"insert_text('(h)', true); return false;\"><img src=\"./images/smilies/default/icon_cool.gif\" width=\"15\" height=\"15\" alt=\"(h)\" title=\"Cool\" /></a> "
				 + "	<a href=\"javascript: void(0);\" onclick=\"insert_text(':\'(', true); return false;\"><img src=\"./images/smilies/default/icon_cry.gif\" width=\"15\" height=\"15\" alt=\":'(\" title=\"Huilt\" /></a> "
				 + "	<a href=\"javascript: void(0);\" onclick=\"insert_text('(6)', true); return false;\"><img src=\"./images/smilies/default/icon_evil.gif\" width=\"15\" height=\"15\" alt=\"(6)\" title=\"Duivel\" /></a> "
				 + "	<a href=\"javascript: void(0);\" onclick=\"insert_text(':shock:', true); return false;\"><img src=\"./images/smilies/default/icon_eek.gif\" width=\"15\" height=\"15\" alt=\":shock:\" title=\"Geschokt\" /></a>" 
				 + "	<a href=\"javascript: void(0);\" onclick=\"insert_text(':lol:', true); return false;\"><img src=\"./images/smilies/default/icon_lol.gif\" width=\"15\" height=\"15\" alt=\":lol:\" title=\"Lol\" /></a>" 			
				 + "	<a href=\"javascript: void(0);\" onclick=\"insert_text(':x', true); return false;\"><img src=\"./images/smilies/default/icon_mad.gif\" width=\"15\" height=\"15\" alt=\":x\" title=\"Boos\" /></a>" 
				 + "	<a href=\"javascript: void(0);\" onclick=\"insert_text(':|', true); return false;\"><img src=\"./images/smilies/default/icon_neutral.gif\" width=\"15\" height=\"15\" alt=\":|\" title=\"Neutraal\" /></a>" 
				 + "	<a href=\"javascript: void(0);\" onclick=\"insert_text(':(', true); return false;\"><img src=\"./images/smilies/default/icon_sad.gif\" width=\"15\" height=\"15\" alt=\":(\" title=\"Droevig\" /></a>" 
				 + "	<a href=\"javascript: void(0);\" onclick=\"insert_text(':)', true); return false;\"><img src=\"./images/smilies/default/icon_smile.gif\" width=\"15\" height=\"15\" alt=\":)\" title=\"Blij\" /></a>" 
				 + "	<a href=\"javascript: void(0);\" onclick=\"insert_text(';)', true); return false;\"><img src=\"./images/smilies/default/icon_wink.gif\" width=\"15\" height=\"15\" alt=\";)\" title=\"Knipoog\" /></a>" 
				 + "	<a href=\"javascript: void(0);\" onclick=\"insert_text(':shifty:', true); return false;\"><img src=\"./images/smilies/shifty.gif\" width=\"15\" height=\"15\" alt=\":shifty:\" title=\"Shifty\" /></a>" 
				 + "	<a href=\"javascript: void(0);\" onclick=\"insert_text(':applaus:', true); return false;\"><img src=\"./images/smilies/applaus.gif\" width=\"19\" height=\"16\" alt=\":applaus:\" title=\"Applaus\" /></a>" 
				 + "	<a href=\"javascript: void(0);\" onclick=\"insert_text(':bier:', true); return false;\"><img src=\"./images/smilies/bier.gif\" width=\"20\" height=\"15\" alt=\":bier:\" title=\"Bier\" /></a>" 
				 + "	<a href=\"javascript: void(0);\" onclick=\"insert_text(':dancer:', true); return false;\"><img src=\"./images/smilies/dancer.gif\" width=\"27\" height=\"16\" alt=\":dancer:\" title=\"I'm a dancer!\" /></a>" 
				 + "	<a href=\"javascript: void(0);\" onclick=\"insert_text(':doh:', true); return false;\"><img src=\"./images/smilies/doh.gif\" width=\"22\" height=\"16\" alt=\":doh:\" title=\"Doh!\" /></a>" 
				 + "	<a href=\"javascript: void(0);\" onclick=\"insert_text(':pinokkio:', true); return false;\"><img src=\"./images/smilies/pinokkio.gif\" width=\"20\" height=\"15\" alt=\":pinokkio:\" title=\"Pinokkio\" /></a>" 
				 + "	<a href=\"javascript: void(0);\" onclick=\"insert_text(':eh:', true); return false;\"><img src=\"./images/smilies/eh.gif\" width=\"15\" height=\"15\" alt=\":eh:\" title=\"Ehh...\" /></a>" 
				 + "</div>";

$('form[action*="posting.php"]').attr('id', 'postform'); //form een id geven\

//de javascript om de smileys erin te zetten, inc wat configuratie
var editor  = "	<script type=\"text/javascript\"> "
			+ "			var form_name = 'postform';"
			+ "			var text_name = 'message';"
			+ "			var load_draft = false;"
			+ "			var upload = false;"
			+ "	</script>"
			+ "<script type=\"text/javascript\" src=\"./styles/dpv4.1/template/editor.js\"></script>";

	
//#qr_editor_div is de eerste div in de form, dus dan komt 'editor' precies onder form
$('#qr_editor_div').before(editor);

//als de breedte 920px is, is het de standaard layout, en dan een kleinere box.
($('#top_part_image').width() == '920') ? $('#message-box').before(smileyBox2) : $('#message-box').before(smileyBox);
