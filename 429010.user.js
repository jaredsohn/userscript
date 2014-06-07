// ==UserScript==
// @name            Better SweClockers
// @namespace       http://alling.se
// @version         1.3.0
// @match           http://*.sweclockers.com/*
// @match           https://*.sweclockers.com/*
// @description     Provides extra functionality to the SweClockers website.
// @copyright       2013–2014 Simon Alling
// ==/UserScript==

var betterSwecStartTime = new Date();

var favoriteLinksRawDefaultGlobal = "\
### Better SweClockers\n\
   Better SweClockers-tråden === http://www.sweclockers.com/forum/10-programmering-och-digitalt-skapande/1288777-better-sweclockers\n\
   Inställningar för Better SweClockers === http://sweclockers.com/forum/profile.php?do=editoptions#Better_SweClockers\n\
/###\n\
Redigera signatur === http://www.sweclockers.com/forum/profile.php?do=editsignature";

var betterSwec = {
    version: "1.3.0",
    documentationURL: "http://www.sweclockers.com/forum/10-programmering-och-digitalt-skapande/1288777-better-sweclockers/#post14497818",
    settingsURL: "http://sweclockers.com/forum/profile.php?do=editoptions#Better_SweClockers",
    smileyURLs: {
        doge:           "http://i.imgur.com/2IGEruO.png"
    },
    shibeTextLineMaxLength: 100,

    CSS: "",
    styleElement: document.createElement("style"),
    darkModeStyleElement: document.createElement("style"),
    vbTa: document.getElementById("vB_Editor_001_textarea"),
    vbTaIsFocused: false,
    vbTaDefaultHeight: 250,
    savedTAState: "",

    defaultSettings: {
        "ACP.aboveStandardControlPanel":        false,
        "ACP.quickLinks":                       true,
        "ACP.colorPalette":                     true,
        "ACP.dogeButtons":                      true,
        "ACP.linkToUser":                       false,
        "ACP.smileys":                          true,
        "ACP.specialChars":                     true,
        "ACP.usefulLinks":                      true,
        "ACP.showColorPalette":                 true,
        "ACPCheckboxes":                        {},
        "advancedControlPanel":                 true,
        "betterNavButtons":                     true,
        "betterQuoteLinks":                     true,
        "benchmarkMode":                        false,
        "darkThemeActive":                      false,
        "darkThemeAllowAutoActivation":         true,
        "darkThemeAllowAutoDeactivation":       true,
        "darkThemeByBlargmode":                 true,
        "darkThemeByBlargmodeTimeOn":           "",
        "darkThemeByBlargmodeTimeOff":          "",
        "darkThemeWasLastSetByUser":            null, // true for user, false for timer
        "dogeInQuoteFix":                       true,
        "enableFilter":                         true,
        "enableFavoriteLinks":                  true,
        "favoriteLinks":                        null,
        "favoriteLinksRaw":                     favoriteLinksRawDefaultGlobal,
        "focusVbTa":                            true,
        "largerTextareaActive":                 false,
        "largerTextareaHeight":                 640,
        "linkToOP":                             true,
        "marketLinks":                          true,
        "makeImagesClickable":                  true,
        "preventSignout":                       true,
        "quoteQuickReply":                      true,
        "removeLastNewline":                    true,
        "removeMobileSiteDisclaimer":           true,
        "searchWithGoogle":                     true
    },

    settings: {},

    defaultColors: [
        "#D00",     // dark red
        "#C15200",  // SweClockers orange
        "#EE8500",  // orange
        "#EC0",     // yellow
        "#20A000",  // green
        "#106400",  // dark green
        "#0BC",     // turquoise
        "#24F",     // light blue
        "#1525D0",  // dark blue
        "#9000B5",  // purple
        "black",
        "gray",
        "white",
        "red",
        "yellow",
        "lime",
        "green",
        "aqua",
        "blue",
        "magenta"
    ],

    usefulLinks: [
        ["Mjukvara",
            ["Core Temp", "http://www.alcpu.com/CoreTemp"],
            ["CPU-Z", "http://www.cpuid.com/softwares/cpu-z/versions-history.html"],
            ["Driver Sweeper", "http://www.guru3d.com/content_page/guru3d_driver_sweeper.html"],
            ["GPU-Z", "http://www.techpowerup.com/gpuz"],
            ["HWMonitor", "http://www.cpuid.com/softwares/hwmonitor.html"],
            ["IntelBurnTest", "http://www.techspot.com/downloads/4965-intelburntest.html"],
            ["MSI Afterburner", "http://event.msi.com/vga/afterburner/download.htm"],
            ["Real Temp", "http://www.techpowerup.com/realtemp"]
        ],
        ["Hårdvara",
            ["Cooler Master Hyper 212 Evo", "http://www.prisjakt.nu/produkt.php?p=1008748"],
            ["Samsung 840 Evo 250GB", "http://www.prisjakt.nu/produkt.php?p=2074414"],
            ["Samsung 840 Evo 120GB", "http://www.prisjakt.nu/produkt.php?p=2074412"],
            ["Intel Core i5 4670K", "http://www.prisjakt.nu/produkt.php?p=1879575"],
            ["Intel Core i7 4770K", "http://www.prisjakt.nu/produkt.php?p=1916688"],
            ["Z87-moderkort", "http://www.prisjakt.nu/kategori.php?k=1320#rparams=l=s167745213"],
            ["QNIX QX2710/X-STAR DP2710", "http://www.sweclockers.com/forum/101-skarmar-och-tv-apparater/1208485-qnix-x-star-qx-dp2710-27-2560x1440-samsung-pls-panel-310-a/"],
            ["Originaltråden om Koreaskärmar", "http://www.sweclockers.com/forum/101-skarmar-och-tv-apparater/1095329-intressant-skarm-achieva-shimian-qh270-400-ips-2560x1440-korean-monitor/"],
        ],
        ["Webbtjänster",
            ["Imgur", "http://imgur.com"],
            ["Prisjakt", "http://www.prisjakt.nu/kategori.php?k=328"]
        ],
        ["Recensioner: Processorer",
            ["Sandy Bridge", "http://www.sweclockers.com/recension/13224-intel-sandy-bridge-core-i7-2600k-core-i5-2500k"],
            ["Sandy Bridge-E", "http://www.sweclockers.com/recension/14699-intel-core-i7-3930k-och-3960x-sandy-bridge-e"],
            ["Ivy Bridge", "http://www.sweclockers.com/recension/15291-intel-core-i7-3770k-och-core-i5-3570k"],
            ["Ivy Bridge-E", "http://www.sweclockers.com/recension/17493-intel-core-i7-4960x-ivy-bridge-e"],
            ["Haswell", "http://www.sweclockers.com/recension/17016-intel-core-i7-4770k-och-i5-4670k-haswell"],
            ["Bulldozer", "http://www.sweclockers.com/recension/14579-amd-fx-8150-och-fx-8120-bulldozer"],
            ["Piledriver", "http://www.sweclockers.com/recension/15973-amd-fx-8350-vishera"]
        ],
        ["Recensioner: Grafikkort",
            ["GeForce GTX 690", "http://www.sweclockers.com/recension/15381-geforce-gtx-690-varldens-snabbaste-grafikkort/6#pagehead"],
            ["GeForce GTX 780 Ti", "http://www.sweclockers.com/recension/17844-nvidia-geforce-gtx-780-ti/5#pagehead"],
            ["GeForce GTX Titan", "http://www.sweclockers.com/recension/16541-nvidia-geforce-gtx-titan/8#pagehead"],
            ["Radeon HD 7970 GHz", "http://www.sweclockers.com/recension/15564-amd-radeon-hd-7970-gigahertz-edition/8#pagehead"],
            ["Radeon HD 7990", "http://www.sweclockers.com/recension/16879-amd-radeon-hd-7990-malta/8#pagehead"],
            ["Radeon R9 290X", "http://www.sweclockers.com/recension/17772-amd-radeon-r9-290x/6#pagehead"]
        ],
        ["Prestandaanalyser",
            ["SweClockers prestandaanalys: Processorer i BF3", "http://www.sweclockers.com/artikel/14650-prestandaanalys-battlefield-3/5#pagehead"],
            ["SweClockers prestandaanalys: Grafikkort i BF3", "http://www.sweclockers.com/artikel/14650-prestandaanalys-battlefield-3/4#pagehead"],
            ["SweClockers prestandaanalys: Processorer i BF4", "http://www.sweclockers.com/artikel/17810-prestandaanalys-battlefield-4/4#pagehead"],
            ["SweClockers prestandaanalys: Grafikkort i BF4", "http://www.sweclockers.com/artikel/17810-prestandaanalys-battlefield-4/3#pagehead"]
        ],
        ["Rabatter",
            ["Alina fraktfritt över 500:- (registrering)", "http://www.alina.se/registrera.aspx?sweclockers"],
            ["CDON 15 % (ibland)", "https://cdon.se/hemelektronik/cdon_%2B_sweclockers"],
            ["Inet fraktfritt", "http://www.inet.se/produkt/9990887/fraktfritt-sweclockers"]
        ],
        ["Windows",
            ["SweClockers installationsguide", "http://www.sweclockers.com/artikel/15673-installera-windows-7-och-8-fran-ett-usb-minne"],
            ["Windows 7 USB/DVD Download Tool", "http://www.microsoftstore.com/store/msusa/html/pbPage.Help_Win7_usbdvd_dwnTool"],
            ["Windows 7 Home Premium x64 (en)", "http://msft.digitalrivercontent.net/win/X17-58997.iso"],
            ["Windows 7 Professional x64 (en)", "http://msft.digitalrivercontent.net/win/X17-59186.iso"],
            ["Windows 7 Ultimate x64 (en)", "http://msft.digitalrivercontent.net/win/X17-59465.iso"],
            ["Windows 8/8.1", "http://windows.microsoft.com/en-us/windows-8/upgrade-product-key-only"]
        ]
    ],

    categories: [
        ["2-kylning-och-overklockning-av-processorer", "Kylning och överklockning av processorer"],
        ["54-amd", "Processorer &gt; AMD"],
        ["55-intel", "Processorer &gt; Intel"],
        ["3-ovrigt", "Processorer &gt; Övrigt"],
        ["125-geforce", "Grafikkort &gt; Geforce"],
        ["126-radeon", "Grafikkort &gt; Radeon"],
        ["4-ovrigt", "Grafikkort &gt; Övrigt"],
        ["5-modifikationer-och-egna-konstruktioner", "Modifikationer och egna konstruktioner"],
        ["143-projektloggar", "Modifikationer &gt; Projektloggar"],
        ["6-lagring", "Lagring"],
        ["74-chassin-och-nataggregat", "Chassin och nätaggregat"],
        ["56-kringutrustning", "Kringutrustning"],
        ["73-retro", "Retro"],

        ["86-stationara-datorer-koprad", "Stationära datorer &gt; Köpråd"],
        ["61-stationara-datorer-support-och-ovriga-tradar", "Stationära datorer &gt; Teknisk support"],
        ["112-barbara-datorer-koprad", "Bärbara datorer &gt; Köpråd"],
        ["67-barbara-datorer-support-och-ovriga-tradar", "Bärbara datorer &gt; Teknisk support"],
        ["102-htpc-och-mediaspelare", "HTPC och mediaspelare"],
        ["122-server", "Server"],
        ["141-enkortsdatorer", "Enkortsdatorer"],
        ["129-surfplattor", "Surfplattor"],
        ["75-mobiltelefoner", "Mobiltelefoner"],
        ["100-apple-mac", "Apple Mac"],

        ["77-ljud", "Ljud"],
        ["101-skarmar-och-tv-apparater", "Skärmar och tv-apparater"],
        ["131-multiskarm", "Skärmar och tv-apparater &gt; Multiskärm"],
        ["103-foto", "Foto"],
        ["14-internet-uppkoppling-och-natverk", "Internet, uppkoppling och nätverk"],

        ["144-spelservrar-och-klanspel", "Spelservrar och klanspel"],
        ["149-spelclockers", "Spelservrar och klanspel &gt; SpelClockers"],
        ["116-massiva-onlinespel", "Massiva onlinespel"],
        ["121-world-of-warcraft", "Massiva onlinespel &gt; World of Warcraft"],
        ["76-shooters", "Shooters"],
        ["138-arma-och-dayz", "Shooters &gt; Arma/DayZ"],
        ["123-battlefield", "Shooters &gt; Battlefield"],
        ["128-counter-strike", "Shooters &gt; Counter-Strike"],
        ["8-ovriga-datorspel", "Övriga datorspel"],
        ["134-diablo-iii", "Övriga datorspel &gt; Diablo III"],
        ["119-starcraft-ii", "Övriga datorspel &gt; Starcraft II"],
        ["84-spelkonsoler-och-konsolspel", "Spelkonsoler och konsolspel"],

        ["145-moln-och-internettjanster", "Moln- och internettjänster"],
        ["10-programmering-och-digitalt-skapande", "Programmering och digitalt skapande"],
        ["22-microsoft-windows", "Microsoft Windows"],
        ["17-linux-och-ovriga-operativsystem", "Linux och övriga operativsystem"],

        ["52-nyhetskommentarer", "Nyhetskommentarer"],
        ["78-gallerikommentarer", "Nyhetskommentarer &gt; Gallerikommentarer"],
        ["118-annonskommentarer", "Nyhetskommentarer &gt; Annonskommentarer"],
        ["71-butiker-och-tillverkare", "Butiker och tillverkare"],
        ["146-asus", "Butiker och tillverkare/Asus"],
        ["127-corsair", "Butiker och tillverkare/Corsair"],
        ["147-webhallen", "Butiker och tillverkare/Webhallen"],
        ["13-konsumentratt", "Konsumenträtt"],
        ["91-akademiska-amnen-arbetsliv-och-samhallsdebatt", "Övriga ämnen &gt; Akademiska ämnen"],
        ["92-underhallning-och-medier", "Övriga ämnen &gt; Underhållning och medier"],
        ["93-hobby-fritid-och-livsstil", "Övriga ämnen &gt; Hobby, fritid och livsstil"],
        ["104-sweclockers-foldinglag", "Övriga ämnen &gt; SweClockers foldinglag"],
        ["130-kryptovalutor", "Övriga ämnen &gt; Kryptovalutor"]
    ]
};

var base64Images = Object.freeze({
    DOGE: "data:image/png;base64,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",
    IMGUR: "data:image/png;base64,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",
    PREVIOUS_PAGE: "data:image/png;base64,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",
    PREVIOUS_PAGE_FOCUS: "data:image/png;base64,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",
    PRISJAKT: "data:image/png;base64,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",
    REDO: "data:image/png;base64,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",
    SETTINGS: "data:image/png;base64,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",
    SPLITQUOTE: "data:image/png;base64,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",
    UNDO: "data:image/png;base64,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"
});






//================================================================
// General help functions
//================================================================

function isInt(n) {
    return (typeof n === 'number' && n % 1 === 0);
}

function isString(s) {
    return (typeof s === "string");
}

function isNonEmptyString(s) {
    return (isString(s) && s !== "");
}

function isISODate(s) {
    return isString(s) && !!s.match(/\d{4}(\-\d{2}){2}/);
}

function isVersionNumber(s) {
    // Returns true if s is a string consisting of dot-separated integers
    return isString(s) && !!s.match(/^(\d+\.)*\d+$/);
}

function byID(i) {
    return document.getElementById(i);
}

function deHTMLize(str) {
    return str.replace("&gt;", ">");
}

function category(c) {
    return "category." + c;
}

function closestID(element) {
    // Returns the ID of element, or the first ID that is found when
    // climbing towards the root of the DOM tree from element.
    if (element.id) {
        return element.id;
    }
    var x = element;
    while (x = x.parentElement) {
        if (x.id) {
            return x.id;
        }
    }
    return null;
}

function isLink(element) {
    return (element instanceof HTMLElement && element.tagName === "A");
}

function isEmptyLink(element) {
    // true if element is an <a> element with href="#"
    return (isLink(element) && element.getAttribute("href") === "#");
}

function isDescendantOfLink(element) {
    var x = element;
    while (x = x.parentElement) {
        if (isLink(x)) {
            return true;
        } else if (x.classList.contains("forum_post_body")) {
            return false;
        }
    }
    return false;
}

function wrap(text, startTag, endTag) {
    return startTag + text + endTag;
}

function invertCase(str) {
    var i, c, result = "";
    for (i = 0; i < str.length; i++) {
        c = str.charAt(i);
        result += c.toUpperCase() === c ? c.toLowerCase() : c.toUpperCase();
    }
    return result;
}

function firstCharToLowerCase(str) {
    return str.charAt(0).toLowerCase() + str.slice(1);
}

function validLSBool(x) {
    return (x === "true" || x === "false");
}

function eventListener(id, eventName, func) {
    var element = byID(id);
    if (element instanceof HTMLElement) {
        element.addEventListener(eventName, func, false);
    }
}

// Time

function timeOfDay(d) {
    if (d instanceof Date) {
        var startOfDay = new Date();
        startOfDay.setHours(0);
        startOfDay.setMinutes(0);
        startOfDay.setSeconds(0);
        return d.getTime() - startOfDay.getTime();
    } else {
        throw new TimeException("Function timeOfDay expects one argument of type Date.");
    }
}

function timeIsBetween(t, start, end) {
    // Returns true if now is between startTime and endTime. If endTime < startTime, it is treated as being on the next day.
    // If we do not get an endTime argument, we always return true.
    if (t instanceof Date && start instanceof Date && end instanceof Date) {
        var timeOfDayT = timeOfDay(t);
        var timeOfDayStart = timeOfDay(start);
        var timeOfDayEnd = timeOfDay(end);
        if (timeOfDayEnd < timeOfDayStart) {
            // End time is before start time
            return (timeOfDayT < timeOfDayEnd || timeOfDayT >= timeOfDayStart);
        } else {
            // End time is after start time
            return (timeOfDayT < timeOfDayEnd && timeOfDayT >= timeOfDayStart);
        }
    } else {
        throw new TimeException("Arguments now, startTime and endTime are required.");
    }
}

function isHHMMTime(s) {
    return isNonEmptyString(s) && !!s.match(/^\d{2}:\d{2}/);
}

function parseHours(s) {
    return s.slice(0,2);
}

function parseMinutes(s) {
    return s.slice(3,5);
}


function isOlderVersion(ver, newestVer) {
    if (!isVersionNumber(ver) || !isVersionNumber(newestVer)) {
        return "undefined";
    }
    var version = ver,
        newestVersion = newestVer,
        matches,
        versionPiece,
        newestVersionPiece;
    while (version !== "" || newestVersion !== "") {
        matches = version.match(/^\d+/);
        versionPiece = !!matches ? parseInt(matches[0]) : "0";
        matches = newestVersion.match(/\d+/);
        newestVersionPiece = !!matches ? parseInt(matches[0]) : "0";
        if (versionPiece < newestVersionPiece) {
            return true;
        } else if (versionPiece > newestVersionPiece) {
            return false;
        }
        version = version.replace(/^\d+\.?/, "");
        newestVersion = newestVersion.replace(/^\d+\.?/, "");
    }
    return false;
}

function scrollToElementWithID(id) {
    var element = byID(id);
    if (!!element) {
        element.scrollIntoView(true);
    }
}

function getURLAnchor() {
    var currentURL = document.location.href;
    var parts = currentURL.split("#");
    return (parts.length > 1 ? parts[1] : null);
}

function createSwecButton(val) {
    var button = document.createElement("input");
    button.type = "button";
    button.setAttribute("class", "button");
    if (isString(val)) {
        button.value = val;
    }
    return button;
}



//================================================================
// DOM extension
//================================================================

Object.prototype.hasOwnValue = function(v) {
    for (var prop in this) {
        if (this.hasOwnProperty(prop) && this[prop] === v) {
            return true;
        }
    }
    return false;
};

Node.prototype.insertAfter = function (referenceNode) {
    referenceNode.parentNode.insertBefore(this, referenceNode.nextSibling);
}

if (!String.prototype.trimLeft) {
    String.prototype.trimLeft = function () {
        return this.replace(/^\s+/, "");
    };
}

if (!String.prototype.trimRight) {
    String.prototype.trimRight = function () {
        return this.replace(/\s+$/, "");
    };
}

if (!String.prototype.repeat) {
    String.prototype.repeat = function (reps) {
        if (!isInt(reps) || reps < 0 || reps === Infinity) {
            throw new RangeError("String.prototype.repeat requires a non-negative integer as the argument.");
        }
        var str = "";
        for (var i = 0; i < reps; i++) {
            str += this;
        }
        return str;
    };
}

HTMLSelectElement.prototype.getSelectedOption = function () {
    return this.options[this.selectedIndex];
}

HTMLTextAreaElement.prototype.insert = function (str, action) {
    // If action === "highlight", the inserted text will be highlighted.
    // If it is an integer, the cursor will be placed that many characters
    // from the beginning of the inserted text. Otherwise, the text is just
    // inserted.
    var start = this.selectionStart;
    var end = this.selectionEnd;
    var v = this.value;
    this.value = v.substring(0, start) + str + v.substring(end, v.length);
    if (action === "highlight") {
        this.selectRange(start, start + str.length);
    } else if (isInt(action)) {
        this.selectRange(start + action, start + action);
    } else {
        this.selectRange(start + str.length, start + str.length);
    }
};

HTMLTextAreaElement.prototype.selectRange = function (start, end) {
    if (this.setSelectionRange) {
        this.focus();
        this.setSelectionRange(start, end);
    } else if (this.createTextRange) {
        var range = this.createTextRange();
        range.collapse(true);
        range.moveEnd('character', end);
        range.moveStart('character', start);
        range.select();
    }
};

HTMLTextAreaElement.prototype.selectedText = function () {
    var start = this.selectionStart;
    var end = this.selectionEnd;
    return this.value.substring(start, end);
};

HTMLTextAreaElement.prototype.wrapBB = function (startTag, endTag, cursorPos) {
    // If cursorPos is an integer, the cursor will be placed that
    // many characters from the beginning of the start tag;
    // otherwise, the wrapped text will stay highlighted.
    var start = this.selectionStart;
    var end = this.selectionEnd;
    var val = this.value;
    var replacement = startTag + this.selectedText() + endTag;
    this.value = val.substring(0, start) + replacement + val.substring(end);
    if (!isInt(cursorPos)) {
        this.selectRange(start + startTag.length, end + startTag.length);
    } else {
        this.selectRange(start + cursorPos, start + cursorPos);
    }
};

HTMLTextAreaElement.prototype.trimAtCursor = function () {
    var beforeSelection = this.value.substring(0, this.selectionStart);
    var afterSelection = this.value.substring(this.selectionEnd);
    var newBeforeSelection = beforeSelection.trimRight();
    this.value = newBeforeSelection + afterSelection.trimLeft();
    this.selectRange(newBeforeSelection.length, newBeforeSelection.length);
};

HTMLElement.prototype.getCheckboxes = function () {
    var inputs = this.getElementsByTagName("input");
    var checkboxes = [];
    var i, input;
    for (i = 0; i < inputs.length; i += 1) {
        input = inputs[i];
        if (input.getAttribute("type") === "checkbox") {
            checkboxes.push(input);
        }
    }
    return checkboxes;
};

HTMLElement.prototype.getStringInputs = function () {
    var inputs = this.getElementsByTagName("input");
    var stringInputs = [];
    var i, input;
    var stringInputTypes = ["number", "text", "time"];
    for (i = 0; i < inputs.length; i += 1) {
        input = inputs[i];
        if (stringInputTypes.indexOf(input.getAttribute("type")) !== -1) {
            stringInputs.push(input);
        }
    }
    return stringInputs;
};



//================================================================
// Better Sweclockers functions
//================================================================

function isReadingBSCThread() {
    return !!document.location.href.match(/forum\/10\-programmering\-och\-digitalt\-skapande\/1288777\-better\-sweclockers\/*/i);
}

function isBSCSmiley(image) {
    return (image instanceof HTMLImageElement && betterSwec.smileyURLs.hasOwnValue(image.src));
}

function isOnFirstPageOfBSCThread() {
    return isReadingBSCThread() && !!byID("postcount14497816");
}

function isInAdvancedEditMode() {
    return !!betterSwec.vbTa && !!document.location.href.match(/(newreply|editpost)\.php/i);
}

function isInNewReplyMode() {
    // Not previewing
    return isInAdvancedEditMode() && !!document.location.href.match(/[\?&]do=newreply/i);
}

function ACPCanBeInserted() {
    return betterSwec.vbTa ? true : false;
}

function bsStore(str) {
    return "betterSwec." + str
}

function LSSet(name, value) {
    localStorage.setItem(bsStore(name), value);
}

function LSGet(name) {
    return localStorage.getItem(bsStore(name));
}

function LSIsFalse(name) {
    return LSGet(name) === "false";
}

function LSIsTrue(name) {
    return LSGet(name) === "true";
}

function optionIsTrue(name) {
    return betterSwec.settings[name] === true;
}

function stringButtonClicked(button) {
    var TA = betterSwec.vbTa;
    var overrideString = button.dataset.override;
    TA.insert(overrideString || button.value, "do nothing");
}

function bsSelectOptionsUsefulLinks(arr) {
    // If optgroup is true, the first element of every sub-array will be treated as
    // an optgroup subheading. In that case, it should be a string.
    var html = "";
    var i, j, arri, arrij;
    for (i = 0; i < arr.length; i++) {
        arri = arr[i];
        html += '<optgroup label="' + arri[0] + '">';
        for (j = 1; j < arri.length; j++) {
            arrij = arri[j];
            html += '<option data-url="' + arrij[1] + '">' + arrij[0] + '</option>';
        }
        html += "</optgroup>";
    }
    return html;
}

function bsLink(url, text, bold) {
    // If bold is true, the text is wrapped in [b] tags.
    var str = text;
    if (bold === true) {
        str = "[b]" + str + "[/b]";
    }
    str = '[url="' + url + '"]' + str + '[/url]';
    return str;
}

function betterSwecInvertCase() {
    var TA = betterSwec.vbTa;
    TA.insert(invertCase(TA.selectedText()), "highlight");
}

function betterSwecClickableImages() {
    var TA = betterSwec.vbTa;
    var selected = TA.selectedText();
    if (selected === "") {
        TA.insert("[url=\"\"][img][/img][/url]", 6);
    } else {
        var lines = selected.split("\n");
        var line, parsedLines = [];
        for (i = 0; i < lines.length; i++) {
            line = lines[i];
            if (line !== "") {
                parsedLines.push(wrap(line, wrap(line, "[url=\"", "\"][img]"), "[/img][/url]"));
            } else {
                parsedLines.push("");
            }
        }
        TA.insert(parsedLines.join("\n"), "do nothing");
    }
}

function betterSwecInsertUsefulLink() {
    var TA = betterSwec.vbTa;
    var selectBox = byID("betterSwecUsefulLinksSelect");
    var bold = byID("betterSwecUsefulLinksBold").checked;
    var selectedOption = selectBox.getSelectedOption();
    if (TA.selectedText() === "") {
        TA.insert(bsLink(selectedOption.dataset.url, selectedOption.text, bold));
    } else {
        TA.wrapBB("[url=\"" + selectedOption.dataset.url + "\"]", "[/url]");
        if (bold) {
            TA.wrapBB("[b]", "[/b]");
        }
    }
}

function betterSwecInsertLinkToUser() {
    var TA = betterSwec.vbTa;
    var username = byID("betterSwecLinkToUserName").value;
    var url = "http://sweclockers.com/profil/" + username;
    var bold = byID("betterSwecLinkToUserBold").checked;
    if (TA.selectedText() === "") {
        // No selected text: just insert
        TA.insert(bsLink(url, username, bold));
    } else {
        if (username === "") {
            // Selected text, no username entered: wrap and treat selected text as username
            TA.wrapBB("[url=\"http://sweclockers.com/profil/" + TA.selectedText() + "\"]", "[/url]");
        } else {
            // Selected text, username entered: wrap and use entered username
            TA.wrapBB("[url=\"" + url + "\"]", "[/url]");
        }
        if (bold) {
            TA.wrapBB("[b]", "[/b]");
        }
    }
}

function betterSwecGoogle() {
    var TA = betterSwec.vbTa;
    var selected = TA.selectedText();
    if (selected === "") {
        TA.wrapBB("[url=\"http://google.com/search?q=\"]", "[/url]", 33);
    } else {
        TA.wrapBB("[url=\"http://google.com/search?q=" + selected.trim().replace(/ +/g, "+") + "\"]", "[/url]");
    }
}

function betterSwecInsertEdit() {
    betterSwec.vbTa.insert("[b]EDIT:[/b] ");
}

function splitQuote() {
    var TA = betterSwec.vbTa;
    TA.trimAtCursor();
    TA.insert("[/QUOTE]\n\n\n\n" + "[QUOTE]", 9);
}

function updateUsefulLinkGoTo() {
    var selectBox = byID("betterSwecUsefulLinksSelect");
    if (selectBox) {
        var selectedOption = selectBox.getSelectedOption();
        var href = selectedOption.dataset.url;
        byID("betterSwecUsefulLinksGoTo").href = href;
    }
}

function betterSwecColorButtons() {
    var html = "";
    var colors = loadColorPalette();
    var hexCode;
    for (var i = 0; i < colors.length; i++) {
        hexCode = colors[i];
        html += '<div title="' + hexCode + '" style="background-color: ' + hexCode + ';" class="betterSwecColorButton"></div>';
    }
    return html;
}

function saveTAState() {
    betterSwec.savedTAState = betterSwec.vbTa.value;
}

function toggleUndoTAButton() {
    var button = byID("betterSwecButtonUndo");
    if (button) {
        if (button.title === "Ångra") {
            button.title = "Gör om";
            button.children[0].src = base64Images.REDO;
            button.childNodes[1].nodeValue = "Gör om";
        } else {
            button.title = "Ångra"
            button.children[0].src = base64Images.UNDO;
            button.childNodes[1].nodeValue = "Ångra";
        }
    }
}

function undoTA() {
    toggleUndoTAButton();
    var oldSavedTAState = betterSwec.savedTAState;
    saveTAState();
    betterSwec.vbTa.value = oldSavedTAState;
}

function setLargerTextarea(larger) {
    var button = byID("betterSwecButtonLargerTextarea");
    var TA = betterSwec.vbTa;
    if (!!TA && !!button) {
        if (larger === true) {
            TA.style.height = betterSwec.settings.largerTextareaHeight + "px";
            button.value = "Återställ";
        } else {
            TA.style.height = betterSwec.vbTaDefaultHeight + "px";
            button.value = "Större textfält";
        }
    }
}

function toggleLargerTextarea() {
    var TAIsSmall = !betterSwec.settings.largerTextareaActive;
    setLargerTextarea(TAIsSmall);
    betterSwec.settings.largerTextareaActive = TAIsSmall;
    saveSettings();
}

function createBelowTAButton(value, id, eventHandler) {
    var b = createSwecButton(value);
    if (isString(id)) {
        b.id = id;
    }
    if (!!eventHandler) {
        b.addEventListener("click", eventHandler);
    }
    b.classList.add("betterSwecButtonBelowTA");
    return b;
}

function insertButtonsBelowTA() {
    var skickaSvar = byID("vB_Editor_001_save");
    if (isInAdvancedEditMode() && !!skickaSvar && !byID("betterSwecButtonLargerTextarea")) {
        var container = document.createElement("span");
        container.id = "betterSwecButtonsBelowTA";

        var extendQuoteSpacingButton = createBelowTAButton("Luft mellan citat", "betterSwecButtonExtendQuoteSpacing", extendQuoteSpacing);
        var largerTextareaButton     = createBelowTAButton("Större textfält",   "betterSwecButtonLargerTextarea",     toggleLargerTextarea);

        container.insertBefore(extendQuoteSpacingButton, null);
        largerTextareaButton.insertAfter(extendQuoteSpacingButton);

        container.insertAfter(skickaSvar.nextSibling.nextSibling);
    }
}

function extendQuoteSpacing() {
    var TA = betterSwec.vbTa;
    if (isInNewReplyMode()) {
        TA.value = TA.value.replace(/\[\/QUOTE\]\n\n\[QUOTE/g, "[/QUOTE]\n\n\n\n[QUOTE");
    }
}

function favoriteLinksElement() {
    var favLinks = betterSwec.settings.favoriteLinks;
    favLinks = favLinks.slice();
    favLinks.unshift(["Favoritlänkar", "#"]);
    var element = document.createElement("select");
    var elementHTML = "";
    var current, name, url, startMatch, endMatch, newTabMatch, catOpen = false;
    for (var i = 0; i < favLinks.length; i++) {
        current = favLinks[i];
        name = current[0];
        url = current[1];
        if (isString(name) && !isString(url)) {
            // Category
            startMatch = name.match(/^###\s*.*/);
            endMatch = name.match(/^\/###/);
            if (!!startMatch) {
                // Category start tag
                elementHTML += catOpen ? "</optgroup>" : "";
                elementHTML += '<optgroup label="' + name.replace(/^###\s*/, "") + '">';
                catOpen = true;
            } else if (!!endMatch && catOpen === true) {
                // Category end tag
                elementHTML += '</optgroup>';
                catOpen = false;
            }
        } else {
            // Link
            if (!!name) {
                newTabMatch = name.match(/^!{3}\s*/); // Name starts with !!! => open in new tab/window
            }
            if (!!newTabMatch) {
                elementHTML += '<option data-url="' + url + '" data-target="new">' + name.replace(/^!{3}\s*/, "") + '*</option>';
            } else {
                elementHTML += '<option data-url="' + url + '">' + (!!name ? name : url) + '</option>';
            }
        }
    }
    elementHTML += catOpen ? "</optgroup>" : "";
    elementHTML += '<option data-url="http://www.sweclockers.com/forum/profile.php?do=editoptions#Better_SweClockers_Favoritlänkar">Redigera favoritlänkar</option>';
    element.innerHTML = elementHTML;
    element.id = "betterSwecFavoriteLinks";
    return element;
}

function goToSelectedFavoriteLink() {
    var element = byID("betterSwecFavoriteLinks");
    if (element instanceof HTMLSelectElement) {
        var selectedOption = element.getSelectedOption();
        var url = selectedOption.dataset.url;
        if (!!url) {
            if (selectedOption.dataset.target === "new") {
                window.open(url, "_blank");
            } else {
                document.location.href = url;
            }
        }
    }
}

function favoriteLinks() {
    var profileDivs = byID("head").getElementsByClassName("profile");
    if (!!profileDivs && !byID("betterSwecFavoriteLinks")) {
        var profileDiv = profileDivs[0];
        profileDiv.style.position = "relative";
        var element = favoriteLinksElement();
        profileDiv.insertBefore(element, null);
        element.addEventListener("change", goToSelectedFavoriteLink);
    }
}

function parseFavoriteLinks(str) {
    if (isString(str)) {
        var parsedLines = [];
        var lines = str.split("\n");
        var line, name, url;
        for (var i = 0; i < lines.length; i++) {
            line = lines[i];
            if (line !== "") {
                line = line.trim();
                name = null;
                url = null;
                var categoryStartMatch = line.match(/^###\s*.*/);
                var categoryEndMatch = line.match(/^\/###\s*.*/);
                var linkMatch = line.match(/^(\S+.*\S+\s*===){0,1}\s*.+$/);
                if (!!categoryStartMatch) {
                    name = categoryStartMatch[0];
                } else if (!!categoryEndMatch) {
                    name = categoryEndMatch[0];
                } else if (!!linkMatch) {
                    // Line is not a category start or end tag
                    url = line;
                    var nameMatch = line.match(/^\s*\S+.*\S+\s*===/);
                    if (!!nameMatch) {
                        // Line contains name
                        name = nameMatch[0].replace("===", "").trim();
                        url = line.replace(nameMatch[0], "").trim();
                    }
                }
                parsedLines.push([name, url]);
            }
        }
        return parsedLines;
    }
    return null;
}

function loadFavoriteLinks(favs) {
    // Every item in arr should be ["Name", "URL"] (name and URL); [null, "URL"] (only URL); ["### Category", null] (category start); or ["/###", null] (category end).
    if (!!favs) {
        var fav, favURL;
        var validFavs = [];
        for (var i = 0; i < favs.length; i++) {
            fav = favs[i];
            favName = fav[0];
            favURL  = fav[1];
            if (isString(favURL)) {
                // Link
                if (!favName) {
                    favName = favURL;
                }
                validFavs.push(fav);
            } else if (isString(favName)) {
                // Category
                validFavs.push(fav);
            }
        }
        betterSwec.settings.favoriteLinks = validFavs;
    }
}

function getSearchPhrase() {
    var searchField = byID("siteSearch");
    return !!siteSearch ? siteSearch.value : "";
}

function searchWithGoogle(phrase) {
    if (isString(phrase)) {
        var searchPhrase = ("site:sweclockers.com " + phrase.trim()).replace(/ +/g, "+");
        var googleURL = "http://google.com/search?q=" + searchPhrase;
        document.location.href = googleURL;
    }
}

function enableSearchWithGoogle() {
    var searchField = byID("siteSearch");
    var submitButton;
    if (!!searchField) {
        submitButton = searchField.nextElementSibling;
        var googleButton = createSwecButton("G");
        googleButton.id = "betterSwecButtonSearchWithGoogle";
        googleButton.title = "Sök med Google";
        googleButton.addEventListener("click", function() { searchWithGoogle(getSearchPhrase()); });
        googleButton.insertAfter(submitButton);
    }
}

function showColorPalette(show) {
    var innerWrapper = byID("betterSwecColorPaletteInnerWrapper");
    var button = byID("betterSwecButtonColorPalette");
    if (innerWrapper instanceof HTMLDivElement && button instanceof HTMLInputElement) {
        innerWrapper.style.display = show ? "inline-block" : "none" ;
        button.value = (show ? "–" : "+") + " Färgpaletten";
    }
    betterSwec.settings["ACP.showColorPalette"] = show;
    saveSettings();
}

function toggleShowColorPalette() {
    var innerWrapper = byID("betterSwecColorPaletteInnerWrapper");
    if (innerWrapper !== null) {
        showColorPalette(innerWrapper.style.display === "none");
    }
}

function loadColorPalette() {
    var colors = JSON.parse(LSGet("savedColorPalette"));
    if (colors !== null) {
        return colors;
    } else {
        return betterSwec.defaultColors;
    }
}

function saveColorPalette(arr) {
    LSSet("savedColorPalette", JSON.stringify(arr));
}

function dogeInQuoteFix() {
    var quotes = document.getElementsByClassName("bbquote");
    var quote, links, link, dogeSmiley, dogeSmileyURL;
    dogeSmileyURL = betterSwec.smileyURLs.doge;
    for (var i = 0; i < quotes.length; i++) {
        quote = quotes[i];
        links = quote.getElementsByTagName("a");
        for (var a = 0; a < links.length; a++) {
            link = links[a];
            if (link.href === dogeSmileyURL) {
                // We have found a doge! Let's rescue him!
                dogeSmiley = document.createElement("img");
                dogeSmiley.src = dogeSmileyURL;
                dogeSmiley.insertAfter(link);
                link.style.display = "none";
            }
        }
    }
}

function insertDarkThemeByBlargmodeButton() {
    var menuElements = document.getElementsByClassName("menu");
    var menu, darkThemeButtonLi;
    if (!!menuElements && menuElements.length > 1) {
        menu = menuElements[1];
        darkThemeButtonLi = document.createElement("li");
        darkThemeButtonLi.setAttribute("class", "menuItem");
        darkThemeButtonLi.id = "betterSwecDarkThemeButtonLi";
        darkThemeButtonLi.innerHTML = '<div class="shadow"><a href="#" target="_self" id="betterSwecDarkThemeButton" title="Ett mörkt tema för SweClockers av Blargmode">Blargmodes mörka tema</a></div>';
        menu.style.width = "900px";
        menu.insertBefore(darkThemeButtonLi, null);
        byID("betterSwecDarkThemeButton").addEventListener("click", function(event) {
            event.preventDefault();
            toggleDarkTheme();
        });
    }
}

function setDarkTheme(on) {
    betterSwec.settings.darkThemeActive = !!on;
    betterSwec.darkModeStyleElement.innerHTML = !!on ? "@import url('http://blargmode.se/files/sweclockers_dark_theme/style.css');" : "";
    var darkThemeButton = byID("betterSwecDarkThemeButton");
    if (!!darkThemeButton) {
        darkThemeButton.innerHTML = !!on ? "Standardutseendet" : "Blargmodes mörka tema";
    }
}

function toggleDarkTheme() {
    setDarkTheme(!optionIsTrue("darkThemeActive"));
    saveSettings();
}

function autosetDarkTheme(on) {
    if (on === true) {
        setDarkTheme(true);
    } else {
        setDarkTheme(false);
    }
    betterSwec.settings.darkThemeAllowAutoActivation   = !on;
    betterSwec.settings.darkThemeAllowAutoDeactivation = !!on;
    saveSettings();
}



//================================================================
// Functions to call upon page load (DOM manipulation etc)
//================================================================

function makeClickable(image) {
    if (image instanceof HTMLImageElement) {
        var wrapperLink = document.createElement("a");
        wrapperLink.href = image.src;
        image.title = "Automatiskt gjord klickbar av Better SweClockers";
        wrapperLink.appendChild(image.cloneNode(true));
        image.parentNode.replaceChild(wrapperLink, image);
    }
}

function makeImagesClickable() {
    var vbimages = document.getElementsByClassName("vbimage");
    var currentImage;
    for (var i = 0; i < vbimages.length; i++) {
        currentImage = vbimages[i];
        if (!isDescendantOfLink(currentImage) && !isBSCSmiley(currentImage)) {
            makeClickable(currentImage);
        }
    }
}

function handleDarkTheme() {
    var settings = betterSwec.settings;
    var timeOnString = settings.darkThemeByBlargmodeTimeOn;
    var timeOffString = settings.darkThemeByBlargmodeTimeOff;
    if (isHHMMTime(timeOnString) && isHHMMTime(timeOffString)) {
        var currentTime = new Date();

        var activationTime = new Date();
        activationTime.setHours( parseHours(timeOnString) );
        activationTime.setMinutes( parseMinutes(timeOnString) );
        activationTime.setSeconds(0);

        var deactivationTime = new Date();
        deactivationTime.setHours( parseHours(timeOffString) );
        deactivationTime.setMinutes( parseMinutes(timeOffString) );
        deactivationTime.setSeconds(0);

        var isInAutoActivationPeriod = timeIsBetween(currentTime, activationTime, deactivationTime);
        if (isInAutoActivationPeriod && optionIsTrue("darkThemeAllowAutoActivation")) {
            autosetDarkTheme(true);
        } else if (!isInAutoActivationPeriod && optionIsTrue("darkThemeAllowAutoDeactivation")) {
            autosetDarkTheme(false);
        } else {
            setDarkTheme(optionIsTrue("darkThemeActive"));
        }
    } else {
        setDarkTheme( optionIsTrue("darkThemeActive") );
    }
}

function handleDarkThemeTimer() {
    var darkThemeChecker = window.setInterval(handleDarkTheme, 2000);
}

function checkForBetterSweClockersAnchor() {
    var anchor = getURLAnchor();
    if (!!anchor && !!anchor.match(/^Better_SweClockers/)) {
        scrollToElementWithID(anchor);
    }
}

function checkForUpdate() {
    var BSCThreadOP = byID("post_message_14497816");
    var currentVersion = betterSwec.version;
    var fontElements,
        font,
        newestVersionNumberElement,
        newestVersion,
        updateCheckElement,
        vNumber,
        i = 0;
    if (!!BSCThreadOP) {
        try {
            fontElements = BSCThreadOP.getElementsByTagName("font");
            while (i < fontElements.length) {
                fontElem = fontElements[i];

                vNumber = fontElem.textContent.replace("v", "");
                if (isVersionNumber(vNumber)) {
                    newestVersion = vNumber;
                }

                if (fontElem.innerHTML === "&nbsp;") {
                    updateCheckElement = fontElem;
                    break;
                }

                i++;
            }

            if (!!updateCheckElement) {
                if (isOlderVersion(currentVersion, newestVersion)) {
                    updateCheckElement.innerHTML = "✗ Du kör <b>v" + currentVersion + "</b> – uppdatering rekommenderas!";
                    updateCheckElement.style.color = "#D00";
                } else {
                    updateCheckElement.innerHTML = "✓ Du kör <b>v" + currentVersion + "</b>.";
                    updateCheckElement.style.color = "#280";
                }
            }
        } catch (e) {
            alert("Ett fel inträffade under sökningen efter en uppdatering. Det kan bero på att trådstarten har redigerats. Vänligen installera den senaste versionen av Better SweClockers.\n\n" + e);
        }
    }
}

function vbTaFocusDetection() {
    var TA = betterSwec.vbTa;
    if (!!TA) {
        TA.addEventListener("focus", function() { betterSwec.vbTaIsFocused = true; });
        TA.addEventListener("blur", function() { betterSwec.vbTaIsFocused = false; });
    }
}

function addStringButtonEventListeners() {
    var stringButtons = document.getElementsByClassName("betterSwecStringButton");
    for (var i = 0; i < stringButtons.length; i++) {
        stringButtons[i].addEventListener("click", function() { stringButtonClicked(this); }, true);
    }
}

function saveSettings() {
    var JSONString = JSON.stringify(betterSwec.settings);
    LSSet("savedSettings", JSONString);
}

function loadSettings() {
    var defaultSettings = betterSwec.defaultSettings;
    var option, savedSettings, loadedSettings = {};
    savedSettings = JSON.parse(LSGet("savedSettings"));
    if (!savedSettings) {
        loadedSettings = defaultSettings;
    } else {
        for (option in defaultSettings) {
            if (defaultSettings.hasOwnProperty(option)) {
                if (savedSettings.hasOwnProperty(option)) {
                    loadedSettings[option] = savedSettings[option];
                } else {
                    loadedSettings[option] = defaultSettings[option];
                }
            }
        }
    }
    betterSwec.settings = loadedSettings;
    if (!loadedSettings.favoriteLinks) {
        loadFavoriteLinks( parseFavoriteLinks(loadedSettings.favoriteLinksRaw) );
    }
}

function getSignoutLink() {
    return byID("head").getElementsByClassName("profile")[0].getElementsByClassName("signout")[0];
}

function preventSignout() {
    var signoutLink = getSignoutLink();
    if (!!signoutLink) {
        signoutLink.addEventListener("click", function(event) { if (!confirm("Är du säker på att du vill logga ut?")) event.preventDefault(event); });
    }
}

function insertLinkToOP() {
    if (isInAdvancedEditMode() && !byID("betterSwecLinkToOP")) {
        var breadcrumbs = document.getElementsByClassName("page")[0].getElementsByClassName("breadcrumbs")[0];
        var navBarSpans = breadcrumbs.getElementsByClassName("navbar");
        var lastNavbarSpan = navBarSpans[navBarSpans.length - 1];
        var linkToQuotedPost = lastNavbarSpan.children[0];
        var OPLinkHref = linkToQuotedPost.href.replace(/(\/|(-post\d+\/)|(\/index\d+\.html))#post\d+$/i, "");
        lastNavbarSpan.innerHTML += ' | <a href="' + OPLinkHref + '" title="Länk till trådens början (OP)" id="betterSwecLinkToOP">Trådstart</a>';
    }
}

function setVbTaHeight(h) {
    if (isInt(h)) {
        betterSwec.CSS += "textarea#vB_Editor_001_textarea { height: " + h + "px; }";
    }
}

function randomIntUpTo(max) {
    return Math.ceil(Math.random() * max);
}

function shibeIndentation(line, lastIndentation) {
    if (isNonEmptyString(line)) {
        var maxLineLength = betterSwec.shibeTextLineMaxLength;
        var length = line.length;
        if (lastIndentation === null || lastIndentation === 0) {
            return randomIntUpTo(maxLineLength-length);
        } else {
            if (Math.random() > 0.70) {
                // 30 % chance of not giving a sh*t about last indentation
                return shibeIndentation(line, null);
            }
            var r = randomIntUpTo((maxLineLength-length)/2);
            var c = 0;
            if (lastIndentation < maxLineLength * 0.4) {
                // last Indentation was small; make this one large
                c = (maxLineLength-length-20)/2;
            } else if (Math.random() > 0.75) {
                // last indentation was large but we will make this one large anyway
                c = (maxLineLength-length)/2;
            }
            return Math.floor(r + c);
        }
    }
    return 0;
}

function betterSwecShibeText() {
    var TA = betterSwec.vbTa;
    var selection = TA.selectedText();
    var lines = selection.split("\n");
    var line, parsedLines = [], stringToInsert, newIndentation, lastIndentation = null;
    var stats = [];
    if (lines.length > 1) {
        // Selection spans multiple lines
        for (var i = 0; i < lines.length; i++) {
            line = lines[i];
            newIndentation = randomIntUpTo(100-line.length);
            if (newIndentation < 0) {
                newIndentation = 0;
            }
            parsedLines.push(" ".repeat(newIndentation) + line);
            lastIndentation = newIndentation;
            stats.push(newIndentation);
        }

        stringToInsert = parsedLines.join("\n");
        TA.insert(wrap(stringToInsert, '[font="Comic Sans MS, Chalkboard SE, sans-serif"][color="red"][i]', '[/i][/color][/font]'));
    } else {
        TA.wrapBB('[font="Comic Sans MS, Chalkboard SE, sans-serif"][color="red"][i]        ', '[/i][/color][/font]')
    }
}

function insertAdvancedControlPanel() {
    // HTML for #betterSwecACP
    var ACPHTML = "";

    // Text formatting, URL, IMG, Google search
    ACPHTML += '\
        <input value="size" id="betterSwecButtonSize" class="button" type="button" />\
        <input value="color" id="betterSwecButtonColor" class="button" type="button" />\
        <input value="font" id="betterSwecButtonFont" class="button" type="button" />\
        <input value="noparse" title="Förhindrar att BB-kod parsas" id="betterSwecButtonNoparse" class="button" type="button" />\
        <input value="strike" title="Överstruken text" id="betterSwecButtonStrike" class="button" type="button" />\
        <input value="Inline-kod" title="Kod som inte ska vara i ett eget stycke" id="betterSwecButtonInlineCode" class="button" type="button" />\
        <input value="Formel" title="Typsnitt som passar för matematiska formler" id="betterSwecButtonMath" class="button" type="button" />\
        <a title="Förbättrad version av den inbyggda länkfunktionen" id="betterSwecButtonUrl" class="button betterSwecIconButton" href="#"><img src="/forum/images/editor/createlink.gif" class="betterSwecIconButtonIcon20px" />URL</a>\
        <a title="Gör klickbara bilder av alla markerade, icke-tomma rader. Fungerar även mitt i en rad samt utan markering." id="betterSwecButtonClickableImages" class="button betterSwecIconButton" href="#"><img src="/forum/images/editor/insertimage.gif" class="betterSwecIconButtonIcon20px" />IMG</a>\
        <a title="Länk till Google-sökning med markerad text som sökfras" id="betterSwecButtonGoogle" class="button" href="#" /><span>G</span><span>o</span><span>o</span><span>g</span><span>l</span><span>e</span></a>\
    ';

    // Doge buttons
    if (optionIsTrue("ACP.dogeButtons")) {
        ACPHTML += '<input value="Comic Sans" title="Comic Sans" id="betterSwecButtonComicSans" class="button" type="button" />\
            <input value="shibe" title="wow" id="betterSwecButtonShibe" class="button betterSwecShibeText" type="button" />\
            <a title="pls click" id="betterSwecButtonDoge" class="button betterSwecIconButton" href="#"><img src="' + base64Images.DOGE + '" />Doge</a>\
        ';
    }

    // Smileys
    if (optionIsTrue("ACP.smileys")) {
        ACPHTML += '<a href="http://www.sweclockers.com/forum/misc.php" title="Öppnas i en ny flik" class="button betterSwecIconButton" target="_blank"><img src="/forum/images_sc/smilies/biggrin.gif" />Smileys</a>';
    }

    // CAPS LOCK, Splitat, EDIT:
    ACPHTML += '\
        <input value="CAPS LOCK" title="Fungerar precis som Caps Lock, fast på markerad text" id="betterSwecButtonInvertCase" class="button" type="button" />\
        <a title="Splitta citat vid markören så att du kan svara på varje del för sig" id="betterSwecButtonSplitQuote" class="button betterSwecIconButton" href="#"><img src="' + base64Images.SPLITQUOTE + '" />Splitat</a>\
        <input value="EDIT:" title="Infoga texten &quot;EDIT: &quot; i fetstil" id="betterSwecButtonEdit" class="button" type="button" />\
    ';

    // Special character buttons
    if (optionIsTrue("ACP.specialChars")) {
        ACPHTML += '\
            <form><fieldset>\
                <legend>Specialtecken</legend>\
                <input value="–" title="Kort tankstreck (talstreck; intervall; minustecken)" class="button betterSwecStringButton" type="button" />\
                <input value="—" title="Långt tankstreck" class="button betterSwecStringButton" type="button" />\
                <input value="≈" title="Ungefär lika med" class="button betterSwecStringButton" type="button" />\
                <input value="×" title="Multiplikationstecken" class="button betterSwecStringButton" type="button" />\
                <input value="·" title="Halvhög punkt (multiplikationstecken)" class="button betterSwecStringButton" type="button" />\
                <input value="°" title="Gradtecken" class="button betterSwecStringButton" type="button" />\
                <input value=" °C" title="Grad Celsius (inkl. hårt blanksteg)" class="button betterSwecStringButton" type="button" />\
                <input value="NBSP" data-override=" " title="Hårt blanksteg" class="button betterSwecStringButton" type="button" />\
                <input value="²" title="Upphöjd tvåa" class="button betterSwecStringButton" type="button" />\
                <input value="′" title="Primtecken (fot; minuter; förstaderivata)" class="button betterSwecStringButton" type="button" />\
                <input value="″" title="Dubbelprimtecken (tum; sekunder; andraderivata)" class="button betterSwecStringButton" type="button" />\
                <input value="»" title="Gåsögon, höger" class="button betterSwecStringButton" type="button" />\
                <input value="✓" title="Bock" class="button betterSwecStringButton" type="button" />\
            </fieldset></form>\
        ';
    }

    // Useful Links tool
    if (optionIsTrue("ACP.usefulLinks")) {
        ACPHTML += '\
            <form id="betterSwecUsefulLinks" title="Användbara länkar"><fieldset>\
                <legend>Användbara länkar</legend>\
                <select id="betterSwecUsefulLinksSelect"></select>\
                <input type="checkbox" title="Fetstil" checked id="betterSwecUsefulLinksBold" /><label for="betterSwecUsefulLinksBold" title="Fetstil"><b>B</b></label>\
                <input type="submit" value="Infoga" class="button" title="Infoga vald länk. Skriver INTE över markerad text." />\
                <a href="#" class="button" target="_blank" id="betterSwecUsefulLinksGoTo" title="Öppna vald länk i en ny flik">Gå till</a>\
            </fieldset></form>\
        ';
    }

    // Link to User tool
    if (optionIsTrue("ACP.linkToUser")) {
        ACPHTML += '\
            <form id="betterSwecLinkToUser" title="Länka till användare. OBS! Fungerar inte om användarnamnet innehåller vissa tecken, t ex ÅÄÖ. Mellanslag fungerar."><fieldset>\
                <legend>Länka till användare</legend>\
                <input type="text" id="betterSwecLinkToUserName" placeholder="Användarnamn" />\
                <input type="checkbox" title="Fetstil" checked id="betterSwecLinkToUserBold" /><label for="betterSwecLinkToUserBold" title="Fetstil"><b>B</b></label>\
                <input type="submit" value="Infoga" class="button" title="Infoga länk till vald användare. Skriver INTE över markerad text. Om inget användarnamn anges används markerad text." />\
            </fieldset></form>\
        ';
    }

    // Prisjakt, Imgur
    if (optionIsTrue("ACP.quickLinks")) {
        ACPHTML += '\
            <a title="Öppna Prisjakt i en ny flik" id="betterSwecButtonPrisjakt" href="http://www.prisjakt.nu/kategori.php?k=328" class="button betterSwecIconButton" target="_blank"><img src="' + base64Images.PRISJAKT + '" />Prisjakt</a>\
            <a title="Öppna Imgur i en ny flik" id="betterSwecButtonImgur" href="http://imgur.com" class="button betterSwecIconButton" target="_blank"><img src="' + base64Images.IMGUR + '" />Imgur</a>\
        ';
    }

    ACPHTML += '\
        <a title="Ångra (fungerar inte som man förväntar sig; ska ses som en livlina om man råkar skriva över något med den avancerade kontrollpanelen)" id="betterSwecButtonUndo" class="button betterSwecIconButton" href="#"><img src="' + base64Images.UNDO + '" />Ångra</a>\
        <a title="Inställningar (öppnas i en ny flik)" target="_blank" id="betterSwecButtonSettings" class="button betterSwecIconButton" href="' + betterSwec.settingsURL + '"><img src="' + base64Images.SETTINGS + '" />Inst.</a>\
    ';

    if (optionIsTrue("ACP.colorPalette")) {
        ACPHTML += '\
            <br /><form id="betterSwecColorPalette"><fieldset title="Färgar texten i vald färg, precis som [color] (snabbgenvägar för vanliga färger)">\
                <legend>Färgpaletten</legend>\
                <input value="+ Färgpaletten" id="betterSwecButtonColorPalette" class="button" type="button" />\
                <div id="betterSwecColorPaletteInnerWrapper" style="display: ' + (optionIsTrue("ACP.showColorPalette") ? "inline-block" : "none") + ';">'
            + betterSwecColorButtons()
            + '</div></fieldset></form>';
    }

    var TA = betterSwec.vbTa;
    var bsVbWrapper = byID('vB_Editor_001');
    var bsVbControls = byID('vB_Editor_001_controls');
    var elementToInsertACPBefore = TA;
    if (!!bsVbControls) {
        elementToInsertACPBefore = bsVbControls.nextSibling;
        if (optionIsTrue("ACP.aboveStandardControlPanel")) {
            elementToInsertACPBefore = bsVbControls;
        }
    }
    
    // Create and insert #betterSwecACP
    var ACP = document.createElement("div");
    var fragment = document.createDocumentFragment();
    ACP.id = "betterSwecACP";
    ACP.innerHTML = ACPHTML;
    fragment.appendChild(ACP);
    if (bsVbControls !== null) {
        bsVbWrapper.insertBefore(fragment, elementToInsertACPBefore);
    } else {
        document.getElementsByClassName("textarea")[0].insertBefore(fragment, TA);
    }

    var usefulLinksSelect = byID("betterSwecUsefulLinksSelect");
    if (usefulLinksSelect) {
        usefulLinksSelect.innerHTML = bsSelectOptionsUsefulLinks(betterSwec.usefulLinks);
    }

    // Add event listeners to advanced control panel buttons
    ACP.addEventListener("click", function(event) {
        var realTargetID = closestID(event.target);
        var realTarget = byID(realTargetID);
        var TA = betterSwec.vbTa;
        if (isEmptyLink(realTarget)) {
            event.preventDefault(event);
        }
        saveTAState();
        switch (realTargetID) {
            case "betterSwecButtonUndo":
                undoTA(); break;
            case "betterSwecButtonSize":
                TA.wrapBB('[size=""]', '[/size]', 7); break;
            case "betterSwecButtonColor":
                TA.wrapBB('[color=""]', '[/color]', 8); break;
            case "betterSwecButtonFont":
                TA.wrapBB('[font=""]', '[/font]', 7); break;
            case "betterSwecButtonUrl":
                TA.wrapBB('[url=""]', '[/url]', 6); break;
            case "betterSwecButtonClickableImages":
                betterSwecClickableImages(); break;
            case "betterSwecButtonNoparse":
                TA.wrapBB("[noparse]", "[/noparse]"); break;
            case "betterSwecButtonStrike":
                TA.wrapBB("[strike]", "[/strike]"); break;
            case "betterSwecButtonInlineCode":
                TA.wrapBB('[font="Courier New, monospace"]', '[/font]'); break;
            case "betterSwecButtonMath":
                TA.wrapBB('[font="serif"][size="3"]', '[/size][/font]'); break;
            case "betterSwecButtonGoogle":
                betterSwecGoogle(); break;
            case "betterSwecButtonComicSans":
                TA.wrapBB('[font="Comic Sans MS, Chalkboard SE, cursive"]', '[/font]'); break;
            case "betterSwecButtonShibe":
                betterSwecShibeText(); break;
            case "betterSwecButtonDoge":
                TA.insert("[img]" + betterSwec.smileyURLs.doge + "[/img]", false); break;
            case "betterSwecButtonInvertCase":
                betterSwecInvertCase(); break;
            case "betterSwecButtonSplitQuote":
                splitQuote(); break;
            case "betterSwecButtonEdit":
                betterSwecInsertEdit(); break;
            case "betterSwecButtonColorPalette":
                toggleShowColorPalette(); break;
            case "betterSwecColorPaletteInnerWrapper":
                TA.wrapBB('[color="' + event.target.title + '"]', '[/color]'); break;
            default:
        }
    });

    eventListener("betterSwecUsefulLinks", "submit", function(event) { event.preventDefault(event); betterSwecInsertUsefulLink(); });
    eventListener("betterSwecUsefulLinksSelect", "change", updateUsefulLinkGoTo);
    eventListener("betterSwecLinkToUser", "submit", function(event) { event.preventDefault(event); betterSwecInsertLinkToUser(); });

    var checkboxes = ACP.getCheckboxes();
    for (var i = 0; i < checkboxes.length; i++) {
        var checkbox = checkboxes[i];
        var c = betterSwec.settings.ACPCheckboxes[checkbox.id];
        checkbox.checked = (c === undefined ? true : c);

        checkbox.addEventListener("change", function(event) {
            var cb = event.target;
            betterSwec.settings.ACPCheckboxes[cb.id] = cb.checked;
            saveSettings();
        });
    }

    updateUsefulLinkGoTo();
    addStringButtonEventListeners();
    // End of insertAdvancedControlPanel()
}

function removeLastNewline() {
    var TA = betterSwec.vbTa;
    if (TA !== null && !betterSwec.vbTaIsFocused) {
        TA.value = TA.value.replace(/\[\/QUOTE\]\n*$/, "[/QUOTE]\n");
    }
}

function focusVbTa() {
    var TA = betterSwec.vbTa;
    if (TA !== null && !betterSwec.vbTaIsFocused) {
        TA.selectRange(TA.value.length, TA.value.length);
        TA.scrollTop = TA.scrollHeight;
    }
}

function removeMobileSiteDisclaimer() {
    var TA = betterSwec.vbTa;
    if (TA !== null) {
        TA.value = TA.value.replace("\n\n[size=1]Skickades från [url]m.sweclockers.com[/url][/size]", "", "g");
    }
}

function improveNavButtons() {
    betterSwec.CSS += '\
        .list_control div.pages {\
            overflow: visible;\
            position: relative;\
        }\
        .list_control div.pages a,\
        .list_control div.pages span.current,\
        .list_control div.pages a.next,\
        .list_control div.pages a.prev {\
            -moz-box-sizing: border-box;\
            -webkit-box-sizing: border-box;\
            box-sizing: border-box;\
            height: 32px;\
            min-width: 32px;\
            padding: 9px 12px 7px 12px;\
            margin: 0 0 -16px 0;\
        }\
        .list_control div.pages a.next:link,\
        .list_control div.pages a.next:visited,\
        .list_control div.pages a.prev:link,\
        .list_control div.pages a.prev:visited {\
            background-color: none;\
            background-image: url("' + base64Images.PREVIOUS_PAGE + '");\
            background-size: 13px;\
            background-position: center center;\
            padding: 2px 8px;\
            margin: 0 0 -16px 0;\
        }\
        .list_control div.pages a.prev:link,\
        .list_control div.pages a.prev:visited {\
            -ms-transform: rotate(180deg);\
            -webkit-transform: rotate(180deg);\
            transform: rotate(180deg);\
        }\
        .list_control div.pages a.next:hover,\
        .list_control div.pages a.next:focus,\
        .list_control div.pages a.prev:hover,\
        .list_control div.pages a.prev:focus {\
            background-color: #1f5994;\
            background-image: url("' + base64Images.PREVIOUS_PAGE_FOCUS + '");\
        }\
    ';
}

function improveQuoteLinks() {
	betterSwec.CSS += '\
        div.bbquote .label, div.bbquote .author, div.vbquote .label, div.vbquote .author { display: inline-block; }\
        div.vbquote .label { margin-right: 4px; }\
        div.bbquote .author a:link, div.bbquote div.author a:visited,\
        div.vbquote .author a:link, div.vbquote div.author a:visited {\
            color: rgb(64, 64, 64);\
            text-decoration: none;\
            margin-left: 6px;\
            opacity: 0.8;\
        }\
        div.bbquote .author a:hover, div.bbquote div.author a:focus, div.bbquote div.author a:active,\
        div.vbquote .author a:hover, div.vbquote div.author a:focus, div.vbquote div.author a:active {\
            text-decoration: none;\
            opacity: 1;\
        }\
        div.bbquote .author a::after,\
        div.vbquote .author a::after {\
            content: "Gå till inlägg";\
            padding-left: 4px;\
        }\
        div.bbquote .author a img,\
        div.vbquote .author a img {\
            margin: 0 0 2px 0;\
        }\
	';
}

function addBetterSwecMainCSS() {
    betterSwec.CSS += '\
        #head .menu #betterSwecDarkThemeButtonLi {\
            background-color: rgb(20, 20, 20);\
            border-color: black;\
        }\
        #head .menu #betterSwecDarkThemeButtonLi a {\
            color: #909090 !important;\
            text-align: center;\
            width: 144px;\
        }\
        #head div.profile {\
            margin-left: 0;\
        }\
        #head div.head_main div.search {\
            width: 214px;\
        }\
        #betterSwecButtonSearchWithGoogle {\
            color: #166beb;\
            font-family: Georgia;\
            font-size: 18px;\
            height: 23px;\
            padding: 0 4px;\
            position: absolute;\
        }\
        #betterSwecFavoriteLinks {\
            bottom: ' + (!!getSignoutLink() ? "-20px" : "-43px") + ';\
            position: absolute;\
            right: 12px;\
            width: 192px;\
        }\
        a#betterSwecFavoriteLinks:link,\
        a#betterSwecFavoriteLinks:visited {\
            text-decoration: none;\
        }\
        a#betterSwecFavoriteLinks:hover,\
        a#betterSwecFavoriteLinks:active,\
        a#betterSwecFavoriteLinks:focus {\
            text-decoration: underline;\
        }\
        body a.betterSwecLink:link, body a.betterSwecLink:visited {\
            color: #D26000;\
            text-decoration: none;\
        }\
        body a.betterSwecLink:hover, body a.betterSwecLink:focus, body a.betterSwecLink:active {\
            text-decoration: underline;\
        }\
        #betterSwecACP { margin: 8px 0 8px 0; }\
        #betterSwecACP > * { vertical-align: top; display: inline-block; margin-bottom: 10px; }\
        #betterSwecACP .button { height: 23px; -moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box; border-radius: 0; }\
        #betterSwecACP > .button { position: relative; top: 4px; }\
        #betterSwecACP input[type=submit] { min-width: 48px; display: inline-block; }\
        #betterSwecACP select { height: 23px; margin-right: 3px; padding: 0; }\
        .betterSwecStringButton { min-width: 25px; padding-left: 8px; padding-right: 8px; }\
        #betterSwecACP fieldset { padding: 3px; margin: 0 0 5px 0; }\
        #betterSwecACP fieldset > * { vertical-align: top; }\
        #betterSwecACP fieldset input[type=checkbox] { margin-top: 4px; }\
        #betterSwecACP fieldset label { display: inline-block; margin-top: 5px; }\
        #betterSwecACP fieldset legend { display: none; }\
        #betterSwecACP fieldset .button { margin: 0; display: inline-block; }\
        #betterSwecACP fieldset input[type=text] { height: 21px; margin: 0; padding: 0 2px; width: 96px; }\
        #betterSwecACP form { margin: 0; padding: 0; }\
        #betterSwecACP label { cursor: pointer; display: inline; font-size: 12px; margin: 0; padding: 0 0 0 2px; }\
        #betterSwecACP input[type=checkbox] { cursor: pointer; }\
        .betterSwecImageButton { opacity: 0.7; vertical-align: middle; }\
        .betterSwecImageButton:hover { opacity: 1; vertical-align: middle; }\
        #betterSwecButtonStrike { text-decoration: line-through; }\
        #betterSwecButtonInlineCode { font-family: "Courier New", monospace; font-weight: normal; }\
        #betterSwecButtonMath { font-family: Georgia, serif; font-weight: normal; }\
        #betterSwecACP .betterSwecIconButton { padding-left: 26px; }\
        #betterSwecACP .betterSwecIconButton img { position: absolute; top: 2px; left: 4px; height: 16px; }\
        #betterSwecACP .betterSwecIconButton img.betterSwecIconButtonIcon20px { top: 0; left: 2px; height: 20px; }\
        #betterSwecACP #betterSwecButtonColorPalette { width: 96px; }\
        #betterSwecACP div.betterSwecColorButton {\
            background: none;\
            border: none;\
            -moz-box-sizing: border-box;\
            -webkit-box-sizing: border-box;\
            box-sizing: border-box;\
            display: inline-block;\
            height: 23px;\
            position: relative;\
            width: 23px;\
        }\
        #betterSwecACP div.betterSwecColorButton:hover,\
        #betterSwecACP div.betterSwecColorButton:active {\
            /*outline: 2px rgba(0, 0, 0, 0.8) solid;*/\
            border-radius: 3px;\
            cursor: pointer;\
            height: 27px;\
            margin: -2px;\
            width: 27px;\
            z-index: 9;\
        }\
        #betterSwecColorPaletteInnerWrapper { display: none; }\
        #betterSwecButtonUndo {\
            width: 72px;\
        }\
        #betterSwecButtonGoogle {\
            font-family: Georgia, serif;\
            background: rgb(249,248,244);\
            background: -moz-linear-gradient(top, rgba(249,248,244,1) 0%, rgba(229,228,224,1) 100%);\
            background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(249,248,244,1)), color-stop(100%,rgba(229,228,224,1)));\
            background: -webkit-linear-gradient(top, rgba(249,248,244,1) 0%,rgba(229,228,224,1) 100%);\
            background: -o-linear-gradient(top, rgba(249,248,244,1) 0%,rgba(229,228,224,1) 100%);\
            background: -ms-linear-gradient(top, rgba(249,248,244,1) 0%,rgba(229,228,224,1) 100%);\
            background: linear-gradient(to bottom, rgba(249,248,244,1) 0%,rgba(229,228,224,1) 100%);\
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=\'#f9f8f4\', endColorstr=\'#e5e4e0\',GradientType=0 );\
        }\
        #betterSwecButtonGoogle:hover {\
            background: rgb(252,251,247);\
            background: -moz-linear-gradient(top, rgba(252,251,247,1) 0%, rgba(242,241,237,1) 100%);\
            background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(252,251,247,1)), color-stop(100%,rgba(242,241,237,1)));\
            background: -webkit-linear-gradient(top, rgba(252,251,247,1) 0%,rgba(242,241,237,1) 100%);\
            background: -o-linear-gradient(top, rgba(252,251,247,1) 0%,rgba(242,241,237,1) 100%);\
            background: -ms-linear-gradient(top, rgba(252,251,247,1) 0%,rgba(242,241,237,1) 100%);\
            background: linear-gradient(to bottom, rgba(252,251,247,1) 0%,rgba(242,241,237,1) 100%);\
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=\'#fcfbf7\', endColorstr=\'#f2f1ed\',GradientType=0 );\
        }\
        #betterSwecButtonGoogle span:nth-child(3n+1) { color: #176dee; }\
        #betterSwecButtonGoogle span:nth-child(4n+2) { color: #da4532; }\
        #betterSwecButtonGoogle span:nth-child(3) { color: #eeb003; }\
        #betterSwecButtonGoogle span:nth-child(5) { color: #009957; }\
        #betterSwecButtonComicSans { font-family: "Comic Sans MS", "Chalkboard SE", sans-serif; }\
        #betterSwecUsefulLinksSelect { width: 128px; }\
        .betterSwecShibeText { color: red; font-family: "Comic Sans MS", "Chalkboard SE", sans-serif; font-style: italic; }\
        #betterSwecButtonsBelowTA { float: right; margin-right: 20px; }\
        #Better_SweClockers fieldset { margin-top: 24px; }\
        #Better_SweClockers label { display: inline-block; }\
        #Better_SweClockers kbd { font-family: "Courier New", monospace; color: #D00; }\
        #Better_SweClockers textarea { font-family: "Courier New", monospace; }\
        #betterSwecSettings\\.darkThemeByBlargmodeTimeOn,\
        #betterSwecSettings\\.darkThemeByBlargmodeTimeOff {\
            margin: 0 8px;\
            width: 96px;\
        }\
        #betterSwecSettings\\.favoriteLinks { display: block; min-height: 160px; width: 98%; }\
        .pushListInternal #betterSwecFilterSettingsExpandLink {\
            height: 11px;\
            margin-bottom: -6px;\
            display: inline-block;\
            text-align: right;\
            width: 102px;\
            padding-right: 48px;\
        }\
        #betterSwecFilterSettingsWrapper {\
            padding: 0 15px;\
        }\
        #betterSwecFilterSettingsWrapper label {\
            display: inline-block;\
            position: relative;\
            top: -2px;\
        }\
        #betterSwecFilterSettingsWrapper ul {\
            background-color: white;\
            border: 1px black solid;\
            display: none;\
            height: 512px;\
            margin-bottom: 8px;\
            overflow-y: scroll;\
            padding: 10px;\
            width: 248px;\
        }\
        #betterSwecFilterSettingsWrapper ul::before {\
            color: rgb(120, 120, 120);\
            content: "Kryssa för de kategorier du vill filtrera bort. Inställningarna sparas automatiskt.";\
            display: block;\
            font-size: 11px;\
            line-height: 1.2em;\
            margin-bottom: 8px;\
        }\
        #betterSwecFilterSettingsWrapper ul li:first-of-type {\
            font-weight: bold;\
            border-bottom: 1px rgb(128,128,128) solid;\
            margin-bottom: 6px;\
        }\
    ';
}

function insertStyleElement() {
    betterSwec.styleElement.innerHTML = betterSwec.CSS;
    document.head.appendChild(betterSwec.styleElement);
    document.head.appendChild(betterSwec.darkModeStyleElement);
}

function insertMarketLinks() {
    var marketSection = document.getElementsByClassName("pushListInternal")[1];
    if (!!marketSection) {
        var subHeading = marketSection.getElementsByTagName("p")[0];
        subHeading.innerHTML = 'Prylar <a href="/annonser?typ=1" class="betterSwecLink">säljes</a>, <a href="/annonser?typ=2" class="betterSwecLink">köpes</a>, <a href="/annonser?typ=3" class="betterSwecLink">bytes</a> och <a href="/annonser?typ=4" class="betterSwecLink">skänkes</a>';
        subHeading.id = "betterSwecMarketLinks";
    }
}

function stripEntities(str) {
    if (isString(str)) {
        return str.replace(/&/g, "&amp;");
    }
}

function insertBetterSwecOptionsForm() {
    var formcontainers = document.getElementsByClassName("formcontainer");
    if (!byID("Better_SweClockers") && formcontainers.length > 0) {
        var formcontainer = formcontainers[0];
        var submitDiv = formcontainer.getElementsByClassName("submit")[0];
        var form = formcontainer.parentNode;
        var settingsFieldset = document.createElement("fieldset");
        var settingsHTML = "";

        function wrapGutter(str) {
            return wrap(str, "<div class=\"gutter\">", "</div>");
        }

        function wrapCheckbox(str) {
            return wrapGutter(wrap(str, '<ul class="checkbox"><li>', '</li></ul>'));
        }

        function checked(opt) {
            return optionIsTrue(opt) ? " checked" : "";
        }

        function saveCheckboxToSettings(checkbox) {
            if (checkbox instanceof HTMLInputElement) { 
                var id = checkbox.id;
                var optionName = id.replace("betterSwecSettings.", "");
                var checked = checkbox.checked;
                betterSwec.settings[optionName] = checked;
            }
        }

        function saveStringInputToSettings(input) {
            if (input instanceof HTMLInputElement) {
                var id = input.id;
                var optionName = id.replace("betterSwecSettings.", "");
                var value = input.value;
                betterSwec.settings[optionName] = value;
            }
        }

        form.id = "SweClockersOptionsForm";
        settingsFieldset.classList.add("fieldsetRev");
        settingsFieldset.id = "Better_SweClockers";
        settingsHTML += '<legend>Better SweClockers</legend><p>Dessa inställningar sparas endast lokalt.</p>\
                        <p><a href="' + betterSwec.documentationURL + '"><b>Dokumentation/hjälp</b></a></p>'
                      + "<fieldset><legend>Advanced Control Panel (ACP)</legend>"
                      + wrapCheckbox('<input type="checkbox" id="betterSwecSettings.advancedControlPanel"' + checked("advancedControlPanel") + ' /><label for="betterSwecSettings.advancedControlPanel"><b>Aktivera Advanced Control Panel</b></label>')
                      + wrapCheckbox('<input type="checkbox" id="betterSwecSettings.ACP.aboveStandardControlPanel"' + checked("ACP.aboveStandardControlPanel") + ' /><label for="betterSwecSettings.ACP.aboveStandardControlPanel">ACP ovanför standardkontrollpanelen (istället för under)</label>')
                      + wrapCheckbox('<input type="checkbox" id="betterSwecSettings.ACP.dogeButtons"' + checked("ACP.dogeButtons") + ' /><label for="betterSwecSettings.ACP.dogeButtons" class="betterSwecShibeText">very doge buttons             wow</label>')
                      + wrapCheckbox('<input type="checkbox" id="betterSwecSettings.ACP.smileys"' + checked("ACP.smileys") + ' /><label for="betterSwecSettings.ACP.smileys">Länk till SweClockers smileyreferens</label>')
                      + wrapCheckbox('<input type="checkbox" id="betterSwecSettings.ACP.specialChars"' + checked("ACP.specialChars") + ' /><label for="betterSwecSettings.ACP.specialChars">Knappar för specialtecken</label>')
                      + wrapCheckbox('<input type="checkbox" id="betterSwecSettings.ACP.usefulLinks"' + checked("ACP.usefulLinks") + ' /><label for="betterSwecSettings.ACP.usefulLinks">Verktyg för användbara länkar</label>')
                      + wrapCheckbox('<input type="checkbox" id="betterSwecSettings.ACP.linkToUser"' + checked("ACP.linkToUser") + ' /><label for="betterSwecSettings.ACP.linkToUser">Verktyg för att länka till användare</label>')
                      + wrapCheckbox('<input type="checkbox" id="betterSwecSettings.ACP.quickLinks"' + checked("ACP.quickLinks") + ' /><label for="betterSwecSettings.ACP.quickLinks">Genvägar till Prisjakt och Imgur</label>')
                      + wrapCheckbox('<input type="checkbox" id="betterSwecSettings.ACP.colorPalette"' + checked("ACP.colorPalette") + ' /><label for="betterSwecSettings.ACP.colorPalette">Färgpaletten</label>')
                      + "</fieldset>"
                      + "<fieldset><legend>Avancerat redigeringsläge</legend>"
                      + wrapCheckbox('<input type="checkbox" id="betterSwecSettings.linkToOP"' + checked("linkToOP") + ' /><label for="betterSwecSettings.linkToOP">Visa länk till trådstart</label>')
                      + wrapCheckbox('<input type="checkbox" id="betterSwecSettings.removeLastNewline"' + checked("removeLastNewline") + ' /><label for="betterSwecSettings.removeLastNewline">Endast <em>en</em> tom rad efter citat</strong></label>')
                      + wrapCheckbox('<input type="checkbox" id="betterSwecSettings.focusVbTa"' + checked("focusVbTa") + ' /><label for="betterSwecSettings.focusVbTa">Sätt automatiskt fokus på textfältet</label>')
                      + wrapCheckbox('<input type="checkbox" id="betterSwecSettings.removeMobileSiteDisclaimer"' + checked("removeMobileSiteDisclaimer") + ' /><label for="betterSwecSettings.removeMobileSiteDisclaimer">Ta bort <span style="font-size: x-small;">Skickades från <a href="http://m.sweclockers.com">m.sweclockers.com</a></span></label>')
                      + "</fieldset>"
                      + "<fieldset><legend>Navigering</legend>"
                      + wrapCheckbox('<input type="checkbox" id="betterSwecSettings.betterNavButtons"' + checked("betterNavButtons") + ' /><label for="betterSwecSettings.betterNavButtons">Förbättrade bläddringsknappar i forumet</label>')
                      + wrapCheckbox('<input type="checkbox" id="betterSwecSettings.betterQuoteLinks"' + checked("betterQuoteLinks") + ' /><label for="betterSwecSettings.betterQuoteLinks">Förbättrade citatlänkar i forumet</label>')
                      + wrapCheckbox('<input type="checkbox" id="betterSwecSettings.quoteQuickReply"' + checked("quoteQuickReply") + ' /><label for="betterSwecSettings.quoteQuickReply"><strong>Svara</strong>-länkar på <a href="/forum/citat"><strong>Citat</strong>-sidan</a></label>')
                      + wrapCheckbox('<input type="checkbox" id="betterSwecSettings.marketLinks"' + checked("marketLinks") + ' /><label for="betterSwecSettings.marketLinks">Länkar till Säljes, Köpes, Bytes och Skänkes under <strong>Senaste privatannonserna</strong></label>')
                      + "</fieldset>"
                      + '<fieldset id="Better_SweClockers_Favoritlänkar"><legend>Favoritlänkar</legend>'
                      + wrapCheckbox('<input type="checkbox" id="betterSwecSettings.enableFavoriteLinks"' + checked("enableFavoriteLinks") + ' /><label for="betterSwecSettings.enableFavoriteLinks">Visa menyn <strong>Favoritlänkar</strong></label>')
                      + '<p><strong>Redigera favoritlänkar:</strong></p>\
                        <textarea id="betterSwecSettings.favoriteLinks">' + stripEntities(betterSwec.settings.favoriteLinksRaw) + '</textarea>\
                        <p>Varje rad bör följa mönstret <kbd>Namn === URL</kbd>. Grupper kan anges med starttaggen <kbd>### Gruppnamn</kbd> och den valfria sluttaggen <kbd>/###</kbd> (på egna rader). Se avsnitt 3.5.2 i <a href="' + betterSwec.documentationURL + '">dokumentationen</a>.</p>'
                      + "</fieldset>"
                      + "<fieldset><legend>Blargmodes mörka tema</legend>"
                      + wrapCheckbox('<input type="checkbox" id="betterSwecSettings.darkThemeByBlargmode"' + checked("darkThemeByBlargmode") + ' /><label for="betterSwecSettings.darkThemeByBlargmode">På/av-knapp för <a href="http://www.sweclockers.com/forum/10-programmering-och-digitalt-skapande/1089561-ett-morkt-tema-till-sweclockers/"><strong>Blargmodes mörka tema</strong></a></label>')
                      + wrapGutter('<label for="betterSwecSettings.darkThemeByBlargmodeTimeOn">Aktivera automatiskt temat mellan </label><input type="time" id="betterSwecSettings.darkThemeByBlargmodeTimeOn" title="Klockslag för aktivering (HH:MM)" value="' + betterSwec.settings.darkThemeByBlargmodeTimeOn + '" />'
                      + '<label for="betterSwecSettings.darkThemeByBlargmodeTimeOff"> och </label><input type="time" id="betterSwecSettings.darkThemeByBlargmodeTimeOff" title="Klockslag för deaktivering (HH:MM)" value="' + betterSwec.settings.darkThemeByBlargmodeTimeOff + '" />')
                      + '<p><kbd>HH:MM</kbd> (om din webbläsare inte har ett särskilt gränssnitt för att välja klockslag).</p>'
                      + "</fieldset>"
                      + "<fieldset><legend>Övrigt</legend>"
                      + wrapCheckbox('<input type="checkbox" id="betterSwecSettings.enableFilter"' + checked("enableFilter") + ' /><label for="betterSwecSettings.enableFilter">Forumfilter för <strong>Nytt i forumet</strong></label>')
                      + wrapCheckbox('<input type="checkbox" id="betterSwecSettings.preventSignout"' + checked("preventSignout") + ' /><label for="betterSwecSettings.preventSignout">Förhindra oavsiktlig utloggning</label>')
                      + wrapCheckbox('<input type="checkbox" id="betterSwecSettings.benchmarkMode"' + checked("benchmarkMode") + ' /><label for="betterSwecSettings.benchmarkMode">Benchmark Mode (visa i titelraden hur snabbt Better SweClockers kördes)</label>')
                      + wrapCheckbox('<input type="checkbox" id="betterSwecSettings.dogeInQuoteFix"' + checked("dogeInQuoteFix") + ' /><label for="betterSwecSettings.dogeInQuoteFix">Visa Doge-smiley i citat (istället för en Imgur-länk) <span class="betterSwecShibeText">         win</span></label>')
                      + wrapCheckbox('<input type="checkbox" id="betterSwecSettings.searchWithGoogle"' + checked("searchWithGoogle") + ' /><label for="betterSwecSettings.searchWithGoogle">Knapp för att söka med Google istället för standardsökfunktionen</label>')
                      + wrapCheckbox('<input type="checkbox" id="betterSwecSettings.makeImagesClickable"' + checked("makeImagesClickable") + ' /><label for="betterSwecSettings.makeImagesClickable">Gör bilder klickbara (om de inte redan är det)</label>')
                      + "</fieldset>";
        settingsFieldset.innerHTML = settingsHTML;

        formcontainer.insertBefore(settingsFieldset, submitDiv);
        eventListener("SweClockersOptionsForm", "submit", function() {
            // Save new settings
            var oldSettingsDarkThemeOn = betterSwec.settings.darkThemeByBlargmodeTimeOn;
            var oldSettingsDarkThemeOff = betterSwec.settings.darkThemeByBlargmodeTimeOff;

            var favoriteLinksRaw = byID("betterSwecSettings.favoriteLinks").value;
            if (favoriteLinksRaw === "") {
                favoriteLinksRaw = favoriteLinksRawDefaultGlobal;
            }
            betterSwec.settings.favoriteLinksRaw = favoriteLinksRaw;
            loadFavoriteLinks( parseFavoriteLinks(favoriteLinksRaw) );
            var checkboxes = settingsFieldset.getCheckboxes();
            for (var i = 0; i < checkboxes.length; i++) {
                saveCheckboxToSettings(checkboxes[i]);
            }

            var inputs = settingsFieldset.getStringInputs();
            for (var i = 0; i < inputs.length; i++) {
                saveStringInputToSettings(inputs[i]);
            }

            if (oldSettingsDarkThemeOn !== betterSwec.settings.darkThemeByBlargmodeTimeOn
            || oldSettingsDarkThemeOff !== betterSwec.settings.darkThemeByBlargmodeTimeOff) {
                betterSwec.settings.darkThemeAllowAutoActivation = true;
                betterSwec.settings.darkThemeAllowAutoDeactivation = true;
            }

            saveSettings();
        });
    }
}

function insertQuoteQuickReplyButtons() {
    if (document.location.href.match(/\/forum\/citat/i) && document.getElementsByClassName("betterSwecQuoteQuickReplyLink").length === 0) {
        var forum_post_bodys = document.getElementsByClassName("forum_post_body");
        var i, floatRightP, goToThreadLinkHref, replyPostID;
        for (i = 0; i < forum_post_bodys.length; i++) {
            floatRightP = forum_post_bodys[i].parentElement.children[2].children[0];
            goToThreadLinkHref = floatRightP.children[0].getAttribute("href");
            replyPostID = goToThreadLinkHref.match(/\d+$/i);
            floatRightP.innerHTML = '<a href="/forum/newreply.php?do=newreply&p=' + replyPostID + '" class="betterSwecQuoteQuickReplyLink">Svara</a>' + floatRightP.innerHTML;
        }
        betterSwec.CSS += '.betterSwecQuoteQuickReplyLink { margin-right: 24px; font-weight: bold; }';
    }
}



//================================================================
// "Nytt i forumet" filter
//================================================================

function toggleShowFilterSettings() {
    var settingsList = byID("betterSwecFilterSettingsList");
    var betterSwecFilterSettingsExpandLink = byID("betterSwecFilterSettingsExpandLink");
    if (!!settingsList) { 
        if (settingsList.style.display === "block") {
            settingsList.style.display = "none";
            betterSwecFilterSettingsExpandLink.innerHTML = "+ Filterinställningar";
        }
        else {
            settingsList.style.display = "block";
            betterSwecFilterSettingsExpandLink.innerHTML = "– Filterinställningar";
        }
    }
}

function allCategoriesAreChecked() {
    if (!!betterSwec.filterSettingsList) {
        var listItems = betterSwec.filterSettingsList.children;
        for (var i = 1; i < listItems.length; i++) {
            if (!listItems[i].children[0].checked) {
                return false;
            }
        }
        return true;
    }
    throw new Exception("Filter settings list element could not be found.");
}

function filterSettingsClicked(eventTarget) {
    if (eventTarget instanceof HTMLInputElement && eventTarget.getAttribute("type") === "checkbox") {
        // Target of click event is a checkbox.
        var inputBox = eventTarget;
        if (inputBox.id === "betterSwecFilterSettingsToggleAll") {
            toggleAllFilterCategories(inputBox);
        } else {
            toggleFilterCategory(inputBox);
        }
        setSelectAll(allCategoriesAreChecked());
    }
}

function toggleFilterCategory(inputBox) {
    LSSet(category(inputBox.getAttribute("id")), inputBox.checked.toString());
}

function toggleAllFilterCategories(inputBox) {
    var cat, i;
    var inputBoxState = inputBox.checked;
    var listItems = betterSwec.filterSettingsList.children;
    for (i = 1; i < listItems.length; i++) {
        // Start with i = 1 to exclude the "Select all" checkbox.
        cat = listItems[i].children[0];
        cat.checked = inputBoxState;
        toggleFilterCategory(cat);
    }
}

function setSelectAll(state) {
    if (!!betterSwec.filterSettingsList) {
        var listItems = betterSwec.filterSettingsList.children;
        listItems[0].children[0].checked = state;
    }
}

function inputBoxState(cat) {
    return LSIsTrue(category(cat)) ? " checked" : "";
}

function insertFilterControls() {
    var pushList = document.getElementsByClassName("pushListInternal")[0];
    var pushListInner = pushList.children[0];
    var pushListBody = pushListInner.children[1];
    var nyhetstips = pushList.getElementsByClassName("nyhetstips")[0];
    var listItems = pushList.getElementsByTagName("li");
    var categories = betterSwec.categories;
    var filterSettingsWrapper = document.createElement("div");
    var filterSettingsWrapperHTML = "";

    var filterSettingsExpandLink = document.createElement("a");
    var filterSettingsExpandLinkHTML = "+ Filterinställningar";
    filterSettingsExpandLink.id = "betterSwecFilterSettingsExpandLink";
    filterSettingsExpandLink.href = "#";
    filterSettingsExpandLink.classList.add("betterSwecLink");
    filterSettingsExpandLink.innerHTML = filterSettingsExpandLinkHTML;
    betterSwec.CSS += ".pushListInternal .nyhetstips { display: inline-block; width: 120px; }";

    var n, c, categoryUrlID, categoryName, currentItem, currentItemLink, href;
    for (n = 0; n < listItems.length; n++) {
        currentItem = listItems[n];
        currentItemLink = currentItem.children[0];
        href = currentItemLink.href;
        for (c = 0; c < categories.length; c++) {
            categoryUrlID = categories[c][0];
            categoryName = categories[c][1];
            if (href.indexOf(categoryUrlID) !== -1) {
                // Found matching category
                currentItemLink.title = deHTMLize(categoryName) + " > " + currentItemLink.title;
                if (LSIsTrue(category(categoryUrlID))) {
                    currentItem.style.opacity = "0.3";
                }
            }
        }
    }

    filterSettingsWrapperHTML = '\
    <ul title="Kryssa för de kategorier du vill filtrera bort" id="betterSwecFilterSettingsList">\
        <li><input type="checkbox" id="betterSwecFilterSettingsToggleAll" /><label for="betterSwecFilterSettingsToggleAll">Markera alla</label></li>';

    var currentCat, currentCatUrlID, currentCatName;
    for (var i = 0; i < categories.length; i++) {
        currentCat      = categories[i];
        currentCatUrlID = currentCat[0];
        currentCatName  = currentCat[1];
        filterSettingsWrapperHTML += '<li><input type="checkbox" id="' + currentCatUrlID + '"' + inputBoxState(currentCatUrlID) + ' /><label for="' + currentCatUrlID + '">' + currentCatName + '</label></li>'
    }
    filterSettingsWrapperHTML += '</ul>';
    filterSettingsWrapper.innerHTML = filterSettingsWrapperHTML;

    var foot = pushListInner.children[2];

    pushListBody.insertBefore(filterSettingsExpandLink, nyhetstips);
    pushListInner.insertBefore(filterSettingsWrapper, foot);
    filterSettingsWrapper.setAttribute("id", "betterSwecFilterSettingsWrapper");
    eventListener("betterSwecFilterSettingsExpandLink", "click", function(event) { event.preventDefault(); toggleShowFilterSettings(); });

    var filterSettingsList = byID("betterSwecFilterSettingsList");
    betterSwec.filterSettingsList = filterSettingsList;
    filterSettingsList.addEventListener("click", function(event) { filterSettingsClicked(event.target) }, false);

    setSelectAll(allCategoriesAreChecked());

    // End of insertFilterControls
}



//================================================================
// The Section of Supposedly Beautiful Code
//================================================================

loadSettings();

addBetterSwecMainCSS();

vbTaFocusDetection();

if (optionIsTrue("darkThemeByBlargmode")) {
    insertDarkThemeByBlargmodeButton();
}

handleDarkTheme();

handleDarkThemeTimer();

if (optionIsTrue("preventSignout")) {
    preventSignout();
}

if (optionIsTrue("searchWithGoogle")) {
    enableSearchWithGoogle();
}

if (optionIsTrue("enableFavoriteLinks")) {
    favoriteLinks();
}

if (optionIsTrue("quoteQuickReply")) {
    // User is on Quoted Posts (Citat) page and wants quick reply buttons
    insertQuoteQuickReplyButtons();
}

if (optionIsTrue("marketLinks")) {
    // User is on a page with "Senaste privatannonserna" section and wants to modify it
    insertMarketLinks();
}

if (document.location.href.match(/forum\/profile\.php\?do=editoptions/i)) {
    // User is on Options page
    insertBetterSwecOptionsForm();
}

if (optionIsTrue("betterNavButtons")) {
    // User wants improved pagination nav buttons
    improveNavButtons();
}

if (optionIsTrue("betterQuoteLinks")) {
    // User wants improved link to original post in quotes
    improveQuoteLinks();
}

if (optionIsTrue("makeImagesClickable")) {
    // Makes images clickable unless they already are
    makeImagesClickable();
}

if (optionIsTrue("linkToOP")) {
    // User wants link to thread start
    insertLinkToOP();
}

if (ACPCanBeInserted()
    && optionIsTrue("advancedControlPanel")
    && byID("betterSwecACP") === null) {
    // If the null check is skipped, a new ACP is created every time the user navigates back and then forward in some browsers.
    insertAdvancedControlPanel();
}

if (optionIsTrue("ACP.showColorPalette")) {
    // Color palette was expanded last time, so it should be now as well
    showColorPalette(true);
}

insertButtonsBelowTA();

setLargerTextarea(betterSwec.settings.largerTextareaActive);

if (optionIsTrue("removeLastNewline")) {
    // User wants one empty line instead of two in textarea
    removeLastNewline();
}

if (optionIsTrue("focusVbTa")) {
    // User wants autofocus on textarea
    focusVbTa();
}

if (optionIsTrue("removeMobileSiteDisclaimer")) {
    // User wants to remove "Skickades från m.sweclockers.com"
    removeMobileSiteDisclaimer();
}

if (optionIsTrue("enableFilter")) {
    // User wants to enable filter for "Nytt i forumet"
    insertFilterControls();
}

if (optionIsTrue("dogeInQuoteFix")) {
    // User wants to show Doge smileys in quotes
    dogeInQuoteFix();
}

if (isOnFirstPageOfBSCThread()) {
    checkForUpdate();
}

insertStyleElement();

checkForBetterSweClockersAnchor();

// Must be last
if (optionIsTrue("benchmarkMode")) {
    document.title = (new Date() - betterSwecStartTime) + " ms | " + document.title;
}

