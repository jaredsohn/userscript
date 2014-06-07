// ==UserScript==
// @name       Evony Wall Manager
// @namespace  http://liamallan.tk/
// @version    0.1
// @description  automatically collect evony bonuses from facebook wall
// @include     http*://*facebook.com*
// @include     http*://*evony.com/facebook/facebook.CallBack.Event.php?*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @grant       GM_getValue
// @grant       GM_setValue
// @copyright  2013, Liam Allan
// ==/UserScript==
$(document).ready(function () {


    $("#rightCol").prepend("<div style='display:block; position:fixed; left:0px; bottom:0px; background-color:#073252; border:3px ridge #d59929; text-align:center; padding:10px; color:#d59929; z-index:9999; width:230px;'>" +
        "<h1 style='color:#d59929; font-weight:bold;'>Evony Wall Manager</h1><br>Click button to start!<br>" +
        "<input type='submit' id='start_accept_bonus' value='Start!'/><input type='submit' id='stop_accept_bonus' value='Stop!' style='display:none;'/><br>" +
        "<a href='#' id='bonus_option_link'>[options]</a>" +
        '<style>#bonus_options_panel{ padding:10px; display:none; }#bonus_options_panel ul{ width:auto; display:inline-block; vertical-align: top; text-align:right; padding-right:5px; } #bonus_options_panel ul li{ width:220px;}</style><div id="bonus_options_panel">' + '<ul id="bonuses"><legend><b>Select Bonuses to accept...</b></legend>' + '<li><label>Hungry No More <input type="checkbox" value="heroic companions!" class="bonus_select_option"></label></li>' + '<li><label>Pikemen <input type="checkbox" value="extra pikes!" class="bonus_select_option"></label></li>' + '<li><label>Swordsmen <input type="checkbox" value="recruited swordsmen!" class="bonus_select_option"></label></li>' + '<li><label>Valuable Treasure <input type="checkbox" value="valuable treasure!" class="bonus_select_option"></label></li>' + '<li><label>Jousting Competition <input type="checkbox" value="jousting game!" class="bonus_select_option"></label></li>' + '<li><label>Gamble <input type="checkbox" value="wants to gamble." class="bonus_select_option"></label></li>' + '<li><label>Extra Lumber <input type="checkbox" value="has extra lumber!" class="bonus_select_option"></label></li>' + '<li><label>Foreign Traders <input type="checkbox" value="attracted foreign traders!" class="bonus_select_option"></label></li>' + '<li><label>Buxom Wenches <input type="checkbox" value="inviting friends over!" class="bonus_select_option"></label></li>' + '<li><label>Plague <input type="checkbox" value="kingdom has the plague!" class="bonus_select_option"></label></li>' + '<li><label>Legendary Bard <input type="checkbox" value="hosting a legendary bard!" class="bonus_select_option"></label></li>' + '<li><label>Wild Horses <input type="checkbox" value="found wild horses!" class="bonus_select_option"></label></li>' + '<li><label>Mercenary Armies <input type="checkbox" value="mercenary armies with you." class="bonus_select_option"></label></li>' + '<li><label>Famed Hero <input type="checkbox" value="feasting with a famed hero!" class="bonus_select_option"></label></li>' + '<li><label>Queen Parading <input type="checkbox" value="Queen is parading!" class="bonus_select_option"></label></li>' + '<li><label>Wanted Criminal <input type="checkbox" value="caught a wanted criminal!" class="bonus_select_option"></label></li>' + '<li><label>Rolling Logs <input type="checkbox" value="has extra logs!" class="bonus_select_option"></label></li>' + '<li><label>Archery Game <input type="checkbox" value="holding a Archery game!" class="bonus_select_option"></label></li>' + '<li><label>Unruly Barbarians <input type="checkbox" value="unruly barbarians" class="bonus_select_option"></label></li>' + '<li><label>New Tool <input type="checkbox" value="engineered a new tool!" class="bonus_select_option"></label></li>' + '</ul>' + '</div></div>');
    $('#bonus_option_link').on('click', function () {
        $('#bonus_options_panel').slideToggle();
        return false;
    });

    $('#bonus_options_panel .bonus_select_option').attr('checked', true);



    function unique(array) {
        return $.grep(array, function (el, index) {
            return index == $.inArray(el, array);
        });
    }


    function newpage() {

        if($("._5pc6 img").not(":visible")) {

            $('div[id*=more_pager_pagelet] div a i').trigger('click');



        }

        setTimeout(accept, 10000);


    }


    function accept() {
        clearTimeout();
        $("._5pax").not(":contains('via Evony')").parent().parent().fadeOut('slow');
        var username = $("#navTimeline a").text();
        var total = $("._5pax:contains('via Evony')").length - $("._5pax:contains('via Evony')").find("._5rwn:contains('ACCEPTED')").length;
        var accepted = -1;
        var BonusUrls = Array();



        var bonus = [];
        $("input.bonus_select_option:checked").each(function () {
            bonus.push($(this).val());
        });

        $("._5pax:contains('via Evony')").each(function () {

            var BonusTitle = $(this).find("._5rwn").text();


            var re = new RegExp('(' + bonus.join('|') + ')');

            if(BonusTitle !== 'ACCEPTED' && BonusTitle.search(re) != -1) {

                var baseurl = $(this).find("._5rwn").attr("href");


                var vars = [],
                    hash;

                var url = baseurl;
                var q = url.split('?')[1];
                if(q != undefined) {
                    q = q.split('&');
                    for(var i = 0; i < q.length; i++) {
                        hash = q[i].split('=');
                        vars.push(hash[1]);
                        vars[hash[0]] = hash[1];
                    }
                }

                var new_url = decodeURIComponent(vars['u']).replace('apps.facebook.com/evonyoffical', 'evony.com/facebook');


                BonusUrls.push(new_url);

                $(this).find("._5rwn").css({
                    "background-color": "#a7ffb1",
                    "font-weight": "bold",
                    "color": "#227c1c"
                }).text('ACCEPTED');

            }

        });

        if($("#start_accept_bonus").is(":visible")) {
            return false;
        }


        var AcceptedBonusUrls = GM_getValue(username);

        $.each(unique(BonusUrls), function (i, value) {

            if($.inArray(value, GM_getValue(username)) < 0) {
                if($("#start_accept_bonus").is(":visible")) {
                    return false;
                }

                setTimeout(function () {

                    var win = window.open(value, true);
                    window.focus();
                    win.blur();
                    AcceptedBonusUrls.push(value);
                    GM_setValue(username, AcceptedBonusUrls);
                }, accepted * 10000);

                accepted++;
            }

        });
        clearTimeout();

        setTimeout(newpage, total * 10000);

    }


    function confirm_accept() {


        var type = $(".prompt input[name='type']").val();
        var fbuid = $(".prompt input[name='Fbuid']").val();
        var gs = $(".prompt input[name='GS']").val();
        var ss = $(".prompt input[name='SS']").val();
        var mk = $(".prompt input[name='mk']").val();
        var server = $(".prompt select[name='server']").val();

        if(server) {
            $('#theme').hide();
            $('<iframe />');
            $('<iframe />', {
                name: 'frame1',
                id: 'frame1',
                style: 'width:100%; height:800px; border:none;',
                sandbox: '',
                src: 'http://evony.com/facebook/facebook.ServerSelected.php?type=' + type + '&Fbuid=' + fbuid + '&GS=' + gs + '&SS=' + ss + '&mk=' + mk + '&server=' + server + '&subtype=Confirm+and+Back+to+Facebook%21'
            }).appendTo('body');

        }

    }


    if(location.hostname == 'www.facebook.com') {
        $("#start_accept_bonus").click(function () {
            $(this).hide();
            $("#stop_accept_bonus").show();
            accept();
        });

        $("#stop_accept_bonus").click(function () {
            $(this).hide();
            $("#start_accept_bonus").show();

        });
    } else if(location.hostname == 'evony.com') {
        confirm_accept();
    }


});