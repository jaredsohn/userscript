// ==UserScript==
// @name       Evony AgeII Auto Gift Accept
// @namespace  http://liamallan.tk
// @version    0.2
// @description  this userscript will simplify the acceptance of evony gifts on facebook, by automatically accepting first 20 gifts
// @include     http*://*facebook.com/*
// @include     http*://*evony.com/facebook/index.php?*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @copyright  2013, Liam Allan
// ==/UserScript==
function main() {


    $('#confirm_372268249833 .pts li').show();
    $('#confirm_372268249833 .uiHeaderTitle').html('<button id="giftstartbutton" style="right:0px; position:relative;">Start Accepting..</button>' + ' <a href="#" id="option_link">[options]</a>');
    $('#confirm_372268249833 .uiHeaderTop div').append('<style>#options_panel{ padding:10px; display:none; }#options_panel ul{ border:1px solid grey; width:220px; display:inline-block; vertical-align: top; text-align:right; } #options_panel ul li{ width:220px;}</style><div id="options_panel">' + '<ul id="resources">' + '<li><legend><b>Resources</b></legend> <a href="#" id="all_res">[check all resources]</a></li>' + '<li><label>Minor Food Pack <input type="checkbox" name="player.box.fbgift.food.minor" value="Minor Food Pack" class="gift_select_option"></label></li>' + '<li><label>Minor Gold Pack <input type="checkbox" name="player.box.fbgift.gold.minor" value="Minor Gold Pack" class="gift_select_option"></label></li>' + '<li><label>Minor Iron Pack <input type="checkbox" name="player.box.fbgift.gold.minor" value="Minor Iron Pack" class="gift_select_option"></label></li>' + '<li><label>Minor Stone Pack <input type="checkbox" name="player.box.fbgift.gold.minor" value="Minor Stone Pack" class="gift_select_option"></label></li>' + '<li><label>Minor Wood Pack <input type="checkbox" name="player.box.fbgift.gold.minor" value="Minor Wood Pack" class="gift_select_option"></label></li>' + '<li><label>Lesser Food Pack <input type="checkbox" name="player.box.fbgift.gold.minor" value="Lesser Food Pack" class="gift_select_option"></label></li>' + '<li><label>Lesser Gold Pack <input type="checkbox" name="player.box.fbgift.gold.minor" value="Lesser Gold Pack" class="gift_select_option"></label></li>' + '<li><label>Lesser Iron Pack <input type="checkbox" name="player.box.fbgift.gold.minor" value="Lesser Iron Pack" class="gift_select_option"></label></li>' + '<li><label>Lesser Stone Pack <input type="checkbox" name="player.box.fbgift.gold.minor" value="Lesser Stone Pack" class="gift_select_option"></label></li>' + '<li><label>Lesser Wood Pack <input type="checkbox" name="player.box.fbgift.gold.minor" value="Lesser Wood Pack" class="gift_select_option"></label></li>' + '<li><label>Medium Food Pack <input type="checkbox" name="player.box.fbgift.gold.minor" value="Medium Food Pack" class="gift_select_option"></label></li>' + '<li><label>Medium Gold Pack <input type="checkbox" name="player.box.fbgift.gold.minor" value="Medium Gold Pack" class="gift_select_option"></label></li>' + '<li><label>Medium Iron Pack <input type="checkbox" name="player.box.fbgift.gold.minor" value="Medium Iron Pack" class="gift_select_option"></label></li>' + '<li><label>Medium Stone Pack <input type="checkbox" name="player.box.fbgift.gold.minor" value="Medium Stone Pack" class="gift_select_option"></label></li>' + '<li><label>Medium Wood Pack <input type="checkbox" name="player.box.fbgift.gold.minor" value="Medium Wood Pack" class="gift_select_option"></label></li>' + '<li><label>Normal Food Pack <input type="checkbox" name="player.box.fbgift.gold.minor" value="Normal Food Pack" class="gift_select_option"></label></li>' + '<li><label>Normal Gold Pack <input type="checkbox" name="player.box.fbgift.gold.minor" value="Normal Gold Pack" class="gift_select_option"></label></li>' + '<li><label>Normal Iron Pack <input type="checkbox" name="player.box.fbgift.gold.minor" value="Normal Iron Pack" class="gift_select_option"></label></li>' + '<li><label>Normal Stone Pack <input type="checkbox" name="player.box.fbgift.gold.minor" value="Normal Stone Pack" class="gift_select_option"></label></li>' + '<li><label>Normal Wood Pack <input type="checkbox" name="player.box.fbgift.gold.minor" value="Normal Wood Pack" class="gift_select_option"></label></li>' + '<li><label>Greater Food Pack <input type="checkbox" name="player.box.fbgift.gold.minor" value="Greater Food Pack" class="gift_select_option"></label></li>' + '<li><label>Greater Gold Pack <input type="checkbox" name="player.box.fbgift.gold.minor" value="Greater Gold Pack" class="gift_select_option"></label></li>' + '<li><label>Greater Iron Pack <input type="checkbox" name="player.box.fbgift.gold.minor" value="Greater Iron Pack" class="gift_select_option"></label></li>' + '<li><label>Greater Stone Pack <input type="checkbox" name="player.box.fbgift.gold.minor" value="Greater Stone Pack" class="gift_select_option"></label></li>' + '<li><label>Greater Wood Pack <input type="checkbox" name="player.box.fbgift.gold.minor" value="Greater Wood Pack" class="gift_select_option"></label></li>' + '<li><label>Superior Food Pack <input type="checkbox" name="player.box.fbgift.gold.minor" value="Superior Food Pack" class="gift_select_option"></label></li>' + '<li><label>Superior Gold Pack <input type="checkbox" name="player.box.fbgift.gold.minor" value="Superior Gold Pack" class="gift_select_option"></label></li>' + '<li><label>Superior Iron Pack <input type="checkbox" name="player.box.fbgift.gold.minor" value="Superior Iron Pack" class="gift_select_option"></label></li>' + '<li><label>Superior Stone Pack <input type="checkbox" name="player.box.fbgift.gold.minor" value="Superior Stone Pack" class="gift_select_option"></label></li>' + '<li><label>Superior Wood Pack <input type="checkbox" name="player.box.fbgift.gold.minor" value="Superior Wood Pack" class="gift_select_option"></label></li>' + '<li><label>Major Food Pack <input type="checkbox" name="player.box.fbgift.gold.minor" value="Major Food Pack" class="gift_select_option"></label></li>' + '<li><label>Major Gold Pack <input type="checkbox" name="player.box.fbgift.gold.minor" value="Major Gold Pack" class="gift_select_option"></label></li>' + '<li><label>Major Iron Pack <input type="checkbox" name="player.box.fbgift.gold.minor" value="Major Iron Pack" class="gift_select_option"></label></li>' + '<li><label>Major Stone Pack <input type="checkbox" name="player.box.fbgift.gold.minor" value="Major Stone Pack" class="gift_select_option"></label></li>' + '<li><label>Major Wood Pack <input type="checkbox" name="player.box.fbgift.gold.minor" value="Major Wood Pack" class="gift_select_option"></label></li>' + '<li><label>Super Food Pack <input type="checkbox" name="player.box.fbgift.gold.minor" value="Super Food Pack" class="gift_select_option"></label></li>' + '<li><label>Super Gold Pack <input type="checkbox" name="player.box.fbgift.gold.minor" value="Super Gold Pack" class="gift_select_option"></label></li>' + '<li><label>Super Iron Pack <input type="checkbox" name="player.box.fbgift.gold.minor" value="Super Iron Pack" class="gift_select_option"></label></li>' + '<li><label>Super Stone Pack <input type="checkbox" name="player.box.fbgift.gold.minor" value="Super Stone Pack" class="gift_select_option"></label></li>' + '<li><label>Super Wood Pack <input type="checkbox" name="player.box.fbgift.gold.minor" value="Super Wood Pack" class="gift_select_option"></label></li>' + '<li><label>Grand Food Pack <input type="checkbox" name="player.box.fbgift.gold.minor" value="Grand Food Pack" class="gift_select_option"></label></li>' + '<li><label>Grand Gold Pack <input type="checkbox" name="player.box.fbgift.gold.minor" value="Grand Gold Pack" class="gift_select_option"></label></li>' + '<li><label>Grand Iron Pack <input type="checkbox" name="player.box.fbgift.gold.minor" value="Grand Iron Pack" class="gift_select_option"></label></li>' + '<li><label>Grand Stone Pack <input type="checkbox" name="player.box.fbgift.gold.minor" value="Grand Stone Pack" class="gift_select_option"></label></li>' + '<li><label>Grand Wood Pack <input type="checkbox" name="player.box.fbgift.gold.minor" value="Grand Wood Pack" class="gift_select_option"></label></li>' + '<li><label>Royal Food Pack <input type="checkbox" name="player.box.fbgift.gold.minor" value="Royal Food Pack" class="gift_select_option"></label></li>' + '<li><label>Royal Gold Pack <input type="checkbox" name="player.box.fbgift.gold.minor" value="Royal Gold Pack" class="gift_select_option"></label></li>' + '<li><label>Royal Iron Pack <input type="checkbox" name="player.box.fbgift.gold.minor" value="Royal Iron Pack" class="gift_select_option"></label></li>' + '<li><label>Royal Stone Pack <input type="checkbox" name="player.box.fbgift.gold.minor" value="Royal Stone Pack" class="gift_select_option"></label></li>' + '<li><label>Royal Wood Pack <input type="checkbox" name="player.box.fbgift.gold.minor" value="Royal Wood Pack" class="gift_select_option"></label></li>' + '</ul>' + '<ul id="troops">' + '<li><legend><b>Troops</b></legend> <a href="#" id="all_troop">[check all troops]</a></li>' + '<li><label>Civillian Reinf. Pack <input type="checkbox" name="player.box.fbgift.gold.minor" value="Civillian Reinf. Pack" class="gift_select_option"></label></li>' + '<li><label>Knight Reinf. Pack <input type="checkbox" name="player.box.fbgift.gold.minor" value="Knight Reinf. Pack" class="gift_select_option"></label></li>' + '<li><label>Baronet Reinf. Pack <input type="checkbox" name="player.box.fbgift.gold.minor" value="Baronet Reinf. Pack" class="gift_select_option"></label></li>' + '<li><label>Baron Reinf. Pack <input type="checkbox" name="player.box.fbgift.gold.minor" value="Baron Reinf. Pack" class="gift_select_option"></label></li>' + '<li><label>Viscount Reinf. Pack <input type="checkbox" name="player.box.fbgift.gold.minor" value="Viscount Reinf. Pack" class="gift_select_option"></label></li>' + '<li><label>Earl Reinf. Pack <input type="checkbox" name="player.box.fbgift.gold.minor" value="Earl Reinf. Pack" class="gift_select_option"></label></li>' + '<li><label>Marquis Reinf. Pack <input type="checkbox" name="player.box.fbgift.gold.minor" value="Marquis Reinf. Pack" class="gift_select_option"></label></li>' + '<li><label>Duke Reinf. Pack <input type="checkbox" name="player.box.fbgift.gold.minor" value="Duke Reinf. Pack" class="gift_select_option"></label></li>' + '<li><label>Furstin Reinf. Pack <input type="checkbox" name="player.box.fbgift.gold.minor" value="Furstin Reinf. Pack" class="gift_select_option"></label></li>' + '<li><label>Prinzessin Reinf. Pack <input type="checkbox" name="player.box.fbgift.gold.minor" value="Prinzessin Reinf. Pack" class="gift_select_option"></label></li>' + '</ul>' + '<ul id="items">' + '<li><legend><b>Items</b></legend> <a href="#" id="all_items">[check all items]</a></li>' + '<li><label>Minor EXP. Pack <input type="checkbox" name="player.box.fbgift.gold.minor" value="Minor EXP. Pack" class="gift_select_option"></label></li>' + '<li><label>Minor Speaker Pack <input type="checkbox" name="player.box.fbgift.gold.minor" value="Minor Speaker Pack" class="gift_select_option"></label></li>' + '<li><label>Minor Lumbering Pack <input type="checkbox" name="player.box.fbgift.gold.minor" value="Minor Lumbering Pack" class="gift_select_option"></label></li>' + '<li><label>Minor Speedup Pack <input type="checkbox" name="player.box.fbgift.gold.minor" value="Minor Speedup Pack" class="gift_select_option"></label></li>' + '<li><label>Minor Mining Pack <input type="checkbox" name="player.box.fbgift.gold.minor" value="Minor Mining Pack" class="gift_select_option"></label></li>' + '<li><label>Minor Farming Pack <input type="checkbox" name="player.box.fbgift.gold.minor" value="Minor Farming Pack" class="gift_select_option"></label></li>' + '<li><label>Lesser Speaker Pack <input type="checkbox" name="player.box.fbgift.gold.minor" value="Lesser Speaker Pack" class="gift_select_option"></label></li>' + '<li><label>Minor Hero Pack <input type="checkbox" name="player.box.fbgift.gold.minor" value="Minor Hero Pack" class="gift_select_option"></label></li>' + '<li><label>Minor Merchant Pack <input type="checkbox" name="player.box.fbgift.gold.minor" value="Minor Merchant Pack" class="gift_select_option"></label></li>' + '<li><label>Minor Redistribution Pack <input type="checkbox" name="player.box.fbgift.gold.minor" value="Minor Redistribution Pack" class="gift_select_option"></label></li>' + '</ul>' + '</div>');

    $('#option_link').on('click', function () {
        $('#options_panel').slideToggle();
        return false;
    });

    $('#all_res').on('click', function () {
        $('#resources input').attr('checked', true);
        return false;
    });

    $('#all_troop').on('click', function () {
        $('#troops input').attr('checked', true);
        return false;
    });

    $('#all_items').on('click', function () {
        $('#items input').attr('checked', true);
        return false;
    });

    $('#options_panel .gift_select_option').attr('checked', true);

    $('#giftstartbutton').on('click', function () {

        var accepted = 0;


        if($("input.gift_select_option:checked").length) {

            var gift = [];
            $("input.gift_select_option:checked").each(function () {
                gift.push($(this).val());
            });

            $.each(gift, function (index, value) {
                $('#confirm_372268249833 .requestStatus').each(function (index) {

                    if(accepted < 20 && $(this).text().indexOf(value) > -1) {

                        var req_id = $(this).find("form input[name='request_ids']").val();
                        var url = 'https://www.evony.com/facebook/index.php?fb_source=request&request_ids=' + req_id;

                        setTimeout(function () {
                            $('#confirm_372268249833 .requestStatus').eq(index).fadeOut();
                            var win = window.open(url, true);

                        }, accepted * 10000);
                        accepted++;
                    }
                });
            });

        }


        return false;
    });

}

function accept() {
    var i = $(".prompt input[name='i']").val();
    var u = $(".prompt input[name='u']").val();
    var n = $(".prompt input[name='n']").val();
    var g = $(".prompt input[name='g']").val();
    var f = $(".prompt input[name='f']").val();
    var mk = $(".prompt input[name='mk']").val();
    var server = $(".prompt select[name='server']").val();

    if(server) {
        $('#theme').hide();
        $('<iframe />');
        $('<iframe />', {
            name: 'frame1',
            id: 'frame1',
            style: 'width:100%; height:800px; border:none;',
            src: 'https://www.evony.com/facebook/facebook.GiftServerSelected.php?i=' + i + '&u=' + u + '&n=' + n + '&g=' + g + '&f=' + f + '&mk=' + mk + '&server=' + server + '&subtype=Confirm%21'
        }).appendTo('body');

    }
}




if(location.hostname == 'www.facebook.com') {
    main();
} else if(location.hostname == 'www.evony.com') {
    accept();
}