// ==UserScript==
// @attribution Toni Schumacher (http://cisco211.de/Projects/Userscripts/FacebookChatBoxResizer)
// @author Toni Schumacher aka C!$C0^211 [cisco211] <anonymous@example.net> http://cisco211.de
// @contributionAmount $1.00
// @contributionURL http://cisco211.de/Contact
// @contributor Toni Schumacher
// @copyright 2012+, Toni Schumacher aka C!$C0^211 [cisco211] (http://cisco211.de/)
// @creator Toni Schumacher aka C!$C0^211 (cisco211) <anonymous@example.net> http://cisco211.de
// @delay 0
// @description Changes the chat box size!
// @developer Toni Schumacher
// @downloadURL http://cisco211.de/Projects/Userscripts/FacebookChatBoxResizer/script.user.js
// @homepageURL http://cisco211.de/Projects/Userscripts/FacebookChatBoxResizer
// @iconURL http://cisco211.de/Projects/Userscripts/FacebookChatBoxResizer/script.icon32.png
// @icon64URL http://cisco211.de/Projects/Userscripts/FacebookChatBoxResizer/script.icon64.png
// @id FacebookChatBoxResizer
// @license Public Domain; http://en.wikipedia.org/wiki/Public_domain
// @name Facebook: ChatBox Resizer
// @namespace http://cisco211.de/Projects/Userscripts
// @match http://*.facebook.com/*
// @match https://*.facebook.com/*
// @priority 0
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @run-at document-end
// @screenshot http://cisco211.de/Projects/Userscripts/FacebookChatBoxResizer/Screenshot/image1.png http://cisco211.de/Projects/Userscripts/FacebookChatBoxResizer/Screenshot/thumb1.png
// @updateURL http://cisco211.de/Projects/Userscripts/FacebookChatBoxResizer/script.meta.js
// @version 0.2
// ==/UserScript==

// Configuration
// Konfiguration
// =============

// Width of ChatBox in pixels.
// Breite der ChatBox in Pixeln.
var groupchatWidth = 600;

// Height of ChatBox in pixels.
// Hoehe der ChatBox in Pixeln.
var groupchatHeight = 600;

// The negative offset to resize the scrollable box inside the ChatBox correctly ( TitleBar(26px) + InputField(25px) = 51px ).
// Der Negativwert um die Groesze der scrollenden Box innerhalb der ChatBox korrekt darzustellen ( Titelleiste(26px) + Eingabefeld(25px) = 51px ).
var groupchatHeightNegativeOffset = 51;

// Initialization delay in seconds
// Initialisierungsverzoegerung in Sekunden
var initialDelay = 5; 

// Update interval in seconds (Needed because Facebook updates the Height, when switching to another browser tab; lower value means more cpu usage, higher value means you need to wait longer if the InputField isn't visible)
// Aktualisierungsintervall in Sekunden (Wird benoetigt, weil Facebook die Hoehe anpasst, wenn man zu einem anderen Browser-Tab gewechselt hat; niedriger Wert erfordert mehr Prozessorleistung, hoeherer Wert bedeutet laenger warten, wenn das Eingabefeld nicht sichtbar ist)
var updateInterval = 10; // 0 turns off | 0 schaltet ab

// Enable logging (Useful for developers)
// Aktiviere logging (Sinnvoll fuer Entwickler)
var logging = true; // true or false | true oder false

// Dont change the lines below...
// Die folgenden Zeilen nicht aendern...
function unique(){
    var output = String.fromCharCode(Math.floor((Math.random() * 25) + 65));
    do {                
        var char = Math.floor((Math.random() * 42) + 48);
        if (char < 58 || char > 64) output += String.fromCharCode(char);    
    } while (output.length < 32);
    return output;
}
var uniqueID = unique();
var calculatedHeight = (groupchatHeight-groupchatHeightNegativeOffset);
function updateChatBoxHeight() {
    $('.fbMercuryChatTab .emoticonsPanel,.fbNubFlyoutOuter,.fbNubFlyout,.fbDockChatTabFlyout').attr('style','');
    $('head').append(
        '<style type="text/css">'+
        '  #fbDockChatTabs .fbMercuryChatTab.opened {width:'+groupchatWidth+'px;}'+
        '  .fbMercuryChatTab .emoticonsPanel {left:auto;right:1px;}'+
        '  .fbNubFlyout,.fbDockChatTabFlyout,.fbNubFlyoutOuter,.fbNubFlyoutInner,.fbMercuryChatTab .fbDockChatTabFlyout {height:'+groupchatHeight+'px;}'+
        '  .fbNubFlyoutBody.scrollable {height:'+calculatedHeight+'px !important;min-height:'+calculatedHeight+'px !important;max-height:'+calculatedHeight+'px !important;}'+
        '</style>'
    );
    if (logging) console.log('Facebook ChatBox Resizer updated sizes ('+uniqueID+').');
    if (updateInterval > 0) setTimeout(updateChatBoxHeight,(updateInterval*1000));
}
function main() {
    $(document).ready(function() {
        $('body').fadeIn(1).delay(initialDelay*1000).show(0,function(){
            if ($("#pagelet_dock").length < 1) return; // Exit if required element not found :D
            if (logging) console.log('Facebook ChatBox Resizer started ('+uniqueID+').');
            updateChatBoxHeight();
        });
    });
}
main();