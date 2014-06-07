// ==UserScript==
// @name           Facebook Gift Link Creator
// @namespace      Facebook Gift Link Creator
// @description    Creates for every gift a link on the top of the facebook request page. You are now able to open that link into a new tab in your browser. So you are much faster to open more gifts and the page doesn't need to reload each time.
// @include        http://www.facebook.com*
// @require        http://sizzlemctwizzle.com/updater.php?id=84328&uso&days=1
// @require        http://userscripts.org/scripts/source/49700.user.js
// @version        1.10b
// ==/UserScript==

/////////////////////////////////////////////////////////////
// Do not change anything of this code without permission. //
// Script copyright 2010 by DragonByte                     //
/////////////////////////////////////////////////////////////

// Application definitions
var AppSettings = {
    version: '1.10b',
    src: 'http://userscripts.org/scripts/show/84328',
    appColor: '#FFFFE0',    // light yellow
    foundGiftColor: '#DDDDDD', // light grey
    clickedGiftColor: '#A0FFA0' // light green
};

// Variables for ignorerequests
var fbIgnoreUrl = 'http://www.facebook.com/ajax/reqs.php?__a=1' // fb ignore request
    fbIgnoreReq =   '&actions[reject]=Ignore';

GM_config.init("Main Options", {
    /*groupapps: {
        label: "Group applications together",
        type: "checkbox",
        "default": false
    },*/
    askbeforeignore: {
        section: ["Main Settings"],
        label: "Ask before ignore all gifts automaticly",
        type: "checkbox",
        "default": true
    },
    autoopenlimit: {
        label: "Auto open tab limit (0 = no limit but could freez your computer if you have a lot of gifts):",
        type: "int",
        size:2,
        "default": 10 
    },
    autoopen: {
        section: ["Autoacception (isn't working with every game. Only Tested with Farmville and FrontierVille. Remember: Not every gift is a gift)"],
        label: "One click auto accept",
        type: "checkbox",
        "default": false
    },
    showautoaccept: {
        label: "Show function accept all gifts ",
        type: "checkbox",
        "default": false
    },
    filterautoaccept: {
        label: 'Display "accept all gifts" (if enabled) only at Farmville and FrontierVille',
        type: "checkbox",
        "default": true
    }
});

GM_registerMenuCommand("Facebook Gift Link Creator settings", GM_config.open);

// new Gamecard on FB
var gameCardMode = 0;

// Display autoaccept only at these games
var autoacceptfilterid = new Array(
    '201278444497', // frontierville
    '102452128776' // farmville
);

//var FBApps = {
//    'Farmville':

// Load latest JQueryscript
function AddJQScript() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'http://code.jquery.com/jquery-latest.min.js';
    document.getElementsByTagName('head')[0].appendChild(script);
}

function hideIfAllAccepted(appIndex) {
    var hide;
    for (var index = 1; index < Gifts[appIndex].length; index++) {
        if (Gifts[appIndex][index] == 3) {
            hide = true;
        } else {
            hide = false;
            return; // break here
        }
    }
    if (hide == true) {
        try {
            //$jQ('span[id = ' + appIndex + '_header]').fadeOut("slow");
            //$jQ('span[id = ' + appIndex + '_box]').fadeOut("slow");
            document.getElementById(appIndex + '_header').style.display = 'none';
            try {
                document.getElementById(appIndex + '_header_OH').style.display = 'none';
            } catch (e) { }
            document.getElementById(appIndex + '_box').style.display = 'none';
        } catch (e) { } // element not found... do nothing 
    }

}

function openLinkInNewTab(appIndex, giftIndex, adr, element, fbdivelement) {
    return function () {
        Gifts[appIndex][giftIndex] = 3; // Set status ignored
        if (!GM_config.get('autoopen')) {
            element.style.backgroundColor = AppSettings['clickedGiftColor'];
            $jQ(fbdivelement).css('background-color', AppSettings['clickedGiftColor']); // Highlight clicked gift elements
            GM_openInTab(adr);
            //$jQ('span[id = ' + appIndex + '_' + giftIndex + '_link]').fadeOut("slow");
            try {
                document.getElementById(appIndex + '_' + giftIndex + '_link').style.display = 'none';
                //document.getElementById(appIndex + '_' + giftIndex + '_ignore').click();
                //sendRequest(fbIgnoreUrl, fbIgnoreReq + ReqForms[appIndex][giftIndex] + '&post_form_id_source=AsyncRequest');

                ignoreGift(appIndex, giftIndex);
            } catch (e) {
                GM_log("Ignorebuttons not found. Layout changed? Please report this message DragonByte in userscripts!");
            }
            hideIfAllAccepted(appIndex); // check each time if all gifts are accepted
        } else {
            acceptGift(appIndex, giftIndex, Adresses[appIndex][giftIndex], 0);
        }
    }
}


function openAllGifts(appIndex) {
    return function () {
        var openLimit = GM_config.get('autoopenlimit');

        if (openLimit == 0) { openLimit = Gifts[appIndex].length }; // if limit = 0 then all gifts


        showGifts(appIndex); // Autoshow to see the giftstatus



        var acceptedGiftCount = 0;
        for (var giftIndex = 1; giftIndex < Gifts[appIndex].length; giftIndex++) {
            if (Gifts[appIndex][giftIndex] != 3) { // not accepted yet
                if (acceptedGiftCount < openLimit) { // check if limit reached


                    GM_openInTab(Adresses[appIndex][giftIndex]); // open Gift in tab

                    try {
                        document.getElementById(appIndex + '_' + giftIndex + '_link').style.display = 'none';
                        //document.getElementById(appIndex + '_' + giftIndex + '_ignore').click(); // click ignore // so funktioniert es nicht mehr :(

                        // Send ignore request
                        //sendRequest(fbIgnoreUrl, fbIgnoreReq + ReqForms[appIndex][giftIndex] + '&post_form_id_source=AsyncRequest');

                        ignoreGift(appIndex, giftIndex);

                        //document.all(objID).fireEvent("onclick", newEvt)
                    } catch (e) {
                        GM_log("Ignorebuttons not found. Layout changed? Please report this message DragonByte in userscripts! Err: " + e);

                    }
                    Gifts[appIndex][giftIndex] = 3; // set accepted and ignored
                    hideIfAllAccepted(appIndex); // check each time if all gifts are accepted

                    acceptedGiftCount++;
                } else {
                    break;
                }
            }
        }

    }
}


function showHideGifts(id) {
    return function () {
        box = document.getElementById(id + '_box');
        header = document.getElementById(id + '_showHideButton');

        // Check displaystyle
        if (box.style.display == 'none') {
            //$jQ(box).fadeIn("slow");
            box.style.display = 'block';
            header.innerHTML = "(hide)";
        } else {
            //$jQ(box).fadeOut("slow");
            box.style.display = 'none';
            header.innerHTML = "(show)";
        }
    }

}

function showGifts(id) {

    box = document.getElementById(id + '_box');
    header = document.getElementById(id + '_showHideButton');

    // Check displaystyle
    if (box.style.display == 'none') {
        //$jQ(box).fadeIn("slow");
        box.style.display = 'block';
        header.innerHTML = "(hide)";
    }

}

function ignoreConfirmbox() {
    return confirm("Do you really want to ignore all request of this application?");
}

function ignoreGifts(appIndex, option) {
    return function () {
        var ignoreConfirmed = false;
        var acceptCount = 1;
        if (option == 1) { // ignore all
            if (GM_config.get("askbeforeignore")) {
                ignoreConfirmed = ignoreConfirmbox();
            } else {
                ignoreConfirmed = true;
            }
            if (ignoreConfirmed) {
                for (var index = 1; index < Gifts[appIndex].length; index++) { // Begins with index 1
                    if (Gifts[appIndex][index] < 3) {
                        //$jQ('span[id = ' + appIndex + '_' + index + '_link]').fadeOut("slow");
                        //document.getElementById(appIndex + '_' + index + '_ignore').click();
                        //sendRequest(fbIgnoreUrl, fbIgnoreReq + ReqForms[appIndex][giftIndex] + '&post_form_id_source=AsyncRequest');

                        ignoreGift(appIndex, index);
                        

                    }
                }

                //$jQ('span[id = ' + appIndex + '_header]').fadeOut("slow");
                //$jQ('span[id = ' + appIndex + '_box]').fadeOut("slow");

                document.getElementById(appIndex + '_header').style.display = 'none';
                try {
                    document.getElementById(appIndex + '_header_OH').style.display = 'none';
                } catch (e) { }
                document.getElementById(appIndex + '_box').style.display = 'none';
            }
        } else if (option == 0) { // ignore accepted only
            for (var index = 1; index < Gifts[appIndex].length; index++) { // Begins with index 1
                if (Gifts[appIndex][index] == 1) { // ignore gifts only with status 1 (accepted)
                    //document.getElementById(appIndex + '_' + index + '_ignore').click();
                    //sendRequest(fbIgnoreUrl, fbIgnoreReq + ReqForms[appIndex][giftIndex] + '&post_form_id_source=AsyncRequest');
                    ignoreGift(appIndex, index);
                    document.getElementById(appIndex + '_' + index + '_link').style.display = 'none';
                    Gifts[appIndex][index] = 3; // Status ignored
                }
                if (Gifts[appIndex][index] == 3) { // Hide box and header when everthing is accepted
                    acceptCount++;
                    if (acceptCount == Gifts[appIndex].length) { // everything is ignored so hide header and box
                        document.getElementById(appIndex + '_header').style.display = 'none';
                        try {
                            document.getElementById(appIndex + '_header_OH').style.display = 'none';
                        } catch (e) { }
                        document.getElementById(appIndex + '_box').style.display = 'none';
                    }
                }
            }
        }
    }
}

function ignoreGift(appIndex, giftIndex) { // called by autoaccept
    Gifts[appIndex][giftIndex] = 3; // Set status ignored
    try {
        //$jQ('span[id = ' + appIndex + '_' + giftIndex + '_link]').fadeOut("slow");
        document.getElementById(appIndex + '_' + giftIndex + '_link').style.display = 'none';
        //document.getElementById(appIndex + '_' + giftIndex + '_ignore').click();

        sendRequest(fbIgnoreUrl, fbIgnoreReq + ReqForms[appIndex][giftIndex] + '&post_form_id_source=AsyncRequest');

        $jQ('form[id = ' + appIndex + '_' + giftIndex + '_content]').html("Just ignored by Gift Link Creator");

    } catch (e) {
        GM_log("Error in function (ignoreGift): " + e);
    }
    hideIfAllAccepted(appIndex);
}

function acceptAllGifts(appIndex) { // automaticly accept all gifts
    return function () {

        showGifts(appIndex); // Autoshow to see the giftstatus

        for (var gindex = 1; gindex < Adresses[appIndex].length; gindex++) {
            if (Gifts[appIndex][gindex] < 2) { // Find start gift
                acceptGift(appIndex, gindex, Adresses[appIndex][gindex], 1); // 1 asynchon
                break;
            }
        }

    }
}

function acceptGift(appIndex, gindex, urlAdr, mode) { // mode 0 = synchron, 1 = asynchron
    var backgroundColor = "yellow";
    var element;
    var linkelement;

    GM_xmlhttpRequest({
        method: "GET",
        url: urlAdr,
        onload: function (response) {
            // newDoc = response.responseText;

            // mode asynchron
            if (mode == 1) {
                Gifts[appIndex][gindex] = 2;

                for (var gindex = 1; gindex < Adresses[appIndex].length; gindex++) { // find next gift...
                    if (Gifts[appIndex][gindex] < 2) { // Find start gift
                        acceptGift(appIndex, gindex, Adresses[appIndex][gindex], 1); // 1 asynchon
                        break; // break for... next gift found
                    }
                }

            }

        },
        onerror: function (response) {
            //alert("Error: " + response.status);
        },
        onreadystatechange: function (response) {
            switch (response.readyState) {
                case 1:
                    statusText = "loading gift... ";
                    break;
                case 2:
                    statusText = "gift loaded. ";
                    break;
                case 3:
                    statusText = "waiting for the server... ";
                    break;
                case 4:
                    statusText = "gift accepted. ";
                    backgroundColor = "#66FF66";
                    if (mode == 1) {
                        ignoreGift(appIndex, gindex);
                    } else {
                        setTimeout(function (e) {
                            ignoreGift(appIndex, gindex);
                        }, 1500);
                    }

                    break;
                default:
                    statusText = "";
                    break;

            }

            try {
                element = document.getElementById(appIndex + '_' + gindex + '_statustxt');
                element.innerHTML = "Status: " + statusText;
                element.style.display = 'inline';
                element.style.backgroundColor = backgroundColor;

                //document.getElementById(appIndex + '_' + gindex + '_link').removeEventListener();
            } catch (e) {
                GM_log("Error in function (acceptGift): " + e);
            }
        }

    });
}

// New function for Facebook requests like ignoring
function sendRequest(url, params) {

    GM_xmlhttpRequest({
        method: "POST",
        url: url,
        data: params,
        headers: {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-us,en;q=0.5',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'X-SVN-Rev': unsafeWindow.Env.svn_rev
        },
        onload: function (response) {
           // GM_log(response.responseText);
            

            /*
            strTemp = response.responseText;
            i1 = strTemp.indexOf('{');
            oDetails = JSON.parse(strTemp.slice(i1));
            //alert(oDetails.onload.slice(0, 1));
            // eval('(' + oDetails.onload + ')');
            //eval('(' + oDetails.onload.slice(0, 1) + ')');
            splitted = oDetails.onload[0].split(";");
            //  alert(splitted[0]);
              eval('(' + splitted[0] + ')');
            */

            //eval(oDetails.onload.slice(0, 1));
            //eval(response.responseText);
            //}
        },
        onerror: function (response) {

        },

        onreadystatechange: function (response) {

        }
    });
    
}


// Create ApplicationControl
function CreateAppBox() {
    box = '<div id="appbox" style="background-color:' + AppSettings['appColor'] + ';" >'
        + '<h3 class="title">Facebook Gift Link Creator ' + AppSettings['version'] + '</h3>'
        + '<h4 class="appmenu"><a href="' + AppSettings['src'] + '" target="_blank" style="color:blue; cursor:pointer;">-visit scriptpage-</a> '
        + '<span id="settingsButton" style="color:blue; cursor:pointer;">-open settings-</span>'
        + '<span><blink><a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=P6CWZDSYT2GTJ" target="_blank" style="color:blue; cursor:pointer;"> -donate via PayPal-</a></blink></span>'
        + '</h4>'
        + '<br /><span><b>current auto open tab limit: ' + GM_config.get('autoopenlimit') + '</b></span><br />'
        + '<span id="ControlList">'
        + '</span>'
        + '</div><br />';

    if (gameCardMode == 0) {
        $jQ(box).insertBefore("div[id=content] > *");
        //removed: $jQ(box).insertBefore("div[class=UITwoColumnLayout_Content] > *");
    } else {
        $jQ(box).insertBefore("div[id=pagelet_requests] > *");
    }

    try {
        var appSettingsButton = document.getElementById('settingsButton');
        appSettingsButton.addEventListener("click", GM_config.open, false);
    } catch (e) {
        GM_log("GLC Error: settingsbutton not found...");
    }
}

function findApplicationInGC() { // Old version
    var appIndex = 0;
    var giftcount = 0;

    var showHideHTML;
    var ignoreAllHTML;
    var ignoreAcceptedHTML;
    var cssHideStyle;

    var apps;
    var appIcon;
    var appTitle;
    var appName;
    var appInfos;
    var appID = "";
    var groupApp;
    var prevAppID = "";
    var userName;
    var giftMessage;
    var atribName;
    var giftURL;
    var elements;

    
    apps = $jQ('div[id ^= app_]');
    if (apps.length > 0) {
        apps.each(function () {

            // find application ID
            appID = $jQ(this).attr('id'); //8
            appID = appID.split("_");
            appID = appID[1];

            // besser im Array speichern [1++][0++] = [appIndex][infoindex] = 0 = appID .. 1 = Giftcount....
            if (prevAppID != appID) {// new application header if app ID is changed
                appIndex++;
                giftcount = 0;

                Gifts[appIndex] = new Array(); // Storage for our giftsinformation
                Adresses[appIndex] = new Array(); // Storage for our Linkaddresses

                cssHideStyle = "display:none";

                // Show autoaccept if choosen
                if (GM_config.get('showautoaccept')) {
                    if (GM_config.get('filterautoaccept')) {
                        //for (var filterID in autoacceptfilterid) {
                        for (var filterindex = 0; filterindex < autoacceptfilterid.length; filterindex++) {
                            GM_log("Compare current APPID " + appID + " with " + autoacceptfilterid[filterindex]);
                            if (appID == autoacceptfilterid[filterindex]) {
                                cssHideStyle = "";
                                break;
                            }
                        }
                    } else {
                        cssHideStyle = "";
                    }

                }

                // Collect Header information
                appIcon = $jQ('img[class ^= UIImageBlock_]', this);
                appIcon = '<img src="' + $jQ(appIcon).attr('src') + '" />'; // get url from AppIcon and build img element

                appTitle = $jQ("div[class = UIImageBlock_Content UIImageBlock_ICON_Content] a:first", this).text();

                // Build Header
                showHideHTML = '<span id="' + appIndex + '_showHideButton" style="color:blue; cursor:pointer;" >(show)</span>';
                acceptAllHTML = '<span id="' + appIndex + '_acceptAllButton" style="color:green; cursor:pointer;' + cssHideStyle + '" > (accept all gifts)</span>';
                acceptAllHTML_OH = '<span id="' + appIndex + '_acceptAllButton_OH" style="color:green; cursor:pointer;' + cssHideStyle + '" > (accept all gifts)</span>'; // OriginalGameHeader
                openAllHTML = '<span id="' + appIndex + '_openAllButton" style="color:green; cursor:pointer;" > (open all gifts in a tab)</span>';
                openAllHTML_OH = '<span id="' + appIndex + '_openAllButton_OH" style="color:green; cursor:pointer;" > (open all gifts in a tab)</span>'; // OriginalGameHeader
                ignoreAllHTML = '<span id="' + appIndex + '_ignoreAllButton" style="color:red; cursor:pointer;" > (ignore all Gifts)</span>';
                ignoreAllHTML_OH = '<span id="' + appIndex + '_ignoreAllButton_OH" style="color:red; cursor:pointer;" > (ignore all Gifts)</span>'; // OriginalGameHeader
                ignoreAcceptedHTML = '<span id="' + appIndex + '_ignoreAcceptedButton" style="color:blue; cursor:pointer;" >accepted</span>'; // not used anymore
                appTitleHTML = '<span id="appTitle_' + appIndex + '">' + appTitle + '</span>';


                //$jQ('span#ControlList').append('<span id="' + appIndex + '_header"><br /><h4>' + appIcon + ' ' + appTitle + ': ' + showHideHTML + acceptAllHTML + ignoreAllHTML + ' </h4></span>');
                $jQ('span#ControlList').append('<span id="' + appIndex + '_header"><br /><h4>' + appIcon + ' ' + appTitleHTML + ': ' + showHideHTML + acceptAllHTML + openAllHTML + ignoreAllHTML + ' </h4></span>');

                showHide = document.getElementById(appIndex + '_showHideButton');
                showHide.addEventListener("click", showHideGifts(appIndex), false);

                ignoreAllElem = document.getElementById(appIndex + '_ignoreAllButton');
                ignoreAllElem.addEventListener("click", ignoreGifts(appIndex, 1), false); // 1 for all

                acceptAllElem = document.getElementById(appIndex + '_acceptAllButton');
                acceptAllElem.addEventListener("click", acceptAllGifts(appIndex), false);

                openAllElem = document.getElementById(appIndex + '_openAllButton');
                openAllElem.addEventListener("click", openAllGifts(appIndex), false);
                // End build header

                // open giftbox
                $jQ('span#ControlList').append('<div id="' + appIndex + '_box" style="height:auto; max-height:200px; overflow:auto; display:none" >'); // Add a Div around the collection

            }

            // Collect gifts information
            giftcount++;

            Gifts[appIndex][giftcount] = 0;

            $jQ(this).css('background-color', AppSettings['foundGiftColor']);

            userName = $jQ("div[class = UIImageBlock_Content UIImageBlock_SMALL_Content] a:first", this).text(); // Get gift sender...

            $jQ('span[id = appTitle_' + (appIndex) + ']').text(appTitle + ' (' + giftcount + ')');

            giftMessage = "";

            // Input buttons
            input = $jQ('input', this);

            input.each(function () { // get buttons
                atribName = $jQ(this).attr('name');
                if (atribName.match("reject")) {   // Set ID for ignorebutton that we can access it later.

                    $jQ(this).attr('id', appIndex + '_' + giftcount + '_ignore');

                }
                if (atribName.match("http")) { //apps
                    giftURL = atribName.replace('actions[', '');
                    giftURL = giftURL.replace(']', '');
                    text = $jQ('span#ControlList').text();

                    statustexthtml = '<span id="' + appIndex + '_' + giftcount + '_statustxt" style="display:none"></span>';
                    $jQ('div#' + appIndex + '_box').append('<span id="' + appIndex + '_' + giftcount + '_link" style="color:blue; cursor:pointer;" ><br />Request ' + giftcount + ' from ' + userName + giftMessage + ' ' + statustexthtml + '<br /></span>');
                    giftlink = document.getElementById(appIndex + '_' + giftcount + '_link');

                    giftlink.addEventListener("click", openLinkInNewTab(appIndex, giftcount, giftURL, giftlink, $jQ(this)), false);

                    Adresses[appIndex][giftcount] = giftURL; // save gift url

                }
            }); // end input.each

            // end collect gift informations



            if (prevAppID != appID) {
                $jQ('span#ControlList').append('</div>'); // close giftbox
            }

            prevAppID = appID; // remember last app ID
        });
    }

}

function findApplicationInGC_NEW() { // Old version
    var appIndex = 0;
    var giftcount = 0;

    var showHideHTML;
    var ignoreAllHTML;
    var ignoreAcceptedHTML;
    var cssHideStyle;

    var apps;
    var appIcon;
    var appTitle;
    var appName;
    var appInfos;
    var appID = "";
    var groupApp;
    var prevAppID = "";
    var userName;
    var giftMessage;
    var atribName;
    var giftURL;
    var elements;

    var dashboard;


    //apps = $jQ('div[id ^= app_]');
    dashboard = $jQ('div[class = apps_dashboard]')

    apps = $jQ('form', dashboard);
    if (apps.length > 0) {
        apps.each(function () {

            // find application ID
            //appID = $jQ(this).attr('id'); //8
            appID = $jQ('div[id ^= app_]', this).attr('id'); //8
            appID = appID.split("_");
            appID = appID[1];

            // besser im Array speichern [1++][0++] = [appIndex][infoindex] = 0 = appID .. 1 = Giftcount....
            if (prevAppID != appID) {// new application header if app ID is changed
                appIndex++;
                giftcount = 0;

                Gifts[appIndex] = new Array(); // Storage for our giftsinformation
                Adresses[appIndex] = new Array(); // Storage for our Linkaddresses
                ReqForms[appIndex] = new Array(); // Storage for our Requestformdatas

                cssHideStyle = "display:none";

                // Show autoaccept if choosen
                if (GM_config.get('showautoaccept')) {
                    if (GM_config.get('filterautoaccept')) {
                        //for (var filterID in autoacceptfilterid) {
                        for (var filterindex = 0; filterindex < autoacceptfilterid.length; filterindex++) {
                            GM_log("Compare current APPID " + appID + " with " + autoacceptfilterid[filterindex]);
                            if (appID == autoacceptfilterid[filterindex]) {
                                cssHideStyle = "";
                                break;
                            }
                        }
                    } else {
                        cssHideStyle = "";
                    }

                }

                // Collect Header information
                appIcon = $jQ('img[class ^= UIImageBlock_]', this);
                appIcon = '<img src="' + $jQ(appIcon).attr('src') + '" />'; // get url from AppIcon and build img element

                //appTitle = $jQ("div[class = UIImageBlock_Content UIImageBlock_ICON_Content] a:first", this).text();


                appTitle = $jQ("div[class = streamStyleRequestTitle] a:eq(1)", this).text();

                // Build Header
                showHideHTML = '<span id="' + appIndex + '_showHideButton" style="color:blue; cursor:pointer;" >(show)</span>';
                acceptAllHTML = '<span id="' + appIndex + '_acceptAllButton" style="color:green; cursor:pointer;' + cssHideStyle + '" > (accept all gifts)</span>';
                acceptAllHTML_OH = '<span id="' + appIndex + '_acceptAllButton_OH" style="color:green; cursor:pointer;' + cssHideStyle + '" > (accept all gifts)</span>'; // OriginalGameHeader
                openAllHTML = '<span id="' + appIndex + '_openAllButton" style="color:green; cursor:pointer;" > (open all gifts in a tab)</span>';
                openAllHTML_OH = '<span id="' + appIndex + '_openAllButton_OH" style="color:green; cursor:pointer;" > (open all gifts in a tab)</span>'; // OriginalGameHeader
                ignoreAllHTML = '<span id="' + appIndex + '_ignoreAllButton" style="color:red; cursor:pointer;" > (ignore all Gifts)</span>';
                ignoreAllHTML_OH = '<span id="' + appIndex + '_ignoreAllButton_OH" style="color:red; cursor:pointer;" > (ignore all Gifts)</span>'; // OriginalGameHeader
                ignoreAcceptedHTML = '<span id="' + appIndex + '_ignoreAcceptedButton" style="color:blue; cursor:pointer;" >accepted</span>'; // not used anymore
                appTitleHTML = '<span id="appTitle_' + appIndex + '">' + appTitle + '</span>';


                //$jQ('span#ControlList').append('<span id="' + appIndex + '_header"><br /><h4>' + appIcon + ' ' + appTitle + ': ' + showHideHTML + acceptAllHTML + ignoreAllHTML + ' </h4></span>');
                $jQ('span#ControlList').append('<span id="' + appIndex + '_header"><br /><h4>' + appIcon + ' ' + appTitleHTML + ': ' + showHideHTML + acceptAllHTML + openAllHTML + ignoreAllHTML + ' </h4></span>');

                showHide = document.getElementById(appIndex + '_showHideButton');
                showHide.addEventListener("click", showHideGifts(appIndex), false);

                ignoreAllElem = document.getElementById(appIndex + '_ignoreAllButton');
                ignoreAllElem.addEventListener("click", ignoreGifts(appIndex, 1), false); // 1 for all

                acceptAllElem = document.getElementById(appIndex + '_acceptAllButton');
                acceptAllElem.addEventListener("click", acceptAllGifts(appIndex), false);

                openAllElem = document.getElementById(appIndex + '_openAllButton');
                openAllElem.addEventListener("click", openAllGifts(appIndex), false);
                // End build header

                // open giftbox
                $jQ('span#ControlList').append('<div id="' + appIndex + '_box" style="height:auto; max-height:200px; overflow:auto; display:none" >'); // Add a Div around the collection

            }

            // Collect gifts information
            giftcount++;

            Gifts[appIndex][giftcount] = 0;
            ReqForms[appIndex][giftcount] = "";

            $jQ(this).attr('id', appIndex + '_' + giftcount + '_content');

            $jQ(this).css('background-color', AppSettings['foundGiftColor']);

            userName = $jQ("div[class = UIImageBlock_Content UIImageBlock_SMALL_Content] a:first", this).text(); // Get gift sender...

            $jQ('span[id = appTitle_' + (appIndex) + ']').text(appTitle + ' (' + giftcount + ')');

            giftMessage = "";

            // Input buttons
            input = $jQ('input', this);

            input.each(function () { // get buttons
                atribName = $jQ(this).attr('name');
                attribValue = $jQ(this).attr('value');

                if (atribName.match("http")) { //apps
                    giftURL = atribName.replace('actions[', '');
                    giftURL = giftURL.replace(']', '');
                    text = $jQ('span#ControlList').text();

                    statustexthtml = '<span id="' + appIndex + '_' + giftcount + '_statustxt" style="display:none"></span>';
                    $jQ('div#' + appIndex + '_box').append('<span id="' + appIndex + '_' + giftcount + '_link" style="color:blue; cursor:pointer;" ><br />Request ' + giftcount + ' from ' + userName + giftMessage + ' ' + statustexthtml + '<br /></span>');
                    giftlink = document.getElementById(appIndex + '_' + giftcount + '_link');

                    giftlink.addEventListener("click", openLinkInNewTab(appIndex, giftcount, giftURL, giftlink, $jQ(this)), false);

                    Adresses[appIndex][giftcount] = giftURL; // save gift url

                } else { // collect information from rest input fields
                    //alert("Name: " + atribName + " Value: " + attribValue);

                    ReqForms[appIndex][giftcount] += "&" + atribName + '=' + attribValue;
                }
            }); // end input.each


            // end collect gift informations



            if (prevAppID != appID) {
                $jQ('span#ControlList').append('</div>'); // close giftbox
            }

            prevAppID = appID; // remember last app ID
        });
    }

}

function findApplicationNewFB() {
    var appIndex = 0;
    var giftcount = 0;

    var showHideHTML;
    var ignoreAllHTML;
    var ignoreAcceptedHTML;
    var cssHideStyle;

    var apps;
    var appIcon;
    var appTitle;
    var appName;
    var appInfos;
    var appID = "";
    var groupApp;
    var prevAppID = "";
    var userName;
    var giftMessage;
    var atribName;
    var giftURL;
    var elements;

    apps = $jQ('div[class = mbl]');
    if (apps.length > 0) {
        apps.each(function () { // run through each div element from current app

            appID = $jQ('div[id ^= confirm_]', this).attr('id'); //8
            try {
                appID = appID.substr(8, appID.length);
            } catch (e) {
                appID = '';
                GM_log("Aplication ID not found...");
            }

            if ($jQ('div[id = hidden_requests]', this).length > 0) {
                GM_log("skip hidden request...");
                return;
            }


            // App & Giftcounter
            appIndex++;
            giftcount = 0;

            Gifts[appIndex] = new Array(); // Storage for our giftsinformation
            Adresses[appIndex] = new Array(); // Storage for our Linkaddresses
            ReqForms[appIndex] = new Array(); // Storage for our Requestformdatas



            // Collect Header information
            appIcon = $jQ('img[class ^= UIImageBlock_]', this);
            appIcon = '<img src="' + $jQ(appIcon).attr('src') + '" />'; // get url from AppIcon and build img element

            appTitleElement = $jQ('h3[class = uiHeaderTitle]', this);
            appTitle = appTitleElement.text();





            cssHideStyle = "display:none";

            // Show autoaccept if choosen
            if (GM_config.get('showautoaccept')) {
                if (GM_config.get('filterautoaccept')) {
                    //for (var filterID in autoacceptfilterid) {
                    for (var filterindex = 0; filterindex < autoacceptfilterid.length; filterindex++) {
                        GM_log("Compare current APPID " + appID + " with " + autoacceptfilterid[filterindex]);
                        if (appID == autoacceptfilterid[filterindex]) {
                            cssHideStyle = "";
                            break;
                        }
                    }
                } else {
                    cssHideStyle = "";
                }

            }



            // Build Header
            showHideHTML = '<span id="' + appIndex + '_showHideButton" style="color:blue; cursor:pointer;" >(show)</span>';
            acceptAllHTML = '<span id="' + appIndex + '_acceptAllButton" style="color:green; cursor:pointer;' + cssHideStyle + '" > (accept all gifts)</span>';
            acceptAllHTML_OH = '<span id="' + appIndex + '_acceptAllButton_OH" style="color:green; cursor:pointer;' + cssHideStyle + '" > (accept all gifts)</span>'; // OriginalGameHeader
            openAllHTML = '<span id="' + appIndex + '_openAllButton" style="color:green; cursor:pointer;" > (open all gifts in a tab)</span>';
            openAllHTML_OH = '<span id="' + appIndex + '_openAllButton_OH" style="color:green; cursor:pointer;" > (open all gifts in a tab)</span>'; // OriginalGameHeader
            ignoreAllHTML = '<span id="' + appIndex + '_ignoreAllButton" style="color:red; cursor:pointer;" > (ignore all Gifts)</span>';
            ignoreAllHTML_OH = '<span id="' + appIndex + '_ignoreAllButton_OH" style="color:red; cursor:pointer;" > (ignore all Gifts)</span>'; // OriginalGameHeader
            ignoreAcceptedHTML = '<span id="' + appIndex + '_ignoreAcceptedButton" style="color:blue; cursor:pointer;" >accepted</span>'; // not used anymore
            appTitleHTML = '<span id="appTitle_' + appIndex + '">' + appTitle + '</span>';


            //$jQ('span#ControlList').append('<span id="' + appIndex + '_header"><br /><h4>' + appIcon + ' ' + appTitle + ': ' + showHideHTML + acceptAllHTML + ignoreAllHTML + ' </h4></span>');
            $jQ('span#ControlList').append('<span id="' + appIndex + '_header"><br /><h4>' + appIcon + ' ' + appTitleHTML + ': ' + showHideHTML + acceptAllHTML + openAllHTML + ignoreAllHTML + ' </h4></span>');

            showHide = document.getElementById(appIndex + '_showHideButton');
            showHide.addEventListener("click", showHideGifts(appIndex), false);

            ignoreAllElem = document.getElementById(appIndex + '_ignoreAllButton');
            ignoreAllElem.addEventListener("click", ignoreGifts(appIndex, 1), false); // 1 for all

            acceptAllElem = document.getElementById(appIndex + '_acceptAllButton');
            acceptAllElem.addEventListener("click", acceptAllGifts(appIndex), false);

            openAllElem = document.getElementById(appIndex + '_openAllButton');
            openAllElem.addEventListener("click", openAllGifts(appIndex), false);
            // End build header

            try {
                // Add buttons on original header
                $jQ(appTitleElement).append('<span id="' + appIndex + '_header_OH"><h4>' + acceptAllHTML_OH + openAllHTML_OH + ignoreAllHTML_OH + ' </h4></span>');

                ignoreAllElem = document.getElementById(appIndex + '_ignoreAllButton_OH');
                ignoreAllElem.addEventListener("click", ignoreGifts(appIndex, 1), false); // 1 for all

                acceptAllElem = document.getElementById(appIndex + '_acceptAllButton_OH');
                acceptAllElem.addEventListener("click", acceptAllGifts(appIndex), false);

                openAllElem = document.getElementById(appIndex + '_openAllButton_OH');
                openAllElem.addEventListener("click", openAllGifts(appIndex), false);
            } catch (e) { }

            // open giftbox
            $jQ('span#ControlList').append('<div id="' + appIndex + '_box" style="height:auto; max-height:200px; overflow:auto; display:none" >'); // Add a Div around the collection


            // Collect gift information from current app
            appInfos = $jQ('div[id ^= app_]', this);
            if (appInfos.length > 0) {
                appInfos.each(function () { // run through each div element from current app

                    giftcount++;
                    $jQ(this).css('background-color', AppSettings['foundGiftColor']);

                    // Set Giftstatus gift is not accepted yet
                    Gifts[appIndex][giftcount] = 0;

                    $jQ('span[id = appTitle_' + (appIndex) + ']').text(appTitle + ' (' + giftcount + ')');

                    userName = $jQ("div[class ^= UIImageBlock_Content] a:first", this).text();

                    giftMessage = $jQ('div[id = personal_msg]', this).html(); // get message from gift // not supported anymore from facebook maybe a bug
                    if (giftMessage != '' && giftMessage != null) { // Check if message is empty
                        giftMessage = " (Gift comment: " + giftMessage + ")";
                    } else {
                        giftMessage = "";
                    }

                    // Input buttons
                    input = $jQ('input', this);


                    input.each(function () { // get buttons
                        atribName = $jQ(this).attr('name');
                        if (atribName.match("reject")) {   // Set ID for ignorebutton that we can access it later.

                            $jQ(this).attr('id', appIndex + '_' + giftcount + '_ignore');

                        }
                        if (atribName.match("http")) { //apps
                            giftURL = atribName.replace('actions[', '');
                            giftURL = giftURL.replace(']', '');
                            text = $jQ('span#ControlList').text();

                            statustexthtml = '<span id="' + appIndex + '_' + giftcount + '_statustxt" style="display:none"></span>';
                            $jQ('div#' + appIndex + '_box').append('<span id="' + appIndex + '_' + giftcount + '_link" style="color:blue; cursor:pointer;" ><br />Request ' + giftcount + ' from ' + userName + giftMessage + ' ' + statustexthtml + '<br /></span>');
                            giftlink = document.getElementById(appIndex + '_' + giftcount + '_link');

                            giftlink.addEventListener("click", openLinkInNewTab(appIndex, giftcount, giftURL, giftlink, $jQ(this)), false);

                            Adresses[appIndex][giftcount] = giftURL; // save gift url

                        }
                    }); // end input.each

                    // Ignore buttons
                    ignoremenu = $jQ('a[class ^= uiRequestCloseSelectorButton]', this);
                    $jQ(ignoremenu).attr('id', appIndex + '_' + giftcount + '_menu')

                    //   ignorebutton = $jQ('a[class ^= uiRequestCloseSelectorButton]', this); // works
                    //   $jQ(ignorebutton).attr('id', appIndex + '_' + giftcount + '_ignore') // works

                    //$jQ(ignoremenu).attr('id', appIndex + '_' + giftcount + '_menu')

                    //ignorebutton = $jQ('span[class = itemLabel fsm]', this);
                    //ignorebutton = $jQ('li[class = uiMenuItem]:first', this);
                    ignorebutton = $jQ('li[class= uiMenuItem uiMenuItemRadio uiSelectorOption] a:first', this)
                    $jQ(ignorebutton).attr('id', appIndex + '_' + giftcount + '_ignore')


                    //alert("Found ignore " + ignorebutton.length)

                    //atribRel = $jQ(this).attr('rel');
                    //if (atribRel.match("ignore")) { // nicht in input!!!
                    //    alert("ignorebutton");
                    //}


                }); // end appInfos.each(function ()
            } // end if (appInfos.length > 0)







        });                      // end appInfos.each(function ()
    } // end if (appInfos.length > 0)

    // End collect gift information from current app
}


function findApplicationNewFB_NEW() {
    var appIndex = 0;
    var giftcount = 0;

    var showHideHTML;
    var ignoreAllHTML;
    var ignoreAcceptedHTML;
    var cssHideStyle;

    var apps;
    var appIcon;
    var appTitle;
    var appName;
    var appInfos;
    var appID = "";
    var groupApp;
    var prevAppID = "";
    var userName;
    var giftMessage;
    var atribName;
    var giftURL;
    var elements;

    apps = $jQ('div[class = mbl]');
    if (apps.length > 0) {
        apps.each(function () { // run through each div element from current app

            appID = $jQ('div[id ^= confirm_]', this).attr('id'); //8
            try {
                appID = appID.substr(8, appID.length);
            } catch (e) {
                appID = '';
                GM_log("Aplication ID not found...");
            }

            if ($jQ('div[id = hidden_requests]', this).length > 0) {
                GM_log("skip hidden request...");
                return;
            }


            // App & Giftcounter
            appIndex++;
            giftcount = 0;

            Gifts[appIndex] = new Array(); // Storage for our giftsinformation
            Adresses[appIndex] = new Array(); // Storage for our Linkaddresses
            ReqForms[appIndex] = new Array(); // Storage for our Requestformdatas



            // Collect Header information
            appIcon = $jQ('img[class ^= UIImageBlock_]', this);
            appIcon = '<img src="' + $jQ(appIcon).attr('src') + '" />'; // get url from AppIcon and build img element

            appTitleElement = $jQ('h3[class = uiHeaderTitle]', this);
            appTitle = appTitleElement.text();





            cssHideStyle = "display:none";

            // Show autoaccept if choosen
            if (GM_config.get('showautoaccept')) {
                if (GM_config.get('filterautoaccept')) {
                    //for (var filterID in autoacceptfilterid) {
                    for (var filterindex = 0; filterindex < autoacceptfilterid.length; filterindex++) {
                        GM_log("Compare current APPID " + appID + " with " + autoacceptfilterid[filterindex]);
                        if (appID == autoacceptfilterid[filterindex]) {
                            cssHideStyle = "";
                            break;
                        }
                    }
                } else {
                    cssHideStyle = "";
                }

            }



            // Build Header
            showHideHTML = '<span id="' + appIndex + '_showHideButton" style="color:blue; cursor:pointer;" >(show)</span>';
            acceptAllHTML = '<span id="' + appIndex + '_acceptAllButton" style="color:green; cursor:pointer;' + cssHideStyle + '" > (accept all gifts)</span>';
            acceptAllHTML_OH = '<span id="' + appIndex + '_acceptAllButton_OH" style="color:green; cursor:pointer;' + cssHideStyle + '" > (accept all gifts)</span>'; // OriginalGameHeader
            openAllHTML = '<span id="' + appIndex + '_openAllButton" style="color:green; cursor:pointer;" > (open all gifts in a tab)</span>';
            openAllHTML_OH = '<span id="' + appIndex + '_openAllButton_OH" style="color:green; cursor:pointer;" > (open all gifts in a tab)</span>'; // OriginalGameHeader
            ignoreAllHTML = '<span id="' + appIndex + '_ignoreAllButton" style="color:red; cursor:pointer;" > (ignore all Gifts)</span>';
            ignoreAllHTML_OH = '<span id="' + appIndex + '_ignoreAllButton_OH" style="color:red; cursor:pointer;" > (ignore all Gifts)</span>'; // OriginalGameHeader
            ignoreAcceptedHTML = '<span id="' + appIndex + '_ignoreAcceptedButton" style="color:blue; cursor:pointer;" >accepted</span>'; // not used anymore
            appTitleHTML = '<span id="appTitle_' + appIndex + '">' + appTitle + '</span>';


            //$jQ('span#ControlList').append('<span id="' + appIndex + '_header"><br /><h4>' + appIcon + ' ' + appTitle + ': ' + showHideHTML + acceptAllHTML + ignoreAllHTML + ' </h4></span>');
            $jQ('span#ControlList').append('<span id="' + appIndex + '_header"><br /><h4>' + appIcon + ' ' + appTitleHTML + ': ' + showHideHTML + acceptAllHTML + openAllHTML + ignoreAllHTML + ' </h4></span>');

            showHide = document.getElementById(appIndex + '_showHideButton');
            showHide.addEventListener("click", showHideGifts(appIndex), false);

            ignoreAllElem = document.getElementById(appIndex + '_ignoreAllButton');
            ignoreAllElem.addEventListener("click", ignoreGifts(appIndex, 1), false); // 1 for all

            acceptAllElem = document.getElementById(appIndex + '_acceptAllButton');
            acceptAllElem.addEventListener("click", acceptAllGifts(appIndex), false);

            openAllElem = document.getElementById(appIndex + '_openAllButton');
            openAllElem.addEventListener("click", openAllGifts(appIndex), false);
            // End build header

            try {
                // Add buttons on original header
                $jQ(appTitleElement).append('<span id="' + appIndex + '_header_OH"><h4>' + acceptAllHTML_OH + openAllHTML_OH + ignoreAllHTML_OH + ' </h4></span>');

                ignoreAllElem = document.getElementById(appIndex + '_ignoreAllButton_OH');
                ignoreAllElem.addEventListener("click", ignoreGifts(appIndex, 1), false); // 1 for all

                acceptAllElem = document.getElementById(appIndex + '_acceptAllButton_OH');
                acceptAllElem.addEventListener("click", acceptAllGifts(appIndex), false);

                openAllElem = document.getElementById(appIndex + '_openAllButton_OH');
                openAllElem.addEventListener("click", openAllGifts(appIndex), false);
            } catch (e) { }

            // open giftbox
            $jQ('span#ControlList').append('<div id="' + appIndex + '_box" style="height:auto; max-height:200px; overflow:auto; display:none" >'); // Add a Div around the collection


            // Collect gift information from current app
            //  appInfos = $jQ('div[id ^= app_]', this);
            //class="pbm uiListItem uiListMedium uiListVerticalItemBorder"
            //appInfos = $jQ('li[class ^= uiListMedium uiListVerticalItemBorder]', this);
            appInfos = $jQ('form', this);
            if (appInfos.length > 0) {
                appInfos.each(function () { // run through each div element from current app

                    giftcount++;
                    $jQ(this).attr('id', appIndex + '_' + giftcount + '_content');

                    $jQ(this).css('background-color', AppSettings['foundGiftColor']);

                    // Set Giftstatus gift is not accepted yet
                    Gifts[appIndex][giftcount] = 0;
                    ReqForms[appIndex][giftcount] = "";

                    $jQ('span[id = appTitle_' + (appIndex) + ']').text(appTitle + ' (' + giftcount + ')');

                    userName = $jQ("div[class ^= UIImageBlock_Content] a:first", this).text();

                    giftMessage = $jQ('div[id = personal_msg]', this).html(); // get message from gift // not supported anymore from facebook maybe a bug
                    if (giftMessage != '' && giftMessage != null) { // Check if message is empty
                        giftMessage = " (Gift comment: " + giftMessage + ")";
                    } else {
                        giftMessage = "";
                    }

                    // Input buttons
                    input = $jQ('input', this);

                    input.each(function () { // get input informations
                        atribName = $jQ(this).attr('name');
                        attribValue = $jQ(this).attr('value');


                        // Requestform information
                        //charset_test
                        //name="post_form_id"
                        //name = "fb_dtsg"
                        //name = "id"
                        //name = "id"

                        /* Part not working anymore
                        if (atribName.match("reject")) {   // Set ID for ignorebutton that we can access it later.

                        $jQ(this).attr('id', appIndex + '_' + giftcount + '_ignore');

                        }*/

                        if (atribName.match("http")) { //apps
                            giftURL = atribName.replace('actions[', '');
                            giftURL = giftURL.replace(']', '');
                            text = $jQ('span#ControlList').text();

                            statustexthtml = '<span id="' + appIndex + '_' + giftcount + '_statustxt" style="display:none"></span>';
                            $jQ('div#' + appIndex + '_box').append('<span id="' + appIndex + '_' + giftcount + '_link" style="color:blue; cursor:pointer;" ><br />Request ' + giftcount + ' from ' + userName + giftMessage + ' ' + statustexthtml + '<br /></span>');
                            giftlink = document.getElementById(appIndex + '_' + giftcount + '_link');

                            giftlink.addEventListener("click", openLinkInNewTab(appIndex, giftcount, giftURL, giftlink, $jQ(this)), false);

                            Adresses[appIndex][giftcount] = giftURL; // save gift url

                        }
                        else { // collect information from rest input fields
                            //alert("Name: " + atribName + " Value: " + attribValue);
                            ReqForms[appIndex][giftcount] += "&" + atribName + '=' + attribValue;
                        }
                    }); // end input.each


                    // Ignore buttons
                    ignoremenu = $jQ('a[class ^= uiRequestCloseSelectorButton]', this);
                    $jQ(ignoremenu).attr('id', appIndex + '_' + giftcount + '_menu')

                    //   ignorebutton = $jQ('a[class ^= uiRequestCloseSelectorButton]', this); // works
                    //   $jQ(ignorebutton).attr('id', appIndex + '_' + giftcount + '_ignore') // works

                    //$jQ(ignoremenu).attr('id', appIndex + '_' + giftcount + '_menu')

                    //ignorebutton = $jQ('span[class = itemLabel fsm]', this);
                    //ignorebutton = $jQ('li[class = uiMenuItem]:first', this);
                    ignorebutton = $jQ('li[class= uiMenuItem uiMenuItemRadio uiSelectorOption] a:first', this)
                    $jQ(ignorebutton).attr('id', appIndex + '_' + giftcount + '_ignore')


                    //alert("Found ignore " + ignorebutton.length)

                    //atribRel = $jQ(this).attr('rel');
                    //if (atribRel.match("ignore")) { // nicht in input!!!
                    //    alert("ignorebutton");
                    //}


                }); // end appInfos.each(function ()
            } // end if (appInfos.length > 0)







        });                             // end appInfos.each(function ()
    } // end if (appInfos.length > 0)

    // End collect gift information from current app
} // END findApplicationNewFB_NEW()


/// find Application
function findApplication() {
    var appIndex = 0;
    var giftcount = 0;

    var showHideHTML;
    var ignoreAllHTML;
    var ignoreAcceptedHTML;
    var cssHideStyle;

    var apps;
    var appIcon;
    var appTitle;
    var appName;
    var appInfos;
    var appID = "";
    var groupApp;
    var prevAppID = "";
    var userName;
    var giftMessage;
    var atribName;
    var giftURL;
    var elements;

    apps = $jQ('div[id ^= confirm_][class = confirm_boxes]');
    if (apps.length > 0) {
        apps.each(function () { // run through each div element from current app

            // Collect Header information
            appIcon = $jQ('img[class ^= UIImageBlock_]', this);
            appIcon = '<img src="' + $jQ(appIcon).attr('src') + '" />'; // get url from AppIcon and build img element

            appTitle = $jQ('span[id ^= app]', this);
            appTitle = appTitle.text();
            appTitle = appTitle.substr(0, appTitle.length - 1); // remove last char from text

            appID = $jQ(this).attr('id'); //8
            appID = appID.substr(8, appID.length - 10);

            if (prevAppID == appID && GM_config.get('groupapps')) {
                groupApp = true;
            } else {
                groupApp = false;
            }

            // Show autoaccept if choosen
            if (GM_config.get('showautoaccept')) { // Hide beta buttons
                cssHideStyle = "";
            } else {
                cssHideStyle = "display:none";
            }

            if (!groupApp) {// new application header
                appIndex++;
                giftcount = 0;

                Gifts[appIndex] = new Array(); // Storage for our giftsinformation
                Adresses[appIndex] = new Array(); // Storage for our Linkaddresses

                // Build Header
                showHideHTML = '<span id="' + appIndex + '_showHideButton" style="color:blue; cursor:pointer;" >(show)</span>';
                acceptAllHTML = '<span id="' + appIndex + '_acceptAllButton" style="color:green; cursor:pointer;' + cssHideStyle + '" > (accept all Gifts)</span>';
                ignoreAllHTML = '<span id="' + appIndex + '_ignoreAllButton" style="color:red; cursor:pointer;" > (ignore all Gifts)</span>';
                ignoreAcceptedHTML = '<span id="' + appIndex + '_ignoreAcceptedButton" style="color:blue; cursor:pointer;" >accepted</span>'; // not used anymore
                appTitleHTML = '<span id="appTitle_' + appIndex + '">' + appTitle + '</span>';

                //$jQ('span#ControlList').append('<span id="' + appIndex + '_header"><br /><h4>' + appIcon + ' ' + appTitle + ': ' + showHideHTML + acceptAllHTML + ignoreAllHTML + ' </h4></span>');
                $jQ('span#ControlList').append('<span id="' + appIndex + '_header"><br /><h4>' + appIcon + ' ' + appTitleHTML + ': ' + showHideHTML + acceptAllHTML + ignoreAllHTML + ' </h4></span>');

                showHide = document.getElementById(appIndex + '_showHideButton');
                showHide.addEventListener("click", showHideGifts(appIndex), false);

                ignoreAllElem = document.getElementById(appIndex + '_ignoreAllButton');
                ignoreAllElem.addEventListener("click", ignoreGifts(appIndex, 1), false); // 1 for all

                acceptAllElem = document.getElementById(appIndex + '_acceptAllButton');
                acceptAllElem.addEventListener("click", acceptAllGifts(appIndex), false);
                // End build header

                // open giftbox
                $jQ('span#ControlList').append('<div id="' + appIndex + '_box" style="height:auto; max-height:200px; overflow:auto; display:none" >'); // Add a Div around the collection
            } // App group

            // Collect gift information from current app
            appInfos = $jQ('td[class = info]', this);
            if (appInfos.length > 0) {
                appInfos.each(function () { // run through each div element from current app

                    giftcount++;
                    $jQ(this).css('background-color', AppSettings['foundGiftColor']);

                    // Set Giftstatus gift is not accepted yet
                    Gifts[appIndex][giftcount] = 0;

                    userName = $jQ("a:first", this).text(); // get name from first element

                    elements = $jQ('a', this);
                    var count = 0;
                    elements.each(function () { // found no way to select the second element. Sorry....
                        count++;
                        if (count == 2) {
                            appName = $jQ(this).text();
                        }
                    });

                    if (GM_config.get('groupapps')) { // override applicationname in goupmode
                        $jQ('span[id = appTitle_' + (appIndex) + ']').text(appName + ' (' + giftcount + ')');
                    }


                    giftMessage = $jQ('div[id = personal_msg]', this).html(); // get message from gift
                    if (giftMessage != '') { // Check if message is empty
                        giftMessage = " (Gift comment: " + giftMessage + ")";
                    }
                    

                    // Input buttons
                    input = $jQ('input[class = inputbutton]', this);
                    input.each(function () { // get buttons
                        

                        atribName = $jQ(this).attr('name');
                        
                        if (atribName.match("reject")) {   // Set ID for ignorebutton that we can access it later.

                            $jQ(this).attr('id', appIndex + '_' + giftcount + '_ignore');

                        }


                        if (atribName.match("http")) { //apps
                            
                            giftURL = atribName.replace('actions[', '');
                            giftURL = giftURL.replace(']', '');
                            text = $jQ('span#ControlList').text();

                            statustexthtml = '<span id="' + appIndex + '_' + giftcount + '_statustxt" style="display:none"></span>';
                            $jQ('div#' + appIndex + '_box').append('<span id="' + appIndex + '_' + giftcount + '_link" style="color:blue; cursor:pointer;" ><br />Request ' + giftcount + ' from ' + userName + giftMessage + ' ' + statustexthtml + '<br /></span>');
                            giftlink = document.getElementById(appIndex + '_' + giftcount + '_link');

                            giftlink.addEventListener("click", openLinkInNewTab(appIndex, giftcount, giftURL, giftlink, $jQ(this)), false);

                            Adresses[appIndex][giftcount] = giftURL; // save gift url

                            

                        }
                    }); // end input.each




                }); // end appInfos.each(function ()
            } // end if (appInfos.length > 0)

            // End collect gift information from current app

            if (!groupApp) {
                $jQ('span#ControlList').append('</div>'); // close giftbox
            }

            prevAppID = appID; // remember last app ID

        });    // end: apps.each
    } // apps.length > 0
} // end function findApplication
/// end Autodetection

// Array
var Gifts = new Array();
var Adresses = new Array();
var ReqForms = new Array();





// Startup function
function Start() {
    window.scroll(0, 0); // scroll to the top

    
    if (location.href.match("games")) {
        gameCardMode = 1;
    }

    CreateAppBox();

    if (gameCardMode == 0) {
        findApplicationNewFB_NEW();
    } else {
        findApplicationInGC_NEW();
    }
    //findApplication();
}





// initialize JQuery
function InitJQuery() {
    if (typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(InitJQuery, 100); }
    else { jQuery = unsafeWindow.jQuery; $jQ = jQuery.noConflict(true); Start(); }
}

if (location.href.match("reqs.php") || location.href.match("games?")) {
    
    AddJQScript();
    InitJQuery();
   
}

// Script end

