// ==UserScript==
// @name        DotD Chat Name Replacer
// @namespace   cnr_addon
// @description Replaces Kongregate usernames with DotD names in your guild's
//              chatroom and puts the current time in front of it.
// @include     http://www.kongregate.com/games/5thPlanetGames/dawn-of-the-dragons
// @version     1.0.0
// @grant       none
// @author      hoofy
// ==/UserScript==
console.log('[CNR] Script included.')
var cnr_init = false;
var tries = 1;
function cnr_initialise() {
    if(cnr_init){return;}
    console.log('[CNR] Test if jQuery is loaded');
    if (typeof jQuery != 'undefined') {
        console.log('[CNR] jQuery available');
        $j(document).ready(function(){
           console.log('[CNR] successfully initialised');
           cnr_init = true;
           $j('.chat_message_window').on("DOMNodeInserted", function() {
                $j('.chat_message_window').find('.username').each(function(index){
                    if($j(this).hasClass('.cnr_replaced')){return;}
                    var dotd_name = $j('.user_row').has('span[username="'+$j(this).text()+'"]').find('.guild-name').text();
                    if(dotd_name.length > 3) {
                        dotd_name = dotd_name.substr(1,dotd_name.length-2);
                        $j(this).html(cnr_formatted_time()+' '+dotd_name);
                        $j(this).addClass('cnr_replaced');
                    }
                });
            });
        });
        return;
    } else {
        if(tries > 10) {
            console.log('[CNR] could not find jQuery after 30 tries.')
            return;
        }
        tries = tries + 1;
        setTimeout(function(){cnr_initialise();}, 1000);
    }
}
function cnr_formatted_time(){
    var cur_time = new Date();
    var strHour = cnr_pad(cur_time.getHours(),2);
    var strMin = cnr_pad(cur_time.getMinutes(),2);
    return '('+strHour+':'+strMin+')';
}
function cnr_pad(a,b){return(1e15+a+"").slice(-b);}
setTimeout(cnr_initialise, 10000);