// ==UserScript==
// @name           Achieve3000 Admin Tweaks
// @description    Makes the following tweaks on Achieve3000 sites:  Prevents session expiration.  Adds ability to merge and delete users directly from kidbiz user search.  Adds "Switch to District" option to dropdown on schools in customer search.  Disables all "changes have been saved" popups.  Makes the "subscriber type" dropdown visible on user profiles.  Prevents non-link text from being underlined on hover.
// @namespace      http://userscripts.org/users/boourns
// @date           2012-07-23
// @version        1.7
// @include        http://portal.achieve3000.com/*
// @include        https://portal.achieve3000.com/*
// @include        http://*.kidbiz3000.com/*
// @include        http://*.teenbiz3000.com/*
// @include        http://*.empower3000.com/*
// @include        http://*.escience3000.com/*
// @include        http://*.spark3000.com/*
// @include        http://*.achieve3000summer.com/*
// @include        http://*.email3000.com/*
// @include        http://*.kidbiz3000.biz/*
// @include        https://*.kidbiz3000.biz/*
// @include        http://*.teenbiz3000.biz/*
// @include        http://*.kidbiz3000.net/*
// @include        http://*.interlink3000.com/*
// @include        http://173.203.130.18/*
// @include        http://173.203.130.19/*
// @include        http://173.203.130.20/*
// @include        http://173.203.130.21/*
// @include        http://173.203.130.22/*
// @include        http://173.203.130.23/*
// @include        http://173.203.130.24/*
// @include        http://173.203.130.25/*
// @include        http://173.203.130.16/*
// @include        http://173.203.130.31/*
// @include        http://72.32.190.243/*
// ==/UserScript==

// get domain
var achieveDomain = 'portal.achieve3000.com';

// fix bug in "edit students and teachers" so it remembers the school
if (window.location.href.match(/edit_users\.php\?task=class&school_id=(\d+)&class_id=NONE/)) {
	GM_setValue("achieveCurrentSchool", RegExp.$1);
}
else {
	//if (window.location.href.match(new RegExp(escape("edit_users.php?class_id="+achieveCurrentClass)))) {
	if (window.location.href.match(/edit_users\.php\?class_id=NONE/)) {
		var achieveCurrentSchool = GM_getValue("achieveCurrentSchool", null);
		window.location.href = "http://"+achieveDomain+"/options/teacher/user/edit_users.php?task=class&school_id="+achieveCurrentSchool+"&class_id=NONE";
	}
}

// keep php session alive
var body = document.getElementsByTagName('body')[0];
var keepAliveFrame = document.createElement('iframe');
keepAliveFrame.width = '1';
keepAliveFrame.height = '1';
body.appendChild(keepAliveFrame);
unsafeWindow.keepSessionAlive = function() {
	keepAliveFrame.src = "http://"+achieveDomain+"/home.php?" + Math.floor(Math.random()*100000);
	return true;
}
window.setInterval("keepSessionAlive()", 180000);

// kill session time-out popup
if (window.location.href.match(/\/kb_alert\/timeout_alert\.php/)) {
	window.location.href = "http://www.google.com";
}

// school search (in customer search) enhancements
if (window.location.href.match(/\/office\/support\/school\/search\.php/)) {
	var options = document.getElementsByTagName('option');
	for (i=0; i < options.length; i++) {
		if (options[i].value.match(/2\.\.\/scheduled_assessments\.php\?district_id=(\d+)&school_id=(\d+)/)) {
			var myDist = RegExp.$1;
			var mySchool = RegExp.$2;
			var switchDistOpt = document.createElement('option');
			switchDistOpt.value = '1/options/teacher/district/do_change_district.php?district_id=' + myDist;
			switchDistOpt.innerHTML = 'Switch to District';
			options[i].parentNode.insertBefore(switchDistOpt, options[i].nextSibling);
		}
	}
}

// kidbiz/teenbiz user search enhancements (merging, deleting)
if (window.location.href.match(/\/options\/teacher\/user\/search\.php\?search_text=/) && !window.location.href.match(/&f_id=/)) {

	// change form to merge users
	var mergeUserForm;
	var forms = document.getElementsByTagName('form');
	for(i=0;i<forms.length;i++)
	{
		mergeUserForm = forms[i];
		mergeUserForm.action = "/office/support/district/merge_user_do.php";
	}

	// remove unnecessary fields
	var oldSearchButton;
	var inputs = document.getElementsByTagName('input');
	for(i=0;i<inputs.length;i++)
	{
		if (inputs[i].type == "button" && inputs[i].value == "Search")
		{
			oldSearchButton = inputs[i];
			oldSearchButton.onClick = "";
			oldSearchButton.value = "Merge";
		}
	}
	var schoolSelect = document.getElementsByTagName('select')[0];
	schoolSelect.style.display = "none";

	// loop through search results
	var links, a;
	links = document.evaluate(
		"//a[contains(@href, 'user.php')]",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for (var i = 0; i < links.snapshotLength; i++) {
		a = links.snapshotItem(i);

		var objRegExp = /user_id=(\d+)/;
		var strUserId = a.href.match(objRegExp)[1];
		var objRegExpType = /type=(\w+)/;
		var typeResults = a.href.match(objRegExpType);
		if (typeResults)
			var strUserType = typeResults[1];
		else
			var strUserType = '';
		var strDeleteUrl = "/options/teacher/user/do_deactivate_users.php?user_id="+strUserId+"&check_user_id="+strUserId;

		// remove js from link, so user can click edit link from this window
		a.href = "user.php?user_id="+strUserId+"&type="+strUserType;
		
		// create quick delete link on each user
		var newLink = document.createElement('a');
		newLink.href = strDeleteUrl;
		newLink.innerHTML = "X";
		var newSpan = document.createElement('span');
		newSpan.innerHTML = "&nbsp;";

		// create merge user radio buttons
		var mergeField1 = document.createElement('input');
		mergeField1.type = "radio";
		mergeField1.name = "old_user_id";
		mergeField1.value = strUserId;
		var mergeField2 = document.createElement('input');
		mergeField2.type = "radio";
		mergeField2.name = "new_user_id";
		mergeField2.value = strUserId;

		// insert everything
		a.parentNode.insertBefore(newSpan, a.nextSibling);
		a.parentNode.insertBefore(newLink, newSpan.nextSibling);
		a.parentNode.insertBefore(mergeField1, newLink.nextSibling);
		a.parentNode.insertBefore(mergeField2, mergeField1.nextSibling);
	}
}

// remove JS alert messages
if (window.location.href.match(/\/options\/teacher\/user\/edit_users\.php/) ||
	window.location.href.match(/\/options\/teacher\/school\/school\.php/) ||
	window.location.href.match(/\/options\/teacher\/district\/district\.php/) ||
	window.location.href.match(/\/options\/teacher\/class\/class\.php/) ) {
	// to remove: alert(alertText);
	var scriptCode = new Array();   // this is where we are going to build our new script
    
	// here's the build of the new script, one line at a time
	scriptCode.push('function init(){ window.close(); return true; }');

	// now, we put the script in a new script element in the DOM
	var script = document.createElement('script');
	script.innerHTML = scriptCode.join('\n');
	scriptCode.length = 0;
	document.getElementsByTagName('head')[0].appendChild(script); 
}

// bring back the user type selection box
if (window.location.href.match(/\/options\/teacher\/user\/user\.php/)) {
  var sub_hidden = document.getElementsByName('subscriber_type')[0];
  var old_value = sub_hidden.value;
  
  // hide text showing current subscriber type
  var current_type_cell = sub_hidden.parentNode;
  current_type_cell.innerHTML = "";
  
  // create new selection box
  var sub_select = document.createElement('select');
  sub_select.name = "subscriber_type";
	var switch1 = document.createElement('option');
	var switch2 = document.createElement('option');
	var switch4 = document.createElement('option');
	var switch5 = document.createElement('option');
	var switch6 = document.createElement('option');
	var switch7 = document.createElement('option');
	
	// figure out which one should be selected
	switch1.value = '1';
	switch1.innerHTML = 'Student';
	if (old_value == '1') { switch1.selected = true; }
	
	switch2.value = '2';
	switch2.innerHTML = 'Teacher';
	if (old_value == '2') { switch2.selected = true; }
	
	switch4.value = '4';
	switch4.innerHTML = 'School Admin';
	if (old_value == '4') { switch4.selected = true; }
	
	switch5.value = '5';
	switch5.innerHTML = 'District Admin';
	if (old_value == '5') { switch5.selected = true; }
	
	switch6.value = '6';
	switch6.innerHTML = 'KB Admin';
	if (old_value == '6') { switch6.selected = true; }
	
	switch7.value = '7';
	switch7.innerHTML = 'Parent';
	if (old_value == '7') { switch7.selected = true; }
	
	// apply changes
	sub_select.appendChild(switch1);
	sub_select.appendChild(switch2);
	sub_select.appendChild(switch4);
	sub_select.appendChild(switch5);
	sub_select.appendChild(switch6);
	sub_select.appendChild(switch7);
	current_type_cell.appendChild(sub_select);
}

// fix everything being underlined
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
addGlobalStyle('.table_text, .label:hover {text-decoration: none !important;}');
