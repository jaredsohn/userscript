// ==UserScript==
// @name       CookieClicker1337Cheatz
// @namespace  http://use.i.E.your.homepage/
// @version    1.1.1
// @description  Just a small script for the browsergame CookieClicker
// @match      http://tampermonkey.net/index.php?version=3.5.3630.77&ext=dhdg&updated=true
// @copyright  2013, Leetjamin 1337mann
// @include http://orteil.dashnet.org/cookieclicker/
// @require http://code.jquery.com/jquery-latest.js
// @require http://code.jquery.com/ui/1.10.3/jquery-ui.min.js
// @resource jqueryUI http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css
// @resource  customCSS https://dl.dropboxusercontent.com/s/s7dwk782ttwpp9r/cookieClickerStyle.css
// ==/UserScript==


var newCSS = GM_getResourceText("customCSS");
var newCSSS = GM_getResourceText("jqueryUI");
GM_addStyle(newCSSS);
GM_addStyle(newCSS);


$(function () {
    initwindow();
    initCloser();
    initPager();
    initButtons("cPs", cPs_interval);
    initCheckboxChange();
});

var buyInterval = 400;
// Part to generate the html
function initPager() {
    $(".DialogPager a").click(function () {
        $(".DialogPager a").removeClass("active");
        $(this).addClass("active");
        $(".DialogContent").hide();
        $(".DialogContent[data-page='"+$(this).attr("data-page")+"']").show();
    });
}

function initCloser() {
    $("#OpenClose").click(function () {
        $("#cookieDialog").toggleClass("closed");
        $(".DialogPager").toggle();
    });
}
function initwindow() {
    var _window = $('<div id="cookieDialog">' +
                        '<a id="OpenClose"></a>' +
                        '<div class="DialogContent" data-page="1">' +
                            '<p>Klicke auf die Buttons um die Funktionen zu aktivieren/deaktivieren.</p>' +
                            '<div class="ContentSection" id="cPs">' +
                                '<h1>Auto Clicker</h1>' +
                                '<input value="1" id="cPs_input" type="text" /><span>ms</span>' +
                                '<a id="cPs_button" href="#">Activate</a>' +
                            '</div>' +
                            '<div class="ContentSection" id="gCs">' +
                                '<h1>Lucky Cookies</h1>' +
                                '<input value="500" id="gCs_input" type="text" /><span>ms</span>' +
                                '<a id="gCs_button" href="#">Activate</a>' +
                            '</div>' +
                            '<div class="ContentSection" id="dWa">' +
                                '<h1>Destroy Wankers</h1>' +
                                '<input value="1" id="dWa_input" type="text" /><span>ms</span>' +
                                '<a id="dWa_button" href="#">Activate</a>' +
                            '</div>' +
                            '<div class="ContentSection wide" id="dWa">' +
                                '<h1>Direct Cookie Earn</h1>' +
                                '<input value="200" id="dEa_inputC" type="text" /><span>Cookies/</span><input value="1" id="dEa_input" type="text" /><span>ms</span>' +
                                '<a id="dEa_button" href="#">Activate</a>' +
                            '</div>' +
                     '</div>' +
                     '<div class="DialogContent" data-page="2">' +
                            '<p>Klicke auf die Buttons um die Funktionen zu aktivieren/deaktivieren.</p>' +
                            '<div class="ContentSection extrawide" id="dWa">' +
                                '<h1>Auto Buyer - just check and be happy</h1>' +
                                '<div class="chk_boxs">'+
                                '<input value="0" type="checkbox" /><span id="chk_label0">Cursor</span><br/>' +
                                '<input value="1" type="checkbox" /><span id="chk_label1">Grandma</span><br/>' +
                                '<input value="2" type="checkbox" /><span id="chk_label2">Farm</span><br/>' +
                                '<input value="3" type="checkbox" /><span id="chk_label3">Factory</span><br/>' +
                                '<input value="4" type="checkbox" /><span id="chk_label4">Mine</span><br/>' +
                                '</div>' +
                                '<div class="chk_boxs">' +
                                '<input value="5" type="checkbox" /><span id="chk_label5">Shipment</span><br/>' +
                                '<input value="6" type="checkbox" /><span id="chk_label6">Alchemy lab</span><br/>' +
                                '<input value="7" type="checkbox" /><span id="chk_label7">Portal</span><br/>' +
                                '<input value="8" type="checkbox" /><span id="chk_label8">Time machine</span><br/>' +
                                '<input value="9" type="checkbox" /><span id="chk_label9">Antimatter condenser</span><br/>' +
                                '</div>' +
                            '</div>' +
                            '<div class="ContentSection wide" id="dWa">' +
                                '<input value="400" id="bIn_input" type="text" /><span>ms</span>' +
                                '<a id="bIn_button" href="#">Set Buyinterval</a>' +
                            '</div>' +
                     '</div>' +
                     '<div class="DialogPager">' +
                                '<span>Page</span>' +
                                '<a data-page="1" class="active">1</a>' +
                                '<a data-page="2">2</a>' +
                      '</div>' +
                   '</div>');
    $("body").append(_window);
    $(".DialogContent[data-page='1']").show();
    $(".ContentSection a").button();

}

//Set intervals that they are usable everywhere and can be cleared
var cPs_interval = "",
    gCs_interval = "",
    dWa_interval = "",
    dEa_interval = ""
var p_intervals = {
    p0_interval : "",
    p1_interval : "",
    p2_interval : "",
    p3_interval : "",
    p4_interval : "",
    p5_interval : "",
    p6_interval : "",
    p7_interval : "",
    p8_interval : "",
    p9_interva: "",
    };
    

//Buttons
function ButtonClick(func, interval) {
    $("#" + func + "_button").click(function () {
        if ($(this).hasClass("btn_active")) {
            clearInterval(interval);
            $(this).toggleClass("btn_active");
            $(this).find("span").html("Activate");
            $("#" + func + "_input").removeAttr("disabled");
        } else {
            if ($("#" + func + "_input").val() != 0) {
                $(this).toggleClass("btn_active");
                $(this).find("span").html("Deactivate");
                $("#" + func + "_input").attr("disabled", "disabled");
                clearInterval(cPs_interval);
                interval = setInterval(function () { doClick(func); }, $("#" + func + "_input").val());
            }
        }
    });
}
function initButtons() {
    ButtonClick("cPs", cPs_interval);//Cookies per Second Button
    ButtonClick("gCs", gCs_interval);//Lucky Cookies per Second Button
    ButtonClick("dWa", dWa_interval);//Wrinkler Destroy Button
    ButtonClick("dEa", dEa_interval);//Direct Earn Cookies Button
    $("#bIn_button").click(function () { setBuyInterval() });
}
function doClick(func) {
    var _clickEvents = {
        "cPs": function () { $("#bigCookie").click(); },
        "gCs": function () { Game.goldenCookie.spawn(); $("#goldenCookie").click(); },
        "dWa": function () { Game.CollectWrinklers(); },
        "dEa": function () { Game.Earn(parseInt($("#dEa_inputC").val())); }
    }
    _clickEvents[func]();
}
//Checkboxes
function initCheckboxChange() {
    $(".chk_boxs input").change(function () {
        var _id = $(this).val();

        $("#chk_label" + _id).toggleClass("active");
        if ($(this).prop("checked") == true) {
            $(this).attr("data-chk", "checked");
            startAutoBuy(_id);
        } else {
            $(this).attr("data-chk", "");
            stopAutoBuy(_id);
        }
    });
}
//function to call the intervall to buy
function startAutoBuy(_id) {
    p_intervals["p" + _id + "_interval"] = setInterval(function () { Game.ObjectsById[_id].buy(); }, buyInterval);
}
//function to stop the buy interval
function stopAutoBuy(_id) {
    clearInterval(p_intervals["p" + _id + "_interval"]);
}

function setBuyInterval() {
    buyInterval = $("#bIn_input").val();
}
