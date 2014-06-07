// ==UserScript==
// @name        Grepolis Bauerndorf Alarm by Kapsonfire
// @namespace   Grepolis
// @include     http://de*.grepolis.com/game/*
// @version     1.01
// @grant       none
// ==/UserScript==

var w = typeof unsafeWindow == 'object' ? unsafeWindow : window, $ = w.$;
var $kapsonfire_div = null;
var oldfarmcount = 0;
var oldTitle = '';
var available_farms = [];
function openfarms() {
    if (available_farms.length == 0)
        return;
    if (!hasCaptain()) {
        error('Du ben\xf6tigst den Kapit\xe4n')
    } else {
        FarmTownOverviewWindowFactory.openFarmTownOverview()
    }
}
function loadFarms() {
    var tmp = [];
    if (oldTitle == '') {
        oldTitle = document.title
    }
    var farmcount = 0;
    var farmsavailable = 0;
    $('.farmtown_owned').each(function (index) {
        farmcount++;
        if ($('.res_available.not', this).length == 0) {
            farmsavailable++;
            tmp.push($(this).attr('id'))
        }
    });
    $('#kaps-farmlink').text('D\xf6rfer: ' + farmsavailable + '/' + farmcount);
    available_farms = tmp;
    if (farmsavailable > 0) {
        if (farmsavailable > oldfarmcount) {
            notify('Bauernd\xf6rfer verf\xfcgbar!')
        }
        if (document.title == 'Bauernd\xf6rfer verf\xfcgbar!') {
            document.title = oldTitle
        } else {
            oldTitle = document.title;
            document.title = 'Bauernd\xf6rfer verf\xfcgbar!'
        }
    } else {
        if (document.title == 'Bauernd\xf6rfer verf\xfcgbar!') {
            document.title = oldTitle
        } else {
            oldTitle = document.title
        }
    }
    oldfarmcount = farmsavailable
}
function error(text) {
    HumanMessage.display(text, 'human_message_error')
}
function notify(text) {
    HumanMessage.display(text, 'human_message_success')
}
function hasCurator() {
    if ($('.advisor.curator').hasClass('passive'))
        return false;
    return true
}
function hasCaptain() {
    if ($('.advisor.captain').hasClass('passive'))
        return false;
    return true
}
function redesign() {
}
function createPluginBar() {
    var $leftbuttondiv = $('<div/>');
    $leftbuttondiv.addClass('kaps-leftbutton');
    $leftbuttondiv.attr('style', 'background: url(\'http://de.cdn.grepolis.com/images/game/layout/main_menu/main_menu_2.44_compressed.png\') no-repeat scroll -238px -1px transparent;' + 'width: 24px;height: 35px;position:fixed;top:65px;left:230px;z-index:5');
    $('body').append($leftbuttondiv);
    var $window = $('<div/>');
    $window.addClass('kaps-window');
    $window.attr('style', 'background: url(\'http://de.cdn.grepolis.com/images/game/layout/main_menu/main_menu_2.44_compressed.png\') repeat-x scroll 0px -973px rgba(0,0,0,0.6);' + 'height: 35px;position:fixed;left:25px;top:65px;left:253px;right:253px;z-index:5');
    $('body').append($window);
    $kapsonfire_div = $window;
    var $rightbuttondiv = $('<div/>');
    $rightbuttondiv.addClass('kaps-leftbutton');
    $rightbuttondiv.attr('style', 'background: url(\'http://de.cdn.grepolis.com/images/game/layout/main_menu/main_menu_2.44_compressed.png\') no-repeat scroll -263px -1px transparent;' + 'width: 24px;height: 35px;position:fixed;top:65px;right:230px;z-index:5;');
    $('body').append($rightbuttondiv);
    var copylink = $('<div/>');
    copylink.attr('id', 'kaps-copyright');
    copylink.attr('style', 'background: url(\'http://de.cdn.grepolis.com/images/game/layout/gpwindow_corners.png\') repeat-x scroll 0px -554px;' + 'float:left;margin-top:5px;height:27px;border-left:1px solid #E8A529;border-right:1px solid #E8A529;margin-right:1px;' + 'line-height:27px;text-align: left;color: rgb(238, 221, 187);font-size: 11px;font-weight: 700;padding-left:5px;padding-right:5px;cursor:pointer;');
    copylink.html('&copy; kapsonfire.de');
    copylink.click(function (e) {
        window.open('http://www.kapsonfire.de', '_blank')
    });
    $kapsonfire_div.append(copylink);
    var farmlink = $('<div/>');
    farmlink.attr('id', 'kaps-farmlink');
    farmlink.attr('style', 'background: url(\'http://de.cdn.grepolis.com/images/game/layout/gpwindow_corners.png\') repeat-x scroll 0px -554px;' + 'float:left;margin-top:5px;height:27px;border-left:1px solid #E8A529;border-right:1px solid #E8A529;margin-right:1px;' + 'line-height:27px;text-align: left;color: rgb(238, 221, 187);font-size: 11px;font-weight: 700;padding-left:5px;padding-right:5px;cursor:pointer;');
    farmlink.text('D\xf6rfer: 0/0');
    farmlink.click(openfarms);
    $kapsonfire_div.append(farmlink)
}
$(function () {
    $(document).ready(function () {
        createPluginBar();
        window.setInterval(loadFarms, 1000);
        redesign()
    })
})