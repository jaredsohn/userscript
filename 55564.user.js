// ==UserScript==
// @name           MeFiMail exporter
// @namespace      http://plutor.org/
// @description    Exports your mefimail into a CSV
// @include        http://www.metafilter.com/contribute/messages.mefi*
// @include        http://www.metafilter.com/contribute/messages-sent.mefi*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

var REQUEST_INTERVAL = 500; // msec

// ==========================================================================

function init() {
    addExportButton();    
}

function addExportButton() {
    var count = getMessageCount();
    var text = "Export all messages";
    if (count && count > 0) text = "Export all " + count + " messages";

    var lc = $("table#messages tr:last td:not(:last):last"); // next to last cell
    lc.attr("colspan", lc.attr("colspan") - 1);

    var newcell = $('<td class="rem" style="padding-top: 10px;" id="export"><input type="submit" value="' + text + '"/></td>');
    newcell.insertBefore("table#messages tr:last td:last")
        .children("input").click( doExport )
}

function getMessageCount() {
    var count;
    var countelem = $("span.smallcopy").each( function(i) {
        var matches = $(this).text().match(/^\((\d+) messages?\)$/);
        if (matches && matches.length >= 2) {
            count = matches[1];
            return;
        }
    } );
    return count;
}

function doExport(e) {
    e.preventDefault();

    exportProgress( 0 );
    buildMessageUrlList();

    // Headers
    if (location.pathname.indexOf("messages-sent") == -1)
        csv = '"Sender","Date","Subject","Message"' + "\n";
    else
        csv = '"Recipient","Date","Subject","Message"' + "\n";

    // Request one message per half second
    setTimeout( getNextMessage, REQUEST_INTERVAL );
}

var messageUrls = new Array();
function buildMessageUrlList() {
    var count = getMessageCount();
    var pages = Math.ceil(count/20);
    var baseurl = location.protocol + "//" + location.host + location.pathname;

    for (var page=1; page<=pages; ++page) {
        var pageurl = baseurl + "?page=" + page;
        $.ajax({
            async: false, type: "GET", datatype: "html",
            url: pageurl,
            success: function(data, st) {
                var pagedom = $(data);
                pagedom.find("table#messages tr:not(:last):not(:first)").each( function(i) {
                    var msglink = $(this).children("td.subject").children("a");
                    var msgurl = msglink.eq(0).attr('href');
                    if (msgurl.indexOf("http://") == -1)
                        msgurl = location.protocol + "//" + location.host + msgurl;

                    messageUrls.push(msgurl);
                } );
            }
        });
    }
}

var csv = ""
function getNextMessage() {
    if (!messageUrls || messageUrls.length == 0) {
        exportDone(csv);
        return;
    }

    var msgurl = messageUrls.pop();

    // Get the message
    $.ajax({
        async: false, type: "GET", datatype: "html",
        url: msgurl,
        success: function(data, st) {
            var msgdom = $(data);

            // Add the message details to the csv
            var from = msgdom.find("label[for=from]:eq(0)")
                .next("div.message").text();
            // This looks wrong, but it's how the html is
            var sent = msgdom.find("label[for=subject]:eq(0)")
                .next("div.message").text();
            var subject = msgdom.find("label[for=subject]:eq(1)")
                .next("div.message").text();
            var content = msgdom.find("label[for=message]:eq(0)")
                .next("div.message").text();

            csv += csvEncode(from) + ","
                 + csvEncode(sent) + ","
                 + csvEncode(subject) + ","
                 + csvEncode(content) + "\n"
        }
    });

    var count = getMessageCount();
    var messagesdone = count - messageUrls.length;
    exportProgress( messagesdone / count * 100 );

    setTimeout( getNextMessage, REQUEST_INTERVAL );
}

function csvEncode(str) {
    return '"' + str
        .replace(/\\/g, "\\\\")
        .replace(/\"/g, "\\\"")
        .replace(/<[^>]*>/g, "")
        .replace(/\n/g, "\\n") + '"';
}

function exportProgress(percent) {
    $("#export").text("Export: " + Math.floor(percent) + "% done")
        .css("font-size", "80%");
}

function exportDone(csv) {
    var dataurl = 'data:text/csv,' + encodeURIComponent(csv);

    $("#export").html(
        '<a href="' + dataurl + '">Export done</a>'
    );
    location.href = dataurl;
}

$(init);

