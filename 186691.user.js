// ==UserScript==
// @name        hideBahaGuildAnnouncement
// @namespace   http://mmis1000.byethost31.com/
// @include     /^https?://guild\.gamer\.com\.tw/guild\.php\?sn=\d+(#.+)?$/
// @version     1.1
// @grant       GM_getValue
// @grant       GM_setValue
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @require     http://userscripts.org/scripts/source/186910.user.js#3
// ==/UserScript==
$.noConflict();
(function($){

    var format = /^http:\/\/guild\.gamer\.com\.tw\/guild\.php\?sn=(\d+)(#.+)?$/g;
    var result = format.exec(window.location.href);
    var guildId = result[1];
    var settingName = 'autohide_' + guildId;
    var shouldAutoHide = GM_getValue(settingName, true);

    var testmenu = new mmis1000_BahaMenu($);
    testmenu.addFullTextBar('隱藏公會公告(At Id : "' + guildId + '")');
    var checkbox = testmenu.addCheckbox('自動隱藏');
    testmenu.addLine();

    $('.GU-lbox2A').attr('id', 'contentBoard');
    $('.MSG-box1').attr('id', 'topMessage');
    $('h4').attr('id', 'contentTitle');
    
    $('#contentTitle').html($('h4').html() + '[按我切換]');
    
    checkbox.attr('checked', shouldAutoHide).change(function(event) {
        GM_setValue(settingName, $(this).is(':checked'))
    });
    
    $('h4').click(function(event){
        if($(event.target).attr('id') == 'contentTitle') {
            $('.GU-lbox2A').slideToggle();
        }
    });
    $('.GU-lbox2A').click(function(event){
        if($(event.target).attr('id') == 'contentBoard' ||
            $(event.target).is("div") ||
            $(event.target).is("td")) {
            $('.GU-lbox2A').slideToggle(500, function(){
                $(document).scrollTop(0);
            });
        }
    });
    
    if(shouldAutoHide) {
        $('.GU-lbox2A').hide();
        $(document).scrollTop(250);
    }
}(jQuery))