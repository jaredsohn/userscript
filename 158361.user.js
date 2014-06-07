// ==UserScript==
// @description Couchsurfing continues to make changes to their site without recognizing that they are alienating the community that built the site to what it is. This plugin restores some of the features that they have removed. 
// @name        CS-Nav-Links
// @namespace   Couchsurfing Plugin (Beta)
// @version     0.3.12
// @include     http*://www.couchsurfing.org/*	
// @include     http*://couchsurfing.zendesk.com/*	
// ==/UserScript==

//Adjust the styles sheet for CS Website
// Change the those stupid portholes to square pictures
GM_addStyle(".avatar.circle, .avatar.sm_circle, .avatar.md_circle{-webkit-border-radius:5px; border-radius:5px}");
GM_addStyle("a.profile-image.square {-webkit-border-radius:5px; border-radius:5px}");
// Add shadow to the Community Details to make it stand out more. 
GM_addStyle(".pinned-container {box-shadow: 4px 4px 4px 4px;}");
// make images stand out more
GM_addStyle('a > img:hover {opacity:0.6;}');
// widen the dropdown menu
GM_addStyle(".topbar .dropdown ul {width: 177px;}");

(function() {
	var shadowbox = "-moz-box-shadow: 5px 6px 6px 3px #A9A9A9; -webkit-box-shadow: 5px 6px 6px 3px #A9A9A9; box-shadow:5px 6px 6px 3px #A9A9A9;";
    var roundedcorners = "-webkit-border-radius: 10px; border-radius: 10px;"; 
    var places = false;
    // Add link to the global map
    var maps = document.querySelector('.search-box-in-navbar > a');
    if (maps) {
    	var newmap = maps.parentNode.insertBefore(document.createElement("a"), maps);
    	newmap.className = "home-button";
    	newmap.href = "http://on.fb.me/WQnK7o";
    	newmap.target = "_blank";
        newmap.innerHTML = '<img src="https://dl.dropbox.com/s/cr65goyppe0kv28/network-globe2.png" style="margin:-2px 0px 0px -50px; position:fixed; box-shadow: 4px 4px 4px 4px;" />';
    }
    // Add link to dashboard
    var dashboard = document.querySelector('.search-box-in-navbar > a');
    if (dashboard) {
   		var newdash = dashboard.parentNode.insertBefore(document.createElement("a"), dashboard);
    	newdash.className = "home-button";
    	newdash.href = "https://www.couchsurfing.org/home";
    	newdash.innerHTML = '<img src="https://dl.dropbox.com/s/uqqsj79ydap66vk/view-choose-2.png" style="margin:-2px 0 0 -90px; position:fixed; box-shadow: 4px 4px 4px 4px;" />';
    }
    
    var setting = document.querySelector('.custom_dropdown_list > li > a');
    if (!setting) {
        places = true;
        setting = document.querySelector('.dropdown-menu > li > a');
    }
    if (!setting) {
    	return;
    }
    
    // Add box to top of conversations 
    var title = document.getElementsByTagName('title')[0].innerHTML;
    var city = title.split(' - ')[0]; 
    var conversations = document.querySelector('.span8 > .row-fluid');
    if (conversations) {
   		var newtw = conversations.parentNode.insertBefore(document.createElement("div"), conversations);
    	newtw.className = "row-fluid well-light span12";
        newtw.style.cssText = 'margin-bottom:15px; padding:0px 15px;'+ shadowbox;
        newtw.innerHTML = '<h2>Find Travel Guides for '+ city +'</h2>'
        + '<a href="http://wikitravel.org/wiki/en/index.php?search='+ encodeURI(city) +'&fulltext=Search" target="_blank">'
        + '<img src="https://dl.dropbox.com/s/fkmqocquegs3gcl/wikitravel.png" style="padding:0px 5px 4px 0px; margin-right:20px;'+ shadowbox + roundedcorners + ';" /></a>'
        + '<a href="http://couchwiki.org/en/index.php?search='+ encodeURI(city) +'&fulltext=Search" target="_blank">'
        + '<img src="https://dl.dropbox.com/s/d3pk0zhouqhxojh/wiki.logo.amylin.png" style="height:56px; padding:0px 5px 4px 5px; margin-right:20px;' + shadowbox + roundedcorners +' "/></a>'
        + '<a href="http://couchwiki.org/en/CouchSurfing_censorship" target="_blank">'
        + '<img src="https://dl.dropbox.com/s/lc5fkmcqbj5hu60/censoredsurfing.png" style="padding:0px 5px 4px 5px; ' + shadowbox + roundedcorners +' "/></a>'
        + '<hr /><h3>Please read this before you post</h3>'
        + '<p>'
        + 'The local community wants to ensure that you have the best possible experience while visiting our area. With a large group of people'
        + ' from various different cultural backgrounds.....(<a href="https://docs.google.com/document/d/14XIxxKYpKF93ufvwrakkV1efxE1sp7Fzx59o_AQh3H8/edit?usp=sharing" target="_blank">Read More</a>)</p>';
    }
    
    
    // Add items to dropdown menu
    var submenu = setting.parentNode.insertBefore(document.createElement("ul"), setting);
    submenu.id = "sub-menu";
    submenu.className = "dropdown-menu";
    submenu.innerHTML = '<li><a data-nav="settings" href="https://www.couchsurfing.org/groups" title="Find all the groups on couchsurfing">'
    + 'Groups</a></li>'
    + '<li><a data-nav="settings" href="https://www.couchsurfing.org/group_posts_user.html" title="A listing of all your group posts. Sorry there is nothing for places posts at the moment">'
    + 'Group Posts</a></li>'
    + '<li><a data-nav="settings" href="https://www.couchsurfing.org/search/activity" title="Find out what events and activities couchsurfers are planning.">'
    + 'Activities</a></li>'
    + '<li><a data-nav="settings" href="http://www.couchsurfing.org/connections.html" title="All of your friends on CS">'
    + 'Friends</a></li>'
    + '<li><a data-nav="settings" href="https://www.couchsurfing.org/home" title="Get a quick overview of everything on one screen">'
    + 'Dashboard</a></li>'
    + '<li><a data-nav="settings" href="https://www.couchsurfing.org/search/in/everywhere/mode/H/order_by/last_login" title="Not as many options as the advanced couchsearch but still far better than the searchbar on the top of the screen. It also looks nice">'
    + 'Map CouchSearch</a></li>'
    + '<li><a data-nav="settings" href="https://www.couchsurfing.org/mapsurf.html?form=advanced&SEARCH[orderby]=last_login&SEARCH[picture]=Y&SEARCH[last_login_days]=30" title="Need a couch? Specify exactly what you are looking for in a host and increase your chances of finding a good couch.">'
    + 'Advanced CouchSearch</a></li>'
    + '<li><a data-nav="settings" href="https://couchsurfing.zendesk.com/requests/new" title="Need help? Would you like to report abuse? Problem with the site?">'
    + 'Submit Ticket / CUQ</a></li>'
    + '<li><a data-nav="settings" href="http://www.couchsurfing.org/news/community-update/" title="The latest from the Ministry of Truth. I hope you have not commited any ThoughtCrimes :)">'
    + 'Latest Newspeak</a></li>'
    + '<li><a data-nav="settings" href="https://www.google.com/calendar/embed?src=fhk5fhqcb07h5ejn3s5sup23j4@group.calendar.google.com&ctz=Europe/Berlin" title="Couchsurfing Camps around the world" target="_blank">'
    + 'Camps Calendar</a></li>'
    + '<li><a data-nav="settings" href="http://wiki.csexport.org/en/Safety_for_surfers.html" title="Take the time to read about some safety tip while traveling. The text is long but there is good information in there" target="_blank">'
    + '<img src="http://www.ymcabham.org/assets/1598/8_red-cross-logo.jpg" /><b> Couchsurfing Safety</b></a></li>'
    + '<li><a data-nav="settings" href="http://www.facebook.com/sharer.php?u=http%3A%2F%2Fwww.facebook.com%2FCSNavigationLinks&t=An+improved+couchsurfing+website" title="Share CS Nav Links on facebook with others you think might find it useful" target="_blank">'
    + '<img src="https://dl.dropbox.com/s/uwyloafafvramg6/facebook_share_icon.gif" /></a></li>'
    + '<li><a data-nav="settings" href="http://www.facebook.com/cSNavigationLinks" title="Check out CS Nav Links on facebook and like us to get updates" target="_blank">'
    + '<img src="https://dl.dropbox.com/s/nuql41alteplsx2/FB.png" /></a></li>'
    + '<li><a data-nav="settings" href="http://twitter.com/home?status=%40Couchsurfing%20your%20site%20is%20so%20much%20easier%20to%20use%20since%20I%20installed%20http%3A%2F%2Fwww.facebook.com%2FCSNavigationLinks%20%40CSNavLinks%20%23CouchSurfing%20should%20pay%20you%20for%20this" title="Tweet about CS Nav Links" target="_blank">'
    + '<img src="https://dl.dropbox.com/s/yjxgnv58u2o2fi7/twitter-share-icon.gif" /></a></li>';
    
    if (typeof GM_addStyle != "function") {
        function GM_addStyle(aCSS) {
            var style = document.head.appendChild(document.createElement("style"));
            style.type = "text/css";
            style.textContent = aCSS;
        }
    }
    if(places){
    	GM_addStyle('#sub-menu {\n\
			display: inline;\n\
			background-color: white;\n\
			position: relative;\n\
			margin-top: 0px;\n\
			margin-bottom: 5px;\n\
			border:none;\n\
			margin-left: 0px;\n\
		}\n\
		li:hover > #sub-menu { display: inline; }');
    }else{
    	GM_addStyle('#sub-menu {\n\
			display: inline;\n\
			background-color: white;\n\
			position: relative;\n\
			margin-top: -65px;\n\
			margin-bottom: 70px;\n\
			border:none;\n\
			margin-left: 137px;\n\
		}\n\
		li:hover > #sub-menu { display: inline; }');
	}
	
})()