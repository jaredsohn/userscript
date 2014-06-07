// ==UserScript==
// @name           Castle Age Gift Tool (English)
// @namespace      com.testweb2
// @include        https://apps.facebook.com/castle_age/*
// @include	   https://web4.castleagegame.com/castle_ws/*
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @version        2.1.9
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
 //                                                        //
/*////////////////////////////////////////////////////////*/



var display = false;
var keepGoing= true;
var Eversion = '2.1.9';

var this_url_temp = window.location.href;
var this_url, ca_panel_;


if (this_url_temp.match("apps.facebook.com") == "apps.facebook.com")
{
    this_url = "https://apps.facebook.com/castle_age/";
    ca_panel_ = "#app_content_46755028429";
}
else
{
   this_url = "https://web4.castleagegame.com/castle_ws/";
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
'Gift 1 (Magmapede)',
'Gift 2 (Darkness)',
'Gift 3 (Slime)',
'Gift 4 (Malekus)',
'Gift 5 (Meph)',
'Gift 6 (Soulstone)',
'Gift 7 (Vermilion)',
'Gift 8 (Thanatos)',
'Gift 9 (NETHER TOME)',
'Gift 10 (Typhonus)',
'Gift 11 (Mystery Artifact)',
'Gift 12 (Dragon Scroll)',
'Gift 13 (Dragon Statue)',
'Gift 14 (Mystery Beast)',
'Gift 15 (Mystery Air)',
'Gift 16 (Mystery Lava Orb)',
'Gift 17 (Mystery Crest Piece)',
'Gift 18 (Volcanic Egg)',
'Gift 19 (Mystery Ice Artifact)',
'Gift 20 (Mystery Earth Orb)',
'Gift 21 (Mystery Shield)',
'Gift 22 (Mystery Amulet)',
'Gift 23 (Mystery Symbol)',
'Gift 24 (Mystery Staff)',
'Gift 25 (Mystery Item)',
'Gift 26 (Mystery Tome)',
'Gift 27 (Mystery Relic)',
'Gift 28 (Mystery Robe)',
'Gift 29 (Mystery Gift)',
'Gift 30 (Mystery Cid)',
'Gift 31 (Mystery Faerie)',
'Gift 32 (Mystery Shield)',
'Gift 33 (Mystery Blade)',
'Gift 34 (Bloodblade Shard)',
'Gift 35 (Mystery Life)',
'Gift 36 (Great Fiery)',
'Gift 37 (Mystery Shadow)',
'Gift 38 (Mystery Heirloom)',
'Gift 39 (Serpent Egg)',
'Gift 40 (Mystical Dagger)',
'Gift 41 (Mystery Locket)',
'Gift 42 (Mystery Relic)',
'Gift 43 (Mystery Axe)',
'Gift 44 (Mystery Shield)',
'Gift 45 (Mystery Plate)',
'Gift 46 (Dragon Egg)',
'Gift 47 (Cid Saber Shard)',
'Gift 48 (Mystery Dagger)',
'Gift 49 (Crimson Dagger)',
'Gift 50 (Mystery Light Relic)',
'Gift 51 (Limited Dragan Gift)',
'Gift 52 (Mystery Cloak Gift)',
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