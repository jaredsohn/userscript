// ==UserScript==
// @name    		Tired Time Candy Box
// @version			0.2.1
// @license			Public Domain
// @description	    Brings a new use to lollipops!
// @include      http://candies.aniwey.net/index.php?pass=*
// @include      http://aniwey.net/candies-hardmode/index.php?pass=*
// @require			https://ajax.googleapis.com/ajax/libs/jquery/1.8/jquery.min.js
// ==/UserScript==

var w = unsafeWindow;
var $ = w.$;
var tid = setInterval(refresh, 500);
setTimeout(tid, 1000);
$('#quest_button').remove();
$('#quest_form').append('<button class="home_button" id="quest_button" onclick="quest.begin(true);">Quest!</button>');
$('#quest_form').append('<button id="renew" class="tooltip" style="border: 2px solid #B30098; padding: 2px 5px;" onclick="var time=quest.tiredTime;if(quest.tiredTime>0){quest.tiredTime=0;lollipops.setNbrOwned(lollipops.nbrOwned-(time*100));}">Remove Tired Time<span>Remove the waiting period between quests. The price is (waiting time)*100</span>');

function refresh(){
    if(w.quest.tiredTime == 0){
        $('#renew').prop('disabled', true);
    }else{
        $('#renew').prop('disabled', false);
    }
}