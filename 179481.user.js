// ==UserScript==
// @name        FilterWDK
// @description Enables simple filtering on WDK. 
// @namespace   http://userscripts.org/scripts/show/179481
// @version		0.8.3
// @include     http://warez-dk.org/forumdisplay.php?f=*
// ==/UserScript==


function setCookie(c_name, value, exdays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
    console.log("saving " + value);
    document.cookie = c_name + "=" + c_value;
}

function getCookie(c_name) {
    var c_value = document.cookie;
    var c_start = c_value.indexOf(" " + c_name + "=");
    if (c_start == -1) {
        c_start = c_value.indexOf(c_name + "=");
    }
    if (c_start == -1) {
        c_value = null;
    }
    else {
        c_start = c_value.indexOf("=", c_start) + 1;
        var c_end = c_value.indexOf(";", c_start);
        if (c_end == -1) {
            c_end = c_value.length;
        }
        c_value = unescape(c_value.substring(c_start, c_end));
    }
    return c_value;
}





function addCheckbox(name) {
    var divelement = $('<div style="display:inline-block"/>', {});
    $(divelement).prependTo($("#masterdiv"));
    $('<input />', { type: 'checkbox', class: 'cbfilter', value: name, id: 'cb' + name, checked: "checked", style: "height:15px; width:15px;" }).appendTo(divelement);
    $('<label />', { 'for': 'cb' + name, text: name, style: "margin-right:20px;" }).appendTo(divelement);
}




$("#cbNZB").change(function () {
    hideAllThreads();
    showThreads();
    saveCookie();
});

$("#cbFD").change(function () {
    hideAllThreads();
    showThreads();
    saveCookie();
});

$("#cbZS").change(function () {
    hideAllThreads();
    showThreads();
    saveCookie();
});



function showThreads() {
    if ($('#cbNZB').is(':checked')) {
        showThreadsFromHost("NZB");
    }
    if ($('#cbFD').is(':checked')) {
        showThreadsFromHost("FD");
    }
    if ($('#cbZS').is(':checked')) {
        showThreadsFromHost("ZS");
    }

    showEmptyThreads();

}


function showEmptyThreads() {
    $('.threadbit').each(function () {

        var li = $(this).closest("li");
        if ($(li).find('h3 > span.threadlabel').size() == 0) {
            $(li).show();
        }
    });
}


function hideAllThreads() {
    $('.threadbit').hide();
}

function showThreadsFromHost(host) {

    console.log("Showing all " + host);

    $('.' + host).each(function () {
        var li = $(this).closest("li");
        if ($(this).siblings('span not(.prefix)').size() == 0) {

            $(li).show();
        }
    });
}




function saveCookie() {
    var shownzb = $("#cbNZB").prop('checked');
    var showfd = $("#cbFD").prop('checked');
    var showzs = $("#cbZS").prop('checked');

    var s = "";
    if (shownzb)
        s += "NZB;";

    if (showfd)
        s += "FD;";

    if (showzs)
        s += "ZS;";

    setCookie("wdkhostfilter", s, 30);
}


$(document).ready(function () {

    var buttondiv = $("#above_threadlist");

    $("<div />", { id: 'masterdiv' }).insertAfter(buttondiv);

    addCheckbox("NZB");
    addCheckbox("FD");
    addCheckbox("ZS");

    //Loading cookie and checking boxes:
    $("#cbNZB").change(function () {
        hideAllThreads();
        showThreads();
        saveCookie();
    });

    $("#cbFD").change(function () {
        hideAllThreads();
        showThreads();
        saveCookie();
    });

    $("#cbZS").change(function () {
        hideAllThreads();
        showThreads();
        saveCookie();
    });

    var cookieval = getCookie("wdkhostfilter");
    if (cookieval.length > 2) {
        var splitted = cookieval.split(";");

        $(".cbfilter").each(function () {
            $(this).removeAttr("checked");
            $(this).trigger("change");
        });


        for (var k in splitted) {
            console.log("trying to check " + "#cb" + splitted[k]);
            $("#cb" + splitted[k]).attr("checked", "checked");
            $("#cb" + splitted[k]).trigger("change");
        }
    }


});