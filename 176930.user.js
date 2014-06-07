// ==UserScript==
// @name       Cookie Clicker All the Things.
// @version    0.04
// @description  Get 250+ Golden Cookie rewards at each cookie, and 120 Big Cookie Clicks per second.
// @copyright  2013 Garrett-Innovations
// @include     http://orteil.dashnet.org/cookieclicker/
// @require     http://update.sizzlemctwizzle.com/176679.user.js
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @run-at      document-end
// ==/UserScript==
var clickEvent = document.createEvent("MouseEvents");
var started = false;
autoClick = false;
clickEvent.initEvent("click", true, true);
console.log('Cookie Bot: Variables created');
$(document).ready(function(){
    var styleSheet = document.styleSheets[0];
    styleSheet.addRule('#autoClickButton:hover','right: -8px;');
    styleSheet.addRule('#autoClickButton','top: 0px;right: -16px;padding: 14px 20px 10px 5px;');
    var autoClick = document.createElement("div");
    autoClick.setAttribute('class', "button");
    autoClick.setAttribute('id', "autoClickButton");
    autoClick.setAttribute('style', "font-size:80%;");
    autoClick.innerHTML = "AutoClick<br/>False";
    $('#comments')[0].appendChild(autoClick);
    $('#autoClickButton').live('click', function(e) {
        window.autoClick = !window.autoClick;
        $('#autoClickButton').remove();
        var autoClick = document.createElement("div");
        autoClick.setAttribute('class', "button");
        autoClick.setAttribute('id', "autoClickButton");
        autoClick.setAttribute('style', "font-size:80%;");
        if(window.autoClick) {
        	autoClick.innerHTML = "AutoClick<br/>True";
        } else {
           autoClick.innerHTML = "AutoClick<br/>False"; 
        }
        $('#comments')[0].appendChild(autoClick);
        console.log('Auto Click Toggled: '+window.autoClick);
    });
    Injector = setInterval(function() {
        BigCookieInterval = setInterval(function () {
            if(window.autoClick) {
                var bigCookie = document.getElementById('bigCookie');
                bigCookie.dispatchEvent(clickEvent);
                var goldenCookie = document.getElementById('goldenCookie');
    			goldenCookie.dispatchEvent(clickEvent);
            }
        }, 1);
        PriceInterval = setInterval(function () {
            $('#products > .product').each(function () {
                if($(this).children("div.content").children("div.time") !== null ) $(this).children("div.content").children("div.time").remove();
                var price = Game.Objects[$(this).children("div.content").children("div.title:first").text()].basePrice*Math.pow(Game.priceIncrease,$(this).children("div.content").children("div.owned").text());
                var currentCookies = Game.cookies;
                var newPrice = parseInt(parseInt(price) - parseInt(currentCookies));
                var seconds = parseInt(parseInt(newPrice) / parseInt(Game.cookiesPs));
                if(seconds > 0 ) {
                    var time = document.createElement("div");
                    time.setAttribute('class', "time");
                    var totalSec = new Date().getTime() / 1000;
                    var days = parseInt( seconds / 86400 ) % 30;
                    var hours = parseInt( seconds / 3600 ) % 24;
                    var minutes = parseInt( seconds / 60 ) % 60;
                    var seconds = seconds % 60;
                    var result = (days > 0 ? days + " D ": '') + (hours > 0 ? hours + " H ": '') + (minutes > 0 ? minutes + " M " : '') + (seconds  > 0 ? seconds + " S" : '');
                    time.innerHTML = result;
                    $(this).children("div.content")[0].appendChild(time);
                }
            });
        }, 1000);
        if(!started) {
            started = true;
            clearInterval(Injector);
        }
    }, 1000);
});