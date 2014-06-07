// ==UserScript==
// @name           Xbox.com Profile Search
// @namespace      Xbox.com Profile Search
// @description    Adds a Xbox.com Profile search option to da search barz
// @include        http://*bungie.net/*
// ==/UserScript==

var arrow = document.getElementsByClassName('rtbChoiceArrow')[0]
var h2_opt = document.getElementsByClassName('rtbItem')[2];
var noo_opt = document.createElement('li');
noo_opt.className = 'rtbItem';
noo_opt.innerHTML = '<a class="rtbWrap" href="javascript: void(0);"><img class="rtbIcon" src="http://i376.photobucket.com/albums/oo205/robby118bnet/sexyexy.gif" alt="" style="width: 18px; height: 18px;"><span class="rtbText">Xbox.com Profiles</span></a>';
arrow.addEventListener("click", switchy_back, true);
noo_opt.addEventListener("click", switchy, true);
h2_opt.parentNode.insertBefore(noo_opt, h2_opt.nextSibling);
function switchy() {
var asp_form = document.getElementById('aspnetForm');
var input = document.getElementById('ctl00_dashboardNav_searchMini_SearchTerm');
var main_image = document.getElementsByClassName('rtbIcon')[8];
var search_btn = document.getElementById('ctl00_dashboardNav_searchMini_SearchBtn');
var slipnslide = document.getElementsByClassName('rtbSlide')[0];
asp_form.action = 'javascript: void(0);';
input.value = 'Search Xbox.com Profiles';
main_image.src = 'http://i376.photobucket.com/albums/oo205/robby118bnet/sexyexy.gif';
search_btn.addEventListener("click", xsearch, true);
slipnslide.style.display = 'none';
slipnslide.style.overFlow = 'hidden';
}
function xsearch() {
var gt = document.getElementById('ctl00_dashboardNav_searchMini_SearchTerm').value;
window.location.assign("http://live.xbox.com/en-US/profile/profile.aspx?GamerTag="+gt); 
}
function switchy_back() {
var asp_form = document.getElementById('aspnetForm');
asp_form.action = document.URL;
}
// wubby wuz here
// Kinsler iz a thug
// tanks 2 apx for the "window.location.assign"