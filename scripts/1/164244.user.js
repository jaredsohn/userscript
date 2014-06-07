// ==UserScript==
// @name           Castle Age Gift Tool
// @namespace      com.testweb2
// @include        http*://apps.*facebook.com/castle_age/*
// @include        https://web.castleagegame.com/castle/*
// @include        https://web3.castleagegame.com/castle_ws/*
// @version        1.0.0
// @description    Castle Age Gift Tool
// @grant          GM_registerMenuCommand
// @grant          GM_xmlhttpRequest
// ==/UserScript==

var display = false;
var keepGoing= true;
var sendGift = "https://web.castleagegame.com/castle/request_handler.php?act=create";
var getGift = "https://web.castleagegame.com/castle/index.php?feed=allies&news_feed_accept=1&request_type=1001";

//Send to self gifts
function send(sender, num, gift) {
    if(num && keepGoing) {
		sendGift += "&gift=" + gift;
		console.debug("Send Gift : " + sendGift);
		$.post(sendGift, sender, function() {
            receive(sender, num, gift);
        });
    } else if(!num) {
        alert('Gifts sent and accepted!');
        remove_sub_panel('ca_gift');
    }
}

//Accept own sent gifts
function receive(sender, num, gift) {
    if(num--)
		getGift += "&sender_id=" + sender;
		console.debug("Get Gift : " + getGift);
        $.get(this_url + "gift.php?act=acpt&rqtp=giftSelection&uid=" + sender, function() {
            if(display)
                get_sub_panel('ca_gift').text("There are " + num + " more gifts to send...");    
            send(sender, num, gift);
        });
}

//List of gifts
function gift() {
    var ca_gift = get_sub_panel('ca_gift'),
        selectGift = $("<select></select>"),
        selectFreq = $("<select></select>"),
        selectSender = $("<select></select>"),
        inputID    = $("<input></input>"),
        buttonSub  = $("<button >Send & Accept</button>"),
		senderUids       = [
'100004530761152',
'100000443094879'
		],
        gifts      = [
'Gift 2051 (Lord of the Corrupted)',
'Gift 2050 (Lord of Magamapede)',
'Gift 2049 (Lord of Darkness)',
'Gift 2048 (Ancient Slime)',
'Gift 2047 (Death Soulstone)',
'Gift 2046 (Legacy Meph)',
'Gift 2045 (Legacy Malekus)',
'Gift 2044 (Limited Lione)',
'Gift 2043 (Limited Garlan Relic)',
'Gift 2042 (Mystery Artifact)',
'Gift 2041 (Dragon Scroll)',
'Gift 2040 (Dragon Statue)',
'Gift 2039 (Mystery Beast)',
'Gift 2038 (Mystery Air Orb)',
'Gift 2037 (Mystery Lava Orb)',
'Gift 2036 (Mystery Crest Piece)',
'Gift 2035 (Volcanic Egg)',
'Gift 2034 (Mystery Ice Artifact)',
'Gift 2033 (Mystery Earth Orb)',
'Gift 2032 (Mystery Shield)',
'Gift 2031 (Mystery Amulet)',
'Gift 2030 (Mystery Symbol)',
'Gift 2029 (Mystery Staff)',
'Gift 2028 (Mystery Item)',
'Gift 2027 (Mystery Tome)',
'Gift 2026 (Mystery Relic)',
'Gift 2025 (Mystery Robe)',
'Gift 2024 (Mystery Gift)',
'Gift 2023 (Mystery Cid)',
'Gift 2022 (Mystery Faerie)',
'Gift 2021 (Mystery Shield)',
'Gift 2020 (Mystery Blade)',
'Gift 2019 (Bloodblade Shard)',
'Gift 2018 (Mystery Life)',
'Gift 2017 (Great Fiery)',
'Gift 2016 (Mystery Shadow)',
'Gift 2015 (Mystery Heirloom)',
'Gift 2014 (Serpent Egg)',
'Gift 2013 (Mystical Dagger)',
'Gift 2012 (Mystery Locket)',
'Gift 2011 (Mystery Relic)',
'Gift 2010 (Mystery Axe)',
'Gift 2009 (Mystery Shield)',
'Gift 2008 (Mystery Plate)',
'Gift 2007 (Dragon Egg)',
'Gift 2006 (Cid Saber Shard)',
'Gift 2005 (Mystery Dagger)',
'Gift 2004 (Crimson Dagger)',
'Gift 2003 (Mystery Light Relic)',
'Gift 2002 (Limited Dragan Gift)',
'Gift 2001 (Mystery Cloak Gift)'
			],
        giftValues      = [
2051,
2050,
2049,
2048,
2047,
2046,
2045,
2044,
2043,
2042,
2041,
2040,
2039,
2038,
2037,
2036,
2035,
2034,
2033,
2032,
2031,
2030,
2029,
2028,
2027,
2026,
2025,
2024,
2023,
2022,
2021,
2020,
2019,
2018,
2017,
2016,
2015,
2014,
2013,
2012,
2011,
2010,
2009,
2008,
2007,
2006,
2005,
2004,
2003,
2002,
2001
			],
	freq       = [1,5,10,15,20,25,30,35,40,45,50,60,80];

    $.each(gifts, function(idx) {
        selectGift.append("<option value='" + giftValues[idx] + "'>" + this + "</option");
    });

    $.each(freq, function() {
         selectFreq.append("<option value='"+this+"'>"+this+"</option>");
    });

    $.each(senderUids, function() {
         selectSender.append("<option value='"+this+"'>"+this+"</option>");
	});

    buttonSub.click(function() {
        $("<div></div>").load("party.php span.linkwhite a", function() {
            if(/id=(\d+)/.test($(this).children().attr("href"))) {
                send($(":selected", selectSender).attr("value"), $(":selected", selectFreq).attr("value"), $(":selected", selectGift).attr("value"));
                ca_gift.html("When done you will be notified..");
                display = true;
            } else {
                alert("Cannot find your ID, Castle Age may be busy, Try next time!");
                remove_sub_panel('ca_gift');
            }
        });
    });

    ca_gift.html("Choose the gift you want:<br/>");
    ca_gift.append(selectSender,selectGet,selectGift, selectFreq, buttonSub);

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

//Auto Updation of script
//$( document ).ready( function() {
//    update_Check();	
//});