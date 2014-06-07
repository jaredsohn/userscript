// ==UserScript==
// @name        Google Promote/Demote Site
// @namespace   com.cylansoft.greasemonkey.googlepromote
// @description Promote/Demote sites by a single button
// @include     https://www.google.ca/search*
// @include     https://www.google.com/search*
// @version     1
// @require     https://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.js
// @require     https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.4/underscore-min.js
// @grant       none
// ==/UserScript==

var promoted, demoted;

load();
$(document).on("DOMSubtreeModified", _.debounce(init, 1));

function load() {
    promoted = JSON.parse(localStorage.getItem("promoted") || "[]");
    demoted = JSON.parse(localStorage.getItem("demoted") || "[]");
}

function save() {
    localStorage.setItem("promoted", JSON.stringify(promoted));
    localStorage.setItem("demoted", JSON.stringify(demoted));
}

function init() {
    var $container = $("ol#rso");
    var $results = $container.find("li.g");
    var $btns = $("<span><a href='#' class='promote' style='text-decoration: none; color: green;'>&uarr;</a> <a href='#' class='demote' style='text-decoration: none; color: green;'>&darr;</a> <a href='#' class='reset' style='text-decoration: none; color: green;'>&ndash;</a></span>");
    if($results.find(".promote").length === 0) {
        _.each($results, function(result, i) {
            $(result).data("originalIndex", i);
        });
        $results.find("div.kv").append($btns);
        $(document).on("click", ".promote", promote);
        $(document).on("click", ".demote", demote);
        $(document).on("click", ".reset", reset);
        update();
    }
}

function update() {
    var $container = $("ol#rso");
    var $results = $container.find("li.g");
    var sites = _.map($results, getSiteFromResult);
    
    $results.find(".promote, .demote").css("color", "green");
    
    _.each(_.sortBy($results, function(result) {
        return $(result).data("originalIndex");
    }), function(result, i) {
        $(result).appendTo($container);
    });
    
    _.each($results, function(result, i) {
        if(_.contains(demoted, sites[i])) {
            $(result).appendTo($container);
            $(result).find(".demote").css("color", "red");
        }
    });
    
    _.each(Array.prototype.reverse.call($results), function(result, i) {
        if(_.contains(promoted, sites[sites.length - i - 1])) {
            $(result).prependTo($container);
            $(result).find(".promote").css("color", "red");
        }
    });
}

function promote(e) {
    e.preventDefault();
    e.stopPropagation();
    var $result = $(e.target).closest("li.g");
    var site = getSiteFromResult($result);
    if(!_.contains(promoted, site)) {
        promoted.push(site);
        demoted = _.without(demoted, site);
        save();
    }
    update();
    console.log("Promoted " + site);
}

function demote(e) {
    e.preventDefault();
    e.stopPropagation();
    var $result = $(e.target).closest("li.g");
    var site = getSiteFromResult($result);
    if(!_.contains(demoted, site)) {
        demoted.push(site);
        promoted = _.without(promoted, site);
        save();
    }
    update();
    console.log("Demoted " + site);
}

function reset(e) {
    e.preventDefault();
    e.stopPropagation();
    var $result = $(e.target).closest("li.g");
    var site = getSiteFromResult($result);
    promoted = _.without(promoted, site);
    demoted = _.without(demoted, site);
    save();
    update();
    console.log("Reset " + site);
}

function getSiteFromResult(result) {
    var text = $(result).find("div.kv cite").text();
    var parts = text.split("/");
    var site = parts[0];
    if (site.contains(":")) {
        site = parts[2];
    }
    return site;
}
