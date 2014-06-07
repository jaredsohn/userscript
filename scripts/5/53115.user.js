// ---*GNU*---
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// http://www.gnu.org/copyleft/gpl.html
// ---*---

// ==UserScript==
// == July 5, 2009 - Updated by Rollinns (LB)- 
// @name           Craigslist Redesign, Reskin with Basic only mode
// @namespace      http://userscripts.org/scripts/show/44660
// @description    Craigslist Enhancer with Family Friendly Toggle and Classifieds only Toggle.
// @include        http://*.craigslist.tld/*
// @version         1.0
// ==/UserScript==

// The a new option called "Basic only" was added. 
// When "Basic Only Mode" is On the following areas will be removed:
// the calendar
// Community
// Interesting links
// discussion forums
// When "Basic Only Mode" is Off those areas will return after the page self-reloads

// JPT62089 wrote the following about the Craigslist Redesign
// Original design by Ryan Sims of Thebignoob.com
// Origianl Script by Corey Holland
// Fixed by Brett Johnson and bubotubor.
// Modified version by JPT62089.
// End of JPT62089's comments
// Further modified by Rollinns (LB).

// Josh wrote the following about the Craiglist Skin BETA
// This script was originally written by Kenneth Go, and has been updated by Josh Trefethen
// It appears Ken disappeared, and since many of the links and code on this site linked to his 
// site hosted a gwu, which no longer exists, I have updated this script to take those links out
// I also changed the js so that the script does not ad an additional top frame. 
// This script reskins craigslist. Hope you like it.
// Dynamically creates a frameset to browse lists and open them in a right frame.
// Also includes features like inline google maps for housing posts
// End of Josh's comments
var FamilyOn = "CL Redesign - Turn Family Safe ON";
var FamilyOff = "CL Redesign - Turn Family Safe OFF";
if(GM_getValue("FamilySafe") == undefined || GM_getValue("FamilyCMDText") == undefined)
{
	GM_setValue("FamilySafe", 0);
	GM_setValue("FamilyCMDText", FamilyOn);
}

GM_registerMenuCommand(GM_getValue("FamilyCMDText"), SetFamily);
GM_registerMenuCommand("CL Redesign - Homepage", CLRHome);

function CLRHome() {
	GM_openInTab("http://userscripts.org/scripts/show/44660");
}

function SetFamily() {
	if(GM_getValue("FamilySafe") == "0")
	{
		alert("Family Safe Mode has been turned ON.");
		GM_setValue("FamilySafe", 1);
		GM_setValue("FamilyCMDText", FamilyOff);
		window.location.reload(true);
	}
	else
	{
		alert("Family Safe Mode has been turned OFF.");
		GM_setValue("FamilySafe", 0);
		GM_setValue("FamilyCMDText", FamilyOn);
		window.location.reload(true);
	}
}

var BaseFamilyOn = "CL Redesign - Turn Basic Only to ON";
var BaseFamilyOff = "CL Redesign - Turn Basic Only to OFF";
if(GM_getValue("BaseFamilySafe") == undefined || GM_getValue("BaseFamilyCMDText") == undefined)
{
	GM_setValue("BaseFamilySafe", 0);
	GM_setValue("BaseFamilyCMDText", BaseFamilyOn);
}

GM_registerMenuCommand(GM_getValue("BaseFamilyCMDText"), SetBaseFamily);
GM_registerMenuCommand("CL Redesign - Homepage", CLRHome);

function CLRHome() {
	GM_openInTab("http://userscripts.org/scripts/show/44660");
}

function SetBaseFamily() {
	if(GM_getValue("BaseFamilySafe") == "0")
	{
		alert("Basic Only Mode has been turned ON.");
		GM_setValue("BaseFamilySafe", 1);
		GM_setValue("BaseFamilyCMDText", BaseFamilyOff);
		window.location.reload(true);
	}
	else
	{
		alert("Basic Only Mode has been turned OFF.");
		GM_setValue("BaseFamilySafe", 0);
		GM_setValue("BaseFamilyCMDText", BaseFamilyOn);
		window.location.reload(true);
	}
}
// function for appending CSS to document
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

if(GM_getValue("FamilySafe") == 1) {
	var adultpages = {"/stp/":1, "/w4w/":1, "/w4m/":1, "/m4w/":1, "/m4m/":1, "/msr/":1, "/cas/":1, "/mis/":1, "/rnr/":1, "/ers/":1, "/adg/":1, "/ppp/":1,
	"/search/stp/":1, "/search/w4w/":1, "/search/w4m/":1, "/search/m4w/":1, "/search/m4m/":1, "/search/msr/":1, "/search/cas/":1, "/search/mis/":1, "/search/rnr/":1, "/search/ers/":1, "/search/ers/":1, "/search/adg/":1, "/search/ppp/":1, "/cgi-bin/personals.cgi":1,
	"/search/stp":1, "/search/w4w":1, "/search/w4m":1, "/search/m4w":1, "/search/m4m":1, "/search/msr":1, "/search/cas":1, "/search/mis":1, "/search/rnr":1, "/search/ers":1, "/search/ers":1, "/search/adg":1, "/search/ppp":1,};
	if(adultpages[window.location.pathname] == 1)
	{
		window.location = "http://" + window.location.hostname;
	}
}

if( window.location.pathname == "/" ) {
	// gets variables from page
	if(GM_getValue("sCity") == undefined || GM_getValue("sClassifieds") == undefined || GM_getValue("sAreaId") == undefined ||
	GM_getValue("sCity") != document.getElementsByTagName('h2')[0].innerHTML || GM_getValue("sClassifieds") != document.getElementsByTagName('a')[1].href || GM_getValue("sAreaId") != document.getElementsByTagName('input')[0].value)
	{
		GM_setValue("sCity", document.getElementsByTagName('h2')[0].innerHTML);
		GM_setValue("sClassifieds", document.getElementsByTagName('a')[1].href);
		GM_setValue("sAreaId", document.getElementsByTagName('input')[0].value);
	}
    sCity = GM_getValue("sCity");
    sClassifieds = GM_getValue("sClassifieds");
    sAreaId = GM_getValue("sAreaId");

    // gives us a clean slate to work with
	if (document.getElementsByTagName('style')[0]) {
		// Removes the first <style> element in the <header> element.
		document.getElementsByTagName('head')[0].removeChild(document.getElementsByTagName('style')[0]);
	}
	if (document.getElementsByTagName('link')[0]) {
		//Removes the first <link> element in the <header> element.
		document.getElementsByTagName('head')[0].removeChild(document.getElementsByTagName('link')[0]);
	}
	document.getElementsByTagName('body')[0].innerHTML = '';
	document.title = "craigslist: " + sCity;
	
    // generates html and replaces page
    var sHtml = "";
	sHtml += top_bar();
    sHtml += '<div id="main">';
    sHtml += '<h1 title="Craigslist"><span>craigslist</span> <em>' + sCity + '</em></h1>';
    sHtml += '<div id="wrapper">';
    sHtml += '<div class="l">';
	// If Basic only is off (0) then display Calendar
	if(GM_getValue("BaseFamilySafe") == 0) {
	    sHtml += '<h2>event calendar</h2>';
	    sHtml += '<h4><a href="/cal/">see all</a></h4>';
	    var todaydate = new Date();
	    var curmonth = todaydate.getMonth()+1; //get current month (1-12)
	    var curyear = todaydate.getFullYear(); //get current year
	    sHtml += buildCal(curmonth ,curyear, "events", "", "days", "", 0);
	}
    sHtml += '<h2>cities</h2>';
    sHtml += '<p class="highlight"><a href="#all_cities">see all cities/areas</a></p>';
    sHtml += '<h4>Popular</h4>';
    sHtml += '<ul>';
    sHtml += '<li><a href="http://lawrence.craigslist.org/">Lawrence</a></li>';
    sHtml += '<li><a href="http://columbiamo.craigslist.org/">Columbia, MO</a></li>';
    sHtml += '<li><a href="http://springfield.craigslist.org/">Springfield, MO</a></li>';
    sHtml += '<li><a href="http://wichita.craigslist.org/">Wichita</a></li>';
    sHtml += '<li><a href="http://stlouis.craigslist.org/">St. Louis, MO</a></li>';
    sHtml += '<li><a href="http://lincoln.craigslist.org/">Lincoln, NE</a></li>';
    sHtml += '<li><a href="http://denver.craigslist.org/">Denver</a></li>';
    sHtml += '</ul>';
    sHtml += '</div>';
    sHtml += '<div class="m">';
    sHtml += '<h2 >classifieds</h2>';
    sHtml += '<div class="_l">';
	// If Basic only is off (0) then display Community
	if(GM_getValue("BaseFamilySafe") == 0) {
	   sHtml += '<h2><a href="/ccc/">community</a></h2>';
	   sHtml += '<ul>';
 	   sHtml += '<li><a href="/act/">Activities</a></li>';
	   sHtml += '<li><a href="/ats/">Artists</a></li>';
	   sHtml += '<li><a href="/kid/">Childcare</a></li>';
 	   sHtml += '<li><a href="/com/">General</a></li>';
 	   sHtml += '<li><a href="/grp/">Groups</a></li>';
 	   sHtml += '<li><a href="/pet/">Pets</a></li>';
 	   sHtml += '<li><a href="/cal/">Events</a></li>';
 	   sHtml += '<li><a href="/laf/">Lost & Found</a></li>';
 	   sHtml += '<li><a href="/muc/">Musicians</a></li>';
	   sHtml += '<li><a href="/vnn/">Local News</a></li>';
 	   sHtml += '<li><a href="/pol/">Politics</a></li>';
	   sHtml += '<li><a href="/rid/">Rideshare</a></li>';
	   sHtml += '<li><a href="/vol/">Volunteers</a></li>';
	   sHtml += '<li><a href="/cal/#classes">Classes</a></li>';
	   sHtml += '</ul>';
	}
	// If Family Safe is off (0) then display Personals
	if(GM_getValue("FamilySafe") == 0) {
	    sHtml += '<hr color="#999999" size="1" />';
	    sHtml += '<h2>personals</h2>';
	    sHtml += '<ul>';
	    sHtml += '<li><a href="/cgi-bin/personals.cgi?category=stp/">strictly platonic</a></li>';
	    sHtml += '<li><a href="/cgi-bin/personals.cgi?category=w4w/">women seeking women</a></li>';
	    sHtml += '<li><a href="/cgi-bin/personals.cgi?category=w4m/">women seeking men</a></li>';
	    sHtml += '<li><a href="/cgi-bin/personals.cgi?category=m4w/">men seeking women</a></li>';
	    sHtml += '<li><a href="/cgi-bin/personals.cgi?category=m4m">men seeking men</a></li>';
	    sHtml += '<li><a href="/cgi-bin/personals.cgi?category=msr/">misc romance</a></li>';
	    sHtml += '<li><a href="/cgi-bin/personals.cgi?category=cas">casual encounters</a></li>';
	    sHtml += '<li><a href="/cgi-bin/personals.cgi?category=mis/">mixed connections</a></li>';
	    sHtml += '<li><a href="/cgi-bin/personals.cgi?category=rnr">rants and raves</a></li>';
	    sHtml += '</ul>';
	}
        sHtml += '<hr color="#999999" size="1" />';
    sHtml += '<h2><a href="/sss/">for sale</a></h2>';
    sHtml += '<ul>';
    sHtml += '<li><a href="/art/">Arts/Crafts</a></li>';
    sHtml += '<li><a href="/pts/">Auto Parts</a></li>';
    sHtml += '<li><a href="/bab/">Baby/Kid</a></li>';
    sHtml += '<li><a href="/bar/">Barter</a></li>';
    sHtml += '<li><a href="/bik/">Bikes</a></li>';
    sHtml += '<li><a href="/boa/">Boats</a></li>';
    sHtml += '<li><a href="/bks/">Books</a></li>';
    sHtml += '<li><a href="/bfs/">Business</a></li>';
    sHtml += '<li><a href="/cta/">Cars/Trucks</a></li>';
    sHtml += '<li><a href="/emd/">CD/DVD/VHS</a></li>';
    sHtml += '<li><a href="/clo/">Clothing/Acc</a></li>';
    sHtml += '<li><a href="/clt/">Collectibles</a></li>';
    sHtml += '<li><a href="/sys/">Computer</a></li>';
    sHtml += '<li><a href="/ele/">Electronics</a></li>';
    sHtml += '<li><a href="/grd/">Farm/Garden</a></li>';
    sHtml += '<li><a href="/zip/">Free</a></li>';
    sHtml += '<li><a href="/fua/">Furniture</a></li>';
    sHtml += '<li><a href="/tag/">Games/Toys</a></li>';
    sHtml += '<li><a href="/gms/">Garage Sale</a></li>';
    sHtml += '<li><a href="/for/">General</a></li>';
    sHtml += '<li><a href="/hsh/">Household</a></li>';
    sHtml += '<li><a href="/jwl/">Jewelry</a></li>';
    sHtml += '<li><a href="/mat/">Material</a></li>';
    sHtml += '<li><a href="/mcy/">Motorcycles</a></li>';
    sHtml += '<li><a href="/msg/">Musical Instr</a></li>';
    sHtml += '<li><a href="/pho/">Photo/Video</a></li>';
    sHtml += '<li><a href="/rvs/">RVs</a></li>';
    sHtml += '<li><a href="/spo/">Sporting</a></li>';
    sHtml += '<li><a href="/tix/">Tickets</a></li>';
    sHtml += '<li><a href="/tls/">Tools</a></li>';
    sHtml += '<li><a href="/wan/">Wanted</a></li>';
    sHtml += '</ul>';
    sHtml += '<h2><a href="/hhh/">housing</a></h2>';
    sHtml += '<ul>';
    sHtml += '<li><a href="/apa/">Apartments/Housing</a></li>';
    sHtml += '<li><a href="/roo/">Rooms/Shared</a></li>';
    sHtml += '<li><a href="/sub/">Sublets/Temporary</a></li>';
    sHtml += '<li><a href="/hsw/">Housing wanted</a></li>';
    sHtml += '<li><a href="/swp/">Housing swap</a></li>';
    sHtml += '<li><a href="/vac/">Vacation rentals</a></li>';
    sHtml += '<li><a href="/prk/">Parking/Storage</a></li>';
    sHtml += '<li><a href="/off/">Office/Commercial</a></li>';
    sHtml += '<li><a href="/rea/">Real Estate for Sale</a></li>';
    sHtml += '</ul>';
    sHtml += '<hr color="#999999" size="1" />';
    sHtml += '<h2><a href="/jjj/">jobs</a></h2>';
    sHtml += '<ul>';
    sHtml += '<li><a href="/acc/">Accounting/Finance</a></li>';
    sHtml += '<li><a href="/ofc/">Admin/Office</a></li>';
    sHtml += '<li><a href="/egr/">Arch/Engineering</a></li>';
    sHtml += '<li><a href="/med/">Art/Media/Design</a></li>';
    sHtml += '<li><a href="/sci/">Biotech/Science</a></li>';
    sHtml += '<li><a href="/bus/">Business/Management</a></li>';
    sHtml += '<li><a href="/csr/">Customer Service</a></li>';
    sHtml += '<li><a href="/edu/">Education/Teaching</a></li>';
    sHtml += '<li><a href="/fbh/">Food/Bev/Hosp</a></li>';
    sHtml += '<li><a href="/lab/">General Labor</a></li>';
    sHtml += '<li><a href="/gov/">Government</a></li>';
    sHtml += '<li><a href="/hum/">Human Resources</a></li>';
    sHtml += '<li><a href="/eng/">Internet Engineering</a></li>';
    sHtml += '<li><a href="/lgl/">Legal/Paralegal</a></li>';
    sHtml += '<li><a href="/mnu/">Manufacturing</a></li>';
    sHtml += '<li><a href="/mar/">Marketing/Pr/Ad</a></li>';
    sHtml += '<li><a href="/hea/">Medical/Health</a></li>';
    sHtml += '<li><a href="/npo/">Nonprofit Sector</a></li>';
    sHtml += '<li><a href="/rej/">Real Estate</a></li>';
    sHtml += '<li><a href="/ret/">Retail/Wholesale</a></li>';
    sHtml += '<li><a href="/sls/">Sales/Biz Dev</a></li>';
    sHtml += '<li><a href="/spa/">Salon/Spa/Fitness</a></li>';
    sHtml += '<li><a href="/sec/">Security</a></li>';
    sHtml += '<li><a href="/trd/">Skilled Trade/Craft</a></li>';
    sHtml += '<li><a href="/sof/">Software/QA/DBA</a></li>';
    sHtml += '<li><a href="/sad/">Systems/Networking</a></li>';
    sHtml += '<li><a href="/tch/">Technical Support</a></li>';
    sHtml += '<li><a href="/trp/">Transport</a></li>';
    sHtml += '<li><a href="/tfr/">TV/Film/Video</a></li>';
    sHtml += '<li><a href="/web/">Web/Info design</a></li>';
    sHtml += '<li><a href="/wri/">Writing/Editing</a></li>';
    sHtml += '<li><a href="/etc/">[etc]</a> <a href="/search/jjj?addFour=part-time">[part time]</a></li>';
    sHtml += '</ul>';
    sHtml += '<h2><a href="/ggg/">gigs</a></h2>';
    sHtml += '<ul>';
    sHtml += '<li><a href="/cpg/">Computer</a></li>';
    sHtml += '<li><a href="/crg/">Creative</a></li>';
    sHtml += '<li><a href="/cwg/">Crew</a></li>';
    sHtml += '<li><a href="/dmg/">Domestic</a></li>';
    sHtml += '<li><a href="/evg/">Event</a></li>';
    sHtml += '<li><a href="/lbg/">Labor</a></li>';
    sHtml += '<li><a href="/wrg/">Writing</a></li>';
    sHtml += '<li><a href="/tlg/">Talent</a></li>';
	// If Family Safe is off (0) then display Adult Gigs
	if(GM_getValue("FamilySafe") == 0) {
		sHtml += '<li><a href="/cgi-bin/personals.cgi?category=adg">Adult</a></li>';
	}
    sHtml += '</ul>';
    sHtml += '<h2><a href="/bbb/">services</a></h2>';
    sHtml += '<ul>';
    sHtml += '<li><a href="/bts/">Beauty</a></li>';
    sHtml += '<li><a href="/cps/">Computer</a></li>';
    sHtml += '<li><a href="/crs/">Creative</a></li>';
	// If Family Safe is off (0) then display Erotic Services.
	if(GM_getValue("FamilySafe") == 0) {
    	sHtml += '<li><a href="/cgi-bin/personals.cgi?category=ers">Erotic</a></li>';
	}
    sHtml += '<li><a href="/evs/">Event</a></li>';
    sHtml += '<li><a href="/fns/">Financial</a></li>';
    sHtml += '<li><a href="/lgs/">Legal</a></li>';
    sHtml += '<li><a href="/lss/">Lessons</a></li>';
    sHtml += '<li><a href="/aos/">Automotive</a></li>';
    sHtml += '<li><a href="/hss/">Household</a></li>';
    sHtml += '<li><a href="/lbs/">Labor/Moving</a></li>';
    sHtml += '<li><a href="/sks/">Skilled Trade</a></li>';
    sHtml += '<li><a href="/rts/">Real Estate</a></li>';
    sHtml += '<li><a href="/biz/">Small Biz Ads</a></li>';
    sHtml += '<li><a href="/ths/">Therapeutic</a></li>';
    sHtml += '<li><a href="/trv/">Travel/Vac</a></li>';
    sHtml += '<li><a href="/wet/">Write/Ed/TR8</a></li>';
    sHtml += '</ul>';
    sHtml += '<h2><a href="/res/">resumes</a></h2>';
	// If Basic only is off (0) then display Interesting links and discussion forums
	if(GM_getValue("BaseFamilySafe") == 0) {
    sHtml += '</div>';
    sHtml += '</div>';
    sHtml += '<div class="r">';

    sHtml += '<h2>interesting links</h2>';
    sHtml += '<ul style="border-top: 4px solid #D6D6D6; padding-top: 3px;">';
    sHtml += '<li><a href="http://www.craigslist.org/about/scams">avoid scams & faud</a></li>';
    sHtml += '<li><a href="http://www.craigslist.org/about/safety">personal safty tips</a></li>';
    sHtml += '<li><a href="http://blog.craigslist.org/">craigslist blog</a></li>';
    sHtml += '<li><a href="http://www.craigslist.org/about/factsheet.html">craigslist factsheet</a></li>';
    sHtml += '<li><a href="http://www.craigslist.org/about/best/all/">best-of-craigslist</a></li>';
    sHtml += '<li><a href="http://www.craigslist.org/about/job_boards_compared">job boards compared</a></li>';
    sHtml += '<li><a href="http://24hoursoncraigslist.com/subs/nowplaying.html">craigslist movie & dvd</a></li>';
    sHtml += '<li><a href="http://www.craigslistfoundation.org/index.php?page=Craigslist_Foundation_Store">craigslist t-shirts</a></li>';
    sHtml += '<li><a href="http://craigslistfoundation.org/">craigslist foundation</a></li>';
    sHtml += '<li><a href="http://savetheinternet.com/=faq">defend net neutrality</a></li>';
    sHtml += '<li><a href="http://www.craigslist.org/about/help/system-status.html">system status</a></li>';
    sHtml += '</ul>';
    sHtml += '<h2><a href="/forums/">discussion forums</a></h2>';
    sHtml += '<p><a href="/forums/?forumID=49">arts</a></p>';
    sHtml += '<p><a href="/forums/?forumID=5">autos</a></p>';
    sHtml += '<p><a href="/forums/?forumID=88">beauty</a></p>';
    sHtml += '<p><a href="/forums/?forumID=34">comp</a></p>';
    sHtml += '<p><a href="/forums/?forumID=83">crafts</a></p>';
    sHtml += '<p><a href="/forums/?forumID=99">eco</a></p>';
    sHtml += '<p><a href="/forums/?forumID=90">educ</a></p>';
    sHtml += '<p><a href="/forums/?forumID=8">feedbk</a></p>';
    sHtml += '<p><a href="/forums/?forumID=41">film</a></p>';
    sHtml += '<p><a href="/forums/?forumID=92">fitness</a></p>';
    sHtml += '<p><a href="/forums/?forumID=64">fixit</a></p>';
    sHtml += '<p><a href="/forums/?forumID=22">food</a></p>';
    sHtml += '<p><a href="/forums/?forumID=85">games</a></p>';
    sHtml += '<p><a href="/forums/?forumID=54">garden</a></p>';
    sHtml += '<p><a href="/forums/?forumID=575">haiku</a></p>';
    sHtml += '<p><a href="/forums/?forumID=43">health</a></p>';
    sHtml += '<p><a href="/forums/?forumID=9">help</a></p>';
    sHtml += '<p><a href="/forums/?forumID=81">history</a></p>';
    sHtml += '<p><a href="/forums/?forumID=6">housing</a></p>';
    sHtml += '<p><a href="/forums/?forumID=7">jobs</a></p>';
    sHtml += '<p><a href="/forums/?forumID=52">katrina</a></p>';
    sHtml += '<p><a href="/forums/?forumID=73">legal</a></p>';
    sHtml += '<p><a href="/forums/?forumID=48">loc pol</a></p>';
    sHtml += '<p><a href="/forums/?forumID=72">m4m</a></p>';
    sHtml += '<p><a href="/forums/?forumID=53">money</a></p>';
    sHtml += '<p><a href="/forums/?forumID=24">music</a></p>';
    sHtml += '<p><a href="/forums/?forumID=60">night</a></p>';
    sHtml += '<p><a href="/forums/?forumID=501">npo</a></p>';
    sHtml += '<p><a href="/forums/?forumID=4">open</a></p>';
    sHtml += '<p><a href="/forums/?forumID=16">outdoor</a></p>';
    sHtml += '<p><a href="/forums/?forumID=50">over 50</a></p>';
    sHtml += '<p><a href="/forums/?forumID=39">parent</a></p>';
    sHtml += '<p><a href="/forums/?forumID=19">pefo</a></p>';
    sHtml += '<p><a href="/forums/?forumID=26">pets</a></p>';
    sHtml += '<p><a href="/forums/?forumID=71">philos</a></p>';
    sHtml += '<p><a href="/forums/?forumID=84">poc</a></p>';
    sHtml += '<p><a href="/forums/?forumID=20">politic</a></p>';
    sHtml += '<p><a href="/forums/?forumID=29">psych</a></p>';
    sHtml += '<p><a href="/forums/?forumID=46">queer</a></p>';
    sHtml += '<p><a href="/forums/?forumID=28">rofo</a></p>';
    sHtml += '<p><a href="/forums/?forumID=96">sci</a></p>';
    sHtml += '<p><a href="/forums/?forumID=89">selfem</a></p>';
    sHtml += '<p><a href="/forums/?forumID=91">shop</a></p>';
    sHtml += '<p><a href="/forums/?forumID=93">spirit</a></p>';
    sHtml += '<p><a href="/forums/?forumID=32">sports</a></p>';
    sHtml += '<p><a href="/forums/?forumID=21">testing</a></p>';
    sHtml += '<p><a href="/forums/?forumID=97">transg</a></p>';
    sHtml += '<p><a href="/forums/?forumID=95">transit</a></p>';
    sHtml += '<p><a href="/forums/?forumID=42">travel</a></p>';
    sHtml += '<p><a href="/forums/?forumID=98">tv</a></p>';
    sHtml += '<p><a href="/forums/?forumID=69">w4w</a></p>';
    sHtml += '<p><a href="/forums/?forumID=15">wed</a></p>';
    sHtml += '<p><a href="/forums/?forumID=94">women</a></p>';
    sHtml += '<p><a href="/forums/?forumID=27">writers</a></p>';
	}
    sHtml += '</div> </div> </div> </div>';
    sHtml += '<div id="all_cities">';
    sHtml += '<h2>all cities / areas</h2>';
    sHtml += '<h5><a href="http://geo.craigslist.org/iso/us">USA</a></h5>';
    sHtml += '<ul>';
    sHtml += '<li><a href="http://abilene.craigslist.org/">abilene</a></li>';
    sHtml += '<li><a href="http://akroncanton.craigslist.org/">akron / canton</a></li>';
    sHtml += '<li><a href="http://anchorage.craigslist.org/"><b>alaska</b></a></li>';
    sHtml += '<li><a href="http://albany.craigslist.org/"><b>albany</b></a></li>';
    sHtml += '<li><a href="http://albuquerque.craigslist.org/"><b>albuquerque</b></a></li>';
    sHtml += '<li><a href="http://altoona.craigslist.org/">altoona-johnstown</a></li>';
    sHtml += '<li><a href="http://amarillo.craigslist.org/">amarillo</a></li>';
    sHtml += '<li><a href="http://ames.craigslist.org/">ames, IA</a></li>';
    sHtml += '<li><a href="http://annarbor.craigslist.org/">ann arbor</a></li>';
    sHtml += '<li><a href="http://annapolis.craigslist.org/">annapolis</a></li>';
    sHtml += '<li><a href="http://appleton.craigslist.org/">appleton-oshkosh-FDL</a></li>';
    sHtml += '<li><a href="http://asheville.craigslist.org/">asheville</a></li>';
    sHtml += '<li><a href="http://athensga.craigslist.org/">athens, GA</a></li>';
    sHtml += '<li><a href="http://athensohio.craigslist.org/">athens, OH</a></li>';
    sHtml += '<li><a href="http://atlanta.craigslist.org/"><b>atlanta</b></a></li>';
    sHtml += '<li><a href="http://auburn.craigslist.org/">auburn</a></li>';
    sHtml += '<li><a href="http://augusta.craigslist.org/">augusta</a></li>';
    sHtml += '<li><a href="http://austin.craigslist.org/"><b>austin</b></a></li>';
    sHtml += '<li><a href="http://bakersfield.craigslist.org/">bakersfield</a></li>';
    sHtml += '<li><a href="http://baltimore.craigslist.org/"><b>baltimore</b></a></li>';
    sHtml += '<li><a href="http://batonrouge.craigslist.org/">baton rouge</a></li>';
    sHtml += '<li><a href="http://beaumont.craigslist.org/">beaumont / port arthur</a></li>';
    sHtml += '<li><a href="http://bellingham.craigslist.org/">bellingham</a></li>';
    sHtml += '<li><a href="http://bend.craigslist.org/">bend</a></li>';
    sHtml += '<li><a href="http://binghamton.craigslist.org/">binghamton</a></li>';
    sHtml += '<li><a href="http://bham.craigslist.org/">birmingham, AL</a></li>';
    sHtml += '<li><a href="http://blacksburg.craigslist.org/">blacksburg</a></li>';
    sHtml += '<li><a href="http://bloomington.craigslist.org/">bloomington</a></li>';
    sHtml += '<li><a href="http://bn.craigslist.org/">bloomington-normal</a></li>';
    sHtml += '<li><a href="http://boise.craigslist.org/"><b>boise</b></a></li>';
    sHtml += '<li><a href="http://boone.craigslist.org/">boone</a></li>';
    sHtml += '<li><a href="http://boston.craigslist.org/"><b>boston</b></a></li>';
    sHtml += '<li><a href="http://boulder.craigslist.org/">boulder</a></li>';
    sHtml += '<li><a href="http://bgky.craigslist.org/">bowling green</a></li>';
    sHtml += '<li><a href="http://brownsville.craigslist.org/">brownsville</a></li>';
    sHtml += '<li><a href="http://brunswick.craigslist.org/">brunswick, GA</a></li>';
    sHtml += '<li><a href="http://buffalo.craigslist.org/"><b>buffalo</b></a></li>';
    sHtml += '<li><a href="http://capecod.craigslist.org/">cape cod / islands</a></li>';
    sHtml += '<li><a href="http://carbondale.craigslist.org/">carbondale</a></li>';
    sHtml += '<li><a href="http://catskills.craigslist.org/">catskills</a></li>';
    sHtml += '<li><a href="http://cedarrapids.craigslist.org/">cedar rapids</a></li>';
    sHtml += '<li><a href="http://cnj.craigslist.org/">central NJ</a></li>';
    sHtml += '<li><a href="http://centralmich.craigslist.org/">central michigan</a></li>';
    sHtml += '<li><a href="http://chambana.craigslist.org/">champaign urbana</a></li>';
    sHtml += '<li><a href="http://charleston.craigslist.org/">charleston, SC</a></li>';
    sHtml += '<li><a href="http://charlestonwv.craigslist.org/">charleston, WV</a></li>';
    sHtml += '<li><a href="http://charlotte.craigslist.org/"><b>charlotte</b></a></li>';
    sHtml += '<li><a href="http://charlottesville.craigslist.org/">charlottesville</a></li>';
    sHtml += '<li><a href="http://chattanooga.craigslist.org/">chattanooga</a></li>';
    sHtml += '<li><a href="http://chautauqua.craigslist.org/">chautauqua</a></li>';
    sHtml += '<li><a href="http://chicago.craigslist.org/"><b>chicago</b></a></li>';
    sHtml += '<li><a href="http://chico.craigslist.org/">chico</a></li>';
    sHtml += '<li><a href="http://cincinnati.craigslist.org/"><b>cincinnati, OH</b></a></li>';
    sHtml += '<li><a href="http://clarksville.craigslist.org/">clarksville, TN</a></li>';
    sHtml += '<li><a href="http://cleveland.craigslist.org/"><b>cleveland</b></a></li>';
    sHtml += '<li><a href="http://collegestation.craigslist.org/">college station</a></li>';
    sHtml += '<li><a href="http://cosprings.craigslist.org/">colorado springs</a></li>';
    sHtml += '<li><a href="http://columbiamo.craigslist.org/">columbia / jeff city</a></li>';
    sHtml += '<li><a href="http://columbia.craigslist.org/">columbia, SC</a></li>';
    sHtml += '<li><a href="http://columbus.craigslist.org/"><b>columbus</b></a></li>';
    sHtml += '<li><a href="http://columbusga.craigslist.org/">columbus, GA</a></li>';
    sHtml += '<li><a href="http://corpuschristi.craigslist.org/">corpus christi</a></li>';
    sHtml += '<li><a href="http://corvallis.craigslist.org/">corvallis/albany</a></li>';
    sHtml += '<li><a href="http://dallas.craigslist.org/"><b>dallas / fort worth</b></a></li>';
    sHtml += '<li><a href="http://danville.craigslist.org/">danville</a></li>';
    sHtml += '<li><a href="http://dayton.craigslist.org/">dayton / springfield</a></li>';
    sHtml += '<li><a href="http://daytona.craigslist.org/">daytona beach</a></li>';
    sHtml += '<li><a href="http://decatur.craigslist.org/">decatur, IL</a></li>';
    sHtml += '<li><a href="http://delaware.craigslist.org/">delaware</a></li>';
    sHtml += '<li><a href="http://denver.craigslist.org/"><b>denver</b></a></li>';
    sHtml += '<li><a href="http://desmoines.craigslist.org/">des moines</a></li>';
    sHtml += '<li><a href="http://detroit.craigslist.org/"><b>detroit metro</b></a></li>';
    sHtml += '<li><a href="http://dothan.craigslist.org/">dothan, AL</a></li>';
    sHtml += '<li><a href="http://dubuque.craigslist.org/">dubuque</a></li>';
    sHtml += '<li><a href="http://duluth.craigslist.org/">duluth / superior</a></li>';
    sHtml += '<li><a href="http://eastidaho.craigslist.org/">east idaho</a></li>';
    sHtml += '<li><a href="http://eastoregon.craigslist.org/">east oregon</a></li>';
    sHtml += '<li><a href="http://newlondon.craigslist.org/">eastern CT</a></li>';
    sHtml += '<li><a href="http://eastnc.craigslist.org/">eastern NC</a></li>';
    sHtml += '<li><a href="http://easternshore.craigslist.org/">eastern shore</a></li>';
    sHtml += '<li><a href="http://eauclaire.craigslist.org/">eau claire</a></li>';
    sHtml += '<li><a href="http://elpaso.craigslist.org/">el paso</a></li>';
    sHtml += '<li><a href="http://elmira.craigslist.org/">elmira-corning</a></li>';
    sHtml += '<li><a href="http://erie.craigslist.org/">erie, PA</a></li>';
    sHtml += '<li><a href="http://eugene.craigslist.org/">eugene</a></li>';
    sHtml += '<li><a href="http://evansville.craigslist.org/">evansville</a></li>';
    sHtml += '<li><a href="http://fargo.craigslist.org/">fargo / moorhead</a></li>';
    sHtml += '<li><a href="http://farmington.craigslist.org/">farmington, NM</a></li>';
    sHtml += '<li><a href="http://fayetteville.craigslist.org/">fayetteville</a></li>';
    sHtml += '<li><a href="http://fayar.craigslist.org/">fayetteville, AR</a></li>';
    sHtml += '<li><a href="http://flagstaff.craigslist.org/">flagstaff / sedona</a></li>';
    sHtml += '<li><a href="http://flint.craigslist.org/">flint</a></li>';
    sHtml += '<li><a href="http://shoals.craigslist.org/">florence / muscle shoals</a></li>';
    sHtml += '<li><a href="http://florencesc.craigslist.org/">florence, SC</a></li>';
    sHtml += '<li><a href="http://keys.craigslist.org/">florida keys</a></li>';
    sHtml += '<li><a href="http://fortcollins.craigslist.org/">fort collins / north CO</a></li>';
    sHtml += '<li><a href="http://fortsmith.craigslist.org/">fort smith, AR</a></li>';
    sHtml += '<li><a href="http://fortwayne.craigslist.org/">fort wayne</a></li>';
    sHtml += '<li><a href="http://fredericksburg.craigslist.org/">fredericksburg</a></li>';
    sHtml += '<li><a href="http://fresno.craigslist.org/"><b>fresno</b></a></li>';
    sHtml += '<li><a href="http://fortmyers.craigslist.org/">ft myers / SW florida</a></li>';
    sHtml += '<li><a href="http://gadsden.craigslist.org/">gadsden-anniston</a></li>';
    sHtml += '<li><a href="http://gainesville.craigslist.org/">gainesville</a></li>';
    sHtml += '<li><a href="http://galveston.craigslist.org/">galveston</a></li>';
    sHtml += '<li><a href="http://goldcountry.craigslist.org/">gold country</a></li>';
    sHtml += '<li><a href="http://grandisland.craigslist.org/">grand island</a></li>';
    sHtml += '<li><a href="http://grandrapids.craigslist.org/">grand rapids</a></li>';
    sHtml += '<li><a href="http://greenbay.craigslist.org/">green bay</a></li>';
    sHtml += '<li><a href="http://greensboro.craigslist.org/">greensboro</a></li>';
    sHtml += '<li><a href="http://greenville.craigslist.org/">greenville / upstate</a></li>';
    sHtml += '<li><a href="http://gulfport.craigslist.org/">gulfport / biloxi</a></li>';
    sHtml += '<li><a href="http://norfolk.craigslist.org/"><b>hampton roads</b></a></li>';
    sHtml += '<li><a href="http://harrisburg.craigslist.org/">harrisburg</a></li>';
    sHtml += '<li><a href="http://harrisonburg.craigslist.org/">harrisonburg</a></li>';
    sHtml += '<li><a href="http://hartford.craigslist.org/"><b>hartford</b></a></li>';
    sHtml += '<li><a href="http://hattiesburg.craigslist.org/">hattiesburg</a></li>';
    sHtml += '<li><a href="http://honolulu.craigslist.org/"><b>hawaii</b></a></li>';
    sHtml += '<li><a href="http://hickory.craigslist.org/">hickory / lenoir</a></li>';
    sHtml += '<li><a href="http://hiltonhead.craigslist.org/">hilton head</a></li>';
    sHtml += '<li><a href="http://houston.craigslist.org/"><b>houston</b></a></li>';
    sHtml += '<li><a href="http://hudsonvalley.craigslist.org/">hudson valley</a></li>';
    sHtml += '<li><a href="http://humboldt.craigslist.org/">humboldt county</a></li>';
    sHtml += '<li><a href="http://huntington.craigslist.org/">huntington-ashland</a></li>';
    sHtml += '<li><a href="http://huntsville.craigslist.org/">huntsville</a></li>';
    sHtml += '<li><a href="http://imperial.craigslist.org/">imperial county</a></li>';
    sHtml += '<li><a href="http://indianapolis.craigslist.org/"><b>indianapolis</b></a></li>';
    sHtml += '<li><a href="http://inlandempire.craigslist.org/">inland empire</a></li>';
    sHtml += '<li><a href="http://iowacity.craigslist.org/">iowa city</a></li>';
    sHtml += '<li><a href="http://ithaca.craigslist.org/">ithaca</a></li>';
    sHtml += '<li><a href="http://jxn.craigslist.org/">jackson, MI</a></li>';
    sHtml += '<li><a href="http://jackson.craigslist.org/">jackson, MS</a></li>';
    sHtml += '<li><a href="http://jacksontn.craigslist.org/">jackson, TN</a></li>';
    sHtml += '<li><a href="http://jacksonville.craigslist.org/">jacksonville</a></li>';
    sHtml += '<li><a href="http://janesville.craigslist.org/">janesville</a></li>';
    sHtml += '<li><a href="http://jerseyshore.craigslist.org/">jersey shore</a></li>';
    sHtml += '<li><a href="http://jonesboro.craigslist.org/">jonesboro</a></li>';
    sHtml += '<li><a href="http://joplin.craigslist.org/">joplin</a></li>';
    sHtml += '<li><a href="http://kalamazoo.craigslist.org/">kalamazoo</a></li>';
    sHtml += '<li><a href="http://kansascity.craigslist.org/"><b>kansas city, MO</b></a></li>';
    sHtml += '<li><a href="http://kpr.craigslist.org/">kennewick-pasco-richland</a></li>';
    sHtml += '<li><a href="http://racine.craigslist.org/">kenosha-racine</a></li>';
    sHtml += '<li><a href="http://killeen.craigslist.org/">killeen / temple / ft hood</a></li>';
    sHtml += '<li><a href="http://knoxville.craigslist.org/">knoxville</a></li>';
    sHtml += '<li><a href="http://lacrosse.craigslist.org/">la crosse</a></li>';
    sHtml += '<li><a href="http://lafayette.craigslist.org/">lafayette</a></li>';
    sHtml += '<li><a href="http://tippecanoe.craigslist.org/">lafayette / west lafayette</a></li>';
    sHtml += '<li><a href="http://lakecharles.craigslist.org/">lake charles</a></li>';
    sHtml += '<li><a href="http://lakeland.craigslist.org/">lakeland</a></li>';
    sHtml += '<li><a href="http://lancaster.craigslist.org/">lancaster, PA</a></li>';
    sHtml += '<li><a href="http://lansing.craigslist.org/">lansing</a></li>';
    sHtml += '<li><a href="http://laredo.craigslist.org/">laredo</a></li>';
    sHtml += '<li><a href="http://lascruces.craigslist.org/">las cruces</a></li>';
    sHtml += '<li><a href="http://lasvegas.craigslist.org/"><b>las vegas</b></a></li>';
    sHtml += '<li><a href="http://lawrence.craigslist.org/">lawrence</a></li>';
    sHtml += '<li><a href="http://lawton.craigslist.org/">lawton</a></li>';
    sHtml += '<li><a href="http://allentown.craigslist.org/">lehigh valley</a></li>';
    sHtml += '<li><a href="http://lexington.craigslist.org/">lexington, KY</a></li>';
    sHtml += '<li><a href="http://limaohio.craigslist.org/">lima / findlay</a></li>';
    sHtml += '<li><a href="http://lincoln.craigslist.org/">lincoln</a></li>';
    sHtml += '<li><a href="http://littlerock.craigslist.org/">little rock</a></li>';
    sHtml += '<li><a href="http://logan.craigslist.org/">logan</a></li>';
    sHtml += '<li><a href="http://longisland.craigslist.org/">long island</a></li>';
    sHtml += '<li><a href="http://losangeles.craigslist.org/"><b>los angeles</b></a></li>';
    sHtml += '<li><a href="http://louisville.craigslist.org/"><b>louisville</b></a></li>';
    sHtml += '<li><a href="http://lubbock.craigslist.org/">lubbock</a></li>';
    sHtml += '<li><a href="http://lynchburg.craigslist.org/">lynchburg</a></li>';
    sHtml += '<li><a href="http://macon.craigslist.org/">macon</a></li>';
    sHtml += '<li><a href="http://madison.craigslist.org/">madison</a></li>';
    sHtml += '<li><a href="http://maine.craigslist.org/">maine</a></li>';
    sHtml += '<li><a href="http://ksu.craigslist.org/">manhattan, KS</a></li>';
    sHtml += '<li><a href="http://mankato.craigslist.org/">mankato</a></li>';
    sHtml += '<li><a href="http://mansfield.craigslist.org/">mansfield</a></li>';
    sHtml += '<li><a href="http://martinsburg.craigslist.org/">martinsburg</a></li>';
    sHtml += '<li><a href="http://mcallen.craigslist.org/">mcallen / edinburg</a></li>';
    sHtml += '<li><a href="http://medford.craigslist.org/">medford-ashland-klamath</a></li>';
    sHtml += '<li><a href="http://memphis.craigslist.org/"><b>memphis, TN</b></a></li>';
    sHtml += '<li><a href="http://mendocino.craigslist.org/">mendocino county</a></li>';
    sHtml += '<li><a href="http://merced.craigslist.org/">merced</a></li>';
    sHtml += '<li><a href="http://milwaukee.craigslist.org/"><b>milwaukee</b></a></li>';
    sHtml += '<li><a href="http://minneapolis.craigslist.org/"><b>minneapolis / st paul</b></a></li>';
    sHtml += '<li><a href="http://mobile.craigslist.org/">mobile</a></li>';
    sHtml += '<li><a href="http://modesto.craigslist.org/">modesto</a></li>';
    sHtml += '<li><a href="http://mohave.craigslist.org/">mohave county</a></li>';
    sHtml += '<li><a href="http://monroe.craigslist.org/">monroe, LA</a></li>';
    sHtml += '<li><a href="http://montana.craigslist.org/">montana</a></li>';
    sHtml += '<li><a href="http://monterey.craigslist.org/">monterey bay</a></li>';
    sHtml += '<li><a href="http://montgomery.craigslist.org/">montgomery</a></li>';
    sHtml += '<li><a href="http://morgantown.craigslist.org/">morgantown</a></li>';
    sHtml += '<li><a href="http://muncie.craigslist.org/">muncie / anderson</a></li>';
    sHtml += '<li><a href="http://muskegon.craigslist.org/">muskegon</a></li>';
    sHtml += '<li><a href="http://myrtlebeach.craigslist.org/">myrtle beach</a></li>';
    sHtml += '<li><a href="http://nashville.craigslist.org/"><b>nashville</b></a></li>';
    sHtml += '<li><a href="http://nh.craigslist.org/">new hampshire</a></li>';
    sHtml += '<li><a href="http://newhaven.craigslist.org/">new haven</a></li>';
    sHtml += '<li><a href="http://neworleans.craigslist.org/"><b>new orleans</b></a></li>';
    sHtml += '<li><a href="http://newyork.craigslist.org/"><b>new york city</b></a></li>';
    sHtml += '<li><a href="http://nd.craigslist.org/">north dakota</a></li>';
    sHtml += '<li><a href="http://newjersey.craigslist.org/">north jersey</a></li>';
    sHtml += '<li><a href="http://northmiss.craigslist.org/">north mississippi</a></li>';
    sHtml += '<li><a href="http://nmi.craigslist.org/">northern michigan</a></li>';
    sHtml += '<li><a href="http://nwct.craigslist.org/">northwest CT</a></li>';
    sHtml += '<li><a href="http://ocala.craigslist.org/">ocala</a></li>';
    sHtml += '<li><a href="http://odessa.craigslist.org/">odessa / midland</a></li>';
    sHtml += '<li><a href="http://ogden.craigslist.org/">ogden-clearfield</a></li>';
    sHtml += '<li><a href="http://oklahomacity.craigslist.org/"><b>oklahoma city</b></a></li>';
    sHtml += '<li><a href="http://olympic.craigslist.org/">olympic peninsula</a></li>';
    sHtml += '<li><a href="http://omaha.craigslist.org/"><b>omaha / council bluffs</b></a></li>';
    sHtml += '<li><a href="http://orangecounty.craigslist.org/"><b>orange county</b></a></li>';
    sHtml += '<li><a href="http://oregoncoast.craigslist.org/">oregon coast</a></li>';
    sHtml += '<li><a href="http://orlando.craigslist.org/"><b>orlando</b></a></li>';
    sHtml += '<li><a href="http://outerbanks.craigslist.org/">outer banks</a></li>';
    sHtml += '<li><a href="http://palmsprings.craigslist.org/">palm springs, CA</a></li>';
    sHtml += '<li><a href="http://panamacity.craigslist.org/">panama city, FL</a></li>';
    sHtml += '<li><a href="http://parkersburg.craigslist.org/">parkersburg-marietta</a></li>';
    sHtml += '<li><a href="http://pensacola.craigslist.org/">pensacola / panhandle</a></li>';
    sHtml += '<li><a href="http://peoria.craigslist.org/">peoria</a></li>';
    sHtml += '<li><a href="http://philadelphia.craigslist.org/"><b>philadelphia</b></a></li>';
    sHtml += '<li><a href="http://phoenix.craigslist.org/"><b>phoenix</b></a></li>';
    sHtml += '<li><a href="http://pittsburgh.craigslist.org/"><b>pittsburgh</b></a></li>';
    sHtml += '<li><a href="http://plattsburgh.craigslist.org/">plattsburgh-adirondacks</a></li>';
    sHtml += '<li><a href="http://poconos.craigslist.org/">poconos</a></li>';
    sHtml += '<li><a href="http://porthuron.craigslist.org/">port huron</a></li>';
    sHtml += '<li><a href="http://portland.craigslist.org/"><b>portland, OR</b></a></li>';
    sHtml += '<li><a href="http://prescott.craigslist.org/">prescott</a></li>';
    sHtml += '<li><a href="http://provo.craigslist.org/">provo / orem</a></li>';
    sHtml += '<li><a href="http://pueblo.craigslist.org/">pueblo</a></li>';
    sHtml += '<li><a href="http://pullman.craigslist.org/">pullman / moscow</a></li>';
    sHtml += '<li><a href="http://quadcities.craigslist.org/">quad cities, IA/IL</a></li>';
    sHtml += '<li><a href="http://raleigh.craigslist.org/"><b>raleigh / durham / CH</b></a></li>';
    sHtml += '<li><a href="http://reading.craigslist.org/">reading</a></li>';
    sHtml += '<li><a href="http://redding.craigslist.org/">redding</a></li>';
    sHtml += '<li><a href="http://reno.craigslist.org/">reno / tahoe</a></li>';
    sHtml += '<li><a href="http://providence.craigslist.org/"><b>rhode island</b></a></li>';
    sHtml += '<li><a href="http://richmond.craigslist.org/"><b>richmond</b></a></li>';
    sHtml += '<li><a href="http://roanoke.craigslist.org/">roanoke</a></li>';
    sHtml += '<li><a href="http://rmn.craigslist.org/">rochester, MN</a></li>';
    sHtml += '<li><a href="http://rochester.craigslist.org/">rochester, NY</a></li>';
    sHtml += '<li><a href="http://rockford.craigslist.org/">rockford</a></li>';
    sHtml += '<li><a href="http://rockies.craigslist.org/">rocky mountains</a></li>';
    sHtml += '<li><a href="http://roseburg.craigslist.org/">roseburg</a></li>';
    sHtml += '<li><a href="http://roswell.craigslist.org/">roswell / carlsbad</a></li>';
    sHtml += '<li><a href="http://sacramento.craigslist.org/"><b>sacramento</b></a></li>';
    sHtml += '<li><a href="http://saginaw.craigslist.org/">saginaw-midland-baycity</a></li>';
    sHtml += '<li><a href="http://salem.craigslist.org/">salem, OR</a></li>';
    sHtml += '<li><a href="http://saltlakecity.craigslist.org/"><b>salt lake city</b></a></li>';
    sHtml += '<li><a href="http://sanantonio.craigslist.org/"><b>san antonio</b></a></li>';
    sHtml += '<li><a href="http://sandiego.craigslist.org/"><b>san diego</b></a></li>';
    sHtml += '<li><a href="http://slo.craigslist.org/">san luis obispo</a></li>';
    sHtml += '<li><a href="http://sanmarcos.craigslist.org/">san marcos</a></li>';
    sHtml += '<li><a href="http://sandusky.craigslist.org/">sandusky</a></li>';
    sHtml += '<li><a href="http://sfbay.craigslist.org/"><b>SF bay area</b></a></li>';
    sHtml += '<li><a href="http://santabarbara.craigslist.org/">santa barbara</a></li>';
    sHtml += '<li><a href="http://santafe.craigslist.org/">santa fe / taos</a></li>';
    sHtml += '<li><a href="http://sarasota.craigslist.org/">sarasota-bradenton</a></li>';
    sHtml += '<li><a href="http://savannah.craigslist.org/">savannah</a></li>';
    sHtml += '<li><a href="http://scranton.craigslist.org/">scranton / wilkes-barre</a></li>';
    sHtml += '<li><a href="http://seattle.craigslist.org/"><b>seattle-tacoma</b></a></li>';
    sHtml += '<li><a href="http://sheboygan.craigslist.org/">sheboygan, WI</a></li>';
    sHtml += '<li><a href="http://shreveport.craigslist.org/">shreveport</a></li>';
    sHtml += '<li><a href="http://sierravista.craigslist.org/">sierra vista</a></li>';
    sHtml += '<li><a href="http://siouxcity.craigslist.org/">sioux city, IA</a></li>';
    sHtml += '<li><a href="http://skagit.craigslist.org/">skagit / island / SJI</a></li>';
    sHtml += '<li><a href="http://southbend.craigslist.org/">south bend / michiana</a></li>';
    sHtml += '<li><a href="http://southcoast.craigslist.org/">south coast</a></li>';
    sHtml += '<li><a href="http://sd.craigslist.org/">south dakota</a></li>';
    sHtml += '<li><a href="http://miami.craigslist.org/"><b>south florida</b></a></li>';
    sHtml += '<li><a href="http://southjersey.craigslist.org/">south jersey</a></li>';
    sHtml += '<li><a href="http://semo.craigslist.org/">southeast missouri</a></li>';
    sHtml += '<li><a href="http://smd.craigslist.org/">southern maryland</a></li>';
    sHtml += '<li><a href="http://swmi.craigslist.org/">southwest michigan</a></li>';
    sHtml += '<li><a href="http://spacecoast.craigslist.org/">space coast</a></li>';
    sHtml += '<li><a href="http://spokane.craigslist.org/">spokane / coeur d\'alene</a></li>';
    sHtml += '<li><a href="http://springfieldil.craigslist.org/">springfield, IL</a></li>';
    sHtml += '<li><a href="http://springfield.craigslist.org/">springfield, MO</a></li>';
    sHtml += '<li><a href="http://staugustine.craigslist.org/">st augustine</a></li>';
    sHtml += '<li><a href="http://stcloud.craigslist.org/">st cloud</a></li>';
    sHtml += '<li><a href="http://stgeorge.craigslist.org/">st george</a></li>';
    sHtml += '<li><a href="http://stlouis.craigslist.org/"><b>st louis, MO</b></a></li>';
    sHtml += '<li><a href="http://pennstate.craigslist.org/">state college</a></li>';
    sHtml += '<li><a href="http://stillwater.craigslist.org/">stillwater</a></li>';
    sHtml += '<li><a href="http://stockton.craigslist.org/">stockton</a></li>';
    sHtml += '<li><a href="http://syracuse.craigslist.org/">syracuse</a></li>';
    sHtml += '<li><a href="http://tallahassee.craigslist.org/">tallahassee</a></li>';
    sHtml += '<li><a href="http://tampa.craigslist.org/"><b>tampa bay area</b></a></li>';
    sHtml += '<li><a href="http://terrahaute.craigslist.org/">terre haute</a></li>';
    sHtml += '<li><a href="http://texarkana.craigslist.org/">texarkana</a></li>';
    sHtml += '<li><a href="http://toledo.craigslist.org/">toledo</a></li>';
    sHtml += '<li><a href="http://topeka.craigslist.org/">topeka</a></li>';
    sHtml += '<li><a href="http://treasure.craigslist.org/">treasure coast</a></li>';
    sHtml += '<li><a href="http://tricities.craigslist.org/">tri-cities, TN</a></li>';
    sHtml += '<li><a href="http://tucson.craigslist.org/"><b>tucson</b></a></li>';
    sHtml += '<li><a href="http://tulsa.craigslist.org/">tulsa</a></li>';
    sHtml += '<li><a href="http://tuscaloosa.craigslist.org/">tuscaloosa</a></li>';
    sHtml += '<li><a href="http://twinfalls.craigslist.org/">twin falls</a></li>';
    sHtml += '<li><a href="http://easttexas.craigslist.org/">tyler / east TX</a></li>';
    sHtml += '<li><a href="http://up.craigslist.org/">upper peninsula</a></li>';
    sHtml += '<li><a href="http://utica.craigslist.org/">utica</a></li>';
    sHtml += '<li><a href="http://valdosta.craigslist.org/">valdosta</a></li>';
    sHtml += '<li><a href="http://ventura.craigslist.org/">ventura county</a></li>';
    sHtml += '<li><a href="http://burlington.craigslist.org/">vermont</a></li>';
    sHtml += '<li><a href="http://victoriatx.craigslist.org/">victoria, TX</a></li>';
    sHtml += '<li><a href="http://visalia.craigslist.org/">visalia-tulare</a></li>';
    sHtml += '<li><a href="http://waco.craigslist.org/">waco</a></li>';
    sHtml += '<li><a href="http://washingtondc.craigslist.org/"><b>washington, DC</b></a></li>';
    sHtml += '<li><a href="http://waterloo.craigslist.org/">waterloo / cedar falls</a></li>';
    sHtml += '<li><a href="http://watertown.craigslist.org/">watertown</a></li>';
    sHtml += '<li><a href="http://wausau.craigslist.org/">wausau</a></li>';
    sHtml += '<li><a href="http://wenatchee.craigslist.org/">wenatchee</a></li>';
    sHtml += '<li><a href="http://wv.craigslist.org/">west virginia (old)</a></li>';
    sHtml += '<li><a href="http://westky.craigslist.org/">western KY</a></li>';
    sHtml += '<li><a href="http://westmd.craigslist.org/">western maryland</a></li>';
    sHtml += '<li><a href="http://westernmass.craigslist.org/">western massachusetts</a></li>';
    sHtml += '<li><a href="http://westslope.craigslist.org/">western slope</a></li>';
    sHtml += '<li><a href="http://wheeling.craigslist.org/">wheeling, WV</a></li>';
    sHtml += '<li><a href="http://wichita.craigslist.org/">wichita</a></li>';
    sHtml += '<li><a href="http://wichitafalls.craigslist.org/">wichita falls</a></li>';
    sHtml += '<li><a href="http://williamsport.craigslist.org/">williamsport</a></li>';
    sHtml += '<li><a href="http://wilmington.craigslist.org/">wilmington, NC</a></li>';
    sHtml += '<li><a href="http://winstonsalem.craigslist.org/">winston-salem</a></li>';
    sHtml += '<li><a href="http://worcester.craigslist.org/">worcester / central MA</a></li>';
    sHtml += '<li><a href="http://wyoming.craigslist.org/">wyoming</a></li>';
    sHtml += '<li><a href="http://yakima.craigslist.org/">yakima</a></li>';
    sHtml += '<li><a href="http://york.craigslist.org/">york, PA</a></li>';
    sHtml += '<li><a href="http://youngstown.craigslist.org/">youngstown</a></li>';
    sHtml += '<li><a href="http://yubasutter.craigslist.org/">yuba-sutter</a></li>';
    sHtml += '<li><a href="http://yuma.craigslist.org/">yuma</a></li>';

    sHtml += '</ul>';
    sHtml += '<h5><a href="http://craigslist.ca/">Canada</a></h5>';
    sHtml += '<ul>';
    sHtml += '<li><a href="http://barrie.craigslist.ca/">barrie</a></li>';
    sHtml += '<li><a href="http://belleville.craigslist.ca/">belleville, ON</a></li>';
    sHtml += '<li><a href="http://calgary.craigslist.ca/">calgary</a></li>';
    sHtml += '<li><a href="http://chatham.craigslist.ca/">chatham-kent</a></li>';
    sHtml += '<li><a href="http://comoxvalley.craigslist.ca/">comox valley</a></li>';
    sHtml += '<li><a href="http://cornwall.craigslist.ca/">cornwall, ON</a></li>';
    sHtml += '<li><a href="http://cranbrook.craigslist.ca/">cranbrook, BC</a></li>';
    sHtml += '<li><a href="http://edmonton.craigslist.ca/">edmonton</a></li>';
    sHtml += '<li><a href="http://abbotsford.craigslist.ca/">fraser valley</a></li>';
    sHtml += '<li><a href="http://ftmcmurray.craigslist.ca/">ft mcmurray</a></li>';
    sHtml += '<li><a href="http://guelph.craigslist.ca/">guelph</a></li>';
    sHtml += '<li><a href="http://halifax.craigslist.ca/">halifax</a></li>';
    sHtml += '<li><a href="http://hamilton.craigslist.ca/">hamilton-burlington</a></li>';
    sHtml += '<li><a href="http://kamloops.craigslist.ca/">kamloops</a></li>';
    sHtml += '<li><a href="http://kelowna.craigslist.ca/">kelowna</a></li>';
    sHtml += '<li><a href="http://kingston.craigslist.ca/">kingston, ON</a></li>';
    sHtml += '<li><a href="http://kitchener.craigslist.ca/">kitchener-waterloo-cambridge</a></li>';
    sHtml += '<li><a href="http://lethbridge.craigslist.ca/">lethbridge</a></li>';
    sHtml += '<li><a href="http://londonon.craigslist.ca/">london, ON</a></li>';
    sHtml += '<li><a href="http://montreal.craigslist.ca/"><b>montreal</b></a></li>';
    sHtml += '<li><a href="http://nanaimo.craigslist.ca/">nanaimo</a></li>';
    sHtml += '<li><a href="http://newbrunswick.craigslist.ca/">new brunswick</a></li>';
    sHtml += '<li><a href="http://newfoundland.craigslist.ca/">newfoundland / labrador</a></li>';
    sHtml += '<li><a href="http://niagara.craigslist.ca/">niagara region</a></li>';
    sHtml += '<li><a href="http://ottawa.craigslist.ca/">ottawa-hull-gatineau</a></li>';
    sHtml += '<li><a href="http://owensound.craigslist.ca/">owen sound</a></li>';
    sHtml += '<li><a href="http://peterborough.craigslist.ca/">peterborough</a></li>';
    sHtml += '<li><a href="http://pei.craigslist.ca/">prince edward island</a></li>';
    sHtml += '<li><a href="http://princegeorge.craigslist.ca/">prince george</a></li>';
    sHtml += '<li><a href="http://quebec.craigslist.ca/">quebec city</a></li>';
    sHtml += '<li><a href="http://reddeer.craigslist.ca/">red deer</a></li>';
    sHtml += '<li><a href="http://regina.craigslist.ca/">regina</a></li>';
    sHtml += '<li><a href="http://saguenay.craigslist.ca/">saguenay</a></li>';
    sHtml += '<li><a href="http://sarnia.craigslist.ca/">sarnia</a></li>';
    sHtml += '<li><a href="http://saskatoon.craigslist.ca/">saskatchewan</a></li>';
    sHtml += '<li><a href="http://soo.craigslist.ca/">sault ste marie, ON</a></li>';
    sHtml += '<li><a href="http://sherbrooke.craigslist.ca/">sherbrooke</a></li>';
    sHtml += '<li><a href="http://sudbury.craigslist.ca/">sudbury</a></li>';
    sHtml += '<li><a href="http://territories.craigslist.ca/">territories</a></li>';
    sHtml += '<li><a href="http://thunderbay.craigslist.ca/">thunder bay</a></li>';
    sHtml += '<li><a href="http://toronto.craigslist.ca/"><b>toronto</b></a></li>';
    sHtml += '<li><a href="http://troisrivieres.craigslist.ca/">trois-rivieres</a></li>';
    sHtml += '<li><a href="http://vancouver.craigslist.ca/"><b>vancouver, BC</b></a></li>';
    sHtml += '<li><a href="http://victoria.craigslist.ca/">victoria</a></li>';
    sHtml += '<li><a href="http://whistler.craigslist.ca/">whistler, BC</a></li>';
    sHtml += '<li><a href="http://windsor.craigslist.ca/">windsor</a></li>';
    sHtml += '<li><a href="http://winnipeg.craigslist.ca/">winnipeg</a></li>';

    sHtml += '</ul>';
    sHtml += '<h5>Americas</h5>';
    sHtml += '<ul>';
    sHtml += '<li><a href="http://buenosaires.craigslist.org/">Argentina</a></li>';
    sHtml += '<li><a href="http://lima.craigslist.org/">Lima</a></li>';
    sHtml += '<li><a href="http://mexicocity.craigslist.org/">Mexico City</a></li>';
    sHtml += '<li><a href="http://rio.craigslist.org/">Rio De Jan</a></li>';
    sHtml += '<li><a href="http://costarica.craigslist.org/">Costa Rica</a></li>';
    sHtml += '<li><a href="http://santiago.craigslist.org/">Santiago</a></li>';
    sHtml += '<li><a href="http://saopaulo.craigslist.org/">São Paulo</a></li>';
    sHtml += '<li><a href="http://tijuana.craigslist.org/">Tijuana</a></li>';
    sHtml += '</ul>';
    sHtml += '<h5>Africa</h5>';
    sHtml += '<ul>';
    sHtml += '<li><a href="http://cairo.craigslist.org/">Cairo</a></li>';
    sHtml += '<li><a href="http://capetown.craigslist.org/">Cape Town</a></li>';
    sHtml += '<li><a href="http://johannesburg.craigslist.org/">Jo\'burg</a></li>';
    sHtml += '</ul>';
    sHtml += '<h5><a href="http://craigslist.co.uk/">United Kingdom</a> & <a href="http://geo.craigslist.org/iso/ie">Ireland</a></h5>';
    sHtml += '<ul>';
    sHtml += '<li><a href="http://belfast.craigslist.org/">Belfast</a></li>';
    sHtml += '<li><a href="http://birmingham.craigslist.org/">Birmingham</a></li>';
    sHtml += '<li><a href="http://bristol.craigslist.org/">Bristol</a></li>';
    sHtml += '<li><a href="http://cardiff.craigslist.org/">Cardiff</a></li>';
    sHtml += '<li><a href="http://dublin.craigslist.org/">Dublin</a></li>';
    sHtml += '<li><a href="http://edinburgh.craigslist.org/">Edinburgh</a></li>';
    sHtml += '<li><a href="http://glasgow.craigslist.org/">Glasgow</a></li>';
    sHtml += '<li><a href="http://leeds.craigslist.org/">Leeds</a></li>';
    sHtml += '<li><a href="http://liverpool.craigslist.org/">Liverpool</a></li>';
    sHtml += '<li><a href="http://london.craigslist.org/"><strong>London</strong></a></li>';
    sHtml += '<li><a href="http://manchester.craigslist.org/">Manchester</a></li>';
    sHtml += '<li><a href="http://oxford.craigslist.org/">Oxford</a></li>';
    sHtml += '<li><a href="http://newcastle.craigslist.org/">Newcastle</a></li>';
    sHtml += '</ul>';
    sHtml += '<h5>Europe</h5>';
    sHtml += '<ul>';
    sHtml += '<li><a href="http://amsterdam.craigslist.org/">Amsterdam</a></li>';
    sHtml += '<li><a href="http://athens.craigslist.org/">Athens</a></li>';
    sHtml += '<li><a href="http://barcelona.craigslist.org/">Barcelona</a></li>';
    sHtml += '<li><a href="http://berlin.craigslist.org/">Berlin</a></li>';
    sHtml += '<li><a href="http://brussels.craigslist.org/">Brussels</a></li>';
    sHtml += '<li><a href="http://copenhagen.craigslist.org/">Copenhagen</a></li>';
    sHtml += '<li><a href="http://florence.craigslist.org/">Florence</a></li>';
    sHtml += '<li><a href="http://frankfurt.craigslist.org/">Frankfurt</a></li>';
    sHtml += '<li><a href="http://geneva.craigslist.org/">Geneva</a></li>';
    sHtml += '<li><a href="http://madrid.craigslist.org/">Madrid</a></li>';
    sHtml += '<li><a href="http://milan.craigslist.org/">Milan</a></li>';
    sHtml += '<li><a href="http://moscow.craigslist.org/">Moscow</a></li>';
    sHtml += '<li><a href="http://munich.craigslist.org/">Munich</a></li>';
    sHtml += '<li><a href="http://paris.craigslist.org/">Paris</a></li>';
    sHtml += '<li><a href="http://prague.craigslist.org/">Prague</a></li>';
    sHtml += '<li><a href="http://rome.craigslist.org/">Rome</a></li>';
    sHtml += '<li><a href="http://stockholm.craigslist.org/">Stockholm</a></li>';
    sHtml += '<li><a href="http://vienna.craigslist.org/">Vienna</a></li>';
    sHtml += '<li><a href="http://zurich.craigslist.org/">Zurich</a></li>';
    sHtml += '</ul>';
    sHtml += '<h5>Asia</h5>';
    sHtml += '<ul>';
    sHtml += '<li><a href="http://bangalore.craigslist.org/">Bangalore</a></li>';
    sHtml += '<li><a href="http://bangkok.craigslist.org/">Bangkok</a></li>';
    sHtml += '<li><a href="http://beijing.craigslist.org/">Beijing</a></li>';
    sHtml += '<li><a href="http://chennai.craigslist.org/">Chennai</a></li>';
    sHtml += '<li><a href="http://delhi.craigslist.org/">Delhi</a></li>';
    sHtml += '<li><a href="http://fukuoka.craigslist.jp/">fukuoka</a></li>';
    sHtml += '<li><a href="http://hiroshima.craigslist.jp/">hiroshima</a></li>';
    sHtml += '<li><a href="http://hyderabad.craigslist.org/">Hyderabad</a></li>';
    sHtml += '<li><a href="http://hongkong.craigslist.org/">Hong Kong</a></li>';
    sHtml += '<li><a href="http://istanbul.craigslist.org/">Istanbul</a></li>';
    sHtml += '<li><a href="http://jerusalem.craigslist.org/">Jerusalem</a></li>';
    sHtml += '<li><a href="http://manila.craigslist.org/">Manila</a></li>';
    sHtml += '<li><a href="http://mumbai.craigslist.org/">Mumbai</a></li>';
    sHtml += '<li><a href="http://nagoya.craigslist.jp/">nagoya</a></li>';
    sHtml += '<li><a href="http://okinawa.craigslist.jp/">okinawa</a></li>';
    sHtml += '<li><a href="http://osaka.craigslist.jp/">Osaka</a></li>';
    sHtml += '<li><a href="http://sapporo.craigslist.jp/">sapporo</a></li>';
    sHtml += '<li><a href="http://seoul.craigslist.org/">Seoul</a></li>';
    sHtml += '<li><a href="http://shanghai.craigslist.org/">Shanghai</a></li>';
    sHtml += '<li><a href="http://singapore.craigslist.org/">Singapore</a></li>';
    sHtml += '<li><a href="http://taipei.craigslist.org/">Taipei</a></li>';
    sHtml += '<li><a href="http://telaviv.craigslist.org/">Tel Aviv</a></li>';
    sHtml += '<li><a href="http://tokyo.craigslist.jp/">Tokyo</a></li>';
    sHtml += '</ul>';
    sHtml += '<h5><a href="http://geo.craigslist.org/iso/au">Australia</a> & <a href="http://geo.craigslist.org/iso/nz">New Zealand</a></h5>';
    sHtml += '<ul>';
    sHtml += '<li><a href="http://adelaide.craigslist.com.au/">adelaide</a></li>';
    sHtml += '<li><a href="http://brisbane.craigslist.com.au/">brisbane</a></li>';
    sHtml += '<li><a href="http://canberra.craigslist.com.au/">canberra</a></li>';
    sHtml += '<li><a href="http://darwin.craigslist.com.au/">darwin</a></li>';
    sHtml += '<li><a href="http://hobart.craigslist.com.au/">hobart</a></li>';
    sHtml += '<li><a href="http://melbourne.craigslist.com.au/">melbourne</a></li>';
    sHtml += '<li><a href="http://perth.craigslist.com.au/">perth</a></li>';
    sHtml += '<li><a href="http://sydney.craigslist.com.au/">sydney</a></li>';
    sHtml += '<li><a href="http://auckland.craigslist.org/">auckland</a></li>';
    sHtml += '<li><a href="http://christchurch.craigslist.org/">christchurch</a></li>';
    sHtml += '<li><a href="http://wellington.craigslist.org/">wellington</a></li>';
    sHtml += '</ul>';
    sHtml += '</div>';
    document.getElementsByTagName('body')[0].innerHTML = sHtml;

    // adds CSS
    addGlobalStyle('::-moz-selection { background: #3399FF; color: #FFFFFF; } a { text-decoration:none; color: #0066CC; } body { margin: 0; padding: 0; } #main h1 { width: 100%; text-align: center; font-family: "Microsoft Sans Serif", Tahoma, Arial, sans-serif; font-weight: normal; font-size: 24px; padding-bottom: 0; margin-bottom: 25px; } #main h1 span { color: #0066CC; } #main h1 em { font-style: normal; } #main h1 img { margin-bottom: -15px; } #wrapper { margin: 0 50px 0 50px; } #wrapper h2 { height: 15px; font-family: Arial, Helvetica, Verdana, sans; font-size: 12px; color: #333333; border-top: 4px solid #333333; padding: 3px 15px 15px 0; margin: 0; } #wrapper h4 { height: 15px; font-family: Arial, Helvetica, Verdana, sans; font-size: 11px; font-weight: normal; color: #999999; border-top: 4px solid #D6D6D6; padding: 3px 15px 15px 0; margin: 0; } #wrapper h4 a { text-decoration: none; color: #333333; } #wrapper h4 a:hover { text-decoration: underline; } #wrapper .l { float: left; width: 190px; } #wrapper .events { font-family: Arial, Helvetica, Verdana, sans; font-size: 11px; text-align: center; vertical-align: middle; border: 2px solid #C8C8C8; border-bottom: 1px solid #C8C8C8; border-right: 1px solid #C8C8C8; padding: 0; margin: 0 0 30px 0; } #wrapper .events .days { background: #555555; color: #FFFFFF; } #wrapper .events #today { background: #FFFF99; } #wrapper .events td { width: 23px; height: 23px; border-bottom: 1px solid #C8C8C8; border-right: 1px solid #C8C8C8; } #wrapper .events td a { color: #0066CC; text-decoration: none; } #wrapper .events td a:visited { color: #330066; } #wrapper .events td a:hover { text-decoration: underline; } #wrapper .highlight { padding: 0; margin: 0 0 15px 0; } #wrapper .highlight a { background: #FFFF99; font-family: Arial, Helvetica, Verdana, sans; font-size: 11px; text-decoration: none; font-weight: bold; color: #333333; padding: 2px; } #wrapper .highlight a:hover { background: #333333; color: #FFFFFF; } #wrapper ul { font-family: Arial, Helvetica, Verdana, sans; font-size: 11px; list-style: none; padding: 0; margin: 0 0 25px 0; } #wrapper ul li { line-height: 16px; } #wrapper ul li a { color: #333333; text-decoration: none; } #wrapper ul li a:hover { text-decoration: underline; } #wrapper .m { float: left; width: 190px; } #wrapper .m hr { margin: 0; } #wrapper .m ul { font-family: Georgia, Times, serif; font-size: 12px; padding-left: 6px; } #wrapper .m ul li a { color: #0066CC; } #wrapper .m ul li a:visited { color: #330066; } #wrapper .m ._l h2, #wrapper .m ._m h2, #wrapper .m ._r h2 { height: 27px; font-family: Georgia, Times, serif; font-size: 22px; font-weight: normal; color: #0066CC; border-top: 4px solid #D6D6D6; padding: 8px 20px 8px 8px; margin: 0 0 0 0; } #wrapper .m ._l h2 a, #wrapper .m ._m h2 a, #wrapper .m ._r h2 a { color: #0066CC; text-decoration: none; } #wrapper .m ._l h2 a:hover, #wrapper .m ._m h2 a:hover, #wrapper .m ._r h2 a:hover { color: #0066CC; text-decoration: none; } #wrapper .m ._l { width: 165px; float: left; border-top: 1px solid #999999; border-left: 1px solid #D6D6D6; margin: 0 0 0 10px; } #wrapper .m ._m { width: 165px; float: left; border-top: 1px solid #999999; border-left: 1px solid #D6D6D6; } #wrapper .m ._r { width: 165px; float: left; border-top: 1px solid #999999; border-left: 1px solid #D6D6D6; border-right: 1px solid #D6D6D6; margin: 0 10px 0 0; } #wrapper .r { float: left; width: 190px; padding-bottom: 25px; } #wrapper .r p { font-family: Arial, Helvetica, Verdana, sans; font-size: 11px; line-height: 16px; width: 50%; float: left; padding: 0; margin: 0; } #wrapper .r p a { color: #333333; text-decoration: none; } #wrapper .r p a:hover { text-decoration: underline; } #all_cities { clear: both; margin: 0 50px 0 50px; padding-top: 40px; padding-bottom: 40px; } #all_cities h2 { height: 15px; font-family: Arial, Helvetica, Verdana, sans; font-size: 12px; color: #333333; border-top: 4px solid #333333; padding: 3px 15px 15px 0; margin: 0; } #all_cities h5 { clear: both; font-family: Arial, Helvetica, Verdana, sans; display: block; font-size: 12px; padding: 20px 0 5px 0; margin: 0; color: #333333; } #all_cities ul { list-style: none; padding: 0; margin: 0; } #all_cities ul li { float: left; padding: 0; margin: 0; } #all_cities ul li a { margin-right: 10px; font-family: Georgia, Times, serif; color: #0066CC; line-height: 160%; font-size: 11px; text-decoration: none; } #all_cities ul li a:hover { text-decoration: underline; }');
	bar_css();

} else {
	sCity = GM_getValue("sCity");
    sClassifieds = GM_getValue("sClassifieds");
    sAreaId = GM_getValue("sAreaId");
    var sHtml = "";
	sHtml += top_bar();
	var other = document.getElementsByTagName('body')[0].innerHTML;
    document.getElementsByTagName('body')[0].innerHTML = top_bar() + "<div style='padding:0 10px'>" + other + "</div>";


	addGlobalStyle('.toc h4,.toc .sh{border:0;background:#FFF;border-top:4px solid #DDD;color:#999;font-size:0.9em;width:90%;padding:6px 5px;}');
    addGlobalStyle('body, table { font: normal normal normal 12px/normal Georgia, Garamond, Times, serif;color: #333333; } body { font-size: 12px; background:#FFF;margin:0; } a { color: #0066CC; text-decoration: none; } a:hover { text-decoration: underline; } h2, h3 { font-family: Georgia, Times, serif; font-size: 20px; font-weight: normal; } h3 a { color: #0066CC; text-decoration: none; }h4 { background: #FFF; }hr { height: 1px; background: #000000; color: #000000; border: 0; padding: 0; margin: 0 0 10px 0; } b a { font-size: 11px; font-weight: normal; text-decoration: none; color: #333333; } b a:hover { text-decoration: underline; } form table { color: #333333; border: 0; border-spacing: 0; padding: 0; margin: 0; } form table tr td { padding: 5px; } blockquote { font-family: Georgia, Times, serif; font-size: 1.1em; } blockquote div { padding: 5px; } blockquote a:visited { color: #330066; } blockquote p { padding-left: 5px; } blockquote font { font-size: 12px; margin-left: 5px; }tr span {text-transform:lowercase;}');
	bar_css();
	addGlobalStyle("#search input { height: 22px; }");
	if(document.getElementsByTagName('a')[6].innerHTML != "email this posting to a friend")
	{
		document.getElementsByTagName("table")[0].setAttribute("style", "white-space: nowrap; background:#eee; border-top: 4px solid #ccc; padding:4px");
	} else {
		addGlobalStyle("#search input { height: 15px; }");
	}
}

function top_bar() {
	var bar;
	bar  = '<div id="search">';
    bar += '<h3><a href="' + sClassifieds + '">post to classifieds</a></h3>';
    bar += '<form action="/cgi-bin/search" method="get"><input type="hidden" name="areaID" value="' + sAreaId + '"><input type="hidden" name="subAreaID" value="">';
    bar += '<input type="text" id="query" name="query" value="search" onblur="if(this.value==\'\')this.value=\'search\';" onfocus="if (this.value == \'search\') { this.value = \'\'};" /><br /> ';
    bar += '<select name="catAbbreviation">choose type</option>';
	bar += '<option value="ccc">community</option>';
	bar += '<option value="eee">events</option>';
	bar += '<option value="ggg">gigs</option>';
	bar += '<option value="hhh">housing</option>';
	bar += '<option value="jjj">jobs</option>';
	// If Family Safe is off (0) then display Personals Search
	if(GM_getValue("FamilySafe") == 0) {
		bar += '<option value="ppp">personals</option>';
	}
	bar += '<option value="res">resumes</option>';
	bar += '<option selected value="sss">for sale</option>';
	bar += '<option value="bbb">services</option>';
	bar += '</select> ';
    bar += '<button type="submit">GO</button></form>';
    bar += '<br /><a href="https://accounts.craigslist.org/">my account .</a> <a href="/about/terms.of.use.html">  terms of use .</a><br /> <a href="/about/">about us .</a> <a href="/about/privacy_policy">privacy .</a> <a href="/about/help/">help</a>';
    bar += '</div>';
	return bar;
}

function bar_css() {
	addGlobalStyle('#search { width: 100%; background: #333333; font-family: Arial, Helvetica, Verdana, sans; padding: 10px 0 10px 0; } #search h3 { display: inline; padding: 0; margin: 0; } #search h3 a { width: 120px; background: #0066CC; font-size: 11px; text-decoration: none; color: #FFFFFF; padding: 4px 7px 4px 7px; margin: 0 20px 0 50px; } #search h3 a:hover { background: #FFFFFF; color: #0066CC; } #search form { display: inline; } #search input { height: 15px; } #search p { position: absolute; top: 0; right: 0; padding: 9px 0 0 0; margin: 0 50px 0 0; } #search p a { font-size: 11px; color: #AAAAAA; padding: 0 0 0 5px; } #search p a:hover { text-decoration: none; color: #DDDDDD; }');
}

function leadingZero(nr) { if (nr < 10) nr = "0" + nr; return nr; }
function buildCal(m, y, cM, cH, cDW, cD, brdr){
    var mn=['January','February','March','April','May','June','July','August','September','October','November','December'];
    var dim=[31,0,31,30,31,30,31,31,30,31,30,31];
    sMonth = leadingZero(m);
    var oD = new Date(y, m-1, 1); //DD replaced line to fix date bug when current day is 31st
    oD.od=oD.getDay()+1; //DD replaced line to fix date bug when current day is 31st
    var todaydate=new Date() //DD added
    var scanfortoday=(y==todaydate.getFullYear() && m==todaydate.getMonth()+1)? todaydate.getDate() : 0 //DD added
    dim[1]=(((oD.getFullYear()%100!=0)&&(oD.getFullYear()%4==0))||(oD.getFullYear()%400==0))?29:28;
    var t='<table class="'+cM+'" cols="7" cellpadding="0" border="'+brdr+'" cellspacing="0">';
    t+='<tr align="center">';
	for(s=0;s<7;s++)t+='<td class="'+cDW+'">'+"SMTWTFS".substr(s,1)+'</td>';
    t+='</tr><tr align="center">';
	for(i=1;i<=35;i++){
	var x=((i-oD.od>=0)&&(i-oD.od<dim[m-1]))? i-oD.od+1 : '&nbsp;';
	if (x==scanfortoday) { //DD added
    t+='<td id="today" class="'+cD+'"><a href="/cal/index' + y+sMonth+x + '.html">'+x+'</a></td>';}
	else {
	t+='<td class="'+cD+'"><a href="/cal/index' + y+sMonth+x + '.html">'+x+'</a></td>'; }
	if(((i)%7==0)&&(i<36))t+='</tr><tr align="center">';
	}
	return t+='</tr></table>';
}


// Greasemonkey script: craigslist tool by Josh Trefethen
//=====================
// Create Frameset
//=====================
//if there is no frame, create it
if(top.frames.length == 0){
	var src = window.location.href;
	var leftSrc = '';
	// if the URL is a posting page, open the corresponsing listing in the left frame
	//ex: https://www.craigslist.org/sfc/jjj/nnnn.htm
	if(src.indexOf('.htm') > 0){
		leftSrc = src.substring(0,src.lastIndexOf('/'));
	}
	else{
		// otherwise open the default page in the right
		leftSrc = src;
		src = 'http://www.google.com/search?as_sitesearch=kansascity.craigslist.org'
	}
	document.body = document.createElement('frameset');
	document.body.setAttribute('rows','*');
	document.body.setAttribute('cols','320,*');
	leftFrame = document.createElement('frame')
		leftFrame.setAttribute('name',"left")
		leftFrame.setAttribute('src',leftSrc);	
 	//botFrameSet = document.createElement('frameset')
	//	botFrameSet.setAttribute('rows',"30,*")
	//	botFrameSet.setAttribute('cols',"*")
	document.body.appendChild(leftFrame);
	//document.body.appendChild(botFrameSet);
	//navFrame = document.createElement('frame')
	//	navFrame.setAttribute('name',"nav")
	//	navFrame.setAttribute('src',"http://home.gwu.edu/~kengo/craigtool/craignext.htm");
	rightFrame = document.createElement('frame')
		rightFrame.setAttribute('name',"right")
		rightFrame.setAttribute('src',src);
	//botFrameSet.appendChild(navFrame);
	//botFrameSet.appendChild(rightFrame);
	document.body.appendChild(rightFrame);
	leftFrame.contentDocument.location = leftSrc;
	rightFrame.contentDocument.location = src;
	
}
// Add styles
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle(
			   'body { font-family: Verdana,Arial,sans-serif;line-height:16px; ! important; background:#FFFFFF;'+ 
			   'font-size:10pt !important;'+
			   '}'+
				'a{text-decoration:none; color:#003DB8 ;}a:hover{text-decoration:underline;background-color:#eaeaea;}a:visited{color:#660066;}'+
				'td{font-family: Verdana,Arial,sans-serif;line-height:16px; ! important;font-size:12pt !important; }'
				)

//=====================
// Helper function to remove element
//=====================
function removeSection(tag,n) {
	try{
						
			var t = document.getElementsByTagName(tag)[n];
				
				// if not a table for images
				if (t.summary != "craigslist hosted images" || t.parentNode.summary != "craigslist hosted images" || t.parentNode.summary !="main"){
					//find parent
					t.parentNode.removeChild(t);
					
				}
				
			
	}
		catch(e){
			return;}
}
//=====================
// Remove sections of the page to make it more readable
//=====================
// Check if first table is the bread crumbs and then remove the first cell and links to scam and flagging info
// Added check for img tag for postings with images.
if (document.getElementsByTagName('table')[0].summary != "main"){
var td = document.getElementsByTagName('td')[0];
	if (td && td.innerHTML.match('craigslist')&& !td.innerHTML.match('img') ){
		removeSection('td',2);
		removeSection('table',2);
	}
//remove two lines before results
removeSection('br',0);
removeSection('br',1);
// remove printerfriendly button
removeSection('form',1);
}

//=====================
// remove BLockquotes
//=====================
var d = document.body.innerHTML;
if(d.match('blockquote')){
	d=d.replace("<blockquote>","").replace("</blockquote>","").replace("<blockquote>","").replace("</blockquote>","");
	document.body.innerHTML =d;

}


//=====================
// Adjust links to open in right frame.
//=====================
// change links to open in loadhere frame
var a = document.getElementsByTagName('a');
if (a.length >0){
	for (var i = 0; i < a.length; i++) 
		{
			var ai = a[i].href;
			// if link contains .html change target location
				
				if (ai.match('.html')||ai.match('post')||ai.match('help')||ai.match('map'))
				{
					if(ai.match('index')!='index'){
						a[i].target="right";
					}
					
				}
				else
				{
					a[i].target="left";
				}
				// 3/1/06 kg: aded for inline google map
				//find google map link
					if(ai.match('maps.google')){
						//alert(ai);
						//create div for map
						insertMap(ai);
					}
				
		}
}

//=====================
// 3/1/06: added for inline google map
// insert google map at the bottom
//=====================
function insertMap(url) {
	 var mapurl = url;
	 var gmd = document.createElement("div");
	 gmd.id = 'gmd';
	 var plural = '';
	 var d=document; var m=d.createElement('div');
	 var str = '<iframe id=gmf width=100% height=450 src="'+mapurl+'"></iframe>'
	 m.innerHTML = str;
	 d.body.appendChild(m);
}

//=====================
// make the links look all nice and pretty
//=====================
p = document.getElementsByTagName('p');
if (p.length >0){
	for (var i = 0; i < p.length; i++) 
		{
				if((i % 2) ==0){
					p[i].setAttribute("style","background:#EFF2F7;border:1px dashed #a5b2bd; padding:3pt");	
				}else{
					p[i].setAttribute("style","border:1px dashed #a5b2bd; padding:3pt")  ;	
				}
		}
}

