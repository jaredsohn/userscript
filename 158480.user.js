// ==UserScript==
// @description We have been asking for a mobile friendly version of Couchsurfing for years and nothing has been done.  
// @name        mobileCS
// @namespace   Mobile Friendy Couchsurfing
// @version     0.1.0
// @include     http*://www.couchsurfing.org/*	
// @include     http*://couchsurfing.zendesk.com/*	
// ==/UserScript==

//Adjust the styles sheet for CS Website
// Change the those stupid portholes to square pictures
GM_addStyle(".avatar.circle, .avatar.sm_circle, .avatar.md_circle{-webkit-border-radius:5px; border-radius:5px}");
GM_addStyle("a.profile-image.square {-webkit-border-radius:5px; border-radius:5px}");
// Add shadow to the Community Details to make it stand out more. 
GM_addStyle(".pinned-container {box-shadow: 4px 4px 4px 4px;}");
//New
GM_addStyle("td {font-size:28px;}");
GM_addStyle(".group_meta {display:none;}");
GM_addStyle(".member li a {font-size:25px; line-height:25px}");
GM_addStyle(".topbar .dropdown ul {width: 295px; margin-left:-100px;}");
GM_addStyle("td {border-bottom: 1px solid; padding:8px;}");
GM_addStyle(".group_paging {font-size:28px;}");
GM_addStyle(".search-box-in-navbar {display: none;}");
GM_addStyle(".topbar .container nav {float:left;}");
GM_addStyle(".navbar .nav.pull-right{float:left;}");
GM_addStyle(".groupbox h2{display:none;}");
GM_addStyle(".bar{margin-bottom:30px;}");

(function() {
    var places = false;
    var setting = document.querySelector('.custom_dropdown_list > li > a');
    if (!setting) {
        places = true;
        setting = document.querySelector('.dropdown-menu > li > a');
    }
    if (!setting) {
    	return;
    }
    
    var submenu = setting.parentNode.insertBefore(document.createElement("ul"), setting);
    submenu.id = "sub-menu";
    submenu.className = "dropdown-menu";
    submenu.innerHTML = '<li><a data-nav="settings" href="https://www.couchsurfing.org/groups" title="Find all the groups on couchsurfing">'
    + 'Groups</a></li>'
    + '<li><a data-nav="settings" href="https://www.couchsurfing.org/group_posts_user.html" title="A listing of all your group posts. Sorry there is nothing for places posts at the moment">'
    + 'Group Posts</a></li>'
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
    + 'Latest Newspeak</a></li>';
    
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