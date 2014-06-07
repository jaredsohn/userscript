// ==UserScript==
// @name       Bilge Dice Auto-player
// @namespace  sLAUGHTER
// @version    1.2
// @description  1337 hax for Bilge Dice
// @match      http://www.neopets.com/pirates/bilge.phtml
// @require    http://images.neopets.com/js/jquery-1.7.1.min.js
// @copyright  2013 sLAUGHTER
// ==/UserScript==

var wait = rand(500, 1100); // random time between 0.5 sec and 1.1 sec

function rand(low, high) { return low + Math.floor(Math.random() * high); }

function timeout() {
    
    jQuery.fn.exists = function() { return this.length > 0; };
    if($("input[value*=' NP']").exists()) {
        $("input[value*=' NP']").last().click();
        return;
    }
    if($("[value='Free Play']").exists()) {
        $("[value='Free Play']").click();
        return;
    }
    if($("[value='See if you defeated those scallywags!!']").exists()) {
        $("[value='See if you defeated those scallywags!!']").click();
        return;
    }
    if($("[value='Play Again!']").exists()) {
        $("[value='Play Again!']").click();
        return;
    }
    
    var inPlay = parseInt($("input[name='dcheck']").val());
    var need1 = Boolean($("img[src$='d1.gif'][width=40]").length);
    var need4 = Boolean($("img[src$='d4.gif'][width=40]").length);
    
    var dice = new Array();
    
    function checkDice() {
        // first time for qualifiers
        $.each(dice, function(key, val) {
            if (val == 4 && need4) {
                checkIndex(key);
                need4 = false;
            }
            
            if (val == 1 && need1) {
                checkIndex(key);
                need1 = false;
            }
        });
        
        if(checked > 0) {
            keep();
        }
        
        $.each(dice, function(key, val) {
            if (val == 6 || val == 5) {
                checkIndex(key);
            }
        });
        
        console.log("choosing one of the largest number");
        if (!$("input[name='index[]']:checked").length && !$("input[value='Roll Dice']").length) {
            checkIndex(dice.indexOf(Array.max(dice)));
        }
    }
    
    var checked = 0;
    
    function checkIndex(number) {
        checked++;
        $("input[id=" + number + "]").click();
        dice[number] = 0;
    }
    
    function keep() {
        if (checked == 0) {
            $("[value='Roll Dice']").click();
        } else {
            $("[value='Keep']").click();
        }
    }
    
    function diceToNum() {
        $.each($("img[src^='http://images.neopets.com/games/bilgedice/dice_'][width=40]"), function(key, val) {
            dice.push(parseInt($(val).attr("src").substr(47,1)));
            if (dice.length >= inPlay) {
                return false;
            }
        });
    }
    
    Array.max = function( array ){
        return Math.max.apply( Math, array );
    };
    
    if(!$("img[src$='opponents.gif']").length) {
        return;
    }
    
    diceToNum();
    checkDice();
    keep();
}

window.setTimeout(timeout, wait);