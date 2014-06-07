// ==UserScript==
// @name        tw-quickbar
// @namespace   ILLEGAL
// @author      RZ, rvnzph, raven.zephyr@gmail.com
// @description Script that creates a premium-like quickbar with the things you need the most.
// @include     http://*.triburile.ro/*
// @include     http://*.tribalwars.net/*
// @version     1.0
// ==/UserScript==

 /*
README
TRIBAL WARS QUICK BAR
    - ABOUT: This script is illegal, because it emulates a premium feature.
                Although it is illegal, I hardly believe that it is detectable.
                Use at your own risk.

    - INFO: It adds the most used buildings in the game for quick access.
                Basically, the script reduces by 1 or 2 the number of clicks
                you must make in order to go to a certain building.

    - SETUP: In the 'Main menu' select 'Settings' tab
                and then go to the 'Settings' submenu.
                There, set the 'Window width' option to 974.

    - TESTED: The script works with no problem in Mozilla Firefox
                and Google Chrome. I have not tested it on Opera.
                As for Internet Explorer, I suggest you change your
                web browser.

    - CHANGELOG: v1.0 - stable
 */

var quickbar=
    '<br><ul id="tw-quickbar">' +
        '<li name="/game.php?screen=overview">' +
            '<img src="/graphic/map_center.png">' +
            '<div>Overview</div>' +
        '</li>' +
        '<li name="/game.php?screen=main">' +
            '<img src="/graphic/buildings/main.png">' +
            '<div>Village Headquarters</div>' +
        '</li>' +
        '<li name="/game.php?screen=train">' +
            '<img src="/graphic/buildings/barracks.png">' +
            '<div>Recruit</div>' +
        '</li>' +
        '<li name="/game.php?screen=place">' +
            '<img src="/graphic/buildings/place.png">' +
            '<div>Rally Point</div>' +
            '<ul>' +
                '<li name="/game.php?screen=place&mode=sim" rowspan="1">' +
                    '<div>' +
                        '<img src="/graphic/big_buildings/place1.png">' +
                        '&nbsp;&nbsp;Simulator' +
                    '</div>' +
                '</li>' +
                '<li name="/game.php?screen=place&mode=units" rowspan="1">' +
                    '<div>' +
                        '<img src="/graphic/unit/unit_spear.png">' +
                        '&nbsp;&nbsp;Units' +
                    '</div>' +
                '</li>' +
            '</ul>' +
        '</li>' +
        '<li name="/game.php?screen=market">' +
            '<img src="/graphic/buildings/market.png">' +
            '<div>Market</div>' +
        '</li>' +
        '<li name="/game.php?screen=smith">' +
            '<img src="/graphic/buildings/smith.png">' +
            '<div>Smithy</div>' +
        '</li>' +
        '<li name="/game.php?screen=snob">' +
            '<img src="/graphic/buildings/snob.png">' +
            '<div>Academy</div>' +
        '</li>' +
    '</ul><br><br><br>';

$('.maincell').prepend(quickbar);

$('#tw-quickbar').css({
    'margin':'0px',
    'padding':'0px',
    'position':'fixed',
    'list-style':'none',
    'display':'inline-table',
    'z-index':'1'
});
$('#tw-quickbar li').css({
    'background-color':'#DDC080',
    'border-color':'#962911',
    'border-width':'1px',
    'border-radius':'10px',
    'border-style':'solid',
    'text-align':'center'
});
$('#tw-quickbar >li').css({
    'width':'130px',
    'height':'50px',
    'display':'table-cell',
    'vertical-align':'middle'
});

$('#tw-quickbar ul').css({
    'margin':'-1px',
    'padding':'0px',
    'top':'53px',
    'position':'absolute',
    'display':'none',
    'list-style':'none'
});
$('#tw-quickbar ul>li').css({
    'width':'130px',
    'height':'30px',
    'display':'block'
});

$('#tw-quickbar div').css({
    'font-family':'verdana',
    'font-weight':'bold',
    'font-size':'12px',
    'color':'#962911'
});
$('#tw-quickbar img').css({
    'width':'18px',
    'height':'18px'
});

$('#tw-quickbar li').hover(function(){
        $(this).css({
            'cursor':'pointer',
            'border-color':'#DDC080',
            'background-color':'#962911'
        }).find('ul').show();
        $('>div',this).css('color','#DDC080');
},
function(){
    $(this).css({
        'cursor':'default',
        'border-color':'#962911',
        'background-color':'#DDC080'
    }).find('ul').hide();
    $('>div',this).css('color','#962911');
});

$('#tw-quickbar li').click(function(){
    if($(this).find('li').length>0) return;
    window.location=$(this).attr('name');
});
