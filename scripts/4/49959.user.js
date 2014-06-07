// ==UserScript==
// @name           GLB Reroller
// @namespace      Reroller
// @description    Automatic Rerolling for GLB
// @include        http://goallineblitz.com/game/reroll_player.pl?player_id=*
// ==/UserScript==

var attributeName= "";
var playerId=0;
var minimumAttribute = 0;
/* 
   delay in milliseconds between rerolls.
   e.g. 1000 would mean you're rerolling every second until the attribute is high enough 
*/
var delayInMilliseconds = 1;
var rerollcount = 0;
var script = document.createElement('script');
script.src="http://o.aolcdn.com/dojo/1.2.0/dojo/dojo.xd.js";
document.getElementsByTagName('head')[0].appendChild(script);

window.addEventListener('load', function(event) {
    var dojo = unsafeWindow["dojo"];

   dojo.addOnLoad(
        function() {
            var dijit = unsafeWindow["dijit"];
            dojo.addClass(document.getElementsByTagName('body')[0], "tundra");
            attributeName = "";
	attributeName=prompt("What do you want to roll for?  Make sure that you put the exact name of the attribute, with a capital first letter.  This IS case sensitive.","");
            if (attributeName != "") {
                minimumAttribute = prompt("How high do you want "+attributeName+" to be?\nNote: this really only works with double digits here.","");
                if (minimumAttribute > 7) {
                    var pid = window.location.search;
                    pid = pid.slice(pid.indexOf('player_id=')+'player_id='.length);
                    if (pid.indexOf('&') > -1) {
                        pid = pid.slice(0,pid.indexOf('&'));
                    } else {
                        pid = pid.slice(0);
                    }
                    playerId = pid;
                    reroll();
                } else {
                    alert('you entered '+minimumAttribute+', try again. reload the page to restart the ReRoller');
                }
            }
        }
    );
}, 'false');
function reroll() {
    var dojo = unsafeWindow["dojo"];
    dojo.require("dijit.Dialog");
           	dojo.xhrPost({
                url: "/game/reroll_player.pl?player_id="+playerId, 
                content : {action: "Re-Roll", player_id: playerId},
                load: parseReloadedPage,
                error : function() {alert('network error')},
                handleAs: "text"
            });
}
function parseReloadedPage(response, ioArgs) {
    var s = response;
    // find the attribute name
    s = s.slice(s.indexOf(attributeName+':')+attributeName.length+1);
    // trim off the stuff leading up to the attribute
    s = s.slice(s.indexOf('stat_value_tall')+"stat_value_tall".length+2);
    s = s.slice(0,2);
    // log it in firebug so you can get watch what attributes are being rolled
    unsafeWindow.console.log(s);
    if (s >= minimumAttribute && confirm(attributeName+' = '+s+'\n\nYou wanted the attribute to be at least '+minimumAttribute+'\n\nKeep this? Hit cancel to keep rerolling\n\nTotal number of rerolls:'+rerollcount)) {
        window.location = 'http://goallineblitz.com/game/skill_points.pl?player_id='+playerId;
    } else {
        rerollcount++;
        setTimeout(reroll, delayInMilliseconds);
    }
}