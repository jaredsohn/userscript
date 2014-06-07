// ==UserScript==
// @name           inquestion-search
// @namespace      stackoverflow
// @description    Searchbox for searching through the answers on the current question
// @include        http://stackoverflow.com/*
// @include        http://serverfault.com/*
// @include        http://superuser.com/*
// @include        http://meta.stackoverflow.com/*
// @author         Benjamin Dumke
// ==/UserScript==

// Thanks to Shog9 for this idea for making the script work in both
// Chrome and Firefox:
// http://meta.stackoverflow.com/questions/46562
function with_jquery(f) {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.textContent = "(" + f.toString() + ")(jQuery)";
  document.body.appendChild(script);
};

with_jquery(function ($) {

    var match = /\.com\/questions\/(\d+)/.exec(location.href);

    if (!match) {
        return
    }
    var qid = match[1];

    var amatch = /^(\d+) Answ/.exec($(".answers-subheader").find("h2").text());

    // change the "5" to the minimum number of answers you want to have before
    // the searchbox gets displayed
    if (!amatch || amatch[1] < 5) {
        return
    }

    var box = $("#hsearch").clone().attr("id", "hsearch-inquestion").css({ display: "inline", float: "left", "margin-left": "10px" });
    var form = box.find("form").attr("id", "search-inquestion");
    form.submit(function () {
        var inp = $(this).find("input:first");
        inp.val(inp.val() + " inquestion:" + qid);
        return true;
    });
    box.insertBefore("#tabs");


});
