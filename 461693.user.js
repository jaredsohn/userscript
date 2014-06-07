'use strict';
// ==UserScript==
// @name       Fermer
// @namespace
// @version    0.0.1a
// @description  Fermer for mferma.ru
// @match      http://mferma.ru/*
// @copyright  2013+, KoteKotlyarov@gmail.com
// ==/UserScript==

var version = "0.0.1a";
var isLoaded = false;

var doIntervalMin = 3000,
    doIntervalMax = 5000,
    AJAX_EXEC_TIME = 1000, // Waiting 1 sec after executing AJAX and before do any actions
    gameBaseUrl = window.location.origin,

    FERMER_OPTIONS = " " +
        "<div id='mia_main' style='position: absolute; height: 800px; width: 700px; top: 0px; right: -0px; margin: 5px 50px 0px 0px;'>" +
        "<fieldset style='text-align: center;'>" +
        "<legend>Fermer</legend>" +
//        "Helps in farming<br/>v. " + version + "<br/><a target='_blank' href='http://userscripts.org/scripts/show/'>Official tread</a>" +
        "</fieldset><br/>" +
        "<div id='mia_separator'></div>" +
        "<fieldset id='mia_options'>" +
        "<legend>Options:</legend>" +
        "<label><input type='checkbox' id='mia_garden' class='mia_cb' style='height: 20px; width: 20px;'> Сбор урожая</label><br/>" +
        "<fieldset>" +
        "<legend>Настройки:</legend>" +
        "<label><input type='checkbox' id='mia_garden_work' class='mia_cb' style='height: 20px; width: 20px;'> Полив, удобрение, сбор, впахивание</label><br />" +
//        "<label><input type='checkbox' id='mia_garden_plant' class='mia_cb' style='height: 20px; width: 20px;'> Сажать пшеницу</label><br />" +
//        "<label><input type='checkbox' id='mia_garden_plant' class='mia_cb' value='Сажать' disabled> Сажать</label><br />" +
//        "<label><input type='checkbox' id='mia_garden_harvest' class='mia_cb' value='Собирать'> Собирать</label><br />" +
//        "<label><input type='checkbox' id='mia_garden_dig' class='mia_cb' value='Вскапывать'> Вскапывать</label><br />" +
        "</fieldset><br />" +
        "<label><input type='checkbox' id='mia_roulette' class='mia_cb' style='height: 20px; width: 20px;'> Колесо удачи</label><br/>" +
        "<br /><br />" +
        "<input type='button' id='mia_save' value='Save'><br/>" +
        "<input type='button' id='mia_save_all_and_start' value='Check all and start'>" +
        "</fieldset><br/>" +
        "<div id='mia_separator'></div><br />" +
        "<fieldset id='mia_news'>" +
        "<legend>News:</legend>" +
        "<b>" + version + ":</b><br />" +
        "<b>+</b> Первая альфа версия.<br />" +
        "<b>+</b> Полив и сбор урожая.<br />" +
        "<b>+</b> Очистка полей.<br />" +
        "<b>+</b> Использование колеса удачи (Не работает интервал проверки).<br />" +
        "</fieldset><br />" +
        "<fieldset id='mia_log'>" +
        "<legend>Log (Not implemented)</legend>" +
        "<div id='log' style='display: none; position: relative; height: 300px; width: 100%; overflow: auto;'></div>" +
        "</fieldset>" +
        "</div>";

// Sys func

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

    loadBlockIntoPlace();

    return true;
}

function loadBlockIntoPlace() {
    var placeToLoad = document.querySelector("body > div.f");
    if (placeToLoad) {
        placeToLoad.innerHTML += FERMER_OPTIONS;
        isLoaded = true;
    } else {
        console.log("Can't load Fermer");
    }
}

function whoIsWorking() {
    if (sessionStorage.autoreload === "true") {
        sessionStorage.autoreload = "false";
        return "script";
    }

    //var log = (sessionContains("log")) ? "" : sessionStorage.log;
    sessionStorage.clear();
    //sessionStorage.log = log;
    //addToLog("Page gets by user. Resetting all parameters.", 0);
    return "user";
}

function sessionContains(elem) {
    return sessionStorage[elem] !== undefined;
}

function addToLog(msg, logType) {
    // ToDO Rebuild this func
    /*
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
    */
}

function loadParams() {
    // Bind
    document.getElementById("mia_save").onclick = function () {
        sessionStorage.garden = document.getElementById("mia_garden").checked;
        sessionStorage.gardenWork = document.getElementById("mia_garden_work").checked;
//        sessionStorage.gardenPlant = document.getElementById("mia_garden_plant").checked;
//        sessionStorage.gardenHarvesr = document.getElementById("mia_garden_harvest").checked;
//        sessionStorage.gardenDig = document.getElementById("mia_garden_dig").checked;
        sessionStorage.roulette = document.getElementById("mia_roulette").checked;

        sessionStorage.autoreload = "true";
        window.location.reload();
    };

    // Bind
    document.getElementById("mia_save_all_and_start").onclick = function () {
        setAllTo("mia_cb", true);
        setAllTo("session", true);

        sessionStorage.autoreload = "true";
        window.location.reload();
    };

    // Bind child CB to parent one
    document.getElementById("mia_garden_work").onclick = function () {bindToParent();};
//    document.getElementById("mia_garden_plant").onclick = function () {bindToParent();};
//    document.getElementById("mia_garden_harvest").onclick = function () {bindToParent();};
//    document.getElementById("mia_garden_dig").onclick = function () {bindToParent();};

    // Load
    document.getElementById("mia_garden").checked = strToBool(sessionStorage.garden);
    document.getElementById("mia_garden_work").checked = strToBool(sessionStorage.gardenWork);
//    document.getElementById("mia_garden_plant").checked = strToBool(sessionStorage.gardenPlant);
//    document.getElementById("mia_garden_harvest").checked = strToBool(sessionStorage.gardenHarvesr);
//    document.getElementById("mia_garden_dig").checked = strToBool(sessionStorage.gardenDig);
    document.getElementById("mia_roulette").checked = strToBool(sessionStorage.roulette);

    /*
    if (sessionContains("log")) {
        document.getElementById("log").innerHTML += sessionStorage.log;
    }
    */
}

function setAllTo(what, value) {
    if (what === "session") {
        sessionStorage.garden = value;
//        sessionStorage.gardenPlant = value;
//        sessionStorage.gardenHarvesr = value;
//        sessionStorage.gardenDig = value;

        sessionStorage.roulette = value;
    } else if (what === "mia_cb") {
        var allOptions = document.querySelectorAll(".mia_cb"),
            optCount = allOptions.length,
            i = 0;

        for (i; i < optCount; i++) {
            allOptions[i].checked = value;
        }
    }
}

function bindToParent() {
    document.getElementById("mia_garden").checked = true;
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

function doActionClick(elem) {
    var delay = Math.floor(Math.random() * (doIntervalMax - doIntervalMin + 1)) + doIntervalMin;
    return setTimeout(function () {
            sessionStorage.autoreload = "true";
            elem.click();
        },
        delay);
}

function doActionUrl(url) {
    var delay = Math.floor(Math.random() * (doIntervalMax - doIntervalMin + 1)) + doIntervalMin;
    setTimeout(function () {
            sessionStorage.autoreload = "true";
            window.location.assign(url);
        },
        delay);
}

function openHomePage() {
    var home = document.querySelector("a[href='garden']");
    if (home) {
        doActionClick(home);
    } else {
        doActionUrl(gameBaseUrl);
    }
}

function refreshPage() {
    doActionUrl(window.location.href);
}

function openHomePageAfterMins() {
    var min = 50000,
        max = 90000,
        delay = Math.floor(Math.random() * (max - min + 1)) + min;

    console.log("Nothing to do. Reload in " + delay);
    setTimeout(function () {
            sessionStorage.autoreload = "true";
            window.location.assign(gameBaseUrl);
        },
        delay);
}

// FOR GARDEN

function isGardenReady() {
    console.log("in func isGardenReady()");
    if (!sessionContains("gardenCount")) {
        sessionStorage.gardenCount = document.querySelectorAll("a[href^='garden/bed']").length;
    }

    console.log("Initing...");
    if (sessionContains("gardenWork")) {
        console.log("\tsessionContains(gardenWork) is true");

        var i = 0;

        for (i; i < sessionStorage.gardenCount; i++) {
            if (bedPlantsNeedWater(i)) {
                sessionStorage._actionToDo = "water";
                console.log("\tBed " + i + " NEED water. Opening that bed.");
                doActionClick(document.querySelector("a[href^='garden/bed/" + i + "']"));
                return true;
            } else {
                console.log("\tBed " + i + " don't need water");
            }

            // Fertilize

            if (bedPlantsNeedHarvest(i)) {
                sessionStorage._actionToDo = "harvest";
                console.log("\tBed " + i + " NEED to be harvested. Opening that bed.");
                doActionClick(document.querySelector("a[href^='garden/bed/" + i + "']"));
                return true;
            } else {
                console.log("\tBed " + i + " don't need to be harvested");
            }

            if (bedRowNeedCleaning(i)) {
                sessionStorage._actionToDo = "clean";
                console.log("\tBed " + i + " NEED cleaning. Opening that bed.");
                doActionClick(document.querySelector("a[href^='garden/bed/" + i + "']"));
                return true;
            } else {
                console.log("\tBed " + i + " don't need cleaning");
            }

            // Cleaning, Planting
        }
    }
    console.log("Finished");
    return false;
}

function bedPlantsNeedWater(bedNum) {
    var waterMarks = " > span > span.f-flag-water";
    return getPlantsByClassAndRow(bedNum, waterMarks);
}

function getPlantsByClassAndRow(bedRowNumber, selector) {
    var bedRow = document.querySelector("a[href^='garden/bed/" + bedRowNumber + "']" + selector);

    if (!bedRow) {
        return false;
    }

    return bedRow;

//    getPlantsByClassAndRow(" > span.plant.dirt-raw"); // Dirt
//    getPlantsByClassAndRow(" > span > span.f-flag-water"); // Watering +
//    getPlantsByClassAndRow(" > span > span.f-flag-fertilize"); // Fertilize
//    getPlantsByClassAndRow(" > span > span.f-flag.f-flag-harvest"); // Harvesting +
//    document.querySelectorAll("a[href^='garden/bed/0'] > span.plant.dirt-cultivated"); // Diging in
}

function bedPlantsNeedFertilize(bedNum) {

}

function bedPlantsNeedHarvest(bedNum) {
    var harvestMarks = " > span > span.f-flag.f-flag-harvest";
    return getPlantsByClassAndRow(bedNum, harvestMarks);
}

function bedRowNeedCleaning(bedNum) {
    var cleanMarks = " > span.plant.dirt-raw";
    return getPlantsByClassAndRow(bedNum, cleanMarks);
}


// FOR EVERY BED

function startActionWheel() {
    // Plant
    // Water +
    // Fertilize
    // Harvest +
    // Clean

    var action = sessionStorage._actionToDo,
        isReady = false,
        h;
    sessionStorage.removeItem("_actionToDo");

    switch (action) {
        case "plant":
            console.log("Plant");
            break;

        case "water":
            console.log("CASE: Water");
            var applyWaterTo = document.querySelectorAll("a[href*='waterLink']");

            h = function (inArr) {
                var currentIndex = 0;
                setTimeout(function loop () {
                        inArr[currentIndex].click();
                        return (++currentIndex == inArr.length)? isReady = true: setTimeout(loop, 1000);
                    }
                    , 1000);
            };
            h(applyWaterTo);

            setTimeout(function check () {
                    if (isReady) {
                        console.log("Water completed. Execute isAnyOtherActions");
                        setTimeout(function () {isAnyOtherActions();}, AJAX_EXEC_TIME);
                        return false;
                    } else {
                        return setTimeout(check, 1500);
                    }
//                    return (isReady)? false: setTimeout(check, 1500);
                }
                , 1500);

            break;

        case "fertilize":
            console.log("Fertilize");
            break;

        case "harvest":
            console.log("Harvest");
            var applyHarvestTo = document.querySelectorAll("a[href*='harvestLink']");

            h = function (inArr) {
                var currentIndex = 0;
                setTimeout(function loop () {
                        inArr[currentIndex].click();
                        return (++currentIndex == inArr.length)? isReady = true: setTimeout(loop, 1000);
                    }
                    , 1000);
            };
            h(applyHarvestTo);

            setTimeout(function check () {
                    if (isReady) {
                        console.log("Harvest completed. Execute isAnyOtherActions");
                        setTimeout(function () {isAnyOtherActions();}, AJAX_EXEC_TIME);
                        return false;
                    } else {
                        return setTimeout(check, 1500);
                    }
//                    return (isReady)? false: setTimeout(check, 1500);
                }
                , 1500);

            break;

        case "clean":
            console.log("Clean");
            var applyCleanTo = document.querySelectorAll("a[href*='digLink']");

            h = function (inArr) {
                var currentIndex = 0;
                setTimeout(function loop () {
                        inArr[currentIndex].click();
                        return (++currentIndex == inArr.length)? isReady = true: setTimeout(loop, 1000);
                    }
                    , 1000);
            };
            h(applyCleanTo);

            setTimeout(function check () {
                    if (isReady) {
                        console.log("Cleaning completed. Execute isAnyOtherActions");
                        setTimeout(function () {isAnyOtherActions();}, AJAX_EXEC_TIME);
                        return false;
                    } else {
                        return setTimeout(check, 1500);
                    }
//                    return (isReady)? false: setTimeout(check, 1500);
                }
                , 1500);
            break;

        default:
            alert('Wrong action "' + action + '" in startActionWheel()');
            break;
    }
}

function isAnyOtherActions() {
    console.log("Finding other actions");
    if (sessionContains("gardenWork")) {
        console.log("\tChecking water status");
        if (bedPlantsNeedWaterCurrent()) {
            console.log("\tSome plants need water. Starting ActionWheel");
            sessionStorage._actionToDo = "water";
            startActionWheel();
            return true; // Preventing for next checks until this task will complete
        } else {
            console.log("\tDon't need to use water");
        }

//        if (bedPlantsNeedFertilizeCurrent()) {}

        console.log("\tChecking harvest status");
        if (bedPlantsNeedHarvestCurrent()) {
            console.log("\tSome plants need to be harvested. Starting ActionWheel");
            sessionStorage._actionToDo = "harvest";
            startActionWheel();
            return true; // Preventing for next checks until this task will complete
        } else {
            console.log("\tNothing to be harvested");
        }

//        if (bedPlantsNeedHarvestCurrent()) {}

        console.log("No other actions. Opening home page");
        openHomePage();
        return false;
    }

    return false;
}

function bedPlantsNeedWaterCurrent() {
    var waterMarksInBed = "a[href*='waterLink']";
    return getPlantsByClassCurrent(waterMarksInBed);
}

function getPlantsByClassCurrent(selector) {
    var bedPlants = document.querySelectorAll(selector);

    if (bedPlants.length === 0) {
        return false;
    }
    return bedPlants;
}

function bedPlantsNeedFertilizeCurrent() {
//    var fertilizeMarkInBed =
}

function bedPlantsNeedHarvestCurrent() {
    var harvestMarkInBed = "a[href*='harvestLink']";
    return getPlantsByClassCurrent(harvestMarkInBed);
}

//
/*
function getPlantsForHarvestingByBed(bedRowNumber) {
    var harvestSelectorPart = " > span > span.f-flag.f-flag-harvest";
    return getPlantsByClassAndRow(bedRowNumber, harvestSelectorPart);
}
*/
/*function isGardenReady() {
    if (!sessionContains("gardenCount")) {
        sessionStorage.gardenCount = document.querySelectorAll("a[href^='garden/bed']").length;
    }

    var i = 0,
        bedRow;

    for (i; i < sessionStorage.gardenCount; i++) {
        bedRow = document.querySelector("a[href^='garden/bed/" + i + "'] > span > span.f-flag.f-flag-harvest");
        if (!bedRow) {
            continue;
        }
        openBed(i);
        return true;
    }

    return false;
}
*/
/*
function harvestCurrentBed() {
    var readyToHarvest = document.querySelectorAll("a[href*='harvestLink']");

    var h = function (inArr) {
        var currentIndex = 0;
        setTimeout(function loop () {
                inArr[currentIndex].click();
                return (++currentIndex == inArr.length)? false: setTimeout(loop, 1500);
            }
            , 1000);
    };

    h(readyToHarvest);
    return true;
}

function waitHarvestingThenCheckNextActions() {
    if (!document.querySelector("a[href*='harvestLink']")) {
        console.log("Harvesting ends");
        return refreshPage();
    }
    console.log("Harvesting...");
    return setTimeout(waitHarvestingThenCheckNextActions, 2000);
}
*/

//

function checkRoulette() {
    if (sessionContains("nextRoulette")) {
        var nextRoulette = parseInt(sessionStorage.nextRoulette);
        if (sessionStorage.nextRoulette < Date.now()) {
            console.log("2 hours passed. Openning");
            openRoulette();
            return true;
        }
        return false;
    }
    console.log("Next roulette is undefined, opening roulette");
    return openRoulette();
}

function openRoulette() {
    sessionStorage._actionToDo = "roulette";
    return doActionClick(document.querySelector("a[href='village']"));
}

init();

if (isLoaded) {
    var whoIs = whoIsWorking();
    //var available_buttons_array = [];

    loadParams();
        var pathname = (window.location.pathname.indexOf("/garden/bed/") === -1)? window.location.pathname : window.location.pathname.slice(0, -2);

    switch (pathname) {
        case "/":
            if (whoIs === "user") {
                break;
            }

            console.log("Doing something in bed");
            break;

        case "/garden":
            if (whoIs === "user") {
                break;
            }

            if (sessionStorage.garden === "true" && isGardenReady()) {
                // Let timers do their work, breaking from switch to prevent 'crossfire'
                break;
            }
            if (sessionStorage.roulette === "true" && checkRoulette()) {
                // Let timers do their work, breaking from switch to prevent 'crossfire'
                break;
            }

            openHomePageAfterMins();

            break;

        case "/garden/bed":
            if (whoIs === "user") {
                break;
            }

            startActionWheel();

            /*console.log("case: " + window.location.pathname);
            if (sessionStorage._actionToDo === "watering") {
                sessionStorage.removeItem("_actionToDo");
                startActionWheel();
//                harvestCurrentBed();
//                waitHarvestingThenCheckNextActions();
            }*/
            break;

        case "/village":
            if (whoIs === "user") {
                break;
            }

            var nextActionLink = document.querySelector("a[href='" + sessionStorage._actionToDo + "']");
            console.log("Village. Going in " + sessionStorage._actionToDo);
            sessionStorage.removeItem("_actionToDo");
            doActionClick(nextActionLink);
            break;

        case "/roulette":
            if (whoIs === "user") {
                break;
            }

            var btn = document.querySelector("a.f-panel.f-panel-bblue.f-panel-bigger");
            if (btn) {
                doActionClick(btn);
                sessionStorage.nextRoulette = Date.now() + 7200000;
                break;
            }
            console.log("Can't press roulette. Will check in 1 min");
            sessionStorage.nextRoulette = Date.now() + 60000;
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