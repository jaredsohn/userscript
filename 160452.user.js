// ==UserScript==
// @id             www.galagiveaways.com-e0954a7c-1107-449d-9346-6257ca0f96d5@darkdaskin.tk
// @name           Gala Giveaways filter
// @version        1.0
// @namespace      darkdaskin.tk
// @author         Dark Daskin
// @description    Hides giveaways based on a number of criteria.
// @include        http://www.galagiveaways.com/*
// @run-at         document-end
// @require        http://code.jquery.com/jquery-1.8.3.js
// ==/UserScript==

var settings = {
    maxPrice: 2400,
    maxFeedback: 0,
    feedbackFilter: false,
    gameFilter: true,
    showSteam: true,
    showDesura: true,
    columns: 4
};
var hiddenGiveaways = [];
var $ = window.jQuery;

function applyFilters() {
    if (!settings.showSteam && !isPage('steam'))
        $('.rigasteam').closest('td').remove();
    if (!settings.showDesura && !isPage('desura'))
        $('.rigadesura').closest('td').remove();
    
    $('.riga3').filter(function () { 
            return parseInt($('font strong', this).text().replace(',', '')) > settings.maxPrice
               || settings.feedbackFilter && parseInt((/Min Fb: (\d+)/.exec($('.riga_2', this).text()) || [])[1]) > settings.maxFeedback;
         }).closest('.rigasteam,.rigadesura').closest('td').remove();
    
    if (settings.gameFilter) {
        $('td .rigasteam,.rigadesura').closest('td').filter(function() {
            var appId = getAppId($(this).css('background-image'));
            return appId && hiddenGiveaways.indexOf(appId) > -1;
        }).remove();
    }
    
    var i = 0;
    var items = $('td .rigasteam,.rigadesura').closest('td');
    $('.rigasteam,.rigadesura').closest('tr').each(function () {
        if (items.length == 0)
            $(this).remove();
        else 
            while (i < items.length && $('td .rigasteam,.rigadesura', this).length < settings.columns)
                $(this).append(items[i++]);
    });
}

function makeLabel(title, key) {
    return $('<label>').attr('for', key).css( { 'width': 150, 'float': 'left', 'margin-top': 4 }).text(title);
}

function makeIntegerTextBox(title, key) {
    return $('<p>').css('vertical-align', 'center')
        .append(makeLabel(title, key))
        .append($('<input type=text>').attr('id', key).val(settings[key]).change(function () {
            var value = parseInt($(this).val());
            if (!isNaN(value)) {
                settings[key] = value;
                $(this).css('border-color', '');
            } else {
                $(this).css('border-color', 'red');
            }
        }));
}

function makeCheckBox(title, key) {
    return $('<p>').css('vertical-align', 'center')
        .append(makeLabel(title, key))
        .append($('<input type=checkbox>').attr('id', key).attr('checked', settings[key]).change(function () {
            settings[key] = $(this).is(':checked');
        }));
}

function addOptions() {
    var optionsDiv = $('<div>').append(
        makeIntegerTextBox('Max price:', 'maxPrice'),
        makeCheckBox('Min feedback filter:', 'feedbackFilter'),
        makeCheckBox('Game filter:', 'gameFilter'),
        makeCheckBox('Show Steam games:', 'showSteam'),
        makeCheckBox('Show Desura games:', 'showDesura'),
        makeIntegerTextBox('Number of columns:', 'columns'),
        $('<button>').text('Save').click(function () {
            saveSettings();
            setHomeLink();
        }),
        $('<button>').text('Clear hidden giveaways').click(function () {
            if (confirm('Clear hidden giveaways?')) {
                hiddenGiveaways = [];
                saveHiddenGiveaways();
            }
        }));
    $('.tabella-forum td:last')
        .append('<p class=bold>Script settings:</p>', optionsDiv);
}

function getAppId(src) {
    var match = src.match(/\/(apps|subs)\/(\d+)/);
    if (match) return 's' + match[2];
    
    match = src.match(/\/games\/\d+\/\d+\/(\d+)/);
    if (match) return 'd' + match[1];
    
    return null;
}

function addHideButton() {
    var appId = getAppId($('.tabella-forum:first a img').attr('src'));
    if (!appId) return;
    $('.tabella-forum:first p:last')
        .after($('<p><a href="#"><b><u>Hide all giveaways of this game</p>').click(function () {
            loadHiddenGiveaways();
            hiddenGiveaways.push(appId);
            saveHiddenGiveaways();
            return false;
        }));
}

function setHomeLink() {
    var link = $('.header a[href="/home"]');
    if(settings.showSteam && !settings.showDesura)
        link.attr('href', '/steam');
    if(!settings.showSteam && settings.showDesura)
        link.attr('href', '/desura');
}

function loadSettings() {
    $.extend(settings, JSON.parse(window.localStorage['settings'] || '{}'));
}

function loadHiddenGiveaways() {
    hiddenGiveaways = JSON.parse(window.localStorage['hiddenGiveaways'] || '[]');
}

function saveSettings() {
    window.localStorage['settings'] = JSON.stringify(settings);
}

function saveHiddenGiveaways() {
    window.localStorage['hiddenGiveaways'] = JSON.stringify(hiddenGiveaways);
}

function isPage(path) {
    return new RegExp('^\\/' + path).test(window.location.pathname);
}

loadSettings();
setHomeLink();

if ($('#gameid_search').length) {
    loadHiddenGiveaways();
    applyFilters();
} else if (isPage('GA')) {    
    addHideButton();
} else if (isPage('profile')) {
    addOptions();
    settings.maxFeedback = $('.riga2').text().match(/Feedback received: (\d+)/)[1];    
    saveSettings();
}