// ==UserScript==
// @name           Sakhmet Solitaire Helper
// @namespace      sLAUGHTER
// @version        1.0
// @description    1337 hax for Sakhmet Solitaire
// @include        http://www.neopets.com/games/sakhmet_solitaire/*
// @require        http://images.neopets.com/js/jquery-1.7.1.min.js
// ==/UserScript==

var wait = rand(500, 1100); // random time between 0.5 sec and 1.1 sec

function rand(low, high) { return low + Math.floor(Math.random() * high); }

function timeout() {
    
    if (window.location.pathname == "/games/sakhmet_solitaire/index.phtml") {
        $("[name='game_level'][value=1]").attr("checked", "checked");
        $("[value='Play Sakhmet Solitaire!']").click();
        return;
    }
    
    jQuery.fn.exists = function() { return this.length > 0; };
    if (window.location.pathname == "/games/sakhmet_solitaire/sakhmet_solitaire.phtml") {
        if($("[value='Play Sakhmet Solitaire Again!']").exists()) {
            $("[value='Play Sakhmet Solitaire Again!']").click();
            return;
        }
    }
    
    function Card(card) {
        var colors = {
            "spades": "black",
            "clubs": "black",
            "hearts": "red",
            "diamonds": "red"
        };
        
        if (card == undefined) {
            return;
        }
        
        card = card.replace("http://images.neopets.com/games/mcards/", "");
        card = card.replace(".gif", "");
        this.num = parseInt(card.substr(0, card.indexOf("_"))) | 0;
        this.suit = card.substr(card.indexOf("_") + 1);
        this.suitcolor = colors[card.substr(card.indexOf("_") + 1)];
    }
    
    function can_go_on(stack, column) {
        if (column.num == 14) { // can't put things on aces
            return;
        }
        if (stack.num == column.num - 1 && stack.suitcolor != column.suitcolor) {
            return true;
        }
        return false;
    }
    
    function fill_spots(card, dom_object, is_stack) {
        if (card.num == 14) {
            click_card(dom_object);
            click_card($($("img[src*='new_open']")[0]));
        }
        console.log(card, dom_object);
        if (card.num == 13 && $("img[src*='new_blank_card']").length > 0 && $("img[src*='new_blank_card']").parent().prop("tagName") == "A") {
            
            if(dom_object.closest("div").find("img:first").attr("src").indexOf("pyramid") != -1 && is_stack == false) { // only if it's not the stack card
                // make sure it's not the empty stack pile, and make sure it's not covering any cards
                click_card(dom_object);
                click_card($($("img[src*='new_blank_card']")[0]));
            }
        }
    }
    
    function ace_math(num) { // if number = 1 then number = 14
        if (num == 1) {
            return 14;
        }
        return num;
    }
    
    function ace_pile(card, dom_object) {
        // find ace for each card
        var find_ace = $("a[onclick*='base_']").find("img[src*='/" + ace_math(card.num - 1) + "_" + card.suit + "']");
        if (find_ace.length != 0) {
            click_card(dom_object);
            click_card(find_ace);
        }
    }
    
    function find_new_columns() {
        var top_stacks = $("td").find("img.deckcards[name]:first");
        
        var suits = {
            "red": ["clubs", "spades"],
            "black": ["hearts", "diamonds"]
        };
        
        
        $.each(top_stacks, function(key, value) {
            var current_top = new Card($(value).attr("src"));
            var suit = suits[current_top.suitcolor];
            
            if (current_top.num == 13) {
                if($("img[src*='new_blank_card']").length > 0 && $("img[src*='new_blank_card']").parent().prop("tagName") == "A" && $(value).closest("div").find("img:first").attr("src").indexOf("pyramid") != -1){
                    click_card($(value));
                    click_card($($("img[src*='new_blank_card']")[0]));
                }
            }
            
            // if (current_top.num != 13) {
            $.each(suit, function(k,v) {
                var find_card = $("td").find("img.deckcards[name]:last");//.find("[src*='/" + (current_top.num + 1) + "_" + v + "']");
                $.each(find_card, function(kee, val) {
                    if($(val).attr("src").indexOf("/" + (current_top.num + 1) + "_" + v) != -1) {
                        if($(val).parent().attr("onclick").indexOf("stack_0") == -1) {
                            if ($(val).attr("name").substr(0,6) != $(value).attr("name").substr(0,6)) { // different column
                                click_card($(value));
                                click_card($(val));
                                return;
                            }
                        }
                    }
                });
            });
            // }
        });
    }
    
    var clicked = 0;
    
    function click_card(card) {
        clicked++;
        card.click();
    }
    
    var stack_card = $("a[onclick*='stack_0']").find("img");
    
    var current_card = new Card(stack_card.attr("id"));
    
    var stacks = $("td").find("img.deckcards[name]:last");
    
    $.each(stacks, function(key, value) {
        current = new Card($(value).attr("src"));
        if (can_go_on(current_card, current)) {
            click_card(stack_card);
            click_card($(value));
            return;
        }
        fill_spots(current, $(value), false);
        ace_pile(current, $(value));
    });
    
    // checks and balances
    fill_spots(current_card, stack_card, true);
    ace_pile(current_card, stack_card);
    find_new_columns();
    
    if (clicked == 0) { // nothing was clicked. DRAW!
        if($($("a[href*='action=draw']").children()[0]).exists()) {
            $($("a[href*='action=draw']").children()[0]).click();
        }
        
        if($("img[src*='new_empty']").exists() || $("body").html().indexOf("to collect your points!") != -1) {
            $("form[name='sakhmet_collect']").removeAttr("onsubmit").submit();
        }
    }
}

window.setTimeout(timeout, wait);