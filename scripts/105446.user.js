// ==UserScript==
// @name           Castle Age Gift (Mike)
// @namespace      Gift_Castle
// @include        http://apps.facebook.com/castle_age/*
// @include        http://web3.castleagegame.com/castle_ws/*
// @include        http://75.126.76.147/castle/*
// @include        http://web.castleagegame.com/castle/*
// @include        https://www.facebook.com/dialog/apprequests*
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @version        2.2
// @description    Castle Age Gift
// ==/UserScript==

//NOTICE!! THIS SCRIPT MODIFY FROM Neverever's Castle Age Gif//

var display = false;
var keepGoing= true;
var Eversion = '2.2';

var this_url_temp = window.location.href;
var this_url, ca_panel_;


if (this_url_temp.match("apps.facebook.com") == "apps.facebook.com")
{
    this_url = "http://apps.facebook.com/castle_age/";
    ca_panel_ = "#app_content_46755028429";
}
else
{
   this_url = "http://web3.castleagegame.com/castle_ws/";
   ca_panel_ = "#app_body_container";
}

console.debug("this_url : " + this_url);
console.debug("ca_panel_ : " + ca_panel_);

//Send to self gifts
function send(uid, num, gift) {
    if(num && keepGoing) {
        $.post(this_url + "gift_accept.php?act=create&gift=" + gift, {'ids[]': uid}, function() {
            receive(uid, num, gift);
        });
    } else if(!num) {
        alert('全部禮物都贈送完囉!');
        remove_sub_panel('ca_gift');
    }
}

//Accept own sent gifts
function receive(uid, num, gift) {
    if(num--)
        $.get(this_url + "gift_accept.php?act=acpt&rqtp=gift&uid=" + uid, function() {
            if(display)
                get_sub_panel('ca_gift').text("還有 " + num + " 個禮物要送...");    
            send(uid, num, gift);
        });
}

//List of gifts
function gift() {
    var ca_gift = get_sub_panel('ca_gift'),
        selectGift = $("<select></select>"),
        selectFreq = $("<select></select>"),
        inputID    = $("<input></input>"),
        buttonSub  = $("<button >贈送 & 確認</button>"),
        gifts      = [
      '額外: 禮物兵種 (Gift Soldiers!)',
      '第 01 項禮物 (Dragon Statue Gift! - Summon Vermilion)',
      '第 02 項禮物 (Dragon Scroll Gift! - Summon Thanatos of Fire and Ice)',
      '第 03 項禮物 (Mystery Tome! - Create Nether Tome)',
      '第 04 項禮物 (Mystery Beast Gift! - Summon Typhonus)',
      '第 05 項禮物 (Mystery Symbol Gift! - Summon Giants)',
      '第 06 項禮物 (Dragon Egg! - Summon Epic Dragon Quest)',
      '第 07 項禮物 (Kilgore Gift! - Create Kilgore to join your army)',
      '第 08 項禮物 (Serpent Egg! - Sea Serpent Quest)',
      '第 09 項禮物 (Mystery Air Gift! - Air Orb)',
      '第 10 項禮物 (Mystery Robe Gift! - Mystic Robe)',
      '第 11 項禮物 (Mystery Cloak Gift! - Assassins Cloa)',
      '第 12 項禮物 (Mystery Dagger Gift! - Aeris Dagger)',
      '第 13 項禮物 (Mystery Axe Gift! - Frostwolf Axe)',
      '第 14 項禮物 (Mystery Heirloom Gift! - Chase Family Heirloom)',
      '第 15 項禮物 (Mystery Staff Gift! - Staff of Vigor)',
      '第 16 項禮物 (Mystery Shield Gift! - Dragan Protector)',
      '第 17 項禮物 (Mystery Lava Gift! - Lava Orb)',
      '第 18 項禮物 (Mystery Crest Piece! - Zenarean Crest)',
      '第 19 項禮物 (Mystery Plate Gift! - Zarevok Plate)',
      '第 20 項禮物 (Great Fiery Gift! - Fiery Blade)',
      '第 21 項禮物 (Volcanic Egg! - Shield of Dante)',
      '第 22 項禮物 (Mystery Ice Artifact! - Ice Orb)',
      '第 23 項禮物 (Mystery Earth! - Earth Orb)',
      '第 24 項禮物 (Mystery Relic! - Drake Helm)',
      '第 25 項禮物 (Mystery Item! - The Battle of the Dark Legion)',
      '第 26 項禮物 (Limited Dragan Gift! - Draganblade)',
      '第 27 項禮物 (Mystery Relic! - Serpentine Shield)',
      '第 28 項禮物 (Mystery Treasure! - Poseidons Horn)',
      '第 29 項禮物 (Mystery Frost Relic! - Glacial Blade)',
      '第 30 項禮物 (Mystery Fire Relic! - Ring of Bahamut)',
      '第 31 項禮物 (Mystery Heirloom! - Titania Bow)',
      '第 32 項禮物 (Mystery Blade Gift! - Araxin Blade)',
      '第 33 項禮物 (Mystery Locket Gift! - Witch Locket)',
      '第 34 項禮物 (Mystery Gift! - Zarevok Defender)',
                       ],
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
                ca_gift.html("正在贈送中...完成後將會通知您..");
                display = true;
            } else {
                alert("找不到您的 ID, Castle Age 可能繁忙中, 請稍後再試!");
                remove_sub_panel('ca_gift');
            }
        });
    });

    ca_gift.html("請從下面選擇要贈送的禮物和次數:<br/>");
    ca_gift.append(selectGift, selectFreq, buttonSub);

}

//Do alchemy
function do_alch(form, num) {
    if(num > 0 && form.size()) {
        var data = {}, id = form.attr("id");

        form.children("input").each(function() {
            data[this.name] = this.value;
        });

        if(display)
            get_sub_panel('ca_alch').text("還有 " + num + " 個物品要合成...");

        $("<div></div>").load("alchemy.php div.results span.result_body, #"+id, data, function(responseText, textStatus, XMLHttpRequest) {
            var result = $(this), txt = $.trim(result.text());

            if(/You have created/.test(txt)) {
                setTimeout( function() {do_alch(result.children("form"), --num);}, 3000);
            } else if(txt == '') {
                setTimeout( function() {do_alch(form, num);}, 3000);
            } else {
                alert('全部物品都合成完囉, 但材料不夠合成剩下的 ' +num+ ' 次!');
                remove_sub_panel('ca_alch');
            }
        });
    } else {
        alert('全部物品都合成完囉!');
        remove_sub_panel('ca_alch');
    }
}

//List of Alchemy
function alchemy() {
    var ca_alch = get_sub_panel('ca_alch'), divs = $("<div></div>");

    divs.load("alchemy.php div.statsT2 table div.alchemyRecipeBack", function(responseText, textStatus, XMLHttpRequest) {
        var selectReci = $("<select></select>"),
            selectFreq = $("<select></select>"),
            buttonSub  = $("<button>Perform Alchemy</button>"),
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
            ca_alch.html("正在合成中...完成後將會通知您..");
            display = true;
        });
        ca_alch.html("請從下面選擇要合成的物品與次數:<br/>");
        ca_alch.append(selectReci, selectFreq, buttonSub);
    });

}

//Create Panel
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
        ca_panel.appendTo(ca_panel_);
    }
    return ca_panel;
}

//Remove Panel
function remove_panel() {
    var ca_panel = get_panel();
    if(!ca_panel.children().size())
        ca_panel.remove();
}

//Create inner Panel
function get_sub_panel(id) {
    var ca_sub_panel = $("#" + id);
    if(!ca_sub_panel.size()) {
        ca_sub_panel = $("<div id='"+id+"'>讀取中...請稍後~</div>").css({
            height   : '80px',
            width    : '450px',
            padding  : '8px',
            border   : 'solid 1px black',
            background : 'white'
        });
        get_panel().append(ca_sub_panel);
    }
    return ca_sub_panel;
}

//Remove Inner Panel
function remove_sub_panel(id) {
    var ca_sub_panel = get_sub_panel(id);
    ca_sub_panel.remove();
    remove_panel();
}

GM_registerMenuCommand('送自己禮物!', gift);
GM_registerMenuCommand('合成!', alchemy);
GM_registerMenuCommand('Castle Age 送禮腳本更新檢查', update_Check );

//Updation of script
function checkUpdate( num, currentVersion ) {
    GM_xmlhttpRequest({
        method : 'GET',
        url    : 'http://userscripts.org/scripts/source/' + num + '.meta.js',
        onload : function( response ) {
            var remoteVersion = response.responseText.match(/^\/\/\s\@version\s+(\d+\.\d+)/m)[1];
            if( currentVersion < remoteVersion ) {
                if( confirm( '送禮腳本有新版本, 請問要更新嗎? (按下確認三秒後將會自動幫您更新)' + '\nClick OK to update' ) ) {
                    setTimeout( function() { unsafeWindow.location.href = 'http://userscripts.org/scripts/source/' + num + '.user.js'; }, 3000 );
                }
            }
            else {
                alert('目前還沒有更新呦');
            }
    }
    });
}


function update_Check() {
    checkUpdate(105446, Eversion);
}

//Auto Updation of script
//$( document ).ready( function() {
//    update_Check();	
//});