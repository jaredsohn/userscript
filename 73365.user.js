// ==UserScript==
// @name           CA Gif
// @namespace      Gif
// @include        http://apps.facebook.com/castle_age/*
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @version        1.07a
// @Thai version By KhaWtAaN   Thk for all
// ==/UserScript==

//NOTICE!! THIS SCRIPT MODIFY FROM Neverever's Castle Age Gif

var display = false, keepGoing= true;

function send(uid, num, gift) {
    if(num && keepGoing) {
        $.post("http://apps.facebook.com/castle_age/army.php?act=create&gift=" + gift, {'ids[]': uid}, function() {
            receive(uid, num, gift);
        });
    } else if(!num) {
        alert('ได้จัดการของขวัญทั้งหมดแล้ว');
        remove_sub_panel('ca_gift');
    }
}

function receive(uid, num, gift) {
    if(num--)
        $.get("http://apps.facebook.com/castle_age/army.php?act=acpt&rqtp=gift&uid=" + uid, function() {
            if(display)
                get_sub_panel('ca_gift').text("เหลือของขวัญอีก " + num + " ชิ้น ที่กำลังส่งไป...");
            send(uid, num, gift);
        });
}

function gift() {
    var ca_gift = get_sub_panel('ca_gift'),
        selectGift = $("<select></select>"),
        selectFreq = $("<select></select>"),
        inputID    = $("<input></input>"),
        buttonSub  = $("<button >ส่ง</button>"),
        gifts      = ['ของขวัญ', 'อันที่ 1', 'อันที่ 2'  , 'อันที่ 3', 'อันที่ 4' , 'อันที่ 5', 'อันที่ 6', 'อันที่ 7', 'อันที่ 8','อันที่ 9','อันที่ 10','อันที่ 11','อันที่ 12','อันที่ 13','อันที่ 14','อันที่ 15','อันที่ 16']
        freq       = [10,20,50,100,200,500, 1000, 2000, 5000];

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
                ca_gift.html("กำลังทำการส่งของขวัญ เมื่อส่งเสร็จจะแจ้งให้คุณทราบ ..");
                display = true;
            } else {
                alert("ไม่พบ ID ของคุณ, CA อาจจะไม่ว่าง ให้ทำการส่งใหม่ภายหลัง");
                remove_sub_panel('ca_gift');
            }
        });
    });

    ca_gift.html("กรุณาเลือกของขวัญและจำนวนที่ต้องการ<br/>");
    ca_gift.append(selectGift, selectFreq, buttonSub);

}

function do_alch(form, num) {
    if(num > 0 && form.size()) {
        var data = {}, id = form.attr("id");

        form.children("input").each(function() {
            data[this.name] = this.value;
        });

        if(display)
            get_sub_panel('ca_alch').text("เหลือของที่ทำการรวมอีก " + num + " ชิ้น ที่กำลังรวมอยู่...");

        $("<div></div>").load("alchemy.php div.results span.result_body, #"+id, data, function(responseText, textStatus, XMLHttpRequest) {
            var result = $(this), txt = $.trim(result.text());

            if(/You have created/.test(txt)) {
                setTimeout( function() {do_alch(result.children("form"), --num);}, 3000);
            } else if(txt == '') {
                setTimeout( function() {do_alch(form, num);}, 3000);
            } else {
                alert('ของทั้งหมดรวมไปแล้วจำนวน ' +num+ ' ชิ้น');
                remove_sub_panel('ca_alch');
            }
        });
    } else {
        alert('ของทั้งหมดรวมเสร็จแล้ว');
        remove_sub_panel('ca_alch');
    }
}

function alchemy() {
    var ca_alch = get_sub_panel('ca_alch'), divs = $("<div></div>");

    divs.load("alchemy.php div.statsT2 table div.alchemyRecipeBack", function(responseText, textStatus, XMLHttpRequest) {
        var selectReci = $("<select></select>"),
            selectFreq = $("<select></select>"),
            buttonSub  = $("<button>รวม</button>"),
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
            ca_alch.html("เมื่อรวมเสร็จสิ้นจะแจ้งให้คุณทราบ...");
            display = true;
        });
        ca_alch.html("กรุณาเลือกของและจำนวนที่ต้องการรวม<br/>");
        ca_alch.append(selectReci, selectFreq, buttonSub);
    });

}



function get_panel() {
    var ca_panel = $("#ca_gift_panel");
    if(!ca_panel.size()) {
        ca_panel = $("<div id='ca_gift_panel'></div>").css({
            position : 'absolute',
            top      : '300px',
            left     : '10px',
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
        ca_sub_panel = $("<div id='"+id+"'>กำลังดำเนิดการ โปรดรอ ...</div>").css({
            height   : '60px',
            width    : '300px',
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
                if(confirm("ต้องการ update script ใหม่หรือไม่? (กดแล้วรอ 3 วินาที)")) {
                    setTimeout(function() {unsafeWindow.location.href = "http://userscripts.org/scripts/source/"+num+".user.js";}, 3000);
                }
            }
        }
    });
}

GM_registerMenuCommand("ส่งของขวัญให้ตัวเอง!", gift );
GM_registerMenuCommand("ทำการรวมของ!", alchemy);

$(document).ready(function() {
    check_update(64028, '1.05', true);
});