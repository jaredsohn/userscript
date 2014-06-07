// ==UserScript==
// @name           Gửi quà trong CA
// @namespace      Gif
// @include        http://apps.facebook.com/castle_age/*
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @version        1.12 ngày 19.05.2010
// @description    Tự động gửi quà trong trò chơi Castle Age
// ==/UserScript==

//NOTICE!! THIS SCRIPT MODIFY FROM Neverever's Castle Age Gif
//Bản script này được gửi từ code của Neverever's Castle Age Gif

var display = false, keepGoing= true;

function send(uid, num, gift) {
    if(num && keepGoing) {
        $.post("http://apps.facebook.com/castle_age/gift_accept.php?act=create&gift=" + gift, {'ids[]': uid}, function() {
            receive(uid, num, gift);
        });
    } else if(!num) {
        alert('Đã gửi hết toàn bộ quà!');
        remove_sub_panel('ca_gift');
    }
}

function receive(uid, num, gift) {
    if(num--)
        $.get("http://apps.facebook.com/castle_age/gift_accept.php?act=acpt&rqtp=gift&uid=" + uid, function() {
            if(display)
                get_sub_panel('ca_gift').text("Vẫn còn " + num + " món quà đang gửi...");    
            send(uid, num, gift);
        });
}

function gift() {
    var ca_gift = get_sub_panel('ca_gift'),
        selectGift = $("<select></select>"),
        selectFreq = $("<select></select>"),
        inputID    = $("<input></input>"),
        buttonSub  = $("<button >Gửi</button>"),
        gifts      = ['Gift Soldiers!',' Limited Dragan Gift! - Draganblade',' Limited Garlan Relic! - Garlans Battlegear','Volcanic Egg! - Shield of Dante, The Volcanic Dragon','Mystery Ice Artifact! - Ice Orb','Mystery Earth! - Earth Orb',' Mystery Relic! - Drake Helm',' Mystery Item! - The Battle of the Dark Legion','Mystery Relic! - Serpentine Shield','Mystery Treasure! - Poseidons Horn','Serpent Egg! - Sea Serpent Quest','Dragon Egg! - Epic Dragon Quest','Mystery Druid Item! - Whisper Bow','Mystery Armor! - Golden Hand','Mystery Frost Item! - Frost Tear Dagger','Mystery Artifact! - Morningstar','Mystery Armor! - Mystic Armor','Mystery Frost Relic! - Glacial Blade','Mystery Fire Relic! - Ring of Bahamut'],
        freq       = [10,20,50,100,200,500,1000,2000,5000];

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
                ca_gift.html("Đang gửi quà . . . Sẽ thông báo với bạn khi hoàn thành . . . ");
                display = true;
            } else {
                alert("Không tìm thấy ID của bạn, có thể mạng đang bận, bạn hãy thử lại sau!");
                remove_sub_panel('ca_gift');
            }
        });
    });

    ca_gift.html("Hãy lựa chọn quà và số lượng ở bên dưới:<br/>");
    ca_gift.append(selectGift, selectFreq, buttonSub);

}

function do_alch(form, num) {
    if(num > 0 && form.size()) {
        var data = {}, id = form.attr("id");

        form.children("input").each(function() {
            data[this.name] = this.value;
        });

        if(display)
            get_sub_panel('ca_alch').text("Vẫn còn " + num + " đồ vật đang được ghép . . . ");

        $("<div></div>").load("alchemy.php div.results span.result_body, #"+id, data, function(responseText, textStatus, XMLHttpRequest) {
            var result = $(this), txt = $.trim(result.text());

            if(/You have created/.test(txt)) {
                setTimeout( function() {do_alch(result.children("form"), --num);}, 3000);
            } else if(txt == '') {
                setTimeout( function() {do_alch(form, num);}, 3000);
            } else {
                alert('Toàn bộ đồ vật đã được ghép xong, nguyên liệu còn lại không đủ để ghép được ' +num+ ' lần!');
                remove_sub_panel('ca_alch');
            }
        });
    } else {
        alert('Toàn bộ đồ vật đã được ghép xong!');
        remove_sub_panel('ca_alch');
    }
}

function alchemy() {
    var ca_alch = get_sub_panel('ca_alch'), divs = $("<div></div>");

    divs.load("alchemy.php div.statsT2 table div.alchemyRecipeBack", function(responseText, textStatus, XMLHttpRequest) {
        var selectReci = $("<select></select>"),
            selectFreq = $("<select></select>"),
            buttonSub  = $("<button>Ghép</button>"),
            freq       = [1,2,3,4,5,10,20,50,100,200,500]
            ;

        divs.children().each(function(idx) {
            selectReci.append("<option value='"+$("form",$(this)).attr("id")+"'>"+$("div.recipeTitle", $(this)).text().replace(/RECIPES: Create | to join your army!/g,'')+"</option>");
        });

        $.each(freq, function() {
             selectFreq.append("<option value='"+this+"'>"+this+"</option>");
        });

        buttonSub.click(function() {
            do_alch($("#"+$(":selected", selectReci).attr("value"), divs), selectFreq.val());
            ca_alch.html("Đang ghép đồ . . . Sẽ thông báo với bạn khi hoàn thành . . .");
            display = true;
        });
        ca_alch.html("Lựa chọn đồ vật muốn ghép và số lượng ở bên dưới:<br/>");
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
        ca_sub_panel = $("<div id='"+id+"'>Đang tải . . . hãy chờ đợi~</div>").css({
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
                if(confirm("Đã có phiên bản mới, bạn có muốn nâng cấp không? (Ấn nút đồng ý, 3 giây sau sẽ tự động nâng cấp)")) {
                    setTimeout(function() {unsafeWindow.location.href = "http://userscripts.org/scripts/source/"+num+".user.js";}, 3000);
                }
            }
            //else {
            //    alert('Castle Age Alchemy And Gift – Hiện thời chưa có bản nâng cấp!');
            //}
        }
    });
}

function update_check() {
    check_update(71394, '1.12');
}

GM_registerMenuCommand("Castle Age Alchemy And Gift – Tôi muốn tự gửi quà!", gift);
GM_registerMenuCommand("Castle Age Alchemy And Gift – Tôi muốn ghép đồ!", alchemy);

$(document).ready(function() {
    update_check();
});