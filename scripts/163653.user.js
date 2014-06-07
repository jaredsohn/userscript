// ==UserScript==
// @name       Futa Filter
// @description  Wordfilters futa spam on /d/
// @match      http://boards.4chan.org/d/*
// @match      http://boards.4chan.org/d/catalog
// ==/UserScript==

var isCatalog = (document.location.href.indexOf("catalog") !== -1);

var dicks = [
    "futa(nari)?",
    "(/)?d(/)?ick(-| )?girl",
    "penis(-| )?girl",
    "shemale",
    "herm",
    "newhalf",
    "bulge",
    "balls",
    "poison",
    "dmitry",
    "kami(-| )?tora",
    "paper(-| )?tiger",
    "rebis",
    "makoto",
    "(^| )idg($| )",
    "self(-| )?suck",
    "auto(-| )?fellatio",
    "auto(-| )?paizuri"
];

var regex = new RegExp("(" + dicks.join(")|(") + ")", "i");
var threads = document.getElementsByClassName("thread");
var subject, comment, tteaser = null;

for(var i = 0; i < threads.length; i++){
    subject = threads[i].firstChild.getElementsByClassName("subject");
    comment = threads[i].firstChild.getElementsByClassName("postMessage");
    tteaser = threads[i].getElementsByClassName("teaser");
    if((subject && subject[0] && regex.test(subject[0].textContent))||
        (comment && comment[0] && regex.test(comment[0].textContent))||
            (tteaser && tteaser[0] && regex.test(tteaser[0].textContent))){
                threads[i].style.display = "none";
                if(!isCatalog){
                    threads[i].nextElementSibling.setAttribute("style", "display: none;");
                }
            }
}