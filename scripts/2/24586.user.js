// ==UserScript==
// @name           Deviant Statistics: Fully Conclusive
// @namespace      http://boffinbrain.deviantart.com/
// @description    Compiles a comprehensive list of useful statistics about users and displays them on deviants' userpages.
// @include        http://*.deviantart.com/
// @include        http://*.deviantart.com/?offset=*
// ==/UserScript==




// Startup

var profile_box = document.getElementById("deviant");
var info_box = document.getElementById("deviant-info");
var stats_box = document.getElementById("deviant-stats");
if (!profile_box || !info_box || !stats_box) return;

var version = 1.4;
var deviant_name = window.location.hostname.substring(0, window.location.hostname.indexOf("."));
var stats_url = "http://"+deviant_name+".deviantart.com/stats/gallery/";
var username = "_"; try {username = unsafeWindow.deviantART.deviant.username;} catch(e) {}
var form_prefix = "devstats-";
var G, U;
var debug = false;
var retry_count = 0;
var loading_box;

function main()
{
	GM_addStyle([
		"#deviant div.stats-pager {margin-bottom:8px;}",
		"#deviant div.stats-pager a.active {color:inherit; text-decoration:none !important; font-weight:bold; letter-spacing:-0.05em;}",
		"#deviant #deviant-stats {text-align:right !important;}"
	].join("\n"));

	loading_box = document.createElement("div");
	loading_box.style.marginBottom = "8px";
	info_box.insertBefore(loading_box, info_box.childNodes[0]);

	// If user is banned, the javascript file redirects to a notification page.
	try
	{
		var symbol = profile_box.getElementsByTagName("div")[0].getElementsByTagName("h1")[0].innerHTML.substring(0,1);
		if (symbol=="!")
		{
			status("User is banned.  No statistics can be fetched.");
			return;
		}
	}
	catch(e) {}

	// Auto-load, or add a link to start
	if (GM_getValue("autoload", 0))
	{
		getStats();
	}
	else
	{
		var load_link = hyperlink("javascript:void(0);", "Load Statistics");
		load_link.addEventListener("click", getStats, false);
		status(load_link);
	}
}




// Functions

function getStats()
{
	status("Loading statistics...");
	GM_xmlhttpRequest
	({
		method: "GET",
		url: stats_url,
		onload: displayStats,
		onerror: displayError
	});
}

function displayError(statuscode)
{
	var message = "Couldn't get statistics"+(statuscode!=null&&statuscode!=200?" (error "+statuscode+") ":"")+". ";
	if (statuscode==403)
	{
		message = "User has blocked access to their gallery statistics.  How sad.";
	}
	else if (retry_count<4)
	{
		message += "Trying again... ("+(++retry_count)+")";
		getStats();
	}
	else
	{
		message += "Given up after "+retry_count+" attempts.";
	}
	status(message);
}

function displayStats(responseDetails)
{
	// Hopefully, there weren't any errors
	if (responseDetails.status!=200)
	{
		displayError(responseDetails.status);
		return;
	}

	var timer = [new Date()];

	if (!processStats(responseDetails.responseText))
	{
		status("There was a problem processing the statistics.");
		return false;
	}

	timer.push(new Date());

	status("");

	// Compile a list of useful extra links for later
	var track_links = [];
	var track_link;
	var track_divs = stats_box.getElementsByTagName("div");
	for(var i=track_divs.length-1; i>=0; i--)
	{
		var track_div_links = track_divs[i].getElementsByTagName("a");
		for(var j=0; j<track_div_links.length; j++) track_links.push(track_div_links[j]);
		stats_box.removeChild(track_divs[i]);
	}
	if (U.subscribed && U.journalexists) track_links.push(hyperlink("http://backend.deviantart.com/rss/journal/"+U.username+".xml", "Journal RSS feed"));
	track_links.push(hyperlink("http://backend.deviantart.com/rss.xml?q=gallery%3A"+U.username+"+sort%3Atime&type=deviation", "Gallery RSS feed"));

	// Make presumptuous assumptions about the user
	var hypotheses = makeHypotheses(G);

	// Make pages and tabs on the left and right hand sides

	var pager_left = new Pager(info_box);
	var pager_right = new Pager(stats_box);
	
	pager_left.importPage(info_box.getElementsByTagName("ul")[0], "Profile");
	pager_right.importPage(stats_box.getElementsByTagName("ul")[0], "Presence");

	var pages_left = {"Deviations":[], "Files":[], "Averages":[], "Options":[]};
	var pages_right = {"Community":[], "Hypotheses":[], "Tracking":[]};
	
	// Populate pages with information

	if (U.deviations>0)
	{
		pages_left["Deviations"] = 
		[
			addDeviation("Most comments:",     G[U.top_comments],   number(G[U.top_comments].comments),     G[U.top_comments].comments>0),
			addDeviation("Most favourites:",   G[U.top_favourites], number(G[U.top_favourites].favourites), G[U.top_favourites].favourites>0),
			addDeviation("Most views:",        G[U.top_views],      number(G[U.top_views].views)),
			addStat("Favourite category:",     number(U.top_majorcat_num),   "http://"+U.username.toLowerCase()+".deviantart.com/gallery/"+U.top_majorcat_name+"/", U.top_majorcat_name),
			addStat("Favourite sub-category:", number(U.top_cat_num),        "http://"+U.username.toLowerCase()+".deviantart.com/gallery/"+U.top_cat_name+"/",      U.top_cat_name.split('/').reverse()[0]),
			addStat("Total deviation views:", number(U.total_views))
		];
		pages_left["Files"] =
		[
			addDeviation("Most downloads:",     G[U.top_downloads],  number(G[U.top_downloads].fullviews), G[U.top_downloads].fullviews>0),
			addDeviation("Largest resolution:", G[U.top_resolution], G[U.top_resolution].resolution,       G[U.top_resolution].area>640*480,     U.username+" doesn't have any large images."),
			addDeviation("Largest file:",       G[U.top_filesize],   G[U.top_filesize].size,               G[U.top_filesize].filesize>1024*1024, U.username+" doesn't have any files over 1MB.")
		];
		pages_left["Averages"] =
		[
			addStat("Favourites received per day:", number(U.total_favourites/(U.age+1), 1)),
			addStat("Comments per deviation:",      number(U.total_comments/U.deviations, 1)),
			addStat("Favourites per deviation:",    number(U.total_favourites/U.deviations, 1)),
			addStat("Deviation frequency"+(U.scraps?" (with scraps):":""), number((U.age+1)/(U.deviations+U.scraps), 1)+" days")
		];
	}
	pages_left["Averages"].push(addStat("Pageviews per day:", number(U.pageviews/(U.age+1), 1)));

	for(var i=0; i<hypotheses.length && i<7; i++) pages_right["Hypotheses"].push(addStat(hypotheses[i]));
	for(var i=0; i<track_links.length; i++) pages_right["Tracking"].push(track_links[i]);
	pages_right["Community"] = 
	[
		addReversedStat("Friend"+s(U.friends),                         number(U.friends)),
		addReversedStat("Watcher"+s(U.friendswatching),                number(U.friendswatching)),
		addReversedStat("Comment"+s(U.comments)+" Given",              number(U.comments)),
		addReversedStat("Comment"+s(U.total_comments)+" Received",     number(U.total_comments)),
		addReversedStat("Favourite"+s(U.favourites)+" Given",          number(U.favourites)),
		addReversedStat("Favourite"+s(U.total_favourites)+" Received", number(U.total_favourites))
	];
	if (U.favourites) pages_right["Community"].push(addReversedStat("Comments Given Per Favourite", number(U.commentsdeviations/(U.favourites+1), 1)));


	// Options Page
	var update_img = document.createElement("img");
	update_img.alt = "Version "+version+". Go to the script homepage to check for updates";
	update_img.title = "Version "+version+". Go to the script homepage to check for updates";
	update_img.src = "http://boffinbrain.nfshost.com/projects/deviantart/deviantstatistics/"+version+"/"+username+"/"+U.username+"/";
	
	var update_link = hyperlink("http://www.deviantart.com/deviation/81516142/");
	update_link.appendChild(update_img);

	pages_left["Options"] =
	[
		update_link,
		addCheckBox("autoload", "Get statistics automatically on page load"),
		addCheckBox("hover", "Switch tabs when I move my mouse over them")
	];

	timer.push(new Date());
	if (debug)
	{
		for(var i=timer.length-1; i>0; i--) timer[i] = timer[i]-timer[i-1] + "ms";
		timer.splice(0,1);
		pages_left["Options"].push(addStat(null, null, stats_url, "Performance figures: "+timer.join(", ")));
	}
	
	// Display the pages
	
	for(var p in pages_left)
	{
		var page = pages_left[p];
		if (page.length>0)
		{
			var new_page = pager_left.addPage(p);
			for(var i=0; i<page.length; i++) pager_left.addElem(new_page, page[i]);
		}
	}

	for(var p in pages_right)
	{
		var page = pages_right[p];
		if (page.length>0)
		{
			var new_page = pager_right.addPage(p);
			for(var i=0; i<page.length; i++) pager_right.addElem(new_page, page[i]);
		}
	}
	
	// I'm done with the data
	delete G;
}

function makeHypotheses()
{
	var h = [];
	
	with(U)
	{
		var avg = deviations>0 ? (total_comments+total_favourites)/deviations : 0;
		var plz = username.length>3 && username.toLowerCase().lastIndexOf("plz")>=username.length-4;

		if (age<=7) h[h.length] = "New deviant!";
		else if (age>365*5) h[h.length] = "Old-school deviant!";
		if (offlinetime==-1) h[h.length] = "Has never logged in!";
		if (deviations>1)
		{
			if (avg<10 && friendswatching<50)        h[h.length] = "Unknown artist";
			else if (avg<30 && friendswatching<200)  h[h.length] = "Emerging artist";
			else if (avg<100 && friendswatching<500) h[h.length] = "Established artist";
			else if (avg<300)                        h[h.length] = "Popular artist";
			else if (avg<1000)                       h[h.length] = "Very popular artist";
			else                                     h[h.length] = "EXTREMELY popular artist";
			if (avg>150 && friendswatching>1000) h[h.length] = "Has a massive fan-base";
			if (deviations>10 && avg>50 && top_majorcat_name=="anime") h[h.length] = "OMG Anime artist!";
			if (deviations>20 && avg<10 && friendswatching<50)
			{
				if (age<120)              h[h.length] = "The world has yet to see your art";
				else if (pageviews>10000) h[h.length] = "People seem to pass you by...";
			}
		}
		if (age>90 && !plz)
		{
			if (age>360 && offlinetime>300)
			{
				if (pageviews>1000) h[h.length] = "Rest in peace, abandoned account";
				else                h[h.length] = "A terrible waste of a username";
			}
			if (deviations==1 && total_favourites>500) h[h.length] = "One-hit wonder";
			if (friendswatching<=1 && friends<=2) h[h.length] = "Doesn't have any love :(";
			if (comments==0)
			{
				if (!journalexists && deviations==0 && favourites<=1 && offlinetime<30) h[h.length] = "A very boring deviant";
				else if (comments/(age+1)<0.15) h[h.length] = "Rarely comments on anything";
				else h[h.length] = "Has never commented on anything!";
			}
			if (!journalexists && deviations>0) h[h.length] = "Doesn't have much to write about.";
		}
		if (comments/(age+1)>20) h[h.length] = "Very busy deviant";
		if (deviations>5 && deviations/(age+1)>0.3) h[h.length] = "Very productive artist";
		if (deviations>30 && total_categories>=deviations/2.5) h[h.length] = "A multi-talented artist";
		else if (deviations>20 && total_categories<3) h[h.length] = "Has very specific tastes";
		if (commentsdeviations/(favourites+1)>20 && comments/(age+1)>3) h[h.length] = "Critic";
		if (forum_posts>2000 || forum_posts/(age+1)>4) h[h.length] = "Frequent Forumer";
		if (commentsnews>100 && commentsnews/(age+1)>1) h[h.length] = "Frequent news reader";
		if (deviations==0 && friendswatching>100) h[h.length] = "Why are people watching me?";
		if (plz) h[h.length] = "PLZ account!";
		if (deviations>300) h[h.length] = "Too many deviations!";
		if (comments/(favourites+1)<0.8 && favourites>1000) h[h.length] = "Fave-whore!";
		if (friends>1000) h[h.length] = "DevWatch-whore!";
		if (commentsdeviants>3000 || commentsdeviants/(age+1)>3.3) h[h.length] = "Obsessively shouts on people's userpages!";
	}
	
	return h;
}

function processStats(data)
{
	data = getTextRegion(data, "deviantART.pageData=", "\n</script>");
	if(data == '') return false;
	eval("G = "+data.replace(/\\'|\\\\"/g, "'")+";");
	
	U = G.userstats;
	G = G.devstats;

	// Extra stats that can be derived from given information and from userpage
	U.total_comments     = 0;	U.total_favourites   = 0;
	U.top_views          = 0;	U.top_downloads      = 0;
	U.top_favourites     = 0;	U.top_comments       = 0;
	U.top_filesize       = 0;	U.top_resolution     = 0;
	U.top_majorcat_num   = 0;	U.top_majorcat_name  = '';
	U.top_cat_num        = 0;	U.top_cat_name       = '';
	U.total_categories   = 0;	U.total_views        = 0;

	U.offlinetime        = -1;
	U.age           = Math.round((new Date() - Date.parse(U.since)) / (1000*3600*24));
	U.journalexists = xpath("//div[contains(@class,'journalcontrol')]").snapshotItem(0) ? true : false;

	var info_list = info_box.getElementsByTagName("ul")[0].getElementsByTagName("li");
	var list;
	for(var i=0; list=info_list[i]; i++)
	{
		var html = list.innerHTML;
		if (html.indexOf("Online")==0 || html.indexOf("Idle")==0 || html.indexOf("Invisible")==0)
		{
			// Assume user to be online
			U.offlinetime = 0;
			break;
		}
		else if (html.indexOf("Offline for")==0)
		{
			// Measure the offline time in days, to the nearest whole week.
			// We're not concerned with any greater level of accuracy.
			var offset = html.indexOf("w");
			if (offset>12) U.offlinetime = html.substring(12, offset)*7;
			else U.offlinetime = 0;
			break;
		}
		// If none of the above, then the user has never logged in
	}

	// If the user has no deviations then none of the following applies
	if (U.deviations==0) return true;

	var categories = [];
	var major_categories = [];
	var dev, size, dims;
	for(var i=0; dev=G[i]; i++)
	{
		// Area is width*height of deviation
		dims = dev.resolution.split("x");
		dev.area = dims[0]*dims[1];

		// Determine file size in bytes
		size = dev.size.split(' ');
		size[0] = parseFloat(size[0].replace(',',''));
		if      (size[1] == 'KB') size[0] *= 1024;
		else if (size[1] == 'MB') size[0] *= 1024 * 1024;
		dev.filesize = size[0];

		U.total_comments += dev.comments;
		U.total_favourites += dev.favourites;
		U.total_views += dev.views;

		if (dev.views      > G[U.top_views].views)           U.top_views = i;
		if (dev.fullviews  > G[U.top_downloads].fullviews)   U.top_downloads = i;
		if (dev.favourites > G[U.top_favourites].favourites) U.top_favourites = i;
		if (dev.comments   > G[U.top_comments].comments)     U.top_comments = i;
		if (dev.filesize   > G[U.top_filesize].filesize)     U.top_filesize = i;
		if (dev.area       > G[U.top_resolution].area)       U.top_resolution = i;

		// There is likely to be much confusion between the different usages of 'category' here.
		//  - 'Category' is the full category path, i.e. "Customization/Icons/Emoticons/Static"
		//  - 'Major Category' is the root category only, i.e. "Customization"

		dev.majorcategory = dev.category.split('/')[0];

		if (major_categories[dev.majorcategory]) major_categories[dev.majorcategory]++;
		else major_categories[dev.majorcategory] = 1;
		if (major_categories[dev.majorcategory] > U.top_majorcat_num)
		{
			U.top_majorcat_name = dev.majorcategory;
			U.top_majorcat_num = major_categories[dev.majorcategory];
		}

		if (categories[dev.category]) categories[dev.category]++;
		else
		{
			categories[dev.category] = 1;
			U.total_categories++;
		}
		if (categories[dev.category] > U.top_cat_num)
		{
			U.top_cat_name = dev.category;
			U.top_cat_num = categories[dev.category];
		}
	}

	return true;
}

function xpath(query)
{
	// Standard XPATH shorthand function
	return document.evaluate(query, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

function getTextRegion(text, start, end)
{
	// Return the text between the first instance of 'start' and the next proceeding instance of 'end' in 'text'.
	if(text.indexOf(start)<0) return "";
	text = text.substring(text.indexOf(start)+start.length);
	if(text.indexOf(end)<0) return text;
	text = text.substring(0, text.indexOf(end));
	return text;
}

function status(text)
{
	// Show current working status of the script
	if (loading_box.childNodes[0]) loading_box.removeChild(loading_box.childNodes[0]);
	if (typeof text == "string")
	{
		if (text == '') return;
		loading_box.appendChild(document.createTextNode(text));
	}
	else
	{
		loading_box.appendChild(text);
	}
}

function element(tag, attributes, children)
{
	var e = document.createElement(tag);
	for(var a in attributes)
	{
		e.setAttribute(a, attributes[a]);
	}
	for(var c in children)
	{
		if (typeof children[c] == "string") e.appendChild(document.createTextNode(children[c]));
		else e.appendChild(children[c]);
	}
	return e;
}

function hyperlink(url, text)
{
	return element("a", {"class":"a", "href":url}, text);
}

function number(x, y)
{
	if (x==null) return "none";
	if (y!=null) x = x.toFixed(y);
	x += "";
	var components = x.split(".");
	var result = components[0];
	if (result.length>3)
	{
		var start = result.length-3;
		result = number(result.substring(0,start))+","+result.substring(start);
	}
	if (components[1]!=null) result += "."+components[1];
	return result;
}

function s(x)
{
	return x!=1 ? "s" : "";
}

function addDeviation(label, deviation, statistic, conditional, alternate)
{
	if (conditional==null || conditional==true) return addStat(label, statistic, "http://www.deviantart.com/deviation/"+deviation.id+"/", deviation.title);
	else return addStat(alternate);
}

function addStat(key, value, url, link)
{
	var item = document.createDocumentFragment();
	if (key) item.appendChild(document.createTextNode(key+(link||value?" ":"")));
	if (link && url) item.appendChild(hyperlink(url, link));
	if (value) item.appendChild(element("strong", null, link ? " ("+value+")" : value));
	return item;
}

function addReversedStat(key, value)
{
	var item = document.createDocumentFragment();
	if (value) item.appendChild(element("strong", null, value==0 ? "No " : value+" "));
	item.appendChild(document.createTextNode(key));
	return item;
}

function addCheckBox(setting, text)
{
	var checkbox = document.createElement("input");
	checkbox.type = "checkbox";
	checkbox.style.verticalAlign = "middle";
	checkbox.id = form_prefix+setting;
	checkbox.checked = GM_getValue(setting, 0);
	checkbox.addEventListener("change", function(){GM_setValue(setting, this.checked);}, false);

	var label = document.createElement("label");
	label.setAttribute("for", form_prefix+setting);
	label.appendChild(checkbox);
	label.appendChild(document.createTextNode(text));
	
	return label;
}




// Pager Class

Pager.prototype.container;
Pager.prototype.navigator;
Pager.prototype.pages;
Pager.prototype.tabs;
Pager.prototype.activeTab;

function Pager(container)
{
	this.container = container;
	this.navigator = document.createElement("div");
	this.navigator.className = "stats-pager";
	if (this.container.childNodes[0]) this.container.insertBefore(this.navigator, this.container.childNodes[0]);
	else                              this.container.appendChild(this.navigator);
	this.pages = [];
	this.tabs = [];
	this.activeTab = 0;
}

Pager.prototype.importPage = function (page, name)
{
	this.pages.push(page);
	this.addTab(name);
}

Pager.prototype.addPage = function (name)
{
	var new_page = document.createElement("ul");
	    new_page.className = "f";
	if (this.pages.length>0) new_page.style.display = "none";
	this.container.appendChild(new_page)
	this.pages.push(new_page);
	this.addTab(name);
	return new_page;
}

Pager.prototype.addTab = function (name)
{
	var pager = this;
	var index = this.tabs.length;
	var tab = hyperlink("javascript:void(0);", name);

	if (GM_getValue("hover", 0)) tab.addEventListener("mouseover", function(){pager.switchTo(index, this);}, false);
	tab.addEventListener("click", function(){pager.switchTo(index, this);}, false);

	if (this.tabs.length>0) this.navigator.appendChild(document.createTextNode(" | "));
	else tab.className += " active";

	this.navigator.appendChild(tab);
	this.tabs.push(tab);
}

Pager.prototype.addElem = function (page, obj)
{
	if (obj==null) return;
	var item = document.createElement("li");
	item.className = "f";
	item.appendChild(obj);
	page.appendChild(item);
}

Pager.prototype.switchTo = function (index, caller)
{
	if (this.activeTab==index) return;
	this.tabs[this.activeTab].className = "a";
	this.pages[this.activeTab].style.display = "none";
	this.activeTab = index;
	this.tabs[this.activeTab].className = "active";
	this.pages[this.activeTab].style.display = "";
	caller.blur();
}




// Now you know how art meets application!

main();
