// ==UserScript==
// @name           Castle Age Gift Tool (English)
// @namespace      com.testweb2
// @include        https://apps.facebook.com/castle_age/*
// @include	   https://web3.castleagegame.com/castle_ws/*
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @version        2.0.6
// @description    Castle Age Gift Tool (English)
// @grant       GM_registerMenuCommand
// @grant       GM_xmlhttpRequest
// ==/UserScript==

       /*////////////////////////////////////////////////////////*/
      //                    NOTICE:                             //
     /*--------------------------------------------------------*/
    //This script is modified from Neverever's Castle Age Gif //
   //and translated from -Castle Age Gift (YihJie)-          //
  //and updated from YACK's Translation                     //
 //and updated from Castle Age Gift (Mike)                 //
/*////////////////////////////////////////////////////////*/

// UPDATE: 2012-08-31, RL - Added Ancient Slime Gift
// UPDATE: 2012-09-05, RL - Fixed Update Check
// UPDATE: 2012-10-05, RL - added (at)grant metadata references to GM functions
//                        - Commented out Alchemy function until such time as it is fixed
// UPDATE: 2012-12-18, RL - Updated to work through https
// UPDATE: 2012-12-20, RL - Added Lord of Darkness gift

var display = false;
var keepGoing= true;
var Eversion = '2.0.6';

var this_url_temp = window.location.href;
var this_url, ca_panel_;


if (this_url_temp.match("apps.facebook.com") == "apps.facebook.com")
{
    this_url = "https://apps.facebook.com/castle_age/";
    ca_panel_ = "#app_content_46755028429";
}
else
{
   this_url = "https://web3.castleagegame.com/castle_ws/";
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
'Extra Gift (Gift Soldiers)',
'Gift 1 (Lord of Darkness)',
'Gift 2 (Ancient Slime)',
'Gift 3 (Legacy Malekus)',
'Gift 4 (Legacy Meph)',
'Gift 5 (Death Soulstone)',
'Gift 6 (Dragon Statue)',
'Gift 7 (Scroll of Dragon Soul)',
'Gift 8 (Nether Tome)',
'Gift 9 (Typhonus Items)',
'Gift 10 (Storm, Mountain, Lava, Frost Symbols)',
'Gift 11 (Dragon Egg)',
'Gift 12 (Kilgore)',
'Gift 13 (Serpent Eggs)',
'Gift 14 (Air Orb)',
'Gift 15 (Assassins Cloak)',
'Gift 16 (Aeris Dagger)',
'Gift 17 (Frostwolf Axe)',
'Gift 18 (Chase Family Heirloom)',
'Gift 19 (Staff Of Vigor)',
'Gift 20 (Dragan Protector)',
'Gift 21 (Lava Orb)',
'Gift 22 (Zenarean Crest)',
'Gift 23 (Zarevok Plate)',
'Gift 24 (Fiery Blade)',
'Gift 25 (Volcanic Egg)',
'Gift 26 (Ice Orb)',
'Gift 27 (Earth Orb)',
'Gift 28 (Drake Helm)',
'Gift 29 (Battle Of The Dark Legion)',
'Gift 30 (Draganblade)',
'Gift 31 (Serpentine Shield)',
'Gift 32 (Poseidons Horn)',
'Gift 33 (Glacial Blade)',
'Gift 34 (Ring Of Bahamut)',
'Gift 35 (Titania Bow)',
'Gift 36 (Araxin Blade)',
'Gift 37 (Witch Locket)',
'Gift 38 (Zarevok Defender)',
'Gift 39 (Terras Blade)',
			],
        freq       = [1,5,10,15,20,25,30,35,40,45,50,60,80];

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
// GM_registerMenuCommand('CA Perform Alchemy', alchemy);
GM_registerMenuCommand('CA Gift EN - Check for update', update_Check );

//Updation of script
function checkUpdate( num, currentVersion ) {
    GM_xmlhttpRequest({
        method : 'GET',
        url    : 'http://userscripts.org/scripts/source/' + num + '.meta.js',
        onload : function( response ) {
            var remoteVersion = response.responseText.match(/^\/\/\s\@version\s+(\d+\.\d+)/m)[1];
            if( currentVersion < remoteVersion ) {
                if( confirm( 'There is a newer version available.' + '\nClick OK to update' ) ) {
                    setTimeout( function() { unsafeWindow.location.href = 'http://userscripts.org/scripts/source/' + num + '.user.js'; }, 3000 );
                }
            }
            else {
                alert('NO updates for Castle Age Gift Tool (English)');
            }
    }
    });
}


function update_Check() {
    checkUpdate(140619, Eversion);
}

//Auto Updation of script
//$( document ).ready( function() {
//    update_Check();	
//});

