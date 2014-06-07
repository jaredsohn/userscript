// ==UserScript==
// @name		Hide/Show FB Ads/Sidebar/Chat
// @namespace	www.asknetguy.com/userscripts/
// @description	Adds buttons to top-left of page for selectively hiding/showing the Sidebar/Chat/Ads from view in FB
// @include		http*://*.facebook.com/*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @resource	ddownCSS http://asknetguy.com/userscripts/ddown1.1.css
// @version		2.1.4.1
// @copyright	AskNetGuy
// ==/UserScript==
/*
Ver 2.0.0.0 Re-designed script for appearance 
ver 2.0.0.1 Adjusted numbers a bit to fix alignment
ver 2.0.0.2 Uncommented fader option
ver 2.0.1.0 Re-wrote with new scripting for menu display control
ver 2.0.2.0 Adjusted menu placement to not cover FB logo anymore
ver 2.1.0.0 Added ability to set selection as permanent until changed
ver 2.1.1.0 Performed Code Cleaning - it was seriously needed
ver 2.1.1.1 Fixed navigation id bug found by DARKFiB3R - Thanks Man!
ver 2.1.2.0 Switched to just removing ads, leaving reminders/birthdays visible
ver 2.1.3.0 Added rightCol as a selection option again
ver 2.1.4.0 fixed error throwing jibberish into error log
ver 2.1.4.1 added if statement to prevent triggering on FB embedded pages.
*/
//check values before doing anything
var allHideStatus = GM_getValue("allHide", false);
var adsHideStatus = GM_getValue("adsHide", false);
var sbcHideStatus = GM_getValue("sbcHide", false);
var rcHideStatus = GM_getValue("rcHide", false);
//Retrieve and store current style sheet
var newCSS = GM_getResourceText("ddownCSS");
GM_addStyle(newCSS);
//This sections puts links in a Div 
//If you like the old position better, simply change the 38px below to 10px
$('div h1:first-child').append(
    '<div class="gmSHL" style="border:none; position:fixed; top:38px!important; left:0px!important;z-index:999; padding:1px; text-align:center!important;list-style:none;font-size:.9em;">'
		+ '<nav>'
		+ '<ul class="navFBnoprob">'
		+ '<li><a href="" onclick="return false;">Hide</a>'
		+ '<ul>'
		+ '<li><a href="" onclick="return false;" id="sbcHLink" >Sbar<br>Chat</a></li>'
		+ '<li><a href="" onclick="return false;" id="adsHLink" >Ads</a></li>'
		+ '<li><a href="" onclick="return false;" id="rcHLink" >R.Col</a></li>'
		+ '<li><a href="" onclick="return false;" id="allHLink">All</a></li>'
		+ '</ul>'
		+ '</li>'
		+ '<li><a href="" onclick="return false;" >Show</a>'
		+ '<ul>'
		+ '<li><a href="" onclick="return false;" id="sbcSLink" >Sbar<br>Chat</a></li>'
		+ '<li><a href="" onclick="return false;" id="adsSLink" >Ads</a></li>'
		+ '<li><a href="" onclick="return false;" id="rcSLink" >R.Col</a></li>'
		+ '<li><a href="" onclick="return false;" id="allSLink">All</a></li>'
		+ '</ul>'
		+ '</li>'
		+ '</ul>'
		+ '</nav>'
);
//Fade effect on Menu when not in use
var zDisplayPanel   = $('div.gmSHL');
zDisplayPanel.hover(
    function () { $(this).stop(true, false).fadeTo(500,  1); },
    function () { $(this).stop(true, false).fadeTo(1000, 0.1); },
	function () { $(this).stop(true, false).fadeTo(2000, 0.05); }
);
zDisplayPanel.fadeTo(2000, 0.05);
//Declare majority of functions -  add right_col next version
function allHide() {
	var a_1, a_2, a_3, a_4, a_5;
	a_1 = document.getElementById('pagelet_dock');
	a_2 = document.getElementById('pagelet_sidebar');
	a_3 = document.getElementById('pagelet_ego_pane_w');
	a_4 = document.getElementById('pagelet_side_ads');
	a_5 = document.getElementById('rightCol');
	if (a_1) {a_1.style.display = 'none'; }
	if (a_2) {a_2.style.display = 'none'; }
	if (a_3) {a_3.style.display = 'none'; }
	if (a_4) {a_4.style.display = 'none'; }
	if (a_5) {a_5.style.display = 'none'; }
	GM_setValue("allHide", true);
}
function allShow() {
	var a_1, a_2, a_3, a_4, a_5;
	a_1 = document.getElementById('pagelet_dock');
	a_2 = document.getElementById('pagelet_sidebar');
	a_3 = document.getElementById('pagelet_ego_pane_w');
	a_4 = document.getElementById('pagelet_side_ads');
	a_5 = document.getElementById('rightCol');
	if (a_1) {a_1.style.display = ''; }
	if (a_2) {a_2.style.display = ''; }
	if (a_3) {a_3.style.display = ''; }
	if (a_4) {a_4.style.display = ''; }
	if (a_5) {a_5.style.display = 'inline'; }
	GM_setValue("allHide", false);
	GM_setValue("adsHide", false);
	GM_setValue("sbcHide", false);
}
function allShownc() {
	var a_1, a_2, a_3, a_4, a_5;
	a_1 = document.getElementById('pagelet_dock');
	a_2 = document.getElementById('pagelet_sidebar');
	a_3 = document.getElementById('pagelet_ego_pane_w');
	a_4 = document.getElementById('pagelet_side_ads');
	a_5 = document.getElementById('rightCol');
	if (a_1) {a_1.style.display = ''; }
	if (a_2) {a_2.style.display = ''; }
	if (a_3) {a_3.style.display = ''; }
	if (a_4) {a_4.style.display = ''; }
	if (a_5) {a_5.style.display = 'inline'; }
}
function adsHide() {
	var ad_1, ad_2;
	ad_1 = document.getElementById('pagelet_ego_pane_w');
	ad_2 = document.getElementById('pagelet_side_ads');
	if (ad_1) {ad_1.style.display = 'none'; }
	if (ad_2) {ad_2.style.display = 'none'; }
	GM_setValue("adsHide", true);
}
function adsShow() {
	var ad_1, ad_2;
	ad_1 = document.getElementById('pagelet_ego_pane_w');
	ad_2 = document.getElementById('pagelet_side_ads');
	if (ad_1) {ad_1.style.display = ''; }
	if (ad_2) {ad_2.style.display = ''; }
	GM_setValue("adsHide", false);
	GM_setValue("allHide", false);
}
function adsShownc() {
	var ad_1, ad_2;
	ad_1 = document.getElementById('pagelet_ego_pane_w');
	ad_2 = document.getElementById('pagelet_side_ads');
	if (ad_1) {ad_1.style.display = ''; }
	if (ad_2) {ad_2.style.display = ''; }
}
function sbcHide() {
	var sbc_1, sbc_2;
	sbc_1 = document.getElementById('pagelet_dock');
	sbc_2 = document.getElementById('pagelet_sidebar');
	if (sbc_1) {sbc_1.style.display = 'none'; }
	if (sbc_2) {sbc_2.style.display = 'none'; }
	GM_setValue("sbcHide", true);
}
function sbcShow() {
	var sbc_1, sbc_2;
	sbc_1 = document.getElementById('pagelet_dock');
	sbc_2 = document.getElementById('pagelet_sidebar');
	if (sbc_1) {sbc_1.style.display = ''; }
	if (sbc_2) {sbc_2.style.display = ''; }
	GM_setValue("sbcHide", false);
	GM_setValue("allHide", false);
}
function sbcShownc() {
	var sbc_1, sbc_2;
	sbc_1 = document.getElementById('pagelet_dock');
	sbc_2 = document.getElementById('pagelet_sidebar');
	if (sbc_1) {sbc_1.style.display = ''; }
	if (sbc_2) {sbc_2.style.display = ''; }
}
function rcHide() {
	var rc_1;
	rc_1 = document.getElementById('rightCol');
	if (rc_1) {rc_1.style.display = 'none'; }
	GM_setValue("rcHide", true);
}
function rcShow() {
	var rc_1;
	rc_1 = document.getElementById('rightCol');
	if (rc_1) {rc_1.style.display = 'inline'; }
	GM_setValue("rcHide", false);
	GM_setValue("allHide", false);
}
function rcShownc() {
	var rc_1;
	rc_1 = document.getElementById('rightCol');
	if (rc_1) {rc_1.style.display = 'inline'; }
}
//execution of stored values ORDER of these items is VERY important
if (!allHideStatus) { allShownc(); }
if (!sbcHideStatus) { sbcShownc(); }
if (!rcHideStatus) { rcShownc(); }
if (!adsHideStatus) { adsShownc(); }
if (adsHideStatus === true) {
	adsHide();
}
if (sbcHideStatus === true) {
	sbcHide();
}
if (rcHideStatus === true) {
	rcHide();
}
if (allHideStatus === true) {
	allHide();
}
$(document).ready(function () {
//capture clicks of menu to trigger events
var hl_1, sl_1, hl_2, sl_2, hl_3, sl_3, hl_4, sl_4;
hl_1 = document.getElementById('allHLink');
sl_1 = document.getElementById('allSLink');
hl_2 = document.getElementById('adsHLink');
sl_2 = document.getElementById('adsSLink');
hl_3 = document.getElementById('sbcHLink');
sl_3 = document.getElementById('sbcSLink');
hl_4 = document.getElementById('rcHLink');
sl_4 = document.getElementById('rcSLink');
if (hl_1 == null){
return;
} else {
hl_1.addEventListener("click", allHide, true);
sl_1.addEventListener("click", allShow, true);
hl_2.addEventListener("click", adsHide, true);
sl_2.addEventListener("click", adsShow, true);
hl_3.addEventListener("click", sbcHide, true);
sl_3.addEventListener("click", sbcShow, true);
hl_4.addEventListener("click", rcHide, true);
sl_4.addEventListener("click", rcShow, true);
//$(document).ready(function () {
	$('.navFBnoprob li').hover(
		function () {
			$('ul', this).fadeIn();
		},
		function () {
			$('ul', this).fadeOut();
		}
	);
}
});
