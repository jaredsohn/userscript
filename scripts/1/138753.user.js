// ==UserScript==
// @name        tvmuse.eu optimizer
// @namespace   AfzalivE
// @include     http://www.tvmuse.eu/*
// @require     http://code.jquery.com/jquery-1.7.1.min.js
// @version     2
// ==/UserScript==

function removeLinks() {
    var x1 = document.getElementsByClassName("z180_r cfix")[0].childNodes;
    for (i = 0; i < 6; i++) {
        if (i == 2) {
                link = x1[14].childNodes[3].childNodes[0].href;
        }
        x1[0].parentNode.removeChild(x1[14]);
    }

    document.getElementsByClassName("mov_data mb_2")[0].removeChild(document.getElementsByClassName("cfix")[6]);


    var x2 = $(".bg_imp.mb_2")[1];
    x2.setAttribute("class", "mb_2");
    x2.removeChild(x2.childNodes[1]);
    results = document.createElement("div");
    results.id = "results"
    all = document.createElement("a");
    all.innerHTML = "All episode links";
    all.href = link;
    x2.appendChild(results);
    $("#results").load(link +' #table_search', function() {
        $("#results").prepend(all);
        var two = document.getElementsByClassName("c2 o_hidden");
        console.log(two.length);
        for (i = 0; i < two.length; i++) {
            if (two[i].childNodes[3].innerHTML == "featured result") {
                two[i].parentNode.parentNode.removeChild(two[i].parentNode);
                i--;
            } else {
                var linkpart = two[i].parentNode.getAttribute('onclick').split("'")[1];
                var link = "http://www.tvmuse.eu/gateway.php?data="
                two[i].parentNode.href = link + linkpart;
                two[i].parentNode.setAttribute("onclick", "");
            }
        }
    });
}


if (document.URL.match(/http:\/\/.+\.tvmuse.eu\/tv-shows\/.+\/.+\/.+/)) {
    removeLinks();
}
