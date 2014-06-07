// Group Forum Menu
// c r e a t e d   b y   the eNeME
// 08/08/2011
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Group Forum Menu", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name		Group Forum Menu
// @version		3.1
// @namespace		http://www.bungie.net/Forums/posts.aspx?postID=27428424
// @description		Adds a sub-menu with links to your private group forums to the "Private Groups" link on Bungie.net.
// @changes		Updated CSS for new Bungie.net look.
// @include		*bungie.net/*
// ==/UserScript==

var loggedIn = document.getElementById('ctl00_dashboardNav_loggedInNormal');

if(loggedIn != null) {
	function setCookie(name, value) {
		document.cookie= name + "=" + escape(value) + ";path=/";
	}

	function getCookie(name) {
		var results = document.cookie.match(name + '=(.*?)(;|$)');
		if (results)
			return (unescape(results[1]));
		else
			return null;
	}

	var groupLinks = new Array;

	document.getElementById('ctl00_dashboardNav_navMenuRepeater_ctl04_childRepeater_ctl00_childRepeater_ctl00_itemLink').setAttribute("class","nav-icons subsubmenuTrigger");
	document.getElementById('ctl00_dashboardNav_navMenuRepeater_ctl04_childRepeater_ctl00_childRepeater_ctl00_itemLink').setAttribute("onMouseOver","t1 = setTimeout('show_groups()',500);");
	document.getElementById('ctl00_dashboardNav_navMenuRepeater_ctl04_childRepeater_ctl00_childRepeater_ctl00_itemLink').setAttribute("onMouseOut","clearTimeout(t1);");

	var links = new Array;
	var newDiv = document.createElement("div");
	var doc, html, doc1, html1;
	var forumLink;
	var newLink;
	var listcontents="<ul id='groups_list' style='list-style-type: none; position: absolute; top: 10px; left:100%; background: rgb(0, 0, 0); border: 2px solid rgb(30, 25, 25); display: none;' class='subsubmenu'>";
	var groupName;

	var injectIndex = document.getElementById('ctl00_dashboardNav_navMenuRepeater_ctl04_childRepeater_ctl00_submenu').innerHTML.indexOf("Private Groups")+"Private Groups".length;
	var cData = getCookie("grouplist")
	
	if(cData == null) {
		GM_xmlhttpRequest ({
			method: "GET",
			url: "http://www.bungie.net/Account/Profile.aspx?page=Chapters",
			headers: {
				"User-agent": "Mozilla/5.0",
				"Accept": "text/html",
			},
			onload: function (response1) {
				doc1 = document.implementation.createDocument ("", "", null);
				html1 = document.createElement ("html");
				html1.innerHTML = response1.responseText;
				doc1.appendChild (html1);
				//doc1 contains source of groups page.
				groupLinks = doc1.getElementById('ctl00_mainContent_chaptersPanel').getElementsByTagName("a"); //links to group main pages
				for (var i = 0; i < groupLinks.length-2; i++) {
					GM_xmlhttpRequest ({
						method: "GET",
						url: "http://www.bungie.net"+groupLinks[i].href,
						headers: {
							"User-agent": "Mozilla/5.0",
							"Accept": "text/html",
						},
						onload: function (response){
							doc = document.implementation.createDocument ("", "", null);
							html = document.createElement ("html");
							html.innerHTML = response.responseText;
							doc.appendChild (html);
							//doc contains HTML source from group's home page
							forumLink = doc.getElementById('ctl00_groupForumsLink').href;
							groupName = doc.getElementById('ctl00_groupHomeLink').innerHTML.substr(0,doc.getElementById('ctl00_groupHomeLink').innerHTML.length-" Home".length);
							cData = getCookie("grouplist");
							setCookie("grouplist",groupName+"|"+forumLink+";"+cData);
							newLink = "<a href='"+forumLink+"'><span></span>"+groupName+"</a>";
							listcontents+="<li>"+newLink+"</li>";
							newDiv.innerHTML = listcontents+"</ul>";
							//FORMATED LIST IS IN newDiv!
							document.getElementById('ctl00_dashboardNav_navMenuRepeater_ctl04_childRepeater_ctl00_submenu').innerHTML = document.getElementById('ctl00_dashboardNav_navMenuRepeater_ctl04_childRepeater_ctl00_submenu').innerHTML.substring(0,injectIndex)+newDiv.innerHTML+document.getElementById('ctl00_dashboardNav_navMenuRepeater_ctl04_childRepeater_ctl00_submenu').innerHTML.substring(injectIndex);
						}
					});
				}
			}
		});
	}
	
	else {
		var groups = new Array();
		var end = 0, group;
		//add groups to array
		while(group != "") {
			end = cData.indexOf(";");
			group = cData.substring(0,end);
			end++;
			cData = cData.substr(end);
			groups.push(group);
		}
		//sort gorups
		groups.sort();
		//format sorted groups as <ul> element
		for (var i = 1; i < groups.length; i++)
			listcontents = listcontents + "<li><a href='" + groups[i].substr(groups[i].indexOf("|")+1) +"'>"+groups[i].substring(0,groups[i].indexOf("|"))+"</a></li>";
		listcontents = listcontents+"</ul>";
		//place <ul> element on page
		document.getElementById('ctl00_dashboardNav_navMenuRepeater_ctl04_childRepeater_ctl00_submenu').innerHTML = document.getElementById('ctl00_dashboardNav_navMenuRepeater_ctl04_childRepeater_ctl00_submenu').innerHTML.substring(0,injectIndex)+listcontents+document.getElementById('ctl00_dashboardNav_navMenuRepeater_ctl04_childRepeater_ctl00_submenu').innerHTML.substring(injectIndex);
	}
	
	function addGlobalScript(js) {
		var head, script;
		head = document.getElementsByTagName('head')[0];
		if (!head) { return; }
		script = document.createElement('script');
		script.type = 'text/javascript';
		script.innerHTML = js;
		head.appendChild(script);
	}

	addGlobalScript(
	"function show_groups() {" +
	"	document.getElementById('groups_list').setAttribute('style','list-style-type: none; position: absolute; top: 0px; left:100%; background: rgb(0, 0, 0); border: 2px solid rgb(30, 25, 25); display: block;');" +
	"}"
	);
	addGlobalScript(
	"function hide_groups() {" +
	"	document.getElementById('groups_list').setAttribute('style','list-style-type: none; position: absolute; top: 0px; left:100%; background: rgb(0, 0, 0); border: 2px solid rgb(30, 25, 25); display: none;');" +
	"}"
	);
}

//		  GTFO
//		d[(**)]T
//     MAI SCRIPT
//
//		 jk <3