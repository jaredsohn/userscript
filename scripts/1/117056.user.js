// ==UserScript==
// @name           Unicorns
// @namespace      SofiaWarsUnicorns
// @description    More Unicorns Than You Can Imagine
// @include        http://www.sofiawars.com*
// ==/UserScript==

var $ = unsafeWindow.$,
    sec = 1000,
    debug = true,
    maxRisk = 40,
    lifeThreshold = 0.9,
    player = null;

function init() {

    player =  {
        currentLife: parseInt($("#currenthp").text(), 10),
        maxLife: parseInt($("#maxhp").text(), 10),        
        risk: parseInt($(".wanted .percent").css('width'), 10),
        money: parseInt($("#personal .tugriki-block span").html().replace(',',''), 10),
        level: parseInt(/.*\[(.*)\].*/.exec($("#personal .name b").html())[1], 10)
    };

    player.bribeCost = player.level * 50;
    player.isFullLife = player.currentLife == player.maxLife;

    $('<div class="unicornMsg">Unicorns!</div>')
        .css({ 'background-color': 'red','position': 'absolute', 'top': 0, 'right': 0  })
	.append("<div>Level: " + player.level + "</div>")
        .appendTo('body');
};    
    
function log() {
    if(!debug) return;
    $.each(arguments, function() {
        unsafeWindow.console.log(this.toString());
    });      
};    

function getPage() {
    return window.location.pathname.substring(1).split("/");
};

function isResting() {
    return $('#timeout').length && getTimer();
};

function getTimer() {
    return $('#timeout').attr('timer');
};

var pageActions = {
    alley: {
        act: function alleyAction() {

	    if($(".alert-error").length) {
                return;
            };


            if(isResting()) {
                log('Resting for ' + getTimer());
                window.setTimeout(function() {
                    window.location.reload();
                }, getTimer()*sec + sec);
                return;
            };

            if((player.currentLife / player.maxLife) < lifeThreshold) {
                log("Healing...");
                window.location.assign("/home/heal/");
                return;
            };
            
            if(player.risk >= maxRisk && player.money >= player.bribeCost) {
                log("Risk is too high, bribing the police...");
                window.location.assign("/police/fine/");
            return;
            };
            
            log('Search for weaker player');
            $('#searchForm select').val('weak');
            $('#searchForm').submit();
        },

        search: {
            act: function alleySearchAction() {
                log("Attacking...");
                $(".button-fight a.f").click();
            }
        },

        fight: {
            act: function returnFromFight() {
                window.location.assign("/alley/");
            }
        }
    },
    
    home: {
        act: function returnToAlley() {
            if(player.isFullLife) {
                window.location.assign("/alley/");
            }
        }
    },
    
    police: {
        act: function returnToAlley() {
            window.location.assign("/alley/");
        }
    }       
}

function getCurrentAction(actions, commands) {
    var action = actions[commands[0]],
	nextCommand = commands[1];
    
    log(commands[0]);
    
    if(nextCommand && action && action[nextCommand])
	return getCurrentAction(action, commands.slice(1));
    
    return action;
}

function onLoad() {
    var commands = getPage(),
	action = getCurrentAction(pageActions, commands);

    if(action && action.act) {
	    action.act();
    } else {
	    log("Unknown action - " + commands);
    }
};

window.addEventListener("load", function(e) {
    init();
    onLoad();
}, false);