//
// reworked again by (md5sum{at}yahoo.com) 3/26/09 for new woot layout.
// reworked again by (md5sum{at}yahoo.com) 10/28/09 for bug fixes.
// 10/29/09 2 bug fixes (see discussions), 2 enhancements (also see discussions) (md5sum{at}yahoo.com
// ==UserScript==
// @name Woot.com WootOff Suite
// @namespace http://nikru.com
// @description Auto Refreshes during WootOff, then Buys 3 items on BoCs
// @include https://www.woot.com/Member/Order.aspx
// @include https://sslwww.woot.com/Member/Order.aspx
// @include http://www.woot.com/default.aspx
// @include http://woot.com/default.aspx
// @include http://kids.woot.com/default.aspx
// @include http://www.woot.com/
// @include http://woot.com/
// @include http://kids.woot.com/
// @include http://maxaffinity.blogspot.com/*
// ==/UserScript==

// Set some script variables.
var script = {
    url: "http://userscripts.org/scripts/source/37342.user.js",
    version: "0.20",
    homePage: "http://userscripts.org/scripts/show/37342"
};

// Register a command in the GreaseMonkey menu.
GM_registerMenuCommand("Woot.Com WootOff Suite Settings", showControlPanel);

var controlPanelIsOpen = false;

// Make sure we're not at an error page.
if (window.location.href.toLowerCase().match("error") == "error") {
    refresh();
}

// Refresh the window.
function refresh() {
    if (controlPanelIsOpen) {
        setRefreshTimer();
    }
    else {
        window.location = window.location;
    }
}

var logoImage = '<img src="' +
    'data:image/png;base64,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' +
    'Jggg==' +
    '" />';
    
var froogleImage = '<img src="' + 
    'data:image/png;base64,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' +
    '" />';

// Script variables
var enabled;			// Allow enabling and disabling of the script.
var wantTwoButton;		// The "I want 2" button.
var wantThreeButton;		// The "I want 3" button.
var buyItButton;		// The "buy it" button.
var wantOne;			// The big yellow "I Want One" button.
var cardSecurity;		// The CVV TextBox.
var theForm;			// The Asp.Net form.
var eventTarget;		// The backend event target.
var eventArgument;		// The backend event argument array.
var wootOffPanel;		// The WootOff panel.
var itemPrice;			// The price of the item being sold.
var itemName;			// The name of the item being sold.
var percentLeft;		// The percent left of the current item.
var currentVersion;		// The latest release version of the script.
var progressBar;		// The progress bar.
var loggedIn;			// The logged in display.
var loggedOut;			// The logged out display.

// User setting variables.
var cvvNumber;			// The user's CVV number.
var itemRefresh;		// Refresh rate for WootOff.
var soldOutRefresh;		// Refresh rate for WootOff when item is sold out.
var autoUpdate;			// Whether or not to automatically update this script.
var updateNotify;		// Whether or not to notify the user when this script has an available update.
var myLastWootOff;		// The date of the last WootOff I looked at.
var showCompareLinks;		// Whether or not to show price comparison links for items.
var username;			// The user's Woot username.
var password;			// The user's Woot password.


// Fill all variables that allow nulls.
function fillNullables() {
    wantTwoButton = document.getElementById("ctl00_ctl00_ContentPlaceHolderMainContent_ContentPlaceHolderPrimaryContent_ShoppingCartControl_WantedTwoButton");
    wantThreeButton = document.getElementById("ctl00_ctl00_ContentPlaceHolderMainContent_ContentPlaceHolderPrimaryContent_ShoppingCartControl_WantedThreeButton");
    buyItButton = document.getElementById("ctl00_ctl00_ContentPlaceHolderMainContent_ContentPlaceHolderSecondaryContent_BuyButton");
    wantOne = document.getElementById("ctl00_ctl00_ContentPlaceHolderLeadIn_ContentPlaceHolderLeadIn_SaleControl_HyperLinkWantOne");
    cardSecurity = document.getElementById("ctl00_ctl00_ContentPlaceHolderMainContent_ContentPlaceHolderSecondaryContent_SecurityCodeTextBox");
    theForm = document.getElementById("aspnetForm");
    eventTarget = document.getElementById("__EVENTTARGET");
    eventArgument = document.getElementById("__EVENTARGUMENT");
    wootOffPanel = document.getElementById("ctl00_ctl00_ContentPlaceHolderLeadIn_ContentPlaceHolderLeadIn_SaleControl_PanelWootOff");
    progressBar = document.getElementById("ctl00_ctl00_ContentPlaceHolderLeadIn_ContentPlaceHolderLeadIn_SaleControl_PanelWootOffProgressBar");
    loggedIn = document.getElementById("loggedIn");
    loggedOut = document.getElementById("loggedOut");
}

try {
    startWooting();
}
catch (a) {
    alert(a);
}

function startWooting() {
    fillNullables();

    setTimeout(doLogin, 500);

    if (theForm && document.location.href.match("maxaffinity") != "maxaffinity") {
        if (wootOffPanel) {
            GM_setValue("ordering", "false");
        }

        if (GM_getValue("ordering", "false") == "false") {
            try {
                getItemInfo();
            }
            catch (a) {

            }

            if (wootOffPanel) {
                checkRandomCrap();
                getWootOffInfo();
                setRefreshTimer();
            }
        }
        else {
            processOrder();
        }

        showControlPanelLink();
        addFroogleLink();
        removeAds();
        setNewTitle();
    }
}

function doLogin() {
    if (loggedIn) {
        if (loggedIn.style.display == "none") {
            if (GM_getValue("username", null) != null && GM_getValue("password", null) != null) {
                var loginForm = document.getElementById('loginForm');

                if (!loginForm) {
                    setTimeout(doLogin, 500);
                }
                else {
                    document.getElementById('username').value = GM_getValue("username", "");
                    document.getElementsByName('password')[0].value = GM_getValue("password", "");

                    document.getElementById('loginSubmit').parentNode.parentNode.submit();
                }
            }
        }
    }
    else {
        setTimeout(doLogin, 500);
    }
}

function getItemInfo() {
    itemName = document.getElementsByTagName("h2")[0].innerHTML;
    itemPrice = document.getElementsByTagName("h3")[0].firstChild.childNodes[1].innerHTML;
}

function getWootOffInfo() {
    wootOffPanel = wootOffPanel.parentNode;
    showPercentLeft();
}

// Display progress bar percent left.
function showPercentLeft() {
    if (progressBar) {
        percentLeft = progressBar.innerHTML.split(':')[1].split('%')[0];

        var textPercent = document.createElement("div");
        textPercent.style.position = "absolute";
        textPercent.style.top = "5px";
        textPercent.style.textAlign = "center";
        textPercent.style.fontSize = "12px";
        textPercent.style.fontWeight = "bold";
        textPercent.style.width = "100%";

        textPercent.innerHTML = percentLeft + "% Left ";
        progressBar.parentNode.appendChild(textPercent);
    }
}

function checkRandomCrap() {
    if (itemName.substring(0, 11) == "Random Crap") {
        clickIWantOne();
    }
}

function clickIWantOne() {
    document.location = "http://www.woot.com" + wantOne.getAttribute("href");
    GM_setValue("ordering", true);
}

// Click the "I Want 3" button.
function clickIWantThree() {
    try {
        eventTarget.value = "ctl00$ctl00$ContentPlaceHolderMainContent$ContentPlaceHolderPrimaryContent$ShoppingCartControl$WantedThreeButton";
        eventArgument.value = "";
        theForm.submit();
    }
    catch (a) {
        GM_setValue("ordering", false);
        alert("Could Not Select Three for Unknown Reasons");
    }
}

function processOrder() {
    if (wantThreeButton) {
        clickIWantThree();
    }
    else {
        if (GM_getValue("cardSecurity")) {
            cardSecurity.value = GM_getValue("cardSecurity");

            try {
                WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions("ctl00$ctl00$ContentPlaceHolderMainContent$ContentPlaceHolderSecondaryContent$BuyButton", "", true, "", "", false, false));
            }
            catch (a) {
                GM_setValue("ordering", false);
            }
        }
    }
}

//Display the item, price, and percent left in the title bar.
function setNewTitle() {
    if (itemPrice) {
        var newTitle = "";

        if (percentLeft) {
            newTitle = "(" + percentLeft + "%) ";
        }

        newTitle = newTitle + "$" + itemPrice + " - " + itemName;

        document.title = newTitle;
    }
}

function removeAds() {
    if (theForm) {
        if (document.location.href.match("kids.woot") == "kids.woot") {
            var adOne = document.getElementById("ctl00_ctl00_ContentPlaceHolderMainContent_ContentPlaceHolderMainContent_ctl02_AdvertisementControl1_PanelAdvertisement");
            if (adOne) {
                adOne.parentNode.removeChild(adOne);
            }

            var adOne = document.getElementById("ctl00_ctl00_ContentPlaceHolderMainContent_ContentPlaceHolderMainContent_ctl02_AdvertisementControl2_PanelAdvertisement");
            if (adOne) {
                adOne.parentNode.removeChild(adOne);
            }

            var adThree = document.getElementById("ctl00_ctl00_ContentPlaceHolderSidebar_ContentPlaceHolderSidebar_ctl00_ctl05_PanelAdvertisement");
            if (adOne) {
                adThree.parentNode.removeChild(adThree);
            }
        }
        else {
            var adOne = document.getElementById("ctl00_ctl00_ContentPlaceHolderMainContent_ContentPlaceHolderMainContent_ctl02_ctl00_PanelAdvertisement");
            if (adOne) {
                adOne.parentNode.removeChild(adOne);
            }

            var adTwo = document.getElementById("ctl00_ctl00_ContentPlaceHolderMainContent_ContentPlaceHolderMainContent_ctl02_ctl03_PanelAdvertisement");
            if (adTwo) {
                adTwo.parentNode.removeChild(adTwo);
            }

            var adThree = document.getElementById("ctl00_ctl00_ContentPlaceHolderSidebar_ContentPlaceHolderSidebar_ctl00_ctl05_PanelAdvertisement");
            if (adThree) {
                adThree.parentNode.removeChild(adThree);
            }
        }
    }
}

function setRefreshTimer() {
    // Nothing else has happened, so we refresh the page.
    if (window.location.href.toLowerCase().match("woot.com") == "woot.com" && wantOne) {
        try {
            // See if the current item is sold out.
            if (wantOne.attributes[0].value == "soldOut") {
                // Refresh faster when the item is sold out.
                setTimeout(refresh, GM_getValue("soRefreshRate", "2") * 1000);
            }
            else {
                if (itemName.match("Random Crap") != "Random Crap") {
                    // Refresh at a more normal rate.
                    setTimeout(refresh, GM_getValue("nRefreshRate", "10") * 1000);
                }
            }
        }
        catch (a) {
            alert("Settings contain invalid refresh rates, please correct them to continue.");
        }
    }
}

function showControlPanelLink() {
    if (loggedIn) {
        var cpLink = "<h4><a onclick='showControlPanel();' id='cpLinkLO'>WootOff Suite</a></h4>";

        document.getElementById("loginLink").innerHTML += cpLink;

        var cpLinkLO = document.getElementById('cpLinkLO');
        cpLinkLO.addEventListener('click', showControlPanel, false);

        cpLink = "<a onclick='showControlPanel();' id='cpLinkLI'>WootOff Suite</a>";

        loggedIn.getElementsByTagName("p")[0].innerHTML += "<span> | </span>" + cpLink;

        var cpLinkLI = document.getElementById('cpLinkLI');
        cpLinkLI.addEventListener('click', showControlPanel, false);
    }
    else {
        setTimeout(showControlPanelLink, 500);
    }
}

function addFroogleLink() {
    var fl = "<br /><a onclick='return false;' href='' id='froogleLink'>" + froogleImage + "</a>";

    if (wootOffPanel) {
        wantOne.parentNode.parentNode.childNodes[3].innerHTML += fl;
    }
    else {
        if (wantOne) {
            wantOne.parentNode.parentNode.childNodes[1].innerHTML += fl;
        }
    }
    
    var froogleLink = document.getElementById('froogleLink');
    if (froogleLink) {
        froogleLink.addEventListener('click', openFroogleResults, false);
    }
}

function openFroogleResults() {
    GM_openInTab("http://www.google.com/products?q=" + itemName.replace(/ /g, "+") + "&scoring=r&lnk=showgrid");
}

function showControlPanel(e) {
    controlPanelIsOpen = true;
    
    var podcast = document.getElementById("ctl00_ctl00_ContentPlaceHolderMainContent_ContentPlaceHolderMainContent_ctl02_ctl01_PanelWootcast");
    if (podcast) {
        podcast.style.display = "none";
    }
    
    var backgroundDiv = document.createElement("div");
    backgroundDiv.id = "wcwosBackground";
    backgroundDiv.style.position = "absolute";
    backgroundDiv.style.top = "0px";
    backgroundDiv.style.zIndex = "1";
    backgroundDiv.style.background = "#000000";
    backgroundDiv.style.opacity = "0.5";
    backgroundDiv.style.width = (window.innerWidth + window.scrollMaxX) + "px";
    backgroundDiv.style.height = (window.innerHeight + window.scrollMaxY) + "px";
    document.getElementsByTagName("body")[0].appendChild(backgroundDiv);

    var controlPanel = document.createElement("div");
    controlPanel.id = "wcwosPanel";

    controlPanel.style.position = "absolute";
    controlPanel.style.border = "4px solid #FACE20";
    controlPanel.style.width = "400px";
    controlPanel.style.height = "300px";
    controlPanel.style.left = ((window.innerWidth / 2) - 200) + "px";
    controlPanel.style.top = ((window.innerHeight / 2) - 150) + "px";
    controlPanel.style.background = "#FFFFFF";
    controlPanel.style.zIndex = "2";
    document.getElementsByTagName("body")[0].appendChild(controlPanel);

    controlPanel.innerHTML += "<center>" + logoImage + "</center>";

    var settingsTable = "<div width='100%' style='background-color: #61861E; height: 250px'><center><table cellpadding='2px' cellspacing='2px'  style='margin-top: 5px; margin-bottom: 5px; width: 95%; height: 240px; background-color: #91AB62;'>";
    settingsTable += "<tr><td style='width: 25%;'></td><td colspan='2' align='center' style='vertical-align: middle; font-size: 10px; font-weight: bold;'><span style='margin-top: 5px;'>Personal Settings</span></td><td style='width: 25%'></td></tr>";
    settingsTable += "<tr><td colspan='4'><table style='width: 100%; background-color: #91AB62;'><tr><td align='right' width='25%'>Woot! Username: </td><td width='25%'><input type='text' style='margin-top: 5px; margin-bottom: 5px; width: 100%' id='wcwosUsername' value='" + GM_getValue("username", "") + "' /></td>";
    settingsTable += "<td align='right' width='25%'>Woot! Password: </td><td width='25%'><input type='password' style='margin-top: 5px; margin-bottom: 5px; width: 90%' id='wcwosPassword' value='" + GM_getValue("password", "") + "' /></td></tr>";
    settingsTable += "<tr><td align='right'>Card Security Code: </td><td><input type='text' style='margin-top: 5px; margin-bottom: 5px; width: 100%;' id='wcwosSecurityCode' value='" + GM_getValue("cardSecurity", "") + "' /></td><td></td><td></td></tr></table></td></tr>";
    settingsTable += "<tr><td></td><td colspan='2' align='center' style='vertical-align: middle; font-size: 10px; font-weight: bold;'>WootOff Settings</td><td></td></tr>";
    settingsTable += "<tr><td colspan='4'><table style='width: 100%; background-color: #91AB62;'><tr><td align='right' style='width: 25%;'>Refresh Rate: </td><td style='width: 25%;'><input type='text' style='margin-top: 5px; margin-bottom: 5px; width: 100%' id='wcwosNormalRefresh' value='" + GM_getValue('nRefreshRate', "10") + "' /></td>";
    settingsTable += "<td align='right' style='width: 25%;'>Sold Out Rate: </td><td style='width: 25%;'><input type='text' style='margin-top: 5px; margin-bottom: 5px; width: 90%' id='wcwosSoldOutRefresh' value='" + GM_getValue('soRefreshRate', "2") + "' /></td></tr></table></td></tr>";
    settingsTable += "<tr><td></td><td colspan='2' align='center' style='vertical-align: middle; font-size: 10px; font-weight: bold;'>Script Settings</td><td></td></tr>";
    settingsTable += "<tr><td colspan='4'><table style='width: 100%; background-color: #91AB62;'><tr><td align='right' style='width: 25%;'>Auto Update: </td><td align='left' style='width: 25%;'><input type='checkbox' style='margin-bottom: 5px; margin-top: 5px;' id='wcwosAutoUpdate' /></td><td></td><td></td></tr></table></tr>";
    settingsTable += "<tr><td colspan='4'><center><font color='#FFFFFF' size='12px'><br />NOTE: The WootOff refresh feature is disabled while the Control Panel is open!</font></center></td></tr>";
    settingsTable += "<tr style='height: 100%; vertical-align: bottom;'><td colspan='2' align='left' style=' vertical-align: bottom;'><div id='cancelDiv' style='margin-bottom: 5px; margin-left: 5px;'></div></td><td colspan='2' align='right' style=' vertical-align: bottom;'><div id='saveDiv' style='margin-bottom: 5px; margin-right: 5px;'></div></td></tr>";
    settingsTable += "</table><br /></center></div>";

    controlPanel.innerHTML += settingsTable;

    var btnSave = document.createElement("button");
    btnSave.type = "button";
    btnSave.innerHTML = "Save Changes";
    btnSave.style.margin = '5';

    btnSave.addEventListener('click', saveSettings, false);

    document.getElementById('saveDiv').appendChild(btnSave);

    var btnCancel = document.createElement("button");
    btnCancel.type = "button";
    btnCancel.innerHTML = "Cancel";
    btnCancel.style.margin = '5';

    btnCancel.addEventListener('click', cancelSettings, false);

    document.getElementById('cancelDiv').appendChild(btnCancel);

    document.getElementById("wcwosAutoUpdate").checked = GM_getValue("autoUpdate", true);
}

function saveSettings(e) {
    GM_setValue("username", document.getElementById('wcwosUsername').value);
    GM_setValue("password", document.getElementById('wcwosPassword').value);
    GM_setValue("cardSecurity", document.getElementById('wcwosSecurityCode').value);
    GM_setValue("nRefreshRate", document.getElementById('wcwosNormalRefresh').value);
    GM_setValue("soRefreshRate", document.getElementById('wcwosSoldOutRefresh').value);
    GM_setValue("autoUpdate", document.getElementById('wcwosAutoUpdate').checked);

    cancelSettings(e);
}

function cancelSettings(e) {
    var podcast = document.getElementById('ctl00_ctl00_ContentPlaceHolderMainContent_ContentPlaceHolderMainContent_ctl02_ctl01_PanelWootcast');
    if (podcast) {
        podcast.style.display = "block";
    }

    var cpBackground = document.getElementById('wcwosBackground');
    cpBackground.parentNode.removeChild(cpBackground);

    var controlPanel = document.getElementById('wcwosPanel');
    controlPanel.parentNode.removeChild(controlPanel);
    
    controlPanelIsOpen = false;
}