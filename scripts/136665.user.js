// ==UserScript==
// @name           Boursorama
// @namespace      BRS
// @description    small window for exprense preview
// @include        https://www.boursorama.com/comptes/banque/detail/*
// ==/UserScript==

// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

//unsafeWindow.console.log('some informational message');
if (unsafeWindow.console) {
    var GM_log = unsafeWindow.console.log;
}

GM_log("start Boursorama");

// Check if jQuery's loaded
function GM_wait() {
    if (typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait, 100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();

// All your GM code must be inside this function
function letsJQuery() {
    GM_log("start Jquery");
    //GM_log(gm_getValue("loyerDiv"));
    localStorage["test"] = "blah";
    //GM_log(localStorage["test"]);
    var divContent;

    ///find Solde théorique td
    $.each($("td.label"), function (key, value) {
        if ($(this).html() === "Solde théorique ") {
            var newSolde = parseInt($(this).next().children().html().replace(" ", ""));
            if (newSolde > 0) {
                divContent = "<div id='currentSolde' ><b>Solde théorique : <span class='varup' style='float:right'>" + $(this).next().children().html() + "<span></b></div>";
            }
            else {
                divContent = "<div id='currentSolde' ><b>Solde théorique : <span class='vardown' style='float:right'>" + $(this).next().children().html() + "<span></b></div>";
            }

            if (localStorage["loyerDiv"] == 1 || localStorage["loyerDiv"] == null) {
                divContent += "<div id=\"loyerDiv\" value=\"700\" activated=\"1\" > Loyer : <span class=\"vardown\" style='float:right'>-700 \u20AC</span></div>";
                newSolde -= 700;
            }
            else {
                divContent += "<div id=\"loyerDiv\" value=\"700\" activated=\"0\" style='color:grey' > Loyer : <span style='float:right'>-700 \u20AC</span></div>";
            }

            //GM_log("ecoDiv" + localStorage["ecoDiv"]);
            if (localStorage["ecoDiv"] == 1 || localStorage["ecoDiv"] == null) {
                divContent += "<div id=\"ecoDiv\" value=\"900\" activated=\"1\" > Economie : <span class=\"vardown\" style='float:right'>-900 \u20AC</span></div>";
                newSolde -= 900;
            }
            else {
                divContent += "<div id=\"ecoDiv\" value=\"900\" activated=\"0\" style='color:grey' > Economie : <span style='float:right'>-900 \u20AC</span></div>";
            }

            if (localStorage["impotDiv"] == 1 || localStorage["impotDiv"] == null) {
                divContent += "<div id=\"impotDiv\" value=\"350\" activated=\"1\" > Impot : <span class=\"vardown\" style='float:right'>-350 \u20AC</span></div>";
                newSolde -= 350;
            }
            else {
                divContent += "<div id=\"impotDiv\" value=\"350\" activated=\"0\" style='color:grey' > Impot : <span style='float:right'>-350 \u20AC</span></div>";
            }


            divContent += "<hr/>";
            if (newSolde > 0) {
                divContent += "<div id=\"newSoldeDiv\" value=\"" + newSolde + "\" ><b> Solde fin du mois : <span class=\"varup\" style='float:right'>" + newSolde + " \u20AC</span></b></div>";
            }
            else {
                divContent += "<div id=\"newSoldeDiv\" value=\"" + newSolde + "\" ><b> Solde fin du mois : <span class=\"vardown\" style='float:right'>" + newSolde + " \u20AC</span></b></div>";
            }
        }

    });

    ///add div
    $("body").append("<div class=\"block-white simple block no-hd\" style=\"position:fixed;bottom:10px;right:10px;width:200px;background-color:white;\" ><div class=\"bd\"> " + divContent + " </div></div>");



    $("#loyerDiv").click({ divName: "loyerDiv" }, toggleLine);
    $("#ecoDiv").click({ divName: "ecoDiv" }, toggleLine);
    $("#impotDiv").click({ divName: "impotDiv" }, toggleLine);

    // in your function, just grab the event object and go crazy...
    function toggleLine(event) {
        var valueToAdd = 0;

        if ($("#" + event.data.divName).attr("activated") === "1") {
            $("#" + event.data.divName).attr("activated", "0");
            ///deactivate => addvalue
            valueToAdd = parseInt($("#" + event.data.divName).attr("value"));
            $("#" + event.data.divName).css("color", "grey");
            $($("#" + event.data.divName).find("span")[0]).css("color", "grey");
            $($("#" + event.data.divName).find("span")[0]).attr("class", "");
            localStorage[event.data.divName] = 0;
        }
        else {
            $("#" + event.data.divName).attr("activated", "1");
            ///activate => remove value => add minus
            valueToAdd = parseInt("-" + $("#" + event.data.divName).attr("value"));
            $("#" + event.data.divName).css("color", "black");
            colorSpan(event.data.divName, -100);
            localStorage[event.data.divName] = 1;
        }
        //alert("set loyerDiv : " + localStorage[event.data.divName]);

        var currentSolde = parseInt($("#newSoldeDiv").attr("value"));
        var newSolde = currentSolde + valueToAdd;
        $("#newSoldeDiv").attr("value", newSolde);
        $("#newSoldeDiv").html("<b> Solde fin du mois : <span style='float:right'>" + newSolde + " \u20AC</span></b>");
        colorSpan("newSoldeDiv", newSolde);

    }

    function colorSpan(divToColor, solde) {
        if (solde > 0) {
            $($("#" + divToColor).find("span")[0]).addClass("varup");
        }
        else {
            $($("#" + divToColor).find("span")[0]).addClass("vardown");
        }
    }

    //function colorDiv(divToColor, activated) {
    //    if (activated == 1) {

    //    }
    //    else {
    //        $("#" + divToColor).css("color", "grey");
    //        $($("#" + divToColor).find("span")[0]).css("color", "grey");
    //        $($("#" + divToColor).find("span")[0]).attr("class", "");
    //    }
    //}




}

var GM_Debug = 1;
if (!GM_Debug) {
    var GM_log = function () { };
}

//function gm_getValue(name) {
//    var theValue;
//    setTimeout(function () {
//        theValue = GM_getValue(name);
//        alert(theValue);
//    }, 0);
//    alert(theValue);
//    return theValue;
//}

function gm_setValue(name, value) {
    setTimeout(function () {
        gm_setValue(name, value);
    }, 0);

}


GM_addStyle(
    "#impotDiv,#loyerDiv,#ecoDiv{cursor:pointer;}#impotDiv:hover,#loyerDiv:hover,#ecoDiv:hover{font-weight: bold;}"
    );