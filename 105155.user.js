// ==UserScript==

// @name           NeoBux Plus+

// @description    Este Script te provee información detallada de tu cuenta de NeoBux y está basado en el Script NeoBux Plus de Dobrin Dobrev

// @author         Dobrin Dobrev

// @homepage       http://twitter.com/ReyDiazxD

// @namespace      http://userscripts.org/users/349215

// @include        http://www.neobux.com/c/

// @include        http://www.neobux.com/c/rl/*

// @include        http://www.neobux.com/c/rs/

// @license        GNU General Public License v3.0

// @version        3.4.110705.5

// ==/UserScript==



(function () {

    var version = "3.4.110705.5";

    var root = "greasemonkey.scriptvals.http://userscripts.org/users/349215/NeoBux Plus+.";

    var loggingLevel = [0];

// Log Type

// x = debugging;

// 0 = No Logging;

// 1 = Log Everything;

// 2 = Function Calls;

// 3 = CurrentPage Reasoning;

// 4 = CurrentPage outcome;

// 5 = Account stats;

// 6 = Graph details;

// 7 = Referral details;

// 8 = Manipulating preferences;

// 9 = NumDaysSince();

// 10 = graphProperties();

// 11 = neobuxString();

// 12 = graphProperties() && referral details --> detailed



// DEFINE Language Strings used by NeoBux

    var neobuxLangStrings = {

// Language strings for the actual NeoBux website

// To allow the script to run in English and other languages

        US: {

            "noClicks": "No clicks yet",

            "today": "Today",

            "yesterday": "Yesterday"

        },

        PT: {

            "noClicks": "Sem cliques",

            "today": "Hoje",

            "yesterday": "Ontem"

        },

        ES: {

            "noClicks": "Sin clics aún",

            "today": "Hoy",

            "yesterday": "Ayer",

        // REFERRAL STATISTICS PAGE

            "totalClickAvg": "Avg. Total de Clicks",

            "lastdaysClickAvg": "Avg. de Clicks",

            "totalClicks": "Clicks Totales",

            "clickedToday": "Clickearon Hoy",

            "clickedYday": "Clickearon Ayer",

            "others": "Otros Días",

            "dailyNetIncome": "Ingreso Neto Diario",

            "avgIncome": "Ingreso Promedio",

            "avgExpenses": "Egreso Promedio",

            "avgARecycling": "Avg. Reciclaje Aut",

            "avgTransfersRB": "Avg. Transf SA",

            "avgTransfersGPB": "Avg. Transf SPG",

// STATISTICS SUMMARY (SIDEBAR)

            "statsSum": "Resumen de Estadísticas",

            "today": "Hoy",

            "yesterday": "Ayer",

            "rented": "Rentados",

            "direct": "Directos",

            "clicks": "Clicks",

            "avg": "Avg",

            "avgs": "avgs",

            "average": "Promedio",

            "raverage": "Avg. Real", // Real Average

            "averages": "Promedios",

            "Recycle": "Reciclaje",

            "autopay": "Autopago",

            "renew": "Renovaciones",

            "net": "Neto",

            "projectedNet": "Neto Proyectado",

            "last": "Últimos", //Last 10 days

            "totals": "Totales",

            "Days": "Días",

            "recycled": "Reciclado",

            "autopaid": "Autopagado",

            "updateScript": "Actualizar Script",

            "refferalsToBeRenewed": "Referidos a ser Renovados",

            "recycledLast": "Reciclados en los Últimos",

            "autopaidLast": "Autopagados en los Últimos",

            "totalReferrals": "Referidos Totales:",

            "income": "Ingreso",

            "stats": "Estadísticas",

            "summary": "Resumen",

            "projectedIncome": "Ingreso Proyectado",

            "zeroClickers": "Cero-Clickers",

            "automaticRecycling": "Reciclaje Aut.", // Automatic Recycling

// FLAGS

            "W": "B", // White Flag

            "R": "R", // Red Flag

            "O": "N", // Orange Flag

            "Y": "Am", // Yellow Flag

            "G": "V", // Green Flag

            "B": "Az", // Blue Flag

// REFERRAL PROFIT POPUP

            "referral": "Referido",

            "expenses": "Gastos",

            "goldenFee": "Cuota Golden",

            "goldenPackFee": "Cuota de Paquete-Golden",

            "totalExpenses": "Gastos Totales",

            "perRefPerDay": "por Ref por día",

            "minimumAverage": "Avg Mínimo",

            "toBreakEven": "para cubrir gastos",

            "grossIn": "Ingresos Brutos",

            "grossOut": "Gastos Brutos",

            "currentProfit": "Beneficios Actuales",

            "incl": "incluyendo", // Including

            "recycle": "reciclaje",

            "netProfit": "Beneficio Neto",

            "daysToPayForOwnRecycle": "Días para pagar su propio reciclaje",

            "day": "día",

// UPDATES

            "newUpdateFoundFor": "Una nueva actualización ha sido encontrada:",

            "updateDesc": "Descripción de Actualización",

            "updateNow": "Actualizar ahora",

            "remindMeLater": "Recordar más tarde",

            "dismiss": "Rechazar",

            "forUpdates": "actualizaciones",

            "for": "para",

            "enableUpdates": "%s: Activar Actualizaciones",

            "disableUpdates": "Desactivar",

            "updates": "actualizaciones",

            "noUpdatesAvailableFor ": "No hay actualizaciones automáticas para %s",

            "autoUpdates": "Actualización automática",

            "newVersionAvailable": "Una nueva versión del script de usario %s está disponible.",

            "currentVersion": "Versión actual: %s",

            "availableVersion": "Versiones disponibles: %s",

            "notesAboutTheAvailableVersion": "Notas de las versiones disponibles:\n%s",

            "doYouWishToUpdateTo": "¿Desea actualizar a %s?",

            "doYouWishToTurnOffAutoUpdates": "¿Desea desactivar las actualizaciones automáticas para este script?",

            "autoUpdatesCanBeReenabled": "Actualizaciones automáticas pueden ser re-activadas para este script desde el submenu de Comandos de User Script.",

// MENUS

            "setAVGDays": "Ingrese el valor de días para el Intervalo de Promedios",

            "avgDaysMsg": "Por favor ingrese el valor de días para los promedios.",

            "showSTD": "Mostrar Desviación Estandard",

            "on": "On",

            "off": "Off",

            "error": "Errores",

            "days": "días",

            "editUpdateFrequency": "Editar Frecuencia de Actualización",

            "checkForUpdates": "%s: Buscar Actualizaciones"

        },

        GR: {

            "noClicks": "Χωρίς κλικ",

            "today": "Σήμερα",

            "yesterday": "Χθες"

        },

        ID: {

            "noClicks": "Belum ada klik",

            "today": "Hari ini",

            "yesterday": "Kemarin"

        },

        FI: {

            "noClicks": "Ei klikkejä",

            "today": "Tänään",

            "yesterday": "Eilen"

        },

        SE: {

            "noClicks": "Inga klick",

            "today": "Idag",

            "yesterday": "Igår"

        },

        DE: {

            "noClicks": "Keine Klicks",

            "today": "Heute",

            "yesterday": "Gestern"

        },

        FR: {

            "noClicks": "Pas de clics",

            "today": "Aujourd'hui",

            "yesterday": "Hier"

        }

    };



// DEFINE Language Strings used by the Script

    var scriptLangStrings = {

// Language Strings used by the script

// List of country codes: http://www.iso.org/iso/english_country_names_and_code_elements

        US: {

// English = US

// REFERRAL STATISTICS PAGE

            "totalClickAvg": "Avg. Total de Clicks",

            "lastdaysClickAvg": "Avg. de Clicks",

            "totalClicks": "Clicks Totales",

            "clickedToday": "Clickearon Hoy",

            "clickedYday": "Clickearon Ayer",

            "others": "Otros Días",

            "dailyNetIncome": "Ingreso Neto Diario",

            "avgIncome": "Ingreso Promedio",

            "avgExpenses": "Egreso Promedio",

            "avgARecycling": "Avg. Reciclaje Aut",

            "avgTransfersRB": "Avg. Transf SA",

            "avgTransfersGPB": "Avg. Transf SPG",

// STATISTICS SUMMARY (SIDEBAR)

            "statsSum": "Resumen de Estadísticas",

            "today": "Hoy",

            "yesterday": "Ayer",

            "rented": "Rentados",

            "direct": "Directos",

            "clicks": "Clicks",

            "avg": "Avg",

            "avgs": "avgs",

            "average": "Promedio",

            "raverage": "Avg. Real", // Real Average

            "averages": "Promedios",

            "Recycle": "Reciclaje",

            "autopay": "Autopago",

            "renew": "Renovaciones",

            "net": "Neto",

            "projectedNet": "Neto Proyectado",

            "last": "Últimos", //Last 10 days

            "totals": "Totales",

            "Days": "Días",

            "recycled": "Reciclado",

            "autopaid": "Autopagado",

            "updateScript": "Actualizar Script",

            "refferalsToBeRenewed": "Referidos a ser Renovados",

            "recycledLast": "Reciclados en los Últimos",

            "autopaidLast": "Autopagados en los Últimos",

            "totalReferrals": "Referidos Totales:",

            "income": "Ingreso",

            "stats": "Estadísticas",

            "summary": "Resumen",

            "projectedIncome": "Ingreso Proyectado",

            "zeroClickers": "Cero-Clickers",

            "automaticRecycling": "Reciclaje Aut.", // Automatic Recycling

// FLAGS

            "W": "B", // White Flag

            "R": "R", // Red Flag

            "O": "N", // Orange Flag

            "Y": "Am", // Yellow Flag

            "G": "V", // Green Flag

            "B": "Az", // Blue Flag

// REFERRAL PROFIT POPUP

            "referral": "Referido",

            "expenses": "Gastos",

            "goldenFee": "Cuota Golden",

            "goldenPackFee": "Cuota de Paquete-Golden",

            "totalExpenses": "Gastos Totales",

            "perRefPerDay": "por Ref por día",

            "minimumAverage": "Avg Mínimo",

            "toBreakEven": "para cubrir gastos",

            "grossIn": "Ingresos Brutos",

            "grossOut": "Gastos Brutos",

            "currentProfit": "Beneficios Actuales",

            "incl": "incluyendo", // Including

            "recycle": "reciclaje",

            "netProfit": "Beneficio Neto",

            "daysToPayForOwnRecycle": "Días para pagar su propio reciclaje",

            "day": "día",

// UPDATES

            "newUpdateFoundFor": "Una nueva actualización ha sido encontrada:",

            "updateDesc": "Descripción de Actualización",

            "updateNow": "Actualizar ahora",

            "remindMeLater": "Recordar más tarde",

            "dismiss": "Rechazar",

            "forUpdates": "actualizaciones",

            "for": "para",

            "enableUpdates": "%s: Activar Actualizaciones",

            "disableUpdates": "Desactivar",

            "updates": "actualizaciones",

            "noUpdatesAvailableFor ": "No hay actualizaciones automáticas para %s",

            "autoUpdates": "Actualización automática",

            "newVersionAvailable": "Una nueva versión del script de usario %s está disponible.",

            "currentVersion": "Versión actual: %s",

            "availableVersion": "Versiones disponibles: %s",

            "notesAboutTheAvailableVersion": "Notas de las versiones disponibles:\n%s",

            "doYouWishToUpdateTo": "¿Desea actualizar a %s?",

            "doYouWishToTurnOffAutoUpdates": "¿Desea desactivar las actualizaciones automáticas para este script?",

            "autoUpdatesCanBeReenabled": "Actualizaciones automáticas pueden ser re-activadas para este script desde el submenu de Comandos de User Script.",

// MENUS

            "setAVGDays": "Ingrese el valor de días para el Intervalo de Promedios",

            "avgDaysMsg": "Por favor ingrese el valor de días para los promedios.",

            "showSTD": "Mostrar Desviación Estandard",

            "on": "On",

            "off": "Off",

            "error": "Errores",

            "days": "días",

            "editUpdateFrequency": "Editar Frecuencia de Actualización",

            "checkForUpdates": "%s: Buscar Actualizaciones"

        }

    };



// Check if the Greasemonkey API functions are present

// If not, add/insert them

    var GM = {

        getValue: function (name, defaultValue) {

            var value;

            if (typeof GM_getValue === "function") {

                return GM_getValue(name, defaultValue);

            } else if (typeof localStorage === "object" &&

                        typeof localStorage.getItem === "function") {

                name = root + name;

                value = localStorage.getItem(name);

                if (value === null) {

                    return defaultValue;

                } else {

                    return value;

                }

            } else {

                return defaultValue;

            }

        },

        setValue: function (name, value) {

            if (typeof GM_setValue === "function") {

                return GM_setValue(name, value);

            } else if (typeof localStorage === "object" &&

                        typeof localStorage.setItem === "function") {

                name = root + name;

                return localStorage.setItem(name, value);

            }

        },

        addStyle: function (css) {

            var

                head,

                style;

            if (typeof GM_addStyle === "function") {

                return GM_addStyle(css);

            } else {

                head = document.getElementsByTagName("head")[0];

                if (head) {

                    style = document.createElement("style");

                    style.textContent = css;

                    style.type = "text/css";

                    head.appendChild(style);

                }

                return style;

            }

        },

        xmlhttpRequest: function (details) {

            if (typeof GM_xmlhttpRequest === "function") {

                return GM_xmlhttpRequest(details);

            }

        },

        log: function (message) {

            if (typeof GM_log === "function") {

                return GM_log(message);

            } else if (typeof console === "object" &&

                    typeof console.log === "function") {

                return console.log(message);

            }

        }

    };



    function manipulatePrefs(name, value, type) {

        if (type === "set") {

            return GM.setValue(name, value);

        } else if (type === "get") {

            return GM.getValue(name, value);

        } else {

            return value;

        }

    }



    function toBool(string) {

        if (string && string.toString().toLowerCase() === "true") {

            return true;

        } else {

            return false;

        }

    }



    function fix(number) {

        if (isNaN(number)) {

            return myAccount.preferences.nanString;

        } else {

            return number.toFixed(myAccount.preferences.decimalPrecision);

        }

    }



    function selectNode(xpathExpression) {

        return document.evaluate(xpathExpression, document, null,

                XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

    }



    function selectNodes(xpathExpression) {

        var

            i,

            nodes,

            snapshot;

        snapshot = document.evaluate(xpathExpression, document, null,

                XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

        nodes = new Array(snapshot.snapshotLength);

        for (i = 0; i < snapshot.snapshotLength; i += 1) {

            nodes[i] = snapshot.snapshotItem(i);

        }

        return nodes;

    }



    function getCurrentPage(requestType) {

        customLogger("|| - getCurrentPage(requestType)", 2);

// Do not consider the URL hash (was causing problems: the hash was being included in the final variable value)

        var documentLocation = document.location.href.split("#")[0];

        if ("location" === requestType) {

            var currentPage;

            if (documentLocation.indexOf("/c/rs/") > -1) {

                customLogger("/c/rs/, therefore referral statistics", 3);

                currentPage = "refStats";

            } else if (documentLocation.indexOf("/c/rl/") > -1) {

                customLogger("/c/rl/, therefore referral listings", 3);

                if (documentLocation.indexOf("ss3=1") > -1) {

                    customLogger("ss3=1, therefore direct referral listings", 3);

                    currentPage = "directRefListing";

                } else if (documentLocation.indexOf("ss3=2") > -1) {

                    customLogger("ss3=2, therefore rented referral listings", 3);

                    currentPage = "rentedRefListing";

                }

            } else if (documentLocation.indexOf("/c/") > -1) {

                currentPage = "accSummary";

            } else {

                customLogger("unknown page", 3);

                currentPage = "unknown";

            }

            return currentPage;

        } else if (requestType === "language") {

            var languageIndex = document.body.innerHTML.indexOf("c0 f-") + 5;

            if (languageIndex > 4) {

                return document.body.innerHTML.substring(languageIndex, languageIndex + 2).toUpperCase();

            } else {

                return "US";

            }

        }

    }



// Definitions of Functions used by the script

// Functions used by classes



    function getAccountType(verbose) {

        var accountType;

        accountType = selectNode("//div[@class='tag'][last()]").textContent.replace(/^\s+|\s+$/g, "");

        if (verbose === true) {

            return accountType;

        } else {

            switch (accountType) {

            case "Standard":

            case "Pioneer":

                return 0;

            case "Golden":

                return 1;

            case "Emerald":

                return 2;

            case "Sapphire":

                return 3;

            case "Platinum":

                return 4;

            case "Diamond":

                return 5;

            case "Ultimate":

                return 6;

            default:

                return -1;

            }

        }

    }



    function getNumberOfRefs(refType) {

        var

            numberOfRefs,

            spanRefs;

        customLogger("||- getRefsFunction.. refType = " + refType, 2);

// If the current referrals page matches the requested "refType", grab the number of refs from the page and store the value

// Else the current page and requested "refType" are mismatched so grab the number of refs from the stored values

        if ((currentPage.name === "rentedRefListing" && refType === "Rented") ||

                (currentPage.name === "directRefListing" && refType === "Direct")) {

            spanRefs = selectNode("//span[@class='f_b']");

// If there are some digits on the page within <h1></h1> tags, grab them 

// Bugfix: This will match the '30' in the error message alerting the user that they must be at least 30 days old to have direct refs

// --> Added test for a colon ':' to prevent this happening

            if (spanRefs.textContent.match(/\d+/)) {

                numberOfRefs = parseInt(spanRefs.textContent.match(/\d+/), 10);

            } else {

// If digits cannot be found, set the number of refs to zero (0)

                numberOfRefs = 0; 

            }

// Store the number of detected referrals

            manipulatePrefs("numberOf" + refType + "Refs", numberOfRefs.toString(), "set");

        }

// Now that the stored values have been updated / created, retrieve and return them

        switch (refType) {

        case "Rented":

            numberOfRefs = Number(manipulatePrefs("numberOfRentedRefs", 0, "get"));

            customLogger("getting numberOfRefs (" + refType + ") = " + numberOfRefs, "get");

            break;

        case "Direct":

            numberOfRefs = Number(manipulatePrefs("numberOfDirectRefs", 0, "get"));

            customLogger("getting numberOfRefs (" + refType + ") = " + numberOfRefs, "get");

            break;

        }

        return numberOfRefs;

    }



    function getAutoPayLimit(accountType) {

// Function that returns the autopay limit (minimum days left for autopay to apply) for each account type

        customLogger("||- getAutoPayLimit()", 2);

        customLogger("accountType = " + accountType, 2);

// 0 == Standard or Pioneer

// 1 == Golden

// 2 == Emerald

// 3 == Sapphire

// 4 == Platinum

// 5 == Diamond

// 6 == Ultimate

        switch (accountType) {

        case 0:

        case 1:

        case 2:

        case 4:

            return 20;

        case 3:

            return 18;

        case 5:

            return 14;

        case 6:

            return 10;

        }

    }



    function getRecycleCost(accountType) {

        var

            defaultRecycleCost,

            tmp;

// Set the defaults for each account type

        switch (accountType) {

        case 0: 

        case 1:

        case 3:

        case 5:

            defaultRecycleCost = 0.07;

            break;

        case 2:

        case 4:

            defaultRecycleCost = 0.06;

            break;

        case 6:

            defaultRecycleCost = 0.04;

            break;

        default:

            defaultRecycleCost = 0.07;

        }

// If the current page is the rented referral listings,

// store the *actual* recycle cost

        if (currentPage.name === "rentedRefListing") {

            tmp = document.body.innerHTML.match(

                    /var p\=\[([0-9]+[\.]?[0-9]*),([0-9]+[\.]?[0-9]*),([0-9]+[\.]?[0-9]*),([0-9]+[\.]?[0-9]*),([0-9]+[\.]?[0-9]*),([0-9]+[\.]?[0-9]*),([0-9]+[\.]?[0-9]*),([0-9]+[\.]?[0-9]*),([0-9]+[\.]?[0-9]*)\]/);

            if (tmp !== null) {

                recycleCost = tmp[2];

                manipulatePrefs("recycleCost", recycleCost, "set");

            }

        }

// If the varibable 'recycleCost' hasn't been set yet, this will return defaultRecycleCost

// --> if the referral listings pages haven't been viewed yet

// else this will return recycleCost (the actual recycle cost retrieved from the page)

        return Number(manipulatePrefs("recycleCost", defaultRecycleCost, "get"));

    }



    function getRenewalFees(renewalPeriod) {

        var

            renewCost15,

            renewCost30,

            renewCost60,

            renewCost90,

            renewCost150,

            renewCost240,

            tmp;

        if (!renewalPeriod) {

            renewalPeriod = 240;

        }

        if (currentPage.name === "rentedRefListing") {

            tmp = document.body.innerHTML.match(

                    /var p\=\[([0-9]+[\.]?[0-9]*),([0-9]+[\.]?[0-9]*),([0-9]+[\.]?[0-9]*),([0-9]+[\.]?[0-9]*),([0-9]+[\.]?[0-9]*),([0-9]+[\.]?[0-9]*),([0-9]+[\.]?[0-9]*),([0-9]+[\.]?[0-9]*),([0-9]+[\.]?[0-9]*)\]/);

            if (tmp !== null) {

                renewCost15 = tmp[3];

                renewCost30 = tmp[4];

                renewCost60 = tmp[5];

                renewCost90 = tmp[6];

                renewCost150 = tmp[7];

                renewCost240 = tmp[8];

                manipulatePrefs("renewalFees_15days", renewCost15, "set");

                manipulatePrefs("renewalFees_30days", renewCost30, "set");

                manipulatePrefs("renewalFees_60days", renewCost60, "set");

                manipulatePrefs("renewalFees_90days", renewCost90, "set");

                manipulatePrefs("renewalFees_150days", renewCost150, "set");

                manipulatePrefs("renewalFees_240days", renewCost240, "set");

            }

        }

// Return the default renewal period

        if (renewalPeriod === 1) {

            return myAccount.autopayCost;

        } else {

            return Number(manipulatePrefs("renewalFees_" + renewalPeriod + "days", renewCost240, "get"));

        }

    }



    function getGoldenPackCost(accountType) {

// Function that returns the cost of purchasing each account type

// *** EXCLUDING COST OF GOLDEN ***

        switch (accountType) {

        case 0:

        case 1:

            return 0;

        case 2:

        case 3:

            return 290;

        case 4:

        case 5:

            return 490;

        case 6:

            return 890;

        }

    }



    function getAutoPayCost(accountType) {

// Function that returns the autopay cost (per referral) for each account type

        customLogger("||- getAutoPayCost()", 2);

        customLogger("accountType = " + accountType, 2);

        var totalRentedRefs = getNumberOfRefs("Rented");

        var perAutoPayCost = 0;

// 0 == Standard or Pioneer

// 1 == Golden

// 2 == Emerald

// 3 == Sapphire

// 4 == Platinum

// 5 == Diamond

// 6 == Ultimate

//

// CORRECT @ 05/Jul/2011

//

// Referrals,      Standard, Golden, Emerald, Sapphire, Platinum, Diamond, Ultimate

// 0 -> 250,       $0.20,    $0.20,  $0.20,   $0.20,    $0.20,    $0.20,   $0.20

// 251 -> 500,     $0.21,    $0.21,  $0.21,   $0.20,    $0.21,    $0.20,   $0.20

// 501 -> 750,     $0.22,    $0.22,  $0.22,   $0.21,    $0.22,    $0.20,   $0.20

// 751 -> 1000,    $0.23,    $0.23,  $0.23,   $0.22,    $0.23,    $0.21,   $0.20

// 1001 -> 1250,   $0.24,    $0.24,  $0.24,   $0.23,    $0.24,    $0.22,   $0.21

// 1251 -> 1500,   $0.25,    $0.25,  $0.25,   $0.24,    $0.25,    $0.23,   $0.22

// 1501 -> 1750,   $0.26,    $0.26,  $0.26,   $0.25,    $0.26,    $0.24,   $0.23

// over 1750,      $0.27,    $0.27,  $0.27,   $0.26,    $0.27,    $0.25,   $0.24

//

// Monthly Cost, AutoPay

// $0.20,        $0.0057

// $0.21,        $0.0060

// $0.22,        $0.0062

// $0.23,        $0.0065

// $0.24,        $0.0068

// $0.25,        $0.0071

// $0.26,        $0.0074

// $0.27,        $0.0077

        switch (accountType) {

        case 0: // Standard or Pioneer

        case 1: // Golden

        case 2: // Emerald

        case 4: // Platinum

            if (totalRentedRefs <= 250) {

                perAutoPayCost = 0.0057;

            } else if (totalRentedRefs <= 500) {

                perAutoPayCost = 0.0060;

            } else if (totalRentedRefs <= 750) {

                perAutoPayCost = 0.0062;

            } else if (totalRentedRefs <= 1000) {

                perAutoPayCost = 0.0065;

            } else if (totalRentedRefs <= 1250) {

                perAutoPayCost = 0.0068;

            } else if (totalRentedRefs <= 1500) {

                perAutoPayCost = 0.0071;

            } else if (totalRentedRefs <= 1750) {

                perAutoPayCost = 0.0074;

            } else {

                perAutoPayCost = 0.0077;

            }

            break;

        case 3: // Sapphire

            if (totalRentedRefs <= 500) {

                perAutoPayCost = 0.0057;

            } else if (totalRentedRefs <= 750) {

                perAutoPayCost = 0.0060;

            } else if (totalRentedRefs <= 1000) {

                perAutoPayCost = 0.0062;

            } else if (totalRentedRefs <= 1250) {

                perAutoPayCost = 0.0065;

            } else if (totalRentedRefs <= 1500) {

                perAutoPayCost = 0.0068;

            } else if (totalRentedRefs <= 1750) {

                perAutoPayCost = 0.0071;

            } else {

                perAutoPayCost = 0.0074;

            }

            break;

        case 5: // Diamond

            if (totalRentedRefs <= 750) {

                perAutoPayCost = 0.0057;

            } else if (totalRentedRefs <= 1000) {

                perAutoPayCost = 0.0060;

            } else if (totalRentedRefs <= 1250) {

                perAutoPayCost = 0.0062;

            } else if (totalRentedRefs <= 1500) {

                perAutoPayCost = 0.0065;

            } else if (totalRentedRefs <= 1750) {

                perAutoPayCost = 0.0068;

            } else {

                perAutoPayCost = 0.0071;

            }

            break;

        case 6: // Ultimate

            if (totalRentedRefs <= 1000) {

                perAutoPayCost = 0.0057;

            } else if (totalRentedRefs <= 1250) {

                perAutoPayCost = 0.0060;

            } else if (totalRentedRefs <= 1500) {

                perAutoPayCost = 0.0062;

            } else if (totalRentedRefs <= 1750) {

                perAutoPayCost = 0.0065;

            } else {

                perAutoPayCost = 0.0068;

            }

            break;

        }

        return perAutoPayCost;

    }



    /** Compares two objects using

     * built-in JavaScript operators. */

    function ascend(a, b) {

        if (a < b) {

            return -1;

        } else if (a > b) {

            return 1;

        }

        return 0;

    }



    /** Returns an object that contains the count, sum,

     * minimum, median, maximum, mean, variance, and

     * standard deviation of the series of numbers stored

     * in the specified array.  This function changes the

     * specified array by sorting its contents. */

    function Stats(data) {

        this.count = data.length;

    /* Sort the data so that all seemingly

     * insignificant values such as 0.000000003 will

     * be at the beginning of the array and their

     * contribution to the mean and variance of the

     * data will not be lost because of the precision

     * of the CPU. */

        data.sort(ascend);

    /* Since the data is now sorted, the minimum value

     * is at the beginning of the array, the median

     * value is in the middle of the array, and the

     * maximum value is at the end of the array. */

        this.min = data[0];

        var middle = Math.floor(data.length / 2);

        if ((data.length % 2) !== 0) {

            this.median = data[middle];

        } else {

            this.median = (data[middle - 1] + data[middle]) / 2;

        }

        this.max = data[data.length - 1];

    /* Compute the mean and variance using a

     * numerically stable algorithm. */

        var sqsum = 0;

        this.mean = data[0];

        for (var i = 1;  i < data.length;  i += 1) {

            var x = data[i];

            var delta = x - this.mean;

            var sweep = i + 1.0;

            this.mean += delta / sweep;

            sqsum += delta * delta * (i / sweep);

        }

        this.sum = this.mean * this.count;

        this.variance = sqsum / this.count;

        this.sdev = Math.sqrt(this.variance);

    }



    /** Returns a string that shows all the properties and

     * their values for this Stats object. */

    Stats.prototype.toString = function () {

        var s = "tu";

        for (var attr in this) {

            if (typeof(this[attr]) !== "function") {

                s += "  " + attr + " " + this[attr];

            }

        }

        return s;

    };



    function customLogger(logMessage, logType) {

        var

            i,

            override_disableLogging,

            override_enableLogging,

            showMessage;

        if (loggingLevel.indexOf(0) > -1) {

            override_disableLogging = true;

        } else if (loggingLevel.indexOf(1) > -1) {

            override_enableLogging = true;

        } else {

            for (i = 0; i < loggingLevel.length; i += 1) {

                if (logType.toString().indexOf(loggingLevel[i]) > -1) {

                    showMessage = true;

                }

            }

        }

        if ((showMessage && !override_disableLogging) || override_enableLogging) {

            GM.log("Log Message [type: " + logType + "]: \n" + logMessage);

      }

    }



    Config = {

        tabs: {},

        data: {},

        callback: null,

        init: function (settings) {

            Config.settings = settings;

        },

        close: function () {

            document.body.removeChild(Config.$("ConfigBodyWrapper"));

            document.body.removeChild(Config.$("ConfigMask"));

            window.removeEventListener("keyup", Config.keyUpHandler, true);

            if (typeof(Config.callback) === "function") {

                Config.callback();

            }

        },

        show: function (callback) {

            Config.settings = typeof Config.settings !== "undefined" ? Config.settings : Config.tabs;

            Config.callback = typeof callback === "function" ? callback : null;

            if (typeof Config.styleDrawn === "undefined") { // apply styling

                GM.addStyle(

    "#ConfigMask { position: fixed; width: 100%; height: 100%; top: 0; left: 0; background-color: #000; opacity: 0.7; z-index: 9000; } " +

    "#ConfigBodyWrapper { height: 100%; left: 0; padding: 0%; position: fixed; top: 0; white-space: normal; width: 100%; z-index: 9010;} " +

    "#ConfigBody * { background: none; border: none; color: #333; font-family: Helvetica Neue,Arial,Helvetica,sans-serif; font-size: 12px; font-weight: normal !important; line-height: 1.2em; margin: 0 !important; padding: 0 !important; text-decoration: none; } " +

    "#ConfigBody { -moz-border-radius: 5px; background: #f9f9f9; border: 1px outset #333; color: #333; cursor: default; font-family: Verdana, Arial; font-size: 1.2em; height: 80%; margin: 5% auto !important; min-width: 30em; max-width: 55em; overflow: auto; padding: 1em !important; text-align: left; width: 600px; z-index: 9010; } " +

    "#ConfigBody a { color: #000099 !important; text-decoration: underline; } " +

    "#ConfigBody strong, #ConfigContentBox strong { font-weight: bold !important; } " +

    "#ConfigBody h1 { background-color: #999; border-bottom: 1px solid #333; font-size: 1.1em !important; font-weight: bold !important; margin-bottom: 0.75em !important; padding: 0.5em !important; } " +

    "#ConfigBody h2 { font-weight: bold; margin: 0.5em 1em !important; } " +

    "#ConfigBody h1 { font-size: 13px; font-weight: bold; color: #fff; text-decoration: none; } " +

    "#ConfigBody h1 a:hover { text-decoration: underline; } " +

    "#ConfigBody li { list-style-type: circle; } " +

    "#ConfigBody p { font-size: 12px; font-weight: normal; margin-bottom: 1em !important; } " +

    "#ConfigContentPadding { display: block; height: 70%;  margin: 1em !important;} " +

    "#ConfigTabs { line-height: 1.5em !important; margin: 0.5em 0.5em -0.2em 0 !important; text-align: justify; } " +

    "#ConfigTabs span { -moz-border-radius: 5px 5px 0 0; background-color: #ddd; border: 1px solid #666; cursor: pointer; margin-right: -2px !important; padding: 2px 10px !important; position: relative; top: -2px; } " +

    "#ConfigTabs span:hover { background-color: #eee; } " +

    "#ConfigTabs span.active { background-color: #F9F9F9; cursor: inherit; border-bottom: none; font-weight: bold; padding-top: 3px !important; top: -1px; } " +

    "#ConfigTabs span.active:hover { background-color: #F9F9F9; } " +

    "#ConfigContentBox { border: 1px inset #666; height: 80%; overflow: auto; padding: 1.5em 1em 1em !important; } " +

    "#ConfigContentBox table { border-collapse: collapse !important; margin: 0 15px !important; min-width: 85%; } " +

    "#ConfigContentBox td { font-weight: normal; } " +

    "#ConfigContentBox input { border: 1px inset #666 !important; width: 4em !important; } " +

    "#ConfigContentBox td.fieldLabel { font-weight: bold !important; padding-right: 0.5em !important; text-align: right !important; } " +

    "#ConfigContentBox td select { border: 1px inset #666; min-width: 4em !important; } " +

    "#ConfigHistory { border: 1px inset #999; margin: 0 1em 1em 1em !important; max-height: 150px; overflow-y: auto; padding: 0 1em 1em !important; width: 448px; } " +

    "#ConfigHistory ul { margin-left: 2em !important; } " +

    "#ConfigClose { cursor: pointer; float: right; height: 14px; opacity: 0.5; } " +

    "#ConfigClose:hover { opacity: 0.9; } " +

    "#ConfigFooter { border: 1px solid; bottom: 0px; display: block; margin: 3% 5% !important; padding: 1em 2em !important; width: 80%; } " +

    "#ConfigFooter input { -moz-border-radius: 3px; background: no-repeat 4px center #eee; border: 1px outset #666; cursor: pointer; float: right; padding: 3px 5px 5px 20px !important; margin-left: 0.5em !important; width: 120px; } " +

    "#ConfigFooter input:hover { background-color: #f9f9f9; } " +

    "#ConfigFooter select { border: 1px inset #666; } " +

    "#ConfigContentBox #ConfigFieldTable td { border: 1px solid #555; padding: 3px !important; }");

                if ("undefined" !== typeof Config.css) {

                    GM.addStyle(Config.css);

                }

                Config.styleDrawn = true;

            }

// Create and insert config background mask

// noticeBg is needed because the reduced opacity is inherited by config area if applied to the noticeWrapper instead

            var noticeBg = document.createElement("div");

            noticeBg.id = "ConfigMask";

            noticeBg.style.height = "100%";

            noticeBg.style.width = "100%";

            document.body.appendChild(noticeBg);

// Create config window

            var noticeWrapper = document.createElement("div");

            noticeWrapper.id = "ConfigBodyWrapper";

            var notice = document.createElement("div");

            notice.id = "ConfigBody";

// Create heading

            var html = "<h1><img src='" + Config.icons.config + "' align='absmiddle' style='margin-top: -2px;'/>" +

                    (typeof Config.scriptName === "string" ? " " + Config.scriptName : "") + " Options <span><a href='http://userscripts.org/users/173064/scripts' style='float: right; color: #444499 !important; font-weight: bold !important; font-size: 1.2em;'><small>More scripts for NeoBux at</small> userscripts.org</a></span></h1>";

// Container for settings stuff

            html += "<div id='ConfigContentPadding'>";

// Tab bar

            html += "<div id='ConfigTabs'>";

// Draw tabs

            var i = 0;

            var firstTabId = "";

            var label;

            var id;

            for (label in Config.settings) {

                id = "configTab" + label.replace(/\s/g, "_");

                label = label.replace(" ", "&nbsp;");

                html += "<span id='" + id + "'>" + label + "</span> "; // Space after </span> is to fix tab-wrapping bug

                firstTabId = (i === 0 ? id : firstTabId);

                i += 1;

            }

            html += "</div>";

// Draw container for config to be inserted into later

            html += "<div id='ConfigContentBox'>";

            html += "</div>";

            html += "</div>";

// End actual config stuff

// Create footer

            html += "<div id='ConfigFooter'>" +

                    "<input type='button' id='ConfigCloseButton' value='Guardar' style='background-image: url(\"" + Config.icons.save + "\")'/>" +

                    "<span style='font-size: 0.9em; font-style: italic;'>Nota: Necesitarás refrescar la página para ver los cambios.<br/>Presiona la tecla Escape para salir.</span>" +

                    "</div>";

// End configBody

            html += "</div>";

            notice.innerHTML = html;

            noticeWrapper.appendChild(notice);

            document.body.appendChild(noticeWrapper);

// Add tab change listeners

            for (label in Config.settings) {

                id = "configTab" + label.replace(/\s/g, "_");

                Config.$(id).addEventListener("click", function () { Config.activateTab(this.id); }, false);

            }

// Add escape key press and other listener

            Config.activateTab(firstTabId);

            window.addEventListener("keyup", Config.keyUpHandler, true);

            Config.$("ConfigCloseButton").addEventListener("click", Config.close, true);

        },

// -------------------------------- "private" methods -----------------------------------------

        activateTab: function (id) {

// deactivate current tab

            var elems = Config.$("ConfigTabs").getElementsByTagName("span");

            for (var i = 0; i < elems.length; i += 1) {

                elems[i].className = "";

            }

// set current tab

            Config.$(id).className = "active";

            var key = id.replace(/^configTab/, "").replace(/_/g, " ");

            var fields = Config.settings[key].fields;

//

            var html = (typeof Config.settings[key].html === "string" ? Config.settings[key].html : "");

            html += "<table id='ConfigFieldTable'>";

            for (var fieldName in fields) {

                var field = fields[fieldName];

                var type = typeof field.type !== "string" ? "html" : field.type;

                var tip = typeof field.tip === "string" ? field.tip : "";

                var width = typeof fields[fieldName].width !== "undefined" ? (fields[fieldName].width.toString().match(/em/) ? fields[fieldName].width : (fields[fieldName].width.toString().match(/px/) ? fields[fieldName].width : fields[fieldName].width + "px")) : false;

                var height = typeof fields[fieldName].height !== "undefined" ? (fields[fieldName].height.toString().match(/em/) ? fields[fieldName].height : (fields[fieldName].height.toString().match(/px/) ? fields[fieldName].height : fields[fieldName].height + "px")) : false;

                var fieldHTML = "";

                switch (type) {

                case "spacer":

                    html += "<tr title='" + tip + "'><td colspan='2' style='height: " + height + "; border: 0px none;'>";

                    break;

                case "html":

                    html += "<tr title='" + tip + "'><td colspan='2' style='height: " + height + "; border: 0px none;'>";

                    html += field.html;

                    break;

                case "select":

                    html += "<tr title='" + tip + "'><td colspan='1' class='fieldLabel'>" +

                            (typeof field.label === "string" ? field.label : "") +

                            "</td><td style='padding-top: 0px; padding-bottom: 0px;'>";

                    fieldHTML += "<select id='configInput_" + fieldName + "'>";

                    if (typeof field.options === "undefined") {

                        alert("Options Error: " + fieldName + " of type 'select' is missing the 'options' property");

                    } else {

                        for (var text in field.options) {

                            var val = field.options[text];

                            fieldHTML += "<option value='" + val + "'" + (Config.get(fieldName).toString() === val ? " selected" : "") + ">" + text + " &nbsp;</option>";

                        }

                    }

                    fieldHTML += "</select>";

                    break;

                case "password":

                case "text": 

                    html += "<tr title='" + tip + "'><td colspan='1' class='fieldLabel'>" +

                            (typeof field.label === "string" ? field.label : "") + "</td><td>";

                    fieldHTML += "<input id='configInput_" + fieldName + "' value='" + Config.get(fieldName) + "' style='" + (width ? "width: " + width + ";" : "") + " font-family: monospace, courier new;' type='" + type + "'/>";

                    break;

                case "checkbox":

                    html += "<tr title='" + tip + "'><td colspan='1' class='fieldLabel'>" +

                            (typeof field.label === "string" ? field.label : "") + "</td><td>";

                    fieldHTML += "<input id='configInput_" + fieldName + "' type='checkbox' style='position: relative; top: 2px;'" + (Config.get(fieldName) ? "checked" : "") + "/>";

                    break;

                }

                html += typeof fields[fieldName].text === "string" ? "<table><tr><td style='border: 0px none; margin: 0px;'>" + fieldHTML + "</td><td style='border: 0px none; margin: 0px;'> &nbsp; - " + (fields[fieldName].text) + "</td></tr></table>" : "";

                html += "</td></tr>";

            }

            html += "</table>";

// add check for updates

            if (id === "configTabAbout" && typeof ScriptUpdater === "object" && typeof ScriptUpdater.scriptId !== "undefined") {

                html += "<p><br/><a href='javascript: void(0)' id='ConfigCheckUpdatesLink'>Check for updates</a></p>";

            }

// Insert config HTML

            Config.$("ConfigContentBox").innerHTML = html;

// Add event listeners -- will cause the settings to be edited immediately after change

            for (var fieldName in fields) {

                switch (fields[fieldName].type) {

                case "checkbox":

                    Config.$("configInput_" + fieldName).addEventListener("change",

                            function () {

                                Config.set(this.id.toString().match(/configInput_(.+)$/)[1], this.checked ? true : false);                                 

                            },

                            false);

                    break;

                case "select":

                    Config.$("configInput_" + fieldName).addEventListener("change",

                            function () {

                                Config.set(this.id.toString().match(/configInput_(.+)$/)[1], this.value);                                 

                            },

                            false);

                    break;

                case "password":

                case "text":

                    Config.$("configInput_" + fieldName).addEventListener("keyup",

                            function () {

                                Config.set(this.id.toString().match(/configInput_(.+)$/)[1], this.value);

                            },

                            false);

                    break;

                }

            }

            if (id === "configTabAbout" && typeof ScriptUpdater === "object" && typeof ScriptUpdater.scriptId !== "undefined") {

                $("#ConfigCheckUpdatesLink")[0].addEventListener("click",

                        function () {

                            ScriptUpdater.forceNotice(ScriptUpdater.scriptId, ScriptUpdater.scriptCurrentVersion);

                        },

                        false);

            }

        },

        keyUpHandler: function (e) {

// 'Escape' closes the config box

            if (e.keyCode === 27) {

                Config.close();

            }

        },

        icons: {

            install: "data: image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAALZSURBVBgZBcFLiFVlAADg7zzuPLzjzDjOMINMitIie5gF+UAkIZSgRQuXLZIWrY021dYIggJdJURElJsoqlWRYA9GshGFCNQeOjoTk6bjeOd5zzn/f07flzRNA459ObcHJ3cM9+1fq2prVa2qa+uh7mAZ9xCxiAV8iu9zgDqEvU9ODOx//dkxALBa1kNrZT202I2TZcVyEd28t+Lb66uHcTwHqEMYH+xJwNyDqJUk8oQsp7eV2tqbytJUK+OpyX5bhtojH07Pv58CxKoabOeEmuUy0al4UNDp0umysM5/KxG8eWbW/u1tj4+2xnKAWFUjG3tSqwWr3ShNEzmyjDQjk8gSaiRxyYUbiy7PduZzgFiW40P9mc56sFY00rSRpaQxkaVkGlmGJnNnqXDq7N9LOJYDhLLcNj7Y0uk2AjRkMZE2iGQaeZOqG2IrCmXY/s1rB+6nALEstk0M9VotG0lKliRSpEjw+YUjPjq3RxkKoSjEsoiQwvMnvusXQ09vK1VGUg1qjVrUqDWKUJoc3emVj3dbWeuEUJZLkEMoyrF2u0+aUEPD19OHNXVQ1kEZgy2bHrZzYq/l7qr766/m3VC0ub+SQyyLDXm7R56SpYlYJ0JdOvzYy2JTi3VUa8x35jwxecBKue7S7E+dXW+nI/nB42dGcWLPI1vdXmrcvBO1++iGUmxqtxb+UtVBqCtVrCwVy3Y/dNBKtZb+OjO1kMeyfA4vXLo6Y3E9t1I0qtjo6goxGB/cKtRRbGr/dmaNDEy4PHfe+etTd8vgSB6r6ukXD+3qf+ulfQDg6OnCJ7+8p6xL3VDaMfqofTuOuHhryrk/fl4tokPz7zRX8lhVM7fvdXx29qrhgX7Dg32G271OHv3dxg09entSvXnqmXcHJGm/6Ru/ad89dmrm9AdXIK9D+GLq4rXJqYvXtmEzNmMTNmGor6fV6utr6YxWfvjzR0P/vDGTh7GvAP4H2uh1wse2x/0AAAAASUVORK5CYII%3D",

            config: "data: image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAALvSURBVBgZBcFNaNUFAADw3//jbe/t6d6cc2/kUpeXsEgUsSSiKIzAQxDdvCgdulgagmBXLx4K7BgRWamnOgSDIj3EusRangwlbVvOyba25tvH23v/z36/oCxLcOr7uaO48sxA9Vg7LbTTQloUtrKihXUsI8cqVvAtfo4Biix78eDItmPnX90FADaTotFOisZqJx9NUta7udnlDT/+vXkc52KAIsua/T0BmHuSqwSBOCCK6a2E9vSGojBUiTg0WvNUoz74xeTjT0OAPE376zFZwXoSaKU86dLq0OqwssXSRg4uXn/o2Fjd80OVXTFAnqaD23tCm102O7kwDMSIIsKISCAKKBDka36bXnX7YetxDJAnSbNRi7S2Mu1uKQxLUUiYB6KQSCmKUEYW17o+u/lgDadigCxJ9jb7K1qdUgYlUR4IS+RsPfhFliaeGzkhr+SyJBv74aOX/wsB8qS7d6TRazMpBSFREAjWH0lmflV21lR7e/T19fl3acmbAw+9MzT7CQRlWXrr0k+1OArb3104bvKfVKEE6fSEffv2mZ+f12w2hWFodnbW6Oio8fFxRVHUY8i6ya56vSoMKKAkCAi279bpdCwvL5uYmFCr1Rw4cEC73Vav1786c+ZMO4Q86fbFCnFIFAYEoY17tzSiTcPDw+7fv+/1kxe9e/q8R/PzRkZG7N+///Tly5fL+JVz14dw6eizeyyslWYXc/UqnVZLFEWazabh4WG1Kv19lGVgfX3d3Nyc6elpcZ4kb+DEH3dnrG7FNrqlNC8V2UEjG/MGBxeMjY2ZHP/aVFDa8/RuKysr7ty58yUuxHmaHn77tRdqH598CQDkJde+mcKAhYUFRw4f1Ol0zMzMaDQa8F6tVns/ztN0ZmG55drNuwa21Qz0Vw3UezXqvQYGh1y9etUHH5419fukxcVFy2XTrVufl1mW3bxx40YeHDp5ZQjnsBc7sRM7sAONak+lUq1WHKrds7S05M/yyF84efva2Sn4HxcNUm7wsX3qAAAAAElFTkSuQmCC",

            close: "data: image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIhSURBVDjLlZPrThNRFIWJicmJz6BWiYbIkYDEG0JbBiitDQgm0PuFXqSAtKXtpE2hNuoPTXwSnwtExd6w0pl2OtPlrphKLSXhx07OZM769qy19wwAGLhM1ddC184+d18QMzoq3lfsD3LZ7Y3XbE5DL6Atzuyilc5Ciyd7IHVfgNcDYTQ2tvDr5crn6uLSvX+Av2Lk36FFpSVENDe3OxDZu8apO5rROJDLo30+Nlvj5RnTlVNAKs1aCVFr7b4BPn6Cls21AWgEQlz2+Dl1h7IdA+i97A/geP65WhbmrnZZ0GIJpr6OqZqYAd5/gJpKox4Mg7pD2YoC2b0/54rJQuJZdm6Izcgma4TW1WZ0h+y8BfbyJMwBmSxkjw+VObNanp5h/adwGhaTXF4NWbLj9gEONyCmUZmd10pGgf1/vwcgOT3tUQE0DdicwIod2EmSbwsKE1P8QoDkcHPJ5YESjgBJkYQpIEZ2KEB51Y6y3ojvY+P8XEDN7uKS0w0ltA7QGCWHCxSWWpwyaCeLy0BkA7UXyyg8fIzDoWHeBaDN4tQdSvAVdU1Aok+nsNTipIEVnkywo/FHatVkBoIhnFisOBoZxcGtQd4B0GYJNZsDSiAEadUBCkstPtN3Avs2Msa+Dt9XfxoFSNYF/Bh9gP0bOqHLAm2WUF1YQskwrVFYPWkf3h1iXwbvqGfFPSGW9Eah8HSS9fuZDnS32f71m8KFY7xs/QZyu6TH2+2+FAAAAABJRU5ErkJggg%3D%3D",

            uso: "data: image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAQCAYAAAAiYZ4HAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAh9JREFUeNp0krmLWnEQxyf7zLoajyIWXojIxkK0EiIGCRamCKQwEdIIgYQoQSR/wLY2goVVJGCa1BaL2liKBESFiOJFiMRb1xMVRbx+mfdA0RwDA4/3m+Mz3xmAf9hDNJ/P9zWXy935/f7A5eXlFfzPRCKROBgMfqvX62S5XBLabDbbh8M76zRYKpUqvF5vyGw2P+bz+cBisWCz2cB2u33wV2WFQvEoFArlW60WmUwmZLVakdFoRNxu9xd8Fp51UKlUWmS91ev11zweD5AZMAFmsxkgWhpDpsfKarVaE4lEqpVKhUynU4a73++TcrlMarUa6Xa7G7vd/u4QT93c3HzmcrlPSqUSiMVihrvX68F6vYZsNkvPcOFyuV5Uq9VuoVD4ztrv91wOhwMCgQAGgwEsFguYz+eMSyQSkMvlwGazqUAg8KnRaHSo4XA4Q9leYRdmHrpyJpMBehaDwQBCoRB2ux2gapRSqbymsP2PTqezsFqtz+6hpVIpprLRaGTw8BcgBVOo2WyOj8NbLJaP+Xx+k0gkCL00xGNEoJ2WOZlMznQ6nfVsFyaT6X273d4eAmkfj8ckHo+PNRrNSzrm4jRBq9XysDWF18Cg0OzpdPrO6XS+QRVvz6oj0nOch25NYrEYgxEOhxsymezpadyxA8p5HxUDXBTgSUA0Gv3pcDheI2LiNIE6fOAN/cKkK9RdUSwWkx6P5y0mZv+8ud8CDABidDMA4Sb2JAAAAABJRU5ErkJggg%3D%3D",

            save: "data: image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAH+SURBVBgZBcE9i11VGAbQtc/sO0OCkqhghEREAwpWAWUg8aMVf4KFaJEqQtAipTZWViKiCGOh2Ap2gmJhlSIWFsFOxUK0EsUM3pl79n4f12qHb3z3Fh7D83gC95GOJsDe0ixLk5Qq/+xv/Lw9Xd+78/HLX3Y8fXTr2nWapy4eCFKxG7Fby97SnDlYtMbxthyfzHO//nl85fNvfvnk8MbX5xa8IHx1518Vkrj54Q+qQms2vVmWZjdiu5ZR2rT01166/NCZg/2PFjwSVMU6yjoC1oq+x6Y3VbHdlXWExPd379nf7Nmejv2Os6OC2O4KLK0RNn3RNCdr2Z5GJSpU4o+/TkhaJ30mEk5HwNuvX7Hpi76wzvjvtIwqVUSkyjqmpHS0mki8+9mPWmuWxqYvGkbFGCUAOH/+QevYI9GFSqmaHr5wkUYTAlGhqiRRiaqiNes6SOkwJwnQEqBRRRJEgkRLJGVdm6R0GLMQENE0EkmkSkQSVVMqopyuIaUTs0J455VLAAAAAODW0U/GiKT0pTWziEj44PZ1AAAAcPPqkTmH3QiJrlEVDXDt0qsAAAAAapa5BqUnyaw0Am7//gUAAAB49tEXzTmtM5KkV/y2G/X4M5fPao03n/sUAAAAwIX7y5yBv9vhjW/fT/IkuSp5gJKElKRISYoUiSRIyD1tufs/IXxui20QsKIAAAAASUVORK5CYII%3D"

        },

        getField: function (key) {

            for (var tabName in Config.settings) {

                if (typeof Config.settings[tabName].fields === "object") {

                    var fields = Config.settings[tabName].fields;

                    for (var fieldName in fields) {

                        if (fieldName === key) {

                            return fields[fieldName];

                        }

                    }

                }

            }

            return false;

        },

        get: function (key) {

            var field = Config.getField(key);

            key = typeof Config.prefix === "string" ? Config.prefix + key : key;

            switch (field.type) {

            case "checkbox":

            if (typeof field.value === "undefined" || !field.value) {

                    return (typeof GM.getValue(key) !== "undefined" && GM.getValue(key).toString() === "1") ? true : false; // false by default

                } else {

                    return (typeof GM.getValue(key) !== "undefined" && GM.getValue(key).toString() === "0") ? false : true; // true by default

                }

                break;

            case "select":

            case "password": 

            case "text":

                return typeof GM.getValue(key) === "undefined" ? (typeof field.value !== "undefined" ?  field.value : "") : GM.getValue(key);

            default:

                return typeof GM.getValue(key) === "undefined" ? false : GM.getValue(key);

            }

        },

        set: function (key, value) {

            key = typeof Config.prefix === "string" ? Config.prefix + key : key;

            GM.setValue(key, value.toString());

        },

        $: function (id) {

            return document.getElementById(id);

        }

    };



    function insertLogo() {

        var

            arrowImg,

            img,

            lastColumn,

            row,

            script,

            td;

        row = selectNode("//div[@class='tag'][1]/../..");

        lastColumn = selectNode("//div[@class='tag'][1]/..");

        td = document.createElement("td");

        td.setAttribute("valign", "bottom");

        td.setAttribute("style", "padding-bottom: 3px;");

        row.insertBefore(td, lastColumn);

        img = document.createElement("img"); 

        img.id = "neobuxplus";

        img.src = "data: image;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAFo9M/3AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABDdJREFUeNpiEGZnYFhSn7GHYUZZ+mMWBob/AAHEoC3Kx1AQHczAeO3q5f/KRw8zAAQQo7WmCoOKqtx/aTl1IC3LwPSHU4AhQF+RQfjkYQb+T5cZAAIARAC7/wMWFxoALhYHHggND/EA//4AAI5jRf8AAgT/HRwZ/5WAabACE/P3AOu4tACsqqoA5tnZTwQyTkzzh2tqDRYdHADkEQpVAgCEAHv/AQ8HAACDY1KqDwD6IvwSFTPb6u0AHBIiuBwQBv1mhpZMAE9HPhGqf2768eXj/92wsP8nGBb/5eDg/+iZlv9mXVNUBO719QsGDwkEOi8sAB8jEwDb9fQAWTMxAB1HPgAvHSI/ARAEAAA0NjMAQEBDMy0I+cbW6+IG6PAFbPv8/K2iqsLoAgAIAff+AxUMBwAMAQUABAD8AJR4aKwOFhDb+e3w6DU4NgDz8fAABPr8/AG1elL+zewGzNnm3jRMMChTIQkJmBAaHQvQzc9eApmAdcuw1OMAlrjGNPL9FABZf5cA4PT5aCUmGF0kJhsAAsHZ4ZJXIDcAtbO4AOHNygC5h4MAiZKaAPza5Pzf6usJAgnv5aEnAQQA2+HeANrc4wAQBgMA2+PiAAbl3gSRcXK1AKWOgsduaFv/MwwI/4tbPv8AAwf/PxAL/5+GducoJB4MA/n+BMGIPhduCv0PANzg5AA9BgkAQ2VSAEM/PQyptLd7AQ0AAABcYVkfDAcDOxkL+6UfChb+o8LJIcfS4eL49QAAAlRIN69JxgEcwL8/Xx81p4aK783p2MjVyHSDpjI65daKOgQjCnoZFR1i0KFTLyB1GfQfDDoIBb2ti6uNDSsaY7YHZblMUbdSdKmZOR+d2pPdP8cP+b+CJRyYjN1qHSW0J39svaP2K/W3vCMrNUFTv8djYRTr6rNLn0fD6/TqmZMnEMsXSSgUYgUCPohKIcPEqOPSmJk/u5JIw2y2IlenEN3agb2nD8IOCsU3Yew4t6MXZocbrUIRd+75RjbiqU/cg/0WuIYc1ymp1LEvXek0E0CmNGI7mQEdj4HejIIp1+C2DoD/vYTM3GtEdrOQHLAxkWwuwLl61pvgtSrXarEULt+fQbCnF9P+Z/DPB6D+S1DJFhB48RJPE9/waOMLLrwKwNQSQ1TL3fBdufiWPJw6/0DD/r67s9eAmt6GYmgYVbEUa8F5RFsMlmN5mEFwc/IcLHIF8sFFwH0Y0i4R6LJgmjidgzCoDZLj9v7HHGFrKvx8AZO7dSxqRVCpJGhEfgKUEJ46gzlKAvn4MSh5vIWZJ29OFytFhtss/0IymW7bLFrDeJ/K5TnlpVIDNrbE45AkoZDXKwGrHk3vGHtosLsmaVT/0Pm2PxT++p7ii1mi4APtNuByD0Mml0OvMyG4FoTnqPOISSa5LRKJuzLVhm9p+cOqkLSh0WjxcT2BUoEBl8vBP2Iqng+e/R48AAAAAElFTkSuQmCC";

        img.width = "16";

        img.height = "16";

        img.border = "0";

        img.style.cursor = "pointer";

        img.alt = "NeoBux Plus Greasemonkey Script Preferences";

        img.addEventListener("click", function() { showSettingsEditor(); }, false);

        td.appendChild(img);

        script = document.createElement("script");

        script.textContent = "mk_tt('neobuxplus', 'bm', 'Opciones de<br/>NeoBux Plus+');";

        row.insertBefore(script, lastColumn);

        if (toBool(manipulatePrefs("firstRun", true, "get"))) {

// Code to run when the user first installs the script.

// Add the arrow pointing to the settings editor.

            arrowImg = document.createElement("img");

            arrowImg.src = "data: image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAQCAYAAAGthlVmAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAcpJREFUeNpiuCXPw8B0+scfBoAAYrguyyXFdPXX/6cAAcSwQ4a3e0tM8H+GTmF2hqMyXP8BAojxpgynACMz8wemW3Ye7+/+Y+pjXCPO+f8nw39GJklWRoYnf/4zAAQQ43kpDoY38dn/GdnYGIRn9zOyPP3PyPBj1xYGBkYgDWSzPAYqU3z+mIGRgYHhHpDN9PTPPwZZFkYwfgJkAwQQI8g1z7n5V0l9/RjG9JyBKY+9qCb0KTNbBct7IfFYjtMnGH4IigQzMbx40vLt6kUGhqdPWpm+/fvP8O/2TYZv//8xMH3/x8DAz8zIAKKZvv3/z8DHxMDwHUgzfQdiISagDJAGCNAB2fMQEIRBePZ2jxMkVCjoFBKJRilRXmj8OoXSP1D5aOTUOh+JkCgVhMgdTriz5q7YbDLzPrvvDNaVNLZFE4tmdegM+tppNUabgox14ZQs223b00ytDv32IawUnocdMvNxT2mImZqPO/fLeWLmcvi6LqzVsgvDmKgrf9VCJfVxj0AqIAzxhEy+qCuXW0gmz/uvuAHNc6cW8FYeQySolqURDxHAKfyxt4ikmWaJWa5v0oiIKOCDNE1OC3z8UN8CvvCl6f3w8Uj+AesHuQv9i+2ZAAAAAElFTkSuQmCC";

            arrowImg.setAttribute("style", "position: relative; right: 12px; top: 24px;");

            td.appendChild(arrowImg);

        } else {

            td = document.createElement("td");

            td.innerHTML = "&nbsp;";

            row.insertBefore(td, lastColumn);

        }

    }



    function insertScriptVersion() {

        var

            cell,

            span;

        cell = selectNode("//body/div[1]/table[1]/tbody/tr[last()]/td");

        span = document.createElement("span");

        span.innerHTML =

                "<a class='cinza' " +

                "href='http://userscripts.org/scripts/show/105155'><small>" +

                "<span style='color: #000000'>NeoBux Plus+</span> " + version +

                "&nbsp;&nbsp;&nbsp;&nbsp;</small></a>";

        cell.appendChild(span);

    }



    function firstRun() {

// Code to run when the user first installs the script.

        alert("NeoBux Plus+:\nGracias por instalar el Script Neobux Plus+.");

        alert("NeoBux Plus:\nSe te harán tres (3) preguntas para hacer trabajar el script más rápidamente.\n\nSi deseas cambiar cualquiera de tus respuestas luego o deseas editar cualquiera de las otras configuraciones, haz click en el logo que está en la parte superior derecha de la pantalla al lado del icono de Estadísticas de Referido (Indicado por la flecha que desaparecerá después de dejar esta pantalla).\n\n");

        var renewalLength = prompt("NeoBux Plus+:\n¿Por cuantos días renuevas tus Referidos normalmente?\nNOTA: Sólo ingresa números.\n1 (para AutoPago) o 15 o 30 o 60 o 90 o 150 o 240.");

        if (renewalLength) {

            renewalLength = parseInt(renewalLength, 10);

            if (renewalLength === 1 ||

                    renewalLength === 15 || renewalLength === 30 ||

                    renewalLength === 60 || renewalLength === 90 ||

                    renewalLength === 150 || renewalLength === 240) {

                manipulatePrefs("renewalPeriod", renewalLength.toString(), "set");

            } else {

                alert("NeoBux Plus+ Error:\nEl valor que ingresaste no es válido. El valor se ha configurado por defecto a 240 días. Si deseas cambiar este valor usa el editor de configuraciones.");

            }

        }

        var rentedRefs = prompt("NeoBux Plus+:\n¿Cuantos referidos **RENTADOS** tienes?\nSi clickeas cancelar, el script va a detectar este valor automáticamente la próxima vez que visites la página de referidos rentados.");

        if (rentedRefs && !isNaN(rentedRefs)) {

            manipulatePrefs("numberOfRentedRefs", rentedRefs, "set");

        }

        var directRefs = prompt("NeoBux Plus+:\n¿Cuantos referidos **DIRECTOS** tienes?\nSi clickeas cancelar, el script va a detectar este valor automáticamente la próxima vez que visites la página de referidos directos.");

        if (directRefs && !isNaN(directRefs)) {

            manipulatePrefs("numberOfDirectRefs", directRefs, "set");

        }

// Inform the script that the initial setup is complete.

        manipulatePrefs("firstRun", false.toString(), "set"); 

    }



// DEFINE Classes used by the Script

    var currentPage = new function () {

// Information about the page currently being viewed:

        this.URL = document.location.href;

        this.name = getCurrentPage("location");

        this.language = getCurrentPage("language");

    };



// Store how large the graphs are expected to be

// Recent changes to graphs mean that those that show

// click data are only 10-days long

    var graphSettings = new function (getSet) {

        if (!getSet) {

            var getSet = "get";

        }

        this.refGraphLength = Number(manipulatePrefs("refGraphLength", 10, getSet));

        this.regularGraphLength = Number(manipulatePrefs("regularGraphLength", 15, getSet));

    };



// Information about the users account

    var myAccount = new function () {

        this.name = document.getElementById("t_conta").textContent;

        this.rentedRefCount = getNumberOfRefs("Rented");

        this.directRefCount = getNumberOfRefs("Direct");

        this.getTotalRefCount = this.rentedRefCount + this.directRefCount;

        this.accountType = getAccountType();

        this.autopayLimit = getAutoPayLimit(this.accountType);

        this.autopayCost = getAutoPayCost(this.accountType);

        this.recycleCost = getRecycleCost(this.accountType);

        this.renewalFee = function (renewalPeriod) { return getRenewalFees(renewalPeriod); };

        this.goldenPackCost = getGoldenPackCost(this.accountType);

    if (this.accountType === 0){

            this.ownClickValue = 0.001;

        }    

    if (this.accountType === 1){

            this.ownClickValue = 0.01;

        }

    if (this.accountType === 2 || this.accountType === 3){

            this.ownClickValue = 0.012;

        }

    if (this.accountType === 4 || this.accountType === 5){

            this.ownClickValue = 0.015;

        }

    if (this.accountType === 6){

            this.ownClickValue = 0.02;

        }

        if (this.accountType === 0) {

            this.referralClickValue = 0.005;

            this.dReferralClickValue = 0.0005;

        } else if (this.accountType === 1) {

            this.referralClickValue = 0.01;

            this.dReferralClickValue = 0.005;

        } else {

            this.referralClickValue = 0.01;

            this.dReferralClickValue = 0.01;

        }

// This will later be used to get & store a local copy of user statistics.

// this.avgSpentOnRecycles = the average amount spent on recycling each day

        this.stats = new function (getSet) {

            if (!getSet) {

                var getSet = "get";

            }

// TODO: Fetch this value automatically

            this.avgSpentOnRecycles = 2.608;

        }

// Get user preferences

        this.preferences = new function (getSet) {

            if (!getSet) {

                var getSet = "get";

            }

// Script Settings

            this.updateFrequency = Number(manipulatePrefs("updateFrequency", 86400000, getSet));

            this.updateLastCheck = Number(manipulatePrefs("updateLastCheck", 0, getSet));

// Referral Counts

            this.overrideRentedReferralCount = toBool(manipulatePrefs("overrideRentedReferralCount", false, getSet));

            this.manualRentedReferralCount = Number(manipulatePrefs("manualRentedReferralCount", 0, getSet));

            this.overrideDirectReferralCount = toBool(manipulatePrefs("overrideDirectReferralCount", false, getSet));

            this.manualDirectReferralCount = Number(manipulatePrefs("manualDirectReferralCount", 0, getSet));

// Decimal Precision

            this.decimalPrecision = Number(manipulatePrefs("decimalPrecision", 4, getSet));

            this.nanString = "-." + new Array(this.decimalPrecision + 1).join("-");

// Flags

            this.textifyFlag = toBool(manipulatePrefs("textifyFlag", false, getSet));

            this.textifyFlag_prefix = manipulatePrefs("textifyFlag_prefix", " | ", getSet);

// Account Settings

            this.renewalPeriod = Number(manipulatePrefs("renewalPeriod", 240, getSet)); // 1 (AutoPay) | 15 days | 30 days | 60 days | 90 days | 150 days | 240 days

// Shrinking the contents of the columns

            this.letterSpacing = manipulatePrefs("letterSpacing", "0.0px", getSet);

            this.wordSpacing = manipulatePrefs("wordSpacing", "0.0px", getSet);

// Referral Number column

            this.referralNumber_shrinkContents = toBool(manipulatePrefs("referralNumber_shrinkContents", true, getSet));

// Flag column

            this.flag_shrinkContents = toBool(manipulatePrefs("flag_shrinkContents", true, getSet));

// Referral Name column

            this.referralName_shrinkContents = toBool(manipulatePrefs("referralName_shrinkContents", true, getSet));

// Came From column

            this.cameFrom_shrinkContents = toBool(manipulatePrefs("cameFrom_shrinkContents", true, getSet));

// Owned Since column:

            this.referralSince_numerise = toBool(manipulatePrefs("referralSince_numerise", true, getSet));

            this.referralSince_fullerTimers = toBool(manipulatePrefs("referralSince_fullerTimers", true, getSet));

            this.ownedSinceTimer_shortFormat = toBool(manipulatePrefs("ownedSinceTimer_shortFormat", true, getSet));

            this.referralSince_replace = toBool(manipulatePrefs("referralSince_replace", false, getSet));

            this.ownedSince_shrinkContents = toBool(manipulatePrefs("ownedSince_shrinkContents", true, getSet));

// Next Payment column

            this.nextPayment_shrinkContents = toBool(manipulatePrefs("nextPayment_shrinkContents", true, getSet));

// Last Click column:

            this.lastClick_numerise = toBool(manipulatePrefs("lastClick_numerise", true, getSet));

            this.lastClick_fullerTimers = toBool(manipulatePrefs("lastClick_fullerTimers", true, getSet));

            this.lastClickTimer_shortFormat = toBool(manipulatePrefs("lastClickTimer_shortFormat", true, getSet));

            this.lastClick_replace = toBool(manipulatePrefs("lastClick_replace", false, getSet));

            this.lastClick_replaceNilClicks = toBool(manipulatePrefs("lastClick_replaceNilClicks", false, getSet));

            this.lastClick_shrinkContents = toBool(manipulatePrefs("lastClick_shrinkContents", true, getSet));

// Total Clicks column

            this.totalClicks_shrinkContents = toBool(manipulatePrefs("totalClicks_shrinkContents", true, getSet));

// Average column

            this.exactAverage_show = toBool(manipulatePrefs("exactAverage_show", true, getSet));

            this.exactAverage_seperator = manipulatePrefs("exactAverage_seperator", " | ", getSet);

            this.exactAverage_replace = toBool(manipulatePrefs("exactAverage_replace", false, getSet));

            this.columnPrefix_Average = manipulatePrefs("columnPrefix_Average", "", getSet);

            this.average_shrinkContents = toBool(manipulatePrefs("average_shrinkContents", true, getSet));

// Profit Column

            this.showColumn_Profit = toBool(manipulatePrefs("showColumn_Profit", true, getSet));

            this.includeRecycleCostInProfitColumn = toBool(manipulatePrefs("includeRecycleCostInProfitColumn", true, getSet));

            this.columnPrefix_Profit = manipulatePrefs("columnPrefix_Profit", "$", getSet);

            this.profitColumn_shrinkContents = toBool(manipulatePrefs("profitColumn_shrinkContents", true, getSet));

// Time Periods for 'smaller' 10day graphs

            this.timePeriod_s1 = Number(manipulatePrefs("timePeriod_s1", 5, getSet));

            this.timePeriod_s2 = Number(manipulatePrefs("timePeriod_s2", 7, getSet));

            this.timePeriod_s3 = Number(manipulatePrefs("timePeriod_s3", graphSettings.refGraphLength, getSet));

// Time Periods for 'larger' 15day graphs

            this.timePeriod_1 = Number(manipulatePrefs("timePeriod_1", 5, getSet));

            this.timePeriod_2 = Number(manipulatePrefs("timePeriod_2", 10, getSet));

            this.timePeriod_3 = Number(manipulatePrefs("timePeriod_3", graphSettings.regularGraphLength, getSet));

// Time Period for 'recent' section of the Referral statistics sidebar

            this.timePeriod_recent = Number(manipulatePrefs("timePeriod_recent", 10, getSet));

        }

// Get Preferences for Ultimate-Only Features

        this.ultimatePreferences = new function (getSet) {

            if (!getSet) {

                var getSet = "get";

            }

// Time Period for the 'average1' column (previously the A10 column)

            this.timePeriod_average1 = Number(manipulatePrefs("timePeriod_average1", 10, getSet));

// Time Period for the 'average2' column (previously the A7 column)

            this.timePeriod_average2 = Number(manipulatePrefs("timePeriod_average2", 7, getSet));

// Show Minigraph Average Footer

            this.showRecentAverage = toBool(manipulatePrefs("showRecentAverage", true, getSet));

            this.RA_shrinkContents = toBool(manipulatePrefs("RA_shrinkContents", true, getSet));

// Time Period for Minigraph Average

            this.minigraphAvgInterval = Number(manipulatePrefs("minigraphAvgInterval", 10, getSet));

// 'clickText' column

            this.showColumn_clickText = toBool(manipulatePrefs("showColumn_clickText", true, getSet));

            this.columnPrefix_clickText = manipulatePrefs("columnPrefix_clickText", "", getSet);    

            this.clickText_shrinkContents = toBool(manipulatePrefs("clickText_shrinkContents", true, getSet));

// 'average1' column (previously the A10 column)

            this.showColumn_Average1 = toBool(manipulatePrefs("showColumn_Average1", true, getSet));

            this.columnPrefix_Average1 = manipulatePrefs("columnPrefix_Average1", "", getSet);

            this.average1_shrinkContents = toBool(manipulatePrefs("average1_shrinkContents", true, getSet));

// 'average2' column (previously the A7 column)

            this.showColumn_Average2 = toBool(manipulatePrefs("showColumn_Average2", true, getSet));

            this.columnPrefix_Average2 = manipulatePrefs("columnPrefix_Average2", "", getSet);

            this.average2_shrinkContents = toBool(manipulatePrefs("average2_shrinkContents", true, getSet));

// Standard Deviation (SDEV / SD) Column

            this.showSDEVColumn = toBool(manipulatePrefs("showSDEVColumn", true, getSet));

            this.columnPrefix_SD = manipulatePrefs("columnPrefix_SD", "", getSet);

            this.SD_shrinkContents = toBool(manipulatePrefs("SD_shrinkContents", true, getSet));

// Ratio of Standard deviation and Average (RSA) Column

            this.showColumn_RSA = toBool(manipulatePrefs("showColumn_RSA", true, getSet));

            this.columnPrefix_RSA = manipulatePrefs("columnPrefix_RSA", "", getSet);

            this.RSA_shrinkContents = toBool(manipulatePrefs("RSA_shrinkContents", true, getSet));

        }

    };



    var numberOfRentedReferrals;

    var numberOfDirectReferrals;

    if (myAccount.preferences.overrideRentedReferralCount) {

        numberOfRentedReferrals = myAccount.preferences.manualRentedReferralCount;

    } else {

        numberOfRentedReferrals = myAccount.rentedRefCount;

    }

    if (myAccount.preferences.overrideDirectReferralCount) {

        numberOfDirectReferrals = myAccount.preferences.manualDirectReferralCount;

    } else {

        numberOfDirectReferrals = myAccount.directRefCount;

    }



// mathematical function.. calc num^2

    Math.square = function (num) {

      return num * num;

    };



// Functions used by script

    function getDaysTilPaidOwnRecycle(indivAvg, currentProfit, expensesPerRefPerDay) {

        var incomePerRefPerDay = indivAvg * myAccount.referralClickValue;

        var dayCounter = 0;

        var indivProfit = [];

        var dayLimit = 30;

        var profitNeeded = myAccount.recycleCost - currentProfit;

// Pre-Calculate the amount of profit that will be made after dayCounter days at indivAvg clicks per day

        do {

            dayCounter += 1;

            indivProfit[dayCounter] = dayCounter * (incomePerRefPerDay - expensesPerRefPerDay);

        } while (dayCounter < dayLimit);

// If currentProfit is less than the cost of recycling, return number of days until currentProfit > recycleCost

// Else return 'N/A' to signify that the referral has already generated enough profit to pay for its own recycle

        if (myAccount.recycleCost > currentProfit) {

// Find the point where projected individual profit will be equal to or greater than

// the amount of profit needed to pay for its own recycle

            var numberOfDays = 1;

            while (indivProfit[numberOfDays] < profitNeeded) {

                numberOfDays += 1;

            }

// Check whether the numberOfDays is unreasonably large

// If it is unreasonably large (default max: 30 days), then return a message saying this

            if (numberOfDays > dayLimit) {

                numberOfDays = "Más de " + dayLimit + " días";

            }

            return numberOfDays;

        } else {

            return "N/A";

        }

    }



// Calculate the number of days since the date 'tmp'

// Will work with the words 'today' & 'yesterday' too

    function NumDaysSince(longDate, detail, fullerTimer, shortFormat, column) {

        if (!shortFormat) {

            var shortFormat = false;

        }

        var fullerSinceTimer = fullerTimer;

// Clean the input string and split it to [0] = date, [1] = time

        var longDate = longDate.replace("&nbsp;", "").split(" ");

// If longDate is a date with time (eg, 'owned since' column), longDate[1] === time

// If longDate is just a date (eg, 'last click' column), longDate.length === 1

        var i;

        for (i = 1; i < longDate.length; i += 1) {

            if (longDate[i].indexOf(":") > -1) {

                break;

            }

            longDate[0] += " " + longDate[i];

        }

        if (longDate[longDate.length - 1].indexOf(":") > -1) {

            longDate = [longDate[0], longDate[longDate.length - 1]];

        } else {

            longDate = [longDate[0], "00:00"];

        }

        var tt = longDate[1].split(":");

        var Since;

        if (longDate[0].match(neobuxString("today"))) {

            Since = new Date(Today.getFullYear(), Today.getMonth(), Today.getDate(), tt[0], tt[1]);

        } else if (longDate[0].match(neobuxString("yesterday"))) {

            Since = new Date(Yesterday.getFullYear(), Yesterday.getMonth(), Yesterday.getDate(), tt[0], tt[1]);

        } else {

            Since = new Date(longDate[0] + " " + longDate[1]);

        }

        var timeElapsed = "";

        var dateDiff = (Today - Since) / 86400000;

        var wholeDaysOwned = Math.floor(dateDiff);

        var wholeHoursOwned = Math.floor((dateDiff - wholeDaysOwned) * 24);

        var wholeMinsOwned = Math.floor((((dateDiff - wholeDaysOwned) * 24) - wholeHoursOwned) * 60 );

        if (fullerSinceTimer || detail === "decimal") {

            if (detail === "decimal") {

                timeElapsed = dateDiff;

            } else if (detail !== "days" && detail !== "hrs" && detail !== "mins" && detail !== "wholeDays" && detail !== "decimal") {

                GM.log("Variable 'detail' not valid");

            } else {

                if (!shortFormat) {

                    var day_text = " día";

                    var days_text = " días";

                    var hr_text = " hr";

                    var hrs_text = " hrs";

                    var min_text = " min";

                    var mins_text = " mins";

                } else {

                    var day_text = "d";

                    var days_text = "d";

                    var hr_text = "h";

                    var hrs_text = "h";

                    var min_text = "m";

                    var mins_text = "m";

                }

                var spacer = ", ";

// Chrome bug: ""timeElapsed  +="" must be used repeatedly, else will append values in the wrong order

// eg, (d0, 2h, 48m) instead of (0d, 2h, 48m)

                if (detail === "days" || detail === "hrs" || detail === "mins") {

                    if (wholeDaysOwned !== 1) {

                        timeElapsed += wholeDaysOwned;

                        timeElapsed += days_text;

                    } else {

                        timeElapsed += wholeDaysOwned;

                        timeElapsed += day_text;

                    }

                }

                if (detail === "hrs" || detail === "mins") {

                    if (wholeHoursOwned !== 1) {

                        timeElapsed += spacer;

                        timeElapsed += wholeHoursOwned;

                        timeElapsed += hrs_text;

                    } else {

                        timeElapsed += spacer;

                        timeElapsed += wholeHoursOwned;

                        timeElapsed += hr_text;

                    }

                }

                if (detail === "mins") {

                    if (wholeMinsOwned !== 1) {

                        timeElapsed += spacer;

                        timeElapsed += wholeMinsOwned;

                        timeElapsed += mins_text;

                    } else {

                        timeElapsed += spacer;

                        timeElapsed += wholeMinsOwned;

                        timeElapsed += min_text;

                    }

                }

            }

        }

        if ((!fullerSinceTimer || detail === "wholeDays") && detail !== "decimal") {

            timeElapsed = Math.floor(dateDiff);

        }

      return timeElapsed;

    }



    function showSettingsEditor() {

        Config.show();

    }



    function localString(key, text) {

        var string;

        var language = currentPage.language;

        if ("undefined" !== typeof scriptLangStrings[language]) {

            string = scriptLangStrings[language][key];

        } else if ("undefined" !== typeof scriptLangStrings["US"]) {

            string = scriptLangStrings["US"][key];

        } else {

            return key;

        }

        if (text) {

            string = string.replace("%s", text);

        }

        return string;

    }



    function neobuxString(key) {

        var pageLanguage = currentPage.language;

        if ("undefined" !== typeof neobuxLangStrings[pageLanguage]) {

            return neobuxLangStrings[pageLanguage][key];

        } else if ("undefined" !== typeof neobuxLangStrings["US"]) {

            return neobuxLangStrings["US"][key];

        } else {

            return key;

        }

    }



// Object that will hold the data about the current graph

    function graphProperties(values, totals) {

        this.value = new function () {

            var i = 1;

            var tmp = [0];

            do {

                tmp[i] = values[i - 1];

                if (isNaN(tmp[i]) || !isFinite(tmp[i])) {

                    tmp[i] = -1;

                }

            } while (i++ < values.length);

            return tmp;

        };

        this.totals = new function () {

            var i = 1;

            var tmp = [0];

            do {

                tmp[i] = tmp[i - 1] + parseFloat(values[i - 1]);

                if (isNaN(tmp[i]) || !isFinite(tmp[i])) {

                    tmp[i] = -1;

                }

            } while (i++ < values.length);

            return tmp;

        };

        this.today = values[0];

        this.yesterday = values[1];

        this.recent = totals[myAccount.preferences.timePeriod_recent - 1];

        this.mean = new function () {

            var i = 1;

            var tmp = [0];

            do {

                tmp[i] = totals[i - 1] / i;

                if (isNaN(tmp[i]) || !isFinite(tmp[i])) {

                    tmp[i] = -1;

                }

                customLogger("i = " + i + "\n" +

                        "totals[i] = " + totals[i] + "\n" +

                        "totals[i - 1] = " + totals[i - 1] + "\n" +

                        "totals[i - 2] = " + totals[i - 2] + "\n" +

                        "tmp[i] = " + tmp[i], 12);

            } while (i++ < totals.length);

            return tmp;

        };

        this.variance = new Stats(values).variance;

        this.sdev = new Stats(values).sdev;

        customLogger("values = " + values + "\n" +

                "totals = " + totals + "\n" +

                "this.today = " + this.today + "\n" +

                "this.yesterday = " + this.yesterday + "\n" +

                "this.value = " + this.value + "\n" +

                "this.totals = " + this.totals + "\n" +

                "this.mean = " + this.mean + "\n" +

                "this.variance = " + this.variance + "\n" +

                "this.sdev = " + this.sdev + "\n" +

                "totals.length = " + totals.length + "\n" +

                "this.value.length = " + this.value.length, [7, 10, 12]);

    }



    var Today = new Date();

    var Yesterday = new Date();

    Yesterday.setDate(Today.getDate() - 1);



    var today = new function () {};

    var yesterday = new function () {};

    var recent = new function () {};



    var startTime_atSWITCH = new Date().getTime();

    var timer_getDaysTilPaidOwnRecycle = [];



// Make spaces etc appear properly without needing to use &nbsp;



// SETTINGS EDITING / CONFIG

    Config.scriptName = "NeoBux Plus+";

    Config.tabs = {

        "Resúmen": {

            html: "<p>Esta página es únicamente para informar y mostrar lo que el script cree sobre tu cuenta. Estas no son configuraciones que puedan ser cambiadas.</p>",

            fields: {

                html: {

                    type: "html",

                    html: "<table style='border-collapse: collapse;'>" +

                            "<tr><td>Nombre de Usuario: </td><td style='font-weight: bold !important;'>" + myAccount.name + "</td></tr>" +

                            "<tr><td>Tipo de Cuenta: </td><td style='font-weight: bold !important;'>" + getAccountType(true) + "</td></tr>" +

                            "<tr><td>Idioma de NeoBux: </td><td style='font-weight: bold !important;'>" + {

                                "US": "English",

                                "PT": "Portuguese",

                                "ES": "Español",

                                "GR": "Greek",

                                "ID": "Indonesian",

                                "FI": "Finnish",

                                "SE": "Swedish",

                                "DE": "German",

                                "FR": "French"

                            }[currentPage.language] + "</td></tr>" +

                            "<tr><td colspan='2' style='border: 0px none; height: 15px;'></td></tr>" +

                            "<tr><td># de Referidos Rentados(RRs): </td><td style='font-weight: bold !important;'>" + myAccount.rentedRefCount + "</td></tr>" +

                            "<tr><td># de Referidos Directos: </td><td style='font-weight: bold !important;'>" + myAccount.directRefCount + "</td></tr>" +

                            "<tr><td># Total de Referidos: </td><td style='font-weight: bold !important;'>" + myAccount.getTotalRefCount + "</td></tr>" +

                            "<tr><td colspan='2' style='border: 0px none; height: 15px;'></td></tr>" +

                            "<tr><td>Límite del AutoPago (días): </td><td style='font-weight: bold !important;'>" + myAccount.autopayLimit + "</td></tr>" +

                            "<tr><td>Costo del Autopago: </td><td style='font-weight: bold !important;'>$" + myAccount.autopayCost + "</td></tr>" +

                            "<tr><td>Costo de Reciclaje: </td><td style='font-weight: bold !important;'>$" + myAccount.recycleCost + "</td></tr>" +

                            "<tr><td colspan='2' style='border: 0px none; height: 15px;'></td></tr>" + 

                            "<tr><td>El valor de tus clicks: </td><td style='font-weight: bold !important;'>$" + myAccount.ownClickValue + "</td></tr>" +

                            "<tr><td>El valor de los clicks de tus RRs: </td><td style='font-weight: bold !important;'>$" + myAccount.referralClickValue + "</td></tr>" +

                            "<tr><td>El valor de los clicks de tus RDs: </td><td style='font-weight: bold !important;'>$" + myAccount.dReferralClickValue + "</td></tr>" +

                            "<tr><td colspan='2' style='border: 0px none; height: 15px;'></td></tr>" +

                            "</table>"

                }

            }

        },

        "Configuracón de la Cuenta": {

            html: "<p>Estas configuraciones se relacionan con la forma en que manejas tu cuenta y lo que el script ha guardado respecto a ella.</p>",

            fields: {

                renewalPeriod: {

                    type: "select",

                    label: "Período de Renovación",

                    options: {

                        "AutoPago": "1",

                        "15": "15",

                        "30": "30",

                        "60": "60",

                        "90": "90",

                        "150": "150",

                        "240": "240"

                    },

                    text: "<font style='font-size: x-small; font-style: italic;'>El número de días a los que renuevas.<br/>Se reomiendan renovaciones a 240 días con  AutoPago apagado.<br/>AutoPago, 15 days, 30 días, 60 días, 90 días, 150 días, 240 días</font>",

                    value: myAccount.preferences.renewalPeriod

                },

                spacer_1: {

                    type: "spacer",

                    height: "15px"

                },

                overrideRentedReferralCount: {

                    type: "checkbox",

                    label: "Sobreescribir",

                    text: "<font style='font-size: x-small; font-style: italic;'>¿Deseas sobreescribir cuantos referidos rentados el script cree que tienes?</font>",

                    value: myAccount.preferences.overrideRentedReferralCount

                },

                manualRentedReferralCount: {

                    type: "text",

                    label: "Referidos Rentados",

                    text: "<font style='font-size: x-small; font-style: italic;'>¿Cuantos referidos rentados tienes?.</font>",

                    value: myAccount.preferences.manualRentedReferralCount

                },

                spacer_2: {

                    type: "spacer",

                    height: "15px"

                },

                overrideDirectReferralCount: {

                    type: "checkbox",

                    label: "Sobreescribir",

                    text: "<font style='font-size: x-small; font-style: italic;'>¿Deseas sobreescribir cuantos referidos directos el script cree que tienes?</font>",

                    value: myAccount.preferences.overrideDirectReferralCount

                },

                manualDirectReferralCount: {

                    type: "text",

                    label: "Referidos Directos",

                    text: "<font style='font-size: x-small; font-style: italic;'>¿Cuantos referidos directos tienes?.</font>",

                    value: myAccount.preferences.manualDirectReferralCount

                },

                spacer_3: {

                    type: "spacer",

                    height: "15px"

                },

                decimalPrecision: {

                    type: "select",

                    label: "Precisión Decimal",

                    options: {

                        "0.01": "2",

                        "0.001": "3",

                        "0.0001": "4"

                    },

                    text: "<font style='font-size: x-small; font-style: italic;'>El número de dígitos que siguen el punto.<br/>Por Defecto: 0.0001 (4 Decimales)</font>",

                    value: myAccount.preferences.decimalPrecision

                }

            }

        },

        "Listados de Referidos": {

            html: "<p>Estas configuraciones se usan para controlar que pasa en las páginas de listados de referidos.</p>",

            fields: {

                header_Spacing: {

                    type: "html",

                    html: "<p><b>Reducir el contenido de las columnas:</b></p>"

                },

                letterSpacing: {

                    type: "select",

                    label: "Espacio entre letras",

                    options: {

                        "-1.0px": "-1.0px",

                        "-0.9px": "-0.9px",

                        "-0.8px": "-0.8px",

                        "-0.7px": "-0.7px",

                        "-0.6px": "-0.6px",

                        "-0.5px": "-0.5px",

                        "-0.4px": "-0.4px",

                        "-0.3px": "-0.3px",

                        "-0.2px": "-0.2px",

                        "-0.1px": "-0.1px",

                        "0.0px": "0.0px",

                        "0.1px": "0.1px",

                        "0.2px": "0.2px",

                        "0.3px": "0.3px",

                        "0.4px": "0.4px",

                        "0.5px": "0.5px",

                        "0.6px": "0.6px",

                        "0.7px": "0.7px",

                        "0.8px": "0.8px",

                        "0.9px": "0.9px",

                        "1.0px": "1.0px"

                    },

                    text: "<font style='font-size: x-small; font-style: italic;'>El espacio entre caracteres.<br/>Por defecto: 0.0px</font>",

                    value: myAccount.preferences.letterSpacing

                },

                wordSpacing: {

                    type: "select",

                    label: "Espacio entre palabras",

                    options: {

                        "-1.0px": "-1.0px",

                        "-0.9px": "-0.9px",

                        "-0.8px": "-0.8px",

                        "-0.7px": "-0.7px",

                        "-0.6px": "-0.6px",

                        "-0.5px": "-0.5px",

                        "-0.4px": "-0.4px",

                        "-0.3px": "-0.3px",

                        "-0.2px": "-0.2px",

                        "-0.1px": "-0.1px",

                        "0.0px": "0.0px",

                        "0.1px": "0.1px",

                        "0.2px": "0.2px",

                        "0.3px": "0.3px",

                        "0.4px": "0.4px",

                        "0.5px": "0.5px",

                        "0.6px": "0.6px",

                        "0.7px": "0.7px",

                        "0.8px": "0.8px",

                        "0.9px": "0.9px",

                        "1.0px": "1.0px"

                    },

                    text: "<font style='font-size: x-small; font-style: italic;'>El espacio blanco entre palabras.<br/>Por defecto: 0.0px</font>",

                    value: myAccount.preferences.wordSpacing

                },

                header_referralNumberColumn: {

                    type: "html",

                    html: "<br/><p><b>Columna de número de referido:</b></p>"

                },

                referralNumber_shrinkContents: {

                    type: "checkbox",

                    label: "Reducir:",

                    text: "<font style='font-size: x-small; font-style: italic;'>¿Debería reducirse el contenido de la columna?</font>",

                    value: myAccount.preferences.referralNumber_shrinkContents

                },

                header_refFlags: {

                    type: "html",

                    html: "<br/><p><b>Banderas de Referido:</b></p>"

                },

                textifyFlag: {

                    type: "checkbox",

                    label: "Banderas textuales",

                    text: "<font style='font-size: x-small; font-style: italic;'>¿Debería ponerse como texto el color de la bandera?<br/>R = Rojo, N = Naranja, Am = Amarillo, V = Verde, B = Blanco, Az = Azúl</font>",

                    value: myAccount.preferences.textifyFlag

                },

                textifyFlag_prefix: {

                    type: "text",

                    label: "Separador",

                    text: "<font style='font-size: x-small; font-style: italic;'>¿Qué debería separar la bandera del texto?</font>",

                    value: myAccount.preferences.textifyFlag_prefix

                },

                flag_shrinkContents: {

                    type: "checkbox",

                    label: "Reducir:",

                    text: "<font style='font-size: x-small; font-style: italic;'>¿Debería reducirse el contenido de la columna?</font>",

                    value: myAccount.preferences.flag_shrinkContents

                },

                header_referralNameColumn: {

                    type: "html",

                    html: "<br/><p><b>Columna 'Referido':</b></p>"

                },

                referralName_shrinkContents: {

                    type: "checkbox",

                    label: "Reducir:",

                    text: "<font style='font-size: x-small; font-style: italic;'>¿Debería reducirse el contenido de la columna?</font>",

                    value: myAccount.preferences.referralName_shrinkContents

                },

                header_cameFromColumn: {

                    type: "html",

                    html: "<br/><p><b>Columna 'Viene de':</b></p>"

                },

                cameFrom_shrinkContents: {

                    type: "checkbox",

                    label: "Reducir:",

                    text: "<font style='font-size: x-small; font-style: italic;'>¿Debería reducirse el contenido de la columna?</font>",

                    value: myAccount.preferences.cameFrom_shrinkContents

                },

                header_ownedSinceColumn: {

                    type: "html",

                    html: "<br/><p><b>Columna 'Referido desde':</b></p>"

                },

                referralSince_numerise: {

                    type: "checkbox",

                    label: "Numerar:",

                    text: "<font style='font-size: x-small; font-style: italic;'>¿Debería la fecha transformarse a días/hrs/min?<br/> Si se establece en Falso, se ignorarán las configuraciones siguientes.</font>",

                    value: myAccount.preferences.referralSince_numerise

                },

                referralSince_fullerTimers: {

                    type: "checkbox",

                    label: "Completo:",

                    text: "<font style='font-size: x-small; font-style: italic;'>¿Debería la fecha 'numerada' ser 'completa'?<br/>VERDADERO == días/horas/mins, FALSO == días solamente</font>",

                    value: myAccount.preferences.referralSince_fullerTimers

                },

                ownedSinceTimer_shortFormat: {

                    type: "checkbox",

                    label: "Formato Reducido:",

                    text: "<font style='font-size: x-small; font-style: italic;'>¿Debería reducirse la fecha 'numerada'?<br/>VERDADERO == d/h/m, FALSO == días/horas/mins</font>",

                    value: myAccount.preferences.ownedSinceTimer_shortFormat

                },

                referralSince_replace: {

                    type: "checkbox",

                    label: "Reemplazar:",

                    text: "<font style='font-size: x-small; font-style: italic;'>¿Debería el texto ser reemplazado por la fecha 'numerada'?<br/>VERDADERO == 10 días, 21 hrs, 16 mins, FALSO == 2009/12/21 17:20 (10 días, 21 hrs, 16 mins)</font>",

                    value: myAccount.preferences.referralSince_replace

                },

                ownedSince_shrinkContents: {

                    type: "checkbox",

                    label: "Reducir:",

                    text: "<font style='font-size: x-small; font-style: italic;'>¿Debería reducirse el contenido de la columna?</font>",

                    value: myAccount.preferences.ownedSince_shrinkContents

                },

                header_nextPaymentColumn: {

                    type: "html",

                    html: "<br/><p><b>Columna 'Expira en':</b></p>"

                },

                nextPayment_shrinkContents: {

                    type: "checkbox",

                    label: "Reducir:",

                    text: "<font style='font-size: x-small; font-style: italic;'>¿Debería reducirse el contenido de la columna?</font>",

                    value: myAccount.preferences.nextPayment_shrinkContents

                },

                header_lastClickColumn: {

                    type: "html",

                    html: "<br/><p><b>Columna 'Último click':</b></p>"

                },

                lastClick_numerise: {

                    type: "checkbox",

                    label: "Numerar:",

                    text: "<font style='font-size: x-small; font-style: italic;'>¿Debería la fecha transformarse a días/hrs/min?<br/> Si se establece en Falso, se ignorarán las configuraciones siguientes.</font>",

                    value: myAccount.preferences.lastClick_numerise

                },

                lastClick_fullerTimers: {

                    type: "checkbox",

                    label: "Completo:",

                    text: "<font style='font-size: x-small; font-style: italic;'>¿Debería la fecha 'numerada' ser 'completa'?<br/>VERDADERO == días/horas/mins, FALSO == días solamente</font>",

                    value: myAccount.preferences.lastClick_fullerTimers

                },

                lastClickTimer_shortFormat: {

                    type: "checkbox",

                    label: "Formato Reducido:",

                    text: "<font style='font-size: x-small; font-style: italic;'>¿Debería reducirse la fecha 'numerada'?<br/>VERDADERO == d/h/m, FALSO == días/horas/mins</font>",

                    value: myAccount.preferences.lastClickTimer_shortFormat

                },

                lastClick_replace: {

                    type: "checkbox",

                    label: "Reemplazar:",

                    text: "<font style='font-size: x-small; font-style: italic;'>¿Debería el texto ser reemplazado por la fecha 'numerada'?<br/>VERDADERO == 10 días, 21 hrs, 16 mins, FALSO == 2009/12/26 [6 días]</font>",

                    value: myAccount.preferences.lastClick_replace

                },

                lastClick_replaceNilClicks: {

                    type: "checkbox",

                    label: "Reemplazar Sin Clicks:",

                    text: "<font style='font-size: x-small; font-style: italic;'>Si el usuario no ha clickeado aún, debería eliminarse el texto 'Sin clicks aún' para reducir la columna?</font>",

                    value: myAccount.preferences.lastClick_replaceNilClicks

                },

                lastClick_shrinkContents: {

                    type: "checkbox",

                    label: "Reducir:",

                    text: "<font style='font-size: x-small; font-style: italic;'>¿Debería reducirse el contenido de la columna?</font>",

                    value: myAccount.preferences.lastClick_shrinkContents

                },

                header_totalClicksColumn: {

                    type: "html",

                    html: "<br/><p><b>Columna 'Clicks':</b></p>"

                },

                totalClicks_shrinkContents: {

                    type: "checkbox",

                    label: "Reducir:",

                    text: "<font style='font-size: x-small; font-style: italic;'>¿Debería reducirse el contenido de la columna?</font>",

                    value: myAccount.preferences.totalClicks_shrinkContents

                },

                header_avgColumn: {

                    type: "html",

                    html: "<br/><p><b>Columna 'Media':</b></p>"

                },

                exactAverage_show: {

                    type: "checkbox",

                    label: "Avg Exacto",

                    text: "<font style='font-size: x-small; font-style: italic;'>¿Debería mostrarse el Avg Exacto? El Avg normal usa días.<br/>Este Avg 'exacto' es calculado usando la edad del referido en minutos.</font>",

                    value: myAccount.preferences.exactAverage_show

                },

                exactAverage_seperator: {

                    type: "text",

                    label: "Separador",

                    text: "<font style='font-size: x-small; font-style: italic;'>¿Qué debería separar el Avg Normal y el exacto?</font>",

                    value: myAccount.preferences.exactAverage_seperator

                },

                columnPrefix_Average: {

                    type: "text",

                    label: "Prefijo",

                    text: "<font style='font-size: x-small; font-style: italic;'>¿Qué debería mostrarse antes del Avg normal?</font>",

                    value: myAccount.preferences.columnPrefix_Average

                },

                exactAverage_replace: {

                    type: "checkbox",

                    label: "Reemplazar Avg",

                    text: "<font style='font-size: x-small; font-style: italic;'>¿Debería el Avg exacto reemplazar completamente el Avg normal?</font>",

                    value: myAccount.preferences.exactAverage_replace

                },

                average_shrinkContents: {

                    type: "checkbox",

                    label: "Reducir:",

                    text: "<font style='font-size: x-small; font-style: italic;'>¿Debería reducirse el contenido de la columna?</font>",

                    value: myAccount.preferences.average_shrinkContents

                },

                header_profitColumn: {

                    type: "html",

                    html: "<br/><p><b>Columna 'Ganancias':</b></p>"

                },

                showColumn_Profit: {

                    type: "checkbox",

                    label: "Mostrar:",

                    text: "<font style='font-size: x-small; font-style: italic;'>¿Debería mostrarse la columna 'Ganancias'?</font>",

                    value: myAccount.preferences.showColumn_Profit

                },

                includeRecycleCostInProfitColumn: {

                    type: "checkbox",

                    label: "Costo de Reciclaje:",

                    text: "<font style='font-size: x-small; font-style: italic;'>¿Debería restarse el valor del reciclaje del valor mostrado?<br/>VERDADERO == muestra {ganancia - costo de un reciclaje}, FALSO == muestra {ganancia}</font>",

                    value: myAccount.preferences.includeRecycleCostInProfitColumn

                },

                columnPrefix_Profit: {

                    type: "text",

                    label: "Prefijo",

                    text: "<font style='font-size: x-small; font-style: italic;'>¿Que debería mostrarse antes del valor de 'ganancia'?<br/>Por ejemplo, esto puede usarse para hacer que el script sólo muestre números. Por defecto: $</font>",

                    value: myAccount.preferences.columnPrefix_Profit

                },

                profitColumn_shrinkContents: {

                    type: "checkbox",

                    label: "Reducir:",

                    text: "<font style='font-size: x-small; font-style: italic;'>¿Debería reducirse el contenido de la columna?</font>",

                    value: myAccount.preferences.profitColumn_shrinkContents

                }

            }

        },

        "Referral Listings 2": {

            html: "<p>These settings are used to control what happens on the referral listings pages.</p><p><strong>These settings affect Ultimate-members only:</strong></p>",

            fields:{

                columnHeader_clickText: {

                    type: "html",

                    html: "<br/><p><b>Click Text ('Clicks/day') Column:</b></p>"

                },

                showColumn_clickText: {

                    type: "checkbox",

                    label: "Show:",

                    text: "<font style='font-size: x-small; font-style: italic;'>Should the 'Click-Text' column be shown?</font>",

                    value: myAccount.ultimatePreferences.showColumn_clickText

                },

                columnPrefix_clickText: {

                    type: "text",

                    label: "Prefix",

                    text: "<font style='font-size: x-small; font-style: italic;'>What should show before the 'Click-Text' value? Default: null</font>",

                    value: myAccount.ultimatePreferences.columnPrefix_clickText

                },

                clickText_shrinkContents: {

                    type: "checkbox",

                    label: "Shrink:",

                    text: "<font style='font-size: x-small; font-style: italic;'>Should the contents of the Click Text ('Clicks/day') column be shrunk?</font>",

                    value: myAccount.ultimatePreferences.clickText_shrinkContents

                },

                columnHeader_average1: {

                    type: "html",

                    html: "<br/><p><b>'average1' (A" + myAccount.ultimatePreferences.timePeriod_average1 + ") Column:</b></p>"

                },

                showColumn_Average1: {

                    type: "checkbox",

                    label: "Show:",

                    text: "<font style='font-size: x-small; font-style: italic;'>Should the average1 column be shown?</font>",

                    value: myAccount.ultimatePreferences.showColumn_Average1

                },

                columnPrefix_Average1: {

                    type: "text",

                    label: "Prefix",

                    text: "<font style='font-size: x-small; font-style: italic;'>What should show before the average1 value? eg, this can be used to make the script only show a number. Default: null</font>",

                    value: myAccount.ultimatePreferences.columnPrefix_Average1

                },

                average1_shrinkContents: {

                    type: "checkbox",

                    label: "Shrink:",

                    text: "<font style='font-size: x-small; font-style: italic;'>Should the contents of the average1 column be shrunk?</font>",

                    value: myAccount.ultimatePreferences.average1_shrinkContents

                },

                columnHeader_average2: {

                    type: "html",

                    html: "<br/><p><b>'average2' (A" + myAccount.ultimatePreferences.timePeriod_average2 + ") Column:</b></p>"

                },

                showColumn_Average2:{

                    type:"checkbox",

                    label:"Show:",

                    text: '<font style="font-size: x-small; font-style: italic;">Should the average2 column be shown?</font>',

                    value: myAccount.ultimatePreferences.showColumn_Average2

                },

                columnPrefix_Average2:{

                    type:"text",

                    label:"Prefix",

                    text: '<font style="font-size: x-small; font-style: italic;">What should show before the average2 value? eg, this can be used to make the script only show a number. Default: null</font>',

                    value: myAccount.ultimatePreferences.columnPrefix_Average2

                },

                average2_shrinkContents: {

                    type: "checkbox",

                    label: "Shrink:",

                    text: "<font style='font-size: x-small; font-style: italic;'>Should the contents of the average2 column be shrunk?</font>",

                    value: myAccount.ultimatePreferences.average2_shrinkContents

                },

                header_sdColumn: {

                    type: "html",

                    html: "<br/><p><b>Standard Deviation (SD) Column:</b></p>"

                },

                showSDEVColumn: {

                    type: "checkbox",

                    label: "Show:",

                    text: "<font style='font-size: x-small; font-style: italic;'>Should the SD column be shown?</font>",

                    value: myAccount.ultimatePreferences.showSDEVColumn

                },

                columnPrefix_SD: {

                    type: "text",

                    label: "Prefix",

                    text: "<font style='font-size: x-small; font-style: italic;'>What should show before the SD value? eg, this can be used to make the script only show a number. Default: null</font>",

                    value: myAccount.ultimatePreferences.columnPrefix_SD

                },

                SD_shrinkContents: {

                    type: "checkbox",

                    label: "Shrink:",

                    text: "<font style='font-size: x-small; font-style: italic;'>Should the contents of the SDEV column be shrunk?</font>",

                    value: myAccount.ultimatePreferences.SD_shrinkContents

                },

                header_rsaColumn: {

                    type: "html",

                    html: "<br/><p><b>Ratio of Standard deviation and Average (RSA) Column:</b></p>"

                },

                showColumn_RSA: {

                    type: "checkbox",

                    label: "Show:",

                    text: "<font style='font-size: x-small; font-style: italic;'>Should RSA column be shown?<br/>NOTE: RSA == Ratio of Standard deviation and Average</font>",

                    value: myAccount.ultimatePreferences.showColumn_RSA

                },

                columnPrefix_RSA: {

                    type: "text",

                    label: "Prefix",

                    text: "<font style='font-size: x-small; font-style: italic;'>What should show before the RSA value? eg, this can be used to make the script only show a number. Default: null</font>",

                    value: myAccount.ultimatePreferences.columnPrefix_RSA

                },

                RSA_shrinkContents: {

                    type: "checkbox",

                    label: "Shrink:",

                    text: "<font style='font-size: x-small; font-style: italic;'>Should the contents of the RSA column be shrunk?</font>",

                    value: myAccount.ultimatePreferences.RSA_shrinkContents

                },

                header_maFooter: {

                    type: "html",

                    html: "<br/><p><b>Minigraph Average Footer:</b></p>"

                },

                showRecentAverage: {

                    type: "checkbox",

                    label: "Show:",

                    text: "<font style='font-size: x-small; font-style: italic;'>Should Minigraph Average footer be shown?</font>",

                    value: myAccount.ultimatePreferences.showRecentAverage

                },

                RA_shrinkContents: {

                    type: "checkbox",

                    label: "Shrink:",

                    text: "<font style='font-size: x-small; font-style: italic;'>Should the contents of the Minigraph Average footer be shrunk?</font>",

                    value: myAccount.ultimatePreferences.RA_shrinkContents

                }

            }

        },

        "Time Periods": {

            html:"<p>These settings change what number of days that the averages are calculated for under the graphs.<br/></p>",

            fields:{

                spacer_1: {

                    type: "html",

                    html: "<br/><p>Time Periods for the smaller graphs:</p>"

                },

                timePeriod_s1: {

                    type: "select",

                    label: "Time Period 1",

                    options: {

                        "1": "1",

                        "2": "2", 

                        "3": "3",

                        "4": "4",

                        "5": "5",

                        "6": "6",

                        "7": "7",

                        "8": "8"

                    },

                    text: "<font style='font-size: x-small; font-style: italic;'>Default: 5</font>",

                    value: myAccount.preferences.timePeriod_s1

                },

                timePeriod_s2: {

                    type: "select",

                    label: "Time Period 2",

                    options: {

                        "1": "1",

                        "2": "2",

                        "3": "3",

                        "4": "4",

                        "5": "5",

                        "6": "6",

                        "7": "7",

                        "8": "8",

                        "9": "9"

                    },

                    text: "<font style='font-size: x-small; font-style: italic;'>Default: 7<br/>NOTE: Time Period 2 should be larger than Time Period 1</font>",

                    value: myAccount.preferences.timePeriod_s2

                },

                timePeriod_s3: {

                    type: "select",

                    label: "Time Period 3",

                    options: {

                        "1": "1",

                        "2": "2",

                        "3": "3",

                        "4": "4",

                        "5": "5",

                        "6": "6",

                        "7": "7",

                        "8": "8",

                        "9": "9",

                        "10": "10"

                    },

                    text: "<font style='font-size: x-small; font-style: italic;'>Default: 10<br/>NOTE: Time Period 3 should be larger than Time Period 2</font>",

                    value: myAccount.preferences.timePeriod_s3

                },

                spacer_2: {

                    type: "html",

                    html: "<br/><p>Time Periods for the larger graphs:</p>"

                },

                timePeriod_1: {

                    type: "select",

                    label: "Time Period 1",

                    options: {

                        "1": "1",

                        "2": "2",

                        "3": "3",

                        "4": "4",

                        "5": "5",

                        "6": "6",

                        "7": "7",

                        "8": "8",

                        "9": "9",

                        "10": "10",

                        "11": "11",

                        "12": "12",

                        "13": "13"

                    },

                    text: "<font style='font-size: x-small; font-style: italic;'>Default: 5</font>",

                    value: myAccount.preferences.timePeriod_1

                },

                timePeriod_2: {

                    type: "select",

                    label: "Time Period 2",

                    options: {

                        "1": "1",

                        "2": "2",

                        "3": "3",

                        "4": "4",

                        "5": "5",

                        "6": "6",

                        "7": "7",

                        "8": "8",

                        "9": "9",

                        "10": "10",

                        "11": "11",

                        "12": "12",

                        "13": "13",

                        "14": "14"

                    },

                    text: "<font style='font-size: x-small; font-style: italic;'>Default: 10<br/>NOTE: Time Period 2 should be larger than Time Period 1</font>",

                    value: myAccount.preferences.timePeriod_2

                },

                timePeriod_3: {

                    type: "select",

                    label: "Time Period 3",

                    options: {

                        "1": "1",

                        "2": "2",

                        "3": "3",

                        "4": "4",

                        "5": "5",

                        "6": "6",

                        "7": "7",

                        "8": "8",

                        "9": "9",

                        "10": "10",

                        "11": "11",

                        "12": "12",

                        "13": "13",

                        "14": "14",

                        "15": "15"

                    },

                    text: "<font style='font-size: x-small; font-style: italic;'>Default: 15<br/>NOTE: Time Period 3 should be larger than Time Period 2</font>",

                    value: myAccount.preferences.timePeriod_3

                },

                spacer_3: {

                    type: "html",

                    html: "<br/><p>Referral statistics sidebar:</p>"

                },

                timePeriod_recent: {

                    type: "select",

                    label: "Recent section",

                    options: {

                        "1": "1",

                        "2": "2",

                        "3": "3",

                        "4": "4",

                        "5": "5",

                        "6": "6",

                        "7": "7",

                        "8": "8",

                        "9": "9",

                        "10": "10"

                    },

                    text: "<font style='font-size: x-small; font-style: italic;'>Default: 10</font>",

                    value: myAccount.preferences.timePeriod_recent

                },

                spacer_4: {

                    type: "html",

                    html: "<br/><p>Ultimate-members only:</p>"

                },

                timePeriod_average1: {

                    type: "select",

                    label: "'Average1' column",

                    options: {

                        "1": "1",

                        "2": "2",

                        "3": "3",

                        "4": "4",

                        "5": "5",

                        "6": "6",

                        "7": "7",

                        "8": "8",

                        "9": "9",

                        "10": "10"

                    },

                    text: "<font style='font-size: x-small; font-style: italic;'>Default: 10</font>",

                    value: myAccount.ultimatePreferences.timePeriod_average1

                },

                timePeriod_average2: {

                    type: "select",

                    label: "'Average2' column",

                    options: {

                        "1": "1",

                        "2": "2",

                        "3": "3",

                        "4": "4",

                        "5": "5",

                        "6": "6",

                        "7": "7",

                        "8": "8",

                        "9": "9",

                        "10": "10"

                    },

                    text: "<font style='font-size: x-small; font-style: italic;'>Default: 7</font>",

                    value: myAccount.ultimatePreferences.timePeriod_average2

                },

                minigraphAvgInterval: {

                    type: "select",

                    label: "Minigraph Average",

                    options: {

                        "1": "1",

                        "2": "2",

                        "3": "3",

                        "4": "4",

                        "5": "5",

                        "6": "6",

                        "7": "7",

                        "8": "8",

                        "9": "9",

                        "10": "10"

                    },

                    text: "<font style='font-size: x-small; font-style: italic;'>Default: 10</font>",

                    value: myAccount.ultimatePreferences.minigraphAvgInterval

                }

            }

        },

        "Actualizaciones": {

            html: "<p>Configuraciones de Actualización:</p>",

            fields: {

                updateFrequency: {

                    type: "select",

                    label: "Frecuencia de Actualización",

                    options: {

            "Cada hora": "3600000",

                        "Diariamente": "86400000",

                        "Semanalmente": "604800000",

                        "Mensualmente": "2592000000",

                        "Nunca": "0"

                    },

                    text: "<font style='font-size: x-small; font-style: italic;'>¿Que tan seguido debería el script buscar actualizaciones?<br/>Recomendado: Diariamente</font>",

                    value: myAccount.preferences.updateFrequency

                }

            }

        },

        "About": {

            html: "<div style='text-align: justify; text-justify: newspaper;'><p><strong>About the script</strong></p>" +

                    "<p>This script is designed to make managing your NeoBux account as easy as possible and to put as much information under your fingertips as possible.</p>" +

                    "<p><strong>Want to say thanks?</strong></p>" +

                    "<p>Its always nice to hear from people who like the work I do - just head over to <a href='http://userscripts.org/scripts/discuss/78129'>the userscripts.org discussions</a> and a simple 'I want to have your babies!' or 'You are my superstar!' should suffice, but a generous post simply saying 'Thanks' will always be welcome too.<br/><br/>" +

                    "Incidentally, if you are sure that something isn't quite right and you have already checked that it isn't the flying spaghetti monster playing tricks on you, <a href='http://userscripts.org/scripts/discuss/78129'>the userscripts.org discussions</a> should be your first port of call for feature requests and complaints.</p><br/>" +

                    "<p><strong>Other scripts by Dobrin Dobrev</strong></p>" +

                    "<p>If you like this script, take a look at my other scripts at <a href='http://userscripts.org/users/173064/scripts'>userscripts.org</a>. Not all of them are as useful as this script and usually the description is good enough to figure out what it does, but any questions can be sent to the same place as above.</p></div>",

            fields: {

            }

        }

    };



    var newDialog_Style =

            "#modalContainer {" +

            "background-color: transparent;" +

            "position: absolute;" +

            "width: 100%;" +

            "height: 100%;" +

            "top: 0px;" +

            "left: 0px;" +

            "z-index: 10000;" +

            "background-image: url(tp.png); /* required by MSIE to prevent actions on lower z-index elements */" +

            " }" +

            "#alertBox {" +

            "position: relative;" +

            "width: 300px;" +

            "min-height: 100px;" +

            "margin-top: 50px;" +

            "border: 2px solid #000;" +

            "background-color: #F2F5F6;" +

            "background-image: url(alert.png);" +

            "background-repeat: no-repeat;" +

            "background-position: 20px 30px;" +

            " }" +

            "#modalContainer > #alertBox {" +

            "position: fixed;" +

            " }" +

            "#alertBox h1 {" +

            "margin: 0;" +

            "font: bold 0.9em verdana,arial;" +

            "background-color: #78919B;" +

            "color: #FFF;" +

            "border-bottom: 1px solid #000;" +

            "padding: 2px 0 2px 5px;" +

            " }" +

            "#alertBox p {" +

            "font-family: verdana,arial;" +

            "padding: 10px;" +

            "margin: 10px;" +

            "height: auto;" +

            " }" +

            "#alertBox textarea {" +

            "font-family: monospace,courier new,verdana,arial;" +

            "font-size: x-small;" +

            "margin: 15px;" +

            "margin-top: 0px;" +

            "height: auto;" +

            "width: 85%;" +

            " }" +

            "#alertBox #closeBtn {" +

            "display: block;" +

            "position: relative;" +

            "margin: 15px auto;" +

            "padding: 3px;" +

            "border: 2px solid #000;" +

            "width: 70px;" +

            "font: 0.7em verdana,arial;" +

            "text-transform: uppercase;" +

            "text-align: center;" +

            "color: #FFF;" +

            "background-color: #78919B;" +

            "text-decoration: none;" +

            "}";



    function createExportDialog(txt, exportText, ALERT_TITLE, ALERT_BUTTON_TEXT, exportText_reversed, event) {

        var textareaContents = exportText;

        if (event.ctrlKey && event.altKey && exportText_reversed) {

            var textareaContents = exportText_reversed;

        }

        createCustomAlert(txt, textareaContents, ALERT_TITLE, ALERT_BUTTON_TEXT);

    }



    function createCustomAlert(txt, textareaContents, ALERT_TITLE, ALERT_BUTTON_TEXT) {

// constants to define the title of the alert and button text.

        if (!txt) {

            var txt = "";

        }

        if (!textareaContents) {

           var textareaContents = "";

        }

        if (!ALERT_TITLE) {

          var ALERT_TITLE = "Oops!";

        }

        if (!ALERT_BUTTON_TEXT) {

            var ALERT_BUTTON_TEXT = "Ok";

        }

// shortcut reference to the document object

        var d = document;

// if the modalContainer object already exists in the DOM, bail out.

        if (d.getElementById("modalContainer")) {

            return;

        }

// create the modalContainer div as a child of the BODY element

// make sure its as tall as it needs to be to overlay all the content on the page

        var mObj = d.getElementsByTagName("body")[0].appendChild(d.createElement("div"));

        mObj.id = "modalContainer";

        mObj.style.height = d.documentElement.scrollHeight + "px";

// create the DIV that will be the alert 

        var alertObj = mObj.appendChild(d.createElement("div"));

        alertObj.id = "alertBox";

        var newDialogStyle = alertObj.appendChild(d.createElement("style"));

        newDialogStyle.setAttribute("type", "text/css");

        newDialogStyle.innerHTML = newDialog_Style;

// MSIE doesnt treat position:fixed correctly, so this compensates for positioning the alert

        if (d.all && !window.opera) {

            alertObj.style.top = d.documentElement.scrollTop + "px";

        }

// center the alert box

        alertObj.style.left = (d.documentElement.scrollWidth - alertObj.offsetWidth) / 2 + "px";

// create an H1 element as the title bar

        var h1 = alertObj.appendChild(d.createElement("h1"));

        h1.appendChild(d.createTextNode(ALERT_TITLE));

        if (txt !== "") {

// create a paragraph element to contain the txt argument

            var msg = alertObj.appendChild(d.createElement("p"));

            msg.innerHTML = txt;

        }

        if (textareaContents !== "") {

// create a textarea

            var textarea = alertObj.appendChild(d.createElement("center")).appendChild(d.createElement("textarea"));

            textarea.value = textareaContents;

            var maxHeight = 300;

            var adjustedHeight = textarea.clientHeight;

            if (!maxHeight || maxHeight > adjustedHeight) {

                adjustedHeight = Math.max(textarea.scrollHeight, adjustedHeight);

                if (maxHeight) {

                    adjustedHeight = Math.min(maxHeight, adjustedHeight);

                }

                if (adjustedHeight > textarea.clientHeight) {

                    textarea.style.height = adjustedHeight + "px";

                }

            }

        }

// create an anchor element to use as the confirmation button.

        var btn = alertObj.appendChild(d.createElement("a"));

        btn.id = "closeBtn";

        btn.appendChild(d.createTextNode(ALERT_BUTTON_TEXT));

// set up the onclick event to remove the alert when the anchor is clicked

        btn.addEventListener("click", function () { removeCustomAlert(); }, false);

    }



// removes the custom alert from the DOM

    function removeCustomAlert() {

        document.getElementsByTagName("body")[0].removeChild(document.getElementById("modalContainer"));

    }



    function refStatsPage() {

        var 

            chartData,

            i,

            net,

            newCol,

            newRow,

            spacer;

        chartData = selectNode("//script[contains(.,'eval(w(')]").textContent.split(" ");

        for (i = 0; i < chartData.length - 1; i += 1) {

            processChartData(chartData[i].split("'")[1]);

        }

// Insert the sidebar statistics area

        insertSidebar();

// Insert summary data at the very bottom of the page

        net = [];

        for (i = 1; i < rentedClicks.totals.length; i += 1) {

            net[i] = (myAccount.referralClickValue * rentedClicks.totals[i]) +

                    (myAccount.dReferralClickValue * directClicks.totals[i]) -

                    (recycleCost.totals[i] + autopayCost.totals[i] +

                    renewalCost.totals[i]);

        }

        newRow = document.createElement("tr");

        newRow.style.height = "15px";

        newCol = document.createElement("td");

        newCol.colSpan = 2;

        newCol.style.backgroundColor = "#AAAAAA";

        newCol.style.fontFamily = "verdana";

        newCol.style.fontWeight = "bold";

        newCol.style.height = "20px";

        newCol.style.fontSize = "9px";

        newCol.style.border = "1px solid #aaaaaa";

        newCol.style.width = "170px";

        newCol.style.textAlign = "left";

        newCol.style.verticalAlign = "middle";

        newRow.appendChild(newCol);

        spacer = "&nbsp;&nbsp;&nbsp;&nbsp;";

        newCol.innerHTML = "<span style='font-size: 9px; color:#ffffff;'>" +

                neobuxString("dailyNetIncome") + ": " +

                "(" + myAccount.preferences.timePeriod_s3 + ") $" +

                fix(parseFloat(net[myAccount.preferences.timePeriod_s3])) +

                spacer +

                "(" + myAccount.preferences.timePeriod_s2 + ") $" +

                fix(parseFloat(net[myAccount.preferences.timePeriod_s2])) +

                spacer +

                "(" + myAccount.preferences.timePeriod_s1 + ") $" +

                fix(parseFloat(net[myAccount.preferences.timePeriod_s1])) +

                spacer +

                "(3) $" + fix(parseFloat(net[3])) + spacer +

                "(2) $" + fix(parseFloat(net[2])) + spacer +

                "(1) $" + fix(parseFloat(net[1])) + "</span>";

    }



// Function that extracts the data from each chart

    function processChartData(data) {

        var

            chartID,

            dates,

            i,

            projectedDirect,

            projectedRented,

            script,

            totals,

            values;

        script = atob(data);

        chartID = script.split("'")[1];

        customLogger("chartID = " + chartID, 6);

// Extract the dates and values from the chart data

        dates = script.split("[")[1].split("]", 1)[0].replace(/["']{1}/gi, "").split(",");

        values = script.split("[")[3].split("]", 1)[0].split(",");

        for (i = 0; i < values.length; i += 1) {

            values[i] = parseFloat(values[i]);

        }

// Reverse the order of the data so that the most recent data is first

// (unless the chart being processed is the scheduled rental payments chart)

        if (chartID.indexOf("ch_ext_schedule") === -1) {

            dates.reverse();

            values.reverse();

        }

// Calculate running totals for the data in the chart

        totals = [];

        for (i = 0; i < values.length; i += 1) {

            if (i === 0) {

                totals[i] = values[i];

            } else {

                totals[i] = totals[i - 1] + values[i];

            }

        }

// Attach the graphProperties to the relevant variable name

        if (currentPage.name === "refStats") {

// Variable names for the Referral Statistics page

            if (chartID === "ch_cd") { // Direct referrals clicks credited

                directClicks = new graphProperties(values, totals);

                projectedDirect = selectNodes("//span[@class='f_b']")[2].textContent;

                directClicks.today_projected = parseFloat(projectedDirect);

                customLogger("directClicks.today_projected = " + directClicks.today_projected, 5);

            } else if (chartID === "ch_cr") { // Rented referrals clicks credited

                rentedClicks = new graphProperties(values, totals);

                projectedRented = selectNodes("//span[@class='f_b']")[4].textContent;

                rentedClicks.today_projected = parseFloat(projectedRented);

                customLogger("rentedClicks.today_projected = " + rentedClicks.today_projected, 5);

            } else if (chartID === "ch_recycle") { // Recycle value

                recycleCost = new graphProperties(values, totals);

            } else if (chartID === "ch_trar") { // Automatic Recycling

                automaticRecycling = new graphProperties(values, totals);

            } else if (chartID === "ch_extensions") { // Extension value

                renewalCost = new graphProperties(values, totals);

            } else if (chartID === "ch_autopay") { // AutoPay value

                autopayCost = new graphProperties(values, totals);

            } else if (chartID === "ch_trpb") { // Transfers to Golden Pack Balance

                transfersToGoldenPackBalance = new graphProperties(values, totals);

            } else if (chartID === "ch_trrb") { // Transfers to Rental Balance

                transfersToRentalBalance = new graphProperties(values, totals);

            } else if (chartID.indexOf("ch_ext_schedule") > -1) { // Total number of referrals with scheduled rental payments

                rentalsDue = new graphProperties(values, totals);

            } else if (chartID === "ch_earnings") { // Referral earnings

            } else if (chartID === "ch_profit") { // Daily referrals profit

            }

        } else if (currentPage.name === "accSummary") {

// Variable / graph names for the Account Summary page

            switch (graphNumber) {

            case 0:

                ownClicks = new graphProperties(values, totals);

                break;

            case 1:

                ownClicks_Local = new graphProperties(values, totals);

                break;

            }

        }

    }



// Function which inserts the 'Statistics Sidebar' to the side of the page

    function insertSidebar() {

// Location to insert the sidebar

        var locationToInsert = selectNode(

                "//td[@width='729']/table/tbody/tr[2]"); // right hand side

        today.projectedRentedClicks = rentedClicks.today_projected * numberOfRentedReferrals;

        today.projectedDirectClicks = directClicks.today_projected * numberOfDirectReferrals;

        today.projectedIncome = myAccount.referralClickValue * today.projectedRentedClicks + myAccount.dReferralClickValue * today.projectedDirectClicks;

        today.income = myAccount.referralClickValue * rentedClicks.today + myAccount.dReferralClickValue * directClicks.today;

        today.expenses = recycleCost.today + autopayCost.today + renewalCost.today;

        today.netIncome = (today.income - today.expenses);

        yesterday.income = myAccount.referralClickValue * rentedClicks.yesterday + myAccount.dReferralClickValue * directClicks.yesterday;

        yesterday.expenses = recycleCost.yesterday + autopayCost.yesterday + renewalCost.yesterday;

        yesterday.netIncome = (yesterday.income - yesterday.expenses);

        recent.income = [];

        recent.expenses = [];

        recent.netIncome = [];

        customLogger("rentedClicks.totals.length = " + rentedClicks.totals.length, 5);

        for (var i = 0; i < rentedClicks.totals.length; i += 1) {

            recent.income[i] = myAccount.referralClickValue * rentedClicks.totals[i] + myAccount.dReferralClickValue * directClicks.totals[i];

            recent.expenses[i] = recycleCost.totals[i] + autopayCost.totals[i] + renewalCost.totals[i];

            recent.netIncome[i] = (recent.income[i] - recent.expenses[i]);

        }

        today.directAverage = (directClicks.today / numberOfDirectReferrals);

        yesterday.directAverage = (directClicks.yesterday / numberOfDirectReferrals);

        recent.directAverage = ((directClicks.recent / numberOfDirectReferrals) / myAccount.preferences.timePeriod_recent);

        if (!numberOfDirectReferrals > 0) {

            today.directAverage = "N/A";

            yesterday.directAverage = "N/A";

            recent.directAverage = "N/A";

        }

        today.rentedAverage = (rentedClicks.today / numberOfRentedReferrals);

        yesterday.rentedAverage = (rentedClicks.yesterday / numberOfRentedReferrals);

        recent.rentedAverage = ((rentedClicks.recent / numberOfRentedReferrals) / myAccount.preferences.timePeriod_recent);

        today.rentedRAverage = ((rentedClicks.today - (recycleCost.today * 100)) / numberOfRentedReferrals);

        yesterday.rentedRAverage = ((rentedClicks.yesterday - (recycleCost.yesterday * 100)) / numberOfRentedReferrals);

        recent.rentedRAverage = (((rentedClicks.recent - (recycleCost.recent * 100)) / numberOfRentedReferrals) / myAccount.preferences.timePeriod_recent);

        if (!numberOfRentedReferrals > 0) {

            today.rentedAverage = "N/A";

            today.rentedRAverage = "N/A";

            yesterday.rentedAverage = "N/A";

            yesterday.rentedRAverage = "N/A";

            recent.rentedAverage = "N/A";

            recent.rentedRAverage = "N/A";

        }

        today.totalRAverage = (((rentedClicks.today + directClicks.today) - (recycleCost.today * 100)) / (numberOfRentedReferrals + numberOfDirectReferrals));

        yesterday.totalRAverage = (((rentedClicks.yesterday + directClicks.yesterday) - (recycleCost.yesterday * 100)) / (numberOfRentedReferrals + numberOfDirectReferrals));

        recent.totalRAverage = (((rentedClicks.recent + directClicks.recent) - (recycleCost.recent * 100)) / (numberOfRentedReferrals + numberOfDirectReferrals) / myAccount.preferences.timePeriod_recent);

        if (numberOfDirectReferrals === 0 && numberOfRentedReferrals === 0) {

            today.totalRAverage = "N/A <small>(zero refs)</small>";

            yesterday.totalRAverage = "N/A <small>(zero refs)</small>";

            recent.totalRAverage = "N/A <small>(zero refs)</small>";

        }

        today.income = rentedClicks.today * myAccount.referralClickValue + directClicks.today * myAccount.dReferralClickValue;

        today.expenses = recycleCost.today + autopayCost.today + renewalCost.today;

        yesterday.income = rentedClicks.yesterday * myAccount.referralClickValue + directClicks.yesterday * myAccount.dReferralClickValue;

        yesterday.expenses = recycleCost.yesterday + autopayCost.yesterday + renewalCost.yesterday;

        recent.income = rentedClicks.recent * myAccount.referralClickValue + directClicks.recent * myAccount.dReferralClickValue;

        recent.expenses = recycleCost.recent + autopayCost.recent + renewalCost.recent;

        var spacer = document.createElement("TD");

        spacer.setAttribute("style", "width: 6px; font-size: 6px; padding: 0px;");

        spacer.innerHTML = "&nbsp;";

        var infoLabel = document.createElement("TD");

        infoLabel.setAttribute("style", "background-color: #ffffff;");

        infoLabel.setAttribute("rowSpan", "3");

        infoLabel.style.border = "1px solid #999999";

        infoLabel.style.verticalAlign = "top";

        infoLabel.style.paddingTop = "0px";

        infoLabel.style.paddingBottom = "8px";

        infoLabel.style.paddingLeft = "8px";

        infoLabel.style.width = "182px";

        infoLabel.style.marginLeft = "5px";

        var sidebarStyle = document.createElement("style");

        sidebarStyle.innerHTML =

                "span.sidebarContent" +

                "{" +

                "  font-family: Verdana, Arial, Helvetica, sans-serif;" +

                "  font-size: x-small !important;" +

                "  text-align: left;" +

                "}" +

                "div.sidebarDetails" +

                "{" +

                "  font-size: 95%;" +

                "  margin-left: 5px;" +

                "}" +

                "h4" +

                "{" +

                "  color: #444;" +

                "  padding-left: 40px;" +

                "  margin-top: 10px;" +

                "  margin-bottom:2px" +

                "}" +

                "h5" +

                "{" +

                "  margin-top: 7px;" +

                "  margin-bottom:2px" +

                "}" +

                "h6" +

                "{" +

                "  font-size: xx-small !important;" +

                "  margin-top: 2px;" +

                "  margin-bottom:2px" +

                "}" +

                ".bold" +

                "{" +

                "  font-weight: bold;" +

                "}" +

                ".grey" +

                "{" +

                "  color: #aaa;" +

                "}";

        infoLabel.innerHTML = (

                "<span class='sidebarContent'>" +

                "<span class='sidebarHeader'>" +

                "<h4 class='bold'>" + neobuxString("statsSum") + "<br/>" +

                neobuxString("totalReferrals") + " " + (numberOfRentedReferrals + numberOfDirectReferrals) + "</h4>" +

                "</span>" +

                "<h5 class='bold'><span class='grey'>[ " + neobuxString("today") + " ]</span> - " + neobuxString("net") + " : $" + fix(today.netIncome) + "</h5>" +

                "<hr width= '155px' height='1px' color='#cccccc'/>" +

                "<h6> - " + neobuxString("income") + "</h6>" +

                "<div class='sidebarDetails'>" +

                "- " + neobuxString("rented") + ": " + rentedClicks.today.toFixed(0) + " / $" + fix(rentedClicks.today * myAccount.referralClickValue) + "<br/>" +

                "- " + neobuxString("direct") + ": " + directClicks.today.toFixed(0) + " / $" + fix(directClicks.today * myAccount.dReferralClickValue) + "<br/>" +

                "<i>" + neobuxString("projectedIncome") + ":</i><br/>" +

                "- " + neobuxString("rented") + ": " + today.projectedRentedClicks.toFixed(0) + " / $" + fix(today.projectedRentedClicks * myAccount.referralClickValue) + "<br/>" +

                "- " + neobuxString("direct") + ": " + today.projectedDirectClicks.toFixed(0) + " / $" + fix(today.projectedDirectClicks * myAccount.dReferralClickValue) + "<br/>" +

                "</div>" +

                "<h6> - " + neobuxString("expenses") + "</h6>" +

                "<div class='sidebarDetails'>" +

                "- " + neobuxString("Recycle") + ": $" + fix(recycleCost.today) + "<br/>" +

                "- " + neobuxString("autopay") + ": $" + fix(autopayCost.today) + "<br/>" +

                "- " + neobuxString("renew") + ": $" + fix(renewalCost.today) + "<br/>" +

                "</div>" +

                "<h6> - " + neobuxString("stats") + "</h6>" +

                "<div class='sidebarDetails'>" +

                "- " + neobuxString("avg") + " " + neobuxString("rented") + ": " + fix(today.rentedAverage) + "<br/>" +

                "- " + neobuxString("avg") + " " + neobuxString("direct") + ": " + fix(today.directAverage) + "<br/>" +

                "- " + neobuxString("raverage") + ": " + fix(today.totalRAverage) + "<br/>" +

                (myAccount.accountType > 0 ? "- " + neobuxString("automaticRecycling") + ": " + automaticRecycling.today.toFixed(0) + "<br/>" : "") +

                "</div>" +

                "<h6> - " + neobuxString("totals") + "</h6>" +

                "<div class='sidebarDetails'>" +

                "- " + neobuxString("income") + ": $" + fix(today.income) + "<br/>" +

                "- " + neobuxString("expenses") + ": $" + fix(today.expenses) + "<br/>" +

                "- " + neobuxString("net") + ": $" + fix(today.income - today.expenses) + "<br/>" +

                "- " + neobuxString("projectedNet") + ": $" + fix(today.projectedIncome - today.expenses) + "<br/>" +

                "</div>" +

                "<h5 class='bold'><span class='grey'>[ " + neobuxString("yesterday") + " ]</span> - " + neobuxString("net") + " : $" + fix(yesterday.netIncome) + "</h5>" +

                "<hr width= '155px' height='1px' color='#cccccc'/>" +

                "<h6> - " + neobuxString("income") + "</h6>" +

                "<div class='sidebarDetails'>" +

                "- " + neobuxString("rented") + ": " + rentedClicks.yesterday.toFixed(0) + " / $" + fix(rentedClicks.yesterday * myAccount.referralClickValue) + "<br/>" +

                "- " + neobuxString("direct") + ": " + directClicks.yesterday.toFixed(0) + " / $" + fix(directClicks.yesterday * myAccount.dReferralClickValue) + "<br/>" +

                "</div>" +

                "<h6> - " + neobuxString("expenses") + "</h6>" +

                "<div class='sidebarDetails'>" +

                "- " + neobuxString("Recycle") + ": $" + fix(recycleCost.yesterday)  + "<br/>" +

                "- " + neobuxString("autopay") + ": $" + fix(autopayCost.yesterday)  + "<br/>" +

                "- " + neobuxString("renew") + ": $" + fix(renewalCost.yesterday)  + "<br/>" +

                "</div>" +

                "<h6> - " + neobuxString("stats") + "</h6>" +

                "<div class='sidebarDetails'>" +

                "- " + neobuxString("avg") + " " + neobuxString("rented") + ": " + fix(yesterday.rentedAverage)  + "<br/>" +

                "- " + neobuxString("avg") + " " + neobuxString("direct") + ": " + fix(yesterday.directAverage)  + "<br/>" +

                "- " + neobuxString("raverage") + ": " + fix(yesterday.totalRAverage)  + "<br/>" +

                (myAccount.accountType > 0 ? "- " + neobuxString("automaticRecycling") + ": " + automaticRecycling.yesterday.toFixed(0) + "<br/>" : "") +

                "</div>" +

                "<h6> - " + neobuxString("totals") + "</h6>" +

                "<div class='sidebarDetails'>" +

                "- " + neobuxString("income") + ": $" + fix(yesterday.income) + "<br/>" +

                "- " + neobuxString("expenses") + ": $" + fix(yesterday.expenses) + "<br/>" +

                "- " + neobuxString("net") + ": $" + fix(yesterday.income - yesterday.expenses) + "<br/>" +

                "</div>" +

                "<h5 class='bold'><span class='grey'>[" + neobuxString("last") + " " + myAccount.preferences.timePeriod_recent + " " + neobuxString("Days") + "]</span> - " + neobuxString("net") + " : $" + fix(recent.netIncome[myAccount.preferences.timePeriod_recent]) + "</h5>" +

                "<hr width= '155px' height='1px' color='#cccccc'/>" +

                "<h6> - " + neobuxString("income") + "</h6>" +

                "<div class='sidebarDetails'>" +

                "- " + neobuxString("rented") + ": " + rentedClicks.recent.toFixed(0) + " / $" + fix(rentedClicks.recent * myAccount.referralClickValue) + "<br/>" +

                "- " + neobuxString("direct") + ": " + directClicks.recent.toFixed(0) + " / $" + fix(directClicks.recent * myAccount.dReferralClickValue) + "<br/>" +

                "</div>" +

                "<h6> - " + neobuxString("expenses") + "</h6>" +

                "<div class='sidebarDetails'>" +

                "- " + neobuxString("Recycle") + ": $" + fix(recycleCost.recent)  + "<br/>" +

                "- " + neobuxString("autopay") + ": $" + fix(autopayCost.recent)  + "<br/>" +

                "- " + neobuxString("renew") + ": $" + fix(renewalCost.recent)  + "<br/>" +

                "</div>" +

                "<h6> - " + neobuxString("stats") + "</h6>" +

                "<div class='sidebarDetails'>" +

                "- " + neobuxString("avg") + " " + neobuxString("rented") + ": " + fix(recent.rentedAverage)  + "<br/>" +

                "- " + neobuxString("avg") + " " + neobuxString("direct") + ": " + fix(recent.directAverage)  + "<br/>" +

                "- " + neobuxString("raverage") + ": " + fix(recent.totalRAverage)  + "<br/>" +

                (myAccount.accountType > 0 ? "- " + neobuxString("automaticRecycling") + ": " + automaticRecycling.recent.toFixed(0) + "<br/>" : "") +

                "</div>" +

                "<h6> - " + neobuxString("totals") + "</h6>" +

                "<div class='sidebarDetails'>" +

                "- " + neobuxString("income") + ": $" + fix(recent.income) + "<br/>" +

                "- " + neobuxString("expenses") + ": $" + fix(recent.expenses) + "<br/>" +

                "- " + neobuxString("net") + ": $" + fix(recent.income - recent.expenses) + "<br/>" +

                "</div>" +

                "</span>");

        infoLabel.appendChild(sidebarStyle);

// *** INSERT STATISTICS SUMMARY INTO PAGE ***

        locationToInsert.appendChild(spacer);

        locationToInsert.appendChild(infoLabel);

// Enlarge the width of the page to accomodate the extra column and add a little padding to make it look nicer

        locationToInsert.parentNode.parentNode.parentNode.setAttribute("width", "927");

        var nodesSnapshot = selectNodes("//body/div[contains(@style,'margin')]");

        nodesSnapshot[nodesSnapshot.length - 1].childNodes[0].style.width = null;

        var i;

        for (i = 0; i < nodesSnapshot.length; i += 1) {

            nodesSnapshot[i].style.width = "1100px";

        }

    }



    function insertGraphAverages(embed, graphNumber) {

// Function to insert the statistics below graphs

        var statDiv = document.getElementById(embed.id + "Div");

        var earnStr;

        var avgLabel = document.createElement("DIV");

        avgLabel.style.width = (parseInt(embed.width, 10) - 2 - 3) + "px";

        avgLabel.style.height = "14px";

        avgLabel.style.fontFamily = "verdana";

        avgLabel.style.fontWeight = "bold";

        avgLabel.style.fontSize = "9px";

        avgLabel.style.color = "#555555";

        avgLabel.style.verticalAlign = "middle";

        avgLabel.style.textAlign = "left";

        avgLabel.style.borderLeft = "1px solid #aaaaaa";

        avgLabel.style.borderRight = "1px solid #aaaaaa";

        avgLabel.style.borderBottom = "1px solid #aaaaaa";

        avgLabel.style.backgroundColor = "#ffdd00";

        avgLabel.style.whiteSpace = "nowrap";

        avgLabel.style.paddingLeft = "3px";

        avgLabel.style.top = statDiv.style.height;

        statDiv.style.height = (parseInt(statDiv.style.height, 10) + 20) + "px";

        avgLabel.style.color = "#444444";

        avgLabel.innerHTML = " ";

        var dailyEarnLabel = document.createElement("DIV");

        dailyEarnLabel.style.width = (parseInt(embed.width, 10) - 2 - 3) + "px";

        dailyEarnLabel.style.height = "14px";

        dailyEarnLabel.style.fontFamily = "verdana";

        dailyEarnLabel.style.fontWeight = "bold";

        dailyEarnLabel.style.fontSize = "9px";

        dailyEarnLabel.style.verticalAlign = "middle";

        dailyEarnLabel.style.textAlign = "left";

        dailyEarnLabel.style.borderLeft = "1px solid #aaaaaa";

        dailyEarnLabel.style.borderRight = "1px solid #aaaaaa";

        dailyEarnLabel.style.borderBottom = "1px solid #aaaaaa";

        dailyEarnLabel.style.backgroundColor = "#8899aa";

        dailyEarnLabel.style.whiteSpace = "nowrap";

        dailyEarnLabel.style.paddingLeft = "3px";

        dailyEarnLabel.style.top = statDiv.style.height;

        dailyEarnLabel.innerHTML = " ";

        statDiv.style.height = (parseInt(statDiv.style.height, 10) - (-20)) + "px";

        var graphLabel = [];

        if (currentPage.name === "refStats") {

// Code to insert stats below graphs on the Referral Statistics page

            if (myAccount.accountType === 0 && (graphNumber === 3 || graphNumber === 5 || graphNumber === 6)) {

                graphNumber += 2;

            }

            if (graphNumber === 0) {

// Direct clicks 

                dailyEarnLabel.style.color = "#444444";

                avgLabel.innerHTML = neobuxString("averages") + " :" +

                        " (" + myAccount.preferences.timePeriod_s3 + ") " + (directClicks.mean[myAccount.preferences.timePeriod_s3]).toFixed(3) +

                        " (" + myAccount.preferences.timePeriod_s2 + ") " + (directClicks.mean[myAccount.preferences.timePeriod_s2]).toFixed(3) +

                        " (" + myAccount.preferences.timePeriod_s1 + ") " + (directClicks.mean[myAccount.preferences.timePeriod_s1]).toFixed(3);

                statDiv.appendChild(avgLabel);

                earnStr = " " + neobuxString("avgIncome") + " :" +

                        " (" + myAccount.preferences.timePeriod_s3 + ") $" + ((directClicks.mean[myAccount.preferences.timePeriod_s3]) * myAccount.dReferralClickValue).toFixed(3) +

                        " (" + myAccount.preferences.timePeriod_s2 + ") $" + ((directClicks.mean[myAccount.preferences.timePeriod_s2]) * myAccount.dReferralClickValue).toFixed(3) +

                        " (" + myAccount.preferences.timePeriod_s1 + ") $" + ((directClicks.mean[myAccount.preferences.timePeriod_s1]) * myAccount.dReferralClickValue).toFixed(3);

                graphLabel[graphNumber] = "Direct Referral clicks credited";

                graphData = directClicks.value;

            } else if (graphNumber === 1) {

// Rented clicks

                dailyEarnLabel.style.color = "#444444";

                avgLabel.innerHTML = neobuxString("averages") + " :" +

                        " (" + myAccount.preferences.timePeriod_s3 + ") " + (rentedClicks.mean[myAccount.preferences.timePeriod_s3]).toFixed(2) +

                        " (" + myAccount.preferences.timePeriod_s2 + ") " + (rentedClicks.mean[myAccount.preferences.timePeriod_s2]).toFixed(2) +

                        " (" + myAccount.preferences.timePeriod_s1 + ") " + (rentedClicks.mean[myAccount.preferences.timePeriod_s1]).toFixed(2) + "";

                statDiv.appendChild(avgLabel);

                earnStr = " "+neobuxString("avgIncome") + " :" +

                        " (" + myAccount.preferences.timePeriod_s3 + ") $" + ((rentedClicks.mean[myAccount.preferences.timePeriod_s3]) * myAccount.referralClickValue).toFixed(3)+

                        " (" + myAccount.preferences.timePeriod_s2 + ") $" + ((rentedClicks.mean[myAccount.preferences.timePeriod_s2]) * myAccount.referralClickValue).toFixed(3)+

                        " (" + myAccount.preferences.timePeriod_s1 + ") $" + ((rentedClicks.mean[myAccount.preferences.timePeriod_s1]) * myAccount.referralClickValue).toFixed(3);

                graphLabel[graphNumber] = "Rented Referral clicks credited";

                graphData = rentedClicks.value;

            } else if (graphNumber === 2) {

// Recycle graph

                dailyEarnLabel.style.color = "#444444";

                avgLabel.innerHTML = neobuxString("recycledLast") + " " + myAccount.preferences.timePeriod_3 + " " + neobuxString("days") + ":" +

                        " " + (recycleCost.totals[myAccount.preferences.timePeriod_3] / myAccount.recycleCost).toFixed(0) +

                        " ($" + recycleCost.totals[myAccount.preferences.timePeriod_3].toFixed(3) + ")";

                statDiv.appendChild(avgLabel);

                customLogger("recycleCost.totals[myAccount.preferences.timePeriod_3] = " + recycleCost.totals[myAccount.preferences.timePeriod_3] + "\n" +

                        "recycleCost.totals[myAccount.preferences.timePeriod_2] = " + recycleCost.totals[myAccount.preferences.timePeriod_2] + "\n" +

                        "recycleCost.totals[myAccount.preferences.timePeriod_1] = " + recycleCost.totals[myAccount.preferences.timePeriod_1], 6);

                earnStr = " " + neobuxString("avgExpenses") + " :" +

                        " (" + myAccount.preferences.timePeriod_3 + ") $" + (recycleCost.mean[myAccount.preferences.timePeriod_3]).toFixed(3) +

                        " (" + myAccount.preferences.timePeriod_2 + ") $" + (recycleCost.mean[myAccount.preferences.timePeriod_2]).toFixed(3) +

                        " (" + myAccount.preferences.timePeriod_1 + ") $" + (recycleCost.mean[myAccount.preferences.timePeriod_1]).toFixed(3);

                graphLabel[graphNumber] = "Recycling Costs";

                graphData = recycleCost.value;

            } else if (graphNumber === 3) {

// Automatic Recycling

                earnStr = " " + neobuxString("avgARecycling") + " :" +

                        " (" + myAccount.preferences.timePeriod_3 + ") $" + (automaticRecycling.mean[myAccount.preferences.timePeriod_3]).toFixed(3) +

                        " (" + myAccount.preferences.timePeriod_2 + ") $" + (automaticRecycling.mean[myAccount.preferences.timePeriod_2]).toFixed(3) +

                        " (" + myAccount.preferences.timePeriod_1 + ") $" + (automaticRecycling.mean[myAccount.preferences.timePeriod_1]).toFixed(3);

                dailyEarnLabel.style.color = "#eeeeee";

                graphLabel[graphNumber] = "Automatic Recycling";

                graphData = automaticRecycling.value;

            } else if (graphNumber === 4) {

// One more month

                dailyEarnLabel.style.color = "#444444";

                earnStr = " "+neobuxString("avgExpenses") + " :" +

                        " (" + myAccount.preferences.timePeriod_3 + ") $" + (renewalCost.mean[myAccount.preferences.timePeriod_3]).toFixed(3) +

                        " (" + myAccount.preferences.timePeriod_2 + ") $" + (renewalCost.mean[myAccount.preferences.timePeriod_2]).toFixed(3) +

                        " (" + myAccount.preferences.timePeriod_1 + ") $" + (renewalCost.mean[myAccount.preferences.timePeriod_1]).toFixed(3);

                graphLabel[graphNumber] = "Renewal Costs";

                graphData = renewalCost.value;

            } else if (graphNumber === 5) {

// Autopay graph

                dailyEarnLabel.style.color = "#444444";

                avgLabel.innerHTML = neobuxString("autopaidLast") + " " + myAccount.preferences.timePeriod_3 + " " + neobuxString("days") + ":" +

                        " " + (autopayCost.totals[myAccount.preferences.timePeriod_3] / myAccount.autopayCost).toFixed(0) +

                        " ($" + autopayCost.totals[myAccount.preferences.timePeriod_3].toFixed(3) + ")";

                statDiv.appendChild(avgLabel);

                customLogger("autopayCost.totals[myAccount.preferences.timePeriod_3] = " + autopayCost.totals[myAccount.preferences.timePeriod_3] + "\n" +

                        "autopayCost.totals[myAccount.preferences.timePeriod_2] = " + autopayCost.totals[myAccount.preferences.timePeriod_2] + "\n" +

                        "autopayCost.totals[myAccount.preferences.timePeriod_1] = " + autopayCost.totals[myAccount.preferences.timePeriod_1], 6);

                earnStr = " " + neobuxString("avgExpenses") + " :" +

                        " (" + myAccount.preferences.timePeriod_3 + ") $" + (autopayCost.mean[myAccount.preferences.timePeriod_3]).toFixed(3) +

                        " (" + myAccount.preferences.timePeriod_2 + ") $" + (autopayCost.mean[myAccount.preferences.timePeriod_2]).toFixed(3) +

                        " (" + myAccount.preferences.timePeriod_1 + ") $" + (autopayCost.mean[myAccount.preferences.timePeriod_1]).toFixed(3);

                graphLabel[graphNumber] = "Autopay Costs";

                graphData = autopayCost.value;

            } else if (graphNumber === 6) {

// Transfers to Golden Pack Balance

                earnStr = " " + neobuxString("avgTransfersGPB") + ":" +

                        " (" + myAccount.preferences.timePeriod_3 + ") $" + fix(transfersToRentalBalance.mean[myAccount.preferences.timePeriod_3]) +

                        " (" + myAccount.preferences.timePeriod_2 + ") $" + fix(transfersToRentalBalance.mean[myAccount.preferences.timePeriod_2]) +

                        " (" + myAccount.preferences.timePeriod_1 + ") $" + fix(transfersToRentalBalance.mean[myAccount.preferences.timePeriod_1]);

                graphLabel[graphNumber] = "Transfers to Golden Pack Balance";

                graphData = transfersToGoldenPackBalance.value;

            } else if (graphNumber === 7) {

// Transfers to Rental Balance

                earnStr = " " + neobuxString("avgTransfersRB") + " :" +

                        " (" + myAccount.preferences.timePeriod_3 + ") $" + (transfersToRentalBalance.mean[myAccount.preferences.timePeriod_3]).toFixed(3) +

                        " (" + myAccount.preferences.timePeriod_2 + ") $" + (transfersToRentalBalance.mean[myAccount.preferences.timePeriod_2]).toFixed(3) +

                        " (" + myAccount.preferences.timePeriod_1 + ") $" + (transfersToRentalBalance.mean[myAccount.preferences.timePeriod_1]).toFixed(3);

                dailyEarnLabel.style.color = "#eeeeee";

                graphLabel[graphNumber] = "Transfers To Rental Balance";

                graphData = transfersToRentalBalance.value;

            } else if (graphNumber === 8) {

// Rentals due

                dailyEarnLabel = dailyEarnLabel = document.createElement("DIV");

                dailyEarnLabel.style.width = "318px";

                dailyEarnLabel.style.height = "14px";

                dailyEarnLabel.style.fontFamily = "verdana";

                dailyEarnLabel.style.fontWeight = "bold";

                dailyEarnLabel.style.fontSize = "9px";

                dailyEarnLabel.style.textAlign = "left";

                dailyEarnLabel.style.borderLeft = "1px solid #aaaaaa";

                dailyEarnLabel.style.borderRight = "1px solid #aaaaaa";

                dailyEarnLabel.style.borderBottom = "1px solid #aaaaaa";

                dailyEarnLabel.style.backgroundColor = "#8899aa";

                dailyEarnLabel.style.top = statDiv.style.height;

                statDiv.style.height = (parseInt(statDiv.style.height, 10) - (-20)) + "px";

                dailyEarnLabel.style.color = "#444444";

                var rentingPeriod_7 = parseInt(rentalsDue.totals[7], 10);

                var rentingPeriod_autopay = parseInt(rentalsDue.totals[myAccount.autopayLimit], 10);

                var rentingPeriod_autopayTo30 = parseInt(rentalsDue.totals[30] - rentalsDue.totals[myAccount.autopayLimit], 10);

                var rentingPeriod_30to60 = parseInt(rentalsDue.totals[60] - rentalsDue.totals[30], 10);

                var rentingPeriod_60to90 = parseInt(rentalsDue.totals[90] - rentalsDue.totals[60], 10);

                var rentingPeriod_90plus = parseInt(numberOfRentedReferrals - rentalsDue.totals[90], 10);

                customLogger("\nrentalsDue.totals[7] = " + rentalsDue.totals[7] + "\n" +

                        "rentalsDue.totals[myAccount.autopayLimit] = " + rentalsDue.totals[myAccount.autopayLimit] + "\n" +

                        "rentalsDue.totals[30] = " + rentalsDue.totals[30] + "\n" +

                        "rentalsDue.totals[60] = " + rentalsDue.totals[60] + "\n" +

                        "rentalsDue.totals[90] = " + rentalsDue.totals[90], 6);

                customLogger("\nrentingPeriod_7 = " + rentingPeriod_7 + "\n" +

                        "rentingPeriod_autopay = " + rentingPeriod_autopay + "\n" +

                        "rentingPeriod_autopayTo30 = " + rentingPeriod_autopayTo30 + "\n" +

                        "rentingPeriod_30to60 = " + rentingPeriod_30to60 + "\n" +

                        "rentingPeriod_60to90 = " + rentingPeriod_60to90 + "\n" +

                        "rentingPeriod_90plus = " + rentingPeriod_90plus, 5);

                var spacer2_start = "<font style='color: #6c4e2a; font-size: xx-small;'><small><small>/ ";

                var spacer2_end = "</font></small></small>";

                var rentingPeriod_totalTo30 = spacer2_start + rentalsDue.totals[30] + spacer2_end;

                var rentingPeriod_totalTo60 = spacer2_start + rentalsDue.totals[60] + spacer2_end;

                var rentingPeriod_totalTo90 = spacer2_start + rentalsDue.totals[90] + spacer2_end;

                var spacer = "<small><small>  |  </small></small>";

                earnStr = " | " + neobuxString("refferalsToBeRenewed") + " : " +

                        "(0-7) "                                 + rentingPeriod_7                + spacer +

                        "(0-" + myAccount.autopayLimit + ") "    + rentingPeriod_autopay          + spacer +

                        "(" + myAccount.autopayLimit + "-30) "   + rentingPeriod_autopayTo30      + " " + rentingPeriod_totalTo30 + " " + spacer +

                        "(30-60) "                               + rentingPeriod_30to60           + " " + rentingPeriod_totalTo60 + " " + spacer +

                        "(60-90) "                               + rentingPeriod_60to90           + " " + rentingPeriod_totalTo90 + " " + spacer +

                        "(90+) "                                 + rentingPeriod_90plus;

                dailyEarnLabel.style.width = "658px";

                dailyEarnLabel.style.borderTop = "1px solid #aaaaaa";

                graphLabel[graphNumber] = "Scheduled Renewals";

                graphData = rentalsDue.value;

            }

        } else if (currentPage.name == "accSummary") {

// Code to insert stats below graphs on the Account Summary page

            if (graphNumber === 0) {

// Own clicks (server time)

                GM.log("ownClicks");

                GM.log(ownClicks);

                GM.log("ownClicks.mean");

                GM.log(ownClicks.mean);

                GM.log("myAccount");

                GM.log(myAccount);

                GM.log("graphSettings.refGraphLength");

                GM.log(graphSettings.refGraphLength);

                GM.log("graphSettings.regularGraphLength");

                GM.log(graphSettings.regularGraphLength);

                GM.log("myAccount.preferences");

                GM.log(myAccount.preferences);

                GM.log("myAccount.preferences.timePeriod_s3");

                GM.log(myAccount.preferences.timePeriod_s3);

                GM.log("myAccount[\"preferences\"][\"timePeriod_s3\"]");

                GM.log(myAccount["preferences"]["timePeriod_s3"]);

                avgLabel.innerHTML = neobuxString("averages") + " :" +

                        " (" + myAccount.preferences.timePeriod_s3 + ") " + (ownClicks.mean[myAccount.preferences.timePeriod_s3]).toFixed(3) +

                        " (" + myAccount.preferences.timePeriod_s2 + ") " + (ownClicks.mean[myAccount.preferences.timePeriod_s2]).toFixed(3) +

                        " (" + myAccount.preferences.timePeriod_s1 + ") " + (ownClicks.mean[myAccount.preferences.timePeriod_s1]).toFixed(3) + "";

                statDiv.appendChild(avgLabel);

                earnStr = " " + neobuxString("avgIncome") + " :" +

                        " (" + myAccount.preferences.timePeriod_s3 + ") $" + ((ownClicks.mean[myAccount.preferences.timePeriod_s3]) * myAccount.ownClickValue).toFixed(3) +

                        " (" + myAccount.preferences.timePeriod_s2 + ") $" + ((ownClicks.mean[myAccount.preferences.timePeriod_s2]) * myAccount.ownClickValue).toFixed(3) +

                        " (" + myAccount.preferences.timePeriod_s1 + ") $" + ((ownClicks.mean[myAccount.preferences.timePeriod_s1]) * myAccount.ownClickValue).toFixed(3);

                dailyEarnLabel.style.color = "#eeeeee";

                graphLabel[graphNumber] = "Personal Clicks";

                graphData = ownClicks.value;

            } else if (graphNumber === 1) {

// Own clicks (local time)

                avgLabel.innerHTML = neobuxString("averages") + " :" +

                        " (" + myAccount.preferences.timePeriod_s3 + ") " + (ownClicks_Local.mean[myAccount.preferences.timePeriod_s3]).toFixed(3) +

                        " (" + myAccount.preferences.timePeriod_s2 + ") " + (ownClicks_Local.mean[myAccount.preferences.timePeriod_s2]).toFixed(3) +

                        " (" + myAccount.preferences.timePeriod_s1 + ") " + (ownClicks_Local.mean[myAccount.preferences.timePeriod_s1]).toFixed(3) + "";

                statDiv.appendChild(avgLabel);

                earnStr = " " + neobuxString("avgIncome") + " :" +

                        " (" + myAccount.preferences.timePeriod_s3 + ") $" + ((ownClicks_Local.mean[myAccount.preferences.timePeriod_s3]) * myAccount.ownClickValue).toFixed(3) +

                        " (" + myAccount.preferences.timePeriod_s2 + ") $" + ((ownClicks_Local.mean[myAccount.preferences.timePeriod_s2]) * myAccount.ownClickValue).toFixed(3) +

                        " (" + myAccount.preferences.timePeriod_s1 + ") $" + ((ownClicks_Local.mean[myAccount.preferences.timePeriod_s1]) * myAccount.ownClickValue).toFixed(3);

                dailyEarnLabel.style.color = "#eeeeee";

                graphLabel[graphNumber] = "Own Clicks";

                graphData = ownClicks_Local.value;

            }

        }

        dailyEarnLabel.innerHTML = earnStr;

        statDiv.appendChild(dailyEarnLabel);

// Add Export Links

// Create and insert wrapper for export 'tabs'

        var exportTabsWrapper = document.createElement("div");

        exportTabsWrapper.style.position = "relative";

        exportTabsWrapper.style.bottom = "-1px";

        exportTabsWrapper.style.textAlign = "left";

        exportTabsWrapper.id = "exportTabsWrapper_" + graphNumber;

        exportTabsWrapper.style.width = (parseFloat(embed.width) - 5) + "px";

        exportTabsWrapper.innerHTML = " ";

        statDiv.insertBefore(exportTabsWrapper,embed);

// Define the export 'tabs'

        var csvExportTab = document.createElement("div");

        var tsvExportTab = document.createElement("div");

        var xmlExportTab = document.createElement("div");

        var textExportTab = document.createElement("div");

        var exportTabStyle = "-moz-border-radius: 0.6em 0.6em 0px 0px; display: inline-block; font-size: xx-small; padding: 0px 7px; margin-right: 7px; text-align: center; cursor: pointer;";

        csvExportTab.setAttribute("style", exportTabStyle);

        csvExportTab.style.backgroundColor = "#ecd";

        csvExportTab.className = "csvExportTab exportTab";

        csvExportTab.id = "csvExportTab_" + graphNumber;

        csvExportTab.innerHTML = "CSV";

        tsvExportTab.setAttribute("style", exportTabStyle);

        tsvExportTab.style.backgroundColor = "#edc";

        tsvExportTab.className = "tsvExportTab exportTab";

        tsvExportTab.id = "tsvExportTab_" + graphNumber;

        tsvExportTab.innerHTML = "TSV";

        xmlExportTab.setAttribute("style", exportTabStyle);

        xmlExportTab.style.backgroundColor = "#cde";

        xmlExportTab.setAttribute("class", "xmlExportTab exportTab");

        xmlExportTab.id = "xmlExportTab_" + graphNumber;

        xmlExportTab.innerHTML = "XML";

        textExportTab.setAttribute("style", exportTabStyle);

        textExportTab.style.backgroundColor = "#dce";

        textExportTab.setAttribute("class", "textExportTab exportTab");

        textExportTab.id = "textExportTab_" + graphNumber;

        textExportTab.innerHTML = "Text";

        var line_text = [];

        var line_CSV = [];

        var line_TSV = [];

        for (var i = 1; i <= graphData.slice(1).length; i += 1) {

            var date = new Date();

            if (graphNumber !== 6 ) {

                date.setDate(Today.getDate() - i + 1);

            } else {

                date.setDate(Today.getDate() + i - 1);

            }

            var currentDate = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();

            line_text[i - 1] = graphData[i];

            line_CSV[i - 1] = currentDate + "," + graphData[i];

            line_TSV[i - 1] = currentDate + "\t" + graphData[i];

        }

        var textAreaContents_text = line_text.join("\n");

        var textAreaContents_CSV = line_CSV.join(",\n");

        var textAreaContents_TSV = line_TSV.join("\t\n");

        var textAreaContents_reverse_text = line_text.reverse().join("\n");

        var textAreaContents_reverse_CSV = line_CSV.reverse().join(",\n");

        var textAreaContents_reverse_TSV = line_TSV.reverse().join("\t\n");

// Insert 'Export as CSV' Tab and attach click event

        document.getElementById("exportTabsWrapper_" + graphNumber).appendChild(csvExportTab);

        csvExportTab.addEventListener("click",

                function (event) {

                    var textareaContents = textAreaContents_CSV;

                    if (event.ctrlKey) {

                        var textareaContents = textAreaContents_reverse_CSV;

                    }

                    createCustomAlert(graphLabel[graphNumber] + ":", textareaContents, "Exporting to CSV..");

                }, false);

// Insert 'Export as TSV' Tab and attach click event

        document.getElementById("exportTabsWrapper_" + graphNumber).appendChild(tsvExportTab);

        tsvExportTab.addEventListener("click",

                function (event) {

                    var textareaContents = textAreaContents_TSV;

                    if (event.ctrlKey) {

                        var textareaContents = textAreaContents_reverse_TSV;

                    }

                    createCustomAlert(graphLabel[graphNumber] + ":", textareaContents, "Exporting to TSV..");

                }, false);

// Insert 'Export as Text' Tab and attach click event

        document.getElementById("exportTabsWrapper_" + graphNumber).appendChild(textExportTab);

        textExportTab.addEventListener("click",

                function (event) {

                    var textareaContents = textAreaContents_text;

                    if (event.ctrlKey) {

                        var textareaContents = textAreaContents_reverse_text;

                    }

                    createCustomAlert(graphLabel[graphNumber] + ":", textareaContents, "Exporting as text..");

                }, false);

    }



    function setHeaderProperties(header) {

        header.setAttribute("class", "bgt");

        header.style.setProperty("font-family", "Arial,Helvetica,Verdana,sans-serif", "");

        header.style.setProperty("white-space", "nowrap", "");

        header.style.setProperty("text-align", "center", "");

    }



    function setFieldProperties(field) {

        field.setAttribute("class", "f_r l");

        field.style.setProperty("white-space", "nowrap", "");

        field.style.setProperty("text-align", "right", "");

    }



    function shrinkContents(column) {

        column.style.setProperty("letter-spacing", myAccount.preferences.letterSpacing, "");

        column.style.setProperty("word-spacing", myAccount.preferences.wordSpacing, "");

    }



    function referralPage() {

// Function that runs on the Referral Listings pages

        var renewalPeriod = 0;

        var renewalCost = 0;

        var renewalCostPerRefPerDay = 0;

        var goldenFeePerRefPerDay = 0;

        var goldenPackFeePerRefPerDay = 0;

        var expensesPerRefPerDay = 0;

        var minBreakEvenAvgExcludingRecycles = 0;

        if (currentPage.name === "rentedRefListing") {

// Define the column indexes

            var col_NUMBER = 0;

            var col_FLAG = 1;

            var col_NAME = 3;

            var col_SINCE = 4;

            var col_NEXTPAYMENT = 5;

            var col_LAST = 6;

            var col_CLICKS = 7;

            var col_AVG = 8;

            var colHeader_NAME = 1;

            var colHeader_SINCE = 2;

            var colHeader_NEXTPAYMENT = 3;

            var colHeader_LAST = 4;

            var colHeader_CLICKS = 5;        

            var colHeader_AVG = 6;

// CALCULATE REFERRAL EXPENSES PER DAY AND MIN BREAK EVEN AVERAGE

            renewalPeriod = myAccount.preferences.renewalPeriod;

            renewalCost = myAccount.renewalFee(renewalPeriod); // Cost of renewing for the renewing period

// Cost of renewing, per ref per day

            renewalCostPerRefPerDay = renewalCost / renewalPeriod;

            if (myAccount.accountType > 0) {

// Cost of golden & golden packs per ref, per day

                goldenFeePerRefPerDay = (90 / 365) / numberOfRentedReferrals;

                goldenPackFeePerRefPerDay = (myAccount.goldenPackCost / 365) / numberOfRentedReferrals;

            }

// Calculate how much referrals cost per day

            expensesPerRefPerDay = renewalCostPerRefPerDay + goldenFeePerRefPerDay + goldenPackFeePerRefPerDay;

// Calculate the minimum average needed to pay for the expenses of each ref each day

            minBreakEvenAvgExcludingRecycles = expensesPerRefPerDay / myAccount.referralClickValue;

        } else if (currentPage.name === "directRefListing") {

// Define the column indexes

            var col_NUMBER = 0;

            var col_NAME = 1;

            var col_CAME_FROM = 2;

            var col_SINCE = 3;

            var col_LAST = 4;

            var col_CLICKS = 5;

            var col_AVG = 6;

            var colHeader_NAME = 1;

            var colHeader_CAME_FROM = 2;

            var colHeader_SINCE = 3;

            var colHeader_LAST = 4;

            var colHeader_CLICKS = 5;

            var colHeader_AVG = 6;

        } else {

            GM.log("Error defining column indexes - currentPage.name is unknown.");

        }

        var sumOfAverages = 0;

        var clickSum = 0;

        var activeRefCount = 0;

        var refCount = -1;

        var todayClickers = 0;

        var ydayClickers = 0;

        var zeroClickers = 0;

        var otherClickers = 0;

        var currencySymbol_AVG = myAccount.preferences.columnPrefix_Average;

        var currencySymbol_clickText = myAccount.ultimatePreferences.columnPrefix_clickText;

        var currencySymbol_average1 = myAccount.ultimatePreferences.columnPrefix_Average1;

        var currencySymbol_average2 = myAccount.ultimatePreferences.columnPrefix_Average2;

        var currencySymbol_RSA = myAccount.ultimatePreferences.columnPrefix_RSA;

        var currencySymbol_SD = myAccount.ultimatePreferences.columnPrefix_SD;

        var currencySymbol_Profit = myAccount.preferences.columnPrefix_Profit;

        var minigraphs = [];

// mainTable = the table which shows the referrals are contained

        var mainTable = selectNode("//td[@class='bgt']/ancestor::tbody[1]");

        if (mainTable === null) {

            return;

        }

        var rows = mainTable.rows;

        var headerRow = rows[0];

        var lastHeader = headerRow.childNodes[colHeader_AVG + 1];

        if (myAccount.preferences.referralName_shrinkContents) {

            shrinkContents(headerRow.childNodes[colHeader_NAME]);

        }

        if (myAccount.preferences.ownedSince_shrinkContents) {

            shrinkContents(headerRow.childNodes[colHeader_SINCE]);

        }

        if (currentPage.name === "directRefListing" &&

                myAccount.preferences.cameFrom_shrinkContents) {

            shrinkContents(headerRow.childNodes[colHeader_CAME_FROM]);

        }

        if (currentPage.name === "rentedRefListing" &&

                myAccount.preferences.nextPayment_shrinkContents) {

            shrinkContents(headerRow.childNodes[colHeader_NEXTPAYMENT]);

        }

        if (myAccount.preferences.lastClick_shrinkContents) {

            shrinkContents(headerRow.childNodes[colHeader_LAST]);

        }

        if (myAccount.preferences.totalClicks_shrinkContents) {

            shrinkContents(headerRow.childNodes[colHeader_CLICKS]);

        }

        if (myAccount.preferences.exactAverage_show) {

            setHeaderProperties(headerRow.childNodes[colHeader_AVG]);

            headerRow.childNodes[colHeader_AVG].innerHTML +=

                    myAccount.preferences.exactAverage_seperator + "Avg Exacto";

        }

        if (myAccount.preferences.average_shrinkContents) {

            shrinkContents(headerRow.childNodes[colHeader_AVG]);

        }

// Ultimate-only columns

        if (myAccount.accountType === 6) {

// clickText column === A textual representation of the data in the mini click graphs

            if (myAccount.ultimatePreferences.showColumn_clickText === true) {

                var new_clickText = document.createElement("td");

                setHeaderProperties(new_clickText);

                new_clickText.innerHTML = "Clicks/día";

                headerRow.insertBefore(new_clickText, lastHeader);

                if (myAccount.ultimatePreferences.clickText_shrinkContents) {

                    shrinkContents(new_clickText);

                }

            }

// 'average1' column === Average for the last 10 days

            if (myAccount.ultimatePreferences.showColumn_Average1 === true) {

                var new_headerAvg_10 = document.createElement("td");

                setHeaderProperties(new_headerAvg_10);

                new_headerAvg_10.innerHTML = "A" + myAccount.ultimatePreferences.timePeriod_average1;

                headerRow.insertBefore(new_headerAvg_10, lastHeader);

                if (myAccount.ultimatePreferences.average1_shrinkContents) {

                    shrinkContents(new_headerAvg_10);

                }

            }

// 'average2' column === Average for the last 7 days

            if (myAccount.ultimatePreferences.showColumn_Average2 === true) {

                var new_headerAvg_7 = document.createElement("td");

                setHeaderProperties(new_headerAvg_7);

                new_headerAvg_7.innerHTML = "A" + myAccount.ultimatePreferences.timePeriod_average2;

                headerRow.insertBefore(new_headerAvg_7, lastHeader);

                if (myAccount.ultimatePreferences.average2_shrinkContents) {

                    shrinkContents(new_headerAvg_7);

                }

            }

// 'SDEV' column === Standard Deviation

            if (myAccount.ultimatePreferences.showSDEVColumn === true) {

                var new_headerSDEV = document.createElement("td");

                setHeaderProperties(new_headerSDEV);

                new_headerSDEV.innerHTML = "SD";

                headerRow.insertBefore(new_headerSDEV, lastHeader);

                if (myAccount.ultimatePreferences.SD_shrinkContents) {

                    shrinkContents(new_headerSDEV);

                }

            }

// 'RSA' column === Ratio of standard deviation / average (mean)

            if (myAccount.ultimatePreferences.showColumn_RSA === true) {

                var new_headerRSA = document.createElement("td");

                setHeaderProperties(new_headerRSA);

                new_headerRSA.innerHTML = "RSA";

                headerRow.insertBefore(new_headerRSA, lastHeader);

                if (myAccount.ultimatePreferences.RSA_shrinkContents) {

                    shrinkContents(new_headerRSA);

                }

            }

        }

// 'Profit' column can be viewed by all members

        if (myAccount.preferences.showColumn_Profit === true) {

            var new_headerPROFIT = document.createElement("td");

            setHeaderProperties(new_headerPROFIT);

            new_headerPROFIT.innerHTML = "Ganancias";

            headerRow.insertBefore(new_headerPROFIT, lastHeader);

            if (myAccount.preferences.profitColumn_shrinkContents) {

                shrinkContents(new_headerPROFIT);

            }

        }

// Fetch the script that contains referral listing data

        var xpathResults_mtx = selectNode("//script[contains(.,'mtx=')]");

// Fetch the useful part of the script and replace the '];' that got removed by split()

        var mtxCode = xpathResults_mtx.innerHTML.split("];")[0] + "];";

        mtxCode = mtxCode.replace(/([0-9]+\.*[0-9]*)([,|\]])/g, "'$1'$2");

        customLogger("xpathResults_mtx = " + xpathResults_mtx + "\n" +

                "mtxCode = " + mtxCode, 7);

// Run the code in mtxCode (var mtx=[...];)

        eval(mtxCode);

// Ultimate-only columns

        if (myAccount.accountType === 6) {

// mtx.length = # of referrals shown on current page

            for (var z = 0; z < mtx.length; z += 1) {

                var clickData = mtx[z][14].toString();

                var clickData_array = [];

                customLogger("clickData = " + clickData, 7);

// Make the minigraph data more useable by splitting it into an array

                if (clickData !== "0") {

                    clickData.split("");

                    for (var i = 0; i < clickData.length; i += 1) {

                        clickData_array[i] = parseInt(clickData[i], 10);

                    }

                } else {

                    clickData_array = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

                }

// Now reverse the order of the array so that the most recent days are first ([0] == today, [1] == yesterday)

                clickData_array.reverse();

                customLogger("typeof clickData_array = " + typeof clickData_array + "\n" +

                        "clickData_array = " + clickData_array, 7);

// Extract the stats from the minigraph data

                var minigraphClickData = [];

                var minigraphClickSums = [];

                var minigraphClickAvgs = [];

                for (var m = 0; m < clickData_array.length; m += 1) {

                    minigraphClickData[m] = parseInt(clickData_array[m], 10);

                }

                for (var s = 0; s < minigraphClickData.length; s += 1) {

                    if (s === 0) {

                        minigraphClickSums[s] = minigraphClickData[s];

                    } else {

                        minigraphClickSums[s] = minigraphClickSums[s - 1] + minigraphClickData[s];

                    }

                    minigraphClickAvgs[s] = minigraphClickSums[s] / (s + 1);

                    customLogger("s = " + s + "\n" +

                            "minigraphClickData[s] = " + minigraphClickData[s] + "\n" +

                            "minigraphClickSums[s - 1] = " + minigraphClickSums[s - 1] + "\n" +

                            "minigraphClickSums[s] = " + minigraphClickSums[s] + "\n" +

                            "minigraphClickAvgs[s] = " + minigraphClickAvgs[s], 12);

                }

                minigraphs[z] = new graphProperties(minigraphClickData, minigraphClickSums);

            }

        }

// Loop through the displayed referrals

        for (var rowCounter = 1; rowCounter < (rows.length - 1); rowCounter += 1) {

            var currentRow = rows[rowCounter];

// If the row isn't blank, process it

            if (currentRow.textContent !== "" && currentRow.childNodes.length > 1) {

                refCount += 1;

                customLogger("rowCounter = " + rowCounter + "\n" +

                        "currentRow = " + currentRow + "\n" +

                        "refCount = " + refCount, 7);

                var lastColumn = currentRow.childNodes[col_AVG + 1];

                var refFlag = currentRow.childNodes[col_FLAG];

                var refName = currentRow.childNodes[col_NAME];

                var refOwnedSince = currentRow.childNodes[col_SINCE];

                if (currentPage.name === "rentedRefListing") {

                    var refNextPayment = currentRow.childNodes[col_NEXTPAYMENT];

                }

                var refLastClick = currentRow.childNodes[col_LAST];

                var refTotalClicks = currentRow.childNodes[col_CLICKS];

                var refOverallAvg = currentRow.childNodes[col_AVG];

                if (currentPage.name === "rentedRefListing" &&

                        myAccount.preferences.flag_shrinkContents) {

                    shrinkContents(refFlag);

                }

                if (myAccount.preferences.referralNumber_shrinkContents) {

                    shrinkContents(currentRow.childNodes[col_NUMBER]);

                }

                if (myAccount.preferences.referralName_shrinkContents) {

                    shrinkContents(refName);

                }

                if (myAccount.preferences.ownedSince_shrinkContents) {

                    shrinkContents(refOwnedSince);

                }

                if (currentPage.name === "rentedRefListing" &&

                        myAccount.preferences.nextPayment_shrinkContents) {

                    shrinkContents(refNextPayment);

                }

                if (myAccount.preferences.lastClick_shrinkContents) {

                    shrinkContents(refLastClick);

                }

                if (myAccount.preferences.totalClicks_shrinkContents) {

                    shrinkContents(refTotalClicks);

                }

                if (myAccount.preferences.average_shrinkContents) {

                    shrinkContents(refOverallAvg);

                }

// Columns specific to the direct referrals page

                if (currentPage.name === "directRefListing" &&

                        myAccount.preferences.cameFrom_shrinkContents) {

                    shrinkContents(currentRow.childNodes[col_CAME_FROM]);

                }

                if (myAccount.preferences.textifyFlag && 

                        currentPage.name === "rentedRefListing") {

// Get the flag colour of the referral

                    var flagColour;

                    if (refFlag.innerHTML.indexOf("flag0.gif") > -1) {

                        flagColour = neobuxString("W");

                    } else if (refFlag.innerHTML.indexOf("flag1.gif") > -1) {

                        flagColour = neobuxString("R");

                    } else if (refFlag.innerHTML.indexOf("flag2.gif") > -1) {

                        flagColour = neobuxString("O");

                    } else if (refFlag.innerHTML.indexOf("flag3.gif") > -1) {

                        flagColour = neobuxString("Y");

                    } else if (refFlag.innerHTML.indexOf("flag4.gif") > -1) {

                        flagColour = neobuxString("G");

                    } else if (refFlag.innerHTML.indexOf("flag5.gif") > -1) {

                        flagColour = neobuxString("B");

                    }

                    refFlag.style.whiteSpace = "nowrap";

                    refFlag.innerHTML += myAccount.preferences.textifyFlag_prefix + flagColour;

                }

// Extract the 'wholeDays' data from the table

                var numDaysOwned_raw = refOwnedSince.innerHTML.replace("&nbsp;", "");

                var lastClick_raw = refLastClick.innerHTML.replace("&nbsp;", "");

// Calculate the number of days referral has been owned and convert this to a 'fuller' version [x days, y hours, z mins]

// If {column}_shortFormat === true, it will return [x d, y h, z m] instead

// If 'fullerSinceTimers' is set to false, NumDaysSince() will return only the whole number of days that have passed

                var numDaysOwned_summarised = NumDaysSince(numDaysOwned_raw, "mins", myAccount.preferences.referralSince_fullerTimers, myAccount.preferences.ownedSinceTimer_shortFormat, "daysOwned");

// If the referral has not clicked yet, the referral has been inactive for as long as it has been owned

// Else the referral has been inactive since the date of its last click

                if (lastClick_raw.match(neobuxString("noClicks"))) {

                    var inactiveDays = NumDaysSince(numDaysOwned_raw, "days", myAccount.preferences.lastClick_fullerTimers, myAccount.preferences.lastClickTimer_shortFormat, "lastClick");

                    var accurateLastClick = NumDaysSince(numDaysOwned_raw, "decimal", myAccount.preferences.lastClick_fullerTimers, myAccount.preferences.lastClick_fullerTimers, false, "lastClick");

                } else  {

                    var inactiveDays = NumDaysSince(lastClick_raw , "days", myAccount.preferences.lastClick_fullerTimers, myAccount.preferences.lastClickTimer_shortFormat, "lastClick");

                    var accurateLastClick = NumDaysSince(lastClick_raw, "decimal", myAccount.preferences.lastClick_fullerTimers, myAccount.preferences.lastClick_fullerTimers, false, "lastClick");

                }

// Insert the summarised date / 'time elapsed' to the cell

// If user preference is to not replace the whole cell, append to end of existing cell contents, else replace the cell contents

// 'Owned Since' column

                if (myAccount.preferences.referralSince_numerise) {

                    if (!myAccount.preferences.referralSince_replace) {

                        refOwnedSince.innerHTML = numDaysOwned_raw + "<small style='color: #666666;'> (" + numDaysOwned_summarised + ")</small>";

                    } else {

                        refOwnedSince.innerHTML = numDaysOwned_summarised;

                    }

                }

// 'Last Click' column

                if (myAccount.preferences.lastClick_numerise) {

                    if (myAccount.preferences.lastClick_replace || (myAccount.preferences.lastClick_replaceNilClicks && parseInt(refTotalClicks.textContent, 10) === 0)) {

                        refLastClick.innerHTML = inactiveDays;

                    } else {

                        refLastClick.innerHTML = lastClick_raw + "<small style='color: #666666;'> [" + inactiveDays + "]</small>";

                    }

                }

// Avg. column

                var accurateOwnedSince = NumDaysSince(numDaysOwned_raw, 'decimal', myAccount.preferences.referralSince_fullerTimers, false, 'ownedSince');

                var accurateAverage = parseInt(refTotalClicks.textContent, 10) / accurateOwnedSince;

                if (myAccount.preferences.exactAverage_show) {

// Replace the displayed average (accurate to a 24hour period) with one that that is more accurate

// (takes hours and minutes into account)

                    if (myAccount.preferences.exactAverage_replace) {

                        refOverallAvg.innerHTML = fix(accurateAverage);

                    } else {

                        refOverallAvg.innerHTML = refOverallAvg.innerHTML + "<span style='color: #666666;'>" + myAccount.preferences.exactAverage_seperator + fix(accurateAverage) + "</span>";

                    }

                }

                refOverallAvg.innerHTML = currencySymbol_AVG + "" + refOverallAvg.innerHTML; // + "" + is necessary to ensure that the vars are concatenated (as opposed to mathematical addition)

// Update the overall statistics for the single page of referrals (data used for bar at bottom of the referral listing page)

                if (parseFloat(refOverallAvg.textContent) > 0) {

                    sumOfAverages += parseFloat(refOverallAvg.textContent);

                    clickSum += parseInt(refTotalClicks.textContent, 10);

                    activeRefCount += 1;

                }

// Keep a tally of how many referrals clicked today / yesterday / never / other

                if (parseInt(refTotalClicks.textContent, 10) === 0) {

                    zeroClickers += 1;

                } else if (Math.floor(accurateLastClick) === 0) {

                    todayClickers += 1;

                } else if (Math.floor(accurateLastClick) === 1) {

                    ydayClickers += 1;

                } else {

                    otherClickers += 1;

                }

// INSERT EXTRA COLUMNS

// Ultimate-only columns

                if (myAccount.accountType === 6) {

// clickText column === A textual representation of the data in the mini click graphs

                    if (myAccount.ultimatePreferences.showColumn_clickText === true) {

                        var columnText_clickText = minigraphs[refCount].value[minigraphs[refCount].value.length - 1].toFixed(0);

                        for (var i = minigraphs[refCount].value.length - 2; i > 0; i -= 1) {

                            columnText_clickText += "|" + minigraphs[refCount].value[i].toFixed(0);

                        }

                        var newColumn_clickText = document.createElement("td");

                        setFieldProperties(newColumn_clickText);

                        newColumn_clickText.innerHTML = currencySymbol_clickText + columnText_clickText;

                        if (myAccount.ultimatePreferences.clickText_shrinkContents) {

                            shrinkContents(newColumn_clickText);

                        }

                        currentRow.insertBefore(newColumn_clickText, lastColumn);

                    }

// 'average1' column === Average for the last timePeriod_average1 days

                    if (myAccount.ultimatePreferences.showColumn_Average1 === true) {

                        var columnText_average1 = fix(minigraphs[refCount].mean[myAccount.ultimatePreferences.timePeriod_average1]);

                        var newColumn_average1 = document.createElement("td");

                        setFieldProperties(newColumn_average1);

                        newColumn_average1.innerHTML = currencySymbol_average1 + columnText_average1;

                        if (myAccount.ultimatePreferences.average1_shrinkContents) {

                            shrinkContents(newColumn_average1);

                        }

                        currentRow.insertBefore(newColumn_average1, lastColumn);

                    }

// 'average2' column === Average for the last 7 days

                    if (myAccount.ultimatePreferences.showColumn_Average2 === true) {

                        var columnText_average2 = fix(minigraphs[refCount].mean[myAccount.ultimatePreferences.timePeriod_average2]);

                        var newColumn_average2 = document.createElement("td");

                        setFieldProperties(newColumn_average2);

                        newColumn_average2.innerHTML = currencySymbol_average2 + columnText_average2;

                        if (myAccount.ultimatePreferences.average2_shrinkContents) {

                            shrinkContents(newColumn_average2);

                        }

                        currentRow.insertBefore(newColumn_average2, lastColumn);

                    }

// 'SDEV' column === Standard DEViation for the last 10 days

                    if (myAccount.ultimatePreferences.showSDEVColumn === true) {

                        var columnText_SDEV = fix(minigraphs[refCount].sdev);

                        var newColumn_SDEV = document.createElement("td");

                        setFieldProperties(newColumn_SDEV);

                        newColumn_SDEV.innerHTML = currencySymbol_SD + columnText_SDEV;

                        if (myAccount.ultimatePreferences.SD_shrinkContents) {

                            shrinkContents(newColumn_SDEV);

                        }

                        currentRow.insertBefore(newColumn_SDEV, lastColumn);

                    }

// 'RSA' column === Ratio of standard deviation / average (mean)

                    if (myAccount.ultimatePreferences.showColumn_RSA === true) {

                        var columnText_RSA = fix(minigraphs[refCount].sdev / minigraphs[refCount].mean[10]);

                        var newColumn_RSA = document.createElement("td");

                        setFieldProperties(newColumn_RSA);

                        newColumn_RSA.innerHTML = currencySymbol_RSA + columnText_RSA;

                        if (myAccount.ultimatePreferences.RSA_shrinkContents) {

                            shrinkContents(newColumn_RSA);

                        }

                        currentRow.insertBefore(newColumn_RSA, lastColumn);

                    }

                }

// 'Profit' column can be viewed by all members

                if (myAccount.preferences.showColumn_Profit) {

// Retrieve numerical version of numDaysOwned and other details about the current individual referral

                    var numDaysOwned_decimal = NumDaysSince(numDaysOwned_raw, "wholeDays", myAccount.preferences.lastClick_fullerTimers, false, "lastClick");

                    var refClicks = parseInt(refTotalClicks.innerHTML, 10);

                    var refID = refName.textContent.replace(/^\s*(\S*(\s+\S+)*)\s*$/, "$1");

                    var indivAvg = accurateAverage;

// Calculate the gross income and expenses for the referral (accurate to the minute)

                    var grossIn;

                    if (currentPage.name === "directRefListing") {

                        grossIn = refClicks * myAccount.dReferralClickValue;

                    } else {

                        grossIn = refClicks * myAccount.referralClickValue;

                    }

                    var grossOut;

                    if (currentPage.name === "rentedRefListing") {

                        grossOut = numDaysOwned_decimal * expensesPerRefPerDay;

                    } else if (currentPage.name === "directRefListing") {

                        grossOut = 0;

                    } else {

                        grossOut = 1000;

                    }

                    var netProfit_exclRecycles = grossIn - grossOut;

                    var netProfit_inclRecycles = (grossIn - grossOut) - myAccount.recycleCost;

                    var profitPerDay = (indivAvg * myAccount.referralClickValue) - expensesPerRefPerDay;

                    

                    customLogger("currentPage.name = " + currentPage.name + "\n" +

                            "numDaysOwned_decimal = " + numDaysOwned_decimal + "\n" +

                            "expensesPerRefPerDay = " + expensesPerRefPerDay + "\n" +

                            "grossOut = " + grossOut + "\n" +

                            "grossIn = " + grossIn + "\n" +

                            "myAccount.recycleCost = " + myAccount.recycleCost + "\n" +

                            "netProfit_exclRecycles = " + netProfit_exclRecycles + "\n" +

                            "netProfit_inclRecycles = " + netProfit_inclRecycles, 7);

// Calculate the net income of the individual referral slot

// If the user wishes to include the cost of recycling in the profit column, include the recycle fee 

// in the gross expenses for the referral

                    var PROFIT;

                    if (!myAccount.preferences.includeRecycleCostInProfitColumn || (currentPage.name === "directRefListing")) {

                        PROFIT = netProfit_exclRecycles;

                    } else {

                        PROFIT = netProfit_inclRecycles;

                    }

// Calculate how many days it will take for the referral to pay for its own recycle

// --> Assumes that the referral has clicked consistently at the current average 

// --> Odd results from this will be shown if the referral has vastly changing click patterns

// --> Will return 'More than '+dayLimit+' days' if it will take > dayLimit days to pay for own recycle (dayLimit: default = 30)

                    var daysTilPaidOwnRecycle = getDaysTilPaidOwnRecycle(indivAvg, netProfit_exclRecycles, expensesPerRefPerDay);

                    if (!isNaN(daysTilPaidOwnRecycle)) {

                        var daysLeftToRepay = daysTilPaidOwnRecycle - numDaysOwned_decimal;

                    } else {

                        if (parseFloat(indivAvg) < parseFloat(minBreakEvenAvgExcludingRecycles)) {

                            var daysTilPaidOwnRecycle = "Nunca";

                        }

                        var daysLeftToRepay = "N/A";

                    }

// Create the new 'Profit' column

                    var newColumn_PROFIT = document.createElement("td");

                    setFieldProperties(newColumn_PROFIT);

                    newColumn_PROFIT.id = "Profit_" + refID; // This ID is used by 'prototip' as an anchor to attach the tooltip to

// If the net profit is negative, format it differently

                    newColumn_PROFIT.style.setProperty("color", PROFIT >= 0 ? "#008000" : "#800000", "");

                    newColumn_PROFIT.innerHTML = PROFIT >= 0 ?

                            currencySymbol_Profit + fix(PROFIT) :

                            "(" + currencySymbol_Profit + fix(-PROFIT) + ")";

                    if (myAccount.preferences.profitColumn_shrinkContents) {

                        shrinkContents(newColumn_PROFIT);

                    }

// Insert the new 'Profit' column

                    currentRow.insertBefore(newColumn_PROFIT, lastColumn);

// If the current page is the rented referral listing page, create and insert the tooltips

                    if (currentPage.name === "rentedRefListing") {

                        var tipContent = "<p>Referido: <b>" + refID + "</b></p>" +

                                "<hr>" +

                                "<i><small>Gastos</small></i><br/>" +

                                "Renovaciones <i><small>(" + (renewalPeriod === 1 ? "AutoPago" : ("Renovaciones a " + renewalPeriod + " días")) + ")</small></i> = <b>$" + fix(renewalCostPerRefPerDay) + "</b><br/>";

// Add Golden / Golden Pack-specific lines to the tooltip

                        if (myAccount.accountType > 0) {

                            tipContent = tipContent + "Cuota Golden <i><small>(por RR por día)</small></i> = <b>$" + fix(goldenFeePerRefPerDay) + "</b><br/>";

                        }

                        if (myAccount.accountType > 1) {

                            tipContent = tipContent + "Cuota de Paquete-Golden <i><small>(por RR por día)</small></i> = <b>$" + fix(goldenPackFeePerRefPerDay) + "</b><br/>";

                        }

                        tipContent = tipContent +

                                "Gastos Totales <i><small>(por RR por día)</small></i> = <b>$" + fix(expensesPerRefPerDay) + "</b><br/>" +

                                "<br/>" +

                                "Avg Mínimo <i><small>(para cubrir gastos)</small></i> = <b>" + fix(minBreakEvenAvgExcludingRecycles) + "</b><br/>" +

                                "Ingresos Brutos = <b>$" + fix(grossIn) + "</b><br/>" +

                                "Egresos Brutos = <b>$" + fix(grossOut) + "</b><br/>" +

                                "Beneficio Actual = <b>$" + fix(netProfit_exclRecycles) + "</b><br/>" +

                                "Beneficio Actual <i><small>(incluyendo " + recycleCost+" de reciclaje)</small></i> = <b>$" + fix(netProfit_inclRecycles) + "</b><br/>" +

                                "<br/>" +

                                "<i><small>@ Average = <b>" + fix(indivAvg) + "</b></small></i>:<br/>" +

                                "Beneficio neto <i><small>(por día)</small></i> = <b>$" + fix(profitPerDay) + "</b><br/>" +

                                "Días para pagar su propio reciclaje = <b>" + daysTilPaidOwnRecycle + "</b><br/>";

                        if (!isNaN(daysTilPaidOwnRecycle)) {

                            tipContent = tipContent + "= <i>día # <b>" + (daysTilPaidOwnRecycle + numDaysOwned_decimal) + "</b></i><br/>";

                        }

                        tipContent = tipContent + "<br/>";

// Create and insert a new script node for the prototip tooltip javascript code to be run from

                        var script = document.createElement("script");

                        var text = document.createTextNode("new mk_tt('Profit_" + refID + "', 'lm', '" + tipContent + "')");

                        script.type = "text/javascript";

                        script.appendChild(text);

                        currentRow.appendChild(script);

                    }

                }

            }

        }

// Set the size of the bottom row to match the size of the header row to accomodate for extra columns that have been added

        var footerRow = rows[rows.length - 1];

        rows[1].childNodes[0].colSpan =

                rows[rows.length - 2].childNodes[0].colSpan =

                footerRow.childNodes[0].colSpan = rows[2].childNodes.length;

// SUMMARY ROW @ bottom of the referral listing table

        if (myAccount.ultimatePreferences.showRecentAverage) {

            var totalClickAvg = sumOfAverages / activeRefCount;

            if (isNaN(totalClickAvg)) {

                totalClickAvg = 0;

            }

            var nbsp = "&nbsp;&nbsp;&nbsp;&nbsp;";

            var footerRow_text = nbsp +

                    neobuxString("totalClicks") + ": " + clickSum +

                    nbsp + neobuxString("totalClickAvg") + ": " + fix(totalClickAvg);

            if (myAccount.accountType === 6) {

                footerRow_text = footerRow_text + nbsp + neobuxString("lastdaysClickAvg") +

                        " (" + myAccount.ultimatePreferences.minigraphAvgInterval + "): " +

                        fix(minigraphClickAvgs[myAccount.ultimatePreferences.minigraphAvgInterval - 1]);

            }

            setHeaderProperties(footerRow.childNodes[0]);

            footerRow.childNodes[0].style.setProperty("line-height", "14px", "");

            footerRow_text = footerRow_text +

                    nbsp + neobuxString("clickedToday") + ": " + todayClickers +

                    nbsp + neobuxString("clickedYday") + ": " + ydayClickers +

                    nbsp + neobuxString("zeroClickers") + ": " + zeroClickers +

                    nbsp + neobuxString("others") + ": " + otherClickers +

                    nbsp;

            footerRow.childNodes[0].innerHTML = footerRow_text;

            if (myAccount.ultimatePreferences.RA_shrinkContents) {

                shrinkContents(footerRow.childNodes[0]);

            }

        }

        var newWidth = parseInt(window.getComputedStyle(

                selectNode("//body/div[2]/table"), null).width, 10);

        var nodesSnapshot = selectNodes("//body/div[contains(@style,'margin')]");

        nodesSnapshot[nodesSnapshot.length - 1].childNodes[0].style.width = null;

        var n;

        for (n = 0; n < nodesSnapshot.length; n += 1) {

            nodesSnapshot[n].style.width = newWidth + "px";

        }

        var menuContainer = selectNode("//body/div[2]/table/tbody/tr/td[1]");

        var menuContainerWidth = parseInt(window.getComputedStyle(menuContainer, null).width, 10);

        if (menuContainerWidth < parseFloat(menuContainer.width)) {

            newWidth += parseFloat(menuContainer.width) - menuContainerWidth;

            for (n = 0; n < nodesSnapshot.length; n += 1) {

                nodesSnapshot[n].style.width = newWidth + "px";

            }

        }

    }



    function accSummaryPage() {

// Function that runs on the Account Summary page

        customLogger("Account Summary Page", 4);

// The graphs on this page all have height='130'

// Grab them then process the data

        var xpathResults_embeds = selectNodes("//embed[@height='130']");

        var embed;

        var chartXML;

        customLogger("xpathResults_embeds.snapshotLength = " + xpathResults_embeds.length, 6);

        for (var graphNumber = 0, length = xpathResults_embeds.length; graphNumber < length; graphNumber += 1) {

// Grab the data from the graphs

            embed = xpathResults_embeds[graphNumber];

            chartXML = embed.getAttribute("flashvars").split("dataXML=")[1].replace("caption='' ","");

// Process the data within the graphs

            processGraphData(graphNumber, chartXML, embed);

// Insert the processed data 

            insertGraphAverages(embed, graphNumber);

        }

    }



// CUSTOM FUNCTION - Compares two version numbers

// Returns true if current version < other version

    function otherVerIsNewerVersion(currentVerInput, otherVerInput) {

        var

            currentVer,

            i,

            otherVer,

            otherVerIsNewer;

        currentVer = currentVerInput.split(".");

        otherVer = otherVerInput.split(".");

        for (i = 0; i < currentVer.length; i += 1) {

            currentVer[i] = Number(currentVer[i]);

            otherVer[i] = Number(otherVer[i]);

        }

        otherVerIsNewer = false;

        if (currentVer[0] < otherVer[0]) {

            otherVerIsNewer = true;

        } else if (currentVer[0] === otherVer[0]) {

            if (currentVer[1] < otherVer[1]) {

                otherVerIsNewer = true;

            } else if (currentVer[1] === otherVer[1]) {

                if (currentVer[2] < otherVer[2]) {

                    otherVerIsNewer = true;

                } else if (currentVer[2] === otherVer[2]) {

                    if (currentVer[3] < otherVer[3]) {

                        otherVerIsNewer = true;

                    }

                }

            }

        }

        return otherVerIsNewer;

    }



    function checkForUpdates() {

        var

            otherVersion,

            time;

        time = new Date().getTime();

        if (myAccount.preferences.updateFrequency > 0 &&

                    time > myAccount.preferences.updateLastCheck +

                    myAccount.preferences.updateFrequency) {

            GM.xmlhttpRequest({

                method: "GET",

                url: "http://userscripts.org/scripts/source/105155.meta.js",

                onload: function (response) {

                    manipulatePrefs("updateLastCheck", time.toString(), "set")

                    if (response.status === 200) {

                        otherVersion = /\/\/\s*@version\s+(.*)\s*\n/i.exec(response.responseText)[1];

                        if (otherVerIsNewerVersion(version, otherVersion)) {

                            if (confirm(localString("newVersionAvailable", "NeoBux Plus+") +

                                    "\n\n" + localString("currentVersion", version) +

                                    "\n" + localString("availableVersion", otherVersion) +

                                    "\n\n" + localString("doYouWishToUpdateTo", otherVersion))) {

                                top.location.href = "http://userscripts.org/scripts/source/105155.user.js";

                            }

                        }

                    }

                }

            });

        }

    }



    function main() {

        insertScriptVersion();

        insertLogo();

        if (toBool(manipulatePrefs("firstRun", true, "get"))) {

            firstRun();

        }

        checkForUpdates();

        switch (currentPage.name) {

        case "rentedRefListing":

            if (numberOfRentedReferrals > 0) {

                referralPage();

            }

            break;

        case "directRefListing":

            if (numberOfDirectReferrals > 0) {

                referralPage();

            }

            break;

        case "accSummary":

            accSummaryPage();

            break;

        case "refStats":

            refStatsPage();

            break;

        }

    }



    return function () {

        setTimeout(main, 1000);

    };

}())();