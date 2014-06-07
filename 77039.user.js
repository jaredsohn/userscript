// ==UserScript==
// @name           Gửi quà trong CA [BVT]
// @namespace      Gif
// @include        http://apps.facebook.com/castle_age/*
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @version        1.29
// @description    Tự động gửi quà và tự động ghép đồ trong game CA
// ==/UserScript==


//NOTICE!! THIS SCRIPT MODIFY FROM Neverever's Castle Age Gif

var display = false, keepGoing= true;

function send(uid, num, gift) {
    if(num && keepGoing) {
        $.post("http://apps.facebook.com/castle_age/gift_accept.php?act=create&gift=" + gift, {'ids[]': uid}, function() {
            receive(uid, num, gift);
        });
    } else if(!num) {
        alert('Gifts sent and accepted!');
        remove_sub_panel('ca_gift');
    }
}

function receive(uid, num, gift) {
    if(num--)
        $.get("http://apps.facebook.com/castle_age/gift_accept.php?act=acpt&rqtp=gift&uid=" + uid, function() {
            if(display)
                get_sub_panel('ca_gift').text("There are " + num + " more gifts to send...");    
            send(uid, num, gift);
        });
}

function gift() {
    var ca_gift = get_sub_panel('ca_gift'),
        selectGift = $("<select></select>"),
        selectFreq = $("<select></select>"),
        inputID    = $("<input></input>"),
        buttonSub  = $("<button >Send & Accept</button>"),
        gifts      = ['Extra Gift (Gift Soldiers)!','Gift 01 of 25  (Mystery Axe Gift! - Frostwolf Axe)','Gift 02 of 25  (Mystery Staff Gift! - Staff of Vigor)','Gift 03 of 25  (Mystery Plate Gift! - Zarevok Plate)','Gift 04 of 25  (Great Fiery Gift! - Fiery Blade)','Gift 05 of 25  (Mystery Lava Gift! - Lava Orb)','Gift 06 of 25  (Mystery Crest Piece! - Zenarean Crest)','Gift 07 of 25  (Volcanic Egg! - Shield of Dante, The Volcanic Dragon)','Gift 08 of 25  (Mystery Ice Artifact! - Ice Orb)','Gift 09 of 25  (Mystery Earth! - Earth Orb)','Gift 10 of 25  (Mystery Relic! - Drake Helm)','Gift 11 of 25  (Mystery Item! - The Battle of the Dark Legion)','Gift 12 of 25  (Limited Dragan Gift! - Draganblade)','Gift 13 of 25  (Mystery Relic! - Serpentine Shield)','Gift 14 of 25  (Mystery Treasure! - Poseidons Horn)','Gift 15 of 25  (Serpent Egg! - Sea Serpent Quest)','Gift 16 of 25  (Dragon Egg! - Epic Dragon Quest)','Gift 17 of 25  (Mystery Druid Item! - Whisper Bow)','Gift 18 of 25  (Mystery Armor! - Golden Hand)','Gift 19 of 25  (Mystery Frost Item! - Frost Tear Dagger)','Gift 20 of 25  (Mystery Artifact! - Morningstar)','Gift 21 of 25  (Mystery Armor! - Mystic Armor)','Gift 22 of 25  (Mystery Frost Relic! - Glacial Blade)','Gift 23 of 25  (Mystery Fire Relic! - Ring of Bahamut)','Gift 24 of 25  (Mystery Heirloom! - Titania Bow)','Gift 25 of 25 (Mystery Blade Gift! - Araxin Blade)'],
        freq       = [1,5,10,15,20,25,30,35,40,45,50,60];

    $.each(gifts, function(idx) {
        selectGift.append("<option value='" + idx + "'>" + this + "</option");
    });

    $.each(freq, function() {
         selectFreq.append("<option value='"+this+"'>"+this+"</option>");
    });

    buttonSub.click(function() {
        $("<div></div>").load("party.php span.linkwhite a", function() {
            if(/id=(\d+)/.test($(this).children().attr("href"))) {
                send(RegExp.$1, selectFreq.val(), $(":selected", selectGift).attr("value"));
                ca_gift.html("When done you will be notified..");
                display = true;
            } else {
                alert("Cannot find your ID, Castle Age may be busy, Try next time!");
                remove_sub_panel('ca_gift');
            }
        });
    });

    ca_gift.html("Choose the gift you want:<br/>");
    ca_gift.append(selectGift, selectFreq, buttonSub);

}

function do_alch(form, num) {
    if(num > 0 && form.size()) {
        var data = {}, id = form.attr("id");

        form.children("input").each(function() {
            data[this.name] = this.value;
        });

        if(display)
            get_sub_panel('ca_alch').text("There are " + num + " more alchemy to perform...");

        $("<div></div>").load("alchemy.php div.results span.result_body, #"+id, data, function(responseText, textStatus, XMLHttpRequest) {
            var result = $(this), txt = $.trim(result.text());

            if(/You have created/.test(txt)) {
                setTimeout( function() {do_alch(result.children("form"), --num);}, 3000);
            } else if(txt == '') {
                setTimeout( function() {do_alch(form, num);}, 3000);
            } else {
                alert('Done performing alchemy, remaining ' +num+ ' times to perfrom!');
                remove_sub_panel('ca_alch');
            }
        });
    } else {
        alert('Finished Alchemy!');
        remove_sub_panel('ca_alch');
    }
}

function alchemy() {
    var ca_alch = get_sub_panel('ca_alch'), divs = $("<div></div>");

    divs.load("alchemy.php div.statsT2 table div.alchemyRecipeBack", function(responseText, textStatus, XMLHttpRequest) {
        var selectReci = $("<select></select>"),
            selectFreq = $("<select></select>"),
            buttonSub  = $("<button>Perfrom Alchemy</button>"),
            freq       = [1,2,3,4,5,10,20,50]
            ;

        divs.children().each(function(idx) {
            selectReci.append("<option value='"+$("form",$(this)).attr("id")+"'>"+$("div.recipeTitle", $(this)).text().replace(/RECIPES: Create | to join your army!/g,'')+"</option>");
        });

        $.each(freq, function() {
             selectFreq.append("<option value='"+this+"'>"+this+"</option>");
        });

        buttonSub.click(function() {
            do_alch($("#"+$(":selected", selectReci).attr("value"), divs), selectFreq.val());
            ca_alch.html("When alchemy is done you will be notified...");
            display = true;
        });
        ca_alch.html("Choose the item you want to get through alchemy:<br/>");
        ca_alch.append(selectReci, selectFreq, buttonSub);
    });

}

function get_panel() {
    var ca_panel = $("#ca_gift_panel");
    if(!ca_panel.size()) {
        ca_panel = $("<div id='ca_gift_panel'></div>").css({
            position : 'absolute',
            top      : '25px',
            left     : '5px',
            padding  : '5px',
            border   : 'solid 1px black',
            background : 'white'
        });
        ca_panel.appendTo("#app_content_46755028429");
    }
    return ca_panel;
}

function remove_panel() {
    var ca_panel = get_panel();
    if(!ca_panel.children().size())
        ca_panel.remove();
}

function get_sub_panel(id) {
    var ca_sub_panel = $("#" + id);
    if(!ca_sub_panel.size()) {
        ca_sub_panel = $("<div id='"+id+"'>Loading....</div>").css({
            height   : '60px',
            width    : '420px',
            padding  : '5px',
            border   : 'solid 1px black',
            background : 'white'
        });
        get_panel().append(ca_sub_panel);
    }
    return ca_sub_panel;
}

function remove_sub_panel(id) {
    var ca_sub_panel = get_sub_panel(id);
    ca_sub_panel.remove();
    remove_panel();
}

function check_update(num, currentVersion) {
    GM_xmlhttpRequest({
        method : 'GET',
        url    : 'http://userscripts.org/scripts/show/' + num,
        onload : function(response) {
            var summary = $("#summary", $(response.responseText));
            summary.contents().filter(function() {
                return this.nodeType == 3;
            }).wrap("<span></span>");

            var remoteVersion = $.trim($("b:contains('Version') + span", summary).text());
            if(currentVersion < remoteVersion) {
                if(confirm("Press button to update")) {
                    setTimeout(function() {unsafeWindow.location.href = "http://userscripts.org/scripts/source/"+num+".user.js";}, 3000);
                }
            }
            //else {
            //    alert('Castle Age Alchemy And Gift - No update!');
            //}
        }
    });
}

function update_check() {
    check_update(77039, '1.29');
}

GM_registerMenuCommand("Castle Age Gift!", gift);
GM_registerMenuCommand("Castle Age Alchemy!", alchemy);

$(document).ready(function() {
    update_check();
});