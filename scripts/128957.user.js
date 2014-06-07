// ==UserScript==
// @name           EE on Kong
// @namespace      tag://kongregate
// @description    Changes the EE console to EE.COM address
// @include        *kongregate.com/games/QRious/everybody-edits*
// @author          Hummerz5
// @date            7.6.2013
// @version         0.5.0
// ==/UserScript==

var dom = (typeof unsafeWindow === "undefined"?window:unsafeWindow);

var initInterval=self.setInterval(function(){
var holodeck = dom.holodeck;
var viewing_ee_com_console = false;


if (holodeck && dom.holodeck.activeDialogue() && dom.active_user)
{
window.clearInterval(initInterval);

	holodeck.addChatCommand("toggle", function(l, n){
	if (viewing_ee_com_console){
		document.getElementById("game").innerHTML = '<object width="100%" align="middle" height="100%" type="application/x-shockwave-flash" id="WebClient" name="WebClient" data="http://r.playerio.com/r/everybody-edits-su9rn58o40itdbnw69plyw/freegame.swf"><param name="quality" value="high"><param name="bgcolor" value="#000000"><param name="allowscriptaccess" value="sameDomain"><param name="allowfullscreen" value="true"><param name="allowFullScreenInteractive" value="true"><param name="flashvars" value="kongregate_username=hummerz5&amp;kongregate_user_id=' + dom.active_user.id() + '&amp;kongregate_game_auth_token=' + dom.active_user.gameAuthToken() + '&amp;kongregate_game_id=73673&amp;kongregate_host=http%3A%2F%2Fwww.kongregate.com&amp;kongregate_game_url=http%3A%2F%2Fwww.kongregate.com%2Fgames%2FQRious%2Feverybody-edits&amp;kongregate_api_host=http%3A%2F%2Fapi.kongregate.com&amp;kongregate_channel_id=1373159917462&amp;kongregate_api_path=http%3A%2F%2Fchat.kongregate.com%2Fflash%2FAPI_AS3_890a14a2be3228ef6a7e031c688c75f3.swf&amp;kongregate_ansible_path=chat.kongregate.com%2Fflash%2Fansible_96e5a59f26d623cd470340ff9ca0aa97.swf&amp;kongregate_preview=false&amp;kongregate_split_treatments=none&amp;kongregate=true"></object>';

}
else {
		document.getElementById("game").innerHTML = '<iframe width="100%" height="100%" src="http://r.playerio.com/r/everybody-edits-su9rn58o40itdbnw69plyw/freegame.swf"></iframe>';
}
		viewing_ee_com_console = !viewing_ee_com_console;
		l.activeDialogue().kongBotMessage("Toggling Everybody Edits console version!");		
		return false;
	});

	holodeck.addChatCommand("reload", function(l, n){
	document.getElementById("game").innerHTML = document.getElementById("game").innerHTML;
	l.activeDialogue().kongBotMessage("Reloading Everybody Edits console!");	
	return false;
	});
	
}

},500);