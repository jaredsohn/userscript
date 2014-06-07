// ==UserScript==
// @name 	clean up some stuff
// @namespace 	nasza-klasa.pl
// @description 	cleaning..
// @version 	0.1
// @date 	2009-03-06
// @creator 	mexikanischeMaus
// @include 	http://*nasza-klasa.pl*
// ==/UserScript==

function getElementsByHref(hrefToFind)
{
    return [i for each (i in document.getElementsByTagName("a")) if (i.href == hrefToFind)];
}

function getElementsByClass(tagName, className)
{
    return [i for each (i in document.getElementsByTagName(tagName)) if (i.className == className)];
}

function hideHrefs(hrefToHide)
{
    for each ( x in getElementsByHref(hrefToHide)) x.style.display = "none";
}

function hideElementByClass(tagName, className)
{
    for each ( x in getElementsByClass(tagName, className)) x.style.display = "none";
}

hideHrefs("http://nasza-klasa.pl/payment");
hideHrefs("http://nasza-klasa.pl/allegro/new_auction");
document.getElementById("main_gifts").style.display = "none";
hideElementByClass("div","invite_box");
hideElementByClass("div","partners_box");
hideElementByClass("div","cool_box_21 cool_box last_news_box");
hideElementByClass("div","cool_box_21 cool_box school_mates_box");
hideElementByClass("div","cool_box_21 cool_box");
hideElementByClass("li","import_link");

getElementsByClass("div", "box box2")[1].style.display = "none"; //fora
getElementsByClass("div", "box box2")[2].style.display = "none"; //szkoly
getElementsByClass("div", "box box2")[3].style.display = "none"; //google
