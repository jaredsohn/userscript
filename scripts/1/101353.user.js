// ==UserScript==
// @name           Castle Age Gift 
// @namespace      YACK's Translation
// @include        http://apps.facebook.com/castle_age/*
// @include		   http://web3.castleagegame.com/castle_ws/*
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @version        1.00
// @description    Castle Age Gift Nya Gan
// ==/UserScript==

     /*////////////////////////////////////////////////////////*/
    //                    NOTICE:                             //
   /*--------------------------------------------------------*/
  //This script is modified from Neverever's Castle Age Gif //
 //and translated from -Castle Age Gift (YihJie)-          //
/*////////////////////////////////////////////////////////*/

var display = false;
var keepGoing= true;
var Eversion = '1.00';

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
        alert('Gifts sent and accepted!');
        remove_sub_panel('ca_gift');
    }
}

//Accept own sent gifts
function receive(uid, num, gift) {
    if(num--)
        $.get(this_url + "gift_accept.php?act=acpt&rqtp=gift&uid=" + uid, function() {
            if(display)
                get_sub_panel('ca_gift').text("There are " + num + " more gifts to send...");    
            send(uid, num, gift);
        });
}

//List of gifts
function gift() {
    var ca_gift = get_sub_panel('ca_gift'),
        selectGift = $("<select></select>"),
        selectFreq = $("<select></select>"),
        inputID    = $("<input></input>"),
        buttonSub  = $("<button >Send & Accept</button>"),
        gifts      = [
            'Extra Gift (Gift Soldiers!)',
			'Gift 01  (Mystery Tome! - Nether Tome)', 
			'Gift 02  (Mystic Robe! - Mystic Robe)', 
			'Gift 03 (Mystery Air Gift! - Air Orb)',
			'Gift 04 (Mystery Trident Gift! - Nautical Trident)',
			'Gift 05  (Mystery Cloak Gift! - Assassins Cloak)',
            'Gift 06  (Mystery Dagger Gift! - Aeris Dagger)',
            'Gift 07  (Mystery Axe Gift! - Frostwolf Axe)',
            'Gift 08  (Mystery Heirloom Gift! - Chase Family Heirloom)',
            'Gift 09  (Mystery Staff Gift! - Staff of Vigor)',
            'Gift 10  (Mystery Shield Gift! - Dragan Protector )',
            'Gift 11  (Mystery Lava Gift! - Lava Orb)',
            'Gift 12  (Mystery Crest Piece! - Zenarean Crest)',
            'Gift 13 (Mystery Plate Gift! - Zarevok Plate)',
            'Gift 14  (Great Fiery Gift! - Fiery Blade)',
            'Gift 15  (Volcanic Egg! - Shield of Dante, The Volcanic Dragon)',
            'Gift 16  (Mystery Ice Artifact! - Ice Orb)',
            'Gift 17  (Mystery Earth! - Earth Orb)',
            'Gift 18  (Mystery Relic! - Drake Helm)',
            'Gift 19  (Mystery Item! - The Battle of the Dark Legion)',
            'Gift 20  (Limited Dragan Gift! - Draganblade)',
            'Gift 21  (Mystery Relic! - Serpentine Shield)',
            'Gift 22  (Mystery Treasure! - Poseidons Horn)',
            'Gift 23  (Serpent Egg! - Sea Serpent Quest)',
            'Gift 24  (Dragon Egg! - Epic Dragon Quest)',
			'Gift 25  (Mystery Frost Item! - Frost Tear Dagger)',
			'Gift 26  (Mystery Fire Relic! - Ring of Bahamut)',
			'Gift 27  (Mystery Heirloom! - Titania Bow)',
			'Gift 28  (Mystery Blade Gift! - Araxin Blade)',
			'Gift 29  (Mystery Locket Gift! - Witch Locket)',
			'Gift 30  (Mystery Gift! - Zarevok Defender)',
			'Gift 31  (Mystery Relic!- Terras Blade)',
                        'Gift 32  (null)',
                        'Gift 33  (null)',
                        'Gift 34  (null)',
			],
        freq       = [1,80];

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

//Do alchemy
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
                alert('Done performing alchemy, remaining ' +num+ ' times to perform!');
                remove_sub_panel('ca_alch');
            }
        });
    } else {
        alert('Finished Alchemy!');
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
            ca_alch.html("When alchemy is done you will be notified...");
            display = true;
        });
        ca_alch.html("Choose the item you want to get through alchemy:<br/>");
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

//Remove Inner Panel
function remove_sub_panel(id) {
    var ca_sub_panel = get_sub_panel(id);
    ca_sub_panel.remove();
    remove_panel();
}

GM_registerMenuCommand('CA Send Gift', gift);
GM_registerMenuCommand('CA Perform Alchemy', alchemy);



//$( document ).ready( function() {
//    update_Check();	
//});