// ==UserScript==
// @name         The Next Reddit Helper
// @namespace    danneh_tnr
// @description  Helps The Next Reddit style
// @include      *.reddit.com/*
// @version      8
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==

// https://www.reddit.com/r/Design/comments/wkskp/the_next_reddit_userstyle/


// allows this to work as both a greasemonkey script and babelext
function BE_setValue(key, val, callback) {
    if (typeof(BabelExt) != 'undefined') {
        BabelExt.storage.set(key, val, callback);
    } else {
        GM_setValue(key, val);
        callback.call();
    }
}
function BE_getValue(key, def, callback) {
    if (typeof(BabelExt) != 'undefined') {
        BabelExt.storage.get(key, callback);
    } else {
        callback.call(this, GM_getValue(key, def));
    }
}


// add the Open Sans font files via Google Web Fonts
$('<link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Open%20Sans:n,b,bi,i">').prependTo($('head'));

// the new reddit style block, for dynamic styles
var style = document.createElement('style');
style.type = 'text/css';

var style_css = "";

function addGlobalStyle_direct(css) {
    style_css += "\n" + css;
}

function addGlobalStyle(name, css) {
    style_css += "\n";
    style_css += name + " {\n";
    style_css += "    " + css + "\n";
    style_css += "}";
}

function parseGlobalStyle() {
    var head;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    head.appendChild(style);
}
function updateGlobalStyle() {
    style.innerHTML = "/* The Next Reddit css */" + style_css;
}

updateGlobalStyle();
parseGlobalStyle();


// tnr body classes, for tnr-specific css hacks
$('body').addClass('tnr');
$('body').addClass('tnr-collapsed');


// add a css class containing the current subreddit name, for custom css files to use
//  I'm thinking maybe an easy way to have a third-party stylish file, with a bunch of subreddit-specific rules in a single css file
var subreddit = window.location.pathname.split('/');
if ((subreddit.length > 2) && (subreddit[1] == 'r')) {
    $('body').addClass('tnr-r-'+subreddit[2]);
}


// autogenerate the collapsed header offsets, and regenerate once the header image is loaded properly (if needed)
function generate_header_offsets()
{
    // auto my reddits horisontal offset
    var rt = $('#header-img').offset().left + $('#header-img').outerWidth() + 20;
    if (($('body').outerWidth() / 2) < rt) {
        rt = $('body').outerWidth() / 2;
    }
    $('#sr-header-area').offset({ left: rt }).css('left', rt + ' !important');

    // auto my reddits vertical offset
    var num = function (value) { /* jsizes */
        return parseInt(value, 10) || 0;
    };
    //var logo_ht = $('#header-img').offset().top + $('#header-img').outerHeight() - num($('#header-img').css("margin-bottom"));
    var header_ht = $('#header-bottom-left').offset().top + $('#header-bottom-left').outerHeight() - num($('#header-bottom-left').css("padding-bottom"));
    var this_ht = $('#sr-header-area').outerHeight() + $('.sr-list').outerHeight() - num($('.sr-list').css("padding-bottom")) - 1;
    var ht = header_ht - this_ht;
    $('#sr-header-area').offset({ top: ht }).css('top', ht + ' !important');

    // fix misaligned arrow bar, when header is different height
    var tabmenu_ht = $('#header-bottom-right').offset()['top'];
    $('.tabmenu').offset({ top: tabmenu_ht });

    // fix content margin-padding
    /*var ht = num($('.content').css("margin-top"))
    var total_ht = ht + num($('.content').css("padding-top"));
    if (ht != 0) {
        $('.content').css("margin-top", "0 !important");
        $('.content').css("padding-top", total_ht + " !important");
    }*/
}

generate_header_offsets();
$('#header-img').load(generate_header_offsets);


// Add required buttons and extra divs
$('<div id="tnr_listview"><span>list view</span></div>').prependTo('#header');  // button to activate list view
$('<a id="tnr_logo" href="/"></a>').prependTo('#sr-header-area');  // logo in the list view
$('<div id="tnr_collapsedview"><span>collapsed view</span></div>').appendTo('#sr-header-area');  // button to activate collapsed view

$('body').prepend('<div id="header-bottom-left-background"></div>');  // background for the list view list
$('#tnr_listview').css('height', $('#header-bottom-left').outerHeight());
$('#tnr_listview span').css('margin-top', $('.sr-list').offset().top);


// Activate list view, if option is set
BE_getValue("listStyleActive", false, function (val) {
    if (val) {
        $('#tnr_listview').hide();
        listStyleActivate();
    }
});


// Click handlers, animation and all that fun stuff
$(document).on('click', '#tnr_listview', function(event) {
    $('#tnr_listview').slideUp(250);
    $('#tnr_collapsedview').slideDown(250);

    $('#sr-header-area').slideUp(250);
    $('#sr-header-area .dropdown').slideUp(250);
    $('#sr-header-area .sr-list').slideUp(250);
    $('#tnr_listview').slideUp(250, function () {
        $('#header-bottom-left-background').animate({width: 163}, 250);
        $('#header-bottom-left').animate({'margin-left': 163}, 250);
        $('#header-bottom-left .tabmenu').animate({'margin-left': (163-8), 'top': 0}, 250);
        $('body > .content').animate({'margin-left': 163}, 250);
        //$('#header').animate({'background-color': '#ffffff'}, 250);
        $('.footer-parent').animate({'margin-left': 163}, 250, function () {
            listStyleActivate();

            $('#sr-header-area').slideDown(250);
            $('#sr-header-area .dropdown').slideDown(250);
            $('#sr-header-area .sr-list').slideDown(250);
        });
    });
});

$(document).on('click', '#tnr_collapsedview', function(event) {
    $('#tnr_collapsedview').slideUp(250);
    $('#tnr_listview').slideDown(250);

    $('#sr-header-area').slideUp(250);
    $('#sr-header-area .dropdown').slideUp(250);
    $('#sr-header-area .sr-list').slideUp(250);
    $('#tnr_collapsedview').slideUp(250, function () {
        $('#header-bottom-left-background').animate({width: 0}, 250);
        $('#header-bottom-left').animate({'margin-left': 0}, 250);
        //$('#header-bottom-left .tabmenu').animate({'margin-left': 0, 'top': tabmenu_ht}, 250);
        $('#header-bottom-left .tabmenu').animate({'margin-left': 0}, 250);
        $('body > .content').animate({'margin-left': 0}, 250);
        //$('#header').animate({'background-color': '#ffffff'}, 250);
        $('.footer-parent').animate({'margin-left': 0}, 250, function () {
            listStyleDeactivate();

            $('#sr-header-area').slideDown(250);
            $('#sr-header-area .dropdown').slideDown(250);
            $('#sr-header-area .sr-list').slideDown(250);
            $('#tnr_listview').slideDown(250);
        });
    });
});


// Plain ole' activate style functions, no animation
function listStyleActivate()
{
    BE_setValue("listStyleActive", true, function () {
        $('body').removeClass('tnr-collapsed');
        $('body').addClass('tnr-list');

        $('.tabmenu').offset({ top: 0 }).css('top', '0 !important');

        //$('body').prepend($('.tabmenu'));
        //$('body').prepend($('#header-bottom-left'));
        $('body').prepend($('#sr-header-area'));

        if (style_css.indexOf(".tnr-list #tnr-list-generated") == -1) {
            addGlobalStyle(".tnr-list #tnr-list-generated", "/* this just makes sure we don't include css twice */");

            addGlobalStyle('.tnr-list #header-bottom-left-background', 'width: ' + 163 + 'px;');
            //addGlobalStyle('.tnr-list #sr-header-area li a', 'max-width: ' + ($('#header-bottom-left').outerWidth() - 30) + 'px !important;');

            addGlobalStyle('.tnr-list #header-bottom-left-background', 'width: 163px;');

            addGlobalStyle(".tnr-list #sr-header-area li a", "max-width: " + (163-30) + "px;");
            addGlobalStyle(".tnr-list > .content, .tnr-list .footer-parent, .tnr-list #header-bottom-left", "margin-left: 163px !important;");
            addGlobalStyle(".tnr-list .tabmenu", "margin-left: " + (163-8) + "px !important;");

            addGlobalStyle_direct(".tnr-list #sr-header-area {");
            addGlobalStyle_direct("    top: 0px !important;");
            addGlobalStyle_direct("    width: 163px;");
            addGlobalStyle_direct("}");

            updateGlobalStyle();
        }

        /*$('#tnr_listview').slideUp(100);
        $('#tnr_collapsedview').slideDown(100);*/
    });
}

function listStyleDeactivate()
{
    BE_setValue("listStyleActive", false, function () {
        $('body').addClass('tnr-collapsed');
        $('body').removeClass('tnr-list');

        //$('.tabmenu').offset({ top: tabmenu_ht }).css('top', tabmenu_ht + ' !important');

        $('#header-bottom-left').append($('.tabmenu'));
        $('#header-bottom-right').before($('#header-bottom-left'));
        $('#header-bottom-left').before($('#sr-header-area'));
        //$('#header-bottom-left-background').hide();

        /*$('#tnr_collapsedview').slideUp(100);
        $('#tnr_listview').slideDown(100);*/
    });
}


// Helps list view subreddit buttons
$(document).on('click', '.tnr-list .sr-list li', function () {
    window.location = $('a', this).attr('href');
});


// Displays new style download link, if the css file for this script version is not installed
//  works by the width of a useless div, set in the css file
$('body').append('<div id="tnr-version" style="display: none;"></div>'); // version div

var script_css = 1;
var current_css = parseInt($('#tnr-version').css('width').slice(0, -2), 10);

if (script_css > current_css) {
    notify_sync('Style file is old, click here to update', 'http://userstyles.org/styles/69164/reddit-redesigned');
}
else if (current_css > script_css) {
    notify_sync('Script file is old, click here to update', 'https://userscripts.org/scripts/show/138273');
}

function notify_sync(message, url)
{
    $('<a id="tnr-update"></a>').text(message).attr('href', url).appendTo($('body'));
}
