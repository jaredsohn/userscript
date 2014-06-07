'use strict';
// ==UserScript==
// @name       PetHelper
// @namespace  http://userscripts.org/scripts/show/388852
// @version    0.2.3b
// @description  Pet Helper for mpets.mobi and mpets.net
// @match      http://mpets.mobi/*
// @match      http://fs.mpets.mobi/*
// @match      http://mpets.net/*
// @copyright  2013+, KoteKotlyarov@gmail.com
// ==/UserScript==

var version = "0.2.3b";
var isLoaded = false;

var doIntervalMin = 900,
    doIntervalMax = 1500,
    gameBaseUrl = window.location.origin,

    PH_OPTIONS = " " +
        "<div id='ph_main' style='position: absolute; height: 800px; width: 300px; top: 0px; right: -330px; background: #E6843C url(\"/view/image/top-panel/body_bg.gif\");'>" +
        "<div id='ph_body' style='height: 50px; padding: 5px 3px 0px 3px; margin-bottom: 3px; border-bottom: 1px #fef8f1 solid; background: #fff url(\"/view/image/art/header_top_panel_bg.gif\") 0 100% repeat-x;'>" +
        "<div style='height: 50px; background: url(\"/view/image/art/header_data_panel_bg-small.gif\") 0 0 no-repeat;'>" +
        "<div style='height: 50px; background: #db803a url(\"/view/image/art/header_data_panel_bg-big.gif\") repeat-x;'>" +
        "<div style='height: 50px; background: url(\"/view/image/art/header_data_panel_bg-small.gif\") 0 0 no-repeat;'>" +
        "<div style='height: 48px; padding: 2px 3px 0 3px; background: url(\"/view/image/art/header_data_panel_bg-small.gif\") 100% -50px no-repeat; text-align: center;'>" +
        "Pet Helper<br/>v. " + version + "<br/><a target='_blank' href='http://userscripts.org/scripts/show/388852'>Official tread</a>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "<fieldset id='ph_options'>" +
        "<legend>Options:</legend>" +
        "<label><input type='checkbox' id='food' class='ph_cb'> Feed pet</label><br/>" +
        "<label><input type='checkbox' id='play' class='ph_cb'> Play with pet</label><br/>" +
        "<label><input type='checkbox' id='show' class='ph_cb'> Go for show</label><br/>" +
        "<label><input type='checkbox' id='glade' class='ph_cb'> Go to the glade</label><br/>" +
        "<label><input type='checkbox' id='travel' class='ph_cb'> Go for a walk</label><br/>" +
        "<br />" +
        "<label><input type='checkbox' id='tasks' class='ph_cb'> Collect rewards</label><br />" +
        "<label><input type='checkbox' id='train' class='ph_cb'> Train pet (hearts)</label><br />" +
        "<label><input type='checkbox' id='dailyClubBudget' class='ph_cb'> Accept club daily invest</label><br />" +
        "<br />" +
        "<br />" +
        "<input type='button' id='ph_save' value='Save'><br/>" +
        "<input type='button' id='ph_save_all_and_start' value='Check all and start'>" +
        "</fieldset>" +
        "<br/>" +
        "<div id='ph_separator'></div>" +
        "<br />" +
        "<fieldset id='ph_news'>" +
        "<legend>News:</legend>" +
        "<b>" + version + ":</b><br />" +
        "<b>+</b> Can click on 'add 5 coins to club' button.<br />" +
        "<b>=</b> Some fixes." +
        "<b>+</b> Now supports fs.mpets.mobi subdomain." +
        "</fieldset>" +
        "<br />" +
        "<fieldset id='ph_log'>" +
        "<legend>Log (Not implemented)</legend>" +
        "<div id='log' style='display: none; position: relative; height: 300px; width: 100%; overflow: auto;'></div>" +
        "</fieldset>" +
        "</div>" +
        "<br/>" +
        "</div>";


function init() {
    // Load only if it's Google Chrome
    var browserRaw = navigator.userAgent;

    if (browserRaw.indexOf("Chrome") !== -1) {
        window.browser = "chrome";
    } else if (browserRaw.indexOf("Firefox") !== -1) {
        window.browser = "firefox";
    } else {
        window.browser = browserRaw;
    }

    if (window.browser !== "chrome") {
        alert("This script was tested only in Google Chrome. Pet helper is not available.");
        return false;
    }

    preparePlace();

    return true;
}

function preparePlace() {
    var placeToLoad = document.querySelector("div.content");
    if (placeToLoad) {
        placeToLoad.innerHTML += PH_OPTIONS;
        console.log("Pet helper initiated");
        isLoaded = true;
    } else {
        console.log("Can't load Pet Helper");
    }
}

function whoIsWorking() {
    if (sessionStorage.autoreload === "true") {
        sessionStorage.autoreload = "false";
        return "script";
    }

    var log = (isExist("log")) ? "" : sessionStorage.log;
    sessionStorage.clear();
    sessionStorage.log = log;
    addToLog("Page gets by user. Resetting all parameters.", 0);
    return "user";
}

function isExist(elem) {
    return sessionStorage[elem] !== undefined;
}

function addToLog(msg, logType) {
    // ToDO Rebuild this func
    if (logType === 0) {
        var time = new Date();
        sessionStorage.log += "<span>" +
            time.getHours() + ":" +
            time.getMinutes() + ":" +
            time.getSeconds() + " " +
            msg + "</span><br />";
    }
    if (logType === 1) {
        console.log("qwe");
    }
}

function loadParams() {
    document.getElementById("ph_save").onclick = function () {
        sessionStorage.food = document.getElementById("food").checked;
        sessionStorage.play = document.getElementById("play").checked;
        sessionStorage.show = document.getElementById("show").checked;
        sessionStorage.glade = document.getElementById("glade").checked;
        sessionStorage.travel = document.getElementById("travel").checked;

        sessionStorage.tasks = document.getElementById("tasks").checked;
        sessionStorage.train = document.getElementById("train").checked;
        sessionStorage.dailyClubBudget = document.getElementById("dailyClubBudget").checked;

        sessionStorage.autoreload = "true";
        window.location.reload();
    };

    document.getElementById("ph_save_all_and_start").onclick = function () {
        setAllTo("ph_cb", true);
        setAllTo("session", true);

        sessionStorage.autoreload = "true";
        window.location.reload();
    };

    document.getElementById("food").checked = strToBool(sessionStorage.food);
    document.getElementById("play").checked = strToBool(sessionStorage.play);
    document.getElementById("show").checked = strToBool(sessionStorage.show);
    document.getElementById("glade").checked = strToBool(sessionStorage.glade);
    document.getElementById("travel").checked = strToBool(sessionStorage.travel);

    document.getElementById("tasks").checked = strToBool(sessionStorage.tasks);
    document.getElementById("train").checked = strToBool(sessionStorage.train);
    document.getElementById("dailyClubBudget").checked = strToBool(sessionStorage.dailyClubBudget);
}

function setAllTo(what, value) {
    if (what === "session") {
        sessionStorage.food = value;
        sessionStorage.play = value;
        sessionStorage.show = value;
        sessionStorage.glade = value;
        sessionStorage.travel = value;

        sessionStorage.tasks = value;
        sessionStorage.train = value;
        sessionStorage.dailyClubBudget = value;
    } else if (what === "ph_cb") {
        var allOptions = document.querySelectorAll(".ph_cb"),
            optCount = allOptions.length,
            i = 0;

        for (i; i < optCount; i++) {
            allOptions[i].checked = value;
        }
    }
}

function strToBool(str) {
    if (str === undefined) {
        return false;
    }

    switch (str.toLowerCase()) {
    case "true":
        return true;

    case "false":
        return false;

    default:
        alert("Error in 'stringToBool' function. Value is " + str);
        break;
    }

    return false;
}

function getPetStat(what) {
    var regDigit = /\d+/,
        query;

    switch (what) {
    case "all":
        break;

    case "beauty":
        query = document.querySelector("div.indicators > div.item:nth-child(1)").innerHTML;
        break;

    case "coins":
        query = document.querySelector("div.indicators > div.item:nth-child(2)").innerHTML;
        break;

    case "hearts":
        query = document.querySelector("div.indicators > div.item:nth-child(3)").innerHTML;
        break;
    }

    return parseInt(regDigit.exec(query)[0], 10);
}

function getPetCoins() {
    return getPetStat("coins");
}

function getPetHearts() {
    return getPetStat("hearts");
}


function openHomePage() {
    var home = document.querySelector("a[href='/']");
    if (home) {
        doActionClick(home);
    } else {
        doActionUrl(gameBaseUrl);
    }
}

function doActionUrl(url) {
    var delay = Math.floor(Math.random() * (doIntervalMax - doIntervalMin + 1)) + doIntervalMin;
    setTimeout(function () {
        sessionStorage.autoreload = "true";
        window.location.assign(url);
    },
        delay);
}

function doActionClick(elem) {
    var delay = Math.floor(Math.random() * (doIntervalMax - doIntervalMin + 1)) + doIntervalMin;
    return setTimeout(function () {
        sessionStorage.autoreload = "true";
        elem.click();
    },
        delay);
}

// Sys func ends

function donateIfCan() {
    var button = document.querySelector("a[href^='/add_club_budget']");
    if (!button || getPetCoins() < 5) {
        return false;
    }

    doActionClick(button);
    return true;
}

function feedIfCan() {
    try {
        var food = document.querySelector("a.food_color, a.food_color_new");
        if (food) {
            return doActionClick(food);
        }
    } catch (err) {
        addToLog(err.message, 0);
        sessionStorage.food = false;
    }

    return false;
}

function playIfCan() {
    try {
        var play = document.querySelector("a.play_color, a.play_color_new");
        if (play) {
            return doActionClick(play);
        }
    } catch (err) {
        addToLog(err.message, 0);
        sessionStorage.play = false;
    }

    return false;
}

function showIfCan() {
    try {
        var show = document.querySelector("a.show_color");
        if (show) {
            return doActionClick(show);
        }
    } catch (err) {
        addToLog(err.message, 0);
        sessionStorage.show = false;
    }

    return false;
}

function wakeupByHeartsIfCan() {
    var wakeup = document.querySelector("a[href='/wakeup']");

    if (wakeup) {
        doActionClick(wakeup);
        return true;
    }

    return false;
}

function checkGlade() {
    try {
        var glade = document.querySelector("a[href='/glade']");
        if (glade && isLinkHasPlus(glade)) {
            return doActionClick(glade);
        }
    } catch (err) {
        addToLog(err.message, 0);
        sessionStorage.glade = false;
    }

    return false;
}

function isLinkHasPlus(elem) {
    return (elem.querySelector("span.plus, span.plus_nopad") !== null);
}

function checkTravel() {
    try {
        var travel = document.querySelector("a[href='/travel']");
        if (travel && isLinkHasPlus(travel)) {
            return doActionClick(travel);
        }
    } catch (err) {
        addToLog(err.message, 0);
        sessionStorage.travel = false;
    }

    return false;
}

function checkTasks() {
    try {
        var task = document.querySelector("a[href='/task']");
        if (task && isLinkHasPlus(task)) {
            return doActionClick(task);
        }
    } catch (err) {
        addToLog(err.message, 0);
        sessionStorage.tasks = false;
    }

    return false;
}

function checkTrain() {
    try {
        var train = document.querySelector("a[href='/train']");
        if (train && isLinkHasPlus(train)) {
            return doActionClick(train);
        }
    } catch (err) {
        addToLog(err.message, 0);
        sessionStorage.train = false;
    }

    return false;
}

function wearItemIfCan() {
    var firstWearableItem = document.querySelector("a[href^='/wear_item']");
    if (firstWearableItem) {
        return doActionClick(firstWearableItem);
    }
    return false;
}

function sellClothes() {
    var firstSellLink = document.querySelector("a[href^='/sell_item'][href*='&type=cloth']");
    if (firstSellLink) {
        return doActionClick(firstSellLink);
    }
    return false;
}

function openChests() {
    var key = document.querySelector("img[src='/view/image/item/key1.png'"),
        chest = document.querySelector("img[src='/view/image/item/chest1.png'");

    if (key && chest) {
        return doActionClick(document.querySelector("a[href^='/open_item'"));
    }

    return leaveOneChest();
}

function leaveOneChest() {
    var chests = document.querySelectorAll("a[href^='/sell_item'][href*='&type=lockbox']");
    if (chests.length > 1) {
        return doActionClick(chests[0]);
    }
    return false;
}

init();

if (isLoaded) {
    var whoIs = whoIsWorking();

    loadParams();
    var min, max, delay,
        pathname = window.location.pathname;

    switch (pathname) {
    case "/":
        if (whoIs === "user") {
            break;
        }

        if (sessionStorage.dailyClubBudget === "true" && donateIfCan()) {
            break;
        }

        if (sessionStorage.food === "true" && feedIfCan()) {
            break;
        }
        if (sessionStorage.play === "true" && playIfCan()) {
            break;
        }
        if (sessionStorage.show === "true" && showIfCan()) {
            break;
        }

        if (wakeupByHeartsIfCan()) {
            break;
        }

        // If nothing to do, check additional things
        if (sessionStorage.glade === "true" && checkGlade()) {
            break;
        }
        if (sessionStorage.travel === "true" && checkTravel()) {
            break;
        }
        if (sessionStorage.tasks === "true" && checkTasks()) {
            break;
        }
        if (sessionStorage.train === "true" && checkTrain()) {
            break;
        }

        min = 1800000;
        max = 3600000;

        delay = Math.floor(Math.random() * (max - min + 1)) + min;
        console.log("Nothing to do. Reload in " + delay);
        setTimeout(function () {
            sessionStorage.autoreload = "true";
            window.location.assign(gameBaseUrl);
        },
            delay);
        break;

    case "/show":
        if (whoIs === "user") {
            break;
        }

        doActionClick(document.querySelector("a.green_button"));
        break;

    case "/glade":
        if (whoIs === "user") {
            break;
        }

        var glade = document.querySelector("a.green_button_sm16");
        if (!glade) {
            sessionStorage.nextGladeIn = Date.now() + 1000 * 60 * 60 * 2 + 30000;
            openHomePage();
            break;
        }

        doActionClick(glade);
        break;

    case "/travel":
        if (whoIs === "user") {
            break;
        }

        var travel = document.querySelector("a[href^='/go_travel']:last-of-type") || document.querySelector("a[href='/travel?clear=1']");
        if (!travel) {
            openHomePage();
            break;
        }

        doActionClick(travel);
        break;

    case "/train":
        if (whoIs === "user") {
            break;
        }

        var heartTrainLinks = document.querySelectorAll("a.train_link > span > img[src$='heart.png']");
        if (heartTrainLinks.length === 0) {
            openHomePage();
            break;
        }

        var petHearts = getPetHearts();

        var reg = /\d+/;
        var needHeartsForUpdate,
            i = 0;

        var available = function () {
            for (i; i < heartTrainLinks.length; i++) {
                needHeartsForUpdate = parseInt(reg.exec(heartTrainLinks[i].parentNode.innerHTML)[0], 10);

                if (petHearts >= needHeartsForUpdate) {
                    doActionClick(heartTrainLinks[i].parentNode.parentNode);
                    return true;
                }
            }

            return false;
        };

        if (!available()) {
            openHomePage();
        }
        break;

    case "/task":
        if (whoIs === "user") {
            break;
        }

        var firstTask = document.querySelector("a.task_link");
        if (!firstTask) {
            openHomePage();
            break;
        }

        doActionClick(firstTask);
        break;

    case "/chest":
        if (whoIs === "user") {
            break;
        }

        // We need delay time to simulate human work.
        // So we break from func to prevent openHomePage() execution before our delay will be passed.
        if (wearItemIfCan() || sellClothes() || openChests()) {
            break;
        }

        openHomePage();
        break;

    case "/profile":
        if (whoIs === "user") {
            break;
        }

        openHomePage();
        break;

    default:
        console.log("Unknown path url: " + pathname);
        break;
    }

    if (whoIs === "user") {
        loadParams();
        console.log("Doing nothing");
    }
}