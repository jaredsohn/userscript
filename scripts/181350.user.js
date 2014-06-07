// ==UserScript==
// @name        deviantART Filter
// @author      Ryan Thaut
// @description 
// @namespace   http://userscripts.org/users/49075
// @include     http://*deviantart.com/*
// @version     1.3
// @grant       GM_addStyle
// @grant       GM_getValue
// @grant       GM_setValue
// @require     http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

var hiddenUsers = JSON.parse(GM_getValue('hiddenUsers', '[]'));
$(document).ready(init);

function init() {
    GM_addStyle(getCSS());
    insertManageLink();
    processDeviations();
}

function processDeviations() {
	$('.browse-container').unbind('DOMNodeInserted', processDeviations);
    hideDeviations();
	insertDeviationLinks();
    $('.browse-container').bind('DOMNodeInserted', processDeviations);
}

function insertManageLink() {
    var manageLink = $('<a/>')
        .html('Manage Hidden Users')
        .addClass('browse-link-button manage-users-trigger')
        .on('click', manageUsers);

    $('.right-buttons', '.browse-top-bar').prepend(manageLink);
    $('.right-buttons', '.browse-top-bar').css('max-width', $('.right-buttons', '.browse-top-bar').width() + manageLink.width());
}

function hideDeviations() {
    for (var i = 0; i < hiddenUsers.length; i++) {

        // legacy support from prior to storing users as objects
        if(typeof hiddenUsers[i] !== 'object') {
            hiddenUsers[i] = {
                userid:     hiddenUsers[i]
            };
        }

        if (typeof hiddenUsers[i].userid !== 'undefined') {
            $('.browse-container').find('div.tt-a[userid="' + hiddenUsers[i].userid +' "]').addClass('user-hidden');
            if (typeof hiddenUsers[i].username === 'undefined') {
                hiddenUsers[i].username = $('.browse-container').find('div.tt-a[userid="' + hiddenUsers[i].userid + '"]').attr('username');
            }
        }

        if (typeof hiddenUsers[i].username !== 'undefined' ) {
            $('.browse-container').find('div.tt-a[username="' + hiddenUsers[i].username + '"]').addClass('user-hidden');
            if (typeof hiddenUsers[i].userid === 'undefined') {
                hiddenUsers[i].userid = $('.browse-container').find('div.tt-a[username="' + hiddenUsers[i].username + '"]').attr('userid');
            }
        }
    }

    GM_setValue('hiddenUsers', JSON.stringify(hiddenUsers));

    if (!GM_getValue('placeholders', true)) {
        $('body').addClass('no-placeholders');
    }
}

function insertDeviationLinks() {
    $('.browse-container .tt-a[processed!="yes"]').each(function() {
        var userID = $(this).attr('userid');
        var userName = $(this).attr('userName');

        if (!(userID === null && userName === null)) {
            var toggleLink = $('<a/>')
                .addClass('user-toggle')
                .attr('href', 'http://' + userName + '.deviantart.com/')
                .on('click', toggleUser);

            if ($(this).hasClass('user-hidden')) {
                toggleLink.html('<span class="user-toggle-text">Show User\'s Deviations</span>');
            } else {
                toggleLink.html('<span class="user-toggle-text">Hide User\'s Deviations</span>');
            }

            $(this).find('.details').append(toggleLink);
        }

        $(this).attr('processed', 'yes');
    });
}

function toggleUser(e) {
    e.preventDefault();
    var container = $(this).parents('div.tt-a');
    var userID = container.attr('userid');
    var userName = container.attr('username');

    if (container.hasClass('user-hidden')) {
        showUser(userID, userName);
    } else {
        hideUser(userID, userName);
    }
}

function manageUsers() {
    var form = $('<form/>')
        .addClass('manage-users-settings');

    var fieldset = $('<fieldset/>')
        .appendTo(form);

    var legend = $('<legend/>')
        .html('Settings')
        .appendTo(fieldset);

    var input = $('<input/>')
        .attr('type', 'checkbox')
        .attr('id', 'placeholders')
        .attr('name', 'placeholders')
        .attr('checked', GM_getValue('placeholders', true))
        .on('change', function() {
            GM_setValue('placeholders', !GM_getValue('placeholders', true));
            $('body').toggleClass('no-placeholders');
        })
        .appendTo(fieldset);

    var label = $('<label/>')
        .attr('for', input.attr('id'))
        .html(' Use placeholders for hidden deviations')
        .append('<br/><small>(Disabling this will hide deviations completely)</small>')
        .insertAfter(input);

    var table = $('<table/>')
        .addClass('manage-users-table')
        .append('<tr><th>Username</th><th>User ID</th><th>Unhide User</th></tr>')

    for (var i = 0; i < hiddenUsers.length; i++) {
        var row = $('<tr/>');

        // username column/link
        if (typeof hiddenUsers[i].username !== 'undefined') {
            row.append('<td><a class="external" href="http://' + hiddenUsers[i].username + '.deviantart.com/" target="_blank">' + hiddenUsers[i].username + '</a></td>');
        } else {
            row.append('<td>---</td>');
        }

        // userid column
        if (typeof hiddenUsers[i].userid !== 'undefined') {
            row.append('<td>' + hiddenUsers[i].userid + '</td>');
        } else {
            row.append('<td>---</td>');
        }

        // unhide user column/link
        row.append('<td><a class="unhide-user-link" userid="' + hiddenUsers[i].userid + '" username="' + hiddenUsers[i].username + '">Unhide User</a></td>');
        table.append(row);
    }

    var content = $('<div/>')
        .append(form)
        .append(table)
        .daModal({title: 'Manage Hidden Users', width: '600px', height: '600px'});

    $('.unhide-user-link').on('click', function() {
        showUser($(this).attr('userid'), $(this).attr('username'));
        $(this).parents('tr').hide().remove();
    });
}

function hideUser(userID, userName) {
    userID = (typeof userID === 'undefined') ? null : userID;
    userName = (typeof userName === 'undefined') ? null : userName;
    if (userID === null && userName === null)
        return false;

    hiddenUsers.push({
        userid:     userID,
        username:   userName
    });

    if (userID !== null) {
        var deviations = $('.browse-container').find('div.tt-a[userid="' + userID + '"]')
            .addClass('user-hidden')
            .find('span.user-toggle-text').html('Show User\'s Deviations');
    }

    if (userName !== null) {
        var deviations = $('.browse-container').find('div.tt-a[username="' + userName + '"]')
            .addClass('user-hidden')
            .find('span.user-toggle-text').html('Show User\'s Deviations');
    }

    GM_setValue('hiddenUsers', JSON.stringify(hiddenUsers));
}

function showUser(userID, userName) {
    userID = (typeof userID === 'undefined') ? null : userID;
    userName = (typeof userName === 'undefined') ? null : userName;
    if (userID === null && userName === null)
        return false;

    for (var i = 0; i < hiddenUsers.length; i++) {
        if (userID !== null && hiddenUsers[i].userid === userID) {
            hiddenUsers.splice(i, 1);
        } else if (userName !== null || hiddenUsers[i].username === userName) {
            hiddenUsers.splice(i, 1);
        }
    }

    if (userID !== null) {
        var deviations = $('.browse-container').find('div.tt-a[userid="' + userID + '"]')
            .removeClass('user-hidden')
            .find('span.user-toggle-text').html('Hide User\'s Deviations');
    }

    if (userName !== null) {
        var deviations = $('.browse-container').find('div.tt-a[username="' + userName + '"]')
            .removeClass('user-hidden')
            .find('span.user-toggle-text').html('Hide User\'s Deviations');
    }

    GM_setValue('hiddenUsers', JSON.stringify(hiddenUsers));
}

function getCSS() {
    var css = '';

    css += '.manage-users-trigger { cursor: pointer; text-align: center; position: absolute; left: 150px; top: 2px; }';

    css += '.manage-users-settings { margin-bottom: 1em !important; }';
    css += '.manage-users-settings fieldset { border: 1px solid #8C9A88; }';
    css += '.manage-users-settings legend { font: bold 1.333em Trebuchet MS, sans-serif; padding: 0 6px; }';
    css += '.manage-users-settings label { line-height: 1.5em; vertical-align: top; }';
    css += '.manage-users-settings label small { color: #3B5A4A; }';

    css += '.manage-users-table { border-collapse: collapse; margin: 0 auto 1em !important; width: 100%; }';
    css += '.manage-users-table tr { border-bottom: 1px solid rgba(0, 0, 0, 0.15); }';
    css += '.manage-users-table tr:nth-child(2n) { background-color: rgba(255, 255, 255, 0.35); }';
    css += '.manage-users-table td { padding: 4px; text-align: left; }';
    css += '.manage-users-table th { border-bottom: 1px solid #8C9A88; padding: 4px; text-align: left; }';

    css += '.unhide-user-link { color: #A71919 !important; cursor: pointer; }';

    css += '.user-hidden .thumb { background: #DDE6DA url("http://st.deviantart.net/misc/noentry-green.png") no-repeat center center !important; }';
    css += '.user-hidden .thumb > * { visibility: hidden !important }';

    css += '.no-placeholders .user-hidden { display: none !important; }';

    return css;
}


/**
 * Simple deviantART Modal Plugin
 * @author Ryan Thaut
 */
(function ($) {
    $.fn.daModal = function(options) {
        return $.daModal.init(this, options);
    }

    $.daModal = {
        defaults: {
            title:  '',
            width:  '50%',
            height: '50%',
        },
        
        objects: {
            overlay: null,
            modal: null,
        },
        
        init: function(elem, options) {
            $.daModal.create(elem, options);
            $.daModal.open();
            return elem;
        },

        create: function(elem, options) {
            var settings = $.extend({}, $.daModal.defaults, options);
    
            var modal = $('<div/>')
                .addClass('modal modal-rounded with-shadow')
                .css({
                    display:        'none',
                    position:       'fixed',
                    width:          settings.width,
                    height:         settings.height,
                    left:           'calc((100% - ' + settings.width + ') / 2)',
                    top:            'calc((100% - ' + settings.height + ') / 2)',
                    zIndex:         200,
                })
                .appendTo('body');
            $.daModal.objects.modal = modal;

            var close = $('<a/>')
                .addClass('x')
                .on('click', this.close)
                .appendTo(modal);
    
            var title = $('<h2/>')
                .html(settings.title)
                .appendTo(modal);
    
            var content = $('<div/>')
                .addClass('daModal-content')
                .attr('id', 'modal-content')
                .css({
                    overflow:       'auto',
                    padding:        '0 15px 15px',
                    height:         'calc(100% - 56px - 70px)', // 56px: header; 70px: footer (buttons)
                    width:          'calc(100% - 30px)',        // 30px: horizontal padding
                })
                .appendTo(modal)
                .append(elem);

            var footer = $('<div/>')
                .css({
                    borderTop:      '1px solid #AAB5AB',
                    boxShadow:      '0 1px 0 rgba(255, 255, 255, 0.75) inset',
                    height:         '50px',
                    margin:         '0 15px',
                    textAlign:      'right',
                })
                .appendTo(modal);

            var credit = $('<small/>')
                .css({
                    float:          'left',
                    lineHeight:     '50px',
                })
                .html('"<a href="http://userscripts.org/scripts/show/181350">deviantART Filter</a>" script by <a href="http://rthaut.deviantart.com/">rthaut</a>, idea from <a href="http://lassekongo83.deviantart.com/">lassekongo83</a>')
                .appendTo(footer);

            var done = $('<a/>')
                .addClass('smbutton smbutton-lightgreen smbutton-size-large smbutton-shadow')
                .html('Done')
                .on('click', this.close)
                .appendTo(footer);

            var overlay = $('<div/>')
                .attr('id', 'modalfade')
                .on('click', this.close)
                .appendTo('body');
            $.daModal.objects.overlay = overlay;

            return elem;
        },

        open: function() {
            $.daModal.objects.overlay.show();
            $.daModal.objects.modal.show();
        },

        close: function() {
            $.daModal.objects.modal.hide().remove();
            $.daModal.objects.overlay.hide().remove();
        }
    };
}(jQuery));