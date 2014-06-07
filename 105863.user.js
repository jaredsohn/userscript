
// ==UserScript==
// @name            Google Cleaner
// @description        Auto-hides the left sidebar and provides a button to toggle it
// @version            2.4
// @include            http://www.google.*/search*
// @include            http://www.google.*/webhp*
// @include            http://www.google.*/images*
// @include            http://www.google.*/imghp*
// @include            https://www.google.*/search*
// @include            https://www.google.*/webhp*
// @grant              none
// ==/UserScript==

var head = document.getElementsByTagName('head')[0]
var hideNavBarStyle = dom("<style type='text/css'>#top_nav {display:none;}</style>")
var hideFiltersBarStyle = dom("<style type='text/css'>#filtersBar {display:none;}</style>")
var isBarVisible = false
var isFiltersBarVisible = false

function init() {
    if(document.getElementById("top_nav") == null) return

    toggleNavBar()
    toggleFiltersBar()
    addLinks()
    document.addEventListener('DOMNodeInserted', addLinks, true)
    cleanGoogle()
}

function toggleNavBar() {
    if (isBarVisible) {
        head.removeChild(hideNavBarStyle)
    } else {
        head.appendChild(hideNavBarStyle)
    }

    isBarVisible = !isBarVisible
}

function toggleFiltersBar() {
    if (isFiltersBarVisible) {
        head.removeChild(hideFiltersBarStyle)
    } else {
        head.appendChild(hideFiltersBarStyle)
    }

    isFiltersBarVisible = !isFiltersBarVisible
}



function addLinks() {
   if(document.getElementById("bartoggle") != null) return

   var parent = document.getElementById('gbq')
   createLink("<div id='bartoggle' style='font-size: 11px; margin-left: -96px; margin-top: 15px; position: absolute'>Toggle topbar</div>", toggleNavBar, parent)
   createLink("<div style='font-size: 11px; margin-left: -88px; position: absolute; margin-top: 40px'>Past year</div>", showPastYearPosts, parent)
   createLink("<div style='font-size: 11px; margin-left: -66px; position: absolute; margin-top: 60px'>+</div>", toggleFiltersBar, parent)



   var filtersBar = createLink("<div id='filtersBar' style='font-size: 11px; margin-left: -90px; position: absolute; margin-top: 83px; line-height: 18px'></div>", null, parent)

   createLink("<div style=''>Past year</div>", showPastYearPosts, filtersBar)
   createLink("<div style=''>Any time</div>", showAnyTimePosts, filtersBar)
   createLink("<div style=''>Past hour</div>", showPastHourPosts, filtersBar)
   createLink("<div style=''>Past 24 hours</div>", showPast24HoursPosts, filtersBar)
   createLink("<div style=''>Past week</div>", showPastWeekPosts, filtersBar)
   createLink("<div style=''>Past month</div>", showPastMonthPosts, filtersBar)
   createLink("<div style=''>Custom range</div>", showCustomRangePosts, filtersBar)
}

function showPastYearPosts() { doLink("qdr_y") }
function showAnyTimePosts() { doLink("qdr_") }
function showPastHourPosts() { doLink("qdr_h") }
function showPast24HoursPosts() { doLink("qdr_d") }
function showPastWeekPosts() { doLink("qdr_w") }
function showPastMonthPosts() { doLink("qdr_m") }
function showCustomRangePosts() { toggleNavBar(); document.getElementById("cdr_opt").children[1].click() }

function doLink(linkId) {
    document.getElementById(linkId).firstChild.click()
}

function cleanGoogle() {
    addStyle(
     ".sfbgg {background: none; border-bottom: none}"+
     "#top_nav {margin-bottom: 70px; margin-top: -13px}" +
     "#logo img {background: none repeat scroll 0 0 #FFFFFF}"+
     ".eswd, .nobr, #ab_name, #appbar_b {display: none}"+
     "#appbar {left: 210px; border-bottom: 0px; margin-top: -40px}"+
     "#resultStats {top: 28px; left: 118px; font-size: 11px}"+
     "#rcnt {top: 0px; z-index: 5}"+
     ".ksfccl .gl {position: relative; left: 9px}"+
     "#searchform {margin-top: -45px}" +//used for google.com.br
     "#gbx1, #gbx2 { background: none; border-bottom: 0px; height: 10px}" +
     "#ab_ctls, #gbzw, #gbx3 {display: none}" +
     "#gbv, #gbn, #gbq1, #gbq3 { z-index: 100; margin-top: 0px}" +
     "body {width: 960px}" +
     "#gbx1, #gb #gbx1, #gbq, #gbu, #gb #gbq, #gb #gbu {top: 15px}" +
     ".gb_qb{background: none} .gb_qb:before {display: none} .gb_Oa {margin-top: -15px}" +
     "#center_col {margin-top: 15px}" +
     '#tads a, #tadsb a, #res a, #rhs a, #taw a {font-size: small}' +
     'li.g{margin-bottom: 9px !important}' +
     '#tvcap{display: none}' +
     '.gb_Eb{background: none}'
    )
}

function createLink(nodeString, onclick, parent) {
    var link = dom(nodeString)
        link.addEventListener("click", onclick, false)
        parent.appendChild(link)
    return link
}

function addStyle(styleString) {
    var style = dom("<style type='text/css'>" + styleString + "</style>")
    head.appendChild(style);
// document.getElementById("topabar").children[0].setAttribute("style", "height:57px");
}


function dom(nodeString) {
      var div = document.createElement('div');
      div.innerHTML = nodeString
      return div.firstChild
}

init()


