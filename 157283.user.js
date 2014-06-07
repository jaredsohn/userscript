// ==UserScript==
// @author         llbpeta 
// @name           VPLAY.RO A&C Removal 1280/720
// @description    This script removes the ads and comments from VPLAY.RO and change play resolution with 1280/720
// @icon           http://s3.amazonaws.com/uso_ss/icon/157283/large.png
// @include        http://vplay.ro/*
// @include        https://vplay.ro/*
// @include        http://www.vplay.ro/*
// @include        https://www.vplay.ro/*
// @grant          GM_setValue
// @grant          GM_xmlhttpRequest
// @grant          GM_getValue
// @grant   	   GM_addStyle
// @require        http://userscripts.org/scripts/source/150227.user.js
// @version        1.7
// ==/UserScript==

autoUpdate(157283, "1.7");

//no add
GM_addStyle("div.wvad, div.dark-page-content div > a[href='http://loveyou.do/'],div.sqpadd { display: none !important; }");

GM_addStyle(".center, #content, .footer {width: 1280px;}");
if ("watch" == /watch/.exec(document.URL))
{
	var elmDeleted = document.getElementById("videoplayer").childNodes[0].getAttributeNode("flashvars").value="HD=0&amp;voteEnabled=1&amp;external=0&amp;autoplay=1&amp;enableNextEvent=1&amp;ping=true&amp;pingInterval=300&amp;key=7n5imp6m&amp;normalSubsSize=45&amp;fullscreenSubsSize=56&amp;normalTextFieldWidth=900&amp;fullscreenTextFieldWidth=1000";
	var elmDeleted = document.getElementById("videoplayer").childNodes[0].getAttributeNode("height").value="720";
	var elmDeleted = document.getElementById("videoplayer").childNodes[0].getAttributeNode("width").value="1280";
//block comentarii
	GM_addStyle(".dark-page-content { display: none !important; }");
	GM_addStyle(".play-page-content { display: none !important; }");
}
if ("coll" == /coll/.exec(document.URL))
{
	GM_addStyle(".colls_oview .center {width: 1270px;}");	
	GM_addStyle(".dark .pagination {width: 1240px;}");	
	if ("new" == /new/.exec(document.URL))
	{
		GM_addStyle(".new_episodes li {width: 207px; height: 100%; margin: 2px;}");
		GM_addStyle(".coll_list li a {width: 202px; height: 150px; padding: 5px 0px 10px 5px ;}")
		GM_addStyle(".coll_list li a {background: url('http://i.vplay.ro/it/ic/episode_back.gif') repeat-x scroll left top rgb(58, 61, 66);  box-shadow: 1px 1px 1px 0px rgba(0, 0, 0, 0.15);}");	
		GM_addStyle(".new_episodes li a .coll_poster {width: 196px; height: 99px; background-size: 196px 99px;}");
		GM_addStyle(".colls_oview .center {background: none repeat scroll 0% 0% rgb(80, 82, 86); min-height: 300px; padding: 5px;}");
	}else{
		GM_addStyle(".coll_list li {width: 305px;}");
	}
}
if ("watch" !== /watch/.exec(document.URL))
{
	var elmDeleted = document.getElementById("content").childNodes[9].setAttribute("style", "width:1280px;");
	GM_addStyle("#content .box {height: 125px;}");
	GM_addStyle(".tabs {width: 1280px;}");
	GM_addStyle(".tabs ul {width: 1280px}");
	GM_addStyle("#tabs-content {width: 1260px;}");
	GM_addStyle("#tabs-content li a {width: 196px;}");
	GM_addStyle("#tabs-content li a .thumb {width: 196px;}");
	GM_addStyle("#tabs-content li a .title {width: 196px; margin-left:10px;}");
	GM_addStyle("#tabs-content li a .watch {margin-left: 10px;}");
}