// ==UserScript==
// @name        Danbooru Faptime
// @namespace   http://userscripts.org/users/654021
// @description Distraction free gallery with optional slideshow. Designed to be navigated with one hand.
// @include     http://danbooru.donmai.us/posts/*?*
// @version     0.1
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_deleteValue
// @grant       GM_addStyle
// ==/UserScript==

// var GM_getValue = GM_setValue = GM_addStyle = function(){});

var win = window;
var $win = $(win),
    $html = $(document.documentElement),
    $body = $(document.body),
    $imageContainer = $("#image-container"),
    $goldPaymentMessage = $imageContainer.find('a[href="/users/upgrade_information"]'),
    $navLinks = $('#nav-links'),
    $renderTo = $navLinks.find('li.active'),
    $li = $('<li></li>');

var $sliderButton, $sliderTimeoutInput; // defined after app.render

var app = {};
app.hasGoldenPaymentMessage = $goldPaymentMessage.length > 0;
app.baseURL = 'http://danbooru.donmai.us';
app.nextURL = app.baseURL + $('a[rel="next"]').attr('href');
app.prevURL = app.baseURL + $('a[rel="prev"]').attr('href');
app.sliderWorking = GM_getValue('sliderWorking', false);
app.sliderTimeout = GM_getValue('sliderTimeout', 7777);
app.sliderTimer;

app.togglePageScroll = function(){
    $html.css('overflow-y', 'hidden');
};

app.render = function(){
    var html = '';
    html += '<div>Slideshow interval (ms):</div>';
    html += '<input id="sliderTimeoutInput" value="' + app.sliderTimeout + '"><br>';
    html += '<button id="sliderButton">Initializing</button>';
    $li.html(html).insertAfter($renderTo);
};

app.maximizeAndCenter = function() {
    GM_addStyle('\
#image { height: 100%; width: auto; } \
#image-container { position: fixed; left: 0; right: 0; top: 0; bottom: 0; margin: 0 !important; background: rgba(0,0,0,.96); text-align: center; } \
#nav-links { position: fixed !important; bottom: 0; margin: 0 !important; width: 240px; right: 0; background: rgba(255,255,255,.015) !important; color: #ccc; font-size: 10px; border: 0 !important; padding: 10px 0 !important; border-radius: 10px 0 0 0; } \
#nav-links li:hover { background: none !important; } \
#nav-links li { padding: 0 13px !important; } \
');
};

app.handleKeyPress = function(e){
    switch (e.which) {
        case 13: // Enter
            app.toggleSliderButton();
            break;
        case 27: // ESC
            app.togglePage();    
            break;
        case 37: // Left
            app.goToURL(app.prevURL);
            break;
        case 39: // Right
            app.goToURL(app.nextURL);
            break;
    }
};

app.togglePage = function(flag){
    console.log('app.togglePage', flag);
    var flag = flag === undefined ? $imageContainer.is(':visible') : flag;
    $imageContainer.toggle(!flag);
    $html.css('overflow-y', flag ? 'scroll' : 'hidden')
};

app.goToURL = function(url){
    win.location.href = url;
};

app.toggleSliderButton = function(){
    app.sliderWorking = !app.sliderWorking;
    app.sliderTimeout = $sliderTimeoutInput.val();
    console.log('app.toggleSliderButton app.sliderWorking', app.sliderWorking);
    GM_setValue('sliderWorking', app.sliderWorking);
    GM_setValue('sliderTimeout', app.sliderTimeout);
    $sliderButton.html(app.sliderWorking ? 'End slideshow' : 'Begin slideshow');
    if (app.sliderWorking) {
        app.sliderTimer = setTimeout(function(){
            app.goToURL(app.nextURL);
        }, app.sliderTimeout);
    } else {
        win.clearInterval(app.sliderTimer);
    }
};

// render

app.render();


// update dom cache

$sliderButton = $('#sliderButton');
$sliderTimeoutInput = $('#sliderTimeoutInput');


// apply events

$sliderButton.on('click', app.toggleSliderButton);

$win.on('keydown', app.handleKeyPress);


// init

app.togglePage(false);
app.sliderWorking = !app.sliderWorking;
app.toggleSliderButton();
app.maximizeAndCenter();
app.hasGoldenPaymentMessage && app.goToURL(app.nextURL); 