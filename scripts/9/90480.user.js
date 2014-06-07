// ==UserScript==
// @name           Ikariam themes
// @version 1.1
// @history	   1.1 One new link
// @history	   1.0 Script created
// @description    You can select theme you want to use in ikariam.
// @include        http://s*.*.ikariam*/*
// @require        http://userscripts.org/scripts/source/57756.user.js
// @exclude        http://support.*.ikariam.*/*
// @exclude        http://board.*.ikariam.*/*
// ==/UserScript==

// Check for updates

ScriptUpdater.check(90480, '1.1');


var vers = "1.1"
var url = location.href
var p = url.split('.');
var serv = p[0].replace("http://","");
var lang = p[1];
var c2 = p[3].replace("/index","");

 

// Get theme

var theme = GM_getValue("ctheme");

// Themes

// 1, Ikariam

if(theme=="Ikariam")

{

}

// 2, City level 1 (By Finlandboy)

if(theme=="City level 1")          

{                            

GM_addStyle("#city #container .phase1                                           {background-image:url(http://s1.ikariam.org/skin/img/city/city_level1.jpg)}");
GM_addStyle("#city #container .phase2                                           {background-image:url(http://s1.ikariam.org/skin/img/city/city_level1.jpg)}");
GM_addStyle("#city #container .phase3                                           {background-image:url(http://s1.ikariam.org/skin/img/city/city_level1.jpg)}");
GM_addStyle("#city #container .phase4                                           {background-image:url(http://s1.ikariam.org/skin/img/city/city_level1.jpg)}");
GM_addStyle("#city #container .phase5                                           {background-image:url(http://s1.ikariam.org/skin/img/city/city_level1.jpg)}");
GM_addStyle("#city #container .phase6                                           {background-image:url(http://s1.ikariam.org/skin/img/city/city_level1.jpg)}");
GM_addStyle("#city #container .phase7                                           {background-image:url(http://s1.ikariam.org/skin/img/city/city_level1.jpg)}");
GM_addStyle("#city #container .phase8                                           {background-image:url(http://s1.ikariam.org/skin/img/city/city_level1.jpg)}");
GM_addStyle("#city #container .phase9                                           {background-image:url(http://s1.ikariam.org/skin/img/city/city_level1.jpg)}");
GM_addStyle("#city #container .phase10                                          {background-image:url(http://s1.ikariam.org/skin/img/city/city_level1.jpg)}");
GM_addStyle("#city #container .phase11                                          {background-image:url(http://s1.ikariam.org/skin/img/city/city_level1.jpg)}");
GM_addStyle("#city #container .phase12                                          {background-image:url(http://s1.ikariam.org/skin/img/city/city_level1.jpg)}");
GM_addStyle("#city #container .phase13                                          {background-image:url(http://s1.ikariam.org/skin/img/city/city_level1.jpg)}");
GM_addStyle("#city #container .phase14                                          {background-image:url(http://s1.ikariam.org/skin/img/city/city_level1.jpg)}");
GM_addStyle("#city #container .phase15                                          {background-image:url(http://s1.ikariam.org/skin/img/city/city_level1.jpg)}");
GM_addStyle("#city #container .phase16                                          {background-image:url(http://s1.ikariam.org/skin/img/city/city_level1.jpg)}");
GM_addStyle("#city #container .phase17                                          {background-image:url(http://s1.ikariam.org/skin/img/city/city_level1.jpg)}");
GM_addStyle("#city #container .phase18                                          {background-image:url(http://s1.ikariam.org/skin/img/city/city_level1.jpg)}");
GM_addStyle("#city #container .phase19                                          {background-image:url(http://s1.ikariam.org/skin/img/city/city_level1.jpg)}");
GM_addStyle("#city #container .phase20                                          {background-image:url(http://s1.ikariam.org/skin/img/city/city_level1.jpg)}");
GM_addStyle("#city #container .phase21                                          {background-image:url(http://s1.ikariam.org/skin/img/city/city_level1.jpg)}");
GM_addStyle("#city #container .phase22                                          {background-image:url(http://s1.ikariam.org/skin/img/city/city_level1.jpg)}");
GM_addStyle("#city #container .phase23                                          {background-image:url(http://s1.ikariam.org/skin/img/city/city_level1.jpg)}");
GM_addStyle("#city #container .phase24                                          {background-image:url(http://s1.ikariam.org/skin/img/city/city_level1.jpg)}");
GM_addStyle("#city #container .phase25                                          {background-image:url(http://s1.ikariam.org/skin/img/city/city_level1.jpg)}");
GM_addStyle("#city #container .phase26                                          {background-image:url(http://s1.ikariam.org/skin/img/city/city_level1.jpg)}");
GM_addStyle("#city #container .phase27                                          {background-image:url(http://s1.ikariam.org/skin/img/city/city_level1.jpg)}");
GM_addStyle("#city #container .phase28                                          {background-image:url(http://s1.ikariam.org/skin/img/city/city_level1.jpg)}");
GM_addStyle("#city #container .phase29                                          {background-image:url(http://s1.ikariam.org/skin/img/city/city_level1.jpg)}");


}

// 3, City lvl 24 (By Finlandboy)

if(theme=="City level 24")          

{                            

GM_addStyle("#city #container .phase1                                           {background-image:url(http://s1.ikariam.org/skin/img/city/city_level24.jpg)}");
GM_addStyle("#city #container .phase2                                           {background-image:url(http://s1.ikariam.org/skin/img/city/city_level24.jpg)}");
GM_addStyle("#city #container .phase3                                           {background-image:url(http://s1.ikariam.org/skin/img/city/city_level24.jpg)}");
GM_addStyle("#city #container .phase4                                           {background-image:url(http://s1.ikariam.org/skin/img/city/city_level24.jpg)}");
GM_addStyle("#city #container .phase5                                           {background-image:url(http://s1.ikariam.org/skin/img/city/city_level24.jpg)}");
GM_addStyle("#city #container .phase6                                           {background-image:url(http://s1.ikariam.org/skin/img/city/city_level24.jpg)}");
GM_addStyle("#city #container .phase7                                           {background-image:url(http://s1.ikariam.org/skin/img/city/city_level24.jpg)}");
GM_addStyle("#city #container .phase8                                           {background-image:url(http://s1.ikariam.org/skin/img/city/city_level24.jpg)}");
GM_addStyle("#city #container .phase9                                           {background-image:url(http://s1.ikariam.org/skin/img/city/city_level24.jpg)}");
GM_addStyle("#city #container .phase10                                          {background-image:url(http://s1.ikariam.org/skin/img/city/city_level24.jpg)}");
GM_addStyle("#city #container .phase11                                          {background-image:url(http://s1.ikariam.org/skin/img/city/city_level24.jpg)}");
GM_addStyle("#city #container .phase12                                          {background-image:url(http://s1.ikariam.org/skin/img/city/city_level24.jpg)}");
GM_addStyle("#city #container .phase13                                          {background-image:url(http://s1.ikariam.org/skin/img/city/city_level24.jpg)}");
GM_addStyle("#city #container .phase14                                          {background-image:url(http://s1.ikariam.org/skin/img/city/city_level24.jpg)}");
GM_addStyle("#city #container .phase15                                          {background-image:url(http://s1.ikariam.org/skin/img/city/city_level24.jpg)}");
GM_addStyle("#city #container .phase16                                          {background-image:url(http://s1.ikariam.org/skin/img/city/city_level24.jpg)}");
GM_addStyle("#city #container .phase17                                          {background-image:url(http://s1.ikariam.org/skin/img/city/city_level24.jpg)}");
GM_addStyle("#city #container .phase18                                          {background-image:url(http://s1.ikariam.org/skin/img/city/city_level24.jpg)}");
GM_addStyle("#city #container .phase19                                          {background-image:url(http://s1.ikariam.org/skin/img/city/city_level24.jpg)}");
GM_addStyle("#city #container .phase20                                          {background-image:url(http://s1.ikariam.org/skin/img/city/city_level24.jpg)}");
GM_addStyle("#city #container .phase21                                          {background-image:url(http://s1.ikariam.org/skin/img/city/city_level24.jpg)}");
GM_addStyle("#city #container .phase22                                          {background-image:url(http://s1.ikariam.org/skin/img/city/city_level24.jpg)}");
GM_addStyle("#city #container .phase23                                          {background-image:url(http://s1.ikariam.org/skin/img/city/city_level24.jpg )}");

}

// 4, Premium (By Finlandboy) 

if(theme=="Premium")

{

GM_addStyle('#advisors #advCities a.normal { background-image:url(http://s1.ikariam.org/skin/layout/advisors/mayor_premium.gif); }');
GM_addStyle('#advisors #advCities a.normalactive { background-image:url(http://s1.ikariam.org/skin/layout/advisors/mayor_premium_active.gif); }');

GM_addStyle('#advisors #advMilitary a.normal { background-image:url(http://s1.ikariam.org/skin/layout/advisors/general_premium.gif); }');
GM_addStyle('#advisors #advMilitary a.normalalert {background-image:url(http://s1.ikariam.org/skin/layout/advisors/general_premium_alert.gif);}');
GM_addStyle('#advisors #advMilitary a.normalactive { background-image:url(http://s1.ikariam.org/skin/layout/advisors/general_premium_active.gif);}');

GM_addStyle('#advisors #advResearch a.normal { background-image:url(http://s1.ikariam.org/skin/layout/advisors/scientist_premium.gif); }');
GM_addStyle('#advisors #advResearch a.normalactive { background-image:url(http://s1.ikariam.org/skin/layout/advisors/scientist_premium_active.gif); }');

GM_addStyle('#advisors #advDiplomacy a.normal { background-image:url(http://s1.ikariam.org/skin/layout/advisors/diplomat_premium.gif); }');
GM_addStyle('#advisors #advDiplomacy a.normalactive { background-image:url(http://s1.ikariam.org/skin/layout/advisors/diplomat_premium_active.gif); }');


}

// Options, fi


if(document.getElementById('options'))
{

if(lang == "fi")
{
var element = document.getElementById("deletionMode");
var options = document.createElement('div');
var innerHTML = '<div class="contentBox01h">';
innerHTML += '<h3 class="header"><span class="textLabel">Ikariam Themes</span></h3>';
innerHTML += '<div class="content">';
innerHTML += '<br />';
innerHTML += '<h3>Teema</h3><br>';
innerHTML += '<div class="centerButton">';
innerHTML += '<b>Nykyinen teema:</b>';
innerHTML += ' '+theme+'<br><br>';
innerHTML += '<b>Uusi teema:</b><br>';
innerHTML += '<select id="newtheme">';
innerHTML += '<option>Ikariam</option>';
innerHTML += '<option>City level 1</option>';
innerHTML += '<option>City level 24</option>';
innerHTML += '<option>Premium</option>';
innerHTML += '</select><br>';
innerHTML += '<br><br><a class="button" id="save">Tallenna asetukset</a>'
innerHTML += '<br />';
innerHTML += '<br><h3>Tiedot</h3>';
innerHTML += '<table cellpadding="0" cellspacing="0">';
innerHTML += '<tr>';
innerHTML += '<th>Versio</th>';
innerHTML += '<td>'+vers+'</td>';
innerHTML += '</tr>';
innerHTML += '<tr>';
innerHTML += '<th>Maa/kieli</th>';
innerHTML += '<td>'+lang+'</td>';
innerHTML += '</tr>';
innerHTML += '<tr>';
innerHTML += '<th>Serveri</th>';
innerHTML += '<td>'+serv+'</td>';
innerHTML += '</tr>';
innerHTML += '</table>';
innerHTML += '<br><h3>Linkit</h3>';
innerHTML += '<br><br>| <a href="http://userscripts.org" target="_blank">Userscripts</a> | <a href="http://userscripts.org" target="_blank">Anna palautetta</a> | <a href="http://userscripts.org/topics/63442" target="_blank"> | Lähetä teemasi meille</a> |';
innerHTML += '</div>';
innerHTML += '</div>';
innerHTML += '<div class="footer"></div>';
innerHTML += '</div>';
options.innerHTML = innerHTML;
element.parentNode.insertBefore(options, element.nextSibling);
}

// Options, else

else
{

var element = document.getElementById("deletionMode");
var options = document.createElement('div');
var innerHTML = '<div class="contentBox01h">';
innerHTML += '<h3 class="header"><span class="textLabel">Ikariam Themes</span></h3>';
innerHTML += '<div class="content">';
innerHTML += '<br />';
innerHTML += '<h3>Theme</h3><br>';
innerHTML += '<div class="centerButton">';
innerHTML += '<b>Current theme:</b>';
innerHTML += ' '+theme+'<br><br>';
innerHTML += '<b>New theme:</b><br>';
innerHTML += '<select id="newtheme">';
innerHTML += '<option>Ikariam</option>';
innerHTML += '<option>City level 1</option>';
innerHTML += '<option>City level 24</option>';
innerHTML += '<option>Premium</option>';
innerHTML += '</select><br>';
innerHTML += '<br><br><a class="button" id="save">Save settings</a>'
innerHTML += '<br />';
innerHTML += '<br><h3>Information</h3>';
innerHTML += '<table cellpadding="0" cellspacing="0">';
innerHTML += '<tr>';
innerHTML += '<th>Version</th>';
innerHTML += '<td>'+vers+'</td>';
innerHTML += '</tr>';
innerHTML += '<tr>';
innerHTML += '<th>Country/language</th>';
innerHTML += '<td>'+lang+'</td>';
innerHTML += '</tr>';
innerHTML += '<tr>';
innerHTML += '<th>Server</th>';
innerHTML += '<td>'+serv+'</td>';
innerHTML += '</tr>';
innerHTML += '</table>';
innerHTML += '<br><h3>Links</h3>';
innerHTML += '<br><br>| <a href="http://userscripts.org" target="_blank">Userscripts</a> | <a href="http://userscripts.org" target="_blank">Review</a> |  <a href="http://userscripts.org/topics/63442" target="_blank"> | Send us your theme</a> | ';
innerHTML += '</div>';
innerHTML += '</div>';
innerHTML += '<div class="footer"></div>';
innerHTML += '</div>';
options.innerHTML = innerHTML;
element.parentNode.insertBefore(options, element.nextSibling);

}

}

// Save options

document.getElementById("save").addEventListener("click", function()
	{
	var gettheme = document.getElementById("newtheme").value;
	GM_setValue("ctheme",gettheme)
        location.href="?view=options";
	}
	, false);


