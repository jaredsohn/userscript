// ==UserScript==
// @name            Send damage Report LU
// @namespace       lu.erepublik.com
// @version         1.6
// @description     Sends report damage for fight
// @match           http://www.erepublik.com/*/military/battlefield/*
// @copyright       2012+, Pr0
// @downloadURL	    http://userscripts.org/scripts/source/158787.user.js
// @updateURL       http://userscripts.org/scripts/source/158787.meta.js
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// ==/UserScript==

var scriptName = 'Send damage report LU Updates';
var scriptId = '158787';
var scriptVersion = 6;
var scriptUpdateText = 'Extract nickname fixed.';

GM_log("jQuery version : " + jQuery().jquery);

function addButton() {
    $(".battle_stats .top h3").append("<span id='send-damage'>Send DMG</span>");
}


function lateStart() {
    if (typeof unsafeWindow.jQuery == 'undefined') {
        GM_log("jQuery was undefined... late start.");
        unsafeWindow.setTimeout(startup, 1000);
    } else {
        GM_log("Setting $ as jQuery...");
        $ = unsafeWindow.jQuery;
        startup();
    }
}

function createAndStyleButton() {
    var $sendButton = $("#send-damage");
    $sendButton.css("float", "right")
        .css("color", "orange")
        .css("border-radius", "5px")
        .css("background", "black")
        .css("width", "85px")
        .css("position", "absolute")
        .css("top", "25px")
        .css("left", "15px")
        .css("font-size", "14px")
        .css("line-height", "25px")
        .css("cursor", "pointer");
    return $sendButton;
}

function sendDamage($sendButton, name, profile, damage, day, battle, donateLink) {
    var formUrl='https://docs.google.com/spreadsheet/formResponse?formkey=dG4xakhkNnhmckZVN21xUWxIcnJyOVE6MQ';
    $.post(formUrl,
        {
            'entry.0.single': name,
            'entry.1.single': damage,
            'entry.2.single': day,
            'entry.3.single': profile,
            'entry.4.single': battle,
            'entry.5.single': donateLink,
            'pageNumber' : 0

        }).done(function (data) {
            $sendButton.text("DMG Sent!");
            $sendButton.off('click');
            alert("Damage sent!")
        }).fail(function(){
            alert("Failed");
        });
    return false;
}

function initButtonEvent() {
    var $sendButton = createAndStyleButton();
    $sendButton.click(function () {
        var $href_profile = $(".you .one a");
        var $name = $(".you .one a span");
        var $dmg = $(".you .three strong");

        if ($href_profile.length == 1 && $name.length == 1 && $dmg.length == 1) {
            var profile = "http://www.erepublik.com" + $href_profile.attr("href");
            var name = $('a.user_name').text();
            var damage = $dmg.text();
            var battle = $(location).attr('href');
            var day = $('span.eday strong').text();
            var donateLink = "http://www.erepublik.com/en/economy/donate-items/" + profile.substr(profile.lastIndexOf("/") + 1);
            if (name && damage) {
                sendDamage($sendButton, name, profile, damage, day,battle, donateLink);
            } else {
                alert("You've done no damage, please fight before sending damage.")
            }
        } else {
            GM_log("Problem with html structure..");
        }
    });
}

function startup() {
    addButton();
    initButtonEvent();
}

lateStart();

// === Stop editing here. ===

var lastCheck = GM_getValue('lastCheck', 0);
var lastVersion = GM_getValue('lastVersion', 0);
var d = new Date();
var currentTime = Math.round(d.getTime() / 1000); // Unix time in seconds
if (parseInt(navigator.appVersion) > 3) {
    if (navigator.appName == "Netscape") {
        winW = window.innerWidth;
        winH = window.innerHeight;
    }
    if (navigator.appName.indexOf("Microsoft") != -1) {
        winW = document.body.offsetWidth;
        winH = document.body.offsetHeight;
    }
}
function createUpdateText(onSiteVersion) {
    return ''
        + '	<b>GreaseMonkey UserScript Update Notification</b><br>'
        + '	There is an update available for &quot;' + scriptName + '&quot; <br>'
        + '	You are currently running version ' + scriptVersion + '. The newest version is ' + onSiteVersion + '.<br>'
        + '	<br>'
        + '	<div id="gm_update_alert_button_close">'
        + '		Close</div>'
        + '	<b>What do you want to do?</b><br>'
        + '	<div id="gm_update_alert_buttons">'
        + '		<span id="gm_update_alert_button_showinfo"><a href="#">Show&nbsp;Update&nbsp;Info</a></span>&nbsp;&nbsp;'
        + '		<span id="gm_update_alert_button_scripthome"><a target="_blank" href="http://userscripts.org/scripts/show/' + scriptId + '">Go&nbsp;To&nbsp;Script&nbsp;Homepage</a></span>&nbsp;&nbsp;'
        + '		<span id="gm_update_alert_button_upgrade"><a href="http://userscripts.org/scripts/source/' + scriptId + '.user.js">Upgrade&nbsp;to&nbsp;version&nbsp;' + onSiteVersion + '</a></span>&nbsp;&nbsp;'
        + '		<span id="gm_update_alert_button_wait"><a href="#">Don&#39;t&nbsp;remind&nbsp;me&nbsp;again&nbsp;until&nbsp;tomorrow</a></span>&nbsp;&nbsp;'
        + '		<span id="gm_update_alert_button_waitnextversion"><a href="#">Don&#39;t&nbsp;remind&nbsp;me&nbsp;again&nbsp;until&nbsp;the&nbsp;next&nbsp;new&nbsp;version</a></span> </div>';
}
function createUpdateStyles() {
    return '#gm_update_alert {'
        + '	position: fixed;'
        + '	z-index:100000;'
        + '	top: ' + ((winH / 2) - 60) + 'px;'
        + '	left: ' + ((winW / 2) - 275) + 'px;'
        + '	width: 550px;'
        + '	background-color: yellow;'
        + '	text-align: center;'
        + '	font-size: 11px;'
        + '	font-family: Tahoma;'
        + '}'
        + '#gm_update_alert_buttons {'
        + '	position: relative;'
        + '	top: -5px;'
        + '	margin: 7px;'
        + '}'
        + '#gm_update_alert_button_close {'
        + '	position: absolute;'
        + '	right: 0px;'
        + '	top: 0px;'
        + '	padding: 3px 5px 3px 5px;'
        + '	border-style: outset;'
        + '	border-width: thin;'
        + '	z-index: inherit;'
        + '	background-color: #FF0000;'
        + '	color: #FFFFFF;'
        + '	cursor:pointer'
        + '}'
        + '#gm_update_alert_buttons span, #gm_update_alert_buttons span a  {'
        + '	text-decoration:underline;'
        + '	color: #003399;'
        + '	font-weight: bold;'
        + '	cursor:pointer'
        + '}'
        + '#gm_update_alert_buttons span a:hover  {'
        + '	text-decoration:underline;'
        + '	color: #990033;'
        + '	font-weight: bold;'
        + '	cursor:pointer'
        + '}';
}

function extractVariableValue(text, variableName) {
    var variableIdx = text.indexOf(variableName);
    var startOfVariableValue = variableIdx + variableName.length;
    var endOfVariableValue = text.indexOf(";", startOfVariableValue);
    return text.substring(startOfVariableValue, endOfVariableValue);
}

function addUpdateElements(onSiteVersion, onSiteUpdateText) {
    var newversion = document.createElement("div");
    newversion.setAttribute('id', 'gm_update_alert');
    newversion.innerHTML = createUpdateText(onSiteVersion);
    document.body.insertBefore(newversion, document.body.firstChild);
    document.getElementById('gm_update_alert_button_showinfo').addEventListener('click', function (event) {
        alert(onSiteUpdateText);
    }, true);
    document.getElementById('gm_update_alert_button_wait').addEventListener('click', function (event) {
        GM_setValue('lastCheck', currentTime);
        alert("You will not be reminded again until tomorrow.");
        document.body.removeChild(document.getElementById('gm_update_alert'));
    }, true);
    document.getElementById('gm_update_alert_button_waitnextversion').addEventListener('click', function (event) {
        GM_setValue('lastVersion', onSiteVersion);
        alert("You will not be reminded again until the next new version is released.");
        document.body.removeChild(document.getElementById('gm_update_alert'));
    }, true);
    document.getElementById('gm_update_alert_button_close').addEventListener('click', function (event) {
        document.body.removeChild(document.getElementById('gm_update_alert'));
    }, true);
}
if (currentTime > (lastCheck + 86400)) { //24 hours after last check
    GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://userscripts.org/scripts/review/' + scriptId + '?format=txt',
        headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', 'Accept': 'text/plain'},
        onload: function (responseDetails) {
            var text = responseDetails.responseText;
            var onSiteVersion = extractVariableValue(text, "scriptVersion = ");
            var onSiteUpdateText = extractVariableValue(text, "scriptUpdateText = ");
            if (onSiteVersion > scriptVersion && onSiteVersion > lastVersion) {
                GM_addStyle(createUpdateStyles());
                addUpdateElements(onSiteVersion, onSiteUpdateText);
            }
        }
    });
}