// ==UserScript==
// @name           Castle Age Hydra Info
// @namespace      InfoExtrator
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @include        http://apps.facebook.com/castle_age/*
// @version        1.07
// ==/UserScript==

function proc_body() {

    // Check Url
    var arrUrl = clickUrl.split('?',2), query;
    if(!(/^http:\/\/apps.facebook.com\/castle_age\/battle_monster.php$/.test(arrUrl[0])
        && arrUrl.length == 2 && (query = parseQuery(arrUrl[1]))
        && query.user && query.mpool))
        return ;

    // Extract info
    var summoner = query.user
      , mpool    = query.mpool
      , time     = $("#app46755028429_monsterTicker").text().split(":")
      , boss_name, boss, group_name = '', attacker = '', phase
      ;

    $("<div style='position:absolute;top:120px;left:412px;border:solid 1px black'><textarea id='ca_info' style='width:180px;' rows='10'></textarea></div>").css({
        background : "white",
        padding : "5px",
        width: "190px",
        margin : "0 auto"
    }).insertAfter("#app46755028429_nvbar_div_end");

    if(/^(.+)\'s Life$/.test($.trim($("#app46755028429_action_logs").siblings("div").eq(3 + $("div.results, div.results_container").size()).text()))) {
        boss_name = RegExp.$1;
        boss = bosses[boss_name];
    } else {
        $("#ca_info").text("Sorry, we do not support this boss...");
        return ;
    }

    $("div.statsT2 table table table tr").each(
        function(idx) {
            var td = $(this).children().eq(0);

            if(td.attr("colspan") == '2') {
                group_name = $("b", td).text();
            } else if(!$("br",td).size()) {
                boss.levels[group_name].count ++;
            }
        }
    );

    for(var p in boss.levels) {
        attacker += boss.levels[p].label + boss.levels[p].count + " / " + boss.levels[p].max + "\n";
        boss.levels[p].count = 0;
    }

    phase = $("img[src*=/graphics/monster_siege_small]").size();

    if(time.length == 3) {
        var hp   = Math.ceil($("img[src*=/graphics/monster_health_background.jpg]").parent().css("width").replace(/%/,''))
          , miss = $.trim($("#app46755028429_action_logs").prev().children().eq(3).children().eq(2).children().eq(1).text().replace(/.*:\s*Need (\d+) more answered calls to launch/, "$1"))
          , info = (boss.zh_tw ? boss.zh_tw + "\n" : '') + "[links]\n" +
            "Time Left: " + time[0] + " hr " + time[1] + " min\n" +
            "HP Left: " + hp + " %" + (boss.ship ? ", Defence: " +  Math.floor($("img[src*=/graphics/seamonster_ship_health.jpg]").parent().css("width").replace(/%/,'')) + " %" : '') + "\n" +
            (boss.seige ? "Weapons Stage: " + Math.min(phase + 1, boss.seige) + " / " + boss.seige + ", lacking " + (isNaN(+miss) ? 0 : miss) + " 人\n" : "") +
            (boss.levels[''] ? "Number of attackers: " : "") + attacker
        ;

        bitly("http://apps.facebook.com/castle_age/battle_monster.php?user=" + summoner + "&mpool=" + mpool + (boss.seige ? "&action=doObjective" : ""), function(assist_url) {
            if(boss.army) {
                bitly("http://www.facebook.com/profile.php?id=" + summoner, function(friend_url) {
                    bitly("http://apps.facebook.com/castle_age//index.php?tp=cht&lka=" + summoner + "&buf=1", function(army_url) {
                        $("#ca_info").text(info.replace('[links]',
                            "Friend URL: " + friend_url + "\n" +
                            "Army URL: " + army_url   + "\n" +
                            "Assist URL: " + assist_url + "\n" ));
                    });
                });
            } else {
                $("#ca_info").text(info.replace('[links]', assist_url + "\n" ));
            }
        });
        if(boss_name == 'Cronus, The World Hydra')
        upload('m='+ encodeURIComponent(boss_name) + '&t=' + time.join(":") + '&u=' + summoner + '&hp=' + hp + '&a=' + encodeURIComponent(attacker) + '&s=' + encodeURIComponent(Math.min(phase + 1, boss.seige) + " / " + boss.seige + " need " + (isNaN(+miss) ? 0 : miss) + " more"));
    } else {
        $("#ca_info").text(
            "Time Left: Done!\n" +
            (boss.seige ? "Weapons Stage: " + phase + " / " + boss.seige + "\n" : "") +
            (boss.levels[''] ? "Number of Attackers: " : "") + attacker
        );
        if(boss_name == 'Cronus, The World Hydra')
        upload('m='+ encodeURIComponent(boss_name) + '&t=' + 0 + '&u=' + summoner + '&hp=' + 0 + '&a=' + encodeURIComponent(attacker) + '&s=' + encodeURIComponent(phase + " / " + boss.seige));
    }
}

function upload(params) {
    GM_xmlhttpRequest({
        method : 'GET',
        url    : 'http://ca.isgreat.org/?' + params
    });
}

function bitly(long_url, callback) {
    GM_xmlhttpRequest({
        method : 'GET',
        url    : 'http://api.bit.ly/shorten?version=2.0.1&longUrl=' + encodeURIComponent(long_url) + '&login=castleage&apiKey=R_438eea4a725a25d92661bce54b17bee1&format=json&history=1',
        onload : function(response) {
            var result = eval("("+response.responseText+")");
            callback(result.results ? result.results[long_url].shortUrl : long_url);
        }
    });
}

function parseQuery(query) {
    var arr = query.split("&"), obj = {};
    for(var i=0 ; i < arr.length ; i++) {
        var kv = arr[i].split('=');
        if(kv.length == 2)
            obj[kv[0]] = kv[1];
    }
    return obj;
}

function group(label, max) {
    return {
        'label'   : label,
        'max'     : max,
        'count'   : 0
    };
}

var globalContainer = document.querySelector('#app46755028429_globalContainer')
  , clickUrl        = window.location.href
  , bosses          = {
        'Cronus, The World Hydra'       : {mpool : 3, army : false, seige : 6, zh_tw : '' , levels : {
            'Levels 90+'   : group('90+: '  ,30),
            'Levels 60-90' : group('60-90: ',30),
            'Levels 30-60' : group('30-60: ',30),
            'Levels 1-30'  : group('01-30: ',40)}
        },

        'The Ancient Red Dragon'        : {mpool : 2, army : true , seige : 0, zh_tw : 'The Ancient Red Dragon'  , levels : {'' : group('',50)}},
        'The Gold Dragon'               : {mpool : 2, army : true , seige : 0, zh_tw : 'The Gold Dragon'  , levels : {'' : group('',50)}},
        'The Frost Dragon'              : {mpool : 2, army : true , seige : 0, zh_tw : 'The Frost Dragon'  , levels : {'' : group('',50)}},
        'The Emerald Dragon'            : {mpool : 2, army : true , seige : 0, zh_tw : 'The Emerald Dragon'  , levels : {'' : group('',50)}},

        'Gildamesh, The Orc King'       : {mpool : 1, army : true , seige : 0, zh_tw : 'Gildamesh, the Orc King'  , levels : {'' : group('',10)}},
        'The Colossus of Terra'         : {mpool : 1, army : true , seige : 0, zh_tw : 'The Colossus of Terra', levels : {'' : group('',15)}},
        'Sylvanas the Sorceress Queen'  : {mpool : 1, army : true , seige : 1, zh_tw : 'Sylvanas the Sorceress Queen'  , levels : {'' : group('',20)}},
        'Lotus Ravenmoore'              : {mpool : 1, army : true , seige : 0, zh_tw : 'Lotus Ravenmoore'  , levels : {'' : group('',15)}},
        'Keira the Dread Knight'        : {mpool : 1, army : true , seige : 0, zh_tw : 'Keria the Drag Knight'  , levels : {'' : group('',10)}},

        'The Emerald Sea Serpent'       : {mpool : 2, army : true , seige : 0, ship: true, zh_tw : 'The Emerald Sea Serpent', levels : {'' : group('',50)}},
        'The Sapphire Sea Serpent'      : {mpool : 2, army : true , seige : 0, ship: true, zh_tw : 'The Sapphire Sea Serpent', levels : {'' : group('',50)}},
        'The Amethyst Sea Serpent'      : {mpool : 2, army : true , seige : 0, ship: true, zh_tw : 'The Amethyst Sea Serpent', levels : {'' : group('',50)}},
        'The Ancient Sea Serpent'       : {mpool : 2, army : true , seige : 0, ship: true, zh_tw : 'The Ancient Sea Serpent', levels : {'' : group('',50)}}
    }
  ;

#function check_update(num, currentVersion) {
#   GM_xmlhttpRequest({
#        method : 'GET',
#        url    : 'http://userscripts.org/scripts/show/' + num,
#       onload : function(response) {
#           var summary = $("#summary", $(response.responseText));
#           summary.contents().filter(function() {
#               return this.nodeType == 3;
#           }).wrap("<span></span>");
#
#           var remoteVersion = $.trim($("b:contains('Version') + span", summary).text());
#           if(currentVersion < remoteVersion) {
#               if(confirm("蛇訊腳本有新版本, 請問要更新嗎? (按下確認三秒後將會自動幫您更新)")) {
#                    setTimeout(function() {unsafeWindow.location.href = "http://userscripts.org/scripts/source/"+num+".user.js";}, 3000);
#                }
#            }
#        }
#    });
#}

function add_exp() {
    var arrExp = $("#app46755028429_st_2_5 strong").text().split("/");
    $("#app46755028429_st_2_5 strong").append(" (<span style='color:red'>"+(arrExp[1] - arrExp[0])+"</span>)");
}

globalContainer .addEventListener('click', function(event) {
    var obj = event.target;

    while(obj && !obj.href)
        obj = obj.parentNode;

    if(obj && obj.href)
        clickUrl = obj.href;

}, true);

globalContainer.addEventListener('DOMNodeInserted', function(event) {
    if(event.target.querySelector("#app46755028429_app_body")) {
        setTimeout(proc_body, 0);
    }

    if(event.target.querySelector("#app46755028429_st_2_5")) {
        setTimeout(add_exp, 0);
    }

}, true);

$(document).ready(function() {
    if(document.querySelector("#app46755028429_battle_monster"))
        proc_body();
    add_exp();
    check_update(62885, '1.07');

});
