// ==UserScript==
// @name           Layout Options for StumbleUpon
// @namespace      thlayli.detrave.net
// @description    Provides options for hiding or modifying various parts of the StumbleUpon interface.
// @include        http://*.stumbleupon.com/*
// @license        http://www.gnu.org/copyleft/gpl.html
// @version        2.0.3
// ==/UserScript==

// user variables
var hoverEditDelete = true; //false to leave Edit/Delete links alone
var seeThruSidebar = true; //false to make floating sidebar opaque

// auto-update variables
var script_title = 'Layout Options for StumbleUpon';
var source_location = 'http://thlayli.detrave.net/su-layoutoptions.user.js';
var version_holder = 'http://thlayli.detrave.net/su-layoutoptions.version.txt';
var current_version = '2.0.3';
var latest_version = '';
var manual_check = true;
var lastupdatecheck = GM_getValue('Updated', 'never');

CheckForUpdate();
GM_registerMenuCommand('Update - '+script_title, CheckVersion);

var floatingSidebar = document.createElement('div');
var wrapperDiv = xpath(document, "//div[@class='contentWrapper']/div[@class='wrapperFlex']").snapshotItem(0);
var wrapperFlexDivs = xpath(document, "//div[@class='wrapperFlex']");
var commandDivs = xpath(document, "//dt/span[contains(@class,'cmds')]");
var navDiv = xpath(document, "//div[@class='nav']").snapshotItem(0);
var barBgImg = getStyle(navDiv, 'background-image');
var originalNavStyle = navDiv.getAttribute("style");
var subnavDiv = xpath(document, "//div[@class='subnav']").snapshotItem(0);
var curTab = xpath(document,"//ul/li[@class='current']").snapshotItem(0);
var searchForm = xpath(document, "//form[@action='http://www.stumbleupon.com/search']").snapshotItem(0);
var loginForm = xpath(document, "//div[@class='right form']").snapshotItem(0);
var suLogo = document.getElementById("logo");
var originalLogoHtml = suLogo.innerHTML;
var mainTd = xpath(document, "//tr/td/parent::tr/following-sibling::tr/td[contains(@class, 'main')]").snapshotItem(0);
var sidebarTd = xpath(document, "//td[@class='sidebar']").snapshotItem(0);
var footerContent = xpath(document, "//div[@class='footer']/div").snapshotItem(0);
var logoutLink = xpath(document, "//a[@href='http://www.stumbleupon.com/login.php?logout=1']").snapshotItem(0);
var welcomeLink = xpath(document, "//a[contains(@href,'.stumbleupon.com/public/')]").snapshotItem(0);
var customNavbarString = GM_getValue('navbarTags', 'news,photos,videos,arts,business,computers,health,fun,lifestyle,music,science,sports,technology').replace(/,/g,', ');
var customNavbarLinks = new Array();

// create home link
var homeSpan = document.createElement('span');
homeSpan.className = 'textDisabled';
logoutLink.parentNode.appendChild(homeSpan);
var homeLink = document.createElement('a');
homeLink.className = 'textDisabled subDividerLeft pdgLeft pdgRightSm';
homeLink.href = welcomeLink.href.replace("public/","");
homeLink.innerHTML = 'your home';
homeSpan.appendChild(homeLink);

rewriteNavbar();

if(sidebarTd){	

	var originalHtml = sidebarTd.innerHTML;
	// store sidebar size
	var sidebarWidth = sidebarTd.scrollWidth;
	var sidebarTop = sidebarTd.offsetTop;
	var sidebarLeft = sidebarTd.offsetLeft;

	// create sidebar switch
	var sidebarSwitchText = (GM_getValue("showSidebar", true) == true) ? "hide sidebar" : "show sidebar";
	var sidebarSwitch = document.createElement('a');
	sidebarSwitch.className = 'textDisabled subDividerLeft pdgLeft';
	sidebarSwitch.href = "javascript:void(0);";
	sidebarSwitch.innerHTML = sidebarSwitchText;
	logoutLink.parentNode.appendChild(sidebarSwitch);
	
	// create layout options
	var layoutOptionsHtml = '<div class="section clearfix" id="layout_options"><h3>Layout Options</h3>';

	// add search switch
	var searchText = (GM_getValue("hideSearch", false) == true) ? "Show search box" : "Hide search box";
	layoutOptionsHtml += '<ul class="liArrow"><li><a class="textUncolor" href="javascript:void(0);" id="search_switch">' + searchText + '</a></li></ul>';

	// add footer switch
	var footerText = (GM_getValue("hideFooter", false) == true) ? "Show footer links" : "Hide footer links";
	layoutOptionsHtml += '<ul class="liArrow"><li><a class="textUncolor" href="javascript:void(0);" id="footer_switch">' + footerText + '</a></li></ul>';

	// add logout switch
	var logoutText = (GM_getValue("hideFooter", false) == true) ? "Show logout link" : "Hide logout link";
	layoutOptionsHtml += '<ul class="liArrow"><li><a class="textUncolor" href="javascript:void(0);" id="logout_switch">' + logoutText + '</a></li></ul>';

	// add home switch
	var homeText = (GM_getValue("hideFooter", false) == true) ? "Show home link" : "Hide home link";
	layoutOptionsHtml += '<ul class="liArrow"><li><a class="textUncolor" href="javascript:void(0);" id="home_switch">' + homeText + '</a></li></ul>';


	// add nav switch
	var navText = (GM_getValue("hideNav", false) == true) ? "Show navigation bar" : "Hide navigation bar";
	layoutOptionsHtml += '<ul class="liArrow"><li><a class="textUncolor" href="javascript:void(0);" id="nav_switch">' + navText + '</a></li></ul>';

	// add float switch
	var floatText = (GM_getValue("floatingSidebar", false) == true) ? "Disable floating sidebar" : "Enable floating sidebar";
	layoutOptionsHtml += '<ul class="liArrow"><li><a class="textUncolor" href="javascript:void(0);" id="float_switch">' + floatText + '</a></li></ul>';

	layoutOptionsHtml += '<br>';
	// add customize nav bar form
	layoutOptionsHtml += '<h3>Custom navigation bar links:</h3></ul><textarea id="navbar_links" style="display: none; background: ' + getStyle(document.body, 'background-color') + '; color: ' + getStyle(document.body, 'color') + '; border: 1px solid ' + getStyle(welcomeLink, 'color') + '; width: 180px; height: 120px;">' + customNavbarString + '</textarea> ';

	// add customize nav bar form
	layoutOptionsHtml += '<a class="textUncolor" href="javascript:void(0);" id="save_navbar" style="display: none;">Save changes</a> ';
	layoutOptionsHtml += '<a class="textUncolor" href="javascript:void(0);" id="edit_navbar">Edit links</a>';

	// close layout options
	layoutOptionsHtml += '</div>';

	// initialize sidebar
	if(GM_getValue("floatingSidebar", false) == true){
		createFloatingSidebar();
		removeNormalSidebar();
	}else{
		// add float switch to normal sidebar
		sidebarTd.innerHTML += layoutOptionsHtml;
	}
	if(GM_getValue("showSidebar", true) == false)
		GM_hideSidebar();

	resizeSubnav();

	// shift login section
	loginForm.style.position = 'relative';
	loginForm.style.left = '-30px';

	// event listeners
	unsafeWindow.onresize = positionSidebar;
	sidebarSwitch.addEventListener('click', toggleSidebar, false);
	setEventListeners();

}

// restore hover edit/delete commands
if(hoverEditDelete){
	for(i=0;i<commandDivs.snapshotLength;i++){
		commandDivs.snapshotItem(i).style.display = "none";
		commandDivs.snapshotItem(i).parentNode.parentNode.addEventListener('mouseover', showCmd, false);
		commandDivs.snapshotItem(i).parentNode.parentNode.addEventListener('mouseout', hideCmd, false);
	}
}

// hide footer
if(GM_getValue("hideFooter", false) == true){
	footerContent.style.display = "none";
}

// hide logout
if(GM_getValue("hideLogout", true) == true){
	logoutLink.style.display = "none";
}

// hide home
if(GM_getValue("hideHome", true) == true){
	homeLink.style.display = "none";
}

// hide navbar
if(GM_getValue("hideNav", false) == true){
	navDiv.setAttribute('style', 'height: 1px; background-image: ' + barBgImg + ' !important; background-position: 0 -29px;');
	if(curTab)
		curTab.className = '';
	if(subnavDiv && subnavDiv.textContent == '')
		subnavDiv.style.display = 'none';
	floatingSidebar.style.top = (sidebarTop + 20) + "px";
}

// hide search section
if(GM_getValue("hideSearch", false) == true){
	searchForm.style.display = 'none';
	suLogo.style.height = "25px";
	suLogo.innerHTML = '<a href="http://www.stumbleupon.com/"><img src="http://cdn.stumble-upon.com/images/logo_su_36x36.png" style="height: 18px; position: relative; top: 2px;"></a><h2 style="display: inline;"> <a href="http://www.stumbleupon.com/">StumbleUpon</a></h2>';
	suLogo.parentNode.style.marginTop = "2px";
}

// functions 

function positionSidebar(){
	var sidebarMargin = Math.round((document.body.clientWidth - getComputedStyle(mainTd, "").width.replace("px","")) / 2);
	if(sidebarMargin < (sidebarWidth + 20)){
		floatingSidebar.style.left = (document.body.clientWidth - sidebarWidth - 20)  + "px";
		var borderColor = getComputedStyle(document.body, "").getPropertyValue('color');
		floatingSidebar.style.border = "1px solid " + borderColor;
	}else{
		floatingSidebar.style.left = (document.body.clientWidth - sidebarMargin)  + "px";
		floatingSidebar.style.border = "none";
	}
}

function createFloatingSidebar(){
	var topAdjust = (GM_getValue('hideNav', false) == true) ? 20 : 45;
	floatingSidebar.style.top = (sidebarTop + topAdjust) + 'px';
	if(seeThruSidebar == true)
		floatingSidebar.style.MozOpacity = '0.95';
	floatingSidebar.style.position = 'absolute';
	floatingSidebar.style.padding = '5px';
	floatingSidebar.style.background = document.bgColor;
	floatingSidebar.style.backgroundImage = getComputedStyle(document.body, "").getPropertyValue('background-image');
	positionSidebar();
	floatingSidebar.innerHTML = '<table width="'+ sidebarWidth +'" cellspacing="0" cellpadding="0" border="0"><tbody><tr><td class="sidebar">' + originalHtml + layoutOptionsHtml + '</td></tr></tbody></table>';
	document.body.appendChild(floatingSidebar);
}

function removeNormalSidebar(){
	sidebarTd.parentNode.removeChild(sidebarTd);
	if(wrapperDiv)
		wrapperDiv.style.width = "800px";
	for(i=0;i<wrapperFlexDivs.snapshotLength;i++)
		wrapperFlexDivs.snapshotItem(i).style.width = "800px";
	if(mainTd)
		mainTd.style.width = "800px";
}

function replaceNormalSidebar(){
	sidebarTd = document.createElement('td');
	sidebarTd.className = "sidebar";
	sidebarTd.innerHTML = originalHtml + layoutOptionsHtml;
	mainTd.parentNode.appendChild(sidebarTd);
	wrapperDiv.style.width = "";
	mainTd.style.width = "";
	for(i=0;i<wrapperFlexDivs.snapshotLength;i++)
		wrapperFlexDivs.snapshotItem(i).style.width = "";
}

function GM_showSidebar(){
	if(GM_getValue("floatingSidebar", false) == true){
		floatingSidebar.style.display = "";
	}else{
		sidebarTd.style.display = "";
		wrapperDiv.style.width = "";
		mainTd.style.width = "";
		resizeSubnav();
	}
}

function GM_hideSidebar(){
	if(GM_getValue("floatingSidebar", false) == true){
		floatingSidebar.style.display = "none";
	}else{
		sidebarTd.style.display = "none";
		wrapperDiv.style.width = "800px";
		mainTd.style.width = "800px";
		resizeSubnav();
	}
}

function resizeSubnav(){

	wrapperFlexDivs = xpath(document, "//div[@class='wrapperFlex']");
	for(i=0;i<wrapperFlexDivs.snapshotLength;i++){
		wrapperFlexDivs.snapshotItem(i).style.width = getStyle(wrapperDiv, 'width');
	}
}

function setEventListeners(){
	document.getElementById('float_switch').addEventListener('click', toggleFloating, false);
	document.getElementById('search_switch').addEventListener('click', toggleSearch, false);
	document.getElementById('nav_switch').addEventListener('click', toggleNav, false);
	document.getElementById('footer_switch').addEventListener('click', toggleFooter, false);
	document.getElementById('logout_switch').addEventListener('click', toggleLogout, false);
	document.getElementById('home_switch').addEventListener('click', toggleHome, false);
	document.getElementById('navbar_links').addEventListener('keyup', changeNavbar, false);
	document.getElementById('save_navbar').addEventListener('click', saveNavbar, false);
	document.getElementById('edit_navbar').addEventListener('click', editNavbar, false);
}

function removeEventListeners(){
	document.getElementById('float_switch').removeEventListener('click', toggleFloating, false);
	document.getElementById('search_switch').removeEventListener('click', toggleSearch, false);
	document.getElementById('nav_switch').removeEventListener('click', toggleNav, false);
	document.getElementById('footer_switch').removeEventListener('click', toggleFooter, false);
	document.getElementById('logout_switch').removeEventListener('click', toggleLogout, false);
	document.getElementById('home_switch').removeEventListener('click', toggleHome, false);
	document.getElementById('navbar_links').removeEventListener('keyup', changeNavbar, false);
	document.getElementById('save_navbar').removeEventListener('click', saveNavbar, false);
	document.getElementById('edit_navbar').addEventListener('click', editNavbar, false);
}

function editNavbar(){
	document.getElementById('navbar_links').value = GM_getValue('navbarTags', 'news,photos,videos,arts,business,computers,health,fun,lifestyle,music,science,sports,technology').replace(/,/g,', ');
	document.getElementById('navbar_links').style.display = "";
	document.getElementById('save_navbar').style.display = "";
	document.getElementById('edit_navbar').style.display = "none";
}

function changeNavbar(){
	document.getElementById('save_navbar').style.display = "";
	customNavbarString = document.getElementById('navbar_links').value;
}

function saveNavbar(){
	customNavbarString = (customNavbarString != '') ? document.getElementById('navbar_links').value.replace(/, +| +,/g,',') : 'news,photos,videos,arts,business,computers,health,fun,lifestyle,music,science,sports,technology';
	GM_setValue('navbarTags', customNavbarString);
	document.getElementById('navbar_links').style.display = "none";
	document.getElementById('save_navbar').style.display = "none";
	document.getElementById('edit_navbar').style.display = "";
	rewriteNavbar();
}

function rewriteNavbar(){
	customNavbarLinks = customNavbarString.split(',');
	var navHtml = navDiv.innerHTML.split("<ul>")[0] + "<ul>";
	for(i=0;i<customNavbarLinks.length;i++){
		var tag = customNavbarLinks[i].replace(/^ | $/g,'');
		tag = tag.replace(/ /g,'-').toLowerCase();
		var multiwordTags = tag.split('-');
			for(j=0;j<multiwordTags.length;j++)
				multiwordTags[j] = multiwordTags[j].charAt(0).toUpperCase() + multiwordTags[j].substring(1,multiwordTags[j].length).toLowerCase();
		var properCaseTag = multiwordTags.join(' ');
		navHtml += '<li><a href="http://www.stumbleupon.com/tag/' + tag + '/">' + properCaseTag + "</a></li>\n";
	}
	navHtml += "</ul>" + navDiv.innerHTML.split("</ul>")[1];
	navDiv.innerHTML = navHtml;
}

function toggleSidebar(){
	if(GM_getValue("showSidebar", true == true)){
		sidebarSwitch.innerHTML = "show sidebar";
		GM_setValue("showSidebar", false);
		GM_hideSidebar();
	}else{
		sidebarSwitch.innerHTML = "hide sidebar";
		GM_setValue("showSidebar", true);
		GM_showSidebar();
	}
	resizeSubnav();
}

function toggleFloating(){
	removeEventListeners();
	if(GM_getValue("floatingSidebar", false) == true){
		GM_setValue("floatingSidebar", false);
		replaceNormalSidebar();
		floatingSidebar.parentNode.removeChild(floatingSidebar);
		document.getElementById('float_switch').innerHTML = "Enable floating sidebar";
	}else{
		GM_setValue("floatingSidebar", true);
		removeNormalSidebar();
		createFloatingSidebar();
		document.getElementById('float_switch').innerHTML = "Disable floating sidebar";
	}
	resizeSubnav();
	setEventListeners();
}

function toggleSearch(){
	if(GM_getValue("hideSearch", false) == true){
		GM_setValue("hideSearch", false);
		document.getElementById('search_switch').innerHTML = "Hide search box";
		searchForm.style.display = '';
		suLogo.style.height = "";
		suLogo.innerHTML = originalLogoHtml;
		suLogo.parentNode.style.marginTop = "";
	}else{
		GM_setValue("hideSearch", true);
		document.getElementById('search_switch').innerHTML = "Show search box";
		searchForm.style.display = 'none';
		suLogo.style.height = "25px";
		suLogo.innerHTML = '<a href="http://www.stumbleupon.com/"><img src="http://cdn.stumble-upon.com/images/logo_su_36x36.png" style="height: 18px; position: relative; top: 2px;"></a><h2 style="display: inline;"> <a href="http://www.stumbleupon.com/">StumbleUpon</a></h2>';
		suLogo.parentNode.style.marginTop = "2px";
	}
}

function toggleNav(){
	if(GM_getValue("hideNav", false) == true){
		GM_setValue("hideNav", false);
		document.getElementById('nav_switch').innerHTML = "Hide navigation bar";
		navDiv.setAttribute('style', originalNavStyle);
		if(curTab)
			curTab.className = 'current';
		if(subnavDiv && subnavDiv.textContent == '')
				subnavDiv.style.display = '';
	}else{
		GM_setValue("hideNav", true);
		document.getElementById('nav_switch').innerHTML = "Show navigation bar";
		navDiv.setAttribute('style', 'height: 1px; background-image: ' + barBgImg + ' !important; background-position: 0 -29px;');
		if(curTab)
			curTab.className = '';
		if(subnavDiv && subnavDiv.textContent == '')
				subnavDiv.style.display = 'none';
	}
	var topAdjust = (GM_getValue('hideNav', false) == true) ? 20 : 45;
	floatingSidebar.style.top = (sidebarTop + topAdjust) + "px";
}


function toggleFooter(){
	if(GM_getValue("hideFooter", false) == true){
		GM_setValue("hideFooter", false);
		document.getElementById('footer_switch').innerHTML = "Hide footer links";
		footerContent.style.display = "";
	}else{
		GM_setValue("hideFooter", true);
		document.getElementById('footer_switch').innerHTML = "Show footer links";
		footerContent.style.display = "none";
	}
}

function toggleLogout(){
	if(GM_getValue("hideLogout", false) == true){
		GM_setValue("hideLogout", false);
		document.getElementById('logout_switch').innerHTML = "Hide logout link";
		logoutLink.style.display = "";
	}else{
		GM_setValue("hideLogout", true);
		document.getElementById('logout_switch').innerHTML = "Show logout link";
		logoutLink.style.display = "none";
	}
}


function toggleHome(){
	if(GM_getValue("hideHome", false) == true){
		GM_setValue("hideHome", false);
		document.getElementById('home_switch').innerHTML = "Hide home link";
		homeLink.style.display = "";
	}else{
		GM_setValue("hideHome", true);
		document.getElementById('home_switch').innerHTML = "Show home link";
		homeLink.style.display = "none";
	}
}


function hideCmd(){
	if(this.firstChild.firstChild.nodeName == "A")
		this.firstChild.nextSibling.firstChild.style.display = "none";
	else
		this.firstChild.firstChild.style.display = "none";
}

function showCmd(){
	if(this.firstChild.firstChild.nodeName == "A")
		this.firstChild.nextSibling.firstChild.style.display = "block";
	else
		this.firstChild.firstChild.style.display = "block";
}

function xpath(obj,query) {
    return document.evaluate(query, obj, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

function xpath_iter(obj,query) {
    return document.evaluate(query, obj, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
}

function getStyle(oElm, strCssRule){
	var strValue = "";
	if(document.defaultView && document.defaultView.getComputedStyle){
		strValue = document.defaultView.getComputedStyle(oElm, "").getPropertyValue(strCssRule);
	}
	else if(oElm.currentStyle){
		strCssRule = strCssRule.replace(/\-(\w)/g, function (strMatch, p1){
			return p1.toUpperCase();
		});
		strValue = oElm.currentStyle[strCssRule];
	}
	return strValue;
}

// Userscript Auto-Update - http://userscripts.org/scripts/show/22372 - edited July 18 2008 by Nathan Blume

function GetNewVersion() {
        var today = new Date();
        GM_setValue('Updated', String(today));
        window.location = source_location;
}

function CheckForUpdate(){   
    var today = new Date();
    var one_day = 24 * 60 * 60 * 1000; //One day in milliseconds
    if(lastupdatecheck != 'never'){
        today = today.getTime(); //Get today's date
        lastupdatecheck = new Date(lastupdatecheck).getTime();
        var interval = (today - lastupdatecheck) / one_day; //Find out how many days have passed       
        if(interval >= 7){
			manual_check = false;
            CheckVersion();
		}
    }else{
        lastupdatecheck = new Date(lastupdatecheck).getTime();
		manual_check = false;
        CheckVersion();
	}
}

function CheckVersion(){
    GM_xmlhttpRequest({
            method: 'GET',
            url: version_holder,
            headers: {'Content-type':'application/x-www-form-urlencoded'},           
            onload: function(responseDetails){
                var latest_version = responseDetails.responseText.match(/version=([0-9\.]+)/);
                if(latest_version[1] != null && latest_version[1] != 'undefined'){
                    if(current_version != latest_version[1]){
                        if(confirm('A more recent version of ' + script_title + ' (' + latest_version[1] + ') has been found.\nWould you like to get it now?'))
                            GetNewVersion();
                        else
                            AskForReminder();
                    }else{
						SkipWeeklyUpdateCheck();
						if(manual_check == true)
							alert('You have the latest version of ' + script_title + '.');
					}
                }else{
                    alert('Sorry, there was problem checking for the update.\nPlease try again later.');
                }
            }
        });
}

function AskForReminder(){
    if(confirm('Would you like to be reminded in 24 hours ?\n(Cancel to be reminded in one week.)')){
        var today = new Date();
        today = today.getTime();       
        var sixdays_ms = 6 * 24 * 60 * 60 * 1000;
        var sda_ms = today - sixdays_ms;       
        var sixdaysago = new Date(sda_ms)
        GM_setValue('Updated', String(sixdaysago));
    }else{
        SkipWeeklyUpdateCheck();
	}
}

function SkipWeeklyUpdateCheck(){
    var today = new Date();
    GM_setValue('Updated', String(today));
}