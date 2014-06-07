// ==UserScript==
// @name            NirvanaHQ Hotkeys Popup
// @version         1.1
// @description     Adds buttons to NirvanaHQ, which open a window with all available hotkeys/tags.
// @author          Darek Kay <darekkay@gmail.com>
// @namespace       http://www.eclectide.com
// @include         https://app.nirvanahq.com/
// @require         https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @require         https://gist.github.com/raw/2625891/waitForKeyElements.js
// @require         http://www.eclectide.com/service/tinybox2/packed.js
// @resource        tinyboxCSS http://www.eclectide.com/service/tinybox2/style.css
// ==/UserScript==

waitForKeyElements(".button.newtask", addButtons, false);

GM_addStyle(GM_getResourceText("tinyboxCSS"));
GM_addStyle(".tcontent table{margin-top: 3px; margin-bottom: 9px}");
GM_addStyle(".tcontent td:first-child{width: 130px; padding-left: 20px; vertical-align: top}");

function addButtons(){
    addTagsButton();
    addHotkeyButton();
}

function addTagsButton() {
    $("#north").append("<a id='tags' class='right button' title='Show rapid entry tags'>Tags</a>");
    var tagsContent = createTags();
    $("#tags").click(function () {
        TINY.box.show({html: tagsContent, width: 580, height: 230, opacity: 50, close: false});
    });
}

function createTags(){
    var table = "";
    table += createHotkeyEntry("#star / #focus", "Focus the task");
    table += createHotkeyEntry("#next", "Put the task into the 'next' list");
    table += createHotkeyEntry("#someday", "Put the task into the 'someday' list");
    table += createHotkeyEntry("#waiting", "Put the task into the 'waiting' list");
    table += createHotkeyEntry("#later / #inactive", "Put the task into the 'later' list");
    table += createHotkeyEntry("#project", "Make a project out of the task");
    table += createHotkeyEntry("#due [time]", "Set the due time");
    table += createHotkeyEntry("#<i>tag</i>", "Use any tag to reference (or create) contexts (e.g. #work)");

    var footer = "The #due tag accepts many common values, e.g.: <br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; today, tomorrow, yesterday, next week/month/year, jan/feb/mar/... <br /><br />"
               + "You can find more infos <a href='http://forums.nirvanahq.com/discussion/comment/129' target='_blank'>here</a> and <a href='http://forums.nirvanahq.com/discussion/966/' target='_blank'>here</a>.";

    return createTable("Rapid Entry tags", table) + footer;
}

function addHotkeyButton() {
    $("#north").append("<a id='hotkeys' class='right button' title='Show keyboard shortcuts'>Hotkeys</a>");

    var laterVisible = $(".later").length > 0;
    var hotkeysContent = createHotkeys(laterVisible);

    $("#hotkeys").click(function () {
        TINY.box.show({html: hotkeysContent, width: 435, height: 600, opacity: 50, close: false});
    });
}

function createHotkeys(showLater) {
    return createNavigationHotkeys(showLater) +
        createActionHotkeys() +
        createRapidEntryHotkeys() +
        createAreaHotkeys() +
        createGlobalHotkeys();
}

function createNavigationHotkeys(showLater) {
    var i = 1;
    var output = "";

    output += createHotkeyEntry(i++, "Inbox");
    output += createHotkeyEntry(i++, "Next");
    if (showLater)
        output += createHotkeyEntry(i++, "Later");
    output += createHotkeyEntry(i++, "Waiting (For)");
    output += createHotkeyEntry(i++, "Scheduled");
    output += createHotkeyEntry(i++, "Someday");
    output += createHotkeyEntry(i++, "Focus");
    output += createHotkeyEntry(i++, "Projects");
    if (!showLater)
        output += createHotkeyEntry(i++, "References");
    output += createHotkeyEntry(i++, "Logbook");
    i = 0;
    output += createHotkeyEntry(i, "Trash");

    return createTable("Navigation", output);
}

function createActionHotkeys() {
    var output = "";
    output += createHotkeyEntry("P", "New Project");
    output += createHotkeyEntry("I", "New Action - Inbox");
    output += createHotkeyEntry("A", "New Action - Current context");
    output += createHotkeyEntry("N", "New Item - insert at bottom of list");
    output += createHotkeyEntry("Shift + N", "New Item - insert at top of list");
    output += createHotkeyEntry("Shift + Click", "New Item - insert above clicked task");
    output += createHotkeyEntry("Enter", "Save");
    output += createHotkeyEntry("Shift + Enter", "Save (when in a text box)");

    return createTable("Creating Actions and Projects", output);
}

function createRapidEntryHotkeys() {
    var output = "";
    output += createHotkeyEntry("Shift + E", "Rapid Entry toggle");
    output += createHotkeyEntry("Tab/E", "Focus Rapid Entry field");
    output += createHotkeyEntry("Enter", "Save at bottom of List");
    output += createHotkeyEntry("Shift + Enter", "Save at top of List");

    return createTable("Rapid Entry", output);
}

function createAreaHotkeys() {
    var output = "";
    output += createHotkeyEntry("Shift + 9", "All areas");
    output += createHotkeyEntry("Shift + 0", "Unassigned");
    output += createHotkeyEntry("Shift + 1..8", "User Defined area 1 through 8");
    output += createHotkeyEntry("Shift + &rarr;", "Next Area");
    output += createHotkeyEntry("Shift + &larr;", "Previous Area");

    return createTable("Area Switching", output);
}

function createGlobalHotkeys() {
    var output = "";
    output += createHotkeyEntry("C", "Move completed tasks to Logbook");
    output += createHotkeyEntry("G", "Tag Library management");
    output += createHotkeyEntry("H", "Help dialogue mode");
    output += createHotkeyEntry("Esc", "Cancel current action");
    return createTable("Global", output);
}

function createHotkeyEntry(hotkey, description) {
    return "<tr><td>" + hotkey + "</td>" + "<td>" + description + "</td></tr>";
}

function createTable(headline, content) {
    return "<h1>" + headline + "</h1><table>" + content + "</table>";
}