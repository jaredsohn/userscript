// ==UserScript==
// @name        Candy script
// @namespace   http://feildmaster.com
// @include     http://candies.aniwey.net/*
// @version     1.2.2
// @downloadURL https://userscripts.org/scripts/source/166763.user.js
// @updateURL   https://userscripts.org/scripts/source/166763.meta.js
// ==/UserScript==

var config = {
    quest: {
        repeat: true, // true/false : auto repeats quest
    },
    
    save: {
        auto: true, // true/false : auto saves
        interval: 5 // number in minutes
    },
};

/*                                                      *\
|*                End of Configuration                  *|
\*                                                      */

var quest_info = {
    previous_won: false,
    previous_candy: -1,
    history: []
};

function auto_quest() {
    if (sword.name == "none") { // Can't quest if we can't fight
        return;
    }
    if (!quest.weAreQuestingRightNow) { // Not questing?
        if (quest.tiredTime == 0 && quest.tiredFound == 0) { // Not tired are we?
            quest.begin(true); // Begin the current quest!
        }
    }
}

function auto_save() {
    if (code === undefined || code == null || code == "") {
        return; // Don't save unless we want to save this game!
    }
    var p_alert = window.alert;
    window.alert = function(message) {};
    save();
    $(document).ajaxComplete(function(event, xml, options) {
        if (options.url == "scripts/save.php") {
            set_notice("Auto saved at " + (new Date).toLocaleTimeString());
            window.alert = p_alert;
            $(this).unbind('ajaxComplete');
        }
    });
}

function run_save() {
    if (config.save.auto) {
        auto_save();
    }
    setTimeout(run_save, config.save.interval * 60000);
}

function run_quest() {
    if (config.quest.repeat) {
        auto_quest();
    }
    var timeout = 1;
    if (quest.tiredTime != 0) {
        timeout = quest.tiredTime;
        if (objects.list.pinkRing.have) { // pink ring halves tired time!
            timeout /= 2;
        }
        
    }
    setTimeout(run_quest, timeout * 1000);
}

function set_notice(message)  {
    $("div#notice").text(message);
}

function get_hp() {
    if (quest.weAreQuestingRightNow) {
        var index = quest.getCharacterIndex();
        return quest.things[index].hp + "/" + quest.things[index].max_hp;
    } else {
        var maxHP = quest.getCharacterMaxHp();
        return maxHP + "/" + maxHP;
    }
}

function quest_status() {
    if (quest.weAreQuestingRightNow) {
        return land.list[quest.currentLandIndex].name;
    } else if (quest.tiredTime > 0) {
        return "Waiting " + quest.tiredTime;
    } else {
        return "Nothing"
    }
}

function get_speed() {
    switch (quest.getSpeed()) { 
        case 500:
        default: return "normal";
        case 250: return "fast";
        case 125: return "fastest";
    }
}

function update_counts() {
    var c = candies.nbrOwned;
    var l = lollipops.nbrOwned;
    var b = chocolateBars.nbrOwned;
    
    var pq = quest_info.previous_candy == -1 ? "" : "<br />--Previous--<br />" +
        ( quest_info.previous_candy == -2 ? "Failed" :
            "Gained " + quest_info.previous_candy + " candy")
    
    $("div#counts").html(
        "Candy: " + addCommas(c) + " Lollipops: " + addCommas(l) + " Chocolate Bars: " + addCommas(b) + "<br />"+
        "--Quest ("+quest_status()+")--<br />"+
        "HP: " + get_hp() + "<br />"+
        "Speed: " + get_speed() +
        pq);
    setTimeout(update_counts, 500);
}

var elements = {
    notice: document.createElement("div"),
    info: document.createElement("div"),
    counts: document.createElement("div"),
    
    style: document.createElement('style'),
};

function addCommas(nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

elements.style.type = 'text/css';
elements.style.innerHTML = 'div#info {clear:both;} div#notice{float:right;max-width:500px;}';
document.getElementsByTagName('head')[0].appendChild(elements.style);

elements.info.id = "info";

elements.notice.id = "notice";

elements.counts.id = "counts";

elements.info.appendChild(elements.notice);
elements.info.appendChild(elements.counts);

$('body').children().last().prepend(elements.info);

update_counts();
setTimeout(run_save, config.save.interval * 60000);
setTimeout(run_quest, 1000);

if (!Function.prototype.bind) {
  Function.prototype.bind = function (oThis) {
    if (typeof this !== "function") {
      // closest thing possible to the ECMAScript 5 internal IsCallable function
      throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
    }
 
    var aArgs = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        fNOP = function () {},
        fBound = function () {
          return fToBind.apply(this instanceof fNOP && oThis
                                 ? this
                                 : oThis,
                               aArgs.concat(Array.prototype.slice.call(arguments)));
        };
 
    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();
 
    return fBound;
  };
}

var bound = {
    quest_won: quest.won.bind(quest),
    quest_stop: quest.stop.bind(quest),
};

function new_quest_history() {
    return {won:false, land:0, candy:0, items:[]};
}

// Override "quest.won," lets us get quest progress without having to rely on timers. :D
quest.won = function() {
    quest_info.previous_won = true;
    bound.quest_won();
};

quest.stop = function() {
    if (quest_info.previous_won) {
        quest_info.previous_won = false;
        quest_info.previous_candy = quest.candiesFound;
    } else {
        quest_info.previous_candy = -2; // Code for "failed"
    }
    bound.quest_stop();
}