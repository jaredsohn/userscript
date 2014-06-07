// ==UserScript==
// @name           Facebook custom app hider
// @version        0.14: Fixed for the changes in facebook. There were just a few changes.
// @version        0.13a: Hide "requests" box when empty
// @version        0.13: Icon to app tray, with tooltip support
// @version        0.12a: Cosmetic changes
// @version        0.12: apps which have no preference set are listed separately
// @version        0.11: made mini feed header a bit more generic, adding similar feature to Nicknames app
// @version        0.10: added togglable application names for the mini feed header
// @version        0.9: now also handles home page, hides news and mini feed posts, invites, wall attachments and attachment action words.
// @version        0.8: Cross-network compatibility; option to show or hide apps by default (awaiting improvement)
// @namespace      geologicalhammers.com
// @namespace      http://karbassi.com
// @description    Choose which custom applications Facebook displays, by simply clicking "X" on those you don't want to see. 
// @include        http://*.facebook.com/profile.php?id=*
// @include        http://*.facebook.com/home.php*
// ==/UserScript==
var onHomePage = false;

switch( location.pathname ) {
	case "/profile.php":
	    //Add headers in the mini feed of apps contributing to its stories:
	    equipHeaderToggler('id("app_2341989679_subtitle")', // mini-feed
	                       listMiniFeedItems(), getAppName, toggleAppNow);
	    var nicknamers = getNicknamers();
	    if (nicknamers)
	      equipHeaderToggler('id("app_4071248179_subtitle")', // Nicknames
                          nicknamers.count, nicknamers.name, nicknamers.toggle );
	    break;
	case "/home.php":
		onHomePage = true; 
		break;
}

var appsOnPage = getAppsOnPage();

function listMiniFeedItems() {
  var ids = $x('id("minifeed")/div/div[@class="icon"]/a[contains(@href,"&app_id=")]').map(function(a){ return a.href.match(/&app_id=(\d+)/)[1]; });
  return uniq( ids, "count" );
}

function getNicknamers() {
  // <span> nick </span> <span><span> by </span><a href>*name*</a></span><br>
  function toggleByNicknamer() {
    function toggle( a ) {
      var n2 = a.parentNode, n1 = $X("preceding::span[1]", a), br = n1.nextSibling;
      n1.style.display = n2.style.display = br.style.display = on ? "" : "none";
    }
    var id = this.id.substring(2);
    var on = this.style.textDecoration == "line-through";
    this.style.textDecoration = on ? "" : "line-through";
    var toggle = on ? function(span){ span.style.display = "inline"; } : hide;
    var as = idToSpans[id], a;
    for (var i = 0; a = as[i]; i++) {
      toggle( $X('..', a) );
      toggle( $X('../preceding::span[1]', a) );
      toggle( $X('../following::br[1]', a) );
    }
   }
  function name( id ) {
    return idToSpans[id][0].textContent;
  }
  var namers = $x('id("app_content_4071248179")/div/span/a[(preceding-sibling::span[1])[.=" by "] and contains(@href, "id=")]');
  var ids = namers.map(getIdFromLink);
  var idToSpans = {}, span;
  for (var i = 0; span = namers[i]; i++) {
    id = ids[i];
    if (idToSpans[id])
      idToSpans[id].push(span);
    else
      idToSpans[id] = [span];
  }
  return { count:uniq(ids, "count"), toggle:toggleByNicknamer, name:name };
}

function equipHeaderToggler( div, counts, getNameCB, toggleCB ) {
  if (typeof div == "string") div = $X(div);
  if (!div) return; // probably didn't have this app
  var next = document.createTextNode(" (");
  for (var id in counts) {
    div.appendChild(next);
    next = document.createElement("a");
    next.id = "t_"+ id;
    next.href = "javascript:;/* toggle visibility */";
    next.textContent = counts[id] +"\xA0"+ getNameCB(id);
    next.addEventListener("click", toggleCB, true);
    div.appendChild(next);
    next = document.createTextNode(", ");
  }
  if (next.textContent == ", ") {
    next = document.createTextNode(")");
    div.appendChild(next);
  }
}

//Begin facebook functions//
function FlexToggle() {
	if (remove_css_class_name(profileBox,'flex_shut')) {
		profileBox.className+=' flex_open';
	} else {
		remove_css_class_name(profileBox,'flex_open');
		profileBox.className+=' flex_shut';
	}
}
function remove_css_class_name(elem,cname) {
	var old=elem.className;
	elem.className=elem.className.replace(new RegExp('\\b'+cname+'\\b'),'');
	return elem.className!=old;
}

//end facebook functions//

function show(div) { if (div = node( div )) div.style.display = "block"; }
function hide(div) { if (div = node( div )) div.style.display = "none"; }

function removeNode(div) {
  if (div = node(div)) div.parentNode.removeChild(div);
}

function node(div) {
  return typeof div == "string" ? document.getElementById(div) : div;
}

function getAppsOnPage() {
  if (location.pathname.match(/^\/profile/))
    return $x('//div[starts-with(@id,"box_app_")]').map( prep );
  if (location.pathname.match(/^\/home/)) {
    // install stories: /stories.php?app_id=
    var inMiniFeed = $x('//div[contains(@class,"feed_item clearfix")]/div/a[starts-with(@href,"/stories.php?app_id=")]').map(getIdFromLink);
    // invite requests:
    var inSidebar = $x('//span[starts-with(@id,"app_") and contains(@id,"_sidebar_sidewords")]').map(function(span){ return span.id.match(/\d+/)[0]; });
    return uniq([].concat( inMiniFeed, inSidebar ));
  }
  return [];
}

function uniq(array, count) {
  var seen = {}, i, x, result = [];
  for (i = 0; i<array.length; i++) {
    x = array[i];
    if (seen.hasOwnProperty(x)) {
      seen[x]++;
      continue;
    }
    seen[x] = 1;
    result.push( x );
  }
  return count ? seen : result;
}

function getIdFromLink(a) {
  return a.href.match(/id=(\d+)/)[1];
}

function $X( xpath, root ) {
  var got = $x( xpath, root );
  return got instanceof Array ? got[0] : got;
}

function $x( xpath, root ) {
  var doc = root ? root.evaluate ? root : root.ownerDocument : document;
  var got = doc.evaluate( xpath, root||doc, null, 0, null ), next, result = [];
  switch( got.resultType ) {
    case got.STRING_TYPE:
      return got.stringValue;
    case got.NUMBER_TYPE:
      return got.numberValue;
    case got.BOOLEAN_TYPE:
      return got.booleanValue;
    default:
      while( next = got.iterateNext() )
        result.push( next );
      return result;
  }
}

function getDivsFromApp(id, all) {
  var xpaths = [
    // on profile pages:
    // mini-feed stories:
    'id("minifeed")/div[div[@class="icon"]/a[contains(@href,"&app_id='+ id +'")]]',
    // wall post attach actions:
    'id("attachment_buttons_list")//div[@class="attachment_link"][a/span[contains(@style,"/'+ id +'/")]]',
    // wall post attachments:
    'id("wall_posts")//div[@class="attached_item_info"][img[starts-with(@src,"http://photos-a.ak.facebook.com/photos-ak-sctm/v43/108/'+ id +'/")]]',

    // on home page:
    // install requests:
    '//*[@id="app_'+ id +'_sidebar_sidewords"]/../..',
    // news feed app install stories:
    '//div[contains(@class,"feed_item clearfix")][div/a[@href="/stories.php?app_id='+ id +'"]]'
  ];
  if (all) {
    xpaths = xpaths.concat([
    // opened wall post attachments:
    '//*[@id="app_content_'+ id +'"]/ancestor::div[@class="wallattachment"][1]'
    ]);
  }
  return $x(xpaths.join( " | "));
}

function getAppName(id) {
  var name = GM_getValue("hide"+ id);
  if (name) return name; // already known from before
  var node = $X('id("box_head_'+ id +'")/table//h2');
  if (node) return node.textContent; // profile page box header
  node = $X('//a[starts-with(@href,"/apps/application.php?id='+ id +'")]');
  if (node) return node.textContent; // application install / uninstall story
  node = $X('id("app_'+ id +'_sidebar_sidewords")');
  if (node) return node.textContent.replace(/^\s*|\s\S+$/g,""); // requests
}

function showApp(id) {
	show("box_app_" + id);
	show("icon_app" + id);
	getDivsFromApp(id, false).forEach(show);
	var toggle = $X('id("t_'+ id +'")');
	if (toggle) toggle.style.textDecoration = ""
}

function hideApp(id) {
	hide("box_app_" + id);
	hide("icon_app" + id);
	getDivsFromApp(id, true).forEach(hide);
	var toggle = $X('id("t_'+ id +'")');
	if (toggle) toggle.style.textDecoration = "line-through"
}

function toggleAppNow() {
  var id = this.id.substring(2);
  if (GM_getValue("hide" + id) ||
      GM_getValue("hideAll") && !GM_getValue("show" + id))
    showAppNow.call(this);
  else
    hideAppNow.call(this);
}

function hideAppNow() {
	var id = this.id.substring(2);
	removeNode("show_span_" + id)
	removeNode("unset_span_" + id)
	hideApp(id);
	GM_setValue("hide"+id, getAppName(id));
	GM_setValue("show"+id, false);
	if (!document.getElementById("hiddenText")) {createAppBox();} else {listHiddenApp(id, getAppName(id));}
	countApps();
}

function showAppNow() {
	var id = this.id.substring(2);
	removeNode("hide_span_" + id);
	removeNode("unset_span_" + id)
	showApp(id);
	GM_setValue("hide"+id, false);
	GM_setValue("show"+id, getAppName(id));
	if (!document.getElementById("shownText")) {createAppBox();} else {listShownApp(id, getAppName(id));}
	countApps();
}

function hideShowAll( list ) {
	for (var i = 0, id; id = appsOnPage[i]; i++) {
	  //cycle through apps, and decide whether to show each one
	    if (GM_getValue("hide" + id)) {hideApp(id); if (list) listHiddenApp(id);} //app should be hidden
		else if (GM_getValue("show" + id)) {showApp(id); if (list) listShownApp(id);}//app should be shown
		else {if (list) listUnsetApp(id); if (GM_getValue("hideAll")) hideApp(id); else showApp(id);} //app should follow default set by hideAll.
	}
}

function toggleDefaultDisplay() {
	var newValue = (GM_getValue("hideAll")?false:true);
	GM_setValue("hideAll", newValue);
	hideShowAll();
	modeLabel.innerHTML =  "All items " + (newValue?"hidden":"displayed");
}

function createAppBox() {
	//already there on profile.php, but not on home.php (toggle hidden pane)
	GM_addStyle( "#content .flex_shut .inside_the_box, #content .flex_shut .box_subhead, #content .collapsed_mode .inside_the_box, #content .collapsed_mode .box_subhead { display:none; }" );
	//Create a "hidden items" "application" at the end of the main column, so hidden apps can be restored.
	profileBox = document.createElement("div");
	profileBox.id = "box_app_2200123456";
	profileBox.box = "box_app_2200123456";
	if (onHomePage) profileBox.style.marginTop="2em";
	profileBox.className = "profile_box clearfix flex_shut";
	//<div onclick="boxFlexToggle(this.parentNode);" title="Click to Expand/Collapse" id="box_head_2719290516"
	box_head = document.createElement("div");
	box_head.id = "box_head_2200123456";
	box_head.addEventListener("click", FlexToggle, true);
	box_head.className = "box_head clearfix"
	table = document.createElement("table");
	table.className = "head_table";
	table.width = "100%";
	table.cellSpacing = "0";
	table.cellPadding = "0";
	table.border = "0";
	tbody = document.createElement("tbody");
	tr = document.createElement("tr");
	td = document.createElement("td");
	h2  = document.createElement("h2");

	a = document.createElement("a");
	a.id = "a_2200123456";
	a.className = "non_link";
	a.innerHTML = "Hidden Items";

//	<tbody><tr><td><h2 id="title_app_2719290516"><a id="wall" class="non_link" name="wall"/>The Wall</h2></td><td align="right"><a class="box_remove icon box_action" id="x_2719290516"/></td></tr></tbody></table></div>

	h2.appendChild(a);
	td.appendChild(h2);
	tr.appendChild(td);
	tbody.appendChild(tr);
	table.appendChild(tbody);
	box_head.appendChild(table);

	//That's the title bar done. Now: The box content. First: Hidden applications

	app_content = document.createElement("div");
	app_content.className = "inside_the_box clearfix app_content_2200123456";
	div = document.createElement("div");
	hiddenTitle = document.createElement("h4");
	hiddenTitle.className = "info_section";
	hiddenTitle.innerHTML = "Hidden Applications";
	hiddenTable = document.createElement("table");
	hiddenTable.className = "profileTable";
	hiddenTable.cellSpacing = "0";
	hiddenTable.cellPadding = "0";
	hiddenTbody = document.createElement("tbody");
	hiddenTr = document.createElement("tr");
	hiddenLabel = document.createElement("td");
	hiddenLabel.innerHTML = "On this page:";
	hiddenLabel.className = "label";
	hiddenText = document.createElement("td");
	hiddenText.className = "data";
	hiddenText.id = "hiddenText";
	hiddenText.innerHTML = "No applications hidden.";

	hiddenCountRow = document.createElement("tr");
	hiddenCountLabel = document.createElement("td");
	hiddenCountLabel.innerHTML = "Total:";
	hiddenCountLabel.className = "label";
	hiddenCount = document.createElement("td");
	hiddenCount.className="data";

	//Now for permitted applications

	shownTitle = document.createElement("h4");
	shownTitle.className = "info_section";
	shownTitle.innerHTML = "Shown Applications";
	shownTable = document.createElement("table");
	shownTable.className = "profileTable";
	shownTable.cellSpacing = "0";
	shownTable.cellPadding = "0";
	shownTbody = document.createElement("tbody");
	shownTr = document.createElement("tr");
	shownLabel = document.createElement("td");
	shownLabel.innerHTML = "On this page:";
	shownLabel.className = "label";
	shownText = document.createElement("td");
	shownText.className = "data";
	shownText.id = "shownText";
	shownText.innerHTML = "No permitted applications on this page.";

	shownCountRow = document.createElement("tr");
	shownCountLabel = document.createElement("td");
	shownCountLabel.innerHTML = "Total:";
	shownCountLabel.className = "label";
	shownCount = document.createElement("td");
	shownCount.className="data";
	
	//And applications the user's not set a preference for

	unsetTitle = document.createElement("h4");
	unsetTitle.className = "info_section";
	unsetTitle.innerHTML = "Applies to:";
	unsetTable = document.createElement("table");
	unsetTable.className = "profileTable";
	unsetTable.cellSpacing = "0";
	unsetTable.cellPadding = "0";
	unsetTbody = document.createElement("tbody");
	unsetTr = document.createElement("tr");
	unsetLabel = document.createElement("td");
	unsetLabel.innerHTML = "On this page:";
	unsetLabel.className = "label";
	unsetText = document.createElement("td");
	unsetText.className = "data";
	unsetText.id = "unsetText";
	unsetText.innerHTML = "Nothing - preferences set for all items.";

	//And allow the option to switch mode

	modeTitle = document.createElement("h4");
	modeTitle.className = "info_section";
	modeTitle.innerHTML = "Default mode:";
	modeTable = document.createElement("table");
	modeTable.className = "profileTable";
	modeTable.cellSpacing = "0";
	modeTable.cellPadding = "0";
	modeTbody = document.createElement("tbody");
	modeTr = document.createElement("tr");
	modeLabel = document.createElement("td");
	modeLabel.innerHTML = "All items " + (GM_getValue("hideAll")?"hidden":"displayed");
	modeLabel.className = "label";
	modeText = document.createElement("td");
	modeText.className = "data";
	modeText.id = "modeText";
	modeA = document.createElement("a");
	modeA.setAttribute("style", "font-weight:bold;");
	modeA.innerHTML = "Change";
	modeA.addEventListener("click", toggleDefaultDisplay, true);
	modeText.appendChild(modeA);

	//Fill the app content box
	modeTr.appendChild(modeLabel);
	modeTr.appendChild(modeText);
	modeTbody.appendChild(modeTr);
	modeTable.appendChild(modeTbody);
	unsetTr.appendChild(unsetLabel);
	unsetTr.appendChild(unsetText);
	unsetTbody.appendChild(unsetTr);
	unsetTable.appendChild(unsetTbody);
	shownCountRow.appendChild(shownCountLabel);
	shownCountRow.appendChild(shownCount);
	shownTr.appendChild(shownLabel);
	shownTr.appendChild(shownText);
	shownTbody.appendChild(shownTr);
	shownTbody.appendChild(shownCountRow);
	shownTable.appendChild(shownTbody);
	hiddenTbody.appendChild(hiddenTr);
	hiddenTbody.appendChild(hiddenCountRow);
	hiddenTable.appendChild(hiddenTbody);
	hiddenTr.appendChild(hiddenLabel);
	hiddenTr.appendChild(hiddenText);
	hiddenCountRow.appendChild(hiddenCountLabel);
	hiddenCountRow.appendChild(hiddenCount);
	div.appendChild(hiddenTitle);
	div.appendChild(hiddenTable);
	div.appendChild(shownTitle);
	div.appendChild(shownTable);
	div.appendChild(modeTitle);
	div.appendChild(modeTable);
	div.appendChild(unsetTitle);
	div.appendChild(unsetTable);
	app_content.appendChild(div);

	//Add our new box to the page
	profileBox.appendChild(box_head);
	profileBox.appendChild(app_content);
        var parent = $X('id("moveable_wide")') ||
          $X('id("home_main")/div[@class="home_main_item clearfix"]');
	parent.appendChild(profileBox);
	
	//Now populate the new box with the app names
	hideShowAll(true);
	countApps();
	

/*
	divs = document.getElementsByTagName("div");
	var nextDivIsRequestList = false;
	for (var i=0, j=divs.length; i<j; i++){
		// Find specific divs given only their (unique) class names.
		if (divs[i].className == "sidebar_item requests") var sidebarRequests = divs[i];
		if (divs[i].className == "app_icon_row clearfix") var iconsDiv=divs[i];
	}
	// Remove requests box if empty
	requests = sidebarRequests.childNodes[1].childNodes;
	var requestsVisible = false;
	for (i = 0, j = requests.length; i<j; i++) {
	    if (requests[i].style && requests[i].style.display != 'none') requestsVisible = true;
	}
	if (!requestsVisible) sidebarRequests.style.display = 'none';
	// Add icon to list
	if (iconsDiv) {
		// Add icon to list
		appIcon = document.createElement("div");
		appIcon.className = "icon_container";
		appIcon.id = "icon_app2200123456";
		appIcon.style.display = "block";
		appToolTip = document.createElement("div");
		//This is how it is before the tooltips load, but it doesn't seem to work properly.
		//appToolTip.className = "tooltip";
		//This emulates what it should load as.
		appToolTip.className = "tooltip loaded_tooltip";
		appToolTip.setAttribute("style", "display: none; width: 75px; left: -26px; top: -24px;");

		appToolTipText=document.createElement("div");
		appToolTipText.id = "appToolTipText";
		appToolTipText.innerHTML = "Hidden Items";
		appToolTipText.className = "tooltip_text";
		appToolTipPointer=document.createElement("div");
		appToolTipPointer.className = "tooltip_pointer";
		appToolTipText.innerHTML = "";
		appToolTip.appendChild(appToolTipText);
		appToolTip.appendChild(appToolTipPointer);

		imgAppIcon = document.createElement("a");
		imgAppIcon.className = "app_icon";
		imgAppIcon.style.backgroundImage = "url(http://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/X_mark.svg/16px-X_mark.svg.png)";
		imgAppIcon.setAttribute("onmouseover", "document.getElementById('appToolTipText').innerHTML = 'Hidden items'; profile_icon_hover(this);");
		imgAppIcon.setAttribute("onmouseout", "clear_tooltip(this);");
		imgAppIcon.setAttribute("onclick", "profile_app_switcher_select('a_2200123456',2200123456); this.blur(); return false;");
		imgAppIcon.href = "#hidden_items";

		appIcon.appendChild(appToolTip);
		appIcon.appendChild(imgAppIcon);
	   iconsDiv.appendChild(appIcon);
	}
*/
}

function countApps() {
	var totalHidden=0;
	var totalShown=0;
	for (var i=0; i<appsOnPage.length; i++) {
		if (GM_getValue("show"+appsOnPage[i])) totalShown++;
		else if (GM_getValue("hide"+appsOnPage[i])) totalHidden++;
	}
	if (totalHidden) {hiddenCount.innerHTML = totalHidden + " applications hidden on this page."; hiddenCountRow.style.display = "table-row";} else hiddenCountRow.style.display = "none";
	if (totalShown) {shownCount.innerHTML = totalShown + " applications permitted on this page."; shownCountRow.style.display = "table-row";} else shownCountRow.style.display = "none";
}

function listHiddenApp(id) {
	if (hiddenText.innerHTML == "No applications hidden.") {hiddenText.innerHTML = "";}
	appName = document.createTextNode(getAppName(id) + " (");
	var showAppLink = document.createElement("a");
	showAppLink.innerHTML = "show";
	showAppLink.id = "sa" + id;
	showAppLink.addEventListener("click", showAppNow, true);
	closeBracket = document.createTextNode(")");
	br = document.createElement("br");
	span = document.createElement("span");
	span.id = "hide_span_" + id;
	span.appendChild(appName);
	span.appendChild(showAppLink);
	span.appendChild(closeBracket);
	span.appendChild(br);
	document.getElementById("hiddenText").appendChild(span);
	document.getElementById("hiddenText").appendChild(span);
}

function listShownApp(id) {
	if (shownText.innerHTML == "No permitted applications on this page.") {shownText.innerHTML = "";}
	appName = document.createTextNode(getAppName(id) + " (");
	var hideAppLink = document.createElement("a");
	hideAppLink.innerHTML = "hide";
	hideAppLink.id = "sa" + id;
	hideAppLink.addEventListener("click", hideAppNow, true);
	closeBracket = document.createTextNode(")");
	br = document.createElement("br");
	span = document.createElement("span");
	span.id = "show_span_" + id;
	span.appendChild(appName);
	span.appendChild(hideAppLink);
	span.appendChild(closeBracket);
	span.appendChild(br);
	document.getElementById("shownText").appendChild(span);
	document.getElementById("shownText").appendChild(span);
}

function listUnsetApp(id) {
	if (unsetText.innerHTML == "Nothing - preferences set for all items.") {unsetText.innerHTML = "";}
	appName = document.createTextNode(getAppName(id) + " (");
	var hideAppLink = document.createElement("a");
	hideAppLink.innerHTML = "hide";
	hideAppLink.id = "sa" + id;
	hideAppLink.addEventListener("click", hideAppNow, true);
	comma = document.createTextNode(", ");
	var showAppLink = document.createElement("a");
	showAppLink.innerHTML = "show";
	showAppLink.id = "sa" + id;
	showAppLink.addEventListener("click", showAppNow, true);
	closeBracket = document.createTextNode(")");
	br = document.createElement("br");
	span = document.createElement("span");
	span.id = "unset_span_" + id;
	span.appendChild(appName);
	span.appendChild(showAppLink);
	span.appendChild(comma);
	span.appendChild(hideAppLink);
	span.appendChild(closeBracket);
	span.appendChild(br);
	document.getElementById("unsetText").appendChild(span);
	document.getElementById("unsetText").appendChild(span);
}

function prep(div) {
//works out if it should add an "X" to a div, and does so if necessary
	var id = div.id.substring(8);
	xBox = document.getElementById("box_head_"  + id).childNodes[0].childNodes[0].childNodes[0].childNodes[0];
	xLink = document.createElement("a");
	xLink.className = "box_remove icon box_action";
	xLink.id = "x_" + id;
	xLink.title = "Hide everything from this application";
	xLink.addEventListener("click", hideAppNow, true);
	if (!xBox.innerHTML) {
		//Populate table cell with a link
		xBox.appendChild(xLink);
	} else if (xBox.childNodes[0].innerHTML != '&nbsp;') {
		//Add a new table cell to the left of the existing, which probably says "add".
		xCell = document.createElement("td");
		xCell.align = "right";
		xCell.style.width="13px";
		xCell.appendChild(xLink);
		xBox.parentNode.appendChild(xCell);
	}
	return id;
}

if (!GM_setValue) alrt("The facebook custom app hider requires GreaseMonkey 0.3 or higher. Please upgrade!"); else createAppBox();

if (!(GM_getValue("setUp"))) {
	// setUp is set to true the first time the script is run; when it's true we know the default preferences have already been set.
	GM_setValue("setUp", true);
	//Display the following apps by default
	GM_setValue("show2297529396", "Education");
	GM_setValue("show2341989679", "Mini-feed");
	GM_setValue("show2407511955", "Mutual friends");
	GM_setValue("show2327158227", "Information");
	GM_setValue("show2356318349", "Network friends");
	GM_setValue("show2719290516", "Wall");
	GM_setValue("show2503140832", "Friends in other networks");
	GM_setValue("show2305272732", "Photos");
	GM_setValue("show2309869772", "Posted items");
	GM_setValue("show2361831622", "Groups");
	GM_setValue("show2392950137", "Video");
}
