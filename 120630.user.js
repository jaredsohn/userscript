// ==UserScript==
// @name           GLB Training Notes to Training Page
// @namespace      avidday
// @version        0.9
// @include        http://goallineblitz.com/game/training.pl?player_id=*
// ==/UserScript==


 
  var commonHeaders = {
	"User-agent": "Mozilla/5.0 (compatible) Greasemonkey",
	"Accept": "text/html,application/xml,text/xml"
};
 
 // Get Player ID, borrowed from monsterkill
function parsePlayerId() {
    var pid = window.location.search;
    pid = pid.slice(pid.indexOf('player_id=')+'player_id='.length);
    if (pid.indexOf('&') > -1) {
        pid = pid.slice(0,pid.indexOf('&'));
    } else {
        pid = pid.slice(0);
    }
	return pid;
}
var playerId = parsePlayerId();
GM_xmlhttpRequest({
        method: 'GET',
        url: "/game/player.pl?player_id="+playerId,
        headers: commonHeaders,
        onload: function(responseDetails) {
			var txt = responseDetails.responseText;

		
			var playerNoteResult = /(id="note_content">)(.*?)(<\/textarea>)/gi;
			var pnResult = playerNoteResult.exec(txt);
			

			
			
			var playerNoteDiv = document.createElement('span');
				playerNoteDiv.id = "playerNoteDiv";
				var whereToPutIt = document.getElementById('training_settings');
				whereToPutIt.appendChild(playerNoteDiv);
				playerNoteDiv.innerHTML = "<div id=\"player_my_note\"><table cellspacing=\"0\" cellpadding=\"0\" width=\"100%\"><tr class=\"nonalternating_color\"><td colspan=\"3\">Custom Player Notes </td></tr><tr><td colspan=\"3\"><div id=\"my_note\" onclick=\"editNote()\">" + pnResult[2] + "</div><div id=\"my_edit_note\" style=\"visibility: hidden; display: none;\"><textarea id=\"note_content\" cols=\"100\">" + pnResult[2] + "</textarea></div></td></tr></table></div>";
				
			
			
		}    
})


;
