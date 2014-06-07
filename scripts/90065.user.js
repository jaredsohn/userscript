// ==UserScript==
// @name        Figure Summarizer
// @description Summarizes figures in NCBI Images
// @include     http://www.ncbi.nlm.nih.gov/pmc/articles/*/figure/*
// @copyright   Shashank Agarwal, University of Wisconsin-Milwaukee
// @version     1.0.0
// ==/UserScript==


function ajaxFunction(){
    var ajaxRequest;  // The variable that makes Ajax possible!

    try{
        // Opera 8.0+, Firefox, Safari
        ajaxRequest = new XMLHttpRequest();
    } catch (e){
        // Internet Explorer Browsers
        try{
            ajaxRequest = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try{
                ajaxRequest = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e){
                // Something went wrong
                //                alert("Your browser broke!");
                return false;
            }
        }
    }
    return ajaxRequest;
}

function extractPmcId(url) {
    var pmcId = null;
    var pmcExtractor = /PMC(\d+)\//;
    var pmcMatch = pmcExtractor.exec(url);
    pmcId = pmcMatch[1];
    return pmcId;
}

function extractFigureId(url) {
    var figureId = null;
    var figureIdExtractor = /figure\/(.*)\//;
    var figureIdMatch = figureIdExtractor.exec(url);
    figureId = figureIdMatch[1];
    return figureId;
}

function addSummary(pmcId, figureId) {
    var ajaxRequest = ajaxFunction();
    if (ajaxRequest == false) {
        return;
    }
    var text;
    ajaxRequest.onreadystatechange = function() {
        if (ajaxRequest.readyState == 4){
            text = ajaxRequest.responseText;
            document.getElementById("summary").innerHTML = text;
        }
    }
    ajaxRequest.open("GET", "http://snake.ims.uwm.edu/articlesearch/ajax.php?pmcid=" + pmcId + "&figid=" + figureId, true);
    ajaxRequest.send(null);
    
}

function prepareSummaryTag() {
    var elements = document.getElementsByTagName("div");
    for (divElementKey in elements) {
        var divElement = elements[divElementKey];
        var divElementClassName = divElement.className;
        if (divElementClassName == "caption") {
            captionHtml = divElement.innerHTML.toString();
            captionHtml += "<div id=\"summary\"></div>";
            divElement.innerHTML = captionHtml;
            return true;
        }
    }
    return false;
}

var url = window.location.pathname;
var pmcId = extractPmcId(url);
var figureId = extractFigureId(url);
if (prepareSummaryTag()) {
    addSummary(pmcId, figureId);
}

