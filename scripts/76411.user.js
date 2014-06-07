// ==UserScript==
// @name        FetLife Latest Activity v2 Organizer
// @namespace   Cromagnon
// @description Organizes FetLife's home page Latest Activity Feed into a collapsible tree of entries grouped by user.  Updated June 18, 2010
// @include     *fetlife.com/home*
// @version     2.1.1219
// ==/UserScript==

//=======================================================================//
//   This UserScript is just a highly tweaked version of the v1 script	 //
//   written and published by Solipsistic.  If not for his work and	 //
//   dedication, this script would not be possible.			 //
//									 //
// "If I have seen further it is by standing on the shoulders of giants" //
//									 //
//							-- Isaac Newton  //
//									 //
//=======================================================================//


//==============================================================//
// Set the number of "pages" of entries to retrieve at one time	//
// 		   The FetLife default is 1.			//
//								//
			var MAX = 3;				//
//								//
//								//
//  Custom header options...					//
//								//
//  Set all of these to "false" to return the "look and feel"	//
//  back to the original, spartan style				//
//								//
		var DISTINCT_HEADERS = true;			//
		var AVATARS_IN_HEADERS = true;			//
		var COMPACT_HEADERS = true;			//
//								//
//								//
//  Set this to "true" to isolate FetLife's new "status"	//
//  feature(s) to appear only on the Status Updates tab		//
//								//
		var ISOLATE_STATUS_UPDATES = false;		//
//								//
//==============================================================//


//==============================================================//
// Set this array to include any names you'd like sorted to the	//
// top of the activity list, in order of importance.		//
//								//
	var HOTLIST = [						//
			"name1",				//
			"name2",				//
			"etc",					//
		      ]						//
//								//
//==============================================================//


//==============================================================//
// Set this array to include any names you'd like sorted to the	//
// *bottom* of the activity list, or hidden altogether.		//
//								//
	var COLDLIST = [					//
			 "name3",				//
			 "name4",				//
			 "ad_inf",				//
		       ]					//
								//
	var HIDE_COLDLIST = true;				//
//								//
//==============================================================//



// Insert CSS for custom elements.
//
function addGlobalStyle(css) {
    var head, style;

    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle(DISTINCT_HEADERS ?
	'ul.user_feed {padding: 0 0 0 0; margin: 0 0 10px 0; list-style: none;}'
	+ 'ul.user_feed li {padding: 9px 0 8px 0; border-bottom: 1px dotted #333;}'
	+ 'ul.user_feed li .mini_feed_picture_other_side {float: right;}'
	+ 'ul.user_feed li blockquote {padding: 0;margin-top: 0;margin-bottom: 0;}'
	+ 'ul.user_list {padding: 0 0 0 0; margin: 0 0 10px 0; list-style: disc;}'
	+ 'ul.user_list li {color: #AAAAAA;}'
	+ 'ul.user_list li.user_heading {color: #AA0000; background-color: #272727;}'
	+ 'li.user_heading a {text-decoration: none; font-weight: bold; font-size: 95%; color: #AAAAAA;}'
	+ 'div.switching_tabs_spinner img {margin-top: -20px; margin-bottom: 20px;}'
	+ 'li.user_heading img.profile_avatar {vertical-align: middle; height: 35px; width: 35px;}'
	+ 'li.new_comment form a {color: #777777; font-size: 0.95em;}'

	: 

	'ul.user_feed {padding: 0 0 0 0; margin: 0 0 10px 0; list-style: none;}'
	+ 'ul.user_feed li {padding: 9px 0 8px 0; border-bottom: 1px dotted #333;}'
	+ 'ul.user_feed li .mini_feed_picture_other_side {float: right;}'
	+ 'ul.user_feed li blockquote {padding: 0;margin-top: 0;margin-bottom: 0;}'
	+ 'ul.user_list {padding: 0 0 0 0; margin: 0 0 10px 0; list-style: disc;}'
	+ 'div.switching_tabs_spinner img {margin-top: -20px; margin-bottom: 20px;}'
	+ 'li.user_heading img.profile_avatar {vertical-align: middle; height: 35px; width: 35px;}'
	+ 'li.new_comment form a {color: #777777; font-size: 0.95em;}'
);

if (!COMPACT_HEADERS) addGlobalStyle('ul.user_list li {padding: 9px 0 8px 0;}');


// Toggle function for showing and hide user feeds.
//
function toggleUser(divid) {
	var user_feed = document.getElementById(divid);

	if(user_feed.style.display == "none")
		user_feed.style.display = "block";
	else	user_feed.style.display = "none";
}


// Add and return a heading to user_list inserted before cold_list
//
function addHeading(name, user_list, cold_list) {
	var user_heading = document.createElement('li');

	if (cold_list == null)	user_list.appendChild(user_heading);
	else			user_list.insertBefore(user_heading, cold_list);

	user_heading.id = name;
	user_heading.className = "user_heading";

	user_heading.addEventListener('click', (function(n) {
		return function (e) {
			if (!(e.ctrlKey || e.shiftKey || e.altKey)) {
				e.preventDefault();
				toggleUser(n);
			};
		};
		})(name + "_feed"), true);

	return user_heading;
}


// Toggle function for showing and hiding the form used to comment on a status
//
function toggleStatusCommentForm(status_id) {
	var items = document.getElementById(status_id).getElementsByTagName('li');
	var form = items[items.length - 1];

	form.parentNode.style.display = "block";

	if (form.style.display == "none")
		form.style.display = "block";
	else	form.style.display = "none";

	form.getElementsByTagName('textarea')[0].value = "";
}


// View Hidden Status Comments
//
function viewAllStatusComments(status_id) {
	var comments = document.getElementById(status_id).getElementsByTagName('li');

	for(var i = 0; i < comments.length; i++)
		if (comments[i].className != "clearfix status_comment") break;
		else comments[i].style.display = "block";

	if (comments[i].className == "view_other") comments[i].parentNode.removeChild(comments[i]);
}


// View all text for a long status comment
//
function viewLongStatusComment(comment_id) {
	var spans = document.getElementById(comment_id).getElementsByTagName('span');

	for(var i = 0; i < spans.length; i++)
		if (spans[i].className == "short") spans[i].style.display = "none";
		else if (spans[i].className == "long") spans[i].style.display = "block";
}


// Show up to two comments on the current status,
// remove the make_comment link from the end of the comments list
// and finally hook all three links to handle properly
//
function reworkStatusComments(snapshot) {
	var links = snapshot.getElementsByTagName('a');
	var i;

	for (i = 0; i < links.length; i++) {
		if (links[i].className == "make_comment") {
			links[i].href = snapshot.getElementsByTagName('span')[0].getAttribute("data-url");

//			links[i].addEventListener('click', (function(n) {
//				return function (e) {
//					e.preventDefault();
//					toggleStatusCommentForm(n);
//				};
//				})(snapshot.id), true);

			if (links[++i].innerHTML == "delete")
				links[i].href = snapshot.getElementsByTagName('span')[0].getAttribute("data-url");

			break;
		}
	}

	var comments = snapshot.getElementsByTagName('li');

	for(i = 0; i < comments.length; i++) {
		if (comments[i].className != "clearfix status_comment") break;

		if (i < 2) comments[i].style.display = "block";

		links = comments[i].getElementsByTagName('a');

		if (links[links.length - 1].innerHTML == "delete")
			links[links.length - 1].href = snapshot.getElementsByTagName('span')[0].getAttribute("data-url");

		if (links[links.length - 2].innerHTML == "delete")
			links[links.length - 2].href = snapshot.getElementsByTagName('span')[0].getAttribute("data-url");

		if (links[links.length - 1].innerHTML == "more")
			links[links.length - 1].addEventListener('click', (function(n) {
				return function (e) {
					e.preventDefault();
					viewLongStatusComment(n);
				};
				})(comments[i].id), true);
	}

	if (comments[i].className == "view_other") {
		links = comments[i].getElementsByTagName('a');

		if (links[0].className == "view_all") {
			links[0].addEventListener('click', (function(n) {
				return function (e) {
					e.preventDefault();
					viewAllStatusComments(n);
				};
				})(snapshot.id), true);

			var item = document.createElement('li');
			item.className = "view_other";
			comments[i].parentNode.insertBefore(item, comments[i]);
			item.appendChild(links[0]);
			++i;
		}

		comments[i].parentNode.removeChild(comments[i]);
	}

	if (comments[i].className == "new_comment clearfix") {
		links = comments[i].getElementsByTagName('a');

		links[0].addEventListener('click', (function(n) {
			return function (e) {
				e.preventDefault();
				toggleStatusCommentForm(n);
			};
			})(snapshot.id), true);

		links[0].className = "cancel_comment";
	}
}


// Check if we already have this user in our array.
//
function inArray(name, userArray) {
	// Reserve the first entries in userArray for our Hotlist
	//
	for(var i = 0; i < HOTLIST.length; i++) {
	        if (name == HOTLIST[i]) return i;
	}

	// Reserve entries just after the Hotlist for our Coldlist
	//
	for(; i < HOTLIST.length + COLDLIST.length; i++) {
	        if (name == COLDLIST[i - HOTLIST.length]) return i;
	}

	for(; i < userArray.length; i++) {
		if (name == userArray[i][0]) return i;
	}
	return i;
}


// Build our lists of entries by user.
//
function buildLists() {
	workspace.style.display = "none";
	workspace.innerHTML = feed_html;
	feed_html = "";

	if (tab_spinner != null)
		tab_spinner.style.display = "none";

	feed.style.display = "block";

	var xpath = "//ul[@id='workspace']//div[contains(@class, 'story_2')]";
	var res = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var name, url, time, avatar, spans, user_heading, user_feed, user_list, cold_list;
	var i, j, k, l;

	for (i = 0; i < res.snapshotLength; i++) {

		if (res.snapshotItem(i).className.indexOf("status") > 0) {
			if (ISOLATE_STATUS_UPDATES && (type != "statuses"))
				continue;

			//Handle commenting on status entries
			reworkStatusComments(res.snapshotItem(i));
		}

		url = res.snapshotItem(i).getElementsByTagName('a')[1];

		// Avoid errors/corruption in the activity feed.
		//
		if (url == null)
			continue;

		name = url.innerHTML;

		url = url.href;

		if (AVATARS_IN_HEADERS) {
			avatar = res.snapshotItem(i).getElementsByTagName('a')[0];
			res.snapshotItem(i).removeChild(avatar);

			avatar = "<a href=" + url + ">" + avatar.innerHTML + "</a> ";

		} else	avatar = "";

		spans = res.snapshotItem(i).getElementsByTagName('span');
		for (l = 0; l < spans.length; l++) {
			if ((spans[l].className == "time_ago timestamp") || (spans[l].className == "time_ago status-timestamp")) {
				time = spans[l].innerHTML;
				spans[l].setAttribute('data-timestamp',time);
				spans[l].className = "time_ago refresh-timestamp";
			}
		}

		j = inArray(name, userArray);

		if (userArray[j] == null)
			userArray[j] = [name, url, time, avatar];

		k = userArray[j].length;

		userArray[j][k] = res.snapshotItem(i);

		res.snapshotItem(i).parentNode.removeChild(res.snapshotItem(i));
	}

	user_list = document.getElementById('user_list');
	cold_list = document.getElementById('cold_list');

	if (user_list == null) {
		user_list = document.createElement('ul');
		feed.appendChild(user_list);

		user_list.id = 'user_list';
		user_list.className = "user_list";

		// Insert place-holders at the top for our HOTLIST
		//
		for (i = 0; i < HOTLIST.length; i++)
			addHeading(HOTLIST[i], user_list, null).style.display = "none";

		// Mark the start of our COLDLIST
		//
		cold_list = document.createElement('li');
		cold_list.id = "cold_list";
		cold_list.style.display = "none";
		user_list.appendChild(cold_list);

		// Insert place-holders at the bottom for our COLDLIST
		//
		for (i = 0; i < COLDLIST.length; i++)
			addHeading(COLDLIST[i], user_list, null).style.display = "none";
	}

	for (i = 0; i < userArray.length; i++) {
		if (userArray[i] == null) continue;

		name = userArray[i][0];
		url = userArray[i][1];
		time = userArray[i][2];
		avatar = userArray[i][3];

		user_heading = document.getElementById(name);

		if (user_heading == null)
			user_heading = addHeading(name, user_list, cold_list);
		else {
			if ((i < HOTLIST.length) || (!HIDE_COLDLIST && (i - HOTLIST.length < COLDLIST.length)))
				user_heading.style.display = "block";

			user_feed = document.getElementById(name + "_feed");

			if (user_feed != null) user_feed.parentNode.removeChild(user_feed);
		}

		var link = "<a href=" + url + ">" + name + "</a>";
		var n = userArray[i].length-4;

		user_heading.innerHTML = avatar + link + " has " + n + (n == 1 ? " entry. " : " entries. ")
					 + "<span class='quiet smaller'>last was "
					 + "<span class='time_ago refresh-timestamp' data-timestamp='"
					 + time + "'>" + time + "</span></span>";

		user_feed = document.createElement('ul');
		user_list.insertBefore(user_feed, user_heading.nextSibling);

		user_feed.id = name + "_feed";
		user_feed.className = "user_feed";
		user_feed.style.display = "none";

		for (j = 4; j < userArray[i].length; j++) {
			user_feed.appendChild(userArray[i][j]);
		}
	}

	unsafeWindow.refreshAllTimestamps();
}


// Parse our last response and add it into the queue.  Get more if there 
// is more to get.
//
function getMore(responseDetails) {
	++offset;

	var response = responseDetails.responseText;

	// Check if there are no entries.
	//
	if (response.indexOf('<div class="empty">') > 0) {
		if (tab_spinner != null)
			tab_spinner.style.display = "none";

		feed_container.innerHTML = response;
		return;
	}

	// Replace Unicode with characters.
	//
	response = response.replace(/\\u003C/g,"<");
	response = response.replace(/\\u003E/g,">");
	response = response.replace(/\\u0026/g,"&");
	response = response.replace(/\\u2019/g,"'");

	// Parse our response.
	//
	var s = response.lastIndexOf("</div>\n</div>") + 14;
	var e = response.lastIndexOf("</div>\n  </div>") + 16;
	var html, more;

	e = Math.max(s,e);
	s = response.indexOf('<div class="story_2 ');

	if (s >= 0) {
			html = response.substr(s,e-s);
			html = html.replace(/\\n/g,"");
			html = html.replace(/\\/g,"");

			feed_html += html;
			more = true;
	} else		more = (response.indexOf('<div class="clearfix">\n  </div>') < 0);

	// If there are more entries and we're not at max_page, keep getting entries.
	// Otherwise, build our lists and finish.
	//
	if (more && offset < max_page) {
		GM_xmlhttpRequest({
   			method: 'GET',
    			url: 'https://fetlife.com/home/' + version + '.js?subfeed=' + type + '&page=' + offset,
    			headers: {
        			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        			'Accept': 'application/atom+xml,application/xml,text/xml',
    			},
    			onload: getMore
		});
	} else {
		buildLists();

		if (more) 	addViewMore();
		else		view_more.parentNode.removeChild(view_more);
	}
}


// Get our initial page of feed data, parse and try to get more.
//
function getSome() {
	// Basic request so we can see the "empty" message if there is one.
	//
	GM_xmlhttpRequest({
    		method: 'GET',
    		url: 'https://fetlife.com/home/' + version + '.js?subfeed=' + type + start,
    		headers: {
      	  		'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        		'Accept': 'application/atom+xml,application/xml,text/xml',
    		},
    		onload: getMore
	});
}


// Get the next page(s) of feed data starting just after the last page retreived.
//
function getNext() {
	// Show our spinner and hide the view more link to show that we are working on a request
	//
	spinner.style.display = "block";

	view_more_link.style.display = "none";

	start = "&page=" + offset;
	max_page += MAX;
	getSome();
}


// Main function
//
function init() {
	// Clear our workspace and variables
	while (feed_container.childNodes.length) feed_container.removeChild(feed_container.firstChild);
	userArray = new Array;
	feed_html = "";
	start = "";
	offset = 0;
	max_page = MAX;

	// Add our feed
	feed = document.createElement("div");
	feed_container.appendChild(feed);
	feed.id = "feed";

	// Create a workspace
	workspace = document.createElement("ul");
	feed_container.appendChild(workspace);
	workspace.id = "workspace";
	workspace.innerHTML = "<br><br>";

	// Show that we're working
	if (tab_spinner != null)
		tab_spinner.style.display = "block";

	// Create our user lists
	getSome();
}

function setTab() {
	type = this.id;

	// check for old numbered tab ids
	//
	switch (type) {
		case "tab1" : type = "everything";	break;

		case "tab2" : type = "group";		break;

		case "tab3" : type = "writing";		break;

		case "tab4" : type = "pictures";	break;

		case "tab5" : type = "videos";		break;
	}

	// remove or replace the new status entry form, so it
	// won't appear on tabs other than Status Updates
	//
	if (ISOLATE_STATUS_UPDATES && (status_form != null)) {
		if (type == "statuses")
			feed_container.parentNode.insertBefore(status_form, feed_container.previousSibling);
		else if (status_form.parentNode != null)
			status_form.parentNode.removeChild(status_form);
	}

	init();
}

function addViewMore () {
	view_more = document.getElementById("view_more");

	if (view_more != null) {
		view_more.parentNode.removeChild(view_more);
	}

	view_more = document.createElement("div");
	feed.appendChild(view_more);
	view_more.id = "view_more";

	view_more_link = document.createElement("div");
	view_more.appendChild(view_more_link);
	view_more_link.className = "quiet";
	view_more_link.innerHTML = "<a href='javascript:void(0);'>V &nbsp; &nbsp; view more &nbsp; &nbsp; V</a>";

	spinner = document.createElement("div");
	view_more.appendChild(spinner);
	spinner.id = "spinner";
	spinner.className = "spinner";
	spinner.style.display = "none";
	spinner.innerHTML = '<img src="https://static.fetlife.com/spinner.gif" class="spinner">';
	
	view_more.addEventListener('click', getNext, true);
}

// Handle tab clicking.
//
function hookTabs () {
	var tabs = ["tab1", "tab2", "tab3", "tab4", "tab5",
		    "everything", "group", "writing", "pictures", "videos", "statuses"];

	for(var i = 0; i < tabs.length; i++) {
		var tab = document.getElementById(tabs[i]);
		if (tab != null) {
			tab.addEventListener("click", setTab, true);
			tab.getElementsByTagName("a")[0].href = "javascript:void(0);";
		}
	}

	// remove the new status entry form, so it
	// won't appear on tabs other than Status Updates
	//
	if ((type != "statuses") && ISOLATE_STATUS_UPDATES && (status_form != null))
		status_form.parentNode.removeChild(status_form);
}

// Find the tab switching spinner
//
function getTabSpinner() {
	//tab_spinner = document.getElementsByClassName("switching_tabs_spinner")[0];
	tab_spinner = null;

	if (tab_spinner == null) {
		tab_spinner = document.createElement("div");

		feed_container.parentNode.insertBefore(tab_spinner, feed_container);

		tab_spinner.className = "switching_tabs_spinner";
		tab_spinner.style.display = "block";

		tab_spinner.innerHTML = '<img src="/images/spinner_big.gif" alt="fetching information...">';
	}
}

// Status entry form functions ...
//
function updateNewStatusCounter(e) {
	var form = document.getElementById("new_status");

	var value = form.getElementsByTagName("textarea")[0].value;

	var counter = form.getElementsByTagName("span")[0];

	counter.innerHTML = 200 - value.length;

	if (value.length > 200) counter.className = "counter over_limit";
	else if (value.length < 180) counter.className = "counter";
	else counter.className = "counter getting_close";

	var btn = form.getElementsByTagName("input")[0];

	if (value.length == 0) btn.setAttribute("disabled",null);
	else btn.removeAttribute("disabled");
}

function enterNewStatus() {
	var form = document.getElementById("new_status");

	if (form.className.indexOf("in_focus") < 0) {
		form.className = "clearfix in_focus";
		form = form.getElementsByTagName("textarea")[0];
		if (form.value == "What's on your kinky mind?") form.value = "";
		updateNewStatusCounter();
	}
}

function cancelNewStatus() {
	var form = document.getElementById("new_status");

	if (form.className.indexOf("out_of_focus") < 0) {
		form.className = "out_of_focus clearfix";
		form.getElementsByTagName("input")[0].setAttribute("disabled",null);
		form = form.getElementsByTagName("textarea")[0];
		if (form.value == "") form.value = "What's on your kinky mind?";
	}
}

// Initialize our defaults.
//
type = "everything";
version = "v3";
if (document.location.toString().indexOf("subfeed=") > 0) type = document.location.toString().substr(document.location.toString().indexOf("subfeed=") + 8);
if (document.location.toString().indexOf("/v2") > 0) version = "v2";

feed_container = document.getElementById("feed_container");

status_form = document.getElementById("status_form");
if (status_form != null) status_form.addEventListener("focus", enterNewStatus, true);
if (status_form != null) status_form.getElementsByTagName("a")[1].addEventListener("click", cancelNewStatus, true);
if (status_form != null) status_form.getElementsByTagName("textarea")[0].addEventListener("keyup", updateNewStatusCounter, true);

hookTabs();
getTabSpinner();

// Call our main function.
//
init();

//end